import { ViewCompiler, Container, ViewResources, ViewSlots } from '../interfaces';
import { OverrideContext } from '../interfaces';
export declare class LoadingScreen {
    private element;
    private viewSlots;
    private viewCompiler;
    private container;
    private viewResources;
    private loading;
    private loadingMessage;
    private overrideContext;
    constructor(element: Element, viewCompiler: ViewCompiler, container: Container, viewResources: ViewResources, viewSlots: ViewSlots);
    updateLoadingDefaultLoadingMessage(msg: string): void;
    init(overrideContext: OverrideContext, loadingScreenTemplate: string): void;
    enable(msg?: string, collectionLength?: number): Promise<any>;
    disable(): Promise<any>;
}
