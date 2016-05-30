/* */ 
define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGridHeaderLabel = undefined;

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

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

  var VGridHeaderLabel = exports.VGridHeaderLabel = (_dec = (0, _aureliaFramework.customElement)('v-grid-label'), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = (_class2 = function () {
    function VGridHeaderLabel(element) {
      _classCallCheck(this, VGridHeaderLabel);

      _initDefineProp(this, 'type', _descriptor, this);

      this.element = element;
    }

    VGridHeaderLabel.prototype.bind = function bind(parent) {
      this.parent = parent;
      this.vGrid = parent.vGrid;
      this.vGridConfig = parent.vGrid.vGridConfig;
    };

    VGridHeaderLabel.prototype.attached = function attached() {
      this.content = this.element.children[0];
      this.setStyle(this.content);
      this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
      this.content.style.height = "initial";
    };

    VGridHeaderLabel.prototype.setStyle = function setStyle(element) {

      var addClass = function addClass(name) {
        element.classList.add(name);
      };

      var setStyleTag = function setStyleTag(tag, value) {
        element.style[tag] = value;
      };

      var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";

      switch (this.type) {
        case "labelTop":
          addClass(this.vGridConfig.css.cellContent);
          addClass(this.vGridConfig.css.filterLabelTop);
          dragHandle ? addClass(dragHandle) : "";
          addClass(this.vGridConfig.css.orderHandle);
          setStyleTag("line-height", this.vGridConfig.headerHeight / 2 + 'px');
          break;
        case "labelBottom":
          addClass(this.vGridConfig.css.cellContent);
          addClass(this.vGridConfig.css.filterLabelBottom);
          dragHandle ? addClass(dragHandle) : "";
          addClass(this.vGridConfig.css.orderHandle);
          setStyleTag("line-height", this.vGridConfig.headerHeight / 2 + 'px');
          break;
        case "blankLabel":
          addClass(this.vGridConfig.css.cellContent);
          if (this.vGridConfig.filterOnAtTop) {
            addClass(this.vGridConfig.css.filterLabelBottom);
          } else {
            addClass(this.vGridConfig.css.filterLabelTop);
          }
          addClass(this.vGridConfig.css.orderHandle);
          break;
        case "single":
          addClass(this.vGridConfig.css.cellContent);
          dragHandle ? addClass(dragHandle) : "";
          addClass(this.vGridConfig.css.orderHandle);
          setStyleTag("line-height", this.vGridConfig.headerHeight + 'px');
          break;
        default:
          break;
      }
    };

    return VGridHeaderLabel;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'type', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class);
});