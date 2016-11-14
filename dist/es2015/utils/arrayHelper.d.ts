import { FilterOperators } from './filterOperators';
import { ArrayFilter } from './arrayFilter';
import { ArraySort } from './arraySort';
import { ArrayGrouping } from './arrayGrouping';
export declare class ArrayHelper {
    filterOperators: FilterOperators;
    arrayFilter: ArrayFilter;
    arraySort: ArraySort;
    arrayGrouping: ArrayGrouping;
    constructor();
    orderBy(collection: any, attribute: any, addToCurrentSort: any): {
        fixed: any;
        full: any;
    };
    group(array: any, grouping: any, keepExpanded: any): any;
    getGrouping(): any;
    groupCollapse(id: any): any[];
    groupExpand(id: any): any[];
    getOrderBy(): any[];
    setLastSort(array: any): void;
    setOrderBy(attribute: any, addToCurrentSort: any): void;
    runOrderbyOn(array: any): void;
    resetSort(): void;
    getFilterOperatorName(operator: any): any;
    getCurrentFilter(): any[];
    query(array: any, params: any): any;
}
