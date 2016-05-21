'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-sortable', './v-grid-cell-helper', './v-grid-observables', './v-grid-config', './v-grid-resizable', './v-grid-selection', './v-grid-clientCtx'], function (_export, _context) {
  "use strict";

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
//# sourceMappingURL=data:application/json;base64,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QUFMLENBQXFCLEtBQXJCLENBQTJCLENBQTNCLENBQS9COztBQUVBLGlCQUFLLFNBQUw7QUFDRDtBQUNGLFM7O3dCQU1ELFEsdUJBQVc7QUFHVCxlQUFLLGdCQUFMLENBQXNCLDJCQUF0QjtBQUNBLGVBQUssZ0JBQUwsQ0FBc0Isc0JBQXRCO0FBQ0EsZUFBSyxnQkFBTCxDQUFzQiwyQkFBdEI7O0FBR0EsZUFBSyxXQUFMLENBQWlCLElBQWpCOztBQUdBLGVBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixLQUF6QjtBQUlELFM7O3dCQU1ELFEsdUJBQVc7QUFDVCxlQUFLLGdCQUFMLENBQXNCLDRCQUF0QjtBQUNBLGVBQUssZ0JBQUwsQ0FBc0IsNEJBQXRCO0FBQ0EsZUFBSyxnQkFBTCxDQUFzQix1QkFBdEI7QUFDRCxTOzs7bUJBN0pNLE0sR0FBUyxDQUFDLE9BQUQsRUFBVSxlQUFWLEVBQTJCLFlBQTNCLEVBQXlDLFFBQXpDLEVBQW1ELFNBQW5ELEVBQThELGFBQTlELEVBQTZFLFNBQTdFLEM7Ozs7Ozs7Ozt3RkFNZixROzs7aUJBQTBCLHFCIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
