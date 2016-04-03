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
          this.lastRowSelected = -1;
          this.lastKeyKodeUsed = "none";
          this.selectedRows = 0;


          this.that = that;
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
            if (this.that.collectionFiltered[row]) {
              if (this.that.collectionFiltered[row][this.sgSel] === true) {
                result = true;
              }
            }
          }
          return result;
        };

        VGridSelection.prototype.isSelectedMainCollection = function isSelectedMainCollection(row) {
          var result = false;
          if (this.selectedRows > 0) {
            if (this.that.collection[row]) {
              if (this.that.collection[row][this.sgSel] === true) {
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
              if (this.that.collection !== undefined) {
                if (this.that.collection.length > 1) {
                  this.that.collection.forEach(function (x) {
                    if (x[_this.sgSel] === true) {
                      x[_this.sgSel] = false;
                    }
                  });
                }
              }
              this.that.collectionFiltered[rowSelect][this.sgSel] = true;
              this.selectedRows = 1;
              break;
            case "multible":
              if (!addToSelection) {
                this.selectedRows = 0;
                this.that.collection.forEach(function (x) {
                  if (x[_this.sgSel] === true) {
                    x[_this.sgSel] = false;
                  }
                });
                this.that.collectionFiltered[rowSelect][this.sgSel] = true;
                this.selectedRows++;
              } else {
                this.that.collectionFiltered[rowSelect][this.sgSel] = true;
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
              if (this.that.collection !== undefined) {
                if (this.that.collection.length > 1) {
                  this.that.collection.forEach(function (x) {
                    if (x[_this2.sgSel] === true) {
                      x[_this2.sgSel] = false;
                    }
                  });
                }
              }
              this.that.collection[rowSelect][this.sgSel] = true;
              this.selectedRows = 1;
              break;
            case "multible":
              if (!addToSelection) {
                this.selectedRows = 0;
                this.that.collection.forEach(function (x) {
                  if (x[_this2.sgSel] === true) {
                    x[_this2.sgSel] = false;
                  }
                });
                this.that.collection[rowSelect][this.sgSel] = true;
                this.selectedRows++;
              } else {
                this.that.collection[rowSelect][this.sgSel] = true;
                this.selectedRows++;
              }
          }
        };

        VGridSelection.prototype.selectRange = function selectRange(start, end) {
          var _this3 = this;

          if (this.selectionMode === "multible") {
            this.that.collection.forEach(function (x) {
              if (x[_this3.sgSel] === true) {
                x[_this3.sgSel] = false;
              }
            });
            this.selectedRows = 0;
            for (var i = start; i < end + 1; i++) {
              this.that.collectionFiltered[i][this.sgSel] = true;
              this.selectedRows++;
            }
          }
        };

        VGridSelection.prototype.selectRangeMainCollection = function selectRangeMainCollection(start, end) {
          var _this4 = this;

          if (this.selectionMode === "multible") {
            this.that.collection.forEach(function (x) {
              if (x[_this4.sgSel] === true) {
                x[_this4.sgSel] = false;
              }
            });
            this.selectedRows = 0;
            for (var i = start; i < end + 1; i++) {
              this.that.collection[i][this.sgSel] = true;
              this.selectedRows++;
            }
          }
        };

        VGridSelection.prototype.reset = function reset() {
          var _this5 = this;

          if (this.selectedRows > 0) {
            this.that.collection.forEach(function (x) {
              if (x[_this5.sgSel] === true) {
                x[_this5.sgSel] = false;
              }
            });
          }
          this.selectionMode = "none";
          this.lastRowSelected = -1;
          this.lastKeyKodeUsed = "none";
          this.selectedRows = 0;
        };

        VGridSelection.prototype.resetFilteredOnly = function resetFilteredOnly() {
          var _this6 = this;

          if (this.selectedRows > 0) {
            this.that.collectionFiltered.forEach(function (x) {
              if (x[_this6.sgSel] === true) {
                x[_this6.sgSel] = false;
              }
            });
          }
          this.selectedRows = this.getSelectedRowsMainCollection().length;
        };

        VGridSelection.prototype.getSelectedRows = function getSelectedRows() {
          var _this7 = this;

          var array = [];
          if (this.selectedRows > 0) {
            this.that.collectionFiltered.forEach(function (x, index) {
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
            this.that.collection.forEach(function (x, index) {
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
            this.that.collection.forEach(function (x) {
              if (x[_this9.sgSel] === true) {
                x[_this9.sgSel] = false;
              }
            });
          }
          this.selectedRows = 0;
          for (var i = 0; i < newRows.length; i++) {
            this.that.collectionFiltered[newRows[i]][this.sgSel] = true;
            this.selectedRows++;
          }
        };

        VGridSelection.prototype.setSelectedRowsMainCollection = function setSelectedRowsMainCollection(newRows) {
          var _this10 = this;

          if (this.selectedRows > 0) {
            this.that.collection.forEach(function (x) {
              if (x[_this10.sgSel] === true) {
                x[_this10.sgSel] = false;
              }
            });
          }
          this.selectedRows = 0;
          for (var i = 0; i < newRows.length; i++) {
            this.that.collection[newRows[i]][this.sgSel] = true;
            this.selectedRows++;
          }
        };

        VGridSelection.prototype.setHightlight = function setHightlight(e, currentRow, that) {
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
              this.lastRowSelected = currentRow;
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
