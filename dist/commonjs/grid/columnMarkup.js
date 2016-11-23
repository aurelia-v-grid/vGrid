var aurelia_framework_1 = require("aurelia-framework");
var columnMarkupHelper_1 = require("./columnMarkupHelper");
var ColumnMarkup = (function () {
    function ColumnMarkup(element, viewCompiler, container, viewResources, htmlCache, viewSlots, columnBindingContext) {
        this.element = element;
        this.htmlCache = htmlCache;
        this.viewSlots = viewSlots;
        this.columnBindingContext = columnBindingContext;
        this.markupHelper = new columnMarkupHelper_1.ColumnMarkupHelper();
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
    }
    ColumnMarkup.prototype.init = function (colConfig, overrideContext, colRepeater, colRepeatRowTemplate, colRepeatRowHeaderTemplate, colGroup) {
        this.overrideContext = overrideContext;
        this.colConfig = colConfig;
        this.configLength = colConfig.length;
        this.colRepeater = colRepeater;
        this.colRepeatRowTemplate = colRepeatRowTemplate;
        this.colRepeatHeaderTemplate = colRepeatRowHeaderTemplate;
        this.colGroup = colGroup;
        this.updateInternalHtmlCache();
        if (this.colConfig.length > 0) {
            this.markupHelper.generate(this.colConfig);
        }
        this.generateColumns();
    };
    ColumnMarkup.prototype.getRowViews = function (type) {
        var viewMarkup = '';
        var markupArray = [];
        if (type === 'group') {
            var defaultMarkup = [
                '<i click.delegate="changeGrouping(rowRef)">',
                '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">',
                '<path show.bind="rowRef.__groupExpanded" d="M4.8 7.5h6.5v1H4.8z"/>',
                '<path show.bind="!rowRef.__groupExpanded" d="M7.4 4.8v2.7H4.7v1h2.7v3h1v-3h2.8v-1H8.5V4.8h-1z"/>',
                '</svg>',
                '</i>&nbsp;${rowRef.__groupName} (${rowRef.__groupTotal})',
            ];
            var gTemplate = this.colGroup || defaultMarkup.join('');
            markupArray = [
                '<avg-col ',
                'class="avg-col-group"',
                'if.bind="rowRef.__group ===true"',
                'css="left:${rowRef.__groupLvl ? rowRef.__groupLvl *15:0}px;right:0">',
                gTemplate,
                '</avg-col>'
            ];
            viewMarkup = markupArray.join('');
        }
        else {
            if (this.colRepeater && type === 'main') {
                var style = 'style="left:0;right:0"';
                viewMarkup = "<avg-repeat                         class=\"avg-col\"                         if.bind=\"rowRef.__group !== true\" " + style + ">" + this.colRepeatRowTemplate + "                      </avg-repeat>";
            }
            else {
                for (var i = 0; i < this.configLength; i++) {
                    var style = void 0;
                    switch (type) {
                        case 'left':
                            style = 'css="width:${setupleft[' + i + '].width}px;\
                            left:${setupleft[' + i + '].left+ (setupgrouping * 15)}px"';
                            break;
                        case 'main':
                            style = 'css="width:${setupmain[' + i + '].width}px;\
                            left:${setupmain[' + i + '].left}px"';
                            break;
                        case 'right':
                            style = 'css="width:${setupright[' + i + '].width}px;\
                            left:${setupright[' + i + '].left}px"';
                            break;
                        default:
                    }
                    var template = this.colConfig[i].__colRowTemplateGenerated;
                    var colMarkup = "<avg-col                               class=\"avg-col\"                               if.bind=\"setup" + type + "[" + i + "].show && rowRef.__group !== true\" " + style + ">" + template + "                          </avg-col>";
                    viewMarkup = viewMarkup + colMarkup;
                }
            }
        }
        var groupingBlock = '';
        if (type === 'left') {
            groupingBlock = '<avg-col \
      class="avg-col-grouping" \
      css="left:0px;width:${rowRef.__groupLvl ? rowRef.__groupLvl *15:0}px"></avg-col>';
        }
        return this.viewCompiler.compile("<template>" + (groupingBlock + viewMarkup) + "</template>", this.viewResources);
    };
    ColumnMarkup.prototype.createColSetupContext = function (type) {
        var leftCur = 0;
        for (var i = 0; i < this.configLength; i++) {
            var widthCur = this.colConfig[i].colWidth;
            var showme = false;
            switch (type) {
                case 'left':
                    showme = this.colConfig[i].colPinLeft;
                    break;
                case 'main':
                    showme = !this.colConfig[i].colPinLeft && !this.colConfig[i].colPinRight;
                    break;
                case 'right':
                    showme = this.colConfig[i].colPinRight;
                    break;
                default:
            }
            this.columnBindingContext['setup' + type].push({
                width: widthCur,
                show: showme,
                left: leftCur
            });
            if (showme) {
                leftCur = leftCur + widthCur;
            }
        }
    };
    ColumnMarkup.prototype.getHeaderViews = function (type) {
        var viewMarkup = '';
        if (this.colRepeater && type === 'main' && this.colRepeatHeaderTemplate) {
            var style = 'css="left:0;right:0"';
            viewMarkup = "<div class=\"avg-col\" " + style + ">" + this.colRepeatHeaderTemplate + "</div>";
        }
        else {
            for (var i = 0; i < this.configLength; i++) {
                var style = void 0;
                switch (type) {
                    case 'left':
                        style = 'css="width:${setupleft[' + i + '].width}px;\
                          left:${setupleft[' + i + '].left + (setupgrouping * 15)}px"';
                        break;
                    case 'main':
                        style = 'css="width:${setupmain[' + i + '].width}px;\
                          left:${setupmain[' + i + '].left}px"';
                        break;
                    case 'right':
                        style = 'css="width:${setupright[' + i + '].width}px;\
                          left:${setupright[' + i + '].left}px"';
                        break;
                    default:
                }
                var template = this.colConfig[i].__colHeaderTemplateGenerated;
                var colMarkup = "<avg-col                             avg-type=\"" + type + "\"                             avg-config-col=\"" + i + "\"                             class=\"avg-col\"                             if.bind=\"setup" + type + "[" + i + "].show\"                             " + style + ">" + template + "                          </avg-col>";
                viewMarkup = viewMarkup + colMarkup;
            }
        }
        var groupingBlock = '';
        if (type === 'left') {
            groupingBlock = '<avg-col \
                          class="avg-col-grouping-header" \
                          css="left:0px;width:${setupgrouping ? (setupgrouping * 15):0}px"> \
                       </avg-col>';
        }
        return this.viewCompiler.compile("<template>" + (groupingBlock + viewMarkup) + "</template>", this.viewResources);
    };
    ColumnMarkup.prototype.generateColumns = function () {
        if (this.columnBindingContext.setupmain.length === 0) {
            this.createColSetupContext('left');
            this.createColSetupContext('main');
            this.createColSetupContext('right');
            this.createColSetupContext('group');
        }
        var viewFactoryLeft = this.getRowViews('left');
        var viewFactoryMain = this.getRowViews('main');
        var viewFactoryRight = this.getRowViews('right');
        var viewFactoryGroup = this.getRowViews('group');
        for (var i = 0; i < this.rowLength; i++) {
            this.viewSlots.leftRowViewSlots[i] = this.createViewSlot(this.leftRows[i], viewFactoryLeft);
            this.viewSlots.mainRowViewSlots[i] = this.createViewSlot(this.mainRows[i], viewFactoryMain);
            this.viewSlots.rightRowViewSlots[i] = this.createViewSlot(this.rightRows[i], viewFactoryRight);
            this.viewSlots.groupRowViewSlots[i] = this.createViewSlot(this.groupRows[i], viewFactoryGroup);
            this.htmlCache.rowCache[i].leftRowViewSlot = this.viewSlots.leftRowViewSlots[i];
            this.htmlCache.rowCache[i].mainRowViewSlot = this.viewSlots.mainRowViewSlots[i];
            this.htmlCache.rowCache[i].rightRowViewSlot = this.viewSlots.rightRowViewSlots[i];
            this.htmlCache.rowCache[i].groupRowViewSlot = this.viewSlots.groupRowViewSlots[i];
        }
        var viewFactoryHeaderLeft = this.getHeaderViews('left');
        var viewFactoryHeaderMain = this.getHeaderViews('main');
        var viewFactoryHeaderRight = this.getHeaderViews('right');
        this.viewSlots.leftHeaderViewSlot = this.createViewSlot(this.leftHeader, viewFactoryHeaderLeft);
        this.viewSlots.mainHeaderViewSlot = this.createViewSlot(this.mainHeader, viewFactoryHeaderMain);
        this.viewSlots.rightHeaderViewSlot = this.createViewSlot(this.rightHeader, viewFactoryHeaderRight);
    };
    ColumnMarkup.prototype.createViewSlot = function (element, viewFactory) {
        var view = viewFactory.create(this.container);
        var viewSlot = new aurelia_framework_1.ViewSlot(element, true);
        viewSlot.add(view);
        return viewSlot;
    };
    ColumnMarkup.prototype.updateInternalHtmlCache = function () {
        this.leftScroll = this.htmlCache.avg_content_left_scroll;
        this.mainScroll = this.htmlCache.avg_content_main_scroll;
        this.rightScroll = this.htmlCache.avg_content_right_scroll;
        this.groupScroll = this.htmlCache.avg_content_group_scroll;
        this.leftHeader = this.htmlCache.avg_header_left;
        this.mainHeader = this.htmlCache.avg_header_main_scroll;
        this.rightHeader = this.htmlCache.avg_header_right;
        this.leftRows = this.htmlCache.avg_left_rows;
        this.mainRows = this.htmlCache.avg_main_rows;
        this.rightRows = this.htmlCache.avg_right_rows;
        this.groupRows = this.htmlCache.avg_group_rows;
        this.rowLength = this.leftRows.length;
    };
    return ColumnMarkup;
}());
exports.ColumnMarkup = ColumnMarkup;

//# sourceMappingURL=columnMarkup.js.map
