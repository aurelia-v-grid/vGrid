System.register([], function (_export) {
  "use strict";

  var vGridGenerator;

  _export("VGridGenerator", VGridGenerator);

  function VGridGenerator() {
    return vGridGenerator;
  }

  return {
    setters: [],
    execute: function () {
      vGridGenerator = function vGridGenerator(defaultConfig, Mustache, element, parentCtx, SimpleGridSortable) {
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
                rowTemplate = rowTemplate + '<div><div class="' + _private.css.cellContent + '" ' + _private.atts.dataAttribute + '="' + attributeNamesArray[i] + '">{{' + attributeNamesArray[i] + '}}</div></div>';
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
      };
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
