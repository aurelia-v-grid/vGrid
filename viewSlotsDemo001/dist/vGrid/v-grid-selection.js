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
              if (this.vGrid.vGridCollectionFiltered[row][this.vGridSel] === true) {
                result = true;
              }
            }
          }
          return result;
        };

        VGridSelection.prototype.isSelectedMainCollection = function isSelectedMainCollection(row) {
          var result = false;
          if (this.selectedRows > 0) {
            if (this.vGrid.vGridCollection[row]) {
              if (this.vGrid.vGridCollection[row][this.vGridSel] === true) {
                result = true;
              }
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
              if (this.vGrid.vGridCollection !== undefined) {
                if (this.vGrid.vGridCollection.length > 1) {
                  this.vGrid.vGridCollection.forEach(function (x) {
                    if (x[_this.vGridSel] === true) {
                      x[_this.vGridSel] = false;
                    }
                  });
                }
              }
              this.vGrid.vGridCollectionFiltered[rowSelect][this.vGridSel] = true;
              this.selectedRows = 1;
              break;
            case "multible":
              if (!addToSelection) {
                this.selectedRows = 0;
                this.vGrid.vGridCollection.forEach(function (x) {
                  if (x[_this.vGridSel] === true) {
                    x[_this.vGridSel] = false;
                  }
                });
                this.vGrid.vGridCollectionFiltered[rowSelect][this.vGridSel] = true;
                this.selectedRows++;
              } else {
                this.vGrid.vGridCollectionFiltered[rowSelect][this.vGridSel] = true;
                this.selectedRows++;
              }
          }
        };

        VGridSelection.prototype.selectMainCollection = function selectMainCollection(rowSelect, addToSelection) {
          var _this2 = this;

          switch (this.selectionMode) {
            case "none":
            case null:
            case undefined:
              break;
            case "single":
              if (this.vGrid.vGridCollection !== undefined) {
                if (this.vGrid.vGridCollection.length > 1) {
                  this.vGrid.vGridCollection.forEach(function (x) {
                    if (x[_this2.vGridSel] === true) {
                      x[_this2.vGridSel] = false;
                    }
                  });
                }
              }
              this.vGrid.vGridCollection[rowSelect][this.vGridSel] = true;
              this.selectedRows = 1;
              break;
            case "multible":
              if (!addToSelection) {
                this.selectedRows = 0;
                this.vGrid.vGridCollection.forEach(function (x) {
                  if (x[_this2.vGridSel] === true) {
                    x[_this2.vGridSel] = false;
                  }
                });
                this.vGrid.vGridCollection[rowSelect][this.vGridSel] = true;
                this.selectedRows++;
              } else {
                this.vGrid.vGridCollection[rowSelect][this.vGridSel] = true;
                this.selectedRows++;
              }
          }
        };

        VGridSelection.prototype.selectRange = function selectRange(start, end) {
          var _this3 = this;

          if (this.selectionMode === "multible") {
            this.vGrid.vGridCollection.forEach(function (x) {
              if (x[_this3.vGridSel] === true) {
                x[_this3.vGridSel] = false;
              }
            });
            this.selectedRows = 0;
            for (var i = start; i < end + 1; i++) {
              this.vGrid.vGridCollectionFiltered[i][this.vGridSel] = true;
              this.selectedRows++;
            }
          }
        };

        VGridSelection.prototype.selectRangeMainCollection = function selectRangeMainCollection(start, end) {
          var _this4 = this;

          if (this.selectionMode === "multible") {
            this.vGrid.vGridCollection.forEach(function (x) {
              if (x[_this4.vGridSel] === true) {
                x[_this4.vGridSel] = false;
              }
            });
            this.selectedRows = 0;
            for (var i = start; i < end + 1; i++) {
              this.vGrid.vGridCollection[i][this.vGridSel] = true;
              this.selectedRows++;
            }
          }
        };

        VGridSelection.prototype.reset = function reset() {
          var _this5 = this;

          if (this.selectedRows > 0) {
            this.vGrid.vGridCollection.forEach(function (x) {
              if (x[_this5.vGridSel] === true) {
                x[_this5.vGridSel] = false;
              }
            });
          }
          this.lastRowSelected = -1;
          this.lastKeyKodeUsed = "none";
          this.selectedRows = 0;
        };

        VGridSelection.prototype.resetFilteredOnly = function resetFilteredOnly() {
          var _this6 = this;

          if (this.selectedRows > 0) {
            this.vGrid.vGridCollectionFiltered.forEach(function (x) {
              if (x[_this6.vGridSel] === true) {
                x[_this6.vGridSel] = false;
              }
            });
          }
          this.lastRowSelected = -1;
          this.lastKeyKodeUsed = "none";
          this.selectedRows = this.getSelectedRowsMainCollection().length;
        };

        VGridSelection.prototype.getSelectedRows = function getSelectedRows() {
          var _this7 = this;

          var array = [];
          if (this.selectedRows > 0) {
            this.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
              if (x[_this7.vGridSel] === true) {
                array.push(index);
              }
            });
          }
          return array;
        };

        VGridSelection.prototype.getSelectedRowsMainCollection = function getSelectedRowsMainCollection() {
          var _this8 = this;

          var array = [];
          if (this.selectedRows > 0) {
            this.vGrid.vGridCollection.forEach(function (x, index) {
              if (x[_this8.vGridSel] === true) {
                array.push(index);
              }
            });
          }
          return array;
        };

        VGridSelection.prototype.setSelectedRows = function setSelectedRows(newRows) {
          var _this9 = this;

          if (this.selectedRows > 0) {
            this.vGrid.vGridCollection.forEach(function (x) {
              if (x[_this9.vGridSel] === true) {
                x[_this9.vGridSel] = false;
              }
            });
          }
          this.selectedRows = 0;
          for (var i = 0; i < newRows.length; i++) {
            this.vGrid.vGridCollectionFiltered[newRows[i]][this.vGridSel] = true;
            this.selectedRows++;
          }
        };

        VGridSelection.prototype.setSelectedRowsMainCollection = function setSelectedRowsMainCollection(newRows) {
          var _this10 = this;

          if (this.selectedRows > 0) {
            this.vGrid.vGridCollection.forEach(function (x) {
              if (x[_this10.vGridSel] === true) {
                x[_this10.vGridSel] = false;
              }
            });
          }
          this.selectedRows = 0;
          for (var i = 0; i < newRows.length; i++) {
            this.vGrid.vGridCollection[newRows[i]][this.vGridSel] = true;
            this.selectedRows++;
          }
        };

        VGridSelection.prototype.setHightlight = function setHightlight(e, currentRow, vGridGenerator) {
          var _this11 = this;

          var isSel;

          var removeRowHighligt = function removeRowHighligt(currentRow) {
            var selectedRows, i;

            var removeFromArray = function removeFromArray(array, row) {
              array.splice(row, 1);
            };

            selectedRows = _this11.getSelectedRows();
            for (i = 0; i < selectedRows.length; i++) {
              if (selectedRows[i] === currentRow) {
                removeFromArray(selectedRows, i);
                i--;
              }
            }
            _this11.setSelectedRows(selectedRows);
          };

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
                      removeRowHighligt(currentRow);
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
                      removeRowHighligt(currentRow);
                    } else {
                      this.select(currentRow, true);
                    }
                    this.lastRowSelected = currentRow;
                    break;

                  case this.lastKeyKodeUsed === "none" && currentKeyKode === "ctrl":

                    isSel = this.isSelected(currentRow);
                    if (isSel === true) {
                      removeRowHighligt(currentRow);
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
                removeRowHighligt(currentRow);
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
//# sourceMappingURL=data:application/json;base64,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
