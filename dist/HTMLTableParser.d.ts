declare type TinnerVars = {
    [s: string]: boolean | string | number;
};
export declare class HTMLTableParser {
    rewriterInstance: TinnerVars;
    isCapturing: boolean;
    tableSelectors: string[];
    rowSelectors: string[];
    cellSelectors: string[];
    alwaysRemove: string[];
    removePreserving: string[];
    constructor({ tableSelectors, rowSelectors, removePreserving, cellSelectors, alwaysRemove }: {
        tableSelectors?: string[];
        rowSelectors?: string[];
        cellSelectors?: string[];
        alwaysRemove?: string[];
        removePreserving?: string[];
    });
    transform(res: Response): Response;
}
export {};
