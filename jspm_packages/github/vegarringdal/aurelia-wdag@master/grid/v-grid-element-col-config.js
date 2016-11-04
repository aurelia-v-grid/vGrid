/* */ 
define(['exports', 'aurelia-framework', './v-grid'], function (exports, _aureliaFramework, _vGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGridElementColConfig = undefined;

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

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

  var VGridElementColConfig = exports.VGridElementColConfig = (_dec = (0, _aureliaFramework.noView)(), _dec2 = (0, _aureliaFramework.processContent)(function (compiler, resources, element, instruction) {

    var headerTemplateElement = element.getElementsByTagName("V-HEADER-TEMPLATE")[0];
    var headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
    if (headerTemplateHtml !== '') {
      instruction.colHeaderTemplate = headerTemplateHtml;
    }

    var rowTemplateElement = element.getElementsByTagName("V-ROW-TEMPLATE")[0];
    var rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
    if (rowTemplateHtml !== '') {
      instruction.colRowTemplate = rowTemplateHtml;
    }

    element.innerHTML = '';

    var css = element.getAttribute("col-css");
    if (css) {
      instruction.colCss = css;
    }
  }), _dec3 = (0, _aureliaFramework.customElement)('v-grid-col'), _dec4 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid, _aureliaFramework.TargetInstruction), _dec5 = (0, _aureliaFramework.bindable)({ attribute: "col-width" }), _dec6 = (0, _aureliaFramework.bindable)({ attribute: "col-field" }), _dec7 = (0, _aureliaFramework.bindable)({ attribute: "col-header-name" }), _dec8 = (0, _aureliaFramework.bindable)({ attribute: "col-sort" }), _dec9 = (0, _aureliaFramework.bindable)({ attribute: "col-filter" }), _dec10 = (0, _aureliaFramework.bindable)({ attribute: "col-filter-top" }), _dec11 = (0, _aureliaFramework.bindable)({ attribute: "col-add-label-attributes" }), _dec12 = (0, _aureliaFramework.bindable)({ attribute: "col-add-filter-attributes" }), _dec13 = (0, _aureliaFramework.bindable)({ attribute: "col-add-row-attributes" }), _dec14 = (0, _aureliaFramework.bindable)({ attribute: "col-type" }), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = function () {
    function VGridElementColConfig(element, vGrid, targetInstruction) {
      _classCallCheck(this, VGridElementColConfig);

      _initDefineProp(this, 'colWidth', _descriptor, this);

      _initDefineProp(this, 'colField', _descriptor2, this);

      _initDefineProp(this, 'colHeaderName', _descriptor3, this);

      _initDefineProp(this, 'colSort', _descriptor4, this);

      _initDefineProp(this, 'colFilter', _descriptor5, this);

      _initDefineProp(this, 'colFilterTop', _descriptor6, this);

      _initDefineProp(this, 'colAddLabelAttributes', _descriptor7, this);

      _initDefineProp(this, 'colAddFilterAttributes', _descriptor8, this);

      _initDefineProp(this, 'colAddRowAttributes', _descriptor9, this);

      _initDefineProp(this, 'colType', _descriptor10, this);

      this.vGrid = vGrid;
      this.element = element;
      this.colRowTemplate = targetInstruction.elementInstruction.colRowTemplate;
      this.colHeaderTemplate = targetInstruction.elementInstruction.colHeaderTemplate;
      this.colCss = targetInstruction.elementInstruction.colCss;
    }

    VGridElementColConfig.prototype.bind = function bind(bindingContext, overrideContext) {
      this.vGrid.vGridConfig.columnLength++;

      this.vGrid.vGridConfig.colConfig.push({
        colWidth: this.colWidth || 100,
        colRowTemplate: this.colRowTemplate,
        colHeaderTemplate: this.colHeaderTemplate,
        colField: this.colField,
        colHeaderName: this.colHeaderName,
        colAddLabelAttributes: this.colAddLabelAttributes,
        colAddFilterAttributes: this.colAddFilterAttributes,
        colAddRowAttributes: this.colAddRowAttributes,
        colSort: this.colSort,
        colFilter: this.colFilter,
        colFilterTop: this.colFilterTop === "true" ? true : false,
        colCss: this.colCss,
        colType: this.colType || "text"
      });
    };

    return VGridElementColConfig;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'colWidth', [_dec5], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'colField', [_dec6], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'colHeaderName', [_dec7], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'colSort', [_dec8], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'colFilter', [_dec9], {
    enumerable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'colFilterTop', [_dec10], {
    enumerable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'colAddLabelAttributes', [_dec11], {
    enumerable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'colAddFilterAttributes', [_dec12], {
    enumerable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'colAddRowAttributes', [_dec13], {
    enumerable: true,
    initializer: null
  }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'colType', [_dec14], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class) || _class);
});