// for typing only
import {
  SelectionInterface,
  GridConnectorInterface,
  DataSource,
  Selection,
  SortObject,
  FilterObject,
  Controller,
  Entity,
  ColConfig,
  BindingContext,
  GroupingObj
} from './interfaces';

export class GridConnector implements GridConnectorInterface {
  private selection: Selection;
  private controller: Controller;
  private datasource: DataSource;
  private key: string;
  private errorhandler: Function;
  private eventID: number;
  private initTop: number = 0;



  /**
   * Creates an instance of GridConnector.
   * 
   */
  constructor(datasource: DataSource, selection?: Selection, errorHandler?: Function) {
    this.controller = null;
    this.datasource = datasource;
    this.key = datasource.getKey();
    this.selection = selection || datasource.getSelection();
    this.errorhandler = errorHandler || null;
  }



  /**
   * Set scroll value grid will use when it loads
   * Useful for when going back from a detail view
   * Used by default datasource
   * 
   */
  public setInitTop(top: number): void {
    this.initTop = top;
  }



  /**
   * Grid will call for this when a row is clicked
   * Need be in custom gridConnector
   * 
   */
  public getSelection(): SelectionInterface {
    return this.selection;
  }



  /**
   * Grid calls this to connect, we then haveto call the create function to grid to generate
   * Some might need to get a datasource ready first/call server so its usefull to know if should be created
   * Need be in custom gridConnector
   * 
   */
  public connect(controller: Controller, create: Function): void {
    this.controller = controller;
    this.eventID = this.datasource.addEventListener(this.eventHandler.bind(this));
    create();
  }



  /**
   * Grid calls this when its created, you can now tell it to display data etc
   * Need be in custom gridConnector
   * 
   */
  public gridCreated(): void {
    // I want to be able to override this, so you could add/do more with datasource before displaying results
    this.raiseEvent('sortIconUpdate');
    this.controller.updateHeights();
    setTimeout(() => {
      this.controller.updateHeaderGrouping(this.datasource.getGrouping());
      this.raiseEvent('sortIconUpdate');
      this.raiseEvent('filterUpdateValues');
      this.controller.triggerScroll(this.initTop);
    }, 0);
    this.controller.updateHeaderGrouping(this.datasource.getGrouping());
  }



  /**
   * Grid will use this to select in datasource
   * Need be in custom gridConnector
   * 
   */
  public select(row: number): void {
    this.datasource.select(row);
  }



  /**
   * Grid will use this to know what size the body needs to be
   * Is called a lot, so never call a remote for this data when grid needs it
   * Need be in custom gridConnector
   * 
   */
  public getDatasourceLength(): number {
    return this.datasource.length();
  }



  /**
   * Can be used for getting column config inside grid
   * Used by default datasource
   * 
   */
  public getColConfig(): ColConfig[] {
    return this.controller.getColumnConfig();
  }



  /**
   * Can be used for setting column config inside grid
   * Used by default datasource
   * 
   */
  public setColConfig(colconfig: ColConfig[]): void {
    this.controller.setColumnConfig(colconfig);
  }



  /**
   * Grid will call this to know if there is any grouping/what grouping is
   * Need be in custom gridConnector
   * 
   */
  public getGrouping(): GroupingObj[] {
    return this.datasource.getGrouping();
  }



  /**
   * Grid calls to tell it want to group
   * Need be in custom gridConnector
   * 
   */
  public group(grouping: GroupingObj[], keepExpanded?: boolean): void {
    this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(() => {
      this.datasource.group(grouping, keepExpanded);
    });
  }



  /**
   * Grid calls to get entity for a row
   * Need be in custom gridConnector
   * 
   */
  public getElement(options: { row: number, isDown: boolean, callback: Function }): void {
    let rowData: Entity = this.datasource.getElement(options.row);
    let rowContext = ({
      row: options.row,
      selection: this.selection,
      rowRef: rowData,
      tempRef: this.getRowProperties(rowData)
    } as BindingContext);

    options.callback(rowContext);
  }



  /**
   * Grid calls to tell it want to query
   * Need be in custom gridConnector
   * 
   */
  public query(a: FilterObject[]): void {
    this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(() => {
      this.datasource.query(a);
    });
  }



  /**
   * Grid calls to tell it want to sort
   * Need be in custom gridConnector
   * 
   */
  public orderBy(attribute: string | SortObject, addToCurrentSort?: boolean): void {
    this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(() => {
      this.datasource.orderBy(attribute, addToCurrentSort);
    });
  }



  /**
   * used to cut connection between gridConnector and datasource
   * TODO: do I even use this/need this?
   * 
   */
  public destroy(): void {
    this.datasource.removeEventListener(this.eventID);
  }



  /**
   * Grid calls to tell it want to know the current sort order
   * Need be in custom gridConnector
   * 
   */
  public getCurrentOrderBy(): SortObject[] {
    return this.datasource.getCurrentOrderBy();
  }



  /**
   * Grid calls to tell it want to know the current filter
   * Need be in custom gridConnector
   * 
   */
  public getCurrentFilter(): FilterObject[] {
    return this.datasource.getCurrentFilter();
  }



  /**
   * Grid calls to tell it want to expand a group/all
   * Need be in custom gridConnector
   * 
   */
  public expandGroup(id: string): void {
    this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(() => {
      this.datasource.groupExpand(id);
    });
  }



  /**
   * Grid calls to tell it want to collapse a group/all
   * Need be in custom gridConnector
   * 
   */
  public collapseGroup(id: string): void {
    this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(() => {
      this.datasource.groupCollapse(id);
    });
  }



  /**
   * Can be used to get current scrolltop
   * Use this with setInitTop if you want to go between master/detail and have same rows displayed
   * 
   */
  public getTopRow(): number {
    return this.controller.getTopRow();
  }



  /**
   * Forces grid to try and update language
   * 
   */
  public triggerI18n() {
    this.controller.triggerI18N();
  }



  /**
   * Raise event on the grid element, usefull for overriding default behavior
   * TODO: I really dont want much of this, at own expense
   * 
   */
  public raiseEvent(name: string, data = {}): void {
    let event = new CustomEvent(name, {
      detail: data,
      bubbles: true
    });
    if (this.controller) {
      this.controller.element.dispatchEvent(event);
    }
  }



  /**
   * Listen for the events from datasource, and calls needed functions
   * TODO: look over all event names and rename a few
   * 
   */
  private eventHandler(event: string): boolean {
    switch (event) {
      case 'collection_changed':
      case 'collection_grouped':
      case 'collection_collapsed_all':
      case 'collection_expanded_all':
        this.raiseEvent('sortIconUpdate');
        this.controller.updateHeights();
        this.controller.triggerScroll(0);
        this.controller.updateHeaderGrouping(this.datasource.getGrouping());
        this.controller.setLoadingScreen(false);
        break;
      case 'collection_collapsed':
      case 'collection_expanded':
      case 'collection_updated':
        this.raiseEvent('sortIconUpdate');
        this.controller.updateHeights();
        this.controller.triggerScroll(null);
        this.controller.updateHeaderGrouping(this.datasource.getGrouping());
        this.controller.setLoadingScreen(false);
        break;
      case 'collection_sorted':
        this.raiseEvent('sortIconUpdate');
        this.controller.rebindAllRows();
        this.controller.setLoadingScreen(false);
        break;
      case 'collection_filtered':
        this.raiseEvent('sortIconUpdate');
        this.controller.updateHeights();
        this.controller.triggerScroll(null);
        this.controller.setLoadingScreen(false);
        break;
      case 'selection_changed':
        // nothing atm
        break;
      default:
        console.warn('unknown event');
        console.warn(event);
    }
    return true;
  }



  /**
   * Just used to get data for tempRef, cant use javascript refrense here
   * 
   */
  private getRowProperties(obj: { [key: string]: any }): {} {
    let x: { [key: string]: any } = {};
    if (obj) {
      let k: any;
      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (x[k] !== obj[k]) {
            x[k] = obj[k];
          }
        }
      }
    }
    return x;
  }

}
