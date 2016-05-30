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
          this.filterOn = values[1] || "onHitEnter";
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
              _this2.updateFilter(_this2.vGrid.vGridFilter.lastFilter);
            }
          });

          this.vGrid.element.addEventListener("filterClearCell", function (e) {
            if (e.detail.attribute === _this2.attribute) {
              _this2.resetValue();
              _this2.updateFilter(_this2.vGrid.vGridFilter.lastFilter);
            }
          });

          this.vGrid.element.addEventListener("filterClearAll", function (e) {
            _this2.resetValue();
            _this2.updateFilter(_this2.vGrid.vGridFilter.lastFilter);
          });

          if (this.type !== "checkbox") {

            this.element.placeholder = this.vGrid.vGridFilter.filterOperatorTableString[this.filterOperator];

            this.element.onkeyup = function (e) {
              if (e.keyCode === 13) {
                _this2.updateFilter(_this2.vGrid.vGridFilter.lastFilter);
                _this2.vGrid.vGridConfig.onFilterRun(_this2.vGrid.vGridFilter.lastFilter);
              } else {
                _this2.updateFilter(_this2.vGrid.vGridFilter.lastFilter);
                if (_this2.filterOn === "keydown") {
                  _this2.vGrid.vGridConfig.onFilterRun(_this2.vGrid.vGridFilter.lastFilter);
                }
              }
            };
          } else {
            this.element.style.opacity = 0.3;

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
              _this2.updateFilter(_this2.vGrid.vGridFilter.lastFilter);
              _this2.vGrid.vGridConfig.onFilterRun(_this2.vGrid.vGridFilter.lastFilter);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFLUSxZLHFCQUFBLE07QUFBUSxxQixxQkFBQSxlO0FBQWlCLGMscUJBQUEsUTs7QUFDekIsVyxVQUFBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FLSyxxQixXQUZaLGdCQUFnQixVQUFoQixDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEM7QUFHQyx1Q0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO0FBQUE7O0FBQzFCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0Q7O3dDQVVELEksaUJBQUssYyxFQUFnQixlLEVBQWlCO0FBQ3BDLGVBQUssY0FBTCxHQUFzQixjQUF0QjtBQUNBLGVBQUssZUFBTCxHQUF1QixlQUF2Qjs7QUFHQSxjQUFJLFNBQVMsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixHQUFqQixDQUFiO0FBQ0EsZUFBSyxTQUFMLEdBQWlCLE9BQU8sQ0FBUCxDQUFqQjtBQUNBLGVBQUssUUFBTCxHQUFnQixPQUFPLENBQVAsS0FBYSxZQUE3QjtBQUNBLGVBQUssY0FBTCxHQUFzQixPQUFPLENBQVAsS0FBYSxHQUFuQztBQUNBLGVBQUssYUFBTCxHQUFxQixPQUFPLENBQVAsSUFBWSxLQUFLLGVBQUwsQ0FBcUIsT0FBTyxDQUFQLENBQXJCLENBQVosR0FBOEMsSUFBbkU7QUFDQSxlQUFLLElBQUwsR0FBWSxLQUFLLE9BQUwsQ0FBYSxJQUF6QjtBQUNBLGVBQUssS0FBTCxHQUFhLENBQWI7QUFFRCxTOzt3Q0FHRCxRLHVCQUFXO0FBQ1QsY0FBSSxLQUFLLElBQUwsS0FBYyxVQUFsQixFQUE4QjtBQUM1QixtQkFBTyxLQUFLLGFBQUwsR0FBcUIsS0FBSyxhQUFMLENBQW1CLFFBQW5CLENBQTRCLEtBQUssT0FBTCxDQUFhLEtBQXpDLENBQXJCLEdBQXVFLEtBQUss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QUFYLENBQXVCLFVBQXpDO0FBQ0EsdUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsV0FBdkIsQ0FBbUMsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixVQUExRDtBQUVELGVBTkQsTUFNTztBQUdMLHVCQUFLLFlBQUwsQ0FBa0IsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixVQUF6QztBQUNBLG9CQUFJLE9BQUssUUFBTCxLQUFrQixTQUF0QixFQUFpQztBQUMvQix5QkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixXQUF2QixDQUFtQyxPQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFVBQTFEO0FBQ0Q7QUFDRjtBQUNGLGFBZkQ7QUFrQkQsV0F4QkQsTUF3Qk87QUFFTCxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixHQUE3Qjs7QUFFQSxpQkFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixVQUFDLENBQUQsRUFBTztBQUM1QixzQkFBUSxPQUFLLEtBQWI7QUFDRSxxQkFBSyxDQUFMO0FBQ0UseUJBQUssS0FBTCxHQUFhLENBQWI7QUFDQSx5QkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixDQUE3QjtBQUNBO0FBQ0YscUJBQUssQ0FBTDtBQUNFLHlCQUFLLEtBQUwsR0FBYSxDQUFiO0FBQ0EseUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsQ0FBN0I7QUFDQTtBQUNGO0FBQ0UseUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBdkI7QUFDQSx5QkFBSyxLQUFMLEdBQWEsQ0FBYjtBQUNBLHlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLEdBQTdCO0FBWko7QUFjQSxxQkFBSyxZQUFMLENBQWtCLE9BQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsVUFBekM7QUFDQSxxQkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixXQUF2QixDQUFtQyxPQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFVBQTFEO0FBQ0QsYUFqQkQ7QUFvQkQ7QUFDRixTOzs7OzhCQXRKcUI7QUFDcEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixlQUF6QixDQUF5QyxlQUFoRDtBQUNEO0FBQ0YiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWF0dHJpYnV0ZXMtZmlsdGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
