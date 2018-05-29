import { VGrid } from '../v-grid';
import { BindingContextInterface, OverrideContextInterface } from '../../interfaces';
export declare class VGridAttributesImageFix {
    private vGrid;
    private element;
    private value;
    private bindingContext;
    private overrideContext;
    constructor(element: HTMLImageElement, vGrid: VGrid);
    valueChanged(newValue: string): void;
    bind(bindingContext: BindingContextInterface, overrideContext: OverrideContextInterface): void;
}
