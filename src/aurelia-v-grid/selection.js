export class Selection {

  constructor(mode) {
    this.mode = mode;
    this.selectedRows = 0;
    this.selection = new Set([]);
  }

  getMode() {
    return this.mode;
  }

  setMode() {
    //todo
  }

  getRowKey(row) {
    return row;
  }

  getRowFromKey(row) {
    return row;
  }

  overrideGetRowKey(fn) {
    this.getRowKey = fn;
  }

  overrideGetRowFromKey(fn) {
    this.getRowFromKey = fn;
  }


  isSelected(row) {
    var result = false;
    if (this.selectedRows > 0) {
      result = this.selection.has(this.getRowKey(row));
    }
    return result;

  }

  deSelectAll() {
    this.selection.clear();
    this.selectedRows = this.selection.size;
  }

  deSelect(row) {
    this.selection.delete(this.getRowKey(row));
    this.selectedRows = this.selection.size;
  }

  select(row, add) {
    switch (this.mode) {
      case "none":
      case null:
      case undefined:
        break;
      case "single":
        this.selection.clear();
        this.selection.add(this.getRowKey(row));
        this.selectedRows = this.selection.size;
        break;
      case "multiple":
        if (!add) {
          this.selection.clear();
          this.selection.add(this.getRowKey(row));
          this.selectedRows = this.selection.size;
        } else {
          this.selection.add(this.getRowKey(row));
          this.selectedRows = this.selection.size;
        }
      default:
      //nothing-> warn ?
    }
  }


  selectRange(start, end) {
    if (this.mode === "multiple") {
      this.selection.clear();
      for (var i = start; i < end + 1; i++) {
        this.selection.add(this.getRowKey(i));
      }
      this.selectedRows = this.selection.size;
    }
  }

  getSelectedRows() {
    var array = [];
    if (this.selectedRows > 0) {
      this.selection.forEach((value) => {
        array.push(this.getRowFromKey(value));
      })
    }
    return array;
  }

  setSelectedRows(newRows) {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    for (var i = 0; i < newRows.length; i++) {
      this.selection.add(this.getRowKey(newRows[i]));
    }
    this.selectedRows = this.selection.size;
  }


  reset() {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    this.lastRowSelected = -1;
    this.lastKeyKodeUsed = "none";
    this.selectedRows = this.selection.size;
  }


}
