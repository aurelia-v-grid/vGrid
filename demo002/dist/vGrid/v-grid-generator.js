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

          this.internalDragDropCount = 10;
          this.sortOrder = [];
          this.contentHeight = 0;
          this.gridHeight = 0;
          this.gridWidth = 0;
          this.queryStringCheck = {};
          this.scrollBodyHeight = 0;
          this.htmlCache = {
            grid: null,
            header: null,
            content: null,
            footer: null,
            rowsArray: [],
            scrollBody: null,
            rowTemplate: null };
          this.scrollVars = {
            lastScrollTop: 0,
            firstTop: 0,
            lastScrollLeft: 0,
            halt: false,
            timer: null,
            clickTimersArray: [],
            scrollCallbackTimer: null
          };

          this.vGridSelection = vGridSelection;
          this.vGridConfig = vGridConfig;
          this.vGridCellEdit = vGridCellEdit;
          this.vGridInterpolate = vGridInterpolate;
          this.vGridElement = vGridElement;
          this.vGridSortable = vGridSortable;
          this.init(false);
        }

        VGridGenerator.prototype.fillDataInRows = function fillDataInRows(clearAllRows) {
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.rowHeight;
            var row = this.htmlCache.rowsArray[i];
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
          if (!this.vGridConfig.addFilter) {
            lineHeigthStyleTag = "style=line-height:" + this.vGridConfig.headerHeight + "px;\"";
          } else {
            lineHeigthStyleTag = "style=line-height:" + this.vGridConfig.headerHeight / 2 + "px;\"";
          }

          if (this.vGridConfig.sortNotOnHeader.indexOf(attribute) !== -1) {
            return "";
          }

          if (this.vGridConfig.sortOnHeaderClick) {
            var main = "<span class=\"\"><span " + lineHeigthStyleTag + " class=\"" + this.vGridConfig.css.sortIcon + " " + this.vGridConfig.css.sortIconSort + "\"></span></span>";
            if (this.sortOrder.length === 0) {
              result = main;
            } else {
              this.sortOrder.forEach(function (x) {
                if (x.attribute === attribute) {
                  var isAsc = "<span " + lineHeigthStyleTag + " class=\"" + _this.vGridConfig.css.sortIcon + " " + _this.vGridConfig.css.sortIconAsc + "\"></span>";
                  var isDesc = "<span " + lineHeigthStyleTag + " class=\"" + _this.vGridConfig.css.sortIcon + " " + _this.vGridConfig.css.sortIconDesc + "\"></span>";

                  var asc = x.asc === true ? isAsc : isDesc;
                  var main = "<span " + lineHeigthStyleTag + " class=\"" + _this.vGridConfig.css.sortIcon + " " + _this.vGridConfig.css.sortIconNo + x.no + "\">";
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
            var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.rowHeight;
            if (rowno === currentRow) {
              var row = this.htmlCache.rowsArray[i];
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
            var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.rowHeight;
            if (this.vGridSelection.isSelected(currentRow)) {
              this.htmlCache.rowsArray[i].div.classList.add(this.vGridConfig.css.rowSelected);
            } else {
              this.htmlCache.rowsArray[i].div.classList.remove(this.vGridConfig.css.rowSelected);
            }
          }
        };

        VGridGenerator.prototype.getHeaderTemplate = function getHeaderTemplate(headerNamesArray, attributeNamesArray) {
          var rowTemplate = "";
          var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";
          var css = dragHandle + " " + this.vGridConfig.css.cellContent + " " + this.vGridConfig.css.orderHandle;
          for (var i = 0; i < headerNamesArray.length; i++) {
            var sortIcon = this.getSortIcon(attributeNamesArray[i]);
            rowTemplate = rowTemplate + ("<div><div class=\"" + css + "\" " + this.vGridConfig.atts.dataAttribute + "=\"" + attributeNamesArray[i] + "\">" + headerNamesArray[i] + sortIcon + "</div></div>");
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.getRowTemplate = function getRowTemplate(attributeNamesArray) {
          var rowTemplate = "";
          if (this.htmlCache.rowTemplate !== null) {
            rowTemplate = this.htmlCache.rowTemplate;
          } else {
            if (this.vGridConfig.onRowMarkupCreate) {
              rowTemplate = this.vGridConfig.onRowMarkupCreate(attributeNamesArray);
            } else {
              for (var i = 0; i < attributeNamesArray.length; i++) {
                if (this.vGridConfig.colTypeArray[i] === "image") {
                  rowTemplate = rowTemplate + ("<div><img class=\"" + this.vGridConfig.css.cellContent + "\" tabindex=\"0\" style=\"" + this.vGridConfig.colStyleArray[i] + "\" " + this.vGridConfig.atts.dataAttribute + "=\"" + attributeNamesArray[i] + "\" src=\"{{" + attributeNamesArray[i] + "}}\" ></div>");
                } else {
                  rowTemplate = rowTemplate + ("<div><input class=\"" + this.vGridConfig.css.cellContent + "\"  type=\"text\" readonly=\"true\" style=\"" + this.vGridConfig.colStyleArray[i] + "\" " + this.vGridConfig.atts.dataAttribute + "=\"" + attributeNamesArray[i] + "\" value=\"{{" + attributeNamesArray[i] + "}}\" ></input></div>");
                }
              }
            }
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.cacheRowTemplate = function cacheRowTemplate(template) {
          var stringTemplate = template || this.getRowTemplate(this.vGridConfig.attributeArray);
          this.vGridInterpolate.parse(stringTemplate);
          this.htmlCache.rowTemplate = stringTemplate;
        };

        VGridGenerator.prototype.getTotalColumnWidth = function getTotalColumnWidth() {
          var total = 0;
          for (var i = 0; i < this.vGridConfig.attributeArray.length; i++) {
            total = total + parseInt(this.vGridConfig.columnWidthArray[i], 10);
          }
          return total;
        };

        VGridGenerator.prototype.createHeaderMarkup = function createHeaderMarkup() {
          var tempColumns = document.createElement("DIV");
          tempColumns.innerHTML = this.getHeaderTemplate(this.vGridConfig.headerArray, this.vGridConfig.attributeArray);
          var i;
          for (i = 0; i < tempColumns.children.length; i++) {
            tempColumns.children[i].setAttribute("column-no", i);

            if (!this.vGridConfig.addFilter) {
              tempColumns.children[i].style["line-height"] = this.vGridConfig.headerHeight + "px";
            }

            tempColumns.children[i].style.height = "100%";
            tempColumns.children[i].style.width = this.vGridConfig.columnWidthArray[i] + "px";
            tempColumns.children[i].classList.add(this.vGridConfig.css.rowHeaderCell);
            tempColumns.children[i].classList.add(this.vGridConfig.css.rowHeaderColumn + i);
            tempColumns.children[i].classList.add(this.vGridConfig.css.gridColumn + i);
          }

          var row = document.createElement("DIV");
          row.className = this.vGridConfig.css.row + " " + this.vGridConfig.css.rowHeader;

          row.style.height = this.vGridConfig.headerHeight + "px";
          row.style.width = this.getTotalColumnWidth() + "px";
          row.innerHTML = tempColumns.innerHTML;

          var container = document.createElement("DIV");
          container.className = this.vGridConfig.css.rowContainer;
          container.appendChild(row);

          return container;
        };

        VGridGenerator.prototype.createRowMarkup = function createRowMarkup(entity, attributeNames) {
          var tempColumns = document.createElement("DIV");
          tempColumns.innerHTML = this.vGridInterpolate.render(this.getRowTemplate(attributeNames), entity);
          if (!this.vGridConfig.columnWidthArrayOverride) {
            var i;
            for (i = 0; i < tempColumns.children.length; i++) {
              tempColumns.children[i].style.height = "100%";

              tempColumns.children[i].style["line-height"] = this.vGridConfig.rowHeight - 2 + "px";

              tempColumns.children[i].style.width = this.vGridConfig.columnWidthArray[i] + "px";
              tempColumns.children[i].classList.add(this.vGridConfig.css.rowCell);
              tempColumns.children[i].classList.add(this.vGridConfig.css.rowColumn + i);
              tempColumns.children[i].classList.add(this.vGridConfig.css.gridColumn + i);
              if (this.vGridConfig.lockedColumns > i) {
                tempColumns.children[i].style.left = this.scrollVars.lastScrollLeft + "px";
                tempColumns.children[i].style.zIndex = this.internalDragDropCount;
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
          return this.htmlCache.rowsArray.length;
        };

        VGridGenerator.prototype.setRowTopValue = function setRowTopValue(rowArray, elementNo, topValue) {
          rowArray[elementNo].div.style.transform = "translate3d(0px," + topValue + "px, 0px)";
          rowArray[elementNo].top = topValue;
        };

        VGridGenerator.prototype.createGridHtmlWrapper = function createGridHtmlWrapper() {
          var x = document.createElement("DIV");
          this.vGridElement.appendChild(x);
          this.htmlCache.grid = x;

          this.htmlCache.grid.className = this.vGridConfig.css.wrapper;
          this.htmlCache.grid.style.position = "relative";
          this.htmlCache.grid.style.height = this.vGridElement.style.height || "100%";
          this.htmlCache.grid.style.width = this.vGridElement.style.width || "100%";

          this.gridHeight = this.htmlCache.grid.clientHeight;
          this.gridWidght = this.htmlCache.grid.clientWidth;
        };

        VGridGenerator.prototype.createGridHtmlHeaderWrapper = function createGridHtmlHeaderWrapper() {
          this.htmlCache.header = document.createElement("DIV");
          this.htmlCache.header.className = this.vGridConfig.css.mainHeader;
          this.htmlCache.header.style.height = this.vGridConfig.headerHeight + "px";
          this.htmlCache.grid.appendChild(this.htmlCache.header);

          var headerDivs = this.createHeaderMarkup(this.htmlCache.header);
          if (this.vGridConfig.addFilter) {
            var headerCells = headerDivs.lastElementChild.children;
            for (var i = 0; i < headerCells.length; i++) {
              this.addFilterToHeaderCell({
                attributeName: this.vGridConfig.attributeArray[i],
                headerName: this.vGridConfig.headerArray[i],
                defaultFilter: this.vGridConfig.filterArray[i],
                div: headerCells[i]
              });
            }
          }
          this.htmlCache.header.appendChild(headerDivs);
        };

        VGridGenerator.prototype.rebuildGridHeaderHtml = function rebuildGridHeaderHtml() {
          var getScrollLeft = this.htmlCache.header.firstChild.firstChild.style.left;
          this.htmlCache.header.removeChild(this.htmlCache.header.firstChild);

          var headerDivs = this.createHeaderMarkup(this.htmlCache.header);
          if (this.vGridConfig.addFilter) {
            var headerCells = headerDivs.lastElementChild.children;
            for (var i = 0; i < headerCells.length; i++) {
              this.addFilterToHeaderCell({
                attributeName: this.vGridConfig.attributeArray[i],
                headerName: this.vGridConfig.headerArray[i],
                defaultFilter: this.vGridConfig.filterArray[i],
                div: headerCells[i]
              });
            }
          }
          this.htmlCache.header.appendChild(headerDivs);
          this.addResizableAndSortableEvent();

          this.htmlCache.header.firstChild.firstChild.style.left = getScrollLeft;
        };

        VGridGenerator.prototype.createGridHtmlContentWrapper = function createGridHtmlContentWrapper() {
          var gridWrapperHeight = this.gridHeight;
          var headerAndFooterHeight = this.vGridConfig.headerHeight + this.vGridConfig.footerHeight;
          this.contentHeight = gridWrapperHeight - headerAndFooterHeight;

          this.htmlCache.content = document.createElement("DIV");
          this.htmlCache.content.className = this.vGridConfig.css.mainContent;
          this.htmlCache.content.style.height = this.contentHeight + "px";
          this.htmlCache.grid.appendChild(this.htmlCache.content);
        };

        VGridGenerator.prototype.createGridHtmlFooterWrapper = function createGridHtmlFooterWrapper() {
          this.htmlCache.footer = document.createElement("DIV");
          this.htmlCache.footer.className = this.vGridConfig.css.mainFooter;
          this.htmlCache.footer.style.height = this.vGridConfig.footerHeight + "px";
          this.htmlCache.grid.appendChild(this.htmlCache.footer);
        };

        VGridGenerator.prototype.setScrollBodyHeightToVar = function setScrollBodyHeightToVar() {
          var collectionLength = this.vGridConfig.getCollectionLength();
          this.scrollBodyHeight = collectionLength * this.vGridConfig.rowHeight;
        };

        VGridGenerator.prototype.createGridHtmlScrollBodyWrapper = function createGridHtmlScrollBodyWrapper() {
          this.setScrollBodyHeightToVar();

          this.htmlCache.scrollBody = document.createElement("DIV");
          this.htmlCache.scrollBody.className = this.vGridConfig.css.scrollBody;
          this.htmlCache.scrollBody.style.height = this.scrollBodyHeight + "px";
          this.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
          this.htmlCache.content.appendChild(this.htmlCache.scrollBody);
        };

        VGridGenerator.prototype.correctRowAndScrollbodyWidth = function correctRowAndScrollbodyWidth() {
          this.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
          for (var i = 0; i < this.htmlCache.rowsArray.length; i++) {
            this.htmlCache.rowsArray[i].div.style.width = this.getTotalColumnWidth() + "px";
          }
          this.htmlCache.header.firstChild.firstChild.style.width = this.getTotalColumnWidth() + "px";
        };

        VGridGenerator.prototype.correctHeaderAndScrollbodyWidth = function correctHeaderAndScrollbodyWidth() {
          this.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
          this.htmlCache.header.firstChild.firstChild.style.width = this.getTotalColumnWidth() + "px";
        };

        VGridGenerator.prototype.createGridHtmlRowWrapper = function createGridHtmlRowWrapper() {
          var minimumRowsNeeded = parseInt(this.contentHeight / this.vGridConfig.rowHeight, 10) * 2;

          if (this.vGridConfig.largeBuffer) {
            minimumRowsNeeded = minimumRowsNeeded * 5;
          }

          if (minimumRowsNeeded % 2 === 1) {
            minimumRowsNeeded = minimumRowsNeeded + 9;
          } else {
            minimumRowsNeeded = minimumRowsNeeded + 8;
          }

          var top = 0;
          for (var i = 0; i < minimumRowsNeeded; i++) {

            var row = document.createElement("DIV");

            row.className = this.vGridConfig.css.row;

            if (i % 2 === 1) {
              row.classList.add(this.vGridConfig.css.rowAlt);
            } else {
              row.classList.add(this.vGridConfig.css.rowEven);
            }

            row.style.height = this.vGridConfig.rowHeight + "px";

            this.setRowTopValue([{
              div: row,
              top: 0
            }], 0, top);

            row.style.minWidth = this.htmlCache.grid.offsetWidth + "px";
            row.style.width = this.getTotalColumnWidth() + "px";

            row.innerHTML = this.setEmptyTemplate();

            this.htmlCache.scrollBody.appendChild(row);

            this.htmlCache.rowsArray.push({
              div: row,
              top: top
            });

            top = top + this.vGridConfig.rowHeight;
          }
        };

        VGridGenerator.prototype.insertRowMarkup = function insertRowMarkup(rowNo, rowHtmlElement, isDownScroll, isLargeScroll) {
          var _this2 = this;

          this.vGridConfig.getDataElement(rowNo, isDownScroll, isLargeScroll, function (entity) {
            var container = document.createElement("DIV");
            container.className = _this2.vGridConfig.css.rowContainer;

            if (_this2.vGridConfig.columnWidthArrayOverride) {
              container.style.width = "100%";
            }

            rowHtmlElement.setAttribute("row", rowNo);

            var innerHtml = "";
            if (entity) {
              innerHtml = _this2.createRowMarkup(entity, _this2.vGridConfig.attributeArray);
            }
            if (!entity) {
              rowHtmlElement.classList.add(_this2.vGridConfig.css.noData);
            } else {
              rowHtmlElement.classList.remove(_this2.vGridConfig.css.noData);
            }

            if (rowNo % 2 === 1) {
              if (rowHtmlElement.classList.contains(_this2.vGridConfig.css.rowEven)) {
                rowHtmlElement.classList.remove(_this2.vGridConfig.css.rowEven);
                rowHtmlElement.classList.add(_this2.vGridConfig.css.rowAlt);
              }
            } else {
              if (rowHtmlElement.classList.contains(_this2.vGridConfig.css.rowAlt)) {
                rowHtmlElement.classList.remove(_this2.vGridConfig.css.rowAlt);
                rowHtmlElement.classList.add(_this2.vGridConfig.css.rowEven);
              }
            }

            if (_this2.vGridSelection.isSelected(rowNo)) {
              rowHtmlElement.classList.add(_this2.vGridConfig.css.rowSelected);
            } else {
              rowHtmlElement.classList.remove(_this2.vGridConfig.css.rowSelected);
            }

            container.innerHTML = innerHtml;
            if (rowHtmlElement.firstChild) {
              if (rowHtmlElement.firstChild.innerHTML !== innerHtml) {
                rowHtmlElement.appendChild(container);
              }
            } else {
              rowHtmlElement.appendChild(container);
            }

            if (_this2.vGridConfig.onCellDraw) {
              var rowCells = rowHtmlElement.lastElementChild.children;
              for (var i = 0; i < rowCells.length; i++) {
                _this2.vGridConfig.onCellDraw({
                  attributeName: _this2.vGridConfig.attributeArray[i],
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
              var queryHtmlInput = _this3.vGridElement.querySelectorAll("." + _this3.vGridConfig.css.filterHandle);

              var queryParams = [];
              for (var i = 0; i < queryHtmlInput.length; i++) {
                if (queryHtmlInput[i].value !== "" && queryHtmlInput[i].value !== undefined) {
                  var dataSourceAttribute = queryHtmlInput[i].getAttribute(_this3.vGridConfig.atts.dataAttribute);
                  var operator = _this3.vGridConfig.filterArray[_this3.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];

                  var value = queryHtmlInput[i].value;

                  queryParams.push({
                    attribute: dataSourceAttribute,
                    value: value,
                    operator: operator
                  });

                  _this3.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value;
                } else {

                  if (queryHtmlInput[i].value === "") {
                    var dataSourceAttribute = queryHtmlInput[i].getAttribute(_this3.vGridConfig.atts.dataAttribute);
                    _this3.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value = "";
                  }
                }
              }
              _this3.vGridConfig.onFilterRun(queryParams);
            }
          };

          var onKeyUpEventOnFilter = function onKeyUpEventOnFilter(e) {
            if (e.keyCode === 13 && triggerRan === false) {
              e.target.onchange(e);
            }
          };

          var getHeaderCellMarkup = function getHeaderCellMarkup(labelTopCell, valueInput, attribute) {

            var dragHandle = _this3.vGridConfig.isSortableHeader ? _this3.vGridConfig.css.dragHandle : "";

            var cssLabel = _this3.vGridConfig.css.cellContent + " " + _this3.vGridConfig.css.filterLabelTop + " " + dragHandle + " " + _this3.vGridConfig.css.orderHandle;
            var cssInput = _this3.vGridConfig.css.cellContent + " " + _this3.vGridConfig.css.filterInputBottom + " " + _this3.vGridConfig.css.filterHandle;

            if (_this3.vGridConfig.filterOnAtTop) {
              cssLabel = _this3.vGridConfig.css.cellContent + " " + _this3.vGridConfig.css.filterLabelBottom + " " + dragHandle + " " + _this3.vGridConfig.css.orderHandle;
              cssInput = _this3.vGridConfig.css.cellContent + " " + _this3.vGridConfig.css.filterInputTop + " " + _this3.vGridConfig.css.filterHandle;
            }

            var sortIcon = _this3.getSortIcon(attribute);

            var filter = _this3.vGridConfig.filterArray[_this3.vGridConfig.attributeArray.indexOf(attribute)] || "filter";
            var filterName = _this3.vGridConfig.getFilterName(filter);

            var lineHeigth = "line-height:" + _this3.vGridConfig.headerHeight / 2 + "px;";

            var cellLabel = "<div style=\"" + lineHeigth + "\" class=\"" + cssLabel + "\" " + _this3.vGridConfig.atts.dataAttribute + "=\"" + attribute + "\">" + labelTopCell + " " + sortIcon + "</div>";
            var cellInput = "<input style=\"" + lineHeigth + "\" placeholder=\"" + filterName + "\" class=\"" + cssInput + "\" " + _this3.vGridConfig.atts.dataAttribute + "=\"" + attribute + "\" value=\"" + valueInput + "\"/>";

            if (_this3.vGridConfig.doNotAddFilterTo.indexOf(attribute) !== -1) {
              cellInput = "<div class=\"" + cssLabel + "\" " + _this3.vGridConfig.atts.dataAttribute + "=\"" + attribute + "\"></div>";
            }

            var result;
            if (_this3.vGridConfig.filterOnAtTop) {
              result = cellInput + cellLabel;
            } else {
              result = cellLabel + cellInput;
            }
            return result;
          };

          var value = "";

          if (this.queryStringCheck[attributeName] !== undefined) {
            value = this.queryStringCheck[attributeName];
          }

          var onFocus = function onFocus(e) {
            var currentScrollLeft = e.target.offsetParent.offsetParent.offsetParent.scrollLeft;
            _this3.htmlCache.content.scrollLeft = currentScrollLeft;
          };

          event.div.innerHTML = getHeaderCellMarkup(headerName, value, attributeName);

          var cellInputElement = event.div.querySelectorAll("." + this.vGridConfig.css.filterHandle);
          if (this.vGridConfig.filterOnKey !== true) {
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

          this.scrollVars.lastScrollTop = this.htmlCache.content.scrollTop;

          if (this.htmlCache.content.scrollTop === 0 && this.scrollVars.lastScrollTop !== this.htmlCache.content.scrollTop) {
            this.scrollVars.lastScrollTop = 0;
          }

          if (this.vGridConfig.getCollectionLength() <= this.htmlCache.rowsArray.length) {
            this.scrollVars.lastScrollTop = 0;
          }

          var currentRow = parseInt(this.scrollVars.lastScrollTop / this.vGridConfig.rowHeight, 10);
          this.scrollVars.firstTop = currentRow * this.vGridConfig.rowHeight;
          var currentRowTop = this.vGridConfig.rowHeight * currentRow;
          var bottomHitCount;
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var setNewTopOnRow = function setNewTopOnRow(cacheRowNumber) {
              var row = _this4.htmlCache.rowsArray[cacheRowNumber];
              _this4.setRowTopValue([row], 0, currentRowTop);

              if (row.div.firstChild) {
                row.div.removeChild(row.div.firstChild);
              }
              currentRowTop = currentRowTop + _this4.vGridConfig.rowHeight;
            };

            if (currentRow >= 0 && currentRow <= this.vGridConfig.getCollectionLength() - 1) {
              setNewTopOnRow(i);
            }

            if (currentRow === this.vGridConfig.getCollectionLength() - 1 && this.getRowCacheLength() < this.vGridConfig.getCollectionLength() - 1) {
              bottomHitCount = i;
            }

            if (currentRow > this.vGridConfig.getCollectionLength() - 1) {
              setNewTopOnRow(i);
            }

            if (currentRow >= this.vGridConfig.getCollectionLength() && currentRowTop >= this.htmlCache.content.clientHeight) {
              var row = this.htmlCache.rowsArray[i];
              this.setRowTopValue([row], 0, currentRowTop - 5000);
              if (row.div.firstChild) {
                row.div.removeChild(row.div.firstChild);
              }
            }

            currentRow++;
          }

          if (bottomHitCount) {
            var firstTop = parseInt(this.htmlCache.rowsArray[0].top, 10);
            for (i = this.getRowCacheLength() - 1; i > bottomHitCount; i--) {
              var row = this.htmlCache.rowsArray[i];
              firstTop = firstTop - this.vGridConfig.rowHeight;
              this.setRowTopValue(this.htmlCache.rowsArray, i, firstTop);
              try {
                row.div.removeChild(row.div.firstChild);
              } catch (e) {}
            }
          }

          this.htmlCache.rowsArray.sort(function (a, b) {
            return parseInt(a.top) - parseInt(b.top);
          });

          this.fillDataInRows(false);
        };

        VGridGenerator.prototype.onNormalScrolling = function onNormalScrolling(isDownScroll, currentScrollTop) {
          var currentScrollTop = this.htmlCache.content.scrollTop;
          if (this.scrollVars.halt === false) {
            var newTopValue;
            var currentRow = parseInt(this.scrollVars.lastScrollTop / this.vGridConfig.rowHeight, 10);
            this.scrollVars.firstTop = currentRow * this.vGridConfig.rowHeight;

            for (var i = 0; i < this.getRowCacheLength(); i++) {

              var row = this.htmlCache.rowsArray[i];
              var rowTop = parseInt(row.top, 10);
              var update = false;

              if (isDownScroll) {
                if (rowTop < currentScrollTop - this.vGridConfig.rowHeight) {
                  update = true;
                  newTopValue = rowTop + this.vGridConfig.rowHeight * this.getRowCacheLength();
                  currentRow = (rowTop + this.vGridConfig.rowHeight * this.getRowCacheLength()) / this.vGridConfig.rowHeight;
                }
                if (rowTop > (this.vGridConfig.getCollectionLength() - 1) * this.vGridConfig.rowHeight && rowTop > parseInt(this.htmlCache.content.style.height)) {
                  this.setRowTopValue([row], 0, -5000 + i);
                }
              } else {
                if (rowTop > currentScrollTop + this.contentHeight) {
                  update = true;
                  newTopValue = rowTop - this.vGridConfig.rowHeight * this.getRowCacheLength();
                  currentRow = (rowTop - this.vGridConfig.rowHeight * this.getRowCacheLength()) / this.vGridConfig.rowHeight;
                }
              }

              if (update === true && currentRow >= 0 && currentRow <= this.vGridConfig.getCollectionLength() - 1) {
                this.setRowTopValue([row], 0, newTopValue);
                if (row.div.firstChild) {
                  row.div.removeChild(row.div.firstChild);
                }
                this.insertRowMarkup(currentRow, row.div, isDownScroll, false);
              }
            }
            this.htmlCache.rowsArray.sort(function (a, b) {
              return parseInt(a.top) - parseInt(b.top);
            });
          } else {
            this.onScrollbarScrolling();
          }
        };

        VGridGenerator.prototype.hideRowsThatIsLargerThanCollection = function hideRowsThatIsLargerThanCollection() {
          var currentRow = parseInt(this.scrollVars.lastScrollTop / this.vGridConfig.rowHeight, 10);
          this.scrollVars.firstTop = currentRow * this.vGridConfig.rowHeight;
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var row = this.htmlCache.rowsArray[i];
            var rowTop = parseInt(row.top, 10);
            if (rowTop > (this.vGridConfig.getCollectionLength() - 1) * this.vGridConfig.rowHeight && rowTop > parseInt(this.htmlCache.content.style.height) - this.vGridConfig.rowHeight) {
              this.setRowTopValue([row], 0, -5000 + i);
            }
          }

          this.htmlCache.rowsArray.sort(function (a, b) {
            return parseInt(a.top) - parseInt(b.top);
          });
        };

        VGridGenerator.prototype.onScrollbarScrolling = function onScrollbarScrolling() {
          var _this5 = this;

          this.scrollVars.halt = true;

          var timeout = this.vGridConfig.dataScrollDelay;

          clearTimeout(this.scrollVars.timer);

          this.scrollVars.timer = setTimeout(function () {
            _this5.onNormalScrollingLarge();
            _this5.scrollVars.halt = false;
          }, timeout);
        };

        VGridGenerator.prototype.onScrollClickCancel = function onScrollClickCancel() {
          var _this6 = this;

          this.scrollVars.clickTimersArray.forEach(function (xTimer) {
            clearTimeout(xTimer);
          });

          if (this.scrollVars.clickTimersArray.length > 0) {
            setTimeout(function () {
              _this6.scrollVars.clickTimersArray.forEach(function (xTimer) {
                clearTimeout(xTimer);
              });
            }, 0);
          }
        };

        VGridGenerator.prototype.onScroll = function onScroll() {
          var _this7 = this;

          this.vGridCellEdit.onScroll();

          var doScroll = function doScroll() {
            var currentScrollTop = _this7.htmlCache.content.scrollTop;
            var currentScrollLeft = _this7.htmlCache.content.scrollLeft;

            if (currentScrollTop !== _this7.scrollVars.lastScrollTop) {
              if (currentScrollLeft !== 0) {
                _this7.htmlCache.content.scrollLeft = _this7.scrollVars.lastScrollLeft;
                _this7.htmlCache.header.scrollLeft = _this7.scrollVars.lastScrollLeft;
              }

              _this7.onScrollClickCancel();

              var isDownScroll = true;
              if (currentScrollTop < _this7.scrollVars.lastScrollTop) {
                isDownScroll = false;
              }

              var isLargeScroll;

              switch (true) {
                case currentScrollTop > _this7.scrollVars.lastScrollTop + _this7.vGridConfig.largeScrollLimit:
                case currentScrollTop < _this7.scrollVars.lastScrollTop - _this7.vGridConfig.largeScrollLimit:
                  isLargeScroll = true;
                  break;

                default:
                  isLargeScroll = false;
              }

              _this7.scrollVars.lastScrollTop = currentScrollTop;

              if (isLargeScroll) {
                if (_this7.vGridConfig.renderOnScrollbarScroll) {
                  _this7.onNormalScrollingLarge(isDownScroll, currentScrollTop);
                } else {
                  _this7.onScrollbarScrolling();
                }
              } else {
                _this7.onNormalScrolling(isDownScroll, currentScrollTop);
              }
            } else {

              if (_this7.htmlCache.content.style.overflowX === "hidden") {
                _this7.htmlCache.content.scrollLeft = 0;
                _this7.scrollVars.lastScrollLeft = 0;
                _this7.htmlCache.header.scrollLeft = 0;
              } else {
                if (_this7.scrollVars.lastScrollLeft !== currentScrollLeft) {
                  currentScrollLeft = _this7.htmlCache.content.scrollLeft;
                  _this7.scrollVars.lastScrollLeft = currentScrollLeft;
                  _this7.htmlCache.header.scrollLeft = currentScrollLeft;
                }
              }

              if (_this7.vGridConfig.lockedColumns > 0) {
                currentScrollLeft = _this7.htmlCache.content.scrollLeft;
                for (var lockedColNo = _this7.vGridConfig.lockedColumns; lockedColNo--;) {

                  var fixHeader = _this7.vGridElement.querySelectorAll("." + _this7.vGridConfig.css.rowHeaderColumn + lockedColNo);
                  var fixRow = _this7.vGridElement.querySelectorAll("." + _this7.vGridConfig.css.rowColumn + lockedColNo);

                  for (var i = fixHeader.length; i--;) {
                    fixHeader[i].style.left = currentScrollLeft + "px";
                    fixHeader[i].style.zIndex = _this7.internalDragDropCount;
                    fixHeader[i].style.position = "relative";
                  }
                  for (var i = fixRow.length; i--;) {
                    fixRow[i].style.left = currentScrollLeft + "px";
                    fixRow[i].style.zIndex = _this7.internalDragDropCount;
                    fixRow[i].style.position = "relative";
                  }
                }
              }
            }
          };
          clearTimeout(this.scrollVars.scrollCallbackTimer);
          if (this.vGridConfig.requestAnimationFrame) {
            requestAnimationFrame(function () {
              doScroll();
            });
          } else {
            doScroll();
          }
          this.scrollVars.scrollCallbackTimer = setTimeout(function () {
            _this7.vGridConfig.onScrolled();
          }, 250);
        };

        VGridGenerator.prototype.updateGridScrollbars = function updateGridScrollbars() {

          var collectionHeight = this.vGridConfig.getCollectionLength() * this.vGridConfig.rowHeight + this.vGridConfig.rowHeight / 2;
          var bodyHeight = this.htmlCache.content.offsetHeight;


          if (collectionHeight <= bodyHeight) {
            this.htmlCache.content.scrollTop = 0;

            this.htmlCache.content.style.overflow = "";
            this.htmlCache.content.style.overflowY = "hidden";
            this.htmlCache.content.style.overflowX = "hidden";
            this.htmlCache.header.style.overflowY = "hidden";
          } else {
            this.htmlCache.content.style.overflow = "";
            this.htmlCache.content.style.overflowY = "scroll";
            this.htmlCache.content.style.overflowX = "hidden";
            this.htmlCache.header.style.overflowY = "scroll";
          }

          if (this.htmlCache.content.offsetWidth - 5 < this.getTotalColumnWidth()) {
            this.htmlCache.content.style.overflowX = "scroll";
          }
        };

        VGridGenerator.prototype.addResizableAndSortableEvent = function addResizableAndSortableEvent() {
          var _this8 = this;

          var resizable = false;
          var screenX;
          var xElement;
          var sortable = false;

          if (this.vGridConfig.sortOnHeaderClick) {
            var orderByClick = function orderByClick(event) {
              if (!sortable && !resizable) {
                _this8.vGridConfig.onOrderBy(event, function (sortorder) {
                  _this8.sortOrder = sortorder;
                  _this8.rebuildGridHeaderHtml();
                });
              }
            };

            var orderBy = this.vGridElement.querySelectorAll("." + this.vGridConfig.css.orderHandle);
            for (var i = 0; i < orderBy.length; i++) {
              orderBy[i].addEventListener("click", orderByClick.bind(this), false);
            }
          }

          if (this.vGridConfig.isResizableHeaders) {
            var x = this.htmlCache.header.querySelectorAll("." + this.vGridConfig.css.rowHeaderCell);
            for (var i = 0; i < x.length; i++) {

              var temp = document.createElement("DIV");
              temp.classList.add(this.vGridConfig.css.resizeHeaderDragHandle);

              temp.onmousedown = function (e) {
                resizable = true;

                if (_this8.vGridConfig.isSortableHeader) {
                  _this8.sortableCtx.option("disabled", resizable);
                }
                screenX = e.screenX;
                xElement = e.target;
                var originalWidth = xElement.offsetParent.style.width;
                var originalWidthx = xElement.offsetParent.style.width;
                var index = xElement.offsetParent.getAttribute("column-no");


                _this8.htmlCache.header.onmousemove = function (e) {
                  _this8.htmlCache.header.onmouseup = function () {
                    setTimeout(function () {
                      resizable = false;
                      if (_this8.vGridConfig.isSortableHeader) {
                        _this8.sortableCtx.option("disabled", resizable);
                      }
                    }, 30);

                    _this8.htmlCache.header.onmouseleave = "";
                    _this8.htmlCache.header.onmousemove = "";
                    _this8.htmlCache.header.onmouseup = "";


                    _this8.vGridConfig.columnWidthArray[index] = parseInt(xElement.offsetParent.style.width);

                    _this8.htmlCache.rowTemplate = null;
                    _this8.correctRowAndScrollbodyWidth();

                    _this8.cacheRowTemplate(null);
                    _this8.updateGridScrollbars();
                    _this8.fillDataInRows(true);
                  };

                  _this8.htmlCache.header.onmouseleave = function (e) {
                    _this8.htmlCache.header.onmouseup(e);
                  };

                  if (resizable) {
                    var newWidth = parseInt(originalWidth) - (screenX - e.screenX) + "px";
                    _this8.vGridConfig.columnWidthArray[index] = parseInt(newWidth);
                    xElement.offsetParent.style.width = parseInt(originalWidth) - (screenX - e.screenX) + "px";
                    xElement.offsetParent.style.width = parseInt(originalWidthx) - (screenX - e.screenX) + "px";
                    if (_this8.vGridConfig.resizableHeadersAndRows) {
                      var columnsToFix = _this8.htmlCache.content.firstChild.querySelectorAll("." + _this8.vGridConfig.css.rowColumn + index);

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
          var dragHandles = this.htmlCache.grid.querySelectorAll("." + this.vGridConfig.css.dragHandle);
          [].slice.call(dragHandles).forEach(function (itemEl) {
            itemEl.onmouseenter = function () {
              canMove = true;
            };
            itemEl.onmouseleave = function () {
              canMove = false;
            };
          });

          if (this.vGridConfig.isSortableHeader) {
            this.sortableCtx = new this.vGridSortable(this.htmlCache.header.firstChild.firstChild, function (oldIndex, newIndex) {
              var children = _this8.htmlCache.header.firstChild.firstChild.children;

              var x;
              x = _this8.vGridConfig.attributeArray[oldIndex];
              _this8.vGridConfig.attributeArray.splice(oldIndex, 1);
              _this8.vGridConfig.attributeArray.splice(newIndex, 0, x);

              x = _this8.vGridConfig.filterArray[oldIndex];
              _this8.vGridConfig.filterArray.splice(oldIndex, 1);
              _this8.vGridConfig.filterArray.splice(newIndex, 0, x);

              x = _this8.vGridConfig.headerArray[oldIndex];
              _this8.vGridConfig.headerArray.splice(oldIndex, 1);
              _this8.vGridConfig.headerArray.splice(newIndex, 0, x);

              x = _this8.vGridConfig.columnWidthArray[oldIndex];
              _this8.vGridConfig.columnWidthArray.splice(oldIndex, 1);
              _this8.vGridConfig.columnWidthArray.splice(newIndex, 0, x);

              x = _this8.vGridConfig.colStyleArray[oldIndex];
              _this8.vGridConfig.colStyleArray.splice(oldIndex, 1);
              _this8.vGridConfig.colStyleArray.splice(newIndex, 0, x);

              x = _this8.vGridConfig.colTypeArray[oldIndex];
              _this8.vGridConfig.colTypeArray.splice(oldIndex, 1);
              _this8.vGridConfig.colTypeArray.splice(newIndex, 0, x);

              _this8.htmlCache.rowTemplate = null;
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
            _this9.vGridConfig.clickHandler(e, currentRow);
            if (_this9.vGridConfig.isMultiSelect !== undefined) {
              _this9.vGridSelection.setHightlight(e, currentRow, _this9);
            }
          };

          var handleDblClick = function handleDblClick(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this9.vGridConfig.clickHandler(e, currentRow);
          };

          var onMouseDownRow = function onMouseDownRow(e) {
            if (e.button === 2) {}
          };

          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var div = this.htmlCache.rowsArray[i].div;

            div.addEventListener("dblclick", handleDblClick.bind(this), false);
            div.addEventListener("click", handleClick.bind(this), false);
            div.addEventListener("contextmenu", onMouseDownRow.bind(this), false);
          }

          this.htmlCache.content.addEventListener("scroll", this.onScroll.bind(this));

          this.addResizableAndSortableEvent();
        };

        VGridGenerator.prototype.correctColumnsWidthArray = function correctColumnsWidthArray() {
          var newColumnWidth = [];
          for (var i = 0; i < this.vGridConfig.attributeArray.length; i++) {
            var columnWidth = this.vGridConfig.columnWidthArray[i] || 100;
            newColumnWidth.push(columnWidth);
          }
          this.vGridConfig.columnWidthArray = newColumnWidth;
        };

        VGridGenerator.prototype.setLargeScrollLimit = function setLargeScrollLimit() {
          if (!this.vGridConfig.largeScrollLimit) {
            this.vGridConfig.largeScrollLimit = this.contentHeight * 3.3;
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
            this.vGridSelection.setMode(this.vGridConfig.isMultiSelect);
          }

          if (this.vGridConfig.predefinedScrolltop) {
            this.setScrollTop(this.vGridConfig.predefinedScrolltop);
          }

          this.fillDataInRows(false);

          this.setLargeScrollLimit();
        };

        VGridGenerator.prototype.redrawGrid = function redrawGrid() {
          this.vGridElement.getElementsByClassName(this.vGridConfig.css.wrapper)[0].remove();
          this.htmlCache.rowsArray = [];
          this.htmlCache.header = null;
          this.htmlCache.content = null;
          this.htmlCache.footer = null;
          this.htmlCache.scrollBody = null;
          this.htmlCache.rowTemplate = null;

          this.init(true);
          this.fixHeaderWithBody();
        };

        VGridGenerator.prototype.fixHeaderWithBody = function fixHeaderWithBody() {
          var currentScrollLeft = this.htmlCache.content.scrollLeft;
          this.htmlCache.header.scrollLeft = currentScrollLeft;
          if (this.vGridConfig.lockedColumns > 0) {
            currentScrollLeft = this.htmlCache.content.scrollLeft;
            for (var lockedColNo = this.vGridConfig.lockedColumns; lockedColNo--;) {
              var fix = this.vGridElement.querySelectorAll("." + this.vGridConfig.css.gridColumn + lockedColNo);

              for (var i = fix.length; i--;) {
                fix[i].style.left = currentScrollLeft + "px";
                fix[i].style.zIndex = this.internalDragDropCount;
                fix[i].style.position = "relative";
              }
            }
          }
        };

        VGridGenerator.prototype.rebuildColumns = function rebuildColumns() {
          this.correctColumnsWidthArray();
          this.htmlCache.rowTemplate = null;
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
          this.htmlCache.rowTemplate = null;
          this.cacheRowTemplate(null);
          this.rebuildGridHeaderHtml();
          this.fillDataInRows(true);
          this.updateSelectionOnAllRows();
          this.collectionChange(resetScrollToTop);
        };

        VGridGenerator.prototype.collectionChange = function collectionChange(resetScrollToTop, scrollBottom) {
          this.setScrollBodyHeightToVar();
          this.htmlCache.scrollBody.style.height = this.scrollBodyHeight + "px";
          var reset = false;
          if (resetScrollToTop === true) {
            this.htmlCache.content.scrollTop = 0;
          }
          if (this.scrollBodyHeight < this.htmlCache.content.scrollTop || scrollBottom) {
            var collectionLength = this.vGridConfig.getCollectionLength();
            var contentRows = parseInt(this.htmlCache.content.offsetHeight / this.vGridConfig.rowHeight);
            var scrollOffsetHeight = contentRows * this.vGridConfig.rowHeight;
            this.htmlCache.content.scrollTop = collectionLength * this.vGridConfig.rowHeight - scrollOffsetHeight;
          }

          this.updateGridScrollbars();
          this.correctRowAndScrollbodyWidth();
          this.updateSelectionOnAllRows();
          this.fixHeaderWithBody();
          this.onNormalScrollingLarge();
          this.fillDataInRows(true);
          if (scrollBottom) {
            this.htmlCache.content.scrollTop = this.htmlCache.content.scrollTop + this.vGridConfig.rowHeight;
          }
        };

        VGridGenerator.prototype.setRowHeight = function setRowHeight(newHeight) {
          this.vGridConfig.rowHeight = newHeight;
          this.redrawGrid();
        };

        VGridGenerator.prototype.setHeaderHeight = function setHeaderHeight(newHeight) {
          this.vGridConfig.headerHeight = newHeight;
          this.redrawGrid();
        };

        VGridGenerator.prototype.setFooterHeight = function setFooterHeight(newHeight) {
          this.vGridConfig.footerHeight = newHeight;
          this.redrawGrid();
        };

        VGridGenerator.prototype.disableHeaderFilter = function disableHeaderFilter() {
          this.vGridConfig.addFilter = false;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.enableHeaderFilter = function enableHeaderFilter() {
          this.vGridConfig.addFilter = true;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setHeaderFilterAtBottom = function setHeaderFilterAtBottom() {
          this.vGridConfig.filterOnAtTop = false;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setHeaderFilterAtTop = function setHeaderFilterAtTop() {
          this.vGridConfig.filterOnAtTop = true;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setColumns = function setColumns(paramObj) {
          this.vGridConfig.headerArray = paramObj.headerArray;
          this.vGridConfig.attributeArray = paramObj.attributeArray;
          this.vGridConfig.columnWidthArray = paramObj.columnWidthArray;
        };

        VGridGenerator.prototype.getColumns = function getColumns() {
          return {
            "headerArray": this.vGridConfig.headerArray,
            "attributeArray": this.vGridConfig.attributeArray,
            "columnWidthArray": this.vGridConfig.columnWidthArray
          };
        };

        VGridGenerator.prototype.setLockedColumns = function setLockedColumns(numberOfLockedColumns) {
          this.vGridConfig.lockedColumns = numberOfLockedColumns;
          this.rebuildColumns();
        };

        VGridGenerator.prototype.enableResizableColumns = function enableResizableColumns(option) {
          this.vGridConfig.isResizableHeaders = true;
          this.vGridConfig.resizableHeadersAndRows = option;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.disableResizableColumns = function disableResizableColumns() {
          this.vGridConfig.isResizableHeaders = false;
          this.vGridConfig.resizableHeadersAndRows = false;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.enableSortableColumns = function enableSortableColumns() {
          this.vGridConfig.isSortableHeader = true;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.disableSortableColumns = function disableSortableColumns() {
          this.vGridConfig.isSortableHeader = false;
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
          var collectionLength = this.vGridConfig.getCollectionLength();
          this.htmlCache.content.scrollTop = collectionLength * this.vGridConfig.rowHeight;
        };

        VGridGenerator.prototype.scrollTop = function scrollTop() {
          this.htmlCache.content.scrollTop = 0;
        };

        VGridGenerator.prototype.setScrollTop = function setScrollTop(newTop) {
          this.htmlCache.content.scrollTop = newTop;
        };

        VGridGenerator.prototype.getScrollTop = function getScrollTop() {
          return this.htmlCache.content.scrollTop;
        };

        VGridGenerator.prototype.updateRow = function updateRow(no, clear) {
          this.fillDataIntoRow(no, clear);
        };

        VGridGenerator.prototype.clearHeaderSortFilter = function clearHeaderSortFilter() {
          this.sortOrder = [];
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setHeaderSortFilter = function setHeaderSortFilter(sortOrder) {
          this.sortOrder = sortOrder;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.enableHeaderSort = function enableHeaderSort() {
          this.vGridConfig.sortOnHeaderClick = true;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.disableHeaderSort = function disableHeaderSort(sortOrder) {
          this.vGridConfig.sortOnHeaderClick = false;
          this.rebuildGridHeaderHtml();
        };

        return VGridGenerator;
      }());

      _export("VGridGenerator", VGridGenerator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBT2E7QUFHWCxpQkFIVyxjQUdYLENBQVksV0FBWixFQUF5QixnQkFBekIsRUFBMkMsWUFBM0MsRUFBeUQsYUFBekQsRUFBd0UsY0FBeEUsRUFBd0YsYUFBeEYsRUFBdUc7Z0NBSDVGLGdCQUc0Rjs7ZUFrQnZHLHdCQUF3QixHQWxCK0U7ZUFtQnZHLFlBQVksR0FuQjJGO2VBb0J2RyxnQkFBZ0IsRUFwQnVGO2VBcUJ2RyxhQUFhLEVBckIwRjtlQXNCdkcsWUFBWSxFQXRCMkY7ZUF1QnZHLG1CQUFtQixHQXZCb0Y7ZUF3QnZHLG1CQUFtQixFQXhCb0Y7ZUEwQnZHLFlBQVk7QUFDVixrQkFBTSxJQUFOO0FBQ0Esb0JBQVEsSUFBUjtBQUNBLHFCQUFTLElBQVQ7QUFDQSxvQkFBUSxJQUFSO0FBQ0EsdUJBQVcsRUFBWDtBQUNBLHdCQUFZLElBQVo7QUFDQSx5QkFBYSxJQUFiLEdBakNxRztlQW9DdkcsYUFBYTtBQUNYLDJCQUFlLENBQWY7QUFDQSxzQkFBVSxDQUFWO0FBQ0EsNEJBQWdCLENBQWhCO0FBQ0Esa0JBQU0sS0FBTjtBQUNBLG1CQUFPLElBQVA7QUFDQSw4QkFBa0IsRUFBbEI7QUFDQSxpQ0FBcUIsSUFBckI7WUEzQ3FHOztBQUNyRyxlQUFLLGNBQUwsR0FBc0IsY0FBdEIsQ0FEcUc7QUFFckcsZUFBSyxXQUFMLEdBQW1CLFdBQW5CLENBRnFHO0FBR3JHLGVBQUssYUFBTCxHQUFxQixhQUFyQixDQUhxRztBQUlyRyxlQUFLLGdCQUFMLEdBQXdCLGdCQUF4QixDQUpxRztBQUtyRyxlQUFLLFlBQUwsR0FBb0IsWUFBcEIsQ0FMcUc7QUFNckcsZUFBSyxhQUFMLEdBQXFCLGFBQXJCLENBTnFHO0FBT3JHLGVBQUssSUFBTCxDQUFVLEtBQVYsRUFQcUc7U0FBdkc7O0FBSFcsaUNBdURYLHlDQUFlLGNBQWM7QUFDM0IsZUFBSyxJQUFJLElB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bkIsZUFBSyxlQUFMLENBQXFCLEVBQXJCLEVBQXlCLEtBQXpCLEVBRG1COzs7QUE1d0RWLGlDQWd4RFgseURBQXdCO0FBQ3RCLGVBQUssU0FBTCxHQUFpQixFQUFqQixDQURzQjtBQUV0QixlQUFLLHFCQUFMLEdBRnNCOzs7QUFoeERiLGlDQXF4RFgsbURBQW9CLFdBQVc7QUFDN0IsZUFBSyxTQUFMLEdBQWlCLFNBQWpCLENBRDZCO0FBRTdCLGVBQUsscUJBQUwsR0FGNkI7OztBQXJ4RHBCLGlDQTB4RFgsK0NBQW1CO0FBQ2pCLGVBQUssV0FBTCxDQUFpQixpQkFBakIsR0FBcUMsSUFBckMsQ0FEaUI7QUFFakIsZUFBSyxxQkFBTCxHQUZpQjs7O0FBMXhEUixpQ0EreERYLCtDQUFrQixXQUFXO0FBQzNCLGVBQUssV0FBTCxDQUFpQixpQkFBakIsR0FBcUMsS0FBckMsQ0FEMkI7QUFFM0IsZUFBSyxxQkFBTCxHQUYyQjs7O2VBL3hEbEIiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
