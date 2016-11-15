import { ViewCompiler, Container, ViewResources, ViewSlots, HtmlHeightWidth } from '../interfaces';
export declare class MainMarkup {
    private element;
    private viewCompiler;
    private container;
    private viewResources;
    private htmlHeightWidth;
    private viewSlots;
    private viewFactory;
    private view;
    constructor(element: Element, viewCompiler: ViewCompiler, container: Container, viewResources: ViewResources, htmlHeightWidth: HtmlHeightWidth, viewSlots: ViewSlots);
    generateMainMarkup(): void;
}
