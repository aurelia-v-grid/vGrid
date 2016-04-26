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
          this.sgSel = "__vGridSel" + Math.floor(Math.random() * 1000 + 1);

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
            if (this.vGrid.collectionFiltered[row]) {
              if (this.vGrid.collectionFiltered[row][this.sgSel] === true) {
                result = true;
              }
            }
          }
          return result;
        };

        VGridSelection.prototype.isSelectedMainCollection = function isSelectedMainCollection(row) {
          var result = false;
          if (this.selectedRows > 0) {
            if (this.vGrid.collection[row]) {
              if (this.vGrid.collection[row][this.sgSel] === true) {
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
              if (this.vGrid.collection !== undefined) {
                if (this.vGrid.collection.length > 1) {
                  this.vGrid.collection.forEach(function (x) {
                    if (x[_this.sgSel] === true) {
                      x[_this.sgSel] = false;
                    }
                  });
                }
              }
              this.vGrid.collectionFiltered[rowSelect][this.sgSel] = true;
              this.selectedRows = 1;
              break;
            case "multible":
              if (!addToSelection) {
                this.selectedRows = 0;
                this.vGrid.collection.forEach(function (x) {
                  if (x[_this.sgSel] === true) {
                    x[_this.sgSel] = false;
                  }
                });
                this.vGrid.collectionFiltered[rowSelect][this.sgSel] = true;
                this.selectedRows++;
              } else {
                this.vGrid.collectionFiltered[rowSelect][this.sgSel] = true;
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
              if (this.vGrid.collection !== undefined) {
                if (this.vGrid.collection.length > 1) {
                  this.vGrid.collection.forEach(function (x) {
                    if (x[_this2.sgSel] === true) {
                      x[_this2.sgSel] = false;
                    }
                  });
                }
              }
              this.vGrid.collection[rowSelect][this.sgSel] = true;
              this.selectedRows = 1;
              break;
            case "multible":
              if (!addToSelection) {
                this.selectedRows = 0;
                this.vGrid.collection.forEach(function (x) {
                  if (x[_this2.sgSel] === true) {
                    x[_this2.sgSel] = false;
                  }
                });
                this.vGrid.collection[rowSelect][this.sgSel] = true;
                this.selectedRows++;
              } else {
                this.vGrid.collection[rowSelect][this.sgSel] = true;
                this.selectedRows++;
              }
          }
        };

        VGridSelection.prototype.selectRange = function selectRange(start, end) {
          var _this3 = this;

          if (this.selectionMode === "multible") {
            this.vGrid.collection.forEach(function (x) {
              if (x[_this3.sgSel] === true) {
                x[_this3.sgSel] = false;
              }
            });
            this.selectedRows = 0;
            for (var i = start; i < end + 1; i++) {
              this.vGrid.collectionFiltered[i][this.sgSel] = true;
              this.selectedRows++;
            }
          }
        };

        VGridSelection.prototype.selectRangeMainCollection = function selectRangeMainCollection(start, end) {
          var _this4 = this;

          if (this.selectionMode === "multible") {
            this.vGrid.collection.forEach(function (x) {
              if (x[_this4.sgSel] === true) {
                x[_this4.sgSel] = false;
              }
            });
            this.selectedRows = 0;
            for (var i = start; i < end + 1; i++) {
              this.vGrid.collection[i][this.sgSel] = true;
              this.selectedRows++;
            }
          }
        };

        VGridSelection.prototype.reset = function reset() {
          var _this5 = this;

          if (this.selectedRows > 0) {
            this.vGrid.collection.forEach(function (x) {
              if (x[_this5.sgSel] === true) {
                x[_this5.sgSel] = false;
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
            this.vGrid.collectionFiltered.forEach(function (x) {
              if (x[_this6.sgSel] === true) {
                x[_this6.sgSel] = false;
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
            this.vGrid.collectionFiltered.forEach(function (x, index) {
              if (x[_this7.sgSel] === true) {
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
            this.vGrid.collection.forEach(function (x, index) {
              if (x[_this8.sgSel] === true) {
                array.push(index);
              }
            });
          }
          return array;
        };

        VGridSelection.prototype.setSelectedRows = function setSelectedRows(newRows) {
          var _this9 = this;

          if (this.selectedRows > 0) {
            this.vGrid.collection.forEach(function (x) {
              if (x[_this9.sgSel] === true) {
                x[_this9.sgSel] = false;
              }
            });
          }
          this.selectedRows = 0;
          for (var i = 0; i < newRows.length; i++) {
            this.vGrid.collectionFiltered[newRows[i]][this.sgSel] = true;
            this.selectedRows++;
          }
        };

        VGridSelection.prototype.setSelectedRowsMainCollection = function setSelectedRowsMainCollection(newRows) {
          var _this10 = this;

          if (this.selectedRows > 0) {
            this.vGrid.collection.forEach(function (x) {
              if (x[_this10.sgSel] === true) {
                x[_this10.sgSel] = false;
              }
            });
          }
          this.selectedRows = 0;
          for (var i = 0; i < newRows.length; i++) {
            this.vGrid.collection[newRows[i]][this.sgSel] = true;
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
