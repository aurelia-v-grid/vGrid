/*****************************************************************************************************************
 *    VGridCellRowHeader
 *    Custom element controlling the cell logic of header
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, noView, customElement, processContent, Container, bindable, ViewSlot} from 'aurelia-framework';
//for kendo ui bridge, remove import above
//import {noView, customElement, processContent, bindable, ViewSlot} from 'aurelia-templating';
//import {inject, Container} from 'aurelia-dependency-injection';
import {VGrid} from './v-grid';


@noView
@customElement('v-grid-header-col')
@processContent(false)
@inject(Element, VGrid, Container)
export class VGridCellRowHeader {
  @bindable columnNo;


  /*****************************************************
   *  constructor
   ******************************************************/
  constructor(element, vGrid, container) {
    this.element = element;
    this.vGrid = vGrid;
    this.container = container;
    this.vGridConfig = vGrid.vGridConfig;
  }


  /*****************************************************
   *  element event
   ******************************************************/
  bind(bindingContext) {
    this.bindingContext = bindingContext;
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

    let tempHtml = this.vGridConfig.colHeaderTemplateArray[this.columnNo];//`<input  class="form-control input-sm " value.bind="tempRef.index" style="background-color:transparent;height: 100%">`
    var viewFactory = this.vGrid.viewCompiler.compile(`<template>${tempHtml}</template>`, this.vGrid.viewResources);
    //create view and viewslot
    var view = viewFactory.create(this.container);
    this.viewSlot = new ViewSlot(this.element, true);
    this.viewSlot.add(view);
    this.viewSlot.bind(this);
    this.viewSlot.attached();

  }



  setStandardClassesAndStyles() {
    this.element.classList.add(this.vGridConfig.css.rowHeaderCell);
    this.element.classList.add(this.vGridConfig.css.rowHeaderColumn + this.columnNo);
    this.element.classList.add(this.vGridConfig.css.gridColumn + this.columnNo);
    this.element.style.height = '100%';
    this.element.style.width = this.vGridConfig.columnWidthArray[this.columnNo] + 'px';
  }

}
