import { ViewSlot, TargetInstruction, BehaviorInstruction } from 'aurelia-framework';
import { Selection } from './selection';
import { GroupingElements } from './grid/groupingElements';
export * from 'aurelia-framework';
export { HtmlCache } from './grid/htmlCache';
export { Controller } from './grid/controller';
export { MainMarkup } from './grid/mainMarkup';
export { MainScrollEvents } from './grid/mainScrollEvents';
export { RowMarkup } from './grid/rowMarkup';
export { RowScrollEvents } from './grid/rowScrollEvents';
export { ColumnMarkup } from './grid/columnMarkup';
export { HtmlHeightWidth } from './grid/htmlHeightWidth';
export { ViewSlots } from './grid/viewSlots';
export { ColumnBindingContext } from './grid/columnBindingContext';
export { RowDataBinder } from './grid/rowDataBinder';
export { RowClickHandler } from './grid/rowClickHandler';
export { GroupingElements } from './grid/groupingElements';
export { LoadingScreen } from './grid/loadingScreen';
export { ContextMenu } from './grid/contextMenu';
export { VGrid } from './grid/v-grid';
export { GridConnector } from './gridConnector';
export { DataSource } from './dataSource';
export { Selection } from './selection';
export { FilterOperators } from './utils/filterOperators';
export { ArrayFilter } from './utils/arrayFilter';
export { ArraySort } from './utils/arraySort';
export { ArrayGrouping } from './utils/arrayGrouping';
export interface RowCache {
    [key: string]: any;
    left: HTMLElement;
    main: HTMLElement;
    right: HTMLElement;
    group: HTMLElement;
    bindingContext: BindingContext;
    overrideContext: any;
    parentOverrideContext: any;
    leftRowViewSlot: ViewSlot;
    mainRowViewSlot: ViewSlot;
    rightRowViewSlot: ViewSlot;
    groupRowViewSlot: ViewSlot;
    row: number;
    top: number;
    isGroup: boolean;
    selected: boolean;
}
export interface HeaderCache {
    [key: string]: any;
    left: HTMLElement;
    main: HTMLElement;
    right: HTMLElement;
    group: HTMLElement;
    bindingContext: BindingContext;
    overrideContext: any;
    parentOverrideContext: any;
    leftRowViewSlot: ViewSlot;
    mainRowViewSlot: ViewSlot;
    rightRowViewSlot: ViewSlot;
    groupRowViewSlot: ViewSlot;
}
export interface ColConfig {
    [key: string]: any;
    colWidth: number;
    colRowTemplate: string;
    colHeaderTemplate: string;
    colField: string;
    colPinLeft: boolean;
    colPinRight: boolean;
    colHeaderName: string;
    colAddLabelAttributes: string;
    colAddFilterAttributes: string;
    colAddRowAttributes: string;
    colSort: string;
    colFilter: string;
    colFilterTop: boolean;
    colCss: string;
    colType: string;
}
export interface Entity {
    [key: string]: any;
    __group: boolean;
    __groupID: string;
    __groupName: string;
    __groupLvl: number;
    __groupTotal: number;
    __groupChildren: Array<Entity>;
    __groupExpanded: boolean;
}
export interface TargetData {
    [key: string]: any;
    draggable: HTMLElement;
    ok: boolean;
    target: HTMLElement;
    colType: string;
    colNo: number;
    context: ColumBindingContextObject;
    columnsArray: Array<ColumBindingContextObject>;
    panel: boolean;
}
export interface FilterObject {
    [key: string]: any;
    operator: string;
    value: any;
    attribute: string;
}
export interface SortObject {
    [key: string]: any;
    attribute: string;
    asc: boolean;
    no?: number;
}
export interface DatasourceConfig {
    [key: string]: any;
    key: string;
}
export interface CustomTargetInstruction extends TargetInstruction {
    [key: string]: any;
    colHeaderTemplate: string;
    colRowTemplate: string;
    colCss: string;
    headerTemplate: string;
    rowTemplate: string;
    elementInstruction: CustomBehaviorInstruction;
}
export interface CustomBehaviorInstruction extends BehaviorInstruction {
    [key: string]: any;
    colHeaderTemplate: string;
    colRowTemplate: string;
    colCss: string;
    headerTemplate: string;
    rowTemplate: string;
}
export interface BindingContext {
    [key: string]: any;
    rowRef: Entity;
    selection: Selection;
    row: number;
    selected: boolean;
    tempRef: Entity;
}
export interface OverrideContext {
    [key: string]: any;
    bindContext: any;
    parentOverrideContext: any;
}
export interface DragDropShardContext {
    [key: string]: any;
    dragging: boolean;
    panel: Element;
    lastTarget: Element;
    colType: string;
    colNo: number;
    curColNo: number;
    columnsArray: Array<ColumBindingContextObject>;
    columnsArraySorted: Array<ColumBindingContextObject>;
    context: ColumBindingContextObject;
}
export interface ResizeShardContext {
    [key: string]: any;
    resizing: boolean;
}
export interface ColumBindingContextObject {
    [key: string]: any;
    show: boolean;
    left: number;
    width: number;
}
export interface GroupingContext {
    [key: string]: any;
    viewSlot: ViewSlot;
    name: string;
    field: string;
    remove: Function;
    ctx: GroupingElements;
}
