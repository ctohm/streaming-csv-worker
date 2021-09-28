import parse from 'csv-parse/lib/browser';

class ParserPlus extends parse.Parser {
    promisedWrite2(chunk: string | Buffer | Uint8Array | undefined): Promise<void> {
        return new Promise<void>((resolve, reject): void => {
            this.write(chunk, (error: Error | null | undefined): void => {
                return (error ? reject(error) : resolve()) as void;
            });
        });
    };
}

export type TCellType = (string | number | Date | null | undefined)
export interface TObjectRow {
    [s: string]: TCellType
}
export type TRowType = TCellType[] | TObjectRow | Record<string, TCellType> | Iterable<unknown>

export class StreamingCSVParser<T extends TRowType = TRowType> {
    parser: parse.Parser & { promisedWrite: (chunk: string | Buffer | Uint8Array | undefined) => Promise<void> };;
    readable: ReadableStream<any>;
    writable: WritableStream<any>;
    separator = '[';
    parsedArray = [] as T[];
    constructor(options: parse.Options) {
        const parser = parse(options) as parse.Parser & { promisedWrite: (chunk: string | Buffer | Uint8Array | undefined) => Promise<void> };
        parser.promisedWrite = (chunk: string | Buffer | Uint8Array | undefined): Promise<void> => {
            return new Promise<void>((resolve, reject): void => {
                parser.write(chunk, (error: Error | null | undefined): void => {
                    return (error ? reject(error) : resolve()) as void;
                });
            });
        };



        this.parser = parser;

        let { readable, writable } = new TransformStream();
        this.readable = readable;
        this.writable = writable;
        this.parser.on('error', function (err: Error) {
            console.error(err.message);
        });
    }
    on(event: string, cb: { (...args: any[]): void; }): this {
        this.parser.on(event, cb);
        return this;
    }
    async fromRequest(req: Request): Promise<Response> {
        let res = await fetch(req);
        return this.transform(res);
    }
    async parse(res: Response): Promise<T[]> {
        if (!res || !res.body) {
            return Promise.resolve(this.parsedArray);
        }
        const reader = res.body.getReader(), parser = this.parser;

        parser.on('readable', (record: T) => {
            while (record = parser.read() as T) {
                this.parsedArray.push(record);
            }
        });
        await new Promise((resolve, reject) => {
            reader.read().then(
                function processText({ done, value: value_1 }): Promise<void> {
                    if (done) {
                        parser.end();
                        return Promise.resolve(resolve(null));
                    }
                    return parser.promisedWrite(value_1).then(() => {
                        return reader.read().then(processText);
                    });
                });
        });
        return this.parsedArray;
    }
    transform(res: Response): Response {
        if (!res || !res.body) {
            return res;
        }
        let encoder = new TextEncoder(), decoder = new TextDecoder();
        let { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
        const writer = writable.getWriter(), reader = res.body.getReader(), parser = this.parser;

        parser.on('readable', (record: T) => {
            while (record = parser.read()) {
                let chukifiedRecord = encoder.encode(this.separator + JSON.stringify(record));
                // console.log('write to getWriter', chukifiedRecord)
                writer.write(chukifiedRecord);
                this.separator = ',';
            }
        });

        reader.read().then(
            function processText({ done, value }): Promise<null> {
                if (done) {
                    writer.write(encoder.encode(']'));
                    parser.end();
                    writer.close();
                    return Promise.resolve(null);
                }
                return parser.promisedWrite(value).then(() => {
                    //console.log('promisedWrite to parser')
                    return reader.read().then(processText);
                }).catch((err: unknown) => {
                    console.error(err);
                    return reader.read().then(processText);
                });
            });

        return new Response(
            readable, {
            headers: { 'content-type': 'application/json;charset=UTF-8' }
        });
    }
}
