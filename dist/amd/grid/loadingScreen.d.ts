import { ViewCompiler, Container, ViewResources } from 'aurelia-framework';
import { ViewSlots } from './viewSlots';
export declare class LoadingScreen {
    element: any;
    viewSlots: ViewSlots;
    viewCompiler: ViewCompiler;
    container: Container;
    viewResources: ViewResources;
    loading: boolean;
    loadingMessage: string;
    overrideContext: any;
    constructor(element: any, viewCompiler: any, container: any, viewResources: any, viewSlots: any);
    init(overrideContext: any): void;
    enable(msg: any, collectionLength: any): Promise<{}>;
    disable(): Promise<{}>;
}
