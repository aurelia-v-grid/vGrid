import { bindable, inject, customAttribute } from 'aurelia-framework';
import { VGrid } from '../v-grid';
import { Controller, GroupingElements } from '../../interfaces';

@customAttribute('v-menu')
@inject(Element, VGrid)
export class VGridAttributeMenu {
  private element: Element;
  private controller: Controller;
  private raiseEvent: Function;
  private openBinded: EventListenerOrEventListenerObject;
  private checkBinded: EventListenerOrEventListenerObject;
  private callbackBinded: Function;
  private groupingElements: GroupingElements;

  @bindable private filter: string;
  @bindable private sort: string ;
  @bindable private pinned: string;
  @bindable private groupby: string;
  // @bindable private copypaste: string; //todo

  constructor(element: Element, vGrid: VGrid) {
    this.element = element;
    this.controller = vGrid.controller;
    this.raiseEvent = vGrid.controller.raiseEvent;
    this.groupingElements = vGrid.groupingElements;

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

  private check(e: MouseEvent): void {
    let x = (e.target as HTMLElement).classList.contains('avg-menu__link');
    if (!x) {
      this.controller.contextMenu.setDefaults();
      document.removeEventListener('click', this.checkBinded);
    }
  }

  private callback(type: string, option: string, event: MouseEvent): boolean {
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

      let field: string = this.sort;
      let arr: string[] = this.sort.split(';');
      arr.forEach((x: string) => {
          if (x.indexOf('field') !== -1) {
            field = x.replace('field:', '');
          }
      });

      this.controller.attGridConnector.orderBy({
        attribute: field,
        asc: option === 'desc' ? false : true
      }, event.shiftKey);
      document.removeEventListener('click', this.checkBinded);
      return true;
    }

    if (type === 'groupby') {
      this.groupingElements.addGroup(this.groupby, this.groupby);
      this.groupingElements.addToGrouping();
      return true;
    }

    if (type === 'filterOption') {

      let field: string = this.filter;
      let arr: string[] = this.filter.split(';');
      arr.forEach((x: string) => {
          if (x.indexOf('field') !== -1) {
            field = x.replace('field:', '');
          }
      });

      this.raiseEvent('filterUpdate', {
        attribute: field,
        operator: option
      });
      document.removeEventListener('click', this.checkBinded);
      return true;
    }
    return false;
  }

  private open(e: MouseEvent): void {
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
        groupby: this.groupby,
        callback: this.callbackBinded
      });
    }
  }

  private getPosition(e: MouseEvent): any {
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
