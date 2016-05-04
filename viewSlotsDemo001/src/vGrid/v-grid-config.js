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

  bind() {
    debugger;
  }

  constructor(vGrid) {
    this.vGrid = vGrid;


    //this.columns = [];
    this.attributeArray = [];
    this.columnWidthArray = [];
    this.headerArray = [];
    this.filterArray = [];
    this.readOnlyArray = [];
    this.colStyleArray = [];
    this.colTypeArray = [];
    this.colFormaterArray =[];
    this.colEditRawArray = [];
    this.filterOnKeyArray = [];


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

    this.eventOnRowDraw = null;


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
   * This is called when grid runs filter
   ***************************************************************************************/

  onFilterRun = (filterObj) => {

    if (filterObj.length !== 0 || this.vGridCollectionFiltered.length !== this.vGridCollection.length) {
      //get sel keys

      //if they filter we want to make sure the after cell edit happends
      if (this.vGridCellHelper.curElement && this.vGridCellHelper.updated === false) {
        this.vGridCellHelper.updateActual(this.vGridCellHelper.callbackObject());
      }

      var curKey = -1;
      if (this.vGridCurrentEntityRef) {
        curKey = this.vGridCurrentEntityRef[this.vGridRowKey];
      }
      if (filterObj.length === 0 && this.vGridCollectionFiltered.length !== this.vGridCollection.length) {
        this.vGridCollectionFiltered = this.vGridCollection.slice(0);
      } else {

        this.vGridCollectionFiltered = this.vGridFilter.run(this.vGridCollection, filterObj);
        this.vGridSort.run(this.vGridCollectionFiltered);

      }


      //set current row/entity in sync
      var newRowNo = -1;
      if (curKey) {
        this.vGridCollectionFiltered.forEach((x, index) => {
          if (curKey === x[this.vGridRowKey]) {
            newRowNo = index;
          }
        });
      }

      if (newRowNo > -1) {
        this.vGridCurrentEntityRef = this.vGridCollectionFiltered[newRowNo];
        this.vGridCurrentEntity[this.vGridRowKey] = this.vGridCurrentEntityRef[this.vGridRowKey];
        this.vGridCurrentRow = newRowNo;
      }

      //update grid
      this.vGridGenerator.collectionChange(true);


    }

  };


  /***************************************************************************************
   * grid asks for the filter name from attibute
   ***************************************************************************************/
  getFilterName(name) {
    return this.vGridFilter.getNameOfFilter(name)
  }


  /***************************************************************************************
   * This just sets data from array,
   * Use {} if you want markup of columns, or undefined for total blank rows
   ***************************************************************************************/
  getDataElement(row, isDown, isLargeScroll, callback) {
    if (this.vGridCollectionFiltered !== undefined) {
      if (this.eventOnRowDraw) {
        //if user have added this then we call it so they can edit the row data before we display it
        var data = this.getNewObject(this.vGridCollectionFiltered[row]);
        this.eventOnRowDraw(data, this.vGridCollectionFiltered[row]);
        callback(data)
      } else {
        callback(this.vGridCollectionFiltered[row]);
      }
    }
  }


  /***************************************************************************************
   * This calls the order by function
   * Use {} if you want markup of columns, or undefined for total blank rows
   ***************************************************************************************/
  onOrderBy(event, setheaders) {

    //if they sort we want to make sure the after cell edit happends
    if (this.vGridCellHelper.curElement && this.vGridCellHelper.updated === false) {
      this.vGridCellHelper.updateActual(this.vGridCellHelper.callbackObject());
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

    if (this.vGridCollectionFiltered.length > 0 && attribute && checked) {

      //set filter
      this.vGridSort.setFilter({
        attribute: attribute,
        asc: true
      }, event.shiftKey);
      //set headers
      setheaders(this.vGridSort.getFilter());
      //get sel keys

      //run filter
      this.vGridSort.run(this.vGridCollectionFiltered);


      //set new row
      //this.vGridCurrentRow = this.vGrid.vGridGetRowKey(this.vGridCurrentEntity[this.vGridRowKey])
      this.vGridCollectionFiltered.forEach((x, index) => {
        if (this.vGridCurrentEntity[this.vGridRowKey] === x[this.vGridRowKey]) {
          this.vGridCurrentRow = index;
        }
      });

      //update grid
      this.vGridGenerator.collectionChange();

    }


  }


  /***************************************************************************************
   * Just for knowing length,
   * Its this you will need to add for server source/paging with endless scrolling
   ***************************************************************************************/
  getCollectionLength() {
    if (this.addFilter) {
      return this.vGridCollectionFiltered.length;
    } else {
      return this.vGridCollection.length;
    }
  }


  /***************************************************************************************
   * Listen for click on rows,
   * Snd set current entity, and also allow edit of cell
   ***************************************************************************************/
  clickHandler(event, row) {


    //set current row of out filtered row
    this.vGridCurrentRow = row;

    //get data ref
    this.vGridCurrentEntityRef = this.vGridCollectionFiltered[row];

    ///loop properties and set them to current entity
    let data = this.vGridCurrentEntityRef;
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        if (this.vGridCurrentEntity[k] !== data[k]) {
          this.vGridCurrentEntity[k] = data[k];
          this.vGridSkipNextUpdateProperty.push(k)
        }
      }
    }


    //use helper function to edit cell
    if (this.vGridCurrentEntityRef) {
      this.vGridCellHelper.editCellhelper(row, event);
    }

  }


  /***************************************************************************************
   * getters/setters to make it easier
   ***************************************************************************************/

  get vGridCellHelper() {
    if (this.vGrid) {
      return this.vGrid.vGridCellHelper;
    } else {
      return null;
    }
  }

  get vGridFilter() {
    if (this.vGrid) {
      return this.vGrid.vGridFilter;
    } else {
      return null;
    }
  }

  get vGridSort() {
    if (this.vGrid) {
      return this.vGrid.vGridSort;
    } else {
      return null;
    }
  }

  get vGridGenerator() {
    if (this.vGrid) {
      return this.vGrid.vGridGenerator;
    } else {
      return null;
    }
  }

  get vGridCollectionFiltered() {
    if (this.vGrid) {
      return this.vGrid.vGridCollectionFiltered;
    } else {
      return null;
    }
  }

  set vGridCollectionFiltered(x) {
    return this.vGrid.vGridCollectionFiltered = x;
  }

  get vGridCollection() {
    if (this.vGrid) {
      return this.vGrid.vGridCollection;
    } else {
      return null;
    }
  }

  set vGridCollection(x) {
    return this.vGrid.vGridCollection = x;
  }

  get vGridCurrentEntityRef() {
    if (this.vGrid) {
      return this.vGrid.vGridCurrentEntityRef;
    } else {
      return null;
    }
  }

  set vGridCurrentEntityRef(x) {
    return this.vGrid.vGridCurrentEntityRef = x;
  }


  get vGridCurrentRow() {
    if (this.vGrid) {
      return this.vGrid.vGridCurrentRow;
    } else {
      return null;
    }
  }

  set vGridCurrentRow(x) {
    return this.vGrid.vGridCurrentRow = x;
  }

  get vGridCurrentEntity() {
    if (this.vGrid) {
      return this.vGrid.vGridCurrentEntity;
    } else {
      return null;
    }
  }

  set vGridCurrentEntity(x) {
    return this.vGrid.vGridCurrentEntity = x;
  }


  get vGridSkipNextUpdateProperty() {
    if (this.vGrid) {
      return this.vGrid.vGridSkipNextUpdateProperty;
    } else {
      return null;
    }
  }

  set vGridSkipNextUpdateProperty(x) {
    return this.vGrid.vGridSkipNextUpdateProperty = x;
  }

  vGridSkipNextUpdateProperty

  get vGridRowKey() {
    if (this.vGrid) {
      return this.vGrid.vGridRowKey;
    } else {
      return null;
    }
  }

  set vGridRowKey(x) {
    return this.vGrid.vGridRowKey = x;
  }


}
