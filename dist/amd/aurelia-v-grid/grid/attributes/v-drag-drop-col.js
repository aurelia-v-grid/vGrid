var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../v-grid"], function (require, exports, aurelia_framework_1, v_grid_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var VGridDragDropCol = (function () {
        function VGridDragDropCol(element, vGrid) {
            this.vGrid = vGrid;
            this.vGridElement = vGrid.element;
            this.controller = vGrid.controller;
            this.groupingElements = vGrid.groupingElements;
            this.htmlHeightWidth = vGrid.htmlHeightWidth;
            this.sharedContext = vGrid.dragDropAttributeSharedContext;
            this.element = element;
            this.column = this.element;
            this.entered = null;
            this.curColNo = null;
        }
        VGridDragDropCol.prototype.bind = function (bindingContext, overrideContext) {
            this.bindingContext = bindingContext;
            this.overrideContext = overrideContext;
            this.onDragstartBinded = this.onDragstart.bind(this);
            this.onDragenterBinded = this.onDragenter.bind(this);
            this.onDragoverBinded = this.onDragover.bind(this);
            this.onDragendBinded = this.onDragend.bind(this);
            this.onDragOutSideBinded = this.onDragOutSide.bind(this);
            this.onCloseMenuBinded = this.onCloseMenu.bind(this);
        };
        VGridDragDropCol.prototype.unbind = function () {
        };
        VGridDragDropCol.prototype.detached = function () {
            var result = this.getTargetData(this.column);
            if (result.ok && !result.panel) {
                this.element.removeEventListener('mousedown', this.onDragstartBinded);
                result.target.removeEventListener('mouseenter', this.onDragenterBinded);
            }
            if (result.ok && result.target.nodeName === 'AVG-DRAG-HELPER') {
                this.element.removeEventListener('mousedown', this.onDragstartBinded);
                result.target.removeEventListener('mouseenter', this.onDragenterBinded);
                result.target.removeEventListener('mousedown', this.onCloseMenuBinded);
            }
        };
        VGridDragDropCol.prototype.attached = function () {
            var _this = this;
            var result = this.getTargetData(this.column);
            if (result.ok && !result.panel) {
                this.column = result.target;
                this.colType = this.column.attributes.getNamedItem('data-avg-type').value;
                this.colNo = parseInt(this.column.attributes.getNamedItem('data-avg-config-col').value, 10);
                this.context = this.vGrid.columnBindingContext['setup' + this.colType][this.colNo];
                this.columnsArray = this.vGrid.columnBindingContext['setup' + this.colType];
                this.element.addEventListener('mousedown', this.onDragstartBinded);
                result.target.addEventListener('mouseenter', this.onDragenterBinded);
            }
            if (result.ok && result.target.nodeName === 'AVG-TOP-PANEL') {
                this.isPanel = true;
                this.sharedContext.panel = result.target;
                result.target.onmouseleave = function () {
                    if (_this.sharedContext.dragging && _this.sharedContext.title && _this.sharedContext.field) {
                        _this.groupingElements.removeGroup('');
                    }
                };
                result.target.onmouseenter = function () {
                    if (_this.sharedContext.dragging && _this.sharedContext.title && _this.sharedContext.field) {
                        _this.groupingElements.addGroup(_this.sharedContext.title, _this.sharedContext.field);
                        _this.sharedContext.lastTarget = result.target;
                    }
                };
                result.target.onmouseup = function () {
                    if (_this.sharedContext.dragging && _this.sharedContext.title && _this.sharedContext.field) {
                        _this.groupingElements.addToGrouping();
                    }
                };
            }
            if (result.ok && result.target.nodeName === 'AVG-DRAG-HELPER') {
                this.column = result.target;
                this.colType = this.column.attributes.getNamedItem('data-avg-type').value;
                this.colNo = parseInt(this.column.attributes.getNamedItem('data-avg-config-col').value, 10);
                this.context = this.vGrid.columnBindingContext['setup' + 'main'][this.colNo];
                this.columnsArray = this.vGrid.columnBindingContext['setup' + 'main'];
                this.isPanel = true;
                this.element.addEventListener('mousedown', this.onDragstartBinded);
                result.target.addEventListener('mouseenter', this.onDragenterBinded);
                result.target.addEventListener('mousedown', this.onCloseMenuBinded);
            }
        };
        VGridDragDropCol.prototype.onCloseMenu = function () {
            this.vGrid.controller.raiseEvent('avg-close-menu');
        };
        VGridDragDropCol.prototype.createDragElement = function (event) {
            this.dragColumnBlock = document.createElement('div');
            this.dragColumnBlock.classList.add(this.vGrid.attTheme);
            this.dragColumnBlock.classList.add('avg-drag');
            this.dragColumnBlock.style.top = this.isPanel ? event.clientY + 'px' : -1200 + 'px';
            this.dragColumnBlock.style.left = this.isPanel ? event.clientX + 'px' : -1200 + 'px';
            document.body.appendChild(this.dragColumnBlock);
            this.dragColumnBlock.innerHTML = this.title || this.vGrid.colConfig[this.colNo].colHeaderName;
        };
        VGridDragDropCol.prototype.onDragstart = function (event) {
            var _this = this;
            document.addEventListener('mouseup', this.onDragendBinded);
            this.vGridElement.addEventListener('mouseleave', this.onDragOutSideBinded);
            this.createDragElement(event);
            if (this.isPanel) {
                document.addEventListener('mousemove', this.onDragoverBinded, false);
            }
            else {
                this.mouseMoveTimer = setTimeout(function () {
                    document.addEventListener('mousemove', _this.onDragoverBinded, false);
                }, 300);
            }
            this.sharedContext.dragging = true;
            this.sharedContext.colType = this.colType;
            this.sharedContext.context = this.context;
            this.sharedContext.colNo = this.colNo;
            this.sharedContext.curColNo = this.colNo;
            this.sharedContext.columnsArray = this.columnsArray;
            this.sharedContext.title = this.title;
            this.sharedContext.field = this.field;
            this.sharedContext.columnsArraySorted = [];
            this.sharedContext.columnsArray.forEach(function (x) {
                _this.sharedContext.columnsArraySorted.push(x);
            });
        };
        VGridDragDropCol.prototype.onDragOutSide = function (event) {
            if (this.sharedContext.dragging) {
                if (event.layerX < 0) {
                    var left_1 = false;
                    this.vGrid.columnBindingContext.setupleft.forEach(function (x) {
                        if (x.show) {
                            left_1 = true;
                        }
                    });
                    if (!left_1) {
                        this.switchColumns({
                            colType: 'left'
                        });
                    }
                }
                if (event.layerX > this.vGridElement.clientWidth) {
                    var right_1 = false;
                    this.vGrid.columnBindingContext.setupright.forEach(function (x) {
                        if (x.show) {
                            right_1 = true;
                        }
                    });
                    if (!right_1) {
                        this.switchColumns({
                            colType: 'right'
                        });
                    }
                }
            }
        };
        VGridDragDropCol.prototype.onDragenter = function (event) {
            if (this.sharedContext.dragging) {
                var result = this.getTargetData(event.target);
                if (result.target.nodeName === 'AVG-COL' && result.ok && this.sharedContext.lastTarget !== result.target) {
                    this.sharedContext.lastTarget = result.target;
                    if (result.colNo !== this.sharedContext.colNo && result.colType === this.sharedContext.colType) {
                        var newLeft = this.sharedContext.columnsArray[result.colNo].left;
                        var oldLeft = this.sharedContext.columnsArray[this.sharedContext.colNo].left;
                        if (newLeft < oldLeft) {
                            this.sharedContext.columnsArray[this.sharedContext.colNo].left = newLeft;
                            this.sharedContext.columnsArray[result.colNo].left = newLeft + 1;
                        }
                        else {
                            this.sharedContext.columnsArray[this.sharedContext.colNo].left = newLeft;
                            this.sharedContext.columnsArray[result.colNo].left = newLeft - 1;
                        }
                        this.sharedContext.columnsArraySorted.sort(function (a, b) {
                            return a.left - b.left;
                        });
                        var appendValue_1 = 0;
                        this.sharedContext.columnsArraySorted.forEach(function (x) {
                            if (x.show) {
                                x.left = appendValue_1;
                                appendValue_1 = appendValue_1 + x.width;
                            }
                        });
                    }
                    if (result.colNo !== this.sharedContext.colNo && result.colType !== this.sharedContext.colType) {
                        this.switchColumns(result);
                    }
                }
            }
        };
        VGridDragDropCol.prototype.onDragover = function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (this.dragColumnBlock) {
                this.dragColumnBlock.style.top = event.clientY + 'px';
                this.dragColumnBlock.style.left = event.clientX + 'px';
            }
        };
        VGridDragDropCol.prototype.onDragend = function () {
            clearTimeout(this.mouseMoveTimer);
            this.sharedContext.dragging = false;
            document.removeEventListener('mouseup', this.onDragendBinded);
            document.removeEventListener('mousemove', this.onDragoverBinded);
            this.vGridElement.removeEventListener('mouseleave', this.onDragOutSideBinded);
            this.sharedContext.lastTarget = null;
            if (this.dragColumnBlock) {
                var parent_1 = this.dragColumnBlock.parentNode;
                if (parent_1) {
                    parent_1.removeChild(this.dragColumnBlock);
                    this.dragColumnBlock = null;
                }
            }
        };
        VGridDragDropCol.prototype.switchColumns = function (result) {
            var _this = this;
            var width;
            var newColType = result.colType;
            var oldColType = this.sharedContext.colType;
            var moreThenOneMainColumn = true;
            switch (true) {
                case newColType === 'left' && oldColType === 'main':
                case newColType === 'right' && oldColType === 'main':
                case newColType === 'main' && oldColType === 'left':
                case newColType === 'main' && oldColType === 'right':
                case newColType === 'left' && oldColType === 'right':
                case newColType === 'right' && oldColType === 'left':
                case newColType === 'main' && oldColType === 'chooser':
                case newColType === 'left' && oldColType === 'chooser':
                case newColType === 'right' && oldColType === 'chooser':
                    if (oldColType === 'main') {
                        var count_1 = -1;
                        this.sharedContext.columnsArray.forEach(function (x) {
                            if (x.show) {
                                count_1++;
                            }
                        });
                        if (!count_1) {
                            moreThenOneMainColumn = false;
                        }
                    }
                    if (moreThenOneMainColumn) {
                        this.sharedContext.columnsArray[this.sharedContext.colNo].show = false;
                        width = this.sharedContext.columnsArray[this.sharedContext.colNo].width;
                        this.sharedContext.columnsArraySorted.sort(function (a, b) {
                            return a.left - b.left;
                        });
                        var appendValue_2 = 0;
                        this.sharedContext.columnsArraySorted.forEach(function (x) {
                            if (x.show) {
                                x.left = appendValue_2;
                                appendValue_2 = appendValue_2 + x.width;
                            }
                        });
                        this.sharedContext.colType = result.colType;
                        this.sharedContext.columnsArray = this.vGrid.columnBindingContext['setup' + result.colType];
                        this.sharedContext.columnsArray[this.sharedContext.colNo].show = true;
                        this.sharedContext.columnsArray[this.sharedContext.colNo].width = width;
                        this.sharedContext.columnsArraySorted = [];
                        this.sharedContext.columnsArray.forEach(function (x) {
                            _this.sharedContext.columnsArraySorted.push(x);
                        });
                        this.sharedContext.columnsArraySorted.sort(function (a, b) {
                            return a.left - b.left;
                        });
                        appendValue_2 = 0;
                        this.sharedContext.columnsArraySorted.forEach(function (x) {
                            if (x.show) {
                                x.left = appendValue_2;
                                appendValue_2 = appendValue_2 + x.width;
                            }
                        });
                    }
                    break;
                default:
                    break;
            }
            if (newColType === 'left' && oldColType === 'main' && moreThenOneMainColumn) {
                this.htmlHeightWidth.moveWidthFromMainToLeft(width);
            }
            if (newColType === 'main' && oldColType === 'chooser' && moreThenOneMainColumn) {
                this.htmlHeightWidth.addWidthToMain(width);
            }
            if (newColType === 'left' && oldColType === 'chooser' && moreThenOneMainColumn) {
                this.htmlHeightWidth.addWidthToLeft(width);
            }
            if (newColType === 'right' && oldColType === 'chooser' && moreThenOneMainColumn) {
                this.htmlHeightWidth.addWidthToRight(width);
            }
            if (newColType === 'main' && oldColType === 'left' && moreThenOneMainColumn) {
                this.htmlHeightWidth.moveWidthFromLeftToMain(width);
            }
            if (newColType === 'right' && oldColType === 'main' && moreThenOneMainColumn) {
                this.htmlHeightWidth.moveWidthFromMainToRight(width);
            }
            if (newColType === 'main' && oldColType === 'right' && moreThenOneMainColumn) {
                this.htmlHeightWidth.moveWidthFromRightToMain(width);
            }
            if (newColType === 'left' && oldColType === 'right' && moreThenOneMainColumn) {
                this.htmlHeightWidth.moveWidthFromLeftToRight(width);
            }
            if (newColType === 'right' && oldColType === 'left' && moreThenOneMainColumn) {
                this.htmlHeightWidth.moveWidthFromRightToLeft(width);
            }
        };
        VGridDragDropCol.prototype.getTargetData = function (curTarget) {
            var draggableTarget = null;
            var count = 0;
            var exit = true;
            var isOk = false;
            while (exit) {
                count++;
                if (!curTarget.parentNode) {
                    exit = false;
                }
                else {
                    if (curTarget.draggable === true && draggableTarget === null) {
                        draggableTarget = curTarget;
                    }
                    switch (true) {
                        case curTarget.nodeName === 'AVG-DRAG-HELPER':
                        case curTarget.nodeName === 'AVG-COL':
                        case curTarget.nodeName === 'AVG-TOP-PANEL':
                            isOk = true;
                            exit = false;
                            break;
                        default:
                            curTarget = curTarget.parentNode;
                            break;
                    }
                }
                if (count > 10) {
                    exit = false;
                }
            }
            var curColType = null;
            var curColNo = null;
            var curContext = null;
            var curColumnsArray = null;
            var isPanel = false;
            if (isOk && curTarget.nodeName === 'AVG-COL') {
                curColType = curTarget.attributes.getNamedItem('data-avg-type').value;
                curColNo = parseInt(curTarget.attributes.getNamedItem('data-avg-config-col').value, 10);
                curContext = this.vGrid.columnBindingContext['setup' + curColType][curColNo];
                curColumnsArray = this.vGrid.columnBindingContext['setup' + curColType];
            }
            if (isOk && curTarget.nodeName === 'AVG-DRAG-HELPER') {
                curColType = curTarget.attributes.getNamedItem('data-avg-type').value;
                curColNo = parseInt(curTarget.attributes.getNamedItem('data-avg-config-col').value, 10);
                curContext = this.vGrid.columnBindingContext['setup' + 'main'][curColNo];
                curColumnsArray = this.vGrid.columnBindingContext['setup' + 'main'];
                isPanel = true;
            }
            if (isOk && curTarget.nodeName === 'AVG-TOP-PANEL') {
                isPanel = true;
            }
            return {
                draggable: draggableTarget,
                ok: isOk,
                target: curTarget,
                colType: curColType,
                colNo: curColNo,
                context: curContext,
                columnsArray: curColumnsArray,
                panel: isPanel
            };
        };
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", String)
        ], VGridDragDropCol.prototype, "title", void 0);
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", String)
        ], VGridDragDropCol.prototype, "field", void 0);
        VGridDragDropCol = __decorate([
            aurelia_framework_1.customAttribute('v-drag-drop-col'),
            aurelia_framework_1.inject(Element, v_grid_1.VGrid),
            __metadata("design:paramtypes", [Element, v_grid_1.VGrid])
        ], VGridDragDropCol);
        return VGridDragDropCol;
    }());
    exports.VGridDragDropCol = VGridDragDropCol;
});
//# sourceMappingURL=v-drag-drop-col.js.map