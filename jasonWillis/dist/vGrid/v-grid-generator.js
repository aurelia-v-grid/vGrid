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
            lastScrollLeft: 0,
            isScrollBarScrolling: false,
            timer: null,
            clickTimersArray: [],
            scrollCallbackTimer: null
          };
          this.selection = this.vGridSelection;

          this.vGrid = vGrid;
        }

        VGridGenerator.prototype.fillDataInRows = function fillDataInRows() {
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.rowHeight;
            var row = this.htmlCache.rowsArray[i];
            this.insertRowMarkup(currentRow, row, true, true);
          }
        };

        VGridGenerator.prototype.fillDataIntoRow = function fillDataIntoRow(rowno) {
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
            if (this.vGrid.vGridConfig.repeater) {
              return this.vGrid.vGridConfig.repeatTemplate;
            } else {
              for (var i = 0; i < this.vGridConfig.attributeArray.length; i++) {
                rowTemplate = rowTemplate + ("<v-grid-row-col v-grid-context-menu-cell column-no=" + i + "></v-grid-row-col>");
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
          this.headerViewSlot.bind(bindingContext, { bindingContext: bindingContext, parentOverrideContext: this.vGrid.overrideContext });
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
          this.headerViewSlot.bind(bindingContext, { bindingContext: bindingContext, parentOverrideContext: this.vGrid.overrideContext });
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

            if (entity !== "" && row.viewSlot !== null) {
              var bindingContext = {};
              for (var k in entity) {
                if (entity.hasOwnProperty(k)) {
                  if (bindingContext[k] !== entity[k]) {
                    bindingContext[k] = entity[k];
                  }
                }
              }
              bindingContext.currentEntityRef = _this.vGrid.vGridCollectionFiltered[rowNo];
              row.viewSlot.bind(bindingContext, { bindingContext: bindingContext, parentOverrideContext: _this.vGrid.overrideContext });

              if (_this.vGrid.vGridConfig.repeater) {
                if (entity === undefined) {
                  row.div.style.display = "none";
                } else {
                  row.div.style.display = "block";
                }
              }
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

          if (this.vGridConfig.getCollectionLength() <= this.htmlCache.rowsArray.length) {
            this.scrollVars.lastScrollTop = 0;
          }

          var rowHeight = this.vGridConfig.rowHeight;
          var bodyHeight = this.htmlCache.content.clientHeight;
          var currentRow = parseInt(this.scrollVars.lastScrollTop / rowHeight, 10);
          var firstRow = parseInt(this.htmlCache.content.scrollTop / rowHeight, 10);
          var currentRowTop = rowHeight * currentRow;
          var firstRowTop = rowHeight * firstRow;
          var collectionLength = this.vGridConfig.getCollectionLength();

          var setAfter = function setAfter(cacheRowNumber) {
            var row = _this2.htmlCache.rowsArray[cacheRowNumber];
            _this2.setRowTopValue([row], 0, currentRowTop);
            currentRowTop = currentRowTop + rowHeight;
          };

          var setBefore = function setBefore(cacheRowNumber) {
            var row = _this2.htmlCache.rowsArray[cacheRowNumber];
            firstRowTop = firstRowTop - rowHeight;
            _this2.setRowTopValue([row], 0, firstRowTop);
          };

          var setHiddenFromView = function setHiddenFromView(cacheRowNumber) {
            var row = _this2.htmlCache.rowsArray[cacheRowNumber];
            _this2.setRowTopValue([row], 0, -(currentRowTop + _this2.vGridConfig.rowHeight * 50));
          };

          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var moved = false;
            switch (true) {
              case currentRow >= 0 && currentRow <= collectionLength - 1:
                setAfter(i);
                moved = true;
                break;
              case currentRow >= collectionLength && collectionLength * rowHeight >= bodyHeight:
                setBefore(i);
                moved = true;
                break;
            }
            if (!moved) {
              if (currentRow >= collectionLength && currentRowTop - rowHeight >= bodyHeight) {
                setHiddenFromView(i);
              } else {
                if (currentRow >= collectionLength) {
                  setAfter(i);
                }
              }
            }

            currentRow++;
          }

          this.htmlCache.rowsArray.sort(function (a, b) {
            return parseInt(a.top) - parseInt(b.top);
          });

          this.fillDataInRows();
        };

        VGridGenerator.prototype.onNormalScrolling = function onNormalScrolling(isDownScroll, currentScrollTop) {
          var currentScrollTop = this.htmlCache.content.scrollTop;
          if (this.scrollVars.isScrollBarScrolling === false) {
            var newTopValue;
            var currentRow = parseInt(this.scrollVars.lastScrollTop / this.vGridConfig.rowHeight, 10);
            var collectionHeight = this.vGridConfig.rowHeight * this.getRowCacheLength();
            var rowHeight = this.vGridConfig.rowHeight;

            for (var i = 0; i < this.getRowCacheLength(); i++) {

              var row = this.htmlCache.rowsArray[i];
              var rowTop = parseInt(row.top, 10);
              var update = false;

              if (isDownScroll) {
                this.lastScrollType = "down";
                if (rowTop < currentScrollTop - rowHeight) {
                  update = true;
                  newTopValue = rowTop + collectionHeight;
                  currentRow = (rowTop + collectionHeight) / rowHeight;
                }

                if (rowTop > (this.vGridConfig.getCollectionLength() - 1) * rowHeight && rowTop > parseInt(this.htmlCache.content.style.height)) {
                  update = false;
                  this.setRowTopValue([row], 0, -(rowHeight * i + rowHeight * 50));
                }
              } else {
                this.lastScrollType = "up";
                if (rowTop > currentScrollTop + this.contentHeight) {
                  update = true;
                  newTopValue = rowTop - collectionHeight;
                  currentRow = (rowTop - collectionHeight) / rowHeight;
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

          this.scrollVars.isScrollBarScrolling = true;

          var timeout = this.vGridConfig.dataScrollDelay;

          clearTimeout(this.scrollVars.timer);

          this.scrollVars.timer = setTimeout(function () {
            _this3.onNormalScrollingLarge();
            _this3.scrollVars.isScrollBarScrolling = false;
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
            rows[i].viewSlot.bind(bindingContext, { bindingContext: bindingContext, parentOverrideContext: this.vGrid.overrideContext });
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
            rows[i].viewSlot.bind(bindingContext, { bindingContext: bindingContext, parentOverrideContext: this.vGrid.overrideContext });
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
          this.fillDataInRows();
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
          this.fillDataInRows();
          this.correctRowAndScrollbodyWidth();
          this.updateSelectionOnAllRows();
          this.updateGridScrollbars();
          this.fixHeaderWithBody();
        };

        VGridGenerator.prototype.rebuildColumnsRows = function rebuildColumnsRows() {
          this.recreateViewSlots();
          this.fillDataInRows();
          this.updateSelectionOnAllRows();
          this.fixHeaderWithBody();
        };

        VGridGenerator.prototype.columnChangeAndCollection = function columnChangeAndCollection(resetScrollToTop) {
          this.correctColumnsWidthArray();
          this.rebuildGridHeaderHtml();
          this.recreateViewSlots();
          this.fillDataInRows();
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
          this.fillDataInRows();
          if (scrollBottom) {
            this.htmlCache.content.scrollTop = this.htmlCache.content.scrollTop + this.vGridConfig.rowHeight;
          }

          this.htmlCache.scrollBody.style.height = this.scrollBodyHeight - 1 + "px";
          this.htmlCache.scrollBody.style.height = this.scrollBodyHeight + 1 + "px";
        };

        VGridGenerator.prototype.setColumns = function setColumns(paramObj) {
          this.vGridConfig.attributeArray = paramObj.colAttrArray;
          this.vGridConfig.columnWidthArray = paramObj.colWidthArray;
          this.vGridConfig.headerArray = paramObj.colHeaderArray;
          this.vGridConfig.filterArray = paramObj.colFilterArray;
          this.vGridConfig.readOnlyArray = paramObj.colReadonlyArray;
          this.vGridConfig.colStyleArray = paramObj.colStyleArray;
          this.vGridConfig.colTypeArray = paramObj.colTypeArray;
          this.vGridConfig.colFormaterArray = paramObj.colFormaterArray;
          this.vGridConfig.colEditRawArray = paramObj.colEditRawArray;
          this.vGridConfig.filterOnKeyArray = paramObj.colFilterOnKeyArray;
        };

        VGridGenerator.prototype.getColumns = function getColumns() {
          return {
            "colAttrArray": this.vGridConfig.attributeArray.slice(),
            "colWidthArray": this.vGridConfig.columnWidthArray.slice(),
            "colHeaderArray": this.vGridConfig.headerArray.slice(),
            "colFilterArray": this.vGridConfig.filterArray.slice(),
            "colReadonlyArray": this.vGridConfig.readOnlyArray.slice(),
            "colStyleArray": this.vGridConfig.colStyleArray.slice(),
            "colTypeArray": this.vGridConfig.colTypeArray.slice(),
            "colFormaterArray": this.vGridConfig.colFormaterArray.slice(),
            "colEditRawArray": this.vGridConfig.colEditRawArray.slice(),
            "colFilterOnKeyArray": this.vGridConfig.filterOnKeyArray.slice()
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

        VGridGenerator.prototype.updateRow = function updateRow(no) {
          this.fillDataIntoRow(no);
        };

        VGridGenerator.prototype.setEditMode = function setEditMode(value) {
          this.vGridConfig.editMode = value ? true : false;
          this.fillDataInRows();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBV0s7QUFFWCxpQkFGVyxjQUVYLENBQVksS0FBWixFQUFtQjtnQ0FGUixnQkFFUTs7ZUE2RG5CLHdCQUF3QixHQTdETDtlQThEbkIsWUFBWSxHQTlETztlQStEbkIsZ0JBQWdCLEVBL0RHO2VBZ0VuQixhQUFhLEVBaEVNO2VBaUVuQixZQUFZLEVBakVPO2VBa0VuQixtQkFBbUIsR0FsRUE7ZUFtRW5CLG1CQUFtQixFQW5FQTtlQXNFbkIscUJBQXFCLE1BdEVGO2VBd0VuQixZQUFZO0FBQ1Ysa0JBQU0sSUFBTjtBQUNBLG9CQUFRLElBQVI7QUFDQSxxQkFBUyxJQUFUO0FBQ0Esb0JBQVEsSUFBUjtBQUNBLHVCQUFXLEVBQVg7QUFDQSx3QkFBWSxJQUFaO0FBQ0EseUJBQWEsSUFBYixHQS9FaUI7ZUFrRm5CLGFBQWE7QUFDWCwyQkFBZSxDQUFmO0FBQ0EsNEJBQWdCLENBQWhCO0FBQ0Esa0NBQXNCLEtBQXRCO0FBQ0EsbUJBQU8sSUFBUDtBQUNBLDhCQUFrQixFQUFsQjtBQUNBLGlDQUFxQixJQUFyQjtZQXhGaUI7ZUE4c0NuQixZQUFZLEtBQUssY0FBTCxDQTlzQ087O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FEaUI7U0FBbkI7O0FBRlcsaUNBaUdYLDJDQUFpQjtBQUNmLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssaUJBQUwsRUFBSixFQUE4QixHQUE5QyxFQUFtRDtBQUNqRCxnQkFBSSxhQUFhLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsQ0FBekIsRUFBNEIsR0FBNUIsR0FBa0MsS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBREY7QUFFakQsZ0JBQUksTUFBTSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLENBQXpCLENBQU4sQ0FGNkM7QUFHakQsaUJBQUssZUFB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
