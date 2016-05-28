/*****************************************************************************************************************
 *    VGridAttibutes
 *    This is where I create all the <v-grid> attibutes, and set then to vGridConfig
 *    Prb doing al kinds of wrong in here, will improve as I learn more
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute, Optional} from 'aurelia-framework';
//for kendo ui bridge, remove import above
//import {customAttribute} from 'aurelia-templating';
//import {inject, Optional} from 'aurelia-dependency-injection';
import {VGrid} from './v-grid';


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
    this.vGrid.vGridConfig[this.attribute] = this.setValue(parseInt(this.value), this.attDefault);
  }

  setBindValueString() {
    if (typeof(this.value) === "string" && this.value !== '') {
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
export class vGridRowHeight extends VGridAttibutes {
  attribute = "rowHeight";
  type = "int";
}


@customAttribute('v-header-height')
@inject(Element, Optional.of(VGrid))
export class vGridHeaderHeight extends VGridAttibutes {
  attribute = "headerHeight";
  type = "int";
}


@customAttribute('v-footer-height')
@inject(Element, Optional.of(VGrid))
export class vGridFooterHeight extends VGridAttibutes {
  attribute = "footerHeight";
  type = "int";
}


@customAttribute('v-resizable-headers')
@inject(Element, Optional.of(VGrid))
export class vGridIsResizableHeaders extends VGridAttibutes {
  attribute = "isResizableHeaders";
  type = "bool";
}

@customAttribute('v-attibutes-observe')
@inject(Element, Optional.of(VGrid))
export class vGridAttibutesObserve extends VGridAttibutes {
  attribute = "attributeArray";
  type = "array";
}


@customAttribute('v-multi-select')
@inject(Element, Optional.of(VGrid))
export class vGridIsMultiSelect extends VGridAttibutes {
  attribute = "isMultiSelect";
  type = "bool";
}


@customAttribute('v-sortable-headers')
@inject(Element, Optional.of(VGrid))
export class vGridIsSortableHeader extends VGridAttibutes {
  attribute = "isSortableHeader";
  type = "bool";
}


@customAttribute('v-request-animation-frame')
@inject(Element, Optional.of(VGrid))
export class vGridRequestAnimationFrame extends VGridAttibutes {
  attribute = "requestAnimationFrame";
  type = "bool";
}


@customAttribute('v-resize-also-rows')
@inject(Element, Optional.of(VGrid))
export class vGridResizableHeadersAndRows extends VGridAttibutes {
  attribute = "resizableHeadersAndRows";
  type = "bool";
}


@customAttribute('v-render-on-scrollbar-scroll')
@inject(Element, Optional.of(VGrid))
export class vGridRenderOnScrollbarScroll extends VGridAttibutes {
  attribute = "renderOnScrollbarScroll";
  type = "bool";
}


@customAttribute('v-contextmenu')
@inject(Element, Optional.of(VGrid))
export class vGridContextmenu extends VGridAttibutes {
  attribute = "contextmenu";
  type = "bool";
}


@customAttribute('v-loading-threshold')
@inject(Element, Optional.of(VGrid))
export class vGridLoadingThreshold extends VGridAttibutes {
  attribute = "loadingThreshold";
  type = "int";
}


@customAttribute('v-remote-index')
@inject(Element, Optional.of(VGrid))
export class vGridRemoteIndex extends VGridAttibutes {
  attribute = "remoteIndex";
  type = "string";
}


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


@customAttribute('v-filter')
@inject(Element, VGrid)
export class vGridHeaderFilterOn {

  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    let values = this.value.split("|");
    this.attribute = values[0];
    this.filterOn = values[1];
    this.filterOperator = values[2];

  }


  updateFilter(curFilter) {
    var filterIndex;

    //get index of filter
    curFilter.forEach((filter, index)=> {
      if (filter.attribute === this.attribute) {
        filterIndex = index;
      }
    });

    if (filterIndex) {

      //we found a filter, lets update
      //todo: checkbox? how to handle values!?
      if (this.element.value === "") {
        curFilter.splice(filterIndex, 1)
      } else {
        curFilter[filterIndex].value = this.element.value
      }

    } else {

      //we didnt find filter, lets add one
      if (this.element.value !== "") {
        curFilter.push({
          attribute: this.attribute,
          operator: this.filterOperator,
          value: this.element.value
        });
      }

    }
  }


  attached() {

    //set enter filter (when user hits enter)
    if (this.filterOn === "enter") {
      this.element.onkeydown = (e) => {
        if (e.keyCode === 13) {

          //if they hit enter we need to get filter, update and run query
          var curFilter = this.vGrid.vGridFilter.lastFilter;
          this.updateFilter(curFilter);
          this.vGrid.vGridConfig.onFilterRun(curFilter)

        } else {

          //if they hit enter we need to get filter, update
          var curFilter = this.vGrid.vGridFilter.lastFilter;
          this.updateFilter(curFilter);

        }
      };
    }


    if (this.filterOn === "keyDown") {
      //Todo, wee need for when someone have on key down

    }

  }

}


@customAttribute('v-sort')
@inject(Element, VGrid)
export class vGridHeaderSortIcon {

  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    let values = this.value.split("|");
    this.attribute = values[0];
    this.icon = values[1] ? true : false;
    this.filterOperator = values[2];

  }

  attached(){
    this.sortIcon = document.createElement("SPAN");
    this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
    this.element.appendChild(this.sortIcon);
    this.element.onclick = (e)=>{
      this.vGrid.vGridConfig.onOrderBy(this.attribute, e.shiftKey);
    };

    this.vGrid.element.addEventListener("sortIconUpdate", (e)=>{
      this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
    })

    
  }
  
  
  


  getSortIconMarkup(attribute) {
    var css = this.vGrid.vGridConfig.css;
    var lineHeigthStyleTag = "100%";
    var isAscHtml = `<span ${lineHeigthStyleTag} class="${css.sortIcon} ${css.sortIconAsc}"></span>`;
    var isDescHtml = `<span ${lineHeigthStyleTag} class="${css.sortIcon} ${css.sortIconDesc}"></span>`;
    var markup = `<span ${lineHeigthStyleTag} class="${css.sortIcon} ${css.sortIconSort}"></span>`;

    if (this.vGrid.vGridSort.getFilter().length !== 0) {
      this.vGrid.vGridSort.getFilter().forEach((x) => {
        if (x.attribute === this.attribute) {
          var block = x.asc === true ? isAscHtml : isDescHtml;
          var main = `<span ${lineHeigthStyleTag} class="${css.sortIcon} ${css.sortIconNo}${x.no}"></span>`;
          markup = main + block;
        }
      });
    }

    return markup
  };


}


