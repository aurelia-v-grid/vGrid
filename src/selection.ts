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

  public addEventListener(callback: Function): number {
    // add key
    this.eventIdCount++;
    // add to callback queue
    this.eventCallBacks.push(callback);
    // return ID, so they can remove listnener
    return this.eventIdCount;
  }

  public getLength(): number {
    return this.selection.size;
  }

  public getMode(): string {
    return this.mode;
  }

  public getRowKey(row: number): number {
    return row;
  }

  public getRowKeys(): any[] {
    return [];
  }

  public overrideGetRowKey(fn: (row: number) => number): void {
    this.getRowKey = fn;
  }

  public overrideGetRowKeys(fn: () => any[]): void {
    this.getRowKeys = fn;
  }

  public isSelected(row: number): boolean {
    let result = false;
    if (this.selectedRows > 0) {
      result = this.selection.has(this.getRowKey(row));
    }
    return result;

  }

  public deSelectAll(): void {
    this.selection.clear();
    this.selectedRows = this.selection.size;
    this.triggerEvent('selection_changed');
  }

  public deSelect(row: number): void {
    this.selection.delete(this.getRowKey(row));
    this.selectedRows = this.selection.size;
    this.triggerEvent('selection_changed');
  }

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

  // only uses visiable rows when getting selected rows, todo: add option for getting all when filtered
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

  public reset(): void {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    this.selectedRows = this.selection.size;
    this.triggerEvent('selection_changed');
  }

}
