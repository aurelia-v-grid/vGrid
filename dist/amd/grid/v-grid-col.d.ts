import { VGrid } from './v-grid';
import { BindingContextInterface, CustomTargetInstruction, OverrideContextInterface } from '../interfaces';
export declare class VGridElementColConfig {
    private vGrid;
    private element;
    private colRowTemplate;
    private colHeaderTemplate;
    private colCss;
    private bindingContext;
    private overrideContext;
    private colWidth;
    private colField;
    private colHeaderName;
    private colSort;
    private colPinLeft;
    private colPinRight;
    private colFilter;
    private colFilterTop;
    private colAddLabelAttributes;
    private colAddFilterAttributes;
    private colAddRowAttributes;
    private colType;
    private colFilterMenu;
    private colLabelMenu;
    private colRowMenu;
    private colHidden;
    private colDragDrop;
    private colResizeable;
    private colDisplayEdit;
    constructor(element: Element, vGrid: VGrid, targetInstruction: CustomTargetInstruction);
    bind(bindingContext: BindingContextInterface, overrideContext: OverrideContextInterface): void;
    private checkBool;
}
