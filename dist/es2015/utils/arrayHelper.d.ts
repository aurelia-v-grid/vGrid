import { FilterOperators } from './filterOperators';
import { ArrayFilter } from './arrayFilter';
import { ArraySort } from './arraySort';
import { ArrayGrouping } from './arrayGrouping';
import { SortObject, FilterObject, Entity } from '../interfaces';
export declare class ArrayHelper {
    filterOperators: FilterOperators;
    arrayFilter: ArrayFilter;
    arraySort: ArraySort;
    arrayGrouping: ArrayGrouping;
    constructor();
    orderBy(collection: Array<Entity>, attribute: string | SortObject, addToCurrentSort?: boolean): {
        fixed: Array<Entity>;
        full: Array<Entity>;
    };
    group(array: Array<Entity>, grouping: Array<string>, keepExpanded: boolean): Array<Entity>;
    getGrouping(): Array<string>;
    groupCollapse(id: string): Array<Entity>;
    groupExpand(id: string): Array<Entity>;
    getOrderBy(): Array<SortObject>;
    setLastSort(array: Array<SortObject>): void;
    setOrderBy(attribute: string | SortObject, addToCurrentSort?: boolean): void;
    runOrderbyOn(array: Array<Entity>): void;
    resetSort(): void;
    getCurrentFilter(): Array<FilterObject>;
    query(array: Array<Entity>, params: Array<FilterObject>): Array<Entity>;
}
