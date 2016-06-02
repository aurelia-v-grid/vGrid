/*****************************************************************************************************************
 *    Attributes for header so users can add to headers to activate filtering
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute, Optional} from 'aurelia-framework';
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
      return this.vGrid.viewResources.lookupFunctions.valueConverters;
    }
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    //splitt options
    let values = this.value.split("|");

    //get attribute
    this.attribute = values[0].trim();

    //loop values and find out what options are
    if (values.length > 1) {
      values.forEach((value, i)=> {
        if (i !== 0) {
          this.checkParams(value)
        }
      });
    }

    this.filterOn = this.filterOn || "onEnterKey";
    this.filterOperator = this.filterOperator || "=";
    this.valueFormater = this.valueFormater || null;
    this.type = this.element.type;
    this.state = 0;

  }


  checkParams(value) {

    if (value !== undefined && value !== null) {
      value = value.trim();
    }

    let valueConverter = this.valueConverters(value);
    if (valueConverter) {
      this.valueFormater = valueConverter;
    }

    let filterOperator = this.vGrid.vGridFilter.filterOperatorTableString[value];
    if (filterOperator) {
      this.filterOperator = value;
    }

    if (value === "onKeyDown") {
      this.filterOn = value;
    }


  }


  getValue() {
    if (this.type !== "checkbox") {
      return this.valueFormater ? this.valueFormater.fromView(this.element.value) : this.element.value;
    } else {
      return this.state ? this.state === 2 ? true : false : "";
    }
  }


  resetValue() {
    if (this.type !== "checkbox") {
      this.element.value = "";
    } else {
      this.state = 0;
      this.element.checked = false;
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
        curFilter[filterIndex].value = this.getValue();
        curFilter[filterIndex].operator = this.filterOperator;
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

    if (this.attribute) { //if no attibute we do not want to do anything

      this.vGrid.element.addEventListener("filterUpdate", (e)=> {
        if (e.detail.attribute === this.attribute) {
          this.filterOperator = e.detail.operator;
          this.element.placeholder = this.vGrid.vGridFilter.filterOperatorTableString[this.filterOperator];
          this.updateFilter(this.vGrid.vGridFilter.lastFilter);
        }
      });


      this.vGrid.element.addEventListener("filterClearCell", (e)=> {
        if (e.detail.attribute === this.attribute) {
          this.resetValue();
          this.updateFilter(this.vGrid.vGridFilter.lastFilter);
        }
      });

      this.vGrid.element.addEventListener("filterClearAll", (e)=> {
        this.resetValue();
        this.updateFilter(this.vGrid.vGridFilter.lastFilter);
      });


      if (this.type !== "checkbox") {

        this.element.placeholder = this.vGrid.vGridFilter.filterOperatorTableString[this.filterOperator];


        //add eveent listner
        this.element.onkeyup = (e) => {
          if (e.keyCode === 13) {

            //if they hit enter we need to get filter, update and run query
            this.updateFilter(this.vGrid.vGridFilter.lastFilter);
            this.vGrid.vGridConfig.onFilterRun(this.vGrid.vGridFilter.lastFilter);

          } else {

            //if they hit enter we need to get filter, update
            this.updateFilter(this.vGrid.vGridFilter.lastFilter);
            if (this.filterOn === "onKeyDown") {
              this.vGrid.vGridConfig.onFilterRun(this.vGrid.vGridFilter.lastFilter);
            }
          }
        };


      } else {
        //set default!
        this.element.style.opacity = 0.3;
        //is checkbox
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
          this.updateFilter(this.vGrid.vGridFilter.lastFilter);
          this.vGrid.vGridConfig.onFilterRun(this.vGrid.vGridFilter.lastFilter);
        }


      }
    }
  }
}
