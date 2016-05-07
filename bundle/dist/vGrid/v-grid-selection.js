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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zZWxlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBTWEsYztBQVNYLGdDQUFZLElBQVosRUFBa0IsS0FBbEIsRUFBeUI7QUFBQTs7QUFBQSxlQU56QixhQU15QixHQU5ULE1BTVM7QUFBQSxlQUx6QixlQUt5QixHQUxQLENBQUMsQ0FLTTtBQUFBLGVBSnpCLGVBSXlCLEdBSlAsTUFJTztBQUFBLGVBSHpCLFlBR3lCLEdBSFYsQ0FHVTs7O0FBRXZCLGVBQUssS0FBTCxHQUFhLEtBQWI7O0FBRUEsY0FBSSxTQUFTLEtBQWIsRUFBb0I7QUFDbEIsaUJBQUssYUFBTCxHQUFxQixRQUFyQjtBQUNEO0FBQ0QsY0FBSSxTQUFTLElBQWIsRUFBbUI7QUFDakIsaUJBQUssYUFBTCxHQUFxQixVQUFyQjtBQUNEOztBQUVELGVBQUssU0FBTCxHQUFpQixJQUFJLEdBQUosQ0FBUSxFQUFSLENBQWpCO0FBR0Q7O2lDQUdELE8sb0JBQVEsSSxFQUFNO0FBQ1osZUFBSyxhQUFMLEdBQXFCLE1BQXJCO0FBQ0EsY0FBSSxTQUFTLEtBQWIsRUFBb0I7QUFDbEIsaUJBQUssYUFBTCxHQUFxQixRQUFyQjtBQUNEO0FBQ0QsY0FBSSxTQUFTLElBQWIsRUFBbUI7QUFDakIsaUJBQUssYUFBTCxHQUFxQixVQUFyQjtBQUNEO0FBRUYsUzs7aUNBR0QsVSx1QkFBVyxHLEVBQUs7QUFDZCxjQUFJLFNBQVMsS0FBYjtBQUNBLGNBQUksS0FBSyxZQUFMLEdBQW9CLENBQXhCLEVBQTJCO0FBQ3pCLGdCQUFJLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLEdBQW5DLENBQUosRUFBNkM7QUFDM0MsdUJBQVMsS0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxHQUFuQyxFQUF3QyxLQUFLLEtBQUwsQ0FBVyxXQUFuRCxDQUFuQixDQUFUO0FBQ0Q7QUFDRjtBQUNELGlCQUFPLE1BQVA7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QXlCLE1BQXpCLElBQW1DLG1CQUFtQixNQUEzRDs7QUFFRSw0QkFBUSxLQUFLLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBUjtBQUNBLHdCQUFJLFVBQVUsSUFBZCxFQUFvQjtBQUNsQiwyQkFBSyxRQUFMLENBQWMsVUFBZDtBQUNELHFCQUZELE1BRU87QUFDTCwyQkFBSyxNQUFMLENBQVksVUFBWixFQUF3QixJQUF4QjtBQUNEO0FBQ0QseUJBQUssZUFBTCxHQUF1QixVQUF2QjtBQUNBOztBQUVGLHVCQUFLLEtBQUssZUFBTCxLQUF5QixPQUF6QixJQUFvQyxtQkFBbUIsT0FBNUQ7O0FBRUUsd0JBQUksS0FBSyxlQUFMLEdBQXVCLFVBQTNCLEVBQXVDO0FBQ3JDLDJCQUFLLFdBQUwsQ0FBaUIsVUFBakIsRUFBNkIsS0FBSyxlQUFsQztBQUNELHFCQUZELE1BRU87QUFDTCwyQkFBSyxXQUFMLENBQWlCLEtBQUssZUFBdEIsRUFBdUMsVUFBdkM7QUFDRDs7QUFFRDs7QUFFRix1QkFBSyxLQUFLLGVBQUwsS0FBeUIsTUFBekIsSUFBbUMsbUJBQW1CLE9BQTNEOztBQUVFLHdCQUFJLEtBQUssZUFBTCxLQUF5QixDQUFDLENBQTlCLEVBQWlDO0FBQy9CLDBCQUFJLEtBQUssZUFBTCxHQUF1QixVQUEzQixFQUF1QztBQUNyQyw2QkFBSyxXQUFMLENBQWlCLFVBQWpCLEVBQTZCLEtBQUssZUFBbEM7QUFDRCx1QkFGRCxNQUVPO0FBQ0wsNkJBQUssV0FBTCxDQUFpQixLQUFLLGVBQXRCLEVBQXVDLFVBQXZDO0FBQ0Q7QUFDRixxQkFORCxNQU1PO0FBQ0wsMkJBQUssZUFBTCxHQUF1QixVQUF2QjtBQUNBLDJCQUFLLE1BQUwsQ0FBWSxVQUFaO0FBQ0Q7QUFDRDtBQUNGO0FBQ0UsNEJBQVEsR0FBUixDQUFZLGdDQUFaO0FBckVKO0FBdUVELGVBNUZELE1BNEZPO0FBQ0wscUJBQUssTUFBTCxDQUFZLFVBQVo7QUFDRDtBQUNELG1CQUFLLGVBQUwsR0FBdUIsY0FBdkI7O0FBR0EsNkJBQWUsd0JBQWY7QUFDRDtBQUNGLFdBeEdELE1Bd0dPO0FBRUwsZ0JBQUksRUFBRSxPQUFOLEVBQWU7QUFDYiwrQkFBaUIsTUFBakI7QUFDRDs7QUFHRCxnQkFBSSxtQkFBbUIsTUFBdkIsRUFBK0I7QUFDN0IsbUJBQUssZUFBTCxHQUF1QixjQUF2QjtBQUNBLHNCQUFRLEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUFSO0FBQ0Esa0JBQUksVUFBVSxJQUFkLEVBQW9CO0FBQ2xCLHFCQUFLLFFBQUwsQ0FBYyxVQUFkO0FBQ0Q7QUFDRCxtQkFBSyxlQUFMLEdBQXVCLFVBQXZCO0FBQ0QsYUFQRCxNQU9PO0FBRUwsc0JBQVEsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQVI7QUFDQSxtQkFBSyxNQUFMLENBQVksVUFBWjtBQUNEOztBQUVELDJCQUFlLHdCQUFmO0FBQ0Q7QUFDRixTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1zZWxlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
