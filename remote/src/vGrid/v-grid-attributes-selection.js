/*****************************************************************************************************************
 *    Attributes for seelction so users can add to headers to activate selection by checkbox
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute, Optional} from 'aurelia-framework';
//for kendo ui bridge, remove import above
//import {customAttribute} from 'aurelia-templating';
//import {inject, Optional} from 'aurelia-dependency-injection';
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

    this.element.onclick = function (e) { //arrow function gives me wrong context! TODO:fix later

      var status = this.element.checked === "true" || this.element.checked === true ? true : false;

      if (status) {
        if (this.value === "header") {
          this.vGrid.vGridSelection.selectAll();
          this.vGrid.vGridGenerator.fillDataInRows();
        }
        if (this.value === "row") {
          this.vGrid.vGridSelection.select(this.bindingContext.row, true);
          this.vGrid.vGridGenerator.fillDataIntoRow(this.bindingContext.row);
        }
      } else {

        if (this.value === "header") {
          this.vGrid.vGridSelection.deSelectAll();
          this.vGrid.vGridGenerator.fillDataInRows();
        }

        if (this.value === "row") {
          this.vGrid.vGridSelection.deSelect(this.bindingContext.row, true);
          this.vGrid.vGridGenerator.fillDataIntoRow(this.bindingContext.row);
        }
      }

    }.bind(this);


  }


}
