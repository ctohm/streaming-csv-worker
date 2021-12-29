(() => {
  var xe = Object.create;
  var de = Object.defineProperty;
  var Le = Object.getOwnPropertyDescriptor;
  var je = Object.getOwnPropertyNames;
  var Ie = Object.getPrototypeOf, Me = Object.prototype.hasOwnProperty;
  var Ae = (u) => de(u, "__esModule", { value: !0 });
  var be = (u, i) => () => (i || u((i = { exports: {} }).exports, i), i.exports);
  var De = (u, i, S) => {
    if (i && typeof i == "object" || typeof i == "function")
      for (let O of je(i))
        !Me.call(u, O) && O !== "default" && de(u, O, { get: () => i[O], enumerable: !(S = Le(i, O)) || S.enumerable });
    return u;
  }, we = (u) => De(Ae(de(u != null ? xe(Ie(u)) : {}, "default", u && u.__esModule && "default" in u ? { get: () => u.default, enumerable: !0 } : { value: u, enumerable: !0 })), u);

  // node_modules/streamsaver/StreamSaver.js
  var Ee = be((he, pe) => {
    ((u, i) => {
      typeof pe != "undefined" ? pe.exports = i() : typeof define == "function" && typeof define.amd == "object" ? define(i) : he[u] = i();
    })("streamSaver", () => {
      "use strict";
      let u = typeof window == "object" ? window : he;
      u.HTMLElement || console.warn("streamsaver is meant to run on browsers main thread");
      let i = null, S = !1, O = (I) => {
        try {
          I();
        } catch (m) {
        }
      }, M = u.WebStreamsPolyfill || {}, v = u.isSecureContext, n = /constructor/i.test(u.HTMLElement) || !!u.safari || !!u.WebKitPoint, T = v || "MozAppearance" in document.documentElement.style ? "iframe" : "navigate", y = {
        createWriteStream: ee,
        WritableStream: u.WritableStream || M.WritableStream,
        supported: !0,
        version: { full: "2.0.5", major: 2, minor: 0, dot: 5 },
        mitm: "https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0"
      };
      function N(I) {
        if (!I)
          throw new Error("meh");
        let m = document.createElement("iframe");
        return m.hidden = !0, m.src = I, m.loaded = !1, m.name = "iframe", m.isIframe = !0, m.postMessage = (...W) => m.contentWindow.postMessage(...W), m.addEventListener("load", () => {
          m.loaded = !0;
        }, { once: !0 }), document.body.appendChild(m), m;
      }
      function j(I) {
        let m = "width=200,height=100", W = document.createDocumentFragment(), x = {
          frame: u.open(I, "popup", m),
          loaded: !1,
          isIframe: !1,
          isPopup: !0,
          remove() {
            x.frame.close();
          },
          addEventListener(...k) {
            W.addEventListener(...k);
          },
          dispatchEvent(...k) {
            W.dispatchEvent(...k);
          },
          removeEventListener(...k) {
            W.removeEventListener(...k);
          },
          postMessage(...k) {
            x.frame.postMessage(...k);
          }
        }, G = (k) => {
          k.source === x.frame && (x.loaded = !0, u.removeEventListener("message", G), x.dispatchEvent(new Event("load")));
        };
        return u.addEventListener("message", G), x;
      }
      try {
        new Response(new ReadableStream()), v && !("serviceWorker" in navigator) && (n = !0);
      } catch (I) {
        n = !0;
      }
      O(() => {
        let { readable: I } = new TransformStream(), m = new MessageChannel();
        m.port1.postMessage(I, [I]), m.port1.close(), m.port2.close(), S = !0, Object.defineProperty(y, "TransformStream", {
          configurable: !1,
          writable: !1,
          value: TransformStream
        });
      });
      function U() {
        i || (i = v ? N(y.mitm) : j(y.mitm));
      }
      function ee(I, m, W) {
        let x = {
          size: null,
          pathname: null,
          writableStrategy: void 0,
          readableStrategy: void 0
        }, G = 0, k = null, Q = null, Z = null;
        if (Number.isFinite(m) ? ([W, m] = [m, W], console.warn("[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream"), x.size = W, x.writableStrategy = m) : m && m.highWaterMark ? (console.warn("[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream"), x.size = W, x.writableStrategy = m) : x = m || {}, !n) {
          U(), Q = new MessageChannel(), I = encodeURIComponent(I.replace(/\//g, ":")).replace(/['()]/g, escape).replace(/\*/g, "%2A");
          let t = {
            transferringReadable: S,
            pathname: x.pathname || Math.random().toString().slice(-6) + "/" + I,
            headers: {
              "Content-Type": "application/octet-stream; charset=utf-8",
              "Content-Disposition": "attachment; filename*=UTF-8''" + I
            }
          };
          x.size && (t.headers["Content-Length"] = x.size);
          let e = [t, "*", [Q.port2]];
          if (S) {
            let r = T === "iframe" ? void 0 : {
              transform(o, h) {
                if (!(o instanceof Uint8Array))
                  throw new TypeError("Can only wirte Uint8Arrays");
                G += o.length, h.enqueue(o), k && (location.href = k, k = null);
              },
              flush() {
                k && (location.href = k);
              }
            };
            Z = new y.TransformStream(r, x.writableStrategy, x.readableStrategy);
            let s = Z.readable;
            Q.port1.postMessage({ readableStream: s }, [s]);
          }
          Q.port1.onmessage = (r) => {
            r.data.download && (T === "navigate" ? (i.remove(), i = null, G ? location.href = r.data.download : k = r.data.download) : (i.isPopup && (i.remove(), i = null, T === "iframe" && N(y.mitm)), N(r.data.download)));
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
            Q.port1.postMessage(t), G += t.length, k && (location.href = k, k = null);
          },
          close() {
            if (n) {
              let t = new Blob(b, { type: "application/octet-stream; charset=utf-8" }), e = document.createElement("a");
              e.href = URL.createObjectURL(t), e.download = I, e.click();
            } else
              Q.port1.postMessage("end");
          },
          abort() {
            b = [], Q.port1.postMessage("abort"), Q.port1.onmessage = null, Q.port1.close(), Q.port2.close(), Q = null;
          }
        }, x.writableStrategy);
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
      var i = typeof self != "undefined" ? self : typeof window != "undefined" ? window : i !== void 0 ? i : {}, S = !i.document && !!i.postMessage, O = S && /blob:/i.test((i.location || {}).protocol), M = {}, v = 0, n = { parse: function(t, e) {
        var r = (e = e || {}).dynamicTyping || !1;
        if (b(r) && (e.dynamicTypingFunction = r, r = {}), e.dynamicTyping = r, e.transform = !!b(e.transform) && e.transform, e.worker && n.WORKERS_SUPPORTED) {
          var s = function() {
            if (!n.WORKERS_SUPPORTED)
              return !1;
            var h = (q = i.URL || i.webkitURL || null, L = u.toString(), n.BLOB_URL || (n.BLOB_URL = q.createObjectURL(new Blob(["(", L, ")();"], { type: "text/javascript" })))), g = new i.Worker(h), q, L;
            return g.onmessage = x, g.id = v++, M[g.id] = g;
          }();
          return s.userStep = e.step, s.userChunk = e.chunk, s.userComplete = e.complete, s.userError = e.error, e.step = b(e.step), e.chunk = b(e.chunk), e.complete = b(e.complete), e.error = b(e.error), delete e.worker, void s.postMessage({ input: t, config: e, workerId: s.id });
        }
        var o = null;
        return n.NODE_STREAM_INPUT, typeof t == "string" ? o = e.download ? new N(e) : new U(e) : t.readable === !0 && b(t.read) && b(t.on) ? o = new ee(e) : (i.File && t instanceof File || t instanceof Object) && (o = new j(e)), o.stream(t);
      }, unparse: function(t, e) {
        var r = !1, s = !0, o = ",", h = `\r
`, g = '"', q = g + g, L = !1, l = null, A = !1;
        (function() {
          if (typeof e == "object") {
            if (typeof e.delimiter != "string" || n.BAD_DELIMITERS.filter(function(a) {
              return e.delimiter.indexOf(a) !== -1;
            }).length || (o = e.delimiter), (typeof e.quotes == "boolean" || typeof e.quotes == "function" || Array.isArray(e.quotes)) && (r = e.quotes), typeof e.skipEmptyLines != "boolean" && typeof e.skipEmptyLines != "string" || (L = e.skipEmptyLines), typeof e.newline == "string" && (h = e.newline), typeof e.quoteChar == "string" && (g = e.quoteChar), typeof e.header == "boolean" && (s = e.header), Array.isArray(e.columns)) {
              if (e.columns.length === 0)
                throw new Error("Option columns is empty");
              l = e.columns;
            }
            e.escapeChar !== void 0 && (q = e.escapeChar + g), typeof e.escapeFormulae == "boolean" && (A = e.escapeFormulae);
          }
        })();
        var d = new RegExp(m(g), "g");
        if (typeof t == "string" && (t = JSON.parse(t)), Array.isArray(t)) {
          if (!t.length || Array.isArray(t[0]))
            return re(null, t, L);
          if (typeof t[0] == "object")
            return re(l || Object.keys(t[0]), t, L);
        } else if (typeof t == "object")
          return typeof t.data == "string" && (t.data = JSON.parse(t.data)), Array.isArray(t.data) && (t.fields || (t.fields = t.meta && t.meta.fields), t.fields || (t.fields = Array.isArray(t.data[0]) ? t.fields : typeof t.data[0] == "object" ? Object.keys(t.data[0]) : []), Array.isArray(t.data[0]) || typeof t.data[0] == "object" || (t.data = [t.data])), re(t.fields || [], t.data || [], L);
        throw new Error("Unable to serialize unrecognized input");
        function re(a, R, D) {
          var K = "";
          typeof a == "string" && (a = JSON.parse(a)), typeof R == "string" && (R = JSON.parse(R));
          var B = Array.isArray(a) && 0 < a.length, P = !Array.isArray(R[0]);
          if (B && s) {
            for (var z = 0; z < a.length; z++)
              0 < z && (K += o), K += H(a[z], z);
            0 < R.length && (K += h);
          }
          for (var c = 0; c < R.length; c++) {
            var w = B ? a.length : R[c].length, E = !1, C = B ? Object.keys(R[c]).length === 0 : R[c].length === 0;
            if (D && !B && (E = D === "greedy" ? R[c].join("").trim() === "" : R[c].length === 1 && R[c][0].length === 0), D === "greedy" && B) {
              for (var _ = [], p = 0; p < w; p++) {
                var F = P ? a[p] : p;
                _.push(R[c][F]);
              }
              E = _.join("").trim() === "";
            }
            if (!E) {
              for (var f = 0; f < w; f++) {
                0 < f && !C && (K += o);
                var $ = B && P ? a[f] : f;
                K += H(R[c][$], f);
              }
              c < R.length - 1 && (!D || 0 < w && !C) && (K += h);
            }
          }
          return K;
        }
        function H(a, R) {
          if (a == null)
            return "";
          if (a.constructor === Date)
            return JSON.stringify(a).slice(1, 25);
          A === !0 && typeof a == "string" && a.match(/^[=+\-@].*$/) !== null && (a = "'" + a);
          var D = a.toString().replace(d, q), K = typeof r == "boolean" && r || typeof r == "function" && r(a, R) || Array.isArray(r) && r[R] || function(B, P) {
            for (var z = 0; z < P.length; z++)
              if (-1 < B.indexOf(P[z]))
                return !0;
            return !1;
          }(D, n.BAD_DELIMITERS) || -1 < D.indexOf(o) || D.charAt(0) === " " || D.charAt(D.length - 1) === " ";
          return K ? g + D + g : D;
        }
      } };
      if (n.RECORD_SEP = String.fromCharCode(30), n.UNIT_SEP = String.fromCharCode(31), n.BYTE_ORDER_MARK = "\uFEFF", n.BAD_DELIMITERS = ["\r", `
`, '"', n.BYTE_ORDER_MARK], n.WORKERS_SUPPORTED = !S && !!i.Worker, n.NODE_STREAM_INPUT = 1, n.LocalChunkSize = 10485760, n.RemoteChunkSize = 5242880, n.DefaultDelimiter = ",", n.Parser = W, n.ParserHandle = I, n.NetworkStreamer = N, n.FileStreamer = j, n.StringStreamer = U, n.ReadableStreamStreamer = ee, i.jQuery) {
        var T = i.jQuery;
        T.fn.parse = function(t) {
          var e = t.config || {}, r = [];
          return this.each(function(h) {
            if (!(T(this).prop("tagName").toUpperCase() === "INPUT" && T(this).attr("type").toLowerCase() === "file" && i.FileReader) || !this.files || this.files.length === 0)
              return !0;
            for (var g = 0; g < this.files.length; g++)
              r.push({ file: this.files[g], inputElem: this, instanceConfig: T.extend({}, e) });
          }), s(), this;
          function s() {
            if (r.length !== 0) {
              var h, g, q, L, l = r[0];
              if (b(t.before)) {
                var A = t.before(l.file, l.inputElem);
                if (typeof A == "object") {
                  if (A.action === "abort")
                    return h = "AbortError", g = l.file, q = l.inputElem, L = A.reason, void (b(t.error) && t.error({ name: h }, g, q, L));
                  if (A.action === "skip")
                    return void o();
                  typeof A.config == "object" && (l.instanceConfig = T.extend(l.instanceConfig, A.config));
                } else if (A === "skip")
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
          r.chunkSize = parseInt(r.chunkSize), e.step || e.chunk || (r.chunkSize = null), this._handle = new I(r), (this._handle.streamer = this)._config = r;
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
            if (O)
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
          b(this._config.error) ? this._config.error(e) : O && this._config.error && i.postMessage({ workerId: n.WORKER_ID, error: e, finished: !1 });
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
            } catch (h) {
              this._chunkError(h.message);
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
      function j(t) {
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
      function I(t) {
        var e, r, s, o = Math.pow(2, 53), h = -o, g = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, q = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/, L = this, l = 0, A = 0, d = !1, re = !1, H = [], a = { data: [], errors: [], meta: {} };
        if (b(t.step)) {
          var R = t.step;
          t.step = function(c) {
            if (a = c, B())
              K();
            else {
              if (K(), a.data.length === 0)
                return;
              l += c.data.length, t.preview && l > t.preview ? r.abort() : (a.data = a.data[0], R(a, L));
            }
          };
        }
        function D(c) {
          return t.skipEmptyLines === "greedy" ? c.join("").trim() === "" : c.length === 1 && c[0].length === 0;
        }
        function K() {
          if (a && s && (z("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + n.DefaultDelimiter + "'"), s = !1), t.skipEmptyLines)
            for (var c = 0; c < a.data.length; c++)
              D(a.data[c]) && a.data.splice(c--, 1);
          return B() && function() {
            if (!a)
              return;
            function w(C, _) {
              b(t.transformHeader) && (C = t.transformHeader(C, _)), H.push(C);
            }
            if (Array.isArray(a.data[0])) {
              for (var E = 0; B() && E < a.data.length; E++)
                a.data[E].forEach(w);
              a.data.splice(0, 1);
            } else
              a.data.forEach(w);
          }(), function() {
            if (!a || !t.header && !t.dynamicTyping && !t.transform)
              return a;
            function w(C, _) {
              var p, F = t.header ? {} : [];
              for (p = 0; p < C.length; p++) {
                var f = p, $ = C[p];
                t.header && (f = p >= H.length ? "__parsed_extra" : H[p]), t.transform && ($ = t.transform($, f)), $ = P(f, $), f === "__parsed_extra" ? (F[f] = F[f] || [], F[f].push($)) : F[f] = $;
              }
              return t.header && (p > H.length ? z("FieldMismatch", "TooManyFields", "Too many fields: expected " + H.length + " fields but parsed " + p, A + _) : p < H.length && z("FieldMismatch", "TooFewFields", "Too few fields: expected " + H.length + " fields but parsed " + p, A + _)), F;
            }
            var E = 1;
            return !a.data.length || Array.isArray(a.data[0]) ? (a.data = a.data.map(w), E = a.data.length) : a.data = w(a.data, 0), t.header && a.meta && (a.meta.fields = H), A += E, a;
          }();
        }
        function B() {
          return t.header && H.length === 0;
        }
        function P(c, w) {
          return E = c, t.dynamicTypingFunction && t.dynamicTyping[E] === void 0 && (t.dynamicTyping[E] = t.dynamicTypingFunction(E)), (t.dynamicTyping[E] || t.dynamicTyping) === !0 ? w === "true" || w === "TRUE" || w !== "false" && w !== "FALSE" && (function(C) {
            if (g.test(C)) {
              var _ = parseFloat(C);
              if (h < _ && _ < o)
                return !0;
            }
            return !1;
          }(w) ? parseFloat(w) : q.test(w) ? new Date(w) : w === "" ? null : w) : w;
          var E;
        }
        function z(c, w, E, C) {
          var _ = { type: c, code: w, message: E };
          C !== void 0 && (_.row = C), a.errors.push(_);
        }
        this.parse = function(c, w, E) {
          var C = t.quoteChar || '"';
          if (t.newline || (t.newline = function(F, f) {
            F = F.substring(0, 1048576);
            var $ = new RegExp(m(f) + "([^]*?)" + m(f), "gm"), te = (F = F.replace($, "")).split("\r"), Y = F.split(`
`), se = 1 < Y.length && Y[0].length < te[0].length;
            if (te.length === 1 || se)
              return `
`;
            for (var ne = 0, V = 0; V < te.length; V++)
              te[V][0] === `
` && ne++;
            return ne >= te.length / 2 ? `\r
` : "\r";
          }(c, C)), s = !1, t.delimiter)
            b(t.delimiter) && (t.delimiter = t.delimiter(c), a.meta.delimiter = t.delimiter);
          else {
            var _ = function(F, f, $, te, Y) {
              var se, ne, V, J;
              Y = Y || [",", "	", "|", ";", n.RECORD_SEP, n.UNIT_SEP];
              for (var ae = 0; ae < Y.length; ae++) {
                var X = Y[ae], oe = 0, ie = 0, _e = 0;
                V = void 0;
                for (var le = new W({ comments: te, delimiter: X, newline: f, preview: 10 }).parse(F), ce = 0; ce < le.data.length; ce++)
                  if ($ && D(le.data[ce]))
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
          return t.preview && t.header && p.preview++, e = c, r = new W(p), a = r.parse(e, w, E), K(), d ? { meta: { paused: !0 } } : a || { meta: { paused: !1 } };
        }, this.paused = function() {
          return d;
        }, this.pause = function() {
          d = !0, r.abort(), e = b(t.chunk) ? "" : e.substring(r.getCharIndex());
        }, this.resume = function() {
          L.streamer._halted ? (d = !1, L.streamer.parseChunk(e, !0)) : setTimeout(L.resume, 3);
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
        var e, r = (t = t || {}).delimiter, s = t.newline, o = t.comments, h = t.step, g = t.preview, q = t.fastMode, L = e = t.quoteChar === void 0 ? '"' : t.quoteChar;
        if (t.escapeChar !== void 0 && (L = t.escapeChar), (typeof r != "string" || -1 < n.BAD_DELIMITERS.indexOf(r)) && (r = ","), o === r)
          throw new Error("Comment character same as delimiter");
        o === !0 ? o = "#" : (typeof o != "string" || -1 < n.BAD_DELIMITERS.indexOf(o)) && (o = !1), s !== `
` && s !== "\r" && s !== `\r
` && (s = `
`);
        var l = 0, A = !1;
        this.parse = function(d, re, H) {
          if (typeof d != "string")
            throw new Error("Input must be a string");
          var a = d.length, R = r.length, D = s.length, K = o.length, B = b(h), P = [], z = [], c = [], w = l = 0;
          if (!d)
            return J();
          if (q || q !== !1 && d.indexOf(e) === -1) {
            for (var E = d.split(s), C = 0; C < E.length; C++) {
              if (c = E[C], l += c.length, C !== E.length - 1)
                l += s.length;
              else if (H)
                return J();
              if (!o || c.substring(0, K) !== o) {
                if (B) {
                  if (P = [], Y(c.split(r)), ae(), A)
                    return J();
                } else
                  Y(c.split(r));
                if (g && g <= C)
                  return P = P.slice(0, g), J(!0);
              }
            }
            return J();
          }
          for (var _ = d.indexOf(r, l), p = d.indexOf(s, l), F = new RegExp(m(L) + m(e), "g"), f = d.indexOf(e, l); ; )
            if (d[l] !== e)
              if (o && c.length === 0 && d.substring(l, l + K) === o) {
                if (p === -1)
                  return J();
                l = p + D, p = d.indexOf(s, l), _ = d.indexOf(r, l);
              } else if (_ !== -1 && (_ < p || p === -1))
                c.push(d.substring(l, _)), l = _ + R, _ = d.indexOf(r, l);
              else {
                if (p === -1)
                  break;
                if (c.push(d.substring(l, p)), V(p + D), B && (ae(), A))
                  return J();
                if (g && P.length >= g)
                  return J(!0);
              }
            else
              for (f = l, l++; ; ) {
                if ((f = d.indexOf(e, f + 1)) === -1)
                  return H || z.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: P.length, index: l }), ne();
                if (f === a - 1)
                  return ne(d.substring(l, f).replace(F, e));
                if (e !== L || d[f + 1] !== L) {
                  if (e === L || f === 0 || d[f - 1] !== L) {
                    _ !== -1 && _ < f + 1 && (_ = d.indexOf(r, f + 1)), p !== -1 && p < f + 1 && (p = d.indexOf(s, f + 1));
                    var $ = se(p === -1 ? _ : Math.min(_, p));
                    if (d[f + 1 + $] === r) {
                      c.push(d.substring(l, f).replace(F, e)), d[l = f + 1 + $ + R] !== e && (f = d.indexOf(e, l)), _ = d.indexOf(r, l), p = d.indexOf(s, l);
                      break;
                    }
                    var te = se(p);
                    if (d.substring(f + 1 + te, f + 1 + te + D) === s) {
                      if (c.push(d.substring(l, f).replace(F, e)), V(f + 1 + te + D), _ = d.indexOf(r, l), f = d.indexOf(e, l), B && (ae(), A))
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
          function Y(X) {
            P.push(X), w = l;
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
            return { data: P, errors: z, meta: { delimiter: r, linebreak: s, aborted: A, truncated: !!X, cursor: w + (re || 0) } };
          }
          function ae() {
            h(J()), P = [], z = [];
          }
        }, this.abort = function() {
          A = !0;
        }, this.getCharIndex = function() {
          return l;
        };
      }
      function x(t) {
        var e = t.data, r = M[e.workerId], s = !1;
        if (e.error)
          r.userError(e.error, e.file);
        else if (e.results && e.results.data) {
          var o = { abort: function() {
            s = !0, G(e.workerId, { data: [], errors: [], meta: { aborted: !0 } });
          }, pause: k, resume: k };
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
        var r = M[t];
        b(r.userComplete) && r.userComplete(e), r.terminate(), delete M[t];
      }
      function k() {
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
      return O && (i.onmessage = function(t) {
        var e = t.data;
        if (n.WORKER_ID === void 0 && e && (n.WORKER_ID = e.workerId), typeof e.input == "string")
          i.postMessage({ workerId: n.WORKER_ID, results: n.parse(e.input, e.config), finished: !0 });
        else if (i.File && e.input instanceof File || e.input instanceof Object) {
          var r = n.parse(e.input, e.config);
          r && i.postMessage({ workerId: n.WORKER_ID, results: r, finished: !0 });
        }
      }), (N.prototype = Object.create(y.prototype)).constructor = N, (j.prototype = Object.create(y.prototype)).constructor = j, (U.prototype = Object.create(U.prototype)).constructor = U, (ee.prototype = Object.create(y.prototype)).constructor = ee, n;
    });
  });

  // src/bench/websocket.ts
  function ve(u, i, S) {
    let O = new WebSocket(u);
    if (!O)
      throw new Error("server didn't accept ws");
    return O.addEventListener("open", () => {
      console.log("Opened websocket"), S();
    }), O.addEventListener("message", ({ data: M }) => {
      let { count: v, tz: n, error: T, name: y, duration: N, endTime: j } = JSON.parse(M);
      if (y && N && j) {
        let U = j - N, ee = { name: y, duration: N, startTime: U, entryType: "server", endTime: j };
        console.info(ee), i.push(ee);
      } else
        T ? console.error(T) : console.info({ count: v, tz: n, error: T });
    }), O.addEventListener("close", () => {
      console.log("Closed websocket");
    }), O;
  }

  // src/bench/observers.ts
  function ke(u) {
    let i = new PerformanceObserver((M) => {
      M.getEntries().forEach((v) => {
        let { startTime: n, duration: T, name: y, entryType: N } = v;
        n = Math.floor(n), T = Math.floor(T);
        let j = n + T, U = { name: y, endTime: j, startTime: n, duration: T, entryType: N };
        console.log(U), u.push(U);
      });
    }), S = new PerformanceObserver((M) => {
      M.getEntriesByType("resource").forEach((v) => {
        let { startTime: n, duration: T, name: y, entryType: N, responseStart: j, responseEnd: U, serverTiming: ee } = v;
        y.includes("mitm") || y.includes("favicon") || (n = Math.floor(n), T = Math.floor(T), U = Math.floor(U), j = Math.floor(j), /^https?:\/\//.test(y) && (y = String(y.split("/").pop())), ee.forEach((I) => {
          let { name: m, duration: W, description: x } = I, G = Number(x.replace("endtime:", "")), k = G - W;
          console.log({ name: m, duration: W, startTime: k, entryType: "server", endTime: G });
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
            duration: j - n,
            endTime: j,
            entryType: "resource"
          },
          {
            name: "download:response_complete",
            startTime: j - n,
            duration: U - j,
            endTime: U,
            entryType: "resource"
          }
        ]), console.log(v.toJSON()));
      });
    });
    return { ro: S, po: i, listEntries: () => {
      let M = u.sort((v, n) => v.endTime - n.endTime).reduce((v, n) => {
        let { name: T, endTime: y, startTime: N, duration: j, entryType: U } = n;
        return v[T] = { endTime: y, startTime: N, duration: j, entryType: U }, v;
      }, {});
      window.requestIdleCallback(() => {
        console.table(M), i && i.disconnect(), S && S.disconnect();
      });
    } };
  }

  // src/bench/download.ts
  var me = we(Ee());
  function fe(u, i = "file.txt", S) {
    let O = !1;
    console.log({ url: u }), performance.mark("download:start");
    let M = !1;
    me.default.mitm = `${location.origin}/mitm.html`;
    let v = me.default.createWriteStream(i);
    return window.onunload = () => {
      v.abort();
    }, window.onbeforeunload = (n) => {
      M || (n.returnValue = "Are you sure you want to leave?");
    }, fetch(u, {
      headers: {
        TE: "trailers",
        startTime: String(performance.now()),
        started_at: String(Math.floor(Date.now() - performance.now())),
        "cache-control": "no-cache, no-store, max-age=1, s-maxage=1"
      }
    }).then((n) => !n.body || !n.ok ? Promise.reject(new Error(n.statusText)) : n.body.pipeTo(v)).then(() => {
      M = !0, performance.mark("download:tear_down"), requestIdleCallback(() => {
        S();
      });
    });
  }

  // src/bench/papaXHR.ts
  var Te = we(Se());
  async function Re(u, i, S) {
    performance.mark("XHR:start");
    let O = !0, M = "[", v = "";
    Te.default.parse(u, {
      download: !0,
      chunkSize: 7 * 1024 * 1024,
      beforeFirstChunk: (n) => (performance.mark("XHR:finish"), n),
      step: (n) => {
        v += M + JSON.stringify(n.data), M = ",", O && (O = !1, performance.mark("Parse:start"));
      },
      complete: () => {
        performance.measure("Parse:end", "Parse:start"), v += "]";
        let n = URL.createObjectURL(new Blob([v], { type: "application/json" }));
        fe(n, "xhr.json", () => {
          URL.revokeObjectURL(n), v = "", performance.mark("download:tear_down"), S();
        });
      }
    });
  }

  // src/bench.ts
  var Ce = [], { po: Ue, ro: Fe, listEntries: Oe } = ke(Ce);
  globalThis.connect = (u) => {
    let i = new URL(window.location.origin);
    i.protocol = "wss", i.pathname = "/csv/ws", globalThis.ws = ve(i, Ce, u);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL3N0cmVhbXNhdmVyL1N0cmVhbVNhdmVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wYXBhcGFyc2UvcGFwYXBhcnNlLm1pbi5qcyIsICIuLi9zcmMvYmVuY2gvd2Vic29ja2V0LnRzIiwgIi4uL3NyYy9iZW5jaC9vYnNlcnZlcnMudHMiLCAiLi4vc3JjL2JlbmNoL2Rvd25sb2FkLnRzIiwgIi4uL3NyYy9iZW5jaC9wYXBhWEhSLnRzIiwgIi4uL3NyYy9iZW5jaC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyogZ2xvYmFsIGNocm9tZSBsb2NhdGlvbiBSZWFkYWJsZVN0cmVhbSBkZWZpbmUgTWVzc2FnZUNoYW5uZWwgVHJhbnNmb3JtU3RyZWFtICovXG5cbjsoKG5hbWUsIGRlZmluaXRpb24pID0+IHtcbiAgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpXG4gICAgOiB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0J1xuICAgICAgPyBkZWZpbmUoZGVmaW5pdGlvbilcbiAgICAgIDogdGhpc1tuYW1lXSA9IGRlZmluaXRpb24oKVxufSkoJ3N0cmVhbVNhdmVyJywgKCkgPT4ge1xuICAndXNlIHN0cmljdCdcblxuICBjb25zdCBnbG9iYWwgPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyA/IHdpbmRvdyA6IHRoaXNcbiAgaWYgKCFnbG9iYWwuSFRNTEVsZW1lbnQpIGNvbnNvbGUud2Fybignc3RyZWFtc2F2ZXIgaXMgbWVhbnQgdG8gcnVuIG9uIGJyb3dzZXJzIG1haW4gdGhyZWFkJylcblxuICBsZXQgbWl0bVRyYW5zcG9ydGVyID0gbnVsbFxuICBsZXQgc3VwcG9ydHNUcmFuc2ZlcmFibGUgPSBmYWxzZVxuICBjb25zdCB0ZXN0ID0gZm4gPT4geyB0cnkgeyBmbigpIH0gY2F0Y2ggKGUpIHt9IH1cbiAgY29uc3QgcG9ueWZpbGwgPSBnbG9iYWwuV2ViU3RyZWFtc1BvbHlmaWxsIHx8IHt9XG4gIGNvbnN0IGlzU2VjdXJlQ29udGV4dCA9IGdsb2JhbC5pc1NlY3VyZUNvbnRleHRcbiAgLy8gVE9ETzogTXVzdCBjb21lIHVwIHdpdGggYSByZWFsIGRldGVjdGlvbiB0ZXN0ICgjNjkpXG4gIGxldCB1c2VCbG9iRmFsbGJhY2sgPSAvY29uc3RydWN0b3IvaS50ZXN0KGdsb2JhbC5IVE1MRWxlbWVudCkgfHwgISFnbG9iYWwuc2FmYXJpIHx8ICEhZ2xvYmFsLldlYktpdFBvaW50XG4gIGNvbnN0IGRvd25sb2FkU3RyYXRlZ3kgPSBpc1NlY3VyZUNvbnRleHQgfHwgJ01vekFwcGVhcmFuY2UnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZVxuICAgID8gJ2lmcmFtZSdcbiAgICA6ICduYXZpZ2F0ZSdcblxuICBjb25zdCBzdHJlYW1TYXZlciA9IHtcbiAgICBjcmVhdGVXcml0ZVN0cmVhbSxcbiAgICBXcml0YWJsZVN0cmVhbTogZ2xvYmFsLldyaXRhYmxlU3RyZWFtIHx8IHBvbnlmaWxsLldyaXRhYmxlU3RyZWFtLFxuICAgIHN1cHBvcnRlZDogdHJ1ZSxcbiAgICB2ZXJzaW9uOiB7IGZ1bGw6ICcyLjAuNScsIG1ham9yOiAyLCBtaW5vcjogMCwgZG90OiA1IH0sXG4gICAgbWl0bTogJ2h0dHBzOi8vamltbXl3YXJ0aW5nLmdpdGh1Yi5pby9TdHJlYW1TYXZlci5qcy9taXRtLmh0bWw/dmVyc2lvbj0yLjAuMCdcbiAgfVxuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSBoaWRkZW4gaWZyYW1lIGFuZCBhcHBlbmQgaXQgdG8gdGhlIERPTSAoYm9keSlcbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSBzcmMgcGFnZSB0byBsb2FkXG4gICAqIEByZXR1cm4ge0hUTUxJRnJhbWVFbGVtZW50fSBwYWdlIHRvIGxvYWRcbiAgICovXG4gIGZ1bmN0aW9uIG1ha2VJZnJhbWUgKHNyYykge1xuICAgIGlmICghc3JjKSB0aHJvdyBuZXcgRXJyb3IoJ21laCcpXG4gICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJylcbiAgICBpZnJhbWUuaGlkZGVuID0gdHJ1ZVxuICAgIGlmcmFtZS5zcmMgPSBzcmNcbiAgICBpZnJhbWUubG9hZGVkID0gZmFsc2VcbiAgICBpZnJhbWUubmFtZSA9ICdpZnJhbWUnXG4gICAgaWZyYW1lLmlzSWZyYW1lID0gdHJ1ZVxuICAgIGlmcmFtZS5wb3N0TWVzc2FnZSA9ICguLi5hcmdzKSA9PiBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSguLi5hcmdzKVxuICAgIGlmcmFtZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgaWZyYW1lLmxvYWRlZCA9IHRydWVcbiAgICB9LCB7IG9uY2U6IHRydWUgfSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSlcbiAgICByZXR1cm4gaWZyYW1lXG4gIH1cblxuICAvKipcbiAgICogY3JlYXRlIGEgcG9wdXAgdGhhdCBzaW11bGF0ZXMgdGhlIGJhc2ljIHRoaW5nc1xuICAgKiBvZiB3aGF0IGEgaWZyYW1lIGNhbiBkb1xuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHNyYyBwYWdlIHRvIGxvYWRcbiAgICogQHJldHVybiB7b2JqZWN0fSAgICAgaWZyYW1lIGxpa2Ugb2JqZWN0XG4gICAqL1xuICBmdW5jdGlvbiBtYWtlUG9wdXAgKHNyYykge1xuICAgIGNvbnN0IG9wdGlvbnMgPSAnd2lkdGg9MjAwLGhlaWdodD0xMDAnXG4gICAgY29uc3QgZGVsZWdhdGUgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICBjb25zdCBwb3B1cCA9IHtcbiAgICAgIGZyYW1lOiBnbG9iYWwub3BlbihzcmMsICdwb3B1cCcsIG9wdGlvbnMpLFxuICAgICAgbG9hZGVkOiBmYWxzZSxcbiAgICAgIGlzSWZyYW1lOiBmYWxzZSxcbiAgICAgIGlzUG9wdXA6IHRydWUsXG4gICAgICByZW1vdmUgKCkgeyBwb3B1cC5mcmFtZS5jbG9zZSgpIH0sXG4gICAgICBhZGRFdmVudExpc3RlbmVyICguLi5hcmdzKSB7IGRlbGVnYXRlLmFkZEV2ZW50TGlzdGVuZXIoLi4uYXJncykgfSxcbiAgICAgIGRpc3BhdGNoRXZlbnQgKC4uLmFyZ3MpIHsgZGVsZWdhdGUuZGlzcGF0Y2hFdmVudCguLi5hcmdzKSB9LFxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lciAoLi4uYXJncykgeyBkZWxlZ2F0ZS5yZW1vdmVFdmVudExpc3RlbmVyKC4uLmFyZ3MpIH0sXG4gICAgICBwb3N0TWVzc2FnZSAoLi4uYXJncykgeyBwb3B1cC5mcmFtZS5wb3N0TWVzc2FnZSguLi5hcmdzKSB9XG4gICAgfVxuXG4gICAgY29uc3Qgb25SZWFkeSA9IGV2dCA9PiB7XG4gICAgICBpZiAoZXZ0LnNvdXJjZSA9PT0gcG9wdXAuZnJhbWUpIHtcbiAgICAgICAgcG9wdXAubG9hZGVkID0gdHJ1ZVxuICAgICAgICBnbG9iYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uUmVhZHkpXG4gICAgICAgIHBvcHVwLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2FkJykpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvblJlYWR5KVxuXG4gICAgcmV0dXJuIHBvcHVwXG4gIH1cblxuICB0cnkge1xuICAgIC8vIFdlIGNhbid0IGxvb2sgZm9yIHNlcnZpY2Ugd29ya2VyIHNpbmNlIGl0IG1heSBzdGlsbCB3b3JrIG9uIGh0dHBcbiAgICBuZXcgUmVzcG9uc2UobmV3IFJlYWRhYmxlU3RyZWFtKCkpXG4gICAgaWYgKGlzU2VjdXJlQ29udGV4dCAmJiAhKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpKSB7XG4gICAgICB1c2VCbG9iRmFsbGJhY2sgPSB0cnVlXG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICB1c2VCbG9iRmFsbGJhY2sgPSB0cnVlXG4gIH1cblxuICB0ZXN0KCgpID0+IHtcbiAgICAvLyBUcmFuc2ZhcmlhYmxlIHN0cmVhbSB3YXMgZmlyc3QgZW5hYmxlZCBpbiBjaHJvbWUgdjczIGJlaGluZCBhIGZsYWdcbiAgICBjb25zdCB7IHJlYWRhYmxlIH0gPSBuZXcgVHJhbnNmb3JtU3RyZWFtKClcbiAgICBjb25zdCBtYyA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpXG4gICAgbWMucG9ydDEucG9zdE1lc3NhZ2UocmVhZGFibGUsIFtyZWFkYWJsZV0pXG4gICAgbWMucG9ydDEuY2xvc2UoKVxuICAgIG1jLnBvcnQyLmNsb3NlKClcbiAgICBzdXBwb3J0c1RyYW5zZmVyYWJsZSA9IHRydWVcbiAgICAvLyBGcmVlemUgVHJhbnNmb3JtU3RyZWFtIG9iamVjdCAoY2FuIG9ubHkgd29yayB3aXRoIG5hdGl2ZSlcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3RyZWFtU2F2ZXIsICdUcmFuc2Zvcm1TdHJlYW0nLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IFRyYW5zZm9ybVN0cmVhbVxuICAgIH0pXG4gIH0pXG5cbiAgZnVuY3Rpb24gbG9hZFRyYW5zcG9ydGVyICgpIHtcbiAgICBpZiAoIW1pdG1UcmFuc3BvcnRlcikge1xuICAgICAgbWl0bVRyYW5zcG9ydGVyID0gaXNTZWN1cmVDb250ZXh0XG4gICAgICAgID8gbWFrZUlmcmFtZShzdHJlYW1TYXZlci5taXRtKVxuICAgICAgICA6IG1ha2VQb3B1cChzdHJlYW1TYXZlci5taXRtKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGZpbGVuYW1lIGZpbGVuYW1lIHRoYXQgc2hvdWxkIGJlIHVzZWRcbiAgICogQHBhcmFtICB7b2JqZWN0fSBvcHRpb25zICBbZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAge251bWJlcn0gc2l6ZSAgICAgZGVwcmljYXRlZFxuICAgKiBAcmV0dXJuIHtXcml0YWJsZVN0cmVhbTxVaW50OEFycmF5Pn1cbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZVdyaXRlU3RyZWFtIChmaWxlbmFtZSwgb3B0aW9ucywgc2l6ZSkge1xuICAgIGxldCBvcHRzID0ge1xuICAgICAgc2l6ZTogbnVsbCxcbiAgICAgIHBhdGhuYW1lOiBudWxsLFxuICAgICAgd3JpdGFibGVTdHJhdGVneTogdW5kZWZpbmVkLFxuICAgICAgcmVhZGFibGVTdHJhdGVneTogdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgbGV0IGJ5dGVzV3JpdHRlbiA9IDAgLy8gYnkgU3RyZWFtU2F2ZXIuanMgKG5vdCB0aGUgc2VydmljZSB3b3JrZXIpXG4gICAgbGV0IGRvd25sb2FkVXJsID0gbnVsbFxuICAgIGxldCBjaGFubmVsID0gbnVsbFxuICAgIGxldCB0cyA9IG51bGxcblxuICAgIC8vIG5vcm1hbGl6ZSBhcmd1bWVudHNcbiAgICBpZiAoTnVtYmVyLmlzRmluaXRlKG9wdGlvbnMpKSB7XG4gICAgICBbIHNpemUsIG9wdGlvbnMgXSA9IFsgb3B0aW9ucywgc2l6ZSBdXG4gICAgICBjb25zb2xlLndhcm4oJ1tTdHJlYW1TYXZlcl0gRGVwcmljYXRlZCBwYXNzIGFuIG9iamVjdCBhcyAybmQgYXJndW1lbnQgd2hlbiBjcmVhdGluZyBhIHdyaXRlIHN0cmVhbScpXG4gICAgICBvcHRzLnNpemUgPSBzaXplXG4gICAgICBvcHRzLndyaXRhYmxlU3RyYXRlZ3kgPSBvcHRpb25zXG4gICAgfSBlbHNlIGlmIChvcHRpb25zICYmIG9wdGlvbnMuaGlnaFdhdGVyTWFyaykge1xuICAgICAgY29uc29sZS53YXJuKCdbU3RyZWFtU2F2ZXJdIERlcHJpY2F0ZWQgcGFzcyBhbiBvYmplY3QgYXMgMm5kIGFyZ3VtZW50IHdoZW4gY3JlYXRpbmcgYSB3cml0ZSBzdHJlYW0nKVxuICAgICAgb3B0cy5zaXplID0gc2l6ZVxuICAgICAgb3B0cy53cml0YWJsZVN0cmF0ZWd5ID0gb3B0aW9uc1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRzID0gb3B0aW9ucyB8fCB7fVxuICAgIH1cbiAgICBpZiAoIXVzZUJsb2JGYWxsYmFjaykge1xuICAgICAgbG9hZFRyYW5zcG9ydGVyKClcblxuICAgICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpXG5cbiAgICAgIC8vIE1ha2UgZmlsZW5hbWUgUkZDNTk4NyBjb21wYXRpYmxlXG4gICAgICBmaWxlbmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChmaWxlbmFtZS5yZXBsYWNlKC9cXC8vZywgJzonKSlcbiAgICAgICAgLnJlcGxhY2UoL1snKCldL2csIGVzY2FwZSlcbiAgICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgIHRyYW5zZmVycmluZ1JlYWRhYmxlOiBzdXBwb3J0c1RyYW5zZmVyYWJsZSxcbiAgICAgICAgcGF0aG5hbWU6IG9wdHMucGF0aG5hbWUgfHwgTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnNsaWNlKC02KSArICcvJyArIGZpbGVuYW1lLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW07IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICdDb250ZW50LURpc3Bvc2l0aW9uJzogXCJhdHRhY2htZW50OyBmaWxlbmFtZSo9VVRGLTgnJ1wiICsgZmlsZW5hbWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAob3B0cy5zaXplKSB7XG4gICAgICAgIHJlc3BvbnNlLmhlYWRlcnNbJ0NvbnRlbnQtTGVuZ3RoJ10gPSBvcHRzLnNpemVcbiAgICAgIH1cblxuICAgICAgY29uc3QgYXJncyA9IFsgcmVzcG9uc2UsICcqJywgWyBjaGFubmVsLnBvcnQyIF0gXVxuXG4gICAgICBpZiAoc3VwcG9ydHNUcmFuc2ZlcmFibGUpIHtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZXIgPSBkb3dubG9hZFN0cmF0ZWd5ID09PSAnaWZyYW1lJyA/IHVuZGVmaW5lZCA6IHtcbiAgICAgICAgICAvLyBUaGlzIHRyYW5zZm9ybWVyICYgZmx1c2ggbWV0aG9kIGlzIG9ubHkgdXNlZCBieSBpbnNlY3VyZSBjb250ZXh0LlxuICAgICAgICAgIHRyYW5zZm9ybSAoY2h1bmssIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIGlmICghKGNodW5rIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FuIG9ubHkgd2lydGUgVWludDhBcnJheXMnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnl0ZXNXcml0dGVuICs9IGNodW5rLmxlbmd0aFxuICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKGNodW5rKVxuXG4gICAgICAgICAgICBpZiAoZG93bmxvYWRVcmwpIHtcbiAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGRvd25sb2FkVXJsXG4gICAgICAgICAgICAgIGRvd25sb2FkVXJsID0gbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmx1c2ggKCkge1xuICAgICAgICAgICAgaWYgKGRvd25sb2FkVXJsKSB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBkb3dubG9hZFVybFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cyA9IG5ldyBzdHJlYW1TYXZlci5UcmFuc2Zvcm1TdHJlYW0oXG4gICAgICAgICAgdHJhbnNmb3JtZXIsXG4gICAgICAgICAgb3B0cy53cml0YWJsZVN0cmF0ZWd5LFxuICAgICAgICAgIG9wdHMucmVhZGFibGVTdHJhdGVneVxuICAgICAgICApXG4gICAgICAgIGNvbnN0IHJlYWRhYmxlU3RyZWFtID0gdHMucmVhZGFibGVcblxuICAgICAgICBjaGFubmVsLnBvcnQxLnBvc3RNZXNzYWdlKHsgcmVhZGFibGVTdHJlYW0gfSwgWyByZWFkYWJsZVN0cmVhbSBdKVxuICAgICAgfVxuXG4gICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGV2dCA9PiB7XG4gICAgICAgIC8vIFNlcnZpY2Ugd29ya2VyIHNlbnQgdXMgYSBsaW5rIHRoYXQgd2Ugc2hvdWxkIG9wZW4uXG4gICAgICAgIGlmIChldnQuZGF0YS5kb3dubG9hZCkge1xuICAgICAgICAgIC8vIFNwZWNpYWwgdHJlYXRtZW50IGZvciBwb3B1cC4uLlxuICAgICAgICAgIGlmIChkb3dubG9hZFN0cmF0ZWd5ID09PSAnbmF2aWdhdGUnKSB7XG4gICAgICAgICAgICBtaXRtVHJhbnNwb3J0ZXIucmVtb3ZlKClcbiAgICAgICAgICAgIG1pdG1UcmFuc3BvcnRlciA9IG51bGxcbiAgICAgICAgICAgIGlmIChieXRlc1dyaXR0ZW4pIHtcbiAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGV2dC5kYXRhLmRvd25sb2FkXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkb3dubG9hZFVybCA9IGV2dC5kYXRhLmRvd25sb2FkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChtaXRtVHJhbnNwb3J0ZXIuaXNQb3B1cCkge1xuICAgICAgICAgICAgICBtaXRtVHJhbnNwb3J0ZXIucmVtb3ZlKClcbiAgICAgICAgICAgICAgbWl0bVRyYW5zcG9ydGVyID0gbnVsbFxuICAgICAgICAgICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIGZpcmVmb3gsIHRoZXkgY2FuIGtlZXAgc3cgYWxpdmUgd2l0aCBmZXRjaFxuICAgICAgICAgICAgICBpZiAoZG93bmxvYWRTdHJhdGVneSA9PT0gJ2lmcmFtZScpIHtcbiAgICAgICAgICAgICAgICBtYWtlSWZyYW1lKHN0cmVhbVNhdmVyLm1pdG0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2UgbmV2ZXIgcmVtb3ZlIHRoaXMgaWZyYW1lcyBiL2MgaXQgY2FuIGludGVycnVwdCBzYXZpbmdcbiAgICAgICAgICAgIG1ha2VJZnJhbWUoZXZ0LmRhdGEuZG93bmxvYWQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtaXRtVHJhbnNwb3J0ZXIubG9hZGVkKSB7XG4gICAgICAgIG1pdG1UcmFuc3BvcnRlci5wb3N0TWVzc2FnZSguLi5hcmdzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWl0bVRyYW5zcG9ydGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgbWl0bVRyYW5zcG9ydGVyLnBvc3RNZXNzYWdlKC4uLmFyZ3MpXG4gICAgICAgIH0sIHsgb25jZTogdHJ1ZSB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBjaHVua3MgPSBbXVxuXG4gICAgcmV0dXJuICghdXNlQmxvYkZhbGxiYWNrICYmIHRzICYmIHRzLndyaXRhYmxlKSB8fCBuZXcgc3RyZWFtU2F2ZXIuV3JpdGFibGVTdHJlYW0oe1xuICAgICAgd3JpdGUgKGNodW5rKSB7XG4gICAgICAgIGlmICghKGNodW5rIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW4gb25seSB3aXJ0ZSBVaW50OEFycmF5cycpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVzZUJsb2JGYWxsYmFjaykge1xuICAgICAgICAgIC8vIFNhZmFyaS4uLiBUaGUgbmV3IElFNlxuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qaW1teXdhcnRpbmcvU3RyZWFtU2F2ZXIuanMvaXNzdWVzLzY5XG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyBldmVuIGRvZSBpdCBoYXMgZXZlcnl0aGluZyBpdCBmYWlscyB0byBkb3dubG9hZCBhbnl0aGluZ1xuICAgICAgICAgIC8vIHRoYXQgY29tZXMgZnJvbSB0aGUgc2VydmljZSB3b3JrZXIuLiFcbiAgICAgICAgICBjaHVua3MucHVzaChjaHVuaylcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlzIGNhbGxlZCB3aGVuIGEgbmV3IGNodW5rIG9mIGRhdGEgaXMgcmVhZHkgdG8gYmUgd3JpdHRlblxuICAgICAgICAvLyB0byB0aGUgdW5kZXJseWluZyBzaW5rLiBJdCBjYW4gcmV0dXJuIGEgcHJvbWlzZSB0byBzaWduYWxcbiAgICAgICAgLy8gc3VjY2VzcyBvciBmYWlsdXJlIG9mIHRoZSB3cml0ZSBvcGVyYXRpb24uIFRoZSBzdHJlYW1cbiAgICAgICAgLy8gaW1wbGVtZW50YXRpb24gZ3VhcmFudGVlcyB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkXG4gICAgICAgIC8vIG9ubHkgYWZ0ZXIgcHJldmlvdXMgd3JpdGVzIGhhdmUgc3VjY2VlZGVkLCBhbmQgbmV2ZXIgYWZ0ZXJcbiAgICAgICAgLy8gY2xvc2Ugb3IgYWJvcnQgaXMgY2FsbGVkLlxuXG4gICAgICAgIC8vIFRPRE86IEtpbmQgb2YgaW1wb3J0YW50IHRoYXQgc2VydmljZSB3b3JrZXIgcmVzcG9uZCBiYWNrIHdoZW5cbiAgICAgICAgLy8gaXQgaGFzIGJlZW4gd3JpdHRlbi4gT3RoZXJ3aXNlIHdlIGNhbid0IGhhbmRsZSBiYWNrcHJlc3N1cmVcbiAgICAgICAgLy8gRURJVDogVHJhbnNmYXJhYmxlIHN0cmVhbXMgc29sdnMgdGhpcy4uLlxuICAgICAgICBjaGFubmVsLnBvcnQxLnBvc3RNZXNzYWdlKGNodW5rKVxuICAgICAgICBieXRlc1dyaXR0ZW4gKz0gY2h1bmsubGVuZ3RoXG5cbiAgICAgICAgaWYgKGRvd25sb2FkVXJsKSB7XG4gICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGRvd25sb2FkVXJsXG4gICAgICAgICAgZG93bmxvYWRVcmwgPSBudWxsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjbG9zZSAoKSB7XG4gICAgICAgIGlmICh1c2VCbG9iRmFsbGJhY2spIHtcbiAgICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoY2h1bmtzLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW07IGNoYXJzZXQ9dXRmLTgnIH0pXG4gICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgICAgICAgIGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICAgICAgICBsaW5rLmRvd25sb2FkID0gZmlsZW5hbWVcbiAgICAgICAgICBsaW5rLmNsaWNrKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGFubmVsLnBvcnQxLnBvc3RNZXNzYWdlKCdlbmQnKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYWJvcnQgKCkge1xuICAgICAgICBjaHVua3MgPSBbXVxuICAgICAgICBjaGFubmVsLnBvcnQxLnBvc3RNZXNzYWdlKCdhYm9ydCcpXG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbnVsbFxuICAgICAgICBjaGFubmVsLnBvcnQxLmNsb3NlKClcbiAgICAgICAgY2hhbm5lbC5wb3J0Mi5jbG9zZSgpXG4gICAgICAgIGNoYW5uZWwgPSBudWxsXG4gICAgICB9XG4gICAgfSwgb3B0cy53cml0YWJsZVN0cmF0ZWd5KVxuICB9XG5cbiAgcmV0dXJuIHN0cmVhbVNhdmVyXG59KVxuIiwgIi8qIEBsaWNlbnNlXG5QYXBhIFBhcnNlXG52NS4zLjFcbmh0dHBzOi8vZ2l0aHViLmNvbS9taG9sdC9QYXBhUGFyc2VcbkxpY2Vuc2U6IE1JVFxuKi9cbiFmdW5jdGlvbihlLHQpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdCk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9dCgpOmUuUGFwYT10KCl9KHRoaXMsZnVuY3Rpb24gcygpe1widXNlIHN0cmljdFwiO3ZhciBmPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6dm9pZCAwIT09Zj9mOnt9O3ZhciBuPSFmLmRvY3VtZW50JiYhIWYucG9zdE1lc3NhZ2Usbz1uJiYvYmxvYjovaS50ZXN0KChmLmxvY2F0aW9ufHx7fSkucHJvdG9jb2wpLGE9e30saD0wLGI9e3BhcnNlOmZ1bmN0aW9uKGUsdCl7dmFyIGk9KHQ9dHx8e30pLmR5bmFtaWNUeXBpbmd8fCExO00oaSkmJih0LmR5bmFtaWNUeXBpbmdGdW5jdGlvbj1pLGk9e30pO2lmKHQuZHluYW1pY1R5cGluZz1pLHQudHJhbnNmb3JtPSEhTSh0LnRyYW5zZm9ybSkmJnQudHJhbnNmb3JtLHQud29ya2VyJiZiLldPUktFUlNfU1VQUE9SVEVEKXt2YXIgcj1mdW5jdGlvbigpe2lmKCFiLldPUktFUlNfU1VQUE9SVEVEKXJldHVybiExO3ZhciBlPShpPWYuVVJMfHxmLndlYmtpdFVSTHx8bnVsbCxyPXMudG9TdHJpbmcoKSxiLkJMT0JfVVJMfHwoYi5CTE9CX1VSTD1pLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbXCIoXCIscixcIikoKTtcIl0se3R5cGU6XCJ0ZXh0L2phdmFzY3JpcHRcIn0pKSkpLHQ9bmV3IGYuV29ya2VyKGUpO3ZhciBpLHI7cmV0dXJuIHQub25tZXNzYWdlPV8sdC5pZD1oKyssYVt0LmlkXT10fSgpO3JldHVybiByLnVzZXJTdGVwPXQuc3RlcCxyLnVzZXJDaHVuaz10LmNodW5rLHIudXNlckNvbXBsZXRlPXQuY29tcGxldGUsci51c2VyRXJyb3I9dC5lcnJvcix0LnN0ZXA9TSh0LnN0ZXApLHQuY2h1bms9TSh0LmNodW5rKSx0LmNvbXBsZXRlPU0odC5jb21wbGV0ZSksdC5lcnJvcj1NKHQuZXJyb3IpLGRlbGV0ZSB0Lndvcmtlcix2b2lkIHIucG9zdE1lc3NhZ2Uoe2lucHV0OmUsY29uZmlnOnQsd29ya2VySWQ6ci5pZH0pfXZhciBuPW51bGw7Yi5OT0RFX1NUUkVBTV9JTlBVVCxcInN0cmluZ1wiPT10eXBlb2YgZT9uPXQuZG93bmxvYWQ/bmV3IGwodCk6bmV3IHAodCk6ITA9PT1lLnJlYWRhYmxlJiZNKGUucmVhZCkmJk0oZS5vbik/bj1uZXcgZyh0KTooZi5GaWxlJiZlIGluc3RhbmNlb2YgRmlsZXx8ZSBpbnN0YW5jZW9mIE9iamVjdCkmJihuPW5ldyBjKHQpKTtyZXR1cm4gbi5zdHJlYW0oZSl9LHVucGFyc2U6ZnVuY3Rpb24oZSx0KXt2YXIgbj0hMSxfPSEwLG09XCIsXCIseT1cIlxcclxcblwiLHM9J1wiJyxhPXMrcyxpPSExLHI9bnVsbCxvPSExOyFmdW5jdGlvbigpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiB0KXJldHVybjtcInN0cmluZ1wiIT10eXBlb2YgdC5kZWxpbWl0ZXJ8fGIuQkFEX0RFTElNSVRFUlMuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybi0xIT09dC5kZWxpbWl0ZXIuaW5kZXhPZihlKX0pLmxlbmd0aHx8KG09dC5kZWxpbWl0ZXIpOyhcImJvb2xlYW5cIj09dHlwZW9mIHQucXVvdGVzfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LnF1b3Rlc3x8QXJyYXkuaXNBcnJheSh0LnF1b3RlcykpJiYobj10LnF1b3Rlcyk7XCJib29sZWFuXCIhPXR5cGVvZiB0LnNraXBFbXB0eUxpbmVzJiZcInN0cmluZ1wiIT10eXBlb2YgdC5za2lwRW1wdHlMaW5lc3x8KGk9dC5za2lwRW1wdHlMaW5lcyk7XCJzdHJpbmdcIj09dHlwZW9mIHQubmV3bGluZSYmKHk9dC5uZXdsaW5lKTtcInN0cmluZ1wiPT10eXBlb2YgdC5xdW90ZUNoYXImJihzPXQucXVvdGVDaGFyKTtcImJvb2xlYW5cIj09dHlwZW9mIHQuaGVhZGVyJiYoXz10LmhlYWRlcik7aWYoQXJyYXkuaXNBcnJheSh0LmNvbHVtbnMpKXtpZigwPT09dC5jb2x1bW5zLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoXCJPcHRpb24gY29sdW1ucyBpcyBlbXB0eVwiKTtyPXQuY29sdW1uc312b2lkIDAhPT10LmVzY2FwZUNoYXImJihhPXQuZXNjYXBlQ2hhcitzKTtcImJvb2xlYW5cIj09dHlwZW9mIHQuZXNjYXBlRm9ybXVsYWUmJihvPXQuZXNjYXBlRm9ybXVsYWUpfSgpO3ZhciBoPW5ldyBSZWdFeHAoaihzKSxcImdcIik7XCJzdHJpbmdcIj09dHlwZW9mIGUmJihlPUpTT04ucGFyc2UoZSkpO2lmKEFycmF5LmlzQXJyYXkoZSkpe2lmKCFlLmxlbmd0aHx8QXJyYXkuaXNBcnJheShlWzBdKSlyZXR1cm4gdShudWxsLGUsaSk7aWYoXCJvYmplY3RcIj09dHlwZW9mIGVbMF0pcmV0dXJuIHUocnx8T2JqZWN0LmtleXMoZVswXSksZSxpKX1lbHNlIGlmKFwib2JqZWN0XCI9PXR5cGVvZiBlKXJldHVyblwic3RyaW5nXCI9PXR5cGVvZiBlLmRhdGEmJihlLmRhdGE9SlNPTi5wYXJzZShlLmRhdGEpKSxBcnJheS5pc0FycmF5KGUuZGF0YSkmJihlLmZpZWxkc3x8KGUuZmllbGRzPWUubWV0YSYmZS5tZXRhLmZpZWxkcyksZS5maWVsZHN8fChlLmZpZWxkcz1BcnJheS5pc0FycmF5KGUuZGF0YVswXSk/ZS5maWVsZHM6XCJvYmplY3RcIj09dHlwZW9mIGUuZGF0YVswXT9PYmplY3Qua2V5cyhlLmRhdGFbMF0pOltdKSxBcnJheS5pc0FycmF5KGUuZGF0YVswXSl8fFwib2JqZWN0XCI9PXR5cGVvZiBlLmRhdGFbMF18fChlLmRhdGE9W2UuZGF0YV0pKSx1KGUuZmllbGRzfHxbXSxlLmRhdGF8fFtdLGkpO3Rocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBzZXJpYWxpemUgdW5yZWNvZ25pemVkIGlucHV0XCIpO2Z1bmN0aW9uIHUoZSx0LGkpe3ZhciByPVwiXCI7XCJzdHJpbmdcIj09dHlwZW9mIGUmJihlPUpTT04ucGFyc2UoZSkpLFwic3RyaW5nXCI9PXR5cGVvZiB0JiYodD1KU09OLnBhcnNlKHQpKTt2YXIgbj1BcnJheS5pc0FycmF5KGUpJiYwPGUubGVuZ3RoLHM9IUFycmF5LmlzQXJyYXkodFswXSk7aWYobiYmXyl7Zm9yKHZhciBhPTA7YTxlLmxlbmd0aDthKyspMDxhJiYocis9bSkscis9dihlW2FdLGEpOzA8dC5sZW5ndGgmJihyKz15KX1mb3IodmFyIG89MDtvPHQubGVuZ3RoO28rKyl7dmFyIGg9bj9lLmxlbmd0aDp0W29dLmxlbmd0aCx1PSExLGY9bj8wPT09T2JqZWN0LmtleXModFtvXSkubGVuZ3RoOjA9PT10W29dLmxlbmd0aDtpZihpJiYhbiYmKHU9XCJncmVlZHlcIj09PWk/XCJcIj09PXRbb10uam9pbihcIlwiKS50cmltKCk6MT09PXRbb10ubGVuZ3RoJiYwPT09dFtvXVswXS5sZW5ndGgpLFwiZ3JlZWR5XCI9PT1pJiZuKXtmb3IodmFyIGQ9W10sbD0wO2w8aDtsKyspe3ZhciBjPXM/ZVtsXTpsO2QucHVzaCh0W29dW2NdKX11PVwiXCI9PT1kLmpvaW4oXCJcIikudHJpbSgpfWlmKCF1KXtmb3IodmFyIHA9MDtwPGg7cCsrKXswPHAmJiFmJiYocis9bSk7dmFyIGc9biYmcz9lW3BdOnA7cis9dih0W29dW2ddLHApfW88dC5sZW5ndGgtMSYmKCFpfHwwPGgmJiFmKSYmKHIrPXkpfX1yZXR1cm4gcn1mdW5jdGlvbiB2KGUsdCl7aWYobnVsbD09ZSlyZXR1cm5cIlwiO2lmKGUuY29uc3RydWN0b3I9PT1EYXRlKXJldHVybiBKU09OLnN0cmluZ2lmeShlKS5zbGljZSgxLDI1KTshMD09PW8mJlwic3RyaW5nXCI9PXR5cGVvZiBlJiZudWxsIT09ZS5tYXRjaCgvXls9K1xcLUBdLiokLykmJihlPVwiJ1wiK2UpO3ZhciBpPWUudG9TdHJpbmcoKS5yZXBsYWNlKGgsYSkscj1cImJvb2xlYW5cIj09dHlwZW9mIG4mJm58fFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJm4oZSx0KXx8QXJyYXkuaXNBcnJheShuKSYmblt0XXx8ZnVuY3Rpb24oZSx0KXtmb3IodmFyIGk9MDtpPHQubGVuZ3RoO2krKylpZigtMTxlLmluZGV4T2YodFtpXSkpcmV0dXJuITA7cmV0dXJuITF9KGksYi5CQURfREVMSU1JVEVSUyl8fC0xPGkuaW5kZXhPZihtKXx8XCIgXCI9PT1pLmNoYXJBdCgwKXx8XCIgXCI9PT1pLmNoYXJBdChpLmxlbmd0aC0xKTtyZXR1cm4gcj9zK2krczppfX19O2lmKGIuUkVDT1JEX1NFUD1TdHJpbmcuZnJvbUNoYXJDb2RlKDMwKSxiLlVOSVRfU0VQPVN0cmluZy5mcm9tQ2hhckNvZGUoMzEpLGIuQllURV9PUkRFUl9NQVJLPVwiXFx1ZmVmZlwiLGIuQkFEX0RFTElNSVRFUlM9W1wiXFxyXCIsXCJcXG5cIiwnXCInLGIuQllURV9PUkRFUl9NQVJLXSxiLldPUktFUlNfU1VQUE9SVEVEPSFuJiYhIWYuV29ya2VyLGIuTk9ERV9TVFJFQU1fSU5QVVQ9MSxiLkxvY2FsQ2h1bmtTaXplPTEwNDg1NzYwLGIuUmVtb3RlQ2h1bmtTaXplPTUyNDI4ODAsYi5EZWZhdWx0RGVsaW1pdGVyPVwiLFwiLGIuUGFyc2VyPUUsYi5QYXJzZXJIYW5kbGU9aSxiLk5ldHdvcmtTdHJlYW1lcj1sLGIuRmlsZVN0cmVhbWVyPWMsYi5TdHJpbmdTdHJlYW1lcj1wLGIuUmVhZGFibGVTdHJlYW1TdHJlYW1lcj1nLGYualF1ZXJ5KXt2YXIgZD1mLmpRdWVyeTtkLmZuLnBhcnNlPWZ1bmN0aW9uKG8pe3ZhciBpPW8uY29uZmlnfHx7fSxoPVtdO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oZSl7aWYoIShcIklOUFVUXCI9PT1kKHRoaXMpLnByb3AoXCJ0YWdOYW1lXCIpLnRvVXBwZXJDYXNlKCkmJlwiZmlsZVwiPT09ZCh0aGlzKS5hdHRyKFwidHlwZVwiKS50b0xvd2VyQ2FzZSgpJiZmLkZpbGVSZWFkZXIpfHwhdGhpcy5maWxlc3x8MD09PXRoaXMuZmlsZXMubGVuZ3RoKXJldHVybiEwO2Zvcih2YXIgdD0wO3Q8dGhpcy5maWxlcy5sZW5ndGg7dCsrKWgucHVzaCh7ZmlsZTp0aGlzLmZpbGVzW3RdLGlucHV0RWxlbTp0aGlzLGluc3RhbmNlQ29uZmlnOmQuZXh0ZW5kKHt9LGkpfSl9KSxlKCksdGhpcztmdW5jdGlvbiBlKCl7aWYoMCE9PWgubGVuZ3RoKXt2YXIgZSx0LGkscixuPWhbMF07aWYoTShvLmJlZm9yZSkpe3ZhciBzPW8uYmVmb3JlKG4uZmlsZSxuLmlucHV0RWxlbSk7aWYoXCJvYmplY3RcIj09dHlwZW9mIHMpe2lmKFwiYWJvcnRcIj09PXMuYWN0aW9uKXJldHVybiBlPVwiQWJvcnRFcnJvclwiLHQ9bi5maWxlLGk9bi5pbnB1dEVsZW0scj1zLnJlYXNvbix2b2lkKE0oby5lcnJvcikmJm8uZXJyb3Ioe25hbWU6ZX0sdCxpLHIpKTtpZihcInNraXBcIj09PXMuYWN0aW9uKXJldHVybiB2b2lkIHUoKTtcIm9iamVjdFwiPT10eXBlb2Ygcy5jb25maWcmJihuLmluc3RhbmNlQ29uZmlnPWQuZXh0ZW5kKG4uaW5zdGFuY2VDb25maWcscy5jb25maWcpKX1lbHNlIGlmKFwic2tpcFwiPT09cylyZXR1cm4gdm9pZCB1KCl9dmFyIGE9bi5pbnN0YW5jZUNvbmZpZy5jb21wbGV0ZTtuLmluc3RhbmNlQ29uZmlnLmNvbXBsZXRlPWZ1bmN0aW9uKGUpe00oYSkmJmEoZSxuLmZpbGUsbi5pbnB1dEVsZW0pLHUoKX0sYi5wYXJzZShuLmZpbGUsbi5pbnN0YW5jZUNvbmZpZyl9ZWxzZSBNKG8uY29tcGxldGUpJiZvLmNvbXBsZXRlKCl9ZnVuY3Rpb24gdSgpe2guc3BsaWNlKDAsMSksZSgpfX19ZnVuY3Rpb24gdShlKXt0aGlzLl9oYW5kbGU9bnVsbCx0aGlzLl9maW5pc2hlZD0hMSx0aGlzLl9jb21wbGV0ZWQ9ITEsdGhpcy5faGFsdGVkPSExLHRoaXMuX2lucHV0PW51bGwsdGhpcy5fYmFzZUluZGV4PTAsdGhpcy5fcGFydGlhbExpbmU9XCJcIix0aGlzLl9yb3dDb3VudD0wLHRoaXMuX3N0YXJ0PTAsdGhpcy5fbmV4dENodW5rPW51bGwsdGhpcy5pc0ZpcnN0Q2h1bms9ITAsdGhpcy5fY29tcGxldGVSZXN1bHRzPXtkYXRhOltdLGVycm9yczpbXSxtZXRhOnt9fSxmdW5jdGlvbihlKXt2YXIgdD13KGUpO3QuY2h1bmtTaXplPXBhcnNlSW50KHQuY2h1bmtTaXplKSxlLnN0ZXB8fGUuY2h1bmt8fCh0LmNodW5rU2l6ZT1udWxsKTt0aGlzLl9oYW5kbGU9bmV3IGkodCksKHRoaXMuX2hhbmRsZS5zdHJlYW1lcj10aGlzKS5fY29uZmlnPXR9LmNhbGwodGhpcyxlKSx0aGlzLnBhcnNlQ2h1bms9ZnVuY3Rpb24oZSx0KXtpZih0aGlzLmlzRmlyc3RDaHVuayYmTSh0aGlzLl9jb25maWcuYmVmb3JlRmlyc3RDaHVuaykpe3ZhciBpPXRoaXMuX2NvbmZpZy5iZWZvcmVGaXJzdENodW5rKGUpO3ZvaWQgMCE9PWkmJihlPWkpfXRoaXMuaXNGaXJzdENodW5rPSExLHRoaXMuX2hhbHRlZD0hMTt2YXIgcj10aGlzLl9wYXJ0aWFsTGluZStlO3RoaXMuX3BhcnRpYWxMaW5lPVwiXCI7dmFyIG49dGhpcy5faGFuZGxlLnBhcnNlKHIsdGhpcy5fYmFzZUluZGV4LCF0aGlzLl9maW5pc2hlZCk7aWYoIXRoaXMuX2hhbmRsZS5wYXVzZWQoKSYmIXRoaXMuX2hhbmRsZS5hYm9ydGVkKCkpe3ZhciBzPW4ubWV0YS5jdXJzb3I7dGhpcy5fZmluaXNoZWR8fCh0aGlzLl9wYXJ0aWFsTGluZT1yLnN1YnN0cmluZyhzLXRoaXMuX2Jhc2VJbmRleCksdGhpcy5fYmFzZUluZGV4PXMpLG4mJm4uZGF0YSYmKHRoaXMuX3Jvd0NvdW50Kz1uLmRhdGEubGVuZ3RoKTt2YXIgYT10aGlzLl9maW5pc2hlZHx8dGhpcy5fY29uZmlnLnByZXZpZXcmJnRoaXMuX3Jvd0NvdW50Pj10aGlzLl9jb25maWcucHJldmlldztpZihvKWYucG9zdE1lc3NhZ2Uoe3Jlc3VsdHM6bix3b3JrZXJJZDpiLldPUktFUl9JRCxmaW5pc2hlZDphfSk7ZWxzZSBpZihNKHRoaXMuX2NvbmZpZy5jaHVuaykmJiF0KXtpZih0aGlzLl9jb25maWcuY2h1bmsobix0aGlzLl9oYW5kbGUpLHRoaXMuX2hhbmRsZS5wYXVzZWQoKXx8dGhpcy5faGFuZGxlLmFib3J0ZWQoKSlyZXR1cm4gdm9pZCh0aGlzLl9oYWx0ZWQ9ITApO249dm9pZCAwLHRoaXMuX2NvbXBsZXRlUmVzdWx0cz12b2lkIDB9cmV0dXJuIHRoaXMuX2NvbmZpZy5zdGVwfHx0aGlzLl9jb25maWcuY2h1bmt8fCh0aGlzLl9jb21wbGV0ZVJlc3VsdHMuZGF0YT10aGlzLl9jb21wbGV0ZVJlc3VsdHMuZGF0YS5jb25jYXQobi5kYXRhKSx0aGlzLl9jb21wbGV0ZVJlc3VsdHMuZXJyb3JzPXRoaXMuX2NvbXBsZXRlUmVzdWx0cy5lcnJvcnMuY29uY2F0KG4uZXJyb3JzKSx0aGlzLl9jb21wbGV0ZVJlc3VsdHMubWV0YT1uLm1ldGEpLHRoaXMuX2NvbXBsZXRlZHx8IWF8fCFNKHRoaXMuX2NvbmZpZy5jb21wbGV0ZSl8fG4mJm4ubWV0YS5hYm9ydGVkfHwodGhpcy5fY29uZmlnLmNvbXBsZXRlKHRoaXMuX2NvbXBsZXRlUmVzdWx0cyx0aGlzLl9pbnB1dCksdGhpcy5fY29tcGxldGVkPSEwKSxhfHxuJiZuLm1ldGEucGF1c2VkfHx0aGlzLl9uZXh0Q2h1bmsoKSxufXRoaXMuX2hhbHRlZD0hMH0sdGhpcy5fc2VuZEVycm9yPWZ1bmN0aW9uKGUpe00odGhpcy5fY29uZmlnLmVycm9yKT90aGlzLl9jb25maWcuZXJyb3IoZSk6byYmdGhpcy5fY29uZmlnLmVycm9yJiZmLnBvc3RNZXNzYWdlKHt3b3JrZXJJZDpiLldPUktFUl9JRCxlcnJvcjplLGZpbmlzaGVkOiExfSl9fWZ1bmN0aW9uIGwoZSl7dmFyIHI7KGU9ZXx8e30pLmNodW5rU2l6ZXx8KGUuY2h1bmtTaXplPWIuUmVtb3RlQ2h1bmtTaXplKSx1LmNhbGwodGhpcyxlKSx0aGlzLl9uZXh0Q2h1bms9bj9mdW5jdGlvbigpe3RoaXMuX3JlYWRDaHVuaygpLHRoaXMuX2NodW5rTG9hZGVkKCl9OmZ1bmN0aW9uKCl7dGhpcy5fcmVhZENodW5rKCl9LHRoaXMuc3RyZWFtPWZ1bmN0aW9uKGUpe3RoaXMuX2lucHV0PWUsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX3JlYWRDaHVuaz1mdW5jdGlvbigpe2lmKHRoaXMuX2ZpbmlzaGVkKXRoaXMuX2NodW5rTG9hZGVkKCk7ZWxzZXtpZihyPW5ldyBYTUxIdHRwUmVxdWVzdCx0aGlzLl9jb25maWcud2l0aENyZWRlbnRpYWxzJiYoci53aXRoQ3JlZGVudGlhbHM9dGhpcy5fY29uZmlnLndpdGhDcmVkZW50aWFscyksbnx8KHIub25sb2FkPXYodGhpcy5fY2h1bmtMb2FkZWQsdGhpcyksci5vbmVycm9yPXYodGhpcy5fY2h1bmtFcnJvcix0aGlzKSksci5vcGVuKHRoaXMuX2NvbmZpZy5kb3dubG9hZFJlcXVlc3RCb2R5P1wiUE9TVFwiOlwiR0VUXCIsdGhpcy5faW5wdXQsIW4pLHRoaXMuX2NvbmZpZy5kb3dubG9hZFJlcXVlc3RIZWFkZXJzKXt2YXIgZT10aGlzLl9jb25maWcuZG93bmxvYWRSZXF1ZXN0SGVhZGVycztmb3IodmFyIHQgaW4gZSlyLnNldFJlcXVlc3RIZWFkZXIodCxlW3RdKX1pZih0aGlzLl9jb25maWcuY2h1bmtTaXplKXt2YXIgaT10aGlzLl9zdGFydCt0aGlzLl9jb25maWcuY2h1bmtTaXplLTE7ci5zZXRSZXF1ZXN0SGVhZGVyKFwiUmFuZ2VcIixcImJ5dGVzPVwiK3RoaXMuX3N0YXJ0K1wiLVwiK2kpfXRyeXtyLnNlbmQodGhpcy5fY29uZmlnLmRvd25sb2FkUmVxdWVzdEJvZHkpfWNhdGNoKGUpe3RoaXMuX2NodW5rRXJyb3IoZS5tZXNzYWdlKX1uJiYwPT09ci5zdGF0dXMmJnRoaXMuX2NodW5rRXJyb3IoKX19LHRoaXMuX2NodW5rTG9hZGVkPWZ1bmN0aW9uKCl7ND09PXIucmVhZHlTdGF0ZSYmKHIuc3RhdHVzPDIwMHx8NDAwPD1yLnN0YXR1cz90aGlzLl9jaHVua0Vycm9yKCk6KHRoaXMuX3N0YXJ0Kz10aGlzLl9jb25maWcuY2h1bmtTaXplP3RoaXMuX2NvbmZpZy5jaHVua1NpemU6ci5yZXNwb25zZVRleHQubGVuZ3RoLHRoaXMuX2ZpbmlzaGVkPSF0aGlzLl9jb25maWcuY2h1bmtTaXplfHx0aGlzLl9zdGFydD49ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtUmFuZ2VcIik7aWYobnVsbD09PXQpcmV0dXJuLTE7cmV0dXJuIHBhcnNlSW50KHQuc3Vic3RyaW5nKHQubGFzdEluZGV4T2YoXCIvXCIpKzEpKX0ociksdGhpcy5wYXJzZUNodW5rKHIucmVzcG9uc2VUZXh0KSkpfSx0aGlzLl9jaHVua0Vycm9yPWZ1bmN0aW9uKGUpe3ZhciB0PXIuc3RhdHVzVGV4dHx8ZTt0aGlzLl9zZW5kRXJyb3IobmV3IEVycm9yKHQpKX19ZnVuY3Rpb24gYyhlKXt2YXIgcixuOyhlPWV8fHt9KS5jaHVua1NpemV8fChlLmNodW5rU2l6ZT1iLkxvY2FsQ2h1bmtTaXplKSx1LmNhbGwodGhpcyxlKTt2YXIgcz1cInVuZGVmaW5lZFwiIT10eXBlb2YgRmlsZVJlYWRlcjt0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLG49ZS5zbGljZXx8ZS53ZWJraXRTbGljZXx8ZS5tb3pTbGljZSxzPygocj1uZXcgRmlsZVJlYWRlcikub25sb2FkPXYodGhpcy5fY2h1bmtMb2FkZWQsdGhpcyksci5vbmVycm9yPXYodGhpcy5fY2h1bmtFcnJvcix0aGlzKSk6cj1uZXcgRmlsZVJlYWRlclN5bmMsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX25leHRDaHVuaz1mdW5jdGlvbigpe3RoaXMuX2ZpbmlzaGVkfHx0aGlzLl9jb25maWcucHJldmlldyYmISh0aGlzLl9yb3dDb3VudDx0aGlzLl9jb25maWcucHJldmlldyl8fHRoaXMuX3JlYWRDaHVuaygpfSx0aGlzLl9yZWFkQ2h1bms9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLl9pbnB1dDtpZih0aGlzLl9jb25maWcuY2h1bmtTaXplKXt2YXIgdD1NYXRoLm1pbih0aGlzLl9zdGFydCt0aGlzLl9jb25maWcuY2h1bmtTaXplLHRoaXMuX2lucHV0LnNpemUpO2U9bi5jYWxsKGUsdGhpcy5fc3RhcnQsdCl9dmFyIGk9ci5yZWFkQXNUZXh0KGUsdGhpcy5fY29uZmlnLmVuY29kaW5nKTtzfHx0aGlzLl9jaHVua0xvYWRlZCh7dGFyZ2V0OntyZXN1bHQ6aX19KX0sdGhpcy5fY2h1bmtMb2FkZWQ9ZnVuY3Rpb24oZSl7dGhpcy5fc3RhcnQrPXRoaXMuX2NvbmZpZy5jaHVua1NpemUsdGhpcy5fZmluaXNoZWQ9IXRoaXMuX2NvbmZpZy5jaHVua1NpemV8fHRoaXMuX3N0YXJ0Pj10aGlzLl9pbnB1dC5zaXplLHRoaXMucGFyc2VDaHVuayhlLnRhcmdldC5yZXN1bHQpfSx0aGlzLl9jaHVua0Vycm9yPWZ1bmN0aW9uKCl7dGhpcy5fc2VuZEVycm9yKHIuZXJyb3IpfX1mdW5jdGlvbiBwKGUpe3ZhciBpO3UuY2FsbCh0aGlzLGU9ZXx8e30pLHRoaXMuc3RyZWFtPWZ1bmN0aW9uKGUpe3JldHVybiBpPWUsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX25leHRDaHVuaz1mdW5jdGlvbigpe2lmKCF0aGlzLl9maW5pc2hlZCl7dmFyIGUsdD10aGlzLl9jb25maWcuY2h1bmtTaXplO3JldHVybiB0PyhlPWkuc3Vic3RyaW5nKDAsdCksaT1pLnN1YnN0cmluZyh0KSk6KGU9aSxpPVwiXCIpLHRoaXMuX2ZpbmlzaGVkPSFpLHRoaXMucGFyc2VDaHVuayhlKX19fWZ1bmN0aW9uIGcoZSl7dS5jYWxsKHRoaXMsZT1lfHx7fSk7dmFyIHQ9W10saT0hMCxyPSExO3RoaXMucGF1c2U9ZnVuY3Rpb24oKXt1LnByb3RvdHlwZS5wYXVzZS5hcHBseSh0aGlzLGFyZ3VtZW50cyksdGhpcy5faW5wdXQucGF1c2UoKX0sdGhpcy5yZXN1bWU9ZnVuY3Rpb24oKXt1LnByb3RvdHlwZS5yZXN1bWUuYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuX2lucHV0LnJlc3VtZSgpfSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLHRoaXMuX2lucHV0Lm9uKFwiZGF0YVwiLHRoaXMuX3N0cmVhbURhdGEpLHRoaXMuX2lucHV0Lm9uKFwiZW5kXCIsdGhpcy5fc3RyZWFtRW5kKSx0aGlzLl9pbnB1dC5vbihcImVycm9yXCIsdGhpcy5fc3RyZWFtRXJyb3IpfSx0aGlzLl9jaGVja0lzRmluaXNoZWQ9ZnVuY3Rpb24oKXtyJiYxPT09dC5sZW5ndGgmJih0aGlzLl9maW5pc2hlZD0hMCl9LHRoaXMuX25leHRDaHVuaz1mdW5jdGlvbigpe3RoaXMuX2NoZWNrSXNGaW5pc2hlZCgpLHQubGVuZ3RoP3RoaXMucGFyc2VDaHVuayh0LnNoaWZ0KCkpOmk9ITB9LHRoaXMuX3N0cmVhbURhdGE9dihmdW5jdGlvbihlKXt0cnl7dC5wdXNoKFwic3RyaW5nXCI9PXR5cGVvZiBlP2U6ZS50b1N0cmluZyh0aGlzLl9jb25maWcuZW5jb2RpbmcpKSxpJiYoaT0hMSx0aGlzLl9jaGVja0lzRmluaXNoZWQoKSx0aGlzLnBhcnNlQ2h1bmsodC5zaGlmdCgpKSl9Y2F0Y2goZSl7dGhpcy5fc3RyZWFtRXJyb3IoZSl9fSx0aGlzKSx0aGlzLl9zdHJlYW1FcnJvcj12KGZ1bmN0aW9uKGUpe3RoaXMuX3N0cmVhbUNsZWFuVXAoKSx0aGlzLl9zZW5kRXJyb3IoZSl9LHRoaXMpLHRoaXMuX3N0cmVhbUVuZD12KGZ1bmN0aW9uKCl7dGhpcy5fc3RyZWFtQ2xlYW5VcCgpLHI9ITAsdGhpcy5fc3RyZWFtRGF0YShcIlwiKX0sdGhpcyksdGhpcy5fc3RyZWFtQ2xlYW5VcD12KGZ1bmN0aW9uKCl7dGhpcy5faW5wdXQucmVtb3ZlTGlzdGVuZXIoXCJkYXRhXCIsdGhpcy5fc3RyZWFtRGF0YSksdGhpcy5faW5wdXQucmVtb3ZlTGlzdGVuZXIoXCJlbmRcIix0aGlzLl9zdHJlYW1FbmQpLHRoaXMuX2lucHV0LnJlbW92ZUxpc3RlbmVyKFwiZXJyb3JcIix0aGlzLl9zdHJlYW1FcnJvcil9LHRoaXMpfWZ1bmN0aW9uIGkobSl7dmFyIGEsbyxoLHI9TWF0aC5wb3coMiw1Myksbj0tcixzPS9eXFxzKi0/KFxcZCtcXC4/fFxcLlxcZCt8XFxkK1xcLlxcZCspKFtlRV1bLStdP1xcZCspP1xccyokLyx1PS9eKFxcZHs0fS1bMDFdXFxkLVswLTNdXFxkVFswLTJdXFxkOlswLTVdXFxkOlswLTVdXFxkXFwuXFxkKyhbKy1dWzAtMl1cXGQ6WzAtNV1cXGR8WikpfChcXGR7NH0tWzAxXVxcZC1bMC0zXVxcZFRbMC0yXVxcZDpbMC01XVxcZDpbMC01XVxcZChbKy1dWzAtMl1cXGQ6WzAtNV1cXGR8WikpfChcXGR7NH0tWzAxXVxcZC1bMC0zXVxcZFRbMC0yXVxcZDpbMC01XVxcZChbKy1dWzAtMl1cXGQ6WzAtNV1cXGR8WikpJC8sdD10aGlzLGk9MCxmPTAsZD0hMSxlPSExLGw9W10sYz17ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7fX07aWYoTShtLnN0ZXApKXt2YXIgcD1tLnN0ZXA7bS5zdGVwPWZ1bmN0aW9uKGUpe2lmKGM9ZSxfKCkpZygpO2Vsc2V7aWYoZygpLDA9PT1jLmRhdGEubGVuZ3RoKXJldHVybjtpKz1lLmRhdGEubGVuZ3RoLG0ucHJldmlldyYmaT5tLnByZXZpZXc/by5hYm9ydCgpOihjLmRhdGE9Yy5kYXRhWzBdLHAoYyx0KSl9fX1mdW5jdGlvbiB5KGUpe3JldHVyblwiZ3JlZWR5XCI9PT1tLnNraXBFbXB0eUxpbmVzP1wiXCI9PT1lLmpvaW4oXCJcIikudHJpbSgpOjE9PT1lLmxlbmd0aCYmMD09PWVbMF0ubGVuZ3RofWZ1bmN0aW9uIGcoKXtpZihjJiZoJiYoayhcIkRlbGltaXRlclwiLFwiVW5kZXRlY3RhYmxlRGVsaW1pdGVyXCIsXCJVbmFibGUgdG8gYXV0by1kZXRlY3QgZGVsaW1pdGluZyBjaGFyYWN0ZXI7IGRlZmF1bHRlZCB0byAnXCIrYi5EZWZhdWx0RGVsaW1pdGVyK1wiJ1wiKSxoPSExKSxtLnNraXBFbXB0eUxpbmVzKWZvcih2YXIgZT0wO2U8Yy5kYXRhLmxlbmd0aDtlKyspeShjLmRhdGFbZV0pJiZjLmRhdGEuc3BsaWNlKGUtLSwxKTtyZXR1cm4gXygpJiZmdW5jdGlvbigpe2lmKCFjKXJldHVybjtmdW5jdGlvbiBlKGUsdCl7TShtLnRyYW5zZm9ybUhlYWRlcikmJihlPW0udHJhbnNmb3JtSGVhZGVyKGUsdCkpLGwucHVzaChlKX1pZihBcnJheS5pc0FycmF5KGMuZGF0YVswXSkpe2Zvcih2YXIgdD0wO18oKSYmdDxjLmRhdGEubGVuZ3RoO3QrKyljLmRhdGFbdF0uZm9yRWFjaChlKTtjLmRhdGEuc3BsaWNlKDAsMSl9ZWxzZSBjLmRhdGEuZm9yRWFjaChlKX0oKSxmdW5jdGlvbigpe2lmKCFjfHwhbS5oZWFkZXImJiFtLmR5bmFtaWNUeXBpbmcmJiFtLnRyYW5zZm9ybSlyZXR1cm4gYztmdW5jdGlvbiBlKGUsdCl7dmFyIGkscj1tLmhlYWRlcj97fTpbXTtmb3IoaT0wO2k8ZS5sZW5ndGg7aSsrKXt2YXIgbj1pLHM9ZVtpXTttLmhlYWRlciYmKG49aT49bC5sZW5ndGg/XCJfX3BhcnNlZF9leHRyYVwiOmxbaV0pLG0udHJhbnNmb3JtJiYocz1tLnRyYW5zZm9ybShzLG4pKSxzPXYobixzKSxcIl9fcGFyc2VkX2V4dHJhXCI9PT1uPyhyW25dPXJbbl18fFtdLHJbbl0ucHVzaChzKSk6cltuXT1zfXJldHVybiBtLmhlYWRlciYmKGk+bC5sZW5ndGg/ayhcIkZpZWxkTWlzbWF0Y2hcIixcIlRvb01hbnlGaWVsZHNcIixcIlRvbyBtYW55IGZpZWxkczogZXhwZWN0ZWQgXCIrbC5sZW5ndGgrXCIgZmllbGRzIGJ1dCBwYXJzZWQgXCIraSxmK3QpOmk8bC5sZW5ndGgmJmsoXCJGaWVsZE1pc21hdGNoXCIsXCJUb29GZXdGaWVsZHNcIixcIlRvbyBmZXcgZmllbGRzOiBleHBlY3RlZCBcIitsLmxlbmd0aCtcIiBmaWVsZHMgYnV0IHBhcnNlZCBcIitpLGYrdCkpLHJ9dmFyIHQ9MTshYy5kYXRhLmxlbmd0aHx8QXJyYXkuaXNBcnJheShjLmRhdGFbMF0pPyhjLmRhdGE9Yy5kYXRhLm1hcChlKSx0PWMuZGF0YS5sZW5ndGgpOmMuZGF0YT1lKGMuZGF0YSwwKTttLmhlYWRlciYmYy5tZXRhJiYoYy5tZXRhLmZpZWxkcz1sKTtyZXR1cm4gZis9dCxjfSgpfWZ1bmN0aW9uIF8oKXtyZXR1cm4gbS5oZWFkZXImJjA9PT1sLmxlbmd0aH1mdW5jdGlvbiB2KGUsdCl7cmV0dXJuIGk9ZSxtLmR5bmFtaWNUeXBpbmdGdW5jdGlvbiYmdm9pZCAwPT09bS5keW5hbWljVHlwaW5nW2ldJiYobS5keW5hbWljVHlwaW5nW2ldPW0uZHluYW1pY1R5cGluZ0Z1bmN0aW9uKGkpKSwhMD09PShtLmR5bmFtaWNUeXBpbmdbaV18fG0uZHluYW1pY1R5cGluZyk/XCJ0cnVlXCI9PT10fHxcIlRSVUVcIj09PXR8fFwiZmFsc2VcIiE9PXQmJlwiRkFMU0VcIiE9PXQmJihmdW5jdGlvbihlKXtpZihzLnRlc3QoZSkpe3ZhciB0PXBhcnNlRmxvYXQoZSk7aWYobjx0JiZ0PHIpcmV0dXJuITB9cmV0dXJuITF9KHQpP3BhcnNlRmxvYXQodCk6dS50ZXN0KHQpP25ldyBEYXRlKHQpOlwiXCI9PT10P251bGw6dCk6dDt2YXIgaX1mdW5jdGlvbiBrKGUsdCxpLHIpe3ZhciBuPXt0eXBlOmUsY29kZTp0LG1lc3NhZ2U6aX07dm9pZCAwIT09ciYmKG4ucm93PXIpLGMuZXJyb3JzLnB1c2gobil9dGhpcy5wYXJzZT1mdW5jdGlvbihlLHQsaSl7dmFyIHI9bS5xdW90ZUNoYXJ8fCdcIic7aWYobS5uZXdsaW5lfHwobS5uZXdsaW5lPWZ1bmN0aW9uKGUsdCl7ZT1lLnN1YnN0cmluZygwLDEwNDg1NzYpO3ZhciBpPW5ldyBSZWdFeHAoaih0KStcIihbXl0qPylcIitqKHQpLFwiZ21cIikscj0oZT1lLnJlcGxhY2UoaSxcIlwiKSkuc3BsaXQoXCJcXHJcIiksbj1lLnNwbGl0KFwiXFxuXCIpLHM9MTxuLmxlbmd0aCYmblswXS5sZW5ndGg8clswXS5sZW5ndGg7aWYoMT09PXIubGVuZ3RofHxzKXJldHVyblwiXFxuXCI7Zm9yKHZhciBhPTAsbz0wO288ci5sZW5ndGg7bysrKVwiXFxuXCI9PT1yW29dWzBdJiZhKys7cmV0dXJuIGE+PXIubGVuZ3RoLzI/XCJcXHJcXG5cIjpcIlxcclwifShlLHIpKSxoPSExLG0uZGVsaW1pdGVyKU0obS5kZWxpbWl0ZXIpJiYobS5kZWxpbWl0ZXI9bS5kZWxpbWl0ZXIoZSksYy5tZXRhLmRlbGltaXRlcj1tLmRlbGltaXRlcik7ZWxzZXt2YXIgbj1mdW5jdGlvbihlLHQsaSxyLG4pe3ZhciBzLGEsbyxoO249bnx8W1wiLFwiLFwiXFx0XCIsXCJ8XCIsXCI7XCIsYi5SRUNPUkRfU0VQLGIuVU5JVF9TRVBdO2Zvcih2YXIgdT0wO3U8bi5sZW5ndGg7dSsrKXt2YXIgZj1uW3VdLGQ9MCxsPTAsYz0wO289dm9pZCAwO2Zvcih2YXIgcD1uZXcgRSh7Y29tbWVudHM6cixkZWxpbWl0ZXI6ZixuZXdsaW5lOnQscHJldmlldzoxMH0pLnBhcnNlKGUpLGc9MDtnPHAuZGF0YS5sZW5ndGg7ZysrKWlmKGkmJnkocC5kYXRhW2ddKSljKys7ZWxzZXt2YXIgXz1wLmRhdGFbZ10ubGVuZ3RoO2wrPV8sdm9pZCAwIT09bz8wPF8mJihkKz1NYXRoLmFicyhfLW8pLG89Xyk6bz1ffTA8cC5kYXRhLmxlbmd0aCYmKGwvPXAuZGF0YS5sZW5ndGgtYyksKHZvaWQgMD09PWF8fGQ8PWEpJiYodm9pZCAwPT09aHx8aDxsKSYmMS45OTxsJiYoYT1kLHM9ZixoPWwpfXJldHVybntzdWNjZXNzZnVsOiEhKG0uZGVsaW1pdGVyPXMpLGJlc3REZWxpbWl0ZXI6c319KGUsbS5uZXdsaW5lLG0uc2tpcEVtcHR5TGluZXMsbS5jb21tZW50cyxtLmRlbGltaXRlcnNUb0d1ZXNzKTtuLnN1Y2Nlc3NmdWw/bS5kZWxpbWl0ZXI9bi5iZXN0RGVsaW1pdGVyOihoPSEwLG0uZGVsaW1pdGVyPWIuRGVmYXVsdERlbGltaXRlciksYy5tZXRhLmRlbGltaXRlcj1tLmRlbGltaXRlcn12YXIgcz13KG0pO3JldHVybiBtLnByZXZpZXcmJm0uaGVhZGVyJiZzLnByZXZpZXcrKyxhPWUsbz1uZXcgRShzKSxjPW8ucGFyc2UoYSx0LGkpLGcoKSxkP3ttZXRhOntwYXVzZWQ6ITB9fTpjfHx7bWV0YTp7cGF1c2VkOiExfX19LHRoaXMucGF1c2VkPWZ1bmN0aW9uKCl7cmV0dXJuIGR9LHRoaXMucGF1c2U9ZnVuY3Rpb24oKXtkPSEwLG8uYWJvcnQoKSxhPU0obS5jaHVuayk/XCJcIjphLnN1YnN0cmluZyhvLmdldENoYXJJbmRleCgpKX0sdGhpcy5yZXN1bWU9ZnVuY3Rpb24oKXt0LnN0cmVhbWVyLl9oYWx0ZWQ/KGQ9ITEsdC5zdHJlYW1lci5wYXJzZUNodW5rKGEsITApKTpzZXRUaW1lb3V0KHQucmVzdW1lLDMpfSx0aGlzLmFib3J0ZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gZX0sdGhpcy5hYm9ydD1mdW5jdGlvbigpe2U9ITAsby5hYm9ydCgpLGMubWV0YS5hYm9ydGVkPSEwLE0obS5jb21wbGV0ZSkmJm0uY29tcGxldGUoYyksYT1cIlwifX1mdW5jdGlvbiBqKGUpe3JldHVybiBlLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLFwiXFxcXCQmXCIpfWZ1bmN0aW9uIEUoZSl7dmFyIFMsTz0oZT1lfHx7fSkuZGVsaW1pdGVyLHg9ZS5uZXdsaW5lLEk9ZS5jb21tZW50cyxUPWUuc3RlcCxEPWUucHJldmlldyxBPWUuZmFzdE1vZGUsTD1TPXZvaWQgMD09PWUucXVvdGVDaGFyPydcIic6ZS5xdW90ZUNoYXI7aWYodm9pZCAwIT09ZS5lc2NhcGVDaGFyJiYoTD1lLmVzY2FwZUNoYXIpLChcInN0cmluZ1wiIT10eXBlb2YgT3x8LTE8Yi5CQURfREVMSU1JVEVSUy5pbmRleE9mKE8pKSYmKE89XCIsXCIpLEk9PT1PKXRocm93IG5ldyBFcnJvcihcIkNvbW1lbnQgY2hhcmFjdGVyIHNhbWUgYXMgZGVsaW1pdGVyXCIpOyEwPT09ST9JPVwiI1wiOihcInN0cmluZ1wiIT10eXBlb2YgSXx8LTE8Yi5CQURfREVMSU1JVEVSUy5pbmRleE9mKEkpKSYmKEk9ITEpLFwiXFxuXCIhPT14JiZcIlxcclwiIT09eCYmXCJcXHJcXG5cIiE9PXgmJih4PVwiXFxuXCIpO3ZhciBGPTAsej0hMTt0aGlzLnBhcnNlPWZ1bmN0aW9uKHIsdCxpKXtpZihcInN0cmluZ1wiIT10eXBlb2Ygcil0aHJvdyBuZXcgRXJyb3IoXCJJbnB1dCBtdXN0IGJlIGEgc3RyaW5nXCIpO3ZhciBuPXIubGVuZ3RoLGU9Ty5sZW5ndGgscz14Lmxlbmd0aCxhPUkubGVuZ3RoLG89TShUKSxoPVtdLHU9W10sZj1bXSxkPUY9MDtpZighcilyZXR1cm4gQygpO2lmKEF8fCExIT09QSYmLTE9PT1yLmluZGV4T2YoUykpe2Zvcih2YXIgbD1yLnNwbGl0KHgpLGM9MDtjPGwubGVuZ3RoO2MrKyl7aWYoZj1sW2NdLEYrPWYubGVuZ3RoLGMhPT1sLmxlbmd0aC0xKUYrPXgubGVuZ3RoO2Vsc2UgaWYoaSlyZXR1cm4gQygpO2lmKCFJfHxmLnN1YnN0cmluZygwLGEpIT09SSl7aWYobyl7aWYoaD1bXSxrKGYuc3BsaXQoTykpLFIoKSx6KXJldHVybiBDKCl9ZWxzZSBrKGYuc3BsaXQoTykpO2lmKEQmJkQ8PWMpcmV0dXJuIGg9aC5zbGljZSgwLEQpLEMoITApfX1yZXR1cm4gQygpfWZvcih2YXIgcD1yLmluZGV4T2YoTyxGKSxnPXIuaW5kZXhPZih4LEYpLF89bmV3IFJlZ0V4cChqKEwpK2ooUyksXCJnXCIpLG09ci5pbmRleE9mKFMsRik7OylpZihyW0ZdIT09UylpZihJJiYwPT09Zi5sZW5ndGgmJnIuc3Vic3RyaW5nKEYsRithKT09PUkpe2lmKC0xPT09ZylyZXR1cm4gQygpO0Y9ZytzLGc9ci5pbmRleE9mKHgsRikscD1yLmluZGV4T2YoTyxGKX1lbHNlIGlmKC0xIT09cCYmKHA8Z3x8LTE9PT1nKSlmLnB1c2goci5zdWJzdHJpbmcoRixwKSksRj1wK2UscD1yLmluZGV4T2YoTyxGKTtlbHNle2lmKC0xPT09ZylicmVhaztpZihmLnB1c2goci5zdWJzdHJpbmcoRixnKSksdyhnK3MpLG8mJihSKCkseikpcmV0dXJuIEMoKTtpZihEJiZoLmxlbmd0aD49RClyZXR1cm4gQyghMCl9ZWxzZSBmb3IobT1GLEYrKzs7KXtpZigtMT09PShtPXIuaW5kZXhPZihTLG0rMSkpKXJldHVybiBpfHx1LnB1c2goe3R5cGU6XCJRdW90ZXNcIixjb2RlOlwiTWlzc2luZ1F1b3Rlc1wiLG1lc3NhZ2U6XCJRdW90ZWQgZmllbGQgdW50ZXJtaW5hdGVkXCIscm93OmgubGVuZ3RoLGluZGV4OkZ9KSxFKCk7aWYobT09PW4tMSlyZXR1cm4gRShyLnN1YnN0cmluZyhGLG0pLnJlcGxhY2UoXyxTKSk7aWYoUyE9PUx8fHJbbSsxXSE9PUwpe2lmKFM9PT1MfHwwPT09bXx8clttLTFdIT09TCl7LTEhPT1wJiZwPG0rMSYmKHA9ci5pbmRleE9mKE8sbSsxKSksLTEhPT1nJiZnPG0rMSYmKGc9ci5pbmRleE9mKHgsbSsxKSk7dmFyIHk9YigtMT09PWc/cDpNYXRoLm1pbihwLGcpKTtpZihyW20rMSt5XT09PU8pe2YucHVzaChyLnN1YnN0cmluZyhGLG0pLnJlcGxhY2UoXyxTKSkscltGPW0rMSt5K2VdIT09UyYmKG09ci5pbmRleE9mKFMsRikpLHA9ci5pbmRleE9mKE8sRiksZz1yLmluZGV4T2YoeCxGKTticmVha312YXIgdj1iKGcpO2lmKHIuc3Vic3RyaW5nKG0rMSt2LG0rMSt2K3MpPT09eCl7aWYoZi5wdXNoKHIuc3Vic3RyaW5nKEYsbSkucmVwbGFjZShfLFMpKSx3KG0rMSt2K3MpLHA9ci5pbmRleE9mKE8sRiksbT1yLmluZGV4T2YoUyxGKSxvJiYoUigpLHopKXJldHVybiBDKCk7aWYoRCYmaC5sZW5ndGg+PUQpcmV0dXJuIEMoITApO2JyZWFrfXUucHVzaCh7dHlwZTpcIlF1b3Rlc1wiLGNvZGU6XCJJbnZhbGlkUXVvdGVzXCIsbWVzc2FnZTpcIlRyYWlsaW5nIHF1b3RlIG9uIHF1b3RlZCBmaWVsZCBpcyBtYWxmb3JtZWRcIixyb3c6aC5sZW5ndGgsaW5kZXg6Rn0pLG0rK319ZWxzZSBtKyt9cmV0dXJuIEUoKTtmdW5jdGlvbiBrKGUpe2gucHVzaChlKSxkPUZ9ZnVuY3Rpb24gYihlKXt2YXIgdD0wO2lmKC0xIT09ZSl7dmFyIGk9ci5zdWJzdHJpbmcobSsxLGUpO2kmJlwiXCI9PT1pLnRyaW0oKSYmKHQ9aS5sZW5ndGgpfXJldHVybiB0fWZ1bmN0aW9uIEUoZSl7cmV0dXJuIGl8fCh2b2lkIDA9PT1lJiYoZT1yLnN1YnN0cmluZyhGKSksZi5wdXNoKGUpLEY9bixrKGYpLG8mJlIoKSksQygpfWZ1bmN0aW9uIHcoZSl7Rj1lLGsoZiksZj1bXSxnPXIuaW5kZXhPZih4LEYpfWZ1bmN0aW9uIEMoZSl7cmV0dXJue2RhdGE6aCxlcnJvcnM6dSxtZXRhOntkZWxpbWl0ZXI6TyxsaW5lYnJlYWs6eCxhYm9ydGVkOnosdHJ1bmNhdGVkOiEhZSxjdXJzb3I6ZCsodHx8MCl9fX1mdW5jdGlvbiBSKCl7VChDKCkpLGg9W10sdT1bXX19LHRoaXMuYWJvcnQ9ZnVuY3Rpb24oKXt6PSEwfSx0aGlzLmdldENoYXJJbmRleD1mdW5jdGlvbigpe3JldHVybiBGfX1mdW5jdGlvbiBfKGUpe3ZhciB0PWUuZGF0YSxpPWFbdC53b3JrZXJJZF0scj0hMTtpZih0LmVycm9yKWkudXNlckVycm9yKHQuZXJyb3IsdC5maWxlKTtlbHNlIGlmKHQucmVzdWx0cyYmdC5yZXN1bHRzLmRhdGEpe3ZhciBuPXthYm9ydDpmdW5jdGlvbigpe3I9ITAsbSh0LndvcmtlcklkLHtkYXRhOltdLGVycm9yczpbXSxtZXRhOnthYm9ydGVkOiEwfX0pfSxwYXVzZTp5LHJlc3VtZTp5fTtpZihNKGkudXNlclN0ZXApKXtmb3IodmFyIHM9MDtzPHQucmVzdWx0cy5kYXRhLmxlbmd0aCYmKGkudXNlclN0ZXAoe2RhdGE6dC5yZXN1bHRzLmRhdGFbc10sZXJyb3JzOnQucmVzdWx0cy5lcnJvcnMsbWV0YTp0LnJlc3VsdHMubWV0YX0sbiksIXIpO3MrKyk7ZGVsZXRlIHQucmVzdWx0c31lbHNlIE0oaS51c2VyQ2h1bmspJiYoaS51c2VyQ2h1bmsodC5yZXN1bHRzLG4sdC5maWxlKSxkZWxldGUgdC5yZXN1bHRzKX10LmZpbmlzaGVkJiYhciYmbSh0LndvcmtlcklkLHQucmVzdWx0cyl9ZnVuY3Rpb24gbShlLHQpe3ZhciBpPWFbZV07TShpLnVzZXJDb21wbGV0ZSkmJmkudXNlckNvbXBsZXRlKHQpLGkudGVybWluYXRlKCksZGVsZXRlIGFbZV19ZnVuY3Rpb24geSgpe3Rocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZC5cIil9ZnVuY3Rpb24gdyhlKXtpZihcIm9iamVjdFwiIT10eXBlb2YgZXx8bnVsbD09PWUpcmV0dXJuIGU7dmFyIHQ9QXJyYXkuaXNBcnJheShlKT9bXTp7fTtmb3IodmFyIGkgaW4gZSl0W2ldPXcoZVtpXSk7cmV0dXJuIHR9ZnVuY3Rpb24gdihlLHQpe3JldHVybiBmdW5jdGlvbigpe2UuYXBwbHkodCxhcmd1bWVudHMpfX1mdW5jdGlvbiBNKGUpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGV9cmV0dXJuIG8mJihmLm9ubWVzc2FnZT1mdW5jdGlvbihlKXt2YXIgdD1lLmRhdGE7dm9pZCAwPT09Yi5XT1JLRVJfSUQmJnQmJihiLldPUktFUl9JRD10LndvcmtlcklkKTtpZihcInN0cmluZ1wiPT10eXBlb2YgdC5pbnB1dClmLnBvc3RNZXNzYWdlKHt3b3JrZXJJZDpiLldPUktFUl9JRCxyZXN1bHRzOmIucGFyc2UodC5pbnB1dCx0LmNvbmZpZyksZmluaXNoZWQ6ITB9KTtlbHNlIGlmKGYuRmlsZSYmdC5pbnB1dCBpbnN0YW5jZW9mIEZpbGV8fHQuaW5wdXQgaW5zdGFuY2VvZiBPYmplY3Qpe3ZhciBpPWIucGFyc2UodC5pbnB1dCx0LmNvbmZpZyk7aSYmZi5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Yi5XT1JLRVJfSUQscmVzdWx0czppLGZpbmlzaGVkOiEwfSl9fSksKGwucHJvdG90eXBlPU9iamVjdC5jcmVhdGUodS5wcm90b3R5cGUpKS5jb25zdHJ1Y3Rvcj1sLChjLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHUucHJvdG90eXBlKSkuY29uc3RydWN0b3I9YywocC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShwLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yPXAsKGcucHJvdG90eXBlPU9iamVjdC5jcmVhdGUodS5wcm90b3R5cGUpKS5jb25zdHJ1Y3Rvcj1nLGJ9KTsiLCAiXG5leHBvcnQgZnVuY3Rpb24gd2Vic29ja2V0KHVybDogVVJMLCBlbnRyaWVzOiB1bmtub3duW10sIG9uT3BlbjogKCkgPT4gdm9pZCkge1xuICAgIGxldCB3cyA9IG5ldyBXZWJTb2NrZXQodXJsKTtcbiAgICBpZiAoIXdzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInNlcnZlciBkaWRuJ3QgYWNjZXB0IHdzXCIpO1xuICAgIH1cbiAgICB3cy5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdPcGVuZWQgd2Vic29ja2V0Jyk7XG4gICAgICAgIG9uT3BlbigpXG4gICAgfSk7XG4gICAgd3MuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY291bnQsIHR6LCBlcnJvciwgbmFtZSwgZHVyYXRpb24sIGVuZFRpbWUgfSA9IEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgICAgICAgaWYgKG5hbWUgJiYgZHVyYXRpb24gJiYgZW5kVGltZSkge1xuXG4gICAgICAgICAgICBsZXQgc3RhcnRUaW1lID0gZW5kVGltZSAtIGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgIHNlcnZlckVudHJ5ID0geyBuYW1lLCBkdXJhdGlvbiwgc3RhcnRUaW1lLCBlbnRyeVR5cGU6ICdzZXJ2ZXInLCBlbmRUaW1lIH1cbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhzZXJ2ZXJFbnRyeSlcbiAgICAgICAgICAgIGVudHJpZXMucHVzaChzZXJ2ZXJFbnRyeSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oeyBjb3VudCwgdHosIGVycm9yIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgd3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Nsb3NlZCB3ZWJzb2NrZXQnKTtcblxuICAgIH0pO1xuICAgIHJldHVybiB3cztcbn1cbiIsICJleHBvcnQgdHlwZSBUYnJpZWZFbnRyeSA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZW5kVGltZTogbnVtYmVyO1xuICAgIHN0YXJ0VGltZTogbnVtYmVyO1xuICAgIGR1cmF0aW9uOiBudW1iZXI7XG4gICAgZW50cnlUeXBlOiBzdHJpbmc7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdE9ic2VydmVycyhlbnRyaWVzOiB1bmtub3duW10pIHtcbiAgICBjb25zdCBwbyA9IG5ldyBQZXJmb3JtYW5jZU9ic2VydmVyKChsaXN0KSA9PiB7XG4gICAgICAgIGxpc3QuZ2V0RW50cmllcygpLmZvckVhY2goXG4gICAgICAgICAgICAoZW50cnk6IFBlcmZvcm1hbmNlRW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgeyBzdGFydFRpbWUsIGR1cmF0aW9uLCBuYW1lLCBlbnRyeVR5cGUgfSA9IGVudHJ5XG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lID0gTWF0aC5mbG9vcihzdGFydFRpbWUpXG4gICAgICAgICAgICAgICAgZHVyYXRpb24gPSBNYXRoLmZsb29yKGR1cmF0aW9uKVxuICAgICAgICAgICAgICAgIGxldCBlbmRUaW1lID0gc3RhcnRUaW1lICsgZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJyaWVmRW50cnkgPSB7IG5hbWUsIGVuZFRpbWUsIHN0YXJ0VGltZSwgZHVyYXRpb24sIGVudHJ5VHlwZSB9O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJyaWVmRW50cnkpXG4gICAgICAgICAgICAgICAgZW50cmllcy5wdXNoKGJyaWVmRW50cnkpXG4gICAgICAgICAgICB9KVxuICAgIH0pXG4gICAgY29uc3Qgcm8gPSBuZXcgUGVyZm9ybWFuY2VPYnNlcnZlcigobGlzdCkgPT4ge1xuICAgICAgICBsaXN0LmdldEVudHJpZXNCeVR5cGUoJ3Jlc291cmNlJykuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGxldCB7IHN0YXJ0VGltZSwgZHVyYXRpb24sIG5hbWUsIGVudHJ5VHlwZSwgcmVzcG9uc2VTdGFydCwgcmVzcG9uc2VFbmQsIHNlcnZlclRpbWluZyB9ID0gZW50cnkgYXMgUGVyZm9ybWFuY2VSZXNvdXJjZVRpbWluZ1xuICAgICAgICAgICAgaWYgKG5hbWUuaW5jbHVkZXMoJ21pdG0nKSB8fCBuYW1lLmluY2x1ZGVzKCdmYXZpY29uJykpIHJldHVyblxuICAgICAgICAgICAgc3RhcnRUaW1lID0gTWF0aC5mbG9vcihzdGFydFRpbWUpXG4gICAgICAgICAgICBkdXJhdGlvbiA9IE1hdGguZmxvb3IoZHVyYXRpb24pXG4gICAgICAgICAgICByZXNwb25zZUVuZCA9IE1hdGguZmxvb3IocmVzcG9uc2VFbmQpXG4gICAgICAgICAgICByZXNwb25zZVN0YXJ0ID0gTWF0aC5mbG9vcihyZXNwb25zZVN0YXJ0KVxuICAgICAgICAgICAgaWYgKC9eaHR0cHM/OlxcL1xcLy8udGVzdChuYW1lKSkgbmFtZSA9IFN0cmluZyhuYW1lLnNwbGl0KCcvJykucG9wKCkpXG4gICAgICAgICAgICBzZXJ2ZXJUaW1pbmcuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgeyBuYW1lLCBkdXJhdGlvbiwgZGVzY3JpcHRpb24gfSA9IGVudHJ5LFxuICAgICAgICAgICAgICAgICAgICBlbmRUaW1lID0gTnVtYmVyKGRlc2NyaXB0aW9uLnJlcGxhY2UoJ2VuZHRpbWU6JywgJycpKSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lID0gZW5kVGltZSAtIGR1cmF0aW9uXG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh7IG5hbWUsIGR1cmF0aW9uLCBzdGFydFRpbWUsIGVudHJ5VHlwZTogJ3NlcnZlcicsIGVuZFRpbWUgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBlbnRyaWVzID0gZW50cmllcy5jb25jYXQoW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2Rvd25sb2FkOnJlcXVlc3Rfc2VudCcsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgICAgICAgICAgICAgIGVuZFRpbWU6IHN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICAgICAgZW50cnlUeXBlOiAnbWFyaydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2Rvd25sb2FkOnJlc3BvbnNlX3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogcmVzcG9uc2VTdGFydCAtIHN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICAgICAgZW5kVGltZTogcmVzcG9uc2VTdGFydCxcbiAgICAgICAgICAgICAgICAgICAgZW50cnlUeXBlOiAncmVzb3VyY2UnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdkb3dubG9hZDpyZXNwb25zZV9jb21wbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogcmVzcG9uc2VTdGFydCAtIHN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHJlc3BvbnNlRW5kIC0gcmVzcG9uc2VTdGFydCxcbiAgICAgICAgICAgICAgICAgICAgZW5kVGltZTogcmVzcG9uc2VFbmQsXG4gICAgICAgICAgICAgICAgICAgIGVudHJ5VHlwZTogJ3Jlc291cmNlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pXG5cblxuICAgICAgICAgICAgY29uc29sZS5sb2coZW50cnkudG9KU09OKCkpXG5cblxuXG4gICAgICAgIH0pXG5cbiAgICB9KVxuXG4gICAgY29uc3QgbGlzdEVudHJpZXMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVudHJpZXNPYmogPSBlbnRyaWVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhLmVuZFRpbWUgLSBiLmVuZFRpbWVcbiAgICAgICAgfSkucmVkdWNlKChhY2N1bSwgZW50cnkpID0+IHtcbiAgICAgICAgICAgIGxldCB7IG5hbWUsIGVuZFRpbWUsIHN0YXJ0VGltZSwgZHVyYXRpb24sIGVudHJ5VHlwZSB9ID0gZW50cnkgYXMgVGJyaWVmRW50cnk7XG4gICAgICAgICAgICBhY2N1bVtuYW1lXSA9IHsgZW5kVGltZSwgc3RhcnRUaW1lLCBkdXJhdGlvbiwgZW50cnlUeXBlIH07XG4gICAgICAgICAgICByZXR1cm4gYWNjdW07XG4gICAgICAgIH0sIHt9IGFzIHsgW3M6IHN0cmluZ106IE9taXQ8VGJyaWVmRW50cnksICduYW1lJz4gfSlcbiAgICAgICAgd2luZG93LnJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS50YWJsZShlbnRyaWVzT2JqKTtcbiAgICAgICAgICAgIHBvICYmIHBvLmRpc2Nvbm5lY3QoKVxuICAgICAgICAgICAgcm8gJiYgcm8uZGlzY29ubmVjdCgpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4geyBybywgcG8sIGxpc3RFbnRyaWVzIH1cbn0iLCAiaW1wb3J0IHN0cmVhbVNhdmVyIGZyb20gJ3N0cmVhbXNhdmVyJztcblxuXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWQoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZmlsZU5hbWUgPSAnZmlsZS50eHQnLFxuICAgIGNiOiAoLi4uYXJnczogYW55W10pID0+IHZvaWRcbikge1xuICAgIGxldCB0dGZiID0gZmFsc2U7XG4gICAgY29uc29sZS5sb2coeyB1cmwgfSk7XG4gICAgcGVyZm9ybWFuY2UubWFyaygnZG93bmxvYWQ6c3RhcnQnKTtcblxuICAgIGxldCBkb25lID0gZmFsc2U7XG4gICAgc3RyZWFtU2F2ZXIubWl0bSA9IGAke2xvY2F0aW9uLm9yaWdpbn0vbWl0bS5odG1sYDtcbiAgICBjb25zdCBmaWxlU3RyZWFtID0gc3RyZWFtU2F2ZXIuY3JlYXRlV3JpdGVTdHJlYW0oZmlsZU5hbWUpO1xuXG4gICAgLy8gYWJvcnQgc28gaXQgZG9zZSBub3QgbG9vayBzdHVja1xuICAgIHdpbmRvdy5vbnVubG9hZCA9ICgpID0+IHtcbiAgICAgICAgZmlsZVN0cmVhbS5hYm9ydCgpO1xuICAgIH07XG5cbiAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBldnQgPT4ge1xuICAgICAgICBpZiAoIWRvbmUpIHtcbiAgICAgICAgICAgIGV2dC5yZXR1cm5WYWx1ZSA9IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gbGVhdmU/YDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnVEUnOiAndHJhaWxlcnMnLFxuICAgICAgICAgICAgJ3N0YXJ0VGltZSc6IFN0cmluZyhwZXJmb3JtYW5jZS5ub3coKSksXG4gICAgICAgICAgICAnc3RhcnRlZF9hdCc6IFN0cmluZyhNYXRoLmZsb29yKERhdGUubm93KCkgLSBwZXJmb3JtYW5jZS5ub3coKSkpLFxuICAgICAgICAgICAgJ2NhY2hlLWNvbnRyb2wnOiAnbm8tY2FjaGUsIG5vLXN0b3JlLCBtYXgtYWdlPTEsIHMtbWF4YWdlPTEnXG4gICAgICAgIH1cbiAgICB9KVxuICAgICAgICAudGhlbihyZXMgPT4ge1xuXG4gICAgICAgICAgICBpZiAoIXJlcy5ib2R5IHx8ICFyZXMub2spXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihyZXMuc3RhdHVzVGV4dCkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5ib2R5LnBpcGVUbyhmaWxlU3RyZWFtKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIHBlcmZvcm1hbmNlLm1hcmsoJ2Rvd25sb2FkOnRlYXJfZG93bicpO1xuICAgICAgICAgICAgcmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbn1cbiIsICJpbXBvcnQgeyBkb3dubG9hZCB9IGZyb20gXCIuL2Rvd25sb2FkXCI7XG5pbXBvcnQgUGFwYSBmcm9tICdwYXBhcGFyc2UnXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXBhWEhSKHVybDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nLCBjYjogRnVuY3Rpb24pIHtcblxuICAgIHBlcmZvcm1hbmNlLm1hcmsoJ1hIUjpzdGFydCcpO1xuICAgIGxldCB0aW1lck9wZW4gPSB0cnVlLCBzZXBhcmF0b3IgPSAnWycsIHN0cmluZ2lmaWVkID0gJyc7XG4gICAgUGFwYS5wYXJzZSh1cmwsIHtcbiAgICAgICAgZG93bmxvYWQ6IHRydWUsXG4gICAgICAgIGNodW5rU2l6ZTogNyAqIDEwMjQgKiAxMDI0LFxuICAgICAgICBiZWZvcmVGaXJzdENodW5rOiAoY2h1bmspID0+IHtcbiAgICAgICAgICAgIHBlcmZvcm1hbmNlLm1hcmsoJ1hIUjpmaW5pc2gnKTtcbiAgICAgICAgICAgIHJldHVybiBjaHVuaztcbiAgICAgICAgfSxcbiAgICAgICAgc3RlcDogKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgLy9wYXJzZWQucHVzaChyZXN1bHQuZGF0YSlcbiAgICAgICAgICAgIHN0cmluZ2lmaWVkICs9IHNlcGFyYXRvciArIEpTT04uc3RyaW5naWZ5KHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIHNlcGFyYXRvciA9ICcsJztcbiAgICAgICAgICAgIGlmICh0aW1lck9wZW4pIHtcbiAgICAgICAgICAgICAgICB0aW1lck9wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBwZXJmb3JtYW5jZS5tYXJrKCdQYXJzZTpzdGFydCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBwZXJmb3JtYW5jZS5tZWFzdXJlKCdQYXJzZTplbmQnLCAnUGFyc2U6c3RhcnQnKTtcbiAgICAgICAgICAgIHN0cmluZ2lmaWVkICs9ICddJztcbiAgICAgICAgICAgIGNvbnN0IGJsb2JVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtzdHJpbmdpZmllZF0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pKTtcbiAgICAgICAgICAgIGRvd25sb2FkKGJsb2JVcmwsICd4aHIuanNvbicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVcmwpO1xuICAgICAgICAgICAgICAgIHN0cmluZ2lmaWVkID0gJyc7XG4gICAgICAgICAgICAgICAgcGVyZm9ybWFuY2UubWFyaygnZG93bmxvYWQ6dGVhcl9kb3duJyk7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBwYXBhU3RyaW5nKHVybDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nLCBjYiA9IEZ1bmN0aW9uKSB7XG4gICAgcGVyZm9ybWFuY2UubWFyaygnZmV0Y2g6c3RhcnQnKTtcbiAgICBmZXRjaCh1cmwpLnRoZW4ocmVzID0+IHtcblxuICAgICAgICByZXR1cm4gcmVzLnRleHQoKTtcbiAgICB9KS50aGVuKGNzdlN0cmluZyA9PiB7XG4gICAgICAgIHBlcmZvcm1hbmNlLm1hcmsoJ2ZldGNoOmZpbmlzaCcpO1xuXG4gICAgICAgIGNvbnN0IGJsb2JVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtQYXBhLnBhcnNlKGNzdlN0cmluZykuZGF0YV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pKTtcbiAgICAgICAgZG93bmxvYWQoYmxvYlVybCwgJ3BhcGFfc3RyaW5nLmpzb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVcmwpO1xuXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcGFwYUZpbGUodXJsOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcsIGNiID0gRnVuY3Rpb24pIHtcbiAgICBwZXJmb3JtYW5jZS5tYXJrKCdmZXRjaDpzdGFydCcpO1xuICAgIGZldGNoKHVybCkudGhlbihyZXMgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLmJsb2IoKTtcbiAgICB9KS50aGVuKGJsb2IgPT4ge1xuICAgICAgICBwZXJmb3JtYW5jZS5tYXJrKCdmZXRjaDpmaW5pc2gnKTtcbiAgICAgICAgdmFyIGZpbGUgPSBuZXcgRmlsZShbYmxvYl0sIFwicGFwYV9jc3YuY3N2XCIsIHsgdHlwZTogXCJ0ZXh0L2NzdlwiLCBsYXN0TW9kaWZpZWQ6IG5ldyBEYXRlKCkuZ2V0VGltZSgpIH0pO1xuICAgICAgICBwZXJmb3JtYW5jZS5tYXJrKCdQYXJzZTpzdGFydCcpO1xuICAgICAgICBQYXBhLnBhcnNlKGZpbGUsIHtcbiAgICAgICAgICAgIGNvbXBsZXRlOiAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgcGVyZm9ybWFuY2UubWVhc3VyZSgnUGFyc2U6ZW5kJywgJ1BhcnNlOnN0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvYlVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KHJlc3VsdC5kYXRhKV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pKTtcbiAgICAgICAgICAgICAgICBkb3dubG9hZChibG9iVXJsLCAncGFwYUZpbGUuanNvbicsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChibG9iVXJsKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgfSk7XG59XG4iLCAiLy8vIDxyZWZlcmVuY2UgbGliPVwiZG9tXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwic3RyZWFtc2F2ZXJcIiAvPlxuXG5pbXBvcnQgeyB3ZWJzb2NrZXQgfSBmcm9tICcuL2JlbmNoL3dlYnNvY2tldCdcbmltcG9ydCB7IGluaXRPYnNlcnZlcnMgfSBmcm9tICcuL2JlbmNoL29ic2VydmVycydcbmltcG9ydCB7IHBhcGFYSFIgfSBmcm9tICcuL2JlbmNoL3BhcGFYSFInXG5pbXBvcnQgeyBkb3dubG9hZCB9IGZyb20gJy4vYmVuY2gvZG93bmxvYWQnXG5pbXBvcnQgdHlwZSB7IFRicmllZkVudHJ5IH0gZnJvbSAnLi9iZW5jaC9vYnNlcnZlcnMnXG5cblxuXG5leHBvcnQgbGV0IGVudHJpZXMgPSBbXSBhcyBUYnJpZWZFbnRyeVtdXG5cbmNvbnN0IHsgcG8sIHJvLCBsaXN0RW50cmllcyB9ID0gaW5pdE9ic2VydmVycyhlbnRyaWVzKVxuXG5nbG9iYWxUaGlzLmNvbm5lY3QgPSAoY2IpID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pXG4gICAgdXJsLnByb3RvY29sID0gJ3dzcydcbiAgICB1cmwucGF0aG5hbWUgPSBcIi9jc3Yvd3NcIlxuICAgIGdsb2JhbFRoaXMud3MgPSB3ZWJzb2NrZXQodXJsLCBlbnRyaWVzLCBjYilcbn1cblxuXG5cblxuZ2xvYmFsVGhpcy5jb25uZWN0KCgpID0+IHtcbiAgICBwby5vYnNlcnZlKHsgZW50cnlUeXBlczogWydtYXJrJywgJ21lYXN1cmUnXSB9KTtcbiAgICByby5vYnNlcnZlKHsgZW50cnlUeXBlczogWydyZXNvdXJjZSddIH0pXG5cbiAgICByZXF1ZXN0SWRsZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgLy9wYXBhWEhSKFwiL2Nzdi9yYXcuanNvblwiLCAncmF3Lmpzb24nLCAoKSA9PiB7IGxpc3RFbnRyaWVzKCkgfSlcbiAgICAgICAgLy9wYXBhU3RyaW5nKFwiaHR0cDovL2xvY2FsaG9zdDo4Nzg3L2Nzdi9yYXcuanNvblwiKVxuICAgICAgICAvL3BhcGFGaWxlKFwiaHR0cDovL2xvY2FsaG9zdDo4Nzg3L2Nzdi9yYXcuanNvblwiKVxuICAgICAgICBsZXQgZmlsZW5hbWUgPSBsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJykgfHwgJ2ZldGNoLmpzb24nXG4gICAgICAgIGlmIChmaWxlbmFtZS5pbmNsdWRlcygneGhyJykpIHtcbiAgICAgICAgICAgIHBhcGFYSFIoXCIvY3N2L3Jhdy5qc29uXCIsICdyYXcuanNvbicsICgpID0+IHsgbGlzdEVudHJpZXMoKSB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZW5hbWUpXG4gICAgICAgICAgICBkb3dubG9hZChgL2Nzdi8ke2ZpbGVuYW1lfWAsIGZpbGVuYW1lLCAoKSA9PiB7IGxpc3RFbnRyaWVzKCkgfSlcbiAgICAgICAgfVxuICAgICAgICAvL2Rvd25sb2FkKCcvY3N2L3RyYW5zZm9ybS5qc29uJywgJ3RyYW5zZm9ybS5qc29uJywgKCkgPT4geyBsaXN0RW50cmllcygpIH0pXG4gICAgICAgIC8vZG93bmxvYWQoJy9jc3YvZmV0Y2guanNvbicsICdmZXRjaC5qc29uJywgKCkgPT4geyBsaXN0RW50cmllcygpIH0pXG5cbiAgICB9KTtcblxufSlcblxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUMsSUFBQyxFQUFDLEdBQU0sTUFBZTtBQUN0QixhQUFPLE1BQVcsY0FDZCxHQUFPLFVBQVUsTUFDakIsT0FBTyxVQUFXLGNBQWMsT0FBTyxPQUFPLE9BQVEsV0FDcEQsT0FBTyxLQUNQLEdBQUssS0FBUTtBQUFBLE9BQ2xCLGVBQWUsTUFBTTtBQUN0QjtBQUVBLFVBQU0s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
