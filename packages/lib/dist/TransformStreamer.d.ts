/// <reference types="node" />
import type { PapaConfig, ParseError, ParseMeta, ParseResult } from 'papaparse';
import { default as PapaDefault, ParserHandle } from 'papaparse';
import { CSVStreamersEmitter } from './CSVStreamersEmitter';
import { FetchPapaStreamer } from './FetchPapaStreamer';
export { FetchPapaStreamer };
/**
 * Modified FetchStreamer, in which fetch and WhatWg streams replace XMLHttpRequest and its progress event
 */
export declare class TransformStreamer extends TransformStream<Uint8Array, Uint8Array> {
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
    pause: any;
    resume: any;
    emitter: CSVStreamersEmitter;
    constructor(config?: Partial<PapaConfig>);
    on(name: string, cb: Function): this;
    clearListeners(): this;
    parseChunk(chunk: string): ParseResult<unknown>;
    stream(_input: string | Request | Response): Promise<Response>;
    replaceConfig(config: PapaConfig): void;
}
declare type ParentOrLocalParseConfig = PapaConfig | (PapaDefault.ParseConfig & {
    dynamicTypingFunction?: Function;
    download: boolean;
    transform?: false | {
        (value: string, field: string | number): any;
    };
});
declare function parse(_input: Request | Response, _config: ParentOrLocalParseConfig): Promise<Response>;
declare function parse(_input: string | File | NodeJS.ReadableStream, _config: ParentOrLocalParseConfig): ParseResult<any> | Promise<ParseResult<any>> | Promise<Response>;
declare var Papa: {
    RECORD_SEP: string;
    UNIT_SEP: string;
    BYTE_ORDER_MARK: string;
    BAD_DELIMITERS: string[];
    WORKERS_SUPPORTED: boolean;
    NODE_STREAM_INPUT: number;
    LocalChunkSize: number;
    RemoteChunkSize: number;
    DefaultDelimiter: string;
    Parser: typeof PapaDefault.Parser;
    ParserHandle: typeof PapaDefault.ParserHandle;
    parse: typeof parse;
};
export default Papa;
//# sourceMappingURL=TransformStreamer.d.ts.map