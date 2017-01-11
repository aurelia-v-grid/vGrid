var RowClickHandler = (function () {
    function RowClickHandler(element, htmlCache) {
        this.element = element;
        this.htmlCache = htmlCache;
        this.selectionMode = 'none';
        this.lastRowSelected = -1;
        this.lastKeyKodeUsed = 'none';
        this.selectedRows = 0;
    }
    RowClickHandler.prototype.init = function (mode, manualSelection, controller) {
        this.controller = controller;
        this.getSelection = controller.getSelectionContext.bind(controller);
        this.manualSelection = manualSelection;
        if (mode === false) {
            this.selectionMode = 'single';
        }
        if (mode === true) {
            this.selectionMode = 'multiple';
        }
        this.addEventlistener();
    };
    RowClickHandler.prototype.updateSelectionOnAllRows = function () {
        var rowCache = this.htmlCache.rowCache;
        for (var i = 0; i < rowCache.length; i++) {
            var selection = this.getSelection();
            var isSelected = selection.isSelected(rowCache[i].row);
            rowCache[i].bindingContext.selected = isSelected;
            rowCache[i].bindingContext.selected = isSelected;
            rowCache[i].bindingContext.selected = isSelected;
            if (isSelected) {
                if (!rowCache[i].selected) {
                    rowCache[i].selected = true;
                    rowCache[i].left.classList.add('avg-selected-row');
                    rowCache[i].main.classList.add('avg-selected-row');
                    rowCache[i].right.classList.add('avg-selected-row');
                }
            }
            else {
                if (rowCache[i].selected) {
                    rowCache[i].selected = false;
                    rowCache[i].left.classList.remove('avg-selected-row');
                    rowCache[i].main.classList.remove('avg-selected-row');
                    rowCache[i].right.classList.remove('avg-selected-row');
                }
            }
        }
    };
    RowClickHandler.prototype.getSelectionMode = function () {
        var selection = this.getSelection();
        return selection.getMode();
    };
    RowClickHandler.prototype.removeEventlistener = function () {
        var avgLeftRows = this.htmlCache.avg_left_rows;
        var avgMainRows = this.htmlCache.avg_main_rows;
        var avgRightRows = this.htmlCache.avg_right_rows;
        for (var i = 0; i < avgLeftRows.length; i++) {
            avgLeftRows[i].onclick = null;
            avgLeftRows[i].ondblclick = null;
            avgMainRows[i].onclick = null;
            avgMainRows[i].ondblclick = null;
            avgRightRows[i].onclick = null;
            avgRightRows[i].ondblclick = null;
        }
    };
    RowClickHandler.prototype.addEventlistener = function () {
        var avgLeftRows = this.htmlCache.avg_left_rows;
        var avgMainRows = this.htmlCache.avg_main_rows;
        var avgRightRows = this.htmlCache.avg_right_rows;
        for (var i = 0; i < avgLeftRows.length; i++) {
            avgLeftRows[i].onclick = this.singleClick.bind(this);
            avgLeftRows[i].ondblclick = this.doubleClick.bind(this);
            avgMainRows[i].onclick = this.singleClick.bind(this);
            avgMainRows[i].ondblclick = this.doubleClick.bind(this);
            avgRightRows[i].onclick = this.singleClick.bind(this);
            avgRightRows[i].ondblclick = this.doubleClick.bind(this);
        }
    };
    RowClickHandler.prototype.getCache = function (target) {
        var no = -1;
        this.htmlCache.rowCache.forEach(function (row, i) {
            if (row.left === target) {
                no = i;
            }
            if (row.main === target) {
                no = i;
            }
            if (row.right === target) {
                no = i;
            }
            if (row.group === target) {
                no = i;
            }
        });
        if (no !== -1) {
            return this.htmlCache.rowCache[no];
        }
        else {
            return null;
        }
    };
    RowClickHandler.prototype.singleClick = function (event) {
        var cache = this.getCache(event.currentTarget) || {};
        if (!cache.isGroup) {
            this.highlightRow(event, cache.row);
            this.controller.select(cache.row);
        }
        if (!this.manualSelection) {
            this.controller.raiseEvent('v-row-onclick', {
                evt: event,
                data: null,
                row: cache.row
            });
        }
    };
    RowClickHandler.prototype.doubleClick = function (event) {
        var cache = this.getCache(event.currentTarget) || {};
        this.controller.raiseEvent('v-row-ondblclick', {
            evt: event,
            data: null,
            row: cache.row
        });
    };
    RowClickHandler.prototype.isSelected = function (row) {
        var selection = this.getSelection();
        return selection.isSelected(row);
    };
    RowClickHandler.prototype.deSelect = function (row) {
        var selection = this.getSelection();
        selection.deSelect(row);
    };
    RowClickHandler.prototype.select = function (row, addToSelection) {
        var selection = this.getSelection();
        selection.select(row, addToSelection);
    };
    RowClickHandler.prototype.selectRange = function (start, end) {
        var selection = this.getSelection();
        selection.selectRange(start, end);
    };
    RowClickHandler.prototype.getSelectedRows = function () {
        var selection = this.getSelection();
        return selection.getSelectedRows();
    };
    RowClickHandler.prototype.setSelectedRows = function (newRows) {
        var selection = this.getSelection();
        selection.setSelectedRows(newRows);
    };
    RowClickHandler.prototype.highlightRow = function (e, currentRow) {
        var isSel;
        var manualSel = this.manualSelection;
        if (!manualSel) {
            var currentselectedRows = this.getSelectedRows();
            var currentKeyKode = '';
            if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {
                if (currentRow <= (this.controller.collectionLength() - 1)) {
                    if (this.selectionMode === 'multiple') {
                        if (e.shiftKey) {
                            currentKeyKode = 'shift';
                            currentselectedRows = this.getSelectedRows();
                            if (currentselectedRows.length > 0 && this.lastKeyKodeUsed === 'none') {
                                this.lastRowSelected = currentselectedRows[0];
                                this.lastKeyKodeUsed = 'shift';
                            }
                        }
                        if (e.ctrlKey) {
                            currentKeyKode = 'ctrl';
                        }
                        if (!e.ctrlKey && !e.shiftKey) {
                            currentKeyKode = 'none';
                        }
                        switch (true) {
                            case currentKeyKode === 'none':
                                this.select(currentRow, false);
                                break;
                            case this.lastKeyKodeUsed === 'shift' && currentKeyKode === 'ctrl':
                                isSel = this.isSelected(currentRow);
                                if (isSel === true) {
                                    this.deSelect(currentRow);
                                }
                                else {
                                    this.select(currentRow, true);
                                }
                                this.lastRowSelected = currentRow;
                                break;
                            case this.lastKeyKodeUsed === 'ctrl' && currentKeyKode === 'shift':
                                var oldSel = this.getSelectedRows();
                                this.selectRange(this.lastRowSelected, currentRow);
                                var newSel = this.getSelectedRows();
                                this.setSelectedRows(oldSel.concat(newSel));
                                break;
                            case this.lastKeyKodeUsed === 'ctrl' && currentKeyKode === 'ctrl':
                                isSel = this.isSelected(currentRow);
                                if (isSel === true) {
                                    this.deSelect(currentRow);
                                }
                                else {
                                    this.select(currentRow, true);
                                }
                                this.lastRowSelected = currentRow;
                                break;
                            case this.lastKeyKodeUsed === 'none' && currentKeyKode === 'ctrl':
                                isSel = this.isSelected(currentRow);
                                if (isSel === true) {
                                    this.deSelect(currentRow);
                                }
                                else {
                                    this.select(currentRow, true);
                                }
                                this.lastRowSelected = currentRow;
                                break;
                            case this.lastKeyKodeUsed === 'shift' && currentKeyKode === 'shift':
                                if (this.lastRowSelected > currentRow) {
                                    this.selectRange(currentRow, this.lastRowSelected);
                                }
                                else {
                                    this.selectRange(this.lastRowSelected, currentRow);
                                }
                                break;
                            case this.lastKeyKodeUsed === 'none' && currentKeyKode === 'shift':
                                if (this.lastRowSelected !== -1) {
                                    if (this.lastRowSelected > currentRow) {
                                        this.selectRange(currentRow, this.lastRowSelected);
                                    }
                                    else {
                                        this.selectRange(this.lastRowSelected, currentRow);
                                    }
                                }
                                else {
                                    this.lastRowSelected = currentRow;
                                    this.select(currentRow, false);
                                }
                                break;
                            default:
                                console.error('error, this should not happen, debug selection');
                        }
                    }
                    else {
                        this.select(currentRow, false);
                    }
                    this.lastKeyKodeUsed = currentKeyKode;
                    this.updateSelectionOnAllRows();
                }
            }
            else {
                if (e.ctrlKey) {
                    currentKeyKode = 'ctrl';
                }
                if (currentKeyKode === 'ctrl') {
                    this.lastKeyKodeUsed = currentKeyKode;
                    isSel = this.isSelected(currentRow);
                    if (isSel === true) {
                        this.deSelect(currentRow);
                    }
                    this.lastRowSelected = currentRow;
                }
                else {
                    this.select(currentRow, false);
                }
                this.updateSelectionOnAllRows();
            }
        }
    };
    return RowClickHandler;
}());
exports.RowClickHandler = RowClickHandler;

//# sourceMappingURL=rowClickHandler.js.map
