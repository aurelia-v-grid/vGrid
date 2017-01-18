import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from '../v-grid';
import {BindingContext, OverrideContext } from '../../interfaces';


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
  private bindingContext: BindingContext;
  private overrideContext: OverrideContext;



  constructor(element: HTMLImageElement, vGrid: VGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }



  public valueChanged(newValue: string): void {
    newValue = newValue ? newValue : '';
    this.element.src = '';
    this.element.src = this.value || newValue;
  }



  public bind(bindingContext: BindingContext, overrideContext: OverrideContext): void {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    this.element.src = '';
    this.element.src = this.value || '';
  }
}
