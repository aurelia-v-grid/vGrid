'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, VGrid, _dec, _dec2, _class, vGridAttributesSelection;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
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
                _this.vGrid.vGridGenerator.rebindAllRowSlots();
              }
              if (_this.value === "row") {
                _this.vGrid.vGridSelection.select(_this.bindingContext.row, true);
                _this.vGrid.vGridGenerator.rebindRowNumber(_this.bindingContext.row);
              }
            } else {

              if (_this.value === "header") {
                _this.vGrid.vGridSelection.deSelectAll();
                _this.vGrid.vGridGenerator.rebindAllRowSlots();
              }

              if (_this.value === "row") {
                _this.vGrid.vGridSelection.deSelect(_this.bindingContext.row, true);
                _this.vGrid.vGridGenerator.rebindRowNumber(_this.bindingContext.row);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLXNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFLUSxZLHFCQUFBLE07QUFBUSxxQixxQkFBQSxlOztBQUNSLFcsVUFBQSxLOzs7MENBS0ssd0IsV0FGWixnQkFBZ0IsYUFBaEIsQyxVQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQixDO0FBS0MsMENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtBQUFBOztBQUMxQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGVBQUssS0FBTCxHQUFhLElBQWI7QUFDRDs7MkNBR0QsSSxpQkFBSyxjLEVBQWdCLGUsRUFBaUI7QUFDcEMsZUFBSyxjQUFMLEdBQXNCLGNBQXRCO0FBQ0EsZUFBSyxlQUFMLEdBQXVCLGVBQXZCO0FBQ0EsY0FBSSxLQUFLLE9BQVQsRUFBa0I7QUFDaEIsaUJBQUssUUFBTCxHQUFnQixLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFVBQTFCLENBQXFDLEtBQUssY0FBTCxDQUFvQixHQUF6RCxDQUFoQjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLEtBQUssUUFBNUI7QUFDRDtBQUNGLFM7OzJDQUdELFEsdUJBQVc7QUFBQTs7QUFFVCxlQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsZUFBSyxRQUFMLEdBQWdCLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsVUFBMUIsQ0FBcUMsS0FBSyxjQUFMLENBQW9CLEdBQXpELENBQWhCO0FBQ0EsZUFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixLQUFLLFFBQTVCOztBQUVBLGVBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsVUFBQyxDQUFELEVBQU87O0FBRTVCLGdCQUFJLFNBQVMsTUFBSyxPQUFMLENBQWEsT0FBYixLQUF5QixNQUF6QixJQUFtQyxNQUFLLE9BQUwsQ0FBYSxPQUFiLEtBQXlCLElBQTVELEdBQW1FLElBQW5FLEdBQTBFLEtBQXZGOztBQUVBLGdCQUFJLE1BQUosRUFBWTtBQUNWLGtCQUFJLE1BQUssS0FBTCxLQUFlLFFBQW5CLEVBQTZCO0FBQzNCLHNCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCO0FBQ0Esc0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsaUJBQTFCO0FBQ0Q7QUFDRCxrQkFBSSxNQUFLLEtBQUwsS0FBZSxLQUFuQixFQUEwQjtBQUN4QixzQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixNQUExQixDQUFpQyxNQUFLLGNBQUwsQ0FBb0IsR0FBckQsRUFBMEQsSUFBMUQ7QUFDQSxzQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixlQUExQixDQUEwQyxNQUFLLGNBQUwsQ0FBb0IsR0FBOUQ7QUFDRDtBQUNGLGFBVEQsTUFTTzs7QUFFTCxrQkFBSSxNQUFLLEtBQUwsS0FBZSxRQUFuQixFQUE2QjtBQUMzQixzQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixXQUExQjtBQUNBLHNCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGlCQUExQjtBQUNEOztBQUVELGtCQUFJLE1BQUssS0FBTCxLQUFlLEtBQW5CLEVBQTBCO0FBQ3hCLHNCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFFBQTFCLENBQW1DLE1BQUssY0FBTCxDQUFvQixHQUF2RCxFQUE0RCxJQUE1RDtBQUNBLHNCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGVBQTFCLENBQTBDLE1BQUssY0FBTCxDQUFvQixHQUE5RDtBQUNEO0FBQ0Y7QUFFRixXQTFCRDtBQTZCRCxTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
