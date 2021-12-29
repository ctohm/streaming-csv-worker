import { download } from "./download";
import Papa from 'papaparse'
/**
 *
 * @param {string} url
 */
export async function papaXHR(url: string, fileName: string, cb: Function) {

    performance.mark('XHR:start');
    let timerOpen = true, separator = '[', stringified = '';
    Papa.parse(url, {
        download: true,
        chunkSize: 7 * 1024 * 1024,
        beforeFirstChunk: (chunk) => {
            performance.mark('XHR:finish');
            return chunk;
        },
        step: (result) => {
            //parsed.push(result.data)
            stringified += separator + JSON.stringify(result.data);
            separator = ',';
            if (timerOpen) {
                timerOpen = false;
                performance.mark('Parse:start');
            }

        },
        complete: () => {
            performance.measure('Parse:end', 'Parse:start');
            stringified += ']';
            const blobUrl = URL.createObjectURL(new Blob([stringified], { type: 'application/json' }));
            download(blobUrl, 'xhr.json', () => {
                URL.revokeObjectURL(blobUrl);
                stringified = '';
                performance.mark('download:tear_down');
                cb();
            });
        }
    });
}
function papaString(url: string, fileName: string, cb = Function) {
    performance.mark('fetch:start');
    fetch(url).then(res => {

        return res.text();
    }).then(csvString => {
        performance.mark('fetch:finish');

        const blobUrl = URL.createObjectURL(new Blob([Papa.parse(csvString).data], { type: 'application/json' }));
        download(blobUrl, 'papa_string.json', () => {
            URL.revokeObjectURL(blobUrl);

        });
    });
}
function papaFile(url: string, fileName: string, cb = Function) {
    performance.mark('fetch:start');
    fetch(url).then(res => {
        return res.blob();
    }).then(blob => {
        performance.mark('fetch:finish');
        var file = new File([blob], "papa_csv.csv", { type: "text/csv", lastModified: new Date().getTime() });
        performance.mark('Parse:start');
        Papa.parse(file, {
            complete: (result) => {
                performance.measure('Parse:end', 'Parse:start');
                const blobUrl = URL.createObjectURL(new Blob([JSON.stringify(result.data)], { type: 'application/json' }));
                download(blobUrl, 'papaFile.json', () => {
                    URL.revokeObjectURL(blobUrl);

                });
            }
        });


    });
}
