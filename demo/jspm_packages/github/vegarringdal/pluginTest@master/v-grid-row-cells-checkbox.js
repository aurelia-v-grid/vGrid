/* */ 
define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGridRowCellCheckbox = undefined;

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

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var VGridRowCellCheckbox = exports.VGridRowCellCheckbox = (_dec = (0, _aureliaFramework.customElement)('v-grid-checkbox'), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = (_class2 = function () {
    function VGridRowCellCheckbox(element, vGrid) {
      _classCallCheck(this, VGridRowCellCheckbox);

      _initDefineProp(this, 'value', _descriptor, this);

      _initDefineProp(this, 'customStyle', _descriptor2, this);

      this.element = element;
      this.vGrid = vGrid;
    }

    VGridRowCellCheckbox.prototype.valueChanged = function valueChanged(value, old) {
      if (value === undefined || value === null || value === "") {
        this.content.style.display = "none";
      } else {
        this.content.style.display = "block";
        this.content.checked = value;
      }
    };

    VGridRowCellCheckbox.prototype.customStyleChanged = function customStyleChanged(value, old) {};

    VGridRowCellCheckbox.prototype.bind = function bind(parent) {
      this.parent = parent;
    };

    VGridRowCellCheckbox.prototype.attached = function attached() {
      var _this = this;

      this.content = this.element.children[0];
      this.content.type = "checkbox";
      this.content.onclick = function (e) {
        if (this.parent.readOnly() === true && e.keyCode !== 9) {
          return false;
        } else {
          if (!this.parent.editMode()) {
            return false;
          } else {
            return true;
          }
        }
      }.bind(this);
      this.content.classList.add(this.parent.vGrid.vGridConfig.css.cellContent);
      this.content.style.height = "100%";
      this.content.style.margin = "auto";
      this.content.style.position = "initial";
      this.content.style.display = "block";
      this.content.style.opacity = "initial";
      this.element.appendChild(this.content);
      this.valueChanged(this.value);

      this.content.onchange = function () {
        if (!_this.parent.readOnly() && _this.parent.editMode()) {
          _this.parent.updateValue(_this.content.checked);
        } else {
          _this.content.checked = _this.value;
        }
      };

      this.content.columnNo = parseInt(this.parent.columnNo);

      this.content.addEventListener("cellFocus", function (e) {
        this.content.focus();
      }.bind(this));
    };

    return VGridRowCellCheckbox;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'customStyle', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class);
});