/*****************************************************************************************************************
 *    VGridHeaderFilter
 *    Custom element for use in the header/column container (v-grid-header-col.js)
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customElement, bindable, noView} from 'aurelia-framework';
//for kendo ui bridge, remove import above
//import {bindable, customElement} from 'aurelia-templating';
//import {inject} from 'aurelia-dependency-injection';


@noView()
@customElement('v-grid-filter-customx')
@inject(Element)
export class VGridHeaderFilterText {
  @bindable type;
  @bindable filterValue;


  /*****************************************************
   *  constructor
   ******************************************************/
  constructor(element) {
    this.element = element;
  }


  /*****************************************************
   *  bindable event
   ******************************************************/
  filterValueChanged(newValue, oldValue) {
    if (typeof(newValue) === "object") {
      newValue = "";
    }
    this.content.value = newValue;
    this.parent.onChangeEventOnFilter({keyKode: 13});
  }


  /*****************************************************
   *  element event
   ******************************************************/
  bind(parent) {
    this.parent = parent;
    this.vGrid = parent.vGrid;
    this.vGridConfig = parent.vGrid.vGridConfig;
  }


  /*****************************************************
   *  element event
   ******************************************************/
  attached() {
    this.content = this.element.children[0];
    this.setStyle(this.content);
    this.content.type = "button";


    this.content.onkeyup = (e)=> {
      //if filter on key press is set then lets set new filter value
      if (this.vGridConfig.filterOnKeyArray[this.parent.columnNo] || e.keyCode === 13) {
        if(this.filterValue !== this.content.value){
          this.filterValue = this.content.value;
        } else {
          if(e.keyCode === 13){
          //filter value will be the same, so we just haveto call the filter this time
            if(this.filterValue !== this.content.value){
              this.parent.onChangeEventOnFilter({keyKode: 13});
            }
          }
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


  /*****************************************************
   *  sets the basic classes styles
   ******************************************************/
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
        addClass(this.vGridConfig.css.filterHandle);
        setStyleTag("line-height", `${this.vGridConfig.headerHeight / 2}px`);
        break;
      default:
        break;
    }


  }


}
