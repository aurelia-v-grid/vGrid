import { inject, noView, customElement, processContent, TargetInstruction } from 'aurelia-framework';
import { VGrid } from './v-grid';
import { ViewCompiler, ViewResources, CustomTargetInstruction, CustomBehaviorInstruction } from '../interfaces';

@noView()
@customElement('v-grid-group-row')
@processContent((
  compiler: ViewCompiler,
  resources: ViewResources,
  element: Element,
  instruction: CustomBehaviorInstruction) => {

  // dont use  
  compiler = null;
  resources = null;

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

  public bind(): void {
    this.vGrid.colGroupRow = this.rowTemplate;
  }

}
