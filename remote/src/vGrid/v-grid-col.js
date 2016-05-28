/*****************************************************************************************************************
 *    VGridCol
 *    This is just for getting the params for v-grid-col to create the grid
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

import {inject, Optional, noView, customElement, bindable, processContent, TargetInstruction} from 'aurelia-framework';
//for kendo ui bridge, remove import above
//import {bindable, customElement, TargetInstruction} from 'aurelia-templating';
//import {inject, Optional} from 'aurelia-dependency-injection';
import {VGrid} from './v-grid';

@noView()
@processContent((compiler, resources, element, instruction) => {
  
  //here I could also get header, could just allow them to split into header or row and used document.getElementsByTagName("V-ROW");
  // if they arnt found I use default headers
  
  let html = element.innerHTML;
  if (html !== '') {
    instruction.template = html;
  }
  element.innerHTML = '';

  // don't return true, so aurelia does not process the content
})
@customElement('v-grid-col')
@inject(Element, VGrid, TargetInstruction)
export class VGridCol {
  @bindable vColWidth;
  @bindable vColAttribute;
  @bindable vColHeader;
  @bindable vColDefaultFilter;
  @bindable vColFilterOnKey;


  /*****************************************************
   *  constructor
   ******************************************************/
  constructor(element, vGrid, targetInstruction) {
    this.vGrid = vGrid;
    this.element = element;
    this.template = targetInstruction.elementInstruction.template;


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
    //this.vGrid.vGridConfig.attributes.push(this.vColAttribute);
    this.vGrid.vGridConfig.columnWidthArray.push(this.vColWidth);
    this.vGrid.vGridConfig.headerArray.push(this.vColHeader || "");
    this.vGrid.vGridConfig.filterArray.push(this.vColDefaultFilter || "=");
    this.vGrid.vGridConfig.colCustomArray.push(this.template);
    this.vGrid.vGridConfig.filterOnKeyArray.push(this.vColFilterOnKey === "true" ? true : false);



  }

  attached(){

  }




}
