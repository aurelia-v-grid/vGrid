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
          this.vGridSel = "__vGridSel" + Math.floor(Math.random() * 1000 + 1);

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
          var _this2 = this;

          if (this.selectedRows > 0) {
            this.vGrid.vGridCollection.forEach(function (x) {
              if (x[_this2.vGridSel] === true) {
                x[_this2.vGridSel] = false;
              }
            });
          }
          this.selectedRows = 0;
          for (var i = 0; i < newRows.length; i++) {
            this.vGrid.vGridCollectionFiltered[newRows[i]][this.vGridSel] = true;
            this.selectedRows++;
          }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zZWxlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBTWE7QUFTWCxpQkFUVyxjQVNYLENBQVksSUFBWixFQUFrQixLQUFsQixFQUF5QjtnQ0FUZCxnQkFTYzs7ZUFOekIsZ0JBQWdCLE9BTVM7ZUFMekIsa0JBQWtCLENBQUMsQ0FBRCxDQUtPO2VBSnpCLGtCQUFrQixPQUlPO2VBSHpCLGVBQWUsRUFHVTs7O0FBRXZCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FGdUI7QUFHdkIsZUFBSyxRQUFMLEdBQWdCLGVBQWUsS0FBSyxLQUFMLENBQVcsSUFBQyxDQUFLLE1BQUwsS0FBZ0IsSUFBaEIsR0FBd0IsQ0FBekIsQ0FBMUIsQ0FITzs7QUFLdkIsY0FBSSxTQUFTLEtBQVQsRUFBZ0I7QUFDbEIsaUJBQUssYUFBTCxHQUFxQixRQUFyQixDQURrQjtXQUFwQjtBQUdBLGNBQUksU0FBUyxJQUFULEVBQWU7QUFDakIsaUJBQUssYUFBTCxHQUFxQixVQUFyQixDQURpQjtXQUFuQjs7QUFJQSxlQUFLLFNBQUwsR0FBaUIsSUFBSSxHQUFKLENBQVEsRUFBUixDQUFqQixDQVp1QjtTQUF6Qjs7QUFUVyxpQ0EyQlgsMkJBQVEsTUFBTTtBQUNaLGVBQUssYUFBTCxHQUFxQixNQUFyQixDQURZO0FBRVosY0FBSSxTQUFTLEtBQVQsRUFBZ0I7QUFDbEIsaUJBQUssYUFBTCxHQUFxQixRQUFyQixDQURrQjtXQUFwQjtBQUdBLGNBQUksU0FBUyxJQUFULEVBQWU7QUFDakIsaUJBQUssYUFBTCxHQUFxQixVQUFyQixDQURpQjtXQUFuQjs7O0FBaENTLGlDQXVDWCxpQ0FBVyxLQUFLO0FBQ2QsY0FBSSxTQUFTLEtBQVQsQ0FEVTtBQUVkLGNBQUksS0FBSyxZQUFMLEdBQW9CLENBQXBCLEVBQXVCO0FBQ3pCLGdCQUFHLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLEdBQW5DLENBQUgsRUFBMkM7QUFDekMsdUJBQVUs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QixVQUFqQixFQUE2QixLQUFLLGVBQUwsQ0FBN0IsQ0FEcUM7cUJBQXZDLE1BRU87QUFDTCwyQkFBSyxXQUFMLENBQWlCLEtBQUssZUFBTCxFQUFzQixVQUF2QyxFQURLO3FCQUZQOztBQU1BLDBCQVJGOztBQTdDRix1QkF1RE8sS0FBSyxlQUFMLEtBQXlCLE1BQXpCLElBQW1DLG1CQUFtQixPQUFuQjs7QUFFdEMsd0JBQUksS0FBSyxlQUFMLEtBQXlCLENBQUMsQ0FBRCxFQUFJO0FBQy9CLDBCQUFJLEtBQUssZUFBTCxHQUF1QixVQUF2QixFQUFtQztBQUNyQyw2QkFBSyxXQUFMLENBQWlCLFVBQWpCLEVBQTZCLEtBQUssZUFBTCxDQUE3QixDQURxQzt1QkFBdkMsTUFFTztBQUNMLDZCQUFLLFdBQUwsQ0FBaUIsS0FBSyxlQUFMLEVBQXNCLFVBQXZDLEVBREs7dUJBRlA7cUJBREYsTUFNTztBQUNMLDJCQUFLLGVBQUwsR0FBdUIsVUFBdkIsQ0FESztBQUVMLDJCQUFLLE1BQUwsQ0FBWSxVQUFaLEVBRks7cUJBTlA7QUFVQSwwQkFaRjtBQXZERjtBQXFFSSw0QkFBUSxHQUFSLENBQVksZ0NBQVosRUFERjtBQXBFRixpQkFyQnFDO2VBQXZDLE1BNEZPO0FBQ0wscUJBQUssTUFBTCxDQUFZLFVBQVosRUFESztlQTVGUDtBQStGQSxtQkFBSyxlQUFMLEdBQXVCLGNBQXZCLENBakd3RTs7QUFvR3hFLDZCQUFlLHdCQUFmLEdBcEd3RTthQUExRTtXQUZGLE1Bd0dPO0FBRUwsZ0JBQUksRUFBRSxPQUFGLEVBQVc7QUFDYiwrQkFBaUIsTUFBakIsQ0FEYTthQUFmOztBQUtBLGdCQUFJLG1CQUFtQixNQUFuQixFQUEyQjtBQUM3QixtQkFBSyxlQUFMLEdBQXVCLGNBQXZCLENBRDZCO0FBRTdCLHNCQUFRLEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUFSLENBRjZCO0FBRzdCLGtCQUFJLFVBQVUsSUFBVixFQUFnQjtBQUNsQixxQkFBSyxRQUFMLENBQWMsVUFBZCxFQURrQjtlQUFwQjtBQUdBLG1CQUFLLGVBQUwsR0FBdUIsVUFBdkIsQ0FONkI7YUFBL0IsTUFPTztBQUVMLHNCQUFRLEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUFSLENBRks7QUFHTCxtQkFBSyxNQUFMLENBQVksVUFBWixFQUhLO2FBUFA7O0FBYUEsMkJBQWUsd0JBQWYsR0FwQks7V0F4R1A7OztlQTFKUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtc2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
