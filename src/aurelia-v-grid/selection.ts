export class Selection {
  private mode: string;
  private selectedRows: number;
  private selection: Set<any>;
  private lastRowSelected: number;
  private lastKeyKodeUsed: string;

  constructor(mode) {
    this.mode = mode;
    this.selectedRows = 0;
    this.selection = new Set([]);
  }

  public getMode(): string {
    return this.mode;
  }

  public setMode(): void {
    // todo
  }

  public getRowKey(row): string {
    return row;
  }

  public getRowFromKey(row): number {
    return row;
  }

  public overrideGetRowKey(fn): void {
    this.getRowKey = fn;
  }

  public overrideGetRowFromKey(fn): void {
    this.getRowFromKey = fn;
  }


  public isSelected(row): boolean {
    let result = false;
    if (this.selectedRows > 0) {
      result = this.selection.has(this.getRowKey(row));
    }
    return result;

  }

  public deSelectAll(): void {
    this.selection.clear();
    this.selectedRows = this.selection.size;
  }

  public deSelect(row): void {
    this.selection.delete(this.getRowKey(row));
    this.selectedRows = this.selection.size;
  }

  public select(row, add): void {
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
  }


  public selectRange(start, end): void {
    if (this.mode === 'multiple') {
      this.selection.clear();
      for (let i = start; i < end + 1; i++) {
        this.selection.add(this.getRowKey(i));
      }
      this.selectedRows = this.selection.size;
    }
  }

  public getSelectedRows(): Array<any> {
    let array = [];
    if (this.selectedRows > 0) {
      this.selection.forEach((value) => {
        array.push(this.getRowFromKey(value));
      });
    }
    return array;
  }

  public setSelectedRows(newRows): void {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    for (let i = 0; i < newRows.length; i++) {
      this.selection.add(this.getRowKey(newRows[i]));
    }
    this.selectedRows = this.selection.size;
  }


  public reset(): void {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    this.lastRowSelected = -1;
    this.lastKeyKodeUsed = 'none';
    this.selectedRows = this.selection.size;
  }


}
