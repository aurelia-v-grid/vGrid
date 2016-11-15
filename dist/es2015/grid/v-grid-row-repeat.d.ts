import { VGrid } from './v-grid';
import { CustomTargetInstruction } from '../interfaces';
export declare class VGridElementRowRepeat {
    private element;
    private vGrid;
    private rowTemplate;
    private headerTemplate;
    constructor(element: Element, vGrid: VGrid, targetInstruction: CustomTargetInstruction);
    bind(): void;
}
