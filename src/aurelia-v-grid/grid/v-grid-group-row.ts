import { customElement } from '@aurelia/runtime';
import { inject } from '@aurelia/kernel';
import { VGrid } from './v-grid';


/**
 * Custom element <v-grid-group-row>
 * This is used for creating custom rows in grouping
 * The one holding the group value / full width rows
 *
 */

@customElement('v-grid-group-row')
@inject(Element, VGrid)
export class VGridGroupRow {
  private element: Element;
  private vGrid: VGrid;
  private rowTemplate: string;



  constructor(element: Element, vGrid: VGrid) {
    this.element = element;
    this.vGrid = vGrid;
    this.rowTemplate = element.innerHTML;
    element.innerHTML = '';

  }


  /**
   * add the markup to vgrid class for use later when generating the grid
   *
   */
  public bind(): void {
    this.vGrid.colGroupRow = this.rowTemplate;
  }

}
