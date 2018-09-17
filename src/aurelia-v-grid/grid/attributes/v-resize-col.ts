import { customAttribute } from '@aurelia/runtime';
import { inject } from '@aurelia/kernel';
import { VGrid } from '../v-grid';
import {
  ResizeShardContextInterface,
  BindingContextInterface,
  OverrideContextInterface,
  ColumnBindingContext,
  ColumBindingContextObjectInterface
} from '../../interfaces';


/**
 * Custom attribute "v-resize-col"
 * logic behind resizing of columns
 * Used by default by the simple html setup
 * Can be used with custom html
 *
 */
@customAttribute('v-resize-col')
@inject(Element, VGrid)
export class VGridAttributesResizeCol {
  private vGrid: VGrid;
  private ctx: ResizeShardContextInterface;
  private element: Element;
  private screenX: number;
  private originalWidth: number;
  private column: Element;
  private colType: string;
  private colNo: number;
  private context: ColumBindingContextObjectInterface;
  private columnsArray: ColumBindingContextObjectInterface[];
  private columnBindingContext: ColumnBindingContext;
  private bindingContext: BindingContextInterface;
  private overrideContext: OverrideContextInterface;
  private onmousedownBinded: EventListenerOrEventListenerObject;
  private onmousemoveBinded: EventListenerOrEventListenerObject;
  private onmouseupBinded: EventListenerOrEventListenerObject;
  private originals: number[];

  private avgContentLeft_Width: number;
  private avgHeaderLeft_Width: number;
  private avgContentMainScroll_Width: number;
  private avgHeaderMain_Left: number;
  private avgContentMain_Left: number;
  private avgContentMain_Right: number;
  private avgHeaderMain_Right: number;
  private avgContentRight_Width: number;
  private avgHeaderRight_Width: number;
  private avgContentHhandle_Right: number;
  private avgContentHhandle_Left: number;
  private avgContentHhandleScroll_Width: number;
  private avgContentMainScrollLeft: number;
  private isLast: boolean;
  private rightColNo: number;
  private rightColNoWidth: number;



  constructor(element: Element, vGrid: VGrid) {
    this.vGrid = vGrid;
    this.ctx = vGrid.resizeAttributeSharedContext;
    this.element = element;
    this.screenX = 0;
    this.originalWidth = 0;
    this.column = this.element;
    while (this.column.nodeName !== 'AVG-COL') {
      this.column = (this.column.parentNode as HTMLElement);
    }
    this.colType = this.column.attributes.getNamedItem('data-avg-type').value;
    this.colNo = parseInt(this.column.attributes.getNamedItem('data-avg-config-col').value, 10);
    this.context = vGrid.columnBindingContext['setup' + this.colType][this.colNo];
    this.columnsArray = vGrid.columnBindingContext['setup' + this.colType];
    this.columnBindingContext = vGrid.columnBindingContext;
  }



  /**
   * when custom attribute is binded, only when row is created
   *
   */
  public bind(bindingContext: BindingContextInterface, overrideContext: OverrideContextInterface): void {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  }



  /**
   * when custom element is attaced, only when row is created
   *
   */
  public attached(): void {

    // add resize handle
    let resizeHandle = document.createElement('DIV');
    resizeHandle.classList.add('avg-draggable-handler');

    this.onmousedownBinded = this.onmousedown.bind(this);
    this.onmousemoveBinded = this.onmousemove.bind(this);
    this.onmouseupBinded = this.onmouseup.bind(this);

    // register onmouse down event
    resizeHandle.onmousedown = (e) => {
      this.ctx.resizing = true;
      this.onmousedown(e);
    };

    // add
    this.column.appendChild(resizeHandle);
  }



  /**
   * when mousebutton is released
   *
   */
  private onmouseup(): void {
    // remove events
    document.removeEventListener('mousemove', this.onmousemoveBinded);
    document.removeEventListener('mouseup', this.onmouseupBinded);
    this.ctx.resizing = false;
  }



  /**
   * on mouse move we want to prevent default, then we update column depending on mouse position
   *
   */
  private onmousemove(e: MouseEvent): void {
    e.preventDefault();
    e.preventDefault(); // why 2 times?, need to test if there is a reason for me doing this... copy paste error
    this.updateHeader(e);
  }



  /**
   * this handles the onmouse move logic
   *
   */
  private updateHeader(e: MouseEvent): void {

    let w = Math.abs(this.screenX - e.screenX);
    if (w % 2 === 0) { // no need for every px...
      requestAnimationFrame(() => {
        let movementX = this.originalWidth - (this.screenX - e.screenX);
        let appendValue = this.originalWidth - movementX;

        if (this.colType === 'main' && movementX > 10) {

          this.columnsArray[this.colNo].width = movementX;
          this.vGrid.colConfig[this.colNo].colWidth = this.columnsArray[this.colNo].width;

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.columnsArray.length; i++) {
            if (this.columnsArray[this.colNo].left < this.columnsArray[i].left) {
              this.columnsArray[i].left = this.originals[i] - appendValue;
            }

          }
          this.vGrid.htmlHeightWidth.avgContentMainScroll_Width = this.avgContentMainScroll_Width - appendValue;
          this.vGrid.htmlHeightWidth.avgContentHhandleScroll_Width = this.avgContentHhandleScroll_Width - appendValue;
        }

        if (this.colType === 'right' && movementX > 10) {
          this.columnsArray[this.colNo].width = movementX;
          this.vGrid.colConfig[this.colNo].colWidth = this.columnsArray[this.colNo].width;

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.columnsArray.length; i++) {
            if (this.columnsArray[this.colNo].left < this.columnsArray[i].left) {
              this.columnsArray[i].left = this.originals[i] - appendValue;
            }
          }
          this.vGrid.htmlHeightWidth.avgContentRight_Width = this.avgContentRight_Width - appendValue;
          this.vGrid.htmlHeightWidth.avgHeaderRight_Width = this.avgHeaderRight_Width - appendValue;

          this.vGrid.htmlHeightWidth.avgContentMain_Right = this.avgContentMain_Right - appendValue;
          this.vGrid.htmlHeightWidth.avgHeaderMain_Right = this.avgHeaderMain_Right - appendValue;
          this.vGrid.htmlHeightWidth.avgContentHhandle_Right = this.avgContentHhandle_Right - appendValue;
        }

        if (this.colType === 'left' && movementX > 10) {
          this.columnsArray[this.colNo].width = movementX;
          this.vGrid.colConfig[this.colNo].colWidth = this.columnsArray[this.colNo].width;

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.columnsArray.length; i++) {
            if (this.columnsArray[this.colNo].left < this.columnsArray[i].left) {
              this.columnsArray[i].left = this.originals[i] - appendValue;
            }
          }

          this.vGrid.htmlHeightWidth.avgContentLeft_Width = this.avgContentLeft_Width - appendValue;
          this.vGrid.htmlHeightWidth.avgHeaderLeft_Width = this.avgHeaderLeft_Width - appendValue;

          this.vGrid.htmlHeightWidth.avgContentMain_Left = this.avgContentMain_Left - appendValue;
          this.vGrid.htmlHeightWidth.avgHeaderMain_Left = this.avgHeaderMain_Left - appendValue;
          this.vGrid.htmlHeightWidth.avgContentHhandle_Left = this.avgContentHhandle_Left - appendValue;
        }

        this.vGrid.controller.udateHorizontalScroller();

      });
    }
  }



  /**
   * when user clicks mouse down
   * get all withs for all coulumns/main parts for later
   *
   */
  private onmousedown(e: MouseEvent): void {

    // get some vars
    this.screenX = e.screenX;

    this.originalWidth = this.context.width;

    this.originals = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.columnsArray.length; i++) {
      this.originals.push(this.columnsArray[i].left);
    }

    this.avgContentLeft_Width = this.vGrid.htmlHeightWidth.avgContentLeft_Width;
    this.avgHeaderLeft_Width = this.vGrid.htmlHeightWidth.avgHeaderLeft_Width;
    this.avgContentMainScroll_Width = this.vGrid.htmlHeightWidth.avgContentMainScroll_Width;
    this.avgHeaderMain_Left = this.vGrid.htmlHeightWidth.avgHeaderMain_Left;
    this.avgContentMain_Left = this.vGrid.htmlHeightWidth.avgContentMain_Left;
    this.avgContentMain_Right = this.vGrid.htmlHeightWidth.avgContentMain_Right;
    this.avgHeaderMain_Right = this.vGrid.htmlHeightWidth.avgHeaderMain_Right;
    this.avgContentRight_Width = this.vGrid.htmlHeightWidth.avgContentRight_Width;
    this.avgHeaderRight_Width = this.vGrid.htmlHeightWidth.avgHeaderRight_Width;
    this.avgContentHhandle_Right = this.vGrid.htmlHeightWidth.avgContentHhandle_Right;
    this.avgContentHhandle_Left = this.vGrid.htmlHeightWidth.avgContentHhandle_Left;
    this.avgContentHhandleScroll_Width = this.vGrid.htmlHeightWidth.avgContentHhandleScroll_Width;

    this.avgContentMainScrollLeft = this.vGrid.htmlCache.avg_content_main.scrollLeft;

    if (this.colType === 'main') {
      this.isLast = this.vGrid.htmlHeightWidth.avgContentMainScroll_Width === (this.context.left + this.context.width);
    }
    if (this.colType === 'left') {
      let sumContext = this.context.left + this.context.width + this.vGrid.htmlHeightWidth.avgScrollBarWidth;
      let sumGrouping = this.columnBindingContext.setupgrouping * 15;
      this.isLast = this.vGrid.htmlHeightWidth.avgContentLeft_Width === (sumContext + sumGrouping);
    }
    if (this.colType === 'right') {
      let sum = this.context.left + this.context.width + this.vGrid.htmlHeightWidth.avgScrollBarWidth;
      this.isLast = this.vGrid.htmlHeightWidth.avgContentRight_Width === sum;
    }

    let setupRight = this.vGrid.columnBindingContext.setupright;
    this.rightColNo = 0;
    this.rightColNoWidth = 0;
    setupRight.forEach((col, i) => {
      if (col.left === 0) {
        this.rightColNo = i;
        this.rightColNoWidth = col.width;
      }
    });

    // register mosemove and mouse up event
    document.addEventListener('mousemove', this.onmousemoveBinded);
    document.addEventListener('mouseup', this.onmouseupBinded);
  }

}
