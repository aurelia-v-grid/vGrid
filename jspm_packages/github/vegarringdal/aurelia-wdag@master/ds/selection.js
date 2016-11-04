/* */ 
define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Selection = exports.Selection = function () {
        function Selection(mode, source) {
            _classCallCheck(this, Selection);

            this.source = source;
            this.selectionMode = "none";
            this.selectedRows = 0;
            if (mode === false) {
                this.selectionMode = "single";
            }
            if (mode === true) {
                this.selectionMode = "multiple";
            }
            this.selection = new Set([]);
        }

        Selection.prototype.setMode = function setMode(mode) {
            this.selectionMode = "none";
            if (mode === false) {
                this.selectionMode = "single";
            }
            if (mode === true) {
                this.selectionMode = "multiple";
            }
        };

        Selection.prototype.isRowSelected = function isRowSelected(row) {
            var result = false;
            if (this.selectedRows > 0) {
                result = this.selection.has(row);
            }
            return result;
        };

        Selection.prototype.deSelectRow = function deSelectRow(row) {
            this.selection.delete(row);
            this.selectedRows = this.selection.size;
        };

        Selection.prototype.addRowToSelection = function addRowToSelection(row, addToSelection) {
            switch (this.selectionMode) {
                case "none":
                case null:
                case undefined:
                    break;
                case "single":
                    this.selection.clear();
                    this.selection.add(row);
                    this.selectedRows = this.selection.size;
                    break;
                case "multiple":
                    if (!addToSelection) {
                        this.selection.clear();
                    }
                    this.selection.add(row);
            }
            this.selectedRows = this.selection.size;
        };

        Selection.prototype.setSelectionRange = function setSelectionRange(start, end) {
            if (this.selectionMode === "multiple") {
                this.selection.clear();
                for (var i = start; i < end + 1; i++) {
                    this.selection.add(i);
                }
                this.selectedRows = this.selection.size;
            }
        };

        Selection.prototype.getSelectedRows = function getSelectedRows() {
            var array = [];
            if (this.selectedRows > 0) {
                this.selection.forEach(function (value) {
                    array.push(value);
                });
            }
            return array;
        };

        Selection.prototype.setSelectedRows = function setSelectedRows(newRows) {
            if (this.selectedRows > 0) {
                this.selection.clear();
            }
            for (var i = 0; i < newRows.length; i++) {
                this.selection.add(newRows[i]);
            }
            this.selectedRows = this.selection.size;
        };

        Selection.prototype.getSelectionMode = function getSelectionMode() {
            return this.selectionMode;
        };

        Selection.prototype.reset = function reset() {
            if (this.selectedRows > 0) {
                this.selection.clear();
            }
            this.lastRowSelected = -1;
            this.lastKeyKodeUsed = "none";
            this.selectedRows = this.selection.size;
        };

        Selection.prototype.trigger = function trigger() {
            this.source.__triggerEvent("selection_changed");
        };

        Selection.prototype.toggle = function toggle() {
            var length = this.source.collection.length;
            var sel = this.getSelectedRows();
            this.reset();
            for (var i = 0; i < length; i++) {
                if (sel.indexOf(i) === -1) {
                    this.selection.add(i);
                }
            }
            this.selectedRows = this.selection.size;
            this.trigger();
        };

        Selection.prototype.prepareToSend = function prepareToSend() {
            var result = {
                _mode: this.selectionMode === "single" ? "single" : "multiple",
                _rows: [],
                _ranges: [],
                _butRows: []
            };

            var sel = this.getSelectedRows();
            sel.sort();

            var workingOnRange = false;
            var start = null;
            var lastRow = 0;
            sel.forEach(function (row, index) {
                lastRow = row;
                if (sel[index + 1] === row + 1) {
                    if (workingOnRange === false) {
                        workingOnRange = true;
                        start = row;
                    }
                } else {
                    if (workingOnRange) {
                        result._ranges.push({
                            start: start,
                            end: row
                        });
                        start = null;
                        workingOnRange = false;
                    } else {
                        result._rows.push(row);
                    }
                }
            });

            return result;
        };

        Selection.prototype.setSelectionFromServer = function setSelectionFromServer(selection) {
            var _this = this;

            this.selection.clear();

            selection.rows.forEach(function (row) {
                _this.selection.add(row);
            });

            selection.ranges.forEach(function (range) {
                for (var i = range.start; i < range.end + 1; i++) {
                    _this.selection.add(i);
                }
            });

            selection.butRows.forEach(function (row) {
                _this.selection.delete(row);
            });
        };

        return Selection;
    }();
});