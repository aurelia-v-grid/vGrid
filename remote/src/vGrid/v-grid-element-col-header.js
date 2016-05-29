/*****************************************************************************************************************
 *    VGridCellRowHeader
 *    Custom element controlling the cell logic of header
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customElement, bindable} from 'aurelia-framework';
//for kendo ui bridge, remove import above
//import {customElement, bindable} from 'aurelia-templating';
//import {inject} from 'aurelia-dependency-injection';
import {VGrid} from './v-grid';


@customElement('v-grid-header-col')
@inject(Element, VGrid)
export class VGridElementColHeader {
  @bindable columnNo;


  /*****************************************************
   *  constructor
   ******************************************************/
  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
    this.vGridConfig = vGrid.vGridConfig;
  }


  /*****************************************************
   *  element event
   ******************************************************/
  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  }


  /*****************************************************
   *  element event
   ******************************************************/
  created() {
    ///nothing atm
  }


  /*****************************************************
   *  element event
   ******************************************************/
  attached() {
    this.setStandardClassesAndStyles();
  }



  setStandardClassesAndStyles() {
    this.element.classList.add(this.vGridConfig.css.rowHeaderCell);
    this.element.classList.add(this.vGridConfig.css.rowHeaderColumn + this.columnNo);
    this.element.classList.add(this.vGridConfig.css.gridColumn + this.columnNo);
    this.element.style.height = '100%';
    this.element.style.width = this.vGridConfig.colConfig[this.columnNo].width + 'px';
  }

}
