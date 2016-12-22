import { inject, customAttribute, bindable } from 'aurelia-framework';
import { VGrid } from '../v-grid';
import { BindingContext, OverrideContext } from '../../interfaces';

@customAttribute('v-sort')
@inject(Element, VGrid)
export class VGridAttributesSort {
  @bindable private field: string;
  @bindable private asc: string;
  private vGrid: VGrid;
  private element: HTMLElement;
  private bindingContext: BindingContext;
  private overrideContext: OverrideContext;
  private attribute: string;
  private sortIcon: HTMLElement;
  private firstTime: boolean = true;

  constructor(element: HTMLElement, vGrid: VGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }

  public bind(bindingContext: BindingContext, overrideContext: OverrideContext): void {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    this.attribute = this.field;
  }

  public attached(): void {
    this.sortIcon = document.createElement('i');
    this.sortIcon.innerHTML = this.getSortIconMarkup();
    this.element.appendChild(this.sortIcon);
    this.element.onmousedown = () => {
      this.element.onmouseup = (e) => {
        if (e.button === 0) {
          if (this.firstTime && this.asc === 'false') {
            this.vGrid.attGridConnector.orderBy({ attribute: this.attribute, asc: false }, e.shiftKey);
          } else {
            this.vGrid.attGridConnector.orderBy(this.attribute, e.shiftKey);
          }
        }
      };
      setTimeout(() => {
        this.element.onmouseup = null;
      }, 300);

    };

    this.vGrid.element.addEventListener('sortIconUpdate', () => {
      this.sortIcon.innerHTML = this.getSortIconMarkup();
    });
  }

  public detached(): void {
    this.element.removeChild(this.sortIcon);
  }

  private getSortIconMarkup(): string {

    let markup = ``;
    let isAscHtml = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M7.4 6L3 10h1.5L8 7l3.4 3H13L8.5 6h-1z"/>
                      </svg>`;
    let isDescHtml = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M7.4 10L3 6h1.5L8 9.2 11.3 6H13l-4.5 4h-1z"/>
                      </svg>`;

    let sortlength: number = this.vGrid.attGridConnector.getCurrentOrderBy().length;
    this.vGrid.attGridConnector.getCurrentOrderBy().forEach((x) => {
      if (x.attribute === this.attribute) {
        this.firstTime = false;
        let block = x.asc === true ? isAscHtml : isDescHtml;
        let main = '';
        if (sortlength > 1) {
          main = `<i class="${'avg-fa-sort-number'}" data-vgridsort="${x.no}"></i>`;
        }

        markup = block + main;
      }
    });

    return markup;
  }

}
