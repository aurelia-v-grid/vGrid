/*****************************************************************************************************************
 *    VGridRowCell
 *    Custom element for use in the row/column container (v-grid-row-col.js)
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

//keeping one for each, so its easier to maintain if I do something special later

import {inject, noView, customElement, processContent, bindable} from 'aurelia-framework';
import {VGrid} from './v-grid'
import {VGridCellContainer} from './v-grid-row-col'


/*******************************************
 *  Normal input for text/numbers
 *******************************************/

@customElement('v-grid-input')
@inject(Element, VGrid)
export class VGridRowCellInput {
  @bindable value;
  @bindable customStyle;


  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
  }


  valueChanged(value, old) {
    if (value === undefined) {
      this.content.style.display = "none"
    } else {
      this.content.style.display = "block";
      this.content.value = value;
    }
  }

  customStyleChanged(value, old) {
    console.log("wow")
  }

  bind(parent) {
    this.parent = parent;
  }

  attached() {
    this.content = this.element.children[0];//document.createElement("input");
    this.content.type = "text";
    this.content.classList.add(this.parent.vGrid.vGridConfig.css.cellContent);
    this.content.style.height = "100%";
    this.content.style.width = "100%";
    this.element.appendChild(this.content);

    //set column no
    this.content.columnNo = parseInt(this.parent.columnNo);


    this.content.onchange = ()=> {
      this.parent.updateValue(this.content.value);
    };


    this.content.onblur = ()=> {
        this.parent.setValue(this.parent.getValue(this.value));
        this.parent.setCss();
    };


    this.content.onkeydown = function (e) {
      if (this.parent.readOnly() === true && e.keyCode !== 9) {
        return false;
      } else {
        if (!this.parent.editMode()) {
          return false;
        } else {
          return true;
        }
      }
    }.bind(this);


    //called when tabbing etc
    this.content.addEventListener("cellFocus", function (e) {
      this.content.focus();
    }.bind(this));

  }


}

