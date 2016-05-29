/*****************************************************************************************************************
 *    This is where I create all the <v-grid> attibutes, and set then to vGridConfig
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute, Optional} from 'aurelia-framework';
//for kendo ui bridge, remove import above
//import {customAttribute} from 'aurelia-templating';
//import {inject, Optional} from 'aurelia-dependency-injection';
import {VGrid} from './v-grid';


var VGridAttibutesMain = class {

  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
    this.checkIfVgrid(vGrid);
  }


  checkIfVgrid(vGrid) {
    if (this.vGrid === null || this.vGrid === undefined) {
      throw new Error('Invalid Element. Must use v-grid.');
    }
  }


  setValue(htmlAttributeValue, defaultValue) {
    var value = defaultValue;
    if (htmlAttributeValue !== undefined && htmlAttributeValue !== null && !isNaN(htmlAttributeValue)) {
      value = htmlAttributeValue;
    }
    return value;
  };


  setBindValueInt() {
    this.vGrid.vGridConfig[this.attribute] = this.setValue(parseInt(this.value), this.attDefault);
  }


  setBindValueString() {
    if (typeof(this.value) === "string" && this.value !== '' && this.value !== undefined && this.value !== null) {
      this.vGrid.vGridConfig[this.attribute] = this.value
    }
  }


  setBindValueBool() {
    let type = {
      "true": true,
      "false": false
    };
    this.vGrid.vGridConfig[this.attribute] = this.setValue(type[this.value], this.attDefault);
  }


  setBindValueArray() {
    //todo, trim! but dunno if I need this after rebuild---
    if (this.value !== undefined && this.value !== null) {
      var tempArray = this.value.split(",");
      tempArray.forEach((prop)=> {
        prop = prop.trim();
      });
      this.vGrid.vGridConfig[this.attribute] = tempArray;
    }
  }


  /**************************************
   * used for setting binding value, string to bool/numbers etc
   */
  setBindValue() {
    switch (this.type) {
      case "bool":
        this.setBindValueBool();
        break;
      case "string":
        this.setBindValueString();
        break;
      case "int":
        this.setBindValueInt();
        break;
      case "array":
        this.setBindValueArray();
        break;
      default:
        throw new Error('Attribute missing type.');
    }

  }

  /**************************************
   * Gets the default value from vGrigConfig
   */
  getDefaultvalue() {
    this.attDefault = this.vGrid.vGridConfig[this.attribute]
  }

  /**************************************
   * Called when attributes gets binded
   */
  bind(bindingContext, overrideContext) {
    this.getDefaultvalue();
    this.setBindValue();
  }
};


@customAttribute('v-row-height')
@inject(Element, Optional.of(VGrid))
export class vGridRowHeight extends VGridAttibutesMain {
  attribute = "rowHeight";
  type = "int";
}


@customAttribute('v-header-height')
@inject(Element, Optional.of(VGrid))
export class vGridHeaderHeight extends VGridAttibutesMain {
  attribute = "headerHeight";
  type = "int";
}


@customAttribute('v-footer-height')
@inject(Element, Optional.of(VGrid))
export class vGridFooterHeight extends VGridAttibutesMain {
  attribute = "footerHeight";
  type = "int";
}


@customAttribute('v-resizable-headers')
@inject(Element, Optional.of(VGrid))
export class vGridIsResizableHeaders extends VGridAttibutesMain {
  attribute = "isResizableHeaders";
  type = "bool";
}

@customAttribute('v-attibutes-observe')
@inject(Element, Optional.of(VGrid))
export class vGridAttibutesObserve extends VGridAttibutesMain {
  attribute = "attributeArray";
  type = "array";
}


@customAttribute('v-multi-select')
@inject(Element, Optional.of(VGrid))
export class vGridIsMultiSelect extends VGridAttibutesMain {
  attribute = "isMultiSelect";
  type = "bool";
}


@customAttribute('v-manual-sel')
@inject(Element, Optional.of(VGrid))
export class vGridManualSelection extends VGridAttibutesMain {
  attribute = "manualSelection";
  type = "bool";
}


@customAttribute('v-sortable-headers')
@inject(Element, Optional.of(VGrid))
export class vGridIsSortableHeader extends VGridAttibutesMain {
  attribute = "isSortableHeader";
  type = "bool";
}


@customAttribute('v-loading-threshold')
@inject(Element, Optional.of(VGrid))
export class vGridLoadingThreshold extends VGridAttibutesMain {
  attribute = "loadingThreshold";
  type = "int";
}


//---------------------------------------------------------------------------------------

@customAttribute('v-remote-index')
@inject(Optional.of(VGrid))
export class vGridRemoteIndex  {

  constructor(vGrid) {
    this.vGrid = vGrid;
  }

  bind() {
    if (this.value !== "") {
      this.vGrid.vGridConfig.isRemoteIndex = true;
      this.vGrid.vGridRowKey = this.value;
    }
  }
}


//---------------------------------------------------------------------------------------


@customAttribute('v-row-on-draw')
@inject(Optional.of(VGrid))
export class vGridEventOnRowDraw {

  constructor(vGrid) {
    this.vGrid = vGrid;
  }

  bind() {
    if (typeof(this.value) === "function") {
      this.vGrid.vGridConfig.eventOnRowDraw = this.value;
    }
  }
}


//---------------------------------------------------------------------------------------


@customAttribute('v-event-onremote')
@inject(Optional.of(VGrid))
export class vGridEventOnRemoteCall {

  constructor(vGrid) {
    this.vGrid = vGrid;
  }

  bind() {
    if (typeof(this.value) === "function") {
      this.vGrid.vGridConfig.eventOnRemoteCall = this.value;
    }
  }
}

//---------------------------------------------------------------------------------------




