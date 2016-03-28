/*****************************************************************************************************************
 *    vGridGenerator
 *    This generates all html and handles the scrolling, row clicks etc
 *    Created by vegar ringdal
 *    26-03-2016- started to test if I could just write it as a pure es6 class - this is not in use
 *
 ****************************************************************************************************************/
export class VGridGenerator {


  constructor(defaultConfig, Mustache, element, parentCtx, SimpleGridSortable) {
    this.defaultConfig = defaultConfig;
    this.Mustache = Mustache;
    this.element = element;
    this.parentCtx = parentCtx;
    this.SimpleGridSortable = SimpleGridSortable;
    this.setConfig(defaultConfig);
    this.init(false);
  }






  /*************************************************************************************
   * internal vars/setter
   *************************************************************************************/
  _private = {};

  setConfig(options) {
    this._private = {
      node: this.element, //internal
      headerHeight: options.headerHeight || 0,                              //sets height of header
      rowHeight: options.rowHeight || 50,                                   //sets height of row
      footerHeight: options.footerHeight || 0,                              //sets height of footer
      dataScrollDelay: options.dataScrollDelay || 200,                      //delay when doing large scroll before updating
      headerArray: options.headerArray || [],                               // header labels
      attributeArray: options.attributeArray || [],                         // attributes for cell and headers
      columnWidthArray: options.columnWidthArray || [],                     // width of all columns
      colStyleArray: options.colStyleArray || [],                           // text that will be put in column style tag
      isSortableHeader: options.isSortableHeader,                           //adds sortable headers
      sortOnHeaderClick: options.sortOnHeaderClick,                         //enable sort event on header click
      isResizableHeaders: options.isResizableHeaders,                       //adds resizable headers
      predefinedScrolltop: options.predefinedScrolltop,                     //needed to know state of scrolltop
      requestAnimationFrame: options.requestAnimationFrame,                 //if you want it to request animation frame
      internalDragDropCount: 10,                                            //internal count for index of header column, this can maybe be deleted after rebuild
      resizableHeadersAndRows: options.resizableHeadersAndRows,             //adds resizable columns to rows, if isResizableHeaders is enabled, this will not be that smooth
      isMultiSelect: options.isMultiSelect,                                 // if multiselect, undefined = none, false = 1, true = multi
      renderOnScrollbarScroll: options.renderOnScrollbarScroll,             //will not wait on scrollbars scrolls
      columnWidthArrayOverride: options.columnWidthArrayOverride,           //will set row to 100% and dont care about columns array
      selection: {},                                                        //  internal, where I store the new selection I create, gets created later
      $selectedRows: [],                                                    //internal for selection
      lockedColumns: options.lockedColumns || 0,                            //will give huge performance issue in IE
      sortOrder: [],
      contentHeight: 0,                                                     //internal
      gridHeight: 0,                                                        //internal
      gridWidth: 0,                                                         //internal
      queryStringCheck: {},                                                 //internal //just to remeber old input, helper for ondrag/drop columns
      disableRowClick: false,                                               //internal if this is true no events are triggerd on row click, usefull when in cell edit mode
      largeScrollLimit: options.largeScrollLimit,                           //scroll length that's considered long scroll, this should maybe be adjusted to what browser is used, can get buggy of this is not set right
      scrollBodyHeight: 0,                                                  //internal
      htmlCache: {                                                          //internal
        grid: null,       //internal
        header: null,     //internal
        content: null,    //internal
        footer: null,     //internal
        rowsArray: [],    //internal
        scrollBody: null, //internal
        rowTemplate: null //internal
      },
      queryHelper: {
        addFilter: options.addFilter,            // will add filter if true
        doNotAddFilterTo: options.doNotAddFilterTo || [], //array, attributes will not get filter
        filterOnKey: options.filterOnKey,        //will send back filter on keyup or just blur if false
        filterOnAtTop: options.filterOnAtTop,     //filter above headers labels or under
        filterArray: options.filterArray || []
      },
      configFunctions: {
        //requesting length callback
        getCollectionLength: options.getSourceLength || function () {
          return 0
        },
        //on row render callback
        getDataElement: options.getDataElement || function () {
          return {}
        },
        //click handler callback
        clickHandler: options.clickHandler || function () {
        },
        //click handler callback
        onOrderBy: options.onOrderBy || function () {
        },
        //onquery from header filter
        onFilterRun: options.onFilterRun || function () {
        },
        getFilterName: options.getFilterName || function () {
          return "";
        },
        onCellDraw: options.onCellDraw,
        //on creating row markup
        onRowMarkupCreate: options.onRowMarkupCreate
      },
      selectionVars: {
        lastKeyKodeUsed: "none", //internal for selection control
        lastRowSelected: 0,     //internal for selection control
        onClicked: false        //internal for selection control
      },
      scrollVars: {           //internals
        lastScrollTop: 0,     //used in scroll event etc
        firstTop: 0,          //scroll variable
        lastScrollLeft: 0,    //used for stopping weird scrolling to left
        halt: false,          //used for knowing if we can update when doing scrolling, used with time var under
        timer: null,          //timer for stopping updating, "getDataScrollDelay" is the timeout for this
        clickTimersArray: []  //this is the array of touch events, have it here so I can cancel during scroll
      },
      atts: { //different attributes used
        dataAttribute: "v-grid-data-attribute",
        dataAttributeFilter: "v-grid-data-attribute-filter"
      },
      css: { //classes used, maybe bering this as a option user can select so he can more easily style it?
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
        filterLabelTop: "vGrid-filterLabelAtTop",
        filterLabelBottom: "vGrid-filterLabelAtBottom",
        filterInputTop: "vGrid-filterInputAtTop",
        filterInputBottom: "vGrid-filterInputAtBottom",
        cellContent: "vGrid-content",
        dragHandle: "vGridDragHandle",
        filterHandle: "vGrid-queryField",
        orderHandle: "v-grid-header-orderBy",
        resizeHeaderDragHandle: "vGrid-draggable-handler",
        sortIcon: "vGrid-glyphicon",
        sortIconSort: "vGrid-glyphicon-sort",
        sortIconAsc: "vGrid-glyphicon-sort-asc",
        sortIconDesc: "vGrid-glyphicon-sort-desc",
        sortIconNo: "vGrid-glyphicon-",
        noData: "vGrid-row-no-data"
      }
    };
  };





  /****************************************************************************************************************************
   * selection, helps control the selection in the grid
   ****************************************************************************************************************************/
  setSelectionType() {
    this._private.$selectedRows = [];
    this._private.selectionMode = "none";

    //what type is it?
    if (this._private.isMultiSelect === false) {
      this._private.selectionMode = "single"
    }
    if (this._private.isMultiSelect === true) {
      this._private.selectionMode = "multible"
    }

    this._private.selection.isSelected = (row) => {
      var result = false;
      if (this._private.$selectedRows.indexOf(row) !== -1) {
        result = true;
      }
      return result;
    };

    this._private.selection.select = (rowSelect, addToSelection) => {
      switch (this._private.selectionMode) {
        case "none":
        case null:
        case undefined:
          break;
        case "single":
          if (this._private.$selectedRows !== undefined) {
            if (this._private.$selectedRows.length > 1) {
              this._private.$selectedRows = [];
            }
          }
          this._private.$selectedRows[0] = rowSelect;
          break;
        case "multible":
          if (!addToSelection) {
            this._private.$selectedRows = [];
            this._private.$selectedRows[0] = rowSelect
          } else {
            if (!this._private.selection.isSelected(rowSelect)) {
              this._private.$selectedRows.push(rowSelect)
            }
          }
      }
    };

    this._private.selection.selectRange = (start, end) => {
      if (this._private.selectionMode === "multible") {
        this._private.$selectedRows = [];
        for (var i = start; i < end + 1; i++) {
          this._private.$selectedRows.push(i)
        }
      }


    };

    this._private.selection.reset = () => {
      this._private.$selectedRows = [];
    };

    this._private.selection.getSelectedRows = () => {
      return this._private.$selectedRows;
    };

    this._private.selection.setSelectedRows = (newRows) => {
      this._private.$selectedRows = newRows;
    };

    this.selection = this._private.selection;

  };





  /****************************************************************************************************************************
   * fills data into row
   ****************************************************************************************************************************/
  fillDataInRows(clearAllRows) {
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this._private.htmlCache.rowsArray[i].top / this._private.rowHeight;
      var row = this._private.htmlCache.rowsArray[i];
      if (clearAllRows) {
        row.div.removeChild(row.div.firstChild);
      }
      this.insertRowMarkup(currentRow, row.div, true, true);
    }
  };





  /****************************************************************************************************************************
   * builds correct sort icon markup
   ****************************************************************************************************************************/
  getSortIcon(attribute) {
    var result;

    //setting lineheight so it stays in the middle
    if(!this._private.queryHelper.addFilter) {
      var lineHeigth = 'style=line-height:'+this._private.headerHeight+'px;"';
    } else {
      var lineHeigth = 'style=line-height:'+this._private.headerHeight/2+'px;"';
    }


    if (this._private.sortOnHeaderClick) {
      var main = '<span class=""><span '+lineHeigth+' class="' + this._private.css.sortIcon + ' ' + this._private.css.sortIconSort + '"></span></span>';
      if (this._private.sortOrder.length === 0) {
        result = main
      } else {
        this._private.sortOrder.forEach((x) => {
          if (x.attribute === attribute) {
            var asc = x.asc === true ? '<span '+lineHeigth+' class="' + this._private.css.sortIcon + ' ' + this._private.css.sortIconAsc + '"></span>' : '<span '+lineHeigth+' class="' + this._private.css.sortIcon + ' ' + this._private.css.sortIconDesc + '"></span>';
            var main = '<span '+lineHeigth+' class="' + this._private.css.sortIcon + ' ' + this._private.css.sortIconNo + x.no + '">';
            var end = '</span>';
            result = main + end + asc;
          }
        });
      }
      if (!result) {
        result = main;
      }
    } else {
      result = "";
    }
    return result
  };





  /****************************************************************************************************************************
   * fills data into row
   ****************************************************************************************************************************/
  fillDataIntoRow(rowno, clearRow) {
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this._private.htmlCache.rowsArray[i].top / this._private.rowHeight;
      if (rowno === currentRow) {
        var row = this._private.htmlCache.rowsArray[i];
        if (clearRow) {
          row.div.removeChild(row.div.firstChild);
        }
        this.insertRowMarkup(currentRow, row.div, true, true);
      }
    }
  };





  /****************************************************************************************************************************
   * updates only selection on rows
   ****************************************************************************************************************************/
  updateSelectionOnAllRows() {
    var i;
    for (i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this._private.htmlCache.rowsArray[i].top / this._private.rowHeight;
      if (this._private.selection.isSelected(currentRow)) {
        this._private.htmlCache.rowsArray[i].div.classList.add(this._private.css.rowSelected);
      } else {
        this._private.htmlCache.rowsArray[i].div.classList.remove(this._private.css.rowSelected);
      }
    }
  };





  /****************************************************************************************************************************
   * returns header template
   ****************************************************************************************************************************/
  getHeaderTemplate(headerNamesArray, attributeNamesArray) {
    var rowTemplate = "";
    var css = this._private.css.dragHandle + ' ' + this._private.css.cellContent + ' ' + this._private.css.orderHandle;
    for (var i = 0; i < headerNamesArray.length; i++) {
      var sortIcon = this.getSortIcon(attributeNamesArray[i]);
      rowTemplate = rowTemplate + '<div><div class="' + css + '" ' + this._private.atts.dataAttribute + '="' + attributeNamesArray[i] + '">' + headerNamesArray[i] + sortIcon + '</div></div>';
    }
    return rowTemplate;
  };





  /****************************************************************************************************************************
   * returns rowTemplate
   ****************************************************************************************************************************/
  getRowTemplate(attributeNamesArray) {
    var rowTemplate = "";
    //var styletag = "background-color:{{custom.backgroundcolor}}"; //why is this here?
    if (this._private.htmlCache.rowTemplate !== null) {
      rowTemplate = this._private.htmlCache.rowTemplate;
    } else {
      //todo: check of option is set and callback instead of creating it.
      if (this._private.configFunctions.onRowMarkupCreate) {
        rowTemplate = this._private.configFunctions.onRowMarkupCreate(attributeNamesArray);
      } else {
        for (var i = 0; i < attributeNamesArray.length; i++) {
          rowTemplate = rowTemplate + '<div><div class="' + this._private.css.cellContent + '" style="' + this._private.colStyleArray[i] + ' " ' + this._private.atts.dataAttribute + '="' + attributeNamesArray[i] + '">{{' + attributeNamesArray[i] + '}}</div></div>';
        }
      }
    }
    return rowTemplate;
  };





  /****************************************************************************************************************************
   * mustache cache.... no idea if this helps really, but lets use it...
   ****************************************************************************************************************************/
  cacheRowTemplate(template) {
    var stringTemplate = template || this.getRowTemplate(this._private.attributeArray);
    this.Mustache.parse(stringTemplate);
    this._private.htmlCache.rowTemplate = stringTemplate;
  };





  /****************************************************************************************************************************
   * get total column width
   ****************************************************************************************************************************/
  getTotalColumnWidth() {
    var total = 0;
    for (var i = 0; i < this._private.attributeArray.length; i++) {
      total = total + parseInt(this._private.columnWidthArray[i], 10);
    }
    return total;
  };





  /****************************************************************************************************************************
   * create header template to header div
   ****************************************************************************************************************************/
  createHeaderMarkup() {
    var tempColumns = document.createElement("DIV");
    tempColumns.innerHTML = this.getHeaderTemplate(this._private.headerArray, this._private.attributeArray);
    var i;
    for (i = 0; i < tempColumns.children.length; i++) {
      tempColumns.children[i].setAttribute("column-no", i);

      //setting lineheight so it stays in the middle
      //only set lineheight if not filter
      if(!this._private.queryHelper.addFilter) {
        tempColumns.children[i].style["line-height"] = this._private.headerHeight + "px";
      }

      tempColumns.children[i].style.height = "100%";
      tempColumns.children[i].style.width = this._private.columnWidthArray[i] + "px";
      tempColumns.children[i].classList.add(this._private.css.rowHeaderCell);
      tempColumns.children[i].classList.add(this._private.css.rowHeaderColumn + i);
      tempColumns.children[i].classList.add(this._private.css.gridColumn + i);
    }

    //rowCell
    var row = document.createElement("DIV");
    row.className = this._private.css.row + " " + this._private.css.rowHeader;
    row.style.top = top + "px";
    row.style.height = this._private.headerHeight + "px";
    row.style.width = this.getTotalColumnWidth() + "px";
    row.innerHTML = tempColumns.innerHTML;

    var container = document.createElement("DIV");
    container.className = this._private.css.rowContainer;
    container.appendChild(row);

    return container;
  };





  /****************************************************************************************************************************
   * returns row with data from template
   ****************************************************************************************************************************/
  createRowMarkup(entity, attributeNames) {
    var tempColumns = document.createElement("DIV");
    tempColumns.innerHTML = this.Mustache.render(this.getRowTemplate(attributeNames), entity); //, attributeNames);

    //check if user want to override this TODO: test what this will break
    if (!this._private.columnWidthArrayOverride) {
      var i;
      for (i = 0; i < tempColumns.children.length; i++) {
        tempColumns.children[i].style.height = "100%";
        //setting lineheight so it stays in the middle
        tempColumns.children[i].style["line-height"] = this._private.rowHeight +"px";

        tempColumns.children[i].style.width = this._private.columnWidthArray[i] + "px";
        tempColumns.children[i].classList.add(this._private.css.rowCell);
        tempColumns.children[i].classList.add(this._private.css.rowColumn + i);
        tempColumns.children[i].classList.add(this._private.css.gridColumn + i);
        if (this._private.lockedColumns > i) {
          tempColumns.children[i].style.left = this._private.scrollVars.lastScrollLeft + "px";
          tempColumns.children[i].style.zIndex = this._private.internalDragDropCount;
          tempColumns.children[i].style.position = "relative";
        }
      }
    }
    return tempColumns.innerHTML;
  };





  /****************************************************************************************************************************
   * sets row to empty
   ****************************************************************************************************************************/
  setEmptyTemplate() {
    return "";
  };





  /****************************************************************************************************************************
   * gets the row cache length...
   ****************************************************************************************************************************/
  getRowCacheLength() {
    return this._private.htmlCache.rowsArray.length;
  };





  /****************************************************************************************************************************
   * set top value, here I could have failback to TOP instead of translate 3d
   ****************************************************************************************************************************/
  setRowTopValue(rowArray, elementNo, topValue) {
    rowArray[elementNo].div.style.transform = "translate3d(0px, " + topValue + "px, 0px)";
    rowArray[elementNo].top = topValue;
  };





  /****************************************************************************************************************************
   * gets the main div to create grid in
   ****************************************************************************************************************************/
  createGridHtmlWrapper() {
    var x = document.createElement("DIV"); //create this a container for my 3 rows
    this._private.node.appendChild(x);
    this._private.htmlCache.grid = x;
    //_private.htmlCache.grid =this._private.node;
    //do this for I know very little about css, and doing it like this I didnt get those weird side effects
    //todo look at this again, do not like what Ive done here
    this._private.htmlCache.grid.className = this._private.css.wrapper;
    this._private.htmlCache.grid.style.position = "relative";
    this._private.htmlCache.grid.style.height = this._private.node.style.height || "100%";
    this._private.htmlCache.grid.style.width = this._private.node.style.width || "100%";

    //get default height and width
    this._private.gridHeight = this._private.htmlCache.grid.clientHeight;
    this._private.gridWidght = this._private.htmlCache.grid.clientWidth;

  };





  /****************************************************************************************************************************
   * add header div
   ****************************************************************************************************************************/
  createGridHtmlHeaderWrapper() {
    //create and append header div
    this._private.htmlCache.header = document.createElement("DIV");
    this._private.htmlCache.header.className = this._private.css.mainHeader;
    this._private.htmlCache.header.style.height = this._private.headerHeight + "px";
    this._private.htmlCache.grid.appendChild(this._private.htmlCache.header);
    //get header template
    var headerDivs = this.createHeaderMarkup(this._private.htmlCache.header);
    if (this._private.queryHelper.addFilter) {
      var headerCells = headerDivs.lastElementChild.children;
      for (var i = 0; i < headerCells.length; i++) {
        this.addFilterToHeaderCell({
          attributeName: this._private.attributeArray[i],
          headerName: this._private.headerArray[i],
          defaultFilter: this._private.queryHelper.filterArray[i],
          div: headerCells[i]
        })
      }
    }
    this._private.htmlCache.header.appendChild(headerDivs);

  };





  /****************************************************************************************************************************
   * rebuild header div, needed if user sets new columns or something
   ****************************************************************************************************************************/
  rebuildGridHeaderHtml() {
    //get current scrollleft, so we can set it again after.
    var getScrollLeft = this._private.htmlCache.header.firstChild.firstChild.style.left;
    this._private.htmlCache.header.removeChild(this._private.htmlCache.header.firstChild);

    //get header template
    var headerDivs = this.createHeaderMarkup(this._private.htmlCache.header);
    if (this._private.queryHelper.addFilter) {
      var headerCells = headerDivs.lastElementChild.children;
      for (var i = 0; i < headerCells.length; i++) {
        this.addFilterToHeaderCell({
          attributeName: this._private.attributeArray[i],
          headerName: this._private.headerArray[i],
          defaultFilter: this._private.queryHelper.filterArray[i],
          div: headerCells[i]
        })
      }
    }
    this._private.htmlCache.header.appendChild(headerDivs);
    this.addResizableAndSortableEvent();

    //get back last scrollleft
    this._private.htmlCache.header.firstChild.firstChild.style.left = getScrollLeft;
  };





  /****************************************************************************************************************************
   * add content div
   ****************************************************************************************************************************/
  createGridHtmlContentWrapper() {
    //calculate content height
    var gridWrapperHeight = this._private.gridHeight;
    var headerAndFooterHeight = this._private.headerHeight + this._private.footerHeight;
    this._private.contentHeight = gridWrapperHeight - headerAndFooterHeight;

    //create and append content div
    this._private.htmlCache.content = document.createElement("DIV");
    this._private.htmlCache.content.className = this._private.css.mainContent;
    this._private.htmlCache.content.style.height = this._private.contentHeight + "px";
    this._private.htmlCache.grid.appendChild(this._private.htmlCache.content);
  };





  /****************************************************************************************************************************
   * adds the footer
   ****************************************************************************************************************************/
  createGridHtmlFooterWrapper() {
    //create and append
    this._private.htmlCache.footer = document.createElement("DIV");
    this._private.htmlCache.footer.className = this._private.css.mainFooter;
    this._private.htmlCache.footer.style.height = this._private.footerHeight + "px";
    this._private.htmlCache.grid.appendChild(this._private.htmlCache.footer);
  };





  /****************************************************************************************************************************
   * sets scroll body to interal variable
   ****************************************************************************************************************************/
  setScrollBodyHeightToVar() {
    var collectionLength = this._private.configFunctions.getCollectionLength();
    this._private.scrollBodyHeight = collectionLength * this._private.rowHeight;
  };





  /****************************************************************************************************************************
   * add the scroll body
   ****************************************************************************************************************************/
  createGridHtmlScrollBodyWrapper() {
    this.setScrollBodyHeightToVar();
    //create and append
    this._private.htmlCache.scrollBody = document.createElement("DIV");
    this._private.htmlCache.scrollBody.className = this._private.css.scrollBody;
    this._private.htmlCache.scrollBody.style.height = this._private.scrollBodyHeight + "px";
    this._private.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
    this._private.htmlCache.content.appendChild(this._private.htmlCache.scrollBody);
  };





  /****************************************************************************************************************************
   * add the scroll body, this is needed when user chnages columns or resize the columns, so main content knows if scrollbars is needed
   ****************************************************************************************************************************/
  correctRowAndScrollbodyWidth() {
    this._private.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
    for (var i = 0; i < this._private.htmlCache.rowsArray.length; i++) {
      this._private.htmlCache.rowsArray[i].div.style.width = this.getTotalColumnWidth() + "px";
    }
    this._private.htmlCache.header.firstChild.firstChild.style.width = this.getTotalColumnWidth() + "px";
  };





  /****************************************************************************************************************************
   *
   ****************************************************************************************************************************/
  correctHeaderAndScrollbodyWidth() {
    this._private.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
    this._private.htmlCache.header.firstChild.firstChild.style.width = this.getTotalColumnWidth() + "px";
  };





  /****************************************************************************************************************************
   * add the rows to scroll div
   ****************************************************************************************************************************/
  createGridHtmlRowWrapper() {
    //rows we need to fill up visible container
    var minimumRowsNeeded = (parseInt(this._private.contentHeight / this._private.rowHeight, 10)) * 2;

    //set extra so we can buffer
    if (minimumRowsNeeded % 2 === 1) {
      minimumRowsNeeded = minimumRowsNeeded + 9;
    } else {
      minimumRowsNeeded = minimumRowsNeeded + 8;
    }

    var top = 0;
    for (var i = 0; i < minimumRowsNeeded; i++) {

      var row = document.createElement("DIV");

      //add row css
      row.className = this._private.css.row;

      //add alt/even css
      if (i % 2 === 1) {
        row.classList.add(this._private.css.rowAlt);
      } else {
        row.classList.add(this._private.css.rowEven);
      }

      row.style.height = this._private.rowHeight + "px";

      this.setRowTopValue([{
        div: row,
        top: 0
      }], 0, top);

      row.style.minWidth = this._private.htmlCache.grid.offsetWidth + "px";
      row.style.width = this.getTotalColumnWidth() + "px";

      //inner magic
      row.innerHTML = this.setEmptyTemplate();

      //add to scroll body
      this._private.htmlCache.scrollBody.appendChild(row);

      //push into our html cache for later use when scrolling
      //own for top so we get it faster
      this._private.htmlCache.rowsArray.push({
        div: row,
        top: top
      });
      //set new top for next row
      top = top + this._private.rowHeight;
    }
  };





  /****************************************************************************************************************************
   * calls user for element, user haveto use callback here, might also need to fetch data first..
   ****************************************************************************************************************************/
  insertRowMarkup(rowNo, rowHtmlElement, isDownScroll, isLargeScroll) {
    //called when drawing row
    //lets ask for our data, and insert it into row
    this._private.configFunctions.getDataElement(rowNo, isDownScroll, isLargeScroll,
      (entity) => {
        //create container
        var container = document.createElement("DIV");
        container.className = this._private.css.rowContainer;

        //if they want to override we set row to 100%, also this might break TODO: test more
        if (this._private.columnWidthArrayOverride) {
          container.style.width = "100%"
        }

        //create markup
        var innerHtml = "";
        if (entity) {
          innerHtml = this.createRowMarkup(entity, this._private.attributeArray)
        }
        if (!entity) {
          rowHtmlElement.classList.add(this._private.css.noData)
        } else {
          rowHtmlElement.classList.remove(this._private.css.noData)
        }

        //add alt/even css
        if (rowNo % 2 === 1) {
          if (rowHtmlElement.classList.contains(this._private.css.rowEven)) {
            rowHtmlElement.classList.remove(this._private.css.rowEven);
            rowHtmlElement.classList.add(this._private.css.rowAlt);
          }

        } else {
          if (rowHtmlElement.classList.contains(this._private.css.rowAlt)) {
            rowHtmlElement.classList.remove(this._private.css.rowAlt);
            rowHtmlElement.classList.add(this._private.css.rowEven);
          }
        }

        //set highlight
        try {
          if (this._private.selection.isSelected(rowNo)) {
            rowHtmlElement.classList.add(this._private.css.rowSelected)
          } else {
            rowHtmlElement.classList.remove(this._private.css.rowSelected)
          }
        } catch (e) {
          //nothing for now...
        }

        //set innerhtml and add to row
        container.innerHTML = innerHtml;
        if (rowHtmlElement.firstChild) {
          if (rowHtmlElement.firstChild.innerHTML !== innerHtml) {
            rowHtmlElement.appendChild(container);
          }
        } else {
          rowHtmlElement.appendChild(container);
        }

        //call celldraw option, if this is set 13/03-2016 removing, complete rowmarkup option will replace
        if (this._private.configFunctions.onCellDraw) {
          var rowCells = rowHtmlElement.lastElementChild.children;
          for (var i = 0; i < rowCells.length; i++) {
            this._private.configFunctions.onCellDraw({
              attributeName: this._private.attributeArray[i],
              div: rowCells[i],
              row: rowNo
            })
          }
        }

      });
  };





  /****************************************************************************************************************************
   * helper for editing cells, user could define this them self one that is more advanced..
   * maybe add a callback here also so uer can be asked for formating for numbers and dates...
   ****************************************************************************************************************************/
  editCellhelper(e, readOnly, callback) {

    try {
      var clicked = false;
      var myElement = e.target;
      if (myElement.className === this._private.css.cellContent) {
        this._private.disableRowClick = true;
        var attributeName = myElement.getAttribute(this._private.atts.dataAttribute);
        var oldValue = myElement.innerHTML;

        myElement.setAttribute("contenteditable", "true");
        myElement.classList.add(this._private.css.editCell);

        //setback value
        myElement.onblur = () => {

          myElement.setAttribute("contenteditable", "false");
          myElement.classList.remove(this._private.css.editCell);
          var newValue = myElement.innerHTML;
          if (oldValue !== newValue) {

            if (!clicked) {
              clicked = true;
              callback({
                attribute: attributeName,
                value: newValue,
                oldValue: oldValue,
                element: myElement
              });
            }
            this._private.disableRowClick = false;
          } else {
            //myElement.innerHTML = oldValue;
            this._private.disableRowClick = false;
          }
        };

        var ctrlDown = false;
        var ctrlKey = 17,
          vKey = 86,
          cKey = 67;

        myElement.onkeyup = (ex) => {
          if (ex.keyCode == ctrlKey) {
            ctrlDown = false;
          }
        };

        myElement.onkeydown = (e) => {
          if (e.keyCode == 13) {
            myElement.onblur();
            return false;
          }
          if (e.keyCode == ctrlKey) {
            ctrlDown = true;
          }
          if (readOnly === true) {
            if (ctrlDown && e.keyCode == cKey) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        };
      }
    } catch (e) {
      this._private.disableRowClick = false;
      console.log("something went wrong in cell editing"); //this is mostly helper function during development, should be disabled in production
    }

  };





  /****************************************************************************************************************************
   *    helper to add filter to header
   ****************************************************************************************************************************/
  addFilterToHeaderCell(event) {

    //internal vars
    var triggerRan = false;

    //get attibute
    var attributeName = event.attributeName;
    var headerName = event.headerName;
    var defaultFilter = event.defaultFilter;


    /*------------------------------------------------*/
    //called when chang event fires in filter input
    var onChangeEventOnFilter = (e) => {

      //to keep the onkeyup not to trigger while we do query
      triggerRan = true;
      setTimeout(() => {
        triggerRan = false;
      }, 300);

      //get inputs
      var queryHtmlInput = this._private.node.querySelectorAll("." + this._private.css.filterHandle);


      //loop all the headers
      var queryParams = [];
      for (var i = 0; i < queryHtmlInput.length; i++) {
        //current datasource attribute

        //do value exist and is not blank?
        if (queryHtmlInput[i].value !== "" && queryHtmlInput[i].value !== undefined) {
          var dataSourceAttribute = queryHtmlInput[i].getAttribute(this._private.atts.dataAttribute);
          var operator = this._private.queryHelper.filterArray[this._private.attributeArray.indexOf(dataSourceAttribute)];


          //set in & if we are not of first row
          var value = queryHtmlInput[i].value;
          //push into array that we send back after
          queryParams.push({
            attribute: dataSourceAttribute,
            value: value,
            operator: operator
          });
          //This is something I need for later if I add sortable columns.. and callback on each column on build
          this._private.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value;
        } else {

          if (queryHtmlInput[i].value === "") {
            var dataSourceAttribute = queryHtmlInput[i].getAttribute(this._private.atts.dataAttribute);
            this._private.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value = "";
          }

        }


      }
      this._private.configFunctions.onFilterRun(queryParams)
    };


    /*------------------------------------------------*/
    //called when users hits key down... just to know if user hits enter, so we know we can run filter
    var onKeyUpEventOnFilter = function (e) {
      if (e.keyCode === 13 && triggerRan === false) {
        e.target.onchange(e);
      }
    };


    /*------------------------------------------------*/
    //this created new div, this could have been a callback function
    var getHeaderCellMarkup = (labelTopCell, valueInput, attribute) => {

      var cssLabel = this._private.css.cellContent + " " + this._private.css.filterLabelBottom + " " + this._private.css.dragHandle + " " + this._private.css.orderHandle;
      var cssInput = this._private.css.cellContent + " " + this._private.css.filterInputBottom + " " + this._private.css.filterHandle;
      if (this._private.queryHelper.filterOnAtTop) {
        cssLabel = this._private.css.cellContent + " " + this._private.css.filterLabelTop + " " + this._private.css.dragHandle + " " + this._private.css.orderHandle
        cssInput = this._private.css.cellContent + " " + this._private.css.filterInputTop + " " + this._private.css.filterHandle;
      }

      //get sort icon
      var sortIcon = this.getSortIcon(attribute);

      //get filter name
      var filter = this._private.queryHelper.filterArray[this._private.attributeArray.indexOf(attribute)] || "filter";
      var filterName = this._private.configFunctions.getFilterName(filter);

      //setting lineheight so it stays in the middle
      var lineHeigth = 'style=line-height:'+this._private.headerHeight/2+'px;"';

      //markup--
      var cellLabel = '<div '+ lineHeigth +' class="' + cssLabel + '"  ' + this._private.atts.dataAttribute + '= "' + attribute + '">' + labelTopCell + sortIcon + '</div>';
      var cellInput = '<input '+ lineHeigth +' placeholder="' + filterName + '" class="' + cssInput + '"  ' + this._private.atts.dataAttribute + '= "' + attribute + '" value="' + valueInput + '"/>';

      //if its in the the array then we want empty block, else it will look like shit if filters are at top
      if (this._private.queryHelper.doNotAddFilterTo.indexOf(attribute) !== -1) {
        cellInput = '<div class="' + cssLabel + '"  ' + this._private.atts.dataAttribute + '= "' + attribute + '"></div>';
      }

      //check where to set the filter..
      var result;
      if (this._private.queryHelper.filterOnAtTop) {
        result = cellInput + cellLabel;
      } else {
        result = cellLabel + cellInput;
      }
      return result;

    };

    var value = "";

    //21.02.2015:need this because I want it to remeber input if user reorder/sort headers....use order by that I havent made yet
    if (this._private.queryStringCheck[attributeName] !== undefined) {
      value = this._private.queryStringCheck[attributeName];
    }

    //set new div
    event.div.innerHTML = getHeaderCellMarkup(headerName, value, attributeName);
    //set event type to use, onchange is the best one to use...
    var cellInputElement = event.div.querySelectorAll("." + this._private.css.filterHandle);
    if (this._private.queryHelper.filterOnKey !== true) {
      for (var i = 0; i < cellInputElement.length; i++) {
        cellInputElement[i].onchange = onChangeEventOnFilter;
        cellInputElement[i].onkeyup = onKeyUpEventOnFilter;
      }
    } else {
      for (var i = 0; i < cellInputElement.length; i++) {
        cellInputElement[i].onkeyup = onChangeEventOnFilter;
      }
    }
  };



  /****************************************************************************************************************************
   * option to scrollbars scrolling where we dont update all the time and use timeout
   ****************************************************************************************************************************/
  onNormalScrollingLarge() {
    //check is user have preformed big scroll, but want it to keep rows inline
    this._private.scrollVars.lastScrollTop = this._private.htmlCache.content.scrollTop;
    //fix firefox messing up whn reseting scrolbar to 0, this is not issue in chrome and edge
    if (this._private.htmlCache.content.scrollTop === 0 && this._private.scrollVars.lastScrollTop !== this._private.htmlCache.content.scrollTop) {
      this._private.scrollVars.lastScrollTop = 0;
    }

    if(this._private.configFunctions.getCollectionLength() <= this._private.htmlCache.rowsArray.length){
      this._private.scrollVars.lastScrollTop = 0;
    }

    var currentRow = parseInt(this._private.scrollVars.lastScrollTop / this._private.rowHeight, 10);
    this._private.scrollVars.firstTop = currentRow * this._private.rowHeight; //need this for later
    var currentRowTop = this._private.rowHeight * currentRow;
    var bottomHitCount;
    for (var i = 0; i < this.getRowCacheLength(); i++) {


      /*------------------------------------------------*/
      //move row
      var setNewTopOnRow = (cacheRowNumber) => {
        var row = this._private.htmlCache.rowsArray[cacheRowNumber];
        this.setRowTopValue([row], 0, currentRowTop);
        //remove content when we move/set new height
        if (row.div.firstChild) {
          row.div.removeChild(row.div.firstChild);
        }
        currentRowTop = currentRowTop + this._private.rowHeight;
      };

      if (currentRow >= 0 && currentRow <= this._private.configFunctions.getCollectionLength() - 1) {
        setNewTopOnRow(i);
      }

      //need to adjust my array, so upward scroll do not get weird ofter hitting bottom
      if (currentRow === this._private.configFunctions.getCollectionLength()-1 && this.getRowCacheLength() < this._private.configFunctions.getCollectionLength() - 1) {
        bottomHitCount = i;
      }

      //this helps if all is cleared
      if (currentRow > this._private.configFunctions.getCollectionLength()-1) {
        setNewTopOnRow(i);
      }

      //we want to remove rows that is larger than colletion and visible within normal content box
      if (currentRow >= this._private.configFunctions.getCollectionLength() && currentRowTop >= this._private.htmlCache.content.clientHeight) {
        //fix for when scrolling and removing rows that is larger then actuall length
        var row = this._private.htmlCache.rowsArray[i];
        this.setRowTopValue([row], 0, currentRowTop-5000);
        if (row.div.firstChild) {
          row.div.removeChild(row.div.firstChild);
        }
      }

      currentRow++;
    }

    //if I hit bottom, then I need to adjust the rowsArray.... code under fixes this.
    //what it does it take the rows that did not get moved and sets it before the other ones
    if (bottomHitCount) {
      var firstTop = parseInt(this._private.htmlCache.rowsArray[0].top, 10);
      for (i = this.getRowCacheLength() - 1; i > bottomHitCount; i--) {
        var row = this._private.htmlCache.rowsArray[i];
        firstTop = firstTop - this._private.rowHeight;
        this.setRowTopValue(this._private.htmlCache.rowsArray, i, firstTop);
        try {
          row.div.removeChild(row.div.firstChild);
        } catch (e) {
          //we might get a issue here where there is not any children..
        }
      }
    }

    //I now sort the array again.
    this._private.htmlCache.rowsArray.sort(
      function (a, b) {
        return parseInt(a.top) - parseInt(b.top)
      });

    this.fillDataInRows();
  };





  /****************************************************************************************************************************
   * add the rows to scroll div
   ****************************************************************************************************************************/
  onNormalScrolling(isDownScroll, currentScrollTop) {
    //check is user have preformed big scroll
    var currentScrollTop = this._private.htmlCache.content.scrollTop;
    if (this._private.scrollVars.halt === false) {
      var newTopValue;
      var currentRow = parseInt((this._private.scrollVars.lastScrollTop / this._private.rowHeight), 10);
      this._private.scrollVars.firstTop = currentRow * this._private.rowHeight;
      for (var i = 0; i < this.getRowCacheLength(); i++) {
        var row = this._private.htmlCache.rowsArray[i];
        var rowTop = parseInt(row.top, 10);
        var update = false;
        if (isDownScroll) {
          //scrolling downwards
          //check row position
          if (rowTop < (currentScrollTop - this._private.rowHeight)) {
            update = true;
            newTopValue = rowTop + (this._private.rowHeight * this.getRowCacheLength());
            currentRow = (rowTop + (this._private.rowHeight * this.getRowCacheLength())) / this._private.rowHeight;
          }
          if (rowTop > ((this._private.configFunctions.getCollectionLength() - 1) * this._private.rowHeight) && rowTop > parseInt(this._private.htmlCache.content.style.height)) {
            this.setRowTopValue([row], 0, -5000 + i);
          }
        } else {
          //scrolling upwards
          //check row position
          if (rowTop > ((currentScrollTop + this._private.contentHeight))) {
            update = true;
            newTopValue = rowTop - (this._private.rowHeight * this.getRowCacheLength());
            currentRow = (rowTop - (this._private.rowHeight * this.getRowCacheLength())) / this._private.rowHeight;
          }
        }
        //update data
        if (update === true && currentRow >= 0 && currentRow <= this._private.configFunctions.getCollectionLength() - 1) {
          //should I just get correct top value and draw it all after?
          this.setRowTopValue([row], 0, newTopValue);
          if (row.div.firstChild) {
            row.div.removeChild(row.div.firstChild);
          }
          this.insertRowMarkup(currentRow, row.div, isDownScroll, false);
        }
      }
      this._private.htmlCache.rowsArray.sort(
        function (a, b) {
          return parseInt(a.top) - parseInt(b.top)
        });
    } else {
      //just in case user scrolls big then small, do not want to update before he stops
      this.onScrollbarScrolling()
    }

  };





  /****************************************************************************************************************************
   * helper, removes rows, se minus height so we cant scroll to empty
   ****************************************************************************************************************************/
  hideRowsThatIsLargerThanCollection() {
    var currentRow = parseInt((this._private.scrollVars.lastScrollTop / this._private.rowHeight), 10);
    this._private.scrollVars.firstTop = currentRow * this._private.rowHeight;
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var row = this._private.htmlCache.rowsArray[i];
      var rowTop = parseInt(row.top, 10);
      if (rowTop > ((this._private.configFunctions.getCollectionLength() - 1) * this._private.rowHeight) && rowTop > (parseInt(this._private.htmlCache.content.style.height) - this._private.rowHeight)) {
        setRowTopValue([row], 0, -5000 + i);
      }
    }

    this._private.htmlCache.rowsArray.sort(
      function (a, b) {
        return parseInt(a.top) - parseInt(b.top)
      });
  };





  /****************************************************************************************************************************
   * on large scroll, or you have modified scroltop or similar, this can be used to correct issues and for just updating data
   ****************************************************************************************************************************/
  onScrollbarScrolling() {
    //set halt var to true, so small scroll will be stopped, will be laggy else
    this._private.scrollVars.halt = true;

    //delay before doing update
    var timeout = this._private.dataScrollDelay;

    //clear scroll timeout
    clearTimeout(this._private.scrollVars.timer);

    //set timeout, incase user is still scrolling
    this._private.scrollVars.timer = setTimeout(() => {
      this.onNormalScrollingLarge();
      this._private.scrollVars.halt = false;
    }, timeout);


  };





  /****************************************************************************************************************************
   * clear touch inputs callback on scroll TODO: do I need this, grid was just a scroller at first... and was just for displaying data on mobile so had to do this..
   ****************************************************************************************************************************/

  onScrollClickCancel() {
    //clear all touch events
    this._private.scrollVars.clickTimersArray.forEach((xTimer)=> {
      clearTimeout(xTimer);
    });
    //timeout so we get touch end/move also after scroll event
    if (this._private.scrollVars.clickTimersArray.length > 0) {
      setTimeout(() => {
        this._private.scrollVars.clickTimersArray.forEach((xTimer) => {
          clearTimeout(xTimer);
        });
      }, 0);
    }
  };





  /****************************************************************************************************************************
   * fixes scrolling / top of divs
   ****************************************************************************************************************************/
  onScroll() {
    var doScroll = () => {
      var currentScrollTop = this._private.htmlCache.content.scrollTop;
      var currentScrollLeft = this._private.htmlCache.content.scrollLeft;

      //are we scrolling ?
      if (currentScrollTop !== this._private.scrollVars.lastScrollTop) {
        //is vert scroll

        //stop left scroll...
        if (currentScrollLeft !== 0) {
          this._private.htmlCache.content.scrollLeft = this._private.scrollVars.lastScrollLeft;
          var header = this._private.htmlCache.header.children[0].children[0];
          header.style.left = -this._private.scrollVars.lastScrollLeft + "px";
        }

        //cancel touch event, do not want that triggering while scrolling  only use click in this grid, remove?
        this.onScrollClickCancel();

        //check if down scroll.
        var isDownScroll = true;
        if (currentScrollTop < this._private.scrollVars.lastScrollTop) {
          isDownScroll = false;
        }

        //check if big scroll (split m into 2.. simple to read)
        var isLargeScroll;

        switch (true) {
          case currentScrollTop > this._private.scrollVars.lastScrollTop + this._private.largeScrollLimit:
          case currentScrollTop < this._private.scrollVars.lastScrollTop - this._private.largeScrollLimit:
            isLargeScroll = true;
            break;

          default:
            isLargeScroll = false;
        }

        //reset scroll top
        this._private.scrollVars.lastScrollTop = currentScrollTop;

        //check if big scroll
        if (isLargeScroll) {
          //now user can set this, on very large collections this will drag preformance down
          if (this._private.renderOnScrollbarScroll) {
            this.onNormalScrollingLarge(isDownScroll, currentScrollTop)
          } else {
            console.log("scroll")
            this.onScrollbarScrolling();
          }
        } else {
          this.onNormalScrolling(isDownScroll, currentScrollTop)
        }
      } else {

        if (this._private.htmlCache.content.style.overflowX === "hidden") {
          //we do not want scrolls left if this is hidden..
          this._private.htmlCache.content.scrollLeft = 0;
          this._private.scrollVars.lastScrollLeft = 0;
          var header = this._private.htmlCache.header.children[0].children[0];
          header.style.left = 0 + "px";
        } else {
          if (this._private.scrollVars.lastScrollLeft !== currentScrollLeft) {
            currentScrollLeft = this._private.htmlCache.content.scrollLeft;
            var header = this._private.htmlCache.header.children[0].children[0];
            header.style.left = -currentScrollLeft + "px";
            this._private.scrollVars.lastScrollLeft = currentScrollLeft;
          }
        }

        //is horz scroll
        if (this._private.lockedColumns > 0) {
          //this have super bad performance in IE...
          currentScrollLeft = this._private.htmlCache.content.scrollLeft; //need the updated one...
          for (var lockedColNo = this._private.lockedColumns; lockedColNo--;) {


            var fixHeader = this._private.node.querySelectorAll("." + this._private.css.rowHeaderColumn + lockedColNo); //_private.correctionLockedColumnsArray[lockedColNo]);
            var fixRow = this._private.node.querySelectorAll("." + this._private.css.rowColumn + lockedColNo);
            //for(var i = 0; i < fix.length; i++){
            for (var i = fixHeader.length; i--;) {
              fixHeader[i].style.left = currentScrollLeft + "px";
              fixHeader[i].style.zIndex = this._private.internalDragDropCount;
              fixHeader[i].style.position = "relative";
            }
            for (var i = fixRow.length; i--;) {
              fixRow[i].style.left = currentScrollLeft + "px";
              fixRow[i].style.zIndex = this._private.internalDragDropCount;
              fixRow[i].style.position = "relative";
            }
          }
        }


      }
    };

    if (this._private.requestAnimationFrame) {
      requestAnimationFrame(() => {
        doScroll();
      });
    } else {
      doScroll();
    }

  }; //end scroll event





  /****************************************************************************************************************************
   * used with click event to get row number of the one click on
   ****************************************************************************************************************************/
  getRowNumberFromClickedOn(e) {
    var thisTop;
    var x = 10;
    var node = e.target;
    for (var i = 0; i < x; i++) {
      try {
        //21 march fix, will get bad result if I do it any other way
        if (node.classList.contains(this._private.css.row)) {
          for (var y = 0; y < this._private.htmlCache.rowsArray.length; y++) {
            if (node.style.transform === this._private.htmlCache.rowsArray[y].div.style.transform) {
              thisTop = this._private.htmlCache.rowsArray[y].top;
            }
          }
        }
        node = node.offsetParent;
      } catch (x) {
      }
    }

    var rowHeight = this._private.rowHeight;
    var currentRow = Math.round(thisTop / rowHeight);
    return currentRow;
  };





  /****************************************************************************************************************************
   * fixes highlight and select...
   ****************************************************************************************************************************/
  onRowClickAndHighligtHandler(e) {
    //_private.selectionVars.
    var isSel;

    var removeRowHighligt = (currentRow) => {
      var selectedRows, i;

      var removeFromArray = (array, row) => {
        array.splice(row, 1);
      }

      selectedRows = this._private.selection.getSelectedRows();
      for (i = 0; i < selectedRows.length; i++) { //what? why aint I using indexOf? TODO:rewrite
        if (selectedRows[i] === currentRow) {
          removeFromArray(selectedRows, i);
          i--;
        }
      }
      this._private.selection.setSelectedRows(selectedRows);
    }

    var currentRow = this.getRowNumberFromClickedOn(e);
    var currentselectedRows = this._private.selection.getSelectedRows();

    if (currentRow !== this._private.selectionVars.lastRowSelected | currentselectedRows[0] !== currentRow) {

      //if not same row clicked again..
      this._private.selectionVars.onClicked = true;

      if (currentRow <= (this._private.configFunctions.getCollectionLength() - 1)) { //do I need to check this?

        if (this._private.isMultiSelect === true) { //if multiselect duh!

          var currentKeyKode = "";

          if (e.shiftKey) {
            currentKeyKode = "shift";
            currentselectedRows = this._private.selection.getSelectedRows();
            if (currentselectedRows.length > 0 && this._private.selectionVars.lastKeyKodeUsed === "none") {
              this._private.selectionVars.lastRowSelected = currentselectedRows[0];
              this._private.selectionVars.lastKeyKodeUsed = "shift";
            }
          }

          if (e.ctrlKey) {
            currentKeyKode = "ctrl";
          }

          if (!e.ctrlKey && !e.shiftKey) {
            currentKeyKode = "none";
          }

          switch (true) {
            case currentKeyKode === "none":
              this._private.selection.select(currentRow);
              break;
            case this._private.selectionVars.lastKeyKodeUsed === "shift" && currentKeyKode === "ctrl":

              isSel = this._private.selection.isSelected(currentRow);
              if (isSel === true) {
                removeRowHighligt(currentRow);
              } else {
                this._private.selection.select(currentRow, true);
              }
              break;

            case this._private.selectionVars.lastKeyKodeUsed === "ctrl" && currentKeyKode === "shift":

              this._private.selection.selectRange(this._private.selectionVars.lastRowSelected, currentRow);
              break;

            case this._private.selectionVars.lastKeyKodeUsed === "ctrl" && currentKeyKode === "ctrl":

              isSel = this._private.selection.isSelected(currentRow);
              if (isSel === true) {
                removeRowHighligt(currentRow);
              } else {
                this._private.selection.select(currentRow, true);
              }
              break;

            case this._private.selectionVars.lastKeyKodeUsed === "none" && currentKeyKode === "ctrl":

              isSel = this._private.selection.isSelected(currentRow);
              if (isSel === true) {
                removeRowHighligt(currentRow);
              } else {
                this._private.selection.select(currentRow, true);
              }
              break;

            case this._private.selectionVars.lastKeyKodeUsed === "shift" && currentKeyKode === "shift":

              if (this._private.selectionVars.lastRowSelected > currentRow) {
                this._private.selection.selectRange(currentRow, this._private.selectionVars.lastRowSelected);
              } else {
                this._private.selection.selectRange(this._private.selectionVars.lastRowSelected, currentRow);
              }
              break;

            case this._private.selectionVars.lastKeyKodeUsed === "none" && currentKeyKode === "shift":

              if (this._private.selectionVars.lastRowSelected !== null) {
                if (this._private.selectionVars.lastRowSelected > currentRow) {
                  this._private.selection.selectRange(currentRow, this._private.selectionVars.lastRowSelected);
                } else {
                  this._private.selection.selectRange(this._private.selectionVars.lastRowSelected, currentRow);
                }
              } else {
                this._private.selection.select(currentRow);
              }
              break;
            default:
              console.log("error, this should not happend")
          }
        } else {
          this._private.selection.select(currentRow);
        }
        this._private.selectionVars.lastKeyKodeUsed = currentKeyKode;

        //update selection on rows
        this.updateSelectionOnAllRows()
      }
    } else {
      //same row clicked again
      if (e.ctrlKey) {
        currentKeyKode = "ctrl";
      }

      //if ctrl button we wanto remove selection
      if (currentKeyKode === "ctrl") {
        this._private.selectionVars.lastKeyKodeUsed = currentKeyKode;
        isSel = this._private.selection.isSelected(currentRow);
        if (isSel === true) {
          removeRowHighligt(currentRow);
        }
        this._private.selectionVars.lastRowSelected = -1
      } else {
        //else we just wanto make it current..
        isSel = this._private.selection.isSelected(currentRow);
        this._private.selection.select(currentRow);
      }
      //update selection on rows
      this.updateSelectionOnAllRows()
    }
  };





  /****************************************************************************************************************************
   * hiding scroll bars when not needed
   ****************************************************************************************************************************/
  updateGridScrollbars() {

    var collectionHeight = this._private.configFunctions.getCollectionLength() * this._private.rowHeight+(this._private.rowHeight/2);
    var bodyHeight = this._private.htmlCache.content.offsetHeight;
    //_private.largeScrollLimit = bodyHeight; why was this here... leave it here incase there is something Im missing atm

    if (collectionHeight <= bodyHeight) {
      this._private.htmlCache.content.scrollTop = 0;
      //_private.htmlCache.content.scrollLeft = 0;
      this._private.htmlCache.content.style.overflow = "";
      this._private.htmlCache.content.style.overflowY = "hidden";
      this._private.htmlCache.content.style.overflowX = "hidden";

    } else {
      // this._private.htmlCache.content.scrollLeft = 0;
      this._private.htmlCache.content.style.overflow = "";
      this._private.htmlCache.content.style.overflowY = "scroll";
      this._private.htmlCache.content.style.overflowX = "hidden";
    }

    if (this._private.htmlCache.content.offsetWidth - 5 < this.getTotalColumnWidth()) {
      this._private.htmlCache.content.style.overflowX = "scroll";
    }

  };





  /****************************************************************************************************************************
   * add the events  (TODO: when cleaning up code I need to splitt the stuff in here into more functions..)
   ****************************************************************************************************************************/
  addResizableAndSortableEvent() {


    /*------------------------------------------------*/
    // adds resizable headers
    var resizable = false;
    var screenX;
    var xElement;
    var sortable = false;

    //todo, need to tell if we want sort on header click, and if we want multisort
    if (this._private.sortOnHeaderClick) {
      var orderByClick = (event) => {
        if (!sortable && !resizable) {
          this._private.configFunctions.onOrderBy(event, (sortorder) => {
            this._private.sortOrder = sortorder;
            this.rebuildGridHeaderHtml();
          })
        }
      };



      //get inputs
      var orderBy = this._private.node.querySelectorAll("." + this._private.css.orderHandle);
      for (var i = 0; i < orderBy.length; i++) {
        orderBy[i].addEventListener("click", orderByClick.bind(this), false);
      }
    }


    if (this._private.isResizableHeaders) {
      var x = this._private.htmlCache.header.querySelectorAll("." + this._private.css.rowHeaderCell);
      for (var i = 0; i < x.length; i++) {

        var temp = document.createElement("DIV");
        temp.classList.add(this._private.css.resizeHeaderDragHandle);


        temp.onmousedown = (e) => {
          resizable = true;

          //disable sortable when resizing
          if (this._private.isSortableHeader) {
            this._private.sortableCtx.option("disabled", resizable);
          }
          screenX = e.screenX;
          xElement = e.target;
          var originalWidth = xElement.offsetParent.style.width;
          var originalWidthx = xElement.offsetParent.style.width;
          var index = xElement.offsetParent.getAttribute("column-no");
          //var index =this._private.attributeArray.indexOf(attribute);


          this._private.htmlCache.header.onmousemove = (e) => {


            //get when user let go of mouse button
            this._private.htmlCache.header.onmouseup = () => {
              //small timeout to stop header click
              setTimeout(() => {
                resizable = false;
                if (this._private.isSortableHeader) {
                  this._private.sortableCtx.option("disabled", resizable);
                }
              }, 30);

              this._private.htmlCache.header.onmouseleave = "";
              this._private.htmlCache.header.onmousemove = "";
              this._private.htmlCache.header.onmouseup = "";
              //enable sortable again if its enabled


              this._private.columnWidthArray[index] = parseInt(xElement.offsetParent.style.width);

              //reset template and fill data
              this._private.htmlCache.rowTemplate = null;
              this.correctRowAndScrollbodyWidth();

              this.cacheRowTemplate();
              this.updateGridScrollbars();
              this.fillDataInRows(true);
              //onScrollbarScrolling();
            };

            this._private.htmlCache.header.onmouseleave = (e) => {
              this._private.htmlCache.header.onmouseup(e);

            };

            if (resizable) {
              var newWidth = parseInt(originalWidth) - ((screenX - e.screenX)) + "px";
              this._private.columnWidthArray[index] = parseInt(newWidth);
              xElement.offsetParent.style.width = parseInt(originalWidth) - ((screenX - e.screenX)) + "px";
              xElement.offsetParent.style.width = parseInt(originalWidthx) - ((screenX - e.screenX)) + "px";
              if (this._private.resizableHeadersAndRows) {
                var columnsToFix = this._private.htmlCache.content.firstChild.querySelectorAll("." + this._private.css.rowColumn + index);

                for (var col = 0; col < columnsToFix.length; col++) {
                  columnsToFix[col].style.width = newWidth
                }

                this.correctRowAndScrollbodyWidth();
                this.updateGridScrollbars();

              }
            } else {
              this.correctHeaderAndScrollbodyWidth();
            }
          }
        };

        x[i].appendChild(temp)
      }
    }


    /*------------------------------------------------*/
    //adds sortable headers

    if (this._private.isSortableHeader) {
      this._private.sortableCtx = new this.SimpleGridSortable(this._private.htmlCache.header.firstChild.firstChild, (oldIndex, newIndex) => {
        var children = this._private.htmlCache.header.firstChild.firstChild.children;

        var x;
        x = this._private.attributeArray[oldIndex];
        this._private.attributeArray.splice(oldIndex, 1);
        this._private.attributeArray.splice(newIndex, 0, x);

        x = this._private.queryHelper.filterArray[oldIndex];
        this._private.queryHelper.filterArray.splice(oldIndex, 1);
        this._private.queryHelper.filterArray.splice(newIndex, 0, x);

        x = this._private.headerArray[oldIndex];
        this._private.headerArray.splice(oldIndex, 1);
        this._private.headerArray.splice(newIndex, 0, x);

        x = this._private.columnWidthArray[oldIndex];
        this._private.columnWidthArray.splice(oldIndex, 1);
        this._private.columnWidthArray.splice(newIndex, 0, x);

        x = this._private.colStyleArray[oldIndex];
        this._private.colStyleArray.splice(oldIndex, 1);
        this._private.colStyleArray.splice(newIndex, 0, x);


        this._private.htmlCache.rowTemplate = null; //reset template and fill data
        this.cacheRowTemplate();
        this.rebuildColumns();
        sortable = false;

      }, function (n) {
        //on end
        sortable = true;
      }, function (n) {
        //on cancel
        sortable = false;
      });
    }
  };





  /****************************************************************************************************************************
   * add the events  (TODO: when cleaning up code I need to splitt the stuff in here into more functions..)
   ****************************************************************************************************************************/
  addEvents() {

    /*------------------------------------------------*/
    //normal click
    var handleClick = (e) => {
      var xTimer = setTimeout(() => {
          if (!this._private.disableRowClick) {
            if (this._private.isMultiSelect !== undefined) {
              this.onRowClickAndHighligtHandler(e);
            }
            var currentRow = this.getRowNumberFromClickedOn(e);
            this._private.configFunctions.clickHandler(e, currentRow, null)
          }
        },
        200);
      this._private.scrollVars.clickTimersArray.push(xTimer);
    };


    /*------------------------------------------------*/
    //doubleclick
    var handleDblClick = (e) => {
      this.onScrollClickCancel(); //clear singleclick so it does not fire twise,
      if (!this._private.disableRowClick) {
        if (this._private.isMultiSelect !== undefined) {
          this.onRowClickAndHighligtHandler(e);
        }
        var currentRow = this.getRowNumberFromClickedOn(e);
        this._private.configFunctions.clickHandler(e, currentRow, this.editCellhelper.bind(this))
      }

    };


    /*------------------------------------------------*/
    //right click
    var onMouseDownRow = (e) => {
      //e.preventDefault();
      if (e.button === 2) {
        if (!this._private.disableRowClick) {
          var currentRow = this.getRowNumberFromClickedOn(e);
          this._private.configFunctions.clickHandler(e, currentRow, null)
        }
      }

    };


    //add all click events to rows
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var div = this._private.htmlCache.rowsArray[i].div;

      div.addEventListener("dblclick", handleDblClick.bind(this), false); //single and doubleclick... this will end bad.., maybe use other key wih click to edit?
      div.addEventListener("click", handleClick.bind(this), false);
      div.addEventListener("contextmenu", onMouseDownRow, false);
    }

    //this have to be after clcik since it will cancel if scroll event
    this._private.htmlCache.content.addEventListener("scroll", this.onScroll.bind(this));

    this.addResizableAndSortableEvent(); //this also includes the orderby click on header event

  };





  /****************************************************************************************************************************
   * correct columns witdth array, incase they have just defined the first 2, or none
   ****************************************************************************************************************************/
  correctColumnsWidthArray() {
    var newColumnWidth = [];
    for (var i = 0; i < this._private.attributeArray.length; i++) {
      var columnWidth = this._private.columnWidthArray[i] || 100;
      newColumnWidth.push(columnWidth)
    }
    this._private.columnWidthArray = newColumnWidth;
  };





  /****************************************************************************************************************************
   * sett large scroll limit, looks like *3 content height is a better match from lates testing
   ****************************************************************************************************************************/
  setLargeScrollLimit() {
    if (!this._private.largeScrollLimit) {
      this._private.largeScrollLimit = this._private.contentHeight * 3.3
      ;
    }
  };





  /****************************************************************************************************************************
   * add the html
   ****************************************************************************************************************************/
  addHtml() {

    //cache row template..
    this.cacheRowTemplate();

    //add needed html
    this.createGridHtmlWrapper(); //entire main grid, pretty much just adds a class
    this.createGridHtmlHeaderWrapper(); //adds header
    this.createGridHtmlContentWrapper(); //adds content/viewport we see
    this.createGridHtmlFooterWrapper(); //adds footer
    this.createGridHtmlScrollBodyWrapper(); //adds the scroll height
    this.createGridHtmlRowWrapper(); //adds html rows needed ++

    //update the scrollbars, so they show only if needed
    //pretty much just hides/shows -> left/right scroll
    this.updateGridScrollbars();
  };


  /****************************************************************************************************************************
   * will create the actual grid (cant be constructor since I call this when rebuilding)
   ****************************************************************************************************************************/
  init(isRebuild) {
    this.correctColumnsWidthArray(); //less mess later when doing it this way
    this.addHtml(); //add html
    this.addEvents(); //add events
    if (!isRebuild) {
      //todo: remeber scroll height , devide on rowheight, and set to what ever new is?
      this.setSelectionType();
    }
    //
    if (this._private.predefinedScrolltop) {
      this.setScrollTop(this._private.predefinedScrolltop);
    }

    this.fillDataInRows(); //fillDataInRows

    this.setLargeScrollLimit();
  };





  /****************************************************************************************************************************
   * redraws most parts of grid...
   ****************************************************************************************************************************/
  redrawGrid() {
    this._private.node.getElementsByClassName(this._private.css.wrapper)[0].remove();
    this._private.htmlCache.rowsArray = [];
    this._private.htmlCache.header = null;
    this._private.htmlCache.content = null;
    this._private.htmlCache.footer = null;
    this._private.htmlCache.scrollBody = null;
    this._private.htmlCache.rowTemplate = null;

    this.init(true);
    this.fixHeaderWithBody();
  };





  /****************************************************************************************************************************
   * fixes header body width
   ****************************************************************************************************************************/
  fixHeaderWithBody() {
    var currentScrollLeft = this._private.htmlCache.content.scrollLeft;
    var header = this._private.htmlCache.header.children[0].children[0];
    header.style.left = -currentScrollLeft + "px";
    if (this._private.lockedColumns > 0) { //todo in own function, its used a few places now
      //this have super bad performance in IE...
      currentScrollLeft = this._private.htmlCache.content.scrollLeft; //need the updated one...
      for (var lockedColNo = this._private.lockedColumns; lockedColNo--;) {
        var fix = this._private.node.querySelectorAll("." + this._private.css.gridColumn + lockedColNo);
        //for(var i = 0; i < fix.length; i++){
        for (var i = fix.length; i--;) {
          fix[i].style.left = currentScrollLeft + "px";
          fix[i].style.zIndex = this._private.internalDragDropCount;
          fix[i].style.position = "relative";
        }
      }
    }
  };





  /****************************************************************************************************************************
   * rebuilds columns, used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  rebuildColumns() {
    this.correctColumnsWidthArray();
    this._private.htmlCache.rowTemplate = null;
    this.cacheRowTemplate();
    this.rebuildGridHeaderHtml();
    this.fillDataInRows(true);
    this.correctRowAndScrollbodyWidth();
    this.updateSelectionOnAllRows();
    this.updateGridScrollbars();
    this.fixHeaderWithBody();
  };





  /****************************************************************************************************************************
   * rebuilds columns and trigger collection change in grid (rebuild rows), used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  columnChangeAndCollection(resetScrollToTop) {
    this.correctColumnsWidthArray();
    this._private.htmlCache.rowTemplate = null;
    this.cacheRowTemplate();
    this.rebuildGridHeaderHtml();
    this.fillDataInRows(true);
    this.updateSelectionOnAllRows();
    this.collectionChange(resetScrollToTop);
  };





  /****************************************************************************************************************************
   * trigger collection change in grid (rebuild rows), used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  collectionChange(resetScrollToTop, scrollBottom) {

    //adjust scroller before updating, so it created unwanted side effects
    this.setScrollBodyHeightToVar();
    this._private.htmlCache.scrollBody.style.height = this._private.scrollBodyHeight + "px";
    var reset = false;
    if (resetScrollToTop === true) {
      this._private.htmlCache.content.scrollTop = 0;
    }
    if (this._private.scrollBodyHeight < this._private.htmlCache.content.scrollTop || scrollBottom) {
      var collectionLength = this._private.configFunctions.getCollectionLength();
      var contentRows = parseInt(this._private.htmlCache.content.offsetHeight/this._private.rowHeight);
      var scrollOffsetHeight = contentRows*this._private.rowHeight
      this._private.htmlCache.content.scrollTop = ((collectionLength * this._private.rowHeight)-(scrollOffsetHeight))

    }




    this.updateGridScrollbars();
    this.correctRowAndScrollbodyWidth();
    this.updateSelectionOnAllRows();
    this.fixHeaderWithBody();
    this.onNormalScrollingLarge();//
    this.fillDataInRows(true);
    if(scrollBottom){
      this._private.htmlCache.content.scrollTop =this._private.htmlCache.content.scrollTop+this._private.rowHeight
    }


  };





  /****************************************************************************************************************************
   * helper function to handle change of data..
   * 21.02.2015: TODO: I need to debug these, have not been testing much... need to build better demo first
   ****************************************************************************************************************************/

  //tested
  setRowHeight(newHeight) {
    this._private.rowHeight = newHeight;
    this.redrawGrid();
  };

  //tested
  setHeaderHeight(newHeight) {
    this._private.headerHeight = newHeight;
    this.redrawGrid();
  };

  //tested
  setFooterHeight(newHeight) {
    this._private.footerHeight = newHeight;
    this.redrawGrid();
  };

  //tested
  disableHeaderFilter() {
    this._private.queryHelper.addFilter = false;
    this.rebuildGridHeaderHtml();
  };

  //tested
  enableHeaderFilter() {
    this._private.queryHelper.addFilter = true;
    this.rebuildGridHeaderHtml();
  };

  //tested
  setHeaderFilterAtBottom() {
    this._private.queryHelper.filterOnAtTop = false;
    this.rebuildGridHeaderHtml();
  };

  //tested
  setHeaderFilterAtTop() {
    this._private.queryHelper.filterOnAtTop = true;
    this.rebuildGridHeaderHtml();
  };

  //tested todo: this need to be changed now
  setColumns(paramObj) {
    this._private.headerArray = paramObj.headerArray;
    this._private.attributeArray = paramObj.attributeArray;
    this._private.columnWidthArray = paramObj.columnWidthArray;
  };


  getColumns() {
    return {
      "headerArray": this._private.headerArray,
      "attributeArray": this._private.attributeArray,
      "columnWidthArray": this._private.columnWidthArray
    }
  };


  setLockedColumns(numberOfLockedColumns) {
    this._private.lockedColumns = numberOfLockedColumns;
    this.rebuildColumns();

  };


  enableResizableColumns(option) {
    this._private.isResizableHeaders = true;
    this._private.resizableHeadersAndRows = option;
    this.rebuildGridHeaderHtml();
  };


  disableResizableColumns() {
    this._private.isResizableHeaders = false;
    this._private.resizableHeadersAndRows = false;
    this.rebuildGridHeaderHtml();

  };


  enableSortableColumns() {
    this._private.isSortableHeader = true;
    this.rebuildGridHeaderHtml();
  };



  disableSortableColumns() {
    this._private.isSortableHeader = false;
    this.rebuildGridHeaderHtml();
  };


  setMultiSelection(keepSelection) {
    this._private.isMultiSelect = true;
    this._private.selectionMode = "multible";
    if (!keepSelection) {
      this._private.$selectedRows = [];
    }
    this.updateSelectionOnAllRows();
  };


  setSingleSelection(keepSelection) {
    this._private.isMultiSelect = false;
    this._private.selectionMode = "single";
    if (!keepSelection) {
      this._private.$selectedRows = [];
    }
    this.updateSelectionOnAllRows();
  };


  disableSelection(keepSelection) {
    this._private.isMultiSelect = undefined;
    this._private.selectionMode = "none";
    if (!keepSelection) {
      this._private.$selectedRows = [];
    }
    this.updateSelectionOnAllRows();
  };


  getSelectedRows() {
    return this.selection.getSelectedRows();
  };


  setSelectedRows(sel) {
    this.selection.setSelectedRows(sel);
    this.updateSelectionOnAllRows();
  };


  scrollBottom() {
    var collectionLength = this._private.configFunctions.getCollectionLength();
    this._private.htmlCache.content.scrollTop = collectionLength * this._private.rowHeight;
  };


  scrollTop() {
    this._private.htmlCache.content.scrollTop = 0;
  };


  setScrollTop(newTop) {
    this._private.htmlCache.content.scrollTop = newTop;
  };


  getScrollTop() {
    return this._private.htmlCache.content.scrollTop;
  };


  updateRow(no, clear) {
    this.fillDataIntoRow(no, clear)
  };

  clearHeaderSortFilter() {
    this._private.sortOrder = [];
    this.rebuildGridHeaderHtml();
  };

  setHeaderSortFilter(sortOrder) {
    this._private.sortOrder = sortOrder;
    this.rebuildGridHeaderHtml();
  };

  enableHeaderSort() {
    this._private.sortOnHeaderClick = true;
    this.rebuildGridHeaderHtml();
  };

  disableHeaderSort(sortOrder) {
    this._private.sortOnHeaderClick = false;
    this.rebuildGridHeaderHtml();
  };


} //end widget

