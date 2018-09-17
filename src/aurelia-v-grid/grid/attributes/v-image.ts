import { customAttribute } from '@aurelia/runtime';
import { inject } from '@aurelia/kernel';
import { VGrid } from '../v-grid';
import { BindingContextInterface, OverrideContextInterface } from '../../interfaces';


/**
 * Custom attribute "v-image-fix"
 * Clears src of image so it does not lag
 * Used by default by the simple html setup
 * Can be used with custom html
 *
 */
@customAttribute('v-image-fix')
@inject(Element, VGrid)
export class VGridAttributesImageFix {
  private vGrid: VGrid;
  private element: HTMLImageElement;
  private value: string;
  private bindingContext: BindingContextInterface;
  private overrideContext: OverrideContextInterface;



  constructor(element: HTMLImageElement, vGrid: VGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }



  /**
   * triggers when value is changed, usually when new row data is set during scrolling
   * want to set it to blank if undefined, else user get error in console
   *
   */
  public valueChanged(newValue: string): void {
    newValue = newValue ? newValue : '';
    this.element.src = '';
    this.element.src = this.value || newValue;
  }



  /**
   * only trigged when row is created/ grid is recreated
   *
   */
  public bind(bindingContext: BindingContextInterface, overrideContext: OverrideContextInterface): void {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    this.element.src = '';
    this.element.src = this.value || '';
  }
}
