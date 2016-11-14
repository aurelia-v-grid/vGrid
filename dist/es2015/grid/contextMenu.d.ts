import { ViewCompiler, Container, ViewResources } from 'aurelia-framework';
import { ViewSlots } from './viewSlots';
export declare class ContextMenu {
    viewCompiler: ViewCompiler;
    container: Container;
    viewResources: ViewResources;
    viewSlots: ViewSlots;
    top: number;
    left: number;
    show: boolean;
    pinnedMenu: boolean;
    sortMenu: boolean;
    filterMainMenu: boolean;
    filterOptionsMenu: boolean;
    callback: any;
    constructor(viewCompiler: ViewCompiler, container: Container, viewResources: ViewResources, viewSlots: ViewSlots);
    setDefaults(): void;
    init(): void;
    showFilterOptions(): void;
    hideFilterOptions(): void;
    openMenu(options: any): void;
    menuClick(type: any, option: any, event: any): void;
    menuHtml: string;
}
