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
   * todo description
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
   * todo description
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
   * todo description
   * 
   */
  public getLength(): number {
    return this.selection.size;
  }



  /**
   * todo description
   * 
   */
  public getMode(): string {
    return this.mode;
  }



  /**
   * todo description
   * 
   */
  public getRowKey(row: number): number {
    return row;
  }



  /**
   * todo description
   * 
   */
  public getRowKeys(): any[] {
    return [];
  }



  /**
   * todo description
   * 
   */
  public overrideGetRowKey(fn: (row: number) => number): void {
    this.getRowKey = fn;
  }



  /**
   * todo description
   * 
   */
  public overrideGetRowKeys(fn: () => any[]): void {
    this.getRowKeys = fn;
  }



  /**
   * todo description
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
   * todo description
   * 
   */
  public deSelectAll(): void {
    this.selection.clear();
    this.selectedRows = this.selection.size;
    this.triggerEvent('selection_changed');
  }



  /**
   * todo description
   * 
   */
  public deSelect(row: number): void {
    this.selection.delete(this.getRowKey(row));
    this.selectedRows = this.selection.size;
    this.triggerEvent('selection_changed');
  }



  /**
   * todo description
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
   * todo description
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
   * todo description
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
   * todo description
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
   * todo description
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
