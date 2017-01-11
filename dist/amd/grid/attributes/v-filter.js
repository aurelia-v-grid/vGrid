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
    var VGridAttributesFilter = (function () {
        function VGridAttributesFilter(element, vGrid) {
            this.vGrid = vGrid;
            this.element = element;
        }
        VGridAttributesFilter.prototype.getOperatorName = function (operator) {
            return this.vGrid.filterOperatorNames[operator];
        };
        VGridAttributesFilter.prototype.attached = function () {
            var _this = this;
            if (this.attribute) {
                this.vGrid.element.addEventListener('filterUpdate', function (e) {
                    if (e.detail.attribute === _this.attribute) {
                        _this.filterOperator = e.detail.operator;
                        _this.element.placeholder =
                            _this.getOperatorName(_this.filterOperator);
                        _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                    }
                });
                this.vGrid.element.addEventListener('filterTranslation', function () {
                    _this.element.placeholder =
                        _this.getOperatorName(_this.filterOperator);
                    _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                });
                this.vGrid.element.addEventListener('filterClearCell', function (e) {
                    if (e.detail.attribute === _this.attribute) {
                        _this.resetValue();
                        _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                    }
                });
                this.vGrid.element.addEventListener('filterClearAll', function () {
                    _this.resetValue();
                    _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                });
                if (this.type !== 'checkbox') {
                    this.element.placeholder =
                        this.getOperatorName(this.filterOperator);
                    this.element.onkeyup = function (e) {
                        if (e.keyCode === 13) {
                            _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                            _this.vGrid.attGridConnector.query(_this.vGrid.attGridConnector.getCurrentFilter());
                        }
                        else {
                            _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                            if (_this.filterOn === 'onKeyDown') {
                                _this.vGrid.attGridConnector.query(_this.vGrid.attGridConnector.getCurrentFilter());
                            }
                        }
                    };
                }
                else {
                    this.element.indeterminate = true;
                    this.element.style.opacity = '0.3';
                    this.element.onclick = function () {
                        switch (_this.state) {
                            case 0:
                                _this.state = 2;
                                _this.element.style.opacity = '1';
                                _this.element.checked = true;
                                _this.element.indeterminate = false;
                                break;
                            case 2:
                                _this.state = 3;
                                _this.element.style.opacity = '1';
                                _this.element.indeterminate = false;
                                break;
                            default:
                                _this.element.checked = false;
                                _this.state = 0;
                                _this.element.style.opacity = '0.3';
                                _this.element.indeterminate = true;
                        }
                        _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                        _this.vGrid.attGridConnector.query(_this.vGrid.attGridConnector.getCurrentFilter());
                    };
                }
            }
        };
        VGridAttributesFilter.prototype.bind = function (bindingContext, overrideContext) {
            this.bindingContext = bindingContext;
            this.overrideContext = overrideContext;
            var valueConverter = this.valueConverters(this.converter);
            this.filterOn = this.keydown === 'true' ? 'onKeyDown' : 'onEnterKey';
            this.filterOperator = this.operator || '=';
            this.attribute = this.field;
            this.valueFormater = valueConverter || null;
            this.type = this.element.type;
            this.state = 0;
        };
        VGridAttributesFilter.prototype.getValue = function () {
            if (this.type !== 'checkbox') {
                return this.valueFormater ? this.valueFormater.fromView(this.element.value) : this.element.value;
            }
            else {
                if (this.valueFormater && this.state) {
                    return this.valueFormater.fromView(this.state ? this.state === 2 ? true : false : '');
                }
                else {
                    return this.state ? this.state === 2 ? true : false : '';
                }
            }
        };
        VGridAttributesFilter.prototype.resetValue = function () {
            if (this.type !== 'checkbox') {
                this.element.value = '';
            }
            else {
                this.state = 0;
                this.element.checked = false;
            }
        };
        VGridAttributesFilter.prototype.updateFilter = function (curFilter) {
            var _this = this;
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
        };
        VGridAttributesFilter.prototype.valueConverters = function (value) {
            var valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
            return valueConverter(value);
        };
        return VGridAttributesFilter;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], VGridAttributesFilter.prototype, "field", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], VGridAttributesFilter.prototype, "operator", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], VGridAttributesFilter.prototype, "converter", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], VGridAttributesFilter.prototype, "keydown", void 0);
    VGridAttributesFilter = __decorate([
        aurelia_framework_1.customAttribute('v-filter'),
        aurelia_framework_1.inject(Element, v_grid_1.VGrid),
        __metadata("design:paramtypes", [HTMLElement, v_grid_1.VGrid])
    ], VGridAttributesFilter);
    exports.VGridAttributesFilter = VGridAttributesFilter;
});

//# sourceMappingURL=v-filter.js.map
