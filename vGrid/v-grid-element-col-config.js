/*****************************************************************************************************************
 *    VGridCol
 *    This is just for getting the params for v-grid-col to create the grid
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

import {inject, noView, customElement, bindable, processContent, TargetInstruction} from 'aurelia-framework';
import {VGrid} from './v-grid';

@noView()
@processContent((compiler, resources, element, instruction) => {

  var headerTemplateElement = element.getElementsByTagName("V-HEADER-TEMPLATE")[0];
  let headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
  if (headerTemplateHtml !== '') {
    instruction.headerTemplate = headerTemplateHtml;
  }

  var rowTemplateElement = element.getElementsByTagName("V-ROW-TEMPLATE")[0];
  let rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
  if (rowTemplateHtml !== '') {
    instruction.rowTemplate = rowTemplateHtml;
  }

  element.innerHTML = '';

})
@customElement('v-grid-col')
@inject(Element, VGrid, TargetInstruction)
export class VGridElementColConfig {
  @bindable width;//default 100
  @bindable attribute;
  @bindable header; //if not set Upperstring first char of attribute
  @bindable sort; //default false
  @bindable filter; //default false
  @bindable filterTop;//default false
  @bindable filterOperator; //default
  @bindable contextmenuHeader; //default false
  @bindable contextmenuRow;//default false
  @bindable type; //default = text
  @bindable tempRef //default = false



  constructor(element, vGrid, targetInstruction) {
    this.vGrid = vGrid;
    this.element = element;
    this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
    this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;
  }


  capitalize = function (value) {
    if (value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      return "missing!"
    }
  };


  bind(bindingContext, overrideContext) {
    this.vGrid.vGridConfig.columnLength++; //count columns

    this.vGrid.vGridConfig.colConfig.push({
      width: this.vColWidth || 100,
      rowTemplate: this.rowTemplate,
      headerTemplate: this.headerTemplate,
      attribute: this.attribute,
      header: this.header || this.attribute ? this.capitalize(this.attribute) : null,
      sort: this.sort === "true" ? true : false,
      filter: this.filter === "true" ? true : false,
      filterTop: this.filterTop === "true" ? true : false,
      filterOperator: this.filterOperator || "=",
      contextmenuHeader: this.contextmenuHeader === "true" ? true : false,
      contextmenuRow: this.contextmenuRow === "true" ? true : false,
      type: this.type || "text",
      tempRef:this.tempRef || false
    });


  }




}
