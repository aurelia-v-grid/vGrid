"use strict";

System.register([], function (_export, _context) {
  var VGridObservables;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("VGridObservables", VGridObservables = function () {
        function VGridObservables(vGrid) {
          _classCallCheck(this, VGridObservables);

          this.vGrid = vGrid;
          this.subscriptionsAttributes = [];
          this.collectionSubscription = null;
          this.subscriptionsArray = [];
        }

        VGridObservables.prototype.enableObservablesCollection = function enableObservablesCollection() {
          var _this = this;

          var collectionSubscription = this.vGrid.__observers__.collection.subscribe(this.vGrid, function (x, y) {
            _this.disableObservablesArray();

            _this.vGrid.collectionFiltered = _this.vGrid.collection.slice(0);
            _this.vGrid.resetKeys();

            _this.vGrid.vGridSort.reset();
            _this.vGrid.vGridGenerator.clearHeaderSortFilter();
            _this.vGrid.vGridSelection.reset();
            _this.vGrid.vGridGenerator.collectionChange();

            for (var k in _this.vGrid.currentEntity) {
              if (_this.vGrid.currentEntity.hasOwnProperty(k)) {
                _this.vGrid.currentEntity[k] = undefined;
                _this.vGrid.skipNextUpdateProperty.push(k);
              }
            }

            _this.enableObservablesArray();
          });
          this.vGrid.collectionSubscription = this.vGrid.__observers__.collection;
        };

        VGridObservables.prototype.enableObservablesArray = function enableObservablesArray() {
          var _this2 = this;

          var arrayObserver = this.vGrid.observerLocator.getArrayObserver(this.vGrid.collection);
          arrayObserver.subscribe(function (changes) {

            var colFiltered = _this2.vGrid.collectionFiltered;
            var col = _this2.vGrid.collection;
            var grid = _this2.vGrid.vGridGenerator;

            var curKey = -1;
            if (_this2.vGrid.currentRowEntity) {
              curKey = _this2.vGrid.currentRowEntity[_this2.sgkey];
            }
            var curEntityValid = true;

            if (changes.length > 0) {

              var added = false;
              var toRemove = [];

              changes.forEach(function (result) {
                if (result.addedCount > 0) {
                  added = true;
                }

                if (result.removed.length > 0) {
                  result.removed.forEach(function (x) {
                    toRemove.push(x[_this2.vGrid.sgkey]);
                  });
                }
              });

              if (added === true) {
                col.forEach(function (x) {
                  if (x[_this2.vGrid.sgkey] === undefined) {
                    colFiltered.push(x);
                  }
                });
              }

              var i = colFiltered.length - 1;
              while (i !== -1) {
                if (toRemove.indexOf(curKey) !== -1) {
                  curEntityValid = false;
                }
                if (toRemove.indexOf(colFiltered[i][_this2.vGrid.sgkey]) !== -1) {
                  var x = colFiltered.splice(i, 1);
                }
                i--;
              }

              var newRowNo = -1;

              if (!curEntityValid) {
                for (var k in _this2.vGrid.currentEntity) {
                  if (_this2.vGrid.currentEntity.hasOwnProperty(k)) {
                    _this2.vGrid.currentEntity[k] = undefined;
                    _this2.vGrid.skipNextUpdateProperty.push(k);
                  }
                }
              } else {

                if (curKey) {
                  _this2.vGrid.collectionFiltered.forEach(function (x, index) {
                    if (curKey === x[_this2.vGrid.sgkey]) {
                      newRowNo = index;
                    }
                  });
                }
              }

              _this2.vGrid.resetKeys();

              _this2.filterRowDisplaying = false;
              if (newRowNo > -1) {
                _this2.vGrid.currentRowEntity = _this2.vGrid.collectionFiltered[newRowNo];
                _this2.vGrid.currentEntity[_this2.sgkey] = _this2.vGrid.currentRowEntity[_this2.vGrid.sgkey];
                _this2.vGrid.filterRow = newRowNo;
                _this2.vGrid.filterRowDisplaying = true;
              }

              grid.collectionChange(false, _this2.scrollBottomNext);
              if (_this2.vGrid.filterRowDisplaying) {
                _this2.vGrid.vGridCellEdit.setBackFocus();
              }
            }
          });
          this.subscriptionsArray = arrayObserver;
        };

        VGridObservables.prototype.enableObservablesAttributes = function enableObservablesAttributes() {
          var _this3 = this;

          this.vGrid.vGridConfig.attributeArray.forEach(function (property) {
            var propertyObserver = _this3.vGrid.observerLocator.getObserver(_this3.vGrid.currentEntity, property);
            propertyObserver.subscribe(function (newValue, oldValue) {
              if (newValue !== oldValue) {
                if (_this3.vGrid.skipNextUpdateProperty.indexOf(property) === -1) {
                  _this3.vGrid.currentRowEntity[property] = newValue;
                  _this3.vGrid.vGridGenerator.updateRow(_this3.vGrid.filterRow, true);
                } else {
                  _this3.vGrid.skipNextUpdateProperty.splice(_this3.vGrid.skipNextUpdateProperty.indexOf(property), 1);
                }
              }
            });
            _this3.subscriptionsAttributes.push(propertyObserver);
          });
        };

        VGridObservables.prototype.disableObservablesCollection = function disableObservablesCollection() {
          this.collectionSubscription.unsubscribe();
          this.collectionSubscription = null;
        };

        VGridObservables.prototype.disableObservablesArray = function disableObservablesArray() {
          this.subscriptionsArray.unsubscribe();
          this.subscriptionsArray = null;
        };

        VGridObservables.prototype.disableObservablesAttributes = function disableObservablesAttributes() {
          for (var i = 0; i < this.subscriptionsAttributes.length; i++) {
            try {
              this.subscriptionsAttributes[i].unsubscribe();
            } catch (e) {}
          }
          this.subscriptionsAttributes = [];
        };

        return VGridObservables;
      }());

      _export("VGridObservables", VGridObservables);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1vYnNlcnZhYmxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQ0FNYTtBQUdYLGlCQUhXLGdCQUdYLENBQVksS0FBWixFQUFtQjtnQ0FIUixrQkFHUTs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQURpQjtBQUVqQixlQUFLLHVCQUFMLEdBQStCLEVBQS9CLENBRmlCO0FBR2pCLGVBQUssc0JBQUwsR0FBOEIsSUFBOUIsQ0FIaUI7QUFJakIsZUFBSyxrQkFBTCxHQUEwQixFQUExQixDQUppQjtTQUFuQjs7QUFIVyxtQ0FnQlgscUVBQThCOzs7QUFFNUIsY0FBSSx5QkFBeUIsS0FBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixVQUF6QixDQUFvQyxTQUFwQyxDQUE4QyxLQUFLLEtBQUwsRUFBWSxVQUFDLENBQUQsRUFBSSxDQUFKLEVBQVU7QUFHL0Ysa0JBQUssdUJBQUwsR0FIK0Y7O0FBTy9GLGtCQUFLLEtBQUwsQ0FBVyxrQkFBWCxHQUFnQyxNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLEtBQXRCLENBQTRCLENBQTVCLENBQWhDLENBUCtGO0FBUS9GLGtCQUFLLEtBQUwsQ0FBVyxTQUFYLEdBUitGOztBQVkvRixrQkFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixLQUFyQixHQVorRjtBQWEvRixrQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixxQkFBMUIsR0FiK0Y7QUFjL0Ysa0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsS0FBMUIsR0FkK0Y7QUFlL0Ysa0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsZ0JBQTFCLEdBZitGOztBQW1CL0YsaUJBQUssSUFBSSxDQUFKLElBQVMsTUFBSyxLQUFMLENBQVcsYUFBWCxFQUEwQjtBQUN0QyxrQkFBSSxNQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGNBQXpCLENBQXdDLENBQXhDLENBQUosRUFBZ0Q7QUFDOUMsc0JBQUssS0FBTCxDQUFXLGFBQVgsQ0FB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R3ZCLGVBQUssa0JBQUwsR0FBMEIsYUFBMUIsQ0F4R3VCOzs7QUE1RGQsbUNBOEtYLHFFQUE4Qjs7O0FBQzVCLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsY0FBdkIsQ0FBc0MsT0FBdEMsQ0FBOEMsVUFBQyxRQUFELEVBQWM7QUFDMUQsZ0JBQUksbUJBQW1CLE9BQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsV0FBM0IsQ0FBdUMsT0FBSyxLQUFMLENBQVcsYUFBWCxFQUEwQixRQUFqRSxDQUFuQixDQURzRDtBQUUxRCw2QkFBaUIsU0FBakIsQ0FBMkIsVUFBQyxRQUFELEVBQVcsUUFBWCxFQUF3QjtBQUNqRCxrQkFBSSxhQUFhLFFBQWIsRUFBdUI7QUFFekIsb0JBQUksT0FBSyxLQUFMLENBQVcsc0JBQVgsQ0FBa0MsT0FBbEMsQ0FBMEMsUUFBMUMsTUFBd0QsQ0FBQyxDQUFELEVBQUk7QUFDOUQseUJBQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLFFBQTVCLElBQXdDLFFBQXhDLENBRDhEO0FBRTlELHlCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQUssS0FBTCxDQUFXLFNBQVgsRUFBc0IsSUFBMUQsRUFGOEQ7aUJBQWhFLE1BR087QUFFTCx5QkFBSyxLQUFMLENBQVcsc0JBQVgsQ0FBa0MsTUFBbEMsQ0FBeUMsT0FBSyxLQUFMLENBQVcsc0JBQVgsQ0FBa0MsT0FBbEMsQ0FBMEMsUUFBMUMsQ0FBekMsRUFBOEYsQ0FBOUYsRUFGSztpQkFIUDtlQUZGO2FBRHlCLENBQTNCLENBRjBEO0FBYzFELG1CQUFLLHVCQUFMLENBQTZCLElBQTdCLENBQWtDLGdCQUFsQyxFQWQwRDtXQUFkLENBQTlDLENBRDRCOzs7QUE5S25CLG1DQXdNWCx1RUFBK0I7QUFDN0IsZUFBSyxzQkFBTCxDQUE0QixXQUE1QixHQUQ2QjtBQUU3QixlQUFLLHNCQUFMLEdBQThCLElBQTlCLENBRjZCOzs7QUF4TXBCLG1DQW9OWCw2REFBMEI7QUFDeEIsZUFBSyxrQkFBTCxDQUF3QixXQUF4QixHQUR3QjtBQUV4QixlQUFLLGtCQUFMLEdBQTBCLElBQTFCLENBRndCOzs7QUFwTmYsbUNBZ09YLHVFQUErQjtBQUM3QixlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLHVCQUFMLENBQTZCLE1BQTdCLEVBQXFDLEdBQXpELEVBQThEO0FBQzVELGdCQUFJO0FBQ0YsbUJBQUssdUJBQUwsQ0FBNkIsQ0FBN0IsRUFBZ0MsV0FBaEMsR0FERTthQUFKLENBRUUsT0FBTyxDQUFQLEVBQVUsRUFBVjtXQUhKO0FBTUEsZUFBSyx1QkFBTCxHQUErQixFQUEvQixDQVA2Qjs7O2VBaE9wQiIsImZpbGUiOiJ2R3JpZC92LWdyaWQtb2JzZXJ2YWJsZXMuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
