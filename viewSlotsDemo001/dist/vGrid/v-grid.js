'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-sortable', './v-grid-cell-helper', './v-grid-observables', './v-grid-config', './v-grid-resizable', './v-grid-selection', './v-grid-clientCtx'], function (_export, _context) {
  var TaskQueue, ObserverLocator, bindable, ViewCompiler, ViewSlot, Container, ViewResources, containerless, VGridGenerator, VGridFilter, VGridSort, VGridSortable, VGridCellHelper, VGridObservables, VGridConfig, VGridResizable, VGridSelection, VGridClientCtx, _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class2, _temp, VGrid;

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
      TaskQueue = _aureliaFramework.TaskQueue;
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
    }, function (_vGridClientCtx) {
      VGridClientCtx = _vGridClientCtx.VGridClientCtx;
    }],
    execute: function () {
      _export('VGrid', VGrid = (_dec = bindable({ attribute: "v-grid-context" }), _dec2 = bindable({ attribute: "v-collection" }), _dec3 = bindable({ attribute: "v-current-entity" }), (_class = (_temp = _class2 = function () {
        function VGrid(element, observerLocator, viewCompiler, viewSlot, container, viewResources, taskQueue) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'vGridContextObj', _descriptor, this);

          _initDefineProp(this, 'vGridCollection', _descriptor2, this);

          _initDefineProp(this, 'vGridCurrentEntity', _descriptor3, this);

          _initDefineProp(this, 'loadingMessage', _descriptor4, this);

          this.loading = false;

          this.element = element;

          this.viewCompiler = viewCompiler;
          this.viewSlot = viewSlot;
          this.container = container;
          this.viewResources = viewResources;
          this.taskQueue = taskQueue;

          this.vGridCurrentEntityRef = null;

          this.vGridCurrentRow = -1;

          this.vGridRowKey = "__vGridKey";

          this.vGridCollectionFiltered = [];

          this.vGridSkipNextUpdateProperty = [];

          this.vGridFilter = new VGridFilter(this);
          this.vGridSort = new VGridSort(this);
          this.vGridConfig = new VGridConfig(this);
          this.vGridSelection = new VGridSelection(null, this);
          this.vGridCellHelper = new VGridCellHelper(this);
          this.vGridSortable = new VGridSortable(this);
          this.vGridResizable = new VGridResizable(this);
          this.vGridObservables = new VGridObservables(this, observerLocator);
          this.vGridGenerator = new VGridGenerator(this);
          this.vGridClientCtx = new VGridClientCtx(this);

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

        VGrid.prototype.bind = function bind(parent, overrideContext) {
          this.$parent = parent;
          this.overrideContext = overrideContext;

          if (!this.vGridContextObj) {
            this.vGridContextObj = {};
          }

          this.vGridContextObj.ctx = this.vGridClientCtx;

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

          this.vGridConfig.init();

          this.vGridGenerator.init(false);
        };

        VGrid.prototype.detached = function detached() {
          this.vGridObservables.disableObservablesAttributes();
          this.vGridObservables.disableObservablesCollection();
          this.vGridObservables.disableObservablesArray();
        };

        return VGrid;
      }(), _class2.inject = [Element, ObserverLocator, ViewCompiler, ViewSlot, Container, ViewResources, TaskQueue], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'vGridContextObj', [_dec], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'vGridCollection', [_dec2], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'vGridCurrentEntity', [_dec3], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'loadingMessage', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return "Working please wait";
        }
      })), _class)));

      _export('VGrid', VGrid);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QWEsK0NBQWIsRUFEc0M7ZUFBeEM7YUFORjtXQURGLE1BV087QUFFTCxpQkFBSyx1QkFBTCxHQUErQixLQUFLLGVBQUwsQ0FBcUIsS0FBckIsQ0FBMkIsQ0FBM0IsQ0FBL0IsQ0FGSzs7QUFJTCxpQkFBSyxTQUFMLEdBSks7V0FYUDs7O0FBOUdTLHdCQXFJWCwrQkFBVztBQUdULGVBQUssZ0JBQUwsQ0FBc0IsMkJBQXRCLEdBSFM7QUFJVCxlQUFLLGdCQUFMLENBQXNCLHNCQUF0QixHQUpTO0FBS1QsZUFBSyxnQkFBTCxDQUFzQiwyQkFBdEIsR0FMUzs7QUFRVCxlQUFLLFdBQUwsQ0FBaUIsSUFBakIsR0FSUzs7QUFXVCxlQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBeUIsS0FBekIsRUFYUzs7O0FBcklBLHdCQTBKWCwrQkFBVztBQUNULGVBQUssZ0JBQUwsQ0FBc0IsNEJBQXRCLEdBRFM7QUFFVCxlQUFLLGdCQUFMLENBQXNCLDRCQUF0QixHQUZTO0FBR1QsZUFBSyxnQkFBTCxDQUFzQix1QkFBdEIsR0FIUzs7O2VBMUpBO21CQUNKLFNBQVMsQ0FBQyxPQUFELEVBQVUsZUFBVixFQUEyQixZQUEzQixFQUF5QyxRQUF6QyxFQUFtRCxTQUFuRCxFQUE4RCxhQUE5RCxFQUE2RSxTQUE3RTs7Ozs7Ozs7O3dGQU1mOzs7aUJBQTBCIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
