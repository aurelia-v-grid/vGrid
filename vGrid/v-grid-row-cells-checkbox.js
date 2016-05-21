/*****************************************************************************************************************
 *    VGridRowCellCheckbox
 *    Custom element for use in the row/column container (v-grid-row-col.js)
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customElement, bindable} from 'aurelia-framework';
//import {bindable, customElement} from 'aurelia-templating';
//import {inject} from 'aurelia-dependency-injection';



/*******************************************
 *  Normal input for checkbox
 *******************************************/

@customElement('v-grid-checkbox')
@inject(Element)
export class VGridRowCellCheckbox {
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
    if (value === undefined || value === null || value === "") {
      this.content.style.display = "none";
    } else {
      this.content.style.display = "block";
      this.content.checked = value;
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
      if(!this.parent.readOnly() && this.parent.editMode()){
        this.parent.updateValue(this.content.checked);
      } else {
        this.content.checked = this.value;
      }
    };

    //set column no
    this.content.columnNo = parseInt(this.parent.columnNo);

    //called when tabbing etc
    this.content.addEventListener("cellFocus", function (e) {
      this.content.focus();
    }.bind(this));

  }
}
