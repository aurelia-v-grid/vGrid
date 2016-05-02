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
  @bindable vColFormater;
  @bindable vColEditRaw;
  @bindable vColFilterOnKey;

  

  constructor(element, vGrid, valueConverter) {
    this.vGrid = vGrid;
    this.element = element;


  }
  
  get valueConverters(){
    if(this.vGrid){
      return this.vGrid.viewResources.lookupFunctions.valueConverters
    }
  }


  bind(bindingContext, overrideContext) {
    this.vGrid.vGridConfig.attributeArray.push(this.vColAttribute);
    this.vGrid.vGridConfig.attributes.push(this.vColAttribute);
    this.vGrid.vGridConfig.columnWidthArray.push(this.vColWidth);
    this.vGrid.vGridConfig.headerArray.push(this.vColHeader || "");
    this.vGrid.vGridConfig.filterArray.push(this.vColDefaultFilter || "=");
    this.vGrid.vGridConfig.readOnlyArray.push(this.vColReadOnly === "true" ? true : false);
    this.vGrid.vGridConfig.colStyleArray.push(this.vColCss);
    this.vGrid.vGridConfig.colTypeArray.push(this.vColType);
    this.vGrid.vGridConfig.filterOnKeyArray.push(this.vColFilterOnKey === "true" ? true : false);
    this.vGrid.vGridConfig.colEditRawArray.push(this.vColEditRaw === "true" ? true : false);
    this.vGrid.vGridConfig.colFormaterArray.push(this.valueConverters(this.vColFormater));
    this.vGrid.vGridConfig.columns.push(this);
  }

}
