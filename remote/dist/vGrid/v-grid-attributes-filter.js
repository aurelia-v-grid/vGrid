'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, Optional, VGrid, _dec, _dec2, _class, vGridAttributesFilter;

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
      _export('vGridAttributesFilter', vGridAttributesFilter = (_dec = customAttribute('v-filter'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = function () {
        function vGridAttributesFilter(element, vGrid) {
          _classCallCheck(this, vGridAttributesFilter);

          this.vGrid = vGrid;
          this.element = element;
        }

        vGridAttributesFilter.prototype.bind = function bind(bindingContext, overrideContext) {
          this.bindingContext = bindingContext;
          this.overrideContext = overrideContext;
          var values = this.value.split("|");
          this.attribute = values[0];
          this.filterOn = values[1];
          this.filterOperator = values[2];
          this.valueFormater = values[3] = "null" ? null : values[3];
          this.type = this.element.type;
          this.state = null;
        };

        vGridAttributesFilter.prototype.getValue = function getValue() {
          return this.element.value;
        };

        vGridAttributesFilter.prototype.updateFilter = function updateFilter(curFilter) {
          var _this = this;

          var filterIndex = null;

          curFilter.forEach(function (filter, index) {
            if (filter.attribute === _this.attribute) {
              filterIndex = index;
            }
          });

          if (filterIndex !== null) {
            if (this.getValue() === "") {
              curFilter.splice(filterIndex, 1);
            } else {
              curFilter[filterIndex].value = this.getValue();
            }
          } else {
            if (this.getValue() !== "") {
              curFilter.push({
                attribute: this.attribute,
                operator: this.filterOperator,
                value: this.getValue()
              });
            }
          }
        };

        vGridAttributesFilter.prototype.attached = function attached() {
          var _this2 = this;

          if (this.type !== "checkbox") {
            this.element.onkeyup = function (e) {
              if (e.keyCode === 13) {
                var curFilter = _this2.vGrid.vGridFilter.lastFilter;
                _this2.updateFilter(curFilter);
                _this2.vGrid.vGridConfig.onFilterRun(curFilter);
              } else {
                var curFilter = _this2.vGrid.vGridFilter.lastFilter;
                _this2.updateFilter(curFilter);
                if (_this2.filterOn === "keydown") {
                  _this2.vGrid.vGridConfig.onFilterRun(curFilter);
                }
              }
            };
          } else {
            this.element.onclick = function (e) {};
          }
        };

        return vGridAttributesFilter;
      }()) || _class) || _class));

      _export('vGridAttributesFilter', vGridAttributesFilter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFLUSxZLHFCQUFBLE07QUFBUSxxQixxQkFBQSxlO0FBQWlCLGMscUJBQUEsUTs7QUFJekIsVyxVQUFBLEs7Ozt1Q0FNSyxxQixXQUZaLGdCQUFnQixVQUFoQixDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEM7QUFHQyx1Q0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO0FBQUE7O0FBQzFCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0Q7O3dDQUdELEksaUJBQUssYyxFQUFnQixlLEVBQWlCO0FBQ3BDLGVBQUssY0FBTCxHQUFzQixjQUF0QjtBQUNBLGVBQUssZUFBTCxHQUF1QixlQUF2QjtBQUNBLGNBQUksU0FBUyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEdBQWpCLENBQWI7QUFDQSxlQUFLLFNBQUwsR0FBaUIsT0FBTyxDQUFQLENBQWpCO0FBQ0EsZUFBSyxRQUFMLEdBQWdCLE9BQU8sQ0FBUCxDQUFoQjtBQUNBLGVBQUssY0FBTCxHQUFzQixPQUFPLENBQVAsQ0FBdEI7QUFDQSxlQUFLLGFBQUwsR0FBcUIsT0FBTyxDQUFQLElBQVksU0FBUyxJQUFULEdBQWdCLE9BQU8sQ0FBUCxDQUFqRDtBQUNBLGVBQUssSUFBTCxHQUFZLEtBQUssT0FBTCxDQUFhLElBQXpCO0FBQ0EsZUFBSyxLQUFMLEdBQWEsSUFBYjtBQUVELFM7O3dDQUdELFEsdUJBQVc7QUFHVCxpQkFBTyxLQUFLLE9BQUwsQ0FBYSxLQUFwQjtBQUNELFM7O3dDQUdELFkseUJBQWEsUyxFQUFXO0FBQUE7O0FBQ3RCLGNBQUksY0FBYyxJQUFsQjs7QUFHQSxvQkFBVSxPQUFWLENBQWtCLFVBQUMsTUFBRCxFQUFTLEtBQVQsRUFBa0I7QUFDbEMsZ0JBQUksT0FBTyxTQUFQLEtBQXFCLE1BQUssU0FBOUIsRUFBeUM7QUFDdkMsNEJBQWMsS0FBZDtBQUNEO0FBQ0YsV0FKRDs7QUFNQSxjQUFJLGdCQUFnQixJQUFwQixFQUEwQjtBQUd4QixnQkFBSSxLQUFLLFFBQUwsT0FBb0IsRUFBeEIsRUFBNEI7QUFDMUIsd0JBQVUsTUFBVixDQUFpQixXQUFqQixFQUE4QixDQUE5QjtBQUNELGFBRkQsTUFFTztBQUNMLHdCQUFVLFdBQVYsRUFBdUIsS0FBdkIsR0FBK0IsS0FBSyxRQUFMLEVBQS9CO0FBQ0Q7QUFFRixXQVRELE1BU087QUFHTCxnQkFBSSxLQUFLLFFBQUwsT0FBb0IsRUFBeEIsRUFBNEI7QUFDMUIsd0JBQVUsSUFBVixDQUFlO0FBQ2IsMkJBQVcsS0FBSyxTQURIO0FBRWIsMEJBQVUsS0FBSyxjQUZGO0FBR2IsdUJBQU8sS0FBSyxRQUFMO0FBSE0sZUFBZjtBQUtEO0FBRUY7QUFDRixTOzt3Q0FHRCxRLHVCQUFXO0FBQUE7O0FBRVQsY0FBSSxLQUFLLElBQUwsS0FBYyxVQUFsQixFQUE4QjtBQUM1QixpQkFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixVQUFDLENBQUQsRUFBTztBQUM1QixrQkFBSSxFQUFFLE9BQUYsS0FBYyxFQUFsQixFQUFzQjtBQUdwQixvQkFBSSxZQUFZLE9BQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsVUFBdkM7QUFDQSx1QkFBSyxZQUFMLENBQWtCLFNBQWxCO0FBQ0EsdUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsV0FBdkIsQ0FBbUMsU0FBbkM7QUFFRCxlQVBELE1BT087QUFHTCxvQkFBSSxZQUFZLE9BQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsVUFBdkM7QUFDQSx1QkFBSyxZQUFMLENBQWtCLFNBQWxCO0FBQ0Esb0JBQUksT0FBSyxRQUFMLEtBQWtCLFNBQXRCLEVBQWlDO0FBQy9CLHlCQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFdBQXZCLENBQW1DLFNBQW5DO0FBQ0Q7QUFHRjtBQUNGLGFBbkJEO0FBb0JELFdBckJELE1BcUJPO0FBQ0wsaUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsVUFBQyxDQUFELEVBQU8sQ0FHN0IsQ0FIRDtBQUtEO0FBR0YsUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtYXR0cmlidXRlcy1maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
