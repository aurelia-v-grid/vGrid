/*****************************************************************************************************************
 *    VGridRowCellCheckbox
 *    Custom element for use in the row/column container (v-grid-row-col.js)
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

//keeping one for each, so its easier to maintain if I do something special later

import {inject, customElement, bindable} from 'aurelia-framework';
import {VGrid} from './v-grid'



/*******************************************
 *  Normal input for checkbox
 *******************************************/

@customElement('v-grid-checkbox')
@inject(Element, VGrid)
export class VGridRowCellCheckbox {
  @bindable value;
  @bindable customStyle;


  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
  }


  valueChanged(value, old) {
    if (value === undefined || value === null || value === "") {
      this.content.style.display = "none";
    } else {
      this.content.style.display = "block";
      this.content.checked = value;
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
    this.content.type = "checkbox";
    this.content.onclick = function (e) {
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
    this.content.classList.add(this.parent.vGrid.vGridConfig.css.cellContent);
    this.content.style.height = "100%";
    this.content.style.margin = "auto";
    this.content.style.position = "initial";
    this.content.style.display = "block";
    this.content.style.opacity = "initial";
    this.element.appendChild(this.content);
    this.valueChanged(this.value);

    this.content.onchange = ()=> {
      this.parent.updateValue(this.content.checked);
    };

    //set column no
    this.content.columnNo = parseInt(this.parent.columnNo);

    //called when tabbing etc
    this.content.addEventListener("cellFocus", function (e) {
      this.content.focus();
    }.bind(this));

  }
}

