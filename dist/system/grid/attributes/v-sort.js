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
    var aurelia_framework_1, v_grid_1, VGridAttributesSort;
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
            VGridAttributesSort = (function () {
                function VGridAttributesSort(element, vGrid) {
                    this.firstTime = true;
                    this.vGrid = vGrid;
                    this.element = element;
                }
                VGridAttributesSort.prototype.bind = function (bindingContext, overrideContext) {
                    this.bindingContext = bindingContext;
                    this.overrideContext = overrideContext;
                    this.attribute = this.field;
                };
                VGridAttributesSort.prototype.attached = function () {
                    var _this = this;
                    this.sortIcon = document.createElement('i');
                    this.sortIcon.innerHTML = this.getSortIconMarkup();
                    this.element.appendChild(this.sortIcon);
                    this.element.onmousedown = function () {
                        _this.element.onmouseup = function (e) {
                            if (e.button === 0) {
                                if (_this.firstTime && _this.asc === 'false') {
                                    _this.vGrid.attGridConnector.orderBy({ attribute: _this.attribute, asc: false }, e.shiftKey);
                                }
                                else {
                                    _this.vGrid.attGridConnector.orderBy(_this.attribute, e.shiftKey);
                                }
                            }
                        };
                        setTimeout(function () {
                            _this.element.onmouseup = null;
                        }, 300);
                    };
                    this.vGrid.element.addEventListener('sortIconUpdate', function () {
                        _this.sortIcon.innerHTML = _this.getSortIconMarkup();
                    });
                };
                VGridAttributesSort.prototype.detached = function () {
                    this.element.removeChild(this.sortIcon);
                };
                VGridAttributesSort.prototype.getSortIconMarkup = function () {
                    var _this = this;
                    var markup = "";
                    var isAscHtml = "<svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 6L3 10h1.5L8 7l3.4 3H13L8.5 6h-1z\"/>\n                      </svg>";
                    var isDescHtml = "<svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 10L3 6h1.5L8 9.2 11.3 6H13l-4.5 4h-1z\"/>\n                      </svg>";
                    var sortlength = this.vGrid.attGridConnector.getCurrentOrderBy().length;
                    this.vGrid.attGridConnector.getCurrentOrderBy().forEach(function (x) {
                        if (x.attribute === _this.attribute) {
                            _this.firstTime = false;
                            var block = x.asc === true ? isAscHtml : isDescHtml;
                            var main = '';
                            if (sortlength > 1) {
                                main = "<i class=\"" + 'avg-fa-sort-number' + "\" data-vgridsort=\"" + x.no + "\"></i>";
                            }
                            markup = block + main;
                        }
                    });
                    return markup;
                };
                return VGridAttributesSort;
            }());
            __decorate([
                aurelia_framework_1.bindable,
                __metadata("design:type", String)
            ], VGridAttributesSort.prototype, "field", void 0);
            __decorate([
                aurelia_framework_1.bindable,
                __metadata("design:type", String)
            ], VGridAttributesSort.prototype, "asc", void 0);
            VGridAttributesSort = __decorate([
                aurelia_framework_1.customAttribute('v-sort'),
                aurelia_framework_1.inject(Element, v_grid_1.VGrid),
                __metadata("design:paramtypes", [HTMLElement, v_grid_1.VGrid])
            ], VGridAttributesSort);
            exports_1("VGridAttributesSort", VGridAttributesSort);
        }
    };
});

//# sourceMappingURL=v-sort.js.map
