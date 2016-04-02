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
          this.sgSel = "sgSel" + Math.floor(Math.random() * 1000 + 1);

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
            if (this.that.collectionFiltered[row][this.sgSel] === true) {
              result = true;
            }
          }
          return result;
        };

        VGridSelection.prototype.select = function select(rowSelect, addToSelection) {
          var _this = this;

          switch (this.selectionMode) {
            case "none":
            case null:
            case undefined:
              break;
            case "single":
              if (this.that.collectionFiltered !== undefined) {
                if (this.that.collectionFiltered.length > 1) {
                  this.that.collectionFiltered.forEach(function (x) {
                    if (x[_this.sgSel] === true) {
                      x[_this.sgSel] = false;
                    }
                  });
                }
              }
              this.that.collectionFiltered[0] = rowSelect;
              break;
            case "multible":
              if (!addToSelection) {
                this.that.collectionFiltered.forEach(function (x) {
                  if (x[_this.sgSel] === true) {
                    x[_this.sgSel] = false;
                  }
                });
                this.that.collectionFiltered[rowSelect][this.sgSel] = true;
              } else {
                this.that.collectionFiltered[rowSelect][this.sgSel] = true;
              }
          }
        };

        VGridSelection.prototype.selectRange = function selectRange(start, end) {
          var _this2 = this;

          if (this.selectionMode === "multible") {
            this.that.collectionFiltered.forEach(function (x) {
              if (x[_this2.sgSel] === true) {
                x[_this2.sgSel] = false;
              }
            });
            for (var i = start; i < end + 1; i++) {
              this.that.collectionFiltered[i][this.sgSel] = true;
            }
          }
        };

        VGridSelection.prototype.reset = function reset() {
          var _this3 = this;

          this.that.collectionFiltered.forEach(function (x) {
            if (x[_this3.sgSel] === true) {
              x[_this3.sgSel] = false;
            }
          });
        };

        VGridSelection.prototype.getSelectedRows = function getSelectedRows() {
          var _this4 = this;

          var array = [];
          this.that.collectionFiltered.forEach(function (x, index) {
            if (x[_this4.sgSel] === true) {
              array.push(index);
            }
          });

          return array;
        };

        VGridSelection.prototype.setSelectedRows = function setSelectedRows(newRows) {
          var _this5 = this;

          this.that.collectionFiltered.forEach(function (x) {
            if (x[_this5.sgSel] === true) {
              x[_this5.sgSel] = false;
            }
          });
          for (var i = 0; i < newRows.length; i++) {
            this.that.collectionFiltered[newRows[i]][this.sgSel] = true;
          }
        };

        VGridSelection.prototype.setHightlight = function setHightlight(e, currentRow, that) {
          var _this6 = this;

          var isSel;

          var removeRowHighligt = function removeRowHighligt(currentRow) {
            var selectedRows, i;

            var removeFromArray = function removeFromArray(array, row) {
              array.splice(row, 1);
            };

            selectedRows = _this6.getSelectedRows();
            for (i = 0; i < selectedRows.length; i++) {
              if (selectedRows[i] === currentRow) {
                removeFromArray(selectedRows, i);
                i--;
              }
            }
            _this6.setSelectedRows(selectedRows);
          };

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
//# sourceMappingURL=data:application/json;base64,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
