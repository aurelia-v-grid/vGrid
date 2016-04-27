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
    this.hidden = false;
  }


  bind(bindingContext) {
    this.bindingContext = bindingContext;
    if (this.bindingContext && this.cellContent) {

      this.setValue(this.bindingContext[this.attribute()]);

      if (this.vGrid.filterRow === parseInt(this.element.parentNode.getAttribute("row"))) {
        if (parseInt(this.colNo) === this.vGrid.vGridCellEdit.index) {
          if (!this.containsFocusClass(this.element)) {
            this.setLastFocusElement(null);
            this.setCss();
          }
        }
      }
    }
  }


  created() {
    //nothing atm
  }


  attached() {


    switch (this.colType()) {
      case "image":
        this.cellContent = document.createElement("img");
        break;
      case "checkbox":
        this.cellContent = document.createElement("input");
        this.cellContent.type = "checkbox";
        this.cellContent.onclick = function (e) {

          if (e.keyCode == 13) {
            this.cellContent.onblur();
            return false;
          }
          if (this.readOnly() === true && e.keyCode !== 9) {
            return false;
          } else {
            if (!this.editMode()) {
              return false;
            } else {
              return true;
            }
          }

        }.bind(this);
        break;
      default:
        this.cellContent = document.createElement("input");
        this.cellContent.onkeydown = function (e) {

          if (e.keyCode == 13) {
            this.setEditMode(false);
            if (this.containsWriteClass(this.element)) {
              this.removeWriteClass(this.element)
            }
            this.cellContent.onblur();
            return false;
          }
          if (this.readOnly() === true && e.keyCode !== 9) {
            return false;
          } else {
            if (!this.editMode()) {
              return false;
            } else {
              return true;
            }
          }

        }.bind(this);
    }


    this.cellContent.ondblclick = function (e) {

      this.setEditMode(true);
      this.cellContent.select()


    }.bind(this);


    this.cellContent.addEventListener("cellFocus", function (e) {
      console.log("focus");
      this.setCss();
      this.cellContent.focus();
    }.bind(this));


    this.cellContent.onblur = function (e) {
      console.log("blur");
      this.vGrid.vGridCellEdit.updateActual({
        attribute: this.attribute(),
        value: this.getValue()
      })
    }.bind(this);


    this.cellContent.onchange = function (e) {
      console.log("change");
    }.bind(this);


    this.cellContent.classList.add(this.vGrid.vGridConfig.css.cellContent);
    this.cellContent.setAttribute(this.vGrid.vGridConfig.atts.dataAttribute, this.attribute());
    this.cellContent.setAttribute("style", this.vGrid.vGridConfig.colStyleArray[this.colNo]);
    this.cellContent.style.opacity = 1; //so materilize dont mess up
    this.cellContent.style.border = 0;
    this.cellContent.style.transition = "0ms";
    this.cellContent.setAttribute("tabindex", "0");

    if (this.bindingContext) {
      this.setValue(this.bindingContext[this.attribute()])
    }
    this.element.appendChild(this.cellContent);
  }


  /**************************************************
   set value and hide cell if not defined value
   */

  setValue(value) {
    this.removeCssCell();
    switch (this.colType()) {
      case "image":
        this.hideIfUndefined(value);
        if (value !== undefined && value !== null) {
          this.cellContent.src = value;
        }
        break;
      case "checkbox":
        this.hideIfUndefined(value);
        this.cellContent.checked = value === "true" || value === true ? true : false;
        break;
      default:
        this.cellContent.value = value || "";
    }
  }

  getValue() {

    switch (this.colType()) {
      case "image":
        return this.cellContent.src;
        break;
      case "checkbox":
        return this.cellContent.checked;
        break;
      default:
        return this.cellContent.value;
    }
  }

  hideIfUndefined(value) {
    if (value === undefined) {
      this.hidden = true;
      this.cellContent.style.display = "none";
      this.removeCssOldCell();
    } else {
      if (this.cellContent.style.display === "none") {
        this.hidden = false;
        this.cellContent.style.display = "block";
      }
      this.cellContent.src = value;
    }
  }


  /**************************************************
   basic types/atts
   */


  editMode() {
    return this.vGrid.vGridCellEdit.editMode;
  }


  setEditMode(value) {
    this.vGrid.vGridCellEdit.editMode = value;
  }


  attribute() {
    return this.vGrid.vGridConfig.attributeArray[this.colNo];
  }

  readOnly() {
    return this.vGrid.vGridConfig.readOnlyArray[this.colNo];
  }

  colType() {
    return this.vGrid.vGridConfig.colTypeArray[this.colNo];
  }


  /**************************************************
   this and last element
   */

  getLastFocusElement() {
    return this.vGrid.vGridCellEdit.lastElement;
  }


  setLastFocusElement(element) {
    this.vGrid.vGridCellEdit.lastElement = element;
  }


  /**************************************************
   get and set classes
   */



  containsFocusClass(element) {
    if (element) {
      return element.classList.contains(this.vGrid.vGridConfig.css.editCellFocus)
    } else {
      return false;
    }
  }


  addFocusClass(element) {
    if (element) {
      element.classList.add(this.vGrid.vGridConfig.css.editCellFocus)
    } else {
      return false;
    }
  }


  removeFocusClass(element) {
    if (element) {
      return element.classList.remove(this.vGrid.vGridConfig.css.editCellFocus)
    } else {
      return false;
    }
  }


  containsWriteClass(element) {
    if (element) {
      return element.classList.contains(this.vGrid.vGridConfig.css.editCellWrite)
    } else {
      return false;
    }
  }


  addWriteClass(element) {
    if (element) {
      element.classList.add(this.vGrid.vGridConfig.css.editCellWrite)
    } else {
      return false;
    }
  }


  removeWriteClass(element) {
    if (element) {
      return element.classList.remove(this.vGrid.vGridConfig.css.editCellWrite)
    } else {
      return false;
    }
  }

  removeCssCell() {
    if (this.containsWriteClass(this.element)) {
      this.removeWriteClass(this.element);
    }
    if (this.containsFocusClass(this.element)) {
      this.removeFocusClass(this.element);
    }
  }


  removeCssOldCell() {
    if (this.containsWriteClass(this.getLastFocusElement())) {
      this.removeWriteClass(this.getLastFocusElement());
    }
    if (this.containsFocusClass(this.getLastFocusElement())) {
      this.removeFocusClass(this.getLastFocusElement());
    }
  }


  setCss() {
    if (!this.containsFocusClass(this.element)) {
      this.addFocusClass(this.element);
      this.removeCssOldCell();
      this.setLastFocusElement(this.element)
    }

    if (this.editMode()) {
      if (!this.containsWriteClass(this.element)) {
        this.addWriteClass(this.element);
      }
    }
  }


}
