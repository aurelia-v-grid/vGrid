/* */ 
define(['exports', 'aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-config', './v-grid-selection', './v-grid-ctx', './v-grid-scroll-events', './v-grid-markup-generator'], function (exports, _aureliaFramework, _vGridGenerator, _vGridFilter, _vGridSort, _vGridConfig, _vGridSelection, _vGridCtx, _vGridScrollEvents, _vGridMarkupGenerator) {
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

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _class2, _temp;

  var VGrid = exports.VGrid = (_dec = (0, _aureliaFramework.bindable)({ attribute: "v-grid-context" }), _dec2 = (0, _aureliaFramework.bindable)({ attribute: "v-columns" }), _dec3 = (0, _aureliaFramework.bindable)({ attribute: "v-row-height" }), _dec4 = (0, _aureliaFramework.bindable)({ attribute: "v-header-height" }), _dec5 = (0, _aureliaFramework.bindable)({ attribute: "v-footer-height" }), _dec6 = (0, _aureliaFramework.bindable)({ attribute: "v-multi-select" }), _dec7 = (0, _aureliaFramework.bindable)({ attribute: "v-manual-sel" }), _dec8 = (0, _aureliaFramework.bindable)({ attribute: "v-loading-threshold" }), _dec9 = (0, _aureliaFramework.bindable)({ attribute: "v-row-on-draw" }), _dec10 = (0, _aureliaFramework.bindable)({ attribute: "v-custom-footer" }), _dec11 = (0, _aureliaFramework.bindable)({ attribute: "v-language" }), _dec12 = (0, _aureliaFramework.bindable)({ attribute: "v-data-binder" }), _dec13 = (0, _aureliaFramework.bindable)({ attribute: "v-only-custom" }), (_class = (_temp = _class2 = function () {
    function VGrid(element, bindingEngine, viewCompiler, viewSlot, container, viewResources, taskQueue) {
      _classCallCheck(this, VGrid);

      _initDefineProp(this, 'vGridContextObj', _descriptor, this);

      _initDefineProp(this, 'vGridColumns', _descriptor2, this);

      _initDefineProp(this, 'attRowHeight', _descriptor3, this);

      _initDefineProp(this, 'attHeaderHeight', _descriptor4, this);

      _initDefineProp(this, 'attFooterHeight', _descriptor5, this);

      _initDefineProp(this, 'attMultiSelect', _descriptor6, this);

      _initDefineProp(this, 'attManualSelection', _descriptor7, this);

      _initDefineProp(this, 'attLoadingThreshold', _descriptor8, this);

      _initDefineProp(this, 'eventOnRowDraw', _descriptor9, this);

      _initDefineProp(this, 'attCustomFooter', _descriptor10, this);

      _initDefineProp(this, 'attLanguage', _descriptor11, this);

      _initDefineProp(this, 'attDataBinder', _descriptor12, this);

      _initDefineProp(this, 'attOnlyCustom', _descriptor13, this);

      _initDefineProp(this, 'loadingMessage', _descriptor14, this);

      this.loading = false;

      this.element = element;

      this.viewCompiler = viewCompiler;
      this.viewSlot = viewSlot;
      this.container = container;
      this.viewResources = viewResources;
      this.taskQueue = taskQueue;

      this.vGridCurrentRow = -1;

      this.vGridScrollEvents = new _vGridScrollEvents.VGridScrollEvents(this);
      this.vGridFilter = new _vGridFilter.VGridFilter(this);
      this.vGridSort = new _vGridSort.VGridSort(this);
      this.vGridConfig = new _vGridConfig.VGridConfig(this);
      this.vGridSelection = new _vGridSelection.VGridSelection(null, this);
      this.vGridGenerator = new _vGridGenerator.VGridGenerator(this);
      this.vGridClientCtx = new _vGridCtx.VGridCtx(this);
      this.vGridMarkupGenerator = new _vGridMarkupGenerator.VGridMarkupGenerator(this);

      this.lastCollectionLength;
      this.lastFilterLength;
      this.lastSelectionLength;
    }

    VGrid.prototype.raiseEvent = function raiseEvent(name) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var event = new CustomEvent(name, {
        detail: data,
        bubbles: true
      });
      this.element.dispatchEvent(event);

      return event;
    };

    VGrid.prototype.bind = function bind(parent, overrideContext) {
      this.$parent = parent;
      this.overrideContext = overrideContext;

      if (!this.vGridContextObj) {
        this.vGridContextObj = {};
      }

      this.vGridContextObj.ctx = this.vGridClientCtx;
      var vConfig = this.vGridConfig;
      vConfig.setBindValueInt(this.attRowHeight, 'attRowHeight');
      vConfig.setBindValueInt(this.attHeaderHeight, 'attHeaderHeight');
      vConfig.setBindValueInt(this.attFooterHeight, 'attFooterHeight');
      vConfig.setBindValueBool(this.attResizableHeaders, 'attResizableHeaders');
      vConfig.setBindValueBool(this.attMultiSelect, 'attMultiSelect');
      vConfig.setBindValueBool(this.attSortableHeader, 'attSortableHeader');
      vConfig.setBindValueInt(this.attLoadingThreshold, 'attLoadingThreshold');
      vConfig.setBindValueBool(this.attManualSelection, 'attManualSelection');
      vConfig.setBindValueFunction(this.eventOnRowDraw, 'eventOnRowDraw');
      vConfig.setDataBinder(this.attDataBinder, 'attDataBinder');
      vConfig.setBindValueString(this.attCustomFooter, 'attCustomFooter');
      vConfig.setBindValueBool(this.attOnlyCustom, 'attOnlyCustom');

      this.vGridConfig.attLanguage = this.attLanguage || this.vGridConfig.attLanguage;
    };

    VGrid.prototype.attached = function attached() {

      if (!this.vGridConfig.repeater) {
        this.vGridMarkupGenerator.generate();
      }

      this.vGridGenerator.init(false);
    };

    VGrid.prototype.unbind = function unbind() {
      this.vGridGenerator.unbindDetachViewSlots();
    };

    VGrid.prototype.detached = function detached() {};

    return VGrid;
  }(), _class2.inject = [Element, _aureliaFramework.BindingEngine, _aureliaFramework.ViewCompiler, _aureliaFramework.ViewSlot, _aureliaFramework.Container, _aureliaFramework.ViewResources, _aureliaFramework.TaskQueue], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'vGridContextObj', [_dec], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'vGridColumns', [_dec2], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'attRowHeight', [_dec3], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'attHeaderHeight', [_dec4], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'attFooterHeight', [_dec5], {
    enumerable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'attMultiSelect', [_dec6], {
    enumerable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'attManualSelection', [_dec7], {
    enumerable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'attLoadingThreshold', [_dec8], {
    enumerable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'eventOnRowDraw', [_dec9], {
    enumerable: true,
    initializer: null
  }), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, 'attCustomFooter', [_dec10], {
    enumerable: true,
    initializer: null
  }), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, 'attLanguage', [_dec11], {
    enumerable: true,
    initializer: null
  }), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, 'attDataBinder', [_dec12], {
    enumerable: true,
    initializer: null
  }), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, 'attOnlyCustom', [_dec13], {
    enumerable: true,
    initializer: null
  }), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, 'loadingMessage', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "Working please wait";
    }
  })), _class));
});