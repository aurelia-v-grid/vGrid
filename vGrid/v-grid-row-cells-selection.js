/*****************************************************************************************************************
 *    VGridRowCellSelection
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

@customElement('v-grid-selection')
@inject(Element, VGrid)
export class VGridRowCellSelection {
  @bindable value;
  @bindable customStyle;


  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
  }


  valueChanged(value, old) {
    if (value === undefined || value === null || value === "") {
      this.content.style.display = "none";
      this.content.checked = false;
    } else {
      this.content.style.display = "block";
      this.content.checked = this.vGrid.vGridSelection.isSelected(this.parent.getRow());
    }
    if(this.parent.getRow() > this.vGrid.vGridCollectionFiltered.length-1){
      this.content.style.display = "none";
      this.content.checked = false;
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
      if(this.content.checked){
        this.vGrid.vGridSelection.select(this.parent.getRow(), true)
      } else {
        this.vGrid.vGridSelection.deSelect(this.parent.getRow())
      }
      this.vGrid.vGridGenerator.updateSelectionOnAllRows();
    }.bind(this);
    this.content.checked = this.vGrid.vGridSelection.isSelected(this.parent.getRow());
    this.content.classList.add(this.parent.vGrid.vGridConfig.css.cellContent);
    this.content.style.height = "100%";
    this.content.style.margin = "auto";
    this.content.style.position = "initial";
    this.content.style.display = "block";
    this.content.style.opacity = "initial";
    this.element.appendChild(this.content);
    this.valueChanged(false);

    this.content.onchange = ()=> {
      //this.parent.updateValue(this.content.checked);
    };

    //set column no
    this.content.columnNo = parseInt(this.parent.columnNo);

    //called when tabbing etc
    this.content.addEventListener("cellFocus", function (e) {
      this.content.focus();
    }.bind(this));

  }
}

