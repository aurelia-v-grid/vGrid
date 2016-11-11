import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from '../v-grid';


@customAttribute('v-image-fix')
@inject(Element, VGrid)
export class VGridAttributesImageFix {
  private vGrid: VGrid;
  private element: any;
  private value: any;

  constructor(element: Element, vGrid: VGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }


  public valueChanged(newValue: string, oldValue: string): void {
    this.element.src = '';
    this.element.src = this.value || newValue;
  }


  public bind(bindingContext: any, overrideContext: any): void {
    this.element.src = '';
    this.element.src = this.value || '';
  }


}
