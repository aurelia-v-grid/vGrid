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

          var collectionSubscription = this.vGrid.__observers__.vGridCollection.subscribe(this.vGrid, function (x, y) {
            _this.disableObservablesArray();

            _this.vGrid.vGridCollectionFiltered = _this.vGrid.vGridCollection.slice(0);
            _this.vGrid.resetKeys();

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
          });
          this.collectionSubscription = this.vGrid.__observers__.vGridCollection;
        };

        VGridObservables.prototype.enableObservablesArray = function enableObservablesArray() {
          var _this2 = this;

          var arrayObserver = this.observerLocator.getArrayObserver(this.vGrid.vGridCollection);
          arrayObserver.subscribe(function (changes) {

            var colFiltered = _this2.vGrid.vGridCollectionFiltered;
            var col = _this2.vGrid.vGridCollection;
            var grid = _this2.vGrid.vGridGenerator;

            var curKey = -1;
            if (_this2.vGrid.vGridCurrentEntityRef) {
              curKey = _this2.vGrid.vGridCurrentEntityRef[_this2.vGrid.vGridRowKey];
            }
            var curEntityValid = true;

            if (changes.length > 0) {

              var added = false;
              var toRemove = [];

              changes.forEach(function (result) {
                if (result.addedCount > 0) {
                  for (var i = 0; i < result.addedCount; i++) {
                    colFiltered.push(col[result.index + i]);
                  }
                }

                if (result.removed.length > 0) {
                  result.removed.forEach(function (x) {
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
                      newRowNo = index;
                    }
                  });
                }
              }

              _this2.vGrid.resetKeys();

              if (newRowNo > -1) {
                _this2.vGrid.vGridCurrentEntityRef = _this2.vGrid.vGridCollectionFiltered[newRowNo];
                _this2.vGrid.vGridCurrentEntity[_this2.vGrid.vGridRowKey] = _this2.vGrid.vGridCurrentEntityRef[_this2.vGrid.vGridRowKey];
                _this2.vGrid.vGridCurrentRow = newRowNo;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1vYnNlcnZhYmxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQ0FNYTtBQUdYLGlCQUhXLGdCQUdYLENBQVksS0FBWixFQUFtQixlQUFuQixFQUFvQztnQ0FIekIsa0JBR3lCOztBQUNsQyxlQUFLLGVBQUwsR0FBdUIsZUFBdkIsQ0FEa0M7QUFFbEMsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUZrQztBQUdsQyxlQUFLLHVCQUFMLEdBQStCLEVBQS9CLENBSGtDO0FBSWxDLGVBQUssc0JBQUwsR0FBOEIsSUFBOUIsQ0FKa0M7QUFLbEMsZUFBSyxrQkFBTCxHQUEwQixFQUExQixDQUxrQztTQUFwQzs7QUFIVyxtQ0FlWCxxRUFBOEI7OztBQUU1QixjQUFJLHlCQUF5QixLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGVBQXpCLENBQXlDLFNBQXpDLENBQW1ELEtBQUssS0FBTCxFQUFZLFVBQUMsQ0FBRCxFQUFJLENBQUosRUFBVTtBQUdwRyxrQkFBSyx1QkFBTCxHQUhvRzs7QUFPcEcsa0JBQUssS0FBTCxDQUFXLHVCQUFYLEdBQXFDLE1BQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsS0FBM0IsQ0FBaUMsQ0FBakMsQ0FBckMsQ0FQb0c7QUFRcEcsa0JBQUssS0FBTCxDQUFXLFNBQVgsR0FSb0c7O0FBWXBHLGtCQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEtBQXJCLEdBWm9HO0FBYXBHLGtCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLHFCQUExQixHQWJvRztBQWNwRyxrQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixLQUExQixHQWRvRztBQWVwRyxrQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixnQkFBMUIsR0Fmb0c7O0FBa0JwRyxpQkFBSyxJQUFJLENBQUosSUFBUyxNQUFLLEtBQUwsQ0FBVyxrQkFBWCxFQUErQjtBQUMzQyxrQkFBSSxNQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixjQUE5QixDQUE2QyxDQUE3QyxDQUFKLEVBQXFEO0FBQ25ELHNCQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixDQUE5QixJQUFtQyxTQUFuQyxDQURtRDtBQUVuRCxzQkFBSyxLQUFMLENBQVcsMkJBQVgsQ0FBdUMsSUFBdkMsQ0FBNEMsQ0FBNUMsRUFGbUQ7ZUFBckQ7YUFERjs7QUFRQSxrQkFBSyxzQkFBTCxHQTFCb0c7V0FBVixDQUF4RixDQUZ3QjtBQWdDNUIsZUFBSyxzQkFBTCxHQUE4QixLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGVBQXpCLENBaENGOzs7QUFmbkIsbUNBdURYLDJEQUF5Qjs7O0FBRXZCLGNBQUksZ0JBQWdCLEtBQUssZUFBTCxDQUFxQixnQkFBckIsQ0FBc0MsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUF0RCxDQUZtQjtBQUd2Qix3QkFBYyxTQUFkLENBQXdCLFVBQUMsT0FBRCxFQUFhOztBQUduQyxnQkFBSSxjQUFjLE9BQUssS0FBTCxDQUFXLHVCQUFYLENBSGlCO0FBSW5DLGdCQUFJLE1BQU0sT0FBSyxLQUFMLENBQVcsZUFBWCxDQUp5QjtBQUtuQyxnQkFBSSxPQUFPLE9BQUssS0FBTCxDQUFXLGNBQVgsQ0FMd0I7O0FBUW5DLGdCQUFJLFNBQVMsQ0FBQyxDQUFELENBUnNCO0FBU25DLGdCQUFJLE9BQUssS0FBTCxDQUFXLHFCQUFYLEVBQWtDO0FBQ3BDLHVCQUFTLE9BQUssS0FBTCxDQUFXLHFCQUFYLENBQWlDLE9BQUssS0FBTCxDQUFXLFdBQVgsQ0FBMUMsQ0FEb0M7YUFBdEM7QUFHQSxnQkFBSSxpQkFBaUIsSUFBakIsQ0FaK0I7O0FBZW5DLGdCQUFJLFFBQVEsTUFBUixHQUFpQixDQUFqQixFQUFvQjs7QUFFdEIsa0JBQUksUUFBUSxLQUFSLENBRmtCO0FBR3RCLGtCQUFJLFdBQVcsRUFBWCxDQUhrQjs7QUFNdEIsc0JBQVEsT0FBUixDQUFnQixVQUFDLE1BQUQsRUFBVztBQUd6QixvQkFBSSxPQUFPLFVBQVAsR0FBb0IsQ0FBcEIsRUFBdUI7QUFDekIsdUJBQUksSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLE9BQU8sVUFBUCxFQUFrQixHQUFyQyxFQUF5QztBQUN2QyxnQ0FBWSxJQUFaLENBQWlCLElBQUksT0FBTyxLQUFQLEdBQWEsQ0FBYixDQUFyQixFQUR1QzttQkFBekM7aUJBREY7O0FBT0Esb0JBQUksT0FBTyxPQUFQLENBQWUsTUFBZixHQUF3QixDQUF4QixFQUEyQjtBQUU3Qix5QkFBTyxPQUFQLENBQWUsT0FBZixDQUF1QixVQUFDLENBQUQsRUFBTztBQUM1Qix3QkFBRyxFQUFFLE9BQUssS0FBTCxDQUFXLFdBQVgsQ0FBRixLQUE2QixNQUE3QixFQUFvQztBQUNyQyx1Q0FBaUIsS0FBakIsQ0FEcUM7cUJBQXZDOztBQUlBLHdCQUFJLGNBQWMsQ0FBQyxDQUFELENBTFU7QUFNNUIsZ0NBQVksT0FBWixDQUFvQixVQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWdCO0FBQ2xDLDBCQUFHLElBQUksT0FBSyxLQUFMLENBQVcsV0FBWCxDQUFKLEtBQWdDLEVBQUUsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUFsQyxFQUEwRDtBQUMzRCxzQ0FBYyxLQUFkLENBRDJEO3VCQUE3RDtxQkFEa0IsQ0FBcEIsQ0FONEI7QUFXNUIsd0JBQUcsZ0JBQWdCLENBQUMsQ0FBRCxFQUFHO0FBQ3BCLGtDQUFZLE1BQVosQ0FBbUIsV0FBbkIsRUFBZ0MsQ0FBaEMsRUFEb0I7cUJBQXRCO21CQVhxQixDQUF2QixDQUY2QjtpQkFBL0I7ZUFWYyxDQUFoQixDQU5zQjs7QUFxQ3RCLGtCQUFJLFdBQVcsQ0FBQyxDQUFELENBckNPOztBQXVDdEIsa0JBQUksQ0FBQyxjQUFELEVBQWlCO0FBQ25CLHFCQUFLLElBQUksQ0FBSixJQUFTLE9BQUssS0FBTCxDQUFXLGtCQUFYLEVBQStCO0FBQzNDLHNCQUFJLE9BQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLGNBQTlCLENBQTZDLENBQTdDLENBQUosRUFBcUQ7QUFDbkQsMkJBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLENBQTlCLElBQW1DLFNBQW5DLENBRG1EO0FBRW5ELDJCQUFLLEtBQUwsQ0FBVywyQkFBWCxDQUF1QyxJQUF2QyxDQUE0QyxDQUE1QyxFQUZtRDttQkFBckQ7aUJBREY7QUFNQSx1QkFBSyxLQUFMLENBQVcscUJBQVgsR0FBbUMsSUFBbkMsQ0FQbUI7QUFRbkIsdUJBQUssS0FBTCxDQUFXLGVBQVgsR0FBNkIsQ0FBQyxDQUFELENBUlY7ZUFBckIsTUFTTztBQUNMLG9CQUFJLFdBQVcsQ0FBQyxDQUFELEVBQUk7QUFDakIseUJBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLE9BQW5DLENBQTJDLFVBQUMsQ0FBRCxFQUFJLEtBQUosRUFBYztBQUN2RCx3QkFBSSxXQUFXLEVBQUUsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUFiLEVBQXNDO0FBQ3hDLGlDQUFXLEtBQVgsQ0FEd0M7cUJBQTFDO21CQUR5QyxDQUEzQyxDQURpQjtpQkFBbkI7ZUFWRjs7QUFxQkEscUJBQUssS0FBTCxDQUFXLFNBQVgsR0E1RHNCOztBQStEdEIsa0JBQUksV0FBVyxDQUFDLENBQUQsRUFBSTtBQUNqQix1QkFBSyxLQUFMLENBQVcscUJBQVgsR0FBbUMsT0FBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsUUFBbkMsQ0FBbkMsQ0FEaUI7QUFFakIsdUJBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLE9BQUssS0FBTCxDQUFXLFdBQVgsQ0FBOUIsR0FBd0QsT0FBSyxLQUFMLENBQVcscUJBQVgsQ0FBaUMsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUF6RixDQUZpQjtBQUdqQix1QkFBSyxLQUFMLENBQVcsZUFBWCxHQUE2QixRQUE3QixDQUhpQjtlQUFuQjs7QUFPQSxtQkFBSyxnQkFBTCxDQUFzQixLQUF0QixFQXRFc0I7YUFBeEI7V0Fmc0IsQ0FBeEIsQ0FIdUI7QUE2RnZCLGVBQUssa0JBQUwsR0FBMEIsYUFBMUIsQ0E3RnVCOzs7QUF2RGQsbUNBMkpYLHFFQUE4Qjs7O0FBQzVCLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsY0FBdkIsQ0FBc0MsT0FBdEMsQ0FBOEMsVUFBQyxRQUFELEVBQWM7QUFDMUQsZ0JBQUksbUJBQW1CLE9BQUssZUFBTCxDQUFxQixXQUFyQixDQUFpQyxPQUFLLEtBQUwsQ0FBVyxrQkFBWCxFQUErQixRQUFoRSxDQUFuQixDQURzRDtBQUUxRCw2QkFBaUIsU0FBakIsQ0FBMkIsVUFBQyxRQUFELEVBQVcsUUFBWCxFQUF3QjtBQUdqRCxrQkFBSSxnQkFBZ0IsV0FBVyxTQUFTLFFBQVQsRUFBWCxHQUErQixRQUEvQixDQUg2QjtBQUlqRCxrQkFBSSxnQkFBZ0IsV0FBVyxTQUFTLFFBQVQsRUFBWCxHQUErQixRQUEvQixDQUo2Qjs7QUFNakQsa0JBQUksa0JBQWtCLGFBQWxCLEVBQWlDO0FBRW5DLG9CQUFJLE9BQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLE9BQXZDLENBQStDLFFBQS9DLE1BQTZELENBQUMsQ0FBRCxJQUFNLE9BQUssS0FBTCxDQUFXLHFCQUFYLEVBQWtDO0FBQ3ZHLHlCQUFLLEtBQUwsQ0FBVyxxQkFBWCxDQUFpQyxRQUFqQyxJQUE2QyxRQUE3QyxDQUR1RztBQUV2Ryx5QkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFLLEtBQUwsQ0FBVyxlQUFYLEVBQTRCLElBQWhFLEVBRnVHO2lCQUF6RyxNQUdPO0FBRUwseUJBQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLE1BQXZDLENBQThDLE9BQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLE9BQXZDLENBQStDLFFBQS9DLENBQTlDLEVBQXdHLENBQXhHLEVBRks7aUJBSFA7ZUFGRixNQVNPO0FBQ0wsdUJBQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLE1BQXZDLENBQThDLE9BQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLE9BQXZDLENBQStDLFFBQS9DLENBQTlDLEVBQXdHLENBQXhHLEVBREs7ZUFUUDthQU55QixDQUEzQixDQUYwRDtBQXFCMUQsbUJBQUssdUJBQUwsQ0FBNkIsSUFBN0IsQ0FBa0MsZ0JBQWxDLEVBckIwRDtXQUFkLENBQTlDLENBRDRCOzs7QUEzSm5CLG1DQXlMWCx1RUFBK0I7QUFDN0IsZUFBSyxzQkFBTCxDQUE0QixXQUE1QixHQUQ2QjtBQUU3QixlQUFLLHNCQUFMLEdBQThCLElBQTlCLENBRjZCOzs7QUF6THBCLG1DQWtNWCw2REFBMEI7QUFDeEIsZUFBSyxrQkFBTCxDQUF3QixXQUF4QixHQUR3QjtBQUV4QixlQUFLLGtCQUFMLEdBQTBCLElBQTFCLENBRndCOzs7QUFsTWYsbUNBMk1YLHVFQUErQjtBQUM3QixlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLHVCQUFMLENBQTZCLE1BQTdCLEVBQXFDLEdBQXpELEVBQThEO0FBQzVELGdCQUFJO0FBQ0YsbUJBQUssdUJBQUwsQ0FBNkIsQ0FBN0IsRUFBZ0MsV0FBaEMsR0FERTthQUFKLENBRUUsT0FBTyxDQUFQLEVBQVUsRUFBVjtXQUhKO0FBTUEsZUFBSyx1QkFBTCxHQUErQixFQUEvQixDQVA2Qjs7O2VBM01wQiIsImZpbGUiOiJ2R3JpZC92LWdyaWQtb2JzZXJ2YWJsZXMuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
