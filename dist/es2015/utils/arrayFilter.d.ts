import { FilterOperators, FilterObject, Entity } from '../interfaces';
export declare class ArrayFilter {
    private filterOperators;
    private lastFilter;
    constructor(filterOperators: FilterOperators);
    getLastFilter(): FilterObject[];
    runQueryOn(objArray: Array<Entity>, ObjFilter: Array<FilterObject>): Entity[];
}
