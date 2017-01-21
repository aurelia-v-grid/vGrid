import { SelectionInterface, GridConnectorInterface, DataSource, Selection, SortObject, FilterObject, Controller, ColConfig, GroupingObj } from './interfaces';
export declare class GridConnector implements GridConnectorInterface {
    private selection;
    private controller;
    private datasource;
    private key;
    private errorhandler;
    private eventID;
    private initTop;
    constructor(datasource: DataSource, selection?: Selection, errorHandler?: Function);
    setInitTop(top: number): void;
    getSelection(): SelectionInterface;
    connect(controller: Controller, create: Function): void;
    gridCreated(): void;
    select(row: number): void;
    getRowHeightState(): any;
    getDatasourceLength(): number;
    getColConfig(): ColConfig[];
    setColConfig(colconfig: ColConfig[]): void;
    getGrouping(): GroupingObj[];
    group(grouping: GroupingObj[], keepExpanded?: boolean): void;
    getElement(options: {
        row: number;
        isDown: boolean;
        callback: Function;
    }): void;
    query(a: FilterObject[]): void;
    orderBy(attribute: string | SortObject, addToCurrentSort?: boolean): void;
    destroy(): void;
    getCurrentOrderBy(): SortObject[];
    getCurrentFilter(): FilterObject[];
    expandGroup(id: string): void;
    collapseGroup(id: string): void;
    getTopRow(): number;
    triggerI18n(): void;
    raiseEvent(name: string, data?: {}): void;
    private eventHandler(event);
    private getRowProperties(obj);
}
