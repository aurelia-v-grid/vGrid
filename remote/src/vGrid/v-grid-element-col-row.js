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
export class VGridElementColRow {
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
    var viewFactory = this.vGrid.viewCompiler.compile(`<template>${this.vGrid.vGridConfig.colRowTemplateArray[this.columnNo]}</template>`, this.vGrid.viewResources);
    var view = viewFactory.create(this.container);

    //create viewslot
    this.viewSlot = new ViewSlot(this.element, true);
    this.viewSlot.add(view);
    this.viewSlot.bind(this.bindingContext, {
      bindingContext: this.bindingContext,
      parentOverrideContext: this.overrideContext
    });
    this.viewSlot.attached();



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
