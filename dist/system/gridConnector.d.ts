import { DataSource, Selection, SortObject, FilterObject, Controller, ColConfig } from './interfaces';
export declare class GridConnector {
    private selection;
    private controller;
    private datasource;
    private key;
    private errorhandler;
    private eventID;
    constructor(datasource: DataSource, selection?: Selection, errorHandler?: Function);
    getSelection(): Selection;
    gridCreated(controller: Controller): void;
    select(row: number): void;
    getDatasourceLength(): number;
    getColConfig(): Array<ColConfig>;
    setColConfig(colconfig: Array<ColConfig>): void;
    getGrouping(): Array<string>;
    group(grouping: Array<string>, keepExpanded?: boolean): void;
    getElement(options: {
        row: number;
        isDown: boolean;
        callback: Function;
    }): void;
    query(a: Array<FilterObject>): void;
    orderBy(attribute: string | SortObject, addToCurrentSort?: boolean): void;
    destroy(): void;
    getCurrentOrderBy(): Array<SortObject>;
    getCurrentFilter(): Array<FilterObject>;
    getFilterOperatorName(operator: string): string;
    expandGroup(id: string): void;
    collapseGroup(id: string): void;
    private eventHandler(event);
    private raiseEvent(name, data?);
    private getRowProperties(obj);
}
