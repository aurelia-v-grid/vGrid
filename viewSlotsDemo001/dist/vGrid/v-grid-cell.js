'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  var noView, customElement, processContent, bindable, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _class3, _temp, VGridCell;

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
      noView = _aureliaFramework.noView;
      customElement = _aureliaFramework.customElement;
      processContent = _aureliaFramework.processContent;
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export('VGridCell', VGridCell = (_dec = customElement('v-grid-cell'), _dec2 = processContent(false), noView(_class = _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function () {
        function VGridCell(element) {
          _classCallCheck(this, VGridCell);

          _initDefineProp(this, 'colNo', _descriptor, this);

          this.element = element;
        }

        VGridCell.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          this.ctx = bindingContext.ctx;
          if (this.bindingContext && this.cellContent) {
            this.setValue(this.bindingContext[this.ctx.vGridConfig.attributeArray[this.colNo]]);
          }
        };

        VGridCell.prototype.created = function created() {};

        VGridCell.prototype.setValue = function setValue(value) {
          if (this.ctx.vGridConfig.colTypeArray[this.colNo] === "image") {
            this.cellContent.src = value;
          } else {
            if (this.ctx.vGridConfig.colTypeArray[this.colNo] === "checkbox") {
              this.cellContent.checked = value === "true" || value === true ? true : false;
            } else {
              this.cellContent.value = value || "";
            }
          }
        };

        VGridCell.prototype.attached = function attached() {
          if (this.ctx.vGridConfig.colTypeArray[this.colNo] === "image") {
            this.cellContent = document.createElement("img");
          } else {
            this.cellContent = document.createElement("input");
          }
          if (this.ctx.vGridConfig.colTypeArray[this.colNo] === "checkbox") {
            this.cellContent.type = "checkbox";
            this.cellContent.onclick = function (e) {
              if (!this.ctx.vGrid.vGridCellEdit.editMode) {
                return false;
              }
            }.bind(this);
          }

          this.cellContent.classList.add(this.ctx.vGridConfig.css.cellContent);
          this.cellContent.setAttribute(this.ctx.vGridConfig.atts.dataAttribute, this.ctx.vGridConfig.attributeArray[this.colNo]);
          this.cellContent.setAttribute("style", this.ctx.vGridConfig.colStyleArray[this.colNo]);
          this.cellContent.style.opacity = 1;
          this.cellContent.style.border = 0;
          this.cellContent.style.transition = "0ms";
          this.cellContent.setAttribute("tabindex", "0");

          if (this.bindingContext) {
            this.setValue(this.bindingContext[this.ctx.vGridConfig.attributeArray[this.colNo]]);
          }
          this.element.appendChild(this.cellContent);
        };

        return VGridCell;
      }(), _class3.inject = [Element], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'colNo', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class));

      _export('VGridCell', VGridCell);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsYUFBckIsQ0FBbUMsS0FBSyxLQUFMLENBQTFFLEVBbEJTO0FBbUJULGVBQUssV0FBTCxDQUFpQixLQUFqQixDQUF1QixPQUF2QixHQUFpQyxDQUFqQyxDQW5CUztBQW9CVCxlQUFLLFdBQUwsQ0FBaUIsS0FBakIsQ0FBdUIsTUFBdkIsR0FBZ0MsQ0FBaEMsQ0FwQlM7QUFxQlQsZUFBSyxXQUFMLENBQWlCLEtBQWpCLENBQXVCLFVBQXZCLEdBQW9DLEtBQXBDLENBckJTO0FBc0JULGVBQUssV0FBTCxDQUFpQixZQUFqQixDQUE4QixVQUE5QixFQUEwQyxHQUExQyxFQXRCUzs7QUF3QlQsY0FBSSxLQUFLLGNBQUwsRUFBcUI7QUFDdkIsaUJBQUssUUFBTCxDQUFjLEtBQUssY0FBTCxDQUFvQixLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLGNBQXJCLENBQW9DLEtBQUssS0FBTCxDQUF4RCxDQUFkLEVBRHVCO1dBQXpCO0FBR0EsZUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixLQUFLLFdBQUwsQ0FBekIsQ0EzQlM7OztlQXJDQTttQkFDSixTQUFTLENBQUMsT0FBRCxpRkFDZiIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY2VsbC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
