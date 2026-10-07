# Ways to produce the PNGs

The contract in `SKILL.md` fixes what every capture must be: a PNG of the whole page (not just the first screen), at a viewport of exactly 1440×900 or 390×844, device scale factor 1, with fonts and lazy images loaded and animations off. The viewport's width is the layout width; its height is the first screen, which is what CSS viewport units and lazy loading see. How you meet it is your choice. Pre-flight lists what this machine has, with paths; pick the first route below that it supports, and ask the user before adding anything.

Whatever the route:

- Capture the design and the build by the same route with the same settings.
- Name files by viewport, not by image size: `reference-1440x900.png`, `render-390x844.png`.
- Check each file before comparing. Its width is exactly 1440 or 390; a width of 2880 or 780 means device scale factor 2. Open it: blank bands, a fallback font, grey image boxes or a cut-off bottom are faults of the capture, not of the build.
- Keep every script and file the capture needs in `theme-check/`, never in the theme.

## 1. Playwright or Puppeteer already in the project

When pre-flight finds `playwright` or `puppeteer` in the working directory, write this script to `theme-check/screenshot.mjs` and run it once per page:

```
node theme-check/screenshot.mjs design/index.html theme-check/reference/reference
node theme-check/screenshot.mjs "http://127.0.0.1:<port>/render?template=home.html" theme-check/iteration-1/render
```

It writes `<prefix>-1440x900.png` and `<prefix>-390x844.png`. Quote a URL, as above.

```js
// theme-check/screenshot.mjs <url-or-file> <out-prefix>
// Full-page PNGs at 1440x900 and 390x844: device scale factor 1, reduced motion,
// animations disabled, lazy images and fonts loaded.
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const [target, prefix] = process.argv.slice(2);
const url = /^(https?|file):/i.test(target) ? target : pathToFileURL(resolve(target)).href;
const browser = await chromium.launch();
try {
  for (const [width, height] of [[1440, 900], [390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await page.goto(url, { waitUntil: 'load' });
    await page.evaluate(async () => {
      for (const image of document.querySelectorAll('img[loading="lazy"]')) image.loading = 'eager';
      for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((done) => setTimeout(done, 50));
      }
      window.scrollTo(0, 0);
      const pending = [...document.images].filter((image) => !image.complete);
      await Promise.all(pending.map((image) => new Promise((done) => { image.onload = image.onerror = done; })));
      await document.fonts.ready;
    });
    await page.screenshot({ path: `${prefix}-${width}x${height}.png`, fullPage: true, animations: 'disabled' });
    await page.close();
  }
} finally {
  await browser.close();
}
```

With Puppeteer, the same script with these changes:

- `import puppeteer from 'puppeteer';` and `const browser = await puppeteer.launch();`
- for each viewport: `const page = await browser.newPage();`, then `await page.setViewport({ width, height, deviceScaleFactor: 1 });` and `await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);` before `goto`;
- Puppeteer has no `animations` option: before the screenshot, `await page.addStyleTag({ content: '*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition: none !important; }' });`, then `await page.screenshot({ path: …, fullPage: true });`.

If Playwright reports that its browser is not downloaded, do not download it without asking: use route 2's launch options with the machine's Chrome or Edge instead.

Checked with `playwright-core` 1.63 and `puppeteer-core` 25.12 driving Chrome 154 on Windows: on a test page with a 390 px breakpoint, a reduced-motion rule and a lazy image below the fold, both wrote full-page PNGs of the right size with the breakpoint applied and the image loaded, and the two were pixel-identical to each other and to route 3's.

## 2. playwright-core with this machine's Chrome or Edge

When pre-flight finds Chrome or Edge but no capture package, `npm install --save-dev playwright-core` adds the package alone (a few MB from npm, no browser download). It changes the user's project, so ask first. Then use route 1's script with two changes: import from `'playwright-core'`, and launch the installed browser with `chromium.launch({ channel: 'chrome' })` (or `channel: 'msedge'`; or `executablePath: '<path pre-flight printed>'`). Puppeteer's equivalent is `puppeteer-core` with `puppeteer.launch({ executablePath: '<path pre-flight printed>' })`. In a JavaScript string, write a Windows path with forward slashes (`'C:/Program Files/Google/Chrome/Application/chrome.exe'`): single backslashes are swallowed as escapes.

## 3. Chrome, Edge or Chromium on its own, headless

No package is needed: the browser pre-flight found takes the screenshot itself. These facts were checked with Chrome 154 and Edge on Windows:

- `--headless --screenshot=<file> --window-size=<w>,<h> --hide-scrollbars` writes a PNG of exactly `w`×`h`, so a window as tall as the page is a full-page capture.
- `--force-device-scale-factor=1`, `--virtual-time-budget=<ms>` (timers and loading run in virtual time up to the budget before the shot, in well under a second of real time) and `--force-prefers-reduced-motion` are each honoured.
- **The page is laid out at least 500 px wide** whatever `--window-size` says: at `390,844` the PNG is 390 wide but the page inside it was drawn at 500 and cropped, so mobile breakpoints never fire. And `--dump-dom` sees a smaller viewport than the window (1424×805 for `1440,900`). So the page goes through a frame page that gives it its exact width, for measuring and for capturing alike.
- `--screenshot=` needs an absolute path (a relative one is refused with "Access is denied"), and the page must be a URL: `file:///C:/…/page.html` with forward slashes, or `http://…`. A bare file name is read as a web address.
- `--screenshot=` does not create its folder: a missing one ends in "Failed to write file". Make the folder first with your file-writing tool (writing any small file into it creates it); `render --out` creates its own folders.
- Each run prints unrelated `ERROR` lines about extensions on Windows. The line that matters is "<n> bytes written to file <path>", or "Failed to write file".
- Running it while the user's own Chrome is open is fine. Do not run the browser with `--version` on Windows: it prints nothing and opens a window in the browser already running.

### The frame page

Write this once to `theme-check/frame.html`. It shows one page in a frame of exactly `w`×`h` CSS pixels, loads the page's lazy images, waits for its fonts, and writes the page's full height onto its own `<html data-h>`.

```html
<!doctype html>
<html><head><meta charset="utf-8"><style>html,body{margin:0;overflow:hidden;background:#fff}iframe{display:block;border:0}</style></head>
<body><iframe id="f" scrolling="no"></iframe><script>
const q = new URLSearchParams(location.search), f = document.getElementById('f'), root = document.documentElement;
f.style.width = q.get('w') + 'px';
f.style.height = q.get('h') + 'px';
f.onload = async () => {
  let d;
  try { d = f.contentDocument; d.documentElement.scrollHeight; } catch { root.dataset.h = 'unreadable'; return; }
  for (const img of d.querySelectorAll('img[loading="lazy"]')) img.loading = 'eager';
  await Promise.all([...d.images].filter((i) => !i.complete).map((i) => new Promise((done) => { i.onload = i.onerror = done; })));
  await d.fonts.ready;
  root.dataset.h = d.documentElement.scrollHeight;
  root.dataset.fonts = d.fonts.status;
  root.dataset.images = [...d.images].filter((i) => !i.complete || !i.naturalWidth).length + ' not loaded';
};
f.src = decodeURIComponent(location.search.slice(location.search.indexOf('src=') + 4));
</script></body></html>
```

`src` comes last in the query and is the page, relative to `frame.html` or as a full `file:///` URL: `../design/index.html` for the design, `iteration-1/render.html` for the build written by `render --out`. Use those files rather than the `serve` URL: the frame can measure a local file only, with the browser's `--allow-file-access-from-files` flag (it lets a local page read another local page; use it only for these runs on your own files).

### Measure, then capture

Run each command on its own. Start it with the browser path spelt exactly as pre-flight printed it, in double quotes: on Windows that is backslashes, `"C:\Program Files\Google\Chrome\Application\chrome.exe"`, which Bash and PowerShell both accept inside double quotes (in PowerShell, put `&` before it). A session's permission rules name a program by its exact spelling, so the same path with forward slashes can be refused where the printed one is allowed. For each page and each viewport:

1. **Measure** at the first-screen height:

   ```
   "<browser path>" --headless --allow-file-access-from-files --virtual-time-budget=10000 --window-size=1440,900 --dump-dom "file:///<project>/theme-check/frame.html?w=1440&h=900&src=iteration-1/render.html"
   ```

   It prints the frame page's markup; its `<html>` line carries `data-h` (the page's height), `data-fonts` (`loaded` when every font arrived) and `data-images` (how many images failed). `data-h="unreadable"` means the browser refused the local read or `src` names no file: check the flag and the path. A wrong `src` in a capture draws the browser's grey error page (a sad-file icon) without any error, so measure before every capture and open the PNG.

2. **Capture** at the measured height, with the window and the frame both that tall, into a folder that already exists:

   ```
   "<browser path>" --headless --allow-file-access-from-files --hide-scrollbars --force-device-scale-factor=1 --force-prefers-reduced-motion --virtual-time-budget=10000 --window-size=1440,2310 --screenshot=<project>/theme-check/iteration-1/render-1440x900.png "file:///<project>/theme-check/frame.html?w=1440&h=2310&src=iteration-1/render.html"
   ```

For 390×844, the same two commands with `390,844` and `w=390&h=844` in the measure, and `390,<height>` and `w=390&h=<height>` in the capture. `msedge.exe` and Chromium take the same flags.

What this route cannot confirm or change:

- Sections sized with viewport units (`100vh`) grow with the frame, because the capture's viewport is as tall as the page. If a second measure with `h` set to the first measured height returns a larger number, the page uses them: this route cannot capture it whole. Use route 1 or 2 if you can, or capture both pages at the measured height and say the viewport-height sections were drawn at the capture height and the bottom of the page is cut.
- Reduced motion stops only the animations the page turns off for it, and virtual time lets finite ones finish. An endless animation is caught mid-way: capture twice, and if the two PNGs differ, name it as the cause.
- `data-fonts` and `data-images` report loading, but open the PNG and look anyway.

## 4. A browser tool in this session

Use a session browser tool only if it can save a full-page PNG at exactly 1440×900 and 390×844 with device scale factor 1, and check the saved file's width. A tool that saves only the visible part of the page (Claude in Chrome's screenshot saved to disk is one) can help you look at the build, but it cannot close the loop: its captures are not compared. The `serve` URL is on `127.0.0.1`, so a browser tool that runs on another machine cannot reach it.

## 5. None of these

Say "not pixel-verified" in those words, near the top of the report. Give the user the `serve` URL (`http://127.0.0.1:<port>/render?template=<name>`) to open beside the design at full width and at a narrow window, list what was checked instead (every render's diagnostics, `validate`), and stop. If the user later agrees to add a capture tool, or captures the two pages themselves and gives you the files, run the loop then.
