var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesDataHandler = (function () {
    function VGridAttributesDataHandler(element, vGrid) {
        this.isSet = false;
        this.element = element;
        this.vGrid = vGrid;
    }
    VGridAttributesDataHandler.prototype.attached = function () {
        this.element.onchange = this.onChanged.bind(this);
        this.element.onfocus = this.onFocus.bind(this);
        this.element.onblur = this.onBlur.bind(this);
    };
    VGridAttributesDataHandler.prototype.valueChanged = function (newValue) {
        if (this.isSet) {
            var checkValue = this.editFormater.toView(newValue);
            if (checkValue !== this.tempValue) {
                this.element.value = this.displayFormater.toView(newValue);
            }
        }
        else {
            this.element.value = this.displayFormater.toView(newValue);
        }
    };
    VGridAttributesDataHandler.prototype.onFocus = function () {
        this.isSet = true;
        this.element.value = this.editFormater.toView(this.value);
        this.tempValue = this.element.value;
    };
    VGridAttributesDataHandler.prototype.onBlur = function () {
        if (this.tempValue === this.element.value) {
            this.onChanged();
        }
        this.isSet = false;
    };
    VGridAttributesDataHandler.prototype.onChanged = function () {
        this.value = this.editFormater.fromView(this.element.value);
        this.bindingContext.rowRef[this.field] = this.value;
        this.element.value = this.displayFormater.toView(this.value);
        this.vGrid.controller.rowDataBinder.rebindRowNo(this.bindingContext.row);
    };
    VGridAttributesDataHandler.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.displayFormater = this.valueConverters(this.display);
        this.editFormater = this.valueConverters(this.edit);
        this.element.value = this.displayFormater.toView(this.value);
    };
    VGridAttributesDataHandler.prototype.valueConverters = function (value) {
        var valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
        return valueConverter(value);
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], VGridAttributesDataHandler.prototype, "field", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], VGridAttributesDataHandler.prototype, "value", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], VGridAttributesDataHandler.prototype, "display", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], VGridAttributesDataHandler.prototype, "edit", void 0);
    VGridAttributesDataHandler = __decorate([
        aurelia_framework_1.customAttribute('v-data-handler'),
        aurelia_framework_1.inject(Element, v_grid_1.VGrid),
        __metadata("design:paramtypes", [HTMLElement, v_grid_1.VGrid])
    ], VGridAttributesDataHandler);
    return VGridAttributesDataHandler;
}());
exports.VGridAttributesDataHandler = VGridAttributesDataHandler;
//# sourceMappingURL=v-data-handler.js.map