import { VGrid } from '../v-grid';
import { BindingContext, OverrideContext } from '../../interfaces';
export declare class VGridAttributesFilter {
    private vGrid;
    private element;
    private value;
    private bindingContext;
    private overrideContext;
    private attribute;
    private filterOn;
    private filterOperator;
    private valueFormater;
    private type;
    private state;
    constructor(element: HTMLElement, vGrid: VGrid);
    attached(): void;
    bind(bindingContext: BindingContext, overrideContext: OverrideContext): void;
    private checkParams(value);
    private getValue();
    private resetValue();
    private updateFilter(curFilter);
    private valueConverters(value);
}
