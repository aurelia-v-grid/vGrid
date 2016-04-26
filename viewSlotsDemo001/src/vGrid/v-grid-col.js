/**
 * Created by vegar on 4/26/2016.
 */
import {inject, Optional, customElement, bindable} from 'aurelia-framework';
import {VGrid} from './v-grid'

@customElement('v-grid-col')
@inject(Element, VGrid)
export class VGridCol {
  @bindable colWidth;
  @bindable attribute;
  @bindable header;
  @bindable defaultFilter;
  @bindable readOnly;
  @bindable colCss;
  @bindable colType;


  constructor(element, vGrid){
    this.vGrid = vGrid;
    this.element = element;
    //debugger;
  }


  bind(bindingContext, overrideContext){
    this.vGrid.vGridConfig.attributeArray.push(this.attribute);
    this.vGrid.vGridConfig.columnWidthArray.push(this.colWidth);
    this.vGrid.vGridConfig.headerArray.push(this.header || "");
    this.vGrid.vGridConfig.filterArray.push(this.defaultFilter || "?");
    this.vGrid.vGridConfig.readOnlyArray.push(this.readonly === "true" ? this.attribute : false);
    this.vGrid.vGridConfig.colStyleArray.push(this.colCss);
    this.vGrid.vGridConfig.colTypeArray.push(this.colType);


  }


}
