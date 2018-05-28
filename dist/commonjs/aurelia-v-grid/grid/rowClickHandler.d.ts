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
    private addEventlistener();
    private getCache(target);
    private singleClick(event);
    private doubleClick(event);
    private isSelected(row);
    private deSelect(row);
    private select(row, addToSelection);
    private selectRange(start, end);
    private getSelectedRows();
    private setSelectedRows(newRows);
    private highlightRow(e, currentRow);
}
