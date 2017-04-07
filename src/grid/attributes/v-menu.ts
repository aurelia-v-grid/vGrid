import { bindable, inject, customAttribute } from 'aurelia-framework';
import { VGrid } from '../v-grid';
import { Controller, GroupingElements } from '../../interfaces';


/**
 * Custom attribute "v-image-fix"
 * logic behind menu/ adds contextmenu to grid
 * Used by default by the simple html setup
 * Can be used with custom html
 *
 */
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
  @bindable private filterkey: string;
  @bindable private sort: string;
  @bindable private pinned: string;
  @bindable private groupby: string;
  @bindable private hideshow: string
  @bindable private groupbytitle: string;
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



  /**
   * todo description
   *
   */
  public attached(): void {
    this.element.addEventListener('contextmenu', this.openBinded);
  }



  /**
   * todo description
   *
   */
  public unbind(): void {
    document.removeEventListener('click', this.checkBinded);
  }



  /**
   * todo description
   *
   */
  private check(e: MouseEvent): void {
    let x = (e.target as HTMLElement).classList.contains('avg-menu__link');
    if (!x) {
      this.controller.contextMenu.setDefaults();
      document.removeEventListener('mousedown', this.checkBinded);
    }
  }



  /**
   * callbacks from the contextMenu class
   *
   */
  private callback(type: string, option: string, event: MouseEvent): boolean {
    if (type === 'filter') {
      if (option === 'clear') {
        this.raiseEvent('filterClearCell', { attribute: this.filter.replace('rowRef.', ''), key: this.filterkey });
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

    if (type === 'hide') {

      // get column context
      let x = this.getColumnContext();

      // get current width
      let width = x.curColumnsArray[x.curColNo].width;

      let count = -1;

      let columnsArraySorted: any[] = [];
      x.curColumnsArray.forEach((x: any) => {
        if(x.show){
          count++;
        }
        columnsArraySorted.push(x);
      });

      if(count){
      //hide it
      x.curColumnsArray[x.curColNo].show = false;

      //correct left
      columnsArraySorted.sort(
        (a: any, b: any) => {
          return a.left - b.left;
        });

      let appendValue = 0

      columnsArraySorted.forEach((x: any) => {
        if (x.show) {
          x.left = appendValue;
          appendValue = appendValue + x.width;
        }
      });

      // correct container
      if (x.curColType === 'main') {
        this.controller.htmlHeightWidth.avgContentMainScroll_Width = this.controller.htmlHeightWidth.avgContentMainScroll_Width - width;
        this.controller.htmlHeightWidth.avgContentHhandleScroll_Width = this.controller.htmlHeightWidth.avgContentHhandleScroll_Width - width;
      }

      if (x.curColType === 'right') {
        this.controller.htmlHeightWidth.avgContentRight_Width = this.controller.htmlHeightWidth.avgContentRight_Width - width;
        this.controller.htmlHeightWidth.avgHeaderRight_Width = this.controller.htmlHeightWidth.avgHeaderRight_Width - width;

        this.controller.htmlHeightWidth.avgContentMain_Right = this.controller.htmlHeightWidth.avgContentMain_Right - width;
        this.controller.htmlHeightWidth.avgHeaderMain_Right = this.controller.htmlHeightWidth.avgHeaderMain_Right - width;
        this.controller.htmlHeightWidth.avgContentHhandle_Right = this.controller.htmlHeightWidth.avgContentHhandle_Right - width;
      }

      if (x.curColType === 'left') {

        this.controller.htmlHeightWidth.avgContentLeft_Width = this.controller.htmlHeightWidth.avgContentLeft_Width - width;
        this.controller.htmlHeightWidth.avgHeaderLeft_Width = this.controller.htmlHeightWidth.avgHeaderLeft_Width - width;

        this.controller.htmlHeightWidth.avgContentMain_Left = this.controller.htmlHeightWidth.avgContentMain_Left - width;
        this.controller.htmlHeightWidth.avgHeaderMain_Left = this.controller.htmlHeightWidth.avgHeaderMain_Left - width;
        this.controller.htmlHeightWidth.avgContentHhandle_Left = this.controller.htmlHeightWidth.avgContentHhandle_Left - width;
      }


      // tell menu to close
      return true;
      }
    }


    if (type === 'groupby') {
      let groupTitle = this.groupbytitle ? this.groupbytitle : this.groupby;
      this.groupingElements.addGroup(groupTitle, this.groupby);
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
        operator: option,
        key: this.filterkey
      });
      document.removeEventListener('click', this.checkBinded);
      return true;
    }
    return false;
  }



  /**
   * calls the context menu class to open the menu
   *
   */
  private open(e: MouseEvent): void {
    this.check(e);
    document.addEventListener('mousedown', this.checkBinded);
    e.preventDefault();
    if (!this.controller.contextMenu.show) {
      let clickCoords = this.getPosition(e);
      this.controller.contextMenu.openMenu({
        top: clickCoords.y,
        left: clickCoords.x,
        filter: this.filter,
        sort: this.sort,
        hideshow: this.hideshow,
        pinned: this.pinned,
        groupby: this.groupby,
        callback: this.callbackBinded
      });
    }
  }



  /**
   * gets mouse position
   *
   */
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



  /**
   * gets column context
   *
   */
  private getColumnContext(): any {
    let curTarget: Element = this.element;
    let count = 0;
    let exit = true;
    let isOk = false;
    let curColType;
    let curColNo;
    let curContext;
    let curColumnsArray;


    while (exit) {
      // have count, so we dont end up locking browser if anything goes really bad
      count++;

      // if we dont have target, fail!
      if (!curTarget) {
        exit = false;
      } else {


        // check if it contains our elements, or continue to next parentNode
        switch (true) {
          case curTarget.nodeName === 'AVG-COL':
            isOk = true;
            exit = false;
            break;
          default:
            curTarget = (curTarget.parentNode as Element);
            break;
        }
      }

      // 20 times, we failed!
      if (count > 10) {
        exit = false;
      }

    }

    if (isOk) {
      curColType = curTarget.attributes.getNamedItem('data-avg-type').value;
      curColNo = parseInt(curTarget.attributes.getNamedItem('data-avg-config-col').value, 10);
      curContext = this.controller.columnBindingContext['setup' + curColType][curColNo];
      curColumnsArray = this.controller.columnBindingContext['setup' + curColType];
    }
    return { curColType: curColType, curColNo: curColNo, curContext: curContext, curColumnsArray: curColumnsArray };

  }

}
