export declare class ArrayGrouping {
    gID: any;
    groups: any;
    grouping: any;
    expanded: Set<any>;
    constructor();
    group(arrayToGroup: any, grouping: any, keepExpanded: any): any;
    groupMain(array: any, groupBy: any, groupNo: any): any[];
    groupChildren(childGroupArray: any, groupBy: any, groupNo: any): any[];
    getGrouping(): any;
    expand(id: any, array?: Set<any>): any[];
    collapse(id: any): any[];
}
