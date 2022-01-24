---
home: true
name: 'Streaming CSV Workers'
heroImage: banner.svg
tagline: 'Zero Copy, Fast & Scalable conversion from CSV to JSON'
projectWebsite: https://github.com/ctohm/streaming-csv-worker
actionText: How does it work?
actionLink: the_edge_alternative

---

Conversion to JSON from a remote CSV or DSV source whose size is unknown (and potentially huge) must implement some way of reading the source contents sequentially or in chunks. However, every environment specific optimization will at some point copy the source anyway, either to the local filesystem beforehand, or implicitly storing it in the responseText of an XHR call. 

By leveraging Cloudflare Workers unique features, this library is able to perform **zero-copy, nearly-instant conversion** over sources of **unlimited size**.