System.register(['aurelia-framework', '../v-grid'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var aurelia_framework_1, v_grid_1;
    var vGridAttributesSelection;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (v_grid_1_1) {
                v_grid_1 = v_grid_1_1;
            }],
        execute: function() {
            vGridAttributesSelection = (function () {
                function vGridAttributesSelection(element, vGrid) {
                    this.vGrid = vGrid;
                    this.controller = vGrid.controller;
                    this.element = element;
                }
                vGridAttributesSelection.prototype.selectedChanged = function (newValue, oldValue) {
                    if (this.type === "row") {
                        this.element.checked = newValue;
                    }
                };
                vGridAttributesSelection.prototype.bind = function (bindingContext, overrideContext) {
                    this.bindingContext = bindingContext;
                    this.overrideContext = overrideContext;
                };
                vGridAttributesSelection.prototype.attached = function () {
                    var _this = this;
                    this.element.checked = this.selected;
                    this.element.onclick = function () {
                        var status = _this.element.checked === "true" || _this.element.checked === true ? true : false;
                        if (status) {
                            if (_this.type === "header") {
                                _this.bindingContext.selection.selectRange(0, _this.controller.collectionLength() - 1);
                                _this.controller.rowClickHandler.updateSelectionOnAllRows();
                            }
                            if (_this.type === "row") {
                                _this.bindingContext.selection.select(_this.bindingContext.row, true);
                                _this.controller.rowClickHandler.updateSelectionOnAllRows();
                            }
                        }
                        else {
                            if (_this.type === "header") {
                                _this.bindingContext.selection.deSelectAll();
                                _this.controller.rowClickHandler.updateSelectionOnAllRows();
                            }
                            if (_this.type === "row") {
                                _this.bindingContext.selection.deSelect(_this.bindingContext.row, true);
                                _this.controller.rowClickHandler.updateSelectionOnAllRows();
                            }
                        }
                    };
                };
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], vGridAttributesSelection.prototype, "selected", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], vGridAttributesSelection.prototype, "type", void 0);
                vGridAttributesSelection = __decorate([
                    aurelia_framework_1.customAttribute('v-selection'),
                    aurelia_framework_1.inject(Element, v_grid_1.VGrid), 
                    __metadata('design:paramtypes', [Object, Object])
                ], vGridAttributesSelection);
                return vGridAttributesSelection;
            }());
            exports_1("vGridAttributesSelection", vGridAttributesSelection);
        }
    }
});

//# sourceMappingURL=v-selection.js.map
