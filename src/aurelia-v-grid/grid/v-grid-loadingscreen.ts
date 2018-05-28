import { inject, noView, customElement, processContent, TargetInstruction } from 'aurelia-framework';
import { VGrid } from './v-grid';
import { ViewCompiler, ViewResources, CustomTargetInstruction, CustomBehaviorInstruction } from '../interfaces';



/**
 * Custom element <v-grid-loadingscreen>
 * This is used for creating custom loading screen
 *
 */
@noView()
@customElement('v-grid-loadingscreen')
@processContent((
  compiler: ViewCompiler,
  resources: ViewResources,
  element: Element,
  instruction: CustomBehaviorInstruction) => {

  // dont use
  compiler = compiler;
  resources = resources;

  // get html markup, this will be added to our viewport when we create it
  instruction.template = element.innerHTML;
  element.innerHTML = '';

})
@inject(Element, VGrid, TargetInstruction)
export class VGridLoadingScreen {
  private element: Element;
  private vGrid: VGrid;
  private template: string;



  constructor(element: Element, vGrid: VGrid, targetInstruction: CustomTargetInstruction) {
    this.element = element;
    this.vGrid = vGrid;
    this.template = targetInstruction.elementInstruction.template;

  }


  /**
   * add the markup to vgrid class for use later when generating the grid
   *
   */
  public bind(): void {
    this.vGrid.loadingScreenTemplate = this.template;
  }

}
