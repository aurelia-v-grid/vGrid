/* */ 
define(["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGridGenerator = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  var VGridGenerator = exports.VGridGenerator = function () {
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

        row.style["min-width"] = this.getTotalColumnWidth() + "px";
        row.style.width = "100%";

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
      this.loadingScreenViewSlot = new _aureliaFramework.ViewSlot(this.gridElement, true);
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
      this.headerViewSlot = new _aureliaFramework.ViewSlot(this.headerScrollElement, true);
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
        rows[i].viewSlot = new _aureliaFramework.ViewSlot(rows[i].div, true);
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

      this.footerViewSlot = new _aureliaFramework.ViewSlot(this.footerElement, true);
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

          var style = "style=\"width:" + this.vGridConfig.colConfig[i].colWidth + "px\"";
          var elementClass = "class=\"" + (this.vGridConfig.css.rowHeaderColumn + i) + "\"";
          var template = this.vGridConfig.colConfig[i].colHeaderTemplate;

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

            var style = "style=\"width:" + this.vGridConfig.colConfig[i].colWidth + "px\"";
            var elementClass = "class=\"" + (this.vGridConfig.css.rowColumn + i) + "\"";
            var template = this.vGridConfig.colConfig[i].colRowTemplate;

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
        total = total + parseInt(this.vGridConfig.colConfig[i].colWidth, 10);
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
    };

    VGridGenerator.prototype.setScrollBodyHeightToVar = function setScrollBodyHeightToVar() {
      var collectionLength = this.vGridConfig.getCollectionLength();
      this.scrollBodyHeight = collectionLength * this.vGridConfig.attRowHeight;
    };

    VGridGenerator.prototype.correctRowAndScrollbodyWidth = function correctRowAndScrollbodyWidth() {
      this.contentScrollBodyElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
      for (var i = 0; i < this.rowElementArray.length; i++) {
        this.rowElementArray[i].div.style.width = "100%";
        this.rowElementArray[i].div.style["min-width"] = this.getTotalColumnWidth() + "px";
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
  }();
});