import { ViewSlot, OverrideContext, HtmlCache, ColumnBindingContext } from '../interfaces';
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
    private rowCache;
    private headerCache;
    constructor(htmlCache: HtmlCache);
    bindAndAttachColumns(overrideContext: OverrideContext, columnBindingContext: ColumnBindingContext): void;
    unbindAndDetachColumns(): void;
    clear(): void;
}
