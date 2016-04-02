/*****************************************************************************************************************
 *    vGridSelection
 *    This just inserts the strings into html templates
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridSelection {



  selectionMode = "none";
  lastRowSelected = 0;
  lastKeyKodeUsed = "none";
  onClicked = false;
  selectedRows = 0;


  constructor(mode, that) {

    this.that = that;
    this.sgSel = "__vGridSel" + Math.floor((Math.random() * 1000) + 1);

    if (mode === false) {
      this.selectionMode = "single"
    }
    if (mode === true) {
      this.selectionMode = "multible"
    }


  }


  setMode(mode){
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
    if(this.selectedRows > 0){
      if(this.that.collectionFiltered[row]){
        if (this.that.collectionFiltered[row][this.sgSel] === true) {
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
        if (this.that.collectionFiltered !== undefined) {
          if (this.that.collectionFiltered.length > 1) {
            this.that.collectionFiltered.forEach((x) => {
              if(x[this.sgSel] === true){
                x[this.sgSel] = false;
              }
            });

          }
        }
        this.that.collectionFiltered[rowSelect][this.sgSel] = true;
        this.selectedRows = 1;
        break;
      case "multible":
        if (!addToSelection) {
          this.selectedRows = 0;
          this.that.collectionFiltered.forEach((x) => {
            if(x[this.sgSel] === true){
              x[this.sgSel] = false;
            }
          });
          this.that.collectionFiltered[rowSelect][this.sgSel] = true;
          this.selectedRows++;
        } else {
          this.that.collectionFiltered[rowSelect][this.sgSel] = true;
          this.selectedRows++;
        }
    }
  };


  selectRange(start, end) {
    if (this.selectionMode === "multible") {
      this.that.collectionFiltered.forEach((x) => {
        if(x[this.sgSel] === true){
          x[this.sgSel] = false;
        }
      });
      this.selectedRows = 0;
      for (var i = start; i < end + 1; i++) {
        this.that.collectionFiltered[i][this.sgSel] = true;
        this.selectedRows++;
      }
    }
  };


  reset() {
    if(this.selectedRows > 0){
      this.that.collectionFiltered.forEach((x) => {
        if(x[this.sgSel] === true){
          x[this.sgSel] = false;
        }
      });
    }
    this.selectedRows = 0;
  };

  getSelectedRows() {
    var array = [];
    if(this.selectedRows > 0){
      this.that.collectionFiltered.forEach((x, index) => {
        if(x[this.sgSel] === true){
          array.push(index)
        }
      });
    }
    return array
  };

  setSelectedRows(newRows) {
    if(this.selectedRows > 0) {
      this.that.collectionFiltered.forEach((x) => {
        if (x[this.sgSel] === true) {
          x[this.sgSel] = false;
        }
      });
    }
    this.selectedRows = 0;
    for(var i = 0; i < newRows.length; i++){
      this.that.collectionFiltered[newRows[i]][this.sgSel] = true;
      this.selectedRows++;
    }
  };

  /****************************************************************************************************************************
   * fixes highlight and select...
   ****************************************************************************************************************************/
  setHightlight(e, currentRow, that) {
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

      //if not same row clicked again..
      this.onClicked = true;

      if (currentRow <= (that._private.configFunctions.getCollectionLength() - 1)) { //do I need to check this?

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
              break;

            case this.lastKeyKodeUsed === "ctrl" && currentKeyKode === "shift":

              this.selectRange(this.lastRowSelected, currentRow);
              break;

            case this.lastKeyKodeUsed === "ctrl" && currentKeyKode === "ctrl":

              isSel = this.isSelected(currentRow);
              if (isSel === true) {
                removeRowHighligt(currentRow);
              } else {
                this.select(currentRow, true);
              }
              break;

            case this.lastKeyKodeUsed === "none" && currentKeyKode === "ctrl":

              isSel = this.isSelected(currentRow);
              if (isSel === true) {
                removeRowHighligt(currentRow);
              } else {
                this.select(currentRow, true);
              }
              break;

            case this.lastKeyKodeUsed === "shift" && currentKeyKode === "shift":

              if (this.lastRowSelected > currentRow) {
                this.selectRange(currentRow, this.lastRowSelected);
              } else {
                this.selectRange(this.lastRowSelected, currentRow);
              }
              break;

            case this.lastKeyKodeUsed === "none" && currentKeyKode === "shift":

              if (this.lastRowSelected !== null) {
                if (this.lastRowSelected > currentRow) {
                  this.selectRange(currentRow, this.lastRowSelected);
                } else {
                  this.selectRange(this.lastRowSelected, currentRow);
                }
              } else {
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
        that.updateSelectionOnAllRows()
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
        this.lastRowSelected = -1
      } else {
        //else we just wanto make it current..
        isSel = this.isSelected(currentRow);
        this.select(currentRow);
      }
      //update selection on rows
      that.updateSelectionOnAllRows()
    }
  };
  
  
  


}
