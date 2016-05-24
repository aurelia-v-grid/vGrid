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
        }

        VGrid.prototype.checkKeys = function checkKeys() {
          var _this = this;

          this.vGridCollection.forEach(function (row) {
            if (!row[_this.vGridRowKey] && row !== undefined && row !== null) {
              row[_this.vGridRowKey] = _this.guid();
            }
          });
        };

        VGrid.prototype.checkKey = function checkKey(row) {
          if (!row[this.vGridRowKey] && row !== undefined && row !== null) {
            row[this.vGridRowKey] = this.guid();
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

        VGrid.prototype.guid = function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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
//# sourceMappingURL=data:application/json;base64,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
