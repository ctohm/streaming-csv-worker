import parse from 'csv-parse/lib/browser';
import type { Buffer, BufferEncoding } from 'worktop/buffer';
type ParserOptions = parse.Options


type TParserPlus = parse.Parser & {
    promisedWrite: (chunk: string | Buffer | Uint8Array | undefined) => Promise<void>;
};
type TCellType = (string | number | Date | null | undefined)
interface TObjectRow {
    [s: string]: TCellType
}
type TRowType = TCellType[] | TObjectRow | Record<string, TCellType> | Iterable<unknown>

class ParserPlus extends parse.Parser {
    constructor(options: parse.Options) {
        super(options)
        //this.originalWrite = this.write
        this.write = this.promisedWrite as unknown as parse.Parser['write']

    }
    promisedWrite(chunk: string | Buffer | Uint8Array | undefined): Promise<void> {
        return new Promise<void>((resolve, reject): void => {
            super.write(chunk, (error: Error | null | undefined): void => {
                return (error ? reject(error) : resolve()) as void;
            });
        });
    };
}
export class StreamingCSVParser<T extends TRowType = TRowType> {
    parser: ParserPlus
    readable: ReadableStream<any>;
    writable: WritableStream<any>;

    separator = '[';
    parsedArray = [] as T[];
    extraHeaders: Headers
    constructor(options: ParserOptions, extraHeaders: { [s: string]: string }) {

        this.extraHeaders = new Headers()
        Object.entries(extraHeaders || {}).forEach(([key, value]) => {
            this.extraHeaders.set(key, String(value))
        })
        this.parser = new ParserPlus(options)

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

    process(res: Response,
        onRecord: { (record: T): void },
        onDone: { (): void } = () => {
            return
        },

    ): void {
        if (!res || !res.body) {
            return;
        }

        let streamIsClosed = false,
            reader = res.body.getReader(), parser = this.parser;


        parser.on('readable', (record: T) => {
            while (record = parser.read()) {
                if (streamIsClosed) break;
                onRecord(record)
            }
        });


        function processText(): Promise<void> {
            return reader.read()
                .then(({ done, value }: ReadableStreamDefaultReadResult<Uint8Array>): void | Promise<void> => {
                    if (done) {
                        streamIsClosed = true;
                        onDone()
                        parser.end();

                        return
                    }


                    //console.log('promisedWrite to parser')
                    return parser.promisedWrite(value).then(() => processText())
                }).catch((err: unknown) => {
                    console.error(err);
                    return processText()
                });
        }
        processText()

    }
    async parse(res: Response): Promise<T[]> {
        if (!res || !res.body) {
            return Promise.resolve(this.parsedArray);
        }
        return new Promise((resolve, reject) => {
            this.process(res, (record) => {
                this.parsedArray.push(record);
            }, () => {
                resolve(this.parsedArray)
            })
        });

    }
    transform(res: Response): Response {
        if (!res || !res.body) {
            return res;
        }
        let encoder = new TextEncoder()
        let { readable, writable } = new TransformStream<Uint8Array, Uint8Array>(),
            streamIsClosed = false
        const writer = writable.getWriter()

        this.process(res, (record) => {
            let chukifiedRecord = encoder.encode(this.separator + JSON.stringify(record));
            writer.write(chukifiedRecord);
            this.separator = ',';
        }, () => {
            writer.write(encoder.encode(']'));
            writer.close();

        })



        this.extraHeaders.set('content-type', 'application/json;charset=UTF-8')
        return new Response(
            readable, {
            headers: this.extraHeaders
        });
    }
}
