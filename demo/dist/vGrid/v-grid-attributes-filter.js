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
          var _this = this;

          this.bindingContext = bindingContext;
          this.overrideContext = overrideContext;

          var values = this.value.split("|");

          this.attribute = values[0].trim();

          if (values.length > 1) {
            values.forEach(function (value, i) {
              if (i !== 0) {
                _this.checkParams(value);
              }
            });
          }

          this.filterOn = this.filterOn || "onEnterKey";
          this.filterOperator = this.filterOperator || "=";
          this.valueFormater = this.valueFormater || null;
          this.type = this.element.type;
          this.state = 0;
        };

        vGridAttributesFilter.prototype.checkParams = function checkParams(value) {

          if (value !== undefined && value !== null) {
            value = value.trim();
          }

          var valueConverter = this.valueConverters(value);
          if (valueConverter) {
            this.valueFormater = valueConverter;
          }

          var filterOperator = this.vGrid.vGridFilter.filterOperatorTableString[value];
          if (filterOperator) {
            this.filterOperator = value;
          }

          if (value === "onKeyDown") {
            this.filterOn = value;
          }
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
          var _this2 = this;

          var filterIndex = null;

          curFilter.forEach(function (filter, index) {
            if (filter.attribute === _this2.attribute) {
              filterIndex = index;
            }
          });

          if (filterIndex !== null) {
            if (this.getValue() === "") {
              curFilter.splice(filterIndex, 1);
            } else {
              curFilter[filterIndex].value = this.getValue();
              curFilter[filterIndex].operator = this.filterOperator;
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
          var _this3 = this;

          if (this.attribute) {

            this.vGrid.element.addEventListener("filterUpdate", function (e) {
              if (e.detail.attribute === _this3.attribute) {
                _this3.filterOperator = e.detail.operator;
                _this3.element.placeholder = _this3.vGrid.vGridFilter.filterOperatorTableString[_this3.filterOperator];
                _this3.updateFilter(_this3.vGrid.vGridFilter.lastFilter);
              }
            });

            this.vGrid.element.addEventListener("filterClearCell", function (e) {
              if (e.detail.attribute === _this3.attribute) {
                _this3.resetValue();
                _this3.updateFilter(_this3.vGrid.vGridFilter.lastFilter);
              }
            });

            this.vGrid.element.addEventListener("filterClearAll", function (e) {
              _this3.resetValue();
              _this3.updateFilter(_this3.vGrid.vGridFilter.lastFilter);
            });

            if (this.type !== "checkbox") {

              this.element.placeholder = this.vGrid.vGridFilter.filterOperatorTableString[this.filterOperator];

              this.element.onkeyup = function (e) {
                if (e.keyCode === 13) {
                  _this3.updateFilter(_this3.vGrid.vGridFilter.lastFilter);
                  _this3.vGrid.vGridConfig.onFilterRun(_this3.vGrid.vGridFilter.lastFilter);
                } else {
                  _this3.updateFilter(_this3.vGrid.vGridFilter.lastFilter);
                  if (_this3.filterOn === "onKeyDown") {
                    _this3.vGrid.vGridConfig.onFilterRun(_this3.vGrid.vGridFilter.lastFilter);
                  }
                }
              };
            } else {
              this.element.style.opacity = 0.3;

              this.element.onclick = function (e) {
                switch (_this3.state) {
                  case 0:
                    _this3.state = 2;
                    _this3.element.style.opacity = 1;
                    break;
                  case 2:
                    _this3.state = 3;
                    _this3.element.style.opacity = 1;
                    break;
                  default:
                    _this3.element.checked = false;
                    _this3.state = 0;
                    _this3.element.style.opacity = 0.3;
                }
                _this3.updateFilter(_this3.vGrid.vGridFilter.lastFilter);
                _this3.vGrid.vGridConfig.onFilterRun(_this3.vGrid.vGridFilter.lastFilter);
              };
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFLUSxZLHFCQUFBLE07QUFBUSxxQixxQkFBQSxlO0FBQWlCLGMscUJBQUEsUTs7QUFDekIsVyxVQUFBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FLSyxxQixXQUZaLGdCQUFnQixVQUFoQixDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEM7QUFHQyx1Q0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO0FBQUE7O0FBQzFCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0Q7O3dDQVVELEksaUJBQUssYyxFQUFnQixlLEVBQWlCO0FBQUE7O0FBQ3BDLGVBQUssY0FBTCxHQUFzQixjQUF0QjtBQUNBLGVBQUssZUFBTCxHQUF1QixlQUF2Qjs7QUFHQSxjQUFJLFNBQVMsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixHQUFqQixDQUFiOztBQUdBLGVBQUssU0FBTCxHQUFpQixPQUFPLENBQVAsRUFBVSxJQUFWLEVBQWpCOztBQUdBLGNBQUksT0FBTyxNQUFQLEdBQWdCLENBQXBCLEVBQXVCO0FBQ3JCLG1CQUFPLE9BQVAsQ0FBZSxVQUFDLEtBQUQsRUFBUSxDQUFSLEVBQWE7QUFDMUIsa0JBQUksTUFBTSxDQUFWLEVBQWE7QUFDWCxzQkFBSyxXQUFMLENBQWlCLEtBQWpCO0FBQ0Q7QUFDRixhQUpEO0FBS0Q7O0FBRUQsZUFBSyxRQUFMLEdBQWdCLEtBQUssUUFBTCxJQUFpQixZQUFqQztBQUNBLGVBQUssY0FBTCxHQUFzQixLQUFLLGNBQUwsSUFBdUIsR0FBN0M7QUFDQSxlQUFLLGFBQUwsR0FBcUIsS0FBSyxhQUFMLElBQXNCLElBQTNDO0FBQ0EsZUFBSyxJQUFMLEdBQVksS0FBSyxPQUFMLENBQWEsSUFBekI7QUFDQSxlQUFLLEtBQUwsR0FBYSxDQUFiO0FBRUQsUzs7d0NBR0Qs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LGVBZkQ7QUFrQkQsYUF4QkQsTUF3Qk87QUFFTCxtQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixHQUE3Qjs7QUFFQSxtQkFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixVQUFDLENBQUQsRUFBTztBQUM1Qix3QkFBUSxPQUFLLEtBQWI7QUFDRSx1QkFBSyxDQUFMO0FBQ0UsMkJBQUssS0FBTCxHQUFhLENBQWI7QUFDQSwyQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixDQUE3QjtBQUNBO0FBQ0YsdUJBQUssQ0FBTDtBQUNFLDJCQUFLLEtBQUwsR0FBYSxDQUFiO0FBQ0EsMkJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsQ0FBN0I7QUFDQTtBQUNGO0FBQ0UsMkJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBdkI7QUFDQSwyQkFBSyxLQUFMLEdBQWEsQ0FBYjtBQUNBLDJCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLEdBQTdCO0FBWko7QUFjQSx1QkFBSyxZQUFMLENBQWtCLE9BQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsVUFBekM7QUFDQSx1QkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixXQUF2QixDQUFtQyxPQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFVBQTFEO0FBQ0QsZUFqQkQ7QUFvQkQ7QUFDRjtBQUNGLFM7Ozs7OEJBN0xxQjtBQUNwQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGVBQXpCLENBQXlDLGVBQWhEO0FBQ0Q7QUFDRiIsImZpbGUiOiJ2R3JpZC92LWdyaWQtYXR0cmlidXRlcy1maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
