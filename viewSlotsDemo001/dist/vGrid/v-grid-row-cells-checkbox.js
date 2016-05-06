'use strict';

System.register(['aurelia-framework', './v-grid', './v-grid-row-col'], function (_export, _context) {
  var inject, noView, customElement, processContent, bindable, VGrid, VGridCellContainer, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridRowCellCheckbox;

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
      noView = _aureliaFramework.noView;
      customElement = _aureliaFramework.customElement;
      processContent = _aureliaFramework.processContent;
      bindable = _aureliaFramework.bindable;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }, function (_vGridRowCol) {
      VGridCellContainer = _vGridRowCol.VGridCellContainer;
    }],
    execute: function () {
      _export('VGridRowCellCheckbox', VGridRowCellCheckbox = (_dec = customElement('v-grid-checkbox'), _dec2 = inject(Element, VGrid, VGridCellContainer), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridRowCellCheckbox(element, vGrid, VGridCellContainer) {
          _classCallCheck(this, VGridRowCellCheckbox);

          _initDefineProp(this, 'value', _descriptor, this);

          _initDefineProp(this, 'customStyle', _descriptor2, this);

          this.element = element;
          this.vGrid = vGrid;
          this.vGridCol = VGridCellContainer;
        }

        VGridRowCellCheckbox.prototype.valueChanged = function valueChanged(value, old) {
          if (value === undefined || value === null || value === "") {
            this.content.style.display = "none";
          } else {
            this.content.style.display = "block";
            this.content.checked = value;
          }
        };

        VGridRowCellCheckbox.prototype.customStyleChanged = function customStyleChanged(value, old) {
          console.log("wow");
        };

        VGridRowCellCheckbox.prototype.bind = function bind(parent) {
          this.parent = parent;
        };

        VGridRowCellCheckbox.prototype.attached = function attached() {
          var _this = this;

          this.content = this.element.children[0];
          this.content.type = "checkbox";
          this.valueChanged(this.value);
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
          this.element.appendChild(this.content);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtY2hlY2tib3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTUTtBQUFRO0FBQVE7QUFBZTtBQUFnQjs7QUFDL0M7O0FBQ0E7OztzQ0FTSywrQkFGWixjQUFjLGlCQUFkLFdBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEVBQXVCLGtCQUF2QjtBQU1DLGlCQUxXLG9CQUtYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QixrQkFBNUIsRUFBZ0Q7Z0NBTHJDLHNCQUtxQzs7Ozs7O0FBQzlDLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEOEM7QUFFOUMsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUY4QztBQUc5QyxlQUFLLFFBQUwsR0FBZ0Isa0JBQWhCLENBSDhDO1NBQWhEOztBQUxXLHVDQVlYLHFDQUFhLE9BQU8sS0FBSztBQUN2QixjQUFJLFVBQVUsU0FBVixJQUF1QixVQUFVLElBQVYsSUFBa0IsVUFBVSxFQUFWLEVBQWM7QUFDekQsaUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsTUFBN0IsQ0FEeUQ7V0FBM0QsTUFFTztBQUNMLGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE9BQTdCLENBREs7QUFFTCxpQkFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixLQUF2QixDQUZLO1dBRlA7OztBQWJTLHVDQXFCWCxpREFBbUIsT0FBTyxLQUFLO0FBQzdCLGtCQUFRLEdBQVIsQ0FBWSxLQUFaLEVBRDZCOzs7QUFyQnBCLHVDQTBCWCxxQkFBSyxRQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZCxDQURXOzs7QUExQkYsdUNBK0JYLCtCQUFXOzs7QUFDVCxlQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLENBQXRCLENBQWYsQ0FEUztBQUVULGVBQUssT0FBTCxDQUFhLElBQWIsR0FBb0IsVUFBcEIsQ0FGUztBQUdULGVBQUssWUFBTCxDQUFrQixLQUFLLEtBQUwsQ0FBbEIsQ0FIUztBQUlULGVBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsVUFBVSxDQUFWLEVBQWE7QUFDbEMsZ0JBQUksS0FBSyxNQUFMLENBQVksUUFBWixPQUEyQixJQUEzQixJQUFtQyxFQUFFLE9BQUYsS0FBYyxDQUFkLEVBQWlCO0FBQ3RELHFCQUFPLEtBQVAsQ0FEc0Q7YUFBeEQsTUFFTztBQUNMLGtCQUFJLENBQUMsS0FBSyxNQUFMLENBQVksUUFBWixFQUFELEVBQXlCO0FBQzNCLHVCQUFPLEtBQVAsQ0FEMkI7ZUFBN0IsTUFFTztBQUNMLHVCQUFPLElBQVAsQ0FESztlQUZQO2FBSEY7V0FEcUIsQ0FVckIsSUFWcUIsQ0FVaEIsSUFWZ0IsQ0FBdkIsQ0FKUztBQWVULGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixXQUFsQixDQUE4QixHQUE5QixDQUFrQyxXQUFsQyxDQUEzQixDQWZTO0FBZ0JULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUIsQ0FoQlM7QUFpQlQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixNQUE1QixDQWpCUztBQWtCVCxlQUFLLE9BQUwsQ0FBYSxXQUFiLENBQXlCLEtBQUssT0FBTCxDQUF6QixDQWxCUzs7QUFvQlQsZUFBSyxPQUFMLENBQWEsUUFBYixHQUF3QixZQUFLO0FBQzNCLGtCQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLE1BQUssT0FBTCxDQUFhLE9BQWIsQ0FBeEIsQ0FEMkI7V0FBTCxDQXBCZjs7QUF5QlQsZUFBSyxPQUFMLENBQWEsUUFBYixHQUF3QixTQUFTLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBakMsQ0F6QlM7O0FBNEJULGVBQUssT0FBTCxDQUFhLGdCQUFiLENBQThCLFdBQTlCLEVBQTJDLFVBQVUsQ0FBVixFQUFhO0FBQ3RELGlCQUFLLE9BQUwsQ0FBYSxLQUFiLEdBRHNEO1dBQWIsQ0FFekMsSUFGeUMsQ0FFcEMsSUFGb0MsQ0FBM0MsRUE1QlM7OztlQS9CQTtpRkFDVjs7O3NGQUNBIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
