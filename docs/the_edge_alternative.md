# The Edge Alternative

**The Problem** (or the challenge, if you want) is converting a *remote* CSV/DSV to JSON, efficiently, unobtrusively, quickly and with scaling in mind. Sure, if it wasn't *remote* then you could do it from CLI with zero delays nor space waste (no more than the storage it's already using).

Eventually, scaling boils down to the implementation of sequential access to the source, keeping just the current chunk in memory. At the same time, you'd want to send a response as ealy as possible to optimize perceived speed.

Enter [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API). They support sequential access to remote sources by design (`fetch`, you know). They can pipe to each other, allowing for a workflow in which fetching the source, transforming the contents and streaming the result to the visitor can be performed in a single step, without holding the source contents, at all. 

![concept](images/concept.png)

While not exclusive to [Cloudflare Workers](https://developers.cloudflare.com/workers/) environment, running the streams at the edge doesn't need CORS, doesn't depend on user's network latency, and it allows for the response to be consumed from anywhere that would take an URL: command line, browser side, server side, desktop apps, and more. 


Traditional server side conversion with native NodeJS streams is efficient and fast. Here's my opinionated comparison of their pros/cons.

but workers approach still trumps in terms of raw power, speed and simplicity. Check the benchmarks comparing NodeJS conversion vs Worker conversion when CSV-Parse if you are willing to deploy a full blown nodejs server and your client apps have a low latency link. 

This approach doesn't need a full blown node app, making it leaner and simpler than  much easier to deal with our conversion challenge without deploying a full blown node app. 

**Server side**, scalable conversion usually relies on Node.js streams. Check [CSV-Parse](https://csv.js.org/parse/api/stream/) to see a practical example. Basically, an app that needs to consume JSON will request fresh data through -say- and express microservice, which will in turn request the CSV source, pipe its response through a parser, and pipe the parser's output to the JSON response. Depending on the client, the response could be grabbed inmediately (http2) or will be the argument of a callback (https). Streams won't clog the server by storing contents in memory and, best case scenario, it will be able to stream the response almost in real time.  Streams piping to each other is an efficient concept, but is it unobtrusive? If you have a spare nodejs server, sure. If you mean to deploy to Vercel or Netlify, think again. Their serverless implementations (AWS Lambda, really) cannot stream. It will buffer instead (according to [Vercel Docs:Streaming Responses](https://vercel.com/docs/concepts/limits/overview#streaming-responses)).

Okay, maybe you don't have a nodejs server lying around. But you do have a browser, right? Fine. **Browser side**, most libraries expect a string input, and that means storing the CSV in memory and freezing until the end of time. *Most*, but [Papa Parse](https://www.papaparse.com/docs#remote-files)'s is on another level. It can take the remote CSV's url and download it for you though XMLHttpRequest...  (that kind of helps unobtrusivity). Papaparse can scale elegantly by requesting the contents in chunks of, at most, 5MB, and also by offloading to a webworker. It accepts handlers to deal with each chunk (or each row, if you prefer) which might allow to start receiving data as soon as the first row is parsed. However, the XMLHttpRequest will start "feeding" the parser only when it has fully grabbed the response contents so, really, it's only half unobstrusive. Anyway, we're still subject to browser constraits. Retrieval of the source CSV depends on the source enabling CORS, and doing it in chunks depends on Range requests support. 






Additionally, workers are able to stream responses in real time (see [TransformStream](https://developers.cloudflare.com/workers/learning/using-streams) example), which turns out is easier said than done, in a world of buffering. 


