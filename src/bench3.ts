/// <reference lib="dom" />
/// <reference types="streamsaver" />

import { websocket } from './bench/websocket'
import { initObservers } from './bench/observers'
import { papaXHR } from './bench/papaXHR'
import { download } from './bench/download'
import type { TbriefEntry } from './bench/observers'



export let entries = [] as TbriefEntry[]

const { po, ro, listEntries } = initObservers(entries)

globalThis.connect = (cb) => {
    const url = new URL(window.location.origin)
    url.protocol = 'wss'
    url.pathname = "/csv/ws"
    globalThis.ws = websocket(url, entries, cb)
}




globalThis.connect(() => {
    po.observe({ entryTypes: ['mark', 'measure'] });
    ro.observe({ entryTypes: ['resource'] })

    requestIdleCallback(() => {
        //papaXHR("/csv/raw.json", 'raw.json', () => { listEntries() })
        //papaString("http://localhost:8787/csv/raw.json")
        //papaFile("http://localhost:8787/csv/raw.json")
        let filename = location.hash.replace('#', '') || 'fetch.json'
        if (filename.includes('xhr')) {
            papaXHR("/csv/raw.json", 'raw.json', () => { listEntries() })
        } else {
            console.log(filename)
            download(`/csv/${filename}`, filename, () => { listEntries() })
        }
        //download('/csv/transform.json', 'transform.json', () => { listEntries() })
        //download('/csv/fetch.json', 'fetch.json', () => { listEntries() })

    });

})

