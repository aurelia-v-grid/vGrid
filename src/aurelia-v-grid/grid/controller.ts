import {
  ViewCompiler,
  ViewResources,
  Container,
  TaskQueue,
  MainMarkup,
  MainScrollEvents,
  ColumnMarkup,
  HtmlHeightWidth,
  ViewSlots,
  ColumnBindingContext,
  HtmlCache,
  RowDataBinder,
  RowClickHandler,
  GroupingElements,
  RowMarkup,
  LoadingScreen,
  ContextMenu,
  VGrid,
  GridConnector,
  Selection,
  RowScrollEvents,
  ColConfig,
  BindingContext,
  OverrideContext
} from '../interfaces';



export class Controller {
  public vGrid: VGrid;
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
  public htmlcolumnMarkupCache: ColumnMarkup;
  public element: any;
  public viewCompiler: ViewCompiler;
  public container: Container;
  public viewResources: ViewResources;
  public taskQueue: TaskQueue;
  public dragDropAttributeSharedContext: any;
  public resizeAttributeSharedContext: any;
  public colConfig: Array<ColConfig>;
  public colRepeater: boolean;
  public colRepeatRowTemplate: string;
  public colRepeatRowHeaderTemplate: string;
  public bindingContext: BindingContext;
  public overrideContext: OverrideContext;
  public attRowHeight: number;
  public attHeaderHeight: number;
  public attFooterHeight: number;
  public attPanelHeight: number;
  public attMultiSelect: boolean;
  public attManualSelection: boolean;
  public attGridConnector: GridConnector;


  constructor(vGrid) {
    // main context
    this.vGrid = vGrid;

    // main element
    this.element = vGrid.element;
  }


  public getContext() {

    let c = this.vGrid;
    // column configuration
    this.colConfig = c.colConfig;
    this.colRepeater = c.colRepeater;
    this.colRepeatRowTemplate = c.colRepeatRowTemplate;
    this.colRepeatRowHeaderTemplate = c.colRepeatRowHeaderTemplate;

    // aurelia classes
    this.viewCompiler = c.viewCompiler;
    this.container = c.container;
    this.viewResources = c.viewResources;
    this.taskQueue = c.taskQueue;

    // classes
    this.htmlCache = c.htmlCache;
    this.htmlHeightWidth = c.htmlHeightWidth;
    this.viewSlots = c.viewSlots;
    this.columnBindingContext = c.columnBindingContext;
    this.rowDataBinder = c.rowDataBinder;
    this.mainMarkup = c.mainMarkup;
    this.mainScrollEvents = c.mainScrollEvents;
    this.rowMarkup = c.rowMarkup;
    this.rowScrollEvents = c.rowScrollEvents;
    this.rowClickHandler = c.rowClickHandler;
    this.htmlcolumnMarkupCache = c.columnMarkup;
    this.columnMarkup = c.columnMarkup;
    this.groupingElements = c.groupingElements;
    this.loadingScreen = c.loadingScreen;
    this.contextMenu = c.contextMenu;

    // attributes
    this.bindingContext = c.bindingContext;
    this.overrideContext = c.overrideContext;
    this.attRowHeight = c.attRowHeight;
    this.attHeaderHeight = c.attHeaderHeight;
    this.attFooterHeight = c.attFooterHeight;
    this.attPanelHeight = c.attPanelHeight;
    this.attMultiSelect = c.attMultiSelect;
    this.attManualSelection = c.attManualSelection;
    this.attGridConnector = c.attGridConnector;
  }


  public createGrid(): void {
    // sets default height and widths of the grid
    this.htmlHeightWidth.addDefaultsAttributes(
      this.attHeaderHeight,
      this.attRowHeight,
      this.attFooterHeight,
      this.attPanelHeight);

    // generate main markup and updates our cache
    this.mainMarkup.generateMainMarkup();
    this.htmlCache.updateMainMarkup();

    this.rowDataBinder.init();
    // starts the scroll events on main html markup (left/main/right)
    this.mainScrollEvents.init();

    // creates main row markup and attaches them, then we chache this html also
    this.rowMarkup.init(this.attRowHeight);
    this.htmlCache.updateRowsMarkup();

    // add scroll events (the one that moves the actual rows when scroling)
    this.rowScrollEvents.init(this.attRowHeight);

    // creates the views/viewports we need
    this.columnMarkup.init(
      this.colConfig,
      this.overrideContext,
      this.colRepeater,
      this.colRepeatRowTemplate,
      this.colRepeatRowHeaderTemplate);


    // more updates to main markup
    this.htmlHeightWidth.setWidthFromColumnConfig(this.colConfig);

    // register the rowClick handler (when clicking on rows)
    this.rowClickHandler.init(this.attMultiSelect, this.attManualSelection, this);

    // create grouping elements helper... pretty much just creates view when dragging to group box
    this.groupingElements.init(this);

    // loading screen view
    this.loadingScreen.init(this.overrideContext);

    // add context menu
    this.contextMenu.init();


  }


  // misc function, all calls to/from gridconnector will go in functions here, mostly.. I think...

  public getElement(rowNumber: number, isDownScroll: boolean, callbackFN: Function): void {
    this.attGridConnector.getElement({
      row: rowNumber,
      isDown: isDownScroll,
      callback: callbackFN
    });
  }

  public getOperatorName(name): string {
    return this.attGridConnector.getFilterOperatorName(name);
  }

  public expandGroup(id): void {
    this.attGridConnector.expandGroup(id);
  }

  public collapseGroup(id): void {
    this.attGridConnector.collapseGroup(id);
  }

  public select(row: number): void {
    this.attGridConnector.select(row);
  }


  public addToGrouping(attribute: string): void {
    let currentGrouping = this.attGridConnector.getGrouping();
    if (currentGrouping.indexOf(attribute) === -1) {
      currentGrouping.push(attribute);
      this.attGridConnector.group(currentGrouping, true);
    }

  }



  public removeFromGrouping(attribute: string) {
    let currentGrouping = this.attGridConnector.getGrouping();
    let index = currentGrouping.indexOf(attribute);
    if (index !== -1) {
      currentGrouping.splice(index, 1);
      this.attGridConnector.group(currentGrouping, true);
    }
  }


  public getSelectionContext(): Selection {
    let sel: Selection = this.attGridConnector.getSelection();
    return sel;
  }

  public raiseEvent(name, data = {}): void {
    let event = new CustomEvent(name, {
      detail: data,
      bubbles: true
    });
    this.element.dispatchEvent(event);
  }

  public setLoadingScreen(value: string, msg: string, collectionLength: number): Promise<any> {

    if (value) {
      return this.loadingScreen.enable(msg, collectionLength);
    } else {
      return this.loadingScreen.disable();
    }
  }


  public updateHeights(): void {
    this.rowScrollEvents.setCollectionLength(this.attGridConnector.getDatasourceLength());
    this.htmlHeightWidth.setCollectionLength(this.attGridConnector.getDatasourceLength());
  }

  public updateHeaderGrouping(groups: Array<any>): void {
    let length = groups.length;
    this.columnBindingContext.setupgrouping = length;
    this.htmlHeightWidth.adjustWidthsColumns(this.columnBindingContext, length);
  }

  public collectionLength(): number {
    return this.attGridConnector.getDatasourceLength();
  }

  public triggerScroll(position: number): void {
    if (position === null || position === undefined) {
      position = this.htmlCache.avg_content_main.scrollTop;
    } else {
      this.htmlCache.avg_content_main.scrollTop = position;
    }

    this.raiseEvent('avg-scroll', {
      isScrollBarScrolling: true,
      isDown: true,
      newTopPosition: position
    });
  }


  public rebindAllRows(): void {
    this.raiseEvent('avg-rebind-all-rows', {
      rowCache: this.htmlCache.rowCache,
      downScroll: true
    });
  }


  public addEventListeners(): void {
    this.element.addEventListener('getElement', (event) => {
      this.attGridConnector.getElement(event.detail);
    });
  }


}
