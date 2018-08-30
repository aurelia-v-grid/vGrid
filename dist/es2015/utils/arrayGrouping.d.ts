import { EntityInterface, GroupingObjInterface } from '../interfaces';
export declare class ArrayGrouping {
    private groups;
    private grouping;
    private expanded;
    constructor();
    reset(): void;
    group(arrayToGroup: EntityInterface[], grouping: GroupingObjInterface[], keepExpanded?: boolean): EntityInterface[];
    getGrouping(): GroupingObjInterface[];
    expand(id: string, array?: Set<string>): EntityInterface[];
    collapse(id: string): EntityInterface[];
    private groupMain;
    private groupChildren;
}
