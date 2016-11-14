"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require('aurelia-framework');
var v_grid_1 = require('../v-grid');
var vGridAttributesResizeCol = (function () {
    function vGridAttributesResizeCol(element, vGrid) {
        this.vGrid = vGrid;
        this.ctx = vGrid.resizeAttributeSharedContext;
        this.element = element;
        this.screenX;
        this.originalWidth;
        this.column = this.element;
        while (this.column.nodeName !== 'AVG-COL') {
            this.column = this.column.parentNode;
        }
        this.colType = this.column.attributes.getNamedItem("avg-type").value;
        this.colNo = this.column.attributes.getNamedItem("avg-config-col").value * 1;
        this.context = vGrid.columnBindingContext["setup" + this.colType][this.colNo];
        this.columnsArray = vGrid.columnBindingContext["setup" + this.colType];
        this.columnBindingContext = vGrid.columnBindingContext;
    }
    vGridAttributesResizeCol.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
    };
    vGridAttributesResizeCol.prototype.attached = function () {
        var _this = this;
        var resizeHandle = document.createElement("DIV");
        resizeHandle.classList.add("avg-draggable-handler");
        this.onmousedownBinded = this.onmousedown.bind(this);
        this.onmousemoveBinded = this.onmousemove.bind(this);
        this.onmouseupBinded = this.onmouseup.bind(this);
        resizeHandle.onmousedown = function (e) {
            _this.ctx.resizing = true;
            _this.onmousedown(e);
        };
        this.column.appendChild(resizeHandle);
    };
    vGridAttributesResizeCol.prototype.onmouseup = function () {
        document.removeEventListener("mousemove", this.onmousemoveBinded);
        document.removeEventListener("mouseup", this.onmouseupBinded);
        this.ctx.resizing = false;
    };
    vGridAttributesResizeCol.prototype.onmousemove = function (e) {
        this.updateHeader(e);
    };
    vGridAttributesResizeCol.prototype.updateHeader = function (e) {
        var _this = this;
        var w = Math.abs(this.screenX - e.screenX);
        if (w % 2 === 0) {
            requestAnimationFrame(function () {
                var movementX = parseInt(_this.originalWidth) - ((_this.screenX - e.screenX)) + "px";
                var appendValue = parseInt(_this.originalWidth) - parseInt(movementX);
                if (_this.colType === "main") {
                    _this.columnsArray[_this.colNo].width = parseInt(movementX);
                    _this.vGrid.colConfig[_this.colNo].colWidth = _this.columnsArray[_this.colNo].width;
                    for (var i = 0; i < _this.columnsArray.length; i++) {
                        if (_this.columnsArray[_this.colNo].left < _this.columnsArray[i].left) {
                            _this.columnsArray[i].left = _this.originals[i] - appendValue;
                        }
                    }
                    _this.vGrid.htmlHeightWidth.avgContentMainScroll_Width = _this.avgContentMainScroll_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentHhandleScroll_Width = _this.avgContentHhandleScroll_Width - appendValue;
                }
                if (_this.colType === "right") {
                    _this.columnsArray[_this.colNo].width = parseInt(movementX);
                    _this.vGrid.colConfig[_this.colNo].colWidth = _this.columnsArray[_this.colNo].width;
                    for (var i = 0; i < _this.columnsArray.length; i++) {
                        if (_this.columnsArray[_this.colNo].left < _this.columnsArray[i].left) {
                            _this.columnsArray[i].left = _this.originals[i] - appendValue;
                        }
                    }
                    _this.vGrid.htmlHeightWidth.avgContentRight_Width = _this.avgContentRight_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgHeaderRight_Width = _this.avgHeaderRight_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentMain_Right = _this.avgContentMain_Right - appendValue;
                    _this.vGrid.htmlHeightWidth.avgHeaderMain_Right = _this.avgHeaderMain_Right - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentHhandle_Right = _this.avgContentHhandle_Right - appendValue;
                }
                if (_this.colType === "left") {
                    _this.columnsArray[_this.colNo].width = parseInt(movementX);
                    _this.vGrid.colConfig[_this.colNo].colWidth = _this.columnsArray[_this.colNo].width;
                    for (var i = 0; i < _this.columnsArray.length; i++) {
                        if (_this.columnsArray[_this.colNo].left < _this.columnsArray[i].left) {
                            _this.columnsArray[i].left = _this.originals[i] - appendValue;
                        }
                    }
                    _this.vGrid.htmlHeightWidth.avgContentLeft_Width = _this.avgContentLeft_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgHeaderLeft_Width = _this.avgHeaderLeft_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentMain_Left = _this.avgContentMain_Left - appendValue;
                    _this.vGrid.htmlHeightWidth.avgHeaderMain_Left = _this.avgHeaderMain_Left - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentHhandle_Left = _this.avgContentHhandle_Left - appendValue;
                }
            });
        }
    };
    vGridAttributesResizeCol.prototype.onmousedown = function (e) {
        var _this = this;
        this.screenX = e.screenX;
        this.originalWidth = this.context.width;
        this.originals = [];
        for (var i = 0; i < this.columnsArray.length; i++) {
            this.originals.push(this.columnsArray[i].left);
        }
        this.avgContentLeft_Width = this.vGrid.htmlHeightWidth.avgContentLeft_Width;
        this.avgHeaderLeft_Width = this.vGrid.htmlHeightWidth.avgHeaderLeft_Width;
        this.avgContentMainScroll_Width = this.vGrid.htmlHeightWidth.avgContentMainScroll_Width;
        this.avgHeaderMain_Left = this.vGrid.htmlHeightWidth.avgHeaderMain_Left;
        this.avgContentMain_Left = this.vGrid.htmlHeightWidth.avgContentMain_Left;
        this.avgContentMain_Right = this.vGrid.htmlHeightWidth.avgContentMain_Right;
        this.avgHeaderMain_Right = this.vGrid.htmlHeightWidth.avgHeaderMain_Right;
        this.avgContentRight_Width = this.vGrid.htmlHeightWidth.avgContentRight_Width;
        this.avgHeaderRight_Width = this.vGrid.htmlHeightWidth.avgHeaderRight_Width;
        this.avgContentHhandle_Right = this.vGrid.htmlHeightWidth.avgContentHhandle_Right;
        this.avgContentHhandle_Left = this.vGrid.htmlHeightWidth.avgContentHhandle_Left;
        this.avgContentHhandleScroll_Width = this.vGrid.htmlHeightWidth.avgContentHhandleScroll_Width;
        this.avgContentMainScrollLeft = this.vGrid.htmlCache.avg_content_main.scrollLeft;
        if (this.colType === "main") {
            this.isLast = this.vGrid.htmlHeightWidth.avgContentMainScroll_Width === (this.context.left + this.context.width);
        }
        if (this.colType === "left") {
            this.isLast = this.vGrid.htmlHeightWidth.avgContentLeft_Width === (this.context.left + this.context.width + this.vGrid.htmlHeightWidth.avgScrollBarWidth) + this.columnBindingContext.setupgrouping * 15;
        }
        if (this.colType === "right") {
            this.isLast = this.vGrid.htmlHeightWidth.avgContentRight_Width === (this.context.left + this.context.width + this.vGrid.htmlHeightWidth.avgScrollBarWidth);
        }
        var setupRight = this.vGrid.columnBindingContext.setupright;
        this.rightColNo;
        this.rightColNoWidth;
        setupRight.forEach(function (col, i) {
            if (col.left === 0) {
                _this.rightColNo = i;
                _this.rightColNoWidth = col.width;
            }
        });
        document.addEventListener("mousemove", this.onmousemoveBinded);
        document.addEventListener("mouseup", this.onmouseupBinded);
    };
    vGridAttributesResizeCol = __decorate([
        aurelia_framework_1.customAttribute('v-resize-col'),
        aurelia_framework_1.inject(Element, v_grid_1.VGrid), 
        __metadata('design:paramtypes', [Object, Object])
    ], vGridAttributesResizeCol);
    return vGridAttributesResizeCol;
}());
exports.vGridAttributesResizeCol = vGridAttributesResizeCol;

//# sourceMappingURL=v-resize-col.js.map
