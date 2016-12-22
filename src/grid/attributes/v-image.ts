import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from '../v-grid';
import {BindingContext, OverrideContext } from '../../interfaces';

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
