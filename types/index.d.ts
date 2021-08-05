import parse from 'csv-parse/lib/browser';
export declare class StreamingCSVParser<T extends TRowType = TRowType> {
    parser: parse.Parser;
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
declare type TRowType = (string | number | Date | null | undefined)[];
export {};
//# sourceMappingURL=index.d.ts.map