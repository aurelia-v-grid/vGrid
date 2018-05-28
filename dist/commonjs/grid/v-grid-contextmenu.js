var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var VGridContextmenu = (function () {
    function VGridContextmenu(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.customMenuTemplates = targetInstruction.elementInstruction.menuTemplates;
    }
    VGridContextmenu.prototype.bind = function () {
        this.vGrid.customMenuTemplates = this.customMenuTemplates;
    };
    VGridContextmenu = __decorate([
        aurelia_framework_1.noView(),
        aurelia_framework_1.customElement('v-grid-contextmenu'),
        aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
            compiler = compiler;
            resources = resources;
            instruction.menuTemplates = {};
            var template;
            var templateHTML;
            template = element.getElementsByTagName('V-MENU-CLOSE')[0];
            templateHTML = template ? template.innerHTML : null;
            if (templateHTML !== '') {
                instruction.menuTemplates.close = templateHTML;
            }
            template = element.getElementsByTagName('V-MENU-PINNED')[0];
            templateHTML = template ? template.innerHTML : null;
            if (templateHTML !== '') {
                instruction.menuTemplates.pinned = templateHTML;
            }
            template = element.getElementsByTagName('V-MENU-GROUPBY')[0];
            templateHTML = template ? template.innerHTML : null;
            if (templateHTML !== '') {
                instruction.menuTemplates.groupby = templateHTML;
            }
            template = element.getElementsByTagName('V-MENU-HIDE')[0];
            templateHTML = template ? template.innerHTML : null;
            if (templateHTML !== '') {
                instruction.menuTemplates.hide = templateHTML;
            }
            template = element.getElementsByTagName('V-MENU-COPYPASTE')[0];
            templateHTML = template ? template.innerHTML : null;
            if (templateHTML !== '') {
                instruction.menuTemplates.copypaste = templateHTML;
            }
            template = element.getElementsByTagName('V-MENU-CHOOSER')[0];
            templateHTML = template ? template.innerHTML : null;
            if (templateHTML !== '') {
                instruction.menuTemplates.chooser = templateHTML;
            }
            template = element.getElementsByTagName('V-MENU-CHOOSER-OPTIONS')[0];
            templateHTML = template ? template.innerHTML : null;
            if (templateHTML !== '') {
                instruction.menuTemplates.chooserOptions = templateHTML;
            }
            template = element.getElementsByTagName('V-MENU-SORT')[0];
            templateHTML = template ? template.innerHTML : null;
            if (templateHTML !== '') {
                instruction.menuTemplates.sort = templateHTML;
            }
            template = element.getElementsByTagName('V-MENU-FILTER')[0];
            templateHTML = template ? template.innerHTML : null;
            if (templateHTML !== '') {
                instruction.menuTemplates.filter = templateHTML;
            }
            template = element.getElementsByTagName('V-MENU-FILTER-OPTIONS')[0];
            templateHTML = template ? template.innerHTML : null;
            if (templateHTML !== '') {
                instruction.menuTemplates.filterOptions = templateHTML;
            }
            template = element.getElementsByTagName('V-MENU-ALL')[0];
            templateHTML = template ? template.innerHTML : null;
            if (templateHTML !== '') {
                instruction.menuTemplates.all = templateHTML;
            }
            element.innerHTML = '';
        }),
        aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
        __metadata("design:paramtypes", [Element, v_grid_1.VGrid, Object])
    ], VGridContextmenu);
    return VGridContextmenu;
}());
exports.VGridContextmenu = VGridContextmenu;
//# sourceMappingURL=v-grid-contextmenu.js.map