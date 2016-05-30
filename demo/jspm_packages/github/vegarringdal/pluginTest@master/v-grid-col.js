/* */ 
define(['exports', 'aurelia-framework', './v-grid'], function (exports, _aureliaFramework, _vGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGridCol = undefined;

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

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

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

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

  var VGridCol = exports.VGridCol = (_dec = (0, _aureliaFramework.customElement)('v-grid-col'), _dec2 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
    function VGridCol(element, vGrid, valueConverter) {
      _classCallCheck(this, VGridCol);

      _initDefineProp(this, 'vColWidth', _descriptor, this);

      _initDefineProp(this, 'vColAttribute', _descriptor2, this);

      _initDefineProp(this, 'vColHeader', _descriptor3, this);

      _initDefineProp(this, 'vColDefaultFilter', _descriptor4, this);

      _initDefineProp(this, 'vColReadOnly', _descriptor5, this);

      _initDefineProp(this, 'vColCss', _descriptor6, this);

      _initDefineProp(this, 'vColType', _descriptor7, this);

      _initDefineProp(this, 'vColFormater', _descriptor8, this);

      _initDefineProp(this, 'vColEditRaw', _descriptor9, this);

      _initDefineProp(this, 'vColFilterOnKey', _descriptor10, this);

      _initDefineProp(this, 'vColCustom', _descriptor11, this);

      this.vGrid = vGrid;
      this.element = element;
    }

    VGridCol.prototype.bind = function bind(bindingContext, overrideContext) {
      this.vGrid.vGridConfig.attributeArray.push(this.vColAttribute);
      this.vGrid.vGridConfig.attributes.push(this.vColAttribute);
      this.vGrid.vGridConfig.columnWidthArray.push(this.vColWidth);
      this.vGrid.vGridConfig.headerArray.push(this.vColHeader || "");
      this.vGrid.vGridConfig.filterArray.push(this.vColDefaultFilter || "=");
      this.vGrid.vGridConfig.readOnlyArray.push(this.vColReadOnly === "true" ? true : false);
      this.vGrid.vGridConfig.colStyleArray.push(this.vColCss);
      this.vGrid.vGridConfig.colTypeArray.push(this.vColType ? this.vColType : "text");
      this.vGrid.vGridConfig.filterOnKeyArray.push(this.vColFilterOnKey === "true" ? true : false);
      this.vGrid.vGridConfig.colEditRawArray.push(this.vColEditRaw === "true" ? true : false);
      this.vGrid.vGridConfig.colFormaterArray.push(this.valueConverters(this.vColFormater));
      this.vGrid.vGridConfig.colCustomArray.push(this.vColCustom);
    };

    _createClass(VGridCol, [{
      key: 'valueConverters',
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.viewResources.lookupFunctions.valueConverters;
        }
      }
    }]);

    return VGridCol;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'vColWidth', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'vColAttribute', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'vColHeader', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'vColDefaultFilter', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'vColReadOnly', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'vColCss', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'vColType', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'vColFormater', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'vColEditRaw', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'vColFilterOnKey', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, 'vColCustom', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class);
});