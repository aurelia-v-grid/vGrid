import { VGrid } from '../v-grid';
export declare class VGridAttributeMenu {
    private element;
    private controller;
    private raiseEvent;
    private openBinded;
    private checkBinded;
    private callbackBinded;
    private groupingElements;
    private filter;
    private sort;
    private pinned;
    private groupby;
    constructor(element: Element, vGrid: VGrid);
    attached(): void;
    unbind(): void;
    private check(e);
    private callback(type, option, event);
    private open(e);
    private getPosition(e);
}
