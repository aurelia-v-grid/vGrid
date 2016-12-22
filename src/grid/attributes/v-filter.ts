import { inject, customAttribute, bindable } from 'aurelia-framework';
import { VGrid } from '../v-grid';
import { BindingContext, OverrideContext, FilterObject } from '../../interfaces';

@customAttribute('v-filter')
@inject(Element, VGrid)
export class VGridAttributesFilter {
  @bindable private field: string;
  @bindable private operator: string;
  @bindable private converter: string;
  @bindable private keydown: string;
  private vGrid: VGrid;
  private element: HTMLElement;
  private bindingContext: BindingContext;
  private overrideContext: OverrideContext;
  private attribute: string;
  private filterOn: string;
  private filterOperator: string;
  private valueFormater: { fromView: Function; toView: Function };
  private type: string;
  private state: number;

  constructor(element: HTMLElement, vGrid: VGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }

  public getOperatorName(operator: string): string {
    return this.vGrid.filterOperatorNames[operator];
  }

  public attached(): void {

    if (this.attribute) { // if no attibute we do not want to do anything

      this.vGrid.element.addEventListener('filterUpdate', (e: CustomEvent) => {
        if (e.detail.attribute === this.attribute) {
          this.filterOperator = e.detail.operator;
          (this.element as HTMLInputElement).placeholder =
            this.getOperatorName(this.filterOperator);
          this.updateFilter(this.vGrid.attGridConnector.getCurrentFilter());
        }
      });

      this.vGrid.element.addEventListener('filterTranslation', () => {
          (this.element as HTMLInputElement).placeholder =
            this.getOperatorName(this.filterOperator);
          this.updateFilter(this.vGrid.attGridConnector.getCurrentFilter());
      });

      this.vGrid.element.addEventListener('filterClearCell', (e: CustomEvent) => {
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

        (this.element as HTMLInputElement).placeholder =
          this.getOperatorName(this.filterOperator);

        // add event listner
        this.element.onkeyup = (e: KeyboardEvent) => {
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
        (this.element as HTMLInputElement).indeterminate  = true;
        (this.element as HTMLElement).style.opacity = '0.3';
        // is checkbox
        this.element.onclick = () => {
          switch (this.state) {
            case 0:
              this.state = 2;
              this.element.style.opacity = '1';
              (this.element as HTMLInputElement).checked = true;
              (this.element as HTMLInputElement).indeterminate = false;
              break;
            case 2:
              this.state = 3;
              this.element.style.opacity = '1';
              (this.element as HTMLInputElement).indeterminate = false;
              break;
            default:
              (this.element as HTMLInputElement).checked = false;
              this.state = 0;
              this.element.style.opacity = '0.3';
              (this.element as HTMLInputElement).indeterminate = true;
          }
          this.updateFilter(this.vGrid.attGridConnector.getCurrentFilter());
          this.vGrid.attGridConnector.query(this.vGrid.attGridConnector.getCurrentFilter());
        };

      }
    }
  }

  public bind(bindingContext: BindingContext, overrideContext: OverrideContext): void {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    let valueConverter = this.valueConverters(this.converter);
    this.filterOn = this.keydown === 'true' ? 'onKeyDown' : 'onEnterKey';
    this.filterOperator = this.operator || '=';
    this.attribute = this.field;
    this.valueFormater = valueConverter || null;
    this.type = (this.element as HTMLInputElement).type;
    this.state = 0;
  }

  private getValue(): any {
    if (this.type !== 'checkbox') {
      return this.valueFormater ? this.valueFormater.fromView(
        (this.element as HTMLInputElement).value) : (this.element as HTMLInputElement).value;
    } else {
      if (this.valueFormater && this.state) {
        return this.valueFormater.fromView(this.state ? this.state === 2 ? true : false : '');
      } else {
        return this.state ? this.state === 2 ? true : false : '';
      }
    }
  }

  private resetValue(): void {
    if (this.type !== 'checkbox') {
      (this.element as HTMLInputElement).value = '';
    } else {
      this.state = 0;
      (this.element as HTMLInputElement).checked = false;
    }
  }

  private updateFilter(curFilter: FilterObject[]): void {
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
  }

  private valueConverters(value: string): { fromView: Function; toView: Function } {
    let valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
    return valueConverter(value);
  }

}
