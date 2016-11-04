'use strict';

System.register(['aurelia-framework', './columnMarkupHelper'], function (_export, _context) {
    "use strict";

    var ViewSlot, ColumnMarkupHelper, ColumnMarkup;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            ViewSlot = _aureliaFramework.ViewSlot;
        }, function (_columnMarkupHelper) {
            ColumnMarkupHelper = _columnMarkupHelper.ColumnMarkupHelper;
        }],
        execute: function () {
            _export('ColumnMarkup', ColumnMarkup = function () {
                function ColumnMarkup(element, viewCompiler, container, viewResources, htmlCache, viewSlots, columnBindingContext) {
                    _classCallCheck(this, ColumnMarkup);

                    this.element = element;
                    this.htmlCache = htmlCache;
                    this.viewSlots = viewSlots;
                    this.columnBindingContext = columnBindingContext;
                    this.markupHelper = new ColumnMarkupHelper();
                    this.viewCompiler = viewCompiler;
                    this.container = container;
                    this.viewResources = viewResources;
                }

                ColumnMarkup.prototype.init = function init(colConfig, overrideContext) {
                    this.overrideContext = overrideContext;
                    this.colConfig = colConfig;
                    this.configLength = colConfig.length;
                    this.markupHelper.generate(this.colConfig);
                    this.updateInternalHtmlCache();
                    this.generate();
                };

                ColumnMarkup.prototype.updateInternalHtmlCache = function updateInternalHtmlCache() {
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

                ColumnMarkup.prototype.getRowViews = function getRowViews(type) {
                    var views = [];
                    var viewMarkup = "";
                    var markupArray = [];

                    if (type === "group") {
                        markupArray = ['<avg-col ', 'class="avg-col-group"', 'if.bind="rowRef.__group ===true"', 'css="left:${rowRef.__groupLvl ? rowRef.__groupLvl *15:0}px;right:0">', '<i click.delegate="changeGrouping(rowRef)"', 'class="avg-fa avg-fa-${rowRef.__groupExpanded ? ' + "'minus':'plus'" + '}-square-o"', 'aria-hidden="true">', '</i>&nbsp;${rowRef.__groupName} (${rowRef.__groupTotal})', '</avg-col>'];

                        viewMarkup = markupArray.join("");
                    } else {
                        for (var i = 0; i < this.configLength; i++) {

                            var style = void 0;
                            switch (type) {
                                case "left":
                                    style = 'css="width:${setupleft[' + i + '].width}px;left:${setupleft[' + i + '].left+ (setupgrouping * 15)}px"';
                                    break;
                                case "main":
                                    style = 'css="width:${setupmain[' + i + '].width}px;left:${setupmain[' + i + '].left}px"';
                                    break;
                                case "right":
                                    style = 'css="width:${setupright[' + i + '].width}px;left:${setupright[' + i + '].left}px"';
                                    break;
                            }

                            var template = this.colConfig[i].colRowTemplate;
                            var colMarkup = '<avg-col class="avg-col"  if.bind="setup' + type + '[' + i + '].show && rowRef.__group !== true" ' + style + '>' + template + '</avg-col>';
                            viewMarkup = viewMarkup + colMarkup;
                        }
                    }

                    var groupingBlock = "";
                    if (type === "left") {
                        groupingBlock = '<avg-col class="avg-col-grouping" css="left:0px;width:${rowRef.__groupLvl ? rowRef.__groupLvl *15:0}px"></avg-col>';
                    }

                    var viewFactory = this.viewCompiler.compile('<template>' + (groupingBlock + viewMarkup) + '</template>', this.viewResources);
                    return viewFactory;
                };

                ColumnMarkup.prototype.createColSetupContext = function createColSetupContext(type) {

                    var left = 0;
                    for (var i = 0; i < this.configLength; i++) {

                        var width = this.colConfig[i].colWidth;
                        var show = false;
                        switch (type) {
                            case "left":
                                show = this.colConfig[i].colPinLeft;
                                break;
                            case "main":
                                show = !this.colConfig[i].colPinLeft && !this.colConfig[i].colPinRight;
                                break;
                            case "right":
                                show = this.colConfig[i].colPinRight;
                                break;
                        }

                        this.columnBindingContext["setup" + type].push({
                            width: width,
                            show: show,
                            left: left
                        });
                        if (show) {
                            left = left + width;
                        }
                    }
                };

                ColumnMarkup.prototype.getHeaderViews = function getHeaderViews(type) {
                    var views = [];
                    var left = 0;
                    var viewMarkup = "";

                    for (var i = 0; i < this.configLength; i++) {
                        var style = void 0;
                        switch (type) {
                            case "left":
                                style = 'css="width:${setupleft[' + i + '].width}px;left:${setupleft[' + i + '].left + (setupgrouping * 15)}px"';
                                break;
                            case "main":
                                style = 'css="width:${setupmain[' + i + '].width}px;left:${setupmain[' + i + '].left}px"';
                                break;
                            case "right":
                                style = 'css="width:${setupright[' + i + '].width}px;left:${setupright[' + i + '].left}px"';
                                break;
                        }

                        var template = this.colConfig[i].colHeaderTemplate;
                        var colMarkup = '<avg-col avg-type="' + type + '" avg-config-col="' + i + '" class="avg-col" if.bind="setup' + type + '[' + i + '].show" ' + style + '>' + template + '</avg-col>';
                        viewMarkup = viewMarkup + colMarkup;
                    }

                    var groupingBlock = "";
                    if (type === "left") {
                        groupingBlock = '<avg-col class="avg-col-grouping-header" css="left:0px;width:${setupgrouping ? (setupgrouping * 15):0}px"></avg-col>';
                    }

                    var viewFactory = this.viewCompiler.compile('<template>' + (groupingBlock + viewMarkup) + '</template>', this.viewResources);
                    return viewFactory;
                };

                ColumnMarkup.prototype.generate = function generate() {

                    if (this.columnBindingContext.setupmain.length === 0) {
                        this.createColSetupContext("left");
                        this.createColSetupContext("main");
                        this.createColSetupContext("right");
                        this.createColSetupContext("group");
                    }

                    var viewFactoryLeft = this.getRowViews("left");
                    var viewFactoryMain = this.getRowViews("main");
                    var viewFactoryRight = this.getRowViews("right");
                    var viewFactoryGroup = this.getRowViews("group");

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

                    var viewFactoryHeaderLeft = this.getHeaderViews("left");
                    var viewFactoryHeaderMain = this.getHeaderViews("main");
                    var viewFactoryHeaderRight = this.getHeaderViews("right");

                    this.viewSlots.leftHeaderViewSlot = this.createViewSlot(this.leftHeader, viewFactoryHeaderLeft);
                    this.viewSlots.mainHeaderViewSlot = this.createViewSlot(this.mainHeader, viewFactoryHeaderMain);
                    this.viewSlots.rightHeaderViewSlot = this.createViewSlot(this.rightHeader, viewFactoryHeaderRight);
                };

                ColumnMarkup.prototype.createViewSlot = function createViewSlot(element, viewFactory) {

                    var view = viewFactory.create(this.container);
                    var viewSlot = new ViewSlot(element, true);

                    viewSlot.add(view);

                    var context = {};

                    return viewSlot;
                };

                ColumnMarkup.prototype.getCol = function getCol() {
                    return this.columnBindingContext.setupmain;
                };

                return ColumnMarkup;
            }());

            _export('ColumnMarkup', ColumnMarkup);
        }
    };
});
//# sourceMappingURL=columnMarkup.js.map
