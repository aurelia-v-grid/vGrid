System.register(["aurelia-framework", "./v-grid"], function (exports_1, context_1) {
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
    var aurelia_framework_1, v_grid_1, VGridElementRowRepeat;
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
            VGridElementRowRepeat = (function () {
                function VGridElementRowRepeat(element, vGrid, targetInstruction) {
                    this.element = element;
                    this.vGrid = vGrid;
                    this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
                    this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;
                }
                VGridElementRowRepeat.prototype.bind = function () {
                    this.vGrid.colRepeater = true;
                    this.vGrid.colRepeatRowTemplate = this.rowTemplate;
                    this.vGrid.colRepeatRowHeaderTemplate = this.headerTemplate;
                };
                return VGridElementRowRepeat;
            }());
            VGridElementRowRepeat = __decorate([
                aurelia_framework_1.noView(),
                aurelia_framework_1.customElement('v-grid-row-repeat'),
                aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
                    compiler = null;
                    resources = null;
                    var headerTemplateElement = element.getElementsByTagName('V-HEADER-TEMPLATE')[0];
                    var headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
                    if (headerTemplateHtml !== '') {
                        instruction.headerTemplate = headerTemplateHtml;
                    }
                    var rowTemplateElement = element.getElementsByTagName('V-ROW-TEMPLATE')[0];
                    var rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
                    if (rowTemplateHtml !== '') {
                        instruction.rowTemplate = rowTemplateHtml;
                    }
                    if (!rowTemplateHtml) {
                        instruction.rowTemplate = element.innerHTML;
                    }
                    element.innerHTML = '';
                }),
                aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
                __metadata("design:paramtypes", [Element, v_grid_1.VGrid, Object])
            ], VGridElementRowRepeat);
            exports_1("VGridElementRowRepeat", VGridElementRowRepeat);
        }
    };
});

//# sourceMappingURL=v-grid-row-repeat.js.map
