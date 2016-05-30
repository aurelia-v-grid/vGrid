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
          this.vGridGenerator.scrollBottom();
        };

        VGridCtx.prototype.scrollTop = function scrollTop() {
          this.vGridGenerator.scrollTop();
        };

        VGridCtx.prototype.setScrollTop = function setScrollTop(newTop) {
          this.vGridGenerator.setScrollTop(newTop);
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
          return this.vGridGenerator.setColumns(paramObj);
        };

        VGridCtx.prototype.getColumns = function getColumns() {
          return this.vGridGenerator.getColumns();
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
          this.vGridGenerator.scrollBottomNext();
        };

        VGridCtx.prototype.setLoadingOverlay = function setLoadingOverlay(value) {
          this.vGrid.loading = value === true ? true : false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jdHguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFPYSxRO0FBRVgsMEJBQVksS0FBWixFQUFtQjtBQUFBOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7OzJCQStIRCxPLG9CQUFRLEksRUFBTTtBQUNaLGVBQUssV0FBTCxDQUFpQixXQUFqQixHQUErQixLQUFLLEtBQUwsSUFBYyxFQUE3QztBQUNBLGVBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxLQUFLLE1BQUwsSUFBZSxDQUEvQztBQUNBLGVBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxLQUFLLE1BQUwsSUFBZSxDQUEvQztBQUNBLGVBQUssNEJBQUw7QUFDQSxlQUFLLEtBQUwsQ0FBVyxlQUFYLEdBQTZCLEtBQUssR0FBTCxJQUFZLEVBQXpDO0FBQ0EsZUFBSyxpQkFBTCxDQUF1QixLQUF2QjtBQUNBLGVBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsV0FBdEIsQ0FBa0M7QUFDaEMsbUJBQVEsS0FBSyxXQUFMLENBQWlCLFdBRE87QUFFaEMsb0JBQVMsS0FBSyxXQUFMLENBQWlCLFlBRk07QUFHaEMsb0JBQVMsS0FBSyxXQUFMLENBQWlCO0FBSE0sV0FBbEM7QUFLRCxTOzsyQkFHRCw0QiwyQ0FBK0I7QUFDN0IsZUFBSyxXQUFMLENBQWlCLDRCQUFqQixHQUFnRCxJQUFoRDtBQUNELFM7OzJCQUdELGMsNkJBQWlCO0FBQ2YsZUFBSyxjQUFMLENBQW9CLGNBQXBCO0FBQ0QsUzs7MkJBR0QsWSwyQkFBZTtBQUNiLGVBQUssY0FBTCxDQUFvQixZQUFwQjtBQUNELFM7OzJCQUlELFMsd0JBQVk7QUFDVixlQUFLLGNBQUwsQ0FBb0IsU0FBcEI7QUFDRCxTOzsyQkFJRCxZLHlCQUFhLE0sRUFBUTtBQUNuQixlQUFLLGNBQUwsQ0FBb0IsWUFBcEIsQ0FBaUMsTUFBakM7QUFDRCxTOzsyQkFJRCxrQixpQ0FBcUI7QUFDbkIsZUFBSyxjQUFMLENBQW9CLGtCQUFwQjtBQUNELFM7OzJCQUlELHlCLHNDQUEwQixnQixFQUFrQjtBQUMxQyxlQUFLLGNBQUwsQ0FBb0IseUJBQXBCLENBQThDLGdCQUE5QztBQUNELFM7OzJCQUlELFUseUJBQWE7QUFDWCxlQUFLLGNBQUwsQ0FBb0IsVUFBcEI7QUFDRCxTOzsyQkFJRCxVLHVCQUFXLFEsRUFBVTtBQUNuQixpQkFBTyxLQUFLLGNBQUwsQ0FBb0IsVUFBcEIsQ0FBK0IsUUFBL0IsQ0FBUDtBQUNELFM7OzJCQUlELFUseUJBQWE7QUFDWCxpQkFBTyxLQUFLLGNBQUwsQ0FBb0IsVUFBcEIsRUFBUDtBQUNELFM7OzJCQUlELFUseUJBQWE7QUFFWCxjQUFJLGtCQUFrQixLQUF0QjtBQUNBLGNBQUksV0FBVyxVQUFVLFNBQVYsQ0FBb0IsV0FBcEIsR0FBa0MsS0FBbEMsQ0FBd0MsU0FBeEMsSUFBcUQsT0FBckQsR0FBK0QsVUFBOUU7QUFDQSxjQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVY7O0FBRUEsbUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsR0FBMUI7O0FBRUEsaUJBQU8sSUFBUCxFQUFhO0FBQ1gsZ0JBQUksT0FBTyxrQkFBa0IsS0FBN0I7QUFDQSxnQkFBSSxLQUFKLENBQVUsTUFBVixHQUFtQixPQUFPLElBQTFCO0FBQ0EsZ0JBQUksT0FBTyxRQUFQLElBQW1CLElBQUksWUFBSixLQUFxQixJQUE1QyxFQUFrRDtBQUNoRDtBQUNELGFBRkQsTUFFTztBQUNMLGdDQUFrQixJQUFsQjtBQUNEO0FBQ0Y7QUFDRCxtQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixHQUExQjtBQUNBLGNBQUksUUFBUSxLQUFLLElBQUwsQ0FBVSxrQkFBa0IsS0FBSyxXQUFMLENBQWlCLFlBQTdDLENBQVo7QUFDQSxpQkFBUSxRQUFRLGlCQUFSLEdBQTRCLEtBQUssSUFBTCxDQUFVLFFBQVEsS0FBSyxXQUFMLENBQWlCLFlBQW5DLENBQXBDO0FBQ0QsUzs7MkJBR0QsZ0IsK0JBQW1CO0FBQ2pCLGVBQUssY0FBTCxDQUFvQixnQkFBcEI7QUFDRCxTOzsyQkFJRCxpQiw4QkFBa0IsSyxFQUFPO0FBQ3ZCLGVBQUssS0FBTCxDQUFXLE9BQVgsR0FBcUIsVUFBVSxJQUFWLEdBQWlCLElBQWpCLEdBQXdCLEtBQTdDO0FBQ0QsUzs7Ozs4QkFqT29CO0FBQ25CLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGNBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFaUI7QUFDaEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVxQjtBQUNwQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxlQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRWtCO0FBQ2pCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLE9BQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFbUI7QUFDbEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsYUFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQVVvQjtBQUNuQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxjQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRWlCO0FBQ2hCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLFdBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFZTtBQUNkLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLFNBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFc0I7QUFDckIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsZ0JBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFb0I7QUFDbkIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsY0FBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUUyQjtBQUMxQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxxQkFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVpQjtBQUNoQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRTZCO0FBQzVCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLHVCQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRXFCO0FBQ3BCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGVBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0YiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWN0eC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
