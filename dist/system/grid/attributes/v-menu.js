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
    var aurelia_framework_1, v_grid_1, VGridAttributeMenu;
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
            VGridAttributeMenu = (function () {
                function VGridAttributeMenu(element, vGrid) {
                    this.element = element;
                    this.controller = vGrid.controller;
                    this.raiseEvent = vGrid.controller.raiseEvent;
                    this.groupingElements = vGrid.groupingElements;
                    this.openBinded = this.open.bind(this);
                    this.checkBinded = this.check.bind(this);
                    this.callbackBinded = this.callback.bind(this);
                }
                VGridAttributeMenu.prototype.attached = function () {
                    this.element.addEventListener('contextmenu', this.openBinded);
                };
                VGridAttributeMenu.prototype.unbind = function () {
                    document.removeEventListener('click', this.checkBinded);
                };
                VGridAttributeMenu.prototype.check = function (e) {
                    var x = e.target.classList.contains('avg-menu__link');
                    if (!x) {
                        this.controller.contextMenu.setDefaults();
                        document.removeEventListener('click', this.checkBinded);
                    }
                };
                VGridAttributeMenu.prototype.callback = function (type, option, event) {
                    if (type === 'filter') {
                        if (option === 'clear') {
                            this.raiseEvent('filterClearCell', { attribute: this.filter.replace('rowRef.', ''), key: this.filterkey });
                            document.removeEventListener('click', this.checkBinded);
                            return true;
                        }
                        if (option === 'clearall') {
                            this.raiseEvent('filterClearAll', {});
                            document.removeEventListener('click', this.checkBinded);
                            return true;
                        }
                        if (option === 'showall') {
                            this.controller.attGridConnector.query(null);
                            document.removeEventListener('click', this.checkBinded);
                            return true;
                        }
                    }
                    if (type === 'sort') {
                        var field_1 = this.sort;
                        var arr = this.sort.split(';');
                        arr.forEach(function (x) {
                            if (x.indexOf('field') !== -1) {
                                field_1 = x.replace('field:', '');
                            }
                        });
                        this.controller.attGridConnector.orderBy({
                            attribute: field_1,
                            asc: option === 'desc' ? false : true
                        }, event.shiftKey);
                        document.removeEventListener('click', this.checkBinded);
                        return true;
                    }
                    if (type === 'hide') {
                        var x = this.getColumnContext();
                        var width = x.curColumnsArray[x.curColNo].width;
                        var count_1 = -1;
                        var columnsArraySorted_1 = [];
                        x.curColumnsArray.forEach(function (x) {
                            if (x.show) {
                                count_1++;
                            }
                            columnsArraySorted_1.push(x);
                        });
                        if (count_1) {
                            x.curColumnsArray[x.curColNo].show = false;
                            columnsArraySorted_1.sort(function (a, b) {
                                return a.left - b.left;
                            });
                            var appendValue_1 = 0;
                            columnsArraySorted_1.forEach(function (x) {
                                if (x.show) {
                                    x.left = appendValue_1;
                                    appendValue_1 = appendValue_1 + x.width;
                                }
                            });
                            if (x.curColType === 'main') {
                                this.controller.htmlHeightWidth.avgContentMainScroll_Width = this.controller.htmlHeightWidth.avgContentMainScroll_Width - width;
                                this.controller.htmlHeightWidth.avgContentHhandleScroll_Width = this.controller.htmlHeightWidth.avgContentHhandleScroll_Width - width;
                            }
                            if (x.curColType === 'right') {
                                this.controller.htmlHeightWidth.avgContentRight_Width = this.controller.htmlHeightWidth.avgContentRight_Width - width;
                                this.controller.htmlHeightWidth.avgHeaderRight_Width = this.controller.htmlHeightWidth.avgHeaderRight_Width - width;
                                this.controller.htmlHeightWidth.avgContentMain_Right = this.controller.htmlHeightWidth.avgContentMain_Right - width;
                                this.controller.htmlHeightWidth.avgHeaderMain_Right = this.controller.htmlHeightWidth.avgHeaderMain_Right - width;
                                this.controller.htmlHeightWidth.avgContentHhandle_Right = this.controller.htmlHeightWidth.avgContentHhandle_Right - width;
                            }
                            if (x.curColType === 'left') {
                                this.controller.htmlHeightWidth.avgContentLeft_Width = this.controller.htmlHeightWidth.avgContentLeft_Width - width;
                                this.controller.htmlHeightWidth.avgHeaderLeft_Width = this.controller.htmlHeightWidth.avgHeaderLeft_Width - width;
                                this.controller.htmlHeightWidth.avgContentMain_Left = this.controller.htmlHeightWidth.avgContentMain_Left - width;
                                this.controller.htmlHeightWidth.avgHeaderMain_Left = this.controller.htmlHeightWidth.avgHeaderMain_Left - width;
                                this.controller.htmlHeightWidth.avgContentHhandle_Left = this.controller.htmlHeightWidth.avgContentHhandle_Left - width;
                            }
                            return true;
                        }
                    }
                    if (type === 'groupby') {
                        var groupTitle = this.groupbytitle ? this.groupbytitle : this.groupby;
                        this.groupingElements.addGroup(groupTitle, this.groupby);
                        this.groupingElements.addToGrouping();
                        return true;
                    }
                    if (type === 'filterOption') {
                        var field_2 = this.filter;
                        var arr = this.filter.split(';');
                        arr.forEach(function (x) {
                            if (x.indexOf('field') !== -1) {
                                field_2 = x.replace('field:', '');
                            }
                        });
                        this.raiseEvent('filterUpdate', {
                            attribute: field_2,
                            operator: option,
                            key: this.filterkey
                        });
                        document.removeEventListener('click', this.checkBinded);
                        return true;
                    }
                    return false;
                };
                VGridAttributeMenu.prototype.open = function (e) {
                    this.check(e);
                    document.addEventListener('click', this.checkBinded);
                    e.preventDefault();
                    if (!this.controller.contextMenu.show) {
                        var clickCoords = this.getPosition(e);
                        this.controller.contextMenu.openMenu({
                            top: clickCoords.y,
                            left: clickCoords.x,
                            filter: this.filter,
                            sort: this.sort,
                            hideshow: this.hideshow,
                            pinned: this.pinned,
                            groupby: this.groupby,
                            callback: this.callbackBinded
                        });
                    }
                };
                VGridAttributeMenu.prototype.getPosition = function (e) {
                    var posx = 0;
                    var posy = 0;
                    if (e.pageX || e.pageY) {
                        posx = e.pageX;
                        posy = e.pageY;
                    }
                    else if (e.clientX || e.clientY) {
                        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                    }
                    return {
                        x: posx,
                        y: posy
                    };
                };
                VGridAttributeMenu.prototype.getColumnContext = function () {
                    var curTarget = this.element;
                    var count = 0;
                    var exit = true;
                    var isOk = false;
                    var curColType;
                    var curColNo;
                    var curContext;
                    var curColumnsArray;
                    while (exit) {
                        count++;
                        if (!curTarget) {
                            exit = false;
                        }
                        else {
                            switch (true) {
                                case curTarget.nodeName === 'AVG-COL':
                                    isOk = true;
                                    exit = false;
                                    break;
                                default:
                                    curTarget = curTarget.parentNode;
                                    break;
                            }
                        }
                        if (count > 10) {
                            exit = false;
                        }
                    }
                    if (isOk) {
                        curColType = curTarget.attributes.getNamedItem('data-avg-type').value;
                        curColNo = parseInt(curTarget.attributes.getNamedItem('data-avg-config-col').value, 10);
                        curContext = this.controller.columnBindingContext['setup' + curColType][curColNo];
                        curColumnsArray = this.controller.columnBindingContext['setup' + curColType];
                    }
                    return { curColType: curColType, curColNo: curColNo, curContext: curContext, curColumnsArray: curColumnsArray };
                };
                return VGridAttributeMenu;
            }());
            __decorate([
                aurelia_framework_1.bindable,
                __metadata("design:type", String)
            ], VGridAttributeMenu.prototype, "filter", void 0);
            __decorate([
                aurelia_framework_1.bindable,
                __metadata("design:type", String)
            ], VGridAttributeMenu.prototype, "filterkey", void 0);
            __decorate([
                aurelia_framework_1.bindable,
                __metadata("design:type", String)
            ], VGridAttributeMenu.prototype, "sort", void 0);
            __decorate([
                aurelia_framework_1.bindable,
                __metadata("design:type", String)
            ], VGridAttributeMenu.prototype, "pinned", void 0);
            __decorate([
                aurelia_framework_1.bindable,
                __metadata("design:type", String)
            ], VGridAttributeMenu.prototype, "groupby", void 0);
            __decorate([
                aurelia_framework_1.bindable,
                __metadata("design:type", String)
            ], VGridAttributeMenu.prototype, "hideshow", void 0);
            __decorate([
                aurelia_framework_1.bindable,
                __metadata("design:type", String)
            ], VGridAttributeMenu.prototype, "groupbytitle", void 0);
            VGridAttributeMenu = __decorate([
                aurelia_framework_1.customAttribute('v-menu'),
                aurelia_framework_1.inject(Element, v_grid_1.VGrid),
                __metadata("design:paramtypes", [Element, v_grid_1.VGrid])
            ], VGridAttributeMenu);
            exports_1("VGridAttributeMenu", VGridAttributeMenu);
        }
    };
});
