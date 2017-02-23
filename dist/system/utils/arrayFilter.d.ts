import { FilterObjectInterface, EntityInterface } from '../interfaces';
export declare class ArrayFilter {
    private lastFilter;
    private filterOperators;
    constructor();
    getOperatorNo(val: string): number;
    getLastFilter(): FilterObjectInterface[];
    runQueryOn(objArray: EntityInterface[], ObjFilter: FilterObjectInterface[]): EntityInterface[];
}
