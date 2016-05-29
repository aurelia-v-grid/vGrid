/*****************************************************************************************************************
 *    VGridCol
 *    This is just for getting the params for v-grid-col to create the grid
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

import {inject, noView, customElement, bindable, processContent, TargetInstruction} from 'aurelia-framework';
//for kendo ui bridge, remove import above
//import {bindable, noView,processContent,  customElement, TargetInstruction} from 'aurelia-templating';
//import {inject, Optional} from 'aurelia-dependency-injection';
import {VGrid} from './v-grid';

@noView()
@processContent((compiler, resources, element, instruction) => {

  var headerTemplateElement = element.getElementsByTagName("V-HEADER-TEMPLATE")[0];
  let headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML:null;
  if (headerTemplateHtml !== '') {
    instruction.headerTemplate = headerTemplateHtml;
  } else {
    //TODO: future supply template to simplify user experience ?
  }
    
  var rowTemplateElement = element.getElementsByTagName("V-ROW-TEMPLATE")[0];
  let rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML:null;
  if (rowTemplateHtml !== '') {
    instruction.rowTemplate = rowTemplateHtml;
  } else {
    //TODO: future supply template to simplify user experience ?
  }

  element.innerHTML = '';

})
@customElement('v-grid-col')
@inject(Element, VGrid, TargetInstruction)
export class VGridElementColConfig {
  @bindable vColWidth;


  /*****************************************************
   *  constructor
   ******************************************************/
  constructor(element, vGrid, targetInstruction) {
    this.vGrid = vGrid;
    this.element = element;
    this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
    this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;
  }


  /*****************************************************
   *  element event
   ******************************************************/
  bind(bindingContext, overrideContext) {
    this.vGrid.vGridConfig.columnLenght++; //count columns
    
    this.vGrid.vGridConfig.colConfig.push({
      width:this.vColWidth || 100,
      rowTemplate:this.rowTemplate,
      headerTemplate:this.headerTemplate
    })
    
    
  }




}
