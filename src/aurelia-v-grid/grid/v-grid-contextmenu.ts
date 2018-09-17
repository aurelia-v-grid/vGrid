import { customElement } from '@aurelia/runtime';
import { inject } from '@aurelia/kernel';
import { VGrid } from './v-grid';

/**
 * Custom element <v-grid-contextmenu>
 * This is used for creating custom menus markup
 *
 */

@customElement('v-grid-contextmenu')
@inject(Element, VGrid)
export class VGridContextmenu {
  private element: Element;
  private vGrid: VGrid;
  private customMenuTemplates: any;



  constructor(element: Element, vGrid: VGrid) {
    this.element = element;
    this.vGrid = vGrid;
    this.customMenuTemplates = {};

    // Check if any templates are added, if so add to instruction for use
    let template = element.getElementsByTagName('V-MENU-CLOSE')[0];
    let templateHTML = template ? template.innerHTML : null;
    if (templateHTML !== '') {
      this.customMenuTemplates.close = templateHTML;
    }

    template = element.getElementsByTagName('V-MENU-PINNED')[0];
    templateHTML = template ? template.innerHTML : null;
    if (templateHTML !== '') {
      this.customMenuTemplates.pinned = templateHTML;
    }

    template = element.getElementsByTagName('V-MENU-GROUPBY')[0];
    templateHTML = template ? template.innerHTML : null;
    if (templateHTML !== '') {
      this.customMenuTemplates.groupby = templateHTML;
    }

    template = element.getElementsByTagName('V-MENU-HIDE')[0];
    templateHTML = template ? template.innerHTML : null;
    if (templateHTML !== '') {
      this.customMenuTemplates.hide = templateHTML;
    }

    template = element.getElementsByTagName('V-MENU-COPYPASTE')[0];
    templateHTML = template ? template.innerHTML : null;
    if (templateHTML !== '') {
      this.customMenuTemplates.copypaste = templateHTML;
    }

    template = element.getElementsByTagName('V-MENU-CHOOSER')[0];
    templateHTML = template ? template.innerHTML : null;
    if (templateHTML !== '') {
      this.customMenuTemplates.chooser = templateHTML;
    }

    template = element.getElementsByTagName('V-MENU-CHOOSER-OPTIONS')[0];
    templateHTML = template ? template.innerHTML : null;
    if (templateHTML !== '') {
      this.customMenuTemplates.chooserOptions = templateHTML;
    }

    template = element.getElementsByTagName('V-MENU-SORT')[0];
    templateHTML = template ? template.innerHTML : null;
    if (templateHTML !== '') {
      this.customMenuTemplates.sort = templateHTML;
    }

    template = element.getElementsByTagName('V-MENU-FILTER')[0];
    templateHTML = template ? template.innerHTML : null;
    if (templateHTML !== '') {
      this.customMenuTemplates.filter = templateHTML;
    }

    template = element.getElementsByTagName('V-MENU-FILTER-OPTIONS')[0];
    templateHTML = template ? template.innerHTML : null;
    if (templateHTML !== '') {
      this.customMenuTemplates.filterOptions = templateHTML;
    }

    template = element.getElementsByTagName('V-MENU-ALL')[0];
    templateHTML = template ? template.innerHTML : null;
    if (templateHTML !== '') {
      this.customMenuTemplates.all = templateHTML;
    }

    // clear the innerhtml, not needed, and we dont want it there messing up stuff
    element.innerHTML = '';
  }



  /**
   * Add the templates to vGrid class for use later when we generate the grid
   *
   */
  public bind(): void {
    this.vGrid.customMenuTemplates = this.customMenuTemplates;
  }

}
