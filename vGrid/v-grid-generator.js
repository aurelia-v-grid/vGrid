/*****************************************************************************************************************
 *    vGridGenerator
 *    This generates all html and handles the scrolling, row clicks etc
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
var vGridGenerator = function (defaultConfig, Mustache, element, parentCtx, SimpleGridSortable) {
  "use strict";

  var thisGrid = this;

  /*************************************************************************************
   * internal vars/setter
   *************************************************************************************/
  var _private = {};
  var setConfig = function (options) {
    _private = {
      node: element, //internal
      headerHeight: options.headerHeight || 0,                              //sets height of header
      rowHeight: options.rowHeight || 50,                                   //sets height of row
      footerHeight: options.footerHeight || 0,                              //sets height of footer
      dataScrollDelay: options.dataScrollDelay || 200,                      //delay when doing large scroll before updating
      headerArray: options.headerArray || [],                               // header labels
      attributeArray: options.attributeArray || [],                         // attributes for cell and headers
      columnWidthArray: options.columnWidthArray || [],                     // width of all columns
      colStyleArray : options.colStyleArray || [],                          // text that will be put in column style tag
      isSortableHeader: options.isSortableHeader || false,                  //adds sortable headers
      sortOnHeaderClick: options.sortOnHeaderClick || false,                //enable sort event on header click
      isResizableHeaders: options.isResizableHeaders || false,              //adds resizable headers
      requestAnimationFrame: options.requestAnimationFrame || true,         //if you want it to request animation frame
      internalDragDropCount: 10,                                            //internal count for index of header column, this can maybe be deleted after rebuild
      resizableHeadersAndRows: options.resizableHeadersAndRows || true,     //adds resizable columns to rows, if isResizableHeaders is enabled, this will not be that smooth
      isMultiSelect: options.isMultiSelect,                                 // if multiselect, undefined = none, false = 1, true = multi
      renderOnScrollbarScroll: options.renderOnScrollbarScroll || true,     //will not wait on scrollbars scrolls
      columnWidthArrayOverride: options.columnWidthArrayOverride || false,  //will set row to 100% and dont care about columns array
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
        addFilter: options.addFilter || false,            // will add filter if true
        doNotAddFilterTo: options.doNotAddFilterTo || [], //array, attributes will not get filter
        filterOnKey: options.filterOnKey || false,        //will send back filter on keyup or just blur if false
        filterOnAtTop: options.filterOnAtTop || false,     //filter above headers labels or under
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
  var setSelectionType = function () {
    _private.$selectedRows = [];
    _private.selectionMode = "none";

    //what type is it?
    if (_private.isMultiSelect === false) {
      _private.selectionMode = "single"
    }
    if (_private.isMultiSelect === true) {
      _private.selectionMode = "multible"
    }

    _private.selection.isSelected = function (row) {
      var result = false;
      if (_private.$selectedRows.indexOf(row) !== -1) {
        result = true;
      }
      return result;
    };

    _private.selection.select = function (rowSelect, addToSelection) {
      switch (_private.selectionMode) {
        case "none":
        case null:
        case undefined:
          break;
        case "single":
          if (_private.$selectedRows !== undefined) {
            if (_private.$selectedRows.length > 1) {
              _private.$selectedRows = [];
            }
          }
          _private.$selectedRows[0] = rowSelect;
          break;
        case "multible":
          if (!addToSelection) {
            _private.$selectedRows = [];
            _private.$selectedRows[0] = rowSelect
          } else {
            if (!_private.selection.isSelected(rowSelect)) {
              _private.$selectedRows.push(rowSelect)
            }
          }
      }
    };

    _private.selection.selectRange = function (start, end) {
      if (_private.selectionMode === "multible") {
        _private.$selectedRows = [];
        for (var i = start; i < end + 1; i++) {
          _private.$selectedRows.push(i)
        }
      }


    };

    _private.selection.reset = function () {
      _private.$selectedRows = [];
    };

    _private.selection.getSelectedRows = function () {
      return _private.$selectedRows;
    };

    _private.selection.setSelectedRows = function (newRows) {
      _private.$selectedRows = newRows;
    };

    thisGrid.selection = _private.selection;

  };





  /****************************************************************************************************************************
   * fills data into row
   ****************************************************************************************************************************/
  var fillDataInRows = function (clearAllRows) {
    for (var i = 0; i < getRowCacheLength(); i++) {
      var currentRow = _private.htmlCache.rowsArray[i].top / _private.rowHeight;
      var row = _private.htmlCache.rowsArray[i];
      if (clearAllRows) {
        row.div.removeChild(row.div.firstChild);
      }
      insertRowMarkup(currentRow, row.div, true, true);
    }
  };





  /****************************************************************************************************************************
   * builds correct sort icon markup
   ****************************************************************************************************************************/
  var getSortIcon = function (attribute) {
    var result;
    if(_private.sortOnHeaderClick){
      var main = '<span class=""><span class="' + _private.css.sortIcon + ' ' + _private.css.sortIconSort + '"></span></span>';
      if (_private.sortOrder.length === 0) {
        result = main
      } else {
        _private.sortOrder.forEach(function (x) {
          if (x.attribute === attribute) {
            var asc = x.asc === true ? '<span class="' + _private.css.sortIcon + ' ' + _private.css.sortIconAsc + '"></span>' : '<span class="' + _private.css.sortIcon + ' ' + _private.css.sortIconDesc + '"></span>';
            var main = '<span class="' + _private.css.sortIcon + ' ' + _private.css.sortIconNo + x.no + '">';
            var end = '</span>';
            result = main + end + asc;
          }
        });
      }
      if (!result) {
        result = main;
      }
    } else{
      result = "";
    }
    return result
  };





  /****************************************************************************************************************************
   * fills data into row
   ****************************************************************************************************************************/
  var fillDataIntoRow = function (rowno, clearRow) {
    for (var i = 0; i < getRowCacheLength(); i++) {
      var currentRow = _private.htmlCache.rowsArray[i].top / _private.rowHeight;
      if (rowno === currentRow) {
        var row = _private.htmlCache.rowsArray[i];
        if (clearRow) {
          row.div.removeChild(row.div.firstChild);
        }
        insertRowMarkup(currentRow, row.div, true, true);
      }
    }
  };





  /****************************************************************************************************************************
   * updates only selection on rows
   ****************************************************************************************************************************/
  var updateSelectionOnAllRows = function () {
    var i;
    for (i = 0; i < getRowCacheLength(); i++) {
      var currentRow = _private.htmlCache.rowsArray[i].top / _private.rowHeight;
      if (_private.selection.isSelected(currentRow)) {
        _private.htmlCache.rowsArray[i].div.classList.add(_private.css.rowSelected);
      } else {
        _private.htmlCache.rowsArray[i].div.classList.remove(_private.css.rowSelected);
      }
    }
  };





  /****************************************************************************************************************************
   * returns header template
   ****************************************************************************************************************************/
  var getHeaderTemplate = function (headerNamesArray, attributeNamesArray) {
    var rowTemplate = "";
    var css = _private.css.dragHandle + ' ' + _private.css.cellContent + ' ' + _private.css.orderHandle;
    for (var i = 0; i < headerNamesArray.length; i++) {
      var sortIcon = getSortIcon(attributeNamesArray[i])
      rowTemplate = rowTemplate + '<div><div class="' + css + '" ' + _private.atts.dataAttribute + '="' + attributeNamesArray[i] + '">' + headerNamesArray[i] + sortIcon + '</div></div>';
    }
    return rowTemplate;
  };





  /****************************************************************************************************************************
   * returns rowTemplate
   ****************************************************************************************************************************/
  var getRowTemplate = function (attributeNamesArray) {
    var rowTemplate = "";
    //var styletag = "background-color:{{custom.backgroundcolor}}"; //why is this here?
    if (_private.htmlCache.rowTemplate !== null) {
      rowTemplate = _private.htmlCache.rowTemplate;
    } else {
      //todo: check of option is set and callback instead of creating it.
      if (_private.configFunctions.onRowMarkupCreate) {
        rowTemplate = _private.configFunctions.onRowMarkupCreate(attributeNamesArray);
      } else {
        for (var i = 0; i < attributeNamesArray.length; i++) {
          rowTemplate = rowTemplate + '<div><div class="' + _private.css.cellContent + '" style="'+_private.colStyleArray[i]+' " ' + _private.atts.dataAttribute + '="' + attributeNamesArray[i] + '">{{' + attributeNamesArray[i] + '}}</div></div>';
        }
      }
    }
    return rowTemplate;
  };





  /****************************************************************************************************************************
   * mustache cache.... no idea if this helps really, but lets use it...
   ****************************************************************************************************************************/
  var cacheRowTemplate = function (template) {
    var stringTemplate = template || getRowTemplate(_private.attributeArray);
    Mustache.parse(stringTemplate);
    _private.htmlCache.rowTemplate = stringTemplate;
  };





  /****************************************************************************************************************************
   * get total column width
   ****************************************************************************************************************************/
  var getTotalColumnWidth = function () {
    var total = 0;
    for (var i = 0; i < _private.attributeArray.length; i++) {
      total = total + parseInt(_private.columnWidthArray[i], 10);
    }
    return total;
  };





  /****************************************************************************************************************************
   * create header template to header div
   ****************************************************************************************************************************/
  var createHeaderMarkup = function () {
    var tempColumns = document.createElement("DIV");
    tempColumns.innerHTML = getHeaderTemplate(_private.headerArray, _private.attributeArray);
    var i;
    for (i = 0; i < tempColumns.children.length; i++) {
      tempColumns.children[i].setAttribute("column-no", i);
      tempColumns.children[i].style.height = "100%";
      tempColumns.children[i].style.width = _private.columnWidthArray[i] + "px";
      tempColumns.children[i].classList.add(_private.css.rowHeaderCell);
      tempColumns.children[i].classList.add(_private.css.rowHeaderColumn + i);
      tempColumns.children[i].classList.add(_private.css.gridColumn + i);
    }

    //rowCell
    var row = document.createElement("DIV");
    row.className = _private.css.row + " " + _private.css.rowHeader;
    row.style.top = top + "px";
    row.style.height = _private.headerHeight + "px";
    row.style.width = getTotalColumnWidth() + "px";
    row.innerHTML = tempColumns.innerHTML;

    var container = document.createElement("DIV");
    container.className = _private.css.rowContainer;
    container.appendChild(row);

    return container;
  };





  /****************************************************************************************************************************
   * returns row with data from template
   ****************************************************************************************************************************/
  var createRowMarkup = function (entity, attributeNames) {
    var tempColumns = document.createElement("DIV");
    tempColumns.innerHTML = Mustache.render(getRowTemplate(attributeNames), entity); //, attributeNames);

    //check if user want to override this TODO: test what this will break
    if (!_private.columnWidthArrayOverride) {
      var i;
      for (i = 0; i < tempColumns.children.length; i++) {
        tempColumns.children[i].style.height = "100%";
        tempColumns.children[i].style.width = _private.columnWidthArray[i] + "px";
        tempColumns.children[i].classList.add(_private.css.rowCell);
        tempColumns.children[i].classList.add(_private.css.rowColumn + i);
        tempColumns.children[i].classList.add(_private.css.gridColumn + i);
        if (_private.lockedColumns > i) {
          tempColumns.children[i].style.left = _private.scrollVars.lastScrollLeft + "px";
          tempColumns.children[i].style.zIndex = _private.internalDragDropCount;
          tempColumns.children[i].style.position = "relative";
        }
      }
    }
    return tempColumns.innerHTML;
  };





  /****************************************************************************************************************************
   * sets row to empty
   ****************************************************************************************************************************/
  var setEmptyTemplate = function () {
    return "";
  };





  /****************************************************************************************************************************
   * gets the row cache length...
   ****************************************************************************************************************************/
  var getRowCacheLength = function () {
    return _private.htmlCache.rowsArray.length;
  };





  /****************************************************************************************************************************
   * set top value, here I could have failback to TOP instead of translate 3d
   ****************************************************************************************************************************/
  var setRowTopValue = function (rowArray, elementNo, topValue) {
    rowArray[elementNo].div.style.transform = "translate3d(0px, " + topValue + "px, 0px)";
    rowArray[elementNo].top = topValue;
  };





  /****************************************************************************************************************************
   * gets the main div to create grid in
   ****************************************************************************************************************************/
  var createGridHtmlWrapper = function () {
    var x = document.createElement("DIV"); //create this a container for my 3 rows
    _private.node.appendChild(x);
    _private.htmlCache.grid = x;
    //_private.htmlCache.grid = _private.node;
    //do this for I know very little about css, and doing it like this I didnt get those weird side effects
    //todo look at this again, do not like what Ive done here
    _private.htmlCache.grid.className = _private.css.wrapper;
    // _private.htmlCache.grid.style.margin = _private.node.style.margin;
    // _private.htmlCache.grid.style["margin-top"] = _private.node.style["margin-top"];
    // _private.htmlCache.grid.style["margin-left"] = _private.node.style["margin-left"];
    // _private.htmlCache.grid.style["margin-right"] = _private.node.style["margin-right"];
    // _private.htmlCache.grid.style["margin-bottom"] = _private.node.style["margin-bottom"];
    _private.htmlCache.grid.style.position = "relative"//_private.node.style.position;
    /*_private.htmlCache.grid.style.left = _private.node.style.left;
    _private.htmlCache.grid.style.right = _private.node.style.right;
    _private.htmlCache.grid.style.top = _private.node.style.top;
    _private.htmlCache.grid.style.bottom = _private.node.style.bottom;*/
    _private.htmlCache.grid.style.height = _private.node.style.height || "100%";//;
    _private.htmlCache.grid.style.width = _private.node.style.width || "100%";//;

    //get default height and width
    _private.gridHeight = _private.htmlCache.grid.clientHeight;
    _private.gridWidght = _private.htmlCache.grid.clientWidth;

  };





  /****************************************************************************************************************************
   * add header div
   ****************************************************************************************************************************/
  var createGridHtmlHeaderWrapper = function () {
    //create and append header div
    _private.htmlCache.header = document.createElement("DIV");
    _private.htmlCache.header.className = _private.css.mainHeader;
    _private.htmlCache.header.style.height = _private.headerHeight + "px";
    _private.htmlCache.grid.appendChild(_private.htmlCache.header);
    //get header template
    var headerDivs = createHeaderMarkup(_private.htmlCache.header);
    if (_private.queryHelper.addFilter) {
      var headerCells = headerDivs.lastElementChild.children;
      for (var i = 0; i < headerCells.length; i++) {
        addFilterToHeaderCell({
          attributeName: _private.attributeArray[i],
          headerName: _private.headerArray[i],
          defaultFilter: _private.queryHelper.filterArray[i],
          div: headerCells[i]
        })
      }
    }
    _private.htmlCache.header.appendChild(headerDivs);

  };





  /****************************************************************************************************************************
   * rebuild header div, needed if user sets new columns or something
   ****************************************************************************************************************************/
  var rebuildGridHeaderHtml = function () {
    //get current scrollleft, so we can set it again after.
    var getScrollLeft = _private.htmlCache.header.firstChild.firstChild.style.left;
    _private.htmlCache.header.removeChild(_private.htmlCache.header.firstChild);

    //get header template
    var headerDivs = createHeaderMarkup(_private.htmlCache.header);
    if (_private.queryHelper.addFilter) {
      var headerCells = headerDivs.lastElementChild.children;
      for (var i = 0; i < headerCells.length; i++) {
        addFilterToHeaderCell({
          attributeName: _private.attributeArray[i],
          headerName: _private.headerArray[i],
          defaultFilter: _private.queryHelper.filterArray[i],
          div: headerCells[i]
        })
      }
    }
    _private.htmlCache.header.appendChild(headerDivs);
    addResizableAndSortableEvent();

    //get back last scrollleft
    _private.htmlCache.header.firstChild.firstChild.style.left = getScrollLeft;
  };





  /****************************************************************************************************************************
   * add content div
   ****************************************************************************************************************************/
  var createGridHtmlContentWrapper = function () {
    //calculate content height
    var gridWrapperHeight = _private.gridHeight;
    var headerAndFooterHeight = _private.headerHeight + _private.footerHeight;
    _private.contentHeight = gridWrapperHeight - headerAndFooterHeight;

    //create and append content div
    _private.htmlCache.content = document.createElement("DIV");
    _private.htmlCache.content.className = _private.css.mainContent;
    _private.htmlCache.content.style.height = _private.contentHeight + "px";
    _private.htmlCache.grid.appendChild(_private.htmlCache.content);
  };





  /****************************************************************************************************************************
   * adds the footer
   ****************************************************************************************************************************/
  var createGridHtmlFooterWrapper = function () {
    //create and append
    _private.htmlCache.footer = document.createElement("DIV");
    _private.htmlCache.footer.className = _private.css.mainFooter;
    _private.htmlCache.footer.style.height = _private.footerHeight + "px";
    _private.htmlCache.grid.appendChild(_private.htmlCache.footer);
  };





  /****************************************************************************************************************************
   * sets scroll body to interal variable
   ****************************************************************************************************************************/
  var setScrollBodyHeightToVar = function () {
    var collectionLength = _private.configFunctions.getCollectionLength();
    _private.scrollBodyHeight = collectionLength * _private.rowHeight;
  };





  /****************************************************************************************************************************
   * add the scroll body
   ****************************************************************************************************************************/
  var createGridHtmlScrollBodyWrapper = function () {
    setScrollBodyHeightToVar();
    //create and append
    _private.htmlCache.scrollBody = document.createElement("DIV");
    _private.htmlCache.scrollBody.className = _private.css.scrollBody;
    _private.htmlCache.scrollBody.style.height = _private.scrollBodyHeight + "px";
    _private.htmlCache.scrollBody.style.width = getTotalColumnWidth() + "px";
    _private.htmlCache.content.appendChild(_private.htmlCache.scrollBody);
  };





  /****************************************************************************************************************************
   * add the scroll body, this is needed when user chnages columns or resize the columns, so main content knows if scrollbars is needed
   ****************************************************************************************************************************/
  var correctRowAndScrollbodyWidth = function () {
    _private.htmlCache.scrollBody.style.width = getTotalColumnWidth() + "px";
    for (var i = 0; i < _private.htmlCache.rowsArray.length; i++) {
      _private.htmlCache.rowsArray[i].div.style.width = getTotalColumnWidth() + "px";
    }
    _private.htmlCache.header.firstChild.firstChild.style.width = getTotalColumnWidth() + "px";
  };





  /****************************************************************************************************************************
   *
   ****************************************************************************************************************************/
  var correctHeaderAndScrollbodyWidth = function () {
    _private.htmlCache.scrollBody.style.width = getTotalColumnWidth() + "px";
    _private.htmlCache.header.firstChild.firstChild.style.width = getTotalColumnWidth() + "px";
  };





  /****************************************************************************************************************************
   * add the rows to scroll div
   ****************************************************************************************************************************/
  var createGridHtmlRowWrapper = function () {
    //rows we need to fill up visible container
    var minimumRowsNeeded = (parseInt(_private.contentHeight / _private.rowHeight, 10)) * 2;

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
      row.className = _private.css.row;

      //add alt/even css
      if (i % 2 === 1) {
        row.classList.add(_private.css.rowAlt);
      } else {
        row.classList.add(_private.css.rowEven);
      }

      row.style.height = _private.rowHeight + "px";

      setRowTopValue([{
        div: row,
        top: 0
      }], 0, top);

      row.style.minWidth = _private.htmlCache.grid.offsetWidth + "px";
      row.style.width = getTotalColumnWidth() + "px";

      //inner magic
      row.innerHTML = setEmptyTemplate();

      //add to scroll body
      _private.htmlCache.scrollBody.appendChild(row);

      //push into our html cache for later use when scrolling
      //own for top so we get it faster
      _private.htmlCache.rowsArray.push({
        div: row,
        top: top
      });
      //set new top for next row
      top = top + _private.rowHeight;
    }
  };





  /****************************************************************************************************************************
   * calls user for element, user haveto use callback here, might also need to fetch data first..
   ****************************************************************************************************************************/
  var insertRowMarkup = function (rowNo, rowHtmlElement, isDownScroll, isLargeScroll) {
    //called when drawing row
    //lets ask for our data, and insert it into row
    _private.configFunctions.getDataElement(rowNo, isDownScroll, isLargeScroll,
      function (entity) {
        //create container
        var container = document.createElement("DIV");
        container.className = _private.css.rowContainer;

        //if they want to override we set row to 100%, also this might break TODO: test more
        if (_private.columnWidthArrayOverride) {
          container.style.width = "100%"
        }

        //create markup
        var innerHtml = "";
        if (entity) {
          innerHtml = createRowMarkup(entity, _private.attributeArray)
        }
        if (!entity) {
          rowHtmlElement.classList.add(_private.css.noData)
        } else {
          rowHtmlElement.classList.remove(_private.css.noData)
        }

        //add alt/even css
        if (rowNo % 2 === 1) {
          if (rowHtmlElement.classList.contains(_private.css.rowEven)) {
            rowHtmlElement.classList.remove(_private.css.rowEven);
            rowHtmlElement.classList.add(_private.css.rowAlt);
          }

        } else {
          if (rowHtmlElement.classList.contains(_private.css.rowAlt)) {
            rowHtmlElement.classList.remove(_private.css.rowAlt);
            rowHtmlElement.classList.add(_private.css.rowEven);
          }
        }

        //set highlight
        try {
          if (_private.selection.isSelected(rowNo)) {
            rowHtmlElement.classList.add(_private.css.rowSelected)
          } else {
            rowHtmlElement.classList.remove(_private.css.rowSelected)
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
        if (_private.configFunctions.onCellDraw) {
          var rowCells = rowHtmlElement.lastElementChild.children;
          for (var i = 0; i < rowCells.length; i++) {
            _private.configFunctions.onCellDraw({
              attributeName: _private.attributeArray[i],
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
  var editCellhelper = function (e, readOnly, callback) {

    try {
      var clicked = false;
      var myElement = e.target;
      if (myElement.className === _private.css.cellContent) {
        _private.disableRowClick = true;
        var attributeName = myElement.getAttribute(_private.atts.dataAttribute);
        var oldValue = myElement.innerHTML;

        myElement.setAttribute("contenteditable", "true");
        myElement.classList.add(_private.css.editCell);

        //setback value
        myElement.onblur = function () {

          myElement.setAttribute("contenteditable", "false");
          myElement.classList.remove(_private.css.editCell);
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
            _private.disableRowClick = false;
          } else {
            //myElement.innerHTML = oldValue;
            _private.disableRowClick = false;
          }
        };

        var ctrlDown = false;
        var ctrlKey = 17,
          vKey = 86,
          cKey = 67;

        myElement.onkeyup = function (ex) {
          if (ex.keyCode == ctrlKey) {
            ctrlDown = false;
          }
        };

        myElement.onkeydown = function (e) {
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
      _private.disableRowClick = false;
      console.log("something went wrong in cell editing"); //this is mostly helper function during development, should be disabled in production
    }

  };





  /****************************************************************************************************************************
   *    helper to add filter to header
   ****************************************************************************************************************************/
  var addFilterToHeaderCell = function (event) {

    //internal vars
    var triggerRan = false;

    //get attibute
    var attributeName = event.attributeName;
    var headerName = event.headerName;
    var defaultFilter = event.defaultFilter;


    /*------------------------------------------------*/
    //called when chang event fires in filter input
    var onChangeEventOnFilter = function (e) {

      //to keep the onkeyup not to trigger while we do query
      triggerRan = true;
      setTimeout(function () {
        triggerRan = false;
      }, 300);

      //get inputs
      var queryHtmlInput = _private.node.querySelectorAll("." + _private.css.filterHandle);


      //loop all the headers
      var queryParams = [];
      for (var i = 0; i < queryHtmlInput.length; i++) {
        //current datasource attribute

        //do value exist and is not blank?
        if (queryHtmlInput[i].value !== "" && queryHtmlInput[i].value !== undefined) {
          var dataSourceAttribute = queryHtmlInput[i].getAttribute(_private.atts.dataAttribute);
          var operator = _private.queryHelper.filterArray[_private.attributeArray.indexOf(dataSourceAttribute)];


          //set in & if we are not of first row
          var value = queryHtmlInput[i].value;
          //push into array that we send back after
          queryParams.push({
            attribute: dataSourceAttribute,
            value: value,
            operator: operator
          });
          //This is something I need for later if I add sortable columns.. and callback on each column on build
          _private.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value;
        } else {

          if (queryHtmlInput[i].value === "") {
            var dataSourceAttribute = queryHtmlInput[i].getAttribute(_private.atts.dataAttribute);
            _private.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value = "";
          }

        }


      }
      _private.configFunctions.onFilterRun(queryParams)
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
    var getHeaderCellMarkup = function (labelTopCell, valueInput, attribute) {

      var cssLabel = _private.css.cellContent + " " + _private.css.filterLabelBottom + " " + _private.css.dragHandle + " " + _private.css.orderHandle;
      var cssInput = _private.css.cellContent + " " + _private.css.filterInputBottom + " " + _private.css.filterHandle;
      if (_private.queryHelper.filterOnAtTop) {
        cssLabel = _private.css.cellContent + " " + _private.css.filterLabelTop + " " + _private.css.dragHandle + " " + _private.css.orderHandle
        cssInput = _private.css.cellContent + " " + _private.css.filterInputTop + " " + _private.css.filterHandle;
      }

      //get sort icon
      var sortIcon = getSortIcon(attribute);

      //get filter name
      var filter = _private.queryHelper.filterArray[_private.attributeArray.indexOf(attribute)] || "filter";
      var filterName = _private.configFunctions.getFilterName(filter);

      //markup--
      var cellLabel = '<div class="' + cssLabel + '"  '+_private.atts.dataAttribute+'= "' + attribute + '">' + labelTopCell + sortIcon + '</div>';
      var cellInput = '<input placeholder="' + filterName + '" class="' + cssInput + '"  '+_private.atts.dataAttribute+'= "' + attribute + '" value="' + valueInput + '"/>';

      //if its in the the array then we want empty block, else it will look like shit if filters are at top
      if (_private.queryHelper.doNotAddFilterTo.indexOf(attribute) !== -1) {
        cellInput = '<div class="' + cssLabel + '"  '+_private.atts.dataAttribute+'= "' + attribute + '"></div>';
      }

      //check where to set the filter..
      var result;
      if (_private.queryHelper.filterOnAtTop) {
        result = cellInput + cellLabel;
      } else {
        result = cellLabel + cellInput;
      }
      return result;

    };

    var value = "";

    //21.02.2015:need this because I want it to remeber input if user reorder/sort headers....use order by that I havent made yet
    if (_private.queryStringCheck[attributeName] !== undefined) {
      value = _private.queryStringCheck[attributeName];
    }

    //set new div
    event.div.innerHTML = getHeaderCellMarkup(headerName, value, attributeName);
    //set event type to use, onchange is the best one to use...
    var cellInputElement = event.div.querySelectorAll("." + _private.css.filterHandle);
    if (_private.queryHelper.filterOnKey !== true) {
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
  var onNormalScrollingLarge = function (isDownScroll, currentScrollTop) {
    //check is user have preformed big scroll, but want it to keep rows inline
    //fix firefox messing up whn reseting scrolbar to 0, this is not issue in chrome and edge
    if (_private.htmlCache.content.scrollTop === 0 && _private.scrollVars.lastScrollTop !== _private.htmlCache.content.scrollTop) {
      _private.scrollVars.lastScrollTop = 0;
    }
    var currentRow = parseInt(_private.scrollVars.lastScrollTop / _private.rowHeight, 10);
    _private.scrollVars.firstTop = currentRow * _private.rowHeight; //need this for later
    var currentRowTop = _private.rowHeight * currentRow;
    var bottomHitCount;
    for (var i = 0; i < getRowCacheLength(); i++) {


      /*------------------------------------------------*/
      //move row
      var setNewTopOnRow = function (cacheRowNumber) {
        var row = _private.htmlCache.rowsArray[cacheRowNumber];
        setRowTopValue([row], 0, currentRowTop);
        row.div.removeChild(row.div.firstChild);
        currentRowTop = currentRowTop + _private.rowHeight;
      };

      if (currentRow >= 0 && currentRow <= _private.configFunctions.getCollectionLength() - 1) {
        setNewTopOnRow(i);
      }

      //need to adjust my array, so upward scroll do not get weird ofter hitting bottom
      if (currentRow === _private.configFunctions.getCollectionLength() - 1 && getRowCacheLength() < _private.configFunctions.getCollectionLength() - 1) {
        bottomHitCount = i;
      }

      if (currentRow > _private.configFunctions.getCollectionLength() - 1) {
        setNewTopOnRow(i);
      }

      currentRow++;
    }

    //if I hit bottom, then I need to adjust the rowsArray.... code under fixes this.
    //what it does it take the rows that did not get moved and sets it before the other ones
    if (bottomHitCount) {
      var firstTop = parseInt(_private.htmlCache.rowsArray[0].top, 10);
      for (i = getRowCacheLength() - 1; i > bottomHitCount; i--) {
        var row = _private.htmlCache.rowsArray[i];
        firstTop = firstTop - _private.rowHeight;
        setRowTopValue(_private.htmlCache.rowsArray, i, firstTop);
        try {
          row.div.removeChild(row.div.firstChild);
        } catch (e) {
          //we might get a issue here where there is not any children..
        }
      }
    }

    //I now sort the array again.
    _private.htmlCache.rowsArray.sort(
      function (a, b) {
        return parseInt(a.top) - parseInt(b.top)
      });

    fillDataInRows();
  };





  /****************************************************************************************************************************
   * add the rows to scroll div
   ****************************************************************************************************************************/
  var onNormalScrolling = function (isDownScroll, currentScrollTop) {
    //check is user have preformed big scroll
    var currentScrollTop = _private.htmlCache.content.scrollTop;
    if (_private.scrollVars.halt === false) {
      var newTopValue;
      var currentRow = parseInt((_private.scrollVars.lastScrollTop / _private.rowHeight), 10);
      _private.scrollVars.firstTop = currentRow * _private.rowHeight;
      for (var i = 0; i < getRowCacheLength(); i++) {
        var row = _private.htmlCache.rowsArray[i];
        var rowTop = parseInt(row.top, 10);
        var update = false;
        if (isDownScroll) {
          //scrolling downwards
          //check row position
          if (rowTop < (currentScrollTop - _private.rowHeight)) {
            update = true;
            newTopValue = rowTop + (_private.rowHeight * getRowCacheLength());
            currentRow = (rowTop + (_private.rowHeight * getRowCacheLength())) / _private.rowHeight;
          }
          if (rowTop > ((_private.configFunctions.getCollectionLength() - 1) * _private.rowHeight) && rowTop > parseInt(_private.htmlCache.content.style.height)) {
            setRowTopValue([row], 0, -5000 + i);
          }
        } else {
          //scrolling upwards
          //check row position
          if (rowTop > ((currentScrollTop + _private.contentHeight))) {
            update = true;
            newTopValue = rowTop - (_private.rowHeight * getRowCacheLength());
            currentRow = (rowTop - (_private.rowHeight * getRowCacheLength())) / _private.rowHeight;
          }
        }
        //update data
        if (update === true && currentRow >= 0 && currentRow <= _private.configFunctions.getCollectionLength() - 1) {
          //should I just get correct top value and draw it all after?
          setRowTopValue([row], 0, newTopValue);
          if (row.div.firstChild) {
            row.div.removeChild(row.div.firstChild);
          }
          insertRowMarkup(currentRow, row.div, isDownScroll, false);
        }
      }
      _private.htmlCache.rowsArray.sort(
        function (a, b) {
          return parseInt(a.top) - parseInt(b.top)
        });
    } else {
      //just in case user scrolls big then small, do not want to update before he stops
      //onScrollbarScrolling();
      onScrollbarScrolling()
    }

  };





  /****************************************************************************************************************************
   * helper, removes rows, se minus height so we cant scroll to empty
   ****************************************************************************************************************************/
  var hideRowsThatIsLargerThanCollection = function () {
    var currentRow = parseInt((_private.scrollVars.lastScrollTop / _private.rowHeight), 10);
    _private.scrollVars.firstTop = currentRow * _private.rowHeight;
    for (var i = 0; i < getRowCacheLength(); i++) {
      var row = _private.htmlCache.rowsArray[i];
      var rowTop = parseInt(row.top, 10);
      if (rowTop > ((_private.configFunctions.getCollectionLength() - 1) * _private.rowHeight) && rowTop > (parseInt(_private.htmlCache.content.style.height) - _private.rowHeight)) {
        setRowTopValue([row], 0, -5000 + i);
      }
    }

    _private.htmlCache.rowsArray.sort(
      function (a, b) {
        return parseInt(a.top) - parseInt(b.top)
      });
  };





  /****************************************************************************************************************************
   * on large scroll, or you have modified scroltop or similar, this can be used to correct issues and for just updating data
   ****************************************************************************************************************************/
  var onScrollbarScrolling = function () {
    //set halt var to true, so small scroll will be stopped, will be laggy else
    _private.scrollVars.halt = true;

    //clear scroll timeout
    clearTimeout(_private.scrollVars.timer);

    //set timeout, incase user is still scrolling
    _private.scrollVars.timer = setTimeout(function () {

      //fix firefox messing up whn reseting scrolbar to 0, this is not issue in chrome and edge
      if (_private.htmlCache.content.scrollTop === 0 && _private.scrollVars.lastScrollTop !== _private.htmlCache.content.scrollTop) {
        _private.scrollVars.lastScrollTop = 0;
      }

      var currentRow = parseInt(_private.scrollVars.lastScrollTop / _private.rowHeight, 10);
      _private.scrollVars.firstTop = currentRow * _private.rowHeight; //need this for later
      var currentRowTop = _private.rowHeight * currentRow;
      var bottomHitCount;
      for (var i = 0; i < getRowCacheLength(); i++) {


        /*------------------------------------------------*/
        //move row
        var setNewTopOnRow = function (cacheRowNumber) {
          var row = _private.htmlCache.rowsArray[cacheRowNumber];
          setRowTopValue([row], 0, currentRowTop);
          if (row.div.firstChild) {
            row.div.removeChild(row.div.firstChild);
          }

          currentRowTop = currentRowTop + _private.rowHeight;
        };

        if (currentRow >= 0 && currentRow <= _private.configFunctions.getCollectionLength() - 1) {
          setNewTopOnRow(i);
        }

        //need to adjust my array, so upward scroll do not get weird ofter hitting bottom
        if (currentRow === _private.configFunctions.getCollectionLength() - 1 && getRowCacheLength() < _private.configFunctions.getCollectionLength() - 1) {
          bottomHitCount = i;
        }

        if (currentRow > _private.configFunctions.getCollectionLength() - 1) {
          setNewTopOnRow(i);
        }

        currentRow++;
      }

      //if I hit bottom, then I need to adjust the rowsArray.... code under fixes this.
      //what it does it take the rows that did not get moved and sets it before the other ones
      if (bottomHitCount) {
        var firstTop = parseInt(_private.htmlCache.rowsArray[0].top, 10);
        for (i = getRowCacheLength() - 1; i > bottomHitCount; i--) {
          var row = _private.htmlCache.rowsArray[i];
          firstTop = firstTop - _private.rowHeight;
          setRowTopValue(_private.htmlCache.rowsArray, i, firstTop);
          if (row.div.firstChild) {
            row.div.removeChild(row.div.firstChild);
          }
        }
      }

      //I now sort the array again.
      _private.htmlCache.rowsArray.sort(
        function (a, b) {
          return parseInt(a.top) - parseInt(b.top)
        });

      fillDataInRows();
      _private.scrollVars.halt = false;
    }, _private.dataScrollDelay);


  };





  /****************************************************************************************************************************
   * clear touch inputs callback on scroll TODO: do I need this, grid was just a scroller at first... and was just for displaying data on mobile so had to do this..
   ****************************************************************************************************************************/

  var onScrollClickCancel = function () {
    //clear all touch events
    _private.scrollVars.clickTimersArray.forEach(function (xTimer) {
      clearTimeout(xTimer);
    });
    //timeout so we get touch end/move also after scroll event
    if (_private.scrollVars.clickTimersArray.length > 0) {
      setTimeout(function () {
        _private.scrollVars.clickTimersArray.forEach(function (xTimer) {
          clearTimeout(xTimer);
        });
      }, 0);
    }
  };





  /****************************************************************************************************************************
   * fixes scrolling / top of divs
   ****************************************************************************************************************************/
  var onScroll = function () {
    var doScroll = function () {
      var currentScrollTop = _private.htmlCache.content.scrollTop;
      var currentScrollLeft = _private.htmlCache.content.scrollLeft;

      //are we scrolling ?
      if (currentScrollTop !== _private.scrollVars.lastScrollTop) {
        //is vert scroll

        //stop left scroll...
        if (currentScrollLeft !== 0) {
          _private.htmlCache.content.scrollLeft = _private.scrollVars.lastScrollLeft;
          var header = _private.htmlCache.header.children[0].children[0];
          header.style.left = -_private.scrollVars.lastScrollLeft + "px";
        }

        //cancel touch event, do not want that triggering while scrolling  only use click in this grid, remove?
        onScrollClickCancel();

        //check if down scroll.
        var isDownScroll = true;
        if (currentScrollTop < _private.scrollVars.lastScrollTop) {
          isDownScroll = false;
        }

        //check if big scroll (split m into 2.. simple to read)
        var isLargeScroll;

        switch (true) {
          case currentScrollTop > _private.scrollVars.lastScrollTop + _private.largeScrollLimit:
          case currentScrollTop < _private.scrollVars.lastScrollTop - _private.largeScrollLimit:
            isLargeScroll = true;
            break;

          default:
            isLargeScroll = false;
        }

        //reset scroll top
        _private.scrollVars.lastScrollTop = currentScrollTop;

        //check if big scroll
        if (isLargeScroll) {
          //now user can set this, on very large collections this will drag preformance down
          if (_private.renderOnScrollbarScroll) {
            onNormalScrollingLarge(isDownScroll, currentScrollTop)
          } else {
            onScrollbarScrolling();
          }
        } else {
          onNormalScrolling(isDownScroll, currentScrollTop)
        }
      } else {

        if (_private.htmlCache.content.style.overflowX === "hidden") {
          //we do not want scrolls left if this is hidden..
          _private.htmlCache.content.scrollLeft = 0;
          _private.scrollVars.lastScrollLeft = 0;
          var header = _private.htmlCache.header.children[0].children[0];
          header.style.left = 0 + "px";
        } else {
          if (_private.scrollVars.lastScrollLeft !== currentScrollLeft) {
            currentScrollLeft = _private.htmlCache.content.scrollLeft;
            var header = _private.htmlCache.header.children[0].children[0];
            header.style.left = -currentScrollLeft + "px";
            _private.scrollVars.lastScrollLeft = currentScrollLeft;
          }
        }

        //is horz scroll
        if (_private.lockedColumns > 0) {
          //this have super bad performance in IE...
          currentScrollLeft = _private.htmlCache.content.scrollLeft; //need the updated one...
          for (var lockedColNo = _private.lockedColumns; lockedColNo--;) {


            var fixHeader = _private.node.querySelectorAll("." + _private.css.rowHeaderColumn + lockedColNo); //_private.correctionLockedColumnsArray[lockedColNo]);
            var fixRow = _private.node.querySelectorAll("." + _private.css.rowColumn + lockedColNo);
            //for(var i = 0; i < fix.length; i++){
            for (var i = fixHeader.length; i--;) {
              fixHeader[i].style.left = currentScrollLeft + "px";
              fixHeader[i].style.zIndex = _private.internalDragDropCount;
              fixHeader[i].style.position = "relative";
            }
            for (var i = fixRow.length; i--;) {
              fixRow[i].style.left = currentScrollLeft + "px";
              fixRow[i].style.zIndex = _private.internalDragDropCount;
              fixRow[i].style.position = "relative";
            }
          }
        }


      }
    };

    if (_private.requestAnimationFrame) {
      requestAnimationFrame(function () {
        doScroll();
      });
    } else {
      doScroll();
    }

  }; //end scroll event





  /****************************************************************************************************************************
   * used with click event to get row number of the one click on
   ****************************************************************************************************************************/
  var getRowNumberFromClickedOn = function (e) {
    var thisTop;
    var x = 10;
    var node = e.target;
    for (var i = 0; i < x; i++) {
      try {
        //21 march fix, will get bad result if I do it any other way
        if (node.classList.contains(_private.css.row)) {
          for (var y = 0; y < _private.htmlCache.rowsArray.length; y++) {
            if (node.style.transform === _private.htmlCache.rowsArray[y].div.style.transform) {
              thisTop = _private.htmlCache.rowsArray[y].top;
            }
          }
        }
        node = node.offsetParent;
      } catch (x) {
      }
    }

    var rowHeight = _private.rowHeight;
    var currentRow = Math.round(thisTop / rowHeight);
    return currentRow;
  };





  /****************************************************************************************************************************
   * fixes highlight and select...
   ****************************************************************************************************************************/
  var onRowClickAndHighligtHandler = function (e) {
    //_private.selectionVars.
    var isSel;

    function removeRowHighligt(currentRow) {
      var selectedRows, i;

      function removeFromArray(array, row) {
        array.splice(row, 1);
      }

      selectedRows = _private.selection.getSelectedRows();
      for (i = 0; i < selectedRows.length; i++) { //what? why aint I using indexOf? TODO:rewrite
        if (selectedRows[i] === currentRow) {
          removeFromArray(selectedRows, i);
          i--;
        }
      }
      _private.selection.setSelectedRows(selectedRows);
    }

    var currentRow = getRowNumberFromClickedOn(e);
    var currentselectedRows = _private.selection.getSelectedRows();

    if (currentRow !== _private.selectionVars.lastRowSelected | currentselectedRows[0] !== currentRow) {

      //if not same row clicked again..
      _private.selectionVars.onClicked = true;

      if (currentRow <= (_private.configFunctions.getCollectionLength() - 1)) { //do I need to check this?

        if (_private.isMultiSelect === true) { //if multiselect duh!

          var currentKeyKode = "";

          if (e.shiftKey) {
            currentKeyKode = "shift";
            currentselectedRows = _private.selection.getSelectedRows();
            if (currentselectedRows.length > 0 && _private.selectionVars.lastKeyKodeUsed === "none") {
              _private.selectionVars.lastRowSelected = currentselectedRows[0];
              _private.selectionVars.lastKeyKodeUsed = "shift";
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
              _private.selection.select(currentRow);
              break;
            case _private.selectionVars.lastKeyKodeUsed === "shift" && currentKeyKode === "ctrl":

              isSel = _private.selection.isSelected(currentRow);
              if (isSel === true) {
                removeRowHighligt(currentRow);
              } else {
                _private.selection.select(currentRow, true);
              }
              break;

            case _private.selectionVars.lastKeyKodeUsed === "ctrl" && currentKeyKode === "shift":

              _private.selection.selectRange(_private.selectionVars.lastRowSelected, currentRow);
              break;

            case _private.selectionVars.lastKeyKodeUsed === "ctrl" && currentKeyKode === "ctrl":

              isSel = _private.selection.isSelected(currentRow);
              if (isSel === true) {
                removeRowHighligt(currentRow);
              } else {
                _private.selection.select(currentRow, true);
              }
              break;

            case _private.selectionVars.lastKeyKodeUsed === "none" && currentKeyKode === "ctrl":

              isSel = _private.selection.isSelected(currentRow);
              if (isSel === true) {
                removeRowHighligt(currentRow);
              } else {
                _private.selection.select(currentRow, true);
              }
              break;

            case _private.selectionVars.lastKeyKodeUsed === "shift" && currentKeyKode === "shift":

              if (_private.selectionVars.lastRowSelected > currentRow) {
                _private.selection.selectRange(currentRow, _private.selectionVars.lastRowSelected);
              } else {
                _private.selection.selectRange(_private.selectionVars.lastRowSelected, currentRow);
              }
              break;

            case _private.selectionVars.lastKeyKodeUsed === "none" && currentKeyKode === "shift":

              if (_private.selectionVars.lastRowSelected !== null) {
                if (_private.selectionVars.lastRowSelected > currentRow) {
                  _private.selection.selectRange(currentRow, _private.selectionVars.lastRowSelected);
                } else {
                  _private.selection.selectRange(_private.selectionVars.lastRowSelected, currentRow);
                }
              } else {
                _private.selection.select(currentRow);
              }
              break;
            default:
              console.log("error, this should not happend")
          }
        } else {
          _private.selection.select(currentRow);
        }
        _private.selectionVars.lastKeyKodeUsed = currentKeyKode;

        //update selection on rows
        updateSelectionOnAllRows()
      }
    } else {
      //same row clicked again
      if (e.ctrlKey) {
        currentKeyKode = "ctrl";
      }

      //if ctrl button we wanto remove selection
      if (currentKeyKode === "ctrl") {
        _private.selectionVars.lastKeyKodeUsed = currentKeyKode;
        isSel = _private.selection.isSelected(currentRow);
        if (isSel === true) {
          removeRowHighligt(currentRow);
        }
        _private.selectionVars.lastRowSelected = -1
      } else {
        //else we just wanto make it current..
        isSel = _private.selection.isSelected(currentRow);
        _private.selection.select(currentRow);
      }
      //update selection on rows
      updateSelectionOnAllRows()
    }
  };





  /****************************************************************************************************************************
   * hiding scroll bars when not needed
   ****************************************************************************************************************************/
  var updateGridScrollbars = function () {

    var collectionHeight = _private.configFunctions.getCollectionLength() * _private.rowHeight;
    var bodyHeight = _private.htmlCache.content.offsetHeight;
    //_private.largeScrollLimit = bodyHeight; why was this here... leave it here incase there is something Im missing atm

    if (collectionHeight <= bodyHeight) {
      _private.htmlCache.content.scrollTop = 0;
      //_private.htmlCache.content.scrollLeft = 0;
      _private.htmlCache.content.style.overflow = "";
      _private.htmlCache.content.style.overflowY = "hidden";
      _private.htmlCache.content.style.overflowX = "hidden";

    } else {
      //  _private.htmlCache.content.scrollLeft = 0;
      _private.htmlCache.content.style.overflow = "";
      _private.htmlCache.content.style.overflowY = "scroll";
      _private.htmlCache.content.style.overflowX = "hidden";
    }

    if (_private.htmlCache.content.offsetWidth - 5 < getTotalColumnWidth()) {
      _private.htmlCache.content.style.overflowX = "scroll";
    }

  };





  /****************************************************************************************************************************
   * add the events  (TODO: when cleaning up code I need to splitt the stuff in here into more functions..)
   ****************************************************************************************************************************/
  var addResizableAndSortableEvent = function () {


    /*------------------------------------------------*/
    // adds resizable headers
    var resizable = false;
    var screenX;
    var xElement;
    var sortable = false;

    //todo, need to tell if we want sort on header click, and if we want multisort
    if(_private.sortOnHeaderClick){
      var orderByClick = function (event) {
        if (!sortable && !resizable) {
          _private.configFunctions.onOrderBy(event, function (sortorder) {
            _private.sortOrder = sortorder;
            rebuildGridHeaderHtml();
          })
        }
      };
    }


    //get inputs
    var orderBy = _private.node.querySelectorAll("." + _private.css.orderHandle);
    for (var i = 0; i < orderBy.length; i++) {
      orderBy[i].addEventListener("click", orderByClick, false);
    }


    if (_private.isResizableHeaders) {
      var x = _private.htmlCache.header.querySelectorAll("." + _private.css.rowHeaderCell);
      for (var i = 0; i < x.length; i++) {

        var temp = document.createElement("DIV");
        temp.classList.add(_private.css.resizeHeaderDragHandle);


        temp.onmousedown = function (e) {
          resizable = true;

          //disable sortable when resizing
          if (_private.isSortableHeader) {
            _private.sortableCtx.option("disabled", resizable);
          }
          screenX = e.screenX;
          xElement = this;
          var originalWidth = xElement.offsetParent.style.width;
          var originalWidthx = xElement.offsetParent.style.width;
          var index = xElement.offsetParent.getAttribute("column-no");
          //var index = _private.attributeArray.indexOf(attribute);


          _private.htmlCache.header.onmousemove = function (e) {


            //get when user let go of mouse button
            _private.htmlCache.header.onmouseup = function () {
              //small timeout to stop header click
              setTimeout(function () {
                resizable = false;
                if (_private.isSortableHeader) {
                  _private.sortableCtx.option("disabled", resizable);
                }
              }, 30);

              _private.htmlCache.header.onmouseleave = "";
              _private.htmlCache.header.onmousemove = "";
              _private.htmlCache.header.onmouseup = "";
              //enable sortable again if its enabled


              _private.columnWidthArray[index] = parseInt(xElement.offsetParent.style.width);

              //reset template and fill data
              _private.htmlCache.rowTemplate = null;
              correctRowAndScrollbodyWidth();

              cacheRowTemplate();
              updateGridScrollbars();
              fillDataInRows(true);
              //onScrollbarScrolling();
            };

            _private.htmlCache.header.onmouseleave = function (e) {
              _private.htmlCache.header.onmouseup(e);

            };

            if (resizable) {
              var newWidth = parseInt(originalWidth) - ((screenX - e.screenX)) + "px";
              _private.columnWidthArray[index] = parseInt(newWidth);
              xElement.offsetParent.style.width = parseInt(originalWidth) - ((screenX - e.screenX)) + "px";
              xElement.offsetParent.style.width = parseInt(originalWidthx) - ((screenX - e.screenX)) + "px";
              if (_private.resizableHeadersAndRows) {
                var columnsToFix = _private.htmlCache.content.firstChild.querySelectorAll("." + _private.css.rowColumn + index);

                for (var col = 0; col < columnsToFix.length; col++) {
                  columnsToFix[col].style.width = newWidth
                }

                correctRowAndScrollbodyWidth();
                updateGridScrollbars();

              }
            } else {
              correctHeaderAndScrollbodyWidth();
            }
          }
        };

        x[i].appendChild(temp)
      }
    }


    /*------------------------------------------------*/
    //adds sortable headers

    if (_private.isSortableHeader) {
      _private.sortableCtx = new SimpleGridSortable(_private.htmlCache.header.firstChild.firstChild, function (oldIndex, newIndex) {
        var children = _private.htmlCache.header.firstChild.firstChild.children;

        

        // for (var i = 0; i < children.length; i++) {
        //   var currentIndex = parseInt(children[i].getAttribute("column-no"));
        //   if (currentIndex !== i && oldIndex === null) {
        //     oldIndex = currentIndex;
        //     newIndex = i;
        //   }
        // }

        var x;
        x = _private.attributeArray[oldIndex];
        _private.attributeArray.splice(oldIndex, 1);
        _private.attributeArray.splice(newIndex, 0, x);

        x = _private.queryHelper.filterArray[oldIndex];
        _private.queryHelper.filterArray.splice(oldIndex, 1);
        _private.queryHelper.filterArray.splice(newIndex, 0, x);

        x = _private.headerArray[oldIndex];
        _private.headerArray.splice(oldIndex, 1);
        _private.headerArray.splice(newIndex, 0, x);

        x = _private.columnWidthArray[oldIndex];
        _private.columnWidthArray.splice(oldIndex, 1);
        _private.columnWidthArray.splice(newIndex, 0, x);

        x = _private.colStyleArray[oldIndex];
        _private.colStyleArray.splice(oldIndex, 1);
        _private.colStyleArray.splice(newIndex, 0, x);




        _private.htmlCache.rowTemplate = null; //reset template and fill data
        cacheRowTemplate();
        thisGrid.rebuildColumns();
        sortable = false;

      }, function (n) {
        console.log(n)
        //on end
        sortable = true;
      },function(n){
        //on cancel
        sortable = false;
      });
    }
  };





  /****************************************************************************************************************************
   * add the events  (TODO: when cleaning up code I need to splitt the stuff in here into more functions..)
   ****************************************************************************************************************************/
  var addEvents = function () {

    /*------------------------------------------------*/
    //normal click
    var handleClick = function (e) {
      var xTimer = setTimeout(function () {
          if (!_private.disableRowClick) {
            if (_private.isMultiSelect !== undefined) {
              onRowClickAndHighligtHandler(e);
            }
            var currentRow = getRowNumberFromClickedOn(e);
            _private.configFunctions.clickHandler(e, currentRow, null)
          }
        },
        200);
      _private.scrollVars.clickTimersArray.push(xTimer);
    };


    /*------------------------------------------------*/
    //doubleclick
    var handleDblClick = function (e) {
      onScrollClickCancel(); //clear singleclick so it does not fire twise,
      if (!_private.disableRowClick) {
        if (_private.isMultiSelect !== undefined) {
          onRowClickAndHighligtHandler(e);
        }
        var currentRow = getRowNumberFromClickedOn(e);
        _private.configFunctions.clickHandler(e, currentRow, editCellhelper)
      }

    };


    /*------------------------------------------------*/
    //right click
    var onMouseDownRow = function (e) {
      //e.preventDefault();
      if (e.button === 2) {
        if (!_private.disableRowClick) {
          var currentRow = getRowNumberFromClickedOn(e);
          _private.configFunctions.clickHandler(e, currentRow, null)
        }
      }

    };


    //add all click events to rows
    for (var i = 0; i < getRowCacheLength(); i++) {
      var div = _private.htmlCache.rowsArray[i].div;

      div.addEventListener("dblclick", handleDblClick, false); //single and doubleclick... this will end bad.., maybe use other key wih click to edit?
      div.addEventListener("click", handleClick, false);
      div.addEventListener("contextmenu", onMouseDownRow, false);
    }

    //this have to be after clcik since it will cancel if scroll event
    _private.htmlCache.content.addEventListener("scroll", onScroll);

    addResizableAndSortableEvent(); //this also includes the orderby click on header event

  };





  /****************************************************************************************************************************
   * correct columns witdth array, incase they have just defined the first 2, or none
   ****************************************************************************************************************************/
  var correctColumnsWidthArray = function () {
    var newColumnWidth = [];
    for (var i = 0; i < _private.attributeArray.length; i++) {
      var columnWidth = _private.columnWidthArray[i] || 100;
      newColumnWidth.push(columnWidth)
    }
    _private.columnWidthArray = newColumnWidth;
  };





  /****************************************************************************************************************************
   * sett large scroll limit, looks like *3 content height is a better match from lates testing
   ****************************************************************************************************************************/
  var setLargeScrollLimit = function () {
    if (!_private.largeScrollLimit) {
      _private.largeScrollLimit = _private.contentHeight * 3.3
      ;
    }
  };





  /****************************************************************************************************************************
   * add the html
   ****************************************************************************************************************************/
  var addHtml = function () {

    //cache row template..
    cacheRowTemplate();

    //add needed html
    createGridHtmlWrapper(); //entire main grid, pretty much just adds a class
    createGridHtmlHeaderWrapper(); //adds header
    createGridHtmlContentWrapper(); //adds content/viewport we see
    createGridHtmlFooterWrapper(); //adds footer
    createGridHtmlScrollBodyWrapper(); //adds the scroll height
    createGridHtmlRowWrapper(); //adds html rows needed ++

    //update the scrollbars, so they show only if needed
    //pretty much just hides/shows -> left/right scroll
    updateGridScrollbars();
  };


  /****************************************************************************************************************************
   * will create the actual grid (cant be constructor since I call this when rebuilding)
   ****************************************************************************************************************************/
  this.init = function (isRebuild) {
    correctColumnsWidthArray(); //less mess later when doing it this way
    addHtml(); //add html
    addEvents(); //add events
    fillDataInRows(); //fillDataInRows
    if (!isRebuild) {
      //todo: remeber scroll height , devide on rowheight, and set to what ever new is?
      setSelectionType();
    }
    setLargeScrollLimit();
  };





  /****************************************************************************************************************************
   * create the grid... kinda like its constructor..
   ****************************************************************************************************************************/
  setConfig(defaultConfig);
  this.init(false);





  /****************************************************************************************************************************
   * redraws most parts of grid...
   ****************************************************************************************************************************/
  var redrawGrid = function () {
    _private.node.getElementsByClassName(_private.css.wrapper)[0].remove();
    _private.htmlCache.rowsArray = [];
    _private.htmlCache.header = null;
    _private.htmlCache.content = null;
    _private.htmlCache.footer = null;
    _private.htmlCache.scrollBody = null;
    _private.htmlCache.rowTemplate = null;

    thisGrid.init(true);
    fixHeaderWithBody();
  };





  /****************************************************************************************************************************
   * fixes header body width
   ****************************************************************************************************************************/
  var fixHeaderWithBody = function () {
    var currentScrollLeft = _private.htmlCache.content.scrollLeft;
    var header = _private.htmlCache.header.children[0].children[0];
    header.style.left = -currentScrollLeft + "px";
    if (_private.lockedColumns > 0) { //todo in own function, its used a few places now
      //this have super bad performance in IE...
      currentScrollLeft = _private.htmlCache.content.scrollLeft; //need the updated one...
      for (var lockedColNo = _private.lockedColumns; lockedColNo--;) {
        var fix = _private.node.querySelectorAll("." + _private.css.gridColumn + lockedColNo);
        //for(var i = 0; i < fix.length; i++){
        for (var i = fix.length; i--;) {
          fix[i].style.left = currentScrollLeft + "px";
          fix[i].style.zIndex = _private.internalDragDropCount;
          fix[i].style.position = "relative";
        }
      }
    }
  };





  /****************************************************************************************************************************
   * rebuilds columns, used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  this.rebuildColumns = function () {
    correctColumnsWidthArray();
    _private.htmlCache.rowTemplate = null;
    cacheRowTemplate();
    rebuildGridHeaderHtml();
    fillDataInRows(true);
    correctRowAndScrollbodyWidth();
    updateSelectionOnAllRows();
    updateGridScrollbars();
    fixHeaderWithBody();
  };





  /****************************************************************************************************************************
   * rebuilds columns and trigger collection change in grid (rebuild rows), used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  this.columnChangeAndCollection = function (resetScrollToTop) {
    correctColumnsWidthArray();
    _private.htmlCache.rowTemplate = null;
    cacheRowTemplate();
    rebuildGridHeaderHtml();
    fillDataInRows(true);
    updateSelectionOnAllRows();
    thisGrid.collectionChange(resetScrollToTop);
  };





  /****************************************************************************************************************************
   * trigger collection change in grid (rebuild rows), used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  this.collectionChange = function (resetScrollToTop) {

    //adjust scroller before updating, so it created unwanted side effects
    setScrollBodyHeightToVar();
    _private.htmlCache.scrollBody.style.height = _private.scrollBodyHeight + "px";

    if (resetScrollToTop === true) {
      _private.htmlCache.content.scrollTop = 0;
    }
    if (_private.scrollBodyHeight < _private.htmlCache.content.scrollTop) {
      _private.htmlCache.content.scrollTop = _private.scrollBodyHeight - 100;
    }

    updateGridScrollbars();
    correctRowAndScrollbodyWidth();
    updateSelectionOnAllRows();
    fixHeaderWithBody();
    fillDataInRows(true);//always need to clear first, since onscrolbarscrolling is delayed
    onScrollbarScrolling();

  };





  /****************************************************************************************************************************
   * helper function to handle change of data..
   * 21.02.2015: TODO: I need to debug these, have not been testing much... need to build better demo first
   ****************************************************************************************************************************/

  //tested
  this.setRowHeight = function (newHeight) {
    _private.rowHeight = newHeight;
    redrawGrid();
  };

  //tested
  this.setHeaderHeight = function (newHeight) {
    _private.headerHeight = newHeight;
    redrawGrid();
  };

  //tested
  this.setFooterHeight = function (newHeight) {
    _private.footerHeight = newHeight;
    redrawGrid();
  };

  //tested
  this.disableHeaderFilter = function () {
    _private.queryHelper.addFilter = false;
    rebuildGridHeaderHtml();
  };

  //tested
  this.enableHeaderFilter = function () {
    _private.queryHelper.addFilter = true;
    rebuildGridHeaderHtml();
  };

  //tested
  this.setHeaderFilterAtBottom = function () {
    _private.queryHelper.filterOnAtTop = false;
    rebuildGridHeaderHtml();
  };

  //tested
  this.setHeaderFilterAtTop = function () {
    _private.queryHelper.filterOnAtTop = true;
    rebuildGridHeaderHtml();
  };

  //tested todo: this need to be changed now
  this.setColumns = function (paramObj) {
    _private.headerArray = paramObj.headerArray;
    _private.attributeArray = paramObj.attributeArray;
    _private.columnWidthArray = paramObj.columnWidthArray;
  };

  //tested, todo: this need to be changed now
  this.getColumns = function () {
    return {
      "headerArray": _private.headerArray,
      "attributeArray": _private.attributeArray,
      "columnWidthArray": _private.columnWidthArray
    }
  };

  //tested
  this.setLockedColumns = function (numberOfLockedColumns) {
    _private.lockedColumns = numberOfLockedColumns;
    thisGrid.rebuildColumns();

  };

  //tested
  this.enableResizableColumns = function (option) {
    _private.isResizableHeaders = true;
    _private.resizableHeadersAndRows = option;
    rebuildGridHeaderHtml();
  };

  //tested
  this.disableResizableColumns = function () {
    _private.isResizableHeaders = false;
    _private.resizableHeadersAndRows = false;
    rebuildGridHeaderHtml();

  };

  //tested
  this.enableSortableColumns = function () {
    _private.isSortableHeader = true;
    rebuildGridHeaderHtml();
  };


  //tested
  this.disableSortableColumns = function () {
    _private.isSortableHeader = false;
    rebuildGridHeaderHtml();
  };

  //tested
  this.setMultiSelection = function (keepSelection) {
    _private.isMultiSelect = true;
    _private.selectionMode = "multible";
    if (!keepSelection) {
      _private.$selectedRows = [];
    }
    updateSelectionOnAllRows();
  };

  //tested
  this.setSingleSelection = function (keepSelection) {
    _private.isMultiSelect = false;
    _private.selectionMode = "single";
    if (!keepSelection) {
      _private.$selectedRows = [];
    }
    updateSelectionOnAllRows();
  };

  //tested
  this.disableSelection = function (keepSelection) {
    _private.isMultiSelect = undefined;
    _private.selectionMode = "none";
    if (!keepSelection) {
      _private.$selectedRows = [];
    }
    updateSelectionOnAllRows();
  };

  //tested
  this.getSelectedRows = function () {
    return this.selection.getSelectedRows();
  };

  //tested
  this.setSelectedRows = function (sel) {
    this.selection.setSelectedRows(sel);
    updateSelectionOnAllRows();
  };

  //tested
  this.scrollBottom = function () {
    var collectionLength = _private.configFunctions.getCollectionLength();
    _private.htmlCache.content.scrollTop = collectionLength * _private.rowHeight;
  };

  //tested
  this.scrollTop = function () {
    _private.htmlCache.content.scrollTop = 0;
  };

  //tested
  this.setScrollTop = function (newTop) {
    _private.htmlCache.content.scrollTop = newTop;
  };

  //tested
  this.getScrollTop = function () {
    return _private.htmlCache.content.scrollTop;
  };

  this.updateRow = function (no, clear) {
    fillDataIntoRow(no, clear)
  };

  this.clearHeaderFilter = function () {
    _private.sortOrder = [];
    rebuildGridHeaderHtml();
  };

  this.setHeaderFilter = function (sortOrder) {
    _private.sortOrder = sortOrder;
    rebuildGridHeaderHtml();
  };

  //with these you can pretty much do what ever
  //TODO: get entire config object
  //TODO: set entire config object

}; //end widget


//helper to get it exported...for now
export function VGridGenerator() {
  return vGridGenerator;
}
