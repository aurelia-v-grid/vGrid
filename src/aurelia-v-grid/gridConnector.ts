// for typing only
import { DataSource, Selection, Entity, Controller } from './interfaces';





export class GridConnector {
  private selection: Selection;
  private controller: Controller;
  private datasource: DataSource;
  private key: string;
  private errorhandler: Function;
  private eventID: number;


  constructor(datasource: DataSource, selection: Selection, errorHandler?: Function) {
    this.controller = null;
    this.datasource = datasource;
    this.key = datasource.getKey();
    this.selection = datasource.getSelection();
    this.errorhandler = errorHandler || null;
  }


  public getSelection(): Selection {
    return this.selection;
  }


  public gridCreated(controller: Controller): void {
    this.controller = controller;
    this.eventID = this.datasource.addEventListener(this.eventHandler.bind(this));

    // I want to be able to override this, so you could add/do more with datasource before displaying results
    this.raiseEvent('sortIconUpdate');
    this.controller.updateHeights();
    this.controller.triggerScroll(0);
    this.controller.updateHeaderGrouping(this.datasource.getGrouping());
  }

  public select(row: number): void {
    this.datasource.select(row);
  }


  public getDatasourceLength(): number {
    return this.datasource.length;
  }


  public getGrouping(): Array<any> {
    return this.datasource.getGrouping();
  }


  public group(grouping: Array<any>, keepExpanded?: boolean) {
    this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(() => {
      this.datasource.group(grouping, keepExpanded);
    });
  }


  public getElement(options: { row: number, isDown: boolean, callback: Function }): void {

    let rowContext = {
      row: options.row,
      selection: this.selection,
      rowRef: this.datasource.getElement(options.row)
    };

    options.callback(rowContext);

  }


  public query(a: Object): void {
    this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(() => {
      this.datasource.query(a);
    });
  }


  public orderBy(attribute: string | { attribute: string, asc: boolean }, addToCurrentSort?: boolean): void {
    this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(() => {
      this.datasource.orderBy(attribute, addToCurrentSort);
    });
  }


  public destroy(): void {
    this.datasource.removeEventListener(this.eventID);
  }


  public getCurrentOrderBy(): Array<any> {
    return this.datasource.getCurrentOrderBy();
  }


  public getCurrentFilter(): Array<any> {
    return this.datasource.getCurrentFilter();
  }


  public getFilterOperatorName(operator: string): string {
    return this.datasource.getFilterOperatorName(operator);
  }


  public expandGroup(id: string): void {
    this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(() => {
      this.datasource.groupExpand(id);
    });
  }


  public collapseGroup(id: string): void {
    this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(() => {
      this.datasource.groupCollapse(id);
    });
  }


  private eventHandler(event: string): void {
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

      default:
        console.log('unknown event');
        console.log(event);

    }

  }


  private raiseEvent(name: string, data = {}): void {
    let event = new CustomEvent(name, {
      detail: data,
      bubbles: true
    });
    if (this.controller) {
      this.controller.element.dispatchEvent(event);
    }
  }

}
