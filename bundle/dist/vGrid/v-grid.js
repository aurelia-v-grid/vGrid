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
            if (!row[_this2.vGridRowKey] === key) {
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
//# sourceMappingURL=data:application/json;base64,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SUFBZjtBQUNBLGVBQUssZUFBTCxDQUFxQixPQUFyQixDQUE2QixVQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWdCO0FBQzNDLGdCQUFHLENBQUMsSUFBSSxPQUFLLFdBQVQsQ0FBRCxLQUEyQixHQUE5QixFQUFrQztBQUNoQyx5QkFBVyxLQUFYO0FBQ0Q7QUFDRixXQUpEO0FBS0EsaUJBQU8sUUFBUDtBQUNELFM7O3dCQVFELEksaUJBQUssTSxFQUFRO0FBSVgsZUFBSyxPQUFMLEdBQWUsTUFBZjs7QUFJQSxjQUFJLENBQUMsS0FBSyxlQUFWLEVBQTJCO0FBQ3pCLGlCQUFLLGVBQUwsR0FBdUIsRUFBdkI7QUFDRDs7QUFHRCxlQUFLLGVBQUwsQ0FBcUIsR0FBckIsR0FBMkIsS0FBSyxjQUFoQzs7QUFJQSxjQUFJLEtBQUssZUFBTCxLQUF5QixTQUF6QixJQUFzQyxLQUFLLGtCQUFMLEtBQTRCLFNBQXRFLEVBQWlGO0FBQy9FLGdCQUFJLEtBQUssZUFBTCxLQUF5QixTQUF6QixJQUFzQyxLQUFLLGtCQUFMLEtBQTRCLFNBQXRFLEVBQWlGO0FBQy9FLHNCQUFRLElBQVIsQ0FBYSwrREFBYjtBQUNELGFBRkQsTUFFTztBQUNMLGtCQUFJLEtBQUssa0JBQUwsS0FBNEIsU0FBaEMsRUFBMkM7QUFDekMsd0JBQVEsSUFBUixDQUFhLGtEQUFiO0FBQ0Q7QUFDRCxrQkFBSSxLQUFLLGVBQUwsS0FBeUIsU0FBN0IsRUFBd0M7QUFDdEMsd0JBQVEsSUFBUixDQUFhLCtDQUFiO0FBQ0Q7QUFDRjtBQUNGLFdBWEQsTUFXTztBQUVMLGlCQUFLLHVCQUFMLEdBQStCLEtBQUssZUFBTCxDQUFxQixLQUFyQixDQUEyQixDQUEzQixDQUEvQjs7QUFFQSxpQkFBSyxTQUFMO0FBQ0Q7QUFDRixTOzt3QkFNRCxRLHVCQUFXO0FBR1QsZUFBSyxnQkFBTCxDQUFzQiwyQkFBdEI7QUFDQSxlQUFLLGdCQUFMLENBQXNCLHNCQUF0QjtBQUNBLGVBQUssZ0JBQUwsQ0FBc0IsMkJBQXRCOztBQUlBLGVBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixLQUF6QjtBQUlELFM7O3dCQU1ELFEsdUJBQVc7QUFDVCxlQUFLLGdCQUFMLENBQXNCLDRCQUF0QjtBQUNBLGVBQUssZ0JBQUwsQ0FBc0IsNEJBQXRCO0FBQ0EsZUFBSyxnQkFBTCxDQUFzQix1QkFBdEI7QUFDRCxTOzs7bUJBckpNLE0sR0FBUyxDQUFDLE9BQUQsRUFBVSxlQUFWLEVBQTJCLFlBQTNCLEVBQXlDLFFBQXpDLEVBQW1ELFNBQW5ELEVBQThELGFBQTlELEMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
