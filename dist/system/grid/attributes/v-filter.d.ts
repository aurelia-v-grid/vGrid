import { VGrid } from '../v-grid';
import { BindingContextInterface, OverrideContextInterface } from '../../interfaces';
export declare class VGridAttributesFilter {
    private field;
    private operator;
    private converter;
    private keydown;
    private key;
    private vGrid;
    private element;
    private bindingContext;
    private overrideContext;
    private attribute;
    private filterOn;
    private filterOperator;
    private valueFormater;
    private type;
    private state;
    constructor(element: HTMLElement, vGrid: VGrid);
    getOperatorName(operator: string): string;
    attached(): void;
    bind(bindingContext: BindingContextInterface, overrideContext: OverrideContextInterface): void;
    private getValue();
    private resetValue();
    private updateFilter(curFilter);
    private valueConverters(value);
}
