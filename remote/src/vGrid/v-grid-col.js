/*****************************************************************************************************************
 *    VGridCol
 *    This is just for getting the params for v-grid-col to create the grid
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

import {inject, Optional, noView, customElement, bindable, processContent} from 'aurelia-framework';
//for kendo ui bridge, remove import above
//import {bindable, customElement} from 'aurelia-templating';
//import {inject, Optional} from 'aurelia-dependency-injection';
import {VGrid} from './v-grid';

@noView()
@processContent(false)
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
  //@bindable vColCustom;


  /*****************************************************
   *  constructor
   ******************************************************/
  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;


  }


  /*****************************************************
   *  just returning the value converter
   ******************************************************/
  get valueConverters() {
    if (this.vGrid) {
      return this.vGrid.viewResources.lookupFunctions.valueConverters;
    }
  }


  /*****************************************************
   *  element event
   ******************************************************/
  bind(bindingContext, overrideContext) {
    this.vGrid.vGridConfig.attributeArray.push(this.vColAttribute);
    this.vGrid.vGridConfig.attributes.push(this.vColAttribute);
    this.vGrid.vGridConfig.columnWidthArray.push(this.vColWidth);
    this.vGrid.vGridConfig.headerArray.push(this.vColHeader || "");
    this.vGrid.vGridConfig.filterArray.push(this.vColDefaultFilter || "=");
    this.vGrid.vGridConfig.colCustomArray.push(this.element.innerHTML);
    this.vGrid.vGridConfig.filterOnKeyArray.push(this.vColFilterOnKey === "true" ? true : false);



  }

  attached(){

  }




}
