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
                    var isAscHtml = "<svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.2393106 1.00117874C5.1581979 3.33755754 3.0770851 5.6739366.99597235 8.0103152H3.1866173c1.6024163-1.84237835 3.2048325-3.6847569 4.8072488-5.52713536 1.6024163 1.84237846 3.2048329 3.684757 4.8072489 5.52713537h2.190645c-2.081113-2.3363786-4.162226-4.67275766-6.2433384-7.00913646h-1.509111z\"/>\n                      </svg>";
                    var isDescHtml = "<svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.2393106 15.0272644C5.1581979 12.6908856 3.0770851 10.35450654.99597235 8.01812793H3.1866173c1.6024163 1.84237836 3.2048325 3.6847569 4.8072488 5.52713537 1.6024163-1.84237846 3.2048329-3.684757 4.8072489-5.52713537h2.190645c-2.081113 2.3363786-4.162226 4.67275767-6.2433384 7.00913647h-1.509111z\"/>\n                      </svg>";
                    this.vGrid.attGridConnector.getCurrentOrderBy().forEach(function (x) {
                        if (x.attribute === _this.attribute) {
                            _this.firstTime = false;
                            var block = x.asc === true ? isAscHtml : isDescHtml;
                            var main = "<i class=\"" + 'avg-fa-sort-number' + "\" data-vgridsort=\"" + x.no + "\"></i>";
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
