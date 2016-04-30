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
        function VGridGenerator(vGrid) {
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

          this.vGrid = vGrid;
          this.vGridSelection = vGrid.vGridSelection;
          this.vGridConfig = vGrid.vGridConfig;
          this.vGridCellHelper = vGrid.vGridCellHelper;
          this.vGridElement = vGrid.element;
          this.vGridSortable = vGrid.vGridSortable;
          this.vGridResizable = vGrid.vGridResizable;
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

        VGridGenerator.prototype.getHeaderTemplate = function getHeaderTemplate() {
          var rowTemplate = "";
          for (var i = 0; i < this.vGridConfig.columns.length; i++) {
            rowTemplate = rowTemplate + ('<v-grid-cell-header column-no=' + i + '></v-grid-cell-header>');
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.getRowTemplate = function getRowTemplate() {
          var rowTemplate = "";
          if (this.htmlCache.rowTemplate !== null) {
            rowTemplate = this.htmlCache.rowTemplate;
          } else {
            if (this.vGridConfig.onRowMarkupCreate) {
              rowTemplate = this.vGridConfig.onRowMarkupCreate(this.vGridConfig.attributeArray);
            } else {
              for (var i = 0; i < this.vGridConfig.columns.length; i++) {
                rowTemplate = rowTemplate + ('<v-grid-cell-row col-no=' + i + '></v-grid-cell-row>');
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
          for (var i = 0; i < this.vGridConfig.columns.length; i++) {
            total = total + parseInt(this.vGridConfig.columnWidthArray[i], 10);
          }
          return total;
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

          var row = document.createElement("DIV");
          row.className = this.vGridConfig.css.row + " " + this.vGridConfig.css.rowHeader;

          row.style.height = this.vGridConfig.headerHeight + "px";
          row.style.width = this.getTotalColumnWidth() + "px";
          this.htmlCache.header.appendChild(row);

          var viewFactory = this.vGrid.viewCompiler.compile('<template>' + this.getHeaderTemplate() + '</template>', this.vGrid.resources);
          var view = viewFactory.create(this.vGrid.container);
          this.headerViewSlot = new ViewSlot(this.htmlCache.header.firstChild, true);
          this.headerViewSlot.add(view);
          var bindingContext = {};
          this.headerViewSlot.bind(bindingContext);
          this.headerViewSlot.attached();
        };

        VGridGenerator.prototype.rebuildGridHeaderHtml = function rebuildGridHeaderHtml() {
          var getScrollLeft = this.htmlCache.header.firstChild.style.left;
          this.htmlCache.header.removeChild(this.htmlCache.header.firstChild);

          var row = document.createElement("DIV");
          row.className = this.vGridConfig.css.row + " " + this.vGridConfig.css.rowHeader;
          row.style.height = this.vGridConfig.headerHeight + "px";
          row.style.width = this.getTotalColumnWidth() + "px";
          this.htmlCache.header.appendChild(row);

          var viewFactory = this.vGrid.viewCompiler.compile('<template>' + this.getHeaderTemplate() + '</template>', this.vGrid.resources);
          var view = viewFactory.create(this.vGrid.container);
          this.headerViewSlot.unbind();
          this.headerViewSlot.detached();
          this.headerViewSlot.removeAll();
          this.headerViewSlot = null;
          this.headerViewSlot = new ViewSlot(this.htmlCache.header.firstChild, true);
          this.headerViewSlot.add(view);
          var bindingContext = {};
          this.headerViewSlot.bind(bindingContext);
          this.headerViewSlot.attached();

          this.addResizableAndSortableEvent();

          this.htmlCache.header.firstChild.style.left = getScrollLeft;
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
          this.htmlCache.header.firstChild.style.width = this.getTotalColumnWidth() + "px";
        };

        VGridGenerator.prototype.correctHeaderAndScrollbodyWidth = function correctHeaderAndScrollbodyWidth() {
          this.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
          this.htmlCache.header.firstChild.style.width = this.getTotalColumnWidth() + "px";
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

        VGridGenerator.prototype.onNormalScrollingLarge = function onNormalScrollingLarge() {
          var _this3 = this;

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
              var row = _this3.htmlCache.rowsArray[cacheRowNumber];
              _this3.setRowTopValue([row], 0, currentRowTop);
              currentRowTop = currentRowTop + _this3.vGridConfig.rowHeight;
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
          var _this4 = this;

          this.scrollVars.halt = true;

          var timeout = this.vGridConfig.dataScrollDelay;

          clearTimeout(this.scrollVars.timer);

          this.scrollVars.timer = setTimeout(function () {
            _this4.onNormalScrollingLarge();
            _this4.scrollVars.halt = false;
          }, timeout);
        };

        VGridGenerator.prototype.onScroll = function onScroll() {
          var _this5 = this;

          var doScroll = function doScroll() {
            var currentScrollTop = _this5.htmlCache.content.scrollTop;
            var currentScrollLeft = _this5.htmlCache.content.scrollLeft;

            if (currentScrollTop !== _this5.scrollVars.lastScrollTop) {
              if (currentScrollLeft !== 0) {
                _this5.htmlCache.content.scrollLeft = _this5.scrollVars.lastScrollLeft;
                _this5.htmlCache.header.scrollLeft = _this5.scrollVars.lastScrollLeft;
              }

              var isDownScroll = true;
              if (currentScrollTop < _this5.scrollVars.lastScrollTop) {
                isDownScroll = false;
              }

              var isLargeScroll;
              switch (true) {
                case currentScrollTop > _this5.scrollVars.lastScrollTop + _this5.vGridConfig.largeScrollLimit:
                case currentScrollTop < _this5.scrollVars.lastScrollTop - _this5.vGridConfig.largeScrollLimit:
                  isLargeScroll = true;
                  break;
                default:
                  isLargeScroll = false;
              }

              _this5.scrollVars.lastScrollTop = currentScrollTop;

              if (isLargeScroll) {
                if (_this5.vGridConfig.renderOnScrollbarScroll) {
                  _this5.onNormalScrollingLarge(isDownScroll, currentScrollTop);
                } else {
                  _this5.onScrollbarScrolling();
                }
              } else {
                _this5.onNormalScrolling(isDownScroll, currentScrollTop);
              }
            } else {

              if (_this5.htmlCache.content.style.overflowX === "hidden") {
                _this5.htmlCache.content.scrollLeft = 0;
                _this5.scrollVars.lastScrollLeft = 0;
                _this5.htmlCache.header.scrollLeft = 0;
              } else {
                if (_this5.scrollVars.lastScrollLeft !== currentScrollLeft) {
                  currentScrollLeft = _this5.htmlCache.content.scrollLeft;
                  _this5.scrollVars.lastScrollLeft = currentScrollLeft;
                  _this5.htmlCache.header.scrollLeft = currentScrollLeft;
                }
              }

              if (_this5.vGridConfig.lockedColumns > 0) {
                currentScrollLeft = _this5.htmlCache.content.scrollLeft;
                for (var lockedColNo = _this5.vGridConfig.lockedColumns; lockedColNo--;) {

                  var fixHeader = _this5.vGridElement.querySelectorAll("." + _this5.vGridConfig.css.rowHeaderColumn + lockedColNo);
                  var fixRow = _this5.vGridElement.querySelectorAll("." + _this5.vGridConfig.css.rowColumn + lockedColNo);

                  for (var i = fixHeader.length; i--;) {
                    fixHeader[i].style.left = currentScrollLeft + "px";
                    fixHeader[i].style.zIndex = _this5.internalDragDropCount;
                    fixHeader[i].style.position = "relative";
                  }
                  for (var i = fixRow.length; i--;) {
                    fixRow[i].style.left = currentScrollLeft + "px";
                    fixRow[i].style.zIndex = _this5.internalDragDropCount;
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
          var _this6 = this;

          if (this.vGridConfig.sortOnHeaderClick) {
            var orderByClick = function orderByClick(event) {
              _this6.vGridConfig.onOrderBy(event, function (sortorder) {
                _this6.sortOrder = sortorder;
                _this6.rebuildGridHeaderHtml();
              });
            };

            var orderBy = this.vGridElement.querySelectorAll("." + this.vGridConfig.css.orderHandle);
            for (var i = 0; i < orderBy.length; i++) {
              orderBy[i].addEventListener("click", orderByClick.bind(this), false);
            }
          }

          if (this.vGridConfig.isResizableHeaders) {
            this.vGridResizable.init();
          }

          if (this.vGridConfig.isSortableHeader) {
            this.vGridSortable.init();
          }
        };

        VGridGenerator.prototype.addEvents = function addEvents() {
          var _this7 = this;

          var handleClick = function handleClick(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this7.vGridConfig.clickHandler(e, currentRow);
            if (_this7.vGridConfig.isMultiSelect !== undefined) {
              _this7.vGridSelection.setHightlight(e, currentRow, _this7);
            }
          };

          var handleTabbing = function handleTabbing(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this7.vGridConfig.clickHandler(e, currentRow);
            if (_this7.vGridConfig.isMultiSelect !== undefined) {
              _this7.vGridSelection.setHightlight(e, currentRow, _this7);
            }
          };

          var handleDblClick = function handleDblClick(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this7.vGridConfig.clickHandler(e, currentRow);
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

        VGridGenerator.prototype.rebuildColumnsRows = function rebuildColumnsRows() {
          this.recreateViewSlots();
          this.fillDataInRows(true);
          this.updateSelectionOnAllRows();
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
          var _this8 = this;

          var array = [];
          this.vGrid.collectionFiltered.forEach(function (x) {
            array.push(x[_this8.vGrid.sgkey]);
          });
          return array;
        };

        VGridGenerator.prototype.createReport = function createReport(skipArray) {
          var _this9 = this;

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
                tempArr.push(_this9.vGrid.collection[row][att]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7Z0NBU0s7QUFHWCxpQkFIVyxjQUdYLENBQVksS0FBWixFQUFtQjtnQ0FIUixnQkFHUTs7ZUFlbkIsd0JBQXdCLEdBZkw7ZUFnQm5CLFlBQVksR0FoQk87ZUFpQm5CLGdCQUFnQixFQWpCRztlQWtCbkIsYUFBYSxFQWxCTTtlQW1CbkIsWUFBWSxFQW5CTztlQW9CbkIsbUJBQW1CLEdBcEJBO2VBcUJuQixtQkFBbUIsRUFyQkE7ZUF3Qm5CLHFCQUFxQixNQXhCRjtlQTBCbkIsWUFBWTtBQUNWLGtCQUFNLElBQU47QUFDQSxvQkFBUSxJQUFSO0FBQ0EscUJBQVMsSUFBVDtBQUNBLG9CQUFRLElBQVI7QUFDQSx1QkFBVyxFQUFYO0FBQ0Esd0JBQVksSUFBWjtBQUNBLHlCQUFhLElBQWIsR0FqQ2lCO2VBb0NuQixhQUFhO0FBQ1gsMkJBQWUsQ0FBZjtBQUNBLHNCQUFVLENBQVY7QUFDQSw0QkFBZ0IsQ0FBaEI7QUFDQSxrQkFBTSxLQUFOO0FBQ0EsbUJBQU8sSUFBUDtBQUNBLDhCQUFrQixFQUFsQjtBQUNBLGlDQUFxQixJQUFyQjtZQTNDaUI7ZUErekNuQixZQUFZLEtBQUssY0FBTCxDQS96Q087O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FEaUI7QUFFakIsZUFBSyxjQUFMLEdBQXNCLE1BQU0sY0FBTixDQUZMO0FBR2pCLGVBQUssV0FBTCxHQUFtQixNQUFNLFdBQU4sQ0FIRjtBQUlqQixlQUFLLGVBQUwsR0FBdUIsTUFBTSxlQUFOLENBSk47QUFLakIsZUFBSyxZQUFMLEdBQW9CLE1BQU0sT0FBTixDQUxIO0FBTWpCLGVBQUssYUFBTCxHQUFxQixNQUFNLGFBQU4sQ0FOSjtBQU9qQixlQUFLLGNBQUwsR0FBc0IsTUFBTSxjQUFOLENBUEw7U0FBbkI7O0FBSFcsaUNBcURYLHlDQUFlLGNBQWM7QUFDM0IsZUFBSyxJQUFJLElB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QUFXO0FBQzNCLGVBQUssV0FBTCxDQUFpQixpQkFBakIsR0FBcUMsS0FBckMsQ0FEMkI7QUFFM0IsZUFBSyxxQkFBTCxHQUYyQjs7O0FBanpDbEIsaUNBd3pDWCxxQ0FBYzs7O0FBQ1osY0FBSSxRQUFRLEVBQVIsQ0FEUTtBQUVaLGVBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLE9BQTlCLENBQXNDLFVBQUMsQ0FBRCxFQUFNO0FBQzFDLGtCQUFNLElBQU4sQ0FBVyxFQUFFLE9BQUssS0FBTCxDQUFXLEtBQVgsQ0FBYixFQUQwQztXQUFOLENBQXRDLENBRlk7QUFLWixpQkFBTyxLQUFQLENBTFk7OztBQXh6Q0gsaUNBczBDWCxxQ0FBYSxXQUFXOzs7QUFHdEIsY0FBSSxjQUFjLFNBQWQsRUFBeUI7QUFDM0Isd0JBQVksRUFBWixDQUQyQjtXQUE3QjtBQUdBLGNBQUksVUFBVSxFQUFWLENBTmtCO0FBT3RCLGNBQUksT0FBTyxLQUFLLFdBQUwsRUFBUCxDQVBrQjtBQVF0QixjQUFJLGFBQWEsS0FBSyxXQUFMLENBQWlCLGNBQWpCLENBUks7O0FBV3RCLGNBQUksVUFBVSxTQUFWLE9BQVUsQ0FBQyxHQUFELEVBQVM7QUFDckIsc0JBQVUsVUFBVSxJQUFJLElBQUosQ0FBUyxHQUFULENBQVYsR0FBMEIsSUFBMUIsQ0FEVztXQUFULENBWFE7O0FBZ0J0QixrQkFBUSxVQUFSLEVBaEJzQjs7QUFtQnRCLGVBQUssT0FBTCxDQUFhLFVBQUMsR0FBRCxFQUFRO0FBQ25CLGdCQUFJLFVBQVUsRUFBVixDQURlO0FBRW5CLHVCQUFXLE9BQVgsQ0FBbUIsVUFBQyxHQUFELEVBQVE7QUFDekIsa0JBQUksVUFBVSxPQUFWLENBQWtCLEdBQWxCLE1BQTJCLENBQUMsQ0FBRCxFQUFJO0FBQ2pDLHdCQUFRLElBQVIsQ0FBYSxPQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLEdBQXRCLEVBQTJCLEdBQTNCLENBQWIsRUFEaUM7ZUFBbkM7YUFEaUIsQ0FBbkIsQ0FGbUI7QUFPbkIsb0JBQVEsT0FBUixFQVBtQjtXQUFSLENBQWIsQ0FuQnNCOztBQStCdEIsY0FBSSxlQUFlLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFmLENBL0JrQjtBQWdDdEIsdUJBQWEsWUFBYixDQUEwQixNQUExQixFQUFrQyxtQ0FBbUMsbUJBQW1CLE9BQW5CLENBQW5DLENBQWxDLENBaENzQjtBQWlDdEIsdUJBQWEsWUFBYixDQUEwQixVQUExQixFQUFzQyxjQUF0QyxFQWpDc0I7QUFrQ3RCLHVCQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsTUFBN0IsQ0FsQ3NCO0FBbUN0QixtQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixZQUExQixFQW5Dc0I7QUFvQ3RCLHVCQUFhLEtBQWIsR0FwQ3NCO0FBcUN0QixtQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixZQUExQixFQXJDc0I7OztlQXQwQ2IiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
