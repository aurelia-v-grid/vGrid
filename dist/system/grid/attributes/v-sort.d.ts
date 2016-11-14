import { VGrid } from '../v-grid';
export declare class vGridAttributesSort {
    vGrid: VGrid;
    element: any;
    bindingContext: any;
    overrideContext: any;
    attribute: any;
    sortIcon: any;
    value: any;
    constructor(element: any, vGrid: any);
    bind(bindingContext: any, overrideContext: any): void;
    attached(): void;
    detached(): void;
    getSortIconMarkup(attribute: any): string;
}
