import { inject, customAttribute } from 'aurelia-framework';
import { VGrid } from '../v-grid';


@customAttribute('v-filter')
@inject(Element, VGrid)
export class VGridAttributesFilter {
  private vGrid: VGrid;
  private element: any;
  private value: any;
  private bindingContext: any;
  private overrideContext: any;
  private attribute: string;
  private filterOn: string;
  private filterOperator: string;
  private valueFormater: any;
  private type: string;
  private state: number;


  constructor(element: Element, vGrid: VGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }


  get valueConverters(): any {
    if (this.vGrid) {
      let valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
      return valueConverter;
      // return this.vGrid.viewResources.lookupFunctions.valueConverters;
    }
  }

  public attached(): void {

    if (this.attribute) { // if no attibute we do not want to do anything

      this.vGrid.element.addEventListener('filterUpdate', (e) => {
        if (e.detail.attribute === this.attribute) {
          this.filterOperator = e.detail.operator;
          this.element.placeholder = this.vGrid.attGridConnector.getFilterOperatorName(this.filterOperator);
          this.updateFilter(this.vGrid.attGridConnector.getCurrentFilter());
        }
      });


      this.vGrid.element.addEventListener('filterClearCell', (e) => {
        if (e.detail.attribute === this.attribute) {
          this.resetValue();
          this.updateFilter(this.vGrid.attGridConnector.getCurrentFilter());
        }
      });

      this.vGrid.element.addEventListener('filterClearAll', () => {
        this.resetValue();
        this.updateFilter(this.vGrid.attGridConnector.getCurrentFilter());
      });


      if (this.type !== 'checkbox') {

        this.element.placeholder = this.vGrid.attGridConnector.getFilterOperatorName(this.filterOperator);


        // add event listner
        this.element.onkeyup = (e) => {
          if (e.keyCode === 13) {

            // if they hit enter we need to get filter, update and run query
            this.updateFilter(this.vGrid.attGridConnector.getCurrentFilter());
            this.vGrid.attGridConnector.query(this.vGrid.attGridConnector.getCurrentFilter());

          } else {

            // if they hit enter we need to get filter, update
            this.updateFilter(this.vGrid.attGridConnector.getCurrentFilter());
            if (this.filterOn === 'onKeyDown') {
              this.vGrid.attGridConnector.query(this.vGrid.attGridConnector.getCurrentFilter());
            }
          }
        };


      } else {
        // set default!
        this.element.style.opacity = 0.3;
        // is checkbox
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
          this.updateFilter(this.vGrid.attGridConnector.getCurrentFilter());
          this.vGrid.attGridConnector.query(this.vGrid.attGridConnector.getCurrentFilter());
        };


      }
    }
  }

  public bind(bindingContext: any, overrideContext: any): void {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    // splitt options
    let values = this.value.split('|');

    // get attribute
    this.attribute = values[0].trim();

    // loop values and find out what options are
    if (values.length > 1) {
      values.forEach((value, i) => {
        if (i !== 0) {
          this.checkParams(value);
        }
      });
    }

    this.filterOn = this.filterOn || 'onEnterKey';
    this.filterOperator = this.filterOperator || '=';
    this.valueFormater = this.valueFormater || null;
    this.type = this.element.type;
    this.state = 0;

  }


  private checkParams(value: string): void {

    if (value !== undefined && value !== null) {
      value = value.trim();
    }

    let valueConverter = this.valueConverters(value);
    if (valueConverter) {
      this.valueFormater = valueConverter;
    }

    let filterOperator = this.vGrid.controller.getOperatorName(value);
    if (filterOperator) {
      this.filterOperator = value;
    }

    if (value === 'onKeyDown') {
      this.filterOn = value;
    }


  }


  private getValue(): any {
    if (this.type !== 'checkbox') {
      return this.valueFormater ? this.valueFormater.fromView(this.element.value) : this.element.value;
    } else {
      return this.state ? this.state === 2 ? true : false : '';
    }
  }


  private resetValue(): void {
    if (this.type !== 'checkbox') {
      this.element.value = '';
    } else {
      this.state = 0;
      this.element.checked = false;
    }
  }


  private updateFilter(curFilter): void {
    let filterIndex = null;

    // get index of filter
    curFilter.forEach((filter, index) => {
      if (filter.attribute === this.attribute) {
        filterIndex = index;
      }
    });

    if (filterIndex !== null) {

      // we found a filter, lets update
      if (this.getValue() === '') {
        curFilter.splice(filterIndex, 1);
      } else {
        curFilter[filterIndex].value = this.getValue();
        curFilter[filterIndex].operator = this.filterOperator;
      }

    } else {

      // we didnt find filter, lets add one
      if (this.getValue() !== '') {
        curFilter.push({
          attribute: this.attribute,
          operator: this.filterOperator,
          value: this.getValue()
        });
      }

    }
  }



}
