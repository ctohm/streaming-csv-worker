
const IS_WORKER = false,
	IS_PAPA_WORKER = false
var workers = {}, workerIdCounter = 0;
import type { PapaConfig, ParseConfig, GuessableDelimiters, ParseResult, NODE_STREAM_INPUT_TYPE, ParseMeta, ParseError } from 'papaparse'
import { default as PapaDefault, ParserHandle, Parser } from 'papaparse'

export function createEmptyResult(): ParseResult<unknown> {
	return {
		data: [] as unknown[],
		errors: [] as ParseError[],
		meta: {} as ParseMeta,
	} as unknown as ParseResult<unknown>;
}


/**
 * Modified FetchStreamer, in which fetch and WhatWg streams replace XMLHttpRequest and its progress event
 */
export class FetchPapaStreamer {
	abort() {
		throw new Error('Method not implemented.');
	}
	parse(_input: any, baseIndex: any, ignoreLastRow: any): ParseResult<any> {
		throw new Error('Method not implemented.');
	}
	getCharIndex(): any {
		throw new Error('Method not implemented.');
	}
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
	req!: Request;
	pause: any;
	resume: any;
	reader!: ReadableStreamDefaultReader<Uint8Array>

	response!: Response;
	constructor(config: Partial<PapaConfig> = {} as Partial<PapaConfig>) {
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
	async stream(_input: string | Request | Response): Promise<ParseResult<unknown>> {
		let res: Response
		if (_input instanceof Response) {
			res = _input
		} else if (_input instanceof Request) {
			console.log('input is a request')
			res = await fetch(_input)
		} else {
			this._input = _input;
			let body
			if (this._config.downloadRequestBody) body = JSON.stringify(this._config.downloadRequestBody)
			let req = new Request(this._input, {
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
		//console.log(Object.fromEntries(res.headers))
		this.reader = res.body.getReader()
		return this._readChunk();	// Starts streaming


	}
	async _readChunk(): Promise<ParseResult<unknown>> {
		if (this._finished) {
			return this._chunkLoaded({ done: true, value: undefined });
		}
		return this.reader.read().then(
			({ done, value }: ReadableStreamReadResult<Uint8Array>) => {
				return this._chunkLoaded({ done, value });
			})

	}



	_chunkLoaded({ done, value }: { done: boolean, value: Uint8Array | undefined }): Promise<ParseResult<unknown>> {
		let chunkText = value ? this.decoder.decode(value) : this.decoder.decode()
		this._finished = done

		return this.parseChunk(chunkText);
	}
	async parseChunk(chunk: string): Promise<ParseResult<unknown>> {
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

		if (this._handle.paused() || this._handle.aborted()) {
			this._halted = true;
			console.log('_halted')
			this.reader.cancel()
			return results;
		}

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

		if (!this._config.step && !this._config.chunk) {
			//console.trace('config dstep')
			this._completeResults.data = this._completeResults.data.concat(results.data);
			this._completeResults.errors = this._completeResults.errors.concat(results.errors);
			this._completeResults.meta = results.meta;
		}

		if (!this._completed
			&& finishedIncludingPreview
			&& isFunction(this._config.complete)
			&& (!results || !results.meta.aborted)) {
			console.log({ _rowCount: this._rowCount, config: this._config, finishedIncludingPreview, thisChunkLength: chunk.length })
			//console.log('sin resultados')
			this._config.complete(this._completeResults);
			this._completed = true;
		}

		if (!finishedIncludingPreview && (!results || !results.meta.paused)) {
			return this._readChunk();
		}


		return results;
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
	parse: (
		_input: string | File | NodeJS.ReadableStream,
		_config: PapaConfig | (PapaDefault.ParseConfig & { dynamicTypingFunction?: Function, transform?: false | { (value: string, field: string | number): any } })
	): ParseResult<any> | Promise<ParseResult<any>> => {
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
		if (typeof _input === 'string' && _config.download && !globalThis.XMLHttpRequest && globalThis.fetch) {
			return new FetchPapaStreamer(_config as PapaConfig).stream(_input)
		}
		return PapaDefault.parse(_input, _config as PapaDefault.ParseConfig)

	}
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
