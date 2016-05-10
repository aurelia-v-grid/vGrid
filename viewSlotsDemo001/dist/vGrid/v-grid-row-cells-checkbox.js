'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, customElement, bindable, VGrid, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridRowCellCheckbox;

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
      _export('VGridRowCellCheckbox', VGridRowCellCheckbox = (_dec = customElement('v-grid-checkbox'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
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
            _this.parent.updateValue(_this.content.checked);
          };

          this.content.columnNo = parseInt(this.parent.columnNo);

          this.content.addEventListener("cellFocus", function (e) {
            this.content.focus();
          }.bind(this));
        };

        return VGridRowCellCheckbox;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'customStyle', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('VGridRowCellCheckbox', VGridRowCellCheckbox);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtY2hlY2tib3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTUTtBQUFRO0FBQWU7O0FBQ3ZCOzs7c0NBVUssK0JBRlosY0FBYyxpQkFBZCxXQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQjtBQU1DLGlCQUxXLG9CQUtYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtnQ0FMakIsc0JBS2lCOzs7Ozs7QUFDMUIsZUFBSyxPQUFMLEdBQWUsT0FBZixDQUQwQjtBQUUxQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRjBCO1NBQTVCOztBQUxXLHVDQVdYLHFDQUFhLE9BQU8sS0FBSztBQUN2QixjQUFJLFVBQVUsU0FBVixJQUF1QixVQUFVLElBQVYsSUFBa0IsVUFBVSxFQUFWLEVBQWM7QUFDekQsaUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsTUFBN0IsQ0FEeUQ7V0FBM0QsTUFFTztBQUNMLGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE9BQTdCLENBREs7QUFFTCxpQkFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixLQUF2QixDQUZLO1dBRlA7OztBQVpTLHVDQW9CWCxpREFBbUIsT0FBTyxLQUFLOztBQXBCcEIsdUNBeUJYLHFCQUFLLFFBQVE7QUFDWCxlQUFLLE1BQUwsR0FBYyxNQUFkLENBRFc7OztBQXpCRix1Q0E4QlgsK0JBQVc7OztBQUNULGVBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsQ0FBdEIsQ0FBZixDQURTO0FBRVQsZUFBSyxPQUFMLENBQWEsSUFBYixHQUFvQixVQUFwQixDQUZTO0FBR1QsZUFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixVQUFVLENBQVYsRUFBYTtBQUNsQyxnQkFBSSxLQUFLLE1BQUwsQ0FBWSxRQUFaLE9BQTJCLElBQTNCLElBQW1DLEVBQUUsT0FBRixLQUFjLENBQWQsRUFBaUI7QUFDdEQscUJBQU8sS0FBUCxDQURzRDthQUF4RCxNQUVPO0FBQ0wsa0JBQUksQ0FBQyxLQUFLLE1BQUwsQ0FBWSxRQUFaLEVBQUQsRUFBeUI7QUFDM0IsdUJBQU8sS0FBUCxDQUQyQjtlQUE3QixNQUVPO0FBQ0wsdUJBQU8sSUFBUCxDQURLO2VBRlA7YUFIRjtXQURxQixDQVVyQixJQVZxQixDQVVoQixJQVZnQixDQUF2QixDQUhTO0FBY1QsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLFdBQWxCLENBQThCLEdBQTlCLENBQWtDLFdBQWxDLENBQTNCLENBZFM7QUFlVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCLENBZlM7QUFnQlQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixNQUE1QixDQWhCUztBQWlCVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFFBQW5CLEdBQThCLFNBQTlCLENBakJTO0FBa0JULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsT0FBN0IsQ0FsQlM7QUFtQlQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixTQUE3QixDQW5CUztBQW9CVCxlQUFLLE9BQUwsQ0FBYSxXQUFiLENBQXlCLEtBQUssT0FBTCxDQUF6QixDQXBCUztBQXFCVCxlQUFLLFlBQUwsQ0FBa0IsS0FBSyxLQUFMLENBQWxCLENBckJTOztBQXVCVCxlQUFLLE9BQUwsQ0FBYSxRQUFiLEdBQXdCLFlBQUs7QUFDM0Isa0JBQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsTUFBSyxPQUFMLENBQWEsT0FBYixDQUF4QixDQUQyQjtXQUFMLENBdkJmOztBQTRCVCxlQUFLLE9BQUwsQ0FBYSxRQUFiLEdBQXdCLFNBQVMsS0FBSyxNQUFMLENBQVksUUFBWixDQUFqQyxDQTVCUzs7QUErQlQsZUFBSyxPQUFMLENBQWEsZ0JBQWIsQ0FBOEIsV0FBOUIsRUFBMkMsVUFBVSxDQUFWLEVBQWE7QUFDdEQsaUJBQUssT0FBTCxDQUFhLEtBQWIsR0FEc0Q7V0FBYixDQUV6QyxJQUZ5QyxDQUVwQyxJQUZvQyxDQUEzQyxFQS9CUzs7O2VBOUJBO2lGQUNWOzs7c0ZBQ0EiLCJmaWxlIjoidkdyaWQvdi1ncmlkLXJvdy1jZWxscy1jaGVja2JveC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
