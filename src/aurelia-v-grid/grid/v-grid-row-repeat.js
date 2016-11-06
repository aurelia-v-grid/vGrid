//TODO not in use atm

/*import {inject, noView, customElement, processContent, Container, TargetInstruction,bindable, ViewSlot} from 'aurelia-framework';
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


  constructor(element, vGrid, targetInstruction) {
    this.element = element;
    this.vGrid = vGrid;
    this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
    this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;

  }


  bind(bindingContext) {
    this.bindingContext = bindingContext;
    this.vGrid.vGridConfig.repeater = true;
    this.vGrid.vGridConfig.repeatRowTemplate = this.rowTemplate;
    this.vGrid.vGridConfig.repeatRowHeaderTemplate = this.headerTemplate;
  }




}*/
