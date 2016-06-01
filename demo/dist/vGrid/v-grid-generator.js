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
          this.gridElement = null;
          this.headerElement = null;
          this.headerScrollElement = null;
          this.contentElement = null;
          this.footerElement = null;
          this.rowElementArray = [];
          this.contentScrollBodyElement = null;
          this.rowViewFactory = null;
          this.loadingScreenViewSlot = null;
          this.headerViewSlot = null;
          this.footerViewSlot = null;

          this.vGrid = vGrid;
        }

        VGridGenerator.prototype.fillDataInRows = function fillDataInRows() {
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this.rowElementArray[i].top / this.vGridConfig.attRowHeight;
            var row = this.rowElementArray[i];
            this.insertRowMarkup(currentRow, row, true, true);
          }
        };

        VGridGenerator.prototype.fillDataIntoRow = function fillDataIntoRow(rowno) {
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this.rowElementArray[i].top / this.vGridConfig.attRowHeight;
            if (rowno === currentRow) {
              var row = this.rowElementArray[i];
              this.insertRowMarkup(currentRow, row, true, true);
            }
          }
        };

        VGridGenerator.prototype.updateSelectionOnAllRows = function updateSelectionOnAllRows() {
          var i;
          for (i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this.rowElementArray[i].top / this.vGridConfig.attRowHeight;
            if (this.vGridSelection.isSelected(currentRow)) {
              this.rowElementArray[i].div.classList.add(this.vGridConfig.css.rowSelected);
            } else {
              this.rowElementArray[i].div.classList.remove(this.vGridConfig.css.rowSelected);
            }
          }
        };

        VGridGenerator.prototype.getHeaderTemplate = function getHeaderTemplate() {
          var rowTemplate = "";
          if (this.vGrid.vGridConfig.repeater) {
            rowTemplate = this.vGrid.vGridConfig.repeatRowHeaderTemplate;
          } else {
            for (var i = 0; i < this.vGridConfig.columnLength; i++) {
              rowTemplate = rowTemplate + ("<v-grid-header-col column-no=\"" + i + "\">" + this.vGridConfig.colConfig[i].headerTemplate + "</v-grid-header-col>");
            }
          }
          return rowTemplate;
        };

        VGridGenerator.prototype.getRowViewFactory = function getRowViewFactory() {
          var viewFactory;

          if (this.rowViewFactory !== null) {
            viewFactory = this.rowViewFactory;
          } else {
            var rowTemplate = "";
            if (this.vGrid.vGridConfig.repeater) {
              rowTemplate = '<template>' + this.vGrid.vGridConfig.repeatRowTemplate + '</template>';
            } else {
              rowTemplate = '<template>';
              for (var i = 0; i < this.vGridConfig.columnLength; i++) {
                rowTemplate = rowTemplate + ("<v-grid-row-col column-no=" + i + ">" + this.vGridConfig.colConfig[i].rowTemplate + "</v-grid-row-col>");
              }
              rowTemplate + '</template>';
            }
            viewFactory = this.vGrid.viewCompiler.compile(rowTemplate, this.vGrid.viewResources);
          }

          this.rowViewFactory = viewFactory;

          return this.rowViewFactory;
        };

        VGridGenerator.prototype.getTotalColumnWidth = function getTotalColumnWidth() {
          var total = 0;
          for (var i = 0; i < this.vGridConfig.columnLength; i++) {
            total = total + parseInt(this.vGridConfig.colConfig[i].width, 10);
          }
          return total;
        };

        VGridGenerator.prototype.getRowCacheLength = function getRowCacheLength() {
          return this.rowElementArray.length;
        };

        VGridGenerator.prototype.setRowTopValue = function setRowTopValue(rowArray, elementNo, topValue) {
          rowArray[elementNo].div.style.transform = "translate3d(0px," + topValue + "px, 0px)";
          rowArray[elementNo].top = topValue;
        };

        VGridGenerator.prototype.createGridElement = function createGridElement() {

          var x = document.createElement("DIV");
          this.vGridElement.appendChild(x);
          this.vGridElement.style.display = "block";
          this.gridElement = x;

          this.gridElement.classList.add(this.vGridConfig.css.wrapper);
          this.gridElement.style.position = "relative";
          this.gridElement.style.height = '100%';
          this.gridElement.style.width = "100%";

          this.gridHeight = this.gridElement.clientHeight;
          this.gridWidght = this.gridElement.clientWidth;
        };

        VGridGenerator.prototype.createLoadingScreenViewSlot = function createLoadingScreenViewSlot() {

          var loadingScreentHtml = ['<div class="v-grid-overlay" if.bind="loading">', '</div>', '<div if.two-way="loading" class="v-grid-progress-indicator">', '<div class="v-grid-progress-bar" role="progressbar" style="width:100%">', '<span>${ loadingMessage }</span>', '</div>', '</div>'];
          var viewFactory = this.vGrid.viewCompiler.compile('<template>' + loadingScreentHtml.join("") + '</template>', this.vGrid.viewResources);
          var view = viewFactory.create(this.vGrid.container);
          this.loadingScreenViewSlot = new ViewSlot(this.gridElement, true);
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
          this.headerViewSlot = new ViewSlot(this.headerScrollElement, true);
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
          header.classList.add(this.vGridConfig.css.mainHeader);
          header.style.height = this.vGridConfig.attHeaderHeight + "px";
          if (!this.headerElement) {
            this.gridElement.appendChild(header);
            this.headerElement = header;
          } else {
            this.headerElement.innerHTML = header.innerHTML;
          }
          this.headerScrollElement = document.createElement("DIV");
          this.headerScrollElement.classList.add(this.vGridConfig.css.row);
          this.headerScrollElement.classList.add(this.vGridConfig.css.rowHeader);
          this.headerScrollElement.style.height = this.vGridConfig.attHeaderHeight + "px";
          this.headerScrollElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
          this.headerElement.appendChild(this.headerScrollElement);
        };

        VGridGenerator.prototype.rebuildGridHeaderHtmlAndViewSlot = function rebuildGridHeaderHtmlAndViewSlot() {
          this.unbindDetachHeaderViewSlots();
          this.headerElement.removeChild(this.headerScrollElement);
          this.createGridHeaderElement();
          this.createHeaderViewSlot();
          this.addResizableAndSortableEvent();
        };

        VGridGenerator.prototype.createGridContentElement = function createGridContentElement() {
          var gridWrapperHeight = this.gridHeight;
          var headerAndFooterHeight = this.vGridConfig.attHeaderHeight + this.vGridConfig.attFooterHeight;
          this.contentHeight = gridWrapperHeight - headerAndFooterHeight;

          this.contentElement = document.createElement("DIV");
          this.contentElement.classList.add(this.vGridConfig.css.mainContent);
          this.contentElement.style.height = this.contentHeight + "px";
          this.gridElement.appendChild(this.contentElement);
        };

        VGridGenerator.prototype.createFooterViewSlot = function createFooterViewSlot() {
          var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-pager></v-grid-pager></template>', this.vGrid.viewResources);
          var view = viewFactory.create(this.vGrid.container);

          this.footerViewSlot = new ViewSlot(this.footerElement, true);
          this.footerViewSlot.add(view);

          this.footerViewSlot.bind(this, {
            bindingContext: this,
            parentOverrideContext: this.vGrid.overrideContext
          });

          this.footerViewSlot.attached();
        };

        VGridGenerator.prototype.createGridFooterElement = function createGridFooterElement() {
          this.footerElement = document.createElement("DIV");
          this.footerElement.classList.add(this.vGridConfig.css.mainFooter);
          this.footerElement.style.height = this.vGridConfig.attFooterHeight + "px";
          this.gridElement.appendChild(this.footerElement);
        };

        VGridGenerator.prototype.setScrollBodyHeightToVar = function setScrollBodyHeightToVar() {
          var collectionLength = this.vGridConfig.getCollectionLength();
          this.scrollBodyHeight = collectionLength * this.vGridConfig.attRowHeight;
        };

        VGridGenerator.prototype.createGridScrollBodyElement = function createGridScrollBodyElement() {
          this.setScrollBodyHeightToVar();

          this.contentScrollBodyElement = document.createElement("DIV");
          this.contentScrollBodyElement.classList.add(this.vGridConfig.css.scrollBody);
          this.contentScrollBodyElement.style.height = this.scrollBodyHeight + "px";
          this.contentScrollBodyElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
          this.contentElement.appendChild(this.contentScrollBodyElement);
        };

        VGridGenerator.prototype.correctRowAndScrollbodyWidth = function correctRowAndScrollbodyWidth() {
          this.contentScrollBodyElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
          for (var i = 0; i < this.rowElementArray.length; i++) {
            this.rowElementArray[i].div.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
          }
          this.headerScrollElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
        };

        VGridGenerator.prototype.correctHeaderAndScrollbodyWidth = function correctHeaderAndScrollbodyWidth() {
          this.contentScrollBodyElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
          this.headerScrollElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
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

            row.classList.add(this.vGridConfig.css.row);

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

            row.style.minWidth = this.gridElement.offsetWidth + "px";
            row.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";

            row.innerHTML = "";
            this.contentScrollBodyElement.appendChild(row);

            this.rowElementArray.push({
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

        VGridGenerator.prototype.hideRowsThatIsLargerThanCollection = function hideRowsThatIsLargerThanCollection() {
          var currentRow = parseInt(this.vGridScrollEvents.lastScrollTop / this.vGridConfig.attRowHeight, 10);
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var row = this.rowElementArray[i];
            var rowTop = parseInt(row.top, 10);
            if (rowTop > (this.vGridConfig.getCollectionLength() - 1) * this.vGridConfig.attRowHeight && rowTop > parseInt(this.contentElement.style.height) - this.vGridConfig.attRowHeight) {
              this.setRowTopValue([row], 0, -5000 + i);
            }
          }

          this.rowElementArray.sort(function (a, b) {
            return parseInt(a.top) - parseInt(b.top);
          });
        };

        VGridGenerator.prototype.updateGridScrollbars = function updateGridScrollbars() {
          var collectionHeight = this.vGridConfig.getCollectionLength() * this.vGridConfig.attRowHeight + this.vGridConfig.attRowHeight / 2;
          var bodyHeight = this.contentElement.offsetHeight;
          if (collectionHeight <= bodyHeight) {
            this.contentElement.scrollTop = 0;
            this.contentElement.style.overflow = "";
            this.contentElement.style.overflowY = "hidden";
            this.contentElement.style.overflowX = "hidden";
            this.headerElement.style.overflowY = "hidden";
          } else {
            this.contentElement.style.overflow = "";
            this.contentElement.style.overflowY = "scroll";
            this.contentElement.style.overflowX = "hidden";
            this.headerElement.style.overflowY = "scroll";
          }

          if (this.contentElement.offsetWidth - 5 < this.getTotalColumnWidth()) {
            this.contentElement.style.overflowX = "scroll";
          }
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
          var rows = this.rowElementArray;
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
          var rows = this.rowElementArray;
          for (var i = 0; i < rows.length; i++) {
            rows[i].viewSlot.unbind();
            rows[i].viewSlot.detached();
            rows[i].viewSlot.removeAll();
            rows[i].viewSlot = null;
            rows[i].div.innerHTML = "";
            this.rowViewFactory = null;
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
          this.rowElementArray = null;
          this.rowElementArray = [];
          this.headerElement = null;
          this.contentElement = null;
          this.footerElement = null;
          this.contentScrollBodyElement = null;
          this.rowViewFactory = null;
          this.init(true);
          this.fixHeaderWithBody();
        };

        VGridGenerator.prototype.fixHeaderWithBody = function fixHeaderWithBody() {
          var currentScrollLeft = this.contentElement.scrollLeft;
          this.headerElement.scrollLeft = currentScrollLeft;
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
          this.contentScrollBodyElement.style.height = this.scrollBodyHeight + "px";
          var reset = false;
          if (resetScrollToTop === true) {
            this.contentElement.scrollTop = 0;
          }
          if (this.scrollBodyHeight < this.contentElement.scrollTop || scrollBottom) {
            var collectionLength = this.vGridConfig.getCollectionLength();
            var contentRows = parseInt(this.contentElement.offsetHeight / this.vGridConfig.attRowHeight);
            var scrollOffsetHeight = contentRows * this.vGridConfig.attRowHeight;
            this.contentElement.scrollTop = collectionLength * this.vGridConfig.attRowHeight - scrollOffsetHeight;
          }

          this.updateGridScrollbars();
          this.correctRowAndScrollbodyWidth();
          this.updateSelectionOnAllRows();
          this.fixHeaderWithBody();
          this.vGridScrollEvents.onLargeScroll();
          this.fillDataInRows();
          if (scrollBottom) {
            this.contentElement.scrollTop = this.contentElement.scrollTop + this.vGridConfig.attRowHeight;
          }

          this.contentScrollBodyElement.style.height = this.scrollBodyHeight - 1 + "px";
          this.contentScrollBodyElement.style.height = this.scrollBodyHeight + 1 + "px";
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
          var _this2 = this;

          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var rowElement = this.rowElementArray[i].div;

            rowElement.addEventListener("dblclick", function (e) {
              var currentRow = parseInt(e.currentTarget.getAttribute("row"));
              _this2.vGridConfig.clickHandler(e, currentRow);
            }, false);

            rowElement.addEventListener("click", function (e) {
              var currentRow = parseInt(e.currentTarget.getAttribute("row"));
              _this2.vGridConfig.clickHandler(e, currentRow);
              if (_this2.vGridConfig.attMultiSelect !== undefined) {
                _this2.vGridSelection.setHightlight(e, currentRow, _this2);
              }
            }, false);
          }

          this.contentElement.addEventListener("scroll", function (e) {
            if (_this2.vGridConfig.attRequestAnimationFrame) {
              requestAnimationFrame(function () {
                _this2.vGridScrollEvents.scrollEventHandler();
              });
            } else {
              _this2.vGridScrollEvents.scrollEventHandler();
            }
          });

          this.headerElement.addEventListener("scroll", function (e) {
            _this2.contentElement.scrollLeft = _this2.headerElement.scrollLeft;
            _this2.vGridScrollEvents.lastScrollLeft = _this2.headerElement.scrollLeft;
          });

          this.addResizableAndSortableEvent();
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
        }, {
          key: "vGridScrollEvents",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridScrollEvents;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBTVEsYyxxQkFBQSxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBRUssYztBQUVYLGdDQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxlQXNFbkIsYUF0RW1CLEdBc0VILENBdEVHO0FBQUEsZUF1RW5CLFVBdkVtQixHQXVFTixDQXZFTTtBQUFBLGVBd0VuQixTQXhFbUIsR0F3RVAsQ0F4RU87QUFBQSxlQXlFbkIsZ0JBekVtQixHQXlFQSxDQXpFQTtBQUFBLGVBMEVuQixrQkExRW1CLEdBMEVFLEtBMUVGO0FBQUEsZUE2RW5CLFdBN0VtQixHQTZFTCxJQTdFSztBQUFBLGVBOEVuQixhQTlFbUIsR0E4RUgsSUE5RUc7QUFBQSxlQStFbkIsbUJBL0VtQixHQStFRyxJQS9FSDtBQUFBLGVBZ0ZuQixjQWhGbUIsR0FnRkYsSUFoRkU7QUFBQSxlQWlGbkIsYUFqRm1CLEdBaUZILElBakZHO0FBQUEsZUFrRm5CLGVBbEZtQixHQWtGRCxFQWxGQztBQUFBLGVBbUZuQix3QkFuRm1CLEdBbUZRLElBbkZSO0FBQUEsZUFzRm5CLGNBdEZtQixHQXNGRixJQXRGRTtBQUFBLGVBdUZuQixxQkF2Rm1CLEdBdUZLLElBdkZMO0FBQUEsZUF3Rm5CLGNBeEZtQixHQXdGRixJQXhGRTtBQUFBLGVBeUZuQixjQXpGbUIsR0F5RkYsSUF6RkU7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDRDs7aUNBNkZELGMsNkJBQWlCO0FBQ2YsZUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssaUJBQUwsRUFBcEIsRUFBOEMsR0FBOUMsRUFBbUQ7QUFDakQsZ0JBQUksYUFBYSxLQUFLLGVBQUwsQ0FBcUIsQ0FBckIsRUFBd0IsR0FBeEIsR0FBOEIsS0FBSyxXQUFMLENBQWlCLFlBQWhFO0FBQ0EsZ0JBQUksTUFBTSxLQUFLLGVBQUwsQ0FBcUIsQ0FBckIs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SyxjQUFMLENBQW9CLGFBQXBCLENBQWtDLENBQWxDLEVBQXFDLFVBQXJDO0FBQ0Q7QUFDRixhQU5ELEVBTUcsS0FOSDtBQVFEOztBQUdELGVBQUssY0FBTCxDQUFvQixnQkFBcEIsQ0FBcUMsUUFBckMsRUFBK0MsVUFBQyxDQUFELEVBQU07QUFDbkQsZ0JBQUksT0FBSyxXQUFMLENBQWlCLHdCQUFyQixFQUErQztBQUM3QyxvQ0FBc0IsWUFBTTtBQUMxQix1QkFBSyxpQkFBTCxDQUF1QixrQkFBdkI7QUFDRCxlQUZEO0FBR0QsYUFKRCxNQUlPO0FBQ0wscUJBQUssaUJBQUwsQ0FBdUIsa0JBQXZCO0FBQ0Q7QUFDRixXQVJEOztBQVdBLGVBQUssYUFBTCxDQUFtQixnQkFBbkIsQ0FBb0MsUUFBcEMsRUFBOEMsVUFBQyxDQUFELEVBQU07QUFDbEQsbUJBQUssY0FBTCxDQUFvQixVQUFwQixHQUFpQyxPQUFLLGFBQUwsQ0FBbUIsVUFBcEQ7QUFDQSxtQkFBSyxpQkFBTCxDQUF1QixjQUF2QixHQUF3QyxPQUFLLGFBQUwsQ0FBbUIsVUFBM0Q7QUFFRCxXQUpEOztBQU1BLGVBQUssNEJBQUw7QUFDRCxTOzs7OzhCQTUyQm9CO0FBQ25CLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGNBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFaUI7QUFDaEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVxQjtBQUNwQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxlQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRWtCO0FBQ2pCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLE9BQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFbUI7QUFDbEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsYUFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVvQjtBQUNuQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxjQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBR3VCO0FBQ3RCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGlCQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
