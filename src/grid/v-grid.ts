import { bindable, ViewCompiler, Container, ViewResources, TaskQueue } from 'aurelia-framework';
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
import {
    ResizeShardContext,
    GridConnectorInterface,
    DragDropShardContext,
    ColConfig,
    BindingContext,
    OverrideContext
} from '../interfaces';

export class VGrid {
    public static inject = [Element, ViewCompiler, Container, ViewResources, TaskQueue];
    public element: Element;
    public viewCompiler: ViewCompiler;
    public container: Container;
    public viewResources: ViewResources;
    public taskQueue: TaskQueue;
    public dragDropAttributeSharedContext: DragDropShardContext;
    public resizeAttributeSharedContext: ResizeShardContext;
    public colConfig: ColConfig[];
    public colRepeater: boolean;
    public colRepeatRowTemplate: string;
    public colRepeatRowHeaderTemplate: string;
    public colGroupRow: string;
    public customMenuTemplates: any;
    public colGroupElement: string;
    public newGrid: boolean;
    public controller: Controller;
    public htmlCache: HtmlCache;
    public htmlHeightWidth: HtmlHeightWidth;
    public viewSlots: ViewSlots;
    public columnBindingContext: ColumnBindingContext;
    public rowDataBinder: RowDataBinder;
    public mainMarkup: MainMarkup;
    public mainScrollEvents: MainScrollEvents;
    public rowMarkup: RowMarkup;
    public rowScrollEvents: RowScrollEvents;
    public rowClickHandler: RowClickHandler;
    public columnMarkup: ColumnMarkup;
    public groupingElements: GroupingElements;
    public loadingScreen: LoadingScreen;
    public contextMenu: ContextMenu;
    public bindingContext: BindingContext;
    public overrideContext: OverrideContext;
    public backupColConfig: ColConfig[];
    public filterOperatorNames: any;
    public filterOperatorTranslationKeys: any;
    public loadingScreenTemplate: string;
    public footerTemplate: string;
    public footer: Footer;

    @bindable({ attribute: 'v-row-height' }) public attRowHeight: number;
    @bindable({ attribute: 'v-header-height' }) public attHeaderHeight: number;
    @bindable({ attribute: 'v-footer-height' }) public attFooterHeight: number;
    @bindable({ attribute: 'v-panel-height' }) public attPanelHeight: number;
    @bindable({ attribute: 'v-grid-connector' }) public attGridConnector: GridConnectorInterface;
    @bindable({ attribute: 'v-multi-select' }) public attMultiSelect: boolean;
    @bindable({ attribute: 'v-manual-sel' }) public attManualSelection: boolean;
    @bindable({ attribute: 'v-theme' }) public attTheme: string;
    @bindable({ attribute: 'v-row-on-draw' }) public attOnRowDraw: Function;
    @bindable({ attribute: 'v-columns' }) public attColConfig: ColConfig[];
    @bindable({ attribute: 'v-i18n' }) public attI18N: Function;
    @bindable({ attribute: 'v-data-delay' }) public attDataDelay: number;

    constructor(
        element: Element,
        viewCompiler: ViewCompiler,
        container: Container,
        viewResources: ViewResources,
        taskQueue: TaskQueue) {

        this.element = element;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.taskQueue = taskQueue;

        // used by attributes for holding data
        this.dragDropAttributeSharedContext = ({} as DragDropShardContext);
        this.resizeAttributeSharedContext = ({} as ResizeShardContext);

        // use by v-grid-col element, that takes the data it gets and puts it in here
        this.colConfig = [];
        this.backupColConfig = [];
        this.colRepeater = false;
        this.colRepeatRowTemplate = null;
        this.colRepeatRowHeaderTemplate = null;
        this.colGroupRow = null;
        this.colGroupElement = null;
        this.customMenuTemplates = {};
        this.footerTemplate = null;
        this.loadingScreenTemplate = null;

        // to know if new or hidden by "if"
        this.newGrid = true;

        // create our classes
        this.controller = new Controller(this);
        this.htmlCache = new HtmlCache(element);

        this.htmlHeightWidth = new HtmlHeightWidth();
        this.viewSlots = new ViewSlots(this.htmlCache);
        this.columnBindingContext = new ColumnBindingContext(this.controller);
        this.rowDataBinder = new RowDataBinder(element, this.controller);
        this.mainMarkup = new MainMarkup(
            element,
            viewCompiler,
            container,
            viewResources,
            this.htmlHeightWidth,
            this.viewSlots);

        this.mainScrollEvents = new MainScrollEvents(element, this.htmlCache);
        this.rowMarkup = new RowMarkup(element, this.htmlCache);
        this.rowScrollEvents = new RowScrollEvents(element, this.htmlCache);
        this.rowClickHandler = new RowClickHandler(element, this.htmlCache);
        this.columnMarkup = new ColumnMarkup(
            element,
            viewCompiler,
            container,
            viewResources,
            this.htmlCache,
            this.viewSlots,
            this.columnBindingContext);

        this.groupingElements = new GroupingElements(
            element,
            viewCompiler,
            container,
            viewResources,
            this.htmlCache,
            this.viewSlots,
            this.columnBindingContext);

        this.loadingScreen = new LoadingScreen(element,
            viewCompiler,
            container,
            viewResources,
            this.viewSlots);

        this.contextMenu = new ContextMenu(
            viewCompiler,
            container,
            viewResources,
            this.viewSlots);

        this.footer = new Footer(this.htmlCache,
            viewCompiler,
            container,
            viewResources,
            this.viewSlots);

        this.filterOperatorNames = {
            '=': 'equals',              // 1
            '<=': 'less than or eq',    // 2
            '>=': 'greater than or eq', // 3
            '<': 'less than',           // 4
            '>': 'greater than',        // 5
            '*': 'contains',            // 6
            '!=': 'not equal to',       // 7
            '!*': 'does not contain',   // 8
            '*=': 'begins with',        // 9
            '=*': 'ends with'           // 10
        };

        this.filterOperatorTranslationKeys = {
            equals: '=',
            lessThanOrEqual: '<=',
            greaterThanOrEqual: '>=',
            lessThan: '<',
            greaterThan: '>',
            contains: '*',
            notEqualTo: '!=',
            doesNotContain: '!*',
            beginsWith: '*=',
            endsWith: '=*'
        };
    }

    public bind(bindingContext: BindingContext, overrideContext: OverrideContext): void {

        // binding contexts, will need some for the views we create
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;

        // convert main attributes
        this.attRowHeight = this.attRowHeight ? this.attRowHeight * 1 : 25;
        this.attHeaderHeight = this.attHeaderHeight ? this.attHeaderHeight * 1 : 25;
        this.attFooterHeight = this.attFooterHeight ? this.attFooterHeight * 1 : 25;
        this.attPanelHeight = this.attPanelHeight ? this.attPanelHeight * 1 : 25;
        this.attDataDelay = this.attDataDelay ? this.attDataDelay * 1 : 0;
        this.attMultiSelect = this.checkBool(this.attMultiSelect);
        this.attManualSelection = this.attManualSelection ? this.checkBool(this.attManualSelection) : null;
        this.attTheme = this.attTheme || 'avg-default';
        this.element.classList.add(this.attTheme);
        this.attOnRowDraw = typeof this.attOnRowDraw === 'function' ? this.attOnRowDraw : null;
        this.attI18N = typeof this.attI18N === 'function' ? this.attI18N : null;

    }

    public unbind(): void {

        // if unbined we want to know if its new time ( I prb should have more code in created event... to late...)
        this.newGrid = false;

        // unbind all the columns
        this.viewSlots.unbindAndDetachColumns();

        // todo: should I bind the main, grouping and loading screen here?
        // not unless I let users put custom html into those I can see why to bother atm
    }

    public attached(): void {

        // connect grid, and let gridConnector tell us if we can generate the grid or now
        // this way we give the gridconnetor/datasource a chance to get ready before we start asking for stuff
        this.attGridConnector.connect(this.controller, () => {

            // if not new, and just hidden by if.bind, 
            // then lets just skip creating the grid and just bind the columns    
            if (this.newGrid) {
                this.backupColConfig = this.colConfig.slice(0);
                // override colconfig if binded
                if (this.attColConfig) {
                    this.colConfig = this.attColConfig.length > 0 ? this.attColConfig : this.colConfig;
                }
                this.controller.getContext();
                this.controller.createGrid();
            }

            // bind columns
            this.viewSlots.bindAndAttachColumns(
                this.overrideContext,
                this.columnBindingContext,
                this.attGridConnector.getSelection());

            // update horizontal scroller
            this.controller.udateHorizontalScroller();

            // todo: should I bind the main, grouping and loading screen here?
            // connect gridConnector to this controler
            this.attGridConnector.gridCreated();

        });
    }

    private checkBool(value: string | boolean): boolean {
        if (typeof value === 'string') {
            value = value.toLowerCase();
        }

        switch (true) {
            case value === 'true':
            case value === true:
                value = true;
                break;
            case value === 'false':
            case value === false:
                value = false;
                break;
            default:
                value = false;
                break;
        }
        return value;
    }

}
