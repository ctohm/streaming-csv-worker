# Streaming CSV Adapters

<center>
<img src="docs/banner.svg" style="width:400px;">
</center>

----

This projects contains two adapters that integrate seamlessly with CSV Parsing libraries (specifically,  [PapaParse](https://www.papaparse.com/docs#remote-files) and [CSV Parse](https://csv.js.org/parse/distributions/browser_esm/) and enable taking full advantage of Transformstreams support in Cloudflare Workers.

In short, adding these adapters and their respective parser library to a Worker route you get a real-time CSV to JSON conversion microservice, achieving zero copy and the lowest [Time to First Byte](https://developer.mozilla.org/en-US/docs/Glossary/time_to_first_byte) around.

Check [the documentation](https://csv.cf-badger.com) for instructions and benchmark results.