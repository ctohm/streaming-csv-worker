
const IS_WORKER = false,
	IS_PAPA_WORKER = false
var workers = {}, workerIdCounter = 0;
import type { PapaConfig, ParseConfig, GuessableDelimiters, ParseResult, NODE_STREAM_INPUT_TYPE, ParseMeta, ParseError } from 'papaparse'
import { default as PapaDefault, ParserHandle, Parser } from 'papaparse'
import { FetchPapaStreamer, createEmptyResult } from './FetchPapaStreamer';
export { FetchPapaStreamer }
class MyEventEmitter {
	_events: Record<string, Function[]>
	constructor() {
		this._events = {};
	}

	on(name: string, listener: Function) {
		if (!this._events[name]) {
			this._events[name] = [];
		}

		this._events[name].push(listener);
	}

	removeListener(name: string, listenerToRemove: Function) {
		if (!this._events[name]) {
			return
		}

		const filterListeners = (listener) => listener !== listenerToRemove;

		this._events[name] = this._events[name].filter(filterListeners);
	}

	emit(name: string, data?: any) {
		//console.log({ emitting: name, handler: this._events[name] })
		if (!this._events[name]) {
			return
		}

		const fireCallbacks = (callback: Function) => {
			callback(data);
		};

		this._events[name].forEach(fireCallbacks);
	}
	clearListeners(): void {
		this._events = {}
	}
}
/**
 * Modified FetchStreamer, in which fetch and WhatWg streams replace XMLHttpRequest and its progress event
 */
export class TransformStreamer extends TransformStream<Uint8Array, Uint8Array> {

	decoder: TextDecoder;

	_config!: PapaConfig;
	_handle!: ParserHandle;
	_finished: boolean;
	_completed: boolean;
	_halted: boolean;
	_input!: string;
	_baseIndex: number;
	_partialLine: string;
	_rowCount: number;
	_start: number;
	isFirstChunk: boolean;
	_completeResults: { data: unknown[]; errors: ParseError[]; meta: ParseMeta; };

	pause: any;
	resume: any;
	emitter: MyEventEmitter

	constructor(config: Partial<PapaConfig> = {} as Partial<PapaConfig>) {
		let separator = '',
			finalChar = ''
		const textencoder = new TextEncoder(),
			textdecoder = new TextDecoder(),
			emitter = new MyEventEmitter(),
			transformContent = {
				start(controller: TransformStreamDefaultController): void {
					controller.enqueue('[')

				},


				transform: async (chunk: Uint8Array, controller: TransformStreamDefaultController): Promise<void> => {
					chunk = await chunk
					if (separator === '') emitter.emit('transform')
					switch (typeof chunk) {
						case 'object':
							// just say the stream is done I guess
							if (!chunk) controller.terminate()

							let chunkText = chunk ? textdecoder.decode(chunk) : textdecoder.decode(),
								result = this.parseChunk(chunkText),
								{ data = [] } = result



							data.forEach(row => {
								controller.enqueue(textencoder.encode(separator + JSON.stringify(row)))
								separator = ',';

							})
							if (this._completed || this._halted || this._finished) {
								finalChar = ']'
								controller.enqueue(finalChar)
								controller.terminate()
							}
							break
						default:
							controller.enqueue(textencoder.encode(String(chunk)))
							break
					}
				},
				flush(controller: TransformStreamDefaultController): void {

					emitter.emit('end')
					if (finalChar === '') {
						finalChar = ']'
						controller.enqueue(finalChar)
					}
				}, // required.

			}
		super({ ...transformContent })
		this.emitter = emitter


		var dynamicTyping = config.dynamicTyping || false;
		if (isFunction(dynamicTyping)) {
			config.dynamicTypingFunction = dynamicTyping;
			// Will be filled on first row call
			dynamicTyping = {};
		}
		config.dynamicTyping = dynamicTyping;

		config.transform = isFunction(config.transform) ? config.transform : false;

		this._finished = false;
		this._completed = false;
		this._halted = false;

		this._baseIndex = 0;
		this._partialLine = '';
		this._rowCount = 0;
		this._start = 0;

		this.isFirstChunk = true;



		this._completeResults = createEmptyResult()

		config.withCredentials = config.withCredentials || 'same-origin'
		this.decoder = new TextDecoder();
		this.replaceConfig({ chunkSize: Papa.RemoteChunkSize, ...config } as PapaConfig);
	}
	on(name: string, cb: Function): this {

		this.emitter.on(name, cb)
		return this
	}
	clearListeners(): this {
		this.emitter.clearListeners();
		return this
	}
	parseChunk(chunk: string): ParseResult<unknown> {
		//console.log({ chunkLength: chunk.length })
		// First chunk pre-processing
		if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk)) {
			var modifiedChunk = this._config.beforeFirstChunk(chunk);
			if (modifiedChunk !== undefined)
				chunk = modifiedChunk;
		}
		this.isFirstChunk = false;
		this._halted = false;

		// Rejoin the line we likely just split in two by chunking the file
		var aggregate = this._partialLine + chunk;
		this._partialLine = '';

		let results = this._handle.parse(aggregate, this._baseIndex, !this._finished);


		var lastIndex = results.meta.cursor;

		if (!this._finished) {
			this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
			this._baseIndex = lastIndex;
		}


		this._rowCount += ((results || {}).data || []).length;

		var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);

		if (isFunction(this._config.chunk)) {
			this._config.chunk(results);
			results = createEmptyResult()
			this._completeResults = createEmptyResult()
		}
		if (
			/**
			 * Store completeResults only is partial results arent already handled 
			 * by step o chunk functions
			 */
			!this._config.step && !this._config.chunk
			/**
			 * _completeResults object won't be used unless "complete" is a function
			 */
			&& isFunction(this._config.complete)) {
			//console.trace('config dstep')
			this._completeResults.data = this._completeResults.data.concat(results.data);
			this._completeResults.errors = this._completeResults.errors.concat(results.errors);
			this._completeResults.meta = results.meta;
		}

		if (!this._completed
			&& isFunction(this._config.complete)
			&& finishedIncludingPreview
			&& (!results
				|| !results.meta.aborted
			)) {
			this._config.complete(this._completeResults);
			this._completed = true;
		}



		return results;
	}
	async transform(res: Response, responseHeaders?: HeadersInit) {

		if (!res.ok || !res.body) {
			throw new Error("Couldn't obtain readable body")
		}

		res.body.pipeThrough(this)

		return new Response(
			this.readable, {
			headers: responseHeaders || { 'content-type': 'application/json' }
		});
	}

	async stream(_input: string | Request | Response): Promise<Response> {
		let res: Response
		if (_input instanceof Response) {
			res = _input.clone()
		} else if (_input instanceof Request) {
			//console.log('input is a request')
			res = await fetch(_input)
		} else {

			let body
			if (this._config.downloadRequestBody) body = JSON.stringify(this._config.downloadRequestBody)
			let req = new Request(_input, {
				method: this._config.downloadRequestBody ? 'POST' : 'GET',
				credentials: this._config.withCredentials,
				body
			})
			// Headers can only be set when once the request state is OPENED
			if (this._config.downloadRequestHeaders) {
				for (let headerName in this._config.downloadRequestHeaders) {
					req.headers.set(headerName, this._config.downloadRequestHeaders[headerName]);
				}
			}
			res = await fetch(req)
		}


		if (!res.ok || !res.body) {
			throw new Error(res.statusText)
		}
		res.body.pipeThrough(this)
		return new Response(this.readable, {
			headers: {
				'Content-Type': 'application/json',
				'cache-control': 'no-cache, no-store, s-maxage=1, max-age=1'
			}
		})

	}

	replaceConfig(config: PapaConfig) {
		// Deep-copy the config so we can edit it
		var configCopy = copy(config);
		configCopy.chunkSize = Number(configCopy.chunkSize);	// parseInt VERY important so we don't concatenate strings!
		if (!config.step && !config.chunk)
			configCopy.chunkSize = null;  // disable Range header if not streaming; bad values break IIS - see issue #196
		this._handle = new ParserHandle(configCopy);
		this._handle.streamer = this

		this._config = configCopy;	// persist the copy to the caller
	}

}



type ParentOrLocalParseConfig = PapaConfig | (PapaDefault.ParseConfig & {
	dynamicTypingFunction?: Function;
	transform?: false | {
		(value: string, field: string | number): any;
	};
});


function parse(
	_input: Request | Response,
	_config: ParentOrLocalParseConfig
): Promise<Response>
function parse(
	_input: string | File | NodeJS.ReadableStream,
	_config: ParentOrLocalParseConfig
): ParseResult<any> | Promise<ParseResult<any>> | Promise<Response>

function parse(
	_input: any,
	_config: ParentOrLocalParseConfig
): any {
	_config = _config || {};
	var dynamicTyping = _config.dynamicTyping || false;
	if (isFunction(dynamicTyping)) {
		_config.dynamicTypingFunction = dynamicTyping;
		// Will be filled on first row call
		dynamicTyping = {};
	}
	_config.dynamicTyping = dynamicTyping;
	//@ts-ignore
	_config.transform = isFunction(_config.transform) ? _config.transform : false;
	if (_input instanceof Request || _input instanceof Response) {
		return new TransformStreamer(_config as PapaConfig).stream(_input)
	} else if (
		typeof _input === 'string' && _config.download && !globalThis.XMLHttpRequest && globalThis.fetch
	) {
		return new FetchPapaStreamer(_config as PapaConfig).stream(_input)
	}
	return PapaDefault.parse(_input, _config as PapaDefault.ParseConfig)

}
var Papa = {

	RECORD_SEP: String.fromCharCode(30),
	UNIT_SEP: String.fromCharCode(31),
	BYTE_ORDER_MARK: '\ufeff',
	BAD_DELIMITERS: ['\r', '\n', '"', '\ufeff'],
	WORKERS_SUPPORTED: false,
	NODE_STREAM_INPUT: 0,

	// Configurable chunk sizes for local and remote files, respectively
	LocalChunkSize: 1024 * 1024 * 10,	// 10 M,
	RemoteChunkSize: 1024 * 1024 * 5,	// 5 M,
	DefaultDelimiter: ',',		// Used if not specified and detection fail,

	// Exposed for testing and development only
	Parser,
	// @ts-ignore
	ParserHandle,
	parse
}
/** Makes a deep copy of an array or object (mostly) */
function copy<T = unknown>(obj: T): T {
	if (typeof obj !== 'object' || obj === null)
		return obj;
	var cpy = (Array.isArray(obj) ? [] : {}) as T;
	for (let key in obj) {
		cpy[key] = copy(obj[key]);
	}
	return cpy;
}


function isFunction(func: unknown): func is Function {
	return typeof func === 'function';
}


export default Papa
