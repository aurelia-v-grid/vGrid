import { ViewSlot, TargetInstruction, BehaviorInstruction } from 'aurelia-framework';
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
export { ArrayFilter } from './utils/arrayFilter';
export { ArraySort } from './utils/arraySort';
export { ArrayGrouping } from './utils/arrayGrouping';
export { Footer } from './grid/footer';



export interface RowCacheInterface {
  [key: string]: any;
  left: HTMLElement;
  main: HTMLElement;
  right: HTMLElement;
  group: HTMLElement;
  bindingContext: BindingContextInterface;
  overrideContext: any;
  parentOverrideContext: any;
  leftRowViewSlot: ViewSlot;
  mainRowViewSlot: ViewSlot;
  rightRowViewSlot: ViewSlot;
  groupRowViewSlot: ViewSlot;
  selection: SelectionInterface;
  row: number;
  top: number;
  isGroup: boolean;
  selected: boolean;
}



export interface HeaderCacheInterface {
  [key: string]: any;
  left: HTMLElement;
  main: HTMLElement;
  right: HTMLElement;
  group: HTMLElement;
  bindingContext: BindingContextInterface;
  overrideContext: any;
  parentOverrideContext: any;
  leftRowViewSlot: ViewSlot;
  mainRowViewSlot: ViewSlot;
  rightRowViewSlot: ViewSlot;
  groupRowViewSlot: ViewSlot;
}



export interface ColConfigInterface {
  [key: string]: any;
  colWidth?: number;
  colRowTemplate?: string;
  colHeaderTemplate?: string;
  colField: string;
  colPinLeft?: boolean;
  colPinRight?: boolean;
  colHeaderName?: string;
  colAddLabelAttributes?: string;
  colAddFilterAttributes?: string;
  colAddRowAttributes?: string;
  colFilterMenu?: string;
  colLabelMenu?: string;
  colRowMenu?: string;
  colHidden?: boolean;
  colDragDrop?: string;
  colResizeable?: string;
  colSort?: string;
  colDisplayEdit?: string;
  colFilter?: string;
  colFilterTop?: boolean;
  colCss?: string;
  colType?: string;
  __colSortHelper?: number;
  __colHeaderTemplateGenerated?: string;
  __colRowTemplateGenerated?: string;
}



// the properties will mostly only be on group entities..
// want to rename these to .__avgXXX so we cant crash with someone else
export interface EntityInterface {
  [key: string]: any;
  __group?: boolean;
  __groupID?: string;
  __groupName?: string;
  __groupLvl?: number;
  __groupTotal?: number;
  __groupChildren?: EntityInterface[];
  __groupExpanded?: boolean;
}



export interface TargetDataInterface {
  [key: string]: any;
  draggable: HTMLElement;
  ok: boolean;
  target: HTMLElement;
  colType: string;
  colNo: number;
  context: ColumBindingContextObjectInterface;
  columnsArray: ColumBindingContextObjectInterface[];
  panel: boolean;
}



export interface FilterObjectInterface {
  [key: string]: any;
  key?: string;
  operator: string;
  value: any;
  attribute: string;
}



export interface SortObjectInterface {
  [key: string]: any;
  attribute: string;
  asc: boolean;
  no?: number;
}



export interface DatasourceConfigInterface {
  [key: string]: any;
  key?: string;
  rowHeight?: number;
  groupHeight?: number;
}



export interface CustomTargetInstruction extends TargetInstruction {
  [key: string]: any;
  colHeaderTemplate?: string;
  colRowTemplate?: string;
  colCss?: string;
  headerTemplate?: string;
  rowTemplate?: string;
  template?: string;
  elementInstruction: CustomBehaviorInstruction;
}



export interface CustomBehaviorInstruction extends BehaviorInstruction {
  [key: string]: any;
  colHeaderTemplate?: string;
  colRowTemplate?: string;
  colCss?: string;
  headerTemplate?: string;
  rowTemplate?: string;
  template?: string;
  menuTemplates?: any;
}



export interface BindingContextInterface {
  [key: string]: any;
  rowRef: EntityInterface;
  selection: SelectionInterface;
  row: number;
  selected: boolean;
  tempRef: EntityInterface;
}



export interface OverrideContextInterface {
  [key: string]: any;
  bindContext: any;
  parentOverrideContext: any;
}



export interface DragDropShardContextInterface {
  [key: string]: any;
  dragging: boolean;
  panel: Element;
  lastTarget: Element;
  colType: string;
  colNo: number;
  curColNo: number;
  columnsArray: ColumBindingContextObjectInterface[];
  columnsArraySorted: ColumBindingContextObjectInterface[];
  context: ColumBindingContextObjectInterface;
  field: string;
  title: string;
}



export interface ResizeShardContextInterface {
  [key: string]: any;
  resizing: boolean;
}



export interface ColumBindingContextObjectInterface {
  [key: string]: any;
  show: boolean;
  left: number;
  width: number;
}



export interface GroupingContextInterface {
  [key: string]: any;
  viewSlot: ViewSlot;
  name: string;
  field: string;
  remove: Function;
  ctx: GroupingElements;
}



export interface GroupingObjInterface {
  [key: string]: any;
  title: string;
  field: string;
}



// only included what the grid classes is asking for, not datasource etc.
export interface SelectionInterface {
  getMode(): string;
  isSelected(row: number): boolean;
  deSelectAll(): void;
  deSelect(row: number): void;
  select(row: number, add?: boolean): void;
  selectRange(start: number, end: number): void;
  getSelectedRows(): number[];
  setSelectedRows(newRows: number[]): void;
  reset(): void;
}



// only included what the grid classes is asking for, not datasource etc.
export interface GridConnectorInterface {
  getSelection(): SelectionInterface;
  connect(controller: ControllerInterface, create: Function): void;
  gridCreated(): void;
  select(row: number): void;
  getDatasourceLength(): number;
  getColConfig(): ColConfigInterface[];
  setColConfig(colconfig: ColConfigInterface[]): void;
  getGrouping(): GroupingObjInterface[];
  group(grouping: GroupingObjInterface[], keepExpanded?: boolean): void;
  getElement(options: { row: number, isDown: boolean, callback: Function }): void;
  query(a: FilterObjectInterface[]): void;
  orderBy(attribute: string | SortObjectInterface, addToCurrentSort?: boolean): void;
  getCurrentOrderBy(): SortObjectInterface[];
  getCurrentFilter(): FilterObjectInterface[];
  expandGroup(id: string): void;
  collapseGroup(id: string): void;
  getRowHeightState(): any;
}

export interface DatasourceInterface {
  groupCollapse(id: string): void;
  groupExpand(id: string): void;
  getCurrentFilter(): FilterObjectInterface[];
  getCurrentOrderBy(): SortObjectInterface[];
  orderBy(attribute: string | SortObjectInterface, addToCurrentSort?: boolean): void;
  removeEventListener(id: number): void;
  query(options: FilterObjectInterface[]): void;
  group(grouping: GroupingObjInterface[], keepExpanded?: boolean): void;
  getGrouping(): GroupingObjInterface[];
  getRowHeightState(): any; // todo
  select(row: number): void;
  addEventListener(callback: Function): number;
  getSelection(): SelectionInterface;
  length(): number;
  getElement(row: number): EntityInterface;
}


export interface ControllerInterface {
  element: Element;
  setLoadingScreen(value: boolean, msg?: string, collectionLength?: number): Promise<void>;
  updateHeights(): void;
  collectionLength(): number;
  triggerScroll(position: number): void;
  rebindAllRows(): void;
  getColumnConfig(): ColConfigInterface[];
  setColumnConfig(colConfig: ColConfigInterface[]): void;
  getTopRow(): number;
  updateHeaderGrouping(groups: GroupingObjInterface[]): void;
  triggerI18N(): void;
  udateHorizontalScroller(): void;
}
