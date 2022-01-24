import type { PapaConfig, ParseError, ParseMeta, ParseResult } from 'papaparse';
import { ParserHandle } from 'papaparse';
export declare function createEmptyResult(): ParseResult<unknown>;
/**
 * Modified FetchStreamer, in which fetch and WhatWg streams replace XMLHttpRequest and its progress event
 */
export declare class FetchPapaStreamer {
    abort(): void;
    parse(_input: any, baseIndex: any, ignoreLastRow: any): ParseResult<any>;
    getCharIndex(): any;
    decoder: TextDecoder;
    _config: PapaConfig;
    _handle: ParserHandle;
    _finished: boolean;
    _completed: boolean;
    _halted: boolean;
    _input: string;
    _baseIndex: number;
    _partialLine: string;
    _rowCount: number;
    _start: number;
    isFirstChunk: boolean;
    _completeResults: {
        data: unknown[];
        errors: ParseError[];
        meta: ParseMeta;
    };
    req: Request;
    pause: any;
    resume: any;
    reader: ReadableStreamDefaultReader<Uint8Array>;
    response: Response;
    constructor(config?: Partial<PapaConfig>);
    stream(_input: string | Request | Response): Promise<ParseResult<unknown>>;
    _readChunk(): Promise<ParseResult<unknown>>;
    _chunkLoaded({ done, value }: {
        done: boolean;
        value: Uint8Array | undefined;
    }): Promise<ParseResult<unknown>>;
    parseChunk(chunk: string): Promise<ParseResult<unknown>>;
    replaceConfig(config: PapaConfig): void;
}
//# sourceMappingURL=FetchPapaStreamer.d.ts.map