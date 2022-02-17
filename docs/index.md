---
home: true
name: 'Streaming CSV Workers'
heroImage: banner.svg
tagline: 'Zero Copy, Fast & Scalable conversion from CSV to JSON'
projectWebsite: https://github.com/ctohm/streaming-csv-worker
actionText: How does it work?
actionLink: the_edge_alternative

---

**The Problem** (or the challenge, if you want) is converting a *remote and potentially huge* CSV/DSV to JSON, efficiently, unobtrusively, and with scaling in mind. Eventually it boils down to implementing sequential reading and parsing, without storing it in memory, and streaming the response as its being transformed, without buffering. In the real world, as long as it can handle huge sources, most impromptu implementations are willing to compromise in speed and storage efficiency, and just get the job done and call it a day.


This library is an adapter that enables pumping a web stream to either [PapaParse](https://www.papaparse.com/docs#remote-files) or [CSV Parse](https://csv.js.org/parse/distributions/browser_esm/) parsing engines and, by leveraging Cloudflare Workers unique features, it's able  to perform **zero-copy, nearly-instant conversion**, achieving the shortest [Time to First Byte](https://developer.mozilla.org/en-US/docs/Glossary/time_to_first_byte) possible, over sources of **potentially unlimited size**, without depending on CORS or range requests availability.
