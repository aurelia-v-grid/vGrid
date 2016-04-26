'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, noView, customElement, processContent, bindable, VGrid, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, VGridCell;

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
    }],
    execute: function () {
      _export('VGridCell', VGridCell = (_dec = customElement('v-grid-cell'), _dec2 = processContent(false), _dec3 = inject(Element, VGrid), noView(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
        function VGridCell(element, vGrid) {
          _classCallCheck(this, VGridCell);

          _initDefineProp(this, 'colNo', _descriptor, this);

          this.element = element;
          this.vGrid = vGrid;
        }

        VGridCell.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          if (this.bindingContext && this.cellContent) {
            this.setValue(this.bindingContext[this.vGrid.vGridConfig.attributeArray[this.colNo]]);
          }
        };

        VGridCell.prototype.created = function created() {};

        VGridCell.prototype.setValue = function setValue(value) {
          if (this.element.classList.contains(this.vGrid.vGridConfig.css.editCell)) {
            this.element.classList.remove(this.vGrid.vGridConfig.css.editCell);
          }

          if (this.element.classList.contains(this.vGrid.vGridConfig.css.editCellWrite)) {
            this.element.classList.remove(this.vGrid.vGridConfig.css.editCellWrite);
          }

          if (this.element.classList.contains(this.vGrid.vGridConfig.css.editCellFocus)) {
            this.element.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
          }

          if (this.vGrid.vGridConfig.colTypeArray[this.colNo] === "image") {
            if (value !== undefined && value !== null) {
              this.cellContent.src = value;
            }
          } else {
            if (this.vGrid.vGridConfig.colTypeArray[this.colNo] === "checkbox") {
              if (value === undefined) {
                this.cellContent.style.display = "none";
              } else {
                if (this.cellContent.style.display === "none") {
                  this.cellContent.style.display = "block";
                }
                this.cellContent.checked = value === "true" || value === true ? true : false;
              }
            } else {
              this.cellContent.value = value || "";
            }
          }
        };

        VGridCell.prototype.attached = function attached() {
          if (this.vGrid.vGridConfig.colTypeArray[this.colNo] === "image") {
            this.cellContent = document.createElement("img");
          } else {
            this.cellContent = document.createElement("input");
          }
          if (this.vGrid.vGridConfig.colTypeArray[this.colNo] === "checkbox") {
            this.cellContent.type = "checkbox";
            this.cellContent.onclick = function (e) {
              if (!this.vGrid.vGrid.vGridCellEdit.editMode) {
                return false;
              }
            }.bind(this);
          }

          this.cellContent.classList.add(this.vGrid.vGridConfig.css.cellContent);
          this.cellContent.setAttribute(this.vGrid.vGridConfig.atts.dataAttribute, this.vGrid.vGridConfig.attributeArray[this.colNo]);
          this.cellContent.setAttribute("style", this.vGrid.vGridConfig.colStyleArray[this.colNo]);
          this.cellContent.style.opacity = 1;
          this.cellContent.style.border = 0;
          this.cellContent.style.transition = "0ms";
          this.cellContent.setAttribute("tabindex", "0");

          if (this.bindingContext) {
            this.setValue(this.bindingContext[this.vGrid.vGridConfig.attributeArray[this.colNo]]);
          }
          this.element.appendChild(this.cellContent);
        };

        return VGridCell;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'colNo', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('VGridCell', VGridCell);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVE7QUFBUTtBQUFRO0FBQWU7QUFBZ0I7O0FBQy9DOzs7MkJBVUssb0JBSFosY0FBYyxhQUFkLFdBQ0EsZUFBZSxLQUFmLFdBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEdBSEE7QUFRQyxpQkFKVyxTQUlYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtnQ0FKakIsV0FJaUI7Ozs7QUFDMUIsZUFBSyxPQUFMLEdBQWUsT0FBZixDQUQwQjtBQUUxQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRjBCO1NBQTVCOztBQUpXLDRCQVVYLHFCQUFLLGdCQUFnQjtBQUNuQixlQUFLLGNBQUwsR0FBc0IsY0FBdEIsQ0FEbUI7QUFFbkIsY0FBSSxLQUFLLGNBQUwsSUFBdUIsS0FBSyxXQUFMLEVBQWtCO0FBQzNDLGlCQUFLLFFBQUwsQ0FBYyxLQUFLLGNBQUwsQ0FBb0IsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixjQUF2QixDQUFzQyxLQUFLLEtBQUwsQ0FBMUQsQ0FBZCxFQUQyQztXQUE3Qzs7O0FBWlMsNEJBa0JYLDZCQUFVOztBQWxCQyw0QkF1QlgsNkJBQVMsT0FBTztBQUNkLGNBQUksS0FBSyxPQUFMLENBQWEsU0FBYixDQUF1QixRQUF2QixDQUFnQyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLFFBQTNCLENBQXBDLEVBQTBFO0FBQ3hFLGlCQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLE1BQXZCLENBQThCLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsUUFBM0IsQ0FBOUIsQ0FEd0U7V0FBMUU7O0FBSUEsY0FBSSxLQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLFFBQXZCLENBQWdDLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FB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S0FBTCxDQUEvRyxFQWpCUztBQWtCVCxlQUFLLFdBQUwsQ0FBaUIsWUFBakIsQ0FBOEIsT0FBOUIsRUFBdUMsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixhQUF2QixDQUFxQyxLQUFLLEtBQUwsQ0FBNUUsRUFsQlM7QUFtQlQsZUFBSyxXQUFMLENBQWlCLEtBQWpCLENBQXVCLE9BQXZCLEdBQWlDLENBQWpDLENBbkJTO0FBb0JULGVBQUssV0FBTCxDQUFpQixLQUFqQixDQUF1QixNQUF2QixHQUFnQyxDQUFoQyxDQXBCUztBQXFCVCxlQUFLLFdBQUwsQ0FBaUIsS0FBakIsQ0FBdUIsVUFBdkIsR0FBb0MsS0FBcEMsQ0FyQlM7QUFzQlQsZUFBSyxXQUFMLENBQWlCLFlBQWpCLENBQThCLFVBQTlCLEVBQTBDLEdBQTFDLEVBdEJTOztBQXdCVCxjQUFJLEtBQUssY0FBTCxFQUFxQjtBQUN2QixpQkFBSyxRQUFMLENBQWMsS0FBSyxjQUFMLENBQW9CLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsY0FBdkIsQ0FBc0MsS0FBSyxLQUFMLENBQTFELENBQWQsRUFEdUI7V0FBekI7QUFHQSxlQUFLLE9BQUwsQ0FBYSxXQUFiLENBQXlCLEtBQUssV0FBTCxDQUF6QixDQTNCUzs7O2VBNURBO2lGQUNWIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jZWxsLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
