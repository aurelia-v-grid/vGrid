var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject, customAttribute } from 'aurelia-framework';
import { VGrid } from '../v-grid';
var VGridAttributesImageFix = (function () {
    function VGridAttributesImageFix(element, vGrid) {
        this.vGrid = vGrid;
        this.element = element;
    }
    VGridAttributesImageFix.prototype.valueChanged = function (newValue) {
        newValue = newValue ? newValue : '';
        this.element.src = '';
        this.element.src = this.value || newValue;
    };
    VGridAttributesImageFix.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.element.src = '';
        this.element.src = this.value || '';
    };
    VGridAttributesImageFix = __decorate([
        customAttribute('v-image-fix'),
        inject(Element, VGrid),
        __metadata("design:paramtypes", [HTMLImageElement, VGrid])
    ], VGridAttributesImageFix);
    return VGridAttributesImageFix;
}());
export { VGridAttributesImageFix };
//# sourceMappingURL=v-image.js.map