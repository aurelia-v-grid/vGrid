/* */ 
define(['exports', 'aurelia-framework', './v-grid'], function (exports, _aureliaFramework, _vGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.vGridAttributesFilter = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  var _dec, _dec2, _class;

  var vGridAttributesFilter = exports.vGridAttributesFilter = (_dec = (0, _aureliaFramework.customAttribute)('v-filter'), _dec2 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid), _dec(_class = _dec2(_class = function () {
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
  }()) || _class) || _class);
});