import { DataSource } from './dataSource';
import { Selection } from './selection';
export declare class GridConnector {
    private controller;
    private datasource;
    private key;
    selection: Selection;
    private errorhandler;
    private eventID;
    constructor(datasource: DataSource, selection: Selection, errorHandler?: Function);
    gridCreated(controller: any): void;
    eventHandler(event: any): void;
    raiseEvent(name: any, data?: {}): CustomEvent;
    select(row: any): void;
    length(): number;
    getGrouping(): any;
    group(grouping: Array<any>, keepExpanded?: Array<any>): void;
    getElement(options: any): void;
    query(a: any): void;
    orderBy(attribute: any, addToCurrentSort: any): void;
    destroy(): void;
    getCurrentOrderBy(): any[];
    getCurrentFilter(): any[];
    getFilterOperatorName(operator: any): any;
    expandGroup(id: any): void;
    collapseGroup(id: any): void;
}
