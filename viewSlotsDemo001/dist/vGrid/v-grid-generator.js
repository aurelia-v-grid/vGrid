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
        function VGridGenerator(vGridConfig, vGridInterpolate, vGridElement, vGridSortable, vGridSelection, vGridCellEdit, vGrid) {
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
          this.vGrid = vGrid;
          this.init(false);
        }

        VGridGenerator.prototype.fillDataInRows = function fillDataInRows(clearAllRows) {
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.rowHeight;
            var row = this.htmlCache.rowsArray[i];
            if (clearAllRows) {
              if (row.viewSlot) {
                row.viewSlot.bind({ ctx: this });
              }
            }
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
              if (clearRow) {
                if (row.viewSlot) {
                  row.viewSlot.bind({ ctx: this });
                }
              }
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
                if (this.vGridInterpolate.attributes.indexOf(this.vGridConfig.attributeArray[i]) === -1) {
                  this.vGridInterpolate.attributes.push(this.vGridConfig.attributeArray[i]);
                }
              }
              rowTemplate = this.vGridConfig.onRowMarkupCreate(this.vGridConfig.attributeArray);
            } else {
              for (var i = 0; i < this.vGridConfig.attributeArray.length; i++) {
                var cellClasses = this.vGridConfig.css.rowCell + ' ' + (this.vGridConfig.css.rowColumn + i) + ' ' + (this.vGridConfig.css.gridColumn + i);
                var cellStyle = 'width:' + this.vGridConfig.columnWidthArray[i] + 'px';
                if (this.vGridInterpolate.attributes.indexOf(this.vGridConfig.attributeArray[i]) === -1) {
                  this.vGridInterpolate.attributes.push(this.vGridConfig.attributeArray[i]);
                }
                rowTemplate = rowTemplate + ('<v-grid-cell class="' + cellClasses + '" style="' + cellStyle + '" col-no=' + i + '></v-grid-cell>');
              }
            }
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.cacheRowTemplate = function cacheRowTemplate(template) {
          this.htmlCache.rowTemplate = null;
          var stringTemplate = template || this.getRowTemplate();
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
            this.vGridConfig.largeScrollLimit = this.contentHeight * 1, 5;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7Z0NBU0s7QUFHWCxpQkFIVyxjQUdYLENBQVksV0FBWixFQUF5QixnQkFBekIsRUFBMkMsWUFBM0MsRUFBeUQsYUFBekQsRUFBd0UsY0FBeEUsRUFBd0YsYUFBeEYsRUFBdUcsS0FBdkcsRUFBOEc7Z0NBSG5HLGdCQUdtRzs7ZUFtQjlHLHdCQUF3QixHQW5Cc0Y7ZUFvQjlHLFlBQVksR0FwQmtHO2VBcUI5RyxnQkFBZ0IsRUFyQjhGO2VBc0I5RyxhQUFhLEVBdEJpRztlQXVCOUcsWUFBWSxFQXZCa0c7ZUF3QjlHLG1CQUFtQixHQXhCMkY7ZUF5QjlHLG1CQUFtQixFQXpCMkY7ZUEyQjlHLFlBQVk7QUFDVixrQkFBTSxJQUFOO0FBQ0Esb0JBQVEsSUFBUjtBQUNBLHFCQUFTLElBQVQ7QUFDQSxvQkFBUSxJQUFSO0FBQ0EsdUJBQVcsRUFBWDtBQUNBLHdCQUFZLElBQVo7QUFDQSx5QkFBYSxJQUFiLEdBbEM0RztlQXFDOUcsYUFBYTtBQUNYLDJCQUFlLENBQWY7QUFDQSxzQkFBVSxDQUFWO0FBQ0EsNEJBQWdCLENBQWhCO0FBQ0Esa0JBQU0sS0FBTjtBQUNBLG1CQUFPLElBQVA7QUFDQSw4QkFBa0IsRUFBbEI7QUFDQSxpQ0FBcUIsSUFBckI7WUE1QzRHOztBQUM1RyxlQUFLLGNBQUwsR0FBc0IsY0FBdEIsQ0FENEc7QUFFNUcsZUFBSyxXQUFMLEdBQW1CLFdBQW5CLENBRjRHO0FBRzVHLGVBQUssYUFBTCxHQUFxQixhQUFyQixDQUg0RztBQUk1RyxlQUFLLGdCQUFMLEdBQXdCLGdCQUF4QixDQUo0RztBQUs1RyxlQUFLLFlBQUwsR0FBb0IsWUFBcEIsQ0FMNEc7QUFNNUcsZUFBSyxhQUFMLEdBQXFCLGFBQXJCLENBTjRHO0FBTzVHLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FQNEc7QUFRNUcsZUFBSyxJQUFMLENBQVUsS0FBVixFQVI0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
