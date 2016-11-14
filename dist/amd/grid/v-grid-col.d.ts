import { VGrid } from './v-grid';
export declare class VGridElementColConfig {
    vGrid: VGrid;
    element: Element;
    colRowTemplate: string;
    colHeaderTemplate: string;
    colCss: string;
    colWidth: any;
    colField: any;
    colHeaderName: any;
    colSort: any;
    colPinLeft: any;
    colPinRight: any;
    colFilter: any;
    colFilterTop: any;
    colAddLabelAttributes: any;
    colAddFilterAttributes: any;
    colAddRowAttributes: any;
    colType: any;
    constructor(element: any, vGrid: any, targetInstruction: any);
    bind(bindingContext: any, overrideContext: any): void;
}
