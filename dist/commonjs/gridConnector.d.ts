import { SelectionInterface, GridConnectorInterface, DataSource, Selection, SortObject, FilterObject, Controller, ColConfig } from './interfaces';
export declare class GridConnector implements GridConnectorInterface {
    private selection;
    private controller;
    private datasource;
    private key;
    private errorhandler;
    private eventID;
    constructor(datasource: DataSource, selection?: Selection, errorHandler?: Function);
    getSelection(): SelectionInterface;
    connect(controller: Controller, create: Function): void;
    gridCreated(): void;
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
    setFilterOperatorName(key: string, name: string): void;
    expandGroup(id: string): void;
    collapseGroup(id: string): void;
    private eventHandler(event);
    private raiseEvent(name, data?);
    private getRowProperties(obj);
}
