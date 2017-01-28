import { VGrid } from '../v-grid';
import { BindingContext, OverrideContext } from '../../interfaces';
export declare class VGridAttributesDataHandler {
    private field;
    private value;
    private display;
    private edit;
    private vGrid;
    private element;
    private bindingContext;
    private overrideContext;
    private displayFormater;
    private editFormater;
    private tempValue;
    constructor(element: HTMLElement, vGrid: VGrid);
    attached(): void;
    valueChanged(newValue: any): void;
    onFocus(): void;
    onBlur(): void;
    onChanged(): void;
    bind(bindingContext: BindingContext, overrideContext: OverrideContext): void;
    private valueConverters(value);
}
