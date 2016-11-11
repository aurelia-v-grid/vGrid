var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', './v-grid'], function (require, exports, aurelia_framework_1, v_grid_1) {
    "use strict";
    var VGridElementColConfig = (function () {
        function VGridElementColConfig(element, vGrid, targetInstruction) {
            this.vGrid = vGrid;
            this.element = element;
            this.colRowTemplate = targetInstruction.elementInstruction.colRowTemplate;
            this.colHeaderTemplate = targetInstruction.elementInstruction.colHeaderTemplate;
            this.colCss = targetInstruction.elementInstruction.colCss;
        }
        VGridElementColConfig.prototype.bind = function (bindingContext, overrideContext) {
            this.vGrid.colConfig.push({
                colWidth: this.colWidth ? this.colWidth * 1 : 100,
                colRowTemplate: this.colRowTemplate,
                colHeaderTemplate: this.colHeaderTemplate,
                colField: this.colField,
                colPinLeft: this.colPinLeft === 'true' ? true : false,
                colPinRight: this.colPinRight === 'true' ? true : false,
                colHeaderName: this.colHeaderName,
                colAddLabelAttributes: this.colAddLabelAttributes,
                colAddFilterAttributes: this.colAddFilterAttributes,
                colAddRowAttributes: this.colAddRowAttributes,
                colSort: this.colSort,
                colFilter: this.colFilter,
                colFilterTop: this.colFilterTop === 'true' ? true : false,
                colCss: this.colCss,
                colType: this.colType || 'text'
            });
        };
        __decorate([
            aurelia_framework_1.bindable({ attribute: 'col-width' }), 
            __metadata('design:type', Object)
        ], VGridElementColConfig.prototype, "colWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable({ attribute: 'col-field' }), 
            __metadata('design:type', Object)
        ], VGridElementColConfig.prototype, "colField", void 0);
        __decorate([
            aurelia_framework_1.bindable({ attribute: 'col-header-name' }), 
            __metadata('design:type', Object)
        ], VGridElementColConfig.prototype, "colHeaderName", void 0);
        __decorate([
            aurelia_framework_1.bindable({ attribute: 'col-sort' }), 
            __metadata('design:type', Object)
        ], VGridElementColConfig.prototype, "colSort", void 0);
        __decorate([
            aurelia_framework_1.bindable({ attribute: 'col-pin-left' }), 
            __metadata('design:type', Object)
        ], VGridElementColConfig.prototype, "colPinLeft", void 0);
        __decorate([
            aurelia_framework_1.bindable({ attribute: 'col-pin-right' }), 
            __metadata('design:type', Object)
        ], VGridElementColConfig.prototype, "colPinRight", void 0);
        __decorate([
            aurelia_framework_1.bindable({ attribute: 'col-filter' }), 
            __metadata('design:type', Object)
        ], VGridElementColConfig.prototype, "colFilter", void 0);
        __decorate([
            aurelia_framework_1.bindable({ attribute: 'col-filter-top' }), 
            __metadata('design:type', Object)
        ], VGridElementColConfig.prototype, "colFilterTop", void 0);
        __decorate([
            aurelia_framework_1.bindable({ attribute: 'col-add-label-attributes' }), 
            __metadata('design:type', Object)
        ], VGridElementColConfig.prototype, "colAddLabelAttributes", void 0);
        __decorate([
            aurelia_framework_1.bindable({ attribute: 'col-add-filter-attributes' }), 
            __metadata('design:type', Object)
        ], VGridElementColConfig.prototype, "colAddFilterAttributes", void 0);
        __decorate([
            aurelia_framework_1.bindable({ attribute: 'col-add-row-attributes' }), 
            __metadata('design:type', Object)
        ], VGridElementColConfig.prototype, "colAddRowAttributes", void 0);
        __decorate([
            aurelia_framework_1.bindable({ attribute: 'col-type' }), 
            __metadata('design:type', Object)
        ], VGridElementColConfig.prototype, "colType", void 0);
        VGridElementColConfig = __decorate([
            aurelia_framework_1.noView(),
            aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
                var headerTemplateElement = element.getElementsByTagName('V-HEADER-TEMPLATE')[0];
                var headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
                if (headerTemplateHtml !== '') {
                    instruction.colHeaderTemplate = headerTemplateHtml;
                }
                var rowTemplateElement = element.getElementsByTagName('V-ROW-TEMPLATE')[0];
                var rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
                if (rowTemplateHtml !== '') {
                    instruction.colRowTemplate = rowTemplateHtml;
                }
                element.innerHTML = '';
                var css = element.getAttribute('col-css');
                if (css) {
                    instruction.colCss = css;
                }
            }),
            aurelia_framework_1.customElement('v-grid-col'),
            aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction), 
            __metadata('design:paramtypes', [Element, v_grid_1.VGrid, Object])
        ], VGridElementColConfig);
        return VGridElementColConfig;
    }());
    exports.VGridElementColConfig = VGridElementColConfig;
});

//# sourceMappingURL=v-grid-col.js.map
