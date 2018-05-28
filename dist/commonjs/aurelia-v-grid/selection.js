Object.defineProperty(exports, "__esModule", { value: true });
var Selection = (function () {
    function Selection(mode) {
        this.mode = mode;
        this.selectedRows = 0;
        this.eventIdCount = -1;
        this.eventCallBacks = [];
        this.selection = new Set([]);
    }
    Selection.prototype.triggerEvent = function (event) {
        var _this = this;
        this.eventCallBacks.forEach(function (FN, i) {
            if (FN !== null) {
                var alive = FN(event);
                if (!alive) {
                    _this.eventCallBacks[i] = null;
                }
            }
        });
    };
    Selection.prototype.addEventListener = function (callback) {
        this.eventIdCount++;
        this.eventCallBacks.push(callback);
        return this.eventIdCount;
    };
    Selection.prototype.getLength = function () {
        return this.selection.size;
    };
    Selection.prototype.getMode = function () {
        return this.mode;
    };
    Selection.prototype.getRowKey = function (row) {
        return row;
    };
    Selection.prototype.getRowKeys = function () {
        return [];
    };
    Selection.prototype.overrideGetRowKey = function (fn) {
        this.getRowKey = fn;
    };
    Selection.prototype.overrideGetRowKeys = function (fn) {
        this.getRowKeys = fn;
    };
    Selection.prototype.isSelected = function (row) {
        var result = false;
        if (this.selectedRows > 0) {
            result = this.selection.has(this.getRowKey(row));
        }
        return result;
    };
    Selection.prototype.deSelectAll = function () {
        this.selection.clear();
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    Selection.prototype.deSelect = function (row) {
        this.selection.delete(this.getRowKey(row));
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    Selection.prototype.select = function (row, add) {
        switch (this.mode) {
            case 'none':
            case null:
            case undefined:
                break;
            case 'single':
                this.selection.clear();
                this.selection.add(this.getRowKey(row));
                this.selectedRows = this.selection.size;
                break;
            case 'multiple':
                if (!add) {
                    this.selection.clear();
                    this.selection.add(this.getRowKey(row));
                    this.selectedRows = this.selection.size;
                }
                else {
                    this.selection.add(this.getRowKey(row));
                    this.selectedRows = this.selection.size;
                }
                break;
            default:
        }
        this.triggerEvent('selection_changed');
    };
    Selection.prototype.selectRange = function (start, end) {
        if (this.mode === 'multiple') {
            this.selection.clear();
            for (var i = start; i < end + 1; i++) {
                this.selection.add(this.getRowKey(i));
            }
            this.selectedRows = this.selection.size;
            this.triggerEvent('selection_changed');
        }
    };
    Selection.prototype.getSelectedRows = function () {
        var _this = this;
        var array = [];
        var keys = this.getRowKeys();
        if (this.selectedRows > 0) {
            keys.forEach(function (key, index) {
                if (_this.selection.has(key) === true) {
                    array.push(index);
                }
            });
        }
        return array;
    };
    Selection.prototype.setSelectedRows = function (newRows) {
        if (this.selectedRows > 0) {
            this.selection.clear();
        }
        for (var i = 0; i < newRows.length; i++) {
            this.selection.add(this.getRowKey(newRows[i]));
        }
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    Selection.prototype.reset = function () {
        if (this.selectedRows > 0) {
            this.selection.clear();
        }
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    return Selection;
}());
exports.Selection = Selection;
//# sourceMappingURL=selection.js.map