"use strict";

System.register([], function (_export, _context) {
  var VGridGenerator;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("VGridGenerator", VGridGenerator = function () {
        function VGridGenerator(defaultConfig, Mustache, element, parentCtx, SimpleGridSortable) {
          _classCallCheck(this, VGridGenerator);

          this._private = {};

          this.defaultConfig = defaultConfig;
          this.Mustache = Mustache;
          this.element = element;
          this.parentCtx = parentCtx;
          this.SimpleGridSortable = SimpleGridSortable;
          this.setConfig(defaultConfig);
          this.init(false);
        }

        VGridGenerator.prototype.setConfig = function setConfig(options) {
          this._private = {
            node: this.element,
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
            predefinedScrolltop: options.predefinedScrolltop,
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

        VGridGenerator.prototype.setSelectionType = function setSelectionType() {
          var _this = this;

          this._private.$selectedRows = [];
          this._private.selectionMode = "none";

          if (this._private.isMultiSelect === false) {
            this._private.selectionMode = "single";
          }
          if (this._private.isMultiSelect === true) {
            this._private.selectionMode = "multible";
          }

          this._private.selection.isSelected = function (row) {
            var result = false;
            if (_this._private.$selectedRows.indexOf(row) !== -1) {
              result = true;
            }
            return result;
          };

          this._private.selection.select = function (rowSelect, addToSelection) {
            switch (_this._private.selectionMode) {
              case "none":
              case null:
              case undefined:
                break;
              case "single":
                if (_this._private.$selectedRows !== undefined) {
                  if (_this._private.$selectedRows.length > 1) {
                    _this._private.$selectedRows = [];
                  }
                }
                _this._private.$selectedRows[0] = rowSelect;
                break;
              case "multible":
                if (!addToSelection) {
                  _this._private.$selectedRows = [];
                  _this._private.$selectedRows[0] = rowSelect;
                } else {
                  if (!_this._private.selection.isSelected(rowSelect)) {
                    _this._private.$selectedRows.push(rowSelect);
                  }
                }
            }
          };

          this._private.selection.selectRange = function (start, end) {
            if (_this._private.selectionMode === "multible") {
              _this._private.$selectedRows = [];
              for (var i = start; i < end + 1; i++) {
                _this._private.$selectedRows.push(i);
              }
            }
          };

          this._private.selection.reset = function () {
            _this._private.$selectedRows = [];
          };

          this._private.selection.getSelectedRows = function () {
            return _this._private.$selectedRows;
          };

          this._private.selection.setSelectedRows = function (newRows) {
            _this._private.$selectedRows = newRows;
          };

          this.selection = this._private.selection;
        };

        VGridGenerator.prototype.fillDataInRows = function fillDataInRows(clearAllRows) {
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this._private.htmlCache.rowsArray[i].top / this._private.rowHeight;
            var row = this._private.htmlCache.rowsArray[i];
            if (clearAllRows) {
              row.div.removeChild(row.div.firstChild);
            }
            this.insertRowMarkup(currentRow, row.div, true, true);
          }
        };

        VGridGenerator.prototype.getSortIcon = function getSortIcon(attribute) {
          var _this2 = this;

          var result;
          if (this._private.sortOnHeaderClick) {
            var main = '<span class=""><span class="' + this._private.css.sortIcon + ' ' + this._private.css.sortIconSort + '"></span></span>';
            if (this._private.sortOrder.length === 0) {
              result = main;
            } else {
              this._private.sortOrder.forEach(function (x) {
                if (x.attribute === attribute) {
                  var asc = x.asc === true ? '<span class="' + _this2._private.css.sortIcon + ' ' + _this2._private.css.sortIconAsc + '"></span>' : '<span class="' + _this2._private.css.sortIcon + ' ' + _this2._private.css.sortIconDesc + '"></span>';
                  var main = '<span class="' + _this2._private.css.sortIcon + ' ' + _this2._private.css.sortIconNo + x.no + '">';
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

        VGridGenerator.prototype.fillDataIntoRow = function fillDataIntoRow(rowno, clearRow) {
          for (var i = 0; i < getRowCacheLength(); i++) {
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

        VGridGenerator.prototype.updateSelectionOnAllRows = function updateSelectionOnAllRows() {
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

        VGridGenerator.prototype.getHeaderTemplate = function getHeaderTemplate(headerNamesArray, attributeNamesArray) {
          var rowTemplate = "";
          var css = this._private.css.dragHandle + ' ' + this._private.css.cellContent + ' ' + this._private.css.orderHandle;
          for (var i = 0; i < headerNamesArray.length; i++) {
            var sortIcon = this.getSortIcon(attributeNamesArray[i]);
            rowTemplate = rowTemplate + '<div><div class="' + css + '" ' + this._private.atts.dataAttribute + '="' + attributeNamesArray[i] + '">' + headerNamesArray[i] + sortIcon + '</div></div>';
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.getRowTemplate = function getRowTemplate(attributeNamesArray) {
          var rowTemplate = "";

          if (this._private.htmlCache.rowTemplate !== null) {
            rowTemplate = this._private.htmlCache.rowTemplate;
          } else {
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

        VGridGenerator.prototype.cacheRowTemplate = function cacheRowTemplate(template) {
          var stringTemplate = template || this.getRowTemplate(this._private.attributeArray);
          this.Mustache.parse(stringTemplate);
          this._private.htmlCache.rowTemplate = stringTemplate;
        };

        VGridGenerator.prototype.getTotalColumnWidth = function getTotalColumnWidth() {
          var total = 0;
          for (var i = 0; i < this._private.attributeArray.length; i++) {
            total = total + parseInt(this._private.columnWidthArray[i], 10);
          }
          return total;
        };

        VGridGenerator.prototype.createHeaderMarkup = function createHeaderMarkup() {
          var tempColumns = document.createElement("DIV");
          tempColumns.innerHTML = this.getHeaderTemplate(this._private.headerArray, this._private.attributeArray);
          var i;
          for (i = 0; i < tempColumns.children.length; i++) {
            tempColumns.children[i].setAttribute("column-no", i);
            tempColumns.children[i].style.height = "100%";
            tempColumns.children[i].style.width = this._private.columnWidthArray[i] + "px";
            tempColumns.children[i].classList.add(this._private.css.rowHeaderCell);
            tempColumns.children[i].classList.add(this._private.css.rowHeaderColumn + i);
            tempColumns.children[i].classList.add(this._private.css.gridColumn + i);
          }

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

        VGridGenerator.prototype.createRowMarkup = function createRowMarkup(entity, attributeNames) {
          var tempColumns = document.createElement("DIV");
          tempColumns.innerHTML = this.Mustache.render(this.getRowTemplate(attributeNames), entity);
          if (!this._private.columnWidthArrayOverride) {
            var i;
            for (i = 0; i < tempColumns.children.length; i++) {
              tempColumns.children[i].style.height = "100%";
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

        VGridGenerator.prototype.setEmptyTemplate = function setEmptyTemplate() {
          return "";
        };

        VGridGenerator.prototype.getRowCacheLength = function getRowCacheLength() {
          return this._private.htmlCache.rowsArray.length;
        };

        VGridGenerator.prototype.setRowTopValue = function setRowTopValue(rowArray, elementNo, topValue) {
          rowArray[elementNo].div.style.transform = "translate3d(0px, " + topValue + "px, 0px)";
          rowArray[elementNo].top = topValue;
        };

        VGridGenerator.prototype.createGridHtmlWrapper = function createGridHtmlWrapper() {
          var x = document.createElement("DIV");
          this._private.node.appendChild(x);
          this._private.htmlCache.grid = x;

          this._private.htmlCache.grid.className = this._private.css.wrapper;
          this._private.htmlCache.grid.style.margin = this._private.node.style.margin;
          this._private.htmlCache.grid.style["margin-top"] = this._private.node.style["margin-top"];
          this._private.htmlCache.grid.style["margin-left"] = this._private.node.style["margin-left"];
          this._private.htmlCache.grid.style["margin-right"] = this._private.node.style["margin-right"];
          this._private.htmlCache.grid.style["margin-bottom"] = this._private.node.style["margin-bottom"];
          this._private.htmlCache.grid.style.position = this._private.node.style.position;
          this._private.htmlCache.grid.style.left = this._private.node.style.left;
          this._private.htmlCache.grid.style.right = this._private.node.style.right;
          this._private.htmlCache.grid.style.top = this._private.node.style.top;
          this._private.htmlCache.grid.style.bottom = this._private.node.style.bottom;
          this._private.htmlCache.grid.style.height = this._private.node.style.height;
          this._private.htmlCache.grid.style.width = this._private.node.style.width;

          this._private.gridHeight = this._private.htmlCache.grid.clientHeight;
          this._private.gridWidght = this._private.htmlCache.grid.clientWidth;
        };

        VGridGenerator.prototype.createGridHtmlHeaderWrapper = function createGridHtmlHeaderWrapper() {
          this._private.htmlCache.header = document.createElement("DIV");
          this._private.htmlCache.header.className = this._private.css.mainHeader;
          this._private.htmlCache.header.style.height = this._private.headerHeight + "px";
          this._private.htmlCache.grid.appendChild(this._private.htmlCache.header);

          var headerDivs = this.createHeaderMarkup(this._private.htmlCache.header);
          if (this._private.queryHelper.addFilter) {
            var headerCells = headerDivs.lastElementChild.children;
            for (var i = 0; i < headerCells.length; i++) {
              this.addFilterToHeaderCell({
                attributeName: this._private.attributeArray[i],
                headerName: this._private.headerArray[i],
                defaultFilter: this._private.queryHelper.filterArray[i],
                div: headerCells[i]
              });
            }
          }
          this._private.htmlCache.header.appendChild(headerDivs);
        };

        VGridGenerator.prototype.rebuildGridHeaderHtml = function rebuildGridHeaderHtml() {
          var getScrollLeft = this._private.htmlCache.header.firstChild.firstChild.style.left;
          this._private.htmlCache.header.removeChild(this._private.htmlCache.header.firstChild);

          var headerDivs = this.createHeaderMarkup(this._private.htmlCache.header);
          if (this._private.queryHelper.addFilter) {
            var headerCells = headerDivs.lastElementChild.children;
            for (var i = 0; i < headerCells.length; i++) {
              this.addFilterToHeaderCell({
                attributeName: this._private.attributeArray[i],
                headerName: this._private.headerArray[i],
                defaultFilter: this._private.queryHelper.filterArray[i],
                div: headerCells[i]
              });
            }
          }
          this._private.htmlCache.header.appendChild(headerDivs);
          this.addResizableAndSortableEvent();

          this._private.htmlCache.header.firstChild.firstChild.style.left = getScrollLeft;
        };

        VGridGenerator.prototype.createGridHtmlContentWrapper = function createGridHtmlContentWrapper() {
          var gridWrapperHeight = this._private.gridHeight;
          var headerAndFooterHeight = this._private.headerHeight + this._private.footerHeight;
          this._private.contentHeight = gridWrapperHeight - headerAndFooterHeight;

          this._private.htmlCache.content = document.createElement("DIV");
          this._private.htmlCache.content.className = this._private.css.mainContent;
          this._private.htmlCache.content.style.height = this._private.contentHeight + "px";
          this._private.htmlCache.grid.appendChild(this._private.htmlCache.content);
        };

        VGridGenerator.prototype.createGridHtmlFooterWrapper = function createGridHtmlFooterWrapper() {
          this._private.htmlCache.footer = document.createElement("DIV");
          this._private.htmlCache.footer.className = this._private.css.mainFooter;
          this._private.htmlCache.footer.style.height = this._private.footerHeight + "px";
          this._private.htmlCache.grid.appendChild(this._private.htmlCache.footer);
        };

        VGridGenerator.prototype.setScrollBodyHeightToVar = function setScrollBodyHeightToVar() {
          var collectionLength = this._private.configFunctions.getCollectionLength();
          this._private.scrollBodyHeight = collectionLength * this._private.rowHeight;
        };

        VGridGenerator.prototype.createGridHtmlScrollBodyWrapper = function createGridHtmlScrollBodyWrapper() {
          this.setScrollBodyHeightToVar();

          this._private.htmlCache.scrollBody = document.createElement("DIV");
          this._private.htmlCache.scrollBody.className = this._private.css.scrollBody;
          this._private.htmlCache.scrollBody.style.height = this._private.scrollBodyHeight + "px";
          this._private.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
          this._private.htmlCache.content.appendChild(this._private.htmlCache.scrollBody);
        };

        VGridGenerator.prototype.correctRowAndScrollbodyWidth = function correctRowAndScrollbodyWidth() {
          this._private.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
          for (var i = 0; i < this._private.htmlCache.rowsArray.length; i++) {
            this._private.htmlCache.rowsArray[i].div.style.width = this.getTotalColumnWidth() + "px";
          }
          this._private.htmlCache.header.firstChild.firstChild.style.width = this.getTotalColumnWidth() + "px";
        };

        VGridGenerator.prototype.correctHeaderAndScrollbodyWidth = function correctHeaderAndScrollbodyWidth() {
          this._private.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
          this._private.htmlCache.header.firstChild.firstChild.style.width = this.getTotalColumnWidth() + "px";
        };

        VGridGenerator.prototype.createGridHtmlRowWrapper = function createGridHtmlRowWrapper() {
          var minimumRowsNeeded = parseInt(this._private.contentHeight / this._private.rowHeight, 10) * 2;

          if (minimumRowsNeeded % 2 === 1) {
            minimumRowsNeeded = minimumRowsNeeded + 9;
          } else {
            minimumRowsNeeded = minimumRowsNeeded + 8;
          }

          var top = 0;
          for (var i = 0; i < minimumRowsNeeded; i++) {

            var row = document.createElement("DIV");

            row.className = this._private.css.row;

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

            row.innerHTML = this.setEmptyTemplate();

            this._private.htmlCache.scrollBody.appendChild(row);

            this._private.htmlCache.rowsArray.push({
              div: row,
              top: top
            });

            top = top + this._private.rowHeight;
          }
        };

        VGridGenerator.prototype.insertRowMarkup = function insertRowMarkup(rowNo, rowHtmlElement, isDownScroll, isLargeScroll) {
          var _this3 = this;

          this._private.configFunctions.getDataElement(rowNo, isDownScroll, isLargeScroll, function (entity) {
            var container = document.createElement("DIV");
            container.className = _this3._private.css.rowContainer;

            if (_this3._private.columnWidthArrayOverride) {
              container.style.width = "100%";
            }

            var innerHtml = "";
            if (entity) {
              innerHtml = _this3.createRowMarkup(entity, _this3._private.attributeArray);
            }
            if (!entity) {
              rowHtmlElement.classList.add(_this3._private.css.noData);
            } else {
              rowHtmlElement.classList.remove(_this3._private.css.noData);
            }

            if (rowNo % 2 === 1) {
              if (rowHtmlElement.classList.contains(_this3._private.css.rowEven)) {
                rowHtmlElement.classList.remove(_this3._private.css.rowEven);
                rowHtmlElement.classList.add(_this3._private.css.rowAlt);
              }
            } else {
              if (rowHtmlElement.classList.contains(_this3._private.css.rowAlt)) {
                rowHtmlElement.classList.remove(_this3._private.css.rowAlt);
                rowHtmlElement.classList.add(_this3._private.css.rowEven);
              }
            }

            try {
              if (_this3._private.selection.isSelected(rowNo)) {
                rowHtmlElement.classList.add(_this3._private.css.rowSelected);
              } else {
                rowHtmlElement.classList.remove(_this3._private.css.rowSelected);
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

            if (_this3._private.configFunctions.onCellDraw) {
              var rowCells = rowHtmlElement.lastElementChild.children;
              for (var i = 0; i < rowCells.length; i++) {
                _this3._private.configFunctions.onCellDraw({
                  attributeName: _this3._private.attributeArray[i],
                  div: rowCells[i],
                  row: rowNo
                });
              }
            }
          });
        };

        VGridGenerator.prototype.editCellhelper = function editCellhelper(e, readOnly, callback) {

          try {
            var clicked = false;
            var myElement = e.target;
            if (myElement.className === this._private.css.cellContent) {
              this._private.disableRowClick = true;
              var attributeName = myElement.getAttribute(this._private.atts.dataAttribute);
              var oldValue = myElement.innerHTML;

              myElement.setAttribute("contenteditable", "true");
              myElement.classList.add(this._private.css.editCell);

              myElement.onblur = function () {

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
                  this._private.disableRowClick = false;
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
            this._private.disableRowClick = false;
            console.log("something went wrong in cell editing");
          }
        };

        VGridGenerator.prototype.addFilterToHeaderCell = function addFilterToHeaderCell(event) {
          var _this4 = this;

          var triggerRan = false;

          var attributeName = event.attributeName;
          var headerName = event.headerName;
          var defaultFilter = event.defaultFilter;

          var onChangeEventOnFilter = function onChangeEventOnFilter(e) {
            triggerRan = true;
            setTimeout(function () {
              triggerRan = false;
            }, 300);

            var queryHtmlInput = _this4._private.node.querySelectorAll("." + _this4._private.css.filterHandle);

            var queryParams = [];
            for (var i = 0; i < queryHtmlInput.length; i++) {
              if (queryHtmlInput[i].value !== "" && queryHtmlInput[i].value !== undefined) {
                var dataSourceAttribute = queryHtmlInput[i].getAttribute(_this4._private.atts.dataAttribute);
                var operator = _this4._private.queryHelper.filterArray[_this4._private.attributeArray.indexOf(dataSourceAttribute)];

                var value = queryHtmlInput[i].value;

                queryParams.push({
                  attribute: dataSourceAttribute,
                  value: value,
                  operator: operator
                });

                _this4._private.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value;
              } else {

                if (queryHtmlInput[i].value === "") {
                  var dataSourceAttribute = queryHtmlInput[i].getAttribute(_this4._private.atts.dataAttribute);
                  _this4._private.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value = "";
                }
              }
            }
            _this4._private.configFunctions.onFilterRun(queryParams);
          };

          var onKeyUpEventOnFilter = function onKeyUpEventOnFilter(e) {
            if (e.keyCode === 13 && triggerRan === false) {
              e.target.onchange(e);
            }
          };

          var getHeaderCellMarkup = function getHeaderCellMarkup(labelTopCell, valueInput, attribute) {

            var cssLabel = _this4._private.css.cellContent + " " + _this4._private.css.filterLabelBottom + " " + _this4._private.css.dragHandle + " " + _this4._private.css.orderHandle;
            var cssInput = _this4._private.css.cellContent + " " + _this4._private.css.filterInputBottom + " " + _this4._private.css.filterHandle;
            if (_this4._private.queryHelper.filterOnAtTop) {
              cssLabel = _this4._private.css.cellContent + " " + _this4._private.css.filterLabelTop + " " + _this4._private.css.dragHandle + " " + _this4._private.css.orderHandle;
              cssInput = _this4._private.css.cellContent + " " + _this4._private.css.filterInputTop + " " + _this4._private.css.filterHandle;
            }

            var sortIcon = _this4.getSortIcon(attribute);

            var filter = _this4._private.queryHelper.filterArray[_this4._private.attributeArray.indexOf(attribute)] || "filter";
            var filterName = _this4._private.configFunctions.getFilterName(filter);

            var cellLabel = '<div class="' + cssLabel + '"  ' + _this4._private.atts.dataAttribute + '= "' + attribute + '">' + labelTopCell + sortIcon + '</div>';
            var cellInput = '<input placeholder="' + filterName + '" class="' + cssInput + '"  ' + _this4._private.atts.dataAttribute + '= "' + attribute + '" value="' + valueInput + '"/>';

            if (_this4._private.queryHelper.doNotAddFilterTo.indexOf(attribute) !== -1) {
              cellInput = '<div class="' + cssLabel + '"  ' + _this4._private.atts.dataAttribute + '= "' + attribute + '"></div>';
            }

            var result;
            if (_this4._private.queryHelper.filterOnAtTop) {
              result = cellInput + cellLabel;
            } else {
              result = cellLabel + cellInput;
            }
            return result;
          };

          var value = "";

          if (this._private.queryStringCheck[attributeName] !== undefined) {
            value = this._private.queryStringCheck[attributeName];
          }

          event.div.innerHTML = getHeaderCellMarkup(headerName, value, attributeName);

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

        VGridGenerator.prototype.onNormalScrollingLarge = function onNormalScrollingLarge(isDownScroll, currentScrollTop) {
          var _this5 = this;

          if (this._private.htmlCache.content.scrollTop === 0 && this._private.scrollVars.lastScrollTop !== this._private.htmlCache.content.scrollTop) {
            this._private.scrollVars.lastScrollTop = 0;
          }
          var currentRow = parseInt(this._private.scrollVars.lastScrollTop / this._private.rowHeight, 10);
          this._private.scrollVars.firstTop = currentRow * this._private.rowHeight;
          var currentRowTop = this._private.rowHeight * currentRow;
          var bottomHitCount;
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var setNewTopOnRow = function setNewTopOnRow(cacheRowNumber) {
              var row = _this5._private.htmlCache.rowsArray[cacheRowNumber];
              _this5.setRowTopValue([row], 0, currentRowTop);
              row.div.removeChild(row.div.firstChild);
              currentRowTop = currentRowTop + _this5._private.rowHeight;
            };

            if (currentRow >= 0 && currentRow <= this._private.configFunctions.getCollectionLength() - 1) {
              setNewTopOnRow(i);
            }

            if (currentRow === this._private.configFunctions.getCollectionLength() - 1 && this.getRowCacheLength() < this._private.configFunctions.getCollectionLength() - 1) {
              bottomHitCount = i;
            }

            if (currentRow > this._private.configFunctions.getCollectionLength() - 1) {
              setNewTopOnRow(i);
            }

            currentRow++;
          }

          if (bottomHitCount) {
            var firstTop = parseInt(this._private.htmlCache.rowsArray[0].top, 10);
            for (i = this.getRowCacheLength() - 1; i > bottomHitCount; i--) {
              var row = this._private.htmlCache.rowsArray[i];
              firstTop = firstTop - this._private.rowHeight;
              this.setRowTopValue(this._private.htmlCache.rowsArray, i, firstTop);
              try {
                row.div.removeChild(row.div.firstChild);
              } catch (e) {}
            }
          }

          this._private.htmlCache.rowsArray.sort(function (a, b) {
            return parseInt(a.top) - parseInt(b.top);
          });

          this.fillDataInRows();
        };

        VGridGenerator.prototype.onNormalScrolling = function onNormalScrolling(isDownScroll, currentScrollTop) {
          var currentScrollTop = this._private.htmlCache.content.scrollTop;
          if (this._private.scrollVars.halt === false) {
            var newTopValue;
            var currentRow = parseInt(this._private.scrollVars.lastScrollTop / this._private.rowHeight, 10);
            this._private.scrollVars.firstTop = currentRow * this._private.rowHeight;
            for (var i = 0; i < this.getRowCacheLength(); i++) {
              var row = this._private.htmlCache.rowsArray[i];
              var rowTop = parseInt(row.top, 10);
              var update = false;
              if (isDownScroll) {
                if (rowTop < currentScrollTop - this._private.rowHeight) {
                  update = true;
                  newTopValue = rowTop + this._private.rowHeight * this.getRowCacheLength();
                  currentRow = (rowTop + this._private.rowHeight * this.getRowCacheLength()) / this._private.rowHeight;
                }
                if (rowTop > (this._private.configFunctions.getCollectionLength() - 1) * this._private.rowHeight && rowTop > parseInt(this._private.htmlCache.content.style.height)) {
                  this.setRowTopValue([row], 0, -5000 + i);
                }
              } else {
                if (rowTop > currentScrollTop + this._private.contentHeight) {
                  update = true;
                  newTopValue = rowTop - this._private.rowHeight * this.getRowCacheLength();
                  currentRow = (rowTop - this._private.rowHeight * this.getRowCacheLength()) / this._private.rowHeight;
                }
              }

              if (update === true && currentRow >= 0 && currentRow <= this._private.configFunctions.getCollectionLength() - 1) {
                this.setRowTopValue([row], 0, newTopValue);
                if (row.div.firstChild) {
                  row.div.removeChild(row.div.firstChild);
                }
                this.insertRowMarkup(currentRow, row.div, isDownScroll, false);
              }
            }
            this._private.htmlCache.rowsArray.sort(function (a, b) {
              return parseInt(a.top) - parseInt(b.top);
            });
          } else {
            this.onScrollbarScrolling();
          }
        };

        VGridGenerator.prototype.hideRowsThatIsLargerThanCollection = function hideRowsThatIsLargerThanCollection() {
          var currentRow = parseInt(this._private.scrollVars.lastScrollTop / this._private.rowHeight, 10);
          this._private.scrollVars.firstTop = currentRow * this._private.rowHeight;
          for (var i = 0; i < getRowCacheLength(); i++) {
            var row = this._private.htmlCache.rowsArray[i];
            var rowTop = parseInt(row.top, 10);
            if (rowTop > (this._private.configFunctions.getCollectionLength() - 1) * this._private.rowHeight && rowTop > parseInt(this._private.htmlCache.content.style.height) - this._private.rowHeight) {
              setRowTopValue([row], 0, -5000 + i);
            }
          }

          this._private.htmlCache.rowsArray.sort(function (a, b) {
            return parseInt(a.top) - parseInt(b.top);
          });
        };

        VGridGenerator.prototype.onScrollbarScrolling = function onScrollbarScrolling() {
          var _this6 = this;

          this._private.scrollVars.halt = true;

          clearTimeout(this._private.scrollVars.timer);

          this._private.scrollVars.timer = setTimeout(function () {
            if (_this6._private.htmlCache.content.scrollTop === 0 && _this6._private.scrollVars.lastScrollTop !== _this6._private.htmlCache.content.scrollTop) {
              _this6._private.scrollVars.lastScrollTop = 0;
            }

            var currentRow = parseInt(_this6._private.scrollVars.lastScrollTop / _this6._private.rowHeight, 10);
            _this6._private.scrollVars.firstTop = currentRow * _this6._private.rowHeight;
            var currentRowTop = _this6._private.rowHeight * currentRow;
            var bottomHitCount;
            for (var i = 0; i < _this6.getRowCacheLength(); i++) {
              var setNewTopOnRow = function setNewTopOnRow(cacheRowNumber) {
                var row = _this6._private.htmlCache.rowsArray[cacheRowNumber];
                _this6.setRowTopValue([row], 0, currentRowTop);
                if (row.div.firstChild) {
                  row.div.removeChild(row.div.firstChild);
                }

                currentRowTop = currentRowTop + _this6._private.rowHeight;
              };

              if (currentRow >= 0 && currentRow <= _this6._private.configFunctions.getCollectionLength() - 1) {
                setNewTopOnRow(i);
              }

              if (currentRow === _this6._private.configFunctions.getCollectionLength() - 1 && _this6.getRowCacheLength() < _this6._private.configFunctions.getCollectionLength() - 1) {
                bottomHitCount = i;
              }

              if (currentRow > _this6._private.configFunctions.getCollectionLength() - 1) {
                setNewTopOnRow(i);
              }

              currentRow++;
            }

            if (bottomHitCount) {
              var firstTop = parseInt(_this6._private.htmlCache.rowsArray[0].top, 10);
              for (i = getRowCacheLength() - 1; i > bottomHitCount; i--) {
                var row = _this6._private.htmlCache.rowsArray[i];
                firstTop = firstTop - _this6._private.rowHeight;
                setRowTopValue(_this6._private.htmlCache.rowsArray, i, firstTop);
                if (row.div.firstChild) {
                  row.div.removeChild(row.div.firstChild);
                }
              }
            }

            _this6._private.htmlCache.rowsArray.sort(function (a, b) {
              return parseInt(a.top) - parseInt(b.top);
            });

            _this6.fillDataInRows();
            _this6._private.scrollVars.halt = false;
          }, this._private.dataScrollDelay);
        };

        VGridGenerator.prototype.onScrollClickCancel = function onScrollClickCancel() {
          this._private.scrollVars.clickTimersArray.forEach(function (xTimer) {
            clearTimeout(xTimer);
          });

          if (this._private.scrollVars.clickTimersArray.length > 0) {
            setTimeout(function () {
              this._private.scrollVars.clickTimersArray.forEach(function (xTimer) {
                clearTimeout(xTimer);
              });
            }, 0);
          }
        };

        VGridGenerator.prototype.onScroll = function onScroll() {
          var _this7 = this;

          var doScroll = function doScroll() {
            var currentScrollTop = _this7._private.htmlCache.content.scrollTop;
            var currentScrollLeft = _this7._private.htmlCache.content.scrollLeft;

            if (currentScrollTop !== _this7._private.scrollVars.lastScrollTop) {
              if (currentScrollLeft !== 0) {
                _this7._private.htmlCache.content.scrollLeft = _this7._private.scrollVars.lastScrollLeft;
                var header = _this7._private.htmlCache.header.children[0].children[0];
                header.style.left = -_this7._private.scrollVars.lastScrollLeft + "px";
              }

              _this7.onScrollClickCancel();

              var isDownScroll = true;
              if (currentScrollTop < _this7._private.scrollVars.lastScrollTop) {
                isDownScroll = false;
              }

              var isLargeScroll;

              switch (true) {
                case currentScrollTop > _this7._private.scrollVars.lastScrollTop + _this7._private.largeScrollLimit:
                case currentScrollTop < _this7._private.scrollVars.lastScrollTop - _this7._private.largeScrollLimit:
                  isLargeScroll = true;
                  break;

                default:
                  isLargeScroll = false;
              }

              _this7._private.scrollVars.lastScrollTop = currentScrollTop;

              if (isLargeScroll) {
                if (_this7._private.renderOnScrollbarScroll) {
                  _this7.onNormalScrollingLarge(isDownScroll, currentScrollTop);
                } else {
                  console.log("scroll");
                  _this7.onScrollbarScrolling();
                }
              } else {
                _this7.onNormalScrolling(isDownScroll, currentScrollTop);
              }
            } else {

              if (_this7._private.htmlCache.content.style.overflowX === "hidden") {
                _this7._private.htmlCache.content.scrollLeft = 0;
                _this7._private.scrollVars.lastScrollLeft = 0;
                var header = _this7._private.htmlCache.header.children[0].children[0];
                header.style.left = 0 + "px";
              } else {
                if (_this7._private.scrollVars.lastScrollLeft !== currentScrollLeft) {
                  currentScrollLeft = _this7._private.htmlCache.content.scrollLeft;
                  var header = _this7._private.htmlCache.header.children[0].children[0];
                  header.style.left = -currentScrollLeft + "px";
                  _this7._private.scrollVars.lastScrollLeft = currentScrollLeft;
                }
              }

              if (_this7._private.lockedColumns > 0) {
                currentScrollLeft = _this7._private.htmlCache.content.scrollLeft;
                for (var lockedColNo = _this7._private.lockedColumns; lockedColNo--;) {

                  var fixHeader = _this7._private.node.querySelectorAll("." + _this7._private.css.rowHeaderColumn + lockedColNo);
                  var fixRow = _this7._private.node.querySelectorAll("." + _this7._private.css.rowColumn + lockedColNo);

                  for (var i = fixHeader.length; i--;) {
                    fixHeader[i].style.left = currentScrollLeft + "px";
                    fixHeader[i].style.zIndex = _this7._private.internalDragDropCount;
                    fixHeader[i].style.position = "relative";
                  }
                  for (var i = fixRow.length; i--;) {
                    fixRow[i].style.left = currentScrollLeft + "px";
                    fixRow[i].style.zIndex = _this7._private.internalDragDropCount;
                    fixRow[i].style.position = "relative";
                  }
                }
              }
            }
          };

          if (this._private.requestAnimationFrame) {
            requestAnimationFrame(function () {
              doScroll();
            });
          } else {
            doScroll();
          }
        };

        VGridGenerator.prototype.getRowNumberFromClickedOn = function getRowNumberFromClickedOn(e) {
          var thisTop;
          var x = 10;
          var node = e.target;
          for (var i = 0; i < x; i++) {
            try {
              if (node.classList.contains(this._private.css.row)) {
                for (var y = 0; y < this._private.htmlCache.rowsArray.length; y++) {
                  if (node.style.transform === this._private.htmlCache.rowsArray[y].div.style.transform) {
                    thisTop = this._private.htmlCache.rowsArray[y].top;
                  }
                }
              }
              node = node.offsetParent;
            } catch (x) {}
          }

          var rowHeight = this._private.rowHeight;
          var currentRow = Math.round(thisTop / rowHeight);
          return currentRow;
        };

        VGridGenerator.prototype.onRowClickAndHighligtHandler = function onRowClickAndHighligtHandler(e) {
          var _this8 = this;

          var isSel;

          var removeRowHighligt = function removeRowHighligt(currentRow) {
            var selectedRows, i;

            var removeFromArray = function removeFromArray(array, row) {
              array.splice(row, 1);
            };

            selectedRows = _this8._private.selection.getSelectedRows();
            for (i = 0; i < selectedRows.length; i++) {
              if (selectedRows[i] === currentRow) {
                removeFromArray(selectedRows, i);
                i--;
              }
            }
            _this8._private.selection.setSelectedRows(selectedRows);
          };

          var currentRow = this.getRowNumberFromClickedOn(e);
          var currentselectedRows = this._private.selection.getSelectedRows();

          if (currentRow !== this._private.selectionVars.lastRowSelected | currentselectedRows[0] !== currentRow) {
            this._private.selectionVars.onClicked = true;

            if (currentRow <= this._private.configFunctions.getCollectionLength() - 1) {

              if (this._private.isMultiSelect === true) {

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
                    console.log("error, this should not happend");
                }
              } else {
                this._private.selection.select(currentRow);
              }
              this._private.selectionVars.lastKeyKodeUsed = currentKeyKode;

              this.updateSelectionOnAllRows();
            }
          } else {
            if (e.ctrlKey) {
              currentKeyKode = "ctrl";
            }

            if (currentKeyKode === "ctrl") {
              this._private.selectionVars.lastKeyKodeUsed = currentKeyKode;
              isSel = this._private.selection.isSelected(currentRow);
              if (isSel === true) {
                removeRowHighligt(currentRow);
              }
              this._private.selectionVars.lastRowSelected = -1;
            } else {
              isSel = this._private.selection.isSelected(currentRow);
              this._private.selection.select(currentRow);
            }

            this.updateSelectionOnAllRows();
          }
        };

        VGridGenerator.prototype.updateGridScrollbars = function updateGridScrollbars() {

          var collectionHeight = this._private.configFunctions.getCollectionLength() * this._private.rowHeight;
          var bodyHeight = this._private.htmlCache.content.offsetHeight;


          if (collectionHeight <= bodyHeight) {
            this._private.htmlCache.content.scrollTop = 0;

            this._private.htmlCache.content.style.overflow = "";
            this._private.htmlCache.content.style.overflowY = "hidden";
            this._private.htmlCache.content.style.overflowX = "hidden";
          } else {
            this._private.htmlCache.content.style.overflow = "";
            this._private.htmlCache.content.style.overflowY = "scroll";
            this._private.htmlCache.content.style.overflowX = "hidden";
          }

          if (this._private.htmlCache.content.offsetWidth - 5 < this.getTotalColumnWidth()) {
            this._private.htmlCache.content.style.overflowX = "scroll";
          }
        };

        VGridGenerator.prototype.addResizableAndSortableEvent = function addResizableAndSortableEvent() {
          var _this9 = this;

          var resizable = false;
          var screenX;
          var xElement;
          var sortable = false;

          if (this._private.sortOnHeaderClick) {
            var orderByClick = function orderByClick(event) {
              if (!sortable && !resizable) {
                _this9._private.configFunctions.onOrderBy(event, function (sortorder) {
                  _this9._private.sortOrder = sortorder;
                  _this9.rebuildGridHeaderHtml();
                });
              }
            };
          }

          var orderBy = this._private.node.querySelectorAll("." + this._private.css.orderHandle);
          for (var i = 0; i < orderBy.length; i++) {
            orderBy[i].addEventListener("click", orderByClick.bind(this), false);
          }

          if (this._private.isResizableHeaders) {
            var x = this._private.htmlCache.header.querySelectorAll("." + this._private.css.rowHeaderCell);
            for (var i = 0; i < x.length; i++) {

              var temp = document.createElement("DIV");
              temp.classList.add(this._private.css.resizeHeaderDragHandle);

              temp.onmousedown = function (e) {
                var _this10 = this;

                resizable = true;

                if (this._private.isSortableHeader) {
                  this._private.sortableCtx.option("disabled", resizable);
                }
                screenX = e.screenX;
                xElement = this;
                var originalWidth = xElement.offsetParent.style.width;
                var originalWidthx = xElement.offsetParent.style.width;
                var index = xElement.offsetParent.getAttribute("column-no");


                this._private.htmlCache.header.onmousemove = function (e) {
                  _this10._private.htmlCache.header.onmouseup = function () {
                    setTimeout(function () {
                      resizable = false;
                      if (this._private.isSortableHeader) {
                        this._private.sortableCtx.option("disabled", resizable);
                      }
                    }, 30);

                    _this10._private.htmlCache.header.onmouseleave = "";
                    _this10._private.htmlCache.header.onmousemove = "";
                    _this10._private.htmlCache.header.onmouseup = "";


                    _this10._private.columnWidthArray[index] = parseInt(xElement.offsetParent.style.width);

                    _this10._private.htmlCache.rowTemplate = null;
                    _this10.correctRowAndScrollbodyWidth();

                    _this10.cacheRowTemplate();
                    _this10.updateGridScrollbars();
                    _this10.fillDataInRows(true);
                  };

                  _this10._private.htmlCache.header.onmouseleave = function (e) {
                    _this10._private.htmlCache.header.onmouseup(e);
                  };

                  if (resizable) {
                    var newWidth = parseInt(originalWidth) - (screenX - e.screenX) + "px";
                    _this10._private.columnWidthArray[index] = parseInt(newWidth);
                    xElement.offsetParent.style.width = parseInt(originalWidth) - (screenX - e.screenX) + "px";
                    xElement.offsetParent.style.width = parseInt(originalWidthx) - (screenX - e.screenX) + "px";
                    if (_this10._private.resizableHeadersAndRows) {
                      var columnsToFix = _this10._private.htmlCache.content.firstChild.querySelectorAll("." + _this10._private.css.rowColumn + index);

                      for (var col = 0; col < columnsToFix.length; col++) {
                        columnsToFix[col].style.width = newWidth;
                      }

                      _this10.correctRowAndScrollbodyWidth();
                      _this10.updateGridScrollbars();
                    }
                  } else {
                    _this10.correctHeaderAndScrollbodyWidth();
                  }
                };
              };

              x[i].appendChild(temp);
            }
          }

          if (this._private.isSortableHeader) {
            this._private.sortableCtx = new this.SimpleGridSortable(this._private.htmlCache.header.firstChild.firstChild, function (oldIndex, newIndex) {
              var children = _this9._private.htmlCache.header.firstChild.firstChild.children;

              var x;
              x = _this9._private.attributeArray[oldIndex];
              _this9._private.attributeArray.splice(oldIndex, 1);
              _this9._private.attributeArray.splice(newIndex, 0, x);

              x = _this9._private.queryHelper.filterArray[oldIndex];
              _this9._private.queryHelper.filterArray.splice(oldIndex, 1);
              _this9._private.queryHelper.filterArray.splice(newIndex, 0, x);

              x = _this9._private.headerArray[oldIndex];
              _this9._private.headerArray.splice(oldIndex, 1);
              _this9._private.headerArray.splice(newIndex, 0, x);

              x = _this9._private.columnWidthArray[oldIndex];
              _this9._private.columnWidthArray.splice(oldIndex, 1);
              _this9._private.columnWidthArray.splice(newIndex, 0, x);

              _this9._private.htmlCache.rowTemplate = null;
              _this9.cacheRowTemplate();
              _this9.rebuildColumns();
              sortable = false;
            }, function (n) {
              sortable = true;
            }, function (n) {
              sortable = false;
            });
          }
        };

        VGridGenerator.prototype.addEvents = function addEvents() {
          var _this11 = this;

          var handleClick = function handleClick(e) {
            var xTimer = setTimeout(function () {
              if (!_this11._private.disableRowClick) {
                if (_this11._private.isMultiSelect !== undefined) {
                  _this11.onRowClickAndHighligtHandler(e);
                }
                var currentRow = _this11.getRowNumberFromClickedOn(e);
                _this11._private.configFunctions.clickHandler(e, currentRow, null);
              }
            }, 200);
            _this11._private.scrollVars.clickTimersArray.push(xTimer);
          };

          var handleDblClick = function handleDblClick(e) {
            onScrollClickCancel();
            if (!_this11._private.disableRowClick) {
              if (_this11._private.isMultiSelect !== undefined) {
                _this11.onRowClickAndHighligtHandler(e);
              }
              var currentRow = _this11.getRowNumberFromClickedOn(e);
              _this11._private.configFunctions.clickHandler(e, currentRow, editCellhelper);
            }
          };

          var onMouseDownRow = function onMouseDownRow(e) {
            if (e.button === 2) {
              if (!_this11._private.disableRowClick) {
                var currentRow = _this11.getRowNumberFromClickedOn(e);
                _this11._private.configFunctions.clickHandler(e, currentRow, null);
              }
            }
          };

          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var div = this._private.htmlCache.rowsArray[i].div;

            div.addEventListener("dblclick", handleDblClick.bind(this), false);
            div.addEventListener("click", handleClick.bind(this), false);
            div.addEventListener("contextmenu", onMouseDownRow, false);
          }

          this._private.htmlCache.content.addEventListener("scroll", this.onScroll.bind(this));

          this.addResizableAndSortableEvent();
        };

        VGridGenerator.prototype.correctColumnsWidthArray = function correctColumnsWidthArray() {
          var newColumnWidth = [];
          for (var i = 0; i < this._private.attributeArray.length; i++) {
            var columnWidth = this._private.columnWidthArray[i] || 100;
            newColumnWidth.push(columnWidth);
          }
          this._private.columnWidthArray = newColumnWidth;
        };

        VGridGenerator.prototype.setLargeScrollLimit = function setLargeScrollLimit() {
          if (!this._private.largeScrollLimit) {
            this._private.largeScrollLimit = this._private.contentHeight * 3.3;
          }
        };

        VGridGenerator.prototype.addHtml = function addHtml() {
          this.cacheRowTemplate();

          this.createGridHtmlWrapper();
          this.createGridHtmlHeaderWrapper();
          this.createGridHtmlContentWrapper();
          this.createGridHtmlFooterWrapper();
          this.createGridHtmlScrollBodyWrapper();
          this.createGridHtmlRowWrapper();
          this.updateGridScrollbars();
        };

        VGridGenerator.prototype.init = function init(isRebuild) {
          this.correctColumnsWidthArray();
          this.addHtml();
          this.addEvents();
          if (!isRebuild) {
            this.setSelectionType();
          }

          if (this._private.predefinedScrolltop) {
            this.setScrollTop(this._private.predefinedScrolltop);
          }

          this.fillDataInRows();

          this.setLargeScrollLimit();
        };

        VGridGenerator.prototype.redrawGrid = function redrawGrid() {
          this._private.node.children[0].remove();
          this._private.htmlCache.rowsArray = [];
          this._private.htmlCache.header = null;
          this._private.htmlCache.content = null;
          this._private.htmlCache.footer = null;
          this._private.htmlCache.scrollBody = null;
          this._private.htmlCache.rowTemplate = null;

          this.init(true);
          this.fixHeaderWithBody();
        };

        VGridGenerator.prototype.fixHeaderWithBody = function fixHeaderWithBody() {
          var currentScrollLeft = this._private.htmlCache.content.scrollLeft;
          var header = this._private.htmlCache.header.children[0].children[0];
          header.style.left = -currentScrollLeft + "px";
          if (this._private.lockedColumns > 0) {
            currentScrollLeft = this._private.htmlCache.content.scrollLeft;
            for (var lockedColNo = this._private.lockedColumns; lockedColNo--;) {
              var fix = this._private.node.querySelectorAll("." + this._private.css.gridColumn + lockedColNo);

              for (var i = fix.length; i--;) {
                fix[i].style.left = currentScrollLeft + "px";
                fix[i].style.zIndex = this._private.internalDragDropCount;
                fix[i].style.position = "relative";
              }
            }
          }
        };

        VGridGenerator.prototype.rebuildColumns = function rebuildColumns() {
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

        VGridGenerator.prototype.columnChangeAndCollection = function columnChangeAndCollection(resetScrollToTop) {
          this.correctColumnsWidthArray();
          this._private.htmlCache.rowTemplate = null;
          this.cacheRowTemplate();
          this.rebuildGridHeaderHtml();
          this.fillDataInRows(true);
          this.updateSelectionOnAllRows();
          this.collectionChange(resetScrollToTop);
        };

        VGridGenerator.prototype.collectionChange = function collectionChange(resetScrollToTop) {
          this.setScrollBodyHeightToVar();
          this._private.htmlCache.scrollBody.style.height = this._private.scrollBodyHeight + "px";

          if (resetScrollToTop === true) {
            this._private.htmlCache.content.scrollTop = 0;
          }
          if (this._private.scrollBodyHeight < this._private.htmlCache.content.scrollTop) {
            this._private.htmlCache.content.scrollTop = this._private.scrollBodyHeight - 100;
          }

          this.updateGridScrollbars();
          this.correctRowAndScrollbodyWidth();
          this.updateSelectionOnAllRows();
          this.fixHeaderWithBody();
          this.fillDataInRows(true);
          this.onScrollbarScrolling();
        };

        VGridGenerator.prototype.setRowHeight = function setRowHeight(newHeight) {
          this._private.rowHeight = newHeight;
          this.redrawGrid();
        };

        VGridGenerator.prototype.setHeaderHeight = function setHeaderHeight(newHeight) {
          this._private.headerHeight = newHeight;
          this.redrawGrid();
        };

        VGridGenerator.prototype.setFooterHeight = function setFooterHeight(newHeight) {
          this._private.footerHeight = newHeight;
          this.redrawGrid();
        };

        VGridGenerator.prototype.disableHeaderFilter = function disableHeaderFilter() {
          this._private.queryHelper.addFilter = false;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.enableHeaderFilter = function enableHeaderFilter() {
          this._private.queryHelper.addFilter = true;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setHeaderFilterAtBottom = function setHeaderFilterAtBottom() {
          this._private.queryHelper.filterOnAtTop = false;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setHeaderFilterAtTop = function setHeaderFilterAtTop() {
          this._private.queryHelper.filterOnAtTop = true;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setColumns = function setColumns(paramObj) {
          this._private.headerArray = paramObj.headerArray;
          this._private.attributeArray = paramObj.attributeArray;
          this._private.columnWidthArray = paramObj.columnWidthArray;
        };

        VGridGenerator.prototype.getColumns = function getColumns() {
          return {
            "headerArray": this._private.headerArray,
            "attributeArray": this._private.attributeArray,
            "columnWidthArray": this._private.columnWidthArray
          };
        };

        VGridGenerator.prototype.setLockedColumns = function setLockedColumns(numberOfLockedColumns) {
          this._private.lockedColumns = numberOfLockedColumns;
          this.rebuildColumns();
        };

        VGridGenerator.prototype.enableResizableColumns = function enableResizableColumns(option) {
          this._private.isResizableHeaders = true;
          this._private.resizableHeadersAndRows = option;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.disableResizableColumns = function disableResizableColumns() {
          this._private.isResizableHeaders = false;
          this._private.resizableHeadersAndRows = false;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.enableSortableColumns = function enableSortableColumns() {
          this._private.isSortableHeader = true;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.disableSortablebleColumns = function disableSortablebleColumns() {
          this._private.isSortableHeader = false;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setMultiSelection = function setMultiSelection(keepSelection) {
          this._private.isMultiSelect = true;
          this._private.selectionMode = "multible";
          if (!keepSelection) {
            this._private.$selectedRows = [];
          }
          this.updateSelectionOnAllRows();
        };

        VGridGenerator.prototype.setSingleSelection = function setSingleSelection(keepSelection) {
          this._private.isMultiSelect = false;
          this._private.selectionMode = "single";
          if (!keepSelection) {
            this._private.$selectedRows = [];
          }
          this.updateSelectionOnAllRows();
        };

        VGridGenerator.prototype.disableSelection = function disableSelection(keepSelection) {
          this._private.isMultiSelect = undefined;
          this._private.selectionMode = "none";
          if (!keepSelection) {
            this._private.$selectedRows = [];
          }
          this.updateSelectionOnAllRows();
        };

        VGridGenerator.prototype.getSelectedRows = function getSelectedRows() {
          return this.selection.getSelectedRows();
        };

        VGridGenerator.prototype.setSelectedRows = function setSelectedRows(sel) {
          this.selection.setSelectedRows(sel);
          this.updateSelectionOnAllRows();
        };

        VGridGenerator.prototype.scrollBottom = function scrollBottom() {
          var collectionLength = this._private.configFunctions.getCollectionLength();
          this._private.htmlCache.content.scrollTop = collectionLength * this._private.rowHeight;
        };

        VGridGenerator.prototype.scrollTop = function scrollTop() {
          this._private.htmlCache.content.scrollTop = 0;
        };

        VGridGenerator.prototype.setScrollTop = function setScrollTop(newTop) {
          this._private.htmlCache.content.scrollTop = newTop;
        };

        VGridGenerator.prototype.getScrollTop = function getScrollTop() {
          return this._private.htmlCache.content.scrollTop;
        };

        VGridGenerator.prototype.updateRow = function updateRow(no, clear) {
          this.fillDataIntoRow(no, clear);
        };

        VGridGenerator.prototype.clearHeaderFilter = function clearHeaderFilter() {
          this._private.sortOrder = [];
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setHeaderFilter = function setHeaderFilter(sortOrder) {
          this._private.sortOrder = sortOrder;
          this.rebuildGridHeaderHtml();
        };

        return VGridGenerator;
      }());

      _export("VGridGenerator", VGridGenerator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3ItYXNFUzYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBT2E7QUFHWCxpQkFIVyxjQUdYLENBQVksYUFBWixFQUEyQixRQUEzQixFQUFxQyxPQUFyQyxFQUE4QyxTQUE5QyxFQUF5RCxrQkFBekQsRUFBNEU7Z0NBSGpFLGdCQUdpRTs7ZUFhNUUsV0FBVyxHQWJpRTs7QUFDMUUsZUFBSyxhQUFMLEdBQXFCLGFBQXJCLENBRDBFO0FBRTFFLGVBQUssUUFBTCxHQUFnQixRQUFoQixDQUYwRTtBQUcxRSxlQUFLLE9BQUwsR0FBZSxPQUFmLENBSDBFO0FBSTFFLGVBQUssU0FBTCxHQUFpQixTQUFqQixDQUowRTtBQUsxRSxlQUFLLGtCQUFMLEdBQTBCLGtCQUExQixDQUwwRTtBQU0xRSxlQUFLLFNBQUwsQ0FBZSxhQUFmLEVBTjBFO0FBTzFFLGVBQUssSUFBTCxDQUFVLEtBQVYsRUFQMEU7U0FBNUU7O0FBSFcsaUNBaUJYLCtCQUFXLFNBQVM7QUFDbEIsZUFBSyxRQUFMLEdBQWdCO0FBQ2Qsa0JBQU0sS0FBSyxPQUFMO0FBQ04sMEJBQWMsUUFBUSxZQUFSLElBQXdCLENBQXhCO0FBQ2QsdUJBQVcsUUFBUSxTQUFSLElBQXFCLEVBQXJCO0FBQ1gsMEJBQWMsUUFBUSxZQUFSLElBQXdCLENBQXhCO0FBQ2QsNkJBQWlCLFFBQVEsZUFBUixJQUEyQixHQUEzQjtBQUNqQix5QkFBYSxRQUFRLFdBQVIsSUFBdUIsRUFBdkI7QUFDYiw0QkFBZ0IsUUFBUSxjQUFSLElBQTBCLEVBQTFCO0FBQ2hCLDhCQUFrQixRQUFRLGdCQUFSLElBQTRCLEVBQTVCO0FBQ2xCLDJCQUFnQixRQUFRLGFBQVIsSUFBeUIsRUFBekI7QUFDaEIsOEJBQWtCLFFBQVEsZ0JBQVIsSUFBNEIsS0FBNUI7QUFDbEIsK0JBQW1CLFFBQVEsaUJBQVIsSUFBNkIsS0FBN0I7QUFDbkIsZ0NBQW9CLFFBQVEsa0JBQVIsSUFBOEIsS0FB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QUFDLGFBQUQsRUFBZ0I7QUFDbEIsaUJBQUssUUFBTCxDQUFjLGFBQWQsR0FBOEIsRUFBOUIsQ0FEa0I7V0FBcEI7QUFHQSxlQUFLLHdCQUFMLEdBTmdDOzs7QUF6bkV2QixpQ0Ftb0VYLDZDQUFpQixlQUFlO0FBQzlCLGVBQUssUUFBTCxDQUFjLGFBQWQsR0FBOEIsU0FBOUIsQ0FEOEI7QUFFOUIsZUFBSyxRQUFMLENBQWMsYUFBZCxHQUE4QixNQUE5QixDQUY4QjtBQUc5QixjQUFJLENBQUMsYUFBRCxFQUFnQjtBQUNsQixpQkFBSyxRQUFMLENBQWMsYUFBZCxHQUE4QixFQUE5QixDQURrQjtXQUFwQjtBQUdBLGVBQUssd0JBQUwsR0FOOEI7OztBQW5vRXJCLGlDQTZvRVgsNkNBQWlCO0FBQ2YsaUJBQU8sS0FBSyxTQUFMLENBQWUsZUFBZixFQUFQLENBRGU7OztBQTdvRU4saUNBa3BFWCwyQ0FBaUIsS0FBSztBQUNwQixlQUFLLFNBQUwsQ0FBZSxlQUFmLENBQStCLEdBQS9CLEVBRG9CO0FBRXBCLGVBQUssd0JBQUwsR0FGb0I7OztBQWxwRVgsaUNBd3BFWCx1Q0FBaUI7QUFDZixjQUFJLG1CQUFtQixLQUFLLFFBQUwsQ0FBYyxlQUFkLENBQThCLG1CQUE5QixFQUFuQixDQURXO0FBRWYsZUFBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFnQyxTQUFoQyxHQUE0QyxtQkFBbUIsS0FBSyxRQUFMLENBQWMsU0FBZCxDQUZoRDs7O0FBeHBFTixpQ0E4cEVYLGlDQUFhO0FBQ1gsZUFBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFnQyxTQUFoQyxHQUE0QyxDQUE1QyxDQURXOzs7QUE5cEVGLGlDQW1xRVgscUNBQWMsUUFBUTtBQUNwQixlQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLE9BQXhCLENBQWdDLFNBQWhDLEdBQTRDLE1BQTVDLENBRG9COzs7QUFucUVYLGlDQXdxRVgsdUNBQWdCO0FBQ2QsaUJBQU8sS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFnQyxTQUFoQyxDQURPOzs7QUF4cUVMLGlDQTZxRVgsK0JBQVcsSUFBSSxPQUFPO0FBQ3BCLGVBQUssZUFBTCxDQUFxQixFQUFyQixFQUF5QixLQUF6QixFQURvQjs7O0FBN3FFWCxpQ0FpckVYLGlEQUFxQjtBQUNuQixlQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLEVBQTFCLENBRG1CO0FBRW5CLGVBQUsscUJBQUwsR0FGbUI7OztBQWpyRVYsaUNBc3JFWCwyQ0FBaUIsV0FBVztBQUMxQixlQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLFNBQTFCLENBRDBCO0FBRTFCLGVBQUsscUJBQUwsR0FGMEI7OztlQXRyRWpCIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1nZW5lcmF0b3ItYXNFUzYuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
