import {noView, customElement, processContent, bindable} from 'aurelia-framework';

//this can prb get a lot better....


@noView
@customElement('v-grid-cell')
@processContent(false)
export class VGridCell {
  static inject = [Element];
  @bindable colNo;


  constructor(element) {
    this.element = element;
  }


  bind(bindingContext) {
    this.bindingContext = bindingContext;
    this.ctx = bindingContext.ctx;
    if (this.bindingContext && this.cellContent) {
      this.setValue(this.bindingContext[this.ctx.vGridConfig.attributeArray[this.colNo]]);
    }
  }


  created() {
    //nothing atm
  }


  setValue(value) {
    if (this.ctx.vGridConfig.colTypeArray[this.colNo] === "image") {
      this.cellContent.src = value;
    } else {
      if (this.ctx.vGridConfig.colTypeArray[this.colNo] === "checkbox") {
        this.cellContent.checked = value === "true" || value === true ? true : false;
      } else {
        this.cellContent.value = value || "";
      }
    }
  }


  attached() {
    if (this.ctx.vGridConfig.colTypeArray[this.colNo] === "image") {
      this.cellContent = document.createElement("img");
    } else {
      this.cellContent = document.createElement("input");
    }
    if (this.ctx.vGridConfig.colTypeArray[this.colNo] === "checkbox") {
      this.cellContent.type = "checkbox";
      this.cellContent.onclick = function (e) {
        if (!this.ctx.vGrid.vGridCellEdit.editMode) {
          return false;
        }

      }.bind(this)
    }

    this.cellContent.classList.add(this.ctx.vGridConfig.css.cellContent);
    this.cellContent.setAttribute(this.ctx.vGridConfig.atts.dataAttribute, this.ctx.vGridConfig.attributeArray[this.colNo]);
    this.cellContent.setAttribute("style", this.ctx.vGridConfig.colStyleArray[this.colNo]);
    this.cellContent.style.opacity = 1; //so materilize dont mess up
    this.cellContent.style.border = 0;
    this.cellContent.style.transition = "0ms";
    this.cellContent.setAttribute("tabindex", "0")

    if (this.bindingContext) {
      this.setValue(this.bindingContext[this.ctx.vGridConfig.attributeArray[this.colNo]])
    }
    this.element.appendChild(this.cellContent);
  }
}
