/*****************************************************************************************************************
 *    Attributes for header so users can add to headers to activate filtering
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute, Optional} from 'aurelia-framework';
//for kendo ui bridge, remove import above
//import {customAttribute} from 'aurelia-templating';
//import {inject, Optional} from 'aurelia-dependency-injection';
import {VGrid} from './v-grid';



@customAttribute('v-filter')
@inject(Element, VGrid)
export class vGridAttributesFilter {

  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }


  get valueConverters() {
    if (this.vGrid) {
      return this.vGrid.viewResources.lookupFunctions.valueConverters
    }
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    let values = this.value.split("|");
    this.attribute = values[0];
    this.filterOn = values[1] || "enter";
    this.filterOperator = values[2] || "=";
    this.valueFormater = values[3] ? this.valueConverters(values[3]) :null ;
    this.type = this.element.type;
    this.state = 0;

  }


  getValue() {
    if(this.type !== "checkbox"){
      return this.valueFormater ? this.valueFormater.fromView(this.element.value):this.element.value;
    } else {
      return this.state ? this.state === 2 ? true:false : "";
    }
  }

  resetValue() {
    if(this.type !== "checkbox"){
      this.element.value = "";
    } else {
      this.state = 0;
      this.element.checked = false
    }
  }


  updateFilter(curFilter) {
    var filterIndex = null;

    //get index of filter
    curFilter.forEach((filter, index)=> {
      if (filter.attribute === this.attribute) {
        filterIndex = index;
      }
    });

    if (filterIndex !== null) {

      //we found a filter, lets update
      if (this.getValue() === "") {
        curFilter.splice(filterIndex, 1)
      } else {
        curFilter[filterIndex].value = this.getValue()
      }

    } else {

      //we didnt find filter, lets add one
      if (this.getValue() !== "") {
        curFilter.push({
          attribute: this.attribute,
          operator: this.filterOperator,
          value: this.getValue()
        });
      }

    }
  }


  attached() {


    this.vGrid.element.addEventListener("filterUpdate", (e)=> {
      if(e.detail.attribute === this.attribute){
        this.filterOperator= e.detail.operator;
        this.element.placeholder = this.vGrid.vGridFilter.filterOperatorTableString[this.filterOperator];
        var curFilter = this.vGrid.vGridFilter.lastFilter;
        this.updateFilter(curFilter);
      }
    });


    this.vGrid.element.addEventListener("filterClearCell", (e)=> {
      if(e.detail.attribute === this.attribute){
        this.resetValue();
        var curFilter = this.vGrid.vGridFilter.lastFilter;
        this.updateFilter(curFilter);
      }
    });

    this.vGrid.element.addEventListener("filterClearAll", (e)=> {
        this.resetValue();
        var curFilter = this.vGrid.vGridFilter.lastFilter;
        this.updateFilter(curFilter);
    });





    if (this.type !== "checkbox") {

      //set text

      this.element.placeholder = this.vGrid.vGridFilter.filterOperatorTableString[this.filterOperator];


      //add eveent listner
      this.element.onkeyup = (e) => {
        if (e.keyCode === 13) {

          //if they hit enter we need to get filter, update and run query
          var curFilter = this.vGrid.vGridFilter.lastFilter;
          this.updateFilter(curFilter);
          this.vGrid.vGridConfig.onFilterRun(curFilter)

        } else {

          //if they hit enter we need to get filter, update
          var curFilter = this.vGrid.vGridFilter.lastFilter;
          this.updateFilter(curFilter);
          if (this.filterOn === "keydown") {
            this.vGrid.vGridConfig.onFilterRun(curFilter)
          }


        }
      };
    } else {

      this.element.onclick = (e) => {
        switch (this.state) {
          case 0:
            this.state = 2;
            this.element.style.opacity = 1;
            break;
          case 2:
            this.state = 3;
            this.element.style.opacity = 1;
            break;
          default:
            this.element.checked = false;
            this.state = 0;
            this.element.style.opacity = 0.3;
        }

        var curFilter = this.vGrid.vGridFilter.lastFilter;
        this.updateFilter(curFilter);
        this.vGrid.vGridConfig.onFilterRun(curFilter)

      }

    }


  }

}
