var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesFilterTrigger = (function () {
    function VGridAttributesFilterTrigger(element, vGrid) {
        this.vGrid = vGrid;
        this.element = element;
    }
    VGridAttributesFilterTrigger.prototype.valueChanged = function (newValue) {
        if (this.attribute && newValue) {
            this.updateFilter();
        }
    };
    VGridAttributesFilterTrigger.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        var valueConverter = this.valueConverters(this.converter);
        this.filterOperator = this.operator || '=';
        this.attribute = this.field;
        this.valueFormater = valueConverter || null;
        this.state = 0;
    };
    VGridAttributesFilterTrigger.prototype.getValue = function () {
        return this.valueFormater ? this.valueFormater.fromView(this.value) : this.value;
    };
    VGridAttributesFilterTrigger.prototype.updateFilter = function () {
        var _this = this;
        var curFilter = this.vGrid.attGridConnector.getCurrentFilter();
        var filterIndex = -1;
        curFilter.forEach(function (filter, index) {
            if (filter.attribute === _this.attribute) {
                filterIndex = index;
            }
        });
        if (filterIndex !== -1) {
            if (this.getValue() === '') {
                curFilter.splice(filterIndex, 1);
            }
            else {
                curFilter[filterIndex].value = this.getValue();
                curFilter[filterIndex].operator = this.filterOperator;
            }
        }
        else {
            if (this.getValue() !== '') {
                curFilter.push({
                    attribute: this.attribute,
                    operator: this.filterOperator,
                    value: this.getValue()
                });
            }
        }
        this.vGrid.attGridConnector.query(this.vGrid.attGridConnector.getCurrentFilter());
    };
    VGridAttributesFilterTrigger.prototype.valueConverters = function (value) {
        var valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
        return valueConverter(value);
    };
    return VGridAttributesFilterTrigger;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilterTrigger.prototype, "field", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilterTrigger.prototype, "operator", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilterTrigger.prototype, "converter", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilterTrigger.prototype, "value", void 0);
VGridAttributesFilterTrigger = __decorate([
    aurelia_framework_1.customAttribute('v-filter-trigger'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [HTMLElement, v_grid_1.VGrid])
], VGridAttributesFilterTrigger);
exports.VGridAttributesFilterTrigger = VGridAttributesFilterTrigger;

//# sourceMappingURL=v-filter-trigger.js.map
