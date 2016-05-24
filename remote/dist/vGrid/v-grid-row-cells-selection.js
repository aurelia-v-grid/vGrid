'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var inject, customElement, bindable, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridRowCellSelection;

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
    }],
    execute: function () {
      _export('VGridRowCellSelection', VGridRowCellSelection = (_dec = customElement('v-grid-selection'), _dec2 = inject(Element), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridRowCellSelection(element) {
          _classCallCheck(this, VGridRowCellSelection);

          _initDefineProp(this, 'value', _descriptor, this);

          _initDefineProp(this, 'customStyle', _descriptor2, this);

          this.element = element;
        }

        VGridRowCellSelection.prototype.valueChanged = function valueChanged(value, old) {
          if (value === undefined || value === null || value === "") {
            this.content.style.display = "none";
            this.content.checked = false;
          } else {
            this.content.style.display = "block";
            this.content.checked = this.vGrid.vGridSelection.isSelected(this.parent.getRow());
          }
          if (this.parent.getRow() > this.vGrid.vGridCollectionFiltered.length - 1) {
            this.content.style.display = "none";
            this.content.checked = false;
          }
        };

        VGridRowCellSelection.prototype.customStyleChanged = function customStyleChanged(value, old) {};

        VGridRowCellSelection.prototype.bind = function bind(parent) {
          this.parent = parent;
          this.vGrid = parent.vGrid;
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
            this.vGrid.vGridGenerator.fillDataInRows();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtc2VsZWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNUSxZLHFCQUFBLE07QUFBUSxtQixxQkFBQSxhO0FBQWUsYyxxQkFBQSxROzs7dUNBU2xCLHFCLFdBRlosY0FBYyxrQkFBZCxDLFVBQ0EsT0FBTyxPQUFQLEM7QUFNQyx1Q0FBWSxPQUFaLEVBQXFCO0FBQUE7O0FBQUE7O0FBQUE7O0FBQ25CLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDRDs7d0NBR0QsWSx5QkFBYSxLLEVBQU8sRyxFQUFLO0FBQ3ZCLGNBQUksVUFBVSxTQUFWLElBQXVCLFVBQVUsSUFBakMsSUFBeUMsVUFBVSxFQUF2RCxFQUEyRDtBQUN6RCxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixNQUE3QjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLEtBQXZCO0FBQ0QsV0FIRCxNQUdPO0FBQ0wsaUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsT0FBN0I7QUFDQSxpQkFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFVBQTFCLENBQXFDLEtBQUssTUFBTCxDQUFZLE1BQVosRUFBckMsQ0FBdkI7QUFDRDtBQUNELGNBQUksS0FBSyxNQUFMLENBQVksTUFBWixLQUF1QixLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxNQUFuQyxHQUE0QyxDQUF2RSxFQUEwRTtBQUN4RSxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixNQUE3QjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLEtBQXZCO0FBQ0Q7QUFFRixTOzt3Q0FFRCxrQiwrQkFBbUIsSyxFQUFPLEcsRUFBSyxDQUU5QixDOzt3Q0FHRCxJLGlCQUFLLE0sRUFBUTtBQUNYLGVBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxlQUFLLEtBQUwsR0FBYSxPQUFPLEtBQXBCO0FBRUQsUzs7d0NBR0QsUSx1QkFBVztBQUNULGVBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsQ0FBdEIsQ0FBZjtBQUNBLGVBQUssT0FBTCxDQUFhLElBQWIsR0FBb0IsVUFBcEI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLFVBQVUsQ0FBVixFQUFhO0FBQ2xDLGdCQUFJLEtBQUssT0FBTCxDQUFhLE9BQWpCLEVBQTBCO0FBQ3hCLG1CQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLE1BQTFCLENBQWlDLEtBQUssTUFBTCxDQUFZLE1BQVosRUFBakMsRUFBdUQsSUFBdkQ7QUFDRCxhQUZELE1BRU87QUFDTCxtQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixRQUExQixDQUFtQyxLQUFLLE1BQUwsQ0FBWSxNQUFaLEVBQW5DO0FBQ0Q7QUFDRCxpQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixjQUExQjtBQUNELFdBUHNCLENBT3JCLElBUHFCLENBT2hCLElBUGdCLENBQXZCO0FBUUEsZUFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFVBQTFCLENBQXFDLEtBQUssTUFBTCxDQUFZLE1BQVosRUFBckMsQ0FBdkI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsV0FBbEIsQ0FBOEIsR0FBOUIsQ0FBa0MsV0FBN0Q7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCO0FBQ0EsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixNQUE1QjtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsUUFBbkIsR0FBOEIsU0FBOUI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE9BQTdCO0FBQ0EsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixTQUE3QjtBQUNBLGVBQUssT0FBTCxDQUFhLFdBQWIsQ0FBeUIsS0FBSyxPQUE5QjtBQUNBLGVBQUssWUFBTCxDQUFrQixLQUFsQjs7QUFFQSxlQUFLLE9BQUwsQ0FBYSxRQUFiLEdBQXdCLFlBQUssQ0FFNUIsQ0FGRDs7QUFLQSxlQUFLLE9BQUwsQ0FBYSxRQUFiLEdBQXdCLFNBQVMsS0FBSyxNQUFMLENBQVksUUFBckIsQ0FBeEI7O0FBR0EsZUFBSyxPQUFMLENBQWEsZ0JBQWIsQ0FBOEIsV0FBOUIsRUFBMkMsVUFBVSxDQUFWLEVBQWE7QUFDdEQsaUJBQUssT0FBTCxDQUFhLEtBQWI7QUFDRCxXQUYwQyxDQUV6QyxJQUZ5QyxDQUVwQyxJQUZvQyxDQUEzQztBQUlELFM7OztpRkFyRUEsUTs7O3NGQUNBLFEiLCJmaWxlIjoidkdyaWQvdi1ncmlkLXJvdy1jZWxscy1zZWxlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
