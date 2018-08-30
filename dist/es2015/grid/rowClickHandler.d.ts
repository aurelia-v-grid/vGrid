import { HtmlCache, Controller } from '../interfaces';
export declare class RowClickHandler {
    private element;
    private htmlCache;
    private selectionMode;
    private lastRowSelected;
    private lastKeyKodeUsed;
    private selectedRows;
    private controller;
    private getSelection;
    private manualSelection;
    constructor(element: Element, htmlCache: HtmlCache);
    init(mode: boolean, manualSelection: boolean, controller: Controller): void;
    updateSelectionOnAllRows(): void;
    getSelectionMode(): string;
    removeEventlistener(): void;
    private addEventlistener;
    private getCache;
    private singleClick;
    private doubleClick;
    private isSelected;
    private deSelect;
    private select;
    private selectRange;
    private getSelectedRows;
    private setSelectedRows;
    private highlightRow;
}
