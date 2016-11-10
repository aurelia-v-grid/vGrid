import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from '../v-grid';


@customAttribute('v-image-fix')
@inject(Element, VGrid)
export class VGridAttributesImageFix {
  private vGrid: VGrid;
  private element: any;
  private value: any;

  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }


  public valueChanged(newValue, oldValue): void {
    this.element.src = '';
    this.element.src = this.value || newValue;
  }


  public bind(bindingContext, overrideContext): void {
    this.element.src = '';
    this.element.src = this.value || '';
  }


}
