import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from '../v-grid';


@customAttribute('v-resize-col')
@inject(Element, VGrid)
export class vGridAttributesResizeCol {


  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.ctx = vGrid.resizeAttributeSharedContext;
    this.element = element;
    this.screenX;
    this.originalWidth;
    this.column = this.element;
    while (this.column.nodeName !== 'AVG-COL') {
      this.column = this.column.parentNode;
    }
    this.colType = this.column.attributes.getNamedItem("avg-type").value;
    this.colNo = this.column.attributes.getNamedItem("avg-config-col").value * 1;
    this.context = vGrid.columnBindingContext["setup" + this.colType][this.colNo];
    this.columnsArray = vGrid.columnBindingContext["setup" + this.colType];
    this.columnBindingContext = vGrid.columnBindingContext;
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

  }


  attached() {

    //add resize handle
    var resizeHandle = document.createElement("DIV");
    resizeHandle.classList.add("avg-draggable-handler");

    this.onmousedownBinded = this.onmousedown.bind(this);
    this.onmousemoveBinded = this.onmousemove.bind(this);
    this.onmouseupBinded = this.onmouseup.bind(this);

    //register onmouse down event
    resizeHandle.onmousedown = (e) => {
      this.ctx.resizing = true;
      this.onmousedown(e);
    };

    //add
    this.column.appendChild(resizeHandle);

  }


  onmouseup() {
    //remove events
    document.removeEventListener("mousemove", this.onmousemoveBinded);
    document.removeEventListener("mouseup", this.onmouseupBinded);
    this.ctx.resizing = false;
  }


  onmousemove(e) {
    this.updateHeader(e);
  }


  updateHeader(e) {

    var w = Math.abs(this.screenX - e.screenX);

    if (w % 2 === 0) { //no need for every px...

      requestAnimationFrame(() => {
        let movementX = parseInt(this.originalWidth) - ((this.screenX - e.screenX)) + "px";
        let appendValue = parseInt(this.originalWidth) - parseInt(movementX);

        if (this.colType === "main") {

          this.columnsArray[this.colNo].width = parseInt(movementX);
          this.vGrid.colConfig[this.colNo].colWidth = this.columnsArray[this.colNo].width;

          for (var i = 0; i < this.columnsArray.length; i++) {
            if (this.columnsArray[this.colNo].left < this.columnsArray[i].left) {
              this.columnsArray[i].left = this.originals[i] - appendValue;
            }

          }
          this.vGrid.htmlHeightWidth.avgContentMainScroll_Width = this.avgContentMainScroll_Width - appendValue;
          this.vGrid.htmlHeightWidth.avgContentHhandleScroll_Width = this.avgContentHhandleScroll_Width - appendValue;
        }


        if (this.colType === "right") {
          this.columnsArray[this.colNo].width = parseInt(movementX);
          this.vGrid.colConfig[this.colNo].colWidth = this.columnsArray[this.colNo].width;

          for (var i = 0; i < this.columnsArray.length; i++) {
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


        if (this.colType === "left") {
          this.columnsArray[this.colNo].width = parseInt(movementX);
          this.vGrid.colConfig[this.colNo].colWidth = this.columnsArray[this.colNo].width;

          for (var i = 0; i < this.columnsArray.length; i++) {
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


  onmousedown(e) {


    //get some vars
    this.screenX = e.screenX;

    this.originalWidth = this.context.width;

    this.originals = [];
    for (var i = 0; i < this.columnsArray.length; i++) {
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


    if (this.colType === "main") {
      this.isLast = this.vGrid.htmlHeightWidth.avgContentMainScroll_Width === (this.context.left + this.context.width);
    }
    if (this.colType === "left") {
      this.isLast = this.vGrid.htmlHeightWidth.avgContentLeft_Width === (this.context.left + this.context.width + this.vGrid.htmlHeightWidth.avgScrollBarWidth) + this.columnBindingContext.setupgrouping * 15;
    }
    if (this.colType === "right") {
      this.isLast = this.vGrid.htmlHeightWidth.avgContentRight_Width === (this.context.left + this.context.width + this.vGrid.htmlHeightWidth.avgScrollBarWidth);
    }


    let setupRight = this.vGrid.columnBindingContext.setupright;
    this.rightColNo;
    this.rightColNoWidth;
    setupRight.forEach((col, i) => {
      if (col.left === 0) {
        this.rightColNo = i;
        this.rightColNoWidth = col.width;
      }
    });


    //register mosemove and mouse up event
    document.addEventListener("mousemove", this.onmousemoveBinded);
    document.addEventListener("mouseup", this.onmouseupBinded);


  }


}
