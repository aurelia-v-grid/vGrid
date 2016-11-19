import { VGrid } from './v-grid';
import { CustomTargetInstruction } from '../interfaces';
export declare class VGridContextmenu {
    private element;
    private vGrid;
    private customMenuTemplates;
    constructor(element: Element, vGrid: VGrid, targetInstruction: CustomTargetInstruction);
    bind(): void;
}
