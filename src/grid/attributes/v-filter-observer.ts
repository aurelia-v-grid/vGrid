import { inject, customAttribute, bindable } from 'aurelia-framework';
import { VGrid } from '../v-grid';
import { BindingContext, OverrideContext, FilterObject } from '../../interfaces';

@customAttribute('v-filter-observer')
@inject(Element, VGrid)
export class VGridAttributesFilterObserver {
  @bindable private field: string;
  @bindable private operator: string;
  @bindable private converter: string;
  @bindable private value: string;
  private vGrid: VGrid;
  private element: HTMLElement;
  private bindingContext: BindingContext;
  private overrideContext: OverrideContext;
  private attribute: string;
  private filterOperator: string;
  private valueFormater: { fromView: Function; toView: Function };
  private state: number;

  constructor(element: HTMLElement, vGrid: VGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }

  public valueChanged(newValue: any) {
    if (this.attribute && newValue) { // if no attibute we do not want to do anything
        this.updateFilter();
    }
  }

  public bind(bindingContext: BindingContext, overrideContext: OverrideContext): void {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    let valueConverter = this.valueConverters(this.converter);
    this.filterOperator = this.operator || '=';
    this.attribute = this.field;
    this.valueFormater = valueConverter || null;
    this.state = 0;
  }

  private getValue(): any {
      return this.valueFormater ? this.valueFormater.fromView(this.value) : this.value;
  }

  private updateFilter(): void {
    let curFilter: FilterObject[] = this.vGrid.attGridConnector.getCurrentFilter();
    let filterIndex = -1;

    // get index of filter
    curFilter.forEach((filter: FilterObject, index: number) => {
      if (filter.attribute === this.attribute) {
        filterIndex = index;
      }
    });

    if (filterIndex !== -1) {

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

    this.vGrid.attGridConnector.query(this.vGrid.attGridConnector.getCurrentFilter());
  }

  private valueConverters(value: string): { fromView: Function; toView: Function } {
    let valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
    return valueConverter(value);
  }

}
