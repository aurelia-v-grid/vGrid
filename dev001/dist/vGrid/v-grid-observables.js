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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1vYnNlcnZhYmxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQ0FNYTtBQUdYLGlCQUhXLGdCQUdYLENBQVksS0FBWixFQUFtQjtnQ0FIUixrQkFHUTs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQURpQjtBQUVqQixlQUFLLHVCQUFMLEdBQStCLEVBQS9CLENBRmlCO0FBR2pCLGVBQUssc0JBQUwsR0FBOEIsSUFBOUIsQ0FIaUI7QUFJakIsZUFBSyxrQkFBTCxHQUEwQixFQUExQixDQUppQjtTQUFuQjs7QUFIVyxtQ0FnQlgscUVBQThCOzs7QUFFNUIsY0FBSSx5QkFBeUIsS0FBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixVQUF6QixDQUFvQyxTQUFwQyxDQUE4QyxLQUFLLEtBQUwsRUFBWSxVQUFDLENBQUQsRUFBSSxDQUFKLEVBQVU7QUFHL0Ysa0JBQUssdUJBQUwsR0FIK0Y7O0FBTy9GLGtCQUFLLEtBQUwsQ0FBVyxrQkFBWCxHQUFnQyxNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLEtBQXRCLENBQTRCLENBQTVCLENBQWhDLENBUCtGO0FBUS9GLGtCQUFLLEtBQUwsQ0FBVyxTQUFYLEdBUitGOztBQVkvRixrQkFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixLQUFyQixHQVorRjtBQWEvRixrQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixxQkFBMUIsR0FiK0Y7QUFjL0Ysa0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsS0FBMUIsR0FkK0Y7QUFlL0Ysa0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsZ0JBQTFCLEdBZitGOztBQW1CL0YsaUJBQUssSUFBSSxDQUFKLElBQVMsTUFBSyxLQUFMLENBQVcsYUFBWCxFQUEwQjtBQUN0QyxrQkFBSSxNQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGNBQXpCLENBQXdDLENBQXhDLENBQUosRUFBZ0Q7QUFDOUMsc0JBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsQ0FBekIsSUFBOEIsU0FBOUIsQ0FEOEM7QUFFOUMsc0JBQUssS0FBTCxDQUFXLHNCQUFYLENBQWtDLElBQWxDLENBQXVDLENBQXZDLEVBRjhDO2VBQWhEO2FBREY7O0FBUUEsa0JBQUssc0JBQUwsR0EzQitGO1dBQVYsQ0FBbkYsQ0FGd0I7QUFpQzVCLGVBQUssc0JBQUwsR0FBOEIsS0FBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixVQUF6QixDQWpDRjs7O0FBaEJuQixtQ0E0RFgsMkRBQXlCOzs7QUFFdkIsY0FBSSxnQkFBZ0IsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixnQkFBM0IsQ0FBNEMsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUE1RCxDQUZtQjtBQUd2Qix3QkFBYyxTQUFkLENBQXdCLFVBQUMsT0FBRCxFQUFhOztBQUduQyxnQkFBSSxjQUFjLE9BQUssS0FBTCxDQUFXLGtCQUFYLENBSGlCO0FBSW5DLGdCQUFJLE1BQU0sT0FBSyxLQUFMLENBQVcsVUFBWCxDQUp5QjtBQUtuQyxnQkFBSSxPQUFPLE9BQUssS0FBTCxDQUFXLGNBQVgsQ0FMd0I7O0FBUW5DLGdCQUFJLFNBQVMsQ0FBQyxDQUFELENBUnNCO0FBU25DLGdCQUFJLE9BQUssS0FBTCxDQUFXLGdCQUFYLEVBQTZCO0FBQy9CLHVCQUFTLE9BQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLE9BQUssS0FBTCxDQUFyQyxDQUQrQjthQUFqQztBQUdBLGdCQUFJLGlCQUFpQixJQUFqQixDQVorQjs7QUFlbkMsZ0JBQUksUUFBUSxNQUFSLEdBQWlCLENBQWpCLEVBQW9COztBQUV0QixrQkFBSSxRQUFRLEtBQVIsQ0FGa0I7QUFHdEIsa0JBQUksV0FBVyxFQUFYLENBSGtCOztBQU10QixzQkFBUSxPQUFSLENBQWdCLFVBQUMsTUFBRCxFQUFXO0FBR3pCLG9CQUFJLE9BQU8sVUFBUCxHQUFvQixDQUFwQixFQUF1QjtBQUN6QiwwQkFBUSxJQUFSLENBRHlCO2lCQUEzQjs7QUFLQSxvQkFBSSxPQUFPLE9BQVAsQ0FBZSxNQUFmLEdBQXdCLENBQXhCLEVBQTJCO0FBRTdCLHlCQUFPLE9BQVAsQ0FBZSxPQUFmLENBQXVCLFVBQUMsQ0FBRCxFQUFPO0FBQzVCLDZCQUFTLElBQVQsQ0FBYyxFQUFFLE9BQUssS0FBTCxDQUFXLEtBQVgsQ0FBaEIsRUFENEI7bUJBQVAsQ0FBdkIsQ0FGNkI7aUJBQS9CO2VBUmMsQ0FBaEIsQ0FOc0I7O0FBc0J0QixrQkFBSSxVQUFVLElBQVYsRUFBZ0I7QUFDbEIsb0JBQUksT0FBSixDQUFZLFVBQUMsQ0FBRCxFQUFPO0FBQ2pCLHNCQUFJLEVBQUUsT0FBSyxLQUFMLENBQVcsS0FBWCxDQUFGLEtBQXdCLFNBQXhCLEVBQW1DO0FBQ3JDLGdDQUFZLElBQVosQ0FBaUIsQ0FBakIsRUFEcUM7bUJBQXZDO2lCQURVLENBQVosQ0FEa0I7ZUFBcEI7O0FBU0Esa0JBQUksSUFBSSxZQUFZLE1BQVosR0FBcUIsQ0FBckIsQ0EvQmM7QUFnQ3RCLHFCQUFPLE1BQU0sQ0FBQyxDQUFELEVBQUk7QUFFZixvQkFBSSxTQUFTLE9BQVQsQ0FBaUIsTUFBakIsTUFBNkIsQ0FBQyxDQUFELEVBQUk7QUFDbkMsbUNBQWlCLEtBQWpCLENBRG1DO2lCQUFyQztBQUdBLG9CQUFJLFNBQVMsT0FBVCxDQUFpQixZQUFZLENBQVosRUFBZSxPQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWhDLE1BQXVELENBQUMsQ0FBRCxFQUFJO0FBQzdELHNCQUFJLElBQUksWUFBWSxNQUFaLENBQW1CLENBQW5CLEVBQXNCLENBQXRCLENBQUosQ0FEeUQ7aUJBQS9EO0FBR0Esb0JBUmU7ZUFBakI7O0FBWUEsa0JBQUksV0FBVyxDQUFDLENBQUQsQ0E1Q087O0FBOEN0QixrQkFBSSxDQUFDLGNBQUQsRUFBaUI7QUFDbkIscUJBQUssSUFBSSxDQUFKLElBQVMsT0FBSyxLQUFMLENBQVcsYUFBWCxFQUEwQjtBQUN0QyxzQkFBSSxPQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGNBQXpCLENBQXdDLENBQXhDLENBQUosRUFBZ0Q7QUFDOUMsMkJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsQ0FBekIsSUFBOEIsU0FBOUIsQ0FEOEM7QUFFOUMsMkJBQUssS0FBTCxDQUFXLHNCQUFYLENBQWtDLElBQWxDLENBQXVDLENBQXZDLEVBRjhDO21CQUFoRDtpQkFERjtlQURGLE1BT087O0FBRUwsb0JBQUksTUFBSixFQUFZO0FBQ1YseUJBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLE9BQTlCLENBQXNDLFVBQUMsQ0FBRCxFQUFJLEtBQUosRUFBYztBQUNsRCx3QkFBSSxXQUFXLEVBQUUsT0FBSyxLQUFMLENBQVcsS0FBWCxDQUFiLEVBQWdDO0FBQ2xDLGlDQUFXLEtBQVgsQ0FEa0M7cUJBQXBDO21CQURvQyxDQUF0QyxDQURVO2lCQUFaO2VBVEY7O0FBb0JBLHFCQUFLLEtBQUwsQ0FBVyxTQUFYLEdBbEVzQjs7QUFxRXRCLHFCQUFLLG1CQUFMLEdBQTJCLEtBQTNCLENBckVzQjtBQXNFdEIsa0JBQUksV0FBVyxDQUFDLENBQUQsRUFBSTtBQUNqQix1QkFBSyxLQUFMLENBQVcsZ0JBQVgsR0FBOEIsT0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsUUFBOUIsQ0FBOUIsQ0FEaUI7QUFFakIsdUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsT0FBSyxLQUFMLENBQXpCLEdBQXVDLE9BQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLE9BQUssS0FBTCxDQUFXLEtBQVgsQ0FBbkUsQ0FGaUI7QUFHakIsdUJBQUssS0FBTCxDQUFXLFNBQVgsR0FBdUIsUUFBdkIsQ0FIaUI7QUFJakIsdUJBQUssS0FBTCxDQUFXLG1CQUFYLEdBQWlDLElBQWpDLENBSmlCO2VBQW5COztBQVNBLG1CQUFLLGdCQUFMLENBQXNCLEtBQXRCLEVBQTZCLE9BQUssZ0JBQUwsQ0FBN0IsQ0EvRXNCO0FBZ0Z0QixrQkFBSSxPQUFLLEtBQUwsQ0FBVyxtQkFBWCxFQUFnQztBQUNsQyx1QkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixZQUF6QixHQURrQztlQUFwQzthQWhGRjtXQWZzQixDQUF4QixDQUh1QjtBQXdHdkIsZUFBSyxrQkFBTCxHQUEwQixhQUExQixDQXhHdUI7OztBQTVEZCxtQ0E4S1gscUVBQThCOzs7QUFDNUIsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixjQUF2QixDQUFzQyxPQUF0QyxDQUE4QyxVQUFDLFFBQUQsRUFBYztBQUMxRCxnQkFBSSxtQkFBbUIsT0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixXQUEzQixDQUF1QyxPQUFLLEtBQUwsQ0FBVyxhQUFYLEVBQTBCLFFBQWpFLENBQW5CLENBRHNEO0FBRTFELDZCQUFpQixTQUFqQixDQUEyQixVQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXdCO0FBQ2pELGtCQUFJLGFBQWEsUUFBYixFQUF1QjtBQUV6QixvQkFBSSxPQUFLLEtBQUwsQ0FBVyxzQkFBWCxDQUFrQyxPQUFsQyxDQUEwQyxRQUExQyxNQUF3RCxDQUFDLENBQUQsRUFBSTtBQUM5RCx5QkFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsUUFBNUIsSUFBd0MsUUFBeEMsQ0FEOEQ7QUFFOUQseUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsT0FBSyxLQUFMLENBQVcsU0FBWCxFQUFzQixJQUExRCxFQUY4RDtpQkFBaEUsTUFHTztBQUVMLHlCQUFLLEtBQUwsQ0FBVyxzQkFBWCxDQUFrQyxNQUFsQyxDQUF5QyxPQUFLLEtBQUwsQ0FBVyxzQkFBWCxDQUFrQyxPQUFsQyxDQUEwQyxRQUExQyxDQUF6QyxFQUE4RixDQUE5RixFQUZLO2lCQUhQO2VBRkY7YUFEeUIsQ0FBM0IsQ0FGMEQ7QUFjMUQsbUJBQUssdUJBQUwsQ0FBNkIsSUFBN0IsQ0FBa0MsZ0JBQWxDLEVBZDBEO1dBQWQsQ0FBOUMsQ0FENEI7OztBQTlLbkIsbUNBd01YLHVFQUErQjtBQUM3QixlQUFLLHNCQUFMLENBQTRCLFdBQTVCLEdBRDZCO0FBRTdCLGVBQUssc0JBQUwsR0FBOEIsSUFBOUIsQ0FGNkI7OztBQXhNcEIsbUNBb05YLDZEQUEwQjtBQUN4QixlQUFLLGtCQUFMLENBQXdCLFdBQXhCLEdBRHdCO0FBRXhCLGVBQUssa0JBQUwsR0FBMEIsSUFBMUIsQ0FGd0I7OztBQXBOZixtQ0FnT1gsdUVBQStCO0FBQzdCLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssdUJBQUwsQ0FBNkIsTUFBN0IsRUFBcUMsR0FBekQsRUFBOEQ7QUFDNUQsZ0JBQUk7QUFDRixtQkFBSyx1QkFBTCxDQUE2QixDQUE3QixFQUFnQyxXQUFoQyxHQURFO2FBQUosQ0FFRSxPQUFPLENBQVAsRUFBVSxFQUFWO1dBSEo7QUFNQSxlQUFLLHVCQUFMLEdBQStCLEVBQS9CLENBUDZCOzs7ZUFoT3BCIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1vYnNlcnZhYmxlcy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
