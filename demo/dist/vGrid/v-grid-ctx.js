"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, VGridCtx;

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

      _export("VGridCtx", VGridCtx = function () {
        function VGridCtx(vGrid) {
          _classCallCheck(this, VGridCtx);

          this.vGrid = vGrid;
        }

        VGridCtx.prototype.setData = function setData(data) {
          this.vGridConfig.remoteLimit = data.limit || 40;
          this.vGridConfig.remoteLength = data.length || 0;
          this.vGridConfig.remoteOffset = data.offset || 0;
          this.keepFilterOnCollectionChange();
          this.vGrid.vGridCollection = data.col || [];
          this.setLoadingOverlay(false);
          this.vGrid.vGridPager.updatePager({
            limit: this.vGridConfig.remoteLimit,
            offset: this.vGridConfig.remoteOffset,
            length: this.vGridConfig.remoteLength
          });
        };

        VGridCtx.prototype.keepFilterOnCollectionChange = function keepFilterOnCollectionChange() {
          this.vGridConfig.keepFilterOnCollectionChange = true;
        };

        VGridCtx.prototype.rebuildColumns = function rebuildColumns() {
          this.vGridGenerator.rebuildColumns();
        };

        VGridCtx.prototype.scrollBottom = function scrollBottom() {
          var collectionLength = this.vGridConfig.getCollectionLength();
          this.contentElement.scrollTop = collectionLength * this.vGridConfig.attRowHeight;
        };

        VGridCtx.prototype.scrollTop = function scrollTop() {
          this.vGridGenerator.contentElement.scrollTop = 0;
        };

        VGridCtx.prototype.setScrollTop = function setScrollTop(newTop) {
          this.vGridGenerator.contentElement.scrollTop = newTop;
        };

        VGridCtx.prototype.rebuildColumnsRows = function rebuildColumnsRows() {
          this.vGridGenerator.rebuildColumnsRows();
        };

        VGridCtx.prototype.columnChangeAndCollection = function columnChangeAndCollection(resetScrollToTop) {
          this.vGridGenerator.columnChangeAndCollection(resetScrollToTop);
        };

        VGridCtx.prototype.redrawGrid = function redrawGrid() {
          this.vGridGenerator.redrawGrid();
        };

        VGridCtx.prototype.setColumns = function setColumns(paramObj) {
          this.vGridConfig.colConfig = paramObj.colConfig;
        };

        VGridCtx.prototype.getColumns = function getColumns() {
          var arr = [];
          this.vGridConfig.colConfig.forEach(function (obj) {
            var x = {};
            for (var k in obj) {
              if (obj.hasOwnProperty(k)) {
                if (x[k] !== obj[k]) {
                  x[k] = obj[k];
                }
              }
            }
            arr.push(x);
          });
          return {
            "colConfig": arr
          };
        };

        VGridCtx.prototype.getMaxRows = function getMaxRows() {
          var supportedHeight = 10000;
          var testUpTo = navigator.userAgent.toLowerCase().match(/firefox/) ? 8947840 : 1000000000;
          var div = document.createElement("div");

          document.body.appendChild(div);

          while (true) {
            var test = supportedHeight + 10000;
            div.style.height = test + "px";
            if (test > testUpTo || div.clientHeight !== test) {
              break;
            } else {
              supportedHeight = test;
            }
          }
          document.body.removeChild(div);
          var total = Math.ceil(supportedHeight / this.vGridConfig.attRowHeight);
          return total + ", error margin:" + Math.ceil(10000 / this.vGridConfig.attRowHeight);
        };

        VGridCtx.prototype.scrollBottomNext = function scrollBottomNext() {
          this.vGridGenerator.scrollBottomOnNext = true;
        };

        VGridCtx.prototype.setLoadingOverlay = function setLoadingOverlay(value) {
          this.vGrid.loading = value === true ? true : false;
        };

        VGridCtx.prototype.getScrollTop = function getScrollTop() {
          return this.vGridGenerator.contentElement.scrollTop;
        };

        _createClass(VGridCtx, [{
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
          key: "vGridFilter",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridFilter;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridSort",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridSort;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridObservables",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridObservables;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridGenerator",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridGenerator;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridCurrentEntityRef",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCurrentEntityRef;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridRowKey",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridRowKey;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridCollectionFiltered",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCollectionFiltered;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridCollection",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCollection;
            } else {
              return null;
            }
          }
        }]);

        return VGridCtx;
      }());

      _export("VGridCtx", VGridCtx);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jdHguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFPYSxRO0FBRVgsMEJBQVksS0FBWixFQUFtQjtBQUFBOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7OzJCQWtJRCxPLG9CQUFRLEksRUFBTTtBQUNaLGVBQUssV0FBTCxDQUFpQixXQUFqQixHQUErQixLQUFLLEtBQUwsSUFBYyxFQUE3QztBQUNBLGVBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxLQUFLLE1BQUwsSUFBZSxDQUEvQztBQUNBLGVBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxLQUFLLE1BQUwsSUFBZSxDQUEvQztBQUNBLGVBQUssNEJBQUw7QUFDQSxlQUFLLEtBQUwsQ0FBVyxlQUFYLEdBQTZCLEtBQUssR0FBTCxJQUFZLEVBQXpDO0FBQ0EsZUFBSyxpQkFBTCxDQUF1QixLQUF2QjtBQUNBLGVBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsV0FBdEIsQ0FBa0M7QUFDaEMsbUJBQVEsS0FBSyxXQUFMLENBQWlCLFdBRE87QUFFaEMsb0JBQVMsS0FBSyxXQUFMLENBQWlCLFlBRk07QUFHaEMsb0JBQVMsS0FBSyxXQUFMLENBQWlCO0FBSE0sV0FBbEM7QUFLRCxTOzsyQkFNRCw0QiwyQ0FBK0I7QUFDN0IsZUFBSyxXQUFMLENBQWlCLDRCQUFqQixHQUFnRCxJQUFoRDtBQUNELFM7OzJCQU1ELGMsNkJBQWlCO0FBQ2YsZUFBSyxjQUFMLENBQW9CLGNBQXBCO0FBQ0QsUzs7MkJBS0QsWSwyQkFBZTtBQUNiLGNBQUksbUJBQW1CLEtBQUssV0FBTCxDQUFpQixtQkFBakIsRUFBdkI7QUFDQSxlQUFLLGNBQUwsQ0FBb0IsU0FBcEIsR0FBZ0MsbUJBQW1CLEtBQUssV0FBTCxDQUFpQixZQUFwRTtBQUNELFM7OzJCQU1ELFMsd0JBQVk7QUFDVixlQUFLLGNBQUwsQ0FBb0IsY0FBcEIsQ0FBbUMsU0FBbkMsR0FBK0MsQ0FBL0M7QUFDRCxTOzsyQkFJRCxZLHlCQUFhLE0sRUFBUTtBQUNuQixlQUFLLGNBQUwsQ0FBb0IsY0FBcEIsQ0FBbUMsU0FBbkMsR0FBK0MsTUFBL0M7QUFDRCxTOzsyQkFNRCxrQixpQ0FBcUI7QUFDbkIsZUFBSyxjQUFMLENBQW9CLGtCQUFwQjtBQUNELFM7OzJCQU1ELHlCLHNDQUEwQixnQixFQUFrQjtBQUMxQyxlQUFLLGNBQUwsQ0FBb0IseUJBQXBCLENBQThDLGdCQUE5QztBQUNELFM7OzJCQU1ELFUseUJBQWE7QUFDWCxlQUFLLGNBQUwsQ0FBb0IsVUFBcEI7QUFDRCxTOzsyQkFNRCxVLHVCQUFXLFEsRUFBVTtBQUNuQixlQUFLLFdBQUwsQ0FBaUIsU0FBakIsR0FBNkIsU0FBUyxTQUF0QztBQUNELFM7OzJCQU1ELFUseUJBQWE7QUFDWCxjQUFJLE1BQU0sRUFBVjtBQUNBLGVBQUssV0FBTCxDQUFpQixTQUFqQixDQUEyQixPQUEzQixDQUFtQyxVQUFDLEdBQUQsRUFBUTtBQUN6QyxnQkFBSSxJQUFJLEVBQVI7QUFDQSxpQkFBSyxJQUFJLENBQVQsSUFBYyxHQUFkLEVBQW1CO0FBQ2pCLGtCQUFJLElBQUksY0FBSixDQUFtQixDQUFuQixDQUFKLEVBQTJCO0FBQ3pCLG9CQUFJLEVBQUUsQ0FBRixNQUFTLElBQUksQ0FBSixDQUFiLEVBQXFCO0FBQ25CLG9CQUFFLENBQUYsSUFBTyxJQUFJLENBQUosQ0FBUDtBQUNEO0FBQ0Y7QUFDRjtBQUNELGdCQUFJLElBQUosQ0FBUyxDQUFUO0FBQ0QsV0FWRDtBQVdBLGlCQUFPO0FBQ0wseUJBQWE7QUFEUixXQUFQO0FBR0QsUzs7MkJBTUQsVSx5QkFBYTtBQUVYLGNBQUksa0JBQWtCLEtBQXRCO0FBQ0EsY0FBSSxXQUFXLFVBQVUsU0FBVixDQUFvQixXQUFwQixHQUFrQyxLQUFsQyxDQUF3QyxTQUF4QyxJQUFxRCxPQUFyRCxHQUErRCxVQUE5RTtBQUNBLGNBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVjs7QUFFQSxtQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixHQUExQjs7QUFFQSxpQkFBTyxJQUFQLEVBQWE7QUFDWCxnQkFBSSxPQUFPLGtCQUFrQixLQUE3QjtBQUNBLGdCQUFJLEtBQUosQ0FBVSxNQUFWLEdBQW1CLE9BQU8sSUFBMUI7QUFDQSxnQkFBSSxPQUFPLFFBQVAsSUFBbUIsSUFBSSxZQUFKLEtBQXFCLElBQTVDLEVBQWtEO0FBQ2hEO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsZ0NBQWtCLElBQWxCO0FBQ0Q7QUFDRjtBQUNELG1CQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLEdBQTFCO0FBQ0EsY0FBSSxRQUFRLEtBQUssSUFBTCxDQUFVLGtCQUFrQixLQUFLLFdBQUwsQ0FBaUIsWUFBN0MsQ0FBWjtBQUNBLGlCQUFRLFFBQVEsaUJBQVIsR0FBNEIsS0FBSyxJQUFMLENBQVUsUUFBUSxLQUFLLFdBQUwsQ0FBaUIsWUFBbkMsQ0FBcEM7QUFDRCxTOzsyQkFNRCxnQiwrQkFBbUI7QUFDakIsZUFBSyxjQUFMLENBQW9CLGtCQUFwQixHQUF5QyxJQUF6QztBQUNELFM7OzJCQU1ELGlCLDhCQUFrQixLLEVBQU87QUFDdkIsZUFBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixVQUFVLElBQVYsR0FBaUIsSUFBakIsR0FBd0IsS0FBN0M7QUFDRCxTOzsyQkFNRCxZLDJCQUFlO0FBQ2IsaUJBQU8sS0FBSyxjQUFMLENBQW9CLGNBQXBCLENBQW1DLFNBQTFDO0FBQ0QsUzs7Ozs4QkF0Um9CO0FBQ25CLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGNBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFaUI7QUFDaEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVxQjtBQUNwQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxlQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRWtCO0FBQ2pCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLE9BQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFbUI7QUFDbEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsYUFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQVVvQjtBQUNuQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxjQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRWlCO0FBQ2hCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLFdBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFZTtBQUNkLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLFNBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFc0I7QUFDckIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsZ0JBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFb0I7QUFDbkIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsY0FBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUUyQjtBQUMxQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxxQkFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVpQjtBQUNoQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRTZCO0FBQzVCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLHVCQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRXFCO0FBQ3BCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGVBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0YiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWN0eC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
