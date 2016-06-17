/* */ 
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var VGridObservables = exports.VGridObservables = function () {
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

        _this.vGrid.vGridCurrentEntityRef = null;
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
            _this3.vGrid.vGridGenerator.rebindRowNumber(_this3.vGrid.vGridCurrentRow);
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
  }();
});