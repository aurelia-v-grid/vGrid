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
        function VGridGenerator(vGridConfig, vGridInterpolate, vGridElement, vGridSortable, vGridSelection) {
          _classCallCheck(this, VGridGenerator);

          this._private = {};

          this.vGridSelection = vGridSelection;
          this.vGridConfig = vGridConfig;
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
                rowTemplate = rowTemplate + ("<div><input class=\"" + this._private.css.cellContent + "\" tabindex=\"0\" readonly=\"true\" style=\"" + this._private.colStyleArray[i] + "\" " + this._private.atts.dataAttribute + "=\"" + attributeNamesArray[i] + "\" value=\"{{" + attributeNamesArray[i] + "}}\" ></input></div>");
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
            var currentRow = _this9.getRowNumberFromClickedOn(e);
            _this9._private.configFunctions.clickHandler(e, currentRow);
            if (_this9._private.isMultiSelect !== undefined) {
              _this9.vGridSelection.setHightlight(e, _this9);
            }
          };

          var handleDblClick = function handleDblClick(e) {
            var currentRow = _this9.getRowNumberFromClickedOn(e);
            _this9._private.configFunctions.clickHandler(e, currentRow);
            if (_this9._private.isMultiSelect !== undefined) {
              _this9.vGridSelection.setHightlight(e, _this9);
            }
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
//# sourceMappingURL=data:application/json;base64,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QUwsQ0FBb0IsT0FBcEIsQ0FBNEIsSUFBNUIsRUFEOEI7QUFFOUIsY0FBSSxDQUFDLGFBQUQsRUFBZ0I7QUFDbEIsaUJBQUssY0FBTCxDQUFvQixLQUFwQixHQURrQjtXQUFwQjtBQUdBLGVBQUssd0JBQUwsR0FMOEI7OztBQXIxRHJCLGlDQTgxRFgsNkNBQWtCO0FBQ2hCLGlCQUFPLEtBQUssY0FBTCxDQUFvQixlQUFwQixFQUFQLENBRGdCOzs7QUE5MURQLGlDQW0yRFgsMkNBQWdCLEtBQUs7QUFDbkIsZUFBSyxjQUFMLENBQW9CLGVBQXBCLENBQW9DLEdBQXBDLEVBRG1CO0FBRW5CLGVBQUssd0JBQUwsR0FGbUI7OztBQW4yRFYsaUNBeTJEWCx1Q0FBZTtBQUNiLGNBQUksbUJBQW1CLEtBQUssUUFBTCxDQUFjLGVBQWQsQ0FBOEIsbUJBQTlCLEVBQW5CLENBRFM7QUFFYixlQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLE9BQXhCLENBQWdDLFNBQWhDLEdBQTRDLG1CQUFtQixLQUFLLFFBQUwsQ0FBYyxTQUFkLENBRmxEOzs7QUF6MkRKLGlDQSsyRFgsaUNBQVk7QUFDVixlQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLE9BQXhCLENBQWdDLFNBQWhDLEdBQTRDLENBQTVDLENBRFU7OztBQS8yREQsaUNBbzNEWCxxQ0FBYSxRQUFRO0FBQ25CLGVBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsT0FBeEIsQ0FBZ0MsU0FBaEMsR0FBNEMsTUFBNUMsQ0FEbUI7OztBQXAzRFYsaUNBeTNEWCx1Q0FBZTtBQUNiLGlCQUFPLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsT0FBeEIsQ0FBZ0MsU0FBaEMsQ0FETTs7O0FBejNESixpQ0E4M0RYLCtCQUFVLElBQUksT0FBTztBQUNuQixlQUFLLGVBQUwsQ0FBcUIsRUFBckIsRUFBeUIsS0FBekIsRUFEbUI7OztBQTkzRFYsaUNBazREWCx5REFBd0I7QUFDdEIsZUFBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixFQUExQixDQURzQjtBQUV0QixlQUFLLHFCQUFMLEdBRnNCOzs7QUFsNERiLGlDQXU0RFgsbURBQW9CLFdBQVc7QUFDN0IsZUFBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixTQUExQixDQUQ2QjtBQUU3QixlQUFLLHFCQUFMLEdBRjZCOzs7QUF2NERwQixpQ0E0NERYLCtDQUFtQjtBQUNqQixlQUFLLFFBQUwsQ0FBYyxpQkFBZCxHQUFrQyxJQUFsQyxDQURpQjtBQUVqQixlQUFLLHFCQUFMLEdBRmlCOzs7QUE1NERSLGlDQWk1RFgsK0NBQWtCLFdBQVc7QUFDM0IsZUFBSyxRQUFMLENBQWMsaUJBQWQsR0FBa0MsS0FBbEMsQ0FEMkI7QUFFM0IsZUFBSyxxQkFBTCxHQUYyQjs7O2VBajVEbEIiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
