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
          for (var i = 0; i < this.vGridConfig.attributeArray.length; i++) {
            rowTemplate = rowTemplate + ("<v-grid-header-col v-grid-context-menu-header column-no=\"" + i + "\"></v-grid-header-col>");
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.getRowTemplate = function getRowTemplate() {
          var rowTemplate = "";
          if (this.htmlCache.rowTemplate !== null) {
            rowTemplate = this.htmlCache.rowTemplate;
          } else {
            for (var i = 0; i < this.vGridConfig.attributeArray.length; i++) {
              rowTemplate = rowTemplate + ("<v-grid-row-col v-grid-context-menu-cell column-no=" + i + "></v-grid-row-col>");
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

          var fixme = false;

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

            if (currentRowTop + this.vGridConfig.rowHeight === this.vGridConfig.getCollectionLength() * this.vGridConfig.rowHeight) {
              fixme = true;
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

          if (fixme) {
            this.htmlCache.content.scrollTop = this.htmlCache.content.scrollTop + this.vGridConfig.rowHeight;
            this.htmlCache.content.scrollTop = this.htmlCache.content.scrollTop - this.vGridConfig.rowHeight;
          }

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
          this.htmlCache.scrollBody.style.height = this.scrollBodyHeight + 1 + "px";
        };

        VGridGenerator.prototype.setColumns = function setColumns(paramObj) {
          this.vGridConfig.attributeArray = paramObj.attributeArray;
          this.vGridConfig.columnWidthArray = paramObj.columnWidthArray;
          this.vGridConfig.headerArray = paramObj.headerArray;
          this.vGridConfig.filterArray = paramObj.filterArray;
          this.vGridConfig.readOnlyArray = paramObj.readOnlyArray;
          this.vGridConfig.colStyleArray = paramObj.colStyleArray;
          this.vGridConfig.colTypeArray = paramObj.colTypeArray;
          this.vGridConfig.colFormaterArray = paramObj.colFormaterArray;
          this.vGridConfig.colEditRawArray = paramObj.colEditRawArray;
          this.vGridConfig.filterOnKeyArray = paramObj.filterOnKeyArray;
        };

        VGridGenerator.prototype.getColumns = function getColumns() {
          return {
            "attributeArray": this.vGridConfig.attributeArray.slice(),
            "columnWidthArray": this.vGridConfig.columnWidthArray.slice(),
            "headerArray": this.vGridConfig.headerArray.slice(),
            "filterArray": this.vGridConfig.filterArray.slice(),
            "readOnlyArray": this.vGridConfig.readOnlyArray.slice(),
            "colStyleArray": this.vGridConfig.colStyleArray.slice(),
            "colTypeArray": this.vGridConfig.colTypeArray.slice(),
            "colFormaterArray": this.vGridConfig.colFormaterArray.slice(),
            "colEditRawArray": this.vGridConfig.colEditRawArray.slice(),
            "filterOnKeyArray": this.vGridConfig.filterOnKeyArray.slice()
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

        VGridGenerator.prototype.setEditMode = function setEditMode(value) {
          this.vGridConfig.editMode = value ? true : false;
          this.fillDataInRows(true);
        };

        VGridGenerator.prototype.clearHeaderSortFilter = function clearHeaderSortFilter() {
          this.sortOrder = [];
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setHeaderSortFilter = function setHeaderSortFilter(sortOrder) {
          this.sortOrder = sortOrder;
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.createReport = function createReport(skipArray) {
          if (skipArray === undefined) {
            skipArray = [];
          }
          var content = '';
          var rows = this.vGrid.vGridCollectionFiltered;
          var attributes = this.vGridConfig.attributeArray;

          var setData = function setData(arr) {
            content = content + arr.join(';') + '\n';
          };

          setData(attributes);

          rows.forEach(function (row) {
            var tempArr = [];
            attributes.forEach(function (att) {
              if (skipArray.indexOf(att) === -1) {
                tempArr.push(row[att]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBV0s7QUFFWCxpQkFGVyxjQUVYLENBQVksS0FBWixFQUFtQjtnQ0FGUixnQkFFUTs7ZUE2RG5CLHdCQUF3QixHQTdETDtlQThEbkIsWUFBWSxHQTlETztlQStEbkIsZ0JBQWdCLEVBL0RHO2VBZ0VuQixhQUFhLEVBaEVNO2VBaUVuQixZQUFZLEVBakVPO2VBa0VuQixtQkFBbUIsR0FsRUE7ZUFtRW5CLG1CQUFtQixFQW5FQTtlQXNFbkIscUJBQXFCLE1BdEVGO2VBd0VuQixZQUFZO0FBQ1Ysa0JBQU0sSUFBTjtBQUNBLG9CQUFRLElBQVI7QUFDQSxxQkFBUyxJQUFUO0FBQ0Esb0JBQVEsSUFBUjtBQUNBLHVCQUFXLEVBQVg7QUFDQSx3QkFBWSxJQUFaO0FBQ0EseUJBQWEsSUFBYixHQS9FaUI7ZUFrRm5CLGFBQWE7QUFDWCwyQkFBZSxDQUFmO0FBQ0Esc0JBQVUsQ0FBVjtBQUNBLDRCQUFnQixDQUFoQjtBQUNBLGtCQUFNLEtBQU47QUFDQSxtQkFBTyxJQUFQO0FBQ0EsOEJBQWtCLEVBQWxCO0FBQ0EsaUNBQXFCLElBQXJCO1lBekZpQjtlQXdyQ25CLFlBQVksS0FBSyxjQUFMLENBeHJDTzs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQURpQjtTQUFuQjs7QUFGVyxpQ0FrR1gseUNBQWUsY0FBYztBQUMzQixlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLGlCQUFMLEVBQUosRUFBOEIsR0FBOUMsRUFBbUQ7QUFDakQsZ0JBQUksYUFBYSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLENBQXpCLEVBQTRCLEdBQTVCLEdBQWtDLEtBQUssV0FBTCxDQUFpQixTQUFqQixDQURGO0FBRWpELGdCQUFJLE1BQU0sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixDQUF6QixDQUFOLENB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TCxFQUFZO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBWCxDQURPO2FBQWhCLE1BRU87QUFDTCxxQkFBTyxJQUFQLENBREs7YUFGUDs7Ozs4QkFPb0I7QUFDcEIsZ0JBQUksS0FBSyxLQUFMLEVBQVk7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxlQUFYLENBRE87YUFBaEIsTUFFTztBQUNMLHFCQUFPLElBQVAsQ0FESzthQUZQOzs7OzhCQU9pQjtBQUNqQixnQkFBSSxLQUFLLEtBQUwsRUFBWTtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FETzthQUFoQixNQUVPO0FBQ0wscUJBQU8sSUFBUCxDQURLO2FBRlA7Ozs7OEJBT2tCO0FBQ2xCLGdCQUFJLEtBQUssS0FBTCxFQUFZO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsYUFBWCxDQURPO2FBQWhCLE1BRU87QUFDTCxxQkFBTyxJQUFQLENBREs7YUFGUDs7Ozs4QkFPbUI7QUFDbkIsZ0JBQUksS0FBSyxLQUFMLEVBQVk7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBRE87YUFBaEIsTUFFTztBQUNMLHFCQUFPLElBQVAsQ0FESzthQUZQOzs7O2VBbkRTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
