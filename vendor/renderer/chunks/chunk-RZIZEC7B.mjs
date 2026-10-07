import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import {
  __commonJS,
  __name,
  __require
} from "./chunk-PPQVNGDG.mjs";

// node_modules/nunjucks/src/lib.js
var require_lib = __commonJS({
  "node_modules/nunjucks/src/lib.js"(exports, module) {
    "use strict";
    var ArrayProto = Array.prototype;
    var ObjProto = Object.prototype;
    var escapeMap = {
      "&": "&amp;",
      '"': "&quot;",
      "'": "&#39;",
      "<": "&lt;",
      ">": "&gt;",
      "\\": "&#92;"
    };
    var escapeRegex = /[&"'<>\\]/g;
    var _exports = module.exports = {};
    function hasOwnProp(obj, k) {
      return ObjProto.hasOwnProperty.call(obj, k);
    }
    __name(hasOwnProp, "hasOwnProp");
    _exports.hasOwnProp = hasOwnProp;
    function lookupEscape(ch) {
      return escapeMap[ch];
    }
    __name(lookupEscape, "lookupEscape");
    function _prettifyError(path, withInternals, err) {
      if (!err.Update) {
        err = new _exports.TemplateError(err);
      }
      err.Update(path);
      if (!withInternals) {
        var old = err;
        err = new Error(old.message);
        err.name = old.name;
      }
      return err;
    }
    __name(_prettifyError, "_prettifyError");
    _exports._prettifyError = _prettifyError;
    function TemplateError(message, lineno, colno) {
      var err;
      var cause;
      if (message instanceof Error) {
        cause = message;
        message = cause.name + ": " + cause.message;
      }
      if (Object.setPrototypeOf) {
        err = new Error(message);
        Object.setPrototypeOf(err, TemplateError.prototype);
      } else {
        err = this;
        Object.defineProperty(err, "message", {
          enumerable: false,
          writable: true,
          value: message
        });
      }
      Object.defineProperty(err, "name", {
        value: "Template render error"
      });
      if (Error.captureStackTrace) {
        Error.captureStackTrace(err, this.constructor);
      }
      var getStack;
      if (cause) {
        var stackDescriptor = Object.getOwnPropertyDescriptor(cause, "stack");
        getStack = stackDescriptor && (stackDescriptor.get || function() {
          return stackDescriptor.value;
        });
        if (!getStack) {
          getStack = /* @__PURE__ */ __name(function getStack2() {
            return cause.stack;
          }, "getStack");
        }
      } else {
        var stack = new Error(message).stack;
        getStack = /* @__PURE__ */ __name(function getStack2() {
          return stack;
        }, "getStack");
      }
      Object.defineProperty(err, "stack", {
        get: /* @__PURE__ */ __name(function get() {
          return getStack.call(err);
        }, "get")
      });
      Object.defineProperty(err, "cause", {
        value: cause
      });
      err.lineno = lineno;
      err.colno = colno;
      err.firstUpdate = true;
      err.Update = /* @__PURE__ */ __name(function Update(path) {
        var msg = "(" + (path || "unknown path") + ")";
        if (this.firstUpdate) {
          if (this.lineno && this.colno) {
            msg += " [Line " + this.lineno + ", Column " + this.colno + "]";
          } else if (this.lineno) {
            msg += " [Line " + this.lineno + "]";
          }
        }
        msg += "\n ";
        if (this.firstUpdate) {
          msg += " ";
        }
        this.message = msg + (this.message || "");
        this.firstUpdate = false;
        return this;
      }, "Update");
      return err;
    }
    __name(TemplateError, "TemplateError");
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(TemplateError.prototype, Error.prototype);
    } else {
      TemplateError.prototype = Object.create(Error.prototype, {
        constructor: {
          value: TemplateError
        }
      });
    }
    _exports.TemplateError = TemplateError;
    function escape(val) {
      return val.replace(escapeRegex, lookupEscape);
    }
    __name(escape, "escape");
    _exports.escape = escape;
    function isFunction(obj) {
      return ObjProto.toString.call(obj) === "[object Function]";
    }
    __name(isFunction, "isFunction");
    _exports.isFunction = isFunction;
    function isArray(obj) {
      return ObjProto.toString.call(obj) === "[object Array]";
    }
    __name(isArray, "isArray");
    _exports.isArray = isArray;
    function isString(obj) {
      return ObjProto.toString.call(obj) === "[object String]";
    }
    __name(isString, "isString");
    _exports.isString = isString;
    function isObject(obj) {
      return ObjProto.toString.call(obj) === "[object Object]";
    }
    __name(isObject, "isObject");
    _exports.isObject = isObject;
    function _prepareAttributeParts(attr) {
      if (!attr) {
        return [];
      }
      if (typeof attr === "string") {
        return attr.split(".");
      }
      return [attr];
    }
    __name(_prepareAttributeParts, "_prepareAttributeParts");
    function getAttrGetter(attribute) {
      var parts = _prepareAttributeParts(attribute);
      return /* @__PURE__ */ __name(function attrGetter(item) {
        var _item = item;
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
          if (hasOwnProp(_item, part)) {
            _item = _item[part];
          } else {
            return void 0;
          }
        }
        return _item;
      }, "attrGetter");
    }
    __name(getAttrGetter, "getAttrGetter");
    _exports.getAttrGetter = getAttrGetter;
    function groupBy(obj, val, throwOnUndefined) {
      var result = {};
      var iterator = isFunction(val) ? val : getAttrGetter(val);
      for (var i = 0; i < obj.length; i++) {
        var value = obj[i];
        var key = iterator(value, i);
        if (key === void 0 && throwOnUndefined === true) {
          throw new TypeError('groupby: attribute "' + val + '" resolved to undefined');
        }
        (result[key] || (result[key] = [])).push(value);
      }
      return result;
    }
    __name(groupBy, "groupBy");
    _exports.groupBy = groupBy;
    function toArray(obj) {
      return Array.prototype.slice.call(obj);
    }
    __name(toArray, "toArray");
    _exports.toArray = toArray;
    function without(array) {
      var result = [];
      if (!array) {
        return result;
      }
      var length = array.length;
      var contains = toArray(arguments).slice(1);
      var index = -1;
      while (++index < length) {
        if (indexOf(contains, array[index]) === -1) {
          result.push(array[index]);
        }
      }
      return result;
    }
    __name(without, "without");
    _exports.without = without;
    function repeat(char_, n) {
      var str = "";
      for (var i = 0; i < n; i++) {
        str += char_;
      }
      return str;
    }
    __name(repeat, "repeat");
    _exports.repeat = repeat;
    function each(obj, func, context) {
      if (obj == null) {
        return;
      }
      if (ArrayProto.forEach && obj.forEach === ArrayProto.forEach) {
        obj.forEach(func, context);
      } else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
          func.call(context, obj[i], i, obj);
        }
      }
    }
    __name(each, "each");
    _exports.each = each;
    function map(obj, func) {
      var results = [];
      if (obj == null) {
        return results;
      }
      if (ArrayProto.map && obj.map === ArrayProto.map) {
        return obj.map(func);
      }
      for (var i = 0; i < obj.length; i++) {
        results[results.length] = func(obj[i], i);
      }
      if (obj.length === +obj.length) {
        results.length = obj.length;
      }
      return results;
    }
    __name(map, "map");
    _exports.map = map;
    function asyncIter(arr, iter, cb) {
      var i = -1;
      function next() {
        i++;
        if (i < arr.length) {
          iter(arr[i], i, next, cb);
        } else {
          cb();
        }
      }
      __name(next, "next");
      next();
    }
    __name(asyncIter, "asyncIter");
    _exports.asyncIter = asyncIter;
    function asyncFor(obj, iter, cb) {
      var keys = keys_(obj || {});
      var len = keys.length;
      var i = -1;
      function next() {
        i++;
        var k = keys[i];
        if (i < len) {
          iter(k, obj[k], i, len, next);
        } else {
          cb();
        }
      }
      __name(next, "next");
      next();
    }
    __name(asyncFor, "asyncFor");
    _exports.asyncFor = asyncFor;
    function indexOf(arr, searchElement, fromIndex) {
      return Array.prototype.indexOf.call(arr || [], searchElement, fromIndex);
    }
    __name(indexOf, "indexOf");
    _exports.indexOf = indexOf;
    function keys_(obj) {
      var arr = [];
      for (var k in obj) {
        if (hasOwnProp(obj, k)) {
          arr.push(k);
        }
      }
      return arr;
    }
    __name(keys_, "keys_");
    _exports.keys = keys_;
    function _entries(obj) {
      return keys_(obj).map(function(k) {
        return [k, obj[k]];
      });
    }
    __name(_entries, "_entries");
    _exports._entries = _entries;
    function _values(obj) {
      return keys_(obj).map(function(k) {
        return obj[k];
      });
    }
    __name(_values, "_values");
    _exports._values = _values;
    function extend(obj1, obj2) {
      obj1 = obj1 || {};
      keys_(obj2).forEach(function(k) {
        obj1[k] = obj2[k];
      });
      return obj1;
    }
    __name(extend, "extend");
    _exports._assign = _exports.extend = extend;
    function inOperator(key, val) {
      if (isArray(val) || isString(val)) {
        return val.indexOf(key) !== -1;
      } else if (isObject(val)) {
        return key in val;
      }
      throw new Error('Cannot use "in" operator to search for "' + key + '" in unexpected types.');
    }
    __name(inOperator, "inOperator");
    _exports.inOperator = inOperator;
  }
});

// node_modules/asap/raw.js
var require_raw = __commonJS({
  "node_modules/asap/raw.js"(exports, module) {
    "use strict";
    var domain;
    var hasSetImmediate = typeof setImmediate === "function";
    module.exports = rawAsap;
    function rawAsap(task) {
      if (!queue.length) {
        requestFlush();
        flushing = true;
      }
      queue[queue.length] = task;
    }
    __name(rawAsap, "rawAsap");
    var queue = [];
    var flushing = false;
    var index = 0;
    var capacity = 1024;
    function flush() {
      while (index < queue.length) {
        var currentIndex = index;
        index = index + 1;
        queue[currentIndex].call();
        if (index > capacity) {
          for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
            queue[scan] = queue[scan + index];
          }
          queue.length -= index;
          index = 0;
        }
      }
      queue.length = 0;
      index = 0;
      flushing = false;
    }
    __name(flush, "flush");
    rawAsap.requestFlush = requestFlush;
    function requestFlush() {
      var parentDomain = process.domain;
      if (parentDomain) {
        if (!domain) {
          domain = __require("domain");
        }
        domain.active = process.domain = null;
      }
      if (flushing && hasSetImmediate) {
        setImmediate(flush);
      } else {
        process.nextTick(flush);
      }
      if (parentDomain) {
        domain.active = process.domain = parentDomain;
      }
    }
    __name(requestFlush, "requestFlush");
  }
});

// node_modules/asap/asap.js
var require_asap = __commonJS({
  "node_modules/asap/asap.js"(exports, module) {
    "use strict";
    var rawAsap = require_raw();
    var freeTasks = [];
    module.exports = asap;
    function asap(task) {
      var rawTask;
      if (freeTasks.length) {
        rawTask = freeTasks.pop();
      } else {
        rawTask = new RawTask();
      }
      rawTask.task = task;
      rawTask.domain = process.domain;
      rawAsap(rawTask);
    }
    __name(asap, "asap");
    function RawTask() {
      this.task = null;
      this.domain = null;
    }
    __name(RawTask, "RawTask");
    RawTask.prototype.call = function() {
      if (this.domain) {
        this.domain.enter();
      }
      var threw = true;
      try {
        this.task.call();
        threw = false;
        if (this.domain) {
          this.domain.exit();
        }
      } finally {
        if (threw) {
          rawAsap.requestFlush();
        }
        this.task = null;
        this.domain = null;
        freeTasks.push(this);
      }
    };
  }
});

// node_modules/a-sync-waterfall/index.js
var require_a_sync_waterfall = __commonJS({
  "node_modules/a-sync-waterfall/index.js"(exports, module) {
    (function(globals) {
      "use strict";
      var executeSync = /* @__PURE__ */ __name(function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "function") {
          args[0].apply(null, args.splice(1));
        }
      }, "executeSync");
      var executeAsync = /* @__PURE__ */ __name(function(fn) {
        if (typeof setImmediate === "function") {
          setImmediate(fn);
        } else if (typeof process !== "undefined" && process.nextTick) {
          process.nextTick(fn);
        } else {
          setTimeout(fn, 0);
        }
      }, "executeAsync");
      var makeIterator = /* @__PURE__ */ __name(function(tasks) {
        var makeCallback = /* @__PURE__ */ __name(function(index) {
          var fn = /* @__PURE__ */ __name(function() {
            if (tasks.length) {
              tasks[index].apply(null, arguments);
            }
            return fn.next();
          }, "fn");
          fn.next = function() {
            return index < tasks.length - 1 ? makeCallback(index + 1) : null;
          };
          return fn;
        }, "makeCallback");
        return makeCallback(0);
      }, "makeIterator");
      var _isArray = Array.isArray || function(maybeArray) {
        return Object.prototype.toString.call(maybeArray) === "[object Array]";
      };
      var waterfall = /* @__PURE__ */ __name(function(tasks, callback, forceAsync) {
        var nextTick = forceAsync ? executeAsync : executeSync;
        callback = callback || function() {
        };
        if (!_isArray(tasks)) {
          var err = new Error("First argument to waterfall must be an array of functions");
          return callback(err);
        }
        if (!tasks.length) {
          return callback();
        }
        var wrapIterator = /* @__PURE__ */ __name(function(iterator) {
          return function(err2) {
            if (err2) {
              callback.apply(null, arguments);
              callback = /* @__PURE__ */ __name(function() {
              }, "callback");
            } else {
              var args = Array.prototype.slice.call(arguments, 1);
              var next = iterator.next();
              if (next) {
                args.push(wrapIterator(next));
              } else {
                args.push(callback);
              }
              nextTick(function() {
                iterator.apply(null, args);
              });
            }
          };
        }, "wrapIterator");
        wrapIterator(makeIterator(tasks))();
      }, "waterfall");
      if (typeof define !== "undefined" && define.amd) {
        define([], function() {
          return waterfall;
        });
      } else if (typeof module !== "undefined" && module.exports) {
        module.exports = waterfall;
      } else {
        globals.waterfall = waterfall;
      }
    })(exports);
  }
});

// node_modules/nunjucks/src/lexer.js
var require_lexer = __commonJS({
  "node_modules/nunjucks/src/lexer.js"(exports, module) {
    "use strict";
    var lib = require_lib();
    var whitespaceChars = " \n	\r\xA0";
    var delimChars = "()[]{}%*-+~/#,:|.<>=!";
    var intChars = "0123456789";
    var BLOCK_START = "{%";
    var BLOCK_END = "%}";
    var VARIABLE_START = "{{";
    var VARIABLE_END = "}}";
    var COMMENT_START = "{#";
    var COMMENT_END = "#}";
    var TOKEN_STRING = "string";
    var TOKEN_WHITESPACE = "whitespace";
    var TOKEN_DATA = "data";
    var TOKEN_BLOCK_START = "block-start";
    var TOKEN_BLOCK_END = "block-end";
    var TOKEN_VARIABLE_START = "variable-start";
    var TOKEN_VARIABLE_END = "variable-end";
    var TOKEN_COMMENT = "comment";
    var TOKEN_LEFT_PAREN = "left-paren";
    var TOKEN_RIGHT_PAREN = "right-paren";
    var TOKEN_LEFT_BRACKET = "left-bracket";
    var TOKEN_RIGHT_BRACKET = "right-bracket";
    var TOKEN_LEFT_CURLY = "left-curly";
    var TOKEN_RIGHT_CURLY = "right-curly";
    var TOKEN_OPERATOR = "operator";
    var TOKEN_COMMA = "comma";
    var TOKEN_COLON = "colon";
    var TOKEN_TILDE = "tilde";
    var TOKEN_PIPE = "pipe";
    var TOKEN_INT = "int";
    var TOKEN_FLOAT = "float";
    var TOKEN_BOOLEAN = "boolean";
    var TOKEN_NONE = "none";
    var TOKEN_SYMBOL = "symbol";
    var TOKEN_SPECIAL = "special";
    var TOKEN_REGEX = "regex";
    function token(type, value, lineno, colno) {
      return {
        type,
        value,
        lineno,
        colno
      };
    }
    __name(token, "token");
    var Tokenizer = /* @__PURE__ */ (function() {
      function Tokenizer2(str, opts) {
        this.str = str;
        this.index = 0;
        this.len = str.length;
        this.lineno = 0;
        this.colno = 0;
        this.in_code = false;
        opts = opts || {};
        var tags = opts.tags || {};
        this.tags = {
          BLOCK_START: tags.blockStart || BLOCK_START,
          BLOCK_END: tags.blockEnd || BLOCK_END,
          VARIABLE_START: tags.variableStart || VARIABLE_START,
          VARIABLE_END: tags.variableEnd || VARIABLE_END,
          COMMENT_START: tags.commentStart || COMMENT_START,
          COMMENT_END: tags.commentEnd || COMMENT_END
        };
        this.trimBlocks = !!opts.trimBlocks;
        this.lstripBlocks = !!opts.lstripBlocks;
      }
      __name(Tokenizer2, "Tokenizer");
      var _proto = Tokenizer2.prototype;
      _proto.nextToken = /* @__PURE__ */ __name(function nextToken() {
        var lineno = this.lineno;
        var colno = this.colno;
        var tok;
        if (this.in_code) {
          var cur = this.current();
          if (this.isFinished()) {
            return null;
          } else if (cur === '"' || cur === "'") {
            return token(TOKEN_STRING, this._parseString(cur), lineno, colno);
          } else if (tok = this._extract(whitespaceChars)) {
            return token(TOKEN_WHITESPACE, tok, lineno, colno);
          } else if ((tok = this._extractString(this.tags.BLOCK_END)) || (tok = this._extractString("-" + this.tags.BLOCK_END))) {
            this.in_code = false;
            if (this.trimBlocks) {
              cur = this.current();
              if (cur === "\n") {
                this.forward();
              } else if (cur === "\r") {
                this.forward();
                cur = this.current();
                if (cur === "\n") {
                  this.forward();
                } else {
                  this.back();
                }
              }
            }
            return token(TOKEN_BLOCK_END, tok, lineno, colno);
          } else if ((tok = this._extractString(this.tags.VARIABLE_END)) || (tok = this._extractString("-" + this.tags.VARIABLE_END))) {
            this.in_code = false;
            return token(TOKEN_VARIABLE_END, tok, lineno, colno);
          } else if (cur === "r" && this.str.charAt(this.index + 1) === "/") {
            this.forwardN(2);
            var regexBody = "";
            while (!this.isFinished()) {
              if (this.current() === "/" && this.previous() !== "\\") {
                this.forward();
                break;
              } else {
                regexBody += this.current();
                this.forward();
              }
            }
            var POSSIBLE_FLAGS = ["g", "i", "m", "y"];
            var regexFlags = "";
            while (!this.isFinished()) {
              var isCurrentAFlag = POSSIBLE_FLAGS.indexOf(this.current()) !== -1;
              if (isCurrentAFlag) {
                regexFlags += this.current();
                this.forward();
              } else {
                break;
              }
            }
            return token(TOKEN_REGEX, {
              body: regexBody,
              flags: regexFlags
            }, lineno, colno);
          } else if (delimChars.indexOf(cur) !== -1) {
            this.forward();
            var complexOps = ["==", "===", "!=", "!==", "<=", ">=", "//", "**"];
            var curComplex = cur + this.current();
            var type;
            if (lib.indexOf(complexOps, curComplex) !== -1) {
              this.forward();
              cur = curComplex;
              if (lib.indexOf(complexOps, curComplex + this.current()) !== -1) {
                cur = curComplex + this.current();
                this.forward();
              }
            }
            switch (cur) {
              case "(":
                type = TOKEN_LEFT_PAREN;
                break;
              case ")":
                type = TOKEN_RIGHT_PAREN;
                break;
              case "[":
                type = TOKEN_LEFT_BRACKET;
                break;
              case "]":
                type = TOKEN_RIGHT_BRACKET;
                break;
              case "{":
                type = TOKEN_LEFT_CURLY;
                break;
              case "}":
                type = TOKEN_RIGHT_CURLY;
                break;
              case ",":
                type = TOKEN_COMMA;
                break;
              case ":":
                type = TOKEN_COLON;
                break;
              case "~":
                type = TOKEN_TILDE;
                break;
              case "|":
                type = TOKEN_PIPE;
                break;
              default:
                type = TOKEN_OPERATOR;
            }
            return token(type, cur, lineno, colno);
          } else {
            tok = this._extractUntil(whitespaceChars + delimChars);
            if (tok.match(/^[-+]?[0-9]+$/)) {
              if (this.current() === ".") {
                this.forward();
                var dec = this._extract(intChars);
                return token(TOKEN_FLOAT, tok + "." + dec, lineno, colno);
              } else {
                return token(TOKEN_INT, tok, lineno, colno);
              }
            } else if (tok.match(/^(true|false)$/)) {
              return token(TOKEN_BOOLEAN, tok, lineno, colno);
            } else if (tok === "none") {
              return token(TOKEN_NONE, tok, lineno, colno);
            } else if (tok === "null") {
              return token(TOKEN_NONE, tok, lineno, colno);
            } else if (tok) {
              return token(TOKEN_SYMBOL, tok, lineno, colno);
            } else {
              throw new Error("Unexpected value while parsing: " + tok);
            }
          }
        } else {
          var beginChars = this.tags.BLOCK_START.charAt(0) + this.tags.VARIABLE_START.charAt(0) + this.tags.COMMENT_START.charAt(0) + this.tags.COMMENT_END.charAt(0);
          if (this.isFinished()) {
            return null;
          } else if ((tok = this._extractString(this.tags.BLOCK_START + "-")) || (tok = this._extractString(this.tags.BLOCK_START))) {
            this.in_code = true;
            return token(TOKEN_BLOCK_START, tok, lineno, colno);
          } else if ((tok = this._extractString(this.tags.VARIABLE_START + "-")) || (tok = this._extractString(this.tags.VARIABLE_START))) {
            this.in_code = true;
            return token(TOKEN_VARIABLE_START, tok, lineno, colno);
          } else {
            tok = "";
            var data;
            var inComment = false;
            if (this._matches(this.tags.COMMENT_START)) {
              inComment = true;
              tok = this._extractString(this.tags.COMMENT_START);
            }
            while ((data = this._extractUntil(beginChars)) !== null) {
              tok += data;
              if ((this._matches(this.tags.BLOCK_START) || this._matches(this.tags.VARIABLE_START) || this._matches(this.tags.COMMENT_START)) && !inComment) {
                if (this.lstripBlocks && this._matches(this.tags.BLOCK_START) && this.colno > 0 && this.colno <= tok.length) {
                  var lastLine = tok.slice(-this.colno);
                  if (/^\s+$/.test(lastLine)) {
                    tok = tok.slice(0, -this.colno);
                    if (!tok.length) {
                      return this.nextToken();
                    }
                  }
                }
                break;
              } else if (this._matches(this.tags.COMMENT_END)) {
                if (!inComment) {
                  throw new Error("unexpected end of comment");
                }
                tok += this._extractString(this.tags.COMMENT_END);
                break;
              } else {
                tok += this.current();
                this.forward();
              }
            }
            if (data === null && inComment) {
              throw new Error("expected end of comment, got end of file");
            }
            return token(inComment ? TOKEN_COMMENT : TOKEN_DATA, tok, lineno, colno);
          }
        }
      }, "nextToken");
      _proto._parseString = /* @__PURE__ */ __name(function _parseString(delimiter) {
        this.forward();
        var str = "";
        while (!this.isFinished() && this.current() !== delimiter) {
          var cur = this.current();
          if (cur === "\\") {
            this.forward();
            switch (this.current()) {
              case "n":
                str += "\n";
                break;
              case "t":
                str += "	";
                break;
              case "r":
                str += "\r";
                break;
              default:
                str += this.current();
            }
            this.forward();
          } else {
            str += cur;
            this.forward();
          }
        }
        this.forward();
        return str;
      }, "_parseString");
      _proto._matches = /* @__PURE__ */ __name(function _matches(str) {
        if (this.index + str.length > this.len) {
          return null;
        }
        var m = this.str.slice(this.index, this.index + str.length);
        return m === str;
      }, "_matches");
      _proto._extractString = /* @__PURE__ */ __name(function _extractString(str) {
        if (this._matches(str)) {
          this.forwardN(str.length);
          return str;
        }
        return null;
      }, "_extractString");
      _proto._extractUntil = /* @__PURE__ */ __name(function _extractUntil(charString) {
        return this._extractMatching(true, charString || "");
      }, "_extractUntil");
      _proto._extract = /* @__PURE__ */ __name(function _extract(charString) {
        return this._extractMatching(false, charString);
      }, "_extract");
      _proto._extractMatching = /* @__PURE__ */ __name(function _extractMatching(breakOnMatch, charString) {
        if (this.isFinished()) {
          return null;
        }
        var first = charString.indexOf(this.current());
        if (breakOnMatch && first === -1 || !breakOnMatch && first !== -1) {
          var t = this.current();
          this.forward();
          var idx = charString.indexOf(this.current());
          while ((breakOnMatch && idx === -1 || !breakOnMatch && idx !== -1) && !this.isFinished()) {
            t += this.current();
            this.forward();
            idx = charString.indexOf(this.current());
          }
          return t;
        }
        return "";
      }, "_extractMatching");
      _proto._extractRegex = /* @__PURE__ */ __name(function _extractRegex(regex) {
        var matches = this.currentStr().match(regex);
        if (!matches) {
          return null;
        }
        this.forwardN(matches[0].length);
        return matches;
      }, "_extractRegex");
      _proto.isFinished = /* @__PURE__ */ __name(function isFinished() {
        return this.index >= this.len;
      }, "isFinished");
      _proto.forwardN = /* @__PURE__ */ __name(function forwardN(n) {
        for (var i = 0; i < n; i++) {
          this.forward();
        }
      }, "forwardN");
      _proto.forward = /* @__PURE__ */ __name(function forward() {
        this.index++;
        if (this.previous() === "\n") {
          this.lineno++;
          this.colno = 0;
        } else {
          this.colno++;
        }
      }, "forward");
      _proto.backN = /* @__PURE__ */ __name(function backN(n) {
        for (var i = 0; i < n; i++) {
          this.back();
        }
      }, "backN");
      _proto.back = /* @__PURE__ */ __name(function back() {
        this.index--;
        if (this.current() === "\n") {
          this.lineno--;
          var idx = this.src.lastIndexOf("\n", this.index - 1);
          if (idx === -1) {
            this.colno = this.index;
          } else {
            this.colno = this.index - idx;
          }
        } else {
          this.colno--;
        }
      }, "back");
      _proto.current = /* @__PURE__ */ __name(function current() {
        if (!this.isFinished()) {
          return this.str.charAt(this.index);
        }
        return "";
      }, "current");
      _proto.currentStr = /* @__PURE__ */ __name(function currentStr() {
        if (!this.isFinished()) {
          return this.str.substr(this.index);
        }
        return "";
      }, "currentStr");
      _proto.previous = /* @__PURE__ */ __name(function previous() {
        return this.str.charAt(this.index - 1);
      }, "previous");
      return Tokenizer2;
    })();
    module.exports = {
      lex: /* @__PURE__ */ __name(function lex(src, opts) {
        return new Tokenizer(src, opts);
      }, "lex"),
      TOKEN_STRING,
      TOKEN_WHITESPACE,
      TOKEN_DATA,
      TOKEN_BLOCK_START,
      TOKEN_BLOCK_END,
      TOKEN_VARIABLE_START,
      TOKEN_VARIABLE_END,
      TOKEN_COMMENT,
      TOKEN_LEFT_PAREN,
      TOKEN_RIGHT_PAREN,
      TOKEN_LEFT_BRACKET,
      TOKEN_RIGHT_BRACKET,
      TOKEN_LEFT_CURLY,
      TOKEN_RIGHT_CURLY,
      TOKEN_OPERATOR,
      TOKEN_COMMA,
      TOKEN_COLON,
      TOKEN_TILDE,
      TOKEN_PIPE,
      TOKEN_INT,
      TOKEN_FLOAT,
      TOKEN_BOOLEAN,
      TOKEN_NONE,
      TOKEN_SYMBOL,
      TOKEN_SPECIAL,
      TOKEN_REGEX
    };
  }
});

// node_modules/nunjucks/src/object.js
var require_object = __commonJS({
  "node_modules/nunjucks/src/object.js"(exports, module) {
    "use strict";
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    __name(_defineProperties, "_defineProperties");
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    __name(_createClass, "_createClass");
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    __name(_toPropertyKey, "_toPropertyKey");
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    __name(_toPrimitive, "_toPrimitive");
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    __name(_inheritsLoose, "_inheritsLoose");
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      }, "_setPrototypeOf");
      return _setPrototypeOf(o, p);
    }
    __name(_setPrototypeOf, "_setPrototypeOf");
    var EventEmitter = __require("events");
    var lib = require_lib();
    function parentWrap(parent, prop) {
      if (typeof parent !== "function" || typeof prop !== "function") {
        return prop;
      }
      return /* @__PURE__ */ __name(function wrap() {
        var tmp = this.parent;
        this.parent = parent;
        var res = prop.apply(this, arguments);
        this.parent = tmp;
        return res;
      }, "wrap");
    }
    __name(parentWrap, "parentWrap");
    function extendClass(cls, name, props) {
      props = props || {};
      lib.keys(props).forEach(function(k) {
        props[k] = parentWrap(cls.prototype[k], props[k]);
      });
      var subclass = /* @__PURE__ */ (function(_cls) {
        _inheritsLoose(subclass2, _cls);
        function subclass2() {
          return _cls.apply(this, arguments) || this;
        }
        __name(subclass2, "subclass");
        _createClass(subclass2, [{
          key: "typename",
          get: /* @__PURE__ */ __name(function get() {
            return name;
          }, "get")
        }]);
        return subclass2;
      })(cls);
      lib._assign(subclass.prototype, props);
      return subclass;
    }
    __name(extendClass, "extendClass");
    var Obj = /* @__PURE__ */ (function() {
      function Obj2() {
        this.init.apply(this, arguments);
      }
      __name(Obj2, "Obj");
      var _proto = Obj2.prototype;
      _proto.init = /* @__PURE__ */ __name(function init() {
      }, "init");
      Obj2.extend = /* @__PURE__ */ __name(function extend(name, props) {
        if (typeof name === "object") {
          props = name;
          name = "anonymous";
        }
        return extendClass(this, name, props);
      }, "extend");
      _createClass(Obj2, [{
        key: "typename",
        get: /* @__PURE__ */ __name(function get() {
          return this.constructor.name;
        }, "get")
      }]);
      return Obj2;
    })();
    var EmitterObj = /* @__PURE__ */ (function(_EventEmitter) {
      _inheritsLoose(EmitterObj2, _EventEmitter);
      function EmitterObj2() {
        var _this2;
        var _this;
        _this = _EventEmitter.call(this) || this;
        (_this2 = _this).init.apply(_this2, arguments);
        return _this;
      }
      __name(EmitterObj2, "EmitterObj");
      var _proto2 = EmitterObj2.prototype;
      _proto2.init = /* @__PURE__ */ __name(function init() {
      }, "init");
      EmitterObj2.extend = /* @__PURE__ */ __name(function extend(name, props) {
        if (typeof name === "object") {
          props = name;
          name = "anonymous";
        }
        return extendClass(this, name, props);
      }, "extend");
      _createClass(EmitterObj2, [{
        key: "typename",
        get: /* @__PURE__ */ __name(function get() {
          return this.constructor.name;
        }, "get")
      }]);
      return EmitterObj2;
    })(EventEmitter);
    module.exports = {
      Obj,
      EmitterObj
    };
  }
});

// node_modules/nunjucks/src/nodes.js
var require_nodes = __commonJS({
  "node_modules/nunjucks/src/nodes.js"(exports, module) {
    "use strict";
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    __name(_defineProperties, "_defineProperties");
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    __name(_createClass, "_createClass");
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    __name(_toPropertyKey, "_toPropertyKey");
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    __name(_toPrimitive, "_toPrimitive");
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    __name(_inheritsLoose, "_inheritsLoose");
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      }, "_setPrototypeOf");
      return _setPrototypeOf(o, p);
    }
    __name(_setPrototypeOf, "_setPrototypeOf");
    var _require = require_object();
    var Obj = _require.Obj;
    function traverseAndCheck(obj, type, results) {
      if (obj instanceof type) {
        results.push(obj);
      }
      if (obj instanceof Node) {
        obj.findAll(type, results);
      }
    }
    __name(traverseAndCheck, "traverseAndCheck");
    var Node = /* @__PURE__ */ (function(_Obj) {
      _inheritsLoose(Node2, _Obj);
      function Node2() {
        return _Obj.apply(this, arguments) || this;
      }
      __name(Node2, "Node");
      var _proto = Node2.prototype;
      _proto.init = /* @__PURE__ */ __name(function init(lineno, colno) {
        var _arguments = arguments, _this = this;
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }
        this.lineno = lineno;
        this.colno = colno;
        this.fields.forEach(function(field, i) {
          var val = _arguments[i + 2];
          if (val === void 0) {
            val = null;
          }
          _this[field] = val;
        });
      }, "init");
      _proto.findAll = /* @__PURE__ */ __name(function findAll(type, results) {
        var _this2 = this;
        results = results || [];
        if (this instanceof NodeList) {
          this.children.forEach(function(child) {
            return traverseAndCheck(child, type, results);
          });
        } else {
          this.fields.forEach(function(field) {
            return traverseAndCheck(_this2[field], type, results);
          });
        }
        return results;
      }, "findAll");
      _proto.iterFields = /* @__PURE__ */ __name(function iterFields(func) {
        var _this3 = this;
        this.fields.forEach(function(field) {
          func(_this3[field], field);
        });
      }, "iterFields");
      return Node2;
    })(Obj);
    var Value = /* @__PURE__ */ (function(_Node) {
      _inheritsLoose(Value2, _Node);
      function Value2() {
        return _Node.apply(this, arguments) || this;
      }
      __name(Value2, "Value");
      _createClass(Value2, [{
        key: "typename",
        get: /* @__PURE__ */ __name(function get() {
          return "Value";
        }, "get")
      }, {
        key: "fields",
        get: /* @__PURE__ */ __name(function get() {
          return ["value"];
        }, "get")
      }]);
      return Value2;
    })(Node);
    var NodeList = /* @__PURE__ */ (function(_Node2) {
      _inheritsLoose(NodeList2, _Node2);
      function NodeList2() {
        return _Node2.apply(this, arguments) || this;
      }
      __name(NodeList2, "NodeList");
      var _proto2 = NodeList2.prototype;
      _proto2.init = /* @__PURE__ */ __name(function init(lineno, colno, nodes) {
        _Node2.prototype.init.call(this, lineno, colno, nodes || []);
      }, "init");
      _proto2.addChild = /* @__PURE__ */ __name(function addChild(node) {
        this.children.push(node);
      }, "addChild");
      _createClass(NodeList2, [{
        key: "typename",
        get: /* @__PURE__ */ __name(function get() {
          return "NodeList";
        }, "get")
      }, {
        key: "fields",
        get: /* @__PURE__ */ __name(function get() {
          return ["children"];
        }, "get")
      }]);
      return NodeList2;
    })(Node);
    var Root = NodeList.extend("Root");
    var Literal = Value.extend("Literal");
    var _Symbol = Value.extend("Symbol");
    var Group = NodeList.extend("Group");
    var ArrayNode = NodeList.extend("Array");
    var Pair = Node.extend("Pair", {
      fields: ["key", "value"]
    });
    var Dict = NodeList.extend("Dict");
    var LookupVal = Node.extend("LookupVal", {
      fields: ["target", "val"]
    });
    var If = Node.extend("If", {
      fields: ["cond", "body", "else_"]
    });
    var IfAsync = If.extend("IfAsync");
    var InlineIf = Node.extend("InlineIf", {
      fields: ["cond", "body", "else_"]
    });
    var For = Node.extend("For", {
      fields: ["arr", "name", "body", "else_"]
    });
    var AsyncEach = For.extend("AsyncEach");
    var AsyncAll = For.extend("AsyncAll");
    var Macro = Node.extend("Macro", {
      fields: ["name", "args", "body"]
    });
    var Caller = Macro.extend("Caller");
    var Import = Node.extend("Import", {
      fields: ["template", "target", "withContext"]
    });
    var FromImport = /* @__PURE__ */ (function(_Node3) {
      _inheritsLoose(FromImport2, _Node3);
      function FromImport2() {
        return _Node3.apply(this, arguments) || this;
      }
      __name(FromImport2, "FromImport");
      var _proto3 = FromImport2.prototype;
      _proto3.init = /* @__PURE__ */ __name(function init(lineno, colno, template, names, withContext) {
        _Node3.prototype.init.call(this, lineno, colno, template, names || new NodeList(), withContext);
      }, "init");
      _createClass(FromImport2, [{
        key: "typename",
        get: /* @__PURE__ */ __name(function get() {
          return "FromImport";
        }, "get")
      }, {
        key: "fields",
        get: /* @__PURE__ */ __name(function get() {
          return ["template", "names", "withContext"];
        }, "get")
      }]);
      return FromImport2;
    })(Node);
    var FunCall = Node.extend("FunCall", {
      fields: ["name", "args"]
    });
    var Filter = FunCall.extend("Filter");
    var FilterAsync = Filter.extend("FilterAsync", {
      fields: ["name", "args", "symbol"]
    });
    var KeywordArgs = Dict.extend("KeywordArgs");
    var Block = Node.extend("Block", {
      fields: ["name", "body"]
    });
    var Super = Node.extend("Super", {
      fields: ["blockName", "symbol"]
    });
    var TemplateRef = Node.extend("TemplateRef", {
      fields: ["template"]
    });
    var Extends = TemplateRef.extend("Extends");
    var Include = Node.extend("Include", {
      fields: ["template", "ignoreMissing"]
    });
    var Set2 = Node.extend("Set", {
      fields: ["targets", "value"]
    });
    var Switch = Node.extend("Switch", {
      fields: ["expr", "cases", "default"]
    });
    var Case = Node.extend("Case", {
      fields: ["cond", "body"]
    });
    var Output = NodeList.extend("Output");
    var Capture = Node.extend("Capture", {
      fields: ["body"]
    });
    var TemplateData = Literal.extend("TemplateData");
    var UnaryOp = Node.extend("UnaryOp", {
      fields: ["target"]
    });
    var BinOp = Node.extend("BinOp", {
      fields: ["left", "right"]
    });
    var In = BinOp.extend("In");
    var Is = BinOp.extend("Is");
    var Or = BinOp.extend("Or");
    var And = BinOp.extend("And");
    var Not = UnaryOp.extend("Not");
    var Add = BinOp.extend("Add");
    var Concat = BinOp.extend("Concat");
    var Sub = BinOp.extend("Sub");
    var Mul = BinOp.extend("Mul");
    var Div = BinOp.extend("Div");
    var FloorDiv = BinOp.extend("FloorDiv");
    var Mod = BinOp.extend("Mod");
    var Pow = BinOp.extend("Pow");
    var Neg = UnaryOp.extend("Neg");
    var Pos = UnaryOp.extend("Pos");
    var Compare = Node.extend("Compare", {
      fields: ["expr", "ops"]
    });
    var CompareOperand = Node.extend("CompareOperand", {
      fields: ["expr", "type"]
    });
    var CallExtension = Node.extend("CallExtension", {
      init: /* @__PURE__ */ __name(function init(ext, prop, args, contentArgs) {
        this.parent();
        this.extName = ext.__name || ext;
        this.prop = prop;
        this.args = args || new NodeList();
        this.contentArgs = contentArgs || [];
        this.autoescape = ext.autoescape;
      }, "init"),
      fields: ["extName", "prop", "args", "contentArgs"]
    });
    var CallExtensionAsync = CallExtension.extend("CallExtensionAsync");
    function print(str, indent, inline) {
      var lines = str.split("\n");
      lines.forEach(function(line, i) {
        if (line && (inline && i > 0 || !inline)) {
          process.stdout.write(" ".repeat(indent));
        }
        var nl = i === lines.length - 1 ? "" : "\n";
        process.stdout.write("" + line + nl);
      });
    }
    __name(print, "print");
    function printNodes(node, indent) {
      indent = indent || 0;
      print(node.typename + ": ", indent);
      if (node instanceof NodeList) {
        print("\n");
        node.children.forEach(function(n) {
          printNodes(n, indent + 2);
        });
      } else if (node instanceof CallExtension) {
        print(node.extName + "." + node.prop + "\n");
        if (node.args) {
          printNodes(node.args, indent + 2);
        }
        if (node.contentArgs) {
          node.contentArgs.forEach(function(n) {
            printNodes(n, indent + 2);
          });
        }
      } else {
        var nodes = [];
        var props = null;
        node.iterFields(function(val, fieldName) {
          if (val instanceof Node) {
            nodes.push([fieldName, val]);
          } else {
            props = props || {};
            props[fieldName] = val;
          }
        });
        if (props) {
          print(JSON.stringify(props, null, 2) + "\n", null, true);
        } else {
          print("\n");
        }
        nodes.forEach(function(_ref) {
          var fieldName = _ref[0], n = _ref[1];
          print("[" + fieldName + "] =>", indent + 2);
          printNodes(n, indent + 4);
        });
      }
    }
    __name(printNodes, "printNodes");
    module.exports = {
      Node,
      Root,
      NodeList,
      Value,
      Literal,
      Symbol: _Symbol,
      Group,
      Array: ArrayNode,
      Pair,
      Dict,
      Output,
      Capture,
      TemplateData,
      If,
      IfAsync,
      InlineIf,
      For,
      AsyncEach,
      AsyncAll,
      Macro,
      Caller,
      Import,
      FromImport,
      FunCall,
      Filter,
      FilterAsync,
      KeywordArgs,
      Block,
      Super,
      Extends,
      Include,
      Set: Set2,
      Switch,
      Case,
      LookupVal,
      BinOp,
      In,
      Is,
      Or,
      And,
      Not,
      Add,
      Concat,
      Sub,
      Mul,
      Div,
      FloorDiv,
      Mod,
      Pow,
      Neg,
      Pos,
      Compare,
      CompareOperand,
      CallExtension,
      CallExtensionAsync,
      printNodes
    };
  }
});

// node_modules/nunjucks/src/parser.js
var require_parser = __commonJS({
  "node_modules/nunjucks/src/parser.js"(exports, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    __name(_inheritsLoose, "_inheritsLoose");
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      }, "_setPrototypeOf");
      return _setPrototypeOf(o, p);
    }
    __name(_setPrototypeOf, "_setPrototypeOf");
    var lexer = require_lexer();
    var nodes = require_nodes();
    var Obj = require_object().Obj;
    var lib = require_lib();
    var Parser = /* @__PURE__ */ (function(_Obj) {
      _inheritsLoose(Parser2, _Obj);
      function Parser2() {
        return _Obj.apply(this, arguments) || this;
      }
      __name(Parser2, "Parser");
      var _proto = Parser2.prototype;
      _proto.init = /* @__PURE__ */ __name(function init(tokens) {
        this.tokens = tokens;
        this.peeked = null;
        this.breakOnBlocks = null;
        this.dropLeadingWhitespace = false;
        this.extensions = [];
      }, "init");
      _proto.nextToken = /* @__PURE__ */ __name(function nextToken(withWhitespace) {
        var tok;
        if (this.peeked) {
          if (!withWhitespace && this.peeked.type === lexer.TOKEN_WHITESPACE) {
            this.peeked = null;
          } else {
            tok = this.peeked;
            this.peeked = null;
            return tok;
          }
        }
        tok = this.tokens.nextToken();
        if (!withWhitespace) {
          while (tok && tok.type === lexer.TOKEN_WHITESPACE) {
            tok = this.tokens.nextToken();
          }
        }
        return tok;
      }, "nextToken");
      _proto.peekToken = /* @__PURE__ */ __name(function peekToken() {
        this.peeked = this.peeked || this.nextToken();
        return this.peeked;
      }, "peekToken");
      _proto.pushToken = /* @__PURE__ */ __name(function pushToken(tok) {
        if (this.peeked) {
          throw new Error("pushToken: can only push one token on between reads");
        }
        this.peeked = tok;
      }, "pushToken");
      _proto.error = /* @__PURE__ */ __name(function error(msg, lineno, colno) {
        if (lineno === void 0 || colno === void 0) {
          var tok = this.peekToken() || {};
          lineno = tok.lineno;
          colno = tok.colno;
        }
        if (lineno !== void 0) {
          lineno += 1;
        }
        if (colno !== void 0) {
          colno += 1;
        }
        return new lib.TemplateError(msg, lineno, colno);
      }, "error");
      _proto.fail = /* @__PURE__ */ __name(function fail(msg, lineno, colno) {
        throw this.error(msg, lineno, colno);
      }, "fail");
      _proto.skip = /* @__PURE__ */ __name(function skip(type) {
        var tok = this.nextToken();
        if (!tok || tok.type !== type) {
          this.pushToken(tok);
          return false;
        }
        return true;
      }, "skip");
      _proto.expect = /* @__PURE__ */ __name(function expect(type) {
        var tok = this.nextToken();
        if (tok.type !== type) {
          this.fail("expected " + type + ", got " + tok.type, tok.lineno, tok.colno);
        }
        return tok;
      }, "expect");
      _proto.skipValue = /* @__PURE__ */ __name(function skipValue(type, val) {
        var tok = this.nextToken();
        if (!tok || tok.type !== type || tok.value !== val) {
          this.pushToken(tok);
          return false;
        }
        return true;
      }, "skipValue");
      _proto.skipSymbol = /* @__PURE__ */ __name(function skipSymbol(val) {
        return this.skipValue(lexer.TOKEN_SYMBOL, val);
      }, "skipSymbol");
      _proto.advanceAfterBlockEnd = /* @__PURE__ */ __name(function advanceAfterBlockEnd(name) {
        var tok;
        if (!name) {
          tok = this.peekToken();
          if (!tok) {
            this.fail("unexpected end of file");
          }
          if (tok.type !== lexer.TOKEN_SYMBOL) {
            this.fail("advanceAfterBlockEnd: expected symbol token or explicit name to be passed");
          }
          name = this.nextToken().value;
        }
        tok = this.nextToken();
        if (tok && tok.type === lexer.TOKEN_BLOCK_END) {
          if (tok.value.charAt(0) === "-") {
            this.dropLeadingWhitespace = true;
          }
        } else {
          this.fail("expected block end in " + name + " statement");
        }
        return tok;
      }, "advanceAfterBlockEnd");
      _proto.advanceAfterVariableEnd = /* @__PURE__ */ __name(function advanceAfterVariableEnd() {
        var tok = this.nextToken();
        if (tok && tok.type === lexer.TOKEN_VARIABLE_END) {
          this.dropLeadingWhitespace = tok.value.charAt(tok.value.length - this.tokens.tags.VARIABLE_END.length - 1) === "-";
        } else {
          this.pushToken(tok);
          this.fail("expected variable end");
        }
      }, "advanceAfterVariableEnd");
      _proto.parseFor = /* @__PURE__ */ __name(function parseFor() {
        var forTok = this.peekToken();
        var node;
        var endBlock;
        if (this.skipSymbol("for")) {
          node = new nodes.For(forTok.lineno, forTok.colno);
          endBlock = "endfor";
        } else if (this.skipSymbol("asyncEach")) {
          node = new nodes.AsyncEach(forTok.lineno, forTok.colno);
          endBlock = "endeach";
        } else if (this.skipSymbol("asyncAll")) {
          node = new nodes.AsyncAll(forTok.lineno, forTok.colno);
          endBlock = "endall";
        } else {
          this.fail("parseFor: expected for{Async}", forTok.lineno, forTok.colno);
        }
        node.name = this.parsePrimary();
        if (!(node.name instanceof nodes.Symbol)) {
          this.fail("parseFor: variable name expected for loop");
        }
        var type = this.peekToken().type;
        if (type === lexer.TOKEN_COMMA) {
          var key = node.name;
          node.name = new nodes.Array(key.lineno, key.colno);
          node.name.addChild(key);
          while (this.skip(lexer.TOKEN_COMMA)) {
            var prim = this.parsePrimary();
            node.name.addChild(prim);
          }
        }
        if (!this.skipSymbol("in")) {
          this.fail('parseFor: expected "in" keyword for loop', forTok.lineno, forTok.colno);
        }
        node.arr = this.parseExpression();
        this.advanceAfterBlockEnd(forTok.value);
        node.body = this.parseUntilBlocks(endBlock, "else");
        if (this.skipSymbol("else")) {
          this.advanceAfterBlockEnd("else");
          node.else_ = this.parseUntilBlocks(endBlock);
        }
        this.advanceAfterBlockEnd();
        return node;
      }, "parseFor");
      _proto.parseMacro = /* @__PURE__ */ __name(function parseMacro() {
        var macroTok = this.peekToken();
        if (!this.skipSymbol("macro")) {
          this.fail("expected macro");
        }
        var name = this.parsePrimary(true);
        var args = this.parseSignature();
        var node = new nodes.Macro(macroTok.lineno, macroTok.colno, name, args);
        this.advanceAfterBlockEnd(macroTok.value);
        node.body = this.parseUntilBlocks("endmacro");
        this.advanceAfterBlockEnd();
        return node;
      }, "parseMacro");
      _proto.parseCall = /* @__PURE__ */ __name(function parseCall() {
        var callTok = this.peekToken();
        if (!this.skipSymbol("call")) {
          this.fail("expected call");
        }
        var callerArgs = this.parseSignature(true) || new nodes.NodeList();
        var macroCall = this.parsePrimary();
        this.advanceAfterBlockEnd(callTok.value);
        var body = this.parseUntilBlocks("endcall");
        this.advanceAfterBlockEnd();
        var callerName = new nodes.Symbol(callTok.lineno, callTok.colno, "caller");
        var callerNode = new nodes.Caller(callTok.lineno, callTok.colno, callerName, callerArgs, body);
        var args = macroCall.args.children;
        if (!(args[args.length - 1] instanceof nodes.KeywordArgs)) {
          args.push(new nodes.KeywordArgs());
        }
        var kwargs = args[args.length - 1];
        kwargs.addChild(new nodes.Pair(callTok.lineno, callTok.colno, callerName, callerNode));
        return new nodes.Output(callTok.lineno, callTok.colno, [macroCall]);
      }, "parseCall");
      _proto.parseWithContext = /* @__PURE__ */ __name(function parseWithContext() {
        var tok = this.peekToken();
        var withContext = null;
        if (this.skipSymbol("with")) {
          withContext = true;
        } else if (this.skipSymbol("without")) {
          withContext = false;
        }
        if (withContext !== null) {
          if (!this.skipSymbol("context")) {
            this.fail("parseFrom: expected context after with/without", tok.lineno, tok.colno);
          }
        }
        return withContext;
      }, "parseWithContext");
      _proto.parseImport = /* @__PURE__ */ __name(function parseImport() {
        var importTok = this.peekToken();
        if (!this.skipSymbol("import")) {
          this.fail("parseImport: expected import", importTok.lineno, importTok.colno);
        }
        var template = this.parseExpression();
        if (!this.skipSymbol("as")) {
          this.fail('parseImport: expected "as" keyword', importTok.lineno, importTok.colno);
        }
        var target = this.parseExpression();
        var withContext = this.parseWithContext();
        var node = new nodes.Import(importTok.lineno, importTok.colno, template, target, withContext);
        this.advanceAfterBlockEnd(importTok.value);
        return node;
      }, "parseImport");
      _proto.parseFrom = /* @__PURE__ */ __name(function parseFrom() {
        var fromTok = this.peekToken();
        if (!this.skipSymbol("from")) {
          this.fail("parseFrom: expected from");
        }
        var template = this.parseExpression();
        if (!this.skipSymbol("import")) {
          this.fail("parseFrom: expected import", fromTok.lineno, fromTok.colno);
        }
        var names = new nodes.NodeList();
        var withContext;
        while (1) {
          var nextTok = this.peekToken();
          if (nextTok.type === lexer.TOKEN_BLOCK_END) {
            if (!names.children.length) {
              this.fail("parseFrom: Expected at least one import name", fromTok.lineno, fromTok.colno);
            }
            if (nextTok.value.charAt(0) === "-") {
              this.dropLeadingWhitespace = true;
            }
            this.nextToken();
            break;
          }
          if (names.children.length > 0 && !this.skip(lexer.TOKEN_COMMA)) {
            this.fail("parseFrom: expected comma", fromTok.lineno, fromTok.colno);
          }
          var name = this.parsePrimary();
          if (name.value.charAt(0) === "_") {
            this.fail("parseFrom: names starting with an underscore cannot be imported", name.lineno, name.colno);
          }
          if (this.skipSymbol("as")) {
            var alias = this.parsePrimary();
            names.addChild(new nodes.Pair(name.lineno, name.colno, name, alias));
          } else {
            names.addChild(name);
          }
          withContext = this.parseWithContext();
        }
        return new nodes.FromImport(fromTok.lineno, fromTok.colno, template, names, withContext);
      }, "parseFrom");
      _proto.parseBlock = /* @__PURE__ */ __name(function parseBlock() {
        var tag = this.peekToken();
        if (!this.skipSymbol("block")) {
          this.fail("parseBlock: expected block", tag.lineno, tag.colno);
        }
        var node = new nodes.Block(tag.lineno, tag.colno);
        node.name = this.parsePrimary();
        if (!(node.name instanceof nodes.Symbol)) {
          this.fail("parseBlock: variable name expected", tag.lineno, tag.colno);
        }
        this.advanceAfterBlockEnd(tag.value);
        node.body = this.parseUntilBlocks("endblock");
        this.skipSymbol("endblock");
        this.skipSymbol(node.name.value);
        var tok = this.peekToken();
        if (!tok) {
          this.fail("parseBlock: expected endblock, got end of file");
        }
        this.advanceAfterBlockEnd(tok.value);
        return node;
      }, "parseBlock");
      _proto.parseExtends = /* @__PURE__ */ __name(function parseExtends() {
        var tagName = "extends";
        var tag = this.peekToken();
        if (!this.skipSymbol(tagName)) {
          this.fail("parseTemplateRef: expected " + tagName);
        }
        var node = new nodes.Extends(tag.lineno, tag.colno);
        node.template = this.parseExpression();
        this.advanceAfterBlockEnd(tag.value);
        return node;
      }, "parseExtends");
      _proto.parseInclude = /* @__PURE__ */ __name(function parseInclude() {
        var tagName = "include";
        var tag = this.peekToken();
        if (!this.skipSymbol(tagName)) {
          this.fail("parseInclude: expected " + tagName);
        }
        var node = new nodes.Include(tag.lineno, tag.colno);
        node.template = this.parseExpression();
        if (this.skipSymbol("ignore") && this.skipSymbol("missing")) {
          node.ignoreMissing = true;
        }
        this.advanceAfterBlockEnd(tag.value);
        return node;
      }, "parseInclude");
      _proto.parseIf = /* @__PURE__ */ __name(function parseIf() {
        var tag = this.peekToken();
        var node;
        if (this.skipSymbol("if") || this.skipSymbol("elif") || this.skipSymbol("elseif")) {
          node = new nodes.If(tag.lineno, tag.colno);
        } else if (this.skipSymbol("ifAsync")) {
          node = new nodes.IfAsync(tag.lineno, tag.colno);
        } else {
          this.fail("parseIf: expected if, elif, or elseif", tag.lineno, tag.colno);
        }
        node.cond = this.parseExpression();
        this.advanceAfterBlockEnd(tag.value);
        node.body = this.parseUntilBlocks("elif", "elseif", "else", "endif");
        var tok = this.peekToken();
        switch (tok && tok.value) {
          case "elseif":
          case "elif":
            node.else_ = this.parseIf();
            break;
          case "else":
            this.advanceAfterBlockEnd();
            node.else_ = this.parseUntilBlocks("endif");
            this.advanceAfterBlockEnd();
            break;
          case "endif":
            node.else_ = null;
            this.advanceAfterBlockEnd();
            break;
          default:
            this.fail("parseIf: expected elif, else, or endif, got end of file");
        }
        return node;
      }, "parseIf");
      _proto.parseSet = /* @__PURE__ */ __name(function parseSet() {
        var tag = this.peekToken();
        if (!this.skipSymbol("set")) {
          this.fail("parseSet: expected set", tag.lineno, tag.colno);
        }
        var node = new nodes.Set(tag.lineno, tag.colno, []);
        var target;
        while (target = this.parsePrimary()) {
          node.targets.push(target);
          if (!this.skip(lexer.TOKEN_COMMA)) {
            break;
          }
        }
        if (!this.skipValue(lexer.TOKEN_OPERATOR, "=")) {
          if (!this.skip(lexer.TOKEN_BLOCK_END)) {
            this.fail("parseSet: expected = or block end in set tag", tag.lineno, tag.colno);
          } else {
            node.body = new nodes.Capture(tag.lineno, tag.colno, this.parseUntilBlocks("endset"));
            node.value = null;
            this.advanceAfterBlockEnd();
          }
        } else {
          node.value = this.parseExpression();
          this.advanceAfterBlockEnd(tag.value);
        }
        return node;
      }, "parseSet");
      _proto.parseSwitch = /* @__PURE__ */ __name(function parseSwitch() {
        var switchStart = "switch";
        var switchEnd = "endswitch";
        var caseStart = "case";
        var caseDefault = "default";
        var tag = this.peekToken();
        if (!this.skipSymbol(switchStart) && !this.skipSymbol(caseStart) && !this.skipSymbol(caseDefault)) {
          this.fail('parseSwitch: expected "switch," "case" or "default"', tag.lineno, tag.colno);
        }
        var expr = this.parseExpression();
        this.advanceAfterBlockEnd(switchStart);
        this.parseUntilBlocks(caseStart, caseDefault, switchEnd);
        var tok = this.peekToken();
        var cases = [];
        var defaultCase;
        do {
          this.skipSymbol(caseStart);
          var cond = this.parseExpression();
          this.advanceAfterBlockEnd(switchStart);
          var body = this.parseUntilBlocks(caseStart, caseDefault, switchEnd);
          cases.push(new nodes.Case(tok.line, tok.col, cond, body));
          tok = this.peekToken();
        } while (tok && tok.value === caseStart);
        switch (tok.value) {
          case caseDefault:
            this.advanceAfterBlockEnd();
            defaultCase = this.parseUntilBlocks(switchEnd);
            this.advanceAfterBlockEnd();
            break;
          case switchEnd:
            this.advanceAfterBlockEnd();
            break;
          default:
            this.fail('parseSwitch: expected "case," "default" or "endswitch," got EOF.');
        }
        return new nodes.Switch(tag.lineno, tag.colno, expr, cases, defaultCase);
      }, "parseSwitch");
      _proto.parseStatement = /* @__PURE__ */ __name(function parseStatement() {
        var tok = this.peekToken();
        var node;
        if (tok.type !== lexer.TOKEN_SYMBOL) {
          this.fail("tag name expected", tok.lineno, tok.colno);
        }
        if (this.breakOnBlocks && lib.indexOf(this.breakOnBlocks, tok.value) !== -1) {
          return null;
        }
        switch (tok.value) {
          case "raw":
            return this.parseRaw();
          case "verbatim":
            return this.parseRaw("verbatim");
          case "if":
          case "ifAsync":
            return this.parseIf();
          case "for":
          case "asyncEach":
          case "asyncAll":
            return this.parseFor();
          case "block":
            return this.parseBlock();
          case "extends":
            return this.parseExtends();
          case "include":
            return this.parseInclude();
          case "set":
            return this.parseSet();
          case "macro":
            return this.parseMacro();
          case "call":
            return this.parseCall();
          case "import":
            return this.parseImport();
          case "from":
            return this.parseFrom();
          case "filter":
            return this.parseFilterStatement();
          case "switch":
            return this.parseSwitch();
          default:
            if (this.extensions.length) {
              for (var i = 0; i < this.extensions.length; i++) {
                var ext = this.extensions[i];
                if (lib.indexOf(ext.tags || [], tok.value) !== -1) {
                  return ext.parse(this, nodes, lexer);
                }
              }
            }
            this.fail("unknown block tag: " + tok.value, tok.lineno, tok.colno);
        }
        return node;
      }, "parseStatement");
      _proto.parseRaw = /* @__PURE__ */ __name(function parseRaw(tagName) {
        tagName = tagName || "raw";
        var endTagName = "end" + tagName;
        var rawBlockRegex = new RegExp("([\\s\\S]*?){%\\s*(" + tagName + "|" + endTagName + ")\\s*(?=%})%}");
        var rawLevel = 1;
        var str = "";
        var matches = null;
        var begun = this.advanceAfterBlockEnd();
        while ((matches = this.tokens._extractRegex(rawBlockRegex)) && rawLevel > 0) {
          var all = matches[0];
          var pre = matches[1];
          var blockName = matches[2];
          if (blockName === tagName) {
            rawLevel += 1;
          } else if (blockName === endTagName) {
            rawLevel -= 1;
          }
          if (rawLevel === 0) {
            str += pre;
            this.tokens.backN(all.length - pre.length);
          } else {
            str += all;
          }
        }
        return new nodes.Output(begun.lineno, begun.colno, [new nodes.TemplateData(begun.lineno, begun.colno, str)]);
      }, "parseRaw");
      _proto.parsePostfix = /* @__PURE__ */ __name(function parsePostfix(node) {
        var lookup;
        var tok = this.peekToken();
        while (tok) {
          if (tok.type === lexer.TOKEN_LEFT_PAREN) {
            node = new nodes.FunCall(tok.lineno, tok.colno, node, this.parseSignature());
          } else if (tok.type === lexer.TOKEN_LEFT_BRACKET) {
            lookup = this.parseAggregate();
            if (lookup.children.length > 1) {
              this.fail("invalid index");
            }
            node = new nodes.LookupVal(tok.lineno, tok.colno, node, lookup.children[0]);
          } else if (tok.type === lexer.TOKEN_OPERATOR && tok.value === ".") {
            this.nextToken();
            var val = this.nextToken();
            if (val.type !== lexer.TOKEN_SYMBOL) {
              this.fail("expected name as lookup value, got " + val.value, val.lineno, val.colno);
            }
            lookup = new nodes.Literal(val.lineno, val.colno, val.value);
            node = new nodes.LookupVal(tok.lineno, tok.colno, node, lookup);
          } else {
            break;
          }
          tok = this.peekToken();
        }
        return node;
      }, "parsePostfix");
      _proto.parseExpression = /* @__PURE__ */ __name(function parseExpression() {
        var node = this.parseInlineIf();
        return node;
      }, "parseExpression");
      _proto.parseInlineIf = /* @__PURE__ */ __name(function parseInlineIf() {
        var node = this.parseOr();
        if (this.skipSymbol("if")) {
          var condNode = this.parseOr();
          var bodyNode = node;
          node = new nodes.InlineIf(node.lineno, node.colno);
          node.body = bodyNode;
          node.cond = condNode;
          if (this.skipSymbol("else")) {
            node.else_ = this.parseOr();
          } else {
            node.else_ = null;
          }
        }
        return node;
      }, "parseInlineIf");
      _proto.parseOr = /* @__PURE__ */ __name(function parseOr() {
        var node = this.parseAnd();
        while (this.skipSymbol("or")) {
          var node2 = this.parseAnd();
          node = new nodes.Or(node.lineno, node.colno, node, node2);
        }
        return node;
      }, "parseOr");
      _proto.parseAnd = /* @__PURE__ */ __name(function parseAnd() {
        var node = this.parseNot();
        while (this.skipSymbol("and")) {
          var node2 = this.parseNot();
          node = new nodes.And(node.lineno, node.colno, node, node2);
        }
        return node;
      }, "parseAnd");
      _proto.parseNot = /* @__PURE__ */ __name(function parseNot() {
        var tok = this.peekToken();
        if (this.skipSymbol("not")) {
          return new nodes.Not(tok.lineno, tok.colno, this.parseNot());
        }
        return this.parseIn();
      }, "parseNot");
      _proto.parseIn = /* @__PURE__ */ __name(function parseIn() {
        var node = this.parseIs();
        while (1) {
          var tok = this.nextToken();
          if (!tok) {
            break;
          }
          var invert = tok.type === lexer.TOKEN_SYMBOL && tok.value === "not";
          if (!invert) {
            this.pushToken(tok);
          }
          if (this.skipSymbol("in")) {
            var node2 = this.parseIs();
            node = new nodes.In(node.lineno, node.colno, node, node2);
            if (invert) {
              node = new nodes.Not(node.lineno, node.colno, node);
            }
          } else {
            if (invert) {
              this.pushToken(tok);
            }
            break;
          }
        }
        return node;
      }, "parseIn");
      _proto.parseIs = /* @__PURE__ */ __name(function parseIs() {
        var node = this.parseCompare();
        if (this.skipSymbol("is")) {
          var not = this.skipSymbol("not");
          var node2 = this.parseCompare();
          node = new nodes.Is(node.lineno, node.colno, node, node2);
          if (not) {
            node = new nodes.Not(node.lineno, node.colno, node);
          }
        }
        return node;
      }, "parseIs");
      _proto.parseCompare = /* @__PURE__ */ __name(function parseCompare() {
        var compareOps = ["==", "===", "!=", "!==", "<", ">", "<=", ">="];
        var expr = this.parseConcat();
        var ops = [];
        while (1) {
          var tok = this.nextToken();
          if (!tok) {
            break;
          } else if (compareOps.indexOf(tok.value) !== -1) {
            ops.push(new nodes.CompareOperand(tok.lineno, tok.colno, this.parseConcat(), tok.value));
          } else {
            this.pushToken(tok);
            break;
          }
        }
        if (ops.length) {
          return new nodes.Compare(ops[0].lineno, ops[0].colno, expr, ops);
        } else {
          return expr;
        }
      }, "parseCompare");
      _proto.parseConcat = /* @__PURE__ */ __name(function parseConcat() {
        var node = this.parseAdd();
        while (this.skipValue(lexer.TOKEN_TILDE, "~")) {
          var node2 = this.parseAdd();
          node = new nodes.Concat(node.lineno, node.colno, node, node2);
        }
        return node;
      }, "parseConcat");
      _proto.parseAdd = /* @__PURE__ */ __name(function parseAdd() {
        var node = this.parseSub();
        while (this.skipValue(lexer.TOKEN_OPERATOR, "+")) {
          var node2 = this.parseSub();
          node = new nodes.Add(node.lineno, node.colno, node, node2);
        }
        return node;
      }, "parseAdd");
      _proto.parseSub = /* @__PURE__ */ __name(function parseSub() {
        var node = this.parseMul();
        while (this.skipValue(lexer.TOKEN_OPERATOR, "-")) {
          var node2 = this.parseMul();
          node = new nodes.Sub(node.lineno, node.colno, node, node2);
        }
        return node;
      }, "parseSub");
      _proto.parseMul = /* @__PURE__ */ __name(function parseMul() {
        var node = this.parseDiv();
        while (this.skipValue(lexer.TOKEN_OPERATOR, "*")) {
          var node2 = this.parseDiv();
          node = new nodes.Mul(node.lineno, node.colno, node, node2);
        }
        return node;
      }, "parseMul");
      _proto.parseDiv = /* @__PURE__ */ __name(function parseDiv() {
        var node = this.parseFloorDiv();
        while (this.skipValue(lexer.TOKEN_OPERATOR, "/")) {
          var node2 = this.parseFloorDiv();
          node = new nodes.Div(node.lineno, node.colno, node, node2);
        }
        return node;
      }, "parseDiv");
      _proto.parseFloorDiv = /* @__PURE__ */ __name(function parseFloorDiv() {
        var node = this.parseMod();
        while (this.skipValue(lexer.TOKEN_OPERATOR, "//")) {
          var node2 = this.parseMod();
          node = new nodes.FloorDiv(node.lineno, node.colno, node, node2);
        }
        return node;
      }, "parseFloorDiv");
      _proto.parseMod = /* @__PURE__ */ __name(function parseMod() {
        var node = this.parsePow();
        while (this.skipValue(lexer.TOKEN_OPERATOR, "%")) {
          var node2 = this.parsePow();
          node = new nodes.Mod(node.lineno, node.colno, node, node2);
        }
        return node;
      }, "parseMod");
      _proto.parsePow = /* @__PURE__ */ __name(function parsePow() {
        var node = this.parseUnary();
        while (this.skipValue(lexer.TOKEN_OPERATOR, "**")) {
          var node2 = this.parseUnary();
          node = new nodes.Pow(node.lineno, node.colno, node, node2);
        }
        return node;
      }, "parsePow");
      _proto.parseUnary = /* @__PURE__ */ __name(function parseUnary(noFilters) {
        var tok = this.peekToken();
        var node;
        if (this.skipValue(lexer.TOKEN_OPERATOR, "-")) {
          node = new nodes.Neg(tok.lineno, tok.colno, this.parseUnary(true));
        } else if (this.skipValue(lexer.TOKEN_OPERATOR, "+")) {
          node = new nodes.Pos(tok.lineno, tok.colno, this.parseUnary(true));
        } else {
          node = this.parsePrimary();
        }
        if (!noFilters) {
          node = this.parseFilter(node);
        }
        return node;
      }, "parseUnary");
      _proto.parsePrimary = /* @__PURE__ */ __name(function parsePrimary(noPostfix) {
        var tok = this.nextToken();
        var val;
        var node = null;
        if (!tok) {
          this.fail("expected expression, got end of file");
        } else if (tok.type === lexer.TOKEN_STRING) {
          val = tok.value;
        } else if (tok.type === lexer.TOKEN_INT) {
          val = parseInt(tok.value, 10);
        } else if (tok.type === lexer.TOKEN_FLOAT) {
          val = parseFloat(tok.value);
        } else if (tok.type === lexer.TOKEN_BOOLEAN) {
          if (tok.value === "true") {
            val = true;
          } else if (tok.value === "false") {
            val = false;
          } else {
            this.fail("invalid boolean: " + tok.value, tok.lineno, tok.colno);
          }
        } else if (tok.type === lexer.TOKEN_NONE) {
          val = null;
        } else if (tok.type === lexer.TOKEN_REGEX) {
          val = new RegExp(tok.value.body, tok.value.flags);
        }
        if (val !== void 0) {
          node = new nodes.Literal(tok.lineno, tok.colno, val);
        } else if (tok.type === lexer.TOKEN_SYMBOL) {
          node = new nodes.Symbol(tok.lineno, tok.colno, tok.value);
        } else {
          this.pushToken(tok);
          node = this.parseAggregate();
        }
        if (!noPostfix) {
          node = this.parsePostfix(node);
        }
        if (node) {
          return node;
        } else {
          throw this.error("unexpected token: " + tok.value, tok.lineno, tok.colno);
        }
      }, "parsePrimary");
      _proto.parseFilterName = /* @__PURE__ */ __name(function parseFilterName() {
        var tok = this.expect(lexer.TOKEN_SYMBOL);
        var name = tok.value;
        while (this.skipValue(lexer.TOKEN_OPERATOR, ".")) {
          name += "." + this.expect(lexer.TOKEN_SYMBOL).value;
        }
        return new nodes.Symbol(tok.lineno, tok.colno, name);
      }, "parseFilterName");
      _proto.parseFilterArgs = /* @__PURE__ */ __name(function parseFilterArgs(node) {
        if (this.peekToken().type === lexer.TOKEN_LEFT_PAREN) {
          var call = this.parsePostfix(node);
          return call.args.children;
        }
        return [];
      }, "parseFilterArgs");
      _proto.parseFilter = /* @__PURE__ */ __name(function parseFilter(node) {
        while (this.skip(lexer.TOKEN_PIPE)) {
          var name = this.parseFilterName();
          node = new nodes.Filter(name.lineno, name.colno, name, new nodes.NodeList(name.lineno, name.colno, [node].concat(this.parseFilterArgs(node))));
        }
        return node;
      }, "parseFilter");
      _proto.parseFilterStatement = /* @__PURE__ */ __name(function parseFilterStatement() {
        var filterTok = this.peekToken();
        if (!this.skipSymbol("filter")) {
          this.fail("parseFilterStatement: expected filter");
        }
        var name = this.parseFilterName();
        var args = this.parseFilterArgs(name);
        this.advanceAfterBlockEnd(filterTok.value);
        var body = new nodes.Capture(name.lineno, name.colno, this.parseUntilBlocks("endfilter"));
        this.advanceAfterBlockEnd();
        var node = new nodes.Filter(name.lineno, name.colno, name, new nodes.NodeList(name.lineno, name.colno, [body].concat(args)));
        return new nodes.Output(name.lineno, name.colno, [node]);
      }, "parseFilterStatement");
      _proto.parseAggregate = /* @__PURE__ */ __name(function parseAggregate() {
        var tok = this.nextToken();
        var node;
        switch (tok.type) {
          case lexer.TOKEN_LEFT_PAREN:
            node = new nodes.Group(tok.lineno, tok.colno);
            break;
          case lexer.TOKEN_LEFT_BRACKET:
            node = new nodes.Array(tok.lineno, tok.colno);
            break;
          case lexer.TOKEN_LEFT_CURLY:
            node = new nodes.Dict(tok.lineno, tok.colno);
            break;
          default:
            return null;
        }
        while (1) {
          var type = this.peekToken().type;
          if (type === lexer.TOKEN_RIGHT_PAREN || type === lexer.TOKEN_RIGHT_BRACKET || type === lexer.TOKEN_RIGHT_CURLY) {
            this.nextToken();
            break;
          }
          if (node.children.length > 0) {
            if (!this.skip(lexer.TOKEN_COMMA)) {
              this.fail("parseAggregate: expected comma after expression", tok.lineno, tok.colno);
            }
          }
          if (node instanceof nodes.Dict) {
            var key = this.parsePrimary();
            if (!this.skip(lexer.TOKEN_COLON)) {
              this.fail("parseAggregate: expected colon after dict key", tok.lineno, tok.colno);
            }
            var value = this.parseExpression();
            node.addChild(new nodes.Pair(key.lineno, key.colno, key, value));
          } else {
            var expr = this.parseExpression();
            node.addChild(expr);
          }
        }
        return node;
      }, "parseAggregate");
      _proto.parseSignature = /* @__PURE__ */ __name(function parseSignature(tolerant, noParens) {
        var tok = this.peekToken();
        if (!noParens && tok.type !== lexer.TOKEN_LEFT_PAREN) {
          if (tolerant) {
            return null;
          } else {
            this.fail("expected arguments", tok.lineno, tok.colno);
          }
        }
        if (tok.type === lexer.TOKEN_LEFT_PAREN) {
          tok = this.nextToken();
        }
        var args = new nodes.NodeList(tok.lineno, tok.colno);
        var kwargs = new nodes.KeywordArgs(tok.lineno, tok.colno);
        var checkComma = false;
        while (1) {
          tok = this.peekToken();
          if (!noParens && tok.type === lexer.TOKEN_RIGHT_PAREN) {
            this.nextToken();
            break;
          } else if (noParens && tok.type === lexer.TOKEN_BLOCK_END) {
            break;
          }
          if (checkComma && !this.skip(lexer.TOKEN_COMMA)) {
            this.fail("parseSignature: expected comma after expression", tok.lineno, tok.colno);
          } else {
            var arg = this.parseExpression();
            if (this.skipValue(lexer.TOKEN_OPERATOR, "=")) {
              kwargs.addChild(new nodes.Pair(arg.lineno, arg.colno, arg, this.parseExpression()));
            } else {
              args.addChild(arg);
            }
          }
          checkComma = true;
        }
        if (kwargs.children.length) {
          args.addChild(kwargs);
        }
        return args;
      }, "parseSignature");
      _proto.parseUntilBlocks = /* @__PURE__ */ __name(function parseUntilBlocks() {
        var prev = this.breakOnBlocks;
        for (var _len = arguments.length, blockNames = new Array(_len), _key = 0; _key < _len; _key++) {
          blockNames[_key] = arguments[_key];
        }
        this.breakOnBlocks = blockNames;
        var ret = this.parse();
        this.breakOnBlocks = prev;
        return ret;
      }, "parseUntilBlocks");
      _proto.parseNodes = /* @__PURE__ */ __name(function parseNodes() {
        var tok;
        var buf = [];
        while (tok = this.nextToken()) {
          if (tok.type === lexer.TOKEN_DATA) {
            var data = tok.value;
            var nextToken = this.peekToken();
            var nextVal = nextToken && nextToken.value;
            if (this.dropLeadingWhitespace) {
              data = data.replace(/^\s*/, "");
              this.dropLeadingWhitespace = false;
            }
            if (nextToken && (nextToken.type === lexer.TOKEN_BLOCK_START && nextVal.charAt(nextVal.length - 1) === "-" || nextToken.type === lexer.TOKEN_VARIABLE_START && nextVal.charAt(this.tokens.tags.VARIABLE_START.length) === "-" || nextToken.type === lexer.TOKEN_COMMENT && nextVal.charAt(this.tokens.tags.COMMENT_START.length) === "-")) {
              data = data.replace(/\s*$/, "");
            }
            buf.push(new nodes.Output(tok.lineno, tok.colno, [new nodes.TemplateData(tok.lineno, tok.colno, data)]));
          } else if (tok.type === lexer.TOKEN_BLOCK_START) {
            this.dropLeadingWhitespace = false;
            var n = this.parseStatement();
            if (!n) {
              break;
            }
            buf.push(n);
          } else if (tok.type === lexer.TOKEN_VARIABLE_START) {
            var e = this.parseExpression();
            this.dropLeadingWhitespace = false;
            this.advanceAfterVariableEnd();
            buf.push(new nodes.Output(tok.lineno, tok.colno, [e]));
          } else if (tok.type === lexer.TOKEN_COMMENT) {
            this.dropLeadingWhitespace = tok.value.charAt(tok.value.length - this.tokens.tags.COMMENT_END.length - 1) === "-";
          } else {
            this.fail("Unexpected token at top-level: " + tok.type, tok.lineno, tok.colno);
          }
        }
        return buf;
      }, "parseNodes");
      _proto.parse = /* @__PURE__ */ __name(function parse() {
        return new nodes.NodeList(0, 0, this.parseNodes());
      }, "parse");
      _proto.parseAsRoot = /* @__PURE__ */ __name(function parseAsRoot() {
        return new nodes.Root(0, 0, this.parseNodes());
      }, "parseAsRoot");
      return Parser2;
    })(Obj);
    module.exports = {
      parse: /* @__PURE__ */ __name(function parse(src, extensions, opts) {
        var p = new Parser(lexer.lex(src, opts));
        if (extensions !== void 0) {
          p.extensions = extensions;
        }
        return p.parseAsRoot();
      }, "parse"),
      Parser
    };
  }
});

// node_modules/nunjucks/src/transformer.js
var require_transformer = __commonJS({
  "node_modules/nunjucks/src/transformer.js"(exports, module) {
    "use strict";
    var nodes = require_nodes();
    var lib = require_lib();
    var sym = 0;
    function gensym() {
      return "hole_" + sym++;
    }
    __name(gensym, "gensym");
    function mapCOW(arr, func) {
      var res = null;
      for (var i = 0; i < arr.length; i++) {
        var item = func(arr[i]);
        if (item !== arr[i]) {
          if (!res) {
            res = arr.slice();
          }
          res[i] = item;
        }
      }
      return res || arr;
    }
    __name(mapCOW, "mapCOW");
    function walk(ast, func, depthFirst) {
      if (!(ast instanceof nodes.Node)) {
        return ast;
      }
      if (!depthFirst) {
        var astT = func(ast);
        if (astT && astT !== ast) {
          return astT;
        }
      }
      if (ast instanceof nodes.NodeList) {
        var children = mapCOW(ast.children, function(node) {
          return walk(node, func, depthFirst);
        });
        if (children !== ast.children) {
          ast = new nodes[ast.typename](ast.lineno, ast.colno, children);
        }
      } else if (ast instanceof nodes.CallExtension) {
        var args = walk(ast.args, func, depthFirst);
        var contentArgs = mapCOW(ast.contentArgs, function(node) {
          return walk(node, func, depthFirst);
        });
        if (args !== ast.args || contentArgs !== ast.contentArgs) {
          ast = new nodes[ast.typename](ast.extName, ast.prop, args, contentArgs);
        }
      } else {
        var props = ast.fields.map(function(field) {
          return ast[field];
        });
        var propsT = mapCOW(props, function(prop) {
          return walk(prop, func, depthFirst);
        });
        if (propsT !== props) {
          ast = new nodes[ast.typename](ast.lineno, ast.colno);
          propsT.forEach(function(prop, i) {
            ast[ast.fields[i]] = prop;
          });
        }
      }
      return depthFirst ? func(ast) || ast : ast;
    }
    __name(walk, "walk");
    function depthWalk(ast, func) {
      return walk(ast, func, true);
    }
    __name(depthWalk, "depthWalk");
    function _liftFilters(node, asyncFilters, prop) {
      var children = [];
      var walked = depthWalk(prop ? node[prop] : node, function(descNode) {
        var symbol;
        if (descNode instanceof nodes.Block) {
          return descNode;
        } else if (descNode instanceof nodes.Filter && lib.indexOf(asyncFilters, descNode.name.value) !== -1 || descNode instanceof nodes.CallExtensionAsync) {
          symbol = new nodes.Symbol(descNode.lineno, descNode.colno, gensym());
          children.push(new nodes.FilterAsync(descNode.lineno, descNode.colno, descNode.name, descNode.args, symbol));
        }
        return symbol;
      });
      if (prop) {
        node[prop] = walked;
      } else {
        node = walked;
      }
      if (children.length) {
        children.push(node);
        return new nodes.NodeList(node.lineno, node.colno, children);
      } else {
        return node;
      }
    }
    __name(_liftFilters, "_liftFilters");
    function liftFilters(ast, asyncFilters) {
      return depthWalk(ast, function(node) {
        if (node instanceof nodes.Output) {
          return _liftFilters(node, asyncFilters);
        } else if (node instanceof nodes.Set) {
          return _liftFilters(node, asyncFilters, "value");
        } else if (node instanceof nodes.For) {
          return _liftFilters(node, asyncFilters, "arr");
        } else if (node instanceof nodes.If) {
          return _liftFilters(node, asyncFilters, "cond");
        } else if (node instanceof nodes.CallExtension) {
          return _liftFilters(node, asyncFilters, "args");
        } else {
          return void 0;
        }
      });
    }
    __name(liftFilters, "liftFilters");
    function liftSuper(ast) {
      return walk(ast, function(blockNode) {
        if (!(blockNode instanceof nodes.Block)) {
          return;
        }
        var hasSuper = false;
        var symbol = gensym();
        blockNode.body = walk(blockNode.body, function(node) {
          if (node instanceof nodes.FunCall && node.name.value === "super") {
            hasSuper = true;
            return new nodes.Symbol(node.lineno, node.colno, symbol);
          }
        });
        if (hasSuper) {
          blockNode.body.children.unshift(new nodes.Super(0, 0, blockNode.name, new nodes.Symbol(0, 0, symbol)));
        }
      });
    }
    __name(liftSuper, "liftSuper");
    function convertStatements(ast) {
      return depthWalk(ast, function(node) {
        if (!(node instanceof nodes.If) && !(node instanceof nodes.For)) {
          return void 0;
        }
        var async = false;
        walk(node, function(child) {
          if (child instanceof nodes.FilterAsync || child instanceof nodes.IfAsync || child instanceof nodes.AsyncEach || child instanceof nodes.AsyncAll || child instanceof nodes.CallExtensionAsync) {
            async = true;
            return child;
          }
          return void 0;
        });
        if (async) {
          if (node instanceof nodes.If) {
            return new nodes.IfAsync(node.lineno, node.colno, node.cond, node.body, node.else_);
          } else if (node instanceof nodes.For && !(node instanceof nodes.AsyncAll)) {
            return new nodes.AsyncEach(node.lineno, node.colno, node.arr, node.name, node.body, node.else_);
          }
        }
        return void 0;
      });
    }
    __name(convertStatements, "convertStatements");
    function cps(ast, asyncFilters) {
      return convertStatements(liftSuper(liftFilters(ast, asyncFilters)));
    }
    __name(cps, "cps");
    function transform(ast, asyncFilters) {
      return cps(ast, asyncFilters || []);
    }
    __name(transform, "transform");
    module.exports = {
      transform
    };
  }
});

// node_modules/nunjucks/src/runtime.js
var require_runtime = __commonJS({
  "node_modules/nunjucks/src/runtime.js"(exports, module) {
    "use strict";
    var lib = require_lib();
    var arrayFrom = Array.from;
    var supportsIterators = typeof Symbol === "function" && Symbol.iterator && typeof arrayFrom === "function";
    var Frame = /* @__PURE__ */ (function() {
      function Frame2(parent, isolateWrites) {
        this.variables = /* @__PURE__ */ Object.create(null);
        this.parent = parent;
        this.topLevel = false;
        this.isolateWrites = isolateWrites;
      }
      __name(Frame2, "Frame");
      var _proto = Frame2.prototype;
      _proto.set = /* @__PURE__ */ __name(function set(name, val, resolveUp) {
        var parts = name.split(".");
        var obj = this.variables;
        var frame = this;
        if (resolveUp) {
          if (frame = this.resolve(parts[0], true)) {
            frame.set(name, val);
            return;
          }
        }
        for (var i = 0; i < parts.length - 1; i++) {
          var id = parts[i];
          if (!obj[id]) {
            obj[id] = {};
          }
          obj = obj[id];
        }
        obj[parts[parts.length - 1]] = val;
      }, "set");
      _proto.get = /* @__PURE__ */ __name(function get(name) {
        var val = this.variables[name];
        if (val !== void 0) {
          return val;
        }
        return null;
      }, "get");
      _proto.lookup = /* @__PURE__ */ __name(function lookup(name) {
        var p = this.parent;
        var val = this.variables[name];
        if (val !== void 0) {
          return val;
        }
        return p && p.lookup(name);
      }, "lookup");
      _proto.resolve = /* @__PURE__ */ __name(function resolve(name, forWrite) {
        var p = forWrite && this.isolateWrites ? void 0 : this.parent;
        var val = this.variables[name];
        if (val !== void 0) {
          return this;
        }
        return p && p.resolve(name);
      }, "resolve");
      _proto.push = /* @__PURE__ */ __name(function push(isolateWrites) {
        return new Frame2(this, isolateWrites);
      }, "push");
      _proto.pop = /* @__PURE__ */ __name(function pop() {
        return this.parent;
      }, "pop");
      return Frame2;
    })();
    function makeMacro(argNames, kwargNames, func) {
      return /* @__PURE__ */ __name(function macro() {
        for (var _len = arguments.length, macroArgs = new Array(_len), _key = 0; _key < _len; _key++) {
          macroArgs[_key] = arguments[_key];
        }
        var argCount = numArgs(macroArgs);
        var args;
        var kwargs = getKeywordArgs(macroArgs);
        if (argCount > argNames.length) {
          args = macroArgs.slice(0, argNames.length);
          macroArgs.slice(args.length, argCount).forEach(function(val, i2) {
            if (i2 < kwargNames.length) {
              kwargs[kwargNames[i2]] = val;
            }
          });
          args.push(kwargs);
        } else if (argCount < argNames.length) {
          args = macroArgs.slice(0, argCount);
          for (var i = argCount; i < argNames.length; i++) {
            var arg = argNames[i];
            args.push(kwargs[arg]);
            delete kwargs[arg];
          }
          args.push(kwargs);
        } else {
          args = macroArgs;
        }
        return func.apply(this, args);
      }, "macro");
    }
    __name(makeMacro, "makeMacro");
    function makeKeywordArgs(obj) {
      obj.__keywords = true;
      return obj;
    }
    __name(makeKeywordArgs, "makeKeywordArgs");
    function isKeywordArgs(obj) {
      return obj && Object.prototype.hasOwnProperty.call(obj, "__keywords");
    }
    __name(isKeywordArgs, "isKeywordArgs");
    function getKeywordArgs(args) {
      var len = args.length;
      if (len) {
        var lastArg = args[len - 1];
        if (isKeywordArgs(lastArg)) {
          return lastArg;
        }
      }
      return {};
    }
    __name(getKeywordArgs, "getKeywordArgs");
    function numArgs(args) {
      var len = args.length;
      if (len === 0) {
        return 0;
      }
      var lastArg = args[len - 1];
      if (isKeywordArgs(lastArg)) {
        return len - 1;
      } else {
        return len;
      }
    }
    __name(numArgs, "numArgs");
    function SafeString(val) {
      if (typeof val !== "string") {
        return val;
      }
      this.val = val;
      this.length = val.length;
    }
    __name(SafeString, "SafeString");
    SafeString.prototype = Object.create(String.prototype, {
      length: {
        writable: true,
        configurable: true,
        value: 0
      }
    });
    SafeString.prototype.valueOf = /* @__PURE__ */ __name(function valueOf() {
      return this.val;
    }, "valueOf");
    SafeString.prototype.toString = /* @__PURE__ */ __name(function toString() {
      return this.val;
    }, "toString");
    function copySafeness(dest, target) {
      if (dest instanceof SafeString) {
        return new SafeString(target);
      }
      return target.toString();
    }
    __name(copySafeness, "copySafeness");
    function markSafe(val) {
      var type = typeof val;
      if (type === "string") {
        return new SafeString(val);
      } else if (type !== "function") {
        return val;
      } else {
        return /* @__PURE__ */ __name(function wrapSafe(args) {
          var ret = val.apply(this, arguments);
          if (typeof ret === "string") {
            return new SafeString(ret);
          }
          return ret;
        }, "wrapSafe");
      }
    }
    __name(markSafe, "markSafe");
    function suppressValue(val, autoescape) {
      val = val !== void 0 && val !== null ? val : "";
      if (autoescape && !(val instanceof SafeString)) {
        val = lib.escape(val.toString());
      }
      return val;
    }
    __name(suppressValue, "suppressValue");
    function ensureDefined(val, lineno, colno) {
      if (val === null || val === void 0) {
        throw new lib.TemplateError("attempted to output null or undefined value", lineno + 1, colno + 1);
      }
      return val;
    }
    __name(ensureDefined, "ensureDefined");
    function memberLookup(obj, val) {
      if (obj === void 0 || obj === null) {
        return void 0;
      }
      if (typeof obj[val] === "function") {
        return function() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return obj[val].apply(obj, args);
        };
      }
      return obj[val];
    }
    __name(memberLookup, "memberLookup");
    function callWrap(obj, name, context, args) {
      if (!obj) {
        throw new Error("Unable to call `" + name + "`, which is undefined or falsey");
      } else if (typeof obj !== "function") {
        throw new Error("Unable to call `" + name + "`, which is not a function");
      }
      return obj.apply(context, args);
    }
    __name(callWrap, "callWrap");
    function contextOrFrameLookup(context, frame, name) {
      var val = frame.lookup(name);
      return val !== void 0 ? val : context.lookup(name);
    }
    __name(contextOrFrameLookup, "contextOrFrameLookup");
    function handleError(error, lineno, colno) {
      if (error.lineno) {
        return error;
      } else {
        return new lib.TemplateError(error, lineno, colno);
      }
    }
    __name(handleError, "handleError");
    function asyncEach(arr, dimen, iter, cb) {
      if (lib.isArray(arr)) {
        var len = arr.length;
        lib.asyncIter(arr, /* @__PURE__ */ __name(function iterCallback(item, i, next) {
          switch (dimen) {
            case 1:
              iter(item, i, len, next);
              break;
            case 2:
              iter(item[0], item[1], i, len, next);
              break;
            case 3:
              iter(item[0], item[1], item[2], i, len, next);
              break;
            default:
              item.push(i, len, next);
              iter.apply(this, item);
          }
        }, "iterCallback"), cb);
      } else {
        lib.asyncFor(arr, /* @__PURE__ */ __name(function iterCallback(key, val, i, len2, next) {
          iter(key, val, i, len2, next);
        }, "iterCallback"), cb);
      }
    }
    __name(asyncEach, "asyncEach");
    function asyncAll(arr, dimen, func, cb) {
      var finished = 0;
      var len;
      var outputArr;
      function done(i2, output) {
        finished++;
        outputArr[i2] = output;
        if (finished === len) {
          cb(null, outputArr.join(""));
        }
      }
      __name(done, "done");
      if (lib.isArray(arr)) {
        len = arr.length;
        outputArr = new Array(len);
        if (len === 0) {
          cb(null, "");
        } else {
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            switch (dimen) {
              case 1:
                func(item, i, len, done);
                break;
              case 2:
                func(item[0], item[1], i, len, done);
                break;
              case 3:
                func(item[0], item[1], item[2], i, len, done);
                break;
              default:
                item.push(i, len, done);
                func.apply(this, item);
            }
          }
        }
      } else {
        var keys = lib.keys(arr || {});
        len = keys.length;
        outputArr = new Array(len);
        if (len === 0) {
          cb(null, "");
        } else {
          for (var _i = 0; _i < keys.length; _i++) {
            var k = keys[_i];
            func(k, arr[k], _i, len, done);
          }
        }
      }
    }
    __name(asyncAll, "asyncAll");
    function fromIterator(arr) {
      if (typeof arr !== "object" || arr === null || lib.isArray(arr)) {
        return arr;
      } else if (supportsIterators && Symbol.iterator in arr) {
        return arrayFrom(arr);
      } else {
        return arr;
      }
    }
    __name(fromIterator, "fromIterator");
    module.exports = {
      Frame,
      makeMacro,
      makeKeywordArgs,
      numArgs,
      suppressValue,
      ensureDefined,
      memberLookup,
      contextOrFrameLookup,
      callWrap,
      handleError,
      isArray: lib.isArray,
      keys: lib.keys,
      SafeString,
      copySafeness,
      markSafe,
      asyncEach,
      asyncAll,
      inOperator: lib.inOperator,
      fromIterator
    };
  }
});

// node_modules/nunjucks/src/compiler.js
var require_compiler = __commonJS({
  "node_modules/nunjucks/src/compiler.js"(exports, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    __name(_inheritsLoose, "_inheritsLoose");
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      }, "_setPrototypeOf");
      return _setPrototypeOf(o, p);
    }
    __name(_setPrototypeOf, "_setPrototypeOf");
    var parser = require_parser();
    var transformer = require_transformer();
    var nodes = require_nodes();
    var _require = require_lib();
    var TemplateError = _require.TemplateError;
    var _require2 = require_runtime();
    var Frame = _require2.Frame;
    var _require3 = require_object();
    var Obj = _require3.Obj;
    var compareOps = {
      "==": "==",
      "===": "===",
      "!=": "!=",
      "!==": "!==",
      "<": "<",
      ">": ">",
      "<=": "<=",
      ">=": ">="
    };
    var Compiler = /* @__PURE__ */ (function(_Obj) {
      _inheritsLoose(Compiler2, _Obj);
      function Compiler2() {
        return _Obj.apply(this, arguments) || this;
      }
      __name(Compiler2, "Compiler");
      var _proto = Compiler2.prototype;
      _proto.init = /* @__PURE__ */ __name(function init(templateName, throwOnUndefined) {
        this.templateName = templateName;
        this.codebuf = [];
        this.lastId = 0;
        this.buffer = null;
        this.bufferStack = [];
        this._scopeClosers = "";
        this.inBlock = false;
        this.throwOnUndefined = throwOnUndefined;
      }, "init");
      _proto.fail = /* @__PURE__ */ __name(function fail(msg, lineno, colno) {
        if (lineno !== void 0) {
          lineno += 1;
        }
        if (colno !== void 0) {
          colno += 1;
        }
        throw new TemplateError(msg, lineno, colno);
      }, "fail");
      _proto._pushBuffer = /* @__PURE__ */ __name(function _pushBuffer() {
        var id = this._tmpid();
        this.bufferStack.push(this.buffer);
        this.buffer = id;
        this._emit("var " + this.buffer + ' = "";');
        return id;
      }, "_pushBuffer");
      _proto._popBuffer = /* @__PURE__ */ __name(function _popBuffer() {
        this.buffer = this.bufferStack.pop();
      }, "_popBuffer");
      _proto._emit = /* @__PURE__ */ __name(function _emit(code) {
        this.codebuf.push(code);
      }, "_emit");
      _proto._emitLine = /* @__PURE__ */ __name(function _emitLine(code) {
        this._emit(code + "\n");
      }, "_emitLine");
      _proto._emitLines = /* @__PURE__ */ __name(function _emitLines() {
        var _this = this;
        for (var _len = arguments.length, lines = new Array(_len), _key = 0; _key < _len; _key++) {
          lines[_key] = arguments[_key];
        }
        lines.forEach(function(line) {
          return _this._emitLine(line);
        });
      }, "_emitLines");
      _proto._emitFuncBegin = /* @__PURE__ */ __name(function _emitFuncBegin(node, name) {
        this.buffer = "output";
        this._scopeClosers = "";
        this._emitLine("function " + name + "(env, context, frame, runtime, cb) {");
        this._emitLine("var lineno = " + node.lineno + ";");
        this._emitLine("var colno = " + node.colno + ";");
        this._emitLine("var " + this.buffer + ' = "";');
        this._emitLine("try {");
      }, "_emitFuncBegin");
      _proto._emitFuncEnd = /* @__PURE__ */ __name(function _emitFuncEnd(noReturn) {
        if (!noReturn) {
          this._emitLine("cb(null, " + this.buffer + ");");
        }
        this._closeScopeLevels();
        this._emitLine("} catch (e) {");
        this._emitLine("  cb(runtime.handleError(e, lineno, colno));");
        this._emitLine("}");
        this._emitLine("}");
        this.buffer = null;
      }, "_emitFuncEnd");
      _proto._addScopeLevel = /* @__PURE__ */ __name(function _addScopeLevel() {
        this._scopeClosers += "})";
      }, "_addScopeLevel");
      _proto._closeScopeLevels = /* @__PURE__ */ __name(function _closeScopeLevels() {
        this._emitLine(this._scopeClosers + ";");
        this._scopeClosers = "";
      }, "_closeScopeLevels");
      _proto._withScopedSyntax = /* @__PURE__ */ __name(function _withScopedSyntax(func) {
        var _scopeClosers = this._scopeClosers;
        this._scopeClosers = "";
        func.call(this);
        this._closeScopeLevels();
        this._scopeClosers = _scopeClosers;
      }, "_withScopedSyntax");
      _proto._makeCallback = /* @__PURE__ */ __name(function _makeCallback(res) {
        var err = this._tmpid();
        return "function(" + err + (res ? "," + res : "") + ") {\nif(" + err + ") { cb(" + err + "); return; }";
      }, "_makeCallback");
      _proto._tmpid = /* @__PURE__ */ __name(function _tmpid() {
        this.lastId++;
        return "t_" + this.lastId;
      }, "_tmpid");
      _proto._templateName = /* @__PURE__ */ __name(function _templateName() {
        return this.templateName == null ? "undefined" : JSON.stringify(this.templateName);
      }, "_templateName");
      _proto._compileChildren = /* @__PURE__ */ __name(function _compileChildren(node, frame) {
        var _this2 = this;
        node.children.forEach(function(child) {
          _this2.compile(child, frame);
        });
      }, "_compileChildren");
      _proto._compileAggregate = /* @__PURE__ */ __name(function _compileAggregate(node, frame, startChar, endChar) {
        var _this3 = this;
        if (startChar) {
          this._emit(startChar);
        }
        node.children.forEach(function(child, i) {
          if (i > 0) {
            _this3._emit(",");
          }
          _this3.compile(child, frame);
        });
        if (endChar) {
          this._emit(endChar);
        }
      }, "_compileAggregate");
      _proto._compileExpression = /* @__PURE__ */ __name(function _compileExpression(node, frame) {
        this.assertType(node, nodes.Literal, nodes.Symbol, nodes.Group, nodes.Array, nodes.Dict, nodes.FunCall, nodes.Caller, nodes.Filter, nodes.LookupVal, nodes.Compare, nodes.InlineIf, nodes.In, nodes.Is, nodes.And, nodes.Or, nodes.Not, nodes.Add, nodes.Concat, nodes.Sub, nodes.Mul, nodes.Div, nodes.FloorDiv, nodes.Mod, nodes.Pow, nodes.Neg, nodes.Pos, nodes.Compare, nodes.NodeList);
        this.compile(node, frame);
      }, "_compileExpression");
      _proto.assertType = /* @__PURE__ */ __name(function assertType(node) {
        for (var _len2 = arguments.length, types = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          types[_key2 - 1] = arguments[_key2];
        }
        if (!types.some(function(t) {
          return node instanceof t;
        })) {
          this.fail("assertType: invalid type: " + node.typename, node.lineno, node.colno);
        }
      }, "assertType");
      _proto.compileCallExtension = /* @__PURE__ */ __name(function compileCallExtension(node, frame, async) {
        var _this4 = this;
        var args = node.args;
        var contentArgs = node.contentArgs;
        var autoescape = typeof node.autoescape === "boolean" ? node.autoescape : true;
        if (!async) {
          this._emit(this.buffer + " += runtime.suppressValue(");
        }
        this._emit('env.getExtension("' + node.extName + '")["' + node.prop + '"](');
        this._emit("context");
        if (args || contentArgs) {
          this._emit(",");
        }
        if (args) {
          if (!(args instanceof nodes.NodeList)) {
            this.fail("compileCallExtension: arguments must be a NodeList, use `parser.parseSignature`");
          }
          args.children.forEach(function(arg, i) {
            _this4._compileExpression(arg, frame);
            if (i !== args.children.length - 1 || contentArgs.length) {
              _this4._emit(",");
            }
          });
        }
        if (contentArgs.length) {
          contentArgs.forEach(function(arg, i) {
            if (i > 0) {
              _this4._emit(",");
            }
            if (arg) {
              _this4._emitLine("function(cb) {");
              _this4._emitLine("if(!cb) { cb = function(err) { if(err) { throw err; }}}");
              var id = _this4._pushBuffer();
              _this4._withScopedSyntax(function() {
                _this4.compile(arg, frame);
                _this4._emitLine("cb(null, " + id + ");");
              });
              _this4._popBuffer();
              _this4._emitLine("return " + id + ";");
              _this4._emitLine("}");
            } else {
              _this4._emit("null");
            }
          });
        }
        if (async) {
          var res = this._tmpid();
          this._emitLine(", " + this._makeCallback(res));
          this._emitLine(this.buffer + " += runtime.suppressValue(" + res + ", " + autoescape + " && env.opts.autoescape);");
          this._addScopeLevel();
        } else {
          this._emit(")");
          this._emit(", " + autoescape + " && env.opts.autoescape);\n");
        }
      }, "compileCallExtension");
      _proto.compileCallExtensionAsync = /* @__PURE__ */ __name(function compileCallExtensionAsync(node, frame) {
        this.compileCallExtension(node, frame, true);
      }, "compileCallExtensionAsync");
      _proto.compileNodeList = /* @__PURE__ */ __name(function compileNodeList(node, frame) {
        this._compileChildren(node, frame);
      }, "compileNodeList");
      _proto.compileLiteral = /* @__PURE__ */ __name(function compileLiteral(node) {
        if (typeof node.value === "string") {
          var val = node.value.replace(/\\/g, "\\\\");
          val = val.replace(/"/g, '\\"');
          val = val.replace(/\n/g, "\\n");
          val = val.replace(/\r/g, "\\r");
          val = val.replace(/\t/g, "\\t");
          val = val.replace(/\u2028/g, "\\u2028");
          this._emit('"' + val + '"');
        } else if (node.value === null) {
          this._emit("null");
        } else {
          this._emit(node.value.toString());
        }
      }, "compileLiteral");
      _proto.compileSymbol = /* @__PURE__ */ __name(function compileSymbol(node, frame) {
        var name = node.value;
        var v = frame.lookup(name);
        if (v) {
          this._emit(v);
        } else {
          this._emit('runtime.contextOrFrameLookup(context, frame, "' + name + '")');
        }
      }, "compileSymbol");
      _proto.compileGroup = /* @__PURE__ */ __name(function compileGroup(node, frame) {
        this._compileAggregate(node, frame, "(", ")");
      }, "compileGroup");
      _proto.compileArray = /* @__PURE__ */ __name(function compileArray(node, frame) {
        this._compileAggregate(node, frame, "[", "]");
      }, "compileArray");
      _proto.compileDict = /* @__PURE__ */ __name(function compileDict(node, frame) {
        this._compileAggregate(node, frame, "{", "}");
      }, "compileDict");
      _proto.compilePair = /* @__PURE__ */ __name(function compilePair(node, frame) {
        var key = node.key;
        var val = node.value;
        if (key instanceof nodes.Symbol) {
          key = new nodes.Literal(key.lineno, key.colno, key.value);
        } else if (!(key instanceof nodes.Literal && typeof key.value === "string")) {
          this.fail("compilePair: Dict keys must be strings or names", key.lineno, key.colno);
        }
        this.compile(key, frame);
        this._emit(": ");
        this._compileExpression(val, frame);
      }, "compilePair");
      _proto.compileInlineIf = /* @__PURE__ */ __name(function compileInlineIf(node, frame) {
        this._emit("(");
        this.compile(node.cond, frame);
        this._emit("?");
        this.compile(node.body, frame);
        this._emit(":");
        if (node.else_ !== null) {
          this.compile(node.else_, frame);
        } else {
          this._emit('""');
        }
        this._emit(")");
      }, "compileInlineIf");
      _proto.compileIn = /* @__PURE__ */ __name(function compileIn(node, frame) {
        this._emit("runtime.inOperator(");
        this.compile(node.left, frame);
        this._emit(",");
        this.compile(node.right, frame);
        this._emit(")");
      }, "compileIn");
      _proto.compileIs = /* @__PURE__ */ __name(function compileIs(node, frame) {
        var right = node.right.name ? node.right.name.value : node.right.value;
        this._emit('env.getTest("' + right + '").call(context, ');
        this.compile(node.left, frame);
        if (node.right.args) {
          this._emit(",");
          this.compile(node.right.args, frame);
        }
        this._emit(") === true");
      }, "compileIs");
      _proto._binOpEmitter = /* @__PURE__ */ __name(function _binOpEmitter(node, frame, str) {
        this.compile(node.left, frame);
        this._emit(str);
        this.compile(node.right, frame);
      }, "_binOpEmitter");
      _proto.compileOr = /* @__PURE__ */ __name(function compileOr(node, frame) {
        return this._binOpEmitter(node, frame, " || ");
      }, "compileOr");
      _proto.compileAnd = /* @__PURE__ */ __name(function compileAnd(node, frame) {
        return this._binOpEmitter(node, frame, " && ");
      }, "compileAnd");
      _proto.compileAdd = /* @__PURE__ */ __name(function compileAdd(node, frame) {
        return this._binOpEmitter(node, frame, " + ");
      }, "compileAdd");
      _proto.compileConcat = /* @__PURE__ */ __name(function compileConcat(node, frame) {
        return this._binOpEmitter(node, frame, ' + "" + ');
      }, "compileConcat");
      _proto.compileSub = /* @__PURE__ */ __name(function compileSub(node, frame) {
        return this._binOpEmitter(node, frame, " - ");
      }, "compileSub");
      _proto.compileMul = /* @__PURE__ */ __name(function compileMul(node, frame) {
        return this._binOpEmitter(node, frame, " * ");
      }, "compileMul");
      _proto.compileDiv = /* @__PURE__ */ __name(function compileDiv(node, frame) {
        return this._binOpEmitter(node, frame, " / ");
      }, "compileDiv");
      _proto.compileMod = /* @__PURE__ */ __name(function compileMod(node, frame) {
        return this._binOpEmitter(node, frame, " % ");
      }, "compileMod");
      _proto.compileNot = /* @__PURE__ */ __name(function compileNot(node, frame) {
        this._emit("!");
        this.compile(node.target, frame);
      }, "compileNot");
      _proto.compileFloorDiv = /* @__PURE__ */ __name(function compileFloorDiv(node, frame) {
        this._emit("Math.floor(");
        this.compile(node.left, frame);
        this._emit(" / ");
        this.compile(node.right, frame);
        this._emit(")");
      }, "compileFloorDiv");
      _proto.compilePow = /* @__PURE__ */ __name(function compilePow(node, frame) {
        this._emit("Math.pow(");
        this.compile(node.left, frame);
        this._emit(", ");
        this.compile(node.right, frame);
        this._emit(")");
      }, "compilePow");
      _proto.compileNeg = /* @__PURE__ */ __name(function compileNeg(node, frame) {
        this._emit("-");
        this.compile(node.target, frame);
      }, "compileNeg");
      _proto.compilePos = /* @__PURE__ */ __name(function compilePos(node, frame) {
        this._emit("+");
        this.compile(node.target, frame);
      }, "compilePos");
      _proto.compileCompare = /* @__PURE__ */ __name(function compileCompare(node, frame) {
        var _this5 = this;
        this.compile(node.expr, frame);
        node.ops.forEach(function(op) {
          _this5._emit(" " + compareOps[op.type] + " ");
          _this5.compile(op.expr, frame);
        });
      }, "compileCompare");
      _proto.compileLookupVal = /* @__PURE__ */ __name(function compileLookupVal(node, frame) {
        this._emit("runtime.memberLookup((");
        this._compileExpression(node.target, frame);
        this._emit("),");
        this._compileExpression(node.val, frame);
        this._emit(")");
      }, "compileLookupVal");
      _proto._getNodeName = /* @__PURE__ */ __name(function _getNodeName(node) {
        switch (node.typename) {
          case "Symbol":
            return node.value;
          case "FunCall":
            return "the return value of (" + this._getNodeName(node.name) + ")";
          case "LookupVal":
            return this._getNodeName(node.target) + '["' + this._getNodeName(node.val) + '"]';
          case "Literal":
            return node.value.toString();
          default:
            return "--expression--";
        }
      }, "_getNodeName");
      _proto.compileFunCall = /* @__PURE__ */ __name(function compileFunCall(node, frame) {
        this._emit("(lineno = " + node.lineno + ", colno = " + node.colno + ", ");
        this._emit("runtime.callWrap(");
        this._compileExpression(node.name, frame);
        this._emit(', "' + this._getNodeName(node.name).replace(/"/g, '\\"') + '", context, ');
        this._compileAggregate(node.args, frame, "[", "])");
        this._emit(")");
      }, "compileFunCall");
      _proto.compileFilter = /* @__PURE__ */ __name(function compileFilter(node, frame) {
        var name = node.name;
        this.assertType(name, nodes.Symbol);
        this._emit('env.getFilter("' + name.value + '").call(context, ');
        this._compileAggregate(node.args, frame);
        this._emit(")");
      }, "compileFilter");
      _proto.compileFilterAsync = /* @__PURE__ */ __name(function compileFilterAsync(node, frame) {
        var name = node.name;
        var symbol = node.symbol.value;
        this.assertType(name, nodes.Symbol);
        frame.set(symbol, symbol);
        this._emit('env.getFilter("' + name.value + '").call(context, ');
        this._compileAggregate(node.args, frame);
        this._emitLine(", " + this._makeCallback(symbol));
        this._addScopeLevel();
      }, "compileFilterAsync");
      _proto.compileKeywordArgs = /* @__PURE__ */ __name(function compileKeywordArgs(node, frame) {
        this._emit("runtime.makeKeywordArgs(");
        this.compileDict(node, frame);
        this._emit(")");
      }, "compileKeywordArgs");
      _proto.compileSet = /* @__PURE__ */ __name(function compileSet(node, frame) {
        var _this6 = this;
        var ids = [];
        node.targets.forEach(function(target) {
          var name = target.value;
          var id = frame.lookup(name);
          if (id === null || id === void 0) {
            id = _this6._tmpid();
            _this6._emitLine("var " + id + ";");
          }
          ids.push(id);
        });
        if (node.value) {
          this._emit(ids.join(" = ") + " = ");
          this._compileExpression(node.value, frame);
          this._emitLine(";");
        } else {
          this._emit(ids.join(" = ") + " = ");
          this.compile(node.body, frame);
          this._emitLine(";");
        }
        node.targets.forEach(function(target, i) {
          var id = ids[i];
          var name = target.value;
          _this6._emitLine('frame.set("' + name + '", ' + id + ", true);");
          _this6._emitLine("if(frame.topLevel) {");
          _this6._emitLine('context.setVariable("' + name + '", ' + id + ");");
          _this6._emitLine("}");
          if (name.charAt(0) !== "_") {
            _this6._emitLine("if(frame.topLevel) {");
            _this6._emitLine('context.addExport("' + name + '", ' + id + ");");
            _this6._emitLine("}");
          }
        });
      }, "compileSet");
      _proto.compileSwitch = /* @__PURE__ */ __name(function compileSwitch(node, frame) {
        var _this7 = this;
        this._emit("switch (");
        this.compile(node.expr, frame);
        this._emit(") {");
        node.cases.forEach(function(c, i) {
          _this7._emit("case ");
          _this7.compile(c.cond, frame);
          _this7._emit(": ");
          _this7.compile(c.body, frame);
          if (c.body.children.length) {
            _this7._emitLine("break;");
          }
        });
        if (node.default) {
          this._emit("default:");
          this.compile(node.default, frame);
        }
        this._emit("}");
      }, "compileSwitch");
      _proto.compileIf = /* @__PURE__ */ __name(function compileIf(node, frame, async) {
        var _this8 = this;
        this._emit("if(");
        this._compileExpression(node.cond, frame);
        this._emitLine(") {");
        this._withScopedSyntax(function() {
          _this8.compile(node.body, frame);
          if (async) {
            _this8._emit("cb()");
          }
        });
        if (node.else_) {
          this._emitLine("}\nelse {");
          this._withScopedSyntax(function() {
            _this8.compile(node.else_, frame);
            if (async) {
              _this8._emit("cb()");
            }
          });
        } else if (async) {
          this._emitLine("}\nelse {");
          this._emit("cb()");
        }
        this._emitLine("}");
      }, "compileIf");
      _proto.compileIfAsync = /* @__PURE__ */ __name(function compileIfAsync(node, frame) {
        this._emit("(function(cb) {");
        this.compileIf(node, frame, true);
        this._emit("})(" + this._makeCallback());
        this._addScopeLevel();
      }, "compileIfAsync");
      _proto._emitLoopBindings = /* @__PURE__ */ __name(function _emitLoopBindings(node, arr, i, len) {
        var _this9 = this;
        var bindings = [{
          name: "index",
          val: i + " + 1"
        }, {
          name: "index0",
          val: i
        }, {
          name: "revindex",
          val: len + " - " + i
        }, {
          name: "revindex0",
          val: len + " - " + i + " - 1"
        }, {
          name: "first",
          val: i + " === 0"
        }, {
          name: "last",
          val: i + " === " + len + " - 1"
        }, {
          name: "length",
          val: len
        }];
        bindings.forEach(function(b) {
          _this9._emitLine('frame.set("loop.' + b.name + '", ' + b.val + ");");
        });
      }, "_emitLoopBindings");
      _proto.compileFor = /* @__PURE__ */ __name(function compileFor(node, frame) {
        var _this10 = this;
        var i = this._tmpid();
        var len = this._tmpid();
        var arr = this._tmpid();
        frame = frame.push();
        this._emitLine("frame = frame.push();");
        this._emit("var " + arr + " = ");
        this._compileExpression(node.arr, frame);
        this._emitLine(";");
        this._emit("if(" + arr + ") {");
        this._emitLine(arr + " = runtime.fromIterator(" + arr + ");");
        if (node.name instanceof nodes.Array) {
          this._emitLine("var " + i + ";");
          this._emitLine("if(runtime.isArray(" + arr + ")) {");
          this._emitLine("var " + len + " = " + arr + ".length;");
          this._emitLine("for(" + i + "=0; " + i + " < " + arr + ".length; " + i + "++) {");
          node.name.children.forEach(function(child, u) {
            var tid = _this10._tmpid();
            _this10._emitLine("var " + tid + " = " + arr + "[" + i + "][" + u + "];");
            _this10._emitLine('frame.set("' + child + '", ' + arr + "[" + i + "][" + u + "]);");
            frame.set(node.name.children[u].value, tid);
          });
          this._emitLoopBindings(node, arr, i, len);
          this._withScopedSyntax(function() {
            _this10.compile(node.body, frame);
          });
          this._emitLine("}");
          this._emitLine("} else {");
          var _node$name$children = node.name.children, key = _node$name$children[0], val = _node$name$children[1];
          var k = this._tmpid();
          var v = this._tmpid();
          frame.set(key.value, k);
          frame.set(val.value, v);
          this._emitLine(i + " = -1;");
          this._emitLine("var " + len + " = runtime.keys(" + arr + ").length;");
          this._emitLine("for(var " + k + " in " + arr + ") {");
          this._emitLine(i + "++;");
          this._emitLine("var " + v + " = " + arr + "[" + k + "];");
          this._emitLine('frame.set("' + key.value + '", ' + k + ");");
          this._emitLine('frame.set("' + val.value + '", ' + v + ");");
          this._emitLoopBindings(node, arr, i, len);
          this._withScopedSyntax(function() {
            _this10.compile(node.body, frame);
          });
          this._emitLine("}");
          this._emitLine("}");
        } else {
          var _v = this._tmpid();
          frame.set(node.name.value, _v);
          this._emitLine("var " + len + " = " + arr + ".length;");
          this._emitLine("for(var " + i + "=0; " + i + " < " + arr + ".length; " + i + "++) {");
          this._emitLine("var " + _v + " = " + arr + "[" + i + "];");
          this._emitLine('frame.set("' + node.name.value + '", ' + _v + ");");
          this._emitLoopBindings(node, arr, i, len);
          this._withScopedSyntax(function() {
            _this10.compile(node.body, frame);
          });
          this._emitLine("}");
        }
        this._emitLine("}");
        if (node.else_) {
          this._emitLine("if (!" + len + ") {");
          this.compile(node.else_, frame);
          this._emitLine("}");
        }
        this._emitLine("frame = frame.pop();");
      }, "compileFor");
      _proto._compileAsyncLoop = /* @__PURE__ */ __name(function _compileAsyncLoop(node, frame, parallel) {
        var _this11 = this;
        var i = this._tmpid();
        var len = this._tmpid();
        var arr = this._tmpid();
        var asyncMethod = parallel ? "asyncAll" : "asyncEach";
        frame = frame.push();
        this._emitLine("frame = frame.push();");
        this._emit("var " + arr + " = runtime.fromIterator(");
        this._compileExpression(node.arr, frame);
        this._emitLine(");");
        if (node.name instanceof nodes.Array) {
          var arrayLen = node.name.children.length;
          this._emit("runtime." + asyncMethod + "(" + arr + ", " + arrayLen + ", function(");
          node.name.children.forEach(function(name) {
            _this11._emit(name.value + ",");
          });
          this._emit(i + "," + len + ",next) {");
          node.name.children.forEach(function(name) {
            var id2 = name.value;
            frame.set(id2, id2);
            _this11._emitLine('frame.set("' + id2 + '", ' + id2 + ");");
          });
        } else {
          var id = node.name.value;
          this._emitLine("runtime." + asyncMethod + "(" + arr + ", 1, function(" + id + ", " + i + ", " + len + ",next) {");
          this._emitLine('frame.set("' + id + '", ' + id + ");");
          frame.set(id, id);
        }
        this._emitLoopBindings(node, arr, i, len);
        this._withScopedSyntax(function() {
          var buf;
          if (parallel) {
            buf = _this11._pushBuffer();
          }
          _this11.compile(node.body, frame);
          _this11._emitLine("next(" + i + (buf ? "," + buf : "") + ");");
          if (parallel) {
            _this11._popBuffer();
          }
        });
        var output = this._tmpid();
        this._emitLine("}, " + this._makeCallback(output));
        this._addScopeLevel();
        if (parallel) {
          this._emitLine(this.buffer + " += " + output + ";");
        }
        if (node.else_) {
          this._emitLine("if (!" + arr + ".length) {");
          this.compile(node.else_, frame);
          this._emitLine("}");
        }
        this._emitLine("frame = frame.pop();");
      }, "_compileAsyncLoop");
      _proto.compileAsyncEach = /* @__PURE__ */ __name(function compileAsyncEach(node, frame) {
        this._compileAsyncLoop(node, frame);
      }, "compileAsyncEach");
      _proto.compileAsyncAll = /* @__PURE__ */ __name(function compileAsyncAll(node, frame) {
        this._compileAsyncLoop(node, frame, true);
      }, "compileAsyncAll");
      _proto._compileMacro = /* @__PURE__ */ __name(function _compileMacro(node, frame) {
        var _this12 = this;
        var args = [];
        var kwargs = null;
        var funcId = "macro_" + this._tmpid();
        var keepFrame = frame !== void 0;
        node.args.children.forEach(function(arg, i) {
          if (i === node.args.children.length - 1 && arg instanceof nodes.Dict) {
            kwargs = arg;
          } else {
            _this12.assertType(arg, nodes.Symbol);
            args.push(arg);
          }
        });
        var realNames = [].concat(args.map(function(n) {
          return "l_" + n.value;
        }), ["kwargs"]);
        var argNames = args.map(function(n) {
          return '"' + n.value + '"';
        });
        var kwargNames = (kwargs && kwargs.children || []).map(function(n) {
          return '"' + n.key.value + '"';
        });
        var currFrame;
        if (keepFrame) {
          currFrame = frame.push(true);
        } else {
          currFrame = new Frame();
        }
        this._emitLines("var " + funcId + " = runtime.makeMacro(", "[" + argNames.join(", ") + "], ", "[" + kwargNames.join(", ") + "], ", "function (" + realNames.join(", ") + ") {", "var callerFrame = frame;", "frame = " + (keepFrame ? "frame.push(true);" : "new runtime.Frame();"), "kwargs = kwargs || {};", 'if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {', 'frame.set("caller", kwargs.caller); }');
        args.forEach(function(arg) {
          _this12._emitLine('frame.set("' + arg.value + '", l_' + arg.value + ");");
          currFrame.set(arg.value, "l_" + arg.value);
        });
        if (kwargs) {
          kwargs.children.forEach(function(pair) {
            var name = pair.key.value;
            _this12._emit('frame.set("' + name + '", ');
            _this12._emit('Object.prototype.hasOwnProperty.call(kwargs, "' + name + '")');
            _this12._emit(' ? kwargs["' + name + '"] : ');
            _this12._compileExpression(pair.value, currFrame);
            _this12._emit(");");
          });
        }
        var bufferId = this._pushBuffer();
        this._withScopedSyntax(function() {
          _this12.compile(node.body, currFrame);
        });
        this._emitLine("frame = " + (keepFrame ? "frame.pop();" : "callerFrame;"));
        this._emitLine("return new runtime.SafeString(" + bufferId + ");");
        this._emitLine("});");
        this._popBuffer();
        return funcId;
      }, "_compileMacro");
      _proto.compileMacro = /* @__PURE__ */ __name(function compileMacro(node, frame) {
        var funcId = this._compileMacro(node);
        var name = node.name.value;
        frame.set(name, funcId);
        if (frame.parent) {
          this._emitLine('frame.set("' + name + '", ' + funcId + ");");
        } else {
          if (node.name.value.charAt(0) !== "_") {
            this._emitLine('context.addExport("' + name + '");');
          }
          this._emitLine('context.setVariable("' + name + '", ' + funcId + ");");
        }
      }, "compileMacro");
      _proto.compileCaller = /* @__PURE__ */ __name(function compileCaller(node, frame) {
        this._emit("(function (){");
        var funcId = this._compileMacro(node, frame);
        this._emit("return " + funcId + ";})()");
      }, "compileCaller");
      _proto._compileGetTemplate = /* @__PURE__ */ __name(function _compileGetTemplate(node, frame, eagerCompile, ignoreMissing) {
        var parentTemplateId = this._tmpid();
        var parentName = this._templateName();
        var cb = this._makeCallback(parentTemplateId);
        var eagerCompileArg = eagerCompile ? "true" : "false";
        var ignoreMissingArg = ignoreMissing ? "true" : "false";
        this._emit("env.getTemplate(");
        this._compileExpression(node.template, frame);
        this._emitLine(", " + eagerCompileArg + ", " + parentName + ", " + ignoreMissingArg + ", " + cb);
        return parentTemplateId;
      }, "_compileGetTemplate");
      _proto.compileImport = /* @__PURE__ */ __name(function compileImport(node, frame) {
        var target = node.target.value;
        var id = this._compileGetTemplate(node, frame, false, false);
        this._addScopeLevel();
        this._emitLine(id + ".getExported(" + (node.withContext ? "context.getVariables(), frame, " : "") + this._makeCallback(id));
        this._addScopeLevel();
        frame.set(target, id);
        if (frame.parent) {
          this._emitLine('frame.set("' + target + '", ' + id + ");");
        } else {
          this._emitLine('context.setVariable("' + target + '", ' + id + ");");
        }
      }, "compileImport");
      _proto.compileFromImport = /* @__PURE__ */ __name(function compileFromImport(node, frame) {
        var _this13 = this;
        var importedId = this._compileGetTemplate(node, frame, false, false);
        this._addScopeLevel();
        this._emitLine(importedId + ".getExported(" + (node.withContext ? "context.getVariables(), frame, " : "") + this._makeCallback(importedId));
        this._addScopeLevel();
        node.names.children.forEach(function(nameNode) {
          var name;
          var alias;
          var id = _this13._tmpid();
          if (nameNode instanceof nodes.Pair) {
            name = nameNode.key.value;
            alias = nameNode.value.value;
          } else {
            name = nameNode.value;
            alias = name;
          }
          _this13._emitLine("if(Object.prototype.hasOwnProperty.call(" + importedId + ', "' + name + '")) {');
          _this13._emitLine("var " + id + " = " + importedId + "." + name + ";");
          _this13._emitLine("} else {");
          _this13._emitLine(`cb(new Error("cannot import '` + name + `'")); return;`);
          _this13._emitLine("}");
          frame.set(alias, id);
          if (frame.parent) {
            _this13._emitLine('frame.set("' + alias + '", ' + id + ");");
          } else {
            _this13._emitLine('context.setVariable("' + alias + '", ' + id + ");");
          }
        });
      }, "compileFromImport");
      _proto.compileBlock = /* @__PURE__ */ __name(function compileBlock(node) {
        var id = this._tmpid();
        if (!this.inBlock) {
          this._emit('(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : ');
        }
        this._emit('context.getBlock("' + node.name.value + '")');
        if (!this.inBlock) {
          this._emit(")");
        }
        this._emitLine("(env, context, frame, runtime, " + this._makeCallback(id));
        this._emitLine(this.buffer + " += " + id + ";");
        this._addScopeLevel();
      }, "compileBlock");
      _proto.compileSuper = /* @__PURE__ */ __name(function compileSuper(node, frame) {
        var name = node.blockName.value;
        var id = node.symbol.value;
        var cb = this._makeCallback(id);
        this._emitLine('context.getSuper(env, "' + name + '", b_' + name + ", frame, runtime, " + cb);
        this._emitLine(id + " = runtime.markSafe(" + id + ");");
        this._addScopeLevel();
        frame.set(id, id);
      }, "compileSuper");
      _proto.compileExtends = /* @__PURE__ */ __name(function compileExtends(node, frame) {
        var k = this._tmpid();
        var parentTemplateId = this._compileGetTemplate(node, frame, true, false);
        this._emitLine("parentTemplate = " + parentTemplateId);
        this._emitLine("for(var " + k + " in parentTemplate.blocks) {");
        this._emitLine("context.addBlock(" + k + ", parentTemplate.blocks[" + k + "]);");
        this._emitLine("}");
        this._addScopeLevel();
      }, "compileExtends");
      _proto.compileInclude = /* @__PURE__ */ __name(function compileInclude(node, frame) {
        this._emitLine("var tasks = [];");
        this._emitLine("tasks.push(");
        this._emitLine("function(callback) {");
        var id = this._compileGetTemplate(node, frame, false, node.ignoreMissing);
        this._emitLine("callback(null," + id + ");});");
        this._emitLine("});");
        var id2 = this._tmpid();
        this._emitLine("tasks.push(");
        this._emitLine("function(template, callback){");
        this._emitLine("template.render(context.getVariables(), frame, " + this._makeCallback(id2));
        this._emitLine("callback(null," + id2 + ");});");
        this._emitLine("});");
        this._emitLine("tasks.push(");
        this._emitLine("function(result, callback){");
        this._emitLine(this.buffer + " += result;");
        this._emitLine("callback(null);");
        this._emitLine("});");
        this._emitLine("env.waterfall(tasks, function(){");
        this._addScopeLevel();
      }, "compileInclude");
      _proto.compileTemplateData = /* @__PURE__ */ __name(function compileTemplateData(node, frame) {
        this.compileLiteral(node, frame);
      }, "compileTemplateData");
      _proto.compileCapture = /* @__PURE__ */ __name(function compileCapture(node, frame) {
        var _this14 = this;
        var buffer = this.buffer;
        this.buffer = "output";
        this._emitLine("(function() {");
        this._emitLine('var output = "";');
        this._withScopedSyntax(function() {
          _this14.compile(node.body, frame);
        });
        this._emitLine("return output;");
        this._emitLine("})()");
        this.buffer = buffer;
      }, "compileCapture");
      _proto.compileOutput = /* @__PURE__ */ __name(function compileOutput(node, frame) {
        var _this15 = this;
        var children = node.children;
        children.forEach(function(child) {
          if (child instanceof nodes.TemplateData) {
            if (child.value) {
              _this15._emit(_this15.buffer + " += ");
              _this15.compileLiteral(child, frame);
              _this15._emitLine(";");
            }
          } else {
            _this15._emit(_this15.buffer + " += runtime.suppressValue(");
            if (_this15.throwOnUndefined) {
              _this15._emit("runtime.ensureDefined(");
            }
            _this15.compile(child, frame);
            if (_this15.throwOnUndefined) {
              _this15._emit("," + node.lineno + "," + node.colno + ")");
            }
            _this15._emit(", env.opts.autoescape);\n");
          }
        });
      }, "compileOutput");
      _proto.compileRoot = /* @__PURE__ */ __name(function compileRoot(node, frame) {
        var _this16 = this;
        if (frame) {
          this.fail("compileRoot: root node can't have frame");
        }
        frame = new Frame();
        this._emitFuncBegin(node, "root");
        this._emitLine("var parentTemplate = null;");
        this._compileChildren(node, frame);
        this._emitLine("if(parentTemplate) {");
        this._emitLine("parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);");
        this._emitLine("} else {");
        this._emitLine("cb(null, " + this.buffer + ");");
        this._emitLine("}");
        this._emitFuncEnd(true);
        this.inBlock = true;
        var blockNames = [];
        var blocks = node.findAll(nodes.Block);
        blocks.forEach(function(block, i) {
          var name = block.name.value;
          if (blockNames.indexOf(name) !== -1) {
            throw new Error('Block "' + name + '" defined more than once.');
          }
          blockNames.push(name);
          _this16._emitFuncBegin(block, "b_" + name);
          var tmpFrame = new Frame();
          _this16._emitLine("var frame = frame.push(true);");
          _this16.compile(block.body, tmpFrame);
          _this16._emitFuncEnd();
        });
        this._emitLine("return {");
        blocks.forEach(function(block, i) {
          var blockName = "b_" + block.name.value;
          _this16._emitLine(blockName + ": " + blockName + ",");
        });
        this._emitLine("root: root\n};");
      }, "compileRoot");
      _proto.compile = /* @__PURE__ */ __name(function compile(node, frame) {
        var _compile = this["compile" + node.typename];
        if (_compile) {
          _compile.call(this, node, frame);
        } else {
          this.fail("compile: Cannot compile node: " + node.typename, node.lineno, node.colno);
        }
      }, "compile");
      _proto.getCode = /* @__PURE__ */ __name(function getCode() {
        return this.codebuf.join("");
      }, "getCode");
      return Compiler2;
    })(Obj);
    module.exports = {
      compile: /* @__PURE__ */ __name(function compile(src, asyncFilters, extensions, name, opts) {
        if (opts === void 0) {
          opts = {};
        }
        var c = new Compiler(name, opts.throwOnUndefined);
        var preprocessors = (extensions || []).map(function(ext) {
          return ext.preprocess;
        }).filter(function(f) {
          return !!f;
        });
        var processedSrc = preprocessors.reduce(function(s, processor) {
          return processor(s);
        }, src);
        c.compile(transformer.transform(parser.parse(processedSrc, extensions, opts), asyncFilters, name));
        return c.getCode();
      }, "compile"),
      Compiler
    };
  }
});

// node_modules/nunjucks/src/filters.js
var require_filters = __commonJS({
  "node_modules/nunjucks/src/filters.js"(exports, module) {
    "use strict";
    var lib = require_lib();
    var r = require_runtime();
    var _exports = module.exports = {};
    function normalize(value, defaultValue) {
      if (value === null || value === void 0 || value === false) {
        return defaultValue;
      }
      return value;
    }
    __name(normalize, "normalize");
    _exports.abs = Math.abs;
    function isNaN(num) {
      return num !== num;
    }
    __name(isNaN, "isNaN");
    function batch(arr, linecount, fillWith) {
      var i;
      var res = [];
      var tmp = [];
      for (i = 0; i < arr.length; i++) {
        if (i % linecount === 0 && tmp.length) {
          res.push(tmp);
          tmp = [];
        }
        tmp.push(arr[i]);
      }
      if (tmp.length) {
        if (fillWith) {
          for (i = tmp.length; i < linecount; i++) {
            tmp.push(fillWith);
          }
        }
        res.push(tmp);
      }
      return res;
    }
    __name(batch, "batch");
    _exports.batch = batch;
    function capitalize(str) {
      str = normalize(str, "");
      var ret = str.toLowerCase();
      return r.copySafeness(str, ret.charAt(0).toUpperCase() + ret.slice(1));
    }
    __name(capitalize, "capitalize");
    _exports.capitalize = capitalize;
    function center(str, width) {
      str = normalize(str, "");
      width = width || 80;
      if (str.length >= width) {
        return str;
      }
      var spaces = width - str.length;
      var pre = lib.repeat(" ", spaces / 2 - spaces % 2);
      var post = lib.repeat(" ", spaces / 2);
      return r.copySafeness(str, pre + str + post);
    }
    __name(center, "center");
    _exports.center = center;
    function default_(val, def, bool) {
      if (bool) {
        return val || def;
      } else {
        return val !== void 0 ? val : def;
      }
    }
    __name(default_, "default_");
    _exports["default"] = default_;
    function dictsort(val, caseSensitive, by) {
      if (!lib.isObject(val)) {
        throw new lib.TemplateError("dictsort filter: val must be an object");
      }
      var array = [];
      for (var k in val) {
        array.push([k, val[k]]);
      }
      var si;
      if (by === void 0 || by === "key") {
        si = 0;
      } else if (by === "value") {
        si = 1;
      } else {
        throw new lib.TemplateError("dictsort filter: You can only sort by either key or value");
      }
      array.sort(function(t1, t2) {
        var a = t1[si];
        var b = t2[si];
        if (!caseSensitive) {
          if (lib.isString(a)) {
            a = a.toUpperCase();
          }
          if (lib.isString(b)) {
            b = b.toUpperCase();
          }
        }
        return a > b ? 1 : a === b ? 0 : -1;
      });
      return array;
    }
    __name(dictsort, "dictsort");
    _exports.dictsort = dictsort;
    function dump(obj, spaces) {
      return JSON.stringify(obj, null, spaces);
    }
    __name(dump, "dump");
    _exports.dump = dump;
    function escape(str) {
      if (str instanceof r.SafeString) {
        return str;
      }
      str = str === null || str === void 0 ? "" : str;
      return r.markSafe(lib.escape(str.toString()));
    }
    __name(escape, "escape");
    _exports.escape = escape;
    function safe(str) {
      if (str instanceof r.SafeString) {
        return str;
      }
      str = str === null || str === void 0 ? "" : str;
      return r.markSafe(str.toString());
    }
    __name(safe, "safe");
    _exports.safe = safe;
    function first(arr) {
      return arr[0];
    }
    __name(first, "first");
    _exports.first = first;
    function forceescape(str) {
      str = str === null || str === void 0 ? "" : str;
      return r.markSafe(lib.escape(str.toString()));
    }
    __name(forceescape, "forceescape");
    _exports.forceescape = forceescape;
    function groupby(arr, attr) {
      return lib.groupBy(arr, attr, this.env.opts.throwOnUndefined);
    }
    __name(groupby, "groupby");
    _exports.groupby = groupby;
    function indent(str, width, indentfirst) {
      str = normalize(str, "");
      if (str === "") {
        return "";
      }
      width = width || 4;
      var lines = str.split("\n");
      var sp = lib.repeat(" ", width);
      var res = lines.map(function(l, i) {
        return i === 0 && !indentfirst ? l : "" + sp + l;
      }).join("\n");
      return r.copySafeness(str, res);
    }
    __name(indent, "indent");
    _exports.indent = indent;
    function join(arr, del, attr) {
      del = del || "";
      if (attr) {
        arr = lib.map(arr, function(v) {
          return v[attr];
        });
      }
      return arr.join(del);
    }
    __name(join, "join");
    _exports.join = join;
    function last(arr) {
      return arr[arr.length - 1];
    }
    __name(last, "last");
    _exports.last = last;
    function lengthFilter(val) {
      var value = normalize(val, "");
      if (value !== void 0) {
        if (typeof Map === "function" && value instanceof Map || typeof Set === "function" && value instanceof Set) {
          return value.size;
        }
        if (lib.isObject(value) && !(value instanceof r.SafeString)) {
          return lib.keys(value).length;
        }
        return value.length;
      }
      return 0;
    }
    __name(lengthFilter, "lengthFilter");
    _exports.length = lengthFilter;
    function list(val) {
      if (lib.isString(val)) {
        return val.split("");
      } else if (lib.isObject(val)) {
        return lib._entries(val || {}).map(function(_ref) {
          var key = _ref[0], value = _ref[1];
          return {
            key,
            value
          };
        });
      } else if (lib.isArray(val)) {
        return val;
      } else {
        throw new lib.TemplateError("list filter: type not iterable");
      }
    }
    __name(list, "list");
    _exports.list = list;
    function lower(str) {
      str = normalize(str, "");
      return str.toLowerCase();
    }
    __name(lower, "lower");
    _exports.lower = lower;
    function nl2br(str) {
      if (str === null || str === void 0) {
        return "";
      }
      return r.copySafeness(str, str.replace(/\r\n|\n/g, "<br />\n"));
    }
    __name(nl2br, "nl2br");
    _exports.nl2br = nl2br;
    function random(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    __name(random, "random");
    _exports.random = random;
    function getSelectOrReject(expectedTestResult) {
      function filter(arr, testName, secondArg) {
        if (testName === void 0) {
          testName = "truthy";
        }
        var context = this;
        var test = context.env.getTest(testName);
        return lib.toArray(arr).filter(/* @__PURE__ */ __name(function examineTestResult(item) {
          return test.call(context, item, secondArg) === expectedTestResult;
        }, "examineTestResult"));
      }
      __name(filter, "filter");
      return filter;
    }
    __name(getSelectOrReject, "getSelectOrReject");
    _exports.reject = getSelectOrReject(false);
    function rejectattr(arr, attr) {
      return arr.filter(function(item) {
        return !item[attr];
      });
    }
    __name(rejectattr, "rejectattr");
    _exports.rejectattr = rejectattr;
    _exports.select = getSelectOrReject(true);
    function selectattr(arr, attr) {
      return arr.filter(function(item) {
        return !!item[attr];
      });
    }
    __name(selectattr, "selectattr");
    _exports.selectattr = selectattr;
    function replace(str, old, new_, maxCount) {
      var originalStr = str;
      if (old instanceof RegExp) {
        return str.replace(old, new_);
      }
      if (typeof maxCount === "undefined") {
        maxCount = -1;
      }
      var res = "";
      if (typeof old === "number") {
        old = "" + old;
      } else if (typeof old !== "string") {
        return str;
      }
      if (typeof str === "number") {
        str = "" + str;
      }
      if (typeof str !== "string" && !(str instanceof r.SafeString)) {
        return str;
      }
      if (old === "") {
        res = new_ + str.split("").join(new_) + new_;
        return r.copySafeness(str, res);
      }
      var nextIndex = str.indexOf(old);
      if (maxCount === 0 || nextIndex === -1) {
        return str;
      }
      var pos = 0;
      var count = 0;
      while (nextIndex > -1 && (maxCount === -1 || count < maxCount)) {
        res += str.substring(pos, nextIndex) + new_;
        pos = nextIndex + old.length;
        count++;
        nextIndex = str.indexOf(old, pos);
      }
      if (pos < str.length) {
        res += str.substring(pos);
      }
      return r.copySafeness(originalStr, res);
    }
    __name(replace, "replace");
    _exports.replace = replace;
    function reverse(val) {
      var arr;
      if (lib.isString(val)) {
        arr = list(val);
      } else {
        arr = lib.map(val, function(v) {
          return v;
        });
      }
      arr.reverse();
      if (lib.isString(val)) {
        return r.copySafeness(val, arr.join(""));
      }
      return arr;
    }
    __name(reverse, "reverse");
    _exports.reverse = reverse;
    function round(val, precision, method) {
      precision = precision || 0;
      var factor = Math.pow(10, precision);
      var rounder;
      if (method === "ceil") {
        rounder = Math.ceil;
      } else if (method === "floor") {
        rounder = Math.floor;
      } else {
        rounder = Math.round;
      }
      return rounder(val * factor) / factor;
    }
    __name(round, "round");
    _exports.round = round;
    function slice(arr, slices, fillWith) {
      var sliceLength = Math.floor(arr.length / slices);
      var extra = arr.length % slices;
      var res = [];
      var offset = 0;
      for (var i = 0; i < slices; i++) {
        var start = offset + i * sliceLength;
        if (i < extra) {
          offset++;
        }
        var end = offset + (i + 1) * sliceLength;
        var currSlice = arr.slice(start, end);
        if (fillWith && i >= extra) {
          currSlice.push(fillWith);
        }
        res.push(currSlice);
      }
      return res;
    }
    __name(slice, "slice");
    _exports.slice = slice;
    function sum(arr, attr, start) {
      if (start === void 0) {
        start = 0;
      }
      if (attr) {
        arr = lib.map(arr, function(v) {
          return v[attr];
        });
      }
      return start + arr.reduce(function(a, b) {
        return a + b;
      }, 0);
    }
    __name(sum, "sum");
    _exports.sum = sum;
    _exports.sort = r.makeMacro(["value", "reverse", "case_sensitive", "attribute"], [], /* @__PURE__ */ __name(function sortFilter(arr, reversed, caseSens, attr) {
      var _this = this;
      var array = lib.map(arr, function(v) {
        return v;
      });
      var getAttribute = lib.getAttrGetter(attr);
      array.sort(function(a, b) {
        var x = attr ? getAttribute(a) : a;
        var y = attr ? getAttribute(b) : b;
        if (_this.env.opts.throwOnUndefined && attr && (x === void 0 || y === void 0)) {
          throw new TypeError('sort: attribute "' + attr + '" resolved to undefined');
        }
        if (!caseSens && lib.isString(x) && lib.isString(y)) {
          x = x.toLowerCase();
          y = y.toLowerCase();
        }
        if (x < y) {
          return reversed ? 1 : -1;
        } else if (x > y) {
          return reversed ? -1 : 1;
        } else {
          return 0;
        }
      });
      return array;
    }, "sortFilter"));
    function string(obj) {
      return r.copySafeness(obj, obj);
    }
    __name(string, "string");
    _exports.string = string;
    function striptags(input, preserveLinebreaks) {
      input = normalize(input, "");
      var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;
      var trimmedInput = trim(input.replace(tags, ""));
      var res = "";
      if (preserveLinebreaks) {
        res = trimmedInput.replace(/^ +| +$/gm, "").replace(/ +/g, " ").replace(/(\r\n)/g, "\n").replace(/\n\n\n+/g, "\n\n");
      } else {
        res = trimmedInput.replace(/\s+/gi, " ");
      }
      return r.copySafeness(input, res);
    }
    __name(striptags, "striptags");
    _exports.striptags = striptags;
    function title(str) {
      str = normalize(str, "");
      var words = str.split(" ").map(function(word) {
        return capitalize(word);
      });
      return r.copySafeness(str, words.join(" "));
    }
    __name(title, "title");
    _exports.title = title;
    function trim(str) {
      return r.copySafeness(str, str.replace(/^\s*|\s*$/g, ""));
    }
    __name(trim, "trim");
    _exports.trim = trim;
    function truncate(input, length, killwords, end) {
      var orig = input;
      input = normalize(input, "");
      length = length || 255;
      if (input.length <= length) {
        return input;
      }
      if (killwords) {
        input = input.substring(0, length);
      } else {
        var idx = input.lastIndexOf(" ", length);
        if (idx === -1) {
          idx = length;
        }
        input = input.substring(0, idx);
      }
      input += end !== void 0 && end !== null ? end : "...";
      return r.copySafeness(orig, input);
    }
    __name(truncate, "truncate");
    _exports.truncate = truncate;
    function upper(str) {
      str = normalize(str, "");
      return str.toUpperCase();
    }
    __name(upper, "upper");
    _exports.upper = upper;
    function urlencode(obj) {
      var enc = encodeURIComponent;
      if (lib.isString(obj)) {
        return enc(obj);
      } else {
        var keyvals = lib.isArray(obj) ? obj : lib._entries(obj);
        return keyvals.map(function(_ref2) {
          var k = _ref2[0], v = _ref2[1];
          return enc(k) + "=" + enc(v);
        }).join("&");
      }
    }
    __name(urlencode, "urlencode");
    _exports.urlencode = urlencode;
    var puncRe = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/;
    var emailRe = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
    var httpHttpsRe = /^https?:\/\/.*$/;
    var wwwRe = /^www\./;
    var tldRe = /\.(?:org|net|com)(?:\:|\/|$)/;
    function urlize(str, length, nofollow) {
      if (isNaN(length)) {
        length = Infinity;
      }
      var noFollowAttr = nofollow === true ? ' rel="nofollow"' : "";
      var words = str.split(/(\s+)/).filter(function(word) {
        return word && word.length;
      }).map(function(word) {
        var matches = word.match(puncRe);
        var possibleUrl = matches ? matches[1] : word;
        var shortUrl = possibleUrl.substr(0, length);
        if (httpHttpsRe.test(possibleUrl)) {
          return '<a href="' + possibleUrl + '"' + noFollowAttr + ">" + shortUrl + "</a>";
        }
        if (wwwRe.test(possibleUrl)) {
          return '<a href="http://' + possibleUrl + '"' + noFollowAttr + ">" + shortUrl + "</a>";
        }
        if (emailRe.test(possibleUrl)) {
          return '<a href="mailto:' + possibleUrl + '">' + possibleUrl + "</a>";
        }
        if (tldRe.test(possibleUrl)) {
          return '<a href="http://' + possibleUrl + '"' + noFollowAttr + ">" + shortUrl + "</a>";
        }
        return word;
      });
      return words.join("");
    }
    __name(urlize, "urlize");
    _exports.urlize = urlize;
    function wordcount(str) {
      str = normalize(str, "");
      var words = str ? str.match(/\w+/g) : null;
      return words ? words.length : null;
    }
    __name(wordcount, "wordcount");
    _exports.wordcount = wordcount;
    function float(val, def) {
      var res = parseFloat(val);
      return isNaN(res) ? def : res;
    }
    __name(float, "float");
    _exports.float = float;
    var intFilter = r.makeMacro(["value", "default", "base"], [], /* @__PURE__ */ __name(function doInt(value, defaultValue, base) {
      if (base === void 0) {
        base = 10;
      }
      var res = parseInt(value, base);
      return isNaN(res) ? defaultValue : res;
    }, "doInt"));
    _exports.int = intFilter;
    _exports.d = _exports.default;
    _exports.e = _exports.escape;
  }
});

// node_modules/nunjucks/src/loader.js
var require_loader = __commonJS({
  "node_modules/nunjucks/src/loader.js"(exports, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    __name(_inheritsLoose, "_inheritsLoose");
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      }, "_setPrototypeOf");
      return _setPrototypeOf(o, p);
    }
    __name(_setPrototypeOf, "_setPrototypeOf");
    var path = __require("path");
    var _require = require_object();
    var EmitterObj = _require.EmitterObj;
    module.exports = /* @__PURE__ */ (function(_EmitterObj) {
      _inheritsLoose(Loader, _EmitterObj);
      function Loader() {
        return _EmitterObj.apply(this, arguments) || this;
      }
      __name(Loader, "Loader");
      var _proto = Loader.prototype;
      _proto.resolve = /* @__PURE__ */ __name(function resolve(from, to) {
        return path.resolve(path.dirname(from), to);
      }, "resolve");
      _proto.isRelative = /* @__PURE__ */ __name(function isRelative(filename) {
        return filename.indexOf("./") === 0 || filename.indexOf("../") === 0;
      }, "isRelative");
      return Loader;
    })(EmitterObj);
  }
});

// node_modules/nunjucks/src/precompiled-loader.js
var require_precompiled_loader = __commonJS({
  "node_modules/nunjucks/src/precompiled-loader.js"(exports, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    __name(_inheritsLoose, "_inheritsLoose");
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      }, "_setPrototypeOf");
      return _setPrototypeOf(o, p);
    }
    __name(_setPrototypeOf, "_setPrototypeOf");
    var Loader = require_loader();
    var PrecompiledLoader = /* @__PURE__ */ (function(_Loader) {
      _inheritsLoose(PrecompiledLoader2, _Loader);
      function PrecompiledLoader2(compiledTemplates) {
        var _this;
        _this = _Loader.call(this) || this;
        _this.precompiled = compiledTemplates || {};
        return _this;
      }
      __name(PrecompiledLoader2, "PrecompiledLoader");
      var _proto = PrecompiledLoader2.prototype;
      _proto.getSource = /* @__PURE__ */ __name(function getSource(name) {
        if (this.precompiled[name]) {
          return {
            src: {
              type: "code",
              obj: this.precompiled[name]
            },
            path: name
          };
        }
        return null;
      }, "getSource");
      return PrecompiledLoader2;
    })(Loader);
    module.exports = {
      PrecompiledLoader
    };
  }
});

// themespot-not-shipped:chokidar
var require_chokidar = __commonJS({
  "themespot-not-shipped:chokidar"() {
    throw new Error("chokidar is not part of this build");
  }
});

// node_modules/nunjucks/src/node-loaders.js
var require_node_loaders = __commonJS({
  "node_modules/nunjucks/src/node-loaders.js"(exports, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    __name(_inheritsLoose, "_inheritsLoose");
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      }, "_setPrototypeOf");
      return _setPrototypeOf(o, p);
    }
    __name(_setPrototypeOf, "_setPrototypeOf");
    var fs = __require("fs");
    var path = __require("path");
    var Loader = require_loader();
    var _require = require_precompiled_loader();
    var PrecompiledLoader = _require.PrecompiledLoader;
    var chokidar;
    var FileSystemLoader = /* @__PURE__ */ (function(_Loader) {
      _inheritsLoose(FileSystemLoader2, _Loader);
      function FileSystemLoader2(searchPaths, opts) {
        var _this;
        _this = _Loader.call(this) || this;
        if (typeof opts === "boolean") {
          console.log("[nunjucks] Warning: you passed a boolean as the second argument to FileSystemLoader, but it now takes an options object. See http://mozilla.github.io/nunjucks/api.html#filesystemloader");
        }
        opts = opts || {};
        _this.pathsToNames = {};
        _this.noCache = !!opts.noCache;
        if (searchPaths) {
          searchPaths = Array.isArray(searchPaths) ? searchPaths : [searchPaths];
          _this.searchPaths = searchPaths.map(path.normalize);
        } else {
          _this.searchPaths = ["."];
        }
        if (opts.watch) {
          try {
            chokidar = require_chokidar();
          } catch (e) {
            throw new Error("watch requires chokidar to be installed");
          }
          var paths = _this.searchPaths.filter(fs.existsSync);
          var watcher = chokidar.watch(paths);
          watcher.on("all", function(event, fullname) {
            fullname = path.resolve(fullname);
            if (event === "change" && fullname in _this.pathsToNames) {
              _this.emit("update", _this.pathsToNames[fullname], fullname);
            }
          });
          watcher.on("error", function(error) {
            console.log("Watcher error: " + error);
          });
        }
        return _this;
      }
      __name(FileSystemLoader2, "FileSystemLoader");
      var _proto = FileSystemLoader2.prototype;
      _proto.getSource = /* @__PURE__ */ __name(function getSource(name) {
        var fullpath = null;
        var paths = this.searchPaths;
        for (var i = 0; i < paths.length; i++) {
          var basePath = path.resolve(paths[i]);
          var p = path.resolve(paths[i], name);
          if (p.indexOf(basePath) === 0 && fs.existsSync(p)) {
            fullpath = p;
            break;
          }
        }
        if (!fullpath) {
          return null;
        }
        this.pathsToNames[fullpath] = name;
        var source = {
          src: fs.readFileSync(fullpath, "utf-8"),
          path: fullpath,
          noCache: this.noCache
        };
        this.emit("load", name, source);
        return source;
      }, "getSource");
      return FileSystemLoader2;
    })(Loader);
    var NodeResolveLoader = /* @__PURE__ */ (function(_Loader2) {
      _inheritsLoose(NodeResolveLoader2, _Loader2);
      function NodeResolveLoader2(opts) {
        var _this2;
        _this2 = _Loader2.call(this) || this;
        opts = opts || {};
        _this2.pathsToNames = {};
        _this2.noCache = !!opts.noCache;
        if (opts.watch) {
          try {
            chokidar = require_chokidar();
          } catch (e) {
            throw new Error("watch requires chokidar to be installed");
          }
          _this2.watcher = chokidar.watch();
          _this2.watcher.on("change", function(fullname) {
            _this2.emit("update", _this2.pathsToNames[fullname], fullname);
          });
          _this2.watcher.on("error", function(error) {
            console.log("Watcher error: " + error);
          });
          _this2.on("load", function(name, source) {
            _this2.watcher.add(source.path);
          });
        }
        return _this2;
      }
      __name(NodeResolveLoader2, "NodeResolveLoader");
      var _proto2 = NodeResolveLoader2.prototype;
      _proto2.getSource = /* @__PURE__ */ __name(function getSource(name) {
        if (/^\.?\.?(\/|\\)/.test(name)) {
          return null;
        }
        if (/^[A-Z]:/.test(name)) {
          return null;
        }
        var fullpath;
        try {
          fullpath = __require.resolve(name);
        } catch (e) {
          return null;
        }
        this.pathsToNames[fullpath] = name;
        var source = {
          src: fs.readFileSync(fullpath, "utf-8"),
          path: fullpath,
          noCache: this.noCache
        };
        this.emit("load", name, source);
        return source;
      }, "getSource");
      return NodeResolveLoader2;
    })(Loader);
    module.exports = {
      FileSystemLoader,
      PrecompiledLoader,
      NodeResolveLoader
    };
  }
});

// node_modules/nunjucks/src/loaders.js
var require_loaders = __commonJS({
  "node_modules/nunjucks/src/loaders.js"(exports, module) {
    "use strict";
    module.exports = require_node_loaders();
  }
});

// node_modules/nunjucks/src/tests.js
var require_tests = __commonJS({
  "node_modules/nunjucks/src/tests.js"(exports) {
    "use strict";
    var SafeString = require_runtime().SafeString;
    function callable(value) {
      return typeof value === "function";
    }
    __name(callable, "callable");
    exports.callable = callable;
    function defined(value) {
      return value !== void 0;
    }
    __name(defined, "defined");
    exports.defined = defined;
    function divisibleby(one, two) {
      return one % two === 0;
    }
    __name(divisibleby, "divisibleby");
    exports.divisibleby = divisibleby;
    function escaped(value) {
      return value instanceof SafeString;
    }
    __name(escaped, "escaped");
    exports.escaped = escaped;
    function equalto(one, two) {
      return one === two;
    }
    __name(equalto, "equalto");
    exports.equalto = equalto;
    exports.eq = exports.equalto;
    exports.sameas = exports.equalto;
    function even(value) {
      return value % 2 === 0;
    }
    __name(even, "even");
    exports.even = even;
    function falsy(value) {
      return !value;
    }
    __name(falsy, "falsy");
    exports.falsy = falsy;
    function ge(one, two) {
      return one >= two;
    }
    __name(ge, "ge");
    exports.ge = ge;
    function greaterthan(one, two) {
      return one > two;
    }
    __name(greaterthan, "greaterthan");
    exports.greaterthan = greaterthan;
    exports.gt = exports.greaterthan;
    function le(one, two) {
      return one <= two;
    }
    __name(le, "le");
    exports.le = le;
    function lessthan(one, two) {
      return one < two;
    }
    __name(lessthan, "lessthan");
    exports.lessthan = lessthan;
    exports.lt = exports.lessthan;
    function lower(value) {
      return value.toLowerCase() === value;
    }
    __name(lower, "lower");
    exports.lower = lower;
    function ne(one, two) {
      return one !== two;
    }
    __name(ne, "ne");
    exports.ne = ne;
    function nullTest(value) {
      return value === null;
    }
    __name(nullTest, "nullTest");
    exports.null = nullTest;
    function number(value) {
      return typeof value === "number";
    }
    __name(number, "number");
    exports.number = number;
    function odd(value) {
      return value % 2 === 1;
    }
    __name(odd, "odd");
    exports.odd = odd;
    function string(value) {
      return typeof value === "string";
    }
    __name(string, "string");
    exports.string = string;
    function truthy(value) {
      return !!value;
    }
    __name(truthy, "truthy");
    exports.truthy = truthy;
    function undefinedTest(value) {
      return value === void 0;
    }
    __name(undefinedTest, "undefinedTest");
    exports.undefined = undefinedTest;
    function upper(value) {
      return value.toUpperCase() === value;
    }
    __name(upper, "upper");
    exports.upper = upper;
    function iterable(value) {
      if (typeof Symbol !== "undefined") {
        return !!value[Symbol.iterator];
      } else {
        return Array.isArray(value) || typeof value === "string";
      }
    }
    __name(iterable, "iterable");
    exports.iterable = iterable;
    function mapping(value) {
      var bool = value !== null && value !== void 0 && typeof value === "object" && !Array.isArray(value);
      if (Set) {
        return bool && !(value instanceof Set);
      } else {
        return bool;
      }
    }
    __name(mapping, "mapping");
    exports.mapping = mapping;
  }
});

// node_modules/nunjucks/src/globals.js
var require_globals = __commonJS({
  "node_modules/nunjucks/src/globals.js"(exports, module) {
    "use strict";
    function _cycler(items) {
      var index = -1;
      return {
        current: null,
        reset: /* @__PURE__ */ __name(function reset() {
          index = -1;
          this.current = null;
        }, "reset"),
        next: /* @__PURE__ */ __name(function next() {
          index++;
          if (index >= items.length) {
            index = 0;
          }
          this.current = items[index];
          return this.current;
        }, "next")
      };
    }
    __name(_cycler, "_cycler");
    function _joiner(sep) {
      sep = sep || ",";
      var first = true;
      return function() {
        var val = first ? "" : sep;
        first = false;
        return val;
      };
    }
    __name(_joiner, "_joiner");
    function globals() {
      return {
        range: /* @__PURE__ */ __name(function range(start, stop, step) {
          if (typeof stop === "undefined") {
            stop = start;
            start = 0;
            step = 1;
          } else if (!step) {
            step = 1;
          }
          var arr = [];
          if (step > 0) {
            for (var i = start; i < stop; i += step) {
              arr.push(i);
            }
          } else {
            for (var _i = start; _i > stop; _i += step) {
              arr.push(_i);
            }
          }
          return arr;
        }, "range"),
        cycler: /* @__PURE__ */ __name(function cycler() {
          return _cycler(Array.prototype.slice.call(arguments));
        }, "cycler"),
        joiner: /* @__PURE__ */ __name(function joiner(sep) {
          return _joiner(sep);
        }, "joiner")
      };
    }
    __name(globals, "globals");
    module.exports = globals;
  }
});

// node_modules/nunjucks/src/express-app.js
var require_express_app = __commonJS({
  "node_modules/nunjucks/src/express-app.js"(exports, module) {
    "use strict";
    var path = __require("path");
    module.exports = /* @__PURE__ */ __name(function express(env, app) {
      function NunjucksView(name, opts) {
        this.name = name;
        this.path = name;
        this.defaultEngine = opts.defaultEngine;
        this.ext = path.extname(name);
        if (!this.ext && !this.defaultEngine) {
          throw new Error("No default engine was specified and no extension was provided.");
        }
        if (!this.ext) {
          this.name += this.ext = (this.defaultEngine[0] !== "." ? "." : "") + this.defaultEngine;
        }
      }
      __name(NunjucksView, "NunjucksView");
      NunjucksView.prototype.render = /* @__PURE__ */ __name(function render(opts, cb) {
        env.render(this.name, opts, cb);
      }, "render");
      app.set("view", NunjucksView);
      app.set("nunjucksEnv", env);
      return env;
    }, "express");
  }
});

// node_modules/nunjucks/src/environment.js
var require_environment = __commonJS({
  "node_modules/nunjucks/src/environment.js"(exports, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    __name(_inheritsLoose, "_inheritsLoose");
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      }, "_setPrototypeOf");
      return _setPrototypeOf(o, p);
    }
    __name(_setPrototypeOf, "_setPrototypeOf");
    var asap = require_asap();
    var _waterfall = require_a_sync_waterfall();
    var lib = require_lib();
    var compiler = require_compiler();
    var filters = require_filters();
    var _require = require_loaders();
    var FileSystemLoader = _require.FileSystemLoader;
    var WebLoader = _require.WebLoader;
    var PrecompiledLoader = _require.PrecompiledLoader;
    var tests = require_tests();
    var globals = require_globals();
    var _require2 = require_object();
    var Obj = _require2.Obj;
    var EmitterObj = _require2.EmitterObj;
    var globalRuntime = require_runtime();
    var handleError = globalRuntime.handleError;
    var Frame = globalRuntime.Frame;
    var expressApp = require_express_app();
    function callbackAsap(cb, err, res) {
      asap(function() {
        cb(err, res);
      });
    }
    __name(callbackAsap, "callbackAsap");
    var noopTmplSrc = {
      type: "code",
      obj: {
        root: /* @__PURE__ */ __name(function root(env, context, frame, runtime, cb) {
          try {
            cb(null, "");
          } catch (e) {
            cb(handleError(e, null, null));
          }
        }, "root")
      }
    };
    var Environment = /* @__PURE__ */ (function(_EmitterObj) {
      _inheritsLoose(Environment2, _EmitterObj);
      function Environment2() {
        return _EmitterObj.apply(this, arguments) || this;
      }
      __name(Environment2, "Environment");
      var _proto = Environment2.prototype;
      _proto.init = /* @__PURE__ */ __name(function init(loaders, opts) {
        var _this = this;
        opts = this.opts = opts || {};
        this.opts.dev = !!opts.dev;
        this.opts.autoescape = opts.autoescape != null ? opts.autoescape : true;
        this.opts.throwOnUndefined = !!opts.throwOnUndefined;
        this.opts.trimBlocks = !!opts.trimBlocks;
        this.opts.lstripBlocks = !!opts.lstripBlocks;
        this.loaders = [];
        if (!loaders) {
          if (FileSystemLoader) {
            this.loaders = [new FileSystemLoader("views")];
          } else if (WebLoader) {
            this.loaders = [new WebLoader("/views")];
          }
        } else {
          this.loaders = lib.isArray(loaders) ? loaders : [loaders];
        }
        if (typeof window !== "undefined" && window.nunjucksPrecompiled) {
          this.loaders.unshift(new PrecompiledLoader(window.nunjucksPrecompiled));
        }
        this._initLoaders();
        this.globals = globals();
        this.filters = {};
        this.tests = {};
        this.asyncFilters = [];
        this.extensions = {};
        this.extensionsList = [];
        lib._entries(filters).forEach(function(_ref) {
          var name = _ref[0], filter = _ref[1];
          return _this.addFilter(name, filter);
        });
        lib._entries(tests).forEach(function(_ref2) {
          var name = _ref2[0], test = _ref2[1];
          return _this.addTest(name, test);
        });
      }, "init");
      _proto._initLoaders = /* @__PURE__ */ __name(function _initLoaders() {
        var _this2 = this;
        this.loaders.forEach(function(loader) {
          loader.cache = {};
          if (typeof loader.on === "function") {
            loader.on("update", function(name, fullname) {
              loader.cache[name] = null;
              _this2.emit("update", name, fullname, loader);
            });
            loader.on("load", function(name, source) {
              _this2.emit("load", name, source, loader);
            });
          }
        });
      }, "_initLoaders");
      _proto.invalidateCache = /* @__PURE__ */ __name(function invalidateCache() {
        this.loaders.forEach(function(loader) {
          loader.cache = {};
        });
      }, "invalidateCache");
      _proto.addExtension = /* @__PURE__ */ __name(function addExtension(name, extension) {
        extension.__name = name;
        this.extensions[name] = extension;
        this.extensionsList.push(extension);
        return this;
      }, "addExtension");
      _proto.removeExtension = /* @__PURE__ */ __name(function removeExtension(name) {
        var extension = this.getExtension(name);
        if (!extension) {
          return;
        }
        this.extensionsList = lib.without(this.extensionsList, extension);
        delete this.extensions[name];
      }, "removeExtension");
      _proto.getExtension = /* @__PURE__ */ __name(function getExtension(name) {
        return this.extensions[name];
      }, "getExtension");
      _proto.hasExtension = /* @__PURE__ */ __name(function hasExtension(name) {
        return !!this.extensions[name];
      }, "hasExtension");
      _proto.addGlobal = /* @__PURE__ */ __name(function addGlobal(name, value) {
        this.globals[name] = value;
        return this;
      }, "addGlobal");
      _proto.getGlobal = /* @__PURE__ */ __name(function getGlobal(name) {
        if (typeof this.globals[name] === "undefined") {
          throw new Error("global not found: " + name);
        }
        return this.globals[name];
      }, "getGlobal");
      _proto.addFilter = /* @__PURE__ */ __name(function addFilter(name, func, async) {
        var wrapped = func;
        if (async) {
          this.asyncFilters.push(name);
        }
        this.filters[name] = wrapped;
        return this;
      }, "addFilter");
      _proto.getFilter = /* @__PURE__ */ __name(function getFilter(name) {
        if (!this.filters[name]) {
          throw new Error("filter not found: " + name);
        }
        return this.filters[name];
      }, "getFilter");
      _proto.addTest = /* @__PURE__ */ __name(function addTest(name, func) {
        this.tests[name] = func;
        return this;
      }, "addTest");
      _proto.getTest = /* @__PURE__ */ __name(function getTest(name) {
        if (!this.tests[name]) {
          throw new Error("test not found: " + name);
        }
        return this.tests[name];
      }, "getTest");
      _proto.resolveTemplate = /* @__PURE__ */ __name(function resolveTemplate(loader, parentName, filename) {
        var isRelative = loader.isRelative && parentName ? loader.isRelative(filename) : false;
        return isRelative && loader.resolve ? loader.resolve(parentName, filename) : filename;
      }, "resolveTemplate");
      _proto.getTemplate = /* @__PURE__ */ __name(function getTemplate(name, eagerCompile, parentName, ignoreMissing, cb) {
        var _this3 = this;
        var that = this;
        var tmpl = null;
        if (name && name.raw) {
          name = name.raw;
        }
        if (lib.isFunction(parentName)) {
          cb = parentName;
          parentName = null;
          eagerCompile = eagerCompile || false;
        }
        if (lib.isFunction(eagerCompile)) {
          cb = eagerCompile;
          eagerCompile = false;
        }
        if (name instanceof Template) {
          tmpl = name;
        } else if (typeof name !== "string") {
          throw new Error("template names must be a string: " + name);
        } else {
          for (var i = 0; i < this.loaders.length; i++) {
            var loader = this.loaders[i];
            tmpl = loader.cache[this.resolveTemplate(loader, parentName, name)];
            if (tmpl) {
              break;
            }
          }
        }
        if (tmpl) {
          if (eagerCompile) {
            tmpl.compile();
          }
          if (cb) {
            cb(null, tmpl);
            return void 0;
          } else {
            return tmpl;
          }
        }
        var syncResult;
        var createTemplate = /* @__PURE__ */ __name(function createTemplate2(err, info) {
          if (!info && !err && !ignoreMissing) {
            err = new Error("template not found: " + name);
          }
          if (err) {
            if (cb) {
              cb(err);
              return;
            } else {
              throw err;
            }
          }
          var newTmpl;
          if (!info) {
            newTmpl = new Template(noopTmplSrc, _this3, "", eagerCompile);
          } else {
            newTmpl = new Template(info.src, _this3, info.path, eagerCompile);
            if (!info.noCache) {
              info.loader.cache[name] = newTmpl;
            }
          }
          if (cb) {
            cb(null, newTmpl);
          } else {
            syncResult = newTmpl;
          }
        }, "createTemplate");
        lib.asyncIter(this.loaders, function(loader2, i2, next, done) {
          function handle(err, src) {
            if (err) {
              done(err);
            } else if (src) {
              src.loader = loader2;
              done(null, src);
            } else {
              next();
            }
          }
          __name(handle, "handle");
          name = that.resolveTemplate(loader2, parentName, name);
          if (loader2.async) {
            loader2.getSource(name, handle);
          } else {
            handle(null, loader2.getSource(name));
          }
        }, createTemplate);
        return syncResult;
      }, "getTemplate");
      _proto.express = /* @__PURE__ */ __name(function express(app) {
        return expressApp(this, app);
      }, "express");
      _proto.render = /* @__PURE__ */ __name(function render(name, ctx, cb) {
        if (lib.isFunction(ctx)) {
          cb = ctx;
          ctx = null;
        }
        var syncResult = null;
        this.getTemplate(name, function(err, tmpl) {
          if (err && cb) {
            callbackAsap(cb, err);
          } else if (err) {
            throw err;
          } else {
            syncResult = tmpl.render(ctx, cb);
          }
        });
        return syncResult;
      }, "render");
      _proto.renderString = /* @__PURE__ */ __name(function renderString(src, ctx, opts, cb) {
        if (lib.isFunction(opts)) {
          cb = opts;
          opts = {};
        }
        opts = opts || {};
        var tmpl = new Template(src, this, opts.path);
        return tmpl.render(ctx, cb);
      }, "renderString");
      _proto.waterfall = /* @__PURE__ */ __name(function waterfall(tasks, callback, forceAsync) {
        return _waterfall(tasks, callback, forceAsync);
      }, "waterfall");
      return Environment2;
    })(EmitterObj);
    var Context = /* @__PURE__ */ (function(_Obj) {
      _inheritsLoose(Context2, _Obj);
      function Context2() {
        return _Obj.apply(this, arguments) || this;
      }
      __name(Context2, "Context");
      var _proto2 = Context2.prototype;
      _proto2.init = /* @__PURE__ */ __name(function init(ctx, blocks, env) {
        var _this4 = this;
        this.env = env || new Environment();
        this.ctx = lib.extend({}, ctx);
        this.blocks = {};
        this.exported = [];
        lib.keys(blocks).forEach(function(name) {
          _this4.addBlock(name, blocks[name]);
        });
      }, "init");
      _proto2.lookup = /* @__PURE__ */ __name(function lookup(name) {
        if (name in this.env.globals && !(name in this.ctx)) {
          return this.env.globals[name];
        } else {
          return this.ctx[name];
        }
      }, "lookup");
      _proto2.setVariable = /* @__PURE__ */ __name(function setVariable(name, val) {
        this.ctx[name] = val;
      }, "setVariable");
      _proto2.getVariables = /* @__PURE__ */ __name(function getVariables() {
        return this.ctx;
      }, "getVariables");
      _proto2.addBlock = /* @__PURE__ */ __name(function addBlock(name, block) {
        this.blocks[name] = this.blocks[name] || [];
        this.blocks[name].push(block);
        return this;
      }, "addBlock");
      _proto2.getBlock = /* @__PURE__ */ __name(function getBlock(name) {
        if (!this.blocks[name]) {
          throw new Error('unknown block "' + name + '"');
        }
        return this.blocks[name][0];
      }, "getBlock");
      _proto2.getSuper = /* @__PURE__ */ __name(function getSuper(env, name, block, frame, runtime, cb) {
        var idx = lib.indexOf(this.blocks[name] || [], block);
        var blk = this.blocks[name][idx + 1];
        var context = this;
        if (idx === -1 || !blk) {
          throw new Error('no super block available for "' + name + '"');
        }
        blk(env, context, frame, runtime, cb);
      }, "getSuper");
      _proto2.addExport = /* @__PURE__ */ __name(function addExport(name) {
        this.exported.push(name);
      }, "addExport");
      _proto2.getExported = /* @__PURE__ */ __name(function getExported() {
        var _this5 = this;
        var exported = {};
        this.exported.forEach(function(name) {
          exported[name] = _this5.ctx[name];
        });
        return exported;
      }, "getExported");
      return Context2;
    })(Obj);
    var Template = /* @__PURE__ */ (function(_Obj2) {
      _inheritsLoose(Template2, _Obj2);
      function Template2() {
        return _Obj2.apply(this, arguments) || this;
      }
      __name(Template2, "Template");
      var _proto3 = Template2.prototype;
      _proto3.init = /* @__PURE__ */ __name(function init(src, env, path, eagerCompile) {
        this.env = env || new Environment();
        if (lib.isObject(src)) {
          switch (src.type) {
            case "code":
              this.tmplProps = src.obj;
              break;
            case "string":
              this.tmplStr = src.obj;
              break;
            default:
              throw new Error("Unexpected template object type " + src.type + "; expected 'code', or 'string'");
          }
        } else if (lib.isString(src)) {
          this.tmplStr = src;
        } else {
          throw new Error("src must be a string or an object describing the source");
        }
        this.path = path;
        if (eagerCompile) {
          try {
            this._compile();
          } catch (err) {
            throw lib._prettifyError(this.path, this.env.opts.dev, err);
          }
        } else {
          this.compiled = false;
        }
      }, "init");
      _proto3.render = /* @__PURE__ */ __name(function render(ctx, parentFrame, cb) {
        var _this6 = this;
        if (typeof ctx === "function") {
          cb = ctx;
          ctx = {};
        } else if (typeof parentFrame === "function") {
          cb = parentFrame;
          parentFrame = null;
        }
        var forceAsync = !parentFrame;
        try {
          this.compile();
        } catch (e) {
          var err = lib._prettifyError(this.path, this.env.opts.dev, e);
          if (cb) {
            return callbackAsap(cb, err);
          } else {
            throw err;
          }
        }
        var context = new Context(ctx || {}, this.blocks, this.env);
        var frame = parentFrame ? parentFrame.push(true) : new Frame();
        frame.topLevel = true;
        var syncResult = null;
        var didError = false;
        this.rootRenderFunc(this.env, context, frame, globalRuntime, function(err2, res) {
          if (didError && cb && typeof res !== "undefined") {
            return;
          }
          if (err2) {
            err2 = lib._prettifyError(_this6.path, _this6.env.opts.dev, err2);
            didError = true;
          }
          if (cb) {
            if (forceAsync) {
              callbackAsap(cb, err2, res);
            } else {
              cb(err2, res);
            }
          } else {
            if (err2) {
              throw err2;
            }
            syncResult = res;
          }
        });
        return syncResult;
      }, "render");
      _proto3.getExported = /* @__PURE__ */ __name(function getExported(ctx, parentFrame, cb) {
        if (typeof ctx === "function") {
          cb = ctx;
          ctx = {};
        }
        if (typeof parentFrame === "function") {
          cb = parentFrame;
          parentFrame = null;
        }
        try {
          this.compile();
        } catch (e) {
          if (cb) {
            return cb(e);
          } else {
            throw e;
          }
        }
        var frame = parentFrame ? parentFrame.push() : new Frame();
        frame.topLevel = true;
        var context = new Context(ctx || {}, this.blocks, this.env);
        this.rootRenderFunc(this.env, context, frame, globalRuntime, function(err) {
          if (err) {
            cb(err, null);
          } else {
            cb(null, context.getExported());
          }
        });
      }, "getExported");
      _proto3.compile = /* @__PURE__ */ __name(function compile() {
        if (!this.compiled) {
          this._compile();
        }
      }, "compile");
      _proto3._compile = /* @__PURE__ */ __name(function _compile() {
        var props;
        if (this.tmplProps) {
          props = this.tmplProps;
        } else {
          var source = compiler.compile(this.tmplStr, this.env.asyncFilters, this.env.extensionsList, this.path, this.env.opts);
          var func = new Function(source);
          props = func();
        }
        this.blocks = this._getBlocks(props);
        this.rootRenderFunc = props.root;
        this.compiled = true;
      }, "_compile");
      _proto3._getBlocks = /* @__PURE__ */ __name(function _getBlocks(props) {
        var blocks = {};
        lib.keys(props).forEach(function(k) {
          if (k.slice(0, 2) === "b_") {
            blocks[k.slice(2)] = props[k];
          }
        });
        return blocks;
      }, "_getBlocks");
      return Template2;
    })(Obj);
    module.exports = {
      Environment,
      Template
    };
  }
});

// node_modules/nunjucks/src/precompile-global.js
var require_precompile_global = __commonJS({
  "node_modules/nunjucks/src/precompile-global.js"(exports, module) {
    "use strict";
    function precompileGlobal(templates, opts) {
      var out = "";
      opts = opts || {};
      for (var i = 0; i < templates.length; i++) {
        var name = JSON.stringify(templates[i].name);
        var template = templates[i].template;
        out += "(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})[" + name + "] = (function() {\n" + template + "\n})();\n";
        if (opts.asFunction) {
          out += "return function(ctx, cb) { return nunjucks.render(" + name + ", ctx, cb); }\n";
        }
        out += "})();\n";
      }
      return out;
    }
    __name(precompileGlobal, "precompileGlobal");
    module.exports = precompileGlobal;
  }
});

// node_modules/nunjucks/src/precompile.js
var require_precompile = __commonJS({
  "node_modules/nunjucks/src/precompile.js"(exports, module) {
    "use strict";
    var fs = __require("fs");
    var path = __require("path");
    var _require = require_lib();
    var _prettifyError = _require._prettifyError;
    var compiler = require_compiler();
    var _require2 = require_environment();
    var Environment = _require2.Environment;
    var precompileGlobal = require_precompile_global();
    function match(filename, patterns) {
      if (!Array.isArray(patterns)) {
        return false;
      }
      return patterns.some(function(pattern) {
        return filename.match(pattern);
      });
    }
    __name(match, "match");
    function precompileString(str, opts) {
      opts = opts || {};
      opts.isString = true;
      var env = opts.env || new Environment([]);
      var wrapper = opts.wrapper || precompileGlobal;
      if (!opts.name) {
        throw new Error('the "name" option is required when compiling a string');
      }
      return wrapper([_precompile(str, opts.name, env)], opts);
    }
    __name(precompileString, "precompileString");
    function precompile(input, opts) {
      opts = opts || {};
      var env = opts.env || new Environment([]);
      var wrapper = opts.wrapper || precompileGlobal;
      if (opts.isString) {
        return precompileString(input, opts);
      }
      var pathStats = fs.existsSync(input) && fs.statSync(input);
      var precompiled = [];
      var templates = [];
      function addTemplates(dir) {
        fs.readdirSync(dir).forEach(function(file) {
          var filepath = path.join(dir, file);
          var subpath = filepath.substr(path.join(input, "/").length);
          var stat = fs.statSync(filepath);
          if (stat && stat.isDirectory()) {
            subpath += "/";
            if (!match(subpath, opts.exclude)) {
              addTemplates(filepath);
            }
          } else if (match(subpath, opts.include)) {
            templates.push(filepath);
          }
        });
      }
      __name(addTemplates, "addTemplates");
      if (pathStats.isFile()) {
        precompiled.push(_precompile(fs.readFileSync(input, "utf-8"), opts.name || input, env));
      } else if (pathStats.isDirectory()) {
        addTemplates(input);
        for (var i = 0; i < templates.length; i++) {
          var name = templates[i].replace(path.join(input, "/"), "");
          try {
            precompiled.push(_precompile(fs.readFileSync(templates[i], "utf-8"), name, env));
          } catch (e) {
            if (opts.force) {
              console.error(e);
            } else {
              throw e;
            }
          }
        }
      }
      return wrapper(precompiled, opts);
    }
    __name(precompile, "precompile");
    function _precompile(str, name, env) {
      env = env || new Environment([]);
      var asyncFilters = env.asyncFilters;
      var extensions = env.extensionsList;
      var template;
      name = name.replace(/\\/g, "/");
      try {
        template = compiler.compile(str, asyncFilters, extensions, name, env.opts);
      } catch (err) {
        throw _prettifyError(name, false, err);
      }
      return {
        name,
        template
      };
    }
    __name(_precompile, "_precompile");
    module.exports = {
      precompile,
      precompileString
    };
  }
});

// node_modules/nunjucks/src/jinja-compat.js
var require_jinja_compat = __commonJS({
  "node_modules/nunjucks/src/jinja-compat.js"(exports, module) {
    "use strict";
    function installCompat() {
      "use strict";
      var runtime = this.runtime;
      var lib = this.lib;
      var Compiler = this.compiler.Compiler;
      var Parser = this.parser.Parser;
      var nodes = this.nodes;
      var lexer = this.lexer;
      var orig_contextOrFrameLookup = runtime.contextOrFrameLookup;
      var orig_memberLookup = runtime.memberLookup;
      var orig_Compiler_assertType;
      var orig_Parser_parseAggregate;
      if (Compiler) {
        orig_Compiler_assertType = Compiler.prototype.assertType;
      }
      if (Parser) {
        orig_Parser_parseAggregate = Parser.prototype.parseAggregate;
      }
      function uninstall() {
        runtime.contextOrFrameLookup = orig_contextOrFrameLookup;
        runtime.memberLookup = orig_memberLookup;
        if (Compiler) {
          Compiler.prototype.assertType = orig_Compiler_assertType;
        }
        if (Parser) {
          Parser.prototype.parseAggregate = orig_Parser_parseAggregate;
        }
      }
      __name(uninstall, "uninstall");
      runtime.contextOrFrameLookup = /* @__PURE__ */ __name(function contextOrFrameLookup(context, frame, key) {
        var val = orig_contextOrFrameLookup.apply(this, arguments);
        if (val !== void 0) {
          return val;
        }
        switch (key) {
          case "True":
            return true;
          case "False":
            return false;
          case "None":
            return null;
          default:
            return void 0;
        }
      }, "contextOrFrameLookup");
      function getTokensState(tokens) {
        return {
          index: tokens.index,
          lineno: tokens.lineno,
          colno: tokens.colno
        };
      }
      __name(getTokensState, "getTokensState");
      if (process.env.BUILD_TYPE !== "SLIM" && nodes && Compiler && Parser) {
        var Slice = nodes.Node.extend("Slice", {
          fields: ["start", "stop", "step"],
          init: /* @__PURE__ */ __name(function init(lineno, colno, start, stop, step) {
            start = start || new nodes.Literal(lineno, colno, null);
            stop = stop || new nodes.Literal(lineno, colno, null);
            step = step || new nodes.Literal(lineno, colno, 1);
            this.parent(lineno, colno, start, stop, step);
          }, "init")
        });
        Compiler.prototype.assertType = /* @__PURE__ */ __name(function assertType(node) {
          if (node instanceof Slice) {
            return;
          }
          orig_Compiler_assertType.apply(this, arguments);
        }, "assertType");
        Compiler.prototype.compileSlice = /* @__PURE__ */ __name(function compileSlice(node, frame) {
          this._emit("(");
          this._compileExpression(node.start, frame);
          this._emit("),(");
          this._compileExpression(node.stop, frame);
          this._emit("),(");
          this._compileExpression(node.step, frame);
          this._emit(")");
        }, "compileSlice");
        Parser.prototype.parseAggregate = /* @__PURE__ */ __name(function parseAggregate() {
          var _this = this;
          var origState = getTokensState(this.tokens);
          origState.colno--;
          origState.index--;
          try {
            return orig_Parser_parseAggregate.apply(this);
          } catch (e) {
            var errState = getTokensState(this.tokens);
            var rethrow = /* @__PURE__ */ __name(function rethrow2() {
              lib._assign(_this.tokens, errState);
              return e;
            }, "rethrow");
            lib._assign(this.tokens, origState);
            this.peeked = false;
            var tok = this.peekToken();
            if (tok.type !== lexer.TOKEN_LEFT_BRACKET) {
              throw rethrow();
            } else {
              this.nextToken();
            }
            var node = new Slice(tok.lineno, tok.colno);
            var isSlice = false;
            for (var i = 0; i <= node.fields.length; i++) {
              if (this.skip(lexer.TOKEN_RIGHT_BRACKET)) {
                break;
              }
              if (i === node.fields.length) {
                if (isSlice) {
                  this.fail("parseSlice: too many slice components", tok.lineno, tok.colno);
                } else {
                  break;
                }
              }
              if (this.skip(lexer.TOKEN_COLON)) {
                isSlice = true;
              } else {
                var field = node.fields[i];
                node[field] = this.parseExpression();
                isSlice = this.skip(lexer.TOKEN_COLON) || isSlice;
              }
            }
            if (!isSlice) {
              throw rethrow();
            }
            return new nodes.Array(tok.lineno, tok.colno, [node]);
          }
        }, "parseAggregate");
      }
      function sliceLookup(obj, start, stop, step) {
        obj = obj || [];
        if (start === null) {
          start = step < 0 ? obj.length - 1 : 0;
        }
        if (stop === null) {
          stop = step < 0 ? -1 : obj.length;
        } else if (stop < 0) {
          stop += obj.length;
        }
        if (start < 0) {
          start += obj.length;
        }
        var results = [];
        for (var i = start; ; i += step) {
          if (i < 0 || i > obj.length) {
            break;
          }
          if (step > 0 && i >= stop) {
            break;
          }
          if (step < 0 && i <= stop) {
            break;
          }
          results.push(runtime.memberLookup(obj, i));
        }
        return results;
      }
      __name(sliceLookup, "sliceLookup");
      function hasOwnProp(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
      }
      __name(hasOwnProp, "hasOwnProp");
      var ARRAY_MEMBERS = {
        pop: /* @__PURE__ */ __name(function pop(index) {
          if (index === void 0) {
            return this.pop();
          }
          if (index >= this.length || index < 0) {
            throw new Error("KeyError");
          }
          return this.splice(index, 1);
        }, "pop"),
        append: /* @__PURE__ */ __name(function append(element) {
          return this.push(element);
        }, "append"),
        remove: /* @__PURE__ */ __name(function remove(element) {
          for (var i = 0; i < this.length; i++) {
            if (this[i] === element) {
              return this.splice(i, 1);
            }
          }
          throw new Error("ValueError");
        }, "remove"),
        count: /* @__PURE__ */ __name(function count(element) {
          var count2 = 0;
          for (var i = 0; i < this.length; i++) {
            if (this[i] === element) {
              count2++;
            }
          }
          return count2;
        }, "count"),
        index: /* @__PURE__ */ __name(function index(element) {
          var i;
          if ((i = this.indexOf(element)) === -1) {
            throw new Error("ValueError");
          }
          return i;
        }, "index"),
        find: /* @__PURE__ */ __name(function find(element) {
          return this.indexOf(element);
        }, "find"),
        insert: /* @__PURE__ */ __name(function insert(index, elem) {
          return this.splice(index, 0, elem);
        }, "insert")
      };
      var OBJECT_MEMBERS = {
        items: /* @__PURE__ */ __name(function items() {
          return lib._entries(this);
        }, "items"),
        values: /* @__PURE__ */ __name(function values() {
          return lib._values(this);
        }, "values"),
        keys: /* @__PURE__ */ __name(function keys() {
          return lib.keys(this);
        }, "keys"),
        get: /* @__PURE__ */ __name(function get(key, def) {
          var output = this[key];
          if (output === void 0) {
            output = def;
          }
          return output;
        }, "get"),
        has_key: /* @__PURE__ */ __name(function has_key(key) {
          return hasOwnProp(this, key);
        }, "has_key"),
        pop: /* @__PURE__ */ __name(function pop(key, def) {
          var output = this[key];
          if (output === void 0 && def !== void 0) {
            output = def;
          } else if (output === void 0) {
            throw new Error("KeyError");
          } else {
            delete this[key];
          }
          return output;
        }, "pop"),
        popitem: /* @__PURE__ */ __name(function popitem() {
          var keys = lib.keys(this);
          if (!keys.length) {
            throw new Error("KeyError");
          }
          var k = keys[0];
          var val = this[k];
          delete this[k];
          return [k, val];
        }, "popitem"),
        setdefault: /* @__PURE__ */ __name(function setdefault(key, def) {
          if (def === void 0) {
            def = null;
          }
          if (!(key in this)) {
            this[key] = def;
          }
          return this[key];
        }, "setdefault"),
        update: /* @__PURE__ */ __name(function update(kwargs) {
          lib._assign(this, kwargs);
          return null;
        }, "update")
      };
      OBJECT_MEMBERS.iteritems = OBJECT_MEMBERS.items;
      OBJECT_MEMBERS.itervalues = OBJECT_MEMBERS.values;
      OBJECT_MEMBERS.iterkeys = OBJECT_MEMBERS.keys;
      runtime.memberLookup = /* @__PURE__ */ __name(function memberLookup(obj, val, autoescape) {
        if (arguments.length === 4) {
          return sliceLookup.apply(this, arguments);
        }
        obj = obj || {};
        if (lib.isArray(obj) && hasOwnProp(ARRAY_MEMBERS, val)) {
          return ARRAY_MEMBERS[val].bind(obj);
        }
        if (lib.isObject(obj) && hasOwnProp(OBJECT_MEMBERS, val)) {
          return OBJECT_MEMBERS[val].bind(obj);
        }
        return orig_memberLookup.apply(this, arguments);
      }, "memberLookup");
      return uninstall;
    }
    __name(installCompat, "installCompat");
    module.exports = installCompat;
  }
});

// node_modules/nunjucks/index.js
var require_nunjucks = __commonJS({
  "node_modules/nunjucks/index.js"(exports, module) {
    var lib = require_lib();
    var _require = require_environment();
    var Environment = _require.Environment;
    var Template = _require.Template;
    var Loader = require_loader();
    var loaders = require_loaders();
    var precompile = require_precompile();
    var compiler = require_compiler();
    var parser = require_parser();
    var lexer = require_lexer();
    var runtime = require_runtime();
    var nodes = require_nodes();
    var installJinjaCompat = require_jinja_compat();
    var e;
    function configure(templatesPath, opts) {
      opts = opts || {};
      if (lib.isObject(templatesPath)) {
        opts = templatesPath;
        templatesPath = null;
      }
      var TemplateLoader;
      if (loaders.FileSystemLoader) {
        TemplateLoader = new loaders.FileSystemLoader(templatesPath, {
          watch: opts.watch,
          noCache: opts.noCache
        });
      } else if (loaders.WebLoader) {
        TemplateLoader = new loaders.WebLoader(templatesPath, {
          useCache: opts.web && opts.web.useCache,
          async: opts.web && opts.web.async
        });
      }
      e = new Environment(TemplateLoader, opts);
      if (opts && opts.express) {
        e.express(opts.express);
      }
      return e;
    }
    __name(configure, "configure");
    module.exports = {
      Environment,
      Template,
      Loader,
      FileSystemLoader: loaders.FileSystemLoader,
      NodeResolveLoader: loaders.NodeResolveLoader,
      PrecompiledLoader: loaders.PrecompiledLoader,
      WebLoader: loaders.WebLoader,
      compiler,
      parser,
      lexer,
      runtime,
      lib,
      nodes,
      installJinjaCompat,
      configure,
      reset: /* @__PURE__ */ __name(function reset() {
        e = void 0;
      }, "reset"),
      compile: /* @__PURE__ */ __name(function compile(src, env, path, eagerCompile) {
        if (!e) {
          configure();
        }
        return new Template(src, env, path, eagerCompile);
      }, "compile"),
      render: /* @__PURE__ */ __name(function render(name, ctx, cb) {
        if (!e) {
          configure();
        }
        return e.render(name, ctx, cb);
      }, "render"),
      renderString: /* @__PURE__ */ __name(function renderString(src, ctx, cb) {
        if (!e) {
          configure();
        }
        return e.renderString(src, ctx, cb);
      }, "renderString"),
      precompile: precompile ? precompile.precompile : void 0,
      precompileString: precompile ? precompile.precompileString : void 0
    };
  }
});

export {
  require_nunjucks
};
