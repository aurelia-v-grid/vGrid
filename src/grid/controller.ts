//for typings only
import {bindable, ViewCompiler, Container, ViewResources, TaskQueue} from 'aurelia-framework';
import {MainMarkup} from './mainMarkup';
import {MainScrollEvents} from './mainScrollEvents';
import {RowMarkup} from './rowMarkup';
import {RowScrollEvents} from './rowScrollEvents';
import {ColumnMarkup} from './columnMarkup';
import {HtmlCache} from './htmlCache';
import {HtmlHeightWidth} from './htmlHeightWidth';
import {ViewSlots} from './viewSlots';
import {ColumnBindingContext} from './columnBindingContext';
import {RowDataBinder} from './rowDataBinder';
import {RowClickHandler} from './rowClickHandler';
import {GroupingElements} from './groupingElements';
import {LoadingScreen} from './loadingScreen';
import {ContextMenu} from './contextMenu';
import {VGrid} from './v-grid';



export class Controller {
    vGrid:VGrid;
    htmlCache:HtmlCache;
    htmlHeightWidth:HtmlHeightWidth;
    viewSlots:ViewSlots;
    columnBindingContext:ColumnBindingContext;
    rowDataBinder:RowDataBinder;
    mainMarkup:MainMarkup;
    mainScrollEvents:MainScrollEvents;
    rowMarkup:RowMarkup;
    rowScrollEvents:RowScrollEvents;
    rowClickHandler:RowClickHandler;
    columnMarkup:ColumnMarkup;
    groupingElements:GroupingElements;
    loadingScreen:LoadingScreen;
    contextMenu:ContextMenu;
    htmlcolumnMarkupCache:ColumnMarkup
    element:any;
    viewCompiler:ViewCompiler;
    container:Container;
    viewResources:ViewResources;
    taskQueue:TaskQueue;
    dragDropAttributeSharedContext:any;
    resizeAttributeSharedContext:any;
    colConfig:Array<any>;
    colRepeater:boolean;
    colRepeatRowTemplate:string;
    colRepeatRowHeaderTemplate:string;
    bindingContext:any;
    overrideContext:any;
    attRowHeight:any;
    attHeaderHeight:any;
    attFooterHeight:any;
    attPanelHeight:any;
    attMultiSelect:any;
    attManualSelection:any;
    attGridConnector:any;


  constructor(vGrid) {
    //main context
    this.vGrid = vGrid;

    //main element
    this.element = vGrid.element;
  }


  getContext() {

    let c = this.vGrid;
    //column configuration
    this.colConfig = c.colConfig;
    this.colRepeater = c.colRepeater;
    this.colRepeatRowTemplate = c.colRepeatRowTemplate;
    this.colRepeatRowHeaderTemplate = c.colRepeatRowHeaderTemplate;

    //aurelia classes
    this.viewCompiler = c.viewCompiler;
    this.container = c.container;
    this.viewResources = c.viewResources;
    this.taskQueue = c.taskQueue;

    //classes
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

    //attributes
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


  createGrid() {
    //sets default height and widths of the grid
    this.htmlHeightWidth.addDefaultsAttributes(this.attHeaderHeight, this.attRowHeight, this.attFooterHeight, this.attPanelHeight);

    //generate main markup and updates our cache
    this.mainMarkup.generateMainMarkup();
    this.htmlCache.updateMainMarkup();

    this.rowDataBinder.init();
    //starts the scroll events on main html markup (left/main/right)
    this.mainScrollEvents.init();

    //creates main row markup and attaches them, then we chache this html also
    this.rowMarkup.init(this.attRowHeight);
    this.htmlCache.updateRowsMarkup();

    //add scroll events (the one that moves the actual rows when scroling)
    this.rowScrollEvents.init(this.attRowHeight);

    //creates the views/viewports we need
    this.columnMarkup.init(this.colConfig, this.overrideContext, this.colRepeater, this.colRepeatRowTemplate, this.colRepeatRowHeaderTemplate);


    //more updates to main markup
    this.htmlHeightWidth.setWidthFromColumnConfig(this.colConfig);

    //register the rowClick handler (when clicking on rows)
    this.rowClickHandler.init(this.attMultiSelect, this.attManualSelection, this);

    //create grouping elements helper... pretty much just creates view when dragging to group box
    this.groupingElements.init(this);

    //loading screen view
    this.loadingScreen.init(this.overrideContext);

    //add context menu
    this.contextMenu.init();


  }


  //misc function, all calls to/from gridconnector will go in functions here, mostly.. I think...

  getElement(row, isDown, callback) {
    this.attGridConnector.getElement({
      row: row,
      isDown: isDown,
      callback: callback
    });
  }

  getOperatorName(name) {
    return this.attGridConnector.getFilterOperatorName(name);
  }

  expandGroup(id) {
    this.attGridConnector.expandGroup(id);
  }

  collapseGroup(id) {
    this.attGridConnector.collapseGroup(id);
  }

  select(row) {
    this.attGridConnector.select(row);
  }


  addToGrouping(attribute) {
    let currentGrouping = this.attGridConnector.getGrouping();
    currentGrouping.push(attribute);
    this.attGridConnector.group(currentGrouping, true);
  }

  removeFromGrouping(attribute) {
    let currentGrouping = this.attGridConnector.getGrouping();
    let index = currentGrouping.indexOf(attribute);
    if (index !== -1) {
      currentGrouping.splice(index, 1);
      this.attGridConnector.group(currentGrouping, true);
    }

  }

  getSelectionContext() {
    return this.attGridConnector.selection;
  }

  raiseEvent(name, data = {}) {
    let event = new CustomEvent(name, {
      detail: data,
      bubbles: true
    });
    this.element.dispatchEvent(event);
    return event;
  }

  setLoadingScreen(value, msg, collectionLength) {

    if (value) {
      return this.loadingScreen.enable(msg, collectionLength);
    } else {
      return this.loadingScreen.disable();
    }
  }


  updateHeights() {
    this.rowScrollEvents.setCollectionLength(this.attGridConnector.length());
    this.htmlHeightWidth.setCollectionLength(this.attGridConnector.length());
  }

  updateHeaderGrouping(groups) {
    let length = groups.length;
    this.columnBindingContext.setupgrouping = length;
    this.htmlHeightWidth.adjustWidthsColumns(this.columnBindingContext, length);
  }

  collectionLength() {
    return this.attGridConnector.length();
  }

  triggerScroll(position) {
    if (position === null || position === undefined) {
      position = this.htmlCache.avg_content_main.scrollTop;
    } else {
      this.htmlCache.avg_content_main.scrollTop = position;
    }

    this.raiseEvent("avg-scroll", {
      isScrollBarScrolling: true,
      isDown: true,
      newTopPosition: position
    });
  }


  rebindAllRows() {
    this.raiseEvent("avg-rebind-all-rows", {
      rowCache: this.htmlCache.rowCache,
      downScroll: true
    });
  }


  addEventListeners() {
    this.element.addEventListener("getElement", (event) => {
      this.attGridConnector.getElement(event.detail);
    });
  }


}
