'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var inject, customElement, bindable, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridRowCellInput;

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
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export('VGridRowCellInput', VGridRowCellInput = (_dec = customElement('v-grid-customx'), _dec2 = inject(Element), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridRowCellInput(element) {
          _classCallCheck(this, VGridRowCellInput);

          _initDefineProp(this, 'value', _descriptor, this);

          _initDefineProp(this, 'customStyle', _descriptor2, this);

          this.element = element;
        }

        VGridRowCellInput.prototype.valueChanged = function valueChanged(value, old) {
          if (value === undefined) {
            this.content.style.display = "none";
          } else {
            this.content.style.display = "block";
            this.content.value = value;
          }
        };

        VGridRowCellInput.prototype.customStyleChanged = function customStyleChanged(value, old) {};

        VGridRowCellInput.prototype.bind = function bind(parent) {
          this.parent = parent;
          this.vGrid = parent.vGrid;
        };

        VGridRowCellInput.prototype.attached = function attached() {
          var _this = this;

          this.content = this.element.children[0];
          this.content.type = "button";
          this.content.classList.add(this.parent.vGrid.vGridConfig.css.cellContent);
          this.content.style.height = "100%";
          this.content.style.width = "100%";
          this.element.appendChild(this.content);

          this.content.columnNo = parseInt(this.parent.columnNo);

          this.content.onchange = function () {
            if (!_this.parent.readOnly() && _this.parent.editMode()) {
              _this.parent.updateValue(_this.content.value);
            } else {
              _this.content.value = _this.value;
            }
          };

          this.content.onblur = function () {
            _this.parent.setValue(_this.parent.getValue(_this.value));
            _this.parent.setCss();
          };

          this.content.oninput = function () {
            if (!_this.parent.editMode() || _this.readOnly) {
              _this.content.value = _this.value;
            }
          };

          this.content.onkeydown = function (e) {
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

          this.content.addEventListener("cellFocus", function (e) {
            this.content.focus();
          }.bind(this));
        };

        return VGridRowCellInput;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'customStyle', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('VGridRowCellInput', VGridRowCellInput);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInYtZ3JpZC1yb3ctY2VsbHMtY3VzdG9teC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVEsWSxxQkFBQSxNO0FBQVEsbUIscUJBQUEsYTtBQUFlLGMscUJBQUEsUTs7O21DQVFsQixpQixXQUZaLGNBQWMsZ0JBQWQsQyxVQUNBLE9BQU8sT0FBUCxDO0FBU0MsbUNBQVksT0FBWixFQUFxQjtBQUFBOztBQUFBOztBQUFBOztBQUNuQixlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0Q7O29DQU1ELFkseUJBQWEsSyxFQUFPLEcsRUFBSztBQUN2QixjQUFJLFVBQVUsU0FBZCxFQUF5QjtBQUN2QixpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixNQUE3QjtBQUNELFdBRkQsTUFFTztBQUNMLGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE9BQTdCO0FBQ0EsaUJBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsS0FBckI7QUFDRDtBQUNGLFM7O29DQU1ELGtCLCtCQUFtQixLLEVBQU8sRyxFQUFLLENBRTlCLEM7O29DQU1ELEksaUJBQUssTSxFQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGVBQUssS0FBTCxHQUFhLE9BQU8sS0FBcEI7QUFDRCxTOztvQ0FNRCxRLHVCQUFXO0FBQUE7O0FBQ1QsZUFBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixDQUF0QixDQUFmO0FBQ0EsZUFBSyxPQUFMLENBQWEsSUFBYixHQUFvQixRQUFwQjtBQUNBLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixXQUFsQixDQUE4QixHQUE5QixDQUFrQyxXQUE3RDtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLEtBQW5CLEdBQTJCLE1BQTNCO0FBQ0EsZUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixLQUFLLE9BQTlCOztBQUlBLGVBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsU0FBUyxLQUFLLE1BQUwsQ0FBWSxRQUFyQixDQUF4Qjs7QUFHQSxlQUFLLE9BQUwsQ0FBYSxRQUFiLEdBQXdCLFlBQUs7QUFDM0IsZ0JBQUksQ0FBQyxNQUFLLE1BQUwsQ0FBWSxRQUFaLEVBQUQsSUFBMkIsTUFBSyxNQUFMLENBQVksUUFBWixFQUEvQixFQUF1RDtBQUNyRCxvQkFBSyxNQUFMLENBQVksV0FBWixDQUF3QixNQUFLLE9BQUwsQ0FBYSxLQUFyQztBQUNELGFBRkQsTUFFTztBQUNMLG9CQUFLLE9BQUwsQ0FBYSxLQUFiLEdBQXFCLE1BQUssS0FBMUI7QUFDRDtBQUNGLFdBTkQ7O0FBU0EsZUFBSyxPQUFMLENBQWEsTUFBYixHQUFzQixZQUFLO0FBQ3pCLGtCQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLE1BQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsTUFBSyxLQUExQixDQUFyQjtBQUNBLGtCQUFLLE1BQUwsQ0FBWSxNQUFaO0FBQ0QsV0FIRDs7QUFPQSxlQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLFlBQUs7QUFDMUIsZ0JBQUksQ0FBQyxNQUFLLE1BQUwsQ0FBWSxRQUFaLEVBQUQsSUFBMkIsTUFBSyxRQUFwQyxFQUE4QztBQUM1QyxvQkFBSyxPQUFMLENBQWEsS0FBYixHQUFxQixNQUFLLEtBQTFCO0FBQ0Q7QUFDRixXQUpEOztBQU9BLGVBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsVUFBVSxDQUFWLEVBQWE7QUFDcEMsZ0JBQUksS0FBSyxNQUFMLENBQVksUUFBWixPQUEyQixJQUEzQixJQUFtQyxFQUFFLE9BQUYsS0FBYyxDQUFyRCxFQUF3RDtBQUN0RCxxQkFBTyxLQUFQO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsa0JBQUksQ0FBQyxLQUFLLE1BQUwsQ0FBWSxRQUFaLEVBQUwsRUFBNkI7QUFDM0IsdUJBQU8sS0FBUDtBQUNELGVBRkQsTUFFTztBQUNMLHVCQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0YsV0FWd0IsQ0FVdkIsSUFWdUIsQ0FVbEIsSUFWa0IsQ0FBekI7O0FBY0EsZUFBSyxPQUFMLENBQWEsZ0JBQWIsQ0FBOEIsV0FBOUIsRUFBMkMsVUFBVSxDQUFWLEVBQWE7QUFDdEQsaUJBQUssT0FBTCxDQUFhLEtBQWI7QUFDRCxXQUYwQyxDQUV6QyxJQUZ5QyxDQUVwQyxJQUZvQyxDQUEzQztBQU1ELFM7OztpRkFyR0EsUTs7O3NGQUNBLFEiLCJmaWxlIjoidi1ncmlkLXJvdy1jZWxscy1jdXN0b214LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
