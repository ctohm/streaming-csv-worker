(() => {
  var Re = Object.create;
  var fe = Object.defineProperty;
  var Ce = Object.getOwnPropertyDescriptor;
  var Oe = Object.getOwnPropertyNames;
  var xe = Object.getPrototypeOf, Le = Object.prototype.hasOwnProperty;
  var Ie = (u) => fe(u, "__esModule", { value: !0 });
  var be = (u, i) => () => (i || u((i = { exports: {} }).exports, i), i.exports);
  var Me = (u, i, O) => {
    if (i && typeof i == "object" || typeof i == "function")
      for (let A of Oe(i))
        !Le.call(u, A) && A !== "default" && fe(u, A, { get: () => i[A], enumerable: !(O = Ce(i, A)) || O.enumerable });
    return u;
  }, we = (u) => Me(Ie(fe(u != null ? Re(xe(u)) : {}, "default", u && u.__esModule && "default" in u ? { get: () => u.default, enumerable: !0 } : { value: u, enumerable: !0 })), u);

  // node_modules/streamsaver/StreamSaver.js
  var Ee = be((de, he) => {
    ((u, i) => {
      typeof he != "undefined" ? he.exports = i() : typeof define == "function" && typeof define.amd == "object" ? define(i) : de[u] = i();
    })("streamSaver", () => {
      "use strict";
      let u = typeof window == "object" ? window : de;
      u.HTMLElement || console.warn("streamsaver is meant to run on browsers main thread");
      let i = null, O = !1, A = (L) => {
        try {
          L();
        } catch (m) {
        }
      }, z = u.WebStreamsPolyfill || {}, I = u.isSecureContext, n = /constructor/i.test(u.HTMLElement) || !!u.safari || !!u.WebKitPoint, E = I || "MozAppearance" in document.documentElement.style ? "iframe" : "navigate", y = {
        createWriteStream: ee,
        WritableStream: u.WritableStream || z.WritableStream,
        supported: !0,
        version: { full: "2.0.5", major: 2, minor: 0, dot: 5 },
        mitm: "https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0"
      };
      function N(L) {
        if (!L)
          throw new Error("meh");
        let m = document.createElement("iframe");
        return m.hidden = !0, m.src = L, m.loaded = !1, m.name = "iframe", m.isIframe = !0, m.postMessage = (...W) => m.contentWindow.postMessage(...W), m.addEventListener("load", () => {
          m.loaded = !0;
        }, { once: !0 }), document.body.appendChild(m), m;
      }
      function x(L) {
        let m = "width=200,height=100", W = document.createDocumentFragment(), R = {
          frame: u.open(L, "popup", m),
          loaded: !1,
          isIframe: !1,
          isPopup: !0,
          remove() {
            R.frame.close();
          },
          addEventListener(...v) {
            W.addEventListener(...v);
          },
          dispatchEvent(...v) {
            W.dispatchEvent(...v);
          },
          removeEventListener(...v) {
            W.removeEventListener(...v);
          },
          postMessage(...v) {
            R.frame.postMessage(...v);
          }
        }, G = (v) => {
          v.source === R.frame && (R.loaded = !0, u.removeEventListener("message", G), R.dispatchEvent(new Event("load")));
        };
        return u.addEventListener("message", G), R;
      }
      try {
        new Response(new ReadableStream()), I && !("serviceWorker" in navigator) && (n = !0);
      } catch (L) {
        n = !0;
      }
      A(() => {
        let { readable: L } = new TransformStream(), m = new MessageChannel();
        m.port1.postMessage(L, [L]), m.port1.close(), m.port2.close(), O = !0, Object.defineProperty(y, "TransformStream", {
          configurable: !1,
          writable: !1,
          value: TransformStream
        });
      });
      function D() {
        i || (i = I ? N(y.mitm) : x(y.mitm));
      }
      function ee(L, m, W) {
        let R = {
          size: null,
          pathname: null,
          writableStrategy: void 0,
          readableStrategy: void 0
        }, G = 0, v = null, Q = null, Z = null;
        if (Number.isFinite(m) ? ([W, m] = [m, W], console.warn("[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream"), R.size = W, R.writableStrategy = m) : m && m.highWaterMark ? (console.warn("[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream"), R.size = W, R.writableStrategy = m) : R = m || {}, !n) {
          D(), Q = new MessageChannel(), L = encodeURIComponent(L.replace(/\//g, ":")).replace(/['()]/g, escape).replace(/\*/g, "%2A");
          let t = {
            transferringReadable: O,
            pathname: R.pathname || Math.random().toString().slice(-6) + "/" + L,
            headers: {
              "Content-Type": "application/octet-stream; charset=utf-8",
              "Content-Disposition": "attachment; filename*=UTF-8''" + L
            }
          };
          R.size && (t.headers["Content-Length"] = R.size);
          let e = [t, "*", [Q.port2]];
          if (O) {
            let r = E === "iframe" ? void 0 : {
              transform(o, h) {
                if (!(o instanceof Uint8Array))
                  throw new TypeError("Can only wirte Uint8Arrays");
                G += o.length, h.enqueue(o), v && (location.href = v, v = null);
              },
              flush() {
                v && (location.href = v);
              }
            };
            Z = new y.TransformStream(r, R.writableStrategy, R.readableStrategy);
            let s = Z.readable;
            Q.port1.postMessage({ readableStream: s }, [s]);
          }
          Q.port1.onmessage = (r) => {
            r.data.download && (E === "navigate" ? (i.remove(), i = null, G ? location.href = r.data.download : v = r.data.download) : (i.isPopup && (i.remove(), i = null, E === "iframe" && N(y.mitm)), N(r.data.download)));
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
            Q.port1.postMessage(t), G += t.length, v && (location.href = v, v = null);
          },
          close() {
            if (n) {
              let t = new Blob(b, { type: "application/octet-stream; charset=utf-8" }), e = document.createElement("a");
              e.href = URL.createObjectURL(t), e.download = L, e.click();
            } else
              Q.port1.postMessage("end");
          },
          abort() {
            b = [], Q.port1.postMessage("abort"), Q.port1.onmessage = null, Q.port1.close(), Q.port2.close(), Q = null;
          }
        }, R.writableStrategy);
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
      var i = typeof self != "undefined" ? self : typeof window != "undefined" ? window : i !== void 0 ? i : {}, O = !i.document && !!i.postMessage, A = O && /blob:/i.test((i.location || {}).protocol), z = {}, I = 0, n = { parse: function(t, e) {
        var r = (e = e || {}).dynamicTyping || !1;
        if (b(r) && (e.dynamicTypingFunction = r, r = {}), e.dynamicTyping = r, e.transform = !!b(e.transform) && e.transform, e.worker && n.WORKERS_SUPPORTED) {
          var s = function() {
            if (!n.WORKERS_SUPPORTED)
              return !1;
            var h = (q = i.URL || i.webkitURL || null, C = u.toString(), n.BLOB_URL || (n.BLOB_URL = q.createObjectURL(new Blob(["(", C, ")();"], { type: "text/javascript" })))), g = new i.Worker(h), q, C;
            return g.onmessage = R, g.id = I++, z[g.id] = g;
          }();
          return s.userStep = e.step, s.userChunk = e.chunk, s.userComplete = e.complete, s.userError = e.error, e.step = b(e.step), e.chunk = b(e.chunk), e.complete = b(e.complete), e.error = b(e.error), delete e.worker, void s.postMessage({ input: t, config: e, workerId: s.id });
        }
        var o = null;
        return n.NODE_STREAM_INPUT, typeof t == "string" ? o = e.download ? new N(e) : new D(e) : t.readable === !0 && b(t.read) && b(t.on) ? o = new ee(e) : (i.File && t instanceof File || t instanceof Object) && (o = new x(e)), o.stream(t);
      }, unparse: function(t, e) {
        var r = !1, s = !0, o = ",", h = `\r
`, g = '"', q = g + g, C = !1, l = null, M = !1;
        (function() {
          if (typeof e == "object") {
            if (typeof e.delimiter != "string" || n.BAD_DELIMITERS.filter(function(a) {
              return e.delimiter.indexOf(a) !== -1;
            }).length || (o = e.delimiter), (typeof e.quotes == "boolean" || typeof e.quotes == "function" || Array.isArray(e.quotes)) && (r = e.quotes), typeof e.skipEmptyLines != "boolean" && typeof e.skipEmptyLines != "string" || (C = e.skipEmptyLines), typeof e.newline == "string" && (h = e.newline), typeof e.quoteChar == "string" && (g = e.quoteChar), typeof e.header == "boolean" && (s = e.header), Array.isArray(e.columns)) {
              if (e.columns.length === 0)
                throw new Error("Option columns is empty");
              l = e.columns;
            }
            e.escapeChar !== void 0 && (q = e.escapeChar + g), typeof e.escapeFormulae == "boolean" && (M = e.escapeFormulae);
          }
        })();
        var d = new RegExp(m(g), "g");
        if (typeof t == "string" && (t = JSON.parse(t)), Array.isArray(t)) {
          if (!t.length || Array.isArray(t[0]))
            return re(null, t, C);
          if (typeof t[0] == "object")
            return re(l || Object.keys(t[0]), t, C);
        } else if (typeof t == "object")
          return typeof t.data == "string" && (t.data = JSON.parse(t.data)), Array.isArray(t.data) && (t.fields || (t.fields = t.meta && t.meta.fields), t.fields || (t.fields = Array.isArray(t.data[0]) ? t.fields : typeof t.data[0] == "object" ? Object.keys(t.data[0]) : []), Array.isArray(t.data[0]) || typeof t.data[0] == "object" || (t.data = [t.data])), re(t.fields || [], t.data || [], C);
        throw new Error("Unable to serialize unrecognized input");
        function re(a, S, j) {
          var K = "";
          typeof a == "string" && (a = JSON.parse(a)), typeof S == "string" && (S = JSON.parse(S));
          var B = Array.isArray(a) && 0 < a.length, F = !Array.isArray(S[0]);
          if (B && s) {
            for (var P = 0; P < a.length; P++)
              0 < P && (K += o), K += H(a[P], P);
            0 < S.length && (K += h);
          }
          for (var c = 0; c < S.length; c++) {
            var w = B ? a.length : S[c].length, k = !1, T = B ? Object.keys(S[c]).length === 0 : S[c].length === 0;
            if (j && !B && (k = j === "greedy" ? S[c].join("").trim() === "" : S[c].length === 1 && S[c][0].length === 0), j === "greedy" && B) {
              for (var _ = [], p = 0; p < w; p++) {
                var U = F ? a[p] : p;
                _.push(S[c][U]);
              }
              k = _.join("").trim() === "";
            }
            if (!k) {
              for (var f = 0; f < w; f++) {
                0 < f && !T && (K += o);
                var $ = B && F ? a[f] : f;
                K += H(S[c][$], f);
              }
              c < S.length - 1 && (!j || 0 < w && !T) && (K += h);
            }
          }
          return K;
        }
        function H(a, S) {
          if (a == null)
            return "";
          if (a.constructor === Date)
            return JSON.stringify(a).slice(1, 25);
          M === !0 && typeof a == "string" && a.match(/^[=+\-@].*$/) !== null && (a = "'" + a);
          var j = a.toString().replace(d, q), K = typeof r == "boolean" && r || typeof r == "function" && r(a, S) || Array.isArray(r) && r[S] || function(B, F) {
            for (var P = 0; P < F.length; P++)
              if (-1 < B.indexOf(F[P]))
                return !0;
            return !1;
          }(j, n.BAD_DELIMITERS) || -1 < j.indexOf(o) || j.charAt(0) === " " || j.charAt(j.length - 1) === " ";
          return K ? g + j + g : j;
        }
      } };
      if (n.RECORD_SEP = String.fromCharCode(30), n.UNIT_SEP = String.fromCharCode(31), n.BYTE_ORDER_MARK = "\uFEFF", n.BAD_DELIMITERS = ["\r", `
`, '"', n.BYTE_ORDER_MARK], n.WORKERS_SUPPORTED = !O && !!i.Worker, n.NODE_STREAM_INPUT = 1, n.LocalChunkSize = 10485760, n.RemoteChunkSize = 5242880, n.DefaultDelimiter = ",", n.Parser = W, n.ParserHandle = L, n.NetworkStreamer = N, n.FileStreamer = x, n.StringStreamer = D, n.ReadableStreamStreamer = ee, i.jQuery) {
        var E = i.jQuery;
        E.fn.parse = function(t) {
          var e = t.config || {}, r = [];
          return this.each(function(h) {
            if (!(E(this).prop("tagName").toUpperCase() === "INPUT" && E(this).attr("type").toLowerCase() === "file" && i.FileReader) || !this.files || this.files.length === 0)
              return !0;
            for (var g = 0; g < this.files.length; g++)
              r.push({ file: this.files[g], inputElem: this, instanceConfig: E.extend({}, e) });
          }), s(), this;
          function s() {
            if (r.length !== 0) {
              var h, g, q, C, l = r[0];
              if (b(t.before)) {
                var M = t.before(l.file, l.inputElem);
                if (typeof M == "object") {
                  if (M.action === "abort")
                    return h = "AbortError", g = l.file, q = l.inputElem, C = M.reason, void (b(t.error) && t.error({ name: h }, g, q, C));
                  if (M.action === "skip")
                    return void o();
                  typeof M.config == "object" && (l.instanceConfig = E.extend(l.instanceConfig, M.config));
                } else if (M === "skip")
                  return void o();
              }
              var d = l.instanceConfig.complete;
              l.instanceConfig.complete = function(re) {
                b(d) && d(re, l.file, l.inputElem), o();
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
          var r = Q(e);
          r.chunkSize = parseInt(r.chunkSize), e.step || e.chunk || (r.chunkSize = null), this._handle = new L(r), (this._handle.streamer = this)._config = r;
        }.call(this, t), this.parseChunk = function(e, r) {
          if (this.isFirstChunk && b(this._config.beforeFirstChunk)) {
            var s = this._config.beforeFirstChunk(e);
            s !== void 0 && (e = s);
          }
          this.isFirstChunk = !1, this._halted = !1;
          var o = this._partialLine + e;
          this._partialLine = "";
          var h = this._handle.parse(o, this._baseIndex, !this._finished);
          if (!this._handle.paused() && !this._handle.aborted()) {
            var g = h.meta.cursor;
            this._finished || (this._partialLine = o.substring(g - this._baseIndex), this._baseIndex = g), h && h.data && (this._rowCount += h.data.length);
            var q = this._finished || this._config.preview && this._rowCount >= this._config.preview;
            if (A)
              i.postMessage({ results: h, workerId: n.WORKER_ID, finished: q });
            else if (b(this._config.chunk) && !r) {
              if (this._config.chunk(h, this._handle), this._handle.paused() || this._handle.aborted())
                return void (this._halted = !0);
              h = void 0, this._completeResults = void 0;
            }
            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(h.data), this._completeResults.errors = this._completeResults.errors.concat(h.errors), this._completeResults.meta = h.meta), this._completed || !q || !b(this._config.complete) || h && h.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), q || h && h.meta.paused || this._nextChunk(), h;
          }
          this._halted = !0;
        }, this._sendError = function(e) {
          b(this._config.error) ? this._config.error(e) : A && this._config.error && i.postMessage({ workerId: n.WORKER_ID, error: e, finished: !1 });
        };
      }
      function N(t) {
        var e;
        (t = t || {}).chunkSize || (t.chunkSize = n.RemoteChunkSize), y.call(this, t), this._nextChunk = O ? function() {
          this._readChunk(), this._chunkLoaded();
        } : function() {
          this._readChunk();
        }, this.stream = function(r) {
          this._input = r, this._nextChunk();
        }, this._readChunk = function() {
          if (this._finished)
            this._chunkLoaded();
          else {
            if (e = new XMLHttpRequest(), this._config.withCredentials && (e.withCredentials = this._config.withCredentials), O || (e.onload = Z(this._chunkLoaded, this), e.onerror = Z(this._chunkError, this)), e.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !O), this._config.downloadRequestHeaders) {
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
            } catch (h) {
              this._chunkError(h.message);
            }
            O && e.status === 0 && this._chunkError();
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
      function x(t) {
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
            var h = Math.min(this._start + this._config.chunkSize, this._input.size);
            o = r.call(o, this._start, h);
          }
          var g = e.readAsText(o, this._config.encoding);
          s || this._chunkLoaded({ target: { result: g } });
        }, this._chunkLoaded = function(o) {
          this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(o.target.result);
        }, this._chunkError = function() {
          this._sendError(e.error);
        };
      }
      function D(t) {
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
      function ee(t) {
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
          } catch (h) {
            this._streamError(h);
          }
        }, this), this._streamError = Z(function(o) {
          this._streamCleanUp(), this._sendError(o);
        }, this), this._streamEnd = Z(function() {
          this._streamCleanUp(), s = !0, this._streamData("");
        }, this), this._streamCleanUp = Z(function() {
          this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
      }
      function L(t) {
        var e, r, s, o = Math.pow(2, 53), h = -o, g = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, q = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/, C = this, l = 0, M = 0, d = !1, re = !1, H = [], a = { data: [], errors: [], meta: {} };
        if (b(t.step)) {
          var S = t.step;
          t.step = function(c) {
            if (a = c, B())
              K();
            else {
              if (K(), a.data.length === 0)
                return;
              l += c.data.length, t.preview && l > t.preview ? r.abort() : (a.data = a.data[0], S(a, C));
            }
          };
        }
        function j(c) {
          return t.skipEmptyLines === "greedy" ? c.join("").trim() === "" : c.length === 1 && c[0].length === 0;
        }
        function K() {
          if (a && s && (P("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + n.DefaultDelimiter + "'"), s = !1), t.skipEmptyLines)
            for (var c = 0; c < a.data.length; c++)
              j(a.data[c]) && a.data.splice(c--, 1);
          return B() && function() {
            if (!a)
              return;
            function w(T, _) {
              b(t.transformHeader) && (T = t.transformHeader(T, _)), H.push(T);
            }
            if (Array.isArray(a.data[0])) {
              for (var k = 0; B() && k < a.data.length; k++)
                a.data[k].forEach(w);
              a.data.splice(0, 1);
            } else
              a.data.forEach(w);
          }(), function() {
            if (!a || !t.header && !t.dynamicTyping && !t.transform)
              return a;
            function w(T, _) {
              var p, U = t.header ? {} : [];
              for (p = 0; p < T.length; p++) {
                var f = p, $ = T[p];
                t.header && (f = p >= H.length ? "__parsed_extra" : H[p]), t.transform && ($ = t.transform($, f)), $ = F(f, $), f === "__parsed_extra" ? (U[f] = U[f] || [], U[f].push($)) : U[f] = $;
              }
              return t.header && (p > H.length ? P("FieldMismatch", "TooManyFields", "Too many fields: expected " + H.length + " fields but parsed " + p, M + _) : p < H.length && P("FieldMismatch", "TooFewFields", "Too few fields: expected " + H.length + " fields but parsed " + p, M + _)), U;
            }
            var k = 1;
            return !a.data.length || Array.isArray(a.data[0]) ? (a.data = a.data.map(w), k = a.data.length) : a.data = w(a.data, 0), t.header && a.meta && (a.meta.fields = H), M += k, a;
          }();
        }
        function B() {
          return t.header && H.length === 0;
        }
        function F(c, w) {
          return k = c, t.dynamicTypingFunction && t.dynamicTyping[k] === void 0 && (t.dynamicTyping[k] = t.dynamicTypingFunction(k)), (t.dynamicTyping[k] || t.dynamicTyping) === !0 ? w === "true" || w === "TRUE" || w !== "false" && w !== "FALSE" && (function(T) {
            if (g.test(T)) {
              var _ = parseFloat(T);
              if (h < _ && _ < o)
                return !0;
            }
            return !1;
          }(w) ? parseFloat(w) : q.test(w) ? new Date(w) : w === "" ? null : w) : w;
          var k;
        }
        function P(c, w, k, T) {
          var _ = { type: c, code: w, message: k };
          T !== void 0 && (_.row = T), a.errors.push(_);
        }
        this.parse = function(c, w, k) {
          var T = t.quoteChar || '"';
          if (t.newline || (t.newline = function(U, f) {
            U = U.substring(0, 1048576);
            var $ = new RegExp(m(f) + "([^]*?)" + m(f), "gm"), te = (U = U.replace($, "")).split("\r"), Y = U.split(`
`), se = 1 < Y.length && Y[0].length < te[0].length;
            if (te.length === 1 || se)
              return `
`;
            for (var ne = 0, V = 0; V < te.length; V++)
              te[V][0] === `
` && ne++;
            return ne >= te.length / 2 ? `\r
` : "\r";
          }(c, T)), s = !1, t.delimiter)
            b(t.delimiter) && (t.delimiter = t.delimiter(c), a.meta.delimiter = t.delimiter);
          else {
            var _ = function(U, f, $, te, Y) {
              var se, ne, V, J;
              Y = Y || [",", "	", "|", ";", n.RECORD_SEP, n.UNIT_SEP];
              for (var ae = 0; ae < Y.length; ae++) {
                var X = Y[ae], oe = 0, ie = 0, _e = 0;
                V = void 0;
                for (var le = new W({ comments: te, delimiter: X, newline: f, preview: 10 }).parse(U), ce = 0; ce < le.data.length; ce++)
                  if ($ && j(le.data[ce]))
                    _e++;
                  else {
                    var ue = le.data[ce].length;
                    ie += ue, V !== void 0 ? 0 < ue && (oe += Math.abs(ue - V), V = ue) : V = ue;
                  }
                0 < le.data.length && (ie /= le.data.length - _e), (ne === void 0 || oe <= ne) && (J === void 0 || J < ie) && 1.99 < ie && (ne = oe, se = X, J = ie);
              }
              return { successful: !!(t.delimiter = se), bestDelimiter: se };
            }(c, t.newline, t.skipEmptyLines, t.comments, t.delimitersToGuess);
            _.successful ? t.delimiter = _.bestDelimiter : (s = !0, t.delimiter = n.DefaultDelimiter), a.meta.delimiter = t.delimiter;
          }
          var p = Q(t);
          return t.preview && t.header && p.preview++, e = c, r = new W(p), a = r.parse(e, w, k), K(), d ? { meta: { paused: !0 } } : a || { meta: { paused: !1 } };
        }, this.paused = function() {
          return d;
        }, this.pause = function() {
          d = !0, r.abort(), e = b(t.chunk) ? "" : e.substring(r.getCharIndex());
        }, this.resume = function() {
          C.streamer._halted ? (d = !1, C.streamer.parseChunk(e, !0)) : setTimeout(C.resume, 3);
        }, this.aborted = function() {
          return re;
        }, this.abort = function() {
          re = !0, r.abort(), a.meta.aborted = !0, b(t.complete) && t.complete(a), e = "";
        };
      }
      function m(t) {
        return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function W(t) {
        var e, r = (t = t || {}).delimiter, s = t.newline, o = t.comments, h = t.step, g = t.preview, q = t.fastMode, C = e = t.quoteChar === void 0 ? '"' : t.quoteChar;
        if (t.escapeChar !== void 0 && (C = t.escapeChar), (typeof r != "string" || -1 < n.BAD_DELIMITERS.indexOf(r)) && (r = ","), o === r)
          throw new Error("Comment character same as delimiter");
        o === !0 ? o = "#" : (typeof o != "string" || -1 < n.BAD_DELIMITERS.indexOf(o)) && (o = !1), s !== `
` && s !== "\r" && s !== `\r
` && (s = `
`);
        var l = 0, M = !1;
        this.parse = function(d, re, H) {
          if (typeof d != "string")
            throw new Error("Input must be a string");
          var a = d.length, S = r.length, j = s.length, K = o.length, B = b(h), F = [], P = [], c = [], w = l = 0;
          if (!d)
            return J();
          if (q || q !== !1 && d.indexOf(e) === -1) {
            for (var k = d.split(s), T = 0; T < k.length; T++) {
              if (c = k[T], l += c.length, T !== k.length - 1)
                l += s.length;
              else if (H)
                return J();
              if (!o || c.substring(0, K) !== o) {
                if (B) {
                  if (F = [], Y(c.split(r)), ae(), M)
                    return J();
                } else
                  Y(c.split(r));
                if (g && g <= T)
                  return F = F.slice(0, g), J(!0);
              }
            }
            return J();
          }
          for (var _ = d.indexOf(r, l), p = d.indexOf(s, l), U = new RegExp(m(C) + m(e), "g"), f = d.indexOf(e, l); ; )
            if (d[l] !== e)
              if (o && c.length === 0 && d.substring(l, l + K) === o) {
                if (p === -1)
                  return J();
                l = p + j, p = d.indexOf(s, l), _ = d.indexOf(r, l);
              } else if (_ !== -1 && (_ < p || p === -1))
                c.push(d.substring(l, _)), l = _ + S, _ = d.indexOf(r, l);
              else {
                if (p === -1)
                  break;
                if (c.push(d.substring(l, p)), V(p + j), B && (ae(), M))
                  return J();
                if (g && F.length >= g)
                  return J(!0);
              }
            else
              for (f = l, l++; ; ) {
                if ((f = d.indexOf(e, f + 1)) === -1)
                  return H || P.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: F.length, index: l }), ne();
                if (f === a - 1)
                  return ne(d.substring(l, f).replace(U, e));
                if (e !== C || d[f + 1] !== C) {
                  if (e === C || f === 0 || d[f - 1] !== C) {
                    _ !== -1 && _ < f + 1 && (_ = d.indexOf(r, f + 1)), p !== -1 && p < f + 1 && (p = d.indexOf(s, f + 1));
                    var $ = se(p === -1 ? _ : Math.min(_, p));
                    if (d[f + 1 + $] === r) {
                      c.push(d.substring(l, f).replace(U, e)), d[l = f + 1 + $ + S] !== e && (f = d.indexOf(e, l)), _ = d.indexOf(r, l), p = d.indexOf(s, l);
                      break;
                    }
                    var te = se(p);
                    if (d.substring(f + 1 + te, f + 1 + te + j) === s) {
                      if (c.push(d.substring(l, f).replace(U, e)), V(f + 1 + te + j), _ = d.indexOf(r, l), f = d.indexOf(e, l), B && (ae(), M))
                        return J();
                      if (g && F.length >= g)
                        return J(!0);
                      break;
                    }
                    P.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: F.length, index: l }), f++;
                  }
                } else
                  f++;
              }
          return ne();
          function Y(X) {
            F.push(X), w = l;
          }
          function se(X) {
            var oe = 0;
            if (X !== -1) {
              var ie = d.substring(f + 1, X);
              ie && ie.trim() === "" && (oe = ie.length);
            }
            return oe;
          }
          function ne(X) {
            return H || (X === void 0 && (X = d.substring(l)), c.push(X), l = a, Y(c), B && ae()), J();
          }
          function V(X) {
            l = X, Y(c), c = [], p = d.indexOf(s, l);
          }
          function J(X) {
            return { data: F, errors: P, meta: { delimiter: r, linebreak: s, aborted: M, truncated: !!X, cursor: w + (re || 0) } };
          }
          function ae() {
            h(J()), F = [], P = [];
          }
        }, this.abort = function() {
          M = !0;
        }, this.getCharIndex = function() {
          return l;
        };
      }
      function R(t) {
        var e = t.data, r = z[e.workerId], s = !1;
        if (e.error)
          r.userError(e.error, e.file);
        else if (e.results && e.results.data) {
          var o = { abort: function() {
            s = !0, G(e.workerId, { data: [], errors: [], meta: { aborted: !0 } });
          }, pause: v, resume: v };
          if (b(r.userStep)) {
            for (var h = 0; h < e.results.data.length && (r.userStep({ data: e.results.data[h], errors: e.results.errors, meta: e.results.meta }, o), !s); h++)
              ;
            delete e.results;
          } else
            b(r.userChunk) && (r.userChunk(e.results, o, e.file), delete e.results);
        }
        e.finished && !s && G(e.workerId, e.results);
      }
      function G(t, e) {
        var r = z[t];
        b(r.userComplete) && r.userComplete(e), r.terminate(), delete z[t];
      }
      function v() {
        throw new Error("Not implemented.");
      }
      function Q(t) {
        if (typeof t != "object" || t === null)
          return t;
        var e = Array.isArray(t) ? [] : {};
        for (var r in t)
          e[r] = Q(t[r]);
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
      return A && (i.onmessage = function(t) {
        var e = t.data;
        if (n.WORKER_ID === void 0 && e && (n.WORKER_ID = e.workerId), typeof e.input == "string")
          i.postMessage({ workerId: n.WORKER_ID, results: n.parse(e.input, e.config), finished: !0 });
        else if (i.File && e.input instanceof File || e.input instanceof Object) {
          var r = n.parse(e.input, e.config);
          r && i.postMessage({ workerId: n.WORKER_ID, results: r, finished: !0 });
        }
      }), (N.prototype = Object.create(y.prototype)).constructor = N, (x.prototype = Object.create(y.prototype)).constructor = x, (D.prototype = Object.create(D.prototype)).constructor = D, (ee.prototype = Object.create(y.prototype)).constructor = ee, n;
    });
  });

  // src/bench/websocket.ts
  async function ve(u, i, O) {
    let A = new WebSocket(u);
    if (!A)
      throw new Error("server didn't accept ws");
    return A.addEventListener("open", () => {
      console.log("Opened websocket"), O();
    }), A.addEventListener("message", ({ data: z }) => {
      let { count: I, tz: n, error: E, name: y, duration: N, endTime: x } = JSON.parse(z);
      if (y && N && x) {
        let D = x - N, ee = { name: y, duration: N, startTime: D, entryType: "server", endTime: x };
        console.info(ee), i.push(ee);
      } else
        E ? console.error(E) : console.info({ count: I, tz: n, error: E });
    }), A.addEventListener("close", () => {
      console.log("Closed websocket");
    }), A;
  }

  // src/bench/observers.ts
  function ke(u) {
    let i = new PerformanceObserver((z) => {
      z.getEntries().forEach((I) => {
        let { startTime: n, duration: E, name: y, entryType: N } = I;
        n = Math.floor(n), E = Math.floor(E);
        let x = n + E, D = { name: y, endTime: x, startTime: n, duration: E, entryType: N };
        console.log(D), u.push(D);
      });
    }), O = new PerformanceObserver((z) => {
      z.getEntriesByType("resource").forEach((I) => {
        let { startTime: n, duration: E, name: y, entryType: N, responseStart: x, responseEnd: D, serverTiming: ee } = I;
        y.includes("mitm") || y.includes("favicon") || (n = Math.floor(n), E = Math.floor(E), D = Math.floor(D), x = Math.floor(x), /^https?:\/\//.test(y) && (y = String(y.split("/").pop())), ee.forEach((L) => {
          let { name: m, duration: W, description: R } = L, G = Number(R.replace("endtime:", "")), v = G - W;
          console.log({ name: m, duration: W, startTime: v, entryType: "server", endTime: G });
        }), u = u.concat([
          {
            name: "download:request_sent",
            startTime: n,
            duration: 0,
            endTime: n,
            entryType: "mark"
          },
          {
            name: "download:response_start",
            startTime: n,
            duration: x - n,
            endTime: x,
            entryType: "resource"
          },
          {
            name: "download:response_complete",
            startTime: x - n,
            duration: D - x,
            endTime: D,
            entryType: "resource"
          }
        ]), console.log(I.toJSON()));
      });
    });
    return { ro: O, po: i, listEntries: () => {
      let z = u.sort((I, n) => I.endTime - n.endTime).reduce((I, n) => {
        let { name: E, endTime: y, startTime: N, duration: x, entryType: D } = n;
        return I[E] = { endTime: y, startTime: N, duration: x, entryType: D }, I;
      }, {});
      window.requestIdleCallback(() => {
        console.table(z), i && i.disconnect(), O && O.disconnect();
      });
    } };
  }

  // src/bench/download.ts
  var pe = we(Ee());
  function me(u, i = "file.txt", O) {
    let A = !1;
    console.log({ url: u }), performance.mark("download:start");
    let z = !1;
    pe.default.mitm = `${location.origin}/mitm.html`;
    let I = pe.default.createWriteStream(i);
    return window.onunload = () => {
      I.abort();
    }, window.onbeforeunload = (n) => {
      z || (n.returnValue = "Are you sure you want to leave?");
    }, fetch(u, {
      headers: {
        TE: "trailers",
        startTime: String(performance.now()),
        started_at: String(Math.floor(Date.now() - performance.now())),
        "cache-control": "no-cache, no-store, max-age=1, s-maxage=1"
      }
    }).then((n) => !n.body || !n.ok ? Promise.reject(new Error(n.statusText)) : n.body.pipeTo(I)).then(() => {
      z = !0, performance.mark("download:tear_down"), requestIdleCallback(() => {
        O();
      });
    });
  }

  // src/bench/papaXHR.ts
  var je = we(Se());

  // src/xhr.ts
  var Te = [], { po: Ae, ro: De, listEntries: Ue } = ke(Te);
  globalThis.connect = (u) => {
    let i = new URL(window.location.origin);
    i.protocol = "wss", i.pathname = "/csv/ws", globalThis.ws = ve(i, Te, u);
  };
  globalThis.connect(() => {
    Ae.observe({ entryTypes: ["mark", "measure"] }), De.observe({ entryTypes: ["resource"] }), requestIdleCallback(() => {
      let u = location.hash.replace("#", "") || "fetch.json";
      console.log(u), me(`/csv/${u}`, u, () => {
        Ue();
      });
    });
  });
})();
/* @license
Papa Parse
v5.3.1
https://github.com/mholt/PapaParse
License: MIT
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL3N0cmVhbXNhdmVyL1N0cmVhbVNhdmVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wYXBhcGFyc2UvcGFwYXBhcnNlLm1pbi5qcyIsICIuLi9zcmMvYmVuY2gvd2Vic29ja2V0LnRzIiwgIi4uL3NyYy9iZW5jaC9vYnNlcnZlcnMudHMiLCAiLi4vc3JjL2JlbmNoL2Rvd25sb2FkLnRzIiwgIi4uL3NyYy9iZW5jaC9wYXBhWEhSLnRzIiwgIi4uL3NyYy94aHIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qIGdsb2JhbCBjaHJvbWUgbG9jYXRpb24gUmVhZGFibGVTdHJlYW0gZGVmaW5lIE1lc3NhZ2VDaGFubmVsIFRyYW5zZm9ybVN0cmVhbSAqL1xuXG47KChuYW1lLCBkZWZpbml0aW9uKSA9PiB7XG4gIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnXG4gICAgPyBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKVxuICAgIDogdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCdcbiAgICAgID8gZGVmaW5lKGRlZmluaXRpb24pXG4gICAgICA6IHRoaXNbbmFtZV0gPSBkZWZpbml0aW9uKClcbn0pKCdzdHJlYW1TYXZlcicsICgpID0+IHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgY29uc3QgZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgPyB3aW5kb3cgOiB0aGlzXG4gIGlmICghZ2xvYmFsLkhUTUxFbGVtZW50KSBjb25zb2xlLndhcm4oJ3N0cmVhbXNhdmVyIGlzIG1lYW50IHRvIHJ1biBvbiBicm93c2VycyBtYWluIHRocmVhZCcpXG5cbiAgbGV0IG1pdG1UcmFuc3BvcnRlciA9IG51bGxcbiAgbGV0IHN1cHBvcnRzVHJhbnNmZXJhYmxlID0gZmFsc2VcbiAgY29uc3QgdGVzdCA9IGZuID0+IHsgdHJ5IHsgZm4oKSB9IGNhdGNoIChlKSB7fSB9XG4gIGNvbnN0IHBvbnlmaWxsID0gZ2xvYmFsLldlYlN0cmVhbXNQb2x5ZmlsbCB8fCB7fVxuICBjb25zdCBpc1NlY3VyZUNvbnRleHQgPSBnbG9iYWwuaXNTZWN1cmVDb250ZXh0XG4gIC8vIFRPRE86IE11c3QgY29tZSB1cCB3aXRoIGEgcmVhbCBkZXRlY3Rpb24gdGVzdCAoIzY5KVxuICBsZXQgdXNlQmxvYkZhbGxiYWNrID0gL2NvbnN0cnVjdG9yL2kudGVzdChnbG9iYWwuSFRNTEVsZW1lbnQpIHx8ICEhZ2xvYmFsLnNhZmFyaSB8fCAhIWdsb2JhbC5XZWJLaXRQb2ludFxuICBjb25zdCBkb3dubG9hZFN0cmF0ZWd5ID0gaXNTZWN1cmVDb250ZXh0IHx8ICdNb3pBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGVcbiAgICA/ICdpZnJhbWUnXG4gICAgOiAnbmF2aWdhdGUnXG5cbiAgY29uc3Qgc3RyZWFtU2F2ZXIgPSB7XG4gICAgY3JlYXRlV3JpdGVTdHJlYW0sXG4gICAgV3JpdGFibGVTdHJlYW06IGdsb2JhbC5Xcml0YWJsZVN0cmVhbSB8fCBwb255ZmlsbC5Xcml0YWJsZVN0cmVhbSxcbiAgICBzdXBwb3J0ZWQ6IHRydWUsXG4gICAgdmVyc2lvbjogeyBmdWxsOiAnMi4wLjUnLCBtYWpvcjogMiwgbWlub3I6IDAsIGRvdDogNSB9LFxuICAgIG1pdG06ICdodHRwczovL2ppbW15d2FydGluZy5naXRodWIuaW8vU3RyZWFtU2F2ZXIuanMvbWl0bS5odG1sP3ZlcnNpb249Mi4wLjAnXG4gIH1cblxuICAvKipcbiAgICogY3JlYXRlIGEgaGlkZGVuIGlmcmFtZSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBET00gKGJvZHkpXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gc3JjIHBhZ2UgdG8gbG9hZFxuICAgKiBAcmV0dXJuIHtIVE1MSUZyYW1lRWxlbWVudH0gcGFnZSB0byBsb2FkXG4gICAqL1xuICBmdW5jdGlvbiBtYWtlSWZyYW1lIChzcmMpIHtcbiAgICBpZiAoIXNyYykgdGhyb3cgbmV3IEVycm9yKCdtZWgnKVxuICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpXG4gICAgaWZyYW1lLmhpZGRlbiA9IHRydWVcbiAgICBpZnJhbWUuc3JjID0gc3JjXG4gICAgaWZyYW1lLmxvYWRlZCA9IGZhbHNlXG4gICAgaWZyYW1lLm5hbWUgPSAnaWZyYW1lJ1xuICAgIGlmcmFtZS5pc0lmcmFtZSA9IHRydWVcbiAgICBpZnJhbWUucG9zdE1lc3NhZ2UgPSAoLi4uYXJncykgPT4gaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoLi4uYXJncylcbiAgICBpZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgIGlmcmFtZS5sb2FkZWQgPSB0cnVlXG4gICAgfSwgeyBvbmNlOiB0cnVlIH0pXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpXG4gICAgcmV0dXJuIGlmcmFtZVxuICB9XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHBvcHVwIHRoYXQgc2ltdWxhdGVzIHRoZSBiYXNpYyB0aGluZ3NcbiAgICogb2Ygd2hhdCBhIGlmcmFtZSBjYW4gZG9cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSBzcmMgcGFnZSB0byBsb2FkXG4gICAqIEByZXR1cm4ge29iamVjdH0gICAgIGlmcmFtZSBsaWtlIG9iamVjdFxuICAgKi9cbiAgZnVuY3Rpb24gbWFrZVBvcHVwIChzcmMpIHtcbiAgICBjb25zdCBvcHRpb25zID0gJ3dpZHRoPTIwMCxoZWlnaHQ9MTAwJ1xuICAgIGNvbnN0IGRlbGVnYXRlID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgY29uc3QgcG9wdXAgPSB7XG4gICAgICBmcmFtZTogZ2xvYmFsLm9wZW4oc3JjLCAncG9wdXAnLCBvcHRpb25zKSxcbiAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICBpc0lmcmFtZTogZmFsc2UsXG4gICAgICBpc1BvcHVwOiB0cnVlLFxuICAgICAgcmVtb3ZlICgpIHsgcG9wdXAuZnJhbWUuY2xvc2UoKSB9LFxuICAgICAgYWRkRXZlbnRMaXN0ZW5lciAoLi4uYXJncykgeyBkZWxlZ2F0ZS5hZGRFdmVudExpc3RlbmVyKC4uLmFyZ3MpIH0sXG4gICAgICBkaXNwYXRjaEV2ZW50ICguLi5hcmdzKSB7IGRlbGVnYXRlLmRpc3BhdGNoRXZlbnQoLi4uYXJncykgfSxcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIgKC4uLmFyZ3MpIHsgZGVsZWdhdGUucmVtb3ZlRXZlbnRMaXN0ZW5lciguLi5hcmdzKSB9LFxuICAgICAgcG9zdE1lc3NhZ2UgKC4uLmFyZ3MpIHsgcG9wdXAuZnJhbWUucG9zdE1lc3NhZ2UoLi4uYXJncykgfVxuICAgIH1cblxuICAgIGNvbnN0IG9uUmVhZHkgPSBldnQgPT4ge1xuICAgICAgaWYgKGV2dC5zb3VyY2UgPT09IHBvcHVwLmZyYW1lKSB7XG4gICAgICAgIHBvcHVwLmxvYWRlZCA9IHRydWVcbiAgICAgICAgZ2xvYmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvblJlYWR5KVxuICAgICAgICBwb3B1cC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9hZCcpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25SZWFkeSlcblxuICAgIHJldHVybiBwb3B1cFxuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBXZSBjYW4ndCBsb29rIGZvciBzZXJ2aWNlIHdvcmtlciBzaW5jZSBpdCBtYXkgc3RpbGwgd29yayBvbiBodHRwXG4gICAgbmV3IFJlc3BvbnNlKG5ldyBSZWFkYWJsZVN0cmVhbSgpKVxuICAgIGlmIChpc1NlY3VyZUNvbnRleHQgJiYgISgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSkge1xuICAgICAgdXNlQmxvYkZhbGxiYWNrID0gdHJ1ZVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdXNlQmxvYkZhbGxiYWNrID0gdHJ1ZVxuICB9XG5cbiAgdGVzdCgoKSA9PiB7XG4gICAgLy8gVHJhbnNmYXJpYWJsZSBzdHJlYW0gd2FzIGZpcnN0IGVuYWJsZWQgaW4gY2hyb21lIHY3MyBiZWhpbmQgYSBmbGFnXG4gICAgY29uc3QgeyByZWFkYWJsZSB9ID0gbmV3IFRyYW5zZm9ybVN0cmVhbSgpXG4gICAgY29uc3QgbWMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKVxuICAgIG1jLnBvcnQxLnBvc3RNZXNzYWdlKHJlYWRhYmxlLCBbcmVhZGFibGVdKVxuICAgIG1jLnBvcnQxLmNsb3NlKClcbiAgICBtYy5wb3J0Mi5jbG9zZSgpXG4gICAgc3VwcG9ydHNUcmFuc2ZlcmFibGUgPSB0cnVlXG4gICAgLy8gRnJlZXplIFRyYW5zZm9ybVN0cmVhbSBvYmplY3QgKGNhbiBvbmx5IHdvcmsgd2l0aCBuYXRpdmUpXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN0cmVhbVNhdmVyLCAnVHJhbnNmb3JtU3RyZWFtJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBUcmFuc2Zvcm1TdHJlYW1cbiAgICB9KVxuICB9KVxuXG4gIGZ1bmN0aW9uIGxvYWRUcmFuc3BvcnRlciAoKSB7XG4gICAgaWYgKCFtaXRtVHJhbnNwb3J0ZXIpIHtcbiAgICAgIG1pdG1UcmFuc3BvcnRlciA9IGlzU2VjdXJlQ29udGV4dFxuICAgICAgICA/IG1ha2VJZnJhbWUoc3RyZWFtU2F2ZXIubWl0bSlcbiAgICAgICAgOiBtYWtlUG9wdXAoc3RyZWFtU2F2ZXIubWl0bSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtICB7c3RyaW5nfSBmaWxlbmFtZSBmaWxlbmFtZSB0aGF0IHNob3VsZCBiZSB1c2VkXG4gICAqIEBwYXJhbSAge29iamVjdH0gb3B0aW9ucyAgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9IHNpemUgICAgIGRlcHJpY2F0ZWRcbiAgICogQHJldHVybiB7V3JpdGFibGVTdHJlYW08VWludDhBcnJheT59XG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVXcml0ZVN0cmVhbSAoZmlsZW5hbWUsIG9wdGlvbnMsIHNpemUpIHtcbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgIHNpemU6IG51bGwsXG4gICAgICBwYXRobmFtZTogbnVsbCxcbiAgICAgIHdyaXRhYmxlU3RyYXRlZ3k6IHVuZGVmaW5lZCxcbiAgICAgIHJlYWRhYmxlU3RyYXRlZ3k6IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGxldCBieXRlc1dyaXR0ZW4gPSAwIC8vIGJ5IFN0cmVhbVNhdmVyLmpzIChub3QgdGhlIHNlcnZpY2Ugd29ya2VyKVxuICAgIGxldCBkb3dubG9hZFVybCA9IG51bGxcbiAgICBsZXQgY2hhbm5lbCA9IG51bGxcbiAgICBsZXQgdHMgPSBudWxsXG5cbiAgICAvLyBub3JtYWxpemUgYXJndW1lbnRzXG4gICAgaWYgKE51bWJlci5pc0Zpbml0ZShvcHRpb25zKSkge1xuICAgICAgWyBzaXplLCBvcHRpb25zIF0gPSBbIG9wdGlvbnMsIHNpemUgXVxuICAgICAgY29uc29sZS53YXJuKCdbU3RyZWFtU2F2ZXJdIERlcHJpY2F0ZWQgcGFzcyBhbiBvYmplY3QgYXMgMm5kIGFyZ3VtZW50IHdoZW4gY3JlYXRpbmcgYSB3cml0ZSBzdHJlYW0nKVxuICAgICAgb3B0cy5zaXplID0gc2l6ZVxuICAgICAgb3B0cy53cml0YWJsZVN0cmF0ZWd5ID0gb3B0aW9uc1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmhpZ2hXYXRlck1hcmspIHtcbiAgICAgIGNvbnNvbGUud2FybignW1N0cmVhbVNhdmVyXSBEZXByaWNhdGVkIHBhc3MgYW4gb2JqZWN0IGFzIDJuZCBhcmd1bWVudCB3aGVuIGNyZWF0aW5nIGEgd3JpdGUgc3RyZWFtJylcbiAgICAgIG9wdHMuc2l6ZSA9IHNpemVcbiAgICAgIG9wdHMud3JpdGFibGVTdHJhdGVneSA9IG9wdGlvbnNcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0cyA9IG9wdGlvbnMgfHwge31cbiAgICB9XG4gICAgaWYgKCF1c2VCbG9iRmFsbGJhY2spIHtcbiAgICAgIGxvYWRUcmFuc3BvcnRlcigpXG5cbiAgICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKVxuXG4gICAgICAvLyBNYWtlIGZpbGVuYW1lIFJGQzU5ODcgY29tcGF0aWJsZVxuICAgICAgZmlsZW5hbWUgPSBlbmNvZGVVUklDb21wb25lbnQoZmlsZW5hbWUucmVwbGFjZSgvXFwvL2csICc6JykpXG4gICAgICAgIC5yZXBsYWNlKC9bJygpXS9nLCBlc2NhcGUpXG4gICAgICAgIC5yZXBsYWNlKC9cXCovZywgJyUyQScpXG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICB0cmFuc2ZlcnJpbmdSZWFkYWJsZTogc3VwcG9ydHNUcmFuc2ZlcmFibGUsXG4gICAgICAgIHBhdGhuYW1lOiBvcHRzLnBhdGhuYW1lIHx8IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zbGljZSgtNikgKyAnLycgKyBmaWxlbmFtZSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAnQ29udGVudC1EaXNwb3NpdGlvbic6IFwiYXR0YWNobWVudDsgZmlsZW5hbWUqPVVURi04JydcIiArIGZpbGVuYW1lXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMuc2l6ZSkge1xuICAgICAgICByZXNwb25zZS5oZWFkZXJzWydDb250ZW50LUxlbmd0aCddID0gb3B0cy5zaXplXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFyZ3MgPSBbIHJlc3BvbnNlLCAnKicsIFsgY2hhbm5lbC5wb3J0MiBdIF1cblxuICAgICAgaWYgKHN1cHBvcnRzVHJhbnNmZXJhYmxlKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVyID0gZG93bmxvYWRTdHJhdGVneSA9PT0gJ2lmcmFtZScgPyB1bmRlZmluZWQgOiB7XG4gICAgICAgICAgLy8gVGhpcyB0cmFuc2Zvcm1lciAmIGZsdXNoIG1ldGhvZCBpcyBvbmx5IHVzZWQgYnkgaW5zZWN1cmUgY29udGV4dC5cbiAgICAgICAgICB0cmFuc2Zvcm0gKGNodW5rLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICBpZiAoIShjaHVuayBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbiBvbmx5IHdpcnRlIFVpbnQ4QXJyYXlzJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ5dGVzV3JpdHRlbiArPSBjaHVuay5sZW5ndGhcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShjaHVuaylcblxuICAgICAgICAgICAgaWYgKGRvd25sb2FkVXJsKSB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBkb3dubG9hZFVybFxuICAgICAgICAgICAgICBkb3dubG9hZFVybCA9IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZsdXNoICgpIHtcbiAgICAgICAgICAgIGlmIChkb3dubG9hZFVybCkge1xuICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gZG93bmxvYWRVcmxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHMgPSBuZXcgc3RyZWFtU2F2ZXIuVHJhbnNmb3JtU3RyZWFtKFxuICAgICAgICAgIHRyYW5zZm9ybWVyLFxuICAgICAgICAgIG9wdHMud3JpdGFibGVTdHJhdGVneSxcbiAgICAgICAgICBvcHRzLnJlYWRhYmxlU3RyYXRlZ3lcbiAgICAgICAgKVxuICAgICAgICBjb25zdCByZWFkYWJsZVN0cmVhbSA9IHRzLnJlYWRhYmxlXG5cbiAgICAgICAgY2hhbm5lbC5wb3J0MS5wb3N0TWVzc2FnZSh7IHJlYWRhYmxlU3RyZWFtIH0sIFsgcmVhZGFibGVTdHJlYW0gXSlcbiAgICAgIH1cblxuICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBldnQgPT4ge1xuICAgICAgICAvLyBTZXJ2aWNlIHdvcmtlciBzZW50IHVzIGEgbGluayB0aGF0IHdlIHNob3VsZCBvcGVuLlxuICAgICAgICBpZiAoZXZ0LmRhdGEuZG93bmxvYWQpIHtcbiAgICAgICAgICAvLyBTcGVjaWFsIHRyZWF0bWVudCBmb3IgcG9wdXAuLi5cbiAgICAgICAgICBpZiAoZG93bmxvYWRTdHJhdGVneSA9PT0gJ25hdmlnYXRlJykge1xuICAgICAgICAgICAgbWl0bVRyYW5zcG9ydGVyLnJlbW92ZSgpXG4gICAgICAgICAgICBtaXRtVHJhbnNwb3J0ZXIgPSBudWxsXG4gICAgICAgICAgICBpZiAoYnl0ZXNXcml0dGVuKSB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBldnQuZGF0YS5kb3dubG9hZFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZG93bmxvYWRVcmwgPSBldnQuZGF0YS5kb3dubG9hZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobWl0bVRyYW5zcG9ydGVyLmlzUG9wdXApIHtcbiAgICAgICAgICAgICAgbWl0bVRyYW5zcG9ydGVyLnJlbW92ZSgpXG4gICAgICAgICAgICAgIG1pdG1UcmFuc3BvcnRlciA9IG51bGxcbiAgICAgICAgICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBmaXJlZm94LCB0aGV5IGNhbiBrZWVwIHN3IGFsaXZlIHdpdGggZmV0Y2hcbiAgICAgICAgICAgICAgaWYgKGRvd25sb2FkU3RyYXRlZ3kgPT09ICdpZnJhbWUnKSB7XG4gICAgICAgICAgICAgICAgbWFrZUlmcmFtZShzdHJlYW1TYXZlci5taXRtKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdlIG5ldmVyIHJlbW92ZSB0aGlzIGlmcmFtZXMgYi9jIGl0IGNhbiBpbnRlcnJ1cHQgc2F2aW5nXG4gICAgICAgICAgICBtYWtlSWZyYW1lKGV2dC5kYXRhLmRvd25sb2FkKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWl0bVRyYW5zcG9ydGVyLmxvYWRlZCkge1xuICAgICAgICBtaXRtVHJhbnNwb3J0ZXIucG9zdE1lc3NhZ2UoLi4uYXJncylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1pdG1UcmFuc3BvcnRlci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgIG1pdG1UcmFuc3BvcnRlci5wb3N0TWVzc2FnZSguLi5hcmdzKVxuICAgICAgICB9LCB7IG9uY2U6IHRydWUgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY2h1bmtzID0gW11cblxuICAgIHJldHVybiAoIXVzZUJsb2JGYWxsYmFjayAmJiB0cyAmJiB0cy53cml0YWJsZSkgfHwgbmV3IHN0cmVhbVNhdmVyLldyaXRhYmxlU3RyZWFtKHtcbiAgICAgIHdyaXRlIChjaHVuaykge1xuICAgICAgICBpZiAoIShjaHVuayBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FuIG9ubHkgd2lydGUgVWludDhBcnJheXMnKVxuICAgICAgICB9XG4gICAgICAgIGlmICh1c2VCbG9iRmFsbGJhY2spIHtcbiAgICAgICAgICAvLyBTYWZhcmkuLi4gVGhlIG5ldyBJRTZcbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vamltbXl3YXJ0aW5nL1N0cmVhbVNhdmVyLmpzL2lzc3Vlcy82OVxuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gZXZlbiBkb2UgaXQgaGFzIGV2ZXJ5dGhpbmcgaXQgZmFpbHMgdG8gZG93bmxvYWQgYW55dGhpbmdcbiAgICAgICAgICAvLyB0aGF0IGNvbWVzIGZyb20gdGhlIHNlcnZpY2Ugd29ya2VyLi4hXG4gICAgICAgICAgY2h1bmtzLnB1c2goY2h1bmspXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBpcyBjYWxsZWQgd2hlbiBhIG5ldyBjaHVuayBvZiBkYXRhIGlzIHJlYWR5IHRvIGJlIHdyaXR0ZW5cbiAgICAgICAgLy8gdG8gdGhlIHVuZGVybHlpbmcgc2luay4gSXQgY2FuIHJldHVybiBhIHByb21pc2UgdG8gc2lnbmFsXG4gICAgICAgIC8vIHN1Y2Nlc3Mgb3IgZmFpbHVyZSBvZiB0aGUgd3JpdGUgb3BlcmF0aW9uLiBUaGUgc3RyZWFtXG4gICAgICAgIC8vIGltcGxlbWVudGF0aW9uIGd1YXJhbnRlZXMgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZFxuICAgICAgICAvLyBvbmx5IGFmdGVyIHByZXZpb3VzIHdyaXRlcyBoYXZlIHN1Y2NlZWRlZCwgYW5kIG5ldmVyIGFmdGVyXG4gICAgICAgIC8vIGNsb3NlIG9yIGFib3J0IGlzIGNhbGxlZC5cblxuICAgICAgICAvLyBUT0RPOiBLaW5kIG9mIGltcG9ydGFudCB0aGF0IHNlcnZpY2Ugd29ya2VyIHJlc3BvbmQgYmFjayB3aGVuXG4gICAgICAgIC8vIGl0IGhhcyBiZWVuIHdyaXR0ZW4uIE90aGVyd2lzZSB3ZSBjYW4ndCBoYW5kbGUgYmFja3ByZXNzdXJlXG4gICAgICAgIC8vIEVESVQ6IFRyYW5zZmFyYWJsZSBzdHJlYW1zIHNvbHZzIHRoaXMuLi5cbiAgICAgICAgY2hhbm5lbC5wb3J0MS5wb3N0TWVzc2FnZShjaHVuaylcbiAgICAgICAgYnl0ZXNXcml0dGVuICs9IGNodW5rLmxlbmd0aFxuXG4gICAgICAgIGlmIChkb3dubG9hZFVybCkge1xuICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBkb3dubG9hZFVybFxuICAgICAgICAgIGRvd25sb2FkVXJsID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2xvc2UgKCkge1xuICAgICAgICBpZiAodXNlQmxvYkZhbGxiYWNrKSB7XG4gICAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKGNodW5rcywgeyB0eXBlOiAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtOyBjaGFyc2V0PXV0Zi04JyB9KVxuICAgICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICAgICAgICBsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gICAgICAgICAgbGluay5kb3dubG9hZCA9IGZpbGVuYW1lXG4gICAgICAgICAgbGluay5jbGljaygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hhbm5lbC5wb3J0MS5wb3N0TWVzc2FnZSgnZW5kJylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFib3J0ICgpIHtcbiAgICAgICAgY2h1bmtzID0gW11cbiAgICAgICAgY2hhbm5lbC5wb3J0MS5wb3N0TWVzc2FnZSgnYWJvcnQnKVxuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IG51bGxcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5jbG9zZSgpXG4gICAgICAgIGNoYW5uZWwucG9ydDIuY2xvc2UoKVxuICAgICAgICBjaGFubmVsID0gbnVsbFxuICAgICAgfVxuICAgIH0sIG9wdHMud3JpdGFibGVTdHJhdGVneSlcbiAgfVxuXG4gIHJldHVybiBzdHJlYW1TYXZlclxufSlcbiIsICIvKiBAbGljZW5zZVxuUGFwYSBQYXJzZVxudjUuMy4xXG5odHRwczovL2dpdGh1Yi5jb20vbWhvbHQvUGFwYVBhcnNlXG5MaWNlbnNlOiBNSVRcbiovXG4hZnVuY3Rpb24oZSx0KXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLHQpOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPXQoKTplLlBhcGE9dCgpfSh0aGlzLGZ1bmN0aW9uIHMoKXtcInVzZSBzdHJpY3RcIjt2YXIgZj1cInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OnZvaWQgMCE9PWY/Zjp7fTt2YXIgbj0hZi5kb2N1bWVudCYmISFmLnBvc3RNZXNzYWdlLG89biYmL2Jsb2I6L2kudGVzdCgoZi5sb2NhdGlvbnx8e30pLnByb3RvY29sKSxhPXt9LGg9MCxiPXtwYXJzZTpmdW5jdGlvbihlLHQpe3ZhciBpPSh0PXR8fHt9KS5keW5hbWljVHlwaW5nfHwhMTtNKGkpJiYodC5keW5hbWljVHlwaW5nRnVuY3Rpb249aSxpPXt9KTtpZih0LmR5bmFtaWNUeXBpbmc9aSx0LnRyYW5zZm9ybT0hIU0odC50cmFuc2Zvcm0pJiZ0LnRyYW5zZm9ybSx0LndvcmtlciYmYi5XT1JLRVJTX1NVUFBPUlRFRCl7dmFyIHI9ZnVuY3Rpb24oKXtpZighYi5XT1JLRVJTX1NVUFBPUlRFRClyZXR1cm4hMTt2YXIgZT0oaT1mLlVSTHx8Zi53ZWJraXRVUkx8fG51bGwscj1zLnRvU3RyaW5nKCksYi5CTE9CX1VSTHx8KGIuQkxPQl9VUkw9aS5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW1wiKFwiLHIsXCIpKCk7XCJdLHt0eXBlOlwidGV4dC9qYXZhc2NyaXB0XCJ9KSkpKSx0PW5ldyBmLldvcmtlcihlKTt2YXIgaSxyO3JldHVybiB0Lm9ubWVzc2FnZT1fLHQuaWQ9aCsrLGFbdC5pZF09dH0oKTtyZXR1cm4gci51c2VyU3RlcD10LnN0ZXAsci51c2VyQ2h1bms9dC5jaHVuayxyLnVzZXJDb21wbGV0ZT10LmNvbXBsZXRlLHIudXNlckVycm9yPXQuZXJyb3IsdC5zdGVwPU0odC5zdGVwKSx0LmNodW5rPU0odC5jaHVuayksdC5jb21wbGV0ZT1NKHQuY29tcGxldGUpLHQuZXJyb3I9TSh0LmVycm9yKSxkZWxldGUgdC53b3JrZXIsdm9pZCByLnBvc3RNZXNzYWdlKHtpbnB1dDplLGNvbmZpZzp0LHdvcmtlcklkOnIuaWR9KX12YXIgbj1udWxsO2IuTk9ERV9TVFJFQU1fSU5QVVQsXCJzdHJpbmdcIj09dHlwZW9mIGU/bj10LmRvd25sb2FkP25ldyBsKHQpOm5ldyBwKHQpOiEwPT09ZS5yZWFkYWJsZSYmTShlLnJlYWQpJiZNKGUub24pP249bmV3IGcodCk6KGYuRmlsZSYmZSBpbnN0YW5jZW9mIEZpbGV8fGUgaW5zdGFuY2VvZiBPYmplY3QpJiYobj1uZXcgYyh0KSk7cmV0dXJuIG4uc3RyZWFtKGUpfSx1bnBhcnNlOmZ1bmN0aW9uKGUsdCl7dmFyIG49ITEsXz0hMCxtPVwiLFwiLHk9XCJcXHJcXG5cIixzPSdcIicsYT1zK3MsaT0hMSxyPW51bGwsbz0hMTshZnVuY3Rpb24oKXtpZihcIm9iamVjdFwiIT10eXBlb2YgdClyZXR1cm47XCJzdHJpbmdcIiE9dHlwZW9mIHQuZGVsaW1pdGVyfHxiLkJBRF9ERUxJTUlURVJTLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4tMSE9PXQuZGVsaW1pdGVyLmluZGV4T2YoZSl9KS5sZW5ndGh8fChtPXQuZGVsaW1pdGVyKTsoXCJib29sZWFuXCI9PXR5cGVvZiB0LnF1b3Rlc3x8XCJmdW5jdGlvblwiPT10eXBlb2YgdC5xdW90ZXN8fEFycmF5LmlzQXJyYXkodC5xdW90ZXMpKSYmKG49dC5xdW90ZXMpO1wiYm9vbGVhblwiIT10eXBlb2YgdC5za2lwRW1wdHlMaW5lcyYmXCJzdHJpbmdcIiE9dHlwZW9mIHQuc2tpcEVtcHR5TGluZXN8fChpPXQuc2tpcEVtcHR5TGluZXMpO1wic3RyaW5nXCI9PXR5cGVvZiB0Lm5ld2xpbmUmJih5PXQubmV3bGluZSk7XCJzdHJpbmdcIj09dHlwZW9mIHQucXVvdGVDaGFyJiYocz10LnF1b3RlQ2hhcik7XCJib29sZWFuXCI9PXR5cGVvZiB0LmhlYWRlciYmKF89dC5oZWFkZXIpO2lmKEFycmF5LmlzQXJyYXkodC5jb2x1bW5zKSl7aWYoMD09PXQuY29sdW1ucy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiT3B0aW9uIGNvbHVtbnMgaXMgZW1wdHlcIik7cj10LmNvbHVtbnN9dm9pZCAwIT09dC5lc2NhcGVDaGFyJiYoYT10LmVzY2FwZUNoYXIrcyk7XCJib29sZWFuXCI9PXR5cGVvZiB0LmVzY2FwZUZvcm11bGFlJiYobz10LmVzY2FwZUZvcm11bGFlKX0oKTt2YXIgaD1uZXcgUmVnRXhwKGoocyksXCJnXCIpO1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1KU09OLnBhcnNlKGUpKTtpZihBcnJheS5pc0FycmF5KGUpKXtpZighZS5sZW5ndGh8fEFycmF5LmlzQXJyYXkoZVswXSkpcmV0dXJuIHUobnVsbCxlLGkpO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBlWzBdKXJldHVybiB1KHJ8fE9iamVjdC5rZXlzKGVbMF0pLGUsaSl9ZWxzZSBpZihcIm9iamVjdFwiPT10eXBlb2YgZSlyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgZS5kYXRhJiYoZS5kYXRhPUpTT04ucGFyc2UoZS5kYXRhKSksQXJyYXkuaXNBcnJheShlLmRhdGEpJiYoZS5maWVsZHN8fChlLmZpZWxkcz1lLm1ldGEmJmUubWV0YS5maWVsZHMpLGUuZmllbGRzfHwoZS5maWVsZHM9QXJyYXkuaXNBcnJheShlLmRhdGFbMF0pP2UuZmllbGRzOlwib2JqZWN0XCI9PXR5cGVvZiBlLmRhdGFbMF0/T2JqZWN0LmtleXMoZS5kYXRhWzBdKTpbXSksQXJyYXkuaXNBcnJheShlLmRhdGFbMF0pfHxcIm9iamVjdFwiPT10eXBlb2YgZS5kYXRhWzBdfHwoZS5kYXRhPVtlLmRhdGFdKSksdShlLmZpZWxkc3x8W10sZS5kYXRhfHxbXSxpKTt0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gc2VyaWFsaXplIHVucmVjb2duaXplZCBpbnB1dFwiKTtmdW5jdGlvbiB1KGUsdCxpKXt2YXIgcj1cIlwiO1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1KU09OLnBhcnNlKGUpKSxcInN0cmluZ1wiPT10eXBlb2YgdCYmKHQ9SlNPTi5wYXJzZSh0KSk7dmFyIG49QXJyYXkuaXNBcnJheShlKSYmMDxlLmxlbmd0aCxzPSFBcnJheS5pc0FycmF5KHRbMF0pO2lmKG4mJl8pe2Zvcih2YXIgYT0wO2E8ZS5sZW5ndGg7YSsrKTA8YSYmKHIrPW0pLHIrPXYoZVthXSxhKTswPHQubGVuZ3RoJiYocis9eSl9Zm9yKHZhciBvPTA7bzx0Lmxlbmd0aDtvKyspe3ZhciBoPW4/ZS5sZW5ndGg6dFtvXS5sZW5ndGgsdT0hMSxmPW4/MD09PU9iamVjdC5rZXlzKHRbb10pLmxlbmd0aDowPT09dFtvXS5sZW5ndGg7aWYoaSYmIW4mJih1PVwiZ3JlZWR5XCI9PT1pP1wiXCI9PT10W29dLmpvaW4oXCJcIikudHJpbSgpOjE9PT10W29dLmxlbmd0aCYmMD09PXRbb11bMF0ubGVuZ3RoKSxcImdyZWVkeVwiPT09aSYmbil7Zm9yKHZhciBkPVtdLGw9MDtsPGg7bCsrKXt2YXIgYz1zP2VbbF06bDtkLnB1c2godFtvXVtjXSl9dT1cIlwiPT09ZC5qb2luKFwiXCIpLnRyaW0oKX1pZighdSl7Zm9yKHZhciBwPTA7cDxoO3ArKyl7MDxwJiYhZiYmKHIrPW0pO3ZhciBnPW4mJnM/ZVtwXTpwO3IrPXYodFtvXVtnXSxwKX1vPHQubGVuZ3RoLTEmJighaXx8MDxoJiYhZikmJihyKz15KX19cmV0dXJuIHJ9ZnVuY3Rpb24gdihlLHQpe2lmKG51bGw9PWUpcmV0dXJuXCJcIjtpZihlLmNvbnN0cnVjdG9yPT09RGF0ZSlyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSkuc2xpY2UoMSwyNSk7ITA9PT1vJiZcInN0cmluZ1wiPT10eXBlb2YgZSYmbnVsbCE9PWUubWF0Y2goL15bPStcXC1AXS4qJC8pJiYoZT1cIidcIitlKTt2YXIgaT1lLnRvU3RyaW5nKCkucmVwbGFjZShoLGEpLHI9XCJib29sZWFuXCI9PXR5cGVvZiBuJiZufHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiZuKGUsdCl8fEFycmF5LmlzQXJyYXkobikmJm5bdF18fGZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspaWYoLTE8ZS5pbmRleE9mKHRbaV0pKXJldHVybiEwO3JldHVybiExfShpLGIuQkFEX0RFTElNSVRFUlMpfHwtMTxpLmluZGV4T2YobSl8fFwiIFwiPT09aS5jaGFyQXQoMCl8fFwiIFwiPT09aS5jaGFyQXQoaS5sZW5ndGgtMSk7cmV0dXJuIHI/cytpK3M6aX19fTtpZihiLlJFQ09SRF9TRVA9U3RyaW5nLmZyb21DaGFyQ29kZSgzMCksYi5VTklUX1NFUD1TdHJpbmcuZnJvbUNoYXJDb2RlKDMxKSxiLkJZVEVfT1JERVJfTUFSSz1cIlxcdWZlZmZcIixiLkJBRF9ERUxJTUlURVJTPVtcIlxcclwiLFwiXFxuXCIsJ1wiJyxiLkJZVEVfT1JERVJfTUFSS10sYi5XT1JLRVJTX1NVUFBPUlRFRD0hbiYmISFmLldvcmtlcixiLk5PREVfU1RSRUFNX0lOUFVUPTEsYi5Mb2NhbENodW5rU2l6ZT0xMDQ4NTc2MCxiLlJlbW90ZUNodW5rU2l6ZT01MjQyODgwLGIuRGVmYXVsdERlbGltaXRlcj1cIixcIixiLlBhcnNlcj1FLGIuUGFyc2VySGFuZGxlPWksYi5OZXR3b3JrU3RyZWFtZXI9bCxiLkZpbGVTdHJlYW1lcj1jLGIuU3RyaW5nU3RyZWFtZXI9cCxiLlJlYWRhYmxlU3RyZWFtU3RyZWFtZXI9ZyxmLmpRdWVyeSl7dmFyIGQ9Zi5qUXVlcnk7ZC5mbi5wYXJzZT1mdW5jdGlvbihvKXt2YXIgaT1vLmNvbmZpZ3x8e30saD1bXTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGUpe2lmKCEoXCJJTlBVVFwiPT09ZCh0aGlzKS5wcm9wKFwidGFnTmFtZVwiKS50b1VwcGVyQ2FzZSgpJiZcImZpbGVcIj09PWQodGhpcykuYXR0cihcInR5cGVcIikudG9Mb3dlckNhc2UoKSYmZi5GaWxlUmVhZGVyKXx8IXRoaXMuZmlsZXN8fDA9PT10aGlzLmZpbGVzLmxlbmd0aClyZXR1cm4hMDtmb3IodmFyIHQ9MDt0PHRoaXMuZmlsZXMubGVuZ3RoO3QrKyloLnB1c2goe2ZpbGU6dGhpcy5maWxlc1t0XSxpbnB1dEVsZW06dGhpcyxpbnN0YW5jZUNvbmZpZzpkLmV4dGVuZCh7fSxpKX0pfSksZSgpLHRoaXM7ZnVuY3Rpb24gZSgpe2lmKDAhPT1oLmxlbmd0aCl7dmFyIGUsdCxpLHIsbj1oWzBdO2lmKE0oby5iZWZvcmUpKXt2YXIgcz1vLmJlZm9yZShuLmZpbGUsbi5pbnB1dEVsZW0pO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBzKXtpZihcImFib3J0XCI9PT1zLmFjdGlvbilyZXR1cm4gZT1cIkFib3J0RXJyb3JcIix0PW4uZmlsZSxpPW4uaW5wdXRFbGVtLHI9cy5yZWFzb24sdm9pZChNKG8uZXJyb3IpJiZvLmVycm9yKHtuYW1lOmV9LHQsaSxyKSk7aWYoXCJza2lwXCI9PT1zLmFjdGlvbilyZXR1cm4gdm9pZCB1KCk7XCJvYmplY3RcIj09dHlwZW9mIHMuY29uZmlnJiYobi5pbnN0YW5jZUNvbmZpZz1kLmV4dGVuZChuLmluc3RhbmNlQ29uZmlnLHMuY29uZmlnKSl9ZWxzZSBpZihcInNraXBcIj09PXMpcmV0dXJuIHZvaWQgdSgpfXZhciBhPW4uaW5zdGFuY2VDb25maWcuY29tcGxldGU7bi5pbnN0YW5jZUNvbmZpZy5jb21wbGV0ZT1mdW5jdGlvbihlKXtNKGEpJiZhKGUsbi5maWxlLG4uaW5wdXRFbGVtKSx1KCl9LGIucGFyc2Uobi5maWxlLG4uaW5zdGFuY2VDb25maWcpfWVsc2UgTShvLmNvbXBsZXRlKSYmby5jb21wbGV0ZSgpfWZ1bmN0aW9uIHUoKXtoLnNwbGljZSgwLDEpLGUoKX19fWZ1bmN0aW9uIHUoZSl7dGhpcy5faGFuZGxlPW51bGwsdGhpcy5fZmluaXNoZWQ9ITEsdGhpcy5fY29tcGxldGVkPSExLHRoaXMuX2hhbHRlZD0hMSx0aGlzLl9pbnB1dD1udWxsLHRoaXMuX2Jhc2VJbmRleD0wLHRoaXMuX3BhcnRpYWxMaW5lPVwiXCIsdGhpcy5fcm93Q291bnQ9MCx0aGlzLl9zdGFydD0wLHRoaXMuX25leHRDaHVuaz1udWxsLHRoaXMuaXNGaXJzdENodW5rPSEwLHRoaXMuX2NvbXBsZXRlUmVzdWx0cz17ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7fX0sZnVuY3Rpb24oZSl7dmFyIHQ9dyhlKTt0LmNodW5rU2l6ZT1wYXJzZUludCh0LmNodW5rU2l6ZSksZS5zdGVwfHxlLmNodW5rfHwodC5jaHVua1NpemU9bnVsbCk7dGhpcy5faGFuZGxlPW5ldyBpKHQpLCh0aGlzLl9oYW5kbGUuc3RyZWFtZXI9dGhpcykuX2NvbmZpZz10fS5jYWxsKHRoaXMsZSksdGhpcy5wYXJzZUNodW5rPWZ1bmN0aW9uKGUsdCl7aWYodGhpcy5pc0ZpcnN0Q2h1bmsmJk0odGhpcy5fY29uZmlnLmJlZm9yZUZpcnN0Q2h1bmspKXt2YXIgaT10aGlzLl9jb25maWcuYmVmb3JlRmlyc3RDaHVuayhlKTt2b2lkIDAhPT1pJiYoZT1pKX10aGlzLmlzRmlyc3RDaHVuaz0hMSx0aGlzLl9oYWx0ZWQ9ITE7dmFyIHI9dGhpcy5fcGFydGlhbExpbmUrZTt0aGlzLl9wYXJ0aWFsTGluZT1cIlwiO3ZhciBuPXRoaXMuX2hhbmRsZS5wYXJzZShyLHRoaXMuX2Jhc2VJbmRleCwhdGhpcy5fZmluaXNoZWQpO2lmKCF0aGlzLl9oYW5kbGUucGF1c2VkKCkmJiF0aGlzLl9oYW5kbGUuYWJvcnRlZCgpKXt2YXIgcz1uLm1ldGEuY3Vyc29yO3RoaXMuX2ZpbmlzaGVkfHwodGhpcy5fcGFydGlhbExpbmU9ci5zdWJzdHJpbmcocy10aGlzLl9iYXNlSW5kZXgpLHRoaXMuX2Jhc2VJbmRleD1zKSxuJiZuLmRhdGEmJih0aGlzLl9yb3dDb3VudCs9bi5kYXRhLmxlbmd0aCk7dmFyIGE9dGhpcy5fZmluaXNoZWR8fHRoaXMuX2NvbmZpZy5wcmV2aWV3JiZ0aGlzLl9yb3dDb3VudD49dGhpcy5fY29uZmlnLnByZXZpZXc7aWYobylmLnBvc3RNZXNzYWdlKHtyZXN1bHRzOm4sd29ya2VySWQ6Yi5XT1JLRVJfSUQsZmluaXNoZWQ6YX0pO2Vsc2UgaWYoTSh0aGlzLl9jb25maWcuY2h1bmspJiYhdCl7aWYodGhpcy5fY29uZmlnLmNodW5rKG4sdGhpcy5faGFuZGxlKSx0aGlzLl9oYW5kbGUucGF1c2VkKCl8fHRoaXMuX2hhbmRsZS5hYm9ydGVkKCkpcmV0dXJuIHZvaWQodGhpcy5faGFsdGVkPSEwKTtuPXZvaWQgMCx0aGlzLl9jb21wbGV0ZVJlc3VsdHM9dm9pZCAwfXJldHVybiB0aGlzLl9jb25maWcuc3RlcHx8dGhpcy5fY29uZmlnLmNodW5rfHwodGhpcy5fY29tcGxldGVSZXN1bHRzLmRhdGE9dGhpcy5fY29tcGxldGVSZXN1bHRzLmRhdGEuY29uY2F0KG4uZGF0YSksdGhpcy5fY29tcGxldGVSZXN1bHRzLmVycm9ycz10aGlzLl9jb21wbGV0ZVJlc3VsdHMuZXJyb3JzLmNvbmNhdChuLmVycm9ycyksdGhpcy5fY29tcGxldGVSZXN1bHRzLm1ldGE9bi5tZXRhKSx0aGlzLl9jb21wbGV0ZWR8fCFhfHwhTSh0aGlzLl9jb25maWcuY29tcGxldGUpfHxuJiZuLm1ldGEuYWJvcnRlZHx8KHRoaXMuX2NvbmZpZy5jb21wbGV0ZSh0aGlzLl9jb21wbGV0ZVJlc3VsdHMsdGhpcy5faW5wdXQpLHRoaXMuX2NvbXBsZXRlZD0hMCksYXx8biYmbi5tZXRhLnBhdXNlZHx8dGhpcy5fbmV4dENodW5rKCksbn10aGlzLl9oYWx0ZWQ9ITB9LHRoaXMuX3NlbmRFcnJvcj1mdW5jdGlvbihlKXtNKHRoaXMuX2NvbmZpZy5lcnJvcik/dGhpcy5fY29uZmlnLmVycm9yKGUpOm8mJnRoaXMuX2NvbmZpZy5lcnJvciYmZi5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Yi5XT1JLRVJfSUQsZXJyb3I6ZSxmaW5pc2hlZDohMX0pfX1mdW5jdGlvbiBsKGUpe3ZhciByOyhlPWV8fHt9KS5jaHVua1NpemV8fChlLmNodW5rU2l6ZT1iLlJlbW90ZUNodW5rU2l6ZSksdS5jYWxsKHRoaXMsZSksdGhpcy5fbmV4dENodW5rPW4/ZnVuY3Rpb24oKXt0aGlzLl9yZWFkQ2h1bmsoKSx0aGlzLl9jaHVua0xvYWRlZCgpfTpmdW5jdGlvbigpe3RoaXMuX3JlYWRDaHVuaygpfSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9yZWFkQ2h1bms9ZnVuY3Rpb24oKXtpZih0aGlzLl9maW5pc2hlZCl0aGlzLl9jaHVua0xvYWRlZCgpO2Vsc2V7aWYocj1uZXcgWE1MSHR0cFJlcXVlc3QsdGhpcy5fY29uZmlnLndpdGhDcmVkZW50aWFscyYmKHIud2l0aENyZWRlbnRpYWxzPXRoaXMuX2NvbmZpZy53aXRoQ3JlZGVudGlhbHMpLG58fChyLm9ubG9hZD12KHRoaXMuX2NodW5rTG9hZGVkLHRoaXMpLHIub25lcnJvcj12KHRoaXMuX2NodW5rRXJyb3IsdGhpcykpLHIub3Blbih0aGlzLl9jb25maWcuZG93bmxvYWRSZXF1ZXN0Qm9keT9cIlBPU1RcIjpcIkdFVFwiLHRoaXMuX2lucHV0LCFuKSx0aGlzLl9jb25maWcuZG93bmxvYWRSZXF1ZXN0SGVhZGVycyl7dmFyIGU9dGhpcy5fY29uZmlnLmRvd25sb2FkUmVxdWVzdEhlYWRlcnM7Zm9yKHZhciB0IGluIGUpci5zZXRSZXF1ZXN0SGVhZGVyKHQsZVt0XSl9aWYodGhpcy5fY29uZmlnLmNodW5rU2l6ZSl7dmFyIGk9dGhpcy5fc3RhcnQrdGhpcy5fY29uZmlnLmNodW5rU2l6ZS0xO3Iuc2V0UmVxdWVzdEhlYWRlcihcIlJhbmdlXCIsXCJieXRlcz1cIit0aGlzLl9zdGFydCtcIi1cIitpKX10cnl7ci5zZW5kKHRoaXMuX2NvbmZpZy5kb3dubG9hZFJlcXVlc3RCb2R5KX1jYXRjaChlKXt0aGlzLl9jaHVua0Vycm9yKGUubWVzc2FnZSl9biYmMD09PXIuc3RhdHVzJiZ0aGlzLl9jaHVua0Vycm9yKCl9fSx0aGlzLl9jaHVua0xvYWRlZD1mdW5jdGlvbigpezQ9PT1yLnJlYWR5U3RhdGUmJihyLnN0YXR1czwyMDB8fDQwMDw9ci5zdGF0dXM/dGhpcy5fY2h1bmtFcnJvcigpOih0aGlzLl9zdGFydCs9dGhpcy5fY29uZmlnLmNodW5rU2l6ZT90aGlzLl9jb25maWcuY2h1bmtTaXplOnIucmVzcG9uc2VUZXh0Lmxlbmd0aCx0aGlzLl9maW5pc2hlZD0hdGhpcy5fY29uZmlnLmNodW5rU2l6ZXx8dGhpcy5fc3RhcnQ+PWZ1bmN0aW9uKGUpe3ZhciB0PWUuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVJhbmdlXCIpO2lmKG51bGw9PT10KXJldHVybi0xO3JldHVybiBwYXJzZUludCh0LnN1YnN0cmluZyh0Lmxhc3RJbmRleE9mKFwiL1wiKSsxKSl9KHIpLHRoaXMucGFyc2VDaHVuayhyLnJlc3BvbnNlVGV4dCkpKX0sdGhpcy5fY2h1bmtFcnJvcj1mdW5jdGlvbihlKXt2YXIgdD1yLnN0YXR1c1RleHR8fGU7dGhpcy5fc2VuZEVycm9yKG5ldyBFcnJvcih0KSl9fWZ1bmN0aW9uIGMoZSl7dmFyIHIsbjsoZT1lfHx7fSkuY2h1bmtTaXplfHwoZS5jaHVua1NpemU9Yi5Mb2NhbENodW5rU2l6ZSksdS5jYWxsKHRoaXMsZSk7dmFyIHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZpbGVSZWFkZXI7dGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7dGhpcy5faW5wdXQ9ZSxuPWUuc2xpY2V8fGUud2Via2l0U2xpY2V8fGUubW96U2xpY2Uscz8oKHI9bmV3IEZpbGVSZWFkZXIpLm9ubG9hZD12KHRoaXMuX2NodW5rTG9hZGVkLHRoaXMpLHIub25lcnJvcj12KHRoaXMuX2NodW5rRXJyb3IsdGhpcykpOnI9bmV3IEZpbGVSZWFkZXJTeW5jLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXt0aGlzLl9maW5pc2hlZHx8dGhpcy5fY29uZmlnLnByZXZpZXcmJiEodGhpcy5fcm93Q291bnQ8dGhpcy5fY29uZmlnLnByZXZpZXcpfHx0aGlzLl9yZWFkQ2h1bmsoKX0sdGhpcy5fcmVhZENodW5rPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5faW5wdXQ7aWYodGhpcy5fY29uZmlnLmNodW5rU2l6ZSl7dmFyIHQ9TWF0aC5taW4odGhpcy5fc3RhcnQrdGhpcy5fY29uZmlnLmNodW5rU2l6ZSx0aGlzLl9pbnB1dC5zaXplKTtlPW4uY2FsbChlLHRoaXMuX3N0YXJ0LHQpfXZhciBpPXIucmVhZEFzVGV4dChlLHRoaXMuX2NvbmZpZy5lbmNvZGluZyk7c3x8dGhpcy5fY2h1bmtMb2FkZWQoe3RhcmdldDp7cmVzdWx0Oml9fSl9LHRoaXMuX2NodW5rTG9hZGVkPWZ1bmN0aW9uKGUpe3RoaXMuX3N0YXJ0Kz10aGlzLl9jb25maWcuY2h1bmtTaXplLHRoaXMuX2ZpbmlzaGVkPSF0aGlzLl9jb25maWcuY2h1bmtTaXplfHx0aGlzLl9zdGFydD49dGhpcy5faW5wdXQuc2l6ZSx0aGlzLnBhcnNlQ2h1bmsoZS50YXJnZXQucmVzdWx0KX0sdGhpcy5fY2h1bmtFcnJvcj1mdW5jdGlvbigpe3RoaXMuX3NlbmRFcnJvcihyLmVycm9yKX19ZnVuY3Rpb24gcChlKXt2YXIgaTt1LmNhbGwodGhpcyxlPWV8fHt9KSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXtyZXR1cm4gaT1lLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXtpZighdGhpcy5fZmluaXNoZWQpe3ZhciBlLHQ9dGhpcy5fY29uZmlnLmNodW5rU2l6ZTtyZXR1cm4gdD8oZT1pLnN1YnN0cmluZygwLHQpLGk9aS5zdWJzdHJpbmcodCkpOihlPWksaT1cIlwiKSx0aGlzLl9maW5pc2hlZD0haSx0aGlzLnBhcnNlQ2h1bmsoZSl9fX1mdW5jdGlvbiBnKGUpe3UuY2FsbCh0aGlzLGU9ZXx8e30pO3ZhciB0PVtdLGk9ITAscj0hMTt0aGlzLnBhdXNlPWZ1bmN0aW9uKCl7dS5wcm90b3R5cGUucGF1c2UuYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuX2lucHV0LnBhdXNlKCl9LHRoaXMucmVzdW1lPWZ1bmN0aW9uKCl7dS5wcm90b3R5cGUucmVzdW1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSx0aGlzLl9pbnB1dC5yZXN1bWUoKX0sdGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7dGhpcy5faW5wdXQ9ZSx0aGlzLl9pbnB1dC5vbihcImRhdGFcIix0aGlzLl9zdHJlYW1EYXRhKSx0aGlzLl9pbnB1dC5vbihcImVuZFwiLHRoaXMuX3N0cmVhbUVuZCksdGhpcy5faW5wdXQub24oXCJlcnJvclwiLHRoaXMuX3N0cmVhbUVycm9yKX0sdGhpcy5fY2hlY2tJc0ZpbmlzaGVkPWZ1bmN0aW9uKCl7ciYmMT09PXQubGVuZ3RoJiYodGhpcy5fZmluaXNoZWQ9ITApfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXt0aGlzLl9jaGVja0lzRmluaXNoZWQoKSx0Lmxlbmd0aD90aGlzLnBhcnNlQ2h1bmsodC5zaGlmdCgpKTppPSEwfSx0aGlzLl9zdHJlYW1EYXRhPXYoZnVuY3Rpb24oZSl7dHJ5e3QucHVzaChcInN0cmluZ1wiPT10eXBlb2YgZT9lOmUudG9TdHJpbmcodGhpcy5fY29uZmlnLmVuY29kaW5nKSksaSYmKGk9ITEsdGhpcy5fY2hlY2tJc0ZpbmlzaGVkKCksdGhpcy5wYXJzZUNodW5rKHQuc2hpZnQoKSkpfWNhdGNoKGUpe3RoaXMuX3N0cmVhbUVycm9yKGUpfX0sdGhpcyksdGhpcy5fc3RyZWFtRXJyb3I9dihmdW5jdGlvbihlKXt0aGlzLl9zdHJlYW1DbGVhblVwKCksdGhpcy5fc2VuZEVycm9yKGUpfSx0aGlzKSx0aGlzLl9zdHJlYW1FbmQ9dihmdW5jdGlvbigpe3RoaXMuX3N0cmVhbUNsZWFuVXAoKSxyPSEwLHRoaXMuX3N0cmVhbURhdGEoXCJcIil9LHRoaXMpLHRoaXMuX3N0cmVhbUNsZWFuVXA9dihmdW5jdGlvbigpe3RoaXMuX2lucHV0LnJlbW92ZUxpc3RlbmVyKFwiZGF0YVwiLHRoaXMuX3N0cmVhbURhdGEpLHRoaXMuX2lucHV0LnJlbW92ZUxpc3RlbmVyKFwiZW5kXCIsdGhpcy5fc3RyZWFtRW5kKSx0aGlzLl9pbnB1dC5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsdGhpcy5fc3RyZWFtRXJyb3IpfSx0aGlzKX1mdW5jdGlvbiBpKG0pe3ZhciBhLG8saCxyPU1hdGgucG93KDIsNTMpLG49LXIscz0vXlxccyotPyhcXGQrXFwuP3xcXC5cXGQrfFxcZCtcXC5cXGQrKShbZUVdWy0rXT9cXGQrKT9cXHMqJC8sdT0vXihcXGR7NH0tWzAxXVxcZC1bMC0zXVxcZFRbMC0yXVxcZDpbMC01XVxcZDpbMC01XVxcZFxcLlxcZCsoWystXVswLTJdXFxkOlswLTVdXFxkfFopKXwoXFxkezR9LVswMV1cXGQtWzAtM11cXGRUWzAtMl1cXGQ6WzAtNV1cXGQ6WzAtNV1cXGQoWystXVswLTJdXFxkOlswLTVdXFxkfFopKXwoXFxkezR9LVswMV1cXGQtWzAtM11cXGRUWzAtMl1cXGQ6WzAtNV1cXGQoWystXVswLTJdXFxkOlswLTVdXFxkfFopKSQvLHQ9dGhpcyxpPTAsZj0wLGQ9ITEsZT0hMSxsPVtdLGM9e2RhdGE6W10sZXJyb3JzOltdLG1ldGE6e319O2lmKE0obS5zdGVwKSl7dmFyIHA9bS5zdGVwO20uc3RlcD1mdW5jdGlvbihlKXtpZihjPWUsXygpKWcoKTtlbHNle2lmKGcoKSwwPT09Yy5kYXRhLmxlbmd0aClyZXR1cm47aSs9ZS5kYXRhLmxlbmd0aCxtLnByZXZpZXcmJmk+bS5wcmV2aWV3P28uYWJvcnQoKTooYy5kYXRhPWMuZGF0YVswXSxwKGMsdCkpfX19ZnVuY3Rpb24geShlKXtyZXR1cm5cImdyZWVkeVwiPT09bS5za2lwRW1wdHlMaW5lcz9cIlwiPT09ZS5qb2luKFwiXCIpLnRyaW0oKToxPT09ZS5sZW5ndGgmJjA9PT1lWzBdLmxlbmd0aH1mdW5jdGlvbiBnKCl7aWYoYyYmaCYmKGsoXCJEZWxpbWl0ZXJcIixcIlVuZGV0ZWN0YWJsZURlbGltaXRlclwiLFwiVW5hYmxlIHRvIGF1dG8tZGV0ZWN0IGRlbGltaXRpbmcgY2hhcmFjdGVyOyBkZWZhdWx0ZWQgdG8gJ1wiK2IuRGVmYXVsdERlbGltaXRlcitcIidcIiksaD0hMSksbS5za2lwRW1wdHlMaW5lcylmb3IodmFyIGU9MDtlPGMuZGF0YS5sZW5ndGg7ZSsrKXkoYy5kYXRhW2VdKSYmYy5kYXRhLnNwbGljZShlLS0sMSk7cmV0dXJuIF8oKSYmZnVuY3Rpb24oKXtpZighYylyZXR1cm47ZnVuY3Rpb24gZShlLHQpe00obS50cmFuc2Zvcm1IZWFkZXIpJiYoZT1tLnRyYW5zZm9ybUhlYWRlcihlLHQpKSxsLnB1c2goZSl9aWYoQXJyYXkuaXNBcnJheShjLmRhdGFbMF0pKXtmb3IodmFyIHQ9MDtfKCkmJnQ8Yy5kYXRhLmxlbmd0aDt0KyspYy5kYXRhW3RdLmZvckVhY2goZSk7Yy5kYXRhLnNwbGljZSgwLDEpfWVsc2UgYy5kYXRhLmZvckVhY2goZSl9KCksZnVuY3Rpb24oKXtpZighY3x8IW0uaGVhZGVyJiYhbS5keW5hbWljVHlwaW5nJiYhbS50cmFuc2Zvcm0pcmV0dXJuIGM7ZnVuY3Rpb24gZShlLHQpe3ZhciBpLHI9bS5oZWFkZXI/e306W107Zm9yKGk9MDtpPGUubGVuZ3RoO2krKyl7dmFyIG49aSxzPWVbaV07bS5oZWFkZXImJihuPWk+PWwubGVuZ3RoP1wiX19wYXJzZWRfZXh0cmFcIjpsW2ldKSxtLnRyYW5zZm9ybSYmKHM9bS50cmFuc2Zvcm0ocyxuKSkscz12KG4scyksXCJfX3BhcnNlZF9leHRyYVwiPT09bj8ocltuXT1yW25dfHxbXSxyW25dLnB1c2gocykpOnJbbl09c31yZXR1cm4gbS5oZWFkZXImJihpPmwubGVuZ3RoP2soXCJGaWVsZE1pc21hdGNoXCIsXCJUb29NYW55RmllbGRzXCIsXCJUb28gbWFueSBmaWVsZHM6IGV4cGVjdGVkIFwiK2wubGVuZ3RoK1wiIGZpZWxkcyBidXQgcGFyc2VkIFwiK2ksZit0KTppPGwubGVuZ3RoJiZrKFwiRmllbGRNaXNtYXRjaFwiLFwiVG9vRmV3RmllbGRzXCIsXCJUb28gZmV3IGZpZWxkczogZXhwZWN0ZWQgXCIrbC5sZW5ndGgrXCIgZmllbGRzIGJ1dCBwYXJzZWQgXCIraSxmK3QpKSxyfXZhciB0PTE7IWMuZGF0YS5sZW5ndGh8fEFycmF5LmlzQXJyYXkoYy5kYXRhWzBdKT8oYy5kYXRhPWMuZGF0YS5tYXAoZSksdD1jLmRhdGEubGVuZ3RoKTpjLmRhdGE9ZShjLmRhdGEsMCk7bS5oZWFkZXImJmMubWV0YSYmKGMubWV0YS5maWVsZHM9bCk7cmV0dXJuIGYrPXQsY30oKX1mdW5jdGlvbiBfKCl7cmV0dXJuIG0uaGVhZGVyJiYwPT09bC5sZW5ndGh9ZnVuY3Rpb24gdihlLHQpe3JldHVybiBpPWUsbS5keW5hbWljVHlwaW5nRnVuY3Rpb24mJnZvaWQgMD09PW0uZHluYW1pY1R5cGluZ1tpXSYmKG0uZHluYW1pY1R5cGluZ1tpXT1tLmR5bmFtaWNUeXBpbmdGdW5jdGlvbihpKSksITA9PT0obS5keW5hbWljVHlwaW5nW2ldfHxtLmR5bmFtaWNUeXBpbmcpP1widHJ1ZVwiPT09dHx8XCJUUlVFXCI9PT10fHxcImZhbHNlXCIhPT10JiZcIkZBTFNFXCIhPT10JiYoZnVuY3Rpb24oZSl7aWYocy50ZXN0KGUpKXt2YXIgdD1wYXJzZUZsb2F0KGUpO2lmKG48dCYmdDxyKXJldHVybiEwfXJldHVybiExfSh0KT9wYXJzZUZsb2F0KHQpOnUudGVzdCh0KT9uZXcgRGF0ZSh0KTpcIlwiPT09dD9udWxsOnQpOnQ7dmFyIGl9ZnVuY3Rpb24gayhlLHQsaSxyKXt2YXIgbj17dHlwZTplLGNvZGU6dCxtZXNzYWdlOml9O3ZvaWQgMCE9PXImJihuLnJvdz1yKSxjLmVycm9ycy5wdXNoKG4pfXRoaXMucGFyc2U9ZnVuY3Rpb24oZSx0LGkpe3ZhciByPW0ucXVvdGVDaGFyfHwnXCInO2lmKG0ubmV3bGluZXx8KG0ubmV3bGluZT1mdW5jdGlvbihlLHQpe2U9ZS5zdWJzdHJpbmcoMCwxMDQ4NTc2KTt2YXIgaT1uZXcgUmVnRXhwKGoodCkrXCIoW15dKj8pXCIraih0KSxcImdtXCIpLHI9KGU9ZS5yZXBsYWNlKGksXCJcIikpLnNwbGl0KFwiXFxyXCIpLG49ZS5zcGxpdChcIlxcblwiKSxzPTE8bi5sZW5ndGgmJm5bMF0ubGVuZ3RoPHJbMF0ubGVuZ3RoO2lmKDE9PT1yLmxlbmd0aHx8cylyZXR1cm5cIlxcblwiO2Zvcih2YXIgYT0wLG89MDtvPHIubGVuZ3RoO28rKylcIlxcblwiPT09cltvXVswXSYmYSsrO3JldHVybiBhPj1yLmxlbmd0aC8yP1wiXFxyXFxuXCI6XCJcXHJcIn0oZSxyKSksaD0hMSxtLmRlbGltaXRlcilNKG0uZGVsaW1pdGVyKSYmKG0uZGVsaW1pdGVyPW0uZGVsaW1pdGVyKGUpLGMubWV0YS5kZWxpbWl0ZXI9bS5kZWxpbWl0ZXIpO2Vsc2V7dmFyIG49ZnVuY3Rpb24oZSx0LGkscixuKXt2YXIgcyxhLG8saDtuPW58fFtcIixcIixcIlxcdFwiLFwifFwiLFwiO1wiLGIuUkVDT1JEX1NFUCxiLlVOSVRfU0VQXTtmb3IodmFyIHU9MDt1PG4ubGVuZ3RoO3UrKyl7dmFyIGY9blt1XSxkPTAsbD0wLGM9MDtvPXZvaWQgMDtmb3IodmFyIHA9bmV3IEUoe2NvbW1lbnRzOnIsZGVsaW1pdGVyOmYsbmV3bGluZTp0LHByZXZpZXc6MTB9KS5wYXJzZShlKSxnPTA7ZzxwLmRhdGEubGVuZ3RoO2crKylpZihpJiZ5KHAuZGF0YVtnXSkpYysrO2Vsc2V7dmFyIF89cC5kYXRhW2ddLmxlbmd0aDtsKz1fLHZvaWQgMCE9PW8/MDxfJiYoZCs9TWF0aC5hYnMoXy1vKSxvPV8pOm89X30wPHAuZGF0YS5sZW5ndGgmJihsLz1wLmRhdGEubGVuZ3RoLWMpLCh2b2lkIDA9PT1hfHxkPD1hKSYmKHZvaWQgMD09PWh8fGg8bCkmJjEuOTk8bCYmKGE9ZCxzPWYsaD1sKX1yZXR1cm57c3VjY2Vzc2Z1bDohIShtLmRlbGltaXRlcj1zKSxiZXN0RGVsaW1pdGVyOnN9fShlLG0ubmV3bGluZSxtLnNraXBFbXB0eUxpbmVzLG0uY29tbWVudHMsbS5kZWxpbWl0ZXJzVG9HdWVzcyk7bi5zdWNjZXNzZnVsP20uZGVsaW1pdGVyPW4uYmVzdERlbGltaXRlcjooaD0hMCxtLmRlbGltaXRlcj1iLkRlZmF1bHREZWxpbWl0ZXIpLGMubWV0YS5kZWxpbWl0ZXI9bS5kZWxpbWl0ZXJ9dmFyIHM9dyhtKTtyZXR1cm4gbS5wcmV2aWV3JiZtLmhlYWRlciYmcy5wcmV2aWV3KyssYT1lLG89bmV3IEUocyksYz1vLnBhcnNlKGEsdCxpKSxnKCksZD97bWV0YTp7cGF1c2VkOiEwfX06Y3x8e21ldGE6e3BhdXNlZDohMX19fSx0aGlzLnBhdXNlZD1mdW5jdGlvbigpe3JldHVybiBkfSx0aGlzLnBhdXNlPWZ1bmN0aW9uKCl7ZD0hMCxvLmFib3J0KCksYT1NKG0uY2h1bmspP1wiXCI6YS5zdWJzdHJpbmcoby5nZXRDaGFySW5kZXgoKSl9LHRoaXMucmVzdW1lPWZ1bmN0aW9uKCl7dC5zdHJlYW1lci5faGFsdGVkPyhkPSExLHQuc3RyZWFtZXIucGFyc2VDaHVuayhhLCEwKSk6c2V0VGltZW91dCh0LnJlc3VtZSwzKX0sdGhpcy5hYm9ydGVkPWZ1bmN0aW9uKCl7cmV0dXJuIGV9LHRoaXMuYWJvcnQ9ZnVuY3Rpb24oKXtlPSEwLG8uYWJvcnQoKSxjLm1ldGEuYWJvcnRlZD0hMCxNKG0uY29tcGxldGUpJiZtLmNvbXBsZXRlKGMpLGE9XCJcIn19ZnVuY3Rpb24gaihlKXtyZXR1cm4gZS5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZyxcIlxcXFwkJlwiKX1mdW5jdGlvbiBFKGUpe3ZhciBTLE89KGU9ZXx8e30pLmRlbGltaXRlcix4PWUubmV3bGluZSxJPWUuY29tbWVudHMsVD1lLnN0ZXAsRD1lLnByZXZpZXcsQT1lLmZhc3RNb2RlLEw9Uz12b2lkIDA9PT1lLnF1b3RlQ2hhcj8nXCInOmUucXVvdGVDaGFyO2lmKHZvaWQgMCE9PWUuZXNjYXBlQ2hhciYmKEw9ZS5lc2NhcGVDaGFyKSwoXCJzdHJpbmdcIiE9dHlwZW9mIE98fC0xPGIuQkFEX0RFTElNSVRFUlMuaW5kZXhPZihPKSkmJihPPVwiLFwiKSxJPT09Tyl0aHJvdyBuZXcgRXJyb3IoXCJDb21tZW50IGNoYXJhY3RlciBzYW1lIGFzIGRlbGltaXRlclwiKTshMD09PUk/ST1cIiNcIjooXCJzdHJpbmdcIiE9dHlwZW9mIEl8fC0xPGIuQkFEX0RFTElNSVRFUlMuaW5kZXhPZihJKSkmJihJPSExKSxcIlxcblwiIT09eCYmXCJcXHJcIiE9PXgmJlwiXFxyXFxuXCIhPT14JiYoeD1cIlxcblwiKTt2YXIgRj0wLHo9ITE7dGhpcy5wYXJzZT1mdW5jdGlvbihyLHQsaSl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIHIpdGhyb3cgbmV3IEVycm9yKFwiSW5wdXQgbXVzdCBiZSBhIHN0cmluZ1wiKTt2YXIgbj1yLmxlbmd0aCxlPU8ubGVuZ3RoLHM9eC5sZW5ndGgsYT1JLmxlbmd0aCxvPU0oVCksaD1bXSx1PVtdLGY9W10sZD1GPTA7aWYoIXIpcmV0dXJuIEMoKTtpZihBfHwhMSE9PUEmJi0xPT09ci5pbmRleE9mKFMpKXtmb3IodmFyIGw9ci5zcGxpdCh4KSxjPTA7YzxsLmxlbmd0aDtjKyspe2lmKGY9bFtjXSxGKz1mLmxlbmd0aCxjIT09bC5sZW5ndGgtMSlGKz14Lmxlbmd0aDtlbHNlIGlmKGkpcmV0dXJuIEMoKTtpZighSXx8Zi5zdWJzdHJpbmcoMCxhKSE9PUkpe2lmKG8pe2lmKGg9W10sayhmLnNwbGl0KE8pKSxSKCkseilyZXR1cm4gQygpfWVsc2UgayhmLnNwbGl0KE8pKTtpZihEJiZEPD1jKXJldHVybiBoPWguc2xpY2UoMCxEKSxDKCEwKX19cmV0dXJuIEMoKX1mb3IodmFyIHA9ci5pbmRleE9mKE8sRiksZz1yLmluZGV4T2YoeCxGKSxfPW5ldyBSZWdFeHAoaihMKStqKFMpLFwiZ1wiKSxtPXIuaW5kZXhPZihTLEYpOzspaWYocltGXSE9PVMpaWYoSSYmMD09PWYubGVuZ3RoJiZyLnN1YnN0cmluZyhGLEYrYSk9PT1JKXtpZigtMT09PWcpcmV0dXJuIEMoKTtGPWcrcyxnPXIuaW5kZXhPZih4LEYpLHA9ci5pbmRleE9mKE8sRil9ZWxzZSBpZigtMSE9PXAmJihwPGd8fC0xPT09ZykpZi5wdXNoKHIuc3Vic3RyaW5nKEYscCkpLEY9cCtlLHA9ci5pbmRleE9mKE8sRik7ZWxzZXtpZigtMT09PWcpYnJlYWs7aWYoZi5wdXNoKHIuc3Vic3RyaW5nKEYsZykpLHcoZytzKSxvJiYoUigpLHopKXJldHVybiBDKCk7aWYoRCYmaC5sZW5ndGg+PUQpcmV0dXJuIEMoITApfWVsc2UgZm9yKG09RixGKys7Oyl7aWYoLTE9PT0obT1yLmluZGV4T2YoUyxtKzEpKSlyZXR1cm4gaXx8dS5wdXNoKHt0eXBlOlwiUXVvdGVzXCIsY29kZTpcIk1pc3NpbmdRdW90ZXNcIixtZXNzYWdlOlwiUXVvdGVkIGZpZWxkIHVudGVybWluYXRlZFwiLHJvdzpoLmxlbmd0aCxpbmRleDpGfSksRSgpO2lmKG09PT1uLTEpcmV0dXJuIEUoci5zdWJzdHJpbmcoRixtKS5yZXBsYWNlKF8sUykpO2lmKFMhPT1MfHxyW20rMV0hPT1MKXtpZihTPT09THx8MD09PW18fHJbbS0xXSE9PUwpey0xIT09cCYmcDxtKzEmJihwPXIuaW5kZXhPZihPLG0rMSkpLC0xIT09ZyYmZzxtKzEmJihnPXIuaW5kZXhPZih4LG0rMSkpO3ZhciB5PWIoLTE9PT1nP3A6TWF0aC5taW4ocCxnKSk7aWYoclttKzEreV09PT1PKXtmLnB1c2goci5zdWJzdHJpbmcoRixtKS5yZXBsYWNlKF8sUykpLHJbRj1tKzEreStlXSE9PVMmJihtPXIuaW5kZXhPZihTLEYpKSxwPXIuaW5kZXhPZihPLEYpLGc9ci5pbmRleE9mKHgsRik7YnJlYWt9dmFyIHY9YihnKTtpZihyLnN1YnN0cmluZyhtKzErdixtKzErditzKT09PXgpe2lmKGYucHVzaChyLnN1YnN0cmluZyhGLG0pLnJlcGxhY2UoXyxTKSksdyhtKzErditzKSxwPXIuaW5kZXhPZihPLEYpLG09ci5pbmRleE9mKFMsRiksbyYmKFIoKSx6KSlyZXR1cm4gQygpO2lmKEQmJmgubGVuZ3RoPj1EKXJldHVybiBDKCEwKTticmVha311LnB1c2goe3R5cGU6XCJRdW90ZXNcIixjb2RlOlwiSW52YWxpZFF1b3Rlc1wiLG1lc3NhZ2U6XCJUcmFpbGluZyBxdW90ZSBvbiBxdW90ZWQgZmllbGQgaXMgbWFsZm9ybWVkXCIscm93OmgubGVuZ3RoLGluZGV4OkZ9KSxtKyt9fWVsc2UgbSsrfXJldHVybiBFKCk7ZnVuY3Rpb24gayhlKXtoLnB1c2goZSksZD1GfWZ1bmN0aW9uIGIoZSl7dmFyIHQ9MDtpZigtMSE9PWUpe3ZhciBpPXIuc3Vic3RyaW5nKG0rMSxlKTtpJiZcIlwiPT09aS50cmltKCkmJih0PWkubGVuZ3RoKX1yZXR1cm4gdH1mdW5jdGlvbiBFKGUpe3JldHVybiBpfHwodm9pZCAwPT09ZSYmKGU9ci5zdWJzdHJpbmcoRikpLGYucHVzaChlKSxGPW4sayhmKSxvJiZSKCkpLEMoKX1mdW5jdGlvbiB3KGUpe0Y9ZSxrKGYpLGY9W10sZz1yLmluZGV4T2YoeCxGKX1mdW5jdGlvbiBDKGUpe3JldHVybntkYXRhOmgsZXJyb3JzOnUsbWV0YTp7ZGVsaW1pdGVyOk8sbGluZWJyZWFrOngsYWJvcnRlZDp6LHRydW5jYXRlZDohIWUsY3Vyc29yOmQrKHR8fDApfX19ZnVuY3Rpb24gUigpe1QoQygpKSxoPVtdLHU9W119fSx0aGlzLmFib3J0PWZ1bmN0aW9uKCl7ej0hMH0sdGhpcy5nZXRDaGFySW5kZXg9ZnVuY3Rpb24oKXtyZXR1cm4gRn19ZnVuY3Rpb24gXyhlKXt2YXIgdD1lLmRhdGEsaT1hW3Qud29ya2VySWRdLHI9ITE7aWYodC5lcnJvcilpLnVzZXJFcnJvcih0LmVycm9yLHQuZmlsZSk7ZWxzZSBpZih0LnJlc3VsdHMmJnQucmVzdWx0cy5kYXRhKXt2YXIgbj17YWJvcnQ6ZnVuY3Rpb24oKXtyPSEwLG0odC53b3JrZXJJZCx7ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7YWJvcnRlZDohMH19KX0scGF1c2U6eSxyZXN1bWU6eX07aWYoTShpLnVzZXJTdGVwKSl7Zm9yKHZhciBzPTA7czx0LnJlc3VsdHMuZGF0YS5sZW5ndGgmJihpLnVzZXJTdGVwKHtkYXRhOnQucmVzdWx0cy5kYXRhW3NdLGVycm9yczp0LnJlc3VsdHMuZXJyb3JzLG1ldGE6dC5yZXN1bHRzLm1ldGF9LG4pLCFyKTtzKyspO2RlbGV0ZSB0LnJlc3VsdHN9ZWxzZSBNKGkudXNlckNodW5rKSYmKGkudXNlckNodW5rKHQucmVzdWx0cyxuLHQuZmlsZSksZGVsZXRlIHQucmVzdWx0cyl9dC5maW5pc2hlZCYmIXImJm0odC53b3JrZXJJZCx0LnJlc3VsdHMpfWZ1bmN0aW9uIG0oZSx0KXt2YXIgaT1hW2VdO00oaS51c2VyQ29tcGxldGUpJiZpLnVzZXJDb21wbGV0ZSh0KSxpLnRlcm1pbmF0ZSgpLGRlbGV0ZSBhW2VdfWZ1bmN0aW9uIHkoKXt0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQuXCIpfWZ1bmN0aW9uIHcoZSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGV8fG51bGw9PT1lKXJldHVybiBlO3ZhciB0PUFycmF5LmlzQXJyYXkoZSk/W106e307Zm9yKHZhciBpIGluIGUpdFtpXT13KGVbaV0pO3JldHVybiB0fWZ1bmN0aW9uIHYoZSx0KXtyZXR1cm4gZnVuY3Rpb24oKXtlLmFwcGx5KHQsYXJndW1lbnRzKX19ZnVuY3Rpb24gTShlKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlfXJldHVybiBvJiYoZi5vbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5kYXRhO3ZvaWQgMD09PWIuV09SS0VSX0lEJiZ0JiYoYi5XT1JLRVJfSUQ9dC53b3JrZXJJZCk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQuaW5wdXQpZi5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Yi5XT1JLRVJfSUQscmVzdWx0czpiLnBhcnNlKHQuaW5wdXQsdC5jb25maWcpLGZpbmlzaGVkOiEwfSk7ZWxzZSBpZihmLkZpbGUmJnQuaW5wdXQgaW5zdGFuY2VvZiBGaWxlfHx0LmlucHV0IGluc3RhbmNlb2YgT2JqZWN0KXt2YXIgaT1iLnBhcnNlKHQuaW5wdXQsdC5jb25maWcpO2kmJmYucG9zdE1lc3NhZ2Uoe3dvcmtlcklkOmIuV09SS0VSX0lELHJlc3VsdHM6aSxmaW5pc2hlZDohMH0pfX0pLChsLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHUucHJvdG90eXBlKSkuY29uc3RydWN0b3I9bCwoYy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZSh1LnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yPWMsKHAucHJvdG90eXBlPU9iamVjdC5jcmVhdGUocC5wcm90b3R5cGUpKS5jb25zdHJ1Y3Rvcj1wLChnLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHUucHJvdG90eXBlKSkuY29uc3RydWN0b3I9ZyxifSk7IiwgIlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdlYnNvY2tldCh1cmw6IFVSTCwgZW50cmllczogdW5rbm93bltdLCBvbk9wZW46ICgpID0+IHZvaWQpIHtcbiAgICBsZXQgd3MgPSBuZXcgV2ViU29ja2V0KHVybCk7XG4gICAgaWYgKCF3cykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXJ2ZXIgZGlkbid0IGFjY2VwdCB3c1wiKTtcbiAgICB9XG4gICAgd3MuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnT3BlbmVkIHdlYnNvY2tldCcpO1xuICAgICAgICBvbk9wZW4oKVxuICAgIH0pO1xuICAgIHdzLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsICh7IGRhdGEgfSkgPT4ge1xuICAgICAgICBjb25zdCB7IGNvdW50LCB0eiwgZXJyb3IsIG5hbWUsIGR1cmF0aW9uLCBlbmRUaW1lIH0gPSBKU09OLnBhcnNlKGRhdGEpO1xuXG4gICAgICAgIGlmIChuYW1lICYmIGR1cmF0aW9uICYmIGVuZFRpbWUpIHtcblxuICAgICAgICAgICAgbGV0IHN0YXJ0VGltZSA9IGVuZFRpbWUgLSBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICBzZXJ2ZXJFbnRyeSA9IHsgbmFtZSwgZHVyYXRpb24sIHN0YXJ0VGltZSwgZW50cnlUeXBlOiAnc2VydmVyJywgZW5kVGltZSB9XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oc2VydmVyRW50cnkpXG4gICAgICAgICAgICBlbnRyaWVzLnB1c2goc2VydmVyRW50cnkpO1xuICAgICAgICB9IGVsc2UgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgY29uc29sZS5pbmZvKHsgY291bnQsIHR6LCBlcnJvciB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHdzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbG9zZWQgd2Vic29ja2V0Jyk7XG5cbiAgICB9KTtcbiAgICByZXR1cm4gd3M7XG59XG4iLCAiZXhwb3J0IHR5cGUgVGJyaWVmRW50cnkgPSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGVuZFRpbWU6IG51bWJlcjtcbiAgICBzdGFydFRpbWU6IG51bWJlcjtcbiAgICBkdXJhdGlvbjogbnVtYmVyO1xuICAgIGVudHJ5VHlwZTogc3RyaW5nO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXRPYnNlcnZlcnMoZW50cmllczogdW5rbm93bltdKSB7XG4gICAgY29uc3QgcG8gPSBuZXcgUGVyZm9ybWFuY2VPYnNlcnZlcigobGlzdCkgPT4ge1xuICAgICAgICBsaXN0LmdldEVudHJpZXMoKS5mb3JFYWNoKFxuICAgICAgICAgICAgKGVudHJ5OiBQZXJmb3JtYW5jZUVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHsgc3RhcnRUaW1lLCBkdXJhdGlvbiwgbmFtZSwgZW50cnlUeXBlIH0gPSBlbnRyeVxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IE1hdGguZmxvb3Ioc3RhcnRUaW1lKVxuICAgICAgICAgICAgICAgIGR1cmF0aW9uID0gTWF0aC5mbG9vcihkdXJhdGlvbilcbiAgICAgICAgICAgICAgICBsZXQgZW5kVGltZSA9IHN0YXJ0VGltZSArIGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBicmllZkVudHJ5ID0geyBuYW1lLCBlbmRUaW1lLCBzdGFydFRpbWUsIGR1cmF0aW9uLCBlbnRyeVR5cGUgfTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhicmllZkVudHJ5KVxuICAgICAgICAgICAgICAgIGVudHJpZXMucHVzaChicmllZkVudHJ5KVxuICAgICAgICAgICAgfSlcbiAgICB9KVxuICAgIGNvbnN0IHJvID0gbmV3IFBlcmZvcm1hbmNlT2JzZXJ2ZXIoKGxpc3QpID0+IHtcbiAgICAgICAgbGlzdC5nZXRFbnRyaWVzQnlUeXBlKCdyZXNvdXJjZScpLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBsZXQgeyBzdGFydFRpbWUsIGR1cmF0aW9uLCBuYW1lLCBlbnRyeVR5cGUsIHJlc3BvbnNlU3RhcnQsIHJlc3BvbnNlRW5kLCBzZXJ2ZXJUaW1pbmcgfSA9IGVudHJ5IGFzIFBlcmZvcm1hbmNlUmVzb3VyY2VUaW1pbmdcbiAgICAgICAgICAgIGlmIChuYW1lLmluY2x1ZGVzKCdtaXRtJykgfHwgbmFtZS5pbmNsdWRlcygnZmF2aWNvbicpKSByZXR1cm5cbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IE1hdGguZmxvb3Ioc3RhcnRUaW1lKVxuICAgICAgICAgICAgZHVyYXRpb24gPSBNYXRoLmZsb29yKGR1cmF0aW9uKVxuICAgICAgICAgICAgcmVzcG9uc2VFbmQgPSBNYXRoLmZsb29yKHJlc3BvbnNlRW5kKVxuICAgICAgICAgICAgcmVzcG9uc2VTdGFydCA9IE1hdGguZmxvb3IocmVzcG9uc2VTdGFydClcbiAgICAgICAgICAgIGlmICgvXmh0dHBzPzpcXC9cXC8vLnRlc3QobmFtZSkpIG5hbWUgPSBTdHJpbmcobmFtZS5zcGxpdCgnLycpLnBvcCgpKVxuICAgICAgICAgICAgc2VydmVyVGltaW5nLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHsgbmFtZSwgZHVyYXRpb24sIGRlc2NyaXB0aW9uIH0gPSBlbnRyeSxcbiAgICAgICAgICAgICAgICAgICAgZW5kVGltZSA9IE51bWJlcihkZXNjcmlwdGlvbi5yZXBsYWNlKCdlbmR0aW1lOicsICcnKSksXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IGVuZFRpbWUgLSBkdXJhdGlvblxuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coeyBuYW1lLCBkdXJhdGlvbiwgc3RhcnRUaW1lLCBlbnRyeVR5cGU6ICdzZXJ2ZXInLCBlbmRUaW1lIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZW50cmllcyA9IGVudHJpZXMuY29uY2F0KFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdkb3dubG9hZDpyZXF1ZXN0X3NlbnQnLFxuICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgICAgICAgICBlbmRUaW1lOiBzdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIGVudHJ5VHlwZTogJ21hcmsnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdkb3dubG9hZDpyZXNwb25zZV9zdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHJlc3BvbnNlU3RhcnQgLSBzdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIGVuZFRpbWU6IHJlc3BvbnNlU3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGVudHJ5VHlwZTogJ3Jlc291cmNlJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZG93bmxvYWQ6cmVzcG9uc2VfY29tcGxldGUnLFxuICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWU6IHJlc3BvbnNlU3RhcnQgLSBzdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiByZXNwb25zZUVuZCAtIHJlc3BvbnNlU3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGVuZFRpbWU6IHJlc3BvbnNlRW5kLFxuICAgICAgICAgICAgICAgICAgICBlbnRyeVR5cGU6ICdyZXNvdXJjZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdKVxuXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVudHJ5LnRvSlNPTigpKVxuXG5cblxuICAgICAgICB9KVxuXG4gICAgfSlcblxuICAgIGNvbnN0IGxpc3RFbnRyaWVzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBlbnRyaWVzT2JqID0gZW50cmllcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYS5lbmRUaW1lIC0gYi5lbmRUaW1lXG4gICAgICAgIH0pLnJlZHVjZSgoYWNjdW0sIGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBsZXQgeyBuYW1lLCBlbmRUaW1lLCBzdGFydFRpbWUsIGR1cmF0aW9uLCBlbnRyeVR5cGUgfSA9IGVudHJ5IGFzIFRicmllZkVudHJ5O1xuICAgICAgICAgICAgYWNjdW1bbmFtZV0gPSB7IGVuZFRpbWUsIHN0YXJ0VGltZSwgZHVyYXRpb24sIGVudHJ5VHlwZSB9O1xuICAgICAgICAgICAgcmV0dXJuIGFjY3VtO1xuICAgICAgICB9LCB7fSBhcyB7IFtzOiBzdHJpbmddOiBPbWl0PFRicmllZkVudHJ5LCAnbmFtZSc+IH0pXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0SWRsZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUudGFibGUoZW50cmllc09iaik7XG4gICAgICAgICAgICBwbyAmJiBwby5kaXNjb25uZWN0KClcbiAgICAgICAgICAgIHJvICYmIHJvLmRpc2Nvbm5lY3QoKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcm8sIHBvLCBsaXN0RW50cmllcyB9XG59IiwgImltcG9ydCBzdHJlYW1TYXZlciBmcm9tICdzdHJlYW1zYXZlcic7XG5cblxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkKFxuICAgIHVybDogc3RyaW5nLFxuICAgIGZpbGVOYW1lID0gJ2ZpbGUudHh0JyxcbiAgICBjYjogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkXG4pIHtcbiAgICBsZXQgdHRmYiA9IGZhbHNlO1xuICAgIGNvbnNvbGUubG9nKHsgdXJsIH0pO1xuICAgIHBlcmZvcm1hbmNlLm1hcmsoJ2Rvd25sb2FkOnN0YXJ0Jyk7XG5cbiAgICBsZXQgZG9uZSA9IGZhbHNlO1xuICAgIHN0cmVhbVNhdmVyLm1pdG0gPSBgJHtsb2NhdGlvbi5vcmlnaW59L21pdG0uaHRtbGA7XG4gICAgY29uc3QgZmlsZVN0cmVhbSA9IHN0cmVhbVNhdmVyLmNyZWF0ZVdyaXRlU3RyZWFtKGZpbGVOYW1lKTtcblxuICAgIC8vIGFib3J0IHNvIGl0IGRvc2Ugbm90IGxvb2sgc3R1Y2tcbiAgICB3aW5kb3cub251bmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGZpbGVTdHJlYW0uYWJvcnQoKTtcbiAgICB9O1xuXG4gICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZXZ0ID0+IHtcbiAgICAgICAgaWYgKCFkb25lKSB7XG4gICAgICAgICAgICBldnQucmV0dXJuVmFsdWUgPSBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxlYXZlP2A7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ1RFJzogJ3RyYWlsZXJzJyxcbiAgICAgICAgICAgICdzdGFydFRpbWUnOiBTdHJpbmcocGVyZm9ybWFuY2Uubm93KCkpLFxuICAgICAgICAgICAgJ3N0YXJ0ZWRfYXQnOiBTdHJpbmcoTWF0aC5mbG9vcihEYXRlLm5vdygpIC0gcGVyZm9ybWFuY2Uubm93KCkpKSxcbiAgICAgICAgICAgICdjYWNoZS1jb250cm9sJzogJ25vLWNhY2hlLCBuby1zdG9yZSwgbWF4LWFnZT0xLCBzLW1heGFnZT0xJ1xuICAgICAgICB9XG4gICAgfSlcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcblxuICAgICAgICAgICAgaWYgKCFyZXMuYm9keSB8fCAhcmVzLm9rKVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IocmVzLnN0YXR1c1RleHQpKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuYm9keS5waXBlVG8oZmlsZVN0cmVhbSk7XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICBwZXJmb3JtYW5jZS5tYXJrKCdkb3dubG9hZDp0ZWFyX2Rvd24nKTtcbiAgICAgICAgICAgIHJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG59XG4iLCAiaW1wb3J0IHsgZG93bmxvYWQgfSBmcm9tIFwiLi9kb3dubG9hZFwiO1xuaW1wb3J0IFBhcGEgZnJvbSAncGFwYXBhcnNlJ1xuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcGFwYVhIUih1cmw6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZywgY2I6IEZ1bmN0aW9uKSB7XG5cbiAgICBwZXJmb3JtYW5jZS5tYXJrKCdYSFI6c3RhcnQnKTtcbiAgICBsZXQgdGltZXJPcGVuID0gdHJ1ZSwgc2VwYXJhdG9yID0gJ1snLCBzdHJpbmdpZmllZCA9ICcnO1xuICAgIFBhcGEucGFyc2UodXJsLCB7XG4gICAgICAgIGRvd25sb2FkOiB0cnVlLFxuICAgICAgICBjaHVua1NpemU6IDcgKiAxMDI0ICogMTAyNCxcbiAgICAgICAgYmVmb3JlRmlyc3RDaHVuazogKGNodW5rKSA9PiB7XG4gICAgICAgICAgICBwZXJmb3JtYW5jZS5tYXJrKCdYSFI6ZmluaXNoJyk7XG4gICAgICAgICAgICByZXR1cm4gY2h1bms7XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZXA6IChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIC8vcGFyc2VkLnB1c2gocmVzdWx0LmRhdGEpXG4gICAgICAgICAgICBzdHJpbmdpZmllZCArPSBzZXBhcmF0b3IgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICBzZXBhcmF0b3IgPSAnLCc7XG4gICAgICAgICAgICBpZiAodGltZXJPcGVuKSB7XG4gICAgICAgICAgICAgICAgdGltZXJPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcGVyZm9ybWFuY2UubWFyaygnUGFyc2U6c3RhcnQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgcGVyZm9ybWFuY2UubWVhc3VyZSgnUGFyc2U6ZW5kJywgJ1BhcnNlOnN0YXJ0Jyk7XG4gICAgICAgICAgICBzdHJpbmdpZmllZCArPSAnXSc7XG4gICAgICAgICAgICBjb25zdCBibG9iVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbc3RyaW5naWZpZWRdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSk7XG4gICAgICAgICAgICBkb3dubG9hZChibG9iVXJsLCAneGhyLmpzb24nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChibG9iVXJsKTtcbiAgICAgICAgICAgICAgICBzdHJpbmdpZmllZCA9ICcnO1xuICAgICAgICAgICAgICAgIHBlcmZvcm1hbmNlLm1hcmsoJ2Rvd25sb2FkOnRlYXJfZG93bicpO1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gcGFwYVN0cmluZyh1cmw6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZywgY2IgPSBGdW5jdGlvbikge1xuICAgIHBlcmZvcm1hbmNlLm1hcmsoJ2ZldGNoOnN0YXJ0Jyk7XG4gICAgZmV0Y2godXJsKS50aGVuKHJlcyA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHJlcy50ZXh0KCk7XG4gICAgfSkudGhlbihjc3ZTdHJpbmcgPT4ge1xuICAgICAgICBwZXJmb3JtYW5jZS5tYXJrKCdmZXRjaDpmaW5pc2gnKTtcblxuICAgICAgICBjb25zdCBibG9iVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbUGFwYS5wYXJzZShjc3ZTdHJpbmcpLmRhdGFdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSk7XG4gICAgICAgIGRvd25sb2FkKGJsb2JVcmwsICdwYXBhX3N0cmluZy5qc29uJywgKCkgPT4ge1xuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChibG9iVXJsKTtcblxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHBhcGFGaWxlKHVybDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nLCBjYiA9IEZ1bmN0aW9uKSB7XG4gICAgcGVyZm9ybWFuY2UubWFyaygnZmV0Y2g6c3RhcnQnKTtcbiAgICBmZXRjaCh1cmwpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5ibG9iKCk7XG4gICAgfSkudGhlbihibG9iID0+IHtcbiAgICAgICAgcGVyZm9ybWFuY2UubWFyaygnZmV0Y2g6ZmluaXNoJyk7XG4gICAgICAgIHZhciBmaWxlID0gbmV3IEZpbGUoW2Jsb2JdLCBcInBhcGFfY3N2LmNzdlwiLCB7IHR5cGU6IFwidGV4dC9jc3ZcIiwgbGFzdE1vZGlmaWVkOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSB9KTtcbiAgICAgICAgcGVyZm9ybWFuY2UubWFyaygnUGFyc2U6c3RhcnQnKTtcbiAgICAgICAgUGFwYS5wYXJzZShmaWxlLCB7XG4gICAgICAgICAgICBjb21wbGV0ZTogKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHBlcmZvcm1hbmNlLm1lYXN1cmUoJ1BhcnNlOmVuZCcsICdQYXJzZTpzdGFydCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2JVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShyZXN1bHQuZGF0YSldLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSk7XG4gICAgICAgICAgICAgICAgZG93bmxvYWQoYmxvYlVybCwgJ3BhcGFGaWxlLmpzb24nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoYmxvYlVybCk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgIH0pO1xufVxuIiwgIi8vLyA8cmVmZXJlbmNlIGxpYj1cImRvbVwiIC8+XG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cInN0cmVhbXNhdmVyXCIgLz5cblxuaW1wb3J0IHsgd2Vic29ja2V0IH0gZnJvbSAnLi9iZW5jaC93ZWJzb2NrZXQnXG5pbXBvcnQgeyBpbml0T2JzZXJ2ZXJzIH0gZnJvbSAnLi9iZW5jaC9vYnNlcnZlcnMnXG5pbXBvcnQgeyBwYXBhWEhSIH0gZnJvbSAnLi9iZW5jaC9wYXBhWEhSJ1xuaW1wb3J0IHsgZG93bmxvYWQgfSBmcm9tICcuL2JlbmNoL2Rvd25sb2FkJ1xuaW1wb3J0IHR5cGUgeyBUYnJpZWZFbnRyeSB9IGZyb20gJy4vYmVuY2gvb2JzZXJ2ZXJzJ1xuXG5cblxuZXhwb3J0IGxldCBlbnRyaWVzID0gW10gYXMgVGJyaWVmRW50cnlbXVxuXG5jb25zdCB7IHBvLCBybywgbGlzdEVudHJpZXMgfSA9IGluaXRPYnNlcnZlcnMoZW50cmllcylcblxuZ2xvYmFsVGhpcy5jb25uZWN0ID0gKGNiKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24ub3JpZ2luKVxuICAgIHVybC5wcm90b2NvbCA9ICd3c3MnXG4gICAgdXJsLnBhdGhuYW1lID0gXCIvY3N2L3dzXCJcbiAgICBnbG9iYWxUaGlzLndzID0gd2Vic29ja2V0KHVybCwgZW50cmllcywgY2IpXG59XG5cblxuXG5cbmdsb2JhbFRoaXMuY29ubmVjdCgoKSA9PiB7XG4gICAgcG8ub2JzZXJ2ZSh7IGVudHJ5VHlwZXM6IFsnbWFyaycsICdtZWFzdXJlJ10gfSk7XG4gICAgcm8ub2JzZXJ2ZSh7IGVudHJ5VHlwZXM6IFsncmVzb3VyY2UnXSB9KVxuXG4gICAgcmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIC8vcGFwYVhIUihcIi9jc3YvcmF3Lmpzb25cIiwgJ3Jhdy5qc29uJywgKCkgPT4geyBsaXN0RW50cmllcygpIH0pXG4gICAgICAgIC8vcGFwYVN0cmluZyhcImh0dHA6Ly9sb2NhbGhvc3Q6ODc4Ny9jc3YvcmF3Lmpzb25cIilcbiAgICAgICAgLy9wYXBhRmlsZShcImh0dHA6Ly9sb2NhbGhvc3Q6ODc4Ny9jc3YvcmF3Lmpzb25cIilcbiAgICAgICAgbGV0IGZpbGVuYW1lID0gbG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpIHx8ICdmZXRjaC5qc29uJ1xuICAgICAgICBjb25zb2xlLmxvZyhmaWxlbmFtZSlcbiAgICAgICAgZG93bmxvYWQoYC9jc3YvJHtmaWxlbmFtZX1gLCBmaWxlbmFtZSwgKCkgPT4geyBsaXN0RW50cmllcygpIH0pXG4gICAgICAgIC8vZG93bmxvYWQoJy9jc3YvdHJhbnNmb3JtLmpzb24nLCAndHJhbnNmb3JtLmpzb24nLCAoKSA9PiB7IGxpc3RFbnRyaWVzKCkgfSlcbiAgICAgICAgLy9kb3dubG9hZCgnL2Nzdi9mZXRjaC5qc29uJywgJ2ZldGNoLmpzb24nLCAoKSA9PiB7IGxpc3RFbnRyaWVzKCkgfSlcblxuICAgIH0pO1xuXG59KVxuXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQyxJQUFDLEVBQUMsR0FBTSxNQUFlO0FBQ3RCLGFBQU8sTUFBVyxjQUNkLEdBQU8sVUFBVSxNQUNqQixPQUFPLFVBQVcsY0FBYyxPQUFPLE9BQU8sT0FBUSxXQUNwRCxPQUFPLEtBQ1AsR0FBSyxLQUFRO0FBQUEsT0FDbEIsZUFBZSxNQUFNO0FBQ3RCO0FBRUEsVUFBTSxJQUFTLE9BQU8sVUFBVyxXQUFXLFNBQVM7QUFDckQsTUFBSyxFQUFPLGVBQWEsUUFBUSxLQUFLO0FBRXRDLFVBQUksSUFBa0IsTUFDbEIsSUFBdUIsSUFDckIsSUFBTyxPQUFNO0FBQUUsWUFBSTtBQUFFO0FBQUEsaUJBQWMsR0FBUDtBQUFBO0FBQUEsU0FDNUIsSUFB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
