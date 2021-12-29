/// <reference lib="dom" />
/// <reference types="streamsaver" />

import { websocket } from './bench/websocket'
import { initObservers } from './bench/observers'
import { papaXHR } from './bench/papaXHR'
import { download } from './bench/download'
import type { TbriefEntry } from './bench/observers'



export let entries = [] as TbriefEntry[]

const { po, ro, listEntries } = initObservers(entries)
const url = new URL(window.location.origin)
url.protocol = 'wss'
url.pathname = "/csv/ws"
globalThis.ws = websocket(url, entries)




po.observe({ entryTypes: ['mark', 'measure'] });
ro.observe({ entryTypes: ['resource'] })

requestIdleCallback(() => {
    //papaXHR("/csv/raw.json", 'raw.json', () => { listEntries() })
    //papaString("http://localhost:8787/csv/raw.json")
    //papaFile("http://localhost:8787/csv/raw.json")

    download('/csv/csvparse.json', 'csvparse.json', () => { listEntries() })
    //download('/csv/transform.json', 'transform.json', () => { listEntries() })
    //download('/csv/fetch.json', 'fetch.json', () => { listEntries() })

});