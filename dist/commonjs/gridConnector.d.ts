import { SelectionInterface, GridConnectorInterface, DatasourceInterface, SortObjectInterface, FilterObjectInterface, ControllerInterface, ColConfigInterface, GroupingObjInterface, CollectionStatusInterface } from './interfaces';
export declare class GridConnector implements GridConnectorInterface {
    private selection;
    private controller;
    private datasource;
    private errorhandler;
    private eventID;
    private initTop;
    constructor(datasource: DatasourceInterface, selection?: SelectionInterface, errorHandler?: Function);
    setInitTop(top: number): void;
    getSelection(): SelectionInterface;
    connect(controller: ControllerInterface, create: Function): void;
    gridCreated(): void;
    select(row: number): void;
    getRowHeightState(): CollectionStatusInterface;
    getDatasourceLength(): number;
    getColConfig(): ColConfigInterface[];
    setColConfig(colconfig: ColConfigInterface[]): void;
    getGrouping(): GroupingObjInterface[];
    group(grouping: GroupingObjInterface[], keepExpanded?: boolean): void;
    getElement(options: {
        row: number;
        isDown: boolean;
        callback: Function;
    }): void;
    query(a: FilterObjectInterface[]): void;
    orderBy(attribute: string | SortObjectInterface, addToCurrentSort?: boolean): void;
    destroy(): void;
    getCurrentOrderBy(): SortObjectInterface[];
    updateRowData(attribute: string, data: any, rows: number[]): void;
    getCurrentFilter(): FilterObjectInterface[];
    expandGroup(id: string): void;
    collapseGroup(id: string): void;
    getTopRow(): number;
    triggerI18n(): void;
    raiseEvent(name: string, data?: {}): void;
    private eventHandler;
    private getRowProperties;
}
