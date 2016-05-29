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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFLUSxZLHFCQUFBLE07QUFBUSxxQixxQkFBQSxlO0FBQWlCLGMscUJBQUEsUTs7QUFJekIsVyxVQUFBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FNSyxxQixXQUZaLGdCQUFnQixVQUFoQixDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEM7QUFHQyx1Q0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO0FBQUE7O0FBQzFCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0Q7O3dDQVVELEksaUJBQUssYyxFQUFnQixlLEVBQWlCO0FBQ3BDLGVBQUssY0FBTCxHQUFzQixjQUF0QjtBQUNBLGVBQUssZUFBTCxHQUF1QixlQUF2QjtBQUNBLGNBQUksU0FBUyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEdBQWpCLENBQWI7QUFDQSxlQUFLLFNBQUwsR0FBaUIsT0FBTyxDQUFQLENBQWpCO0FBQ0EsZUFBSyxRQUFMLEdBQWdCLE9BQU8sQ0FBUCxLQUFhLE9BQTdCO0FBQ0EsZUFBSyxjQUFMLEdBQXNCLE9BQU8sQ0FBUCxLQUFhLEdBQW5DO0FBQ0EsZUFBSyxhQUFMLEdBQXFCLE9BQU8sQ0FBUCxJQUFZLEtBQUssZUFBTCxDQUFxQixPQUFPLENBQVAsQ0FBckIsQ0FBWixHQUE2QyxJQUFsRTtBQUNBLGVBQUssSUFBTCxHQUFZLEtBQUssT0FBTCxDQUFhLElBQXpCO0FBQ0EsZUFBSyxLQUFMLEdBQWEsQ0FBYjtBQUVELFM7O3dDQUdELFEsdUJBQVc7QUFDVCxjQUFHLEtBQUssSUFBTCxLQUFjLFVBQWpCLEVBQTRCO0FBQzFCLG1CQUFPLEtBQUssYUFBTCxHQUFxQixLQUFLLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBNEIsS0FBSyxPQUFMLENBQWEsS0FBekMsQ0FBckIsR0FBcUUsS0FBSyxP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
