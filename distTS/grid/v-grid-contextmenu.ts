import { inject, noView, customElement, processContent, TargetInstruction } from 'aurelia-framework';
import { VGrid } from './v-grid';
import { ViewCompiler, ViewResources, CustomTargetInstruction, CustomBehaviorInstruction } from '../interfaces';

/**
 * Custom element <v-grid-contextmenu>
 * This is used for creating custom menus markup
 *
 */
@noView()
@customElement('v-grid-contextmenu')
@processContent((
  compiler: ViewCompiler,
  resources: ViewResources,
  element: Element,
  instruction: CustomBehaviorInstruction) => {

  // dont use
  compiler = compiler;
  resources = resources;

  instruction.menuTemplates = {};
  let template: any;
  let templateHTML: any;

  // Check if any templates are added, if so add to instruction for use
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

  template = element.getElementsByTagName('V-MENU-HIDE')[0];
  templateHTML = template ? template.innerHTML : null;
  if (templateHTML !== '') {
    instruction.menuTemplates.hide = templateHTML;
  }

  template = element.getElementsByTagName('V-MENU-COPYPASTE')[0];
  templateHTML = template ? template.innerHTML : null;
  if (templateHTML !== '') {
    instruction.menuTemplates.copypaste = templateHTML;
  }

  template = element.getElementsByTagName('V-MENU-CHOOSER')[0];
  templateHTML = template ? template.innerHTML : null;
  if (templateHTML !== '') {
    instruction.menuTemplates.chooser = templateHTML;
  }

  template = element.getElementsByTagName('V-MENU-CHOOSER-OPTIONS')[0];
  templateHTML = template ? template.innerHTML : null;
  if (templateHTML !== '') {
    instruction.menuTemplates.chooserOptions = templateHTML;
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

  // clear the innerhtml, not needed, and we dont want it there messing up stuff
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



  /**
   * Add the templates to vGrid class for use later when we generate the grid
   *
   */
  public bind(): void {
    this.vGrid.customMenuTemplates = this.customMenuTemplates;
  }

}
