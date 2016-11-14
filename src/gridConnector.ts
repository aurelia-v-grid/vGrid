//for typing only
import {DataSource} from './dataSource';//todo,create interface when datasource is stable
import {Selection} from './selection';//todo,create interface when datasource is stable



export class GridConnector {
  private controller:any;
  private datasource:DataSource;
  private key:any;
  public selection:Selection;
  private errorhandler:Function;
  private eventID:number;

  constructor(datasource:DataSource, selection:Selection, errorHandler?:Function) {
    this.controller = null;
    this.datasource = datasource;
    this.key = datasource.key;
    this.selection = datasource.selection;
    this.errorhandler = errorHandler || null;
  }


  gridCreated(controller) {
    this.controller = controller;
    this.eventID = this.datasource.addEventListener(this.eventHandler.bind(this));
    
    // I want to be able to override this, so you could add/do more with datasource before displaying results
    this.raiseEvent("sortIconUpdate");
    this.controller.updateHeights();
    this.controller.triggerScroll(0);
    this.controller.updateHeaderGrouping(this.datasource.getGrouping())
  }


  eventHandler(event) {
    switch (event) {
      case "collection_changed":
      case "collection_grouped":
      case "collection_collapsed_all":
      case "collection_expanded_all":
        this.raiseEvent("sortIconUpdate");
        this.controller.updateHeights();
        this.controller.triggerScroll(0);
        this.controller.updateHeaderGrouping(this.datasource.getGrouping());
        this.controller.setLoadingScreen(false);
        break;
      case "collection_collapsed":
      case "collection_expanded":
        this.raiseEvent("sortIconUpdate");
        this.controller.updateHeights();
        this.controller.triggerScroll(null);
        this.controller.updateHeaderGrouping(this.datasource.getGrouping());
        this.controller.setLoadingScreen(false);
        break;
      case "collection_sorted":
        this.raiseEvent("sortIconUpdate");
        this.controller.rebindAllRows();
        this.controller.setLoadingScreen(false);
        break;
      case "collection_filtered":
        this.raiseEvent("sortIconUpdate");
        this.controller.updateHeights();
        this.controller.triggerScroll();
        this.controller.setLoadingScreen(false);
        break;

      default:
        console.log("unknown event");
        console.log(event);

    }

  }


  raiseEvent(name, data = {}) {
    let event = new CustomEvent(name, {
      detail: data,
      bubbles: true
    });
    if (this.controller) {
      this.controller.element.dispatchEvent(event);
    }


    return event;
  }


  select(row) {
    this.datasource.select(row);
  }


  length() {
    return this.datasource.length();
  }


  getGrouping() {
    return this.datasource.getGrouping();
  }


  group(grouping:Array<any>, keepExpanded?:Array<any>) {
    this.controller.setLoadingScreen(true, null, this.length()).then(()=> {
      this.datasource.group(grouping, keepExpanded);
    });
  }


  getElement(options) {
    let row = options.row;
    let isDown = options.isDown;
    let callback = options.callback;
    let rowContext = {
      row: row,
      selection: this.selection,
      rowRef: this.datasource.getElement(row)
    };

    callback(rowContext);

  }


  query(a) {
    this.controller.setLoadingScreen(true, null, this.length()).then(()=> {
      this.datasource.query(a);
    });
  }


  orderBy(attribute, addToCurrentSort) {
    this.controller.setLoadingScreen(true, null, this.length()).then(()=> {
      this.datasource.orderBy(attribute, addToCurrentSort);
    });
  }


  destroy() {
    this.datasource.removeEventListener(this.eventID);
  }


  getCurrentOrderBy() {
    return this.datasource.getCurrentOrderBy();
  }


  getCurrentFilter() {
    return this.datasource.getCurrentFilter();
  }


  getFilterOperatorName(operator) {
    return this.datasource.getFilterOperatorName(operator);
  }


  expandGroup(id) {
    this.controller.setLoadingScreen(true, null, this.length()).then(()=> {
      this.datasource.groupExpand(id);
    });
  }


  collapseGroup(id) {
    this.controller.setLoadingScreen(true, null, this.length()).then(()=> {
      this.datasource.groupCollapse(id);
    });
  }

}
