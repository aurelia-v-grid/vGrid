import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from '../v-grid';
import {BindingContext, OverrideContext } from '../../interfaces';


@customAttribute('v-image-fix')
@inject(Element, VGrid)
export class VGridAttributesImageFix {
  private vGrid: VGrid;
  private element: HTMLImageElement;
  private value: string;

  constructor(element: HTMLImageElement, vGrid: VGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }


  public valueChanged(newValue: string, oldValue: string): void {
    this.element.src = '';
    this.element.src = this.value || newValue;
  }


  public bind(bindingContext: BindingContext, overrideContext: OverrideContext): void {
    this.element.src = '';
    this.element.src = this.value || '';
  }


}
