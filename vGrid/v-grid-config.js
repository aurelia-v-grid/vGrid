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
    rowColumn: "vGrid-row-column",
    rowHeaderColumn: "vGrid-row-column-header",
    rowHeader: "vGrid-row-header",
    rowSelected: "vGrid-row-selected",
    rowContainer: "vGrid-row-container",
    rowAlt: "vGrid-row-alt",
    rowEven: "vGrid-row-even",
    dragHandle: "vGrid-vGridDragHandle",
    resizeHeaderDragHandle: "vGrid-draggable-handler",
    sortIcon: "vGrid-glyphicon",
    sortIconSort: "vGrid-glyphicon-sort",
    sortIconAsc: "vGrid-glyphicon-sort-asc",
    sortIconDesc: "vGrid-glyphicon-sort-desc",
    sortIconNo: "vGrid-glyphicon"
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
    this.colConfig= [];

    //count of columns;
    this.columnLength = 0;

    //<v-grid> attibutes
    this.attAttributeObserve = [];
    this.attRowHeight = 50;
    this.attHeaderHeight = 0;
    this.attFooterHeight = 0;
    this.attResizableHeaders = false;
    this.attMultiSelect = undefined;
    this.attSortableHeader = false;
    this.attLoadingThreshold = -1; //for when loading screen comes on
    this.attRemoteIndex = false;
    this.attManualSelection = false;

    this.eventOnRowDraw = null;
    this.eventOnRowClick = null;
    this.eventOnRowDblClick = null;
    this.eventOnRemoteCall = null;

    //repeat html vars
    this.repeater = false;
    this.repeatRowTemplate = null;
    

    //static atm (dunno if I want them as options yet)
    this.attDataScrollDelay = 200;
    this.attRequestAnimationFrame = true;
    this.attResizableHeadersAndRows = true; //is just here if someone for some reson would like to just resize header, and fix rows after
    this.attRenderOnScrollbarScroll = true;


    //remote internal vars
    this.keepFilterOnCollectionChange = false; //for keeping the sorticons like they are
    this.remoteLimit = 40;
    this.remoteLength = 0;
    this.remoteOffset = 0;



  }


  /***************************************************************************************
   * loops current rowRef and create tempRef that gets sent to onRowDraw
   ***************************************************************************************/
  getRowProperties(obj) {
    if (obj) {
      var x = {};
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (x[k] !== obj[k]) {
            x[k] = obj[k];
          }
        }
      }
      return x;
    } else {
      return "";
    }
  }


  /***************************************************************************************
   * calls remote function
   ***************************************************************************************/
  remoteCall(data) {
    data = data ? data : {};
    this.eventOnRemoteCall({
      filter: data.filter || this.vGrid.vGridFilter.lastFilter,
      sort: data.sort || this.vGrid.vGridSort.getFilter(),
      limit: data.limit || this.remoteLimit,
      offset: data.offset || this.remoteOffset
    })
      .then((data)=> {

        this.vGrid.vGridObservables.disableObservablesArray();
        this.vGrid.vGridObservables.disableObservablesCollection();
        this.vGrid.vGridCollection = data.col;
        this.remoteLimit = data.limit;
        this.remoteLength = data.length;
        this.vGrid.vGridCollectionFiltered = this.vGrid.vGridCollection.slice(0);
        this.vGrid.checkKeys();
        this.vGrid.vGridCurrentRow = -1;
        if (!this.attRemoteIndex) {
          this.vGrid.vGridSelection.reset();
        }
        this.vGrid.vGridGenerator.collectionChange();
        this.vGrid.loading = false;
        this.vGrid.vGridPager.updatePager({
          limit: this.remoteLimit,
          offset: this.remoteOffset,
          length: this.remoteLength
        });
        setTimeout(()=> {
          this.vGrid.vGridObservables.enableObservablesArray();
          this.vGrid.vGridObservables.enableObservablesCollection();
        }, 200);
      });


  }


  /***************************************************************************************
   * This is called when grid runs filter
   ***************************************************************************************/
  onFilterRun = (filterObj) => {

    if (filterObj.length !== 0 || this.vGrid.vGridCollectionFiltered.length !== this.vGrid.vGridCollection.length || this.eventOnRemoteCall) {

      //set loading screen
      if (this.vGrid.vGridCollection.length > this.attLoadingThreshold) {
        this.vGrid.loading = true;
      }

      //run query
      setTimeout(()=> {
        //get current key if there is any, need this to find current row after filter
        var curKey = -1;
        if (this.vGrid.vGridCurrentEntityRef) {
          curKey = this.vGrid.vGridCurrentEntityRef[this.vGrid.vGridRowKey];
        }


        //if remotecall is set then lets use that
        if (this.eventOnRemoteCall) {

          //set last filter they just set
          this.vGrid.vGridFilter.lastFilter = filterObj;

          //on filter we need to set offset to 0
          this.remoteOffset = 0;

          //trigger remote call
          this.remoteCall();

        } else {


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
        }

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
        var data = this.getRowProperties(this.vGrid.vGridCollectionFiltered[row]);
        this.eventOnRowDraw({
            tempRef: data || null,
            rowRef: this.vGrid.vGridCollectionFiltered[row] || null
          }
        );
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
  onOrderBy(attribute, add) {




    //can we do the sorting?
    if (this.vGrid.vGridCollectionFiltered.length > 0) {
      //set loading screen
      if (this.vGrid.vGridCollection.length > this.attLoadingThreshold) {
        this.vGrid.loading = true;
      }

      //set query
      setTimeout(()=> {
        //set filter
        this.vGrid.vGridSort.setFilter({
          attribute: attribute,
          asc: true
        }, add);




          let event = new CustomEvent("sortIconUpdate", {
            detail: "",
            bubbles: true
          });
          this.vGrid.element.dispatchEvent(event);



        //if remote call is set
        if (this.eventOnRemoteCall) {

          //trigger remote call
          this.remoteCall();

        } else {
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
        }

      }, 50);
    }


  }


  /***************************************************************************************
   * Just for knowing length,
   * Its this you will need to add for server source/paging with endless scrolling
   ***************************************************************************************/
  getCollectionLength() {
      return this.vGrid.vGridCollectionFiltered.length;
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
        }
      }
    }


    //this dispatch events that v-grid-row-col.js picks up, for calling back is event for single on rows are set
    if (event.type === "click") {
      this.vGrid.raiseEvent("v-row-onclick", {
        evt: event,
        data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
        row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
      });
    }


    //this dispatch events that v-grid-row-col.js picks up, for calling back is event for dblclick on rows are set
    if (event.type === "dblclick") {
      this.vGrid.raiseEvent("v-row-ondblclick", {
        evt: event,
        data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
        row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
      });
    }




  }


}
