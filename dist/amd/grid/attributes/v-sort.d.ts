import { VGrid } from '../v-grid';
import { BindingContextInterface, OverrideContextInterface } from '../../interfaces';
export declare class VGridAttributesSort {
    private field;
    private asc;
    private vGrid;
    private element;
    private bindingContext;
    private overrideContext;
    private attribute;
    private sortIcon;
    private firstTime;
    constructor(element: HTMLElement, vGrid: VGrid);
    bind(bindingContext: BindingContextInterface, overrideContext: OverrideContextInterface): void;
    attached(): void;
    detached(): void;
    private getSortIconMarkup();
}
