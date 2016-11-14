import { ViewCompiler, Container, ViewResources } from 'aurelia-framework';
import { HtmlCache } from './htmlCache';
import { ViewSlots } from './viewSlots';
import { Controller } from './controller';
export declare class GroupingElements {
    element: any;
    htmlCache: HtmlCache;
    viewSlots: ViewSlots;
    viewCompiler: ViewCompiler;
    container: Container;
    viewResources: ViewResources;
    groupContext: any;
    lastAdded: any;
    controller: Controller;
    avgTopPanel: any;
    constructor(element: any, viewCompiler: any, container: any, viewResources: any, htmlCache: any, viewSlots: any, columnBindingContext: any);
    init(controller: any): void;
    addGroup(name: any, field: any): void;
    removeGroup(name: any): void;
    addToGrouping(): void;
    removeFromGrouping(field: any): void;
}
