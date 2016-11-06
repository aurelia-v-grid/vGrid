import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from '../v-grid';


@customAttribute('v-image-fix')
@inject(Element, VGrid)
export class vGridAttributesImageFix {

  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }


  valueChanged(newValue, oldValue) {
    this.element.src = "";
    this.element.src = this.value || newValue;
  }


  bind(bindingContext, overrideContext) {
    this.element.src = "";
    this.element.src = this.value || "";
  }


}
