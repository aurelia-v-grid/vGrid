System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var Selection;
    return {
        setters: [],
        execute: function () {
            Selection = (function () {
                function Selection(mode) {
                    this.mode = mode;
                    this.selectedRows = 0;
                    this.selection = new Set([]);
                }
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
                };
                Selection.prototype.deSelect = function (row) {
                    this.selection.delete(this.getRowKey(row));
                    this.selectedRows = this.selection.size;
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
                };
                Selection.prototype.selectRange = function (start, end) {
                    if (this.mode === 'multiple') {
                        this.selection.clear();
                        for (var i = start; i < end + 1; i++) {
                            this.selection.add(this.getRowKey(i));
                        }
                        this.selectedRows = this.selection.size;
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
                };
                Selection.prototype.reset = function () {
                    if (this.selectedRows > 0) {
                        this.selection.clear();
                    }
                    this.selectedRows = this.selection.size;
                };
                return Selection;
            }());
            exports_1("Selection", Selection);
        }
    };
});

//# sourceMappingURL=selection.js.map
