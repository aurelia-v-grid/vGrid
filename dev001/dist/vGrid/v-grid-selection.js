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
        function VGridSelection(mode, that) {
          _classCallCheck(this, VGridSelection);

          this.selectionMode = "none";
          this.lastRowSelected = 0;
          this.lastKeyKodeUsed = "none";
          this.onClicked = false;


          this.that = that;

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
          if (this.that.collectionFiltered[row]) {
            if (this.that.collectionFiltered[row].__sgSelected === true) {
              result = true;
            }
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
              if (this.that.collectionFiltered !== undefined) {
                if (this.that.collectionFiltered.length > 1) {
                  this.that.collectionFiltered.forEach(function (x) {
                    if (x.__sgSelected === true) {
                      x.__sgSelected = false;
                    }
                  });
                }
              }
              this.that.collectionFiltered[0] = rowSelect;
              break;
            case "multible":
              if (!addToSelection) {
                this.that.collectionFiltered.forEach(function (x) {
                  if (x.__sgSelected === true) {
                    x.__sgSelected = false;
                  }
                });
                this.that.collectionFiltered[rowSelect].__sgSelected = true;
              } else {
                this.that.collectionFiltered[rowSelect].__sgSelected = true;
              }
          }
        };

        VGridSelection.prototype.selectRange = function selectRange(start, end) {
          if (this.selectionMode === "multible") {
            this.that.collectionFiltered.forEach(function (x) {
              if (x.__sgSelected === true) {
                x.__sgSelected = false;
              }
            });
            for (var i = start; i < end + 1; i++) {
              this.that.collectionFiltered[i].__sgSelected = true;
            }
          }
        };

        VGridSelection.prototype.reset = function reset() {
          this.that.collectionFiltered.forEach(function (x) {
            if (x.__sgSelected === true) {
              x.__sgSelected = false;
            }
          });
        };

        VGridSelection.prototype.getSelectedRows = function getSelectedRows() {
          var array = [];
          this.that.collectionFiltered.forEach(function (x, index) {
            if (x.__sgSelected === true) {
              array.push(index);
            }
          });

          return array;
        };

        VGridSelection.prototype.setSelectedRows = function setSelectedRows(newRows) {
          this.that.collectionFiltered.forEach(function (x) {
            if (x.__sgSelected === true) {
              x.__sgSelected = false;
            }
          });
          for (var i = 0; i < newRows.length; i++) {
            this.that.collectionFiltered[newRows[i]].__sgSelected = true;
          }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zZWxlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBTWE7QUFVWCxpQkFWVyxjQVVYLENBQVksSUFBWixFQUFrQixJQUFsQixFQUF3QjtnQ0FWYixnQkFVYTs7ZUFOeEIsZ0JBQWdCLE9BTVE7ZUFMeEIsa0JBQWtCLEVBS007ZUFKeEIsa0JBQWtCLE9BSU07ZUFIeEIsWUFBWSxNQUdZOzs7QUFFdEIsZUFBSyxJQUFMLEdBQVksSUFBWixDQUZzQjs7QUFJdEIsY0FBSSxTQUFTLEtBQVQsRUFBZ0I7QUFDbEIsaUJBQUssYUFBTCxHQUFxQixRQUFyQixDQURrQjtXQUFwQjtBQUdBLGNBQUksU0FBUyxJQUFULEVBQWU7QUFDakIsaUJBQUssYUFBTCxHQUFxQixVQUFyQixDQURpQjtXQUFuQjtTQVBGOztBQVZXLGlDQXlCWCwyQkFBUSxNQUFLO0FBQ1gsZUFBSyxhQUFMLEdBQXFCLE1BQXJCLENBRFc7QUFFWCxjQUFJLFNBQVMsS0FBVCxFQUFnQjtBQUNsQixpQkFBSyxhQUFMLEdBQXFCLFFBQXJCLENBRGtCO1dBQXBCO0FBR0EsY0FBSSxTQUFTLElBQVQsRUFBZTtBQUNqQixpQkFBSyxhQUFMLEdBQXFCLFVBQXJCLENBRGlCO1dBQW5COzs7QUE5QlMsaUNBb0NYLGlDQUFXLEtBQUs7QUFDZCxjQUFJLFNBQVMsS0FBVCxDQURVO0FBRWQsY0FBRyxLQUFLLElBQUwsQ0FBVSxrQkFBVixDQUE2QixHQUE3QixDQUFILEVBQXFDO0FBQ25DLGdCQUFJLEtBQUssSUFBTCxDQUFVLGtCQUFWLENBQTZCLEdBQTdCLEVBQWtDLFlBQWxDLEtBQW1ELElBQW5ELEVBQXlEO0FBQzNELHVCQUFTLElBQVQsQ0FEMkQ7YUFBN0Q7V0FERjtBQUtBLGlCQUFPLE1BQVAsQ0FQYzs7O0FBcENMLGlDQThDWCx5QkFBTyxXQUFXLGdCQUFnQjtBQUNoQyxrQkFBUSxLQUFLLGFBQUw7QUFDTixpQkFBSyxNQUFMLENBREY7QUFF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QU1PO0FBQ0wsMkJBQUssTUFBTCxDQUFZLFVBQVosRUFESztxQkFOUDtBQVNBLDBCQVhGO0FBaERGO0FBNkRJLDRCQUFRLEdBQVIsQ0FBWSxnQ0FBWixFQURGO0FBNURGLGlCQXJCcUM7ZUFBdkMsTUFvRk87QUFDTCxxQkFBSyxNQUFMLENBQVksVUFBWixFQURLO2VBcEZQO0FBdUZBLG1CQUFLLGVBQUwsR0FBdUIsY0FBdkIsQ0F6RjJFOztBQTRGM0UsbUJBQUssd0JBQUwsR0E1RjJFO2FBQTdFO1dBTEYsTUFtR087QUFFTCxnQkFBSSxFQUFFLE9BQUYsRUFBVztBQUNiLCtCQUFpQixNQUFqQixDQURhO2FBQWY7O0FBS0EsZ0JBQUksbUJBQW1CLE1BQW5CLEVBQTJCO0FBQzdCLG1CQUFLLGVBQUwsR0FBdUIsY0FBdkIsQ0FENkI7QUFFN0Isc0JBQVEsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQVIsQ0FGNkI7QUFHN0Isa0JBQUksVUFBVSxJQUFWLEVBQWdCO0FBQ2xCLGtDQUFrQixVQUFsQixFQURrQjtlQUFwQjtBQUdBLG1CQUFLLGVBQUwsR0FBdUIsQ0FBQyxDQUFELENBTk07YUFBL0IsTUFPTztBQUVMLHNCQUFRLEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUFSLENBRks7QUFHTCxtQkFBSyxNQUFMLENBQVksVUFBWixFQUhLO2FBUFA7O0FBYUEsaUJBQUssd0JBQUwsR0FwQks7V0FuR1A7OztlQXZKUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtc2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
