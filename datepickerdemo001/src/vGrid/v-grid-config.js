/*****************************************************************************************************************
 *    VGridConfig
 *    This generates the config used by vGridgenerator, other classes also calls this to get the information
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

export class VGridConfig {


  /***************************************************************************************
   * CSS classes used by grid
   ***************************************************************************************/
  css = {
    wrapper: "vGrid",
    row: "vGrid-row",
    mainHeader: "vGrid-header",
    mainContent: "vGrid-body",
    mainFooter: "vGrid-footer",
    scrollBody: "vGrid-body-scroll",
    rowCell: "vGrid-row-cell",
    rowColumn: "vGrid-row-column",
    rowHeaderCell: "vGrid-row-cell-header",
    rowHeaderColumn: "vGrid-row-column-header",
    gridColumn: "vGrid-column",
    rowHeader: "vGrid-row-header",
    rowSelected: "vGrid-row-selected",
    rowContainer: "vGrid-row-container",
    rowAlt: "vGrid-row-alt",
    rowEven: "vGrid-row-even",
    editCell: "vGrid-editCell",
    editCellWrite: "vGrid-editCell-write",
    editCellFocus: "vGrid-editCell-focus",
    filterLabelTop: "vGrid-filterLabelAtTop",
    filterLabelBottom: "vGrid-filterLabelAtBottom",
    filterInputTop: "vGrid-filterInputAtTop",
    filterInputBottom: "vGrid-filterInputAtBottom",
    cellContent: "vGrid-content",
    dragHandle: "vGrid-vGridDragHandle",
    filterHandle: "vGrid-queryField",
    orderHandle: "v-grid-header-orderBy",
    resizeHeaderDragHandle: "vGrid-draggable-handler",
    sortIcon: "vGrid-glyphicon",
    sortIconSort: "vGrid-glyphicon-sort",
    sortIconAsc: "vGrid-glyphicon-sort-asc",
    sortIconDesc: "vGrid-glyphicon-sort-desc",
    sortIconNo: "vGrid-glyphicon-",
    noData: "vGrid-row-no-data"
  };


  /***************************************************************************************
   * different attributes used by grid
   ***************************************************************************************/
  atts = {
    dataAttribute: "v-grid-data-attribute",
    dataAttributeFilter: "v-grid-data-attribute-filter"
  };


  constructor(vGrid) {
    this.vGrid = vGrid;


    this.rowData = this.vGrid.element.getElementsByTagName("V-GRID-ROW")[0];
    this.columns = this.rowData.getElementsByTagName("V-GRID-COL");

    //mini error checking //todo improve as I add the stuff I want
    if (!this.rowData) {
      throw "error, you need to add the row for the grid to work atm"
    }
    if (this.vGrid.gridContextMissing && !this.rowData) {
      throw "grid needs context under config attributes, or row element"
    }

    //hide the element user adds
    this.rowData.style.display = "none";

    /***************************************************************************************
     * Helper for setting values
     ***************************************************************************************/
    let type = {
      "true": true,
      "false": false
    };


    let setValue = (contextValue, htmlAttributeValue, defaultValue) => {
      var value = defaultValue;
      if (contextValue !== undefined && contextValue !== null) {
        value = contextValue
      } else {
        if (htmlAttributeValue !== undefined && htmlAttributeValue !== null && !isNaN(htmlAttributeValue)) {
          value = htmlAttributeValue;
        }
      }
      return value;
    };

    this.attributeArray = [];
    this.columnWidthArray = [];
    this.headerArray = [];
    this.filterArray = [];
    this.readOnlyArray = [];
    this.colStyleArray = [];
    this.colTypeArray = [];

    if (this.columns.length === 0) {
      //not in use atm, this will be the mobile view part, where you can set
      //if not columns, we want to set all inside row to repeat
      //this sets row to 100%
      this.columnWidthArrayOverride = true;

      //this gets called when its building row
      this.onRowMarkupCreate = () => {
        return this.rowData.innerHTML;
      };

      this.attributeArray = this.vGrid.element.getAttribute("attibutes-used").split(",");

    } else {
      //if row contains columns, then we need to get the data
      //array options, get then from the elements and add them to options

      for (var i = 0; i < this.columns.length; i++) {
        this.attributeArray.push(this.columns[i].getAttribute("attribute"));
        this.columnWidthArray.push(this.columns[i].getAttribute("col-width"));
        this.headerArray.push(this.columns[i].getAttribute("header") || "");
        this.colStyleArray.push(this.columns[i].getAttribute("col-css") || "");
        this.colTypeArray.push(this.columns[i].getAttribute("col-type") || "");
        this.filterArray.push(this.columns[i].getAttribute("default-filter") || "?");
        this.readOnlyArray.push(this.columns[i].getAttribute("read-only") === "true" ? this.columns[i].getAttribute("attribute") : false);
      }

      //incase user are overriding it, or just dont wanto use markup
      this.attributeArray = this.vGrid.gridContext.attributeArray || this.attributeArray;
      this.columnWidthArray = this.vGrid.gridContext.columnWidthArray || this.columnWidthArray;
      this.headerArray = this.vGrid.gridContext.headerArray || this.headerArray;
      this.filterArray = this.vGrid.gridContext.filterArray || this.filterArray;
      this.readOnlyArray = this.vGrid.gridContext.readOnlyArray || this.readOnlyArray;
      this.colStyleArray = this.vGrid.gridContext.colStyleArray || this.colStyleArray;
      this.colTypeArray = this.vGrid.gridContext.colTypeArray || this.colTypeArray;
    }





    /***************************************************************************************
     * Set attibutes
     ***************************************************************************************/
    this.rowHeight = setValue(this.vGrid.gridContext.rowHeight, parseInt(this.vGrid.element.getAttribute("row-height")), 50);
    this.headerHeight = setValue(this.vGrid.gridContext.headerHeight, parseInt(this.vGrid.element.getAttribute("header-height")), 0);
    this.footerHeight = setValue(this.vGrid.gridContext.footerHeight, parseInt(this.vGrid.element.getAttribute("footer-height")), 0);
    this.isResizableHeaders = setValue(this.vGrid.gridContext.resizableHeaders, type[this.vGrid.element.getAttribute("resizable-headers")], false);
    this.isMultiSelect = setValue(this.vGrid.gridContext.multiSelect, type[this.vGrid.element.getAttribute("multi-select")], undefined);
    this.isSortableHeader = setValue(this.vGrid.gridContext.sortableHeader, type[this.vGrid.element.getAttribute("sortable-headers")], false);
    this.requestAnimationFrame = setValue(this.vGrid.gridContext.requestAnimationFrame, type[this.vGrid.element.getAttribute("request-animation-frame")], true);
    this.resizableHeadersAndRows = setValue(this.vGrid.gridContext.resizeAlsoRows, type[this.vGrid.element.getAttribute("resize-also-rows")], false);
    this.renderOnScrollbarScroll = setValue(this.vGrid.gridContext.renderOnScrollbarScroll, type[this.vGrid.element.getAttribute("render-on-scrollbar-scroll")], true);
    this.lockedColumns = setValue(this.vGrid.gridContext.lockedColumns, parseInt(this.vGrid.element.getAttribute("locked-columns")), 0);
    this.addFilter = setValue(this.vGrid.gridContext.headerFilter, type[this.vGrid.element.getAttribute("header-filter")], false);
    this.filterOnAtTop = setValue(this.vGrid.gridContext.headerFilterTop, type[this.vGrid.element.getAttribute("header-filter-top")], false);
    this.filterOnKey = setValue(this.vGrid.gridContext.headerFilterOnkeydown, type[this.vGrid.element.getAttribute("header-filter-onkeydown")], false);
    this.sortOnHeaderClick = setValue(this.vGrid.gridContext.sortOnHeaderClick, type[this.vGrid.element.getAttribute("sort-on-header-click")], false);
    this.largeBuffer = setValue(this.vGrid.gridContext.largeBuffer, type[this.vGrid.element.getAttribute("large-buffer")], false);

    this.eventFormatHandler = this.vGrid.element.getAttribute("format-handler");
    this.eventOnDblClick = this.vGrid.element.getAttribute("row-on-dblclick");
    this.eventOnRowDraw = this.vGrid.element.getAttribute("row-on-draw");
    this.eventOnCellDraw = this.vGrid.element.getAttribute("cell-on-draw");
    this.eventOnHeaderInputClick = this.vGrid.element.getAttribute("header-input-click");


    if (this.vGrid.element.getAttribute("header-filter-not-to")) {
      this.doNotAddFilterTo = this.vGrid.element.getAttribute("header-filter-not-to").split(",")
    } else {
      if (this.vGrid.gridContext.headerFilterNotTo) {
        this.doNotAddFilterTo = this.vGrid.gridContext.headerFilterNotTo.split(",")
      } else {
        this.doNotAddFilterTo = [];
      }
    }

    if (this.vGrid.element.getAttribute("sort-not-on-header")) {
      this.sortNotOnHeader = this.vGrid.element.getAttribute("sort-not-on-header").split(",")
    } else {
      if (this.vGrid.gridContext.sortNotOnHeader) {
        this.sortNotOnHeader = this.vGrid.gridContext.sortNotOnHeader.split(",")
      } else {
        this.sortNotOnHeader = [];
      }
    }

  }





  /***************************************************************************************
   * This is called when grid runs filter
   ***************************************************************************************/

  onFilterRun = (filterObj) => {

    if (filterObj.length !== 0 || this.vGrid.collectionFiltered.length !== this.vGrid.collection.length) {
      //get sel keys

      //if they filter we want to make sure the after cell edit happends
      if(this.vGrid.vGridCellEdit.curElement && this.vGrid.vGridCellEdit.updated === false) {
          this.vGrid.vGridCellEdit.updateActual(this.vGrid.vGridCellEdit.callbackObject());
        }

      var curKey = -1;
      if (this.vGrid.currentRowEntity) {
        curKey = this.vGrid.currentRowEntity[this.vGrid.sgkey];
      }
      if (filterObj.length === 0 && this.vGrid.collectionFiltered.length !== this.vGrid.collection.length) {
        this.vGrid.collectionFiltered = this.vGrid.collection.slice(0);
      } else {
        if (this.eventFormatHandler) {
          if (this.vGrid.$parent[this.eventFormatHandler]) {
            filterObj = this.vGrid.$parent[this.eventFormatHandler]("onFilter", filterObj)
          }
        }

        this.vGrid.collectionFiltered = this.vGrid.vGridFilter.run(this.vGrid.collection, filterObj);
        this.vGrid.vGridSort.run(this.vGrid.collectionFiltered);

      }



      //set current row/entity in sync
      var newRowNo = -1;
      if (curKey) {
        this.vGrid.collectionFiltered.forEach((x, index) => {
          if (curKey === x[this.vGrid.sgkey]) {
            newRowNo = index;
          }
        });
      }

      this.vGrid.filterRowDisplaying = false;
      if (newRowNo > -1) {
        this.vGrid.currentRowEntity = this.vGrid.collectionFiltered[newRowNo];
        this.vGrid.currentEntity[this.vGrid.sgkey] = this.vGrid.currentRowEntity[this.vGrid.sgkey];
        this.vGrid.filterRow = newRowNo;
        this.vGrid.filterRowDisplaying = true;
      }

      //update grid
      this.vGrid.vGridGenerator.collectionChange(true);
      if (this.vGrid.filterRowDisplaying) {
        this.vGrid.vGridCellEdit.setBackFocus(true)
      }

    }

  };


  /***************************************************************************************
   * grid asks for the filter name from attibute
   ***************************************************************************************/
  getFilterName(name) {
    return this.vGrid.vGridFilter.getNameOfFilter(name)
  }





  /***************************************************************************************
   * This just sets data from array,
   * Use {} if you want markup of columns, or undefined for total blank rows
   ***************************************************************************************/
  getDataElement(row, isDown, isLargeScroll, callback) {
    if (this.vGrid.collectionFiltered !== undefined) {
      if (this.vGrid.$parent[this.eventOnRowDraw]) {
        //if user have added this then we call it so they can edit the row data before we display it
        var data = this.vGrid.vGridInterpolate.getNewObject(this.vGrid.collectionFiltered[row]);
        this.vGrid.$parent[this.eventOnRowDraw](data, this.vGrid.collectionFiltered[row]);
        callback(data)
      } else {
        callback(this.vGrid.collectionFiltered[row]);
      }
    }
  }


  /***************************************************************************************
   * This just sets data from array,
   * Use {} if you want markup of columns, or undefined for total blank rows
   ***************************************************************************************/
  cellDrawEvent(data) {
    if (this.vGrid.collectionFiltered !== undefined) {
      if (this.vGrid.$parent[this.eventOnCellDraw]) {
        //if user have added this then we call it so they can edit the row data before we display it
        var rowdata = this.vGrid.vGridInterpolate.getNewObject(this.vGrid.collectionFiltered[data.row]);
        this.vGrid.$parent[this.eventOnCellDraw]({
          attributeName: data.attributeName,
          div: data.div,
          rowdata: rowdata,
          colData: this.vGrid.collectionFiltered[data.row]
        });
      }
    }
  }




  /***************************************************************************************
   * This calls the order by function
   * Use {} if you want markup of columns, or undefined for total blank rows
   ***************************************************************************************/
  onOrderBy(event, setheaders) {

    //if they sort we want to make sure the after cell edit happends
    if(this.vGrid.vGridCellEdit.curElement && this.vGrid.vGridCellEdit.updated === false) {
        this.vGrid.vGridCellEdit.updateActual(this.vGrid.vGridCellEdit.callbackObject());
      }


    //get clicked
    var attribute = event.target.getAttribute(this.atts.dataAttribute);
    if (attribute === null) {
      attribute = event.target.offsetParent.getAttribute(this.atts.dataAttribute);
    }
    let checked = true;
    if (this.sortNotOnHeader.indexOf(attribute) !== -1) {
      checked = false;
    }

    if (this.vGrid.collectionFiltered.length > 0 && attribute && checked) {

      //set filter
      this.vGrid.vGridSort.setFilter({
        attribute: attribute,
        asc: true
      }, event.shiftKey);
      //set headers
      setheaders(this.vGrid.vGridSort.getFilter());
      //get sel keys

      //run filter
      this.vGrid.vGridSort.run(this.vGrid.collectionFiltered);
      //update grid
      this.vGrid.vGridGenerator.collectionChange();

      //set new row
      this.vGrid.collectionFiltered.forEach((x, index) => {
        if (this.vGrid.currentEntity[this.vGrid.sgkey] === x[this.vGrid.sgkey]) {
          this.filterRow = index;
        }
      });
      this.vGrid.vGridCellEdit.setBackFocus()
    }



  }




  /***************************************************************************************
   * on scroll to set back focus
   ***************************************************************************************/

  onScrolled() {

    var rowHeight = this.rowHeight;
    var array = this.vGrid.vGridGenerator.htmlCache.rowsArray;
    var arraylength = array.length;
    var firstRow = parseInt(array[0].top / rowHeight, 10);
    var lastRow = parseInt(array[arraylength - 1].top / rowHeight, 10);
    var curRow = this.vGrid.filterRow; //pain debugging in babel...
    if (firstRow <= curRow && lastRow >= curRow) {
      this.vGrid.vGridCellEdit.setBackFocus()
    }


  }





  /***************************************************************************************
   * Just for knowing length,
   * Its this you will need to add for server source/paging with endless scrolling
   ***************************************************************************************/
  getCollectionLength() {
    if (this.addFilter) {
      return this.vGrid.collectionFiltered.length;
    } else {
      return this.vGrid.collection.length;
    }
  }


  filterCellClick(event){
    let attribute = event.target.getAttribute(this.atts.dataAttribute);
    if (this.vGrid.$parent[this.eventOnHeaderInputClick]) {
      //if user have added this then we call it so they can edit the row data before we display it

      this.vGrid.$parent[this.eventOnHeaderInputClick](null, attribute, event);
    }

  }


  /***************************************************************************************
   * Listen for click on rows,
   * Snd set current entity, and also allow edit of cell
   ***************************************************************************************/
  clickHandler(event, row) {


    let attribute = event.target.getAttribute(this.atts.dataAttribute);
    let readonly = this.readOnlyArray.indexOf(attribute) === -1 ? false : true;

    //set current row of out filtered row
    this.vGrid.filterRow = row;

    //get data ref
    this.vGrid.currentRowEntity = this.vGrid.collectionFiltered[row];

    ///loop properties and set them to current entity
    let data = this.vGrid.currentRowEntity;
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        if (this.vGrid.currentEntity[k] !== data[k]) {
          this.vGrid.currentEntity[k] = data[k];
          this.vGrid.skipNextUpdateProperty.push(k)
        }
      }
    }


    //have user added on double click event?
    if (this.vGrid.$parent[this.eventOnDblClick] && event.type === "dblclick") {
      setTimeout(()=> {
        this.vGrid.$parent[this.eventOnDblClick](this.vGrid.currentRowEntity[this.vGrid.sgkey], attribute, event);
      }, 15)
    }


    //use helper function to edit cell
    this.vGrid.vGridCellEdit.editCellhelper(row, event, readonly);

  }



}
