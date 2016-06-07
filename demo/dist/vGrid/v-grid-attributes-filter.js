'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, VGrid, _createClass, _dec, _dec2, _class, vGridAttributesFilter;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFLUSxZLHFCQUFBLE07QUFBUSxxQixxQkFBQSxlOztBQUNSLFcsVUFBQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNBS0sscUIsV0FGWixnQkFBZ0IsVUFBaEIsQyxVQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQixDO0FBR0MsdUNBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtBQUFBOztBQUMxQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNEOzt3Q0FVRCxJLGlCQUFLLGMsRUFBZ0IsZSxFQUFpQjtBQUFBOztBQUNwQyxlQUFLLGNBQUwsR0FBc0IsY0FBdEI7QUFDQSxlQUFLLGVBQUwsR0FBdUIsZUFBdkI7O0FBR0EsY0FBSSxTQUFTLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsQ0FBYjs7QUFHQSxlQUFLLFNBQUwsR0FBaUIsT0FBTyxDQUFQLEVBQVUsSUFBVixFQUFqQjs7QUFHQSxjQUFJLE9BQU8sTUFBUCxHQUFnQixDQUFwQixFQUF1QjtBQUNyQixtQkFBTyxPQUFQLENBQWUsVUFBQyxLQUFELEVBQVEsQ0FBUixFQUFhO0FBQzFCLGtCQUFJLE1BQU0sQ0FBVixFQUFhO0FBQ1gsc0JBQUssV0FBTCxDQUFpQixLQUFqQjtBQUNEO0FBQ0YsYUFKRDtBQUtEOztBQUVELGVBQUssUUFBTCxHQUFnQixLQUFLLFFBQUwsSUFBaUIsWUFBakM7QUFDQSxlQUFLLGNBQUwsR0FBc0IsS0FBSyxjQUFMLElBQXVCLEdBQTdDO0FBQ0EsZUFBSyxhQUFMLEdBQXFCLEtBQUssYUFBTCxJQUFzQixJQUEzQztBQUNBLGVBQUssSUFBTCxHQUFZLEtBQUssT0FBTCxDQUFhLElBQXpCO0FBQ0EsZUFBSyxLQUFMLEdBQWEsQ0FBYjtBQUVELFM7O3dDQUdELFcsd0JBQVksSyxFQUFPOztB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LE1Bd0JPO0FBRUwsbUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsR0FBN0I7O0FBRUEsbUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsVUFBQyxDQUFELEVBQU87QUFDNUIsd0JBQVEsT0FBSyxLQUFiO0FBQ0UsdUJBQUssQ0FBTDtBQUNFLDJCQUFLLEtBQUwsR0FBYSxDQUFiO0FBQ0EsMkJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsQ0FBN0I7QUFDQTtBQUNGLHVCQUFLLENBQUw7QUFDRSwyQkFBSyxLQUFMLEdBQWEsQ0FBYjtBQUNBLDJCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLENBQTdCO0FBQ0E7QUFDRjtBQUNFLDJCQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLEtBQXZCO0FBQ0EsMkJBQUssS0FBTCxHQUFhLENBQWI7QUFDQSwyQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixHQUE3QjtBQVpKO0FBY0EsdUJBQUssWUFBTCxDQUFrQixPQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFVBQXpDO0FBQ0EsdUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsV0FBdkIsQ0FBbUMsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixVQUExRDtBQUNELGVBakJEO0FBb0JEO0FBQ0Y7QUFDRixTOzs7OzhCQTdMcUI7QUFDcEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixlQUF6QixDQUF5QyxlQUFoRDtBQUNEO0FBQ0YiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWF0dHJpYnV0ZXMtZmlsdGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
