import { VGrid } from '../v-grid';
import { BindingContext, OverrideContext } from '../../interfaces';
export declare class VGridAttributesOnChange {
    private vGrid;
    private element;
    private bindingContext;
    private overrideContext;
    constructor(element: HTMLElement, vGrid: VGrid);
    attached(): void;
    onChanged(): void;
    bind(bindingContext: BindingContext, overrideContext: OverrideContext): void;
}
