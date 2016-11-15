import { HtmlCache } from '../interfaces';
export declare class RowMarkup {
    private element;
    private htmlCache;
    private left;
    private main;
    private right;
    private group;
    private rowHeight;
    constructor(element: Element, htmlCache: HtmlCache);
    init(rowHeight: number): void;
    private generateRows();
    private updateInternalHtmlCache();
}
