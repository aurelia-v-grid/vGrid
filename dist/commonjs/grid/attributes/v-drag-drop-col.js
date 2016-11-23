var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridDragDropCol = (function () {
    function VGridDragDropCol(element, vGrid) {
        this.vGrid = vGrid;
        this.vGridElement = vGrid.element;
        this.controller = vGrid.controller;
        this.groupingElements = vGrid.groupingElements;
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
    };
    VGridDragDropCol.prototype.unbind = function () {
    };
    VGridDragDropCol.prototype.detached = function () {
    };
    VGridDragDropCol.prototype.attached = function () {
        var _this = this;
        var result = this.getTargetData(this.column);
        if (result.ok && !result.panel) {
            this.column = result.target;
            this.colType = this.column.attributes.getNamedItem('avg-type').value;
            this.colNo = parseInt(this.column.attributes.getNamedItem('avg-config-col').value, 10);
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
    };
    VGridDragDropCol.prototype.createDragElement = function () {
        this.dragColumnBlock = document.createElement('div');
        this.dragColumnBlock.classList.add(this.vGrid.attTheme);
        this.dragColumnBlock.classList.add('avg-drag');
        this.dragColumnBlock.style.top = -1200 + 'px';
        this.dragColumnBlock.style.left = -1200 + 'px';
        document.body.appendChild(this.dragColumnBlock);
        this.dragColumnBlock.innerHTML = this.title || this.vGrid.colConfig[this.colNo].colHeaderName;
    };
    VGridDragDropCol.prototype.onDragstart = function () {
        var _this = this;
        document.addEventListener('mouseup', this.onDragendBinded);
        this.vGridElement.addEventListener('mouseleave', this.onDragOutSideBinded);
        this.createDragElement();
        this.mouseMoveTimer = setTimeout(function () {
            document.addEventListener('mousemove', _this.onDragoverBinded, false);
        }, 300);
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
        var heightAndWidths = this.vGrid.htmlHeightWidth;
        switch (true) {
            case newColType === 'left' && oldColType === 'main':
            case newColType === 'main' && oldColType === 'left':
            case newColType === 'right' && oldColType === 'main':
            case newColType === 'main' && oldColType === 'right':
            case newColType === 'left' && oldColType === 'right':
            case newColType === 'right' && oldColType === 'left':
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
                break;
            default:
                break;
        }
        if (newColType === 'left' && oldColType === 'main') {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width - width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width - width;
            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width + width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width + width;
            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left + width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left + width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left + width;
        }
        if (newColType === 'main' && oldColType === 'left') {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width + width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width + width;
            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width - width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width - width;
            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left - width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left - width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left - width;
        }
        if (newColType === 'right' && oldColType === 'main') {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width - width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width - width;
            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width + width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width + width;
            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right + width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right + width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right + width;
        }
        if (newColType === 'main' && oldColType === 'right') {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width + width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width + width;
            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width - width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width - width;
            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right - width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right - width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right - width;
        }
        if (newColType === 'left' && oldColType === 'right') {
            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width - width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width - width;
            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width + width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width + width;
            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right - width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right - width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right - width;
            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left + width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left + width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left + width;
        }
        if (newColType === 'right' && oldColType === 'left') {
            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width + width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width + width;
            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width - width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width - width;
            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right + width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right + width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right + width;
            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left - width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left - width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left - width;
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
            curColType = curTarget.attributes.getNamedItem('avg-type').value;
            curColNo = parseInt(curTarget.attributes.getNamedItem('avg-config-col').value, 10);
            curContext = this.vGrid.columnBindingContext['setup' + curColType][curColNo];
            curColumnsArray = this.vGrid.columnBindingContext['setup' + curColType];
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
    return VGridDragDropCol;
}());
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
exports.VGridDragDropCol = VGridDragDropCol;

//# sourceMappingURL=v-drag-drop-col.js.map
