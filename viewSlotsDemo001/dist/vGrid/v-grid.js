'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-sortable', './v-grid-cell-helper', './v-grid-observables', './v-grid-config', './v-grid-resizable', './v-grid-selection'], function (_export, _context) {
  var ObserverLocator, bindable, ViewCompiler, ViewSlot, Container, ViewResources, VGridGenerator, VGridFilter, VGridSort, VGridSortable, VGridCellHelper, VGridObservables, VGridConfig, VGridResizable, VGridSelection, _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _class2, _temp, VGrid;

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
        function VGrid(element, observerLocator, viewCompiler, viewSlot, container, viewResources) {
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

          this.vGridRowKey = "__vGrid" + Math.floor(Math.random() * 1000 + 1);

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
        }

        VGrid.prototype.resetKeys = function resetKeys() {
          var _this = this;

          var key = 0;
          this.vGridCollection.forEach(function (row) {
            row[_this.vGridRowKey] = key;
            key++;
          });
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

            this.resetKeys();
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
//# sourceMappingURL=data:application/json;base64,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
