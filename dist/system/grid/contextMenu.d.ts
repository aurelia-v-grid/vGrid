import { ViewCompiler, Container, ViewResources, ViewSlots } from '../interfaces';
export declare class ContextMenu {
    show: boolean;
    private viewCompiler;
    private container;
    private viewResources;
    private viewSlots;
    private top;
    private left;
    private pinnedMenu;
    private sortMenu;
    private filterMainMenu;
    private filterOptionsMenu;
    private groupbyMenu;
    private callback;
    constructor(viewCompiler: ViewCompiler, container: Container, viewResources: ViewResources, viewSlots: ViewSlots);
    setDefaults(): void;
    init(): void;
    openMenu(options: {
        left: number;
        top: number;
        pinned?: string;
        sort?: string;
        groupby?: string;
        filter?: string;
        callback?: Function;
    }): void;
    menuClick(type: string, option: string, event: Event): void;
    private showFilterOptions();
    private hideFilterOptions();
    private menuHtml();
}
