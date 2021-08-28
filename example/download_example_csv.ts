
import { StreamingCSVParser } from '../src';
export type TCellType = (string | number | Date | null | undefined)
export type TRowType = TCellType[] | { [s: string]: TCellType };

function computeRequestToCMF(cmfUrl: URL): Request {
    let year = cmfUrl.searchParams.get('year'),
        month = cmfUrl.searchParams.get('month'),
        cartera = cmfUrl.searchParams.get('cartera'),
        cacheKey = `${cartera}${year}${month}`;


    month = String(month).padStart(2, "0");
    console.log('downloadHugeTXT', { month, year, cartera });


    return new Request(cmfUrl.toString(), {
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml",
            "accept-language": "en,es-CL;q=0.9,es-419;q=0.8,es;q=0.7,it;q=0.6,fr;q=0.5",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
        },

        body: String(cmfUrl.searchParams.toString() || ''),
        redirect: 'manual',
        method: "POST",
    });
}
export function zipObject<K extends string, T extends unknown>(keys: K[], values: T[]): Record<K, T> {
    return keys.reduce((acc, key, idx) => {
        if (key) {
            acc[key] = values[idx];
        }
        return acc;
    }, {} as Record<K, T>);
}

export const CFMColumns = ['run_fondo',
    'nombre_fondo',
    'ffm_6010100',
    'ffm_6010211',
    'ffm_6010212',
    'ffm_6010300',
    'ffm_6010400',
    'ffm_6010500',
    'ffm_6010600',
    'ffm_6010700',
    'ffm_6010800',
    'ffm_6010900',
    'ffm_6011000',
    'ffm_tir_6011111',
    'ffm_par_6011111',
    'ffm_rel_6011111',
    'ffm_6011112',
    'ffm_6011113',
    'ffm_6011114',
    'ffm_6011200',
    'ffm_6011300',
    'ffm_6011400',
    'ffm_6011511',
    'ffm_6011512',
    'ffm_6011513'];



export async function downloadNewestCSVFile(cmfUrl: URL, nocache = false): Promise<Response> {
    let year = cmfUrl.searchParams.get('aa'),
        month = cmfUrl.searchParams.get('mm'),
        cartera = cmfUrl.searchParams.get('cartera')


    month = String(month).padStart(2, "0")

    const response1 = await fetch(computeRequestToCMF(cmfUrl));
    //console.log({ headers: [...response1.headers.entries()] })
    let response2 = new StreamingCSVParser({ delimiter: ';', from_line: 2, columns: CFMColumns })
        .on('end', function () {
            console.log('parser end');
        })

        .transform(response1)

    return response2

}