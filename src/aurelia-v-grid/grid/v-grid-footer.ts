import { customElement } from '@aurelia/runtime';
import { inject } from '@aurelia/kernel';
import { VGrid } from './v-grid';



/**
 * Custom element <v-grid-footer>
 * This is used for creating custom footer markup
 *
 */

@customElement({
  name: 'v-grid-footer',
  templateOrNode: '',
  build: {
    required: true,
    compiler: 'default'
  },
  instructions: []
})
@inject(Element, VGrid)
export class VGridFooter {
  private element: Element;
  private vGrid: VGrid;
  private template: string;



  constructor(element: Element, vGrid: VGrid) {
    this.element = element;
    this.vGrid = vGrid;
    this.template = element.innerHTML;
    element.innerHTML = '';

  }



  /**
   * add the markup to vgrid class for use later when generating the grid
   *
   */
  public bind(): void {
    this.vGrid.footerTemplate = this.template;
  }

}
