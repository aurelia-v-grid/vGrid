import { inject, noView, customElement, processContent, TargetInstruction } from 'aurelia-framework';
import { VGrid } from './v-grid';
import { ViewCompiler, ViewResources } from '../interfaces';


@noView()
@customElement('v-grid-row-repeat')
@processContent((
  compiler: ViewCompiler,
  resources: ViewResources,
  element: Element,
  instruction: TargetInstruction) => {

  let headerTemplateElement = element.getElementsByTagName('V-HEADER-TEMPLATE')[0];
  let headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
  if (headerTemplateHtml !== '') {
    (instruction as any).headerTemplate = headerTemplateHtml;
  }

  let rowTemplateElement = element.getElementsByTagName('V-ROW-TEMPLATE')[0];
  let rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
  if (rowTemplateHtml !== '') {
    (instruction as any).rowTemplate = rowTemplateHtml;
  }

  // if we didnt get anything we use it all
  if (!rowTemplateHtml) {
    (instruction as any).rowTemplate = element.innerHTML;
  }

  element.innerHTML = '';

})
@inject(Element, VGrid, TargetInstruction)
export class VGridElementRowRepeat {
  private element: Element;
  private vGrid: VGrid;
  private rowTemplate: string;
  private headerTemplate: string;

  constructor(element: Element, vGrid: VGrid, targetInstruction: TargetInstruction) {
    this.element = element;
    this.vGrid = vGrid;
    this.rowTemplate = (targetInstruction.elementInstruction as any).rowTemplate;
    this.headerTemplate = (targetInstruction.elementInstruction as any).headerTemplate;

  }


  public bind(): void {
    this.vGrid.colRepeater = true;
    this.vGrid.colRepeatRowTemplate = this.rowTemplate;
    this.vGrid.colRepeatRowHeaderTemplate = this.headerTemplate;
  }


}
