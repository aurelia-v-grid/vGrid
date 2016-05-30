/* */ 
define(['exports', 'aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-sortable', './v-grid-cell-helper', './v-grid-observables', './v-grid-config', './v-grid-resizable', './v-grid-selection', './v-grid-clientCtx'], function (exports, _aureliaFramework, _vGridGenerator, _vGridFilter, _vGridSort, _vGridSortable, _vGridCellHelper, _vGridObservables, _vGridConfig, _vGridResizable, _vGridSelection, _vGridClientCtx) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGrid = undefined;

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

  var _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class2, _temp;

  var VGrid = exports.VGrid = (_dec = (0, _aureliaFramework.bindable)({ attribute: "v-grid-context" }), _dec2 = (0, _aureliaFramework.bindable)({ attribute: "v-collection" }), _dec3 = (0, _aureliaFramework.bindable)({ attribute: "v-current-entity" }), (_class = (_temp = _class2 = function () {
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

      this.vGridFilter = new _vGridFilter.VGridFilter(this);
      this.vGridSort = new _vGridSort.VGridSort(this);
      this.vGridConfig = new _vGridConfig.VGridConfig(this);
      this.vGridSelection = new _vGridSelection.VGridSelection(null, this);
      this.vGridCellHelper = new _vGridCellHelper.VGridCellHelper(this);
      this.vGridSortable = new _vGridSortable.VGridSortable(this);
      this.vGridResizable = new _vGridResizable.VGridResizable(this);
      this.vGridObservables = new _vGridObservables.VGridObservables(this, observerLocator);
      this.vGridGenerator = new _vGridGenerator.VGridGenerator(this);
      this.vGridClientCtx = new _vGridClientCtx.VGridClientCtx(this);
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
  }(), _class2.inject = [Element, _aureliaFramework.ObserverLocator, _aureliaFramework.ViewCompiler, _aureliaFramework.ViewSlot, _aureliaFramework.Container, _aureliaFramework.ViewResources, _aureliaFramework.TaskQueue], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'vGridContextObj', [_dec], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'vGridCollection', [_dec2], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'vGridCurrentEntity', [_dec3], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'loadingMessage', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "Working please wait";
    }
  })), _class));
});