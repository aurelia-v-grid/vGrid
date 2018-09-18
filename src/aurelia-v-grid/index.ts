export * from './interfaces';

import { VGrid } from './grid/v-grid';
import { VGridAttributesFilter } from './grid/attributes/v-filter';
import { VGridAttributesFilterObserver } from './grid/attributes/v-filter-observer';
import { VGridAttributesSort } from './grid/attributes/v-sort';
import { VGridAttributesImageFix } from './grid/attributes/v-image';
import { VGridDragDropCol } from './grid/attributes/v-drag-drop-col';
import { VGridAttributesOnChange } from './grid/attributes/v-changed';
import { VGridAttributesDataHandler } from './grid/attributes/v-data-handler';
import { VGridAttributesResizeCol } from './grid/attributes/v-resize-col';
import { VGridAttributeMenu } from './grid/attributes/v-menu';
import { VGridAttributesSelection } from './grid/attributes/v-selection';
import { VGridElementRowRepeat } from './grid/v-grid-row-repeat';
import { VGridGroupRow } from './grid/v-grid-group-row';
import { VGridGroupElement } from './grid/v-grid-group-element';
import { VGridLoadingScreen } from './grid/v-grid-loadingscreen';
import { VGridContextmenu } from './grid/v-grid-contextmenu';
import { VGridFooter } from './grid/v-grid-footer';
import { VGridElementColConfig } from './grid/v-grid-col';

export const globalResources: any = [
  VGrid,
  VGridAttributesFilter,
  VGridAttributesFilterObserver,
  VGridAttributesSort,
  VGridAttributesImageFix,
  VGridDragDropCol,
  VGridAttributesOnChange,
  VGridAttributesDataHandler,
  VGridAttributesResizeCol,
  VGridAttributeMenu,
  VGridAttributesSelection,
  VGridElementRowRepeat,
  VGridGroupRow,
  VGridGroupElement,
  VGridLoadingScreen,
  VGridContextmenu,
  VGridFooter,
  VGridElementColConfig
];

