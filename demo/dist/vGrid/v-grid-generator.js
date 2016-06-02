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

        VGridGenerator.prototype.init = function init(isRebuild) {
          this.addHtml();
          this.addEvents();
          if (!isRebuild) {
            this.vGridSelection.setMode(this.vGridConfig.attMultiSelect);
          }
          this.updateGridScrollbars();
          this.rebindAllRowSlots();
          this.setLargeScrollLimit();
        };

        VGridGenerator.prototype.addHtml = function addHtml() {
          this.createGridElement();
          this.createGridHeaderElement();
          this.createGridContentElement();
          this.createGridFooterElement();
          this.createGridScrollBodyElement();
          this.createGridRowElements();

          this.createLoadingScreenViewSlot();
          this.createHeaderViewSlot();
          this.createRowViewSlots();
          if (this.vGridConfig.eventOnRemoteCall) {
            this.createFooterViewSlot();
          }
        };

        VGridGenerator.prototype.addEvents = function addEvents() {
          var _this = this;

          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var rowElement = this.rowElementArray[i].div;

            rowElement.addEventListener("dblclick", function (e) {
              var currentRow = parseInt(e.currentTarget.getAttribute("row"));
              _this.vGridConfig.clickHandler(e, currentRow);
            }, false);

            rowElement.addEventListener("click", function (e) {
              var currentRow = parseInt(e.currentTarget.getAttribute("row"));
              _this.vGridConfig.clickHandler(e, currentRow);
              if (_this.vGridConfig.attMultiSelect !== undefined) {
                _this.vGridSelection.setHightlight(e, currentRow, _this);
              }
            }, false);
          }

          this.contentElement.addEventListener("scroll", function (e) {
            if (_this.vGridConfig.attRequestAnimationFrame) {
              requestAnimationFrame(function () {
                _this.vGridScrollEvents.scrollEventHandler();
              });
            } else {
              _this.vGridScrollEvents.scrollEventHandler();
            }
          });

          this.headerElement.addEventListener("scroll", function (e) {
            _this.contentElement.scrollLeft = _this.headerElement.scrollLeft;
            _this.vGridScrollEvents.lastScrollLeft = _this.headerElement.scrollLeft;
          });

          this.addResizableAndSortableEvent();
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

        VGridGenerator.prototype.createGridContentElement = function createGridContentElement() {
          var gridWrapperHeight = this.gridHeight;
          var headerAndFooterHeight = this.vGridConfig.attHeaderHeight + this.vGridConfig.attFooterHeight;
          this.contentHeight = gridWrapperHeight - headerAndFooterHeight;

          this.contentElement = document.createElement("DIV");
          this.contentElement.classList.add(this.vGridConfig.css.mainContent);
          this.contentElement.style.height = this.contentHeight + "px";
          this.gridElement.appendChild(this.contentElement);
        };

        VGridGenerator.prototype.createGridFooterElement = function createGridFooterElement() {
          this.footerElement = document.createElement("DIV");
          this.footerElement.classList.add(this.vGridConfig.css.mainFooter);
          this.footerElement.style.height = this.vGridConfig.attFooterHeight + "px";
          this.gridElement.appendChild(this.footerElement);
        };

        VGridGenerator.prototype.createGridScrollBodyElement = function createGridScrollBodyElement() {
          this.setScrollBodyHeightToVar();

          this.contentScrollBodyElement = document.createElement("DIV");
          this.contentScrollBodyElement.classList.add(this.vGridConfig.css.scrollBody);
          this.contentScrollBodyElement.style.height = this.scrollBodyHeight + "px";
          this.contentScrollBodyElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
          this.contentElement.appendChild(this.contentScrollBodyElement);
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
          var viewFactory = this.getHeaderViewFactory();
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

        VGridGenerator.prototype.rebindAllRowSlots = function rebindAllRowSlots() {
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this.rowElementArray[i].top / this.vGridConfig.attRowHeight;
            var row = this.rowElementArray[i];
            this.vGridConfig.updateRowBinding(currentRow, row, true, true);
          }
        };

        VGridGenerator.prototype.rebindRowNumber = function rebindRowNumber(rowno) {
          for (var i = 0; i < this.getRowCacheLength(); i++) {
            var currentRow = this.rowElementArray[i].top / this.vGridConfig.attRowHeight;
            if (rowno === currentRow) {
              var row = this.rowElementArray[i];
              this.vGridConfig.updateRowBinding(currentRow, row, true, true);
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

        VGridGenerator.prototype.getHeaderViewFactory = function getHeaderViewFactory() {
          var rowTemplate = "";
          if (this.vGrid.vGridConfig.repeater) {
            rowTemplate = this.vGrid.vGridConfig.repeatRowHeaderTemplate;
          } else {
            for (var i = 0; i < this.vGridConfig.columnLength; i++) {

              var style = "style=\"width:" + this.vGridConfig.colConfig[i].width + "px\"";
              var elementClass = "class=\"" + (this.vGridConfig.css.rowHeaderColumn + i) + "\"";
              var template = this.vGridConfig.colConfig[i].headerTemplate;

              rowTemplate = rowTemplate + ("<v-grid-header-col " + style + " " + elementClass + " column-no=\"" + i + "\">" + template + "</v-grid-header-col>");
            }
          }
          var viewFactory = this.vGrid.viewCompiler.compile("<template>" + rowTemplate + "</template>", this.vGrid.viewResources);
          return viewFactory;
        };

        VGridGenerator.prototype.getRowViewFactory = function getRowViewFactory() {
          var viewFactory;

          if (this.rowViewFactory !== null) {
            viewFactory = this.rowViewFactory;
          } else {
            var rowTemplate = "";
            if (this.vGrid.vGridConfig.repeater) {
              rowTemplate = '<template>' + this.vGridConfig.repeatRowTemplate + '</template>';
            } else {
              rowTemplate = '<template>';
              for (var i = 0; i < this.vGridConfig.columnLength; i++) {

                var style = "style=\"width:" + this.vGridConfig.colConfig[i].width + "px\"";
                var elementClass = "class=\"" + (this.vGridConfig.css.rowColumn + i) + "\"";
                var template = this.vGridConfig.colConfig[i].rowTemplate;

                rowTemplate = rowTemplate + ("<v-grid-row-col " + style + " " + elementClass + " column-no=" + i + ">" + template + "</v-grid-row-col>");
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

        VGridGenerator.prototype.rebuildGridHeaderHtmlAndViewSlot = function rebuildGridHeaderHtmlAndViewSlot() {
          this.unbindDetachHeaderViewSlots();
          this.headerElement.removeChild(this.headerScrollElement);
          this.createGridHeaderElement();
          this.createHeaderViewSlot();
          this.addResizableAndSortableEvent();
        };

        VGridGenerator.prototype.setScrollBodyHeightToVar = function setScrollBodyHeightToVar() {
          var collectionLength = this.vGridConfig.getCollectionLength();
          this.scrollBodyHeight = collectionLength * this.vGridConfig.attRowHeight;
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
          this.rebindAllRowSlots();
          this.correctRowAndScrollbodyWidth();
          this.updateSelectionOnAllRows();
          this.updateGridScrollbars();
          this.fixHeaderWithBody();
        };

        VGridGenerator.prototype.rebuildColumnsRows = function rebuildColumnsRows() {
          this.recreateRowViewSlots();
          this.rebindAllRowSlots();
          this.updateSelectionOnAllRows();
          this.fixHeaderWithBody();
        };

        VGridGenerator.prototype.columnChangeAndCollection = function columnChangeAndCollection(resetScrollToTop) {
          this.rebuildGridHeaderHtmlAndViewSlot();
          this.recreateRowViewSlots();
          this.rebindAllRowSlots();
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
          this.rebindAllRowSlots();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBTVEsYyxxQkFBQSxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBRUssYztBQUVYLGdDQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxlQXNFbkIsYUF0RW1CLEdBc0VILENBdEVHO0FBQUEsZUF1RW5CLFVBdkVtQixHQXVFTixDQXZFTTtBQUFBLGVBd0VuQixTQXhFbUIsR0F3RVAsQ0F4RU87QUFBQSxlQXlFbkIsZ0JBekVtQixHQXlFQSxDQXpFQTtBQUFBLGVBMEVuQixrQkExRW1CLEdBMEVFLEtBMUVGO0FBQUEsZUE2RW5CLFdBN0VtQixHQTZFTCxJQTdFSztBQUFBLGVBOEVuQixhQTlFbUIsR0E4RUgsSUE5RUc7QUFBQSxlQStFbkIsbUJBL0VtQixHQStFRyxJQS9FSDtBQUFBLGVBZ0ZuQixjQWhGbUIsR0FnRkYsSUFoRkU7QUFBQSxlQWlGbkIsYUFqRm1CLEdBaUZILElBakZHO0FBQUEsZUFrRm5CLGVBbEZtQixHQWtGRCxFQWxGQztBQUFBLGVBbUZuQix3QkFuRm1CLEdBbUZRLElBbkZSO0FBQUEsZUFzRm5CLGNBdEZtQixHQXNGRixJQXRGRTtBQUFBLGVBdUZuQixxQkF2Rm1CLEdBdUZLLElBdkZMO0FBQUEsZUF3Rm5CLGNBeEZtQixHQXdGRixJQXhGRTtBQUFBLGVBeUZuQixjQXpGbUIsR0F5RkYsSUF6RkU7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDRDs7aUNBNkZELEksaUJBQUssUyxFQUFXO0FBQ2QsZUFBSyxPQUFMO0FBQ0EsZUFBSyxTQUFMO0FBQ0EsY0FBSSxDQUFDLFNBQUwsRUFBZ0I7QUFDZCxpQkFBSyxjQUFMLENBQW9CLE9BQXBCLENBQTRCLEtBQUssV0FBTCxDQUFpQixjQUE3QztBQUNEO0FBQ0QsZUFBSyxvQkFBTDtBQUNBLGVBQUssaUJBQUw7QUFDQSxlQUFLLG1CQUFMO0FBQ0QsUzs7aUNBTUQsTyxz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
