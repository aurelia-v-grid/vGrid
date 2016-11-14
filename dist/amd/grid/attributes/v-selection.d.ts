import { VGrid } from '../v-grid';
import { Controller } from '../controller';
export declare class vGridAttributesSelection {
    element: any;
    vGrid: VGrid;
    controller: Controller;
    bindingContext: any;
    overrideContext: any;
    selected: any;
    type: any;
    selectedChanged(newValue: any, oldValue: any): void;
    constructor(element: any, vGrid: any);
    bind(bindingContext: any, overrideContext: any): void;
    attached(): void;
}
