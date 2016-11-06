'use strict';

System.register(['aurelia-framework', '../v-grid'], function (_export, _context) {
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

          var filterOperator = this.vGrid.controller.getOperatorName(value);
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
                _this3.element.placeholder = _this3.vGrid.attGridConnector.getFilterOperatorName(_this3.filterOperator);
                _this3.updateFilter(_this3.vGrid.attGridConnector.getCurrentFilter());
              }
            });

            this.vGrid.element.addEventListener("filterClearCell", function (e) {
              if (e.detail.attribute === _this3.attribute) {
                _this3.resetValue();
                _this3.updateFilter(_this3.vGrid.attGridConnector.getCurrentFilter());
              }
            });

            this.vGrid.element.addEventListener("filterClearAll", function () {
              _this3.resetValue();
              _this3.updateFilter(_this3.vGrid.attGridConnector.getCurrentFilter());
            });

            if (this.type !== "checkbox") {

              this.element.placeholder = this.vGrid.attGridConnector.getFilterOperatorName(this.filterOperator);

              this.element.onkeyup = function (e) {
                if (e.keyCode === 13) {
                  _this3.updateFilter(_this3.vGrid.attGridConnector.getCurrentFilter());
                  _this3.vGrid.attGridConnector.query(_this3.vGrid.attGridConnector.getCurrentFilter());
                } else {
                  _this3.updateFilter(_this3.vGrid.attGridConnector.getCurrentFilter());
                  if (_this3.filterOn === "onKeyDown") {
                    _this3.vGrid.attGridConnector.query(_this3.vGrid.attGridConnector.getCurrentFilter());
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
                _this3.updateFilter(_this3.vGrid.attGridConnector.getCurrentFilter());
                _this3.vGrid.attGridConnector.query(_this3.vGrid.attGridConnector.getCurrentFilter());
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
//# sourceMappingURL=v-filter.js.map
