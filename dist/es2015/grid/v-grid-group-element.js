var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject, noView, customElement, processContent, TargetInstruction } from 'aurelia-framework';
import { VGrid } from './v-grid';
var VGridGroupElement = (function () {
    function VGridGroupElement(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
    }
    VGridGroupElement.prototype.bind = function () {
        this.vGrid.colGroupElement = this.rowTemplate;
    };
    VGridGroupElement = __decorate([
        noView(),
        customElement('v-grid-group-element'),
        processContent(function (compiler, resources, element, instruction) {
            compiler = compiler;
            resources = resources;
            instruction.rowTemplate = element.innerHTML;
            element.innerHTML = '';
        }),
        inject(Element, VGrid, TargetInstruction),
        __metadata("design:paramtypes", [Element, VGrid, Object])
    ], VGridGroupElement);
    return VGridGroupElement;
}());
export { VGridGroupElement };
//# sourceMappingURL=v-grid-group-element.js.map