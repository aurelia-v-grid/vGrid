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
          for (var i = 0; i < this.vGridConfig.columnLength; i++) {
            rowTemplate = rowTemplate + ("<v-grid-header-col column-no=\"" + i + "\">" + this.vGridConfig.colConfig[i].headerTemplate + "</v-grid-header-col>");
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
              rowTemplate = '<template>' + this.vGrid.vGridConfig.repeatTemplate + '</template>';
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
          this.headerScrollElement.style.width = this.getTotalColumnWidth() + "px";
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
          this.contentScrollBodyElement.style.width = this.getTotalColumnWidth() + "px";
          this.contentElement.appendChild(this.contentScrollBodyElement);
        };

        VGridGenerator.prototype.correctRowAndScrollbodyWidth = function correctRowAndScrollbodyWidth() {
          this.contentScrollBodyElement.style.width = this.getTotalColumnWidth() + "px";
          for (var i = 0; i < this.rowElementArray.length; i++) {
            this.rowElementArray[i].div.style.width = this.getTotalColumnWidth() + "px";
          }
          this.headerScrollElement.style.width = this.getTotalColumnWidth() + "px";
        };

        VGridGenerator.prototype.correctHeaderAndScrollbodyWidth = function correctHeaderAndScrollbodyWidth() {
          this.contentScrollBodyElement.style.width = this.getTotalColumnWidth() + "px";
          this.headerScrollElement.style.width = this.getTotalColumnWidth() + "px";
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
            row.style.width = this.getTotalColumnWidth() + "px";

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBTVEsYyxxQkFBQSxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBRUssYztBQUVYLGdDQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxlQXNFbkIsYUF0RW1CLEdBc0VILENBdEVHO0FBQUEsZUF1RW5CLFVBdkVtQixHQXVFTixDQXZFTTtBQUFBLGVBd0VuQixTQXhFbUIsR0F3RVAsQ0F4RU87QUFBQSxlQXlFbkIsZ0JBekVtQixHQXlFQSxDQXpFQTtBQUFBLGVBMEVuQixrQkExRW1CLEdBMEVFLEtBMUVGO0FBQUEsZUE2RW5CLFdBN0VtQixHQTZFTCxJQTdFSztBQUFBLGVBOEVuQixhQTlFbUIsR0E4RUgsSUE5RUc7QUFBQSxlQStFbkIsbUJBL0VtQixHQStFRyxJQS9FSDtBQUFBLGVBZ0ZuQixjQWhGbUIsR0FnRkYsSUFoRkU7QUFBQSxlQWlGbkIsYUFqRm1CLEdBaUZILElBakZHO0FBQUEsZUFrRm5CLGVBbEZtQixHQWtGRCxFQWxGQztBQUFBLGVBbUZuQix3QkFuRm1CLEdBbUZRLElBbkZSO0FBQUEsZUFzRm5CLGNBdEZtQixHQXNGRixJQXRGRTtBQUFBLGVBdUZuQixxQkF2Rm1CLEdBdUZLLElBdkZMO0FBQUEsZUF3Rm5CLGNBeEZtQixHQXdGSCxJQXhGRztBQUFBLGVBeUZuQixjQXpGbUIsR0F5RkYsSUF6RkU7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDRDs7aUNBNkZELGMsNkJBQWlCO0FBQ2YsZUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssaUJBQUwsRUFBcEIsRUFBOEMsR0FBOUMsRUFBbUQ7QUFDakQsZ0JBQUksYUFBYSxLQUFLLGVBQUwsQ0FBcUIsQ0FBckIsRUFBd0IsR0FBeEIsR0FBOEIsS0FBSyxXQUFMLENBQWlCLFlBQWhFO0FBQ0EsZ0JBQUksTUFBTSxLQUFLLGVBQUwsQ0FBcUIsQ0FBckIs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
