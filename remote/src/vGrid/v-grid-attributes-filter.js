/*****************************************************************************************************************
 *    Attributes for filtering users can add to headers to activate filtering
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
    this.valueFormater = values[3] = "null" ? null : values[3];
    this.type = this.element.type;
    this.state = null;

  }


  getValue() {
    //todo: checkbox? how to handle values, make user tell us, check if it is a checkbox? or orn attibute that control value ?
    //todo handle formating
    return this.element.value;
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

    if (this.type !== "checkbox") {
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


      }

    }


  }

}
