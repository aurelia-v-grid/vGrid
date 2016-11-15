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
    var aurelia_framework_1, v_grid_1, VGridAttributesSelection;
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
            VGridAttributesSelection = (function () {
                function VGridAttributesSelection(element, vGrid) {
                    this.vGrid = vGrid;
                    this.controller = vGrid.controller;
                    this.element = element;
                }
                VGridAttributesSelection.prototype.selectedChanged = function (newValue) {
                    if (this.type === 'row') {
                        this.element.checked = newValue;
                    }
                };
                VGridAttributesSelection.prototype.bind = function (bindingContext, overrideContext) {
                    this.bindingContext = bindingContext;
                    this.overrideContext = overrideContext;
                };
                VGridAttributesSelection.prototype.attached = function () {
                    var _this = this;
                    this.element.checked = this.selected;
                    this.element.onclick = function () {
                        var status = _this.element.checked === 'true' || _this.element.checked === true ? true : false;
                        if (status) {
                            if (_this.type === 'header') {
                                _this.bindingContext.selection.selectRange(0, _this.controller.collectionLength() - 1);
                                _this.controller.rowClickHandler.updateSelectionOnAllRows();
                            }
                            if (_this.type === 'row') {
                                _this.bindingContext.selection.select(_this.bindingContext.row, true);
                                _this.controller.rowClickHandler.updateSelectionOnAllRows();
                            }
                        }
                        else {
                            if (_this.type === 'header') {
                                _this.bindingContext.selection.deSelectAll();
                                _this.controller.rowClickHandler.updateSelectionOnAllRows();
                            }
                            if (_this.type === 'row') {
                                _this.bindingContext.selection.deSelect(_this.bindingContext.row);
                                _this.controller.rowClickHandler.updateSelectionOnAllRows();
                            }
                        }
                    };
                };
                return VGridAttributesSelection;
            }());
            __decorate([
                aurelia_framework_1.bindable,
                __metadata("design:type", Boolean)
            ], VGridAttributesSelection.prototype, "selected", void 0);
            __decorate([
                aurelia_framework_1.bindable,
                __metadata("design:type", String)
            ], VGridAttributesSelection.prototype, "type", void 0);
            VGridAttributesSelection = __decorate([
                aurelia_framework_1.customAttribute('v-selection'),
                aurelia_framework_1.inject(Element, v_grid_1.VGrid),
                __metadata("design:paramtypes", [HTMLInputElement, v_grid_1.VGrid])
            ], VGridAttributesSelection);
            exports_1("VGridAttributesSelection", VGridAttributesSelection);
        }
    };
});

//# sourceMappingURL=v-selection.js.map
