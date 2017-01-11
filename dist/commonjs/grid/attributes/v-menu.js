var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
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
                this.raiseEvent('filterClearCell', { attribute: this.filter.replace('rowRef.', '') });
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
        if (type === 'groupby') {
            this.groupingElements.addGroup(this.groupby, this.groupby);
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
                operator: option
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
    return VGridAttributeMenu;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributeMenu.prototype, "filter", void 0);
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
VGridAttributeMenu = __decorate([
    aurelia_framework_1.customAttribute('v-menu'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [Element, v_grid_1.VGrid])
], VGridAttributeMenu);
exports.VGridAttributeMenu = VGridAttributeMenu;

//# sourceMappingURL=v-menu.js.map
