import { VGrid } from './v-grid';
import { CustomTargetInstruction } from '../interfaces';
export declare class VGridFooter {
    private element;
    private vGrid;
    private template;
    constructor(element: Element, vGrid: VGrid, targetInstruction: CustomTargetInstruction);
    bind(): void;
}
