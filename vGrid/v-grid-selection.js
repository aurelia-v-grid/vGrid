/*****************************************************************************************************************
 *    vGridSelection
 *    This just inserts the strings into html templates
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridSelection {


  selectionMode = "none";
  lastRowSelected = -1; //this ned to be reset when filtering
  lastKeyKodeUsed = "none"; //this ned to be reset when filtering
  selectedRows = 0;


  constructor(mode, vGrid) {

    this.vGrid = vGrid;
    this.vGridSel = "__vGridSel" + Math.floor((Math.random() * 1000) + 1);

    if (mode === false) {
      this.selectionMode = "single"
    }
    if (mode === true) {
      this.selectionMode = "multible"
    }


  }


  setMode(mode) {
    this.selectionMode = "none";
    if (mode === false) {
      this.selectionMode = "single"
    }
    if (mode === true) {
      this.selectionMode = "multible"
    }

  }


  isSelected(row) {
    var result = false;
    if (this.selectedRows > 0) {
      if (this.vGrid.vGridCollectionFiltered[row]) {
        if (this.vGrid.vGridCollectionFiltered[row][this.vGridSel] === true) {
          result = true;
        }
      }
    }
    return result;
  };


  isSelectedMainCollection(row) {
    var result = false;
    if (this.selectedRows > 0) {
      if (this.vGrid.vGridCollection[row]) {
        if (this.vGrid.vGridCollection[row][this.vGridSel] === true) {
          result = true;
        }
      }
    }
    return result;
  };


  select(rowSelect, addToSelection) {
    switch (this.selectionMode) {
      case "none":
      case null:
      case undefined:
        break;
      case "single":
        if (this.vGrid.vGridCollection !== undefined) {
          if (this.vGrid.vGridCollection.length > 1) {
            this.vGrid.vGridCollection.forEach((x) => {
              if (x[this.vGridSel] === true) {
                x[this.vGridSel] = false;
              }
            });

          }
        }
        this.vGrid.vGridCollectionFiltered[rowSelect][this.vGridSel] = true;
        this.selectedRows = 1;
        break;
      case "multible":
        if (!addToSelection) {
          this.selectedRows = 0;
          this.vGrid.vGridCollection.forEach((x) => {
            if (x[this.vGridSel] === true) {
              x[this.vGridSel] = false;
            }
          });
          this.vGrid.vGridCollectionFiltered[rowSelect][this.vGridSel] = true;
          this.selectedRows++;
        } else {
          this.vGrid.vGridCollectionFiltered[rowSelect][this.vGridSel] = true;
          this.selectedRows++;
        }
    }
  };


  selectMainCollection(rowSelect, addToSelection) {
    switch (this.selectionMode) {
      case "none":
      case null:
      case undefined:
        break;
      case "single":
        if (this.vGrid.vGridCollection !== undefined) {
          if (this.vGrid.vGridCollection.length > 1) {
            this.vGrid.vGridCollection.forEach((x) => {
              if (x[this.vGridSel] === true) {
                x[this.vGridSel] = false;
              }
            });

          }
        }
        this.vGrid.vGridCollection[rowSelect][this.vGridSel] = true;
        this.selectedRows = 1;
        break;
      case "multible":
        if (!addToSelection) {
          this.selectedRows = 0;
          this.vGrid.vGridCollection.forEach((x) => {
            if (x[this.vGridSel] === true) {
              x[this.vGridSel] = false;
            }
          });
          this.vGrid.vGridCollection[rowSelect][this.vGridSel] = true;
          this.selectedRows++;
        } else {
          this.vGrid.vGridCollection[rowSelect][this.vGridSel] = true;
          this.selectedRows++;
        }
    }
  };


  selectRange(start, end) {
    if (this.selectionMode === "multible") {
      this.vGrid.vGridCollection.forEach((x) => {
        if (x[this.vGridSel] === true) {
          x[this.vGridSel] = false;
        }
      });
      this.selectedRows = 0;
      for (var i = start; i < end + 1; i++) {
        this.vGrid.vGridCollectionFiltered[i][this.vGridSel] = true;
        this.selectedRows++;
      }
    }
  };


  selectRangeMainCollection(start, end) {
    if (this.selectionMode === "multible") {
      this.vGrid.vGridCollection.forEach((x) => {
        if (x[this.vGridSel] === true) {
          x[this.vGridSel] = false;
        }
      });
      this.selectedRows = 0;
      for (var i = start; i < end + 1; i++) {
        this.vGrid.vGridCollection[i][this.vGridSel] = true;
        this.selectedRows++;
      }
    }
  };


  reset() {
    if (this.selectedRows > 0) {
      this.vGrid.vGridCollection.forEach((x) => {
        if (x[this.vGridSel] === true) {
          x[this.vGridSel] = false;
        }
      });
    }
    this.lastRowSelected = -1;
    this.lastKeyKodeUsed = "none";
    this.selectedRows = 0;
  };

  resetFilteredOnly() {
    if (this.selectedRows > 0) {
      this.vGrid.vGridCollectionFiltered.forEach((x) => {
        if (x[this.vGridSel] === true) {
          x[this.vGridSel] = false;
        }
      });
    }
    this.lastRowSelected = -1;
    this.lastKeyKodeUsed = "none";
    this.selectedRows = this.getSelectedRowsMainCollection().length;
  };


  getSelectedRows() {
    var array = [];
    if (this.selectedRows > 0) {
      this.vGrid.vGridCollectionFiltered.forEach((x, index) => {
        if (x[this.vGridSel] === true) {
          array.push(index)
        }
      });
    }
    return array
  };

  getSelectedRowsMainCollection() {
    var array = [];
    if (this.selectedRows > 0) {
      this.vGrid.vGridCollection.forEach((x, index) => {
        if (x[this.vGridSel] === true) {
          array.push(index)
        }
      });
    }
    return array
  };


  setSelectedRows(newRows) {
    if (this.selectedRows > 0) {
      this.vGrid.vGridCollection.forEach((x) => {
        if (x[this.vGridSel] === true) {
          x[this.vGridSel] = false;
        }
      });
    }
    this.selectedRows = 0;
    for (var i = 0; i < newRows.length; i++) {
      this.vGrid.vGridCollectionFiltered[newRows[i]][this.vGridSel] = true;
      this.selectedRows++;
    }
  };


  setSelectedRowsMainCollection(newRows) {
    if (this.selectedRows > 0) {
      this.vGrid.vGridCollection.forEach((x) => {
        if (x[this.vGridSel] === true) {
          x[this.vGridSel] = false;
        }
      });
    }
    this.selectedRows = 0;
    for (var i = 0; i < newRows.length; i++) {
      this.vGrid.vGridCollection[newRows[i]][this.vGridSel] = true;
      this.selectedRows++;
    }
  };

  /****************************************************************************************************************************
   * fixes highlight and select...
   ****************************************************************************************************************************/
  setHightlight(e, currentRow, vGridGenerator) {
    //_private.selectionVars.
    var isSel;

    var removeRowHighligt = (currentRow) => {
      var selectedRows, i;

      var removeFromArray = (array, row) => {
        array.splice(row, 1);
      };

      selectedRows = this.getSelectedRows();
      for (i = 0; i < selectedRows.length; i++) {
        if (selectedRows[i] === currentRow) {
          removeFromArray(selectedRows, i);
          i--;
        }
      }
      this.setSelectedRows(selectedRows);
    };

    var currentselectedRows = this.getSelectedRows();

    if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {


      if (currentRow <= (vGridGenerator.vGridConfig.getCollectionLength() - 1)) { //do I need to check this?

        if (this.selectionMode === "multible") { //if multiselect duh!

          var currentKeyKode = "";

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
              this.select(currentRow);
              break;
            case this.lastKeyKodeUsed === "shift" && currentKeyKode === "ctrl":

              isSel = this.isSelected(currentRow);
              if (isSel === true) {
                removeRowHighligt(currentRow);
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
                removeRowHighligt(currentRow);
              } else {
                this.select(currentRow, true);
              }
              this.lastRowSelected = currentRow;
              break;

            case this.lastKeyKodeUsed === "none" && currentKeyKode === "ctrl":

              isSel = this.isSelected(currentRow);
              if (isSel === true) {
                removeRowHighligt(currentRow);
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
                this.select(currentRow);
              }
              break;
            default:
              console.log("error, this should not happend")
          }
        } else {
          this.select(currentRow);
        }
        this.lastKeyKodeUsed = currentKeyKode;

        //update selection on rows
        vGridGenerator.updateSelectionOnAllRows()
      }
    } else {
      //same row clicked again
      if (e.ctrlKey) {
        currentKeyKode = "ctrl";
      }

      //if ctrl button we wanto remove selection
      if (currentKeyKode === "ctrl") {
        this.lastKeyKodeUsed = currentKeyKode;
        isSel = this.isSelected(currentRow);
        if (isSel === true) {
          removeRowHighligt(currentRow);
        }
        this.lastRowSelected = currentRow
      } else {
        //else we just wanto make it current..
        isSel = this.isSelected(currentRow);
        this.select(currentRow);
      }
      //update selection on rows
      vGridGenerator.updateSelectionOnAllRows()
    }
  };


}
