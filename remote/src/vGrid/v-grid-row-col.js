/*****************************************************************************************************************
 *    VGridCellContainer
 *    Custom element controlling the cell logic, this creates new elements depending on type
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, noView, customElement, processContent, Container, bindable, ViewSlot} from 'aurelia-framework';
//import {noView, customElement, processContent, bindable, ViewSlot} from 'aurelia-templating';
//import {inject, Container} from 'aurelia-dependency-injection';
import {VGrid} from './v-grid';


@noView()
@customElement('v-grid-row-col')
@processContent(false)
@inject(Element, VGrid, Container)
export class VGridCellContainer {
  @bindable columnNo;


  /**************************************************
   *  constrcutor, setting defaults
   **************************************************/
  constructor(element, vGrid, container) {
    this.element = element;
    this.container = container;
    this.vGrid = vGrid;
  }


  /**************************************************
   *  element event
   **************************************************/
  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    //need to rebind if created and bind is called
    if (this.viewSlot){
      this.viewSlot.bind(this.bindingContext, {
        bindingContext: this.bindingContext,
        parentOverrideContext: this.overrideContext
      });
    }

  }


  /**************************************************
   *  element event
   **************************************************/
  created() {

  }


  /**************************************************
   *  element event
   **************************************************/
  attached() {

    //set basic styles for a cell
    this.setStandardClassesAndStyles();


    //create view
    var viewFactory = this.vGrid.viewCompiler.compile(`<template>${this.vGrid.vGridConfig.colCustomArray[this.columnNo]}</template>`, this.vGrid.viewResources);
    var view = viewFactory.create(this.container);

    //create viewslot
    this.viewSlot = new ViewSlot(this.element, true);
    this.viewSlot.add(view);
    this.viewSlot.bind(this.bindingContext, {
      bindingContext: this.bindingContext,
      parentOverrideContext: this.overrideContext
    });
    this.viewSlot.attached();




    //for sending back edbl click on row to user
    this.element.addEventListener("eventOnRowDblClick", function (e) {
      if (this.vGrid.vGridConfig.eventOnRowDblClick) {
        this.vGrid.vGridConfig.eventOnRowDblClick({
          evt: e,
          data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
          attribute: this.vGrid.vGridConfig.attributeArray[this.columnNo],
          row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
        });
      }
    }.bind(this));


    //for sending back row click to user
    this.element.addEventListener("eventOnRowClick", function (e) {
      if (this.vGrid.vGridConfig.eventOnRowClick) {
        this.vGrid.vGridConfig.eventOnRowClick({
          evt: e,
          data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
          attribute: this.vGrid.vGridConfig.attributeArray[this.columnNo],
          row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
        });
      }
    }.bind(this));

  }





  /**************************************************
   *  gets current row
   **************************************************/
  getRow() {
    return parseInt(this.element.parentNode.getAttribute("row"));
  }




  setStandardClassesAndStyles() {
    var css = this.vGrid.vGridConfig.css;
    var cellStyle = `width:${this.vGrid.vGridConfig.columnWidthArray[this.columnNo]}px`;
    this.element.classList.add(css.rowCell);
    this.element.classList.add(css.rowColumn + this.columnNo);
    this.element.classList.add(css.gridColumn + this.columnNo);
    this.element.setAttribute("style", cellStyle);
  }


}
