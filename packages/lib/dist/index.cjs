var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// ../../node_modules/csv-parse/lib/browser/index.js
var require_browser = __commonJS({
  "../../node_modules/csv-parse/lib/browser/index.js"(exports, module2) {
    (function(f) {
      if (typeof exports === "object" && typeof module2 !== "undefined") {
        module2.exports = f();
      } else if (typeof define === "function" && define.amd) {
        define([], f);
      } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          g = this;
        }
        g.parse = f();
      }
    })(function() {
      var define2, module3, exports2;
      return function() {
        function r(e, n, t) {
          function o(i2, f) {
            if (!n[i2]) {
              if (!e[i2]) {
                var c = typeof require == "function" && require;
                if (!f && c)
                  return c(i2, true);
                if (u)
                  return u(i2, true);
                var a = new Error("Cannot find module '" + i2 + "'");
                throw a.code = "MODULE_NOT_FOUND", a;
              }
              var p = n[i2] = { exports: {} };
              e[i2][0].call(p.exports, function(r2) {
                var n2 = e[i2][1][r2];
                return o(n2 || r2);
              }, p, p.exports, r, e, n, t);
            }
            return n[i2].exports;
          }
          for (var u = typeof require == "function" && require, i = 0; i < t.length; i++)
            o(t[i]);
          return o;
        }
        return r;
      }()({ 1: [function(require2, module4, exports3) {
        (function(Buffer2) {
          (function() {
            "use strict";
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            function _defineProperties(target, props) {
              for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor)
                  descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
              }
            }
            function _createClass(Constructor, protoProps, staticProps) {
              if (protoProps)
                _defineProperties(Constructor.prototype, protoProps);
              if (staticProps)
                _defineProperties(Constructor, staticProps);
              return Constructor;
            }
            var ResizeableBuffer = /* @__PURE__ */ function() {
              function ResizeableBuffer2() {
                var size = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
                _classCallCheck(this, ResizeableBuffer2);
                this.size = size;
                this.length = 0;
                this.buf = Buffer2.alloc(size);
              }
              _createClass(ResizeableBuffer2, [{
                key: "prepend",
                value: function prepend(val) {
                  if (Buffer2.isBuffer(val)) {
                    var length = this.length + val.length;
                    if (length >= this.size) {
                      this.resize();
                      if (length >= this.size) {
                        throw Error("INVALID_BUFFER_STATE");
                      }
                    }
                    var buf = this.buf;
                    this.buf = Buffer2.alloc(this.size);
                    val.copy(this.buf, 0);
                    buf.copy(this.buf, val.length);
                    this.length += val.length;
                  } else {
                    var _length = this.length++;
                    if (_length === this.size) {
                      this.resize();
                    }
                    var _buf = this.clone();
                    this.buf[0] = val;
                    _buf.copy(this.buf, 1, 0, _length);
                  }
                }
              }, {
                key: "append",
                value: function append(val) {
                  var length = this.length++;
                  if (length === this.size) {
                    this.resize();
                  }
                  this.buf[length] = val;
                }
              }, {
                key: "clone",
                value: function clone() {
                  return Buffer2.from(this.buf.slice(0, this.length));
                }
              }, {
                key: "resize",
                value: function resize() {
                  var length = this.length;
                  this.size = this.size * 2;
                  var buf = Buffer2.alloc(this.size);
                  this.buf.copy(buf, 0, 0, length);
                  this.buf = buf;
                }
              }, {
                key: "toString",
                value: function toString(encoding) {
                  if (encoding) {
                    return this.buf.slice(0, this.length).toString(encoding);
                  } else {
                    return Uint8Array.prototype.slice.call(this.buf.slice(0, this.length));
                  }
                }
              }, {
                key: "toJSON",
                value: function toJSON() {
                  return this.toString("utf8");
                }
              }, {
                key: "reset",
                value: function reset() {
                  this.length = 0;
                }
              }]);
              return ResizeableBuffer2;
            }();
            module4.exports = ResizeableBuffer;
          }).call(this);
        }).call(this, require2("buffer").Buffer);
      }, { "buffer": 5 }], 2: [function(require2, module4, exports3) {
        (function(Buffer2, setImmediate) {
          (function() {
            "use strict";
            function _wrapNativeSuper(Class) {
              var _cache = typeof Map === "function" ? new Map() : void 0;
              _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
                if (Class2 === null || !_isNativeFunction(Class2))
                  return Class2;
                if (typeof Class2 !== "function") {
                  throw new TypeError("Super expression must either be null or a function");
                }
                if (typeof _cache !== "undefined") {
                  if (_cache.has(Class2))
                    return _cache.get(Class2);
                  _cache.set(Class2, Wrapper);
                }
                function Wrapper() {
                  return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
                }
                Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
                return _setPrototypeOf(Wrapper, Class2);
              };
              return _wrapNativeSuper(Class);
            }
            function _construct(Parent, args, Class) {
              if (_isNativeReflectConstruct()) {
                _construct = Reflect.construct;
              } else {
                _construct = function _construct2(Parent2, args2, Class2) {
                  var a = [null];
                  a.push.apply(a, args2);
                  var Constructor = Function.bind.apply(Parent2, a);
                  var instance = new Constructor();
                  if (Class2)
                    _setPrototypeOf(instance, Class2.prototype);
                  return instance;
                };
              }
              return _construct.apply(null, arguments);
            }
            function _isNativeFunction(fn) {
              return Function.toString.call(fn).indexOf("[native code]") !== -1;
            }
            function _typeof(obj) {
              "@babel/helpers - typeof";
              if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                _typeof = function _typeof2(obj2) {
                  return typeof obj2;
                };
              } else {
                _typeof = function _typeof2(obj2) {
                  return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                };
              }
              return _typeof(obj);
            }
            function _slicedToArray(arr, i) {
              return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
            }
            function _nonIterableRest() {
              throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function _iterableToArrayLimit(arr, i) {
              var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
              if (_i == null)
                return;
              var _arr = [];
              var _n = true;
              var _d = false;
              var _s, _e;
              try {
                for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
                  _arr.push(_s.value);
                  if (i && _arr.length === i)
                    break;
                }
              } catch (err) {
                _d = true;
                _e = err;
              } finally {
                try {
                  if (!_n && _i["return"] != null)
                    _i["return"]();
                } finally {
                  if (_d)
                    throw _e;
                }
              }
              return _arr;
            }
            function _arrayWithHoles(arr) {
              if (Array.isArray(arr))
                return arr;
            }
            function _toConsumableArray(arr) {
              return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
            }
            function _nonIterableSpread() {
              throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function _unsupportedIterableToArray(o, minLen) {
              if (!o)
                return;
              if (typeof o === "string")
                return _arrayLikeToArray(o, minLen);
              var n = Object.prototype.toString.call(o).slice(8, -1);
              if (n === "Object" && o.constructor)
                n = o.constructor.name;
              if (n === "Map" || n === "Set")
                return Array.from(o);
              if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                return _arrayLikeToArray(o, minLen);
            }
            function _iterableToArray(iter) {
              if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
                return Array.from(iter);
            }
            function _arrayWithoutHoles(arr) {
              if (Array.isArray(arr))
                return _arrayLikeToArray(arr);
            }
            function _arrayLikeToArray(arr, len) {
              if (len == null || len > arr.length)
                len = arr.length;
              for (var i = 0, arr2 = new Array(len); i < len; i++) {
                arr2[i] = arr[i];
              }
              return arr2;
            }
            function ownKeys(object, enumerableOnly) {
              var keys = Object.keys(object);
              if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(object);
                if (enumerableOnly) {
                  symbols = symbols.filter(function(sym) {
                    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                  });
                }
                keys.push.apply(keys, symbols);
              }
              return keys;
            }
            function _objectSpread(target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i] != null ? arguments[i] : {};
                if (i % 2) {
                  ownKeys(Object(source), true).forEach(function(key) {
                    _defineProperty(target, key, source[key]);
                  });
                } else if (Object.getOwnPropertyDescriptors) {
                  Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
                } else {
                  ownKeys(Object(source)).forEach(function(key) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                  });
                }
              }
              return target;
            }
            function _defineProperty(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }
              return obj;
            }
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            function _defineProperties(target, props) {
              for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor)
                  descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
              }
            }
            function _createClass(Constructor, protoProps, staticProps) {
              if (protoProps)
                _defineProperties(Constructor.prototype, protoProps);
              if (staticProps)
                _defineProperties(Constructor, staticProps);
              return Constructor;
            }
            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function");
              }
              subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
              if (superClass)
                _setPrototypeOf(subClass, superClass);
            }
            function _setPrototypeOf(o, p) {
              _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
                o2.__proto__ = p2;
                return o2;
              };
              return _setPrototypeOf(o, p);
            }
            function _createSuper(Derived) {
              var hasNativeReflectConstruct = _isNativeReflectConstruct();
              return function _createSuperInternal() {
                var Super = _getPrototypeOf(Derived), result;
                if (hasNativeReflectConstruct) {
                  var NewTarget = _getPrototypeOf(this).constructor;
                  result = Reflect.construct(Super, arguments, NewTarget);
                } else {
                  result = Super.apply(this, arguments);
                }
                return _possibleConstructorReturn(this, result);
              };
            }
            function _possibleConstructorReturn(self2, call) {
              if (call && (_typeof(call) === "object" || typeof call === "function")) {
                return call;
              }
              return _assertThisInitialized(self2);
            }
            function _assertThisInitialized(self2) {
              if (self2 === void 0) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }
              return self2;
            }
            function _isNativeReflectConstruct() {
              if (typeof Reflect === "undefined" || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if (typeof Proxy === "function")
                return true;
              try {
                Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                }));
                return true;
              } catch (e) {
                return false;
              }
            }
            function _getPrototypeOf(o) {
              _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
                return o2.__proto__ || Object.getPrototypeOf(o2);
              };
              return _getPrototypeOf(o);
            }
            var _require = require2("stream"), Transform = _require.Transform;
            var ResizeableBuffer = require2("./ResizeableBuffer");
            var tab = 9;
            var nl = 10;
            var np = 12;
            var cr = 13;
            var space = 32;
            var boms = {
              "utf8": Buffer2.from([239, 187, 191]),
              "utf16le": Buffer2.from([255, 254])
            };
            var Parser3 = /* @__PURE__ */ function(_Transform) {
              _inherits(Parser4, _Transform);
              var _super = _createSuper(Parser4);
              function Parser4() {
                var _this;
                var opts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                _classCallCheck(this, Parser4);
                _this = _super.call(this, _objectSpread(_objectSpread(_objectSpread({}, {
                  readableObjectMode: true
                }), opts), {}, {
                  encoding: null
                }));
                _this.__originalOptions = opts;
                _this.__normalizeOptions(opts);
                return _this;
              }
              _createClass(Parser4, [{
                key: "__normalizeOptions",
                value: function __normalizeOptions(opts) {
                  var options = {};
                  for (var opt in opts) {
                    options[underscore(opt)] = opts[opt];
                  }
                  if (options.encoding === void 0 || options.encoding === true) {
                    options.encoding = "utf8";
                  } else if (options.encoding === null || options.encoding === false) {
                    options.encoding = null;
                  } else if (typeof options.encoding !== "string" && options.encoding !== null) {
                    throw new CsvError("CSV_INVALID_OPTION_ENCODING", ["Invalid option encoding:", "encoding must be a string or null to return a buffer,", "got ".concat(JSON.stringify(options.encoding))], options);
                  }
                  if (options.bom === void 0 || options.bom === null || options.bom === false) {
                    options.bom = false;
                  } else if (options.bom !== true) {
                    throw new CsvError("CSV_INVALID_OPTION_BOM", ["Invalid option bom:", "bom must be true,", "got ".concat(JSON.stringify(options.bom))], options);
                  }
                  var fnCastField = null;
                  if (options.cast === void 0 || options.cast === null || options.cast === false || options.cast === "") {
                    options.cast = void 0;
                  } else if (typeof options.cast === "function") {
                    fnCastField = options.cast;
                    options.cast = true;
                  } else if (options.cast !== true) {
                    throw new CsvError("CSV_INVALID_OPTION_CAST", ["Invalid option cast:", "cast must be true or a function,", "got ".concat(JSON.stringify(options.cast))], options);
                  }
                  if (options.cast_date === void 0 || options.cast_date === null || options.cast_date === false || options.cast_date === "") {
                    options.cast_date = false;
                  } else if (options.cast_date === true) {
                    options.cast_date = function(value) {
                      var date = Date.parse(value);
                      return !isNaN(date) ? new Date(date) : value;
                    };
                  } else if (typeof options.cast_date !== "function") {
                    throw new CsvError("CSV_INVALID_OPTION_CAST_DATE", ["Invalid option cast_date:", "cast_date must be true or a function,", "got ".concat(JSON.stringify(options.cast_date))], options);
                  }
                  var fnFirstLineToHeaders = null;
                  if (options.columns === true) {
                    fnFirstLineToHeaders = void 0;
                  } else if (typeof options.columns === "function") {
                    fnFirstLineToHeaders = options.columns;
                    options.columns = true;
                  } else if (Array.isArray(options.columns)) {
                    options.columns = normalizeColumnsArray(options.columns);
                  } else if (options.columns === void 0 || options.columns === null || options.columns === false) {
                    options.columns = false;
                  } else {
                    throw new CsvError("CSV_INVALID_OPTION_COLUMNS", ["Invalid option columns:", "expect an array, a function or true,", "got ".concat(JSON.stringify(options.columns))], options);
                  }
                  if (options.columns_duplicates_to_array === void 0 || options.columns_duplicates_to_array === null || options.columns_duplicates_to_array === false) {
                    options.columns_duplicates_to_array = false;
                  } else if (options.columns_duplicates_to_array !== true) {
                    throw new CsvError("CSV_INVALID_OPTION_COLUMNS_DUPLICATES_TO_ARRAY", ["Invalid option columns_duplicates_to_array:", "expect an boolean,", "got ".concat(JSON.stringify(options.columns_duplicates_to_array))], options);
                  } else if (options.columns === false) {
                    throw new CsvError("CSV_INVALID_OPTION_COLUMNS_DUPLICATES_TO_ARRAY", ["Invalid option columns_duplicates_to_array:", "the `columns` mode must be activated."], options);
                  }
                  if (options.comment === void 0 || options.comment === null || options.comment === false || options.comment === "") {
                    options.comment = null;
                  } else {
                    if (typeof options.comment === "string") {
                      options.comment = Buffer2.from(options.comment, options.encoding);
                    }
                    if (!Buffer2.isBuffer(options.comment)) {
                      throw new CsvError("CSV_INVALID_OPTION_COMMENT", ["Invalid option comment:", "comment must be a buffer or a string,", "got ".concat(JSON.stringify(options.comment))], options);
                    }
                  }
                  var delimiter_json = JSON.stringify(options.delimiter);
                  if (!Array.isArray(options.delimiter))
                    options.delimiter = [options.delimiter];
                  if (options.delimiter.length === 0) {
                    throw new CsvError("CSV_INVALID_OPTION_DELIMITER", ["Invalid option delimiter:", "delimiter must be a non empty string or buffer or array of string|buffer,", "got ".concat(delimiter_json)], options);
                  }
                  options.delimiter = options.delimiter.map(function(delimiter) {
                    if (delimiter === void 0 || delimiter === null || delimiter === false) {
                      return Buffer2.from(",", options.encoding);
                    }
                    if (typeof delimiter === "string") {
                      delimiter = Buffer2.from(delimiter, options.encoding);
                    }
                    if (!Buffer2.isBuffer(delimiter) || delimiter.length === 0) {
                      throw new CsvError("CSV_INVALID_OPTION_DELIMITER", ["Invalid option delimiter:", "delimiter must be a non empty string or buffer or array of string|buffer,", "got ".concat(delimiter_json)], options);
                    }
                    return delimiter;
                  });
                  if (options.escape === void 0 || options.escape === true) {
                    options.escape = Buffer2.from('"', options.encoding);
                  } else if (typeof options.escape === "string") {
                    options.escape = Buffer2.from(options.escape, options.encoding);
                  } else if (options.escape === null || options.escape === false) {
                    options.escape = null;
                  }
                  if (options.escape !== null) {
                    if (!Buffer2.isBuffer(options.escape)) {
                      throw new Error("Invalid Option: escape must be a buffer, a string or a boolean, got ".concat(JSON.stringify(options.escape)));
                    }
                  }
                  if (options.from === void 0 || options.from === null) {
                    options.from = 1;
                  } else {
                    if (typeof options.from === "string" && /\d+/.test(options.from)) {
                      options.from = parseInt(options.from);
                    }
                    if (Number.isInteger(options.from)) {
                      if (options.from < 0) {
                        throw new Error("Invalid Option: from must be a positive integer, got ".concat(JSON.stringify(opts.from)));
                      }
                    } else {
                      throw new Error("Invalid Option: from must be an integer, got ".concat(JSON.stringify(options.from)));
                    }
                  }
                  if (options.from_line === void 0 || options.from_line === null) {
                    options.from_line = 1;
                  } else {
                    if (typeof options.from_line === "string" && /\d+/.test(options.from_line)) {
                      options.from_line = parseInt(options.from_line);
                    }
                    if (Number.isInteger(options.from_line)) {
                      if (options.from_line <= 0) {
                        throw new Error("Invalid Option: from_line must be a positive integer greater than 0, got ".concat(JSON.stringify(opts.from_line)));
                      }
                    } else {
                      throw new Error("Invalid Option: from_line must be an integer, got ".concat(JSON.stringify(opts.from_line)));
                    }
                  }
                  if (options.ignore_last_delimiters === void 0 || options.ignore_last_delimiters === null) {
                    options.ignore_last_delimiters = false;
                  } else if (typeof options.ignore_last_delimiters === "number") {
                    options.ignore_last_delimiters = Math.floor(options.ignore_last_delimiters);
                    if (options.ignore_last_delimiters === 0) {
                      options.ignore_last_delimiters = false;
                    }
                  } else if (typeof options.ignore_last_delimiters !== "boolean") {
                    throw new CsvError("CSV_INVALID_OPTION_IGNORE_LAST_DELIMITERS", ["Invalid option `ignore_last_delimiters`:", "the value must be a boolean value or an integer,", "got ".concat(JSON.stringify(options.ignore_last_delimiters))], options);
                  }
                  if (options.ignore_last_delimiters === true && options.columns === false) {
                    throw new CsvError("CSV_IGNORE_LAST_DELIMITERS_REQUIRES_COLUMNS", ["The option `ignore_last_delimiters`", "requires the activation of the `columns` option"], options);
                  }
                  if (options.info === void 0 || options.info === null || options.info === false) {
                    options.info = false;
                  } else if (options.info !== true) {
                    throw new Error("Invalid Option: info must be true, got ".concat(JSON.stringify(options.info)));
                  }
                  if (options.max_record_size === void 0 || options.max_record_size === null || options.max_record_size === false) {
                    options.max_record_size = 0;
                  } else if (Number.isInteger(options.max_record_size) && options.max_record_size >= 0) {
                  } else if (typeof options.max_record_size === "string" && /\d+/.test(options.max_record_size)) {
                    options.max_record_size = parseInt(options.max_record_size);
                  } else {
                    throw new Error("Invalid Option: max_record_size must be a positive integer, got ".concat(JSON.stringify(options.max_record_size)));
                  }
                  if (options.objname === void 0 || options.objname === null || options.objname === false) {
                    options.objname = void 0;
                  } else if (Buffer2.isBuffer(options.objname)) {
                    if (options.objname.length === 0) {
                      throw new Error("Invalid Option: objname must be a non empty buffer");
                    }
                    if (options.encoding === null) {
                    } else {
                      options.objname = options.objname.toString(options.encoding);
                    }
                  } else if (typeof options.objname === "string") {
                    if (options.objname.length === 0) {
                      throw new Error("Invalid Option: objname must be a non empty string");
                    }
                  } else {
                    throw new Error("Invalid Option: objname must be a string or a buffer, got ".concat(options.objname));
                  }
                  if (options.on_record === void 0 || options.on_record === null) {
                    options.on_record = void 0;
                  } else if (typeof options.on_record !== "function") {
                    throw new CsvError("CSV_INVALID_OPTION_ON_RECORD", ["Invalid option `on_record`:", "expect a function,", "got ".concat(JSON.stringify(options.on_record))], options);
                  }
                  if (options.quote === null || options.quote === false || options.quote === "") {
                    options.quote = null;
                  } else {
                    if (options.quote === void 0 || options.quote === true) {
                      options.quote = Buffer2.from('"', options.encoding);
                    } else if (typeof options.quote === "string") {
                      options.quote = Buffer2.from(options.quote, options.encoding);
                    }
                    if (!Buffer2.isBuffer(options.quote)) {
                      throw new Error("Invalid Option: quote must be a buffer or a string, got ".concat(JSON.stringify(options.quote)));
                    }
                  }
                  if (options.raw === void 0 || options.raw === null || options.raw === false) {
                    options.raw = false;
                  } else if (options.raw !== true) {
                    throw new Error("Invalid Option: raw must be true, got ".concat(JSON.stringify(options.raw)));
                  }
                  if (!options.record_delimiter) {
                    options.record_delimiter = [];
                  } else if (!Array.isArray(options.record_delimiter)) {
                    options.record_delimiter = [options.record_delimiter];
                  }
                  options.record_delimiter = options.record_delimiter.map(function(rd) {
                    if (typeof rd === "string") {
                      rd = Buffer2.from(rd, options.encoding);
                    }
                    return rd;
                  });
                  if (typeof options.relax === "boolean") {
                  } else if (options.relax === void 0 || options.relax === null) {
                    options.relax = false;
                  } else {
                    throw new Error("Invalid Option: relax must be a boolean, got ".concat(JSON.stringify(options.relax)));
                  }
                  if (typeof options.relax_column_count === "boolean") {
                  } else if (options.relax_column_count === void 0 || options.relax_column_count === null) {
                    options.relax_column_count = false;
                  } else {
                    throw new Error("Invalid Option: relax_column_count must be a boolean, got ".concat(JSON.stringify(options.relax_column_count)));
                  }
                  if (typeof options.relax_column_count_less === "boolean") {
                  } else if (options.relax_column_count_less === void 0 || options.relax_column_count_less === null) {
                    options.relax_column_count_less = false;
                  } else {
                    throw new Error("Invalid Option: relax_column_count_less must be a boolean, got ".concat(JSON.stringify(options.relax_column_count_less)));
                  }
                  if (typeof options.relax_column_count_more === "boolean") {
                  } else if (options.relax_column_count_more === void 0 || options.relax_column_count_more === null) {
                    options.relax_column_count_more = false;
                  } else {
                    throw new Error("Invalid Option: relax_column_count_more must be a boolean, got ".concat(JSON.stringify(options.relax_column_count_more)));
                  }
                  if (typeof options.skip_empty_lines === "boolean") {
                  } else if (options.skip_empty_lines === void 0 || options.skip_empty_lines === null) {
                    options.skip_empty_lines = false;
                  } else {
                    throw new Error("Invalid Option: skip_empty_lines must be a boolean, got ".concat(JSON.stringify(options.skip_empty_lines)));
                  }
                  if (typeof options.skip_lines_with_empty_values === "boolean") {
                  } else if (options.skip_lines_with_empty_values === void 0 || options.skip_lines_with_empty_values === null) {
                    options.skip_lines_with_empty_values = false;
                  } else {
                    throw new Error("Invalid Option: skip_lines_with_empty_values must be a boolean, got ".concat(JSON.stringify(options.skip_lines_with_empty_values)));
                  }
                  if (typeof options.skip_lines_with_error === "boolean") {
                  } else if (options.skip_lines_with_error === void 0 || options.skip_lines_with_error === null) {
                    options.skip_lines_with_error = false;
                  } else {
                    throw new Error("Invalid Option: skip_lines_with_error must be a boolean, got ".concat(JSON.stringify(options.skip_lines_with_error)));
                  }
                  if (options.rtrim === void 0 || options.rtrim === null || options.rtrim === false) {
                    options.rtrim = false;
                  } else if (options.rtrim !== true) {
                    throw new Error("Invalid Option: rtrim must be a boolean, got ".concat(JSON.stringify(options.rtrim)));
                  }
                  if (options.ltrim === void 0 || options.ltrim === null || options.ltrim === false) {
                    options.ltrim = false;
                  } else if (options.ltrim !== true) {
                    throw new Error("Invalid Option: ltrim must be a boolean, got ".concat(JSON.stringify(options.ltrim)));
                  }
                  if (options.trim === void 0 || options.trim === null || options.trim === false) {
                    options.trim = false;
                  } else if (options.trim !== true) {
                    throw new Error("Invalid Option: trim must be a boolean, got ".concat(JSON.stringify(options.trim)));
                  }
                  if (options.trim === true && opts.ltrim !== false) {
                    options.ltrim = true;
                  } else if (options.ltrim !== true) {
                    options.ltrim = false;
                  }
                  if (options.trim === true && opts.rtrim !== false) {
                    options.rtrim = true;
                  } else if (options.rtrim !== true) {
                    options.rtrim = false;
                  }
                  if (options.to === void 0 || options.to === null) {
                    options.to = -1;
                  } else {
                    if (typeof options.to === "string" && /\d+/.test(options.to)) {
                      options.to = parseInt(options.to);
                    }
                    if (Number.isInteger(options.to)) {
                      if (options.to <= 0) {
                        throw new Error("Invalid Option: to must be a positive integer greater than 0, got ".concat(JSON.stringify(opts.to)));
                      }
                    } else {
                      throw new Error("Invalid Option: to must be an integer, got ".concat(JSON.stringify(opts.to)));
                    }
                  }
                  if (options.to_line === void 0 || options.to_line === null) {
                    options.to_line = -1;
                  } else {
                    if (typeof options.to_line === "string" && /\d+/.test(options.to_line)) {
                      options.to_line = parseInt(options.to_line);
                    }
                    if (Number.isInteger(options.to_line)) {
                      if (options.to_line <= 0) {
                        throw new Error("Invalid Option: to_line must be a positive integer greater than 0, got ".concat(JSON.stringify(opts.to_line)));
                      }
                    } else {
                      throw new Error("Invalid Option: to_line must be an integer, got ".concat(JSON.stringify(opts.to_line)));
                    }
                  }
                  this.info = {
                    bytes: 0,
                    comment_lines: 0,
                    empty_lines: 0,
                    invalid_field_length: 0,
                    lines: 1,
                    records: 0
                  };
                  this.options = options;
                  this.state = {
                    bomSkipped: false,
                    bufBytesStart: 0,
                    castField: fnCastField,
                    commenting: false,
                    error: void 0,
                    enabled: options.from_line === 1,
                    escaping: false,
                    escapeIsQuote: Buffer2.isBuffer(options.escape) && Buffer2.isBuffer(options.quote) && Buffer2.compare(options.escape, options.quote) === 0,
                    expectedRecordLength: Array.isArray(options.columns) ? options.columns.length : void 0,
                    field: new ResizeableBuffer(20),
                    firstLineToHeaders: fnFirstLineToHeaders,
                    needMoreDataSize: Math.max.apply(Math, [
                      options.comment !== null ? options.comment.length : 0
                    ].concat(_toConsumableArray(options.delimiter.map(function(delimiter) {
                      return delimiter.length;
                    })), [
                      options.quote !== null ? options.quote.length : 0
                    ])),
                    previousBuf: void 0,
                    quoting: false,
                    stop: false,
                    rawBuffer: new ResizeableBuffer(100),
                    record: [],
                    recordHasError: false,
                    record_length: 0,
                    recordDelimiterMaxLength: options.record_delimiter.length === 0 ? 2 : Math.max.apply(Math, _toConsumableArray(options.record_delimiter.map(function(v) {
                      return v.length;
                    }))),
                    trimChars: [Buffer2.from(" ", options.encoding)[0], Buffer2.from("	", options.encoding)[0]],
                    wasQuoting: false,
                    wasRowDelimiter: false
                  };
                }
              }, {
                key: "_transform",
                value: function _transform(buf, encoding, callback) {
                  if (this.state.stop === true) {
                    return;
                  }
                  var err = this.__parse(buf, false);
                  if (err !== void 0) {
                    this.state.stop = true;
                  }
                  callback(err);
                }
              }, {
                key: "_flush",
                value: function _flush(callback) {
                  if (this.state.stop === true) {
                    return;
                  }
                  var err = this.__parse(void 0, true);
                  callback(err);
                }
              }, {
                key: "__parse",
                value: function __parse(nextBuf, end) {
                  var _this$options = this.options, bom = _this$options.bom, comment = _this$options.comment, escape = _this$options.escape, from_line = _this$options.from_line, ltrim = _this$options.ltrim, max_record_size = _this$options.max_record_size, quote = _this$options.quote, raw = _this$options.raw, relax = _this$options.relax, rtrim = _this$options.rtrim, skip_empty_lines = _this$options.skip_empty_lines, to = _this$options.to, to_line = _this$options.to_line;
                  var record_delimiter = this.options.record_delimiter;
                  var _this$state = this.state, bomSkipped = _this$state.bomSkipped, previousBuf = _this$state.previousBuf, rawBuffer = _this$state.rawBuffer, escapeIsQuote = _this$state.escapeIsQuote;
                  var buf;
                  if (previousBuf === void 0) {
                    if (nextBuf === void 0) {
                      this.push(null);
                      return;
                    } else {
                      buf = nextBuf;
                    }
                  } else if (previousBuf !== void 0 && nextBuf === void 0) {
                    buf = previousBuf;
                  } else {
                    buf = Buffer2.concat([previousBuf, nextBuf]);
                  }
                  if (bomSkipped === false) {
                    if (bom === false) {
                      this.state.bomSkipped = true;
                    } else if (buf.length < 3) {
                      if (end === false) {
                        this.state.previousBuf = buf;
                        return;
                      }
                    } else {
                      for (var encoding in boms) {
                        if (boms[encoding].compare(buf, 0, boms[encoding].length) === 0) {
                          var bomLength = boms[encoding].length;
                          this.state.bufBytesStart += bomLength;
                          buf = buf.slice(bomLength);
                          this.__normalizeOptions(_objectSpread(_objectSpread({}, this.__originalOptions), {}, {
                            encoding
                          }));
                          break;
                        }
                      }
                      this.state.bomSkipped = true;
                    }
                  }
                  var bufLen = buf.length;
                  var pos;
                  for (pos = 0; pos < bufLen; pos++) {
                    if (this.__needMoreData(pos, bufLen, end)) {
                      break;
                    }
                    if (this.state.wasRowDelimiter === true) {
                      this.info.lines++;
                      this.state.wasRowDelimiter = false;
                    }
                    if (to_line !== -1 && this.info.lines > to_line) {
                      this.state.stop = true;
                      this.push(null);
                      return;
                    }
                    if (this.state.quoting === false && record_delimiter.length === 0) {
                      var record_delimiterCount = this.__autoDiscoverRecordDelimiter(buf, pos);
                      if (record_delimiterCount) {
                        record_delimiter = this.options.record_delimiter;
                      }
                    }
                    var chr = buf[pos];
                    if (raw === true) {
                      rawBuffer.append(chr);
                    }
                    if ((chr === cr || chr === nl) && this.state.wasRowDelimiter === false) {
                      this.state.wasRowDelimiter = true;
                    }
                    if (this.state.escaping === true) {
                      this.state.escaping = false;
                    } else {
                      if (escape !== null && this.state.quoting === true && this.__isEscape(buf, pos, chr) && pos + escape.length < bufLen) {
                        if (escapeIsQuote) {
                          if (this.__isQuote(buf, pos + escape.length)) {
                            this.state.escaping = true;
                            pos += escape.length - 1;
                            continue;
                          }
                        } else {
                          this.state.escaping = true;
                          pos += escape.length - 1;
                          continue;
                        }
                      }
                      if (this.state.commenting === false && this.__isQuote(buf, pos)) {
                        if (this.state.quoting === true) {
                          var nextChr = buf[pos + quote.length];
                          var isNextChrTrimable = rtrim && this.__isCharTrimable(nextChr);
                          var isNextChrComment = comment !== null && this.__compareBytes(comment, buf, pos + quote.length, nextChr);
                          var isNextChrDelimiter = this.__isDelimiter(buf, pos + quote.length, nextChr);
                          var isNextChrRecordDelimiter = record_delimiter.length === 0 ? this.__autoDiscoverRecordDelimiter(buf, pos + quote.length) : this.__isRecordDelimiter(nextChr, buf, pos + quote.length);
                          if (escape !== null && this.__isEscape(buf, pos, chr) && this.__isQuote(buf, pos + escape.length)) {
                            pos += escape.length - 1;
                          } else if (!nextChr || isNextChrDelimiter || isNextChrRecordDelimiter || isNextChrComment || isNextChrTrimable) {
                            this.state.quoting = false;
                            this.state.wasQuoting = true;
                            pos += quote.length - 1;
                            continue;
                          } else if (relax === false) {
                            var err = this.__error(new CsvError("CSV_INVALID_CLOSING_QUOTE", ["Invalid Closing Quote:", 'got "'.concat(String.fromCharCode(nextChr), '"'), "at line ".concat(this.info.lines), "instead of delimiter, record delimiter, trimable character", "(if activated) or comment"], this.options, this.__infoField()));
                            if (err !== void 0)
                              return err;
                          } else {
                            this.state.quoting = false;
                            this.state.wasQuoting = true;
                            this.state.field.prepend(quote);
                            pos += quote.length - 1;
                          }
                        } else {
                          if (this.state.field.length !== 0) {
                            if (relax === false) {
                              var _err = this.__error(new CsvError("INVALID_OPENING_QUOTE", ["Invalid Opening Quote:", "a quote is found inside a field at line ".concat(this.info.lines)], this.options, this.__infoField(), {
                                field: this.state.field
                              }));
                              if (_err !== void 0)
                                return _err;
                            }
                          } else {
                            this.state.quoting = true;
                            pos += quote.length - 1;
                            continue;
                          }
                        }
                      }
                      if (this.state.quoting === false) {
                        var recordDelimiterLength = this.__isRecordDelimiter(chr, buf, pos);
                        if (recordDelimiterLength !== 0) {
                          var skipCommentLine = this.state.commenting && this.state.wasQuoting === false && this.state.record.length === 0 && this.state.field.length === 0;
                          if (skipCommentLine) {
                            this.info.comment_lines++;
                          } else {
                            if (this.state.enabled === false && this.info.lines + (this.state.wasRowDelimiter === true ? 1 : 0) >= from_line) {
                              this.state.enabled = true;
                              this.__resetField();
                              this.__resetRecord();
                              pos += recordDelimiterLength - 1;
                              continue;
                            }
                            if (skip_empty_lines === true && this.state.wasQuoting === false && this.state.record.length === 0 && this.state.field.length === 0) {
                              this.info.empty_lines++;
                              pos += recordDelimiterLength - 1;
                              continue;
                            }
                            this.info.bytes = this.state.bufBytesStart + pos;
                            var errField = this.__onField();
                            if (errField !== void 0)
                              return errField;
                            this.info.bytes = this.state.bufBytesStart + pos + recordDelimiterLength;
                            var errRecord = this.__onRecord();
                            if (errRecord !== void 0)
                              return errRecord;
                            if (to !== -1 && this.info.records >= to) {
                              this.state.stop = true;
                              this.push(null);
                              return;
                            }
                          }
                          this.state.commenting = false;
                          pos += recordDelimiterLength - 1;
                          continue;
                        }
                        if (this.state.commenting) {
                          continue;
                        }
                        var commentCount = comment === null ? 0 : this.__compareBytes(comment, buf, pos, chr);
                        if (commentCount !== 0) {
                          this.state.commenting = true;
                          continue;
                        }
                        var delimiterLength = this.__isDelimiter(buf, pos, chr);
                        if (delimiterLength !== 0) {
                          this.info.bytes = this.state.bufBytesStart + pos;
                          var _errField = this.__onField();
                          if (_errField !== void 0)
                            return _errField;
                          pos += delimiterLength - 1;
                          continue;
                        }
                      }
                    }
                    if (this.state.commenting === false) {
                      if (max_record_size !== 0 && this.state.record_length + this.state.field.length > max_record_size) {
                        var _err2 = this.__error(new CsvError("CSV_MAX_RECORD_SIZE", ["Max Record Size:", "record exceed the maximum number of tolerated bytes", "of ".concat(max_record_size), "at line ".concat(this.info.lines)], this.options, this.__infoField()));
                        if (_err2 !== void 0)
                          return _err2;
                      }
                    }
                    var lappend = ltrim === false || this.state.quoting === true || this.state.field.length !== 0 || !this.__isCharTrimable(chr);
                    var rappend = rtrim === false || this.state.wasQuoting === false;
                    if (lappend === true && rappend === true) {
                      this.state.field.append(chr);
                    } else if (rtrim === true && !this.__isCharTrimable(chr)) {
                      var _err3 = this.__error(new CsvError("CSV_NON_TRIMABLE_CHAR_AFTER_CLOSING_QUOTE", ["Invalid Closing Quote:", "found non trimable byte after quote", "at line ".concat(this.info.lines)], this.options, this.__infoField()));
                      if (_err3 !== void 0)
                        return _err3;
                    }
                  }
                  if (end === true) {
                    if (this.state.quoting === true) {
                      var _err4 = this.__error(new CsvError("CSV_QUOTE_NOT_CLOSED", ["Quote Not Closed:", "the parsing is finished with an opening quote at line ".concat(this.info.lines)], this.options, this.__infoField()));
                      if (_err4 !== void 0)
                        return _err4;
                    } else {
                      if (this.state.wasQuoting === true || this.state.record.length !== 0 || this.state.field.length !== 0) {
                        this.info.bytes = this.state.bufBytesStart + pos;
                        var _errField2 = this.__onField();
                        if (_errField2 !== void 0)
                          return _errField2;
                        var _errRecord = this.__onRecord();
                        if (_errRecord !== void 0)
                          return _errRecord;
                      } else if (this.state.wasRowDelimiter === true) {
                        this.info.empty_lines++;
                      } else if (this.state.commenting === true) {
                        this.info.comment_lines++;
                      }
                    }
                  } else {
                    this.state.bufBytesStart += pos;
                    this.state.previousBuf = buf.slice(pos);
                  }
                  if (this.state.wasRowDelimiter === true) {
                    this.info.lines++;
                    this.state.wasRowDelimiter = false;
                  }
                }
              }, {
                key: "__onRecord",
                value: function __onRecord() {
                  var _this$options2 = this.options, columns = _this$options2.columns, columns_duplicates_to_array = _this$options2.columns_duplicates_to_array, encoding = _this$options2.encoding, info = _this$options2.info, from = _this$options2.from, relax_column_count = _this$options2.relax_column_count, relax_column_count_less = _this$options2.relax_column_count_less, relax_column_count_more = _this$options2.relax_column_count_more, raw = _this$options2.raw, skip_lines_with_empty_values = _this$options2.skip_lines_with_empty_values;
                  var _this$state2 = this.state, enabled = _this$state2.enabled, record = _this$state2.record;
                  if (enabled === false) {
                    return this.__resetRecord();
                  }
                  var recordLength = record.length;
                  if (columns === true) {
                    if (skip_lines_with_empty_values === true && isRecordEmpty(record)) {
                      this.__resetRecord();
                      return;
                    }
                    return this.__firstLineToColumns(record);
                  }
                  if (columns === false && this.info.records === 0) {
                    this.state.expectedRecordLength = recordLength;
                  }
                  if (recordLength !== this.state.expectedRecordLength) {
                    var err = columns === false ? new CsvError("CSV_INCONSISTENT_RECORD_LENGTH", ["Invalid Record Length:", "expect ".concat(this.state.expectedRecordLength, ","), "got ".concat(recordLength, " on line ").concat(this.info.lines)], this.options, this.__infoField(), {
                      record
                    }) : new CsvError("CSV_RECORD_DONT_MATCH_COLUMNS_LENGTH", [
                      "Invalid Record Length:",
                      "columns length is ".concat(columns.length, ","),
                      "got ".concat(recordLength, " on line ").concat(this.info.lines)
                    ], this.options, this.__infoField(), {
                      record
                    });
                    if (relax_column_count === true || relax_column_count_less === true && recordLength < this.state.expectedRecordLength || relax_column_count_more === true && recordLength > this.state.expectedRecordLength) {
                      this.info.invalid_field_length++;
                      this.state.error = err;
                    } else {
                      var finalErr = this.__error(err);
                      if (finalErr)
                        return finalErr;
                    }
                  }
                  if (skip_lines_with_empty_values === true && isRecordEmpty(record)) {
                    this.__resetRecord();
                    return;
                  }
                  if (this.state.recordHasError === true) {
                    this.__resetRecord();
                    this.state.recordHasError = false;
                    return;
                  }
                  this.info.records++;
                  if (from === 1 || this.info.records >= from) {
                    if (columns !== false) {
                      var obj = {};
                      for (var i = 0, l = record.length; i < l; i++) {
                        if (columns[i] === void 0 || columns[i].disabled)
                          continue;
                        if (columns_duplicates_to_array === true && obj[columns[i].name] !== void 0) {
                          if (Array.isArray(obj[columns[i].name])) {
                            obj[columns[i].name] = obj[columns[i].name].concat(record[i]);
                          } else {
                            obj[columns[i].name] = [obj[columns[i].name], record[i]];
                          }
                        } else {
                          obj[columns[i].name] = record[i];
                        }
                      }
                      var objname = this.options.objname;
                      if (objname === void 0) {
                        if (raw === true || info === true) {
                          var _err5 = this.__push(Object.assign({
                            record: obj
                          }, raw === true ? {
                            raw: this.state.rawBuffer.toString(encoding)
                          } : {}, info === true ? {
                            info: this.__infoRecord()
                          } : {}));
                          if (_err5) {
                            return _err5;
                          }
                        } else {
                          var _err6 = this.__push(obj);
                          if (_err6) {
                            return _err6;
                          }
                        }
                      } else {
                        if (raw === true || info === true) {
                          var _err7 = this.__push(Object.assign({
                            record: [obj[objname], obj]
                          }, raw === true ? {
                            raw: this.state.rawBuffer.toString(encoding)
                          } : {}, info === true ? {
                            info: this.__infoRecord()
                          } : {}));
                          if (_err7) {
                            return _err7;
                          }
                        } else {
                          var _err8 = this.__push([obj[objname], obj]);
                          if (_err8) {
                            return _err8;
                          }
                        }
                      }
                    } else {
                      if (raw === true || info === true) {
                        var _err9 = this.__push(Object.assign({
                          record
                        }, raw === true ? {
                          raw: this.state.rawBuffer.toString(encoding)
                        } : {}, info === true ? {
                          info: this.__infoRecord()
                        } : {}));
                        if (_err9) {
                          return _err9;
                        }
                      } else {
                        var _err10 = this.__push(record);
                        if (_err10) {
                          return _err10;
                        }
                      }
                    }
                  }
                  this.__resetRecord();
                }
              }, {
                key: "__firstLineToColumns",
                value: function __firstLineToColumns(record) {
                  var firstLineToHeaders = this.state.firstLineToHeaders;
                  try {
                    var headers = firstLineToHeaders === void 0 ? record : firstLineToHeaders.call(null, record);
                    if (!Array.isArray(headers)) {
                      return this.__error(new CsvError("CSV_INVALID_COLUMN_MAPPING", ["Invalid Column Mapping:", "expect an array from column function,", "got ".concat(JSON.stringify(headers))], this.options, this.__infoField(), {
                        headers
                      }));
                    }
                    var normalizedHeaders = normalizeColumnsArray(headers);
                    this.state.expectedRecordLength = normalizedHeaders.length;
                    this.options.columns = normalizedHeaders;
                    this.__resetRecord();
                    return;
                  } catch (err) {
                    return err;
                  }
                }
              }, {
                key: "__resetRecord",
                value: function __resetRecord() {
                  if (this.options.raw === true) {
                    this.state.rawBuffer.reset();
                  }
                  this.state.error = void 0;
                  this.state.record = [];
                  this.state.record_length = 0;
                }
              }, {
                key: "__onField",
                value: function __onField() {
                  var _this$options3 = this.options, cast = _this$options3.cast, encoding = _this$options3.encoding, rtrim = _this$options3.rtrim, max_record_size = _this$options3.max_record_size;
                  var _this$state3 = this.state, enabled = _this$state3.enabled, wasQuoting = _this$state3.wasQuoting;
                  if (enabled === false) {
                    return this.__resetField();
                  }
                  var field = this.state.field.toString(encoding);
                  if (rtrim === true && wasQuoting === false) {
                    field = field.trimRight();
                  }
                  if (cast === true) {
                    var _this$__cast = this.__cast(field), _this$__cast2 = _slicedToArray(_this$__cast, 2), err = _this$__cast2[0], f = _this$__cast2[1];
                    if (err !== void 0)
                      return err;
                    field = f;
                  }
                  this.state.record.push(field);
                  if (max_record_size !== 0 && typeof field === "string") {
                    this.state.record_length += field.length;
                  }
                  this.__resetField();
                }
              }, {
                key: "__resetField",
                value: function __resetField() {
                  this.state.field.reset();
                  this.state.wasQuoting = false;
                }
              }, {
                key: "__push",
                value: function __push(record) {
                  var on_record = this.options.on_record;
                  if (on_record !== void 0) {
                    var info = this.__infoRecord();
                    try {
                      record = on_record.call(null, record, info);
                    } catch (err) {
                      return err;
                    }
                    if (record === void 0 || record === null) {
                      return;
                    }
                  }
                  this.push(record);
                }
              }, {
                key: "__cast",
                value: function __cast(field) {
                  var _this$options4 = this.options, columns = _this$options4.columns, relax_column_count = _this$options4.relax_column_count;
                  var isColumns = Array.isArray(columns);
                  if (isColumns === true && relax_column_count && this.options.columns.length <= this.state.record.length) {
                    return [void 0, void 0];
                  }
                  if (this.state.castField !== null) {
                    try {
                      var info = this.__infoField();
                      return [void 0, this.state.castField.call(null, field, info)];
                    } catch (err) {
                      return [err];
                    }
                  }
                  if (this.__isFloat(field)) {
                    return [void 0, parseFloat(field)];
                  } else if (this.options.cast_date !== false) {
                    var _info = this.__infoField();
                    return [void 0, this.options.cast_date.call(null, field, _info)];
                  }
                  return [void 0, field];
                }
              }, {
                key: "__isCharTrimable",
                value: function __isCharTrimable(chr) {
                  return chr === space || chr === tab || chr === cr || chr === nl || chr === np;
                }
              }, {
                key: "__isFloat",
                value: function __isFloat(value) {
                  return value - parseFloat(value) + 1 >= 0;
                }
              }, {
                key: "__compareBytes",
                value: function __compareBytes(sourceBuf, targetBuf, targetPos, firstByte) {
                  if (sourceBuf[0] !== firstByte)
                    return 0;
                  var sourceLength = sourceBuf.length;
                  for (var i = 1; i < sourceLength; i++) {
                    if (sourceBuf[i] !== targetBuf[targetPos + i])
                      return 0;
                  }
                  return sourceLength;
                }
              }, {
                key: "__needMoreData",
                value: function __needMoreData(i, bufLen, end) {
                  if (end)
                    return false;
                  var quote = this.options.quote;
                  var _this$state4 = this.state, quoting = _this$state4.quoting, needMoreDataSize = _this$state4.needMoreDataSize, recordDelimiterMaxLength = _this$state4.recordDelimiterMaxLength;
                  var numOfCharLeft = bufLen - i - 1;
                  var requiredLength = Math.max(needMoreDataSize, recordDelimiterMaxLength, quoting ? quote.length + recordDelimiterMaxLength : 0);
                  return numOfCharLeft < requiredLength;
                }
              }, {
                key: "__isDelimiter",
                value: function __isDelimiter(buf, pos, chr) {
                  var _this$options5 = this.options, delimiter = _this$options5.delimiter, ignore_last_delimiters = _this$options5.ignore_last_delimiters;
                  if (ignore_last_delimiters === true && this.state.record.length === this.options.columns.length - 1) {
                    return 0;
                  } else if (ignore_last_delimiters !== false && typeof ignore_last_delimiters === "number" && this.state.record.length === ignore_last_delimiters - 1) {
                    return 0;
                  }
                  loop1:
                    for (var i = 0; i < delimiter.length; i++) {
                      var del = delimiter[i];
                      if (del[0] === chr) {
                        for (var j = 1; j < del.length; j++) {
                          if (del[j] !== buf[pos + j])
                            continue loop1;
                        }
                        return del.length;
                      }
                    }
                  return 0;
                }
              }, {
                key: "__isRecordDelimiter",
                value: function __isRecordDelimiter(chr, buf, pos) {
                  var record_delimiter = this.options.record_delimiter;
                  var recordDelimiterLength = record_delimiter.length;
                  loop1:
                    for (var i = 0; i < recordDelimiterLength; i++) {
                      var rd = record_delimiter[i];
                      var rdLength = rd.length;
                      if (rd[0] !== chr) {
                        continue;
                      }
                      for (var j = 1; j < rdLength; j++) {
                        if (rd[j] !== buf[pos + j]) {
                          continue loop1;
                        }
                      }
                      return rd.length;
                    }
                  return 0;
                }
              }, {
                key: "__isEscape",
                value: function __isEscape(buf, pos, chr) {
                  var escape = this.options.escape;
                  if (escape === null)
                    return false;
                  var l = escape.length;
                  if (escape[0] === chr) {
                    for (var i = 0; i < l; i++) {
                      if (escape[i] !== buf[pos + i]) {
                        return false;
                      }
                    }
                    return true;
                  }
                  return false;
                }
              }, {
                key: "__isQuote",
                value: function __isQuote(buf, pos) {
                  var quote = this.options.quote;
                  if (quote === null)
                    return false;
                  var l = quote.length;
                  for (var i = 0; i < l; i++) {
                    if (quote[i] !== buf[pos + i]) {
                      return false;
                    }
                  }
                  return true;
                }
              }, {
                key: "__autoDiscoverRecordDelimiter",
                value: function __autoDiscoverRecordDelimiter(buf, pos) {
                  var encoding = this.options.encoding;
                  var chr = buf[pos];
                  if (chr === cr) {
                    if (buf[pos + 1] === nl) {
                      this.options.record_delimiter.push(Buffer2.from("\r\n", encoding));
                      this.state.recordDelimiterMaxLength = 2;
                      return 2;
                    } else {
                      this.options.record_delimiter.push(Buffer2.from("\r", encoding));
                      this.state.recordDelimiterMaxLength = 1;
                      return 1;
                    }
                  } else if (chr === nl) {
                    this.options.record_delimiter.push(Buffer2.from("\n", encoding));
                    this.state.recordDelimiterMaxLength = 1;
                    return 1;
                  }
                  return 0;
                }
              }, {
                key: "__error",
                value: function __error(msg) {
                  var skip_lines_with_error = this.options.skip_lines_with_error;
                  var err = typeof msg === "string" ? new Error(msg) : msg;
                  if (skip_lines_with_error) {
                    this.state.recordHasError = true;
                    this.emit("skip", err);
                    return void 0;
                  } else {
                    return err;
                  }
                }
              }, {
                key: "__infoDataSet",
                value: function __infoDataSet() {
                  return _objectSpread(_objectSpread({}, this.info), {}, {
                    columns: this.options.columns
                  });
                }
              }, {
                key: "__infoRecord",
                value: function __infoRecord() {
                  var columns = this.options.columns;
                  return _objectSpread(_objectSpread({}, this.__infoDataSet()), {}, {
                    error: this.state.error,
                    header: columns === true,
                    index: this.state.record.length
                  });
                }
              }, {
                key: "__infoField",
                value: function __infoField() {
                  var columns = this.options.columns;
                  var isColumns = Array.isArray(columns);
                  return _objectSpread(_objectSpread({}, this.__infoRecord()), {}, {
                    column: isColumns === true ? columns.length > this.state.record.length ? columns[this.state.record.length].name : null : this.state.record.length,
                    quoting: this.state.wasQuoting
                  });
                }
              }]);
              return Parser4;
            }(Transform);
            var parse3 = function parse4() {
              var data, options, callback;
              for (var i in arguments) {
                var argument = arguments[i];
                var type = _typeof(argument);
                if (data === void 0 && (typeof argument === "string" || Buffer2.isBuffer(argument))) {
                  data = argument;
                } else if (options === void 0 && isObject(argument)) {
                  options = argument;
                } else if (callback === void 0 && type === "function") {
                  callback = argument;
                } else {
                  throw new CsvError("CSV_INVALID_ARGUMENT", ["Invalid argument:", "got ".concat(JSON.stringify(argument), " at index ").concat(i)], options || {});
                }
              }
              var parser = new Parser3(options);
              if (callback) {
                var records = options === void 0 || options.objname === void 0 ? [] : {};
                parser.on("readable", function() {
                  var record;
                  while ((record = this.read()) !== null) {
                    if (options === void 0 || options.objname === void 0) {
                      records.push(record);
                    } else {
                      records[record[0]] = record[1];
                    }
                  }
                });
                parser.on("error", function(err) {
                  callback(err, void 0, parser.__infoDataSet());
                });
                parser.on("end", function() {
                  callback(void 0, records, parser.__infoDataSet());
                });
              }
              if (data !== void 0) {
                if (typeof setImmediate === "function") {
                  setImmediate(function() {
                    parser.write(data);
                    parser.end();
                  });
                } else {
                  parser.write(data);
                  parser.end();
                }
              }
              return parser;
            };
            var CsvError = /* @__PURE__ */ function(_Error) {
              _inherits(CsvError2, _Error);
              var _super2 = _createSuper(CsvError2);
              function CsvError2(code, message, options) {
                var _this2;
                _classCallCheck(this, CsvError2);
                if (Array.isArray(message))
                  message = message.join(" ");
                _this2 = _super2.call(this, message);
                if (Error.captureStackTrace !== void 0) {
                  Error.captureStackTrace(_assertThisInitialized(_this2), CsvError2);
                }
                _this2.code = code;
                for (var _len = arguments.length, contexts = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
                  contexts[_key - 3] = arguments[_key];
                }
                for (var _i2 = 0, _contexts = contexts; _i2 < _contexts.length; _i2++) {
                  var context = _contexts[_i2];
                  for (var key in context) {
                    var value = context[key];
                    _this2[key] = Buffer2.isBuffer(value) ? value.toString(options.encoding) : value == null ? value : JSON.parse(JSON.stringify(value));
                  }
                }
                return _this2;
              }
              return CsvError2;
            }(/* @__PURE__ */ _wrapNativeSuper(Error));
            parse3.Parser = Parser3;
            parse3.CsvError = CsvError;
            module4.exports = parse3;
            var underscore = function underscore2(str) {
              return str.replace(/([A-Z])/g, function(_, match) {
                return "_" + match.toLowerCase();
              });
            };
            var isObject = function isObject2(obj) {
              return _typeof(obj) === "object" && obj !== null && !Array.isArray(obj);
            };
            var isRecordEmpty = function isRecordEmpty2(record) {
              return record.every(function(field) {
                return field == null || field.toString && field.toString().trim() === "";
              });
            };
            var normalizeColumnsArray = function normalizeColumnsArray2(columns) {
              var normalizedColumns = [];
              for (var i = 0, l = columns.length; i < l; i++) {
                var column = columns[i];
                if (column === void 0 || column === null || column === false) {
                  normalizedColumns[i] = {
                    disabled: true
                  };
                } else if (typeof column === "string") {
                  normalizedColumns[i] = {
                    name: column
                  };
                } else if (isObject(column)) {
                  if (typeof column.name !== "string") {
                    throw new CsvError("CSV_OPTION_COLUMNS_MISSING_NAME", ["Option columns missing name:", 'property "name" is required at position '.concat(i), "when column is an object literal"]);
                  }
                  normalizedColumns[i] = column;
                } else {
                  throw new CsvError("CSV_INVALID_COLUMN_DEFINITION", ["Invalid column definition:", "expect a string or a literal object,", "got ".concat(JSON.stringify(column), " at position ").concat(i)]);
                }
              }
              return normalizedColumns;
            };
          }).call(this);
        }).call(this, require2("buffer").Buffer, require2("timers").setImmediate);
      }, { "./ResizeableBuffer": 1, "buffer": 5, "stream": 11, "timers": 27 }], 3: [function(require2, module4, exports3) {
        "use strict";
        exports3.byteLength = byteLength;
        exports3.toByteArray = toByteArray;
        exports3.fromByteArray = fromByteArray;
        var lookup = [];
        var revLookup = [];
        var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
        var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (var i = 0, len = code.length; i < len; ++i) {
          lookup[i] = code[i];
          revLookup[code.charCodeAt(i)] = i;
        }
        revLookup["-".charCodeAt(0)] = 62;
        revLookup["_".charCodeAt(0)] = 63;
        function getLens(b64) {
          var len2 = b64.length;
          if (len2 % 4 > 0) {
            throw new Error("Invalid string. Length must be a multiple of 4");
          }
          var validLen = b64.indexOf("=");
          if (validLen === -1)
            validLen = len2;
          var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
          return [validLen, placeHoldersLen];
        }
        function byteLength(b64) {
          var lens = getLens(b64);
          var validLen = lens[0];
          var placeHoldersLen = lens[1];
          return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
        }
        function _byteLength(b64, validLen, placeHoldersLen) {
          return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
        }
        function toByteArray(b64) {
          var tmp;
          var lens = getLens(b64);
          var validLen = lens[0];
          var placeHoldersLen = lens[1];
          var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
          var curByte = 0;
          var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
          var i2;
          for (i2 = 0; i2 < len2; i2 += 4) {
            tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
            arr[curByte++] = tmp >> 16 & 255;
            arr[curByte++] = tmp >> 8 & 255;
            arr[curByte++] = tmp & 255;
          }
          if (placeHoldersLen === 2) {
            tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
            arr[curByte++] = tmp & 255;
          }
          if (placeHoldersLen === 1) {
            tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
            arr[curByte++] = tmp >> 8 & 255;
            arr[curByte++] = tmp & 255;
          }
          return arr;
        }
        function tripletToBase64(num) {
          return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
        }
        function encodeChunk(uint8, start, end) {
          var tmp;
          var output = [];
          for (var i2 = start; i2 < end; i2 += 3) {
            tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
            output.push(tripletToBase64(tmp));
          }
          return output.join("");
        }
        function fromByteArray(uint8) {
          var tmp;
          var len2 = uint8.length;
          var extraBytes = len2 % 3;
          var parts = [];
          var maxChunkLength = 16383;
          for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
            parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
          }
          if (extraBytes === 1) {
            tmp = uint8[len2 - 1];
            parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
          } else if (extraBytes === 2) {
            tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
            parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
          }
          return parts.join("");
        }
      }, {}], 4: [function(require2, module4, exports3) {
      }, {}], 5: [function(require2, module4, exports3) {
        (function(Buffer2) {
          (function() {
            "use strict";
            var base64 = require2("base64-js");
            var ieee754 = require2("ieee754");
            exports3.Buffer = Buffer3;
            exports3.SlowBuffer = SlowBuffer;
            exports3.INSPECT_MAX_BYTES = 50;
            var K_MAX_LENGTH = 2147483647;
            exports3.kMaxLength = K_MAX_LENGTH;
            Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
            if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
              console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
            }
            function typedArraySupport() {
              try {
                var arr = new Uint8Array(1);
                arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
                  return 42;
                } };
                return arr.foo() === 42;
              } catch (e) {
                return false;
              }
            }
            Object.defineProperty(Buffer3.prototype, "parent", {
              enumerable: true,
              get: function() {
                if (!Buffer3.isBuffer(this))
                  return void 0;
                return this.buffer;
              }
            });
            Object.defineProperty(Buffer3.prototype, "offset", {
              enumerable: true,
              get: function() {
                if (!Buffer3.isBuffer(this))
                  return void 0;
                return this.byteOffset;
              }
            });
            function createBuffer(length) {
              if (length > K_MAX_LENGTH) {
                throw new RangeError('The value "' + length + '" is invalid for option "size"');
              }
              var buf = new Uint8Array(length);
              buf.__proto__ = Buffer3.prototype;
              return buf;
            }
            function Buffer3(arg, encodingOrOffset, length) {
              if (typeof arg === "number") {
                if (typeof encodingOrOffset === "string") {
                  throw new TypeError('The "string" argument must be of type string. Received type number');
                }
                return allocUnsafe(arg);
              }
              return from(arg, encodingOrOffset, length);
            }
            if (typeof Symbol !== "undefined" && Symbol.species != null && Buffer3[Symbol.species] === Buffer3) {
              Object.defineProperty(Buffer3, Symbol.species, {
                value: null,
                configurable: true,
                enumerable: false,
                writable: false
              });
            }
            Buffer3.poolSize = 8192;
            function from(value, encodingOrOffset, length) {
              if (typeof value === "string") {
                return fromString(value, encodingOrOffset);
              }
              if (ArrayBuffer.isView(value)) {
                return fromArrayLike(value);
              }
              if (value == null) {
                throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
              }
              if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
                return fromArrayBuffer(value, encodingOrOffset, length);
              }
              if (typeof value === "number") {
                throw new TypeError('The "value" argument must not be of type number. Received type number');
              }
              var valueOf = value.valueOf && value.valueOf();
              if (valueOf != null && valueOf !== value) {
                return Buffer3.from(valueOf, encodingOrOffset, length);
              }
              var b = fromObject(value);
              if (b)
                return b;
              if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
                return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
              }
              throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
            }
            Buffer3.from = function(value, encodingOrOffset, length) {
              return from(value, encodingOrOffset, length);
            };
            Buffer3.prototype.__proto__ = Uint8Array.prototype;
            Buffer3.__proto__ = Uint8Array;
            function assertSize(size) {
              if (typeof size !== "number") {
                throw new TypeError('"size" argument must be of type number');
              } else if (size < 0) {
                throw new RangeError('The value "' + size + '" is invalid for option "size"');
              }
            }
            function alloc(size, fill, encoding) {
              assertSize(size);
              if (size <= 0) {
                return createBuffer(size);
              }
              if (fill !== void 0) {
                return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
              }
              return createBuffer(size);
            }
            Buffer3.alloc = function(size, fill, encoding) {
              return alloc(size, fill, encoding);
            };
            function allocUnsafe(size) {
              assertSize(size);
              return createBuffer(size < 0 ? 0 : checked(size) | 0);
            }
            Buffer3.allocUnsafe = function(size) {
              return allocUnsafe(size);
            };
            Buffer3.allocUnsafeSlow = function(size) {
              return allocUnsafe(size);
            };
            function fromString(string, encoding) {
              if (typeof encoding !== "string" || encoding === "") {
                encoding = "utf8";
              }
              if (!Buffer3.isEncoding(encoding)) {
                throw new TypeError("Unknown encoding: " + encoding);
              }
              var length = byteLength(string, encoding) | 0;
              var buf = createBuffer(length);
              var actual = buf.write(string, encoding);
              if (actual !== length) {
                buf = buf.slice(0, actual);
              }
              return buf;
            }
            function fromArrayLike(array) {
              var length = array.length < 0 ? 0 : checked(array.length) | 0;
              var buf = createBuffer(length);
              for (var i = 0; i < length; i += 1) {
                buf[i] = array[i] & 255;
              }
              return buf;
            }
            function fromArrayBuffer(array, byteOffset, length) {
              if (byteOffset < 0 || array.byteLength < byteOffset) {
                throw new RangeError('"offset" is outside of buffer bounds');
              }
              if (array.byteLength < byteOffset + (length || 0)) {
                throw new RangeError('"length" is outside of buffer bounds');
              }
              var buf;
              if (byteOffset === void 0 && length === void 0) {
                buf = new Uint8Array(array);
              } else if (length === void 0) {
                buf = new Uint8Array(array, byteOffset);
              } else {
                buf = new Uint8Array(array, byteOffset, length);
              }
              buf.__proto__ = Buffer3.prototype;
              return buf;
            }
            function fromObject(obj) {
              if (Buffer3.isBuffer(obj)) {
                var len = checked(obj.length) | 0;
                var buf = createBuffer(len);
                if (buf.length === 0) {
                  return buf;
                }
                obj.copy(buf, 0, 0, len);
                return buf;
              }
              if (obj.length !== void 0) {
                if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
                  return createBuffer(0);
                }
                return fromArrayLike(obj);
              }
              if (obj.type === "Buffer" && Array.isArray(obj.data)) {
                return fromArrayLike(obj.data);
              }
            }
            function checked(length) {
              if (length >= K_MAX_LENGTH) {
                throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
              }
              return length | 0;
            }
            function SlowBuffer(length) {
              if (+length != length) {
                length = 0;
              }
              return Buffer3.alloc(+length);
            }
            Buffer3.isBuffer = function isBuffer(b) {
              return b != null && b._isBuffer === true && b !== Buffer3.prototype;
            };
            Buffer3.compare = function compare(a, b) {
              if (isInstance(a, Uint8Array))
                a = Buffer3.from(a, a.offset, a.byteLength);
              if (isInstance(b, Uint8Array))
                b = Buffer3.from(b, b.offset, b.byteLength);
              if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
                throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
              }
              if (a === b)
                return 0;
              var x = a.length;
              var y = b.length;
              for (var i = 0, len = Math.min(x, y); i < len; ++i) {
                if (a[i] !== b[i]) {
                  x = a[i];
                  y = b[i];
                  break;
                }
              }
              if (x < y)
                return -1;
              if (y < x)
                return 1;
              return 0;
            };
            Buffer3.isEncoding = function isEncoding(encoding) {
              switch (String(encoding).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return true;
                default:
                  return false;
              }
            };
            Buffer3.concat = function concat(list, length) {
              if (!Array.isArray(list)) {
                throw new TypeError('"list" argument must be an Array of Buffers');
              }
              if (list.length === 0) {
                return Buffer3.alloc(0);
              }
              var i;
              if (length === void 0) {
                length = 0;
                for (i = 0; i < list.length; ++i) {
                  length += list[i].length;
                }
              }
              var buffer = Buffer3.allocUnsafe(length);
              var pos = 0;
              for (i = 0; i < list.length; ++i) {
                var buf = list[i];
                if (isInstance(buf, Uint8Array)) {
                  buf = Buffer3.from(buf);
                }
                if (!Buffer3.isBuffer(buf)) {
                  throw new TypeError('"list" argument must be an Array of Buffers');
                }
                buf.copy(buffer, pos);
                pos += buf.length;
              }
              return buffer;
            };
            function byteLength(string, encoding) {
              if (Buffer3.isBuffer(string)) {
                return string.length;
              }
              if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
                return string.byteLength;
              }
              if (typeof string !== "string") {
                throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
              }
              var len = string.length;
              var mustMatch = arguments.length > 2 && arguments[2] === true;
              if (!mustMatch && len === 0)
                return 0;
              var loweredCase = false;
              for (; ; ) {
                switch (encoding) {
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return len;
                  case "utf8":
                  case "utf-8":
                    return utf8ToBytes(string).length;
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return len * 2;
                  case "hex":
                    return len >>> 1;
                  case "base64":
                    return base64ToBytes(string).length;
                  default:
                    if (loweredCase) {
                      return mustMatch ? -1 : utf8ToBytes(string).length;
                    }
                    encoding = ("" + encoding).toLowerCase();
                    loweredCase = true;
                }
              }
            }
            Buffer3.byteLength = byteLength;
            function slowToString(encoding, start, end) {
              var loweredCase = false;
              if (start === void 0 || start < 0) {
                start = 0;
              }
              if (start > this.length) {
                return "";
              }
              if (end === void 0 || end > this.length) {
                end = this.length;
              }
              if (end <= 0) {
                return "";
              }
              end >>>= 0;
              start >>>= 0;
              if (end <= start) {
                return "";
              }
              if (!encoding)
                encoding = "utf8";
              while (true) {
                switch (encoding) {
                  case "hex":
                    return hexSlice(this, start, end);
                  case "utf8":
                  case "utf-8":
                    return utf8Slice(this, start, end);
                  case "ascii":
                    return asciiSlice(this, start, end);
                  case "latin1":
                  case "binary":
                    return latin1Slice(this, start, end);
                  case "base64":
                    return base64Slice(this, start, end);
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return utf16leSlice(this, start, end);
                  default:
                    if (loweredCase)
                      throw new TypeError("Unknown encoding: " + encoding);
                    encoding = (encoding + "").toLowerCase();
                    loweredCase = true;
                }
              }
            }
            Buffer3.prototype._isBuffer = true;
            function swap(b, n, m) {
              var i = b[n];
              b[n] = b[m];
              b[m] = i;
            }
            Buffer3.prototype.swap16 = function swap16() {
              var len = this.length;
              if (len % 2 !== 0) {
                throw new RangeError("Buffer size must be a multiple of 16-bits");
              }
              for (var i = 0; i < len; i += 2) {
                swap(this, i, i + 1);
              }
              return this;
            };
            Buffer3.prototype.swap32 = function swap32() {
              var len = this.length;
              if (len % 4 !== 0) {
                throw new RangeError("Buffer size must be a multiple of 32-bits");
              }
              for (var i = 0; i < len; i += 4) {
                swap(this, i, i + 3);
                swap(this, i + 1, i + 2);
              }
              return this;
            };
            Buffer3.prototype.swap64 = function swap64() {
              var len = this.length;
              if (len % 8 !== 0) {
                throw new RangeError("Buffer size must be a multiple of 64-bits");
              }
              for (var i = 0; i < len; i += 8) {
                swap(this, i, i + 7);
                swap(this, i + 1, i + 6);
                swap(this, i + 2, i + 5);
                swap(this, i + 3, i + 4);
              }
              return this;
            };
            Buffer3.prototype.toString = function toString() {
              var length = this.length;
              if (length === 0)
                return "";
              if (arguments.length === 0)
                return utf8Slice(this, 0, length);
              return slowToString.apply(this, arguments);
            };
            Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
            Buffer3.prototype.equals = function equals(b) {
              if (!Buffer3.isBuffer(b))
                throw new TypeError("Argument must be a Buffer");
              if (this === b)
                return true;
              return Buffer3.compare(this, b) === 0;
            };
            Buffer3.prototype.inspect = function inspect() {
              var str = "";
              var max = exports3.INSPECT_MAX_BYTES;
              str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
              if (this.length > max)
                str += " ... ";
              return "<Buffer " + str + ">";
            };
            Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
              if (isInstance(target, Uint8Array)) {
                target = Buffer3.from(target, target.offset, target.byteLength);
              }
              if (!Buffer3.isBuffer(target)) {
                throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
              }
              if (start === void 0) {
                start = 0;
              }
              if (end === void 0) {
                end = target ? target.length : 0;
              }
              if (thisStart === void 0) {
                thisStart = 0;
              }
              if (thisEnd === void 0) {
                thisEnd = this.length;
              }
              if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
                throw new RangeError("out of range index");
              }
              if (thisStart >= thisEnd && start >= end) {
                return 0;
              }
              if (thisStart >= thisEnd) {
                return -1;
              }
              if (start >= end) {
                return 1;
              }
              start >>>= 0;
              end >>>= 0;
              thisStart >>>= 0;
              thisEnd >>>= 0;
              if (this === target)
                return 0;
              var x = thisEnd - thisStart;
              var y = end - start;
              var len = Math.min(x, y);
              var thisCopy = this.slice(thisStart, thisEnd);
              var targetCopy = target.slice(start, end);
              for (var i = 0; i < len; ++i) {
                if (thisCopy[i] !== targetCopy[i]) {
                  x = thisCopy[i];
                  y = targetCopy[i];
                  break;
                }
              }
              if (x < y)
                return -1;
              if (y < x)
                return 1;
              return 0;
            };
            function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
              if (buffer.length === 0)
                return -1;
              if (typeof byteOffset === "string") {
                encoding = byteOffset;
                byteOffset = 0;
              } else if (byteOffset > 2147483647) {
                byteOffset = 2147483647;
              } else if (byteOffset < -2147483648) {
                byteOffset = -2147483648;
              }
              byteOffset = +byteOffset;
              if (numberIsNaN(byteOffset)) {
                byteOffset = dir ? 0 : buffer.length - 1;
              }
              if (byteOffset < 0)
                byteOffset = buffer.length + byteOffset;
              if (byteOffset >= buffer.length) {
                if (dir)
                  return -1;
                else
                  byteOffset = buffer.length - 1;
              } else if (byteOffset < 0) {
                if (dir)
                  byteOffset = 0;
                else
                  return -1;
              }
              if (typeof val === "string") {
                val = Buffer3.from(val, encoding);
              }
              if (Buffer3.isBuffer(val)) {
                if (val.length === 0) {
                  return -1;
                }
                return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
              } else if (typeof val === "number") {
                val = val & 255;
                if (typeof Uint8Array.prototype.indexOf === "function") {
                  if (dir) {
                    return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
                  } else {
                    return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
                  }
                }
                return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
              }
              throw new TypeError("val must be string, number or Buffer");
            }
            function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
              var indexSize = 1;
              var arrLength = arr.length;
              var valLength = val.length;
              if (encoding !== void 0) {
                encoding = String(encoding).toLowerCase();
                if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
                  if (arr.length < 2 || val.length < 2) {
                    return -1;
                  }
                  indexSize = 2;
                  arrLength /= 2;
                  valLength /= 2;
                  byteOffset /= 2;
                }
              }
              function read(buf, i2) {
                if (indexSize === 1) {
                  return buf[i2];
                } else {
                  return buf.readUInt16BE(i2 * indexSize);
                }
              }
              var i;
              if (dir) {
                var foundIndex = -1;
                for (i = byteOffset; i < arrLength; i++) {
                  if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                    if (foundIndex === -1)
                      foundIndex = i;
                    if (i - foundIndex + 1 === valLength)
                      return foundIndex * indexSize;
                  } else {
                    if (foundIndex !== -1)
                      i -= i - foundIndex;
                    foundIndex = -1;
                  }
                }
              } else {
                if (byteOffset + valLength > arrLength)
                  byteOffset = arrLength - valLength;
                for (i = byteOffset; i >= 0; i--) {
                  var found = true;
                  for (var j = 0; j < valLength; j++) {
                    if (read(arr, i + j) !== read(val, j)) {
                      found = false;
                      break;
                    }
                  }
                  if (found)
                    return i;
                }
              }
              return -1;
            }
            Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
              return this.indexOf(val, byteOffset, encoding) !== -1;
            };
            Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
              return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
            };
            Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
              return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
            };
            function hexWrite(buf, string, offset, length) {
              offset = Number(offset) || 0;
              var remaining = buf.length - offset;
              if (!length) {
                length = remaining;
              } else {
                length = Number(length);
                if (length > remaining) {
                  length = remaining;
                }
              }
              var strLen = string.length;
              if (length > strLen / 2) {
                length = strLen / 2;
              }
              for (var i = 0; i < length; ++i) {
                var parsed = parseInt(string.substr(i * 2, 2), 16);
                if (numberIsNaN(parsed))
                  return i;
                buf[offset + i] = parsed;
              }
              return i;
            }
            function utf8Write(buf, string, offset, length) {
              return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
            }
            function asciiWrite(buf, string, offset, length) {
              return blitBuffer(asciiToBytes(string), buf, offset, length);
            }
            function latin1Write(buf, string, offset, length) {
              return asciiWrite(buf, string, offset, length);
            }
            function base64Write(buf, string, offset, length) {
              return blitBuffer(base64ToBytes(string), buf, offset, length);
            }
            function ucs2Write(buf, string, offset, length) {
              return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
            }
            Buffer3.prototype.write = function write(string, offset, length, encoding) {
              if (offset === void 0) {
                encoding = "utf8";
                length = this.length;
                offset = 0;
              } else if (length === void 0 && typeof offset === "string") {
                encoding = offset;
                length = this.length;
                offset = 0;
              } else if (isFinite(offset)) {
                offset = offset >>> 0;
                if (isFinite(length)) {
                  length = length >>> 0;
                  if (encoding === void 0)
                    encoding = "utf8";
                } else {
                  encoding = length;
                  length = void 0;
                }
              } else {
                throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
              }
              var remaining = this.length - offset;
              if (length === void 0 || length > remaining)
                length = remaining;
              if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
                throw new RangeError("Attempt to write outside buffer bounds");
              }
              if (!encoding)
                encoding = "utf8";
              var loweredCase = false;
              for (; ; ) {
                switch (encoding) {
                  case "hex":
                    return hexWrite(this, string, offset, length);
                  case "utf8":
                  case "utf-8":
                    return utf8Write(this, string, offset, length);
                  case "ascii":
                    return asciiWrite(this, string, offset, length);
                  case "latin1":
                  case "binary":
                    return latin1Write(this, string, offset, length);
                  case "base64":
                    return base64Write(this, string, offset, length);
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return ucs2Write(this, string, offset, length);
                  default:
                    if (loweredCase)
                      throw new TypeError("Unknown encoding: " + encoding);
                    encoding = ("" + encoding).toLowerCase();
                    loweredCase = true;
                }
              }
            };
            Buffer3.prototype.toJSON = function toJSON() {
              return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
              };
            };
            function base64Slice(buf, start, end) {
              if (start === 0 && end === buf.length) {
                return base64.fromByteArray(buf);
              } else {
                return base64.fromByteArray(buf.slice(start, end));
              }
            }
            function utf8Slice(buf, start, end) {
              end = Math.min(buf.length, end);
              var res = [];
              var i = start;
              while (i < end) {
                var firstByte = buf[i];
                var codePoint = null;
                var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
                if (i + bytesPerSequence <= end) {
                  var secondByte, thirdByte, fourthByte, tempCodePoint;
                  switch (bytesPerSequence) {
                    case 1:
                      if (firstByte < 128) {
                        codePoint = firstByte;
                      }
                      break;
                    case 2:
                      secondByte = buf[i + 1];
                      if ((secondByte & 192) === 128) {
                        tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                        if (tempCodePoint > 127) {
                          codePoint = tempCodePoint;
                        }
                      }
                      break;
                    case 3:
                      secondByte = buf[i + 1];
                      thirdByte = buf[i + 2];
                      if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                        tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                        if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                          codePoint = tempCodePoint;
                        }
                      }
                      break;
                    case 4:
                      secondByte = buf[i + 1];
                      thirdByte = buf[i + 2];
                      fourthByte = buf[i + 3];
                      if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                        tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                        if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                          codePoint = tempCodePoint;
                        }
                      }
                  }
                }
                if (codePoint === null) {
                  codePoint = 65533;
                  bytesPerSequence = 1;
                } else if (codePoint > 65535) {
                  codePoint -= 65536;
                  res.push(codePoint >>> 10 & 1023 | 55296);
                  codePoint = 56320 | codePoint & 1023;
                }
                res.push(codePoint);
                i += bytesPerSequence;
              }
              return decodeCodePointsArray(res);
            }
            var MAX_ARGUMENTS_LENGTH = 4096;
            function decodeCodePointsArray(codePoints) {
              var len = codePoints.length;
              if (len <= MAX_ARGUMENTS_LENGTH) {
                return String.fromCharCode.apply(String, codePoints);
              }
              var res = "";
              var i = 0;
              while (i < len) {
                res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
              }
              return res;
            }
            function asciiSlice(buf, start, end) {
              var ret = "";
              end = Math.min(buf.length, end);
              for (var i = start; i < end; ++i) {
                ret += String.fromCharCode(buf[i] & 127);
              }
              return ret;
            }
            function latin1Slice(buf, start, end) {
              var ret = "";
              end = Math.min(buf.length, end);
              for (var i = start; i < end; ++i) {
                ret += String.fromCharCode(buf[i]);
              }
              return ret;
            }
            function hexSlice(buf, start, end) {
              var len = buf.length;
              if (!start || start < 0)
                start = 0;
              if (!end || end < 0 || end > len)
                end = len;
              var out = "";
              for (var i = start; i < end; ++i) {
                out += toHex(buf[i]);
              }
              return out;
            }
            function utf16leSlice(buf, start, end) {
              var bytes = buf.slice(start, end);
              var res = "";
              for (var i = 0; i < bytes.length; i += 2) {
                res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
              }
              return res;
            }
            Buffer3.prototype.slice = function slice(start, end) {
              var len = this.length;
              start = ~~start;
              end = end === void 0 ? len : ~~end;
              if (start < 0) {
                start += len;
                if (start < 0)
                  start = 0;
              } else if (start > len) {
                start = len;
              }
              if (end < 0) {
                end += len;
                if (end < 0)
                  end = 0;
              } else if (end > len) {
                end = len;
              }
              if (end < start)
                end = start;
              var newBuf = this.subarray(start, end);
              newBuf.__proto__ = Buffer3.prototype;
              return newBuf;
            };
            function checkOffset(offset, ext, length) {
              if (offset % 1 !== 0 || offset < 0)
                throw new RangeError("offset is not uint");
              if (offset + ext > length)
                throw new RangeError("Trying to access beyond buffer length");
            }
            Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
              offset = offset >>> 0;
              byteLength2 = byteLength2 >>> 0;
              if (!noAssert)
                checkOffset(offset, byteLength2, this.length);
              var val = this[offset];
              var mul = 1;
              var i = 0;
              while (++i < byteLength2 && (mul *= 256)) {
                val += this[offset + i] * mul;
              }
              return val;
            };
            Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
              offset = offset >>> 0;
              byteLength2 = byteLength2 >>> 0;
              if (!noAssert) {
                checkOffset(offset, byteLength2, this.length);
              }
              var val = this[offset + --byteLength2];
              var mul = 1;
              while (byteLength2 > 0 && (mul *= 256)) {
                val += this[offset + --byteLength2] * mul;
              }
              return val;
            };
            Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
              offset = offset >>> 0;
              if (!noAssert)
                checkOffset(offset, 1, this.length);
              return this[offset];
            };
            Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
              offset = offset >>> 0;
              if (!noAssert)
                checkOffset(offset, 2, this.length);
              return this[offset] | this[offset + 1] << 8;
            };
            Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
              offset = offset >>> 0;
              if (!noAssert)
                checkOffset(offset, 2, this.length);
              return this[offset] << 8 | this[offset + 1];
            };
            Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
              offset = offset >>> 0;
              if (!noAssert)
                checkOffset(offset, 4, this.length);
              return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
            };
            Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
              offset = offset >>> 0;
              if (!noAssert)
                checkOffset(offset, 4, this.length);
              return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
            };
            Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
              offset = offset >>> 0;
              byteLength2 = byteLength2 >>> 0;
              if (!noAssert)
                checkOffset(offset, byteLength2, this.length);
              var val = this[offset];
              var mul = 1;
              var i = 0;
              while (++i < byteLength2 && (mul *= 256)) {
                val += this[offset + i] * mul;
              }
              mul *= 128;
              if (val >= mul)
                val -= Math.pow(2, 8 * byteLength2);
              return val;
            };
            Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
              offset = offset >>> 0;
              byteLength2 = byteLength2 >>> 0;
              if (!noAssert)
                checkOffset(offset, byteLength2, this.length);
              var i = byteLength2;
              var mul = 1;
              var val = this[offset + --i];
              while (i > 0 && (mul *= 256)) {
                val += this[offset + --i] * mul;
              }
              mul *= 128;
              if (val >= mul)
                val -= Math.pow(2, 8 * byteLength2);
              return val;
            };
            Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
              offset = offset >>> 0;
              if (!noAssert)
                checkOffset(offset, 1, this.length);
              if (!(this[offset] & 128))
                return this[offset];
              return (255 - this[offset] + 1) * -1;
            };
            Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
              offset = offset >>> 0;
              if (!noAssert)
                checkOffset(offset, 2, this.length);
              var val = this[offset] | this[offset + 1] << 8;
              return val & 32768 ? val | 4294901760 : val;
            };
            Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
              offset = offset >>> 0;
              if (!noAssert)
                checkOffset(offset, 2, this.length);
              var val = this[offset + 1] | this[offset] << 8;
              return val & 32768 ? val | 4294901760 : val;
            };
            Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
              offset = offset >>> 0;
              if (!noAssert)
                checkOffset(offset, 4, this.length);
              return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
            };
            Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
              offset = offset >>> 0;
              if (!noAssert)
                checkOffset(offset, 4, this.length);
              return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
            };
            Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
              offset = offset >>> 0;
              if (!noAssert)
                checkOffset(offset, 4, this.length);
              return ieee754.read(this, offset, true, 23, 4);
            };
            Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
              offset = offset >>> 0;
              if (!noAssert)
                checkOffset(offset, 4, this.length);
              return ieee754.read(this, offset, false, 23, 4);
            };
            Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
              offset = offset >>> 0;
              if (!noAssert)
                checkOffset(offset, 8, this.length);
              return ieee754.read(this, offset, true, 52, 8);
            };
            Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
              offset = offset >>> 0;
              if (!noAssert)
                checkOffset(offset, 8, this.length);
              return ieee754.read(this, offset, false, 52, 8);
            };
            function checkInt(buf, value, offset, ext, max, min) {
              if (!Buffer3.isBuffer(buf))
                throw new TypeError('"buffer" argument must be a Buffer instance');
              if (value > max || value < min)
                throw new RangeError('"value" argument is out of bounds');
              if (offset + ext > buf.length)
                throw new RangeError("Index out of range");
            }
            Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
              value = +value;
              offset = offset >>> 0;
              byteLength2 = byteLength2 >>> 0;
              if (!noAssert) {
                var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
                checkInt(this, value, offset, byteLength2, maxBytes, 0);
              }
              var mul = 1;
              var i = 0;
              this[offset] = value & 255;
              while (++i < byteLength2 && (mul *= 256)) {
                this[offset + i] = value / mul & 255;
              }
              return offset + byteLength2;
            };
            Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
              value = +value;
              offset = offset >>> 0;
              byteLength2 = byteLength2 >>> 0;
              if (!noAssert) {
                var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
                checkInt(this, value, offset, byteLength2, maxBytes, 0);
              }
              var i = byteLength2 - 1;
              var mul = 1;
              this[offset + i] = value & 255;
              while (--i >= 0 && (mul *= 256)) {
                this[offset + i] = value / mul & 255;
              }
              return offset + byteLength2;
            };
            Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
              value = +value;
              offset = offset >>> 0;
              if (!noAssert)
                checkInt(this, value, offset, 1, 255, 0);
              this[offset] = value & 255;
              return offset + 1;
            };
            Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
              value = +value;
              offset = offset >>> 0;
              if (!noAssert)
                checkInt(this, value, offset, 2, 65535, 0);
              this[offset] = value & 255;
              this[offset + 1] = value >>> 8;
              return offset + 2;
            };
            Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
              value = +value;
              offset = offset >>> 0;
              if (!noAssert)
                checkInt(this, value, offset, 2, 65535, 0);
              this[offset] = value >>> 8;
              this[offset + 1] = value & 255;
              return offset + 2;
            };
            Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
              value = +value;
              offset = offset >>> 0;
              if (!noAssert)
                checkInt(this, value, offset, 4, 4294967295, 0);
              this[offset + 3] = value >>> 24;
              this[offset + 2] = value >>> 16;
              this[offset + 1] = value >>> 8;
              this[offset] = value & 255;
              return offset + 4;
            };
            Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
              value = +value;
              offset = offset >>> 0;
              if (!noAssert)
                checkInt(this, value, offset, 4, 4294967295, 0);
              this[offset] = value >>> 24;
              this[offset + 1] = value >>> 16;
              this[offset + 2] = value >>> 8;
              this[offset + 3] = value & 255;
              return offset + 4;
            };
            Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
              value = +value;
              offset = offset >>> 0;
              if (!noAssert) {
                var limit = Math.pow(2, 8 * byteLength2 - 1);
                checkInt(this, value, offset, byteLength2, limit - 1, -limit);
              }
              var i = 0;
              var mul = 1;
              var sub = 0;
              this[offset] = value & 255;
              while (++i < byteLength2 && (mul *= 256)) {
                if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                  sub = 1;
                }
                this[offset + i] = (value / mul >> 0) - sub & 255;
              }
              return offset + byteLength2;
            };
            Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
              value = +value;
              offset = offset >>> 0;
              if (!noAssert) {
                var limit = Math.pow(2, 8 * byteLength2 - 1);
                checkInt(this, value, offset, byteLength2, limit - 1, -limit);
              }
              var i = byteLength2 - 1;
              var mul = 1;
              var sub = 0;
              this[offset + i] = value & 255;
              while (--i >= 0 && (mul *= 256)) {
                if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                  sub = 1;
                }
                this[offset + i] = (value / mul >> 0) - sub & 255;
              }
              return offset + byteLength2;
            };
            Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
              value = +value;
              offset = offset >>> 0;
              if (!noAssert)
                checkInt(this, value, offset, 1, 127, -128);
              if (value < 0)
                value = 255 + value + 1;
              this[offset] = value & 255;
              return offset + 1;
            };
            Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
              value = +value;
              offset = offset >>> 0;
              if (!noAssert)
                checkInt(this, value, offset, 2, 32767, -32768);
              this[offset] = value & 255;
              this[offset + 1] = value >>> 8;
              return offset + 2;
            };
            Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
              value = +value;
              offset = offset >>> 0;
              if (!noAssert)
                checkInt(this, value, offset, 2, 32767, -32768);
              this[offset] = value >>> 8;
              this[offset + 1] = value & 255;
              return offset + 2;
            };
            Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
              value = +value;
              offset = offset >>> 0;
              if (!noAssert)
                checkInt(this, value, offset, 4, 2147483647, -2147483648);
              this[offset] = value & 255;
              this[offset + 1] = value >>> 8;
              this[offset + 2] = value >>> 16;
              this[offset + 3] = value >>> 24;
              return offset + 4;
            };
            Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
              value = +value;
              offset = offset >>> 0;
              if (!noAssert)
                checkInt(this, value, offset, 4, 2147483647, -2147483648);
              if (value < 0)
                value = 4294967295 + value + 1;
              this[offset] = value >>> 24;
              this[offset + 1] = value >>> 16;
              this[offset + 2] = value >>> 8;
              this[offset + 3] = value & 255;
              return offset + 4;
            };
            function checkIEEE754(buf, value, offset, ext, max, min) {
              if (offset + ext > buf.length)
                throw new RangeError("Index out of range");
              if (offset < 0)
                throw new RangeError("Index out of range");
            }
            function writeFloat(buf, value, offset, littleEndian, noAssert) {
              value = +value;
              offset = offset >>> 0;
              if (!noAssert) {
                checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
              }
              ieee754.write(buf, value, offset, littleEndian, 23, 4);
              return offset + 4;
            }
            Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
              return writeFloat(this, value, offset, true, noAssert);
            };
            Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
              return writeFloat(this, value, offset, false, noAssert);
            };
            function writeDouble(buf, value, offset, littleEndian, noAssert) {
              value = +value;
              offset = offset >>> 0;
              if (!noAssert) {
                checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
              }
              ieee754.write(buf, value, offset, littleEndian, 52, 8);
              return offset + 8;
            }
            Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
              return writeDouble(this, value, offset, true, noAssert);
            };
            Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
              return writeDouble(this, value, offset, false, noAssert);
            };
            Buffer3.prototype.copy = function copy3(target, targetStart, start, end) {
              if (!Buffer3.isBuffer(target))
                throw new TypeError("argument should be a Buffer");
              if (!start)
                start = 0;
              if (!end && end !== 0)
                end = this.length;
              if (targetStart >= target.length)
                targetStart = target.length;
              if (!targetStart)
                targetStart = 0;
              if (end > 0 && end < start)
                end = start;
              if (end === start)
                return 0;
              if (target.length === 0 || this.length === 0)
                return 0;
              if (targetStart < 0) {
                throw new RangeError("targetStart out of bounds");
              }
              if (start < 0 || start >= this.length)
                throw new RangeError("Index out of range");
              if (end < 0)
                throw new RangeError("sourceEnd out of bounds");
              if (end > this.length)
                end = this.length;
              if (target.length - targetStart < end - start) {
                end = target.length - targetStart + start;
              }
              var len = end - start;
              if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
                this.copyWithin(targetStart, start, end);
              } else if (this === target && start < targetStart && targetStart < end) {
                for (var i = len - 1; i >= 0; --i) {
                  target[i + targetStart] = this[i + start];
                }
              } else {
                Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
              }
              return len;
            };
            Buffer3.prototype.fill = function fill(val, start, end, encoding) {
              if (typeof val === "string") {
                if (typeof start === "string") {
                  encoding = start;
                  start = 0;
                  end = this.length;
                } else if (typeof end === "string") {
                  encoding = end;
                  end = this.length;
                }
                if (encoding !== void 0 && typeof encoding !== "string") {
                  throw new TypeError("encoding must be a string");
                }
                if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
                  throw new TypeError("Unknown encoding: " + encoding);
                }
                if (val.length === 1) {
                  var code = val.charCodeAt(0);
                  if (encoding === "utf8" && code < 128 || encoding === "latin1") {
                    val = code;
                  }
                }
              } else if (typeof val === "number") {
                val = val & 255;
              }
              if (start < 0 || this.length < start || this.length < end) {
                throw new RangeError("Out of range index");
              }
              if (end <= start) {
                return this;
              }
              start = start >>> 0;
              end = end === void 0 ? this.length : end >>> 0;
              if (!val)
                val = 0;
              var i;
              if (typeof val === "number") {
                for (i = start; i < end; ++i) {
                  this[i] = val;
                }
              } else {
                var bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
                var len = bytes.length;
                if (len === 0) {
                  throw new TypeError('The value "' + val + '" is invalid for argument "value"');
                }
                for (i = 0; i < end - start; ++i) {
                  this[i + start] = bytes[i % len];
                }
              }
              return this;
            };
            var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
            function base64clean(str) {
              str = str.split("=")[0];
              str = str.trim().replace(INVALID_BASE64_RE, "");
              if (str.length < 2)
                return "";
              while (str.length % 4 !== 0) {
                str = str + "=";
              }
              return str;
            }
            function toHex(n) {
              if (n < 16)
                return "0" + n.toString(16);
              return n.toString(16);
            }
            function utf8ToBytes(string, units) {
              units = units || Infinity;
              var codePoint;
              var length = string.length;
              var leadSurrogate = null;
              var bytes = [];
              for (var i = 0; i < length; ++i) {
                codePoint = string.charCodeAt(i);
                if (codePoint > 55295 && codePoint < 57344) {
                  if (!leadSurrogate) {
                    if (codePoint > 56319) {
                      if ((units -= 3) > -1)
                        bytes.push(239, 191, 189);
                      continue;
                    } else if (i + 1 === length) {
                      if ((units -= 3) > -1)
                        bytes.push(239, 191, 189);
                      continue;
                    }
                    leadSurrogate = codePoint;
                    continue;
                  }
                  if (codePoint < 56320) {
                    if ((units -= 3) > -1)
                      bytes.push(239, 191, 189);
                    leadSurrogate = codePoint;
                    continue;
                  }
                  codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
                } else if (leadSurrogate) {
                  if ((units -= 3) > -1)
                    bytes.push(239, 191, 189);
                }
                leadSurrogate = null;
                if (codePoint < 128) {
                  if ((units -= 1) < 0)
                    break;
                  bytes.push(codePoint);
                } else if (codePoint < 2048) {
                  if ((units -= 2) < 0)
                    break;
                  bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
                } else if (codePoint < 65536) {
                  if ((units -= 3) < 0)
                    break;
                  bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
                } else if (codePoint < 1114112) {
                  if ((units -= 4) < 0)
                    break;
                  bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
                } else {
                  throw new Error("Invalid code point");
                }
              }
              return bytes;
            }
            function asciiToBytes(str) {
              var byteArray = [];
              for (var i = 0; i < str.length; ++i) {
                byteArray.push(str.charCodeAt(i) & 255);
              }
              return byteArray;
            }
            function utf16leToBytes(str, units) {
              var c, hi, lo;
              var byteArray = [];
              for (var i = 0; i < str.length; ++i) {
                if ((units -= 2) < 0)
                  break;
                c = str.charCodeAt(i);
                hi = c >> 8;
                lo = c % 256;
                byteArray.push(lo);
                byteArray.push(hi);
              }
              return byteArray;
            }
            function base64ToBytes(str) {
              return base64.toByteArray(base64clean(str));
            }
            function blitBuffer(src, dst, offset, length) {
              for (var i = 0; i < length; ++i) {
                if (i + offset >= dst.length || i >= src.length)
                  break;
                dst[i + offset] = src[i];
              }
              return i;
            }
            function isInstance(obj, type) {
              return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
            }
            function numberIsNaN(obj) {
              return obj !== obj;
            }
          }).call(this);
        }).call(this, require2("buffer").Buffer);
      }, { "base64-js": 3, "buffer": 5, "ieee754": 7 }], 6: [function(require2, module4, exports3) {
        "use strict";
        var R = typeof Reflect === "object" ? Reflect : null;
        var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
          return Function.prototype.apply.call(target, receiver, args);
        };
        var ReflectOwnKeys;
        if (R && typeof R.ownKeys === "function") {
          ReflectOwnKeys = R.ownKeys;
        } else if (Object.getOwnPropertySymbols) {
          ReflectOwnKeys = function ReflectOwnKeys2(target) {
            return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
          };
        } else {
          ReflectOwnKeys = function ReflectOwnKeys2(target) {
            return Object.getOwnPropertyNames(target);
          };
        }
        function ProcessEmitWarning(warning) {
          if (console && console.warn)
            console.warn(warning);
        }
        var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
          return value !== value;
        };
        function EventEmitter() {
          EventEmitter.init.call(this);
        }
        module4.exports = EventEmitter;
        module4.exports.once = once;
        EventEmitter.EventEmitter = EventEmitter;
        EventEmitter.prototype._events = void 0;
        EventEmitter.prototype._eventsCount = 0;
        EventEmitter.prototype._maxListeners = void 0;
        var defaultMaxListeners = 10;
        function checkListener(listener) {
          if (typeof listener !== "function") {
            throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
          }
        }
        Object.defineProperty(EventEmitter, "defaultMaxListeners", {
          enumerable: true,
          get: function() {
            return defaultMaxListeners;
          },
          set: function(arg) {
            if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
              throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
            }
            defaultMaxListeners = arg;
          }
        });
        EventEmitter.init = function() {
          if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
            this._events = Object.create(null);
            this._eventsCount = 0;
          }
          this._maxListeners = this._maxListeners || void 0;
        };
        EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
          if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
            throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
          }
          this._maxListeners = n;
          return this;
        };
        function _getMaxListeners(that) {
          if (that._maxListeners === void 0)
            return EventEmitter.defaultMaxListeners;
          return that._maxListeners;
        }
        EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
          return _getMaxListeners(this);
        };
        EventEmitter.prototype.emit = function emit(type) {
          var args = [];
          for (var i = 1; i < arguments.length; i++)
            args.push(arguments[i]);
          var doError = type === "error";
          var events = this._events;
          if (events !== void 0)
            doError = doError && events.error === void 0;
          else if (!doError)
            return false;
          if (doError) {
            var er;
            if (args.length > 0)
              er = args[0];
            if (er instanceof Error) {
              throw er;
            }
            var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
            err.context = er;
            throw err;
          }
          var handler = events[type];
          if (handler === void 0)
            return false;
          if (typeof handler === "function") {
            ReflectApply(handler, this, args);
          } else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i)
              ReflectApply(listeners[i], this, args);
          }
          return true;
        };
        function _addListener(target, type, listener, prepend) {
          var m;
          var events;
          var existing;
          checkListener(listener);
          events = target._events;
          if (events === void 0) {
            events = target._events = Object.create(null);
            target._eventsCount = 0;
          } else {
            if (events.newListener !== void 0) {
              target.emit("newListener", type, listener.listener ? listener.listener : listener);
              events = target._events;
            }
            existing = events[type];
          }
          if (existing === void 0) {
            existing = events[type] = listener;
            ++target._eventsCount;
          } else {
            if (typeof existing === "function") {
              existing = events[type] = prepend ? [listener, existing] : [existing, listener];
            } else if (prepend) {
              existing.unshift(listener);
            } else {
              existing.push(listener);
            }
            m = _getMaxListeners(target);
            if (m > 0 && existing.length > m && !existing.warned) {
              existing.warned = true;
              var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
              w.name = "MaxListenersExceededWarning";
              w.emitter = target;
              w.type = type;
              w.count = existing.length;
              ProcessEmitWarning(w);
            }
          }
          return target;
        }
        EventEmitter.prototype.addListener = function addListener(type, listener) {
          return _addListener(this, type, listener, false);
        };
        EventEmitter.prototype.on = EventEmitter.prototype.addListener;
        EventEmitter.prototype.prependListener = function prependListener(type, listener) {
          return _addListener(this, type, listener, true);
        };
        function onceWrapper() {
          if (!this.fired) {
            this.target.removeListener(this.type, this.wrapFn);
            this.fired = true;
            if (arguments.length === 0)
              return this.listener.call(this.target);
            return this.listener.apply(this.target, arguments);
          }
        }
        function _onceWrap(target, type, listener) {
          var state = { fired: false, wrapFn: void 0, target, type, listener };
          var wrapped = onceWrapper.bind(state);
          wrapped.listener = listener;
          state.wrapFn = wrapped;
          return wrapped;
        }
        EventEmitter.prototype.once = function once2(type, listener) {
          checkListener(listener);
          this.on(type, _onceWrap(this, type, listener));
          return this;
        };
        EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
          checkListener(listener);
          this.prependListener(type, _onceWrap(this, type, listener));
          return this;
        };
        EventEmitter.prototype.removeListener = function removeListener(type, listener) {
          var list, events, position, i, originalListener;
          checkListener(listener);
          events = this._events;
          if (events === void 0)
            return this;
          list = events[type];
          if (list === void 0)
            return this;
          if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0)
              this._events = Object.create(null);
            else {
              delete events[type];
              if (events.removeListener)
                this.emit("removeListener", type, list.listener || listener);
            }
          } else if (typeof list !== "function") {
            position = -1;
            for (i = list.length - 1; i >= 0; i--) {
              if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
              }
            }
            if (position < 0)
              return this;
            if (position === 0)
              list.shift();
            else {
              spliceOne(list, position);
            }
            if (list.length === 1)
              events[type] = list[0];
            if (events.removeListener !== void 0)
              this.emit("removeListener", type, originalListener || listener);
          }
          return this;
        };
        EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
        EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
          var listeners, events, i;
          events = this._events;
          if (events === void 0)
            return this;
          if (events.removeListener === void 0) {
            if (arguments.length === 0) {
              this._events = Object.create(null);
              this._eventsCount = 0;
            } else if (events[type] !== void 0) {
              if (--this._eventsCount === 0)
                this._events = Object.create(null);
              else
                delete events[type];
            }
            return this;
          }
          if (arguments.length === 0) {
            var keys = Object.keys(events);
            var key;
            for (i = 0; i < keys.length; ++i) {
              key = keys[i];
              if (key === "removeListener")
                continue;
              this.removeAllListeners(key);
            }
            this.removeAllListeners("removeListener");
            this._events = Object.create(null);
            this._eventsCount = 0;
            return this;
          }
          listeners = events[type];
          if (typeof listeners === "function") {
            this.removeListener(type, listeners);
          } else if (listeners !== void 0) {
            for (i = listeners.length - 1; i >= 0; i--) {
              this.removeListener(type, listeners[i]);
            }
          }
          return this;
        };
        function _listeners(target, type, unwrap) {
          var events = target._events;
          if (events === void 0)
            return [];
          var evlistener = events[type];
          if (evlistener === void 0)
            return [];
          if (typeof evlistener === "function")
            return unwrap ? [evlistener.listener || evlistener] : [evlistener];
          return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
        }
        EventEmitter.prototype.listeners = function listeners(type) {
          return _listeners(this, type, true);
        };
        EventEmitter.prototype.rawListeners = function rawListeners(type) {
          return _listeners(this, type, false);
        };
        EventEmitter.listenerCount = function(emitter, type) {
          if (typeof emitter.listenerCount === "function") {
            return emitter.listenerCount(type);
          } else {
            return listenerCount.call(emitter, type);
          }
        };
        EventEmitter.prototype.listenerCount = listenerCount;
        function listenerCount(type) {
          var events = this._events;
          if (events !== void 0) {
            var evlistener = events[type];
            if (typeof evlistener === "function") {
              return 1;
            } else if (evlistener !== void 0) {
              return evlistener.length;
            }
          }
          return 0;
        }
        EventEmitter.prototype.eventNames = function eventNames() {
          return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
        };
        function arrayClone(arr, n) {
          var copy3 = new Array(n);
          for (var i = 0; i < n; ++i)
            copy3[i] = arr[i];
          return copy3;
        }
        function spliceOne(list, index) {
          for (; index + 1 < list.length; index++)
            list[index] = list[index + 1];
          list.pop();
        }
        function unwrapListeners(arr) {
          var ret = new Array(arr.length);
          for (var i = 0; i < ret.length; ++i) {
            ret[i] = arr[i].listener || arr[i];
          }
          return ret;
        }
        function once(emitter, name) {
          return new Promise(function(resolve, reject) {
            function errorListener(err) {
              emitter.removeListener(name, resolver);
              reject(err);
            }
            function resolver() {
              if (typeof emitter.removeListener === "function") {
                emitter.removeListener("error", errorListener);
              }
              resolve([].slice.call(arguments));
            }
            ;
            eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
            if (name !== "error") {
              addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
            }
          });
        }
        function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
          if (typeof emitter.on === "function") {
            eventTargetAgnosticAddListener(emitter, "error", handler, flags);
          }
        }
        function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
          if (typeof emitter.on === "function") {
            if (flags.once) {
              emitter.once(name, listener);
            } else {
              emitter.on(name, listener);
            }
          } else if (typeof emitter.addEventListener === "function") {
            emitter.addEventListener(name, function wrapListener(arg) {
              if (flags.once) {
                emitter.removeEventListener(name, wrapListener);
              }
              listener(arg);
            });
          } else {
            throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
          }
        }
      }, {}], 7: [function(require2, module4, exports3) {
        exports3.read = function(buffer, offset, isLE, mLen, nBytes) {
          var e, m;
          var eLen = nBytes * 8 - mLen - 1;
          var eMax = (1 << eLen) - 1;
          var eBias = eMax >> 1;
          var nBits = -7;
          var i = isLE ? nBytes - 1 : 0;
          var d = isLE ? -1 : 1;
          var s = buffer[offset + i];
          i += d;
          e = s & (1 << -nBits) - 1;
          s >>= -nBits;
          nBits += eLen;
          for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
          }
          m = e & (1 << -nBits) - 1;
          e >>= -nBits;
          nBits += mLen;
          for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
          }
          if (e === 0) {
            e = 1 - eBias;
          } else if (e === eMax) {
            return m ? NaN : (s ? -1 : 1) * Infinity;
          } else {
            m = m + Math.pow(2, mLen);
            e = e - eBias;
          }
          return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
        };
        exports3.write = function(buffer, value, offset, isLE, mLen, nBytes) {
          var e, m, c;
          var eLen = nBytes * 8 - mLen - 1;
          var eMax = (1 << eLen) - 1;
          var eBias = eMax >> 1;
          var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
          var i = isLE ? 0 : nBytes - 1;
          var d = isLE ? 1 : -1;
          var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
          value = Math.abs(value);
          if (isNaN(value) || value === Infinity) {
            m = isNaN(value) ? 1 : 0;
            e = eMax;
          } else {
            e = Math.floor(Math.log(value) / Math.LN2);
            if (value * (c = Math.pow(2, -e)) < 1) {
              e--;
              c *= 2;
            }
            if (e + eBias >= 1) {
              value += rt / c;
            } else {
              value += rt * Math.pow(2, 1 - eBias);
            }
            if (value * c >= 2) {
              e++;
              c /= 2;
            }
            if (e + eBias >= eMax) {
              m = 0;
              e = eMax;
            } else if (e + eBias >= 1) {
              m = (value * c - 1) * Math.pow(2, mLen);
              e = e + eBias;
            } else {
              m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
              e = 0;
            }
          }
          for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
          }
          e = e << mLen | m;
          eLen += mLen;
          for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
          }
          buffer[offset + i - d] |= s * 128;
        };
      }, {}], 8: [function(require2, module4, exports3) {
        if (typeof Object.create === "function") {
          module4.exports = function inherits(ctor, superCtor) {
            if (superCtor) {
              ctor.super_ = superCtor;
              ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                  value: ctor,
                  enumerable: false,
                  writable: true,
                  configurable: true
                }
              });
            }
          };
        } else {
          module4.exports = function inherits(ctor, superCtor) {
            if (superCtor) {
              ctor.super_ = superCtor;
              var TempCtor = function() {
              };
              TempCtor.prototype = superCtor.prototype;
              ctor.prototype = new TempCtor();
              ctor.prototype.constructor = ctor;
            }
          };
        }
      }, {}], 9: [function(require2, module4, exports3) {
        var process = module4.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        (function() {
          try {
            if (typeof setTimeout === "function") {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            if (typeof clearTimeout === "function") {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0);
          }
          if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }
          try {
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e2) {
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            return clearTimeout(marker);
          }
          if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }
          try {
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              return cachedClearTimeout.call(null, marker);
            } catch (e2) {
              return cachedClearTimeout.call(this, marker);
            }
          }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
          if (!draining || !currentQueue) {
            return;
          }
          draining = false;
          if (currentQueue.length) {
            queue = currentQueue.concat(queue);
          } else {
            queueIndex = -1;
          }
          if (queue.length) {
            drainQueue();
          }
        }
        function drainQueue() {
          if (draining) {
            return;
          }
          var timeout = runTimeout(cleanUpNextTick);
          draining = true;
          var len = queue.length;
          while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
              if (currentQueue) {
                currentQueue[queueIndex].run();
              }
            }
            queueIndex = -1;
            len = queue.length;
          }
          currentQueue = null;
          draining = false;
          runClearTimeout(timeout);
        }
        process.nextTick = function(fun) {
          var args = new Array(arguments.length - 1);
          if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }
          queue.push(new Item(fun, args));
          if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
          }
        };
        function Item(fun, array) {
          this.fun = fun;
          this.array = array;
        }
        Item.prototype.run = function() {
          this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = "";
        process.versions = {};
        function noop() {
        }
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;
        process.listeners = function(name) {
          return [];
        };
        process.binding = function(name) {
          throw new Error("process.binding is not supported");
        };
        process.cwd = function() {
          return "/";
        };
        process.chdir = function(dir) {
          throw new Error("process.chdir is not supported");
        };
        process.umask = function() {
          return 0;
        };
      }, {}], 10: [function(require2, module4, exports3) {
        var buffer = require2("buffer");
        var Buffer2 = buffer.Buffer;
        function copyProps(src, dst) {
          for (var key in src) {
            dst[key] = src[key];
          }
        }
        if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
          module4.exports = buffer;
        } else {
          copyProps(buffer, exports3);
          exports3.Buffer = SafeBuffer;
        }
        function SafeBuffer(arg, encodingOrOffset, length) {
          return Buffer2(arg, encodingOrOffset, length);
        }
        SafeBuffer.prototype = Object.create(Buffer2.prototype);
        copyProps(Buffer2, SafeBuffer);
        SafeBuffer.from = function(arg, encodingOrOffset, length) {
          if (typeof arg === "number") {
            throw new TypeError("Argument must not be a number");
          }
          return Buffer2(arg, encodingOrOffset, length);
        };
        SafeBuffer.alloc = function(size, fill, encoding) {
          if (typeof size !== "number") {
            throw new TypeError("Argument must be a number");
          }
          var buf = Buffer2(size);
          if (fill !== void 0) {
            if (typeof encoding === "string") {
              buf.fill(fill, encoding);
            } else {
              buf.fill(fill);
            }
          } else {
            buf.fill(0);
          }
          return buf;
        };
        SafeBuffer.allocUnsafe = function(size) {
          if (typeof size !== "number") {
            throw new TypeError("Argument must be a number");
          }
          return Buffer2(size);
        };
        SafeBuffer.allocUnsafeSlow = function(size) {
          if (typeof size !== "number") {
            throw new TypeError("Argument must be a number");
          }
          return buffer.SlowBuffer(size);
        };
      }, { "buffer": 5 }], 11: [function(require2, module4, exports3) {
        module4.exports = Stream;
        var EE = require2("events").EventEmitter;
        var inherits = require2("inherits");
        inherits(Stream, EE);
        Stream.Readable = require2("readable-stream/lib/_stream_readable.js");
        Stream.Writable = require2("readable-stream/lib/_stream_writable.js");
        Stream.Duplex = require2("readable-stream/lib/_stream_duplex.js");
        Stream.Transform = require2("readable-stream/lib/_stream_transform.js");
        Stream.PassThrough = require2("readable-stream/lib/_stream_passthrough.js");
        Stream.finished = require2("readable-stream/lib/internal/streams/end-of-stream.js");
        Stream.pipeline = require2("readable-stream/lib/internal/streams/pipeline.js");
        Stream.Stream = Stream;
        function Stream() {
          EE.call(this);
        }
        Stream.prototype.pipe = function(dest, options) {
          var source = this;
          function ondata(chunk) {
            if (dest.writable) {
              if (dest.write(chunk) === false && source.pause) {
                source.pause();
              }
            }
          }
          source.on("data", ondata);
          function ondrain() {
            if (source.readable && source.resume) {
              source.resume();
            }
          }
          dest.on("drain", ondrain);
          if (!dest._isStdio && (!options || options.end !== false)) {
            source.on("end", onend);
            source.on("close", onclose);
          }
          var didOnEnd = false;
          function onend() {
            if (didOnEnd)
              return;
            didOnEnd = true;
            dest.end();
          }
          function onclose() {
            if (didOnEnd)
              return;
            didOnEnd = true;
            if (typeof dest.destroy === "function")
              dest.destroy();
          }
          function onerror(er) {
            cleanup();
            if (EE.listenerCount(this, "error") === 0) {
              throw er;
            }
          }
          source.on("error", onerror);
          dest.on("error", onerror);
          function cleanup() {
            source.removeListener("data", ondata);
            dest.removeListener("drain", ondrain);
            source.removeListener("end", onend);
            source.removeListener("close", onclose);
            source.removeListener("error", onerror);
            dest.removeListener("error", onerror);
            source.removeListener("end", cleanup);
            source.removeListener("close", cleanup);
            dest.removeListener("close", cleanup);
          }
          source.on("end", cleanup);
          source.on("close", cleanup);
          dest.on("close", cleanup);
          dest.emit("pipe", source);
          return dest;
        };
      }, { "events": 6, "inherits": 8, "readable-stream/lib/_stream_duplex.js": 13, "readable-stream/lib/_stream_passthrough.js": 14, "readable-stream/lib/_stream_readable.js": 15, "readable-stream/lib/_stream_transform.js": 16, "readable-stream/lib/_stream_writable.js": 17, "readable-stream/lib/internal/streams/end-of-stream.js": 21, "readable-stream/lib/internal/streams/pipeline.js": 23 }], 12: [function(require2, module4, exports3) {
        "use strict";
        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          subClass.__proto__ = superClass;
        }
        var codes = {};
        function createErrorType(code, message, Base) {
          if (!Base) {
            Base = Error;
          }
          function getMessage(arg1, arg2, arg3) {
            if (typeof message === "string") {
              return message;
            } else {
              return message(arg1, arg2, arg3);
            }
          }
          var NodeError = /* @__PURE__ */ function(_Base) {
            _inheritsLoose(NodeError2, _Base);
            function NodeError2(arg1, arg2, arg3) {
              return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
            }
            return NodeError2;
          }(Base);
          NodeError.prototype.name = Base.name;
          NodeError.prototype.code = code;
          codes[code] = NodeError;
        }
        function oneOf(expected, thing) {
          if (Array.isArray(expected)) {
            var len = expected.length;
            expected = expected.map(function(i) {
              return String(i);
            });
            if (len > 2) {
              return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
            } else if (len === 2) {
              return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
            } else {
              return "of ".concat(thing, " ").concat(expected[0]);
            }
          } else {
            return "of ".concat(thing, " ").concat(String(expected));
          }
        }
        function startsWith(str, search, pos) {
          return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
        }
        function endsWith(str, search, this_len) {
          if (this_len === void 0 || this_len > str.length) {
            this_len = str.length;
          }
          return str.substring(this_len - search.length, this_len) === search;
        }
        function includes(str, search, start) {
          if (typeof start !== "number") {
            start = 0;
          }
          if (start + search.length > str.length) {
            return false;
          } else {
            return str.indexOf(search, start) !== -1;
          }
        }
        createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
          return 'The value "' + value + '" is invalid for option "' + name + '"';
        }, TypeError);
        createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
          var determiner;
          if (typeof expected === "string" && startsWith(expected, "not ")) {
            determiner = "must not be";
            expected = expected.replace(/^not /, "");
          } else {
            determiner = "must be";
          }
          var msg;
          if (endsWith(name, " argument")) {
            msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
          } else {
            var type = includes(name, ".") ? "property" : "argument";
            msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
          }
          msg += ". Received type ".concat(typeof actual);
          return msg;
        }, TypeError);
        createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
        createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
          return "The " + name + " method is not implemented";
        });
        createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
        createErrorType("ERR_STREAM_DESTROYED", function(name) {
          return "Cannot call " + name + " after a stream was destroyed";
        });
        createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
        createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
        createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
        createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
        createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
          return "Unknown encoding: " + arg;
        }, TypeError);
        createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
        module4.exports.codes = codes;
      }, {}], 13: [function(require2, module4, exports3) {
        (function(process) {
          (function() {
            "use strict";
            var objectKeys = Object.keys || function(obj) {
              var keys2 = [];
              for (var key in obj) {
                keys2.push(key);
              }
              return keys2;
            };
            module4.exports = Duplex;
            var Readable = require2("./_stream_readable");
            var Writable = require2("./_stream_writable");
            require2("inherits")(Duplex, Readable);
            {
              var keys = objectKeys(Writable.prototype);
              for (var v = 0; v < keys.length; v++) {
                var method = keys[v];
                if (!Duplex.prototype[method])
                  Duplex.prototype[method] = Writable.prototype[method];
              }
            }
            function Duplex(options) {
              if (!(this instanceof Duplex))
                return new Duplex(options);
              Readable.call(this, options);
              Writable.call(this, options);
              this.allowHalfOpen = true;
              if (options) {
                if (options.readable === false)
                  this.readable = false;
                if (options.writable === false)
                  this.writable = false;
                if (options.allowHalfOpen === false) {
                  this.allowHalfOpen = false;
                  this.once("end", onend);
                }
              }
            }
            Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
              enumerable: false,
              get: function get() {
                return this._writableState.highWaterMark;
              }
            });
            Object.defineProperty(Duplex.prototype, "writableBuffer", {
              enumerable: false,
              get: function get() {
                return this._writableState && this._writableState.getBuffer();
              }
            });
            Object.defineProperty(Duplex.prototype, "writableLength", {
              enumerable: false,
              get: function get() {
                return this._writableState.length;
              }
            });
            function onend() {
              if (this._writableState.ended)
                return;
              process.nextTick(onEndNT, this);
            }
            function onEndNT(self2) {
              self2.end();
            }
            Object.defineProperty(Duplex.prototype, "destroyed", {
              enumerable: false,
              get: function get() {
                if (this._readableState === void 0 || this._writableState === void 0) {
                  return false;
                }
                return this._readableState.destroyed && this._writableState.destroyed;
              },
              set: function set(value) {
                if (this._readableState === void 0 || this._writableState === void 0) {
                  return;
                }
                this._readableState.destroyed = value;
                this._writableState.destroyed = value;
              }
            });
          }).call(this);
        }).call(this, require2("_process"));
      }, { "./_stream_readable": 15, "./_stream_writable": 17, "_process": 9, "inherits": 8 }], 14: [function(require2, module4, exports3) {
        "use strict";
        module4.exports = PassThrough;
        var Transform = require2("./_stream_transform");
        require2("inherits")(PassThrough, Transform);
        function PassThrough(options) {
          if (!(this instanceof PassThrough))
            return new PassThrough(options);
          Transform.call(this, options);
        }
        PassThrough.prototype._transform = function(chunk, encoding, cb) {
          cb(null, chunk);
        };
      }, { "./_stream_transform": 16, "inherits": 8 }], 15: [function(require2, module4, exports3) {
        (function(process, global2) {
          (function() {
            "use strict";
            module4.exports = Readable;
            var Duplex;
            Readable.ReadableState = ReadableState;
            var EE = require2("events").EventEmitter;
            var EElistenerCount = function EElistenerCount2(emitter, type) {
              return emitter.listeners(type).length;
            };
            var Stream = require2("./internal/streams/stream");
            var Buffer2 = require2("buffer").Buffer;
            var OurUint8Array = global2.Uint8Array || function() {
            };
            function _uint8ArrayToBuffer(chunk) {
              return Buffer2.from(chunk);
            }
            function _isUint8Array(obj) {
              return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
            }
            var debugUtil = require2("util");
            var debug;
            if (debugUtil && debugUtil.debuglog) {
              debug = debugUtil.debuglog("stream");
            } else {
              debug = function debug2() {
              };
            }
            var BufferList = require2("./internal/streams/buffer_list");
            var destroyImpl = require2("./internal/streams/destroy");
            var _require = require2("./internal/streams/state"), getHighWaterMark = _require.getHighWaterMark;
            var _require$codes = require2("../errors").codes, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
            var StringDecoder;
            var createReadableStreamAsyncIterator;
            var from;
            require2("inherits")(Readable, Stream);
            var errorOrDestroy = destroyImpl.errorOrDestroy;
            var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
            function prependListener(emitter, event, fn) {
              if (typeof emitter.prependListener === "function")
                return emitter.prependListener(event, fn);
              if (!emitter._events || !emitter._events[event])
                emitter.on(event, fn);
              else if (Array.isArray(emitter._events[event]))
                emitter._events[event].unshift(fn);
              else
                emitter._events[event] = [fn, emitter._events[event]];
            }
            function ReadableState(options, stream, isDuplex) {
              Duplex = Duplex || require2("./_stream_duplex");
              options = options || {};
              if (typeof isDuplex !== "boolean")
                isDuplex = stream instanceof Duplex;
              this.objectMode = !!options.objectMode;
              if (isDuplex)
                this.objectMode = this.objectMode || !!options.readableObjectMode;
              this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
              this.buffer = new BufferList();
              this.length = 0;
              this.pipes = null;
              this.pipesCount = 0;
              this.flowing = null;
              this.ended = false;
              this.endEmitted = false;
              this.reading = false;
              this.sync = true;
              this.needReadable = false;
              this.emittedReadable = false;
              this.readableListening = false;
              this.resumeScheduled = false;
              this.paused = true;
              this.emitClose = options.emitClose !== false;
              this.autoDestroy = !!options.autoDestroy;
              this.destroyed = false;
              this.defaultEncoding = options.defaultEncoding || "utf8";
              this.awaitDrain = 0;
              this.readingMore = false;
              this.decoder = null;
              this.encoding = null;
              if (options.encoding) {
                if (!StringDecoder)
                  StringDecoder = require2("string_decoder/").StringDecoder;
                this.decoder = new StringDecoder(options.encoding);
                this.encoding = options.encoding;
              }
            }
            function Readable(options) {
              Duplex = Duplex || require2("./_stream_duplex");
              if (!(this instanceof Readable))
                return new Readable(options);
              var isDuplex = this instanceof Duplex;
              this._readableState = new ReadableState(options, this, isDuplex);
              this.readable = true;
              if (options) {
                if (typeof options.read === "function")
                  this._read = options.read;
                if (typeof options.destroy === "function")
                  this._destroy = options.destroy;
              }
              Stream.call(this);
            }
            Object.defineProperty(Readable.prototype, "destroyed", {
              enumerable: false,
              get: function get() {
                if (this._readableState === void 0) {
                  return false;
                }
                return this._readableState.destroyed;
              },
              set: function set(value) {
                if (!this._readableState) {
                  return;
                }
                this._readableState.destroyed = value;
              }
            });
            Readable.prototype.destroy = destroyImpl.destroy;
            Readable.prototype._undestroy = destroyImpl.undestroy;
            Readable.prototype._destroy = function(err, cb) {
              cb(err);
            };
            Readable.prototype.push = function(chunk, encoding) {
              var state = this._readableState;
              var skipChunkCheck;
              if (!state.objectMode) {
                if (typeof chunk === "string") {
                  encoding = encoding || state.defaultEncoding;
                  if (encoding !== state.encoding) {
                    chunk = Buffer2.from(chunk, encoding);
                    encoding = "";
                  }
                  skipChunkCheck = true;
                }
              } else {
                skipChunkCheck = true;
              }
              return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
            };
            Readable.prototype.unshift = function(chunk) {
              return readableAddChunk(this, chunk, null, true, false);
            };
            function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
              debug("readableAddChunk", chunk);
              var state = stream._readableState;
              if (chunk === null) {
                state.reading = false;
                onEofChunk(stream, state);
              } else {
                var er;
                if (!skipChunkCheck)
                  er = chunkInvalid(state, chunk);
                if (er) {
                  errorOrDestroy(stream, er);
                } else if (state.objectMode || chunk && chunk.length > 0) {
                  if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
                    chunk = _uint8ArrayToBuffer(chunk);
                  }
                  if (addToFront) {
                    if (state.endEmitted)
                      errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
                    else
                      addChunk(stream, state, chunk, true);
                  } else if (state.ended) {
                    errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
                  } else if (state.destroyed) {
                    return false;
                  } else {
                    state.reading = false;
                    if (state.decoder && !encoding) {
                      chunk = state.decoder.write(chunk);
                      if (state.objectMode || chunk.length !== 0)
                        addChunk(stream, state, chunk, false);
                      else
                        maybeReadMore(stream, state);
                    } else {
                      addChunk(stream, state, chunk, false);
                    }
                  }
                } else if (!addToFront) {
                  state.reading = false;
                  maybeReadMore(stream, state);
                }
              }
              return !state.ended && (state.length < state.highWaterMark || state.length === 0);
            }
            function addChunk(stream, state, chunk, addToFront) {
              if (state.flowing && state.length === 0 && !state.sync) {
                state.awaitDrain = 0;
                stream.emit("data", chunk);
              } else {
                state.length += state.objectMode ? 1 : chunk.length;
                if (addToFront)
                  state.buffer.unshift(chunk);
                else
                  state.buffer.push(chunk);
                if (state.needReadable)
                  emitReadable(stream);
              }
              maybeReadMore(stream, state);
            }
            function chunkInvalid(state, chunk) {
              var er;
              if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
                er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
              }
              return er;
            }
            Readable.prototype.isPaused = function() {
              return this._readableState.flowing === false;
            };
            Readable.prototype.setEncoding = function(enc) {
              if (!StringDecoder)
                StringDecoder = require2("string_decoder/").StringDecoder;
              var decoder = new StringDecoder(enc);
              this._readableState.decoder = decoder;
              this._readableState.encoding = this._readableState.decoder.encoding;
              var p = this._readableState.buffer.head;
              var content = "";
              while (p !== null) {
                content += decoder.write(p.data);
                p = p.next;
              }
              this._readableState.buffer.clear();
              if (content !== "")
                this._readableState.buffer.push(content);
              this._readableState.length = content.length;
              return this;
            };
            var MAX_HWM = 1073741824;
            function computeNewHighWaterMark(n) {
              if (n >= MAX_HWM) {
                n = MAX_HWM;
              } else {
                n--;
                n |= n >>> 1;
                n |= n >>> 2;
                n |= n >>> 4;
                n |= n >>> 8;
                n |= n >>> 16;
                n++;
              }
              return n;
            }
            function howMuchToRead(n, state) {
              if (n <= 0 || state.length === 0 && state.ended)
                return 0;
              if (state.objectMode)
                return 1;
              if (n !== n) {
                if (state.flowing && state.length)
                  return state.buffer.head.data.length;
                else
                  return state.length;
              }
              if (n > state.highWaterMark)
                state.highWaterMark = computeNewHighWaterMark(n);
              if (n <= state.length)
                return n;
              if (!state.ended) {
                state.needReadable = true;
                return 0;
              }
              return state.length;
            }
            Readable.prototype.read = function(n) {
              debug("read", n);
              n = parseInt(n, 10);
              var state = this._readableState;
              var nOrig = n;
              if (n !== 0)
                state.emittedReadable = false;
              if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
                debug("read: emitReadable", state.length, state.ended);
                if (state.length === 0 && state.ended)
                  endReadable(this);
                else
                  emitReadable(this);
                return null;
              }
              n = howMuchToRead(n, state);
              if (n === 0 && state.ended) {
                if (state.length === 0)
                  endReadable(this);
                return null;
              }
              var doRead = state.needReadable;
              debug("need readable", doRead);
              if (state.length === 0 || state.length - n < state.highWaterMark) {
                doRead = true;
                debug("length less than watermark", doRead);
              }
              if (state.ended || state.reading) {
                doRead = false;
                debug("reading or ended", doRead);
              } else if (doRead) {
                debug("do read");
                state.reading = true;
                state.sync = true;
                if (state.length === 0)
                  state.needReadable = true;
                this._read(state.highWaterMark);
                state.sync = false;
                if (!state.reading)
                  n = howMuchToRead(nOrig, state);
              }
              var ret;
              if (n > 0)
                ret = fromList(n, state);
              else
                ret = null;
              if (ret === null) {
                state.needReadable = state.length <= state.highWaterMark;
                n = 0;
              } else {
                state.length -= n;
                state.awaitDrain = 0;
              }
              if (state.length === 0) {
                if (!state.ended)
                  state.needReadable = true;
                if (nOrig !== n && state.ended)
                  endReadable(this);
              }
              if (ret !== null)
                this.emit("data", ret);
              return ret;
            };
            function onEofChunk(stream, state) {
              debug("onEofChunk");
              if (state.ended)
                return;
              if (state.decoder) {
                var chunk = state.decoder.end();
                if (chunk && chunk.length) {
                  state.buffer.push(chunk);
                  state.length += state.objectMode ? 1 : chunk.length;
                }
              }
              state.ended = true;
              if (state.sync) {
                emitReadable(stream);
              } else {
                state.needReadable = false;
                if (!state.emittedReadable) {
                  state.emittedReadable = true;
                  emitReadable_(stream);
                }
              }
            }
            function emitReadable(stream) {
              var state = stream._readableState;
              debug("emitReadable", state.needReadable, state.emittedReadable);
              state.needReadable = false;
              if (!state.emittedReadable) {
                debug("emitReadable", state.flowing);
                state.emittedReadable = true;
                process.nextTick(emitReadable_, stream);
              }
            }
            function emitReadable_(stream) {
              var state = stream._readableState;
              debug("emitReadable_", state.destroyed, state.length, state.ended);
              if (!state.destroyed && (state.length || state.ended)) {
                stream.emit("readable");
                state.emittedReadable = false;
              }
              state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
              flow(stream);
            }
            function maybeReadMore(stream, state) {
              if (!state.readingMore) {
                state.readingMore = true;
                process.nextTick(maybeReadMore_, stream, state);
              }
            }
            function maybeReadMore_(stream, state) {
              while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
                var len = state.length;
                debug("maybeReadMore read 0");
                stream.read(0);
                if (len === state.length)
                  break;
              }
              state.readingMore = false;
            }
            Readable.prototype._read = function(n) {
              errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
            };
            Readable.prototype.pipe = function(dest, pipeOpts) {
              var src = this;
              var state = this._readableState;
              switch (state.pipesCount) {
                case 0:
                  state.pipes = dest;
                  break;
                case 1:
                  state.pipes = [state.pipes, dest];
                  break;
                default:
                  state.pipes.push(dest);
                  break;
              }
              state.pipesCount += 1;
              debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
              var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
              var endFn = doEnd ? onend : unpipe;
              if (state.endEmitted)
                process.nextTick(endFn);
              else
                src.once("end", endFn);
              dest.on("unpipe", onunpipe);
              function onunpipe(readable, unpipeInfo) {
                debug("onunpipe");
                if (readable === src) {
                  if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                    unpipeInfo.hasUnpiped = true;
                    cleanup();
                  }
                }
              }
              function onend() {
                debug("onend");
                dest.end();
              }
              var ondrain = pipeOnDrain(src);
              dest.on("drain", ondrain);
              var cleanedUp = false;
              function cleanup() {
                debug("cleanup");
                dest.removeListener("close", onclose);
                dest.removeListener("finish", onfinish);
                dest.removeListener("drain", ondrain);
                dest.removeListener("error", onerror);
                dest.removeListener("unpipe", onunpipe);
                src.removeListener("end", onend);
                src.removeListener("end", unpipe);
                src.removeListener("data", ondata);
                cleanedUp = true;
                if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
                  ondrain();
              }
              src.on("data", ondata);
              function ondata(chunk) {
                debug("ondata");
                var ret = dest.write(chunk);
                debug("dest.write", ret);
                if (ret === false) {
                  if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                    debug("false write response, pause", state.awaitDrain);
                    state.awaitDrain++;
                  }
                  src.pause();
                }
              }
              function onerror(er) {
                debug("onerror", er);
                unpipe();
                dest.removeListener("error", onerror);
                if (EElistenerCount(dest, "error") === 0)
                  errorOrDestroy(dest, er);
              }
              prependListener(dest, "error", onerror);
              function onclose() {
                dest.removeListener("finish", onfinish);
                unpipe();
              }
              dest.once("close", onclose);
              function onfinish() {
                debug("onfinish");
                dest.removeListener("close", onclose);
                unpipe();
              }
              dest.once("finish", onfinish);
              function unpipe() {
                debug("unpipe");
                src.unpipe(dest);
              }
              dest.emit("pipe", src);
              if (!state.flowing) {
                debug("pipe resume");
                src.resume();
              }
              return dest;
            };
            function pipeOnDrain(src) {
              return function pipeOnDrainFunctionResult() {
                var state = src._readableState;
                debug("pipeOnDrain", state.awaitDrain);
                if (state.awaitDrain)
                  state.awaitDrain--;
                if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
                  state.flowing = true;
                  flow(src);
                }
              };
            }
            Readable.prototype.unpipe = function(dest) {
              var state = this._readableState;
              var unpipeInfo = {
                hasUnpiped: false
              };
              if (state.pipesCount === 0)
                return this;
              if (state.pipesCount === 1) {
                if (dest && dest !== state.pipes)
                  return this;
                if (!dest)
                  dest = state.pipes;
                state.pipes = null;
                state.pipesCount = 0;
                state.flowing = false;
                if (dest)
                  dest.emit("unpipe", this, unpipeInfo);
                return this;
              }
              if (!dest) {
                var dests = state.pipes;
                var len = state.pipesCount;
                state.pipes = null;
                state.pipesCount = 0;
                state.flowing = false;
                for (var i = 0; i < len; i++) {
                  dests[i].emit("unpipe", this, {
                    hasUnpiped: false
                  });
                }
                return this;
              }
              var index = indexOf(state.pipes, dest);
              if (index === -1)
                return this;
              state.pipes.splice(index, 1);
              state.pipesCount -= 1;
              if (state.pipesCount === 1)
                state.pipes = state.pipes[0];
              dest.emit("unpipe", this, unpipeInfo);
              return this;
            };
            Readable.prototype.on = function(ev, fn) {
              var res = Stream.prototype.on.call(this, ev, fn);
              var state = this._readableState;
              if (ev === "data") {
                state.readableListening = this.listenerCount("readable") > 0;
                if (state.flowing !== false)
                  this.resume();
              } else if (ev === "readable") {
                if (!state.endEmitted && !state.readableListening) {
                  state.readableListening = state.needReadable = true;
                  state.flowing = false;
                  state.emittedReadable = false;
                  debug("on readable", state.length, state.reading);
                  if (state.length) {
                    emitReadable(this);
                  } else if (!state.reading) {
                    process.nextTick(nReadingNextTick, this);
                  }
                }
              }
              return res;
            };
            Readable.prototype.addListener = Readable.prototype.on;
            Readable.prototype.removeListener = function(ev, fn) {
              var res = Stream.prototype.removeListener.call(this, ev, fn);
              if (ev === "readable") {
                process.nextTick(updateReadableListening, this);
              }
              return res;
            };
            Readable.prototype.removeAllListeners = function(ev) {
              var res = Stream.prototype.removeAllListeners.apply(this, arguments);
              if (ev === "readable" || ev === void 0) {
                process.nextTick(updateReadableListening, this);
              }
              return res;
            };
            function updateReadableListening(self2) {
              var state = self2._readableState;
              state.readableListening = self2.listenerCount("readable") > 0;
              if (state.resumeScheduled && !state.paused) {
                state.flowing = true;
              } else if (self2.listenerCount("data") > 0) {
                self2.resume();
              }
            }
            function nReadingNextTick(self2) {
              debug("readable nexttick read 0");
              self2.read(0);
            }
            Readable.prototype.resume = function() {
              var state = this._readableState;
              if (!state.flowing) {
                debug("resume");
                state.flowing = !state.readableListening;
                resume(this, state);
              }
              state.paused = false;
              return this;
            };
            function resume(stream, state) {
              if (!state.resumeScheduled) {
                state.resumeScheduled = true;
                process.nextTick(resume_, stream, state);
              }
            }
            function resume_(stream, state) {
              debug("resume", state.reading);
              if (!state.reading) {
                stream.read(0);
              }
              state.resumeScheduled = false;
              stream.emit("resume");
              flow(stream);
              if (state.flowing && !state.reading)
                stream.read(0);
            }
            Readable.prototype.pause = function() {
              debug("call pause flowing=%j", this._readableState.flowing);
              if (this._readableState.flowing !== false) {
                debug("pause");
                this._readableState.flowing = false;
                this.emit("pause");
              }
              this._readableState.paused = true;
              return this;
            };
            function flow(stream) {
              var state = stream._readableState;
              debug("flow", state.flowing);
              while (state.flowing && stream.read() !== null) {
                ;
              }
            }
            Readable.prototype.wrap = function(stream) {
              var _this = this;
              var state = this._readableState;
              var paused = false;
              stream.on("end", function() {
                debug("wrapped end");
                if (state.decoder && !state.ended) {
                  var chunk = state.decoder.end();
                  if (chunk && chunk.length)
                    _this.push(chunk);
                }
                _this.push(null);
              });
              stream.on("data", function(chunk) {
                debug("wrapped data");
                if (state.decoder)
                  chunk = state.decoder.write(chunk);
                if (state.objectMode && (chunk === null || chunk === void 0))
                  return;
                else if (!state.objectMode && (!chunk || !chunk.length))
                  return;
                var ret = _this.push(chunk);
                if (!ret) {
                  paused = true;
                  stream.pause();
                }
              });
              for (var i in stream) {
                if (this[i] === void 0 && typeof stream[i] === "function") {
                  this[i] = function methodWrap(method) {
                    return function methodWrapReturnFunction() {
                      return stream[method].apply(stream, arguments);
                    };
                  }(i);
                }
              }
              for (var n = 0; n < kProxyEvents.length; n++) {
                stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
              }
              this._read = function(n2) {
                debug("wrapped _read", n2);
                if (paused) {
                  paused = false;
                  stream.resume();
                }
              };
              return this;
            };
            if (typeof Symbol === "function") {
              Readable.prototype[Symbol.asyncIterator] = function() {
                if (createReadableStreamAsyncIterator === void 0) {
                  createReadableStreamAsyncIterator = require2("./internal/streams/async_iterator");
                }
                return createReadableStreamAsyncIterator(this);
              };
            }
            Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
              enumerable: false,
              get: function get() {
                return this._readableState.highWaterMark;
              }
            });
            Object.defineProperty(Readable.prototype, "readableBuffer", {
              enumerable: false,
              get: function get() {
                return this._readableState && this._readableState.buffer;
              }
            });
            Object.defineProperty(Readable.prototype, "readableFlowing", {
              enumerable: false,
              get: function get() {
                return this._readableState.flowing;
              },
              set: function set(state) {
                if (this._readableState) {
                  this._readableState.flowing = state;
                }
              }
            });
            Readable._fromList = fromList;
            Object.defineProperty(Readable.prototype, "readableLength", {
              enumerable: false,
              get: function get() {
                return this._readableState.length;
              }
            });
            function fromList(n, state) {
              if (state.length === 0)
                return null;
              var ret;
              if (state.objectMode)
                ret = state.buffer.shift();
              else if (!n || n >= state.length) {
                if (state.decoder)
                  ret = state.buffer.join("");
                else if (state.buffer.length === 1)
                  ret = state.buffer.first();
                else
                  ret = state.buffer.concat(state.length);
                state.buffer.clear();
              } else {
                ret = state.buffer.consume(n, state.decoder);
              }
              return ret;
            }
            function endReadable(stream) {
              var state = stream._readableState;
              debug("endReadable", state.endEmitted);
              if (!state.endEmitted) {
                state.ended = true;
                process.nextTick(endReadableNT, state, stream);
              }
            }
            function endReadableNT(state, stream) {
              debug("endReadableNT", state.endEmitted, state.length);
              if (!state.endEmitted && state.length === 0) {
                state.endEmitted = true;
                stream.readable = false;
                stream.emit("end");
                if (state.autoDestroy) {
                  var wState = stream._writableState;
                  if (!wState || wState.autoDestroy && wState.finished) {
                    stream.destroy();
                  }
                }
              }
            }
            if (typeof Symbol === "function") {
              Readable.from = function(iterable, opts) {
                if (from === void 0) {
                  from = require2("./internal/streams/from");
                }
                return from(Readable, iterable, opts);
              };
            }
            function indexOf(xs, x) {
              for (var i = 0, l = xs.length; i < l; i++) {
                if (xs[i] === x)
                  return i;
              }
              return -1;
            }
          }).call(this);
        }).call(this, require2("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "../errors": 12, "./_stream_duplex": 13, "./internal/streams/async_iterator": 18, "./internal/streams/buffer_list": 19, "./internal/streams/destroy": 20, "./internal/streams/from": 22, "./internal/streams/state": 24, "./internal/streams/stream": 25, "_process": 9, "buffer": 5, "events": 6, "inherits": 8, "string_decoder/": 26, "util": 4 }], 16: [function(require2, module4, exports3) {
        "use strict";
        module4.exports = Transform;
        var _require$codes = require2("../errors").codes, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING, ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
        var Duplex = require2("./_stream_duplex");
        require2("inherits")(Transform, Duplex);
        function afterTransform(er, data) {
          var ts = this._transformState;
          ts.transforming = false;
          var cb = ts.writecb;
          if (cb === null) {
            return this.emit("error", new ERR_MULTIPLE_CALLBACK());
          }
          ts.writechunk = null;
          ts.writecb = null;
          if (data != null)
            this.push(data);
          cb(er);
          var rs = this._readableState;
          rs.reading = false;
          if (rs.needReadable || rs.length < rs.highWaterMark) {
            this._read(rs.highWaterMark);
          }
        }
        function Transform(options) {
          if (!(this instanceof Transform))
            return new Transform(options);
          Duplex.call(this, options);
          this._transformState = {
            afterTransform: afterTransform.bind(this),
            needTransform: false,
            transforming: false,
            writecb: null,
            writechunk: null,
            writeencoding: null
          };
          this._readableState.needReadable = true;
          this._readableState.sync = false;
          if (options) {
            if (typeof options.transform === "function")
              this._transform = options.transform;
            if (typeof options.flush === "function")
              this._flush = options.flush;
          }
          this.on("prefinish", prefinish);
        }
        function prefinish() {
          var _this = this;
          if (typeof this._flush === "function" && !this._readableState.destroyed) {
            this._flush(function(er, data) {
              done(_this, er, data);
            });
          } else {
            done(this, null, null);
          }
        }
        Transform.prototype.push = function(chunk, encoding) {
          this._transformState.needTransform = false;
          return Duplex.prototype.push.call(this, chunk, encoding);
        };
        Transform.prototype._transform = function(chunk, encoding, cb) {
          cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
        };
        Transform.prototype._write = function(chunk, encoding, cb) {
          var ts = this._transformState;
          ts.writecb = cb;
          ts.writechunk = chunk;
          ts.writeencoding = encoding;
          if (!ts.transforming) {
            var rs = this._readableState;
            if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
              this._read(rs.highWaterMark);
          }
        };
        Transform.prototype._read = function(n) {
          var ts = this._transformState;
          if (ts.writechunk !== null && !ts.transforming) {
            ts.transforming = true;
            this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
          } else {
            ts.needTransform = true;
          }
        };
        Transform.prototype._destroy = function(err, cb) {
          Duplex.prototype._destroy.call(this, err, function(err2) {
            cb(err2);
          });
        };
        function done(stream, er, data) {
          if (er)
            return stream.emit("error", er);
          if (data != null)
            stream.push(data);
          if (stream._writableState.length)
            throw new ERR_TRANSFORM_WITH_LENGTH_0();
          if (stream._transformState.transforming)
            throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
          return stream.push(null);
        }
      }, { "../errors": 12, "./_stream_duplex": 13, "inherits": 8 }], 17: [function(require2, module4, exports3) {
        (function(process, global2) {
          (function() {
            "use strict";
            module4.exports = Writable;
            function WriteReq(chunk, encoding, cb) {
              this.chunk = chunk;
              this.encoding = encoding;
              this.callback = cb;
              this.next = null;
            }
            function CorkedRequest(state) {
              var _this = this;
              this.next = null;
              this.entry = null;
              this.finish = function() {
                onCorkedFinish(_this, state);
              };
            }
            var Duplex;
            Writable.WritableState = WritableState;
            var internalUtil = {
              deprecate: require2("util-deprecate")
            };
            var Stream = require2("./internal/streams/stream");
            var Buffer2 = require2("buffer").Buffer;
            var OurUint8Array = global2.Uint8Array || function() {
            };
            function _uint8ArrayToBuffer(chunk) {
              return Buffer2.from(chunk);
            }
            function _isUint8Array(obj) {
              return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
            }
            var destroyImpl = require2("./internal/streams/destroy");
            var _require = require2("./internal/streams/state"), getHighWaterMark = _require.getHighWaterMark;
            var _require$codes = require2("../errors").codes, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED, ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES, ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END, ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
            var errorOrDestroy = destroyImpl.errorOrDestroy;
            require2("inherits")(Writable, Stream);
            function nop() {
            }
            function WritableState(options, stream, isDuplex) {
              Duplex = Duplex || require2("./_stream_duplex");
              options = options || {};
              if (typeof isDuplex !== "boolean")
                isDuplex = stream instanceof Duplex;
              this.objectMode = !!options.objectMode;
              if (isDuplex)
                this.objectMode = this.objectMode || !!options.writableObjectMode;
              this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
              this.finalCalled = false;
              this.needDrain = false;
              this.ending = false;
              this.ended = false;
              this.finished = false;
              this.destroyed = false;
              var noDecode = options.decodeStrings === false;
              this.decodeStrings = !noDecode;
              this.defaultEncoding = options.defaultEncoding || "utf8";
              this.length = 0;
              this.writing = false;
              this.corked = 0;
              this.sync = true;
              this.bufferProcessing = false;
              this.onwrite = function(er) {
                onwrite(stream, er);
              };
              this.writecb = null;
              this.writelen = 0;
              this.bufferedRequest = null;
              this.lastBufferedRequest = null;
              this.pendingcb = 0;
              this.prefinished = false;
              this.errorEmitted = false;
              this.emitClose = options.emitClose !== false;
              this.autoDestroy = !!options.autoDestroy;
              this.bufferedRequestCount = 0;
              this.corkedRequestsFree = new CorkedRequest(this);
            }
            WritableState.prototype.getBuffer = function getBuffer() {
              var current = this.bufferedRequest;
              var out = [];
              while (current) {
                out.push(current);
                current = current.next;
              }
              return out;
            };
            (function() {
              try {
                Object.defineProperty(WritableState.prototype, "buffer", {
                  get: internalUtil.deprecate(function writableStateBufferGetter() {
                    return this.getBuffer();
                  }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                });
              } catch (_) {
              }
            })();
            var realHasInstance;
            if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
              realHasInstance = Function.prototype[Symbol.hasInstance];
              Object.defineProperty(Writable, Symbol.hasInstance, {
                value: function value(object) {
                  if (realHasInstance.call(this, object))
                    return true;
                  if (this !== Writable)
                    return false;
                  return object && object._writableState instanceof WritableState;
                }
              });
            } else {
              realHasInstance = function realHasInstance2(object) {
                return object instanceof this;
              };
            }
            function Writable(options) {
              Duplex = Duplex || require2("./_stream_duplex");
              var isDuplex = this instanceof Duplex;
              if (!isDuplex && !realHasInstance.call(Writable, this))
                return new Writable(options);
              this._writableState = new WritableState(options, this, isDuplex);
              this.writable = true;
              if (options) {
                if (typeof options.write === "function")
                  this._write = options.write;
                if (typeof options.writev === "function")
                  this._writev = options.writev;
                if (typeof options.destroy === "function")
                  this._destroy = options.destroy;
                if (typeof options.final === "function")
                  this._final = options.final;
              }
              Stream.call(this);
            }
            Writable.prototype.pipe = function() {
              errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
            };
            function writeAfterEnd(stream, cb) {
              var er = new ERR_STREAM_WRITE_AFTER_END();
              errorOrDestroy(stream, er);
              process.nextTick(cb, er);
            }
            function validChunk(stream, state, chunk, cb) {
              var er;
              if (chunk === null) {
                er = new ERR_STREAM_NULL_VALUES();
              } else if (typeof chunk !== "string" && !state.objectMode) {
                er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
              }
              if (er) {
                errorOrDestroy(stream, er);
                process.nextTick(cb, er);
                return false;
              }
              return true;
            }
            Writable.prototype.write = function(chunk, encoding, cb) {
              var state = this._writableState;
              var ret = false;
              var isBuf = !state.objectMode && _isUint8Array(chunk);
              if (isBuf && !Buffer2.isBuffer(chunk)) {
                chunk = _uint8ArrayToBuffer(chunk);
              }
              if (typeof encoding === "function") {
                cb = encoding;
                encoding = null;
              }
              if (isBuf)
                encoding = "buffer";
              else if (!encoding)
                encoding = state.defaultEncoding;
              if (typeof cb !== "function")
                cb = nop;
              if (state.ending)
                writeAfterEnd(this, cb);
              else if (isBuf || validChunk(this, state, chunk, cb)) {
                state.pendingcb++;
                ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
              }
              return ret;
            };
            Writable.prototype.cork = function() {
              this._writableState.corked++;
            };
            Writable.prototype.uncork = function() {
              var state = this._writableState;
              if (state.corked) {
                state.corked--;
                if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
                  clearBuffer(this, state);
              }
            };
            Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
              if (typeof encoding === "string")
                encoding = encoding.toLowerCase();
              if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
                throw new ERR_UNKNOWN_ENCODING(encoding);
              this._writableState.defaultEncoding = encoding;
              return this;
            };
            Object.defineProperty(Writable.prototype, "writableBuffer", {
              enumerable: false,
              get: function get() {
                return this._writableState && this._writableState.getBuffer();
              }
            });
            function decodeChunk(state, chunk, encoding) {
              if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
                chunk = Buffer2.from(chunk, encoding);
              }
              return chunk;
            }
            Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
              enumerable: false,
              get: function get() {
                return this._writableState.highWaterMark;
              }
            });
            function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
              if (!isBuf) {
                var newChunk = decodeChunk(state, chunk, encoding);
                if (chunk !== newChunk) {
                  isBuf = true;
                  encoding = "buffer";
                  chunk = newChunk;
                }
              }
              var len = state.objectMode ? 1 : chunk.length;
              state.length += len;
              var ret = state.length < state.highWaterMark;
              if (!ret)
                state.needDrain = true;
              if (state.writing || state.corked) {
                var last = state.lastBufferedRequest;
                state.lastBufferedRequest = {
                  chunk,
                  encoding,
                  isBuf,
                  callback: cb,
                  next: null
                };
                if (last) {
                  last.next = state.lastBufferedRequest;
                } else {
                  state.bufferedRequest = state.lastBufferedRequest;
                }
                state.bufferedRequestCount += 1;
              } else {
                doWrite(stream, state, false, len, chunk, encoding, cb);
              }
              return ret;
            }
            function doWrite(stream, state, writev, len, chunk, encoding, cb) {
              state.writelen = len;
              state.writecb = cb;
              state.writing = true;
              state.sync = true;
              if (state.destroyed)
                state.onwrite(new ERR_STREAM_DESTROYED("write"));
              else if (writev)
                stream._writev(chunk, state.onwrite);
              else
                stream._write(chunk, encoding, state.onwrite);
              state.sync = false;
            }
            function onwriteError(stream, state, sync, er, cb) {
              --state.pendingcb;
              if (sync) {
                process.nextTick(cb, er);
                process.nextTick(finishMaybe, stream, state);
                stream._writableState.errorEmitted = true;
                errorOrDestroy(stream, er);
              } else {
                cb(er);
                stream._writableState.errorEmitted = true;
                errorOrDestroy(stream, er);
                finishMaybe(stream, state);
              }
            }
            function onwriteStateUpdate(state) {
              state.writing = false;
              state.writecb = null;
              state.length -= state.writelen;
              state.writelen = 0;
            }
            function onwrite(stream, er) {
              var state = stream._writableState;
              var sync = state.sync;
              var cb = state.writecb;
              if (typeof cb !== "function")
                throw new ERR_MULTIPLE_CALLBACK();
              onwriteStateUpdate(state);
              if (er)
                onwriteError(stream, state, sync, er, cb);
              else {
                var finished = needFinish(state) || stream.destroyed;
                if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
                  clearBuffer(stream, state);
                }
                if (sync) {
                  process.nextTick(afterWrite, stream, state, finished, cb);
                } else {
                  afterWrite(stream, state, finished, cb);
                }
              }
            }
            function afterWrite(stream, state, finished, cb) {
              if (!finished)
                onwriteDrain(stream, state);
              state.pendingcb--;
              cb();
              finishMaybe(stream, state);
            }
            function onwriteDrain(stream, state) {
              if (state.length === 0 && state.needDrain) {
                state.needDrain = false;
                stream.emit("drain");
              }
            }
            function clearBuffer(stream, state) {
              state.bufferProcessing = true;
              var entry = state.bufferedRequest;
              if (stream._writev && entry && entry.next) {
                var l = state.bufferedRequestCount;
                var buffer = new Array(l);
                var holder = state.corkedRequestsFree;
                holder.entry = entry;
                var count = 0;
                var allBuffers = true;
                while (entry) {
                  buffer[count] = entry;
                  if (!entry.isBuf)
                    allBuffers = false;
                  entry = entry.next;
                  count += 1;
                }
                buffer.allBuffers = allBuffers;
                doWrite(stream, state, true, state.length, buffer, "", holder.finish);
                state.pendingcb++;
                state.lastBufferedRequest = null;
                if (holder.next) {
                  state.corkedRequestsFree = holder.next;
                  holder.next = null;
                } else {
                  state.corkedRequestsFree = new CorkedRequest(state);
                }
                state.bufferedRequestCount = 0;
              } else {
                while (entry) {
                  var chunk = entry.chunk;
                  var encoding = entry.encoding;
                  var cb = entry.callback;
                  var len = state.objectMode ? 1 : chunk.length;
                  doWrite(stream, state, false, len, chunk, encoding, cb);
                  entry = entry.next;
                  state.bufferedRequestCount--;
                  if (state.writing) {
                    break;
                  }
                }
                if (entry === null)
                  state.lastBufferedRequest = null;
              }
              state.bufferedRequest = entry;
              state.bufferProcessing = false;
            }
            Writable.prototype._write = function(chunk, encoding, cb) {
              cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
            };
            Writable.prototype._writev = null;
            Writable.prototype.end = function(chunk, encoding, cb) {
              var state = this._writableState;
              if (typeof chunk === "function") {
                cb = chunk;
                chunk = null;
                encoding = null;
              } else if (typeof encoding === "function") {
                cb = encoding;
                encoding = null;
              }
              if (chunk !== null && chunk !== void 0)
                this.write(chunk, encoding);
              if (state.corked) {
                state.corked = 1;
                this.uncork();
              }
              if (!state.ending)
                endWritable(this, state, cb);
              return this;
            };
            Object.defineProperty(Writable.prototype, "writableLength", {
              enumerable: false,
              get: function get() {
                return this._writableState.length;
              }
            });
            function needFinish(state) {
              return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
            }
            function callFinal(stream, state) {
              stream._final(function(err) {
                state.pendingcb--;
                if (err) {
                  errorOrDestroy(stream, err);
                }
                state.prefinished = true;
                stream.emit("prefinish");
                finishMaybe(stream, state);
              });
            }
            function prefinish(stream, state) {
              if (!state.prefinished && !state.finalCalled) {
                if (typeof stream._final === "function" && !state.destroyed) {
                  state.pendingcb++;
                  state.finalCalled = true;
                  process.nextTick(callFinal, stream, state);
                } else {
                  state.prefinished = true;
                  stream.emit("prefinish");
                }
              }
            }
            function finishMaybe(stream, state) {
              var need = needFinish(state);
              if (need) {
                prefinish(stream, state);
                if (state.pendingcb === 0) {
                  state.finished = true;
                  stream.emit("finish");
                  if (state.autoDestroy) {
                    var rState = stream._readableState;
                    if (!rState || rState.autoDestroy && rState.endEmitted) {
                      stream.destroy();
                    }
                  }
                }
              }
              return need;
            }
            function endWritable(stream, state, cb) {
              state.ending = true;
              finishMaybe(stream, state);
              if (cb) {
                if (state.finished)
                  process.nextTick(cb);
                else
                  stream.once("finish", cb);
              }
              state.ended = true;
              stream.writable = false;
            }
            function onCorkedFinish(corkReq, state, err) {
              var entry = corkReq.entry;
              corkReq.entry = null;
              while (entry) {
                var cb = entry.callback;
                state.pendingcb--;
                cb(err);
                entry = entry.next;
              }
              state.corkedRequestsFree.next = corkReq;
            }
            Object.defineProperty(Writable.prototype, "destroyed", {
              enumerable: false,
              get: function get() {
                if (this._writableState === void 0) {
                  return false;
                }
                return this._writableState.destroyed;
              },
              set: function set(value) {
                if (!this._writableState) {
                  return;
                }
                this._writableState.destroyed = value;
              }
            });
            Writable.prototype.destroy = destroyImpl.destroy;
            Writable.prototype._undestroy = destroyImpl.undestroy;
            Writable.prototype._destroy = function(err, cb) {
              cb(err);
            };
          }).call(this);
        }).call(this, require2("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "../errors": 12, "./_stream_duplex": 13, "./internal/streams/destroy": 20, "./internal/streams/state": 24, "./internal/streams/stream": 25, "_process": 9, "buffer": 5, "inherits": 8, "util-deprecate": 28 }], 18: [function(require2, module4, exports3) {
        (function(process) {
          (function() {
            "use strict";
            var _Object$setPrototypeO;
            function _defineProperty(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }
              return obj;
            }
            var finished = require2("./end-of-stream");
            var kLastResolve = Symbol("lastResolve");
            var kLastReject = Symbol("lastReject");
            var kError = Symbol("error");
            var kEnded = Symbol("ended");
            var kLastPromise = Symbol("lastPromise");
            var kHandlePromise = Symbol("handlePromise");
            var kStream = Symbol("stream");
            function createIterResult(value, done) {
              return {
                value,
                done
              };
            }
            function readAndResolve(iter) {
              var resolve = iter[kLastResolve];
              if (resolve !== null) {
                var data = iter[kStream].read();
                if (data !== null) {
                  iter[kLastPromise] = null;
                  iter[kLastResolve] = null;
                  iter[kLastReject] = null;
                  resolve(createIterResult(data, false));
                }
              }
            }
            function onReadable(iter) {
              process.nextTick(readAndResolve, iter);
            }
            function wrapForNext(lastPromise, iter) {
              return function(resolve, reject) {
                lastPromise.then(function() {
                  if (iter[kEnded]) {
                    resolve(createIterResult(void 0, true));
                    return;
                  }
                  iter[kHandlePromise](resolve, reject);
                }, reject);
              };
            }
            var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
            });
            var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
              get stream() {
                return this[kStream];
              },
              next: function next() {
                var _this = this;
                var error = this[kError];
                if (error !== null) {
                  return Promise.reject(error);
                }
                if (this[kEnded]) {
                  return Promise.resolve(createIterResult(void 0, true));
                }
                if (this[kStream].destroyed) {
                  return new Promise(function(resolve, reject) {
                    process.nextTick(function() {
                      if (_this[kError]) {
                        reject(_this[kError]);
                      } else {
                        resolve(createIterResult(void 0, true));
                      }
                    });
                  });
                }
                var lastPromise = this[kLastPromise];
                var promise;
                if (lastPromise) {
                  promise = new Promise(wrapForNext(lastPromise, this));
                } else {
                  var data = this[kStream].read();
                  if (data !== null) {
                    return Promise.resolve(createIterResult(data, false));
                  }
                  promise = new Promise(this[kHandlePromise]);
                }
                this[kLastPromise] = promise;
                return promise;
              }
            }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
              return this;
            }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
              var _this2 = this;
              return new Promise(function(resolve, reject) {
                _this2[kStream].destroy(null, function(err) {
                  if (err) {
                    reject(err);
                    return;
                  }
                  resolve(createIterResult(void 0, true));
                });
              });
            }), _Object$setPrototypeO), AsyncIteratorPrototype);
            var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
              var _Object$create;
              var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
                value: stream,
                writable: true
              }), _defineProperty(_Object$create, kLastResolve, {
                value: null,
                writable: true
              }), _defineProperty(_Object$create, kLastReject, {
                value: null,
                writable: true
              }), _defineProperty(_Object$create, kError, {
                value: null,
                writable: true
              }), _defineProperty(_Object$create, kEnded, {
                value: stream._readableState.endEmitted,
                writable: true
              }), _defineProperty(_Object$create, kHandlePromise, {
                value: function value(resolve, reject) {
                  var data = iterator[kStream].read();
                  if (data) {
                    iterator[kLastPromise] = null;
                    iterator[kLastResolve] = null;
                    iterator[kLastReject] = null;
                    resolve(createIterResult(data, false));
                  } else {
                    iterator[kLastResolve] = resolve;
                    iterator[kLastReject] = reject;
                  }
                },
                writable: true
              }), _Object$create));
              iterator[kLastPromise] = null;
              finished(stream, function(err) {
                if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
                  var reject = iterator[kLastReject];
                  if (reject !== null) {
                    iterator[kLastPromise] = null;
                    iterator[kLastResolve] = null;
                    iterator[kLastReject] = null;
                    reject(err);
                  }
                  iterator[kError] = err;
                  return;
                }
                var resolve = iterator[kLastResolve];
                if (resolve !== null) {
                  iterator[kLastPromise] = null;
                  iterator[kLastResolve] = null;
                  iterator[kLastReject] = null;
                  resolve(createIterResult(void 0, true));
                }
                iterator[kEnded] = true;
              });
              stream.on("readable", onReadable.bind(null, iterator));
              return iterator;
            };
            module4.exports = createReadableStreamAsyncIterator;
          }).call(this);
        }).call(this, require2("_process"));
      }, { "./end-of-stream": 21, "_process": 9 }], 19: [function(require2, module4, exports3) {
        "use strict";
        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly)
              symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              });
            keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
              ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }
          return target;
        }
        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps)
            _defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            _defineProperties(Constructor, staticProps);
          return Constructor;
        }
        var _require = require2("buffer"), Buffer2 = _require.Buffer;
        var _require2 = require2("util"), inspect = _require2.inspect;
        var custom = inspect && inspect.custom || "inspect";
        function copyBuffer(src, target, offset) {
          Buffer2.prototype.copy.call(src, target, offset);
        }
        module4.exports = /* @__PURE__ */ function() {
          function BufferList() {
            _classCallCheck(this, BufferList);
            this.head = null;
            this.tail = null;
            this.length = 0;
          }
          _createClass(BufferList, [{
            key: "push",
            value: function push(v) {
              var entry = {
                data: v,
                next: null
              };
              if (this.length > 0)
                this.tail.next = entry;
              else
                this.head = entry;
              this.tail = entry;
              ++this.length;
            }
          }, {
            key: "unshift",
            value: function unshift(v) {
              var entry = {
                data: v,
                next: this.head
              };
              if (this.length === 0)
                this.tail = entry;
              this.head = entry;
              ++this.length;
            }
          }, {
            key: "shift",
            value: function shift() {
              if (this.length === 0)
                return;
              var ret = this.head.data;
              if (this.length === 1)
                this.head = this.tail = null;
              else
                this.head = this.head.next;
              --this.length;
              return ret;
            }
          }, {
            key: "clear",
            value: function clear() {
              this.head = this.tail = null;
              this.length = 0;
            }
          }, {
            key: "join",
            value: function join(s) {
              if (this.length === 0)
                return "";
              var p = this.head;
              var ret = "" + p.data;
              while (p = p.next) {
                ret += s + p.data;
              }
              return ret;
            }
          }, {
            key: "concat",
            value: function concat(n) {
              if (this.length === 0)
                return Buffer2.alloc(0);
              var ret = Buffer2.allocUnsafe(n >>> 0);
              var p = this.head;
              var i = 0;
              while (p) {
                copyBuffer(p.data, ret, i);
                i += p.data.length;
                p = p.next;
              }
              return ret;
            }
          }, {
            key: "consume",
            value: function consume(n, hasStrings) {
              var ret;
              if (n < this.head.data.length) {
                ret = this.head.data.slice(0, n);
                this.head.data = this.head.data.slice(n);
              } else if (n === this.head.data.length) {
                ret = this.shift();
              } else {
                ret = hasStrings ? this._getString(n) : this._getBuffer(n);
              }
              return ret;
            }
          }, {
            key: "first",
            value: function first() {
              return this.head.data;
            }
          }, {
            key: "_getString",
            value: function _getString(n) {
              var p = this.head;
              var c = 1;
              var ret = p.data;
              n -= ret.length;
              while (p = p.next) {
                var str = p.data;
                var nb = n > str.length ? str.length : n;
                if (nb === str.length)
                  ret += str;
                else
                  ret += str.slice(0, n);
                n -= nb;
                if (n === 0) {
                  if (nb === str.length) {
                    ++c;
                    if (p.next)
                      this.head = p.next;
                    else
                      this.head = this.tail = null;
                  } else {
                    this.head = p;
                    p.data = str.slice(nb);
                  }
                  break;
                }
                ++c;
              }
              this.length -= c;
              return ret;
            }
          }, {
            key: "_getBuffer",
            value: function _getBuffer(n) {
              var ret = Buffer2.allocUnsafe(n);
              var p = this.head;
              var c = 1;
              p.data.copy(ret);
              n -= p.data.length;
              while (p = p.next) {
                var buf = p.data;
                var nb = n > buf.length ? buf.length : n;
                buf.copy(ret, ret.length - n, 0, nb);
                n -= nb;
                if (n === 0) {
                  if (nb === buf.length) {
                    ++c;
                    if (p.next)
                      this.head = p.next;
                    else
                      this.head = this.tail = null;
                  } else {
                    this.head = p;
                    p.data = buf.slice(nb);
                  }
                  break;
                }
                ++c;
              }
              this.length -= c;
              return ret;
            }
          }, {
            key: custom,
            value: function value(_, options) {
              return inspect(this, _objectSpread({}, options, {
                depth: 0,
                customInspect: false
              }));
            }
          }]);
          return BufferList;
        }();
      }, { "buffer": 5, "util": 4 }], 20: [function(require2, module4, exports3) {
        (function(process) {
          (function() {
            "use strict";
            function destroy(err, cb) {
              var _this = this;
              var readableDestroyed = this._readableState && this._readableState.destroyed;
              var writableDestroyed = this._writableState && this._writableState.destroyed;
              if (readableDestroyed || writableDestroyed) {
                if (cb) {
                  cb(err);
                } else if (err) {
                  if (!this._writableState) {
                    process.nextTick(emitErrorNT, this, err);
                  } else if (!this._writableState.errorEmitted) {
                    this._writableState.errorEmitted = true;
                    process.nextTick(emitErrorNT, this, err);
                  }
                }
                return this;
              }
              if (this._readableState) {
                this._readableState.destroyed = true;
              }
              if (this._writableState) {
                this._writableState.destroyed = true;
              }
              this._destroy(err || null, function(err2) {
                if (!cb && err2) {
                  if (!_this._writableState) {
                    process.nextTick(emitErrorAndCloseNT, _this, err2);
                  } else if (!_this._writableState.errorEmitted) {
                    _this._writableState.errorEmitted = true;
                    process.nextTick(emitErrorAndCloseNT, _this, err2);
                  } else {
                    process.nextTick(emitCloseNT, _this);
                  }
                } else if (cb) {
                  process.nextTick(emitCloseNT, _this);
                  cb(err2);
                } else {
                  process.nextTick(emitCloseNT, _this);
                }
              });
              return this;
            }
            function emitErrorAndCloseNT(self2, err) {
              emitErrorNT(self2, err);
              emitCloseNT(self2);
            }
            function emitCloseNT(self2) {
              if (self2._writableState && !self2._writableState.emitClose)
                return;
              if (self2._readableState && !self2._readableState.emitClose)
                return;
              self2.emit("close");
            }
            function undestroy() {
              if (this._readableState) {
                this._readableState.destroyed = false;
                this._readableState.reading = false;
                this._readableState.ended = false;
                this._readableState.endEmitted = false;
              }
              if (this._writableState) {
                this._writableState.destroyed = false;
                this._writableState.ended = false;
                this._writableState.ending = false;
                this._writableState.finalCalled = false;
                this._writableState.prefinished = false;
                this._writableState.finished = false;
                this._writableState.errorEmitted = false;
              }
            }
            function emitErrorNT(self2, err) {
              self2.emit("error", err);
            }
            function errorOrDestroy(stream, err) {
              var rState = stream._readableState;
              var wState = stream._writableState;
              if (rState && rState.autoDestroy || wState && wState.autoDestroy)
                stream.destroy(err);
              else
                stream.emit("error", err);
            }
            module4.exports = {
              destroy,
              undestroy,
              errorOrDestroy
            };
          }).call(this);
        }).call(this, require2("_process"));
      }, { "_process": 9 }], 21: [function(require2, module4, exports3) {
        "use strict";
        var ERR_STREAM_PREMATURE_CLOSE = require2("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;
        function once(callback) {
          var called = false;
          return function() {
            if (called)
              return;
            called = true;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            callback.apply(this, args);
          };
        }
        function noop() {
        }
        function isRequest(stream) {
          return stream.setHeader && typeof stream.abort === "function";
        }
        function eos(stream, opts, callback) {
          if (typeof opts === "function")
            return eos(stream, null, opts);
          if (!opts)
            opts = {};
          callback = once(callback || noop);
          var readable = opts.readable || opts.readable !== false && stream.readable;
          var writable = opts.writable || opts.writable !== false && stream.writable;
          var onlegacyfinish = function onlegacyfinish2() {
            if (!stream.writable)
              onfinish();
          };
          var writableEnded = stream._writableState && stream._writableState.finished;
          var onfinish = function onfinish2() {
            writable = false;
            writableEnded = true;
            if (!readable)
              callback.call(stream);
          };
          var readableEnded = stream._readableState && stream._readableState.endEmitted;
          var onend = function onend2() {
            readable = false;
            readableEnded = true;
            if (!writable)
              callback.call(stream);
          };
          var onerror = function onerror2(err) {
            callback.call(stream, err);
          };
          var onclose = function onclose2() {
            var err;
            if (readable && !readableEnded) {
              if (!stream._readableState || !stream._readableState.ended)
                err = new ERR_STREAM_PREMATURE_CLOSE();
              return callback.call(stream, err);
            }
            if (writable && !writableEnded) {
              if (!stream._writableState || !stream._writableState.ended)
                err = new ERR_STREAM_PREMATURE_CLOSE();
              return callback.call(stream, err);
            }
          };
          var onrequest = function onrequest2() {
            stream.req.on("finish", onfinish);
          };
          if (isRequest(stream)) {
            stream.on("complete", onfinish);
            stream.on("abort", onclose);
            if (stream.req)
              onrequest();
            else
              stream.on("request", onrequest);
          } else if (writable && !stream._writableState) {
            stream.on("end", onlegacyfinish);
            stream.on("close", onlegacyfinish);
          }
          stream.on("end", onend);
          stream.on("finish", onfinish);
          if (opts.error !== false)
            stream.on("error", onerror);
          stream.on("close", onclose);
          return function() {
            stream.removeListener("complete", onfinish);
            stream.removeListener("abort", onclose);
            stream.removeListener("request", onrequest);
            if (stream.req)
              stream.req.removeListener("finish", onfinish);
            stream.removeListener("end", onlegacyfinish);
            stream.removeListener("close", onlegacyfinish);
            stream.removeListener("finish", onfinish);
            stream.removeListener("end", onend);
            stream.removeListener("error", onerror);
            stream.removeListener("close", onclose);
          };
        }
        module4.exports = eos;
      }, { "../../../errors": 12 }], 22: [function(require2, module4, exports3) {
        module4.exports = function() {
          throw new Error("Readable.from is not available in the browser");
        };
      }, {}], 23: [function(require2, module4, exports3) {
        "use strict";
        var eos;
        function once(callback) {
          var called = false;
          return function() {
            if (called)
              return;
            called = true;
            callback.apply(void 0, arguments);
          };
        }
        var _require$codes = require2("../../../errors").codes, ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
        function noop(err) {
          if (err)
            throw err;
        }
        function isRequest(stream) {
          return stream.setHeader && typeof stream.abort === "function";
        }
        function destroyer(stream, reading, writing, callback) {
          callback = once(callback);
          var closed = false;
          stream.on("close", function() {
            closed = true;
          });
          if (eos === void 0)
            eos = require2("./end-of-stream");
          eos(stream, {
            readable: reading,
            writable: writing
          }, function(err) {
            if (err)
              return callback(err);
            closed = true;
            callback();
          });
          var destroyed = false;
          return function(err) {
            if (closed)
              return;
            if (destroyed)
              return;
            destroyed = true;
            if (isRequest(stream))
              return stream.abort();
            if (typeof stream.destroy === "function")
              return stream.destroy();
            callback(err || new ERR_STREAM_DESTROYED("pipe"));
          };
        }
        function call(fn) {
          fn();
        }
        function pipe(from, to) {
          return from.pipe(to);
        }
        function popCallback(streams) {
          if (!streams.length)
            return noop;
          if (typeof streams[streams.length - 1] !== "function")
            return noop;
          return streams.pop();
        }
        function pipeline() {
          for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
            streams[_key] = arguments[_key];
          }
          var callback = popCallback(streams);
          if (Array.isArray(streams[0]))
            streams = streams[0];
          if (streams.length < 2) {
            throw new ERR_MISSING_ARGS("streams");
          }
          var error;
          var destroys = streams.map(function(stream, i) {
            var reading = i < streams.length - 1;
            var writing = i > 0;
            return destroyer(stream, reading, writing, function(err) {
              if (!error)
                error = err;
              if (err)
                destroys.forEach(call);
              if (reading)
                return;
              destroys.forEach(call);
              callback(error);
            });
          });
          return streams.reduce(pipe);
        }
        module4.exports = pipeline;
      }, { "../../../errors": 12, "./end-of-stream": 21 }], 24: [function(require2, module4, exports3) {
        "use strict";
        var ERR_INVALID_OPT_VALUE = require2("../../../errors").codes.ERR_INVALID_OPT_VALUE;
        function highWaterMarkFrom(options, isDuplex, duplexKey) {
          return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
        }
        function getHighWaterMark(state, options, duplexKey, isDuplex) {
          var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
          if (hwm != null) {
            if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
              var name = isDuplex ? duplexKey : "highWaterMark";
              throw new ERR_INVALID_OPT_VALUE(name, hwm);
            }
            return Math.floor(hwm);
          }
          return state.objectMode ? 16 : 16 * 1024;
        }
        module4.exports = {
          getHighWaterMark
        };
      }, { "../../../errors": 12 }], 25: [function(require2, module4, exports3) {
        module4.exports = require2("events").EventEmitter;
      }, { "events": 6 }], 26: [function(require2, module4, exports3) {
        "use strict";
        var Buffer2 = require2("safe-buffer").Buffer;
        var isEncoding = Buffer2.isEncoding || function(encoding) {
          encoding = "" + encoding;
          switch (encoding && encoding.toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
            case "raw":
              return true;
            default:
              return false;
          }
        };
        function _normalizeEncoding(enc) {
          if (!enc)
            return "utf8";
          var retried;
          while (true) {
            switch (enc) {
              case "utf8":
              case "utf-8":
                return "utf8";
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return "utf16le";
              case "latin1":
              case "binary":
                return "latin1";
              case "base64":
              case "ascii":
              case "hex":
                return enc;
              default:
                if (retried)
                  return;
                enc = ("" + enc).toLowerCase();
                retried = true;
            }
          }
        }
        ;
        function normalizeEncoding(enc) {
          var nenc = _normalizeEncoding(enc);
          if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc)))
            throw new Error("Unknown encoding: " + enc);
          return nenc || enc;
        }
        exports3.StringDecoder = StringDecoder;
        function StringDecoder(encoding) {
          this.encoding = normalizeEncoding(encoding);
          var nb;
          switch (this.encoding) {
            case "utf16le":
              this.text = utf16Text;
              this.end = utf16End;
              nb = 4;
              break;
            case "utf8":
              this.fillLast = utf8FillLast;
              nb = 4;
              break;
            case "base64":
              this.text = base64Text;
              this.end = base64End;
              nb = 3;
              break;
            default:
              this.write = simpleWrite;
              this.end = simpleEnd;
              return;
          }
          this.lastNeed = 0;
          this.lastTotal = 0;
          this.lastChar = Buffer2.allocUnsafe(nb);
        }
        StringDecoder.prototype.write = function(buf) {
          if (buf.length === 0)
            return "";
          var r;
          var i;
          if (this.lastNeed) {
            r = this.fillLast(buf);
            if (r === void 0)
              return "";
            i = this.lastNeed;
            this.lastNeed = 0;
          } else {
            i = 0;
          }
          if (i < buf.length)
            return r ? r + this.text(buf, i) : this.text(buf, i);
          return r || "";
        };
        StringDecoder.prototype.end = utf8End;
        StringDecoder.prototype.text = utf8Text;
        StringDecoder.prototype.fillLast = function(buf) {
          if (this.lastNeed <= buf.length) {
            buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
            return this.lastChar.toString(this.encoding, 0, this.lastTotal);
          }
          buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
          this.lastNeed -= buf.length;
        };
        function utf8CheckByte(byte) {
          if (byte <= 127)
            return 0;
          else if (byte >> 5 === 6)
            return 2;
          else if (byte >> 4 === 14)
            return 3;
          else if (byte >> 3 === 30)
            return 4;
          return byte >> 6 === 2 ? -1 : -2;
        }
        function utf8CheckIncomplete(self2, buf, i) {
          var j = buf.length - 1;
          if (j < i)
            return 0;
          var nb = utf8CheckByte(buf[j]);
          if (nb >= 0) {
            if (nb > 0)
              self2.lastNeed = nb - 1;
            return nb;
          }
          if (--j < i || nb === -2)
            return 0;
          nb = utf8CheckByte(buf[j]);
          if (nb >= 0) {
            if (nb > 0)
              self2.lastNeed = nb - 2;
            return nb;
          }
          if (--j < i || nb === -2)
            return 0;
          nb = utf8CheckByte(buf[j]);
          if (nb >= 0) {
            if (nb > 0) {
              if (nb === 2)
                nb = 0;
              else
                self2.lastNeed = nb - 3;
            }
            return nb;
          }
          return 0;
        }
        function utf8CheckExtraBytes(self2, buf, p) {
          if ((buf[0] & 192) !== 128) {
            self2.lastNeed = 0;
            return "\uFFFD";
          }
          if (self2.lastNeed > 1 && buf.length > 1) {
            if ((buf[1] & 192) !== 128) {
              self2.lastNeed = 1;
              return "\uFFFD";
            }
            if (self2.lastNeed > 2 && buf.length > 2) {
              if ((buf[2] & 192) !== 128) {
                self2.lastNeed = 2;
                return "\uFFFD";
              }
            }
          }
        }
        function utf8FillLast(buf) {
          var p = this.lastTotal - this.lastNeed;
          var r = utf8CheckExtraBytes(this, buf, p);
          if (r !== void 0)
            return r;
          if (this.lastNeed <= buf.length) {
            buf.copy(this.lastChar, p, 0, this.lastNeed);
            return this.lastChar.toString(this.encoding, 0, this.lastTotal);
          }
          buf.copy(this.lastChar, p, 0, buf.length);
          this.lastNeed -= buf.length;
        }
        function utf8Text(buf, i) {
          var total = utf8CheckIncomplete(this, buf, i);
          if (!this.lastNeed)
            return buf.toString("utf8", i);
          this.lastTotal = total;
          var end = buf.length - (total - this.lastNeed);
          buf.copy(this.lastChar, 0, end);
          return buf.toString("utf8", i, end);
        }
        function utf8End(buf) {
          var r = buf && buf.length ? this.write(buf) : "";
          if (this.lastNeed)
            return r + "\uFFFD";
          return r;
        }
        function utf16Text(buf, i) {
          if ((buf.length - i) % 2 === 0) {
            var r = buf.toString("utf16le", i);
            if (r) {
              var c = r.charCodeAt(r.length - 1);
              if (c >= 55296 && c <= 56319) {
                this.lastNeed = 2;
                this.lastTotal = 4;
                this.lastChar[0] = buf[buf.length - 2];
                this.lastChar[1] = buf[buf.length - 1];
                return r.slice(0, -1);
              }
            }
            return r;
          }
          this.lastNeed = 1;
          this.lastTotal = 2;
          this.lastChar[0] = buf[buf.length - 1];
          return buf.toString("utf16le", i, buf.length - 1);
        }
        function utf16End(buf) {
          var r = buf && buf.length ? this.write(buf) : "";
          if (this.lastNeed) {
            var end = this.lastTotal - this.lastNeed;
            return r + this.lastChar.toString("utf16le", 0, end);
          }
          return r;
        }
        function base64Text(buf, i) {
          var n = (buf.length - i) % 3;
          if (n === 0)
            return buf.toString("base64", i);
          this.lastNeed = 3 - n;
          this.lastTotal = 3;
          if (n === 1) {
            this.lastChar[0] = buf[buf.length - 1];
          } else {
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
          }
          return buf.toString("base64", i, buf.length - n);
        }
        function base64End(buf) {
          var r = buf && buf.length ? this.write(buf) : "";
          if (this.lastNeed)
            return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
          return r;
        }
        function simpleWrite(buf) {
          return buf.toString(this.encoding);
        }
        function simpleEnd(buf) {
          return buf && buf.length ? this.write(buf) : "";
        }
      }, { "safe-buffer": 10 }], 27: [function(require2, module4, exports3) {
        (function(setImmediate, clearImmediate) {
          (function() {
            var nextTick = require2("process/browser.js").nextTick;
            var apply = Function.prototype.apply;
            var slice = Array.prototype.slice;
            var immediateIds = {};
            var nextImmediateId = 0;
            exports3.setTimeout = function() {
              return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
            };
            exports3.setInterval = function() {
              return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
            };
            exports3.clearTimeout = exports3.clearInterval = function(timeout) {
              timeout.close();
            };
            function Timeout(id, clearFn) {
              this._id = id;
              this._clearFn = clearFn;
            }
            Timeout.prototype.unref = Timeout.prototype.ref = function() {
            };
            Timeout.prototype.close = function() {
              this._clearFn.call(window, this._id);
            };
            exports3.enroll = function(item, msecs) {
              clearTimeout(item._idleTimeoutId);
              item._idleTimeout = msecs;
            };
            exports3.unenroll = function(item) {
              clearTimeout(item._idleTimeoutId);
              item._idleTimeout = -1;
            };
            exports3._unrefActive = exports3.active = function(item) {
              clearTimeout(item._idleTimeoutId);
              var msecs = item._idleTimeout;
              if (msecs >= 0) {
                item._idleTimeoutId = setTimeout(function onTimeout() {
                  if (item._onTimeout)
                    item._onTimeout();
                }, msecs);
              }
            };
            exports3.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
              var id = nextImmediateId++;
              var args = arguments.length < 2 ? false : slice.call(arguments, 1);
              immediateIds[id] = true;
              nextTick(function onNextTick() {
                if (immediateIds[id]) {
                  if (args) {
                    fn.apply(null, args);
                  } else {
                    fn.call(null);
                  }
                  exports3.clearImmediate(id);
                }
              });
              return id;
            };
            exports3.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
              delete immediateIds[id];
            };
          }).call(this);
        }).call(this, require2("timers").setImmediate, require2("timers").clearImmediate);
      }, { "process/browser.js": 9, "timers": 27 }], 28: [function(require2, module4, exports3) {
        (function(global2) {
          (function() {
            module4.exports = deprecate;
            function deprecate(fn, msg) {
              if (config("noDeprecation")) {
                return fn;
              }
              var warned = false;
              function deprecated() {
                if (!warned) {
                  if (config("throwDeprecation")) {
                    throw new Error(msg);
                  } else if (config("traceDeprecation")) {
                    console.trace(msg);
                  } else {
                    console.warn(msg);
                  }
                  warned = true;
                }
                return fn.apply(this, arguments);
              }
              return deprecated;
            }
            function config(name) {
              try {
                if (!global2.localStorage)
                  return false;
              } catch (_) {
                return false;
              }
              var val = global2.localStorage[name];
              if (val == null)
                return false;
              return String(val).toLowerCase() === "true";
            }
          }).call(this);
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}] }, {}, [2])(2);
    });
  }
});

// ../../node_modules/papaparse/papaparse.min.js
var require_papaparse_min = __commonJS({
  "../../node_modules/papaparse/papaparse.min.js"(exports, module2) {
    !function(e, t) {
      typeof define == "function" && define.amd ? define([], t) : typeof module2 == "object" && typeof exports != "undefined" ? module2.exports = t() : e.Papa = t();
    }(exports, function s() {
      "use strict";
      var f = typeof self != "undefined" ? self : typeof window != "undefined" ? window : f !== void 0 ? f : {};
      var n = !f.document && !!f.postMessage, o = n && /blob:/i.test((f.location || {}).protocol), a = {}, h = 0, b = { parse: function(e, t) {
        var i2 = (t = t || {}).dynamicTyping || false;
        M(i2) && (t.dynamicTypingFunction = i2, i2 = {});
        if (t.dynamicTyping = i2, t.transform = !!M(t.transform) && t.transform, t.worker && b.WORKERS_SUPPORTED) {
          var r = function() {
            if (!b.WORKERS_SUPPORTED)
              return false;
            var e2 = (i3 = f.URL || f.webkitURL || null, r2 = s.toString(), b.BLOB_URL || (b.BLOB_URL = i3.createObjectURL(new Blob(["(", r2, ")();"], { type: "text/javascript" })))), t2 = new f.Worker(e2);
            var i3, r2;
            return t2.onmessage = _, t2.id = h++, a[t2.id] = t2;
          }();
          return r.userStep = t.step, r.userChunk = t.chunk, r.userComplete = t.complete, r.userError = t.error, t.step = M(t.step), t.chunk = M(t.chunk), t.complete = M(t.complete), t.error = M(t.error), delete t.worker, void r.postMessage({ input: e, config: t, workerId: r.id });
        }
        var n2 = null;
        b.NODE_STREAM_INPUT, typeof e == "string" ? n2 = t.download ? new l(t) : new p(t) : e.readable === true && M(e.read) && M(e.on) ? n2 = new g(t) : (f.File && e instanceof File || e instanceof Object) && (n2 = new c(t));
        return n2.stream(e);
      }, unparse: function(e, t) {
        var n2 = false, _2 = true, m2 = ",", y2 = "\r\n", s2 = '"', a2 = s2 + s2, i2 = false, r = null, o2 = false;
        !function() {
          if (typeof t != "object")
            return;
          typeof t.delimiter != "string" || b.BAD_DELIMITERS.filter(function(e2) {
            return t.delimiter.indexOf(e2) !== -1;
          }).length || (m2 = t.delimiter);
          (typeof t.quotes == "boolean" || typeof t.quotes == "function" || Array.isArray(t.quotes)) && (n2 = t.quotes);
          typeof t.skipEmptyLines != "boolean" && typeof t.skipEmptyLines != "string" || (i2 = t.skipEmptyLines);
          typeof t.newline == "string" && (y2 = t.newline);
          typeof t.quoteChar == "string" && (s2 = t.quoteChar);
          typeof t.header == "boolean" && (_2 = t.header);
          if (Array.isArray(t.columns)) {
            if (t.columns.length === 0)
              throw new Error("Option columns is empty");
            r = t.columns;
          }
          t.escapeChar !== void 0 && (a2 = t.escapeChar + s2);
          typeof t.escapeFormulae == "boolean" && (o2 = t.escapeFormulae);
        }();
        var h2 = new RegExp(j(s2), "g");
        typeof e == "string" && (e = JSON.parse(e));
        if (Array.isArray(e)) {
          if (!e.length || Array.isArray(e[0]))
            return u2(null, e, i2);
          if (typeof e[0] == "object")
            return u2(r || Object.keys(e[0]), e, i2);
        } else if (typeof e == "object")
          return typeof e.data == "string" && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : typeof e.data[0] == "object" ? Object.keys(e.data[0]) : []), Array.isArray(e.data[0]) || typeof e.data[0] == "object" || (e.data = [e.data])), u2(e.fields || [], e.data || [], i2);
        throw new Error("Unable to serialize unrecognized input");
        function u2(e2, t2, i3) {
          var r2 = "";
          typeof e2 == "string" && (e2 = JSON.parse(e2)), typeof t2 == "string" && (t2 = JSON.parse(t2));
          var n3 = Array.isArray(e2) && 0 < e2.length, s3 = !Array.isArray(t2[0]);
          if (n3 && _2) {
            for (var a3 = 0; a3 < e2.length; a3++)
              0 < a3 && (r2 += m2), r2 += v2(e2[a3], a3);
            0 < t2.length && (r2 += y2);
          }
          for (var o3 = 0; o3 < t2.length; o3++) {
            var h3 = n3 ? e2.length : t2[o3].length, u3 = false, f2 = n3 ? Object.keys(t2[o3]).length === 0 : t2[o3].length === 0;
            if (i3 && !n3 && (u3 = i3 === "greedy" ? t2[o3].join("").trim() === "" : t2[o3].length === 1 && t2[o3][0].length === 0), i3 === "greedy" && n3) {
              for (var d2 = [], l2 = 0; l2 < h3; l2++) {
                var c2 = s3 ? e2[l2] : l2;
                d2.push(t2[o3][c2]);
              }
              u3 = d2.join("").trim() === "";
            }
            if (!u3) {
              for (var p2 = 0; p2 < h3; p2++) {
                0 < p2 && !f2 && (r2 += m2);
                var g2 = n3 && s3 ? e2[p2] : p2;
                r2 += v2(t2[o3][g2], p2);
              }
              o3 < t2.length - 1 && (!i3 || 0 < h3 && !f2) && (r2 += y2);
            }
          }
          return r2;
        }
        function v2(e2, t2) {
          if (e2 == null)
            return "";
          if (e2.constructor === Date)
            return JSON.stringify(e2).slice(1, 25);
          o2 === true && typeof e2 == "string" && e2.match(/^[=+\-@].*$/) !== null && (e2 = "'" + e2);
          var i3 = e2.toString().replace(h2, a2), r2 = typeof n2 == "boolean" && n2 || typeof n2 == "function" && n2(e2, t2) || Array.isArray(n2) && n2[t2] || function(e3, t3) {
            for (var i4 = 0; i4 < t3.length; i4++)
              if (-1 < e3.indexOf(t3[i4]))
                return true;
            return false;
          }(i3, b.BAD_DELIMITERS) || -1 < i3.indexOf(m2) || i3.charAt(0) === " " || i3.charAt(i3.length - 1) === " ";
          return r2 ? s2 + i3 + s2 : i3;
        }
      } };
      if (b.RECORD_SEP = String.fromCharCode(30), b.UNIT_SEP = String.fromCharCode(31), b.BYTE_ORDER_MARK = "\uFEFF", b.BAD_DELIMITERS = ["\r", "\n", '"', b.BYTE_ORDER_MARK], b.WORKERS_SUPPORTED = !n && !!f.Worker, b.NODE_STREAM_INPUT = 1, b.LocalChunkSize = 10485760, b.RemoteChunkSize = 5242880, b.DefaultDelimiter = ",", b.Parser = E, b.ParserHandle = i, b.NetworkStreamer = l, b.FileStreamer = c, b.StringStreamer = p, b.ReadableStreamStreamer = g, f.jQuery) {
        var d = f.jQuery;
        d.fn.parse = function(o2) {
          var i2 = o2.config || {}, h2 = [];
          return this.each(function(e2) {
            if (!(d(this).prop("tagName").toUpperCase() === "INPUT" && d(this).attr("type").toLowerCase() === "file" && f.FileReader) || !this.files || this.files.length === 0)
              return true;
            for (var t = 0; t < this.files.length; t++)
              h2.push({ file: this.files[t], inputElem: this, instanceConfig: d.extend({}, i2) });
          }), e(), this;
          function e() {
            if (h2.length !== 0) {
              var e2, t, i3, r, n2 = h2[0];
              if (M(o2.before)) {
                var s2 = o2.before(n2.file, n2.inputElem);
                if (typeof s2 == "object") {
                  if (s2.action === "abort")
                    return e2 = "AbortError", t = n2.file, i3 = n2.inputElem, r = s2.reason, void (M(o2.error) && o2.error({ name: e2 }, t, i3, r));
                  if (s2.action === "skip")
                    return void u2();
                  typeof s2.config == "object" && (n2.instanceConfig = d.extend(n2.instanceConfig, s2.config));
                } else if (s2 === "skip")
                  return void u2();
              }
              var a2 = n2.instanceConfig.complete;
              n2.instanceConfig.complete = function(e3) {
                M(a2) && a2(e3, n2.file, n2.inputElem), u2();
              }, b.parse(n2.file, n2.instanceConfig);
            } else
              M(o2.complete) && o2.complete();
          }
          function u2() {
            h2.splice(0, 1), e();
          }
        };
      }
      function u(e) {
        this._handle = null, this._finished = false, this._completed = false, this._halted = false, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = true, this._completeResults = { data: [], errors: [], meta: {} }, function(e2) {
          var t = w(e2);
          t.chunkSize = parseInt(t.chunkSize), e2.step || e2.chunk || (t.chunkSize = null);
          this._handle = new i(t), (this._handle.streamer = this)._config = t;
        }.call(this, e), this.parseChunk = function(e2, t) {
          if (this.isFirstChunk && M(this._config.beforeFirstChunk)) {
            var i2 = this._config.beforeFirstChunk(e2);
            i2 !== void 0 && (e2 = i2);
          }
          this.isFirstChunk = false, this._halted = false;
          var r = this._partialLine + e2;
          this._partialLine = "";
          var n2 = this._handle.parse(r, this._baseIndex, !this._finished);
          if (!this._handle.paused() && !this._handle.aborted()) {
            var s2 = n2.meta.cursor;
            this._finished || (this._partialLine = r.substring(s2 - this._baseIndex), this._baseIndex = s2), n2 && n2.data && (this._rowCount += n2.data.length);
            var a2 = this._finished || this._config.preview && this._rowCount >= this._config.preview;
            if (o)
              f.postMessage({ results: n2, workerId: b.WORKER_ID, finished: a2 });
            else if (M(this._config.chunk) && !t) {
              if (this._config.chunk(n2, this._handle), this._handle.paused() || this._handle.aborted())
                return void (this._halted = true);
              n2 = void 0, this._completeResults = void 0;
            }
            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(n2.data), this._completeResults.errors = this._completeResults.errors.concat(n2.errors), this._completeResults.meta = n2.meta), this._completed || !a2 || !M(this._config.complete) || n2 && n2.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = true), a2 || n2 && n2.meta.paused || this._nextChunk(), n2;
          }
          this._halted = true;
        }, this._sendError = function(e2) {
          M(this._config.error) ? this._config.error(e2) : o && this._config.error && f.postMessage({ workerId: b.WORKER_ID, error: e2, finished: false });
        };
      }
      function l(e) {
        var r;
        (e = e || {}).chunkSize || (e.chunkSize = b.RemoteChunkSize), u.call(this, e), this._nextChunk = n ? function() {
          this._readChunk(), this._chunkLoaded();
        } : function() {
          this._readChunk();
        }, this.stream = function(e2) {
          this._input = e2, this._nextChunk();
        }, this._readChunk = function() {
          if (this._finished)
            this._chunkLoaded();
          else {
            if (r = new XMLHttpRequest(), this._config.withCredentials && (r.withCredentials = this._config.withCredentials), n || (r.onload = v(this._chunkLoaded, this), r.onerror = v(this._chunkError, this)), r.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !n), this._config.downloadRequestHeaders) {
              var e2 = this._config.downloadRequestHeaders;
              for (var t in e2)
                r.setRequestHeader(t, e2[t]);
            }
            if (this._config.chunkSize) {
              var i2 = this._start + this._config.chunkSize - 1;
              r.setRequestHeader("Range", "bytes=" + this._start + "-" + i2);
            }
            try {
              r.send(this._config.downloadRequestBody);
            } catch (e3) {
              this._chunkError(e3.message);
            }
            n && r.status === 0 && this._chunkError();
          }
        }, this._chunkLoaded = function() {
          r.readyState === 4 && (r.status < 200 || 400 <= r.status ? this._chunkError() : (this._start += this._config.chunkSize ? this._config.chunkSize : r.responseText.length, this._finished = !this._config.chunkSize || this._start >= function(e2) {
            var t = e2.getResponseHeader("Content-Range");
            if (t === null)
              return -1;
            return parseInt(t.substring(t.lastIndexOf("/") + 1));
          }(r), this.parseChunk(r.responseText)));
        }, this._chunkError = function(e2) {
          var t = r.statusText || e2;
          this._sendError(new Error(t));
        };
      }
      function c(e) {
        var r, n2;
        (e = e || {}).chunkSize || (e.chunkSize = b.LocalChunkSize), u.call(this, e);
        var s2 = typeof FileReader != "undefined";
        this.stream = function(e2) {
          this._input = e2, n2 = e2.slice || e2.webkitSlice || e2.mozSlice, s2 ? ((r = new FileReader()).onload = v(this._chunkLoaded, this), r.onerror = v(this._chunkError, this)) : r = new FileReaderSync(), this._nextChunk();
        }, this._nextChunk = function() {
          this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function() {
          var e2 = this._input;
          if (this._config.chunkSize) {
            var t = Math.min(this._start + this._config.chunkSize, this._input.size);
            e2 = n2.call(e2, this._start, t);
          }
          var i2 = r.readAsText(e2, this._config.encoding);
          s2 || this._chunkLoaded({ target: { result: i2 } });
        }, this._chunkLoaded = function(e2) {
          this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e2.target.result);
        }, this._chunkError = function() {
          this._sendError(r.error);
        };
      }
      function p(e) {
        var i2;
        u.call(this, e = e || {}), this.stream = function(e2) {
          return i2 = e2, this._nextChunk();
        }, this._nextChunk = function() {
          if (!this._finished) {
            var e2, t = this._config.chunkSize;
            return t ? (e2 = i2.substring(0, t), i2 = i2.substring(t)) : (e2 = i2, i2 = ""), this._finished = !i2, this.parseChunk(e2);
          }
        };
      }
      function g(e) {
        u.call(this, e = e || {});
        var t = [], i2 = true, r = false;
        this.pause = function() {
          u.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function() {
          u.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function(e2) {
          this._input = e2, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function() {
          r && t.length === 1 && (this._finished = true);
        }, this._nextChunk = function() {
          this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : i2 = true;
        }, this._streamData = v(function(e2) {
          try {
            t.push(typeof e2 == "string" ? e2 : e2.toString(this._config.encoding)), i2 && (i2 = false, this._checkIsFinished(), this.parseChunk(t.shift()));
          } catch (e3) {
            this._streamError(e3);
          }
        }, this), this._streamError = v(function(e2) {
          this._streamCleanUp(), this._sendError(e2);
        }, this), this._streamEnd = v(function() {
          this._streamCleanUp(), r = true, this._streamData("");
        }, this), this._streamCleanUp = v(function() {
          this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
      }
      function i(m2) {
        var a2, o2, h2, r = Math.pow(2, 53), n2 = -r, s2 = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, u2 = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/, t = this, i2 = 0, f2 = 0, d2 = false, e = false, l2 = [], c2 = { data: [], errors: [], meta: {} };
        if (M(m2.step)) {
          var p2 = m2.step;
          m2.step = function(e2) {
            if (c2 = e2, _2())
              g2();
            else {
              if (g2(), c2.data.length === 0)
                return;
              i2 += e2.data.length, m2.preview && i2 > m2.preview ? o2.abort() : (c2.data = c2.data[0], p2(c2, t));
            }
          };
        }
        function y2(e2) {
          return m2.skipEmptyLines === "greedy" ? e2.join("").trim() === "" : e2.length === 1 && e2[0].length === 0;
        }
        function g2() {
          if (c2 && h2 && (k("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + b.DefaultDelimiter + "'"), h2 = false), m2.skipEmptyLines)
            for (var e2 = 0; e2 < c2.data.length; e2++)
              y2(c2.data[e2]) && c2.data.splice(e2--, 1);
          return _2() && function() {
            if (!c2)
              return;
            function e3(e4, t3) {
              M(m2.transformHeader) && (e4 = m2.transformHeader(e4, t3)), l2.push(e4);
            }
            if (Array.isArray(c2.data[0])) {
              for (var t2 = 0; _2() && t2 < c2.data.length; t2++)
                c2.data[t2].forEach(e3);
              c2.data.splice(0, 1);
            } else
              c2.data.forEach(e3);
          }(), function() {
            if (!c2 || !m2.header && !m2.dynamicTyping && !m2.transform)
              return c2;
            function e3(e4, t3) {
              var i3, r2 = m2.header ? {} : [];
              for (i3 = 0; i3 < e4.length; i3++) {
                var n3 = i3, s3 = e4[i3];
                m2.header && (n3 = i3 >= l2.length ? "__parsed_extra" : l2[i3]), m2.transform && (s3 = m2.transform(s3, n3)), s3 = v2(n3, s3), n3 === "__parsed_extra" ? (r2[n3] = r2[n3] || [], r2[n3].push(s3)) : r2[n3] = s3;
              }
              return m2.header && (i3 > l2.length ? k("FieldMismatch", "TooManyFields", "Too many fields: expected " + l2.length + " fields but parsed " + i3, f2 + t3) : i3 < l2.length && k("FieldMismatch", "TooFewFields", "Too few fields: expected " + l2.length + " fields but parsed " + i3, f2 + t3)), r2;
            }
            var t2 = 1;
            !c2.data.length || Array.isArray(c2.data[0]) ? (c2.data = c2.data.map(e3), t2 = c2.data.length) : c2.data = e3(c2.data, 0);
            m2.header && c2.meta && (c2.meta.fields = l2);
            return f2 += t2, c2;
          }();
        }
        function _2() {
          return m2.header && l2.length === 0;
        }
        function v2(e2, t2) {
          return i3 = e2, m2.dynamicTypingFunction && m2.dynamicTyping[i3] === void 0 && (m2.dynamicTyping[i3] = m2.dynamicTypingFunction(i3)), (m2.dynamicTyping[i3] || m2.dynamicTyping) === true ? t2 === "true" || t2 === "TRUE" || t2 !== "false" && t2 !== "FALSE" && (function(e3) {
            if (s2.test(e3)) {
              var t3 = parseFloat(e3);
              if (n2 < t3 && t3 < r)
                return true;
            }
            return false;
          }(t2) ? parseFloat(t2) : u2.test(t2) ? new Date(t2) : t2 === "" ? null : t2) : t2;
          var i3;
        }
        function k(e2, t2, i3, r2) {
          var n3 = { type: e2, code: t2, message: i3 };
          r2 !== void 0 && (n3.row = r2), c2.errors.push(n3);
        }
        this.parse = function(e2, t2, i3) {
          var r2 = m2.quoteChar || '"';
          if (m2.newline || (m2.newline = function(e3, t3) {
            e3 = e3.substring(0, 1048576);
            var i4 = new RegExp(j(t3) + "([^]*?)" + j(t3), "gm"), r3 = (e3 = e3.replace(i4, "")).split("\r"), n4 = e3.split("\n"), s4 = 1 < n4.length && n4[0].length < r3[0].length;
            if (r3.length === 1 || s4)
              return "\n";
            for (var a3 = 0, o3 = 0; o3 < r3.length; o3++)
              r3[o3][0] === "\n" && a3++;
            return a3 >= r3.length / 2 ? "\r\n" : "\r";
          }(e2, r2)), h2 = false, m2.delimiter)
            M(m2.delimiter) && (m2.delimiter = m2.delimiter(e2), c2.meta.delimiter = m2.delimiter);
          else {
            var n3 = function(e3, t3, i4, r3, n4) {
              var s4, a3, o3, h3;
              n4 = n4 || [",", "	", "|", ";", b.RECORD_SEP, b.UNIT_SEP];
              for (var u3 = 0; u3 < n4.length; u3++) {
                var f3 = n4[u3], d3 = 0, l3 = 0, c3 = 0;
                o3 = void 0;
                for (var p3 = new E({ comments: r3, delimiter: f3, newline: t3, preview: 10 }).parse(e3), g3 = 0; g3 < p3.data.length; g3++)
                  if (i4 && y2(p3.data[g3]))
                    c3++;
                  else {
                    var _3 = p3.data[g3].length;
                    l3 += _3, o3 !== void 0 ? 0 < _3 && (d3 += Math.abs(_3 - o3), o3 = _3) : o3 = _3;
                  }
                0 < p3.data.length && (l3 /= p3.data.length - c3), (a3 === void 0 || d3 <= a3) && (h3 === void 0 || h3 < l3) && 1.99 < l3 && (a3 = d3, s4 = f3, h3 = l3);
              }
              return { successful: !!(m2.delimiter = s4), bestDelimiter: s4 };
            }(e2, m2.newline, m2.skipEmptyLines, m2.comments, m2.delimitersToGuess);
            n3.successful ? m2.delimiter = n3.bestDelimiter : (h2 = true, m2.delimiter = b.DefaultDelimiter), c2.meta.delimiter = m2.delimiter;
          }
          var s3 = w(m2);
          return m2.preview && m2.header && s3.preview++, a2 = e2, o2 = new E(s3), c2 = o2.parse(a2, t2, i3), g2(), d2 ? { meta: { paused: true } } : c2 || { meta: { paused: false } };
        }, this.paused = function() {
          return d2;
        }, this.pause = function() {
          d2 = true, o2.abort(), a2 = M(m2.chunk) ? "" : a2.substring(o2.getCharIndex());
        }, this.resume = function() {
          t.streamer._halted ? (d2 = false, t.streamer.parseChunk(a2, true)) : setTimeout(t.resume, 3);
        }, this.aborted = function() {
          return e;
        }, this.abort = function() {
          e = true, o2.abort(), c2.meta.aborted = true, M(m2.complete) && m2.complete(c2), a2 = "";
        };
      }
      function j(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function E(e) {
        var S, O = (e = e || {}).delimiter, x = e.newline, I = e.comments, T = e.step, D = e.preview, A = e.fastMode, L = S = e.quoteChar === void 0 ? '"' : e.quoteChar;
        if (e.escapeChar !== void 0 && (L = e.escapeChar), (typeof O != "string" || -1 < b.BAD_DELIMITERS.indexOf(O)) && (O = ","), I === O)
          throw new Error("Comment character same as delimiter");
        I === true ? I = "#" : (typeof I != "string" || -1 < b.BAD_DELIMITERS.indexOf(I)) && (I = false), x !== "\n" && x !== "\r" && x !== "\r\n" && (x = "\n");
        var F = 0, z = false;
        this.parse = function(r, t, i2) {
          if (typeof r != "string")
            throw new Error("Input must be a string");
          var n2 = r.length, e2 = O.length, s2 = x.length, a2 = I.length, o2 = M(T), h2 = [], u2 = [], f2 = [], d2 = F = 0;
          if (!r)
            return C();
          if (A || A !== false && r.indexOf(S) === -1) {
            for (var l2 = r.split(x), c2 = 0; c2 < l2.length; c2++) {
              if (f2 = l2[c2], F += f2.length, c2 !== l2.length - 1)
                F += x.length;
              else if (i2)
                return C();
              if (!I || f2.substring(0, a2) !== I) {
                if (o2) {
                  if (h2 = [], k(f2.split(O)), R(), z)
                    return C();
                } else
                  k(f2.split(O));
                if (D && D <= c2)
                  return h2 = h2.slice(0, D), C(true);
              }
            }
            return C();
          }
          for (var p2 = r.indexOf(O, F), g2 = r.indexOf(x, F), _2 = new RegExp(j(L) + j(S), "g"), m2 = r.indexOf(S, F); ; )
            if (r[F] !== S)
              if (I && f2.length === 0 && r.substring(F, F + a2) === I) {
                if (g2 === -1)
                  return C();
                F = g2 + s2, g2 = r.indexOf(x, F), p2 = r.indexOf(O, F);
              } else if (p2 !== -1 && (p2 < g2 || g2 === -1))
                f2.push(r.substring(F, p2)), F = p2 + e2, p2 = r.indexOf(O, F);
              else {
                if (g2 === -1)
                  break;
                if (f2.push(r.substring(F, g2)), w2(g2 + s2), o2 && (R(), z))
                  return C();
                if (D && h2.length >= D)
                  return C(true);
              }
            else
              for (m2 = F, F++; ; ) {
                if ((m2 = r.indexOf(S, m2 + 1)) === -1)
                  return i2 || u2.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: h2.length, index: F }), E2();
                if (m2 === n2 - 1)
                  return E2(r.substring(F, m2).replace(_2, S));
                if (S !== L || r[m2 + 1] !== L) {
                  if (S === L || m2 === 0 || r[m2 - 1] !== L) {
                    p2 !== -1 && p2 < m2 + 1 && (p2 = r.indexOf(O, m2 + 1)), g2 !== -1 && g2 < m2 + 1 && (g2 = r.indexOf(x, m2 + 1));
                    var y2 = b2(g2 === -1 ? p2 : Math.min(p2, g2));
                    if (r[m2 + 1 + y2] === O) {
                      f2.push(r.substring(F, m2).replace(_2, S)), r[F = m2 + 1 + y2 + e2] !== S && (m2 = r.indexOf(S, F)), p2 = r.indexOf(O, F), g2 = r.indexOf(x, F);
                      break;
                    }
                    var v2 = b2(g2);
                    if (r.substring(m2 + 1 + v2, m2 + 1 + v2 + s2) === x) {
                      if (f2.push(r.substring(F, m2).replace(_2, S)), w2(m2 + 1 + v2 + s2), p2 = r.indexOf(O, F), m2 = r.indexOf(S, F), o2 && (R(), z))
                        return C();
                      if (D && h2.length >= D)
                        return C(true);
                      break;
                    }
                    u2.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: h2.length, index: F }), m2++;
                  }
                } else
                  m2++;
              }
          return E2();
          function k(e3) {
            h2.push(e3), d2 = F;
          }
          function b2(e3) {
            var t2 = 0;
            if (e3 !== -1) {
              var i3 = r.substring(m2 + 1, e3);
              i3 && i3.trim() === "" && (t2 = i3.length);
            }
            return t2;
          }
          function E2(e3) {
            return i2 || (e3 === void 0 && (e3 = r.substring(F)), f2.push(e3), F = n2, k(f2), o2 && R()), C();
          }
          function w2(e3) {
            F = e3, k(f2), f2 = [], g2 = r.indexOf(x, F);
          }
          function C(e3) {
            return { data: h2, errors: u2, meta: { delimiter: O, linebreak: x, aborted: z, truncated: !!e3, cursor: d2 + (t || 0) } };
          }
          function R() {
            T(C()), h2 = [], u2 = [];
          }
        }, this.abort = function() {
          z = true;
        }, this.getCharIndex = function() {
          return F;
        };
      }
      function _(e) {
        var t = e.data, i2 = a[t.workerId], r = false;
        if (t.error)
          i2.userError(t.error, t.file);
        else if (t.results && t.results.data) {
          var n2 = { abort: function() {
            r = true, m(t.workerId, { data: [], errors: [], meta: { aborted: true } });
          }, pause: y, resume: y };
          if (M(i2.userStep)) {
            for (var s2 = 0; s2 < t.results.data.length && (i2.userStep({ data: t.results.data[s2], errors: t.results.errors, meta: t.results.meta }, n2), !r); s2++)
              ;
            delete t.results;
          } else
            M(i2.userChunk) && (i2.userChunk(t.results, n2, t.file), delete t.results);
        }
        t.finished && !r && m(t.workerId, t.results);
      }
      function m(e, t) {
        var i2 = a[e];
        M(i2.userComplete) && i2.userComplete(t), i2.terminate(), delete a[e];
      }
      function y() {
        throw new Error("Not implemented.");
      }
      function w(e) {
        if (typeof e != "object" || e === null)
          return e;
        var t = Array.isArray(e) ? [] : {};
        for (var i2 in e)
          t[i2] = w(e[i2]);
        return t;
      }
      function v(e, t) {
        return function() {
          e.apply(t, arguments);
        };
      }
      function M(e) {
        return typeof e == "function";
      }
      return o && (f.onmessage = function(e) {
        var t = e.data;
        b.WORKER_ID === void 0 && t && (b.WORKER_ID = t.workerId);
        if (typeof t.input == "string")
          f.postMessage({ workerId: b.WORKER_ID, results: b.parse(t.input, t.config), finished: true });
        else if (f.File && t.input instanceof File || t.input instanceof Object) {
          var i2 = b.parse(t.input, t.config);
          i2 && f.postMessage({ workerId: b.WORKER_ID, results: i2, finished: true });
        }
      }), (l.prototype = Object.create(u.prototype)).constructor = l, (c.prototype = Object.create(u.prototype)).constructor = c, (p.prototype = Object.create(p.prototype)).constructor = p, (g.prototype = Object.create(u.prototype)).constructor = g, b;
    });
  }
});

// src/index.ts
__export(exports, {
  FetchPapaStreamer: () => FetchPapaStreamer,
  StreamingCSVParser: () => StreamingCSVParser,
  TransformStreamer: () => TransformStreamer
});

// src/StreamingCSVParser.ts
var import_browser = __toModule(require_browser());
var ParserPlus = class extends import_browser.default.Parser {
  constructor(options) {
    super(options);
    this.write = this.promisedWrite;
  }
  promisedWrite(chunk) {
    return new Promise((resolve, reject) => {
      super.write(chunk, (error) => {
        return error ? reject(error) : resolve();
      });
    });
  }
};
var StreamingCSVParser = class extends TransformStream {
  constructor(options, extraHeaders) {
    let separator = "", finalChar = "", streamIsClosed = false, responseHeaders = null;
    if (extraHeaders) {
      responseHeaders = new Headers(extraHeaders);
    }
    const parser = new ParserPlus(options);
    const textencoder = new TextEncoder(), textdecoder = new TextDecoder(), transformContent = {
      start(controller) {
        parser.controller = controller;
        controller.enqueue("[");
      },
      transform: async (chunk, controller) => {
        chunk = await chunk;
        switch (typeof chunk) {
          case "object":
            if (chunk === null)
              controller.terminate();
            parser.promisedWrite(textdecoder.decode(chunk));
            break;
          default:
            controller.enqueue(textencoder.encode(String(chunk)));
            break;
        }
      },
      flush(controller) {
        streamIsClosed = true;
        parser.end();
        if (finalChar === "") {
          finalChar = "]";
          controller.enqueue(finalChar);
        }
      }
    };
    super({ ...transformContent });
    this.parsedArray = [];
    this.parser = parser;
    let onRecord = (record) => {
      if (!parser.controller || streamIsClosed)
        return;
      parser.controller.enqueue(textencoder.encode(separator + JSON.stringify(record)));
      separator = ",";
    };
    parser.on("data", onRecord);
    this.parser.on("error", function(err) {
      console.error(err.message);
    });
  }
  on(event, cb) {
    if (event === "record") {
      console.log("parser onRecord", cb);
      this.parser.onRecord = cb;
    } else {
      console.log("parser on:", event);
      this.parser.on(event, cb);
    }
    return this;
  }
};

// src/TransformStreamer.ts
var import_papaparse2 = __toModule(require_papaparse_min());

// src/CSVStreamersEmitter.ts
var CSVStreamersEmitter = class {
  constructor() {
    this._events = {};
  }
  on(name, listener) {
    if (!this._events[name]) {
      this._events[name] = [];
    }
    this._events[name].push(listener);
  }
  removeListener(name, listenerToRemove) {
    if (!this._events[name]) {
      return;
    }
    const filterListeners = (listener) => listener !== listenerToRemove;
    this._events[name] = this._events[name].filter(filterListeners);
  }
  emit(name, data) {
    if (!this._events[name]) {
      return;
    }
    const fireCallbacks = (callback) => {
      callback(data);
    };
    this._events[name].forEach(fireCallbacks);
  }
  clearListeners() {
    this._events = {};
  }
};

// src/FetchPapaStreamer.ts
var import_papaparse = __toModule(require_papaparse_min());
function createEmptyResult() {
  return {
    data: [],
    errors: [],
    meta: {}
  };
}
var FetchPapaStreamer = class {
  abort() {
    throw new Error("Method not implemented.");
  }
  parse(_input, baseIndex, ignoreLastRow) {
    throw new Error("Method not implemented.");
  }
  getCharIndex() {
    throw new Error("Method not implemented.");
  }
  constructor(config = {}) {
    var dynamicTyping = config.dynamicTyping || false;
    if (isFunction(dynamicTyping)) {
      config.dynamicTypingFunction = dynamicTyping;
      dynamicTyping = {};
    }
    config.dynamicTyping = dynamicTyping;
    config.transform = isFunction(config.transform) ? config.transform : false;
    this._finished = false;
    this._completed = false;
    this._halted = false;
    this._baseIndex = 0;
    this._partialLine = "";
    this._rowCount = 0;
    this._start = 0;
    this.isFirstChunk = true;
    this._completeResults = createEmptyResult();
    config.withCredentials = config.withCredentials || "same-origin";
    this.decoder = new TextDecoder();
    this.replaceConfig({ chunkSize: Papa.RemoteChunkSize, ...config });
  }
  async stream(_input) {
    let res;
    if (_input instanceof Response) {
      res = _input;
    } else if (_input instanceof Request) {
      console.log("input is a request");
      res = await fetch(_input);
    } else {
      this._input = _input;
      let body;
      if (this._config.downloadRequestBody)
        body = JSON.stringify(this._config.downloadRequestBody);
      let req = new Request(this._input, {
        method: this._config.downloadRequestBody ? "POST" : "GET",
        credentials: this._config.withCredentials,
        body
      });
      if (this._config.downloadRequestHeaders) {
        for (let headerName in this._config.downloadRequestHeaders) {
          req.headers.set(headerName, this._config.downloadRequestHeaders[headerName]);
        }
      }
      res = await fetch(req);
    }
    if (!res.ok || !res.body) {
      throw new Error(res.statusText);
    }
    this.reader = res.body.getReader();
    return this._readChunk();
  }
  async _readChunk() {
    if (this._finished) {
      return this._chunkLoaded({ done: true, value: void 0 });
    }
    return this.reader.read().then(({ done, value }) => {
      return this._chunkLoaded({ done, value });
    });
  }
  _chunkLoaded({ done, value }) {
    let chunkText = value ? this.decoder.decode(value) : this.decoder.decode();
    this._finished = done;
    return this.parseChunk(chunkText);
  }
  async parseChunk(chunk) {
    if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk)) {
      var modifiedChunk = this._config.beforeFirstChunk(chunk);
      if (modifiedChunk !== void 0)
        chunk = modifiedChunk;
    }
    this.isFirstChunk = false;
    this._halted = false;
    var aggregate = this._partialLine + chunk;
    this._partialLine = "";
    let results = this._handle.parse(aggregate, this._baseIndex, !this._finished);
    if (this._handle.paused() || this._handle.aborted()) {
      this._halted = true;
      console.log("_halted");
      this.reader.cancel();
      return results;
    }
    var lastIndex = results.meta.cursor;
    if (!this._finished) {
      this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
      this._baseIndex = lastIndex;
    }
    this._rowCount += ((results || {}).data || []).length;
    var finishedIncludingPreview = this._finished || this._config.preview && this._rowCount >= this._config.preview;
    if (isFunction(this._config.chunk)) {
      this._config.chunk(results);
      results = createEmptyResult();
      this._completeResults = createEmptyResult();
    }
    if (!this._config.step && !this._config.chunk) {
      this._completeResults.data = this._completeResults.data.concat(results.data);
      this._completeResults.errors = this._completeResults.errors.concat(results.errors);
      this._completeResults.meta = results.meta;
    }
    if (!this._completed && finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted)) {
      console.log({ _rowCount: this._rowCount, config: this._config, finishedIncludingPreview, thisChunkLength: chunk.length });
      this._config.complete(this._completeResults);
      this._completed = true;
    }
    if (!finishedIncludingPreview && (!results || !results.meta.paused)) {
      return this._readChunk();
    }
    return results;
  }
  replaceConfig(config) {
    var configCopy = copy(config);
    configCopy.chunkSize = Number(configCopy.chunkSize);
    if (!config.step && !config.chunk)
      configCopy.chunkSize = null;
    this._handle = new import_papaparse.ParserHandle(configCopy);
    this._handle.streamer = this;
    this._config = configCopy;
  }
};
var Papa = {
  RECORD_SEP: String.fromCharCode(30),
  UNIT_SEP: String.fromCharCode(31),
  BYTE_ORDER_MARK: "\uFEFF",
  BAD_DELIMITERS: ["\r", "\n", '"', "\uFEFF"],
  WORKERS_SUPPORTED: false,
  NODE_STREAM_INPUT: 0,
  LocalChunkSize: 1024 * 1024 * 10,
  RemoteChunkSize: 1024 * 1024 * 5,
  DefaultDelimiter: ",",
  Parser: import_papaparse.Parser,
  ParserHandle: import_papaparse.ParserHandle,
  parse: (_input, _config) => {
    _config = _config || {};
    var dynamicTyping = _config.dynamicTyping || false;
    if (isFunction(dynamicTyping)) {
      _config.dynamicTypingFunction = dynamicTyping;
      dynamicTyping = {};
    }
    _config.dynamicTyping = dynamicTyping;
    _config.transform = isFunction(_config.transform) ? _config.transform : false;
    if (typeof _input === "string" && _config.download && !globalThis.XMLHttpRequest && globalThis.fetch) {
      return new FetchPapaStreamer(_config).stream(_input);
    }
    return import_papaparse.default.parse(_input, _config);
  }
};
function copy(obj) {
  if (typeof obj !== "object" || obj === null)
    return obj;
  var cpy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    cpy[key] = copy(obj[key]);
  }
  return cpy;
}
function isFunction(func) {
  return typeof func === "function";
}

// src/TransformStreamer.ts
var TransformStreamer = class extends TransformStream {
  constructor(config = {}) {
    let separator = "", finalChar = "";
    const textencoder = new TextEncoder(), textdecoder = new TextDecoder(), emitter = new CSVStreamersEmitter(), transformContent = {
      start(controller) {
        controller.enqueue("[");
      },
      transform: async (chunk, controller) => {
        chunk = await chunk;
        if (separator === "")
          emitter.emit("transform");
        switch (typeof chunk) {
          case "object":
            if (!chunk) {
              emitter.emit("terminate");
              controller.terminate();
            }
            let chunkText = chunk ? textdecoder.decode(chunk) : textdecoder.decode(), result = this.parseChunk(chunkText), { data = [] } = result;
            data.forEach((row) => {
              controller.enqueue(textencoder.encode(separator + JSON.stringify(row)));
              separator = ",";
            });
            break;
          default:
            controller.enqueue(textencoder.encode(String(chunk)));
            break;
        }
      },
      flush(controller) {
        emitter.emit("end");
        emitter.clearListeners();
        if (finalChar === "") {
          finalChar = "]";
          controller.enqueue(finalChar);
        }
      }
    };
    super({ ...transformContent });
    this.emitter = emitter;
    var dynamicTyping = config.dynamicTyping || false;
    if (isFunction2(dynamicTyping)) {
      config.dynamicTypingFunction = dynamicTyping;
      dynamicTyping = {};
    }
    config.dynamicTyping = dynamicTyping;
    config.transform = isFunction2(config.transform) ? config.transform : false;
    this._finished = false;
    this._completed = false;
    this._halted = false;
    this._baseIndex = 0;
    this._partialLine = "";
    this._rowCount = 0;
    this._start = 0;
    this.isFirstChunk = true;
    this._completeResults = createEmptyResult();
    config.withCredentials = config.withCredentials || "same-origin";
    this.decoder = new TextDecoder();
    this.replaceConfig({ chunkSize: Papa2.RemoteChunkSize, ...config });
  }
  on(name, cb) {
    this.emitter.on(name, cb);
    return this;
  }
  clearListeners() {
    this.emitter.clearListeners();
    return this;
  }
  parseChunk(chunk) {
    if (this.isFirstChunk && isFunction2(this._config.beforeFirstChunk)) {
      var modifiedChunk = this._config.beforeFirstChunk(chunk);
      if (modifiedChunk !== void 0)
        chunk = modifiedChunk;
    }
    this.isFirstChunk = false;
    this._halted = false;
    var aggregate = this._partialLine + chunk;
    this._partialLine = "";
    let results = this._handle.parse(aggregate, this._baseIndex, !this._finished);
    var lastIndex = results.meta.cursor;
    if (!this._finished) {
      this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
      this._baseIndex = lastIndex;
    }
    this._rowCount += ((results || {}).data || []).length;
    var finishedIncludingPreview = this._finished || this._config.preview && this._rowCount >= this._config.preview;
    if (finishedIncludingPreview) {
      console.info("finishedIncludingPreview");
    }
    if (isFunction2(this._config.chunk)) {
      this._config.chunk(results);
      results = createEmptyResult();
      this._completeResults = createEmptyResult();
    }
    if (!this._config.step && !this._config.chunk && isFunction2(this._config.complete)) {
      this._completeResults.data = this._completeResults.data.concat(results.data);
      this._completeResults.errors = this._completeResults.errors.concat(results.errors);
      this._completeResults.meta = results.meta;
    }
    if (!this._completed && finishedIncludingPreview && (!results || !results.meta.aborted)) {
      if (isFunction2(this._config.complete))
        this._config.complete(this._completeResults);
      this._completed = true;
    }
    return results;
  }
  async stream(_input) {
    let res;
    if (_input instanceof Response) {
      res = _input.clone();
    } else if (_input instanceof Request) {
      res = await fetch(_input);
    } else {
      let body;
      if (this._config.downloadRequestBody)
        body = JSON.stringify(this._config.downloadRequestBody);
      let req = new Request(_input, {
        method: this._config.downloadRequestBody ? "POST" : "GET",
        credentials: this._config.withCredentials,
        body
      });
      if (this._config.downloadRequestHeaders) {
        for (let headerName in this._config.downloadRequestHeaders) {
          req.headers.set(headerName, this._config.downloadRequestHeaders[headerName]);
        }
      }
      res = await fetch(req);
    }
    if (!res.ok || !res.body) {
      throw new Error(res.statusText);
    }
    res.body.pipeThrough(this);
    return new Response(this.readable, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  replaceConfig(config) {
    var configCopy = copy2(config);
    configCopy.chunkSize = Number(configCopy.chunkSize);
    if (!config.step && !config.chunk)
      configCopy.chunkSize = null;
    this._handle = new import_papaparse2.ParserHandle(configCopy);
    this._handle.streamer = this;
    this._config = configCopy;
  }
};
function parse2(_input, _config) {
  _config = _config || {};
  var dynamicTyping = _config.dynamicTyping || false;
  if (isFunction2(dynamicTyping)) {
    _config.dynamicTypingFunction = dynamicTyping;
    dynamicTyping = {};
  }
  _config.dynamicTyping = dynamicTyping;
  _config.transform = isFunction2(_config.transform) ? _config.transform : false;
  if (_input instanceof Request || _input instanceof Response) {
    return new TransformStreamer(_config).stream(_input);
  } else if (typeof _input === "string" && _config.download && !globalThis.XMLHttpRequest && globalThis.fetch) {
    return new FetchPapaStreamer(_config).stream(_input);
  }
  return import_papaparse2.default.parse(_input, _config);
}
var Papa2 = {
  RECORD_SEP: String.fromCharCode(30),
  UNIT_SEP: String.fromCharCode(31),
  BYTE_ORDER_MARK: "\uFEFF",
  BAD_DELIMITERS: ["\r", "\n", '"', "\uFEFF"],
  WORKERS_SUPPORTED: false,
  NODE_STREAM_INPUT: 0,
  LocalChunkSize: 1024 * 1024 * 10,
  RemoteChunkSize: 1024 * 1024 * 5,
  DefaultDelimiter: ",",
  Parser: import_papaparse2.Parser,
  ParserHandle: import_papaparse2.ParserHandle,
  parse: parse2
};
function copy2(obj) {
  if (typeof obj !== "object" || obj === null)
    return obj;
  var cpy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    cpy[key] = copy2(obj[key]);
  }
  return cpy;
}
function isFunction2(func) {
  return typeof func === "function";
}
/* @license
Papa Parse
v5.3.1
https://github.com/mholt/PapaParse
License: MIT
*/
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
