/* */ 
define(['exports', 'aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-observables', './v-grid-config', './v-grid-selection', './v-grid-ctx', './v-grid-scroll-events', './v-grid-markup-generator'], function (exports, _aureliaFramework, _vGridGenerator, _vGridFilter, _vGridSort, _vGridObservables, _vGridConfig, _vGridSelection, _vGridCtx, _vGridScrollEvents, _vGridMarkupGenerator) {
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

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _class2, _temp;

  var VGrid = exports.VGrid = (_dec = (0, _aureliaFramework.bindable)({ attribute: "v-grid-context" }), _dec2 = (0, _aureliaFramework.bindable)({ attribute: "v-collection" }), _dec3 = (0, _aureliaFramework.bindable)({ attribute: "v-current-entity" }), _dec4 = (0, _aureliaFramework.bindable)({ attribute: "v-columns" }), _dec5 = (0, _aureliaFramework.bindable)({ attribute: "v-row-height" }), _dec6 = (0, _aureliaFramework.bindable)({ attribute: "v-header-height" }), _dec7 = (0, _aureliaFramework.bindable)({ attribute: "v-footer-height" }), _dec8 = (0, _aureliaFramework.bindable)({ attribute: "v-multi-select" }), _dec9 = (0, _aureliaFramework.bindable)({ attribute: "v-manual-sel" }), _dec10 = (0, _aureliaFramework.bindable)({ attribute: "v-loading-threshold" }), _dec11 = (0, _aureliaFramework.bindable)({ attribute: "v-remote-index" }), _dec12 = (0, _aureliaFramework.bindable)({ attribute: "v-row-on-draw" }), _dec13 = (0, _aureliaFramework.bindable)({ attribute: "v-event-onremote" }), _dec14 = (0, _aureliaFramework.bindable)({ attribute: "v-hide-pager-info" }), _dec15 = (0, _aureliaFramework.bindable)({ attribute: "v-custom-pager" }), _dec16 = (0, _aureliaFramework.bindable)({ attribute: "v-language" }), (_class = (_temp = _class2 = function () {
    function VGrid(element, bindingEngine, viewCompiler, viewSlot, container, viewResources, taskQueue) {
      _classCallCheck(this, VGrid);

      _initDefineProp(this, 'vGridContextObj', _descriptor, this);

      _initDefineProp(this, 'vGridCollection', _descriptor2, this);

      _initDefineProp(this, 'vGridCurrentEntity', _descriptor3, this);

      _initDefineProp(this, 'vGridColumns', _descriptor4, this);

      _initDefineProp(this, 'attRowHeight', _descriptor5, this);

      _initDefineProp(this, 'attHeaderHeight', _descriptor6, this);

      _initDefineProp(this, 'attFooterHeight', _descriptor7, this);

      _initDefineProp(this, 'attMultiSelect', _descriptor8, this);

      _initDefineProp(this, 'attManualSelection', _descriptor9, this);

      _initDefineProp(this, 'attLoadingThreshold', _descriptor10, this);

      _initDefineProp(this, 'attRemoteIndex', _descriptor11, this);

      _initDefineProp(this, 'eventOnRowDraw', _descriptor12, this);

      _initDefineProp(this, 'eventOnRemoteCall', _descriptor13, this);

      _initDefineProp(this, 'attHidePagerInfo', _descriptor14, this);

      _initDefineProp(this, 'attCustomPager', _descriptor15, this);

      _initDefineProp(this, 'attLanguage', _descriptor16, this);

      _initDefineProp(this, 'loadingMessage', _descriptor17, this);

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

      this.vGridScrollEvents = new _vGridScrollEvents.VGridScrollEvents(this);
      this.vGridFilter = new _vGridFilter.VGridFilter(this);
      this.vGridSort = new _vGridSort.VGridSort(this);
      this.vGridConfig = new _vGridConfig.VGridConfig(this);
      this.vGridSelection = new _vGridSelection.VGridSelection(null, this);
      this.vGridObservables = new _vGridObservables.VGridObservables(this, bindingEngine);
      this.vGridGenerator = new _vGridGenerator.VGridGenerator(this);
      this.vGridClientCtx = new _vGridCtx.VGridCtx(this);
      this.vGridMarkupGenerator = new _vGridMarkupGenerator.VGridMarkupGenerator(this);
      this.vGridPager = null;
      this.lastCollectionLength;
      this.lastFilterLength;
      this.lastSelectionLength;
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

    VGrid.prototype.sendCollectionEvent = function sendCollectionEvent() {

      var x1 = this.lastCollectionLength;
      var x2 = this.lastFilterLength;
      var x3 = this.lastSelectionLength;
      var y1 = this.vGridCollection.length;
      var y2 = this.vGridCollectionFiltered.length;
      var y3 = this.vGridSelection.selectedRows;

      if (x1 !== y1 || x2 !== y2 || x3 !== y3) {
        this.raiseEvent("v-local-collection-event", {
          evt: "v-local-collection-event",
          totalLength: this.vGridCollection.length,
          filterLength: this.vGridCollectionFiltered.length,
          selectionLength: this.vGridSelection.selectedRows
        });

        this.lastCollectionLength = this.vGridCollection.length;
        this.lastFilterLength = this.vGridCollectionFiltered.length;
        this.lastSelectionLength = this.vGridSelection.selectedRows;
      }
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
      var vConfig = this.vGridConfig;
      vConfig.setBindValueArray(this.attAttributeObserve, 'attAttributeObserve');
      vConfig.setBindValueInt(this.attRowHeight, 'attRowHeight');
      vConfig.setBindValueInt(this.attHeaderHeight, 'attHeaderHeight');
      vConfig.setBindValueInt(this.attFooterHeight, 'attFooterHeight');
      vConfig.setBindValueBool(this.attResizableHeaders, 'attResizableHeaders');
      vConfig.setBindValueBool(this.attMultiSelect, 'attMultiSelect');
      vConfig.setBindValueBool(this.attSortableHeader, 'attSortableHeader');
      vConfig.setBindValueInt(this.attLoadingThreshold, 'attLoadingThreshold');
      vConfig.setBindValueString(this.attRemoteIndex, 'attRemoteIndex');
      vConfig.setBindValueBool(this.attManualSelection, 'attManualSelection');
      vConfig.setBindValueFunction(this.eventOnRowDraw, 'eventOnRowDraw');
      vConfig.setBindValueFunction(this.eventOnRemoteCall, 'eventOnRemoteCall');
      vConfig.setBindValueBool(this.attHidePagerInfo, 'attHidePagerInfo');
      vConfig.setBindValueString(this.attCustomPager, 'attCustomPager');
      this.vGridConfig.attLanguage = this.attLanguage || this.vGridConfig.attLanguage;

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

      if (!this.vGridConfig.repeater) {
        this.vGridMarkupGenerator.generate();
      }

      this.vGridObservables.enableObservablesCollection();
      this.vGridObservables.enableObservablesArray();
      this.vGridObservables.enableObservablesAttributes();

      this.vGridGenerator.init(false);
    };

    VGrid.prototype.unbind = function unbind() {
      this.vGridGenerator.unbindDetachViewSlots();
    };

    VGrid.prototype.detached = function detached() {
      this.vGridObservables.disableObservablesAttributes();
      this.vGridObservables.disableObservablesCollection();
      this.vGridObservables.disableObservablesArray();
    };

    return VGrid;
  }(), _class2.inject = [Element, _aureliaFramework.BindingEngine, _aureliaFramework.ViewCompiler, _aureliaFramework.ViewSlot, _aureliaFramework.Container, _aureliaFramework.ViewResources, _aureliaFramework.TaskQueue], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'vGridContextObj', [_dec], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'vGridCollection', [_dec2], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'vGridCurrentEntity', [_dec3], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'vGridColumns', [_dec4], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'attRowHeight', [_dec5], {
    enumerable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'attHeaderHeight', [_dec6], {
    enumerable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'attFooterHeight', [_dec7], {
    enumerable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'attMultiSelect', [_dec8], {
    enumerable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'attManualSelection', [_dec9], {
    enumerable: true,
    initializer: null
  }), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, 'attLoadingThreshold', [_dec10], {
    enumerable: true,
    initializer: null
  }), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, 'attRemoteIndex', [_dec11], {
    enumerable: true,
    initializer: null
  }), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, 'eventOnRowDraw', [_dec12], {
    enumerable: true,
    initializer: null
  }), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, 'eventOnRemoteCall', [_dec13], {
    enumerable: true,
    initializer: null
  }), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, 'attHidePagerInfo', [_dec14], {
    enumerable: true,
    initializer: null
  }), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, 'attCustomPager', [_dec15], {
    enumerable: true,
    initializer: null
  }), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, 'attLanguage', [_dec16], {
    enumerable: true,
    initializer: null
  }), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, 'loadingMessage', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "Working please wait";
    }
  })), _class));
});