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
  OverrideContext,
  DragDropShardContext,
  ResizeShardContext
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
  public element: Element;
  public viewCompiler: ViewCompiler;
  public container: Container;
  public viewResources: ViewResources;
  public taskQueue: TaskQueue;
  public dragDropAttributeSharedContext: DragDropShardContext;
  public resizeAttributeSharedContext: ResizeShardContext;
  public colConfig: Array<ColConfig>;
  public backupColConfig: Array<ColConfig>;
  public colRepeater: boolean;
  public colRepeatRowTemplate: string;
  public colRepeatRowHeaderTemplate: string;
  public colGroup: string;
  public bindingContext: BindingContext;
  public overrideContext: OverrideContext;
  public attRowHeight: number;
  public attHeaderHeight: number;
  public attFooterHeight: number;
  public attPanelHeight: number;
  public attMultiSelect: boolean;
  public attManualSelection: boolean;
  public attGridConnector: GridConnector;
  public attOnRowDraw: Function;
  public attLanguage: any;


  constructor(vGrid: VGrid) {
    // main context
    this.vGrid = vGrid;

    // main element
    this.element = vGrid.element;
  }


  public getContext() {

    let c = this.vGrid;
    // column configuration
    this.colConfig = c.colConfig;
    this.backupColConfig = c.backupColConfig;
    this.colRepeater = c.colRepeater;
    this.colGroup = c.colGroupRow;
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
    this.attOnRowDraw = c.attOnRowDraw;
    this.attLanguage = c.attLanguage;
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

    // update translation
    if (Object.keys(this.attLanguage).length > 0) {

      // update for inputs
      let keys: Array<string> = Object.keys(this.attLanguage);
      keys.forEach((key: string) => {
        this.setOperatorName(key, this.attLanguage[key])
      });

      // update for menu
      this.contextMenu.updateMenuStrings(this.attLanguage);

    }

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
      this.colRepeatRowHeaderTemplate,
      this.colGroup);


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
      callback: (rowContext: BindingContext) => {
        if (this.attOnRowDraw) {
          this.attOnRowDraw(rowContext);
        }
        callbackFN(rowContext);
      }
    });
  }


  public getOperatorName(name: string): string {
    return this.attGridConnector.getFilterOperatorName(name);
  }

  public setOperatorName(key: string, name: string) {
    this.attGridConnector.setFilterOperatorName(key, name);
  }



  public expandGroup(id: string): void {
    this.attGridConnector.expandGroup(id);
  }

  public collapseGroup(id: string): void {
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

  public raiseEvent(name: string, data = {}): void {
    let event = new CustomEvent(name, {
      detail: data,
      bubbles: true
    });
    this.element.dispatchEvent(event);
  }

  public setLoadingScreen(value: boolean, msg?: string, collectionLength?: number): Promise<void> {

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

  public updateHeaderGrouping(groups: Array<string>): void {
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


  public getColumnConfig(): Array<ColConfig> {

    // get current colcontext
    let colContext = this.columnBindingContext;

    // temp array to hold data
    let tempArray: Array<any> = [];

    // loop and find out whats what..
    for (let i = 0; i < this.colConfig.length; i++) {
      switch (true) {
        case colContext.setupleft[i].show:
          tempArray.push({
            no: i,
            set: 1,
            colPinLeft: true,
            colPinRight: false,
            left: colContext.setupleft[i].left - 10000,
            width: colContext.setupleft[i].width
          });
          break;
        case colContext.setupmain[i].show:
          tempArray.push({
            no: i,
            set: 2,
            colPinLeft: false,
            colPinRight: false,
            left: colContext.setupmain[i].left,
            width: colContext.setupmain[i].width
          });
          break;
        case colContext.setupright[i].show:
          tempArray.push({
            no: i,
            set: 3,
            colPinLeft: false,
            colPinRight: true,
            left: colContext.setupright[i].left + 10000,
            width: colContext.setupright[i].width
          });
          break;
        default:
        // need to add option for hidden column, but that is created yet...
      }
    }

    // temp colconf to return
    let newColConfig: Array<ColConfig> = [];

    // loop and set correct params
    this.colConfig.forEach((col: ColConfig, i: number) => {
      let temp = ({
        colWidth: tempArray[i].width,
        colRowTemplate: col.colRowTemplate,
        colHeaderTemplate: col.colHeaderTemplate,
        colField: col.colField ? col.colField.replace('rowRef.', '') : col.colField,
        colPinLeft: tempArray[i].colPinLeft,
        colPinRight: tempArray[i].colPinRight,
        colHeaderName: col.colHeaderName,
        colAddLabelAttributes: col.colAddLabelAttributes,
        colAddFilterAttributes: col.colAddFilterAttributes,
        colAddRowAttributes: col.colAddRowAttributes,
        colSort: col.colSort,
        colFilter: col.colFilter,
        colFilterTop: col.colFilterTop,
        colCss: col.colCss,
        colType: col.colType,
        __colSortHelper: tempArray[i].left,
      } as ColConfig);

      newColConfig.push(temp);
    });

    // sort array
    newColConfig.sort(
      (a, b) => {
        return a.__colSortHelper - b.__colSortHelper;
      });

    // return current config   
    return newColConfig;
  }


  public setColumnConfig(colConfig: Array<ColConfig>): void {
    let length = this.columnBindingContext.setupgrouping;
    this.viewSlots.unbindAndDetachColumns();
    this.columnBindingContext.clear();
    this.viewSlots.clear();
    this.colConfig = colConfig || this.backupColConfig;
    this.columnMarkup.init(
      this.colConfig,
      this.overrideContext,
      this.colRepeater,
      this.colRepeatRowTemplate,
      this.colRepeatRowHeaderTemplate,
      this.colGroup);
    this.viewSlots.bindAndAttachColumns(this.overrideContext, this.columnBindingContext);
    this.htmlHeightWidth.setWidthFromColumnConfig(this.colConfig);
    this.columnBindingContext.setupgrouping = length;
    this.htmlHeightWidth.adjustWidthsColumns(this.columnBindingContext, length);

    this.rebindAllRows();


  }





}
