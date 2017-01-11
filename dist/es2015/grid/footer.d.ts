import { ViewCompiler, Container, ViewResources, ViewSlots } from '../interfaces';
import { OverrideContext, HtmlCache } from '../interfaces';
export declare class Footer {
    private htmlCache;
    private viewSlots;
    private viewCompiler;
    private container;
    private viewResources;
    private overrideContext;
    constructor(htmlCache: HtmlCache, viewCompiler: ViewCompiler, container: Container, viewResources: ViewResources, viewSlots: ViewSlots);
    init(overrideContext: OverrideContext, footerStringTemplate: string): void;
}
