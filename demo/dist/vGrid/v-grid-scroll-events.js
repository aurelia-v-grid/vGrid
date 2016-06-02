"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, VGridScrollEvents;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
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

      _export("VGridScrollEvents", VGridScrollEvents = function () {
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
      }());

      _export("VGridScrollEvents", VGridScrollEvents);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zY3JvbGwtZXZlbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBTWEsaUI7QUFFWCxtQ0FBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLGFBQUwsR0FBcUIsQ0FBckI7QUFDQSxlQUFLLGNBQUwsR0FBc0IsQ0FBdEI7QUFDQSxlQUFLLG9CQUFMLEdBQTRCLEtBQTVCO0FBQ0EsZUFBSyx1QkFBTCxHQUErQixJQUEvQjtBQUNBLGVBQUssY0FBTCxHQUFzQixJQUF0QjtBQUNEOztvQ0E2REQsYSw0QkFBZ0I7QUFBQTs7QUFFZCxlQUFLLGFBQUwsR0FBcUIsS0FBSyxjQUFMLENBQW9CLGNBQXBCLENBQW1DLFNBQXhEOztBQUVBLGNBQUksS0FBSyxXQUFMLENBQWlCLG1CQUFqQixNQUEwQyxLQUFLLGNBQUwsQ0FBb0IsZUFBcEIsQ0FBb0MsTUFBbEYsRUFBMEY7QUFDeEYsaUJBQUssYUFBTCxHQUFxQixDQUFyQjtBQUNEOztBQUlELGNBQUksWUFBWSxLQUFLLFdBQUwsQ0FBaUIsWUFBakM7QUFDQSxjQUFJLGFBQWEsS0FBSyxjQUFMLENBQW9CLGNBQXBCLENBQW1DLFlBQXBEO0FBQ0EsY0FBSSxhQUFhLFNBQVMsS0FBSyxhQUFMLEdBQXFCLFNBQTlCLEVBQXlDLEVBQXpDLENBQWpCO0FBQ0EsY0FBSSxXQUFXLFNBQVMsS0FBSyxjQUFMLENBQW9CLGNBQXBCLENBQW1DLFNBQW5DLEdBQStDLFNBQXhELEVBQW1FLEVBQW5FLENBQWY7QUFDQSxjQUFJLGdCQUFnQixZQUFZLFVBQWhDO0FBQ0EsY0FBSSxjQUFjLFlBQVksUUFBOUI7QUFDQSxjQUFJLG1CQUFtQixLQUFLLFdBQUwsQ0FBaUIsbUJBQWpCLEVBQXZCOztBQUlBLGNBQUksV0FBVyxTQUFYLFFBQVcsQ0FBQyxjQUFELEVBQW9CO0FBQ2pDLGdCQUFJLE1BQU0s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aEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVxQjtBQUNwQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxlQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRWtCO0FBQ2pCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLE9BQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFbUI7QUFDbEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsYUFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVvQjtBQUNuQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxjQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1zY3JvbGwtZXZlbnRzLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
