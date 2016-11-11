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


export class VGrid {
  public static inject = [Element, ViewCompiler, Container, ViewResources, TaskQueue];
  public element: any;
  public viewCompiler: ViewCompiler;
  public container: Container;
  public viewResources: ViewResources;
  public taskQueue: TaskQueue;
  public dragDropAttributeSharedContext: any;
  public resizeAttributeSharedContext: any;
  public colConfig: Array<any>;
  public colRepeater: boolean;
  public colRepeatRowTemplate: string;
  public colRepeatRowHeaderTemplate: string;
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
  public bindingContext: any;
  public overrideContext: any;



  @bindable({ attribute: 'v-row-height' }) public attRowHeight;
  @bindable({ attribute: 'v-header-height' }) public attHeaderHeight;
  @bindable({ attribute: 'v-footer-height' }) public attFooterHeight;
  @bindable({ attribute: 'v-panel-height' }) public attPanelHeight;
  @bindable({ attribute: 'v-grid-connector' }) public attGridConnector;
  @bindable({ attribute: 'v-multi-select' }) public attMultiSelect;
  @bindable({ attribute: 'v-manual-sel' }) public attManualSelection;
  @bindable({ attribute: 'v-theme' }) public attTheme;
  // @bindable({attribute: "v-columns"}) vGridColumns; TODO...



  constructor(element, viewCompiler, container, viewResources, taskQueue) {


    this.element = element;
    this.viewCompiler = viewCompiler;
    this.container = container;
    this.viewResources = viewResources;
    this.taskQueue = taskQueue;

    // used by attributes for holding data
    this.dragDropAttributeSharedContext = {};
    this.resizeAttributeSharedContext = {};

    // use by v-grid-col element, that takes the data it gets and puts it in here
    this.colConfig = [];
    this.colRepeater = false;
    this.colRepeatRowTemplate = null;
    this.colRepeatRowHeaderTemplate = null;

    // to know if new or hidden by "if"
    this.newGrid = true;



    // create our classes
    this.controller = new Controller(this);
    this.htmlCache = new HtmlCache(element);

    this.htmlHeightWidth = new HtmlHeightWidth();
    this.viewSlots = new ViewSlots();
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
  }


  public bind(bindingContext: any, overrideContext: any): void {

    // binding contexts, will need some for the views we create
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    // convert main attributes
    this.attRowHeight = this.attRowHeight ? this.attRowHeight * 1 : 25;
    this.attHeaderHeight = this.attHeaderHeight ? this.attHeaderHeight * 1 : 25;
    this.attFooterHeight = this.attFooterHeight ? this.attFooterHeight * 1 : 25;
    this.attPanelHeight = this.attPanelHeight ? this.attPanelHeight * 1 : 25;
    this.attMultiSelect = this.attMultiSelect ? this.attMultiSelect === 'true' ? true : false : null;
    this.attManualSelection = this.attManualSelection ? this.attManualSelection === 'true' ? true : false : null;
    this.attGridConnector.vGrid = this;
    this.attTheme = this.attTheme || 'avg-default';

    // todo... use for theming
    this.element.classList.add(this.attTheme);

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

    // if not new, and just hidden by if.bind, then lets just skip creating the grid and just bind the columns    
    if (this.newGrid) {
      this.controller.getContext();
      this.controller.createGrid();
      this.controller.addEventListeners();
    }

    // bind columns
    this.viewSlots.bindAndAttachColumns(this.overrideContext, this.columnBindingContext);

    // todo: should I bind the main, grouping and loading screen here?

    // connect gridConnector to this controler
    this.attGridConnector.gridCreated(this.controller);
  }


}
