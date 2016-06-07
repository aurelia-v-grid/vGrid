/*****************************************************************************************************************
 *    Attributes for row/header, enables checkbox , manual selection much be used with this
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from './v-grid';


@customAttribute('v-selection')
@inject(Element, VGrid)
export class vGridAttributesSelection {

  
  
  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
    this.false = true;
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    if (this.created) {
      this.selected = this.vGrid.vGridSelection.isSelected(this.bindingContext.row);
      this.element.checked = this.selected;
    }
  }


  attached() {

    this.created = true;
    this.selected = this.vGrid.vGridSelection.isSelected(this.bindingContext.row);
    this.element.checked = this.selected;

    this.element.onclick = (e) => { 

      var status = this.element.checked === "true" || this.element.checked === true ? true : false;

      if (status) {
        if (this.value === "header") {
          this.vGrid.vGridSelection.selectAll();
          this.vGrid.vGridGenerator.rebindAllRowSlots();
        }
        if (this.value === "row") {
          this.vGrid.vGridSelection.select(this.bindingContext.row, true);
          this.vGrid.vGridGenerator.rebindRowNumber(this.bindingContext.row);
        }
      } else {

        if (this.value === "header") {
          this.vGrid.vGridSelection.deSelectAll();
          this.vGrid.vGridGenerator.rebindAllRowSlots();
        }

        if (this.value === "row") {
          this.vGrid.vGridSelection.deSelect(this.bindingContext.row, true);
          this.vGrid.vGridGenerator.rebindRowNumber(this.bindingContext.row);
        }
      }

    }


  }


}
