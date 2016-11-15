import { SortObject, Entity } from '../interfaces';
export declare class ArraySort {
    private lastSort;
    private curSort;
    constructor();
    reset(): void;
    setLastSort(array: Array<SortObject>): void;
    setOrderBy(param: SortObject | any, add?: boolean): void;
    getOrderBy(): Array<SortObject>;
    runOrderbyOn(array: Array<Entity>): void;
}
