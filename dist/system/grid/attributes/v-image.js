System.register(["aurelia-framework", "../v-grid"], function (exports_1, context_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, v_grid_1, VGridAttributesImageFix;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (v_grid_1_1) {
                v_grid_1 = v_grid_1_1;
            }
        ],
        execute: function () {
            VGridAttributesImageFix = (function () {
                function VGridAttributesImageFix(element, vGrid) {
                    this.vGrid = vGrid;
                    this.element = element;
                }
                VGridAttributesImageFix.prototype.valueChanged = function (newValue) {
                    this.element.src = '';
                    this.element.src = this.value || newValue;
                };
                VGridAttributesImageFix.prototype.bind = function (bindingContext, overrideContext) {
                    this.bindingContext = bindingContext;
                    this.overrideContext = overrideContext;
                    this.element.src = '';
                    this.element.src = this.value || '';
                };
                return VGridAttributesImageFix;
            }());
            VGridAttributesImageFix = __decorate([
                aurelia_framework_1.customAttribute('v-image-fix'),
                aurelia_framework_1.inject(Element, v_grid_1.VGrid),
                __metadata("design:paramtypes", [HTMLImageElement, v_grid_1.VGrid])
            ], VGridAttributesImageFix);
            exports_1("VGridAttributesImageFix", VGridAttributesImageFix);
        }
    };
});

//# sourceMappingURL=v-image.js.map
