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

        VGridRowCellInput.prototype.customStyleChanged = function customStyleChanged(value, old) {
          console.log("wow");
        };

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
            _this.parent.updateValue(_this.content.value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtaW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTUSxZLHFCQUFBLE07QUFBUSxtQixxQkFBQSxhO0FBQWUsYyxxQkFBQSxROztBQUN2QixXLFVBQUEsSzs7O21DQVVLLGlCLFdBRlosY0FBYyxjQUFkLEMsVUFDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsQztBQU1DLG1DQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7QUFBQTs7QUFBQTs7QUFBQTs7QUFDMUIsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDRDs7b0NBR0QsWSx5QkFBYSxLLEVBQU8sRyxFQUFLO0FBQ3ZCLGNBQUksVUFBVSxTQUFkLEVBQXlCO0FBQ3ZCLGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE1BQTdCO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsaUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsT0FBN0I7QUFDQSxpQkFBSyxPQUFMLENBQWEsS0FBYixHQUFxQixLQUFyQjtBQUNEO0FBQ0YsUzs7b0NBRUQsa0IsK0JBQW1CLEssRUFBTyxHLEVBQUs7QUFDN0Isa0JBQVEsR0FBUixDQUFZLEtBQVo7QUFDRCxTOztvQ0FFRCxJLGlCQUFLLE0sRUFBUTtBQUNYLGVBQUssTUFBTCxHQUFjLE1BQWQ7QUFDRCxTOztvQ0FFRCxRLHVCQUFXO0FBQUE7O0FBQ1QsZUFBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixDQUF0QixDQUFmO0FBQ0EsZUFBSyxPQUFMLENBQWEsSUFBYixHQUFvQixNQUFwQjtBQUNBLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixXQUFsQixDQUE4QixHQUE5QixDQUFrQyxXQUE3RDtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLEtBQW5CLEdBQTJCLE1BQTNCO0FBQ0EsZUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixLQUFLLE9BQTlCOztBQUdBLGVBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsU0FBUyxLQUFLLE1BQUwsQ0FBWSxRQUFyQixDQUF4Qjs7QUFHQSxlQUFLLE9BQUwsQ0FBYSxRQUFiLEdBQXdCLFlBQUs7QUFDM0Isa0JBQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsTUFBSyxPQUFMLENBQWEsS0FBckM7QUFDRCxXQUZEOztBQUtBLGVBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsWUFBSztBQUN2QixrQkFBSyxNQUFMLENBQVksUUFBWixDQUFxQixNQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLE1BQUssS0FBMUIsQ0FBckI7QUFDQSxrQkFBSyxNQUFMLENBQVksTUFBWjtBQUNILFdBSEQ7O0FBTUEsZUFBSyxPQUFMLENBQWEsU0FBYixHQUF5QixVQUFVLENBQVYsRUFBYTtBQUNwQyxnQkFBSSxLQUFLLE1BQUwsQ0FBWSxRQUFaLE9BQTJCLElBQTNCLElBQW1DLEVBQUUsT0FBRixLQUFjLENBQXJELEVBQXdEO0FBQ3RELHFCQUFPLEtBQVA7QUFDRCxhQUZELE1BRU87QUFDTCxrQkFBSSxDQUFDLEtBQUssTUFBTCxDQUFZLFFBQVosRUFBTCxFQUE2QjtBQUMzQix1QkFBTyxLQUFQO0FBQ0QsZUFGRCxNQUVPO0FBQ0wsdUJBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFDRixXQVZ3QixDQVV2QixJQVZ1QixDQVVsQixJQVZrQixDQUF6Qjs7QUFjQSxlQUFLLE9BQUwsQ0FBYSxnQkFBYixDQUE4QixXQUE5QixFQUEyQyxVQUFVLENBQVYsRUFBYTtBQUN0RCxpQkFBSyxPQUFMLENBQWEsS0FBYjtBQUNELFdBRjBDLENBRXpDLElBRnlDLENBRXBDLElBRm9DLENBQTNDO0FBSUQsUzs7O2lGQXBFQSxROzs7c0ZBQ0EsUSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtcm93LWNlbGxzLWlucHV0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
