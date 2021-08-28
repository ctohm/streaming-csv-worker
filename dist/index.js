(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = (x) => {
    if (typeof require !== "undefined")
      return require(x);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/csv-parse/lib/browser/index.js
  var require_browser = __commonJS({
    "node_modules/csv-parse/lib/browser/index.js"(exports, module) {
      (function(f) {
        if (typeof exports === "object" && typeof module !== "undefined") {
          module.exports = f();
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
        var define2, module2, exports2;
        return function() {
          function r(e, n, t) {
            function o(i2, f) {
              if (!n[i2]) {
                if (!e[i2]) {
                  var c = typeof __require == "function" && __require;
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
            for (var u = typeof __require == "function" && __require, i = 0; i < t.length; i++)
              o(t[i]);
            return o;
          }
          return r;
        }()({ 1: [function(require2, module3, exports3) {
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
              module3.exports = ResizeableBuffer;
            }).call(this);
          }).call(this, require2("buffer").Buffer);
        }, { "buffer": 5 }], 2: [function(require2, module3, exports3) {
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
              var Parser = /* @__PURE__ */ function(_Transform) {
                _inherits(Parser2, _Transform);
                var _super = _createSuper(Parser2);
                function Parser2() {
                  var _this;
                  var opts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                  _classCallCheck(this, Parser2);
                  _this = _super.call(this, _objectSpread(_objectSpread(_objectSpread({}, {
                    readableObjectMode: true
                  }), opts), {}, {
                    encoding: null
                  }));
                  _this.__originalOptions = opts;
                  _this.__normalizeOptions(opts);
                  return _this;
                }
                _createClass(Parser2, [{
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
                return Parser2;
              }(Transform);
              var parse2 = function parse3() {
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
                var parser = new Parser(options);
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
              parse2.Parser = Parser;
              parse2.CsvError = CsvError;
              module3.exports = parse2;
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
        }, { "./ResizeableBuffer": 1, "buffer": 5, "stream": 11, "timers": 27 }], 3: [function(require2, module3, exports3) {
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
        }, {}], 4: [function(require2, module3, exports3) {
        }, {}], 5: [function(require2, module3, exports3) {
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
              Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
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
        }, { "base64-js": 3, "buffer": 5, "ieee754": 7 }], 6: [function(require2, module3, exports3) {
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
          module3.exports = EventEmitter;
          module3.exports.once = once;
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
            var copy = new Array(n);
            for (var i = 0; i < n; ++i)
              copy[i] = arr[i];
            return copy;
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
        }, {}], 7: [function(require2, module3, exports3) {
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
        }, {}], 8: [function(require2, module3, exports3) {
          if (typeof Object.create === "function") {
            module3.exports = function inherits(ctor, superCtor) {
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
            module3.exports = function inherits(ctor, superCtor) {
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
        }, {}], 9: [function(require2, module3, exports3) {
          var process = module3.exports = {};
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
        }, {}], 10: [function(require2, module3, exports3) {
          var buffer = require2("buffer");
          var Buffer2 = buffer.Buffer;
          function copyProps(src, dst) {
            for (var key in src) {
              dst[key] = src[key];
            }
          }
          if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
            module3.exports = buffer;
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
        }, { "buffer": 5 }], 11: [function(require2, module3, exports3) {
          module3.exports = Stream;
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
        }, { "events": 6, "inherits": 8, "readable-stream/lib/_stream_duplex.js": 13, "readable-stream/lib/_stream_passthrough.js": 14, "readable-stream/lib/_stream_readable.js": 15, "readable-stream/lib/_stream_transform.js": 16, "readable-stream/lib/_stream_writable.js": 17, "readable-stream/lib/internal/streams/end-of-stream.js": 21, "readable-stream/lib/internal/streams/pipeline.js": 23 }], 12: [function(require2, module3, exports3) {
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
          module3.exports.codes = codes;
        }, {}], 13: [function(require2, module3, exports3) {
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
              module3.exports = Duplex;
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
        }, { "./_stream_readable": 15, "./_stream_writable": 17, "_process": 9, "inherits": 8 }], 14: [function(require2, module3, exports3) {
          "use strict";
          module3.exports = PassThrough;
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
        }, { "./_stream_transform": 16, "inherits": 8 }], 15: [function(require2, module3, exports3) {
          (function(process, global2) {
            (function() {
              "use strict";
              module3.exports = Readable;
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
        }, { "../errors": 12, "./_stream_duplex": 13, "./internal/streams/async_iterator": 18, "./internal/streams/buffer_list": 19, "./internal/streams/destroy": 20, "./internal/streams/from": 22, "./internal/streams/state": 24, "./internal/streams/stream": 25, "_process": 9, "buffer": 5, "events": 6, "inherits": 8, "string_decoder/": 26, "util": 4 }], 16: [function(require2, module3, exports3) {
          "use strict";
          module3.exports = Transform;
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
        }, { "../errors": 12, "./_stream_duplex": 13, "inherits": 8 }], 17: [function(require2, module3, exports3) {
          (function(process, global2) {
            (function() {
              "use strict";
              module3.exports = Writable;
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
        }, { "../errors": 12, "./_stream_duplex": 13, "./internal/streams/destroy": 20, "./internal/streams/state": 24, "./internal/streams/stream": 25, "_process": 9, "buffer": 5, "inherits": 8, "util-deprecate": 28 }], 18: [function(require2, module3, exports3) {
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
              module3.exports = createReadableStreamAsyncIterator;
            }).call(this);
          }).call(this, require2("_process"));
        }, { "./end-of-stream": 21, "_process": 9 }], 19: [function(require2, module3, exports3) {
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
          module3.exports = /* @__PURE__ */ function() {
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
        }, { "buffer": 5, "util": 4 }], 20: [function(require2, module3, exports3) {
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
              module3.exports = {
                destroy,
                undestroy,
                errorOrDestroy
              };
            }).call(this);
          }).call(this, require2("_process"));
        }, { "_process": 9 }], 21: [function(require2, module3, exports3) {
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
          module3.exports = eos;
        }, { "../../../errors": 12 }], 22: [function(require2, module3, exports3) {
          module3.exports = function() {
            throw new Error("Readable.from is not available in the browser");
          };
        }, {}], 23: [function(require2, module3, exports3) {
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
          module3.exports = pipeline;
        }, { "../../../errors": 12, "./end-of-stream": 21 }], 24: [function(require2, module3, exports3) {
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
          module3.exports = {
            getHighWaterMark
          };
        }, { "../../../errors": 12 }], 25: [function(require2, module3, exports3) {
          module3.exports = require2("events").EventEmitter;
        }, { "events": 6 }], 26: [function(require2, module3, exports3) {
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
        }, { "safe-buffer": 10 }], 27: [function(require2, module3, exports3) {
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
        }, { "process/browser.js": 9, "timers": 27 }], 28: [function(require2, module3, exports3) {
          (function(global2) {
            (function() {
              module3.exports = deprecate;
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

  // src/HTMLTableParser.ts
  var TableHandler = class {
    constructor(rewriterInstance) {
      this.rewriterInstance = rewriterInstance;
    }
    element(element) {
      if (!this.rewriterInstance.isCapturing) {
        this.rewriterInstance.isCapturing = true;
      }
      element.removeAndKeepContent();
      element.before("</pre>|cut|[", { html: true });
      element.after("]|cut|<pre>", { html: true });
    }
  };
  var RowHandler = class {
    element(element) {
      element.removeAndKeepContent();
      element.before("[");
      element.after("],");
    }
  };
  var CellHandler = class {
    element(element) {
      element.removeAndKeepContent();
      element.before('"');
      element.after('",');
    }
  };
  var RemoverHandler = class {
    constructor(rewriterInstance, { wrap = false, preserving = false } = {}) {
      this.wrap = false;
      this.preserving = false;
      this.preserving = preserving;
      this.wrap = wrap;
      this.rewriterInstance = rewriterInstance;
    }
    element(element) {
      if (this.preserving) {
        element.removeAndKeepContent();
      } else if (this.wrap) {
        element.prepend("<pre>", { html: true });
        element.append("</pre>", { html: true });
      } else {
        element.remove();
        console.log("RemoverHandler", { tagName: element.tagName });
      }
    }
  };
  var HTMLTableParser = class {
    constructor({
      tableSelectors = ["table"],
      rowSelectors = ["tr"],
      removePreserving = ["thead", "tbody"],
      cellSelectors = ["td", "th"],
      alwaysRemove = ["head"]
    }) {
      this.isCapturing = false;
      this.tableSelectors = tableSelectors;
      this.alwaysRemove = alwaysRemove;
      this.removePreserving = removePreserving;
      this.rowSelectors = rowSelectors;
      this.cellSelectors = cellSelectors;
      this.rewriterInstance = { isCapturing: false };
    }
    transform(res) {
      let ctype = String(res.headers.get("content-type"));
      if (!ctype.includes("html")) {
        throw new Error(`Received a non-html content type: ${ctype}`);
      }
      console.log({ ctype });
      const rewriter1 = new HTMLRewriter().on("body", new RemoverHandler(this, { wrap: true }));
      this.alwaysRemove.forEach((selector) => {
        rewriter1.on(selector, new RemoverHandler(this));
      });
      this.removePreserving.forEach((selector) => {
        rewriter1.on(selector, new RemoverHandler(this, { wrap: false, preserving: true }));
      });
      this.tableSelectors.forEach((selector) => {
        rewriter1.on(selector, new TableHandler(this));
      });
      this.rowSelectors.forEach((selector) => {
        rewriter1.on(selector, new RowHandler());
      });
      this.cellSelectors.forEach((selector) => {
        rewriter1.on(selector, new CellHandler());
      });
      return new HTMLRewriter().on("pre", new RemoverHandler(this)).transform(rewriter1.transform(res));
    }
  };

  // src/StreamingCSVParser.ts
  var import_browser = __toModule(require_browser());
  var StreamingCSVParser = class {
    constructor(options) {
      this.separator = "[";
      this.parsedArray = [];
      const parser = (0, import_browser.default)(options);
      parser.promisedWrite = (chunk) => {
        return new Promise((resolve, reject) => {
          parser.write(chunk, (error) => {
            return error ? reject(error) : resolve();
          });
        });
      };
      this.parser = parser;
      let { readable, writable } = new TransformStream();
      this.readable = readable;
      this.writable = writable;
      this.parser.on("error", function(err) {
        console.error(err.message);
      });
    }
    on(event, cb) {
      this.parser.on(event, cb);
      return this;
    }
    async fromRequest(req) {
      let res = await fetch(req);
      return this.transform(res);
    }
    async parse(res) {
      if (!res || !res.body) {
        return Promise.resolve(this.parsedArray);
      }
      const reader = res.body.getReader(), parser = this.parser;
      parser.on("readable", (record) => {
        while (record = parser.read()) {
          this.parsedArray.push(record);
        }
      });
      await new Promise((resolve, reject) => {
        reader.read().then(function processText({ done, value: value_1 }) {
          if (done) {
            parser.end();
            return Promise.resolve(resolve(null));
          }
          return parser.promisedWrite(value_1).then(() => {
            return reader.read().then(processText);
          });
        });
      });
      return this.parsedArray;
    }
    transform(res) {
      if (!res || !res.body) {
        return res;
      }
      let encoder = new TextEncoder(), decoder = new TextDecoder();
      let { readable, writable } = new TransformStream();
      const writer = writable.getWriter(), reader = res.body.getReader(), parser = this.parser;
      parser.on("readable", (record) => {
        while (record = parser.read()) {
          let chukifiedRecord = encoder.encode(this.separator + JSON.stringify(record));
          writer.write(chukifiedRecord);
          this.separator = ",";
        }
      });
      reader.read().then(function processText({ done, value }) {
        if (done) {
          writer.write(encoder.encode("]"));
          parser.end();
          writer.close();
          return Promise.resolve(null);
        }
        return parser.promisedWrite(value).then(() => {
          return reader.read().then(processText);
        }).catch((err) => {
          console.error(err);
          return reader.read().then(processText);
        });
      });
      return new Response(readable, {
        headers: { "content-type": "application/json;charset=UTF-8" }
      });
    }
  };
})();
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL2Nzdi1wYXJzZS9saWIvYnJvd3Nlci9pbmRleC5qcyIsICIuLi9zcmMvSFRNTFRhYmxlUGFyc2VyLnRzIiwgIi4uL3NyYy9TdHJlYW1pbmdDU1ZQYXJzZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLnBhcnNlID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKEJ1ZmZlcil7KGZ1bmN0aW9uICgpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxudmFyIFJlc2l6ZWFibGVCdWZmZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBSZXNpemVhYmxlQnVmZmVyKCkge1xuICAgIHZhciBzaXplID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAxMDA7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVzaXplYWJsZUJ1ZmZlcik7XG5cbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLmJ1ZiA9IEJ1ZmZlci5hbGxvYyhzaXplKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhSZXNpemVhYmxlQnVmZmVyLCBbe1xuICAgIGtleTogXCJwcmVwZW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByZXBlbmQodmFsKSB7XG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoICsgdmFsLmxlbmd0aDtcblxuICAgICAgICBpZiAobGVuZ3RoID49IHRoaXMuc2l6ZSkge1xuICAgICAgICAgIHRoaXMucmVzaXplKCk7XG5cbiAgICAgICAgICBpZiAobGVuZ3RoID49IHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0lOVkFMSURfQlVGRkVSX1NUQVRFJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGJ1ZiA9IHRoaXMuYnVmO1xuICAgICAgICB0aGlzLmJ1ZiA9IEJ1ZmZlci5hbGxvYyh0aGlzLnNpemUpO1xuICAgICAgICB2YWwuY29weSh0aGlzLmJ1ZiwgMCk7XG4gICAgICAgIGJ1Zi5jb3B5KHRoaXMuYnVmLCB2YWwubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKz0gdmFsLmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBfbGVuZ3RoID0gdGhpcy5sZW5ndGgrKztcblxuICAgICAgICBpZiAoX2xlbmd0aCA9PT0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfYnVmID0gdGhpcy5jbG9uZSgpO1xuXG4gICAgICAgIHRoaXMuYnVmWzBdID0gdmFsO1xuXG4gICAgICAgIF9idWYuY29weSh0aGlzLmJ1ZiwgMSwgMCwgX2xlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFwcGVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhcHBlbmQodmFsKSB7XG4gICAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGgrKztcblxuICAgICAgaWYgKGxlbmd0aCA9PT0gdGhpcy5zaXplKSB7XG4gICAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYnVmW2xlbmd0aF0gPSB2YWw7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsb25lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsb25lKCkge1xuICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHRoaXMuYnVmLnNsaWNlKDAsIHRoaXMubGVuZ3RoKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlc2l6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gICAgICB0aGlzLnNpemUgPSB0aGlzLnNpemUgKiAyO1xuICAgICAgdmFyIGJ1ZiA9IEJ1ZmZlci5hbGxvYyh0aGlzLnNpemUpO1xuICAgICAgdGhpcy5idWYuY29weShidWYsIDAsIDAsIGxlbmd0aCk7XG4gICAgICB0aGlzLmJ1ZiA9IGJ1ZjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidG9TdHJpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoZW5jb2RpbmcpIHtcbiAgICAgIGlmIChlbmNvZGluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5idWYuc2xpY2UoMCwgdGhpcy5sZW5ndGgpLnRvU3RyaW5nKGVuY29kaW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuYnVmLnNsaWNlKDAsIHRoaXMubGVuZ3RoKSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRvSlNPTlwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b1N0cmluZygndXRmOCcpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXNldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUmVzaXplYWJsZUJ1ZmZlcjtcbn0oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZXNpemVhYmxlQnVmZmVyO1xuXG59KS5jYWxsKHRoaXMpfSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyKVxufSx7XCJidWZmZXJcIjo1fV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKEJ1ZmZlcixzZXRJbW1lZGlhdGUpeyhmdW5jdGlvbiAoKXtcblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfd3JhcE5hdGl2ZVN1cGVyKENsYXNzKSB7IHZhciBfY2FjaGUgPSB0eXBlb2YgTWFwID09PSBcImZ1bmN0aW9uXCIgPyBuZXcgTWFwKCkgOiB1bmRlZmluZWQ7IF93cmFwTmF0aXZlU3VwZXIgPSBmdW5jdGlvbiBfd3JhcE5hdGl2ZVN1cGVyKENsYXNzKSB7IGlmIChDbGFzcyA9PT0gbnVsbCB8fCAhX2lzTmF0aXZlRnVuY3Rpb24oQ2xhc3MpKSByZXR1cm4gQ2xhc3M7IGlmICh0eXBlb2YgQ2xhc3MgIT09IFwiZnVuY3Rpb25cIikgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gaWYgKHR5cGVvZiBfY2FjaGUgIT09IFwidW5kZWZpbmVkXCIpIHsgaWYgKF9jYWNoZS5oYXMoQ2xhc3MpKSByZXR1cm4gX2NhY2hlLmdldChDbGFzcyk7IF9jYWNoZS5zZXQoQ2xhc3MsIFdyYXBwZXIpOyB9IGZ1bmN0aW9uIFdyYXBwZXIoKSB7IHJldHVybiBfY29uc3RydWN0KENsYXNzLCBhcmd1bWVudHMsIF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3Rvcik7IH0gV3JhcHBlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogV3JhcHBlciwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihXcmFwcGVyLCBDbGFzcyk7IH07IHJldHVybiBfd3JhcE5hdGl2ZVN1cGVyKENsYXNzKTsgfVxuXG5mdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHsgaWYgKF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSkgeyBfY29uc3RydWN0ID0gUmVmbGVjdC5jb25zdHJ1Y3Q7IH0gZWxzZSB7IF9jb25zdHJ1Y3QgPSBmdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHsgdmFyIGEgPSBbbnVsbF07IGEucHVzaC5hcHBseShhLCBhcmdzKTsgdmFyIENvbnN0cnVjdG9yID0gRnVuY3Rpb24uYmluZC5hcHBseShQYXJlbnQsIGEpOyB2YXIgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoKTsgaWYgKENsYXNzKSBfc2V0UHJvdG90eXBlT2YoaW5zdGFuY2UsIENsYXNzLnByb3RvdHlwZSk7IHJldHVybiBpbnN0YW5jZTsgfTsgfSByZXR1cm4gX2NvbnN0cnVjdC5hcHBseShudWxsLCBhcmd1bWVudHMpOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZUZ1bmN0aW9uKGZuKSB7IHJldHVybiBGdW5jdGlvbi50b1N0cmluZy5jYWxsKGZuKS5pbmRleE9mKFwiW25hdGl2ZSBjb2RlXVwiKSAhPT0gLTE7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5KGFycikgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7IGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbU3ltYm9sLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KGFycik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBpZiAoZW51bWVyYWJsZU9ubHkpIHsgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyB9IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgaWYgKGkgJSAyKSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSk7IH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHsgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTsgfSBlbHNlIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5mdW5jdGlvbiBfY3JlYXRlU3VwZXIoRGVyaXZlZCkgeyB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTsgcmV0dXJuIGZ1bmN0aW9uIF9jcmVhdGVTdXBlckludGVybmFsKCkgeyB2YXIgU3VwZXIgPSBfZ2V0UHJvdG90eXBlT2YoRGVyaXZlZCksIHJlc3VsdDsgaWYgKGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QpIHsgdmFyIE5ld1RhcmdldCA9IF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcjsgcmVzdWx0ID0gUmVmbGVjdC5jb25zdHJ1Y3QoU3VwZXIsIGFyZ3VtZW50cywgTmV3VGFyZ2V0KTsgfSBlbHNlIHsgcmVzdWx0ID0gU3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfSByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgcmVzdWx0KTsgfTsgfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgeyBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7IGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7IGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7IHRyeSB7IEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChCb29sZWFuLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG4vKlxuQ1NWIFBhcnNlXG5cblBsZWFzZSBsb29rIGF0IHRoZSBbcHJvamVjdCBkb2N1bWVudGF0aW9uXShodHRwczovL2Nzdi5qcy5vcmcvcGFyc2UvKSBmb3JcbmFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG4qL1xudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnc3RyZWFtJyksXG4gICAgVHJhbnNmb3JtID0gX3JlcXVpcmUuVHJhbnNmb3JtO1xuXG52YXIgUmVzaXplYWJsZUJ1ZmZlciA9IHJlcXVpcmUoJy4vUmVzaXplYWJsZUJ1ZmZlcicpOyAvLyB3aGl0ZSBzcGFjZSBjaGFyYWN0ZXJzXG4vLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9XaGl0ZXNwYWNlX2NoYXJhY3RlclxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9HdWlkZS9SZWd1bGFyX0V4cHJlc3Npb25zL0NoYXJhY3Rlcl9DbGFzc2VzI1R5cGVzXG4vLyBcXGZcXG5cXHJcXHRcXHZcXHUwMGEwXFx1MTY4MFxcdTIwMDAtXFx1MjAwYVxcdTIwMjhcXHUyMDI5XFx1MjAyZlxcdTIwNWZcXHUzMDAwXFx1ZmVmZlxuXG5cbnZhciB0YWIgPSA5O1xudmFyIG5sID0gMTA7IC8vIFxcbiwgMHgwQSBpbiBoZXhhZGVjaW1hbCwgMTAgaW4gZGVjaW1hbFxuXG52YXIgbnAgPSAxMjtcbnZhciBjciA9IDEzOyAvLyBcXHIsIDB4MEQgaW4gaGV4YWRcdTAwRTljaW1hbCwgMTMgaW4gZGVjaW1hbFxuXG52YXIgc3BhY2UgPSAzMjtcbnZhciBib21zID0ge1xuICAvLyBOb3RlLCB0aGUgZm9sbG93aW5nIGFyZSBlcXVhbHM6XG4gIC8vIEJ1ZmZlci5mcm9tKFwiXFx1ZmVmZlwiKVxuICAvLyBCdWZmZXIuZnJvbShbMjM5LCAxODcsIDE5MV0pXG4gIC8vIEJ1ZmZlci5mcm9tKCdFRkJCQkYnLCAnaGV4JylcbiAgJ3V0ZjgnOiBCdWZmZXIuZnJvbShbMjM5LCAxODcsIDE5MV0pLFxuICAvLyBOb3RlLCB0aGUgZm9sbG93aW5nIGFyZSBlcXVhbHM6XG4gIC8vIEJ1ZmZlci5mcm9tIFwiXFx1ZmVmZlwiLCAndXRmMTZsZVxuICAvLyBCdWZmZXIuZnJvbShbMjU1LCAyNTRdKVxuICAndXRmMTZsZSc6IEJ1ZmZlci5mcm9tKFsyNTUsIDI1NF0pXG59O1xuXG52YXIgUGFyc2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfVHJhbnNmb3JtKSB7XG4gIF9pbmhlcml0cyhQYXJzZXIsIF9UcmFuc2Zvcm0pO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoUGFyc2VyKTtcblxuICBmdW5jdGlvbiBQYXJzZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBhcnNlcik7XG5cbiAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHt9LCB7XG4gICAgICByZWFkYWJsZU9iamVjdE1vZGU6IHRydWVcbiAgICB9KSwgb3B0cyksIHt9LCB7XG4gICAgICBlbmNvZGluZzogbnVsbFxuICAgIH0pKTtcbiAgICBfdGhpcy5fX29yaWdpbmFsT3B0aW9ucyA9IG9wdHM7XG5cbiAgICBfdGhpcy5fX25vcm1hbGl6ZU9wdGlvbnMob3B0cyk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoUGFyc2VyLCBbe1xuICAgIGtleTogXCJfX25vcm1hbGl6ZU9wdGlvbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX19ub3JtYWxpemVPcHRpb25zKG9wdHMpIHtcbiAgICAgIHZhciBvcHRpb25zID0ge307IC8vIE1lcmdlIHdpdGggdXNlciBvcHRpb25zXG5cbiAgICAgIGZvciAodmFyIG9wdCBpbiBvcHRzKSB7XG4gICAgICAgIG9wdGlvbnNbdW5kZXJzY29yZShvcHQpXSA9IG9wdHNbb3B0XTtcbiAgICAgIH0gLy8gTm9ybWFsaXplIG9wdGlvbiBgZW5jb2RpbmdgXG4gICAgICAvLyBOb3RlOiBkZWZpbmVkIGZpcnN0IGJlY2F1c2Ugb3RoZXIgb3B0aW9ucyBkZXBlbmRzIG9uIGl0XG4gICAgICAvLyB0byBjb252ZXJ0IGNoYXJzL3N0cmluZ3MgaW50byBidWZmZXJzLlxuXG5cbiAgICAgIGlmIChvcHRpb25zLmVuY29kaW5nID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5lbmNvZGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICBvcHRpb25zLmVuY29kaW5nID0gJ3V0ZjgnO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmVuY29kaW5nID09PSBudWxsIHx8IG9wdGlvbnMuZW5jb2RpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgIG9wdGlvbnMuZW5jb2RpbmcgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5lbmNvZGluZyAhPT0gJ3N0cmluZycgJiYgb3B0aW9ucy5lbmNvZGluZyAhPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgQ3N2RXJyb3IoJ0NTVl9JTlZBTElEX09QVElPTl9FTkNPRElORycsIFsnSW52YWxpZCBvcHRpb24gZW5jb2Rpbmc6JywgJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcgb3IgbnVsbCB0byByZXR1cm4gYSBidWZmZXIsJywgXCJnb3QgXCIuY29uY2F0KEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuZW5jb2RpbmcpKV0sIG9wdGlvbnMpO1xuICAgICAgfSAvLyBOb3JtYWxpemUgb3B0aW9uIGBib21gXG5cblxuICAgICAgaWYgKG9wdGlvbnMuYm9tID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5ib20gPT09IG51bGwgfHwgb3B0aW9ucy5ib20gPT09IGZhbHNlKSB7XG4gICAgICAgIG9wdGlvbnMuYm9tID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuYm9tICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBDc3ZFcnJvcignQ1NWX0lOVkFMSURfT1BUSU9OX0JPTScsIFsnSW52YWxpZCBvcHRpb24gYm9tOicsICdib20gbXVzdCBiZSB0cnVlLCcsIFwiZ290IFwiLmNvbmNhdChKU09OLnN0cmluZ2lmeShvcHRpb25zLmJvbSkpXSwgb3B0aW9ucyk7XG4gICAgICB9IC8vIE5vcm1hbGl6ZSBvcHRpb24gYGNhc3RgXG5cblxuICAgICAgdmFyIGZuQ2FzdEZpZWxkID0gbnVsbDtcblxuICAgICAgaWYgKG9wdGlvbnMuY2FzdCA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMuY2FzdCA9PT0gbnVsbCB8fCBvcHRpb25zLmNhc3QgPT09IGZhbHNlIHx8IG9wdGlvbnMuY2FzdCA9PT0gJycpIHtcbiAgICAgICAgb3B0aW9ucy5jYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5jYXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZuQ2FzdEZpZWxkID0gb3B0aW9ucy5jYXN0O1xuICAgICAgICBvcHRpb25zLmNhc3QgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmNhc3QgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IENzdkVycm9yKCdDU1ZfSU5WQUxJRF9PUFRJT05fQ0FTVCcsIFsnSW52YWxpZCBvcHRpb24gY2FzdDonLCAnY2FzdCBtdXN0IGJlIHRydWUgb3IgYSBmdW5jdGlvbiwnLCBcImdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5jYXN0KSldLCBvcHRpb25zKTtcbiAgICAgIH0gLy8gTm9ybWFsaXplIG9wdGlvbiBgY2FzdF9kYXRlYFxuXG5cbiAgICAgIGlmIChvcHRpb25zLmNhc3RfZGF0ZSA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMuY2FzdF9kYXRlID09PSBudWxsIHx8IG9wdGlvbnMuY2FzdF9kYXRlID09PSBmYWxzZSB8fCBvcHRpb25zLmNhc3RfZGF0ZSA9PT0gJycpIHtcbiAgICAgICAgb3B0aW9ucy5jYXN0X2RhdGUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5jYXN0X2RhdGUgPT09IHRydWUpIHtcbiAgICAgICAgb3B0aW9ucy5jYXN0X2RhdGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICB2YXIgZGF0ZSA9IERhdGUucGFyc2UodmFsdWUpO1xuICAgICAgICAgIHJldHVybiAhaXNOYU4oZGF0ZSkgPyBuZXcgRGF0ZShkYXRlKSA6IHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5jYXN0X2RhdGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IENzdkVycm9yKCdDU1ZfSU5WQUxJRF9PUFRJT05fQ0FTVF9EQVRFJywgWydJbnZhbGlkIG9wdGlvbiBjYXN0X2RhdGU6JywgJ2Nhc3RfZGF0ZSBtdXN0IGJlIHRydWUgb3IgYSBmdW5jdGlvbiwnLCBcImdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5jYXN0X2RhdGUpKV0sIG9wdGlvbnMpO1xuICAgICAgfSAvLyBOb3JtYWxpemUgb3B0aW9uIGBjb2x1bW5zYFxuXG5cbiAgICAgIHZhciBmbkZpcnN0TGluZVRvSGVhZGVycyA9IG51bGw7XG5cbiAgICAgIGlmIChvcHRpb25zLmNvbHVtbnMgPT09IHRydWUpIHtcbiAgICAgICAgLy8gRmllbGRzIGluIHRoZSBmaXJzdCBsaW5lIGFyZSBjb252ZXJ0ZWQgYXMtaXMgdG8gY29sdW1uc1xuICAgICAgICBmbkZpcnN0TGluZVRvSGVhZGVycyA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuY29sdW1ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmbkZpcnN0TGluZVRvSGVhZGVycyA9IG9wdGlvbnMuY29sdW1ucztcbiAgICAgICAgb3B0aW9ucy5jb2x1bW5zID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLmNvbHVtbnMpKSB7XG4gICAgICAgIG9wdGlvbnMuY29sdW1ucyA9IG5vcm1hbGl6ZUNvbHVtbnNBcnJheShvcHRpb25zLmNvbHVtbnMpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmNvbHVtbnMgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLmNvbHVtbnMgPT09IG51bGwgfHwgb3B0aW9ucy5jb2x1bW5zID09PSBmYWxzZSkge1xuICAgICAgICBvcHRpb25zLmNvbHVtbnMgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBDc3ZFcnJvcignQ1NWX0lOVkFMSURfT1BUSU9OX0NPTFVNTlMnLCBbJ0ludmFsaWQgb3B0aW9uIGNvbHVtbnM6JywgJ2V4cGVjdCBhbiBhcnJheSwgYSBmdW5jdGlvbiBvciB0cnVlLCcsIFwiZ290IFwiLmNvbmNhdChKU09OLnN0cmluZ2lmeShvcHRpb25zLmNvbHVtbnMpKV0sIG9wdGlvbnMpO1xuICAgICAgfSAvLyBOb3JtYWxpemUgb3B0aW9uIGBjb2x1bW5zX2R1cGxpY2F0ZXNfdG9fYXJyYXlgXG5cblxuICAgICAgaWYgKG9wdGlvbnMuY29sdW1uc19kdXBsaWNhdGVzX3RvX2FycmF5ID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5jb2x1bW5zX2R1cGxpY2F0ZXNfdG9fYXJyYXkgPT09IG51bGwgfHwgb3B0aW9ucy5jb2x1bW5zX2R1cGxpY2F0ZXNfdG9fYXJyYXkgPT09IGZhbHNlKSB7XG4gICAgICAgIG9wdGlvbnMuY29sdW1uc19kdXBsaWNhdGVzX3RvX2FycmF5ID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuY29sdW1uc19kdXBsaWNhdGVzX3RvX2FycmF5ICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBDc3ZFcnJvcignQ1NWX0lOVkFMSURfT1BUSU9OX0NPTFVNTlNfRFVQTElDQVRFU19UT19BUlJBWScsIFsnSW52YWxpZCBvcHRpb24gY29sdW1uc19kdXBsaWNhdGVzX3RvX2FycmF5OicsICdleHBlY3QgYW4gYm9vbGVhbiwnLCBcImdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5jb2x1bW5zX2R1cGxpY2F0ZXNfdG9fYXJyYXkpKV0sIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmNvbHVtbnMgPT09IGZhbHNlKSB7XG4gICAgICAgIHRocm93IG5ldyBDc3ZFcnJvcignQ1NWX0lOVkFMSURfT1BUSU9OX0NPTFVNTlNfRFVQTElDQVRFU19UT19BUlJBWScsIFsnSW52YWxpZCBvcHRpb24gY29sdW1uc19kdXBsaWNhdGVzX3RvX2FycmF5OicsICd0aGUgYGNvbHVtbnNgIG1vZGUgbXVzdCBiZSBhY3RpdmF0ZWQuJ10sIG9wdGlvbnMpO1xuICAgICAgfSAvLyBOb3JtYWxpemUgb3B0aW9uIGBjb21tZW50YFxuXG5cbiAgICAgIGlmIChvcHRpb25zLmNvbW1lbnQgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLmNvbW1lbnQgPT09IG51bGwgfHwgb3B0aW9ucy5jb21tZW50ID09PSBmYWxzZSB8fCBvcHRpb25zLmNvbW1lbnQgPT09ICcnKSB7XG4gICAgICAgIG9wdGlvbnMuY29tbWVudCA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuY29tbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBvcHRpb25zLmNvbW1lbnQgPSBCdWZmZXIuZnJvbShvcHRpb25zLmNvbW1lbnQsIG9wdGlvbnMuZW5jb2RpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIob3B0aW9ucy5jb21tZW50KSkge1xuICAgICAgICAgIHRocm93IG5ldyBDc3ZFcnJvcignQ1NWX0lOVkFMSURfT1BUSU9OX0NPTU1FTlQnLCBbJ0ludmFsaWQgb3B0aW9uIGNvbW1lbnQ6JywgJ2NvbW1lbnQgbXVzdCBiZSBhIGJ1ZmZlciBvciBhIHN0cmluZywnLCBcImdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5jb21tZW50KSldLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfSAvLyBOb3JtYWxpemUgb3B0aW9uIGBkZWxpbWl0ZXJgXG5cblxuICAgICAgdmFyIGRlbGltaXRlcl9qc29uID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5kZWxpbWl0ZXIpO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9wdGlvbnMuZGVsaW1pdGVyKSkgb3B0aW9ucy5kZWxpbWl0ZXIgPSBbb3B0aW9ucy5kZWxpbWl0ZXJdO1xuXG4gICAgICBpZiAob3B0aW9ucy5kZWxpbWl0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBDc3ZFcnJvcignQ1NWX0lOVkFMSURfT1BUSU9OX0RFTElNSVRFUicsIFsnSW52YWxpZCBvcHRpb24gZGVsaW1pdGVyOicsICdkZWxpbWl0ZXIgbXVzdCBiZSBhIG5vbiBlbXB0eSBzdHJpbmcgb3IgYnVmZmVyIG9yIGFycmF5IG9mIHN0cmluZ3xidWZmZXIsJywgXCJnb3QgXCIuY29uY2F0KGRlbGltaXRlcl9qc29uKV0sIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zLmRlbGltaXRlciA9IG9wdGlvbnMuZGVsaW1pdGVyLm1hcChmdW5jdGlvbiAoZGVsaW1pdGVyKSB7XG4gICAgICAgIGlmIChkZWxpbWl0ZXIgPT09IHVuZGVmaW5lZCB8fCBkZWxpbWl0ZXIgPT09IG51bGwgfHwgZGVsaW1pdGVyID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiBCdWZmZXIuZnJvbSgnLCcsIG9wdGlvbnMuZW5jb2RpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkZWxpbWl0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZGVsaW1pdGVyID0gQnVmZmVyLmZyb20oZGVsaW1pdGVyLCBvcHRpb25zLmVuY29kaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGRlbGltaXRlcikgfHwgZGVsaW1pdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBDc3ZFcnJvcignQ1NWX0lOVkFMSURfT1BUSU9OX0RFTElNSVRFUicsIFsnSW52YWxpZCBvcHRpb24gZGVsaW1pdGVyOicsICdkZWxpbWl0ZXIgbXVzdCBiZSBhIG5vbiBlbXB0eSBzdHJpbmcgb3IgYnVmZmVyIG9yIGFycmF5IG9mIHN0cmluZ3xidWZmZXIsJywgXCJnb3QgXCIuY29uY2F0KGRlbGltaXRlcl9qc29uKV0sIG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlbGltaXRlcjtcbiAgICAgIH0pOyAvLyBOb3JtYWxpemUgb3B0aW9uIGBlc2NhcGVgXG5cbiAgICAgIGlmIChvcHRpb25zLmVzY2FwZSA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMuZXNjYXBlID09PSB0cnVlKSB7XG4gICAgICAgIG9wdGlvbnMuZXNjYXBlID0gQnVmZmVyLmZyb20oJ1wiJywgb3B0aW9ucy5lbmNvZGluZyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmVzY2FwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb3B0aW9ucy5lc2NhcGUgPSBCdWZmZXIuZnJvbShvcHRpb25zLmVzY2FwZSwgb3B0aW9ucy5lbmNvZGluZyk7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZXNjYXBlID09PSBudWxsIHx8IG9wdGlvbnMuZXNjYXBlID09PSBmYWxzZSkge1xuICAgICAgICBvcHRpb25zLmVzY2FwZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmVzY2FwZSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihvcHRpb25zLmVzY2FwZSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE9wdGlvbjogZXNjYXBlIG11c3QgYmUgYSBidWZmZXIsIGEgc3RyaW5nIG9yIGEgYm9vbGVhbiwgZ290IFwiLmNvbmNhdChKU09OLnN0cmluZ2lmeShvcHRpb25zLmVzY2FwZSkpKTtcbiAgICAgICAgfVxuICAgICAgfSAvLyBOb3JtYWxpemUgb3B0aW9uIGBmcm9tYFxuXG5cbiAgICAgIGlmIChvcHRpb25zLmZyb20gPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLmZyb20gPT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucy5mcm9tID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5mcm9tID09PSAnc3RyaW5nJyAmJiAvXFxkKy8udGVzdChvcHRpb25zLmZyb20pKSB7XG4gICAgICAgICAgb3B0aW9ucy5mcm9tID0gcGFyc2VJbnQob3B0aW9ucy5mcm9tKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMuZnJvbSkpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5mcm9tIDwgMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBPcHRpb246IGZyb20gbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIsIGdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0cy5mcm9tKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE9wdGlvbjogZnJvbSBtdXN0IGJlIGFuIGludGVnZXIsIGdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5mcm9tKSkpO1xuICAgICAgICB9XG4gICAgICB9IC8vIE5vcm1hbGl6ZSBvcHRpb24gYGZyb21fbGluZWBcblxuXG4gICAgICBpZiAob3B0aW9ucy5mcm9tX2xpbmUgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLmZyb21fbGluZSA9PT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLmZyb21fbGluZSA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZnJvbV9saW5lID09PSAnc3RyaW5nJyAmJiAvXFxkKy8udGVzdChvcHRpb25zLmZyb21fbGluZSkpIHtcbiAgICAgICAgICBvcHRpb25zLmZyb21fbGluZSA9IHBhcnNlSW50KG9wdGlvbnMuZnJvbV9saW5lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMuZnJvbV9saW5lKSkge1xuICAgICAgICAgIGlmIChvcHRpb25zLmZyb21fbGluZSA8PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE9wdGlvbjogZnJvbV9saW5lIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiAwLCBnb3QgXCIuY29uY2F0KEpTT04uc3RyaW5naWZ5KG9wdHMuZnJvbV9saW5lKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE9wdGlvbjogZnJvbV9saW5lIG11c3QgYmUgYW4gaW50ZWdlciwgZ290IFwiLmNvbmNhdChKU09OLnN0cmluZ2lmeShvcHRzLmZyb21fbGluZSkpKTtcbiAgICAgICAgfVxuICAgICAgfSAvLyBOb3JtYWxpemUgb3B0aW9ucyBgaWdub3JlX2xhc3RfZGVsaW1pdGVyc2BcblxuXG4gICAgICBpZiAob3B0aW9ucy5pZ25vcmVfbGFzdF9kZWxpbWl0ZXJzID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5pZ25vcmVfbGFzdF9kZWxpbWl0ZXJzID09PSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMuaWdub3JlX2xhc3RfZGVsaW1pdGVycyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pZ25vcmVfbGFzdF9kZWxpbWl0ZXJzID09PSAnbnVtYmVyJykge1xuICAgICAgICBvcHRpb25zLmlnbm9yZV9sYXN0X2RlbGltaXRlcnMgPSBNYXRoLmZsb29yKG9wdGlvbnMuaWdub3JlX2xhc3RfZGVsaW1pdGVycyk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaWdub3JlX2xhc3RfZGVsaW1pdGVycyA9PT0gMCkge1xuICAgICAgICAgIG9wdGlvbnMuaWdub3JlX2xhc3RfZGVsaW1pdGVycyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmlnbm9yZV9sYXN0X2RlbGltaXRlcnMgIT09ICdib29sZWFuJykge1xuICAgICAgICB0aHJvdyBuZXcgQ3N2RXJyb3IoJ0NTVl9JTlZBTElEX09QVElPTl9JR05PUkVfTEFTVF9ERUxJTUlURVJTJywgWydJbnZhbGlkIG9wdGlvbiBgaWdub3JlX2xhc3RfZGVsaW1pdGVyc2A6JywgJ3RoZSB2YWx1ZSBtdXN0IGJlIGEgYm9vbGVhbiB2YWx1ZSBvciBhbiBpbnRlZ2VyLCcsIFwiZ290IFwiLmNvbmNhdChKU09OLnN0cmluZ2lmeShvcHRpb25zLmlnbm9yZV9sYXN0X2RlbGltaXRlcnMpKV0sIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5pZ25vcmVfbGFzdF9kZWxpbWl0ZXJzID09PSB0cnVlICYmIG9wdGlvbnMuY29sdW1ucyA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IENzdkVycm9yKCdDU1ZfSUdOT1JFX0xBU1RfREVMSU1JVEVSU19SRVFVSVJFU19DT0xVTU5TJywgWydUaGUgb3B0aW9uIGBpZ25vcmVfbGFzdF9kZWxpbWl0ZXJzYCcsICdyZXF1aXJlcyB0aGUgYWN0aXZhdGlvbiBvZiB0aGUgYGNvbHVtbnNgIG9wdGlvbiddLCBvcHRpb25zKTtcbiAgICAgIH0gLy8gTm9ybWFsaXplIG9wdGlvbiBgaW5mb2BcblxuXG4gICAgICBpZiAob3B0aW9ucy5pbmZvID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5pbmZvID09PSBudWxsIHx8IG9wdGlvbnMuaW5mbyA9PT0gZmFsc2UpIHtcbiAgICAgICAgb3B0aW9ucy5pbmZvID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuaW5mbyAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE9wdGlvbjogaW5mbyBtdXN0IGJlIHRydWUsIGdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5pbmZvKSkpO1xuICAgICAgfSAvLyBOb3JtYWxpemUgb3B0aW9uIGBtYXhfcmVjb3JkX3NpemVgXG5cblxuICAgICAgaWYgKG9wdGlvbnMubWF4X3JlY29yZF9zaXplID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5tYXhfcmVjb3JkX3NpemUgPT09IG51bGwgfHwgb3B0aW9ucy5tYXhfcmVjb3JkX3NpemUgPT09IGZhbHNlKSB7XG4gICAgICAgIG9wdGlvbnMubWF4X3JlY29yZF9zaXplID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLm1heF9yZWNvcmRfc2l6ZSkgJiYgb3B0aW9ucy5tYXhfcmVjb3JkX3NpemUgPj0gMCkgey8vIEdyZWF0LCBub3RoaW5nIHRvIGRvXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLm1heF9yZWNvcmRfc2l6ZSA9PT0gJ3N0cmluZycgJiYgL1xcZCsvLnRlc3Qob3B0aW9ucy5tYXhfcmVjb3JkX3NpemUpKSB7XG4gICAgICAgIG9wdGlvbnMubWF4X3JlY29yZF9zaXplID0gcGFyc2VJbnQob3B0aW9ucy5tYXhfcmVjb3JkX3NpemUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBPcHRpb246IG1heF9yZWNvcmRfc2l6ZSBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciwgZ290IFwiLmNvbmNhdChKU09OLnN0cmluZ2lmeShvcHRpb25zLm1heF9yZWNvcmRfc2l6ZSkpKTtcbiAgICAgIH0gLy8gTm9ybWFsaXplIG9wdGlvbiBgb2JqbmFtZWBcblxuXG4gICAgICBpZiAob3B0aW9ucy5vYmpuYW1lID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5vYmpuYW1lID09PSBudWxsIHx8IG9wdGlvbnMub2JqbmFtZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgb3B0aW9ucy5vYmpuYW1lID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIGlmIChCdWZmZXIuaXNCdWZmZXIob3B0aW9ucy5vYmpuYW1lKSkge1xuICAgICAgICBpZiAob3B0aW9ucy5vYmpuYW1lLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgT3B0aW9uOiBvYmpuYW1lIG11c3QgYmUgYSBub24gZW1wdHkgYnVmZmVyXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZW5jb2RpbmcgPT09IG51bGwpIHsvLyBEb24ndCBjYWxsIGB0b1N0cmluZ2AsIGxlYXZlIG9iam5hbWUgYXMgYSBidWZmZXJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zLm9iam5hbWUgPSBvcHRpb25zLm9iam5hbWUudG9TdHJpbmcob3B0aW9ucy5lbmNvZGluZyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMub2JqbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMub2JqbmFtZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE9wdGlvbjogb2JqbmFtZSBtdXN0IGJlIGEgbm9uIGVtcHR5IHN0cmluZ1wiKTtcbiAgICAgICAgfSAvLyBHcmVhdCwgbm90aGluZyB0byBkb1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE9wdGlvbjogb2JqbmFtZSBtdXN0IGJlIGEgc3RyaW5nIG9yIGEgYnVmZmVyLCBnb3QgXCIuY29uY2F0KG9wdGlvbnMub2JqbmFtZSkpO1xuICAgICAgfSAvLyBOb3JtYWxpemUgb3B0aW9uIGBvbl9yZWNvcmRgXG5cblxuICAgICAgaWYgKG9wdGlvbnMub25fcmVjb3JkID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5vbl9yZWNvcmQgPT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucy5vbl9yZWNvcmQgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLm9uX3JlY29yZCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgQ3N2RXJyb3IoJ0NTVl9JTlZBTElEX09QVElPTl9PTl9SRUNPUkQnLCBbJ0ludmFsaWQgb3B0aW9uIGBvbl9yZWNvcmRgOicsICdleHBlY3QgYSBmdW5jdGlvbiwnLCBcImdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5vbl9yZWNvcmQpKV0sIG9wdGlvbnMpO1xuICAgICAgfSAvLyBOb3JtYWxpemUgb3B0aW9uIGBxdW90ZWBcblxuXG4gICAgICBpZiAob3B0aW9ucy5xdW90ZSA9PT0gbnVsbCB8fCBvcHRpb25zLnF1b3RlID09PSBmYWxzZSB8fCBvcHRpb25zLnF1b3RlID09PSAnJykge1xuICAgICAgICBvcHRpb25zLnF1b3RlID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChvcHRpb25zLnF1b3RlID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5xdW90ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG9wdGlvbnMucXVvdGUgPSBCdWZmZXIuZnJvbSgnXCInLCBvcHRpb25zLmVuY29kaW5nKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5xdW90ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBvcHRpb25zLnF1b3RlID0gQnVmZmVyLmZyb20ob3B0aW9ucy5xdW90ZSwgb3B0aW9ucy5lbmNvZGluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihvcHRpb25zLnF1b3RlKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgT3B0aW9uOiBxdW90ZSBtdXN0IGJlIGEgYnVmZmVyIG9yIGEgc3RyaW5nLCBnb3QgXCIuY29uY2F0KEpTT04uc3RyaW5naWZ5KG9wdGlvbnMucXVvdGUpKSk7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gTm9ybWFsaXplIG9wdGlvbiBgcmF3YFxuXG5cbiAgICAgIGlmIChvcHRpb25zLnJhdyA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMucmF3ID09PSBudWxsIHx8IG9wdGlvbnMucmF3ID09PSBmYWxzZSkge1xuICAgICAgICBvcHRpb25zLnJhdyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnJhdyAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE9wdGlvbjogcmF3IG11c3QgYmUgdHJ1ZSwgZ290IFwiLmNvbmNhdChKU09OLnN0cmluZ2lmeShvcHRpb25zLnJhdykpKTtcbiAgICAgIH0gLy8gTm9ybWFsaXplIG9wdGlvbiBgcmVjb3JkX2RlbGltaXRlcmBcblxuXG4gICAgICBpZiAoIW9wdGlvbnMucmVjb3JkX2RlbGltaXRlcikge1xuICAgICAgICBvcHRpb25zLnJlY29yZF9kZWxpbWl0ZXIgPSBbXTtcbiAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkob3B0aW9ucy5yZWNvcmRfZGVsaW1pdGVyKSkge1xuICAgICAgICBvcHRpb25zLnJlY29yZF9kZWxpbWl0ZXIgPSBbb3B0aW9ucy5yZWNvcmRfZGVsaW1pdGVyXTtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucy5yZWNvcmRfZGVsaW1pdGVyID0gb3B0aW9ucy5yZWNvcmRfZGVsaW1pdGVyLm1hcChmdW5jdGlvbiAocmQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICByZCA9IEJ1ZmZlci5mcm9tKHJkLCBvcHRpb25zLmVuY29kaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZDtcbiAgICAgIH0pOyAvLyBOb3JtYWxpemUgb3B0aW9uIGByZWxheGBcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnJlbGF4ID09PSAnYm9vbGVhbicpIHsvLyBHcmVhdCwgbm90aGluZyB0byBkb1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnJlbGF4ID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5yZWxheCA9PT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLnJlbGF4ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE9wdGlvbjogcmVsYXggbXVzdCBiZSBhIGJvb2xlYW4sIGdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5yZWxheCkpKTtcbiAgICAgIH0gLy8gTm9ybWFsaXplIG9wdGlvbiBgcmVsYXhfY29sdW1uX2NvdW50YFxuXG5cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5yZWxheF9jb2x1bW5fY291bnQgPT09ICdib29sZWFuJykgey8vIEdyZWF0LCBub3RoaW5nIHRvIGRvXG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMucmVsYXhfY29sdW1uX2NvdW50ID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5yZWxheF9jb2x1bW5fY291bnQgPT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucy5yZWxheF9jb2x1bW5fY291bnQgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgT3B0aW9uOiByZWxheF9jb2x1bW5fY291bnQgbXVzdCBiZSBhIGJvb2xlYW4sIGdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5yZWxheF9jb2x1bW5fY291bnQpKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5yZWxheF9jb2x1bW5fY291bnRfbGVzcyA9PT0gJ2Jvb2xlYW4nKSB7Ly8gR3JlYXQsIG5vdGhpbmcgdG8gZG9cbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5yZWxheF9jb2x1bW5fY291bnRfbGVzcyA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMucmVsYXhfY29sdW1uX2NvdW50X2xlc3MgPT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucy5yZWxheF9jb2x1bW5fY291bnRfbGVzcyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBPcHRpb246IHJlbGF4X2NvbHVtbl9jb3VudF9sZXNzIG11c3QgYmUgYSBib29sZWFuLCBnb3QgXCIuY29uY2F0KEpTT04uc3RyaW5naWZ5KG9wdGlvbnMucmVsYXhfY29sdW1uX2NvdW50X2xlc3MpKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5yZWxheF9jb2x1bW5fY291bnRfbW9yZSA9PT0gJ2Jvb2xlYW4nKSB7Ly8gR3JlYXQsIG5vdGhpbmcgdG8gZG9cbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5yZWxheF9jb2x1bW5fY291bnRfbW9yZSA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMucmVsYXhfY29sdW1uX2NvdW50X21vcmUgPT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucy5yZWxheF9jb2x1bW5fY291bnRfbW9yZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBPcHRpb246IHJlbGF4X2NvbHVtbl9jb3VudF9tb3JlIG11c3QgYmUgYSBib29sZWFuLCBnb3QgXCIuY29uY2F0KEpTT04uc3RyaW5naWZ5KG9wdGlvbnMucmVsYXhfY29sdW1uX2NvdW50X21vcmUpKSk7XG4gICAgICB9IC8vIE5vcm1hbGl6ZSBvcHRpb24gYHNraXBfZW1wdHlfbGluZXNgXG5cblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnNraXBfZW1wdHlfbGluZXMgPT09ICdib29sZWFuJykgey8vIEdyZWF0LCBub3RoaW5nIHRvIGRvXG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuc2tpcF9lbXB0eV9saW5lcyA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMuc2tpcF9lbXB0eV9saW5lcyA9PT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLnNraXBfZW1wdHlfbGluZXMgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgT3B0aW9uOiBza2lwX2VtcHR5X2xpbmVzIG11c3QgYmUgYSBib29sZWFuLCBnb3QgXCIuY29uY2F0KEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuc2tpcF9lbXB0eV9saW5lcykpKTtcbiAgICAgIH0gLy8gTm9ybWFsaXplIG9wdGlvbiBgc2tpcF9saW5lc193aXRoX2VtcHR5X3ZhbHVlc2BcblxuXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMuc2tpcF9saW5lc193aXRoX2VtcHR5X3ZhbHVlcyA9PT0gJ2Jvb2xlYW4nKSB7Ly8gR3JlYXQsIG5vdGhpbmcgdG8gZG9cbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5za2lwX2xpbmVzX3dpdGhfZW1wdHlfdmFsdWVzID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5za2lwX2xpbmVzX3dpdGhfZW1wdHlfdmFsdWVzID09PSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMuc2tpcF9saW5lc193aXRoX2VtcHR5X3ZhbHVlcyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBPcHRpb246IHNraXBfbGluZXNfd2l0aF9lbXB0eV92YWx1ZXMgbXVzdCBiZSBhIGJvb2xlYW4sIGdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5za2lwX2xpbmVzX3dpdGhfZW1wdHlfdmFsdWVzKSkpO1xuICAgICAgfSAvLyBOb3JtYWxpemUgb3B0aW9uIGBza2lwX2xpbmVzX3dpdGhfZXJyb3JgXG5cblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnNraXBfbGluZXNfd2l0aF9lcnJvciA9PT0gJ2Jvb2xlYW4nKSB7Ly8gR3JlYXQsIG5vdGhpbmcgdG8gZG9cbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5za2lwX2xpbmVzX3dpdGhfZXJyb3IgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnNraXBfbGluZXNfd2l0aF9lcnJvciA9PT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLnNraXBfbGluZXNfd2l0aF9lcnJvciA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBPcHRpb246IHNraXBfbGluZXNfd2l0aF9lcnJvciBtdXN0IGJlIGEgYm9vbGVhbiwgZ290IFwiLmNvbmNhdChKU09OLnN0cmluZ2lmeShvcHRpb25zLnNraXBfbGluZXNfd2l0aF9lcnJvcikpKTtcbiAgICAgIH0gLy8gTm9ybWFsaXplIG9wdGlvbiBgcnRyaW1gXG5cblxuICAgICAgaWYgKG9wdGlvbnMucnRyaW0gPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnJ0cmltID09PSBudWxsIHx8IG9wdGlvbnMucnRyaW0gPT09IGZhbHNlKSB7XG4gICAgICAgIG9wdGlvbnMucnRyaW0gPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5ydHJpbSAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE9wdGlvbjogcnRyaW0gbXVzdCBiZSBhIGJvb2xlYW4sIGdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5ydHJpbSkpKTtcbiAgICAgIH0gLy8gTm9ybWFsaXplIG9wdGlvbiBgbHRyaW1gXG5cblxuICAgICAgaWYgKG9wdGlvbnMubHRyaW0gPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLmx0cmltID09PSBudWxsIHx8IG9wdGlvbnMubHRyaW0gPT09IGZhbHNlKSB7XG4gICAgICAgIG9wdGlvbnMubHRyaW0gPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5sdHJpbSAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE9wdGlvbjogbHRyaW0gbXVzdCBiZSBhIGJvb2xlYW4sIGdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5sdHJpbSkpKTtcbiAgICAgIH0gLy8gTm9ybWFsaXplIG9wdGlvbiBgdHJpbWBcblxuXG4gICAgICBpZiAob3B0aW9ucy50cmltID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy50cmltID09PSBudWxsIHx8IG9wdGlvbnMudHJpbSA9PT0gZmFsc2UpIHtcbiAgICAgICAgb3B0aW9ucy50cmltID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMudHJpbSAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE9wdGlvbjogdHJpbSBtdXN0IGJlIGEgYm9vbGVhbiwgZ290IFwiLmNvbmNhdChKU09OLnN0cmluZ2lmeShvcHRpb25zLnRyaW0pKSk7XG4gICAgICB9IC8vIE5vcm1hbGl6ZSBvcHRpb25zIGB0cmltYCwgYGx0cmltYCBhbmQgYHJ0cmltYFxuXG5cbiAgICAgIGlmIChvcHRpb25zLnRyaW0gPT09IHRydWUgJiYgb3B0cy5sdHJpbSAhPT0gZmFsc2UpIHtcbiAgICAgICAgb3B0aW9ucy5sdHJpbSA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMubHRyaW0gIT09IHRydWUpIHtcbiAgICAgICAgb3B0aW9ucy5sdHJpbSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy50cmltID09PSB0cnVlICYmIG9wdHMucnRyaW0gIT09IGZhbHNlKSB7XG4gICAgICAgIG9wdGlvbnMucnRyaW0gPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnJ0cmltICE9PSB0cnVlKSB7XG4gICAgICAgIG9wdGlvbnMucnRyaW0gPSBmYWxzZTtcbiAgICAgIH0gLy8gTm9ybWFsaXplIG9wdGlvbiBgdG9gXG5cblxuICAgICAgaWYgKG9wdGlvbnMudG8gPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnRvID09PSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMudG8gPSAtMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy50byA9PT0gJ3N0cmluZycgJiYgL1xcZCsvLnRlc3Qob3B0aW9ucy50bykpIHtcbiAgICAgICAgICBvcHRpb25zLnRvID0gcGFyc2VJbnQob3B0aW9ucy50byk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLnRvKSkge1xuICAgICAgICAgIGlmIChvcHRpb25zLnRvIDw9IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgT3B0aW9uOiB0byBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciBncmVhdGVyIHRoYW4gMCwgZ290IFwiLmNvbmNhdChKU09OLnN0cmluZ2lmeShvcHRzLnRvKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE9wdGlvbjogdG8gbXVzdCBiZSBhbiBpbnRlZ2VyLCBnb3QgXCIuY29uY2F0KEpTT04uc3RyaW5naWZ5KG9wdHMudG8pKSk7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gTm9ybWFsaXplIG9wdGlvbiBgdG9fbGluZWBcblxuXG4gICAgICBpZiAob3B0aW9ucy50b19saW5lID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy50b19saW5lID09PSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMudG9fbGluZSA9IC0xO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnRvX2xpbmUgPT09ICdzdHJpbmcnICYmIC9cXGQrLy50ZXN0KG9wdGlvbnMudG9fbGluZSkpIHtcbiAgICAgICAgICBvcHRpb25zLnRvX2xpbmUgPSBwYXJzZUludChvcHRpb25zLnRvX2xpbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIob3B0aW9ucy50b19saW5lKSkge1xuICAgICAgICAgIGlmIChvcHRpb25zLnRvX2xpbmUgPD0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBPcHRpb246IHRvX2xpbmUgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIgZ3JlYXRlciB0aGFuIDAsIGdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0cy50b19saW5lKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIE9wdGlvbjogdG9fbGluZSBtdXN0IGJlIGFuIGludGVnZXIsIGdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkob3B0cy50b19saW5lKSkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5mbyA9IHtcbiAgICAgICAgYnl0ZXM6IDAsXG4gICAgICAgIGNvbW1lbnRfbGluZXM6IDAsXG4gICAgICAgIGVtcHR5X2xpbmVzOiAwLFxuICAgICAgICBpbnZhbGlkX2ZpZWxkX2xlbmd0aDogMCxcbiAgICAgICAgbGluZXM6IDEsXG4gICAgICAgIHJlY29yZHM6IDBcbiAgICAgIH07XG4gICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgYm9tU2tpcHBlZDogZmFsc2UsXG4gICAgICAgIGJ1ZkJ5dGVzU3RhcnQ6IDAsXG4gICAgICAgIGNhc3RGaWVsZDogZm5DYXN0RmllbGQsXG4gICAgICAgIGNvbW1lbnRpbmc6IGZhbHNlLFxuICAgICAgICAvLyBDdXJyZW50IGVycm9yIGVuY291bnRlcmVkIGJ5IGEgcmVjb3JkXG4gICAgICAgIGVycm9yOiB1bmRlZmluZWQsXG4gICAgICAgIGVuYWJsZWQ6IG9wdGlvbnMuZnJvbV9saW5lID09PSAxLFxuICAgICAgICBlc2NhcGluZzogZmFsc2UsXG4gICAgICAgIC8vIGVzY2FwZUlzUXVvdGU6IG9wdGlvbnMuZXNjYXBlID09PSBvcHRpb25zLnF1b3RlLFxuICAgICAgICBlc2NhcGVJc1F1b3RlOiBCdWZmZXIuaXNCdWZmZXIob3B0aW9ucy5lc2NhcGUpICYmIEJ1ZmZlci5pc0J1ZmZlcihvcHRpb25zLnF1b3RlKSAmJiBCdWZmZXIuY29tcGFyZShvcHRpb25zLmVzY2FwZSwgb3B0aW9ucy5xdW90ZSkgPT09IDAsXG4gICAgICAgIC8vIGNvbHVtbnMgY2FuIGJlIGBmYWxzZWAsIGB0cnVlYCwgYEFycmF5YFxuICAgICAgICBleHBlY3RlZFJlY29yZExlbmd0aDogQXJyYXkuaXNBcnJheShvcHRpb25zLmNvbHVtbnMpID8gb3B0aW9ucy5jb2x1bW5zLmxlbmd0aCA6IHVuZGVmaW5lZCxcbiAgICAgICAgZmllbGQ6IG5ldyBSZXNpemVhYmxlQnVmZmVyKDIwKSxcbiAgICAgICAgZmlyc3RMaW5lVG9IZWFkZXJzOiBmbkZpcnN0TGluZVRvSGVhZGVycyxcbiAgICAgICAgbmVlZE1vcmVEYXRhU2l6ZTogTWF0aC5tYXguYXBwbHkoTWF0aCwgWy8vIFNraXAgaWYgdGhlIHJlbWFpbmluZyBidWZmZXIgc21hbGxlciB0aGFuIGNvbW1lbnRcbiAgICAgICAgb3B0aW9ucy5jb21tZW50ICE9PSBudWxsID8gb3B0aW9ucy5jb21tZW50Lmxlbmd0aCA6IDBdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkob3B0aW9ucy5kZWxpbWl0ZXIubWFwKGZ1bmN0aW9uIChkZWxpbWl0ZXIpIHtcbiAgICAgICAgICByZXR1cm4gZGVsaW1pdGVyLmxlbmd0aDtcbiAgICAgICAgfSkpLCBbLy8gU2tpcCBpZiB0aGUgcmVtYWluaW5nIGJ1ZmZlciBjYW4gYmUgZXNjYXBlIHNlcXVlbmNlXG4gICAgICAgIG9wdGlvbnMucXVvdGUgIT09IG51bGwgPyBvcHRpb25zLnF1b3RlLmxlbmd0aCA6IDBdKSksXG4gICAgICAgIHByZXZpb3VzQnVmOiB1bmRlZmluZWQsXG4gICAgICAgIHF1b3Rpbmc6IGZhbHNlLFxuICAgICAgICBzdG9wOiBmYWxzZSxcbiAgICAgICAgcmF3QnVmZmVyOiBuZXcgUmVzaXplYWJsZUJ1ZmZlcigxMDApLFxuICAgICAgICByZWNvcmQ6IFtdLFxuICAgICAgICByZWNvcmRIYXNFcnJvcjogZmFsc2UsXG4gICAgICAgIHJlY29yZF9sZW5ndGg6IDAsXG4gICAgICAgIHJlY29yZERlbGltaXRlck1heExlbmd0aDogb3B0aW9ucy5yZWNvcmRfZGVsaW1pdGVyLmxlbmd0aCA9PT0gMCA/IDIgOiBNYXRoLm1heC5hcHBseShNYXRoLCBfdG9Db25zdW1hYmxlQXJyYXkob3B0aW9ucy5yZWNvcmRfZGVsaW1pdGVyLm1hcChmdW5jdGlvbiAodikge1xuICAgICAgICAgIHJldHVybiB2Lmxlbmd0aDtcbiAgICAgICAgfSkpKSxcbiAgICAgICAgdHJpbUNoYXJzOiBbQnVmZmVyLmZyb20oJyAnLCBvcHRpb25zLmVuY29kaW5nKVswXSwgQnVmZmVyLmZyb20oJ1xcdCcsIG9wdGlvbnMuZW5jb2RpbmcpWzBdXSxcbiAgICAgICAgd2FzUXVvdGluZzogZmFsc2UsXG4gICAgICAgIHdhc1Jvd0RlbGltaXRlcjogZmFsc2VcbiAgICAgIH07XG4gICAgfSAvLyBJbXBsZW1lbnRhdGlvbiBvZiBgVHJhbnNmb3JtLl90cmFuc2Zvcm1gXG5cbiAgfSwge1xuICAgIGtleTogXCJfdHJhbnNmb3JtXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF90cmFuc2Zvcm0oYnVmLCBlbmNvZGluZywgY2FsbGJhY2spIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLnN0b3AgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgZXJyID0gdGhpcy5fX3BhcnNlKGJ1ZiwgZmFsc2UpO1xuXG4gICAgICBpZiAoZXJyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5zdG9wID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICB9IC8vIEltcGxlbWVudGF0aW9uIG9mIGBUcmFuc2Zvcm0uX2ZsdXNoYFxuXG4gIH0sIHtcbiAgICBrZXk6IFwiX2ZsdXNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9mbHVzaChjYWxsYmFjaykge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuc3RvcCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBlcnIgPSB0aGlzLl9fcGFyc2UodW5kZWZpbmVkLCB0cnVlKTtcblxuICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICB9IC8vIENlbnRyYWwgcGFyc2VyIGltcGxlbWVudGF0aW9uXG5cbiAgfSwge1xuICAgIGtleTogXCJfX3BhcnNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9fcGFyc2UobmV4dEJ1ZiwgZW5kKSB7XG4gICAgICB2YXIgX3RoaXMkb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICBib20gPSBfdGhpcyRvcHRpb25zLmJvbSxcbiAgICAgICAgICBjb21tZW50ID0gX3RoaXMkb3B0aW9ucy5jb21tZW50LFxuICAgICAgICAgIGVzY2FwZSA9IF90aGlzJG9wdGlvbnMuZXNjYXBlLFxuICAgICAgICAgIGZyb21fbGluZSA9IF90aGlzJG9wdGlvbnMuZnJvbV9saW5lLFxuICAgICAgICAgIGx0cmltID0gX3RoaXMkb3B0aW9ucy5sdHJpbSxcbiAgICAgICAgICBtYXhfcmVjb3JkX3NpemUgPSBfdGhpcyRvcHRpb25zLm1heF9yZWNvcmRfc2l6ZSxcbiAgICAgICAgICBxdW90ZSA9IF90aGlzJG9wdGlvbnMucXVvdGUsXG4gICAgICAgICAgcmF3ID0gX3RoaXMkb3B0aW9ucy5yYXcsXG4gICAgICAgICAgcmVsYXggPSBfdGhpcyRvcHRpb25zLnJlbGF4LFxuICAgICAgICAgIHJ0cmltID0gX3RoaXMkb3B0aW9ucy5ydHJpbSxcbiAgICAgICAgICBza2lwX2VtcHR5X2xpbmVzID0gX3RoaXMkb3B0aW9ucy5za2lwX2VtcHR5X2xpbmVzLFxuICAgICAgICAgIHRvID0gX3RoaXMkb3B0aW9ucy50byxcbiAgICAgICAgICB0b19saW5lID0gX3RoaXMkb3B0aW9ucy50b19saW5lO1xuICAgICAgdmFyIHJlY29yZF9kZWxpbWl0ZXIgPSB0aGlzLm9wdGlvbnMucmVjb3JkX2RlbGltaXRlcjtcbiAgICAgIHZhciBfdGhpcyRzdGF0ZSA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgYm9tU2tpcHBlZCA9IF90aGlzJHN0YXRlLmJvbVNraXBwZWQsXG4gICAgICAgICAgcHJldmlvdXNCdWYgPSBfdGhpcyRzdGF0ZS5wcmV2aW91c0J1ZixcbiAgICAgICAgICByYXdCdWZmZXIgPSBfdGhpcyRzdGF0ZS5yYXdCdWZmZXIsXG4gICAgICAgICAgZXNjYXBlSXNRdW90ZSA9IF90aGlzJHN0YXRlLmVzY2FwZUlzUXVvdGU7XG4gICAgICB2YXIgYnVmO1xuXG4gICAgICBpZiAocHJldmlvdXNCdWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAobmV4dEJ1ZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gSGFuZGxlIGVtcHR5IHN0cmluZ1xuICAgICAgICAgIHRoaXMucHVzaChudWxsKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVmID0gbmV4dEJ1ZjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwcmV2aW91c0J1ZiAhPT0gdW5kZWZpbmVkICYmIG5leHRCdWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBidWYgPSBwcmV2aW91c0J1ZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1ZiA9IEJ1ZmZlci5jb25jYXQoW3ByZXZpb3VzQnVmLCBuZXh0QnVmXSk7XG4gICAgICB9IC8vIEhhbmRsZSBVVEYgQk9NXG5cblxuICAgICAgaWYgKGJvbVNraXBwZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChib20gPT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5ib21Ta2lwcGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChidWYubGVuZ3RoIDwgMykge1xuICAgICAgICAgIC8vIE5vIGVub3VnaCBkYXRhXG4gICAgICAgICAgaWYgKGVuZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vIFdhaXQgZm9yIG1vcmUgZGF0YVxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5wcmV2aW91c0J1ZiA9IGJ1ZjtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIgZW5jb2RpbmcgaW4gYm9tcykge1xuICAgICAgICAgICAgaWYgKGJvbXNbZW5jb2RpbmddLmNvbXBhcmUoYnVmLCAwLCBib21zW2VuY29kaW5nXS5sZW5ndGgpID09PSAwKSB7XG4gICAgICAgICAgICAgIC8vIFNraXAgQk9NXG4gICAgICAgICAgICAgIHZhciBib21MZW5ndGggPSBib21zW2VuY29kaW5nXS5sZW5ndGg7XG4gICAgICAgICAgICAgIHRoaXMuc3RhdGUuYnVmQnl0ZXNTdGFydCArPSBib21MZW5ndGg7XG4gICAgICAgICAgICAgIGJ1ZiA9IGJ1Zi5zbGljZShib21MZW5ndGgpOyAvLyBSZW5vcm1hbGl6ZSBvcmlnaW5hbCBvcHRpb25zIHdpdGggdGhlIG5ldyBlbmNvZGluZ1xuXG4gICAgICAgICAgICAgIHRoaXMuX19ub3JtYWxpemVPcHRpb25zKF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgdGhpcy5fX29yaWdpbmFsT3B0aW9ucyksIHt9LCB7XG4gICAgICAgICAgICAgICAgZW5jb2Rpbmc6IGVuY29kaW5nXG4gICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLnN0YXRlLmJvbVNraXBwZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBidWZMZW4gPSBidWYubGVuZ3RoO1xuICAgICAgdmFyIHBvcztcblxuICAgICAgZm9yIChwb3MgPSAwOyBwb3MgPCBidWZMZW47IHBvcysrKSB7XG4gICAgICAgIC8vIEVuc3VyZSB3ZSBnZXQgZW5vdWdoIHNwYWNlIHRvIGxvb2sgYWhlYWRcbiAgICAgICAgLy8gVGhlcmUgc2hvdWxkIGJlIGEgd2F5IHRvIG1vdmUgdGhpcyBvdXQgb2YgdGhlIGxvb3BcbiAgICAgICAgaWYgKHRoaXMuX19uZWVkTW9yZURhdGEocG9zLCBidWZMZW4sIGVuZCkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLndhc1Jvd0RlbGltaXRlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHRoaXMuaW5mby5saW5lcysrO1xuICAgICAgICAgIHRoaXMuc3RhdGUud2FzUm93RGVsaW1pdGVyID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9fbGluZSAhPT0gLTEgJiYgdGhpcy5pbmZvLmxpbmVzID4gdG9fbGluZSkge1xuICAgICAgICAgIHRoaXMuc3RhdGUuc3RvcCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5wdXNoKG51bGwpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAvLyBBdXRvIGRpc2NvdmVyeSBvZiByZWNvcmRfZGVsaW1pdGVyLCB1bml4LCBtYWMgYW5kIHdpbmRvd3Mgc3VwcG9ydGVkXG5cblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5xdW90aW5nID09PSBmYWxzZSAmJiByZWNvcmRfZGVsaW1pdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHZhciByZWNvcmRfZGVsaW1pdGVyQ291bnQgPSB0aGlzLl9fYXV0b0Rpc2NvdmVyUmVjb3JkRGVsaW1pdGVyKGJ1ZiwgcG9zKTtcblxuICAgICAgICAgIGlmIChyZWNvcmRfZGVsaW1pdGVyQ291bnQpIHtcbiAgICAgICAgICAgIHJlY29yZF9kZWxpbWl0ZXIgPSB0aGlzLm9wdGlvbnMucmVjb3JkX2RlbGltaXRlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2hyID0gYnVmW3Bvc107XG5cbiAgICAgICAgaWYgKHJhdyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJhd0J1ZmZlci5hcHBlbmQoY2hyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoY2hyID09PSBjciB8fCBjaHIgPT09IG5sKSAmJiB0aGlzLnN0YXRlLndhc1Jvd0RlbGltaXRlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLnN0YXRlLndhc1Jvd0RlbGltaXRlciA9IHRydWU7XG4gICAgICAgIH0gLy8gUHJldmlvdXMgY2hhciB3YXMgYSB2YWxpZCBlc2NhcGUgY2hhclxuICAgICAgICAvLyB0cmVhdCB0aGUgY3VycmVudCBjaGFyIGFzIGEgcmVndWxhciBjaGFyXG5cblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lc2NhcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHRoaXMuc3RhdGUuZXNjYXBpbmcgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBFc2NhcGUgaXMgb25seSBhY3RpdmUgaW5zaWRlIHF1b3RlZCBmaWVsZHNcbiAgICAgICAgICAvLyBXZSBhcmUgcXVvdGluZywgdGhlIGNoYXIgaXMgYW4gZXNjYXBlIGNociBhbmQgdGhlcmUgaXMgYSBjaHIgdG8gZXNjYXBlXG4gICAgICAgICAgLy8gaWYoZXNjYXBlICE9PSBudWxsICYmIHRoaXMuc3RhdGUucXVvdGluZyA9PT0gdHJ1ZSAmJiBjaHIgPT09IGVzY2FwZSAmJiBwb3MgKyAxIDwgYnVmTGVuKXtcbiAgICAgICAgICBpZiAoZXNjYXBlICE9PSBudWxsICYmIHRoaXMuc3RhdGUucXVvdGluZyA9PT0gdHJ1ZSAmJiB0aGlzLl9faXNFc2NhcGUoYnVmLCBwb3MsIGNocikgJiYgcG9zICsgZXNjYXBlLmxlbmd0aCA8IGJ1Zkxlbikge1xuICAgICAgICAgICAgaWYgKGVzY2FwZUlzUXVvdGUpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX19pc1F1b3RlKGJ1ZiwgcG9zICsgZXNjYXBlLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmVzY2FwaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwb3MgKz0gZXNjYXBlLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuc3RhdGUuZXNjYXBpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICBwb3MgKz0gZXNjYXBlLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gLy8gTm90IGN1cnJlbnRseSBlc2NhcGluZyBhbmQgY2hyIGlzIGEgcXVvdGVcbiAgICAgICAgICAvLyBUT0RPOiBuZWVkIHRvIGNvbXBhcmUgYnl0ZXMgaW5zdGVhZCBvZiBzaW5nbGUgY2hhclxuXG5cbiAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb21tZW50aW5nID09PSBmYWxzZSAmJiB0aGlzLl9faXNRdW90ZShidWYsIHBvcykpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnF1b3RpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgdmFyIG5leHRDaHIgPSBidWZbcG9zICsgcXVvdGUubGVuZ3RoXTtcblxuICAgICAgICAgICAgICB2YXIgaXNOZXh0Q2hyVHJpbWFibGUgPSBydHJpbSAmJiB0aGlzLl9faXNDaGFyVHJpbWFibGUobmV4dENocik7XG5cbiAgICAgICAgICAgICAgdmFyIGlzTmV4dENockNvbW1lbnQgPSBjb21tZW50ICE9PSBudWxsICYmIHRoaXMuX19jb21wYXJlQnl0ZXMoY29tbWVudCwgYnVmLCBwb3MgKyBxdW90ZS5sZW5ndGgsIG5leHRDaHIpO1xuXG4gICAgICAgICAgICAgIHZhciBpc05leHRDaHJEZWxpbWl0ZXIgPSB0aGlzLl9faXNEZWxpbWl0ZXIoYnVmLCBwb3MgKyBxdW90ZS5sZW5ndGgsIG5leHRDaHIpO1xuXG4gICAgICAgICAgICAgIHZhciBpc05leHRDaHJSZWNvcmREZWxpbWl0ZXIgPSByZWNvcmRfZGVsaW1pdGVyLmxlbmd0aCA9PT0gMCA/IHRoaXMuX19hdXRvRGlzY292ZXJSZWNvcmREZWxpbWl0ZXIoYnVmLCBwb3MgKyBxdW90ZS5sZW5ndGgpIDogdGhpcy5fX2lzUmVjb3JkRGVsaW1pdGVyKG5leHRDaHIsIGJ1ZiwgcG9zICsgcXVvdGUubGVuZ3RoKTsgLy8gRXNjYXBlIGEgcXVvdGVcbiAgICAgICAgICAgICAgLy8gVHJlYXQgbmV4dCBjaGFyIGFzIGEgcmVndWxhciBjaGFyYWN0ZXJcblxuICAgICAgICAgICAgICBpZiAoZXNjYXBlICE9PSBudWxsICYmIHRoaXMuX19pc0VzY2FwZShidWYsIHBvcywgY2hyKSAmJiB0aGlzLl9faXNRdW90ZShidWYsIHBvcyArIGVzY2FwZS5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgcG9zICs9IGVzY2FwZS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFuZXh0Q2hyIHx8IGlzTmV4dENockRlbGltaXRlciB8fCBpc05leHRDaHJSZWNvcmREZWxpbWl0ZXIgfHwgaXNOZXh0Q2hyQ29tbWVudCB8fCBpc05leHRDaHJUcmltYWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucXVvdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUud2FzUXVvdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgcG9zICs9IHF1b3RlLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVsYXggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVyciA9IHRoaXMuX19lcnJvcihuZXcgQ3N2RXJyb3IoJ0NTVl9JTlZBTElEX0NMT1NJTkdfUVVPVEUnLCBbJ0ludmFsaWQgQ2xvc2luZyBRdW90ZTonLCBcImdvdCBcXFwiXCIuY29uY2F0KFN0cmluZy5mcm9tQ2hhckNvZGUobmV4dENociksIFwiXFxcIlwiKSwgXCJhdCBsaW5lIFwiLmNvbmNhdCh0aGlzLmluZm8ubGluZXMpLCAnaW5zdGVhZCBvZiBkZWxpbWl0ZXIsIHJlY29yZCBkZWxpbWl0ZXIsIHRyaW1hYmxlIGNoYXJhY3RlcicsICcoaWYgYWN0aXZhdGVkKSBvciBjb21tZW50J10sIHRoaXMub3B0aW9ucywgdGhpcy5fX2luZm9GaWVsZCgpKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyICE9PSB1bmRlZmluZWQpIHJldHVybiBlcnI7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5xdW90aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS53YXNRdW90aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmZpZWxkLnByZXBlbmQocXVvdGUpO1xuICAgICAgICAgICAgICAgIHBvcyArPSBxdW90ZS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5maWVsZC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBJbiByZWxheCBtb2RlLCB0cmVhdCBvcGVuaW5nIHF1b3RlIHByZWNlZGVkIGJ5IGNocnMgYXMgcmVndWxhclxuICAgICAgICAgICAgICAgIGlmIChyZWxheCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfZXJyID0gdGhpcy5fX2Vycm9yKG5ldyBDc3ZFcnJvcignSU5WQUxJRF9PUEVOSU5HX1FVT1RFJywgWydJbnZhbGlkIE9wZW5pbmcgUXVvdGU6JywgXCJhIHF1b3RlIGlzIGZvdW5kIGluc2lkZSBhIGZpZWxkIGF0IGxpbmUgXCIuY29uY2F0KHRoaXMuaW5mby5saW5lcyldLCB0aGlzLm9wdGlvbnMsIHRoaXMuX19pbmZvRmllbGQoKSwge1xuICAgICAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5zdGF0ZS5maWVsZFxuICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoX2VyciAhPT0gdW5kZWZpbmVkKSByZXR1cm4gX2VycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5xdW90aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwb3MgKz0gcXVvdGUubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnF1b3RpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YXIgcmVjb3JkRGVsaW1pdGVyTGVuZ3RoID0gdGhpcy5fX2lzUmVjb3JkRGVsaW1pdGVyKGNociwgYnVmLCBwb3MpO1xuXG4gICAgICAgICAgICBpZiAocmVjb3JkRGVsaW1pdGVyTGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgIC8vIERvIG5vdCBlbWl0IGNvbW1lbnRzIHdoaWNoIHRha2UgYSBmdWxsIGxpbmVcbiAgICAgICAgICAgICAgdmFyIHNraXBDb21tZW50TGluZSA9IHRoaXMuc3RhdGUuY29tbWVudGluZyAmJiB0aGlzLnN0YXRlLndhc1F1b3RpbmcgPT09IGZhbHNlICYmIHRoaXMuc3RhdGUucmVjb3JkLmxlbmd0aCA9PT0gMCAmJiB0aGlzLnN0YXRlLmZpZWxkLmxlbmd0aCA9PT0gMDtcblxuICAgICAgICAgICAgICBpZiAoc2tpcENvbW1lbnRMaW5lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmZvLmNvbW1lbnRfbGluZXMrKzsgLy8gU2tpcCBmdWxsIGNvbW1lbnQgbGluZVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEFjdGl2YXRlIHJlY29yZHMgZW1pdGlvbiBpZiBhYm92ZSBmcm9tX2xpbmVcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbmFibGVkID09PSBmYWxzZSAmJiB0aGlzLmluZm8ubGluZXMgKyAodGhpcy5zdGF0ZS53YXNSb3dEZWxpbWl0ZXIgPT09IHRydWUgPyAxIDogMCkgPj0gZnJvbV9saW5lKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICB0aGlzLl9fcmVzZXRGaWVsZCgpO1xuXG4gICAgICAgICAgICAgICAgICB0aGlzLl9fcmVzZXRSZWNvcmQoKTtcblxuICAgICAgICAgICAgICAgICAgcG9zICs9IHJlY29yZERlbGltaXRlckxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9IC8vIFNraXAgaWYgbGluZSBpcyBlbXB0eSBhbmQgc2tpcF9lbXB0eV9saW5lcyBhY3RpdmF0ZWRcblxuXG4gICAgICAgICAgICAgICAgaWYgKHNraXBfZW1wdHlfbGluZXMgPT09IHRydWUgJiYgdGhpcy5zdGF0ZS53YXNRdW90aW5nID09PSBmYWxzZSAmJiB0aGlzLnN0YXRlLnJlY29yZC5sZW5ndGggPT09IDAgJiYgdGhpcy5zdGF0ZS5maWVsZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5mby5lbXB0eV9saW5lcysrO1xuICAgICAgICAgICAgICAgICAgcG9zICs9IHJlY29yZERlbGltaXRlckxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmluZm8uYnl0ZXMgPSB0aGlzLnN0YXRlLmJ1ZkJ5dGVzU3RhcnQgKyBwb3M7XG5cbiAgICAgICAgICAgICAgICB2YXIgZXJyRmllbGQgPSB0aGlzLl9fb25GaWVsZCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVyckZpZWxkICE9PSB1bmRlZmluZWQpIHJldHVybiBlcnJGaWVsZDtcbiAgICAgICAgICAgICAgICB0aGlzLmluZm8uYnl0ZXMgPSB0aGlzLnN0YXRlLmJ1ZkJ5dGVzU3RhcnQgKyBwb3MgKyByZWNvcmREZWxpbWl0ZXJMZW5ndGg7XG5cbiAgICAgICAgICAgICAgICB2YXIgZXJyUmVjb3JkID0gdGhpcy5fX29uUmVjb3JkKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyUmVjb3JkICE9PSB1bmRlZmluZWQpIHJldHVybiBlcnJSZWNvcmQ7XG5cbiAgICAgICAgICAgICAgICBpZiAodG8gIT09IC0xICYmIHRoaXMuaW5mby5yZWNvcmRzID49IHRvKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnN0b3AgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoKG51bGwpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMuc3RhdGUuY29tbWVudGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICBwb3MgKz0gcmVjb3JkRGVsaW1pdGVyTGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbW1lbnRpbmcpIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjb21tZW50Q291bnQgPSBjb21tZW50ID09PSBudWxsID8gMCA6IHRoaXMuX19jb21wYXJlQnl0ZXMoY29tbWVudCwgYnVmLCBwb3MsIGNocik7XG5cbiAgICAgICAgICAgIGlmIChjb21tZW50Q291bnQgIT09IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jb21tZW50aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkZWxpbWl0ZXJMZW5ndGggPSB0aGlzLl9faXNEZWxpbWl0ZXIoYnVmLCBwb3MsIGNocik7XG5cbiAgICAgICAgICAgIGlmIChkZWxpbWl0ZXJMZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5pbmZvLmJ5dGVzID0gdGhpcy5zdGF0ZS5idWZCeXRlc1N0YXJ0ICsgcG9zO1xuXG4gICAgICAgICAgICAgIHZhciBfZXJyRmllbGQgPSB0aGlzLl9fb25GaWVsZCgpO1xuXG4gICAgICAgICAgICAgIGlmIChfZXJyRmllbGQgIT09IHVuZGVmaW5lZCkgcmV0dXJuIF9lcnJGaWVsZDtcbiAgICAgICAgICAgICAgcG9zICs9IGRlbGltaXRlckxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbW1lbnRpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgaWYgKG1heF9yZWNvcmRfc2l6ZSAhPT0gMCAmJiB0aGlzLnN0YXRlLnJlY29yZF9sZW5ndGggKyB0aGlzLnN0YXRlLmZpZWxkLmxlbmd0aCA+IG1heF9yZWNvcmRfc2l6ZSkge1xuICAgICAgICAgICAgdmFyIF9lcnIyID0gdGhpcy5fX2Vycm9yKG5ldyBDc3ZFcnJvcignQ1NWX01BWF9SRUNPUkRfU0laRScsIFsnTWF4IFJlY29yZCBTaXplOicsICdyZWNvcmQgZXhjZWVkIHRoZSBtYXhpbXVtIG51bWJlciBvZiB0b2xlcmF0ZWQgYnl0ZXMnLCBcIm9mIFwiLmNvbmNhdChtYXhfcmVjb3JkX3NpemUpLCBcImF0IGxpbmUgXCIuY29uY2F0KHRoaXMuaW5mby5saW5lcyldLCB0aGlzLm9wdGlvbnMsIHRoaXMuX19pbmZvRmllbGQoKSkpO1xuXG4gICAgICAgICAgICBpZiAoX2VycjIgIT09IHVuZGVmaW5lZCkgcmV0dXJuIF9lcnIyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsYXBwZW5kID0gbHRyaW0gPT09IGZhbHNlIHx8IHRoaXMuc3RhdGUucXVvdGluZyA9PT0gdHJ1ZSB8fCB0aGlzLnN0YXRlLmZpZWxkLmxlbmd0aCAhPT0gMCB8fCAhdGhpcy5fX2lzQ2hhclRyaW1hYmxlKGNocik7IC8vIHJ0cmltIGluIG5vbiBxdW90aW5nIGlzIGhhbmRsZSBpbiBfX29uRmllbGRcblxuICAgICAgICB2YXIgcmFwcGVuZCA9IHJ0cmltID09PSBmYWxzZSB8fCB0aGlzLnN0YXRlLndhc1F1b3RpbmcgPT09IGZhbHNlO1xuXG4gICAgICAgIGlmIChsYXBwZW5kID09PSB0cnVlICYmIHJhcHBlbmQgPT09IHRydWUpIHtcbiAgICAgICAgICB0aGlzLnN0YXRlLmZpZWxkLmFwcGVuZChjaHIpO1xuICAgICAgICB9IGVsc2UgaWYgKHJ0cmltID09PSB0cnVlICYmICF0aGlzLl9faXNDaGFyVHJpbWFibGUoY2hyKSkge1xuICAgICAgICAgIHZhciBfZXJyMyA9IHRoaXMuX19lcnJvcihuZXcgQ3N2RXJyb3IoJ0NTVl9OT05fVFJJTUFCTEVfQ0hBUl9BRlRFUl9DTE9TSU5HX1FVT1RFJywgWydJbnZhbGlkIENsb3NpbmcgUXVvdGU6JywgJ2ZvdW5kIG5vbiB0cmltYWJsZSBieXRlIGFmdGVyIHF1b3RlJywgXCJhdCBsaW5lIFwiLmNvbmNhdCh0aGlzLmluZm8ubGluZXMpXSwgdGhpcy5vcHRpb25zLCB0aGlzLl9faW5mb0ZpZWxkKCkpKTtcblxuICAgICAgICAgIGlmIChfZXJyMyAhPT0gdW5kZWZpbmVkKSByZXR1cm4gX2VycjM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGVuZCA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBFbnN1cmUgd2UgYXJlIG5vdCBlbmRpbmcgaW4gYSBxdW90aW5nIHN0YXRlXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnF1b3RpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICB2YXIgX2VycjQgPSB0aGlzLl9fZXJyb3IobmV3IENzdkVycm9yKCdDU1ZfUVVPVEVfTk9UX0NMT1NFRCcsIFsnUXVvdGUgTm90IENsb3NlZDonLCBcInRoZSBwYXJzaW5nIGlzIGZpbmlzaGVkIHdpdGggYW4gb3BlbmluZyBxdW90ZSBhdCBsaW5lIFwiLmNvbmNhdCh0aGlzLmluZm8ubGluZXMpXSwgdGhpcy5vcHRpb25zLCB0aGlzLl9faW5mb0ZpZWxkKCkpKTtcblxuICAgICAgICAgIGlmIChfZXJyNCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gX2VycjQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2tpcCBsYXN0IGxpbmUgaWYgaXQgaGFzIG5vIGNoYXJhY3RlcnNcbiAgICAgICAgICBpZiAodGhpcy5zdGF0ZS53YXNRdW90aW5nID09PSB0cnVlIHx8IHRoaXMuc3RhdGUucmVjb3JkLmxlbmd0aCAhPT0gMCB8fCB0aGlzLnN0YXRlLmZpZWxkLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pbmZvLmJ5dGVzID0gdGhpcy5zdGF0ZS5idWZCeXRlc1N0YXJ0ICsgcG9zO1xuXG4gICAgICAgICAgICB2YXIgX2VyckZpZWxkMiA9IHRoaXMuX19vbkZpZWxkKCk7XG5cbiAgICAgICAgICAgIGlmIChfZXJyRmllbGQyICE9PSB1bmRlZmluZWQpIHJldHVybiBfZXJyRmllbGQyO1xuXG4gICAgICAgICAgICB2YXIgX2VyclJlY29yZCA9IHRoaXMuX19vblJlY29yZCgpO1xuXG4gICAgICAgICAgICBpZiAoX2VyclJlY29yZCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gX2VyclJlY29yZDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUud2FzUm93RGVsaW1pdGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmluZm8uZW1wdHlfbGluZXMrKztcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuY29tbWVudGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5pbmZvLmNvbW1lbnRfbGluZXMrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUuYnVmQnl0ZXNTdGFydCArPSBwb3M7XG4gICAgICAgIHRoaXMuc3RhdGUucHJldmlvdXNCdWYgPSBidWYuc2xpY2UocG9zKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc3RhdGUud2FzUm93RGVsaW1pdGVyID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuaW5mby5saW5lcysrO1xuICAgICAgICB0aGlzLnN0YXRlLndhc1Jvd0RlbGltaXRlciA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfX29uUmVjb3JkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9fb25SZWNvcmQoKSB7XG4gICAgICB2YXIgX3RoaXMkb3B0aW9uczIgPSB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgY29sdW1ucyA9IF90aGlzJG9wdGlvbnMyLmNvbHVtbnMsXG4gICAgICAgICAgY29sdW1uc19kdXBsaWNhdGVzX3RvX2FycmF5ID0gX3RoaXMkb3B0aW9uczIuY29sdW1uc19kdXBsaWNhdGVzX3RvX2FycmF5LFxuICAgICAgICAgIGVuY29kaW5nID0gX3RoaXMkb3B0aW9uczIuZW5jb2RpbmcsXG4gICAgICAgICAgaW5mbyA9IF90aGlzJG9wdGlvbnMyLmluZm8sXG4gICAgICAgICAgZnJvbSA9IF90aGlzJG9wdGlvbnMyLmZyb20sXG4gICAgICAgICAgcmVsYXhfY29sdW1uX2NvdW50ID0gX3RoaXMkb3B0aW9uczIucmVsYXhfY29sdW1uX2NvdW50LFxuICAgICAgICAgIHJlbGF4X2NvbHVtbl9jb3VudF9sZXNzID0gX3RoaXMkb3B0aW9uczIucmVsYXhfY29sdW1uX2NvdW50X2xlc3MsXG4gICAgICAgICAgcmVsYXhfY29sdW1uX2NvdW50X21vcmUgPSBfdGhpcyRvcHRpb25zMi5yZWxheF9jb2x1bW5fY291bnRfbW9yZSxcbiAgICAgICAgICByYXcgPSBfdGhpcyRvcHRpb25zMi5yYXcsXG4gICAgICAgICAgc2tpcF9saW5lc193aXRoX2VtcHR5X3ZhbHVlcyA9IF90aGlzJG9wdGlvbnMyLnNraXBfbGluZXNfd2l0aF9lbXB0eV92YWx1ZXM7XG4gICAgICB2YXIgX3RoaXMkc3RhdGUyID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgICBlbmFibGVkID0gX3RoaXMkc3RhdGUyLmVuYWJsZWQsXG4gICAgICAgICAgcmVjb3JkID0gX3RoaXMkc3RhdGUyLnJlY29yZDtcblxuICAgICAgaWYgKGVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fcmVzZXRSZWNvcmQoKTtcbiAgICAgIH0gLy8gQ29udmVydCB0aGUgZmlyc3QgbGluZSBpbnRvIGNvbHVtbiBuYW1lc1xuXG5cbiAgICAgIHZhciByZWNvcmRMZW5ndGggPSByZWNvcmQubGVuZ3RoO1xuXG4gICAgICBpZiAoY29sdW1ucyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoc2tpcF9saW5lc193aXRoX2VtcHR5X3ZhbHVlcyA9PT0gdHJ1ZSAmJiBpc1JlY29yZEVtcHR5KHJlY29yZCkpIHtcbiAgICAgICAgICB0aGlzLl9fcmVzZXRSZWNvcmQoKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9fZmlyc3RMaW5lVG9Db2x1bW5zKHJlY29yZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2x1bW5zID09PSBmYWxzZSAmJiB0aGlzLmluZm8ucmVjb3JkcyA9PT0gMCkge1xuICAgICAgICB0aGlzLnN0YXRlLmV4cGVjdGVkUmVjb3JkTGVuZ3RoID0gcmVjb3JkTGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkTGVuZ3RoICE9PSB0aGlzLnN0YXRlLmV4cGVjdGVkUmVjb3JkTGVuZ3RoKSB7XG4gICAgICAgIHZhciBlcnIgPSBjb2x1bW5zID09PSBmYWxzZSA/IC8vIFRvZG86IHJlbmFtZSBDU1ZfSU5DT05TSVNURU5UX1JFQ09SRF9MRU5HVEggdG9cbiAgICAgICAgLy8gQ1NWX1JFQ09SRF9JTkNPTlNJU1RFTlRfRklFTERTX0xFTkdUSFxuICAgICAgICBuZXcgQ3N2RXJyb3IoJ0NTVl9JTkNPTlNJU1RFTlRfUkVDT1JEX0xFTkdUSCcsIFsnSW52YWxpZCBSZWNvcmQgTGVuZ3RoOicsIFwiZXhwZWN0IFwiLmNvbmNhdCh0aGlzLnN0YXRlLmV4cGVjdGVkUmVjb3JkTGVuZ3RoLCBcIixcIiksIFwiZ290IFwiLmNvbmNhdChyZWNvcmRMZW5ndGgsIFwiIG9uIGxpbmUgXCIpLmNvbmNhdCh0aGlzLmluZm8ubGluZXMpXSwgdGhpcy5vcHRpb25zLCB0aGlzLl9faW5mb0ZpZWxkKCksIHtcbiAgICAgICAgICByZWNvcmQ6IHJlY29yZFxuICAgICAgICB9KSA6IC8vIFRvZG86IHJlbmFtZSBDU1ZfUkVDT1JEX0RPTlRfTUFUQ0hfQ09MVU1OU19MRU5HVEggdG9cbiAgICAgICAgLy8gQ1NWX1JFQ09SRF9JTkNPTlNJU1RFTlRfQ09MVU1OU1xuICAgICAgICBuZXcgQ3N2RXJyb3IoJ0NTVl9SRUNPUkRfRE9OVF9NQVRDSF9DT0xVTU5TX0xFTkdUSCcsIFsnSW52YWxpZCBSZWNvcmQgTGVuZ3RoOicsIFwiY29sdW1ucyBsZW5ndGggaXMgXCIuY29uY2F0KGNvbHVtbnMubGVuZ3RoLCBcIixcIiksIC8vIHJlbmFtZSBjb2x1bW5zXG4gICAgICAgIFwiZ290IFwiLmNvbmNhdChyZWNvcmRMZW5ndGgsIFwiIG9uIGxpbmUgXCIpLmNvbmNhdCh0aGlzLmluZm8ubGluZXMpXSwgdGhpcy5vcHRpb25zLCB0aGlzLl9faW5mb0ZpZWxkKCksIHtcbiAgICAgICAgICByZWNvcmQ6IHJlY29yZFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVsYXhfY29sdW1uX2NvdW50ID09PSB0cnVlIHx8IHJlbGF4X2NvbHVtbl9jb3VudF9sZXNzID09PSB0cnVlICYmIHJlY29yZExlbmd0aCA8IHRoaXMuc3RhdGUuZXhwZWN0ZWRSZWNvcmRMZW5ndGggfHwgcmVsYXhfY29sdW1uX2NvdW50X21vcmUgPT09IHRydWUgJiYgcmVjb3JkTGVuZ3RoID4gdGhpcy5zdGF0ZS5leHBlY3RlZFJlY29yZExlbmd0aCkge1xuICAgICAgICAgIHRoaXMuaW5mby5pbnZhbGlkX2ZpZWxkX2xlbmd0aCsrO1xuICAgICAgICAgIHRoaXMuc3RhdGUuZXJyb3IgPSBlcnI7IC8vIEVycm9yIGlzIHVuZGVmaW5lZCB3aXRoIHNraXBfbGluZXNfd2l0aF9lcnJvclxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBmaW5hbEVyciA9IHRoaXMuX19lcnJvcihlcnIpO1xuXG4gICAgICAgICAgaWYgKGZpbmFsRXJyKSByZXR1cm4gZmluYWxFcnI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNraXBfbGluZXNfd2l0aF9lbXB0eV92YWx1ZXMgPT09IHRydWUgJiYgaXNSZWNvcmRFbXB0eShyZWNvcmQpKSB7XG4gICAgICAgIHRoaXMuX19yZXNldFJlY29yZCgpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc3RhdGUucmVjb3JkSGFzRXJyb3IgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5fX3Jlc2V0UmVjb3JkKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZS5yZWNvcmRIYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5mby5yZWNvcmRzKys7XG5cbiAgICAgIGlmIChmcm9tID09PSAxIHx8IHRoaXMuaW5mby5yZWNvcmRzID49IGZyb20pIHtcbiAgICAgICAgLy8gV2l0aCBjb2x1bW5zLCByZWNvcmRzIGFyZSBvYmplY3RcbiAgICAgICAgaWYgKGNvbHVtbnMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgdmFyIG9iaiA9IHt9OyAvLyBUcmFuc2Zvcm0gcmVjb3JkIGFycmF5IHRvIGFuIG9iamVjdFxuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSByZWNvcmQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY29sdW1uc1tpXSA9PT0gdW5kZWZpbmVkIHx8IGNvbHVtbnNbaV0uZGlzYWJsZWQpIGNvbnRpbnVlOyAvLyBUdXJuIGR1cGxpY2F0ZSBjb2x1bW5zIGludG8gYW4gYXJyYXlcblxuICAgICAgICAgICAgaWYgKGNvbHVtbnNfZHVwbGljYXRlc190b19hcnJheSA9PT0gdHJ1ZSAmJiBvYmpbY29sdW1uc1tpXS5uYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtjb2x1bW5zW2ldLm5hbWVdKSkge1xuICAgICAgICAgICAgICAgIG9ialtjb2x1bW5zW2ldLm5hbWVdID0gb2JqW2NvbHVtbnNbaV0ubmFtZV0uY29uY2F0KHJlY29yZFtpXSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2NvbHVtbnNbaV0ubmFtZV0gPSBbb2JqW2NvbHVtbnNbaV0ubmFtZV0sIHJlY29yZFtpXV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG9ialtjb2x1bW5zW2ldLm5hbWVdID0gcmVjb3JkW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBvYmpuYW1lID0gdGhpcy5vcHRpb25zLm9iam5hbWU7IC8vIFdpdGhvdXQgb2JqbmFtZSAoZGVmYXVsdClcblxuICAgICAgICAgIGlmIChvYmpuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChyYXcgPT09IHRydWUgfHwgaW5mbyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICB2YXIgX2VycjUgPSB0aGlzLl9fcHVzaChPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgICAgICByZWNvcmQ6IG9ialxuICAgICAgICAgICAgICB9LCByYXcgPT09IHRydWUgPyB7XG4gICAgICAgICAgICAgICAgcmF3OiB0aGlzLnN0YXRlLnJhd0J1ZmZlci50b1N0cmluZyhlbmNvZGluZylcbiAgICAgICAgICAgICAgfSA6IHt9LCBpbmZvID09PSB0cnVlID8ge1xuICAgICAgICAgICAgICAgIGluZm86IHRoaXMuX19pbmZvUmVjb3JkKClcbiAgICAgICAgICAgICAgfSA6IHt9KSk7XG5cbiAgICAgICAgICAgICAgaWYgKF9lcnI1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9lcnI1O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgX2VycjYgPSB0aGlzLl9fcHVzaChvYmopO1xuXG4gICAgICAgICAgICAgIGlmIChfZXJyNikge1xuICAgICAgICAgICAgICAgIHJldHVybiBfZXJyNjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAvLyBXaXRoIG9iam5hbWUgKGRlZmF1bHQpXG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHJhdyA9PT0gdHJ1ZSB8fCBpbmZvID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHZhciBfZXJyNyA9IHRoaXMuX19wdXNoKE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgICAgIHJlY29yZDogW29ialtvYmpuYW1lXSwgb2JqXVxuICAgICAgICAgICAgICB9LCByYXcgPT09IHRydWUgPyB7XG4gICAgICAgICAgICAgICAgcmF3OiB0aGlzLnN0YXRlLnJhd0J1ZmZlci50b1N0cmluZyhlbmNvZGluZylcbiAgICAgICAgICAgICAgfSA6IHt9LCBpbmZvID09PSB0cnVlID8ge1xuICAgICAgICAgICAgICAgIGluZm86IHRoaXMuX19pbmZvUmVjb3JkKClcbiAgICAgICAgICAgICAgfSA6IHt9KSk7XG5cbiAgICAgICAgICAgICAgaWYgKF9lcnI3KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9lcnI3O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgX2VycjggPSB0aGlzLl9fcHVzaChbb2JqW29iam5hbWVdLCBvYmpdKTtcblxuICAgICAgICAgICAgICBpZiAoX2VycjgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2Vycjg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IC8vIFdpdGhvdXQgY29sdW1ucywgcmVjb3JkcyBhcmUgYXJyYXlcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChyYXcgPT09IHRydWUgfHwgaW5mbyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIF9lcnI5ID0gdGhpcy5fX3B1c2goT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICAgIHJlY29yZDogcmVjb3JkXG4gICAgICAgICAgICB9LCByYXcgPT09IHRydWUgPyB7XG4gICAgICAgICAgICAgIHJhdzogdGhpcy5zdGF0ZS5yYXdCdWZmZXIudG9TdHJpbmcoZW5jb2RpbmcpXG4gICAgICAgICAgICB9IDoge30sIGluZm8gPT09IHRydWUgPyB7XG4gICAgICAgICAgICAgIGluZm86IHRoaXMuX19pbmZvUmVjb3JkKClcbiAgICAgICAgICAgIH0gOiB7fSkpO1xuXG4gICAgICAgICAgICBpZiAoX2VycjkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9lcnI5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgX2VycjEwID0gdGhpcy5fX3B1c2gocmVjb3JkKTtcblxuICAgICAgICAgICAgaWYgKF9lcnIxMCkge1xuICAgICAgICAgICAgICByZXR1cm4gX2VycjEwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9fcmVzZXRSZWNvcmQoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX19maXJzdExpbmVUb0NvbHVtbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX19maXJzdExpbmVUb0NvbHVtbnMocmVjb3JkKSB7XG4gICAgICB2YXIgZmlyc3RMaW5lVG9IZWFkZXJzID0gdGhpcy5zdGF0ZS5maXJzdExpbmVUb0hlYWRlcnM7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBoZWFkZXJzID0gZmlyc3RMaW5lVG9IZWFkZXJzID09PSB1bmRlZmluZWQgPyByZWNvcmQgOiBmaXJzdExpbmVUb0hlYWRlcnMuY2FsbChudWxsLCByZWNvcmQpO1xuXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShoZWFkZXJzKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9fZXJyb3IobmV3IENzdkVycm9yKCdDU1ZfSU5WQUxJRF9DT0xVTU5fTUFQUElORycsIFsnSW52YWxpZCBDb2x1bW4gTWFwcGluZzonLCAnZXhwZWN0IGFuIGFycmF5IGZyb20gY29sdW1uIGZ1bmN0aW9uLCcsIFwiZ290IFwiLmNvbmNhdChKU09OLnN0cmluZ2lmeShoZWFkZXJzKSldLCB0aGlzLm9wdGlvbnMsIHRoaXMuX19pbmZvRmllbGQoKSwge1xuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBub3JtYWxpemVkSGVhZGVycyA9IG5vcm1hbGl6ZUNvbHVtbnNBcnJheShoZWFkZXJzKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5leHBlY3RlZFJlY29yZExlbmd0aCA9IG5vcm1hbGl6ZWRIZWFkZXJzLmxlbmd0aDtcbiAgICAgICAgdGhpcy5vcHRpb25zLmNvbHVtbnMgPSBub3JtYWxpemVkSGVhZGVycztcblxuICAgICAgICB0aGlzLl9fcmVzZXRSZWNvcmQoKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX19yZXNldFJlY29yZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfX3Jlc2V0UmVjb3JkKCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5yYXcgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5yYXdCdWZmZXIucmVzZXQoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGF0ZS5lcnJvciA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuc3RhdGUucmVjb3JkID0gW107XG4gICAgICB0aGlzLnN0YXRlLnJlY29yZF9sZW5ndGggPSAwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfX29uRmllbGRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX19vbkZpZWxkKCkge1xuICAgICAgdmFyIF90aGlzJG9wdGlvbnMzID0gdGhpcy5vcHRpb25zLFxuICAgICAgICAgIGNhc3QgPSBfdGhpcyRvcHRpb25zMy5jYXN0LFxuICAgICAgICAgIGVuY29kaW5nID0gX3RoaXMkb3B0aW9uczMuZW5jb2RpbmcsXG4gICAgICAgICAgcnRyaW0gPSBfdGhpcyRvcHRpb25zMy5ydHJpbSxcbiAgICAgICAgICBtYXhfcmVjb3JkX3NpemUgPSBfdGhpcyRvcHRpb25zMy5tYXhfcmVjb3JkX3NpemU7XG4gICAgICB2YXIgX3RoaXMkc3RhdGUzID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgICBlbmFibGVkID0gX3RoaXMkc3RhdGUzLmVuYWJsZWQsXG4gICAgICAgICAgd2FzUXVvdGluZyA9IF90aGlzJHN0YXRlMy53YXNRdW90aW5nOyAvLyBTaG9ydCBjaXJjdWl0IGZvciB0aGUgZnJvbV9saW5lIG9wdGlvbnNcblxuICAgICAgaWYgKGVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fcmVzZXRGaWVsZCgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZmllbGQgPSB0aGlzLnN0YXRlLmZpZWxkLnRvU3RyaW5nKGVuY29kaW5nKTtcblxuICAgICAgaWYgKHJ0cmltID09PSB0cnVlICYmIHdhc1F1b3RpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgIGZpZWxkID0gZmllbGQudHJpbVJpZ2h0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYXN0ID09PSB0cnVlKSB7XG4gICAgICAgIHZhciBfdGhpcyRfX2Nhc3QgPSB0aGlzLl9fY2FzdChmaWVsZCksXG4gICAgICAgICAgICBfdGhpcyRfX2Nhc3QyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkX19jYXN0LCAyKSxcbiAgICAgICAgICAgIGVyciA9IF90aGlzJF9fY2FzdDJbMF0sXG4gICAgICAgICAgICBmID0gX3RoaXMkX19jYXN0MlsxXTtcblxuICAgICAgICBpZiAoZXJyICE9PSB1bmRlZmluZWQpIHJldHVybiBlcnI7XG4gICAgICAgIGZpZWxkID0gZjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGF0ZS5yZWNvcmQucHVzaChmaWVsZCk7IC8vIEluY3JlbWVudCByZWNvcmQgbGVuZ3RoIGlmIHJlY29yZCBzaXplIG11c3Qgbm90IGV4Y2VlZCBhIGxpbWl0XG5cbiAgICAgIGlmIChtYXhfcmVjb3JkX3NpemUgIT09IDAgJiYgdHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLnN0YXRlLnJlY29yZF9sZW5ndGggKz0gZmllbGQubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9fcmVzZXRGaWVsZCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfX3Jlc2V0RmllbGRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX19yZXNldEZpZWxkKCkge1xuICAgICAgdGhpcy5zdGF0ZS5maWVsZC5yZXNldCgpO1xuICAgICAgdGhpcy5zdGF0ZS53YXNRdW90aW5nID0gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9fcHVzaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfX3B1c2gocmVjb3JkKSB7XG4gICAgICB2YXIgb25fcmVjb3JkID0gdGhpcy5vcHRpb25zLm9uX3JlY29yZDtcblxuICAgICAgaWYgKG9uX3JlY29yZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBpbmZvID0gdGhpcy5fX2luZm9SZWNvcmQoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlY29yZCA9IG9uX3JlY29yZC5jYWxsKG51bGwsIHJlY29yZCwgaW5mbyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVjb3JkID09PSB1bmRlZmluZWQgfHwgcmVjb3JkID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMucHVzaChyZWNvcmQpO1xuICAgIH0gLy8gUmV0dXJuIGEgdHVwbGUgd2l0aCB0aGUgZXJyb3IgYW5kIHRoZSBjYXN0ZWQgdmFsdWVcblxuICB9LCB7XG4gICAga2V5OiBcIl9fY2FzdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfX2Nhc3QoZmllbGQpIHtcbiAgICAgIHZhciBfdGhpcyRvcHRpb25zNCA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICBjb2x1bW5zID0gX3RoaXMkb3B0aW9uczQuY29sdW1ucyxcbiAgICAgICAgICByZWxheF9jb2x1bW5fY291bnQgPSBfdGhpcyRvcHRpb25zNC5yZWxheF9jb2x1bW5fY291bnQ7XG4gICAgICB2YXIgaXNDb2x1bW5zID0gQXJyYXkuaXNBcnJheShjb2x1bW5zKTsgLy8gRG9udCBsb29zZSB0aW1lIGNhbGxpbmcgY2FzdFxuICAgICAgLy8gYmVjYXVzZSB0aGUgZmluYWwgcmVjb3JkIGlzIGFuIG9iamVjdFxuICAgICAgLy8gYW5kIHRoaXMgZmllbGQgY2FuJ3QgYmUgYXNzb2NpYXRlZCB0byBhIGtleSBwcmVzZW50IGluIGNvbHVtbnNcblxuICAgICAgaWYgKGlzQ29sdW1ucyA9PT0gdHJ1ZSAmJiByZWxheF9jb2x1bW5fY291bnQgJiYgdGhpcy5vcHRpb25zLmNvbHVtbnMubGVuZ3RoIDw9IHRoaXMuc3RhdGUucmVjb3JkLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gW3VuZGVmaW5lZCwgdW5kZWZpbmVkXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc3RhdGUuY2FzdEZpZWxkICE9PSBudWxsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIGluZm8gPSB0aGlzLl9faW5mb0ZpZWxkKCk7XG5cbiAgICAgICAgICByZXR1cm4gW3VuZGVmaW5lZCwgdGhpcy5zdGF0ZS5jYXN0RmllbGQuY2FsbChudWxsLCBmaWVsZCwgaW5mbyldO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gW2Vycl07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX19pc0Zsb2F0KGZpZWxkKSkge1xuICAgICAgICByZXR1cm4gW3VuZGVmaW5lZCwgcGFyc2VGbG9hdChmaWVsZCldO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuY2FzdF9kYXRlICE9PSBmYWxzZSkge1xuICAgICAgICB2YXIgX2luZm8gPSB0aGlzLl9faW5mb0ZpZWxkKCk7XG5cbiAgICAgICAgcmV0dXJuIFt1bmRlZmluZWQsIHRoaXMub3B0aW9ucy5jYXN0X2RhdGUuY2FsbChudWxsLCBmaWVsZCwgX2luZm8pXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFt1bmRlZmluZWQsIGZpZWxkXTtcbiAgICB9IC8vIEhlbHBlciB0byB0ZXN0IGlmIGEgY2hhcmFjdGVyIGlzIGEgc3BhY2Ugb3IgYSBsaW5lIGRlbGltaXRlclxuXG4gIH0sIHtcbiAgICBrZXk6IFwiX19pc0NoYXJUcmltYWJsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfX2lzQ2hhclRyaW1hYmxlKGNocikge1xuICAgICAgcmV0dXJuIGNociA9PT0gc3BhY2UgfHwgY2hyID09PSB0YWIgfHwgY2hyID09PSBjciB8fCBjaHIgPT09IG5sIHx8IGNociA9PT0gbnA7XG4gICAgfSAvLyBLZWVwIGl0IGluIGNhc2Ugd2UgaW1wbGVtZW50IHRoZSBgY2FzdF9pbnRgIG9wdGlvblxuICAgIC8vIF9faXNJbnQodmFsdWUpe1xuICAgIC8vICAgLy8gcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VJbnQodmFsdWUpKVxuICAgIC8vICAgLy8gcmV0dXJuICFpc05hTiggcGFyc2VJbnQoIG9iaiApICk7XG4gICAgLy8gICByZXR1cm4gL14oXFwtfFxcKyk/WzEtOV1bMC05XSokLy50ZXN0KHZhbHVlKVxuICAgIC8vIH1cblxuICB9LCB7XG4gICAga2V5OiBcIl9faXNGbG9hdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfX2lzRmxvYXQodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSAtIHBhcnNlRmxvYXQodmFsdWUpICsgMSA+PSAwOyAvLyBCb3Jyb3dlZCBmcm9tIGpxdWVyeVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfX2NvbXBhcmVCeXRlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfX2NvbXBhcmVCeXRlcyhzb3VyY2VCdWYsIHRhcmdldEJ1ZiwgdGFyZ2V0UG9zLCBmaXJzdEJ5dGUpIHtcbiAgICAgIGlmIChzb3VyY2VCdWZbMF0gIT09IGZpcnN0Qnl0ZSkgcmV0dXJuIDA7XG4gICAgICB2YXIgc291cmNlTGVuZ3RoID0gc291cmNlQnVmLmxlbmd0aDtcblxuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzb3VyY2VMZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc291cmNlQnVmW2ldICE9PSB0YXJnZXRCdWZbdGFyZ2V0UG9zICsgaV0pIHJldHVybiAwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc291cmNlTGVuZ3RoO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfX25lZWRNb3JlRGF0YVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfX25lZWRNb3JlRGF0YShpLCBidWZMZW4sIGVuZCkge1xuICAgICAgaWYgKGVuZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgdmFyIHF1b3RlID0gdGhpcy5vcHRpb25zLnF1b3RlO1xuICAgICAgdmFyIF90aGlzJHN0YXRlNCA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgcXVvdGluZyA9IF90aGlzJHN0YXRlNC5xdW90aW5nLFxuICAgICAgICAgIG5lZWRNb3JlRGF0YVNpemUgPSBfdGhpcyRzdGF0ZTQubmVlZE1vcmVEYXRhU2l6ZSxcbiAgICAgICAgICByZWNvcmREZWxpbWl0ZXJNYXhMZW5ndGggPSBfdGhpcyRzdGF0ZTQucmVjb3JkRGVsaW1pdGVyTWF4TGVuZ3RoO1xuICAgICAgdmFyIG51bU9mQ2hhckxlZnQgPSBidWZMZW4gLSBpIC0gMTtcbiAgICAgIHZhciByZXF1aXJlZExlbmd0aCA9IE1hdGgubWF4KG5lZWRNb3JlRGF0YVNpemUsIC8vIFNraXAgaWYgdGhlIHJlbWFpbmluZyBidWZmZXIgc21hbGxlciB0aGFuIHJlY29yZCBkZWxpbWl0ZXJcbiAgICAgIHJlY29yZERlbGltaXRlck1heExlbmd0aCwgLy8gU2tpcCBpZiB0aGUgcmVtYWluaW5nIGJ1ZmZlciBjYW4gYmUgcmVjb3JkIGRlbGltaXRlciBmb2xsb3dpbmcgdGhlIGNsb3NpbmcgcXVvdGVcbiAgICAgIC8vIDEgaXMgZm9yIHF1b3RlLmxlbmd0aFxuICAgICAgcXVvdGluZyA/IHF1b3RlLmxlbmd0aCArIHJlY29yZERlbGltaXRlck1heExlbmd0aCA6IDApO1xuICAgICAgcmV0dXJuIG51bU9mQ2hhckxlZnQgPCByZXF1aXJlZExlbmd0aDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX19pc0RlbGltaXRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfX2lzRGVsaW1pdGVyKGJ1ZiwgcG9zLCBjaHIpIHtcbiAgICAgIHZhciBfdGhpcyRvcHRpb25zNSA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICBkZWxpbWl0ZXIgPSBfdGhpcyRvcHRpb25zNS5kZWxpbWl0ZXIsXG4gICAgICAgICAgaWdub3JlX2xhc3RfZGVsaW1pdGVycyA9IF90aGlzJG9wdGlvbnM1Lmlnbm9yZV9sYXN0X2RlbGltaXRlcnM7XG5cbiAgICAgIGlmIChpZ25vcmVfbGFzdF9kZWxpbWl0ZXJzID09PSB0cnVlICYmIHRoaXMuc3RhdGUucmVjb3JkLmxlbmd0aCA9PT0gdGhpcy5vcHRpb25zLmNvbHVtbnMubGVuZ3RoIC0gMSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSBpZiAoaWdub3JlX2xhc3RfZGVsaW1pdGVycyAhPT0gZmFsc2UgJiYgdHlwZW9mIGlnbm9yZV9sYXN0X2RlbGltaXRlcnMgPT09ICdudW1iZXInICYmIHRoaXMuc3RhdGUucmVjb3JkLmxlbmd0aCA9PT0gaWdub3JlX2xhc3RfZGVsaW1pdGVycyAtIDEpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG5cbiAgICAgIGxvb3AxOiBmb3IgKHZhciBpID0gMDsgaSA8IGRlbGltaXRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGVsID0gZGVsaW1pdGVyW2ldO1xuXG4gICAgICAgIGlmIChkZWxbMF0gPT09IGNocikge1xuICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgZGVsLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoZGVsW2pdICE9PSBidWZbcG9zICsgal0pIGNvbnRpbnVlIGxvb3AxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBkZWwubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfX2lzUmVjb3JkRGVsaW1pdGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9faXNSZWNvcmREZWxpbWl0ZXIoY2hyLCBidWYsIHBvcykge1xuICAgICAgdmFyIHJlY29yZF9kZWxpbWl0ZXIgPSB0aGlzLm9wdGlvbnMucmVjb3JkX2RlbGltaXRlcjtcbiAgICAgIHZhciByZWNvcmREZWxpbWl0ZXJMZW5ndGggPSByZWNvcmRfZGVsaW1pdGVyLmxlbmd0aDtcblxuICAgICAgbG9vcDE6IGZvciAodmFyIGkgPSAwOyBpIDwgcmVjb3JkRGVsaW1pdGVyTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHJkID0gcmVjb3JkX2RlbGltaXRlcltpXTtcbiAgICAgICAgdmFyIHJkTGVuZ3RoID0gcmQubGVuZ3RoO1xuXG4gICAgICAgIGlmIChyZFswXSAhPT0gY2hyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IHJkTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAocmRbal0gIT09IGJ1Zltwb3MgKyBqXSkge1xuICAgICAgICAgICAgY29udGludWUgbG9vcDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJkLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9faXNFc2NhcGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX19pc0VzY2FwZShidWYsIHBvcywgY2hyKSB7XG4gICAgICB2YXIgZXNjYXBlID0gdGhpcy5vcHRpb25zLmVzY2FwZTtcbiAgICAgIGlmIChlc2NhcGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgIHZhciBsID0gZXNjYXBlLmxlbmd0aDtcblxuICAgICAgaWYgKGVzY2FwZVswXSA9PT0gY2hyKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGVzY2FwZVtpXSAhPT0gYnVmW3BvcyArIGldKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX19pc1F1b3RlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9faXNRdW90ZShidWYsIHBvcykge1xuICAgICAgdmFyIHF1b3RlID0gdGhpcy5vcHRpb25zLnF1b3RlO1xuICAgICAgaWYgKHF1b3RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICB2YXIgbCA9IHF1b3RlLmxlbmd0aDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKHF1b3RlW2ldICE9PSBidWZbcG9zICsgaV0pIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9fYXV0b0Rpc2NvdmVyUmVjb3JkRGVsaW1pdGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9fYXV0b0Rpc2NvdmVyUmVjb3JkRGVsaW1pdGVyKGJ1ZiwgcG9zKSB7XG4gICAgICB2YXIgZW5jb2RpbmcgPSB0aGlzLm9wdGlvbnMuZW5jb2Rpbmc7XG4gICAgICB2YXIgY2hyID0gYnVmW3Bvc107XG5cbiAgICAgIGlmIChjaHIgPT09IGNyKSB7XG4gICAgICAgIGlmIChidWZbcG9zICsgMV0gPT09IG5sKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLnJlY29yZF9kZWxpbWl0ZXIucHVzaChCdWZmZXIuZnJvbSgnXFxyXFxuJywgZW5jb2RpbmcpKTtcbiAgICAgICAgICB0aGlzLnN0YXRlLnJlY29yZERlbGltaXRlck1heExlbmd0aCA9IDI7XG4gICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLnJlY29yZF9kZWxpbWl0ZXIucHVzaChCdWZmZXIuZnJvbSgnXFxyJywgZW5jb2RpbmcpKTtcbiAgICAgICAgICB0aGlzLnN0YXRlLnJlY29yZERlbGltaXRlck1heExlbmd0aCA9IDE7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY2hyID09PSBubCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMucmVjb3JkX2RlbGltaXRlci5wdXNoKEJ1ZmZlci5mcm9tKCdcXG4nLCBlbmNvZGluZykpO1xuICAgICAgICB0aGlzLnN0YXRlLnJlY29yZERlbGltaXRlck1heExlbmd0aCA9IDE7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX19lcnJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfX2Vycm9yKG1zZykge1xuICAgICAgdmFyIHNraXBfbGluZXNfd2l0aF9lcnJvciA9IHRoaXMub3B0aW9ucy5za2lwX2xpbmVzX3dpdGhfZXJyb3I7XG4gICAgICB2YXIgZXJyID0gdHlwZW9mIG1zZyA9PT0gJ3N0cmluZycgPyBuZXcgRXJyb3IobXNnKSA6IG1zZztcblxuICAgICAgaWYgKHNraXBfbGluZXNfd2l0aF9lcnJvcikge1xuICAgICAgICB0aGlzLnN0YXRlLnJlY29yZEhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0KCdza2lwJywgZXJyKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9faW5mb0RhdGFTZXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX19pbmZvRGF0YVNldCgpIHtcbiAgICAgIHJldHVybiBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIHRoaXMuaW5mbyksIHt9LCB7XG4gICAgICAgIGNvbHVtbnM6IHRoaXMub3B0aW9ucy5jb2x1bW5zXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX19pbmZvUmVjb3JkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9faW5mb1JlY29yZCgpIHtcbiAgICAgIHZhciBjb2x1bW5zID0gdGhpcy5vcHRpb25zLmNvbHVtbnM7XG4gICAgICByZXR1cm4gX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHt9LCB0aGlzLl9faW5mb0RhdGFTZXQoKSksIHt9LCB7XG4gICAgICAgIGVycm9yOiB0aGlzLnN0YXRlLmVycm9yLFxuICAgICAgICBoZWFkZXI6IGNvbHVtbnMgPT09IHRydWUsXG4gICAgICAgIGluZGV4OiB0aGlzLnN0YXRlLnJlY29yZC5sZW5ndGhcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfX2luZm9GaWVsZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfX2luZm9GaWVsZCgpIHtcbiAgICAgIHZhciBjb2x1bW5zID0gdGhpcy5vcHRpb25zLmNvbHVtbnM7XG4gICAgICB2YXIgaXNDb2x1bW5zID0gQXJyYXkuaXNBcnJheShjb2x1bW5zKTtcbiAgICAgIHJldHVybiBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIHRoaXMuX19pbmZvUmVjb3JkKCkpLCB7fSwge1xuICAgICAgICBjb2x1bW46IGlzQ29sdW1ucyA9PT0gdHJ1ZSA/IGNvbHVtbnMubGVuZ3RoID4gdGhpcy5zdGF0ZS5yZWNvcmQubGVuZ3RoID8gY29sdW1uc1t0aGlzLnN0YXRlLnJlY29yZC5sZW5ndGhdLm5hbWUgOiBudWxsIDogdGhpcy5zdGF0ZS5yZWNvcmQubGVuZ3RoLFxuICAgICAgICBxdW90aW5nOiB0aGlzLnN0YXRlLndhc1F1b3RpbmdcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQYXJzZXI7XG59KFRyYW5zZm9ybSk7XG5cbnZhciBwYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKCkge1xuICB2YXIgZGF0YSwgb3B0aW9ucywgY2FsbGJhY2s7XG5cbiAgZm9yICh2YXIgaSBpbiBhcmd1bWVudHMpIHtcbiAgICB2YXIgYXJndW1lbnQgPSBhcmd1bWVudHNbaV07XG5cbiAgICB2YXIgdHlwZSA9IF90eXBlb2YoYXJndW1lbnQpO1xuXG4gICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCAmJiAodHlwZW9mIGFyZ3VtZW50ID09PSAnc3RyaW5nJyB8fCBCdWZmZXIuaXNCdWZmZXIoYXJndW1lbnQpKSkge1xuICAgICAgZGF0YSA9IGFyZ3VtZW50O1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkICYmIGlzT2JqZWN0KGFyZ3VtZW50KSkge1xuICAgICAgb3B0aW9ucyA9IGFyZ3VtZW50O1xuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2sgPT09IHVuZGVmaW5lZCAmJiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IGFyZ3VtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgQ3N2RXJyb3IoJ0NTVl9JTlZBTElEX0FSR1VNRU5UJywgWydJbnZhbGlkIGFyZ3VtZW50OicsIFwiZ290IFwiLmNvbmNhdChKU09OLnN0cmluZ2lmeShhcmd1bWVudCksIFwiIGF0IGluZGV4IFwiKS5jb25jYXQoaSldLCBvcHRpb25zIHx8IHt9KTtcbiAgICB9XG4gIH1cblxuICB2YXIgcGFyc2VyID0gbmV3IFBhcnNlcihvcHRpb25zKTtcblxuICBpZiAoY2FsbGJhY2spIHtcbiAgICB2YXIgcmVjb3JkcyA9IG9wdGlvbnMgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLm9iam5hbWUgPT09IHVuZGVmaW5lZCA/IFtdIDoge307XG4gICAgcGFyc2VyLm9uKCdyZWFkYWJsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZWNvcmQ7XG5cbiAgICAgIHdoaWxlICgocmVjb3JkID0gdGhpcy5yZWFkKCkpICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5vYmpuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZWNvcmRzLnB1c2gocmVjb3JkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWNvcmRzW3JlY29yZFswXV0gPSByZWNvcmRbMV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBwYXJzZXIub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgICAgY2FsbGJhY2soZXJyLCB1bmRlZmluZWQsIHBhcnNlci5fX2luZm9EYXRhU2V0KCkpO1xuICAgIH0pO1xuICAgIHBhcnNlci5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbGJhY2sodW5kZWZpbmVkLCByZWNvcmRzLCBwYXJzZXIuX19pbmZvRGF0YVNldCgpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBHaXZlIGEgY2hhbmNlIGZvciBldmVudHMgdG8gYmUgcmVnaXN0ZXJlZCBsYXRlclxuICAgIGlmICh0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICBwYXJzZXIud3JpdGUoZGF0YSk7XG4gICAgICAgIHBhcnNlci5lbmQoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZXIud3JpdGUoZGF0YSk7XG4gICAgICBwYXJzZXIuZW5kKCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnNlcjtcbn07XG5cbnZhciBDc3ZFcnJvciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0Vycm9yKSB7XG4gIF9pbmhlcml0cyhDc3ZFcnJvciwgX0Vycm9yKTtcblxuICB2YXIgX3N1cGVyMiA9IF9jcmVhdGVTdXBlcihDc3ZFcnJvcik7XG5cbiAgZnVuY3Rpb24gQ3N2RXJyb3IoY29kZSwgbWVzc2FnZSwgb3B0aW9ucykge1xuICAgIHZhciBfdGhpczI7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ3N2RXJyb3IpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWVzc2FnZSkpIG1lc3NhZ2UgPSBtZXNzYWdlLmpvaW4oJyAnKTtcbiAgICBfdGhpczIgPSBfc3VwZXIyLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczIpLCBDc3ZFcnJvcik7XG4gICAgfVxuXG4gICAgX3RoaXMyLmNvZGUgPSBjb2RlO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNvbnRleHRzID0gbmV3IEFycmF5KF9sZW4gPiAzID8gX2xlbiAtIDMgOiAwKSwgX2tleSA9IDM7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGNvbnRleHRzW19rZXkgLSAzXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaTIgPSAwLCBfY29udGV4dHMgPSBjb250ZXh0czsgX2kyIDwgX2NvbnRleHRzLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHZhciBjb250ZXh0ID0gX2NvbnRleHRzW19pMl07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBjb250ZXh0KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGNvbnRleHRba2V5XTtcbiAgICAgICAgX3RoaXMyW2tleV0gPSBCdWZmZXIuaXNCdWZmZXIodmFsdWUpID8gdmFsdWUudG9TdHJpbmcob3B0aW9ucy5lbmNvZGluZykgOiB2YWx1ZSA9PSBudWxsID8gdmFsdWUgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuXG4gIHJldHVybiBDc3ZFcnJvcjtcbn0oIC8qI19fUFVSRV9fKi9fd3JhcE5hdGl2ZVN1cGVyKEVycm9yKSk7XG5cbnBhcnNlLlBhcnNlciA9IFBhcnNlcjtcbnBhcnNlLkNzdkVycm9yID0gQ3N2RXJyb3I7XG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlO1xuXG52YXIgdW5kZXJzY29yZSA9IGZ1bmN0aW9uIHVuZGVyc2NvcmUoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFtBLVpdKS9nLCBmdW5jdGlvbiAoXywgbWF0Y2gpIHtcbiAgICByZXR1cm4gJ18nICsgbWF0Y2gudG9Mb3dlckNhc2UoKTtcbiAgfSk7XG59O1xuXG52YXIgaXNPYmplY3QgPSBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIF90eXBlb2Yob2JqKSA9PT0gJ29iamVjdCcgJiYgb2JqICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KG9iaik7XG59O1xuXG52YXIgaXNSZWNvcmRFbXB0eSA9IGZ1bmN0aW9uIGlzUmVjb3JkRW1wdHkocmVjb3JkKSB7XG4gIHJldHVybiByZWNvcmQuZXZlcnkoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgcmV0dXJuIGZpZWxkID09IG51bGwgfHwgZmllbGQudG9TdHJpbmcgJiYgZmllbGQudG9TdHJpbmcoKS50cmltKCkgPT09ICcnO1xuICB9KTtcbn07XG5cbnZhciBub3JtYWxpemVDb2x1bW5zQXJyYXkgPSBmdW5jdGlvbiBub3JtYWxpemVDb2x1bW5zQXJyYXkoY29sdW1ucykge1xuICB2YXIgbm9ybWFsaXplZENvbHVtbnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGNvbHVtbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGNvbHVtbiA9IGNvbHVtbnNbaV07XG5cbiAgICBpZiAoY29sdW1uID09PSB1bmRlZmluZWQgfHwgY29sdW1uID09PSBudWxsIHx8IGNvbHVtbiA9PT0gZmFsc2UpIHtcbiAgICAgIG5vcm1hbGl6ZWRDb2x1bW5zW2ldID0ge1xuICAgICAgICBkaXNhYmxlZDogdHJ1ZVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb2x1bW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICBub3JtYWxpemVkQ29sdW1uc1tpXSA9IHtcbiAgICAgICAgbmFtZTogY29sdW1uXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoY29sdW1uKSkge1xuICAgICAgaWYgKHR5cGVvZiBjb2x1bW4ubmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IENzdkVycm9yKCdDU1ZfT1BUSU9OX0NPTFVNTlNfTUlTU0lOR19OQU1FJywgWydPcHRpb24gY29sdW1ucyBtaXNzaW5nIG5hbWU6JywgXCJwcm9wZXJ0eSBcXFwibmFtZVxcXCIgaXMgcmVxdWlyZWQgYXQgcG9zaXRpb24gXCIuY29uY2F0KGkpLCAnd2hlbiBjb2x1bW4gaXMgYW4gb2JqZWN0IGxpdGVyYWwnXSk7XG4gICAgICB9XG5cbiAgICAgIG5vcm1hbGl6ZWRDb2x1bW5zW2ldID0gY29sdW1uO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgQ3N2RXJyb3IoJ0NTVl9JTlZBTElEX0NPTFVNTl9ERUZJTklUSU9OJywgWydJbnZhbGlkIGNvbHVtbiBkZWZpbml0aW9uOicsICdleHBlY3QgYSBzdHJpbmcgb3IgYSBsaXRlcmFsIG9iamVjdCwnLCBcImdvdCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkoY29sdW1uKSwgXCIgYXQgcG9zaXRpb24gXCIpLmNvbmNhdChpKV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBub3JtYWxpemVkQ29sdW1ucztcbn07XG5cbn0pLmNhbGwodGhpcyl9KS5jYWxsKHRoaXMscmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIscmVxdWlyZShcInRpbWVyc1wiKS5zZXRJbW1lZGlhdGUpXG59LHtcIi4vUmVzaXplYWJsZUJ1ZmZlclwiOjEsXCJidWZmZXJcIjo1LFwic3RyZWFtXCI6MTEsXCJ0aW1lcnNcIjoyN31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxuLy8gU3VwcG9ydCBkZWNvZGluZyBVUkwtc2FmZSBiYXNlNjQgc3RyaW5ncywgYXMgTm9kZS5qcyBkb2VzLlxuLy8gU2VlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQjVVJMX2FwcGxpY2F0aW9uc1xucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gZ2V0TGVucyAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cbiAgaWYgKGxlbiAlIDQgPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0JylcbiAgfVxuXG4gIC8vIFRyaW0gb2ZmIGV4dHJhIGJ5dGVzIGFmdGVyIHBsYWNlaG9sZGVyIGJ5dGVzIGFyZSBmb3VuZFxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9iZWF0Z2FtbWl0L2Jhc2U2NC1qcy9pc3N1ZXMvNDJcbiAgdmFyIHZhbGlkTGVuID0gYjY0LmluZGV4T2YoJz0nKVxuICBpZiAodmFsaWRMZW4gPT09IC0xKSB2YWxpZExlbiA9IGxlblxuXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSB2YWxpZExlbiA9PT0gbGVuXG4gICAgPyAwXG4gICAgOiA0IC0gKHZhbGlkTGVuICUgNClcblxuICByZXR1cm4gW3ZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW5dXG59XG5cbi8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIF9ieXRlTGVuZ3RoIChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pIHtcbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG5cbiAgdmFyIGFyciA9IG5ldyBBcnIoX2J5dGVMZW5ndGgoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSlcblxuICB2YXIgY3VyQnl0ZSA9IDBcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIHZhciBsZW4gPSBwbGFjZUhvbGRlcnNMZW4gPiAwXG4gICAgPyB2YWxpZExlbiAtIDRcbiAgICA6IHZhbGlkTGVuXG5cbiAgdmFyIGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8XG4gICAgICByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMikge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDEpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPVxuICAgICAgKCh1aW50OFtpXSA8PCAxNikgJiAweEZGMDAwMCkgK1xuICAgICAgKCh1aW50OFtpICsgMV0gPDwgOCkgJiAweEZGMDApICtcbiAgICAgICh1aW50OFtpICsgMl0gJiAweEZGKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aCkpKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXSArXG4gICAgICAnPT0nXG4gICAgKVxuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDEwXSArXG4gICAgICBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl0gK1xuICAgICAgJz0nXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG5cbn0se31dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG59LHt9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoQnVmZmVyKXsoZnVuY3Rpb24gKCl7XG4vKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxudmFyIEtfTUFYX0xFTkdUSCA9IDB4N2ZmZmZmZmZcbmV4cG9ydHMua01heExlbmd0aCA9IEtfTUFYX0xFTkdUSFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBQcmludCB3YXJuaW5nIGFuZCByZWNvbW1lbmQgdXNpbmcgYGJ1ZmZlcmAgdjQueCB3aGljaCBoYXMgYW4gT2JqZWN0XG4gKiAgICAgICAgICAgICAgIGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBXZSByZXBvcnQgdGhhdCB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBpZiB0aGUgYXJlIG5vdCBzdWJjbGFzc2FibGVcbiAqIHVzaW5nIF9fcHJvdG9fXy4gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWBcbiAqIChTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOCkuIElFIDEwIGxhY2tzIHN1cHBvcnRcbiAqIGZvciBfX3Byb3RvX18gYW5kIGhhcyBhIGJ1Z2d5IHR5cGVkIGFycmF5IGltcGxlbWVudGF0aW9uLlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICBjb25zb2xlLmVycm9yKFxuICAgICdUaGlzIGJyb3dzZXIgbGFja3MgdHlwZWQgYXJyYXkgKFVpbnQ4QXJyYXkpIHN1cHBvcnQgd2hpY2ggaXMgcmVxdWlyZWQgYnkgJyArXG4gICAgJ2BidWZmZXJgIHY1LnguIFVzZSBgYnVmZmVyYCB2NC54IGlmIHlvdSByZXF1aXJlIG9sZCBicm93c2VyIHN1cHBvcnQuJ1xuICApXG59XG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgLy8gQ2FuIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkP1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7IF9fcHJvdG9fXzogVWludDhBcnJheS5wcm90b3R5cGUsIGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfSB9XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDJcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIucHJvdG90eXBlLCAncGFyZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0aGlzKSkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIHJldHVybiB0aGlzLmJ1ZmZlclxuICB9XG59KVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLnByb3RvdHlwZSwgJ29mZnNldCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGhpcykpIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpcy5ieXRlT2Zmc2V0XG4gIH1cbn0pXG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAobGVuZ3RoKSB7XG4gIGlmIChsZW5ndGggPiBLX01BWF9MRU5HVEgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIFwiJyArIGxlbmd0aCArICdcIiBpcyBpbnZhbGlkIGZvciBvcHRpb24gXCJzaXplXCInKVxuICB9XG4gIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlXG4gIHZhciBidWYgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gIGJ1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBidWZcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIHN0cmluZy4gUmVjZWl2ZWQgdHlwZSBudW1iZXInXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZShhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20oYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbi8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG5pZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgIT0gbnVsbCAmJlxuICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgIHZhbHVlOiBudWxsLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSlcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbmZ1bmN0aW9uIGZyb20gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUxpa2UodmFsdWUpXG4gIH1cblxuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgICdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCAnICtcbiAgICAgICdvciBBcnJheS1saWtlIE9iamVjdC4gUmVjZWl2ZWQgdHlwZSAnICsgKHR5cGVvZiB2YWx1ZSlcbiAgICApXG4gIH1cblxuICBpZiAoaXNJbnN0YW5jZSh2YWx1ZSwgQXJyYXlCdWZmZXIpIHx8XG4gICAgICAodmFsdWUgJiYgaXNJbnN0YW5jZSh2YWx1ZS5idWZmZXIsIEFycmF5QnVmZmVyKSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwidmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBvZiB0eXBlIG51bWJlci4gUmVjZWl2ZWQgdHlwZSBudW1iZXInXG4gICAgKVxuICB9XG5cbiAgdmFyIHZhbHVlT2YgPSB2YWx1ZS52YWx1ZU9mICYmIHZhbHVlLnZhbHVlT2YoKVxuICBpZiAodmFsdWVPZiAhPSBudWxsICYmIHZhbHVlT2YgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlT2YsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIHZhciBiID0gZnJvbU9iamVjdCh2YWx1ZSlcbiAgaWYgKGIpIHJldHVybiBiXG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1ByaW1pdGl2ZSAhPSBudWxsICYmXG4gICAgICB0eXBlb2YgdmFsdWVbU3ltYm9sLnRvUHJpbWl0aXZlXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbShcbiAgICAgIHZhbHVlW1N5bWJvbC50b1ByaW1pdGl2ZV0oJ3N0cmluZycpLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGhcbiAgICApXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCAnICtcbiAgICAnb3IgQXJyYXktbGlrZSBPYmplY3QuIFJlY2VpdmVkIHR5cGUgJyArICh0eXBlb2YgdmFsdWUpXG4gIClcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbSh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBOb3RlOiBDaGFuZ2UgcHJvdG90eXBlICphZnRlciogQnVmZmVyLmZyb20gaXMgZGVmaW5lZCB0byB3b3JrYXJvdW5kIENocm9tZSBidWc6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzE0OFxuQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuQnVmZmVyLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXlcblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIFwiJyArIHNpemUgKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcihzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2Moc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlIChzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB2YXIgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gYnVmLndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICBidWYgPSBidWYuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlIChhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHZhciBidWYgPSBjcmVhdGVCdWZmZXIobGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgYnVmW2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJvZmZzZXRcIiBpcyBvdXRzaWRlIG9mIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcImxlbmd0aFwiIGlzIG91dHNpZGUgb2YgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICB2YXIgYnVmXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBidWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB2YXIgYnVmID0gY3JlYXRlQnVmZmVyKGxlbilcblxuICAgIGlmIChidWYubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gYnVmXG4gICAgfVxuXG4gICAgb2JqLmNvcHkoYnVmLCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIGJ1ZlxuICB9XG5cbiAgaWYgKG9iai5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgbnVtYmVySXNOYU4ob2JqLmxlbmd0aCkpIHtcbiAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIoMClcbiAgICB9XG4gICAgcmV0dXJuIGZyb21BcnJheUxpa2Uob2JqKVxuICB9XG5cbiAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBBcnJheS5pc0FycmF5KG9iai5kYXRhKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKG9iai5kYXRhKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBLX01BWF9MRU5HVEhgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIEtfTUFYX0xFTkdUSC50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuIGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlciA9PT0gdHJ1ZSAmJlxuICAgIGIgIT09IEJ1ZmZlci5wcm90b3R5cGUgLy8gc28gQnVmZmVyLmlzQnVmZmVyKEJ1ZmZlci5wcm90b3R5cGUpIHdpbGwgYmUgZmFsc2Vcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmIChpc0luc3RhbmNlKGEsIFVpbnQ4QXJyYXkpKSBhID0gQnVmZmVyLmZyb20oYSwgYS5vZmZzZXQsIGEuYnl0ZUxlbmd0aClcbiAgaWYgKGlzSW5zdGFuY2UoYiwgVWludDhBcnJheSkpIGIgPSBCdWZmZXIuZnJvbShiLCBiLm9mZnNldCwgYi5ieXRlTGVuZ3RoKVxuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJidWYxXCIsIFwiYnVmMlwiIGFyZ3VtZW50cyBtdXN0IGJlIG9uZSBvZiB0eXBlIEJ1ZmZlciBvciBVaW50OEFycmF5J1xuICAgIClcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmIChpc0luc3RhbmNlKGJ1ZiwgVWludDhBcnJheSkpIHtcbiAgICAgIGJ1ZiA9IEJ1ZmZlci5mcm9tKGJ1ZilcbiAgICB9XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgaXNJbnN0YW5jZShzdHJpbmcsIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgb3IgQXJyYXlCdWZmZXIuICcgK1xuICAgICAgJ1JlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBzdHJpbmdcbiAgICApXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbXVzdE1hdGNoID0gKGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSA9PT0gdHJ1ZSlcbiAgaWYgKCFtdXN0TWF0Y2ggJiYgbGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB7XG4gICAgICAgICAgcmV0dXJuIG11c3RNYXRjaCA/IC0xIDogdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgfVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoaXMgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCAoYW5kIHRoZSBgaXMtYnVmZmVyYCBucG0gcGFja2FnZSlcbi8vIHRvIGRldGVjdCBhIEJ1ZmZlciBpbnN0YW5jZS4gSXQncyBub3QgcG9zc2libGUgdG8gdXNlIGBpbnN0YW5jZW9mIEJ1ZmZlcmBcbi8vIHJlbGlhYmx5IGluIGEgYnJvd3NlcmlmeSBjb250ZXh0IGJlY2F1c2UgdGhlcmUgY291bGQgYmUgbXVsdGlwbGUgZGlmZmVyZW50XG4vLyBjb3BpZXMgb2YgdGhlICdidWZmZXInIHBhY2thZ2UgaW4gdXNlLiBUaGlzIG1ldGhvZCB3b3JrcyBldmVuIGZvciBCdWZmZXJcbi8vIGluc3RhbmNlcyB0aGF0IHdlcmUgY3JlYXRlZCBmcm9tIGFub3RoZXIgY29weSBvZiB0aGUgYGJ1ZmZlcmAgcGFja2FnZS5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzE1NFxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0xvY2FsZVN0cmluZyA9IEJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmdcblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5yZXBsYWNlKC8oLnsyfSkvZywgJyQxICcpLnRyaW0oKVxuICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmIChpc0luc3RhbmNlKHRhcmdldCwgVWludDhBcnJheSkpIHtcbiAgICB0YXJnZXQgPSBCdWZmZXIuZnJvbSh0YXJnZXQsIHRhcmdldC5vZmZzZXQsIHRhcmdldC5ieXRlTGVuZ3RoKVxuICB9XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcInRhcmdldFwiIGFyZ3VtZW50IG11c3QgYmUgb25lIG9mIHR5cGUgQnVmZmVyIG9yIFVpbnQ4QXJyYXkuICcgK1xuICAgICAgJ1JlY2VpdmVkIHR5cGUgJyArICh0eXBlb2YgdGFyZ2V0KVxuICAgIClcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKG51bWJlcklzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgWyB2YWwgXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgdmFyIGluZGV4U2l6ZSA9IDFcbiAgdmFyIGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgdmFyIHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGRpcikge1xuICAgIHZhciBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKG51bWJlcklzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoID4+PiAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICB2YXIgcmVzID0gW11cblxuICB2YXIgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIHZhciBjb2RlUG9pbnQgPSBudWxsXG4gICAgdmFyIGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRikgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKSA/IDNcbiAgICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICB2YXIgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG52YXIgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIHZhciBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIHZhciByZXMgPSAnJ1xuICB2YXIgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgKGJ5dGVzW2kgKyAxXSAqIDI1NikpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICB2YXIgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCAoOCAqIGJ5dGVMZW5ndGgpIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IHNob3VsZCBiZSBhIEJ1ZmZlcicpXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gVXNlIGJ1aWx0LWluIHdoZW4gYXZhaWxhYmxlLCBtaXNzaW5nIGZyb20gSUUxMVxuICAgIHRoaXMuY29weVdpdGhpbih0YXJnZXRTdGFydCwgc3RhcnQsIGVuZClcbiAgfSBlbHNlIGlmICh0aGlzID09PSB0YXJnZXQgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmcgY29weSBmcm9tIGVuZFxuICAgIGZvciAodmFyIGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKChlbmNvZGluZyA9PT0gJ3V0ZjgnICYmIGNvZGUgPCAxMjgpIHx8XG4gICAgICAgICAgZW5jb2RpbmcgPT09ICdsYXRpbjEnKSB7XG4gICAgICAgIC8vIEZhc3QgcGF0aDogSWYgYHZhbGAgZml0cyBpbnRvIGEgc2luZ2xlIGJ5dGUsIHVzZSB0aGF0IG51bWVyaWMgdmFsdWUuXG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICAgIHZhciBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgdmFsdWUgXCInICsgdmFsICtcbiAgICAgICAgJ1wiIGlzIGludmFsaWQgZm9yIGFyZ3VtZW50IFwidmFsdWVcIicpXG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teKy8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgdGFrZXMgZXF1YWwgc2lnbnMgYXMgZW5kIG9mIHRoZSBCYXNlNjQgZW5jb2RpbmdcbiAgc3RyID0gc3RyLnNwbGl0KCc9JylbMF1cbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0ci50cmltKCkucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG4vLyBBcnJheUJ1ZmZlciBvciBVaW50OEFycmF5IG9iamVjdHMgZnJvbSBvdGhlciBjb250ZXh0cyAoaS5lLiBpZnJhbWVzKSBkbyBub3QgcGFzc1xuLy8gdGhlIGBpbnN0YW5jZW9mYCBjaGVjayBidXQgdGhleSBzaG91bGQgYmUgdHJlYXRlZCBhcyBvZiB0aGF0IHR5cGUuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8xNjZcbmZ1bmN0aW9uIGlzSW5zdGFuY2UgKG9iaiwgdHlwZSkge1xuICByZXR1cm4gb2JqIGluc3RhbmNlb2YgdHlwZSB8fFxuICAgIChvYmogIT0gbnVsbCAmJiBvYmouY29uc3RydWN0b3IgIT0gbnVsbCAmJiBvYmouY29uc3RydWN0b3IubmFtZSAhPSBudWxsICYmXG4gICAgICBvYmouY29uc3RydWN0b3IubmFtZSA9PT0gdHlwZS5uYW1lKVxufVxuZnVuY3Rpb24gbnVtYmVySXNOYU4gKG9iaikge1xuICAvLyBGb3IgSUUxMSBzdXBwb3J0XG4gIHJldHVybiBvYmogIT09IG9iaiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuXG59KS5jYWxsKHRoaXMpfSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyKVxufSx7XCJiYXNlNjQtanNcIjozLFwiYnVmZmVyXCI6NSxcImllZWU3NTRcIjo3fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCByZXNvbHZlcik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgcmVzb2x2ZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXJyb3JMaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGhhbmRsZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCAnZXJyb3InLCBoYW5kbGVyLCBmbGFncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIGxpc3RlbmVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgZW1pdHRlci5vbmNlKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdHRlci5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBFdmVudFRhcmdldCBkb2VzIG5vdCBoYXZlIGBlcnJvcmAgZXZlbnQgc2VtYW50aWNzIGxpa2UgTm9kZVxuICAgIC8vIEV2ZW50RW1pdHRlcnMsIHdlIGRvIG5vdCBsaXN0ZW4gZm9yIGBlcnJvcmAgZXZlbnRzIGhlcmUuXG4gICAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lcihhcmcpIHtcbiAgICAgIC8vIElFIGRvZXMgbm90IGhhdmUgYnVpbHRpbiBgeyBvbmNlOiB0cnVlIH1gIHN1cHBvcnQgc28gd2VcbiAgICAgIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkuXG4gICAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgd3JhcExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyKGFyZyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBlbWl0dGVyKTtcbiAgfVxufVxuXG59LHt9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qISBpZWVlNzU0LiBCU0QtMy1DbGF1c2UgTGljZW5zZS4gRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnL29wZW5zb3VyY2U+ICovXG5leHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IChlICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IChtICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKCh2YWx1ZSAqIGMpIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG5cbn0se31dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgaWYgKHN1cGVyQ3Rvcikge1xuICAgICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBpZiAoc3VwZXJDdG9yKSB7XG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICAgIH1cbiAgfVxufVxuXG59LHt9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cbn0se31dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qISBzYWZlLWJ1ZmZlci4gTUlUIExpY2Vuc2UuIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZy9vcGVuc291cmNlPiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm9kZS9uby1kZXByZWNhdGVkLWFwaSAqL1xudmFyIGJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpXG52YXIgQnVmZmVyID0gYnVmZmVyLkJ1ZmZlclxuXG4vLyBhbHRlcm5hdGl2ZSB0byB1c2luZyBPYmplY3Qua2V5cyBmb3Igb2xkIGJyb3dzZXJzXG5mdW5jdGlvbiBjb3B5UHJvcHMgKHNyYywgZHN0KSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBkc3Rba2V5XSA9IHNyY1trZXldXG4gIH1cbn1cbmlmIChCdWZmZXIuZnJvbSAmJiBCdWZmZXIuYWxsb2MgJiYgQnVmZmVyLmFsbG9jVW5zYWZlICYmIEJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBidWZmZXJcbn0gZWxzZSB7XG4gIC8vIENvcHkgcHJvcGVydGllcyBmcm9tIHJlcXVpcmUoJ2J1ZmZlcicpXG4gIGNvcHlQcm9wcyhidWZmZXIsIGV4cG9ydHMpXG4gIGV4cG9ydHMuQnVmZmVyID0gU2FmZUJ1ZmZlclxufVxuXG5mdW5jdGlvbiBTYWZlQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5TYWZlQnVmZmVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQnVmZmVyLnByb3RvdHlwZSlcblxuLy8gQ29weSBzdGF0aWMgbWV0aG9kcyBmcm9tIEJ1ZmZlclxuY29weVByb3BzKEJ1ZmZlciwgU2FmZUJ1ZmZlcilcblxuU2FmZUJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuICByZXR1cm4gQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5TYWZlQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuICB2YXIgYnVmID0gQnVmZmVyKHNpemUpXG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJykge1xuICAgICAgYnVmLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5maWxsKGZpbGwpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGJ1Zi5maWxsKDApXG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG5TYWZlQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHJldHVybiBCdWZmZXIoc2l6ZSlcbn1cblxuU2FmZUJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlci5TbG93QnVmZmVyKHNpemUpXG59XG5cbn0se1wiYnVmZmVyXCI6NX1dLDExOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmVhbTtcblxudmFyIEVFID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuaW5oZXJpdHMoU3RyZWFtLCBFRSk7XG5TdHJlYW0uUmVhZGFibGUgPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fcmVhZGFibGUuanMnKTtcblN0cmVhbS5Xcml0YWJsZSA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV93cml0YWJsZS5qcycpO1xuU3RyZWFtLkR1cGxleCA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV9kdXBsZXguanMnKTtcblN0cmVhbS5UcmFuc2Zvcm0gPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fdHJhbnNmb3JtLmpzJyk7XG5TdHJlYW0uUGFzc1Rocm91Z2ggPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fcGFzc3Rocm91Z2guanMnKTtcblN0cmVhbS5maW5pc2hlZCA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS9saWIvaW50ZXJuYWwvc3RyZWFtcy9lbmQtb2Ytc3RyZWFtLmpzJylcblN0cmVhbS5waXBlbGluZSA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS9saWIvaW50ZXJuYWwvc3RyZWFtcy9waXBlbGluZS5qcycpXG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuNC54XG5TdHJlYW0uU3RyZWFtID0gU3RyZWFtO1xuXG5cblxuLy8gb2xkLXN0eWxlIHN0cmVhbXMuICBOb3RlIHRoYXQgdGhlIHBpcGUgbWV0aG9kICh0aGUgb25seSByZWxldmFudFxuLy8gcGFydCBvZiB0aGlzIGNsYXNzKSBpcyBvdmVycmlkZGVuIGluIHRoZSBSZWFkYWJsZSBjbGFzcy5cblxuZnVuY3Rpb24gU3RyZWFtKCkge1xuICBFRS5jYWxsKHRoaXMpO1xufVxuXG5TdHJlYW0ucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbihkZXN0LCBvcHRpb25zKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzO1xuXG4gIGZ1bmN0aW9uIG9uZGF0YShjaHVuaykge1xuICAgIGlmIChkZXN0LndyaXRhYmxlKSB7XG4gICAgICBpZiAoZmFsc2UgPT09IGRlc3Qud3JpdGUoY2h1bmspICYmIHNvdXJjZS5wYXVzZSkge1xuICAgICAgICBzb3VyY2UucGF1c2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzb3VyY2Uub24oJ2RhdGEnLCBvbmRhdGEpO1xuXG4gIGZ1bmN0aW9uIG9uZHJhaW4oKSB7XG4gICAgaWYgKHNvdXJjZS5yZWFkYWJsZSAmJiBzb3VyY2UucmVzdW1lKSB7XG4gICAgICBzb3VyY2UucmVzdW1lKCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdC5vbignZHJhaW4nLCBvbmRyYWluKTtcblxuICAvLyBJZiB0aGUgJ2VuZCcgb3B0aW9uIGlzIG5vdCBzdXBwbGllZCwgZGVzdC5lbmQoKSB3aWxsIGJlIGNhbGxlZCB3aGVuXG4gIC8vIHNvdXJjZSBnZXRzIHRoZSAnZW5kJyBvciAnY2xvc2UnIGV2ZW50cy4gIE9ubHkgZGVzdC5lbmQoKSBvbmNlLlxuICBpZiAoIWRlc3QuX2lzU3RkaW8gJiYgKCFvcHRpb25zIHx8IG9wdGlvbnMuZW5kICE9PSBmYWxzZSkpIHtcbiAgICBzb3VyY2Uub24oJ2VuZCcsIG9uZW5kKTtcbiAgICBzb3VyY2Uub24oJ2Nsb3NlJywgb25jbG9zZSk7XG4gIH1cblxuICB2YXIgZGlkT25FbmQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gb25lbmQoKSB7XG4gICAgaWYgKGRpZE9uRW5kKSByZXR1cm47XG4gICAgZGlkT25FbmQgPSB0cnVlO1xuXG4gICAgZGVzdC5lbmQoKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gb25jbG9zZSgpIHtcbiAgICBpZiAoZGlkT25FbmQpIHJldHVybjtcbiAgICBkaWRPbkVuZCA9IHRydWU7XG5cbiAgICBpZiAodHlwZW9mIGRlc3QuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykgZGVzdC5kZXN0cm95KCk7XG4gIH1cblxuICAvLyBkb24ndCBsZWF2ZSBkYW5nbGluZyBwaXBlcyB3aGVuIHRoZXJlIGFyZSBlcnJvcnMuXG4gIGZ1bmN0aW9uIG9uZXJyb3IoZXIpIHtcbiAgICBjbGVhbnVwKCk7XG4gICAgaWYgKEVFLmxpc3RlbmVyQ291bnQodGhpcywgJ2Vycm9yJykgPT09IDApIHtcbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgc3RyZWFtIGVycm9yIGluIHBpcGUuXG4gICAgfVxuICB9XG5cbiAgc291cmNlLm9uKCdlcnJvcicsIG9uZXJyb3IpO1xuICBkZXN0Lm9uKCdlcnJvcicsIG9uZXJyb3IpO1xuXG4gIC8vIHJlbW92ZSBhbGwgdGhlIGV2ZW50IGxpc3RlbmVycyB0aGF0IHdlcmUgYWRkZWQuXG4gIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgb25kYXRhKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdkcmFpbicsIG9uZHJhaW4pO1xuXG4gICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCBvbmVuZCk7XG4gICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuXG4gICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG5cbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIGNsZWFudXApO1xuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBjbGVhbnVwKTtcblxuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgY2xlYW51cCk7XG4gIH1cblxuICBzb3VyY2Uub24oJ2VuZCcsIGNsZWFudXApO1xuICBzb3VyY2Uub24oJ2Nsb3NlJywgY2xlYW51cCk7XG5cbiAgZGVzdC5vbignY2xvc2UnLCBjbGVhbnVwKTtcblxuICBkZXN0LmVtaXQoJ3BpcGUnLCBzb3VyY2UpO1xuXG4gIC8vIEFsbG93IGZvciB1bml4LWxpa2UgdXNhZ2U6IEEucGlwZShCKS5waXBlKEMpXG4gIHJldHVybiBkZXN0O1xufTtcblxufSx7XCJldmVudHNcIjo2LFwiaW5oZXJpdHNcIjo4LFwicmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX2R1cGxleC5qc1wiOjEzLFwicmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX3Bhc3N0aHJvdWdoLmpzXCI6MTQsXCJyZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fcmVhZGFibGUuanNcIjoxNSxcInJlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV90cmFuc2Zvcm0uanNcIjoxNixcInJlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV93cml0YWJsZS5qc1wiOjE3LFwicmVhZGFibGUtc3RyZWFtL2xpYi9pbnRlcm5hbC9zdHJlYW1zL2VuZC1vZi1zdHJlYW0uanNcIjoyMSxcInJlYWRhYmxlLXN0cmVhbS9saWIvaW50ZXJuYWwvc3RyZWFtcy9waXBlbGluZS5qc1wiOjIzfV0sMTI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIGNvZGVzID0ge307XG5cbmZ1bmN0aW9uIGNyZWF0ZUVycm9yVHlwZShjb2RlLCBtZXNzYWdlLCBCYXNlKSB7XG4gIGlmICghQmFzZSkge1xuICAgIEJhc2UgPSBFcnJvcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE1lc3NhZ2UoYXJnMSwgYXJnMiwgYXJnMykge1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWVzc2FnZShhcmcxLCBhcmcyLCBhcmczKTtcbiAgICB9XG4gIH1cblxuICB2YXIgTm9kZUVycm9yID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0Jhc2UpIHtcbiAgICBfaW5oZXJpdHNMb29zZShOb2RlRXJyb3IsIF9CYXNlKTtcblxuICAgIGZ1bmN0aW9uIE5vZGVFcnJvcihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICByZXR1cm4gX0Jhc2UuY2FsbCh0aGlzLCBnZXRNZXNzYWdlKGFyZzEsIGFyZzIsIGFyZzMpKSB8fCB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiBOb2RlRXJyb3I7XG4gIH0oQmFzZSk7XG5cbiAgTm9kZUVycm9yLnByb3RvdHlwZS5uYW1lID0gQmFzZS5uYW1lO1xuICBOb2RlRXJyb3IucHJvdG90eXBlLmNvZGUgPSBjb2RlO1xuICBjb2Rlc1tjb2RlXSA9IE5vZGVFcnJvcjtcbn0gLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2Jsb2IvdjEwLjguMC9saWIvaW50ZXJuYWwvZXJyb3JzLmpzXG5cblxuZnVuY3Rpb24gb25lT2YoZXhwZWN0ZWQsIHRoaW5nKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGV4cGVjdGVkKSkge1xuICAgIHZhciBsZW4gPSBleHBlY3RlZC5sZW5ndGg7XG4gICAgZXhwZWN0ZWQgPSBleHBlY3RlZC5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiBTdHJpbmcoaSk7XG4gICAgfSk7XG5cbiAgICBpZiAobGVuID4gMikge1xuICAgICAgcmV0dXJuIFwib25lIG9mIFwiLmNvbmNhdCh0aGluZywgXCIgXCIpLmNvbmNhdChleHBlY3RlZC5zbGljZSgwLCBsZW4gLSAxKS5qb2luKCcsICcpLCBcIiwgb3IgXCIpICsgZXhwZWN0ZWRbbGVuIC0gMV07XG4gICAgfSBlbHNlIGlmIChsZW4gPT09IDIpIHtcbiAgICAgIHJldHVybiBcIm9uZSBvZiBcIi5jb25jYXQodGhpbmcsIFwiIFwiKS5jb25jYXQoZXhwZWN0ZWRbMF0sIFwiIG9yIFwiKS5jb25jYXQoZXhwZWN0ZWRbMV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJvZiBcIi5jb25jYXQodGhpbmcsIFwiIFwiKS5jb25jYXQoZXhwZWN0ZWRbMF0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJvZiBcIi5jb25jYXQodGhpbmcsIFwiIFwiKS5jb25jYXQoU3RyaW5nKGV4cGVjdGVkKSk7XG4gIH1cbn0gLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL3N0YXJ0c1dpdGhcblxuXG5mdW5jdGlvbiBzdGFydHNXaXRoKHN0ciwgc2VhcmNoLCBwb3MpIHtcbiAgcmV0dXJuIHN0ci5zdWJzdHIoIXBvcyB8fCBwb3MgPCAwID8gMCA6ICtwb3MsIHNlYXJjaC5sZW5ndGgpID09PSBzZWFyY2g7XG59IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9lbmRzV2l0aFxuXG5cbmZ1bmN0aW9uIGVuZHNXaXRoKHN0ciwgc2VhcmNoLCB0aGlzX2xlbikge1xuICBpZiAodGhpc19sZW4gPT09IHVuZGVmaW5lZCB8fCB0aGlzX2xlbiA+IHN0ci5sZW5ndGgpIHtcbiAgICB0aGlzX2xlbiA9IHN0ci5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gc3RyLnN1YnN0cmluZyh0aGlzX2xlbiAtIHNlYXJjaC5sZW5ndGgsIHRoaXNfbGVuKSA9PT0gc2VhcmNoO1xufSAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvaW5jbHVkZXNcblxuXG5mdW5jdGlvbiBpbmNsdWRlcyhzdHIsIHNlYXJjaCwgc3RhcnQpIHtcbiAgaWYgKHR5cGVvZiBzdGFydCAhPT0gJ251bWJlcicpIHtcbiAgICBzdGFydCA9IDA7XG4gIH1cblxuICBpZiAoc3RhcnQgKyBzZWFyY2gubGVuZ3RoID4gc3RyLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyLmluZGV4T2Yoc2VhcmNoLCBzdGFydCkgIT09IC0xO1xuICB9XG59XG5cbmNyZWF0ZUVycm9yVHlwZSgnRVJSX0lOVkFMSURfT1BUX1ZBTFVFJywgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiAnVGhlIHZhbHVlIFwiJyArIHZhbHVlICsgJ1wiIGlzIGludmFsaWQgZm9yIG9wdGlvbiBcIicgKyBuYW1lICsgJ1wiJztcbn0sIFR5cGVFcnJvcik7XG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9JTlZBTElEX0FSR19UWVBFJywgZnVuY3Rpb24gKG5hbWUsIGV4cGVjdGVkLCBhY3R1YWwpIHtcbiAgLy8gZGV0ZXJtaW5lcjogJ211c3QgYmUnIG9yICdtdXN0IG5vdCBiZSdcbiAgdmFyIGRldGVybWluZXI7XG5cbiAgaWYgKHR5cGVvZiBleHBlY3RlZCA9PT0gJ3N0cmluZycgJiYgc3RhcnRzV2l0aChleHBlY3RlZCwgJ25vdCAnKSkge1xuICAgIGRldGVybWluZXIgPSAnbXVzdCBub3QgYmUnO1xuICAgIGV4cGVjdGVkID0gZXhwZWN0ZWQucmVwbGFjZSgvXm5vdCAvLCAnJyk7XG4gIH0gZWxzZSB7XG4gICAgZGV0ZXJtaW5lciA9ICdtdXN0IGJlJztcbiAgfVxuXG4gIHZhciBtc2c7XG5cbiAgaWYgKGVuZHNXaXRoKG5hbWUsICcgYXJndW1lbnQnKSkge1xuICAgIC8vIEZvciBjYXNlcyBsaWtlICdmaXJzdCBhcmd1bWVudCdcbiAgICBtc2cgPSBcIlRoZSBcIi5jb25jYXQobmFtZSwgXCIgXCIpLmNvbmNhdChkZXRlcm1pbmVyLCBcIiBcIikuY29uY2F0KG9uZU9mKGV4cGVjdGVkLCAndHlwZScpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdHlwZSA9IGluY2x1ZGVzKG5hbWUsICcuJykgPyAncHJvcGVydHknIDogJ2FyZ3VtZW50JztcbiAgICBtc2cgPSBcIlRoZSBcXFwiXCIuY29uY2F0KG5hbWUsIFwiXFxcIiBcIikuY29uY2F0KHR5cGUsIFwiIFwiKS5jb25jYXQoZGV0ZXJtaW5lciwgXCIgXCIpLmNvbmNhdChvbmVPZihleHBlY3RlZCwgJ3R5cGUnKSk7XG4gIH1cblxuICBtc2cgKz0gXCIuIFJlY2VpdmVkIHR5cGUgXCIuY29uY2F0KHR5cGVvZiBhY3R1YWwpO1xuICByZXR1cm4gbXNnO1xufSwgVHlwZUVycm9yKTtcbmNyZWF0ZUVycm9yVHlwZSgnRVJSX1NUUkVBTV9QVVNIX0FGVEVSX0VPRicsICdzdHJlYW0ucHVzaCgpIGFmdGVyIEVPRicpO1xuY3JlYXRlRXJyb3JUeXBlKCdFUlJfTUVUSE9EX05PVF9JTVBMRU1FTlRFRCcsIGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiAnVGhlICcgKyBuYW1lICsgJyBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkJztcbn0pO1xuY3JlYXRlRXJyb3JUeXBlKCdFUlJfU1RSRUFNX1BSRU1BVFVSRV9DTE9TRScsICdQcmVtYXR1cmUgY2xvc2UnKTtcbmNyZWF0ZUVycm9yVHlwZSgnRVJSX1NUUkVBTV9ERVNUUk9ZRUQnLCBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gJ0Nhbm5vdCBjYWxsICcgKyBuYW1lICsgJyBhZnRlciBhIHN0cmVhbSB3YXMgZGVzdHJveWVkJztcbn0pO1xuY3JlYXRlRXJyb3JUeXBlKCdFUlJfTVVMVElQTEVfQ0FMTEJBQ0snLCAnQ2FsbGJhY2sgY2FsbGVkIG11bHRpcGxlIHRpbWVzJyk7XG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9TVFJFQU1fQ0FOTk9UX1BJUEUnLCAnQ2Fubm90IHBpcGUsIG5vdCByZWFkYWJsZScpO1xuY3JlYXRlRXJyb3JUeXBlKCdFUlJfU1RSRUFNX1dSSVRFX0FGVEVSX0VORCcsICd3cml0ZSBhZnRlciBlbmQnKTtcbmNyZWF0ZUVycm9yVHlwZSgnRVJSX1NUUkVBTV9OVUxMX1ZBTFVFUycsICdNYXkgbm90IHdyaXRlIG51bGwgdmFsdWVzIHRvIHN0cmVhbScsIFR5cGVFcnJvcik7XG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9VTktOT1dOX0VOQ09ESU5HJywgZnVuY3Rpb24gKGFyZykge1xuICByZXR1cm4gJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBhcmc7XG59LCBUeXBlRXJyb3IpO1xuY3JlYXRlRXJyb3JUeXBlKCdFUlJfU1RSRUFNX1VOU0hJRlRfQUZURVJfRU5EX0VWRU5UJywgJ3N0cmVhbS51bnNoaWZ0KCkgYWZ0ZXIgZW5kIGV2ZW50Jyk7XG5tb2R1bGUuZXhwb3J0cy5jb2RlcyA9IGNvZGVzO1xuXG59LHt9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHByb2Nlc3MpeyhmdW5jdGlvbiAoKXtcbi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuLy8gYSBkdXBsZXggc3RyZWFtIGlzIGp1c3QgYSBzdHJlYW0gdGhhdCBpcyBib3RoIHJlYWRhYmxlIGFuZCB3cml0YWJsZS5cbi8vIFNpbmNlIEpTIGRvZXNuJ3QgaGF2ZSBtdWx0aXBsZSBwcm90b3R5cGFsIGluaGVyaXRhbmNlLCB0aGlzIGNsYXNzXG4vLyBwcm90b3R5cGFsbHkgaW5oZXJpdHMgZnJvbSBSZWFkYWJsZSwgYW5kIHRoZW4gcGFyYXNpdGljYWxseSBmcm9tXG4vLyBXcml0YWJsZS5cbid1c2Ugc3RyaWN0Jztcbi8qPHJlcGxhY2VtZW50PiovXG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBrZXlzLnB1c2goa2V5KTtcbiAgfVxuXG4gIHJldHVybiBrZXlzO1xufTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gRHVwbGV4O1xuXG52YXIgUmVhZGFibGUgPSByZXF1aXJlKCcuL19zdHJlYW1fcmVhZGFibGUnKTtcblxudmFyIFdyaXRhYmxlID0gcmVxdWlyZSgnLi9fc3RyZWFtX3dyaXRhYmxlJyk7XG5cbnJlcXVpcmUoJ2luaGVyaXRzJykoRHVwbGV4LCBSZWFkYWJsZSk7XG5cbntcbiAgLy8gQWxsb3cgdGhlIGtleXMgYXJyYXkgdG8gYmUgR0MnZWQuXG4gIHZhciBrZXlzID0gb2JqZWN0S2V5cyhXcml0YWJsZS5wcm90b3R5cGUpO1xuXG4gIGZvciAodmFyIHYgPSAwOyB2IDwga2V5cy5sZW5ndGg7IHYrKykge1xuICAgIHZhciBtZXRob2QgPSBrZXlzW3ZdO1xuICAgIGlmICghRHVwbGV4LnByb3RvdHlwZVttZXRob2RdKSBEdXBsZXgucHJvdG90eXBlW21ldGhvZF0gPSBXcml0YWJsZS5wcm90b3R5cGVbbWV0aG9kXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBEdXBsZXgob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRHVwbGV4KSkgcmV0dXJuIG5ldyBEdXBsZXgob3B0aW9ucyk7XG4gIFJlYWRhYmxlLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gIFdyaXRhYmxlLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gIHRoaXMuYWxsb3dIYWxmT3BlbiA9IHRydWU7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5yZWFkYWJsZSA9PT0gZmFsc2UpIHRoaXMucmVhZGFibGUgPSBmYWxzZTtcbiAgICBpZiAob3B0aW9ucy53cml0YWJsZSA9PT0gZmFsc2UpIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcblxuICAgIGlmIChvcHRpb25zLmFsbG93SGFsZk9wZW4gPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmFsbG93SGFsZk9wZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMub25jZSgnZW5kJywgb25lbmQpO1xuICAgIH1cbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRHVwbGV4LnByb3RvdHlwZSwgJ3dyaXRhYmxlSGlnaFdhdGVyTWFyaycsIHtcbiAgLy8gbWFraW5nIGl0IGV4cGxpY2l0IHRoaXMgcHJvcGVydHkgaXMgbm90IGVudW1lcmFibGVcbiAgLy8gYmVjYXVzZSBvdGhlcndpc2Ugc29tZSBwcm90b3R5cGUgbWFuaXB1bGF0aW9uIGluXG4gIC8vIHVzZXJsYW5kIHdpbGwgZmFpbFxuICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dyaXRhYmxlU3RhdGUuaGlnaFdhdGVyTWFyaztcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRHVwbGV4LnByb3RvdHlwZSwgJ3dyaXRhYmxlQnVmZmVyJywge1xuICAvLyBtYWtpbmcgaXQgZXhwbGljaXQgdGhpcyBwcm9wZXJ0eSBpcyBub3QgZW51bWVyYWJsZVxuICAvLyBiZWNhdXNlIG90aGVyd2lzZSBzb21lIHByb3RvdHlwZSBtYW5pcHVsYXRpb24gaW5cbiAgLy8gdXNlcmxhbmQgd2lsbCBmYWlsXG4gIGVudW1lcmFibGU6IGZhbHNlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fd3JpdGFibGVTdGF0ZSAmJiB0aGlzLl93cml0YWJsZVN0YXRlLmdldEJ1ZmZlcigpO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShEdXBsZXgucHJvdG90eXBlLCAnd3JpdGFibGVMZW5ndGgnLCB7XG4gIC8vIG1ha2luZyBpdCBleHBsaWNpdCB0aGlzIHByb3BlcnR5IGlzIG5vdCBlbnVtZXJhYmxlXG4gIC8vIGJlY2F1c2Ugb3RoZXJ3aXNlIHNvbWUgcHJvdG90eXBlIG1hbmlwdWxhdGlvbiBpblxuICAvLyB1c2VybGFuZCB3aWxsIGZhaWxcbiAgZW51bWVyYWJsZTogZmFsc2UsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLl93cml0YWJsZVN0YXRlLmxlbmd0aDtcbiAgfVxufSk7IC8vIHRoZSBuby1oYWxmLW9wZW4gZW5mb3JjZXJcblxuZnVuY3Rpb24gb25lbmQoKSB7XG4gIC8vIElmIHRoZSB3cml0YWJsZSBzaWRlIGVuZGVkLCB0aGVuIHdlJ3JlIG9rLlxuICBpZiAodGhpcy5fd3JpdGFibGVTdGF0ZS5lbmRlZCkgcmV0dXJuOyAvLyBubyBtb3JlIGRhdGEgY2FuIGJlIHdyaXR0ZW4uXG4gIC8vIEJ1dCBhbGxvdyBtb3JlIHdyaXRlcyB0byBoYXBwZW4gaW4gdGhpcyB0aWNrLlxuXG4gIHByb2Nlc3MubmV4dFRpY2sob25FbmROVCwgdGhpcyk7XG59XG5cbmZ1bmN0aW9uIG9uRW5kTlQoc2VsZikge1xuICBzZWxmLmVuZCgpO1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRHVwbGV4LnByb3RvdHlwZSwgJ2Rlc3Ryb3llZCcsIHtcbiAgLy8gbWFraW5nIGl0IGV4cGxpY2l0IHRoaXMgcHJvcGVydHkgaXMgbm90IGVudW1lcmFibGVcbiAgLy8gYmVjYXVzZSBvdGhlcndpc2Ugc29tZSBwcm90b3R5cGUgbWFuaXB1bGF0aW9uIGluXG4gIC8vIHVzZXJsYW5kIHdpbGwgZmFpbFxuICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgaWYgKHRoaXMuX3JlYWRhYmxlU3RhdGUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLl93cml0YWJsZVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQgJiYgdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQ7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgLy8gd2UgaWdub3JlIHRoZSB2YWx1ZSBpZiB0aGUgc3RyZWFtXG4gICAgLy8gaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkIHlldFxuICAgIGlmICh0aGlzLl9yZWFkYWJsZVN0YXRlID09PSB1bmRlZmluZWQgfHwgdGhpcy5fd3JpdGFibGVTdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aGUgdXNlciBpcyBleHBsaWNpdGx5XG4gICAgLy8gbWFuYWdpbmcgZGVzdHJveWVkXG5cblxuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkID0gdmFsdWU7XG4gICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQgPSB2YWx1ZTtcbiAgfVxufSk7XG59KS5jYWxsKHRoaXMpfSkuY2FsbCh0aGlzLHJlcXVpcmUoJ19wcm9jZXNzJykpXG59LHtcIi4vX3N0cmVhbV9yZWFkYWJsZVwiOjE1LFwiLi9fc3RyZWFtX3dyaXRhYmxlXCI6MTcsXCJfcHJvY2Vzc1wiOjksXCJpbmhlcml0c1wiOjh9XSwxNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbi8vIGEgcGFzc3Rocm91Z2ggc3RyZWFtLlxuLy8gYmFzaWNhbGx5IGp1c3QgdGhlIG1vc3QgbWluaW1hbCBzb3J0IG9mIFRyYW5zZm9ybSBzdHJlYW0uXG4vLyBFdmVyeSB3cml0dGVuIGNodW5rIGdldHMgb3V0cHV0IGFzLWlzLlxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhc3NUaHJvdWdoO1xuXG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9fc3RyZWFtX3RyYW5zZm9ybScpO1xuXG5yZXF1aXJlKCdpbmhlcml0cycpKFBhc3NUaHJvdWdoLCBUcmFuc2Zvcm0pO1xuXG5mdW5jdGlvbiBQYXNzVGhyb3VnaChvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQYXNzVGhyb3VnaCkpIHJldHVybiBuZXcgUGFzc1Rocm91Z2gob3B0aW9ucyk7XG4gIFRyYW5zZm9ybS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xufVxuXG5QYXNzVGhyb3VnaC5wcm90b3R5cGUuX3RyYW5zZm9ybSA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIGNiKG51bGwsIGNodW5rKTtcbn07XG59LHtcIi4vX3N0cmVhbV90cmFuc2Zvcm1cIjoxNixcImluaGVyaXRzXCI6OH1dLDE1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwpeyhmdW5jdGlvbiAoKXtcbi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWRhYmxlO1xuLyo8cmVwbGFjZW1lbnQ+Ki9cblxudmFyIER1cGxleDtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5SZWFkYWJsZS5SZWFkYWJsZVN0YXRlID0gUmVhZGFibGVTdGF0ZTtcbi8qPHJlcGxhY2VtZW50PiovXG5cbnZhciBFRSA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxudmFyIEVFbGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIEVFbGlzdGVuZXJDb3VudChlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVycyh0eXBlKS5sZW5ndGg7XG59O1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG5cblxudmFyIFN0cmVhbSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvc3RyZWFtcy9zdHJlYW0nKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXI7XG5cbnZhciBPdXJVaW50OEFycmF5ID0gZ2xvYmFsLlVpbnQ4QXJyYXkgfHwgZnVuY3Rpb24gKCkge307XG5cbmZ1bmN0aW9uIF91aW50OEFycmF5VG9CdWZmZXIoY2h1bmspIHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGNodW5rKTtcbn1cblxuZnVuY3Rpb24gX2lzVWludDhBcnJheShvYmopIHtcbiAgcmV0dXJuIEJ1ZmZlci5pc0J1ZmZlcihvYmopIHx8IG9iaiBpbnN0YW5jZW9mIE91clVpbnQ4QXJyYXk7XG59XG4vKjxyZXBsYWNlbWVudD4qL1xuXG5cbnZhciBkZWJ1Z1V0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbnZhciBkZWJ1ZztcblxuaWYgKGRlYnVnVXRpbCAmJiBkZWJ1Z1V0aWwuZGVidWdsb2cpIHtcbiAgZGVidWcgPSBkZWJ1Z1V0aWwuZGVidWdsb2coJ3N0cmVhbScpO1xufSBlbHNlIHtcbiAgZGVidWcgPSBmdW5jdGlvbiBkZWJ1ZygpIHt9O1xufVxuLyo8L3JlcGxhY2VtZW50PiovXG5cblxudmFyIEJ1ZmZlckxpc3QgPSByZXF1aXJlKCcuL2ludGVybmFsL3N0cmVhbXMvYnVmZmVyX2xpc3QnKTtcblxudmFyIGRlc3Ryb3lJbXBsID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9zdHJlYW1zL2Rlc3Ryb3knKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9zdHJlYW1zL3N0YXRlJyksXG4gICAgZ2V0SGlnaFdhdGVyTWFyayA9IF9yZXF1aXJlLmdldEhpZ2hXYXRlck1hcms7XG5cbnZhciBfcmVxdWlyZSRjb2RlcyA9IHJlcXVpcmUoJy4uL2Vycm9ycycpLmNvZGVzLFxuICAgIEVSUl9JTlZBTElEX0FSR19UWVBFID0gX3JlcXVpcmUkY29kZXMuRVJSX0lOVkFMSURfQVJHX1RZUEUsXG4gICAgRVJSX1NUUkVBTV9QVVNIX0FGVEVSX0VPRiA9IF9yZXF1aXJlJGNvZGVzLkVSUl9TVFJFQU1fUFVTSF9BRlRFUl9FT0YsXG4gICAgRVJSX01FVEhPRF9OT1RfSU1QTEVNRU5URUQgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfTUVUSE9EX05PVF9JTVBMRU1FTlRFRCxcbiAgICBFUlJfU1RSRUFNX1VOU0hJRlRfQUZURVJfRU5EX0VWRU5UID0gX3JlcXVpcmUkY29kZXMuRVJSX1NUUkVBTV9VTlNISUZUX0FGVEVSX0VORF9FVkVOVDsgLy8gTGF6eSBsb2FkZWQgdG8gaW1wcm92ZSB0aGUgc3RhcnR1cCBwZXJmb3JtYW5jZS5cblxuXG52YXIgU3RyaW5nRGVjb2RlcjtcbnZhciBjcmVhdGVSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3I7XG52YXIgZnJvbTtcblxucmVxdWlyZSgnaW5oZXJpdHMnKShSZWFkYWJsZSwgU3RyZWFtKTtcblxudmFyIGVycm9yT3JEZXN0cm95ID0gZGVzdHJveUltcGwuZXJyb3JPckRlc3Ryb3k7XG52YXIga1Byb3h5RXZlbnRzID0gWydlcnJvcicsICdjbG9zZScsICdkZXN0cm95JywgJ3BhdXNlJywgJ3Jlc3VtZSddO1xuXG5mdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIoZW1pdHRlciwgZXZlbnQsIGZuKSB7XG4gIC8vIFNhZGx5IHRoaXMgaXMgbm90IGNhY2hlYWJsZSBhcyBzb21lIGxpYnJhcmllcyBidW5kbGUgdGhlaXIgb3duXG4gIC8vIGV2ZW50IGVtaXR0ZXIgaW1wbGVtZW50YXRpb24gd2l0aCB0aGVtLlxuICBpZiAodHlwZW9mIGVtaXR0ZXIucHJlcGVuZExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSByZXR1cm4gZW1pdHRlci5wcmVwZW5kTGlzdGVuZXIoZXZlbnQsIGZuKTsgLy8gVGhpcyBpcyBhIGhhY2sgdG8gbWFrZSBzdXJlIHRoYXQgb3VyIGVycm9yIGhhbmRsZXIgaXMgYXR0YWNoZWQgYmVmb3JlIGFueVxuICAvLyB1c2VybGFuZCBvbmVzLiAgTkVWRVIgRE8gVEhJUy4gVGhpcyBpcyBoZXJlIG9ubHkgYmVjYXVzZSB0aGlzIGNvZGUgbmVlZHNcbiAgLy8gdG8gY29udGludWUgdG8gd29yayB3aXRoIG9sZGVyIHZlcnNpb25zIG9mIE5vZGUuanMgdGhhdCBkbyBub3QgaW5jbHVkZVxuICAvLyB0aGUgcHJlcGVuZExpc3RlbmVyKCkgbWV0aG9kLiBUaGUgZ29hbCBpcyB0byBldmVudHVhbGx5IHJlbW92ZSB0aGlzIGhhY2suXG5cbiAgaWYgKCFlbWl0dGVyLl9ldmVudHMgfHwgIWVtaXR0ZXIuX2V2ZW50c1tldmVudF0pIGVtaXR0ZXIub24oZXZlbnQsIGZuKTtlbHNlIGlmIChBcnJheS5pc0FycmF5KGVtaXR0ZXIuX2V2ZW50c1tldmVudF0pKSBlbWl0dGVyLl9ldmVudHNbZXZlbnRdLnVuc2hpZnQoZm4pO2Vsc2UgZW1pdHRlci5fZXZlbnRzW2V2ZW50XSA9IFtmbiwgZW1pdHRlci5fZXZlbnRzW2V2ZW50XV07XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlU3RhdGUob3B0aW9ucywgc3RyZWFtLCBpc0R1cGxleCkge1xuICBEdXBsZXggPSBEdXBsZXggfHwgcmVxdWlyZSgnLi9fc3RyZWFtX2R1cGxleCcpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTsgLy8gRHVwbGV4IHN0cmVhbXMgYXJlIGJvdGggcmVhZGFibGUgYW5kIHdyaXRhYmxlLCBidXQgc2hhcmVcbiAgLy8gdGhlIHNhbWUgb3B0aW9ucyBvYmplY3QuXG4gIC8vIEhvd2V2ZXIsIHNvbWUgY2FzZXMgcmVxdWlyZSBzZXR0aW5nIG9wdGlvbnMgdG8gZGlmZmVyZW50XG4gIC8vIHZhbHVlcyBmb3IgdGhlIHJlYWRhYmxlIGFuZCB0aGUgd3JpdGFibGUgc2lkZXMgb2YgdGhlIGR1cGxleCBzdHJlYW0uXG4gIC8vIFRoZXNlIG9wdGlvbnMgY2FuIGJlIHByb3ZpZGVkIHNlcGFyYXRlbHkgYXMgcmVhZGFibGVYWFggYW5kIHdyaXRhYmxlWFhYLlxuXG4gIGlmICh0eXBlb2YgaXNEdXBsZXggIT09ICdib29sZWFuJykgaXNEdXBsZXggPSBzdHJlYW0gaW5zdGFuY2VvZiBEdXBsZXg7IC8vIG9iamVjdCBzdHJlYW0gZmxhZy4gVXNlZCB0byBtYWtlIHJlYWQobikgaWdub3JlIG4gYW5kIHRvXG4gIC8vIG1ha2UgYWxsIHRoZSBidWZmZXIgbWVyZ2luZyBhbmQgbGVuZ3RoIGNoZWNrcyBnbyBhd2F5XG5cbiAgdGhpcy5vYmplY3RNb2RlID0gISFvcHRpb25zLm9iamVjdE1vZGU7XG4gIGlmIChpc0R1cGxleCkgdGhpcy5vYmplY3RNb2RlID0gdGhpcy5vYmplY3RNb2RlIHx8ICEhb3B0aW9ucy5yZWFkYWJsZU9iamVjdE1vZGU7IC8vIHRoZSBwb2ludCBhdCB3aGljaCBpdCBzdG9wcyBjYWxsaW5nIF9yZWFkKCkgdG8gZmlsbCB0aGUgYnVmZmVyXG4gIC8vIE5vdGU6IDAgaXMgYSB2YWxpZCB2YWx1ZSwgbWVhbnMgXCJkb24ndCBjYWxsIF9yZWFkIHByZWVtcHRpdmVseSBldmVyXCJcblxuICB0aGlzLmhpZ2hXYXRlck1hcmsgPSBnZXRIaWdoV2F0ZXJNYXJrKHRoaXMsIG9wdGlvbnMsICdyZWFkYWJsZUhpZ2hXYXRlck1hcmsnLCBpc0R1cGxleCk7IC8vIEEgbGlua2VkIGxpc3QgaXMgdXNlZCB0byBzdG9yZSBkYXRhIGNodW5rcyBpbnN0ZWFkIG9mIGFuIGFycmF5IGJlY2F1c2UgdGhlXG4gIC8vIGxpbmtlZCBsaXN0IGNhbiByZW1vdmUgZWxlbWVudHMgZnJvbSB0aGUgYmVnaW5uaW5nIGZhc3RlciB0aGFuXG4gIC8vIGFycmF5LnNoaWZ0KClcblxuICB0aGlzLmJ1ZmZlciA9IG5ldyBCdWZmZXJMaXN0KCk7XG4gIHRoaXMubGVuZ3RoID0gMDtcbiAgdGhpcy5waXBlcyA9IG51bGw7XG4gIHRoaXMucGlwZXNDb3VudCA9IDA7XG4gIHRoaXMuZmxvd2luZyA9IG51bGw7XG4gIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgdGhpcy5lbmRFbWl0dGVkID0gZmFsc2U7XG4gIHRoaXMucmVhZGluZyA9IGZhbHNlOyAvLyBhIGZsYWcgdG8gYmUgYWJsZSB0byB0ZWxsIGlmIHRoZSBldmVudCAncmVhZGFibGUnLydkYXRhJyBpcyBlbWl0dGVkXG4gIC8vIGltbWVkaWF0ZWx5LCBvciBvbiBhIGxhdGVyIHRpY2suICBXZSBzZXQgdGhpcyB0byB0cnVlIGF0IGZpcnN0LCBiZWNhdXNlXG4gIC8vIGFueSBhY3Rpb25zIHRoYXQgc2hvdWxkbid0IGhhcHBlbiB1bnRpbCBcImxhdGVyXCIgc2hvdWxkIGdlbmVyYWxseSBhbHNvXG4gIC8vIG5vdCBoYXBwZW4gYmVmb3JlIHRoZSBmaXJzdCByZWFkIGNhbGwuXG5cbiAgdGhpcy5zeW5jID0gdHJ1ZTsgLy8gd2hlbmV2ZXIgd2UgcmV0dXJuIG51bGwsIHRoZW4gd2Ugc2V0IGEgZmxhZyB0byBzYXlcbiAgLy8gdGhhdCB3ZSdyZSBhd2FpdGluZyBhICdyZWFkYWJsZScgZXZlbnQgZW1pc3Npb24uXG5cbiAgdGhpcy5uZWVkUmVhZGFibGUgPSBmYWxzZTtcbiAgdGhpcy5lbWl0dGVkUmVhZGFibGUgPSBmYWxzZTtcbiAgdGhpcy5yZWFkYWJsZUxpc3RlbmluZyA9IGZhbHNlO1xuICB0aGlzLnJlc3VtZVNjaGVkdWxlZCA9IGZhbHNlO1xuICB0aGlzLnBhdXNlZCA9IHRydWU7IC8vIFNob3VsZCBjbG9zZSBiZSBlbWl0dGVkIG9uIGRlc3Ryb3kuIERlZmF1bHRzIHRvIHRydWUuXG5cbiAgdGhpcy5lbWl0Q2xvc2UgPSBvcHRpb25zLmVtaXRDbG9zZSAhPT0gZmFsc2U7IC8vIFNob3VsZCAuZGVzdHJveSgpIGJlIGNhbGxlZCBhZnRlciAnZW5kJyAoYW5kIHBvdGVudGlhbGx5ICdmaW5pc2gnKVxuXG4gIHRoaXMuYXV0b0Rlc3Ryb3kgPSAhIW9wdGlvbnMuYXV0b0Rlc3Ryb3k7IC8vIGhhcyBpdCBiZWVuIGRlc3Ryb3llZFxuXG4gIHRoaXMuZGVzdHJveWVkID0gZmFsc2U7IC8vIENyeXB0byBpcyBraW5kIG9mIG9sZCBhbmQgY3J1c3R5LiAgSGlzdG9yaWNhbGx5LCBpdHMgZGVmYXVsdCBzdHJpbmdcbiAgLy8gZW5jb2RpbmcgaXMgJ2JpbmFyeScgc28gd2UgaGF2ZSB0byBtYWtlIHRoaXMgY29uZmlndXJhYmxlLlxuICAvLyBFdmVyeXRoaW5nIGVsc2UgaW4gdGhlIHVuaXZlcnNlIHVzZXMgJ3V0ZjgnLCB0aG91Z2guXG5cbiAgdGhpcy5kZWZhdWx0RW5jb2RpbmcgPSBvcHRpb25zLmRlZmF1bHRFbmNvZGluZyB8fCAndXRmOCc7IC8vIHRoZSBudW1iZXIgb2Ygd3JpdGVycyB0aGF0IGFyZSBhd2FpdGluZyBhIGRyYWluIGV2ZW50IGluIC5waXBlKClzXG5cbiAgdGhpcy5hd2FpdERyYWluID0gMDsgLy8gaWYgdHJ1ZSwgYSBtYXliZVJlYWRNb3JlIGhhcyBiZWVuIHNjaGVkdWxlZFxuXG4gIHRoaXMucmVhZGluZ01vcmUgPSBmYWxzZTtcbiAgdGhpcy5kZWNvZGVyID0gbnVsbDtcbiAgdGhpcy5lbmNvZGluZyA9IG51bGw7XG5cbiAgaWYgKG9wdGlvbnMuZW5jb2RpbmcpIHtcbiAgICBpZiAoIVN0cmluZ0RlY29kZXIpIFN0cmluZ0RlY29kZXIgPSByZXF1aXJlKCdzdHJpbmdfZGVjb2Rlci8nKS5TdHJpbmdEZWNvZGVyO1xuICAgIHRoaXMuZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKG9wdGlvbnMuZW5jb2RpbmcpO1xuICAgIHRoaXMuZW5jb2RpbmcgPSBvcHRpb25zLmVuY29kaW5nO1xuICB9XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlKG9wdGlvbnMpIHtcbiAgRHVwbGV4ID0gRHVwbGV4IHx8IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlYWRhYmxlKSkgcmV0dXJuIG5ldyBSZWFkYWJsZShvcHRpb25zKTsgLy8gQ2hlY2tpbmcgZm9yIGEgU3RyZWFtLkR1cGxleCBpbnN0YW5jZSBpcyBmYXN0ZXIgaGVyZSBpbnN0ZWFkIG9mIGluc2lkZVxuICAvLyB0aGUgUmVhZGFibGVTdGF0ZSBjb25zdHJ1Y3RvciwgYXQgbGVhc3Qgd2l0aCBWOCA2LjVcblxuICB2YXIgaXNEdXBsZXggPSB0aGlzIGluc3RhbmNlb2YgRHVwbGV4O1xuICB0aGlzLl9yZWFkYWJsZVN0YXRlID0gbmV3IFJlYWRhYmxlU3RhdGUob3B0aW9ucywgdGhpcywgaXNEdXBsZXgpOyAvLyBsZWdhY3lcblxuICB0aGlzLnJlYWRhYmxlID0gdHJ1ZTtcblxuICBpZiAob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5yZWFkID09PSAnZnVuY3Rpb24nKSB0aGlzLl9yZWFkID0gb3B0aW9ucy5yZWFkO1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSB0aGlzLl9kZXN0cm95ID0gb3B0aW9ucy5kZXN0cm95O1xuICB9XG5cbiAgU3RyZWFtLmNhbGwodGhpcyk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFkYWJsZS5wcm90b3R5cGUsICdkZXN0cm95ZWQnLCB7XG4gIC8vIG1ha2luZyBpdCBleHBsaWNpdCB0aGlzIHByb3BlcnR5IGlzIG5vdCBlbnVtZXJhYmxlXG4gIC8vIGJlY2F1c2Ugb3RoZXJ3aXNlIHNvbWUgcHJvdG90eXBlIG1hbmlwdWxhdGlvbiBpblxuICAvLyB1c2VybGFuZCB3aWxsIGZhaWxcbiAgZW51bWVyYWJsZTogZmFsc2UsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIGlmICh0aGlzLl9yZWFkYWJsZVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQ7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgLy8gd2UgaWdub3JlIHRoZSB2YWx1ZSBpZiB0aGUgc3RyZWFtXG4gICAgLy8gaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkIHlldFxuICAgIGlmICghdGhpcy5fcmVhZGFibGVTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgdGhlIHVzZXIgaXMgZXhwbGljaXRseVxuICAgIC8vIG1hbmFnaW5nIGRlc3Ryb3llZFxuXG5cbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZCA9IHZhbHVlO1xuICB9XG59KTtcblJlYWRhYmxlLnByb3RvdHlwZS5kZXN0cm95ID0gZGVzdHJveUltcGwuZGVzdHJveTtcblJlYWRhYmxlLnByb3RvdHlwZS5fdW5kZXN0cm95ID0gZGVzdHJveUltcGwudW5kZXN0cm95O1xuXG5SZWFkYWJsZS5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAoZXJyLCBjYikge1xuICBjYihlcnIpO1xufTsgLy8gTWFudWFsbHkgc2hvdmUgc29tZXRoaW5nIGludG8gdGhlIHJlYWQoKSBidWZmZXIuXG4vLyBUaGlzIHJldHVybnMgdHJ1ZSBpZiB0aGUgaGlnaFdhdGVyTWFyayBoYXMgbm90IGJlZW4gaGl0IHlldCxcbi8vIHNpbWlsYXIgdG8gaG93IFdyaXRhYmxlLndyaXRlKCkgcmV0dXJucyB0cnVlIGlmIHlvdSBzaG91bGRcbi8vIHdyaXRlKCkgc29tZSBtb3JlLlxuXG5cblJlYWRhYmxlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZykge1xuICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICB2YXIgc2tpcENodW5rQ2hlY2s7XG5cbiAgaWYgKCFzdGF0ZS5vYmplY3RNb2RlKSB7XG4gICAgaWYgKHR5cGVvZiBjaHVuayA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5jb2RpbmcgfHwgc3RhdGUuZGVmYXVsdEVuY29kaW5nO1xuXG4gICAgICBpZiAoZW5jb2RpbmcgIT09IHN0YXRlLmVuY29kaW5nKSB7XG4gICAgICAgIGNodW5rID0gQnVmZmVyLmZyb20oY2h1bmssIGVuY29kaW5nKTtcbiAgICAgICAgZW5jb2RpbmcgPSAnJztcbiAgICAgIH1cblxuICAgICAgc2tpcENodW5rQ2hlY2sgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBza2lwQ2h1bmtDaGVjayA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gcmVhZGFibGVBZGRDaHVuayh0aGlzLCBjaHVuaywgZW5jb2RpbmcsIGZhbHNlLCBza2lwQ2h1bmtDaGVjayk7XG59OyAvLyBVbnNoaWZ0IHNob3VsZCAqYWx3YXlzKiBiZSBzb21ldGhpbmcgZGlyZWN0bHkgb3V0IG9mIHJlYWQoKVxuXG5cblJlYWRhYmxlLnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24gKGNodW5rKSB7XG4gIHJldHVybiByZWFkYWJsZUFkZENodW5rKHRoaXMsIGNodW5rLCBudWxsLCB0cnVlLCBmYWxzZSk7XG59O1xuXG5mdW5jdGlvbiByZWFkYWJsZUFkZENodW5rKHN0cmVhbSwgY2h1bmssIGVuY29kaW5nLCBhZGRUb0Zyb250LCBza2lwQ2h1bmtDaGVjaykge1xuICBkZWJ1ZygncmVhZGFibGVBZGRDaHVuaycsIGNodW5rKTtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuXG4gIGlmIChjaHVuayA9PT0gbnVsbCkge1xuICAgIHN0YXRlLnJlYWRpbmcgPSBmYWxzZTtcbiAgICBvbkVvZkNodW5rKHN0cmVhbSwgc3RhdGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciBlcjtcbiAgICBpZiAoIXNraXBDaHVua0NoZWNrKSBlciA9IGNodW5rSW52YWxpZChzdGF0ZSwgY2h1bmspO1xuXG4gICAgaWYgKGVyKSB7XG4gICAgICBlcnJvck9yRGVzdHJveShzdHJlYW0sIGVyKTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLm9iamVjdE1vZGUgfHwgY2h1bmsgJiYgY2h1bmsubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHR5cGVvZiBjaHVuayAhPT0gJ3N0cmluZycgJiYgIXN0YXRlLm9iamVjdE1vZGUgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGNodW5rKSAhPT0gQnVmZmVyLnByb3RvdHlwZSkge1xuICAgICAgICBjaHVuayA9IF91aW50OEFycmF5VG9CdWZmZXIoY2h1bmspO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWRkVG9Gcm9udCkge1xuICAgICAgICBpZiAoc3RhdGUuZW5kRW1pdHRlZCkgZXJyb3JPckRlc3Ryb3koc3RyZWFtLCBuZXcgRVJSX1NUUkVBTV9VTlNISUZUX0FGVEVSX0VORF9FVkVOVCgpKTtlbHNlIGFkZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUuZW5kZWQpIHtcbiAgICAgICAgZXJyb3JPckRlc3Ryb3koc3RyZWFtLCBuZXcgRVJSX1NUUkVBTV9QVVNIX0FGVEVSX0VPRigpKTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUuZGVzdHJveWVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnJlYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAoc3RhdGUuZGVjb2RlciAmJiAhZW5jb2RpbmcpIHtcbiAgICAgICAgICBjaHVuayA9IHN0YXRlLmRlY29kZXIud3JpdGUoY2h1bmspO1xuICAgICAgICAgIGlmIChzdGF0ZS5vYmplY3RNb2RlIHx8IGNodW5rLmxlbmd0aCAhPT0gMCkgYWRkQ2h1bmsoc3RyZWFtLCBzdGF0ZSwgY2h1bmssIGZhbHNlKTtlbHNlIG1heWJlUmVhZE1vcmUoc3RyZWFtLCBzdGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWRkQ2h1bmsoc3RyZWFtLCBzdGF0ZSwgY2h1bmssIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWFkZFRvRnJvbnQpIHtcbiAgICAgIHN0YXRlLnJlYWRpbmcgPSBmYWxzZTtcbiAgICAgIG1heWJlUmVhZE1vcmUoc3RyZWFtLCBzdGF0ZSk7XG4gICAgfVxuICB9IC8vIFdlIGNhbiBwdXNoIG1vcmUgZGF0YSBpZiB3ZSBhcmUgYmVsb3cgdGhlIGhpZ2hXYXRlck1hcmsuXG4gIC8vIEFsc28sIGlmIHdlIGhhdmUgbm8gZGF0YSB5ZXQsIHdlIGNhbiBzdGFuZCBzb21lIG1vcmUgYnl0ZXMuXG4gIC8vIFRoaXMgaXMgdG8gd29yayBhcm91bmQgY2FzZXMgd2hlcmUgaHdtPTAsIHN1Y2ggYXMgdGhlIHJlcGwuXG5cblxuICByZXR1cm4gIXN0YXRlLmVuZGVkICYmIChzdGF0ZS5sZW5ndGggPCBzdGF0ZS5oaWdoV2F0ZXJNYXJrIHx8IHN0YXRlLmxlbmd0aCA9PT0gMCk7XG59XG5cbmZ1bmN0aW9uIGFkZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCBhZGRUb0Zyb250KSB7XG4gIGlmIChzdGF0ZS5mbG93aW5nICYmIHN0YXRlLmxlbmd0aCA9PT0gMCAmJiAhc3RhdGUuc3luYykge1xuICAgIHN0YXRlLmF3YWl0RHJhaW4gPSAwO1xuICAgIHN0cmVhbS5lbWl0KCdkYXRhJywgY2h1bmspO1xuICB9IGVsc2Uge1xuICAgIC8vIHVwZGF0ZSB0aGUgYnVmZmVyIGluZm8uXG4gICAgc3RhdGUubGVuZ3RoICs9IHN0YXRlLm9iamVjdE1vZGUgPyAxIDogY2h1bmsubGVuZ3RoO1xuICAgIGlmIChhZGRUb0Zyb250KSBzdGF0ZS5idWZmZXIudW5zaGlmdChjaHVuayk7ZWxzZSBzdGF0ZS5idWZmZXIucHVzaChjaHVuayk7XG4gICAgaWYgKHN0YXRlLm5lZWRSZWFkYWJsZSkgZW1pdFJlYWRhYmxlKHN0cmVhbSk7XG4gIH1cblxuICBtYXliZVJlYWRNb3JlKHN0cmVhbSwgc3RhdGUpO1xufVxuXG5mdW5jdGlvbiBjaHVua0ludmFsaWQoc3RhdGUsIGNodW5rKSB7XG4gIHZhciBlcjtcblxuICBpZiAoIV9pc1VpbnQ4QXJyYXkoY2h1bmspICYmIHR5cGVvZiBjaHVuayAhPT0gJ3N0cmluZycgJiYgY2h1bmsgIT09IHVuZGVmaW5lZCAmJiAhc3RhdGUub2JqZWN0TW9kZSkge1xuICAgIGVyID0gbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdjaHVuaycsIFsnc3RyaW5nJywgJ0J1ZmZlcicsICdVaW50OEFycmF5J10sIGNodW5rKTtcbiAgfVxuXG4gIHJldHVybiBlcjtcbn1cblxuUmVhZGFibGUucHJvdG90eXBlLmlzUGF1c2VkID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fcmVhZGFibGVTdGF0ZS5mbG93aW5nID09PSBmYWxzZTtcbn07IC8vIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuXG5cblJlYWRhYmxlLnByb3RvdHlwZS5zZXRFbmNvZGluZyA9IGZ1bmN0aW9uIChlbmMpIHtcbiAgaWYgKCFTdHJpbmdEZWNvZGVyKSBTdHJpbmdEZWNvZGVyID0gcmVxdWlyZSgnc3RyaW5nX2RlY29kZXIvJykuU3RyaW5nRGVjb2RlcjtcbiAgdmFyIGRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcihlbmMpO1xuICB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlY29kZXIgPSBkZWNvZGVyOyAvLyBJZiBzZXRFbmNvZGluZyhudWxsKSwgZGVjb2Rlci5lbmNvZGluZyBlcXVhbHMgdXRmOFxuXG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUuZW5jb2RpbmcgPSB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlY29kZXIuZW5jb2Rpbmc7IC8vIEl0ZXJhdGUgb3ZlciBjdXJyZW50IGJ1ZmZlciB0byBjb252ZXJ0IGFscmVhZHkgc3RvcmVkIEJ1ZmZlcnM6XG5cbiAgdmFyIHAgPSB0aGlzLl9yZWFkYWJsZVN0YXRlLmJ1ZmZlci5oZWFkO1xuICB2YXIgY29udGVudCA9ICcnO1xuXG4gIHdoaWxlIChwICE9PSBudWxsKSB7XG4gICAgY29udGVudCArPSBkZWNvZGVyLndyaXRlKHAuZGF0YSk7XG4gICAgcCA9IHAubmV4dDtcbiAgfVxuXG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUuYnVmZmVyLmNsZWFyKCk7XG5cbiAgaWYgKGNvbnRlbnQgIT09ICcnKSB0aGlzLl9yZWFkYWJsZVN0YXRlLmJ1ZmZlci5wdXNoKGNvbnRlbnQpO1xuICB0aGlzLl9yZWFkYWJsZVN0YXRlLmxlbmd0aCA9IGNvbnRlbnQubGVuZ3RoO1xuICByZXR1cm4gdGhpcztcbn07IC8vIERvbid0IHJhaXNlIHRoZSBod20gPiAxR0JcblxuXG52YXIgTUFYX0hXTSA9IDB4NDAwMDAwMDA7XG5cbmZ1bmN0aW9uIGNvbXB1dGVOZXdIaWdoV2F0ZXJNYXJrKG4pIHtcbiAgaWYgKG4gPj0gTUFYX0hXTSkge1xuICAgIC8vIFRPRE8ocm9uYWcpOiBUaHJvdyBFUlJfVkFMVUVfT1VUX09GX1JBTkdFLlxuICAgIG4gPSBNQVhfSFdNO1xuICB9IGVsc2Uge1xuICAgIC8vIEdldCB0aGUgbmV4dCBoaWdoZXN0IHBvd2VyIG9mIDIgdG8gcHJldmVudCBpbmNyZWFzaW5nIGh3bSBleGNlc3NpdmVseSBpblxuICAgIC8vIHRpbnkgYW1vdW50c1xuICAgIG4tLTtcbiAgICBuIHw9IG4gPj4+IDE7XG4gICAgbiB8PSBuID4+PiAyO1xuICAgIG4gfD0gbiA+Pj4gNDtcbiAgICBuIHw9IG4gPj4+IDg7XG4gICAgbiB8PSBuID4+PiAxNjtcbiAgICBuKys7XG4gIH1cblxuICByZXR1cm4gbjtcbn0gLy8gVGhpcyBmdW5jdGlvbiBpcyBkZXNpZ25lZCB0byBiZSBpbmxpbmFibGUsIHNvIHBsZWFzZSB0YWtlIGNhcmUgd2hlbiBtYWtpbmdcbi8vIGNoYW5nZXMgdG8gdGhlIGZ1bmN0aW9uIGJvZHkuXG5cblxuZnVuY3Rpb24gaG93TXVjaFRvUmVhZChuLCBzdGF0ZSkge1xuICBpZiAobiA8PSAwIHx8IHN0YXRlLmxlbmd0aCA9PT0gMCAmJiBzdGF0ZS5lbmRlZCkgcmV0dXJuIDA7XG4gIGlmIChzdGF0ZS5vYmplY3RNb2RlKSByZXR1cm4gMTtcblxuICBpZiAobiAhPT0gbikge1xuICAgIC8vIE9ubHkgZmxvdyBvbmUgYnVmZmVyIGF0IGEgdGltZVxuICAgIGlmIChzdGF0ZS5mbG93aW5nICYmIHN0YXRlLmxlbmd0aCkgcmV0dXJuIHN0YXRlLmJ1ZmZlci5oZWFkLmRhdGEubGVuZ3RoO2Vsc2UgcmV0dXJuIHN0YXRlLmxlbmd0aDtcbiAgfSAvLyBJZiB3ZSdyZSBhc2tpbmcgZm9yIG1vcmUgdGhhbiB0aGUgY3VycmVudCBod20sIHRoZW4gcmFpc2UgdGhlIGh3bS5cblxuXG4gIGlmIChuID4gc3RhdGUuaGlnaFdhdGVyTWFyaykgc3RhdGUuaGlnaFdhdGVyTWFyayA9IGNvbXB1dGVOZXdIaWdoV2F0ZXJNYXJrKG4pO1xuICBpZiAobiA8PSBzdGF0ZS5sZW5ndGgpIHJldHVybiBuOyAvLyBEb24ndCBoYXZlIGVub3VnaFxuXG4gIGlmICghc3RhdGUuZW5kZWQpIHtcbiAgICBzdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlLmxlbmd0aDtcbn0gLy8geW91IGNhbiBvdmVycmlkZSBlaXRoZXIgdGhpcyBtZXRob2QsIG9yIHRoZSBhc3luYyBfcmVhZChuKSBiZWxvdy5cblxuXG5SZWFkYWJsZS5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIChuKSB7XG4gIGRlYnVnKCdyZWFkJywgbik7XG4gIG4gPSBwYXJzZUludChuLCAxMCk7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gIHZhciBuT3JpZyA9IG47XG4gIGlmIChuICE9PSAwKSBzdGF0ZS5lbWl0dGVkUmVhZGFibGUgPSBmYWxzZTsgLy8gaWYgd2UncmUgZG9pbmcgcmVhZCgwKSB0byB0cmlnZ2VyIGEgcmVhZGFibGUgZXZlbnQsIGJ1dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYSBidW5jaCBvZiBkYXRhIGluIHRoZSBidWZmZXIsIHRoZW4ganVzdCB0cmlnZ2VyXG4gIC8vIHRoZSAncmVhZGFibGUnIGV2ZW50IGFuZCBtb3ZlIG9uLlxuXG4gIGlmIChuID09PSAwICYmIHN0YXRlLm5lZWRSZWFkYWJsZSAmJiAoKHN0YXRlLmhpZ2hXYXRlck1hcmsgIT09IDAgPyBzdGF0ZS5sZW5ndGggPj0gc3RhdGUuaGlnaFdhdGVyTWFyayA6IHN0YXRlLmxlbmd0aCA+IDApIHx8IHN0YXRlLmVuZGVkKSkge1xuICAgIGRlYnVnKCdyZWFkOiBlbWl0UmVhZGFibGUnLCBzdGF0ZS5sZW5ndGgsIHN0YXRlLmVuZGVkKTtcbiAgICBpZiAoc3RhdGUubGVuZ3RoID09PSAwICYmIHN0YXRlLmVuZGVkKSBlbmRSZWFkYWJsZSh0aGlzKTtlbHNlIGVtaXRSZWFkYWJsZSh0aGlzKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG4gPSBob3dNdWNoVG9SZWFkKG4sIHN0YXRlKTsgLy8gaWYgd2UndmUgZW5kZWQsIGFuZCB3ZSdyZSBub3cgY2xlYXIsIHRoZW4gZmluaXNoIGl0IHVwLlxuXG4gIGlmIChuID09PSAwICYmIHN0YXRlLmVuZGVkKSB7XG4gICAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCkgZW5kUmVhZGFibGUodGhpcyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gLy8gQWxsIHRoZSBhY3R1YWwgY2h1bmsgZ2VuZXJhdGlvbiBsb2dpYyBuZWVkcyB0byBiZVxuICAvLyAqYmVsb3cqIHRoZSBjYWxsIHRvIF9yZWFkLiAgVGhlIHJlYXNvbiBpcyB0aGF0IGluIGNlcnRhaW5cbiAgLy8gc3ludGhldGljIHN0cmVhbSBjYXNlcywgc3VjaCBhcyBwYXNzdGhyb3VnaCBzdHJlYW1zLCBfcmVhZFxuICAvLyBtYXkgYmUgYSBjb21wbGV0ZWx5IHN5bmNocm9ub3VzIG9wZXJhdGlvbiB3aGljaCBtYXkgY2hhbmdlXG4gIC8vIHRoZSBzdGF0ZSBvZiB0aGUgcmVhZCBidWZmZXIsIHByb3ZpZGluZyBlbm91Z2ggZGF0YSB3aGVuXG4gIC8vIGJlZm9yZSB0aGVyZSB3YXMgKm5vdCogZW5vdWdoLlxuICAvL1xuICAvLyBTbywgdGhlIHN0ZXBzIGFyZTpcbiAgLy8gMS4gRmlndXJlIG91dCB3aGF0IHRoZSBzdGF0ZSBvZiB0aGluZ3Mgd2lsbCBiZSBhZnRlciB3ZSBkb1xuICAvLyBhIHJlYWQgZnJvbSB0aGUgYnVmZmVyLlxuICAvL1xuICAvLyAyLiBJZiB0aGF0IHJlc3VsdGluZyBzdGF0ZSB3aWxsIHRyaWdnZXIgYSBfcmVhZCwgdGhlbiBjYWxsIF9yZWFkLlxuICAvLyBOb3RlIHRoYXQgdGhpcyBtYXkgYmUgYXN5bmNocm9ub3VzLCBvciBzeW5jaHJvbm91cy4gIFllcywgaXQgaXNcbiAgLy8gZGVlcGx5IHVnbHkgdG8gd3JpdGUgQVBJcyB0aGlzIHdheSwgYnV0IHRoYXQgc3RpbGwgZG9lc24ndCBtZWFuXG4gIC8vIHRoYXQgdGhlIFJlYWRhYmxlIGNsYXNzIHNob3VsZCBiZWhhdmUgaW1wcm9wZXJseSwgYXMgc3RyZWFtcyBhcmVcbiAgLy8gZGVzaWduZWQgdG8gYmUgc3luYy9hc3luYyBhZ25vc3RpYy5cbiAgLy8gVGFrZSBub3RlIGlmIHRoZSBfcmVhZCBjYWxsIGlzIHN5bmMgb3IgYXN5bmMgKGllLCBpZiB0aGUgcmVhZCBjYWxsXG4gIC8vIGhhcyByZXR1cm5lZCB5ZXQpLCBzbyB0aGF0IHdlIGtub3cgd2hldGhlciBvciBub3QgaXQncyBzYWZlIHRvIGVtaXRcbiAgLy8gJ3JlYWRhYmxlJyBldGMuXG4gIC8vXG4gIC8vIDMuIEFjdHVhbGx5IHB1bGwgdGhlIHJlcXVlc3RlZCBjaHVua3Mgb3V0IG9mIHRoZSBidWZmZXIgYW5kIHJldHVybi5cbiAgLy8gaWYgd2UgbmVlZCBhIHJlYWRhYmxlIGV2ZW50LCB0aGVuIHdlIG5lZWQgdG8gZG8gc29tZSByZWFkaW5nLlxuXG5cbiAgdmFyIGRvUmVhZCA9IHN0YXRlLm5lZWRSZWFkYWJsZTtcbiAgZGVidWcoJ25lZWQgcmVhZGFibGUnLCBkb1JlYWQpOyAvLyBpZiB3ZSBjdXJyZW50bHkgaGF2ZSBsZXNzIHRoYW4gdGhlIGhpZ2hXYXRlck1hcmssIHRoZW4gYWxzbyByZWFkIHNvbWVcblxuICBpZiAoc3RhdGUubGVuZ3RoID09PSAwIHx8IHN0YXRlLmxlbmd0aCAtIG4gPCBzdGF0ZS5oaWdoV2F0ZXJNYXJrKSB7XG4gICAgZG9SZWFkID0gdHJ1ZTtcbiAgICBkZWJ1ZygnbGVuZ3RoIGxlc3MgdGhhbiB3YXRlcm1hcmsnLCBkb1JlYWQpO1xuICB9IC8vIGhvd2V2ZXIsIGlmIHdlJ3ZlIGVuZGVkLCB0aGVuIHRoZXJlJ3Mgbm8gcG9pbnQsIGFuZCBpZiB3ZSdyZSBhbHJlYWR5XG4gIC8vIHJlYWRpbmcsIHRoZW4gaXQncyB1bm5lY2Vzc2FyeS5cblxuXG4gIGlmIChzdGF0ZS5lbmRlZCB8fCBzdGF0ZS5yZWFkaW5nKSB7XG4gICAgZG9SZWFkID0gZmFsc2U7XG4gICAgZGVidWcoJ3JlYWRpbmcgb3IgZW5kZWQnLCBkb1JlYWQpO1xuICB9IGVsc2UgaWYgKGRvUmVhZCkge1xuICAgIGRlYnVnKCdkbyByZWFkJyk7XG4gICAgc3RhdGUucmVhZGluZyA9IHRydWU7XG4gICAgc3RhdGUuc3luYyA9IHRydWU7IC8vIGlmIHRoZSBsZW5ndGggaXMgY3VycmVudGx5IHplcm8sIHRoZW4gd2UgKm5lZWQqIGEgcmVhZGFibGUgZXZlbnQuXG5cbiAgICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSBzdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlOyAvLyBjYWxsIGludGVybmFsIHJlYWQgbWV0aG9kXG5cbiAgICB0aGlzLl9yZWFkKHN0YXRlLmhpZ2hXYXRlck1hcmspO1xuXG4gICAgc3RhdGUuc3luYyA9IGZhbHNlOyAvLyBJZiBfcmVhZCBwdXNoZWQgZGF0YSBzeW5jaHJvbm91c2x5LCB0aGVuIGByZWFkaW5nYCB3aWxsIGJlIGZhbHNlLFxuICAgIC8vIGFuZCB3ZSBuZWVkIHRvIHJlLWV2YWx1YXRlIGhvdyBtdWNoIGRhdGEgd2UgY2FuIHJldHVybiB0byB0aGUgdXNlci5cblxuICAgIGlmICghc3RhdGUucmVhZGluZykgbiA9IGhvd011Y2hUb1JlYWQobk9yaWcsIHN0YXRlKTtcbiAgfVxuXG4gIHZhciByZXQ7XG4gIGlmIChuID4gMCkgcmV0ID0gZnJvbUxpc3Qobiwgc3RhdGUpO2Vsc2UgcmV0ID0gbnVsbDtcblxuICBpZiAocmV0ID09PSBudWxsKSB7XG4gICAgc3RhdGUubmVlZFJlYWRhYmxlID0gc3RhdGUubGVuZ3RoIDw9IHN0YXRlLmhpZ2hXYXRlck1hcms7XG4gICAgbiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUubGVuZ3RoIC09IG47XG4gICAgc3RhdGUuYXdhaXREcmFpbiA9IDA7XG4gIH1cblxuICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gSWYgd2UgaGF2ZSBub3RoaW5nIGluIHRoZSBidWZmZXIsIHRoZW4gd2Ugd2FudCB0byBrbm93XG4gICAgLy8gYXMgc29vbiBhcyB3ZSAqZG8qIGdldCBzb21ldGhpbmcgaW50byB0aGUgYnVmZmVyLlxuICAgIGlmICghc3RhdGUuZW5kZWQpIHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7IC8vIElmIHdlIHRyaWVkIHRvIHJlYWQoKSBwYXN0IHRoZSBFT0YsIHRoZW4gZW1pdCBlbmQgb24gdGhlIG5leHQgdGljay5cblxuICAgIGlmIChuT3JpZyAhPT0gbiAmJiBzdGF0ZS5lbmRlZCkgZW5kUmVhZGFibGUodGhpcyk7XG4gIH1cblxuICBpZiAocmV0ICE9PSBudWxsKSB0aGlzLmVtaXQoJ2RhdGEnLCByZXQpO1xuICByZXR1cm4gcmV0O1xufTtcblxuZnVuY3Rpb24gb25Fb2ZDaHVuayhzdHJlYW0sIHN0YXRlKSB7XG4gIGRlYnVnKCdvbkVvZkNodW5rJyk7XG4gIGlmIChzdGF0ZS5lbmRlZCkgcmV0dXJuO1xuXG4gIGlmIChzdGF0ZS5kZWNvZGVyKSB7XG4gICAgdmFyIGNodW5rID0gc3RhdGUuZGVjb2Rlci5lbmQoKTtcblxuICAgIGlmIChjaHVuayAmJiBjaHVuay5sZW5ndGgpIHtcbiAgICAgIHN0YXRlLmJ1ZmZlci5wdXNoKGNodW5rKTtcbiAgICAgIHN0YXRlLmxlbmd0aCArPSBzdGF0ZS5vYmplY3RNb2RlID8gMSA6IGNodW5rLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICBzdGF0ZS5lbmRlZCA9IHRydWU7XG5cbiAgaWYgKHN0YXRlLnN5bmMpIHtcbiAgICAvLyBpZiB3ZSBhcmUgc3luYywgd2FpdCB1bnRpbCBuZXh0IHRpY2sgdG8gZW1pdCB0aGUgZGF0YS5cbiAgICAvLyBPdGhlcndpc2Ugd2UgcmlzayBlbWl0dGluZyBkYXRhIGluIHRoZSBmbG93KClcbiAgICAvLyB0aGUgcmVhZGFibGUgY29kZSB0cmlnZ2VycyBkdXJpbmcgYSByZWFkKCkgY2FsbFxuICAgIGVtaXRSZWFkYWJsZShzdHJlYW0pO1xuICB9IGVsc2Uge1xuICAgIC8vIGVtaXQgJ3JlYWRhYmxlJyBub3cgdG8gbWFrZSBzdXJlIGl0IGdldHMgcGlja2VkIHVwLlxuICAgIHN0YXRlLm5lZWRSZWFkYWJsZSA9IGZhbHNlO1xuXG4gICAgaWYgKCFzdGF0ZS5lbWl0dGVkUmVhZGFibGUpIHtcbiAgICAgIHN0YXRlLmVtaXR0ZWRSZWFkYWJsZSA9IHRydWU7XG4gICAgICBlbWl0UmVhZGFibGVfKHN0cmVhbSk7XG4gICAgfVxuICB9XG59IC8vIERvbid0IGVtaXQgcmVhZGFibGUgcmlnaHQgYXdheSBpbiBzeW5jIG1vZGUsIGJlY2F1c2UgdGhpcyBjYW4gdHJpZ2dlclxuLy8gYW5vdGhlciByZWFkKCkgY2FsbCA9PiBzdGFjayBvdmVyZmxvdy4gIFRoaXMgd2F5LCBpdCBtaWdodCB0cmlnZ2VyXG4vLyBhIG5leHRUaWNrIHJlY3Vyc2lvbiB3YXJuaW5nLCBidXQgdGhhdCdzIG5vdCBzbyBiYWQuXG5cblxuZnVuY3Rpb24gZW1pdFJlYWRhYmxlKHN0cmVhbSkge1xuICB2YXIgc3RhdGUgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG4gIGRlYnVnKCdlbWl0UmVhZGFibGUnLCBzdGF0ZS5uZWVkUmVhZGFibGUsIHN0YXRlLmVtaXR0ZWRSZWFkYWJsZSk7XG4gIHN0YXRlLm5lZWRSZWFkYWJsZSA9IGZhbHNlO1xuXG4gIGlmICghc3RhdGUuZW1pdHRlZFJlYWRhYmxlKSB7XG4gICAgZGVidWcoJ2VtaXRSZWFkYWJsZScsIHN0YXRlLmZsb3dpbmcpO1xuICAgIHN0YXRlLmVtaXR0ZWRSZWFkYWJsZSA9IHRydWU7XG4gICAgcHJvY2Vzcy5uZXh0VGljayhlbWl0UmVhZGFibGVfLCBzdHJlYW0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVtaXRSZWFkYWJsZV8oc3RyZWFtKSB7XG4gIHZhciBzdGF0ZSA9IHN0cmVhbS5fcmVhZGFibGVTdGF0ZTtcbiAgZGVidWcoJ2VtaXRSZWFkYWJsZV8nLCBzdGF0ZS5kZXN0cm95ZWQsIHN0YXRlLmxlbmd0aCwgc3RhdGUuZW5kZWQpO1xuXG4gIGlmICghc3RhdGUuZGVzdHJveWVkICYmIChzdGF0ZS5sZW5ndGggfHwgc3RhdGUuZW5kZWQpKSB7XG4gICAgc3RyZWFtLmVtaXQoJ3JlYWRhYmxlJyk7XG4gICAgc3RhdGUuZW1pdHRlZFJlYWRhYmxlID0gZmFsc2U7XG4gIH0gLy8gVGhlIHN0cmVhbSBuZWVkcyBhbm90aGVyIHJlYWRhYmxlIGV2ZW50IGlmXG4gIC8vIDEuIEl0IGlzIG5vdCBmbG93aW5nLCBhcyB0aGUgZmxvdyBtZWNoYW5pc20gd2lsbCB0YWtlXG4gIC8vICAgIGNhcmUgb2YgaXQuXG4gIC8vIDIuIEl0IGlzIG5vdCBlbmRlZC5cbiAgLy8gMy4gSXQgaXMgYmVsb3cgdGhlIGhpZ2hXYXRlck1hcmssIHNvIHdlIGNhbiBzY2hlZHVsZVxuICAvLyAgICBhbm90aGVyIHJlYWRhYmxlIGxhdGVyLlxuXG5cbiAgc3RhdGUubmVlZFJlYWRhYmxlID0gIXN0YXRlLmZsb3dpbmcgJiYgIXN0YXRlLmVuZGVkICYmIHN0YXRlLmxlbmd0aCA8PSBzdGF0ZS5oaWdoV2F0ZXJNYXJrO1xuICBmbG93KHN0cmVhbSk7XG59IC8vIGF0IHRoaXMgcG9pbnQsIHRoZSB1c2VyIGhhcyBwcmVzdW1hYmx5IHNlZW4gdGhlICdyZWFkYWJsZScgZXZlbnQsXG4vLyBhbmQgY2FsbGVkIHJlYWQoKSB0byBjb25zdW1lIHNvbWUgZGF0YS4gIHRoYXQgbWF5IGhhdmUgdHJpZ2dlcmVkXG4vLyBpbiB0dXJuIGFub3RoZXIgX3JlYWQobikgY2FsbCwgaW4gd2hpY2ggY2FzZSByZWFkaW5nID0gdHJ1ZSBpZlxuLy8gaXQncyBpbiBwcm9ncmVzcy5cbi8vIEhvd2V2ZXIsIGlmIHdlJ3JlIG5vdCBlbmRlZCwgb3IgcmVhZGluZywgYW5kIHRoZSBsZW5ndGggPCBod20sXG4vLyB0aGVuIGdvIGFoZWFkIGFuZCB0cnkgdG8gcmVhZCBzb21lIG1vcmUgcHJlZW1wdGl2ZWx5LlxuXG5cbmZ1bmN0aW9uIG1heWJlUmVhZE1vcmUoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoIXN0YXRlLnJlYWRpbmdNb3JlKSB7XG4gICAgc3RhdGUucmVhZGluZ01vcmUgPSB0cnVlO1xuICAgIHByb2Nlc3MubmV4dFRpY2sobWF5YmVSZWFkTW9yZV8sIHN0cmVhbSwgc3RhdGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1heWJlUmVhZE1vcmVfKHN0cmVhbSwgc3RhdGUpIHtcbiAgLy8gQXR0ZW1wdCB0byByZWFkIG1vcmUgZGF0YSBpZiB3ZSBzaG91bGQuXG4gIC8vXG4gIC8vIFRoZSBjb25kaXRpb25zIGZvciByZWFkaW5nIG1vcmUgZGF0YSBhcmUgKG9uZSBvZik6XG4gIC8vIC0gTm90IGVub3VnaCBkYXRhIGJ1ZmZlcmVkIChzdGF0ZS5sZW5ndGggPCBzdGF0ZS5oaWdoV2F0ZXJNYXJrKS4gVGhlIGxvb3BcbiAgLy8gICBpcyByZXNwb25zaWJsZSBmb3IgZmlsbGluZyB0aGUgYnVmZmVyIHdpdGggZW5vdWdoIGRhdGEgaWYgc3VjaCBkYXRhXG4gIC8vICAgaXMgYXZhaWxhYmxlLiBJZiBoaWdoV2F0ZXJNYXJrIGlzIDAgYW5kIHdlIGFyZSBub3QgaW4gdGhlIGZsb3dpbmcgbW9kZVxuICAvLyAgIHdlIHNob3VsZCBfbm90XyBhdHRlbXB0IHRvIGJ1ZmZlciBhbnkgZXh0cmEgZGF0YS4gV2UnbGwgZ2V0IG1vcmUgZGF0YVxuICAvLyAgIHdoZW4gdGhlIHN0cmVhbSBjb25zdW1lciBjYWxscyByZWFkKCkgaW5zdGVhZC5cbiAgLy8gLSBObyBkYXRhIGluIHRoZSBidWZmZXIsIGFuZCB0aGUgc3RyZWFtIGlzIGluIGZsb3dpbmcgbW9kZS4gSW4gdGhpcyBtb2RlXG4gIC8vICAgdGhlIGxvb3AgYmVsb3cgaXMgcmVzcG9uc2libGUgZm9yIGVuc3VyaW5nIHJlYWQoKSBpcyBjYWxsZWQuIEZhaWxpbmcgdG9cbiAgLy8gICBjYWxsIHJlYWQgaGVyZSB3b3VsZCBhYm9ydCB0aGUgZmxvdyBhbmQgdGhlcmUncyBubyBvdGhlciBtZWNoYW5pc20gZm9yXG4gIC8vICAgY29udGludWluZyB0aGUgZmxvdyBpZiB0aGUgc3RyZWFtIGNvbnN1bWVyIGhhcyBqdXN0IHN1YnNjcmliZWQgdG8gdGhlXG4gIC8vICAgJ2RhdGEnIGV2ZW50LlxuICAvL1xuICAvLyBJbiBhZGRpdGlvbiB0byB0aGUgYWJvdmUgY29uZGl0aW9ucyB0byBrZWVwIHJlYWRpbmcgZGF0YSwgdGhlIGZvbGxvd2luZ1xuICAvLyBjb25kaXRpb25zIHByZXZlbnQgdGhlIGRhdGEgZnJvbSBiZWluZyByZWFkOlxuICAvLyAtIFRoZSBzdHJlYW0gaGFzIGVuZGVkIChzdGF0ZS5lbmRlZCkuXG4gIC8vIC0gVGhlcmUgaXMgYWxyZWFkeSBhIHBlbmRpbmcgJ3JlYWQnIG9wZXJhdGlvbiAoc3RhdGUucmVhZGluZykuIFRoaXMgaXMgYVxuICAvLyAgIGNhc2Ugd2hlcmUgdGhlIHRoZSBzdHJlYW0gaGFzIGNhbGxlZCB0aGUgaW1wbGVtZW50YXRpb24gZGVmaW5lZCBfcmVhZCgpXG4gIC8vICAgbWV0aG9kLCBidXQgdGhleSBhcmUgcHJvY2Vzc2luZyB0aGUgY2FsbCBhc3luY2hyb25vdXNseSBhbmQgaGF2ZSBfbm90X1xuICAvLyAgIGNhbGxlZCBwdXNoKCkgd2l0aCBuZXcgZGF0YS4gSW4gdGhpcyBjYXNlIHdlIHNraXAgcGVyZm9ybWluZyBtb3JlXG4gIC8vICAgcmVhZCgpcy4gVGhlIGV4ZWN1dGlvbiBlbmRzIGluIHRoaXMgbWV0aG9kIGFnYWluIGFmdGVyIHRoZSBfcmVhZCgpIGVuZHNcbiAgLy8gICB1cCBjYWxsaW5nIHB1c2goKSB3aXRoIG1vcmUgZGF0YS5cbiAgd2hpbGUgKCFzdGF0ZS5yZWFkaW5nICYmICFzdGF0ZS5lbmRlZCAmJiAoc3RhdGUubGVuZ3RoIDwgc3RhdGUuaGlnaFdhdGVyTWFyayB8fCBzdGF0ZS5mbG93aW5nICYmIHN0YXRlLmxlbmd0aCA9PT0gMCkpIHtcbiAgICB2YXIgbGVuID0gc3RhdGUubGVuZ3RoO1xuICAgIGRlYnVnKCdtYXliZVJlYWRNb3JlIHJlYWQgMCcpO1xuICAgIHN0cmVhbS5yZWFkKDApO1xuICAgIGlmIChsZW4gPT09IHN0YXRlLmxlbmd0aCkgLy8gZGlkbid0IGdldCBhbnkgZGF0YSwgc3RvcCBzcGlubmluZy5cbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgc3RhdGUucmVhZGluZ01vcmUgPSBmYWxzZTtcbn0gLy8gYWJzdHJhY3QgbWV0aG9kLiAgdG8gYmUgb3ZlcnJpZGRlbiBpbiBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbiBjbGFzc2VzLlxuLy8gY2FsbCBjYihlciwgZGF0YSkgd2hlcmUgZGF0YSBpcyA8PSBuIGluIGxlbmd0aC5cbi8vIGZvciB2aXJ0dWFsIChub24tc3RyaW5nLCBub24tYnVmZmVyKSBzdHJlYW1zLCBcImxlbmd0aFwiIGlzIHNvbWV3aGF0XG4vLyBhcmJpdHJhcnksIGFuZCBwZXJoYXBzIG5vdCB2ZXJ5IG1lYW5pbmdmdWwuXG5cblxuUmVhZGFibGUucHJvdG90eXBlLl9yZWFkID0gZnVuY3Rpb24gKG4pIHtcbiAgZXJyb3JPckRlc3Ryb3kodGhpcywgbmV3IEVSUl9NRVRIT0RfTk9UX0lNUExFTUVOVEVEKCdfcmVhZCgpJykpO1xufTtcblxuUmVhZGFibGUucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiAoZGVzdCwgcGlwZU9wdHMpIHtcbiAgdmFyIHNyYyA9IHRoaXM7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG5cbiAgc3dpdGNoIChzdGF0ZS5waXBlc0NvdW50KSB7XG4gICAgY2FzZSAwOlxuICAgICAgc3RhdGUucGlwZXMgPSBkZXN0O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDE6XG4gICAgICBzdGF0ZS5waXBlcyA9IFtzdGF0ZS5waXBlcywgZGVzdF07XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBzdGF0ZS5waXBlcy5wdXNoKGRlc3QpO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBzdGF0ZS5waXBlc0NvdW50ICs9IDE7XG4gIGRlYnVnKCdwaXBlIGNvdW50PSVkIG9wdHM9JWonLCBzdGF0ZS5waXBlc0NvdW50LCBwaXBlT3B0cyk7XG4gIHZhciBkb0VuZCA9ICghcGlwZU9wdHMgfHwgcGlwZU9wdHMuZW5kICE9PSBmYWxzZSkgJiYgZGVzdCAhPT0gcHJvY2Vzcy5zdGRvdXQgJiYgZGVzdCAhPT0gcHJvY2Vzcy5zdGRlcnI7XG4gIHZhciBlbmRGbiA9IGRvRW5kID8gb25lbmQgOiB1bnBpcGU7XG4gIGlmIChzdGF0ZS5lbmRFbWl0dGVkKSBwcm9jZXNzLm5leHRUaWNrKGVuZEZuKTtlbHNlIHNyYy5vbmNlKCdlbmQnLCBlbmRGbik7XG4gIGRlc3Qub24oJ3VucGlwZScsIG9udW5waXBlKTtcblxuICBmdW5jdGlvbiBvbnVucGlwZShyZWFkYWJsZSwgdW5waXBlSW5mbykge1xuICAgIGRlYnVnKCdvbnVucGlwZScpO1xuXG4gICAgaWYgKHJlYWRhYmxlID09PSBzcmMpIHtcbiAgICAgIGlmICh1bnBpcGVJbmZvICYmIHVucGlwZUluZm8uaGFzVW5waXBlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgdW5waXBlSW5mby5oYXNVbnBpcGVkID0gdHJ1ZTtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uZW5kKCkge1xuICAgIGRlYnVnKCdvbmVuZCcpO1xuICAgIGRlc3QuZW5kKCk7XG4gIH0gLy8gd2hlbiB0aGUgZGVzdCBkcmFpbnMsIGl0IHJlZHVjZXMgdGhlIGF3YWl0RHJhaW4gY291bnRlclxuICAvLyBvbiB0aGUgc291cmNlLiAgVGhpcyB3b3VsZCBiZSBtb3JlIGVsZWdhbnQgd2l0aCBhIC5vbmNlKClcbiAgLy8gaGFuZGxlciBpbiBmbG93KCksIGJ1dCBhZGRpbmcgYW5kIHJlbW92aW5nIHJlcGVhdGVkbHkgaXNcbiAgLy8gdG9vIHNsb3cuXG5cblxuICB2YXIgb25kcmFpbiA9IHBpcGVPbkRyYWluKHNyYyk7XG4gIGRlc3Qub24oJ2RyYWluJywgb25kcmFpbik7XG4gIHZhciBjbGVhbmVkVXAgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIGRlYnVnKCdjbGVhbnVwJyk7IC8vIGNsZWFudXAgZXZlbnQgaGFuZGxlcnMgb25jZSB0aGUgcGlwZSBpcyBicm9rZW5cblxuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZmluaXNoJywgb25maW5pc2gpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2RyYWluJywgb25kcmFpbik7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCd1bnBpcGUnLCBvbnVucGlwZSk7XG4gICAgc3JjLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCBvbmVuZCk7XG4gICAgc3JjLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCB1bnBpcGUpO1xuICAgIHNyYy5yZW1vdmVMaXN0ZW5lcignZGF0YScsIG9uZGF0YSk7XG4gICAgY2xlYW5lZFVwID0gdHJ1ZTsgLy8gaWYgdGhlIHJlYWRlciBpcyB3YWl0aW5nIGZvciBhIGRyYWluIGV2ZW50IGZyb20gdGhpc1xuICAgIC8vIHNwZWNpZmljIHdyaXRlciwgdGhlbiBpdCB3b3VsZCBjYXVzZSBpdCB0byBuZXZlciBzdGFydFxuICAgIC8vIGZsb3dpbmcgYWdhaW4uXG4gICAgLy8gU28sIGlmIHRoaXMgaXMgYXdhaXRpbmcgYSBkcmFpbiwgdGhlbiB3ZSBqdXN0IGNhbGwgaXQgbm93LlxuICAgIC8vIElmIHdlIGRvbid0IGtub3csIHRoZW4gYXNzdW1lIHRoYXQgd2UgYXJlIHdhaXRpbmcgZm9yIG9uZS5cblxuICAgIGlmIChzdGF0ZS5hd2FpdERyYWluICYmICghZGVzdC5fd3JpdGFibGVTdGF0ZSB8fCBkZXN0Ll93cml0YWJsZVN0YXRlLm5lZWREcmFpbikpIG9uZHJhaW4oKTtcbiAgfVxuXG4gIHNyYy5vbignZGF0YScsIG9uZGF0YSk7XG5cbiAgZnVuY3Rpb24gb25kYXRhKGNodW5rKSB7XG4gICAgZGVidWcoJ29uZGF0YScpO1xuICAgIHZhciByZXQgPSBkZXN0LndyaXRlKGNodW5rKTtcbiAgICBkZWJ1ZygnZGVzdC53cml0ZScsIHJldCk7XG5cbiAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgLy8gSWYgdGhlIHVzZXIgdW5waXBlZCBkdXJpbmcgYGRlc3Qud3JpdGUoKWAsIGl0IGlzIHBvc3NpYmxlXG4gICAgICAvLyB0byBnZXQgc3R1Y2sgaW4gYSBwZXJtYW5lbnRseSBwYXVzZWQgc3RhdGUgaWYgdGhhdCB3cml0ZVxuICAgICAgLy8gYWxzbyByZXR1cm5lZCBmYWxzZS5cbiAgICAgIC8vID0+IENoZWNrIHdoZXRoZXIgYGRlc3RgIGlzIHN0aWxsIGEgcGlwaW5nIGRlc3RpbmF0aW9uLlxuICAgICAgaWYgKChzdGF0ZS5waXBlc0NvdW50ID09PSAxICYmIHN0YXRlLnBpcGVzID09PSBkZXN0IHx8IHN0YXRlLnBpcGVzQ291bnQgPiAxICYmIGluZGV4T2Yoc3RhdGUucGlwZXMsIGRlc3QpICE9PSAtMSkgJiYgIWNsZWFuZWRVcCkge1xuICAgICAgICBkZWJ1ZygnZmFsc2Ugd3JpdGUgcmVzcG9uc2UsIHBhdXNlJywgc3RhdGUuYXdhaXREcmFpbik7XG4gICAgICAgIHN0YXRlLmF3YWl0RHJhaW4rKztcbiAgICAgIH1cblxuICAgICAgc3JjLnBhdXNlKCk7XG4gICAgfVxuICB9IC8vIGlmIHRoZSBkZXN0IGhhcyBhbiBlcnJvciwgdGhlbiBzdG9wIHBpcGluZyBpbnRvIGl0LlxuICAvLyBob3dldmVyLCBkb24ndCBzdXBwcmVzcyB0aGUgdGhyb3dpbmcgYmVoYXZpb3IgZm9yIHRoaXMuXG5cblxuICBmdW5jdGlvbiBvbmVycm9yKGVyKSB7XG4gICAgZGVidWcoJ29uZXJyb3InLCBlcik7XG4gICAgdW5waXBlKCk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcbiAgICBpZiAoRUVsaXN0ZW5lckNvdW50KGRlc3QsICdlcnJvcicpID09PSAwKSBlcnJvck9yRGVzdHJveShkZXN0LCBlcik7XG4gIH0gLy8gTWFrZSBzdXJlIG91ciBlcnJvciBoYW5kbGVyIGlzIGF0dGFjaGVkIGJlZm9yZSB1c2VybGFuZCBvbmVzLlxuXG5cbiAgcHJlcGVuZExpc3RlbmVyKGRlc3QsICdlcnJvcicsIG9uZXJyb3IpOyAvLyBCb3RoIGNsb3NlIGFuZCBmaW5pc2ggc2hvdWxkIHRyaWdnZXIgdW5waXBlLCBidXQgb25seSBvbmNlLlxuXG4gIGZ1bmN0aW9uIG9uY2xvc2UoKSB7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZmluaXNoJywgb25maW5pc2gpO1xuICAgIHVucGlwZSgpO1xuICB9XG5cbiAgZGVzdC5vbmNlKCdjbG9zZScsIG9uY2xvc2UpO1xuXG4gIGZ1bmN0aW9uIG9uZmluaXNoKCkge1xuICAgIGRlYnVnKCdvbmZpbmlzaCcpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG4gICAgdW5waXBlKCk7XG4gIH1cblxuICBkZXN0Lm9uY2UoJ2ZpbmlzaCcsIG9uZmluaXNoKTtcblxuICBmdW5jdGlvbiB1bnBpcGUoKSB7XG4gICAgZGVidWcoJ3VucGlwZScpO1xuICAgIHNyYy51bnBpcGUoZGVzdCk7XG4gIH0gLy8gdGVsbCB0aGUgZGVzdCB0aGF0IGl0J3MgYmVpbmcgcGlwZWQgdG9cblxuXG4gIGRlc3QuZW1pdCgncGlwZScsIHNyYyk7IC8vIHN0YXJ0IHRoZSBmbG93IGlmIGl0IGhhc24ndCBiZWVuIHN0YXJ0ZWQgYWxyZWFkeS5cblxuICBpZiAoIXN0YXRlLmZsb3dpbmcpIHtcbiAgICBkZWJ1ZygncGlwZSByZXN1bWUnKTtcbiAgICBzcmMucmVzdW1lKCk7XG4gIH1cblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmZ1bmN0aW9uIHBpcGVPbkRyYWluKHNyYykge1xuICByZXR1cm4gZnVuY3Rpb24gcGlwZU9uRHJhaW5GdW5jdGlvblJlc3VsdCgpIHtcbiAgICB2YXIgc3RhdGUgPSBzcmMuX3JlYWRhYmxlU3RhdGU7XG4gICAgZGVidWcoJ3BpcGVPbkRyYWluJywgc3RhdGUuYXdhaXREcmFpbik7XG4gICAgaWYgKHN0YXRlLmF3YWl0RHJhaW4pIHN0YXRlLmF3YWl0RHJhaW4tLTtcblxuICAgIGlmIChzdGF0ZS5hd2FpdERyYWluID09PSAwICYmIEVFbGlzdGVuZXJDb3VudChzcmMsICdkYXRhJykpIHtcbiAgICAgIHN0YXRlLmZsb3dpbmcgPSB0cnVlO1xuICAgICAgZmxvdyhzcmMpO1xuICAgIH1cbiAgfTtcbn1cblxuUmVhZGFibGUucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIChkZXN0KSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gIHZhciB1bnBpcGVJbmZvID0ge1xuICAgIGhhc1VucGlwZWQ6IGZhbHNlXG4gIH07IC8vIGlmIHdlJ3JlIG5vdCBwaXBpbmcgYW55d2hlcmUsIHRoZW4gZG8gbm90aGluZy5cblxuICBpZiAoc3RhdGUucGlwZXNDb3VudCA9PT0gMCkgcmV0dXJuIHRoaXM7IC8vIGp1c3Qgb25lIGRlc3RpbmF0aW9uLiAgbW9zdCBjb21tb24gY2FzZS5cblxuICBpZiAoc3RhdGUucGlwZXNDb3VudCA9PT0gMSkge1xuICAgIC8vIHBhc3NlZCBpbiBvbmUsIGJ1dCBpdCdzIG5vdCB0aGUgcmlnaHQgb25lLlxuICAgIGlmIChkZXN0ICYmIGRlc3QgIT09IHN0YXRlLnBpcGVzKSByZXR1cm4gdGhpcztcbiAgICBpZiAoIWRlc3QpIGRlc3QgPSBzdGF0ZS5waXBlczsgLy8gZ290IGEgbWF0Y2guXG5cbiAgICBzdGF0ZS5waXBlcyA9IG51bGw7XG4gICAgc3RhdGUucGlwZXNDb3VudCA9IDA7XG4gICAgc3RhdGUuZmxvd2luZyA9IGZhbHNlO1xuICAgIGlmIChkZXN0KSBkZXN0LmVtaXQoJ3VucGlwZScsIHRoaXMsIHVucGlwZUluZm8pO1xuICAgIHJldHVybiB0aGlzO1xuICB9IC8vIHNsb3cgY2FzZS4gbXVsdGlwbGUgcGlwZSBkZXN0aW5hdGlvbnMuXG5cblxuICBpZiAoIWRlc3QpIHtcbiAgICAvLyByZW1vdmUgYWxsLlxuICAgIHZhciBkZXN0cyA9IHN0YXRlLnBpcGVzO1xuICAgIHZhciBsZW4gPSBzdGF0ZS5waXBlc0NvdW50O1xuICAgIHN0YXRlLnBpcGVzID0gbnVsbDtcbiAgICBzdGF0ZS5waXBlc0NvdW50ID0gMDtcbiAgICBzdGF0ZS5mbG93aW5nID0gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBkZXN0c1tpXS5lbWl0KCd1bnBpcGUnLCB0aGlzLCB7XG4gICAgICAgIGhhc1VucGlwZWQ6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSAvLyB0cnkgdG8gZmluZCB0aGUgcmlnaHQgb25lLlxuXG5cbiAgdmFyIGluZGV4ID0gaW5kZXhPZihzdGF0ZS5waXBlcywgZGVzdCk7XG4gIGlmIChpbmRleCA9PT0gLTEpIHJldHVybiB0aGlzO1xuICBzdGF0ZS5waXBlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICBzdGF0ZS5waXBlc0NvdW50IC09IDE7XG4gIGlmIChzdGF0ZS5waXBlc0NvdW50ID09PSAxKSBzdGF0ZS5waXBlcyA9IHN0YXRlLnBpcGVzWzBdO1xuICBkZXN0LmVtaXQoJ3VucGlwZScsIHRoaXMsIHVucGlwZUluZm8pO1xuICByZXR1cm4gdGhpcztcbn07IC8vIHNldCB1cCBkYXRhIGV2ZW50cyBpZiB0aGV5IGFyZSBhc2tlZCBmb3Jcbi8vIEVuc3VyZSByZWFkYWJsZSBsaXN0ZW5lcnMgZXZlbnR1YWxseSBnZXQgc29tZXRoaW5nXG5cblxuUmVhZGFibGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2LCBmbikge1xuICB2YXIgcmVzID0gU3RyZWFtLnByb3RvdHlwZS5vbi5jYWxsKHRoaXMsIGV2LCBmbik7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG5cbiAgaWYgKGV2ID09PSAnZGF0YScpIHtcbiAgICAvLyB1cGRhdGUgcmVhZGFibGVMaXN0ZW5pbmcgc28gdGhhdCByZXN1bWUoKSBtYXkgYmUgYSBuby1vcFxuICAgIC8vIGEgZmV3IGxpbmVzIGRvd24uIFRoaXMgaXMgbmVlZGVkIHRvIHN1cHBvcnQgb25jZSgncmVhZGFibGUnKS5cbiAgICBzdGF0ZS5yZWFkYWJsZUxpc3RlbmluZyA9IHRoaXMubGlzdGVuZXJDb3VudCgncmVhZGFibGUnKSA+IDA7IC8vIFRyeSBzdGFydCBmbG93aW5nIG9uIG5leHQgdGljayBpZiBzdHJlYW0gaXNuJ3QgZXhwbGljaXRseSBwYXVzZWRcblxuICAgIGlmIChzdGF0ZS5mbG93aW5nICE9PSBmYWxzZSkgdGhpcy5yZXN1bWUoKTtcbiAgfSBlbHNlIGlmIChldiA9PT0gJ3JlYWRhYmxlJykge1xuICAgIGlmICghc3RhdGUuZW5kRW1pdHRlZCAmJiAhc3RhdGUucmVhZGFibGVMaXN0ZW5pbmcpIHtcbiAgICAgIHN0YXRlLnJlYWRhYmxlTGlzdGVuaW5nID0gc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICAgIHN0YXRlLmZsb3dpbmcgPSBmYWxzZTtcbiAgICAgIHN0YXRlLmVtaXR0ZWRSZWFkYWJsZSA9IGZhbHNlO1xuICAgICAgZGVidWcoJ29uIHJlYWRhYmxlJywgc3RhdGUubGVuZ3RoLCBzdGF0ZS5yZWFkaW5nKTtcblxuICAgICAgaWYgKHN0YXRlLmxlbmd0aCkge1xuICAgICAgICBlbWl0UmVhZGFibGUodGhpcyk7XG4gICAgICB9IGVsc2UgaWYgKCFzdGF0ZS5yZWFkaW5nKSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soblJlYWRpbmdOZXh0VGljaywgdGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn07XG5cblJlYWRhYmxlLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IFJlYWRhYmxlLnByb3RvdHlwZS5vbjtcblxuUmVhZGFibGUucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gKGV2LCBmbikge1xuICB2YXIgcmVzID0gU3RyZWFtLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lci5jYWxsKHRoaXMsIGV2LCBmbik7XG5cbiAgaWYgKGV2ID09PSAncmVhZGFibGUnKSB7XG4gICAgLy8gV2UgbmVlZCB0byBjaGVjayBpZiB0aGVyZSBpcyBzb21lb25lIHN0aWxsIGxpc3RlbmluZyB0b1xuICAgIC8vIHJlYWRhYmxlIGFuZCByZXNldCB0aGUgc3RhdGUuIEhvd2V2ZXIgdGhpcyBuZWVkcyB0byBoYXBwZW5cbiAgICAvLyBhZnRlciByZWFkYWJsZSBoYXMgYmVlbiBlbWl0dGVkIGJ1dCBiZWZvcmUgSS9PIChuZXh0VGljaykgdG9cbiAgICAvLyBzdXBwb3J0IG9uY2UoJ3JlYWRhYmxlJywgZm4pIGN5Y2xlcy4gVGhpcyBtZWFucyB0aGF0IGNhbGxpbmdcbiAgICAvLyByZXN1bWUgd2l0aGluIHRoZSBzYW1lIHRpY2sgd2lsbCBoYXZlIG5vXG4gICAgLy8gZWZmZWN0LlxuICAgIHByb2Nlc3MubmV4dFRpY2sodXBkYXRlUmVhZGFibGVMaXN0ZW5pbmcsIHRoaXMpO1xuICB9XG5cbiAgcmV0dXJuIHJlcztcbn07XG5cblJlYWRhYmxlLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXYpIHtcbiAgdmFyIHJlcyA9IFN0cmVhbS5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgaWYgKGV2ID09PSAncmVhZGFibGUnIHx8IGV2ID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGlmIHRoZXJlIGlzIHNvbWVvbmUgc3RpbGwgbGlzdGVuaW5nIHRvXG4gICAgLy8gcmVhZGFibGUgYW5kIHJlc2V0IHRoZSBzdGF0ZS4gSG93ZXZlciB0aGlzIG5lZWRzIHRvIGhhcHBlblxuICAgIC8vIGFmdGVyIHJlYWRhYmxlIGhhcyBiZWVuIGVtaXR0ZWQgYnV0IGJlZm9yZSBJL08gKG5leHRUaWNrKSB0b1xuICAgIC8vIHN1cHBvcnQgb25jZSgncmVhZGFibGUnLCBmbikgY3ljbGVzLiBUaGlzIG1lYW5zIHRoYXQgY2FsbGluZ1xuICAgIC8vIHJlc3VtZSB3aXRoaW4gdGhlIHNhbWUgdGljayB3aWxsIGhhdmUgbm9cbiAgICAvLyBlZmZlY3QuXG4gICAgcHJvY2Vzcy5uZXh0VGljayh1cGRhdGVSZWFkYWJsZUxpc3RlbmluZywgdGhpcyk7XG4gIH1cblxuICByZXR1cm4gcmVzO1xufTtcblxuZnVuY3Rpb24gdXBkYXRlUmVhZGFibGVMaXN0ZW5pbmcoc2VsZikge1xuICB2YXIgc3RhdGUgPSBzZWxmLl9yZWFkYWJsZVN0YXRlO1xuICBzdGF0ZS5yZWFkYWJsZUxpc3RlbmluZyA9IHNlbGYubGlzdGVuZXJDb3VudCgncmVhZGFibGUnKSA+IDA7XG5cbiAgaWYgKHN0YXRlLnJlc3VtZVNjaGVkdWxlZCAmJiAhc3RhdGUucGF1c2VkKSB7XG4gICAgLy8gZmxvd2luZyBuZWVkcyB0byBiZSBzZXQgdG8gdHJ1ZSBub3csIG90aGVyd2lzZVxuICAgIC8vIHRoZSB1cGNvbWluZyByZXN1bWUgd2lsbCBub3QgZmxvdy5cbiAgICBzdGF0ZS5mbG93aW5nID0gdHJ1ZTsgLy8gY3J1ZGUgd2F5IHRvIGNoZWNrIGlmIHdlIHNob3VsZCByZXN1bWVcbiAgfSBlbHNlIGlmIChzZWxmLmxpc3RlbmVyQ291bnQoJ2RhdGEnKSA+IDApIHtcbiAgICBzZWxmLnJlc3VtZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5SZWFkaW5nTmV4dFRpY2soc2VsZikge1xuICBkZWJ1ZygncmVhZGFibGUgbmV4dHRpY2sgcmVhZCAwJyk7XG4gIHNlbGYucmVhZCgwKTtcbn0gLy8gcGF1c2UoKSBhbmQgcmVzdW1lKCkgYXJlIHJlbW5hbnRzIG9mIHRoZSBsZWdhY3kgcmVhZGFibGUgc3RyZWFtIEFQSVxuLy8gSWYgdGhlIHVzZXIgdXNlcyB0aGVtLCB0aGVuIHN3aXRjaCBpbnRvIG9sZCBtb2RlLlxuXG5cblJlYWRhYmxlLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG5cbiAgaWYgKCFzdGF0ZS5mbG93aW5nKSB7XG4gICAgZGVidWcoJ3Jlc3VtZScpOyAvLyB3ZSBmbG93IG9ubHkgaWYgdGhlcmUgaXMgbm8gb25lIGxpc3RlbmluZ1xuICAgIC8vIGZvciByZWFkYWJsZSwgYnV0IHdlIHN0aWxsIGhhdmUgdG8gY2FsbFxuICAgIC8vIHJlc3VtZSgpXG5cbiAgICBzdGF0ZS5mbG93aW5nID0gIXN0YXRlLnJlYWRhYmxlTGlzdGVuaW5nO1xuICAgIHJlc3VtZSh0aGlzLCBzdGF0ZSk7XG4gIH1cblxuICBzdGF0ZS5wYXVzZWQgPSBmYWxzZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiByZXN1bWUoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoIXN0YXRlLnJlc3VtZVNjaGVkdWxlZCkge1xuICAgIHN0YXRlLnJlc3VtZVNjaGVkdWxlZCA9IHRydWU7XG4gICAgcHJvY2Vzcy5uZXh0VGljayhyZXN1bWVfLCBzdHJlYW0sIHN0YXRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXN1bWVfKHN0cmVhbSwgc3RhdGUpIHtcbiAgZGVidWcoJ3Jlc3VtZScsIHN0YXRlLnJlYWRpbmcpO1xuXG4gIGlmICghc3RhdGUucmVhZGluZykge1xuICAgIHN0cmVhbS5yZWFkKDApO1xuICB9XG5cbiAgc3RhdGUucmVzdW1lU2NoZWR1bGVkID0gZmFsc2U7XG4gIHN0cmVhbS5lbWl0KCdyZXN1bWUnKTtcbiAgZmxvdyhzdHJlYW0pO1xuICBpZiAoc3RhdGUuZmxvd2luZyAmJiAhc3RhdGUucmVhZGluZykgc3RyZWFtLnJlYWQoMCk7XG59XG5cblJlYWRhYmxlLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ2NhbGwgcGF1c2UgZmxvd2luZz0laicsIHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZyk7XG5cbiAgaWYgKHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZyAhPT0gZmFsc2UpIHtcbiAgICBkZWJ1ZygncGF1c2UnKTtcbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXQoJ3BhdXNlJyk7XG4gIH1cblxuICB0aGlzLl9yZWFkYWJsZVN0YXRlLnBhdXNlZCA9IHRydWU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gZmxvdyhzdHJlYW0pIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuICBkZWJ1ZygnZmxvdycsIHN0YXRlLmZsb3dpbmcpO1xuXG4gIHdoaWxlIChzdGF0ZS5mbG93aW5nICYmIHN0cmVhbS5yZWFkKCkgIT09IG51bGwpIHtcbiAgICA7XG4gIH1cbn0gLy8gd3JhcCBhbiBvbGQtc3R5bGUgc3RyZWFtIGFzIHRoZSBhc3luYyBkYXRhIHNvdXJjZS5cbi8vIFRoaXMgaXMgKm5vdCogcGFydCBvZiB0aGUgcmVhZGFibGUgc3RyZWFtIGludGVyZmFjZS5cbi8vIEl0IGlzIGFuIHVnbHkgdW5mb3J0dW5hdGUgbWVzcyBvZiBoaXN0b3J5LlxuXG5cblJlYWRhYmxlLnByb3RvdHlwZS53cmFwID0gZnVuY3Rpb24gKHN0cmVhbSkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG4gIHZhciBwYXVzZWQgPSBmYWxzZTtcbiAgc3RyZWFtLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgZGVidWcoJ3dyYXBwZWQgZW5kJyk7XG5cbiAgICBpZiAoc3RhdGUuZGVjb2RlciAmJiAhc3RhdGUuZW5kZWQpIHtcbiAgICAgIHZhciBjaHVuayA9IHN0YXRlLmRlY29kZXIuZW5kKCk7XG4gICAgICBpZiAoY2h1bmsgJiYgY2h1bmsubGVuZ3RoKSBfdGhpcy5wdXNoKGNodW5rKTtcbiAgICB9XG5cbiAgICBfdGhpcy5wdXNoKG51bGwpO1xuICB9KTtcbiAgc3RyZWFtLm9uKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XG4gICAgZGVidWcoJ3dyYXBwZWQgZGF0YScpO1xuICAgIGlmIChzdGF0ZS5kZWNvZGVyKSBjaHVuayA9IHN0YXRlLmRlY29kZXIud3JpdGUoY2h1bmspOyAvLyBkb24ndCBza2lwIG92ZXIgZmFsc3kgdmFsdWVzIGluIG9iamVjdE1vZGVcblxuICAgIGlmIChzdGF0ZS5vYmplY3RNb2RlICYmIChjaHVuayA9PT0gbnVsbCB8fCBjaHVuayA9PT0gdW5kZWZpbmVkKSkgcmV0dXJuO2Vsc2UgaWYgKCFzdGF0ZS5vYmplY3RNb2RlICYmICghY2h1bmsgfHwgIWNodW5rLmxlbmd0aCkpIHJldHVybjtcblxuICAgIHZhciByZXQgPSBfdGhpcy5wdXNoKGNodW5rKTtcblxuICAgIGlmICghcmV0KSB7XG4gICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgc3RyZWFtLnBhdXNlKCk7XG4gICAgfVxuICB9KTsgLy8gcHJveHkgYWxsIHRoZSBvdGhlciBtZXRob2RzLlxuICAvLyBpbXBvcnRhbnQgd2hlbiB3cmFwcGluZyBmaWx0ZXJzIGFuZCBkdXBsZXhlcy5cblxuICBmb3IgKHZhciBpIGluIHN0cmVhbSkge1xuICAgIGlmICh0aGlzW2ldID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIHN0cmVhbVtpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpc1tpXSA9IGZ1bmN0aW9uIG1ldGhvZFdyYXAobWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBtZXRob2RXcmFwUmV0dXJuRnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHN0cmVhbVttZXRob2RdLmFwcGx5KHN0cmVhbSwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0oaSk7XG4gICAgfVxuICB9IC8vIHByb3h5IGNlcnRhaW4gaW1wb3J0YW50IGV2ZW50cy5cblxuXG4gIGZvciAodmFyIG4gPSAwOyBuIDwga1Byb3h5RXZlbnRzLmxlbmd0aDsgbisrKSB7XG4gICAgc3RyZWFtLm9uKGtQcm94eUV2ZW50c1tuXSwgdGhpcy5lbWl0LmJpbmQodGhpcywga1Byb3h5RXZlbnRzW25dKSk7XG4gIH0gLy8gd2hlbiB3ZSB0cnkgdG8gY29uc3VtZSBzb21lIG1vcmUgYnl0ZXMsIHNpbXBseSB1bnBhdXNlIHRoZVxuICAvLyB1bmRlcmx5aW5nIHN0cmVhbS5cblxuXG4gIHRoaXMuX3JlYWQgPSBmdW5jdGlvbiAobikge1xuICAgIGRlYnVnKCd3cmFwcGVkIF9yZWFkJywgbik7XG5cbiAgICBpZiAocGF1c2VkKSB7XG4gICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgIHN0cmVhbS5yZXN1bWUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5pZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWFkYWJsZS5wcm90b3R5cGVbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChjcmVhdGVSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY3JlYXRlUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9zdHJlYW1zL2FzeW5jX2l0ZXJhdG9yJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZVJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvcih0aGlzKTtcbiAgfTtcbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlLnByb3RvdHlwZSwgJ3JlYWRhYmxlSGlnaFdhdGVyTWFyaycsIHtcbiAgLy8gbWFraW5nIGl0IGV4cGxpY2l0IHRoaXMgcHJvcGVydHkgaXMgbm90IGVudW1lcmFibGVcbiAgLy8gYmVjYXVzZSBvdGhlcndpc2Ugc29tZSBwcm90b3R5cGUgbWFuaXB1bGF0aW9uIGluXG4gIC8vIHVzZXJsYW5kIHdpbGwgZmFpbFxuICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRhYmxlU3RhdGUuaGlnaFdhdGVyTWFyaztcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhZGFibGUucHJvdG90eXBlLCAncmVhZGFibGVCdWZmZXInLCB7XG4gIC8vIG1ha2luZyBpdCBleHBsaWNpdCB0aGlzIHByb3BlcnR5IGlzIG5vdCBlbnVtZXJhYmxlXG4gIC8vIGJlY2F1c2Ugb3RoZXJ3aXNlIHNvbWUgcHJvdG90eXBlIG1hbmlwdWxhdGlvbiBpblxuICAvLyB1c2VybGFuZCB3aWxsIGZhaWxcbiAgZW51bWVyYWJsZTogZmFsc2UsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9yZWFkYWJsZVN0YXRlICYmIHRoaXMuX3JlYWRhYmxlU3RhdGUuYnVmZmVyO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFkYWJsZS5wcm90b3R5cGUsICdyZWFkYWJsZUZsb3dpbmcnLCB7XG4gIC8vIG1ha2luZyBpdCBleHBsaWNpdCB0aGlzIHByb3BlcnR5IGlzIG5vdCBlbnVtZXJhYmxlXG4gIC8vIGJlY2F1c2Ugb3RoZXJ3aXNlIHNvbWUgcHJvdG90eXBlIG1hbmlwdWxhdGlvbiBpblxuICAvLyB1c2VybGFuZCB3aWxsIGZhaWxcbiAgZW51bWVyYWJsZTogZmFsc2UsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmc7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24gc2V0KHN0YXRlKSB7XG4gICAgaWYgKHRoaXMuX3JlYWRhYmxlU3RhdGUpIHtcbiAgICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZyA9IHN0YXRlO1xuICAgIH1cbiAgfVxufSk7IC8vIGV4cG9zZWQgZm9yIHRlc3RpbmcgcHVycG9zZXMgb25seS5cblxuUmVhZGFibGUuX2Zyb21MaXN0ID0gZnJvbUxpc3Q7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhZGFibGUucHJvdG90eXBlLCAncmVhZGFibGVMZW5ndGgnLCB7XG4gIC8vIG1ha2luZyBpdCBleHBsaWNpdCB0aGlzIHByb3BlcnR5IGlzIG5vdCBlbnVtZXJhYmxlXG4gIC8vIGJlY2F1c2Ugb3RoZXJ3aXNlIHNvbWUgcHJvdG90eXBlIG1hbmlwdWxhdGlvbiBpblxuICAvLyB1c2VybGFuZCB3aWxsIGZhaWxcbiAgZW51bWVyYWJsZTogZmFsc2UsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9yZWFkYWJsZVN0YXRlLmxlbmd0aDtcbiAgfVxufSk7IC8vIFBsdWNrIG9mZiBuIGJ5dGVzIGZyb20gYW4gYXJyYXkgb2YgYnVmZmVycy5cbi8vIExlbmd0aCBpcyB0aGUgY29tYmluZWQgbGVuZ3RocyBvZiBhbGwgdGhlIGJ1ZmZlcnMgaW4gdGhlIGxpc3QuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIGRlc2lnbmVkIHRvIGJlIGlubGluYWJsZSwgc28gcGxlYXNlIHRha2UgY2FyZSB3aGVuIG1ha2luZ1xuLy8gY2hhbmdlcyB0byB0aGUgZnVuY3Rpb24gYm9keS5cblxuZnVuY3Rpb24gZnJvbUxpc3Qobiwgc3RhdGUpIHtcbiAgLy8gbm90aGluZyBidWZmZXJlZFxuICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcbiAgdmFyIHJldDtcbiAgaWYgKHN0YXRlLm9iamVjdE1vZGUpIHJldCA9IHN0YXRlLmJ1ZmZlci5zaGlmdCgpO2Vsc2UgaWYgKCFuIHx8IG4gPj0gc3RhdGUubGVuZ3RoKSB7XG4gICAgLy8gcmVhZCBpdCBhbGwsIHRydW5jYXRlIHRoZSBsaXN0XG4gICAgaWYgKHN0YXRlLmRlY29kZXIpIHJldCA9IHN0YXRlLmJ1ZmZlci5qb2luKCcnKTtlbHNlIGlmIChzdGF0ZS5idWZmZXIubGVuZ3RoID09PSAxKSByZXQgPSBzdGF0ZS5idWZmZXIuZmlyc3QoKTtlbHNlIHJldCA9IHN0YXRlLmJ1ZmZlci5jb25jYXQoc3RhdGUubGVuZ3RoKTtcbiAgICBzdGF0ZS5idWZmZXIuY2xlYXIoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyByZWFkIHBhcnQgb2YgbGlzdFxuICAgIHJldCA9IHN0YXRlLmJ1ZmZlci5jb25zdW1lKG4sIHN0YXRlLmRlY29kZXIpO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIGVuZFJlYWRhYmxlKHN0cmVhbSkge1xuICB2YXIgc3RhdGUgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG4gIGRlYnVnKCdlbmRSZWFkYWJsZScsIHN0YXRlLmVuZEVtaXR0ZWQpO1xuXG4gIGlmICghc3RhdGUuZW5kRW1pdHRlZCkge1xuICAgIHN0YXRlLmVuZGVkID0gdHJ1ZTtcbiAgICBwcm9jZXNzLm5leHRUaWNrKGVuZFJlYWRhYmxlTlQsIHN0YXRlLCBzdHJlYW0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuZFJlYWRhYmxlTlQoc3RhdGUsIHN0cmVhbSkge1xuICBkZWJ1ZygnZW5kUmVhZGFibGVOVCcsIHN0YXRlLmVuZEVtaXR0ZWQsIHN0YXRlLmxlbmd0aCk7IC8vIENoZWNrIHRoYXQgd2UgZGlkbid0IGdldCBvbmUgbGFzdCB1bnNoaWZ0LlxuXG4gIGlmICghc3RhdGUuZW5kRW1pdHRlZCAmJiBzdGF0ZS5sZW5ndGggPT09IDApIHtcbiAgICBzdGF0ZS5lbmRFbWl0dGVkID0gdHJ1ZTtcbiAgICBzdHJlYW0ucmVhZGFibGUgPSBmYWxzZTtcbiAgICBzdHJlYW0uZW1pdCgnZW5kJyk7XG5cbiAgICBpZiAoc3RhdGUuYXV0b0Rlc3Ryb3kpIHtcbiAgICAgIC8vIEluIGNhc2Ugb2YgZHVwbGV4IHN0cmVhbXMgd2UgbmVlZCBhIHdheSB0byBkZXRlY3RcbiAgICAgIC8vIGlmIHRoZSB3cml0YWJsZSBzaWRlIGlzIHJlYWR5IGZvciBhdXRvRGVzdHJveSBhcyB3ZWxsXG4gICAgICB2YXIgd1N0YXRlID0gc3RyZWFtLl93cml0YWJsZVN0YXRlO1xuXG4gICAgICBpZiAoIXdTdGF0ZSB8fCB3U3RhdGUuYXV0b0Rlc3Ryb3kgJiYgd1N0YXRlLmZpbmlzaGVkKSB7XG4gICAgICAgIHN0cmVhbS5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlYWRhYmxlLmZyb20gPSBmdW5jdGlvbiAoaXRlcmFibGUsIG9wdHMpIHtcbiAgICBpZiAoZnJvbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmcm9tID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9zdHJlYW1zL2Zyb20nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnJvbShSZWFkYWJsZSwgaXRlcmFibGUsIG9wdHMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBpbmRleE9mKHhzLCB4KSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHhzW2ldID09PSB4KSByZXR1cm4gaTtcbiAgfVxuXG4gIHJldHVybiAtMTtcbn1cbn0pLmNhbGwodGhpcyl9KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCIuLi9lcnJvcnNcIjoxMixcIi4vX3N0cmVhbV9kdXBsZXhcIjoxMyxcIi4vaW50ZXJuYWwvc3RyZWFtcy9hc3luY19pdGVyYXRvclwiOjE4LFwiLi9pbnRlcm5hbC9zdHJlYW1zL2J1ZmZlcl9saXN0XCI6MTksXCIuL2ludGVybmFsL3N0cmVhbXMvZGVzdHJveVwiOjIwLFwiLi9pbnRlcm5hbC9zdHJlYW1zL2Zyb21cIjoyMixcIi4vaW50ZXJuYWwvc3RyZWFtcy9zdGF0ZVwiOjI0LFwiLi9pbnRlcm5hbC9zdHJlYW1zL3N0cmVhbVwiOjI1LFwiX3Byb2Nlc3NcIjo5LFwiYnVmZmVyXCI6NSxcImV2ZW50c1wiOjYsXCJpbmhlcml0c1wiOjgsXCJzdHJpbmdfZGVjb2Rlci9cIjoyNixcInV0aWxcIjo0fV0sMTY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4vLyBhIHRyYW5zZm9ybSBzdHJlYW0gaXMgYSByZWFkYWJsZS93cml0YWJsZSBzdHJlYW0gd2hlcmUgeW91IGRvXG4vLyBzb21ldGhpbmcgd2l0aCB0aGUgZGF0YS4gIFNvbWV0aW1lcyBpdCdzIGNhbGxlZCBhIFwiZmlsdGVyXCIsXG4vLyBidXQgdGhhdCdzIG5vdCBhIGdyZWF0IG5hbWUgZm9yIGl0LCBzaW5jZSB0aGF0IGltcGxpZXMgYSB0aGluZyB3aGVyZVxuLy8gc29tZSBiaXRzIHBhc3MgdGhyb3VnaCwgYW5kIG90aGVycyBhcmUgc2ltcGx5IGlnbm9yZWQuICAoVGhhdCB3b3VsZFxuLy8gYmUgYSB2YWxpZCBleGFtcGxlIG9mIGEgdHJhbnNmb3JtLCBvZiBjb3Vyc2UuKVxuLy9cbi8vIFdoaWxlIHRoZSBvdXRwdXQgaXMgY2F1c2FsbHkgcmVsYXRlZCB0byB0aGUgaW5wdXQsIGl0J3Mgbm90IGFcbi8vIG5lY2Vzc2FyaWx5IHN5bW1ldHJpYyBvciBzeW5jaHJvbm91cyB0cmFuc2Zvcm1hdGlvbi4gIEZvciBleGFtcGxlLFxuLy8gYSB6bGliIHN0cmVhbSBtaWdodCB0YWtlIG11bHRpcGxlIHBsYWluLXRleHQgd3JpdGVzKCksIGFuZCB0aGVuXG4vLyBlbWl0IGEgc2luZ2xlIGNvbXByZXNzZWQgY2h1bmsgc29tZSB0aW1lIGluIHRoZSBmdXR1cmUuXG4vL1xuLy8gSGVyZSdzIGhvdyB0aGlzIHdvcmtzOlxuLy9cbi8vIFRoZSBUcmFuc2Zvcm0gc3RyZWFtIGhhcyBhbGwgdGhlIGFzcGVjdHMgb2YgdGhlIHJlYWRhYmxlIGFuZCB3cml0YWJsZVxuLy8gc3RyZWFtIGNsYXNzZXMuICBXaGVuIHlvdSB3cml0ZShjaHVuayksIHRoYXQgY2FsbHMgX3dyaXRlKGNodW5rLGNiKVxuLy8gaW50ZXJuYWxseSwgYW5kIHJldHVybnMgZmFsc2UgaWYgdGhlcmUncyBhIGxvdCBvZiBwZW5kaW5nIHdyaXRlc1xuLy8gYnVmZmVyZWQgdXAuICBXaGVuIHlvdSBjYWxsIHJlYWQoKSwgdGhhdCBjYWxscyBfcmVhZChuKSB1bnRpbFxuLy8gdGhlcmUncyBlbm91Z2ggcGVuZGluZyByZWFkYWJsZSBkYXRhIGJ1ZmZlcmVkIHVwLlxuLy9cbi8vIEluIGEgdHJhbnNmb3JtIHN0cmVhbSwgdGhlIHdyaXR0ZW4gZGF0YSBpcyBwbGFjZWQgaW4gYSBidWZmZXIuICBXaGVuXG4vLyBfcmVhZChuKSBpcyBjYWxsZWQsIGl0IHRyYW5zZm9ybXMgdGhlIHF1ZXVlZCB1cCBkYXRhLCBjYWxsaW5nIHRoZVxuLy8gYnVmZmVyZWQgX3dyaXRlIGNiJ3MgYXMgaXQgY29uc3VtZXMgY2h1bmtzLiAgSWYgY29uc3VtaW5nIGEgc2luZ2xlXG4vLyB3cml0dGVuIGNodW5rIHdvdWxkIHJlc3VsdCBpbiBtdWx0aXBsZSBvdXRwdXQgY2h1bmtzLCB0aGVuIHRoZSBmaXJzdFxuLy8gb3V0cHV0dGVkIGJpdCBjYWxscyB0aGUgcmVhZGNiLCBhbmQgc3Vic2VxdWVudCBjaHVua3MganVzdCBnbyBpbnRvXG4vLyB0aGUgcmVhZCBidWZmZXIsIGFuZCB3aWxsIGNhdXNlIGl0IHRvIGVtaXQgJ3JlYWRhYmxlJyBpZiBuZWNlc3NhcnkuXG4vL1xuLy8gVGhpcyB3YXksIGJhY2stcHJlc3N1cmUgaXMgYWN0dWFsbHkgZGV0ZXJtaW5lZCBieSB0aGUgcmVhZGluZyBzaWRlLFxuLy8gc2luY2UgX3JlYWQgaGFzIHRvIGJlIGNhbGxlZCB0byBzdGFydCBwcm9jZXNzaW5nIGEgbmV3IGNodW5rLiAgSG93ZXZlcixcbi8vIGEgcGF0aG9sb2dpY2FsIGluZmxhdGUgdHlwZSBvZiB0cmFuc2Zvcm0gY2FuIGNhdXNlIGV4Y2Vzc2l2ZSBidWZmZXJpbmdcbi8vIGhlcmUuICBGb3IgZXhhbXBsZSwgaW1hZ2luZSBhIHN0cmVhbSB3aGVyZSBldmVyeSBieXRlIG9mIGlucHV0IGlzXG4vLyBpbnRlcnByZXRlZCBhcyBhbiBpbnRlZ2VyIGZyb20gMC0yNTUsIGFuZCB0aGVuIHJlc3VsdHMgaW4gdGhhdCBtYW55XG4vLyBieXRlcyBvZiBvdXRwdXQuICBXcml0aW5nIHRoZSA0IGJ5dGVzIHtmZixmZixmZixmZn0gd291bGQgcmVzdWx0IGluXG4vLyAxa2Igb2YgZGF0YSBiZWluZyBvdXRwdXQuICBJbiB0aGlzIGNhc2UsIHlvdSBjb3VsZCB3cml0ZSBhIHZlcnkgc21hbGxcbi8vIGFtb3VudCBvZiBpbnB1dCwgYW5kIGVuZCB1cCB3aXRoIGEgdmVyeSBsYXJnZSBhbW91bnQgb2Ygb3V0cHV0LiAgSW5cbi8vIHN1Y2ggYSBwYXRob2xvZ2ljYWwgaW5mbGF0aW5nIG1lY2hhbmlzbSwgdGhlcmUnZCBiZSBubyB3YXkgdG8gdGVsbFxuLy8gdGhlIHN5c3RlbSB0byBzdG9wIGRvaW5nIHRoZSB0cmFuc2Zvcm0uICBBIHNpbmdsZSA0TUIgd3JpdGUgY291bGRcbi8vIGNhdXNlIHRoZSBzeXN0ZW0gdG8gcnVuIG91dCBvZiBtZW1vcnkuXG4vL1xuLy8gSG93ZXZlciwgZXZlbiBpbiBzdWNoIGEgcGF0aG9sb2dpY2FsIGNhc2UsIG9ubHkgYSBzaW5nbGUgd3JpdHRlbiBjaHVua1xuLy8gd291bGQgYmUgY29uc3VtZWQsIGFuZCB0aGVuIHRoZSByZXN0IHdvdWxkIHdhaXQgKHVuLXRyYW5zZm9ybWVkKSB1bnRpbFxuLy8gdGhlIHJlc3VsdHMgb2YgdGhlIHByZXZpb3VzIHRyYW5zZm9ybWVkIGNodW5rIHdlcmUgY29uc3VtZWQuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNmb3JtO1xuXG52YXIgX3JlcXVpcmUkY29kZXMgPSByZXF1aXJlKCcuLi9lcnJvcnMnKS5jb2RlcyxcbiAgICBFUlJfTUVUSE9EX05PVF9JTVBMRU1FTlRFRCA9IF9yZXF1aXJlJGNvZGVzLkVSUl9NRVRIT0RfTk9UX0lNUExFTUVOVEVELFxuICAgIEVSUl9NVUxUSVBMRV9DQUxMQkFDSyA9IF9yZXF1aXJlJGNvZGVzLkVSUl9NVUxUSVBMRV9DQUxMQkFDSyxcbiAgICBFUlJfVFJBTlNGT1JNX0FMUkVBRFlfVFJBTlNGT1JNSU5HID0gX3JlcXVpcmUkY29kZXMuRVJSX1RSQU5TRk9STV9BTFJFQURZX1RSQU5TRk9STUlORyxcbiAgICBFUlJfVFJBTlNGT1JNX1dJVEhfTEVOR1RIXzAgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfVFJBTlNGT1JNX1dJVEhfTEVOR1RIXzA7XG5cbnZhciBEdXBsZXggPSByZXF1aXJlKCcuL19zdHJlYW1fZHVwbGV4Jyk7XG5cbnJlcXVpcmUoJ2luaGVyaXRzJykoVHJhbnNmb3JtLCBEdXBsZXgpO1xuXG5mdW5jdGlvbiBhZnRlclRyYW5zZm9ybShlciwgZGF0YSkge1xuICB2YXIgdHMgPSB0aGlzLl90cmFuc2Zvcm1TdGF0ZTtcbiAgdHMudHJhbnNmb3JtaW5nID0gZmFsc2U7XG4gIHZhciBjYiA9IHRzLndyaXRlY2I7XG5cbiAgaWYgKGNiID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdCgnZXJyb3InLCBuZXcgRVJSX01VTFRJUExFX0NBTExCQUNLKCkpO1xuICB9XG5cbiAgdHMud3JpdGVjaHVuayA9IG51bGw7XG4gIHRzLndyaXRlY2IgPSBudWxsO1xuICBpZiAoZGF0YSAhPSBudWxsKSAvLyBzaW5nbGUgZXF1YWxzIGNoZWNrIGZvciBib3RoIGBudWxsYCBhbmQgYHVuZGVmaW5lZGBcbiAgICB0aGlzLnB1c2goZGF0YSk7XG4gIGNiKGVyKTtcbiAgdmFyIHJzID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgcnMucmVhZGluZyA9IGZhbHNlO1xuXG4gIGlmIChycy5uZWVkUmVhZGFibGUgfHwgcnMubGVuZ3RoIDwgcnMuaGlnaFdhdGVyTWFyaykge1xuICAgIHRoaXMuX3JlYWQocnMuaGlnaFdhdGVyTWFyayk7XG4gIH1cbn1cblxuZnVuY3Rpb24gVHJhbnNmb3JtKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFRyYW5zZm9ybSkpIHJldHVybiBuZXcgVHJhbnNmb3JtKG9wdGlvbnMpO1xuICBEdXBsZXguY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgdGhpcy5fdHJhbnNmb3JtU3RhdGUgPSB7XG4gICAgYWZ0ZXJUcmFuc2Zvcm06IGFmdGVyVHJhbnNmb3JtLmJpbmQodGhpcyksXG4gICAgbmVlZFRyYW5zZm9ybTogZmFsc2UsXG4gICAgdHJhbnNmb3JtaW5nOiBmYWxzZSxcbiAgICB3cml0ZWNiOiBudWxsLFxuICAgIHdyaXRlY2h1bms6IG51bGwsXG4gICAgd3JpdGVlbmNvZGluZzogbnVsbFxuICB9OyAvLyBzdGFydCBvdXQgYXNraW5nIGZvciBhIHJlYWRhYmxlIGV2ZW50IG9uY2UgZGF0YSBpcyB0cmFuc2Zvcm1lZC5cblxuICB0aGlzLl9yZWFkYWJsZVN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7IC8vIHdlIGhhdmUgaW1wbGVtZW50ZWQgdGhlIF9yZWFkIG1ldGhvZCwgYW5kIGRvbmUgdGhlIG90aGVyIHRoaW5nc1xuICAvLyB0aGF0IFJlYWRhYmxlIHdhbnRzIGJlZm9yZSB0aGUgZmlyc3QgX3JlYWQgY2FsbCwgc28gdW5zZXQgdGhlXG4gIC8vIHN5bmMgZ3VhcmQgZmxhZy5cblxuICB0aGlzLl9yZWFkYWJsZVN0YXRlLnN5bmMgPSBmYWxzZTtcblxuICBpZiAob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy50cmFuc2Zvcm0gPT09ICdmdW5jdGlvbicpIHRoaXMuX3RyYW5zZm9ybSA9IG9wdGlvbnMudHJhbnNmb3JtO1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5mbHVzaCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fZmx1c2ggPSBvcHRpb25zLmZsdXNoO1xuICB9IC8vIFdoZW4gdGhlIHdyaXRhYmxlIHNpZGUgZmluaXNoZXMsIHRoZW4gZmx1c2ggb3V0IGFueXRoaW5nIHJlbWFpbmluZy5cblxuXG4gIHRoaXMub24oJ3ByZWZpbmlzaCcsIHByZWZpbmlzaCk7XG59XG5cbmZ1bmN0aW9uIHByZWZpbmlzaCgpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBpZiAodHlwZW9mIHRoaXMuX2ZsdXNoID09PSAnZnVuY3Rpb24nICYmICF0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZCkge1xuICAgIHRoaXMuX2ZsdXNoKGZ1bmN0aW9uIChlciwgZGF0YSkge1xuICAgICAgZG9uZShfdGhpcywgZXIsIGRhdGEpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGRvbmUodGhpcywgbnVsbCwgbnVsbCk7XG4gIH1cbn1cblxuVHJhbnNmb3JtLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZykge1xuICB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5uZWVkVHJhbnNmb3JtID0gZmFsc2U7XG4gIHJldHVybiBEdXBsZXgucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZW5jb2RpbmcpO1xufTsgLy8gVGhpcyBpcyB0aGUgcGFydCB3aGVyZSB5b3UgZG8gc3R1ZmYhXG4vLyBvdmVycmlkZSB0aGlzIGZ1bmN0aW9uIGluIGltcGxlbWVudGF0aW9uIGNsYXNzZXMuXG4vLyAnY2h1bmsnIGlzIGFuIGlucHV0IGNodW5rLlxuLy9cbi8vIENhbGwgYHB1c2gobmV3Q2h1bmspYCB0byBwYXNzIGFsb25nIHRyYW5zZm9ybWVkIG91dHB1dFxuLy8gdG8gdGhlIHJlYWRhYmxlIHNpZGUuICBZb3UgbWF5IGNhbGwgJ3B1c2gnIHplcm8gb3IgbW9yZSB0aW1lcy5cbi8vXG4vLyBDYWxsIGBjYihlcnIpYCB3aGVuIHlvdSBhcmUgZG9uZSB3aXRoIHRoaXMgY2h1bmsuICBJZiB5b3UgcGFzc1xuLy8gYW4gZXJyb3IsIHRoZW4gdGhhdCdsbCBwdXQgdGhlIGh1cnQgb24gdGhlIHdob2xlIG9wZXJhdGlvbi4gIElmIHlvdVxuLy8gbmV2ZXIgY2FsbCBjYigpLCB0aGVuIHlvdSdsbCBuZXZlciBnZXQgYW5vdGhlciBjaHVuay5cblxuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLl90cmFuc2Zvcm0gPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBjYihuZXcgRVJSX01FVEhPRF9OT1RfSU1QTEVNRU5URUQoJ190cmFuc2Zvcm0oKScpKTtcbn07XG5cblRyYW5zZm9ybS5wcm90b3R5cGUuX3dyaXRlID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdmFyIHRzID0gdGhpcy5fdHJhbnNmb3JtU3RhdGU7XG4gIHRzLndyaXRlY2IgPSBjYjtcbiAgdHMud3JpdGVjaHVuayA9IGNodW5rO1xuICB0cy53cml0ZWVuY29kaW5nID0gZW5jb2Rpbmc7XG5cbiAgaWYgKCF0cy50cmFuc2Zvcm1pbmcpIHtcbiAgICB2YXIgcnMgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICAgIGlmICh0cy5uZWVkVHJhbnNmb3JtIHx8IHJzLm5lZWRSZWFkYWJsZSB8fCBycy5sZW5ndGggPCBycy5oaWdoV2F0ZXJNYXJrKSB0aGlzLl9yZWFkKHJzLmhpZ2hXYXRlck1hcmspO1xuICB9XG59OyAvLyBEb2Vzbid0IG1hdHRlciB3aGF0IHRoZSBhcmdzIGFyZSBoZXJlLlxuLy8gX3RyYW5zZm9ybSBkb2VzIGFsbCB0aGUgd29yay5cbi8vIFRoYXQgd2UgZ290IGhlcmUgbWVhbnMgdGhhdCB0aGUgcmVhZGFibGUgc2lkZSB3YW50cyBtb3JlIGRhdGEuXG5cblxuVHJhbnNmb3JtLnByb3RvdHlwZS5fcmVhZCA9IGZ1bmN0aW9uIChuKSB7XG4gIHZhciB0cyA9IHRoaXMuX3RyYW5zZm9ybVN0YXRlO1xuXG4gIGlmICh0cy53cml0ZWNodW5rICE9PSBudWxsICYmICF0cy50cmFuc2Zvcm1pbmcpIHtcbiAgICB0cy50cmFuc2Zvcm1pbmcgPSB0cnVlO1xuXG4gICAgdGhpcy5fdHJhbnNmb3JtKHRzLndyaXRlY2h1bmssIHRzLndyaXRlZW5jb2RpbmcsIHRzLmFmdGVyVHJhbnNmb3JtKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBtYXJrIHRoYXQgd2UgbmVlZCBhIHRyYW5zZm9ybSwgc28gdGhhdCBhbnkgZGF0YSB0aGF0IGNvbWVzIGluXG4gICAgLy8gd2lsbCBnZXQgcHJvY2Vzc2VkLCBub3cgdGhhdCB3ZSd2ZSBhc2tlZCBmb3IgaXQuXG4gICAgdHMubmVlZFRyYW5zZm9ybSA9IHRydWU7XG4gIH1cbn07XG5cblRyYW5zZm9ybS5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAoZXJyLCBjYikge1xuICBEdXBsZXgucHJvdG90eXBlLl9kZXN0cm95LmNhbGwodGhpcywgZXJyLCBmdW5jdGlvbiAoZXJyMikge1xuICAgIGNiKGVycjIpO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGRvbmUoc3RyZWFtLCBlciwgZGF0YSkge1xuICBpZiAoZXIpIHJldHVybiBzdHJlYW0uZW1pdCgnZXJyb3InLCBlcik7XG4gIGlmIChkYXRhICE9IG51bGwpIC8vIHNpbmdsZSBlcXVhbHMgY2hlY2sgZm9yIGJvdGggYG51bGxgIGFuZCBgdW5kZWZpbmVkYFxuICAgIHN0cmVhbS5wdXNoKGRhdGEpOyAvLyBUT0RPKEJyaWRnZUFSKTogV3JpdGUgYSB0ZXN0IGZvciB0aGVzZSB0d28gZXJyb3IgY2FzZXNcbiAgLy8gaWYgdGhlcmUncyBub3RoaW5nIGluIHRoZSB3cml0ZSBidWZmZXIsIHRoZW4gdGhhdCBtZWFuc1xuICAvLyB0aGF0IG5vdGhpbmcgbW9yZSB3aWxsIGV2ZXIgYmUgcHJvdmlkZWRcblxuICBpZiAoc3RyZWFtLl93cml0YWJsZVN0YXRlLmxlbmd0aCkgdGhyb3cgbmV3IEVSUl9UUkFOU0ZPUk1fV0lUSF9MRU5HVEhfMCgpO1xuICBpZiAoc3RyZWFtLl90cmFuc2Zvcm1TdGF0ZS50cmFuc2Zvcm1pbmcpIHRocm93IG5ldyBFUlJfVFJBTlNGT1JNX0FMUkVBRFlfVFJBTlNGT1JNSU5HKCk7XG4gIHJldHVybiBzdHJlYW0ucHVzaChudWxsKTtcbn1cbn0se1wiLi4vZXJyb3JzXCI6MTIsXCIuL19zdHJlYW1fZHVwbGV4XCI6MTMsXCJpbmhlcml0c1wiOjh9XSwxNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsKXsoZnVuY3Rpb24gKCl7XG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbi8vIEEgYml0IHNpbXBsZXIgdGhhbiByZWFkYWJsZSBzdHJlYW1zLlxuLy8gSW1wbGVtZW50IGFuIGFzeW5jIC5fd3JpdGUoY2h1bmssIGVuY29kaW5nLCBjYiksIGFuZCBpdCdsbCBoYW5kbGUgYWxsXG4vLyB0aGUgZHJhaW4gZXZlbnQgZW1pc3Npb24gYW5kIGJ1ZmZlcmluZy5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBXcml0YWJsZTtcbi8qIDxyZXBsYWNlbWVudD4gKi9cblxuZnVuY3Rpb24gV3JpdGVSZXEoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICB0aGlzLmNodW5rID0gY2h1bms7XG4gIHRoaXMuZW5jb2RpbmcgPSBlbmNvZGluZztcbiAgdGhpcy5jYWxsYmFjayA9IGNiO1xuICB0aGlzLm5leHQgPSBudWxsO1xufSAvLyBJdCBzZWVtcyBhIGxpbmtlZCBsaXN0IGJ1dCBpdCBpcyBub3Rcbi8vIHRoZXJlIHdpbGwgYmUgb25seSAyIG9mIHRoZXNlIGZvciBlYWNoIHN0cmVhbVxuXG5cbmZ1bmN0aW9uIENvcmtlZFJlcXVlc3Qoc3RhdGUpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB0aGlzLm5leHQgPSBudWxsO1xuICB0aGlzLmVudHJ5ID0gbnVsbDtcblxuICB0aGlzLmZpbmlzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICBvbkNvcmtlZEZpbmlzaChfdGhpcywgc3RhdGUpO1xuICB9O1xufVxuLyogPC9yZXBsYWNlbWVudD4gKi9cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cblxuXG52YXIgRHVwbGV4O1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbldyaXRhYmxlLldyaXRhYmxlU3RhdGUgPSBXcml0YWJsZVN0YXRlO1xuLyo8cmVwbGFjZW1lbnQ+Ki9cblxudmFyIGludGVybmFsVXRpbCA9IHtcbiAgZGVwcmVjYXRlOiByZXF1aXJlKCd1dGlsLWRlcHJlY2F0ZScpXG59O1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbi8qPHJlcGxhY2VtZW50PiovXG5cbnZhciBTdHJlYW0gPSByZXF1aXJlKCcuL2ludGVybmFsL3N0cmVhbXMvc3RyZWFtJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyO1xuXG52YXIgT3VyVWludDhBcnJheSA9IGdsb2JhbC5VaW50OEFycmF5IHx8IGZ1bmN0aW9uICgpIHt9O1xuXG5mdW5jdGlvbiBfdWludDhBcnJheVRvQnVmZmVyKGNodW5rKSB7XG4gIHJldHVybiBCdWZmZXIuZnJvbShjaHVuayk7XG59XG5cbmZ1bmN0aW9uIF9pc1VpbnQ4QXJyYXkob2JqKSB7XG4gIHJldHVybiBCdWZmZXIuaXNCdWZmZXIob2JqKSB8fCBvYmogaW5zdGFuY2VvZiBPdXJVaW50OEFycmF5O1xufVxuXG52YXIgZGVzdHJveUltcGwgPSByZXF1aXJlKCcuL2ludGVybmFsL3N0cmVhbXMvZGVzdHJveScpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuL2ludGVybmFsL3N0cmVhbXMvc3RhdGUnKSxcbiAgICBnZXRIaWdoV2F0ZXJNYXJrID0gX3JlcXVpcmUuZ2V0SGlnaFdhdGVyTWFyaztcblxudmFyIF9yZXF1aXJlJGNvZGVzID0gcmVxdWlyZSgnLi4vZXJyb3JzJykuY29kZXMsXG4gICAgRVJSX0lOVkFMSURfQVJHX1RZUEUgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfSU5WQUxJRF9BUkdfVFlQRSxcbiAgICBFUlJfTUVUSE9EX05PVF9JTVBMRU1FTlRFRCA9IF9yZXF1aXJlJGNvZGVzLkVSUl9NRVRIT0RfTk9UX0lNUExFTUVOVEVELFxuICAgIEVSUl9NVUxUSVBMRV9DQUxMQkFDSyA9IF9yZXF1aXJlJGNvZGVzLkVSUl9NVUxUSVBMRV9DQUxMQkFDSyxcbiAgICBFUlJfU1RSRUFNX0NBTk5PVF9QSVBFID0gX3JlcXVpcmUkY29kZXMuRVJSX1NUUkVBTV9DQU5OT1RfUElQRSxcbiAgICBFUlJfU1RSRUFNX0RFU1RST1lFRCA9IF9yZXF1aXJlJGNvZGVzLkVSUl9TVFJFQU1fREVTVFJPWUVELFxuICAgIEVSUl9TVFJFQU1fTlVMTF9WQUxVRVMgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfU1RSRUFNX05VTExfVkFMVUVTLFxuICAgIEVSUl9TVFJFQU1fV1JJVEVfQUZURVJfRU5EID0gX3JlcXVpcmUkY29kZXMuRVJSX1NUUkVBTV9XUklURV9BRlRFUl9FTkQsXG4gICAgRVJSX1VOS05PV05fRU5DT0RJTkcgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfVU5LTk9XTl9FTkNPRElORztcblxudmFyIGVycm9yT3JEZXN0cm95ID0gZGVzdHJveUltcGwuZXJyb3JPckRlc3Ryb3k7XG5cbnJlcXVpcmUoJ2luaGVyaXRzJykoV3JpdGFibGUsIFN0cmVhbSk7XG5cbmZ1bmN0aW9uIG5vcCgpIHt9XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RhdGUob3B0aW9ucywgc3RyZWFtLCBpc0R1cGxleCkge1xuICBEdXBsZXggPSBEdXBsZXggfHwgcmVxdWlyZSgnLi9fc3RyZWFtX2R1cGxleCcpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTsgLy8gRHVwbGV4IHN0cmVhbXMgYXJlIGJvdGggcmVhZGFibGUgYW5kIHdyaXRhYmxlLCBidXQgc2hhcmVcbiAgLy8gdGhlIHNhbWUgb3B0aW9ucyBvYmplY3QuXG4gIC8vIEhvd2V2ZXIsIHNvbWUgY2FzZXMgcmVxdWlyZSBzZXR0aW5nIG9wdGlvbnMgdG8gZGlmZmVyZW50XG4gIC8vIHZhbHVlcyBmb3IgdGhlIHJlYWRhYmxlIGFuZCB0aGUgd3JpdGFibGUgc2lkZXMgb2YgdGhlIGR1cGxleCBzdHJlYW0sXG4gIC8vIGUuZy4gb3B0aW9ucy5yZWFkYWJsZU9iamVjdE1vZGUgdnMuIG9wdGlvbnMud3JpdGFibGVPYmplY3RNb2RlLCBldGMuXG5cbiAgaWYgKHR5cGVvZiBpc0R1cGxleCAhPT0gJ2Jvb2xlYW4nKSBpc0R1cGxleCA9IHN0cmVhbSBpbnN0YW5jZW9mIER1cGxleDsgLy8gb2JqZWN0IHN0cmVhbSBmbGFnIHRvIGluZGljYXRlIHdoZXRoZXIgb3Igbm90IHRoaXMgc3RyZWFtXG4gIC8vIGNvbnRhaW5zIGJ1ZmZlcnMgb3Igb2JqZWN0cy5cblxuICB0aGlzLm9iamVjdE1vZGUgPSAhIW9wdGlvbnMub2JqZWN0TW9kZTtcbiAgaWYgKGlzRHVwbGV4KSB0aGlzLm9iamVjdE1vZGUgPSB0aGlzLm9iamVjdE1vZGUgfHwgISFvcHRpb25zLndyaXRhYmxlT2JqZWN0TW9kZTsgLy8gdGhlIHBvaW50IGF0IHdoaWNoIHdyaXRlKCkgc3RhcnRzIHJldHVybmluZyBmYWxzZVxuICAvLyBOb3RlOiAwIGlzIGEgdmFsaWQgdmFsdWUsIG1lYW5zIHRoYXQgd2UgYWx3YXlzIHJldHVybiBmYWxzZSBpZlxuICAvLyB0aGUgZW50aXJlIGJ1ZmZlciBpcyBub3QgZmx1c2hlZCBpbW1lZGlhdGVseSBvbiB3cml0ZSgpXG5cbiAgdGhpcy5oaWdoV2F0ZXJNYXJrID0gZ2V0SGlnaFdhdGVyTWFyayh0aGlzLCBvcHRpb25zLCAnd3JpdGFibGVIaWdoV2F0ZXJNYXJrJywgaXNEdXBsZXgpOyAvLyBpZiBfZmluYWwgaGFzIGJlZW4gY2FsbGVkXG5cbiAgdGhpcy5maW5hbENhbGxlZCA9IGZhbHNlOyAvLyBkcmFpbiBldmVudCBmbGFnLlxuXG4gIHRoaXMubmVlZERyYWluID0gZmFsc2U7IC8vIGF0IHRoZSBzdGFydCBvZiBjYWxsaW5nIGVuZCgpXG5cbiAgdGhpcy5lbmRpbmcgPSBmYWxzZTsgLy8gd2hlbiBlbmQoKSBoYXMgYmVlbiBjYWxsZWQsIGFuZCByZXR1cm5lZFxuXG4gIHRoaXMuZW5kZWQgPSBmYWxzZTsgLy8gd2hlbiAnZmluaXNoJyBpcyBlbWl0dGVkXG5cbiAgdGhpcy5maW5pc2hlZCA9IGZhbHNlOyAvLyBoYXMgaXQgYmVlbiBkZXN0cm95ZWRcblxuICB0aGlzLmRlc3Ryb3llZCA9IGZhbHNlOyAvLyBzaG91bGQgd2UgZGVjb2RlIHN0cmluZ3MgaW50byBidWZmZXJzIGJlZm9yZSBwYXNzaW5nIHRvIF93cml0ZT9cbiAgLy8gdGhpcyBpcyBoZXJlIHNvIHRoYXQgc29tZSBub2RlLWNvcmUgc3RyZWFtcyBjYW4gb3B0aW1pemUgc3RyaW5nXG4gIC8vIGhhbmRsaW5nIGF0IGEgbG93ZXIgbGV2ZWwuXG5cbiAgdmFyIG5vRGVjb2RlID0gb3B0aW9ucy5kZWNvZGVTdHJpbmdzID09PSBmYWxzZTtcbiAgdGhpcy5kZWNvZGVTdHJpbmdzID0gIW5vRGVjb2RlOyAvLyBDcnlwdG8gaXMga2luZCBvZiBvbGQgYW5kIGNydXN0eS4gIEhpc3RvcmljYWxseSwgaXRzIGRlZmF1bHQgc3RyaW5nXG4gIC8vIGVuY29kaW5nIGlzICdiaW5hcnknIHNvIHdlIGhhdmUgdG8gbWFrZSB0aGlzIGNvbmZpZ3VyYWJsZS5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIGluIHRoZSB1bml2ZXJzZSB1c2VzICd1dGY4JywgdGhvdWdoLlxuXG4gIHRoaXMuZGVmYXVsdEVuY29kaW5nID0gb3B0aW9ucy5kZWZhdWx0RW5jb2RpbmcgfHwgJ3V0ZjgnOyAvLyBub3QgYW4gYWN0dWFsIGJ1ZmZlciB3ZSBrZWVwIHRyYWNrIG9mLCBidXQgYSBtZWFzdXJlbWVudFxuICAvLyBvZiBob3cgbXVjaCB3ZSdyZSB3YWl0aW5nIHRvIGdldCBwdXNoZWQgdG8gc29tZSB1bmRlcmx5aW5nXG4gIC8vIHNvY2tldCBvciBmaWxlLlxuXG4gIHRoaXMubGVuZ3RoID0gMDsgLy8gYSBmbGFnIHRvIHNlZSB3aGVuIHdlJ3JlIGluIHRoZSBtaWRkbGUgb2YgYSB3cml0ZS5cblxuICB0aGlzLndyaXRpbmcgPSBmYWxzZTsgLy8gd2hlbiB0cnVlIGFsbCB3cml0ZXMgd2lsbCBiZSBidWZmZXJlZCB1bnRpbCAudW5jb3JrKCkgY2FsbFxuXG4gIHRoaXMuY29ya2VkID0gMDsgLy8gYSBmbGFnIHRvIGJlIGFibGUgdG8gdGVsbCBpZiB0aGUgb253cml0ZSBjYiBpcyBjYWxsZWQgaW1tZWRpYXRlbHksXG4gIC8vIG9yIG9uIGEgbGF0ZXIgdGljay4gIFdlIHNldCB0aGlzIHRvIHRydWUgYXQgZmlyc3QsIGJlY2F1c2UgYW55XG4gIC8vIGFjdGlvbnMgdGhhdCBzaG91bGRuJ3QgaGFwcGVuIHVudGlsIFwibGF0ZXJcIiBzaG91bGQgZ2VuZXJhbGx5IGFsc29cbiAgLy8gbm90IGhhcHBlbiBiZWZvcmUgdGhlIGZpcnN0IHdyaXRlIGNhbGwuXG5cbiAgdGhpcy5zeW5jID0gdHJ1ZTsgLy8gYSBmbGFnIHRvIGtub3cgaWYgd2UncmUgcHJvY2Vzc2luZyBwcmV2aW91c2x5IGJ1ZmZlcmVkIGl0ZW1zLCB3aGljaFxuICAvLyBtYXkgY2FsbCB0aGUgX3dyaXRlKCkgY2FsbGJhY2sgaW4gdGhlIHNhbWUgdGljaywgc28gdGhhdCB3ZSBkb24ndFxuICAvLyBlbmQgdXAgaW4gYW4gb3ZlcmxhcHBlZCBvbndyaXRlIHNpdHVhdGlvbi5cblxuICB0aGlzLmJ1ZmZlclByb2Nlc3NpbmcgPSBmYWxzZTsgLy8gdGhlIGNhbGxiYWNrIHRoYXQncyBwYXNzZWQgdG8gX3dyaXRlKGNodW5rLGNiKVxuXG4gIHRoaXMub253cml0ZSA9IGZ1bmN0aW9uIChlcikge1xuICAgIG9ud3JpdGUoc3RyZWFtLCBlcik7XG4gIH07IC8vIHRoZSBjYWxsYmFjayB0aGF0IHRoZSB1c2VyIHN1cHBsaWVzIHRvIHdyaXRlKGNodW5rLGVuY29kaW5nLGNiKVxuXG5cbiAgdGhpcy53cml0ZWNiID0gbnVsbDsgLy8gdGhlIGFtb3VudCB0aGF0IGlzIGJlaW5nIHdyaXR0ZW4gd2hlbiBfd3JpdGUgaXMgY2FsbGVkLlxuXG4gIHRoaXMud3JpdGVsZW4gPSAwO1xuICB0aGlzLmJ1ZmZlcmVkUmVxdWVzdCA9IG51bGw7XG4gIHRoaXMubGFzdEJ1ZmZlcmVkUmVxdWVzdCA9IG51bGw7IC8vIG51bWJlciBvZiBwZW5kaW5nIHVzZXItc3VwcGxpZWQgd3JpdGUgY2FsbGJhY2tzXG4gIC8vIHRoaXMgbXVzdCBiZSAwIGJlZm9yZSAnZmluaXNoJyBjYW4gYmUgZW1pdHRlZFxuXG4gIHRoaXMucGVuZGluZ2NiID0gMDsgLy8gZW1pdCBwcmVmaW5pc2ggaWYgdGhlIG9ubHkgdGhpbmcgd2UncmUgd2FpdGluZyBmb3IgaXMgX3dyaXRlIGNic1xuICAvLyBUaGlzIGlzIHJlbGV2YW50IGZvciBzeW5jaHJvbm91cyBUcmFuc2Zvcm0gc3RyZWFtc1xuXG4gIHRoaXMucHJlZmluaXNoZWQgPSBmYWxzZTsgLy8gVHJ1ZSBpZiB0aGUgZXJyb3Igd2FzIGFscmVhZHkgZW1pdHRlZCBhbmQgc2hvdWxkIG5vdCBiZSB0aHJvd24gYWdhaW5cblxuICB0aGlzLmVycm9yRW1pdHRlZCA9IGZhbHNlOyAvLyBTaG91bGQgY2xvc2UgYmUgZW1pdHRlZCBvbiBkZXN0cm95LiBEZWZhdWx0cyB0byB0cnVlLlxuXG4gIHRoaXMuZW1pdENsb3NlID0gb3B0aW9ucy5lbWl0Q2xvc2UgIT09IGZhbHNlOyAvLyBTaG91bGQgLmRlc3Ryb3koKSBiZSBjYWxsZWQgYWZ0ZXIgJ2ZpbmlzaCcgKGFuZCBwb3RlbnRpYWxseSAnZW5kJylcblxuICB0aGlzLmF1dG9EZXN0cm95ID0gISFvcHRpb25zLmF1dG9EZXN0cm95OyAvLyBjb3VudCBidWZmZXJlZCByZXF1ZXN0c1xuXG4gIHRoaXMuYnVmZmVyZWRSZXF1ZXN0Q291bnQgPSAwOyAvLyBhbGxvY2F0ZSB0aGUgZmlyc3QgQ29ya2VkUmVxdWVzdCwgdGhlcmUgaXMgYWx3YXlzXG4gIC8vIG9uZSBhbGxvY2F0ZWQgYW5kIGZyZWUgdG8gdXNlLCBhbmQgd2UgbWFpbnRhaW4gYXQgbW9zdCB0d29cblxuICB0aGlzLmNvcmtlZFJlcXVlc3RzRnJlZSA9IG5ldyBDb3JrZWRSZXF1ZXN0KHRoaXMpO1xufVxuXG5Xcml0YWJsZVN0YXRlLnByb3RvdHlwZS5nZXRCdWZmZXIgPSBmdW5jdGlvbiBnZXRCdWZmZXIoKSB7XG4gIHZhciBjdXJyZW50ID0gdGhpcy5idWZmZXJlZFJlcXVlc3Q7XG4gIHZhciBvdXQgPSBbXTtcblxuICB3aGlsZSAoY3VycmVudCkge1xuICAgIG91dC5wdXNoKGN1cnJlbnQpO1xuICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JpdGFibGVTdGF0ZS5wcm90b3R5cGUsICdidWZmZXInLCB7XG4gICAgICBnZXQ6IGludGVybmFsVXRpbC5kZXByZWNhdGUoZnVuY3Rpb24gd3JpdGFibGVTdGF0ZUJ1ZmZlckdldHRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnVmZmVyKCk7XG4gICAgICB9LCAnX3dyaXRhYmxlU3RhdGUuYnVmZmVyIGlzIGRlcHJlY2F0ZWQuIFVzZSBfd3JpdGFibGVTdGF0ZS5nZXRCdWZmZXIgJyArICdpbnN0ZWFkLicsICdERVAwMDAzJylcbiAgICB9KTtcbiAgfSBjYXRjaCAoXykge31cbn0pKCk7IC8vIFRlc3QgX3dyaXRhYmxlU3RhdGUgZm9yIGluaGVyaXRhbmNlIHRvIGFjY291bnQgZm9yIER1cGxleCBzdHJlYW1zLFxuLy8gd2hvc2UgcHJvdG90eXBlIGNoYWluIG9ubHkgcG9pbnRzIHRvIFJlYWRhYmxlLlxuXG5cbnZhciByZWFsSGFzSW5zdGFuY2U7XG5cbmlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5oYXNJbnN0YW5jZSAmJiB0eXBlb2YgRnVuY3Rpb24ucHJvdG90eXBlW1N5bWJvbC5oYXNJbnN0YW5jZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgcmVhbEhhc0luc3RhbmNlID0gRnVuY3Rpb24ucHJvdG90eXBlW1N5bWJvbC5oYXNJbnN0YW5jZV07XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXcml0YWJsZSwgU3ltYm9sLmhhc0luc3RhbmNlLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKG9iamVjdCkge1xuICAgICAgaWYgKHJlYWxIYXNJbnN0YW5jZS5jYWxsKHRoaXMsIG9iamVjdCkpIHJldHVybiB0cnVlO1xuICAgICAgaWYgKHRoaXMgIT09IFdyaXRhYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gb2JqZWN0ICYmIG9iamVjdC5fd3JpdGFibGVTdGF0ZSBpbnN0YW5jZW9mIFdyaXRhYmxlU3RhdGU7XG4gICAgfVxuICB9KTtcbn0gZWxzZSB7XG4gIHJlYWxIYXNJbnN0YW5jZSA9IGZ1bmN0aW9uIHJlYWxIYXNJbnN0YW5jZShvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgdGhpcztcbiAgfTtcbn1cblxuZnVuY3Rpb24gV3JpdGFibGUob3B0aW9ucykge1xuICBEdXBsZXggPSBEdXBsZXggfHwgcmVxdWlyZSgnLi9fc3RyZWFtX2R1cGxleCcpOyAvLyBXcml0YWJsZSBjdG9yIGlzIGFwcGxpZWQgdG8gRHVwbGV4ZXMsIHRvby5cbiAgLy8gYHJlYWxIYXNJbnN0YW5jZWAgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgdXNpbmcgcGxhaW4gYGluc3RhbmNlb2ZgXG4gIC8vIHdvdWxkIHJldHVybiBmYWxzZSwgYXMgbm8gYF93cml0YWJsZVN0YXRlYCBwcm9wZXJ0eSBpcyBhdHRhY2hlZC5cbiAgLy8gVHJ5aW5nIHRvIHVzZSB0aGUgY3VzdG9tIGBpbnN0YW5jZW9mYCBmb3IgV3JpdGFibGUgaGVyZSB3aWxsIGFsc28gYnJlYWsgdGhlXG4gIC8vIE5vZGUuanMgTGF6eVRyYW5zZm9ybSBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaGFzIGEgbm9uLXRyaXZpYWwgZ2V0dGVyIGZvclxuICAvLyBgX3dyaXRhYmxlU3RhdGVgIHRoYXQgd291bGQgbGVhZCB0byBpbmZpbml0ZSByZWN1cnNpb24uXG4gIC8vIENoZWNraW5nIGZvciBhIFN0cmVhbS5EdXBsZXggaW5zdGFuY2UgaXMgZmFzdGVyIGhlcmUgaW5zdGVhZCBvZiBpbnNpZGVcbiAgLy8gdGhlIFdyaXRhYmxlU3RhdGUgY29uc3RydWN0b3IsIGF0IGxlYXN0IHdpdGggVjggNi41XG5cbiAgdmFyIGlzRHVwbGV4ID0gdGhpcyBpbnN0YW5jZW9mIER1cGxleDtcbiAgaWYgKCFpc0R1cGxleCAmJiAhcmVhbEhhc0luc3RhbmNlLmNhbGwoV3JpdGFibGUsIHRoaXMpKSByZXR1cm4gbmV3IFdyaXRhYmxlKG9wdGlvbnMpO1xuICB0aGlzLl93cml0YWJsZVN0YXRlID0gbmV3IFdyaXRhYmxlU3RhdGUob3B0aW9ucywgdGhpcywgaXNEdXBsZXgpOyAvLyBsZWdhY3kuXG5cbiAgdGhpcy53cml0YWJsZSA9IHRydWU7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMud3JpdGUgPT09ICdmdW5jdGlvbicpIHRoaXMuX3dyaXRlID0gb3B0aW9ucy53cml0ZTtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMud3JpdGV2ID09PSAnZnVuY3Rpb24nKSB0aGlzLl93cml0ZXYgPSBvcHRpb25zLndyaXRldjtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5fZGVzdHJveSA9IG9wdGlvbnMuZGVzdHJveTtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmluYWwgPT09ICdmdW5jdGlvbicpIHRoaXMuX2ZpbmFsID0gb3B0aW9ucy5maW5hbDtcbiAgfVxuXG4gIFN0cmVhbS5jYWxsKHRoaXMpO1xufSAvLyBPdGhlcndpc2UgcGVvcGxlIGNhbiBwaXBlIFdyaXRhYmxlIHN0cmVhbXMsIHdoaWNoIGlzIGp1c3Qgd3JvbmcuXG5cblxuV3JpdGFibGUucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiAoKSB7XG4gIGVycm9yT3JEZXN0cm95KHRoaXMsIG5ldyBFUlJfU1RSRUFNX0NBTk5PVF9QSVBFKCkpO1xufTtcblxuZnVuY3Rpb24gd3JpdGVBZnRlckVuZChzdHJlYW0sIGNiKSB7XG4gIHZhciBlciA9IG5ldyBFUlJfU1RSRUFNX1dSSVRFX0FGVEVSX0VORCgpOyAvLyBUT0RPOiBkZWZlciBlcnJvciBldmVudHMgY29uc2lzdGVudGx5IGV2ZXJ5d2hlcmUsIG5vdCBqdXN0IHRoZSBjYlxuXG4gIGVycm9yT3JEZXN0cm95KHN0cmVhbSwgZXIpO1xuICBwcm9jZXNzLm5leHRUaWNrKGNiLCBlcik7XG59IC8vIENoZWNrcyB0aGF0IGEgdXNlci1zdXBwbGllZCBjaHVuayBpcyB2YWxpZCwgZXNwZWNpYWxseSBmb3IgdGhlIHBhcnRpY3VsYXJcbi8vIG1vZGUgdGhlIHN0cmVhbSBpcyBpbi4gQ3VycmVudGx5IHRoaXMgbWVhbnMgdGhhdCBgbnVsbGAgaXMgbmV2ZXIgYWNjZXB0ZWRcbi8vIGFuZCB1bmRlZmluZWQvbm9uLXN0cmluZyB2YWx1ZXMgYXJlIG9ubHkgYWxsb3dlZCBpbiBvYmplY3QgbW9kZS5cblxuXG5mdW5jdGlvbiB2YWxpZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCBjYikge1xuICB2YXIgZXI7XG5cbiAgaWYgKGNodW5rID09PSBudWxsKSB7XG4gICAgZXIgPSBuZXcgRVJSX1NUUkVBTV9OVUxMX1ZBTFVFUygpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBjaHVuayAhPT0gJ3N0cmluZycgJiYgIXN0YXRlLm9iamVjdE1vZGUpIHtcbiAgICBlciA9IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgnY2h1bmsnLCBbJ3N0cmluZycsICdCdWZmZXInXSwgY2h1bmspO1xuICB9XG5cbiAgaWYgKGVyKSB7XG4gICAgZXJyb3JPckRlc3Ryb3koc3RyZWFtLCBlcik7XG4gICAgcHJvY2Vzcy5uZXh0VGljayhjYiwgZXIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5Xcml0YWJsZS5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuICB2YXIgcmV0ID0gZmFsc2U7XG5cbiAgdmFyIGlzQnVmID0gIXN0YXRlLm9iamVjdE1vZGUgJiYgX2lzVWludDhBcnJheShjaHVuayk7XG5cbiAgaWYgKGlzQnVmICYmICFCdWZmZXIuaXNCdWZmZXIoY2h1bmspKSB7XG4gICAgY2h1bmsgPSBfdWludDhBcnJheVRvQnVmZmVyKGNodW5rKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IGVuY29kaW5nO1xuICAgIGVuY29kaW5nID0gbnVsbDtcbiAgfVxuXG4gIGlmIChpc0J1ZikgZW5jb2RpbmcgPSAnYnVmZmVyJztlbHNlIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gc3RhdGUuZGVmYXVsdEVuY29kaW5nO1xuICBpZiAodHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKSBjYiA9IG5vcDtcbiAgaWYgKHN0YXRlLmVuZGluZykgd3JpdGVBZnRlckVuZCh0aGlzLCBjYik7ZWxzZSBpZiAoaXNCdWYgfHwgdmFsaWRDaHVuayh0aGlzLCBzdGF0ZSwgY2h1bmssIGNiKSkge1xuICAgIHN0YXRlLnBlbmRpbmdjYisrO1xuICAgIHJldCA9IHdyaXRlT3JCdWZmZXIodGhpcywgc3RhdGUsIGlzQnVmLCBjaHVuaywgZW5jb2RpbmcsIGNiKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxuV3JpdGFibGUucHJvdG90eXBlLmNvcmsgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3dyaXRhYmxlU3RhdGUuY29ya2VkKys7XG59O1xuXG5Xcml0YWJsZS5wcm90b3R5cGUudW5jb3JrID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuXG4gIGlmIChzdGF0ZS5jb3JrZWQpIHtcbiAgICBzdGF0ZS5jb3JrZWQtLTtcbiAgICBpZiAoIXN0YXRlLndyaXRpbmcgJiYgIXN0YXRlLmNvcmtlZCAmJiAhc3RhdGUuYnVmZmVyUHJvY2Vzc2luZyAmJiBzdGF0ZS5idWZmZXJlZFJlcXVlc3QpIGNsZWFyQnVmZmVyKHRoaXMsIHN0YXRlKTtcbiAgfVxufTtcblxuV3JpdGFibGUucHJvdG90eXBlLnNldERlZmF1bHRFbmNvZGluZyA9IGZ1bmN0aW9uIHNldERlZmF1bHRFbmNvZGluZyhlbmNvZGluZykge1xuICAvLyBub2RlOjpQYXJzZUVuY29kaW5nKCkgcmVxdWlyZXMgbG93ZXIgY2FzZS5cbiAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycpIGVuY29kaW5nID0gZW5jb2RpbmcudG9Mb3dlckNhc2UoKTtcbiAgaWYgKCEoWydoZXgnLCAndXRmOCcsICd1dGYtOCcsICdhc2NpaScsICdiaW5hcnknLCAnYmFzZTY0JywgJ3VjczInLCAndWNzLTInLCAndXRmMTZsZScsICd1dGYtMTZsZScsICdyYXcnXS5pbmRleE9mKChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpKSA+IC0xKSkgdGhyb3cgbmV3IEVSUl9VTktOT1dOX0VOQ09ESU5HKGVuY29kaW5nKTtcbiAgdGhpcy5fd3JpdGFibGVTdGF0ZS5kZWZhdWx0RW5jb2RpbmcgPSBlbmNvZGluZztcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoV3JpdGFibGUucHJvdG90eXBlLCAnd3JpdGFibGVCdWZmZXInLCB7XG4gIC8vIG1ha2luZyBpdCBleHBsaWNpdCB0aGlzIHByb3BlcnR5IGlzIG5vdCBlbnVtZXJhYmxlXG4gIC8vIGJlY2F1c2Ugb3RoZXJ3aXNlIHNvbWUgcHJvdG90eXBlIG1hbmlwdWxhdGlvbiBpblxuICAvLyB1c2VybGFuZCB3aWxsIGZhaWxcbiAgZW51bWVyYWJsZTogZmFsc2UsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLl93cml0YWJsZVN0YXRlICYmIHRoaXMuX3dyaXRhYmxlU3RhdGUuZ2V0QnVmZmVyKCk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBkZWNvZGVDaHVuayhzdGF0ZSwgY2h1bmssIGVuY29kaW5nKSB7XG4gIGlmICghc3RhdGUub2JqZWN0TW9kZSAmJiBzdGF0ZS5kZWNvZGVTdHJpbmdzICE9PSBmYWxzZSAmJiB0eXBlb2YgY2h1bmsgPT09ICdzdHJpbmcnKSB7XG4gICAgY2h1bmsgPSBCdWZmZXIuZnJvbShjaHVuaywgZW5jb2RpbmcpO1xuICB9XG5cbiAgcmV0dXJuIGNodW5rO1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoV3JpdGFibGUucHJvdG90eXBlLCAnd3JpdGFibGVIaWdoV2F0ZXJNYXJrJywge1xuICAvLyBtYWtpbmcgaXQgZXhwbGljaXQgdGhpcyBwcm9wZXJ0eSBpcyBub3QgZW51bWVyYWJsZVxuICAvLyBiZWNhdXNlIG90aGVyd2lzZSBzb21lIHByb3RvdHlwZSBtYW5pcHVsYXRpb24gaW5cbiAgLy8gdXNlcmxhbmQgd2lsbCBmYWlsXG4gIGVudW1lcmFibGU6IGZhbHNlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fd3JpdGFibGVTdGF0ZS5oaWdoV2F0ZXJNYXJrO1xuICB9XG59KTsgLy8gaWYgd2UncmUgYWxyZWFkeSB3cml0aW5nIHNvbWV0aGluZywgdGhlbiBqdXN0IHB1dCB0aGlzXG4vLyBpbiB0aGUgcXVldWUsIGFuZCB3YWl0IG91ciB0dXJuLiAgT3RoZXJ3aXNlLCBjYWxsIF93cml0ZVxuLy8gSWYgd2UgcmV0dXJuIGZhbHNlLCB0aGVuIHdlIG5lZWQgYSBkcmFpbiBldmVudCwgc28gc2V0IHRoYXQgZmxhZy5cblxuZnVuY3Rpb24gd3JpdGVPckJ1ZmZlcihzdHJlYW0sIHN0YXRlLCBpc0J1ZiwgY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBpZiAoIWlzQnVmKSB7XG4gICAgdmFyIG5ld0NodW5rID0gZGVjb2RlQ2h1bmsoc3RhdGUsIGNodW5rLCBlbmNvZGluZyk7XG5cbiAgICBpZiAoY2h1bmsgIT09IG5ld0NodW5rKSB7XG4gICAgICBpc0J1ZiA9IHRydWU7XG4gICAgICBlbmNvZGluZyA9ICdidWZmZXInO1xuICAgICAgY2h1bmsgPSBuZXdDaHVuaztcbiAgICB9XG4gIH1cblxuICB2YXIgbGVuID0gc3RhdGUub2JqZWN0TW9kZSA/IDEgOiBjaHVuay5sZW5ndGg7XG4gIHN0YXRlLmxlbmd0aCArPSBsZW47XG4gIHZhciByZXQgPSBzdGF0ZS5sZW5ndGggPCBzdGF0ZS5oaWdoV2F0ZXJNYXJrOyAvLyB3ZSBtdXN0IGVuc3VyZSB0aGF0IHByZXZpb3VzIG5lZWREcmFpbiB3aWxsIG5vdCBiZSByZXNldCB0byBmYWxzZS5cblxuICBpZiAoIXJldCkgc3RhdGUubmVlZERyYWluID0gdHJ1ZTtcblxuICBpZiAoc3RhdGUud3JpdGluZyB8fCBzdGF0ZS5jb3JrZWQpIHtcbiAgICB2YXIgbGFzdCA9IHN0YXRlLmxhc3RCdWZmZXJlZFJlcXVlc3Q7XG4gICAgc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdCA9IHtcbiAgICAgIGNodW5rOiBjaHVuayxcbiAgICAgIGVuY29kaW5nOiBlbmNvZGluZyxcbiAgICAgIGlzQnVmOiBpc0J1ZixcbiAgICAgIGNhbGxiYWNrOiBjYixcbiAgICAgIG5leHQ6IG51bGxcbiAgICB9O1xuXG4gICAgaWYgKGxhc3QpIHtcbiAgICAgIGxhc3QubmV4dCA9IHN0YXRlLmxhc3RCdWZmZXJlZFJlcXVlc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdCA9IHN0YXRlLmxhc3RCdWZmZXJlZFJlcXVlc3Q7XG4gICAgfVxuXG4gICAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0Q291bnQgKz0gMTtcbiAgfSBlbHNlIHtcbiAgICBkb1dyaXRlKHN0cmVhbSwgc3RhdGUsIGZhbHNlLCBsZW4sIGNodW5rLCBlbmNvZGluZywgY2IpO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gZG9Xcml0ZShzdHJlYW0sIHN0YXRlLCB3cml0ZXYsIGxlbiwgY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBzdGF0ZS53cml0ZWxlbiA9IGxlbjtcbiAgc3RhdGUud3JpdGVjYiA9IGNiO1xuICBzdGF0ZS53cml0aW5nID0gdHJ1ZTtcbiAgc3RhdGUuc3luYyA9IHRydWU7XG4gIGlmIChzdGF0ZS5kZXN0cm95ZWQpIHN0YXRlLm9ud3JpdGUobmV3IEVSUl9TVFJFQU1fREVTVFJPWUVEKCd3cml0ZScpKTtlbHNlIGlmICh3cml0ZXYpIHN0cmVhbS5fd3JpdGV2KGNodW5rLCBzdGF0ZS5vbndyaXRlKTtlbHNlIHN0cmVhbS5fd3JpdGUoY2h1bmssIGVuY29kaW5nLCBzdGF0ZS5vbndyaXRlKTtcbiAgc3RhdGUuc3luYyA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBvbndyaXRlRXJyb3Ioc3RyZWFtLCBzdGF0ZSwgc3luYywgZXIsIGNiKSB7XG4gIC0tc3RhdGUucGVuZGluZ2NiO1xuXG4gIGlmIChzeW5jKSB7XG4gICAgLy8gZGVmZXIgdGhlIGNhbGxiYWNrIGlmIHdlIGFyZSBiZWluZyBjYWxsZWQgc3luY2hyb25vdXNseVxuICAgIC8vIHRvIGF2b2lkIHBpbGluZyB1cCB0aGluZ3Mgb24gdGhlIHN0YWNrXG4gICAgcHJvY2Vzcy5uZXh0VGljayhjYiwgZXIpOyAvLyB0aGlzIGNhbiBlbWl0IGZpbmlzaCwgYW5kIGl0IHdpbGwgYWx3YXlzIGhhcHBlblxuICAgIC8vIGFmdGVyIGVycm9yXG5cbiAgICBwcm9jZXNzLm5leHRUaWNrKGZpbmlzaE1heWJlLCBzdHJlYW0sIHN0YXRlKTtcbiAgICBzdHJlYW0uX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkID0gdHJ1ZTtcbiAgICBlcnJvck9yRGVzdHJveShzdHJlYW0sIGVyKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB0aGUgY2FsbGVyIGV4cGVjdCB0aGlzIHRvIGhhcHBlbiBiZWZvcmUgaWZcbiAgICAvLyBpdCBpcyBhc3luY1xuICAgIGNiKGVyKTtcbiAgICBzdHJlYW0uX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkID0gdHJ1ZTtcbiAgICBlcnJvck9yRGVzdHJveShzdHJlYW0sIGVyKTsgLy8gdGhpcyBjYW4gZW1pdCBmaW5pc2gsIGJ1dCBmaW5pc2ggbXVzdFxuICAgIC8vIGFsd2F5cyBmb2xsb3cgZXJyb3JcblxuICAgIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9ud3JpdGVTdGF0ZVVwZGF0ZShzdGF0ZSkge1xuICBzdGF0ZS53cml0aW5nID0gZmFsc2U7XG4gIHN0YXRlLndyaXRlY2IgPSBudWxsO1xuICBzdGF0ZS5sZW5ndGggLT0gc3RhdGUud3JpdGVsZW47XG4gIHN0YXRlLndyaXRlbGVuID0gMDtcbn1cblxuZnVuY3Rpb24gb253cml0ZShzdHJlYW0sIGVyKSB7XG4gIHZhciBzdGF0ZSA9IHN0cmVhbS5fd3JpdGFibGVTdGF0ZTtcbiAgdmFyIHN5bmMgPSBzdGF0ZS5zeW5jO1xuICB2YXIgY2IgPSBzdGF0ZS53cml0ZWNiO1xuICBpZiAodHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgRVJSX01VTFRJUExFX0NBTExCQUNLKCk7XG4gIG9ud3JpdGVTdGF0ZVVwZGF0ZShzdGF0ZSk7XG4gIGlmIChlcikgb253cml0ZUVycm9yKHN0cmVhbSwgc3RhdGUsIHN5bmMsIGVyLCBjYik7ZWxzZSB7XG4gICAgLy8gQ2hlY2sgaWYgd2UncmUgYWN0dWFsbHkgcmVhZHkgdG8gZmluaXNoLCBidXQgZG9uJ3QgZW1pdCB5ZXRcbiAgICB2YXIgZmluaXNoZWQgPSBuZWVkRmluaXNoKHN0YXRlKSB8fCBzdHJlYW0uZGVzdHJveWVkO1xuXG4gICAgaWYgKCFmaW5pc2hlZCAmJiAhc3RhdGUuY29ya2VkICYmICFzdGF0ZS5idWZmZXJQcm9jZXNzaW5nICYmIHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdCkge1xuICAgICAgY2xlYXJCdWZmZXIoc3RyZWFtLCBzdGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKHN5bmMpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soYWZ0ZXJXcml0ZSwgc3RyZWFtLCBzdGF0ZSwgZmluaXNoZWQsIGNiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWZ0ZXJXcml0ZShzdHJlYW0sIHN0YXRlLCBmaW5pc2hlZCwgY2IpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZnRlcldyaXRlKHN0cmVhbSwgc3RhdGUsIGZpbmlzaGVkLCBjYikge1xuICBpZiAoIWZpbmlzaGVkKSBvbndyaXRlRHJhaW4oc3RyZWFtLCBzdGF0ZSk7XG4gIHN0YXRlLnBlbmRpbmdjYi0tO1xuICBjYigpO1xuICBmaW5pc2hNYXliZShzdHJlYW0sIHN0YXRlKTtcbn0gLy8gTXVzdCBmb3JjZSBjYWxsYmFjayB0byBiZSBjYWxsZWQgb24gbmV4dFRpY2ssIHNvIHRoYXQgd2UgZG9uJ3Rcbi8vIGVtaXQgJ2RyYWluJyBiZWZvcmUgdGhlIHdyaXRlKCkgY29uc3VtZXIgZ2V0cyB0aGUgJ2ZhbHNlJyByZXR1cm5cbi8vIHZhbHVlLCBhbmQgaGFzIGEgY2hhbmNlIHRvIGF0dGFjaCBhICdkcmFpbicgbGlzdGVuZXIuXG5cblxuZnVuY3Rpb24gb253cml0ZURyYWluKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCAmJiBzdGF0ZS5uZWVkRHJhaW4pIHtcbiAgICBzdGF0ZS5uZWVkRHJhaW4gPSBmYWxzZTtcbiAgICBzdHJlYW0uZW1pdCgnZHJhaW4nKTtcbiAgfVxufSAvLyBpZiB0aGVyZSdzIHNvbWV0aGluZyBpbiB0aGUgYnVmZmVyIHdhaXRpbmcsIHRoZW4gcHJvY2VzcyBpdFxuXG5cbmZ1bmN0aW9uIGNsZWFyQnVmZmVyKHN0cmVhbSwgc3RhdGUpIHtcbiAgc3RhdGUuYnVmZmVyUHJvY2Vzc2luZyA9IHRydWU7XG4gIHZhciBlbnRyeSA9IHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdDtcblxuICBpZiAoc3RyZWFtLl93cml0ZXYgJiYgZW50cnkgJiYgZW50cnkubmV4dCkge1xuICAgIC8vIEZhc3QgY2FzZSwgd3JpdGUgZXZlcnl0aGluZyB1c2luZyBfd3JpdGV2KClcbiAgICB2YXIgbCA9IHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdENvdW50O1xuICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXkobCk7XG4gICAgdmFyIGhvbGRlciA9IHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZTtcbiAgICBob2xkZXIuZW50cnkgPSBlbnRyeTtcbiAgICB2YXIgY291bnQgPSAwO1xuICAgIHZhciBhbGxCdWZmZXJzID0gdHJ1ZTtcblxuICAgIHdoaWxlIChlbnRyeSkge1xuICAgICAgYnVmZmVyW2NvdW50XSA9IGVudHJ5O1xuICAgICAgaWYgKCFlbnRyeS5pc0J1ZikgYWxsQnVmZmVycyA9IGZhbHNlO1xuICAgICAgZW50cnkgPSBlbnRyeS5uZXh0O1xuICAgICAgY291bnQgKz0gMTtcbiAgICB9XG5cbiAgICBidWZmZXIuYWxsQnVmZmVycyA9IGFsbEJ1ZmZlcnM7XG4gICAgZG9Xcml0ZShzdHJlYW0sIHN0YXRlLCB0cnVlLCBzdGF0ZS5sZW5ndGgsIGJ1ZmZlciwgJycsIGhvbGRlci5maW5pc2gpOyAvLyBkb1dyaXRlIGlzIGFsbW9zdCBhbHdheXMgYXN5bmMsIGRlZmVyIHRoZXNlIHRvIHNhdmUgYSBiaXQgb2YgdGltZVxuICAgIC8vIGFzIHRoZSBob3QgcGF0aCBlbmRzIHdpdGggZG9Xcml0ZVxuXG4gICAgc3RhdGUucGVuZGluZ2NiKys7XG4gICAgc3RhdGUubGFzdEJ1ZmZlcmVkUmVxdWVzdCA9IG51bGw7XG5cbiAgICBpZiAoaG9sZGVyLm5leHQpIHtcbiAgICAgIHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZSA9IGhvbGRlci5uZXh0O1xuICAgICAgaG9sZGVyLm5leHQgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5jb3JrZWRSZXF1ZXN0c0ZyZWUgPSBuZXcgQ29ya2VkUmVxdWVzdChzdGF0ZSk7XG4gICAgfVxuXG4gICAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0Q291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFNsb3cgY2FzZSwgd3JpdGUgY2h1bmtzIG9uZS1ieS1vbmVcbiAgICB3aGlsZSAoZW50cnkpIHtcbiAgICAgIHZhciBjaHVuayA9IGVudHJ5LmNodW5rO1xuICAgICAgdmFyIGVuY29kaW5nID0gZW50cnkuZW5jb2Rpbmc7XG4gICAgICB2YXIgY2IgPSBlbnRyeS5jYWxsYmFjaztcbiAgICAgIHZhciBsZW4gPSBzdGF0ZS5vYmplY3RNb2RlID8gMSA6IGNodW5rLmxlbmd0aDtcbiAgICAgIGRvV3JpdGUoc3RyZWFtLCBzdGF0ZSwgZmFsc2UsIGxlbiwgY2h1bmssIGVuY29kaW5nLCBjYik7XG4gICAgICBlbnRyeSA9IGVudHJ5Lm5leHQ7XG4gICAgICBzdGF0ZS5idWZmZXJlZFJlcXVlc3RDb3VudC0tOyAvLyBpZiB3ZSBkaWRuJ3QgY2FsbCB0aGUgb253cml0ZSBpbW1lZGlhdGVseSwgdGhlblxuICAgICAgLy8gaXQgbWVhbnMgdGhhdCB3ZSBuZWVkIHRvIHdhaXQgdW50aWwgaXQgZG9lcy5cbiAgICAgIC8vIGFsc28sIHRoYXQgbWVhbnMgdGhhdCB0aGUgY2h1bmsgYW5kIGNiIGFyZSBjdXJyZW50bHlcbiAgICAgIC8vIGJlaW5nIHByb2Nlc3NlZCwgc28gbW92ZSB0aGUgYnVmZmVyIGNvdW50ZXIgcGFzdCB0aGVtLlxuXG4gICAgICBpZiAoc3RhdGUud3JpdGluZykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZW50cnkgPT09IG51bGwpIHN0YXRlLmxhc3RCdWZmZXJlZFJlcXVlc3QgPSBudWxsO1xuICB9XG5cbiAgc3RhdGUuYnVmZmVyZWRSZXF1ZXN0ID0gZW50cnk7XG4gIHN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgPSBmYWxzZTtcbn1cblxuV3JpdGFibGUucHJvdG90eXBlLl93cml0ZSA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIGNiKG5ldyBFUlJfTUVUSE9EX05PVF9JTVBMRU1FTlRFRCgnX3dyaXRlKCknKSk7XG59O1xuXG5Xcml0YWJsZS5wcm90b3R5cGUuX3dyaXRldiA9IG51bGw7XG5cbldyaXRhYmxlLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuXG4gIGlmICh0eXBlb2YgY2h1bmsgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IGNodW5rO1xuICAgIGNodW5rID0gbnVsbDtcbiAgICBlbmNvZGluZyA9IG51bGw7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBlbmNvZGluZztcbiAgICBlbmNvZGluZyA9IG51bGw7XG4gIH1cblxuICBpZiAoY2h1bmsgIT09IG51bGwgJiYgY2h1bmsgIT09IHVuZGVmaW5lZCkgdGhpcy53cml0ZShjaHVuaywgZW5jb2RpbmcpOyAvLyAuZW5kKCkgZnVsbHkgdW5jb3Jrc1xuXG4gIGlmIChzdGF0ZS5jb3JrZWQpIHtcbiAgICBzdGF0ZS5jb3JrZWQgPSAxO1xuICAgIHRoaXMudW5jb3JrKCk7XG4gIH0gLy8gaWdub3JlIHVubmVjZXNzYXJ5IGVuZCgpIGNhbGxzLlxuXG5cbiAgaWYgKCFzdGF0ZS5lbmRpbmcpIGVuZFdyaXRhYmxlKHRoaXMsIHN0YXRlLCBjYik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlLnByb3RvdHlwZSwgJ3dyaXRhYmxlTGVuZ3RoJywge1xuICAvLyBtYWtpbmcgaXQgZXhwbGljaXQgdGhpcyBwcm9wZXJ0eSBpcyBub3QgZW51bWVyYWJsZVxuICAvLyBiZWNhdXNlIG90aGVyd2lzZSBzb21lIHByb3RvdHlwZSBtYW5pcHVsYXRpb24gaW5cbiAgLy8gdXNlcmxhbmQgd2lsbCBmYWlsXG4gIGVudW1lcmFibGU6IGZhbHNlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fd3JpdGFibGVTdGF0ZS5sZW5ndGg7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBuZWVkRmluaXNoKHN0YXRlKSB7XG4gIHJldHVybiBzdGF0ZS5lbmRpbmcgJiYgc3RhdGUubGVuZ3RoID09PSAwICYmIHN0YXRlLmJ1ZmZlcmVkUmVxdWVzdCA9PT0gbnVsbCAmJiAhc3RhdGUuZmluaXNoZWQgJiYgIXN0YXRlLndyaXRpbmc7XG59XG5cbmZ1bmN0aW9uIGNhbGxGaW5hbChzdHJlYW0sIHN0YXRlKSB7XG4gIHN0cmVhbS5fZmluYWwoZnVuY3Rpb24gKGVycikge1xuICAgIHN0YXRlLnBlbmRpbmdjYi0tO1xuXG4gICAgaWYgKGVycikge1xuICAgICAgZXJyb3JPckRlc3Ryb3koc3RyZWFtLCBlcnIpO1xuICAgIH1cblxuICAgIHN0YXRlLnByZWZpbmlzaGVkID0gdHJ1ZTtcbiAgICBzdHJlYW0uZW1pdCgncHJlZmluaXNoJyk7XG4gICAgZmluaXNoTWF5YmUoc3RyZWFtLCBzdGF0ZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwcmVmaW5pc2goc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoIXN0YXRlLnByZWZpbmlzaGVkICYmICFzdGF0ZS5maW5hbENhbGxlZCkge1xuICAgIGlmICh0eXBlb2Ygc3RyZWFtLl9maW5hbCA9PT0gJ2Z1bmN0aW9uJyAmJiAhc3RhdGUuZGVzdHJveWVkKSB7XG4gICAgICBzdGF0ZS5wZW5kaW5nY2IrKztcbiAgICAgIHN0YXRlLmZpbmFsQ2FsbGVkID0gdHJ1ZTtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY2FsbEZpbmFsLCBzdHJlYW0sIHN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUucHJlZmluaXNoZWQgPSB0cnVlO1xuICAgICAgc3RyZWFtLmVtaXQoJ3ByZWZpbmlzaCcpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5pc2hNYXliZShzdHJlYW0sIHN0YXRlKSB7XG4gIHZhciBuZWVkID0gbmVlZEZpbmlzaChzdGF0ZSk7XG5cbiAgaWYgKG5lZWQpIHtcbiAgICBwcmVmaW5pc2goc3RyZWFtLCBzdGF0ZSk7XG5cbiAgICBpZiAoc3RhdGUucGVuZGluZ2NiID09PSAwKSB7XG4gICAgICBzdGF0ZS5maW5pc2hlZCA9IHRydWU7XG4gICAgICBzdHJlYW0uZW1pdCgnZmluaXNoJyk7XG5cbiAgICAgIGlmIChzdGF0ZS5hdXRvRGVzdHJveSkge1xuICAgICAgICAvLyBJbiBjYXNlIG9mIGR1cGxleCBzdHJlYW1zIHdlIG5lZWQgYSB3YXkgdG8gZGV0ZWN0XG4gICAgICAgIC8vIGlmIHRoZSByZWFkYWJsZSBzaWRlIGlzIHJlYWR5IGZvciBhdXRvRGVzdHJveSBhcyB3ZWxsXG4gICAgICAgIHZhciByU3RhdGUgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG5cbiAgICAgICAgaWYgKCFyU3RhdGUgfHwgclN0YXRlLmF1dG9EZXN0cm95ICYmIHJTdGF0ZS5lbmRFbWl0dGVkKSB7XG4gICAgICAgICAgc3RyZWFtLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZWVkO1xufVxuXG5mdW5jdGlvbiBlbmRXcml0YWJsZShzdHJlYW0sIHN0YXRlLCBjYikge1xuICBzdGF0ZS5lbmRpbmcgPSB0cnVlO1xuICBmaW5pc2hNYXliZShzdHJlYW0sIHN0YXRlKTtcblxuICBpZiAoY2IpIHtcbiAgICBpZiAoc3RhdGUuZmluaXNoZWQpIHByb2Nlc3MubmV4dFRpY2soY2IpO2Vsc2Ugc3RyZWFtLm9uY2UoJ2ZpbmlzaCcsIGNiKTtcbiAgfVxuXG4gIHN0YXRlLmVuZGVkID0gdHJ1ZTtcbiAgc3RyZWFtLndyaXRhYmxlID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIG9uQ29ya2VkRmluaXNoKGNvcmtSZXEsIHN0YXRlLCBlcnIpIHtcbiAgdmFyIGVudHJ5ID0gY29ya1JlcS5lbnRyeTtcbiAgY29ya1JlcS5lbnRyeSA9IG51bGw7XG5cbiAgd2hpbGUgKGVudHJ5KSB7XG4gICAgdmFyIGNiID0gZW50cnkuY2FsbGJhY2s7XG4gICAgc3RhdGUucGVuZGluZ2NiLS07XG4gICAgY2IoZXJyKTtcbiAgICBlbnRyeSA9IGVudHJ5Lm5leHQ7XG4gIH0gLy8gcmV1c2UgdGhlIGZyZWUgY29ya1JlcS5cblxuXG4gIHN0YXRlLmNvcmtlZFJlcXVlc3RzRnJlZS5uZXh0ID0gY29ya1JlcTtcbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlLnByb3RvdHlwZSwgJ2Rlc3Ryb3llZCcsIHtcbiAgLy8gbWFraW5nIGl0IGV4cGxpY2l0IHRoaXMgcHJvcGVydHkgaXMgbm90IGVudW1lcmFibGVcbiAgLy8gYmVjYXVzZSBvdGhlcndpc2Ugc29tZSBwcm90b3R5cGUgbWFuaXB1bGF0aW9uIGluXG4gIC8vIHVzZXJsYW5kIHdpbGwgZmFpbFxuICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgaWYgKHRoaXMuX3dyaXRhYmxlU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZDtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAvLyB3ZSBpZ25vcmUgdGhlIHZhbHVlIGlmIHRoZSBzdHJlYW1cbiAgICAvLyBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQgeWV0XG4gICAgaWYgKCF0aGlzLl93cml0YWJsZVN0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aGUgdXNlciBpcyBleHBsaWNpdGx5XG4gICAgLy8gbWFuYWdpbmcgZGVzdHJveWVkXG5cblxuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZGVzdHJveWVkID0gdmFsdWU7XG4gIH1cbn0pO1xuV3JpdGFibGUucHJvdG90eXBlLmRlc3Ryb3kgPSBkZXN0cm95SW1wbC5kZXN0cm95O1xuV3JpdGFibGUucHJvdG90eXBlLl91bmRlc3Ryb3kgPSBkZXN0cm95SW1wbC51bmRlc3Ryb3k7XG5cbldyaXRhYmxlLnByb3RvdHlwZS5fZGVzdHJveSA9IGZ1bmN0aW9uIChlcnIsIGNiKSB7XG4gIGNiKGVycik7XG59O1xufSkuY2FsbCh0aGlzKX0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHtcIi4uL2Vycm9yc1wiOjEyLFwiLi9fc3RyZWFtX2R1cGxleFwiOjEzLFwiLi9pbnRlcm5hbC9zdHJlYW1zL2Rlc3Ryb3lcIjoyMCxcIi4vaW50ZXJuYWwvc3RyZWFtcy9zdGF0ZVwiOjI0LFwiLi9pbnRlcm5hbC9zdHJlYW1zL3N0cmVhbVwiOjI1LFwiX3Byb2Nlc3NcIjo5LFwiYnVmZmVyXCI6NSxcImluaGVyaXRzXCI6OCxcInV0aWwtZGVwcmVjYXRlXCI6Mjh9XSwxODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHByb2Nlc3MpeyhmdW5jdGlvbiAoKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9PYmplY3Qkc2V0UHJvdG90eXBlTztcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIGZpbmlzaGVkID0gcmVxdWlyZSgnLi9lbmQtb2Ytc3RyZWFtJyk7XG5cbnZhciBrTGFzdFJlc29sdmUgPSBTeW1ib2woJ2xhc3RSZXNvbHZlJyk7XG52YXIga0xhc3RSZWplY3QgPSBTeW1ib2woJ2xhc3RSZWplY3QnKTtcbnZhciBrRXJyb3IgPSBTeW1ib2woJ2Vycm9yJyk7XG52YXIga0VuZGVkID0gU3ltYm9sKCdlbmRlZCcpO1xudmFyIGtMYXN0UHJvbWlzZSA9IFN5bWJvbCgnbGFzdFByb21pc2UnKTtcbnZhciBrSGFuZGxlUHJvbWlzZSA9IFN5bWJvbCgnaGFuZGxlUHJvbWlzZScpO1xudmFyIGtTdHJlYW0gPSBTeW1ib2woJ3N0cmVhbScpO1xuXG5mdW5jdGlvbiBjcmVhdGVJdGVyUmVzdWx0KHZhbHVlLCBkb25lKSB7XG4gIHJldHVybiB7XG4gICAgdmFsdWU6IHZhbHVlLFxuICAgIGRvbmU6IGRvbmVcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVhZEFuZFJlc29sdmUoaXRlcikge1xuICB2YXIgcmVzb2x2ZSA9IGl0ZXJba0xhc3RSZXNvbHZlXTtcblxuICBpZiAocmVzb2x2ZSAhPT0gbnVsbCkge1xuICAgIHZhciBkYXRhID0gaXRlcltrU3RyZWFtXS5yZWFkKCk7IC8vIHdlIGRlZmVyIGlmIGRhdGEgaXMgbnVsbFxuICAgIC8vIHdlIGNhbiBiZSBleHBlY3RpbmcgZWl0aGVyICdlbmQnIG9yXG4gICAgLy8gJ2Vycm9yJ1xuXG4gICAgaWYgKGRhdGEgIT09IG51bGwpIHtcbiAgICAgIGl0ZXJba0xhc3RQcm9taXNlXSA9IG51bGw7XG4gICAgICBpdGVyW2tMYXN0UmVzb2x2ZV0gPSBudWxsO1xuICAgICAgaXRlcltrTGFzdFJlamVjdF0gPSBudWxsO1xuICAgICAgcmVzb2x2ZShjcmVhdGVJdGVyUmVzdWx0KGRhdGEsIGZhbHNlKSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG9uUmVhZGFibGUoaXRlcikge1xuICAvLyB3ZSB3YWl0IGZvciB0aGUgbmV4dCB0aWNrLCBiZWNhdXNlIGl0IG1pZ2h0XG4gIC8vIGVtaXQgYW4gZXJyb3Igd2l0aCBwcm9jZXNzLm5leHRUaWNrXG4gIHByb2Nlc3MubmV4dFRpY2socmVhZEFuZFJlc29sdmUsIGl0ZXIpO1xufVxuXG5mdW5jdGlvbiB3cmFwRm9yTmV4dChsYXN0UHJvbWlzZSwgaXRlcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGxhc3RQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGl0ZXJba0VuZGVkXSkge1xuICAgICAgICByZXNvbHZlKGNyZWF0ZUl0ZXJSZXN1bHQodW5kZWZpbmVkLCB0cnVlKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaXRlcltrSGFuZGxlUHJvbWlzZV0ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9LCByZWplY3QpO1xuICB9O1xufVxuXG52YXIgQXN5bmNJdGVyYXRvclByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihmdW5jdGlvbiAoKSB7fSk7XG52YXIgUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yUHJvdG90eXBlID0gT2JqZWN0LnNldFByb3RvdHlwZU9mKChfT2JqZWN0JHNldFByb3RvdHlwZU8gPSB7XG4gIGdldCBzdHJlYW0oKSB7XG4gICAgcmV0dXJuIHRoaXNba1N0cmVhbV07XG4gIH0sXG5cbiAgbmV4dDogZnVuY3Rpb24gbmV4dCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gaWYgd2UgaGF2ZSBkZXRlY3RlZCBhbiBlcnJvciBpbiB0aGUgbWVhbndoaWxlXG4gICAgLy8gcmVqZWN0IHN0cmFpZ2h0IGF3YXlcbiAgICB2YXIgZXJyb3IgPSB0aGlzW2tFcnJvcl07XG5cbiAgICBpZiAoZXJyb3IgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXNba0VuZGVkXSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjcmVhdGVJdGVyUmVzdWx0KHVuZGVmaW5lZCwgdHJ1ZSkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzW2tTdHJlYW1dLmRlc3Ryb3llZCkge1xuICAgICAgLy8gV2UgbmVlZCB0byBkZWZlciB2aWEgbmV4dFRpY2sgYmVjYXVzZSBpZiAuZGVzdHJveShlcnIpIGlzXG4gICAgICAvLyBjYWxsZWQsIHRoZSBlcnJvciB3aWxsIGJlIGVtaXR0ZWQgdmlhIG5leHRUaWNrLCBhbmRcbiAgICAgIC8vIHdlIGNhbm5vdCBndWFyYW50ZWUgdGhhdCB0aGVyZSBpcyBubyBlcnJvciBsaW5nZXJpbmcgYXJvdW5kXG4gICAgICAvLyB3YWl0aW5nIHRvIGJlIGVtaXR0ZWQuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoX3RoaXNba0Vycm9yXSkge1xuICAgICAgICAgICAgcmVqZWN0KF90aGlzW2tFcnJvcl0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKGNyZWF0ZUl0ZXJSZXN1bHQodW5kZWZpbmVkLCB0cnVlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gLy8gaWYgd2UgaGF2ZSBtdWx0aXBsZSBuZXh0KCkgY2FsbHNcbiAgICAvLyB3ZSB3aWxsIHdhaXQgZm9yIHRoZSBwcmV2aW91cyBQcm9taXNlIHRvIGZpbmlzaFxuICAgIC8vIHRoaXMgbG9naWMgaXMgb3B0aW1pemVkIHRvIHN1cHBvcnQgZm9yIGF3YWl0IGxvb3BzLFxuICAgIC8vIHdoZXJlIG5leHQoKSBpcyBvbmx5IGNhbGxlZCBvbmNlIGF0IGEgdGltZVxuXG5cbiAgICB2YXIgbGFzdFByb21pc2UgPSB0aGlzW2tMYXN0UHJvbWlzZV07XG4gICAgdmFyIHByb21pc2U7XG5cbiAgICBpZiAobGFzdFByb21pc2UpIHtcbiAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSh3cmFwRm9yTmV4dChsYXN0UHJvbWlzZSwgdGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmYXN0IHBhdGggbmVlZGVkIHRvIHN1cHBvcnQgbXVsdGlwbGUgdGhpcy5wdXNoKClcbiAgICAgIC8vIHdpdGhvdXQgdHJpZ2dlcmluZyB0aGUgbmV4dCgpIHF1ZXVlXG4gICAgICB2YXIgZGF0YSA9IHRoaXNba1N0cmVhbV0ucmVhZCgpO1xuXG4gICAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNyZWF0ZUl0ZXJSZXN1bHQoZGF0YSwgZmFsc2UpKTtcbiAgICAgIH1cblxuICAgICAgcHJvbWlzZSA9IG5ldyBQcm9taXNlKHRoaXNba0hhbmRsZVByb21pc2VdKTtcbiAgICB9XG5cbiAgICB0aGlzW2tMYXN0UHJvbWlzZV0gPSBwcm9taXNlO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG59LCBfZGVmaW5lUHJvcGVydHkoX09iamVjdCRzZXRQcm90b3R5cGVPLCBTeW1ib2wuYXN5bmNJdGVyYXRvciwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn0pLCBfZGVmaW5lUHJvcGVydHkoX09iamVjdCRzZXRQcm90b3R5cGVPLCBcInJldHVyblwiLCBmdW5jdGlvbiBfcmV0dXJuKCkge1xuICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAvLyBkZXN0cm95KGVyciwgY2IpIGlzIGEgcHJpdmF0ZSBBUElcbiAgLy8gd2UgY2FuIGd1YXJhbnRlZSB3ZSBoYXZlIHRoYXQgaGVyZSwgYmVjYXVzZSB3ZSBjb250cm9sIHRoZVxuICAvLyBSZWFkYWJsZSBjbGFzcyB0aGlzIGlzIGF0dGFjaGVkIHRvXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgX3RoaXMyW2tTdHJlYW1dLmRlc3Ryb3kobnVsbCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZXNvbHZlKGNyZWF0ZUl0ZXJSZXN1bHQodW5kZWZpbmVkLCB0cnVlKSk7XG4gICAgfSk7XG4gIH0pO1xufSksIF9PYmplY3Qkc2V0UHJvdG90eXBlTyksIEFzeW5jSXRlcmF0b3JQcm90b3R5cGUpO1xuXG52YXIgY3JlYXRlUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yID0gZnVuY3Rpb24gY3JlYXRlUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yKHN0cmVhbSkge1xuICB2YXIgX09iamVjdCRjcmVhdGU7XG5cbiAgdmFyIGl0ZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3JQcm90b3R5cGUsIChfT2JqZWN0JGNyZWF0ZSA9IHt9LCBfZGVmaW5lUHJvcGVydHkoX09iamVjdCRjcmVhdGUsIGtTdHJlYW0sIHtcbiAgICB2YWx1ZTogc3RyZWFtLFxuICAgIHdyaXRhYmxlOiB0cnVlXG4gIH0pLCBfZGVmaW5lUHJvcGVydHkoX09iamVjdCRjcmVhdGUsIGtMYXN0UmVzb2x2ZSwge1xuICAgIHZhbHVlOiBudWxsLFxuICAgIHdyaXRhYmxlOiB0cnVlXG4gIH0pLCBfZGVmaW5lUHJvcGVydHkoX09iamVjdCRjcmVhdGUsIGtMYXN0UmVqZWN0LCB7XG4gICAgdmFsdWU6IG51bGwsXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSksIF9kZWZpbmVQcm9wZXJ0eShfT2JqZWN0JGNyZWF0ZSwga0Vycm9yLCB7XG4gICAgdmFsdWU6IG51bGwsXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSksIF9kZWZpbmVQcm9wZXJ0eShfT2JqZWN0JGNyZWF0ZSwga0VuZGVkLCB7XG4gICAgdmFsdWU6IHN0cmVhbS5fcmVhZGFibGVTdGF0ZS5lbmRFbWl0dGVkLFxuICAgIHdyaXRhYmxlOiB0cnVlXG4gIH0pLCBfZGVmaW5lUHJvcGVydHkoX09iamVjdCRjcmVhdGUsIGtIYW5kbGVQcm9taXNlLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGRhdGEgPSBpdGVyYXRvcltrU3RyZWFtXS5yZWFkKCk7XG5cbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGl0ZXJhdG9yW2tMYXN0UHJvbWlzZV0gPSBudWxsO1xuICAgICAgICBpdGVyYXRvcltrTGFzdFJlc29sdmVdID0gbnVsbDtcbiAgICAgICAgaXRlcmF0b3Jba0xhc3RSZWplY3RdID0gbnVsbDtcbiAgICAgICAgcmVzb2x2ZShjcmVhdGVJdGVyUmVzdWx0KGRhdGEsIGZhbHNlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVyYXRvcltrTGFzdFJlc29sdmVdID0gcmVzb2x2ZTtcbiAgICAgICAgaXRlcmF0b3Jba0xhc3RSZWplY3RdID0gcmVqZWN0O1xuICAgICAgfVxuICAgIH0sXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSksIF9PYmplY3QkY3JlYXRlKSk7XG4gIGl0ZXJhdG9yW2tMYXN0UHJvbWlzZV0gPSBudWxsO1xuICBmaW5pc2hlZChzdHJlYW0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoZXJyICYmIGVyci5jb2RlICE9PSAnRVJSX1NUUkVBTV9QUkVNQVRVUkVfQ0xPU0UnKSB7XG4gICAgICB2YXIgcmVqZWN0ID0gaXRlcmF0b3Jba0xhc3RSZWplY3RdOyAvLyByZWplY3QgaWYgd2UgYXJlIHdhaXRpbmcgZm9yIGRhdGEgaW4gdGhlIFByb21pc2VcbiAgICAgIC8vIHJldHVybmVkIGJ5IG5leHQoKSBhbmQgc3RvcmUgdGhlIGVycm9yXG5cbiAgICAgIGlmIChyZWplY3QgIT09IG51bGwpIHtcbiAgICAgICAgaXRlcmF0b3Jba0xhc3RQcm9taXNlXSA9IG51bGw7XG4gICAgICAgIGl0ZXJhdG9yW2tMYXN0UmVzb2x2ZV0gPSBudWxsO1xuICAgICAgICBpdGVyYXRvcltrTGFzdFJlamVjdF0gPSBudWxsO1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH1cblxuICAgICAgaXRlcmF0b3Jba0Vycm9yXSA9IGVycjtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcmVzb2x2ZSA9IGl0ZXJhdG9yW2tMYXN0UmVzb2x2ZV07XG5cbiAgICBpZiAocmVzb2x2ZSAhPT0gbnVsbCkge1xuICAgICAgaXRlcmF0b3Jba0xhc3RQcm9taXNlXSA9IG51bGw7XG4gICAgICBpdGVyYXRvcltrTGFzdFJlc29sdmVdID0gbnVsbDtcbiAgICAgIGl0ZXJhdG9yW2tMYXN0UmVqZWN0XSA9IG51bGw7XG4gICAgICByZXNvbHZlKGNyZWF0ZUl0ZXJSZXN1bHQodW5kZWZpbmVkLCB0cnVlKSk7XG4gICAgfVxuXG4gICAgaXRlcmF0b3Jba0VuZGVkXSA9IHRydWU7XG4gIH0pO1xuICBzdHJlYW0ub24oJ3JlYWRhYmxlJywgb25SZWFkYWJsZS5iaW5kKG51bGwsIGl0ZXJhdG9yKSk7XG4gIHJldHVybiBpdGVyYXRvcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yO1xufSkuY2FsbCh0aGlzKX0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpKVxufSx7XCIuL2VuZC1vZi1zdHJlYW1cIjoyMSxcIl9wcm9jZXNzXCI6OX1dLDE5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnYnVmZmVyJyksXG4gICAgQnVmZmVyID0gX3JlcXVpcmUuQnVmZmVyO1xuXG52YXIgX3JlcXVpcmUyID0gcmVxdWlyZSgndXRpbCcpLFxuICAgIGluc3BlY3QgPSBfcmVxdWlyZTIuaW5zcGVjdDtcblxudmFyIGN1c3RvbSA9IGluc3BlY3QgJiYgaW5zcGVjdC5jdXN0b20gfHwgJ2luc3BlY3QnO1xuXG5mdW5jdGlvbiBjb3B5QnVmZmVyKHNyYywgdGFyZ2V0LCBvZmZzZXQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5jb3B5LmNhbGwoc3JjLCB0YXJnZXQsIG9mZnNldCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQnVmZmVyTGlzdCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQnVmZmVyTGlzdCk7XG5cbiAgICB0aGlzLmhlYWQgPSBudWxsO1xuICAgIHRoaXMudGFpbCA9IG51bGw7XG4gICAgdGhpcy5sZW5ndGggPSAwO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJ1ZmZlckxpc3QsIFt7XG4gICAga2V5OiBcInB1c2hcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHVzaCh2KSB7XG4gICAgICB2YXIgZW50cnkgPSB7XG4gICAgICAgIGRhdGE6IHYsXG4gICAgICAgIG5leHQ6IG51bGxcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB0aGlzLnRhaWwubmV4dCA9IGVudHJ5O2Vsc2UgdGhpcy5oZWFkID0gZW50cnk7XG4gICAgICB0aGlzLnRhaWwgPSBlbnRyeTtcbiAgICAgICsrdGhpcy5sZW5ndGg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVuc2hpZnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5zaGlmdCh2KSB7XG4gICAgICB2YXIgZW50cnkgPSB7XG4gICAgICAgIGRhdGE6IHYsXG4gICAgICAgIG5leHQ6IHRoaXMuaGVhZFxuICAgICAgfTtcbiAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgdGhpcy50YWlsID0gZW50cnk7XG4gICAgICB0aGlzLmhlYWQgPSBlbnRyeTtcbiAgICAgICsrdGhpcy5sZW5ndGg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNoaWZ0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNoaWZ0KCkge1xuICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICB2YXIgcmV0ID0gdGhpcy5oZWFkLmRhdGE7XG4gICAgICBpZiAodGhpcy5sZW5ndGggPT09IDEpIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG51bGw7ZWxzZSB0aGlzLmhlYWQgPSB0aGlzLmhlYWQubmV4dDtcbiAgICAgIC0tdGhpcy5sZW5ndGg7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbGVhclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG51bGw7XG4gICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImpvaW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gam9pbihzKSB7XG4gICAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVybiAnJztcbiAgICAgIHZhciBwID0gdGhpcy5oZWFkO1xuICAgICAgdmFyIHJldCA9ICcnICsgcC5kYXRhO1xuXG4gICAgICB3aGlsZSAocCA9IHAubmV4dCkge1xuICAgICAgICByZXQgKz0gcyArIHAuZGF0YTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29uY2F0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbmNhdChuKSB7XG4gICAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVybiBCdWZmZXIuYWxsb2MoMCk7XG4gICAgICB2YXIgcmV0ID0gQnVmZmVyLmFsbG9jVW5zYWZlKG4gPj4+IDApO1xuICAgICAgdmFyIHAgPSB0aGlzLmhlYWQ7XG4gICAgICB2YXIgaSA9IDA7XG5cbiAgICAgIHdoaWxlIChwKSB7XG4gICAgICAgIGNvcHlCdWZmZXIocC5kYXRhLCByZXQsIGkpO1xuICAgICAgICBpICs9IHAuZGF0YS5sZW5ndGg7XG4gICAgICAgIHAgPSBwLm5leHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSAvLyBDb25zdW1lcyBhIHNwZWNpZmllZCBhbW91bnQgb2YgYnl0ZXMgb3IgY2hhcmFjdGVycyBmcm9tIHRoZSBidWZmZXJlZCBkYXRhLlxuXG4gIH0sIHtcbiAgICBrZXk6IFwiY29uc3VtZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb25zdW1lKG4sIGhhc1N0cmluZ3MpIHtcbiAgICAgIHZhciByZXQ7XG5cbiAgICAgIGlmIChuIDwgdGhpcy5oZWFkLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgIC8vIGBzbGljZWAgaXMgdGhlIHNhbWUgZm9yIGJ1ZmZlcnMgYW5kIHN0cmluZ3MuXG4gICAgICAgIHJldCA9IHRoaXMuaGVhZC5kYXRhLnNsaWNlKDAsIG4pO1xuICAgICAgICB0aGlzLmhlYWQuZGF0YSA9IHRoaXMuaGVhZC5kYXRhLnNsaWNlKG4pO1xuICAgICAgfSBlbHNlIGlmIChuID09PSB0aGlzLmhlYWQuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgLy8gRmlyc3QgY2h1bmsgaXMgYSBwZXJmZWN0IG1hdGNoLlxuICAgICAgICByZXQgPSB0aGlzLnNoaWZ0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXN1bHQgc3BhbnMgbW9yZSB0aGFuIG9uZSBidWZmZXIuXG4gICAgICAgIHJldCA9IGhhc1N0cmluZ3MgPyB0aGlzLl9nZXRTdHJpbmcobikgOiB0aGlzLl9nZXRCdWZmZXIobik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZpcnN0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZpcnN0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGVhZC5kYXRhO1xuICAgIH0gLy8gQ29uc3VtZXMgYSBzcGVjaWZpZWQgYW1vdW50IG9mIGNoYXJhY3RlcnMgZnJvbSB0aGUgYnVmZmVyZWQgZGF0YS5cblxuICB9LCB7XG4gICAga2V5OiBcIl9nZXRTdHJpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFN0cmluZyhuKSB7XG4gICAgICB2YXIgcCA9IHRoaXMuaGVhZDtcbiAgICAgIHZhciBjID0gMTtcbiAgICAgIHZhciByZXQgPSBwLmRhdGE7XG4gICAgICBuIC09IHJldC5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChwID0gcC5uZXh0KSB7XG4gICAgICAgIHZhciBzdHIgPSBwLmRhdGE7XG4gICAgICAgIHZhciBuYiA9IG4gPiBzdHIubGVuZ3RoID8gc3RyLmxlbmd0aCA6IG47XG4gICAgICAgIGlmIChuYiA9PT0gc3RyLmxlbmd0aCkgcmV0ICs9IHN0cjtlbHNlIHJldCArPSBzdHIuc2xpY2UoMCwgbik7XG4gICAgICAgIG4gLT0gbmI7XG5cbiAgICAgICAgaWYgKG4gPT09IDApIHtcbiAgICAgICAgICBpZiAobmIgPT09IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgICAgICsrYztcbiAgICAgICAgICAgIGlmIChwLm5leHQpIHRoaXMuaGVhZCA9IHAubmV4dDtlbHNlIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG51bGw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZCA9IHA7XG4gICAgICAgICAgICBwLmRhdGEgPSBzdHIuc2xpY2UobmIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgKytjO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxlbmd0aCAtPSBjO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9IC8vIENvbnN1bWVzIGEgc3BlY2lmaWVkIGFtb3VudCBvZiBieXRlcyBmcm9tIHRoZSBidWZmZXJlZCBkYXRhLlxuXG4gIH0sIHtcbiAgICBrZXk6IFwiX2dldEJ1ZmZlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0QnVmZmVyKG4pIHtcbiAgICAgIHZhciByZXQgPSBCdWZmZXIuYWxsb2NVbnNhZmUobik7XG4gICAgICB2YXIgcCA9IHRoaXMuaGVhZDtcbiAgICAgIHZhciBjID0gMTtcbiAgICAgIHAuZGF0YS5jb3B5KHJldCk7XG4gICAgICBuIC09IHAuZGF0YS5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChwID0gcC5uZXh0KSB7XG4gICAgICAgIHZhciBidWYgPSBwLmRhdGE7XG4gICAgICAgIHZhciBuYiA9IG4gPiBidWYubGVuZ3RoID8gYnVmLmxlbmd0aCA6IG47XG4gICAgICAgIGJ1Zi5jb3B5KHJldCwgcmV0Lmxlbmd0aCAtIG4sIDAsIG5iKTtcbiAgICAgICAgbiAtPSBuYjtcblxuICAgICAgICBpZiAobiA9PT0gMCkge1xuICAgICAgICAgIGlmIChuYiA9PT0gYnVmLmxlbmd0aCkge1xuICAgICAgICAgICAgKytjO1xuICAgICAgICAgICAgaWYgKHAubmV4dCkgdGhpcy5oZWFkID0gcC5uZXh0O2Vsc2UgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gcDtcbiAgICAgICAgICAgIHAuZGF0YSA9IGJ1Zi5zbGljZShuYik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICArK2M7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGVuZ3RoIC09IGM7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0gLy8gTWFrZSBzdXJlIHRoZSBsaW5rZWQgbGlzdCBvbmx5IHNob3dzIHRoZSBtaW5pbWFsIG5lY2Vzc2FyeSBpbmZvcm1hdGlvbi5cblxuICB9LCB7XG4gICAga2V5OiBjdXN0b20sXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKF8sIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBpbnNwZWN0KHRoaXMsIF9vYmplY3RTcHJlYWQoe30sIG9wdGlvbnMsIHtcbiAgICAgICAgLy8gT25seSBpbnNwZWN0IG9uZSBsZXZlbC5cbiAgICAgICAgZGVwdGg6IDAsXG4gICAgICAgIC8vIEl0IHNob3VsZCBub3QgcmVjdXJzZS5cbiAgICAgICAgY3VzdG9tSW5zcGVjdDogZmFsc2VcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQnVmZmVyTGlzdDtcbn0oKTtcbn0se1wiYnVmZmVyXCI6NSxcInV0aWxcIjo0fV0sMjA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzKXsoZnVuY3Rpb24gKCl7XG4ndXNlIHN0cmljdCc7IC8vIHVuZG9jdW1lbnRlZCBjYigpIEFQSSwgbmVlZGVkIGZvciBjb3JlLCBub3QgZm9yIHB1YmxpYyBBUElcblxuZnVuY3Rpb24gZGVzdHJveShlcnIsIGNiKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdmFyIHJlYWRhYmxlRGVzdHJveWVkID0gdGhpcy5fcmVhZGFibGVTdGF0ZSAmJiB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZDtcbiAgdmFyIHdyaXRhYmxlRGVzdHJveWVkID0gdGhpcy5fd3JpdGFibGVTdGF0ZSAmJiB0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZDtcblxuICBpZiAocmVhZGFibGVEZXN0cm95ZWQgfHwgd3JpdGFibGVEZXN0cm95ZWQpIHtcbiAgICBpZiAoY2IpIHtcbiAgICAgIGNiKGVycik7XG4gICAgfSBlbHNlIGlmIChlcnIpIHtcbiAgICAgIGlmICghdGhpcy5fd3JpdGFibGVTdGF0ZSkge1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGVtaXRFcnJvck5ULCB0aGlzLCBlcnIpO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQpIHtcbiAgICAgICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQgPSB0cnVlO1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGVtaXRFcnJvck5ULCB0aGlzLCBlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9IC8vIHdlIHNldCBkZXN0cm95ZWQgdG8gdHJ1ZSBiZWZvcmUgZmlyaW5nIGVycm9yIGNhbGxiYWNrcyBpbiBvcmRlclxuICAvLyB0byBtYWtlIGl0IHJlLWVudHJhbmNlIHNhZmUgaW4gY2FzZSBkZXN0cm95KCkgaXMgY2FsbGVkIHdpdGhpbiBjYWxsYmFja3NcblxuXG4gIGlmICh0aGlzLl9yZWFkYWJsZVN0YXRlKSB7XG4gICAgdGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQgPSB0cnVlO1xuICB9IC8vIGlmIHRoaXMgaXMgYSBkdXBsZXggc3RyZWFtIG1hcmsgdGhlIHdyaXRhYmxlIHBhcnQgYXMgZGVzdHJveWVkIGFzIHdlbGxcblxuXG4gIGlmICh0aGlzLl93cml0YWJsZVN0YXRlKSB7XG4gICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQgPSB0cnVlO1xuICB9XG5cbiAgdGhpcy5fZGVzdHJveShlcnIgfHwgbnVsbCwgZnVuY3Rpb24gKGVycikge1xuICAgIGlmICghY2IgJiYgZXJyKSB7XG4gICAgICBpZiAoIV90aGlzLl93cml0YWJsZVN0YXRlKSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZW1pdEVycm9yQW5kQ2xvc2VOVCwgX3RoaXMsIGVycik7XG4gICAgICB9IGVsc2UgaWYgKCFfdGhpcy5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQpIHtcbiAgICAgICAgX3RoaXMuX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkID0gdHJ1ZTtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhlbWl0RXJyb3JBbmRDbG9zZU5ULCBfdGhpcywgZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZW1pdENsb3NlTlQsIF90aGlzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNiKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGVtaXRDbG9zZU5ULCBfdGhpcyk7XG4gICAgICBjYihlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGVtaXRDbG9zZU5ULCBfdGhpcyk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gZW1pdEVycm9yQW5kQ2xvc2VOVChzZWxmLCBlcnIpIHtcbiAgZW1pdEVycm9yTlQoc2VsZiwgZXJyKTtcbiAgZW1pdENsb3NlTlQoc2VsZik7XG59XG5cbmZ1bmN0aW9uIGVtaXRDbG9zZU5UKHNlbGYpIHtcbiAgaWYgKHNlbGYuX3dyaXRhYmxlU3RhdGUgJiYgIXNlbGYuX3dyaXRhYmxlU3RhdGUuZW1pdENsb3NlKSByZXR1cm47XG4gIGlmIChzZWxmLl9yZWFkYWJsZVN0YXRlICYmICFzZWxmLl9yZWFkYWJsZVN0YXRlLmVtaXRDbG9zZSkgcmV0dXJuO1xuICBzZWxmLmVtaXQoJ2Nsb3NlJyk7XG59XG5cbmZ1bmN0aW9uIHVuZGVzdHJveSgpIHtcbiAgaWYgKHRoaXMuX3JlYWRhYmxlU3RhdGUpIHtcbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZCA9IGZhbHNlO1xuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUucmVhZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUuZW5kZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9yZWFkYWJsZVN0YXRlLmVuZEVtaXR0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLl93cml0YWJsZVN0YXRlKSB7XG4gICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmVuZGVkID0gZmFsc2U7XG4gICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5lbmRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmZpbmFsQ2FsbGVkID0gZmFsc2U7XG4gICAgdGhpcy5fd3JpdGFibGVTdGF0ZS5wcmVmaW5pc2hlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZmluaXNoZWQgPSBmYWxzZTtcbiAgICB0aGlzLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCA9IGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVtaXRFcnJvck5UKHNlbGYsIGVycikge1xuICBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKTtcbn1cblxuZnVuY3Rpb24gZXJyb3JPckRlc3Ryb3koc3RyZWFtLCBlcnIpIHtcbiAgLy8gV2UgaGF2ZSB0ZXN0cyB0aGF0IHJlbHkgb24gZXJyb3JzIGJlaW5nIGVtaXR0ZWRcbiAgLy8gaW4gdGhlIHNhbWUgdGljaywgc28gY2hhbmdpbmcgdGhpcyBpcyBzZW12ZXIgbWFqb3IuXG4gIC8vIEZvciBub3cgd2hlbiB5b3Ugb3B0LWluIHRvIGF1dG9EZXN0cm95IHdlIGFsbG93XG4gIC8vIHRoZSBlcnJvciB0byBiZSBlbWl0dGVkIG5leHRUaWNrLiBJbiBhIGZ1dHVyZVxuICAvLyBzZW12ZXIgbWFqb3IgdXBkYXRlIHdlIHNob3VsZCBjaGFuZ2UgdGhlIGRlZmF1bHQgdG8gdGhpcy5cbiAgdmFyIHJTdGF0ZSA9IHN0cmVhbS5fcmVhZGFibGVTdGF0ZTtcbiAgdmFyIHdTdGF0ZSA9IHN0cmVhbS5fd3JpdGFibGVTdGF0ZTtcbiAgaWYgKHJTdGF0ZSAmJiByU3RhdGUuYXV0b0Rlc3Ryb3kgfHwgd1N0YXRlICYmIHdTdGF0ZS5hdXRvRGVzdHJveSkgc3RyZWFtLmRlc3Ryb3koZXJyKTtlbHNlIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVycik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBkZXN0cm95OiBkZXN0cm95LFxuICB1bmRlc3Ryb3k6IHVuZGVzdHJveSxcbiAgZXJyb3JPckRlc3Ryb3k6IGVycm9yT3JEZXN0cm95XG59O1xufSkuY2FsbCh0aGlzKX0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpKVxufSx7XCJfcHJvY2Vzc1wiOjl9XSwyMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBQb3J0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbWFmaW50b3NoL2VuZC1vZi1zdHJlYW0gd2l0aFxuLy8gcGVybWlzc2lvbiBmcm9tIHRoZSBhdXRob3IsIE1hdGhpYXMgQnV1cyAoQG1hZmludG9zaCkuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBFUlJfU1RSRUFNX1BSRU1BVFVSRV9DTE9TRSA9IHJlcXVpcmUoJy4uLy4uLy4uL2Vycm9ycycpLmNvZGVzLkVSUl9TVFJFQU1fUFJFTUFUVVJFX0NMT1NFO1xuXG5mdW5jdGlvbiBvbmNlKGNhbGxiYWNrKSB7XG4gIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY2FsbGVkKSByZXR1cm47XG4gICAgY2FsbGVkID0gdHJ1ZTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIGlzUmVxdWVzdChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS5zZXRIZWFkZXIgJiYgdHlwZW9mIHN0cmVhbS5hYm9ydCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gZW9zKHN0cmVhbSwgb3B0cywgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSByZXR1cm4gZW9zKHN0cmVhbSwgbnVsbCwgb3B0cyk7XG4gIGlmICghb3B0cykgb3B0cyA9IHt9O1xuICBjYWxsYmFjayA9IG9uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gIHZhciByZWFkYWJsZSA9IG9wdHMucmVhZGFibGUgfHwgb3B0cy5yZWFkYWJsZSAhPT0gZmFsc2UgJiYgc3RyZWFtLnJlYWRhYmxlO1xuICB2YXIgd3JpdGFibGUgPSBvcHRzLndyaXRhYmxlIHx8IG9wdHMud3JpdGFibGUgIT09IGZhbHNlICYmIHN0cmVhbS53cml0YWJsZTtcblxuICB2YXIgb25sZWdhY3lmaW5pc2ggPSBmdW5jdGlvbiBvbmxlZ2FjeWZpbmlzaCgpIHtcbiAgICBpZiAoIXN0cmVhbS53cml0YWJsZSkgb25maW5pc2goKTtcbiAgfTtcblxuICB2YXIgd3JpdGFibGVFbmRlZCA9IHN0cmVhbS5fd3JpdGFibGVTdGF0ZSAmJiBzdHJlYW0uX3dyaXRhYmxlU3RhdGUuZmluaXNoZWQ7XG5cbiAgdmFyIG9uZmluaXNoID0gZnVuY3Rpb24gb25maW5pc2goKSB7XG4gICAgd3JpdGFibGUgPSBmYWxzZTtcbiAgICB3cml0YWJsZUVuZGVkID0gdHJ1ZTtcbiAgICBpZiAoIXJlYWRhYmxlKSBjYWxsYmFjay5jYWxsKHN0cmVhbSk7XG4gIH07XG5cbiAgdmFyIHJlYWRhYmxlRW5kZWQgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGUgJiYgc3RyZWFtLl9yZWFkYWJsZVN0YXRlLmVuZEVtaXR0ZWQ7XG5cbiAgdmFyIG9uZW5kID0gZnVuY3Rpb24gb25lbmQoKSB7XG4gICAgcmVhZGFibGUgPSBmYWxzZTtcbiAgICByZWFkYWJsZUVuZGVkID0gdHJ1ZTtcbiAgICBpZiAoIXdyaXRhYmxlKSBjYWxsYmFjay5jYWxsKHN0cmVhbSk7XG4gIH07XG5cbiAgdmFyIG9uZXJyb3IgPSBmdW5jdGlvbiBvbmVycm9yKGVycikge1xuICAgIGNhbGxiYWNrLmNhbGwoc3RyZWFtLCBlcnIpO1xuICB9O1xuXG4gIHZhciBvbmNsb3NlID0gZnVuY3Rpb24gb25jbG9zZSgpIHtcbiAgICB2YXIgZXJyO1xuXG4gICAgaWYgKHJlYWRhYmxlICYmICFyZWFkYWJsZUVuZGVkKSB7XG4gICAgICBpZiAoIXN0cmVhbS5fcmVhZGFibGVTdGF0ZSB8fCAhc3RyZWFtLl9yZWFkYWJsZVN0YXRlLmVuZGVkKSBlcnIgPSBuZXcgRVJSX1NUUkVBTV9QUkVNQVRVUkVfQ0xPU0UoKTtcbiAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKHN0cmVhbSwgZXJyKTtcbiAgICB9XG5cbiAgICBpZiAod3JpdGFibGUgJiYgIXdyaXRhYmxlRW5kZWQpIHtcbiAgICAgIGlmICghc3RyZWFtLl93cml0YWJsZVN0YXRlIHx8ICFzdHJlYW0uX3dyaXRhYmxlU3RhdGUuZW5kZWQpIGVyciA9IG5ldyBFUlJfU1RSRUFNX1BSRU1BVFVSRV9DTE9TRSgpO1xuICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwoc3RyZWFtLCBlcnIpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgb25yZXF1ZXN0ID0gZnVuY3Rpb24gb25yZXF1ZXN0KCkge1xuICAgIHN0cmVhbS5yZXEub24oJ2ZpbmlzaCcsIG9uZmluaXNoKTtcbiAgfTtcblxuICBpZiAoaXNSZXF1ZXN0KHN0cmVhbSkpIHtcbiAgICBzdHJlYW0ub24oJ2NvbXBsZXRlJywgb25maW5pc2gpO1xuICAgIHN0cmVhbS5vbignYWJvcnQnLCBvbmNsb3NlKTtcbiAgICBpZiAoc3RyZWFtLnJlcSkgb25yZXF1ZXN0KCk7ZWxzZSBzdHJlYW0ub24oJ3JlcXVlc3QnLCBvbnJlcXVlc3QpO1xuICB9IGVsc2UgaWYgKHdyaXRhYmxlICYmICFzdHJlYW0uX3dyaXRhYmxlU3RhdGUpIHtcbiAgICAvLyBsZWdhY3kgc3RyZWFtc1xuICAgIHN0cmVhbS5vbignZW5kJywgb25sZWdhY3lmaW5pc2gpO1xuICAgIHN0cmVhbS5vbignY2xvc2UnLCBvbmxlZ2FjeWZpbmlzaCk7XG4gIH1cblxuICBzdHJlYW0ub24oJ2VuZCcsIG9uZW5kKTtcbiAgc3RyZWFtLm9uKCdmaW5pc2gnLCBvbmZpbmlzaCk7XG4gIGlmIChvcHRzLmVycm9yICE9PSBmYWxzZSkgc3RyZWFtLm9uKCdlcnJvcicsIG9uZXJyb3IpO1xuICBzdHJlYW0ub24oJ2Nsb3NlJywgb25jbG9zZSk7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgc3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdjb21wbGV0ZScsIG9uZmluaXNoKTtcbiAgICBzdHJlYW0ucmVtb3ZlTGlzdGVuZXIoJ2Fib3J0Jywgb25jbG9zZSk7XG4gICAgc3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdyZXF1ZXN0Jywgb25yZXF1ZXN0KTtcbiAgICBpZiAoc3RyZWFtLnJlcSkgc3RyZWFtLnJlcS5yZW1vdmVMaXN0ZW5lcignZmluaXNoJywgb25maW5pc2gpO1xuICAgIHN0cmVhbS5yZW1vdmVMaXN0ZW5lcignZW5kJywgb25sZWdhY3lmaW5pc2gpO1xuICAgIHN0cmVhbS5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmxlZ2FjeWZpbmlzaCk7XG4gICAgc3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdmaW5pc2gnLCBvbmZpbmlzaCk7XG4gICAgc3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCBvbmVuZCk7XG4gICAgc3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgIHN0cmVhbS5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlb3M7XG59LHtcIi4uLy4uLy4uL2Vycm9yc1wiOjEyfV0sMjI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHRocm93IG5ldyBFcnJvcignUmVhZGFibGUuZnJvbSBpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBicm93c2VyJylcbn07XG5cbn0se31dLDIzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8vIFBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYWZpbnRvc2gvcHVtcCB3aXRoXG4vLyBwZXJtaXNzaW9uIGZyb20gdGhlIGF1dGhvciwgTWF0aGlhcyBCdXVzIChAbWFmaW50b3NoKS5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVvcztcblxuZnVuY3Rpb24gb25jZShjYWxsYmFjaykge1xuICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNhbGxlZCkgcmV0dXJuO1xuICAgIGNhbGxlZCA9IHRydWU7XG4gICAgY2FsbGJhY2suYXBwbHkodm9pZCAwLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG52YXIgX3JlcXVpcmUkY29kZXMgPSByZXF1aXJlKCcuLi8uLi8uLi9lcnJvcnMnKS5jb2RlcyxcbiAgICBFUlJfTUlTU0lOR19BUkdTID0gX3JlcXVpcmUkY29kZXMuRVJSX01JU1NJTkdfQVJHUyxcbiAgICBFUlJfU1RSRUFNX0RFU1RST1lFRCA9IF9yZXF1aXJlJGNvZGVzLkVSUl9TVFJFQU1fREVTVFJPWUVEO1xuXG5mdW5jdGlvbiBub29wKGVycikge1xuICAvLyBSZXRocm93IHRoZSBlcnJvciBpZiBpdCBleGlzdHMgdG8gYXZvaWQgc3dhbGxvd2luZyBpdFxuICBpZiAoZXJyKSB0aHJvdyBlcnI7XG59XG5cbmZ1bmN0aW9uIGlzUmVxdWVzdChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS5zZXRIZWFkZXIgJiYgdHlwZW9mIHN0cmVhbS5hYm9ydCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gZGVzdHJveWVyKHN0cmVhbSwgcmVhZGluZywgd3JpdGluZywgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2sgPSBvbmNlKGNhbGxiYWNrKTtcbiAgdmFyIGNsb3NlZCA9IGZhbHNlO1xuICBzdHJlYW0ub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgIGNsb3NlZCA9IHRydWU7XG4gIH0pO1xuICBpZiAoZW9zID09PSB1bmRlZmluZWQpIGVvcyA9IHJlcXVpcmUoJy4vZW5kLW9mLXN0cmVhbScpO1xuICBlb3Moc3RyZWFtLCB7XG4gICAgcmVhZGFibGU6IHJlYWRpbmcsXG4gICAgd3JpdGFibGU6IHdyaXRpbmdcbiAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgIGNsb3NlZCA9IHRydWU7XG4gICAgY2FsbGJhY2soKTtcbiAgfSk7XG4gIHZhciBkZXN0cm95ZWQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoY2xvc2VkKSByZXR1cm47XG4gICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuO1xuICAgIGRlc3Ryb3llZCA9IHRydWU7IC8vIHJlcXVlc3QuZGVzdHJveSBqdXN0IGRvIC5lbmQgLSAuYWJvcnQgaXMgd2hhdCB3ZSB3YW50XG5cbiAgICBpZiAoaXNSZXF1ZXN0KHN0cmVhbSkpIHJldHVybiBzdHJlYW0uYWJvcnQoKTtcbiAgICBpZiAodHlwZW9mIHN0cmVhbS5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSByZXR1cm4gc3RyZWFtLmRlc3Ryb3koKTtcbiAgICBjYWxsYmFjayhlcnIgfHwgbmV3IEVSUl9TVFJFQU1fREVTVFJPWUVEKCdwaXBlJykpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjYWxsKGZuKSB7XG4gIGZuKCk7XG59XG5cbmZ1bmN0aW9uIHBpcGUoZnJvbSwgdG8pIHtcbiAgcmV0dXJuIGZyb20ucGlwZSh0byk7XG59XG5cbmZ1bmN0aW9uIHBvcENhbGxiYWNrKHN0cmVhbXMpIHtcbiAgaWYgKCFzdHJlYW1zLmxlbmd0aCkgcmV0dXJuIG5vb3A7XG4gIGlmICh0eXBlb2Ygc3RyZWFtc1tzdHJlYW1zLmxlbmd0aCAtIDFdICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gbm9vcDtcbiAgcmV0dXJuIHN0cmVhbXMucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHBpcGVsaW5lKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgc3RyZWFtcyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBzdHJlYW1zW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgdmFyIGNhbGxiYWNrID0gcG9wQ2FsbGJhY2soc3RyZWFtcyk7XG4gIGlmIChBcnJheS5pc0FycmF5KHN0cmVhbXNbMF0pKSBzdHJlYW1zID0gc3RyZWFtc1swXTtcblxuICBpZiAoc3RyZWFtcy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ3N0cmVhbXMnKTtcbiAgfVxuXG4gIHZhciBlcnJvcjtcbiAgdmFyIGRlc3Ryb3lzID0gc3RyZWFtcy5tYXAoZnVuY3Rpb24gKHN0cmVhbSwgaSkge1xuICAgIHZhciByZWFkaW5nID0gaSA8IHN0cmVhbXMubGVuZ3RoIC0gMTtcbiAgICB2YXIgd3JpdGluZyA9IGkgPiAwO1xuICAgIHJldHVybiBkZXN0cm95ZXIoc3RyZWFtLCByZWFkaW5nLCB3cml0aW5nLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiAgICAgIGlmIChlcnIpIGRlc3Ryb3lzLmZvckVhY2goY2FsbCk7XG4gICAgICBpZiAocmVhZGluZykgcmV0dXJuO1xuICAgICAgZGVzdHJveXMuZm9yRWFjaChjYWxsKTtcbiAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBzdHJlYW1zLnJlZHVjZShwaXBlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwaXBlbGluZTtcbn0se1wiLi4vLi4vLi4vZXJyb3JzXCI6MTIsXCIuL2VuZC1vZi1zdHJlYW1cIjoyMX1dLDI0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIEVSUl9JTlZBTElEX09QVF9WQUxVRSA9IHJlcXVpcmUoJy4uLy4uLy4uL2Vycm9ycycpLmNvZGVzLkVSUl9JTlZBTElEX09QVF9WQUxVRTtcblxuZnVuY3Rpb24gaGlnaFdhdGVyTWFya0Zyb20ob3B0aW9ucywgaXNEdXBsZXgsIGR1cGxleEtleSkge1xuICByZXR1cm4gb3B0aW9ucy5oaWdoV2F0ZXJNYXJrICE9IG51bGwgPyBvcHRpb25zLmhpZ2hXYXRlck1hcmsgOiBpc0R1cGxleCA/IG9wdGlvbnNbZHVwbGV4S2V5XSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldEhpZ2hXYXRlck1hcmsoc3RhdGUsIG9wdGlvbnMsIGR1cGxleEtleSwgaXNEdXBsZXgpIHtcbiAgdmFyIGh3bSA9IGhpZ2hXYXRlck1hcmtGcm9tKG9wdGlvbnMsIGlzRHVwbGV4LCBkdXBsZXhLZXkpO1xuXG4gIGlmIChod20gIT0gbnVsbCkge1xuICAgIGlmICghKGlzRmluaXRlKGh3bSkgJiYgTWF0aC5mbG9vcihod20pID09PSBod20pIHx8IGh3bSA8IDApIHtcbiAgICAgIHZhciBuYW1lID0gaXNEdXBsZXggPyBkdXBsZXhLZXkgOiAnaGlnaFdhdGVyTWFyayc7XG4gICAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfT1BUX1ZBTFVFKG5hbWUsIGh3bSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoaHdtKTtcbiAgfSAvLyBEZWZhdWx0IHZhbHVlXG5cblxuICByZXR1cm4gc3RhdGUub2JqZWN0TW9kZSA/IDE2IDogMTYgKiAxMDI0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0SGlnaFdhdGVyTWFyazogZ2V0SGlnaFdhdGVyTWFya1xufTtcbn0se1wiLi4vLi4vLi4vZXJyb3JzXCI6MTJ9XSwyNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxufSx7XCJldmVudHNcIjo2fV0sMjY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cblxudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbnZhciBpc0VuY29kaW5nID0gQnVmZmVyLmlzRW5jb2RpbmcgfHwgZnVuY3Rpb24gKGVuY29kaW5nKSB7XG4gIGVuY29kaW5nID0gJycgKyBlbmNvZGluZztcbiAgc3dpdGNoIChlbmNvZGluZyAmJiBlbmNvZGluZy50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpjYXNlICd1dGY4JzpjYXNlICd1dGYtOCc6Y2FzZSAnYXNjaWknOmNhc2UgJ2JpbmFyeSc6Y2FzZSAnYmFzZTY0JzpjYXNlICd1Y3MyJzpjYXNlICd1Y3MtMic6Y2FzZSAndXRmMTZsZSc6Y2FzZSAndXRmLTE2bGUnOmNhc2UgJ3Jhdyc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5mdW5jdGlvbiBfbm9ybWFsaXplRW5jb2RpbmcoZW5jKSB7XG4gIGlmICghZW5jKSByZXR1cm4gJ3V0ZjgnO1xuICB2YXIgcmV0cmllZDtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuYykge1xuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiAndXRmOCc7XG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gJ3V0ZjE2bGUnO1xuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiAnbGF0aW4xJztcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gZW5jO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHJldHJpZWQpIHJldHVybjsgLy8gdW5kZWZpbmVkXG4gICAgICAgIGVuYyA9ICgnJyArIGVuYykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0cmllZCA9IHRydWU7XG4gICAgfVxuICB9XG59O1xuXG4vLyBEbyBub3QgY2FjaGUgYEJ1ZmZlci5pc0VuY29kaW5nYCB3aGVuIGNoZWNraW5nIGVuY29kaW5nIG5hbWVzIGFzIHNvbWVcbi8vIG1vZHVsZXMgbW9ua2V5LXBhdGNoIGl0IHRvIHN1cHBvcnQgYWRkaXRpb25hbCBlbmNvZGluZ3NcbmZ1bmN0aW9uIG5vcm1hbGl6ZUVuY29kaW5nKGVuYykge1xuICB2YXIgbmVuYyA9IF9ub3JtYWxpemVFbmNvZGluZyhlbmMpO1xuICBpZiAodHlwZW9mIG5lbmMgIT09ICdzdHJpbmcnICYmIChCdWZmZXIuaXNFbmNvZGluZyA9PT0gaXNFbmNvZGluZyB8fCAhaXNFbmNvZGluZyhlbmMpKSkgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jKTtcbiAgcmV0dXJuIG5lbmMgfHwgZW5jO1xufVxuXG4vLyBTdHJpbmdEZWNvZGVyIHByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgZWZmaWNpZW50bHkgc3BsaXR0aW5nIGEgc2VyaWVzIG9mXG4vLyBidWZmZXJzIGludG8gYSBzZXJpZXMgb2YgSlMgc3RyaW5ncyB3aXRob3V0IGJyZWFraW5nIGFwYXJ0IG11bHRpLWJ5dGVcbi8vIGNoYXJhY3RlcnMuXG5leHBvcnRzLlN0cmluZ0RlY29kZXIgPSBTdHJpbmdEZWNvZGVyO1xuZnVuY3Rpb24gU3RyaW5nRGVjb2RlcihlbmNvZGluZykge1xuICB0aGlzLmVuY29kaW5nID0gbm9ybWFsaXplRW5jb2RpbmcoZW5jb2RpbmcpO1xuICB2YXIgbmI7XG4gIHN3aXRjaCAodGhpcy5lbmNvZGluZykge1xuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgdGhpcy50ZXh0ID0gdXRmMTZUZXh0O1xuICAgICAgdGhpcy5lbmQgPSB1dGYxNkVuZDtcbiAgICAgIG5iID0gNDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgdGhpcy5maWxsTGFzdCA9IHV0ZjhGaWxsTGFzdDtcbiAgICAgIG5iID0gNDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICB0aGlzLnRleHQgPSBiYXNlNjRUZXh0O1xuICAgICAgdGhpcy5lbmQgPSBiYXNlNjRFbmQ7XG4gICAgICBuYiA9IDM7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpcy53cml0ZSA9IHNpbXBsZVdyaXRlO1xuICAgICAgdGhpcy5lbmQgPSBzaW1wbGVFbmQ7XG4gICAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5sYXN0TmVlZCA9IDA7XG4gIHRoaXMubGFzdFRvdGFsID0gMDtcbiAgdGhpcy5sYXN0Q2hhciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShuYik7XG59XG5cblN0cmluZ0RlY29kZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKGJ1Zikge1xuICBpZiAoYnVmLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnO1xuICB2YXIgcjtcbiAgdmFyIGk7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSB7XG4gICAgciA9IHRoaXMuZmlsbExhc3QoYnVmKTtcbiAgICBpZiAociA9PT0gdW5kZWZpbmVkKSByZXR1cm4gJyc7XG4gICAgaSA9IHRoaXMubGFzdE5lZWQ7XG4gICAgdGhpcy5sYXN0TmVlZCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgaSA9IDA7XG4gIH1cbiAgaWYgKGkgPCBidWYubGVuZ3RoKSByZXR1cm4gciA/IHIgKyB0aGlzLnRleHQoYnVmLCBpKSA6IHRoaXMudGV4dChidWYsIGkpO1xuICByZXR1cm4gciB8fCAnJztcbn07XG5cblN0cmluZ0RlY29kZXIucHJvdG90eXBlLmVuZCA9IHV0ZjhFbmQ7XG5cbi8vIFJldHVybnMgb25seSBjb21wbGV0ZSBjaGFyYWN0ZXJzIGluIGEgQnVmZmVyXG5TdHJpbmdEZWNvZGVyLnByb3RvdHlwZS50ZXh0ID0gdXRmOFRleHQ7XG5cbi8vIEF0dGVtcHRzIHRvIGNvbXBsZXRlIGEgcGFydGlhbCBub24tVVRGLTggY2hhcmFjdGVyIHVzaW5nIGJ5dGVzIGZyb20gYSBCdWZmZXJcblN0cmluZ0RlY29kZXIucHJvdG90eXBlLmZpbGxMYXN0ID0gZnVuY3Rpb24gKGJ1Zikge1xuICBpZiAodGhpcy5sYXN0TmVlZCA8PSBidWYubGVuZ3RoKSB7XG4gICAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgdGhpcy5sYXN0VG90YWwgLSB0aGlzLmxhc3ROZWVkLCAwLCB0aGlzLmxhc3ROZWVkKTtcbiAgICByZXR1cm4gdGhpcy5sYXN0Q2hhci50b1N0cmluZyh0aGlzLmVuY29kaW5nLCAwLCB0aGlzLmxhc3RUb3RhbCk7XG4gIH1cbiAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgdGhpcy5sYXN0VG90YWwgLSB0aGlzLmxhc3ROZWVkLCAwLCBidWYubGVuZ3RoKTtcbiAgdGhpcy5sYXN0TmVlZCAtPSBidWYubGVuZ3RoO1xufTtcblxuLy8gQ2hlY2tzIHRoZSB0eXBlIG9mIGEgVVRGLTggYnl0ZSwgd2hldGhlciBpdCdzIEFTQ0lJLCBhIGxlYWRpbmcgYnl0ZSwgb3IgYVxuLy8gY29udGludWF0aW9uIGJ5dGUuIElmIGFuIGludmFsaWQgYnl0ZSBpcyBkZXRlY3RlZCwgLTIgaXMgcmV0dXJuZWQuXG5mdW5jdGlvbiB1dGY4Q2hlY2tCeXRlKGJ5dGUpIHtcbiAgaWYgKGJ5dGUgPD0gMHg3RikgcmV0dXJuIDA7ZWxzZSBpZiAoYnl0ZSA+PiA1ID09PSAweDA2KSByZXR1cm4gMjtlbHNlIGlmIChieXRlID4+IDQgPT09IDB4MEUpIHJldHVybiAzO2Vsc2UgaWYgKGJ5dGUgPj4gMyA9PT0gMHgxRSkgcmV0dXJuIDQ7XG4gIHJldHVybiBieXRlID4+IDYgPT09IDB4MDIgPyAtMSA6IC0yO1xufVxuXG4vLyBDaGVja3MgYXQgbW9zdCAzIGJ5dGVzIGF0IHRoZSBlbmQgb2YgYSBCdWZmZXIgaW4gb3JkZXIgdG8gZGV0ZWN0IGFuXG4vLyBpbmNvbXBsZXRlIG11bHRpLWJ5dGUgVVRGLTggY2hhcmFjdGVyLiBUaGUgdG90YWwgbnVtYmVyIG9mIGJ5dGVzICgyLCAzLCBvciA0KVxuLy8gbmVlZGVkIHRvIGNvbXBsZXRlIHRoZSBVVEYtOCBjaGFyYWN0ZXIgKGlmIGFwcGxpY2FibGUpIGFyZSByZXR1cm5lZC5cbmZ1bmN0aW9uIHV0ZjhDaGVja0luY29tcGxldGUoc2VsZiwgYnVmLCBpKSB7XG4gIHZhciBqID0gYnVmLmxlbmd0aCAtIDE7XG4gIGlmIChqIDwgaSkgcmV0dXJuIDA7XG4gIHZhciBuYiA9IHV0ZjhDaGVja0J5dGUoYnVmW2pdKTtcbiAgaWYgKG5iID49IDApIHtcbiAgICBpZiAobmIgPiAwKSBzZWxmLmxhc3ROZWVkID0gbmIgLSAxO1xuICAgIHJldHVybiBuYjtcbiAgfVxuICBpZiAoLS1qIDwgaSB8fCBuYiA9PT0gLTIpIHJldHVybiAwO1xuICBuYiA9IHV0ZjhDaGVja0J5dGUoYnVmW2pdKTtcbiAgaWYgKG5iID49IDApIHtcbiAgICBpZiAobmIgPiAwKSBzZWxmLmxhc3ROZWVkID0gbmIgLSAyO1xuICAgIHJldHVybiBuYjtcbiAgfVxuICBpZiAoLS1qIDwgaSB8fCBuYiA9PT0gLTIpIHJldHVybiAwO1xuICBuYiA9IHV0ZjhDaGVja0J5dGUoYnVmW2pdKTtcbiAgaWYgKG5iID49IDApIHtcbiAgICBpZiAobmIgPiAwKSB7XG4gICAgICBpZiAobmIgPT09IDIpIG5iID0gMDtlbHNlIHNlbGYubGFzdE5lZWQgPSBuYiAtIDM7XG4gICAgfVxuICAgIHJldHVybiBuYjtcbiAgfVxuICByZXR1cm4gMDtcbn1cblxuLy8gVmFsaWRhdGVzIGFzIG1hbnkgY29udGludWF0aW9uIGJ5dGVzIGZvciBhIG11bHRpLWJ5dGUgVVRGLTggY2hhcmFjdGVyIGFzXG4vLyBuZWVkZWQgb3IgYXJlIGF2YWlsYWJsZS4gSWYgd2Ugc2VlIGEgbm9uLWNvbnRpbnVhdGlvbiBieXRlIHdoZXJlIHdlIGV4cGVjdFxuLy8gb25lLCB3ZSBcInJlcGxhY2VcIiB0aGUgdmFsaWRhdGVkIGNvbnRpbnVhdGlvbiBieXRlcyB3ZSd2ZSBzZWVuIHNvIGZhciB3aXRoXG4vLyBhIHNpbmdsZSBVVEYtOCByZXBsYWNlbWVudCBjaGFyYWN0ZXIgKCdcXHVmZmZkJyksIHRvIG1hdGNoIHY4J3MgVVRGLTggZGVjb2Rpbmdcbi8vIGJlaGF2aW9yLiBUaGUgY29udGludWF0aW9uIGJ5dGUgY2hlY2sgaXMgaW5jbHVkZWQgdGhyZWUgdGltZXMgaW4gdGhlIGNhc2Vcbi8vIHdoZXJlIGFsbCBvZiB0aGUgY29udGludWF0aW9uIGJ5dGVzIGZvciBhIGNoYXJhY3RlciBleGlzdCBpbiB0aGUgc2FtZSBidWZmZXIuXG4vLyBJdCBpcyBhbHNvIGRvbmUgdGhpcyB3YXkgYXMgYSBzbGlnaHQgcGVyZm9ybWFuY2UgaW5jcmVhc2UgaW5zdGVhZCBvZiB1c2luZyBhXG4vLyBsb29wLlxuZnVuY3Rpb24gdXRmOENoZWNrRXh0cmFCeXRlcyhzZWxmLCBidWYsIHApIHtcbiAgaWYgKChidWZbMF0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgIHNlbGYubGFzdE5lZWQgPSAwO1xuICAgIHJldHVybiAnXFx1ZmZmZCc7XG4gIH1cbiAgaWYgKHNlbGYubGFzdE5lZWQgPiAxICYmIGJ1Zi5sZW5ndGggPiAxKSB7XG4gICAgaWYgKChidWZbMV0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgICAgc2VsZi5sYXN0TmVlZCA9IDE7XG4gICAgICByZXR1cm4gJ1xcdWZmZmQnO1xuICAgIH1cbiAgICBpZiAoc2VsZi5sYXN0TmVlZCA+IDIgJiYgYnVmLmxlbmd0aCA+IDIpIHtcbiAgICAgIGlmICgoYnVmWzJdICYgMHhDMCkgIT09IDB4ODApIHtcbiAgICAgICAgc2VsZi5sYXN0TmVlZCA9IDI7XG4gICAgICAgIHJldHVybiAnXFx1ZmZmZCc7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIEF0dGVtcHRzIHRvIGNvbXBsZXRlIGEgbXVsdGktYnl0ZSBVVEYtOCBjaGFyYWN0ZXIgdXNpbmcgYnl0ZXMgZnJvbSBhIEJ1ZmZlci5cbmZ1bmN0aW9uIHV0ZjhGaWxsTGFzdChidWYpIHtcbiAgdmFyIHAgPSB0aGlzLmxhc3RUb3RhbCAtIHRoaXMubGFzdE5lZWQ7XG4gIHZhciByID0gdXRmOENoZWNrRXh0cmFCeXRlcyh0aGlzLCBidWYsIHApO1xuICBpZiAociAhPT0gdW5kZWZpbmVkKSByZXR1cm4gcjtcbiAgaWYgKHRoaXMubGFzdE5lZWQgPD0gYnVmLmxlbmd0aCkge1xuICAgIGJ1Zi5jb3B5KHRoaXMubGFzdENoYXIsIHAsIDAsIHRoaXMubGFzdE5lZWQpO1xuICAgIHJldHVybiB0aGlzLmxhc3RDaGFyLnRvU3RyaW5nKHRoaXMuZW5jb2RpbmcsIDAsIHRoaXMubGFzdFRvdGFsKTtcbiAgfVxuICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCBwLCAwLCBidWYubGVuZ3RoKTtcbiAgdGhpcy5sYXN0TmVlZCAtPSBidWYubGVuZ3RoO1xufVxuXG4vLyBSZXR1cm5zIGFsbCBjb21wbGV0ZSBVVEYtOCBjaGFyYWN0ZXJzIGluIGEgQnVmZmVyLiBJZiB0aGUgQnVmZmVyIGVuZGVkIG9uIGFcbi8vIHBhcnRpYWwgY2hhcmFjdGVyLCB0aGUgY2hhcmFjdGVyJ3MgYnl0ZXMgYXJlIGJ1ZmZlcmVkIHVudGlsIHRoZSByZXF1aXJlZFxuLy8gbnVtYmVyIG9mIGJ5dGVzIGFyZSBhdmFpbGFibGUuXG5mdW5jdGlvbiB1dGY4VGV4dChidWYsIGkpIHtcbiAgdmFyIHRvdGFsID0gdXRmOENoZWNrSW5jb21wbGV0ZSh0aGlzLCBidWYsIGkpO1xuICBpZiAoIXRoaXMubGFzdE5lZWQpIHJldHVybiBidWYudG9TdHJpbmcoJ3V0ZjgnLCBpKTtcbiAgdGhpcy5sYXN0VG90YWwgPSB0b3RhbDtcbiAgdmFyIGVuZCA9IGJ1Zi5sZW5ndGggLSAodG90YWwgLSB0aGlzLmxhc3ROZWVkKTtcbiAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgMCwgZW5kKTtcbiAgcmV0dXJuIGJ1Zi50b1N0cmluZygndXRmOCcsIGksIGVuZCk7XG59XG5cbi8vIEZvciBVVEYtOCwgYSByZXBsYWNlbWVudCBjaGFyYWN0ZXIgaXMgYWRkZWQgd2hlbiBlbmRpbmcgb24gYSBwYXJ0aWFsXG4vLyBjaGFyYWN0ZXIuXG5mdW5jdGlvbiB1dGY4RW5kKGJ1Zikge1xuICB2YXIgciA9IGJ1ZiAmJiBidWYubGVuZ3RoID8gdGhpcy53cml0ZShidWYpIDogJyc7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSByZXR1cm4gciArICdcXHVmZmZkJztcbiAgcmV0dXJuIHI7XG59XG5cbi8vIFVURi0xNkxFIHR5cGljYWxseSBuZWVkcyB0d28gYnl0ZXMgcGVyIGNoYXJhY3RlciwgYnV0IGV2ZW4gaWYgd2UgaGF2ZSBhbiBldmVuXG4vLyBudW1iZXIgb2YgYnl0ZXMgYXZhaWxhYmxlLCB3ZSBuZWVkIHRvIGNoZWNrIGlmIHdlIGVuZCBvbiBhIGxlYWRpbmcvaGlnaFxuLy8gc3Vycm9nYXRlLiBJbiB0aGF0IGNhc2UsIHdlIG5lZWQgdG8gd2FpdCBmb3IgdGhlIG5leHQgdHdvIGJ5dGVzIGluIG9yZGVyIHRvXG4vLyBkZWNvZGUgdGhlIGxhc3QgY2hhcmFjdGVyIHByb3Blcmx5LlxuZnVuY3Rpb24gdXRmMTZUZXh0KGJ1ZiwgaSkge1xuICBpZiAoKGJ1Zi5sZW5ndGggLSBpKSAlIDIgPT09IDApIHtcbiAgICB2YXIgciA9IGJ1Zi50b1N0cmluZygndXRmMTZsZScsIGkpO1xuICAgIGlmIChyKSB7XG4gICAgICB2YXIgYyA9IHIuY2hhckNvZGVBdChyLmxlbmd0aCAtIDEpO1xuICAgICAgaWYgKGMgPj0gMHhEODAwICYmIGMgPD0gMHhEQkZGKSB7XG4gICAgICAgIHRoaXMubGFzdE5lZWQgPSAyO1xuICAgICAgICB0aGlzLmxhc3RUb3RhbCA9IDQ7XG4gICAgICAgIHRoaXMubGFzdENoYXJbMF0gPSBidWZbYnVmLmxlbmd0aCAtIDJdO1xuICAgICAgICB0aGlzLmxhc3RDaGFyWzFdID0gYnVmW2J1Zi5sZW5ndGggLSAxXTtcbiAgICAgICAgcmV0dXJuIHIuc2xpY2UoMCwgLTEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfVxuICB0aGlzLmxhc3ROZWVkID0gMTtcbiAgdGhpcy5sYXN0VG90YWwgPSAyO1xuICB0aGlzLmxhc3RDaGFyWzBdID0gYnVmW2J1Zi5sZW5ndGggLSAxXTtcbiAgcmV0dXJuIGJ1Zi50b1N0cmluZygndXRmMTZsZScsIGksIGJ1Zi5sZW5ndGggLSAxKTtcbn1cblxuLy8gRm9yIFVURi0xNkxFIHdlIGRvIG5vdCBleHBsaWNpdGx5IGFwcGVuZCBzcGVjaWFsIHJlcGxhY2VtZW50IGNoYXJhY3RlcnMgaWYgd2Vcbi8vIGVuZCBvbiBhIHBhcnRpYWwgY2hhcmFjdGVyLCB3ZSBzaW1wbHkgbGV0IHY4IGhhbmRsZSB0aGF0LlxuZnVuY3Rpb24gdXRmMTZFbmQoYnVmKSB7XG4gIHZhciByID0gYnVmICYmIGJ1Zi5sZW5ndGggPyB0aGlzLndyaXRlKGJ1ZikgOiAnJztcbiAgaWYgKHRoaXMubGFzdE5lZWQpIHtcbiAgICB2YXIgZW5kID0gdGhpcy5sYXN0VG90YWwgLSB0aGlzLmxhc3ROZWVkO1xuICAgIHJldHVybiByICsgdGhpcy5sYXN0Q2hhci50b1N0cmluZygndXRmMTZsZScsIDAsIGVuZCk7XG4gIH1cbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRleHQoYnVmLCBpKSB7XG4gIHZhciBuID0gKGJ1Zi5sZW5ndGggLSBpKSAlIDM7XG4gIGlmIChuID09PSAwKSByZXR1cm4gYnVmLnRvU3RyaW5nKCdiYXNlNjQnLCBpKTtcbiAgdGhpcy5sYXN0TmVlZCA9IDMgLSBuO1xuICB0aGlzLmxhc3RUb3RhbCA9IDM7XG4gIGlmIChuID09PSAxKSB7XG4gICAgdGhpcy5sYXN0Q2hhclswXSA9IGJ1ZltidWYubGVuZ3RoIC0gMV07XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5sYXN0Q2hhclswXSA9IGJ1ZltidWYubGVuZ3RoIC0gMl07XG4gICAgdGhpcy5sYXN0Q2hhclsxXSA9IGJ1ZltidWYubGVuZ3RoIC0gMV07XG4gIH1cbiAgcmV0dXJuIGJ1Zi50b1N0cmluZygnYmFzZTY0JywgaSwgYnVmLmxlbmd0aCAtIG4pO1xufVxuXG5mdW5jdGlvbiBiYXNlNjRFbmQoYnVmKSB7XG4gIHZhciByID0gYnVmICYmIGJ1Zi5sZW5ndGggPyB0aGlzLndyaXRlKGJ1ZikgOiAnJztcbiAgaWYgKHRoaXMubGFzdE5lZWQpIHJldHVybiByICsgdGhpcy5sYXN0Q2hhci50b1N0cmluZygnYmFzZTY0JywgMCwgMyAtIHRoaXMubGFzdE5lZWQpO1xuICByZXR1cm4gcjtcbn1cblxuLy8gUGFzcyBieXRlcyBvbiB0aHJvdWdoIGZvciBzaW5nbGUtYnl0ZSBlbmNvZGluZ3MgKGUuZy4gYXNjaWksIGxhdGluMSwgaGV4KVxuZnVuY3Rpb24gc2ltcGxlV3JpdGUoYnVmKSB7XG4gIHJldHVybiBidWYudG9TdHJpbmcodGhpcy5lbmNvZGluZyk7XG59XG5cbmZ1bmN0aW9uIHNpbXBsZUVuZChidWYpIHtcbiAgcmV0dXJuIGJ1ZiAmJiBidWYubGVuZ3RoID8gdGhpcy53cml0ZShidWYpIDogJyc7XG59XG59LHtcInNhZmUtYnVmZmVyXCI6MTB9XSwyNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHNldEltbWVkaWF0ZSxjbGVhckltbWVkaWF0ZSl7KGZ1bmN0aW9uICgpe1xudmFyIG5leHRUaWNrID0gcmVxdWlyZSgncHJvY2Vzcy9icm93c2VyLmpzJykubmV4dFRpY2s7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgaW1tZWRpYXRlSWRzID0ge307XG52YXIgbmV4dEltbWVkaWF0ZUlkID0gMDtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHsgdGltZW91dC5jbG9zZSgpOyB9O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHdpbmRvdywgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIFRoYXQncyBub3QgaG93IG5vZGUuanMgaW1wbGVtZW50cyBpdCBidXQgdGhlIGV4cG9zZWQgYXBpIGlzIHRoZSBzYW1lLlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXRJbW1lZGlhdGUgOiBmdW5jdGlvbihmbikge1xuICB2YXIgaWQgPSBuZXh0SW1tZWRpYXRlSWQrKztcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGZhbHNlIDogc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gIGltbWVkaWF0ZUlkc1tpZF0gPSB0cnVlO1xuXG4gIG5leHRUaWNrKGZ1bmN0aW9uIG9uTmV4dFRpY2soKSB7XG4gICAgaWYgKGltbWVkaWF0ZUlkc1tpZF0pIHtcbiAgICAgIC8vIGZuLmNhbGwoKSBpcyBmYXN0ZXIgc28gd2Ugb3B0aW1pemUgZm9yIHRoZSBjb21tb24gdXNlLWNhc2VcbiAgICAgIC8vIEBzZWUgaHR0cDovL2pzcGVyZi5jb20vY2FsbC1hcHBseS1zZWd1XG4gICAgICBpZiAoYXJncykge1xuICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCk7XG4gICAgICB9XG4gICAgICAvLyBQcmV2ZW50IGlkcyBmcm9tIGxlYWtpbmdcbiAgICAgIGV4cG9ydHMuY2xlYXJJbW1lZGlhdGUoaWQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGlkO1xufTtcblxuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9IHR5cGVvZiBjbGVhckltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gY2xlYXJJbW1lZGlhdGUgOiBmdW5jdGlvbihpZCkge1xuICBkZWxldGUgaW1tZWRpYXRlSWRzW2lkXTtcbn07XG59KS5jYWxsKHRoaXMpfSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJ0aW1lcnNcIikuc2V0SW1tZWRpYXRlLHJlcXVpcmUoXCJ0aW1lcnNcIikuY2xlYXJJbW1lZGlhdGUpXG59LHtcInByb2Nlc3MvYnJvd3Nlci5qc1wiOjksXCJ0aW1lcnNcIjoyN31dLDI4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXsoZnVuY3Rpb24gKCl7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBkZXByZWNhdGU7XG5cbi8qKlxuICogTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbiAqIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4gKlxuICogSWYgYGxvY2FsU3RvcmFnZS5ub0RlcHJlY2F0aW9uID0gdHJ1ZWAgaXMgc2V0LCB0aGVuIGl0IGlzIGEgbm8tb3AuXG4gKlxuICogSWYgYGxvY2FsU3RvcmFnZS50aHJvd0RlcHJlY2F0aW9uID0gdHJ1ZWAgaXMgc2V0LCB0aGVuIGRlcHJlY2F0ZWQgZnVuY3Rpb25zXG4gKiB3aWxsIHRocm93IGFuIEVycm9yIHdoZW4gaW52b2tlZC5cbiAqXG4gKiBJZiBgbG9jYWxTdG9yYWdlLnRyYWNlRGVwcmVjYXRpb24gPSB0cnVlYCBpcyBzZXQsIHRoZW4gZGVwcmVjYXRlZCBmdW5jdGlvbnNcbiAqIHdpbGwgaW52b2tlIGBjb25zb2xlLnRyYWNlKClgIGluc3RlYWQgb2YgYGNvbnNvbGUuZXJyb3IoKWAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgZnVuY3Rpb24gdG8gZGVwcmVjYXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gbXNnIC0gdGhlIHN0cmluZyB0byBwcmludCB0byB0aGUgY29uc29sZSB3aGVuIGBmbmAgaXMgaW52b2tlZFxuICogQHJldHVybnMge0Z1bmN0aW9ufSBhIG5ldyBcImRlcHJlY2F0ZWRcIiB2ZXJzaW9uIG9mIGBmbmBcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGVwcmVjYXRlIChmbiwgbXNnKSB7XG4gIGlmIChjb25maWcoJ25vRGVwcmVjYXRpb24nKSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKGNvbmZpZygndGhyb3dEZXByZWNhdGlvbicpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfSBlbHNlIGlmIChjb25maWcoJ3RyYWNlRGVwcmVjYXRpb24nKSkge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGBsb2NhbFN0b3JhZ2VgIGZvciBib29sZWFuIHZhbHVlcyBmb3IgdGhlIGdpdmVuIGBuYW1lYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb25maWcgKG5hbWUpIHtcbiAgLy8gYWNjZXNzaW5nIGdsb2JhbC5sb2NhbFN0b3JhZ2UgY2FuIHRyaWdnZXIgYSBET01FeGNlcHRpb24gaW4gc2FuZGJveGVkIGlmcmFtZXNcbiAgdHJ5IHtcbiAgICBpZiAoIWdsb2JhbC5sb2NhbFN0b3JhZ2UpIHJldHVybiBmYWxzZTtcbiAgfSBjYXRjaCAoXykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdmFsID0gZ2xvYmFsLmxvY2FsU3RvcmFnZVtuYW1lXTtcbiAgaWYgKG51bGwgPT0gdmFsKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBTdHJpbmcodmFsKS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG59XG5cbn0pLmNhbGwodGhpcyl9KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se31dfSx7fSxbMl0pKDIpXG59KTtcbiIsICJcblxudHlwZSBUaW5uZXJWYXJzID0geyBbczogc3RyaW5nXTogYm9vbGVhbiB8IHN0cmluZyB8IG51bWJlciB9XG5jbGFzcyBUYWJsZUhhbmRsZXIge1xuICByZXdyaXRlckluc3RhbmNlOiBIVE1MVGFibGVQYXJzZXJcbiAgY29uc3RydWN0b3IocmV3cml0ZXJJbnN0YW5jZTogSFRNTFRhYmxlUGFyc2VyKSB7XG4gICAgdGhpcy5yZXdyaXRlckluc3RhbmNlID0gcmV3cml0ZXJJbnN0YW5jZVxuICB9XG4gIGVsZW1lbnQoZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmICghdGhpcy5yZXdyaXRlckluc3RhbmNlLmlzQ2FwdHVyaW5nKSB7XG4gICAgICB0aGlzLnJld3JpdGVySW5zdGFuY2UuaXNDYXB0dXJpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIGVsZW1lbnQucmVtb3ZlQW5kS2VlcENvbnRlbnQoKTtcbiAgICBlbGVtZW50LmJlZm9yZSgnPC9wcmU+fGN1dHxbJywgeyBodG1sOiB0cnVlIH0pO1xuICAgIGVsZW1lbnQuYWZ0ZXIoJ118Y3V0fDxwcmU+JywgeyBodG1sOiB0cnVlIH0pO1xuICB9XG59XG5jbGFzcyBSb3dIYW5kbGVyIHtcblxuICBlbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpIHtcblxuICAgIGVsZW1lbnQucmVtb3ZlQW5kS2VlcENvbnRlbnQoKTtcbiAgICBlbGVtZW50LmJlZm9yZSgnWycpO1xuICAgIGVsZW1lbnQuYWZ0ZXIoJ10sJyk7XG5cbiAgfVxufVxuY2xhc3MgQ2VsbEhhbmRsZXIge1xuXG4gIGVsZW1lbnQoZWxlbWVudDogRWxlbWVudCkge1xuICAgIGVsZW1lbnQucmVtb3ZlQW5kS2VlcENvbnRlbnQoKTtcbiAgICBlbGVtZW50LmJlZm9yZSgnXCInKTtcbiAgICBlbGVtZW50LmFmdGVyKCdcIiwnKTtcblxuICB9XG5cbn1cbmNsYXNzIFJlbW92ZXJIYW5kbGVyIHtcblxuICB3cmFwID0gZmFsc2U7XG4gIHJld3JpdGVySW5zdGFuY2U6IEhUTUxUYWJsZVBhcnNlclxuICBwcmVzZXJ2aW5nID0gZmFsc2VcbiAgY29uc3RydWN0b3IocmV3cml0ZXJJbnN0YW5jZTogSFRNTFRhYmxlUGFyc2VyLCB7IHdyYXAgPSBmYWxzZSwgcHJlc2VydmluZyA9IGZhbHNlIH0gPSB7fSkge1xuICAgIHRoaXMucHJlc2VydmluZyA9IHByZXNlcnZpbmdcbiAgICB0aGlzLndyYXAgPSB3cmFwO1xuICAgIHRoaXMucmV3cml0ZXJJbnN0YW5jZSA9IHJld3JpdGVySW5zdGFuY2VcblxuICB9XG4gIGVsZW1lbnQoZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmICh0aGlzLnByZXNlcnZpbmcpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlQW5kS2VlcENvbnRlbnQoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMud3JhcCkge1xuICAgICAgZWxlbWVudC5wcmVwZW5kKCc8cHJlPicsIHsgaHRtbDogdHJ1ZSB9KTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kKCc8L3ByZT4nLCB7IGh0bWw6IHRydWUgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG5cbiAgICAgIGNvbnNvbGUubG9nKCdSZW1vdmVySGFuZGxlcicsIHsgdGFnTmFtZTogZWxlbWVudC50YWdOYW1lIH0pXG4gICAgfVxuXG5cbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgY2xhc3MgSFRNTFRhYmxlUGFyc2VyIHtcbiAgcmV3cml0ZXJJbnN0YW5jZTogVGlubmVyVmFyc1xuICBpc0NhcHR1cmluZyA9IGZhbHNlXG4gIHRhYmxlU2VsZWN0b3JzOiBzdHJpbmdbXVxuICByb3dTZWxlY3RvcnM6IHN0cmluZ1tdXG4gIGNlbGxTZWxlY3RvcnM6IHN0cmluZ1tdXG4gIGFsd2F5c1JlbW92ZTogc3RyaW5nW11cbiAgcmVtb3ZlUHJlc2VydmluZzogc3RyaW5nW11cbiAgY29uc3RydWN0b3Ioe1xuICAgIHRhYmxlU2VsZWN0b3JzID0gWyd0YWJsZSddLCByb3dTZWxlY3RvcnMgPSBbJ3RyJ10sIHJlbW92ZVByZXNlcnZpbmcgPSBbJ3RoZWFkJywgJ3Rib2R5J10sIGNlbGxTZWxlY3RvcnMgPSBbJ3RkJywgJ3RoJ10sIGFsd2F5c1JlbW92ZSA9IFsnaGVhZCddXG4gIH06IHsgdGFibGVTZWxlY3RvcnM/OiBzdHJpbmdbXSwgcm93U2VsZWN0b3JzPzogc3RyaW5nW10sIGNlbGxTZWxlY3RvcnM/OiBzdHJpbmdbXSwgYWx3YXlzUmVtb3ZlPzogc3RyaW5nW10sIHJlbW92ZVByZXNlcnZpbmc/OiBzdHJpbmdbXSB9KSB7XG4gICAgdGhpcy50YWJsZVNlbGVjdG9ycyA9IHRhYmxlU2VsZWN0b3JzXG4gICAgdGhpcy5hbHdheXNSZW1vdmUgPSBhbHdheXNSZW1vdmVcbiAgICB0aGlzLnJlbW92ZVByZXNlcnZpbmcgPSByZW1vdmVQcmVzZXJ2aW5nXG4gICAgdGhpcy5yb3dTZWxlY3RvcnMgPSByb3dTZWxlY3RvcnNcbiAgICB0aGlzLmNlbGxTZWxlY3RvcnMgPSBjZWxsU2VsZWN0b3JzXG4gICAgdGhpcy5yZXdyaXRlckluc3RhbmNlID0geyBpc0NhcHR1cmluZzogZmFsc2UgfVxuXG4gIH1cblxuXG5cbiAgdHJhbnNmb3JtKHJlczogUmVzcG9uc2UpOiBSZXNwb25zZSB7XG4gICAgbGV0IGN0eXBlID0gU3RyaW5nKHJlcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpXG4gICAgaWYgKCFjdHlwZS5pbmNsdWRlcygnaHRtbCcpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlY2VpdmVkIGEgbm9uLWh0bWwgY29udGVudCB0eXBlOiAke2N0eXBlfWApXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHsgY3R5cGUgfSlcbiAgICBjb25zdCByZXdyaXRlcjEgPSBuZXcgSFRNTFJld3JpdGVyKClcbiAgICAgIC5vbignYm9keScsIG5ldyBSZW1vdmVySGFuZGxlcih0aGlzLCB7IHdyYXA6IHRydWUgfSkpXG4gICAgdGhpcy5hbHdheXNSZW1vdmUuZm9yRWFjaChzZWxlY3RvciA9PiB7XG5cbiAgICAgIHJld3JpdGVyMS5vbihzZWxlY3RvciwgbmV3IFJlbW92ZXJIYW5kbGVyKHRoaXMpKVxuICAgIH0pO1xuICAgIHRoaXMucmVtb3ZlUHJlc2VydmluZy5mb3JFYWNoKHNlbGVjdG9yID0+IHtcblxuICAgICAgcmV3cml0ZXIxLm9uKHNlbGVjdG9yLCBuZXcgUmVtb3ZlckhhbmRsZXIodGhpcywgeyB3cmFwOiBmYWxzZSwgcHJlc2VydmluZzogdHJ1ZSB9KSlcbiAgICB9KTtcbiAgICB0aGlzLnRhYmxlU2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4ge1xuXG4gICAgICByZXdyaXRlcjEub24oc2VsZWN0b3IsIG5ldyBUYWJsZUhhbmRsZXIodGhpcykpXG4gICAgfSk7XG4gICAgdGhpcy5yb3dTZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG5cbiAgICAgIHJld3JpdGVyMS5vbihzZWxlY3RvciwgbmV3IFJvd0hhbmRsZXIoKSlcbiAgICB9KTtcbiAgICB0aGlzLmNlbGxTZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiB7XG5cbiAgICAgIHJld3JpdGVyMS5vbihzZWxlY3RvciwgbmV3IENlbGxIYW5kbGVyKCkpXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IEhUTUxSZXdyaXRlcigpXG4gICAgICAub24oJ3ByZScsIG5ldyBSZW1vdmVySGFuZGxlcih0aGlzKSlcblxuXG4gICAgICAudHJhbnNmb3JtKChyZXdyaXRlcjEudHJhbnNmb3JtKHJlcykpKTtcblxuICB9XG59XG5cbi8qICBodHRwczovL3d3dy51c2NmaW52ZXN0bWVudHMuY29tL3NpdGUtdGVtcGxhdGUvYXNzZXRzL2phdmFzY3JpcHQvYXBpX2tleS5waHBcbmN1cmwgJ2h0dHBzOi8vc2VjdXJlLmFscHNpbmMuY29tL01hcmtldGluZ0FQSS9hcGkvdjEvaG9sZGluZy9VU0wnIFxcXG4gIC1IICdDb25uZWN0aW9uOiBrZWVwLWFsaXZlJyBcXFxuICAtSCAnc2VjLWNoLXVhOiBcIkNocm9taXVtXCI7dj1cIjkyXCIsIFwiIE5vdCBBO0JyYW5kXCI7dj1cIjk5XCIsIFwiR29vZ2xlIENocm9tZVwiO3Y9XCI5MlwiJyBcXFxuICAtSCAnQWNjZXB0OiBhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L2phdmFzY3JpcHQsICwgYXBwbGljYXRpb24vamF2YXNjcmlwdCcgXFxcbiAgLUggJ0F1dGhvcml6YXRpb246IEJlYXJlciBleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpVeE1pSjkuZXlKcFlYUWlPakUyTWprME5EYzVPRGNzSW1wMGFTSTZJalU1TjBZd09EQXhMVEl5UmpVdE5ETXlNUzA1UmtKRkxUa3dOVVEwTWpJMU5UaEdOeUlzSW1semN5STZJbmQzZHk1MWMyTm1hVzUyWlhOMGJXVnVkSE11WTI5dElpd2ljM1ZpSWpvaWFIUjBjSE02WEM5Y0wyTnpjMlZqZFhKbExtRnNjSE5wYm1NdVkyOXRYQzloY0dsY0wzWXhYQzhpTENKdVltWWlPakUyTWprME5EYzVPRGNzSW1WNGNDSTZNVFl5T1RVek5ETTROMzAuVWRaYTc1UDVFQVRkN3k4bFBCYWtBOUtyeVdlT09DMjF4YU9ocUhHSTVvY3V5eThUQnpPRFZ6bnpqZG5TZVlsNTE5cDZzYk9yWmRWT3h5d2NoSVV2bmcnIFxcXG4gIC1IICdzZWMtY2gtdWEtbW9iaWxlOiA/MCcgXFxcbiAgLUggJ1VzZXItQWdlbnQ6IE1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkyLjAuNDUxNS4xMzEgU2FmYXJpLzUzNy4zNicgXFxcbiAgLUggJ09yaWdpbjogaHR0cHM6Ly93d3cudXNjZmludmVzdG1lbnRzLmNvbScgXFxcbiAgLUggJ1NlYy1GZXRjaC1TaXRlOiBjcm9zcy1zaXRlJyBcXFxuICAtSCAnU2VjLUZldGNoLU1vZGU6IGNvcnMnIFxcXG4gIC1IICdTZWMtRmV0Y2gtRGVzdDogZW1wdHknIFxcXG4gIC1IICdSZWZlcmVyOiBodHRwczovL3d3dy51c2NmaW52ZXN0bWVudHMuY29tLycgXFxcbiAgLUggJ0FjY2VwdC1MYW5ndWFnZTogZW4sZXMtQ0w7cT0wLjksZXMtNDE5O3E9MC44LGVzO3E9MC43LGl0O3E9MC42LGZyO3E9MC41LGxhO3E9MC40JyBcXFxuICAtLWNvbXByZXNzZWRcbiAgKi8iLCAiaW1wb3J0IHBhcnNlIGZyb20gJ2Nzdi1wYXJzZS9saWIvYnJvd3Nlcic7XG5cblxuXG5leHBvcnQgdHlwZSBUQ2VsbFR5cGUgPSAoc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSB8IG51bGwgfCB1bmRlZmluZWQpXG5leHBvcnQgaW50ZXJmYWNlIFRPYmplY3RSb3cge1xuICAgIFtzOiBzdHJpbmddOiBUQ2VsbFR5cGVcbn1cbmV4cG9ydCB0eXBlIFRSb3dUeXBlID0gVENlbGxUeXBlW10gfCBUT2JqZWN0Um93IHwgUmVjb3JkPHN0cmluZywgVENlbGxUeXBlPiB8IEl0ZXJhYmxlPHVua25vd24+XG5cbmV4cG9ydCBjbGFzcyBTdHJlYW1pbmdDU1ZQYXJzZXI8VCBleHRlbmRzIFRSb3dUeXBlID0gVFJvd1R5cGU+IHtcbiAgICBwYXJzZXI6IHBhcnNlLlBhcnNlcjtcbiAgICByZWFkYWJsZTogUmVhZGFibGVTdHJlYW08YW55PjtcbiAgICB3cml0YWJsZTogV3JpdGFibGVTdHJlYW08YW55PjtcbiAgICBzZXBhcmF0b3IgPSAnWyc7XG4gICAgcGFyc2VkQXJyYXkgPSBbXSBhcyBUW107XG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogcGFyc2UuT3B0aW9ucykge1xuICAgICAgICBjb25zdCBwYXJzZXIgPSBwYXJzZShvcHRpb25zKTtcbiAgICAgICAgcGFyc2VyLnByb21pc2VkV3JpdGUgPSAoY2h1bms6IHN0cmluZyB8IEJ1ZmZlciB8IFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgcGFyc2VyLndyaXRlKGNodW5rLCAoZXJyb3I6IEVycm9yIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoKSkgYXMgdm9pZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG5cblxuICAgICAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgICAgICBsZXQgeyByZWFkYWJsZSwgd3JpdGFibGUgfSA9IG5ldyBUcmFuc2Zvcm1TdHJlYW0oKTtcbiAgICAgICAgdGhpcy5yZWFkYWJsZSA9IHJlYWRhYmxlO1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gd3JpdGFibGU7XG4gICAgICAgIHRoaXMucGFyc2VyLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnI6IEVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVyci5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uKGV2ZW50OiBzdHJpbmcsIGNiOiB7ICguLi5hcmdzOiBhbnlbXSk6IHZvaWQ7IH0pOiB0aGlzIHtcbiAgICAgICAgdGhpcy5wYXJzZXIub24oZXZlbnQsIGNiKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFzeW5jIGZyb21SZXF1ZXN0KHJlcTogUmVxdWVzdCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IGZldGNoKHJlcSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybShyZXMpO1xuICAgIH1cbiAgICBhc3luYyBwYXJzZShyZXM6IFJlc3BvbnNlKTogUHJvbWlzZTxUW10+IHtcbiAgICAgICAgaWYgKCFyZXMgfHwgIXJlcy5ib2R5KSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMucGFyc2VkQXJyYXkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IHJlcy5ib2R5LmdldFJlYWRlcigpLCBwYXJzZXIgPSB0aGlzLnBhcnNlcjtcblxuICAgICAgICBwYXJzZXIub24oJ3JlYWRhYmxlJywgKHJlY29yZDogVCkgPT4ge1xuICAgICAgICAgICAgd2hpbGUgKHJlY29yZCA9IHBhcnNlci5yZWFkKCkgYXMgVCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VkQXJyYXkucHVzaChyZWNvcmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVhZGVyLnJlYWQoKS50aGVuKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHByb2Nlc3NUZXh0KHsgZG9uZSwgdmFsdWU6IHZhbHVlXzEgfSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmVuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNvbHZlKG51bGwpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VyLnByb21pc2VkV3JpdGUodmFsdWVfMSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWQoKS50aGVuKHByb2Nlc3NUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZWRBcnJheTtcbiAgICB9XG4gICAgdHJhbnNmb3JtKHJlczogUmVzcG9uc2UpOiBSZXNwb25zZSB7XG4gICAgICAgIGlmICghcmVzIHx8ICFyZXMuYm9keSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgICBsZXQgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpLCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG4gICAgICAgIGxldCB7IHJlYWRhYmxlLCB3cml0YWJsZSB9ID0gbmV3IFRyYW5zZm9ybVN0cmVhbTxVaW50OEFycmF5LCBVaW50OEFycmF5PigpO1xuICAgICAgICBjb25zdCB3cml0ZXIgPSB3cml0YWJsZS5nZXRXcml0ZXIoKSwgcmVhZGVyID0gcmVzLmJvZHkuZ2V0UmVhZGVyKCksIHBhcnNlciA9IHRoaXMucGFyc2VyO1xuXG4gICAgICAgIHBhcnNlci5vbigncmVhZGFibGUnLCAocmVjb3JkOiBUKSA9PiB7XG4gICAgICAgICAgICB3aGlsZSAocmVjb3JkID0gcGFyc2VyLnJlYWQoKSkge1xuICAgICAgICAgICAgICAgIGxldCBjaHVraWZpZWRSZWNvcmQgPSBlbmNvZGVyLmVuY29kZSh0aGlzLnNlcGFyYXRvciArIEpTT04uc3RyaW5naWZ5KHJlY29yZCkpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd3cml0ZSB0byBnZXRXcml0ZXInLCBjaHVraWZpZWRSZWNvcmQpXG4gICAgICAgICAgICAgICAgd3JpdGVyLndyaXRlKGNodWtpZmllZFJlY29yZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXBhcmF0b3IgPSAnLCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlYWRlci5yZWFkKCkudGhlbihcbiAgICAgICAgICAgIGZ1bmN0aW9uIHByb2Nlc3NUZXh0KHsgZG9uZSwgdmFsdWUgfSk6IFByb21pc2U8bnVsbD4ge1xuICAgICAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlci53cml0ZShlbmNvZGVyLmVuY29kZSgnXScpKTtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmVuZCgpO1xuICAgICAgICAgICAgICAgICAgICB3cml0ZXIuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlci5wcm9taXNlZFdyaXRlKHZhbHVlKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncHJvbWlzZWRXcml0ZSB0byBwYXJzZXInKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWQoKS50aGVuKHByb2Nlc3NUZXh0KTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWFkZXIucmVhZCgpLnRoZW4ocHJvY2Vzc1RleHQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShcbiAgICAgICAgICAgIHJlYWRhYmxlLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04JyB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLE1BQUMsVUFBUyxHQUFFO0FBQUMsWUFBRyxPQUFPLFlBQVUsWUFBVSxPQUFPLFdBQVMsYUFBWTtBQUFDLGlCQUFPLFVBQVE7QUFBQSxtQkFBWSxPQUFPLFdBQVMsY0FBWSxPQUFPLEtBQUk7QUFBQyxpQkFBTyxJQUFHO0FBQUEsZUFBTztBQUFDLGNBQUk7QUFBRSxjQUFHLE9BQU8sV0FBUyxhQUFZO0FBQUMsZ0JBQUU7QUFBQSxxQkFBZSxPQUFPLFdBQVMsYUFBWTtBQUFDLGdC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
