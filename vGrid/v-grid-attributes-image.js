/*****************************************************************************************************************
 *    quickfix/hack until they fix this
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute, Optional} from 'aurelia-framework';
import {VGrid} from './v-grid';


@customAttribute('v-image-fix')
@inject(Element, VGrid)
export class vGridAttributesImageFix {

  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    let x = this.element.src;
    this.element.src = "";
    this.element.src = x
  }

  attached() {

  }


}
