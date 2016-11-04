/* */ 
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var VGridSelection = exports.VGridSelection = function () {
    function VGridSelection(mode, vGrid) {
      _classCallCheck(this, VGridSelection);

      this.vGrid = vGrid;
      this.vGridConfig = vGrid.vGridConfig;
      this.selectionMode = "none";
      this.lastRowSelected = -1;
      this.lastKeyKodeUsed = "none";
      this.selectedRows = 0;

      if (mode === false) {
        this.selectionMode = "single";
      }
      if (mode === true) {
        this.selectionMode = "multiple";
      }
    }

    VGridSelection.prototype.setMode = function setMode(mode) {
      this.selectionMode = "none";
      if (mode === false) {
        this.selectionMode = "single";
      }
      if (mode === true) {
        this.selectionMode = "multiple";
      }
    };

    VGridSelection.prototype.isSelected = function isSelected(row) {
      return this.vGridConfig.attDataBinder.isRowSelected(row);
    };

    VGridSelection.prototype.deSelect = function deSelect(row) {
      this.vGridConfig.attDataBinder.deSelectRow(row);
    };

    VGridSelection.prototype.select = function select(row, addToSelection) {
      this.vGridConfig.attDataBinder.addRowToSelection(row, addToSelection);
    };

    VGridSelection.prototype.selectRange = function selectRange(start, end) {
      this.vGridConfig.attDataBinder.setSelectionRange(start, end);
    };

    VGridSelection.prototype.getSelectedRows = function getSelectedRows() {
      return this.vGridConfig.attDataBinder.getSelectedRows();
    };

    VGridSelection.prototype.setSelectedRows = function setSelectedRows(newRows) {
      this.vGridConfig.attDataBinder.setSelectedRows(newRows);
    };

    VGridSelection.prototype.getSelectionMode = function getSelectionMode() {
      return this.vGridConfig.attDataBinder.setSelectedRows(newRows);
    };

    VGridSelection.prototype.highlight = function highlight(e, currentRow, vGridGenerator) {

      var isSel;
      var manualSel = this.vGrid.vGridConfig.attManualSelection;
      if (!manualSel) {
        var currentselectedRows = this.getSelectedRows();
        var currentKeyKode = "";

        if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {

          if (currentRow <= vGridGenerator.vGridConfig.getCollectionLength() - 1) {

            if (this.selectionMode === "multiple") {

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
                    this.select(currentRow);
                  }
                  break;
                default:
                  console.error("error, this should not happen, debug selection");
              }
            } else {
              this.select(currentRow);
            }
            this.lastKeyKodeUsed = currentKeyKode;

            vGridGenerator.updateSelectionOnAllRows();
          }
        } else {
          if (e.ctrlKey) {
            currentKeyKode = "ctrl";
          }

          if (currentKeyKode === "ctrl") {
            this.lastKeyKodeUsed = currentKeyKode;
            isSel = this.isSelected(currentRow);
            if (isSel === true) {
              this.deSelect(currentRow);
            }
            this.lastRowSelected = currentRow;
          } else {
            this.select(currentRow);
          }

          vGridGenerator.updateSelectionOnAllRows();
        }
      }
    };

    return VGridSelection;
  }();
});