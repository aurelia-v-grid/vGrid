import { VGrid } from './v-grid';
import { CustomTargetInstruction } from '../interfaces';
export declare class VGridLoadingScreen {
    private element;
    private vGrid;
    private template;
    constructor(element: Element, vGrid: VGrid, targetInstruction: CustomTargetInstruction);
    bind(): void;
}
