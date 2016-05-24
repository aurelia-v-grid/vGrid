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
        function VGridObservables(vGrid, observerLocator) {
          _classCallCheck(this, VGridObservables);

          this.observerLocator = observerLocator;
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
            _this.vGrid.vGridGenerator.clearHeaderSortFilter();
            _this.vGrid.vGridSelection.reset();
            _this.vGrid.vGridGenerator.collectionChange();

            for (var k in _this.vGrid.vGridCurrentEntity) {
              if (_this.vGrid.vGridCurrentEntity.hasOwnProperty(k)) {
                _this.vGrid.vGridCurrentEntity[k] = undefined;
                _this.vGrid.vGridSkipNextUpdateProperty.push(k);
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

          var arrayObserver = this.observerLocator.getArrayObserver(this.vGrid.vGridCollection);
          arrayObserver.subscribe(function (arrayObserverChanges) {

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
                    _this2.vGrid.vGridSkipNextUpdateProperty.push(k);
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

          this.vGrid.vGridConfig.attributeArray.forEach(function (property) {
            var propertyObserver = _this3.observerLocator.getObserver(_this3.vGrid.vGridCurrentEntity, property);
            propertyObserver.subscribe(function (newValue, oldValue) {
              var newValueCheck = newValue ? newValue.toString() : newValue;
              var oldValueCheck = oldValue ? oldValue.toString() : oldValue;

              if (newValueCheck !== oldValueCheck) {
                if (_this3.vGrid.vGridSkipNextUpdateProperty.indexOf(property) === -1 && _this3.vGrid.vGridCurrentEntityRef) {
                  _this3.vGrid.vGridCurrentEntityRef[property] = newValue;
                  _this3.vGrid.vGridGenerator.updateRow(_this3.vGrid.vGridCurrentRow, true);
                } else {
                  _this3.vGrid.vGridSkipNextUpdateProperty.splice(_this3.vGrid.vGridSkipNextUpdateProperty.indexOf(property), 1);
                }
              } else {
                _this3.vGrid.vGridSkipNextUpdateProperty.splice(_this3.vGrid.vGridSkipNextUpdateProperty.indexOf(property), 1);
              }
            });
            _this3.subscriptionsAttributes.push(propertyObserver);
          });
        };

        VGridObservables.prototype.disableObservablesCollection = function disableObservablesCollection() {
          this.collectionSubscription.unsubscribe(this.vGrid, this.collectioncallable);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1vYnNlcnZhYmxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2tDQU1hLGdCO0FBR1gsa0NBQVksS0FBWixFQUFtQixlQUFuQixFQUFvQztBQUFBOztBQUNsQyxlQUFLLGVBQUwsR0FBdUIsZUFBdkI7QUFDQSxlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyx1QkFBTCxHQUErQixFQUEvQjtBQUNBLGVBQUssc0JBQUwsR0FBOEIsSUFBOUI7QUFDQSxlQUFLLGtCQUFMLEdBQTBCLEVBQTFCO0FBQ0Q7O21DQU1ELDJCLDBDQUE4QjtBQUFBOztBQU01QixjQUFJLHlCQUF5QixTQUF6QixzQkFBeUIsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFVO0FBR3JDLGtCQUFLLHVCQUFMOztBQUlBLGtCQUFLLEtBQUwsQ0FBVyx1QkFBWCxHQUFxQyxNQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLEtBQTNCLENBQWlDLENBQWpDLENBQXJDO0FBQ0Esa0JBQUssS0FBTCxDQUFXLFNBQVg7O0FBSUEsa0JBQUssS0FBTCxDQUFXLGVBQVgsR0FBNkIsQ0FBQyxDQUE5QjtBQUNBLGtCQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEtBQXJCO0FBQ0Esa0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIscUJBQTFCO0FBQ0Esa0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsS0FBMUI7QUFDQSxrQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixnQkFBMUI7O0FBR0EsaUJBQUssSUFBSSxDQUFULElBQWMsTUFBSyxLQUFMLENBQVcsa0JBQXpCLEVBQTZDO0FBQzNDLGtCQUFJLE1BQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLGNBQTlCLENBQTZDLENBQTdDLENBQUosRUFBcUQ7QUFDbkQsc0JBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLENBQTlCLElBQW1DLFNBQW5DO0FBQ0Esc0JBQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLElB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
