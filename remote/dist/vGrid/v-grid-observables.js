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
            if (!_this.vGrid.vGridConfig.keepFilterOnCollectionChange) {
              _this.vGrid.vGridGenerator.clearHeaderSortFilter();
              _this.vGrid.vGridSelection.reset();
              _this.vGrid.vGridConfig.keepFilterOnCollectionChange = false;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1vYnNlcnZhYmxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2tDQU1hLGdCO0FBR1gsa0NBQVksS0FBWixFQUFtQixlQUFuQixFQUFvQztBQUFBOztBQUNsQyxlQUFLLGVBQUwsR0FBdUIsZUFBdkI7QUFDQSxlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyx1QkFBTCxHQUErQixFQUEvQjtBQUNBLGVBQUssc0JBQUwsR0FBOEIsSUFBOUI7QUFDQSxlQUFLLGtCQUFMLEdBQTBCLEVBQTFCO0FBQ0Q7O21DQU1ELDJCLDBDQUE4QjtBQUFBOztBQU01QixjQUFJLHlCQUF5QixTQUF6QixzQkFBeUIsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFVO0FBR3JDLGtCQUFLLHVCQUFMOztBQUlBLGtCQUFLLEtBQUwsQ0FBVyx1QkFBWCxHQUFxQyxNQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLEtBQTNCLENBQWlDLENBQWpDLENBQXJDO0FBQ0Esa0JBQUssS0FBTCxDQUFXLFNBQVg7O0FBSUEsa0JBQUssS0FBTCxDQUFXLGVBQVgsR0FBNkIsQ0FBQyxDQUE5QjtBQUNBLGtCQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEtBQXJCO0FBQ0EsZ0JBQUcsQ0FBQyxNQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLDRCQUEzQixFQUF3RDtBQUN0RCxvQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixxQkFBMUI7QUFDQSxvQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixLQUExQjtBQUNBLG9CQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLDRCQUF2QixHQUFzRCxLQUF0RDtBQUNEO0FBQ0Qsa0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsZ0JBQTFCOztBQUdBLGlCQUFLLElBQUksQ0FBVCxJQUFjLE1BQUssS0FBTCxDQUFXLGtCQUF6QixFQUE2QztBQUMzQyxrQkFBSSxNQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixjQUE5QixDQUE2QyxDQUE3QyxDQUFKLEVBQXFEO0FBQ25ELHNCQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixDQUE5QixJQUFtQyxTQUFuQztBQUNBLHNCQUFLLEtBQUwsQ0FBVywyQkFBWCxDQUF1QyxJQUF2QyxDQUE0QyxDQUE1QztBQUNEO0FBQ0Y7O0FBSUQsa0JBQUssc0JBQUw7QUFHRCxXQWxDRDtBQW1DQSxlQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGVBQXpCLENBQXlDLFNBQXpDLENBQW1ELEtBQUssS0FBeEQsRUFBOEQsc0JBQTlEO0FBQ0EsZUFBSyxrQkFBTCxHQUEwQixzQkFBMUI7O0FBRUEsZUFBSyxzQkFBTCxHQUE4QixLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGVBQXZEO0FBRUQsUzs7bUNBTUQsc0IscUNBQXlCO0FBQUE7O0FBRXZCLGNBQUksZ0JBQWdCLEtBQUssZUFBTCxDQUFxQixnQkFBckIsQ0FBc0MsS0FBSyxLQUFMLENBQVcsZUFBakQsQ0FBcEI7QUFDQSx3QkFBYyxTQUFkLENBQXdCLFVBQUMsb0JBQUQsRUFBMEI7O0FBR2hELGdCQUFJLGNBQWMsT0FBSyxLQUFMLENBQVcsdUJBQTdCO0FBQ0EsZ0JBQUksTUFBTSxPQUFLLEtBQUwsQ0FBVyxlQUFyQjtBQUNBLGdCQUFJLE9BQU8sT0FBSyxLQUFMLENBQVcsY0FBdEI7O0FBR0EsZ0JBQUksU0FBUyxDQUFDLENBQWQ7QUFDQSxnQkFBSSxPQUFLLEtBQUwsQ0FBVyxxQkFBZixFQUFzQztBQUNwQyx1QkFBUyxPQUFLLEtBQUwsQ0FBVyxxQkFBWCxDQUFpQyxPQUFLLEtBQUwsQ0FBVyxXQUE1QyxDQUFUO0FBQ0Q7QUFDRCxnQkFBSSxpQkFBaUIsSUFBckI7O0FBR0EsZ0JBQUkscUJBQXFCLE1BQXJCLEdBQThCLENBQWxDLEVBQXFDOztBQUVuQyxrQkFBSSxRQUFRLEtBQVo7QUFDQSxrQkFBSSxXQUFXLEVBQWY7O0FBR0EsbUNBQXFCLE9BQXJCLENBQTZCLFVBQUMsY0FBRCxFQUFtQjtBQUc5QyxvQkFBSSxlQUFlLFVBQWYsR0FBNEIsQ0FBaEMsRUFBbUM7QUFDakMsdUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxlQUFlLFVBQW5DLEVBQStDLEdBQS9DLEVBQW9EO0FBQ2xELGdDQUFZLElBQVosQ0FBaUIsSUFBSSxlQUFlLEtBQWYsR0FBdUIsQ0FBM0IsQ0FBakI7QUFDQSwyQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixJQUFJLGVBQWUsS0FBZixHQUF1QixDQUEzQixDQUFwQjtBQUNEO0FBQ0Y7O0FBR0Qsb0JBQUksZUFBZSxPQUFmLENBQXVCLE1BQXZCLEdBQWdDLENBQXBDLEVBQXVDO0FBRXJDLGlDQUFlLE9BQWYsQ0FBdUIsT0FBdkIsQ0FBK0IsVUFBQyxDQUFELEVBQU87QUFDcEMsd0JBQUksRUFBRSxPQUFLLEtBQUwsQ0FBVyxXQUFiLE1BQThCLE1BQWxDLEVBQTBDO0FBQ3hDLHVDQUFpQixLQUFqQjtBQUNEOztBQUVELHdCQUFJLGNBQWMsQ0FBQyxDQUFuQjtBQUNBLGdDQUFZLE9BQVosQ0FBb0IsVUFBQyxHQUFELEVBQU0sS0FBTixFQUFnQjtBQUNsQywwQkFBSSxJQUFJLE9BQUssS0FBTCxDQUFXLFdBQWYsTUFBZ0MsRUFBRSxPQUFLLEtBQUwsQ0FBVyxXQUFiLENBQXBDLEVBQStEO0FBQzdELHNDQUFjLEtBQWQ7QUFDRDtBQUNGLHFCQUpEO0FBS0Esd0JBQUksZ0JBQWdCLENBQUMsQ0FBckIsRUFBd0I7QUFDdEIsa0NBQVksTUFBWixDQUFtQixXQUFuQixFQUFnQyxDQUFoQztBQUNEO0FBQ0YsbUJBZEQ7QUFlRDtBQUNGLGVBN0JEOztBQWdDQSxrQkFBSSxXQUFXLENBQUMsQ0FBaEI7O0FBR0Esa0JBQUksQ0FBQyxjQUFMLEVBQXFCO0FBR25CLHFCQUFLLElBQUksQ0FBVCxJQUFjLE9BQUssS0FBTCxDQUFXLGtCQUF6QixFQUE2QztBQUMzQyxzQkFBSSxPQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixjQUE5QixDQUE2QyxDQUE3QyxDQUFKLEVBQXFEO0FBQ25ELDJCQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixDQUE5QixJQUFtQyxTQUFuQztBQUNBLDJCQUFLLEtBQUwsQ0FBVywyQkFBWCxDQUF1QyxJQUF2QyxDQUE0QyxDQUE1QztBQUNEO0FBQ0Y7QUFDRCx1QkFBSyxLQUFMLENBQVcscUJBQVgsR0FBbUMsSUFBbkM7QUFDQSx1QkFBSyxLQUFMLENBQVcsZUFBWCxHQUE2QixDQUFDLENBQTlCO0FBRUQsZUFaRCxNQVlPO0FBR0wsb0JBQUksV0FBVyxDQUFDLENBQWhCLEVBQW1CO0FBQ2pCLHlCQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxPQUFuQyxDQUEyQyxVQUFDLENBQUQsRUFBSSxLQUFKLEVBQWM7QUFDdkQsd0JBQUksV0FBVyxFQUFFLE9BQUssS0FBTCxDQUFXLFdBQWIsQ0FBZixFQUEwQztBQUN4Qyw2QkFBSyxLQUFMLENBQVcsZUFBWCxHQUE2QixLQUE3QjtBQUNEO0FBQ0YsbUJBSkQ7QUFLRDtBQUVGO0FBSUQsbUJBQUssZ0JBQUwsQ0FBc0IsS0FBdEI7QUFHRDtBQUNGLFdBdkZEO0FBd0ZBLGVBQUssa0JBQUwsR0FBMEIsYUFBMUI7QUFDRCxTOzttQ0FNRCwyQiwwQ0FBOEI7QUFBQTs7QUFDNUIsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixjQUF2QixDQUFzQyxPQUF0QyxDQUE4QyxVQUFDLFFBQUQsRUFBYztBQUMxRCxnQkFBSSxtQkFBbUIsT0FBSyxlQUFMLENBQXFCLFdBQXJCLENBQWlDLE9BQUssS0FBTCxDQUFXLGtCQUE1QyxFQUFnRSxRQUFoRSxDQUF2QjtBQUNBLDZCQUFpQixTQUFqQixDQUEyQixVQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXdCO0FBR2pELGtCQUFJLGdCQUFnQixXQUFXLFNBQVMsUUFBVCxFQUFYLEdBQWlDLFFBQXJEO0FBQ0Esa0JBQUksZ0JBQWdCLFdBQVcsU0FBUyxRQUFULEVBQVgsR0FBaUMsUUFBckQ7O0FBRUEsa0JBQUksa0JBQWtCLGFBQXRCLEVBQXFDO0FBRW5DLG9CQUFJLE9BQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLE9BQXZDLENBQStDLFFBQS9DLE1BQTZELENBQUMsQ0FBOUQsSUFBbUUsT0FBSyxLQUFMLENBQVcscUJBQWxGLEVBQXlHO0FBQ3ZHLHlCQUFLLEtBQUwsQ0FBVyxxQkFBWCxDQUFpQyxRQUFqQyxJQUE2QyxRQUE3QztBQUNBLHlCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQUssS0FBTCxDQUFXLGVBQS9DLEVBQWdFLElBQWhFO0FBQ0QsaUJBSEQsTUFHTztBQUVMLHlCQUFLLEtBQUwsQ0FBVywyQkFBWCxDQUF1QyxNQUF2QyxDQUE4QyxPQUFLLEtBQUwsQ0FBVywyQkFBWCxDQUF1QyxPQUF2QyxDQUErQyxRQUEvQyxDQUE5QyxFQUF3RyxDQUF4RztBQUNEO0FBQ0YsZUFURCxNQVNPO0FBQ0wsdUJBQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLE1BQXZDLENBQThDLE9BQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLE9BQXZDLENBQStDLFFBQS9DLENBQTlDLEVBQXdHLENBQXhHO0FBQ0Q7QUFDRixhQWxCRDtBQW1CQSxtQkFBSyx1QkFBTCxDQUE2QixJQUE3QixDQUFrQyxnQkFBbEM7QUFDRCxXQXRCRDtBQXVCRCxTOzttQ0FNRCw0QiwyQ0FBK0I7QUFDN0IsZUFBSyxzQkFBTCxDQUE0QixXQUE1QixDQUF3QyxLQUFLLEtBQTdDLEVBQW9ELEtBQUssa0JBQXpEO0FBRUQsUzs7bUNBTUQsdUIsc0NBQTBCO0FBQ3hCLGVBQUssa0JBQUwsQ0FBd0IsV0FBeEI7QUFDQSxlQUFLLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0QsUzs7bUNBTUQsNEIsMkNBQStCO0FBQzdCLGVBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLHVCQUFMLENBQTZCLE1BQWpELEVBQXlELEdBQXpELEVBQThEO0FBQzVELGdCQUFJO0FBQ0YsbUJBQUssdUJBQUwsQ0FBNkIsQ0FBN0IsRUFBZ0MsV0FBaEM7QUFDRCxhQUZELENBRUUsT0FBTyxDQUFQLEVBQVUsQ0FDWDtBQUNGO0FBQ0QsZUFBSyx1QkFBTCxHQUErQixFQUEvQjtBQUNELFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLW9ic2VydmFibGVzLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
