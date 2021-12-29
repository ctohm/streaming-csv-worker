(() => {
  var Te = Object.create;
  var fe = Object.defineProperty;
  var Ce = Object.getOwnPropertyDescriptor;
  var Oe = Object.getOwnPropertyNames;
  var xe = Object.getPrototypeOf, Le = Object.prototype.hasOwnProperty;
  var Ie = (u) => fe(u, "__esModule", { value: !0 });
  var be = (u, i) => () => (i || u((i = { exports: {} }).exports, i), i.exports);
  var Me = (u, i, C) => {
    if (i && typeof i == "object" || typeof i == "function")
      for (let j of Oe(i))
        !Le.call(u, j) && j !== "default" && fe(u, j, { get: () => i[j], enumerable: !(C = Ce(i, j)) || C.enumerable });
    return u;
  }, we = (u) => Me(Ie(fe(u != null ? Te(xe(u)) : {}, "default", u && u.__esModule && "default" in u ? { get: () => u.default, enumerable: !0 } : { value: u, enumerable: !0 })), u);

  // node_modules/streamsaver/StreamSaver.js
  var Ee = be((he, de) => {
    ((u, i) => {
      typeof de != "undefined" ? de.exports = i() : typeof define == "function" && typeof define.amd == "object" ? define(i) : he[u] = i();
    })("streamSaver", () => {
      "use strict";
      let u = typeof window == "object" ? window : he;
      u.HTMLElement || console.warn("streamsaver is meant to run on browsers main thread");
      let i = null, C = !1, j = (D) => {
        try {
          D();
        } catch (g) {
        }
      }, z = u.WebStreamsPolyfill || {}, x = u.isSecureContext, n = /constructor/i.test(u.HTMLElement) || !!u.safari || !!u.WebKitPoint, k = x || "MozAppearance" in document.documentElement.style ? "iframe" : "navigate", y = {
        createWriteStream: re,
        WritableStream: u.WritableStream || z.WritableStream,
        supported: !0,
        version: { full: "2.0.5", major: 2, minor: 0, dot: 5 },
        mitm: "https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0"
      };
      function W(D) {
        if (!D)
          throw new Error("meh");
        let g = document.createElement("iframe");
        return g.hidden = !0, g.src = D, g.loaded = !1, g.name = "iframe", g.isIframe = !0, g.postMessage = (...X) => g.contentWindow.postMessage(...X), g.addEventListener("load", () => {
          g.loaded = !0;
        }, { once: !0 }), document.body.appendChild(g), g;
      }
      function O(D) {
        let g = "width=200,height=100", X = document.createDocumentFragment(), L = {
          frame: u.open(D, "popup", g),
          loaded: !1,
          isIframe: !1,
          isPopup: !0,
          remove() {
            L.frame.close();
          },
          addEventListener(...R) {
            X.addEventListener(...R);
          },
          dispatchEvent(...R) {
            X.dispatchEvent(...R);
          },
          removeEventListener(...R) {
            X.removeEventListener(...R);
          },
          postMessage(...R) {
            L.frame.postMessage(...R);
          }
        }, ne = (R) => {
          R.source === L.frame && (L.loaded = !0, u.removeEventListener("message", ne), L.dispatchEvent(new Event("load")));
        };
        return u.addEventListener("message", ne), L;
      }
      try {
        new Response(new ReadableStream()), x && !("serviceWorker" in navigator) && (n = !0);
      } catch (D) {
        n = !0;
      }
      j(() => {
        let { readable: D } = new TransformStream(), g = new MessageChannel();
        g.port1.postMessage(D, [D]), g.port1.close(), g.port2.close(), C = !0, Object.defineProperty(y, "TransformStream", {
          configurable: !1,
          writable: !1,
          value: TransformStream
        });
      });
      function A() {
        i || (i = x ? W(y.mitm) : O(y.mitm));
      }
      function re(D, g, X) {
        let L = {
          size: null,
          pathname: null,
          writableStrategy: void 0,
          readableStrategy: void 0
        }, ne = 0, R = null, J = null, Z = null;
        if (Number.isFinite(g) ? ([X, g] = [g, X], console.warn("[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream"), L.size = X, L.writableStrategy = g) : g && g.highWaterMark ? (console.warn("[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream"), L.size = X, L.writableStrategy = g) : L = g || {}, !n) {
          A(), J = new MessageChannel(), D = encodeURIComponent(D.replace(/\//g, ":")).replace(/['()]/g, escape).replace(/\*/g, "%2A");
          let t = {
            transferringReadable: C,
            pathname: L.pathname || Math.random().toString().slice(-6) + "/" + D,
            headers: {
              "Content-Type": "application/octet-stream; charset=utf-8",
              "Content-Disposition": "attachment; filename*=UTF-8''" + D
            }
          };
          L.size && (t.headers["Content-Length"] = L.size);
          let e = [t, "*", [J.port2]];
          if (C) {
            let r = k === "iframe" ? void 0 : {
              transform(o, d) {
                if (!(o instanceof Uint8Array))
                  throw new TypeError("Can only wirte Uint8Arrays");
                ne += o.length, d.enqueue(o), R && (location.href = R, R = null);
              },
              flush() {
                R && (location.href = R);
              }
            };
            Z = new y.TransformStream(r, L.writableStrategy, L.readableStrategy);
            let s = Z.readable;
            J.port1.postMessage({ readableStream: s }, [s]);
          }
          J.port1.onmessage = (r) => {
            r.data.download && (k === "navigate" ? (i.remove(), i = null, ne ? location.href = r.data.download : R = r.data.download) : (i.isPopup && (i.remove(), i = null, k === "iframe" && W(y.mitm)), W(r.data.download)));
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
            J.port1.postMessage(t), ne += t.length, R && (location.href = R, R = null);
          },
          close() {
            if (n) {
              let t = new Blob(b, { type: "application/octet-stream; charset=utf-8" }), e = document.createElement("a");
              e.href = URL.createObjectURL(t), e.download = D, e.click();
            } else
              J.port1.postMessage("end");
          },
          abort() {
            b = [], J.port1.postMessage("abort"), J.port1.onmessage = null, J.port1.close(), J.port2.close(), J = null;
          }
        }, L.writableStrategy);
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
      var i = typeof self != "undefined" ? self : typeof window != "undefined" ? window : i !== void 0 ? i : {}, C = !i.document && !!i.postMessage, j = C && /blob:/i.test((i.location || {}).protocol), z = {}, x = 0, n = { parse: function(t, e) {
        var r = (e = e || {}).dynamicTyping || !1;
        if (b(r) && (e.dynamicTypingFunction = r, r = {}), e.dynamicTyping = r, e.transform = !!b(e.transform) && e.transform, e.worker && n.WORKERS_SUPPORTED) {
          var s = function() {
            if (!n.WORKERS_SUPPORTED)
              return !1;
            var d = (q = i.URL || i.webkitURL || null, T = u.toString(), n.BLOB_URL || (n.BLOB_URL = q.createObjectURL(new Blob(["(", T, ")();"], { type: "text/javascript" })))), m = new i.Worker(d), q, T;
            return m.onmessage = L, m.id = x++, z[m.id] = m;
          }();
          return s.userStep = e.step, s.userChunk = e.chunk, s.userComplete = e.complete, s.userError = e.error, e.step = b(e.step), e.chunk = b(e.chunk), e.complete = b(e.complete), e.error = b(e.error), delete e.worker, void s.postMessage({ input: t, config: e, workerId: s.id });
        }
        var o = null;
        return n.NODE_STREAM_INPUT, typeof t == "string" ? o = e.download ? new W(e) : new A(e) : t.readable === !0 && b(t.read) && b(t.on) ? o = new re(e) : (i.File && t instanceof File || t instanceof Object) && (o = new O(e)), o.stream(t);
      }, unparse: function(t, e) {
        var r = !1, s = !0, o = ",", d = `\r
`, m = '"', q = m + m, T = !1, l = null, I = !1;
        (function() {
          if (typeof e == "object") {
            if (typeof e.delimiter != "string" || n.BAD_DELIMITERS.filter(function(a) {
              return e.delimiter.indexOf(a) !== -1;
            }).length || (o = e.delimiter), (typeof e.quotes == "boolean" || typeof e.quotes == "function" || Array.isArray(e.quotes)) && (r = e.quotes), typeof e.skipEmptyLines != "boolean" && typeof e.skipEmptyLines != "string" || (T = e.skipEmptyLines), typeof e.newline == "string" && (d = e.newline), typeof e.quoteChar == "string" && (m = e.quoteChar), typeof e.header == "boolean" && (s = e.header), Array.isArray(e.columns)) {
              if (e.columns.length === 0)
                throw new Error("Option columns is empty");
              l = e.columns;
            }
            e.escapeChar !== void 0 && (q = e.escapeChar + m), typeof e.escapeFormulae == "boolean" && (I = e.escapeFormulae);
          }
        })();
        var h = new RegExp(g(m), "g");
        if (typeof t == "string" && (t = JSON.parse(t)), Array.isArray(t)) {
          if (!t.length || Array.isArray(t[0]))
            return ee(null, t, T);
          if (typeof t[0] == "object")
            return ee(l || Object.keys(t[0]), t, T);
        } else if (typeof t == "object")
          return typeof t.data == "string" && (t.data = JSON.parse(t.data)), Array.isArray(t.data) && (t.fields || (t.fields = t.meta && t.meta.fields), t.fields || (t.fields = Array.isArray(t.data[0]) ? t.fields : typeof t.data[0] == "object" ? Object.keys(t.data[0]) : []), Array.isArray(t.data[0]) || typeof t.data[0] == "object" || (t.data = [t.data])), ee(t.fields || [], t.data || [], T);
        throw new Error("Unable to serialize unrecognized input");
        function ee(a, E, M) {
          var H = "";
          typeof a == "string" && (a = JSON.parse(a)), typeof E == "string" && (E = JSON.parse(E));
          var N = Array.isArray(a) && 0 < a.length, F = !Array.isArray(E[0]);
          if (N && s) {
            for (var P = 0; P < a.length; P++)
              0 < P && (H += o), H += B(a[P], P);
            0 < E.length && (H += d);
          }
          for (var c = 0; c < E.length; c++) {
            var w = N ? a.length : E[c].length, v = !1, S = N ? Object.keys(E[c]).length === 0 : E[c].length === 0;
            if (M && !N && (v = M === "greedy" ? E[c].join("").trim() === "" : E[c].length === 1 && E[c][0].length === 0), M === "greedy" && N) {
              for (var _ = [], p = 0; p < w; p++) {
                var U = F ? a[p] : p;
                _.push(E[c][U]);
              }
              v = _.join("").trim() === "";
            }
            if (!v) {
              for (var f = 0; f < w; f++) {
                0 < f && !S && (H += o);
                var Q = N && F ? a[f] : f;
                H += B(E[c][Q], f);
              }
              c < E.length - 1 && (!M || 0 < w && !S) && (H += d);
            }
          }
          return H;
        }
        function B(a, E) {
          if (a == null)
            return "";
          if (a.constructor === Date)
            return JSON.stringify(a).slice(1, 25);
          I === !0 && typeof a == "string" && a.match(/^[=+\-@].*$/) !== null && (a = "'" + a);
          var M = a.toString().replace(h, q), H = typeof r == "boolean" && r || typeof r == "function" && r(a, E) || Array.isArray(r) && r[E] || function(N, F) {
            for (var P = 0; P < F.length; P++)
              if (-1 < N.indexOf(F[P]))
                return !0;
            return !1;
          }(M, n.BAD_DELIMITERS) || -1 < M.indexOf(o) || M.charAt(0) === " " || M.charAt(M.length - 1) === " ";
          return H ? m + M + m : M;
        }
      } };
      if (n.RECORD_SEP = String.fromCharCode(30), n.UNIT_SEP = String.fromCharCode(31), n.BYTE_ORDER_MARK = "\uFEFF", n.BAD_DELIMITERS = ["\r", `
`, '"', n.BYTE_ORDER_MARK], n.WORKERS_SUPPORTED = !C && !!i.Worker, n.NODE_STREAM_INPUT = 1, n.LocalChunkSize = 10485760, n.RemoteChunkSize = 5242880, n.DefaultDelimiter = ",", n.Parser = X, n.ParserHandle = D, n.NetworkStreamer = W, n.FileStreamer = O, n.StringStreamer = A, n.ReadableStreamStreamer = re, i.jQuery) {
        var k = i.jQuery;
        k.fn.parse = function(t) {
          var e = t.config || {}, r = [];
          return this.each(function(d) {
            if (!(k(this).prop("tagName").toUpperCase() === "INPUT" && k(this).attr("type").toLowerCase() === "file" && i.FileReader) || !this.files || this.files.length === 0)
              return !0;
            for (var m = 0; m < this.files.length; m++)
              r.push({ file: this.files[m], inputElem: this, instanceConfig: k.extend({}, e) });
          }), s(), this;
          function s() {
            if (r.length !== 0) {
              var d, m, q, T, l = r[0];
              if (b(t.before)) {
                var I = t.before(l.file, l.inputElem);
                if (typeof I == "object") {
                  if (I.action === "abort")
                    return d = "AbortError", m = l.file, q = l.inputElem, T = I.reason, void (b(t.error) && t.error({ name: d }, m, q, T));
                  if (I.action === "skip")
                    return void o();
                  typeof I.config == "object" && (l.instanceConfig = k.extend(l.instanceConfig, I.config));
                } else if (I === "skip")
                  return void o();
              }
              var h = l.instanceConfig.complete;
              l.instanceConfig.complete = function(ee) {
                b(h) && h(ee, l.file, l.inputElem), o();
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
          var r = J(e);
          r.chunkSize = parseInt(r.chunkSize), e.step || e.chunk || (r.chunkSize = null), this._handle = new D(r), (this._handle.streamer = this)._config = r;
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
            var m = d.meta.cursor;
            this._finished || (this._partialLine = o.substring(m - this._baseIndex), this._baseIndex = m), d && d.data && (this._rowCount += d.data.length);
            var q = this._finished || this._config.preview && this._rowCount >= this._config.preview;
            if (j)
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
          b(this._config.error) ? this._config.error(e) : j && this._config.error && i.postMessage({ workerId: n.WORKER_ID, error: e, finished: !1 });
        };
      }
      function W(t) {
        var e;
        (t = t || {}).chunkSize || (t.chunkSize = n.RemoteChunkSize), y.call(this, t), this._nextChunk = C ? function() {
          this._readChunk(), this._chunkLoaded();
        } : function() {
          this._readChunk();
        }, this.stream = function(r) {
          this._input = r, this._nextChunk();
        }, this._readChunk = function() {
          if (this._finished)
            this._chunkLoaded();
          else {
            if (e = new XMLHttpRequest(), this._config.withCredentials && (e.withCredentials = this._config.withCredentials), C || (e.onload = Z(this._chunkLoaded, this), e.onerror = Z(this._chunkError, this)), e.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !C), this._config.downloadRequestHeaders) {
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
            C && e.status === 0 && this._chunkError();
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
      function O(t) {
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
          var m = e.readAsText(o, this._config.encoding);
          s || this._chunkLoaded({ target: { result: m } });
        }, this._chunkLoaded = function(o) {
          this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(o.target.result);
        }, this._chunkError = function() {
          this._sendError(e.error);
        };
      }
      function A(t) {
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
      function re(t) {
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
      function D(t) {
        var e, r, s, o = Math.pow(2, 53), d = -o, m = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, q = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/, T = this, l = 0, I = 0, h = !1, ee = !1, B = [], a = { data: [], errors: [], meta: {} };
        if (b(t.step)) {
          var E = t.step;
          t.step = function(c) {
            if (a = c, N())
              H();
            else {
              if (H(), a.data.length === 0)
                return;
              l += c.data.length, t.preview && l > t.preview ? r.abort() : (a.data = a.data[0], E(a, T));
            }
          };
        }
        function M(c) {
          return t.skipEmptyLines === "greedy" ? c.join("").trim() === "" : c.length === 1 && c[0].length === 0;
        }
        function H() {
          if (a && s && (P("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + n.DefaultDelimiter + "'"), s = !1), t.skipEmptyLines)
            for (var c = 0; c < a.data.length; c++)
              M(a.data[c]) && a.data.splice(c--, 1);
          return N() && function() {
            if (!a)
              return;
            function w(S, _) {
              b(t.transformHeader) && (S = t.transformHeader(S, _)), B.push(S);
            }
            if (Array.isArray(a.data[0])) {
              for (var v = 0; N() && v < a.data.length; v++)
                a.data[v].forEach(w);
              a.data.splice(0, 1);
            } else
              a.data.forEach(w);
          }(), function() {
            if (!a || !t.header && !t.dynamicTyping && !t.transform)
              return a;
            function w(S, _) {
              var p, U = t.header ? {} : [];
              for (p = 0; p < S.length; p++) {
                var f = p, Q = S[p];
                t.header && (f = p >= B.length ? "__parsed_extra" : B[p]), t.transform && (Q = t.transform(Q, f)), Q = F(f, Q), f === "__parsed_extra" ? (U[f] = U[f] || [], U[f].push(Q)) : U[f] = Q;
              }
              return t.header && (p > B.length ? P("FieldMismatch", "TooManyFields", "Too many fields: expected " + B.length + " fields but parsed " + p, I + _) : p < B.length && P("FieldMismatch", "TooFewFields", "Too few fields: expected " + B.length + " fields but parsed " + p, I + _)), U;
            }
            var v = 1;
            return !a.data.length || Array.isArray(a.data[0]) ? (a.data = a.data.map(w), v = a.data.length) : a.data = w(a.data, 0), t.header && a.meta && (a.meta.fields = B), I += v, a;
          }();
        }
        function N() {
          return t.header && B.length === 0;
        }
        function F(c, w) {
          return v = c, t.dynamicTypingFunction && t.dynamicTyping[v] === void 0 && (t.dynamicTyping[v] = t.dynamicTypingFunction(v)), (t.dynamicTyping[v] || t.dynamicTyping) === !0 ? w === "true" || w === "TRUE" || w !== "false" && w !== "FALSE" && (function(S) {
            if (m.test(S)) {
              var _ = parseFloat(S);
              if (d < _ && _ < o)
                return !0;
            }
            return !1;
          }(w) ? parseFloat(w) : q.test(w) ? new Date(w) : w === "" ? null : w) : w;
          var v;
        }
        function P(c, w, v, S) {
          var _ = { type: c, code: w, message: v };
          S !== void 0 && (_.row = S), a.errors.push(_);
        }
        this.parse = function(c, w, v) {
          var S = t.quoteChar || '"';
          if (t.newline || (t.newline = function(U, f) {
            U = U.substring(0, 1048576);
            var Q = new RegExp(g(f) + "([^]*?)" + g(f), "gm"), V = (U = U.replace(Q, "")).split("\r"), G = U.split(`
`), se = 1 < G.length && G[0].length < V[0].length;
            if (V.length === 1 || se)
              return `
`;
            for (var te = 0, Y = 0; Y < V.length; Y++)
              V[Y][0] === `
` && te++;
            return te >= V.length / 2 ? `\r
` : "\r";
          }(c, S)), s = !1, t.delimiter)
            b(t.delimiter) && (t.delimiter = t.delimiter(c), a.meta.delimiter = t.delimiter);
          else {
            var _ = function(U, f, Q, V, G) {
              var se, te, Y, K;
              G = G || [",", "	", "|", ";", n.RECORD_SEP, n.UNIT_SEP];
              for (var ae = 0; ae < G.length; ae++) {
                var $ = G[ae], oe = 0, ie = 0, _e = 0;
                Y = void 0;
                for (var le = new X({ comments: V, delimiter: $, newline: f, preview: 10 }).parse(U), ce = 0; ce < le.data.length; ce++)
                  if (Q && M(le.data[ce]))
                    _e++;
                  else {
                    var ue = le.data[ce].length;
                    ie += ue, Y !== void 0 ? 0 < ue && (oe += Math.abs(ue - Y), Y = ue) : Y = ue;
                  }
                0 < le.data.length && (ie /= le.data.length - _e), (te === void 0 || oe <= te) && (K === void 0 || K < ie) && 1.99 < ie && (te = oe, se = $, K = ie);
              }
              return { successful: !!(t.delimiter = se), bestDelimiter: se };
            }(c, t.newline, t.skipEmptyLines, t.comments, t.delimitersToGuess);
            _.successful ? t.delimiter = _.bestDelimiter : (s = !0, t.delimiter = n.DefaultDelimiter), a.meta.delimiter = t.delimiter;
          }
          var p = J(t);
          return t.preview && t.header && p.preview++, e = c, r = new X(p), a = r.parse(e, w, v), H(), h ? { meta: { paused: !0 } } : a || { meta: { paused: !1 } };
        }, this.paused = function() {
          return h;
        }, this.pause = function() {
          h = !0, r.abort(), e = b(t.chunk) ? "" : e.substring(r.getCharIndex());
        }, this.resume = function() {
          T.streamer._halted ? (h = !1, T.streamer.parseChunk(e, !0)) : setTimeout(T.resume, 3);
        }, this.aborted = function() {
          return ee;
        }, this.abort = function() {
          ee = !0, r.abort(), a.meta.aborted = !0, b(t.complete) && t.complete(a), e = "";
        };
      }
      function g(t) {
        return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function X(t) {
        var e, r = (t = t || {}).delimiter, s = t.newline, o = t.comments, d = t.step, m = t.preview, q = t.fastMode, T = e = t.quoteChar === void 0 ? '"' : t.quoteChar;
        if (t.escapeChar !== void 0 && (T = t.escapeChar), (typeof r != "string" || -1 < n.BAD_DELIMITERS.indexOf(r)) && (r = ","), o === r)
          throw new Error("Comment character same as delimiter");
        o === !0 ? o = "#" : (typeof o != "string" || -1 < n.BAD_DELIMITERS.indexOf(o)) && (o = !1), s !== `
` && s !== "\r" && s !== `\r
` && (s = `
`);
        var l = 0, I = !1;
        this.parse = function(h, ee, B) {
          if (typeof h != "string")
            throw new Error("Input must be a string");
          var a = h.length, E = r.length, M = s.length, H = o.length, N = b(d), F = [], P = [], c = [], w = l = 0;
          if (!h)
            return K();
          if (q || q !== !1 && h.indexOf(e) === -1) {
            for (var v = h.split(s), S = 0; S < v.length; S++) {
              if (c = v[S], l += c.length, S !== v.length - 1)
                l += s.length;
              else if (B)
                return K();
              if (!o || c.substring(0, H) !== o) {
                if (N) {
                  if (F = [], G(c.split(r)), ae(), I)
                    return K();
                } else
                  G(c.split(r));
                if (m && m <= S)
                  return F = F.slice(0, m), K(!0);
              }
            }
            return K();
          }
          for (var _ = h.indexOf(r, l), p = h.indexOf(s, l), U = new RegExp(g(T) + g(e), "g"), f = h.indexOf(e, l); ; )
            if (h[l] !== e)
              if (o && c.length === 0 && h.substring(l, l + H) === o) {
                if (p === -1)
                  return K();
                l = p + M, p = h.indexOf(s, l), _ = h.indexOf(r, l);
              } else if (_ !== -1 && (_ < p || p === -1))
                c.push(h.substring(l, _)), l = _ + E, _ = h.indexOf(r, l);
              else {
                if (p === -1)
                  break;
                if (c.push(h.substring(l, p)), Y(p + M), N && (ae(), I))
                  return K();
                if (m && F.length >= m)
                  return K(!0);
              }
            else
              for (f = l, l++; ; ) {
                if ((f = h.indexOf(e, f + 1)) === -1)
                  return B || P.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: F.length, index: l }), te();
                if (f === a - 1)
                  return te(h.substring(l, f).replace(U, e));
                if (e !== T || h[f + 1] !== T) {
                  if (e === T || f === 0 || h[f - 1] !== T) {
                    _ !== -1 && _ < f + 1 && (_ = h.indexOf(r, f + 1)), p !== -1 && p < f + 1 && (p = h.indexOf(s, f + 1));
                    var Q = se(p === -1 ? _ : Math.min(_, p));
                    if (h[f + 1 + Q] === r) {
                      c.push(h.substring(l, f).replace(U, e)), h[l = f + 1 + Q + E] !== e && (f = h.indexOf(e, l)), _ = h.indexOf(r, l), p = h.indexOf(s, l);
                      break;
                    }
                    var V = se(p);
                    if (h.substring(f + 1 + V, f + 1 + V + M) === s) {
                      if (c.push(h.substring(l, f).replace(U, e)), Y(f + 1 + V + M), _ = h.indexOf(r, l), f = h.indexOf(e, l), N && (ae(), I))
                        return K();
                      if (m && F.length >= m)
                        return K(!0);
                      break;
                    }
                    P.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: F.length, index: l }), f++;
                  }
                } else
                  f++;
              }
          return te();
          function G($) {
            F.push($), w = l;
          }
          function se($) {
            var oe = 0;
            if ($ !== -1) {
              var ie = h.substring(f + 1, $);
              ie && ie.trim() === "" && (oe = ie.length);
            }
            return oe;
          }
          function te($) {
            return B || ($ === void 0 && ($ = h.substring(l)), c.push($), l = a, G(c), N && ae()), K();
          }
          function Y($) {
            l = $, G(c), c = [], p = h.indexOf(s, l);
          }
          function K($) {
            return { data: F, errors: P, meta: { delimiter: r, linebreak: s, aborted: I, truncated: !!$, cursor: w + (ee || 0) } };
          }
          function ae() {
            d(K()), F = [], P = [];
          }
        }, this.abort = function() {
          I = !0;
        }, this.getCharIndex = function() {
          return l;
        };
      }
      function L(t) {
        var e = t.data, r = z[e.workerId], s = !1;
        if (e.error)
          r.userError(e.error, e.file);
        else if (e.results && e.results.data) {
          var o = { abort: function() {
            s = !0, ne(e.workerId, { data: [], errors: [], meta: { aborted: !0 } });
          }, pause: R, resume: R };
          if (b(r.userStep)) {
            for (var d = 0; d < e.results.data.length && (r.userStep({ data: e.results.data[d], errors: e.results.errors, meta: e.results.meta }, o), !s); d++)
              ;
            delete e.results;
          } else
            b(r.userChunk) && (r.userChunk(e.results, o, e.file), delete e.results);
        }
        e.finished && !s && ne(e.workerId, e.results);
      }
      function ne(t, e) {
        var r = z[t];
        b(r.userComplete) && r.userComplete(e), r.terminate(), delete z[t];
      }
      function R() {
        throw new Error("Not implemented.");
      }
      function J(t) {
        if (typeof t != "object" || t === null)
          return t;
        var e = Array.isArray(t) ? [] : {};
        for (var r in t)
          e[r] = J(t[r]);
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
      return j && (i.onmessage = function(t) {
        var e = t.data;
        if (n.WORKER_ID === void 0 && e && (n.WORKER_ID = e.workerId), typeof e.input == "string")
          i.postMessage({ workerId: n.WORKER_ID, results: n.parse(e.input, e.config), finished: !0 });
        else if (i.File && e.input instanceof File || e.input instanceof Object) {
          var r = n.parse(e.input, e.config);
          r && i.postMessage({ workerId: n.WORKER_ID, results: r, finished: !0 });
        }
      }), (W.prototype = Object.create(y.prototype)).constructor = W, (O.prototype = Object.create(y.prototype)).constructor = O, (A.prototype = Object.create(A.prototype)).constructor = A, (re.prototype = Object.create(y.prototype)).constructor = re, n;
    });
  });

  // src/bench/websocket.ts
  async function ve(u, i, C) {
    let j = new WebSocket(u);
    if (!j)
      throw new Error("server didn't accept ws");
    return j.addEventListener("open", () => {
      console.log("Opened websocket"), C();
    }), j.addEventListener("message", ({ data: z }) => {
      let { count: x, tz: n, error: k, name: y, duration: W, endTime: O } = JSON.parse(z);
      if (y && W && O) {
        let A = O - W, re = { name: y, duration: W, startTime: A, entryType: "server", endTime: O };
        console.info(re), i.push(re);
      } else
        k ? console.error(k) : console.info({ count: x, tz: n, error: k });
    }), j.addEventListener("close", () => {
      console.log("Closed websocket");
    }), j;
  }

  // src/bench/observers.ts
  function ke(u) {
    let i = new PerformanceObserver((z) => {
      z.getEntries().forEach((x) => {
        let { startTime: n, duration: k, name: y, entryType: W } = x;
        n = Math.floor(n), k = Math.floor(k);
        let O = n + k, A = { name: y, endTime: O, startTime: n, duration: k, entryType: W };
        console.log(A), u.push(A);
      });
    }), C = new PerformanceObserver((z) => {
      z.getEntriesByType("resource").forEach((x) => {
        let { startTime: n, duration: k, name: y, entryType: W, responseStart: O, responseEnd: A } = x;
        y.includes("mitm") || y.includes("favicon") || (n = Math.floor(n), k = Math.floor(k), A = Math.floor(A), O = Math.floor(O), /^https?:\/\//.test(y) && (y = String(y.split("/").pop())), u = u.concat([
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
            duration: O - n,
            endTime: O,
            entryType: "resource"
          },
          {
            name: "download:response_complete",
            startTime: O - n,
            duration: A - O,
            endTime: A,
            entryType: "resource"
          }
        ]), console.log(x.toJSON()));
      });
    });
    return { ro: C, po: i, listEntries: () => {
      let z = u.sort((x, n) => x.endTime - n.endTime).reduce((x, n) => {
        let { name: k, endTime: y, startTime: W, duration: O, entryType: A } = n;
        return x[k] = { endTime: y, startTime: W, duration: O, entryType: A }, x;
      }, {});
      window.requestIdleCallback(() => {
        console.table(z), i && i.disconnect(), C && C.disconnect();
      });
    } };
  }

  // src/bench/download.ts
  var pe = we(Ee());
  function me(u, i = "file.txt", C) {
    let j = !1;
    console.log({ url: u }), performance.mark("download:start");
    let z = !1;
    pe.default.mitm = `${location.origin}/mitm.html`;
    let x = pe.default.createWriteStream(i);
    return window.onunload = () => {
      x.abort();
    }, window.onbeforeunload = (n) => {
      z || (n.returnValue = "Are you sure you want to leave?");
    }, fetch(u, {
      headers: {
        TE: "trailers",
        startTime: String(performance.now()),
        started_at: String(Math.floor(Date.now() - performance.now())),
        "cache-control": "no-cache, no-store, max-age=1, s-maxage=1"
      }
    }).then((n) => !n.body || !n.ok ? Promise.reject(new Error(n.statusText)) : n.body.pipeTo(x)).then(() => {
      z = !0, performance.mark("download:tear_down"), requestIdleCallback(() => {
        C();
      });
    });
  }

  // src/bench/papaXHR.ts
  var je = we(Se());

  // src/xhr.ts
  var Re = [], { po: Ae, ro: De, listEntries: Ue } = ke(Re);
  globalThis.connect = (u) => {
    let i = new URL(window.location.origin);
    i.protocol = "wss", i.pathname = "/csv/ws", globalThis.ws = ve(i, Re, u);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL3N0cmVhbXNhdmVyL1N0cmVhbVNhdmVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wYXBhcGFyc2UvcGFwYXBhcnNlLm1pbi5qcyIsICIuLi9zcmMvYmVuY2gvd2Vic29ja2V0LnRzIiwgIi4uL3NyYy9iZW5jaC9vYnNlcnZlcnMudHMiLCAiLi4vc3JjL2JlbmNoL2Rvd25sb2FkLnRzIiwgIi4uL3NyYy9iZW5jaC9wYXBhWEhSLnRzIiwgIi4uL3NyYy94aHIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qIGdsb2JhbCBjaHJvbWUgbG9jYXRpb24gUmVhZGFibGVTdHJlYW0gZGVmaW5lIE1lc3NhZ2VDaGFubmVsIFRyYW5zZm9ybVN0cmVhbSAqL1xuXG47KChuYW1lLCBkZWZpbml0aW9uKSA9PiB7XG4gIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnXG4gICAgPyBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKVxuICAgIDogdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCdcbiAgICAgID8gZGVmaW5lKGRlZmluaXRpb24pXG4gICAgICA6IHRoaXNbbmFtZV0gPSBkZWZpbml0aW9uKClcbn0pKCdzdHJlYW1TYXZlcicsICgpID0+IHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgY29uc3QgZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgPyB3aW5kb3cgOiB0aGlzXG4gIGlmICghZ2xvYmFsLkhUTUxFbGVtZW50KSBjb25zb2xlLndhcm4oJ3N0cmVhbXNhdmVyIGlzIG1lYW50IHRvIHJ1biBvbiBicm93c2VycyBtYWluIHRocmVhZCcpXG5cbiAgbGV0IG1pdG1UcmFuc3BvcnRlciA9IG51bGxcbiAgbGV0IHN1cHBvcnRzVHJhbnNmZXJhYmxlID0gZmFsc2VcbiAgY29uc3QgdGVzdCA9IGZuID0+IHsgdHJ5IHsgZm4oKSB9IGNhdGNoIChlKSB7fSB9XG4gIGNvbnN0IHBvbnlmaWxsID0gZ2xvYmFsLldlYlN0cmVhbXNQb2x5ZmlsbCB8fCB7fVxuICBjb25zdCBpc1NlY3VyZUNvbnRleHQgPSBnbG9iYWwuaXNTZWN1cmVDb250ZXh0XG4gIC8vIFRPRE86IE11c3QgY29tZSB1cCB3aXRoIGEgcmVhbCBkZXRlY3Rpb24gdGVzdCAoIzY5KVxuICBsZXQgdXNlQmxvYkZhbGxiYWNrID0gL2NvbnN0cnVjdG9yL2kudGVzdChnbG9iYWwuSFRNTEVsZW1lbnQpIHx8ICEhZ2xvYmFsLnNhZmFyaSB8fCAhIWdsb2JhbC5XZWJLaXRQb2ludFxuICBjb25zdCBkb3dubG9hZFN0cmF0ZWd5ID0gaXNTZWN1cmVDb250ZXh0IHx8ICdNb3pBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGVcbiAgICA/ICdpZnJhbWUnXG4gICAgOiAnbmF2aWdhdGUnXG5cbiAgY29uc3Qgc3RyZWFtU2F2ZXIgPSB7XG4gICAgY3JlYXRlV3JpdGVTdHJlYW0sXG4gICAgV3JpdGFibGVTdHJlYW06IGdsb2JhbC5Xcml0YWJsZVN0cmVhbSB8fCBwb255ZmlsbC5Xcml0YWJsZVN0cmVhbSxcbiAgICBzdXBwb3J0ZWQ6IHRydWUsXG4gICAgdmVyc2lvbjogeyBmdWxsOiAnMi4wLjUnLCBtYWpvcjogMiwgbWlub3I6IDAsIGRvdDogNSB9LFxuICAgIG1pdG06ICdodHRwczovL2ppbW15d2FydGluZy5naXRodWIuaW8vU3RyZWFtU2F2ZXIuanMvbWl0bS5odG1sP3ZlcnNpb249Mi4wLjAnXG4gIH1cblxuICAvKipcbiAgICogY3JlYXRlIGEgaGlkZGVuIGlmcmFtZSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBET00gKGJvZHkpXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gc3JjIHBhZ2UgdG8gbG9hZFxuICAgKiBAcmV0dXJuIHtIVE1MSUZyYW1lRWxlbWVudH0gcGFnZSB0byBsb2FkXG4gICAqL1xuICBmdW5jdGlvbiBtYWtlSWZyYW1lIChzcmMpIHtcbiAgICBpZiAoIXNyYykgdGhyb3cgbmV3IEVycm9yKCdtZWgnKVxuICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpXG4gICAgaWZyYW1lLmhpZGRlbiA9IHRydWVcbiAgICBpZnJhbWUuc3JjID0gc3JjXG4gICAgaWZyYW1lLmxvYWRlZCA9IGZhbHNlXG4gICAgaWZyYW1lLm5hbWUgPSAnaWZyYW1lJ1xuICAgIGlmcmFtZS5pc0lmcmFtZSA9IHRydWVcbiAgICBpZnJhbWUucG9zdE1lc3NhZ2UgPSAoLi4uYXJncykgPT4gaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoLi4uYXJncylcbiAgICBpZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgIGlmcmFtZS5sb2FkZWQgPSB0cnVlXG4gICAgfSwgeyBvbmNlOiB0cnVlIH0pXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpXG4gICAgcmV0dXJuIGlmcmFtZVxuICB9XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHBvcHVwIHRoYXQgc2ltdWxhdGVzIHRoZSBiYXNpYyB0aGluZ3NcbiAgICogb2Ygd2hhdCBhIGlmcmFtZSBjYW4gZG9cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSBzcmMgcGFnZSB0byBsb2FkXG4gICAqIEByZXR1cm4ge29iamVjdH0gICAgIGlmcmFtZSBsaWtlIG9iamVjdFxuICAgKi9cbiAgZnVuY3Rpb24gbWFrZVBvcHVwIChzcmMpIHtcbiAgICBjb25zdCBvcHRpb25zID0gJ3dpZHRoPTIwMCxoZWlnaHQ9MTAwJ1xuICAgIGNvbnN0IGRlbGVnYXRlID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgY29uc3QgcG9wdXAgPSB7XG4gICAgICBmcmFtZTogZ2xvYmFsLm9wZW4oc3JjLCAncG9wdXAnLCBvcHRpb25zKSxcbiAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICBpc0lmcmFtZTogZmFsc2UsXG4gICAgICBpc1BvcHVwOiB0cnVlLFxuICAgICAgcmVtb3ZlICgpIHsgcG9wdXAuZnJhbWUuY2xvc2UoKSB9LFxuICAgICAgYWRkRXZlbnRMaXN0ZW5lciAoLi4uYXJncykgeyBkZWxlZ2F0ZS5hZGRFdmVudExpc3RlbmVyKC4uLmFyZ3MpIH0sXG4gICAgICBkaXNwYXRjaEV2ZW50ICguLi5hcmdzKSB7IGRlbGVnYXRlLmRpc3BhdGNoRXZlbnQoLi4uYXJncykgfSxcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIgKC4uLmFyZ3MpIHsgZGVsZWdhdGUucmVtb3ZlRXZlbnRMaXN0ZW5lciguLi5hcmdzKSB9LFxuICAgICAgcG9zdE1lc3NhZ2UgKC4uLmFyZ3MpIHsgcG9wdXAuZnJhbWUucG9zdE1lc3NhZ2UoLi4uYXJncykgfVxuICAgIH1cblxuICAgIGNvbnN0IG9uUmVhZHkgPSBldnQgPT4ge1xuICAgICAgaWYgKGV2dC5zb3VyY2UgPT09IHBvcHVwLmZyYW1lKSB7XG4gICAgICAgIHBvcHVwLmxvYWRlZCA9IHRydWVcbiAgICAgICAgZ2xvYmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvblJlYWR5KVxuICAgICAgICBwb3B1cC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9hZCcpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25SZWFkeSlcblxuICAgIHJldHVybiBwb3B1cFxuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBXZSBjYW4ndCBsb29rIGZvciBzZXJ2aWNlIHdvcmtlciBzaW5jZSBpdCBtYXkgc3RpbGwgd29yayBvbiBodHRwXG4gICAgbmV3IFJlc3BvbnNlKG5ldyBSZWFkYWJsZVN0cmVhbSgpKVxuICAgIGlmIChpc1NlY3VyZUNvbnRleHQgJiYgISgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSkge1xuICAgICAgdXNlQmxvYkZhbGxiYWNrID0gdHJ1ZVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdXNlQmxvYkZhbGxiYWNrID0gdHJ1ZVxuICB9XG5cbiAgdGVzdCgoKSA9PiB7XG4gICAgLy8gVHJhbnNmYXJpYWJsZSBzdHJlYW0gd2FzIGZpcnN0IGVuYWJsZWQgaW4gY2hyb21lIHY3MyBiZWhpbmQgYSBmbGFnXG4gICAgY29uc3QgeyByZWFkYWJsZSB9ID0gbmV3IFRyYW5zZm9ybVN0cmVhbSgpXG4gICAgY29uc3QgbWMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKVxuICAgIG1jLnBvcnQxLnBvc3RNZXNzYWdlKHJlYWRhYmxlLCBbcmVhZGFibGVdKVxuICAgIG1jLnBvcnQxLmNsb3NlKClcbiAgICBtYy5wb3J0Mi5jbG9zZSgpXG4gICAgc3VwcG9ydHNUcmFuc2ZlcmFibGUgPSB0cnVlXG4gICAgLy8gRnJlZXplIFRyYW5zZm9ybVN0cmVhbSBvYmplY3QgKGNhbiBvbmx5IHdvcmsgd2l0aCBuYXRpdmUpXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN0cmVhbVNhdmVyLCAnVHJhbnNmb3JtU3RyZWFtJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBUcmFuc2Zvcm1TdHJlYW1cbiAgICB9KVxuICB9KVxuXG4gIGZ1bmN0aW9uIGxvYWRUcmFuc3BvcnRlciAoKSB7XG4gICAgaWYgKCFtaXRtVHJhbnNwb3J0ZXIpIHtcbiAgICAgIG1pdG1UcmFuc3BvcnRlciA9IGlzU2VjdXJlQ29udGV4dFxuICAgICAgICA/IG1ha2VJZnJhbWUoc3RyZWFtU2F2ZXIubWl0bSlcbiAgICAgICAgOiBtYWtlUG9wdXAoc3RyZWFtU2F2ZXIubWl0bSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtICB7c3RyaW5nfSBmaWxlbmFtZSBmaWxlbmFtZSB0aGF0IHNob3VsZCBiZSB1c2VkXG4gICAqIEBwYXJhbSAge29iamVjdH0gb3B0aW9ucyAgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9IHNpemUgICAgIGRlcHJpY2F0ZWRcbiAgICogQHJldHVybiB7V3JpdGFibGVTdHJlYW08VWludDhBcnJheT59XG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVXcml0ZVN0cmVhbSAoZmlsZW5hbWUsIG9wdGlvbnMsIHNpemUpIHtcbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgIHNpemU6IG51bGwsXG4gICAgICBwYXRobmFtZTogbnVsbCxcbiAgICAgIHdyaXRhYmxlU3RyYXRlZ3k6IHVuZGVmaW5lZCxcbiAgICAgIHJlYWRhYmxlU3RyYXRlZ3k6IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGxldCBieXRlc1dyaXR0ZW4gPSAwIC8vIGJ5IFN0cmVhbVNhdmVyLmpzIChub3QgdGhlIHNlcnZpY2Ugd29ya2VyKVxuICAgIGxldCBkb3dubG9hZFVybCA9IG51bGxcbiAgICBsZXQgY2hhbm5lbCA9IG51bGxcbiAgICBsZXQgdHMgPSBudWxsXG5cbiAgICAvLyBub3JtYWxpemUgYXJndW1lbnRzXG4gICAgaWYgKE51bWJlci5pc0Zpbml0ZShvcHRpb25zKSkge1xuICAgICAgWyBzaXplLCBvcHRpb25zIF0gPSBbIG9wdGlvbnMsIHNpemUgXVxuICAgICAgY29uc29sZS53YXJuKCdbU3RyZWFtU2F2ZXJdIERlcHJpY2F0ZWQgcGFzcyBhbiBvYmplY3QgYXMgMm5kIGFyZ3VtZW50IHdoZW4gY3JlYXRpbmcgYSB3cml0ZSBzdHJlYW0nKVxuICAgICAgb3B0cy5zaXplID0gc2l6ZVxuICAgICAgb3B0cy53cml0YWJsZVN0cmF0ZWd5ID0gb3B0aW9uc1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmhpZ2hXYXRlck1hcmspIHtcbiAgICAgIGNvbnNvbGUud2FybignW1N0cmVhbVNhdmVyXSBEZXByaWNhdGVkIHBhc3MgYW4gb2JqZWN0IGFzIDJuZCBhcmd1bWVudCB3aGVuIGNyZWF0aW5nIGEgd3JpdGUgc3RyZWFtJylcbiAgICAgIG9wdHMuc2l6ZSA9IHNpemVcbiAgICAgIG9wdHMud3JpdGFibGVTdHJhdGVneSA9IG9wdGlvbnNcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0cyA9IG9wdGlvbnMgfHwge31cbiAgICB9XG4gICAgaWYgKCF1c2VCbG9iRmFsbGJhY2spIHtcbiAgICAgIGxvYWRUcmFuc3BvcnRlcigpXG5cbiAgICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKVxuXG4gICAgICAvLyBNYWtlIGZpbGVuYW1lIFJGQzU5ODcgY29tcGF0aWJsZVxuICAgICAgZmlsZW5hbWUgPSBlbmNvZGVVUklDb21wb25lbnQoZmlsZW5hbWUucmVwbGFjZSgvXFwvL2csICc6JykpXG4gICAgICAgIC5yZXBsYWNlKC9bJygpXS9nLCBlc2NhcGUpXG4gICAgICAgIC5yZXBsYWNlKC9cXCovZywgJyUyQScpXG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICB0cmFuc2ZlcnJpbmdSZWFkYWJsZTogc3VwcG9ydHNUcmFuc2ZlcmFibGUsXG4gICAgICAgIHBhdGhuYW1lOiBvcHRzLnBhdGhuYW1lIHx8IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zbGljZSgtNikgKyAnLycgKyBmaWxlbmFtZSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAnQ29udGVudC1EaXNwb3NpdGlvbic6IFwiYXR0YWNobWVudDsgZmlsZW5hbWUqPVVURi04JydcIiArIGZpbGVuYW1lXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMuc2l6ZSkge1xuICAgICAgICByZXNwb25zZS5oZWFkZXJzWydDb250ZW50LUxlbmd0aCddID0gb3B0cy5zaXplXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFyZ3MgPSBbIHJlc3BvbnNlLCAnKicsIFsgY2hhbm5lbC5wb3J0MiBdIF1cblxuICAgICAgaWYgKHN1cHBvcnRzVHJhbnNmZXJhYmxlKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVyID0gZG93bmxvYWRTdHJhdGVneSA9PT0gJ2lmcmFtZScgPyB1bmRlZmluZWQgOiB7XG4gICAgICAgICAgLy8gVGhpcyB0cmFuc2Zvcm1lciAmIGZsdXNoIG1ldGhvZCBpcyBvbmx5IHVzZWQgYnkgaW5zZWN1cmUgY29udGV4dC5cbiAgICAgICAgICB0cmFuc2Zvcm0gKGNodW5rLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICBpZiAoIShjaHVuayBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbiBvbmx5IHdpcnRlIFVpbnQ4QXJyYXlzJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ5dGVzV3JpdHRlbiArPSBjaHVuay5sZW5ndGhcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShjaHVuaylcblxuICAgICAgICAgICAgaWYgKGRvd25sb2FkVXJsKSB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBkb3dubG9hZFVybFxuICAgICAgICAgICAgICBkb3dubG9hZFVybCA9IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZsdXNoICgpIHtcbiAgICAgICAgICAgIGlmIChkb3dubG9hZFVybCkge1xuICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gZG93bmxvYWRVcmxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHMgPSBuZXcgc3RyZWFtU2F2ZXIuVHJhbnNmb3JtU3RyZWFtKFxuICAgICAgICAgIHRyYW5zZm9ybWVyLFxuICAgICAgICAgIG9wdHMud3JpdGFibGVTdHJhdGVneSxcbiAgICAgICAgICBvcHRzLnJlYWRhYmxlU3RyYXRlZ3lcbiAgICAgICAgKVxuICAgICAgICBjb25zdCByZWFkYWJsZVN0cmVhbSA9IHRzLnJlYWRhYmxlXG5cbiAgICAgICAgY2hhbm5lbC5wb3J0MS5wb3N0TWVzc2FnZSh7IHJlYWRhYmxlU3RyZWFtIH0sIFsgcmVhZGFibGVTdHJlYW0gXSlcbiAgICAgIH1cblxuICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBldnQgPT4ge1xuICAgICAgICAvLyBTZXJ2aWNlIHdvcmtlciBzZW50IHVzIGEgbGluayB0aGF0IHdlIHNob3VsZCBvcGVuLlxuICAgICAgICBpZiAoZXZ0LmRhdGEuZG93bmxvYWQpIHtcbiAgICAgICAgICAvLyBTcGVjaWFsIHRyZWF0bWVudCBmb3IgcG9wdXAuLi5cbiAgICAgICAgICBpZiAoZG93bmxvYWRTdHJhdGVneSA9PT0gJ25hdmlnYXRlJykge1xuICAgICAgICAgICAgbWl0bVRyYW5zcG9ydGVyLnJlbW92ZSgpXG4gICAgICAgICAgICBtaXRtVHJhbnNwb3J0ZXIgPSBudWxsXG4gICAgICAgICAgICBpZiAoYnl0ZXNXcml0dGVuKSB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBldnQuZGF0YS5kb3dubG9hZFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZG93bmxvYWRVcmwgPSBldnQuZGF0YS5kb3dubG9hZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobWl0bVRyYW5zcG9ydGVyLmlzUG9wdXApIHtcbiAgICAgICAgICAgICAgbWl0bVRyYW5zcG9ydGVyLnJlbW92ZSgpXG4gICAgICAgICAgICAgIG1pdG1UcmFuc3BvcnRlciA9IG51bGxcbiAgICAgICAgICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBmaXJlZm94LCB0aGV5IGNhbiBrZWVwIHN3IGFsaXZlIHdpdGggZmV0Y2hcbiAgICAgICAgICAgICAgaWYgKGRvd25sb2FkU3RyYXRlZ3kgPT09ICdpZnJhbWUnKSB7XG4gICAgICAgICAgICAgICAgbWFrZUlmcmFtZShzdHJlYW1TYXZlci5taXRtKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdlIG5ldmVyIHJlbW92ZSB0aGlzIGlmcmFtZXMgYi9jIGl0IGNhbiBpbnRlcnJ1cHQgc2F2aW5nXG4gICAgICAgICAgICBtYWtlSWZyYW1lKGV2dC5kYXRhLmRvd25sb2FkKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWl0bVRyYW5zcG9ydGVyLmxvYWRlZCkge1xuICAgICAgICBtaXRtVHJhbnNwb3J0ZXIucG9zdE1lc3NhZ2UoLi4uYXJncylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1pdG1UcmFuc3BvcnRlci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgIG1pdG1UcmFuc3BvcnRlci5wb3N0TWVzc2FnZSguLi5hcmdzKVxuICAgICAgICB9LCB7IG9uY2U6IHRydWUgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY2h1bmtzID0gW11cblxuICAgIHJldHVybiAoIXVzZUJsb2JGYWxsYmFjayAmJiB0cyAmJiB0cy53cml0YWJsZSkgfHwgbmV3IHN0cmVhbVNhdmVyLldyaXRhYmxlU3RyZWFtKHtcbiAgICAgIHdyaXRlIChjaHVuaykge1xuICAgICAgICBpZiAoIShjaHVuayBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FuIG9ubHkgd2lydGUgVWludDhBcnJheXMnKVxuICAgICAgICB9XG4gICAgICAgIGlmICh1c2VCbG9iRmFsbGJhY2spIHtcbiAgICAgICAgICAvLyBTYWZhcmkuLi4gVGhlIG5ldyBJRTZcbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vamltbXl3YXJ0aW5nL1N0cmVhbVNhdmVyLmpzL2lzc3Vlcy82OVxuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gZXZlbiBkb2UgaXQgaGFzIGV2ZXJ5dGhpbmcgaXQgZmFpbHMgdG8gZG93bmxvYWQgYW55dGhpbmdcbiAgICAgICAgICAvLyB0aGF0IGNvbWVzIGZyb20gdGhlIHNlcnZpY2Ugd29ya2VyLi4hXG4gICAgICAgICAgY2h1bmtzLnB1c2goY2h1bmspXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBpcyBjYWxsZWQgd2hlbiBhIG5ldyBjaHVuayBvZiBkYXRhIGlzIHJlYWR5IHRvIGJlIHdyaXR0ZW5cbiAgICAgICAgLy8gdG8gdGhlIHVuZGVybHlpbmcgc2luay4gSXQgY2FuIHJldHVybiBhIHByb21pc2UgdG8gc2lnbmFsXG4gICAgICAgIC8vIHN1Y2Nlc3Mgb3IgZmFpbHVyZSBvZiB0aGUgd3JpdGUgb3BlcmF0aW9uLiBUaGUgc3RyZWFtXG4gICAgICAgIC8vIGltcGxlbWVudGF0aW9uIGd1YXJhbnRlZXMgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZFxuICAgICAgICAvLyBvbmx5IGFmdGVyIHByZXZpb3VzIHdyaXRlcyBoYXZlIHN1Y2NlZWRlZCwgYW5kIG5ldmVyIGFmdGVyXG4gICAgICAgIC8vIGNsb3NlIG9yIGFib3J0IGlzIGNhbGxlZC5cblxuICAgICAgICAvLyBUT0RPOiBLaW5kIG9mIGltcG9ydGFudCB0aGF0IHNlcnZpY2Ugd29ya2VyIHJlc3BvbmQgYmFjayB3aGVuXG4gICAgICAgIC8vIGl0IGhhcyBiZWVuIHdyaXR0ZW4uIE90aGVyd2lzZSB3ZSBjYW4ndCBoYW5kbGUgYmFja3ByZXNzdXJlXG4gICAgICAgIC8vIEVESVQ6IFRyYW5zZmFyYWJsZSBzdHJlYW1zIHNvbHZzIHRoaXMuLi5cbiAgICAgICAgY2hhbm5lbC5wb3J0MS5wb3N0TWVzc2FnZShjaHVuaylcbiAgICAgICAgYnl0ZXNXcml0dGVuICs9IGNodW5rLmxlbmd0aFxuXG4gICAgICAgIGlmIChkb3dubG9hZFVybCkge1xuICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBkb3dubG9hZFVybFxuICAgICAgICAgIGRvd25sb2FkVXJsID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2xvc2UgKCkge1xuICAgICAgICBpZiAodXNlQmxvYkZhbGxiYWNrKSB7XG4gICAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKGNodW5rcywgeyB0eXBlOiAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtOyBjaGFyc2V0PXV0Zi04JyB9KVxuICAgICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICAgICAgICBsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gICAgICAgICAgbGluay5kb3dubG9hZCA9IGZpbGVuYW1lXG4gICAgICAgICAgbGluay5jbGljaygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hhbm5lbC5wb3J0MS5wb3N0TWVzc2FnZSgnZW5kJylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFib3J0ICgpIHtcbiAgICAgICAgY2h1bmtzID0gW11cbiAgICAgICAgY2hhbm5lbC5wb3J0MS5wb3N0TWVzc2FnZSgnYWJvcnQnKVxuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IG51bGxcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5jbG9zZSgpXG4gICAgICAgIGNoYW5uZWwucG9ydDIuY2xvc2UoKVxuICAgICAgICBjaGFubmVsID0gbnVsbFxuICAgICAgfVxuICAgIH0sIG9wdHMud3JpdGFibGVTdHJhdGVneSlcbiAgfVxuXG4gIHJldHVybiBzdHJlYW1TYXZlclxufSlcbiIsICIvKiBAbGljZW5zZVxuUGFwYSBQYXJzZVxudjUuMy4xXG5odHRwczovL2dpdGh1Yi5jb20vbWhvbHQvUGFwYVBhcnNlXG5MaWNlbnNlOiBNSVRcbiovXG4hZnVuY3Rpb24oZSx0KXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLHQpOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPXQoKTplLlBhcGE9dCgpfSh0aGlzLGZ1bmN0aW9uIHMoKXtcInVzZSBzdHJpY3RcIjt2YXIgZj1cInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OnZvaWQgMCE9PWY/Zjp7fTt2YXIgbj0hZi5kb2N1bWVudCYmISFmLnBvc3RNZXNzYWdlLG89biYmL2Jsb2I6L2kudGVzdCgoZi5sb2NhdGlvbnx8e30pLnByb3RvY29sKSxhPXt9LGg9MCxiPXtwYXJzZTpmdW5jdGlvbihlLHQpe3ZhciBpPSh0PXR8fHt9KS5keW5hbWljVHlwaW5nfHwhMTtNKGkpJiYodC5keW5hbWljVHlwaW5nRnVuY3Rpb249aSxpPXt9KTtpZih0LmR5bmFtaWNUeXBpbmc9aSx0LnRyYW5zZm9ybT0hIU0odC50cmFuc2Zvcm0pJiZ0LnRyYW5zZm9ybSx0LndvcmtlciYmYi5XT1JLRVJTX1NVUFBPUlRFRCl7dmFyIHI9ZnVuY3Rpb24oKXtpZighYi5XT1JLRVJTX1NVUFBPUlRFRClyZXR1cm4hMTt2YXIgZT0oaT1mLlVSTHx8Zi53ZWJraXRVUkx8fG51bGwscj1zLnRvU3RyaW5nKCksYi5CTE9CX1VSTHx8KGIuQkxPQl9VUkw9aS5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW1wiKFwiLHIsXCIpKCk7XCJdLHt0eXBlOlwidGV4dC9qYXZhc2NyaXB0XCJ9KSkpKSx0PW5ldyBmLldvcmtlcihlKTt2YXIgaSxyO3JldHVybiB0Lm9ubWVzc2FnZT1fLHQuaWQ9aCsrLGFbdC5pZF09dH0oKTtyZXR1cm4gci51c2VyU3RlcD10LnN0ZXAsci51c2VyQ2h1bms9dC5jaHVuayxyLnVzZXJDb21wbGV0ZT10LmNvbXBsZXRlLHIudXNlckVycm9yPXQuZXJyb3IsdC5zdGVwPU0odC5zdGVwKSx0LmNodW5rPU0odC5jaHVuayksdC5jb21wbGV0ZT1NKHQuY29tcGxldGUpLHQuZXJyb3I9TSh0LmVycm9yKSxkZWxldGUgdC53b3JrZXIsdm9pZCByLnBvc3RNZXNzYWdlKHtpbnB1dDplLGNvbmZpZzp0LHdvcmtlcklkOnIuaWR9KX12YXIgbj1udWxsO2IuTk9ERV9TVFJFQU1fSU5QVVQsXCJzdHJpbmdcIj09dHlwZW9mIGU/bj10LmRvd25sb2FkP25ldyBsKHQpOm5ldyBwKHQpOiEwPT09ZS5yZWFkYWJsZSYmTShlLnJlYWQpJiZNKGUub24pP249bmV3IGcodCk6KGYuRmlsZSYmZSBpbnN0YW5jZW9mIEZpbGV8fGUgaW5zdGFuY2VvZiBPYmplY3QpJiYobj1uZXcgYyh0KSk7cmV0dXJuIG4uc3RyZWFtKGUpfSx1bnBhcnNlOmZ1bmN0aW9uKGUsdCl7dmFyIG49ITEsXz0hMCxtPVwiLFwiLHk9XCJcXHJcXG5cIixzPSdcIicsYT1zK3MsaT0hMSxyPW51bGwsbz0hMTshZnVuY3Rpb24oKXtpZihcIm9iamVjdFwiIT10eXBlb2YgdClyZXR1cm47XCJzdHJpbmdcIiE9dHlwZW9mIHQuZGVsaW1pdGVyfHxiLkJBRF9ERUxJTUlURVJTLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4tMSE9PXQuZGVsaW1pdGVyLmluZGV4T2YoZSl9KS5sZW5ndGh8fChtPXQuZGVsaW1pdGVyKTsoXCJib29sZWFuXCI9PXR5cGVvZiB0LnF1b3Rlc3x8XCJmdW5jdGlvblwiPT10eXBlb2YgdC5xdW90ZXN8fEFycmF5LmlzQXJyYXkodC5xdW90ZXMpKSYmKG49dC5xdW90ZXMpO1wiYm9vbGVhblwiIT10eXBlb2YgdC5za2lwRW1wdHlMaW5lcyYmXCJzdHJpbmdcIiE9dHlwZW9mIHQuc2tpcEVtcHR5TGluZXN8fChpPXQuc2tpcEVtcHR5TGluZXMpO1wic3RyaW5nXCI9PXR5cGVvZiB0Lm5ld2xpbmUmJih5PXQubmV3bGluZSk7XCJzdHJpbmdcIj09dHlwZW9mIHQucXVvdGVDaGFyJiYocz10LnF1b3RlQ2hhcik7XCJib29sZWFuXCI9PXR5cGVvZiB0LmhlYWRlciYmKF89dC5oZWFkZXIpO2lmKEFycmF5LmlzQXJyYXkodC5jb2x1bW5zKSl7aWYoMD09PXQuY29sdW1ucy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiT3B0aW9uIGNvbHVtbnMgaXMgZW1wdHlcIik7cj10LmNvbHVtbnN9dm9pZCAwIT09dC5lc2NhcGVDaGFyJiYoYT10LmVzY2FwZUNoYXIrcyk7XCJib29sZWFuXCI9PXR5cGVvZiB0LmVzY2FwZUZvcm11bGFlJiYobz10LmVzY2FwZUZvcm11bGFlKX0oKTt2YXIgaD1uZXcgUmVnRXhwKGoocyksXCJnXCIpO1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1KU09OLnBhcnNlKGUpKTtpZihBcnJheS5pc0FycmF5KGUpKXtpZighZS5sZW5ndGh8fEFycmF5LmlzQXJyYXkoZVswXSkpcmV0dXJuIHUobnVsbCxlLGkpO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBlWzBdKXJldHVybiB1KHJ8fE9iamVjdC5rZXlzKGVbMF0pLGUsaSl9ZWxzZSBpZihcIm9iamVjdFwiPT10eXBlb2YgZSlyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgZS5kYXRhJiYoZS5kYXRhPUpTT04ucGFyc2UoZS5kYXRhKSksQXJyYXkuaXNBcnJheShlLmRhdGEpJiYoZS5maWVsZHN8fChlLmZpZWxkcz1lLm1ldGEmJmUubWV0YS5maWVsZHMpLGUuZmllbGRzfHwoZS5maWVsZHM9QXJyYXkuaXNBcnJheShlLmRhdGFbMF0pP2UuZmllbGRzOlwib2JqZWN0XCI9PXR5cGVvZiBlLmRhdGFbMF0/T2JqZWN0LmtleXMoZS5kYXRhWzBdKTpbXSksQXJyYXkuaXNBcnJheShlLmRhdGFbMF0pfHxcIm9iamVjdFwiPT10eXBlb2YgZS5kYXRhWzBdfHwoZS5kYXRhPVtlLmRhdGFdKSksdShlLmZpZWxkc3x8W10sZS5kYXRhfHxbXSxpKTt0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gc2VyaWFsaXplIHVucmVjb2duaXplZCBpbnB1dFwiKTtmdW5jdGlvbiB1KGUsdCxpKXt2YXIgcj1cIlwiO1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1KU09OLnBhcnNlKGUpKSxcInN0cmluZ1wiPT10eXBlb2YgdCYmKHQ9SlNPTi5wYXJzZSh0KSk7dmFyIG49QXJyYXkuaXNBcnJheShlKSYmMDxlLmxlbmd0aCxzPSFBcnJheS5pc0FycmF5KHRbMF0pO2lmKG4mJl8pe2Zvcih2YXIgYT0wO2E8ZS5sZW5ndGg7YSsrKTA8YSYmKHIrPW0pLHIrPXYoZVthXSxhKTswPHQubGVuZ3RoJiYocis9eSl9Zm9yKHZhciBvPTA7bzx0Lmxlbmd0aDtvKyspe3ZhciBoPW4/ZS5sZW5ndGg6dFtvXS5sZW5ndGgsdT0hMSxmPW4/MD09PU9iamVjdC5rZXlzKHRbb10pLmxlbmd0aDowPT09dFtvXS5sZW5ndGg7aWYoaSYmIW4mJih1PVwiZ3JlZWR5XCI9PT1pP1wiXCI9PT10W29dLmpvaW4oXCJcIikudHJpbSgpOjE9PT10W29dLmxlbmd0aCYmMD09PXRbb11bMF0ubGVuZ3RoKSxcImdyZWVkeVwiPT09aSYmbil7Zm9yKHZhciBkPVtdLGw9MDtsPGg7bCsrKXt2YXIgYz1zP2VbbF06bDtkLnB1c2godFtvXVtjXSl9dT1cIlwiPT09ZC5qb2luKFwiXCIpLnRyaW0oKX1pZighdSl7Zm9yKHZhciBwPTA7cDxoO3ArKyl7MDxwJiYhZiYmKHIrPW0pO3ZhciBnPW4mJnM/ZVtwXTpwO3IrPXYodFtvXVtnXSxwKX1vPHQubGVuZ3RoLTEmJighaXx8MDxoJiYhZikmJihyKz15KX19cmV0dXJuIHJ9ZnVuY3Rpb24gdihlLHQpe2lmKG51bGw9PWUpcmV0dXJuXCJcIjtpZihlLmNvbnN0cnVjdG9yPT09RGF0ZSlyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSkuc2xpY2UoMSwyNSk7ITA9PT1vJiZcInN0cmluZ1wiPT10eXBlb2YgZSYmbnVsbCE9PWUubWF0Y2goL15bPStcXC1AXS4qJC8pJiYoZT1cIidcIitlKTt2YXIgaT1lLnRvU3RyaW5nKCkucmVwbGFjZShoLGEpLHI9XCJib29sZWFuXCI9PXR5cGVvZiBuJiZufHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiZuKGUsdCl8fEFycmF5LmlzQXJyYXkobikmJm5bdF18fGZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspaWYoLTE8ZS5pbmRleE9mKHRbaV0pKXJldHVybiEwO3JldHVybiExfShpLGIuQkFEX0RFTElNSVRFUlMpfHwtMTxpLmluZGV4T2YobSl8fFwiIFwiPT09aS5jaGFyQXQoMCl8fFwiIFwiPT09aS5jaGFyQXQoaS5sZW5ndGgtMSk7cmV0dXJuIHI/cytpK3M6aX19fTtpZihiLlJFQ09SRF9TRVA9U3RyaW5nLmZyb21DaGFyQ29kZSgzMCksYi5VTklUX1NFUD1TdHJpbmcuZnJvbUNoYXJDb2RlKDMxKSxiLkJZVEVfT1JERVJfTUFSSz1cIlxcdWZlZmZcIixiLkJBRF9ERUxJTUlURVJTPVtcIlxcclwiLFwiXFxuXCIsJ1wiJyxiLkJZVEVfT1JERVJfTUFSS10sYi5XT1JLRVJTX1NVUFBPUlRFRD0hbiYmISFmLldvcmtlcixiLk5PREVfU1RSRUFNX0lOUFVUPTEsYi5Mb2NhbENodW5rU2l6ZT0xMDQ4NTc2MCxiLlJlbW90ZUNodW5rU2l6ZT01MjQyODgwLGIuRGVmYXVsdERlbGltaXRlcj1cIixcIixiLlBhcnNlcj1FLGIuUGFyc2VySGFuZGxlPWksYi5OZXR3b3JrU3RyZWFtZXI9bCxiLkZpbGVTdHJlYW1lcj1jLGIuU3RyaW5nU3RyZWFtZXI9cCxiLlJlYWRhYmxlU3RyZWFtU3RyZWFtZXI9ZyxmLmpRdWVyeSl7dmFyIGQ9Zi5qUXVlcnk7ZC5mbi5wYXJzZT1mdW5jdGlvbihvKXt2YXIgaT1vLmNvbmZpZ3x8e30saD1bXTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGUpe2lmKCEoXCJJTlBVVFwiPT09ZCh0aGlzKS5wcm9wKFwidGFnTmFtZVwiKS50b1VwcGVyQ2FzZSgpJiZcImZpbGVcIj09PWQodGhpcykuYXR0cihcInR5cGVcIikudG9Mb3dlckNhc2UoKSYmZi5GaWxlUmVhZGVyKXx8IXRoaXMuZmlsZXN8fDA9PT10aGlzLmZpbGVzLmxlbmd0aClyZXR1cm4hMDtmb3IodmFyIHQ9MDt0PHRoaXMuZmlsZXMubGVuZ3RoO3QrKyloLnB1c2goe2ZpbGU6dGhpcy5maWxlc1t0XSxpbnB1dEVsZW06dGhpcyxpbnN0YW5jZUNvbmZpZzpkLmV4dGVuZCh7fSxpKX0pfSksZSgpLHRoaXM7ZnVuY3Rpb24gZSgpe2lmKDAhPT1oLmxlbmd0aCl7dmFyIGUsdCxpLHIsbj1oWzBdO2lmKE0oby5iZWZvcmUpKXt2YXIgcz1vLmJlZm9yZShuLmZpbGUsbi5pbnB1dEVsZW0pO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBzKXtpZihcImFib3J0XCI9PT1zLmFjdGlvbilyZXR1cm4gZT1cIkFib3J0RXJyb3JcIix0PW4uZmlsZSxpPW4uaW5wdXRFbGVtLHI9cy5yZWFzb24sdm9pZChNKG8uZXJyb3IpJiZvLmVycm9yKHtuYW1lOmV9LHQsaSxyKSk7aWYoXCJza2lwXCI9PT1zLmFjdGlvbilyZXR1cm4gdm9pZCB1KCk7XCJvYmplY3RcIj09dHlwZW9mIHMuY29uZmlnJiYobi5pbnN0YW5jZUNvbmZpZz1kLmV4dGVuZChuLmluc3RhbmNlQ29uZmlnLHMuY29uZmlnKSl9ZWxzZSBpZihcInNraXBcIj09PXMpcmV0dXJuIHZvaWQgdSgpfXZhciBhPW4uaW5zdGFuY2VDb25maWcuY29tcGxldGU7bi5pbnN0YW5jZUNvbmZpZy5jb21wbGV0ZT1mdW5jdGlvbihlKXtNKGEpJiZhKGUsbi5maWxlLG4uaW5wdXRFbGVtKSx1KCl9LGIucGFyc2Uobi5maWxlLG4uaW5zdGFuY2VDb25maWcpfWVsc2UgTShvLmNvbXBsZXRlKSYmby5jb21wbGV0ZSgpfWZ1bmN0aW9uIHUoKXtoLnNwbGljZSgwLDEpLGUoKX19fWZ1bmN0aW9uIHUoZSl7dGhpcy5faGFuZGxlPW51bGwsdGhpcy5fZmluaXNoZWQ9ITEsdGhpcy5fY29tcGxldGVkPSExLHRoaXMuX2hhbHRlZD0hMSx0aGlzLl9pbnB1dD1udWxsLHRoaXMuX2Jhc2VJbmRleD0wLHRoaXMuX3BhcnRpYWxMaW5lPVwiXCIsdGhpcy5fcm93Q291bnQ9MCx0aGlzLl9zdGFydD0wLHRoaXMuX25leHRDaHVuaz1udWxsLHRoaXMuaXNGaXJzdENodW5rPSEwLHRoaXMuX2NvbXBsZXRlUmVzdWx0cz17ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7fX0sZnVuY3Rpb24oZSl7dmFyIHQ9dyhlKTt0LmNodW5rU2l6ZT1wYXJzZUludCh0LmNodW5rU2l6ZSksZS5zdGVwfHxlLmNodW5rfHwodC5jaHVua1NpemU9bnVsbCk7dGhpcy5faGFuZGxlPW5ldyBpKHQpLCh0aGlzLl9oYW5kbGUuc3RyZWFtZXI9dGhpcykuX2NvbmZpZz10fS5jYWxsKHRoaXMsZSksdGhpcy5wYXJzZUNodW5rPWZ1bmN0aW9uKGUsdCl7aWYodGhpcy5pc0ZpcnN0Q2h1bmsmJk0odGhpcy5fY29uZmlnLmJlZm9yZUZpcnN0Q2h1bmspKXt2YXIgaT10aGlzLl9jb25maWcuYmVmb3JlRmlyc3RDaHVuayhlKTt2b2lkIDAhPT1pJiYoZT1pKX10aGlzLmlzRmlyc3RDaHVuaz0hMSx0aGlzLl9oYWx0ZWQ9ITE7dmFyIHI9dGhpcy5fcGFydGlhbExpbmUrZTt0aGlzLl9wYXJ0aWFsTGluZT1cIlwiO3ZhciBuPXRoaXMuX2hhbmRsZS5wYXJzZShyLHRoaXMuX2Jhc2VJbmRleCwhdGhpcy5fZmluaXNoZWQpO2lmKCF0aGlzLl9oYW5kbGUucGF1c2VkKCkmJiF0aGlzLl9oYW5kbGUuYWJvcnRlZCgpKXt2YXIgcz1uLm1ldGEuY3Vyc29yO3RoaXMuX2ZpbmlzaGVkfHwodGhpcy5fcGFydGlhbExpbmU9ci5zdWJzdHJpbmcocy10aGlzLl9iYXNlSW5kZXgpLHRoaXMuX2Jhc2VJbmRleD1zKSxuJiZuLmRhdGEmJih0aGlzLl9yb3dDb3VudCs9bi5kYXRhLmxlbmd0aCk7dmFyIGE9dGhpcy5fZmluaXNoZWR8fHRoaXMuX2NvbmZpZy5wcmV2aWV3JiZ0aGlzLl9yb3dDb3VudD49dGhpcy5fY29uZmlnLnByZXZpZXc7aWYobylmLnBvc3RNZXNzYWdlKHtyZXN1bHRzOm4sd29ya2VySWQ6Yi5XT1JLRVJfSUQsZmluaXNoZWQ6YX0pO2Vsc2UgaWYoTSh0aGlzLl9jb25maWcuY2h1bmspJiYhdCl7aWYodGhpcy5fY29uZmlnLmNodW5rKG4sdGhpcy5faGFuZGxlKSx0aGlzLl9oYW5kbGUucGF1c2VkKCl8fHRoaXMuX2hhbmRsZS5hYm9ydGVkKCkpcmV0dXJuIHZvaWQodGhpcy5faGFsdGVkPSEwKTtuPXZvaWQgMCx0aGlzLl9jb21wbGV0ZVJlc3VsdHM9dm9pZCAwfXJldHVybiB0aGlzLl9jb25maWcuc3RlcHx8dGhpcy5fY29uZmlnLmNodW5rfHwodGhpcy5fY29tcGxldGVSZXN1bHRzLmRhdGE9dGhpcy5fY29tcGxldGVSZXN1bHRzLmRhdGEuY29uY2F0KG4uZGF0YSksdGhpcy5fY29tcGxldGVSZXN1bHRzLmVycm9ycz10aGlzLl9jb21wbGV0ZVJlc3VsdHMuZXJyb3JzLmNvbmNhdChuLmVycm9ycyksdGhpcy5fY29tcGxldGVSZXN1bHRzLm1ldGE9bi5tZXRhKSx0aGlzLl9jb21wbGV0ZWR8fCFhfHwhTSh0aGlzLl9jb25maWcuY29tcGxldGUpfHxuJiZuLm1ldGEuYWJvcnRlZHx8KHRoaXMuX2NvbmZpZy5jb21wbGV0ZSh0aGlzLl9jb21wbGV0ZVJlc3VsdHMsdGhpcy5faW5wdXQpLHRoaXMuX2NvbXBsZXRlZD0hMCksYXx8biYmbi5tZXRhLnBhdXNlZHx8dGhpcy5fbmV4dENodW5rKCksbn10aGlzLl9oYWx0ZWQ9ITB9LHRoaXMuX3NlbmRFcnJvcj1mdW5jdGlvbihlKXtNKHRoaXMuX2NvbmZpZy5lcnJvcik/dGhpcy5fY29uZmlnLmVycm9yKGUpOm8mJnRoaXMuX2NvbmZpZy5lcnJvciYmZi5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Yi5XT1JLRVJfSUQsZXJyb3I6ZSxmaW5pc2hlZDohMX0pfX1mdW5jdGlvbiBsKGUpe3ZhciByOyhlPWV8fHt9KS5jaHVua1NpemV8fChlLmNodW5rU2l6ZT1iLlJlbW90ZUNodW5rU2l6ZSksdS5jYWxsKHRoaXMsZSksdGhpcy5fbmV4dENodW5rPW4/ZnVuY3Rpb24oKXt0aGlzLl9yZWFkQ2h1bmsoKSx0aGlzLl9jaHVua0xvYWRlZCgpfTpmdW5jdGlvbigpe3RoaXMuX3JlYWRDaHVuaygpfSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9yZWFkQ2h1bms9ZnVuY3Rpb24oKXtpZih0aGlzLl9maW5pc2hlZCl0aGlzLl9jaHVua0xvYWRlZCgpO2Vsc2V7aWYocj1uZXcgWE1MSHR0cFJlcXVlc3QsdGhpcy5fY29uZmlnLndpdGhDcmVkZW50aWFscyYmKHIud2l0aENyZWRlbnRpYWxzPXRoaXMuX2NvbmZpZy53aXRoQ3JlZGVudGlhbHMpLG58fChyLm9ubG9hZD12KHRoaXMuX2NodW5rTG9hZGVkLHRoaXMpLHIub25lcnJvcj12KHRoaXMuX2NodW5rRXJyb3IsdGhpcykpLHIub3Blbih0aGlzLl9jb25maWcuZG93bmxvYWRSZXF1ZXN0Qm9keT9cIlBPU1RcIjpcIkdFVFwiLHRoaXMuX2lucHV0LCFuKSx0aGlzLl9jb25maWcuZG93bmxvYWRSZXF1ZXN0SGVhZGVycyl7dmFyIGU9dGhpcy5fY29uZmlnLmRvd25sb2FkUmVxdWVzdEhlYWRlcnM7Zm9yKHZhciB0IGluIGUpci5zZXRSZXF1ZXN0SGVhZGVyKHQsZVt0XSl9aWYodGhpcy5fY29uZmlnLmNodW5rU2l6ZSl7dmFyIGk9dGhpcy5fc3RhcnQrdGhpcy5fY29uZmlnLmNodW5rU2l6ZS0xO3Iuc2V0UmVxdWVzdEhlYWRlcihcIlJhbmdlXCIsXCJieXRlcz1cIit0aGlzLl9zdGFydCtcIi1cIitpKX10cnl7ci5zZW5kKHRoaXMuX2NvbmZpZy5kb3dubG9hZFJlcXVlc3RCb2R5KX1jYXRjaChlKXt0aGlzLl9jaHVua0Vycm9yKGUubWVzc2FnZSl9biYmMD09PXIuc3RhdHVzJiZ0aGlzLl9jaHVua0Vycm9yKCl9fSx0aGlzLl9jaHVua0xvYWRlZD1mdW5jdGlvbigpezQ9PT1yLnJlYWR5U3RhdGUmJihyLnN0YXR1czwyMDB8fDQwMDw9ci5zdGF0dXM/dGhpcy5fY2h1bmtFcnJvcigpOih0aGlzLl9zdGFydCs9dGhpcy5fY29uZmlnLmNodW5rU2l6ZT90aGlzLl9jb25maWcuY2h1bmtTaXplOnIucmVzcG9uc2VUZXh0Lmxlbmd0aCx0aGlzLl9maW5pc2hlZD0hdGhpcy5fY29uZmlnLmNodW5rU2l6ZXx8dGhpcy5fc3RhcnQ+PWZ1bmN0aW9uKGUpe3ZhciB0PWUuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVJhbmdlXCIpO2lmKG51bGw9PT10KXJldHVybi0xO3JldHVybiBwYXJzZUludCh0LnN1YnN0cmluZyh0Lmxhc3RJbmRleE9mKFwiL1wiKSsxKSl9KHIpLHRoaXMucGFyc2VDaHVuayhyLnJlc3BvbnNlVGV4dCkpKX0sdGhpcy5fY2h1bmtFcnJvcj1mdW5jdGlvbihlKXt2YXIgdD1yLnN0YXR1c1RleHR8fGU7dGhpcy5fc2VuZEVycm9yKG5ldyBFcnJvcih0KSl9fWZ1bmN0aW9uIGMoZSl7dmFyIHIsbjsoZT1lfHx7fSkuY2h1bmtTaXplfHwoZS5jaHVua1NpemU9Yi5Mb2NhbENodW5rU2l6ZSksdS5jYWxsKHRoaXMsZSk7dmFyIHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZpbGVSZWFkZXI7dGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7dGhpcy5faW5wdXQ9ZSxuPWUuc2xpY2V8fGUud2Via2l0U2xpY2V8fGUubW96U2xpY2Uscz8oKHI9bmV3IEZpbGVSZWFkZXIpLm9ubG9hZD12KHRoaXMuX2NodW5rTG9hZGVkLHRoaXMpLHIub25lcnJvcj12KHRoaXMuX2NodW5rRXJyb3IsdGhpcykpOnI9bmV3IEZpbGVSZWFkZXJTeW5jLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXt0aGlzLl9maW5pc2hlZHx8dGhpcy5fY29uZmlnLnByZXZpZXcmJiEodGhpcy5fcm93Q291bnQ8dGhpcy5fY29uZmlnLnByZXZpZXcpfHx0aGlzLl9yZWFkQ2h1bmsoKX0sdGhpcy5fcmVhZENodW5rPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5faW5wdXQ7aWYodGhpcy5fY29uZmlnLmNodW5rU2l6ZSl7dmFyIHQ9TWF0aC5taW4odGhpcy5fc3RhcnQrdGhpcy5fY29uZmlnLmNodW5rU2l6ZSx0aGlzLl9pbnB1dC5zaXplKTtlPW4uY2FsbChlLHRoaXMuX3N0YXJ0LHQpfXZhciBpPXIucmVhZEFzVGV4dChlLHRoaXMuX2NvbmZpZy5lbmNvZGluZyk7c3x8dGhpcy5fY2h1bmtMb2FkZWQoe3RhcmdldDp7cmVzdWx0Oml9fSl9LHRoaXMuX2NodW5rTG9hZGVkPWZ1bmN0aW9uKGUpe3RoaXMuX3N0YXJ0Kz10aGlzLl9jb25maWcuY2h1bmtTaXplLHRoaXMuX2ZpbmlzaGVkPSF0aGlzLl9jb25maWcuY2h1bmtTaXplfHx0aGlzLl9zdGFydD49dGhpcy5faW5wdXQuc2l6ZSx0aGlzLnBhcnNlQ2h1bmsoZS50YXJnZXQucmVzdWx0KX0sdGhpcy5fY2h1bmtFcnJvcj1mdW5jdGlvbigpe3RoaXMuX3NlbmRFcnJvcihyLmVycm9yKX19ZnVuY3Rpb24gcChlKXt2YXIgaTt1LmNhbGwodGhpcyxlPWV8fHt9KSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXtyZXR1cm4gaT1lLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXtpZighdGhpcy5fZmluaXNoZWQpe3ZhciBlLHQ9dGhpcy5fY29uZmlnLmNodW5rU2l6ZTtyZXR1cm4gdD8oZT1pLnN1YnN0cmluZygwLHQpLGk9aS5zdWJzdHJpbmcodCkpOihlPWksaT1cIlwiKSx0aGlzLl9maW5pc2hlZD0haSx0aGlzLnBhcnNlQ2h1bmsoZSl9fX1mdW5jdGlvbiBnKGUpe3UuY2FsbCh0aGlzLGU9ZXx8e30pO3ZhciB0PVtdLGk9ITAscj0hMTt0aGlzLnBhdXNlPWZ1bmN0aW9uKCl7dS5wcm90b3R5cGUucGF1c2UuYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuX2lucHV0LnBhdXNlKCl9LHRoaXMucmVzdW1lPWZ1bmN0aW9uKCl7dS5wcm90b3R5cGUucmVzdW1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSx0aGlzLl9pbnB1dC5yZXN1bWUoKX0sdGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7dGhpcy5faW5wdXQ9ZSx0aGlzLl9pbnB1dC5vbihcImRhdGFcIix0aGlzLl9zdHJlYW1EYXRhKSx0aGlzLl9pbnB1dC5vbihcImVuZFwiLHRoaXMuX3N0cmVhbUVuZCksdGhpcy5faW5wdXQub24oXCJlcnJvclwiLHRoaXMuX3N0cmVhbUVycm9yKX0sdGhpcy5fY2hlY2tJc0ZpbmlzaGVkPWZ1bmN0aW9uKCl7ciYmMT09PXQubGVuZ3RoJiYodGhpcy5fZmluaXNoZWQ9ITApfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXt0aGlzLl9jaGVja0lzRmluaXNoZWQoKSx0Lmxlbmd0aD90aGlzLnBhcnNlQ2h1bmsodC5zaGlmdCgpKTppPSEwfSx0aGlzLl9zdHJlYW1EYXRhPXYoZnVuY3Rpb24oZSl7dHJ5e3QucHVzaChcInN0cmluZ1wiPT10eXBlb2YgZT9lOmUudG9TdHJpbmcodGhpcy5fY29uZmlnLmVuY29kaW5nKSksaSYmKGk9ITEsdGhpcy5fY2hlY2tJc0ZpbmlzaGVkKCksdGhpcy5wYXJzZUNodW5rKHQuc2hpZnQoKSkpfWNhdGNoKGUpe3RoaXMuX3N0cmVhbUVycm9yKGUpfX0sdGhpcyksdGhpcy5fc3RyZWFtRXJyb3I9dihmdW5jdGlvbihlKXt0aGlzLl9zdHJlYW1DbGVhblVwKCksdGhpcy5fc2VuZEVycm9yKGUpfSx0aGlzKSx0aGlzLl9zdHJlYW1FbmQ9dihmdW5jdGlvbigpe3RoaXMuX3N0cmVhbUNsZWFuVXAoKSxyPSEwLHRoaXMuX3N0cmVhbURhdGEoXCJcIil9LHRoaXMpLHRoaXMuX3N0cmVhbUNsZWFuVXA9dihmdW5jdGlvbigpe3RoaXMuX2lucHV0LnJlbW92ZUxpc3RlbmVyKFwiZGF0YVwiLHRoaXMuX3N0cmVhbURhdGEpLHRoaXMuX2lucHV0LnJlbW92ZUxpc3RlbmVyKFwiZW5kXCIsdGhpcy5fc3RyZWFtRW5kKSx0aGlzLl9pbnB1dC5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsdGhpcy5fc3RyZWFtRXJyb3IpfSx0aGlzKX1mdW5jdGlvbiBpKG0pe3ZhciBhLG8saCxyPU1hdGgucG93KDIsNTMpLG49LXIscz0vXlxccyotPyhcXGQrXFwuP3xcXC5cXGQrfFxcZCtcXC5cXGQrKShbZUVdWy0rXT9cXGQrKT9cXHMqJC8sdT0vXihcXGR7NH0tWzAxXVxcZC1bMC0zXVxcZFRbMC0yXVxcZDpbMC01XVxcZDpbMC01XVxcZFxcLlxcZCsoWystXVswLTJdXFxkOlswLTVdXFxkfFopKXwoXFxkezR9LVswMV1cXGQtWzAtM11cXGRUWzAtMl1cXGQ6WzAtNV1cXGQ6WzAtNV1cXGQoWystXVswLTJdXFxkOlswLTVdXFxkfFopKXwoXFxkezR9LVswMV1cXGQtWzAtM11cXGRUWzAtMl1cXGQ6WzAtNV1cXGQoWystXVswLTJdXFxkOlswLTVdXFxkfFopKSQvLHQ9dGhpcyxpPTAsZj0wLGQ9ITEsZT0hMSxsPVtdLGM9e2RhdGE6W10sZXJyb3JzOltdLG1ldGE6e319O2lmKE0obS5zdGVwKSl7dmFyIHA9bS5zdGVwO20uc3RlcD1mdW5jdGlvbihlKXtpZihjPWUsXygpKWcoKTtlbHNle2lmKGcoKSwwPT09Yy5kYXRhLmxlbmd0aClyZXR1cm47aSs9ZS5kYXRhLmxlbmd0aCxtLnByZXZpZXcmJmk+bS5wcmV2aWV3P28uYWJvcnQoKTooYy5kYXRhPWMuZGF0YVswXSxwKGMsdCkpfX19ZnVuY3Rpb24geShlKXtyZXR1cm5cImdyZWVkeVwiPT09bS5za2lwRW1wdHlMaW5lcz9cIlwiPT09ZS5qb2luKFwiXCIpLnRyaW0oKToxPT09ZS5sZW5ndGgmJjA9PT1lWzBdLmxlbmd0aH1mdW5jdGlvbiBnKCl7aWYoYyYmaCYmKGsoXCJEZWxpbWl0ZXJcIixcIlVuZGV0ZWN0YWJsZURlbGltaXRlclwiLFwiVW5hYmxlIHRvIGF1dG8tZGV0ZWN0IGRlbGltaXRpbmcgY2hhcmFjdGVyOyBkZWZhdWx0ZWQgdG8gJ1wiK2IuRGVmYXVsdERlbGltaXRlcitcIidcIiksaD0hMSksbS5za2lwRW1wdHlMaW5lcylmb3IodmFyIGU9MDtlPGMuZGF0YS5sZW5ndGg7ZSsrKXkoYy5kYXRhW2VdKSYmYy5kYXRhLnNwbGljZShlLS0sMSk7cmV0dXJuIF8oKSYmZnVuY3Rpb24oKXtpZighYylyZXR1cm47ZnVuY3Rpb24gZShlLHQpe00obS50cmFuc2Zvcm1IZWFkZXIpJiYoZT1tLnRyYW5zZm9ybUhlYWRlcihlLHQpKSxsLnB1c2goZSl9aWYoQXJyYXkuaXNBcnJheShjLmRhdGFbMF0pKXtmb3IodmFyIHQ9MDtfKCkmJnQ8Yy5kYXRhLmxlbmd0aDt0KyspYy5kYXRhW3RdLmZvckVhY2goZSk7Yy5kYXRhLnNwbGljZSgwLDEpfWVsc2UgYy5kYXRhLmZvckVhY2goZSl9KCksZnVuY3Rpb24oKXtpZighY3x8IW0uaGVhZGVyJiYhbS5keW5hbWljVHlwaW5nJiYhbS50cmFuc2Zvcm0pcmV0dXJuIGM7ZnVuY3Rpb24gZShlLHQpe3ZhciBpLHI9bS5oZWFkZXI/e306W107Zm9yKGk9MDtpPGUubGVuZ3RoO2krKyl7dmFyIG49aSxzPWVbaV07bS5oZWFkZXImJihuPWk+PWwubGVuZ3RoP1wiX19wYXJzZWRfZXh0cmFcIjpsW2ldKSxtLnRyYW5zZm9ybSYmKHM9bS50cmFuc2Zvcm0ocyxuKSkscz12KG4scyksXCJfX3BhcnNlZF9leHRyYVwiPT09bj8ocltuXT1yW25dfHxbXSxyW25dLnB1c2gocykpOnJbbl09c31yZXR1cm4gbS5oZWFkZXImJihpPmwubGVuZ3RoP2soXCJGaWVsZE1pc21hdGNoXCIsXCJUb29NYW55RmllbGRzXCIsXCJUb28gbWFueSBmaWVsZHM6IGV4cGVjdGVkIFwiK2wubGVuZ3RoK1wiIGZpZWxkcyBidXQgcGFyc2VkIFwiK2ksZit0KTppPGwubGVuZ3RoJiZrKFwiRmllbGRNaXNtYXRjaFwiLFwiVG9vRmV3RmllbGRzXCIsXCJUb28gZmV3IGZpZWxkczogZXhwZWN0ZWQgXCIrbC5sZW5ndGgrXCIgZmllbGRzIGJ1dCBwYXJzZWQgXCIraSxmK3QpKSxyfXZhciB0PTE7IWMuZGF0YS5sZW5ndGh8fEFycmF5LmlzQXJyYXkoYy5kYXRhWzBdKT8oYy5kYXRhPWMuZGF0YS5tYXAoZSksdD1jLmRhdGEubGVuZ3RoKTpjLmRhdGE9ZShjLmRhdGEsMCk7bS5oZWFkZXImJmMubWV0YSYmKGMubWV0YS5maWVsZHM9bCk7cmV0dXJuIGYrPXQsY30oKX1mdW5jdGlvbiBfKCl7cmV0dXJuIG0uaGVhZGVyJiYwPT09bC5sZW5ndGh9ZnVuY3Rpb24gdihlLHQpe3JldHVybiBpPWUsbS5keW5hbWljVHlwaW5nRnVuY3Rpb24mJnZvaWQgMD09PW0uZHluYW1pY1R5cGluZ1tpXSYmKG0uZHluYW1pY1R5cGluZ1tpXT1tLmR5bmFtaWNUeXBpbmdGdW5jdGlvbihpKSksITA9PT0obS5keW5hbWljVHlwaW5nW2ldfHxtLmR5bmFtaWNUeXBpbmcpP1widHJ1ZVwiPT09dHx8XCJUUlVFXCI9PT10fHxcImZhbHNlXCIhPT10JiZcIkZBTFNFXCIhPT10JiYoZnVuY3Rpb24oZSl7aWYocy50ZXN0KGUpKXt2YXIgdD1wYXJzZUZsb2F0KGUpO2lmKG48dCYmdDxyKXJldHVybiEwfXJldHVybiExfSh0KT9wYXJzZUZsb2F0KHQpOnUudGVzdCh0KT9uZXcgRGF0ZSh0KTpcIlwiPT09dD9udWxsOnQpOnQ7dmFyIGl9ZnVuY3Rpb24gayhlLHQsaSxyKXt2YXIgbj17dHlwZTplLGNvZGU6dCxtZXNzYWdlOml9O3ZvaWQgMCE9PXImJihuLnJvdz1yKSxjLmVycm9ycy5wdXNoKG4pfXRoaXMucGFyc2U9ZnVuY3Rpb24oZSx0LGkpe3ZhciByPW0ucXVvdGVDaGFyfHwnXCInO2lmKG0ubmV3bGluZXx8KG0ubmV3bGluZT1mdW5jdGlvbihlLHQpe2U9ZS5zdWJzdHJpbmcoMCwxMDQ4NTc2KTt2YXIgaT1uZXcgUmVnRXhwKGoodCkrXCIoW15dKj8pXCIraih0KSxcImdtXCIpLHI9KGU9ZS5yZXBsYWNlKGksXCJcIikpLnNwbGl0KFwiXFxyXCIpLG49ZS5zcGxpdChcIlxcblwiKSxzPTE8bi5sZW5ndGgmJm5bMF0ubGVuZ3RoPHJbMF0ubGVuZ3RoO2lmKDE9PT1yLmxlbmd0aHx8cylyZXR1cm5cIlxcblwiO2Zvcih2YXIgYT0wLG89MDtvPHIubGVuZ3RoO28rKylcIlxcblwiPT09cltvXVswXSYmYSsrO3JldHVybiBhPj1yLmxlbmd0aC8yP1wiXFxyXFxuXCI6XCJcXHJcIn0oZSxyKSksaD0hMSxtLmRlbGltaXRlcilNKG0uZGVsaW1pdGVyKSYmKG0uZGVsaW1pdGVyPW0uZGVsaW1pdGVyKGUpLGMubWV0YS5kZWxpbWl0ZXI9bS5kZWxpbWl0ZXIpO2Vsc2V7dmFyIG49ZnVuY3Rpb24oZSx0LGkscixuKXt2YXIgcyxhLG8saDtuPW58fFtcIixcIixcIlxcdFwiLFwifFwiLFwiO1wiLGIuUkVDT1JEX1NFUCxiLlVOSVRfU0VQXTtmb3IodmFyIHU9MDt1PG4ubGVuZ3RoO3UrKyl7dmFyIGY9blt1XSxkPTAsbD0wLGM9MDtvPXZvaWQgMDtmb3IodmFyIHA9bmV3IEUoe2NvbW1lbnRzOnIsZGVsaW1pdGVyOmYsbmV3bGluZTp0LHByZXZpZXc6MTB9KS5wYXJzZShlKSxnPTA7ZzxwLmRhdGEubGVuZ3RoO2crKylpZihpJiZ5KHAuZGF0YVtnXSkpYysrO2Vsc2V7dmFyIF89cC5kYXRhW2ddLmxlbmd0aDtsKz1fLHZvaWQgMCE9PW8/MDxfJiYoZCs9TWF0aC5hYnMoXy1vKSxvPV8pOm89X30wPHAuZGF0YS5sZW5ndGgmJihsLz1wLmRhdGEubGVuZ3RoLWMpLCh2b2lkIDA9PT1hfHxkPD1hKSYmKHZvaWQgMD09PWh8fGg8bCkmJjEuOTk8bCYmKGE9ZCxzPWYsaD1sKX1yZXR1cm57c3VjY2Vzc2Z1bDohIShtLmRlbGltaXRlcj1zKSxiZXN0RGVsaW1pdGVyOnN9fShlLG0ubmV3bGluZSxtLnNraXBFbXB0eUxpbmVzLG0uY29tbWVudHMsbS5kZWxpbWl0ZXJzVG9HdWVzcyk7bi5zdWNjZXNzZnVsP20uZGVsaW1pdGVyPW4uYmVzdERlbGltaXRlcjooaD0hMCxtLmRlbGltaXRlcj1iLkRlZmF1bHREZWxpbWl0ZXIpLGMubWV0YS5kZWxpbWl0ZXI9bS5kZWxpbWl0ZXJ9dmFyIHM9dyhtKTtyZXR1cm4gbS5wcmV2aWV3JiZtLmhlYWRlciYmcy5wcmV2aWV3KyssYT1lLG89bmV3IEUocyksYz1vLnBhcnNlKGEsdCxpKSxnKCksZD97bWV0YTp7cGF1c2VkOiEwfX06Y3x8e21ldGE6e3BhdXNlZDohMX19fSx0aGlzLnBhdXNlZD1mdW5jdGlvbigpe3JldHVybiBkfSx0aGlzLnBhdXNlPWZ1bmN0aW9uKCl7ZD0hMCxvLmFib3J0KCksYT1NKG0uY2h1bmspP1wiXCI6YS5zdWJzdHJpbmcoby5nZXRDaGFySW5kZXgoKSl9LHRoaXMucmVzdW1lPWZ1bmN0aW9uKCl7dC5zdHJlYW1lci5faGFsdGVkPyhkPSExLHQuc3RyZWFtZXIucGFyc2VDaHVuayhhLCEwKSk6c2V0VGltZW91dCh0LnJlc3VtZSwzKX0sdGhpcy5hYm9ydGVkPWZ1bmN0aW9uKCl7cmV0dXJuIGV9LHRoaXMuYWJvcnQ9ZnVuY3Rpb24oKXtlPSEwLG8uYWJvcnQoKSxjLm1ldGEuYWJvcnRlZD0hMCxNKG0uY29tcGxldGUpJiZtLmNvbXBsZXRlKGMpLGE9XCJcIn19ZnVuY3Rpb24gaihlKXtyZXR1cm4gZS5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZyxcIlxcXFwkJlwiKX1mdW5jdGlvbiBFKGUpe3ZhciBTLE89KGU9ZXx8e30pLmRlbGltaXRlcix4PWUubmV3bGluZSxJPWUuY29tbWVudHMsVD1lLnN0ZXAsRD1lLnByZXZpZXcsQT1lLmZhc3RNb2RlLEw9Uz12b2lkIDA9PT1lLnF1b3RlQ2hhcj8nXCInOmUucXVvdGVDaGFyO2lmKHZvaWQgMCE9PWUuZXNjYXBlQ2hhciYmKEw9ZS5lc2NhcGVDaGFyKSwoXCJzdHJpbmdcIiE9dHlwZW9mIE98fC0xPGIuQkFEX0RFTElNSVRFUlMuaW5kZXhPZihPKSkmJihPPVwiLFwiKSxJPT09Tyl0aHJvdyBuZXcgRXJyb3IoXCJDb21tZW50IGNoYXJhY3RlciBzYW1lIGFzIGRlbGltaXRlclwiKTshMD09PUk/ST1cIiNcIjooXCJzdHJpbmdcIiE9dHlwZW9mIEl8fC0xPGIuQkFEX0RFTElNSVRFUlMuaW5kZXhPZihJKSkmJihJPSExKSxcIlxcblwiIT09eCYmXCJcXHJcIiE9PXgmJlwiXFxyXFxuXCIhPT14JiYoeD1cIlxcblwiKTt2YXIgRj0wLHo9ITE7dGhpcy5wYXJzZT1mdW5jdGlvbihyLHQsaSl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIHIpdGhyb3cgbmV3IEVycm9yKFwiSW5wdXQgbXVzdCBiZSBhIHN0cmluZ1wiKTt2YXIgbj1yLmxlbmd0aCxlPU8ubGVuZ3RoLHM9eC5sZW5ndGgsYT1JLmxlbmd0aCxvPU0oVCksaD1bXSx1PVtdLGY9W10sZD1GPTA7aWYoIXIpcmV0dXJuIEMoKTtpZihBfHwhMSE9PUEmJi0xPT09ci5pbmRleE9mKFMpKXtmb3IodmFyIGw9ci5zcGxpdCh4KSxjPTA7YzxsLmxlbmd0aDtjKyspe2lmKGY9bFtjXSxGKz1mLmxlbmd0aCxjIT09bC5sZW5ndGgtMSlGKz14Lmxlbmd0aDtlbHNlIGlmKGkpcmV0dXJuIEMoKTtpZighSXx8Zi5zdWJzdHJpbmcoMCxhKSE9PUkpe2lmKG8pe2lmKGg9W10sayhmLnNwbGl0KE8pKSxSKCkseilyZXR1cm4gQygpfWVsc2UgayhmLnNwbGl0KE8pKTtpZihEJiZEPD1jKXJldHVybiBoPWguc2xpY2UoMCxEKSxDKCEwKX19cmV0dXJuIEMoKX1mb3IodmFyIHA9ci5pbmRleE9mKE8sRiksZz1yLmluZGV4T2YoeCxGKSxfPW5ldyBSZWdFeHAoaihMKStqKFMpLFwiZ1wiKSxtPXIuaW5kZXhPZihTLEYpOzspaWYocltGXSE9PVMpaWYoSSYmMD09PWYubGVuZ3RoJiZyLnN1YnN0cmluZyhGLEYrYSk9PT1JKXtpZigtMT09PWcpcmV0dXJuIEMoKTtGPWcrcyxnPXIuaW5kZXhPZih4LEYpLHA9ci5pbmRleE9mKE8sRil9ZWxzZSBpZigtMSE9PXAmJihwPGd8fC0xPT09ZykpZi5wdXNoKHIuc3Vic3RyaW5nKEYscCkpLEY9cCtlLHA9ci5pbmRleE9mKE8sRik7ZWxzZXtpZigtMT09PWcpYnJlYWs7aWYoZi5wdXNoKHIuc3Vic3RyaW5nKEYsZykpLHcoZytzKSxvJiYoUigpLHopKXJldHVybiBDKCk7aWYoRCYmaC5sZW5ndGg+PUQpcmV0dXJuIEMoITApfWVsc2UgZm9yKG09RixGKys7Oyl7aWYoLTE9PT0obT1yLmluZGV4T2YoUyxtKzEpKSlyZXR1cm4gaXx8dS5wdXNoKHt0eXBlOlwiUXVvdGVzXCIsY29kZTpcIk1pc3NpbmdRdW90ZXNcIixtZXNzYWdlOlwiUXVvdGVkIGZpZWxkIHVudGVybWluYXRlZFwiLHJvdzpoLmxlbmd0aCxpbmRleDpGfSksRSgpO2lmKG09PT1uLTEpcmV0dXJuIEUoci5zdWJzdHJpbmcoRixtKS5yZXBsYWNlKF8sUykpO2lmKFMhPT1MfHxyW20rMV0hPT1MKXtpZihTPT09THx8MD09PW18fHJbbS0xXSE9PUwpey0xIT09cCYmcDxtKzEmJihwPXIuaW5kZXhPZihPLG0rMSkpLC0xIT09ZyYmZzxtKzEmJihnPXIuaW5kZXhPZih4LG0rMSkpO3ZhciB5PWIoLTE9PT1nP3A6TWF0aC5taW4ocCxnKSk7aWYoclttKzEreV09PT1PKXtmLnB1c2goci5zdWJzdHJpbmcoRixtKS5yZXBsYWNlKF8sUykpLHJbRj1tKzEreStlXSE9PVMmJihtPXIuaW5kZXhPZihTLEYpKSxwPXIuaW5kZXhPZihPLEYpLGc9ci5pbmRleE9mKHgsRik7YnJlYWt9dmFyIHY9YihnKTtpZihyLnN1YnN0cmluZyhtKzErdixtKzErditzKT09PXgpe2lmKGYucHVzaChyLnN1YnN0cmluZyhGLG0pLnJlcGxhY2UoXyxTKSksdyhtKzErditzKSxwPXIuaW5kZXhPZihPLEYpLG09ci5pbmRleE9mKFMsRiksbyYmKFIoKSx6KSlyZXR1cm4gQygpO2lmKEQmJmgubGVuZ3RoPj1EKXJldHVybiBDKCEwKTticmVha311LnB1c2goe3R5cGU6XCJRdW90ZXNcIixjb2RlOlwiSW52YWxpZFF1b3Rlc1wiLG1lc3NhZ2U6XCJUcmFpbGluZyBxdW90ZSBvbiBxdW90ZWQgZmllbGQgaXMgbWFsZm9ybWVkXCIscm93OmgubGVuZ3RoLGluZGV4OkZ9KSxtKyt9fWVsc2UgbSsrfXJldHVybiBFKCk7ZnVuY3Rpb24gayhlKXtoLnB1c2goZSksZD1GfWZ1bmN0aW9uIGIoZSl7dmFyIHQ9MDtpZigtMSE9PWUpe3ZhciBpPXIuc3Vic3RyaW5nKG0rMSxlKTtpJiZcIlwiPT09aS50cmltKCkmJih0PWkubGVuZ3RoKX1yZXR1cm4gdH1mdW5jdGlvbiBFKGUpe3JldHVybiBpfHwodm9pZCAwPT09ZSYmKGU9ci5zdWJzdHJpbmcoRikpLGYucHVzaChlKSxGPW4sayhmKSxvJiZSKCkpLEMoKX1mdW5jdGlvbiB3KGUpe0Y9ZSxrKGYpLGY9W10sZz1yLmluZGV4T2YoeCxGKX1mdW5jdGlvbiBDKGUpe3JldHVybntkYXRhOmgsZXJyb3JzOnUsbWV0YTp7ZGVsaW1pdGVyOk8sbGluZWJyZWFrOngsYWJvcnRlZDp6LHRydW5jYXRlZDohIWUsY3Vyc29yOmQrKHR8fDApfX19ZnVuY3Rpb24gUigpe1QoQygpKSxoPVtdLHU9W119fSx0aGlzLmFib3J0PWZ1bmN0aW9uKCl7ej0hMH0sdGhpcy5nZXRDaGFySW5kZXg9ZnVuY3Rpb24oKXtyZXR1cm4gRn19ZnVuY3Rpb24gXyhlKXt2YXIgdD1lLmRhdGEsaT1hW3Qud29ya2VySWRdLHI9ITE7aWYodC5lcnJvcilpLnVzZXJFcnJvcih0LmVycm9yLHQuZmlsZSk7ZWxzZSBpZih0LnJlc3VsdHMmJnQucmVzdWx0cy5kYXRhKXt2YXIgbj17YWJvcnQ6ZnVuY3Rpb24oKXtyPSEwLG0odC53b3JrZXJJZCx7ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7YWJvcnRlZDohMH19KX0scGF1c2U6eSxyZXN1bWU6eX07aWYoTShpLnVzZXJTdGVwKSl7Zm9yKHZhciBzPTA7czx0LnJlc3VsdHMuZGF0YS5sZW5ndGgmJihpLnVzZXJTdGVwKHtkYXRhOnQucmVzdWx0cy5kYXRhW3NdLGVycm9yczp0LnJlc3VsdHMuZXJyb3JzLG1ldGE6dC5yZXN1bHRzLm1ldGF9LG4pLCFyKTtzKyspO2RlbGV0ZSB0LnJlc3VsdHN9ZWxzZSBNKGkudXNlckNodW5rKSYmKGkudXNlckNodW5rKHQucmVzdWx0cyxuLHQuZmlsZSksZGVsZXRlIHQucmVzdWx0cyl9dC5maW5pc2hlZCYmIXImJm0odC53b3JrZXJJZCx0LnJlc3VsdHMpfWZ1bmN0aW9uIG0oZSx0KXt2YXIgaT1hW2VdO00oaS51c2VyQ29tcGxldGUpJiZpLnVzZXJDb21wbGV0ZSh0KSxpLnRlcm1pbmF0ZSgpLGRlbGV0ZSBhW2VdfWZ1bmN0aW9uIHkoKXt0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQuXCIpfWZ1bmN0aW9uIHcoZSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGV8fG51bGw9PT1lKXJldHVybiBlO3ZhciB0PUFycmF5LmlzQXJyYXkoZSk/W106e307Zm9yKHZhciBpIGluIGUpdFtpXT13KGVbaV0pO3JldHVybiB0fWZ1bmN0aW9uIHYoZSx0KXtyZXR1cm4gZnVuY3Rpb24oKXtlLmFwcGx5KHQsYXJndW1lbnRzKX19ZnVuY3Rpb24gTShlKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlfXJldHVybiBvJiYoZi5vbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5kYXRhO3ZvaWQgMD09PWIuV09SS0VSX0lEJiZ0JiYoYi5XT1JLRVJfSUQ9dC53b3JrZXJJZCk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQuaW5wdXQpZi5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Yi5XT1JLRVJfSUQscmVzdWx0czpiLnBhcnNlKHQuaW5wdXQsdC5jb25maWcpLGZpbmlzaGVkOiEwfSk7ZWxzZSBpZihmLkZpbGUmJnQuaW5wdXQgaW5zdGFuY2VvZiBGaWxlfHx0LmlucHV0IGluc3RhbmNlb2YgT2JqZWN0KXt2YXIgaT1iLnBhcnNlKHQuaW5wdXQsdC5jb25maWcpO2kmJmYucG9zdE1lc3NhZ2Uoe3dvcmtlcklkOmIuV09SS0VSX0lELHJlc3VsdHM6aSxmaW5pc2hlZDohMH0pfX0pLChsLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHUucHJvdG90eXBlKSkuY29uc3RydWN0b3I9bCwoYy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZSh1LnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yPWMsKHAucHJvdG90eXBlPU9iamVjdC5jcmVhdGUocC5wcm90b3R5cGUpKS5jb25zdHJ1Y3Rvcj1wLChnLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHUucHJvdG90eXBlKSkuY29uc3RydWN0b3I9ZyxifSk7IiwgIlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdlYnNvY2tldCh1cmw6IFVSTCwgZW50cmllczogdW5rbm93bltdLCBvbk9wZW46ICgpID0+IHZvaWQpIHtcbiAgICBsZXQgd3MgPSBuZXcgV2ViU29ja2V0KHVybCk7XG4gICAgaWYgKCF3cykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXJ2ZXIgZGlkbid0IGFjY2VwdCB3c1wiKTtcbiAgICB9XG4gICAgd3MuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnT3BlbmVkIHdlYnNvY2tldCcpO1xuICAgICAgICBvbk9wZW4oKVxuICAgIH0pO1xuICAgIHdzLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsICh7IGRhdGEgfSkgPT4ge1xuICAgICAgICBjb25zdCB7IGNvdW50LCB0eiwgZXJyb3IsIG5hbWUsIGR1cmF0aW9uLCBlbmRUaW1lIH0gPSBKU09OLnBhcnNlKGRhdGEpO1xuXG4gICAgICAgIGlmIChuYW1lICYmIGR1cmF0aW9uICYmIGVuZFRpbWUpIHtcblxuICAgICAgICAgICAgbGV0IHN0YXJ0VGltZSA9IGVuZFRpbWUgLSBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICBzZXJ2ZXJFbnRyeSA9IHsgbmFtZSwgZHVyYXRpb24sIHN0YXJ0VGltZSwgZW50cnlUeXBlOiAnc2VydmVyJywgZW5kVGltZSB9XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oc2VydmVyRW50cnkpXG4gICAgICAgICAgICBlbnRyaWVzLnB1c2goc2VydmVyRW50cnkpO1xuICAgICAgICB9IGVsc2UgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgY29uc29sZS5pbmZvKHsgY291bnQsIHR6LCBlcnJvciB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHdzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbG9zZWQgd2Vic29ja2V0Jyk7XG5cbiAgICB9KTtcbiAgICByZXR1cm4gd3M7XG59XG4iLCAiZXhwb3J0IHR5cGUgVGJyaWVmRW50cnkgPSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGVuZFRpbWU6IG51bWJlcjtcbiAgICBzdGFydFRpbWU6IG51bWJlcjtcbiAgICBkdXJhdGlvbjogbnVtYmVyO1xuICAgIGVudHJ5VHlwZTogc3RyaW5nO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluaXRPYnNlcnZlcnMoZW50cmllczogdW5rbm93bltdKSB7XG4gICAgY29uc3QgcG8gPSBuZXcgUGVyZm9ybWFuY2VPYnNlcnZlcigobGlzdCkgPT4ge1xuICAgICAgICBsaXN0LmdldEVudHJpZXMoKS5mb3JFYWNoKFxuICAgICAgICAgICAgKGVudHJ5OiBQZXJmb3JtYW5jZUVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHsgc3RhcnRUaW1lLCBkdXJhdGlvbiwgbmFtZSwgZW50cnlUeXBlIH0gPSBlbnRyeVxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IE1hdGguZmxvb3Ioc3RhcnRUaW1lKVxuICAgICAgICAgICAgICAgIGR1cmF0aW9uID0gTWF0aC5mbG9vcihkdXJhdGlvbilcbiAgICAgICAgICAgICAgICBsZXQgZW5kVGltZSA9IHN0YXJ0VGltZSArIGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBicmllZkVudHJ5ID0geyBuYW1lLCBlbmRUaW1lLCBzdGFydFRpbWUsIGR1cmF0aW9uLCBlbnRyeVR5cGUgfTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhicmllZkVudHJ5KVxuICAgICAgICAgICAgICAgIGVudHJpZXMucHVzaChicmllZkVudHJ5KVxuICAgICAgICAgICAgfSlcbiAgICB9KVxuICAgIGNvbnN0IHJvID0gbmV3IFBlcmZvcm1hbmNlT2JzZXJ2ZXIoKGxpc3QpID0+IHtcbiAgICAgICAgbGlzdC5nZXRFbnRyaWVzQnlUeXBlKCdyZXNvdXJjZScpLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBsZXQgeyBzdGFydFRpbWUsIGR1cmF0aW9uLCBuYW1lLCBlbnRyeVR5cGUsIHJlc3BvbnNlU3RhcnQsIHJlc3BvbnNlRW5kIH0gPSBlbnRyeSBhcyBQZXJmb3JtYW5jZVJlc291cmNlVGltaW5nXG4gICAgICAgICAgICBpZiAobmFtZS5pbmNsdWRlcygnbWl0bScpIHx8IG5hbWUuaW5jbHVkZXMoJ2Zhdmljb24nKSkgcmV0dXJuXG4gICAgICAgICAgICBzdGFydFRpbWUgPSBNYXRoLmZsb29yKHN0YXJ0VGltZSlcbiAgICAgICAgICAgIGR1cmF0aW9uID0gTWF0aC5mbG9vcihkdXJhdGlvbilcbiAgICAgICAgICAgIHJlc3BvbnNlRW5kID0gTWF0aC5mbG9vcihyZXNwb25zZUVuZClcbiAgICAgICAgICAgIHJlc3BvbnNlU3RhcnQgPSBNYXRoLmZsb29yKHJlc3BvbnNlU3RhcnQpXG4gICAgICAgICAgICBpZiAoL15odHRwcz86XFwvXFwvLy50ZXN0KG5hbWUpKSBuYW1lID0gU3RyaW5nKG5hbWUuc3BsaXQoJy8nKS5wb3AoKSlcbiAgICAgICAgICAgIGVudHJpZXMgPSBlbnRyaWVzLmNvbmNhdChbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZG93bmxvYWQ6cmVxdWVzdF9zZW50JyxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMCxcbiAgICAgICAgICAgICAgICAgICAgZW5kVGltZTogc3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgICAgICBlbnRyeVR5cGU6ICdtYXJrJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZG93bmxvYWQ6cmVzcG9uc2Vfc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiByZXNwb25zZVN0YXJ0IC0gc3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgICAgICBlbmRUaW1lOiByZXNwb25zZVN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBlbnRyeVR5cGU6ICdyZXNvdXJjZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2Rvd25sb2FkOnJlc3BvbnNlX2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lOiByZXNwb25zZVN0YXJ0IC0gc3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogcmVzcG9uc2VFbmQgLSByZXNwb25zZVN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBlbmRUaW1lOiByZXNwb25zZUVuZCxcbiAgICAgICAgICAgICAgICAgICAgZW50cnlUeXBlOiAncmVzb3VyY2UnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSlcblxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbnRyeS50b0pTT04oKSlcblxuXG5cbiAgICAgICAgfSlcblxuICAgIH0pXG5cbiAgICBjb25zdCBsaXN0RW50cmllcyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZW50cmllc09iaiA9IGVudHJpZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGEuZW5kVGltZSAtIGIuZW5kVGltZVxuICAgICAgICB9KS5yZWR1Y2UoKGFjY3VtLCBlbnRyeSkgPT4ge1xuICAgICAgICAgICAgbGV0IHsgbmFtZSwgZW5kVGltZSwgc3RhcnRUaW1lLCBkdXJhdGlvbiwgZW50cnlUeXBlIH0gPSBlbnRyeTtcbiAgICAgICAgICAgIGFjY3VtW25hbWVdID0geyBlbmRUaW1lLCBzdGFydFRpbWUsIGR1cmF0aW9uLCBlbnRyeVR5cGUgfTtcbiAgICAgICAgICAgIHJldHVybiBhY2N1bTtcbiAgICAgICAgfSwge30gYXMgeyBbczogc3RyaW5nXTogT21pdDxUYnJpZWZFbnRyeSwgJ25hbWUnPiB9KVxuICAgICAgICB3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLnRhYmxlKGVudHJpZXNPYmopO1xuICAgICAgICAgICAgcG8gJiYgcG8uZGlzY29ubmVjdCgpXG4gICAgICAgICAgICBybyAmJiByby5kaXNjb25uZWN0KClcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB7IHJvLCBwbywgbGlzdEVudHJpZXMgfVxufSIsICJpbXBvcnQgc3RyZWFtU2F2ZXIgZnJvbSAnc3RyZWFtc2F2ZXInO1xuXG5cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBmaWxlTmFtZSA9ICdmaWxlLnR4dCcsXG4gICAgY2I6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZFxuKSB7XG4gICAgbGV0IHR0ZmIgPSBmYWxzZTtcbiAgICBjb25zb2xlLmxvZyh7IHVybCB9KTtcbiAgICBwZXJmb3JtYW5jZS5tYXJrKCdkb3dubG9hZDpzdGFydCcpO1xuXG4gICAgbGV0IGRvbmUgPSBmYWxzZTtcbiAgICBzdHJlYW1TYXZlci5taXRtID0gYCR7bG9jYXRpb24ub3JpZ2lufS9taXRtLmh0bWxgO1xuICAgIGNvbnN0IGZpbGVTdHJlYW0gPSBzdHJlYW1TYXZlci5jcmVhdGVXcml0ZVN0cmVhbShmaWxlTmFtZSk7XG5cbiAgICAvLyBhYm9ydCBzbyBpdCBkb3NlIG5vdCBsb29rIHN0dWNrXG4gICAgd2luZG93Lm9udW5sb2FkID0gKCkgPT4ge1xuICAgICAgICBmaWxlU3RyZWFtLmFib3J0KCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGV2dCA9PiB7XG4gICAgICAgIGlmICghZG9uZSkge1xuICAgICAgICAgICAgZXZ0LnJldHVyblZhbHVlID0gYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsZWF2ZT9gO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdURSc6ICd0cmFpbGVycycsXG4gICAgICAgICAgICAnc3RhcnRUaW1lJzogU3RyaW5nKHBlcmZvcm1hbmNlLm5vdygpKSxcbiAgICAgICAgICAgICdzdGFydGVkX2F0JzogU3RyaW5nKE1hdGguZmxvb3IoRGF0ZS5ub3coKSAtIHBlcmZvcm1hbmNlLm5vdygpKSksXG4gICAgICAgICAgICAnY2FjaGUtY29udHJvbCc6ICduby1jYWNoZSwgbm8tc3RvcmUsIG1heC1hZ2U9MSwgcy1tYXhhZ2U9MSdcbiAgICAgICAgfVxuICAgIH0pXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XG5cbiAgICAgICAgICAgIGlmICghcmVzLmJvZHkgfHwgIXJlcy5vaylcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKHJlcy5zdGF0dXNUZXh0KSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzLmJvZHkucGlwZVRvKGZpbGVTdHJlYW0pO1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgcGVyZm9ybWFuY2UubWFyaygnZG93bmxvYWQ6dGVhcl9kb3duJyk7XG4gICAgICAgICAgICByZXF1ZXN0SWRsZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xufVxuIiwgImltcG9ydCB7IGRvd25sb2FkIH0gZnJvbSBcIi4vZG93bmxvYWRcIjtcbmltcG9ydCBQYXBhIGZyb20gJ3BhcGFwYXJzZSdcbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBhcGFYSFIodXJsOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcsIGNiOiBGdW5jdGlvbikge1xuXG4gICAgcGVyZm9ybWFuY2UubWFyaygnWEhSOnN0YXJ0Jyk7XG4gICAgbGV0IHRpbWVyT3BlbiA9IHRydWUsIHNlcGFyYXRvciA9ICdbJywgc3RyaW5naWZpZWQgPSAnJztcbiAgICBQYXBhLnBhcnNlKHVybCwge1xuICAgICAgICBkb3dubG9hZDogdHJ1ZSxcbiAgICAgICAgY2h1bmtTaXplOiA3ICogMTAyNCAqIDEwMjQsXG4gICAgICAgIGJlZm9yZUZpcnN0Q2h1bms6IChjaHVuaykgPT4ge1xuICAgICAgICAgICAgcGVyZm9ybWFuY2UubWFyaygnWEhSOmZpbmlzaCcpO1xuICAgICAgICAgICAgcmV0dXJuIGNodW5rO1xuICAgICAgICB9LFxuICAgICAgICBzdGVwOiAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAvL3BhcnNlZC5wdXNoKHJlc3VsdC5kYXRhKVxuICAgICAgICAgICAgc3RyaW5naWZpZWQgKz0gc2VwYXJhdG9yICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgc2VwYXJhdG9yID0gJywnO1xuICAgICAgICAgICAgaWYgKHRpbWVyT3Blbikge1xuICAgICAgICAgICAgICAgIHRpbWVyT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHBlcmZvcm1hbmNlLm1hcmsoJ1BhcnNlOnN0YXJ0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgIHBlcmZvcm1hbmNlLm1lYXN1cmUoJ1BhcnNlOmVuZCcsICdQYXJzZTpzdGFydCcpO1xuICAgICAgICAgICAgc3RyaW5naWZpZWQgKz0gJ10nO1xuICAgICAgICAgICAgY29uc3QgYmxvYlVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW3N0cmluZ2lmaWVkXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vanNvbicgfSkpO1xuICAgICAgICAgICAgZG93bmxvYWQoYmxvYlVybCwgJ3hoci5qc29uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoYmxvYlVybCk7XG4gICAgICAgICAgICAgICAgc3RyaW5naWZpZWQgPSAnJztcbiAgICAgICAgICAgICAgICBwZXJmb3JtYW5jZS5tYXJrKCdkb3dubG9hZDp0ZWFyX2Rvd24nKTtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHBhcGFTdHJpbmcodXJsOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcsIGNiID0gRnVuY3Rpb24pIHtcbiAgICBwZXJmb3JtYW5jZS5tYXJrKCdmZXRjaDpzdGFydCcpO1xuICAgIGZldGNoKHVybCkudGhlbihyZXMgPT4ge1xuXG4gICAgICAgIHJldHVybiByZXMudGV4dCgpO1xuICAgIH0pLnRoZW4oY3N2U3RyaW5nID0+IHtcbiAgICAgICAgcGVyZm9ybWFuY2UubWFyaygnZmV0Y2g6ZmluaXNoJyk7XG5cbiAgICAgICAgY29uc3QgYmxvYlVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW1BhcGEucGFyc2UoY3N2U3RyaW5nKS5kYXRhXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vanNvbicgfSkpO1xuICAgICAgICBkb3dubG9hZChibG9iVXJsLCAncGFwYV9zdHJpbmcuanNvbicsICgpID0+IHtcbiAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoYmxvYlVybCk7XG5cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBwYXBhRmlsZSh1cmw6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZywgY2IgPSBGdW5jdGlvbikge1xuICAgIHBlcmZvcm1hbmNlLm1hcmsoJ2ZldGNoOnN0YXJ0Jyk7XG4gICAgZmV0Y2godXJsKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHJldHVybiByZXMuYmxvYigpO1xuICAgIH0pLnRoZW4oYmxvYiA9PiB7XG4gICAgICAgIHBlcmZvcm1hbmNlLm1hcmsoJ2ZldGNoOmZpbmlzaCcpO1xuICAgICAgICB2YXIgZmlsZSA9IG5ldyBGaWxlKFtibG9iXSwgXCJwYXBhX2Nzdi5jc3ZcIiwgeyB0eXBlOiBcInRleHQvY3N2XCIsIGxhc3RNb2RpZmllZDogbmV3IERhdGUoKS5nZXRUaW1lKCkgfSk7XG4gICAgICAgIHBlcmZvcm1hbmNlLm1hcmsoJ1BhcnNlOnN0YXJ0Jyk7XG4gICAgICAgIFBhcGEucGFyc2UoZmlsZSwge1xuICAgICAgICAgICAgY29tcGxldGU6IChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBwZXJmb3JtYW5jZS5tZWFzdXJlKCdQYXJzZTplbmQnLCAnUGFyc2U6c3RhcnQnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9iVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkocmVzdWx0LmRhdGEpXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vanNvbicgfSkpO1xuICAgICAgICAgICAgICAgIGRvd25sb2FkKGJsb2JVcmwsICdwYXBhRmlsZS5qc29uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVcmwpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICB9KTtcbn1cbiIsICIvLy8gPHJlZmVyZW5jZSBsaWI9XCJkb21cIiAvPlxuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJzdHJlYW1zYXZlclwiIC8+XG5cbmltcG9ydCB7IHdlYnNvY2tldCB9IGZyb20gJy4vYmVuY2gvd2Vic29ja2V0J1xuaW1wb3J0IHsgaW5pdE9ic2VydmVycyB9IGZyb20gJy4vYmVuY2gvb2JzZXJ2ZXJzJ1xuaW1wb3J0IHsgcGFwYVhIUiB9IGZyb20gJy4vYmVuY2gvcGFwYVhIUidcbmltcG9ydCB7IGRvd25sb2FkIH0gZnJvbSAnLi9iZW5jaC9kb3dubG9hZCdcbmltcG9ydCB0eXBlIHsgVGJyaWVmRW50cnkgfSBmcm9tICcuL2JlbmNoL29ic2VydmVycydcblxuXG5cbmV4cG9ydCBsZXQgZW50cmllcyA9IFtdIGFzIFRicmllZkVudHJ5W11cblxuY29uc3QgeyBwbywgcm8sIGxpc3RFbnRyaWVzIH0gPSBpbml0T2JzZXJ2ZXJzKGVudHJpZXMpXG5cbmdsb2JhbFRoaXMuY29ubmVjdCA9IChjYikgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLm9yaWdpbilcbiAgICB1cmwucHJvdG9jb2wgPSAnd3NzJ1xuICAgIHVybC5wYXRobmFtZSA9IFwiL2Nzdi93c1wiXG4gICAgZ2xvYmFsVGhpcy53cyA9IHdlYnNvY2tldCh1cmwsIGVudHJpZXMsIGNiKVxufVxuXG5cblxuXG5nbG9iYWxUaGlzLmNvbm5lY3QoKCkgPT4ge1xuICAgIHBvLm9ic2VydmUoeyBlbnRyeVR5cGVzOiBbJ21hcmsnLCAnbWVhc3VyZSddIH0pO1xuICAgIHJvLm9ic2VydmUoeyBlbnRyeVR5cGVzOiBbJ3Jlc291cmNlJ10gfSlcblxuICAgIHJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICAvL3BhcGFYSFIoXCIvY3N2L3Jhdy5qc29uXCIsICdyYXcuanNvbicsICgpID0+IHsgbGlzdEVudHJpZXMoKSB9KVxuICAgICAgICAvL3BhcGFTdHJpbmcoXCJodHRwOi8vbG9jYWxob3N0Ojg3ODcvY3N2L3Jhdy5qc29uXCIpXG4gICAgICAgIC8vcGFwYUZpbGUoXCJodHRwOi8vbG9jYWxob3N0Ojg3ODcvY3N2L3Jhdy5qc29uXCIpXG4gICAgICAgIGxldCBmaWxlbmFtZSA9IGxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKSB8fCAnZmV0Y2guanNvbidcbiAgICAgICAgY29uc29sZS5sb2coZmlsZW5hbWUpXG4gICAgICAgIGRvd25sb2FkKGAvY3N2LyR7ZmlsZW5hbWV9YCwgZmlsZW5hbWUsICgpID0+IHsgbGlzdEVudHJpZXMoKSB9KVxuICAgICAgICAvL2Rvd25sb2FkKCcvY3N2L3RyYW5zZm9ybS5qc29uJywgJ3RyYW5zZm9ybS5qc29uJywgKCkgPT4geyBsaXN0RW50cmllcygpIH0pXG4gICAgICAgIC8vZG93bmxvYWQoJy9jc3YvZmV0Y2guanNvbicsICdmZXRjaC5qc29uJywgKCkgPT4geyBsaXN0RW50cmllcygpIH0pXG5cbiAgICB9KTtcblxufSlcblxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUMsSUFBQyxFQUFDLEdBQU0sTUFBZTtBQUN0QixhQUFPLE1BQVcsY0FDZCxHQUFPLFVBQVUsTUFDakIsT0FBTyxVQUFXLGNBQWMsT0FBTyxPQUFPLE9BQVEsV0FDcEQsT0FBTyxLQUNQLEdBQUssS0FBUTtBQUFBLE9BQ2xCLGVBQWUsTUFBTTtBQUN0QjtBQUVBLFVBQU0sSUFBUyxPQUFPLFVBQVcsV0FBVyxTQUFTO0FBQ3JELE1BQUssRUFBTyxlQUFhLFFBQVEsS0FBSztBQUV0QyxVQUFJLElBQWtCLE1BQ2xCLElBQXVCLElBQ3JCLElBQU8sT0FBTTtBQUFFLFlBQUk7QUFBRTtBQUFBLGlCQUFjLEdBQVA7QUFBQTtBQUFBLFNBQzVCLElBQVcsRUFBTyxzQkFBc0IsSUFDeEMsSUFBa0IsRUFBTyxpQkFFM0IsSUFBa0IsZUFBZSxLQUFLLEVBQU8sZ0JBQWdCLENBQUMsQ0FBQyxFQUFPLFVBQVUsQ0FBQyxDQUFDLEVBQU8sYUFDdkYsSUFBbUIsS0FBbUIsbUJBQW1CLFNBQVMsZ0JBQWdCLFFBQ3BGLFdBQ0EsWUFFRSxJQUFjO0FBQUEsUUFDbEI7QUFBQSxRQUNBLGdCQUFnQixFQUFPLGtCQUFrQixFQUFTO0FBQUEsUUFDbEQsV0FBVztBQUFBLFFBQ1gsU0FBUyxFQUFFLE1BQU0sU0FBUyxPQUFPLEdBQUcsT0FBTyxHQUFHLEtBQUs7QUFBQSxRQUNuRCxNQUFNO0FBQUE7QUFTUixpQkFBcUIsR0FBSztBQUN4QixZQUFJLENBQUM7QUFBSyxnQkFBTSxJQUFJLE1BQU07QUFDMUIsWUFBTSxJQUFTLFNBQVMsY0FB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
