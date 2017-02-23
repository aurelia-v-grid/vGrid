import { ViewSlot, OverrideContextInterface, HtmlCache, ColumnBindingContext, SelectionInterface } from '../interfaces';
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
    bindAndAttachColumns(overrideContext: OverrideContextInterface, columnBindingContext: ColumnBindingContext, curSelection: SelectionInterface): void;
    unbindAndDetachColumns(): void;
    clear(): void;
}
