'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, Optional, VGrid, _dec, _dec2, _class, vGridAttributesSelection;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
      Optional = _aureliaFramework.Optional;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('vGridAttributesSelection', vGridAttributesSelection = (_dec = customAttribute('v-selection'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = function () {
        function vGridAttributesSelection(element, vGrid) {
          _classCallCheck(this, vGridAttributesSelection);

          this.vGrid = vGrid;
          this.element = element;
          this.false = true;
        }

        vGridAttributesSelection.prototype.bind = function bind(bindingContext, overrideContext) {
          this.bindingContext = bindingContext;
          this.overrideContext = overrideContext;
          if (this.created) {
            this.selected = this.vGrid.vGridSelection.isSelected(this.bindingContext.row);
            this.element.checked = this.selected;
          }
        };

        vGridAttributesSelection.prototype.attached = function attached() {
          var _this = this;

          this.created = true;
          this.selected = this.vGrid.vGridSelection.isSelected(this.bindingContext.row);
          this.element.checked = this.selected;

          this.element.onclick = function (e) {

            var status = _this.element.checked === "true" || _this.element.checked === true ? true : false;

            if (status) {
              if (_this.value === "header") {
                _this.vGrid.vGridSelection.selectAll();
                _this.vGrid.vGridGenerator.fillDataInRows();
              }
              if (_this.value === "row") {
                _this.vGrid.vGridSelection.select(_this.bindingContext.row, true);
                _this.vGrid.vGridGenerator.fillDataIntoRow(_this.bindingContext.row);
              }
            } else {

              if (_this.value === "header") {
                _this.vGrid.vGridSelection.deSelectAll();
                _this.vGrid.vGridGenerator.fillDataInRows();
              }

              if (_this.value === "row") {
                _this.vGrid.vGridSelection.deSelect(_this.bindingContext.row, true);
                _this.vGrid.vGridGenerator.fillDataIntoRow(_this.bindingContext.row);
              }
            }
          };
        };

        return vGridAttributesSelection;
      }()) || _class) || _class));

      _export('vGridAttributesSelection', vGridAttributesSelection);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLXNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFLUSxZLHFCQUFBLE07QUFBUSxxQixxQkFBQSxlO0FBQWlCLGMscUJBQUEsUTs7QUFDekIsVyxVQUFBLEs7OzswQ0FLSyx3QixXQUZaLGdCQUFnQixhQUFoQixDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEM7QUFLQywwQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO0FBQUE7O0FBQzFCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsZUFBSyxLQUFMLEdBQWEsSUFBYjtBQUNEOzsyQ0FHRCxJLGlCQUFLLGMsRUFBZ0IsZSxFQUFpQjtBQUNwQyxlQUFLLGNBQUwsR0FBc0IsY0FBdEI7QUFDQSxlQUFLLGVBQUwsR0FBdUIsZUFBdkI7QUFDQSxjQUFJLEtBQUssT0FBVCxFQUFrQjtBQUNoQixpQkFBSyxRQUFMLEdBQWdCLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsVUFBMUIsQ0FBcUMsS0FBSyxjQUFMLENBQW9CLEdBQXpELENBQWhCO0FBQ0EsaUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBSyxRQUE1QjtBQUNEO0FBQ0YsUzs7MkNBR0QsUSx1QkFBVztBQUFBOztBQUVULGVBQUssT0FBTCxHQUFlLElBQWY7QUFDQSxlQUFLLFFBQUwsR0FBZ0IsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixVQUExQixDQUFxQyxLQUFLLGNBQUwsQ0FBb0IsR0FBekQsQ0FBaEI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLEtBQUssUUFBNUI7O0FBRUEsZUFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixVQUFDLENBQUQsRUFBTzs7QUFFNUIsZ0JBQUksU0FBUyxNQUFLLE9BQUwsQ0FBYSxPQUFiLEtBQXlCLE1BQXpCLElBQW1DLE1BQUssT0FBTCxDQUFhLE9BQWIsS0FBeUIsSUFBNUQsR0FBbUUsSUFBbkUsR0FBMEUsS0FBdkY7O0FBRUEsZ0JBQUksTUFBSixFQUFZO0FBQ1Ysa0JBQUksTUFBSyxLQUFMLEtBQWUsUUFBbkIsRUFBNkI7QUFDM0Isc0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUI7QUFDQSxzQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixjQUExQjtBQUNEO0FBQ0Qsa0JBQUksTUFBSyxLQUFMLEtBQWUsS0FBbkIsRUFBMEI7QUFDeEIsc0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsTUFBMUIsQ0FBaUMsTUFBSyxjQUFMLENBQW9CLEdBQXJELEVBQTBELElBQTFEO0FBQ0Esc0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsZUFBMUIsQ0FBMEMsTUFBSyxjQUFMLENBQW9CLEdBQTlEO0FBQ0Q7QUFDRixhQVRELE1BU087O0FBRUwsa0JBQUksTUFBSyxLQUFMLEtBQWUsUUFBbkIsRUFBNkI7QUFDM0Isc0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsV0FBMUI7QUFDQSxzQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixjQUExQjtBQUNEOztBQUVELGtCQUFJLE1BQUssS0FBTCxLQUFlLEtBQW5CLEVBQTBCO0FBQ3hCLHNCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFFBQTFCLENBQW1DLE1BQUssY0FBTCxDQUFvQixHQUF2RCxFQUE0RCxJQUE1RDtBQUNBLHNCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGVBQTFCLENBQTBDLE1BQUssY0FBTCxDQUFvQixHQUE5RDtBQUNEO0FBQ0Y7QUFFRixXQTFCRDtBQTZCRCxTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
