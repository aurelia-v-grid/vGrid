import {inject, customAttribute, Optional} from 'aurelia-framework';
import {VGrid} from './v-grid'


var VGridAttibutes = class {

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
    let ctxValue = this.vGrid.gridContext[this.attribute]
    if (this.vGrid.gridContext[this.attribute]) {
      this.vGrid.vGridConfig[this.attribute] = this.setValue(this.vGrid.gridContext[this.attribute], this.attDefault);
    } else {
      this.vGrid.vGridConfig[this.attribute] = this.setValue(parseInt(this.value), this.attDefault);
    }
  }


  setBindValueBool() {
    let type = {
      "true": true,
      "false": false
    };

    if (this.vGrid.gridContext[this.attribute]) {
      this.vGrid.vGridConfig[this.attribute] = this.setValue(this.vGrid.gridContext[this.attribute], this.attDefault);
    } else {
      this.vGrid.vGridConfig[this.attribute] = this.setValue(type[this.value], this.attDefault);
    }
  }


  setBindValueFn() {
    if (this.vGrid.gridContext[this.attribute]) {
      if (typeof(this.vGrid.$parent[this.value]) === "function") {
        this.vGrid.vGridConfig[this.attribute] = this.vGrid.$parent[this.value].bind(this.vGrid.$parent);
      }
    } else {
      if (typeof(this.vGrid.$parent[this.value]) === "function") {
        this.vGrid.vGridConfig[this.attribute] = this.vGrid.$parent[this.value].bind(this.vGrid.$parent);
      }
    }
  }


  setBindValueArray() {
    if (this.value !== undefined && this.value !== null) {
      var tempArray = this.value.split(",");
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
      case "int":
        this.setBindValueInt();
        break;
      case "fn":
        this.setBindValueFn();
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
   * Todo
   */
  setNewvalue(newValue, oldValue) {
    //just use them as config for now
    //this.vGrid.vGridConfig[this.attribute] = this.setValue(parseInt(newValue), oldValue);
  }

  /**************************************
   * Called when attributes gets binded
   */
  bind(bindingContext, overrideContext) {
    this.getDefaultvalue();
    this.setBindValue();
  }


  /**************************************
   * Called when value chnages
   */
  valueChanged(newValue, oldValue) {
    this.setNewvalue(newValue, oldValue)
  }

};


@customAttribute('v-row-height')
@inject(Element, Optional.of(VGrid))
export class rowHeight extends VGridAttibutes {
  attribute = "rowHeight";
  type = "int";
}


@customAttribute('v-header-height')
@inject(Element, Optional.of(VGrid))
export class headerHeight extends VGridAttibutes {
  attribute = "headerHeight";
  type = "int";
}


@customAttribute('v-footer-height')
@inject(Element, Optional.of(VGrid))
export class footerHeight extends VGridAttibutes {
  attribute = "footerHeight";
  type = "int";
}


@customAttribute('v-resizable-headers')
@inject(Element, Optional.of(VGrid))
export class isResizableHeaders extends VGridAttibutes {
  attribute = "isResizableHeaders";
  type = "bool";
}


@customAttribute('v-multi-select')
@inject(Element, Optional.of(VGrid))
export class isMultiSelect extends VGridAttibutes {
  attribute = "isMultiSelect";
  type = "bool";
}


@customAttribute('v-sortable-headers')
@inject(Element, Optional.of(VGrid))
export class isSortableHeader extends VGridAttibutes {
  attribute = "isSortableHeader";
  type = "bool";
}


@customAttribute('v-request-animation-frame')
@inject(Element, Optional.of(VGrid))
export class requestAnimationFrame extends VGridAttibutes {
  attribute = "requestAnimationFrame";
  type = "bool";
}


@customAttribute('v-resize-also-rows')
@inject(Element, Optional.of(VGrid))
export class resizableHeadersAndRows extends VGridAttibutes {
  attribute = "resizableHeadersAndRows";
  type = "bool";
}

@customAttribute('v-render-on-scrollbar-scroll')
@inject(Element, Optional.of(VGrid))
export class renderOnScrollbarScroll extends VGridAttibutes {
  attribute = "renderOnScrollbarScroll";
  type = "bool";
}


@customAttribute('v-locked-columns')
@inject(Element, Optional.of(VGrid))
export class lockedColumns extends VGridAttibutes {
  attribute = "lockedColumns";
  type = "int";
}


@customAttribute('v-header-filter')
@inject(Element, Optional.of(VGrid))
export class addFilter extends VGridAttibutes {
  attribute = "addFilter";
  type = "bool";
}


@customAttribute('v-header-filter-top')
@inject(Element, Optional.of(VGrid))
export class filterOnAtTop extends VGridAttibutes {
  attribute = "filterOnAtTop";
  type = "bool";
}


@customAttribute('v-header-filter-onkeydown')
@inject(Element, Optional.of(VGrid))
export class filterOnKey extends VGridAttibutes {
  attribute = "filterOnKey";
  type = "bool";
}


@customAttribute('v-sort-on-header-click')
@inject(Element, Optional.of(VGrid))
export class sortOnHeaderClick extends VGridAttibutes {
  attribute = "sortOnHeaderClick";
  type = "bool";
}


@customAttribute('v-large-buffer')
@inject(Element, Optional.of(VGrid))
export class largeBuffer extends VGridAttibutes {
  attribute = "largeBuffer";
  type = "bool";
}


@customAttribute('v-format-handler')
@inject(Element, Optional.of(VGrid))
export class eventFormatHandler extends VGridAttibutes {
  attribute = "eventFormatHandler"
  type = "fn";
}


@customAttribute('v-row-on-dblclick')
@inject(Element, Optional.of(VGrid))
export class eventOnDblClick extends VGridAttibutes {
  attribute = "eventOnDblClick"
  type = "fn";
}

@customAttribute('v-row-on-draw')
@inject(Element, Optional.of(VGrid))
export class eventOnRowDraw extends VGridAttibutes {
  attribute = "eventOnRowDraw"
  type = "fn";
}



@customAttribute('v-header-input-click')
@inject(Element, Optional.of(VGrid))
export class eventOnHeaderInputClick extends VGridAttibutes {
  attribute = "eventOnHeaderInputClick"
  type = "fn";
}

@customAttribute('v-attibutes-used')
@inject(Element, Optional.of(VGrid))
export class attributeArray extends VGridAttibutes {
  attribute = "attributeArray";
  type = "array";
}

@customAttribute('v-header-filter-not-to')
@inject(Element, Optional.of(VGrid))
export class doNotAddFilterTo extends VGridAttibutes {
  attribute = "doNotAddFilterTo";
  type = "array";
}

@customAttribute('v-sort-not-on-header')
@inject(Element, Optional.of(VGrid))
export class sortNotOnHeader extends VGridAttibutes {
  attribute = "sortNotOnHeader";
  type = "array";
}
