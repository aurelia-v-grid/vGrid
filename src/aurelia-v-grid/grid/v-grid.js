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
import {Controller} from './controller';
import {LoadingScreen} from './loadingScreen';
import {ContextMenu} from './contextMenu';


export class VGrid {
  static inject = [Element, ViewCompiler, Container, ViewResources, TaskQueue];
  @bindable({attribute: "v-row-height"}) attRowHeight;
  @bindable({attribute: "v-header-height"}) attHeaderHeight;
  @bindable({attribute: "v-footer-height"}) attFooterHeight;
  @bindable({attribute: "v-panel-height"}) attPanelHeight;
  @bindable({attribute: "v-grid-connector"}) attGridConnector;
  @bindable({attribute: "v-multi-select"}) attMultiSelect;
  @bindable({attribute: "v-manual-sel"}) attManualSelection;
  @bindable({attribute: "v-theme"}) attTheme;
  //@bindable({attribute: "v-columns"}) vGridColumns; TODO...
  @bindable({attribute: "v-manual-sel"}) attManualSelection;


  constructor(element, viewCompiler, container, viewResources, taskQueue) {

    this.element = element;
    this.viewCompiler = viewCompiler;
    this.container = container;
    this.viewResources = viewResources;
    this.taskQueue = taskQueue;

    //used by attributes for holding data
    this.dragDropAttributeSharedContext = {};
    this.resizeAttributeSharedContext = {};

    //use by v-grid-col element, that takes the data it gets and puts it in here
    this.colConfig = [];
    this.newGrid = true;

    //create our classes
    this.controller = new Controller(this);
    this.htmlCache = new HtmlCache(element);

    this.htmlHeightWidth = new HtmlHeightWidth(element);
    this.viewSlots = new ViewSlots(element);
    this.columnBindingContext = new ColumnBindingContext(this.controller);
    this.rowDataBinder = new RowDataBinder(element, this.controller);
    this.mainMarkup = new MainMarkup(element, viewCompiler, container, viewResources, this.htmlHeightWidth, this.viewSlots);
    this.mainScrollEvents = new MainScrollEvents(element, this.htmlCache);
    this.rowMarkup = new RowMarkup(element, this.htmlCache);
    this.rowScrollEvents = new RowScrollEvents(element, this.htmlCache);
    this.rowClickHandler = new RowClickHandler(element, this.htmlCache);
    this.columnMarkup = new ColumnMarkup(element, viewCompiler, container, viewResources, this.htmlCache, this.viewSlots, this.columnBindingContext);
    this.groupingElements = new GroupingElements(element, viewCompiler, container, viewResources, this.htmlCache, this.viewSlots, this.columnBindingContext);
    this.loadingScreen = new LoadingScreen(element, viewCompiler, container, viewResources, this.viewSlots);
    this.contextMenu = new ContextMenu(viewCompiler, container, viewResources, this.viewSlots);
  }


  bind(bindingContext, overrideContext) {

    //binding contexts, will need some for the views we create
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    //convert main attributes
    this.attRowHeight = this.attRowHeight ? this.attRowHeight * 1 : 25;
    this.attHeaderHeight = this.attHeaderHeight ? this.attHeaderHeight * 1 : 25;
    this.attFooterHeight = this.attFooterHeight ? this.attFooterHeight * 1 : 25;
    this.attPanelHeight = this.attPanelHeight ? this.attPanelHeight * 1 : 25;
    this.attMultiSelect = this.attMultiSelect ? this.attMultiSelect === "true" ? true : false : null;
    this.attManualSelection = this.attManualSelection ? this.attManualSelection === "true" ? true : false : null;
    this.attGridConnector.vGrid = this;
    this.attTheme = this.attTheme || "avg-default";

    //todo... use for theming
    this.element.classList.add(this.attTheme);

  }


  unbind() {

    //if unbined we want to know if its new time ( I prb should have more code in created event... to late...)
    this.newGrid = false;

    //unbind all the columns
    this.viewSlots.unbindAndDetachColumns();

    //todo: should I bind the main, grouping and loading screen here?
    //not unless I let users put custom html into those I can see why to bother atm

  }


  attached() {

    //if not new, and just hidden by if.bind, then lets just skip creating the grid and just bind the columns    
    if (this.newGrid) {
      this.controller.getContext();
      this.controller.createGrid();
      this.controller.addEventListeners();
    }

    //bind columns
    this.viewSlots.bindAndAttachColumns(this.overrideContext, this.columnBindingContext);

    //todo: should I bind the main, grouping and loading screen here?

    //connect gridConnector to this controler
    this.attGridConnector.gridCreated(this.controller);
  }


}
