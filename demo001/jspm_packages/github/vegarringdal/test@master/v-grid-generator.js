/* */ 
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGridGenerator = VGridGenerator;

  var vGridGenerator = function vGridGenerator(defaultConfig, Mustache, element, parentCtx, SimpleGridSortable) {
    "use strict";

    var thisGrid = this;

    var _private = {};
    var setConfig = function setConfig(options) {
      _private = {
        node: element,
        headerHeight: options.headerHeight || 0,
        rowHeight: options.rowHeight || 50,
        footerHeight: options.footerHeight || 0,
        dataScrollDelay: options.dataScrollDelay || 200,
        headerArray: options.headerArray || [],
        attributeArray: options.attributeArray || [],
        columnWidthArray: options.columnWidthArray || [],
        colStyleArray: options.colStyleArray || [],
        isSortableHeader: options.isSortableHeader || false,
        sortOnHeaderClick: options.sortOnHeaderClick || false,
        isResizableHeaders: options.isResizableHeaders || false,
        requestAnimationFrame: options.requestAnimationFrame || true,
        internalDragDropCount: 10,
        resizableHeadersAndRows: options.resizableHeadersAndRows || true,
        isMultiSelect: options.isMultiSelect,
        renderOnScrollbarScroll: options.renderOnScrollbarScroll || true,
        columnWidthArrayOverride: options.columnWidthArrayOverride || false,
        selection: {},
        $selectedRows: [],
        lockedColumns: options.lockedColumns || 0,
        sortOrder: [],
        contentHeight: 0,
        gridHeight: 0,
        gridWidth: 0,
        queryStringCheck: {},
        disableRowClick: false,
        largeScrollLimit: options.largeScrollLimit,
        scrollBodyHeight: 0,
        htmlCache: {
          grid: null,
          header: null,
          content: null,
          footer: null,
          rowsArray: [],
          scrollBody: null,
          rowTemplate: null },
        queryHelper: {
          addFilter: options.addFilter || false,
          doNotAddFilterTo: options.doNotAddFilterTo || [],
          filterOnKey: options.filterOnKey || false,
          filterOnAtTop: options.filterOnAtTop || false,
          filterArray: options.filterArray || []
        },
        configFunctions: {
          getCollectionLength: options.getSourceLength || function () {
            return 0;
          },

          getDataElement: options.getDataElement || function () {
            return {};
          },

          clickHandler: options.clickHandler || function () {},

          onOrderBy: options.onOrderBy || function () {},

          onFilterRun: options.onFilterRun || function () {},
          getFilterName: options.getFilterName || function () {
            return "";
          },
          onCellDraw: options.onCellDraw,

          onRowMarkupCreate: options.onRowMarkupCreate
        },
        selectionVars: {
          lastKeyKodeUsed: "none",
          lastRowSelected: 0,
          onClicked: false },
        scrollVars: {
          lastScrollTop: 0,
          firstTop: 0,
          lastScrollLeft: 0,
          halt: false,
          timer: null,
          clickTimersArray: [] },
        atts: {
          dataAttribute: "v-grid-data-attribute",
          dataAttributeFilter: "v-grid-data-attribute-filter"
        },
        css: {
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

    var setSelectionType = function setSelectionType() {
      _private.$selectedRows = [];
      _private.selectionMode = "none";

      if (_private.isMultiSelect === false) {
        _private.selectionMode = "single";
      }
      if (_private.isMultiSelect === true) {
        _private.selectionMode = "multible";
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
              _private.$selectedRows[0] = rowSelect;
            } else {
              if (!_private.selection.isSelected(rowSelect)) {
                _private.$selectedRows.push(rowSelect);
              }
            }
        }
      };

      _private.selection.selectRange = function (start, end) {
        if (_private.selectionMode === "multible") {
          _private.$selectedRows = [];
          for (var i = start; i < end + 1; i++) {
            _private.$selectedRows.push(i);
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

    var fillDataInRows = function fillDataInRows(clearAllRows) {
      for (var i = 0; i < getRowCacheLength(); i++) {
        var currentRow = _private.htmlCache.rowsArray[i].top / _private.rowHeight;
        var row = _private.htmlCache.rowsArray[i];
        if (clearAllRows) {
          row.div.removeChild(row.div.firstChild);
        }
        insertRowMarkup(currentRow, row.div, true, true);
      }
    };

    var getSortIcon = function getSortIcon(attribute) {
      var result;
      if (_private.sortOnHeaderClick) {
        var main = '<span class=""><span class="' + _private.css.sortIcon + ' ' + _private.css.sortIconSort + '"></span></span>';
        if (_private.sortOrder.length === 0) {
          result = main;
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
      } else {
        result = "";
      }
      return result;
    };

    var fillDataIntoRow = function fillDataIntoRow(rowno, clearRow) {
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

    var updateSelectionOnAllRows = function updateSelectionOnAllRows() {
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

    var getHeaderTemplate = function getHeaderTemplate(headerNamesArray, attributeNamesArray) {
      var rowTemplate = "";
      var css = _private.css.dragHandle + ' ' + _private.css.cellContent + ' ' + _private.css.orderHandle;
      for (var i = 0; i < headerNamesArray.length; i++) {
        var sortIcon = getSortIcon(attributeNamesArray[i]);
        rowTemplate = rowTemplate + '<div><div class="' + css + '" ' + _private.atts.dataAttribute + '="' + attributeNamesArray[i] + '">' + headerNamesArray[i] + sortIcon + '</div></div>';
      }
      return rowTemplate;
    };

    var getRowTemplate = function getRowTemplate(attributeNamesArray) {
      var rowTemplate = "";

      if (_private.htmlCache.rowTemplate !== null) {
        rowTemplate = _private.htmlCache.rowTemplate;
      } else {
        if (_private.configFunctions.onRowMarkupCreate) {
          rowTemplate = _private.configFunctions.onRowMarkupCreate(attributeNamesArray);
        } else {
          for (var i = 0; i < attributeNamesArray.length; i++) {
            rowTemplate = rowTemplate + '<div><div class="' + _private.css.cellContent + '" style="' + _private.colStyleArray[i] + ' " ' + _private.atts.dataAttribute + '="' + attributeNamesArray[i] + '">{{' + attributeNamesArray[i] + '}}</div></div>';
          }
        }
      }
      return rowTemplate;
    };

    var cacheRowTemplate = function cacheRowTemplate(template) {
      var stringTemplate = template || getRowTemplate(_private.attributeArray);
      Mustache.parse(stringTemplate);
      _private.htmlCache.rowTemplate = stringTemplate;
    };

    var getTotalColumnWidth = function getTotalColumnWidth() {
      var total = 0;
      for (var i = 0; i < _private.attributeArray.length; i++) {
        total = total + parseInt(_private.columnWidthArray[i], 10);
      }
      return total;
    };

    var createHeaderMarkup = function createHeaderMarkup() {
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

    var createRowMarkup = function createRowMarkup(entity, attributeNames) {
      var tempColumns = document.createElement("DIV");
      tempColumns.innerHTML = Mustache.render(getRowTemplate(attributeNames), entity);
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

    var setEmptyTemplate = function setEmptyTemplate() {
      return "";
    };

    var getRowCacheLength = function getRowCacheLength() {
      return _private.htmlCache.rowsArray.length;
    };

    var setRowTopValue = function setRowTopValue(rowArray, elementNo, topValue) {
      rowArray[elementNo].div.style.transform = "translate3d(0px, " + topValue + "px, 0px)";
      rowArray[elementNo].top = topValue;
    };

    var createGridHtmlWrapper = function createGridHtmlWrapper() {
      var x = document.createElement("DIV");
      _private.node.appendChild(x);
      _private.htmlCache.grid = x;

      _private.htmlCache.grid.className = _private.css.wrapper;
      _private.htmlCache.grid.style.margin = _private.node.style.margin;
      _private.htmlCache.grid.style["margin-top"] = _private.node.style["margin-top"];
      _private.htmlCache.grid.style["margin-left"] = _private.node.style["margin-left"];
      _private.htmlCache.grid.style["margin-right"] = _private.node.style["margin-right"];
      _private.htmlCache.grid.style["margin-bottom"] = _private.node.style["margin-bottom"];
      _private.htmlCache.grid.style.position = _private.node.style.position;
      _private.htmlCache.grid.style.left = _private.node.style.left;
      _private.htmlCache.grid.style.right = _private.node.style.right;
      _private.htmlCache.grid.style.top = _private.node.style.top;
      _private.htmlCache.grid.style.bottom = _private.node.style.bottom;
      _private.htmlCache.grid.style.height = _private.node.style.height;
      _private.htmlCache.grid.style.width = _private.node.style.width;

      _private.gridHeight = _private.htmlCache.grid.clientHeight;
      _private.gridWidght = _private.htmlCache.grid.clientWidth;
    };

    var createGridHtmlHeaderWrapper = function createGridHtmlHeaderWrapper() {
      _private.htmlCache.header = document.createElement("DIV");
      _private.htmlCache.header.className = _private.css.mainHeader;
      _private.htmlCache.header.style.height = _private.headerHeight + "px";
      _private.htmlCache.grid.appendChild(_private.htmlCache.header);

      var headerDivs = createHeaderMarkup(_private.htmlCache.header);
      if (_private.queryHelper.addFilter) {
        var headerCells = headerDivs.lastElementChild.children;
        for (var i = 0; i < headerCells.length; i++) {
          addFilterToHeaderCell({
            attributeName: _private.attributeArray[i],
            headerName: _private.headerArray[i],
            defaultFilter: _private.queryHelper.filterArray[i],
            div: headerCells[i]
          });
        }
      }
      _private.htmlCache.header.appendChild(headerDivs);
    };

    var rebuildGridHeaderHtml = function rebuildGridHeaderHtml() {
      var getScrollLeft = _private.htmlCache.header.firstChild.firstChild.style.left;
      _private.htmlCache.header.removeChild(_private.htmlCache.header.firstChild);

      var headerDivs = createHeaderMarkup(_private.htmlCache.header);
      if (_private.queryHelper.addFilter) {
        var headerCells = headerDivs.lastElementChild.children;
        for (var i = 0; i < headerCells.length; i++) {
          addFilterToHeaderCell({
            attributeName: _private.attributeArray[i],
            headerName: _private.headerArray[i],
            defaultFilter: _private.queryHelper.filterArray[i],
            div: headerCells[i]
          });
        }
      }
      _private.htmlCache.header.appendChild(headerDivs);
      addResizableAndSortableEvent();

      _private.htmlCache.header.firstChild.firstChild.style.left = getScrollLeft;
    };

    var createGridHtmlContentWrapper = function createGridHtmlContentWrapper() {
      var gridWrapperHeight = _private.gridHeight;
      var headerAndFooterHeight = _private.headerHeight + _private.footerHeight;
      _private.contentHeight = gridWrapperHeight - headerAndFooterHeight;

      _private.htmlCache.content = document.createElement("DIV");
      _private.htmlCache.content.className = _private.css.mainContent;
      _private.htmlCache.content.style.height = _private.contentHeight + "px";
      _private.htmlCache.grid.appendChild(_private.htmlCache.content);
    };

    var createGridHtmlFooterWrapper = function createGridHtmlFooterWrapper() {
      _private.htmlCache.footer = document.createElement("DIV");
      _private.htmlCache.footer.className = _private.css.mainFooter;
      _private.htmlCache.footer.style.height = _private.footerHeight + "px";
      _private.htmlCache.grid.appendChild(_private.htmlCache.footer);
    };

    var setScrollBodyHeightToVar = function setScrollBodyHeightToVar() {
      var collectionLength = _private.configFunctions.getCollectionLength();
      _private.scrollBodyHeight = collectionLength * _private.rowHeight;
    };

    var createGridHtmlScrollBodyWrapper = function createGridHtmlScrollBodyWrapper() {
      setScrollBodyHeightToVar();

      _private.htmlCache.scrollBody = document.createElement("DIV");
      _private.htmlCache.scrollBody.className = _private.css.scrollBody;
      _private.htmlCache.scrollBody.style.height = _private.scrollBodyHeight + "px";
      _private.htmlCache.scrollBody.style.width = getTotalColumnWidth() + "px";
      _private.htmlCache.content.appendChild(_private.htmlCache.scrollBody);
    };

    var correctRowAndScrollbodyWidth = function correctRowAndScrollbodyWidth() {
      _private.htmlCache.scrollBody.style.width = getTotalColumnWidth() + "px";
      for (var i = 0; i < _private.htmlCache.rowsArray.length; i++) {
        _private.htmlCache.rowsArray[i].div.style.width = getTotalColumnWidth() + "px";
      }
      _private.htmlCache.header.firstChild.firstChild.style.width = getTotalColumnWidth() + "px";
    };

    var correctHeaderAndScrollbodyWidth = function correctHeaderAndScrollbodyWidth() {
      _private.htmlCache.scrollBody.style.width = getTotalColumnWidth() + "px";
      _private.htmlCache.header.firstChild.firstChild.style.width = getTotalColumnWidth() + "px";
    };

    var createGridHtmlRowWrapper = function createGridHtmlRowWrapper() {
      var minimumRowsNeeded = parseInt(_private.contentHeight / _private.rowHeight, 10) * 2;

      if (minimumRowsNeeded % 2 === 1) {
        minimumRowsNeeded = minimumRowsNeeded + 9;
      } else {
        minimumRowsNeeded = minimumRowsNeeded + 8;
      }

      var top = 0;
      for (var i = 0; i < minimumRowsNeeded; i++) {

        var row = document.createElement("DIV");

        row.className = _private.css.row;

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

        row.innerHTML = setEmptyTemplate();

        _private.htmlCache.scrollBody.appendChild(row);

        _private.htmlCache.rowsArray.push({
          div: row,
          top: top
        });

        top = top + _private.rowHeight;
      }
    };

    var insertRowMarkup = function insertRowMarkup(rowNo, rowHtmlElement, isDownScroll, isLargeScroll) {
      _private.configFunctions.getDataElement(rowNo, isDownScroll, isLargeScroll, function (entity) {
        var container = document.createElement("DIV");
        container.className = _private.css.rowContainer;

        if (_private.columnWidthArrayOverride) {
          container.style.width = "100%";
        }

        var innerHtml = "";
        if (entity) {
          innerHtml = createRowMarkup(entity, _private.attributeArray);
        }
        if (!entity) {
          rowHtmlElement.classList.add(_private.css.noData);
        } else {
          rowHtmlElement.classList.remove(_private.css.noData);
        }

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

        try {
          if (_private.selection.isSelected(rowNo)) {
            rowHtmlElement.classList.add(_private.css.rowSelected);
          } else {
            rowHtmlElement.classList.remove(_private.css.rowSelected);
          }
        } catch (e) {}

        container.innerHTML = innerHtml;
        if (rowHtmlElement.firstChild) {
          if (rowHtmlElement.firstChild.innerHTML !== innerHtml) {
            rowHtmlElement.appendChild(container);
          }
        } else {
          rowHtmlElement.appendChild(container);
        }

        if (_private.configFunctions.onCellDraw) {
          var rowCells = rowHtmlElement.lastElementChild.children;
          for (var i = 0; i < rowCells.length; i++) {
            _private.configFunctions.onCellDraw({
              attributeName: _private.attributeArray[i],
              div: rowCells[i],
              row: rowNo
            });
          }
        }
      });
    };

    var editCellhelper = function editCellhelper(e, readOnly, callback) {

      try {
        var clicked = false;
        var myElement = e.target;
        if (myElement.className === _private.css.cellContent) {
          _private.disableRowClick = true;
          var attributeName = myElement.getAttribute(_private.atts.dataAttribute);
          var oldValue = myElement.innerHTML;

          myElement.setAttribute("contenteditable", "true");
          myElement.classList.add(_private.css.editCell);

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
        console.log("something went wrong in cell editing");
      }
    };

    var addFilterToHeaderCell = function addFilterToHeaderCell(event) {
      var triggerRan = false;

      var attributeName = event.attributeName;
      var headerName = event.headerName;
      var defaultFilter = event.defaultFilter;

      var onChangeEventOnFilter = function onChangeEventOnFilter(e) {
        triggerRan = true;
        setTimeout(function () {
          triggerRan = false;
        }, 300);

        var queryHtmlInput = _private.node.querySelectorAll("." + _private.css.filterHandle);

        var queryParams = [];
        for (var i = 0; i < queryHtmlInput.length; i++) {
          if (queryHtmlInput[i].value !== "" && queryHtmlInput[i].value !== undefined) {
            var dataSourceAttribute = queryHtmlInput[i].getAttribute(_private.atts.dataAttribute);
            var operator = _private.queryHelper.filterArray[_private.attributeArray.indexOf(dataSourceAttribute)];

            var value = queryHtmlInput[i].value;

            queryParams.push({
              attribute: dataSourceAttribute,
              value: value,
              operator: operator
            });

            _private.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value;
          } else {

            if (queryHtmlInput[i].value === "") {
              var dataSourceAttribute = queryHtmlInput[i].getAttribute(_private.atts.dataAttribute);
              _private.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value = "";
            }
          }
        }
        _private.configFunctions.onFilterRun(queryParams);
      };

      var onKeyUpEventOnFilter = function onKeyUpEventOnFilter(e) {
        if (e.keyCode === 13 && triggerRan === false) {
          e.target.onchange(e);
        }
      };

      var getHeaderCellMarkup = function getHeaderCellMarkup(labelTopCell, valueInput, attribute) {

        var cssLabel = _private.css.cellContent + " " + _private.css.filterLabelBottom + " " + _private.css.dragHandle + " " + _private.css.orderHandle;
        var cssInput = _private.css.cellContent + " " + _private.css.filterInputBottom + " " + _private.css.filterHandle;
        if (_private.queryHelper.filterOnAtTop) {
          cssLabel = _private.css.cellContent + " " + _private.css.filterLabelTop + " " + _private.css.dragHandle + " " + _private.css.orderHandle;
          cssInput = _private.css.cellContent + " " + _private.css.filterInputTop + " " + _private.css.filterHandle;
        }

        var sortIcon = getSortIcon(attribute);

        var filter = _private.queryHelper.filterArray[_private.attributeArray.indexOf(attribute)] || "filter";
        var filterName = _private.configFunctions.getFilterName(filter);

        var cellLabel = '<div class="' + cssLabel + '"  ' + _private.atts.dataAttribute + '= "' + attribute + '">' + labelTopCell + sortIcon + '</div>';
        var cellInput = '<input placeholder="' + filterName + '" class="' + cssInput + '"  ' + _private.atts.dataAttribute + '= "' + attribute + '" value="' + valueInput + '"/>';

        if (_private.queryHelper.doNotAddFilterTo.indexOf(attribute) !== -1) {
          cellInput = '<div class="' + cssLabel + '"  ' + _private.atts.dataAttribute + '= "' + attribute + '"></div>';
        }

        var result;
        if (_private.queryHelper.filterOnAtTop) {
          result = cellInput + cellLabel;
        } else {
          result = cellLabel + cellInput;
        }
        return result;
      };

      var value = "";

      if (_private.queryStringCheck[attributeName] !== undefined) {
        value = _private.queryStringCheck[attributeName];
      }

      event.div.innerHTML = getHeaderCellMarkup(headerName, value, attributeName);

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

    var onNormalScrollingLarge = function onNormalScrollingLarge(isDownScroll, currentScrollTop) {
      if (_private.htmlCache.content.scrollTop === 0 && _private.scrollVars.lastScrollTop !== _private.htmlCache.content.scrollTop) {
        _private.scrollVars.lastScrollTop = 0;
      }
      var currentRow = parseInt(_private.scrollVars.lastScrollTop / _private.rowHeight, 10);
      _private.scrollVars.firstTop = currentRow * _private.rowHeight;
      var currentRowTop = _private.rowHeight * currentRow;
      var bottomHitCount;
      for (var i = 0; i < getRowCacheLength(); i++) {
        var setNewTopOnRow = function setNewTopOnRow(cacheRowNumber) {
          var row = _private.htmlCache.rowsArray[cacheRowNumber];
          setRowTopValue([row], 0, currentRowTop);
          row.div.removeChild(row.div.firstChild);
          currentRowTop = currentRowTop + _private.rowHeight;
        };

        if (currentRow >= 0 && currentRow <= _private.configFunctions.getCollectionLength() - 1) {
          setNewTopOnRow(i);
        }

        if (currentRow === _private.configFunctions.getCollectionLength() - 1 && getRowCacheLength() < _private.configFunctions.getCollectionLength() - 1) {
          bottomHitCount = i;
        }

        if (currentRow > _private.configFunctions.getCollectionLength() - 1) {
          setNewTopOnRow(i);
        }

        currentRow++;
      }

      if (bottomHitCount) {
        var firstTop = parseInt(_private.htmlCache.rowsArray[0].top, 10);
        for (i = getRowCacheLength() - 1; i > bottomHitCount; i--) {
          var row = _private.htmlCache.rowsArray[i];
          firstTop = firstTop - _private.rowHeight;
          setRowTopValue(_private.htmlCache.rowsArray, i, firstTop);
          try {
            row.div.removeChild(row.div.firstChild);
          } catch (e) {}
        }
      }

      _private.htmlCache.rowsArray.sort(function (a, b) {
        return parseInt(a.top) - parseInt(b.top);
      });

      fillDataInRows();
    };

    var onNormalScrolling = function onNormalScrolling(isDownScroll, currentScrollTop) {
      var currentScrollTop = _private.htmlCache.content.scrollTop;
      if (_private.scrollVars.halt === false) {
        var newTopValue;
        var currentRow = parseInt(_private.scrollVars.lastScrollTop / _private.rowHeight, 10);
        _private.scrollVars.firstTop = currentRow * _private.rowHeight;
        for (var i = 0; i < getRowCacheLength(); i++) {
          var row = _private.htmlCache.rowsArray[i];
          var rowTop = parseInt(row.top, 10);
          var update = false;
          if (isDownScroll) {
            if (rowTop < currentScrollTop - _private.rowHeight) {
              update = true;
              newTopValue = rowTop + _private.rowHeight * getRowCacheLength();
              currentRow = (rowTop + _private.rowHeight * getRowCacheLength()) / _private.rowHeight;
            }
            if (rowTop > (_private.configFunctions.getCollectionLength() - 1) * _private.rowHeight && rowTop > parseInt(_private.htmlCache.content.style.height)) {
              setRowTopValue([row], 0, -5000 + i);
            }
          } else {
            if (rowTop > currentScrollTop + _private.contentHeight) {
              update = true;
              newTopValue = rowTop - _private.rowHeight * getRowCacheLength();
              currentRow = (rowTop - _private.rowHeight * getRowCacheLength()) / _private.rowHeight;
            }
          }

          if (update === true && currentRow >= 0 && currentRow <= _private.configFunctions.getCollectionLength() - 1) {
            setRowTopValue([row], 0, newTopValue);
            if (row.div.firstChild) {
              row.div.removeChild(row.div.firstChild);
            }
            insertRowMarkup(currentRow, row.div, isDownScroll, false);
          }
        }
        _private.htmlCache.rowsArray.sort(function (a, b) {
          return parseInt(a.top) - parseInt(b.top);
        });
      } else {
        onScrollbarScrolling();
      }
    };

    var hideRowsThatIsLargerThanCollection = function hideRowsThatIsLargerThanCollection() {
      var currentRow = parseInt(_private.scrollVars.lastScrollTop / _private.rowHeight, 10);
      _private.scrollVars.firstTop = currentRow * _private.rowHeight;
      for (var i = 0; i < getRowCacheLength(); i++) {
        var row = _private.htmlCache.rowsArray[i];
        var rowTop = parseInt(row.top, 10);
        if (rowTop > (_private.configFunctions.getCollectionLength() - 1) * _private.rowHeight && rowTop > parseInt(_private.htmlCache.content.style.height) - _private.rowHeight) {
          setRowTopValue([row], 0, -5000 + i);
        }
      }

      _private.htmlCache.rowsArray.sort(function (a, b) {
        return parseInt(a.top) - parseInt(b.top);
      });
    };

    var onScrollbarScrolling = function onScrollbarScrolling() {
      _private.scrollVars.halt = true;

      clearTimeout(_private.scrollVars.timer);

      _private.scrollVars.timer = setTimeout(function () {
        if (_private.htmlCache.content.scrollTop === 0 && _private.scrollVars.lastScrollTop !== _private.htmlCache.content.scrollTop) {
          _private.scrollVars.lastScrollTop = 0;
        }

        var currentRow = parseInt(_private.scrollVars.lastScrollTop / _private.rowHeight, 10);
        _private.scrollVars.firstTop = currentRow * _private.rowHeight;
        var currentRowTop = _private.rowHeight * currentRow;
        var bottomHitCount;
        for (var i = 0; i < getRowCacheLength(); i++) {
          var setNewTopOnRow = function setNewTopOnRow(cacheRowNumber) {
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

          if (currentRow === _private.configFunctions.getCollectionLength() - 1 && getRowCacheLength() < _private.configFunctions.getCollectionLength() - 1) {
            bottomHitCount = i;
          }

          if (currentRow > _private.configFunctions.getCollectionLength() - 1) {
            setNewTopOnRow(i);
          }

          currentRow++;
        }

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

        _private.htmlCache.rowsArray.sort(function (a, b) {
          return parseInt(a.top) - parseInt(b.top);
        });

        fillDataInRows();
        _private.scrollVars.halt = false;
      }, _private.dataScrollDelay);
    };

    var onScrollClickCancel = function onScrollClickCancel() {
      _private.scrollVars.clickTimersArray.forEach(function (xTimer) {
        clearTimeout(xTimer);
      });

      if (_private.scrollVars.clickTimersArray.length > 0) {
        setTimeout(function () {
          _private.scrollVars.clickTimersArray.forEach(function (xTimer) {
            clearTimeout(xTimer);
          });
        }, 0);
      }
    };

    var onScroll = function onScroll() {
      var doScroll = function doScroll() {
        var currentScrollTop = _private.htmlCache.content.scrollTop;
        var currentScrollLeft = _private.htmlCache.content.scrollLeft;

        if (currentScrollTop !== _private.scrollVars.lastScrollTop) {
          if (currentScrollLeft !== 0) {
            _private.htmlCache.content.scrollLeft = _private.scrollVars.lastScrollLeft;
            var header = _private.htmlCache.header.children[0].children[0];
            header.style.left = -_private.scrollVars.lastScrollLeft + "px";
          }

          onScrollClickCancel();

          var isDownScroll = true;
          if (currentScrollTop < _private.scrollVars.lastScrollTop) {
            isDownScroll = false;
          }

          var isLargeScroll;

          switch (true) {
            case currentScrollTop > _private.scrollVars.lastScrollTop + _private.largeScrollLimit:
            case currentScrollTop < _private.scrollVars.lastScrollTop - _private.largeScrollLimit:
              isLargeScroll = true;
              break;

            default:
              isLargeScroll = false;
          }

          _private.scrollVars.lastScrollTop = currentScrollTop;

          if (isLargeScroll) {
            if (_private.renderOnScrollbarScroll) {
              onNormalScrollingLarge(isDownScroll, currentScrollTop);
            } else {
              onScrollbarScrolling();
            }
          } else {
            onNormalScrolling(isDownScroll, currentScrollTop);
          }
        } else {

          if (_private.htmlCache.content.style.overflowX === "hidden") {
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

          if (_private.lockedColumns > 0) {
            currentScrollLeft = _private.htmlCache.content.scrollLeft;
            for (var lockedColNo = _private.lockedColumns; lockedColNo--;) {

              var fixHeader = _private.node.querySelectorAll("." + _private.css.rowHeaderColumn + lockedColNo);
              var fixRow = _private.node.querySelectorAll("." + _private.css.rowColumn + lockedColNo);

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
    };
    var getRowNumberFromClickedOn = function getRowNumberFromClickedOn(e) {
      var thisTop;
      var x = 10;
      var node = e.target;
      for (var i = 0; i < x; i++) {
        try {
          if (node.classList.contains(_private.css.row)) {
            for (var y = 0; y < _private.htmlCache.rowsArray.length; y++) {
              if (node.style.transform === _private.htmlCache.rowsArray[y].div.style.transform) {
                thisTop = _private.htmlCache.rowsArray[y].top;
              }
            }
          }
          node = node.offsetParent;
        } catch (x) {}
      }

      var rowHeight = _private.rowHeight;
      var currentRow = Math.round(thisTop / rowHeight);
      return currentRow;
    };

    var onRowClickAndHighligtHandler = function onRowClickAndHighligtHandler(e) {
      var isSel;

      function removeRowHighligt(currentRow) {
        var selectedRows, i;

        function removeFromArray(array, row) {
          array.splice(row, 1);
        }

        selectedRows = _private.selection.getSelectedRows();
        for (i = 0; i < selectedRows.length; i++) {
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
        _private.selectionVars.onClicked = true;

        if (currentRow <= _private.configFunctions.getCollectionLength() - 1) {

          if (_private.isMultiSelect === true) {

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
                console.log("error, this should not happend");
            }
          } else {
            _private.selection.select(currentRow);
          }
          _private.selectionVars.lastKeyKodeUsed = currentKeyKode;

          updateSelectionOnAllRows();
        }
      } else {
        if (e.ctrlKey) {
          currentKeyKode = "ctrl";
        }

        if (currentKeyKode === "ctrl") {
          _private.selectionVars.lastKeyKodeUsed = currentKeyKode;
          isSel = _private.selection.isSelected(currentRow);
          if (isSel === true) {
            removeRowHighligt(currentRow);
          }
          _private.selectionVars.lastRowSelected = -1;
        } else {
          isSel = _private.selection.isSelected(currentRow);
          _private.selection.select(currentRow);
        }

        updateSelectionOnAllRows();
      }
    };

    var updateGridScrollbars = function updateGridScrollbars() {

      var collectionHeight = _private.configFunctions.getCollectionLength() * _private.rowHeight;
      var bodyHeight = _private.htmlCache.content.offsetHeight;


      if (collectionHeight <= bodyHeight) {
        _private.htmlCache.content.scrollTop = 0;

        _private.htmlCache.content.style.overflow = "";
        _private.htmlCache.content.style.overflowY = "hidden";
        _private.htmlCache.content.style.overflowX = "hidden";
      } else {
        _private.htmlCache.content.style.overflow = "";
        _private.htmlCache.content.style.overflowY = "scroll";
        _private.htmlCache.content.style.overflowX = "hidden";
      }

      if (_private.htmlCache.content.offsetWidth - 5 < getTotalColumnWidth()) {
        _private.htmlCache.content.style.overflowX = "scroll";
      }
    };

    var addResizableAndSortableEvent = function addResizableAndSortableEvent() {
      var resizable = false;
      var screenX;
      var xElement;
      var sortable = false;

      if (_private.sortOnHeaderClick) {
        var orderByClick = function orderByClick(event) {
          if (!sortable && !resizable) {
            _private.configFunctions.onOrderBy(event, function (sortorder) {
              _private.sortOrder = sortorder;
              rebuildGridHeaderHtml();
            });
          }
        };
      }

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

            if (_private.isSortableHeader) {
              _private.sortableCtx.option("disabled", resizable);
            }
            screenX = e.screenX;
            xElement = this;
            var originalWidth = xElement.offsetParent.style.width;
            var originalWidthx = xElement.offsetParent.style.width;
            var index = xElement.offsetParent.getAttribute("column-no");


            _private.htmlCache.header.onmousemove = function (e) {
              _private.htmlCache.header.onmouseup = function () {
                setTimeout(function () {
                  resizable = false;
                  if (_private.isSortableHeader) {
                    _private.sortableCtx.option("disabled", resizable);
                  }
                }, 30);

                _private.htmlCache.header.onmouseleave = "";
                _private.htmlCache.header.onmousemove = "";
                _private.htmlCache.header.onmouseup = "";


                _private.columnWidthArray[index] = parseInt(xElement.offsetParent.style.width);

                _private.htmlCache.rowTemplate = null;
                correctRowAndScrollbodyWidth();

                cacheRowTemplate();
                updateGridScrollbars();
                fillDataInRows(true);
              };

              _private.htmlCache.header.onmouseleave = function (e) {
                _private.htmlCache.header.onmouseup(e);
              };

              if (resizable) {
                var newWidth = parseInt(originalWidth) - (screenX - e.screenX) + "px";
                _private.columnWidthArray[index] = parseInt(newWidth);
                xElement.offsetParent.style.width = parseInt(originalWidth) - (screenX - e.screenX) + "px";
                xElement.offsetParent.style.width = parseInt(originalWidthx) - (screenX - e.screenX) + "px";
                if (_private.resizableHeadersAndRows) {
                  var columnsToFix = _private.htmlCache.content.firstChild.querySelectorAll("." + _private.css.rowColumn + index);

                  for (var col = 0; col < columnsToFix.length; col++) {
                    columnsToFix[col].style.width = newWidth;
                  }

                  correctRowAndScrollbodyWidth();
                  updateGridScrollbars();
                }
              } else {
                correctHeaderAndScrollbodyWidth();
              }
            };
          };

          x[i].appendChild(temp);
        }
      }

      if (_private.isSortableHeader) {
        _private.sortableCtx = new SimpleGridSortable(_private.htmlCache.header.firstChild.firstChild, function (oldIndex, newIndex) {
          var children = _private.htmlCache.header.firstChild.firstChild.children;

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

          _private.htmlCache.rowTemplate = null;
          cacheRowTemplate();
          thisGrid.rebuildColumns();
          sortable = false;
        }, function (n) {
          console.log(n);

          sortable = true;
        }, function (n) {
          sortable = false;
        });
      }
    };

    var addEvents = function addEvents() {
      var handleClick = function handleClick(e) {
        var xTimer = setTimeout(function () {
          if (!_private.disableRowClick) {
            if (_private.isMultiSelect !== undefined) {
              onRowClickAndHighligtHandler(e);
            }
            var currentRow = getRowNumberFromClickedOn(e);
            _private.configFunctions.clickHandler(e, currentRow, null);
          }
        }, 200);
        _private.scrollVars.clickTimersArray.push(xTimer);
      };

      var handleDblClick = function handleDblClick(e) {
        onScrollClickCancel();
        if (!_private.disableRowClick) {
          if (_private.isMultiSelect !== undefined) {
            onRowClickAndHighligtHandler(e);
          }
          var currentRow = getRowNumberFromClickedOn(e);
          _private.configFunctions.clickHandler(e, currentRow, editCellhelper);
        }
      };

      var onMouseDownRow = function onMouseDownRow(e) {
        if (e.button === 2) {
          if (!_private.disableRowClick) {
            var currentRow = getRowNumberFromClickedOn(e);
            _private.configFunctions.clickHandler(e, currentRow, null);
          }
        }
      };

      for (var i = 0; i < getRowCacheLength(); i++) {
        var div = _private.htmlCache.rowsArray[i].div;

        div.addEventListener("dblclick", handleDblClick, false);
        div.addEventListener("click", handleClick, false);
        div.addEventListener("contextmenu", onMouseDownRow, false);
      }

      _private.htmlCache.content.addEventListener("scroll", onScroll);

      addResizableAndSortableEvent();
    };

    var correctColumnsWidthArray = function correctColumnsWidthArray() {
      var newColumnWidth = [];
      for (var i = 0; i < _private.attributeArray.length; i++) {
        var columnWidth = _private.columnWidthArray[i] || 100;
        newColumnWidth.push(columnWidth);
      }
      _private.columnWidthArray = newColumnWidth;
    };

    var setLargeScrollLimit = function setLargeScrollLimit() {
      if (!_private.largeScrollLimit) {
        _private.largeScrollLimit = _private.contentHeight * 3.3;
      }
    };

    var addHtml = function addHtml() {
      cacheRowTemplate();

      createGridHtmlWrapper();
      createGridHtmlHeaderWrapper();
      createGridHtmlContentWrapper();
      createGridHtmlFooterWrapper();
      createGridHtmlScrollBodyWrapper();
      createGridHtmlRowWrapper();
      updateGridScrollbars();
    };

    this.init = function (isRebuild) {
      correctColumnsWidthArray();
      addHtml();
      addEvents();
      fillDataInRows();
      if (!isRebuild) {
        setSelectionType();
      }
      setLargeScrollLimit();
    };

    setConfig(defaultConfig);
    this.init(false);

    var redrawGrid = function redrawGrid() {
      _private.node.children[0].remove();
      _private.htmlCache.rowsArray = [];
      _private.htmlCache.header = null;
      _private.htmlCache.content = null;
      _private.htmlCache.footer = null;
      _private.htmlCache.scrollBody = null;
      _private.htmlCache.rowTemplate = null;

      thisGrid.init(true);
      fixHeaderWithBody();
    };

    var fixHeaderWithBody = function fixHeaderWithBody() {
      var currentScrollLeft = _private.htmlCache.content.scrollLeft;
      var header = _private.htmlCache.header.children[0].children[0];
      header.style.left = -currentScrollLeft + "px";
      if (_private.lockedColumns > 0) {
        currentScrollLeft = _private.htmlCache.content.scrollLeft;
        for (var lockedColNo = _private.lockedColumns; lockedColNo--;) {
          var fix = _private.node.querySelectorAll("." + _private.css.gridColumn + lockedColNo);

          for (var i = fix.length; i--;) {
            fix[i].style.left = currentScrollLeft + "px";
            fix[i].style.zIndex = _private.internalDragDropCount;
            fix[i].style.position = "relative";
          }
        }
      }
    };

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

    this.columnChangeAndCollection = function (resetScrollToTop) {
      correctColumnsWidthArray();
      _private.htmlCache.rowTemplate = null;
      cacheRowTemplate();
      rebuildGridHeaderHtml();
      fillDataInRows(true);
      updateSelectionOnAllRows();
      thisGrid.collectionChange(resetScrollToTop);
    };

    this.collectionChange = function (resetScrollToTop) {
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
      fillDataInRows(true);
      onScrollbarScrolling();
    };

    this.setRowHeight = function (newHeight) {
      _private.rowHeight = newHeight;
      redrawGrid();
    };

    this.setHeaderHeight = function (newHeight) {
      _private.headerHeight = newHeight;
      redrawGrid();
    };

    this.setFooterHeight = function (newHeight) {
      _private.footerHeight = newHeight;
      redrawGrid();
    };

    this.disableHeaderFilter = function () {
      _private.queryHelper.addFilter = false;
      rebuildGridHeaderHtml();
    };

    this.enableHeaderFilter = function () {
      _private.queryHelper.addFilter = true;
      rebuildGridHeaderHtml();
    };

    this.setHeaderFilterAtBottom = function () {
      _private.queryHelper.filterOnAtTop = false;
      rebuildGridHeaderHtml();
    };

    this.setHeaderFilterAtTop = function () {
      _private.queryHelper.filterOnAtTop = true;
      rebuildGridHeaderHtml();
    };

    this.setColumns = function (paramObj) {
      _private.headerArray = paramObj.headerArray;
      _private.attributeArray = paramObj.attributeArray;
      _private.columnWidthArray = paramObj.columnWidthArray;
    };

    this.getColumns = function () {
      return {
        "headerArray": _private.headerArray,
        "attributeArray": _private.attributeArray,
        "columnWidthArray": _private.columnWidthArray
      };
    };

    this.setLockedColumns = function (numberOfLockedColumns) {
      _private.lockedColumns = numberOfLockedColumns;
      thisGrid.rebuildColumns();
    };

    this.enableResizableColumns = function (option) {
      _private.isResizableHeaders = true;
      _private.resizableHeadersAndRows = option;
      rebuildGridHeaderHtml();
    };

    this.disableResizableColumns = function () {
      _private.isResizableHeaders = false;
      _private.resizableHeadersAndRows = false;
      rebuildGridHeaderHtml();
    };

    this.enableSortableColumns = function () {
      _private.isSortableHeader = true;
      rebuildGridHeaderHtml();
    };

    this.disableSortablebleColumns = function () {
      _private.isSortableHeader = false;
      rebuildGridHeaderHtml();
    };

    this.setMultiSelection = function (keepSelection) {
      _private.isMultiSelect = true;
      _private.selectionMode = "multible";
      if (!keepSelection) {
        _private.$selectedRows = [];
      }
      updateSelectionOnAllRows();
    };

    this.setSingleSelection = function (keepSelection) {
      _private.isMultiSelect = false;
      _private.selectionMode = "single";
      if (!keepSelection) {
        _private.$selectedRows = [];
      }
      updateSelectionOnAllRows();
    };

    this.disableSelection = function (keepSelection) {
      _private.isMultiSelect = undefined;
      _private.selectionMode = "none";
      if (!keepSelection) {
        _private.$selectedRows = [];
      }
      updateSelectionOnAllRows();
    };

    this.getSelectedRows = function () {
      return this.selection.getSelectedRows();
    };

    this.setSelectedRows = function (sel) {
      this.selection.setSelectedRows(sel);
      updateSelectionOnAllRows();
    };

    this.scrollBottom = function () {
      var collectionLength = _private.configFunctions.getCollectionLength();
      _private.htmlCache.content.scrollTop = collectionLength * _private.rowHeight;
    };

    this.scrollTop = function () {
      _private.htmlCache.content.scrollTop = 0;
    };

    this.setScrollTop = function (newTop) {
      _private.htmlCache.content.scrollTop = newTop;
    };

    this.getScrollTop = function () {
      return _private.htmlCache.content.scrollTop;
    };

    this.updateRow = function (no, clear) {
      fillDataIntoRow(no, clear);
    };

    this.clearHeaderFilter = function () {
      _private.sortOrder = [];
      rebuildGridHeaderHtml();
    };

    this.setHeaderFilter = function (sortOrder) {
      _private.sortOrder = sortOrder;
      rebuildGridHeaderHtml();
    };
  };function VGridGenerator() {
    return vGridGenerator;
  }
});