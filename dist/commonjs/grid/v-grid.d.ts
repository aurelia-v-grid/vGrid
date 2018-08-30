import { ViewCompiler, Container, ViewResources, TaskQueue } from 'aurelia-framework';
import { MainMarkup } from './mainMarkup';
import { MainScrollEvents } from './mainScrollEvents';
import { RowMarkup } from './rowMarkup';
import { RowScrollEvents } from './rowScrollEvents';
import { ColumnMarkup } from './columnMarkup';
import { HtmlCache } from './htmlCache';
import { HtmlHeightWidth } from './htmlHeightWidth';
import { ViewSlots } from './viewSlots';
import { ColumnBindingContext } from './columnBindingContext';
import { RowDataBinder } from './rowDataBinder';
import { RowClickHandler } from './rowClickHandler';
import { GroupingElements } from './groupingElements';
import { Controller } from './controller';
import { LoadingScreen } from './loadingScreen';
import { ContextMenu } from './contextMenu';
import { Footer } from './footer';
import { ResizeShardContextInterface, GridConnectorInterface, DragDropShardContextInterface, ColConfigInterface, BindingContextInterface, OverrideContextInterface } from '../interfaces';
export declare class VGrid {
    static inject: ({
        new (): Element;
        prototype: Element;
    } | typeof Container | typeof TaskQueue | typeof ViewResources | typeof ViewCompiler)[];
    element: Element;
    viewCompiler: ViewCompiler;
    container: Container;
    viewResources: ViewResources;
    taskQueue: TaskQueue;
    dragDropAttributeSharedContext: DragDropShardContextInterface;
    resizeAttributeSharedContext: ResizeShardContextInterface;
    colConfig: ColConfigInterface[];
    colRepeater: boolean;
    colRepeatRowTemplate: string;
    colRepeatRowHeaderTemplate: string;
    colGroupRow: string;
    customMenuTemplates: any;
    colGroupElement: string;
    newGrid: boolean;
    controller: Controller;
    htmlCache: HtmlCache;
    htmlHeightWidth: HtmlHeightWidth;
    viewSlots: ViewSlots;
    columnBindingContext: ColumnBindingContext;
    rowDataBinder: RowDataBinder;
    mainMarkup: MainMarkup;
    mainScrollEvents: MainScrollEvents;
    rowMarkup: RowMarkup;
    rowScrollEvents: RowScrollEvents;
    rowClickHandler: RowClickHandler;
    columnMarkup: ColumnMarkup;
    groupingElements: GroupingElements;
    loadingScreen: LoadingScreen;
    contextMenu: ContextMenu;
    bindingContext: BindingContextInterface;
    overrideContext: OverrideContextInterface;
    backupColConfig: ColConfigInterface[];
    filterOperatorNames: any;
    filterOperatorTranslationKeys: any;
    copyPasteValueSharedContext: any;
    loadingScreenTemplate: string;
    footerTemplate: string;
    footer: Footer;
    attRowHeight: number;
    attSkipPassive: boolean;
    attHeaderHeight: number;
    attFooterHeight: number;
    attPanelHeight: number;
    attGridConnector: GridConnectorInterface;
    attMultiSelect: boolean;
    attManualSelection: boolean;
    attTheme: string;
    attOnRowDraw: Function;
    attColConfig: ColConfigInterface[];
    attI18N: Function;
    attDataDelay: number;
    attVariableRowHeight: boolean;
    constructor(element: Element, viewCompiler: ViewCompiler, container: Container, viewResources: ViewResources, taskQueue: TaskQueue);
    bind(bindingContext: BindingContextInterface, overrideContext: OverrideContextInterface): void;
    unbind(): void;
    attached(): void;
    private checkBool;
}
