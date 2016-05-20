/*****************************************************************************************************************
 *    VGridRowCellImage
 *    Custom element for use in the row/column container (v-grid-row-col.js)
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

//keeping one for each, so its easier to maintain if I do something special later

import {inject, customElement, bindable} from 'aurelia-framework';
import {VGrid} from './v-grid'


/*******************************************
 *  Normal input for image
 *******************************************/

@customElement('v-grid-image')
@inject(Element, VGrid)
export class VGridRowCellImage {
  @bindable value;
  @bindable customStyle;


  /*****************************************************
   *  Constructor
   ******************************************************/
  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
  }


  /*****************************************************
   *  bindable event
   ******************************************************/
  valueChanged(value, old) {
    if (value === undefined) {
      this.content.style.display = "none";
      this.content.src = "";
    } else {
      this.content.style.display = "block";
      this.content.src = "";
      this.content.src = value;
    }
  }


  /*****************************************************
   *  bindable event
   ******************************************************/
  customStyleChanged(value, old) {

  }


  /*****************************************************
   *  element event
   ******************************************************/
  bind(parent) {
    this.parent = parent;
  }


  /*****************************************************
   *  element event
   ******************************************************/
  attached() {
    this.content = this.element.children[0];
    this.content.classList.add(this.parent.vGrid.vGridConfig.css.cellContent);
    this.valueChanged(this.value);
    this.content.style.margin = "auto";
    this.content.style.display = "none";
    this.element.appendChild(this.content);

    //set column no
    this.content.columnNo = parseInt(this.parent.columnNo);

    //called when tabbing etc
    this.content.addEventListener("cellFocus", function (e) {
      this.content.focus();
    }.bind(this));

  }


}
