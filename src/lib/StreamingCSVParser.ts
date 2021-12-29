import parse from 'csv-parse/lib/browser';
import type { Buffer, BufferEncoding } from 'worktop/buffer';
import { HeadersWithTimings } from '../HeadersWithTimings';
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
    onRecord?: (record: T) => void
    constructor(options: TParserExtendedOptions<T>) {
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

export class StreamingCSVParser<T extends TRowType = TRowType> extends TransformStream<Uint8Array, Uint8Array> {
    parsedArray: T[]
    parser: ParserPlus<T>
    responseHeaders?: HeadersWithTimings
    constructor(options: TParserExtendedOptions, extraHeaders?: Headers | HeadersInit) {
        let separator = '',
            finalChar = '',
            streamIsClosed = false,
            responseHeaders: HeadersWithTimings | null = null
        if (extraHeaders) {
            responseHeaders = HeadersWithTimings.createFrom(extraHeaders)
        }

        const parser = new ParserPlus<T>(options)
        const textencoder = new TextEncoder(),
            textdecoder = new TextDecoder(),

            transformContent = {

                start(controller: TransformStreamDefaultController): void {
                    parser.controller = controller
                    console.log({ StreamingCSVParser: 'start' })
                    controller.enqueue('[')

                },


                transform: async (chunk: Uint8Array, controller: TransformStreamDefaultController): Promise<void> => {
                    chunk = await chunk

                    switch (typeof chunk) {
                        case 'object':
                            // just say the stream is done I guess
                            if (chunk === null) controller.terminate()
                            parser.promisedWrite(textdecoder.decode(chunk))

                            break
                        default:
                            controller.enqueue(textencoder.encode(String(chunk)))
                            break
                    }
                },
                flush(controller: TransformStreamDefaultController): void {
                    streamIsClosed = true;

                    parser.end();
                    if (responseHeaders) responseHeaders.appendPartialTiming('flush')
                    if (finalChar === '') {
                        finalChar = ']'
                        controller.enqueue(finalChar)
                    }
                }, // required.

            }
        super({ ...transformContent })
        this.parsedArray = [] as T[]

        this.parser = parser
        let onRecord = (record: T) => {
            if (!parser.controller || streamIsClosed) return
            if (separator !== ',') console.log({ locked: this.readable.locked })
            parser.controller.enqueue(textencoder.encode(separator + JSON.stringify(record)))
            separator = ','
        }
        /*parser.on('readable', (record: T) => {
            parser.onRecord = parser.onRecord || onRecord
            while (record = parser.read()) {
                parser.onRecord(record)
            }
        })*/
        parser.on('data', onRecord)

        this.parser.on('error', function (err: Error) {
            console.error(err.message);
        });
        if (responseHeaders) this.responseHeaders = responseHeaders
    }
    on(event: string, cb: { (...args: any[]): void; }): this {
        if (event === 'record') {
            console.log('parser onRecord', cb)
            this.parser.onRecord = cb
        } else {
            console.log('parser on:', event)
            this.parser.on(event, cb);
        }
        return this;
    }

    /* async stream(req: Request): Promise<Response> {
         console.log({ responseHeaders: this.responseHeaders })
         const started_at = req.headers.get('started_at'),
             startTime = req.headers.get('startTime')
         this.responseHeaders = HeadersWithTimings.createFrom(this.responseHeaders || { startTime, started_at } as Record<string, string>)
 
         let res = await fetch(req);
         if (!res || !res.body) {
             return Promise.reject(new Error('invalid response ' + res.statusText));
         }
 
         this.responseHeaders.appendPartialTiming('source_csv.ttfb')
 
         this.responseHeaders.set('content-type', 'application/json;charset=UTF-8')
         this.parser.on('end', () => {
             if (this.responseHeaders) {
                 this.responseHeaders.appendPartialTiming('source_csv.complete')
             } else {
                 console.trace('NO responseHeaders')
             }
         })
 
         res.body.pipeThrough(this)
         return new Response(this.readable, {
             headers: this.responseHeaders
         })
     }
 
 
     async parse(res: Response): Promise<T[]> {
         if (!res || !res.body) {
             return Promise.resolve(this.parsedArray);
         }
 
         console.time('StreamingCSVParser:parse')
         this.on('record', (record) => {
             console.log({ rowCount: this.parsedArray.length })
             this.parsedArray.push(record);
         })
         res.body.pipeTo(this.writable)
         return new Promise((resolve, reject) => {
             this.on('end', () => {
                 console.timeEnd('StreamingCSVParser:parse')
                 resolve(this.parsedArray)
             })
 
         });
 
     }*/
}
