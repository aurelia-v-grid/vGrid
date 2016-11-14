"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require('aurelia-framework');
var v_grid_1 = require('../v-grid');
var vGridAttributesFilter = (function () {
    function vGridAttributesFilter(element, vGrid) {
        this.vGrid = vGrid;
        this.element = element;
    }
    Object.defineProperty(vGridAttributesFilter.prototype, "valueConverters", {
        get: function () {
            if (this.vGrid) {
                var valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
                return valueConverter;
            }
        },
        enumerable: true,
        configurable: true
    });
    vGridAttributesFilter.prototype.bind = function (bindingContext, overrideContext) {
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
    vGridAttributesFilter.prototype.checkParams = function (value) {
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
    vGridAttributesFilter.prototype.getValue = function () {
        if (this.type !== "checkbox") {
            return this.valueFormater ? this.valueFormater.fromView(this.element.value) : this.element.value;
        }
        else {
            return this.state ? this.state === 2 ? true : false : "";
        }
    };
    vGridAttributesFilter.prototype.resetValue = function () {
        if (this.type !== "checkbox") {
            this.element.value = "";
        }
        else {
            this.state = 0;
            this.element.checked = false;
        }
    };
    vGridAttributesFilter.prototype.updateFilter = function (curFilter) {
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
            }
            else {
                curFilter[filterIndex].value = this.getValue();
                curFilter[filterIndex].operator = this.filterOperator;
            }
        }
        else {
            if (this.getValue() !== "") {
                curFilter.push({
                    attribute: this.attribute,
                    operator: this.filterOperator,
                    value: this.getValue()
                });
            }
        }
    };
    vGridAttributesFilter.prototype.attached = function () {
        var _this = this;
        if (this.attribute) {
            this.vGrid.element.addEventListener("filterUpdate", function (e) {
                if (e.detail.attribute === _this.attribute) {
                    _this.filterOperator = e.detail.operator;
                    _this.element.placeholder = _this.vGrid.attGridConnector.getFilterOperatorName(_this.filterOperator);
                    _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                }
            });
            this.vGrid.element.addEventListener("filterClearCell", function (e) {
                if (e.detail.attribute === _this.attribute) {
                    _this.resetValue();
                    _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                }
            });
            this.vGrid.element.addEventListener("filterClearAll", function () {
                _this.resetValue();
                _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
            });
            if (this.type !== "checkbox") {
                this.element.placeholder = this.vGrid.attGridConnector.getFilterOperatorName(this.filterOperator);
                this.element.onkeyup = function (e) {
                    if (e.keyCode === 13) {
                        _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                        _this.vGrid.attGridConnector.query(_this.vGrid.attGridConnector.getCurrentFilter());
                    }
                    else {
                        _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                        if (_this.filterOn === "onKeyDown") {
                            _this.vGrid.attGridConnector.query(_this.vGrid.attGridConnector.getCurrentFilter());
                        }
                    }
                };
            }
            else {
                this.element.style.opacity = 0.3;
                this.element.onclick = function (e) {
                    switch (_this.state) {
                        case 0:
                            _this.state = 2;
                            _this.element.style.opacity = 1;
                            break;
                        case 2:
                            _this.state = 3;
                            _this.element.style.opacity = 1;
                            break;
                        default:
                            _this.element.checked = false;
                            _this.state = 0;
                            _this.element.style.opacity = 0.3;
                    }
                    _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                    _this.vGrid.attGridConnector.query(_this.vGrid.attGridConnector.getCurrentFilter());
                };
            }
        }
    };
    vGridAttributesFilter = __decorate([
        aurelia_framework_1.customAttribute('v-filter'),
        aurelia_framework_1.inject(Element, v_grid_1.VGrid), 
        __metadata('design:paramtypes', [Object, Object])
    ], vGridAttributesFilter);
    return vGridAttributesFilter;
}());
exports.vGridAttributesFilter = vGridAttributesFilter;

//# sourceMappingURL=v-filter.js.map
