'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-sortable', './v-grid-cell-helper', './v-grid-observables', './v-grid-config', './v-grid-resizable', './v-grid-selection'], function (_export, _context) {
  var ObserverLocator, bindable, ViewCompiler, ViewSlot, Container, ViewResources, containerless, VGridGenerator, VGridFilter, VGridSort, VGridSortable, VGridCellHelper, VGridObservables, VGridConfig, VGridResizable, VGridSelection, _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _class2, _temp, VGrid;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      ObserverLocator = _aureliaFramework.ObserverLocator;
      bindable = _aureliaFramework.bindable;
      ViewCompiler = _aureliaFramework.ViewCompiler;
      ViewSlot = _aureliaFramework.ViewSlot;
      Container = _aureliaFramework.Container;
      ViewResources = _aureliaFramework.ViewResources;
      containerless = _aureliaFramework.containerless;
    }, function (_vGridGenerator) {
      VGridGenerator = _vGridGenerator.VGridGenerator;
    }, function (_vGridFilter) {
      VGridFilter = _vGridFilter.VGridFilter;
    }, function (_vGridSort) {
      VGridSort = _vGridSort.VGridSort;
    }, function (_vGridSortable) {
      VGridSortable = _vGridSortable.VGridSortable;
    }, function (_vGridCellHelper) {
      VGridCellHelper = _vGridCellHelper.VGridCellHelper;
    }, function (_vGridObservables) {
      VGridObservables = _vGridObservables.VGridObservables;
    }, function (_vGridConfig) {
      VGridConfig = _vGridConfig.VGridConfig;
    }, function (_vGridResizable) {
      VGridResizable = _vGridResizable.VGridResizable;
    }, function (_vGridSelection) {
      VGridSelection = _vGridSelection.VGridSelection;
    }],
    execute: function () {
      _export('VGrid', VGrid = (_dec = bindable({ attribute: "v-grid-context" }), _dec2 = bindable({ attribute: "v-collection" }), _dec3 = bindable({ attribute: "v-current-entity" }), (_class = (_temp = _class2 = function () {
        function VGrid(element, observerLocator, viewCompiler, viewSlot, container, viewResources, dom) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'vGridContextObj', _descriptor, this);

          _initDefineProp(this, 'vGridCollection', _descriptor2, this);

          _initDefineProp(this, 'vGridCurrentEntity', _descriptor3, this);

          this.element = element;

          this.viewCompiler = viewCompiler;
          this.viewSlot = viewSlot;
          this.container = container;
          this.viewResources = viewResources;

          this.vGridCurrentEntityRef = null;

          this.vGridCurrentRow = -1;

          this.vGridRowKey = "__vGridKey";

          this.vGridCollectionFiltered = [];

          this.vGridSkipNextUpdateProperty = [];

          this.vGridFilter = new VGridFilter();
          this.vGridSort = new VGridSort();
          this.vGridConfig = new VGridConfig(this);
          this.vGridSelection = new VGridSelection(null, this);
          this.vGridCellHelper = new VGridCellHelper(this);
          this.vGridSortable = new VGridSortable(this);
          this.vGridResizable = new VGridResizable(this);
          this.vGridObservables = new VGridObservables(this, observerLocator);
          this.vGridGenerator = new VGridGenerator(this);

          this.key = 0;
        }

        VGrid.prototype.checkKeys = function checkKeys() {
          var _this = this;

          this.vGridCollection.forEach(function (row) {
            if (!row[_this.vGridRowKey] && row !== undefined && row !== null) {
              row[_this.vGridRowKey] = _this.key;
              _this.key++;
            }
          });
        };

        VGrid.prototype.checkKey = function checkKey(row) {
          if (!row[this.vGridRowKey] && row !== undefined && row !== null) {
            row[this.vGridRowKey] = this.key;
            this.key++;
          }
        };

        VGrid.prototype.vGridGetRowKey = function vGridGetRowKey(key) {
          var _this2 = this;

          var rowFound = null;
          this.vGridCollection.forEach(function (row, index) {
            if (row[_this2.vGridRowKey] === key) {
              rowFound = index;
            }
          });
          return rowFound;
        };

        VGrid.prototype.bind = function bind(parent) {
          this.$parent = parent;

          if (!this.vGridContextObj) {
            this.vGridContextObj = {};
          }

          this.vGridContextObj.ctx = this.vGridGenerator;

          if (this.vGridCollection === undefined || this.vGridCurrentEntity === undefined) {
            if (this.vGridCollection === undefined && this.vGridCurrentEntity === undefined) {
              console.warn("currentEntity & collection not set/binded in config attribute");
            } else {
              if (this.vGridCurrentEntity === undefined) {
                console.warn("currentEntity not set/binded in config attribute");
              }
              if (this.vGridCollection === undefined) {
                console.warn("collection not set/binded in config attribute");
              }
            }
          } else {
            this.vGridCollectionFiltered = this.vGridCollection.slice(0);

            this.checkKeys();
          }
        };

        VGrid.prototype.attached = function attached() {
          this.vGridObservables.enableObservablesCollection();
          this.vGridObservables.enableObservablesArray();
          this.vGridObservables.enableObservablesAttributes();

          this.vGridGenerator.init(false);
        };

        VGrid.prototype.detached = function detached() {
          this.vGridObservables.disableObservablesAttributes();
          this.vGridObservables.disableObservablesCollection();
          this.vGridObservables.disableObservablesArray();
        };

        return VGrid;
      }(), _class2.inject = [Element, ObserverLocator, ViewCompiler, ViewSlot, Container, ViewResources], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'vGridContextObj', [_dec], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'vGridCollection', [_dec2], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'vGridCurrentEntity', [_dec3], {
        enumerable: true,
        initializer: null
      })), _class)));

      _export('VGrid', VGrid);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUk7OztBQUNqQixjQUFJLFdBQVcsSUFBWCxDQURhO0FBRWpCLGVBQUssZUFBTCxDQUFxQixPQUFyQixDQUE2QixVQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWdCO0FBQzNDLGdCQUFHLElBQUksT0FBSyxXQUFMLENBQUosS0FBMEIsR0FBMUIsRUFBOEI7QUFDL0IseUJBQVcsS0FBWCxDQUQrQjthQUFqQztXQUQyQixDQUE3QixDQUZpQjtBQU9qQixpQkFBTyxRQUFQLENBUGlCOzs7QUF2RVIsd0JBdUZYLHFCQUFLLFFBQVE7QUFJWCxlQUFLLE9BQUwsR0FBZSxNQUFmLENBSlc7O0FBUVgsY0FBSSxDQUFDLEtBQUssZUFBTCxFQUFzQjtBQUN6QixpQkFBSyxlQUFMLEdBQXVCLEVBQXZCLENBRHlCO1dBQTNCOztBQUtBLGVBQUssZUFBTCxDQUFxQixHQUFyQixHQUEyQixLQUFLLGNBQUwsQ0FiaEI7O0FBaUJYLGNBQUksS0FBSyxlQUFMLEtBQXlCLFNBQXpCLElBQXNDLEtBQUssa0JBQUwsS0FBNEIsU0FBNUIsRUFBdUM7QUFDL0UsZ0JBQUksS0FBSyxlQUFMLEtBQXlCLFNBQXpCLElBQXNDLEtBQUssa0JBQUwsS0FBNEIsU0FBNUIsRUFBdUM7QUFDL0Usc0JBQVEsSUFBUixDQUFhLCtEQUFiLEVBRCtFO2FBQWpGLE1BRU87QUFDTCxrQkFBSSxLQUFLLGtCQUFMLEtBQTRCLFNBQTVCLEVBQXVDO0FBQ3pDLHdCQUFRLElBQVIsQ0FBYSxrREFBYixFQUR5QztlQUEzQztBQUdBLGtCQUFJLEtBQUssZUFBTCxLQUF5QixTQUF6QixFQUFvQztBQUN0Qyx3QkFBUSxJQUFSLENBQWEsK0NBQWIsRUFEc0M7ZUFBeEM7YUFORjtXQURGLE1BV087QUFFTCxpQkFBSyx1QkFBTCxHQUErQixLQUFLLGVBQUwsQ0FBcUIsS0FBckIsQ0FBMkIsQ0FBM0IsQ0FBL0IsQ0FGSzs7QUFJTCxpQkFBSyxTQUFMLEdBSks7V0FYUDs7O0FBeEdTLHdCQStIWCwrQkFBVztBQUdULGVBQUssZ0JBQUwsQ0FBc0IsMkJBQXRCLEdBSFM7QUFJVCxlQUFLLGdCQUFMLENBQXNCLHNCQUF0QixHQUpTO0FBS1QsZUFBSyxnQkFBTCxDQUFzQiwyQkFBdEIsR0FMUzs7QUFTVCxlQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBeUIsS0FBekIsRUFUUzs7O0FBL0hBLHdCQWtKWCwrQkFBVztBQUNULGVBQUssZ0JBQUwsQ0FBc0IsNEJBQXRCLEdBRFM7QUFFVCxlQUFLLGdCQUFMLENBQXNCLDRCQUF0QixHQUZTO0FBR1QsZUFBSyxnQkFBTCxDQUFzQix1QkFBdEIsR0FIUzs7O2VBbEpBO21CQUNKLFNBQVMsQ0FBQyxPQUFELEVBQVUsZUFBVixFQUEyQixZQUEzQixFQUF5QyxRQUF6QyxFQUFtRCxTQUFuRCxFQUE4RCxhQUE5RCIsImZpbGUiOiJ2R3JpZC92LWdyaWQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
