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
            _this.vGrid.checkKeys();

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1vYnNlcnZhYmxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQ0FNYTtBQUdYLGlCQUhXLGdCQUdYLENBQVksS0FBWixFQUFtQixlQUFuQixFQUFvQztnQ0FIekIsa0JBR3lCOztBQUNsQyxlQUFLLGVBQUwsR0FBdUIsZUFBdkIsQ0FEa0M7QUFFbEMsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUZrQztBQUdsQyxlQUFLLHVCQUFMLEdBQStCLEVBQS9CLENBSGtDO0FBSWxDLGVBQUssc0JBQUwsR0FBOEIsSUFBOUIsQ0FKa0M7QUFLbEMsZUFBSyxrQkFBTCxHQUEwQixFQUExQixDQUxrQztTQUFwQzs7QUFIVyxtQ0FlWCxxRUFBOEI7OztBQUU1QixjQUFJLHlCQUF5QixLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGVBQXpCLENBQXlDLFNBQXpDLENBQW1ELEtBQUssS0FBTCxFQUFZLFVBQUMsQ0FBRCxFQUFJLENBQUosRUFBVTtBQUdwRyxrQkFBSyx1QkFBTCxHQUhvRzs7QUFPcEcsa0JBQUssS0FBTCxDQUFXLHVCQUFYLEdBQXFDLE1BQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsS0FBM0IsQ0FBaUMsQ0FBakMsQ0FBckMsQ0FQb0c7QUFRcEcsa0JBQUssS0FBTCxDQUFXLFNBQVgsR0FSb0c7O0FBWXBHLGtCQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEtBQXJCLEdBWm9HO0FBYXBHLGtCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLHFCQUExQixHQWJvRztBQWNwRyxrQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixLQUExQixHQWRvRztBQWVwRyxrQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixnQkFBMUIsR0Fmb0c7O0FBa0JwRyxpQkFBSyxJQUFJLENBQUosSUFBUyxNQUFLLEtBQUwsQ0FBVyxrQkFBWCxFQUErQjtBQUMzQyxrQkFBSSxNQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixjQUE5QixDQUE2QyxDQUE3QyxDQUFKLEVBQXFEO0FBQ25ELHNCQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixDQUE5QixJQUFtQyxTQUFuQyxDQURtRDtBQUVuRCxzQkFBSyxLQUFMLENBQVcsMkJBQVgsQ0FBdUMsSUFBdkMsQ0FBNEMsQ0FBNUMsRUFGbUQ7ZUFBckQ7YUFERjs7QUFRQSxrQkFBSyxzQkFBTCxHQTFCb0c7V0FBVixDQUF4RixDQUZ3QjtBQWdDNUIsZUFBSyxzQkFBTCxHQUE4QixLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGVBQXpCLENBaENGOzs7QUFmbkIsbUNBdURYLDJEQUF5Qjs7O0FBRXZCLGNBQUksZ0JBQWdCLEtBQUssZUFBTCxDQUFxQixnQkFBckIsQ0FBc0MsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUF0RCxDQUZtQjtBQUd2Qix3QkFBYyxTQUFkLENBQXdCLFVBQUMsb0JBQUQsRUFBMEI7O0FBR2hELGdCQUFJLGNBQWMsT0FBSyxLQUFMLENBQVcsdUJBQVgsQ0FIOEI7QUFJaEQsZ0JBQUksTUFBTSxPQUFLLEtBQUwsQ0FBVyxlQUFYLENBSnNDO0FBS2hELGdCQUFJLE9BQU8sT0FBSyxLQUFMLENBQVcsY0FBWCxDQUxxQzs7QUFRaEQsZ0JBQUksU0FBUyxDQUFDLENBQUQsQ0FSbUM7QUFTaEQsZ0JBQUksT0FBSyxLQUFMLENBQVcscUJBQVgsRUFBa0M7QUFDcEMsdUJBQVMsT0FBSyxLQUFMLENBQVcscUJBQVgsQ0FBaUMsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUExQyxDQURvQzthQUF0QztBQUdBLGdCQUFJLGlCQUFpQixJQUFqQixDQVo0Qzs7QUFlaEQsZ0JBQUkscUJBQXFCLE1BQXJCLEdBQThCLENBQTlCLEVBQWlDOztBQUVuQyxrQkFBSSxRQUFRLEtBQVIsQ0FGK0I7QUFHbkMsa0JBQUksV0FBVyxFQUFYLENBSCtCOztBQU1uQyxtQ0FBcUIsT0FBckIsQ0FBNkIsVUFBQyxjQUFELEVBQW1CO0FBRzlDLG9CQUFJLGVBQWUsVUFBZixHQUE0QixDQUE1QixFQUErQjtBQUNqQyx1QkFBSSxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksZUFBZSxVQUFmLEVBQTBCLEdBQTdDLEVBQWlEO0FBQy9DLGdDQUFZLElBQVosQ0FBaUIsSUFBSSxlQUFlLEtBQWYsR0FBcUIsQ0FBckIsQ0FBckIsRUFEK0M7QUFFL0MsMkJBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsSUFBSSxlQUFlLEtBQWYsR0FBcUIsQ0FBckIsQ0FBeEIsRUFGK0M7bUJBQWpEO2lCQURGOztBQVFBLG9CQUFJLGVBQWUsT0FBZixDQUF1QixNQUF2QixHQUFnQyxDQUFoQyxFQUFtQztBQUVyQyxpQ0FBZSxPQUFmLENBQXVCLE9BQXZCLENBQStCLFVBQUMsQ0FBRCxFQUFPO0FBQ3BDLHdCQUFHLEVBQUUsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUFGLEtBQTZCLE1BQTdCLEVBQW9DO0FBQ3JDLHVDQUFpQixLQUFqQixDQURxQztxQkFBdkM7O0FBSUEsd0JBQUksY0FBYyxDQUFDLENBQUQsQ0FMa0I7QUFNcEMsZ0NBQVksT0FBWixDQUFvQixVQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWdCO0FBQ2xDLDBCQUFHLElBQUksT0FBSyxLQUFMLENBQVcsV0FBWCxDQUFKLEtBQWdDLEVBQUUsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUFsQyxFQUEwRDtBQUMzRCxzQ0FBYyxLQUFkLENBRDJEO3VCQUE3RDtxQkFEa0IsQ0FBcEIsQ0FOb0M7QUFXcEMsd0JBQUcsZ0JBQWdCLENBQUMsQ0FBRCxFQUFHO0FBQ3BCLGtDQUFZLE1BQVosQ0FBbUIsV0FBbkIsRUFBZ0MsQ0FBaEMsRUFEb0I7cUJBQXRCO21CQVg2QixDQUEvQixDQUZxQztpQkFBdkM7ZUFYMkIsQ0FBN0IsQ0FObUM7O0FBc0NuQyxrQkFBSSxXQUFXLENBQUMsQ0FBRCxDQXRDb0I7O0FBeUNuQyxrQkFBSSxDQUFDLGNBQUQsRUFBaUI7QUFHbkIscUJBQUssSUFBSSxDQUFKLElBQVMsT0FBSyxLQUFMLENBQVcsa0JBQVgsRUFBK0I7QUFDM0Msc0JBQUksT0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsY0FBOUIsQ0FBNkMsQ0FBN0MsQ0FBSixFQUFxRDtBQUNuRCwyQkFBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsQ0FBOUIsSUFBbUMsU0FBbkMsQ0FEbUQ7QUFFbkQsMkJBQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLElBQXZDLENBQTRDLENBQTVDLEVBRm1EO21CQUFyRDtpQkFERjtBQU1BLHVCQUFLLEtBQUwsQ0FBVyxxQkFBWCxHQUFtQyxJQUFuQyxDQVRtQjtBQVVuQix1QkFBSyxLQUFMLENBQVcsZUFBWCxHQUE2QixDQUFDLENBQUQsQ0FWVjtlQUFyQixNQVlPO0FBR0wsb0JBQUksV0FBVyxDQUFDLENBQUQsRUFBSTtBQUNqQix5QkFBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsT0FBbkMsQ0FBMkMsVUFBQyxDQUFELEVBQUksS0FBSixFQUFjO0FBQ3ZELHdCQUFJLFdBQVcsRUFBRSxPQUFLLEtBQUwsQ0FBVyxXQUFYLENBQWIsRUFBc0M7QUFDeEMsNkJBQUssS0FBTCxDQUFXLGVBQVgsR0FBNkIsS0FBN0IsQ0FEd0M7cUJBQTFDO21CQUR5QyxDQUEzQyxDQURpQjtpQkFBbkI7ZUFmRjtBQTJCQSxtQkFBSyxnQkFBTCxDQUFzQixLQUF0QixFQXBFbUM7YUFBckM7V0Fmc0IsQ0FBeEIsQ0FIdUI7QUEyRnZCLGVBQUssa0JBQUwsR0FBMEIsYUFBMUIsQ0EzRnVCOzs7QUF2RGQsbUNBeUpYLHFFQUE4Qjs7O0FBQzVCLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsY0FBdkIsQ0FBc0MsT0FBdEMsQ0FBOEMsVUFBQyxRQUFELEVBQWM7QUFDMUQsZ0JBQUksbUJBQW1CLE9BQUssZUFBTCxDQUFxQixXQUFyQixDQUFpQyxPQUFLLEtBQUwsQ0FBVyxrQkFBWCxFQUErQixRQUFoRSxDQUFuQixDQURzRDtBQUUxRCw2QkFBaUIsU0FBakIsQ0FBMkIsVUFBQyxRQUFELEVBQVcsUUFBWCxFQUF3QjtBQUdqRCxrQkFBSSxnQkFBZ0IsV0FBVyxTQUFTLFFBQVQsRUFBWCxHQUErQixRQUEvQixDQUg2QjtBQUlqRCxrQkFBSSxnQkFBZ0IsV0FBVyxTQUFTLFFBQVQsRUFBWCxHQUErQixRQUEvQixDQUo2Qjs7QUFNakQsa0JBQUksa0JBQWtCLGFBQWxCLEVBQWlDO0FBRW5DLG9CQUFJLE9BQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLE9BQXZDLENBQStDLFFBQS9DLE1BQTZELENBQUMsQ0FBRCxJQUFNLE9BQUssS0FBTCxDQUFXLHFCQUFYLEVBQWtDO0FBQ3ZHLHlCQUFLLEtBQUwsQ0FBVyxxQkFBWCxDQUFpQyxRQUFqQyxJQUE2QyxRQUE3QyxDQUR1RztBQUV2Ryx5QkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFLLEtBQUwsQ0FBVyxlQUFYLEVBQTRCLElBQWhFLEVBRnVHO2lCQUF6RyxNQUdPO0FBRUwseUJBQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLE1BQXZDLENBQThDLE9BQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLE9BQXZDLENBQStDLFFBQS9DLENBQTlDLEVBQXdHLENBQXhHLEVBRks7aUJBSFA7ZUFGRixNQVNPO0FBQ0wsdUJBQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLE1BQXZDLENBQThDLE9BQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLE9BQXZDLENBQStDLFFBQS9DLENBQTlDLEVBQXdHLENBQXhHLEVBREs7ZUFUUDthQU55QixDQUEzQixDQUYwRDtBQXFCMUQsbUJBQUssdUJBQUwsQ0FBNkIsSUFBN0IsQ0FBa0MsZ0JBQWxDLEVBckIwRDtXQUFkLENBQTlDLENBRDRCOzs7QUF6Sm5CLG1DQXVMWCx1RUFBK0I7QUFDN0IsZUFBSyxzQkFBTCxDQUE0QixXQUE1QixHQUQ2QjtBQUU3QixlQUFLLHNCQUFMLEdBQThCLElBQTlCLENBRjZCOzs7QUF2THBCLG1DQWdNWCw2REFBMEI7QUFDeEIsZUFBSyxrQkFBTCxDQUF3QixXQUF4QixHQUR3QjtBQUV4QixlQUFLLGtCQUFMLEdBQTBCLElBQTFCLENBRndCOzs7QUFoTWYsbUNBeU1YLHVFQUErQjtBQUM3QixlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLHVCQUFMLENBQTZCLE1BQTdCLEVBQXFDLEdBQXpELEVBQThEO0FBQzVELGdCQUFJO0FBQ0YsbUJBQUssdUJBQUwsQ0FBNkIsQ0FBN0IsRUFBZ0MsV0FBaEMsR0FERTthQUFKLENBRUUsT0FBTyxDQUFQLEVBQVUsRUFBVjtXQUhKO0FBTUEsZUFBSyx1QkFBTCxHQUErQixFQUEvQixDQVA2Qjs7O2VBek1wQiIsImZpbGUiOiJ2R3JpZC92LWdyaWQtb2JzZXJ2YWJsZXMuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
