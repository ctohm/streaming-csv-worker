(() => {
  var xe = Object.create;
  var he = Object.defineProperty;
  var Le = Object.getOwnPropertyDescriptor;
  var je = Object.getOwnPropertyNames;
  var Ie = Object.getPrototypeOf, Me = Object.prototype.hasOwnProperty;
  var Ae = (u) => he(u, "__esModule", { value: !0 });
  var be = (u, i) => () => (i || u((i = { exports: {} }).exports, i), i.exports);
  var De = (u, i, S) => {
    if (i && typeof i == "object" || typeof i == "function")
      for (let L of je(i))
        !Me.call(u, L) && L !== "default" && he(u, L, { get: () => i[L], enumerable: !(S = Le(i, L)) || S.enumerable });
    return u;
  }, ve = (u) => De(Ae(he(u != null ? xe(Ie(u)) : {}, "default", u && u.__esModule && "default" in u ? { get: () => u.default, enumerable: !0 } : { value: u, enumerable: !0 })), u);

  // node_modules/streamsaver/StreamSaver.js
  var Ee = be((de, pe) => {
    ((u, i) => {
      typeof pe != "undefined" ? pe.exports = i() : typeof define == "function" && typeof define.amd == "object" ? define(i) : de[u] = i();
    })("streamSaver", () => {
      "use strict";
      let u = typeof window == "object" ? window : de;
      u.HTMLElement || console.warn("streamsaver is meant to run on browsers main thread");
      let i = null, S = !1, L = (R) => {
        try {
          R();
        } catch (m) {
        }
      }, M = u.WebStreamsPolyfill || {}, w = u.isSecureContext, n = /constructor/i.test(u.HTMLElement) || !!u.safari || !!u.WebKitPoint, T = w || "MozAppearance" in document.documentElement.style ? "iframe" : "navigate", y = {
        createWriteStream: V,
        WritableStream: u.WritableStream || M.WritableStream,
        supported: !0,
        version: { full: "2.0.5", major: 2, minor: 0, dot: 5 },
        mitm: "https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0"
      };
      function N(R) {
        if (!R)
          throw new Error("meh");
        let m = document.createElement("iframe");
        return m.hidden = !0, m.src = R, m.loaded = !1, m.name = "iframe", m.isIframe = !0, m.postMessage = (...H) => m.contentWindow.postMessage(...H), m.addEventListener("load", () => {
          m.loaded = !0;
        }, { once: !0 }), document.body.appendChild(m), m;
      }
      function I(R) {
        let m = "width=200,height=100", H = document.createDocumentFragment(), C = {
          frame: u.open(R, "popup", m),
          loaded: !1,
          isIframe: !1,
          isPopup: !0,
          remove() {
            C.frame.close();
          },
          addEventListener(...k) {
            H.addEventListener(...k);
          },
          dispatchEvent(...k) {
            H.dispatchEvent(...k);
          },
          removeEventListener(...k) {
            H.removeEventListener(...k);
          },
          postMessage(...k) {
            C.frame.postMessage(...k);
          }
        }, ee = (k) => {
          k.source === C.frame && (C.loaded = !0, u.removeEventListener("message", ee), C.dispatchEvent(new Event("load")));
        };
        return u.addEventListener("message", ee), C;
      }
      try {
        new Response(new ReadableStream()), w && !("serviceWorker" in navigator) && (n = !0);
      } catch (R) {
        n = !0;
      }
      L(() => {
        let { readable: R } = new TransformStream(), m = new MessageChannel();
        m.port1.postMessage(R, [R]), m.port1.close(), m.port2.close(), S = !0, Object.defineProperty(y, "TransformStream", {
          configurable: !1,
          writable: !1,
          value: TransformStream
        });
      });
      function U() {
        i || (i = w ? N(y.mitm) : I(y.mitm));
      }
      function V(R, m, H) {
        let C = {
          size: null,
          pathname: null,
          writableStrategy: void 0,
          readableStrategy: void 0
        }, ee = 0, k = null, W = null, Z = null;
        if (Number.isFinite(m) ? ([H, m] = [m, H], console.warn("[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream"), C.size = H, C.writableStrategy = m) : m && m.highWaterMark ? (console.warn("[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream"), C.size = H, C.writableStrategy = m) : C = m || {}, !n) {
          U(), W = new MessageChannel(), R = encodeURIComponent(R.replace(/\//g, ":")).replace(/['()]/g, escape).replace(/\*/g, "%2A");
          let t = {
            transferringReadable: S,
            pathname: C.pathname || Math.random().toString().slice(-6) + "/" + R,
            headers: {
              "Content-Type": "application/octet-stream; charset=utf-8",
              "Content-Disposition": "attachment; filename*=UTF-8''" + R
            }
          };
          C.size && (t.headers["Content-Length"] = C.size);
          let e = [t, "*", [W.port2]];
          if (S) {
            let r = T === "iframe" ? void 0 : {
              transform(o, d) {
                if (!(o instanceof Uint8Array))
                  throw new TypeError("Can only wirte Uint8Arrays");
                ee += o.length, d.enqueue(o), k && (location.href = k, k = null);
              },
              flush() {
                k && (location.href = k);
              }
            };
            Z = new y.TransformStream(r, C.writableStrategy, C.readableStrategy);
            let s = Z.readable;
            W.port1.postMessage({ readableStream: s }, [s]);
          }
          W.port1.onmessage = (r) => {
            r.data.download && (T === "navigate" ? (i.remove(), i = null, ee ? location.href = r.data.download : k = r.data.download) : (i.isPopup && (i.remove(), i = null, T === "iframe" && N(y.mitm)), N(r.data.download)));
          }, i.loaded ? i.postMessage(...e) : i.addEventListener("load", () => {
            i.postMessage(...e);
          }, { once: !0 });
        }
        let b = [];
        return !n && Z && Z.writable || new y.WritableStream({
          write(t) {
            if (!(t instanceof Uint8Array))
              throw new TypeError("Can only wirte Uint8Arrays");
            if (n) {
              b.push(t);
              return;
            }
            W.port1.postMessage(t), ee += t.length, k && (location.href = k, k = null);
          },
          close() {
            if (n) {
              let t = new Blob(b, { type: "application/octet-stream; charset=utf-8" }), e = document.createElement("a");
              e.href = URL.createObjectURL(t), e.download = R, e.click();
            } else
              W.port1.postMessage("end");
          },
          abort() {
            b = [], W.port1.postMessage("abort"), W.port1.onmessage = null, W.port1.close(), W.port2.close(), W = null;
          }
        }, C.writableStrategy);
      }
      return y;
    });
  });

  // node_modules/papaparse/papaparse.min.js
  var Se = be((ge, ye) => {
    (function(u, i) {
      typeof define == "function" && define.amd ? define([], i) : typeof ye == "object" && typeof ge != "undefined" ? ye.exports = i() : u.Papa = i();
    })(ge, function u() {
      "use strict";
      var i = typeof self != "undefined" ? self : typeof window != "undefined" ? window : i !== void 0 ? i : {}, S = !i.document && !!i.postMessage, L = S && /blob:/i.test((i.location || {}).protocol), M = {}, w = 0, n = { parse: function(t, e) {
        var r = (e = e || {}).dynamicTyping || !1;
        if (b(r) && (e.dynamicTypingFunction = r, r = {}), e.dynamicTyping = r, e.transform = !!b(e.transform) && e.transform, e.worker && n.WORKERS_SUPPORTED) {
          var s = function() {
            if (!n.WORKERS_SUPPORTED)
              return !1;
            var d = (q = i.URL || i.webkitURL || null, j = u.toString(), n.BLOB_URL || (n.BLOB_URL = q.createObjectURL(new Blob(["(", j, ")();"], { type: "text/javascript" })))), g = new i.Worker(d), q, j;
            return g.onmessage = C, g.id = w++, M[g.id] = g;
          }();
          return s.userStep = e.step, s.userChunk = e.chunk, s.userComplete = e.complete, s.userError = e.error, e.step = b(e.step), e.chunk = b(e.chunk), e.complete = b(e.complete), e.error = b(e.error), delete e.worker, void s.postMessage({ input: t, config: e, workerId: s.id });
        }
        var o = null;
        return n.NODE_STREAM_INPUT, typeof t == "string" ? o = e.download ? new N(e) : new U(e) : t.readable === !0 && b(t.read) && b(t.on) ? o = new V(e) : (i.File && t instanceof File || t instanceof Object) && (o = new I(e)), o.stream(t);
      }, unparse: function(t, e) {
        var r = !1, s = !0, o = ",", d = `\r
`, g = '"', q = g + g, j = !1, l = null, A = !1;
        (function() {
          if (typeof e == "object") {
            if (typeof e.delimiter != "string" || n.BAD_DELIMITERS.filter(function(a) {
              return e.delimiter.indexOf(a) !== -1;
            }).length || (o = e.delimiter), (typeof e.quotes == "boolean" || typeof e.quotes == "function" || Array.isArray(e.quotes)) && (r = e.quotes), typeof e.skipEmptyLines != "boolean" && typeof e.skipEmptyLines != "string" || (j = e.skipEmptyLines), typeof e.newline == "string" && (d = e.newline), typeof e.quoteChar == "string" && (g = e.quoteChar), typeof e.header == "boolean" && (s = e.header), Array.isArray(e.columns)) {
              if (e.columns.length === 0)
                throw new Error("Option columns is empty");
              l = e.columns;
            }
            e.escapeChar !== void 0 && (q = e.escapeChar + g), typeof e.escapeFormulae == "boolean" && (A = e.escapeFormulae);
          }
        })();
        var h = new RegExp(m(g), "g");
        if (typeof t == "string" && (t = JSON.parse(t)), Array.isArray(t)) {
          if (!t.length || Array.isArray(t[0]))
            return re(null, t, j);
          if (typeof t[0] == "object")
            return re(l || Object.keys(t[0]), t, j);
        } else if (typeof t == "object")
          return typeof t.data == "string" && (t.data = JSON.parse(t.data)), Array.isArray(t.data) && (t.fields || (t.fields = t.meta && t.meta.fields), t.fields || (t.fields = Array.isArray(t.data[0]) ? t.fields : typeof t.data[0] == "object" ? Object.keys(t.data[0]) : []), Array.isArray(t.data[0]) || typeof t.data[0] == "object" || (t.data = [t.data])), re(t.fields || [], t.data || [], j);
        throw new Error("Unable to serialize unrecognized input");
        function re(a, O, D) {
          var $ = "";
          typeof a == "string" && (a = JSON.parse(a)), typeof O == "string" && (O = JSON.parse(O));
          var B = Array.isArray(a) && 0 < a.length, P = !Array.isArray(O[0]);
          if (B && s) {
            for (var z = 0; z < a.length; z++)
              0 < z && ($ += o), $ += K(a[z], z);
            0 < O.length && ($ += d);
          }
          for (var c = 0; c < O.length; c++) {
            var v = B ? a.length : O[c].length, E = !1, x = B ? Object.keys(O[c]).length === 0 : O[c].length === 0;
            if (D && !B && (E = D === "greedy" ? O[c].join("").trim() === "" : O[c].length === 1 && O[c][0].length === 0), D === "greedy" && B) {
              for (var _ = [], p = 0; p < v; p++) {
                var F = P ? a[p] : p;
                _.push(O[c][F]);
              }
              E = _.join("").trim() === "";
            }
            if (!E) {
              for (var f = 0; f < v; f++) {
                0 < f && !x && ($ += o);
                var Q = B && P ? a[f] : f;
                $ += K(O[c][Q], f);
              }
              c < O.length - 1 && (!D || 0 < v && !x) && ($ += d);
            }
          }
          return $;
        }
        function K(a, O) {
          if (a == null)
            return "";
          if (a.constructor === Date)
            return JSON.stringify(a).slice(1, 25);
          A === !0 && typeof a == "string" && a.match(/^[=+\-@].*$/) !== null && (a = "'" + a);
          var D = a.toString().replace(h, q), $ = typeof r == "boolean" && r || typeof r == "function" && r(a, O) || Array.isArray(r) && r[O] || function(B, P) {
            for (var z = 0; z < P.length; z++)
              if (-1 < B.indexOf(P[z]))
                return !0;
            return !1;
          }(D, n.BAD_DELIMITERS) || -1 < D.indexOf(o) || D.charAt(0) === " " || D.charAt(D.length - 1) === " ";
          return $ ? g + D + g : D;
        }
      } };
      if (n.RECORD_SEP = String.fromCharCode(30), n.UNIT_SEP = String.fromCharCode(31), n.BYTE_ORDER_MARK = "\uFEFF", n.BAD_DELIMITERS = ["\r", `
`, '"', n.BYTE_ORDER_MARK], n.WORKERS_SUPPORTED = !S && !!i.Worker, n.NODE_STREAM_INPUT = 1, n.LocalChunkSize = 10485760, n.RemoteChunkSize = 5242880, n.DefaultDelimiter = ",", n.Parser = H, n.ParserHandle = R, n.NetworkStreamer = N, n.FileStreamer = I, n.StringStreamer = U, n.ReadableStreamStreamer = V, i.jQuery) {
        var T = i.jQuery;
        T.fn.parse = function(t) {
          var e = t.config || {}, r = [];
          return this.each(function(d) {
            if (!(T(this).prop("tagName").toUpperCase() === "INPUT" && T(this).attr("type").toLowerCase() === "file" && i.FileReader) || !this.files || this.files.length === 0)
              return !0;
            for (var g = 0; g < this.files.length; g++)
              r.push({ file: this.files[g], inputElem: this, instanceConfig: T.extend({}, e) });
          }), s(), this;
          function s() {
            if (r.length !== 0) {
              var d, g, q, j, l = r[0];
              if (b(t.before)) {
                var A = t.before(l.file, l.inputElem);
                if (typeof A == "object") {
                  if (A.action === "abort")
                    return d = "AbortError", g = l.file, q = l.inputElem, j = A.reason, void (b(t.error) && t.error({ name: d }, g, q, j));
                  if (A.action === "skip")
                    return void o();
                  typeof A.config == "object" && (l.instanceConfig = T.extend(l.instanceConfig, A.config));
                } else if (A === "skip")
                  return void o();
              }
              var h = l.instanceConfig.complete;
              l.instanceConfig.complete = function(re) {
                b(h) && h(re, l.file, l.inputElem), o();
              }, n.parse(l.file, l.instanceConfig);
            } else
              b(t.complete) && t.complete();
          }
          function o() {
            r.splice(0, 1), s();
          }
        };
      }
      function y(t) {
        this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = { data: [], errors: [], meta: {} }, function(e) {
          var r = W(e);
          r.chunkSize = parseInt(r.chunkSize), e.step || e.chunk || (r.chunkSize = null), this._handle = new R(r), (this._handle.streamer = this)._config = r;
        }.call(this, t), this.parseChunk = function(e, r) {
          if (this.isFirstChunk && b(this._config.beforeFirstChunk)) {
            var s = this._config.beforeFirstChunk(e);
            s !== void 0 && (e = s);
          }
          this.isFirstChunk = !1, this._halted = !1;
          var o = this._partialLine + e;
          this._partialLine = "";
          var d = this._handle.parse(o, this._baseIndex, !this._finished);
          if (!this._handle.paused() && !this._handle.aborted()) {
            var g = d.meta.cursor;
            this._finished || (this._partialLine = o.substring(g - this._baseIndex), this._baseIndex = g), d && d.data && (this._rowCount += d.data.length);
            var q = this._finished || this._config.preview && this._rowCount >= this._config.preview;
            if (L)
              i.postMessage({ results: d, workerId: n.WORKER_ID, finished: q });
            else if (b(this._config.chunk) && !r) {
              if (this._config.chunk(d, this._handle), this._handle.paused() || this._handle.aborted())
                return void (this._halted = !0);
              d = void 0, this._completeResults = void 0;
            }
            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(d.data), this._completeResults.errors = this._completeResults.errors.concat(d.errors), this._completeResults.meta = d.meta), this._completed || !q || !b(this._config.complete) || d && d.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), q || d && d.meta.paused || this._nextChunk(), d;
          }
          this._halted = !0;
        }, this._sendError = function(e) {
          b(this._config.error) ? this._config.error(e) : L && this._config.error && i.postMessage({ workerId: n.WORKER_ID, error: e, finished: !1 });
        };
      }
      function N(t) {
        var e;
        (t = t || {}).chunkSize || (t.chunkSize = n.RemoteChunkSize), y.call(this, t), this._nextChunk = S ? function() {
          this._readChunk(), this._chunkLoaded();
        } : function() {
          this._readChunk();
        }, this.stream = function(r) {
          this._input = r, this._nextChunk();
        }, this._readChunk = function() {
          if (this._finished)
            this._chunkLoaded();
          else {
            if (e = new XMLHttpRequest(), this._config.withCredentials && (e.withCredentials = this._config.withCredentials), S || (e.onload = Z(this._chunkLoaded, this), e.onerror = Z(this._chunkError, this)), e.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !S), this._config.downloadRequestHeaders) {
              var r = this._config.downloadRequestHeaders;
              for (var s in r)
                e.setRequestHeader(s, r[s]);
            }
            if (this._config.chunkSize) {
              var o = this._start + this._config.chunkSize - 1;
              e.setRequestHeader("Range", "bytes=" + this._start + "-" + o);
            }
            try {
              e.send(this._config.downloadRequestBody);
            } catch (d) {
              this._chunkError(d.message);
            }
            S && e.status === 0 && this._chunkError();
          }
        }, this._chunkLoaded = function() {
          e.readyState === 4 && (e.status < 200 || 400 <= e.status ? this._chunkError() : (this._start += this._config.chunkSize ? this._config.chunkSize : e.responseText.length, this._finished = !this._config.chunkSize || this._start >= function(r) {
            var s = r.getResponseHeader("Content-Range");
            return s === null ? -1 : parseInt(s.substring(s.lastIndexOf("/") + 1));
          }(e), this.parseChunk(e.responseText)));
        }, this._chunkError = function(r) {
          var s = e.statusText || r;
          this._sendError(new Error(s));
        };
      }
      function I(t) {
        var e, r;
        (t = t || {}).chunkSize || (t.chunkSize = n.LocalChunkSize), y.call(this, t);
        var s = typeof FileReader != "undefined";
        this.stream = function(o) {
          this._input = o, r = o.slice || o.webkitSlice || o.mozSlice, s ? ((e = new FileReader()).onload = Z(this._chunkLoaded, this), e.onerror = Z(this._chunkError, this)) : e = new FileReaderSync(), this._nextChunk();
        }, this._nextChunk = function() {
          this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function() {
          var o = this._input;
          if (this._config.chunkSize) {
            var d = Math.min(this._start + this._config.chunkSize, this._input.size);
            o = r.call(o, this._start, d);
          }
          var g = e.readAsText(o, this._config.encoding);
          s || this._chunkLoaded({ target: { result: g } });
        }, this._chunkLoaded = function(o) {
          this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(o.target.result);
        }, this._chunkError = function() {
          this._sendError(e.error);
        };
      }
      function U(t) {
        var e;
        y.call(this, t = t || {}), this.stream = function(r) {
          return e = r, this._nextChunk();
        }, this._nextChunk = function() {
          if (!this._finished) {
            var r, s = this._config.chunkSize;
            return s ? (r = e.substring(0, s), e = e.substring(s)) : (r = e, e = ""), this._finished = !e, this.parseChunk(r);
          }
        };
      }
      function V(t) {
        y.call(this, t = t || {});
        var e = [], r = !0, s = !1;
        this.pause = function() {
          y.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function() {
          y.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function(o) {
          this._input = o, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function() {
          s && e.length === 1 && (this._finished = !0);
        }, this._nextChunk = function() {
          this._checkIsFinished(), e.length ? this.parseChunk(e.shift()) : r = !0;
        }, this._streamData = Z(function(o) {
          try {
            e.push(typeof o == "string" ? o : o.toString(this._config.encoding)), r && (r = !1, this._checkIsFinished(), this.parseChunk(e.shift()));
          } catch (d) {
            this._streamError(d);
          }
        }, this), this._streamError = Z(function(o) {
          this._streamCleanUp(), this._sendError(o);
        }, this), this._streamEnd = Z(function() {
          this._streamCleanUp(), s = !0, this._streamData("");
        }, this), this._streamCleanUp = Z(function() {
          this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
      }
      function R(t) {
        var e, r, s, o = Math.pow(2, 53), d = -o, g = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, q = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/, j = this, l = 0, A = 0, h = !1, re = !1, K = [], a = { data: [], errors: [], meta: {} };
        if (b(t.step)) {
          var O = t.step;
          t.step = function(c) {
            if (a = c, B())
              $();
            else {
              if ($(), a.data.length === 0)
                return;
              l += c.data.length, t.preview && l > t.preview ? r.abort() : (a.data = a.data[0], O(a, j));
            }
          };
        }
        function D(c) {
          return t.skipEmptyLines === "greedy" ? c.join("").trim() === "" : c.length === 1 && c[0].length === 0;
        }
        function $() {
          if (a && s && (z("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + n.DefaultDelimiter + "'"), s = !1), t.skipEmptyLines)
            for (var c = 0; c < a.data.length; c++)
              D(a.data[c]) && a.data.splice(c--, 1);
          return B() && function() {
            if (!a)
              return;
            function v(x, _) {
              b(t.transformHeader) && (x = t.transformHeader(x, _)), K.push(x);
            }
            if (Array.isArray(a.data[0])) {
              for (var E = 0; B() && E < a.data.length; E++)
                a.data[E].forEach(v);
              a.data.splice(0, 1);
            } else
              a.data.forEach(v);
          }(), function() {
            if (!a || !t.header && !t.dynamicTyping && !t.transform)
              return a;
            function v(x, _) {
              var p, F = t.header ? {} : [];
              for (p = 0; p < x.length; p++) {
                var f = p, Q = x[p];
                t.header && (f = p >= K.length ? "__parsed_extra" : K[p]), t.transform && (Q = t.transform(Q, f)), Q = P(f, Q), f === "__parsed_extra" ? (F[f] = F[f] || [], F[f].push(Q)) : F[f] = Q;
              }
              return t.header && (p > K.length ? z("FieldMismatch", "TooManyFields", "Too many fields: expected " + K.length + " fields but parsed " + p, A + _) : p < K.length && z("FieldMismatch", "TooFewFields", "Too few fields: expected " + K.length + " fields but parsed " + p, A + _)), F;
            }
            var E = 1;
            return !a.data.length || Array.isArray(a.data[0]) ? (a.data = a.data.map(v), E = a.data.length) : a.data = v(a.data, 0), t.header && a.meta && (a.meta.fields = K), A += E, a;
          }();
        }
        function B() {
          return t.header && K.length === 0;
        }
        function P(c, v) {
          return E = c, t.dynamicTypingFunction && t.dynamicTyping[E] === void 0 && (t.dynamicTyping[E] = t.dynamicTypingFunction(E)), (t.dynamicTyping[E] || t.dynamicTyping) === !0 ? v === "true" || v === "TRUE" || v !== "false" && v !== "FALSE" && (function(x) {
            if (g.test(x)) {
              var _ = parseFloat(x);
              if (d < _ && _ < o)
                return !0;
            }
            return !1;
          }(v) ? parseFloat(v) : q.test(v) ? new Date(v) : v === "" ? null : v) : v;
          var E;
        }
        function z(c, v, E, x) {
          var _ = { type: c, code: v, message: E };
          x !== void 0 && (_.row = x), a.errors.push(_);
        }
        this.parse = function(c, v, E) {
          var x = t.quoteChar || '"';
          if (t.newline || (t.newline = function(F, f) {
            F = F.substring(0, 1048576);
            var Q = new RegExp(m(f) + "([^]*?)" + m(f), "gm"), te = (F = F.replace(Q, "")).split("\r"), G = F.split(`
`), se = 1 < G.length && G[0].length < te[0].length;
            if (te.length === 1 || se)
              return `
`;
            for (var ne = 0, Y = 0; Y < te.length; Y++)
              te[Y][0] === `
` && ne++;
            return ne >= te.length / 2 ? `\r
` : "\r";
          }(c, x)), s = !1, t.delimiter)
            b(t.delimiter) && (t.delimiter = t.delimiter(c), a.meta.delimiter = t.delimiter);
          else {
            var _ = function(F, f, Q, te, G) {
              var se, ne, Y, J;
              G = G || [",", "	", "|", ";", n.RECORD_SEP, n.UNIT_SEP];
              for (var ae = 0; ae < G.length; ae++) {
                var X = G[ae], oe = 0, ie = 0, _e = 0;
                Y = void 0;
                for (var le = new H({ comments: te, delimiter: X, newline: f, preview: 10 }).parse(F), ce = 0; ce < le.data.length; ce++)
                  if (Q && D(le.data[ce]))
                    _e++;
                  else {
                    var ue = le.data[ce].length;
                    ie += ue, Y !== void 0 ? 0 < ue && (oe += Math.abs(ue - Y), Y = ue) : Y = ue;
                  }
                0 < le.data.length && (ie /= le.data.length - _e), (ne === void 0 || oe <= ne) && (J === void 0 || J < ie) && 1.99 < ie && (ne = oe, se = X, J = ie);
              }
              return { successful: !!(t.delimiter = se), bestDelimiter: se };
            }(c, t.newline, t.skipEmptyLines, t.comments, t.delimitersToGuess);
            _.successful ? t.delimiter = _.bestDelimiter : (s = !0, t.delimiter = n.DefaultDelimiter), a.meta.delimiter = t.delimiter;
          }
          var p = W(t);
          return t.preview && t.header && p.preview++, e = c, r = new H(p), a = r.parse(e, v, E), $(), h ? { meta: { paused: !0 } } : a || { meta: { paused: !1 } };
        }, this.paused = function() {
          return h;
        }, this.pause = function() {
          h = !0, r.abort(), e = b(t.chunk) ? "" : e.substring(r.getCharIndex());
        }, this.resume = function() {
          j.streamer._halted ? (h = !1, j.streamer.parseChunk(e, !0)) : setTimeout(j.resume, 3);
        }, this.aborted = function() {
          return re;
        }, this.abort = function() {
          re = !0, r.abort(), a.meta.aborted = !0, b(t.complete) && t.complete(a), e = "";
        };
      }
      function m(t) {
        return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function H(t) {
        var e, r = (t = t || {}).delimiter, s = t.newline, o = t.comments, d = t.step, g = t.preview, q = t.fastMode, j = e = t.quoteChar === void 0 ? '"' : t.quoteChar;
        if (t.escapeChar !== void 0 && (j = t.escapeChar), (typeof r != "string" || -1 < n.BAD_DELIMITERS.indexOf(r)) && (r = ","), o === r)
          throw new Error("Comment character same as delimiter");
        o === !0 ? o = "#" : (typeof o != "string" || -1 < n.BAD_DELIMITERS.indexOf(o)) && (o = !1), s !== `
` && s !== "\r" && s !== `\r
` && (s = `
`);
        var l = 0, A = !1;
        this.parse = function(h, re, K) {
          if (typeof h != "string")
            throw new Error("Input must be a string");
          var a = h.length, O = r.length, D = s.length, $ = o.length, B = b(d), P = [], z = [], c = [], v = l = 0;
          if (!h)
            return J();
          if (q || q !== !1 && h.indexOf(e) === -1) {
            for (var E = h.split(s), x = 0; x < E.length; x++) {
              if (c = E[x], l += c.length, x !== E.length - 1)
                l += s.length;
              else if (K)
                return J();
              if (!o || c.substring(0, $) !== o) {
                if (B) {
                  if (P = [], G(c.split(r)), ae(), A)
                    return J();
                } else
                  G(c.split(r));
                if (g && g <= x)
                  return P = P.slice(0, g), J(!0);
              }
            }
            return J();
          }
          for (var _ = h.indexOf(r, l), p = h.indexOf(s, l), F = new RegExp(m(j) + m(e), "g"), f = h.indexOf(e, l); ; )
            if (h[l] !== e)
              if (o && c.length === 0 && h.substring(l, l + $) === o) {
                if (p === -1)
                  return J();
                l = p + D, p = h.indexOf(s, l), _ = h.indexOf(r, l);
              } else if (_ !== -1 && (_ < p || p === -1))
                c.push(h.substring(l, _)), l = _ + O, _ = h.indexOf(r, l);
              else {
                if (p === -1)
                  break;
                if (c.push(h.substring(l, p)), Y(p + D), B && (ae(), A))
                  return J();
                if (g && P.length >= g)
                  return J(!0);
              }
            else
              for (f = l, l++; ; ) {
                if ((f = h.indexOf(e, f + 1)) === -1)
                  return K || z.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: P.length, index: l }), ne();
                if (f === a - 1)
                  return ne(h.substring(l, f).replace(F, e));
                if (e !== j || h[f + 1] !== j) {
                  if (e === j || f === 0 || h[f - 1] !== j) {
                    _ !== -1 && _ < f + 1 && (_ = h.indexOf(r, f + 1)), p !== -1 && p < f + 1 && (p = h.indexOf(s, f + 1));
                    var Q = se(p === -1 ? _ : Math.min(_, p));
                    if (h[f + 1 + Q] === r) {
                      c.push(h.substring(l, f).replace(F, e)), h[l = f + 1 + Q + O] !== e && (f = h.indexOf(e, l)), _ = h.indexOf(r, l), p = h.indexOf(s, l);
                      break;
                    }
                    var te = se(p);
                    if (h.substring(f + 1 + te, f + 1 + te + D) === s) {
                      if (c.push(h.substring(l, f).replace(F, e)), Y(f + 1 + te + D), _ = h.indexOf(r, l), f = h.indexOf(e, l), B && (ae(), A))
                        return J();
                      if (g && P.length >= g)
                        return J(!0);
                      break;
                    }
                    z.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: P.length, index: l }), f++;
                  }
                } else
                  f++;
              }
          return ne();
          function G(X) {
            P.push(X), v = l;
          }
          function se(X) {
            var oe = 0;
            if (X !== -1) {
              var ie = h.substring(f + 1, X);
              ie && ie.trim() === "" && (oe = ie.length);
            }
            return oe;
          }
          function ne(X) {
            return K || (X === void 0 && (X = h.substring(l)), c.push(X), l = a, G(c), B && ae()), J();
          }
          function Y(X) {
            l = X, G(c), c = [], p = h.indexOf(s, l);
          }
          function J(X) {
            return { data: P, errors: z, meta: { delimiter: r, linebreak: s, aborted: A, truncated: !!X, cursor: v + (re || 0) } };
          }
          function ae() {
            d(J()), P = [], z = [];
          }
        }, this.abort = function() {
          A = !0;
        }, this.getCharIndex = function() {
          return l;
        };
      }
      function C(t) {
        var e = t.data, r = M[e.workerId], s = !1;
        if (e.error)
          r.userError(e.error, e.file);
        else if (e.results && e.results.data) {
          var o = { abort: function() {
            s = !0, ee(e.workerId, { data: [], errors: [], meta: { aborted: !0 } });
          }, pause: k, resume: k };
          if (b(r.userStep)) {
            for (var d = 0; d < e.results.data.length && (r.userStep({ data: e.results.data[d], errors: e.results.errors, meta: e.results.meta }, o), !s); d++)
              ;
            delete e.results;
          } else
            b(r.userChunk) && (r.userChunk(e.results, o, e.file), delete e.results);
        }
        e.finished && !s && ee(e.workerId, e.results);
      }
      function ee(t, e) {
        var r = M[t];
        b(r.userComplete) && r.userComplete(e), r.terminate(), delete M[t];
      }
      function k() {
        throw new Error("Not implemented.");
      }
      function W(t) {
        if (typeof t != "object" || t === null)
          return t;
        var e = Array.isArray(t) ? [] : {};
        for (var r in t)
          e[r] = W(t[r]);
        return e;
      }
      function Z(t, e) {
        return function() {
          t.apply(e, arguments);
        };
      }
      function b(t) {
        return typeof t == "function";
      }
      return L && (i.onmessage = function(t) {
        var e = t.data;
        if (n.WORKER_ID === void 0 && e && (n.WORKER_ID = e.workerId), typeof e.input == "string")
          i.postMessage({ workerId: n.WORKER_ID, results: n.parse(e.input, e.config), finished: !0 });
        else if (i.File && e.input instanceof File || e.input instanceof Object) {
          var r = n.parse(e.input, e.config);
          r && i.postMessage({ workerId: n.WORKER_ID, results: r, finished: !0 });
        }
      }), (N.prototype = Object.create(y.prototype)).constructor = N, (I.prototype = Object.create(y.prototype)).constructor = I, (U.prototype = Object.create(U.prototype)).constructor = U, (V.prototype = Object.create(y.prototype)).constructor = V, n;
    });
  });

  // src/bench/websocket.ts
  function we(u, i, S) {
    let L = new WebSocket(u);
    if (!L)
      throw new Error("server didn't accept ws");
    return L.addEventListener("open", () => {
      console.log("Opened websocket"), S();
    }), L.addEventListener("message", ({ data: M }) => {
      let { count: w, tz: n, error: T, name: y, duration: N, endTime: I } = JSON.parse(M);
      if (y && N && I) {
        let U = I - N, V = { name: y, duration: N, startTime: U, entryType: "server", endTime: I };
        console.info(V), i.push(V);
      } else
        T ? console.error(T) : console.info({ count: w, tz: n, error: T });
    }), L.addEventListener("close", () => {
      console.log("Closed websocket");
    }), L;
  }

  // src/bench/observers.ts
  function ke(u) {
    let i = new PerformanceObserver((M) => {
      M.getEntries().forEach((w) => {
        let { startTime: n, duration: T, name: y, entryType: N } = w;
        n = Math.floor(n), T = Math.floor(T);
        let I = n + T, U = { name: y, endTime: I, startTime: n, duration: T, entryType: N };
        console.log(U), u.push(U);
      });
    }), S = new PerformanceObserver((M) => {
      M.getEntriesByType("resource").forEach((w) => {
        let { startTime: n, duration: T, name: y, entryType: N, responseStart: I, responseEnd: U, serverTiming: V, initiatorType: R } = w;
        y.includes("mitm") || y.includes("favicon") || (n = Math.floor(n), T = Math.floor(T), U = Math.floor(U), I = Math.floor(I), /^https?:\/\//.test(y) && (y = String(y.split("/").pop())), V.forEach((m) => {
          let { name: H, duration: C, description: ee } = m, k = Number(ee.replace("endtime:", "")), W = k - C;
          console.log({ name: H, duration: C, startTime: W, entryType: "server", endTime: k });
        }), u = u.concat([
          {
            name: `${R}:request_sent`,
            startTime: n,
            duration: 0,
            endTime: n,
            entryType: "mark"
          },
          {
            name: `${R}:response_start`,
            startTime: n,
            duration: I - n,
            endTime: I,
            entryType: "resource"
          },
          {
            name: `${R}:response_complete`,
            startTime: I - n,
            duration: U - I,
            endTime: U,
            entryType: "resource"
          }
        ]), console.log(w.toJSON()));
      });
    });
    return { ro: S, po: i, listEntries: () => {
      let M = u.sort((w, n) => w.endTime - n.endTime).reduce((w, n) => {
        let { name: T, endTime: y, startTime: N, duration: I, entryType: U } = n;
        return w[T] = { endTime: y, startTime: N, duration: I, entryType: U }, w;
      }, {});
      window.requestIdleCallback(() => {
        console.table(M), i && i.disconnect(), S && S.disconnect();
      });
    } };
  }

  // src/bench/download.ts
  var me = ve(Ee());
  function fe(u, i = "file.txt", S) {
    let L = !1;
    console.log({ url: u }), performance.mark("download:start");
    let M = !1;
    me.default.mitm = `${location.origin}/mitm.html`;
    let w = me.default.createWriteStream(i);
    return window.onunload = () => {
      w.abort();
    }, window.onbeforeunload = (n) => {
      M || (n.returnValue = "Are you sure you want to leave?");
    }, fetch(u, {
      headers: {
        TE: "trailers",
        startTime: String(performance.now()),
        started_at: String(Math.floor(Date.now() - performance.now())),
        "cache-control": "no-cache, no-store, max-age=1, s-maxage=1"
      }
    }).then((n) => !n.body || !n.ok ? Promise.reject(new Error(n.statusText)) : n.body.pipeTo(w)).then(() => {
      M = !0, performance.mark("download:tear_down"), requestIdleCallback(() => {
        S();
      });
    });
  }

  // src/bench/papaXHR.ts
  var Te = ve(Se());
  async function Re(u, i, S) {
    performance.mark("XHR:start");
    let L = !0, M = "[", w = "";
    Te.default.parse(u, {
      download: !0,
      chunkSize: 7 * 1024 * 1024,
      beforeFirstChunk: (n) => (performance.mark("XHR:finish"), n),
      step: (n) => {
        w += M + JSON.stringify(n.data), M = ",", L && (L = !1, performance.mark("Parse:start"));
      },
      complete: () => {
        performance.measure("Parse:end", "Parse:start"), w += "]";
        let n = URL.createObjectURL(new Blob([w], { type: "application/json" }));
        fe(n, "xhr.json", () => {
          URL.revokeObjectURL(n), w = "", performance.mark("download:tear_down"), S();
        });
      }
    });
  }

  // src/bench3.ts
  var Ce = [], { po: Ue, ro: Fe, listEntries: Oe } = ke(Ce);
  globalThis.connect = (u) => {
    let i = new URL(window.location.origin);
    i.protocol = "wss", i.pathname = "/csv/ws", globalThis.ws = we(i, Ce, u);
  };
  globalThis.connect(() => {
    Ue.observe({ entryTypes: ["mark", "measure"] }), Fe.observe({ entryTypes: ["resource"] }), requestIdleCallback(() => {
      let u = location.hash.replace("#", "") || "fetch.json";
      u.includes("xhr") ? Re("/csv/raw.json", "raw.json", () => {
        Oe();
      }) : (console.log(u), fe(`/csv/${u}`, u, () => {
        Oe();
      }));
    });
  });
})();
/* @license
Papa Parse
v5.3.1
https://github.com/mholt/PapaParse
License: MIT
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL3N0cmVhbXNhdmVyL1N0cmVhbVNhdmVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wYXBhcGFyc2UvcGFwYXBhcnNlLm1pbi5qcyIsICIuLi9zcmMvYmVuY2gvd2Vic29ja2V0LnRzIiwgIi4uL3NyYy9iZW5jaC9vYnNlcnZlcnMudHMiLCAiLi4vc3JjL2JlbmNoL2Rvd25sb2FkLnRzIiwgIi4uL3NyYy9iZW5jaC9wYXBhWEhSLnRzIiwgIi4uL3NyYy9iZW5jaDMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qIGdsb2JhbCBjaHJvbWUgbG9jYXRpb24gUmVhZGFibGVTdHJlYW0gZGVmaW5lIE1lc3NhZ2VDaGFubmVsIFRyYW5zZm9ybVN0cmVhbSAqL1xuXG47KChuYW1lLCBkZWZpbml0aW9uKSA9PiB7XG4gIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnXG4gICAgPyBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKVxuICAgIDogdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCdcbiAgICAgID8gZGVmaW5lKGRlZmluaXRpb24pXG4gICAgICA6IHRoaXNbbmFtZV0gPSBkZWZpbml0aW9uKClcbn0pKCdzdHJlYW1TYXZlcicsICgpID0+IHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgY29uc3QgZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgPyB3aW5kb3cgOiB0aGlzXG4gIGlmICghZ2xvYmFsLkhUTUxFbGVtZW50KSBjb25zb2xlLndhcm4oJ3N0cmVhbXNhdmVyIGlzIG1lYW50IHRvIHJ1biBvbiBicm93c2VycyBtYWluIHRocmVhZCcpXG5cbiAgbGV0IG1pdG1UcmFuc3BvcnRlciA9IG51bGxcbiAgbGV0IHN1cHBvcnRzVHJhbnNmZXJhYmxlID0gZmFsc2VcbiAgY29uc3QgdGVzdCA9IGZuID0+IHsgdHJ5IHsgZm4oKSB9IGNhdGNoIChlKSB7fSB9XG4gIGNvbnN0IHBvbnlmaWxsID0gZ2xvYmFsLldlYlN0cmVhbXNQb2x5ZmlsbCB8fCB7fVxuICBjb25zdCBpc1NlY3VyZUNvbnRleHQgPSBnbG9iYWwuaXNTZWN1cmVDb250ZXh0XG4gIC8vIFRPRE86IE11c3QgY29tZSB1cCB3aXRoIGEgcmVhbCBkZXRlY3Rpb24gdGVzdCAoIzY5KVxuICBsZXQgdXNlQmxvYkZhbGxiYWNrID0gL2NvbnN0cnVjdG9yL2kudGVzdChnbG9iYWwuSFRNTEVsZW1lbnQpIHx8ICEhZ2xvYmFsLnNhZmFyaSB8fCAhIWdsb2JhbC5XZWJLaXRQb2ludFxuICBjb25zdCBkb3dubG9hZFN0cmF0ZWd5ID0gaXNTZWN1cmVDb250ZXh0IHx8ICdNb3pBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGVcbiAgICA/ICdpZnJhbWUnXG4gICAgOiAnbmF2aWdhdGUnXG5cbiAgY29uc3Qgc3RyZWFtU2F2ZXIgPSB7XG4gICAgY3JlYXRlV3JpdGVTdHJlYW0sXG4gICAgV3JpdGFibGVTdHJlYW06IGdsb2JhbC5Xcml0YWJsZVN0cmVhbSB8fCBwb255ZmlsbC5Xcml0YWJsZVN0cmVhbSxcbiAgICBzdXBwb3J0ZWQ6IHRydWUsXG4gICAgdmVyc2lvbjogeyBmdWxsOiAnMi4wLjUnLCBtYWpvcjogMiwgbWlub3I6IDAsIGRvdDogNSB9LFxuICAgIG1pdG06ICdodHRwczovL2ppbW15d2FydGluZy5naXRodWIuaW8vU3RyZWFtU2F2ZXIuanMvbWl0bS5odG1sP3ZlcnNpb249Mi4wLjAnXG4gIH1cblxuICAvKipcbiAgICogY3JlYXRlIGEgaGlkZGVuIGlmcmFtZSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBET00gKGJvZHkpXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gc3JjIHBhZ2UgdG8gbG9hZFxuICAgKiBAcmV0dXJuIHtIVE1MSUZyYW1lRWxlbWVudH0gcGFnZSB0byBsb2FkXG4gICAqL1xuICBmdW5jdGlvbiBtYWtlSWZyYW1lIChzcmMpIHtcbiAgICBpZiAoIXNyYykgdGhyb3cgbmV3IEVycm9yKCdtZWgnKVxuICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpXG4gICAgaWZyYW1lLmhpZGRlbiA9IHRydWVcbiAgICBpZnJhbWUuc3JjID0gc3JjXG4gICAgaWZyYW1lLmxvYWRlZCA9IGZhbHNlXG4gICAgaWZyYW1lLm5hbWUgPSAnaWZyYW1lJ1xuICAgIGlmcmFtZS5pc0lmcmFtZSA9IHRydWVcbiAgICBpZnJhbWUucG9zdE1lc3NhZ2UgPSAoLi4uYXJncykgPT4gaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoLi4uYXJncylcbiAgICBpZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgIGlmcmFtZS5sb2FkZWQgPSB0cnVlXG4gICAgfSwgeyBvbmNlOiB0cnVlIH0pXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpXG4gICAgcmV0dXJuIGlmcmFtZVxuICB9XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHBvcHVwIHRoYXQgc2ltdWxhdGVzIHRoZSBiYXNpYyB0aGluZ3NcbiAgICogb2Ygd2hhdCBhIGlmcmFtZSBjYW4gZG9cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSBzcmMgcGFnZSB0byBsb2FkXG4gICAqIEByZXR1cm4ge29iamVjdH0gICAgIGlmcmFtZSBsaWtlIG9iamVjdFxuICAgKi9cbiAgZnVuY3Rpb24gbWFrZVBvcHVwIChzcmMpIHtcbiAgICBjb25zdCBvcHRpb25zID0gJ3dpZHRoPTIwMCxoZWlnaHQ9MTAwJ1xuICAgIGNvbnN0IGRlbGVnYXRlID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgY29uc3QgcG9wdXAgPSB7XG4gICAgICBmcmFtZTogZ2xvYmFsLm9wZW4oc3JjLCAncG9wdXAnLCBvcHRpb25zKSxcbiAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICBpc0lmcmFtZTogZmFsc2UsXG4gICAgICBpc1BvcHVwOiB0cnVlLFxuICAgICAgcmVtb3ZlICgpIHsgcG9wdXAuZnJhbWUuY2xvc2UoKSB9LFxuICAgICAgYWRkRXZlbnRMaXN0ZW5lciAoLi4uYXJncykgeyBkZWxlZ2F0ZS5hZGRFdmVudExpc3RlbmVyKC4uLmFyZ3MpIH0sXG4gICAgICBkaXNwYXRjaEV2ZW50ICguLi5hcmdzKSB7IGRlbGVnYXRlLmRpc3BhdGNoRXZlbnQoLi4uYXJncykgfSxcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIgKC4uLmFyZ3MpIHsgZGVsZWdhdGUucmVtb3ZlRXZlbnRMaXN0ZW5lciguLi5hcmdzKSB9LFxuICAgICAgcG9zdE1lc3NhZ2UgKC4uLmFyZ3MpIHsgcG9wdXAuZnJhbWUucG9zdE1lc3NhZ2UoLi4uYXJncykgfVxuICAgIH1cblxuICAgIGNvbnN0IG9uUmVhZHkgPSBldnQgPT4ge1xuICAgICAgaWYgKGV2dC5zb3VyY2UgPT09IHBvcHVwLmZyYW1lKSB7XG4gICAgICAgIHBvcHVwLmxvYWRlZCA9IHRydWVcbiAgICAgICAgZ2xvYmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvblJlYWR5KVxuICAgICAgICBwb3B1cC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9hZCcpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25SZWFkeSlcblxuICAgIHJldHVybiBwb3B1cFxuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBXZSBjYW4ndCBsb29rIGZvciBzZXJ2aWNlIHdvcmtlciBzaW5jZSBpdCBtYXkgc3RpbGwgd29yayBvbiBodHRwXG4gICAgbmV3IFJlc3BvbnNlKG5ldyBSZWFkYWJsZVN0cmVhbSgpKVxuICAgIGlmIChpc1NlY3VyZUNvbnRleHQgJiYgISgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSkge1xuICAgICAgdXNlQmxvYkZhbGxiYWNrID0gdHJ1ZVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdXNlQmxvYkZhbGxiYWNrID0gdHJ1ZVxuICB9XG5cbiAgdGVzdCgoKSA9PiB7XG4gICAgLy8gVHJhbnNmYXJpYWJsZSBzdHJlYW0gd2FzIGZpcnN0IGVuYWJsZWQgaW4gY2hyb21lIHY3MyBiZWhpbmQgYSBmbGFnXG4gICAgY29uc3QgeyByZWFkYWJsZSB9ID0gbmV3IFRyYW5zZm9ybVN0cmVhbSgpXG4gICAgY29uc3QgbWMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKVxuICAgIG1jLnBvcnQxLnBvc3RNZXNzYWdlKHJlYWRhYmxlLCBbcmVhZGFibGVdKVxuICAgIG1jLnBvcnQxLmNsb3NlKClcbiAgICBtYy5wb3J0Mi5jbG9zZSgpXG4gICAgc3VwcG9ydHNUcmFuc2ZlcmFibGUgPSB0cnVlXG4gICAgLy8gRnJlZXplIFRyYW5zZm9ybVN0cmVhbSBvYmplY3QgKGNhbiBvbmx5IHdvcmsgd2l0aCBuYXRpdmUpXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN0cmVhbVNhdmVyLCAnVHJhbnNmb3JtU3RyZWFtJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBUcmFuc2Zvcm1TdHJlYW1cbiAgICB9KVxuICB9KVxuXG4gIGZ1bmN0aW9uIGxvYWRUcmFuc3BvcnRlciAoKSB7XG4gICAgaWYgKCFtaXRtVHJhbnNwb3J0ZXIpIHtcbiAgICAgIG1pdG1UcmFuc3BvcnRlciA9IGlzU2VjdXJlQ29udGV4dFxuICAgICAgICA/IG1ha2VJZnJhbWUoc3RyZWFtU2F2ZXIubWl0bSlcbiAgICAgICAgOiBtYWtlUG9wdXAoc3RyZWFtU2F2ZXIubWl0bSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtICB7c3RyaW5nfSBmaWxlbmFtZSBmaWxlbmFtZSB0aGF0IHNob3VsZCBiZSB1c2VkXG4gICAqIEBwYXJhbSAge29iamVjdH0gb3B0aW9ucyAgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9IHNpemUgICAgIGRlcHJpY2F0ZWRcbiAgICogQHJldHVybiB7V3JpdGFibGVTdHJlYW08VWludDhBcnJheT59XG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVXcml0ZVN0cmVhbSAoZmlsZW5hbWUsIG9wdGlvbnMsIHNpemUpIHtcbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgIHNpemU6IG51bGwsXG4gICAgICBwYXRobmFtZTogbnVsbCxcbiAgICAgIHdyaXRhYmxlU3RyYXRlZ3k6IHVuZGVmaW5lZCxcbiAgICAgIHJlYWRhYmxlU3RyYXRlZ3k6IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGxldCBieXRlc1dyaXR0ZW4gPSAwIC8vIGJ5IFN0cmVhbVNhdmVyLmpzIChub3QgdGhlIHNlcnZpY2Ugd29ya2VyKVxuICAgIGxldCBkb3dubG9hZFVybCA9IG51bGxcbiAgICBsZXQgY2hhbm5lbCA9IG51bGxcbiAgICBsZXQgdHMgPSBudWxsXG5cbiAgICAvLyBub3JtYWxpemUgYXJndW1lbnRzXG4gICAgaWYgKE51bWJlci5pc0Zpbml0ZShvcHRpb25zKSkge1xuICAgICAgWyBzaXplLCBvcHRpb25zIF0gPSBbIG9wdGlvbnMsIHNpemUgXVxuICAgICAgY29uc29sZS53YXJuKCdbU3RyZWFtU2F2ZXJdIERlcHJpY2F0ZWQgcGFzcyBhbiBvYmplY3QgYXMgMm5kIGFyZ3VtZW50IHdoZW4gY3JlYXRpbmcgYSB3cml0ZSBzdHJlYW0nKVxuICAgICAgb3B0cy5zaXplID0gc2l6ZVxuICAgICAgb3B0cy53cml0YWJsZVN0cmF0ZWd5ID0gb3B0aW9uc1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmhpZ2hXYXRlck1hcmspIHtcbiAgICAgIGNvbnNvbGUud2FybignW1N0cmVhbVNhdmVyXSBEZXByaWNhdGVkIHBhc3MgYW4gb2JqZWN0IGFzIDJuZCBhcmd1bWVudCB3aGVuIGNyZWF0aW5nIGEgd3JpdGUgc3RyZWFtJylcbiAgICAgIG9wdHMuc2l6ZSA9IHNpemVcbiAgICAgIG9wdHMud3JpdGFibGVTdHJhdGVneSA9IG9wdGlvbnNcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0cyA9IG9wdGlvbnMgfHwge31cbiAgICB9XG4gICAgaWYgKCF1c2VCbG9iRmFsbGJhY2spIHtcbiAgICAgIGxvYWRUcmFuc3BvcnRlcigpXG5cbiAgICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKVxuXG4gICAgICAvLyBNYWtlIGZpbGVuYW1lIFJGQzU5ODcgY29tcGF0aWJsZVxuICAgICAgZmlsZW5hbWUgPSBlbmNvZGVVUklDb21wb25lbnQoZmlsZW5hbWUucmVwbGFjZSgvXFwvL2csICc6JykpXG4gICAgICAgIC5yZXBsYWNlKC9bJygpXS9nLCBlc2NhcGUpXG4gICAgICAgIC5yZXBsYWNlKC9cXCovZywgJyUyQScpXG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICB0cmFuc2ZlcnJpbmdSZWFkYWJsZTogc3VwcG9ydHNUcmFuc2ZlcmFibGUsXG4gICAgICAgIHBhdGhuYW1lOiBvcHRzLnBhdGhuYW1lIHx8IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zbGljZSgtNikgKyAnLycgKyBmaWxlbmFtZSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAnQ29udGVudC1EaXNwb3NpdGlvbic6IFwiYXR0YWNobWVudDsgZmlsZW5hbWUqPVVURi04JydcIiArIGZpbGVuYW1lXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMuc2l6ZSkge1xuICAgICAgICByZXNwb25zZS5oZWFkZXJzWydDb250ZW50LUxlbmd0aCddID0gb3B0cy5zaXplXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFyZ3MgPSBbIHJlc3BvbnNlLCAnKicsIFsgY2hhbm5lbC5wb3J0MiBdIF1cblxuICAgICAgaWYgKHN1cHBvcnRzVHJhbnNmZXJhYmxlKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVyID0gZG93bmxvYWRTdHJhdGVneSA9PT0gJ2lmcmFtZScgPyB1bmRlZmluZWQgOiB7XG4gICAgICAgICAgLy8gVGhpcyB0cmFuc2Zvcm1lciAmIGZsdXNoIG1ldGhvZCBpcyBvbmx5IHVzZWQgYnkgaW5zZWN1cmUgY29udGV4dC5cbiAgICAgICAgICB0cmFuc2Zvcm0gKGNodW5rLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICBpZiAoIShjaHVuayBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbiBvbmx5IHdpcnRlIFVpbnQ4QXJyYXlzJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ5dGVzV3JpdHRlbiArPSBjaHVuay5sZW5ndGhcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShjaHVuaylcblxuICAgICAgICAgICAgaWYgKGRvd25sb2FkVXJsKSB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBkb3dubG9hZFVybFxuICAgICAgICAgICAgICBkb3dubG9hZFVybCA9IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZsdXNoICgpIHtcbiAgICAgICAgICAgIGlmIChkb3dubG9hZFVybCkge1xuICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gZG93bmxvYWRVcmxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHMgPSBuZXcgc3RyZWFtU2F2ZXIuVHJhbnNmb3JtU3RyZWFtKFxuICAgICAgICAgIHRyYW5zZm9ybWVyLFxuICAgICAgICAgIG9wdHMud3JpdGFibGVTdHJhdGVneSxcbiAgICAgICAgICBvcHRzLnJlYWRhYmxlU3RyYXRlZ3lcbiAgICAgICAgKVxuICAgICAgICBjb25zdCByZWFkYWJsZVN0cmVhbSA9IHRzLnJlYWRhYmxlXG5cbiAgICAgICAgY2hhbm5lbC5wb3J0MS5wb3N0TWVzc2FnZSh7IHJlYWRhYmxlU3RyZWFtIH0sIFsgcmVhZGFibGVTdHJlYW0gXSlcbiAgICAgIH1cblxuICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBldnQgPT4ge1xuICAgICAgICAvLyBTZXJ2aWNlIHdvcmtlciBzZW50IHVzIGEgbGluayB0aGF0IHdlIHNob3VsZCBvcGVuLlxuICAgICAgICBpZiAoZXZ0LmRhdGEuZG93bmxvYWQpIHtcbiAgICAgICAgICAvLyBTcGVjaWFsIHRyZWF0bWVudCBmb3IgcG9wdXAuLi5cbiAgICAgICAgICBpZiAoZG93bmxvYWRTdHJhdGVneSA9PT0gJ25hdmlnYXRlJykge1xuICAgICAgICAgICAgbWl0bVRyYW5zcG9ydGVyLnJlbW92ZSgpXG4gICAgICAgICAgICBtaXRtVHJhbnNwb3J0ZXIgPSBudWxsXG4gICAgICAgICAgICBpZiAoYnl0ZXNXcml0dGVuKSB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBldnQuZGF0YS5kb3dubG9hZFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZG93bmxvYWRVcmwgPSBldnQuZGF0YS5kb3dubG9hZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobWl0bVRyYW5zcG9ydGVyLmlzUG9wdXApIHtcbiAgICAgICAgICAgICAgbWl0bVRyYW5zcG9ydGVyLnJlbW92ZSgpXG4gICAgICAgICAgICAgIG1pdG1UcmFuc3BvcnRlciA9IG51bGxcbiAgICAgICAgICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBmaXJlZm94LCB0aGV5IGNhbiBrZWVwIHN3IGFsaXZlIHdpdGggZmV0Y2hcbiAgICAgICAgICAgICAgaWYgKGRvd25sb2FkU3RyYXRlZ3kgPT09ICdpZnJhbWUnKSB7XG4gICAgICAgICAgICAgICAgbWFrZUlmcmFtZShzdHJlYW1TYXZlci5taXRtKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdlIG5ldmVyIHJlbW92ZSB0aGlzIGlmcmFtZXMgYi9jIGl0IGNhbiBpbnRlcnJ1cHQgc2F2aW5nXG4gICAgICAgICAgICBtYWtlSWZyYW1lKGV2dC5kYXRhLmRvd25sb2FkKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWl0bVRyYW5zcG9ydGVyLmxvYWRlZCkge1xuICAgICAgICBtaXRtVHJhbnNwb3J0ZXIucG9zdE1lc3NhZ2UoLi4uYXJncylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1pdG1UcmFuc3BvcnRlci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgIG1pdG1UcmFuc3BvcnRlci5wb3N0TWVzc2FnZSguLi5hcmdzKVxuICAgICAgICB9LCB7IG9uY2U6IHRydWUgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY2h1bmtzID0gW11cblxuICAgIHJldHVybiAoIXVzZUJsb2JGYWxsYmFjayAmJiB0cyAmJiB0cy53cml0YWJsZSkgfHwgbmV3IHN0cmVhbVNhdmVyLldyaXRhYmxlU3RyZWFtKHtcbiAgICAgIHdyaXRlIChjaHVuaykge1xuICAgICAgICBpZiAoIShjaHVuayBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FuIG9ubHkgd2lydGUgVWludDhBcnJheXMnKVxuICAgICAgICB9XG4gICAgICAgIGlmICh1c2VCbG9iRmFsbGJhY2spIHtcbiAgICAgICAgICAvLyBTYWZhcmkuLi4gVGhlIG5ldyBJRTZcbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vamltbXl3YXJ0aW5nL1N0cmVhbVNhdmVyLmpzL2lzc3Vlcy82OVxuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gZXZlbiBkb2UgaXQgaGFzIGV2ZXJ5dGhpbmcgaXQgZmFpbHMgdG8gZG93bmxvYWQgYW55dGhpbmdcbiAgICAgICAgICAvLyB0aGF0IGNvbWVzIGZyb20gdGhlIHNlcnZpY2Ugd29ya2VyLi4hXG4gICAgICAgICAgY2h1bmtzLnB1c2goY2h1bmspXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBpcyBjYWxsZWQgd2hlbiBhIG5ldyBjaHVuayBvZiBkYXRhIGlzIHJlYWR5IHRvIGJlIHdyaXR0ZW5cbiAgICAgICAgLy8gdG8gdGhlIHVuZGVybHlpbmcgc2luay4gSXQgY2FuIHJldHVybiBhIHByb21pc2UgdG8gc2lnbmFsXG4gICAgICAgIC8vIHN1Y2Nlc3Mgb3IgZmFpbHVyZSBvZiB0aGUgd3JpdGUgb3BlcmF0aW9uLiBUaGUgc3RyZWFtXG4gICAgICAgIC8vIGltcGxlbWVudGF0aW9uIGd1YXJhbnRlZXMgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZFxuICAgICAgICAvLyBvbmx5IGFmdGVyIHByZXZpb3VzIHdyaXRlcyBoYXZlIHN1Y2NlZWRlZCwgYW5kIG5ldmVyIGFmdGVyXG4gICAgICAgIC8vIGNsb3NlIG9yIGFib3J0IGlzIGNhbGxlZC5cblxuICAgICAgICAvLyBUT0RPOiBLaW5kIG9mIGltcG9ydGFudCB0aGF0IHNlcnZpY2Ugd29ya2VyIHJlc3BvbmQgYmFjayB3aGVuXG4gICAgICAgIC8vIGl0IGhhcyBiZWVuIHdyaXR0ZW4uIE90aGVyd2lzZSB3ZSBjYW4ndCBoYW5kbGUgYmFja3ByZXNzdXJlXG4gICAgICAgIC8vIEVESVQ6IFRyYW5zZmFyYWJsZSBzdHJlYW1zIHNvbHZzIHRoaXMuLi5cbiAgICAgICAgY2hhbm5lbC5wb3J0MS5wb3N0TWVzc2FnZShjaHVuaylcbiAgICAgICAgYnl0ZXNXcml0dGVuICs9IGNodW5rLmxlbmd0aFxuXG4gICAgICAgIGlmIChkb3dubG9hZFVybCkge1xuICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBkb3dubG9hZFVybFxuICAgICAgICAgIGRvd25sb2FkVXJsID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2xvc2UgKCkge1xuICAgICAgICBpZiAodXNlQmxvYkZhbGxiYWNrKSB7XG4gICAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKGNodW5rcywgeyB0eXBlOiAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtOyBjaGFyc2V0PXV0Zi04JyB9KVxuICAgICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICAgICAgICBsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gICAgICAgICAgbGluay5kb3dubG9hZCA9IGZpbGVuYW1lXG4gICAgICAgICAgbGluay5jbGljaygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hhbm5lbC5wb3J0MS5wb3N0TWVzc2FnZSgnZW5kJylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFib3J0ICgpIHtcbiAgICAgICAgY2h1bmtzID0gW11cbiAgICAgICAgY2hhbm5lbC5wb3J0MS5wb3N0TWVzc2FnZSgnYWJvcnQnKVxuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IG51bGxcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5jbG9zZSgpXG4gICAgICAgIGNoYW5uZWwucG9ydDIuY2xvc2UoKVxuICAgICAgICBjaGFubmVsID0gbnVsbFxuICAgICAgfVxuICAgIH0sIG9wdHMud3JpdGFibGVTdHJhdGVneSlcbiAgfVxuXG4gIHJldHVybiBzdHJlYW1TYXZlclxufSlcbiIsICIvKiBAbGljZW5zZVxuUGFwYSBQYXJzZVxudjUuMy4xXG5odHRwczovL2dpdGh1Yi5jb20vbWhvbHQvUGFwYVBhcnNlXG5MaWNlbnNlOiBNSVRcbiovXG4hZnVuY3Rpb24oZSx0KXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLHQpOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPXQoKTplLlBhcGE9dCgpfSh0aGlzLGZ1bmN0aW9uIHMoKXtcInVzZSBzdHJpY3RcIjt2YXIgZj1cInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OnZvaWQgMCE9PWY/Zjp7fTt2YXIgbj0hZi5kb2N1bWVudCYmISFmLnBvc3RNZXNzYWdlLG89biYmL2Jsb2I6L2kudGVzdCgoZi5sb2NhdGlvbnx8e30pLnByb3RvY29sKSxhPXt9LGg9MCxiPXtwYXJzZTpmdW5jdGlvbihlLHQpe3ZhciBpPSh0PXR8fHt9KS5keW5hbWljVHlwaW5nfHwhMTtNKGkpJiYodC5keW5hbWljVHlwaW5nRnVuY3Rpb249aSxpPXt9KTtpZih0LmR5bmFtaWNUeXBpbmc9aSx0LnRyYW5zZm9ybT0hIU0odC50cmFuc2Zvcm0pJiZ0LnRyYW5zZm9ybSx0LndvcmtlciYmYi5XT1JLRVJTX1NVUFBPUlRFRCl7dmFyIHI9ZnVuY3Rpb24oKXtpZighYi5XT1JLRVJTX1NVUFBPUlRFRClyZXR1cm4hMTt2YXIgZT0oaT1mLlVSTHx8Zi53ZWJraXRVUkx8fG51bGwscj1zLnRvU3RyaW5nKCksYi5CTE9CX1VSTHx8KGIuQkxPQl9VUkw9aS5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW1wiKFwiLHIsXCIpKCk7XCJdLHt0eXBlOlwidGV4dC9qYXZhc2NyaXB0XCJ9KSkpKSx0PW5ldyBmLldvcmtlcihlKTt2YXIgaSxyO3JldHVybiB0Lm9ubWVzc2FnZT1fLHQuaWQ9aCsrLGFbdC5pZF09dH0oKTtyZXR1cm4gci51c2VyU3RlcD10LnN0ZXAsci51c2VyQ2h1bms9dC5jaHVuayxyLnVzZXJDb21wbGV0ZT10LmNvbXBsZXRlLHIudXNlckVycm9yPXQuZXJyb3IsdC5zdGVwPU0odC5zdGVwKSx0LmNodW5rPU0odC5jaHVuayksdC5jb21wbGV0ZT1NKHQuY29tcGxldGUpLHQuZXJyb3I9TSh0LmVycm9yKSxkZWxldGUgdC53b3JrZXIsdm9pZCByLnBvc3RNZXNzYWdlKHtpbnB1dDplLGNvbmZpZzp0LHdvcmtlcklkOnIuaWR9KX12YXIgbj1udWxsO2IuTk9ERV9TVFJFQU1fSU5QVVQsXCJzdHJpbmdcIj09dHlwZW9mIGU/bj10LmRvd25sb2FkP25ldyBsKHQpOm5ldyBwKHQpOiEwPT09ZS5yZWFkYWJsZSYmTShlLnJlYWQpJiZNKGUub24pP249bmV3IGcodCk6KGYuRmlsZSYmZSBpbnN0YW5jZW9mIEZpbGV8fGUgaW5zdGFuY2VvZiBPYmplY3QpJiYobj1uZXcgYyh0KSk7cmV0dXJuIG4uc3RyZWFtKGUpfSx1bnBhcnNlOmZ1bmN0aW9uKGUsdCl7dmFyIG49ITEsXz0hMCxtPVwiLFwiLHk9XCJcXHJcXG5cIixzPSdcIicsYT1zK3MsaT0hMSxyPW51bGwsbz0hMTshZnVuY3Rpb24oKXtpZihcIm9iamVjdFwiIT10eXBlb2YgdClyZXR1cm47XCJzdHJpbmdcIiE9dHlwZW9mIHQuZGVsaW1pdGVyfHxiLkJBRF9ERUxJTUlURVJTLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4tMSE9PXQuZGVsaW1pdGVyLmluZGV4T2YoZSl9KS5sZW5ndGh8fChtPXQuZGVsaW1pdGVyKTsoXCJib29sZWFuXCI9PXR5cGVvZiB0LnF1b3Rlc3x8XCJmdW5jdGlvblwiPT10eXBlb2YgdC5xdW90ZXN8fEFycmF5LmlzQXJyYXkodC5xdW90ZXMpKSYmKG49dC5xdW90ZXMpO1wiYm9vbGVhblwiIT10eXBlb2YgdC5za2lwRW1wdHlMaW5lcyYmXCJzdHJpbmdcIiE9dHlwZW9mIHQuc2tpcEVtcHR5TGluZXN8fChpPXQuc2tpcEVtcHR5TGluZXMpO1wic3RyaW5nXCI9PXR5cGVvZiB0Lm5ld2xpbmUmJih5PXQubmV3bGluZSk7XCJzdHJpbmdcIj09dHlwZW9mIHQucXVvdGVDaGFyJiYocz10LnF1b3RlQ2hhcik7XCJib29sZWFuXCI9PXR5cGVvZiB0LmhlYWRlciYmKF89dC5oZWFkZXIpO2lmKEFycmF5LmlzQXJyYXkodC5jb2x1bW5zKSl7aWYoMD09PXQuY29sdW1ucy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiT3B0aW9uIGNvbHVtbnMgaXMgZW1wdHlcIik7cj10LmNvbHVtbnN9dm9pZCAwIT09dC5lc2NhcGVDaGFyJiYoYT10LmVzY2FwZUNoYXIrcyk7XCJib29sZWFuXCI9PXR5cGVvZiB0LmVzY2FwZUZvcm11bGFlJiYobz10LmVzY2FwZUZvcm11bGFlKX0oKTt2YXIgaD1uZXcgUmVnRXhwKGoocyksXCJnXCIpO1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1KU09OLnBhcnNlKGUpKTtpZihBcnJheS5pc0FycmF5KGUpKXtpZighZS5sZW5ndGh8fEFycmF5LmlzQXJyYXkoZVswXSkpcmV0dXJuIHUobnVsbCxlLGkpO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBlWzBdKXJldHVybiB1KHJ8fE9iamVjdC5rZXlzKGVbMF0pLGUsaSl9ZWxzZSBpZihcIm9iamVjdFwiPT10eXBlb2YgZSlyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgZS5kYXRhJiYoZS5kYXRhPUpTT04ucGFyc2UoZS5kYXRhKSksQXJyYXkuaXNBcnJheShlLmRhdGEpJiYoZS5maWVsZHN8fChlLmZpZWxkcz1lLm1ldGEmJmUubWV0YS5maWVsZHMpLGUuZmllbGRzfHwoZS5maWVsZHM9QXJyYXkuaXNBcnJheShlLmRhdGFbMF0pP2UuZmllbGRzOlwib2JqZWN0XCI9PXR5cGVvZiBlLmRhdGFbMF0/T2JqZWN0LmtleXMoZS5kYXRhWzBdKTpbXSksQXJyYXkuaXNBcnJheShlLmRhdGFbMF0pfHxcIm9iamVjdFwiPT10eXBlb2YgZS5kYXRhWzBdfHwoZS5kYXRhPVtlLmRhdGFdKSksdShlLmZpZWxkc3x8W10sZS5kYXRhfHxbXSxpKTt0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gc2VyaWFsaXplIHVucmVjb2duaXplZCBpbnB1dFwiKTtmdW5jdGlvbiB1KGUsdCxpKXt2YXIgcj1cIlwiO1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1KU09OLnBhcnNlKGUpKSxcInN0cmluZ1wiPT10eXBlb2YgdCYmKHQ9SlNPTi5wYXJzZSh0KSk7dmFyIG49QXJyYXkuaXNBcnJheShlKSYmMDxlLmxlbmd0aCxzPSFBcnJheS5pc0FycmF5KHRbMF0pO2lmKG4mJl8pe2Zvcih2YXIgYT0wO2E8ZS5sZW5ndGg7YSsrKTA8YSYmKHIrPW0pLHIrPXYoZVthXSxhKTswPHQubGVuZ3RoJiYocis9eSl9Zm9yKHZhciBvPTA7bzx0Lmxlbmd0aDtvKyspe3ZhciBoPW4/ZS5sZW5ndGg6dFtvXS5sZW5ndGgsdT0hMSxmPW4/MD09PU9iamVjdC5rZXlzKHRbb10pLmxlbmd0aDowPT09dFtvXS5sZW5ndGg7aWYoaSYmIW4mJih1PVwiZ3JlZWR5XCI9PT1pP1wiXCI9PT10W29dLmpvaW4oXCJcIikudHJpbSgpOjE9PT10W29dLmxlbmd0aCYmMD09PXRbb11bMF0ubGVuZ3RoKSxcImdyZWVkeVwiPT09aSYmbil7Zm9yKHZhciBkPVtdLGw9MDtsPGg7bCsrKXt2YXIgYz1zP2VbbF06bDtkLnB1c2godFtvXVtjXSl9dT1cIlwiPT09ZC5qb2luKFwiXCIpLnRyaW0oKX1pZighdSl7Zm9yKHZhciBwPTA7cDxoO3ArKyl7MDxwJiYhZiYmKHIrPW0pO3ZhciBnPW4mJnM/ZVtwXTpwO3IrPXYodFtvXVtnXSxwKX1vPHQubGVuZ3RoLTEmJighaXx8MDxoJiYhZikmJihyKz15KX19cmV0dXJuIHJ9ZnVuY3Rpb24gdihlLHQpe2lmKG51bGw9PWUpcmV0dXJuXCJcIjtpZihlLmNvbnN0cnVjdG9yPT09RGF0ZSlyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSkuc2xpY2UoMSwyNSk7ITA9PT1vJiZcInN0cmluZ1wiPT10eXBlb2YgZSYmbnVsbCE9PWUubWF0Y2goL15bPStcXC1AXS4qJC8pJiYoZT1cIidcIitlKTt2YXIgaT1lLnRvU3RyaW5nKCkucmVwbGFjZShoLGEpLHI9XCJib29sZWFuXCI9PXR5cGVvZiBuJiZufHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiZuKGUsdCl8fEFycmF5LmlzQXJyYXkobikmJm5bdF18fGZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspaWYoLTE8ZS5pbmRleE9mKHRbaV0pKXJldHVybiEwO3JldHVybiExfShpLGIuQkFEX0RFTElNSVRFUlMpfHwtMTxpLmluZGV4T2YobSl8fFwiIFwiPT09aS5jaGFyQXQoMCl8fFwiIFwiPT09aS5jaGFyQXQoaS5sZW5ndGgtMSk7cmV0dXJuIHI/cytpK3M6aX19fTtpZihiLlJFQ09SRF9TRVA9U3RyaW5nLmZyb21DaGFyQ29kZSgzMCksYi5VTklUX1NFUD1TdHJpbmcuZnJvbUNoYXJDb2RlKDMxKSxiLkJZVEVfT1JERVJfTUFSSz1cIlxcdWZlZmZcIixiLkJBRF9ERUxJTUlURVJTPVtcIlxcclwiLFwiXFxuXCIsJ1wiJyxiLkJZVEVfT1JERVJfTUFSS10sYi5XT1JLRVJTX1NVUFBPUlRFRD0hbiYmISFmLldvcmtlcixiLk5PREVfU1RSRUFNX0lOUFVUPTEsYi5Mb2NhbENodW5rU2l6ZT0xMDQ4NTc2MCxiLlJlbW90ZUNodW5rU2l6ZT01MjQyODgwLGIuRGVmYXVsdERlbGltaXRlcj1cIixcIixiLlBhcnNlcj1FLGIuUGFyc2VySGFuZGxlPWksYi5OZXR3b3JrU3RyZWFtZXI9bCxiLkZpbGVTdHJlYW1lcj1jLGIuU3RyaW5nU3RyZWFtZXI9cCxiLlJlYWRhYmxlU3RyZWFtU3RyZWFtZXI9ZyxmLmpRdWVyeSl7dmFyIGQ9Zi5qUXVlcnk7ZC5mbi5wYXJzZT1mdW5jdGlvbihvKXt2YXIgaT1vLmNvbmZpZ3x8e30saD1bXTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGUpe2lmKCEoXCJJTlBVVFwiPT09ZCh0aGlzKS5wcm9wKFwidGFnTmFtZVwiKS50b1VwcGVyQ2FzZSgpJiZcImZpbGVcIj09PWQodGhpcykuYXR0cihcInR5cGVcIikudG9Mb3dlckNhc2UoKSYmZi5GaWxlUmVhZGVyKXx8IXRoaXMuZmlsZXN8fDA9PT10aGlzLmZpbGVzLmxlbmd0aClyZXR1cm4hMDtmb3IodmFyIHQ9MDt0PHRoaXMuZmlsZXMubGVuZ3RoO3QrKyloLnB1c2goe2ZpbGU6dGhpcy5maWxlc1t0XSxpbnB1dEVsZW06dGhpcyxpbnN0YW5jZUNvbmZpZzpkLmV4dGVuZCh7fSxpKX0pfSksZSgpLHRoaXM7ZnVuY3Rpb24gZSgpe2lmKDAhPT1oLmxlbmd0aCl7dmFyIGUsdCxpLHIsbj1oWzBdO2lmKE0oby5iZWZvcmUpKXt2YXIgcz1vLmJlZm9yZShuLmZpbGUsbi5pbnB1dEVsZW0pO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBzKXtpZihcImFib3J0XCI9PT1zLmFjdGlvbilyZXR1cm4gZT1cIkFib3J0RXJyb3JcIix0PW4uZmlsZSxpPW4uaW5wdXRFbGVtLHI9cy5yZWFzb24sdm9pZChNKG8uZXJyb3IpJiZvLmVycm9yKHtuYW1lOmV9LHQsaSxyKSk7aWYoXCJza2lwXCI9PT1zLmFjdGlvbilyZXR1cm4gdm9pZCB1KCk7XCJvYmplY3RcIj09dHlwZW9mIHMuY29uZmlnJiYobi5pbnN0YW5jZUNvbmZpZz1kLmV4dGVuZChuLmluc3RhbmNlQ29uZmlnLHMuY29uZmlnKSl9ZWxzZSBpZihcInNraXBcIj09PXMpcmV0dXJuIHZvaWQgdSgpfXZhciBhPW4uaW5zdGFuY2VDb25maWcuY29tcGxldGU7bi5pbnN0YW5jZUNvbmZpZy5jb21wbGV0ZT1mdW5jdGlvbihlKXtNKGEpJiZhKGUsbi5maWxlLG4uaW5wdXRFbGVtKSx1KCl9LGIucGFyc2Uobi5maWxlLG4uaW5zdGFuY2VDb25maWcpfWVsc2UgTShvLmNvbXBsZXRlKSYmby5jb21wbGV0ZSgpfWZ1bmN0aW9uIHUoKXtoLnNwbGljZSgwLDEpLGUoKX19fWZ1bmN0aW9uIHUoZSl7dGhpcy5faGFuZGxlPW51bGwsdGhpcy5fZmluaXNoZWQ9ITEsdGhpcy5fY29tcGxldGVkPSExLHRoaXMuX2hhbHRlZD0hMSx0aGlzLl9pbnB1dD1udWxsLHRoaXMuX2Jhc2VJbmRleD0wLHRoaXMuX3BhcnRpYWxMaW5lPVwiXCIsdGhpcy5fcm93Q291bnQ9MCx0aGlzLl9zdGFydD0wLHRoaXMuX25leHRDaHVuaz1udWxsLHRoaXMuaXNGaXJzdENodW5rPSEwLHRoaXMuX2NvbXBsZXRlUmVzdWx0cz17ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7fX0sZnVuY3Rpb24oZSl7dmFyIHQ9dyhlKTt0LmNodW5rU2l6ZT1wYXJzZUludCh0LmNodW5rU2l6ZSksZS5zdGVwfHxlLmNodW5rfHwodC5jaHVua1NpemU9bnVsbCk7dGhpcy5faGFuZGxlPW5ldyBpKHQpLCh0aGlzLl9oYW5kbGUuc3RyZWFtZXI9dGhpcykuX2NvbmZpZz10fS5jYWxsKHRoaXMsZSksdGhpcy5wYXJzZUNodW5rPWZ1bmN0aW9uKGUsdCl7aWYodGhpcy5pc0ZpcnN0Q2h1bmsmJk0odGhpcy5fY29uZmlnLmJlZm9yZUZpcnN0Q2h1bmspKXt2YXIgaT10aGlzLl9jb25maWcuYmVmb3JlRmlyc3RDaHVuayhlKTt2b2lkIDAhPT1pJiYoZT1pKX10aGlzLmlzRmlyc3RDaHVuaz0hMSx0aGlzLl9oYWx0ZWQ9ITE7dmFyIHI9dGhpcy5fcGFydGlhbExpbmUrZTt0aGlzLl9wYXJ0aWFsTGluZT1cIlwiO3ZhciBuPXRoaXMuX2hhbmRsZS5wYXJzZShyLHRoaXMuX2Jhc2VJbmRleCwhdGhpcy5fZmluaXNoZWQpO2lmKCF0aGlzLl9oYW5kbGUucGF1c2VkKCkmJiF0aGlzLl9oYW5kbGUuYWJvcnRlZCgpKXt2YXIgcz1uLm1ldGEuY3Vyc29yO3RoaXMuX2ZpbmlzaGVkfHwodGhpcy5fcGFydGlhbExpbmU9ci5zdWJzdHJpbmcocy10aGlzLl9iYXNlSW5kZXgpLHRoaXMuX2Jhc2VJbmRleD1zKSxuJiZuLmRhdGEmJih0aGlzLl9yb3dDb3VudCs9bi5kYXRhLmxlbmd0aCk7dmFyIGE9dGhpcy5fZmluaXNoZWR8fHRoaXMuX2NvbmZpZy5wcmV2aWV3JiZ0aGlzLl9yb3dDb3VudD49dGhpcy5fY29uZmlnLnByZXZpZXc7aWYobylmLnBvc3RNZXNzYWdlKHtyZXN1bHRzOm4sd29ya2VySWQ6Yi5XT1JLRVJfSUQsZmluaXNoZWQ6YX0pO2Vsc2UgaWYoTSh0aGlzLl9jb25maWcuY2h1bmspJiYhdCl7aWYodGhpcy5fY29uZmlnLmNodW5rKG4sdGhpcy5faGFuZGxlKSx0aGlzLl9oYW5kbGUucGF1c2VkKCl8fHRoaXMuX2hhbmRsZS5hYm9ydGVkKCkpcmV0dXJuIHZvaWQodGhpcy5faGFsdGVkPSEwKTtuPXZvaWQgMCx0aGlzLl9jb21wbGV0ZVJlc3VsdHM9dm9pZCAwfXJldHVybiB0aGlzLl9jb25maWcuc3RlcHx8dGhpcy5fY29uZmlnLmNodW5rfHwodGhpcy5fY29tcGxldGVSZXN1bHRzLmRhdGE9dGhpcy5fY29tcGxldGVSZXN1bHRzLmRhdGEuY29uY2F0KG4uZGF0YSksdGhpcy5fY29tcGxldGVSZXN1bHRzLmVycm9ycz10aGlzLl9jb21wbGV0ZVJlc3VsdHMuZXJyb3JzLmNvbmNhdChuLmVycm9ycyksdGhpcy5fY29tcGxldGVSZXN1bHRzLm1ldGE9bi5tZXRhKSx0aGlzLl9jb21wbGV0ZWR8fCFhfHwhTSh0aGlzLl9jb25maWcuY29tcGxldGUpfHxuJiZuLm1ldGEuYWJvcnRlZHx8KHRoaXMuX2NvbmZpZy5jb21wbGV0ZSh0aGlzLl9jb21wbGV0ZVJlc3VsdHMsdGhpcy5faW5wdXQpLHRoaXMuX2NvbXBsZXRlZD0hMCksYXx8biYmbi5tZXRhLnBhdXNlZHx8dGhpcy5fbmV4dENodW5rKCksbn10aGlzLl9oYWx0ZWQ9ITB9LHRoaXMuX3NlbmRFcnJvcj1mdW5jdGlvbihlKXtNKHRoaXMuX2NvbmZpZy5lcnJvcik/dGhpcy5fY29uZmlnLmVycm9yKGUpOm8mJnRoaXMuX2NvbmZpZy5lcnJvciYmZi5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Yi5XT1JLRVJfSUQsZXJyb3I6ZSxmaW5pc2hlZDohMX0pfX1mdW5jdGlvbiBsKGUpe3ZhciByOyhlPWV8fHt9KS5jaHVua1NpemV8fChlLmNodW5rU2l6ZT1iLlJlbW90ZUNodW5rU2l6ZSksdS5jYWxsKHRoaXMsZSksdGhpcy5fbmV4dENodW5rPW4/ZnVuY3Rpb24oKXt0aGlzLl9yZWFkQ2h1bmsoKSx0aGlzLl9jaHVua0xvYWRlZCgpfTpmdW5jdGlvbigpe3RoaXMuX3JlYWRDaHVuaygpfSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9yZWFkQ2h1bms9ZnVuY3Rpb24oKXtpZih0aGlzLl9maW5pc2hlZCl0aGlzLl9jaHVua0xvYWRlZCgpO2Vsc2V7aWYocj1uZXcgWE1MSHR0cFJlcXVlc3QsdGhpcy5fY29uZmlnLndpdGhDcmVkZW50aWFscyYmKHIud2l0aENyZWRlbnRpYWxzPXRoaXMuX2NvbmZpZy53aXRoQ3JlZGVudGlhbHMpLG58fChyLm9ubG9hZD12KHRoaXMuX2NodW5rTG9hZGVkLHRoaXMpLHIub25lcnJvcj12KHRoaXMuX2NodW5rRXJyb3IsdGhpcykpLHIub3Blbih0aGlzLl9jb25maWcuZG93bmxvYWRSZXF1ZXN0Qm9keT9cIlBPU1RcIjpcIkdFVFwiLHRoaXMuX2lucHV0LCFuKSx0aGlzLl9jb25maWcuZG93bmxvYWRSZXF1ZXN0SGVhZGVycyl7dmFyIGU9dGhpcy5fY29uZmlnLmRvd25sb2FkUmVxdWVzdEhlYWRlcnM7Zm9yKHZhciB0IGluIGUpci5zZXRSZXF1ZXN0SGVhZGVyKHQsZVt0XSl9aWYodGhpcy5fY29uZmlnLmNodW5rU2l6ZSl7dmFyIGk9dGhpcy5fc3RhcnQrdGhpcy5fY29uZmlnLmNodW5rU2l6ZS0xO3Iuc2V0UmVxdWVzdEhlYWRlcihcIlJhbmdlXCIsXCJieXRlcz1cIit0aGlzLl9zdGFydCtcIi1cIitpKX10cnl7ci5zZW5kKHRoaXMuX2NvbmZpZy5kb3dubG9hZFJlcXVlc3RCb2R5KX1jYXRjaChlKXt0aGlzLl9jaHVua0Vycm9yKGUubWVzc2FnZSl9biYmMD09PXIuc3RhdHVzJiZ0aGlzLl9jaHVua0Vycm9yKCl9fSx0aGlzLl9jaHVua0xvYWRlZD1mdW5jdGlvbigpezQ9PT1yLnJlYWR5U3RhdGUmJihyLnN0YXR1czwyMDB8fDQwMDw9ci5zdGF0dXM/dGhpcy5fY2h1bmtFcnJvcigpOih0aGlzLl9zdGFydCs9dGhpcy5fY29uZmlnLmNodW5rU2l6ZT90aGlzLl9jb25maWcuY2h1bmtTaXplOnIucmVzcG9uc2VUZXh0Lmxlbmd0aCx0aGlzLl9maW5pc2hlZD0hdGhpcy5fY29uZmlnLmNodW5rU2l6ZXx8dGhpcy5fc3RhcnQ+PWZ1bmN0aW9uKGUpe3ZhciB0PWUuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVJhbmdlXCIpO2lmKG51bGw9PT10KXJldHVybi0xO3JldHVybiBwYXJzZUludCh0LnN1YnN0cmluZyh0Lmxhc3RJbmRleE9mKFwiL1wiKSsxKSl9KHIpLHRoaXMucGFyc2VDaHVuayhyLnJlc3BvbnNlVGV4dCkpKX0sdGhpcy5fY2h1bmtFcnJvcj1mdW5jdGlvbihlKXt2YXIgdD1yLnN0YXR1c1RleHR8fGU7dGhpcy5fc2VuZEVycm9yKG5ldyBFcnJvcih0KSl9fWZ1bmN0aW9uIGMoZSl7dmFyIHIsbjsoZT1lfHx7fSkuY2h1bmtTaXplfHwoZS5jaHVua1NpemU9Yi5Mb2NhbENodW5rU2l6ZSksdS5jYWxsKHRoaXMsZSk7dmFyIHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZpbGVSZWFkZXI7dGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7dGhpcy5faW5wdXQ9ZSxuPWUuc2xpY2V8fGUud2Via2l0U2xpY2V8fGUubW96U2xpY2Uscz8oKHI9bmV3IEZpbGVSZWFkZXIpLm9ubG9hZD12KHRoaXMuX2NodW5rTG9hZGVkLHRoaXMpLHIub25lcnJvcj12KHRoaXMuX2NodW5rRXJyb3IsdGhpcykpOnI9bmV3IEZpbGVSZWFkZXJTeW5jLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXt0aGlzLl9maW5pc2hlZHx8dGhpcy5fY29uZmlnLnByZXZpZXcmJiEodGhpcy5fcm93Q291bnQ8dGhpcy5fY29uZmlnLnByZXZpZXcpfHx0aGlzLl9yZWFkQ2h1bmsoKX0sdGhpcy5fcmVhZENodW5rPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5faW5wdXQ7aWYodGhpcy5fY29uZmlnLmNodW5rU2l6ZSl7dmFyIHQ9TWF0aC5taW4odGhpcy5fc3RhcnQrdGhpcy5fY29uZmlnLmNodW5rU2l6ZSx0aGlzLl9pbnB1dC5zaXplKTtlPW4uY2FsbChlLHRoaXMuX3N0YXJ0LHQpfXZhciBpPXIucmVhZEFzVGV4dChlLHRoaXMuX2NvbmZpZy5lbmNvZGluZyk7c3x8dGhpcy5fY2h1bmtMb2FkZWQoe3RhcmdldDp7cmVzdWx0Oml9fSl9LHRoaXMuX2NodW5rTG9hZGVkPWZ1bmN0aW9uKGUpe3RoaXMuX3N0YXJ0Kz10aGlzLl9jb25maWcuY2h1bmtTaXplLHRoaXMuX2ZpbmlzaGVkPSF0aGlzLl9jb25maWcuY2h1bmtTaXplfHx0aGlzLl9zdGFydD49dGhpcy5faW5wdXQuc2l6ZSx0aGlzLnBhcnNlQ2h1bmsoZS50YXJnZXQucmVzdWx0KX0sdGhpcy5fY2h1bmtFcnJvcj1mdW5jdGlvbigpe3RoaXMuX3NlbmRFcnJvcihyLmVycm9yKX19ZnVuY3Rpb24gcChlKXt2YXIgaTt1LmNhbGwodGhpcyxlPWV8fHt9KSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXtyZXR1cm4gaT1lLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXtpZighdGhpcy5fZmluaXNoZWQpe3ZhciBlLHQ9dGhpcy5fY29uZmlnLmNodW5rU2l6ZTtyZXR1cm4gdD8oZT1pLnN1YnN0cmluZygwLHQpLGk9aS5zdWJzdHJpbmcodCkpOihlPWksaT1cIlwiKSx0aGlzLl9maW5pc2hlZD0haSx0aGlzLnBhcnNlQ2h1bmsoZSl9fX1mdW5jdGlvbiBnKGUpe3UuY2FsbCh0aGlzLGU9ZXx8e30pO3ZhciB0PVtdLGk9ITAscj0hMTt0aGlzLnBhdXNlPWZ1bmN0aW9uKCl7dS5wcm90b3R5cGUucGF1c2UuYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuX2lucHV0LnBhdXNlKCl9LHRoaXMucmVzdW1lPWZ1bmN0aW9uKCl7dS5wcm90b3R5cGUucmVzdW1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSx0aGlzLl9pbnB1dC5yZXN1bWUoKX0sdGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7dGhpcy5faW5wdXQ9ZSx0aGlzLl9pbnB1dC5vbihcImRhdGFcIix0aGlzLl9zdHJlYW1EYXRhKSx0aGlzLl9pbnB1dC5vbihcImVuZFwiLHRoaXMuX3N0cmVhbUVuZCksdGhpcy5faW5wdXQub24oXCJlcnJvclwiLHRoaXMuX3N0cmVhbUVycm9yKX0sdGhpcy5fY2hlY2tJc0ZpbmlzaGVkPWZ1bmN0aW9uKCl7ciYmMT09PXQubGVuZ3RoJiYodGhpcy5fZmluaXNoZWQ9ITApfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXt0aGlzLl9jaGVja0lzRmluaXNoZWQoKSx0Lmxlbmd0aD90aGlzLnBhcnNlQ2h1bmsodC5zaGlmdCgpKTppPSEwfSx0aGlzLl9zdHJlYW1EYXRhPXYoZnVuY3Rpb24oZSl7dHJ5e3QucHVzaChcInN0cmluZ1wiPT10eXBlb2YgZT9lOmUudG9TdHJpbmcodGhpcy5fY29uZmlnLmVuY29kaW5nKSksaSYmKGk9ITEsdGhpcy5fY2hlY2tJc0ZpbmlzaGVkKCksdGhpcy5wYXJzZUNodW5rKHQuc2hpZnQoKSkpfWNhdGNoKGUpe3RoaXMuX3N0cmVhbUVycm9yKGUpfX0sdGhpcyksdGhpcy5fc3RyZWFtRXJyb3I9dihmdW5jdGlvbihlKXt0aGlzLl9zdHJlYW1DbGVhblVwKCksdGhpcy5fc2VuZEVycm9yKGUpfSx0aGlzKSx0aGlzLl9zdHJlYW1FbmQ9dihmdW5jdGlvbigpe3RoaXMuX3N0cmVhbUNsZWFuVXAoKSxyPSEwLHRoaXMuX3N0cmVhbURhdGEoXCJcIil9LHRoaXMpLHRoaXMuX3N0cmVhbUNsZWFuVXA9dihmdW5jdGlvbigpe3RoaXMuX2lucHV0LnJlbW92ZUxpc3RlbmVyKFwiZGF0YVwiLHRoaXMuX3N0cmVhbURhdGEpLHRoaXMuX2lucHV0LnJlbW92ZUxpc3RlbmVyKFwiZW5kXCIsdGhpcy5fc3RyZWFtRW5kKSx0aGlzLl9pbnB1dC5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsdGhpcy5fc3RyZWFtRXJyb3IpfSx0aGlzKX1mdW5jdGlvbiBpKG0pe3ZhciBhLG8saCxyPU1hdGgucG93KDIsNTMpLG49LXIscz0vXlxccyotPyhcXGQrXFwuP3xcXC5cXGQrfFxcZCtcXC5cXGQrKShbZUVdWy0rXT9cXGQrKT9cXHMqJC8sdT0vXihcXGR7NH0tWzAxXVxcZC1bMC0zXVxcZFRbMC0yXVxcZDpbMC01XVxcZDpbMC01XVxcZFxcLlxcZCsoWystXVswLTJdXFxkOlswLTVdXFxkfFopKXwoXFxkezR9LVswMV1cXGQtWzAtM11cXGRUWzAtMl1cXGQ6WzAtNV1cXGQ6WzAtNV1cXGQoWystXVswLTJdXFxkOlswLTVdXFxkfFopKXwoXFxkezR9LVswMV1cXGQtWzAtM11cXGRUWzAtMl1cXGQ6WzAtNV1cXGQoWystXVswLTJdXFxkOlswLTVdXFxkfFopKSQvLHQ9dGhpcyxpPTAsZj0wLGQ9ITEsZT0hMSxsPVtdLGM9e2RhdGE6W10sZXJyb3JzOltdLG1ldGE6e319O2lmKE0obS5zdGVwKSl7dmFyIHA9bS5zdGVwO20uc3RlcD1mdW5jdGlvbihlKXtpZihjPWUsXygpKWcoKTtlbHNle2lmKGcoKSwwPT09Yy5kYXRhLmxlbmd0aClyZXR1cm47aSs9ZS5kYXRhLmxlbmd0aCxtLnByZXZpZXcmJmk+bS5wcmV2aWV3P28uYWJvcnQoKTooYy5kYXRhPWMuZGF0YVswXSxwKGMsdCkpfX19ZnVuY3Rpb24geShlKXtyZXR1cm5cImdyZWVkeVwiPT09bS5za2lwRW1wdHlMaW5lcz9cIlwiPT09ZS5qb2luKFwiXCIpLnRyaW0oKToxPT09ZS5sZW5ndGgmJjA9PT1lWzBdLmxlbmd0aH1mdW5jdGlvbiBnKCl7aWYoYyYmaCYmKGsoXCJEZWxpbWl0ZXJcIixcIlVuZGV0ZWN0YWJsZURlbGltaXRlclwiLFwiVW5hYmxlIHRvIGF1dG8tZGV0ZWN0IGRlbGltaXRpbmcgY2hhcmFjdGVyOyBkZWZhdWx0ZWQgdG8gJ1wiK2IuRGVmYXVsdERlbGltaXRlcitcIidcIiksaD0hMSksbS5za2lwRW1wdHlMaW5lcylmb3IodmFyIGU9MDtlPGMuZGF0YS5sZW5ndGg7ZSsrKXkoYy5kYXRhW2VdKSYmYy5kYXRhLnNwbGljZShlLS0sMSk7cmV0dXJuIF8oKSYmZnVuY3Rpb24oKXtpZighYylyZXR1cm47ZnVuY3Rpb24gZShlLHQpe00obS50cmFuc2Zvcm1IZWFkZXIpJiYoZT1tLnRyYW5zZm9ybUhlYWRlcihlLHQpKSxsLnB1c2goZSl9aWYoQXJyYXkuaXNBcnJheShjLmRhdGFbMF0pKXtmb3IodmFyIHQ9MDtfKCkmJnQ8Yy5kYXRhLmxlbmd0aDt0KyspYy5kYXRhW3RdLmZvckVhY2goZSk7Yy5kYXRhLnNwbGljZSgwLDEpfWVsc2UgYy5kYXRhLmZvckVhY2goZSl9KCksZnVuY3Rpb24oKXtpZighY3x8IW0uaGVhZGVyJiYhbS5keW5hbWljVHlwaW5nJiYhbS50cmFuc2Zvcm0pcmV0dXJuIGM7ZnVuY3Rpb24gZShlLHQpe3ZhciBpLHI9bS5oZWFkZXI/e306W107Zm9yKGk9MDtpPGUubGVuZ3RoO2krKyl7dmFyIG49aSxzPWVbaV07bS5oZWFkZXImJihuPWk+PWwubGVuZ3RoP1wiX19wYXJzZWRfZXh0cmFcIjpsW2ldKSxtLnRyYW5zZm9ybSYmKHM9bS50cmFuc2Zvcm0ocyxuKSkscz12KG4scyksXCJfX3BhcnNlZF9leHRyYVwiPT09bj8ocltuXT1yW25dfHxbXSxyW25dLnB1c2gocykpOnJbbl09c31yZXR1cm4gbS5oZWFkZXImJihpPmwubGVuZ3RoP2soXCJGaWVsZE1pc21hdGNoXCIsXCJUb29NYW55RmllbGRzXCIsXCJUb28gbWFueSBmaWVsZHM6IGV4cGVjdGVkIFwiK2wubGVuZ3RoK1wiIGZpZWxkcyBidXQgcGFyc2VkIFwiK2ksZit0KTppPGwubGVuZ3RoJiZrKFwiRmllbGRNaXNtYXRjaFwiLFwiVG9vRmV3RmllbGRzXCIsXCJUb28gZmV3IGZpZWxkczogZXhwZWN0ZWQgXCIrbC5sZW5ndGgrXCIgZmllbGRzIGJ1dCBwYXJzZWQgXCIraSxmK3QpKSxyfXZhciB0PTE7IWMuZGF0YS5sZW5ndGh8fEFycmF5LmlzQXJyYXkoYy5kYXRhWzBdKT8oYy5kYXRhPWMuZGF0YS5tYXAoZSksdD1jLmRhdGEubGVuZ3RoKTpjLmRhdGE9ZShjLmRhdGEsMCk7bS5oZWFkZXImJmMubWV0YSYmKGMubWV0YS5maWVsZHM9bCk7cmV0dXJuIGYrPXQsY30oKX1mdW5jdGlvbiBfKCl7cmV0dXJuIG0uaGVhZGVyJiYwPT09bC5sZW5ndGh9ZnVuY3Rpb24gdihlLHQpe3JldHVybiBpPWUsbS5keW5hbWljVHlwaW5nRnVuY3Rpb24mJnZvaWQgMD09PW0uZHluYW1pY1R5cGluZ1tpXSYmKG0uZHluYW1pY1R5cGluZ1tpXT1tLmR5bmFtaWNUeXBpbmdGdW5jdGlvbihpKSksITA9PT0obS5keW5hbWljVHlwaW5nW2ldfHxtLmR5bmFtaWNUeXBpbmcpP1widHJ1ZVwiPT09dHx8XCJUUlVFXCI9PT10fHxcImZhbHNlXCIhPT10JiZcIkZBTFNFXCIhPT10JiYoZnVuY3Rpb24oZSl7aWYocy50ZXN0KGUpKXt2YXIgdD1wYXJzZUZsb2F0KGUpO2lmKG48dCYmdDxyKXJldHVybiEwfXJldHVybiExfSh0KT9wYXJzZUZsb2F0KHQpOnUudGVzdCh0KT9uZXcgRGF0ZSh0KTpcIlwiPT09dD9udWxsOnQpOnQ7dmFyIGl9ZnVuY3Rpb24gayhlLHQsaSxyKXt2YXIgbj17dHlwZTplLGNvZGU6dCxtZXNzYWdlOml9O3ZvaWQgMCE9PXImJihuLnJvdz1yKSxjLmVycm9ycy5wdXNoKG4pfXRoaXMucGFyc2U9ZnVuY3Rpb24oZSx0LGkpe3ZhciByPW0ucXVvdGVDaGFyfHwnXCInO2lmKG0ubmV3bGluZXx8KG0ubmV3bGluZT1mdW5jdGlvbihlLHQpe2U9ZS5zdWJzdHJpbmcoMCwxMDQ4NTc2KTt2YXIgaT1uZXcgUmVnRXhwKGoodCkrXCIoW15dKj8pXCIraih0KSxcImdtXCIpLHI9KGU9ZS5yZXBsYWNlKGksXCJcIikpLnNwbGl0KFwiXFxyXCIpLG49ZS5zcGxpdChcIlxcblwiKSxzPTE8bi5sZW5ndGgmJm5bMF0ubGVuZ3RoPHJbMF0ubGVuZ3RoO2lmKDE9PT1yLmxlbmd0aHx8cylyZXR1cm5cIlxcblwiO2Zvcih2YXIgYT0wLG89MDtvPHIubGVuZ3RoO28rKylcIlxcblwiPT09cltvXVswXSYmYSsrO3JldHVybiBhPj1yLmxlbmd0aC8yP1wiXFxyXFxuXCI6XCJcXHJcIn0oZSxyKSksaD0hMSxtLmRlbGltaXRlcilNKG0uZGVsaW1pdGVyKSYmKG0uZGVsaW1pdGVyPW0uZGVsaW1pdGVyKGUpLGMubWV0YS5kZWxpbWl0ZXI9bS5kZWxpbWl0ZXIpO2Vsc2V7dmFyIG49ZnVuY3Rpb24oZSx0LGkscixuKXt2YXIgcyxhLG8saDtuPW58fFtcIixcIixcIlxcdFwiLFwifFwiLFwiO1wiLGIuUkVDT1JEX1NFUCxiLlVOSVRfU0VQXTtmb3IodmFyIHU9MDt1PG4ubGVuZ3RoO3UrKyl7dmFyIGY9blt1XSxkPTAsbD0wLGM9MDtvPXZvaWQgMDtmb3IodmFyIHA9bmV3IEUoe2NvbW1lbnRzOnIsZGVsaW1pdGVyOmYsbmV3bGluZTp0LHByZXZpZXc6MTB9KS5wYXJzZShlKSxnPTA7ZzxwLmRhdGEubGVuZ3RoO2crKylpZihpJiZ5KHAuZGF0YVtnXSkpYysrO2Vsc2V7dmFyIF89cC5kYXRhW2ddLmxlbmd0aDtsKz1fLHZvaWQgMCE9PW8/MDxfJiYoZCs9TWF0aC5hYnMoXy1vKSxvPV8pOm89X30wPHAuZGF0YS5sZW5ndGgmJihsLz1wLmRhdGEubGVuZ3RoLWMpLCh2b2lkIDA9PT1hfHxkPD1hKSYmKHZvaWQgMD09PWh8fGg8bCkmJjEuOTk8bCYmKGE9ZCxzPWYsaD1sKX1yZXR1cm57c3VjY2Vzc2Z1bDohIShtLmRlbGltaXRlcj1zKSxiZXN0RGVsaW1pdGVyOnN9fShlLG0ubmV3bGluZSxtLnNraXBFbXB0eUxpbmVzLG0uY29tbWVudHMsbS5kZWxpbWl0ZXJzVG9HdWVzcyk7bi5zdWNjZXNzZnVsP20uZGVsaW1pdGVyPW4uYmVzdERlbGltaXRlcjooaD0hMCxtLmRlbGltaXRlcj1iLkRlZmF1bHREZWxpbWl0ZXIpLGMubWV0YS5kZWxpbWl0ZXI9bS5kZWxpbWl0ZXJ9dmFyIHM9dyhtKTtyZXR1cm4gbS5wcmV2aWV3JiZtLmhlYWRlciYmcy5wcmV2aWV3KyssYT1lLG89bmV3IEUocyksYz1vLnBhcnNlKGEsdCxpKSxnKCksZD97bWV0YTp7cGF1c2VkOiEwfX06Y3x8e21ldGE6e3BhdXNlZDohMX19fSx0aGlzLnBhdXNlZD1mdW5jdGlvbigpe3JldHVybiBkfSx0aGlzLnBhdXNlPWZ1bmN0aW9uKCl7ZD0hMCxvLmFib3J0KCksYT1NKG0uY2h1bmspP1wiXCI6YS5zdWJzdHJpbmcoby5nZXRDaGFySW5kZXgoKSl9LHRoaXMucmVzdW1lPWZ1bmN0aW9uKCl7dC5zdHJlYW1lci5faGFsdGVkPyhkPSExLHQuc3RyZWFtZXIucGFyc2VDaHVuayhhLCEwKSk6c2V0VGltZW91dCh0LnJlc3VtZSwzKX0sdGhpcy5hYm9ydGVkPWZ1bmN0aW9uKCl7cmV0dXJuIGV9LHRoaXMuYWJvcnQ9ZnVuY3Rpb24oKXtlPSEwLG8uYWJvcnQoKSxjLm1ldGEuYWJvcnRlZD0hMCxNKG0uY29tcGxldGUpJiZtLmNvbXBsZXRlKGMpLGE9XCJcIn19ZnVuY3Rpb24gaihlKXtyZXR1cm4gZS5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZyxcIlxcXFwkJlwiKX1mdW5jdGlvbiBFKGUpe3ZhciBTLE89KGU9ZXx8e30pLmRlbGltaXRlcix4PWUubmV3bGluZSxJPWUuY29tbWVudHMsVD1lLnN0ZXAsRD1lLnByZXZpZXcsQT1lLmZhc3RNb2RlLEw9Uz12b2lkIDA9PT1lLnF1b3RlQ2hhcj8nXCInOmUucXVvdGVDaGFyO2lmKHZvaWQgMCE9PWUuZXNjYXBlQ2hhciYmKEw9ZS5lc2NhcGVDaGFyKSwoXCJzdHJpbmdcIiE9dHlwZW9mIE98fC0xPGIuQkFEX0RFTElNSVRFUlMuaW5kZXhPZihPKSkmJihPPVwiLFwiKSxJPT09Tyl0aHJvdyBuZXcgRXJyb3IoXCJDb21tZW50IGNoYXJhY3RlciBzYW1lIGFzIGRlbGltaXRlclwiKTshMD09PUk/ST1cIiNcIjooXCJzdHJpbmdcIiE9dHlwZW9mIEl8fC0xPGIuQkFEX0RFTElNSVRFUlMuaW5kZXhPZihJKSkmJihJPSExKSxcIlxcblwiIT09eCYmXCJcXHJcIiE9PXgmJlwiXFxyXFxuXCIhPT14JiYoeD1cIlxcblwiKTt2YXIgRj0wLHo9ITE7dGhpcy5wYXJzZT1mdW5jdGlvbihyLHQsaSl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIHIpdGhyb3cgbmV3IEVycm9yKFwiSW5wdXQgbXVzdCBiZSBhIHN0cmluZ1wiKTt2YXIgbj1yLmxlbmd0aCxlPU8ubGVuZ3RoLHM9eC5sZW5ndGgsYT1JLmxlbmd0aCxvPU0oVCksaD1bXSx1PVtdLGY9W10sZD1GPTA7aWYoIXIpcmV0dXJuIEMoKTtpZihBfHwhMSE9PUEmJi0xPT09ci5pbmRleE9mKFMpKXtmb3IodmFyIGw9ci5zcGxpdCh4KSxjPTA7YzxsLmxlbmd0aDtjKyspe2lmKGY9bFtjXSxGKz1mLmxlbmd0aCxjIT09bC5sZW5ndGgtMSlGKz14Lmxlbmd0aDtlbHNlIGlmKGkpcmV0dXJuIEMoKTtpZighSXx8Zi5zdWJzdHJpbmcoMCxhKSE9PUkpe2lmKG8pe2lmKGg9W10sayhmLnNwbGl0KE8pKSxSKCkseilyZXR1cm4gQygpfWVsc2UgayhmLnNwbGl0KE8pKTtpZihEJiZEPD1jKXJldHVybiBoPWguc2xpY2UoMCxEKSxDKCEwKX19cmV0dXJuIEMoKX1mb3IodmFyIHA9ci5pbmRleE9mKE8sRiksZz1yLmluZGV4T2YoeCxGKSxfPW5ldyBSZWdFeHAoaihMKStqKFMpLFwiZ1wiKSxtPXIuaW5kZXhPZihTLEYpOzspaWYocltGXSE9PVMpaWYoSSYmMD09PWYubGVuZ3RoJiZyLnN1YnN0cmluZyhGLEYrYSk9PT1JKXtpZigtMT09PWcpcmV0dXJuIEMoKTtGPWcrcyxnPXIuaW5kZXhPZih4LEYpLHA9ci5pbmRleE9mKE8sRil9ZWxzZSBpZigtMSE9PXAmJihwPGd8fC0xPT09ZykpZi5wdXNoKHIuc3Vic3RyaW5nKEYscCkpLEY9cCtlLHA9ci5pbmRleE9mKE8sRik7ZWxzZXtpZigtMT09PWcpYnJlYWs7aWYoZi5wdXNoKHIuc3Vic3RyaW5nKEYsZykpLHcoZytzKSxvJiYoUigpLHopKXJldHVybiBDKCk7aWYoRCYmaC5sZW5ndGg+PUQpcmV0dXJuIEMoITApfWVsc2UgZm9yKG09RixGKys7Oyl7aWYoLTE9PT0obT1yLmluZGV4T2YoUyxtKzEpKSlyZXR1cm4gaXx8dS5wdXNoKHt0eXBlOlwiUXVvdGVzXCIsY29kZTpcIk1pc3NpbmdRdW90ZXNcIixtZXNzYWdlOlwiUXVvdGVkIGZpZWxkIHVudGVybWluYXRlZFwiLHJvdzpoLmxlbmd0aCxpbmRleDpGfSksRSgpO2lmKG09PT1uLTEpcmV0dXJuIEUoci5zdWJzdHJpbmcoRixtKS5yZXBsYWNlKF8sUykpO2lmKFMhPT1MfHxyW20rMV0hPT1MKXtpZihTPT09THx8MD09PW18fHJbbS0xXSE9PUwpey0xIT09cCYmcDxtKzEmJihwPXIuaW5kZXhPZihPLG0rMSkpLC0xIT09ZyYmZzxtKzEmJihnPXIuaW5kZXhPZih4LG0rMSkpO3ZhciB5PWIoLTE9PT1nP3A6TWF0aC5taW4ocCxnKSk7aWYoclttKzEreV09PT1PKXtmLnB1c2goci5zdWJzdHJpbmcoRixtKS5yZXBsYWNlKF8sUykpLHJbRj1tKzEreStlXSE9PVMmJihtPXIuaW5kZXhPZihTLEYpKSxwPXIuaW5kZXhPZihPLEYpLGc9ci5pbmRleE9mKHgsRik7YnJlYWt9dmFyIHY9YihnKTtpZihyLnN1YnN0cmluZyhtKzErdixtKzErditzKT09PXgpe2lmKGYucHVzaChyLnN1YnN0cmluZyhGLG0pLnJlcGxhY2UoXyxTKSksdyhtKzErditzKSxwPXIuaW5kZXhPZihPLEYpLG09ci5pbmRleE9mKFMsRiksbyYmKFIoKSx6KSlyZXR1cm4gQygpO2lmKEQmJmgubGVuZ3RoPj1EKXJldHVybiBDKCEwKTticmVha311LnB1c2goe3R5cGU6XCJRdW90ZXNcIixjb2RlOlwiSW52YWxpZFF1b3Rlc1wiLG1lc3NhZ2U6XCJUcmFpbGluZyBxdW90ZSBvbiBxdW90ZWQgZmllbGQgaXMgbWFsZm9ybWVkXCIscm93OmgubGVuZ3RoLGluZGV4OkZ9KSxtKyt9fWVsc2UgbSsrfXJldHVybiBFKCk7ZnVuY3Rpb24gayhlKXtoLnB1c2goZSksZD1GfWZ1bmN0aW9uIGIoZSl7dmFyIHQ9MDtpZigtMSE9PWUpe3ZhciBpPXIuc3Vic3RyaW5nKG0rMSxlKTtpJiZcIlwiPT09aS50cmltKCkmJih0PWkubGVuZ3RoKX1yZXR1cm4gdH1mdW5jdGlvbiBFKGUpe3JldHVybiBpfHwodm9pZCAwPT09ZSYmKGU9ci5zdWJzdHJpbmcoRikpLGYucHVzaChlKSxGPW4sayhmKSxvJiZSKCkpLEMoKX1mdW5jdGlvbiB3KGUpe0Y9ZSxrKGYpLGY9W10sZz1yLmluZGV4T2YoeCxGKX1mdW5jdGlvbiBDKGUpe3JldHVybntkYXRhOmgsZXJyb3JzOnUsbWV0YTp7ZGVsaW1pdGVyOk8sbGluZWJyZWFrOngsYWJvcnRlZDp6LHRydW5jYXRlZDohIWUsY3Vyc29yOmQrKHR8fDApfX19ZnVuY3Rpb24gUigpe1QoQygpKSxoPVtdLHU9W119fSx0aGlzLmFib3J0PWZ1bmN0aW9uKCl7ej0hMH0sdGhpcy5nZXRDaGFySW5kZXg9ZnVuY3Rpb24oKXtyZXR1cm4gRn19ZnVuY3Rpb24gXyhlKXt2YXIgdD1lLmRhdGEsaT1hW3Qud29ya2VySWRdLHI9ITE7aWYodC5lcnJvcilpLnVzZXJFcnJvcih0LmVycm9yLHQuZmlsZSk7ZWxzZSBpZih0LnJlc3VsdHMmJnQucmVzdWx0cy5kYXRhKXt2YXIgbj17YWJvcnQ6ZnVuY3Rpb24oKXtyPSEwLG0odC53b3JrZXJJZCx7ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7YWJvcnRlZDohMH19KX0scGF1c2U6eSxyZXN1bWU6eX07aWYoTShpLnVzZXJTdGVwKSl7Zm9yKHZhciBzPTA7czx0LnJlc3VsdHMuZGF0YS5sZW5ndGgmJihpLnVzZXJTdGVwKHtkYXRhOnQucmVzdWx0cy5kYXRhW3NdLGVycm9yczp0LnJlc3VsdHMuZXJyb3JzLG1ldGE6dC5yZXN1bHRzLm1ldGF9LG4pLCFyKTtzKyspO2RlbGV0ZSB0LnJlc3VsdHN9ZWxzZSBNKGkudXNlckNodW5rKSYmKGkudXNlckNodW5rKHQucmVzdWx0cyxuLHQuZmlsZSksZGVsZXRlIHQucmVzdWx0cyl9dC5maW5pc2hlZCYmIXImJm0odC53b3JrZXJJZCx0LnJlc3VsdHMpfWZ1bmN0aW9uIG0oZSx0KXt2YXIgaT1hW2VdO00oaS51c2VyQ29tcGxldGUpJiZpLnVzZXJDb21wbGV0ZSh0KSxpLnRlcm1pbmF0ZSgpLGRlbGV0ZSBhW2VdfWZ1bmN0aW9uIHkoKXt0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQuXCIpfWZ1bmN0aW9uIHcoZSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGV8fG51bGw9PT1lKXJldHVybiBlO3ZhciB0PUFycmF5LmlzQXJyYXkoZSk/W106e307Zm9yKHZhciBpIGluIGUpdFtpXT13KGVbaV0pO3JldHVybiB0fWZ1bmN0aW9uIHYoZSx0KXtyZXR1cm4gZnVuY3Rpb24oKXtlLmFwcGx5KHQsYXJndW1lbnRzKX19ZnVuY3Rpb24gTShlKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlfXJldHVybiBvJiYoZi5vbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5kYXRhO3ZvaWQgMD09PWIuV09SS0VSX0lEJiZ0JiYoYi5XT1JLRVJfSUQ9dC53b3JrZXJJZCk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQuaW5wdXQpZi5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Yi5XT1JLRVJfSUQscmVzdWx0czpiLnBhcnNlKHQuaW5wdXQsdC5jb25maWcpLGZpbmlzaGVkOiEwfSk7ZWxzZSBpZihmLkZpbGUmJnQuaW5wdXQgaW5zdGFuY2VvZiBGaWxlfHx0LmlucHV0IGluc3RhbmNlb2YgT2JqZWN0KXt2YXIgaT1iLnBhcnNlKHQuaW5wdXQsdC5jb25maWcpO2kmJmYucG9zdE1lc3NhZ2Uoe3dvcmtlcklkOmIuV09SS0VSX0lELHJlc3VsdHM6aSxmaW5pc2hlZDohMH0pfX0pLChsLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHUucHJvdG90eXBlKSkuY29uc3RydWN0b3I9bCwoYy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZSh1LnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yPWMsKHAucHJvdG90eXBlPU9iamVjdC5jcmVhdGUocC5wcm90b3R5cGUpKS5jb25zdHJ1Y3Rvcj1wLChnLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHUucHJvdG90eXBlKSkuY29uc3RydWN0b3I9ZyxifSk7IiwgIlxuZXhwb3J0IGZ1bmN0aW9uIHdlYnNvY2tldCh1cmw6IFVSTCwgZW50cmllczogdW5rbm93bltdLCBvbk9wZW46ICgpID0+IHZvaWQpIHtcbiAgICBsZXQgd3MgPSBuZXcgV2ViU29ja2V0KHVybCk7XG4gICAgaWYgKCF3cykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXJ2ZXIgZGlkbid0IGFjY2VwdCB3c1wiKTtcbiAgICB9XG4gICAgd3MuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnT3BlbmVkIHdlYnNvY2tldCcpO1xuICAgICAgICBvbk9wZW4oKVxuICAgIH0pO1xuICAgIHdzLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsICh7IGRhdGEgfSkgPT4ge1xuICAgICAgICBjb25zdCB7IGNvdW50LCB0eiwgZXJyb3IsIG5hbWUsIGR1cmF0aW9uLCBlbmRUaW1lIH0gPSBKU09OLnBhcnNlKGRhdGEpO1xuXG4gICAgICAgIGlmIChuYW1lICYmIGR1cmF0aW9uICYmIGVuZFRpbWUpIHtcblxuICAgICAgICAgICAgbGV0IHN0YXJ0VGltZSA9IGVuZFRpbWUgLSBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICBzZXJ2ZXJFbnRyeSA9IHsgbmFtZSwgZHVyYXRpb24sIHN0YXJ0VGltZSwgZW50cnlUeXBlOiAnc2VydmVyJywgZW5kVGltZSB9XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oc2VydmVyRW50cnkpXG4gICAgICAgICAgICBlbnRyaWVzLnB1c2goc2VydmVyRW50cnkpO1xuICAgICAgICB9IGVsc2UgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgY29uc29sZS5pbmZvKHsgY291bnQsIHR6LCBlcnJvciB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHdzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbG9zZWQgd2Vic29ja2V0Jyk7XG5cbiAgICB9KTtcbiAgICByZXR1cm4gd3M7XG59XG4iLCAiZXhwb3J0IHR5cGUgVGJyaWVmRW50cnkgPSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGVuZFRpbWU6IG51bWJlcjtcbiAgICBzdGFydFRpbWU6IG51bWJlcjtcbiAgICBkdXJhdGlvbjogbnVtYmVyO1xuICAgIGVudHJ5VHlwZTogc3RyaW5nO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXRPYnNlcnZlcnMoZW50cmllczogdW5rbm93bltdKSB7XG4gICAgY29uc3QgcG8gPSBuZXcgUGVyZm9ybWFuY2VPYnNlcnZlcigobGlzdCkgPT4ge1xuICAgICAgICBsaXN0LmdldEVudHJpZXMoKS5mb3JFYWNoKFxuICAgICAgICAgICAgKGVudHJ5OiBQZXJmb3JtYW5jZUVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHsgc3RhcnRUaW1lLCBkdXJhdGlvbiwgbmFtZSwgZW50cnlUeXBlIH0gPSBlbnRyeVxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IE1hdGguZmxvb3Ioc3RhcnRUaW1lKVxuICAgICAgICAgICAgICAgIGR1cmF0aW9uID0gTWF0aC5mbG9vcihkdXJhdGlvbilcbiAgICAgICAgICAgICAgICBsZXQgZW5kVGltZSA9IHN0YXJ0VGltZSArIGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBicmllZkVudHJ5ID0geyBuYW1lLCBlbmRUaW1lLCBzdGFydFRpbWUsIGR1cmF0aW9uLCBlbnRyeVR5cGUgfTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhicmllZkVudHJ5KVxuICAgICAgICAgICAgICAgIGVudHJpZXMucHVzaChicmllZkVudHJ5KVxuICAgICAgICAgICAgfSlcbiAgICB9KVxuICAgIGNvbnN0IHJvID0gbmV3IFBlcmZvcm1hbmNlT2JzZXJ2ZXIoKGxpc3QpID0+IHtcbiAgICAgICAgbGlzdC5nZXRFbnRyaWVzQnlUeXBlKCdyZXNvdXJjZScpLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBsZXQgeyBzdGFydFRpbWUsIGR1cmF0aW9uLCBuYW1lLCBlbnRyeVR5cGUsIHJlc3BvbnNlU3RhcnQsIHJlc3BvbnNlRW5kLCBzZXJ2ZXJUaW1pbmcsIGluaXRpYXRvclR5cGUgfSA9IGVudHJ5IGFzIFBlcmZvcm1hbmNlUmVzb3VyY2VUaW1pbmdcbiAgICAgICAgICAgIGlmIChuYW1lLmluY2x1ZGVzKCdtaXRtJykgfHwgbmFtZS5pbmNsdWRlcygnZmF2aWNvbicpKSByZXR1cm5cbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IE1hdGguZmxvb3Ioc3RhcnRUaW1lKVxuICAgICAgICAgICAgZHVyYXRpb24gPSBNYXRoLmZsb29yKGR1cmF0aW9uKVxuICAgICAgICAgICAgcmVzcG9uc2VFbmQgPSBNYXRoLmZsb29yKHJlc3BvbnNlRW5kKVxuICAgICAgICAgICAgcmVzcG9uc2VTdGFydCA9IE1hdGguZmxvb3IocmVzcG9uc2VTdGFydClcbiAgICAgICAgICAgIGlmICgvXmh0dHBzPzpcXC9cXC8vLnRlc3QobmFtZSkpIG5hbWUgPSBTdHJpbmcobmFtZS5zcGxpdCgnLycpLnBvcCgpKVxuICAgICAgICAgICAgc2VydmVyVGltaW5nLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHsgbmFtZSwgZHVyYXRpb24sIGRlc2NyaXB0aW9uIH0gPSBlbnRyeSxcbiAgICAgICAgICAgICAgICAgICAgZW5kVGltZSA9IE51bWJlcihkZXNjcmlwdGlvbi5yZXBsYWNlKCdlbmR0aW1lOicsICcnKSksXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IGVuZFRpbWUgLSBkdXJhdGlvblxuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coeyBuYW1lLCBkdXJhdGlvbiwgc3RhcnRUaW1lLCBlbnRyeVR5cGU6ICdzZXJ2ZXInLCBlbmRUaW1lIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZW50cmllcyA9IGVudHJpZXMuY29uY2F0KFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGAke2luaXRpYXRvclR5cGV9OnJlcXVlc3Rfc2VudGAsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgICAgICAgICAgICAgIGVuZFRpbWU6IHN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICAgICAgZW50cnlUeXBlOiAnbWFyaydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7aW5pdGlhdG9yVHlwZX06cmVzcG9uc2Vfc3RhcnRgLFxuICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiByZXNwb25zZVN0YXJ0IC0gc3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgICAgICBlbmRUaW1lOiByZXNwb25zZVN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBlbnRyeVR5cGU6ICdyZXNvdXJjZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7aW5pdGlhdG9yVHlwZX06cmVzcG9uc2VfY29tcGxldGVgLFxuICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWU6IHJlc3BvbnNlU3RhcnQgLSBzdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiByZXNwb25zZUVuZCAtIHJlc3BvbnNlU3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGVuZFRpbWU6IHJlc3BvbnNlRW5kLFxuICAgICAgICAgICAgICAgICAgICBlbnRyeVR5cGU6ICdyZXNvdXJjZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdKVxuXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVudHJ5LnRvSlNPTigpKVxuXG5cblxuICAgICAgICB9KVxuXG4gICAgfSlcblxuICAgIGNvbnN0IGxpc3RFbnRyaWVzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBlbnRyaWVzT2JqID0gZW50cmllcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYS5lbmRUaW1lIC0gYi5lbmRUaW1lXG4gICAgICAgIH0pLnJlZHVjZSgoYWNjdW0sIGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBsZXQgeyBuYW1lLCBlbmRUaW1lLCBzdGFydFRpbWUsIGR1cmF0aW9uLCBlbnRyeVR5cGUgfSA9IGVudHJ5IGFzIFRicmllZkVudHJ5O1xuICAgICAgICAgICAgYWNjdW1bbmFtZV0gPSB7IGVuZFRpbWUsIHN0YXJ0VGltZSwgZHVyYXRpb24sIGVudHJ5VHlwZSB9O1xuICAgICAgICAgICAgcmV0dXJuIGFjY3VtO1xuICAgICAgICB9LCB7fSBhcyB7IFtzOiBzdHJpbmddOiBPbWl0PFRicmllZkVudHJ5LCAnbmFtZSc+IH0pXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0SWRsZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoZW50cmllc09iaik7XG4gICAgICAgICAgICBwbyAmJiBwby5kaXNjb25uZWN0KClcbiAgICAgICAgICAgIHJvICYmIHJvLmRpc2Nvbm5lY3QoKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcm8sIHBvLCBsaXN0RW50cmllcyB9XG59IiwgImltcG9ydCBzdHJlYW1TYXZlciBmcm9tICdzdHJlYW1zYXZlcic7XG5cblxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkKFxuICAgIHVybDogc3RyaW5nLFxuICAgIGZpbGVOYW1lID0gJ2ZpbGUudHh0JyxcbiAgICBjYjogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkXG4pIHtcbiAgICBsZXQgdHRmYiA9IGZhbHNlO1xuICAgIGNvbnNvbGUubG9nKHsgdXJsIH0pO1xuICAgIHBlcmZvcm1hbmNlLm1hcmsoJ2Rvd25sb2FkOnN0YXJ0Jyk7XG5cbiAgICBsZXQgZG9uZSA9IGZhbHNlO1xuICAgIHN0cmVhbVNhdmVyLm1pdG0gPSBgJHtsb2NhdGlvbi5vcmlnaW59L21pdG0uaHRtbGA7XG4gICAgY29uc3QgZmlsZVN0cmVhbSA9IHN0cmVhbVNhdmVyLmNyZWF0ZVdyaXRlU3RyZWFtKGZpbGVOYW1lKTtcblxuICAgIC8vIGFib3J0IHNvIGl0IGRvc2Ugbm90IGxvb2sgc3R1Y2tcbiAgICB3aW5kb3cub251bmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGZpbGVTdHJlYW0uYWJvcnQoKTtcbiAgICB9O1xuXG4gICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZXZ0ID0+IHtcbiAgICAgICAgaWYgKCFkb25lKSB7XG4gICAgICAgICAgICBldnQucmV0dXJuVmFsdWUgPSBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxlYXZlP2A7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ1RFJzogJ3RyYWlsZXJzJyxcbiAgICAgICAgICAgICdzdGFydFRpbWUnOiBTdHJpbmcocGVyZm9ybWFuY2Uubm93KCkpLFxuICAgICAgICAgICAgJ3N0YXJ0ZWRfYXQnOiBTdHJpbmcoTWF0aC5mbG9vcihEYXRlLm5vdygpIC0gcGVyZm9ybWFuY2Uubm93KCkpKSxcbiAgICAgICAgICAgICdjYWNoZS1jb250cm9sJzogJ25vLWNhY2hlLCBuby1zdG9yZSwgbWF4LWFnZT0xLCBzLW1heGFnZT0xJ1xuICAgICAgICB9XG4gICAgfSlcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcblxuICAgICAgICAgICAgaWYgKCFyZXMuYm9keSB8fCAhcmVzLm9rKVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IocmVzLnN0YXR1c1RleHQpKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuYm9keS5waXBlVG8oZmlsZVN0cmVhbSk7XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICBwZXJmb3JtYW5jZS5tYXJrKCdkb3dubG9hZDp0ZWFyX2Rvd24nKTtcbiAgICAgICAgICAgIHJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG59XG4iLCAiaW1wb3J0IHsgZG93bmxvYWQgfSBmcm9tIFwiLi9kb3dubG9hZFwiO1xuaW1wb3J0IFBhcGEgZnJvbSAncGFwYXBhcnNlJ1xuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcGFwYVhIUih1cmw6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZywgY2I6IEZ1bmN0aW9uKSB7XG5cbiAgICBwZXJmb3JtYW5jZS5tYXJrKCdYSFI6c3RhcnQnKTtcbiAgICBsZXQgdGltZXJPcGVuID0gdHJ1ZSwgc2VwYXJhdG9yID0gJ1snLCBzdHJpbmdpZmllZCA9ICcnO1xuICAgIFBhcGEucGFyc2UodXJsLCB7XG4gICAgICAgIGRvd25sb2FkOiB0cnVlLFxuICAgICAgICBjaHVua1NpemU6IDcgKiAxMDI0ICogMTAyNCxcbiAgICAgICAgYmVmb3JlRmlyc3RDaHVuazogKGNodW5rKSA9PiB7XG4gICAgICAgICAgICBwZXJmb3JtYW5jZS5tYXJrKCdYSFI6ZmluaXNoJyk7XG4gICAgICAgICAgICByZXR1cm4gY2h1bms7XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZXA6IChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIC8vcGFyc2VkLnB1c2gocmVzdWx0LmRhdGEpXG4gICAgICAgICAgICBzdHJpbmdpZmllZCArPSBzZXBhcmF0b3IgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICBzZXBhcmF0b3IgPSAnLCc7XG4gICAgICAgICAgICBpZiAodGltZXJPcGVuKSB7XG4gICAgICAgICAgICAgICAgdGltZXJPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcGVyZm9ybWFuY2UubWFyaygnUGFyc2U6c3RhcnQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgcGVyZm9ybWFuY2UubWVhc3VyZSgnUGFyc2U6ZW5kJywgJ1BhcnNlOnN0YXJ0Jyk7XG4gICAgICAgICAgICBzdHJpbmdpZmllZCArPSAnXSc7XG4gICAgICAgICAgICBjb25zdCBibG9iVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbc3RyaW5naWZpZWRdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSk7XG4gICAgICAgICAgICBkb3dubG9hZChibG9iVXJsLCAneGhyLmpzb24nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChibG9iVXJsKTtcbiAgICAgICAgICAgICAgICBzdHJpbmdpZmllZCA9ICcnO1xuICAgICAgICAgICAgICAgIHBlcmZvcm1hbmNlLm1hcmsoJ2Rvd25sb2FkOnRlYXJfZG93bicpO1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gcGFwYVN0cmluZyh1cmw6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZywgY2IgPSBGdW5jdGlvbikge1xuICAgIHBlcmZvcm1hbmNlLm1hcmsoJ2ZldGNoOnN0YXJ0Jyk7XG4gICAgZmV0Y2godXJsKS50aGVuKHJlcyA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHJlcy50ZXh0KCk7XG4gICAgfSkudGhlbihjc3ZTdHJpbmcgPT4ge1xuICAgICAgICBwZXJmb3JtYW5jZS5tYXJrKCdmZXRjaDpmaW5pc2gnKTtcblxuICAgICAgICBjb25zdCBibG9iVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbUGFwYS5wYXJzZShjc3ZTdHJpbmcpLmRhdGFdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSk7XG4gICAgICAgIGRvd25sb2FkKGJsb2JVcmwsICdwYXBhX3N0cmluZy5qc29uJywgKCkgPT4ge1xuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChibG9iVXJsKTtcblxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHBhcGFGaWxlKHVybDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nLCBjYiA9IEZ1bmN0aW9uKSB7XG4gICAgcGVyZm9ybWFuY2UubWFyaygnZmV0Y2g6c3RhcnQnKTtcbiAgICBmZXRjaCh1cmwpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5ibG9iKCk7XG4gICAgfSkudGhlbihibG9iID0+IHtcbiAgICAgICAgcGVyZm9ybWFuY2UubWFyaygnZmV0Y2g6ZmluaXNoJyk7XG4gICAgICAgIHZhciBmaWxlID0gbmV3IEZpbGUoW2Jsb2JdLCBcInBhcGFfY3N2LmNzdlwiLCB7IHR5cGU6IFwidGV4dC9jc3ZcIiwgbGFzdE1vZGlmaWVkOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSB9KTtcbiAgICAgICAgcGVyZm9ybWFuY2UubWFyaygnUGFyc2U6c3RhcnQnKTtcbiAgICAgICAgUGFwYS5wYXJzZShmaWxlLCB7XG4gICAgICAgICAgICBjb21wbGV0ZTogKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHBlcmZvcm1hbmNlLm1lYXN1cmUoJ1BhcnNlOmVuZCcsICdQYXJzZTpzdGFydCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2JVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShyZXN1bHQuZGF0YSldLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSk7XG4gICAgICAgICAgICAgICAgZG93bmxvYWQoYmxvYlVybCwgJ3BhcGFGaWxlLmpzb24nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoYmxvYlVybCk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgIH0pO1xufVxuIiwgIi8vLyA8cmVmZXJlbmNlIGxpYj1cImRvbVwiIC8+XG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cInN0cmVhbXNhdmVyXCIgLz5cblxuaW1wb3J0IHsgd2Vic29ja2V0IH0gZnJvbSAnLi9iZW5jaC93ZWJzb2NrZXQnXG5pbXBvcnQgeyBpbml0T2JzZXJ2ZXJzIH0gZnJvbSAnLi9iZW5jaC9vYnNlcnZlcnMnXG5pbXBvcnQgeyBwYXBhWEhSIH0gZnJvbSAnLi9iZW5jaC9wYXBhWEhSJ1xuaW1wb3J0IHsgZG93bmxvYWQgfSBmcm9tICcuL2JlbmNoL2Rvd25sb2FkJ1xuaW1wb3J0IHR5cGUgeyBUYnJpZWZFbnRyeSB9IGZyb20gJy4vYmVuY2gvb2JzZXJ2ZXJzJ1xuXG5cblxuZXhwb3J0IGxldCBlbnRyaWVzID0gW10gYXMgVGJyaWVmRW50cnlbXVxuXG5jb25zdCB7IHBvLCBybywgbGlzdEVudHJpZXMgfSA9IGluaXRPYnNlcnZlcnMoZW50cmllcylcblxuZ2xvYmFsVGhpcy5jb25uZWN0ID0gKGNiKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24ub3JpZ2luKVxuICAgIHVybC5wcm90b2NvbCA9ICd3c3MnXG4gICAgdXJsLnBhdGhuYW1lID0gXCIvY3N2L3dzXCJcbiAgICBnbG9iYWxUaGlzLndzID0gd2Vic29ja2V0KHVybCwgZW50cmllcywgY2IpXG59XG5cblxuXG5cbmdsb2JhbFRoaXMuY29ubmVjdCgoKSA9PiB7XG4gICAgcG8ub2JzZXJ2ZSh7IGVudHJ5VHlwZXM6IFsnbWFyaycsICdtZWFzdXJlJ10gfSk7XG4gICAgcm8ub2JzZXJ2ZSh7IGVudHJ5VHlwZXM6IFsncmVzb3VyY2UnXSB9KVxuXG4gICAgcmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIC8vcGFwYVhIUihcIi9jc3YvcmF3Lmpzb25cIiwgJ3Jhdy5qc29uJywgKCkgPT4geyBsaXN0RW50cmllcygpIH0pXG4gICAgICAgIC8vcGFwYVN0cmluZyhcImh0dHA6Ly9sb2NhbGhvc3Q6ODc4Ny9jc3YvcmF3Lmpzb25cIilcbiAgICAgICAgLy9wYXBhRmlsZShcImh0dHA6Ly9sb2NhbGhvc3Q6ODc4Ny9jc3YvcmF3Lmpzb25cIilcbiAgICAgICAgbGV0IGZpbGVuYW1lID0gbG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpIHx8ICdmZXRjaC5qc29uJ1xuICAgICAgICBpZiAoZmlsZW5hbWUuaW5jbHVkZXMoJ3hocicpKSB7XG4gICAgICAgICAgICBwYXBhWEhSKFwiL2Nzdi9yYXcuanNvblwiLCAncmF3Lmpzb24nLCAoKSA9PiB7IGxpc3RFbnRyaWVzKCkgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGVuYW1lKVxuICAgICAgICAgICAgZG93bmxvYWQoYC9jc3YvJHtmaWxlbmFtZX1gLCBmaWxlbmFtZSwgKCkgPT4geyBsaXN0RW50cmllcygpIH0pXG4gICAgICAgIH1cbiAgICAgICAgLy9kb3dubG9hZCgnL2Nzdi90cmFuc2Zvcm0uanNvbicsICd0cmFuc2Zvcm0uanNvbicsICgpID0+IHsgbGlzdEVudHJpZXMoKSB9KVxuICAgICAgICAvL2Rvd25sb2FkKCcvY3N2L2ZldGNoLmpzb24nLCAnZmV0Y2guanNvbicsICgpID0+IHsgbGlzdEVudHJpZXMoKSB9KVxuXG4gICAgfSk7XG5cbn0pXG5cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVDLElBQUMsRUFBQyxHQUFNLE1BQWU7QUFDdEIsYUFBTyxNQUFXLGNBQ2QsR0FBTyxVQUFVLE1BQ2pCLE9BQU8sVUFBVyxjQUFjLE9BQU8sT0FBTyxPQUFRLFdBQ3BELE9BQU8sS0FDUCxHQUFLLEtB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
