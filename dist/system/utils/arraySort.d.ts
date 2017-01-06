import { SortObject, Entity } from '../interfaces';
export declare class ArraySort {
    private lastSort;
    private curSort;
    constructor();
    reset(): void;
    setLastSort(array: SortObject[]): void;
    setOrderBy(param: SortObject | any, add?: boolean): void;
    getOrderBy(): SortObject[];
    getValue(attribute: string, obj: any): any;
    runOrderbyOn(array: Entity[]): void;
}
