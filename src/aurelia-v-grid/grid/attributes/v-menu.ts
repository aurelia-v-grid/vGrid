import { bindable, inject, customAttribute } from 'aurelia-framework';
import { VGrid } from '../v-grid';
// for typings
import { Controller } from '../controller';

@customAttribute('v-menu')
@inject(Element, VGrid)
export class VGridAttributeMenu {
  private element: any;
  private controller: Controller;
  private raiseEvent: any;
  private openBinded: any;
  private checkBinded: any;
  private callbackBinded: any;


  @bindable private filter;
  @bindable private sort;
  @bindable private pinned;
  @bindable private copypaste; //todo


  constructor(element, vGrid) {
    this.element = element;
    this.controller = vGrid.controller;
    this.raiseEvent = vGrid.controller.raiseEvent;

    this.openBinded = this.open.bind(this);
    this.checkBinded = this.check.bind(this);
    this.callbackBinded = this.callback.bind(this);
  }

  public attached(): void {
    this.element.addEventListener('contextmenu', this.openBinded);
  }


  public unbind(): void {
    document.removeEventListener('click', this.checkBinded);
  }


  private check(e): void {
    let x = e.target.classList.contains('avg-menu__link');
    if (!x) {
      this.controller.contextMenu.setDefaults();
      document.removeEventListener('click', this.checkBinded);
    }
  }


  private callback(type, option, event): boolean {
    if (type === 'filter') {
      if (option === 'clear') {
        this.raiseEvent('filterClearCell', { attribute: this.filter.replace('rowRef.', '') });
        document.removeEventListener('click', this.checkBinded);
        return true;
      }

      if (option === 'clearall') {
        this.raiseEvent('filterClearAll', {});
        document.removeEventListener('click', this.checkBinded);
        return true;
      }

      if (option === 'showall') {
        this.controller.attGridConnector.query(null);
        document.removeEventListener('click', this.checkBinded);
        return true;
      }

    }

    if (type === 'sort') {

      this.controller.attGridConnector.orderBy({
        attribute: this.sort.replace('rowRef.', ''),
        asc: option === 'desc' ? false : true
      }, event.shiftKey);
      document.removeEventListener('click', this.checkBinded);
      return true;
    }

    if (type === 'filterOption') {
      this.raiseEvent('filterUpdate', {
        attribute: this.filter.replace('rowRef.', ''),
        operator: option
      });
      document.removeEventListener('click', this.checkBinded);
      return true;
    }
  }


  private open(e): void {
    this.check(e);
    document.addEventListener('click', this.checkBinded);
    e.preventDefault();
    if (!this.controller.contextMenu.show) {
      let clickCoords = this.getPosition(e);
      this.controller.contextMenu.openMenu({
        top: clickCoords.y,
        left: clickCoords.x,
        filter: this.filter,
        sort: this.sort,
        pinned: this.pinned,
        callback: this.callbackBinded
      });
    }

  }


  private getPosition(e): any {
    let posx = 0;
    let posy = 0;


    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    };
  }


}
