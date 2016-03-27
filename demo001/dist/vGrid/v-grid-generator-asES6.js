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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3ItYXNFUzYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBT2E7QUFHWCxpQkFIVyxjQUdYLENBQVksYUFBWixFQUEyQixRQUEzQixFQUFxQyxPQUFyQyxFQUE4QyxTQUE5QyxFQUF5RCxrQkFBekQsRUFBNEU7Z0NBSGpFLGdCQUdpRTs7ZUFhNUUsV0FBVyxHQWJpRTs7QUFDMUUsZUFBSyxhQUFMLEdBQXFCLGFBQXJCLENBRDBFO0FBRTFFLGVBQUssUUFBTCxHQUFnQixRQUFoQixDQUYwRTtBQUcxRSxlQUFLLE9BQUwsR0FBZSxPQUFmLENBSDBFO0FBSTFFLGVBQUssU0FBTCxHQUFpQixTQUFqQixDQUowRTtBQUsxRSxlQUFLLGtCQUFMLEdBQTBCLGtCQUExQixDQUwwRTtBQU0xRSxlQUFLLFNBQUwsQ0FBZSxhQUFmLEVBTjBFO0FBTzFFLGVBQUssSUFBTCxDQUFVLEtBQVYsRUFQMEU7U0FBNUU7O0FBSFcsaUNBaUJYLCtCQUFXLFNBQVM7QUFDbEIsZUFBSyxRQUFMLEdBQWdCO0FBQ2Qsa0JBQU0sS0FBSyxPQUFMO0FBQ04sMEJBQWMsUUFBUSxZQUFSLElBQXdCLENBQXhCO0FBQ2QsdUJBQVcsUUFBUSxTQUFSLElBQXFCLEVBQXJCO0FBQ1gsMEJBQWMsUUFBUSxZQUFSLElBQXdCLENBQXhCO0FBQ2QsNkJBQWlCLFFBQVEsZUFBUixJQUEyQixHQUEzQjtBQUNqQix5QkFBYSxRQUFRLFdBQVIsSUFBdUIsRUFBdkI7QUFDYiw0QkFBZ0IsUUFBUSxjQUFSLElBQTBCLEVBQTFCO0FBQ2hCLDhCQUFrQixRQUFRLGdCQUFSLElBQTRCLEVBQTVCO0FBQ2xCLDJCQUFnQixRQUFRLGFBQVIsSUFBeUIsRUFBekI7QUFDaEIsOEJBQWtCLFFBQVEsZ0JBQVIsSUFBNEIsS0FBNUI7QUFDbEIsK0JBQW1CLFFBQVEsaUJBQVIsSUFBNkIsS0FBN0I7QUFDbkIsZ0NBQW9CLFFBQVEsa0JBQVIsSUFBOEIsS0FB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QUFMLENBQWMsYUFBZCxHQUE4QixRQUE5QixDQUZnQztBQUdoQyxjQUFJLENBQUMsYUFBRCxFQUFnQjtBQUNsQixpQkFBSyxRQUFMLENBQWMsYUFBZCxHQUE4QixFQUE5QixDQURrQjtXQUFwQjtBQUdBLGVBQUssd0JBQUwsR0FOZ0M7OztBQXBuRXZCLGlDQThuRVgsNkNBQWlCLGVBQWU7QUFDOUIsZUFBSyxRQUFMLENBQWMsYUFBZCxHQUE4QixTQUE5QixDQUQ4QjtBQUU5QixlQUFLLFFBQUwsQ0FBYyxhQUFkLEdBQThCLE1BQTlCLENBRjhCO0FBRzlCLGNBQUksQ0FBQyxhQUFELEVBQWdCO0FBQ2xCLGlCQUFLLFFBQUwsQ0FBYyxhQUFkLEdBQThCLEVBQTlCLENBRGtCO1dBQXBCO0FBR0EsZUFBSyx3QkFBTCxHQU44Qjs7O0FBOW5FckIsaUNBd29FWCw2Q0FBaUI7QUFDZixpQkFBTyxLQUFLLFNBQUwsQ0FBZSxlQUFmLEVBQVAsQ0FEZTs7O0FBeG9FTixpQ0E2b0VYLDJDQUFpQixLQUFLO0FBQ3BCLGVBQUssU0FBTCxDQUFlLGVBQWYsQ0FBK0IsR0FBL0IsRUFEb0I7QUFFcEIsZUFBSyx3QkFBTCxHQUZvQjs7O0FBN29FWCxpQ0FtcEVYLHVDQUFpQjtBQUNmLGNBQUksbUJBQW1CLEtBQUssUUFBTCxDQUFjLGVBQWQsQ0FBOEIsbUJBQTlCLEVBQW5CLENBRFc7QUFFZixlQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLE9BQXhCLENBQWdDLFNBQWhDLEdBQTRDLG1CQUFtQixLQUFLLFFBQUwsQ0FBYyxTQUFkLENBRmhEOzs7QUFucEVOLGlDQXlwRVgsaUNBQWE7QUFDWCxlQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLE9BQXhCLENBQWdDLFNBQWhDLEdBQTRDLENBQTVDLENBRFc7OztBQXpwRUYsaUNBOHBFWCxxQ0FBYyxRQUFRO0FBQ3BCLGVBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsT0FBeEIsQ0FBZ0MsU0FBaEMsR0FBNEMsTUFBNUMsQ0FEb0I7OztBQTlwRVgsaUNBbXFFWCx1Q0FBZ0I7QUFDZCxpQkFBTyxLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLE9BQXhCLENBQWdDLFNBQWhDLENBRE87OztBQW5xRUwsaUNBd3FFWCwrQkFBVyxJQUFJLE9BQU87QUFDcEIsZUFBSyxlQUFMLENBQXFCLEVBQXJCLEVBQXlCLEtBQXpCLEVBRG9COzs7QUF4cUVYLGlDQTRxRVgsaURBQXFCO0FBQ25CLGVBQUssUUFBTCxDQUFjLFNBQWQsR0FBMEIsRUFBMUIsQ0FEbUI7QUFFbkIsZUFBSyxxQkFBTCxHQUZtQjs7O0FBNXFFVixpQ0FpckVYLDJDQUFpQixXQUFXO0FBQzFCLGVBQUssUUFBTCxDQUFjLFNBQWQsR0FBMEIsU0FBMUIsQ0FEMEI7QUFFMUIsZUFBSyxxQkFBTCxHQUYwQjs7O2VBanJFakIiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWdlbmVyYXRvci1hc0VTNi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
