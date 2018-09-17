import { customElement } from '@aurelia/runtime';
import { inject } from '@aurelia/kernel';
import { VGrid } from './v-grid';


/**
 * Custom element <v-grid-loadingscreen>
 * This is used for creating custom loading screen
 *
 */


@customElement({
  name: 'v-grid-loadingscreen',
  templateOrNode: '',
  build: {
    required: true,
    compiler: 'default'
  },
  instructions: []
})
@inject(Element, VGrid)
export class VGridLoadingScreen {
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
    this.vGrid.loadingScreenTemplate = this.template;
  }

}
