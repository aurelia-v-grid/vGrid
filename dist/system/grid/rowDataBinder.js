System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RowDataBinder;
    return {
        setters:[],
        execute: function() {
            RowDataBinder = (function () {
                function RowDataBinder(element, controller) {
                    this.element = element;
                    this.controller = controller;
                }
                RowDataBinder.prototype.init = function () {
                    this.addEventListener();
                };
                RowDataBinder.prototype.addEventListener = function () {
                    this.rebindRowBinded = this.rebindRow.bind(this);
                    this.rebindAllRowsBinded = this.rebindAllRows.bind(this);
                    this.element.addEventListener("avg-rebind-row", this.rebindRowBinded);
                    this.element.addEventListener("avg-rebind-all-rows", this.rebindAllRowsBinded);
                };
                RowDataBinder.prototype.removeEventListener = function () {
                    this.element.removeEventListener("avg-rebind-row", this.rebindRowBinded);
                    this.element.removeEventListener("avg-rebind-all-rows", this.rebindAllRowsBinded);
                };
                RowDataBinder.prototype.rebindRow = function (event) {
                    var currentRow = event.detail.currentRow;
                    var rowCache = event.detail.rowCache;
                    var downScroll = event.detail.downScroll;
                    var leftViewSlot = rowCache.leftRowViewSlot;
                    var mainViewSlot = rowCache.mainRowViewSlot;
                    var rightViewSlot = rowCache.rightRowViewSlot;
                    var groupViewSlot = rowCache.groupRowViewSlot;
                    var overrideLeft = leftViewSlot.overrideContext;
                    var overridemain = mainViewSlot.overrideContext;
                    var overrideRight = rightViewSlot.overrideContext;
                    var overrideGroup = groupViewSlot.overrideContext;
                    this.controller.getElement(currentRow, downScroll, function (data) {
                        if (data.rowRef) {
                            if (data.rowRef.__group) {
                                rowCache.main.avgGroup = true;
                                rowCache.left.avgGroup = true;
                                rowCache.right.avgGroup = true;
                                rowCache.group.avgGroup = true;
                            }
                            else {
                                rowCache.main.avgGroup = false;
                                rowCache.left.avgGroup = false;
                                rowCache.right.avgGroup = false;
                                rowCache.group.avgGroup = false;
                            }
                        }
                        var isSelected = data.selection.isSelected(rowCache.row);
                        if (isSelected) {
                            if (!rowCache.main.avgSelected) {
                                rowCache.main.avgSelected = true;
                                rowCache.left.classList.add("avg-selected-row");
                                rowCache.main.classList.add("avg-selected-row");
                                rowCache.right.classList.add("avg-selected-row");
                            }
                        }
                        else {
                            if (rowCache.main.avgSelected) {
                                rowCache.main.avgSelected = false;
                                rowCache.left.classList.remove("avg-selected-row");
                                rowCache.main.classList.remove("avg-selected-row");
                                rowCache.right.classList.remove("avg-selected-row");
                            }
                        }
                        if (data.rowRef === undefined || data.rowRef === "" || data.rowRef === null) {
                            rowCache.left.style.display = "none";
                            rowCache.main.style.display = "none";
                            rowCache.right.style.display = "none";
                            rowCache.group.style.display = "none";
                        }
                        else {
                            rowCache.left.style.display = "block";
                            rowCache.main.style.display = "block";
                            rowCache.right.style.display = "block";
                            rowCache.group.style.display = "block";
                        }
                        overrideLeft.bindingContext.rowRef = data.rowRef;
                        overridemain.bindingContext.rowRef = data.rowRef;
                        overrideRight.bindingContext.rowRef = data.rowRef;
                        overrideGroup.bindingContext.rowRef = data.rowRef;
                        overrideLeft.bindingContext.selection = data.selection;
                        overridemain.bindingContext.selection = data.selection;
                        overrideRight.bindingContext.selection = data.selection;
                        overrideGroup.bindingContext.selection = data.selection;
                        overrideLeft.bindingContext.selected = isSelected;
                        overridemain.bindingContext.selected = isSelected;
                        overrideRight.bindingContext.selected = isSelected;
                        overrideGroup.bindingContext.selected = isSelected;
                        overrideLeft.bindingContext.row = currentRow;
                        overridemain.bindingContext.row = currentRow;
                        overrideRight.bindingContext.row = currentRow;
                        overrideGroup.bindingContext.row = currentRow;
                    });
                };
                RowDataBinder.prototype.rebindAllRows = function (event) {
                    var rowCache = event.detail.rowCache;
                    var downScroll = event.detail.downScroll;
                    for (var i = 0; i < rowCache.length; i++) {
                        this.controller.getElement(rowCache[i].row, downScroll, function (data) {
                            var leftViewSlot = rowCache[i].leftRowViewSlot;
                            var mainViewSlot = rowCache[i].mainRowViewSlot;
                            var rightViewSlot = rowCache[i].rightRowViewSlot;
                            var groupViewSlot = rowCache[i].groupRowViewSlot;
                            if (data.rowRef) {
                                if (data.rowRef.__group) {
                                    rowCache[i].main.avgGroup = true;
                                    rowCache[i].left.avgGroup = true;
                                    rowCache[i].right.avgGroup = true;
                                    rowCache[i].group.avgGroup = true;
                                }
                                else {
                                    rowCache[i].main.avgGroup = false;
                                    rowCache[i].left.avgGroup = false;
                                    rowCache[i].right.avgGroup = false;
                                    rowCache[i].group.avgGroup = false;
                                }
                            }
                            var isSelected = data.selection.isSelected(rowCache[i].row);
                            if (isSelected) {
                                if (!rowCache[i].main.avgSelected) {
                                    rowCache[i].main.avgSelected = true;
                                    rowCache[i].left.classList.add("avg-selected-row");
                                    rowCache[i].main.classList.add("avg-selected-row");
                                    rowCache[i].right.classList.add("avg-selected-row");
                                }
                            }
                            else {
                                if (rowCache[i].main.avgSelected) {
                                    rowCache[i].main.avgSelected = false;
                                    rowCache[i].left.classList.remove("avg-selected-row");
                                    rowCache[i].main.classList.remove("avg-selected-row");
                                    rowCache[i].right.classList.remove("avg-selected-row");
                                }
                            }
                            if (data.rowRef === undefined || data.rowRef === "" || data.rowRef === null) {
                                rowCache[i].left.style.display = "none";
                                rowCache[i].main.style.display = "none";
                                rowCache[i].right.style.display = "none";
                                rowCache[i].group.style.display = "none";
                            }
                            else {
                                rowCache[i].left.style.display = "block";
                                rowCache[i].main.style.display = "block";
                                rowCache[i].right.style.display = "block";
                                rowCache[i].group.style.display = "block";
                            }
                            var overrideLeft = leftViewSlot.overrideContext;
                            var overridemain = mainViewSlot.overrideContext;
                            var overrideRight = rightViewSlot.overrideContext;
                            var overrideGroup = groupViewSlot.overrideContext;
                            overrideLeft.bindingContext.rowRef = data.rowRef;
                            overridemain.bindingContext.rowRef = data.rowRef;
                            overrideRight.bindingContext.rowRef = data.rowRef;
                            overrideGroup.bindingContext.rowRef = data.rowRef;
                            overrideLeft.bindingContext.selection = data.selection;
                            overridemain.bindingContext.selection = data.selection;
                            overrideRight.bindingContext.selection = data.selection;
                            overrideGroup.bindingContext.selection = data.selection;
                            overrideLeft.bindingContext.selected = isSelected;
                            overridemain.bindingContext.selected = isSelected;
                            overrideRight.bindingContext.selected = isSelected;
                            overrideGroup.bindingContext.selected = isSelected;
                            overrideLeft.bindingContext.row = rowCache[i].row;
                            overridemain.bindingContext.row = rowCache[i].row;
                            overrideRight.bindingContext.row = rowCache[i].row;
                            overrideGroup.bindingContext.row = rowCache[i].row;
                        });
                    }
                };
                return RowDataBinder;
            }());
            exports_1("RowDataBinder", RowDataBinder);
        }
    }
});

//# sourceMappingURL=rowDataBinder.js.map
