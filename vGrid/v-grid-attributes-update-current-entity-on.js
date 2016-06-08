/*****************************************************************************************************************
 *    Just to have instant update on row events
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from './v-grid';


@customAttribute('v-update-current-entity-on')
@inject(Element, VGrid)
export class vGridAttributesUpdateCurrentEntityOn {


  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
    this.timer = null;
  }



  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

  }


  attached() {
    //only way I know how to update this without user clicking on something on same row

    this.element.addEventListener(this.value,(e) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(()=>{
        let data = this.vGrid.vGridCurrentEntityRef;
        for (var k in data) {
          if (data.hasOwnProperty(k)) {
            if (this.vGrid.vGridCurrentEntity[k] !== data[k]) {
              this.vGrid.vGridCurrentEntity[k] = data[k];
            }
          }
        }
      },200);

    });
  }



}
