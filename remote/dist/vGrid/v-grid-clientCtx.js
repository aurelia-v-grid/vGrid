"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, VGridClientCtx;

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

      _export("VGridClientCtx", VGridClientCtx = function () {
        function VGridClientCtx(vGrid) {
          _classCallCheck(this, VGridClientCtx);

          this.vGrid = vGrid;
        }

        VGridClientCtx.prototype.collectionChange = function collectionChange(resetScrollToTop, scrollBottom) {
          this.vGridGenerator.collectionChange(resetScrollToTop, scrollBottom);
        };

        VGridClientCtx.prototype.setSorting = function setSorting(x) {
          this.vGridSort.setFilter(x);
        };

        VGridClientCtx.prototype.keepFilterOnCollectionChange = function keepFilterOnCollectionChange() {
          this.vGridConfig.keepFilterOnCollectionChange = true;
        };

        VGridClientCtx.prototype.runSorting = function runSorting(x) {
          var _this = this;

          if (this.vGridCollection.length > this.vGridConfig.loadingThreshold) {
            this.vGrid.loading = true;
          }
          setTimeout(function () {
            _this.vGridSort.run(_this.vGrid.vGridCollectionFiltered);
            _this.vGrid.loading = false;
          }, 10);
        };

        VGridClientCtx.prototype.runFilter = function runFilter(filterObj) {
          this.vGridConfig.addFilter = true;
          this.vGridConfig.onFilterRun(filterObj);
        };

        VGridClientCtx.prototype.rebuildColumns = function rebuildColumns() {
          this.vGridGenerator.rebuildColumns();
        };

        VGridClientCtx.prototype.scrollBottom = function scrollBottom() {
          this.vGridGenerator.scrollBottom();
        };

        VGridClientCtx.prototype.scrollTop = function scrollTop() {
          this.vGridGenerator.scrollTop();
        };

        VGridClientCtx.prototype.setScrollTop = function setScrollTop(newTop) {
          this.vGridGenerator.setScrollTop(newTop);
        };

        VGridClientCtx.prototype.rebuildColumnsRows = function rebuildColumnsRows() {
          this.vGridGenerator.rebuildColumnsRows();
        };

        VGridClientCtx.prototype.columnChangeAndCollection = function columnChangeAndCollection(resetScrollToTop) {
          this.vGridGenerator.columnChangeAndCollection(resetScrollToTop);
        };

        VGridClientCtx.prototype.redrawGrid = function redrawGrid() {
          this.vGridGenerator.redrawGrid();
        };

        VGridClientCtx.prototype.setColumns = function setColumns(paramObj) {
          return this.vGridGenerator.setColumns(paramObj);
        };

        VGridClientCtx.prototype.getColumns = function getColumns() {
          return this.vGridGenerator.getColumns();
        };

        VGridClientCtx.prototype.getMaxRows = function getMaxRows() {
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
          return supportedHeight / this.vGridConfig.rowHeight + ", error margin:" + 10000 / this.vGridConfig.rowHeight;
        };

        VGridClientCtx.prototype.scrollBottomNext = function scrollBottomNext() {
          this.vGridGenerator.scrollBottomNext();
        };

        VGridClientCtx.prototype.setLoadingOverlay = function setLoadingOverlay(value) {
          this.vGrid.loading = value === true ? true : false;
        };

        VGridClientCtx.prototype.setEditMode = function setEditMode(value) {
          this.vGridConfig.editMode = value ? true : false;
          this.vGridGenerator.rebuildColumnsRows();
        };

        VGridClientCtx.prototype.setTabbing = function setTabbing(value) {
          this.vGridConfig.tabbingEnabled = value === true ? true : false;
        };

        VGridClientCtx.prototype.getEditMode = function getEditMode() {
          return this.vGridConfig.editMode;
        };

        VGridClientCtx.prototype.createReport = function createReport(skipArray) {
          if (skipArray === undefined) {
            skipArray = [];
          }
          var content = '';
          var rows = this.vGrid.vGridCollectionFiltered;
          var attributes = this.vGridConfig.attributeArray;

          var setData = function setData(arr) {
            content = content + arr.join(';') + '\n';
          };

          setData(attributes);

          rows.forEach(function (row) {
            var tempArr = [];
            attributes.forEach(function (att) {
              if (skipArray.indexOf(att) === -1) {
                tempArr.push(row[att]);
              }
            });
            setData(tempArr);
          });

          var dummyElement = document.createElement('a');
          dummyElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
          dummyElement.setAttribute('download', 'contacts.csv');
          dummyElement.style.display = 'none';
          document.body.appendChild(dummyElement);
          dummyElement.click();
          document.body.removeChild(dummyElement);
        };

        _createClass(VGridClientCtx, [{
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

        return VGridClientCtx;
      }());

      _export("VGridClientCtx", VGridClientCtx);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jbGllbnRDdHguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FPYSxjO0FBRVgsZ0NBQVksS0FBWixFQUFtQjtBQUFBOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O2lDQStIRCxnQiw2QkFBaUIsZ0IsRUFBa0IsWSxFQUFjO0FBQy9DLGVBQUssY0FBTCxDQUFvQixnQkFBcEIsQ0FBcUMsZ0JBQXJDLEVBQXVELFlBQXZEO0FBQ0QsUzs7aUNBR0QsVSx1QkFBVyxDLEVBQUc7QUFDWixlQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLENBQXpCO0FBQ0QsUzs7aUNBRUQsNEIsMkNBQThCO0FBQzVCLGVBQUssV0FBTCxDQUFpQiw0QkFBakIsR0FBZ0QsSUFBaEQ7QUFDRCxTOztpQ0FHRCxVLHVCQUFXLEMsRUFBRztBQUFBOztBQUNaLGNBQUcsS0FBSyxlQUFMLENBQXFCLE1BQXJCLEdBQThCLEtBQUssV0FBTCxDQUFpQixnQkFBbEQsRUFBbUU7QUFDakUsaUJBQUssS0FBTCxDQUFXLE9BQVgsR0FBcUIsSUFBckI7QUFDRDtBQUNELHFCQUFXLFlBQUk7QUFDYixrQkFBSyxTQUFMLENBQWUsR0FBZixDQUFtQixNQUFLLEtBQUwsQ0FBVyx1QkFBOUI7QUFDQSxrQkFBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixLQUFyQjtBQUNELFdBSEQsRUFHRSxFQUhGO0FBS0QsUzs7aUNBRUQsUyxzQkFBVSxTLEVBQVc7QUFDbkIsZUFBSyxXQUFMLENBQWlCLFNBQWpCLEdBQTZCLElBQTdCO0FBQ0EsZUFBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLFNBQTdCO0FBQ0QsUzs7aUNBR0QsYyw2QkFBaUI7QUFDZixlQUFLLGNBQUwsQ0FBb0IsY0FBcEI7QUFDRCxTOztpQ0FHRCxZLDJCQUFlO0FBQ2IsZUFBSyxjQUFMLENBQW9CLFlBQXBCO0FBQ0QsUzs7aUNBR0QsUyx3QkFBWTtBQUNWLGVBQUssY0FBTCxDQUFvQixTQUFwQjtBQUNELFM7O2lDQUdELFkseUJBQWEsTSxFQUFRO0FBQ25CLGVBQUssY0FBTCxDQUFvQixZQUFwQixDQUFpQyxNQUFqQztBQUNELFM7O2lDQUdELGtCLGlDQUFxQjtBQUNuQixlQUFLLGNBQUwsQ0FBb0Isa0JBQXBCO0FBQ0QsUzs7aUNBR0QseUIsc0NBQTBCLGdCLEVBQWtCO0FBQzFDLGVBQUssY0FBTCxDQUFvQix5QkFBcEIsQ0FBOEMsZ0JBQTlDO0FBQ0QsUzs7aUNBR0QsVSx5QkFBYTtBQUNYLGVBQUssY0FBTCxDQUFvQixVQUFwQjtBQUNELFM7O2lDQUdELFUsdUJBQVcsUSxFQUFVO0FBQ25CLGlCQUFPLEtBQUssY0FBTCxDQUFvQixVQUFwQixDQUErQixRQUEvQixDQUFQO0FBQ0QsUzs7aUNBR0QsVSx5QkFBYTtBQUNYLGlCQUFPLEtBQUssY0FBTCxDQUFvQixVQUFwQixFQUFQO0FBQ0QsUzs7aUNBRUQsVSx5QkFBYTtBQUVYLGNBQUksa0JBQWtCLEtBQXRCO0FBQ0EsY0FBSSxXQUFXLFVBQVUsU0FBVixDQUFvQixXQUFwQixHQUFrQyxLQUFsQyxDQUF3QyxTQUF4QyxJQUFxRCxPQUFyRCxHQUErRCxVQUE5RTtBQUNBLGNBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVjs7QUFFQSxtQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixHQUExQjs7QUFFQSxpQkFBTyxJQUFQLEVBQWE7QUFDWCxnQkFBSSxPQUFPLGtCQUFrQixLQUE3QjtBQUNBLGdCQUFJLEtBQUosQ0FBVSxNQUFWLEdBQW1CLE9BQU0sSUFBekI7QUFDQSxnQkFBSSxPQUFPLFFBQVAsSUFBbUIsSUFBSSxZQUFKLEtBQXFCLElBQTVDLEVBQWtEO0FBQ2hEO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsZ0NBQWtCLElBQWxCO0FBQ0Q7QUFDRjtBQUNELG1CQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLEdBQTFCO0FBQ0QsaUJBQVEsa0JBQWdCLEtBQUssV0FBTCxDQUFpQixTQUFsQyxHQUE4QyxpQkFBOUMsR0FBaUUsUUFBTSxLQUFLLFdBQUwsQ0FBaUIsU0FBL0Y7QUFDRixTOztpQ0FHQyxnQiwrQkFBbUI7QUFDakIsZUFBSyxjQUFMLENBQW9CLGdCQUFwQjtBQUNELFM7O2lDQUdELGlCLDhCQUFrQixLLEVBQU07QUFDdEIsZUFBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixVQUFVLElBQVYsR0FBaUIsSUFBakIsR0FBc0IsS0FBM0M7QUFDRCxTOztpQ0FHRCxXLHdCQUFZLEssRUFBTztBQUNqQixlQUFLLFdBQUwsQ0FBaUIsUUFBakIsR0FBNEIsUUFBUSxJQUFSLEdBQWUsS0FBM0M7QUFDQSxlQUFLLGNBQUwsQ0FBb0Isa0JBQXBCO0FBQ0QsUzs7aUNBRUQsVSx1QkFBVyxLLEVBQU07QUFDZixlQUFLLFdBQUwsQ0FBaUIsY0FBakIsR0FBa0MsVUFBVSxJQUFWLEdBQWlCLElBQWpCLEdBQXNCLEtBQXhEO0FBQ0QsUzs7aUNBR0QsVywwQkFBYztBQUNaLGlCQUFPLEtBQUssV0FBTCxDQUFpQixRQUF4QjtBQUNELFM7O2lDQUdELFkseUJBQWEsUyxFQUFXO0FBR3RCLGNBQUksY0FBYyxTQUFsQixFQUE2QjtBQUMzQix3QkFBWSxFQUFaO0FBQ0Q7QUFDRCxjQUFJLFVBQVUsRUFBZDtBQUNBLGNBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyx1QkFBdEI7QUFDQSxjQUFJLGFBQWEsS0FBSyxXQUFMLENBQWlCLGNBQWxDOztBQUdBLGNBQUksVUFBVSxTQUFWLE9BQVUsQ0FBQyxHQUFELEVBQVM7QUFDckIsc0JBQVUsVUFBVSxJQUFJLElBQUosQ0FBUyxHQUFULENBQVYsR0FBMEIsSUFBcEM7QUFDRCxXQUZEOztBQUtBLGtCQUFRLFVBQVI7O0FBR0EsZUFBSyxPQUFMLENBQWEsVUFBQyxHQUFELEVBQVE7QUFDbkIsZ0JBQUksVUFBVSxFQUFkO0FBQ0EsdUJBQVcsT0FBWCxDQUFtQixVQUFDLEdBQUQsRUFBUTtBQUN6QixrQkFBSSxVQUFVLE9BQVYsQ0FBa0IsR0FBbEIsTUFBMkIsQ0FBQyxDQUFoQyxFQUFtQztBQUNqQyx3QkFBUSxJQUFSLENBQWEsSUFBSSxHQUFKLENBQWI7QUFDRDtBQUNGLGFBSkQ7QUFLQSxvQkFBUSxPQUFSO0FBQ0QsV0FSRDs7QUFZQSxjQUFJLGVBQWUsU0FBUyxhQUFULENBQXVCLEdBQXZCLENBQW5CO0FBQ0EsdUJBQWEsWUFBYixDQUEwQixNQUExQixFQUFrQyxtQ0FBbUMsbUJBQW1CLE9BQW5CLENBQXJFO0FBQ0EsdUJBQWEsWUFBYixDQUEwQixVQUExQixFQUFzQyxjQUF0QztBQUNBLHVCQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsTUFBN0I7QUFDQSxtQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixZQUExQjtBQUNBLHVCQUFhLEtBQWI7QUFDQSxtQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixZQUExQjtBQUNELFM7Ozs7OEJBelJvQjtBQUNuQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxjQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRWlCO0FBQ2hCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLFdBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFcUI7QUFDcEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsZUFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVrQjtBQUNqQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxPQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRW1CO0FBQ2xCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGFBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFVb0I7QUFDbkIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsY0FBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVpQjtBQUNoQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRWU7QUFDZCxnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxTQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRXNCO0FBQ3JCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGdCQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRW9CO0FBQ25CLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGNBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFMkI7QUFDMUIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcscUJBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFaUI7QUFDaEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUU2QjtBQUM1QixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyx1QkFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVxQjtBQUNwQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxlQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jbGllbnRDdHguanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
