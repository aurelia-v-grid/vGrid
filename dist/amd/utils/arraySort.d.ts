import { SortObjectInterface, EntityInterface } from '../interfaces';
export declare class ArraySort {
    private lastSort;
    private curSort;
    private localeCompareCode;
    private localeCompareOptions;
    constructor();
    setLocaleCompare(code: string, options?: any): void;
    reset(defaultSortAttribute?: string): void;
    setLastSort(array: SortObjectInterface[]): void;
    setOrderBy(param: SortObjectInterface | any, add?: boolean): void;
    getOrderBy(): SortObjectInterface[];
    getValue(attribute: string, obj: any): any;
    runOrderbyOn(array: EntityInterface[]): void;
}
