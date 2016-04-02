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


  constructor(mode, that) {

    this.that = that;

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
    if(this.that.collectionFiltered[row]){
      if (this.that.collectionFiltered[row].__sgSelected === true) {
        result = true;
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
              if(x.__sgSelected === true){
                x.__sgSelected = false;
              }
            });

          }
        }
        this.that.collectionFiltered[0] = rowSelect;
        break;
      case "multible":
        if (!addToSelection) {
          this.that.collectionFiltered.forEach((x) => {
            if(x.__sgSelected === true){
              x.__sgSelected = false;
            }
          });
          this.that.collectionFiltered[rowSelect].__sgSelected = true
        } else {
          this.that.collectionFiltered[rowSelect].__sgSelected = true
        }
    }
  };


  selectRange(start, end) {
    if (this.selectionMode === "multible") {
      this.that.collectionFiltered.forEach((x) => {
        if(x.__sgSelected === true){
          x.__sgSelected = false;
        }
      });
      for (var i = start; i < end + 1; i++) {
        this.that.collectionFiltered[i].__sgSelected = true
      }
    }
  };


  reset() {
    this.that.collectionFiltered.forEach((x) => {
      if(x.__sgSelected === true){
        x.__sgSelected = false;
      }
    });
  };

  getSelectedRows() {
    var array = [];
    this.that.collectionFiltered.forEach((x, index) => {
      if(x.__sgSelected === true){
        array.push(index)
      }
    });

    return array
  };

  setSelectedRows(newRows) {
    this.that.collectionFiltered.forEach((x) => {
      if(x.__sgSelected === true){
        x.__sgSelected = false;
      }
    });
    for(var i = 0; i < newRows.length; i++){
      this.that.collectionFiltered[newRows[i]].__sgSelected = true;
    }
  };

  /****************************************************************************************************************************
   * fixes highlight and select...
   ****************************************************************************************************************************/
  setHightlight(e, that) {
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

    var currentRow = that.getRowNumberFromClickedOn(e);
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
