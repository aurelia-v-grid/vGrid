import { bindable, inject, customAttribute } from 'aurelia-framework';
import { VGrid } from '../v-grid';
// for typings
import { Controller } from '../controller';

@customAttribute('v-selection')
@inject(Element, VGrid)
export class VGridAttributesSelection {
  private element: any;
  private vGrid: VGrid;
  private controller: Controller;
  private bindingContext: any;
  private overrideContext: any;
  @bindable private selected;
  @bindable private type;

  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.controller = vGrid.controller;
    this.element = element;
  }

  public selectedChanged(newValue: boolean, oldValue: boolean): void {
    if (this.type === 'row') {
      this.element.checked = newValue;
    }
  }


  public bind(bindingContext: any, overrideContext: any): void {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  }


  public attached(): void {

    this.element.checked = this.selected;
    this.element.onclick = () => {

      let status = this.element.checked === 'true' || this.element.checked === true ? true : false;

      if (status) {
        if (this.type === 'header') {
          this.bindingContext.selection.selectRange(0, this.controller.collectionLength() - 1);
          this.controller.rowClickHandler.updateSelectionOnAllRows();
        }
        if (this.type === 'row') {
          this.bindingContext.selection.select(this.bindingContext.row, true);
          this.controller.rowClickHandler.updateSelectionOnAllRows();
        }
      } else {

        if (this.type === 'header') {
          this.bindingContext.selection.deSelectAll();
          this.controller.rowClickHandler.updateSelectionOnAllRows();
        }

        if (this.type === 'row') {
          this.bindingContext.selection.deSelect(this.bindingContext.row, true);
          this.controller.rowClickHandler.updateSelectionOnAllRows();
        }
      }

    };


  }


}
