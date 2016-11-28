var WakSelection = (function () {
    function WakSelection(mode, source) {
        this.source = source;
        this.mode = mode;
        this.selectedRows = 0;
        if (mode === false) {
            this.mode = 'single';
        }
        if (mode === true) {
            this.mode = 'multiple';
        }
        this.selection = new Set([]);
    }
    WakSelection.prototype.getMode = function () {
        return this.mode;
    };
    WakSelection.prototype.isSelected = function (row) {
        var result = false;
        if (this.selectedRows > 0) {
            result = this.selection.has(row);
        }
        return result;
    };
    WakSelection.prototype.deSelect = function (row) {
        this.selection.delete(row);
        this.selectedRows = this.selection.size;
    };
    WakSelection.prototype.deSelectAll = function () {
        this.selection.clear();
        this.selectedRows = this.selection.size;
    };
    WakSelection.prototype.select = function (row, addToSelection) {
        switch (this.mode) {
            case 'none':
            case null:
            case undefined:
                break;
            case 'single':
                this.selection.clear();
                this.selection.add(row);
                this.selectedRows = this.selection.size;
                break;
            case 'multiple':
                if (!addToSelection) {
                    this.selection.clear();
                }
                this.selection.add(row);
                break;
            default:
        }
        this.selectedRows = this.selection.size;
    };
    WakSelection.prototype.selectRange = function (start, end) {
        if (this.mode === 'multiple') {
            this.selection.clear();
            for (var i = start; i < end + 1; i++) {
                this.selection.add(i);
            }
            this.selectedRows = this.selection.size;
        }
    };
    WakSelection.prototype.getSelectedRows = function () {
        var array = [];
        if (this.selectedRows > 0) {
            this.selection.forEach(function (value) {
                array.push(value);
            });
        }
        return array;
    };
    WakSelection.prototype.setSelectedRows = function (newRows) {
        if (this.selectedRows > 0) {
            this.selection.clear();
        }
        for (var i = 0; i < newRows.length; i++) {
            this.selection.add(newRows[i]);
        }
        this.selectedRows = this.selection.size;
    };
    WakSelection.prototype.getmode = function () {
        return this.mode;
    };
    WakSelection.prototype.reset = function () {
        if (this.selectedRows > 0) {
            this.selection.clear();
        }
        this.selectedRows = this.selection.size;
    };
    WakSelection.prototype.trigger = function () {
        this.source.__triggerEvent('selection_changed');
    };
    WakSelection.prototype.toggle = function () {
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
    WakSelection.prototype.prepareToSend = function () {
        var result = {
            _mode: this.mode === 'single' ? 'single' : 'multiple',
            _rows: [],
            _ranges: [],
            _butRows: [],
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
            }
            else {
                if (workingOnRange) {
                    result._ranges.push({
                        start: start,
                        end: row
                    });
                    start = null;
                    workingOnRange = false;
                }
                else {
                    result._rows.push(row);
                }
            }
        });
        return result;
    };
    WakSelection.prototype.setSelectionFromServer = function (selection) {
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
    return WakSelection;
}());
exports.WakSelection = WakSelection;

//# sourceMappingURL=wakSelection.js.map
