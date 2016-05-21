'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtY2hlY2tib3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RLFkscUJBQUEsTTtBQUFRLG1CLHFCQUFBLGE7QUFBZSxjLHFCQUFBLFE7O0FBR3ZCLFcsVUFBQSxLOzs7c0NBU0ssb0IsV0FGWixjQUFjLGlCQUFkLEMsVUFDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsQztBQVNDLHNDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7QUFBQTs7QUFBQTs7QUFBQTs7QUFDMUIsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDRDs7dUNBTUQsWSx5QkFBYSxLLEVBQU8sRyxFQUFLO0FBQ3ZCLGNBQUksVUFBVSxTQUFWLElBQXVCLFVBQVUsSUFBakMsSUFBeUMsVUFBVSxFQUF2RCxFQUEyRDtBQUN6RCxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixNQUE3QjtBQUNELFdBRkQsTUFFTztBQUNMLGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE9BQTdCO0FBQ0EsaUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBdkI7QUFDRDtBQUNGLFM7O3VDQU1ELGtCLCtCQUFtQixLLEVBQU8sRyxFQUFLLENBRTlCLEM7O3VDQU1ELEksaUJBQUssTSxFQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNELFM7O3VDQU1ELFEsdUJBQVc7QUFBQTs7QUFDVCxlQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLENBQXRCLENBQWY7QUFDQSxlQUFLLE9BQUwsQ0FBYSxJQUFiLEdBQW9CLFVBQXBCO0FBQ0EsZUFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixVQUFVLENBQVYsRUFBYTtBQUNsQyxnQkFBSSxLQUFLLE1BQUwsQ0FBWSxRQUFaLE9BQTJCLElBQTNCLElBQW1DLEVBQUUsT0FBRixLQUFjLENBQXJELEVBQXdEO0FBQ3RELHFCQUFPLEtBQVA7QUFDRCxhQUZELE1BRU87QUFDTCxrQkFBSSxDQUFDLEtBQUssTUFBTCxDQUFZLFFBQVosRUFBTCxFQUE2QjtBQUMzQix1QkFBTyxLQUFQO0FBQ0QsZUFGRCxNQUVPO0FBQ0wsdUJBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFDRixXQVZzQixDQVVyQixJQVZxQixDQVVoQixJQVZnQixDQUF2QjtBQVdBLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixXQUFsQixDQUE4QixHQUE5QixDQUFrQyxXQUE3RDtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCO0FBQ0EsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixRQUFuQixHQUE4QixTQUE5QjtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsT0FBN0I7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLFNBQTdCO0FBQ0EsZUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixLQUFLLE9BQTlCO0FBQ0EsZUFBSyxZQUFMLENBQWtCLEtBQUssS0FBdkI7O0FBRUEsZUFBSyxPQUFMLENBQWEsUUFBYixHQUF3QixZQUFLO0FBQzNCLGdCQUFHLENBQUMsTUFBSyxNQUFMLENBQVksUUFBWixFQUFELElBQTJCLE1BQUssTUFBTCxDQUFZLFFBQVosRUFBOUIsRUFBcUQ7QUFDbkQsb0JBQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsTUFBSyxPQUFMLENBQWEsT0FBckM7QUFDRCxhQUZELE1BRU87QUFDTCxvQkFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixNQUFLLEtBQTVCO0FBQ0Q7QUFDRixXQU5EOztBQVNBLGVBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsU0FBUyxLQUFLLE1BQUwsQ0FBWSxRQUFyQixDQUF4Qjs7QUFHQSxlQUFLLE9BQUwsQ0FBYSxnQkFBYixDQUE4QixXQUE5QixFQUEyQyxVQUFVLENBQVYsRUFBYTtBQUN0RCxpQkFBSyxPQUFMLENBQWEsS0FBYjtBQUNELFdBRjBDLENBRXpDLElBRnlDLENBRXBDLElBRm9DLENBQTNDO0FBSUQsUzs7O2lGQXBGQSxROzs7c0ZBQ0EsUSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtcm93LWNlbGxzLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
