---
home: true
name: 'Streaming CSV Workers'
heroImage: https://resizer.pictures/images/repo_title.svg
tagline: 'Another excuse to harness Cloudflare Workers'

projectWebsite: https://github.com/ctohm/streaming-csv-worker

---

### The Problem

Given a remote CSV (or DSV in general) source a.k.a. "the source"  which you need to convert to JSON, traditional approaches require you to download a copy of the source and save it to your storage (either browser's or server's) or just to a temporary variable. Conversion is performed reading from this local copy through mechanics that can handle large sources. 

### The Mechanics 

When conversion happens server side, you would use NodeJS Streams (e.g. as in [CSV-Parse API](https://csv.js.org/parse/api/stream/)) and, if this needs to happen in the browser, [Papa Parse API](https://www.papaparse.com/docs#remote-files) supports offloading conversion to a webworker and requesting the source in chunks, provider the webserver allows Range requests (and, of course, if CORS allow downloading the source, to start with).

### The Hypotesis

[Cloudflare Workers](https://developers.cloudflare.com/workers/) environment is ideal to implement a zero-copy mechanic (Like their [HTMLRewriter](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter) API) 
to transform the source's `Response` instance to an  `application/json` `Response` which can be streamed to the end user without actually awaiting it (like [TransformStream](https://developers.cloudflare.com/workers/learning/using-streams)).

Leveraging WhatWG streams
  

 isn't server-side nor browser-side. Its edge nature 

 a zero-copy transform mechanic able to 
  suits the idea of receiving the source's `Response` instance and transform   `text/csv` response and eventually output 


This library is meant to be used in Cloudflare Workers environment. It provides three implementations for  two adapters enabling zero-copy transforming a remote `text/csv` source to an `application/json` response.

This library doesn't have its own CSV Parser. Instead, it provides adapters to use with [PapaParse](https://www.papaparse.com/docs#remote-files) and [CSV Parse](https://csv.js.org/parse/distributions/browser_esm/).  **our aiming to minimize [TTFBs](https://developer.mozilla.org/en-US/docs/Glossary/time_to_first_byte)** while mantaining an overall performance close to the control case, which is using PapaParse with XHR on the browser.

Both adapters leverage Cloudflare Workers's [TransformStream](https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream), providing the magic needed to write the conversion output directly into the response, so we don't need to wait for the full origin response to perform parsing, nor stringifying it back into the final response. 

## Control Case

We'll use Papaparse in its remote file mode, providing a `step` callback, which will be invoked each time a row is parsed. We will measure the time spent between firing the PapaParse call and the first available row. And, since we're only interested in TTFB, we'll actually disregard appending the stringified result into the DOM, which would involve a potentially expensive repaint that would distort the results. 


```js
 return new Promise((resolve, reject) => {
        let timerOpen=true, parsed=[]
        console.time('Papaparse Complete');
            Papa.parse(req.url, {
                download: true,
                chunkSize:7*1024*1024,
                step:(result)=>{
                    parsed.push(result.data)
                    console.timeEnd('Papaparse Complete');
                    if(timerOpen) {
                        timerOpen=false;
                        resolve(result.data)
                    }

                },
                complete:(result)=>{
                }
            })
        })
    }

```

Please note the chunkSize has been raised to avoid PapaParse cutting the source in two chunks. Also, this PapaParse mode needs certain headers to be set on the `text/csv` response, for which we are proxying the real request through an example worker. 



## FetchPapaStreamer

PapaParse is fast, popular, battle tested, and full of features. Sadly, among the several streamers it offers, there are some that rely on NodeJS core modules and others on XMLHttpRequest, meaning only the StringStreamer is actually compatible with Cloudflare Workers. This streamer expects the full CSV content string passed as input, so this approach needs the response to be stored in memory and converted to text, stringifying the result and, only then, start sending the response.

To optimize PapaParse usage in Workers environment, a new Streamer class `FetchPapaStreamer`  was created, based in NetworkStreamer, but replacing XHR with fetch API. Also, while preserving 
