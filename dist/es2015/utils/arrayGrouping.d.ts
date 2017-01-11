import { Entity } from '../interfaces';
export declare class ArrayGrouping {
    private groups;
    private grouping;
    private expanded;
    constructor();
    reset(): void;
    group(arrayToGroup: Entity[], grouping: string[], keepExpanded?: boolean): Entity[];
    getGrouping(): string[];
    expand(id: string, array?: Set<string>): Entity[];
    collapse(id: string): Entity[];
    private groupMain(array, groupBy, groupNo);
    private groupChildren(childGroupArray, groupBy, groupNo);
}
