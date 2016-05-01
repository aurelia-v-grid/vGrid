"use strict";

System.register(["aurelia-framework"], function (_export, _context) {
  var ViewSlot, _createClass, VGridGenerator;

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
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("VGridGenerator", VGridGenerator = function () {
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
        }

        VGridGenerator.prototype.fillDataInRows = function fillDataInRows(clearAllRows) {
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.rowHeight;
            var row = this.htmlCache.rowsArray[i];
            this.insertRowMarkup(currentRow, row, true, true);
          }
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
            rowTemplate = rowTemplate + ("<v-grid-cell-header column-no=" + i + "></v-grid-cell-header>");
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
                rowTemplate = rowTemplate + ("<v-grid-cell-row col-no=" + i + "></v-grid-cell-row>");
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
          var _this = this;

          this.vGridConfig.getDataElement(rowNo, isDownScroll, isLargeScroll, function (entity) {

            row.div.setAttribute("row", rowNo);

            if (entity === "") {
              var bindingContext = {};
              row.viewSlot.bind(bindingContext);
              row.div.classList.add(_this.vGridConfig.css.noData);
            } else {
              if (row.div.classList.contains(_this.vGridConfig.css.noData)) {
                row.div.classList.remove(_this.vGridConfig.css.noData);
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
              if (row.div.classList.contains(_this.vGridConfig.css.rowEven)) {
                row.div.classList.remove(_this.vGridConfig.css.rowEven);
                row.div.classList.add(_this.vGridConfig.css.rowAlt);
              }
            } else {
              if (row.div.classList.contains(_this.vGridConfig.css.rowAlt)) {
                row.div.classList.remove(_this.vGridConfig.css.rowAlt);
                row.div.classList.add(_this.vGridConfig.css.rowEven);
              }
            }

            if (_this.vGridSelection.isSelected(rowNo)) {
              row.div.classList.add(_this.vGridConfig.css.rowSelected);
            } else {
              row.div.classList.remove(_this.vGridConfig.css.rowSelected);
            }
          });
        };

        VGridGenerator.prototype.onNormalScrollingLarge = function onNormalScrollingLarge() {
          var _this2 = this;

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
              var row = _this2.htmlCache.rowsArray[cacheRowNumber];
              _this2.setRowTopValue([row], 0, currentRowTop);
              currentRowTop = currentRowTop + _this2.vGridConfig.rowHeight;
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
          var _this3 = this;

          this.scrollVars.halt = true;

          var timeout = this.vGridConfig.dataScrollDelay;

          clearTimeout(this.scrollVars.timer);

          this.scrollVars.timer = setTimeout(function () {
            _this3.onNormalScrollingLarge();
            _this3.scrollVars.halt = false;
          }, timeout);
        };

        VGridGenerator.prototype.onScroll = function onScroll() {
          var _this4 = this;

          var doScroll = function doScroll() {
            var currentScrollTop = _this4.htmlCache.content.scrollTop;
            var currentScrollLeft = _this4.htmlCache.content.scrollLeft;

            if (currentScrollTop !== _this4.scrollVars.lastScrollTop) {
              if (currentScrollLeft !== 0) {
                _this4.htmlCache.content.scrollLeft = _this4.scrollVars.lastScrollLeft;
                _this4.htmlCache.header.scrollLeft = _this4.scrollVars.lastScrollLeft;
              }

              var isDownScroll = true;
              if (currentScrollTop < _this4.scrollVars.lastScrollTop) {
                isDownScroll = false;
              }

              var isLargeScroll;
              switch (true) {
                case currentScrollTop > _this4.scrollVars.lastScrollTop + _this4.vGridConfig.largeScrollLimit:
                case currentScrollTop < _this4.scrollVars.lastScrollTop - _this4.vGridConfig.largeScrollLimit:
                  isLargeScroll = true;
                  break;
                default:
                  isLargeScroll = false;
              }

              _this4.scrollVars.lastScrollTop = currentScrollTop;

              if (isLargeScroll) {
                if (_this4.vGridConfig.renderOnScrollbarScroll) {
                  _this4.onNormalScrollingLarge(isDownScroll, currentScrollTop);
                } else {
                  _this4.onScrollbarScrolling();
                }
              } else {
                _this4.onNormalScrolling(isDownScroll, currentScrollTop);
              }
            } else {

              if (_this4.htmlCache.content.style.overflowX === "hidden") {
                _this4.htmlCache.content.scrollLeft = 0;
                _this4.scrollVars.lastScrollLeft = 0;
                _this4.htmlCache.header.scrollLeft = 0;
              } else {
                if (_this4.scrollVars.lastScrollLeft !== currentScrollLeft) {
                  currentScrollLeft = _this4.htmlCache.content.scrollLeft;
                  _this4.scrollVars.lastScrollLeft = currentScrollLeft;
                  _this4.htmlCache.header.scrollLeft = currentScrollLeft;
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
          var _this5 = this;

          if (this.vGridConfig.sortOnHeaderClick) {
            var orderByClick = function orderByClick(event) {
              _this5.vGridConfig.onOrderBy(event, function (sortorder) {
                _this5.sortOrder = sortorder;
                _this5.rebuildGridHeaderHtml();
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
          var _this6 = this;

          var handleClick = function handleClick(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this6.vGridConfig.clickHandler(e, currentRow);
            if (_this6.vGridConfig.isMultiSelect !== undefined) {
              _this6.vGridSelection.setHightlight(e, currentRow, _this6);
            }
          };

          var handleTabbing = function handleTabbing(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this6.vGridConfig.clickHandler(e, currentRow);
            if (_this6.vGridConfig.isMultiSelect !== undefined) {
              _this6.vGridSelection.setHightlight(e, currentRow, _this6);
            }
          };

          var handleDblClick = function handleDblClick(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this6.vGridConfig.clickHandler(e, currentRow);
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

        VGridGenerator.prototype.getGridRows = function getGridRows() {
          var _this7 = this;

          var array = [];
          this.vGrid.vGridCollectionFiltered.forEach(function (x) {
            array.push(x[_this7.vGrid.vGridRowKey]);
          });
          return array;
        };

        VGridGenerator.prototype.createReport = function createReport(skipArray) {
          var _this8 = this;

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
                tempArr.push(_this8.vGrid.vGridCollection[row][att]);
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

        _createClass(VGridGenerator, [{
          key: "vGridSelection",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridSelection;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridConfig",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridConfig;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridCellHelper",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCellHelper;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridElement",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.element;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridSortable",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridSortable;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridResizable",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridResizable;
            } else {
              return null;
            }
          }
        }]);

        return VGridGenerator;
      }());

      _export("VGridGenerator", VGridGenerator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBV0s7QUFFWCxpQkFGVyxjQUVYLENBQVksS0FBWixFQUFtQjtnQ0FGUixnQkFFUTs7ZUE2RG5CLHdCQUF3QixHQTdETDtlQThEbkIsWUFBWSxHQTlETztlQStEbkIsZ0JBQWdCLEVBL0RHO2VBZ0VuQixhQUFhLEVBaEVNO2VBaUVuQixZQUFZLEVBakVPO2VBa0VuQixtQkFBbUIsR0FsRUE7ZUFtRW5CLG1CQUFtQixFQW5FQTtlQXNFbkIscUJBQXFCLE1BdEVGO2VBd0VuQixZQUFZO0FBQ1Ysa0JBQU0sSUFBTjtBQUNBLG9CQUFRLElBQVI7QUFDQSxxQkFBUyxJQUFUO0FBQ0Esb0JBQVEsSUFBUjtBQUNBLHVCQUFXLEVBQVg7QUFDQSx3QkFBWSxJQUFaO0FBQ0EseUJBQWEsSUFBYixHQS9FaUI7ZUFrRm5CLGFBQWE7QUFDWCwyQkFBZSxDQUFmO0FBQ0Esc0JBQVUsQ0FBVjtBQUNBLDRCQUFnQixDQUFoQjtBQUNBLGtCQUFNLEtBQU47QUFDQSxtQkFBTyxJQUFQO0FBQ0EsOEJBQWtCLEVBQWxCO0FBQ0EsaUNBQXFCLElBQXJCO1lBekZpQjtlQTRxQ25CLFlBQVksS0FBSyxjQUFMLENBNXFDTzs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQURpQjtTQUFuQjs7QUFGVyxpQ0FrR1gseUNBQWUsY0FBYztBQUMzQixlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLGlCQUFMLEVBQUosRUFBOEIsR0FBOUMsRUFBbUQ7QUFDakQsZ0JBQUksYUFBYSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLENBQXpCLEVBQTRCLEdBQTVCLEdBQWtDLEtBQUssV0FBTCxDQUFpQixTQUFqQixDQURGO0FBRWpELGdCQUFJLE1BQU0sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixDQUF6QixDQUFOLENBRjZDO0FBR2pELGlCQUFLLGVBQUwsQ0FBcUIsVUFBckIsRUFBaUMsR0FBakMsRUFBc0MsSUFBdEMsRUFBNEMsSUFBNUMsRUFIaUQ7V0FBbkQ7OztBQW5HUyxpQ0ErR1gsMkNBQWdCLE9BQU8sVUFBVTtBQUMvQixlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLGlCQUFMLEVBQUosRUFBOEIsR0FBOUMsRUFBbUQ7QUFDakQsZ0JBQUksYUFBYSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLENBQXpCLEVBQTRCLEdBQTVCLEdBQWtDLEtBQUssV0FBTCxDQUFpQixTQUFqQixDQURGO0FBRWpELGdCQUFJLFVBQVUsVUFBVixFQUFzQjtBQUN4QixrQkFBSSxNQUFNLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsQ0FBekIsQ0FBTixDQURvQjtBQUV4QixtQkFBSyxlQUFMLENBQXFCLFVBQXJCLEVBQWlDLEdBQWpDLEVBQXNDLElBQXRDLEVBQTRDLElBQTVDLEVBRndCO2FBQTFCO1dBRkY7OztBQWhIUyxpQ0E2SFgsK0RBQTJCO0FBQ3pCLGNBQUksQ0FBSixDQUR5QjtBQUV6QixlQUFLLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxpQkFBTCxFQUFKLEVBQThCLEdBQTFDLEVBQStDO0FBQzdDLGdCQUFJLGFBQWEsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixDQUF6QixFQUE0QixHQUE1QixHQUFrQyxLQUFLLFdBQUwsQ0FBaUIsU0FBakIsQ0FETjtBQUU3QyxnQkFBSSxLQUFLLGNBQUwsQ0FBb0IsVUFBcEIsQ0FBK0IsVUFBL0IsQ0FBSixFQUFnRDtBQUM5QyxtQkFBSyxTQUFMLENBQWUsU0FBZixDQUF5QixDQUF6QixFQUE0QixHQUE1QixDQUFnQyxTQUFoQyxDQUEwQyxHQUExQyxDQUE4QyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckIsQ0FBOUMsQ0FEOEM7YUFBaEQsTUFFTztBQUNMLG1CQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLENBQXpCLEVBQTRCLEdBQTVCLENBQWdDLFNBQWhDLENBQTBDLE1BQTFDLENBQWlELEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixDQUFqRCxDQURLO2FBRlA7V0FGRjs7O0FBL0hTLGlDQTZJWCxpREFBb0I7QUFDbEIsY0FBSSxjQUFjLEVBQWQsQ0FEYztBQUVsQixlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLFdBQUwsQ0FBaUIsT0FBakIsQ0FBeUIsTUFBekIsRUFBaUMsR0FBckQsRUFBMEQ7QUFDeEQsMEJBQWMsa0RBQStDLDZCQUEvQyxDQUQwQztXQUExRDtBQUdBLGlCQUFPLFdBQVAsQ0FMa0I7OztBQTdJVCxpQ0F5SlgsMkNBQWlCO0FBQ2YsY0FBSSxjQUFjLEVBQWQsQ0FEVztBQUVmLGNBQUksS0FBSyxTQUFMLENBQWUsV0FBZixLQUErQixJQUEvQixFQUFxQztBQUN2QywwQkFBYyxLQUFLLFNBQUwsQ0FBZSxXQUFmLENBRHlCO1dBQXpDLE1BRU87QUFDTCxnQkFBSSxLQUFLLFdBQUwsQ0FBaUIsaUJBQWpCLEVBQW9DO0FBQ3RDLDRCQUFjLEtBQUssV0FBTCxDQUFpQixpQkFBakIsQ0FBbUMsS0FBSyxXQUFMLENBQWlCLGNBQWpCLENBQWpELENBRHNDO2FBQXhDLE1BRU87QUFDTCxtQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLE1BQXpCLEVBQWlDLEdBQXJELEVBQTBEO0FBQ3hELDhCQUFjLDRDQUF5QywwQkFBekMsQ0FEMEM7ZUFBMUQ7YUFIRjtXQUhGO0FBV0EsaUJBQU8sV0FBUCxDQWJlOzs7QUF6Sk4saUNBNktYLDZDQUFpQixVQUFVO0FBQ3pCLGVBQUssU0FBTCxDQUFlLFdBQWYsR0FBNkIsSUFBN0IsQ0FEeUI7QUFFekIsZUFBSyxTQUFMLENBQWUsV0FBZixHQUE2QixZQUFZLEtBQUssY0FBTCxFQUFaLENBRko7OztBQTdLaEIsaUNBc0xYLHFEQUFzQjtBQUNwQixjQUFJLFFBQVEsQ0FBUixDQURnQjtBQUVwQixlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLFdBQUwsQ0FBaUIsT0FBakIsQ0FBeUIsTUFBekIsRUFBaUMsR0FBckQsRUFBMEQ7QUFDeEQsb0JBQVEsUUFBUSxTQUFTLEtBQUssV0FBTCxDQUFpQixnQkFBakIsQ0FBa0MsQ0FBbEMsQ0FBVCxFQUErQyxFQUEvQyxDQUFSLENBRGdEO1dBQTFEO0FBR0EsaUJBQU8sS0FBUCxDQUxvQjs7O0FBdExYLGlDQWtNWCwyQ0FBZ0IsUUFBUSxnQkFBZ0I7QUFDdEMsY0FBSSxjQUFjLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFkLENBRGtDO0FBRXRDLHNCQUFZLFNBQVosR0FBd0IsS0FBSyxjQUFMLENBQW9CLGNBQXBCLENBQXhCLENBRnNDO0FBR3RDLGlCQUFPLFlBQVksU0FBWixDQUgrQjs7O0FBbE03QixpQ0E0TVgsaURBQW9CO0FBQ2xCLGlCQUFPLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsTUFBekIsQ0FEVzs7O0FBNU1ULGlDQW9OWCx5Q0FBZSxVQUFVLFdBQVcsVUFBVTtBQUM1QyxtQkFBUyxTQUFULEVBQW9CLEdBQXBCLENBQXdCLEtBQXhCLENBQThCLFNBQTlCLHdCQUE2RCxxQkFBN0QsQ0FENEM7QUFFNUMsbUJBQVMsU0FBVCxFQUFvQixHQUFwQixHQUEwQixRQUExQixDQUY0Qzs7O0FBcE5uQyxpQ0E2TlgseURBQXdCOztBQUV0QixjQUFJLElBQUksU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQUosQ0FGa0I7QUFHdEIsZUFBSyxZQUFMLENBQWtCLFdBQWxCLENBQThCLENBQTlCLEVBSHNCO0FBSXRCLGVBQUssU0FBTCxDQUFlLElBQWYsR0FBc0IsQ0FBdEIsQ0FKc0I7O0FBUXRCLGVBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsU0FBcEIsR0FBZ0MsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLE9BQXJCLENBUlY7QUFTdEIsZUFBSyxTQUFMLENBQWUsSUFBZixDQUFvQixLQUFwQixDQUEwQixRQUExQixHQUFxQyxVQUFyQyxDQVRzQjtBQVV0QixlQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLEtBQXBCLENBQTBCLE1BQTFCLEdBQW1DLEtBQUssWUFBTCxDQUFrQixLQUFsQixDQUF3QixNQUF4QixJQUFrQyxNQUFsQyxDQVZiO0FBV3RCLGVBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsS0FBcEIsQ0FBMEIsS0FBMUIsR0FBa0MsS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQXdCLEtBQXhCLElBQWlDLE1BQWpDLENBWFo7O0FBY3RCLGVBQUssVUFBTCxHQUFrQixLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLFlBQXBCLENBZEk7QUFldEIsZUFBSyxVQUFMLEdBQWtCLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsV0FBcEIsQ0FmSTs7O0FBN05iLGlDQW9QWCxxRUFBOEI7QUFFNUIsZUFBSyxTQUFMLENBQWUsTUFBZixHQUF3QixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBeEIsQ0FGNEI7QUFHNUIsZUFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixTQUF0QixHQUFrQyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsVUFBckIsQ0FITjtBQUk1QixlQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCLEtBQXRCLENBQTRCLE1BQTVCLEdBQXFDLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxJQUFoQyxDQUpUO0FBSzVCLGVBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsV0FBcEIsQ0FBZ0MsS0FBSyxTQUFMLENBQWUsTUFBZixDQUFoQyxDQUw0Qjs7QUFPNUIsY0FBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFOLENBUHdCO0FBUTVCLGNBQUksU0FBSixHQUFnQixLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsR0FBckIsR0FBMkIsR0FBM0IsR0FBaUMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFNBQXJCLENBUnJCOztBQVU1QixjQUFJLEtBQUosQ0FBVSxNQUFWLEdBQW1CLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxJQUFoQyxDQVZTO0FBVzVCLGNBQUksS0FBSixDQUFVLEtBQVYsR0FBa0IsS0FBSyxtQkFBTCxLQUE2QixJQUE3QixDQVhVO0FBWTVCLGVBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsV0FBdEIsQ0FBa0MsR0FBbEMsRUFaNEI7O0FBYzVCLGNBQUksY0FBYyxLQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLE9BQXhCLENBQWdDLGVBQWUsS0FBSyxpQkFBTCxFQUFmLEdBQTBDLGFBQTFDLEVBQXlELEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBdkcsQ0Fkd0I7QUFlNUIsY0FBSSxPQUFPLFlBQVksTUFBWixDQUFtQixLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQTFCLENBZndCO0FBZ0I1QixlQUFLLGNBQUwsR0FBc0IsSUFBSSxRQUFKLENBQWEsS0FBSyxTQUFMLENBQWUsTUFBZixDQUFzQixVQUF0QixFQUFrQyxJQUEvQyxDQUF0QixDQWhCNEI7QUFpQjVCLGVBQUssY0FBTCxDQUFvQixHQUFwQixDQUF3QixJQUF4QixFQWpCNEI7QUFrQjVCLGNBQUksaUJBQWlCLEVBQWpCLENBbEJ3QjtBQW1CNUIsZUFBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLGNBQXpCLEVBbkI0QjtBQW9CNUIsZUFBSyxjQUFMLENBQW9CLFFBQXBCLEdBcEI0Qjs7O0FBcFBuQixpQ0FpUlgseURBQXdCO0FBRXRCLGNBQUksZ0JBQWdCLEtBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsVUFBdEIsQ0FBaUMsS0FBakMsQ0FBdUMsSUFBdkMsQ0FGRTtBQUd0QixlQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCLFdBQXRCLENBQWtDLEtBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsVUFBdEIsQ0FBbEMsQ0FIc0I7O0FBS3RCLGNBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBTixDQUxrQjtBQU10QixjQUFJLFNBQUosR0FBZ0IsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLEdBQXJCLEdBQTJCLEdBQTNCLEdBQWlDLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixTQUFyQixDQU4zQjtBQU90QixjQUFJLEtBQUosQ0FBVSxNQUFWLEdBQW1CLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxJQUFoQyxDQVBHO0FBUXRCLGNBQUksS0FBSixDQUFVLEtBQVYsR0FBa0IsS0FBSyxtQkFBTCxLQUE2QixJQUE3QixDQVJJO0FBU3RCLGVBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsV0FBdEIsQ0FBa0MsR0FBbEMsRUFUc0I7O0FBV3RCLGNBQUksY0FBYyxLQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLE9BQXhCLENBQWdDLGVBQWUsS0FBSyxpQkFBTCxFQUFmLEdBQTBDLGFBQTFDLEVBQXlELEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBdkcsQ0FYa0I7QUFZdEIsY0FBSSxPQUFPLFlBQVksTUFBWixDQUFtQixLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQTFCLENBWmtCO0FBYXRCLGVBQUssY0FBTCxDQUFvQixNQUFwQixHQWJzQjtBQWN0QixlQUFLLGNBQUwsQ0FBb0IsUUFBcEIsR0Fkc0I7QUFldEIsZUFBSyxjQUFMLENBQW9CLFNBQXBCLEdBZnNCO0FBZ0J0QixlQUFLLGNBQUwsR0FBc0IsSUFBdEIsQ0FoQnNCO0FBaUJ0QixlQUFLLGNBQUwsR0FBc0IsSUFBSSxRQUFKLENBQWEsS0FBSyxTQUFMLENBQWUsTUFBZixDQUFzQixVQUF0QixFQUFrQyxJQUEvQyxDQUF0QixDQWpCc0I7QUFrQnRCLGVBQUssY0FBTCxDQUFvQixHQUFwQixDQUF3QixJQUF4QixFQWxCc0I7QUFtQnRCLGNBQUksaUJBQWlCLEVBQWpCLENBbkJrQjtBQW9CdEIsZUFBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLGNBQXpCLEVBcEJzQjtBQXFCdEIsZUFBSyxjQUFMLENBQW9CLFFBQXBCLEdBckJzQjs7QUF1QnRCLGVBQUssNEJBQUwsR0F2QnNCOztBQTBCdEIsZUFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixVQUF0QixDQUFpQyxLQUFqQyxDQUF1QyxJQUF2QyxHQUE4QyxhQUE5QyxDQTFCc0I7OztBQWpSYixpQ0FrVFgsdUVBQStCO0FBRTdCLGNBQUksb0JBQW9CLEtBQUssVUFBTCxDQUZLO0FBRzdCLGNBQUksd0JBQXdCLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxLQUFLLFdBQUwsQ0FBaUIsWUFBakIsQ0FIL0I7QUFJN0IsZUFBSyxhQUFMLEdBQXFCLG9CQUFvQixxQkFBcEIsQ0FKUTs7QUFPN0IsZUFBSyxTQUFMLENBQWUsT0FBZixHQUF5QixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBekIsQ0FQNkI7QUFRN0IsZUFBSyxTQUFMLENBQWUsT0FBZixDQUF1QixTQUF2QixHQUFtQyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckIsQ0FSTjtBQVM3QixlQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLEtBQXZCLENBQTZCLE1BQTdCLEdBQXNDLEtBQUssYUFBTCxHQUFxQixJQUFyQixDQVRUO0FBVTdCLGVBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsV0FBcEIsQ0FBZ0MsS0FBSyxTQUFMLENBQWUsT0FBZixDQUFoQyxDQVY2Qjs7O0FBbFRwQixpQ0FtVVgscUVBQThCO0FBRTVCLGVBQUssU0FBTCxDQUFlLE1BQWYsR0FBd0IsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXhCLENBRjRCO0FBRzVCLGVBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsU0FBdEIsR0FBa0MsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFVBQXJCLENBSE47QUFJNUIsZUFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixLQUF0QixDQUE0QixNQUE1QixHQUFxQyxLQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsSUFBaEMsQ0FKVDtBQUs1QixlQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLFdBQXBCLENBQWdDLEtBQUssU0FBTCxDQUFlLE1BQWYsQ0FBaEMsQ0FMNEI7OztBQW5VbkIsaUNBK1VYLCtEQUEyQjtBQUN6QixjQUFJLG1CQUFtQixLQUFLLFdBQUwsQ0FBaUIsbUJBQWpCLEVBQW5CLENBRHFCO0FBRXpCLGVBQUssZ0JBQUwsR0FBd0IsbUJBQW1CLEtBQUssV0FBTCxDQUFpQixTQUFqQixDQUZsQjs7O0FBL1VoQixpQ0F3VlgsNkVBQWtDO0FBQ2hDLGVBQUssd0JBQUwsR0FEZ0M7O0FBR2hDLGVBQUssU0FBTCxDQUFlLFVBQWYsR0FBNEIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQTVCLENBSGdDO0FBSWhDLGVBQUssU0FBTCxDQUFlLFVBQWYsQ0FBMEIsU0FBMUIsR0FBc0MsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFVBQXJCLENBSk47QUFLaEMsZUFBSyxTQUFMLENBQWUsVUFBZixDQUEwQixLQUExQixDQUFnQyxNQUFoQyxHQUF5QyxLQUFLLGdCQUFMLEdBQXdCLElBQXhCLENBTFQ7QUFNaEMsZUFBSyxTQUFMLENBQWUsVUFBZixDQUEwQixLQUExQixDQUFnQyxLQUFoQyxHQUF3QyxLQUFLLG1CQUFMLEtBQTZCLElBQTdCLENBTlI7QUFPaEMsZUFBSyxTQUFMLENBQWUsT0FBZixDQUF1QixXQUF2QixDQUFtQyxLQUFLLFNBQUwsQ0FBZSxVQUFmLENBQW5DLENBUGdDOzs7QUF4VnZCLGlDQXNXWCx1RUFBK0I7QUFDN0IsZUFBSyxTQUFMLENBQWUsVUFBZixDQUEwQixLQUExQixDQUFnQyxLQUFoQyxHQUF3QyxLQUFLLG1CQUFMLEtBQTZCLElBQTdCLENBRFg7QUFFN0IsZUFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixNQUF6QixFQUFpQyxHQUFyRCxFQUEwRDtBQUN4RCxpQkFBSyxTQUFMLENBQWUsU0FBZixDQUF5QixDQUF6QixFQUE0QixHQUE1QixDQUFnQyxLQUFoQyxDQUFzQyxLQUF0QyxHQUE4QyxLQUFLLG1CQUFMLEtBQTZCLElBQTdCLENBRFU7V0FBMUQ7QUFHQSxlQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCLFVBQXRCLENBQWlDLEtBQWpDLENBQXVDLEtBQXZDLEdBQStDLEtBQUssbUJBQUwsS0FBNkIsSUFBN0IsQ0FMbEI7OztBQXRXcEIsaUNBa1hYLDZFQUFrQztBQUNoQyxlQUFLLFNBQUwsQ0FBZSxVQUFmLENBQTBCLEtBQTFCLENBQWdDLEtBQWhDLEdBQXdDLEtBQUssbUJBQUwsS0FBNkIsSUFBN0IsQ0FEUjtBQUVoQyxlQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCLFVBQXRCLENBQWlDLEtBQWpDLENBQXVDLEtBQXZDLEdBQStDLEtBQUssbUJBQUwsS0FBNkIsSUFBN0IsQ0FGZjs7O0FBbFh2QixpQ0EyWFgsK0RBQTJCO0FBRXpCLGNBQUksb0JBQXFCLFNBQVMsS0FBSyxhQUFMLEdBQXFCLEtBQUssV0FBTCxDQUFpQixTQUFqQixFQUE0QixFQUExRCxDQUFyQixDQUZxQjs7QUFJekIsY0FBSSxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsRUFBOEI7QUFDaEMsZ0NBQW9CLG9CQUFvQixDQUFwQixDQURZO1dBQWxDOztBQUtBLGNBQUksb0JBQW9CLENBQXBCLEtBQTBCLENBQTFCLEVBQTZCO0FBQy9CLGdDQUFvQixvQkFBb0IsQ0FBcEIsQ0FEVztXQUFqQyxNQUVPO0FBQ0wsZ0NBQW9CLG9CQUFvQixDQUFwQixDQURmO1dBRlA7O0FBTUEsY0FBSSxNQUFNLENBQU4sQ0FmcUI7QUFnQnpCLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLGlCQUFKLEVBQXVCLEdBQXZDLEVBQTRDOztBQUUxQyxnQkFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFOLENBRnNDOztBQUsxQyxnQkFBSSxTQUFKLEdBQWdCLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixHQUFyQixDQUwwQjs7QUFRMUMsZ0JBQUksSUFBSSxDQUFKLEtBQVUsQ0FBVixFQUFhO0FBQ2Ysa0JBQUksU0FBSixDQUFjLEdBQWQsQ0FBa0IsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLE1BQXJCLENBQWxCLENBRGU7YUFBakIsTUFFTztBQUNMLGtCQUFJLFNBQUosQ0FBYyxHQUFkLENBQWtCLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixPQUFyQixDQUFsQixDQURLO2FBRlA7O0FBTUEsZ0JBQUksS0FBSixDQUFVLE1BQVYsR0FBbUIsS0FBSyxXQUFMLENBQWlCLFNBQWpCLEdBQTZCLElBQTdCLENBZHVCOztBQWdCMUMsaUJBQUssY0FBTCxDQUFvQixDQUFDO0FBQ25CLG1CQUFLLEdBQUw7QUFDQSxtQkFBSyxDQUFMO2FBRmtCLENBQXBCLEVBR0ksQ0FISixFQUdPLEdBSFAsRUFoQjBDOztBQXFCMUMsZ0JBQUksS0FBSixDQUFVLFFBQVYsR0FBcUIsS0FBSyxTQUFMLENBQWUsSUFBZixDQUFvQixXQUFwQixHQUFrQyxJQUFsQyxDQXJCcUI7QUFzQjFDLGdCQUFJLEtBQUosQ0FBVSxLQUFWLEdBQWtCLEtBQUssbUJBQUwsS0FBNkIsSUFBN0IsQ0F0QndCOztBQXlCMUMsZ0JBQUksU0FBSixHQUFnQixFQUFoQixDQXpCMEM7O0FBNEIxQyxpQkFBSyxTQUFMLENBQWUsVUFBZixDQUEwQixXQUExQixDQUFzQyxHQUF0QyxFQTVCMEM7O0FBZ0MxQyxpQkFBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixDQUE4QjtBQUM1QixtQkFBSyxHQUFMO0FBQ0EsbUJBQUssR0FBTDthQUZGLEVBaEMwQzs7QUFxQzFDLGtCQUFNLE1BQU0sS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBckM4QjtXQUE1Qzs7O0FBM1lTLGlDQXdiWCwyQ0FBZ0IsT0FBTyxLQUFLLGNBQWMsZUFBZTs7O0FBR3ZELGVBQUssV0FBTCxDQUFpQixjQUFqQixDQUFnQyxLQUFoQyxFQUF1QyxZQUF2QyxFQUFxRCxhQUFyRCxFQUNFLFVBQUMsTUFBRCxFQUFZOztBQUVWLGdCQUFJLEdBQUosQ0FBUSxZQUFSLENBQXFCLEtBQXJCLEVBQTRCLEtBQTVCLEVBRlU7O0FBS1YsZ0JBQUksV0FBVyxFQUFYLEVBQWU7QUFDakIsa0JBQUksaUJBQWlCLEVBQWpCLENBRGE7QUFFakIsa0JBQUksUUFBSixDQUFhLElBQWIsQ0FBa0IsY0FBbEIsRUFGaUI7QUFHakIsa0JBQUksR0FBSixDQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsTUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLE1BQXJCLENBQXRCLENBSGlCO2FBQW5CLE1BSU87QUFDTCxrQkFBSSxJQUFJLEdBQUosQ0FBUSxTQUFSLENBQWtCLFFBQWxCLENBQTJCLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixNQUFyQixDQUEvQixFQUE2RDtBQUMzRCxvQkFBSSxHQUFKLENBQVEsU0FBUixDQUFrQixNQUFsQixDQUF5QixNQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsTUFBckIsQ0FBekIsQ0FEMkQ7ZUFBN0Q7YUFMRjs7QUFXQSxnQkFBSSxXQUFXLEVBQVgsSUFBaUIsSUFBSSxRQUFKLEtBQWlCLElBQWpCLEVBQXVCO0FBQzFDLGtCQUFJLGtCQUFpQixFQUFqQixDQURzQztBQUUxQyxtQkFBSyxJQUFJLENBQUosSUFBUyxNQUFkLEVBQXNCO0FBQ3BCLG9CQUFJLE9BQU8sY0FBUCxDQUFzQixDQUF0QixDQUFKLEVBQThCO0FBQzVCLHNCQUFJLGdCQUFlLENBQWYsTUFBc0IsT0FBTyxDQUFQLENBQXRCLEVBQWlDO0FBQ25DLG9DQUFlLENBQWYsSUFBb0IsT0FBTyxDQUFQLENBQXBCLENBRG1DO21CQUFyQztpQkFERjtlQURGO0FBT0Esa0JBQUksUUFBSixDQUFhLElBQWIsQ0FBa0IsZUFBbEIsRUFUMEM7YUFBNUM7O0FBY0EsZ0JBQUksUUFBUSxDQUFSLEtBQWMsQ0FBZCxFQUFpQjtBQUNuQixrQkFBSSxJQUFJLEdBQUosQ0FBUSxTQUFSLENBQWtCLFFBQWxCLENBQTJCLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixPQUFyQixDQUEvQixFQUE4RDtBQUM1RCxvQkFBSSxHQUFKLENBQVEsU0FBUixDQUFrQixNQUFsQixDQUF5QixNQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsT0FBckIsQ0FBekIsQ0FENEQ7QUFFNUQsb0JBQUksR0FBSixDQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsTUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLE1BQXJCLENBQXRCLENBRjREO2VBQTlEO2FBREYsTUFNTztBQUNMLGtCQUFJLElBQUksR0FBSixDQUFRLFNBQVIsQ0FBa0IsUUFBbEIsQ0FBMkIsTUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLE1BQXJCLENBQS9CLEVBQTZEO0FBQzNELG9CQUFJLEdBQUosQ0FBUSxTQUFSLENBQWtCLE1BQWxCLENBQXlCLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixNQUFyQixDQUF6QixDQUQyRDtBQUUzRCxvQkFBSSxHQUFKLENBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixNQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsT0FBckIsQ0FBdEIsQ0FGMkQ7ZUFBN0Q7YUFQRjs7QUFlQSxnQkFBSSxNQUFLLGNBQUwsQ0FBb0IsVUFBcEIsQ0FBK0IsS0FBL0IsQ0FBSixFQUEyQztBQUN6QyxrQkFBSSxHQUFKLENBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixNQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckIsQ0FBdEIsQ0FEeUM7YUFBM0MsTUFFTztBQUNMLGtCQUFJLEdBQUosQ0FBUSxTQUFSLENBQWtCLE1BQWxCLENBQXlCLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixDQUF6QixDQURLO2FBRlA7V0E3Q0YsQ0FERixDQUh1RDs7O0FBeGI5QyxpQ0F1ZlgsMkRBQXlCOzs7QUFFdkIsZUFBSyxVQUFMLENBQWdCLGFBQWhCLEdBQWdDLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsU0FBdkIsQ0FGVDs7QUFJdkIsY0FBSSxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLFNBQXZCLEtBQXFDLENBQXJDLElBQTBDLEtBQUssVUFBTCxDQUFnQixhQUFoQixLQUFrQyxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLFNBQXZCLEVBQWtDO0FBQ2hILGlCQUFLLFVBQUwsQ0FBZ0IsYUFBaEIsR0FBZ0MsQ0FBaEMsQ0FEZ0g7V0FBbEg7O0FBSUEsY0FBSSxLQUFLLFdBQUwsQ0FBaUIsbUJBQWpCLE1BQTBDLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsTUFBekIsRUFBaUM7QUFDN0UsaUJBQUssVUFBTCxDQUFnQixhQUFoQixHQUFnQyxDQUFoQyxDQUQ2RTtXQUEvRTs7QUFJQSxjQUFJLGFBQWEsU0FBUyxLQUFLLFVBQUwsQ0FBZ0IsYUFBaEIsR0FBZ0MsS0FBSyxXQUFMLENBQWlCLFNBQWpCLEVBQTRCLEVBQXJFLENBQWIsQ0FabUI7QUFhdkIsZUFBSyxVQUFMLENBQWdCLFFBQWhCLEdBQTJCLGFBQWEsS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBYmpCO0FBY3ZCLGNBQUksZ0JBQWdCLEtBQUssV0FBTCxDQUFpQixTQUFqQixHQUE2QixVQUE3QixDQWRHO0FBZXZCLGNBQUksY0FBSixDQWZ1QjtBQWdCdkIsZUFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxpQkFBTCxFQUFKLEVBQThCLEdBQTlDLEVBQW1EO0FBS2pELGdCQUFJLGlCQUFpQixTQUFqQixjQUFpQixDQUFDLGNBQUQsRUFBb0I7QUFDdkMsa0JBQUksTUFBTSxPQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLGNBQXpCLENBQU4sQ0FEbUM7QUFFdkMscUJBQUssY0FBTCxDQUFvQixDQUFDLEdBQUQsQ0FBcEIsRUFBMkIsQ0FBM0IsRUFBOEIsYUFBOUIsRUFGdUM7QUFHdkMsOEJBQWdCLGdCQUFnQixPQUFLLFdBQUwsQ0FBaUIsU0FBakIsQ0FITzthQUFwQixDQUw0Qjs7QUFXakQsZ0JBQUksY0FBYyxDQUFkLElBQW1CLGNBQWMsS0FBSyxXQUFMLENBQWlCLG1CQUFqQixLQUF5QyxDQUF6QyxFQUE0QztBQUMvRSw2QkFBZSxDQUFmLEVBRCtFO2FBQWpGOztBQUtBLGdCQUFJLGVBQWUsS0FBSyxXQUFMLENBQWlCLG1CQUFqQixLQUF5QyxDQUF6QyxJQUE4QyxLQUFLLGlCQUFMLEtBQTJCLEtBQUssV0FBTCxDQUFpQixtQkFBakIsS0FBeUMsQ0FBekMsRUFBNEM7QUFDdEksK0JBQWlCLENBQWpCLENBRHNJO2FBQXhJOztBQUtBLGdCQUFJLGFBQWEsS0FBSyxXQUFMLENBQWlCLG1CQUFqQixLQUF5QyxDQUF6QyxFQUE0QztBQUMzRCw2QkFBZSxDQUFmLEVBRDJEO2FBQTdEOztBQUtBLGdCQUFJLGNBQWMsS0FBSyxXQUFMLENBQWlCLG1CQUFqQixFQUFkLElBQXdELGFBQUMsR0FBZ0IsS0FBSyxXQUFMLENBQWlCLFNBQWpCLElBQStCLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsWUFBdkIsRUFBcUM7QUFFL0ksa0JBQUksTUFBTSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLENBQXpCLENBQU4sQ0FGMkk7QUFHL0ksbUJBQUssY0FBTCxDQUFvQixDQUFDLEdBQUQsQ0FBcEIsRUFBMkIsQ0FBM0IsRUFBOEIsRUFBRSxnQkFBaUIsS0FBSyxXQUFMLENBQWlCLFNBQWpCLEdBQTZCLEVBQTdCLENBQW5CLENBQTlCLENBSCtJO2FBQWpKOztBQU1BLHlCQWhDaUQ7V0FBbkQ7O0FBcUNBLGNBQUksY0FBSixFQUFvQjtBQUNsQixnQkFBSSxXQUFXLFNBQVMsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixDQUF6QixFQUE0QixHQUE1QixFQUFpQyxFQUExQyxDQUFYLENBRGM7QUFFbEIsaUJBQUssSUFBSSxLQUFLLGlCQUFMLEtBQTJCLENBQTNCLEVBQThCLElBQUksY0FBSixFQUFvQixHQUEzRCxFQUFnRTtBQUM5RCxrQkFBSSxNQUFNLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsQ0FBekIsQ0FBTixDQUQwRDtBQUU5RCx5QkFBVyxXQUFXLEtBQUssV0FBTCxDQUFpQixTQUFqQixDQUZ3QztBQUc5RCxtQkFBSyxjQUFMLENBQW9CLEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBMEIsQ0FBOUMsRUFBaUQsUUFBakQsRUFIOEQ7YUFBaEU7V0FGRjs7QUFVQSxlQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLElBQXpCLENBQ0UsVUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQjtBQUNkLG1CQUFPLFNBQVMsRUFBRSxHQUFGLENBQVQsR0FBa0IsU0FBUyxFQUFFLEdBQUYsQ0FBM0IsQ0FETztXQUFoQixDQURGLENBL0R1Qjs7QUFvRXZCLGVBQUssY0FBTCxDQUFvQixLQUFwQixFQXBFdUI7OztBQXZmZCxpQ0Fra0JYLCtDQUFrQixjQUFjLGtCQUFrQjtBQUVoRCxjQUFJLG1CQUFtQixLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLFNBQXZCLENBRnlCO0FBR2hELGNBQUksS0FBSyxVQUFMLENBQWdCLElBQWhCLEtBQXlCLEtBQXpCLEVBQWdDO0FBQ2xDLGdCQUFJLFdBQUosQ0FEa0M7QUFFbEMsZ0JBQUksYUFBYSxTQUFVLEtBQUssVUFBTCxDQUFnQixhQUFoQixHQUFnQyxLQUFLLFdBQUwsQ0FBaUIsU0FBakIsRUFBNkIsRUFBdkUsQ0FBYixDQUY4QjtBQUdsQyxpQkFBSyxVQUFMLENBQWdCLFFBQWhCLEdBQTJCLGFBQWEsS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBSE47O0FBS2xDLGlCQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLGlCQUFMLEVBQUosRUFBOEIsR0FBOUMsRUFBbUQ7O0FBRWpELGtCQUFJLE1BQU0sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixDQUF6QixDQUFOLENBRjZDO0FBR2pELGtCQUFJLFNBQVMsU0FBUyxJQUFJLEdBQUosRUFBUyxFQUFsQixDQUFULENBSDZDO0FBSWpELGtCQUFJLFNBQVMsS0FBVCxDQUo2Qzs7QUFNakQsa0JBQUksWUFBSixFQUFrQjtBQUNoQixxQkFBSyxjQUFMLEdBQXNCLE1BQXRCLENBRGdCOztBQUtoQixvQkFBSSxTQUFVLG1CQUFtQixLQUFLLFdBQUwsQ0FBaUIsU0FBakIsRUFBNkI7QUFDNUQsMkJBQVMsSUFBVCxDQUQ0RDtBQUU1RCxnQ0FBYyxTQUFVLEtBQUssV0FBTCxDQUFpQixTQUFqQixHQUE2QixLQUFLLGlCQUFMLEVBQTdCLENBRm9DO0FBRzVELCtCQUFhLENBQUMsU0FBVSxLQUFLLFdBQUwsQ0FBaUIsU0FBakIsR0FBNkIsS0FBSyxpQkFBTCxFQUE3QixDQUFYLEdBQXFFLEtBQUssV0FBTCxDQUFpQixTQUFqQixDQUh0QjtpQkFBOUQ7QUFLQSxvQkFBSSxTQUFVLENBQUMsS0FBSyxXQUFMLENBQWlCLG1CQUFqQixLQUF5QyxDQUF6QyxDQUFELEdBQStDLEtBQUssV0FBTCxDQUFpQixTQUFqQixJQUErQixTQUFTLFNBQVMsS0FBSyxTQUFMLENBQWUsT0FBZixDQUF1QixLQUF2QixDQUE2QixNQUE3QixDQUFsQixFQUF3RDtBQUNsSix1QkFBSyxjQUFMLENBQW9CLENBQUMsR0FBRCxDQUFwQixFQUEyQixDQUEzQixFQUE4QixFQUFFLElBQUMsQ0FBSyxXQUFMLENBQWlCLFNBQWpCLEdBQTZCLENBQTdCLEdBQW1DLEtBQUssV0FBTCxDQUFpQixTQUFqQixHQUE2QixFQUE3QixDQUF0QyxDQUE5QixDQURrSjtpQkFBcEo7ZUFWRixNQWNPO0FBQ0wscUJBQUssY0FBTCxHQUFzQixJQUF0QixDQURLOztBQUlMLG9CQUFJLFNBQVcsbUJBQW1CLEtBQUssYUFBTCxFQUFzQjtBQUN0RCwyQkFBUyxJQUFULENBRHNEO0FBRXRELGdDQUFjLFNBQVUsS0FBSyxXQUFMLENBQWlCLFNBQWpCLEdBQTZCLEtBQUssaUJBQUwsRUFBN0IsQ0FGOEI7QUFHdEQsK0JBQWEsQ0FBQyxTQUFVLEtBQUssV0FBTCxDQUFpQixTQUFqQixHQUE2QixLQUFLLGlCQUFMLEVBQTdCLENBQVgsR0FBcUUsS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBSDVCO2lCQUF4RDtlQWxCRjs7QUEyQkEsa0JBQUksV0FBVyxJQUFYLElBQW1CLGNBQWMsQ0FBZCxJQUFtQixjQUFjLEtBQUssV0FBTCxDQUFpQixtQkFBakIsS0FBeUMsQ0FBekMsRUFBNEM7QUFFbEcscUJBQUssY0FBTCxDQUFvQixDQUFDLEdBQUQsQ0FBcEIsRUFBMkIsQ0FBM0IsRUFBOEIsV0FBOUIsRUFGa0c7QUFHbEcscUJBQUssZUFBTCxDQUFxQixVQUFyQixFQUFpQyxHQUFqQyxFQUFzQyxZQUF0QyxFQUFvRCxLQUFwRCxFQUhrRztlQUFwRzthQWpDRjtBQXdDQSxpQkFBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixDQUNFLFVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0I7QUFDZCxxQkFBTyxTQUFTLEVBQUUsR0FBRixDQUFULEdBQWtCLFNBQVMsRUFBRSxHQUFGLENBQTNCLENBRE87YUFBaEIsQ0FERixDQTdDa0M7V0FBcEMsTUFpRE87QUFFTCxpQkFBSyxvQkFBTCxHQUZLO1dBakRQOzs7QUFya0JTLGlDQWlvQlgsbUZBQXFDO0FBQ25DLGNBQUksYUFBYSxTQUFVLEtBQUssVUFBTCxDQUFnQixhQUFoQixHQUFnQyxLQUFLLFdBQUwsQ0FBaUIsU0FBakIsRUFBNkIsRUFBdkUsQ0FBYixDQUQrQjtBQUVuQyxlQUFLLFVBQUwsQ0FBZ0IsUUFBaEIsR0FBMkIsYUFBYSxLQUFLLFdBQUwsQ0FBaUIsU0FBakIsQ0FGTDtBQUduQyxlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLGlCQUFMLEVBQUosRUFBOEIsR0FBOUMsRUFBbUQ7QUFDakQsZ0JBQUksTUFBTSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLENBQXpCLENBQU4sQ0FENkM7QUFFakQsZ0JBQUksU0FBUyxTQUFTLElBQUksR0FBSixFQUFTLEVBQWxCLENBQVQsQ0FGNkM7QUFHakQsZ0JBQUksU0FBVSxDQUFDLEtBQUssV0FBTCxDQUFpQixtQkFBakIsS0FBeUMsQ0FBekMsQ0FBRCxHQUErQyxLQUFLLFdBQUwsQ0FBaUIsU0FBakIsSUFBK0IsU0FBVSxTQUFTLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsS0FBdkIsQ0FBNkIsTUFBN0IsQ0FBVCxHQUFnRCxLQUFLLFdBQUwsQ0FBaUIsU0FBakIsRUFBNkI7QUFDakwsbUJBQUssY0FBTCxDQUFvQixDQUFDLEdBQUQsQ0FBcEIsRUFBMkIsQ0FBM0IsRUFBOEIsQ0FBQyxJQUFELEdBQVEsQ0FBUixDQUE5QixDQURpTDthQUFuTDtXQUhGOztBQVFBLGVBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsSUFBekIsQ0FDRSxVQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCO0FBQ2QsbUJBQU8sU0FBUyxFQUFFLEdBQUYsQ0FBVCxHQUFrQixTQUFTLEVBQUUsR0FBRixDQUEzQixDQURPO1dBQWhCLENBREYsQ0FYbUM7OztBQWpvQjFCLGlDQXNwQlgsdURBQXVCOzs7QUFFckIsZUFBSyxVQUFMLENBQWdCLElBQWhCLEdBQXVCLElBQXZCLENBRnFCOztBQUtyQixjQUFJLFVBQVUsS0FBSyxXQUFMLENBQWlCLGVBQWpCLENBTE87O0FBUXJCLHVCQUFhLEtBQUssVUFBTCxDQUFnQixLQUFoQixDQUFiLENBUnFCOztBQVdyQixlQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsR0FBd0IsV0FBVyxZQUFNO0FBQ3ZDLG1CQUFLLHNCQUFMLEdBRHVDO0FBRXZDLG1CQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsR0FBdUIsS0FBdkIsQ0FGdUM7V0FBTixFQUdoQyxPQUhxQixDQUF4QixDQVhxQjs7O0FBdHBCWixpQ0E2cUJYLCtCQUFXOzs7QUFHVCxjQUFJLFdBQVcsU0FBWCxRQUFXLEdBQU07QUFDbkIsZ0JBQUksbUJBQW1CLE9BQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsU0FBdkIsQ0FESjtBQUVuQixnQkFBSSxvQkFBb0IsT0FBSyxTQUFMLENBQWUsT0FBZixDQUF1QixVQUF2QixDQUZMOztBQUtuQixnQkFBSSxxQkFBcUIsT0FBSyxVQUFMLENBQWdCLGFBQWhCLEVBQStCO0FBSXRELGtCQUFJLHNCQUFzQixDQUF0QixFQUF5QjtBQUMzQix1QkFBSyxTQUFMLENBQWUsT0FBZixDQUF1QixVQUF2QixHQUFvQyxPQUFLLFVBQUwsQ0FBZ0IsY0FBaEIsQ0FEVDtBQUUzQix1QkFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixVQUF0QixHQUFtQyxPQUFLLFVBQUwsQ0FBZ0IsY0FBaEIsQ0FGUjtlQUE3Qjs7QUFNQSxrQkFBSSxlQUFlLElBQWYsQ0FWa0Q7QUFXdEQsa0JBQUksbUJBQW1CLE9BQUssVUFBTCxDQUFnQixhQUFoQixFQUErQjtBQUNwRCwrQkFBZSxLQUFmLENBRG9EO2VBQXREOztBQUtBLGtCQUFJLGFBQUosQ0FoQnNEO0FBaUJ0RCxzQkFBUSxJQUFSO0FBQ0UscUJBQUssbUJBQW1CLE9BQUssVUFBTCxDQUFnQixhQUFoQixHQUFnQyxPQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLENBRDFEO0FBRUUscUJBQUssbUJBQW1CLE9BQUssVUFBTCxDQUFnQixhQUFoQixHQUFnQyxPQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCO0FBQ3RELGtDQUFnQixJQUFoQixDQURGO0FBRUUsd0JBRkY7QUFGRjtBQU1JLGtDQUFnQixLQUFoQixDQURGO0FBTEYsZUFqQnNEOztBQTJCdEQscUJBQUssVUFBTCxDQUFnQixhQUFoQixHQUFnQyxnQkFBaEMsQ0EzQnNEOztBQThCdEQsa0JBQUksYUFBSixFQUFtQjtBQUVqQixvQkFBSSxPQUFLLFdBQUwsQ0FBaUIsdUJBQWpCLEVBQTBDO0FBQzVDLHlCQUFLLHNCQUFMLENBQTRCLFlBQTVCLEVBQTBDLGdCQUExQyxFQUQ0QztpQkFBOUMsTUFFTztBQUNMLHlCQUFLLG9CQUFMLEdBREs7aUJBRlA7ZUFGRixNQU9PO0FBQ0wsdUJBQUssaUJBQUwsQ0FBdUIsWUFBdkIsRUFBcUMsZ0JBQXJDLEVBREs7ZUFQUDthQTlCRixNQXdDTzs7QUFFTCxrQkFBSSxPQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLEtBQXZCLENBQTZCLFNBQTdCLEtBQTJDLFFBQTNDLEVBQXFEO0FBRXZELHVCQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLFVBQXZCLEdBQW9DLENBQXBDLENBRnVEO0FBR3ZELHVCQUFLLFVBQUwsQ0FBZ0IsY0FBaEIsR0FBaUMsQ0FBakMsQ0FIdUQ7QUFJdkQsdUJBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsVUFBdEIsR0FBbUMsQ0FBbkMsQ0FKdUQ7ZUFBekQsTUFLTztBQUNMLG9CQUFJLE9BQUssVUFBTCxDQUFnQixjQUFoQixLQUFtQyxpQkFBbkMsRUFBc0Q7QUFDeEQsc0NBQW9CLE9BQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsVUFBdkIsQ0FEb0M7QUFFeEQseUJBQUssVUFBTCxDQUFnQixjQUFoQixHQUFpQyxpQkFBakMsQ0FGd0Q7QUFHeEQseUJBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsVUFBdEIsR0FBbUMsaUJBQW5DLENBSHdEO2lCQUExRDtlQU5GO2FBMUNGO1dBTGEsQ0FITjtBQWtFVCx1QkFBYSxLQUFLLFVBQUwsQ0FBZ0IsbUJBQWhCLENBQWIsQ0FsRVM7QUFtRVQsY0FBSSxLQUFLLFdBQUwsQ0FBaUIscUJBQWpCLEVBQXdDO0FBQzFDLGtDQUFzQixZQUFNO0FBQzFCLHlCQUQwQjthQUFOLENBQXRCLENBRDBDO1dBQTVDLE1BSU87QUFDTCx1QkFESztXQUpQOzs7QUFodkJTLGlDQSt2QlgsdURBQXVCOztBQUVyQixjQUFJLG1CQUFtQixLQUFLLFdBQUwsQ0FBaUIsbUJBQWpCLEtBQXlDLEtBQUssV0FBTCxDQUFpQixTQUFqQixHQUE4QixLQUFLLFdBQUwsQ0FBaUIsU0FBakIsR0FBNkIsQ0FBN0IsQ0FGekU7QUFHckIsY0FBSSxhQUFhLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsWUFBdkIsQ0FISTs7O0FBTXJCLGNBQUksb0JBQW9CLFVBQXBCLEVBQWdDO0FBQ2xDLGlCQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLFNBQXZCLEdBQW1DLENBQW5DLENBRGtDOztBQUdsQyxpQkFBSyxTQUFMLENBQWUsT0FBZixDQUF1QixLQUF2QixDQUE2QixRQUE3QixHQUF3QyxFQUF4QyxDQUhrQztBQUlsQyxpQkFBSyxTQUFMLENBQWUsT0FBZixDQUF1QixLQUF2QixDQUE2QixTQUE3QixHQUF5QyxRQUF6QyxDQUprQztBQUtsQyxpQkFBSyxTQUFMLENBQWUsT0FBZixDQUF1QixLQUF2QixDQUE2QixTQUE3QixHQUF5QyxRQUF6QyxDQUxrQztBQU1sQyxpQkFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixLQUF0QixDQUE0QixTQUE1QixHQUF3QyxRQUF4QyxDQU5rQztXQUFwQyxNQVFPO0FBRUwsaUJBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsS0FBdkIsQ0FBNkIsUUFBN0IsR0FBd0MsRUFBeEMsQ0FGSztBQUdMLGlCQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLEtBQXZCLENBQTZCLFNBQTdCLEdBQXlDLFFBQXpDLENBSEs7QUFJTCxpQkFBSyxTQUFMLENBQWUsT0FBZixDQUF1QixLQUF2QixDQUE2QixTQUE3QixHQUF5QyxRQUF6QyxDQUpLO0FBS0wsaUJBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsS0FBdEIsQ0FBNEIsU0FBNUIsR0FBd0MsUUFBeEMsQ0FMSztXQVJQOztBQWlCQSxjQUFJLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsV0FBdkIsR0FBcUMsQ0FBckMsR0FBeUMsS0FBSyxtQkFBTCxFQUF6QyxFQUFxRTtBQUN2RSxpQkFBSyxTQUFMLENBQWUsT0FBZixDQUF1QixLQUF2QixDQUE2QixTQUE3QixHQUF5QyxRQUF6QyxDQUR1RTtXQUF6RTs7O0FBdHhCUyxpQ0FneUJYLHVFQUErQjs7O0FBRzdCLGNBQUksS0FBSyxXQUFMLENBQWlCLGlCQUFqQixFQUFvQztBQUN0QyxnQkFBSSxlQUFlLFNBQWYsWUFBZSxDQUFDLEtBQUQsRUFBVztBQUM1QixxQkFBSyxXQUFMLENBQWlCLFNBQWpCLENBQTJCLEtBQTNCLEVBQWtDLFVBQUMsU0FBRCxFQUFlO0FBQy9DLHVCQUFLLFNBQUwsR0FBaUIsU0FBakIsQ0FEK0M7QUFFL0MsdUJBQUsscUJBQUwsR0FGK0M7ZUFBZixDQUFsQyxDQUQ0QjthQUFYLENBRG1COztBQVN0QyxnQkFBSSxVQUFVLEtBQUssWUFBTCxDQUFrQixnQkFBbEIsQ0FBbUMsTUFBTSxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckIsQ0FBbkQsQ0FUa0M7QUFVdEMsaUJBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLFFBQVEsTUFBUixFQUFnQixHQUFwQyxFQUF5QztBQUN2QyxzQkFBUSxDQUFSLEVBQVcsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsYUFBYSxJQUFiLENBQWtCLElBQWxCLENBQXJDLEVBQThELEtBQTlELEVBRHVDO2FBQXpDO1dBVkY7O0FBZ0JBLGNBQUksS0FBSyxXQUFMLENBQWlCLGtCQUFqQixFQUFxQztBQUN2QyxpQkFBSyxjQUFMLENBQW9CLElBQXBCLEdBRHVDO1dBQXpDOztBQUtBLGNBQUksS0FBSyxXQUFMLENBQWlCLGdCQUFqQixFQUFtQztBQUNyQyxpQkFBSyxhQUFMLENBQW1CLElBQW5CLEdBRHFDO1dBQXZDOzs7QUF4ekJTLGlDQW0wQlgsaUNBQVk7OztBQUlWLGNBQUksY0FBYyxTQUFkLFdBQWMsQ0FBQyxDQUFELEVBQU87QUFDdkIsZ0JBQUksYUFBYSxTQUFTLEVBQUUsYUFBRixDQUFnQixZQUFoQixDQUE2QixLQUE3QixDQUFULENBQWIsQ0FEbUI7QUFFdkIsbUJBQUssV0FBTCxDQUFpQixZQUFqQixDQUE4QixDQUE5QixFQUFpQyxVQUFqQyxFQUZ1QjtBQUd2QixnQkFBSSxPQUFLLFdBQUwsQ0FBaUIsYUFBakIsS0FBbUMsU0FBbkMsRUFBOEM7QUFDaEQscUJBQUssY0FBTCxDQUFvQixhQUFwQixDQUFrQyxDQUFsQyxFQUFxQyxVQUFyQyxVQURnRDthQUFsRDtXQUhnQixDQUpSOztBQVlWLGNBQUksZ0JBQWdCLFNBQWhCLGFBQWdCLENBQUMsQ0FBRCxFQUFPO0FBQ3pCLGdCQUFJLGFBQWEsU0FBUyxFQUFFLGFBQUYsQ0FBZ0IsWUFBaEIsQ0FBNkIsS0FBN0IsQ0FBVCxDQUFiLENBRHFCO0FBRXpCLG1CQUFLLFdBQUwsQ0FBaUIsWUFBakIsQ0FBOEIsQ0FBOUIsRUFBaUMsVUFBakMsRUFGeUI7QUFHekIsZ0JBQUksT0FBSyxXQUFMLENBQWlCLGFBQWpCLEtBQW1DLFNBQW5DLEVBQThDO0FBQ2hELHFCQUFLLGNBQUwsQ0FBb0IsYUFBcEIsQ0FBa0MsQ0FBbEMsRUFBcUMsVUFBckMsVUFEZ0Q7YUFBbEQ7V0FIa0IsQ0FaVjs7QUF1QlYsY0FBSSxpQkFBaUIsU0FBakIsY0FBaUIsQ0FBQyxDQUFELEVBQU87QUFDMUIsZ0JBQUksYUFBYSxTQUFTLEVBQUUsYUFBRixDQUFnQixZQUFoQixDQUE2QixLQUE3QixDQUFULENBQWIsQ0FEc0I7QUFFMUIsbUJBQUssV0FBTCxDQUFpQixZQUFqQixDQUE4QixDQUE5QixFQUFpQyxVQUFqQyxFQUYwQjtXQUFQLENBdkJYOztBQStCVixjQUFJLGlCQUFpQixTQUFqQixjQUFpQixDQUFDLENBQUQsRUFBTztBQUUxQixnQkFBSSxFQUFFLE1BQUYsS0FBYSxDQUFiLEVBQWdCLEVBQXBCO1dBRm1CLENBL0JYOztBQXlDVixlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLGlCQUFMLEVBQUosRUFBOEIsR0FBOUMsRUFBbUQ7QUFDakQsZ0JBQUksTUFBTSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLENBQXpCLEVBQTRCLEdBQTVCLENBRHVDOztBQUdqRCxnQkFBSSxnQkFBSixDQUFxQixVQUFyQixFQUFpQyxlQUFlLElBQWYsQ0FBb0IsSUFBcEIsQ0FBakMsRUFBNEQsS0FBNUQsRUFIaUQ7QUFJakQsZ0JBQUksZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsWUFBWSxJQUFaLENBQWlCLElBQWpCLENBQTlCLEVBQXNELEtBQXRELEVBSmlEO0FBS2pELGdCQUFJLGdCQUFKLENBQXFCLFNBQXJCLEVBQWdDLGNBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFoQyxFQUEwRCxLQUExRCxFQUxpRDtBQU1qRCxnQkFBSSxnQkFBSixDQUFxQixhQUFyQixFQUFvQyxlQUFlLElBQWYsQ0FBb0IsSUFBcEIsQ0FBcEMsRUFBK0QsS0FBL0QsRUFOaUQ7V0FBbkQ7O0FBVUEsZUFBSyxTQUFMLENBQWUsT0FBZixDQUF1QixnQkFBdkIsQ0FBd0MsUUFBeEMsRUFBa0QsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFsRCxFQW5EVTs7QUFxRFYsZUFBSyw0QkFBTCxHQXJEVTs7O0FBbjBCRCxpQ0FpNEJYLCtEQUEyQjtBQUN6QixjQUFJLGlCQUFpQixFQUFqQixDQURxQjtBQUV6QixlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLFdBQUwsQ0FBaUIsY0FBakIsQ0FBZ0MsTUFBaEMsRUFBd0MsR0FBNUQsRUFBaUU7QUFDL0QsZ0JBQUksY0FBYyxLQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLENBQWxDLEtBQXdDLEdBQXhDLENBRDZDO0FBRS9ELDJCQUFlLElBQWYsQ0FBb0IsV0FBcEIsRUFGK0Q7V0FBakU7QUFJQSxlQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLEdBQW9DLGNBQXBDLENBTnlCOzs7QUFqNEJoQixpQ0E4NEJYLHFEQUFzQjtBQUNwQixjQUFJLENBQUMsS0FBSyxXQUFMLENBQWlCLGdCQUFqQixFQUFtQztBQUN0QyxpQkFBSyxXQUFMLENBQWlCLGdCQUFqQixHQUFvQyxLQUFLLGFBQUwsR0FBcUIsR0FBckIsQ0FERTtBQUV0QyxhQUZzQztXQUF4Qzs7O0FBLzRCUyxpQ0F5NUJYLDZCQUFVO0FBR1IsZUFBSyxxQkFBTCxHQUhRO0FBSVIsZUFBSywyQkFBTCxHQUpRO0FBS1IsZUFBSyw0QkFBTCxHQUxRO0FBTVIsZUFBSywyQkFBTCxHQU5RO0FBT1IsZUFBSywrQkFBTCxHQVBRO0FBUVIsZUFBSyx3QkFBTCxHQVJRO0FBWVIsZUFBSyxvQkFBTCxHQVpROzs7QUF6NUJDLGlDQTI2QlgsNkNBQWtCOztBQUVoQixjQUFJLE9BQU8sS0FBSyxTQUFMLENBQWUsU0FBZixDQUZLO0FBR2hCLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssTUFBTCxFQUFhLEdBQWpDLEVBQXNDO0FBQ3BDLGdCQUFJLGNBQWMsS0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixPQUF4QixDQUFnQyxlQUFlLEtBQUssY0FBTCxDQUFvQixLQUFLLFdBQUwsQ0FBaUIsY0FBakIsQ0FBbkMsR0FBc0UsYUFBdEUsRUFBcUYsS0FBSyxLQUFMLENBQVcsU0FBWCxDQUFuSSxDQURnQztBQUVwQyxnQkFBSSxPQUFPLFlBQVksTUFBWixDQUFtQixLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQTFCLENBRmdDO0FBR3BDLGlCQUFLLENBQUwsRUFBUSxRQUFSLEdBQW1CLElBQUksUUFBSixDQUFhLEtBQUssQ0FBTCxFQUFRLEdBQVIsRUFBYSxJQUExQixDQUFuQixDQUhvQztBQUlwQyxpQkFBSyxDQUFMLEVBQVEsUUFBUixDQUFpQixHQUFqQixDQUFxQixJQUFyQixFQUpvQztBQUtwQyxnQkFBSSxpQkFBaUIsRUFBakIsQ0FMZ0M7QUFNcEMsaUJBQUssQ0FBTCxFQUFRLFFBQVIsQ0FBaUIsSUFBakIsQ0FBc0IsY0FBdEIsRUFOb0M7QUFPcEMsaUJBQUssQ0FBTCxFQUFRLFFBQVIsQ0FBaUIsUUFBakIsR0FQb0M7V0FBdEM7OztBQTk2QlMsaUNBODdCWCxpREFBb0I7QUFDbEIsY0FBSSxPQUFPLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FETztBQUVsQixlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLE1BQUwsRUFBYSxHQUFqQyxFQUFzQztBQUNwQyxpQkFBSyxDQUFMLEVBQVEsUUFBUixDQUFpQixNQUFqQixHQURvQztBQUVwQyxpQkFBSyxDQUFMLEVBQVEsUUFBUixDQUFpQixRQUFqQixHQUZvQztBQUdwQyxpQkFBSyxDQUFMLEVBQVEsUUFBUixDQUFpQixTQUFqQixHQUhvQztBQUlwQyxpQkFBSyxDQUFMLEVBQVEsUUFBUixHQUFtQixJQUFuQixDQUpvQztBQUtwQyxpQkFBSyxDQUFMLEVBQVEsR0FBUixDQUFZLFNBQVosR0FBd0IsRUFBeEIsQ0FMb0M7QUFNcEMsaUJBQUssU0FBTCxDQUFlLFdBQWYsR0FBNkIsSUFBN0IsQ0FOb0M7QUFPcEMsZ0JBQUksY0FBYyxLQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLE9BQXhCLENBQWdDLGVBQWUsS0FBSyxjQUFMLENBQW9CLEtBQUssV0FBTCxDQUFpQixjQUFqQixDQUFuQyxHQUFzRSxhQUF0RSxFQUFxRixLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQW5JLENBUGdDO0FBUXBDLGdCQUFJLE9BQU8sWUFBWSxNQUFaLENBQW1CLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBMUIsQ0FSZ0M7QUFTcEMsaUJBQUssQ0FBTCxFQUFRLFFBQVIsR0FBbUIsSUFBSSxRQUFKLENBQWEsS0FBSyxDQUFMLEVBQVEsR0FBUixFQUFhLElBQTFCLENBQW5CLENBVG9DO0FBVXBDLGlCQUFLLENBQUwsRUFBUSxRQUFSLENBQWlCLEdBQWpCLENBQXFCLElBQXJCLEVBVm9DO0FBV3BDLGdCQUFJLGlCQUFpQixFQUFqQixDQVhnQztBQVlwQyxpQkFBSyxDQUFMLEVBQVEsUUFBUixDQUFpQixJQUFqQixDQUFzQixjQUF0QixFQVpvQztBQWFwQyxpQkFBSyxDQUFMLEVBQVEsUUFBUixDQUFpQixRQUFqQixHQWJvQztXQUF0Qzs7O0FBaDhCUyxpQ0FxOUJYLHFCQUFLLFdBQVc7QUFDZCxlQUFLLHdCQUFMLEdBRGM7QUFFZCxlQUFLLE9BQUwsR0FGYztBQUdkLGVBQUssU0FBTCxHQUhjO0FBSWQsY0FBSSxDQUFDLFNBQUQsRUFBWTtBQUVkLGlCQUFLLGNBQUwsQ0FBb0IsT0FBcEIsQ0FBNEIsS0FBSyxXQUFMLENBQWlCLGFBQWpCLENBQTVCLENBRmM7V0FBaEI7QUFJQSxlQUFLLGVBQUwsR0FSYztBQVNkLGVBQUssY0FBTCxDQUFvQixLQUFwQixFQVRjO0FBVWQsZUFBSyxtQkFBTCxHQVZjOzs7QUFyOUJMLGlDQXMrQlgsbUNBQWE7QUFDWCxlQUFLLFlBQUwsQ0FBa0Isc0JBQWxCLENBQXlDLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixPQUFyQixDQUF6QyxDQUF1RSxDQUF2RSxFQUEwRSxNQUExRSxHQURXO0FBRVgsZUFBSyxTQUFMLENBQWUsU0FBZixHQUEyQixFQUEzQixDQUZXO0FBR1gsZUFBSyxTQUFMLENBQWUsTUFBZixHQUF3QixJQUF4QixDQUhXO0FBSVgsZUFBSyxTQUFMLENBQWUsT0FBZixHQUF5QixJQUF6QixDQUpXO0FBS1gsZUFBSyxTQUFMLENBQWUsTUFBZixHQUF3QixJQUF4QixDQUxXO0FBTVgsZUFBSyxTQUFMLENBQWUsVUFBZixHQUE0QixJQUE1QixDQU5XO0FBT1gsZUFBSyxTQUFMLENBQWUsV0FBZixHQUE2QixJQUE3QixDQVBXOztBQVNYLGVBQUssSUFBTCxDQUFVLElBQVYsRUFUVztBQVVYLGVBQUssaUJBQUwsR0FWVzs7O0FBdCtCRixpQ0F3L0JYLGlEQUFvQjtBQUNsQixjQUFJLG9CQUFvQixLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLFVBQXZCLENBRE47QUFFbEIsZUFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixVQUF0QixHQUFtQyxpQkFBbkMsQ0FGa0I7OztBQXgvQlQsaUNBaWdDWCwyQ0FBaUI7QUFDZixlQUFLLHdCQUFMLEdBRGU7QUFFZixlQUFLLHFCQUFMLEdBRmU7QUFHZixlQUFLLGlCQUFMLEdBSGU7QUFJZixlQUFLLGNBQUwsQ0FBb0IsSUFBcEIsRUFKZTtBQUtmLGVBQUssNEJBQUwsR0FMZTtBQU1mLGVBQUssd0JBQUwsR0FOZTtBQU9mLGVBQUssb0JBQUwsR0FQZTtBQVFmLGVBQUssaUJBQUwsR0FSZTs7O0FBamdDTixpQ0FnaENYLG1EQUFxQjtBQUNuQixlQUFLLGlCQUFMLEdBRG1CO0FBRW5CLGVBQUssY0FBTCxDQUFvQixJQUFwQixFQUZtQjtBQUduQixlQUFLLHdCQUFMLEdBSG1CO0FBSW5CLGVBQUssaUJBQUwsR0FKbUI7OztBQWhoQ1YsaUNBNGhDWCwrREFBMEIsa0JBQWtCO0FBQzFDLGVBQUssd0JBQUwsR0FEMEM7QUFFMUMsZUFBSyxxQkFBTCxHQUYwQztBQUcxQyxlQUFLLGlCQUFMLEdBSDBDO0FBSTFDLGVBQUssY0FBTCxDQUFvQixJQUFwQixFQUowQztBQUsxQyxlQUFLLHdCQUFMLEdBTDBDO0FBTTFDLGVBQUssZ0JBQUwsQ0FBc0IsZ0JBQXRCLEVBTjBDOzs7QUE1aENqQyxpQ0F5aUNYLDZDQUFpQixrQkFBa0IsY0FBYzs7QUFHL0MsY0FBSSxLQUFLLGtCQUFMLEVBQXlCO0FBRTNCLDJCQUFlLElBQWYsQ0FGMkI7QUFHM0IsaUJBQUssa0JBQUwsR0FBMEIsS0FBMUIsQ0FIMkI7V0FBN0I7O0FBT0EsZUFBSyx3QkFBTCxHQVYrQztBQVcvQyxlQUFLLFNBQUwsQ0FBZSxVQUFmLENBQTBCLEtBQTFCLENBQWdDLE1BQWhDLEdBQXlDLEtBQUssZ0JBQUwsR0FBd0IsSUFBeEIsQ0FYTTtBQVkvQyxjQUFJLFFBQVEsS0FBUixDQVoyQztBQWEvQyxjQUFJLHFCQUFxQixJQUFyQixFQUEyQjtBQUM3QixpQkFBSyxTQUFMLENBQWUsT0FBZixDQUF1QixTQUF2QixHQUFtQyxDQUFuQyxDQUQ2QjtXQUEvQjtBQUdBLGNBQUksS0FBSyxnQkFBTCxHQUF3QixLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLFNBQXZCLElBQW9DLFlBQTVELEVBQTBFO0FBQzVFLGdCQUFJLG1CQUFtQixLQUFLLFdBQUwsQ0FBaUIsbUJBQWpCLEVBQW5CLENBRHdFO0FBRTVFLGdCQUFJLGNBQWMsU0FBUyxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLFlBQXZCLEdBQXNDLEtBQUssV0FBTCxDQUFpQixTQUFqQixDQUE3RCxDQUZ3RTtBQUc1RSxnQkFBSSxxQkFBcUIsY0FBYyxLQUFLLFdBQUwsQ0FBaUIsU0FBakIsQ0FIcUM7QUFJNUUsaUJBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsU0FBdkIsR0FBb0MsZ0JBQUMsR0FBbUIsS0FBSyxXQUFMLENBQWlCLFNBQWpCLEdBQStCLGtCQUFuRCxDQUp3QztXQUE5RTs7QUFVQSxlQUFLLG9CQUFMLEdBMUIrQztBQTJCL0MsZUFBSyw0QkFBTCxHQTNCK0M7QUE0Qi9DLGVBQUssd0JBQUwsR0E1QitDO0FBNkIvQyxlQUFLLGlCQUFMLEdBN0IrQztBQThCL0MsZUFBSyxzQkFBTCxHQTlCK0M7QUErQi9DLGVBQUssY0FBTCxDQUFvQixJQUFwQixFQS9CK0M7QUFnQy9DLGNBQUksWUFBSixFQUFrQjtBQUNoQixpQkFBSyxTQUFMLENBQWUsT0FBZixDQUF1QixTQUF2QixHQUFtQyxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLFNBQXZCLEdBQW1DLEtBQUssV0FBTCxDQUFpQixTQUFqQixDQUR0RDtXQUFsQjs7QUFJQSxlQUFLLFNBQUwsQ0FBZSxVQUFmLENBQTBCLEtBQTFCLENBQWdDLE1BQWhDLEdBQXlDLEtBQUssZ0JBQUwsR0FBd0IsQ0FBeEIsR0FBNEIsSUFBNUIsQ0FwQ007OztBQXppQ3RDLGlDQXFsQ1gsaUNBQVcsVUFBVTtBQUVuQixlQUFLLFdBQUwsQ0FBaUIsV0FBakIsR0FBK0IsU0FBUyxXQUFULENBRlo7QUFHbkIsZUFBSyxXQUFMLENBQWlCLGNBQWpCLEdBQWtDLFNBQVMsY0FBVCxDQUhmO0FBSW5CLGVBQUssV0FBTCxDQUFpQixnQkFBakIsR0FBb0MsU0FBUyxnQkFBVCxDQUpqQjtBQUtuQixlQUFLLFdBQUwsQ0FBaUIsV0FBakIsR0FBK0IsU0FBUyxXQUFULENBTFo7QUFNbkIsZUFBSyxXQUFMLENBQWlCLGFBQWpCLEdBQWlDLFNBQVMsYUFBVCxDQU5kO0FBT25CLGVBQUssV0FBTCxDQUFpQixhQUFqQixHQUFpQyxTQUFTLGFBQVQsQ0FQZDtBQVFuQixlQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsU0FBUyxZQUFULENBUmI7OztBQXJsQ1YsaUNBaW1DWCxtQ0FBYTtBQUVYLGlCQUFPO0FBQ0wsMkJBQWUsS0FBSyxXQUFMLENBQWlCLFdBQWpCO0FBQ2YsOEJBQWtCLEtBQUssV0FBTCxDQUFpQixjQUFqQjtBQUNsQixnQ0FBb0IsS0FBSyxXQUFMLENBQWlCLGdCQUFqQjtBQUNwQiwyQkFBZSxLQUFLLFdBQUwsQ0FBaUIsV0FBakI7QUFDZiw2QkFBaUIsS0FBSyxXQUFMLENBQWlCLGFBQWpCO0FBQ2pCLDZCQUFpQixLQUFLLFdBQUwsQ0FBaUIsYUFBakI7QUFDakIsNEJBQWdCLEtBQUssV0FBTCxDQUFpQixZQUFqQjtXQVBsQixDQUZXOzs7QUFqbUNGLGlDQSttQ1gsNkNBQWtCO0FBQ2hCLGlCQUFPLEtBQUssY0FBTCxDQUFvQixlQUFwQixFQUFQLENBRGdCOzs7QUEvbUNQLGlDQW9uQ1gsMkNBQWdCLEtBQUs7QUFDbkIsZUFBSyxjQUFMLENBQW9CLGVBQXBCLENBQW9DLEdBQXBDLEVBRG1CO0FBRW5CLGVBQUssd0JBQUwsR0FGbUI7OztBQXBuQ1YsaUNBMG5DWCx1Q0FBZTtBQUNiLGNBQUksbUJBQW1CLEtBQUssV0FBTCxDQUFpQixtQkFBakIsRUFBbkIsQ0FEUztBQUViLGVBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsU0FBdkIsR0FBbUMsbUJBQW1CLEtBQUssV0FBTCxDQUFpQixTQUFqQixDQUZ6Qzs7O0FBMW5DSixpQ0Fnb0NYLGlDQUFZO0FBQ1YsZUFBSyxTQUFMLENBQWUsT0FBZixDQUF1QixTQUF2QixHQUFtQyxDQUFuQyxDQURVOzs7QUFob0NELGlDQXFvQ1gscUNBQWEsUUFBUTtBQUNuQixlQUFLLFNBQUwsQ0FBZSxPQUFmLENBQXVCLFNBQXZCLEdBQW1DLE1BQW5DLENBRG1COzs7QUFyb0NWLGlDQTBvQ1gsK0NBQW1CO0FBQ2pCLGVBQUssa0JBQUwsR0FBMEIsSUFBMUIsQ0FEaUI7OztBQTFvQ1IsaUNBK29DWCx1Q0FBZTtBQUNiLGlCQUFPLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsU0FBdkIsQ0FETTs7O0FBL29DSixpQ0FvcENYLCtCQUFVLElBQUksT0FBTztBQUNuQixlQUFLLGVBQUwsQ0FBcUIsRUFBckIsRUFBeUIsS0FBekIsRUFEbUI7OztBQXBwQ1YsaUNBd3BDWCx5REFBd0I7QUFDdEIsZUFBSyxTQUFMLEdBQWlCLEVBQWpCLENBRHNCO0FBRXRCLGVBQUsscUJBQUwsR0FGc0I7OztBQXhwQ2IsaUNBNnBDWCxtREFBb0IsV0FBVztBQUM3QixlQUFLLFNBQUwsR0FBaUIsU0FBakIsQ0FENkI7QUFFN0IsZUFBSyxxQkFBTCxHQUY2Qjs7O0FBN3BDcEIsaUNBb3FDWCxxQ0FBYzs7O0FBQ1osY0FBSSxRQUFRLEVBQVIsQ0FEUTtBQUVaLGVBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLE9BQW5DLENBQTJDLFVBQUMsQ0FBRCxFQUFNO0FBQy9DLGtCQUFNLElBQU4sQ0FBVyxFQUFFLE9BQUssS0FBTCxDQUFXLFdBQVgsQ0FBYixFQUQrQztXQUFOLENBQTNDLENBRlk7QUFLWixpQkFBTyxLQUFQLENBTFk7OztBQXBxQ0gsaUNBa3JDWCxxQ0FBYSxXQUFXOzs7QUFHdEIsY0FBSSxjQUFjLFNBQWQsRUFBeUI7QUFDM0Isd0JBQVksRUFBWixDQUQyQjtXQUE3QjtBQUdBLGNBQUksVUFBVSxFQUFWLENBTmtCO0FBT3RCLGNBQUksT0FBTyxLQUFLLFdBQUwsRUFBUCxDQVBrQjtBQVF0QixjQUFJLGFBQWEsS0FBSyxXQUFMLENBQWlCLGNBQWpCLENBUks7O0FBV3RCLGNBQUksVUFBVSxTQUFWLE9BQVUsQ0FBQyxHQUFELEVBQVM7QUFDckIsc0JBQVUsVUFBVSxJQUFJLElBQUosQ0FBUyxHQUFULENBQVYsR0FBMEIsSUFBMUIsQ0FEVztXQUFULENBWFE7O0FBZ0J0QixrQkFBUSxVQUFSLEVBaEJzQjs7QUFtQnRCLGVBQUssT0FBTCxDQUFhLFVBQUMsR0FBRCxFQUFRO0FBQ25CLGdCQUFJLFVBQVUsRUFBVixDQURlO0FBRW5CLHVCQUFXLE9BQVgsQ0FBbUIsVUFBQyxHQUFELEVBQVE7QUFDekIsa0JBQUksVUFBVSxPQUFWLENBQWtCLEdBQWxCLE1BQTJCLENBQUMsQ0FBRCxFQUFJO0FBQ2pDLHdCQUFRLElBQVIsQ0FBYSxPQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLEdBQTNCLEVBQWdDLEdBQWhDLENBQWIsRUFEaUM7ZUFBbkM7YUFEaUIsQ0FBbkIsQ0FGbUI7QUFPbkIsb0JBQVEsT0FBUixFQVBtQjtXQUFSLENBQWIsQ0FuQnNCOztBQStCdEIsY0FBSSxlQUFlLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFmLENBL0JrQjtBQWdDdEIsdUJBQWEsWUFBYixDQUEwQixNQUExQixFQUFrQyxtQ0FBbUMsbUJBQW1CLE9BQW5CLENBQW5DLENBQWxDLENBaENzQjtBQWlDdEIsdUJBQWEsWUFBYixDQUEwQixVQUExQixFQUFzQyxjQUF0QyxFQWpDc0I7QUFrQ3RCLHVCQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsTUFBN0IsQ0FsQ3NCO0FBbUN0QixtQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixZQUExQixFQW5Dc0I7QUFvQ3RCLHVCQUFhLEtBQWIsR0FwQ3NCO0FBcUN0QixtQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixZQUExQixFQXJDc0I7OztxQkFsckNiOzs4QkFVUztBQUNsQixnQkFBRyxLQUFLLEtBQUwsRUFBVztBQUNaLHFCQUFPLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FESzthQUFkLE1BRU87QUFDTCxxQkFBTyxJQUFQLENBREs7YUFGUDs7Ozs4QkFPZTtBQUNmLGdCQUFHLEtBQUssS0FBTCxFQUFXO0FBQ1oscUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBWCxDQURLO2FBQWQsTUFFTztBQUNMLHFCQUFPLElBQVAsQ0FESzthQUZQOzs7OzhCQU9tQjtBQUNuQixnQkFBRyxLQUFLLEtBQUwsRUFBVztBQUNaLHFCQUFPLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FESzthQUFkLE1BRU87QUFDTCxxQkFBTyxJQUFQLENBREs7YUFGUDs7Ozs4QkFPZ0I7QUFDaEIsZ0JBQUcsS0FBSyxLQUFMLEVBQVc7QUFDWixxQkFBTyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBREs7YUFBZCxNQUVPO0FBQ0wscUJBQU8sSUFBUCxDQURLO2FBRlA7Ozs7OEJBT2lCO0FBQ2pCLGdCQUFHLEtBQUssS0FBTCxFQUFXO0FBQ1oscUJBQU8sS0FBSyxLQUFMLENBQVcsYUFBWCxDQURLO2FBQWQsTUFFTztBQUNMLHFCQUFPLElBQVAsQ0FESzthQUZQOzs7OzhCQU9rQjtBQUNsQixnQkFBRyxLQUFLLEtBQUwsRUFBVztBQUNaLHFCQUFPLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FESzthQUFkLE1BRU87QUFDTCxxQkFBTyxJQUFQLENBREs7YUFGUDs7OztlQW5EUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
