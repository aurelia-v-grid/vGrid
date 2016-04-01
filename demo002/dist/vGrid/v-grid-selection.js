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
        function VGridSelection(mode) {
          _classCallCheck(this, VGridSelection);

          this.selectedRows = [];
          this.selectionMode = "none";
          this.lastRowSelected = 0;
          this.lastKeyKodeUsed = "none";
          this.onClicked = false;


          if (mode === false) {
            this.selectionMode = "single";
          }
          if (mode === true) {
            this.selectionMode = "multible";
          }
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
          if (this.selectedRows.indexOf(row) !== -1) {
            result = true;
          }
          return result;
        };

        VGridSelection.prototype.select = function select(rowSelect, addToSelection) {
          switch (this.selectionMode) {
            case "none":
            case null:
            case undefined:
              break;
            case "single":
              if (this.selectedRows !== undefined) {
                if (this.selectedRows.length > 1) {
                  this.selectedRows = [];
                }
              }
              this.selectedRows[0] = rowSelect;
              break;
            case "multible":
              if (!addToSelection) {
                this.selectedRows = [];
                this.selectedRows[0] = rowSelect;
              } else {
                if (!this.isSelected(rowSelect)) {
                  this.selectedRows.push(rowSelect);
                }
              }
          }
        };

        VGridSelection.prototype.selectRange = function selectRange(start, end) {
          if (this.selectionMode === "multible") {
            this.selectedRows = [];
            for (var i = start; i < end + 1; i++) {
              this.selectedRows.push(i);
            }
          }
        };

        VGridSelection.prototype.reset = function reset() {
          this.selectedRows = [];
        };

        VGridSelection.prototype.getSelectedRows = function getSelectedRows() {
          return this.selectedRows;
        };

        VGridSelection.prototype.setSelectedRows = function setSelectedRows(newRows) {
          this.selectedRows = newRows;
        };

        VGridSelection.prototype.setHightlight = function setHightlight(e, that) {
          var _this = this;

          var isSel;

          var removeRowHighligt = function removeRowHighligt(currentRow) {
            var selectedRows, i;

            var removeFromArray = function removeFromArray(array, row) {
              array.splice(row, 1);
            };

            selectedRows = _this.getSelectedRows();
            for (i = 0; i < selectedRows.length; i++) {
              if (selectedRows[i] === currentRow) {
                removeFromArray(selectedRows, i);
                i--;
              }
            }
            _this.setSelectedRows(selectedRows);
          };

          var currentRow = that.getRowNumberFromClickedOn(e);
          var currentselectedRows = this.getSelectedRows();

          if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {
            this.onClicked = true;

            if (currentRow <= that._private.configFunctions.getCollectionLength() - 1) {

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
                    console.log("error, this should not happend");
                }
              } else {
                this.select(currentRow);
              }
              this.lastKeyKodeUsed = currentKeyKode;

              that.updateSelectionOnAllRows();
            }
          } else {
            if (e.ctrlKey) {
              currentKeyKode = "ctrl";
            }

            if (currentKeyKode === "ctrl") {
              this.lastKeyKodeUsed = currentKeyKode;
              isSel = this.isSelected(currentRow);
              if (isSel === true) {
                removeRowHighligt(currentRow);
              }
              this.lastRowSelected = -1;
            } else {
              isSel = this.isSelected(currentRow);
              this.select(currentRow);
            }

            that.updateSelectionOnAllRows();
          }
        };

        return VGridSelection;
      }());

      _export("VGridSelection", VGridSelection);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zZWxlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBTWE7QUFVWCxpQkFWVyxjQVVYLENBQVksSUFBWixFQUFrQjtnQ0FWUCxnQkFVTzs7ZUFQbEIsZUFBZSxHQU9HO2VBTmxCLGdCQUFnQixPQU1FO2VBTGxCLGtCQUFrQixFQUtBO2VBSmxCLGtCQUFrQixPQUlBO2VBSGxCLFlBQVksTUFHTTs7O0FBRWhCLGNBQUksU0FBUyxLQUFULEVBQWdCO0FBQ2xCLGlCQUFLLGFBQUwsR0FBcUIsUUFBckIsQ0FEa0I7V0FBcEI7QUFHQSxjQUFJLFNBQVMsSUFBVCxFQUFlO0FBQ2pCLGlCQUFLLGFBQUwsR0FBcUIsVUFBckIsQ0FEaUI7V0FBbkI7U0FMRjs7QUFWVyxpQ0FzQlgsMkJBQVEsTUFBSztBQUNYLGVBQUssYUFBTCxHQUFxQixNQUFyQixDQURXO0FBRVgsY0FBSSxTQUFTLEtBQVQsRUFBZ0I7QUFDbEIsaUJBQUssYUFBTCxHQUFxQixRQUFyQixDQURrQjtXQUFwQjtBQUdBLGNBQUksU0FBUyxJQUFULEVBQWU7QUFDakIsaUJBQUssYUFBTCxHQUFxQixVQUFyQixDQURpQjtXQUFuQjs7O0FBM0JTLGlDQWlDWCxpQ0FBVyxLQUFLO0FBQ2QsY0FBSSxTQUFTLEtBQVQsQ0FEVTtBQUVkLGNBQUksS0FBSyxZQUFMLENBQWtCLE9BQWxCLENBQTBCLEdBQTFCLE1BQW1DLENBQUMsQ0FBRCxFQUFJO0FBQ3pDLHFCQUFTLElBQVQsQ0FEeUM7V0FBM0M7QUFHQSxpQkFBTyxNQUFQLENBTGM7OztBQWpDTCxpQ0F5Q1gseUJBQU8sV0FBVyxnQkFBZ0I7QUFDaEMsa0JBQVEsS0FBSyxhQUFMO0FBQ04saUJBQUssTUFBTCxDQURGO0FBRUUsaUJBQUssSUFBTCxDQUZGO0FBR0UsaUJBQUssU0FBTDtBQUNFLG9CQURGO0FBSEYsaUJBS08sUUFBTDtBQUNFLGtCQUFJLEtBQUssWUFBTCxLQUFzQixTQUF0QixFQUFp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RjJFO2FBQTdFO1dBTEYsTUFtR087QUFFTCxnQkFBSSxFQUFFLE9BQUYsRUFBVztBQUNiLCtCQUFpQixNQUFqQixDQURhO2FBQWY7O0FBS0EsZ0JBQUksbUJBQW1CLE1BQW5CLEVBQTJCO0FBQzdCLG1CQUFLLGVBQUwsR0FBdUIsY0FBdkIsQ0FENkI7QUFFN0Isc0JBQVEsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQVIsQ0FGNkI7QUFHN0Isa0JBQUksVUFBVSxJQUFWLEVBQWdCO0FBQ2xCLGtDQUFrQixVQUFsQixFQURrQjtlQUFwQjtBQUdBLG1CQUFLLGVBQUwsR0FBdUIsQ0FBQyxDQUFELENBTk07YUFBL0IsTUFPTztBQUVMLHNCQUFRLEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUFSLENBRks7QUFHTCxtQkFBSyxNQUFMLENBQVksVUFBWixFQUhLO2FBUFA7O0FBYUEsaUJBQUssd0JBQUwsR0FwQks7V0FuR1A7OztlQXJIUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtc2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
