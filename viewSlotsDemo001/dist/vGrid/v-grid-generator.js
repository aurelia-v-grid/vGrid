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
            minimumRowsNeeded = minimumRowsNeeded * 5;
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
            if (entity === "" && row.viewSlot !== null) {
              row.viewSlot.unbind();
              row.viewSlot.detached();
              row.viewSlot = null;
              row.div.innerHTML = "";
            }
            if (entity !== "" && row.viewSlot === null) {
              entity.ctx = _this2;
              var viewFactory = _this2.vGrid.viewCompiler.compile('<template>' + _this2.getRowTemplate(_this2.vGridConfig.attributeArray) + '</template>', _this2.vGrid.resources);
              var view = viewFactory.create(_this2.vGrid.container);
              row.viewSlot = new ViewSlot(row.div, true);
              row.viewSlot.add(view);
              row.viewSlot.bind(entity);
              row.viewSlot.attached();
            }
            if (entity !== "" && row.viewSlot !== null) {
              entity.ctx = _this2;
              row.viewSlot.bind(entity);
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

            var cssLabel = _this3.vGridConfig.css.cellContent + ' ' + _this3.vGridConfig.css.filterLabelTop + ' ' + dragHandle + ' ' + _this3.vGridConfig.css.orderHandle;
            var cssInput = _this3.vGridConfig.css.cellContent + ' ' + _this3.vGridConfig.css.filterInputBottom + ' ' + _this3.vGridConfig.css.filterHandle;

            if (_this3.vGridConfig.filterOnAtTop) {
              cssLabel = _this3.vGridConfig.css.cellContent + ' ' + _this3.vGridConfig.css.filterLabelBottom + ' ' + dragHandle + ' ' + _this3.vGridConfig.css.orderHandle;
              cssInput = _this3.vGridConfig.css.cellContent + ' ' + _this3.vGridConfig.css.filterInputTop + ' ' + _this3.vGridConfig.css.filterHandle;
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
              cellInputElement[i].onclick = this.vGridConfig.filterCellClick.bind(this.vGridConfig);
            }
          } else {
            for (var i = 0; i < cellInputElement.length; i++) {
              cellInputElement[i].onkeyup = onChangeEventOnFilter;
              cellInputElement[i].onfocus = onFocus;
              cellInputElement[i].onclick = this.vGridConfig.filterCellClick.bind(this.vGridConfig);
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
                if (rowTop < currentScrollTop - this.vGridConfig.rowHeight) {
                  update = true;
                  newTopValue = rowTop + this.vGridConfig.rowHeight * this.getRowCacheLength();
                  currentRow = (rowTop + this.vGridConfig.rowHeight * this.getRowCacheLength()) / this.vGridConfig.rowHeight;
                }
                if (rowTop > (this.vGridConfig.getCollectionLength() - 1) * this.vGridConfig.rowHeight && rowTop > parseInt(this.htmlCache.content.style.height)) {
                  this.setRowTopValue([row], 0, -(this.vGridConfig.rowHeight * i + this.vGridConfig.rowHeight * 50));
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
                    _this8.recreateViewSlots();
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

          var handleTabbing = function handleTabbing(e) {
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
          this.cacheRowTemplate(null);

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
            var bindingContext = { ctx: this };
            rows[i].viewSlot = new ViewSlot(rows[i].div, true);
            rows[i].viewSlot.add(view);
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
            var viewFactory = this.vGrid.viewCompiler.compile('<template>' + this.getRowTemplate(this.vGridConfig.attributeArray) + '</template>', this.vGrid.resources);
            var view = viewFactory.create(this.vGrid.container);
            var bindingContext = { ctx: this };
            rows[i].viewSlot = new ViewSlot(rows[i].div, true);
            rows[i].viewSlot.add(view);
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

          if (this.vGridConfig.predefinedScrolltop) {
            this.setScrollTop(this.vGridConfig.predefinedScrolltop);
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
          this.htmlCache.rowTemplate = null;
          this.cacheRowTemplate(null);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7Z0NBU0s7QUFHWCxpQkFIVyxjQUdYLENBQVksV0FBWixFQUF5QixZQUF6QixFQUF1QyxhQUF2QyxFQUFzRCxjQUF0RCxFQUFzRSxhQUF0RSxFQUFxRixLQUFyRixFQUE0RjtnQ0FIakYsZ0JBR2lGOztlQWU1Rix3QkFBd0IsR0Fmb0U7ZUFnQjVGLFlBQVksR0FoQmdGO2VBaUI1RixnQkFBZ0IsRUFqQjRFO2VBa0I1RixhQUFhLEVBbEIrRTtlQW1CNUYsWUFBWSxFQW5CZ0Y7ZUFvQjVGLG1CQUFtQixHQXBCeUU7ZUFxQjVGLG1CQUFtQixFQXJCeUU7ZUF1QjVGLFlBQVk7QUFDVixrQkFBTSxJQUFOO0FBQ0Esb0JBQVEsSUFBUjtBQUNBLHFCQUFTLElBQVQ7QUFDQSxvQkFBUSxJQUFSO0FBQ0EsdUJBQVcsRUFBWDtBQUNBLHdCQUFZLElBQVo7QUFDQSx5QkFBYSxJQUFiLEdBOUIwRjtlQWlDNUYsYUFBYTtBQUNYLDJCQUFlLENBQWY7QUFDQSxzQkFBVSxDQUFWO0FBQ0EsNEJBQWdCLENBQWhCO0FBQ0Esa0JBQU0sS0FBTjtBQUNBLG1CQUFPLElBQVA7QUFDQSw4QkFBa0IsRUFBbEI7QUFDQSxpQ0FBcUIsSUFBckI7WUF4QzBGOztBQUMxRixlQUFLLGNBQUwsR0FBc0IsY0FBdEIsQ0FEMEY7QUFFMUYsZUFBSyxXQUFMLEdBQW1CLFdBQW5CLENBRjBGO0FBRzFGLGVBQUssYUFBTCxHQUFxQixhQUFyQixDQUgwRjtBQUkxRixlQUFLLFlBQUwsR0FBb0IsWUFBcEIsQ0FKMEY7QUFLMUYsZUFBSyxhQUFMLEdBQXFCLGFBQXJCLENBTDBGO0FBTTFGLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FOMEY7QUFPMUYsZUFBSyxJQUFMLENBQVUsS0FBVixFQVAwRjtTQUE1Rjs7QUFIVyxpQ0FrRFgseUNBQWUsY0FBYztBQUMzQixlQUFLLElBQUksSUFB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LFNBQXZCLEdBQW1DLE1BQW5DLENBRG1COzs7QUF2ckRWLGlDQTRyRFgsdUNBQWU7QUFDYixpQkFBTyxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLFNBQXZCLENBRE07OztBQTVyREosaUNBaXNEWCwrQkFBVSxJQUFJLE9BQU87QUFDbkIsZUFBSyxlQUFMLENBQXFCLEVBQXJCLEVBQXlCLEtBQXpCLEVBRG1COzs7QUFqc0RWLGlDQXFzRFgseURBQXdCO0FBQ3RCLGVBQUssU0FBTCxHQUFpQixFQUFqQixDQURzQjtBQUV0QixlQUFLLHFCQUFMLEdBRnNCOzs7QUFyc0RiLGlDQTBzRFgsbURBQW9CLFdBQVc7QUFDN0IsZUFBSyxTQUFMLEdBQWlCLFNBQWpCLENBRDZCO0FBRTdCLGVBQUsscUJBQUwsR0FGNkI7OztBQTFzRHBCLGlDQStzRFgsK0NBQW1CO0FBQ2pCLGVBQUssV0FBTCxDQUFpQixpQkFBakIsR0FBcUMsSUFBckMsQ0FEaUI7QUFFakIsZUFBSyxxQkFBTCxHQUZpQjs7O0FBL3NEUixpQ0FvdERYLCtDQUFrQixXQUFXO0FBQzNCLGVBQUssV0FBTCxDQUFpQixpQkFBakIsR0FBcUMsS0FBckMsQ0FEMkI7QUFFM0IsZUFBSyxxQkFBTCxHQUYyQjs7O2VBcHREbEIiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
