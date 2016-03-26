"use strict";

System.register([], function (_export, _context) {
  var vGridGenerator;
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

          _private.htmlCache.grid.style.position = "relative";
          _private.htmlCache.grid.style.height = _private.node.style.height || "100%";
          _private.htmlCache.grid.style.width = _private.node.style.width || "100%";
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

              x = _private.colStyleArray[oldIndex];
              _private.colStyleArray.splice(oldIndex, 1);
              _private.colStyleArray.splice(newIndex, 0, x);

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

        this.disableSortableColumns = function () {
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

      function VGridGenerator() {
        return vGridGenerator;
      }

      _export("VGridGenerator", VGridGenerator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1JLHVCQUFpQixTQUFqQixjQUFpQixDQUFVLGFBQVYsRUFBeUIsUUFBekIsRUFBbUMsT0FBbkMsRUFBNEMsU0FBNUMsRUFBdUQsa0JBQXZELEVBQTJFO0FBQzlGLHFCQUQ4Rjs7QUFHOUYsWUFBSSxXQUFXLElBQVgsQ0FIMEY7O0FBUTlGLFlBQUksV0FBVyxFQUFYLENBUjBGO0FBUzlGLFlBQUksWUFBWSxTQUFaLFNBQVksQ0FBVSxPQUFWLEVBQW1CO0FBQ2pDLHFCQUFXO0FBQ1Qsa0JBQU0sT0FBTjtBQUNBLDBCQUFjLFFBQVEsWUFBUixJQUF3QixDQUF4QjtBQUNkLHVCQUFXLFFBQVEsU0FBUixJQUFxQixFQUFyQjtBQUNYLDBCQUFjLFFBQVEsWUFBUixJQUF3QixDQUF4QjtBQUNkLDZCQUFpQixRQUFRLGVBQVIsSUFBMkIsR0FBM0I7QUFDakIseUJBQWEsUUFBUSxXQUFSLElBQXVCLEVBQXZCO0FBQ2IsNEJBQWdCLFFBQVEsY0FBUixJQUEwQixFQUExQjtBQUNoQiw4QkFBa0IsUUFBUSxnQkFBUixJQUE0QixFQUE1QjtBQUNsQiwyQkFBZ0IsUUFBUSxhQUFSLElBQXlCLEVBQXpCO0FBQ2hCLDhCQUFrQixRQUFRLGdCQUFSLElBQTRCLEtBQTVCO0FBQ2xCLCtCQUFtQixRQUFRLGlCQUFSLElBQTZCLEtBQTdCO0FBQ25CLGdDQUFvQixRQUFRLGtCQUFSLElBQThCLEtBQTlCO0FBQ3BCLG1DQUF1QixRQUFRLHFCQUFSLElBQWlDLElBQWpDO0FBQ3ZCLG1DQUF1QixFQUF2QjtBQUNBLHFDQUF5QixRQUFRLHVCQUFSLElBQW1DLElBQW5DO0FBQ3pCLDJCQUFlLFFBQVEsYUFBUjtBQUNmLHFDQUF5QixRQUFRLHVCQUFSLElBQW1DLElBQW5DO0FBQ3pCLHNDQUEwQixRQUFRLHdCQUFSLElBQW9DLEtBQXBDO0FBQzFCLHVCQUFXLEVBQVg7QUFDQSwyQkFB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
