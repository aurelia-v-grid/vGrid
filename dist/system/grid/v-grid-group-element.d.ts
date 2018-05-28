import { VGrid } from './v-grid';
import { CustomTargetInstruction } from '../interfaces';
export declare class VGridGroupElement {
    private element;
    private vGrid;
    private rowTemplate;
    constructor(element: Element, vGrid: VGrid, targetInstruction: CustomTargetInstruction);
    bind(): void;
}
