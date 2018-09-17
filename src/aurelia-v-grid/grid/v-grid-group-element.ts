import { customElement } from '@aurelia/runtime';
import { inject } from '@aurelia/kernel';
import { VGrid } from './v-grid';



/**
 * Custom element <v-grid-group-element>
 * This is used for creating custom grouping element
 * The ones in the top panel
 *
 */
@customElement('v-grid-group-element')
@inject(Element, VGrid)
export class VGridGroupElement {
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
    this.vGrid.colGroupElement = this.template;
  }

}
