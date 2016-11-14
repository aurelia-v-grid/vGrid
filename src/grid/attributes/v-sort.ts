import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from '../v-grid';


@customAttribute('v-sort')
@inject(Element, VGrid)
export class vGridAttributesSort {
  vGrid:VGrid;
  element:any;
  bindingContext:any;
  overrideContext:any;
  attribute:any;
  sortIcon:any;
  value:any;

  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    //get values
    let values = this.value.split("|");
    this.attribute = values[0];

  }


  attached() {
    this.sortIcon = document.createElement("i");
    this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
    this.element.appendChild(this.sortIcon);
    this.element.onmousedown = (e)=> {
      this.element.onmouseup = (e)=> {
        if (e.button === 0) {
          this.vGrid.attGridConnector.orderBy(this.attribute, e.shiftKey);
        }
      };
      setTimeout(()=> {
        this.element.onmouseup = null;
      }, 300);

    };

    this.vGrid.element.addEventListener("sortIconUpdate", ()=> {
      this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
    });
  }


  detached() {
    this.element.removeChild(this.sortIcon);
  }


  getSortIconMarkup(attribute) {

    var markup = `&nbsp;<i  class="${"avg-fa avg-fa-sort"}"></i>`;
    var isAscHtml = `&nbsp;<i  class="${"avg-fa avg-fa-sort-asc"}"></i>`;
    var isDescHtml = `&nbsp;<i  class="${"avg-fa avg-fa-sort-desc"}"></i>`;


    let sortNo = this.vGrid.attGridConnector.getCurrentOrderBy();
    this.vGrid.attGridConnector.getCurrentOrderBy().forEach((x) => {
      if (x.attribute === this.attribute) {
        var block = x.asc === true ? isAscHtml : isDescHtml;
        var main = `<i class="${"avg-fa-sort-number"}" data-vgridsort="${x.no}"></i>`;
        markup = block + main;
      }
    });

    return markup;
  }


}
