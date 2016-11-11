// for typing only
import { DataSource } from './dataSource';
import { Selection } from './selection';
import { Controller} from './grid/controller';


export class GridConnector {
  public selection: Selection;
  private controller: any;
  private datasource: DataSource;
  private key: any;
  private errorhandler: Function;
  private eventID: number;

  constructor(datasource: DataSource, selection: Selection, errorHandler?: Function) {
    this.controller = null;
    this.datasource = datasource;
    this.key = datasource.key;
    this.selection = datasource.selection;
    this.errorhandler = errorHandler || null;
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


  public length(): number {
    return this.datasource.length();
  }


  public getGrouping(): Array<any> {
    return this.datasource.getGrouping();
  }


  public group(grouping: Array<any>, keepExpanded?: boolean) {
    this.controller.setLoadingScreen(true, null, this.length()).then(() => {
      this.datasource.group(grouping, keepExpanded);
    });
  }


  public getElement(options: any): void {
    let curRow = options.row;
    // let isDown = options.isDown;
    let callback = options.callback;
    let rowContext = {
      row: curRow,
      selection: this.selection,
      rowRef: this.datasource.getElement(curRow)
    };

    callback(rowContext);

  }


  public query(a: Object): void {
    this.controller.setLoadingScreen(true, null, this.length()).then(() => {
      this.datasource.query(a);
    });
  }


  public orderBy(attribute: string, addToCurrentSort?: boolean): void {
    this.controller.setLoadingScreen(true, null, this.length()).then(() => {
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
    this.controller.setLoadingScreen(true, null, this.length()).then(() => {
      this.datasource.groupExpand(id);
    });
  }


  public collapseGroup(id: string): void {
    this.controller.setLoadingScreen(true, null, this.length()).then(() => {
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
        this.controller.triggerScroll();
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
