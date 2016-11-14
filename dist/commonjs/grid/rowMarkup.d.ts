import { HtmlCache } from './htmlCache';
export declare class RowMarkup {
    element: Element;
    htmlCache: HtmlCache;
    left: any;
    main: any;
    right: any;
    full: any;
    rowHeight: number;
    constructor(element: Element, htmlCache: HtmlCache);
    updateInternalHtmlCache(): void;
    init(rowHeight: any): void;
    generateRows(): void;
}
