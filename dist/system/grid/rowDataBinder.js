System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var RowDataBinder;
    return {
        setters: [],
        execute: function () {
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
                    this.element.addEventListener('avg-rebind-row', this.rebindRowBinded);
                    this.element.addEventListener('avg-rebind-all-rows', this.rebindAllRowsBinded);
                };
                RowDataBinder.prototype.rebindRow = function (event) {
                    var currentRow = event.detail.currentRow;
                    var rowCache = event.detail.rowCache;
                    var downScroll = event.detail.downScroll;
                    var bindingContext = rowCache.bindingContext;
                    this.controller.getElement(currentRow, downScroll, function (data) {
                        if (data.rowRef) {
                            if (data.rowRef.__group) {
                                rowCache.isGroup = true;
                            }
                            else {
                                rowCache.isGroup = false;
                            }
                        }
                        var isSelected = data.selection.isSelected(rowCache.row);
                        if (isSelected) {
                            if (!rowCache.selected) {
                                rowCache.selected = true;
                                rowCache.left.classList.add('avg-selected-row');
                                rowCache.main.classList.add('avg-selected-row');
                                rowCache.right.classList.add('avg-selected-row');
                            }
                        }
                        else {
                            if (rowCache.selected) {
                                rowCache.selected = false;
                                rowCache.left.classList.remove('avg-selected-row');
                                rowCache.main.classList.remove('avg-selected-row');
                                rowCache.right.classList.remove('avg-selected-row');
                            }
                        }
                        if (data.rowRef === undefined || data.rowRef === null) {
                            rowCache.left.style.display = 'none';
                            rowCache.main.style.display = 'none';
                            rowCache.right.style.display = 'none';
                            rowCache.group.style.display = 'none';
                        }
                        else {
                            rowCache.left.style.display = 'block';
                            rowCache.main.style.display = 'block';
                            rowCache.right.style.display = 'block';
                            rowCache.group.style.display = 'block';
                        }
                        bindingContext.rowRef = data.rowRef;
                        bindingContext.selection = data.selection;
                        bindingContext.selected = isSelected;
                        bindingContext.row = currentRow;
                    });
                };
                RowDataBinder.prototype.rebindAllRows = function (event) {
                    var rowCache = event.detail.rowCache;
                    var downScroll = event.detail.downScroll;
                    var _loop_1 = function (i) {
                        this_1.controller.getElement(rowCache[i].row, downScroll, function (data) {
                            var bindingContext = rowCache[i].bindingContext;
                            if (data.rowRef) {
                                if (data.rowRef.__group) {
                                    rowCache[i].isGroup = true;
                                }
                                else {
                                    rowCache[i].isGroup = false;
                                }
                            }
                            var isSelected = data.selection.isSelected(rowCache[i].row);
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
                            if (data.rowRef === undefined || data.rowRef === null) {
                                rowCache[i].left.style.display = 'none';
                                rowCache[i].main.style.display = 'none';
                                rowCache[i].right.style.display = 'none';
                                rowCache[i].group.style.display = 'none';
                            }
                            else {
                                rowCache[i].left.style.display = 'block';
                                rowCache[i].main.style.display = 'block';
                                rowCache[i].right.style.display = 'block';
                                rowCache[i].group.style.display = 'block';
                            }
                            bindingContext.rowRef = data.rowRef;
                            bindingContext.selection = data.selection;
                            bindingContext.selected = isSelected;
                            bindingContext.row = rowCache[i].row;
                        });
                    };
                    var this_1 = this;
                    for (var i = 0; i < rowCache.length; i++) {
                        _loop_1(i);
                    }
                };
                return RowDataBinder;
            }());
            exports_1("RowDataBinder", RowDataBinder);
        }
    };
});

//# sourceMappingURL=rowDataBinder.js.map
