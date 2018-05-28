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
var VGridAttributesOnChange = (function () {
    function VGridAttributesOnChange(element, vGrid) {
        this.element = element;
        this.vGrid = vGrid;
    }
    VGridAttributesOnChange.prototype.attached = function () {
        if (!this.element.onchange) {
            this.element.onchange = this.onChanged.bind(this);
        }
    };
    VGridAttributesOnChange.prototype.onChanged = function () {
        this.vGrid.controller.rowDataBinder.rebindRowNo(this.bindingContext.row);
    };
    VGridAttributesOnChange.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
    };
    VGridAttributesOnChange = __decorate([
        aurelia_framework_1.customAttribute('v-onchange'),
        aurelia_framework_1.inject(Element, v_grid_1.VGrid),
        __metadata("design:paramtypes", [HTMLElement, v_grid_1.VGrid])
    ], VGridAttributesOnChange);
    return VGridAttributesOnChange;
}());
exports.VGridAttributesOnChange = VGridAttributesOnChange;
//# sourceMappingURL=v-changed.js.map