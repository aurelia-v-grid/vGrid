import { ArrayFilter } from './arrayFilter';
import { ArraySort } from './arraySort';
import { ArrayGrouping } from './arrayGrouping';
import { SortObject, FilterObject, Entity } from '../interfaces';
export declare class ArrayUtils {
    arrayFilter: ArrayFilter;
    arraySort: ArraySort;
    arrayGrouping: ArrayGrouping;
    constructor();
    orderBy(collection: Entity[], attribute: string | SortObject, addToCurrentSort?: boolean): {
        fixed: Entity[];
        full: Entity[];
    };
    group(array: Entity[], grouping: string[], keepExpanded: boolean): Entity[];
    getGrouping(): string[];
    groupCollapse(id: string): Entity[];
    groupExpand(id: string): Entity[];
    getOrderBy(): SortObject[];
    setLastSort(array: SortObject[]): void;
    setOrderBy(attribute: string | SortObject, addToCurrentSort?: boolean): void;
    runOrderbyOn(array: Entity[]): void;
    resetSort(): void;
    resetGrouping(): void;
    getCurrentFilter(): FilterObject[];
    query(array: Entity[], params: FilterObject[]): Entity[];
}
