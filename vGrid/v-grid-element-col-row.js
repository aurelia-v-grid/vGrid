/*****************************************************************************************************************
 *    VGridCellContainer
 *    Custom element, cell container for rows columns
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customElement, bindable} from 'aurelia-framework';
import {VGrid} from './v-grid';


@customElement('v-grid-row-col')
@inject(Element, VGrid)
export class VGridElementColRow {
  @bindable columnNo;


  constructor(element, vGrid, container) {
    this.element = element;
    this.vGrid = vGrid;
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  }


  created() {
    //nothin atm
  }


  attached() {
    //set basic styles for a cell
    this.setStandardClassesAndStyles();
  }


  setStandardClassesAndStyles() {
    var css = this.vGrid.vGridConfig.css;
    var cellStyle = `width:${this.vGrid.vGridConfig.colConfig[this.columnNo].width}px`;
    this.element.classList.add(css.rowCell);
    this.element.classList.add(css.rowColumn + this.columnNo);
    this.element.classList.add(css.gridColumn + this.columnNo);
    this.element.setAttribute("style", cellStyle);
  }


}
