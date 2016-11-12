import {ViewSlot} from 'aurelia-framework';
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
export {FilterOperators} from './utils/filterOperators';
export { ArrayFilter } from './utils/arrayFilter';
export { ArraySort } from './utils/arraySort';
export { ArrayGrouping } from './utils/arrayGrouping';

export interface RowCache {
  left: HTMLElement;
  main: HTMLElement;
  right: HTMLElement;
  group: HTMLElement;
  bindingContext: any;
  overrideContext: any;
  leftRowViewSlot: ViewSlot;
  mainRowViewSlot: ViewSlot;
  rightRowViewSlot: ViewSlot;
  groupRowViewSlot: ViewSlot;
  row: number;
  isGroup: boolean;
  selected: boolean;
}

export interface HeaderCache {
    left: HTMLElement;
    main: HTMLElement;
    right: HTMLElement;
    group: HTMLElement;
    bindingContext: any;
    overrideContext: any;
    leftRowViewSlot: ViewSlot;
    mainRowViewSlot: ViewSlot;
    rightRowViewSlot: ViewSlot;
    groupRowViewSlot: ViewSlot;
}
