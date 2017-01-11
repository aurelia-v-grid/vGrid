var RowMarkup = (function () {
    function RowMarkup(element, htmlCache) {
        this.element = element;
        this.htmlCache = htmlCache;
    }
    RowMarkup.prototype.init = function (rowHeight) {
        this.rowHeight = rowHeight;
        this.updateInternalHtmlCache();
        this.generateRows();
    };
    RowMarkup.prototype.generateRows = function () {
        var markupLeft = '';
        var markupMain = '';
        var markupRight = '';
        var markupGroup = '';
        for (var i = 0; i < 40; i++) {
            var translateY = this.rowHeight * i;
            var avgRowMarkup = "\n        <avg-row \n          class=\"avg-row\" \n          style=\"height:" + this.rowHeight + "px; \n            transform:translate3d(0px, " + translateY + "px, 0px);\n            z-index:5;\" \n          row=\"" + i + "\">\n        </avg-row>";
            var avgRowMarkupGroup = "\n        <avg-row \n          class=\"avg-row-helper\" \n          style=\"height:" + this.rowHeight + "px; \n            transform:translate3d(0px, " + translateY + "px, 0px);\n            z-index:5;\" \n          row=\"" + i + "\">\n        </avg-row>";
            markupLeft = markupLeft + avgRowMarkup;
            markupMain = markupMain + avgRowMarkup;
            markupRight = markupRight + avgRowMarkup;
            markupGroup = markupGroup + avgRowMarkupGroup;
        }
        this.left.innerHTML = markupLeft;
        this.main.innerHTML = markupLeft;
        this.right.innerHTML = markupLeft;
        this.group.innerHTML = markupGroup;
    };
    RowMarkup.prototype.updateInternalHtmlCache = function () {
        this.left = this.htmlCache.avg_content_left_scroll;
        this.main = this.htmlCache.avg_content_main_scroll;
        this.right = this.htmlCache.avg_content_right_scroll;
        this.group = this.htmlCache.avg_content_group_scroll;
    };
    return RowMarkup;
}());
exports.RowMarkup = RowMarkup;

//# sourceMappingURL=rowMarkup.js.map
