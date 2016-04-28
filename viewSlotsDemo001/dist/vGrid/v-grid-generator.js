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
        function VGridGenerator(vGridConfig, vGridElement, vGridSortable, vGridSelection, vGridCellEdit, vGrid) {
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
          this.vGridElement = vGridElement;
          this.vGridSortable = vGridSortable;
          this.vGrid = vGrid;
          this.init(false);
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
                rowTemplate = rowTemplate + ('<v-grid-cell class="' + cellClasses + '" style="' + cellStyle + '" col-no=' + i + '></v-grid-cell>');
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

      _export('VGridGenerator', VGridGenerator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7Z0NBU0s7QUFHWCxpQkFIVyxjQUdYLENBQVksV0FBWixFQUF5QixZQUF6QixFQUF1QyxhQUF2QyxFQUFzRCxjQUF0RCxFQUFzRSxhQUF0RSxFQUFxRixLQUFyRixFQUE0RjtnQ0FIakYsZ0JBR2lGOztlQWU1Rix3QkFBd0IsR0Fmb0U7ZUFnQjVGLFlBQVksR0FoQmdGO2VBaUI1RixnQkFBZ0IsRUFqQjRFO2VBa0I1RixhQUFhLEVBbEIrRTtlQW1CNUYsWUFBWSxFQW5CZ0Y7ZUFvQjVGLG1CQUFtQixHQXBCeUU7ZUFxQjVGLG1CQUFtQixFQXJCeUU7ZUF1QjVGLFlBQVk7QUFDVixrQkFBTSxJQUFOO0FBQ0Esb0JBQVEsSUFBUjtBQUNBLHFCQUFTLElBQVQ7QUFDQSxvQkFBUSxJQUFSO0FBQ0EsdUJBQVcsRUFBWDtBQUNBLHdCQUFZLElBQVo7QUFDQSx5QkFBYSxJQUFiLEdBOUIwRjtlQWlDNUYsYUFBYTtBQUNYLDJCQUFlLENBQWY7QUFDQSxzQkFBVSxDQUFWO0FBQ0EsNEJBQWdCLENBQWhCO0FBQ0Esa0JBQU0sS0FBTjtBQUNBLG1CQUFPLElBQVA7QUFDQSw4QkFBa0IsRUFBbEI7QUFDQSxpQ0FBcUIsSUFBckI7WUF4QzBGOztBQUMxRixlQUFLLGNBQUwsR0FBc0IsY0FBdEIsQ0FEMEY7QUFFMUYsZUFBSyxXQUFMLEdBQW1CLFdBQW5CLENBRjBGO0FBRzFGLGVBQUssYUFBTCxHQUFxQixhQUFyQixDQUgwRjtBQUkxRixlQUFLLFlBQUwsR0FBb0IsWUFBcEIsQ0FKMEY7QUFLMUYsZUFBSyxhQUFMLEdBQXFCLGFBQXJCLENBTDBGO0FBTTFGLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FOMEY7QUFPMUYsZUFBSyxJQUFMLENBQVUsS0FBVixFQVAwRjtTQUE1Rjs7QUFIVyxpQ0FrRFgseUNBQWUsY0FBYztBQUMzQixlQUFLLElBQUksSUFB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ZixDQUF1QixTQUF2QixDQURNOzs7QUFqbkRKLGlDQXNuRFgsK0JBQVUsSUFBSSxPQUFPO0FBQ25CLGVBQUssZUFBTCxDQUFxQixFQUFyQixFQUF5QixLQUF6QixFQURtQjs7O0FBdG5EVixpQ0EwbkRYLHlEQUF3QjtBQUN0QixlQUFLLFNBQUwsR0FBaUIsRUFBakIsQ0FEc0I7QUFFdEIsZUFBSyxxQkFBTCxHQUZzQjs7O0FBMW5EYixpQ0ErbkRYLG1EQUFvQixXQUFXO0FBQzdCLGVBQUssU0FBTCxHQUFpQixTQUFqQixDQUQ2QjtBQUU3QixlQUFLLHFCQUFMLEdBRjZCOzs7QUEvbkRwQixpQ0Fvb0RYLCtDQUFtQjtBQUNqQixlQUFLLFdBQUwsQ0FBaUIsaUJBQWpCLEdBQXFDLElBQXJDLENBRGlCO0FBRWpCLGVBQUsscUJBQUwsR0FGaUI7OztBQXBvRFIsaUNBeW9EWCwrQ0FBa0IsV0FBVztBQUMzQixlQUFLLFdBQUwsQ0FBaUIsaUJBQWpCLEdBQXFDLEtBQXJDLENBRDJCO0FBRTNCLGVBQUsscUJBQUwsR0FGMkI7OztlQXpvRGxCIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
