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
              this.that.collectionFiltered[rowSelect][this.sgSel] = true;
              this.selectedRows = 1;
              break;
            case "multible":
              if (!addToSelection) {
                this.selectedRows = 0;
                this.that.collectionFiltered.forEach(function (x) {
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

        VGridSelection.prototype.selectRange = function selectRange(start, end) {
          var _this2 = this;

          if (this.selectionMode === "multible") {
            this.that.collectionFiltered.forEach(function (x) {
              if (x[_this2.sgSel] === true) {
                x[_this2.sgSel] = false;
              }
            });
            this.selectedRows = 0;
            for (var i = start; i < end + 1; i++) {
              this.that.collectionFiltered[i][this.sgSel] = true;
              this.selectedRows++;
            }
          }
        };

        VGridSelection.prototype.reset = function reset() {
          var _this3 = this;

          if (this.selectedRows > 0) {
            this.that.collectionFiltered.forEach(function (x) {
              if (x[_this3.sgSel] === true) {
                x[_this3.sgSel] = false;
              }
            });
          }
          this.selectedRows = 0;
        };

        VGridSelection.prototype.getSelectedRows = function getSelectedRows() {
          var _this4 = this;

          var array = [];
          if (this.selectedRows > 0) {
            this.that.collectionFiltered.forEach(function (x, index) {
              if (x[_this4.sgSel] === true) {
                array.push(index);
              }
            });
          }
          return array;
        };

        VGridSelection.prototype.setSelectedRows = function setSelectedRows(newRows) {
          var _this5 = this;

          if (this.selectedRows > 0) {
            this.that.collectionFiltered.forEach(function (x) {
              if (x[_this5.sgSel] === true) {
                x[_this5.sgSel] = false;
              }
            });
          }
          this.selectedRows = 0;
          for (var i = 0; i < newRows.length; i++) {
            this.that.collectionFiltered[newRows[i]][this.sgSel] = true;
            this.selectedRows++;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zZWxlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBTWE7QUFXWCxpQkFYVyxjQVdYLENBQVksSUFBWixFQUFrQixJQUFsQixFQUF3QjtnQ0FYYixnQkFXYTs7ZUFQeEIsZ0JBQWdCLE9BT1E7ZUFOeEIsa0JBQWtCLEVBTU07ZUFMeEIsa0JBQWtCLE9BS007ZUFKeEIsWUFBWSxNQUlZO2VBSHhCLGVBQWUsRUFHUzs7O0FBRXRCLGVBQUssSUFBTCxHQUFZLElBQVosQ0FGc0I7QUFHdEIsZUFBSyxLQUFMLEdBQWEsZUFBZSxLQUFLLEtBQUwsQ0FBVyxJQUFDLENBQUssTUFBTCxLQUFnQixJQUFoQixHQUF3QixDQUF6QixDQUExQixDQUhTOztBQUt0QixjQUFJLFNBQVMsS0FBVCxFQUFnQjtBQUNsQixpQkFBSyxhQUFMLEdBQXFCLFFBQXJCLENBRGtCO1dBQXBCO0FBR0EsY0FBSSxTQUFTLElBQVQsRUFBZTtBQUNqQixpQkFBSyxhQUFMLEdBQXFCLFVBQXJCLENBRGlCO1dBQW5CO1NBUkY7O0FBWFcsaUNBMkJYLDJCQUFRLE1BQUs7QUFDWCxlQUFLLGFBQUwsR0FBcUIsTUFBckIsQ0FEVztBQUVYLGNBQUksU0FBUyxLQUFULEVBQWdCO0FBQ2xCLGlCQUFLLGFBQUwsR0FBcUIsUUFBckIsQ0FEa0I7V0FBcEI7QUFHQSxjQUFJLFNBQVMsSUFBVCxFQUFlO0FBQ2pCLGlCQUFLLGFBQUwsR0FBcUIsVUFBckIsQ0FEaUI7V0FBbkI7OztBQWhDUyxpQ0FzQ1gsaUNBQVcsS0FBSztBQUNkLGNBQUksU0FBUyxLQUFULENBRFU7QUFFZCxjQUFHLEtBQUssWUFBTCxHQUFvQixDQUFwQixFQUFzQjtBQUN2QixnQkFBRyxLQUFLLElBQUwsQ0FBVSxrQkFBVixDQUE2QixHQUE3QixDQUFILEVBQXFDO0FBQ25DLGtCQUFJLEtBQUssSUFBTCxDQUFVLGtCQUFWLENBQTZCLEdBQTdCLEVBQWtDLEtBQUssS0FBTCxDQUFsQyxLQUFrRCxJQUFsRCxFQUF3RDtBQUMxRCx5QkFBUyxJQUFULENBRDBEO2VBQTVEO2FBREY7V0FERjtBQU9BLGlCQUFPLE1BQVAsQ0FUYzs7O0FBdENMLGlDQWtEWCx5QkFBTyxXQUFXLGdCQUFnQjs7O0FBQ2hDLGtCQUFRLEtBQUssYUFBTDtBQUNOLGlCQUFLLE1BQUwsQ0FERjtBQUVFLGlCQUFLLElBQUwsQ0FGRjtBQUdFLGlCQUFLLFNBQUw7QUFDRSxvQkFERjtBQUhGLGlCQUtPLFFBQUw7QUFDRSxrQkFBSSxLQUFLLElBQUwsQ0FBVSxrQkFBVixLQUFpQyxTQUFqQyxFQUE0QztBQUM5QyxvQkFBSSxLQUFLLElBQUwsQ0FBVSxrQkFBVixDQUE2QixNQUE3QixHQUFzQyxDQUF0QyxFQUF5QztBQUMzQyx1QkFBSyxJQUFMLENBQVUsa0JBQVYsQ0FBNkIsT0FBN0IsQ0FBcUMsVUFBQyxDQUFELEVBQU87QUFDMUMsd0JBQUcsRUFBRSxNQUFLLEtBQUwsQ0FBRixLQUFrQixJQUFsQixFQUF1QjtBQUN4Qix3QkFBRSxNQUFLLEtBQUwsQ0FBRixHQUFnQixLQUFoQixDQUR3QjtxQkFBMUI7bUJBRG1DLENBQXJDLENBRDJDO2lCQUE3QztlQURGO0FBVUEsbUJBQUssSUFBTCxDQUFVLGtCQUFWLENBQTZCLFNBQTdCLEVBQXdDLEtBQUssS0FBTCxDQUF4QyxHQUFzRCxJQUF0RCxDQVhGO0FBWUUsbUJBQUssWUFBTCxHQUFvQixDQUFwQixDQVpGO0FBYUUsb0JBYkY7QUFMRixpQkFtQk8sVUFBTDtBQUNFLGtCQUFJLENBQUMsY0FBRCxFQUFpQjtBQUNuQixxQkFBSyxZQUFMLEdBQW9CLENBQXBCLENBRG1CO0FBRW5CLHFCQUFLLElBQUwsQ0FBVSxrQkFBVixDQUE2QixPQUE3QixDQUFxQyxVQUFDLENBQUQsRUFBTztBQUMxQyxzQkFBRyxFQUFFLE1BQUssS0FBTCxDQUFGLEtBQWtCLElBQWxCLEVBQXVCO0FBQ3hCLHNCQUFFLE1BQUssS0FBTCxDQUFGLEdBQWdCLEtBQWhCLENBRHdCO21CQUExQjtpQkFEbUMsQ0FBckMsQ0FGbUI7QUFPbkIscUJBQUssSUFBTCxDQUFVLGtCQUFWLENBQTZCLFNBQTdCLEVBQXdDLEtBQUssS0FBTCxDQUF4QyxHQUFzRCxJQUF0RCxDQVBtQjtBQVFuQixxQkFBSyxZQUFMLEdBUm1CO2VBQXJCLE1BU087QUFDTCxxQkFBSyxJQUFMLENBQVUsa0JBQVYsQ0FBNkIsU0FBN0IsRUFBd0MsS0FBSyxLQUFMLENBQXhDLEdBQXNELElBQXRELENBREs7QUFFTCxxQkFBSyxZQUFMLEdBRks7ZUFUUDtBQXBCSixXQURnQzs7O0FBbER2QixpQ0F3RlgsbUNBQVksT0FBTyxLQUFLOzs7QUFDdEIsY0FBSSxLQUFLLGFBQUwsS0FBdUIsVUFBdkIsRUFBbUM7QUFDckMsaUJBQUssSUFBTCxDQUFVLGtCQUFWLENBQTZCLE9BQTdCLENBQXFDLFVBQUMsQ0FBRCxFQUFPO0FBQzFDLGtCQUFHLEVBQUUsT0FBSyxLQUFMLENBQUYsS0FBa0IsSUFBbEIsRUFBdUI7QUFDeEIsa0JBQUUsT0FBSyxLQUFMLENBQUYsR0FBZ0IsS0FBaEIsQ0FEd0I7ZUFBMUI7YUFEbUMsQ0FBckMsQ0FEcUM7QUFNckMsaUJBQUssWUFBTCxHQUFvQixDQUFwQixDQU5xQztBQU9yQyxpQkFBSyxJQUFJLElBQUksS0FBSixFQUFXLElBQUksTUFBTSxDQUFOLEVBQVMsR0FBakMsRUFBc0M7QUFDcEMsbUJBQUssSUFBTCxDQUFVLGtCQUFWLENBQTZCLENBQTdCLEVBQWdDLEtBQUssS0FBTCxDQUFoQyxHQUE4QyxJQUE5QyxDQURvQztBQUVwQyxtQkFBSyxZQUFMLEdBRm9DO2FBQXRDO1dBUEY7OztBQXpGUyxpQ0F3R1gseUJBQVE7OztBQUNOLGNBQUcsS0FBSyxZQUFMLEdBQW9CLENBQXBCLEVBQXNCO0FBQ3ZCLGlCQUFLLElBQUwsQ0FBVSxrQkFBVixDQUE2QixPQUE3QixDQUFxQyxVQUFDLENBQUQsRUFBTztBQUMxQyxrQkFBRyxFQUFFLE9BQUssS0FBTCxDQUFGLEtBQWtCLElBQWxCLEVBQXVCO0FBQ3hCLGtCQUFFLE9BQUssS0FBTCxDQUFGLEdBQWdCLEtBQWhCLENBRHdCO2VBQTFCO2FBRG1DLENBQXJDLENBRHVCO1dBQXpCO0FBT0EsZUFBSyxZQUFMLEdBQW9CLENBQXBCLENBUk07OztBQXhHRyxpQ0FtSFgsNkNBQWtCOzs7QUFDaEIsY0FBSSxRQUFRLEVBQVIsQ0FEWTtBQUVoQixjQUFHLEtBQUssWUFBTCxHQUFvQixDQUFwQixFQUFzQjtBQUN2QixpQkFBSyxJQUFMLENBQVUsa0JBQVYsQ0FBNkIsT0FBN0IsQ0FBcUMsVUFBQyxDQUFELEVBQUksS0FBSixFQUFjO0FBQ2pELGtCQUFHLEVBQUUsT0FBSyxLQUFMLENBQUYsS0FBa0IsSUFBbEIsRUFBdUI7QUFDeEIsc0JBQU0sSUFBTixDQUFXLEtBQVgsRUFEd0I7ZUFBMUI7YUFEbUMsQ0FBckMsQ0FEdUI7V0FBekI7QUFPQSxpQkFBTyxLQUFQLENBVGdCOzs7QUFuSFAsaUNBK0hYLDJDQUFnQixTQUFTOzs7QUFDdkIsY0FBRyxLQUFLLFlBQUwsR0FBb0IsQ0FBcEIsRUFBdUI7QUFDeEIsaUJBQUssSUFBTCxDQUFVLGtCQUFWLENBQTZCLE9BQTdCLENBQXFDLFVBQUMsQ0FBRCxFQUFPO0FBQzFDLGtCQUFJLEVBQUUsT0FBSyxLQUFMLENBQUYsS0FBa0IsSUFBbEIsRUFBd0I7QUFDMUIsa0JBQUUsT0FBSyxLQUFMLENBQUYsR0FBZ0IsS0FBaEIsQ0FEMEI7ZUFBNUI7YUFEbUMsQ0FBckMsQ0FEd0I7V0FBMUI7QUFPQSxlQUFLLFlBQUwsR0FBb0IsQ0FBcEIsQ0FSdUI7QUFTdkIsZUFBSSxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksUUFBUSxNQUFSLEVBQWdCLEdBQW5DLEVBQXVDO0FBQ3JDLGlCQUFLLElBQUwsQ0FBVSxrQkFBVixDQUE2QixRQUFRLENBQVIsQ0FBN0IsRUFBeUMsS0FBSyxLQUFMLENBQXpDLEdBQXVELElBQXZELENBRHFDO0FBRXJDLGlCQUFLLFlBQUwsR0FGcUM7V0FBdkM7OztBQXhJUyxpQ0FpSlgsdUNBQWMsR0FBRyxZQUFZLE1BQU07OztBQUVqQyxjQUFJLEtBQUosQ0FGaUM7O0FBSWpDLGNBQUksb0JBQW9CLFNBQXBCLGlCQUFvQixDQUFDLFVBQUQsRUFBZ0I7QUFDdEMsZ0JBQUksWUFBSixFQUFrQixDQUFsQixDQURzQzs7QUFHdEMsZ0JBQUksa0JBQWtCLFNBQWxCLGVBQWtCLENBQUMsS0FBRCxFQUFRLEdBQVIsRUFBZ0I7QUFDcEMsb0JBQU0sTUFBTixDQUFhLEdBQWIsRUFBa0IsQ0FBbEIsRUFEb0M7YUFBaEIsQ0FIZ0I7O0FBT3RDLDJCQUFlLE9BQUssZUFBTCxFQUFmLENBUHNDO0FBUXRDLGlCQUFLLElBQUksQ0FBSixFQUFPLElBQUksYUFBYSxNQUFiLEVBQXFCLEdBQXJDLEVBQTBDO0FBQ3hDLGtCQUFJLGFBQWEsQ0FBYixNQUFvQixVQUFwQixFQUFnQztBQUNsQyxnQ0FBZ0IsWUFBaEIsRUFBOEIsQ0FBOUIsRUFEa0M7QUFFbEMsb0JBRmtDO2VBQXBDO2FBREY7QUFNQSxtQkFBSyxlQUFMLENBQXFCLFlBQXJCLEVBZHNDO1dBQWhCLENBSlM7O0FBcUJqQyxjQUFJLHNCQUFzQixLQUFLLGVBQUwsRUFBdEIsQ0FyQjZCOztBQXVCakMsY0FBSSxlQUFlLEtBQUssZUFBTCxJQUF3QixvQkFBb0IsQ0FBcEIsTUFBMkIsVUFBM0IsRUFBdUM7QUFHaEYsaUJBQUssU0FBTCxHQUFpQixJQUFqQixDQUhnRjs7QUFLaEYsZ0JBQUksY0FBZSxLQUFLLFFBQUwsQ0FBYyxlQUFkLENBQThCLG1CQUE5QixLQUFzRCxDQUF0RCxFQUEwRDs7QUFFM0Usa0JBQUksS0FBSyxhQUFMLEtBQXVCLFVBQXZCLEVBQW1DOztBQUVyQyxvQkFBSSxpQkFBaUIsRUFBakIsQ0FGaUM7O0FBSXJDLG9CQUFJLEVBQUUsUUFBRixFQUFZO0FBQ2QsbUNBQWlCLE9BQWpCLENBRGM7QUFFZCx3Q0FBc0IsS0FBSyxlQUFMLEVBQXRCLENBRmM7QUFHZCxzQkFBSSxvQkFBb0IsTUFBcEIsR0FBNkIsQ0FBN0IsSUFBa0MsS0FBSyxlQUFMLEtBQXlCLE1BQXpCLEVBQWlDO0FBQ3JFLHlCQUFLLGVBQUwsR0FBdUIsb0JBQW9CLENBQXBCLENBQXZCLENBRHFFO0FBRXJFLHlCQUFLLGVBQUwsR0FBdUIsT0FBdkIsQ0FGcUU7bUJBQXZFO2lCQUhGOztBQVNBLG9CQUFJLEVBQUUsT0FBRixFQUFXO0FBQ2IsbUNBQWlCLE1BQWpCLENBRGE7aUJBQWY7O0FBSUEsb0JBQUksQ0FBQyxFQUFFLE9BQUYsSUFBYSxDQUFDLEVBQUUsUUFBRixFQUFZO0FBQzdCLG1DQUFpQixNQUFqQixDQUQ2QjtpQkFBL0I7O0FBSUEsd0JBQVEsSUFBUjtBQUNFLHVCQUFLLG1CQUFtQixNQUFuQjtBQUNILHlCQUFLLE1BQUwsQ0FBWSxVQUFaLEVBREY7QUFFRSwwQkFGRjtBQURGLHVCQUlPLEtBQUssZUFBTCxLQUF5QixPQUF6QixJQUFvQyxtQkFBbUIsTUFBbkI7O0FBRXZDLDRCQUFRLEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUFSLENBRkY7QUFHRSx3QkFBSSxVQUFVLElBQVYsRUFBZ0I7QUFDbEIsd0NBQWtCLFVBQWxCLEVBRGtCO3FCQUFwQixNQUVPO0FBQ0wsMkJBQUssTUFBTCxDQUFZLFVBQVosRUFBd0IsSUFBeEIsRUFESztxQkFGUDtBQUtBLDBCQVJGOztBQUpGLHVCQWNPLEtBQUssZUFBTCxLQUF5QixNQUF6QixJQUFtQyxtQkFBbUIsT0FBbkI7O0FBRXRDLHlCQUFLLFdBQUwsQ0FBaUIsS0FBSyxlQUFMLEVBQXNCLFVBQXZDLEVBRkY7QUFHRSwwQkFIRjs7QUFkRix1QkFtQk8sS0FBSyxlQUFMLEtBQXlCLE1BQXpCLElBQW1DLG1CQUFtQixNQUFuQjs7QUFFdEMsNEJBQVEsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQVIsQ0FGRjtBQUdFLHdCQUFJLFVBQVUsSUFBVixFQUFnQjtBQUNsQix3Q0FBa0IsVUFBbEIsRUFEa0I7cUJBQXBCLE1BRU87QUFDTCwyQkFBSyxNQUFMLENBQVksVUFBWixFQUF3QixJQUF4QixFQURLO3FCQUZQO0FBS0EsMEJBUkY7O0FBbkJGLHVCQTZCTyxLQUFLLGVBQUwsS0FBeUIsTUFBekIsSUFBbUMsbUJBQW1CLE1BQW5COztBQUV0Qyw0QkFBUSxLQUFLLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBUixDQUZGO0FBR0Usd0JBQUksVUFBVSxJQUFWLEVBQWdCO0FBQ2xCLHdDQUFrQixVQUFsQixFQURrQjtxQkFBcEIsTUFFTztBQUNMLDJCQUFLLE1BQUwsQ0FBWSxVQUFaLEVBQXdCLElBQXhCLEVBREs7cUJBRlA7QUFLQSwwQkFSRjs7QUE3QkYsdUJBdUNPLEtBQUssZUFBTCxLQUF5QixPQUF6QixJQUFvQyxtQkFBbUIsT0FBbkI7O0FBRXZDLHdCQUFJLEtBQUssZUFBTCxHQUF1QixVQUF2QixFQUFtQztBQUNyQywyQkFBSyxXQUFMLENBQWlCLFVBQWpCLEVBQTZCLEtBQUssZUFBTCxDQUE3QixDQURxQztxQkFBdkMsTUFFTztBQUNMLDJCQUFLLFdBQUwsQ0FBaUIsS0FBSyxlQUFMLEVBQXNCLFVBQXZDLEVBREs7cUJBRlA7QUFLQSwwQkFQRjs7QUF2Q0YsdUJBZ0RPLEtBQUssZUFBTCxLQUF5QixNQUF6QixJQUFtQyxtQkFBbUIsT0FBbkI7O0FBRXRDLHdCQUFJLEtBQUssZUFBTCxLQUF5QixJQUF6QixFQUErQjtBQUNqQywwQkFBSSxLQUFLLGVBQUwsR0FBdUIsVUFBdkIsRUFBbUM7QUFDckMsNkJBQUssV0FBTCxDQUFpQixVQUFqQixFQUE2QixLQUFLLGVBQUwsQ0FBN0IsQ0FEcUM7dUJBQXZDLE1BRU87QUFDTCw2QkFBSyxXQUFMLENBQWlCLEtBQUssZUFBTCxFQUFzQixVQUF2QyxFQURLO3VCQUZQO3FCQURGLE1BTU87QUFDTCwyQkFBSyxNQUFMLENBQVksVUFBWixFQURLO3FCQU5QO0FBU0EsMEJBWEY7QUFoREY7QUE2REksNEJBQVEsR0FBUixDQUFZLGdDQUFaLEVBREY7QUE1REYsaUJBckJxQztlQUF2QyxNQW9GTztBQUNMLHFCQUFLLE1BQUwsQ0FBWSxVQUFaLEVBREs7ZUFwRlA7QUF1RkEsbUJBQUssZUFBTCxHQUF1QixjQUF2QixDQXpGMkU7O0FBNEYzRSxtQkFBSyx3QkFBTCxHQTVGMkU7YUFBN0U7V0FMRixNQW1HTztBQUVMLGdCQUFJLEVBQUUsT0FBRixFQUFXO0FBQ2IsK0JBQWlCLE1BQWpCLENBRGE7YUFBZjs7QUFLQSxnQkFBSSxtQkFBbUIsTUFBbkIsRUFBMkI7QUFDN0IsbUJBQUssZUFBTCxHQUF1QixjQUF2QixDQUQ2QjtBQUU3QixzQkFBUSxLQUFLLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBUixDQUY2QjtBQUc3QixrQkFBSSxVQUFVLElBQVYsRUFBZ0I7QUFDbEIsa0NBQWtCLFVBQWxCLEVBRGtCO2VBQXBCO0FBR0EsbUJBQUssZUFBTCxHQUF1QixDQUFDLENBQUQsQ0FOTTthQUEvQixNQU9PO0FBRUwsc0JBQVEsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQVIsQ0FGSztBQUdMLG1CQUFLLE1BQUwsQ0FBWSxVQUFaLEVBSEs7YUFQUDs7QUFhQSxpQkFBSyx3QkFBTCxHQXBCSztXQW5HUDs7O2VBeEtTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1zZWxlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
