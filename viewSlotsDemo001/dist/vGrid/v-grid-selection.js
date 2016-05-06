"use strict";

System.register([], function (_export, _context) {
  var VGridSelection;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("VGridSelection", VGridSelection = function () {
        function VGridSelection(mode, vGrid) {
          _classCallCheck(this, VGridSelection);

          this.selectionMode = "none";
          this.lastRowSelected = -1;
          this.lastKeyKodeUsed = "none";
          this.selectedRows = 0;


          this.vGrid = vGrid;

          if (mode === false) {
            this.selectionMode = "single";
          }
          if (mode === true) {
            this.selectionMode = "multible";
          }

          this.selection = new Set([]);
        }

        VGridSelection.prototype.setMode = function setMode(mode) {
          this.selectionMode = "none";
          if (mode === false) {
            this.selectionMode = "single";
          }
          if (mode === true) {
            this.selectionMode = "multible";
          }
        };

        VGridSelection.prototype.isSelected = function isSelected(row) {
          var result = false;
          if (this.selectedRows > 0) {
            if (this.vGrid.vGridCollectionFiltered[row]) {
              result = this.selection.has(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
            }
          }
          return result;
        };

        VGridSelection.prototype.deSelect = function deSelect(row) {
          if (this.vGrid.vGridCollectionFiltered[row]) {
            this.selection.delete(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
          }
        };

        VGridSelection.prototype.select = function select(row, addToSelection) {
          switch (this.selectionMode) {
            case "none":
            case null:
            case undefined:
              break;
            case "single":
              this.selection.clear();
              if (this.vGrid.vGridCollectionFiltered[row]) {
                this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
              }
              this.selectedRows = this.selection.size;
              break;
            case "multible":
              if (!addToSelection) {
                this.selection.clear();
                if (this.vGrid.vGridCollectionFiltered[row]) {
                  this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
                }
                this.selectedRows = this.selection.size;
              } else {
                if (this.vGrid.vGridCollectionFiltered[row]) {
                  this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
                }
                this.selectedRows = this.selection.size;
              }
          }
        };

        VGridSelection.prototype.selectRange = function selectRange(start, end) {
          if (this.selectionMode === "multible") {
            this.selection.clear();
            for (var i = start; i < end + 1; i++) {
              this.selection.add(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
            }
            this.selectedRows = this.selection.size;
          }
        };

        VGridSelection.prototype.reset = function reset() {
          if (this.selectedRows > 0) {
            this.selection.clear();
          }
          this.lastRowSelected = -1;
          this.lastKeyKodeUsed = "none";
          this.selectedRows = 0;
        };

        VGridSelection.prototype.getSelectedRows = function getSelectedRows() {
          var _this = this;

          var array = [];
          if (this.selectedRows > 0) {
            this.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
              if (_this.selection.has(x[_this.vGrid.vGridRowKey]) === true) {
                array.push(index);
              }
            });
          }
          return array;
        };

        VGridSelection.prototype.setSelectedRows = function setSelectedRows(newRows) {
          if (this.selectedRows > 0) {
            this.selection.clear();
          }
          for (var i = 0; i < newRows.length; i++) {
            this.selection.add(this.vGrid.vGridCollectionFiltered[newRows[i]][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.setHightlight = function setHightlight(e, currentRow, vGridGenerator) {

          var isSel;

          var currentselectedRows = this.getSelectedRows();

          if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {

            if (currentRow <= vGridGenerator.vGridConfig.getCollectionLength() - 1) {

              if (this.selectionMode === "multible") {

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
                    console.log("error, this should not happend");
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
              isSel = this.isSelected(currentRow);
              this.select(currentRow);
            }

            vGridGenerator.updateSelectionOnAllRows();
          }
        };

        return VGridSelection;
      }());

      _export("VGridSelection", VGridSelection);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zZWxlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBTWE7QUFTWCxpQkFUVyxjQVNYLENBQVksSUFBWixFQUFrQixLQUFsQixFQUF5QjtnQ0FUZCxnQkFTYzs7ZUFOekIsZ0JBQWdCLE9BTVM7ZUFMekIsa0JBQWtCLENBQUMsQ0FBRCxDQUtPO2VBSnpCLGtCQUFrQixPQUlPO2VBSHpCLGVBQWUsRUFHVTs7O0FBRXZCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FGdUI7O0FBSXZCLGNBQUksU0FBUyxLQUFULEVBQWdCO0FBQ2xCLGlCQUFLLGFBQUwsR0FBcUIsUUFBckIsQ0FEa0I7V0FBcEI7QUFHQSxjQUFJLFNBQVMsSUFBVCxFQUFlO0FBQ2pCLGlCQUFLLGFBQUwsR0FBcUIsVUFBckIsQ0FEaUI7V0FBbkI7O0FBSUEsZUFBSyxTQUFMLEdBQWlCLElBQUksR0FBSixDQUFRLEVBQVIsQ0FBakIsQ0FYdUI7U0FBekI7O0FBVFcsaUNBMEJYLDJCQUFRLE1BQU07QUFDWixlQUFLLGFBQUwsR0FBcUIsTUFBckIsQ0FEWTtBQUVaLGNBQUksU0FBUyxLQUFULEVBQWdCO0FBQ2xCLGlCQUFLLGFBQUwsR0FBcUIsUUFBckIsQ0FEa0I7V0FBcEI7QUFHQSxjQUFJLFNBQVMsSUFBVCxFQUFlO0FBQ2pCLGlCQUFLLGFBQUwsR0FBcUIsVUFBckIsQ0FEaUI7V0FBbkI7OztBQS9CUyxpQ0FzQ1gsaUNBQVcsS0FBSztBQUNkLGNBQUksU0FBUyxLQUFULENBRFU7QUFFZCxjQUFJLEtBQUssWUFBTCxHQUFvQixDQUFwQixFQUF1QjtBQUN6QixnQkFBSSxLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxHQUFuQyxDQUFKLEVBQTZDO0FBQzNDLHVCQUFTLEtBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsS0FBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsR0FBbkMsRUFBd0MsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUEzRCxD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
