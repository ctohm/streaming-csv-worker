import parse from 'csv-parse/lib/browser';
import type { Buffer, BufferEncoding } from 'worktop/buffer';
import { HeadersWithTimings } from '../src/HeadersWithTimings';
type ParserOptions = parse.Options


type TParserPlus = parse.Parser & {
    promisedWrite: (chunk: string | Buffer | Uint8Array | undefined) => Promise<void>;
};
type TCellType = (string | number | Date | null | undefined)
interface TObjectRow {
    [s: string]: TCellType
}
type TRowType = TCellType[] | TObjectRow | Record<string, TCellType> | Iterable<unknown>

type TParserExtendedOptions<T extends TRowType = TRowType> = parse.Options & {
    step?: { (record: T): void },
    complete?: { (results: T[]): void }
}
class ParserPlus<T> extends parse.Parser {
    controller!: TransformStreamDefaultController
    onRecord: (record: T) => void
    constructor(options: TParserExtendedOptions<T>) {
        super(options)
        //this.originalWrite = this.write
        this.write = this.promisedWrite as unknown as parse.Parser['write']

        this.onRecord = (record: T): void => {
            throw new Error('not implemented')
        }
    }


    promisedWrite(chunk: string | Buffer | Uint8Array | undefined): Promise<void> {
        return new Promise<void>((resolve, reject): void => {
            super.write(chunk, (error: Error | null | undefined): void => {
                return (error ? reject(error) : resolve()) as void;
            });
        });
    };
}

export class StreamingCSVParser<T extends TRowType = TRowType> extends TransformStream<Uint8Array, Uint8Array> {
    parsedArray: T[]
    parser: ParserPlus<T>
    responseHeaders?: HeadersWithTimings
    constructor(options: TParserExtendedOptions, extraHeaders?: Headers | HeadersInit) {
        let separator = '',
            finalChar = '',
            streamIsClosed = false

        const parser = new ParserPlus<T>(options)
        const textencoder = new TextEncoder(),
            textdecoder = new TextDecoder(),
            transformContent = {

                start(controller: TransformStreamDefaultController): void {
                    parser.controller = controller
                    controller.enqueue('[')

                },


                transform: async (chunk: Uint8Array, controller: TransformStreamDefaultController): Promise<void> => {
                    chunk = await chunk

                    switch (typeof chunk) {
                        case 'object':
                            // just say the stream is done I guess
                            if (!chunk) controller.terminate()

                            let chunkText = chunk ? textdecoder.decode(chunk) : textdecoder.decode(),
                                result = parser.promisedWrite(chunkText)

                            break
                        default:
                            controller.enqueue(textencoder.encode(String(chunk)))
                            break
                    }
                },
                flush(controller: TransformStreamDefaultController): void {
                    console.log('called flush')
                    streamIsClosed = true;
                    parser.end();

                    if (finalChar === '') {
                        finalChar = ']'
                        controller.enqueue(finalChar)
                    }
                }, // required.

            }
        super({ ...transformContent })
        this.parsedArray = [] as T[]
        if (extraHeaders) this.responseHeaders = HeadersWithTimings.createFrom(extraHeaders)

        parser.on('data', (record: T) => {
            if (!parser.controller) return

            parser.controller.enqueue(textencoder.encode(separator + JSON.stringify(record)))
            separator = ','
        })
        parser.on('readable', () => {
            if (separator === '' && this.responseHeaders) {
                this.responseHeaders.appendPartialTiming('source_csv.parser_readable')
            }
        })
        parser.on('finish', () => {
            console.log('event:finish')
        })
        parser.on('close', () => {
            console.log('event:close')
        })
        parser.on('end', () => {
            console.log('event:end')
        })
        this.parser = parser
        this.parser.on('error', function (err: Error) {
            console.error(err.message);
        });
        this.parser.on('close', () => {
            if (this.responseHeaders) {
                this.responseHeaders.appendPartialTiming('source_csv.close')
            } else {
                console.trace('NO responseHeaders')
            }
        })

        this.parser.on('end', () => {
            if (this.responseHeaders) {
                this.responseHeaders.appendPartialTiming('source_csv.end')
            } else {
                console.trace('NO responseHeaders')
            }
        })

    }
    on(event: string, cb: { (...args: any[]): void; }): this {
        if (event === 'record') {
            this.parser.onRecord = cb
        } else {
            this.parser.on(event, cb);
        }
        return this;
    }

    async stream(req: Request): Promise<Response> {

        const started_at = req.headers.get('started_at'),
            startTime = req.headers.get('startTime')
        this.responseHeaders = HeadersWithTimings.createFrom(this.responseHeaders || { startTime, started_at } as Record<string, string>)

        let res = await fetch(req);
        if (!res || !res.body) {
            return Promise.reject(new Error('invalid response ' + res.statusText));
        }


        this.responseHeaders.set('content-type', 'application/json;charset=UTF-8')

        res.body.pipeThrough(this)
        return new Response(this.readable, {
            headers: this.responseHeaders
        })
    }


    async parse(res: Response): Promise<T[]> {
        if (!res || !res.body) {
            return Promise.resolve(this.parsedArray);
        }
        this.parser.on('data', (record: T) => {
            this.parsedArray.push(record);
        })
        res.body.pipeThrough(this)
        return new Promise((resolve, reject) => {
            this.parser.on('end', (record: T) => {
                resolve(this.parsedArray)
            })


        });

    }
}
