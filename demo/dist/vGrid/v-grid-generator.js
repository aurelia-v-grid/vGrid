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
            headerContent: null,
            headerScrollBody: null,
            content: null,
            footer: null,
            rowsArray: [],
            scrollBody: null,
            viewFactory: null
          };
          this.scrollVars = {
            lastScrollTop: 0,
            lastScrollLeft: 0,
            isScrollBarScrolling: false,
            scrollbarScrollingTimer: null,
            lastScrollType: null
          };
          this.selection = this.vGridSelection;

          this.vGrid = vGrid;
        }

        VGridGenerator.prototype.fillDataInRows = function fillDataInRows() {
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.attRowHeight;
            var row = this.htmlCache.rowsArray[i];
            this.insertRowMarkup(currentRow, row, true, true);
          }
        };

        VGridGenerator.prototype.fillDataIntoRow = function fillDataIntoRow(rowno) {
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.attRowHeight;
            if (rowno === currentRow) {
              var row = this.htmlCache.rowsArray[i];
              this.insertRowMarkup(currentRow, row, true, true);
            }
          }
        };

        VGridGenerator.prototype.updateSelectionOnAllRows = function updateSelectionOnAllRows() {
          var i;
          for (i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.attRowHeight;
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
            rowTemplate = rowTemplate + ("<v-grid-header-col column-no=\"" + i + "\">" + this.vGridConfig.colConfig[i].headerTemplate + "</v-grid-header-col>");
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.getRowViewFactory = function getRowViewFactory() {
          var viewFactory;

          if (this.htmlCache.viewFactory !== null) {
            viewFactory = this.htmlCache.viewFactory;
          } else {
            var rowTemplate = "";
            if (this.vGrid.vGridConfig.repeater) {
              rowTemplate = '<template>' + this.vGrid.vGridConfig.repeatTemplate + '</template>';
            } else {
              rowTemplate = '<template>';
              for (var i = 0; i < this.vGridConfig.columnLenght; i++) {
                rowTemplate = rowTemplate + ("<v-grid-row-col column-no=" + i + ">" + this.vGridConfig.colConfig[i].rowTemplate + "</v-grid-row-col>");
              }
              rowTemplate + '</template>';
            }
            viewFactory = this.vGrid.viewCompiler.compile(rowTemplate, this.vGrid.viewResources);
          }

          this.htmlCache.viewFactory = viewFactory;

          return this.htmlCache.viewFactory;
        };

        VGridGenerator.prototype.getTotalColumnWidth = function getTotalColumnWidth() {
          var total = 0;
          for (var i = 0; i < this.vGridConfig.columnLenght; i++) {
            total = total + parseInt(this.vGridConfig.colConfig[i].width, 10);
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

        VGridGenerator.prototype.createGridElement = function createGridElement() {

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

        VGridGenerator.prototype.createLoadingScreenViewSlot = function createLoadingScreenViewSlot() {

          var loadingScreentHtml = ['<div class="v-grid-overlay" if.bind="loading">', '</div>', '<div if.two-way="loading" class="v-grid-progress-indicator">', '<div class="v-grid-progress-bar" role="progressbar" style="width:100%">', '<span>${ loadingMessage }</span>', '</div>', '</div>'];

          var viewFactory = this.vGrid.viewCompiler.compile('<template>' + loadingScreentHtml.join("") + '</template>', this.vGrid.viewResources);
          var view = viewFactory.create(this.vGrid.container);

          this.loadingScreenViewSlot = new ViewSlot(this.htmlCache.grid, true);
          this.loadingScreenViewSlot.add(view);

          this.loadingScreenViewSlot.bind(this.vGrid, {
            bindingContext: this.vGrid,
            parentOverrideContext: this.vGrid.overrideContext
          });
          this.loadingScreenViewSlot.attached();
        };

        VGridGenerator.prototype.createHeaderViewSlot = function createHeaderViewSlot() {

          var viewFactory = this.vGrid.viewCompiler.compile('<template>' + this.getHeaderTemplate() + '</template>', this.vGrid.viewResources);
          var view = viewFactory.create(this.vGrid.container);

          this.headerViewSlot = new ViewSlot(this.htmlCache.headerScrollBody, true);
          this.headerViewSlot.add(view);

          var bindingContext = {};
          this.headerViewSlot.bind(bindingContext, {
            bindingContext: bindingContext,
            parentOverrideContext: this.vGrid.overrideContext
          });

          this.headerViewSlot.attached();
        };

        VGridGenerator.prototype.createGridHeaderElement = function createGridHeaderElement() {

          var header = document.createElement("DIV");
          header.className = this.vGridConfig.css.mainHeader;
          header.style.height = this.vGridConfig.attHeaderHeight + "px";
          if (!this.htmlCache.headerContent) {
            this.htmlCache.grid.appendChild(header);
            this.htmlCache.headerContent = header;
          } else {
            this.htmlCache.headerContent.innerHTML = header.innerHTML;
          }

          this.htmlCache.headerScrollBody = document.createElement("DIV");
          this.htmlCache.headerScrollBody.className = this.vGridConfig.css.row + " " + this.vGridConfig.css.rowHeader;
          this.htmlCache.headerScrollBody.style.height = this.vGridConfig.attHeaderHeight + "px";
          this.htmlCache.headerScrollBody.style.width = this.getTotalColumnWidth() + "px";
          this.htmlCache.headerContent.appendChild(this.htmlCache.headerScrollBody);
        };

        VGridGenerator.prototype.rebuildGridHeaderHtmlAndViewSlot = function rebuildGridHeaderHtmlAndViewSlot() {

          this.unbindDetachHeaderViewSlots();

          this.htmlCache.headerContent.removeChild(this.htmlCache.headerScrollBody);


          this.createGridHeaderElement();

          this.createHeaderViewSlot();
          this.addResizableAndSortableEvent();
        };

        VGridGenerator.prototype.createGridContentElement = function createGridContentElement() {
          var gridWrapperHeight = this.gridHeight;
          var headerAndFooterHeight = this.vGridConfig.attHeaderHeight + this.vGridConfig.attFooterHeight;
          this.contentHeight = gridWrapperHeight - headerAndFooterHeight;

          this.htmlCache.content = document.createElement("DIV");
          this.htmlCache.content.className = this.vGridConfig.css.mainContent;
          this.htmlCache.content.style.height = this.contentHeight + "px";
          this.htmlCache.grid.appendChild(this.htmlCache.content);
        };

        VGridGenerator.prototype.createFooterViewSlot = function createFooterViewSlot() {
          var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-pager></v-grid-pager></template>', this.vGrid.viewResources);
          var view = viewFactory.create(this.vGrid.container);

          this.footerViewSlot = new ViewSlot(this.htmlCache.footer, true);
          this.footerViewSlot.add(view);

          this.footerViewSlot.bind(this, {
            bindingContext: this,
            parentOverrideContext: this.vGrid.overrideContext
          });

          this.footerViewSlot.attached();
        };

        VGridGenerator.prototype.createGridFooterElement = function createGridFooterElement() {
          this.htmlCache.footer = document.createElement("DIV");
          this.htmlCache.footer.className = this.vGridConfig.css.mainFooter;
          this.htmlCache.footer.style.height = this.vGridConfig.attFooterHeight + "px";
          this.htmlCache.grid.appendChild(this.htmlCache.footer);
        };

        VGridGenerator.prototype.setScrollBodyHeightToVar = function setScrollBodyHeightToVar() {
          var collectionLength = this.vGridConfig.getCollectionLength();
          this.scrollBodyHeight = collectionLength * this.vGridConfig.attRowHeight;
        };

        VGridGenerator.prototype.createGridScrollBodyElement = function createGridScrollBodyElement() {
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
          this.htmlCache.headerScrollBody.style.width = this.getTotalColumnWidth() + "px";
        };

        VGridGenerator.prototype.correctHeaderAndScrollbodyWidth = function correctHeaderAndScrollbodyWidth() {
          this.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
          this.htmlCache.headerScrollBody.style.width = this.getTotalColumnWidth() + "px";
        };

        VGridGenerator.prototype.createGridRowElements = function createGridRowElements() {
          var minimumRowsNeeded = parseInt(this.contentHeight / this.vGridConfig.attRowHeight, 10);

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

            row.style.height = this.vGridConfig.attRowHeight + "px";

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

            top = top + this.vGridConfig.attRowHeight;
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

            if (entity === undefined || entity === "" || entity === null) {
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

        VGridGenerator.prototype.onLargeScroll = function onLargeScroll() {
          var _this2 = this;

          this.scrollVars.lastScrollTop = this.htmlCache.content.scrollTop;

          if (this.vGridConfig.getCollectionLength() <= this.htmlCache.rowsArray.length) {
            this.scrollVars.lastScrollTop = 0;
          }

          var rowHeight = this.vGridConfig.attRowHeight;
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
            _this2.setRowTopValue([row], 0, -(currentRowTop + _this2.vGridConfig.attRowHeight * 50));
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

        VGridGenerator.prototype.onSmallScroll = function onSmallScroll(isDownScroll, currentScrollTop) {
          var currentScrollTop = this.htmlCache.content.scrollTop;
          if (this.scrollVars.isScrollBarScrolling === false) {

            var newTopValue;
            var currentRow = parseInt(this.scrollVars.lastScrollTop / this.vGridConfig.attRowHeight, 10);
            var collectionHeight = this.vGridConfig.attRowHeight * this.getRowCacheLength();
            var rowHeight = this.vGridConfig.attRowHeight;

            for (var i = 0; i < this.getRowCacheLength(); i++) {

              var row = this.htmlCache.rowsArray[i];
              var rowTop = parseInt(row.top, 10);
              var update = false;

              if (isDownScroll) {
                this.scrollVars.lastScrollType = "down";
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
                this.scrollVars.lastScrollType = "up";
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
          var currentRow = parseInt(this.scrollVars.lastScrollTop / this.vGridConfig.attRowHeight, 10);

          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var row = this.htmlCache.rowsArray[i];
            var rowTop = parseInt(row.top, 10);
            if (rowTop > (this.vGridConfig.getCollectionLength() - 1) * this.vGridConfig.attRowHeight && rowTop > parseInt(this.htmlCache.content.style.height) - this.vGridConfig.attRowHeight) {
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

          var timeout = this.vGridConfig.attDataScrollDelay;

          clearTimeout(this.scrollVars.scrollbarScrollingTimer);

          this.scrollVars.scrollbarScrollingTimer = setTimeout(function () {
            _this3.onLargeScroll();
            _this3.scrollVars.isScrollBarScrolling = false;
          }, timeout);
        };

        VGridGenerator.prototype.scrollEventHandler = function scrollEventHandler() {

          var currentScrollTop = this.htmlCache.content.scrollTop;
          var currentScrollLeft = this.htmlCache.content.scrollLeft;

          if (currentScrollTop !== this.scrollVars.lastScrollTop) {
            if (currentScrollLeft !== 0) {
              this.htmlCache.content.scrollLeft = this.scrollVars.lastScrollLeft;
              this.htmlCache.headerContent.scrollLeft = this.scrollVars.lastScrollLeft;
            }

            var isDownScroll = true;
            if (currentScrollTop < this.scrollVars.lastScrollTop) {
              isDownScroll = false;
            }

            var isLargeScroll;
            switch (true) {
              case currentScrollTop > this.scrollVars.lastScrollTop + this.vGridConfig.largeScrollLimit:
              case currentScrollTop < this.scrollVars.lastScrollTop - this.vGridConfig.largeScrollLimit:
                isLargeScroll = true;
                break;
              default:
                isLargeScroll = false;
            }

            this.scrollVars.lastScrollTop = currentScrollTop;

            if (isLargeScroll) {
              if (this.vGridConfig.attRenderOnScrollbarScroll) {
                this.onLargeScroll();
              } else {
                this.onScrollbarScrolling();
              }
            } else {
              this.onSmallScroll(isDownScroll, currentScrollTop);
            }
          } else {

            if (this.htmlCache.content.style.overflowX === "hidden") {
              this.htmlCache.content.scrollLeft = 0;
              this.scrollVars.lastScrollLeft = 0;
              this.htmlCache.headerContent.scrollLeft = 0;
            } else {
              if (this.scrollVars.lastScrollLeft !== currentScrollLeft) {
                currentScrollLeft = this.htmlCache.content.scrollLeft;
                this.scrollVars.lastScrollLeft = currentScrollLeft;
                this.htmlCache.headerContent.scrollLeft = currentScrollLeft;
              }
            }
          }
        };

        VGridGenerator.prototype.updateGridScrollbars = function updateGridScrollbars() {

          var collectionHeight = this.vGridConfig.getCollectionLength() * this.vGridConfig.attRowHeight + this.vGridConfig.attRowHeight / 2;
          var bodyHeight = this.htmlCache.content.offsetHeight;


          if (collectionHeight <= bodyHeight) {
            this.htmlCache.content.scrollTop = 0;

            this.htmlCache.content.style.overflow = "";
            this.htmlCache.content.style.overflowY = "hidden";
            this.htmlCache.content.style.overflowX = "hidden";
            this.htmlCache.headerContent.style.overflowY = "hidden";
          } else {
            this.htmlCache.content.style.overflow = "";
            this.htmlCache.content.style.overflowY = "scroll";
            this.htmlCache.content.style.overflowX = "hidden";
            this.htmlCache.headerContent.style.overflowY = "scroll";
          }

          if (this.htmlCache.content.offsetWidth - 5 < this.getTotalColumnWidth()) {
            this.htmlCache.content.style.overflowX = "scroll";
          }
        };

        VGridGenerator.prototype.addResizableAndSortableEvent = function addResizableAndSortableEvent() {
          if (this.vGridConfig.attResizableHeaders) {
            this.vGridResizable.init();
          }

          if (this.vGridConfig.attSortableHeader) {
            this.vGridSortable.init();
          }
        };

        VGridGenerator.prototype.addEvents = function addEvents() {
          var _this4 = this;

          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var rowElement = this.htmlCache.rowsArray[i].div;

            rowElement.addEventListener("dblclick", function (e) {
              var currentRow = parseInt(e.currentTarget.getAttribute("row"));
              _this4.vGridConfig.clickHandler(e, currentRow);
              if (_this4.vGridConfig.attMultiSelect !== undefined) {
                _this4.vGridSelection.setHightlight(e, currentRow, _this4);
              }
            }, false);

            rowElement.addEventListener("click", function (e) {
              var currentRow = parseInt(e.currentTarget.getAttribute("row"));
              _this4.vGridConfig.clickHandler(e, currentRow);
            }, false);
          }

          this.htmlCache.content.addEventListener("scroll", function (e) {
            if (_this4.vGridConfig.attRequestAnimationFrame) {
              requestAnimationFrame(function () {
                _this4.scrollEventHandler();
              });
            } else {
              _this4.scrollEventHandler();
            }
          });

          this.htmlCache.headerContent.addEventListener("scroll", function (e) {
            _this4.htmlCache.content.scrollLeft = _this4.htmlCache.headerContent.scrollLeft;
            _this4.scrollVars.lastScrollLeft = _this4.htmlCache.headerContent.scrollLeft;
          });

          this.addResizableAndSortableEvent();
        };

        VGridGenerator.prototype.setLargeScrollLimit = function setLargeScrollLimit() {
          if (!this.vGridConfig.largeScrollLimit) {
            this.vGridConfig.largeScrollLimit = this.contentHeight * 1.5;
          }
        };

        VGridGenerator.prototype.addHtml = function addHtml() {

          this.createGridElement();
          this.createLoadingScreenViewSlot();

          this.createGridHeaderElement();
          this.createHeaderViewSlot();

          this.createGridContentElement();

          this.createGridFooterElement();
          if (this.vGridConfig.eventOnRemoteCall) {
            this.createFooterViewSlot();
          }

          this.createGridScrollBodyElement();
          this.createGridRowElements();

          this.updateGridScrollbars();
        };

        VGridGenerator.prototype.createRowViewSlots = function createRowViewSlots() {

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

        VGridGenerator.prototype.unbindDetachRowViewSlots = function unbindDetachRowViewSlots() {
          var rows = this.htmlCache.rowsArray;
          for (var i = 0; i < rows.length; i++) {
            rows[i].viewSlot.unbind();
            rows[i].viewSlot.detached();
            rows[i].viewSlot.removeAll();
            rows[i].viewSlot = null;
            rows[i].div.innerHTML = "";
            this.htmlCache.viewFactory = null;
          }
        };

        VGridGenerator.prototype.unbindDetachHeaderViewSlots = function unbindDetachHeaderViewSlots() {
          this.headerViewSlot.unbind();
          this.headerViewSlot.detached();
          this.headerViewSlot.removeAll();
          this.headerViewSlot = null;
        };

        VGridGenerator.prototype.unbindDetachFooterViewSlots = function unbindDetachFooterViewSlots() {
          if (this.footerViewSlot) {
            this.footerViewSlot.unbind();
            this.footerViewSlot.detached();
            this.footerViewSlot.removeAll();
            this.footerViewSlot = null;
          }
        };

        VGridGenerator.prototype.unbindDetachLoadingScreenViewSlots = function unbindDetachLoadingScreenViewSlots() {
          if (this.loadingScreenViewSlot) {
            this.loadingScreenViewSlot.unbind();
            this.loadingScreenViewSlot.detached();
            this.loadingScreenViewSlot.removeAll();
            this.loadingScreenViewSlot = null;
          }
        };

        VGridGenerator.prototype.unbindDetachViewSlots = function unbindDetachViewSlots() {
          this.unbindDetachRowViewSlots();
          this.unbindDetachHeaderViewSlots();
          this.unbindDetachFooterViewSlots();
          this.unbindDetachLoadingScreenViewSlots();
        };

        VGridGenerator.prototype.recreateRowViewSlots = function recreateRowViewSlots() {
          this.unbindDetachRowViewSlots();
          this.createRowViewSlots();
        };

        VGridGenerator.prototype.init = function init(isRebuild) {
          this.addHtml();
          this.addEvents();
          if (!isRebuild) {
            this.vGridSelection.setMode(this.vGridConfig.attMultiSelect);
          }
          this.createRowViewSlots();
          this.fillDataInRows();
          this.setLargeScrollLimit();
        };

        VGridGenerator.prototype.redrawGrid = function redrawGrid() {
          this.unbindDetachViewSlots();
          this.vGridElement.getElementsByClassName(this.vGridConfig.css.wrapper)[0].remove();

          this.htmlCache.rowsArray = null;
          this.htmlCache.rowsArray = [];
          this.htmlCache.headerContent = null;
          this.htmlCache.content = null;
          this.htmlCache.footer = null;
          this.htmlCache.scrollBody = null;
          this.htmlCache.viewFactory = null;

          this.init(true);
          this.fixHeaderWithBody();
        };

        VGridGenerator.prototype.fixHeaderWithBody = function fixHeaderWithBody() {
          var currentScrollLeft = this.htmlCache.content.scrollLeft;
          this.htmlCache.headerContent.scrollLeft = currentScrollLeft;
        };

        VGridGenerator.prototype.rebuildColumns = function rebuildColumns() {
          this.rebuildGridHeaderHtmlAndViewSlot();
          this.recreateRowViewSlots();
          this.fillDataInRows();
          this.correctRowAndScrollbodyWidth();
          this.updateSelectionOnAllRows();
          this.updateGridScrollbars();
          this.fixHeaderWithBody();
        };

        VGridGenerator.prototype.rebuildColumnsRows = function rebuildColumnsRows() {
          this.recreateRowViewSlots();
          this.fillDataInRows();
          this.updateSelectionOnAllRows();
          this.fixHeaderWithBody();
        };

        VGridGenerator.prototype.columnChangeAndCollection = function columnChangeAndCollection(resetScrollToTop) {
          this.rebuildGridHeaderHtmlAndViewSlot();
          this.recreateRowViewSlots();
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
            var contentRows = parseInt(this.htmlCache.content.offsetHeight / this.vGridConfig.attRowHeight);
            var scrollOffsetHeight = contentRows * this.vGridConfig.attRowHeight;
            this.htmlCache.content.scrollTop = collectionLength * this.vGridConfig.attRowHeight - scrollOffsetHeight;
          }

          this.updateGridScrollbars();
          this.correctRowAndScrollbodyWidth();
          this.updateSelectionOnAllRows();
          this.fixHeaderWithBody();
          this.onLargeScroll();
          this.fillDataInRows();
          if (scrollBottom) {
            this.htmlCache.content.scrollTop = this.htmlCache.content.scrollTop + this.vGridConfig.attRowHeight;
          }

          this.htmlCache.scrollBody.style.height = this.scrollBodyHeight - 1 + "px";
          this.htmlCache.scrollBody.style.height = this.scrollBodyHeight + 1 + "px";
        };

        VGridGenerator.prototype.getHeaderContent = function getHeaderContent() {
          return this.htmlCache.headerContent;
        };

        VGridGenerator.prototype.getHeaderContentScrollBody = function getHeaderContentScrollBody() {
          return this.htmlCache.headerScrollBody;
        };

        VGridGenerator.prototype.setColumns = function setColumns(paramObj) {
          this.vGridConfig.colConfig = paramObj.colConfig;
        };

        VGridGenerator.prototype.getColumns = function getColumns() {
          var arr = [];
          this.vGridConfig.colConfig.forEach(function (obj) {
            var x = {};
            for (var k in obj) {
              if (obj.hasOwnProperty(k)) {
                if (x[k] !== obj[k]) {
                  x[k] = obj[k];
                }
              }
            }
            arr.push(x);
          });
          return {
            "colConfig": arr
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
          this.htmlCache.content.scrollTop = collectionLength * this.vGridConfig.attRowHeight;
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

        VGridGenerator.prototype.clearHeaderSortFilter = function clearHeaderSortFilter() {
          this.vGrid.vGridSort.reset();
          this.rebuildGridHeaderHtmlAndViewSlot();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBT1EsYyxxQkFBQSxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBRUssYztBQUVYLGdDQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxlQTZEbkIsYUE3RG1CLEdBNkRILENBN0RHO0FBQUEsZUE4RG5CLFVBOURtQixHQThETixDQTlETTtBQUFBLGVBK0RuQixTQS9EbUIsR0ErRFAsQ0EvRE87QUFBQSxlQWdFbkIsZ0JBaEVtQixHQWdFQSxDQWhFQTtBQUFBLGVBaUVuQixrQkFqRW1CLEdBaUVFLEtBakVGO0FBQUEsZUFrRW5CLFNBbEVtQixHQWtFUDtBQUNWLGtCQUFNLElBREk7QUFFViwyQkFBZSxJQUZMO0FBR1YsOEJBQWtCLElBSFI7QUFJVixxQkFBUyxJQUpDO0FBS1Ysb0JBQVEsSUFMRTtBQU1WLHVCQUFXLEVBTkQ7QUFPVix3QkFBWSxJQVBGO0FBUVYseUJBQWE7QUFSSCxXQWxFTztBQUFBLGVBNkVuQixVQTdFbUIsR0E2RU47QUFDWCwyQkFBZSxDQURKO0FBRVgsNEJBQWdCLENBRkw7QUFHWCxrQ0FBc0IsS0FIWDtBQUlYLHFDQUF5QixJQUpkO0FBS1gsNEJBQWdCO0FBTEwsV0E3RU07QUFBQSxlQWl3Q25CLFNBandDbUIsR0Fpd0NQLEtBQUssY0Fqd0NFOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O2lDQXVGRCxjLDZCQUFpQjtBQUNmLGVBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLGlCQUFMLEVBQXBCLEVBQThDLEdBQTlDLEVBQW1EO0FBQ2pELGdCQUFJLGFBQWEsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixDQUF6QixFQUE0QixHQUE1QixHQUFrQyxLQUFLLFdBQUwsQ0FBaUIsWUFBcEU7QUFDQSxnQkFBSSxNQUFNLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsQ0FBekIsQ0FBVjtBQUNB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QkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRXFCO0FBQ3BCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGVBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFa0I7QUFDakIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsT0FBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVtQjtBQUNsQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxhQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRW9CO0FBQ25CLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGNBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0YiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
