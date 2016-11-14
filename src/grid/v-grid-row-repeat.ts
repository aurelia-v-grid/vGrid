
import {inject, noView, customElement, processContent, TargetInstruction,bindable} from 'aurelia-framework';
import {VGrid} from './v-grid';


@noView()
@customElement('v-grid-row-repeat')
@processContent((compiler, resources, element, instruction) => {

  var headerTemplateElement = element.getElementsByTagName("V-HEADER-TEMPLATE")[0];
  let headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML:null;
  if (headerTemplateHtml !== '') {
    instruction.headerTemplate = headerTemplateHtml;
  }

  var rowTemplateElement = element.getElementsByTagName("V-ROW-TEMPLATE")[0];
  let rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML:null;
  if (rowTemplateHtml !== '') {
    instruction.rowTemplate = rowTemplateHtml;
  }

  //if we didnt get anything we use it all
  if(!rowTemplateHtml){
    instruction.rowTemplate = element.innerHTML;
  }

  element.innerHTML = '';

})
@inject(Element, VGrid, TargetInstruction)
export class VGridElementRowRepeat {
  element:Element;
  vGrid:VGrid;
  rowTemplate:string;
  headerTemplate:string;

  constructor(element, vGrid, targetInstruction) {
    this.element = element;
    this.vGrid = vGrid;
    this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
    this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;

  }


  bind() {
    this.vGrid.colRepeater = true;
    this.vGrid.colRepeatRowTemplate = this.rowTemplate;
    this.vGrid.colRepeatRowHeaderTemplate = this.headerTemplate;
  }




}
