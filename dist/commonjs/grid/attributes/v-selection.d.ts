import { VGrid } from '../v-grid';
import { BindingContext, OverrideContext } from '../../interfaces';
export declare class VGridAttributesSelection {
    private element;
    private vGrid;
    private controller;
    private bindingContext;
    private overrideContext;
    private selected;
    private type;
    constructor(element: HTMLInputElement, vGrid: VGrid);
    selectedChanged(newValue: boolean): void;
    bind(bindingContext: BindingContext, overrideContext: OverrideContext): void;
    attached(): void;
}
