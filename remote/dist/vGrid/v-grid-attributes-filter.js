'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, Optional, VGrid, _createClass, _dec, _dec2, _class, vGridAttributesFilter;

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
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

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
          this.filterOn = values[1] || "enter";
          this.filterOperator = values[2] || "=";
          this.valueFormater = values[3] ? this.valueConverters(values[3]) : null;
          this.type = this.element.type;
          this.state = 0;
        };

        vGridAttributesFilter.prototype.getValue = function getValue() {
          if (this.type !== "checkbox") {
            return this.valueFormater ? this.valueFormater.fromView(this.element.value) : this.element.value;
          } else {
            return this.state ? this.state === 2 ? true : false : "";
          }
        };

        vGridAttributesFilter.prototype.resetValue = function resetValue() {
          if (this.type !== "checkbox") {
            this.element.value = "";
          } else {
            this.state = 0;
            this.element.checked = false;
          }
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

          this.vGrid.element.addEventListener("filterUpdate", function (e) {
            if (e.detail.attribute === _this2.attribute) {
              _this2.filterOperator = e.detail.operator;
              _this2.element.placeholder = _this2.vGrid.vGridFilter.filterOperatorTableString[_this2.filterOperator];
              var curFilter = _this2.vGrid.vGridFilter.lastFilter;
              _this2.updateFilter(curFilter);
            }
          });

          this.vGrid.element.addEventListener("filterClearCell", function (e) {
            if (e.detail.attribute === _this2.attribute) {
              _this2.resetValue();
              var curFilter = _this2.vGrid.vGridFilter.lastFilter;
              _this2.updateFilter(curFilter);
            }
          });

          this.vGrid.element.addEventListener("filterClearAll", function (e) {
            _this2.resetValue();
            var curFilter = _this2.vGrid.vGridFilter.lastFilter;
            _this2.updateFilter(curFilter);
          });

          if (this.type !== "checkbox") {

            this.element.placeholder = this.vGrid.vGridFilter.filterOperatorTableString[this.filterOperator];

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

            this.element.onclick = function (e) {
              switch (_this2.state) {
                case 0:
                  _this2.state = 2;
                  _this2.element.style.opacity = 1;
                  break;
                case 2:
                  _this2.state = 3;
                  _this2.element.style.opacity = 1;
                  break;
                default:
                  _this2.element.checked = false;
                  _this2.state = 0;
                  _this2.element.style.opacity = 0.3;
              }

              var curFilter = _this2.vGrid.vGridFilter.lastFilter;
              _this2.updateFilter(curFilter);
              _this2.vGrid.vGridConfig.onFilterRun(curFilter);
            };
          }
        };

        _createClass(vGridAttributesFilter, [{
          key: 'valueConverters',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.viewResources.lookupFunctions.valueConverters;
            }
          }
        }]);

        return vGridAttributesFilter;
      }()) || _class) || _class));

      _export('vGridAttributesFilter', vGridAttributesFilter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFLUSxZLHFCQUFBLE07QUFBUSxxQixxQkFBQSxlO0FBQWlCLGMscUJBQUEsUTs7QUFJekIsVyxVQUFBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FNSyxxQixXQUZaLGdCQUFnQixVQUFoQixDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEM7QUFHQyx1Q0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO0FBQUE7O0FBQzFCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0Q7O3dDQVVELEksaUJBQUssYyxFQUFnQixlLEVBQWlCO0FBQ3BDLGVBQUssY0FBTCxHQUFzQixjQUF0QjtBQUNBLGVBQUssZUFBTCxHQUF1QixlQUF2QjtBQUNBLGNBQUksU0FBUyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEdBQWpCLENBQWI7QUFDQSxlQUFLLFNBQUwsR0FBaUIsT0FBTyxDQUFQLENBQWpCO0FBQ0EsZUFBSyxRQUFMLEdBQWdCLE9BQU8sQ0FBUCxLQUFhLE9BQTdCO0FBQ0EsZUFBSyxjQUFMLEdBQXNCLE9BQU8sQ0FBUCxLQUFhLEdBQW5DO0FBQ0EsZUFBSyxhQUFMLEdBQXFCLE9BQU8sQ0FBUCxJQUFZLEtBQUssZUFBTCxDQUFxQixPQUFPLENBQVAsQ0FBckIsQ0FBWixHQUE2QyxJQUFsRTtBQUNBLGVBQUssSUFBTCxHQUFZLEtBQUssT0FBTCxDQUFhLElBQXpCO0FBQ0EsZUFBSyxLQUFMLEdBQWEsQ0FBYjtBQUVELFM7O3dDQUdELFEsdUJBQVc7QUFDVCxjQUFHLEtBQUssSUFBTCxLQUFjLFVBQWpCLEVBQTRCO0FBQzFCLG1CQUFPLEtBQUssYUFBTCxHQUFxQixLQUFLLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBNEIsS0FBSyxPQUFMLENBQWEsS0FBekMsQ0FBckIsR0FBcUUsS0FBSyxP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QUFFLE9BQUYsS0FBYyxFQUFsQixFQUFzQjtBQUdwQixvQkFBSSxZQUFZLE9BQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsVUFBdkM7QUFDQSx1QkFBSyxZQUFMLENBQWtCLFNBQWxCO0FBQ0EsdUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsV0FBdkIsQ0FBbUMsU0FBbkM7QUFFRCxlQVBELE1BT087QUFHTCxvQkFBSSxZQUFZLE9BQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsVUFBdkM7QUFDQSx1QkFBSyxZQUFMLENBQWtCLFNBQWxCO0FBQ0Esb0JBQUksT0FBSyxRQUFMLEtBQWtCLFNBQXRCLEVBQWlDO0FBQy9CLHlCQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFdBQXZCLENBQW1DLFNBQW5DO0FBQ0Q7QUFHRjtBQUNGLGFBbkJEO0FBb0JELFdBNUJELE1BNEJPOztBQUVMLGlCQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLFVBQUMsQ0FBRCxFQUFPO0FBQzVCLHNCQUFRLE9BQUssS0FBYjtBQUNFLHFCQUFLLENBQUw7QUFDRSx5QkFBSyxLQUFMLEdBQWEsQ0FBYjtBQUNBLHlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLENBQTdCO0FBQ0E7QUFDRixxQkFBSyxDQUFMO0FBQ0UseUJBQUssS0FBTCxHQUFhLENBQWI7QUFDQSx5QkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixDQUE3QjtBQUNBO0FBQ0Y7QUFDRSx5QkFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixLQUF2QjtBQUNBLHlCQUFLLEtBQUwsR0FBYSxDQUFiO0FBQ0EseUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsR0FBN0I7QUFaSjs7QUFlQSxrQkFBSSxZQUFZLE9BQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsVUFBdkM7QUFDQSxxQkFBSyxZQUFMLENBQWtCLFNBQWxCO0FBQ0EscUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsV0FBdkIsQ0FBbUMsU0FBbkM7QUFFRCxhQXBCRDtBQXNCRDtBQUdGLFM7Ozs7OEJBL0pxQjtBQUNwQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGVBQXpCLENBQXlDLGVBQWhEO0FBQ0Q7QUFDRiIsImZpbGUiOiJ2R3JpZC92LWdyaWQtYXR0cmlidXRlcy1maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
