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

          var arrayObserver = this.observerLocator.getArrayObserver(this.vGrid.collection);
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

              if (newRowNo > -1) {
                _this2.vGrid.currentRowEntity = _this2.vGrid.collectionFiltered[newRowNo];
                _this2.vGrid.currentEntity[_this2.sgkey] = _this2.vGrid.currentRowEntity[_this2.vGrid.sgkey];
                _this2.vGrid.filterRow = newRowNo;
              }

              grid.collectionChange(false);
            }
          });
          this.subscriptionsArray = arrayObserver;
        };

        VGridObservables.prototype.enableObservablesAttributes = function enableObservablesAttributes() {
          var _this3 = this;

          this.vGrid.vGridConfig.attributeArray.forEach(function (property) {
            var propertyObserver = _this3.observerLocator.getObserver(_this3.vGrid.currentEntity, property);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1vYnNlcnZhYmxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQ0FNYTtBQUdYLGlCQUhXLGdCQUdYLENBQVksS0FBWixFQUFtQixlQUFuQixFQUFvQztnQ0FIekIsa0JBR3lCOztBQUNsQyxlQUFLLGVBQUwsR0FBdUIsZUFBdkIsQ0FEa0M7QUFFbEMsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUZrQztBQUdsQyxlQUFLLHVCQUFMLEdBQStCLEVBQS9CLENBSGtDO0FBSWxDLGVBQUssc0JBQUwsR0FBOEIsSUFBOUIsQ0FKa0M7QUFLbEMsZUFBSyxrQkFBTCxHQUEwQixFQUExQixDQUxrQztTQUFwQzs7QUFIVyxtQ0FlWCxxRUFBOEI7OztBQUU1QixjQUFJLHlCQUF5QixLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLFVBQXpCLENBQW9DLFNBQXBDLENBQThDLEtBQUssS0FBTCxFQUFZLFVBQUMsQ0FBRCxFQUFJLENBQUosRUFBVTtBQUcvRixrQkFBSyx1QkFBTCxHQUgrRjs7QUFPL0Ysa0JBQUssS0FBTCxDQUFXLGtCQUFYLEdBQWdDLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsS0FBdEIsQ0FBNEIsQ0FBNUIsQ0FBaEMsQ0FQK0Y7QUFRL0Ysa0JBQUssS0FBTCxDQUFXLFNBQVgsR0FSK0Y7O0FBWS9GLGtCQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEtBQXJCLEdBWitGO0FBYS9GLGtCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLHFCQUExQixHQWIrRjtBQWMvRixrQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixLQUExQixHQWQrRjtBQWUvRixrQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixnQkFBMUIsR0FmK0Y7O0FBbUIvRixpQkFBSyxJQUFJLENBQUosSUFBUyxNQUFLLEtBQUwsQ0FBVyxhQUFYLEVBQTBCO0FBQ3RDLGtCQUFJLE1BQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsY0FBekIsQ0FBd0Ms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
