import { ViewSlot } from 'aurelia-framework';
export declare class ViewSlots {
    leftRowViewSlots: Array<ViewSlot>;
    mainRowViewSlots: Array<ViewSlot>;
    rightRowViewSlots: Array<ViewSlot>;
    groupRowViewSlots: Array<ViewSlot>;
    leftHeaderViewSlot: ViewSlot;
    mainHeaderViewSlot: ViewSlot;
    rightHeaderViewSlot: ViewSlot;
    mainViewSlot: ViewSlot;
    loadingScreenViewSlot: ViewSlot;
    contextMenu: ViewSlot;
    groupingViewSlots: Array<ViewSlot>;
    constructor();
    bindAndAttachColumns(overrideContext: any, columnBindingContext: any): void;
    unbindAndDetachColumns(): void;
}
