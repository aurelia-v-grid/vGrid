/*****************************************************************************************************************
 *    VGridHeaderFilter
 *    Custom element for use in the header/column container (v-grid-header-col.js)
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customElement, bindable} from 'aurelia-framework';
import {VGrid} from './v-grid'


@customElement('v-grid-filter-text')
@inject(Element, VGrid)
export class VGridHeaderFilterText {
  @bindable type;
  @bindable filterValue;


  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
    this.vGridConfig = vGrid.vGridConfig;
  }

  filterValueChanged(newValue, oldValue) {
    if (typeof(newValue) === "object") {
      newValue = "";
    }
    this.content.value = newValue;
    this.parent.onChangeEventOnFilter({keyKode: 13});
  }


  bind(parent) {
    this.parent = parent;
  }


  attached() {
    this.content = this.element.children[0];
    this.setStyle(this.content);
    this.content.type = "text";
    this.content.onkeyup = (e)=> {
      if (this.vGridConfig.filterOnKeyArray[this.parent.columnNo]) {
        this.filterValue = this.content.value;
      } else {
        if (e.keyCode === 13) {
          this.filterValue = this.content.value;
        }
      }

    };

    this.content.onchange = ()=> {
      this.filterValue = this.content.value;
    };

    this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
    this.content.value = this.filterValue ? this.filterValue : "";

    this.content.style.height = "50%";
    this.content.style.margin = "initial";

  }


  setStyle(element) {

    var addClass = (name)=> {
      element.classList.add(name)
    };

    var setStyleTag = (tag, value)=> {
      element.style[tag] = value;
    };


    switch (this.type) {
      case "filterTop":
        addClass(this.vGridConfig.css.cellContent);
        addClass(this.vGridConfig.css.filterInputTop);
        addClass(this.vGridConfig.css.filterHandle);
        setStyleTag("line-height", `${this.vGridConfig.headerHeight / 2}px`);
        break;
      case "filterBottom":
        addClass(this.vGridConfig.css.cellContent);
        addClass(this.vGridConfig.css.filterInputBottom);
        setStyleTag("line-height", `${this.vGridConfig.headerHeight / 2}px`);
        break;
      default:
        break;
    }


  }


}
