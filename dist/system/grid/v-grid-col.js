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
    var aurelia_framework_1, v_grid_1, VGridElementColConfig;
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
            VGridElementColConfig = (function () {
                function VGridElementColConfig(element, vGrid, targetInstruction) {
                    this.vGrid = vGrid;
                    this.element = element;
                    this.colRowTemplate = targetInstruction.elementInstruction.colRowTemplate;
                    this.colHeaderTemplate = targetInstruction.elementInstruction.colHeaderTemplate;
                    this.colCss = targetInstruction.elementInstruction.colCss;
                }
                VGridElementColConfig.prototype.bind = function (bindingContext, overrideContext) {
                    this.bindingContext = bindingContext;
                    this.overrideContext = overrideContext;
                    this.vGrid.colConfig.push({
                        colWidth: this.colWidth ? this.colWidth * 1 : 100,
                        colRowTemplate: this.colRowTemplate,
                        colHeaderTemplate: this.colHeaderTemplate,
                        colField: this.colField,
                        colPinLeft: this.checkBool(this.colPinLeft),
                        colPinRight: this.checkBool(this.colPinRight),
                        colHeaderName: this.colHeaderName,
                        colFilterMenu: this.colFilterMenu,
                        colLabelMenu: this.colLabelMenu,
                        colRowMenu: this.colRowMenu,
                        colHidden: this.checkBool(this.colHidden),
                        colDragDrop: this.colDragDrop,
                        colResizeable: this.colResizeable,
                        colAddLabelAttributes: this.colAddLabelAttributes,
                        colAddFilterAttributes: this.colAddFilterAttributes,
                        colAddRowAttributes: this.colAddRowAttributes,
                        colSort: this.colSort,
                        colFilter: this.colFilter,
                        colFilterTop: this.checkBool(this.colFilterTop),
                        colCss: this.colCss,
                        colType: this.colType || 'text'
                    });
                };
                VGridElementColConfig.prototype.checkBool = function (value) {
                    if (typeof value === 'string') {
                        value = value.toLowerCase();
                    }
                    switch (true) {
                        case value === 'true':
                        case value === true:
                            value = true;
                            break;
                        case value === 'false':
                        case value === false:
                            value = false;
                            break;
                        default:
                            value = false;
                            break;
                    }
                    return value;
                };
                return VGridElementColConfig;
            }());
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-width' }),
                __metadata("design:type", Number)
            ], VGridElementColConfig.prototype, "colWidth", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-field' }),
                __metadata("design:type", String)
            ], VGridElementColConfig.prototype, "colField", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-header-name' }),
                __metadata("design:type", String)
            ], VGridElementColConfig.prototype, "colHeaderName", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-sort' }),
                __metadata("design:type", String)
            ], VGridElementColConfig.prototype, "colSort", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-pin-left' }),
                __metadata("design:type", Boolean)
            ], VGridElementColConfig.prototype, "colPinLeft", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-pin-right' }),
                __metadata("design:type", Boolean)
            ], VGridElementColConfig.prototype, "colPinRight", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-filter' }),
                __metadata("design:type", String)
            ], VGridElementColConfig.prototype, "colFilter", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-filter-top' }),
                __metadata("design:type", Boolean)
            ], VGridElementColConfig.prototype, "colFilterTop", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-add-label-attributes' }),
                __metadata("design:type", String)
            ], VGridElementColConfig.prototype, "colAddLabelAttributes", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-add-filter-attributes' }),
                __metadata("design:type", String)
            ], VGridElementColConfig.prototype, "colAddFilterAttributes", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-add-row-attributes' }),
                __metadata("design:type", String)
            ], VGridElementColConfig.prototype, "colAddRowAttributes", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-type' }),
                __metadata("design:type", String)
            ], VGridElementColConfig.prototype, "colType", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-filter-menu' }),
                __metadata("design:type", String)
            ], VGridElementColConfig.prototype, "colFilterMenu", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-label-menu' }),
                __metadata("design:type", String)
            ], VGridElementColConfig.prototype, "colLabelMenu", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-row-menu' }),
                __metadata("design:type", String)
            ], VGridElementColConfig.prototype, "colRowMenu", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-hidden' }),
                __metadata("design:type", Boolean)
            ], VGridElementColConfig.prototype, "colHidden", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-drag-drop' }),
                __metadata("design:type", String)
            ], VGridElementColConfig.prototype, "colDragDrop", void 0);
            __decorate([
                aurelia_framework_1.bindable({ attribute: 'col-resizeable' }),
                __metadata("design:type", String)
            ], VGridElementColConfig.prototype, "colResizeable", void 0);
            VGridElementColConfig = __decorate([
                aurelia_framework_1.noView(),
                aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
                    compiler = null;
                    resources = null;
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
                __metadata("design:paramtypes", [Element, v_grid_1.VGrid, Object])
            ], VGridElementColConfig);
            exports_1("VGridElementColConfig", VGridElementColConfig);
        }
    };
});

//# sourceMappingURL=v-grid-col.js.map
