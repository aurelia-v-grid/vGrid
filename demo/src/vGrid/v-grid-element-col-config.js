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

  //we want to get this css attribute and use if later
  var css = element.getAttribute("css");
  if (css) {
    instruction.rowCSS = css;
  }


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
  @bindable attributeLabel; //for custom attibutes they want to add
  @bindable attributeFilter; //for custom attibutes they want to add
  @bindable attributeRow; //for custom attibutes they want to add
  @bindable type; //default = text
  @bindable css;


  constructor(element, vGrid, targetInstruction) {
    this.vGrid = vGrid;
    this.element = element;
    this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
    this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;
    this.cssString = targetInstruction.elementInstruction.rowCSS;
  }


  bind(bindingContext, overrideContext) {
    this.vGrid.vGridConfig.columnLength++; //count columns

    this.vGrid.vGridConfig.colConfig.push({
      width: this.width || 100,
      rowTemplate: this.rowTemplate,
      headerTemplate: this.headerTemplate,
      attribute: this.attribute,
      header: this.header,
      attributeLabel: this.attributeLabel,
      attributeFilter: this.attributeFilter,
      attributeRow: this.attributeRow,
      sort: this.sort,
      filter: this.filter,
      filterTop: this.filterTop === "true" ? true : false,
      css: this.cssString,
      type: this.type || "text"
    });


  }


}
