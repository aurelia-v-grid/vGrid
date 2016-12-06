var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../v-grid"], function (require, exports, aurelia_framework_1, v_grid_1) {
    var VGridAttributesFilterObserver = (function () {
        function VGridAttributesFilterObserver(element, vGrid) {
            this.vGrid = vGrid;
            this.element = element;
        }
        VGridAttributesFilterObserver.prototype.valueChanged = function (newValue) {
            if (this.attribute && newValue) {
                this.updateFilter();
            }
        };
        VGridAttributesFilterObserver.prototype.bind = function (bindingContext, overrideContext) {
            this.bindingContext = bindingContext;
            this.overrideContext = overrideContext;
            var valueConverter = this.valueConverters(this.converter);
            this.filterOperator = this.operator || '=';
            this.attribute = this.field;
            this.valueFormater = valueConverter || null;
            this.state = 0;
        };
        VGridAttributesFilterObserver.prototype.getValue = function () {
            return this.valueFormater ? this.valueFormater.fromView(this.value) : this.value;
        };
        VGridAttributesFilterObserver.prototype.updateFilter = function () {
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
        VGridAttributesFilterObserver.prototype.valueConverters = function (value) {
            var valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
            return valueConverter(value);
        };
        return VGridAttributesFilterObserver;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], VGridAttributesFilterObserver.prototype, "field", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], VGridAttributesFilterObserver.prototype, "operator", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], VGridAttributesFilterObserver.prototype, "converter", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], VGridAttributesFilterObserver.prototype, "value", void 0);
    VGridAttributesFilterObserver = __decorate([
        aurelia_framework_1.customAttribute('v-filter-observer'),
        aurelia_framework_1.inject(Element, v_grid_1.VGrid),
        __metadata("design:paramtypes", [HTMLElement, v_grid_1.VGrid])
    ], VGridAttributesFilterObserver);
    exports.VGridAttributesFilterObserver = VGridAttributesFilterObserver;
});

//# sourceMappingURL=v-filter-observer.js.map
