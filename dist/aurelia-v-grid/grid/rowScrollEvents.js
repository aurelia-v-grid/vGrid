"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, RowScrollEvents;

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

      _export("RowScrollEvents", RowScrollEvents = function () {
        function RowScrollEvents(element, htmlCache) {
          _classCallCheck(this, RowScrollEvents);

          this.htmlCache = htmlCache;
          this.element = element;
          this.timer = null;
          this.largeScroll = false;
          this.collectionLength = 0;
          this.largeScrollUpdateDelay = 0;
        }

        RowScrollEvents.prototype.init = function init(rowHeight) {
          this.rowCache = this.htmlCache.rowCache;
          this.rowHeight = rowHeight;
          this.updateInternalHtmlCache();
          this.createRowCache();
          this.addEventListener();
        };

        RowScrollEvents.prototype.createRowCache = function createRowCache() {
          for (var i = 0; i < this.cacheLength; i++) {
            this.rowCache.push({
              left: this.leftRows[i],
              main: this.mainRows[i],
              right: this.rightRows[i],
              group: this.groupRows[i],
              top: this.rowHeight * i,
              row: i
            });
            this.leftRows[i].avgRow = i;
            this.mainRows[i].avgRow = i;
            this.rightRows[i].avgRow = i;
            this.groupRows[i].avgRow = i;
          }
        };

        RowScrollEvents.prototype.updateInternalHtmlCache = function updateInternalHtmlCache() {

          this.left = this.htmlCache.avg_content_left_scroll;
          this.main = this.htmlCache.avg_content_main_scroll;
          this.right = this.htmlCache.avg_content_right_scroll;
          this.scroller = this.htmlCache.avg_content_right_scroll;

          this.leftRows = this.htmlCache.avg_left_rows;
          this.mainRows = this.htmlCache.avg_main_rows;
          this.rightRows = this.htmlCache.avg_right_rows;
          this.groupRows = this.htmlCache.avg_group_rows;

          this.cacheLength = this.leftRows.length;
        };

        RowScrollEvents.prototype.onScroll = function onScroll(event) {
          var _this = this;

          var isDown = event.detail.isDown;
          var isScrollBarScrolling = event.detail.isScrollBarScrolling;
          var newTopPosition = event.detail.newTopPosition;

          if (this.largeScroll || isScrollBarScrolling) {
            if (this.largeScrollUpdateDelay) {
              clearTimeout(this.timer);
              this.largeScroll = true;
              this.timer = setTimeout(function () {
                _this.largeScroll = false;
                _this.scrollScrollBar(newTopPosition, isDown);
              }, this.largeScrollUpdateDelay);
            } else {
              this.scrollScrollBar(newTopPosition, isDown);
            }
          } else {
            switch (true) {
              case isDown && !isScrollBarScrolling:
                this.scrollNormal(newTopPosition, true);
                break;
              case !isDown && !isScrollBarScrolling:
                this.scrollNormal(newTopPosition, false);
                break;
            }
          }
        };

        RowScrollEvents.prototype.setRowTopValue = function setRowTopValue(cache, top) {
          cache.left.style.transform = "translate3d(0px," + top + "px, 0px)";
          cache.main.style.transform = "translate3d(0px," + top + "px, 0px)";
          cache.right.style.transform = "translate3d(0px," + top + "px, 0px)";
          cache.group.style.transform = "translate3d(0px," + top + "px, 0px)";
          cache.left.avgRow = Math.floor(top / this.rowHeight);
          cache.main.avgRow = Math.floor(top / this.rowHeight);
          cache.right.avgRow = Math.floor(top / this.rowHeight);
          cache.group.avgRow = Math.floor(top / this.rowHeight);
          cache.top = top;
          cache.row = Math.floor(top / this.rowHeight);
        };

        RowScrollEvents.prototype.scrollNormal = function scrollNormal(newTopPosition, downScroll) {

          var rowHeight = this.rowHeight;
          var currentRow = Math.floor(newTopPosition / rowHeight);
          var cacheHeight = rowHeight * this.cacheLength;

          for (var i = 0; i < this.cacheLength; i++) {

            var cache = this.rowCache[i];
            var top = this.rowCache[i].top;
            var update = false;
            var newTop = void 0;

            if (!downScroll) {
              if (top > newTopPosition + this.contentHeight) {
                update = true;
                newTop = top - cacheHeight;
                currentRow = (top - cacheHeight) / rowHeight;
              }
            } else {

              if (top < newTopPosition - rowHeight) {
                update = true;
                newTop = top + cacheHeight;
                currentRow = (top + cacheHeight) / rowHeight;
              }
            }

            if (update === true && currentRow >= 0 && currentRow <= this.collectionLength - 1) {
              this.setRowTopValue(cache, newTop);
              this.triggerRebindRowEvent(currentRow, cache, downScroll);
            }
          }

          this.rowCache.sort(function (a, b) {
            return parseInt(a.top) - parseInt(b.top);
          });
        };

        RowScrollEvents.prototype.scrollScrollBar = function scrollScrollBar(newTopPosition, downScroll) {
          var _this2 = this;

          if (this.collectionLength <= this.cacheLength) {
            newTopPosition = 0;
          }

          var rowHeight = this.rowHeight;
          var bodyHeight = this.contentHeight;
          var currentRow = Math.floor(newTopPosition / rowHeight);
          var firstRow = Math.floor(newTopPosition / rowHeight);
          var currentRowTop = rowHeight * currentRow;
          var firstRowTop = rowHeight * firstRow;
          var collectionLength = this.collectionLength;

          var setAfter = function setAfter(no) {
            var row = _this2.rowCache[no];
            _this2.setRowTopValue(row, currentRowTop);
            currentRowTop = currentRowTop + rowHeight;
          };

          var setBefore = function setBefore(no) {
            var row = _this2.rowCache[no];
            firstRowTop = firstRowTop - rowHeight;
            _this2.setRowTopValue(row, firstRowTop);
          };

          var setHiddenFromView = function setHiddenFromView(no) {
            var row = _this2.rowCache[no];
            _this2.setRowTopValue(row, -(currentRowTop + rowHeight * 50));
          };

          for (var i = 0; i < this.cacheLength; i++) {
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

          this.rowCache.sort(function (a, b) {
            return parseInt(a.top) - parseInt(b.top);
          });

          this.triggerRebindAllRowsEvent(downScroll, this.rowCache);
        };

        RowScrollEvents.prototype.addEventListener = function addEventListener() {
          this.onScrollBinded = this.onScroll.bind(this);
          this.element.addEventListener("avg-scroll", this.onScrollBinded);
        };

        RowScrollEvents.prototype.removeEventListener = function removeEventListener() {
          this.element.removeEventListener("avg-scroll", this.onScrollBinded);
        };

        RowScrollEvents.prototype.setCollectionLength = function setCollectionLength(length) {
          this.collectionLength = length;
        };

        RowScrollEvents.prototype.triggerRebindRowEvent = function triggerRebindRowEvent(currentRow, rowCache, downScroll) {
          var event = new CustomEvent("avg-rebind-row", {
            detail: {
              currentRow: currentRow,
              rowCache: rowCache,
              downScroll: downScroll
            },
            bubbles: false
          });
          this.element.dispatchEvent(event);
        };

        RowScrollEvents.prototype.triggerRebindAllRowsEvent = function triggerRebindAllRowsEvent(downScroll, rowCache) {
          var event = new CustomEvent("avg-rebind-all-rows", {
            detail: {
              downScroll: downScroll,
              rowCache: rowCache
            },
            bubbles: false
          });
          this.element.dispatchEvent(event);
        };

        _createClass(RowScrollEvents, [{
          key: "contentHeight",
          get: function get() {
            return this.htmlCache.avg_content_main.offsetHeight;
          }
        }]);

        return RowScrollEvents;
      }());

      _export("RowScrollEvents", RowScrollEvents);
    }
  };
});
//# sourceMappingURL=rowScrollEvents.js.map
