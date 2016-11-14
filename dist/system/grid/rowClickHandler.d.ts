import { HtmlCache } from './htmlCache';
import { Controller } from './controller';
export declare class RowClickHandler {
    element: Element;
    htmlCache: HtmlCache;
    selectionMode: string;
    lastRowSelected: number;
    lastKeyKodeUsed: string;
    selectedRows: number;
    controller: Controller;
    selection: any;
    manualSelection: boolean;
    constructor(element: Element, htmlCache: HtmlCache);
    init(mode: boolean, manualSelection: boolean, controller: Controller): void;
    addEventlistener(): void;
    removeEventlistener(): void;
    singleClick(event: any): void;
    isNormalRow(): void;
    doubleClick(event: any): void;
    isSelected(row: any): any;
    deSelect(row: any): void;
    select(row: any, addToSelection: any): void;
    selectRange(start: any, end: any): void;
    getSelectedRows(): any;
    setSelectedRows(newRows: any): void;
    getSelectionMode(): any;
    updateSelectionOnAllRows(): void;
    highlightRow(e: any, currentRow: any): void;
}
