'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, customElement, bindable, VGrid, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridRowCellInput;

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
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('VGridRowCellInput', VGridRowCellInput = (_dec = customElement('v-grid-input'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridRowCellInput(element, vGrid) {
          _classCallCheck(this, VGridRowCellInput);

          _initDefineProp(this, 'value', _descriptor, this);

          _initDefineProp(this, 'customStyle', _descriptor2, this);

          this.element = element;
          this.vGrid = vGrid;
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
        };

        VGridRowCellInput.prototype.attached = function attached() {
          var _this = this;

          this.content = this.element.children[0];
          this.content.type = "text";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtaW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNUTtBQUFRO0FBQWU7O0FBQ3ZCOzs7bUNBS0ssNEJBRlosY0FBYyxjQUFkLFdBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCO0FBU0MsaUJBUlcsaUJBUVgsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQVJqQixtQkFRaUI7Ozs7OztBQUMxQixlQUFLLE9BQUwsR0FBZSxPQUFmLENBRDBCO0FBRTFCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FGMEI7U0FBNUI7O0FBUlcsb0NBaUJYLHFDQUFhLE9BQU8sS0FBSztBQUN2QixjQUFJLFVBQVUsU0FBVixFQUFxQjtBQUN2QixpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixNQUE3QixDQUR1QjtXQUF6QixNQUVPO0FBQ0wsaUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsT0FBN0IsQ0FESztBQUVMLGlCQUFLLE9BQUwsQ0FBYSxLQUFiLEdBQXFCLEtBQXJCLENBRks7V0FGUDs7O0FBbEJTLG9DQThCWCxpREFBbUIsT0FBTyxLQUFLOztBQTlCcEIsb0NBc0NYLHFCQUFLLFFBQVE7QUFDWCxlQUFLLE1BQUwsR0FBYyxNQUFkLENBRFc7OztBQXRDRixvQ0E4Q1gsK0JBQVc7OztBQUNULGVBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsQ0FBdEIsQ0FBZixDQURTO0FBRVQsZUFBSyxPQUFMLENBQWEsSUFBYixHQUFvQixNQUFwQixDQUZTO0FBR1QsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLFdBQWxCLENBQThCLEdBQTlCLENBQWtDLFdBQWxDLENBQTNCLENBSFM7QUFJVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCLENBSlM7QUFLVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLEtBQW5CLEdBQTJCLE1BQTNCLENBTFM7QUFNVCxlQUFLLE9BQUwsQ0FBYSxXQUFiLENBQXlCLEtBQUssT0FBTCxDQUF6QixDQU5TOztBQVVULGVBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsU0FBUyxLQUFLLE1BQUwsQ0FBWSxRQUFaLENBQWpDLENBVlM7O0FBYVQsZUFBSyxPQUFMLENBQWEsUUFBYixHQUF3QixZQUFLO0FBQzNCLGdCQUFHLENBQUMsTUFBSyxNQUFMLENBQVksUUFBWixFQUFELElBQTJCLE1BQUssTUFBTCxDQUFZLFFBQVosRUFBM0IsRUFBa0Q7QUFDbkQsb0JBQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsTUFBSyxPQUFMLENBQWEsS0FBYixDQUF4QixDQURtRDthQUFyRCxNQUVPO0FBQ0wsb0JBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsTUFBSyxLQUFMLENBRGhCO2FBRlA7V0FEc0IsQ0FiZjs7QUFzQlQsZUFBSyxPQUFMLENBQWEsTUFBYixHQUFzQixZQUFLO0FBQ3pCLGtCQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLE1BQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsTUFBSyxLQUFMLENBQTFDLEVBRHlCO0FBRXpCLGtCQUFLLE1BQUwsQ0FBWSxNQUFaLEdBRnlCO1dBQUwsQ0F0QmI7O0FBNEJULGVBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsVUFBVSxDQUFWLEVBQWE7QUFDcEMsZ0JBQUksS0FBSyxNQUFMLENBQVksUUFBWixPQUEyQixJQUEzQixJQUFtQyxFQUFFLE9BQUYsS0FBYyxDQUFkLEVBQWlCO0FBQ3RELHFCQUFPLEtBQVAsQ0FEc0Q7YUFBeEQsTUFFTztBQUNMLGtCQUFJLENBQUMsS0FBSyxNQUFMLENBQVksUUFBWixFQUFELEVBQXlCO0FBQzNCLHVCQUFPLEtBQVAsQ0FEMkI7ZUFBN0IsTUFFTztBQUNMLHVCQUFPLElBQVAsQ0FESztlQUZQO2FBSEY7V0FEdUIsQ0FVdkIsSUFWdUIsQ0FVbEIsSUFWa0IsQ0FBekIsQ0E1QlM7O0FBMENULGVBQUssT0FBTCxDQUFhLGdCQUFiLENBQThCLFdBQTlCLEVBQTJDLFVBQVUsQ0FBVixFQUFhO0FBQ3RELGlCQUFLLE9BQUwsQ0FBYSxLQUFiLEdBRHNEO1dBQWIsQ0FFekMsSUFGeUMsQ0FFcEMsSUFGb0MsQ0FBM0MsRUExQ1M7OztlQTlDQTtpRkFDVjs7O3NGQUNBIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtaW5wdXQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
