

type TinnerVars = { [s: string]: boolean | string | number }
class TableHandler {
  rewriterInstance: HTMLTableParser
  constructor(rewriterInstance: HTMLTableParser) {
    this.rewriterInstance = rewriterInstance
  }
  element(element: Element) {
    if (!this.rewriterInstance.isCapturing) {
      this.rewriterInstance.isCapturing = true;
    }

    element.removeAndKeepContent();
    element.before('</pre>|cut|[', { html: true });
    element.after(']|cut|<pre>', { html: true });
  }
}
class RowHandler {

  element(element: Element) {

    element.removeAndKeepContent();
    element.before('[');
    element.after('],');

  }
}
class CellHandler {

  element(element: Element) {
    element.removeAndKeepContent();
    element.before('"');
    element.after('",');

  }

}
class RemoverHandler {

  wrap = false;
  rewriterInstance: HTMLTableParser
  preserving = false
  constructor(rewriterInstance: HTMLTableParser, { wrap = false, preserving = false } = {}) {
    this.preserving = preserving
    this.wrap = wrap;
    this.rewriterInstance = rewriterInstance

  }
  element(element: Element) {
    if (this.preserving) {
      element.removeAndKeepContent();
    } else if (this.wrap) {
      element.prepend('<pre>', { html: true });
      element.append('</pre>', { html: true });
    } else {
      element.remove();

      console.log('RemoverHandler', { tagName: element.tagName })
    }


  }


}


export class HTMLTableParser {
  rewriterInstance: TinnerVars
  isCapturing = false
  tableSelectors: string[]
  rowSelectors: string[]
  cellSelectors: string[]
  alwaysRemove: string[]
  removePreserving: string[]
  constructor({
    tableSelectors = ['table'], rowSelectors = ['tr'], removePreserving = ['thead', 'tbody'], cellSelectors = ['td', 'th'], alwaysRemove = ['head']
  }: { tableSelectors?: string[], rowSelectors?: string[], cellSelectors?: string[], alwaysRemove?: string[], removePreserving?: string[] }) {
    this.tableSelectors = tableSelectors
    this.alwaysRemove = alwaysRemove
    this.removePreserving = removePreserving
    this.rowSelectors = rowSelectors
    this.cellSelectors = cellSelectors
    this.rewriterInstance = { isCapturing: false }

  }



  transform(res: Response): Response {
    let ctype = String(res.headers.get('content-type'))
    if (!ctype.includes('html')) {
      throw new Error(`Received a non-html content type: ${ctype}`)
    }
    console.log({ ctype })
    const rewriter1 = new HTMLRewriter()
      .on('body', new RemoverHandler(this, { wrap: true }))
    this.alwaysRemove.forEach(selector => {

      rewriter1.on(selector, new RemoverHandler(this))
    });
    this.removePreserving.forEach(selector => {

      rewriter1.on(selector, new RemoverHandler(this, { wrap: false, preserving: true }))
    });
    this.tableSelectors.forEach(selector => {

      rewriter1.on(selector, new TableHandler(this))
    });
    this.rowSelectors.forEach(selector => {

      rewriter1.on(selector, new RowHandler())
    });
    this.cellSelectors.forEach(selector => {

      rewriter1.on(selector, new CellHandler())
    });

    return new HTMLRewriter()
      .on('pre', new RemoverHandler(this))


      .transform((rewriter1.transform(res)));

  }
}

/*  https://www.uscfinvestments.com/site-template/assets/javascript/api_key.php
curl 'https://secure.alpsinc.com/MarketingAPI/api/v1/holding/USL' \
  -H 'Connection: keep-alive' \
  -H 'sec-ch-ua: "Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"' \
  -H 'Accept: application/json, text/javascript, , application/javascript' \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2Mjk0NDc5ODcsImp0aSI6IjU5N0YwODAxLTIyRjUtNDMyMS05RkJFLTkwNUQ0MjI1NThGNyIsImlzcyI6Ind3dy51c2NmaW52ZXN0bWVudHMuY29tIiwic3ViIjoiaHR0cHM6XC9cL2Nzc2VjdXJlLmFscHNpbmMuY29tXC9hcGlcL3YxXC8iLCJuYmYiOjE2Mjk0NDc5ODcsImV4cCI6MTYyOTUzNDM4N30.UdZa75P5EATd7y8lPBakA9KryWeOOC21xaOhqHGI5ocuyy8TBzODVznzjdnSeYl519p6sbOrZdVOxywchIUvng' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36' \
  -H 'Origin: https://www.uscfinvestments.com' \
  -H 'Sec-Fetch-Site: cross-site' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://www.uscfinvestments.com/' \
  -H 'Accept-Language: en,es-CL;q=0.9,es-419;q=0.8,es;q=0.7,it;q=0.6,fr;q=0.5,la;q=0.4' \
  --compressed
  */