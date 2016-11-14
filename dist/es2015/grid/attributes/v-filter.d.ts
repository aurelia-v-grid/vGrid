import { VGrid } from '../v-grid';
export declare class vGridAttributesFilter {
    vGrid: VGrid;
    element: any;
    value: any;
    bindingContext: any;
    overrideContext: any;
    attribute: string;
    values: Array<any>;
    filterOn: string;
    filterOperator: string;
    valueFormater: any;
    type: string;
    state: number;
    constructor(element: any, vGrid: any);
    readonly valueConverters: any;
    bind(bindingContext: any, overrideContext: any): void;
    checkParams(value: any): void;
    getValue(): any;
    resetValue(): void;
    updateFilter(curFilter: any): void;
    attached(): void;
}
