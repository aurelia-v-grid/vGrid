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

          this.vGridGenerator.fillDataInRows();
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
                this.vGridGenerator.insertRowMarkup(currentRow, row, isDownScroll, false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zY3JvbGwtZXZlbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBTWEsaUI7QUFFWCxtQ0FBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLGFBQUwsR0FBcUIsQ0FBckI7QUFDQSxlQUFLLGNBQUwsR0FBc0IsQ0FBdEI7QUFDQSxlQUFLLG9CQUFMLEdBQTRCLEtBQTVCO0FBQ0EsZUFBSyx1QkFBTCxHQUErQixJQUEvQjtBQUNBLGVBQUssY0FBTCxHQUFzQixJQUF0QjtBQUNEOztvQ0E2REQsYSw0QkFBZ0I7QUFBQTs7QUFFZCxlQUFLLGFBQUwsR0FBcUIsS0FBSyxjQUFMLENBQW9CLGNBQXBCLENBQW1DLFNBQXhEOztBQUVBLGNBQUksS0FBSyxXQUFMLENBQWlCLG1CQUFqQixNQUEwQyxLQUFLLGNBQUwsQ0FBb0IsZUFBcEIsQ0FBb0MsTUFBbEYsRUFBMEY7QUFDeEYsaUJBQUssYUFBTCxHQUFxQixDQUFyQjtBQUNEOztBQUlELGNBQUksWUFBWSxLQUFLLFdBQUwsQ0FBaUIsWUFBakM7QUFDQSxjQUFJLGFBQWEsS0FBSyxjQUFMLENBQW9CLGNBQXBCLENBQW1DLFlBQXBEO0FBQ0EsY0FBSSxhQUFhLFNBQVMsS0FBSyxhQUFMLEdBQXFCLFNBQTlCLEVBQXlDLEVBQXpDLENBQWpCO0FBQ0EsY0FBSSxXQUFXLFNBQVMsS0FBSyxjQUFMLENBQW9CLGNBQXBCLENBQW1DLFNBQW5DLEdBQStDLFNBQXhELEVBQW1FLEVBQW5FLENBQWY7QUFDQSxjQUFJLGdCQUFnQixZQUFZLFVBQWhDO0FBQ0EsY0FBSSxjQUFjLFlBQVksUUFBOUI7QUFDQSxjQUFJLG1CQUFtQixLQUFLLFdBQUwsQ0FBaUIsbUJBQWpCLEVBQXZCOztBQUlBLGNBQUksV0FBVyxTQUFYLFFBQVcsQ0FBQyxjQUFELEVBQW9CO0FBQ2pDLGdCQUFJLE1BQU0sTUFBSyxjQUFMLENBQW9CLGVBQXBCLENBQW9DLGNBQXBDLENBQVY7QUFDQSxrQkFBSyxjQUFMLENBQW9CLGNBQXBCLENBQW1DLENBQUMsR0FBRCxDQUFuQyxFQUEwQyxDQUExQyxFQUE2QyxhQUE3QztBQUNBLDRCQUFnQixnQkFBZ0IsU0FBaEM7QUFDRCxXQUpEOztBQVFBLGNBQUksWUFBWSxTQUFaLFNBQVksQ0FBQyxjQUFELEVBQW9CO0FBQ2xDLGdCQUFJLE1BQU0sTUFBSyxjQUFMLENBQW9CLGVBQXBCLENBQW9DLGNBQXBDLENBQVY7QUFDQSwwQkFBYyxjQUFjLFNBQTVCO0FBQ0Esa0JBQUssY0FBTCxDQUFvQixjQUFwQixDQUFtQyxDQUFDLEdBQUQsQ0FBbkMsRUFBMEMsQ0FBMUMsRUFBNkMsV0FBN0M7QUFDRCxXQUpEOztBQVFBLGNBQUksb0JBQW9CLFNBQXBCLGlCQUFvQixDQUFDLGNBQUQsRUFBb0I7QUFDMUMsZ0JBQUksTUFBTSxNQUFLLGNBQUwsQ0FBb0IsZUFBcEIsQ0FBb0MsY0FBcEMsQ0FBVjtBQUNBLGtCQUFLLGNBQUwsQ0FBb0IsY0FBcEIsQ0FBbUMsQ0FBQyxHQUFELENBQW5DLEVBQTBDLENBQTFDLEVBQTZDLEVBQUUsZ0JBQWlCLE1BQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxFQUFuRCxDQUE3QztBQUNELFdBSEQ7O0FBTUEsZUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssY0FBTCxDQUFvQixpQkFBcEIsRUFBcEIsRUFBNkQsR0FBN0QsRUFBa0U7QUFDaEUsZ0JBQUksUUFBUSxLQUFaO0FBQ0Esb0JBQVEsSUFBUjtBQUNFLG1CQUFLLGNBQWMsQ0FBZCxJQUFtQixjQUFjLG1CQUFtQixDQUF6RDtBQUNFLHlCQUFTLENBQVQ7QUFDQSx3QkFBUSxJQUFSO0FBQ0E7QUFDRixtQkFBSyxjQUFjLGdCQUFkLElBQW1DLG1CQUFtQixTQUFwQixJQUFrQyxVQUF6RTtBQUNFLDBCQUFVLENBQVY7QUFDQSx3QkFBUSxJQUFSO0FBQ0E7QUFSSjtBQVVBLGdCQUFJLENBQUMsS0FBTCxFQUFZO0FBQ1Ysa0JBQUksY0FBYyxnQkFBZCxJQUFtQyxnQkFBZ0IsU0FBakIsSUFBK0IsVUFBckUsRUFBaUY7QUFDL0Usa0NBQWtCLENBQWxCO0FBQ0QsZUFGRCxNQUVPO0FBRUwsb0JBQUksY0FBYyxnQkFBbEIsRUFBb0M7QUFDbEMsMkJBQVMsQ0FBVDtBQUNEO0FBQ0Y7QUFDRjs7QUFFRDtBQUNEOztBQUlELGVBQUssY0FBTCxDQUFvQixlQUFwQixDQUFvQyxJQUFwQyxDQUNFLFVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0I7QUFDZCxtQkFBTyxTQUFTLEVBQUUsR0FBWCxJQUFrQixTQUFTLEVBQUUsR0FBWCxDQUF6QjtBQUNELFdBSEg7O0FBTUEsZUFBSyxjQUFMLENBQW9CLGNBQXBCO0FBQ0QsUzs7b0NBTUQsYSwwQkFBYyxZLEVBQWMsZ0IsRUFBa0I7QUFHNUMsY0FBSSxtQkFBbUIsS0FBSyxjQUFMLENBQW9CLGNBQXBCLENBQW1DLFNBQTFEO0FBQ0EsY0FBSSxLQUFLLG9CQUFMLEtBQThCLEtBQWxDLEVBQXlDOztBQUd2QyxnQkFBSSxXQUFKO0FBQ0EsZ0JBQUksYUFBYSxTQUFVLEtBQUssYUFBTCxHQUFxQixLQUFLLFdBQUwsQ0FBaUIsWUFBaEQsRUFBK0QsRUFBL0QsQ0FBakI7QUFDQSxnQkFBSSxtQkFBbUIsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLEtBQUssY0FBTCxDQUFvQixpQkFBcEIsRUFBdkQ7QUFDQSxnQkFBSSxZQUFZLEtBQUssV0FBTCxDQUFpQixZQUFqQzs7QUFHQSxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssY0FBTCxDQUFvQixpQkFBcEIsRUFBcEIsRUFBNkQsR0FBN0QsRUFBa0U7O0FBRWhFLGtCQUFJLE1BQU0sS0FBSyxjQUFMLENBQW9CLGVBQXBCLENBQW9DLENBQXBDLENBQVY7QUFDQSxrQkFBSSxTQUFTLFNBQVMsSUFBSSxHQUFiLEVBQWtCLEVBQWxCLENBQWI7QUFDQSxrQkFBSSxTQUFTLEtBQWI7O0FBR0Esa0JBQUksWUFBSixFQUFrQjtBQUNoQixxQkFBSyxjQUFMLEdBQXNCLE1BQXRCO0FBQ0Esb0JBQUksU0FBVSxtQkFBbUIsU0FBakMsRUFBNkM7QUFDM0MsMkJBQVMsSUFBVDtBQUNBLGdDQUFjLFNBQVMsZ0JBQXZCO0FBQ0EsK0JBQWEsQ0FBQyxTQUFTLGdCQUFWLElBQThCLFNBQTNDO0FBQ0Q7O0FBR0Qsb0JBQUksU0FBVSxDQUFDLEtBQUssV0FBTCxDQUFpQixtQkFBakIsS0FBeUMsQ0FBMUMsSUFBK0MsU0FBekQsSUFBdUUsU0FBUyxLQUFLLGNBQUwsQ0FBb0IsYUFBeEcsRUFBdUg7QUFDckgsMkJBQVMsS0FBVDtBQUNBLHVCQUFLLGNBQUwsQ0FBb0IsY0FBcEIsQ0FBbUMsQ0FBQyxHQUFELENBQW5DLEVBQTBDLENBQTFDLEVBQTZDLEVBQUcsWUFBWSxDQUFiLEdBQW1CLFlBQVksRUFBakMsQ0FBN0M7QUFDRDtBQUVGLGVBZEQsTUFjTztBQUNMLHFCQUFLLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxvQkFBSSxTQUFVLG1CQUFtQixLQUFLLGNBQUwsQ0FBb0IsYUFBckQsRUFBcUU7QUFDbkUsMkJBQVMsSUFBVDtBQUNBLGdDQUFjLFNBQVMsZ0JBQXZCO0FBQ0EsK0JBQWEsQ0FBQyxTQUFTLGdCQUFWLElBQThCLFNBQTNDO0FBQ0Q7QUFFRjs7QUFHRCxrQkFBSSxXQUFXLElBQVgsSUFBbUIsY0FBYyxDQUFqQyxJQUFzQyxjQUFjLEtBQUssV0FBTCxDQUFpQixtQkFBakIsS0FBeUMsQ0FBakcsRUFBb0c7QUFDbEcscUJBQUssY0FBTCxDQUFvQixjQUFwQixDQUFtQyxDQUFDLEdBQUQsQ0FBbkMsRUFBMEMsQ0FBMUMsRUFBNkMsV0FBN0M7QUFDQSxxQkFBSyxjQUFMLENBQW9CLGVBQXBCLENBQW9DLFVBQXBDLEVBQWdELEdBQWhELEVBQXFELFlBQXJELEVBQW1FLEtBQW5FO0FBQ0Q7QUFFRjs7QUFHRCxpQkFBSyxjQUFMLENBQW9CLGVBQXBCLENBQW9DLElBQXBDLENBQ0UsVUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQjtBQUNkLHFCQUFPLFNBQVMsRUFBRSxHQUFYLElBQWtCLFNBQVMsRUFBRSxHQUFYLENBQXpCO0FBQ0QsYUFISDtBQUtELFdBdERELE1Bc0RPO0FBR0wsaUJBQUssb0JBQUw7QUFDRDtBQUVGLFM7O29DQU9ELG9CLG1DQUF1QjtBQUFBOztBQUVyQixlQUFLLG9CQUFMLEdBQTRCLElBQTVCOztBQUdBLGNBQUksVUFBVSxLQUFLLFdBQUwsQ0FBaUIsa0JBQS9COztBQUdBLHVCQUFhLEtBQUssdUJBQWxCOztBQUdBLGVBQUssdUJBQUwsR0FBK0IsV0FBVyxZQUFNO0FBQzlDLG1CQUFLLGFBQUw7QUFDQSxtQkFBSyxvQkFBTCxHQUE0QixLQUE1QjtBQUNELFdBSDhCLEVBRzVCLE9BSDRCLENBQS9CO0FBTUQsUzs7b0NBTUQsa0IsaUNBQXFCOztBQUduQixjQUFJLG1CQUFtQixLQUFLLGNBQUwsQ0FBb0IsY0FBcEIsQ0FBbUMsU0FBMUQ7QUFDQSxjQUFJLG9CQUFvQixLQUFLLGNBQUwsQ0FBb0IsY0FBcEIsQ0FBbUMsVUFBM0Q7O0FBSUEsY0FBSSxxQkFBcUIsS0FBSyxhQUE5QixFQUE2QztBQUkzQyxnQkFBSSxzQkFBc0IsQ0FBMUIsRUFBNkI7QUFDM0IsbUJBQUssY0FBTCxDQUFvQixjQUFwQixDQUFtQyxVQUFuQyxHQUFnRCxLQUFLLGNBQXJEO0FBQ0EsbUJBQUssY0FBTCxDQUFvQixhQUFwQixDQUFrQyxVQUFsQyxHQUErQyxLQUFLLGNBQXBEO0FBQ0Q7O0FBR0QsZ0JBQUksZUFBZSxJQUFuQjtBQUNBLGdCQUFJLG1CQUFtQixLQUFLLGFBQTVCLEVBQTJDO0FBQ3pDLDZCQUFlLEtBQWY7QUFDRDs7QUFHRCxnQkFBSSxhQUFKO0FBQ0Esb0JBQVEsSUFBUjtBQUNFLG1CQUFLLG1CQUFtQixLQUFLLGFBQUwsR0FBcUIsS0FBSyxXQUFMLENBQWlCLGdCQUE5RDtBQUNBLG1CQUFLLG1CQUFtQixLQUFLLGFBQUwsR0FBcUIsS0FBSyxXQUFMLENBQWlCLGdCQUE5RDtBQUNFLGdDQUFnQixJQUFoQjtBQUNBO0FBQ0Y7QUFDRSxnQ0FBZ0IsS0FBaEI7QUFOSjs7QUFVQSxpQkFBSyxhQUFMLEdBQXFCLGdCQUFyQjs7QUFHQSxnQkFBSSxhQUFKLEVBQW1CO0FBRWpCLGtCQUFJLEtBQUssV0FBTCxDQUFpQiwwQkFBckIsRUFBaUQ7QUFDL0MscUJBQUssYUFBTDtBQUNELGVBRkQsTUFFTztBQUNMLHFCQUFLLG9CQUFMO0FBQ0Q7QUFDRixhQVBELE1BT087QUFDTCxtQkFBSyxhQUFMLENBQW1CLFlBQW5CLEVBQWlDLGdCQUFqQztBQUNEO0FBQ0YsV0F4Q0QsTUF3Q087O0FBRUwsZ0JBQUksS0FBSyxjQUFMLENBQW9CLGNBQXBCLENBQW1DLEtBQW5DLENBQXlDLFNBQXpDLEtBQXVELFFBQTNELEVBQXFFO0FBRW5FLG1CQUFLLGNBQUwsQ0FBb0IsY0FBcEIsQ0FBbUMsVUFBbkMsR0FBZ0QsQ0FBaEQ7QUFDQSxtQkFBSyxjQUFMLEdBQXNCLENBQXRCO0FBQ0EsbUJBQUssY0FBTCxDQUFvQixhQUFwQixDQUFrQyxVQUFsQyxHQUErQyxDQUEvQztBQUNELGFBTEQsTUFLTztBQUNMLGtCQUFJLEtBQUssY0FBTCxLQUF3QixpQkFBNUIsRUFBK0M7QUFDN0Msb0NBQW9CLEtBQUssY0FBTCxDQUFvQixjQUFwQixDQUFtQyxVQUF2RDtBQUNBLHFCQUFLLGNBQUwsR0FBc0IsaUJBQXRCO0FBQ0EscUJBQUssY0FBTCxDQUFvQixhQUFwQixDQUFrQyxVQUFsQyxHQUErQyxpQkFBL0M7QUFDRDtBQUNGO0FBQ0Y7QUFDRixTOzs7OzhCQTNTb0I7QUFDbkIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsY0FBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVvQjtBQUNuQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxjQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRWlCO0FBQ2hCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLFdBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFcUI7QUFDcEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsZUFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVrQjtBQUNqQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxPQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRW1CO0FBQ2xCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGFBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFb0I7QUFDbkIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsY0FBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRiIsImZpbGUiOiJ2R3JpZC92LWdyaWQtc2Nyb2xsLWV2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
