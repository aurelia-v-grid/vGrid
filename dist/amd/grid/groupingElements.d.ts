import { ViewCompiler, Container, ViewResources, HtmlCache, ColumnBindingContext, ViewSlots, Controller } from '../interfaces';
export declare class GroupingElements {
    private element;
    private htmlCache;
    private viewSlots;
    private viewCompiler;
    private container;
    private viewResources;
    private groupContext;
    private lastAdded;
    private colGroupElement;
    private controller;
    private avgTopPanel;
    private columnBindingContext;
    constructor(element: Element, viewCompiler: ViewCompiler, container: Container, viewResources: ViewResources, htmlCache: HtmlCache, viewSlots: ViewSlots, columnBindingContext: ColumnBindingContext);
    init(controller: Controller, colGroupElement: string): void;
    addGroup(name: string, field: string): void;
    removeGroup(name?: string): void;
    addToGrouping(): void;
    removeFromGrouping(field: string): void;
}
