import { inject, customAttribute, bindable } from 'aurelia-framework';
import { VGrid } from '../v-grid';
import { BindingContextInterface, OverrideContextInterface, FilterObjectInterface } from '../../interfaces';


/**
 * Custom attribute "v-filter"
 * Logic behind filter in headers
 * Used by default by the simple html setup
 * Can be used with custom html
 *
 */
@customAttribute('v-filter')
@inject(Element, VGrid)
export class VGridAttributesFilter {
  @bindable private field: string;
  @bindable private operator: string;
  @bindable private converter: string;
  @bindable private keydown: string;
  @bindable private key: string;
  private vGrid: VGrid;
  private element: HTMLElement;
  private bindingContext: BindingContextInterface;
  private overrideContext: OverrideContextInterface;
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



  /**
   * todo description
   *
   */
  public getOperatorName(operator: string): string {
    return this.vGrid.filterOperatorNames[operator];
  }



  /**
   * todo description
   *
   */
  public attached(): void {

    if (this.attribute) { // if no attibute we do not want to do anything

      this.vGrid.element.addEventListener('filterUpdate', (e: CustomEvent) => {
        if (e.detail.attribute === this.attribute && e.detail.key === this.key) {
          this.filterOperator = e.detail.operator;
          (this.element as HTMLInputElement).placeholder =
            this.getOperatorName(this.filterOperator);
          this.updateFilter(this.vGrid.attGridConnector.getCurrentFilter());
        }
      });

      this.vGrid.element.addEventListener('filterUpdateValues', () => {
      let curFilter = this.vGrid.attGridConnector.getCurrentFilter();
      curFilter.forEach((f: any) => {
          if (f.attribute === this.attribute  && f.key === this.key) {
            (this.element as HTMLInputElement).value = f.value;
            this.filterOperator = f.operator;
            (this.element as HTMLInputElement).placeholder =
            this.getOperatorName(this.filterOperator);
            }
         });
      });

      this.vGrid.element.addEventListener('filterTranslation', () => {
          (this.element as HTMLInputElement).placeholder =
            this.getOperatorName(this.filterOperator);
          this.updateFilter(this.vGrid.attGridConnector.getCurrentFilter());
      });

      this.vGrid.element.addEventListener('filterClearCell', (e: CustomEvent) => {
        if (e.detail.attribute === this.attribute  && e.detail.key === this.key) {
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

            // if they did nop hit enter we need to check if keydown is the trigger
            if (this.filterOn === 'onKeyDown') {
              this.updateFilter(this.vGrid.attGridConnector.getCurrentFilter());
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



  /**
   * todo description
   *
   */
  public bind(bindingContext: BindingContextInterface, overrideContext: OverrideContextInterface): void {
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



  /**
   * todo description
   *
   */
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



  /**
   * todo description
   *
   */
  private resetValue(): void {
    if (this.type !== 'checkbox') {
      (this.element as HTMLInputElement).value = '';
    } else {
      this.state = 0;
      (this.element as HTMLInputElement).checked = false;
    }
  }



  /**
   * todo description
   *
   */
  private updateFilter(curFilter: FilterObjectInterface[]): void {
    let filterIndex = -1;

    // get index of filter
    curFilter.forEach((filter: FilterObjectInterface, index: number) => {
      if (filter.attribute === this.attribute && filter.key === this.key) {
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
          key : this.key,
          attribute: this.attribute,
          operator: this.filterOperator,
          value: this.getValue()
        });
      }

    }
  }



  /**
   * todo description
   *
   */
  private valueConverters(value: string): { fromView: Function; toView: Function } {
    let valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
    return valueConverter(value);
  }

}
