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
                        <path d="M7.2393106 1.00117874C5.1581979 3.33755754 3.0770851 5.6739366.99597235 8.0103152H3.1866173c1.6024163-1.84237835 3.2048325-3.6847569 4.8072488-5.52713536 1.6024163 1.84237846 3.2048329 3.684757 4.8072489 5.52713537h2.190645c-2.081113-2.3363786-4.162226-4.67275766-6.2433384-7.00913646h-1.509111z"/>
                      </svg>`;
    let isDescHtml = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M7.2393106 15.0272644C5.1581979 12.6908856 3.0770851 10.35450654.99597235 8.01812793H3.1866173c1.6024163 1.84237836 3.2048325 3.6847569 4.8072488 5.52713537 1.6024163-1.84237846 3.2048329-3.684757 4.8072489-5.52713537h2.190645c-2.081113 2.3363786-4.162226 4.67275767-6.2433384 7.00913647h-1.509111z"/>
                      </svg>`;


    this.vGrid.attGridConnector.getCurrentOrderBy().forEach((x) => {
      if (x.attribute === this.attribute) {
        this.firstTime = false;
        let block = x.asc === true ? isAscHtml : isDescHtml;
        let main = `<i class="${'avg-fa-sort-number'}" data-vgridsort="${x.no}"></i>`;
        markup = block + main;
      }
    });

    return markup;
  }


}
