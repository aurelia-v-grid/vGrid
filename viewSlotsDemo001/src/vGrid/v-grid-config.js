
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

  bind(){
    debugger;
  }

  constructor(vGrid) {
    this.vGrid = vGrid;


    this.columns = this.vGrid.element.getElementsByTagName("V-GRID-COL");
    this.attributeArray = [];
    this.columnWidthArray = [];
    this.headerArray = [];
    this.filterArray = [];
    this.readOnlyArray = [];
    this.colStyleArray = [];
    this.colTypeArray = [];

    this.rowHeight = 50;
    this.headerHeight = 0;
    this.footerHeight = 0;
    this.isResizableHeaders = false;
    this.isMultiSelect = undefined;
    this.isSortableHeader = false;
    this.requestAnimationFrame = true;
    this.resizableHeadersAndRows = false;
    this.renderOnScrollbarScroll = true;
    this.lockedColumns = 0;
    this.addFilter = false;
    this.filterOnAtTop = false;
    this.filterOnKey = false;
    this.sortOnHeaderClick = false;
    this.largeBuffer = false;

    this.eventFormatHandler = null;
    this.eventOnDblClick = null;
    this.eventOnRowDraw = null;
    this.eventOnCellDraw = null;
    this.eventOnHeaderInputClick = null;

    this.doNotAddFilterTo = [];
    this.sortNotOnHeader = [];


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
            filterObj = this.eventFormatHandler("onFilter", filterObj)
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
      if (this.eventOnRowDraw) {
        //if user have added this then we call it so they can edit the row data before we display it
        var data = this.vGrid.vGridInterpolate.getNewObject(this.vGrid.collectionFiltered[row]);
        this.eventOnRowDraw(data, this.vGrid.collectionFiltered[row]);
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
      if (this.eventOnCellDraw) {
        //if user have added this then we call it so they can edit the row data before we display it
        var rowdata = this.vGrid.vGridInterpolate.getNewObject(this.vGrid.collectionFiltered[data.row]);
        this.eventOnCellDraw({
          attributeName: data.attributeName,
          div: data.div,
          rowdata: rowdata,
          colData: this.vGrid.collectionFiltered[data.row]
        }).bind(this.vGrid.$parent);
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
    if (this.eventOnHeaderInputClick) {
      //if user have added this then we call it so they can edit the row data before we display it

      this.eventOnHeaderInputClick(null, attribute, event);
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
    if (this.eventOnDblClick && event.type === "dblclick") {
      setTimeout(()=> {
        this.eventOnDblClick(this.vGrid.currentRowEntity[this.vGrid.sgkey], attribute, event);
      }, 15)
    }


    //use helper function to edit cell
    this.vGrid.vGridCellEdit.editCellhelper(row, event, readonly);

  }



}
