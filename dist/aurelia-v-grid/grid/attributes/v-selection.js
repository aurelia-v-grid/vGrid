'use strict';

System.register(['aurelia-framework', '../v-grid'], function (_export, _context) {
  "use strict";

  var bindable, inject, customAttribute, VGrid, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, vGridAttributesSelection;

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
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('vGridAttributesSelection', vGridAttributesSelection = (_dec = customAttribute('v-selection'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
        vGridAttributesSelection.prototype.selectedChanged = function selectedChanged(newValue, oldValue) {
          if (this.type === "row") {
            this.element.checked = newValue;
          }
        };

        function vGridAttributesSelection(element, vGrid) {
          _classCallCheck(this, vGridAttributesSelection);

          _initDefineProp(this, 'selected', _descriptor, this);

          _initDefineProp(this, 'type', _descriptor2, this);

          this.vGrid = vGrid;
          this.controller = vGrid.controller;
          this.element = element;
        }

        vGridAttributesSelection.prototype.bind = function bind(bindingContext, overrideContext) {
          this.bindingContext = bindingContext;
          this.overrideContext = overrideContext;
        };

        vGridAttributesSelection.prototype.attached = function attached() {
          var _this = this;

          this.element.checked = this.selected;

          this.element.onclick = function () {

            var status = _this.element.checked === "true" || _this.element.checked === true ? true : false;

            if (status) {
              if (_this.type === "header") {
                _this.bindingContext.selection.selectRange(0, _this.controller.collectionLength() - 1);
                _this.controller.rowClickHandler.updateSelectionOnAllRows();
              }
              if (_this.type === "row") {
                _this.bindingContext.selection.select(_this.bindingContext.row, true);
                _this.controller.rowClickHandler.updateSelectionOnAllRows();
              }
            } else {

              if (_this.type === "header") {
                _this.bindingContext.selection.deSelectAll();
                _this.controller.rowClickHandler.updateSelectionOnAllRows();
              }

              if (_this.type === "row") {
                _this.bindingContext.selection.deSelect(_this.bindingContext.row, true);
                _this.controller.rowClickHandler.updateSelectionOnAllRows();
              }
            }
          };
        };

        return vGridAttributesSelection;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'selected', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'type', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('vGridAttributesSelection', vGridAttributesSelection);
    }
  };
});
//# sourceMappingURL=v-selection.js.map
