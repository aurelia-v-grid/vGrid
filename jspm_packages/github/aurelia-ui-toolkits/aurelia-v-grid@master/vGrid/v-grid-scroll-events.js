/* */ 
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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

  var VGridScrollEvents = exports.VGridScrollEvents = function () {
    function VGridScrollEvents(vGrid) {
      _classCallCheck(this, VGridScrollEvents);

      this.vGrid = vGrid;
      this.lastScrollTop = 0;
      this.lastScrollLeft = 0;
      this.isScrollBarScrolling = false;
      this.scrollbarScrollingTimer = null;
      this.lastScrollType = null;
    }

    VGridScrollEvents.prototype.onLargeScroll = function onLargeScroll() {
      var _this = this;

      this.lastScrollTop = this.vGridGenerator.contentElement.scrollTop;

      if (this.vGridConfig.getCollectionLength() <= this.vGridGenerator.rowElementArray.length) {
        this.lastScrollTop = 0;
      }

      var rowHeight = this.vGridConfig.attRowHeight;
      var bodyHeight = this.vGridGenerator.contentElement.clientHeight;
      var currentRow = parseInt(this.lastScrollTop / rowHeight, 10);
      var firstRow = parseInt(this.vGridGenerator.contentElement.scrollTop / rowHeight, 10);
      var currentRowTop = rowHeight * currentRow;
      var firstRowTop = rowHeight * firstRow;
      var collectionLength = this.vGridConfig.getCollectionLength();

      var setAfter = function setAfter(cacheRowNumber) {
        var row = _this.vGridGenerator.rowElementArray[cacheRowNumber];
        _this.vGridGenerator.setRowTopValue([row], 0, currentRowTop);
        currentRowTop = currentRowTop + rowHeight;
      };

      var setBefore = function setBefore(cacheRowNumber) {
        var row = _this.vGridGenerator.rowElementArray[cacheRowNumber];
        firstRowTop = firstRowTop - rowHeight;
        _this.vGridGenerator.setRowTopValue([row], 0, firstRowTop);
      };

      var setHiddenFromView = function setHiddenFromView(cacheRowNumber) {
        var row = _this.vGridGenerator.rowElementArray[cacheRowNumber];
        _this.vGridGenerator.setRowTopValue([row], 0, -(currentRowTop + _this.vGridConfig.attRowHeight * 50));
      };

      for (var i = 0; i < this.vGridGenerator.getRowCacheLength(); i++) {
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

      this.vGridGenerator.rowElementArray.sort(function (a, b) {
        return parseInt(a.top) - parseInt(b.top);
      });

      this.vGridGenerator.rebindAllRowSlots();
    };

    VGridScrollEvents.prototype.onSmallScroll = function onSmallScroll(isDownScroll, currentScrollTop) {
      var currentScrollTop = this.vGridGenerator.contentElement.scrollTop;
      if (this.isScrollBarScrolling === false) {

        var newTopValue;
        var currentRow = parseInt(this.lastScrollTop / this.vGridConfig.attRowHeight, 10);
        var collectionHeight = this.vGridConfig.attRowHeight * this.vGridGenerator.getRowCacheLength();
        var rowHeight = this.vGridConfig.attRowHeight;

        for (var i = 0; i < this.vGridGenerator.getRowCacheLength(); i++) {

          var row = this.vGridGenerator.rowElementArray[i];
          var rowTop = parseInt(row.top, 10);
          var update = false;

          if (isDownScroll) {
            this.lastScrollType = "down";
            if (rowTop < currentScrollTop - rowHeight) {
              update = true;
              newTopValue = rowTop + collectionHeight;
              currentRow = (rowTop + collectionHeight) / rowHeight;
            }

            if (rowTop > (this.vGridConfig.getCollectionLength() - 1) * rowHeight && rowTop > this.vGridGenerator.contentHeight) {
              update = false;
              this.vGridGenerator.setRowTopValue([row], 0, -(rowHeight * i + rowHeight * 50));
            }
          } else {
            this.lastScrollType = "up";
            if (rowTop > currentScrollTop + this.vGridGenerator.contentHeight) {
              update = true;
              newTopValue = rowTop - collectionHeight;
              currentRow = (rowTop - collectionHeight) / rowHeight;
            }
          }

          if (update === true && currentRow >= 0 && currentRow <= this.vGridConfig.getCollectionLength() - 1) {
            this.vGridGenerator.setRowTopValue([row], 0, newTopValue);
            this.vGridConfig.updateRowBinding(currentRow, row, isDownScroll, false);
          }
        }

        this.vGridGenerator.rowElementArray.sort(function (a, b) {
          return parseInt(a.top) - parseInt(b.top);
        });
      } else {
        this.onScrollbarScrolling();
      }
    };

    VGridScrollEvents.prototype.onScrollbarScrolling = function onScrollbarScrolling() {
      var _this2 = this;

      this.isScrollBarScrolling = true;

      var timeout = this.vGridConfig.attDataScrollDelay;

      clearTimeout(this.scrollbarScrollingTimer);

      this.scrollbarScrollingTimer = setTimeout(function () {
        _this2.onLargeScroll();
        _this2.isScrollBarScrolling = false;
      }, timeout);
    };

    VGridScrollEvents.prototype.scrollEventHandler = function scrollEventHandler() {

      var currentScrollTop = this.vGridGenerator.contentElement.scrollTop;
      var currentScrollLeft = this.vGridGenerator.contentElement.scrollLeft;

      if (currentScrollTop !== this.lastScrollTop) {
        if (currentScrollLeft !== 0) {
          this.vGridGenerator.contentElement.scrollLeft = this.lastScrollLeft;
          this.vGridGenerator.headerElement.scrollLeft = this.lastScrollLeft;
        }

        var isDownScroll = true;
        if (currentScrollTop < this.lastScrollTop) {
          isDownScroll = false;
        }

        var isLargeScroll;
        switch (true) {
          case currentScrollTop > this.lastScrollTop + this.vGridConfig.largeScrollLimit:
          case currentScrollTop < this.lastScrollTop - this.vGridConfig.largeScrollLimit:
            isLargeScroll = true;
            break;
          default:
            isLargeScroll = false;
        }

        this.lastScrollTop = currentScrollTop;

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

        if (this.vGridGenerator.contentElement.style.overflowX === "hidden") {
          this.vGridGenerator.contentElement.scrollLeft = 0;
          this.lastScrollLeft = 0;
          this.vGridGenerator.headerElement.scrollLeft = 0;
        } else {
          if (this.lastScrollLeft !== currentScrollLeft) {
            currentScrollLeft = this.vGridGenerator.contentElement.scrollLeft;
            this.lastScrollLeft = currentScrollLeft;
            this.vGridGenerator.headerElement.scrollLeft = currentScrollLeft;
          }
        }
      }
    };

    _createClass(VGridScrollEvents, [{
      key: "vGridGenerator",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridGenerator;
        } else {
          return null;
        }
      }
    }, {
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

    return VGridScrollEvents;
  }();
});