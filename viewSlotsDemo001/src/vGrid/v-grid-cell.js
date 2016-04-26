import {inject, noView, customElement, processContent, bindable} from 'aurelia-framework';
import {VGrid} from './v-grid'


//this can prb get a lot better....


@noView
@customElement('v-grid-cell')
@processContent(false)
@inject(Element, VGrid)
export class VGridCell {
  @bindable colNo;


  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
  }


  bind(bindingContext) {
    this.bindingContext = bindingContext;
    if (this.bindingContext && this.cellContent) {
      this.setValue(this.bindingContext[this.vGrid.vGridConfig.attributeArray[this.colNo]]);
    }
  }


  created() {
    //nothing atm
  }


  setValue(value) {
    if (this.element.classList.contains(this.vGrid.vGridConfig.css.editCell)) {
      this.element.classList.remove(this.vGrid.vGridConfig.css.editCell)
    }

    if (this.element.classList.contains(this.vGrid.vGridConfig.css.editCellWrite)) {
      this.element.classList.remove(this.vGrid.vGridConfig.css.editCellWrite)
    }

    if (this.element.classList.contains(this.vGrid.vGridConfig.css.editCellFocus)) {
      this.element.classList.remove(this.vGrid.vGridConfig.css.editCellFocus)
    }




    if (this.vGrid.vGridConfig.colTypeArray[this.colNo] === "image") {
      if(value !== undefined && value !== null) {
        this.cellContent.src = value;
      }
    } else {
      if (this.vGrid.vGridConfig.colTypeArray[this.colNo] === "checkbox") {
        if(value === undefined){
          this.cellContent.style.display = "none";
        } else {
           if(this.cellContent.style.display === "none"){
             this.cellContent.style.display = "block";
           }
           this.cellContent.checked = value === "true" || value === true ? true : false;
        }
      } else {
        this.cellContent.value = value || "";
      }
    }
  }


  attached() {
    if (this.vGrid.vGridConfig.colTypeArray[this.colNo] === "image") {
      this.cellContent = document.createElement("img");
    } else {
      this.cellContent = document.createElement("input");
    }
    if (this.vGrid.vGridConfig.colTypeArray[this.colNo] === "checkbox") {
      this.cellContent.type = "checkbox";
      this.cellContent.onclick = function (e) {
        if (!this.vGrid.vGrid.vGridCellEdit.editMode) {
          return false;
        }

      }.bind(this)
    }

    this.cellContent.classList.add(this.vGrid.vGridConfig.css.cellContent);
    this.cellContent.setAttribute(this.vGrid.vGridConfig.atts.dataAttribute, this.vGrid.vGridConfig.attributeArray[this.colNo]);
    this.cellContent.setAttribute("style", this.vGrid.vGridConfig.colStyleArray[this.colNo]);
    this.cellContent.style.opacity = 1; //so materilize dont mess up
    this.cellContent.style.border = 0;
    this.cellContent.style.transition = "0ms";
    this.cellContent.setAttribute("tabindex", "0")

    if (this.bindingContext) {
      this.setValue(this.bindingContext[this.vGrid.vGridConfig.attributeArray[this.colNo]])
    }
    this.element.appendChild(this.cellContent);
  }
}
