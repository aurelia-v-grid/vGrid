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
            isSortableHeader: options.isSortableHeader,
            sortOnHeaderClick: options.sortOnHeaderClick,
            isResizableHeaders: options.isResizableHeaders,
            predefinedScrolltop: options.predefinedScrolltop,
            requestAnimationFrame: options.requestAnimationFrame,
            internalDragDropCount: 10,
            resizableHeadersAndRows: options.resizableHeadersAndRows,
            isMultiSelect: options.isMultiSelect,
            renderOnScrollbarScroll: options.renderOnScrollbarScroll,
            columnWidthArrayOverride: options.columnWidthArrayOverride,
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
              addFilter: options.addFilter,
              doNotAddFilterTo: options.doNotAddFilterTo || [],
              filterOnKey: options.filterOnKey,
              filterOnAtTop: options.filterOnAtTop,
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
              if (row.div.firstChild) {
                row.div.removeChild(row.div.firstChild);
              }
            }
            this.insertRowMarkup(currentRow, row.div, true, true);
          }
        };

        VGridGenerator.prototype.getSortIcon = function getSortIcon(attribute) {
          var _this2 = this;

          var result;

          var lineHeigthStyleTag;
          if (!this._private.queryHelper.addFilter) {
            lineHeigthStyleTag = "style=line-height:" + this._private.headerHeight + "px;\"";
          } else {
            lineHeigthStyleTag = "style=line-height:" + this._private.headerHeight / 2 + "px;\"";
          }

          if (this._private.sortOnHeaderClick) {
            var main = "<span class=\"\"><span " + lineHeigthStyleTag + " class=\"" + this._private.css.sortIcon + " " + this._private.css.sortIconSort + "\"></span></span>";
            if (this._private.sortOrder.length === 0) {
              result = main;
            } else {
              this._private.sortOrder.forEach(function (x) {
                if (x.attribute === attribute) {
                  var isAsc = "<span " + lineHeigthStyleTag + " class=\"" + _this2._private.css.sortIcon + " " + _this2._private.css.sortIconAsc + "\"></span>";
                  var isDesc = "<span " + lineHeigthStyleTag + " class=\"" + _this2._private.css.sortIcon + " " + _this2._private.css.sortIconDesc + "\"></span>";

                  var asc = x.asc === true ? isAsc : isDesc;
                  var main = "<span " + lineHeigthStyleTag + " class=\"" + _this2._private.css.sortIcon + " " + _this2._private.css.sortIconNo + x.no + "\">";
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
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this._private.htmlCache.rowsArray[i].top / this._private.rowHeight;
            if (rowno === currentRow) {
              var row = this._private.htmlCache.rowsArray[i];
              if (clearRow) {
                if (row.div.firstChild) {
                  row.div.removeChild(row.div.firstChild);
                }
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
          var dragHandle = this._private.isSortableHeader ? this._private.css.dragHandle : "";
          var css = dragHandle + " " + this._private.css.cellContent + " " + this._private.css.orderHandle;
          for (var i = 0; i < headerNamesArray.length; i++) {
            var sortIcon = this.getSortIcon(attributeNamesArray[i]);
            rowTemplate = rowTemplate + ("<div><div class=\"" + css + "\" " + this._private.atts.dataAttribute + "=\"" + attributeNamesArray[i] + "\">" + headerNamesArray[i] + sortIcon + "</div></div>");
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
              var test = function test() {
                console.log("test");
              };
              for (var i = 0; i < attributeNamesArray.length; i++) {
                rowTemplate = rowTemplate + ("<div><input class=\"" + this._private.css.cellContent + "\"  readonly=\"true\" style=\"" + this._private.colStyleArray[i] + "\" " + this._private.atts.dataAttribute + "=\"" + attributeNamesArray[i] + "\" value=\"{{" + attributeNamesArray[i] + "}}\" ></input></div>");
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

            if (!this._private.queryHelper.addFilter) {
              tempColumns.children[i].style["line-height"] = this._private.headerHeight + "px";
            }

            tempColumns.children[i].style.height = "100%";
            tempColumns.children[i].style.width = this._private.columnWidthArray[i] + "px";
            tempColumns.children[i].classList.add(this._private.css.rowHeaderCell);
            tempColumns.children[i].classList.add(this._private.css.rowHeaderColumn + i);
            tempColumns.children[i].classList.add(this._private.css.gridColumn + i);
          }

          var row = document.createElement("DIV");
          row.className = this._private.css.row + " " + this._private.css.rowHeader;

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

              tempColumns.children[i].style["line-height"] = this._private.rowHeight + "px";

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
          rowArray[elementNo].div.style.transform = "translate3d(0px," + topValue + "px, 0px)";
          rowArray[elementNo].top = topValue;
        };

        VGridGenerator.prototype.createGridHtmlWrapper = function createGridHtmlWrapper() {
          var x = document.createElement("DIV");
          this._private.node.appendChild(x);
          this._private.htmlCache.grid = x;

          this._private.htmlCache.grid.className = this._private.css.wrapper;
          this._private.htmlCache.grid.style.position = "relative";
          this._private.htmlCache.grid.style.height = this._private.node.style.height || "100%";
          this._private.htmlCache.grid.style.width = this._private.node.style.width || "100%";

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

        VGridGenerator.prototype.editCellhelper = function editCellhelper(e, readOnly, callback, callbackKey) {
          var _this4 = this;

          try {
            var clicked = false;
            var myElement = e.target;
            if (myElement.className === this._private.css.cellContent) {
              this._private.disableRowClick = true;
              var attributeName = myElement.getAttribute(this._private.atts.dataAttribute);
              var oldValue = myElement.value;

              myElement.removeAttribute("readonly");

              myElement.classList.add("vGrid-editCell");

              myElement.onblur = function () {
                myElement.classList.remove("vGrid-editCell");
                var newValue = myElement.value;
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
                  _this4._private.disableRowClick = false;
                } else {
                  callback({
                    attribute: attributeName,
                    value: newValue,
                    oldValue: oldValue,
                    element: myElement
                  });
                  _this4._private.disableRowClick = false;
                }
              };

              var ctrlDown = false;
              var ctrlKey = 17,
                  vKey = 86,
                  cKey = 67;

              myElement.onkeyup = function (ex) {

                if (ex.keyCode == ctrlKey) {
                  ctrlDown = false;
                } else {
                  callbackKey({
                    attribute: attributeName,
                    value: myElement.value,
                    oldValue: oldValue,
                    element: myElement
                  });
                }
              };

              myElement.onkeydown = function (e) {
                if (e.keyCode == 13) {
                  return false;
                }
                if (readOnly === true) {
                  return false;
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
          var _this5 = this;

          var triggerRan = false;

          var attributeName = event.attributeName;
          var headerName = event.headerName;
          var defaultFilter = event.defaultFilter;

          var onChangeEventOnFilter = function onChangeEventOnFilter(e) {

            if (e.keyCode !== 9) {
              triggerRan = true;
              setTimeout(function () {
                triggerRan = false;
              }, 300);

              var queryHtmlInput = _this5._private.node.querySelectorAll("." + _this5._private.css.filterHandle);

              var queryParams = [];
              for (var i = 0; i < queryHtmlInput.length; i++) {
                if (queryHtmlInput[i].value !== "" && queryHtmlInput[i].value !== undefined) {
                  var dataSourceAttribute = queryHtmlInput[i].getAttribute(_this5._private.atts.dataAttribute);
                  var operator = _this5._private.queryHelper.filterArray[_this5._private.attributeArray.indexOf(dataSourceAttribute)];

                  var value = queryHtmlInput[i].value;

                  queryParams.push({
                    attribute: dataSourceAttribute,
                    value: value,
                    operator: operator
                  });

                  _this5._private.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value;
                } else {

                  if (queryHtmlInput[i].value === "") {
                    var dataSourceAttribute = queryHtmlInput[i].getAttribute(_this5._private.atts.dataAttribute);
                    _this5._private.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value = "";
                  }
                }
              }
              _this5._private.configFunctions.onFilterRun(queryParams);
            }
          };

          var onKeyUpEventOnFilter = function onKeyUpEventOnFilter(e) {
            if (e.keyCode === 13 && triggerRan === false) {
              e.target.onchange(e);
            }
          };

          var getHeaderCellMarkup = function getHeaderCellMarkup(labelTopCell, valueInput, attribute) {

            var dragHandle = _this5._private.isSortableHeader ? _this5._private.css.dragHandle : "";

            var cssLabel = _this5._private.css.cellContent + " " + _this5._private.css.filterLabelBottom + " " + dragHandle + " " + _this5._private.css.orderHandle;
            var cssInput = _this5._private.css.cellContent + " " + _this5._private.css.filterInputBottom + " " + _this5._private.css.filterHandle;

            if (_this5._private.queryHelper.filterOnAtTop) {
              cssLabel = _this5._private.css.cellContent + " " + _this5._private.css.filterLabelTop + " " + dragHandle + " " + _this5._private.css.orderHandle;
              cssInput = _this5._private.css.cellContent + " " + _this5._private.css.filterInputTop + " " + _this5._private.css.filterHandle;
            }

            var sortIcon = _this5.getSortIcon(attribute);

            var filter = _this5._private.queryHelper.filterArray[_this5._private.attributeArray.indexOf(attribute)] || "filter";
            var filterName = _this5._private.configFunctions.getFilterName(filter);

            var lineHeigth = "line-height:" + _this5._private.headerHeight / 2 + "px;";

            var cellLabel = "<div style=\"" + lineHeigth + "\" class=\"" + cssLabel + "\" " + _this5._private.atts.dataAttribute + "=\"" + attribute + "\">" + labelTopCell + " " + sortIcon + "</div>";
            var cellInput = "<input style=\"" + lineHeigth + "\" placeholder=\"" + filterName + "\" class=\"" + cssInput + "\" " + _this5._private.atts.dataAttribute + "=\"" + attribute + "\" value=\"" + valueInput + "\"/>";

            if (_this5._private.queryHelper.doNotAddFilterTo.indexOf(attribute) !== -1) {
              cellInput = "<div class=\"" + cssLabel + "\" " + _this5._private.atts.dataAttribute + "=\"" + attribute + "\"></div>";
            }

            var result;
            if (_this5._private.queryHelper.filterOnAtTop) {
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

          var onFocus = function onFocus(e) {
            var currentScrollLeft = e.target.offsetParent.offsetParent.offsetParent.scrollLeft;
            _this5._private.htmlCache.content.scrollLeft = currentScrollLeft;
          };

          event.div.innerHTML = getHeaderCellMarkup(headerName, value, attributeName);

          var cellInputElement = event.div.querySelectorAll("." + this._private.css.filterHandle);
          if (this._private.queryHelper.filterOnKey !== true) {
            for (var i = 0; i < cellInputElement.length; i++) {
              cellInputElement[i].onchange = onChangeEventOnFilter;
              cellInputElement[i].onkeyup = onKeyUpEventOnFilter;
              cellInputElement[i].onfocus = onFocus;
            }
          } else {
            for (var i = 0; i < cellInputElement.length; i++) {
              cellInputElement[i].onkeyup = onChangeEventOnFilter;
              cellInputElement[i].onfocus = onFocus;
            }
          }
        };

        VGridGenerator.prototype.onNormalScrollingLarge = function onNormalScrollingLarge() {
          var _this6 = this;

          this._private.scrollVars.lastScrollTop = this._private.htmlCache.content.scrollTop;

          if (this._private.htmlCache.content.scrollTop === 0 && this._private.scrollVars.lastScrollTop !== this._private.htmlCache.content.scrollTop) {
            this._private.scrollVars.lastScrollTop = 0;
          }

          if (this._private.configFunctions.getCollectionLength() <= this._private.htmlCache.rowsArray.length) {
            this._private.scrollVars.lastScrollTop = 0;
          }

          var currentRow = parseInt(this._private.scrollVars.lastScrollTop / this._private.rowHeight, 10);
          this._private.scrollVars.firstTop = currentRow * this._private.rowHeight;
          var currentRowTop = this._private.rowHeight * currentRow;
          var bottomHitCount;
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var setNewTopOnRow = function setNewTopOnRow(cacheRowNumber) {
              var row = _this6._private.htmlCache.rowsArray[cacheRowNumber];
              _this6.setRowTopValue([row], 0, currentRowTop);

              if (row.div.firstChild) {
                row.div.removeChild(row.div.firstChild);
              }
              currentRowTop = currentRowTop + _this6._private.rowHeight;
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

            if (currentRow >= this._private.configFunctions.getCollectionLength() && currentRowTop >= this._private.htmlCache.content.clientHeight) {
              var row = this._private.htmlCache.rowsArray[i];
              this.setRowTopValue([row], 0, currentRowTop - 5000);
              if (row.div.firstChild) {
                row.div.removeChild(row.div.firstChild);
              }
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
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var row = this._private.htmlCache.rowsArray[i];
            var rowTop = parseInt(row.top, 10);
            if (rowTop > (this._private.configFunctions.getCollectionLength() - 1) * this._private.rowHeight && rowTop > parseInt(this._private.htmlCache.content.style.height) - this._private.rowHeight) {
              this.setRowTopValue([row], 0, -5000 + i);
            }
          }

          this._private.htmlCache.rowsArray.sort(function (a, b) {
            return parseInt(a.top) - parseInt(b.top);
          });
        };

        VGridGenerator.prototype.onScrollbarScrolling = function onScrollbarScrolling() {
          var _this7 = this;

          this._private.scrollVars.halt = true;

          var timeout = this._private.dataScrollDelay;

          clearTimeout(this._private.scrollVars.timer);

          this._private.scrollVars.timer = setTimeout(function () {
            _this7.onNormalScrollingLarge();
            _this7._private.scrollVars.halt = false;
          }, timeout);
        };

        VGridGenerator.prototype.onScrollClickCancel = function onScrollClickCancel() {
          var _this8 = this;

          this._private.scrollVars.clickTimersArray.forEach(function (xTimer) {
            clearTimeout(xTimer);
          });

          if (this._private.scrollVars.clickTimersArray.length > 0) {
            setTimeout(function () {
              _this8._private.scrollVars.clickTimersArray.forEach(function (xTimer) {
                clearTimeout(xTimer);
              });
            }, 0);
          }
        };

        VGridGenerator.prototype.onScroll = function onScroll() {
          var _this9 = this;

          var doScroll = function doScroll() {
            var currentScrollTop = _this9._private.htmlCache.content.scrollTop;
            var currentScrollLeft = _this9._private.htmlCache.content.scrollLeft;

            if (currentScrollTop !== _this9._private.scrollVars.lastScrollTop) {
              if (currentScrollLeft !== 0) {
                _this9._private.htmlCache.content.scrollLeft = _this9._private.scrollVars.lastScrollLeft;
                var header = _this9._private.htmlCache.header.children[0].children[0];
                header.style.left = -_this9._private.scrollVars.lastScrollLeft + "px";
              }

              _this9.onScrollClickCancel();

              var isDownScroll = true;
              if (currentScrollTop < _this9._private.scrollVars.lastScrollTop) {
                isDownScroll = false;
              }

              var isLargeScroll;

              switch (true) {
                case currentScrollTop > _this9._private.scrollVars.lastScrollTop + _this9._private.largeScrollLimit:
                case currentScrollTop < _this9._private.scrollVars.lastScrollTop - _this9._private.largeScrollLimit:
                  isLargeScroll = true;
                  break;

                default:
                  isLargeScroll = false;
              }

              _this9._private.scrollVars.lastScrollTop = currentScrollTop;

              if (isLargeScroll) {
                if (_this9._private.renderOnScrollbarScroll) {
                  _this9.onNormalScrollingLarge(isDownScroll, currentScrollTop);
                } else {
                  console.log("scroll");
                  _this9.onScrollbarScrolling();
                }
              } else {
                _this9.onNormalScrolling(isDownScroll, currentScrollTop);
              }
            } else {

              if (_this9._private.htmlCache.content.style.overflowX === "hidden") {
                _this9._private.htmlCache.content.scrollLeft = 0;
                _this9._private.scrollVars.lastScrollLeft = 0;
                var header = _this9._private.htmlCache.header.children[0].children[0];
                header.style.left = 0 + "px";
              } else {
                if (_this9._private.scrollVars.lastScrollLeft !== currentScrollLeft) {
                  currentScrollLeft = _this9._private.htmlCache.content.scrollLeft;
                  var header = _this9._private.htmlCache.header.children[0].children[0];
                  header.style.left = -currentScrollLeft + "px";
                  _this9._private.scrollVars.lastScrollLeft = currentScrollLeft;
                }
              }

              if (_this9._private.lockedColumns > 0) {
                currentScrollLeft = _this9._private.htmlCache.content.scrollLeft;
                for (var lockedColNo = _this9._private.lockedColumns; lockedColNo--;) {

                  var fixHeader = _this9._private.node.querySelectorAll("." + _this9._private.css.rowHeaderColumn + lockedColNo);
                  var fixRow = _this9._private.node.querySelectorAll("." + _this9._private.css.rowColumn + lockedColNo);

                  for (var i = fixHeader.length; i--;) {
                    fixHeader[i].style.left = currentScrollLeft + "px";
                    fixHeader[i].style.zIndex = _this9._private.internalDragDropCount;
                    fixHeader[i].style.position = "relative";
                  }
                  for (var i = fixRow.length; i--;) {
                    fixRow[i].style.left = currentScrollLeft + "px";
                    fixRow[i].style.zIndex = _this9._private.internalDragDropCount;
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
          var _this10 = this;

          var isSel;

          var removeRowHighligt = function removeRowHighligt(currentRow) {
            var selectedRows, i;

            var removeFromArray = function removeFromArray(array, row) {
              array.splice(row, 1);
            };

            selectedRows = _this10._private.selection.getSelectedRows();
            for (i = 0; i < selectedRows.length; i++) {
              if (selectedRows[i] === currentRow) {
                removeFromArray(selectedRows, i);
                i--;
              }
            }
            _this10._private.selection.setSelectedRows(selectedRows);
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

          var collectionHeight = this._private.configFunctions.getCollectionLength() * this._private.rowHeight + this._private.rowHeight / 2;
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
          var _this11 = this;

          var resizable = false;
          var screenX;
          var xElement;
          var sortable = false;

          if (this._private.sortOnHeaderClick) {
            var orderByClick = function orderByClick(event) {
              if (!sortable && !resizable) {
                _this11._private.configFunctions.onOrderBy(event, function (sortorder) {
                  _this11._private.sortOrder = sortorder;
                  _this11.rebuildGridHeaderHtml();
                });
              }
            };

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

              temp.onmousedown = function (e) {
                resizable = true;

                if (_this11._private.isSortableHeader) {
                  _this11._private.sortableCtx.option("disabled", resizable);
                }
                screenX = e.screenX;
                xElement = e.target;
                var originalWidth = xElement.offsetParent.style.width;
                var originalWidthx = xElement.offsetParent.style.width;
                var index = xElement.offsetParent.getAttribute("column-no");


                _this11._private.htmlCache.header.onmousemove = function (e) {
                  _this11._private.htmlCache.header.onmouseup = function () {
                    setTimeout(function () {
                      resizable = false;
                      if (_this11._private.isSortableHeader) {
                        _this11._private.sortableCtx.option("disabled", resizable);
                      }
                    }, 30);

                    _this11._private.htmlCache.header.onmouseleave = "";
                    _this11._private.htmlCache.header.onmousemove = "";
                    _this11._private.htmlCache.header.onmouseup = "";


                    _this11._private.columnWidthArray[index] = parseInt(xElement.offsetParent.style.width);

                    _this11._private.htmlCache.rowTemplate = null;
                    _this11.correctRowAndScrollbodyWidth();

                    _this11.cacheRowTemplate();
                    _this11.updateGridScrollbars();
                    _this11.fillDataInRows(true);
                  };

                  _this11._private.htmlCache.header.onmouseleave = function (e) {
                    _this11._private.htmlCache.header.onmouseup(e);
                  };

                  if (resizable) {
                    var newWidth = parseInt(originalWidth) - (screenX - e.screenX) + "px";
                    _this11._private.columnWidthArray[index] = parseInt(newWidth);
                    xElement.offsetParent.style.width = parseInt(originalWidth) - (screenX - e.screenX) + "px";
                    xElement.offsetParent.style.width = parseInt(originalWidthx) - (screenX - e.screenX) + "px";
                    if (_this11._private.resizableHeadersAndRows) {
                      var columnsToFix = _this11._private.htmlCache.content.firstChild.querySelectorAll("." + _this11._private.css.rowColumn + index);

                      for (var col = 0; col < columnsToFix.length; col++) {
                        columnsToFix[col].style.width = newWidth;
                      }

                      _this11.correctRowAndScrollbodyWidth();
                      _this11.updateGridScrollbars();
                    }
                  } else {
                    _this11.correctHeaderAndScrollbodyWidth();
                  }
                };
              };

              x[i].appendChild(temp);
            }
          }

          var canMove = false;
          var dragHandles = this._private.htmlCache.grid.querySelectorAll("." + this._private.css.dragHandle);
          [].slice.call(dragHandles).forEach(function (itemEl) {
            itemEl.onmouseenter = function () {
              canMove = true;
            };
            itemEl.onmouseleave = function () {
              canMove = false;
            };
          });

          if (this._private.isSortableHeader) {
            this._private.sortableCtx = new this.SimpleGridSortable(this._private.htmlCache.header.firstChild.firstChild, function (oldIndex, newIndex) {
              var children = _this11._private.htmlCache.header.firstChild.firstChild.children;

              var x;
              x = _this11._private.attributeArray[oldIndex];
              _this11._private.attributeArray.splice(oldIndex, 1);
              _this11._private.attributeArray.splice(newIndex, 0, x);

              x = _this11._private.queryHelper.filterArray[oldIndex];
              _this11._private.queryHelper.filterArray.splice(oldIndex, 1);
              _this11._private.queryHelper.filterArray.splice(newIndex, 0, x);

              x = _this11._private.headerArray[oldIndex];
              _this11._private.headerArray.splice(oldIndex, 1);
              _this11._private.headerArray.splice(newIndex, 0, x);

              x = _this11._private.columnWidthArray[oldIndex];
              _this11._private.columnWidthArray.splice(oldIndex, 1);
              _this11._private.columnWidthArray.splice(newIndex, 0, x);

              x = _this11._private.colStyleArray[oldIndex];
              _this11._private.colStyleArray.splice(oldIndex, 1);
              _this11._private.colStyleArray.splice(newIndex, 0, x);

              _this11._private.htmlCache.rowTemplate = null;
              _this11.cacheRowTemplate();
              _this11.rebuildColumns();
              sortable = false;
            }, function (n) {
              sortable = true;
            }, function (n) {
              sortable = false;
            }, function () {
              return canMove;
            });
          }
        };

        VGridGenerator.prototype.addEvents = function addEvents() {
          var _this12 = this;

          var handleClick = function handleClick(e) {};

          var handleDblClick = function handleDblClick(e) {
            if (!_this12._private.disableRowClick) {
              if (_this12._private.isMultiSelect !== undefined) {
                _this12.onRowClickAndHighligtHandler(e);
              }
              var currentRow = _this12.getRowNumberFromClickedOn(e);
              _this12._private.configFunctions.clickHandler(e, currentRow, _this12.editCellhelper.bind(_this12));
            }
          };

          var onMouseDownRow = function onMouseDownRow(e) {
            if (e.button === 2) {
              if (!_this12._private.disableRowClick) {
                var currentRow = _this12.getRowNumberFromClickedOn(e);
                _this12._private.configFunctions.clickHandler(e, currentRow, null);
              }
            }
          };

          var onFocus = function onFocus(e) {
            var x = e.target.offsetParent.offsetLeft;
            if (x > _this12._private.htmlCache.content.clientWidth || x < _this12._private.htmlCache.content.scrollLeft) {
              _this12._private.htmlCache.content.scrollLeft = x;
            }
            if (!_this12._private.disableRowClick) {
              if (_this12._private.isMultiSelect !== undefined) {
                _this12.onRowClickAndHighligtHandler(e);
              }
            }
            var currentRow = _this12.getRowNumberFromClickedOn(e);
            _this12._private.configFunctions.clickHandler(e, currentRow, null);
          };

          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var div = this._private.htmlCache.rowsArray[i].div;

            div.addEventListener("dblclick", handleDblClick.bind(this), false);
            div.addEventListener("click", handleClick.bind(this), false);
            div.addEventListener("contextmenu", onMouseDownRow.bind(this), false);
            div.addEventListener("focus", onFocus.bind(this), true);
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

        VGridGenerator.prototype.collectionChange = function collectionChange(resetScrollToTop, scrollBottom) {
          this.setScrollBodyHeightToVar();
          this._private.htmlCache.scrollBody.style.height = this._private.scrollBodyHeight + "px";
          var reset = false;
          if (resetScrollToTop === true) {
            this._private.htmlCache.content.scrollTop = 0;
          }
          if (this._private.scrollBodyHeight < this._private.htmlCache.content.scrollTop || scrollBottom) {
            var collectionLength = this._private.configFunctions.getCollectionLength();
            var contentRows = parseInt(this._private.htmlCache.content.offsetHeight / this._private.rowHeight);
            var scrollOffsetHeight = contentRows * this._private.rowHeight;
            this._private.htmlCache.content.scrollTop = collectionLength * this._private.rowHeight - scrollOffsetHeight;
          }

          this.updateGridScrollbars();
          this.correctRowAndScrollbodyWidth();
          this.updateSelectionOnAllRows();
          this.fixHeaderWithBody();
          this.onNormalScrollingLarge();
          this.fillDataInRows(true);
          if (scrollBottom) {
            this._private.htmlCache.content.scrollTop = this._private.htmlCache.content.scrollTop + this._private.rowHeight;
          }
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

        VGridGenerator.prototype.disableSortableColumns = function disableSortableColumns() {
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

        VGridGenerator.prototype.clearHeaderSortFilter = function clearHeaderSortFilter() {
          this._private.sortOrder = [];
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setHeaderSortFilter = function setHeaderSortFilter(sortOrder) {
          this._private.sortOrder = sortOrder;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.enableHeaderSort = function enableHeaderSort() {
          this._private.sortOnHeaderClick = true;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.disableHeaderSort = function disableHeaderSort(sortOrder) {
          this._private.sortOnHeaderClick = false;
          this.rebuildGridHeaderHtml();
        };

        return VGridGenerator;
      }());

      _export("VGridGenerator", VGridGenerator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBT2E7QUFHWCxpQkFIVyxjQUdYLENBQVksYUFBWixFQUEyQixRQUEzQixFQUFxQyxPQUFyQyxFQUE4QyxTQUE5QyxFQUF5RCxrQkFBekQsRUFBNkU7Z0NBSGxFLGdCQUdrRTs7ZUFrQjdFLFdBQVcsR0FsQmtFOztBQUMzRSxlQUFLLGFBQUwsR0FBcUIsYUFBckIsQ0FEMkU7QUFFM0UsZUFBSyxRQUFMLEdBQWdCLFFBQWhCLENBRjJFO0FBRzNFLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FIMkU7QUFJM0UsZUFBSyxTQUFMLEdBQWlCLFNBQWpCLENBSjJFO0FBSzNFLGVBQUssa0JBQUwsR0FBMEIsa0JBQTFCLENBTDJFO0FBTTNFLGVBQUssU0FBTCxDQUFlLGFBQWYsRUFOMkU7QUFPM0UsZUFBSyxJQUFMLENBQVUsS0FBVixFQVAyRTtTQUE3RTs7QUFIVyxpQ0F1QlgsK0JBQVUsU0FBUztBQUNqQixlQUFLLFFBQUwsR0FBZ0I7QUFDZCxrQkFBTSxLQUFLLE9BQUw7QUFDTiwwQkFBYyxRQUFRLFlBQVIsSUFBd0IsQ0FBeEI7QUFDZCx1QkFBVyxRQUFRLFNBQVIsSUFBcUIsRUFBckI7QUFDWCwwQkFBYyxRQUFRLFlBQVIsSUFBd0IsQ0FBeEI7QUFDZCw2QkFBaUIsUUFBUSxlQUFSLElBQTJCLEdBQTNCO0FBQ2pCLHlCQUFhLFFBQVEsV0FBUixJQUF1QixFQUF2QjtBQUNiLDRCQUFnQixRQUFRLGNBQVIsSUFBMEIsRUFBMUI7QUFDaEIsOEJBQWtCLFFBQVEsZ0JBQVIsSUFBNEIsRUFBNUI7QUFDbEIsMkJBQWUsUUFBUSxhQUFSLElBQXlCLEVBQXpCO0FBQ2YsOEJBQWtCLFFBQVEsZ0JBQVI7QUFDbEIsK0JBQW1CLFFBQVEsaUJBQVI7QUFDbkIsZ0NBQW9CLFFBQVEsa0JBQVI7QUFDcEIsaUNBQXFCLFFBQVEsbUJBQVI7QUFDckIsbUNBQXVCLFFB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
