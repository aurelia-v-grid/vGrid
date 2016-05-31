"use strict";

System.register([], function (_export, _context) {
  "use strict";

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
        function VGridObservables(vGrid, bindingEngine) {
          _classCallCheck(this, VGridObservables);

          this.bindingEngine = bindingEngine;
          this.vGrid = vGrid;
          this.subscriptionsAttributes = [];
          this.collectionSubscription = null;
          this.subscriptionsArray = [];
        }

        VGridObservables.prototype.enableObservablesCollection = function enableObservablesCollection() {
          var _this = this;

          var collectionSubscription = function collectionSubscription(x, y) {
            _this.disableObservablesArray();

            _this.vGrid.vGridCollectionFiltered = _this.vGrid.vGridCollection.slice(0);
            _this.vGrid.checkKeys();

            _this.vGrid.vGridCurrentRow = -1;
            _this.vGrid.vGridSort.reset();
            if (!_this.vGrid.vGridConfig.keepFilterOnCollectionChange) {
              _this.vGrid.vGridSort.reset();
              _this.vGrid.vGridGenerator.rebuildGridHeaderHtmlAndViewSlot();

              _this.vGrid.vGridSelection.reset();
              _this.vGrid.vGridConfig.keepFilterOnCollectionChange = false;
            }
            _this.vGrid.vGridGenerator.collectionChange();

            for (var k in _this.vGrid.vGridCurrentEntity) {
              if (_this.vGrid.vGridCurrentEntity.hasOwnProperty(k)) {
                _this.vGrid.vGridCurrentEntity[k] = undefined;
              }
            }

            _this.enableObservablesArray();
          };
          this.vGrid.__observers__.vGridCollection.subscribe(this.vGrid, collectionSubscription);
          this.collectioncallable = collectionSubscription;

          this.collectionSubscription = this.vGrid.__observers__.vGridCollection;
        };

        VGridObservables.prototype.enableObservablesArray = function enableObservablesArray() {
          var _this2 = this;

          var arrayObserver = this.bindingEngine.collectionObserver(this.vGrid.vGridCollection).subscribe(function (arrayObserverChanges) {

            var colFiltered = _this2.vGrid.vGridCollectionFiltered;
            var col = _this2.vGrid.vGridCollection;
            var grid = _this2.vGrid.vGridGenerator;

            var curKey = -1;
            if (_this2.vGrid.vGridCurrentEntityRef) {
              curKey = _this2.vGrid.vGridCurrentEntityRef[_this2.vGrid.vGridRowKey];
            }
            var curEntityValid = true;

            if (arrayObserverChanges.length > 0) {

              var added = false;
              var toRemove = [];

              arrayObserverChanges.forEach(function (observerChange) {
                if (observerChange.addedCount > 0) {
                  for (var i = 0; i < observerChange.addedCount; i++) {
                    colFiltered.push(col[observerChange.index + i]);
                    _this2.vGrid.checkKey(col[observerChange.index + i]);
                  }
                }

                if (observerChange.removed.length > 0) {
                  observerChange.removed.forEach(function (x) {
                    if (x[_this2.vGrid.vGridRowKey] === curKey) {
                      curEntityValid = false;
                    }

                    var rowToRemove = -1;
                    colFiltered.forEach(function (row, index) {
                      if (row[_this2.vGrid.vGridRowKey] === x[_this2.vGrid.vGridRowKey]) {
                        rowToRemove = index;
                      }
                    });
                    if (rowToRemove !== -1) {
                      colFiltered.splice(rowToRemove, 1);
                    }
                  });
                }
              });

              var newRowNo = -1;

              if (!curEntityValid) {
                for (var k in _this2.vGrid.vGridCurrentEntity) {
                  if (_this2.vGrid.vGridCurrentEntity.hasOwnProperty(k)) {
                    _this2.vGrid.vGridCurrentEntity[k] = undefined;
                  }
                }
                _this2.vGrid.vGridCurrentEntityRef = null;
                _this2.vGrid.vGridCurrentRow = -1;
              } else {
                if (curKey !== -1) {
                  _this2.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
                    if (curKey === x[_this2.vGrid.vGridRowKey]) {
                      _this2.vGrid.vGridCurrentRow = index;
                    }
                  });
                }
              }
              grid.collectionChange(false);
            }
          });
          this.subscriptionsArray = arrayObserver;
        };

        VGridObservables.prototype.enableObservablesAttributes = function enableObservablesAttributes() {
          var _this3 = this;

          this.vGrid.vGridConfig.attAttributeObserve.forEach(function (property) {
            var propertyObserver = _this3.bindingEngine.propertyObserver(_this3.vGrid.vGridCurrentEntity, property).subscribe(function (newValue, oldValue) {
              var newValueCheck = newValue !== undefined && newValue !== null ? newValue.toString() : newValue;
              var oldValueCheck = oldValue !== undefined && oldValue !== null ? oldValue.toString() : oldValue;

              if (newValueCheck !== oldValueCheck && _this3.vGrid.vGridCurrentEntityRef) {
                _this3.vGrid.vGridCurrentEntityRef[property] = newValue;
                _this3.vGrid.vGridGenerator.fillDataIntoRow(_this3.vGrid.vGridCurrentRow, true);
              }
            });
            _this3.subscriptionsAttributes.push(propertyObserver);
          });
        };

        VGridObservables.prototype.disableObservablesCollection = function disableObservablesCollection() {
          this.collectionSubscription.unsubscribe(this.vGrid, this.collectioncallable);
        };

        VGridObservables.prototype.disableObservablesArray = function disableObservablesArray() {
          this.subscriptionsArray.dispose();
          this.subscriptionsArray = null;
        };

        VGridObservables.prototype.disableObservablesAttributes = function disableObservablesAttributes() {
          for (var i = 0; i < this.subscriptionsAttributes.length; i++) {
            try {
              this.subscriptionsAttributes[i].dispose();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1vYnNlcnZhYmxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2tDQU1hLGdCO0FBR1gsa0NBQVksS0FBWixFQUFtQixhQUFuQixFQUFrQztBQUFBOztBQUNoQyxlQUFLLGFBQUwsR0FBcUIsYUFBckI7QUFDQSxlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyx1QkFBTCxHQUErQixFQUEvQjtBQUNBLGVBQUssc0JBQUwsR0FBOEIsSUFBOUI7QUFDQSxlQUFLLGtCQUFMLEdBQTBCLEVBQTFCO0FBQ0Q7O21DQU1ELDJCLDBDQUE4QjtBQUFBOztBQUU1QixjQUFJLHlCQUF5QixTQUF6QixzQkFBeUIsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFVO0FBR3JDLGtCQUFLLHVCQUFMOztBQUlBLGtCQUFLLEtBQUwsQ0FBVyx1QkFBWCxHQUFxQyxNQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLEtBQTNCLENBQWlDLENBQWpDLENBQXJDO0FBQ0Esa0JBQUssS0FBTCxDQUFXLFNBQVg7O0FBSUEsa0JBQUssS0FBTCxDQUFXLGVBQVgsR0FBNkIsQ0FBQyxDQUE5QjtBQUNBLGtCQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEtBQXJCO0FBQ0EsZ0JBQUcsQ0FBQyxNQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLDRCQUEzQixFQUF3RDtBQUV0RCxvQkFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixLQUFyQjtBQUNBLG9CQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGdDQUExQjs7QUFFQSxvQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixLQUExQjtBQUNBLG9CQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLDRCQUF2QixHQUFzRCxLQUF0RDtBQUNEO0FBQ0Qsa0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsZ0JBQTFCOztBQUdBLGlCQUFLLElBQUksQ0FBVCxJQUFjLE1BQUssS0FBTCxDQUFXLGtCQUF6QixFQUE2QztBQUMz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NkMsUUFBN0M7QUFDQSx1QkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixlQUExQixDQUEwQyxPQUFLLEtBQUwsQ0FBVyxlQUFyRCxFQUFzRSxJQUF0RTtBQUNMO0FBQ0YsYUFWc0IsQ0FBdkI7QUFXQSxtQkFBSyx1QkFBTCxDQUE2QixJQUE3QixDQUFrQyxnQkFBbEM7QUFDRCxXQWJEO0FBY0QsUzs7bUNBTUQsNEIsMkNBQStCO0FBQzdCLGVBQUssc0JBQUwsQ0FBNEIsV0FBNUIsQ0FBd0MsS0FBSyxLQUE3QyxFQUFvRCxLQUFLLGtCQUF6RDtBQUVELFM7O21DQU1ELHVCLHNDQUEwQjtBQUN4QixlQUFLLGtCQUFMLENBQXdCLE9BQXhCO0FBQ0EsZUFBSyxrQkFBTCxHQUEwQixJQUExQjtBQUNELFM7O21DQU1ELDRCLDJDQUErQjtBQUM3QixlQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyx1QkFBTCxDQUE2QixNQUFqRCxFQUF5RCxHQUF6RCxFQUE4RDtBQUM1RCxnQkFBSTtBQUNGLG1CQUFLLHVCQUFMLENBQTZCLENBQTdCLEVBQWdDLE9BQWhDO0FBQ0QsYUFGRCxDQUVFLE9BQU8sQ0FBUCxFQUFVLENBQ1g7QUFDRjtBQUNELGVBQUssdUJBQUwsR0FBK0IsRUFBL0I7QUFDRCxTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1vYnNlcnZhYmxlcy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
