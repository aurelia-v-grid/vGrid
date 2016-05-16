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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtY2hlY2tib3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTUTtBQUFRO0FBQWU7O0FBQ3ZCOzs7c0NBU0ssK0JBRlosY0FBYyxpQkFBZCxXQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQjtBQVNDLGlCQVJXLG9CQVFYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtnQ0FSakIsc0JBUWlCOzs7Ozs7QUFDMUIsZUFBSyxPQUFMLEdBQWUsT0FBZixDQUQwQjtBQUUxQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRjBCO1NBQTVCOztBQVJXLHVDQWlCWCxxQ0FBYSxPQUFPLEtBQUs7QUFDdkIsY0FBSSxVQUFVLFNBQVYsSUFBdUIsVUFBVSxJQUFWLElBQWtCLFVBQVUsRUFBVixFQUFjO0FBQ3pELGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE1BQTdCLENBRHlEO1dBQTNELE1BRU87QUFDTCxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixPQUE3QixDQURLO0FBRUwsaUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBdkIsQ0FGSztXQUZQOzs7QUFsQlMsdUNBOEJYLGlEQUFtQixPQUFPLEtBQUs7O0FBOUJwQix1Q0FzQ1gscUJBQUssUUFBUTtBQUNYLGVBQUssTUFBTCxHQUFjLE1BQWQsQ0FEVzs7O0FBdENGLHVDQThDWCwrQkFBVzs7O0FBQ1QsZUFBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixDQUF0QixDQUFmLENBRFM7QUFFVCxlQUFLLE9BQUwsQ0FBYSxJQUFiLEdBQW9CLFVBQXBCLENBRlM7QUFHVCxlQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLFVBQVUsQ0FBVixFQUFhO0FBQ2xDLGdCQUFJLEtBQUssTUFBTCxDQUFZLFFBQVosT0FBMkIsSUFBM0IsSUFBbUMsRUFBRSxPQUFGLEtBQWMsQ0FBZCxFQUFpQjtBQUN0RCxxQkFBTyxLQUFQLENBRHNEO2FBQXhELE1BRU87QUFDTCxrQkFBSSxDQUFDLEtBQUssTUFBTCxDQUFZLFFBQVosRUFBRCxFQUF5QjtBQUMzQix1QkFBTyxLQUFQLENBRDJCO2VBQTdCLE1BRU87QUFDTCx1QkFBTyxJQUFQLENBREs7ZUFGUDthQUhGO1dBRHFCLENBVXJCLElBVnFCLENBVWhCLElBVmdCLENBQXZCLENBSFM7QUFjVCxlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsV0FBbEIsQ0FBOEIsR0FBOUIsQ0FBa0MsV0FBbEMsQ0FBM0IsQ0FkUztBQWVULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUIsQ0FmUztBQWdCVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCLENBaEJTO0FBaUJULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsUUFBbkIsR0FBOEIsU0FBOUIsQ0FqQlM7QUFrQlQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixPQUE3QixDQWxCUztBQW1CVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLFNBQTdCLENBbkJTO0FBb0JULGVBQUssT0FBTCxDQUFhLFdBQWIsQ0FBeUIsS0FBSyxPQUFMLENBQXpCLENBcEJTO0FBcUJULGVBQUssWUFBTCxDQUFrQixLQUFLLEtBQUwsQ0FBbEIsQ0FyQlM7O0FBdUJULGVBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsWUFBSztBQUMzQixrQkFBSyxNQUFMLENBQVksV0FBWixDQUF3QixNQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXhCLENBRDJCO1dBQUwsQ0F2QmY7O0FBNEJULGVBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsU0FBUyxLQUFLLE1BQUwsQ0FBWSxRQUFaLENBQWpDLENBNUJTOztBQStCVCxlQUFLLE9BQUwsQ0FBYSxnQkFBYixDQUE4QixXQUE5QixFQUEyQyxVQUFVLENBQVYsRUFBYTtBQUN0RCxpQkFBSyxPQUFMLENBQWEsS0FBYixHQURzRDtXQUFiLENBRXpDLElBRnlDLENBRXBDLElBRm9DLENBQTNDLEVBL0JTOzs7ZUE5Q0E7aUZBQ1Y7OztzRkFDQSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtcm93LWNlbGxzLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
