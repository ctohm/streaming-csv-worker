/// <reference types="node" />
import parse from 'csv-parse/lib/browser';
export declare type TCellType = (string | number | Date | null | undefined);
export interface TObjectRow {
    [s: string]: TCellType;
}
export declare type TRowType = TCellType[] | TObjectRow | Record<string, TCellType> | Iterable<unknown>;
export declare class StreamingCSVParser<T extends TRowType = TRowType> {
    parser: parse.Parser & {
        promisedWrite: (chunk: string | Buffer | Uint8Array | undefined) => Promise<void>;
    };
    readable: ReadableStream<any>;
    writable: WritableStream<any>;
    separator: string;
    parsedArray: T[];
    constructor(options: parse.Options);
    on(event: string, cb: {
        (...args: any[]): void;
    }): this;
    fromRequest(req: Request): Promise<Response>;
    parse(res: Response): Promise<T[]>;
    transform(res: Response): Response;
}
//# sourceMappingURL=index.d.ts.map