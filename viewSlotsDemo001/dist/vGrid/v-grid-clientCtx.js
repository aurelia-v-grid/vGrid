'use strict';

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

      _export('VGridClientCtx', VGridClientCtx = function () {
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

        VGridClientCtx.prototype.scrollBottomNext = function scrollBottomNext() {
          this.vGridGenerator.scrollBottomNext();
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
          key: 'vGridSelection',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridSelection;
            } else {
              return null;
            }
          }
        }, {
          key: 'vGridConfig',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridConfig;
            } else {
              return null;
            }
          }
        }, {
          key: 'vGridCellHelper',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCellHelper;
            } else {
              return null;
            }
          }
        }, {
          key: 'vGridElement',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.element;
            } else {
              return null;
            }
          }
        }, {
          key: 'vGridSortable',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridSortable;
            } else {
              return null;
            }
          }
        }, {
          key: 'vGridResizable',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridResizable;
            } else {
              return null;
            }
          }
        }, {
          key: 'vGridFilter',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridFilter;
            } else {
              return null;
            }
          }
        }, {
          key: 'vGridSort',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridSort;
            } else {
              return null;
            }
          }
        }, {
          key: 'vGridObservables',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridObservables;
            } else {
              return null;
            }
          }
        }, {
          key: 'vGridGenerator',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridGenerator;
            } else {
              return null;
            }
          }
        }, {
          key: 'vGridCurrentEntityRef',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCurrentEntityRef;
            } else {
              return null;
            }
          }
        }, {
          key: 'vGridRowKey',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridRowKey;
            } else {
              return null;
            }
          }
        }, {
          key: 'vGridCollectionFiltered',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCollectionFiltered;
            } else {
              return null;
            }
          }
        }, {
          key: 'vGridCollection',
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

      _export('VGridClientCtx', VGridClientCtx);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jbGllbnRDdHguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBT2E7QUFFWCxpQkFGVyxjQUVYLENBQVksS0FBWixFQUFtQjtnQ0FGUixnQkFFUTs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQURpQjtTQUFuQjs7QUFGVyxpQ0FtSVgsNkNBQWlCLGtCQUFrQixjQUFjO0FBQy9DLGVBQUssY0FBTCxDQUFvQixnQkFBcEIsQ0FBcUMsZ0JBQXJDLEVBQXVELFlBQXZELEVBRCtDOzs7QUFuSXRDLGlDQXdJWCxpQ0FBVyxHQUFHO0FBQ1osZUFBSyxTQUFMLENBQWUsU0FBZixDQUF5QixDQUF6QixFQURZOzs7QUF4SUgsaUNBNklYLGlDQUFXLEdBQUc7QUFDWixlQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW5CLENBRFk7OztBQTdJSCxpQ0FpSlgsK0JBQVUsV0FBVztBQUNuQixlQUFLLFdBQUwsQ0FBaUIsU0FBakIsR0FBNkIsSUFBN0IsQ0FEbUI7QUFFbkIsZUFBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLFNBQTdCLEVBRm1COzs7QUFqSlYsaUNBdUpYLDJDQUFpQjtBQUNmLGVBQUssY0FBTCxDQUFvQixjQUFwQixHQURlOzs7QUF2Sk4saUNBNEpYLHVDQUFlO0FBQ2IsZUFBSyxjQUFMLENBQW9CLFlBQXBCLEdBRGE7OztBQTVKSixpQ0FpS1gsaUNBQVk7QUFDVixlQUFLLGNBQUwsQ0FBb0IsU0FBcEIsR0FEVTs7O0FBaktELGlDQXNLWCxxQ0FBYSxRQUFRO0FBQ25CLGVBQUssY0FBTCxDQUFvQixZQUFwQixDQUFpQyxNQUFqQyxFQURtQjs7O0FBdEtWLGlDQTJLWCxtREFBcUI7QUFDbkIsZUFBSyxjQUFMLENBQW9CLGtCQUFwQixHQURtQjs7O0FBM0tWLGlDQWdMWCwrREFBMEIsa0JBQWtCO0FBQzFDLGVBQUssY0FBTCxD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
