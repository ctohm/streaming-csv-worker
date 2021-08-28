"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingCSVParser = void 0;
const browser_1 = __importDefault(require("csv-parse/lib/browser"));
class StreamingCSVParser {
    constructor(options) {
        this.separator = '[';
        this.parsedArray = [];
        const parser = browser_1.default(options);
        parser.promisedWrite = (chunk) => {
            return new Promise((resolve, reject) => {
                parser.write(chunk, (error) => {
                    return (error ? reject(error) : resolve());
                });
            });
        };
        this.parser = parser;
        let { readable, writable } = new TransformStream();
        this.readable = readable;
        this.writable = writable;
        this.parser.on('error', function (err) {
            console.error(err.message);
        });
    }
    on(event, cb) {
        this.parser.on(event, cb);
        return this;
    }
    async fromRequest(req) {
        let res = await fetch(req);
        return this.transform(res);
    }
    async parse(res) {
        if (!res || !res.body) {
            return Promise.resolve(this.parsedArray);
        }
        const reader = res.body.getReader(), parser = this.parser;
        parser.on('readable', (record) => {
            while (record = parser.read()) {
                this.parsedArray.push(record);
            }
        });
        await new Promise((resolve, reject) => {
            reader.read().then(function processText({ done, value: value_1 }) {
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
    transform(res) {
        if (!res || !res.body) {
            return res;
        }
        let encoder = new TextEncoder(), decoder = new TextDecoder();
        let { readable, writable } = new TransformStream();
        const writer = writable.getWriter(), reader = res.body.getReader(), parser = this.parser;
        parser.on('readable', (record) => {
            while (record = parser.read()) {
                let chukifiedRecord = encoder.encode(this.separator + JSON.stringify(record));
                // console.log('write to getWriter', chukifiedRecord)
                writer.write(chukifiedRecord);
                this.separator = ',';
            }
        });
        reader.read().then(function processText({ done, value }) {
            if (done) {
                writer.write(encoder.encode(']'));
                parser.end();
                writer.close();
                return Promise.resolve(null);
            }
            return parser.promisedWrite(value).then(() => {
                //console.log('promisedWrite to parser')
                return reader.read().then(processText);
            }).catch(err => {
                console.error(err);
                return reader.read().then(processText);
            });
        });
        return new Response(readable, {
            headers: { 'content-type': 'application/json;charset=UTF-8' }
        });
    }
}
exports.StreamingCSVParser = StreamingCSVParser;
//# sourceMappingURL=StreamingCSVParser.js.map