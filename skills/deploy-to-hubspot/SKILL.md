---
name: deploy-to-hubspot
description: "Put a finished HubL theme into the user's HubSpot account with HubSpot's own command-line tool: installing the HubSpot CLI, signing in with a personal access key, uploading the theme folder to a new Design Manager location, watching for changes, fetching files back, and then creating a page from a template and checking it in HubSpot."
when_to_use: "Use when someone asks to upload, deploy, publish or push a theme to HubSpot, install or update the HubSpot CLI, connect or authenticate a HubSpot account, or use hs commands."
---

# Deploy to HubSpot

HubSpot is a trademark of HubSpot, Inc. This plugin is not affiliated with or endorsed by HubSpot.

You put the theme into the user's HubSpot account with HubSpot's CLI (`hs`). Everything in this skill that writes to the account is the user's decision: say what the command will do and run it only after a clear yes.

**What one yes covers.** For `hs cms upload`, one clear yes covers the first upload of this theme to a new destination and every re-upload of fixes to that same destination. A different destination, `--clean`, or writing over anything that existed before this session needs a new yes.

## Safe defaults

- **A test account first.** If the user has a test or sandbox HubSpot account with website pages, deploy there before their live account. Ask.
- **A new destination, never over an existing theme**, unless the user explicitly asks to replace one. HubSpot's documentation says changes uploaded with `hs cms upload` are live immediately, and the CLI's default publish mode is `publish`, so uploading over a path that pages already use changes those pages straight away.
- **Ask before any command that writes to the account**: `hs cms upload`, `hs cms watch`, `hs cms theme preview` (its help in CLI 8.8 says it uploads and watches), `hs filemanager upload`, `hs cms mv`, `hs cms delete`. For `hs cms upload`, one yes covers what is stated above; every other command here needs its own yes. Reading commands (`hs account list`, `hs cms list`, `hs cms fetch`) can run when they help, after saying what they do.
- **Never ask for, echo or store a key.** The user pastes their personal access key into HubSpot's own prompt in their terminal. Never put a key in a file, a command line you run, or the chat; if one appears, tell the user to deactivate it in HubSpot and make a new one.
- **Never use `--clean`** (deletes the destination first and resets global content) or `watch --remove` (deletes remote files missing locally) unless the user asks for exactly that, understanding it.

## 1. Check the CLI

```
hs --version
```

The commands here are for HubSpot CLI 8 or newer, where CMS commands sit under `hs cms`. Older versions spelled them without `cms` (`hs upload`, `hs watch`, `hs fetch`), and version 8 no longer accepts those. Commands and flags differ between versions: **run `hs <command> --help` before first using each command** and follow what it says over what is written here.

To install or update (with the user's agreement; needs Node 20 or newer):

```
npm install -g @hubspot/cli
```

## 2. Sign in

The user runs this in their own terminal, because it opens a browser and prompts for the key:

```
hs account auth
```

It walks them to HubSpot's personal access key page, where they create or copy a key and paste it at the prompt. For theme work the key needs at least the **Design Manager** permission, and a key can do no more than the user's own HubSpot permissions allow. The CLI stores it in its global config (`~/.hscli/config.yml`); nothing here reads that file. Then:

```
hs account list
```

shows the signed-in accounts and the default. To deploy to a specific account, pass `--account <name-or-id>` on each command, or let the user run `hs account use` to change the default. `hs account link` ties accounts to one project folder so a command there cannot reach the wrong account.

## 3. Check before writing

- Run `validate --theme-root <theme-folder>` from `preview-and-validate` if the renderer is available, and fix what it reports. HubSpot refuses to publish templates with fatal errors (a missing `standard_header_includes`, for example), and the upload prints them.
- `validate` reports a field or group named `label`, `body` or `name` as `FIELD_NAME_RESERVED`; rename each one (`hubl-authoring`, "Field names HubSpot refuses"). Without the renderer, search every `fields.json` for those names yourself.
- When those are clean, describe the result to the user in these words: "Passes the local checks; HubSpot decides on upload and may refuse something these checks do not cover."
- Choose the destination with the user: a new folder name in the Design Manager, usually the theme's name (`northwind-theme`). Check it is not already taken:

```
hs cms list
```

lists the Design Manager root (reading only). If the name exists, pick another or ask.
- Make sure the theme folder holds only the theme: the captures and comparison output from `preview-and-validate` must be outside it. A `fixtures/` folder inside the theme is uploaded by `hs cms upload` with everything else: keep design fixtures outside the theme, or delete the folder before upload. The CLI already ignores hidden files and folders, `node_modules`, `hubspot.config.yml` and log files, and reads a `.hsignore` file (same pattern syntax as `.gitignore`) for anything else.
- Optional and experimental: `hs cms lint <theme-folder>` sends each HubL file to HubSpot's HubL validator for the signed-in account and reports syntax errors, writing nothing to the account. CLI 8.8 hides it from its help as experimental.

## 4. Upload

After the user agrees, with the destination you chose:

```
hs cms upload <theme-folder> <destination> --account <name-or-id>
```

What it does: copies the folder's files into the account's Design Manager (developer file system) at `<destination>`. It does **not** create or publish any page, and it does not touch the File Manager.

- `--cms-publish-mode draft` saves the files as drafts instead of publishing them. What a draft theme can be used for in HubSpot was not checked when this skill was written: read HubSpot's documentation before relying on it.
- Whether an upload over an existing path affects live pages is a risk to check, not a detail: HubSpot's documentation says uploaded changes are live immediately. Treat any existing destination as live.

**When HubSpot refuses something**, the command ends with an error naming the reason, for example `field name cannot be 'label'`. HubSpot reports one refusal at a time, so a fix can reveal the next. Work the loop:

1. Upload.
2. Read HubSpot's refusal and find what it points at: the field name in a `field name cannot be` error, the file and line in a template error.
3. Fix that field or file (`hubl-authoring`, `references/validation-errors.md`).
4. Check the rest of the theme for the same class of problem (the same field name in every `fields.json`, the same mistake in sibling templates) and fix those too.
5. Upload again with the same command to the same destination; it updates the files there, and the user's yes for this destination covers it.

Stop and ask before a fix that needs a different destination, `--clean`, or writing over anything that existed before this session. Tell the user each refusal you met and what you changed.

## 5. Keep changes flowing (optional)

```
hs cms watch <theme-folder> <destination> --account <name-or-id>
```

Uploads each file as it is saved. It runs until stopped, and every save is live at once (default publish mode), so use it only on a destination no live page uses yet, and only with the user's agreement. Deleting a file locally does not delete it in HubSpot; renaming a folder uploads a new one.

HubSpot's own render of the theme, served locally:

```
hs cms theme preview --src <theme-folder> --dest <destination>
```

In CLI 8.8 its help says it uploads and watches the theme at `--dest` and starts a local server showing pages rendered by HubSpot, so it writes to the account: the same agreement as an upload. HubSpot's documentation page shows it with positional arguments and describes it as not uploading; the CLI's own `--help` wins. The documentation also says that to serve over HTTPS it registers a self-signed certificate with the operating system and asks for the user's system password; the CLI offers `--no-ssl` to disable HTTPS.

To bring files back from the account (for example after someone edited in the Design Manager):

```
hs cms fetch <destination> <local-folder>
```

It will not overwrite local files unless `--overwrite` is given; fetch into an empty folder and compare.

## 6. Content images

Photos the marketer will own belong in HubSpot's File Manager, not the theme. With the user's agreement:

```
hs filemanager upload <local-folder-or-file> <file-manager-path> --account <name-or-id>
```

HubSpot's documentation says files uploaded this way are public: anyone with the URL can see them. Or the user uploads them in HubSpot and picks them in the page editor.

## 7. Create a page and check it in HubSpot

These steps happen in HubSpot's interface; guide the user through them:

1. Create a website page (or landing page). On the template screen, set the uploaded theme as the active theme if needed, then choose one of its templates.
2. In the page editor, check that every heading, text, image, link and card can be edited, that the header and footer appear, and that the theme settings (colours, fonts) change the page.
3. Open the page's preview link and look at it at desktop and mobile widths.
4. Optionally run the comparison once more against HubSpot's real render: capture the preview URL with `preview-and-validate` (if the page is reachable from this machine) and compare it with the design. HubSpot's render is the authority; differences from the local render are worth noting for the user.

Nothing here publishes the page: the user publishes from the page editor when ready.

## HubSpot's developer MCP server, if the user has it

HubSpot's developer MCP server (set up with `hs mcp setup`) gives this session `search-docs` and `fetch-doc` for HubSpot's documentation, `list-cms-remote-contents` to see what is already in the Design Manager, and `create-cms-module` / `create-cms-template` for HubSpot's starting files. Its `upload-project` and `deploy-project` tools are for HubSpot developer projects, not a theme folder; the theme still goes up with `hs cms upload`.

## When something fails

- `hs: command not found` (or "not recognised" on Windows): the CLI is not installed, or the npm global folder is not on PATH. Run the preflight script from `design-to-hubspot-theme`.
- An authentication or permission error: the key has expired, was deactivated, or lacks Design Manager permission. The user runs `hs account auth` again and picks the permission.
- "Did you mean `hs cms upload`?": an old command spelling on CLI 8; use the `hs cms` form.
- A refusal on upload (`field name cannot be …`, a template error): the loop in step 4, reading the error like any HubL error (`hubl-authoring`, `references/validation-errors.md`).
