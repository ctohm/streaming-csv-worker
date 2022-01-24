

import { ParseConfig, ParseResult } from 'papaparse'
declare module 'papaparse' {
    namespace Papa {
        export class ParserHandle {
            paused: () => boolean
            aborted: () => boolean
            parse: (partialLine: string, currentIndex: number, ignoreLastRow: boolean) => ParseResult<unknown>
            constructor(config: PapaConfig)
        }
    }
    export class ParserHandle {
        streamer: unknown
        paused: () => boolean
        aborted: () => boolean
        parse: (partialLine: string, currentIndex: number, ignoreLastRow: boolean) => ParseResult<unknown>
        constructor(config: PapaConfig)
    }
    export interface ParseMeta {
        paused: boolean
    }
    export interface PapaConfig<T = any> extends Omit<ParseConfig<T>, 'transform' | 'withCredentials' | 'chunkSize'> {
        chunkSize?: number | undefined | null; // default: undefined
        /**
            * If defined and the download property is true,
            * a POST request will be made instead of a GET request and the passed argument will be set as the body of the request.
            * @default undefined
            */
        chunk?: { (result: ParseResult<T>): void };
        download: true,
        downloadRequestBody?: boolean | undefined;
        downloadRequestHeaders?: { [headerName: string]: string; } | undefined;
        transform?: boolean | { (...args: any[]): unknown }
        withCredentials: 'same-origin' | 'omit' | 'include'
        dynamicTypingFunction?: boolean | { [headerName: string]: boolean;[columnNumber: number]: boolean; } | ((field: string | number) => boolean)

    }


}