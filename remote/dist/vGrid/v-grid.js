'use strict';

System.register(['aurelia-framework', './v-grid-class-generator', './v-grid-class-filter', './v-grid-class-sort', './v-grid-class-sortable', './v-grid-class-observables', './v-grid-class-config', './v-grid-class-resizable', './v-grid-class-selection', './v-grid-class-ctx'], function (_export, _context) {
  "use strict";

  var TaskQueue, ObserverLocator, bindable, ViewCompiler, ViewSlot, Container, ViewResources, containerless, VGridGenerator, VGridFilter, VGridSort, VGridSortable, VGridObservables, VGridConfig, VGridResizable, VGridSelection, VGridClientCtx, _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class2, _temp, VGrid;

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
    }, function (_vGridClassGenerator) {
      VGridGenerator = _vGridClassGenerator.VGridGenerator;
    }, function (_vGridClassFilter) {
      VGridFilter = _vGridClassFilter.VGridFilter;
    }, function (_vGridClassSort) {
      VGridSort = _vGridClassSort.VGridSort;
    }, function (_vGridClassSortable) {
      VGridSortable = _vGridClassSortable.VGridSortable;
    }, function (_vGridClassObservables) {
      VGridObservables = _vGridClassObservables.VGridObservables;
    }, function (_vGridClassConfig) {
      VGridConfig = _vGridClassConfig.VGridConfig;
    }, function (_vGridClassResizable) {
      VGridResizable = _vGridClassResizable.VGridResizable;
    }, function (_vGridClassSelection) {
      VGridSelection = _vGridClassSelection.VGridSelection;
    }, function (_vGridClassCtx) {
      VGridClientCtx = _vGridClassCtx.VGridClientCtx;
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

          this.vGridFilter = new VGridFilter(this);
          this.vGridSort = new VGridSort(this);
          this.vGridConfig = new VGridConfig(this);
          this.vGridSelection = new VGridSelection(null, this);
          this.vGridSortable = new VGridSortable(this);
          this.vGridResizable = new VGridResizable(this);
          this.vGridObservables = new VGridObservables(this, observerLocator);
          this.vGridGenerator = new VGridGenerator(this);
          this.vGridClientCtx = new VGridClientCtx(this);
          this.vGridPager = null;
        }

        VGrid.prototype.raiseEvent = function raiseEvent(name) {
          var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          var event = new CustomEvent(name, {
            detail: data,
            bubbles: true
          });
          this.element.dispatchEvent(event);

          return event;
        };

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
