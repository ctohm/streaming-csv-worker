import parse from 'csv-parse/lib/browser';
import type { Buffer } from 'worktop/buffer';
declare type TCellType = (string | number | Date | null | undefined);
interface TObjectRow {
    [s: string]: TCellType;
}
declare type TRowType = TCellType[] | TObjectRow | Record<string, TCellType> | Iterable<unknown>;
declare type TParserExtendedOptions<T extends TRowType = TRowType> = parse.Options & {
    step?: {
        (record: T): void;
    };
    complete?: {
        (results: T[]): void;
    };
};
declare class ParserPlus<T extends TRowType> extends parse.Parser {
    controller: TransformStreamDefaultController;
    onRecord?: (record: T) => void;
    constructor(options: TParserExtendedOptions<T>);
    promisedWrite(chunk: string | Buffer | Uint8Array | undefined): Promise<void>;
}
export declare class StreamingCSVParser<T extends TRowType = TRowType> extends TransformStream<Uint8Array, Uint8Array> {
    parsedArray: T[];
    parser: ParserPlus<T>;
    responseHeaders?: Headers;
    constructor(options: TParserExtendedOptions, extraHeaders?: Headers | HeadersInit);
    on(event: string, cb: {
        (...args: any[]): void;
    }): this;
}
export {};
//# sourceMappingURL=StreamingCSVParser.d.ts.map