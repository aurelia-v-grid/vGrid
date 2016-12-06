import { VGrid } from '../v-grid';
import { BindingContext, OverrideContext } from '../../interfaces';
export declare class VGridAttributesFilterObserver {
    private field;
    private operator;
    private converter;
    private value;
    private vGrid;
    private element;
    private bindingContext;
    private overrideContext;
    private attribute;
    private filterOperator;
    private valueFormater;
    private state;
    constructor(element: HTMLElement, vGrid: VGrid);
    valueChanged(newValue: any): void;
    bind(bindingContext: BindingContext, overrideContext: OverrideContext): void;
    private getValue();
    private updateFilter();
    private valueConverters(value);
}
