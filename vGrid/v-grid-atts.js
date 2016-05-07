/*****************************************************************************************************************
 *    VGridAttibutes
 *    This is where I create all the <v-grid> attibutes, and set then to vGridConfig
 *    Prb doing al kinds of wrong in here, will improve as I learn more
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
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
    if (this.vGrid.vGridContextObj[this.alias]) {
      this.vGrid.vGridConfig[this.attribute] = this.setValue(this.vGrid.vGridContextObj[this.alias], this.attDefault);
    } else {
      this.vGrid.vGridConfig[this.attribute] = this.setValue(parseInt(this.value), this.attDefault);
    }
  }


  setBindValueBool() {
    let type = {
      "true": true,
      "false": false
    };

    if (this.vGrid.vGridContextObj[this.alias]) {
      this.vGrid.vGridConfig[this.attribute] = this.setValue(this.vGrid.vGridContextObj[this.alias], this.attDefault);
    } else {
      this.vGrid.vGridConfig[this.attribute] = this.setValue(type[this.value], this.attDefault);
    }
  }


  setBindValueFn() {
    if (this.vGrid.vGridContextObj[this.alias]) {
      if (typeof(this.vGrid.vGridContextObj[this.alias]) === "function") {
        this.vGrid.vGridConfig[this.attribute] = this.vGrid.vGridContextObj[this.alias].bind(this.vGrid.$parent);
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
  alias = "configRowHeight";
  type = "int";
}


@customAttribute('v-header-height')
@inject(Element, Optional.of(VGrid))
export class headerHeight extends VGridAttibutes {
  attribute = "headerHeight";
  alias = "configHeaderHeight";
  type = "int";
}


@customAttribute('v-footer-height')
@inject(Element, Optional.of(VGrid))
export class footerHeight extends VGridAttibutes {
  attribute = "footerHeight";
  alias = "configFooterHeight";
  type = "int";
}


@customAttribute('v-resizable-headers')
@inject(Element, Optional.of(VGrid))
export class isResizableHeaders extends VGridAttibutes {
  attribute = "isResizableHeaders";
  alias = "configResizableHeaders";
  type = "bool";
}


@customAttribute('v-multi-select')
@inject(Element, Optional.of(VGrid))
export class isMultiSelect extends VGridAttibutes {
  attribute = "isMultiSelect";
  alias = "configMultiSelect";
  type = "bool";
}


@customAttribute('v-sortable-headers')
@inject(Element, Optional.of(VGrid))
export class isSortableHeader extends VGridAttibutes {
  attribute = "isSortableHeader";
  alias = "configSortableHeader";
  type = "bool";
}


@customAttribute('v-request-animation-frame')
@inject(Element, Optional.of(VGrid))
export class requestAnimationFrame extends VGridAttibutes {
  attribute = "requestAnimationFrame";
  alias = "configRequestAnimationFrame";
  type = "bool";
}


@customAttribute('v-resize-also-rows')
@inject(Element, Optional.of(VGrid))
export class resizableHeadersAndRows extends VGridAttibutes {
  attribute = "resizableHeadersAndRows";
  alias = "configResizableHeadersAndRows";
  type = "bool";
}

@customAttribute('v-render-on-scrollbar-scroll')
@inject(Element, Optional.of(VGrid))
export class renderOnScrollbarScroll extends VGridAttibutes {
  attribute = "renderOnScrollbarScroll";
  alias = "configRenderOnScrollbarScroll";
  type = "bool";
}


@customAttribute('v-header-filter')
@inject(Element, Optional.of(VGrid))
export class addFilter extends VGridAttibutes {
  attribute = "addFilter";
  alias = "configAddFilter";
  type = "bool";
}


@customAttribute('v-header-filter-top')
@inject(Element, Optional.of(VGrid))
export class filterOnAtTop extends VGridAttibutes {
  attribute = "filterOnAtTop";
  alias = "configFilterOnAtTop";
  type = "bool";
}



// @customAttribute('v-sort-on-header-click')
// @inject(Element, Optional.of(VGrid))
// export class sortOnHeaderClick extends VGridAttibutes {
//   attribute = "sortOnHeaderClick";
//   alias = "sortOnHeaderClick";
//   type = "bool";
// }


@customAttribute('v-large-buffer')
@inject(Element, Optional.of(VGrid))
export class largeBuffer extends VGridAttibutes {
  attribute = "largeBuffer";
  alias = "configLargeBuffer";
  type = "bool";
}

// @customAttribute('v-active-sorting')
// @inject(Element, Optional.of(VGrid))
// export class activeSorting extends VGridAttibutes {
//   attribute = "activeSorting";
//   alias = "activeSorting";
//   type = "bool";
// }


@customAttribute('v-row-on-draw')
@inject(Element, Optional.of(VGrid))
export class eventOnRowDraw extends VGridAttibutes {
  attribute = "eventOnRowDraw";
  alias = "configEventOnRowDraw";
  type = "fn";
}



@customAttribute('v-attibutes-used')
@inject(Element, Optional.of(VGrid))
export class attributeArray extends VGridAttibutes {
  attribute = "attributeArray";
  alias = "configAttributeArray";
  type = "array";
}

@customAttribute('v-header-filter-not-to')
@inject(Element, Optional.of(VGrid))
export class doNotAddFilterTo extends VGridAttibutes {
  attribute = "doNotAddFilterTo";
  alias = "configDoNotAddFilterTo";
  type = "array";
}

@customAttribute('v-sort-not-on-header')
@inject(Element, Optional.of(VGrid))
export class sortNotOnHeader extends VGridAttibutes {
  attribute = "sortNotOnHeader";
  alias = "configSortNotOnHeader";
  type = "array";
}


@customAttribute('v-row-onclick')
@inject(Element, Optional.of(VGrid))
export class eventOnRowClick extends VGridAttibutes {
  attribute = "eventOnRowClick";
  alias = "configEventOnRowClick";
  type = "fn";
}

@customAttribute('v-row-ondblclick')
@inject(Element, Optional.of(VGrid))
export class eventOnRowDblClick extends VGridAttibutes {
  attribute = "eventOnRowDblClick";
  alias = "configEventOnRowDblClick";
  type = "fn";
}
