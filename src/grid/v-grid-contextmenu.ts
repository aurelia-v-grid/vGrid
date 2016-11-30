import { inject, noView, customElement, processContent, TargetInstruction } from 'aurelia-framework';
import { VGrid } from './v-grid';
import { ViewCompiler, ViewResources, CustomTargetInstruction, CustomBehaviorInstruction } from '../interfaces';

@noView()
@customElement('v-grid-contextmenu')
@processContent((
  compiler: ViewCompiler,
  resources: ViewResources,
  element: Element,
  instruction: CustomBehaviorInstruction) => {

  // dont use  
  compiler = null;
  resources = null;

  instruction.menuTemplates = {};
  let template: any;
  let templateHTML: any;

  template = element.getElementsByTagName('V-MENU-CLOSE')[0];
  templateHTML = template ? template.innerHTML : null;
  if (templateHTML !== '') {
    instruction.menuTemplates.close = templateHTML;
  }

  template = element.getElementsByTagName('V-MENU-PINNED')[0];
  templateHTML = template ? template.innerHTML : null;
  if (templateHTML !== '') {
    instruction.menuTemplates.pinned = templateHTML;
  }

  template = element.getElementsByTagName('V-MENU-GROUPBY')[0];
  templateHTML = template ? template.innerHTML : null;
  if (templateHTML !== '') {
    instruction.menuTemplates.groupby = templateHTML;
  }

  template = element.getElementsByTagName('V-MENU-SORT')[0];
  templateHTML = template ? template.innerHTML : null;
  if (templateHTML !== '') {
    instruction.menuTemplates.sort = templateHTML;
  }

  template = element.getElementsByTagName('V-MENU-FILTER')[0];
  templateHTML = template ? template.innerHTML : null;
  if (templateHTML !== '') {
    instruction.menuTemplates.filter = templateHTML;
  }

  template = element.getElementsByTagName('V-MENU-FILTER-OPTIONS')[0];
  templateHTML = template ? template.innerHTML : null;
  if (templateHTML !== '') {
    instruction.menuTemplates.filterOptions = templateHTML;
  }

  template = element.getElementsByTagName('V-MENU-ALL')[0];
  templateHTML = template ? template.innerHTML : null;
  if (templateHTML !== '') {
    instruction.menuTemplates.all = templateHTML;
  }

  element.innerHTML = '';

})
@inject(Element, VGrid, TargetInstruction)
export class VGridContextmenu {
  private element: Element;
  private vGrid: VGrid;
  private customMenuTemplates: any;

  constructor(element: Element, vGrid: VGrid, targetInstruction: CustomTargetInstruction) {
    this.element = element;
    this.vGrid = vGrid;
    this.customMenuTemplates = targetInstruction.elementInstruction.menuTemplates;
  }

  public bind(): void {
    this.vGrid.customMenuTemplates = this.customMenuTemplates;
  }

}
