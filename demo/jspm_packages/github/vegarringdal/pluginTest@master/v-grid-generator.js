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
          if (this.vGrid.vGridConfig.repeatTemplate.indexOf("template") === -1) {
            return '<template>' + this.vGrid.vGridConfig.repeatTemplate + '</template>';
          } else {
            return this.vGrid.vGridConfig.repeatTemplate;
          }
        } else {
          rowTemplate = '<template>';
          for (var i = 0; i < this.vGridConfig.attributeArray.length; i++) {
            rowTemplate = rowTemplate + ("<v-grid-row-col v-grid-context-menu-cell column-no=" + i + "></v-grid-row-col>");
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
      this.headerViewSlot = new _aureliaFramework.ViewSlot(this.htmlCache.header.firstChild, true);
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

      var viewFactory = this.vGrid.viewCompiler.compile('<template>' + this.getHeaderTemplate() + '</template>', this.vGrid.resources);
      var view = viewFactory.create(this.vGrid.container);
      this.headerViewSlot.unbind();
      this.headerViewSlot.detached();
      this.headerViewSlot.removeAll();
      this.headerViewSlot = null;
      this.headerViewSlot = new _aureliaFramework.ViewSlot(this.htmlCache.header.firstChild, true);
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
          var _bindingContext = {};
          for (var k in entity) {
            if (entity.hasOwnProperty(k)) {
              if (_bindingContext[k] !== entity[k]) {
                _bindingContext[k] = entity[k];
              }
            }
          }
          _bindingContext.currentEntityRef = _this.vGrid.vGridCollectionFiltered[rowNo];
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

        var viewFactory = this.vGrid.viewCompiler.compile(this.getRowTemplate(), this.vGrid.resources);
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

    VGridGenerator.prototype.recreateViewSlots = function recreateViewSlots() {
      var rows = this.htmlCache.rowsArray;
      for (var i = 0; i < rows.length; i++) {
        rows[i].viewSlot.unbind();
        rows[i].viewSlot.detached();
        rows[i].viewSlot.removeAll();
        rows[i].viewSlot = null;
        rows[i].div.innerHTML = "";
        this.htmlCache.rowTemplate = null;
        var viewFactory = this.vGrid.viewCompiler.compile(this.getRowTemplate(), this.vGrid.resources);
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
      this.vGridConfig.colCustomArray = paramObj.colCustomArray;
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
        "colFilterOnKeyArray": this.vGridConfig.filterOnKeyArray.slice(),
        "colCustomArray": this.vGridConfig.colCustomArray.slice()
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
  }();
});