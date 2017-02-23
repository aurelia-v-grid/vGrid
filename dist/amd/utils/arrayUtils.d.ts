import { ArrayFilter } from './arrayFilter';
import { ArraySort } from './arraySort';
import { ArrayGrouping } from './arrayGrouping';
import { SortObjectInterface, FilterObjectInterface, EntityInterface, GroupingObjInterface } from '../interfaces';
export declare class ArrayUtils {
    arrayFilter: ArrayFilter;
    arraySort: ArraySort;
    arrayGrouping: ArrayGrouping;
    constructor();
    orderBy(collection: EntityInterface[], attribute: string | SortObjectInterface, addToCurrentSort?: boolean): {
        fixed: EntityInterface[];
        full: EntityInterface[];
    };
    group(array: EntityInterface[], grouping: GroupingObjInterface[], keepExpanded: boolean): EntityInterface[];
    getGrouping(): GroupingObjInterface[];
    groupCollapse(id: string): EntityInterface[];
    groupExpand(id: string): EntityInterface[];
    getOrderBy(): SortObjectInterface[];
    setLastSort(array: SortObjectInterface[]): void;
    setOrderBy(attribute: string | SortObjectInterface, addToCurrentSort?: boolean): void;
    runOrderbyOn(array: EntityInterface[]): void;
    resetSort(defaultSortAttribute?: string): void;
    resetGrouping(): void;
    getCurrentFilter(): FilterObjectInterface[];
    query(array: EntityInterface[], params: FilterObjectInterface[]): EntityInterface[];
    setLocaleCompare(code: string, options?: any): void;
}
