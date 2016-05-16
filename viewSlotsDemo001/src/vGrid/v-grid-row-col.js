/*****************************************************************************************************************
 *    VGridCellContainer
 *    Custom element controlling the cell logic, this creates new elements depending on type
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, noView, customElement, processContent, Container, bindable, ViewSlot} from 'aurelia-framework';
import {VGrid} from './v-grid'


@noView()
@customElement('v-grid-row-col')
@processContent(false)
@inject(Element, VGrid, Container)
export class VGridCellContainer {
  @bindable columnNo;


  /**************************************************
   *  constrcutor, setting defaults
   **************************************************/
  constructor(element, vGrid, container) {
    this.element = element;
    this.container = container;
    this.vGrid = vGrid;
    this.hidden = false;
    this.value;
    this.customStyle;
  }


  /**************************************************
   *  element event
   **************************************************/
  bind(bindingContext) {
    this.bindingContext = bindingContext;

    if (this.viewSlot && this.bindingContext) {
      //set default value

      if (this.colType() === "selection") {
        let x = {};
        this.setValue(x); //need to force it to update
      } else {
        this.setValue("");
        this.setValue(this.rawValue);
      }

      this.customStyle = this.colStyle();

      //set back focus when scrolled
      if (this.vGrid.vGridCurrentRow === parseInt(this.element.parentNode.getAttribute("row"))) {
        if (parseInt(this.columnNo) === this.vGrid.vGridCellHelper.index) {
          this.setCss()
        }
      }
    }
  }


  /**************************************************
   *  element event
   **************************************************/
  created() {

  }


  /**************************************************
   *  element event
   **************************************************/
  attached() {

    //set basic styles for a cell
    this.setStandardClassesAndStyles();

    //create viewfactory
    switch (this.colType()) {
      case "image":
        var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-image value.bind="value"><img css.bind="customStyle"></v-grid-image></template>', this.vGrid.resources);
        break;
      case "checkbox":
        var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-checkbox value.bind="value"><input css.bind="customStyle"></v-grid-checkbox></template>', this.vGrid.resources);
        break;
      case "selection":
        var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-selection value.bind="value"><input css.bind="customStyle"></v-grid-selection></template>', this.vGrid.resources);
        break;
      default:
        var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-input  value.bind="value"><input css.bind="customStyle"></v-grid-input></template>', this.vGrid.resources);
    }

    //create view
    var view = viewFactory.create(this.container);

    //create viewslot
    this.viewSlot = new ViewSlot(this.element, true);
    this.viewSlot.add(view);
    this.viewSlot.bind(this);
    this.viewSlot.attached();


    //focus event for setting
    this.element.addEventListener("cellFocus", function (e) {
      this.setCss();
    }.bind(this));


    //for sending back edbl click on row to user
    this.element.addEventListener("eventOnRowDblClick", function (e) {
      if (this.vGrid.vGridConfig.eventOnRowDblClick) {
        this.vGrid.vGridConfig.eventOnRowDblClick({
          evt: e,
          data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
          attribute: this.attribute(),
          row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
        });
      }
    }.bind(this));


    //for sending back row click to user
    this.element.addEventListener("eventOnRowClick", function (e) {
      if (this.vGrid.vGridConfig.eventOnRowClick) {
        this.vGrid.vGridConfig.eventOnRowClick({
          evt: e,
          data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
          attribute: this.attribute(),
          row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
        });
      }
    }.bind(this));

  }


  /**************************************************
   * for updating value in collection
   **************************************************/
  updateValue(value) {
    this.vGrid.vGridCellHelper.updateActual({
      attribute: this.attribute(),
      value: this.valueFormater ? this.valueFormater.fromView(value) : value
    });
  }


  /**************************************************
   set value/also fixes css focus
   **************************************************/
  setValue(value, setRawValue) {
    this.removeCssCell();
    if (setRawValue || (this.editMode() && this.editRaw())) {
      this.value = this.rawValue;
    } else {
      this.value = this.valueFormater ? this.valueFormater.toView(value) : value;
    }

  }


  /**************************************************
   gets value
   **************************************************/
  getValue(value) {
    return this.valueFormater ? this.valueFormater.fromView(value) : value;
  }


  /**************************************************
   *  gets current row
   **************************************************/
  getRow() {
    return parseInt(this.element.parentNode.getAttribute("row"));
  }


  /**************************************************
   *  basic types/atts
   **************************************************/

  editMode() {
    return this.vGrid.vGridConfig.editMode;
  }


  setEditMode(value) {
    this.vGrid.vGridConfig.editMode = value;
  }

  editRaw() {
    return this.vGrid.vGridConfig.colEditRawArray[this.columnNo];
  }


  attribute() {
    return this.vGrid.vGridConfig.attributeArray[this.columnNo];
  }


  get valueFormater() {
    return this.vGrid.vGridConfig.colFormaterArray[this.columnNo];
  }


  get rawValue() {
    return this.bindingContext[this.attribute()];
  }


  readOnly() {
    return this.vGrid.vGridConfig.readOnlyArray[this.columnNo];
  }


  colType() {
    return this.vGrid.vGridConfig.colTypeArray[this.columnNo];
  }


  colStyle() {
    if (this.vGrid) {
      if (this.vGrid.vGridConfig.colStyleArray[this.columnNo]) {
        return this.interpolate(this.vGrid.vGridConfig.colStyleArray[this.columnNo])(this.bindingContext);
      }

    }
  }

  //used for getting the mustache tags from the v-grid-col-css attribute
  interpolate(str) {
    if (str) {
      return function interpolate(o) {
        return str.replace(/{{([^{}]*)}}/g, function (a, b) {
          var r = o[b];
          return r;
        });
      }
    } else {
      return function () {
        return ""
      }
    }

  }


  /**************************************************
   *  This and last element
   **************************************************/
  getLastFocusElement() {
    return this.vGrid.vGridCellHelper.lastElement;
  }


  setLastFocusElement(element) {
    this.vGrid.vGridCellHelper.lastElement = element;
  }


  /**************************************************
   * Get and set css classes
   **************************************************/
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
      element.classList.remove(this.vGrid.vGridConfig.css.editCellFocus)
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
      element.classList.remove(this.vGrid.vGridConfig.css.editCellWrite)
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
      this.removeCssOldCell();
      this.addFocusClass(this.element);
      this.setLastFocusElement(this.element)
    }

    if (this.editMode() && !this.readOnly()) {
      if (!this.containsWriteClass(this.element)) {
        this.removeFocusClass(this.element);
        this.addWriteClass(this.element);
      }
    }
  }


  setStandardClassesAndStyles() {
    var css = this.vGrid.vGridConfig.css;
    var cellStyle = `width:${this.vGrid.vGridConfig.columnWidthArray[this.columnNo]}px`;
    this.element.classList.add(css.rowCell);
    this.element.classList.add(css.rowColumn + this.columnNo);
    this.element.classList.add(css.gridColumn + this.columnNo);
    this.element.setAttribute("style", cellStyle);
  }


}
