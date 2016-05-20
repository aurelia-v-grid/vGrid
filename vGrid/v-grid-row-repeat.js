/*****************************************************************************************************************
 *    VGridRowRepeat
 *    Custom element just repeating the heml inside it for each row
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {noView, customElement, processContent, bindable, ViewSlot} from 'aurelia-templating';
import {inject, Container} from 'aurelia-dependency-injection';
import {VGrid} from './v-grid';


@noView()
@customElement('v-grid-row-repeat')
@processContent(false)
@inject(Element, VGrid, Container)
export class VGridRowRepeat {


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
  bind(bindingContext) {
    this.bindingContext = bindingContext;
    this.vGrid.vGridConfig.repeater = true;
    this.vGrid.vGridConfig.repeatTemplate = this.element.innerHTML;
  }




}
