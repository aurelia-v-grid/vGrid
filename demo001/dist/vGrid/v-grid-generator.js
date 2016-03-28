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

          if (!this._private.queryHelper.addFilter) {
            var lineHeigth = 'style=line-height:' + this._private.headerHeight + 'px;"';
          } else {
            var lineHeigth = 'style=line-height:' + this._private.headerHeight / 2 + 'px;"';
          }

          if (this._private.sortOnHeaderClick) {
            var main = '<span class=""><span ' + lineHeigth + ' class="' + this._private.css.sortIcon + ' ' + this._private.css.sortIconSort + '"></span></span>';
            if (this._private.sortOrder.length === 0) {
              result = main;
            } else {
              this._private.sortOrder.forEach(function (x) {
                if (x.attribute === attribute) {
                  var asc = x.asc === true ? '<span ' + lineHeigth + ' class="' + _this2._private.css.sortIcon + ' ' + _this2._private.css.sortIconAsc + '"></span>' : '<span ' + lineHeigth + ' class="' + _this2._private.css.sortIcon + ' ' + _this2._private.css.sortIconDesc + '"></span>';
                  var main = '<span ' + lineHeigth + ' class="' + _this2._private.css.sortIcon + ' ' + _this2._private.css.sortIconNo + x.no + '">';
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
          var _this4 = this;

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
                myElement.classList.remove(_this4._private.css.editCell);
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
                  _this4._private.disableRowClick = false;
                } else {
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
          var _this5 = this;

          var triggerRan = false;

          var attributeName = event.attributeName;
          var headerName = event.headerName;
          var defaultFilter = event.defaultFilter;

          var onChangeEventOnFilter = function onChangeEventOnFilter(e) {
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
          };

          var onKeyUpEventOnFilter = function onKeyUpEventOnFilter(e) {
            if (e.keyCode === 13 && triggerRan === false) {
              e.target.onchange(e);
            }
          };

          var getHeaderCellMarkup = function getHeaderCellMarkup(labelTopCell, valueInput, attribute) {

            var cssLabel = _this5._private.css.cellContent + " " + _this5._private.css.filterLabelBottom + " " + _this5._private.css.dragHandle + " " + _this5._private.css.orderHandle;
            var cssInput = _this5._private.css.cellContent + " " + _this5._private.css.filterInputBottom + " " + _this5._private.css.filterHandle;
            if (_this5._private.queryHelper.filterOnAtTop) {
              cssLabel = _this5._private.css.cellContent + " " + _this5._private.css.filterLabelTop + " " + _this5._private.css.dragHandle + " " + _this5._private.css.orderHandle;
              cssInput = _this5._private.css.cellContent + " " + _this5._private.css.filterInputTop + " " + _this5._private.css.filterHandle;
            }

            var sortIcon = _this5.getSortIcon(attribute);

            var filter = _this5._private.queryHelper.filterArray[_this5._private.attributeArray.indexOf(attribute)] || "filter";
            var filterName = _this5._private.configFunctions.getFilterName(filter);

            var lineHeigth = 'style=line-height:' + _this5._private.headerHeight / 2 + 'px;"';

            var cellLabel = '<div ' + lineHeigth + ' class="' + cssLabel + '"  ' + _this5._private.atts.dataAttribute + '= "' + attribute + '">' + labelTopCell + sortIcon + '</div>';
            var cellInput = '<input ' + lineHeigth + ' placeholder="' + filterName + '" class="' + cssInput + '"  ' + _this5._private.atts.dataAttribute + '= "' + attribute + '" value="' + valueInput + '"/>';

            if (_this5._private.queryHelper.doNotAddFilterTo.indexOf(attribute) !== -1) {
              cellInput = '<div class="' + cssLabel + '"  ' + _this5._private.atts.dataAttribute + '= "' + attribute + '"></div>';
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

            if (currentRow === this._private.configFunctions.getCollectionLength() && this.getRowCacheLength() < this._private.configFunctions.getCollectionLength() - 1) {
              bottomHitCount = i;
            }

            if (currentRow > this._private.configFunctions.getCollectionLength()) {
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
              setRowTopValue([row], 0, -5000 + i);
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
            });
          }
        };

        VGridGenerator.prototype.addEvents = function addEvents() {
          var _this12 = this;

          var handleClick = function handleClick(e) {
            var xTimer = setTimeout(function () {
              if (!_this12._private.disableRowClick) {
                if (_this12._private.isMultiSelect !== undefined) {
                  _this12.onRowClickAndHighligtHandler(e);
                }
                var currentRow = _this12.getRowNumberFromClickedOn(e);
                _this12._private.configFunctions.clickHandler(e, currentRow, null);
              }
            }, 200);
            _this12._private.scrollVars.clickTimersArray.push(xTimer);
          };

          var handleDblClick = function handleDblClick(e) {
            _this12.onScrollClickCancel();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBT2E7QUFHWCxpQkFIVyxjQUdYLENBQVksYUFBWixFQUEyQixRQUEzQixFQUFxQyxPQUFyQyxFQUE4QyxTQUE5QyxFQUF5RCxrQkFBekQsRUFBNkU7Z0NBSGxFLGdCQUdrRTs7ZUFrQjdFLFdBQVcsR0FsQmtFOztBQUMzRSxlQUFLLGFBQUwsR0FBcUIsYUFBckIsQ0FEMkU7QUFFM0UsZUFBSyxRQUFMLEdBQWdCLFFBQWhCLENBRjJFO0FBRzNFLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FIMkU7QUFJM0UsZUFBSyxTQUFMLEdBQWlCLFNBQWpCLENBSjJFO0FBSzNFLGVBQUssa0JBQUwsR0FBMEIsa0JBQTFCLENBTDJFO0FBTTNFLGVBQUssU0FBTCxDQUFlLGFBQWYsRUFOMkU7QUFPM0UsZUFBSyxJQUFMLENBQVUsS0FBVixFQVAyRTtTQUE3RTs7QUFIVyxpQ0F1QlgsK0JBQVUsU0FBUztBQUNqQixlQUFLLFFBQUwsR0FBZ0I7QUFDZCxrQkFBTSxLQUFLLE9BQUw7QUFDTiwwQkFBYyxRQUFRLFlBQVIsSUFBd0IsQ0FBeEI7QUFDZCx1QkFBVyxRQUFRLFNBQVIsSUFBcUIsRUFBckI7QUFDWCwwQkFBYyxRQUFRLFlBQVIsSUFBd0IsQ0FBeEI7QUFDZCw2QkFBaUIsUUFBUSxlQUFSLElBQTJCLEdBQTNCO0FBQ2pCLHlCQUFhLFFBQVEsV0FBUixJQUF1QixFQUF2QjtBQUNiLDRCQUFnQixRQUFRLGNBQVIsSUFBMEIsRUFBMUI7QUFDaEIsOEJBQWtCLFFBQVEsZ0JBQVIsSUFBNEIsRUFBNUI7QUFDbEIsMkJBQWUsUUFBUSxhQUFSLElBQXlCLEVBQXpCO0FBQ2YsOEJBQWtCLFFBQVEsZ0JBQVI7QUFDbEIsK0JBQW1CLFFBQVEsaUJBQVI7QUFDbkIsZ0NBQW9CLFFBQVEsa0JBQVI7QUFDcEIsaUNBQXFCLFFBQVEsbUJBQVI7QUFDckIsbUNBQXVCLFFB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QUE4QixNQUE5QixDQUY4QjtBQUc5QixjQUFJLENBQUMsYUFBRCxFQUFnQjtBQUNsQixpQkFBSyxRQUFMLENBQWMsYUFBZCxHQUE4QixFQUE5QixDQURrQjtXQUFwQjtBQUdBLGVBQUssd0JBQUwsR0FOOEI7OztBQW5uRXJCLGlDQTZuRVgsNkNBQWtCO0FBQ2hCLGlCQUFPLEtBQUssU0FBTCxDQUFlLGVBQWYsRUFBUCxDQURnQjs7O0FBN25FUCxpQ0Frb0VYLDJDQUFnQixLQUFLO0FBQ25CLGVBQUssU0FBTCxDQUFlLGVBQWYsQ0FBK0IsR0FBL0IsRUFEbUI7QUFFbkIsZUFBSyx3QkFBTCxHQUZtQjs7O0FBbG9FVixpQ0F3b0VYLHVDQUFlO0FBQ2IsY0FBSSxtQkFBbUIsS0FBSyxRQUFMLENBQWMsZUFBZCxDQUE4QixtQkFBOUIsRUFBbkIsQ0FEUztBQUViLGVBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsT0FBeEIsQ0FBZ0MsU0FBaEMsR0FBNEMsbUJBQW1CLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FGbEQ7OztBQXhvRUosaUNBOG9FWCxpQ0FBWTtBQUNWLGVBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsT0FBeEIsQ0FBZ0MsU0FBaEMsR0FBNEMsQ0FBNUMsQ0FEVTs7O0FBOW9FRCxpQ0FtcEVYLHFDQUFhLFFBQVE7QUFDbkIsZUFBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFnQyxTQUFoQyxHQUE0QyxNQUE1QyxDQURtQjs7O0FBbnBFVixpQ0F3cEVYLHVDQUFlO0FBQ2IsaUJBQU8sS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFnQyxTQUFoQyxDQURNOzs7QUF4cEVKLGlDQTZwRVgsK0JBQVUsSUFBSSxPQUFPO0FBQ25CLGVBQUssZUFBTCxDQUFxQixFQUFyQixFQUF5QixLQUF6QixFQURtQjs7O0FBN3BFVixpQ0FpcUVYLHlEQUF3QjtBQUN0QixlQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLEVBQTFCLENBRHNCO0FBRXRCLGVBQUsscUJBQUwsR0FGc0I7OztBQWpxRWIsaUNBc3FFWCxtREFBb0IsV0FBVztBQUM3QixlQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLFNBQTFCLENBRDZCO0FBRTdCLGVBQUsscUJBQUwsR0FGNkI7OztBQXRxRXBCLGlDQTJxRVgsK0NBQW1CO0FBQ2pCLGVBQUssUUFBTCxDQUFjLGlCQUFkLEdBQWtDLElBQWxDLENBRGlCO0FBRWpCLGVBQUsscUJBQUwsR0FGaUI7OztBQTNxRVIsaUNBZ3JFWCwrQ0FBa0IsV0FBVztBQUMzQixlQUFLLFFBQUwsQ0FBYyxpQkFBZCxHQUFrQyxLQUFsQyxDQUQyQjtBQUUzQixlQUFLLHFCQUFMLEdBRjJCOzs7ZUFockVsQiIsImZpbGUiOiJ2R3JpZC92LWdyaWQtZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
