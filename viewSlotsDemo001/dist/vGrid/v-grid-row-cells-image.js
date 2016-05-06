'use strict';

System.register(['aurelia-framework', './v-grid', './v-grid-row-col'], function (_export, _context) {
  var inject, noView, customElement, processContent, bindable, VGrid, VGridCellContainer, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridRowCellImage;

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
      _export('VGridRowCellImage', VGridRowCellImage = (_dec = customElement('v-grid-image'), _dec2 = inject(Element, VGrid, VGridCellContainer), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridRowCellImage(element, vGrid, VGridCellContainer) {
          _classCallCheck(this, VGridRowCellImage);

          _initDefineProp(this, 'value', _descriptor, this);

          _initDefineProp(this, 'customStyle', _descriptor2, this);

          this.element = element;
          this.vGrid = vGrid;
          this.vGridCol = VGridCellContainer;
        }

        VGridRowCellImage.prototype.valueChanged = function valueChanged(value, old) {
          if (value === undefined) {
            this.content.style.display = "none";
            this.content.src = "";
          } else {
            this.content.style.display = "block";
            this.content.src = value;
          }
        };

        VGridRowCellImage.prototype.customStyleChanged = function customStyleChanged(value, old) {
          console.log("wow");
        };

        VGridRowCellImage.prototype.bind = function bind(parent) {
          this.parent = parent;
        };

        VGridRowCellImage.prototype.attached = function attached() {
          this.content = this.element.children[0];
          this.content.classList.add(this.parent.vGrid.vGridConfig.css.cellContent);
          this.valueChanged(this.value);
          this.content.style.margin = "auto";
          this.content.style.display = "none";
          this.element.appendChild(this.content);

          this.content.columnNo = parseInt(this.parent.columnNo);

          this.content.addEventListener("cellFocus", function (e) {
            this.content.focus();
          }.bind(this));
        };

        return VGridRowCellImage;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'customStyle', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('VGridRowCellImage', VGridRowCellImage);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtaW1hZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTUTtBQUFRO0FBQVE7QUFBZTtBQUFnQjs7QUFDL0M7O0FBQ0E7OzttQ0FVSyw0QkFGWixjQUFjLGNBQWQsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsa0JBQXZCO0FBTUMsaUJBTFcsaUJBS1gsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCLGtCQUE1QixFQUFnRDtnQ0FMckMsbUJBS3FDOzs7Ozs7QUFDOUMsZUFBSyxPQUFMLEdBQWUsT0FBZixDQUQ4QztBQUU5QyxlQUFLLEtBQUwsR0FBYSxLQUFiLENBRjhDO0FBRzlDLGVBQUssUUFBTCxHQUFnQixrQkFBaEIsQ0FIOEM7U0FBaEQ7O0FBTFcsb0NBWVgscUNBQWEsT0FBTyxLQUFLO0FBQ3ZCLGNBQUksVUFBVSxTQUFWLEVBQXFCO0FBQ3ZCLGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE1BQTdCLENBRHVCO0FBRXZCLGlCQUFLLE9BQUwsQ0FBYSxHQUFiLEdBQW1CLEVBQW5CLENBRnVCO1dBQXpCLE1BR087QUFDTCxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixPQUE3QixDQURLO0FBRUwsaUJBQUssT0FBTCxDQUFhLEdBQWIsR0FBbUIsS0FBbkIsQ0FGSztXQUhQOzs7QUFiUyxvQ0FzQlgsaURBQW1CLE9BQU8sS0FBSztBQUM3QixrQkFBUSxHQUFSLENBQVksS0FBWixFQUQ2Qjs7O0FBdEJwQixvQ0EyQlgscUJBQUssUUFBUTtBQUNYLGVBQUssTUFBTCxHQUFjLE1BQWQsQ0FEVzs7O0FBM0JGLG9DQWdDWCwrQkFBVztBQUNULGVBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsQ0FBdEIsQ0FBZixDQURTO0FBRVQsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLFdBQWxCLENBQThCLEdBQTlCLENBQWtDLFdBQWxDLENBQTNCLENBRlM7QUFHVCxlQUFLLFlBQUwsQ0FBa0IsS0FBSyxLQUFMLENBQWxCLENBSFM7QUFJVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCLENBSlM7QUFLVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE1BQTdCLENBTFM7QUFNVCxlQUFLLE9BQUwsQ0FBYSxXQUFiLENBQXlCLEtBQUssT0FBTCxDQUF6QixDQU5TOztBQVNULGVBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsU0FBUyxLQUFLLE1BQUwsQ0FBWSxRQUFaLENBQWpDLENBVFM7O0FBWVQsZUFBSyxPQUFMLENBQWEsZ0JBQWIsQ0FBOEIsV0FBOUIsRUFBMkMsVUFBVSxDQUFWLEVBQWE7QUFDdEQsaUJBQUssT0FBTCxDQUFhLEtBQWIsR0FEc0Q7V0FBYixDQUV6QyxJQUZ5QyxDQUVwQyxJQUZvQyxDQUEzQyxFQVpTOzs7ZUFoQ0E7aUZBQ1Y7OztzRkFDQSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtcm93LWNlbGxzLWltYWdlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
