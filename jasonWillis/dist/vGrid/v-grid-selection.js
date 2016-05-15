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

        VGridSelection.prototype.isSelectedMain = function isSelectedMain(row) {
          var result = false;
          if (this.selectedRows > 0) {
            if (this.vGrid.vGridCollection[row]) {
              result = this.selection.has(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
            }
          }
          return result;
        };

        VGridSelection.prototype.deSelect = function deSelect(row) {
          if (this.vGrid.vGridCollectionFiltered[row]) {
            this.selection.delete(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
          }
        };

        VGridSelection.prototype.deSelectMain = function deSelectMain(row) {
          if (this.vGrid.vGridCollection[row]) {
            this.selection.delete(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
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

        VGridSelection.prototype.selectMain = function selectMain(row, addToSelection) {
          switch (this.selectionMode) {
            case "none":
            case null:
            case undefined:
              break;
            case "single":
              this.selection.clear();
              if (this.vGrid.vGridCollection[row]) {
                this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
              }
              this.selectedRows = this.selection.size;
              break;
            case "multible":
              if (!addToSelection) {
                this.selection.clear();
                if (this.vGrid.vGridCollection[row]) {
                  this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
                }
                this.selectedRows = this.selection.size;
              } else {
                if (this.vGrid.vGridCollection[row]) {
                  this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
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

        VGridSelection.prototype.selectAll = function selectAll() {
          if (this.selectionMode === "multible") {
            for (var i = 0; i < this.vGrid.vGridCollectionFiltered.length; i++) {
              this.selection.add(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
            }
            this.selectedRows = this.selection.size;
          }
          if (this.selectionMode === "single" && this.vGrid.vGridCurrentRow >= 0) {
            this.selection.clear();
            this.selection.add(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey]);
            this.selectedRows = this.selection.size;
          }
        };

        VGridSelection.prototype.deSelectAll = function deSelectAll() {
          for (var i = 0; i < this.vGrid.vGridCollectionFiltered.length; i++) {
            this.selection.delete(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.selectRangeMain = function selectRangeMain(start, end) {
          if (this.selectionMode === "multible") {
            this.selection.clear();
            for (var i = start; i < end + 1; i++) {
              this.selection.add(this.vGrid.vGridCollection[i][this.vGrid.vGridRowKey]);
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

        VGridSelection.prototype.getSelectedRowsMain = function getSelectedRowsMain() {
          var _this2 = this;

          var array = [];
          if (this.selectedRows > 0) {
            this.vGrid.vGridCollection.forEach(function (x, index) {
              if (_this2.selection.has(x[_this2.vGrid.vGridRowKey]) === true) {
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

        VGridSelection.prototype.setSelectedRowsMain = function setSelectedRowsMain(newRows) {
          if (this.selectedRows > 0) {
            this.selection.clear();
          }
          for (var i = 0; i < newRows.length; i++) {
            this.selection.add(this.vGrid.vGridCollection[newRows[i]][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.setHightlight = function setHightlight(e, currentRow, vGridGenerator) {

          var isSel;
          var manualSel = this.vGrid.vGridConfig.manualSelection;
          if (!manualSel) {
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
          }
        };

        return VGridSelection;
      }());

      _export("VGridSelection", VGridSelection);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zZWxlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBTWE7QUFTWCxpQkFUVyxjQVNYLENBQVksSUFBWixFQUFrQixLQUFsQixFQUF5QjtnQ0FUZCxnQkFTYzs7ZUFOekIsZ0JBQWdCLE9BTVM7ZUFMekIsa0JBQWtCLENBQUMsQ0FBRCxDQUtPO2VBSnpCLGtCQUFrQixPQUlPO2VBSHpCLGVBQWUsRUFHVTs7O0FBRXZCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FGdUI7O0FBSXZCLGNBQUksU0FBUyxLQUFULEVBQWdCO0FBQ2xCLGlCQUFLLGFBQUwsR0FBcUIsUUFBckIsQ0FEa0I7V0FBcEI7QUFHQSxjQUFJLFNBQVMsSUFBVCxFQUFlO0FBQ2pCLGlCQUFLLGFBQUwsR0FBcUIsVUFBckIsQ0FEaUI7V0FBbkI7O0FBSUEsZUFBSyxTQUFMLEdBQWlCLElBQUksR0FBSixDQUFRLEVBQVIsQ0FBakIsQ0FYdUI7U0FBekI7O0FBVFcsaUNBMEJYLDJCQUFRLE1BQU07QUFDWixlQUFLLGFBQUwsR0FBcUIsTUFBckIsQ0FEWTtBQUVaLGNBQUksU0FBUyxLQUFULEVBQWdCO0FBQ2xCLGlCQUFLLGFBQUwsR0FBcUIsUUFBckIsQ0FEa0I7V0FBcEI7QUFHQSxjQUFJLFNBQVMsSUFBVCxFQUFlO0FBQ2pCLGlCQUFLLGFBQUwsR0FBcUIsVUFBckIsQ0FEaUI7V0FBbkI7OztBQS9CUyxpQ0FzQ1gsaUNBQVcsS0FBSztBQUNkLGNBQUksU0FBUyxLQUFULENBRFU7QUFFZCxjQUFJLEtBQUssWUFBTCxHQUFvQixDQUFwQixFQUF1QjtBQUN6QixnQkFBSSxLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxHQUFuQyxDQUFKLEVBQTZDO0FBQzNDLHVCQUFTLEtBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsS0FBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsR0FBbkMsRUFBd0MsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUEzRCxD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QUFSLENBQVksZ0NBQVosRUFERjtBQXBFRixtQkFyQnFDO2lCQUF2QyxNQTRGTztBQUNMLHVCQUFLLE1BQUwsQ0FBWSxVQUFaLEVBREs7aUJBNUZQO0FBK0ZBLHFCQUFLLGVBQUwsR0FBdUIsY0FBdkIsQ0FqR3dFOztBQW9HeEUsK0JBQWUsd0JBQWYsR0FwR3dFO2VBQTFFO2FBRkYsTUF3R087QUFFTCxrQkFBSSxFQUFFLE9BQUYsRUFBVztBQUNiLGlDQUFpQixNQUFqQixDQURhO2VBQWY7O0FBS0Esa0JBQUksbUJBQW1CLE1BQW5CLEVBQTJCO0FBQzdCLHFCQUFLLGVBQUwsR0FBdUIsY0FBdkIsQ0FENkI7QUFFN0Isd0JBQVEsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQVIsQ0FGNkI7QUFHN0Isb0JBQUksVUFBVSxJQUFWLEVBQWdCO0FBQ2xCLHVCQUFLLFFBQUwsQ0FBYyxVQUFkLEVBRGtCO2lCQUFwQjtBQUdBLHFCQUFLLGVBQUwsR0FBdUIsVUFBdkIsQ0FONkI7ZUFBL0IsTUFPTztBQUVMLHdCQUFRLEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUFSLENBRks7QUFHTCxxQkFBSyxNQUFMLENBQVksVUFBWixFQUhLO2VBUFA7O0FBYUEsNkJBQWUsd0JBQWYsR0FwQks7YUF4R1A7V0FIRjs7O2VBbFBTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1zZWxlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
