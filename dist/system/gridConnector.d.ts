import { SelectionInterface, GridConnectorInterface, DatasourceInterface, SortObjectInterface, FilterObjectInterface, ControllerInterface, ColConfigInterface, GroupingObjInterface } from './interfaces';
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
    getRowHeightState(): any;
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
    getCurrentFilter(): FilterObjectInterface[];
    expandGroup(id: string): void;
    collapseGroup(id: string): void;
    getTopRow(): number;
    triggerI18n(): void;
    raiseEvent(name: string, data?: {}): void;
    private eventHandler(event);
    private getRowProperties(obj);
}
