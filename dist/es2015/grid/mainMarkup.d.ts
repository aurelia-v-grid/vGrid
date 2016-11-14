import { ViewCompiler, Container, ViewResources, ViewFactory, View } from 'aurelia-framework';
import { ViewSlots } from './viewSlots';
import { HtmlHeightWidth } from './htmlHeightWidth';
export declare class MainMarkup {
    element: any;
    viewCompiler: ViewCompiler;
    container: Container;
    viewResources: ViewResources;
    htmlHeightWidth: HtmlHeightWidth;
    viewSlots: ViewSlots;
    viewFactory: ViewFactory;
    view: View;
    constructor(element: any, viewCompiler: any, container: any, viewResources: any, htmlHeightWidth: any, viewSlots: any);
    generateMainMarkup(): void;
}
