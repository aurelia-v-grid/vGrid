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
  BindingContext } from './interfaces';

export class GridConnector implements GridConnectorInterface {
  private selection: Selection;
  private controller: Controller;
  private datasource: DataSource;
  private key: string;
  private errorhandler: Function;
  private eventID: number;

  constructor(datasource: DataSource, selection?: Selection, errorHandler?: Function) {
    this.controller = null;
    this.datasource = datasource;
    this.key = datasource.getKey();
    this.selection = selection || datasource.getSelection();
    this.errorhandler = errorHandler || null;
  }

  public getSelection(): SelectionInterface {
    return this.selection;
  }

  public connect(controller: Controller, create: Function): void {
    this.controller = controller;
    this.eventID = this.datasource.addEventListener(this.eventHandler.bind(this));
    create();
  }

  public gridCreated(): void {
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
    return this.datasource.length();
  }

  public getColConfig(): ColConfig[] {
    return this.controller.getColumnConfig();
  }

  public setColConfig(colconfig: ColConfig[]): void {
    this.controller.setColumnConfig(colconfig);
  }

  public getGrouping(): string[] {
    return this.datasource.getGrouping();
  }

  public group(grouping: string[], keepExpanded?: boolean): void {
    this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(() => {
      this.datasource.group(grouping, keepExpanded);
    });
  }

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

  public query(a: FilterObject[]): void {
    this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(() => {
      this.datasource.query(a);
    });
  }

  public orderBy(attribute: string | SortObject, addToCurrentSort?: boolean): void {
    this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(() => {
      this.datasource.orderBy(attribute, addToCurrentSort);
    });
  }

  public destroy(): void {
    this.datasource.removeEventListener(this.eventID);
  }

  public getCurrentOrderBy(): SortObject[] {
    return this.datasource.getCurrentOrderBy();
  }

  public getCurrentFilter(): FilterObject[] {
    return this.datasource.getCurrentFilter();
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

  public triggerI18n() {
    this.controller.triggerI18N();
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
        console.warn('unknown event');
        console.warn(event);
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

  private getRowProperties(obj: {[key: string]: any}): {} {
    let x: {[key: string]: any} = {};
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
