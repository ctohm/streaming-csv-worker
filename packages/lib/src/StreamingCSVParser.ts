import parse from 'csv-parse/lib/browser';
import type { Buffer } from 'worktop/buffer';

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
class ParserPlus<T extends TRowType> extends parse.Parser {
    controller!: TransformStreamDefaultController
    onRecord?: (record: T) => void
    constructor(options: TParserExtendedOptions<T>) {
        super(options)
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
    parser: ParserPlus<T>
    writable!: WritableStream<Uint8Array>;
    readable!: ReadableStream<Uint8Array>;
    responseHeaders?: Headers
    constructor(options: TParserExtendedOptions) {
        let separator = '',
            finalChar = '',
            streamIsClosed = false

        const parser = new ParserPlus<T>(options)
        const textencoder = new TextEncoder(),
            textdecoder = new TextDecoder(),

            transformContent = {

                start(controller: TransformStreamDefaultController): void {
                    parser.controller = controller
                    this.parser = parser
                    this.tacha = 'pendeja'
                    controller.enqueue(textencoder.encode('['))

                },


                async transform(chunk: Uint8Array, controller: TransformStreamDefaultController): Promise<void> {
                    chunk = await chunk

                    switch (typeof chunk) {
                        case 'object':
                            // just say the stream is done I guess
                            if (chunk === null) controller.terminate()
                            parser.write(textdecoder.decode(chunk))

                            break
                        default:
                            controller.enqueue(textencoder.encode(String(chunk)))
                            break
                    }
                },
                flush(controller: TransformStreamDefaultController): void {
                    streamIsClosed = true;

                    parser.end();
                    if (finalChar === '') {
                        finalChar = ']'
                        
                        controller.enqueue(textencoder.encode(finalChar))
                    }
                    if(options.complete) options.complete([])
                }, // required.

            }
        super({ ...transformContent })
        //this.parsedArray = [] as T[]

        this.parser = parser
        let onRecord = (record: T) => {
            if (!parser.controller || streamIsClosed) return
            parser.controller.enqueue(textencoder.encode(separator + JSON.stringify(record)))
            separator = ','
        }

        parser.on('data', onRecord)

        this.parser.on('error', function (err: Error) {
            console.error(err.message);
        });
    }
    parseChunk(chunk: string): void {

    }
    on(event: string, cb: { (...args: any[]): void; }): this {
       
            console.log('parser on:', event)
            this.parser.on(event, cb);
       
        return this;
    }

}
