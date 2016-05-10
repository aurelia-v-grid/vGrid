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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtaW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNUTtBQUFRO0FBQWU7O0FBQ3ZCOzs7bUNBS0ssNEJBRlosY0FBYyxjQUFkLFdBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCO0FBTUMsaUJBTFcsaUJBS1gsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQUxqQixtQkFLaUI7Ozs7OztBQUMxQixlQUFLLE9BQUwsR0FBZSxPQUFmLENBRDBCO0FBRTFCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FGMEI7U0FBNUI7O0FBTFcsb0NBV1gscUNBQWEsT0FBTyxLQUFLO0FBQ3ZCLGNBQUksVUFBVSxTQUFWLEVBQXFCO0FBQ3ZCLGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE1BQTdCLENBRHVCO1dBQXpCLE1BRU87QUFDTCxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixPQUE3QixDQURLO0FBRUwsaUJBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsS0FBckIsQ0FGSztXQUZQOzs7QUFaUyxvQ0FvQlgsaURBQW1CLE9BQU8sS0FBSzs7QUFwQnBCLG9DQXdCWCxxQkFBSyxRQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZCxDQURXOzs7QUF4QkYsb0NBNEJYLCtCQUFXOzs7QUFDVCxlQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLENBQXRCLENBQWYsQ0FEUztBQUVULGVBQUssT0FBTCxDQUFhLElBQWIsR0FBb0IsTUFBcEIsQ0FGUztBQUdULGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixXQUFsQixDQUE4QixHQUE5QixDQUFrQyxXQUFsQyxDQUEzQixDQUhTO0FBSVQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixNQUE1QixDQUpTO0FBS1QsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixLQUFuQixHQUEyQixNQUEzQixDQUxTO0FBTVQsZUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixLQUFLLE9BQUwsQ0FBekIsQ0FOUzs7QUFTVCxlQUFLLE9BQUwsQ0FBYSxRQUFiLEdBQXdCLFNBQVMsS0FBSyxNQUFMLENBQVksUUFBWixDQUFqQyxDQVRTOztBQVlULGVBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsWUFBSztBQUMzQixrQkFBSyxNQUFMLENBQVksV0FBWixDQUF3QixNQUFLLE9BQUwsQ0FBYSxLQUFiLENBQXhCLENBRDJCO1dBQUwsQ0FaZjs7QUFpQlQsZUFBSyxPQUFMLENBQWEsTUFBYixHQUFzQixZQUFLO0FBQ3ZCLGtCQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLE1BQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsTUFBSyxLQUFMLENBQTFDLEVBRHVCO0FBRXZCLGtCQUFLLE1BQUwsQ0FBWSxNQUFaLEdBRnVCO1dBQUwsQ0FqQmI7O0FBdUJULGVBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsVUFBVSxDQUFWLEVBQWE7QUFDcEMsZ0JBQUksS0FBSyxNQUFMLENBQVksUUFBWixPQUEyQixJQUEzQixJQUFtQyxFQUFFLE9BQUYsS0FBYyxDQUFkLEVBQWlCO0FBQ3RELHFCQUFPLEtBQVAsQ0FEc0Q7YUFBeEQsTUFFTztBQUNMLGtCQUFJLENBQUMsS0FBSyxNQUFMLENBQVksUUFBWixFQUFELEVBQXlCO0FBQzNCLHVCQUFPLEtBQVAsQ0FEMkI7ZUFBN0IsTUFFTztBQUNMLHVCQUFPLElBQVAsQ0FESztlQUZQO2FBSEY7V0FEdUIsQ0FVdkIsSUFWdUIsQ0FVbEIsSUFWa0IsQ0FBekIsQ0F2QlM7O0FBcUNULGVBQUssT0FBTCxDQUFhLGdCQUFiLENBQThCLFdBQTlCLEVBQTJDLFVBQVUsQ0FBVixFQUFhO0FBQ3RELGlCQUFLLE9BQUwsQ0FBYSxLQUFiLEdBRHNEO1dBQWIsQ0FFekMsSUFGeUMsQ0FFcEMsSUFGb0MsQ0FBM0MsRUFyQ1M7OztlQTVCQTtpRkFDVjs7O3NGQUNBIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtaW5wdXQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
