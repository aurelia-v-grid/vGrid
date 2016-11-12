import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from '../v-grid';
import {BindingContext, OverrideContext} from '../../interfaces';

@customAttribute('v-sort')
@inject(Element, VGrid)
export class VGridAttributesSort {
  private vGrid: VGrid;
  private element: Element;
  private bindingContext: BindingContext;
  private overrideContext: OverrideContext;
  private attribute: string;
  private sortIcon: HTMLElement;
  private value: string;

  constructor(element: Element, vGrid: VGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }


  public bind(bindingContext: BindingContext, overrideContext: OverrideContext): void {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    // get values
    let values = this.value.split('|');
    this.attribute = values[0];

  }


  public attached(): void {
    this.sortIcon = document.createElement('i');
    this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
    this.element.appendChild(this.sortIcon);
    (this.element as HTMLElement).onmousedown = (e) => {
      (this.element as HTMLElement).onmouseup = (e) => {
        if (e.button === 0) {
          this.vGrid.attGridConnector.orderBy(this.attribute, e.shiftKey);
        }
      };
      setTimeout(() => {
        (this.element as HTMLElement).onmouseup = null;
      }, 300);

    };

    this.vGrid.element.addEventListener('sortIconUpdate', () => {
      this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
    });
  }


  public detached(): void {
    this.element.removeChild(this.sortIcon);
  }


  private getSortIconMarkup(attribute: string): string {

    let markup = `&nbsp;<i  class="${'avg-fa avg-fa-sort'}"></i>`;
    let isAscHtml = `&nbsp;<i  class="${'avg-fa avg-fa-sort-asc'}"></i>`;
    let isDescHtml = `&nbsp;<i  class="${'avg-fa avg-fa-sort-desc'}"></i>`;


    this.vGrid.attGridConnector.getCurrentOrderBy().forEach((x) => {
      if (x.attribute === this.attribute) {
        let block = x.asc === true ? isAscHtml : isDescHtml;
        let main = `<i class="${'avg-fa-sort-number'}" data-vgridsort="${x.no}"></i>`;
        markup = block + main;
      }
    });

    return markup;
  }


}
