import { inject, customAttribute } from 'aurelia-framework';
import { VGrid } from '../v-grid';


@customAttribute('v-resize-col')
@inject(Element, VGrid)
export class vGridAttributesResizeCol {
  private vGrid: VGrid;
  private ctx: any;
  private element: any;
  private screenX: number;
  private originalWidth: number;
  private column: any;
  private colType: string;
  private colNo: number;
  private context: any;
  private columnsArray: Array<any>;
  private columnBindingContext: any;
  private bindingContext: any;
  private overrideContext: any;
  private onmousedownBinded: any;
  private onmousemoveBinded: any;
  private onmouseupBinded: any;
  private originals: Array<any>;

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


  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.ctx = vGrid.resizeAttributeSharedContext;
    this.element = element;
    this.screenX = 0;
    this.originalWidth = 0;
    this.column = this.element;
    while (this.column.nodeName !== 'AVG-COL') {
      this.column = this.column.parentNode;
    }
    this.colType = this.column.attributes.getNamedItem('avg-type').value;
    this.colNo = this.column.attributes.getNamedItem('avg-config-col').value * 1;
    this.context = vGrid.columnBindingContext['setup' + this.colType][this.colNo];
    this.columnsArray = vGrid.columnBindingContext['setup' + this.colType];
    this.columnBindingContext = vGrid.columnBindingContext;
  }


  public bind(bindingContext, overrideContext): void {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

  }


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


  private onmouseup(): void {
    // remove events
    document.removeEventListener('mousemove', this.onmousemoveBinded);
    document.removeEventListener('mouseup', this.onmouseupBinded);
    this.ctx.resizing = false;
  }


  private onmousemove(e): void {
    this.updateHeader(e);
  }


  private updateHeader(e): void {

    let w = Math.abs(this.screenX - e.screenX);

    if (w % 2 === 0) { // no need for every px...

      requestAnimationFrame(() => {
        let movementX = this.originalWidth - (this.screenX - e.screenX);
        let appendValue = this.originalWidth - movementX;

        if (this.colType === 'main') {

          this.columnsArray[this.colNo].width = movementX;
          this.vGrid.colConfig[this.colNo].colWidth = this.columnsArray[this.colNo].width;

          for (let i = 0; i < this.columnsArray.length; i++) {
            if (this.columnsArray[this.colNo].left < this.columnsArray[i].left) {
              this.columnsArray[i].left = this.originals[i] - appendValue;
            }

          }
          this.vGrid.htmlHeightWidth.avgContentMainScroll_Width = this.avgContentMainScroll_Width - appendValue;
          this.vGrid.htmlHeightWidth.avgContentHhandleScroll_Width = this.avgContentHhandleScroll_Width - appendValue;
        }


        if (this.colType === 'right') {
          this.columnsArray[this.colNo].width = movementX;
          this.vGrid.colConfig[this.colNo].colWidth = this.columnsArray[this.colNo].width;

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


        if (this.colType === 'left') {
          this.columnsArray[this.colNo].width = movementX;
          this.vGrid.colConfig[this.colNo].colWidth = this.columnsArray[this.colNo].width;

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


      });

    }

  }


  private onmousedown(e): void {


    // get some vars
    this.screenX = e.screenX;

    this.originalWidth = this.context.width;

    this.originals = [];
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
