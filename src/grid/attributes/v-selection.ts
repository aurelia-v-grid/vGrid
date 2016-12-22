import { bindable, inject, customAttribute } from 'aurelia-framework';
import { VGrid } from '../v-grid';
import { Controller, BindingContext, OverrideContext } from '../../interfaces';

@customAttribute('v-selection')
@inject(Element, VGrid)
export class VGridAttributesSelection {
  private element: HTMLInputElement;
  private vGrid: VGrid;
  private controller: Controller;
  private bindingContext: BindingContext;
  private overrideContext: OverrideContext;
  @bindable private selected: boolean;
  @bindable private type: string;

  constructor(element: HTMLInputElement, vGrid: VGrid) {
    this.vGrid = vGrid;
    this.controller = vGrid.controller;
    this.element = element;
  }

  public selectedChanged(newValue: boolean): void {
    if (this.type === 'row') {
      (this.element as HTMLInputElement).checked = newValue;
    }
  }

  public bind(bindingContext: BindingContext, overrideContext: OverrideContext): void {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  }

  public attached(): void {

    this.element.checked = this.selected;
    this.element.onclick = () => {

      // todo, check... think ff had something weird here
      let status = (this.element.checked as any) === 'true' || this.element.checked === true ? true : false;

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
          this.bindingContext.selection.deSelect(this.bindingContext.row);
          this.controller.rowClickHandler.updateSelectionOnAllRows();
        }
      }

    };

  }

}
