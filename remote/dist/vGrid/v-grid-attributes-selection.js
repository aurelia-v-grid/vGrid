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

          this.created = true;
          this.selected = this.vGrid.vGridSelection.isSelected(this.bindingContext.row);
          this.element.checked = this.selected;

          this.element.onclick = function (e) {

            var status = this.element.checked === "true" || this.element.checked === true ? true : false;

            if (status) {
              if (this.value === "header") {
                this.vGrid.vGridSelection.selectAll();
                this.vGrid.vGridGenerator.fillDataInRows();
              }
              if (this.value === "row") {
                this.vGrid.vGridSelection.select(this.bindingContext.row, true);
                this.vGrid.vGridGenerator.fillDataIntoRow(this.bindingContext.row);
              }
            } else {

              if (this.value === "header") {
                this.vGrid.vGridSelection.deSelectAll();
                this.vGrid.vGridGenerator.fillDataInRows();
              }

              if (this.value === "row") {
                this.vGrid.vGridSelection.deSelect(this.bindingContext.row, true);
                this.vGrid.vGridGenerator.fillDataIntoRow(this.bindingContext.row);
              }
            }
          }.bind(this);
        };

        return vGridAttributesSelection;
      }()) || _class) || _class));

      _export('vGridAttributesSelection', vGridAttributesSelection);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLXNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFLUSxZLHFCQUFBLE07QUFBUSxxQixxQkFBQSxlO0FBQWlCLGMscUJBQUEsUTs7QUFJekIsVyxVQUFBLEs7OzswQ0FLSyx3QixXQUZaLGdCQUFnQixhQUFoQixDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEM7QUFHQywwQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO0FBQUE7O0FBQzFCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsZUFBSyxLQUFMLEdBQWEsSUFBYjtBQUNEOzsyQ0FHRCxJLGlCQUFLLGMsRUFBZ0IsZSxFQUFpQjtBQUNwQyxlQUFLLGNBQUwsR0FBc0IsY0FBdEI7QUFDQSxlQUFLLGVBQUwsR0FBdUIsZUFBdkI7QUFDQSxjQUFJLEtBQUssT0FBVCxFQUFrQjtBQUNoQixpQkFBSyxRQUFMLEdBQWdCLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsVUFBMUIsQ0FBcUMsS0FBSyxjQUFMLENBQW9CLEdBQXpELENBQWhCO0FBQ0EsaUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBSyxRQUE1QjtBQUNEO0FBRUYsUzs7MkNBR0QsUSx1QkFBVzs7QUFFVCxlQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsZUFBSyxRQUFMLEdBQWdCLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsVUFBMUIsQ0FBcUMsS0FBSyxjQUFMLENBQW9CLEdBQXpELENBQWhCO0FBQ0EsZUFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixLQUFLLFFBQTVCOztBQUVBLGVBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsVUFBVSxDQUFWLEVBQWE7O0FBRWxDLGdCQUFJLFNBQVMsS0FBSyxPQUFMLENBQWEsT0FBYixLQUF5QixNQUF6QixJQUFtQyxLQUFLLE9BQUwsQ0FBYSxPQUFiLEtBQXlCLElBQTVELEdBQW1FLElBQW5FLEdBQTBFLEtBQXZGOztBQUVBLGdCQUFJLE1BQUosRUFBWTtBQUNWLGtCQUFJLEtBQUssS0FBTCxLQUFlLFFBQW5CLEVBQTZCO0FBQzNCLHFCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCO0FBQ0EscUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsY0FBMUI7QUFDRDtBQUNELGtCQUFJLEtBQUssS0FBTCxLQUFlLEtBQW5CLEVBQTBCO0FBQ3hCLHFCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLE1BQTFCLENBQWlDLEtBQUssY0FBTCxDQUFvQixHQUFyRCxFQUEwRCxJQUExRDtBQUNBLHFCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGVBQTFCLENBQTBDLEtBQUssY0FBTCxDQUFvQixHQUE5RDtBQUNEO0FBQ0YsYUFURCxNQVNPOztBQUVMLGtCQUFJLEtBQUssS0FBTCxLQUFlLFFBQW5CLEVBQTZCO0FBQzNCLHFCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFdBQTFCO0FBQ0EscUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsY0FBMUI7QUFDRDs7QUFFRCxrQkFBSSxLQUFLLEtBQUwsS0FBZSxLQUFuQixFQUEwQjtBQUN4QixxQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixRQUExQixDQUFtQyxLQUFLLGNBQUwsQ0FBb0IsR0FBdkQsRUFBNEQsSUFBNUQ7QUFDQSxxQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixlQUExQixDQUEwQyxLQUFLLGNBQUwsQ0FBb0IsR0FBOUQ7QUFDRDtBQUNGO0FBRUYsV0ExQnNCLENBMEJyQixJQTFCcUIsQ0EwQmhCLElBMUJnQixDQUF2QjtBQTZCRCxTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
