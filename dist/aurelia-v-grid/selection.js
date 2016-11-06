"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var Selection;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("Selection", Selection = function () {
        function Selection(mode) {
          _classCallCheck(this, Selection);

          this.mode = mode;
          this.selectedRows = 0;
          this.selection = new Set([]);
        }

        Selection.prototype.getMode = function getMode() {
          return this.mode;
        };

        Selection.prototype.setMode = function setMode() {};

        Selection.prototype.getRowKey = function getRowKey(row) {
          return row;
        };

        Selection.prototype.getRowFromKey = function getRowFromKey(row) {
          return row;
        };

        Selection.prototype.overrideGetRowKey = function overrideGetRowKey(fn) {
          this.getRowKey = fn;
        };

        Selection.prototype.overrideGetRowFromKey = function overrideGetRowFromKey(fn) {
          this.getRowFromKey = fn;
        };

        Selection.prototype.isSelected = function isSelected(row) {
          var result = false;
          if (this.selectedRows > 0) {
            result = this.selection.has(this.getRowKey(row));
          }
          return result;
        };

        Selection.prototype.deSelectAll = function deSelectAll() {
          this.selection.clear();
          this.selectedRows = this.selection.size;
        };

        Selection.prototype.deSelect = function deSelect(row) {
          this.selection.delete(this.getRowKey(row));
          this.selectedRows = this.selection.size;
        };

        Selection.prototype.select = function select(row, add) {
          switch (this.mode) {
            case "none":
            case null:
            case undefined:
              break;
            case "single":
              this.selection.clear();
              this.selection.add(this.getRowKey(row));
              this.selectedRows = this.selection.size;
              break;
            case "multiple":
              if (!add) {
                this.selection.clear();
                this.selection.add(this.getRowKey(row));
                this.selectedRows = this.selection.size;
              } else {
                this.selection.add(this.getRowKey(row));
                this.selectedRows = this.selection.size;
              }
              break;
            default:
          }
        };

        Selection.prototype.selectRange = function selectRange(start, end) {
          if (this.mode === "multiple") {
            this.selection.clear();
            for (var i = start; i < end + 1; i++) {
              this.selection.add(this.getRowKey(i));
            }
            this.selectedRows = this.selection.size;
          }
        };

        Selection.prototype.getSelectedRows = function getSelectedRows() {
          var _this = this;

          var array = [];
          if (this.selectedRows > 0) {
            this.selection.forEach(function (value) {
              array.push(_this.getRowFromKey(value));
            });
          }
          return array;
        };

        Selection.prototype.setSelectedRows = function setSelectedRows(newRows) {
          if (this.selectedRows > 0) {
            this.selection.clear();
          }
          for (var i = 0; i < newRows.length; i++) {
            this.selection.add(this.getRowKey(newRows[i]));
          }
          this.selectedRows = this.selection.size;
        };

        Selection.prototype.reset = function reset() {
          if (this.selectedRows > 0) {
            this.selection.clear();
          }
          this.lastRowSelected = -1;
          this.lastKeyKodeUsed = "none";
          this.selectedRows = this.selection.size;
        };

        return Selection;
      }());

      _export("Selection", Selection);
    }
  };
});
//# sourceMappingURL=selection.js.map
