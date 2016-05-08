/*****************************************************************************************************************
 *    vGridSortable
 *    handles resizing of header
 *
 ****************************************************************************************************************/

export class VGridResizable {
  screenX;
  xElement;
  resizable = false;
  index;
  originalWidth;


  constructor(vGrid) {
    this.vGrid = vGrid;
    this.resizable = false;
  }


  init() {
    this.vGridConfig = this.vGrid.vGridConfig;
    this.vGridGenerator = this.vGrid.vGridGenerator;
    this.vGridSortable = this.vGrid.vGridSortable;

    var headerCells = this.vGridGenerator.htmlCache.header.querySelectorAll("." + this.vGridConfig.css.rowHeaderCell);
    for (var i = 0; i < headerCells.length; i++) {

      var resizeHandle = document.createElement("DIV");
      resizeHandle.classList.add(this.vGridConfig.css.resizeHeaderDragHandle);

      resizeHandle.onmousedown = (e) => {
        this.onmousedown(e)
      };

      headerCells[i].appendChild(resizeHandle)
    }
  }


  onmouseup() {
    setTimeout(() => {
      this.resizable = false;
      if (this.vGridConfig.isSortableHeader) {
        this.vGridSortable.option("disabled", this.resizable);
      }
    }, 30);

    this.vGridGenerator.htmlCache.header.onmouseleave = "";
    this.vGridGenerator.htmlCache.header.onmousemove = "";
    this.vGridGenerator.htmlCache.header.onmouseup = "";

    this.vGridConfig.columnWidthArray[this.index] = parseInt(this.xElement.offsetParent.style.width);

    //reset template and fill data
    this.vGridGenerator.htmlCache.rowTemplate = null;
    this.vGridGenerator.correctRowAndScrollbodyWidth();
    this.vGridGenerator.recreateViewSlots();
    this.vGridGenerator.updateGridScrollbars();
    this.vGridGenerator.fillDataInRows(true);

  }


  onmousemove(e) {

    //get when user let go of mouse button
    this.vGridGenerator.htmlCache.header.onmouseup = () => {
      //small timeout to stop header click
      this.onmouseup();
    };

    this.vGridGenerator.htmlCache.header.onmouseleave = (e) => {
      this.vGridGenerator.htmlCache.header.onmouseup(e);

    };

    if (this.resizable) {
      this.updateHeader(e);
    } else {
      this.vGridGenerator.correctHeaderAndScrollbodyWidth();
    }
  }


  updateHeader(e) {
    var newWidth = parseInt(this.originalWidth) - ((this.screenX - e.screenX)) + "px";
    this.vGridConfig.columnWidthArray[this.index] = parseInt(newWidth);
    this.xElement.offsetParent.style.width = parseInt(this.originalWidth) - ((this.screenX - e.screenX)) + "px";
    this.xElement.offsetParent.style.width = parseInt(this.originalWidth) - ((this.screenX - e.screenX)) + "px";
    if (this.vGridConfig.resizableHeadersAndRows) {
      var columnsToFix = this.vGridGenerator.htmlCache.content.firstChild.querySelectorAll("." + this.vGridConfig.css.rowColumn + this.index);

      for (var col = 0; col < columnsToFix.length; col++) {
        columnsToFix[col].style.width = newWidth
      }

      this.vGridGenerator.correctRowAndScrollbodyWidth();
      this.vGridGenerator.updateGridScrollbars();

    }
  }


  onmousedown(e) {

    this.resizable = true;

    //disable sortable when resizing
    if (this.vGridConfig.isSortableHeader) {
      this.vGridSortable.option("disabled", this.resizable);
    }
    this.screenX = e.screenX;
    this.xElement = e.target;
    this.originalWidth = this.xElement.offsetParent.style.width;
    this.index = this.xElement.offsetParent.getAttribute("column-no");

    this.vGridGenerator.htmlCache.header.onmousemove = (e) => {
      this.onmousemove(e)
    }
  }

}
