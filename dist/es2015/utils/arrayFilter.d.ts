import { FilterOperators } from './filterOperators';
export declare class ArrayFilter {
    filterOperators: FilterOperators;
    lastFilter: Array<any>;
    constructor(filterOperators: FilterOperators);
    getLastFilter(): any[];
    runQueryOn(objArray: any, ObjFilter: any): any;
}
