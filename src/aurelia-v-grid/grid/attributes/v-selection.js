import {bindable, inject, customAttribute} from 'aurelia-framework';
import {VGrid} from '../v-grid';


@customAttribute('v-selection')
@inject(Element, VGrid)
export class vGridAttributesSelection {
  @bindable selected;
  @bindable type;


  selectedChanged(newValue, oldValue) {
    if (this.type === "row") {
      this.element.checked = newValue;
    }
  }


  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.controller = vGrid.controller;
    this.element = element;
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  }


  attached() {

    this.element.checked = this.selected;


    this.element.onclick = () => {

      var status = this.element.checked === "true" || this.element.checked === true ? true : false;

      if (status) {
        if (this.type === "header") {
          this.bindingContext.selection.selectRange(0, this.controller.collectionLength() - 1);
          this.controller.rowClickHandler.updateSelectionOnAllRows();
        }
        if (this.type === "row") {
          this.bindingContext.selection.select(this.bindingContext.row, true);
          this.controller.rowClickHandler.updateSelectionOnAllRows();
        }
      } else {

        if (this.type === "header") {
          this.bindingContext.selection.deSelectAll();
          this.controller.rowClickHandler.updateSelectionOnAllRows();
        }

        if (this.type === "row") {
          this.bindingContext.selection.deSelect(this.bindingContext.row, true);
          this.controller.rowClickHandler.updateSelectionOnAllRows();
        }
      }

    };


  }


}
