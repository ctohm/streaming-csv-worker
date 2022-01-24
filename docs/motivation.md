# The Problem

When converting a *remote* CSV/DSV to JSON, the issue of performance and memory limits is tackled by different implementations of sequential or chunked processing

**Server side**, scalable conversion usually relies on Node.js streams. This means you need to download (therefore copy) the source beforehand.
Check [CSV-Parse](https://csv.js.org/parse/api/stream/) API docs to see an example of solving *The Problem* server-side.

**Browser side**, there's a plethora of libraries willing to take a string input. Instead, [Papa Parse](https://www.papaparse.com/docs#remote-files)'s browser-oriented solution takes the source's URL, and tackles size and performance offloading to a webworker, and retrieving the source in chunks of (at most) 5MB if the source supports Range requests. Of course it also needs CORS to be enabled, given it uses  XMLHttpRequest.



----

