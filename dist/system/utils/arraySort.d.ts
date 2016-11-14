export declare class ArraySort {
    private lastSort;
    private curSort;
    constructor();
    reset(): void;
    setLastSort(array: any): void;
    setOrderBy(attribute: any, add: any): void;
    getOrderBy(): any[];
    runOrderbyOn(array: any): void;
}
