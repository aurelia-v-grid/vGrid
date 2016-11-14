import { VGrid } from './v-grid';
export declare class VGridElementRowRepeat {
    element: Element;
    vGrid: VGrid;
    rowTemplate: string;
    headerTemplate: string;
    constructor(element: any, vGrid: any, targetInstruction: any);
    bind(): void;
}
