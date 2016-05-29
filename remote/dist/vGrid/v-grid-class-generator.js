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
          for (var i = 0; i < this.vGridConfig.columns; i++) {
            rowTemplate = rowTemplate + ("<v-grid-header-col column-no=\"" + i + "\"></v-grid-header-col>");
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.getRowTemplate = function getRowTemplate() {
          var rowTemplate = "";
          if (this.htmlCache.rowTemplate !== null) {
            rowTemplate = this.htmlCache.rowTemplate;
          } else {
            if (this.vGrid.vGridConfig.repeater) {
              return '<template>' + this.vGrid.vGridConfig.repeatTemplate + '</template>';
            } else {
              rowTemplate = '<template>';
              for (var i = 0; i < this.vGridConfig.columns; i++) {
                rowTemplate = rowTemplate + ("<v-grid-row-col column-no=" + i + "></v-grid-row-col>");
              }
            }
          }
          return rowTemplate + '</template>';
        };

        VGridGenerator.prototype.cacheRowTemplate = function cacheRowTemplate(template) {
          this.htmlCache.rowTemplate = null;
          this.htmlCache.rowTemplate = template || this.getRowTemplate();
        };

        VGridGenerator.prototype.getTotalColumnWidth = function getTotalColumnWidth() {
          var total = 0;
          for (var i = 0; i < this.vGridConfig.columns; i++) {
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

        VGridGenerator.prototype.createLoadingScreen = function createLoadingScreen() {
          var test = ['<div class="v-grid-overlay" if.bind="loading">', '</div>', '<div if.two-way="loading" class="v-grid-progress-indicator">', '<div class="v-grid-progress-bar" role="progressbar" style="width:100%">', '<span>${ loadingMessage }</span>', '</div>', '</div>'];

          var viewFactory = this.vGrid.viewCompiler.compile('<template>' + test.join("") + '</template>', this.vGrid.viewResources);
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
              var _bindingContext = {};
              _bindingContext.row = rowNo;
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
          var _this5 = this;

          if (this.vGridConfig.sortOnHeaderClick) {
            var orderByClick = function orderByClick(event) {
              _this5.vGridConfig.onOrderBy(event, function () {
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
          for (var i = 0; i < this.vGridConfig.columns; i++) {
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

            var viewFactory = this.vGrid.viewCompiler.compile(this.getRowTemplate(), this.vGrid.viewResources);
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
            var viewFactory = this.vGrid.viewCompiler.compile(this.getRowTemplate(), this.vGrid.viewResources);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jbGFzcy1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBT1EsYyxxQkFBQSxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBS0ssYztBQUVYLGdDQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxlQTZEbkIsYUE3RG1CLEdBNkRILENBN0RHO0FBQUEsZUE4RG5CLFVBOURtQixHQThETixDQTlETTtBQUFBLGVBK0RuQixTQS9EbUIsR0ErRFAsQ0EvRE87QUFBQSxlQWdFbkIsZ0JBaEVtQixHQWdFQSxDQWhFQTtBQUFBLGVBaUVuQixrQkFqRW1CLEdBaUVFLEtBakVGO0FBQUEsZUFtRW5CLFNBbkVtQixHQW1FUDtBQUNWLGtCQUFNLElBREk7QUFFVixvQkFBUSxJQUZFO0FBR1YscUJBQVMsSUFIQztBQUlWLG9CQUFRLElBSkU7QUFLVix1QkFBVyxFQUxEO0FBTVYsd0JBQVksSUFORjtBQU9WLHlCQUFhLElBUEgsRUFuRU87QUFBQSxlQTZFbkIsVUE3RW1CLEdBNkVOO0FBQ1gsMkJBQWUsQ0FESjtBQUVYLDRCQUFnQixDQUZMO0FBR1gsa0NBQXNCLEtBSFg7QUFJWCxtQkFBTyxJQUpJO0FBS1gsaUNBQXFCO0FBTFYsV0E3RU07QUFBQSxlQXF2Q25CLFNBcnZDbUIsR0FxdkNQLEtBQUssY0FydkNFOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O2lDQXVGRCxjLDZCQUFpQjtBQUNmLGVBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLGlCQUFMLEVBQXBCLEVBQThDLEdBQTlDLEVBQW1EO0FBQ2pELGdCQUFJLGFBQWEsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixDQUF6QixFQUE0QixHQUE1QixHQUFrQyxLQUFLLFdBQUwsQ0FBaUIsU0FBcEU7QUFDQSxnQkFBSSxNQUFNLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsQ0FBekIsQ0FBVjtBQUNBLGlCQUFLLGVBQUws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cUJBQU8sS0FBSyxLQUFMLENBQVcsZUFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVrQjtBQUNqQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxPQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRW1CO0FBQ2xCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGFBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFb0I7QUFDbkIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsY0FBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRiIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY2xhc3MtZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
