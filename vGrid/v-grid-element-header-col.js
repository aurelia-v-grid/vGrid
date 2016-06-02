/*****************************************************************************************************************
 *    VGridCellRowHeader
 *    Custom element, cell container for header columns
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customElement, bindable} from 'aurelia-framework';
import {VGrid} from './v-grid';

//I might delete this element, I havent decided yet

@customElement('v-grid-header-col')
@inject(Element, VGrid)
export class VGridElementHeaderCol {


  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  }


  created() {
    ///nothing atm
  }


  attached() {
    ///nothing atm
  }


}
