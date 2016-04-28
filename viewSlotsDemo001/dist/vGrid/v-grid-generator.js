'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  var ViewSlot, VGridGenerator;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      ViewSlot = _aureliaFramework.ViewSlot;
    }],
    execute: function () {
      _export('VGridGenerator', VGridGenerator = function () {
        function VGridGenerator(vGridConfig, vGridElement, vGridSortable, vGridSelection, vGridCellHelper, vGrid) {
          _classCallCheck(this, VGridGenerator);

          this.internalDragDropCount = 10;
          this.sortOrder = [];
          this.contentHeight = 0;
          this.gridHeight = 0;
          this.gridWidth = 0;
          this.queryStringCheck = {};
          this.scrollBodyHeight = 0;
          this.scrollBottomOnNext = false;
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
          this.selection = this.vGridSelection;

          this.vGridSelection = vGridSelection;
          this.vGridConfig = vGridConfig;
          this.vGridCellHelper = vGridCellHelper;
          this.vGridElement = vGridElement;
          this.vGridSortable = vGridSortable;
          this.vGrid = vGrid;
        }

        VGridGenerator.prototype.fillDataInRows = function fillDataInRows(clearAllRows) {
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.rowHeight;
            var row = this.htmlCache.rowsArray[i];
            this.insertRowMarkup(currentRow, row, true, true);
          }
        };

        VGridGenerator.prototype.getSortIcon = function getSortIcon(attribute) {
          var _this = this;

          var result;

          var lineHeigthStyleTag;
          if (!this.vGridConfig.addFilter) {
            lineHeigthStyleTag = 'style=line-height:' + this.vGridConfig.headerHeight + 'px;"';
          } else {
            lineHeigthStyleTag = 'style=line-height:' + this.vGridConfig.headerHeight / 2 + 'px;"';
          }

          if (this.vGridConfig.sortNotOnHeader.indexOf(attribute) !== -1) {
            return "";
          }

          if (this.vGridConfig.sortOnHeaderClick) {
            var main = '<span class=""><span ' + lineHeigthStyleTag + ' class="' + this.vGridConfig.css.sortIcon + ' ' + this.vGridConfig.css.sortIconSort + '"></span></span>';
            if (this.sortOrder.length === 0) {
              result = main;
            } else {
              this.sortOrder.forEach(function (x) {
                if (x.attribute === attribute) {
                  var isAsc = '<span ' + lineHeigthStyleTag + ' class="' + _this.vGridConfig.css.sortIcon + ' ' + _this.vGridConfig.css.sortIconAsc + '"></span>';
                  var isDesc = '<span ' + lineHeigthStyleTag + ' class="' + _this.vGridConfig.css.sortIcon + ' ' + _this.vGridConfig.css.sortIconDesc + '"></span>';

                  var asc = x.asc === true ? isAsc : isDesc;
                  var main = '<span ' + lineHeigthStyleTag + ' class="' + _this.vGridConfig.css.sortIcon + ' ' + _this.vGridConfig.css.sortIconNo + x.no + '">';
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
              this.insertRowMarkup(currentRow, row, true, true);
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
          var css = dragHandle + ' ' + this.vGridConfig.css.cellContent + ' ' + this.vGridConfig.css.orderHandle;
          for (var i = 0; i < headerNamesArray.length; i++) {
            var sortIcon = this.getSortIcon(attributeNamesArray[i]);
            rowTemplate = rowTemplate + ('<div><div class="' + css + '" ' + this.vGridConfig.atts.dataAttribute + '="' + attributeNamesArray[i] + '">' + headerNamesArray[i] + sortIcon + '</div></div>');
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.getRowTemplate = function getRowTemplate() {
          var rowTemplate = "";
          if (this.htmlCache.rowTemplate !== null) {
            rowTemplate = this.htmlCache.rowTemplate;
          } else {
            if (this.vGridConfig.onRowMarkupCreate) {
              for (var i = 0; i < this.vGridConfig.attributeArray.length; i++) {
                if (this.vGridConfig.attributes.indexOf(this.vGridConfig.attributeArray[i]) === -1) {
                  this.vGridConfig.attributes.push(this.vGridConfig.attributeArray[i]);
                }
              }
              rowTemplate = this.vGridConfig.onRowMarkupCreate(this.vGridConfig.attributeArray);
            } else {
              for (var i = 0; i < this.vGridConfig.attributeArray.length; i++) {
                var cellClasses = this.vGridConfig.css.rowCell + ' ' + (this.vGridConfig.css.rowColumn + i) + ' ' + (this.vGridConfig.css.gridColumn + i);
                var cellStyle = 'width:' + this.vGridConfig.columnWidthArray[i] + 'px';
                if (this.vGridConfig.attributes.indexOf(this.vGridConfig.attributeArray[i]) === -1) {
                  this.vGridConfig.attributes.push(this.vGridConfig.attributeArray[i]);
                }
                rowTemplate = rowTemplate + ('<v-grid-cell-row class="' + cellClasses + '" style="' + cellStyle + '" col-no=' + i + '></v-grid-cell-row>');
              }
            }
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.cacheRowTemplate = function cacheRowTemplate(template) {
          this.htmlCache.rowTemplate = null;
          this.htmlCache.rowTemplate = template || this.getRowTemplate();
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
          tempColumns.innerHTML = this.getRowTemplate(attributeNames);
          return tempColumns.innerHTML;
        };

        VGridGenerator.prototype.getRowCacheLength = function getRowCacheLength() {
          return this.htmlCache.rowsArray.length;
        };

        VGridGenerator.prototype.setRowTopValue = function setRowTopValue(rowArray, elementNo, topValue) {
          rowArray[elementNo].div.style.transform = 'translate3d(0px,' + topValue + 'px, 0px)';
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
          var minimumRowsNeeded = parseInt(this.contentHeight / this.vGridConfig.rowHeight, 10);

          if (this.vGridConfig.largeBuffer) {
            minimumRowsNeeded = minimumRowsNeeded * 3;
          }

          if (minimumRowsNeeded % 2 === 1) {
            minimumRowsNeeded = minimumRowsNeeded + 7;
          } else {
            minimumRowsNeeded = minimumRowsNeeded + 6;
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

            row.innerHTML = "";

            this.htmlCache.scrollBody.appendChild(row);

            this.htmlCache.rowsArray.push({
              div: row,
              top: top
            });

            top = top + this.vGridConfig.rowHeight;
          }
        };

        VGridGenerator.prototype.insertRowMarkup = function insertRowMarkup(rowNo, row, isDownScroll, isLargeScroll) {
          var _this2 = this;

          this.vGridConfig.getDataElement(rowNo, isDownScroll, isLargeScroll, function (entity) {

            row.div.setAttribute("row", rowNo);

            if (entity === "") {
              var bindingContext = {};
              row.viewSlot.bind(bindingContext);
              row.div.classList.add(_this2.vGridConfig.css.noData);
            } else {
              if (row.div.classList.contains(_this2.vGridConfig.css.noData)) {
                row.div.classList.remove(_this2.vGridConfig.css.noData);
              }
            }

            if (entity !== "" && row.viewSlot !== null) {
              var _bindingContext = {};
              for (var k in entity) {
                if (entity.hasOwnProperty(k)) {
                  if (_bindingContext[k] !== entity[k]) {
                    _bindingContext[k] = entity[k];
                  }
                }
              }
              row.viewSlot.bind(_bindingContext);
            }

            if (rowNo % 2 === 1) {
              if (row.div.classList.contains(_this2.vGridConfig.css.rowEven)) {
                row.div.classList.remove(_this2.vGridConfig.css.rowEven);
                row.div.classList.add(_this2.vGridConfig.css.rowAlt);
              }
            } else {
              if (row.div.classList.contains(_this2.vGridConfig.css.rowAlt)) {
                row.div.classList.remove(_this2.vGridConfig.css.rowAlt);
                row.div.classList.add(_this2.vGridConfig.css.rowEven);
              }
            }

            if (_this2.vGridSelection.isSelected(rowNo)) {
              row.div.classList.add(_this2.vGridConfig.css.rowSelected);
            } else {
              row.div.classList.remove(_this2.vGridConfig.css.rowSelected);
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

            var cssLabel, cssInput;
            if (_this3.vGridConfig.filterOnAtTop) {
              cssLabel = _this3.vGridConfig.css.cellContent + ' ' + _this3.vGridConfig.css.filterLabelBottom + ' ' + dragHandle + ' ' + _this3.vGridConfig.css.orderHandle;
              cssInput = _this3.vGridConfig.css.cellContent + ' ' + _this3.vGridConfig.css.filterInputTop + ' ' + _this3.vGridConfig.css.filterHandle;
            } else {
              cssLabel = _this3.vGridConfig.css.cellContent + ' ' + _this3.vGridConfig.css.filterLabelTop + ' ' + dragHandle + ' ' + _this3.vGridConfig.css.orderHandle;
              cssInput = _this3.vGridConfig.css.cellContent + ' ' + _this3.vGridConfig.css.filterInputBottom + ' ' + _this3.vGridConfig.css.filterHandle;
            }

            var sortIcon = _this3.getSortIcon(attribute);

            var filter = _this3.vGridConfig.filterArray[_this3.vGridConfig.attributeArray.indexOf(attribute)] || "filter";
            var filterName = _this3.vGridConfig.getFilterName(filter);

            var lineHeigth = 'line-height:' + _this3.vGridConfig.headerHeight / 2 + 'px;';

            var cellLabel = '<div style="' + lineHeigth + '" class="' + cssLabel + '" ' + _this3.vGridConfig.atts.dataAttribute + '="' + attribute + '">' + labelTopCell + ' ' + sortIcon + '</div>';
            var cellInput = '<input style="' + lineHeigth + '" placeholder="' + filterName + '" class="' + cssInput + '" ' + _this3.vGridConfig.atts.dataAttribute + '="' + attribute + '" value="' + valueInput + '"/>';

            if (_this3.vGridConfig.doNotAddFilterTo.indexOf(attribute) !== -1) {
              cellInput = '<div class="' + cssLabel + '" ' + _this3.vGridConfig.atts.dataAttribute + '="' + attribute + '"></div>';
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
            _this3.htmlCache.content.scrollLeft = e.target.offsetParent.offsetParent.offsetParent.scrollLeft;
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

            if (currentRow >= this.vGridConfig.getCollectionLength() && currentRowTop - this.vGridConfig.rowHeight >= this.htmlCache.content.clientHeight) {
              var row = this.htmlCache.rowsArray[i];
              this.setRowTopValue([row], 0, -(currentRowTop + this.vGridConfig.rowHeight * 50));
            }

            currentRow++;
          }

          if (bottomHitCount) {
            var firstTop = parseInt(this.htmlCache.rowsArray[0].top, 10);
            for (i = this.getRowCacheLength() - 1; i > bottomHitCount; i--) {
              var row = this.htmlCache.rowsArray[i];
              firstTop = firstTop - this.vGridConfig.rowHeight;
              this.setRowTopValue(this.htmlCache.rowsArray, i, firstTop);
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
                this.lastScrollType = "down";

                if (rowTop < currentScrollTop - this.vGridConfig.rowHeight) {
                  update = true;
                  newTopValue = rowTop + this.vGridConfig.rowHeight * this.getRowCacheLength();
                  currentRow = (rowTop + this.vGridConfig.rowHeight * this.getRowCacheLength()) / this.vGridConfig.rowHeight;
                }
                if (rowTop > (this.vGridConfig.getCollectionLength() - 1) * this.vGridConfig.rowHeight && rowTop > parseInt(this.htmlCache.content.style.height)) {
                  this.setRowTopValue([row], 0, -(this.vGridConfig.rowHeight * i + this.vGridConfig.rowHeight * 50));
                }
              } else {
                this.lastScrollType = "up";

                if (rowTop > currentScrollTop + this.contentHeight) {
                  update = true;
                  newTopValue = rowTop - this.vGridConfig.rowHeight * this.getRowCacheLength();
                  currentRow = (rowTop - this.vGridConfig.rowHeight * this.getRowCacheLength()) / this.vGridConfig.rowHeight;
                }
              }

              if (update === true && currentRow >= 0 && currentRow <= this.vGridConfig.getCollectionLength() - 1) {
                this.setRowTopValue([row], 0, newTopValue);
                this.insertRowMarkup(currentRow, row, isDownScroll, false);
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

        VGridGenerator.prototype.onScrollClickCancel = function onScrollClickCancel() {};

        VGridGenerator.prototype.onScroll = function onScroll() {
          var _this6 = this;

          var doScroll = function doScroll() {
            var currentScrollTop = _this6.htmlCache.content.scrollTop;
            var currentScrollLeft = _this6.htmlCache.content.scrollLeft;

            if (currentScrollTop !== _this6.scrollVars.lastScrollTop) {
              if (currentScrollLeft !== 0) {
                _this6.htmlCache.content.scrollLeft = _this6.scrollVars.lastScrollLeft;
                _this6.htmlCache.header.scrollLeft = _this6.scrollVars.lastScrollLeft;
              }

              var isDownScroll = true;
              if (currentScrollTop < _this6.scrollVars.lastScrollTop) {
                isDownScroll = false;
              }

              var isLargeScroll;
              switch (true) {
                case currentScrollTop > _this6.scrollVars.lastScrollTop + _this6.vGridConfig.largeScrollLimit:
                case currentScrollTop < _this6.scrollVars.lastScrollTop - _this6.vGridConfig.largeScrollLimit:
                  isLargeScroll = true;
                  break;
                default:
                  isLargeScroll = false;
              }

              _this6.scrollVars.lastScrollTop = currentScrollTop;

              if (isLargeScroll) {
                if (_this6.vGridConfig.renderOnScrollbarScroll) {
                  _this6.onNormalScrollingLarge(isDownScroll, currentScrollTop);
                } else {
                  _this6.onScrollbarScrolling();
                }
              } else {
                _this6.onNormalScrolling(isDownScroll, currentScrollTop);
              }
            } else {

              if (_this6.htmlCache.content.style.overflowX === "hidden") {
                _this6.htmlCache.content.scrollLeft = 0;
                _this6.scrollVars.lastScrollLeft = 0;
                _this6.htmlCache.header.scrollLeft = 0;
              } else {
                if (_this6.scrollVars.lastScrollLeft !== currentScrollLeft) {
                  currentScrollLeft = _this6.htmlCache.content.scrollLeft;
                  _this6.scrollVars.lastScrollLeft = currentScrollLeft;
                  _this6.htmlCache.header.scrollLeft = currentScrollLeft;
                }
              }

              if (_this6.vGridConfig.lockedColumns > 0) {
                currentScrollLeft = _this6.htmlCache.content.scrollLeft;
                for (var lockedColNo = _this6.vGridConfig.lockedColumns; lockedColNo--;) {

                  var fixHeader = _this6.vGridElement.querySelectorAll("." + _this6.vGridConfig.css.rowHeaderColumn + lockedColNo);
                  var fixRow = _this6.vGridElement.querySelectorAll("." + _this6.vGridConfig.css.rowColumn + lockedColNo);

                  for (var i = fixHeader.length; i--;) {
                    fixHeader[i].style.left = currentScrollLeft + "px";
                    fixHeader[i].style.zIndex = _this6.internalDragDropCount;
                    fixHeader[i].style.position = "relative";
                  }
                  for (var i = fixRow.length; i--;) {
                    fixRow[i].style.left = currentScrollLeft + "px";
                    fixRow[i].style.zIndex = _this6.internalDragDropCount;
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
          var _this7 = this;

          var resizable = false;
          var screenX;
          var xElement;
          var sortable = false;

          if (this.vGridConfig.sortOnHeaderClick) {
            var orderByClick = function orderByClick(event) {
              if (!sortable && !resizable) {
                _this7.vGridConfig.onOrderBy(event, function (sortorder) {
                  _this7.sortOrder = sortorder;
                  _this7.rebuildGridHeaderHtml();
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

                if (_this7.vGridConfig.isSortableHeader) {
                  _this7.sortableCtx.option("disabled", resizable);
                }
                screenX = e.screenX;
                xElement = e.target;
                var originalWidth = xElement.offsetParent.style.width;
                var originalWidthx = xElement.offsetParent.style.width;
                var index = xElement.offsetParent.getAttribute("column-no");


                _this7.htmlCache.header.onmousemove = function (e) {
                  _this7.htmlCache.header.onmouseup = function () {
                    setTimeout(function () {
                      resizable = false;
                      if (_this7.vGridConfig.isSortableHeader) {
                        _this7.sortableCtx.option("disabled", resizable);
                      }
                    }, 30);

                    _this7.htmlCache.header.onmouseleave = "";
                    _this7.htmlCache.header.onmousemove = "";
                    _this7.htmlCache.header.onmouseup = "";


                    _this7.vGridConfig.columnWidthArray[index] = parseInt(xElement.offsetParent.style.width);

                    _this7.htmlCache.rowTemplate = null;
                    _this7.correctRowAndScrollbodyWidth();

                    _this7.recreateViewSlots();
                    _this7.updateGridScrollbars();
                    _this7.fillDataInRows(true);
                  };

                  _this7.htmlCache.header.onmouseleave = function (e) {
                    _this7.htmlCache.header.onmouseup(e);
                  };

                  if (resizable) {
                    var newWidth = parseInt(originalWidth) - (screenX - e.screenX) + "px";
                    _this7.vGridConfig.columnWidthArray[index] = parseInt(newWidth);
                    xElement.offsetParent.style.width = parseInt(originalWidth) - (screenX - e.screenX) + "px";
                    xElement.offsetParent.style.width = parseInt(originalWidthx) - (screenX - e.screenX) + "px";
                    if (_this7.vGridConfig.resizableHeadersAndRows) {
                      var columnsToFix = _this7.htmlCache.content.firstChild.querySelectorAll("." + _this7.vGridConfig.css.rowColumn + index);

                      for (var col = 0; col < columnsToFix.length; col++) {
                        columnsToFix[col].style.width = newWidth;
                      }

                      _this7.correctRowAndScrollbodyWidth();
                      _this7.updateGridScrollbars();
                    }
                  } else {
                    _this7.correctHeaderAndScrollbodyWidth();
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
              var children = _this7.htmlCache.header.firstChild.firstChild.children;

              var x;
              x = _this7.vGridConfig.attributeArray[oldIndex];
              _this7.vGridConfig.attributeArray.splice(oldIndex, 1);
              _this7.vGridConfig.attributeArray.splice(newIndex, 0, x);

              x = _this7.vGridConfig.filterArray[oldIndex];
              _this7.vGridConfig.filterArray.splice(oldIndex, 1);
              _this7.vGridConfig.filterArray.splice(newIndex, 0, x);

              x = _this7.vGridConfig.headerArray[oldIndex];
              _this7.vGridConfig.headerArray.splice(oldIndex, 1);
              _this7.vGridConfig.headerArray.splice(newIndex, 0, x);

              x = _this7.vGridConfig.columnWidthArray[oldIndex];
              _this7.vGridConfig.columnWidthArray.splice(oldIndex, 1);
              _this7.vGridConfig.columnWidthArray.splice(newIndex, 0, x);

              x = _this7.vGridConfig.colStyleArray[oldIndex];
              _this7.vGridConfig.colStyleArray.splice(oldIndex, 1);
              _this7.vGridConfig.colStyleArray.splice(newIndex, 0, x);

              x = _this7.vGridConfig.colTypeArray[oldIndex];
              _this7.vGridConfig.colTypeArray.splice(oldIndex, 1);
              _this7.vGridConfig.colTypeArray.splice(newIndex, 0, x);

              _this7.htmlCache.rowTemplate = null;
              _this7.cacheRowTemplate(null);
              _this7.rebuildColumns();
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
          var _this8 = this;

          var handleClick = function handleClick(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this8.vGridConfig.clickHandler(e, currentRow);
            if (_this8.vGridConfig.isMultiSelect !== undefined) {
              _this8.vGridSelection.setHightlight(e, currentRow, _this8);
            }
          };

          var handleTabbing = function handleTabbing(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this8.vGridConfig.clickHandler(e, currentRow);
            if (_this8.vGridConfig.isMultiSelect !== undefined) {
              _this8.vGridSelection.setHightlight(e, currentRow, _this8);
            }
          };

          var handleDblClick = function handleDblClick(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this8.vGridConfig.clickHandler(e, currentRow);
          };

          var onMouseDownRow = function onMouseDownRow(e) {
            if (e.button === 2) {}
          };

          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var div = this.htmlCache.rowsArray[i].div;

            div.addEventListener("dblclick", handleDblClick.bind(this), false);
            div.addEventListener("click", handleClick.bind(this), false);
            div.addEventListener("tabbing", handleTabbing.bind(this), false);
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
            this.vGridConfig.largeScrollLimit = this.contentHeight * 1.5;
            ;
          }
        };

        VGridGenerator.prototype.addHtml = function addHtml() {
          this.createGridHtmlWrapper();
          this.createGridHtmlHeaderWrapper();
          this.createGridHtmlContentWrapper();
          this.createGridHtmlFooterWrapper();
          this.createGridHtmlScrollBodyWrapper();
          this.createGridHtmlRowWrapper();
          this.updateGridScrollbars();
        };

        VGridGenerator.prototype.createViewSlots = function createViewSlots() {

          var rows = this.htmlCache.rowsArray;
          for (var i = 0; i < rows.length; i++) {
            var viewFactory = this.vGrid.viewCompiler.compile('<template>' + this.getRowTemplate(this.vGridConfig.attributeArray) + '</template>', this.vGrid.resources);
            var view = viewFactory.create(this.vGrid.container);
            rows[i].viewSlot = new ViewSlot(rows[i].div, true);
            rows[i].viewSlot.add(view);
            var bindingContext = {};
            rows[i].viewSlot.bind(bindingContext);
            rows[i].viewSlot.attached();
          }
        };

        VGridGenerator.prototype.recreateViewSlots = function recreateViewSlots() {
          var rows = this.htmlCache.rowsArray;
          for (var i = 0; i < rows.length; i++) {
            rows[i].viewSlot.unbind();
            rows[i].viewSlot.detached();
            rows[i].viewSlot.removeAll();
            rows[i].viewSlot = null;
            rows[i].div.innerHTML = "";
            this.htmlCache.rowTemplate = null;
            var viewFactory = this.vGrid.viewCompiler.compile('<template>' + this.getRowTemplate(this.vGridConfig.attributeArray) + '</template>', this.vGrid.resources);
            var view = viewFactory.create(this.vGrid.container);
            rows[i].viewSlot = new ViewSlot(rows[i].div, true);
            rows[i].viewSlot.add(view);
            var bindingContext = {};
            rows[i].viewSlot.bind(bindingContext);
            rows[i].viewSlot.attached();
          }
        };

        VGridGenerator.prototype.init = function init(isRebuild) {
          this.correctColumnsWidthArray();
          this.addHtml();
          this.addEvents();
          if (!isRebuild) {
            this.vGridSelection.setMode(this.vGridConfig.isMultiSelect);
          }
          this.createViewSlots();
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

          this.rebuildGridHeaderHtml();
          this.recreateViewSlots();
          this.fillDataInRows(true);
          this.correctRowAndScrollbodyWidth();
          this.updateSelectionOnAllRows();
          this.updateGridScrollbars();
          this.fixHeaderWithBody();
        };

        VGridGenerator.prototype.columnChangeAndCollection = function columnChangeAndCollection(resetScrollToTop) {
          this.correctColumnsWidthArray();

          this.rebuildGridHeaderHtml();
          this.recreateViewSlots();
          this.fillDataInRows(true);
          this.updateSelectionOnAllRows();
          this.collectionChange(resetScrollToTop);
        };

        VGridGenerator.prototype.collectionChange = function collectionChange(resetScrollToTop, scrollBottom) {

          if (this.scrollBottomOnNext) {
            scrollBottom = true;
            this.scrollBottomOnNext = false;
          }

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

          this.htmlCache.scrollBody.style.height = this.scrollBodyHeight - 1 + "px";
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
          this.vGridConfig.filterArray = paramObj.filterArray;
          this.vGridConfig.readOnlyArray = paramObj.readOnlyArray;
          this.vGridConfig.colStyleArray = paramObj.colStyleArray;
          this.vGridConfig.colTypeArray = paramObj.colTypeArray;
        };

        VGridGenerator.prototype.getColumns = function getColumns() {
          return {
            "headerArray": this.vGridConfig.headerArray,
            "attributeArray": this.vGridConfig.attributeArray,
            "columnWidthArray": this.vGridConfig.columnWidthArray,
            "filterArray": this.vGridConfig.filterArray,
            "readOnlyArray": this.vGridConfig.readOnlyArray,
            "colStyleArray": this.vGridConfig.colStyleArray,
            "colTypeArray": this.vGridConfig.colTypeArray
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

        VGridGenerator.prototype.scrollBottomNext = function scrollBottomNext() {
          this.scrollBottomOnNext = true;
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

        VGridGenerator.prototype.getGridRows = function getGridRows() {
          var _this9 = this;

          var array = [];
          this.vGrid.collectionFiltered.forEach(function (x) {
            array.push(x[_this9.vGrid.sgkey]);
          });
          return array;
        };

        VGridGenerator.prototype.createReport = function createReport(skipArray) {
          var _this10 = this;

          if (skipArray === undefined) {
            skipArray = [];
          }
          var content = '';
          var rows = this.getGridRows();
          var attributes = this.vGridConfig.attributeArray;

          var setData = function setData(arr) {
            content = content + arr.join(';') + '\n';
          };

          setData(attributes);

          rows.forEach(function (row) {
            var tempArr = [];
            attributes.forEach(function (att) {
              if (skipArray.indexOf(att) === -1) {
                tempArr.push(_this10.vGrid.collection[row][att]);
              }
            });
            setData(tempArr);
          });

          var dummyElement = document.createElement('a');
          dummyElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
          dummyElement.setAttribute('download', 'contacts.csv');
          dummyElement.style.display = 'none';
          document.body.appendChild(dummyElement);
          dummyElement.click();
          document.body.removeChild(dummyElement);
        };

        return VGridGenerator;
      }());

      _export('VGridGenerator', VGridGenerator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
