---
home: true
name: 'Streaming CSV Worker'
heroImage: https://resizer.pictures/images/repo_title.svg
tagline: 'Another excuse to harness Cloudflare Workers'

projectWebsite: https://github.com/ctohm/streaming-csv-worker

---


By combining [CSV Parse](https://csv.js.org/parse/distributions/browser_esm/)'s robustness and [HTMLRewriter](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter)'s versatility, this worker is able to perform zero-copy streaming from a `text/csv` origin to a proper `application/json` response.

This approach doesn't aim to be the fastest CSV parser around, but instead the implementation that yields the smallest TTFB

Papaparse Step Large Sample: 5666.211181640625 ms

Papaparse Full Medium Sample: 1703.91796875 ms
Papaparse Full Large: 6207.716064453125 ms
