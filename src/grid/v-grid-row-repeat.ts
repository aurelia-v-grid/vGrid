import { inject, noView, customElement, processContent, TargetInstruction } from 'aurelia-framework';
import { VGrid } from './v-grid';
import { ViewCompiler, ViewResources, CustomTargetInstruction, CustomBehaviorInstruction } from '../interfaces';


/**
 * Custom element <v-grid-row-repeat>
 * This is used for creating custom row repeat
 * Row repeat is just a full grid with row without no column
 * Thisone is useful for when you need to for repeated
 * 
 */
@noView()
@customElement('v-grid-row-repeat')
@processContent((
  compiler: ViewCompiler,
  resources: ViewResources,
  element: Element,
  instruction: CustomBehaviorInstruction) => {

  // dont use  
  compiler = null;
  resources = null;

  // check if any header template is added, if so add to instruction for use
  let headerTemplateElement = element.getElementsByTagName('V-HEADER-TEMPLATE')[0];
  let headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
  if (headerTemplateHtml !== '') {
    instruction.headerTemplate = headerTemplateHtml;
  }

  // check if any row template is added, if so add to instruction for use
  let rowTemplateElement = element.getElementsByTagName('V-ROW-TEMPLATE')[0];
  let rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
  if (rowTemplateHtml !== '') {
    instruction.rowTemplate = rowTemplateHtml;
  }

  // if we didnt get anything we use it all
  if (!rowTemplateHtml) {
    instruction.rowTemplate = element.innerHTML;
  }

  element.innerHTML = '';

})
@inject(Element, VGrid, TargetInstruction)
export class VGridElementRowRepeat {
  private element: Element;
  private vGrid: VGrid;
  private rowTemplate: string;
  private headerTemplate: string;

  constructor(element: Element, vGrid: VGrid, targetInstruction: CustomTargetInstruction) {
    this.element = element;
    this.vGrid = vGrid;
    this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
    this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;

  }



  /**
   * add the markup to vgrid class for use later when generating the grid
   * 
   */
  public bind(): void {
    this.vGrid.colRepeater = true;
    this.vGrid.colRepeatRowTemplate = this.rowTemplate;
    this.vGrid.colRepeatRowHeaderTemplate = this.headerTemplate;
  }

}
