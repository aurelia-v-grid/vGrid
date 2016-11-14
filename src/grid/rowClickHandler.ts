//for typings only:
import {HtmlCache} from './htmlCache';
import {Controller} from './controller';

export class RowClickHandler {
  element:Element;
  htmlCache:HtmlCache;
  selectionMode:string;
  lastRowSelected:number;
  lastKeyKodeUsed:string;
  selectedRows:number;
  controller:Controller;
  selection:any; //create interface
  manualSelection:boolean;


  constructor(element:Element, htmlCache:HtmlCache) {
    this.element = element;
    this.htmlCache = htmlCache;
    this.selectionMode = "none";
    this.lastRowSelected = -1; //this need to be reset when filtering
    this.lastKeyKodeUsed = "none"; //this ned to be reset when filtering
    this.selectedRows = 0;
  }


  init(mode:boolean, manualSelection:boolean, controller:Controller) {

    this.controller = controller;
    this.selection = controller.getSelectionContext();
    this.manualSelection = manualSelection;

    if (mode === false) {
      this.selectionMode = "single";
    }
    if (mode === true) {
      this.selectionMode = "multiple";
    }

    this.addEventlistener();
  }


  addEventlistener() {
    let avg_left_rows = this.htmlCache.avg_left_rows;
    let avg_main_rows = this.htmlCache.avg_main_rows;
    let avg_right_rows = this.htmlCache.avg_right_rows;

    for (let i = 0; i < avg_left_rows.length; i++) {
      avg_left_rows[i].onclick = this.singleClick.bind(this);
      avg_left_rows[i].ondblclick = this.doubleClick.bind(this);
      avg_main_rows[i].onclick = this.singleClick.bind(this);
      avg_main_rows[i].ondblclick = this.doubleClick.bind(this);
      avg_right_rows[i].onclick = this.singleClick.bind(this);
      avg_right_rows[i].ondblclick = this.doubleClick.bind(this);
    }
  }


  removeEventlistener() {
    let avg_left_rows = this.htmlCache.avg_left_rows;
    let avg_main_rows = this.htmlCache.avg_main_rows;
    let avg_right_rows = this.htmlCache.avg_right_rows;

    for (let i = 0; i < avg_left_rows.length; i++) {
      avg_left_rows[i].onclick = null;
      avg_left_rows[i].ondblclick = null;
      avg_main_rows[i].onclick = null;
      avg_main_rows[i].ondblclick = null;
      avg_right_rows[i].onclick = null;
      avg_right_rows[i].ondblclick = null;
    }
  }


  singleClick(event) {
    if (!event.currentTarget.avgGroup) {
      this.highlightRow(event, event.currentTarget.avgRow);
      this.controller.select(event.currentTarget.avgRow);
    }
    if (!this.manualSelection) {
      this.controller.raiseEvent("v-row-onclick", {
        evt: event,
        data: null,//todo, row data ?
        row: event.currentTarget.avgRow
      });
    }
  }


  isNormalRow() {

  }


  doubleClick(event) {
    this.controller.raiseEvent("v-row-ondblclick", {
      evt: event,
      data: null,//todo, row data ?
      row: event.currentTarget.avgRow
    });
  }


  isSelected(row) {
    return this.selection.isSelected(row);
  }


  deSelect(row) {
    this.selection.deSelect(row);
  }


  select(row, addToSelection) {
    this.selection.select(row, addToSelection);
  }


  selectRange(start, end) {
    this.selection.selectRange(start, end);
  }


  getSelectedRows() {
    return this.selection.getSelectedRows();
  }


  setSelectedRows(newRows) {
    this.selection.setSelectedRows(newRows);
  }


  getSelectionMode() {
    return this.selection.getMode();
  }


  updateSelectionOnAllRows() {

    let rowCache = this.htmlCache.rowCache;
    for (var i = 0; i < rowCache.length; i++) {
      let isSelected = this.selection.isSelected(rowCache[i].row);
      rowCache[i].mainRowViewSlot.bindingContext.selected = isSelected;
      rowCache[i].leftRowViewSlot.bindingContext.selected = isSelected;
      rowCache[i].rightRowViewSlot.bindingContext.selected = isSelected;

      if (isSelected) {
        if (!rowCache[i].main.avgSelected) {
          rowCache[i].main.avgSelected = true;
          rowCache[i].left.classList.add("avg-selected-row");
          rowCache[i].main.classList.add("avg-selected-row");
          rowCache[i].right.classList.add("avg-selected-row");
        }
      } else {
        if (rowCache[i].main.avgSelected) {
          rowCache[i].main.avgSelected = false;
          rowCache[i].left.classList.remove("avg-selected-row");
          rowCache[i].main.classList.remove("avg-selected-row");
          rowCache[i].right.classList.remove("avg-selected-row");
        }
      }
    }

  }


  highlightRow(e, currentRow) {

    var isSel;
    var manualSel = this.manualSelection;
    if (!manualSel) {
      var currentselectedRows = this.getSelectedRows();
      var currentKeyKode = "";

      if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {

        if (currentRow <= (this.controller.collectionLength() - 1)) { //do I need to check this?

          if (this.selectionMode === "multiple") { //if multiselect duh!


            if (e.shiftKey) {
              currentKeyKode = "shift";
              currentselectedRows = this.getSelectedRows();
              if (currentselectedRows.length > 0 && this.lastKeyKodeUsed === "none") {
                this.lastRowSelected = currentselectedRows[0];
                this.lastKeyKodeUsed = "shift";
              }
            }

            if (e.ctrlKey) {
              currentKeyKode = "ctrl";
            }

            if (!e.ctrlKey && !e.shiftKey) {
              currentKeyKode = "none";
            }

            switch (true) {
              case currentKeyKode === "none":
                this.select(currentRow, false);
                break;
              case this.lastKeyKodeUsed === "shift" && currentKeyKode === "ctrl":

                isSel = this.isSelected(currentRow);
                if (isSel === true) {
                  this.deSelect(currentRow);
                } else {
                  this.select(currentRow, true);
                }
                this.lastRowSelected = currentRow;
                break;

              case this.lastKeyKodeUsed === "ctrl" && currentKeyKode === "shift":
                var oldSel = this.getSelectedRows();
                this.selectRange(this.lastRowSelected, currentRow);
                var newSel = this.getSelectedRows();
                this.setSelectedRows(oldSel.concat(newSel));

                break;

              case this.lastKeyKodeUsed === "ctrl" && currentKeyKode === "ctrl":

                isSel = this.isSelected(currentRow);
                if (isSel === true) {
                  this.deSelect(currentRow);
                } else {
                  this.select(currentRow, true);
                }
                this.lastRowSelected = currentRow;
                break;

              case this.lastKeyKodeUsed === "none" && currentKeyKode === "ctrl":

                isSel = this.isSelected(currentRow);
                if (isSel === true) {
                  this.deSelect(currentRow);
                } else {
                  this.select(currentRow, true);
                }
                this.lastRowSelected = currentRow;
                break;

              case this.lastKeyKodeUsed === "shift" && currentKeyKode === "shift":

                if (this.lastRowSelected > currentRow) {
                  this.selectRange(currentRow, this.lastRowSelected);
                } else {
                  this.selectRange(this.lastRowSelected, currentRow);
                }

                break;

              case this.lastKeyKodeUsed === "none" && currentKeyKode === "shift":

                if (this.lastRowSelected !== -1) {
                  if (this.lastRowSelected > currentRow) {
                    this.selectRange(currentRow, this.lastRowSelected);
                  } else {
                    this.selectRange(this.lastRowSelected, currentRow);
                  }
                } else {
                  this.lastRowSelected = currentRow;
                  this.select(currentRow, false);
                }
                break;
              default:
                console.error("error, this should not happen, debug selection");
            }
          } else {
            this.select(currentRow, false);
          }
          this.lastKeyKodeUsed = currentKeyKode;

          //update selection on rows
          this.updateSelectionOnAllRows();
        }
      } else {

        //same row clicked again
        if (e.ctrlKey) {
          currentKeyKode = "ctrl";
        }

        //if ctrl button we want to remove selection
        if (currentKeyKode === "ctrl") {
          this.lastKeyKodeUsed = currentKeyKode;
          isSel = this.isSelected(currentRow);
          if (isSel === true) {
            this.deSelect(currentRow);
          }
          this.lastRowSelected = currentRow;
        } else {
          //else we just want to make it current..
          //isSel = this.isSelected(currentRow);
          this.select(currentRow, false);
        }
        //update selection on rows
        this.updateSelectionOnAllRows();
      }
    }
  }


}
