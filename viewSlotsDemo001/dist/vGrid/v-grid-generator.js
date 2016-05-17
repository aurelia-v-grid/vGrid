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
              console.log(this.vGrid.vGridConfig.repeatTemplate);
              console.log(this.vGrid.vGridConfig.repeatTemplate.indexOf("template"));
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

          var viewFactory = this.vGrid.viewCompiler.compile('<template>' + this.getHeaderTemplate() + '</template>', this.vGrid.resources);
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

            var viewFactory = this.vGrid.viewCompiler.compile(this.getRowTemplate(), this.vGrid.resources);
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
            var viewFactory = this.vGrid.viewCompiler.compile(this.getRowTemplate(), this.vGrid.resources);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBV0s7QUFFWCxpQkFGVyxjQUVYLENBQVksS0FBWixFQUFtQjtnQ0FGUixnQkFFUTs7ZUE2RG5CLHdCQUF3QixHQTdETDtlQThEbkIsWUFBWSxHQTlETztlQStEbkIsZ0JBQWdCLEVBL0RHO2VBZ0VuQixhQUFhLEVBaEVNO2VBaUVuQixZQUFZLEVBakVPO2VBa0VuQixtQkFBbUIsR0FsRUE7ZUFtRW5CLG1CQUFtQixFQW5FQTtlQXNFbkIscUJBQXFCLE1BdEVGO2VBd0VuQixZQUFZO0FBQ1Ysa0JBQU0sSUFBTjtBQUNBLG9CQUFRLElBQVI7QUFDQSxxQkFBUyxJQUFUO0FBQ0Esb0JBQVEsSUFBUjtBQUNBLHVCQUFXLEVBQVg7QUFDQSx3QkFBWSxJQUFaO0FBQ0EseUJBQWEsSUFBYixHQS9FaUI7ZUFrRm5CLGFBQWE7QUFDWCwyQkFBZSxDQUFmO0FBQ0EsNEJBQWdCLENBQWhCO0FBQ0Esa0NBQXNCLEtBQXRCO0FBQ0EsbUJBQU8sSUFBUDtBQUNBLDhCQUFrQixFQUFsQjtBQUNBLGlDQUFxQixJQUFyQjtZQXhGaUI7ZUEydENuQixZQUFZLEtBQUssY0FBTCxDQTN0Q087O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FEaUI7U0FBbkI7O0FBRlcsaUNBaUdYLDJDQUFpQjtBQUNmLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssaUJBQUwsRUFBSixFQUE4QixHQUE5QyxFQUFtRDtBQUNqRCxnQkFBSSxhQUFhLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsQ0FBekIsRUFBNEIsR0FBNUIsR0FBa0MsS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBREY7QUFFakQsZ0JBQUksTUFBTSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLENBQXpCLENBQU4sQ0FGNkM7QUFHakQsaUJBQUssZUFB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akIsZUFBSyxrQkFBTCxHQUEwQixJQUExQixDQURpQjs7O0FBOXJDUixpQ0Ftc0NYLHVDQUFlO0FBQ2IsaUJBQU8sS0FBSyxTQUFMLENBQWUsT0FBZixDQUF1QixTQUF2QixDQURNOzs7QUFuc0NKLGlDQXdzQ1gsK0JBQVUsSUFBSTtBQUNaLGVBQUssZUFBTCxDQUFxQixFQUFyQixFQURZOzs7QUF4c0NILGlDQTRzQ1gsbUNBQVksT0FBTztBQUNqQixlQUFLLFdBQUwsQ0FBaUIsUUFBakIsR0FBNEIsUUFBUSxJQUFSLEdBQWUsS0FBZixDQURYO0FBRWpCLGVBQUssY0FBTCxHQUZpQjs7O0FBNXNDUixpQ0FpdENYLHlEQUF3QjtBQUN0QixlQUFLLFNBQUwsR0FBaUIsRUFBakIsQ0FEc0I7QUFFdEIsZUFBSyxxQkFBTCxHQUZzQjs7O0FBanRDYixpQ0FzdENYLG1EQUFvQixXQUFXO0FBQzdCLGVBQUssU0FBTCxHQUFpQixTQUFqQixDQUQ2QjtBQUU3QixlQUFLLHFCQUFMLEdBRjZCOzs7cUJBdHRDcEI7OzhCQVVVO0FBQ25CLGdCQUFJLEtBQUssS0FBTCxFQUFZO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsY0FBWCxDQURPO2FBQWhCLE1BRU87QUFDTCxxQkFBTyxJQUFQLENBREs7YUFGUDs7Ozs4QkFPZ0I7QUFDaEIsZ0JBQUksS0FBSyxLQUFMLEVBQVk7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBRE87YUFBaEIsTUFFTztBQUNMLHFCQUFPLElBQVAsQ0FESzthQUZQOzs7OzhCQU9vQjtBQUNwQixnQkFBSSxLQUFLLEtBQUwsRUFBWTtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FETzthQUFoQixNQUVPO0FBQ0wscUJBQU8sSUFBUCxDQURLO2FBRlA7Ozs7OEJBT2lCO0FBQ2pCLGdCQUFJLEtBQUssS0FBTCxFQUFZO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsT0FBWCxDQURPO2FBQWhCLE1BRU87QUFDTCxxQkFBTyxJQUFQLENBREs7YUFGUDs7Ozs4QkFPa0I7QUFDbEIsZ0JBQUksS0FBSyxLQUFMLEVBQVk7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxhQUFYLENBRE87YUFBaEIsTUFFTztBQUNMLHFCQUFPLElBQVAsQ0FESzthQUZQOzs7OzhCQU9tQjtBQUNuQixnQkFBSSxLQUFLLEtBQUwsRUFBWTtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FETzthQUFoQixNQUVPO0FBQ0wscUJBQU8sSUFBUCxDQURLO2FBRlA7Ozs7ZUFuRFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
