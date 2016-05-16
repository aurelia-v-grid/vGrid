"use strict";

System.register([], function (_export, _context) {
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

        VGridClientCtx.prototype.runSorting = function runSorting(x) {
          this.vGridSort.run(this.vGrid.vGridCollectionFiltered);
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
          div.remove();
          return supportedHeight / this.vGridConfig.rowHeight + ", error margin:" + 10000 / this.vGridConfig.rowHeight;
        };

        VGridClientCtx.prototype.scrollBottomNext = function scrollBottomNext() {
          this.vGridGenerator.scrollBottomNext();
        };

        VGridClientCtx.prototype.setEditMode = function setEditMode(value) {
          this.vGridConfig.editMode = value ? true : false;
          this.vGridGenerator.fillDataInRows();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jbGllbnRDdHguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBT2E7QUFFWCxpQkFGVyxjQUVYLENBQVksS0FBWixFQUFtQjtnQ0FGUixnQkFFUTs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQURpQjtTQUFuQjs7QUFGVyxpQ0FtSVgsNkNBQWlCLGtCQUFrQixjQUFjO0FBQy9DLGVBQUssY0FBTCxDQUFvQixnQkFBcEIsQ0FBcUMsZ0JBQXJDLEVBQXVELFlBQXZELEVBRCtDOzs7QUFuSXRDLGlDQXdJWCxpQ0FBVyxHQUFHO0FBQ1osZUFBSyxTQUFMLENBQWUsU0FBZixDQUF5QixDQUF6QixFQURZOzs7QUF4SUgsaUNBNklYLGlDQUFXLEdBQUc7QUFDWixlQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW5CLENBRFk7OztBQTdJSCxpQ0FpSlgsK0JBQVUsV0FBVztBQUNuQixlQUFLLFdBQUwsQ0FBaUIsU0FBakIsR0FBNkIsSUFBN0IsQ0FEbUI7QUFFbkIsZUFBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLFNBQTdCLEVBRm1COzs7QUFqSlYsaUNBdUpYLDJDQUFpQjtBQUNmLGVBQUssY0FBTCxDQUFvQixjQUFwQixHQURlOzs7QUF2Sk4saUNBNEpYLHVDQUFlO0FBQ2IsZUFBSyxjQUFMLENBQW9CLFlBQXBCLEdBRGE7OztBQTVKSixpQ0FpS1gsaUNBQVk7QUFDVixlQUFLLGNBQUwsQ0FBb0IsU0FBcEIsR0FEVTs7O0FBaktELGlDQXNLWCxxQ0FBYSxRQUFRO0FBQ25CLGVBQUssY0FBTCxDQUFvQixZQUFwQixDQUFpQyxNQUFqQyxFQURtQjs7O0FBdEtWLGlDQTJLWCxtREFBcUI7QUFDbkIsZUFBSyxjQUFMLENBQW9CLGtCQUFwQixHQURtQjs7O0FBM0tWLGlDQWdMWCwrREFBMEIsa0JBQWtCO0FBQzFDLGVBQUssY0FBTCxD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
