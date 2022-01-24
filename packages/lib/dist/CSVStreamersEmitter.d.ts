export declare class CSVStreamersEmitter {
    _events: Record<string, Function[]>;
    constructor();
    on(name: string, listener: Function): void;
    removeListener(name: string, listenerToRemove: Function): void;
    emit(name: string, data?: any): void;
    clearListeners(): void;
}
//# sourceMappingURL=CSVStreamersEmitter.d.ts.map