import { FilterObject, Entity } from '../interfaces';
export declare class ArrayFilter {
    private lastFilter;
    private filterOperators;
    constructor();
    getOperatorNo(val: string): number;
    getLastFilter(): FilterObject[];
    runQueryOn(objArray: Array<Entity>, ObjFilter: Array<FilterObject>): Entity[];
}
