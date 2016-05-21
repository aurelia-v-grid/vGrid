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


  /***************************************************************************************
   * default settings, v-grid-col.js and v-grid-atts populate these defaults with new values
   ***************************************************************************************/
  constructor(vGrid) {
    this.vGrid = vGrid;

    //<v-grid-col> attributes
    this.attributeArray = [];
    this.columnWidthArray = [];
    this.headerArray = [];
    this.filterArray = [];
    this.readOnlyArray = [];
    this.colStyleArray = [];
    this.colTypeArray = [];
    this.colFormaterArray = [];
    this.colEditRawArray = [];
    this.filterOnKeyArray = [];

    //<v-grid> attibutes
    this.rowHeight = 50;
    this.headerHeight = 0;
    this.footerHeight = 0;
    this.isResizableHeaders = false;
    this.isMultiSelect = undefined;
    this.isSortableHeader = false;
    this.requestAnimationFrame = true;
    this.resizableHeadersAndRows = false;
    this.renderOnScrollbarScroll = true;
    this.addFilter = false;
    this.filterOnAtTop = false;
    this.sortOnHeaderClick = false;
    this.largeBuffer = false;
    this.activeSorting = false;
    this.contextmenu = true;
    this.loadingThreshold = -1;
    this.tabbingEnabled = true;

    this.eventOnRowDraw = null;
    this.eventOnRowClick = null;
    this.eventOnRowDblClick = null;

    this.doNotAddFilterTo = [];
    this.sortNotOnHeader = [];

    //todo create attribute
    this.dataScrollDelay = 200;


  }


  //from string interpolate, this is whats passes into the onrowdraw event, so we dont end up with people enditing their collection
  attributes = [];

  getNewObject(obj) {
    if (obj) {
      var x = {};
      this.attributes.forEach((prop)=> {
        x[prop] = obj[prop];
      });
      return x;
    } else {
      return "";
    }
  }


  /***************************************************************************************
   * called before the creation of the grid, so its possible to do without the html for setting configuration/override it
   ***************************************************************************************/
  init() {

    this.attributeArray = this.vGrid.vGridContextObj.colAttrArray ? this.vGrid.vGridContextObj.colAttrArray : this.attributeArray;
    this.columnWidthArray = this.vGrid.vGridContextObj.colWidthArray ? this.vGrid.vGridContextObj.colWidthArray : this.columnWidthArray;
    this.headerArray = this.vGrid.vGridContextObj.colHeaderArray ? this.vGrid.vGridContextObj.colHeaderArray : this.headerArray;
    this.filterArray = this.vGrid.vGridContextObj.colFilterArray ? this.vGrid.vGridContextObj.colFilterArray : this.filterArray;
    this.readOnlyArray = this.vGrid.vGridContextObj.colReadonlyArray ? this.vGrid.vGridContextObj.colReadonlyArray : this.readOnlyArray;
    this.colStyleArray = this.vGrid.vGridContextObj.colStyleArray ? this.vGrid.vGridContextObj.colStyleArray : this.colStyleArray;
    this.colTypeArray = this.vGrid.vGridContextObj.colTypeArray ? this.vGrid.vGridContextObj.colTypeArray : this.colTypeArray;
    this.colFormaterArray = this.vGrid.vGridContextObj.colFormaterArray ? this.vGrid.vGridContextObj.colFormaterArray : this.colFormaterArray;
    this.colEditRawArray = this.vGrid.vGridContextObj.colEditRawArray ? this.vGrid.vGridContextObj.colEditRawArray : this.colEditRawArray;
    this.filterOnKeyArray = this.vGrid.vGridContextObj.colFilterOnKeyArray ? this.vGrid.vGridContextObj.colFilterOnKeyArray : this.filterOnKeyArray;

  }


  /***************************************************************************************
   * This is called when grid runs filter
   ***************************************************************************************/
  onFilterRun = (filterObj) => {

    if (filterObj.length !== 0 || this.vGrid.vGridCollectionFiltered.length !== this.vGrid.vGridCollection.length) {

      //set loading screen
      if(this.vGrid.vGridCollection.length > this.loadingThreshold){
          this.vGrid.loading = true;
      }

      //run query
      setTimeout(()=> {
        //get current key if there is any, need this to find current row after filter
        var curKey = -1;
        if (this.vGrid.vGridCurrentEntityRef) {
          curKey = this.vGrid.vGridCurrentEntityRef[this.vGrid.vGridRowKey];
        }


        //run filter
        this.vGrid.vGridCollectionFiltered = this.vGrid.vGridFilter.run(this.vGrid.vGridCollection, filterObj);


        //run sorting
        this.vGrid.vGridSort.run(this.vGrid.vGridCollectionFiltered);


        //set current row/entity in sync
        var newRowNo = -1;
        if (curKey) {
          this.vGrid.vGridCollectionFiltered.forEach((x, index) => {
            if (curKey === x[this.vGrid.vGridRowKey]) {
              newRowNo = index;
            }
          });
        }


        //update current row/current entity/entity ref
        if (newRowNo > -1) {
          this.vGrid.vGridCurrentEntityRef = this.vGrid.vGridCollectionFiltered[newRowNo];
          this.vGrid.vGridCurrentEntity[this.vGrid.vGridRowKey] = this.vGrid.vGridCurrentEntityRef[this.vGrid.vGridRowKey];
          this.vGrid.vGridCurrentRow = newRowNo;
        } else {
          this.vGrid.vGridCurrentRow = newRowNo;
        }


        //update grid rows
        this.vGrid.vGridGenerator.collectionChange(true);
        this.vGrid.loading = false;

      }, 50);

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
    if (this.vGrid.vGridCollectionFiltered !== undefined) {
      if (this.eventOnRowDraw) {
        //if user have added this then we call it so they can edit the row data before we display it
        var data = this.getNewObject(this.vGrid.vGridCollectionFiltered[row]);
        this.eventOnRowDraw(data, this.vGrid.vGridCollectionFiltered[row]);
        callback(data)
      } else {
        callback(this.vGrid.vGridCollectionFiltered[row]);
      }
    }
  }


  /***************************************************************************************
   * This calls the order by function
   * Use {} if you want markup of columns, or undefined for total blank rows
   ***************************************************************************************/
  onOrderBy(event, setheaders) {


    //get attibute of clicked header (todo inprove this part)
    var attribute = event.target.getAttribute(this.atts.dataAttribute);
    if (attribute === null) {
      attribute = event.target.offsetParent.getAttribute(this.atts.dataAttribute);
    }


    //check if this attribute can be sorted
    let canSortThisAttribute = true;
    if (this.sortNotOnHeader.indexOf(attribute) !== -1) {
      canSortThisAttribute = false;
    }


    //can we do the sorting?
    if (this.vGrid.vGridCollectionFiltered.length > 0 && attribute && canSortThisAttribute) {
      //set loading screen
      if(this.vGrid.vGridCollection.length > this.loadingThreshold){
          this.vGrid.loading = true;
      }

      //set query
      setTimeout(()=> {
        //set filter
        this.vGrid.vGridSort.setFilter({
          attribute: attribute,
          asc: true
        }, event.shiftKey);


        //set headers(rebuild the headers, its just simpler, then having any logic to it) Todo: after rebuild having som logic instead of rebuild might be simple enought now.
        setheaders(this.vGrid.vGridSort.getFilter());


        //run filter
        this.vGrid.vGridSort.run(this.vGrid.vGridCollectionFiltered);


        //set new row
        if (this.vGrid.vGridCurrentEntityRef) {
          this.vGrid.vGridCollectionFiltered.forEach((x, index) => {
            if (this.vGrid.vGridCurrentEntityRef[this.vGrid.vGridRowKey] === x[this.vGrid.vGridRowKey]) {
              this.vGrid.vGridCurrentRow = index;
            }
          });
        }


        //update grid
        this.vGrid.vGridGenerator.collectionChange();
        this.vGrid.loading = false;

      }, 50);
    }


  }


  /***************************************************************************************
   * Just for knowing length,
   * Its this you will need to add for server source/paging with endless scrolling
   ***************************************************************************************/
  getCollectionLength() {
    if (this.addFilter) {
      return this.vGrid.vGridCollectionFiltered.length;
    } else {
      return this.vGrid.vGridCollection.length;
    }
  }


  /***************************************************************************************
   * Listen for click on rows(called from v-grid-generator eventlistner for the buffer rows it created)
   * Snd set current entity, and also allow edit of cell
   ***************************************************************************************/
  clickHandler(event, row) {


    //set current row of out filtered row
    this.vGrid.vGridCurrentRow = row;


    //get data ref
    this.vGrid.vGridCurrentEntityRef = this.vGrid.vGridCollectionFiltered[row];


    //loop properties and set them to current entity
    let data = this.vGrid.vGridCurrentEntityRef;
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        if (this.vGrid.vGridCurrentEntity[k] !== data[k]) {
          this.vGrid.vGridCurrentEntity[k] = data[k];
          this.vGrid.vGridSkipNextUpdateProperty.push(k)
        }
      }
    }


    //use helper function to edit cell
    if (this.vGrid.vGridCurrentEntityRef) {
      this.vGrid.vGridCellHelper.editCellhelper(row, event);
    }


    //this dispatch events that v-grid-row-col.js picks up, for calling back is event for single on rows are set
    if (event.type === "click" && this.eventOnRowClick) {
      var newEvent = document.createEvent('Event');
      newEvent.initEvent("eventOnRowClick", true, true);
      event.target.dispatchEvent(newEvent)
    }


    //this dispatch events that v-grid-row-col.js picks up, for calling back is event for dblclick on rows are set
    if (event.type === "dblclick" && this.eventOnRowDblClick) {
      var newEvent = document.createEvent('Event');
      newEvent.initEvent("eventOnRowDblClick", true, true);
      event.target.dispatchEvent(newEvent)
    }


  }


}
