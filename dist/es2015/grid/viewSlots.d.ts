import { ViewSlot, OverrideContext, HtmlCache, ColumnBindingContext, SelectionInterface } from '../interfaces';
export declare class ViewSlots {
    leftRowViewSlots: ViewSlot[];
    mainRowViewSlots: ViewSlot[];
    rightRowViewSlots: ViewSlot[];
    groupRowViewSlots: ViewSlot[];
    leftHeaderViewSlot: ViewSlot;
    mainHeaderViewSlot: ViewSlot;
    rightHeaderViewSlot: ViewSlot;
    mainViewSlot: ViewSlot;
    loadingScreenViewSlot: ViewSlot;
    footerViewSlot: ViewSlot;
    contextMenu: ViewSlot;
    groupingViewSlots: ViewSlot[];
    private rowCache;
    private headerCache;
    constructor(htmlCache: HtmlCache);
    bindAndAttachColumns(overrideContext: OverrideContext, columnBindingContext: ColumnBindingContext, curSelection: SelectionInterface): void;
    unbindAndDetachColumns(): void;
    clear(): void;
}
