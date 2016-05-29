"use strict";

System.register(["aurelia-framework"], function (_export, _context) {
  "use strict";

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

          this.contentHeight = 0;
          this.gridHeight = 0;
          this.gridWidth = 0;
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
          for (var i = 0; i < this.vGridConfig.columnLenght; i++) {
            rowTemplate = rowTemplate + ("<v-grid-header-col column-no=\"" + i + "\">" + this.vGridConfig.colHeaderTemplateArray[i] + "</v-grid-header-col>");
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.getRowViewFactory = function getRowViewFactory() {
          var rowTemplate = "";
          var viewFactory;
          if (this.htmlCache.rowTemplate !== null) {
            viewFactory = this.htmlCache.rowTemplate;
          } else {
            if (this.vGrid.vGridConfig.repeater) {
              rowTemplate = '<template>' + this.vGrid.vGridConfig.repeatTemplate + '</template>';
            } else {
              rowTemplate = '<template>';
              for (var i = 0; i < this.vGridConfig.columnLenght; i++) {
                rowTemplate = rowTemplate + ("<v-grid-row-col column-no=" + i + ">" + this.vGridConfig.colRowTemplateArray[i] + "</v-grid-row-col>");
              }
              rowTemplate + '</template>';
            }

            viewFactory = this.vGrid.viewCompiler.compile(rowTemplate, this.vGrid.viewResources);
          }

          this.htmlCache.rowTemplate = viewFactory;

          return this.htmlCache.rowTemplate;
        };

        VGridGenerator.prototype.getTotalColumnWidth = function getTotalColumnWidth() {
          var total = 0;
          for (var i = 0; i < this.vGridConfig.columnLenght; i++) {
            total = total + parseInt(this.vGridConfig.columnWidthArray[i], 10);
          }
          return total;
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

        VGridGenerator.prototype.createLoadingScreen = function createLoadingScreen() {
          var loadingScreentHtml = ['<div class="v-grid-overlay" if.bind="loading">', '</div>', '<div if.two-way="loading" class="v-grid-progress-indicator">', '<div class="v-grid-progress-bar" role="progressbar" style="width:100%">', '<span>${ loadingMessage }</span>', '</div>', '</div>'];

          var viewFactory = this.vGrid.viewCompiler.compile('<template>' + loadingScreentHtml.join("") + '</template>', this.vGrid.viewResources);
          var view = viewFactory.create(this.vGrid.container);

          this.headerViewSlot = new ViewSlot(this.htmlCache.grid, true);
          this.headerViewSlot.add(view);

          this.headerViewSlot.bind(this.vGrid, {
            bindingContext: this.vGrid,
            parentOverrideContext: this.vGrid.overrideContext
          });
          this.headerViewSlot.attached();
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

          var viewFactory = this.vGrid.viewCompiler.compile('<template>' + this.getHeaderTemplate() + '</template>', this.vGrid.viewResources);
          var view = viewFactory.create(this.vGrid.container);

          this.headerViewSlot = new ViewSlot(this.htmlCache.header.firstChild, true);
          this.headerViewSlot.add(view);

          var bindingContext = {};
          this.headerViewSlot.bind(bindingContext, {
            bindingContext: bindingContext,
            parentOverrideContext: this.vGrid.overrideContext
          });
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

          var viewFactory = this.vGrid.viewCompiler.compile('<template>' + this.getHeaderTemplate() + '</template>', this.vGrid.viewResources);
          var view = viewFactory.create(this.vGrid.container);

          this.headerViewSlot.unbind();
          this.headerViewSlot.detached();
          this.headerViewSlot.removeAll();
          this.headerViewSlot = null;

          this.headerViewSlot = new ViewSlot(this.htmlCache.header.firstChild, true);
          this.headerViewSlot.add(view);

          var bindingContext = {};
          this.headerViewSlot.bind(bindingContext, {
            bindingContext: bindingContext,
            parentOverrideContext: this.vGrid.overrideContext
          });
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

          if (this.vGridConfig.eventOnRemoteCall) {
            var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-pager></v-grid-pager></template>', this.vGrid.viewResources);
            var view = viewFactory.create(this.vGrid.container);
            this.footerViewSlot = new ViewSlot(this.htmlCache.footer, true);
            this.footerViewSlot.add(view);

            this.footerViewSlot.bind(this, {
              bindingContext: this,
              parentOverrideContext: this.vGrid.overrideContext
            });
            this.footerViewSlot.attached();
          }
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
              row.viewSlot.bind(bindingContext, {
                bindingContext: bindingContext,
                parentOverrideContext: _this.vGrid.overrideContext
              });
            }

            if (entity !== "" && row.viewSlot !== null) {
              var tempRef = {};
              for (var k in entity) {
                if (entity.hasOwnProperty(k)) {
                  if (tempRef[k] !== entity[k]) {
                    tempRef[k] = entity[k];
                  }
                }
              }
              var that = _this;
              var _bindingContext = {};
              _bindingContext.row = rowNo;
              _bindingContext.ctx = _this;
              _bindingContext.tempRef = tempRef;
              _bindingContext.rowRef = _this.vGrid.vGridCollectionFiltered[rowNo];
              row.viewSlot.bind(_bindingContext, {
                bindingContext: _bindingContext,
                parentOverrideContext: _this.vGrid.overrideContext
              });
            }

            if (entity === undefined || entity === "") {
              row.div.style.display = "none";
            } else {
              row.div.style.display = "block";
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
          if (this.vGridConfig.isResizableHeaders) {
            this.vGridResizable.init();
          }

          if (this.vGridConfig.isSortableHeader) {
            this.vGridSortable.init();
          }
        };

        VGridGenerator.prototype.addEvents = function addEvents() {
          var _this5 = this;

          var handleClick = function handleClick(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this5.vGridConfig.clickHandler(e, currentRow);
            if (_this5.vGridConfig.isMultiSelect !== undefined) {
              _this5.vGridSelection.setHightlight(e, currentRow, _this5);
            }
          };

          var handleDblClick = function handleDblClick(e) {
            var currentRow = parseInt(e.currentTarget.getAttribute("row"));
            _this5.vGridConfig.clickHandler(e, currentRow);
          };

          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var div = this.htmlCache.rowsArray[i].div;
            div.addEventListener("dblclick", handleDblClick.bind(this), false);
            div.addEventListener("click", handleClick.bind(this), false);
          }

          this.htmlCache.content.addEventListener("scroll", this.onScroll.bind(this));

          this.addResizableAndSortableEvent();
        };

        VGridGenerator.prototype.correctColumnsWidthArray = function correctColumnsWidthArray() {
          var newColumnWidth = [];
          for (var i = 0; i < this.vGridConfig.columnLenght; i++) {
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
          this.createLoadingScreen();
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
            var viewFactory = this.getRowViewFactory();
            var view = viewFactory.create(this.vGrid.container);
            rows[i].viewSlot = new ViewSlot(rows[i].div, true);
            rows[i].viewSlot.add(view);
            var bindingContext = {};
            rows[i].viewSlot.bind(bindingContext, {
              bindingContext: bindingContext,
              parentOverrideContext: this.vGrid.overrideContext
            });
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
            var viewFactory = this.getRowViewFactory();
            var view = viewFactory.create(this.vGrid.container);
            rows[i].viewSlot = new ViewSlot(rows[i].div, true);
            rows[i].viewSlot.add(view);
            var bindingContext = {};
            rows[i].viewSlot.bind(bindingContext, {
              bindingContext: bindingContext,
              parentOverrideContext: this.vGrid.overrideContext
            });
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
          this.vGridConfig.columnWidthArray = paramObj.colWidthArray;
          this.vGridConfig.colRowTemplateArray = paramObj.colRowTemplateArray;
        };

        VGridGenerator.prototype.getColumns = function getColumns() {
          return {
            "colWidthArray": this.vGridConfig.columnWidthArray.slice(),
            "colRowTemplateArray": this.vGridConfig.colRowTemplateArray.slice()
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
          this.vGrid.vGridSort.reset();
          this.rebuildGridHeaderHtml();
        };

        VGridGenerator.prototype.setHeaderSortFilter = function setHeaderSortFilter() {
          this.rebuildGridHeaderHtml();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBT1EsYyxxQkFBQSxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBS0ssYztBQUVYLGdDQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxlQTZEbkIsYUE3RG1CLEdBNkRILENBN0RHO0FBQUEsZUE4RG5CLFVBOURtQixHQThETixDQTlETTtBQUFBLGVBK0RuQixTQS9EbUIsR0ErRFAsQ0EvRE87QUFBQSxlQWdFbkIsZ0JBaEVtQixHQWdFQSxDQWhFQTtBQUFBLGVBaUVuQixrQkFqRW1CLEdBaUVFLEtBakVGO0FBQUEsZUFtRW5CLFNBbkVtQixHQW1FUDtBQUNWLGtCQUFNLElBREk7QUFFVixvQkFBUSxJQUZFO0FBR1YscUJBQVMsSUFIQztBQUlWLG9CQUFRLElBSkU7QUFLVix1QkFBVyxFQUxEO0FBTVYsd0JBQVksSUFORjtBQU9WLHlCQUFhLElBUEgsRUFuRU87QUFBQSxlQTZFbkIsVUE3RW1CLEdBNkVOO0FBQ1gsMkJBQWUsQ0FESjtBQUVYLDRCQUFnQixDQUZMO0FBR1gsa0NBQXNCLEtBSFg7QUFJWCxtQkFBTyxJQUpJO0FBS1gsaUNBQXFCO0FBTFYsV0E3RU07QUFBQSxlQTBzQ25CLFNBMXNDbUIsR0Ewc0NQLEtBQUssY0Exc0NFOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O2lDQXVGRCxjLDZCQUFpQjtBQUNmLGVBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLGlCQUFMLEVBQXBCLEVBQThDLEdBQTlDLEVBQW1EO0FBQ2pELGdCQUFJLGFBQWEsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixDQUF6QixFQUE0QixHQUE1QixHQUFrQyxLQUFLLFdBQUwsQ0FBaUIsU0FBcEU7QUFDQSxnQkFBSSxNQUFNLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsQ0FBekIsQ0FBVjtBQUNBLGlCQUFLLGVBQUwsQ0FBcUIs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Q0QsUzs7aUNBR0QsZ0IsK0JBQW1CO0FBQ2pCLGVBQUssa0JBQUwsR0FBMEIsSUFBMUI7QUFDRCxTOztpQ0FHRCxZLDJCQUFlO0FBQ2IsaUJBQU8sS0FBSyxTQUFMLENBQWUsT0FBZixDQUF1QixTQUE5QjtBQUNELFM7O2lDQUdELFMsc0JBQVUsRSxFQUFJO0FBQ1osZUFBSyxlQUFMLENBQXFCLEVBQXJCO0FBQ0QsUzs7aUNBRUQsVyx3QkFBWSxLLEVBQU87QUFDakIsZUFBSyxXQUFMLENBQWlCLFFBQWpCLEdBQTRCLFFBQVEsSUFBUixHQUFlLEtBQTNDO0FBQ0EsZUFBSyxjQUFMO0FBQ0QsUzs7aUNBRUQscUIsb0NBQXdCO0FBQ3RCLGVBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsS0FBckI7QUFDQSxlQUFLLHFCQUFMO0FBQ0QsUzs7aUNBRUQsbUIsa0NBQXNCO0FBQ3BCLGVBQUsscUJBQUw7QUFDRCxTOzs7OzhCQTlyQ29CO0FBQ25CLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGNBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFaUI7QUFDaEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVxQjtBQUNwQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxlQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRWtCO0FBQ2pCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLE9BQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFbUI7QUFDbEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsYUFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVvQjtBQUNuQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxjQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
