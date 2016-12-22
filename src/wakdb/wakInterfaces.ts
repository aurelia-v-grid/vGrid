// not importing anything from main interface.ts since I was planing to move this to own repo 

export { WakClassMethod } from './wakClassMethod';
export { WakCollection } from './wakCollection';
export { WakCollectionMethod } from './wakCollectionMethod';
export { WakDataClass } from './wakDataClass';
export { WakDirectory } from './wakDirectory';
export { WakEntity } from './wakEntity';
export { WakEntityMethod } from './wakEntityMethod';
export { WakRestApi } from './wakRestApi';
export { WakRestUtil } from './wakRestUtil';
export { WakDataSource } from './wakDataSource';
export { WakGridConnector } from './wakGridConnector';
export { WakSelection } from './wakSelection';
import { WakSelection } from './wakSelection';

export interface RequestOptions {
  body: any;
  method: any;
}

export interface ControllerInterface {
  element: Element;
  setLoadingScreen(value: boolean, msg?: string, collectionLength?: number): Promise<void>;
  updateHeights(): void;
  collectionLength(): number;
  triggerScroll(position: number): void;
  rebindAllRows(): void;
  getColumnConfig(): ColConfig[];
  setColumnConfig(colConfig: ColConfig[]): void;
}

export interface Entity {
  [key: string]: any;
  __group?: boolean;
  __groupID?: string;
  __groupName?: string;
  __groupLvl?: number;
  __groupTotal?: number;
  __groupChildren?: Entity[];
  __groupExpanded?: boolean;
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

export interface BindingContext {
  [key: string]: any;
  rowRef: Entity;
  selection: WakSelection;
  row: number;
  selected: boolean;
  tempRef: Entity;
}

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
  getColConfig(): ColConfig[];
  setColConfig(colconfig: ColConfig[]): void;
  getGrouping(): string[];
  group(grouping: string[], keepExpanded?: boolean): void;
  getElement(options: { row: number, isDown: boolean, callback: Function }): void;
  query(a: FilterObject[]): void;
  orderBy(attribute: string | SortObject, addToCurrentSort?: boolean): void;
  getCurrentOrderBy(): SortObject[];
  getCurrentFilter(): FilterObject[];
  expandGroup(id: string): void;
  collapseGroup(id: string): void;
}

export interface ColConfig {
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
  colFilter?: string;
  colFilterTop?: boolean;
  colCss?: string;
  colType?: string;
  __colSortHelper?: number;
  __colHeaderTemplateGenerated?: string;
  __colRowTemplateGenerated?: string;
}
