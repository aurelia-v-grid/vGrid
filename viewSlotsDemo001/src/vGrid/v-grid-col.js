/**
 * Created by vegar on 4/26/2016.
 */
import {inject, Optional, customElement, bindable} from 'aurelia-framework';
import {VGrid} from './v-grid'

@customElement('v-grid-col')
@inject(Element, VGrid)
export class VGridCol {
  @bindable vColWidth;
  @bindable vColAttribute;
  @bindable vColHeader;
  @bindable vColDefaultFilter;
  @bindable vColReadOnly;
  @bindable vColCss;
  @bindable vColType;


  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;

  }


  bind(bindingContext, overrideContext) {
    this.vGrid.vGridConfig.attributeArray.push(this.vColAttribute);
    this.vGrid.vGridConfig.columnWidthArray.push(this.vColWidth);
    this.vGrid.vGridConfig.headerArray.push(this.vColHeader || "");
    this.vGrid.vGridConfig.filterArray.push(this.vColDefaultFilter || "?");
    this.vGrid.vGridConfig.readOnlyArray.push(this.vColReadOnly === "true" ? this.vColAttribute : false);
    this.vGrid.vGridConfig.colStyleArray.push(this.vColCss);
    this.vGrid.vGridConfig.colTypeArray.push(this.vColType);
    this.vGrid.vGridConfig.columns.push(this);
  }

}
