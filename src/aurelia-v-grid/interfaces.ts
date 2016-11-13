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
  __group: string;
}


export interface DatasourceConfig {
  key: string;
}

export interface CustomTargetInstruction extends TargetInstruction {
  colHeaderTemplate: string;
  colRowTemplate: string;
  colCss: string;
  headerTemplate: string;
  rowTemplate: string;
  elementInstruction: CustomBehaviorInstruction;
}

export interface CustomBehaviorInstruction extends BehaviorInstruction {
    colHeaderTemplate: string;
    colRowTemplate: string;
    colCss: string;
    headerTemplate: string;
    rowTemplate: string;
}

export interface BindingContext {
  rowRef: Entity;
  selection: Selection;
  row; number;
  selected: boolean;
}

export interface OverrideContext {
  bindContext: any;
  parentOverrideContext: any;
}

export interface DragDropShardContext {
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
  resizing: boolean;
}

export interface ColumBindingContextObject {
  show: boolean;
  left: number;
  width: number;

}

export interface GroupingContext {
  viewSlot: ViewSlot;
  name: string;
  field: string;
  remove: Function;
  ctx: GroupingElements;
}
