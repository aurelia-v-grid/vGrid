/*****************************************************************************************************************
 *    VGridCellRowHeader
 *    Custom element, cell container for header columns
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customElement, bindable} from 'aurelia-framework';
import {VGrid} from './v-grid';


@customElement('v-grid-header-col')
@inject(Element, VGrid)
export class VGridElementHeaderCol {
  @bindable columnNo;


  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
    this.vGridConfig = vGrid.vGridConfig;
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  }


  created() {
    ///nothing atm
  }


  attached() {
    this.setStandardClassesAndStyles();
  }


  setStandardClassesAndStyles() {
    this.element.classList.add(this.vGridConfig.css.rowHeaderCell);
    this.element.classList.add(this.vGridConfig.css.rowHeaderColumn + this.columnNo);
    //this.element.classList.add(this.vGridConfig.css.gridColumn + this.columnNo);
    this.element.style.height = '100%';
    this.element.style.width = this.vGridConfig.colConfig[this.columnNo].width + 'px';
  }

}
