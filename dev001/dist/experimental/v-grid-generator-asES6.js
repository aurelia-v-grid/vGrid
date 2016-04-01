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

          this.clearHeaderSortFilter = function () {
            this._private.sortOrder = [];
            this.rebuildGridHeaderHtml();
          };

          this.setHeaderSortFilter = function (sortOrder) {
            this._private.sortOrder = sortOrder;
            this.rebuildGridHeaderHtml();
          };

          this.enableHeaderSort = function () {
            this._private.sortOnHeaderClick = true;
            this.rebuildGridHeaderHtml();
          };

          this.disableHeaderSort = function (sortOrder) {
            this._private.sortOnHeaderClick = false;
            this.rebuildGridHeaderHtml();
          };

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

              x = _this9._private.colStyleArray[oldIndex];
              _this9._private.colStyleArray.splice(oldIndex, 1);
              _this9._private.colStyleArray.splice(newIndex, 0, x);

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

        return VGridGenerator;
      }());

      _export("VGridGenerator", VGridGenerator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4cGVyaW1lbnRhbC92LWdyaWQtZ2VuZXJhdG9yLWFzRVM2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2dDQU9hO0FBR1gsaUJBSFcsY0FHWCxDQUFZLGFBQVosRUFBMkIsUUFBM0IsRUFBcUMsT0FBckMsRUFBOEMsU0FBOUMsRUFBeUQsa0JBQXpELEVBQTRFO2dDQUhqRSxnQkFHaUU7O2VBYTVFLFdBQVcsR0FiaUU7O2VBeXFFNUUsd0JBQXdCLFlBQVk7QUFDbEMsaUJBQUssUUFBTCxDQUFjLFNBQWQsR0FBMEIsRUFBMUIsQ0FEa0M7QUFFbEMsaUJBQUsscUJBQUwsR0FGa0M7V0FBWixDQXpxRW9EOztlQThxRTVFLHNCQUFzQixVQUFVLFNBQVYsRUFBcUI7QUFDekMsaUJBQUssUUFBTCxDQUFjLFNBQWQsR0FBMEIsU0FBMUIsQ0FEeUM7QUFFekMsaUJBQUsscUJBQUwsR0FGeUM7V0FBckIsQ0E5cUVzRDs7ZUFtckU1RSxtQkFBbUIsWUFBWTtBQUM3QixpQkFBSyxRQUFMLENBQWMsaUJBQWQsR0FBa0MsSUFBbEMsQ0FENkI7QUFFN0IsaUJBQUsscUJBQUwsR0FGNkI7V0FBWixDQW5yRXlEOztlQXdyRTVFLG9CQUFvQixVQUFVLFNBQVYsRUFBcUI7QUFDdkMsaUJBQUssUUFBTCxDQUFjLGlCQUFkLEdBQWtDLEtBQWxDLENBRHVDO0FBRXZDLGlCQUFLLHFCQUFMLEdBRnVDO1dBQXJCLENBeHJFd0Q7O0FBQzFFLGVBQUssYUFBTCxHQUFxQixhQUFyQixDQUQwRTtBQUUxRSxlQUFLLFFBQUwsR0FBZ0IsUUFBaEIsQ0FGMEU7QUFHMUUsZUFBSyxPQUFMLEdBQWUsT0FBZixDQUgwRTtBQUkxRSxlQUFLLFNBQUwsR0FBaUIsU0FBakIsQ0FKMEU7QUFLMUUsZUFBSyxrQkFBTCxHQUEwQixrQkFBMUIsQ0FMMEU7QUFNMUUsZUFBSyxTQUFMLENBQWUsYUFBZixFQU4wRTtBQU8xRSxlQUFLLElBQUwsQ0FBVSxLQUFWLEVBUDBFO1NBQTVF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LFNBQUwsQ0FBZSxlQUFmLENBQStCLEdBQS9CLEVBRG9CO0FBRXBCLGVBQUssd0JBQUwsR0FGb0I7OztBQTdvRVgsaUNBbXBFWCx1Q0FBaUI7QUFDZixjQUFJLG1CQUFtQixLQUFLLFFBQUwsQ0FBYyxlQUFkLENBQThCLG1CQUE5QixFQUFuQixDQURXO0FBRWYsZUFBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFnQyxTQUFoQyxHQUE0QyxtQkFBbUIsS0FBSyxRQUFMLENBQWMsU0FBZCxDQUZoRDs7O0FBbnBFTixpQ0F5cEVYLGlDQUFhO0FBQ1gsZUFBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFnQyxTQUFoQyxHQUE0QyxDQUE1QyxDQURXOzs7QUF6cEVGLGlDQThwRVgscUNBQWMsUUFBUTtBQUNwQixlQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLE9BQXhCLENBQWdDLFNBQWhDLEdBQTRDLE1BQTVDLENBRG9COzs7QUE5cEVYLGlDQW1xRVgsdUNBQWdCO0FBQ2QsaUJBQU8sS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFnQyxTQUFoQyxDQURPOzs7QUFucUVMLGlDQXdxRVgsK0JBQVcsSUFBSSxPQUFPO0FBQ3BCLGVBQUssZUFBTCxDQUFxQixFQUFyQixFQUF5QixLQUF6QixFQURvQjs7O2VBeHFFWCIsImZpbGUiOiJleHBlcmltZW50YWwvdi1ncmlkLWdlbmVyYXRvci1hc0VTNi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
