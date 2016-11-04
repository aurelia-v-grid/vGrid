"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var RowClickHandler;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("RowClickHandler", RowClickHandler = function () {
                function RowClickHandler(element, htmlCache) {
                    _classCallCheck(this, RowClickHandler);

                    this.element = element;
                    this.htmlCache = htmlCache;
                    this.selectionMode = "none";
                    this.lastRowSelected = -1;
                    this.lastKeyKodeUsed = "none";
                    this.selectedRows = 0;
                }

                RowClickHandler.prototype.init = function init(mode, manualSelection, controller) {

                    this.controller = controller;
                    this.selection = controller.getSelectionContext();
                    this.manualSelection = manualSelection;

                    if (mode === false) {
                        this.selectionMode = "single";
                    }
                    if (mode === true) {
                        this.selectionMode = "multiple";
                    }

                    this.addEventlistener();
                };

                RowClickHandler.prototype.addEventlistener = function addEventlistener() {
                    var avg_left_rows = this.htmlCache.avg_left_rows;
                    var avg_main_rows = this.htmlCache.avg_main_rows;
                    var avg_right_rows = this.htmlCache.avg_right_rows;

                    for (var i = 0; i < avg_left_rows.length; i++) {
                        avg_left_rows[i].onclick = this.singleClick.bind(this);
                        avg_left_rows[i].ondblclick = this.doubleClick.bind(this);
                        avg_main_rows[i].onclick = this.singleClick.bind(this);
                        avg_main_rows[i].ondblclick = this.doubleClick.bind(this);
                        avg_right_rows[i].onclick = this.singleClick.bind(this);
                        avg_right_rows[i].ondblclick = this.doubleClick.bind(this);
                    }
                };

                RowClickHandler.prototype.removeEventlistener = function removeEventlistener() {
                    var avg_left_rows = this.htmlCache.avg_left_rows;
                    var avg_main_rows = this.htmlCache.avg_main_rows;
                    var avg_right_rows = this.htmlCache.avg_right_rows;

                    for (var i = 0; i < avg_left_rows.length; i++) {
                        avg_left_rows[i].onclick = null;
                        avg_left_rows[i].ondblclick = null;
                        avg_main_rows[i].onclick = null;
                        avg_main_rows[i].ondblclick = null;
                        avg_right_rows[i].onclick = null;
                        avg_right_rows[i].ondblclick = null;
                    }
                };

                RowClickHandler.prototype.singleClick = function singleClick(event) {
                    console.log("todo: sinleClick row, need call if binded attri");
                    if (!event.currentTarget.avgGroup) {
                        this.highlightRow(event, event.currentTarget.avgRow);
                        this.controller.select(event.currentTarget.avgRow);
                    }
                };

                RowClickHandler.prototype.isNormalRow = function isNormalRow() {};

                RowClickHandler.prototype.doubleClick = function doubleClick(event) {
                    console.log("Todo: double-click-row");
                };

                RowClickHandler.prototype.isSelected = function isSelected(row) {
                    return this.selection.isSelected(row);
                };

                RowClickHandler.prototype.deSelect = function deSelect(row) {
                    this.selection.deSelect(row);
                };

                RowClickHandler.prototype.select = function select(row, addToSelection) {
                    this.selection.select(row, addToSelection);
                };

                RowClickHandler.prototype.selectRange = function selectRange(start, end) {
                    this.selection.selectRange(start, end);
                };

                RowClickHandler.prototype.getSelectedRows = function getSelectedRows() {
                    return this.selection.getSelectedRows();
                };

                RowClickHandler.prototype.setSelectedRows = function setSelectedRows(newRows) {
                    this.selection.setSelectedRows(newRows);
                };

                RowClickHandler.prototype.getSelectionMode = function getSelectionMode() {
                    return this.selection.setSelectedRows(newRows);
                };

                RowClickHandler.prototype.updateSelectionOnAllRows = function updateSelectionOnAllRows() {

                    var rowCache = this.htmlCache.rowCache;
                    for (var i = 0; i < rowCache.length; i++) {
                        if (this.selection.isSelected(rowCache[i].row)) {
                            if (!rowCache[i].main.avgSelected) {
                                rowCache[i].main.avgSelected = true;
                                rowCache[i].left.classList.add("avg-selected-row");
                                rowCache[i].main.classList.add("avg-selected-row");
                                rowCache[i].right.classList.add("avg-selected-row");
                            }
                        } else {
                            if (rowCache[i].main.avgSelected) {
                                rowCache[i].main.avgSelected = false;
                                rowCache[i].left.classList.remove("avg-selected-row");
                                rowCache[i].main.classList.remove("avg-selected-row");
                                rowCache[i].right.classList.remove("avg-selected-row");
                            }
                        }
                    }
                };

                RowClickHandler.prototype.highlightRow = function highlightRow(e, currentRow) {

                    var isSel;
                    var manualSel = this.manualSelection;
                    if (!manualSel) {
                        var currentselectedRows = this.getSelectedRows();
                        var currentKeyKode = "";

                        if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {

                            if (currentRow <= this.controller.collectionLength() - 1) {

                                if (this.selectionMode === "multiple") {

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
                                                this.deSelect(currentRow);
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
                                                this.deSelect(currentRow);
                                            } else {
                                                this.select(currentRow, true);
                                            }
                                            this.lastRowSelected = currentRow;
                                            break;

                                        case this.lastKeyKodeUsed === "none" && currentKeyKode === "ctrl":

                                            isSel = this.isSelected(currentRow);
                                            if (isSel === true) {
                                                this.deSelect(currentRow);
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
                                            console.error("error, this should not happen, debug selection");
                                    }
                                } else {
                                    this.select(currentRow);
                                }
                                this.lastKeyKodeUsed = currentKeyKode;

                                this.updateSelectionOnAllRows();
                            }
                        } else {
                            if (e.ctrlKey) {
                                currentKeyKode = "ctrl";
                            }

                            if (currentKeyKode === "ctrl") {
                                this.lastKeyKodeUsed = currentKeyKode;
                                isSel = this.isSelected(currentRow);
                                if (isSel === true) {
                                    this.deSelect(currentRow);
                                }
                                this.lastRowSelected = currentRow;
                            } else {
                                this.select(currentRow);
                            }

                            this.updateSelectionOnAllRows();
                        }
                    }
                };

                return RowClickHandler;
            }());

            _export("RowClickHandler", RowClickHandler);
        }
    };
});
//# sourceMappingURL=rowClickHandler.js.map
