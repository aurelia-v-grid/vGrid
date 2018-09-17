import { customElement } from '@aurelia/runtime';
import { inject } from '@aurelia/kernel';
import { VGrid } from './v-grid';


/**
 * Custom element <v-grid-row-repeat>
 * This is used for creating custom row repeat
 * Row repeat is just a full grid with row without no column
 * Thisone is useful for when you need to for repeated
 *
 */
@customElement({
  name: 'v-grid-row-repeat',
  templateOrNode: '',
  build: {
    required: true,
    compiler: 'default'
  },
  instructions: []
})
@inject(Element, VGrid)
export class VGridElementRowRepeat {
  private element: Element;
  private vGrid: VGrid;
  private rowTemplate: string;
  private headerTemplate: string;

  constructor(element: Element, vGrid: VGrid) {
    this.element = element;
    this.vGrid = vGrid;

    let headerTemplateElement = element.getElementsByTagName('V-HEADER-TEMPLATE')[0];
    let headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
    if (headerTemplateHtml !== '') {
      this.headerTemplate = headerTemplateHtml;
    }

    // check if any row template is added, if so add to instruction for use
    let rowTemplateElement = element.getElementsByTagName('V-ROW-TEMPLATE')[0];
    let rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
    if (rowTemplateHtml !== '') {
      this.rowTemplate = rowTemplateHtml;
    }

    element.innerHTML = '';

  }



  /**
   * add the markup to vgrid class for use later when generating the grid
   *
   */
  public bind(): void {
    this.vGrid.colRepeater = true;
    this.vGrid.colRepeatRowTemplate = this.rowTemplate;
    this.vGrid.colRepeatRowHeaderTemplate = this.headerTemplate;
  }

}
