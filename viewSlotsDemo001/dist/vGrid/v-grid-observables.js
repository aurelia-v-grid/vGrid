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
          this.collectionSubscription = this.vGrid.__observers__.collection;
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

              grid.collectionChange(false, _this2.vGrid.scrollBottomNext);
              if (_this2.vGrid.filterRowDisplaying) {
                _this2.vGrid.vGridCellEdit.setBackFocus();
              }

              if (_this2.vGrid.scrollBottomNext === true) {
                _this2.vGrid.scrollBottomNext = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1vYnNlcnZhYmxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQ0FNYTtBQUdYLGlCQUhXLGdCQUdYLENBQVksS0FBWixFQUFtQjtnQ0FIUixrQkFHUTs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQURpQjtBQUVqQixlQUFLLHVCQUFMLEdBQStCLEVBQS9CLENBRmlCO0FBR2pCLGVBQUssc0JBQUwsR0FBOEIsSUFBOUIsQ0FIaUI7QUFJakIsZUFBSyxrQkFBTCxHQUEwQixFQUExQixDQUppQjtTQUFuQjs7QUFIVyxtQ0FjWCxxRUFBOEI7OztBQUU1QixjQUFJLHlCQUF5QixLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLFVBQXpCLENBQW9DLFNBQXBDLENBQThDLEtBQUssS0FBTCxFQUFZLFVBQUMsQ0FBRCxFQUFJLENBQUosRUFBVTtBQUcvRixrQkFBSyx1QkFBTCxHQUgrRjs7QUFPL0Ysa0JBQUssS0FBTCxDQUFXLGtCQUFYLEdBQWdDLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsS0FBdEIsQ0FBNEIsQ0FBNUIsQ0FBaEMsQ0FQK0Y7QUFRL0Ysa0JBQUssS0FBTCxDQUFXLFNBQVgsR0FSK0Y7O0FBWS9GLGtCQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEtBQXJCLEdBWitGO0FBYS9GLGtCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLHFCQUExQixHQWIrRjtBQWMvRixrQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixLQUExQixHQWQrRjtBQWUvRixrQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixnQkFBMUIsR0FmK0Y7O0FBbUIvRixpQkFBSyxJQUFJLENBQUosSUFBUyxNQUFLLEtBQUwsQ0FBVyxhQUFYLEVBQTBCO0FBQ3RDLGtCQUFJLE1BQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsY0FBekIsQ0FBd0MsQ0FBeEMsQ0FBSixFQUFnRDtBQUM5QyxzQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5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QUFYLEtBQWdDLElBQWhDLEVBQXNDO0FBQ3hDLHVCQUFLLEtBQUwsQ0FBVyxnQkFBWCxHQUE4QixLQUE5QixDQUR3QztlQUExQzthQXJGRjtXQWZzQixDQUF4QixDQUh1QjtBQTZHdkIsZUFBSyxrQkFBTCxHQUEwQixhQUExQixDQTdHdUI7OztBQXZEZCxtQ0EyS1gscUVBQThCOzs7QUFDNUIsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixjQUF2QixDQUFzQyxPQUF0QyxDQUE4QyxVQUFDLFFBQUQsRUFBYztBQUMxRCxnQkFBSSxtQkFBbUIsT0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixXQUEzQixDQUF1QyxPQUFLLEtBQUwsQ0FBVyxhQUFYLEVBQTBCLFFBQWpFLENBQW5CLENBRHNEO0FBRTFELDZCQUFpQixTQUFqQixDQUEyQixVQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXdCO0FBQ2pELGtCQUFJLGFBQWEsUUFBYixFQUF1QjtBQUV6QixvQkFBSSxPQUFLLEtBQUwsQ0FBVyxzQkFBWCxDQUFrQyxPQUFsQyxDQUEwQyxRQUExQyxNQUF3RCxDQUFDLENBQUQsRUFBSTtBQUM5RCx5QkFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsUUFBNUIsSUFBd0MsUUFBeEMsQ0FEOEQ7QUFFOUQseUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsT0FBSyxLQUFMLENBQVcsU0FBWCxFQUFzQixJQUExRCxFQUY4RDtpQkFBaEUsTUFHTztBQUVMLHlCQUFLLEtBQUwsQ0FBVyxzQkFBWCxDQUFrQyxNQUFsQyxDQUF5QyxPQUFLLEtBQUwsQ0FBVyxzQkFBWCxDQUFrQyxPQUFsQyxDQUEwQyxRQUExQyxDQUF6QyxFQUE4RixDQUE5RixFQUZLO2lCQUhQO2VBRkY7YUFEeUIsQ0FBM0IsQ0FGMEQ7QUFjMUQsbUJBQUssdUJBQUwsQ0FBNkIsSUFBN0IsQ0FBa0MsZ0JBQWxDLEVBZDBEO1dBQWQsQ0FBOUMsQ0FENEI7OztBQTNLbkIsbUNBa01YLHVFQUErQjtBQUM3QixlQUFLLHNCQUFMLENBQTRCLFdBQTVCLEdBRDZCO0FBRTdCLGVBQUssc0JBQUwsR0FBOEIsSUFBOUIsQ0FGNkI7OztBQWxNcEIsbUNBMk1YLDZEQUEwQjtBQUN4QixlQUFLLGtCQUFMLENBQXdCLFdBQXhCLEdBRHdCO0FBRXhCLGVBQUssa0JBQUwsR0FBMEIsSUFBMUIsQ0FGd0I7OztBQTNNZixtQ0FvTlgsdUVBQStCO0FBQzdCLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssdUJBQUwsQ0FBNkIsTUFBN0IsRUFBcUMsR0FBekQsRUFBOEQ7QUFDNUQsZ0JBQUk7QUFDRixtQkFBSyx1QkFBTCxDQUE2QixDQUE3QixFQUFnQyxXQUFoQyxHQURFO2FBQUosQ0FFRSxPQUFPLENBQVAsRUFBVSxFQUFWO1dBSEo7QUFNQSxlQUFLLHVCQUFMLEdBQStCLEVBQS9CLENBUDZCOzs7ZUFwTnBCIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1vYnNlcnZhYmxlcy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
