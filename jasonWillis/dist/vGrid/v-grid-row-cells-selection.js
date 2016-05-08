'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, customElement, bindable, VGrid, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridRowCellSelection;

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
      _export('VGridRowCellSelection', VGridRowCellSelection = (_dec = customElement('v-grid-selection'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridRowCellSelection(element, vGrid) {
          _classCallCheck(this, VGridRowCellSelection);

          _initDefineProp(this, 'value', _descriptor, this);

          _initDefineProp(this, 'customStyle', _descriptor2, this);

          this.element = element;
          this.vGrid = vGrid;
        }

        VGridRowCellSelection.prototype.valueChanged = function valueChanged(value, old) {
          if (value === undefined || value === null || value === "") {
            this.content.style.display = "none";
            this.content.checked = false;
          } else {
            this.content.style.display = "block";
            this.content.checked = this.vGrid.vGridSelection.isSelected(this.parent.getRow());
          }
        };

        VGridRowCellSelection.prototype.customStyleChanged = function customStyleChanged(value, old) {
          console.log("wow");
        };

        VGridRowCellSelection.prototype.bind = function bind(parent) {
          this.parent = parent;
        };

        VGridRowCellSelection.prototype.attached = function attached() {
          this.content = this.element.children[0];
          this.content.type = "checkbox";
          this.content.onclick = function (e) {
            if (this.content.checked) {
              this.vGrid.vGridSelection.select(this.parent.getRow(), true);
            } else {
              this.vGrid.vGridSelection.deSelect(this.parent.getRow());
            }
            this.vGrid.vGridGenerator.updateSelectionOnAllRows();
          }.bind(this);
          this.content.checked = this.vGrid.vGridSelection.isSelected(this.parent.getRow());
          this.content.classList.add(this.parent.vGrid.vGridConfig.css.cellContent);
          this.content.style.height = "100%";
          this.content.style.margin = "auto";
          this.content.style.position = "initial";
          this.content.style.display = "block";
          this.content.style.opacity = "initial";
          this.element.appendChild(this.content);
          this.valueChanged(false);

          this.content.onchange = function () {};

          this.content.columnNo = parseInt(this.parent.columnNo);

          this.content.addEventListener("cellFocus", function (e) {
            this.content.focus();
          }.bind(this));
        };

        return VGridRowCellSelection;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'customStyle', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('VGridRowCellSelection', VGridRowCellSelection);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtc2VsZWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU1E7QUFBUTtBQUFlOztBQUN2Qjs7O3VDQVVLLGdDQUZaLGNBQWMsa0JBQWQsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEI7QUFNQyxpQkFMVyxxQkFLWCxDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7Z0NBTGpCLHVCQUtpQjs7Ozs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtTQUE1Qjs7QUFMVyx3Q0FXWCxxQ0FBYSxPQUFPLEtBQUs7QUFDdkIsY0FBSSxVQUFVLFNBQVYsSUFBdUIsVUFBVSxJQUFWLElBQWtCLFVBQVUsRUFBVixFQUFjO0FBQ3pELGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE1BQTdCLENBRHlEO0FBRXpELGlCQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLEtBQXZCLENBRnlEO1dBQTNELE1BR087QUFDTCxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixPQUE3QixDQURLO0FBRUwsaUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixVQUExQixDQUFxQyxLQUFLLE1BQUwsQ0FBWSxNQUFaLEVBQXJDLENBQXZCLENBRks7V0FIUDs7O0FBWlMsd0NBcUJYLGlEQUFtQixPQUFPLEtBQUs7QUFDN0Isa0JBQVEsR0FBUixDQUFZLEtBQVosRUFENkI7OztBQXJCcEIsd0NBMEJYLHFCQUFLLFFBQVE7QUFDWCxlQUFLLE1BQUwsR0FBYyxNQUFkLENBRFc7OztBQTFCRix3Q0FnQ1gsK0JBQVc7QUFDVCxlQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLENBQXRCLENBQWYsQ0FEUztBQUVULGVBQUssT0FBTCxDQUFhLElBQWIsR0FBb0IsVUFBcEIsQ0FGUztBQUdULGVBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsVUFBVSxDQUFWLEVBQWE7QUFDbEMsZ0JBQUcsS0FBSyxPQUFMLENBQWEsT0FBYixFQUFxQjtBQUN0QixtQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixNQUExQixDQUFpQyxLQUFLLE1BQUwsQ0FBWSxNQUFaLEVBQWpDLEVBQXVELElBQXZELEVBRHNCO2FBQXhCLE1BRU87QUFDTCxtQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixRQUExQixDQUFtQyxLQUFLLE1BQUwsQ0FBWSxNQUFaLEVBQW5DLEVBREs7YUFGUDtBQUtBLGlCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLHdCQUExQixHQU5rQztXQUFiLENBT3JCLElBUHFCLENBT2hCLElBUGdCLENBQXZCLENBSFM7QUFXVCxlQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsVUFBMUIsQ0FBcUMsS0FBSyxNQUFMLENBQVksTUFBWixFQUFyQyxDQUF2QixDQVhTO0FBWVQsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLFdBQWxCLENBQThCLEdBQTlCLENBQWtDLFdBQWxDLENBQTNCLENBWlM7QUFhVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCLENBYlM7QUFjVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCLENBZFM7QUFlVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFFBQW5CLEdBQThCLFNBQTlCLENBZlM7QUFnQlQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixPQUE3QixDQWhCUztBQWlCVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLFNBQTdCLENBakJTO0FBa0JULGVBQUssT0FBTCxDQUFhLFdBQWIsQ0FBeUIsS0FBSyxPQUFMLENBQXpCLENBbEJTO0FBbUJULGVBQUssWUFBTCxDQUFrQixLQUFsQixFQW5CUzs7QUFxQlQsZUFBSyxPQUFMLENBQWEsUUFBYixHQUF3QixZQUFLLEVBQUwsQ0FyQmY7O0FBMEJULGVBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsU0FBUyxLQUFLLE1BQUwsQ0FBWSxRQUFaLENBQWpDLENBMUJTOztBQTZCVCxlQUFLLE9BQUwsQ0FBYSxnQkFBYixDQUE4QixXQUE5QixFQUEyQyxVQUFVLENBQVYsRUFBYTtBQUN0RCxpQkFBSyxPQUFMLENBQWEsS0FBYixHQURzRDtXQUFiLENBRXpDLElBRnlDLENBRXBDLElBRm9DLENBQTNDLEVBN0JTOzs7ZUFoQ0E7aUZBQ1Y7OztzRkFDQSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtcm93LWNlbGxzLXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
