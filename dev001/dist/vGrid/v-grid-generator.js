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
        function VGridGenerator(vGridConfig, vGridInterpolate, vGridElement, vGridSortable, vGridSelection, vGridCellEdit) {
          _classCallCheck(this, VGridGenerator);

          this._private = {};

          this.vGridSelection = vGridSelection;
          this.vGridConfig = vGridConfig;
          this.vGridCellEdit = vGridCellEdit;
          this.vGridInterpolate = vGridInterpolate;
          this.vGridElement = vGridElement;
          this.vGridSortable = vGridSortable;
          this.setConfig(vGridConfig);
          this.init(false);
        }

        VGridGenerator.prototype.setConfig = function setConfig(options) {
          this._private = {
            node: this.vGridElement,
            headerHeight: options.headerHeight || 0,
            rowHeight: options.rowHeight || 50,
            footerHeight: options.footerHeight || 0,
            dataScrollDelay: options.dataScrollDelay || 200,
            headerArray: options.headerArray || [],
            attributeArray: options.attributeArray || [],
            columnWidthArray: options.columnWidthArray || [],
            colStyleArray: options.colStyleArray || [],
            colTypeArray: options.colTypeArray || [],
            isSortableHeader: options.isSortableHeader,
            sortOnHeaderClick: options.sortOnHeaderClick,
            sortNotOnHeader: options.sortNotOnHeader,
            isResizableHeaders: options.isResizableHeaders,
            predefinedScrolltop: options.predefinedScrolltop,
            requestAnimationFrame: options.requestAnimationFrame,
            internalDragDropCount: 10,
            resizableHeadersAndRows: options.resizableHeadersAndRows,
            isMultiSelect: options.isMultiSelect,
            renderOnScrollbarScroll: options.renderOnScrollbarScroll,
            columnWidthArrayOverride: options.columnWidthArrayOverride,
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
              onScrolled: options.onScrolled || function () {},
              getFilterName: options.getFilterName || function () {
                return "";
              },
              onCellDraw: options.onCellDraw,

              onRowMarkupCreate: options.onRowMarkupCreate
            },
            scrollVars: {
              lastScrollTop: 0,
              firstTop: 0,
              lastScrollLeft: 0,
              halt: false,
              timer: null,
              clickTimersArray: [],
              scrollCallbackTimer: null
            },
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
              editCellWrite: "vGrid-editCell-write",
              editCellFocus: "vGrid-editCell-focus",
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
          var _this = this;

          var result;

          var lineHeigthStyleTag;
          if (!this._private.queryHelper.addFilter) {
            lineHeigthStyleTag = "style=line-height:" + this._private.headerHeight + "px;\"";
          } else {
            lineHeigthStyleTag = "style=line-height:" + this._private.headerHeight / 2 + "px;\"";
          }

          if (this._private.sortNotOnHeader.indexOf(attribute) !== -1) {
            return "";
          }

          if (this._private.sortOnHeaderClick) {
            var main = "<span class=\"\"><span " + lineHeigthStyleTag + " class=\"" + this._private.css.sortIcon + " " + this._private.css.sortIconSort + "\"></span></span>";
            if (this._private.sortOrder.length === 0) {
              result = main;
            } else {
              this._private.sortOrder.forEach(function (x) {
                if (x.attribute === attribute) {
                  var isAsc = "<span " + lineHeigthStyleTag + " class=\"" + _this._private.css.sortIcon + " " + _this._private.css.sortIconAsc + "\"></span>";
                  var isDesc = "<span " + lineHeigthStyleTag + " class=\"" + _this._private.css.sortIcon + " " + _this._private.css.sortIconDesc + "\"></span>";

                  var asc = x.asc === true ? isAsc : isDesc;
                  var main = "<span " + lineHeigthStyleTag + " class=\"" + _this._private.css.sortIcon + " " + _this._private.css.sortIconNo + x.no + "\">";
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
            if (this.vGridSelection.isSelected(currentRow)) {
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
              for (var i = 0; i < attributeNamesArray.length; i++) {
                if (this._private.colTypeArray[i] === "image") {
                  rowTemplate = rowTemplate + ("<div><img class=\"" + this._private.css.cellContent + "\" tabindex=\"0\" style=\"" + this._private.colStyleArray[i] + "\" " + this._private.atts.dataAttribute + "=\"" + attributeNamesArray[i] + "\" src=\"{{" + attributeNamesArray[i] + "}}\" ></div>");
                } else {
                  rowTemplate = rowTemplate + ("<div><input class=\"" + this._private.css.cellContent + "\"  readonly=\"true\" style=\"" + this._private.colStyleArray[i] + "\" " + this._private.atts.dataAttribute + "=\"" + attributeNamesArray[i] + "\" value=\"{{" + attributeNamesArray[i] + "}}\" ></input></div>");
                }
              }
            }
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.cacheRowTemplate = function cacheRowTemplate(template) {
          var stringTemplate = template || this.getRowTemplate(this._private.attributeArray);
          this.vGridInterpolate.parse(stringTemplate);
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
          tempColumns.innerHTML = this.vGridInterpolate.render(this.getRowTemplate(attributeNames), entity);
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
          var _this2 = this;

          this._private.configFunctions.getDataElement(rowNo, isDownScroll, isLargeScroll, function (entity) {
            var container = document.createElement("DIV");
            container.className = _this2._private.css.rowContainer;

            if (_this2._private.columnWidthArrayOverride) {
              container.style.width = "100%";
            }

            rowHtmlElement.setAttribute("row", rowNo);

            var innerHtml = "";
            if (entity) {
              innerHtml = _this2.createRowMarkup(entity, _this2._private.attributeArray);
            }
            if (!entity) {
              rowHtmlElement.classList.add(_this2._private.css.noData);
            } else {
              rowHtmlElement.classList.remove(_this2._private.css.noData);
            }

            if (rowNo % 2 === 1) {
              if (rowHtmlElement.classList.contains(_this2._private.css.rowEven)) {
                rowHtmlElement.classList.remove(_this2._private.css.rowEven);
                rowHtmlElement.classList.add(_this2._private.css.rowAlt);
              }
            } else {
              if (rowHtmlElement.classList.contains(_this2._private.css.rowAlt)) {
                rowHtmlElement.classList.remove(_this2._private.css.rowAlt);
                rowHtmlElement.classList.add(_this2._private.css.rowEven);
              }
            }

            try {
              if (_this2.vGridSelection.isSelected(rowNo)) {
                rowHtmlElement.classList.add(_this2._private.css.rowSelected);
              } else {
                rowHtmlElement.classList.remove(_this2._private.css.rowSelected);
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

            if (_this2._private.configFunctions.onCellDraw) {
              var rowCells = rowHtmlElement.lastElementChild.children;
              for (var i = 0; i < rowCells.length; i++) {
                _this2._private.configFunctions.onCellDraw({
                  attributeName: _this2._private.attributeArray[i],
                  div: rowCells[i],
                  row: rowNo
                });
              }
            }
          });
        };

        VGridGenerator.prototype.addFilterToHeaderCell = function addFilterToHeaderCell(event) {
          var _this3 = this;

          var attributeName = event.attributeName;
          var headerName = event.headerName;
          var defaultFilter = event.defaultFilter;

          var onChangeEventOnFilter = function onChangeEventOnFilter(e) {

            if (e.keyCode !== 9) {
              var queryHtmlInput = _this3._private.node.querySelectorAll("." + _this3._private.css.filterHandle);

              var queryParams = [];
              for (var i = 0; i < queryHtmlInput.length; i++) {
                if (queryHtmlInput[i].value !== "" && queryHtmlInput[i].value !== undefined) {
                  var dataSourceAttribute = queryHtmlInput[i].getAttribute(_this3._private.atts.dataAttribute);
                  var operator = _this3._private.queryHelper.filterArray[_this3._private.attributeArray.indexOf(dataSourceAttribute)];

                  var value = queryHtmlInput[i].value;

                  queryParams.push({
                    attribute: dataSourceAttribute,
                    value: value,
                    operator: operator
                  });

                  _this3._private.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value;
                } else {

                  if (queryHtmlInput[i].value === "") {
                    var dataSourceAttribute = queryHtmlInput[i].getAttribute(_this3._private.atts.dataAttribute);
                    _this3._private.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value = "";
                  }
                }
              }
              _this3._private.configFunctions.onFilterRun(queryParams);
            }
          };

          var onKeyUpEventOnFilter = function onKeyUpEventOnFilter(e) {
            if (e.keyCode === 13 && triggerRan === false) {
              e.target.onchange(e);
            }
          };

          var getHeaderCellMarkup = function getHeaderCellMarkup(labelTopCell, valueInput, attribute) {

            var dragHandle = _this3._private.isSortableHeader ? _this3._private.css.dragHandle : "";

            var cssLabel = _this3._private.css.cellContent + " " + _this3._private.css.filterLabelTop + " " + dragHandle + " " + _this3._private.css.orderHandle;
            var cssInput = _this3._private.css.cellContent + " " + _this3._private.css.filterInputBottom + " " + _this3._private.css.filterHandle;

            if (_this3._private.queryHelper.filterOnAtTop) {
              cssLabel = _this3._private.css.cellContent + " " + _this3._private.css.filterLabelBottom + " " + dragHandle + " " + _this3._private.css.orderHandle;
              cssInput = _this3._private.css.cellContent + " " + _this3._private.css.filterInputTop + " " + _this3._private.css.filterHandle;
            }

            var sortIcon = _this3.getSortIcon(attribute);

            var filter = _this3._private.queryHelper.filterArray[_this3._private.attributeArray.indexOf(attribute)] || "filter";
            var filterName = _this3._private.configFunctions.getFilterName(filter);

            var lineHeigth = "line-height:" + _this3._private.headerHeight / 2 + "px;";

            var cellLabel = "<div style=\"" + lineHeigth + "\" class=\"" + cssLabel + "\" " + _this3._private.atts.dataAttribute + "=\"" + attribute + "\">" + labelTopCell + " " + sortIcon + "</div>";
            var cellInput = "<input style=\"" + lineHeigth + "\" placeholder=\"" + filterName + "\" class=\"" + cssInput + "\" " + _this3._private.atts.dataAttribute + "=\"" + attribute + "\" value=\"" + valueInput + "\"/>";

            if (_this3._private.queryHelper.doNotAddFilterTo.indexOf(attribute) !== -1) {
              cellInput = "<div class=\"" + cssLabel + "\" " + _this3._private.atts.dataAttribute + "=\"" + attribute + "\"></div>";
            }

            var result;
            if (_this3._private.queryHelper.filterOnAtTop) {
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
            _this3._private.htmlCache.content.scrollLeft = currentScrollLeft;
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
          var _this4 = this;

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
              var row = _this4._private.htmlCache.rowsArray[cacheRowNumber];
              _this4.setRowTopValue([row], 0, currentRowTop);

              if (row.div.firstChild) {
                row.div.removeChild(row.div.firstChild);
              }
              currentRowTop = currentRowTop + _this4._private.rowHeight;
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

          this.fillDataInRows(false);
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
          var _this5 = this;

          this._private.scrollVars.halt = true;

          var timeout = this._private.dataScrollDelay;

          clearTimeout(this._private.scrollVars.timer);

          this._private.scrollVars.timer = setTimeout(function () {
            _this5.onNormalScrollingLarge();
            _this5._private.scrollVars.halt = false;
          }, timeout);
        };

        VGridGenerator.prototype.onScrollClickCancel = function onScrollClickCancel() {
          var _this6 = this;

          this._private.scrollVars.clickTimersArray.forEach(function (xTimer) {
            clearTimeout(xTimer);
          });

          if (this._private.scrollVars.clickTimersArray.length > 0) {
            setTimeout(function () {
              _this6._private.scrollVars.clickTimersArray.forEach(function (xTimer) {
                clearTimeout(xTimer);
              });
            }, 0);
          }
        };

        VGridGenerator.prototype.onScroll = function onScroll() {
          var _this7 = this;

          this.vGridCellEdit.onScroll();

          var doScroll = function doScroll() {
            var currentScrollTop = _this7._private.htmlCache.content.scrollTop;
            var currentScrollLeft = _this7._private.htmlCache.content.scrollLeft;

            if (currentScrollTop !== _this7._private.scrollVars.lastScrollTop) {
              if (currentScrollLeft !== 0) {
                _this7._private.htmlCache.content.scrollLeft = _this7._private.scrollVars.lastScrollLeft;
                _this7._private.htmlCache.header.scrollLeft = _this7._private.scrollVars.lastScrollLeft;
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
                  _this7.onScrollbarScrolling();
                }
              } else {
                _this7.onNormalScrolling(isDownScroll, currentScrollTop);
              }
            } else {

              if (_this7._private.htmlCache.content.style.overflowX === "hidden") {
                _this7._private.htmlCache.content.scrollLeft = 0;
                _this7._private.scrollVars.lastScrollLeft = 0;
                _this7._private.htmlCache.header.scrollLeft = 0;
              } else {
                if (_this7._private.scrollVars.lastScrollLeft !== currentScrollLeft) {
                  currentScrollLeft = _this7._private.htmlCache.content.scrollLeft;
                  _this7._private.scrollVars.lastScrollLeft = currentScrollLeft;
                  _this7._private.htmlCache.header.scrollLeft = currentScrollLeft;
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
          clearTimeout(this._private.scrollVars.scrollCallbackTimer);
          if (this._private.requestAnimationFrame) {
            requestAnimationFrame(function () {
              doScroll();
            });
          } else {
            doScroll();
          }
          this._private.scrollVars.scrollCallbackTimer = setTimeout(function () {
            _this7._private.configFunctions.onScrolled();
          }, 250);
        };

        VGridGenerator.prototype.updateGridScrollbars = function updateGridScrollbars() {

          var collectionHeight = this._private.configFunctions.getCollectionLength() * this._private.rowHeight + this._private.rowHeight / 2;
          var bodyHeight = this._private.htmlCache.content.offsetHeight;


          if (collectionHeight <= bodyHeight) {
            this._private.htmlCache.content.scrollTop = 0;

            this._private.htmlCache.content.style.overflow = "";
            this._private.htmlCache.content.style.overflowY = "hidden";
            this._private.htmlCache.content.style.overflowX = "hidden";
            this._private.htmlCache.header.style.overflowY = "hidden";
          } else {
            this._private.htmlCache.content.style.overflow = "";
            this._private.htmlCache.content.style.overflowY = "scroll";
            this._private.htmlCache.content.style.overflowX = "hidden";
            this._private.htmlCache.header.style.overflowY = "scroll";
          }

          if (this._private.htmlCache.content.offsetWidth - 5 < this.getTotalColumnWidth()) {
            this._private.htmlCache.content.style.overflowX = "scroll";
          }
        };

        VGridGenerator.prototype.addResizableAndSortableEvent = function addResizableAndSortableEvent() {
          var _this8 = this;

          var resizable = false;
          var screenX;
          var xElement;
          var sortable = false;

          if (this._private.sortOnHeaderClick) {
            var orderByClick = function orderByClick(event) {
              if (!sortable && !resizable) {
                _this8._private.configFunctions.onOrderBy(event, function (sortorder) {
                  _this8._private.sortOrder = sortorder;
                  _this8.rebuildGridHeaderHtml();
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

                if (_this8._private.isSortableHeader) {
                  _this8._private.sortableCtx.option("disabled", resizable);
                }
                screenX = e.screenX;
                xElement = e.target;
                var originalWidth = xElement.offsetParent.style.width;
                var originalWidthx = xElement.offsetParent.style.width;
                var index = xElement.offsetParent.getAttribute("column-no");


                _this8._private.htmlCache.header.onmousemove = function (e) {
                  _this8._private.htmlCache.header.onmouseup = function () {
                    setTimeout(function () {
                      resizable = false;
                      if (_this8._private.isSortableHeader) {
                        _this8._private.sortableCtx.option("disabled", resizable);
                      }
                    }, 30);

                    _this8._private.htmlCache.header.onmouseleave = "";
                    _this8._private.htmlCache.header.onmousemove = "";
                    _this8._private.htmlCache.header.onmouseup = "";


                    _this8._private.columnWidthArray[index] = parseInt(xElement.offsetParent.style.width);

                    _this8._private.htmlCache.rowTemplate = null;
                    _this8.correctRowAndScrollbodyWidth();

                    _this8.cacheRowTemplate(null);
                    _this8.updateGridScrollbars();
                    _this8.fillDataInRows(true);
                  };

                  _this8._private.htmlCache.header.onmouseleave = function (e) {
                    _this8._private.htmlCache.header.onmouseup(e);
                  };

                  if (resizable) {
                    var newWidth = parseInt(originalWidth) - (screenX - e.screenX) + "px";
                    _this8._private.columnWidthArray[index] = parseInt(newWidth);
                    xElement.offsetParent.style.width = parseInt(originalWidth) - (screenX - e.screenX) + "px";
                    xElement.offsetParent.style.width = parseInt(originalWidthx) - (screenX - e.screenX) + "px";
                    if (_this8._private.resizableHeadersAndRows) {
                      var columnsToFix = _this8._private.htmlCache.content.firstChild.querySelectorAll("." + _this8._private.css.rowColumn + index);

                      for (var col = 0; col < columnsToFix.length; col++) {
                        columnsToFix[col].style.width = newWidth;
                      }

                      _this8.correctRowAndScrollbodyWidth();
                      _this8.updateGridScrollbars();
                    }
                  } else {
                    _this8.correctHeaderAndScrollbodyWidth();
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
            this._private.sortableCtx = new this.vGridSortable(this._private.htmlCache.header.firstChild.firstChild, function (oldIndex, newIndex) {
              var children = _this8._private.htmlCache.header.firstChild.firstChild.children;

              var x;
              x = _this8._private.attributeArray[oldIndex];
              _this8._private.attributeArray.splice(oldIndex, 1);
              _this8._private.attributeArray.splice(newIndex, 0, x);

              x = _this8._private.queryHelper.filterArray[oldIndex];
              _this8._private.queryHelper.filterArray.splice(oldIndex, 1);
              _this8._private.queryHelper.filterArray.splice(newIndex, 0, x);

              x = _this8._private.headerArray[oldIndex];
              _this8._private.headerArray.splice(oldIndex, 1);
              _this8._private.headerArray.splice(newIndex, 0, x);

              x = _this8._private.columnWidthArray[oldIndex];
              _this8._private.columnWidthArray.splice(oldIndex, 1);
              _this8._private.columnWidthArray.splice(newIndex, 0, x);

              x = _this8._private.colStyleArray[oldIndex];
              _this8._private.colStyleArray.splice(oldIndex, 1);
              _this8._private.colStyleArray.splice(newIndex, 0, x);

              _this8._private.htmlCache.rowTemplate = null;
              _this8.cacheRowTemplate(null);
              _this8.rebuildColumns();
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
          var _this9 = this;

          var handleClick = function handleClick(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this9._private.configFunctions.clickHandler(e, currentRow);
            if (_this9._private.isMultiSelect !== undefined) {
              _this9.vGridSelection.setHightlight(e, currentRow, _this9);
            }
          };

          var handleDblClick = function handleDblClick(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this9._private.configFunctions.clickHandler(e, currentRow);
          };

          var onMouseDownRow = function onMouseDownRow(e) {
            if (e.button === 2) {}
          };

          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var div = this._private.htmlCache.rowsArray[i].div;

            div.addEventListener("dblclick", handleDblClick.bind(this), false);
            div.addEventListener("click", handleClick.bind(this), false);
            div.addEventListener("contextmenu", onMouseDownRow.bind(this), false);
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
          this.cacheRowTemplate(null);

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
            this.vGridSelection.setMode(this._private.isMultiSelect);
          }

          if (this._private.predefinedScrolltop) {
            this.setScrollTop(this._private.predefinedScrolltop);
          }

          this.fillDataInRows(false);

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
          this._private.htmlCache.header.scrollLeft = currentScrollLeft;
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
          this.cacheRowTemplate(null);
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
          this.cacheRowTemplate(null);
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
          this.vGridSelection.setMode("multible");
          if (!keepSelection) {
            this.vGridSelection.reset();
          }
          this.updateSelectionOnAllRows();
        };

        VGridGenerator.prototype.setSingleSelection = function setSingleSelection(keepSelection) {
          this.vGridSelection.setMode("single");
          if (!keepSelection) {
            this.vGridSelection.reset();
          }
          this.updateSelectionOnAllRows();
        };

        VGridGenerator.prototype.disableSelection = function disableSelection(keepSelection) {
          this.vGridSelection.setMode(null);
          if (!keepSelection) {
            this.vGridSelection.reset();
          }
          this.updateSelectionOnAllRows();
        };

        VGridGenerator.prototype.getSelectedRows = function getSelectedRows() {
          return this.vGridSelection.getSelectedRows();
        };

        VGridGenerator.prototype.setSelectedRows = function setSelectedRows(sel) {
          this.vGridSelection.setSelectedRows(sel);
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
//# sourceMappingURL=data:application/json;base64,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
