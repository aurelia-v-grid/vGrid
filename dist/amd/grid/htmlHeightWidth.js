define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var HtmlHeightWidth = (function () {
        function HtmlHeightWidth(controller) {
            this.controller = controller;
            this.avgScrollBarWidth = this.getScrollbarWidth() || 17;
            this.avgPanel_Height = 0;
            this.avgHeader_Height = 30;
            this.avgHeader_Top = 0;
            this.avgContent_Top = 30;
            this.avgContent_Bottom = 30;
            this.avgHeaderLeft_Width = 200;
            this.avgHeaderMain_Left = 200;
            this.avgHeaderMain_Right = 150;
            this.avgHeaderMainScroll_Width = 0;
            this.avgHeaderMainScroll_Height = 100;
            this.avgHeaderRight_Right = 0;
            this.avgHeaderRight_Width = 150;
            this.avgContentLeft_Width = 200 + this.avgScrollBarWidth;
            this.avgContentLeftScroll_Width = '100%';
            this.avgContentLeftScroll_Height = 0 + this.avgScrollBarWidth;
            this.avgContentMain_Left = 200;
            this.avgContentMain_Right = 150 - this.avgScrollBarWidth;
            this.avgContentMainScroll_Width = 0;
            this.avgContentMainScroll_Height = 0;
            this.avgContentRight_Right = 0;
            this.avgContentRight_Width = 150;
            this.avgContentRightScroll_Width = '100%';
            this.avgContentRightScroll_Height = 0 + this.avgScrollBarWidth;
            this.avgContentGroup_Width = 150;
            this.avgContentGroup_Height = 0;
            this.avgContentGroup_Top = 0;
            this.avgContentGroup_Bottom = 0;
            this.avgContentVhandle_Width = 0 + this.avgScrollBarWidth;
            this.avgContentVhandle_Height = 0;
            this.avgContentVhandle_Top = 0;
            this.avgContentVhandleScroll_Height = 0;
            this.avgContentVhandle_Bottom = 0;
            this.avgContentHhandle_Bottom = 0;
            this.avgContentHhandle_Right = 0 + this.avgScrollBarWidth;
            this.avgContentHhandle_Left = 0;
            this.avgContentHhandle_Height = 17;
            this.avgContentHhandleScroll_Width = 17;
            this.avgFooter_Height = 30;
        }
        HtmlHeightWidth.prototype.getNewHeight = function (length) {
            var lengthTotal = 0;
            if (this.controller.attVariableRowHeight) {
                lengthTotal = this.controller.getRowHeightState().total;
            }
            else {
                lengthTotal = this.controller.attRowHeight * length;
            }
            return lengthTotal;
        };
        HtmlHeightWidth.prototype.setCollectionLength = function (length, includeScroller) {
            var rowTotal = this.getNewHeight(length);
            var avgScrollbarHeightValue = includeScroller === false ? 0 : this.avgScrollBarWidth;
            var total = rowTotal + avgScrollbarHeightValue;
            this.avgContentRightScroll_Height = total;
            this.avgContentGroup_Height = total;
            this.avgContentVhandleScroll_Height = total;
            this.avgContentMainScroll_Height = total;
            this.avgContentLeftScroll_Height = total;
        };
        HtmlHeightWidth.prototype.addDefaultsAttributes = function (attHeaderHeight, attRowHeight, attFooterHeight, attPanelHeight) {
            this.attHeaderHeight = attHeaderHeight;
            this.attRowHeight = attRowHeight;
            this.attFooterHeight = attFooterHeight;
            this.attPanelHeight = attPanelHeight;
            this.avgPanel_Height = attPanelHeight;
            this.avgHeader_Top = attPanelHeight;
            this.avgHeader_Height = attHeaderHeight;
            this.avgContent_Top = attHeaderHeight + attPanelHeight;
            this.avgContent_Bottom = attFooterHeight;
            this.avgFooter_Height = attFooterHeight;
            this.avgHeaderMainScroll_Height = attHeaderHeight;
            this.avgContentGroup_Height = this.avgContentGroup_Height;
            this.avgContentGroup_Top = this.avgContent_Top;
            this.avgContentGroup_Bottom = this.avgContent_Bottom;
            this.avgContentVhandle_Height = this.avgContentVhandle_Height;
            this.avgContentVhandle_Top = this.avgContent_Top;
            this.avgContentVhandle_Bottom = this.avgContent_Bottom;
            this.avgContentHhandle_Bottom = attFooterHeight;
            this.avgContentHhandle_Height = this.avgScrollBarWidth;
        };
        HtmlHeightWidth.prototype.adjustWidthsColumns = function (columnBindingContext, groupsLength) {
            var left = groupsLength ? groupsLength * 15 : 0;
            var main = 0;
            var right = 0;
            for (var i = 0; i < columnBindingContext.setupmain.length; i++) {
                if (columnBindingContext.setupleft[i].show) {
                    left = left + columnBindingContext.setupleft[i].width;
                }
                if (columnBindingContext.setupmain[i].show) {
                    main = main + columnBindingContext.setupmain[i].width;
                }
                if (columnBindingContext.setupright[i].show) {
                    right = right + columnBindingContext.setupright[i].width;
                }
            }
            this.avgContentLeft_Width = left;
            this.avgHeaderLeft_Width = left;
            this.avgContentMain_Left = left;
            this.avgContentMain_Right = right;
            this.avgHeaderMain_Left = left;
            this.avgHeaderMain_Right = right;
            this.avgHeaderMainScroll_Width = main;
            this.avgContentMainScroll_Width = main;
            this.avgContentRight_Width = right;
            this.avgHeaderRight_Width = right;
            this.avgContentHhandle_Right = right;
            this.avgContentHhandle_Left = left;
            this.avgContentHhandleScroll_Width = main;
        };
        HtmlHeightWidth.prototype.setWidthFromColumnConfig = function (colConfig, groupsLength) {
            var left = groupsLength ? groupsLength * 15 : 0;
            var main = 0;
            var right = 0;
            for (var i = 0; i < colConfig.length; i++) {
                switch (true) {
                    case colConfig[i].colPinLeft && colConfig[i].colPinRight:
                        left = left + colConfig[i].colWidth;
                        right = right + colConfig[i].colWidth;
                        break;
                    case colConfig[i].colPinLeft:
                        left = left + colConfig[i].colWidth;
                        break;
                    case colConfig[i].colPinRight:
                        right = right + colConfig[i].colWidth;
                        break;
                    case !colConfig[i].colPinLeft && !colConfig[i].colPinRight:
                        main = main + colConfig[i].colWidth;
                        break;
                    default:
                }
            }
            this.avgContentLeft_Width = left;
            this.avgHeaderLeft_Width = left;
            this.avgContentMain_Left = left;
            this.avgContentMain_Right = right;
            this.avgHeaderMain_Left = left;
            this.avgHeaderMain_Right = right;
            this.avgHeaderMainScroll_Width = main;
            this.avgContentMainScroll_Width = main;
            this.avgContentRight_Width = right;
            this.avgHeaderRight_Width = right;
            this.avgContentHhandle_Right = right;
            this.avgContentHhandle_Left = left;
            this.avgContentHhandleScroll_Width = main;
        };
        HtmlHeightWidth.prototype.getScrollbarWidth = function () {
            var outer = document.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.width = '100px';
            document.body.appendChild(outer);
            var widthNoScroll = outer.offsetWidth;
            outer.style.overflow = 'scroll';
            var inner = document.createElement('div');
            inner.style.width = '100%';
            outer.appendChild(inner);
            var widthWithScroll = inner.offsetWidth;
            outer.parentNode.removeChild(outer);
            return widthNoScroll - widthWithScroll;
        };
        HtmlHeightWidth.prototype.moveWidthFromMainToLeft = function (width) {
            this.avgContentMainScroll_Width = this.avgContentMainScroll_Width - width;
            this.avgContentHhandleScroll_Width = this.avgContentHhandleScroll_Width - width;
            this.avgContentLeft_Width = this.avgContentLeft_Width + width;
            this.avgHeaderLeft_Width = this.avgHeaderLeft_Width + width;
            this.avgContentMain_Left = this.avgContentMain_Left + width;
            this.avgHeaderMain_Left = this.avgHeaderMain_Left + width;
            this.avgContentHhandle_Left = this.avgContentHhandle_Left + width;
        };
        HtmlHeightWidth.prototype.moveWidthFromLeftToMain = function (width) {
            this.avgContentMainScroll_Width = this.avgContentMainScroll_Width + width;
            this.avgContentHhandleScroll_Width = this.avgContentHhandleScroll_Width + width;
            this.avgContentLeft_Width = this.avgContentLeft_Width - width;
            this.avgHeaderLeft_Width = this.avgHeaderLeft_Width - width;
            this.avgContentMain_Left = this.avgContentMain_Left - width;
            this.avgHeaderMain_Left = this.avgHeaderMain_Left - width;
            this.avgContentHhandle_Left = this.avgContentHhandle_Left - width;
        };
        HtmlHeightWidth.prototype.moveWidthFromMainToRight = function (width) {
            this.avgContentMainScroll_Width = this.avgContentMainScroll_Width - width;
            this.avgContentHhandleScroll_Width = this.avgContentHhandleScroll_Width - width;
            this.avgContentRight_Width = this.avgContentRight_Width + width;
            this.avgHeaderRight_Width = this.avgHeaderRight_Width + width;
            this.avgContentMain_Right = this.avgContentMain_Right + width;
            this.avgHeaderMain_Right = this.avgHeaderMain_Right + width;
            this.avgContentHhandle_Right = this.avgContentHhandle_Right + width;
        };
        HtmlHeightWidth.prototype.moveWidthFromRightToMain = function (width) {
            this.avgContentMainScroll_Width = this.avgContentMainScroll_Width + width;
            this.avgContentHhandleScroll_Width = this.avgContentHhandleScroll_Width + width;
            this.avgContentRight_Width = this.avgContentRight_Width - width;
            this.avgHeaderRight_Width = this.avgHeaderRight_Width - width;
            this.avgContentMain_Right = this.avgContentMain_Right - width;
            this.avgHeaderMain_Right = this.avgHeaderMain_Right - width;
            this.avgContentHhandle_Right = this.avgContentHhandle_Right - width;
        };
        HtmlHeightWidth.prototype.moveWidthFromLeftToRight = function (width) {
            this.avgContentRight_Width = this.avgContentRight_Width - width;
            this.avgHeaderRight_Width = this.avgHeaderRight_Width - width;
            this.avgContentLeft_Width = this.avgContentLeft_Width + width;
            this.avgHeaderLeft_Width = this.avgHeaderLeft_Width + width;
            this.avgContentMain_Right = this.avgContentMain_Right - width;
            this.avgHeaderMain_Right = this.avgHeaderMain_Right - width;
            this.avgContentHhandle_Right = this.avgContentHhandle_Right - width;
            this.avgContentMain_Left = this.avgContentMain_Left + width;
            this.avgHeaderMain_Left = this.avgHeaderMain_Left + width;
            this.avgContentHhandle_Left = this.avgContentHhandle_Left + width;
        };
        HtmlHeightWidth.prototype.moveWidthFromRightToLeft = function (width) {
            this.avgContentRight_Width = this.avgContentRight_Width + width;
            this.avgHeaderRight_Width = this.avgHeaderRight_Width + width;
            this.avgContentLeft_Width = this.avgContentLeft_Width - width;
            this.avgHeaderLeft_Width = this.avgHeaderLeft_Width - width;
            this.avgContentMain_Right = this.avgContentMain_Right + width;
            this.avgHeaderMain_Right = this.avgHeaderMain_Right + width;
            this.avgContentHhandle_Right = this.avgContentHhandle_Right + width;
            this.avgContentMain_Left = this.avgContentMain_Left - width;
            this.avgHeaderMain_Left = this.avgHeaderMain_Left - width;
            this.avgContentHhandle_Left = this.avgContentHhandle_Left - width;
        };
        HtmlHeightWidth.prototype.addWidthToLeft = function (width) {
            this.avgContentLeft_Width = this.avgContentMainScroll_Width + width;
            this.avgHeaderLeft_Width = this.avgContentHhandleScroll_Width + width;
            this.avgContentMain_Left = this.avgContentMain_Left + width;
            this.avgHeaderMain_Left = this.avgHeaderMain_Left + width;
            this.avgContentHhandle_Left = this.avgContentHhandle_Left + width;
        };
        HtmlHeightWidth.prototype.addWidthToMain = function (width) {
            this.avgContentMainScroll_Width = this.avgContentMainScroll_Width + width;
            this.avgContentHhandleScroll_Width = this.avgContentHhandleScroll_Width + width;
        };
        HtmlHeightWidth.prototype.addWidthToRight = function (width) {
            this.avgContentRight_Width = this.avgContentMainScroll_Width + width;
            this.avgHeaderRight_Width = this.avgContentHhandleScroll_Width + width;
            this.avgContentMain_Right = this.avgContentMain_Right + width;
            this.avgHeaderMain_Right = this.avgHeaderMain_Right + width;
            this.avgContentHhandle_Right = this.avgContentHhandle_Right + width;
        };
        HtmlHeightWidth.prototype.removeWidthFromLeft = function (width) {
            this.avgContentLeft_Width = this.avgContentLeft_Width - width;
            this.avgHeaderLeft_Width = this.avgHeaderLeft_Width - width;
            this.avgContentMain_Left = this.avgContentMain_Left - width;
            this.avgHeaderMain_Left = this.avgHeaderMain_Left - width;
            this.avgContentHhandle_Left = this.avgContentHhandle_Left - width;
        };
        HtmlHeightWidth.prototype.removeWidthFromMain = function (width) {
            this.avgContentMainScroll_Width = this.avgContentMainScroll_Width - width;
            this.avgContentHhandleScroll_Width = this.avgContentHhandleScroll_Width - width;
        };
        HtmlHeightWidth.prototype.removeWidthFromRight = function (width) {
            this.avgContentRight_Width = this.avgContentRight_Width - width;
            this.avgHeaderRight_Width = this.avgHeaderRight_Width - width;
            this.avgContentMain_Right = this.avgContentMain_Right - width;
            this.avgHeaderMain_Right = this.avgHeaderMain_Right - width;
            this.avgContentHhandle_Right = this.avgContentHhandle_Right - width;
        };
        return HtmlHeightWidth;
    }());
    exports.HtmlHeightWidth = HtmlHeightWidth;
});
//# sourceMappingURL=htmlHeightWidth.js.map