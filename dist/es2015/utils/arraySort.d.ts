import { SortObject, Entity } from '../interfaces';
export declare class ArraySort {
    private lastSort;
    private curSort;
    private localeCompareCode;
    private localeCompareOptions;
    constructor();
    setLocaleCompare(code: string, options?: any): void;
    reset(defaultSortAttribute?: string): void;
    setLastSort(array: SortObject[]): void;
    setOrderBy(param: SortObject | any, add?: boolean): void;
    getOrderBy(): SortObject[];
    getValue(attribute: string, obj: any): any;
    runOrderbyOn(array: Entity[]): void;
}
