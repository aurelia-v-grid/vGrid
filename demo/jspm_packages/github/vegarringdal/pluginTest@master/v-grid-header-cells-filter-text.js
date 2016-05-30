/* */ 
define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGridHeaderFilterText = undefined;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

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

  var VGridHeaderFilterText = exports.VGridHeaderFilterText = (_dec = (0, _aureliaFramework.customElement)('v-grid-filter-text'), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = (_class2 = function () {
    function VGridHeaderFilterText(element) {
      _classCallCheck(this, VGridHeaderFilterText);

      _initDefineProp(this, 'type', _descriptor, this);

      _initDefineProp(this, 'filterValue', _descriptor2, this);

      this.element = element;
    }

    VGridHeaderFilterText.prototype.filterValueChanged = function filterValueChanged(newValue, oldValue) {
      if ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === "object") {
        newValue = "";
      }
      this.content.value = newValue;
      this.parent.onChangeEventOnFilter({ keyKode: 13 });
    };

    VGridHeaderFilterText.prototype.bind = function bind(parent) {
      this.parent = parent;
      this.vGrid = parent.vGrid;
      this.vGridConfig = parent.vGrid.vGridConfig;
    };

    VGridHeaderFilterText.prototype.attached = function attached() {
      var _this = this;

      this.content = this.element.children[0];
      this.setStyle(this.content);
      this.content.type = "text";

      this.content.onkeyup = function (e) {
        if (_this.vGridConfig.filterOnKeyArray[_this.parent.columnNo] || e.keyCode === 13) {
          if (_this.filterValue !== _this.content.value) {
            _this.filterValue = _this.content.value;
          } else {
            if (e.keyCode === 13) {
              if (_this.filterValue === _this.content.value) {
                _this.parent.onChangeEventOnFilter({ keyKode: 13 });
              }
            }
          }
        }
      };

      this.content.onchange = function () {};

      this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
      this.content.value = this.filterValue ? this.filterValue : "";

      this.content.style.height = "50%";
      this.content.style.margin = "initial";
    };

    VGridHeaderFilterText.prototype.setStyle = function setStyle(element) {

      var addClass = function addClass(name) {
        element.classList.add(name);
      };

      var setStyleTag = function setStyleTag(tag, value) {
        element.style[tag] = value;
      };

      switch (this.type) {
        case "filterTop":
          addClass(this.vGridConfig.css.cellContent);
          addClass(this.vGridConfig.css.filterInputTop);
          addClass(this.vGridConfig.css.filterHandle);
          setStyleTag("line-height", this.vGridConfig.headerHeight / 2 + 'px');
          break;
        case "filterBottom":
          addClass(this.vGridConfig.css.cellContent);
          addClass(this.vGridConfig.css.filterInputBottom);
          addClass(this.vGridConfig.css.filterHandle);
          setStyleTag("line-height", this.vGridConfig.headerHeight / 2 + 'px');
          break;
        default:
          break;
      }
    };

    return VGridHeaderFilterText;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'type', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'filterValue', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class);
});