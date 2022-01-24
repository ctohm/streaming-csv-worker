export class CSVStreamersEmitter {
    _events: Record<string, Function[]>;
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
            return;
        }

        const filterListeners = (listener: Function) => listener !== listenerToRemove;

        this._events[name] = this._events[name].filter(filterListeners);
    }

    emit(name: string, data?: any) {
        //console.log({ emitting: name, handler: this._events[name] })
        if (!this._events[name]) {
            return;
        }

        const fireCallbacks = (callback: Function) => {
            callback(data);
        };

        this._events[name].forEach(fireCallbacks);
    }
    clearListeners(): void {
        this._events = {};
    }
}
