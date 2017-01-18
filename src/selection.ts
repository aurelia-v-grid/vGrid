import { SelectionInterface } from './interfaces';

export class Selection implements SelectionInterface {
  private mode: string;
  private selectedRows: number;
  private selection: Set<number>;
  private eventIdCount: number;
  private eventCallBacks: Function[];



  constructor(mode: string) {
    this.mode = mode;
    this.selectedRows = 0;
    this.eventIdCount = -1;
    this.eventCallBacks = [];
    this.selection = new Set([]);
  }



  /**
   * Triggers event and calls listeners
   * 
   */
  public triggerEvent(event: string): void {
    // call all event listeners
    this.eventCallBacks.forEach((FN, i) => {
      if (FN !== null) {
         let alive = FN(event);
         if (!alive) {
           // todo: remove these after
           this.eventCallBacks[i] = null;
         }
      }
    });
  }



  /**
   * add event to the selection changes
   * 
   */
  public addEventListener(callback: Function): number {
    // add key
    this.eventIdCount++;
    // add to callback queue
    this.eventCallBacks.push(callback);
    // return ID, so they can remove listnener
    return this.eventIdCount;
  }



  /**
   * returns selection size/length
   * 
   */
  public getLength(): number {
    return this.selection.size;
  }



  /**
   * returns selection ode
   * 
   */
  public getMode(): string {
    return this.mode;
  }



  /**
   * returns key of row
   * overridden by default dataosurce to return keys from collection
   * make private?
   * 
   */
  public getRowKey(row: number): number {
    return row;
  }



  /**
   * retunrs all keys in selection
   * overridden by default datasource to return its collection keys
   * make private?
   * 
   */
  public getRowKeys(): any[] {
    return [];
  }



  /**
   * function to override
   * 
   */
  public overrideGetRowKey(fn: (row: number) => number): void {
    this.getRowKey = fn;
  }



  /**
   * function to override getRowKeys
   * 
   */
  public overrideGetRowKeys(fn: () => any[]): void {
    this.getRowKeys = fn;
  }



  /**
   * tells if row is selected true/false
   * 
   */
  public isSelected(row: number): boolean {
    let result = false;
    if (this.selectedRows > 0) {
      result = this.selection.has(this.getRowKey(row));
    }
    return result;

  }



  /**
   * deselcts all rows
   * 
   */
  public deSelectAll(): void {
    this.selection.clear();
    this.selectedRows = this.selection.size;
    this.triggerEvent('selection_changed');
  }



  /**
   * deselct row passed in
   * 
   */
  public deSelect(row: number): void {
    this.selection.delete(this.getRowKey(row));
    this.selectedRows = this.selection.size;
    this.triggerEvent('selection_changed');
  }



  /**
   * select 1 or adds to selection
   * 
   */
  public select(row: number, add?: boolean): void {
    switch (this.mode) {
      case 'none':
      case null:
      case undefined:
        break;
      case 'single':
        this.selection.clear();
        this.selection.add(this.getRowKey(row));
        this.selectedRows = this.selection.size;
        break;
      case 'multiple':
        if (!add) {
          this.selection.clear();
          this.selection.add(this.getRowKey(row));
          this.selectedRows = this.selection.size;
        } else {
          this.selection.add(this.getRowKey(row));
          this.selectedRows = this.selection.size;
        }
        break;
      default:
      // nothing-> warn ?
    }
    this.triggerEvent('selection_changed');
  }



  /**
   * selects range of rows
   * 
   */
  public selectRange(start: number, end: number): void {
    if (this.mode === 'multiple') {
      this.selection.clear();
      for (let i = start; i < end + 1; i++) {
        this.selection.add(this.getRowKey(i));
      }
      this.selectedRows = this.selection.size;
      this.triggerEvent('selection_changed');
    }
  }



  /**
   * retuns selected rows
   * 
   */
  public getSelectedRows(): number[] {
    let array: number[] = [];
    let keys = this.getRowKeys();
    if (this.selectedRows > 0) {
      keys.forEach((key, index) => {
        if (this.selection.has(key) === true) {
          array.push(index);
        }
      });
    }
    return array;
  }



  /**
   * sets new selection/selected rows
   * do we want to have a add params here
   * 
   */
  public setSelectedRows(newRows: number[]): void {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < newRows.length; i++) {
      this.selection.add(this.getRowKey(newRows[i]));
    }
    this.selectedRows = this.selection.size;
    this.triggerEvent('selection_changed');
  }



  /**
   * resets selection to 0
   * its pretty much same as deselect all, remove one ?
   * 
   */
  public reset(): void {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    this.selectedRows = this.selection.size;
    this.triggerEvent('selection_changed');
  }



}
