import { VGrid } from '../v-grid';
import { BindingContextInterface, OverrideContextInterface } from '../../interfaces';
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
    bind(bindingContext: BindingContextInterface, overrideContext: OverrideContextInterface): void;
    attached(): void;
}
