var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../v-grid"], function (require, exports, aurelia_framework_1, v_grid_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var VGridAttributeMenu = (function () {
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
        VGridAttributeMenu.prototype.bind = function (context) {
            this.context = context;
        };
        VGridAttributeMenu.prototype.unbind = function () {
            document.removeEventListener('click', this.checkBinded);
        };
        VGridAttributeMenu.prototype.check = function (e) {
            var x = e.target.classList.contains('avg-menu__link');
            if (!x) {
                this.controller.contextMenu.setDefaults();
                document.removeEventListener('mousedown', this.checkBinded);
            }
        };
        VGridAttributeMenu.prototype.callback = function (type, option, event) {
            if (type === 'copypaste') {
                if (option === 'copy') {
                    this.controller.vGrid.copyPasteValueSharedContext = this.context.rowRef[this.copypaste];
                    return true;
                }
                if (option === 'paste') {
                    var sel = this.context.selection;
                    var rows = sel.getSelectedRows();
                    if (rows.length <= 1) {
                        this.context.rowRef[this.copypaste] = this.controller.vGrid.copyPasteValueSharedContext;
                    }
                    else {
                        rows = sel.getSelectedRows();
                        this.controller.updateRowData(this.copypaste, this.controller.vGrid.copyPasteValueSharedContext, rows);
                    }
                    return true;
                }
            }
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
                x.curColumnsArray.forEach(function (xy) {
                    if (xy.show) {
                        count_1++;
                    }
                    columnsArraySorted_1.push(xy);
                });
                if (count_1 || x.curColType !== 'main') {
                    x.curColumnsArray[x.curColNo].show = false;
                    columnsArraySorted_1.sort(function (a, b) {
                        return a.left - b.left;
                    });
                    var appendValue_1 = 0;
                    columnsArraySorted_1.forEach(function (xy) {
                        if (xy.show) {
                            xy.left = appendValue_1;
                            appendValue_1 = appendValue_1 + xy.width;
                        }
                    });
                    if (x.curColType === 'main') {
                        this.controller.htmlHeightWidth.removeWidthFromMain(width);
                    }
                    if (x.curColType === 'right') {
                        this.controller.htmlHeightWidth.removeWidthFromRight(width);
                    }
                    if (x.curColType === 'left') {
                        this.controller.htmlHeightWidth.removeWidthFromLeft(width);
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
            document.addEventListener('mousedown', this.checkBinded);
            e.preventDefault();
            if (!this.controller.contextMenu.show) {
                var clickCoords = this.getPosition(e);
                this.controller.contextMenu.openMenu({
                    top: clickCoords.y,
                    left: clickCoords.x,
                    filter: this.filter,
                    sort: this.sort,
                    hideshow: this.canHide() ? this.hideshow : null,
                    pinned: this.pinned,
                    copypaste: this.copypaste,
                    groupby: this.groupby,
                    callback: this.callbackBinded
                });
            }
        };
        VGridAttributeMenu.prototype.canHide = function () {
            var x = this.getColumnContext();
            var returnValue = false;
            var count = -1;
            var columnsArraySorted = [];
            x.curColumnsArray.forEach(function (xy) {
                if (xy.show) {
                    count++;
                }
                columnsArraySorted.push(xy);
            });
            if (count || x.curColType !== 'main') {
                returnValue = true;
            }
            return returnValue;
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
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", String)
        ], VGridAttributeMenu.prototype, "copypaste", void 0);
        VGridAttributeMenu = __decorate([
            aurelia_framework_1.customAttribute('v-menu'),
            aurelia_framework_1.inject(Element, v_grid_1.VGrid),
            __metadata("design:paramtypes", [Element, v_grid_1.VGrid])
        ], VGridAttributeMenu);
        return VGridAttributeMenu;
    }());
    exports.VGridAttributeMenu = VGridAttributeMenu;
});
//# sourceMappingURL=v-menu.js.map