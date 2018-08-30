import { VGrid } from '../v-grid';
import { BindingContextInterface, OverrideContextInterface } from '../../interfaces';
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
    private isSet;
    constructor(element: HTMLElement, vGrid: VGrid);
    attached(): void;
    valueChanged(newValue: any): void;
    onFocus(): void;
    onBlur(): void;
    onChanged(): void;
    bind(bindingContext: BindingContextInterface, overrideContext: OverrideContextInterface): void;
    private valueConverters;
}
