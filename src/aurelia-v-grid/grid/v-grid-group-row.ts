import { inject, noView, customElement, processContent, TargetInstruction } from 'aurelia-framework';
import { VGrid } from './v-grid';
import { ViewCompiler, ViewResources, CustomTargetInstruction, CustomBehaviorInstruction } from '../interfaces';



/**
 * Custom element <v-grid-group-row>
 * This is used for creating custom rows in grouping
 * The one holding the group value / full width rows
 *
 */
@noView()
@customElement('v-grid-group-row')
@processContent((
  compiler: ViewCompiler,
  resources: ViewResources,
  element: Element,
  instruction: CustomBehaviorInstruction) => {

  // dont use
  compiler = compiler;
  resources = resources;

  // get html markup, this will be added to our viewport when we create it
  instruction.rowTemplate = element.innerHTML;
  element.innerHTML = '';

})
@inject(Element, VGrid, TargetInstruction)
export class VGridGroupRow {
  private element: Element;
  private vGrid: VGrid;
  private rowTemplate: string;



  constructor(element: Element, vGrid: VGrid, targetInstruction: CustomTargetInstruction) {
    this.element = element;
    this.vGrid = vGrid;
    this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;

  }


  /**
   * add the markup to vgrid class for use later when generating the grid
   *
   */
  public bind(): void {
    this.vGrid.colGroupRow = this.rowTemplate;
  }

}
