import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import {
  require_nunjucks
} from "./chunk-RZIZEC7B.mjs";
import {
  RendererError
} from "./chunk-TILBP2YO.mjs";
import {
  __name,
  __toESM
} from "./chunk-PPQVNGDG.mjs";

// src/hubl-filter-primitives.ts
function hexToRgb(hex) {
  if (typeof hex !== "string") return null;
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6 && h.length !== 8) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return null;
  return { r, g, b };
}
__name(hexToRgb, "hexToRgb");
function toFiniteNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return null;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}
__name(toFiniteNumber, "toFiniteNumber");
function logarithm(value, base) {
  if (base === void 0) return Math.log(value);
  if (base === 2) return Math.log2(value);
  if (base === 10) return Math.log10(value);
  return Math.log(value) / Math.log(base);
}
__name(logarithm, "logarithm");
function nthRoot(value, degree) {
  const n = degree === void 0 ? 2 : degree;
  if (n === 0) return NaN;
  const raw = n === 2 ? Math.sqrt(value) : Math.pow(value, 1 / n);
  const rounded = Math.round(raw);
  return Math.pow(rounded, n) === value ? rounded : raw;
}
__name(nthRoot, "nthRoot");
function formatNumberForLocale(value, locale, maxDecimalDigits) {
  const decimals = maxDecimalDigits ?? decimalDigitsOf(value);
  try {
    return new Intl.NumberFormat(locale || "en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: Math.max(0, Math.min(20, decimals))
    }).format(value);
  } catch {
    return String(value);
  }
}
__name(formatNumberForLocale, "formatNumberForLocale");
function decimalDigitsOf(value) {
  const text = String(value);
  if (text.includes("e") || text.includes("E")) return 20;
  const dot = text.indexOf(".");
  return dot === -1 ? 0 : text.length - dot - 1;
}
__name(decimalDigitsOf, "decimalDigitsOf");
var DECIMAL_PREFIXES = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
var BINARY_PREFIXES = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
function fileSizeFormat(bytes, binary = false) {
  const base = binary ? 1024 : 1e3;
  const prefixes = binary ? BINARY_PREFIXES : DECIMAL_PREFIXES;
  if (bytes === 1) return "1 Byte";
  if (bytes < base) return `${Math.trunc(bytes)} Bytes`;
  let unit = 0;
  for (let i = 0; i < prefixes.length; i++) {
    unit = Math.pow(base, i + 2);
    if (bytes < unit || i === prefixes.length - 1) {
      return `${(base * bytes / unit).toFixed(1)} ${prefixes[i]}`;
    }
  }
  return `${bytes} Bytes`;
}
__name(fileSizeFormat, "fileSizeFormat");
function wordWrap(text, width) {
  if (!Number.isFinite(width) || width < 1) return text;
  const lines = [];
  let current = "";
  for (const word of text.split(/\s+/)) {
    if (word === "") continue;
    if (current === "") {
      current = word;
    } else if (current.length + 1 + word.length <= width) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current !== "") lines.push(current);
  return lines.join("\n");
}
__name(wordWrap, "wordWrap");
function escapeJinjavaBraces(text) {
  return text.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
}
__name(escapeJinjavaBraces, "escapeJinjavaBraces");
function escapeJavaScriptString(text) {
  let out = "";
  for (const ch of text) {
    const code = ch.codePointAt(0);
    switch (ch) {
      case "\\":
        out += "\\\\";
        continue;
      case "'":
        out += "\\x27";
        continue;
      case '"':
        out += "\\x22";
        continue;
      case "<":
        out += "\\x3C";
        continue;
      case ">":
        out += "\\x3E";
        continue;
      case "\b":
        out += "\\b";
        continue;
      case "	":
        out += "\\t";
        continue;
      case "\n":
        out += "\\n";
        continue;
      case "\f":
        out += "\\f";
        continue;
      case "\r":
        out += "\\r";
        continue;
      case "\u2028":
        out += "\\u2028";
        continue;
      case "\u2029":
        out += "\\u2029";
        continue;
      default:
        break;
    }
    if (code < 32 || code === 127) {
      out += `\\u${code.toString(16).padStart(4, "0")}`;
    } else {
      out += ch;
    }
  }
  return out;
}
__name(escapeJavaScriptString, "escapeJavaScriptString");
var NAMED_ENTITIES = Object.assign(/* @__PURE__ */ Object.create(null), {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\xA0"
});
function unescapeHtmlEntities(text) {
  return text.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g, (whole, body) => {
    if (body[0] === "#") {
      const codePoint = body[1] === "x" || body[1] === "X" ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      if (!Number.isFinite(codePoint) || codePoint < 0 || codePoint > 1114111) return whole;
      try {
        return String.fromCodePoint(codePoint);
      } catch {
        return whole;
      }
    }
    const named = NAMED_ENTITIES[body.toLowerCase()];
    return named ?? whole;
  });
}
__name(unescapeHtmlEntities, "unescapeHtmlEntities");
function urlDecode(text) {
  try {
    return decodeURIComponent(text.replace(/\+/g, " "));
  } catch {
    return text;
  }
}
__name(urlDecode, "urlDecode");
var MD5_SHIFTS = [
  7,
  12,
  17,
  22,
  7,
  12,
  17,
  22,
  7,
  12,
  17,
  22,
  7,
  12,
  17,
  22,
  5,
  9,
  14,
  20,
  5,
  9,
  14,
  20,
  5,
  9,
  14,
  20,
  5,
  9,
  14,
  20,
  4,
  11,
  16,
  23,
  4,
  11,
  16,
  23,
  4,
  11,
  16,
  23,
  4,
  11,
  16,
  23,
  6,
  10,
  15,
  21,
  6,
  10,
  15,
  21,
  6,
  10,
  15,
  21,
  6,
  10,
  15,
  21
];
var MD5_SINE = (() => {
  const table = new Int32Array(64);
  for (let i = 0; i < 64; i++) table[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296);
  return table;
})();
function md5(input) {
  const message = new TextEncoder().encode(input);
  const bitLength = message.length * 8;
  const padded = new Uint8Array(((message.length + 8 >>> 6) + 1) * 64);
  padded.set(message);
  padded[message.length] = 128;
  const view = new DataView(padded.buffer);
  view.setUint32(padded.length - 8, bitLength >>> 0, true);
  view.setUint32(padded.length - 4, Math.floor(bitLength / 4294967296), true);
  let a0 = 1732584193 | 0;
  let b0 = 4023233417 | 0;
  let c0 = 2562383102 | 0;
  let d0 = 271733878 | 0;
  const block = new Int32Array(16);
  for (let offset = 0; offset < padded.length; offset += 64) {
    for (let j = 0; j < 16; j++) block[j] = view.getInt32(offset + j * 4, true);
    let a = a0;
    let b = b0;
    let c = c0;
    let d = d0;
    for (let i = 0; i < 64; i++) {
      let mixed;
      let index;
      if (i < 16) {
        mixed = b & c | ~b & d;
        index = i;
      } else if (i < 32) {
        mixed = d & b | ~d & c;
        index = (5 * i + 1) % 16;
      } else if (i < 48) {
        mixed = b ^ c ^ d;
        index = (3 * i + 5) % 16;
      } else {
        mixed = c ^ (b | ~d);
        index = 7 * i % 16;
      }
      const sum = mixed + a + MD5_SINE[i] + block[index] | 0;
      const shift = MD5_SHIFTS[i];
      a = d;
      d = c;
      c = b;
      b = b + (sum << shift | sum >>> 32 - shift) | 0;
    }
    a0 = a0 + a | 0;
    b0 = b0 + b | 0;
    c0 = c0 + c | 0;
    d0 = d0 + d | 0;
  }
  return littleEndianHex(a0) + littleEndianHex(b0) + littleEndianHex(c0) + littleEndianHex(d0);
}
__name(md5, "md5");
function littleEndianHex(word) {
  let hex = "";
  for (let i = 0; i < 4; i++) hex += (word >>> i * 8 & 255).toString(16).padStart(2, "0");
  return hex;
}
__name(littleEndianHex, "littleEndianHex");
var HublDateTime = class extends Date {
  static {
    __name(this, "HublDateTime");
  }
  offsetMinutes;
  constructor(epochMillis, offsetMinutes = 0) {
    super(epochMillis);
    this.offsetMinutes = offsetMinutes;
  }
  toString() {
    const wall = new Date(this.getTime() + this.offsetMinutes * 6e4);
    const pad = /* @__PURE__ */ __name((n, width = 2) => String(n).padStart(width, "0"), "pad");
    return `${pad(wall.getUTCFullYear(), 4)}-${pad(wall.getUTCMonth() + 1)}-${pad(wall.getUTCDate())} ${pad(wall.getUTCHours())}:${pad(wall.getUTCMinutes())}:${pad(wall.getUTCSeconds())}`;
  }
};
var MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];
function monthNumberFromName(name) {
  const wanted = name.toLowerCase();
  const index = MONTH_NAMES.findIndex((month) => month === wanted || month.slice(0, 3) === wanted);
  return index === -1 ? null : index + 1;
}
__name(monthNumberFromName, "monthNumberFromName");
var numericField = /* @__PURE__ */ __name((group, run) => `(?<${group}>\\d{${run === 1 ? "1,2" : run}})`, "numericField");
var JAVA_DATE_FIELDS = {
  y: /* @__PURE__ */ __name((run) => run === 2 ? "(?<year2>\\d{2})" : `(?<year>\\d{${run === 1 ? "1,4" : run}})`, "y"),
  M: /* @__PURE__ */ __name((run) => run >= 3 ? "(?<monthName>[A-Za-z]{3,12})" : numericField("month", run), "M"),
  d: /* @__PURE__ */ __name((run) => numericField("day", run), "d"),
  H: /* @__PURE__ */ __name((run) => numericField("hour", run), "H"),
  h: /* @__PURE__ */ __name((run) => numericField("hour12", run), "h"),
  m: /* @__PURE__ */ __name((run) => numericField("minute", run), "m"),
  s: /* @__PURE__ */ __name((run) => numericField("second", run), "s"),
  S: /* @__PURE__ */ __name((run) => `(?<millis>\\d{${run === 1 ? "1,3" : run}})`, "S"),
  a: /* @__PURE__ */ __name(() => "(?<meridiem>[AaPp][Mm])", "a"),
  X: /* @__PURE__ */ __name((run) => run >= 3 ? "(?<offset>Z|[+-]\\d{2}:\\d{2})" : "(?<offset>Z|[+-]\\d{2}(?::?\\d{2})?)", "X"),
  Z: /* @__PURE__ */ __name(() => "(?<offset>[+-]\\d{4})", "Z"),
  z: /* @__PURE__ */ __name(() => "(?<offset>Z|[+-]\\d{2}:?\\d{2})", "z")
};
function escapeRegExpLiteral(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
__name(escapeRegExpLiteral, "escapeRegExpLiteral");
function javaPatternToRegExp(pattern) {
  let source = "^";
  let cursor = 0;
  while (cursor < pattern.length) {
    const ch = pattern[cursor];
    if (ch === "'") {
      const close = pattern.indexOf("'", cursor + 1);
      if (close === -1) return null;
      const literal = pattern.slice(cursor + 1, close);
      source += literal === "" ? "'" : escapeRegExpLiteral(literal);
      cursor = close + 1;
      continue;
    }
    if (/[A-Za-z]/.test(ch)) {
      let run = 1;
      while (pattern[cursor + run] === ch) run += 1;
      const field = JAVA_DATE_FIELDS[ch];
      if (!field) return null;
      const fragment = field(run);
      if (fragment === null) return null;
      source += fragment;
      cursor += run;
      continue;
    }
    source += escapeRegExpLiteral(ch);
    cursor += 1;
  }
  try {
    return new RegExp(`${source}$`);
  } catch {
    return null;
  }
}
__name(javaPatternToRegExp, "javaPatternToRegExp");
function offsetMinutesFrom(text) {
  if (!text || text === "Z") return 0;
  const match = /^([+-])(\d{2}):?(\d{2})?$/.exec(text);
  if (!match) return 0;
  const sign = match[1] === "-" ? -1 : 1;
  return sign * (Number(match[2]) * 60 + Number(match[3] ?? "0"));
}
__name(offsetMinutesFrom, "offsetMinutesFrom");
function normaliseIsoOffset(text) {
  return text.replace(/([+-]\d{2})(\d{2})$/, "$1:$2");
}
__name(normaliseIsoOffset, "normaliseIsoOffset");
function parseHublDateTime(value, pattern) {
  if (value instanceof HublDateTime) return value;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : new HublDateTime(value.getTime(), 0);
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? new HublDateTime(value, 0) : null;
  }
  if (typeof value !== "string" || value.trim() === "") return null;
  const text = value.trim();
  if (pattern) {
    const matcher = javaPatternToRegExp(pattern);
    const match = matcher?.exec(text);
    const groups = match?.groups;
    const namedMonth = groups?.monthName === void 0 ? void 0 : monthNumberFromName(groups.monthName);
    if (groups && namedMonth !== null) {
      const year = groups.year !== void 0 ? Number(groups.year) : groups.year2 !== void 0 ? 2e3 + Number(groups.year2) : 1970;
      let hour = groups.hour !== void 0 ? Number(groups.hour) : 0;
      if (groups.hour12 !== void 0) {
        const twelve = Number(groups.hour12) % 12;
        hour = /^p/i.test(groups.meridiem ?? "") ? twelve + 12 : twelve;
      }
      const month = namedMonth ?? (groups.month !== void 0 ? Number(groups.month) : 1);
      const offsetMinutes2 = offsetMinutesFrom(groups.offset);
      const wallMillis = Date.UTC(
        year,
        month - 1,
        groups.day !== void 0 ? Number(groups.day) : 1,
        hour,
        groups.minute !== void 0 ? Number(groups.minute) : 0,
        groups.second !== void 0 ? Number(groups.second) : 0,
        groups.millis !== void 0 ? Number(groups.millis.slice(0, 3).padEnd(3, "0")) : 0
      );
      return new HublDateTime(wallMillis - offsetMinutes2 * 6e4, offsetMinutes2);
    }
  }
  const parsed = Date.parse(normaliseIsoOffset(text));
  if (Number.isNaN(parsed)) return null;
  const trailingOffset = /([+-]\d{2}):?(\d{2})$/.exec(text);
  const offsetMinutes = trailingOffset ? offsetMinutesFrom(`${trailingOffset[1]}:${trailingOffset[2]}`) : 0;
  return new HublDateTime(parsed, offsetMinutes);
}
__name(parseHublDateTime, "parseHublDateTime");
var TIME_PATTERN_TOKENS = ["HH", "H", "hh", "h", "mm", "m", "ss", "s", "SSS", "a"];
function zonedTimeParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).formatToParts(date);
  const read = /* @__PURE__ */ __name((type) => Number(parts.find((part) => part.type === type)?.value ?? "0"), "read");
  return { hour: read("hour"), minute: read("minute"), second: read("second") };
}
__name(zonedTimeParts, "zonedTimeParts");
function formatTimeComponent(date, format = "medium", timeZone, locale) {
  const zone = timeZone || "UTC";
  const named = ["short", "medium", "long", "full"];
  if (named.includes(format)) {
    const zeroOffsetSuffix = !timeZone && (format === "long" || format === "full");
    const style = zeroOffsetSuffix ? "medium" : format;
    try {
      const rendered = new Intl.DateTimeFormat(locale || "en-US", { timeStyle: style, timeZone: zone }).format(date);
      return zeroOffsetSuffix ? `${rendered} Z` : rendered;
    } catch {
      return date.toISOString();
    }
  }
  let parts;
  try {
    parts = zonedTimeParts(date, zone);
  } catch {
    parts = { hour: date.getUTCHours(), minute: date.getUTCMinutes(), second: date.getUTCSeconds() };
  }
  const pad = /* @__PURE__ */ __name((n) => String(n).padStart(2, "0"), "pad");
  const hour12 = parts.hour % 12 === 0 ? 12 : parts.hour % 12;
  let out = "";
  let cursor = 0;
  while (cursor < format.length) {
    const ch = format[cursor];
    if (ch === "'") {
      const close = format.indexOf("'", cursor + 1);
      if (close === -1) {
        out += format.slice(cursor + 1);
        break;
      }
      const literal = format.slice(cursor + 1, close);
      out += literal === "" ? "'" : literal;
      cursor = close + 1;
      continue;
    }
    const token = TIME_PATTERN_TOKENS.find((candidate) => format.startsWith(candidate, cursor));
    if (!token) {
      out += ch;
      cursor += 1;
      continue;
    }
    switch (token) {
      case "HH":
        out += pad(parts.hour);
        break;
      case "H":
        out += String(parts.hour);
        break;
      case "hh":
        out += pad(hour12);
        break;
      case "h":
        out += String(hour12);
        break;
      case "mm":
        out += pad(parts.minute);
        break;
      case "m":
        out += String(parts.minute);
        break;
      case "ss":
        out += pad(parts.second);
        break;
      case "s":
        out += String(parts.second);
        break;
      case "SSS":
        out += String(date.getUTCMilliseconds()).padStart(3, "0");
        break;
      case "a":
        out += parts.hour < 12 ? "AM" : "PM";
        break;
      default:
        out += token;
        break;
    }
    cursor += token.length;
  }
  return out;
}
__name(formatTimeComponent, "formatTimeComponent");
var DATE_FILTER_TIME_ZONE = "UTC";
function formatNamedDateStyle(date, style) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: style, timeZone: DATE_FILTER_TIME_ZONE }).format(date);
}
__name(formatNamedDateStyle, "formatNamedDateStyle");
var MONTH_TITLES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var WEEKDAY_TITLES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function formatJavaDatePattern(date, pattern) {
  if (Number.isNaN(date.getTime())) return null;
  const pad = /* @__PURE__ */ __name((n, width) => String(n).padStart(width, "0"), "pad");
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  let out = "";
  let cursor = 0;
  while (cursor < pattern.length) {
    const ch = pattern[cursor];
    if (ch === "'") {
      const close = pattern.indexOf("'", cursor + 1);
      if (close === -1) return null;
      const literal = pattern.slice(cursor + 1, close);
      out += literal === "" ? "'" : literal;
      cursor = close + 1;
      continue;
    }
    if (!/[A-Za-z]/.test(ch)) {
      out += ch;
      cursor += 1;
      continue;
    }
    let run = 1;
    while (pattern[cursor + run] === ch) run += 1;
    switch (ch) {
      case "y":
        out += run === 2 ? pad(year % 100, 2) : pad(year, run);
        break;
      case "M":
        if (run >= 4) out += MONTH_TITLES[month];
        else if (run === 3) out += MONTH_TITLES[month].slice(0, 3);
        else out += pad(month + 1, run);
        break;
      case "d":
        out += pad(day, run);
        break;
      case "E": {
        const weekday = WEEKDAY_TITLES[date.getUTCDay()];
        out += run >= 4 ? weekday : weekday.slice(0, 3);
        break;
      }
      case "H":
        out += pad(hour, run);
        break;
      case "h":
        out += pad(hour % 12 === 0 ? 12 : hour % 12, run);
        break;
      case "m":
        out += pad(date.getUTCMinutes(), run);
        break;
      case "s":
        out += pad(date.getUTCSeconds(), run);
        break;
      case "S":
        out += pad(date.getUTCMilliseconds(), 3).slice(0, run).padEnd(run, "0");
        break;
      case "a":
        out += hour < 12 ? "AM" : "PM";
        break;
      default:
        return null;
    }
    cursor += run;
  }
  return out;
}
__name(formatJavaDatePattern, "formatJavaDatePattern");

// src/diagnostics.ts
var DIAGNOSTIC_CODES = {
  MODULE_SHAPE_UNRECOGNISED: "MODULE_SHAPE_UNRECOGNISED",
  MODULE_RENDER_ERROR: "MODULE_RENDER_ERROR",
  HUBL_MODULE_ERROR: "HUBL_MODULE_ERROR",
  CSS_RENDER_ERROR: "CSS_RENDER_ERROR",
  SSR_BRIDGE_UNAVAILABLE: "SSR_BRIDGE_UNAVAILABLE",
  SSR_BRIDGE_REQUEST_FAILED: "SSR_BRIDGE_REQUEST_FAILED",
  REACT_MODULE_NOT_RENDERED: "REACT_MODULE_NOT_RENDERED",
  HUBL_FILTER_UNSUPPORTED: "HUBL_FILTER_UNSUPPORTED",
  HUBL_FILTER_UNIMPLEMENTED: "HUBL_FILTER_UNIMPLEMENTED",
  HUBL_GLOBAL_UNIMPLEMENTED: "HUBL_GLOBAL_UNIMPLEMENTED",
  HUBL_TRANSLATIONS_UNRESOLVED: "HUBL_TRANSLATIONS_UNRESOLVED",
  HUBL_WIDGET_EDITOR_ONLY: "HUBL_WIDGET_EDITOR_ONLY",
  HUBL_TAG_UNSUPPORTED: "HUBL_TAG_UNSUPPORTED",
  HUBL_DO_NO_OP: "HUBL_DO_NO_OP",
  HUBL_FOR_RECURSIVE_DEGRADED: "HUBL_FOR_RECURSIVE_DEGRADED",
  HUBL_SCOPE_CSS_UNSCOPED: "HUBL_SCOPE_CSS_UNSCOPED",
  HUBL_SCOPE_CSS_APPROXIMATE: "HUBL_SCOPE_CSS_APPROXIMATE",
  HUBL_DATA_TEMPLATE_FAILED: "HUBL_DATA_TEMPLATE_FAILED",
  HUBL_DATA_TEMPLATE_INVALID: "HUBL_DATA_TEMPLATE_INVALID",
  HUBL_DATA_FIXTURE_INVALID: "HUBL_DATA_FIXTURE_INVALID",
  CRM_OBJECT_FIXTURE_INVALID: "CRM_OBJECT_FIXTURE_INVALID",
  CRM_OBJECT_QUERY_NOT_APPLIED: "CRM_OBJECT_QUERY_NOT_APPLIED",
  SPECIMEN_SOURCE_FAILED: "SPECIMEN_SOURCE_FAILED",
  CONTENT_FIXTURE_INVALID: "CONTENT_FIXTURE_INVALID",
  CONTENT_STATE_UNKNOWN: "CONTENT_STATE_UNKNOWN",
  FIELD_TYPE_UNSUPPORTED: "FIELD_TYPE_UNSUPPORTED",
  THEME_MANIFEST_FALLBACK: "THEME_MANIFEST_FALLBACK",
  TEMPLATE_CONTEXT_UNREADABLE: "TEMPLATE_CONTEXT_UNREADABLE",
  INHERITANCE_PARENT_MISSING: "INHERITANCE_PARENT_MISSING",
  INHERITANCE_TOO_DEEP: "INHERITANCE_TOO_DEEP",
  DND_HIERARCHY_VIOLATION: "DND_HIERARCHY_VIOLATION",
  DND_ARGUMENT_SERIALISED: "DND_ARGUMENT_SERIALISED",
  FIELD_BOOLEAN_FORMAT: "FIELD_BOOLEAN_FORMAT",
  FIELD_REQUIRED_NO_DEFAULT: "FIELD_REQUIRED_NO_DEFAULT",
  FIELD_CONTENT_LINK_UNRESOLVABLE: "FIELD_CONTENT_LINK_UNRESOLVABLE",
  CONTENT_LINK_UNRESOLVED: "CONTENT_LINK_UNRESOLVED",
  FIELD_NAME_RESERVED: "FIELD_NAME_RESERVED",
  TEMPLATE_REQUIRED_VARIABLE_MISSING: "TEMPLATE_REQUIRED_VARIABLE_MISSING",
  HUBL_PARTIAL_NOT_FOUND: "HUBL_PARTIAL_NOT_FOUND",
  MODULE_NOT_FOUND: "MODULE_NOT_FOUND",
  HUBSPOT_INTERNAL_MODULE: "HUBSPOT_INTERNAL_MODULE",
  HUBSPOT_DEFAULT_MODULE_UNAVAILABLE: "HUBSPOT_DEFAULT_MODULE_UNAVAILABLE",
  HUBSPOT_DEFAULT_MODULE_NEEDS_PORTAL_DATA: "HUBSPOT_DEFAULT_MODULE_NEEDS_PORTAL_DATA",
  HUBSPOT_DEFAULT_MODULE_APPROXIMATED: "HUBSPOT_DEFAULT_MODULE_APPROXIMATED",
  REACT_MODULE_FIELD_SCHEMA_UNAVAILABLE: "REACT_MODULE_FIELD_SCHEMA_UNAVAILABLE",
  REACT_MODULE_FIELD_DEFAULT_UNEVALUABLE: "REACT_MODULE_FIELD_DEFAULT_UNEVALUABLE",
  VALIDATION_SOURCE_UNREADABLE: "VALIDATION_SOURCE_UNREADABLE",
  ASSET_BASE_URL_MISSING: "ASSET_BASE_URL_MISSING",
  ASSET_URL_UNRESOLVED: "ASSET_URL_UNRESOLVED",
  ASSET_BASE_URL_INVALID: "ASSET_BASE_URL_INVALID",
  PAGE_MODULE_NOT_DRAWN: "PAGE_MODULE_NOT_DRAWN",
  PAGE_TEMPLATE_NOT_DRAWN: "PAGE_TEMPLATE_NOT_DRAWN",
  PAGE_LAYOUT_UNBOUND: "PAGE_LAYOUT_UNBOUND",
  PAGE_WIDGET_UNBOUND: "PAGE_WIDGET_UNBOUND",
  PAGE_LAYOUT_INVALID: "PAGE_LAYOUT_INVALID",
  PAGE_THEME_ROOT_FILE_REJECTED: "PAGE_THEME_ROOT_FILE_REJECTED"
};
function diagnostic(code, message, details) {
  return new RendererError(code, message, details);
}
__name(diagnostic, "diagnostic");

// src/scope-css.ts
var import_nunjucks = __toESM(require_nunjucks(), 1);
var SCOPE_ATTRIBUTE = "data-themespot-scope";
var SCOPE_CONTEXT_VARIABLE = "__themespot_module_scope";
function scopeSelector(scopeId) {
  return `[${SCOPE_ATTRIBUTE}="${cssAttributeValue(scopeId)}"]`;
}
__name(scopeSelector, "scopeSelector");
function wrapScopedInstance(scopeId, html) {
  return `<div ${SCOPE_ATTRIBUTE}="${htmlAttributeValue(scopeId)}">${html}</div>`;
}
__name(wrapScopedInstance, "wrapScopedInstance");
function htmlAttributeValue(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
__name(htmlAttributeValue, "htmlAttributeValue");
function cssAttributeValue(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
__name(cssAttributeValue, "cssAttributeValue");
var CONDITIONAL_GROUP_AT_RULES = /* @__PURE__ */ new Set([
  "media",
  "supports",
  "container",
  "layer",
  "scope",
  "document",
  "starting-style"
]);
var GLOBAL_NAME_AT_RULES = /* @__PURE__ */ new Set([
  "keyframes",
  "font-face",
  "counter-style",
  "property"
]);
function scopeCssRules(css, scopeId) {
  const prefix = scopeSelector(scopeId);
  const degraded = [];
  const counter = { scoped: 0 };
  if (!STYLE_ELEMENT_PRESENT.test(css)) {
    return {
      css: transformRuleList(css, prefix, degraded, counter),
      degraded,
      scopedRuleCount: counter.scoped
    };
  }
  const out = css.replace(STYLE_ELEMENT, (_match, open, inner, close) => `${open}${transformRuleList(inner, prefix, degraded, counter)}${close}`);
  const outside = css.replace(STYLE_ELEMENT, "");
  const residue = outside.slice(startOfHead(outside));
  if (residue) degraded.push({ kind: "mixed-content", construct: summariseResidue(residue) });
  return { css: out, degraded, scopedRuleCount: counter.scoped };
}
__name(scopeCssRules, "scopeCssRules");
var STYLE_ELEMENT = /(<style\b[^>]*>)([\s\S]*?)(<\/style\s*>)/gi;
var STYLE_ELEMENT_PRESENT = /<style\b/i;
function skipCommentOrString(source, i) {
  if (source[i] === "/" && source[i + 1] === "*") {
    const end = source.indexOf("*/", i + 2);
    return end === -1 ? source.length : end + 2;
  }
  const quote = source[i];
  if (quote !== '"' && quote !== "'") return i;
  let j = i + 1;
  while (j < source.length) {
    if (source[j] === "\\") {
      j += 2;
      continue;
    }
    if (source[j] === quote) return j + 1;
    j++;
  }
  return source.length;
}
__name(skipCommentOrString, "skipCommentOrString");
function endOfBlock(source, open) {
  let depth = 0;
  let i = open;
  while (i < source.length) {
    const skipped = skipCommentOrString(source, i);
    if (skipped !== i) {
      i = skipped;
      continue;
    }
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) return i;
    }
    i++;
  }
  return source.length;
}
__name(endOfBlock, "endOfBlock");
function transformRuleList(source, prefix, degraded, counter) {
  let out = "";
  let preludeStart = 0;
  let i = 0;
  while (i < source.length) {
    const skipped = skipCommentOrString(source, i);
    if (skipped !== i) {
      i = skipped;
      continue;
    }
    if (source[i] === "{") {
      const prelude = source.slice(preludeStart, i);
      const close = endOfBlock(source, i);
      const body = source.slice(i + 1, close);
      out += transformRule(prelude, body, prefix, degraded, counter);
      i = close < source.length ? close + 1 : close;
      preludeStart = i;
      continue;
    }
    if (source[i] === ";") {
      out += source.slice(preludeStart, i + 1);
      i++;
      preludeStart = i;
      continue;
    }
    i++;
  }
  return out + source.slice(preludeStart);
}
__name(transformRuleList, "transformRuleList");
function transformRule(prelude, body, prefix, degraded, counter) {
  const headStart = startOfHead(prelude);
  const leading = prelude.slice(0, headStart);
  const head = prelude.slice(headStart).trim();
  const atRule = /^@([\w-]+)/.exec(head);
  if (atRule) {
    const keyword = atRule[1].toLowerCase().replace(/^-\w+-/, "");
    if (CONDITIONAL_GROUP_AT_RULES.has(keyword)) {
      return `${leading}${head} {${transformRuleList(body, prefix, degraded, counter)}}`;
    }
    degraded.push({
      kind: GLOBAL_NAME_AT_RULES.has(keyword) ? "at-rule" : "unknown-at-rule",
      construct: collapseWhitespace(head)
    });
    return `${leading}${head} {${body}}`;
  }
  const selectors = splitSelectorList(head).map((selector) => scopeOneSelector(selector, prefix, degraded, counter)).filter((selector) => selector.length > 0);
  if (selectors.length === 0) return `${prelude}{${body}}`;
  return `${leading}${selectors.join(", ")} {${body}}`;
}
__name(transformRule, "transformRule");
function collapseWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}
__name(collapseWhitespace, "collapseWhitespace");
var RESIDUE_CONSTRUCT_LIMIT = 120;
function summariseResidue(residue) {
  const text = collapseWhitespace(residue);
  if (text.length <= RESIDUE_CONSTRUCT_LIMIT) return text;
  return `${text.slice(0, RESIDUE_CONSTRUCT_LIMIT).trimEnd()}\u2026`;
}
__name(summariseResidue, "summariseResidue");
function splitSelectorList(source) {
  const parts = [];
  let depth = 0;
  let start = 0;
  let i = 0;
  while (i < source.length) {
    const skipped = skipCommentOrString(source, i);
    if (skipped !== i) {
      i = skipped;
      continue;
    }
    const ch = source[i];
    if (ch === "(" || ch === "[") depth++;
    else if (ch === ")" || ch === "]") depth--;
    else if (ch === "," && depth === 0) {
      parts.push(source.slice(start, i));
      start = i + 1;
    }
    i++;
  }
  parts.push(source.slice(start));
  return parts;
}
__name(splitSelectorList, "splitSelectorList");
var ROOT_SELECTOR = /^(:root|html|body)(?![\w-])/i;
function startOfHead(source) {
  let i = 0;
  while (i < source.length) {
    if (/\s/.test(source[i])) {
      i++;
      continue;
    }
    const skipped = skipCommentOrString(source, i);
    if (skipped !== i && source[i] === "/") {
      i = skipped;
      continue;
    }
    break;
  }
  return i;
}
__name(startOfHead, "startOfHead");
function scopeOneSelector(selector, prefix, degraded, counter) {
  const bodyStart = startOfHead(selector);
  const before = selector.slice(0, bodyStart).trim();
  const trimmed = selector.slice(bodyStart).trim();
  if (!trimmed) return "";
  const lead = before ? `${before} ` : "";
  const root = ROOT_SELECTOR.exec(trimmed);
  if (root) {
    degraded.push({ kind: "root-selector", construct: collapseWhitespace(trimmed) });
    counter.scoped++;
    return `${lead}${prefix}${trimmed.slice(root[0].length)}`;
  }
  counter.scoped++;
  return `${lead}${prefix} ${trimmed}`;
}
__name(scopeOneSelector, "scopeOneSelector");
var ScopeCssExtension = class {
  static {
    __name(this, "ScopeCssExtension");
  }
  tags = ["scope_css"];
  hooks;
  reportedUnscoped = /* @__PURE__ */ new WeakSet();
  reportedDegradations = /* @__PURE__ */ new WeakMap();
  constructor(hooks) {
    this.hooks = hooks;
  }
  parse(parser, nodes) {
    const tok = parser.nextToken();
    parser.advanceAfterBlockEnd(tok.value);
    const body = parser.parseUntilBlocks("end_scope_css");
    parser.advanceAfterBlockEnd();
    const args = new nodes.NodeList(tok.lineno, tok.colno, [
      new nodes.Symbol(tok.lineno, tok.colno, SCOPE_CONTEXT_VARIABLE)
    ]);
    return new nodes.CallExtension(this, "run", args, [body]);
  }
  run(_context, scopeId, body) {
    const content = typeof body === "function" ? body() : "";
    const id = typeof scopeId === "string" ? scopeId : "";
    if (!id || !content.trim()) {
      if (content.trim()) this.reportUnscoped();
      return new import_nunjucks.default.runtime.SafeString(content);
    }
    const { css, degraded, scopedRuleCount } = scopeCssRules(content, id);
    if (scopedRuleCount > 0) this.hooks.onScoped(id);
    this.reportDegradations(id, degraded);
    return new import_nunjucks.default.runtime.SafeString(css);
  }
  reportUnscoped() {
    if (this.reportedUnscoped.has(this.hooks.renderToken)) return;
    this.reportedUnscoped.add(this.hooks.renderToken);
    this.hooks.onDiagnostic(
      diagnostic(
        DIAGNOSTIC_CODES.HUBL_SCOPE_CSS_UNSCOPED,
        "scope_css was used outside a module instance, so its rules were rendered unscoped \u2014 they apply to the whole preview rather than to one module instance, and styling may bleed. The rules themselves are correct; only their scope is approximate.",
        { feature: "scope_css" }
      )
    );
  }
  reportDegradations(scopeId, degraded) {
    let seen = this.reportedDegradations.get(this.hooks.renderToken);
    if (!seen) {
      seen = /* @__PURE__ */ new Set();
      this.reportedDegradations.set(this.hooks.renderToken, seen);
    }
    for (const entry of degraded) {
      const signature = `${scopeId}:${entry.kind}:${entry.construct}`;
      if (seen.has(signature)) continue;
      seen.add(signature);
      this.hooks.onDiagnostic(
        diagnostic(
          DIAGNOSTIC_CODES.HUBL_SCOPE_CSS_APPROXIMATE,
          degradationMessage(entry),
          {
            feature: "scope_css",
            instance: scopeId,
            kind: entry.kind,
            construct: entry.construct
          }
        )
      );
    }
  }
};
function degradationMessage(entry) {
  switch (entry.kind) {
    case "at-rule":
      return `scope_css could not scope '${entry.construct}' to one module instance: the at-rule registers a document-wide name, so two instances declaring the same one still collide. It was left as written.`;
    case "unknown-at-rule":
      return `scope_css did not recurse into '${entry.construct}': it is not an at-rule the renderer knows to hold a list of rules, so the body was copied exactly as written. Any selector inside it is unscoped and can bleed onto other instances and other modules.`;
    case "root-selector":
      return `scope_css rewrote '${entry.construct}' to the module instance's wrapper: a rule rooted at the document cannot be contained by a descendant of it. Anything the selector required of :root, html or body will not match the wrapper.`;
    case "mixed-content":
      return `scope_css scoped only what was inside the block's <style> element: the block also carried bare CSS around it ('${entry.construct}'), which was emitted as written and applies to the whole preview rather than to this instance. Move it inside the <style> element to have it scoped.`;
  }
}
__name(degradationMessage, "degradationMessage");

export {
  hexToRgb,
  toFiniteNumber,
  logarithm,
  nthRoot,
  formatNumberForLocale,
  fileSizeFormat,
  wordWrap,
  escapeJinjavaBraces,
  escapeJavaScriptString,
  unescapeHtmlEntities,
  urlDecode,
  md5,
  parseHublDateTime,
  formatTimeComponent,
  formatNamedDateStyle,
  formatJavaDatePattern,
  DIAGNOSTIC_CODES,
  diagnostic,
  SCOPE_CONTEXT_VARIABLE,
  wrapScopedInstance,
  ScopeCssExtension
};
