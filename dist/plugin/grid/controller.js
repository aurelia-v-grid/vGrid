"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var Controller;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("Controller", Controller = function () {
                function Controller(vGrid) {
                    _classCallCheck(this, Controller);

                    this.vGrid = vGrid;

                    this.element = vGrid.element;
                }

                Controller.prototype.getContext = function getContext() {

                    var c = this.vGrid;

                    this.colConfig = c.colConfig;

                    this.viewCompiler = c.viewCompiler;
                    this.container = c.container;
                    this.viewResources = c.viewResources;
                    this.taskQueue = c.taskQueue;

                    this.htmlCache = c.htmlCache;
                    this.htmlHeightWidth = c.htmlHeightWidth;
                    this.viewSlots = c.viewSlots;
                    this.columnBindingContext = c.columnBindingContext;
                    this.rowDataBinder = c.rowDataBinder;
                    this.mainMarkup = c.mainMarkup;
                    this.mainScrollEvents = c.mainScrollEvents;
                    this.rowMarkup = c.rowMarkup;
                    this.rowScrollEvents = c.rowScrollEvents;
                    this.rowClickHandler = c.rowClickHandler;
                    this.htmlcolumnMarkupCache = c.columnMarkup;
                    this.columnMarkup = c.columnMarkup;
                    this.groupingElements = c.groupingElements;
                    this.loadingScreen = c.loadingScreen;

                    this.bindingContext = c.bindingContext;
                    this.overrideContext = c.overrideContext;
                    this.attRowHeight = c.attRowHeight;
                    this.attHeaderHeight = c.attHeaderHeight;
                    this.attFooterHeight = c.attFooterHeight;
                    this.attPanelHeight = c.attPanelHeight;
                    this.attMultiSelect = c.attMultiSelect;
                    this.attManualSelection = c.attManualSelection;
                    this.attGridConnector = c.attGridConnector;
                };

                Controller.prototype.createGrid = function createGrid() {
                    this.htmlHeightWidth.addDefaultsAttributes(this.attHeaderHeight, this.attRowHeight, this.attFooterHeight, this.attPanelHeight);

                    this.mainMarkup.generateMainMarkup();
                    this.htmlCache.updateMainMarkup();

                    this.rowDataBinder.init();

                    this.mainScrollEvents.init();

                    this.rowMarkup.init(this.attRowHeight);
                    this.htmlCache.updateRowsMarkup();

                    this.rowScrollEvents.init(this.attRowHeight);

                    this.columnMarkup.init(this.colConfig, this.overrideContext);

                    this.htmlHeightWidth.setWidthFromColumnConfig(this.colConfig);

                    this.rowClickHandler.init(this.attMultiSelect, this.attManualSelection, this);

                    this.groupingElements.init(this);

                    this.loadingScreen.init(this.overrideContext);
                };

                Controller.prototype.getElement = function getElement(row, isDown, callback) {
                    this.attGridConnector.getElement({
                        row: row,
                        isDown: isDown,
                        callback: callback
                    });
                };

                Controller.prototype.getOperatorName = function getOperatorName(name) {
                    return this.attGridConnector.getFilterOperatorName(name);
                };

                Controller.prototype.expandGroup = function expandGroup(id) {
                    this.attGridConnector.expandGroup(id);
                };

                Controller.prototype.collapseGroup = function collapseGroup(id) {
                    this.attGridConnector.collapseGroup(id);
                };

                Controller.prototype.select = function select(row) {
                    this.attGridConnector.select(row);
                };

                Controller.prototype.addToGrouping = function addToGrouping(attribute) {
                    var currentGrouping = this.attGridConnector.getGrouping();
                    currentGrouping.push(attribute);
                    this.attGridConnector.group(currentGrouping, true);
                };

                Controller.prototype.removeFromGrouping = function removeFromGrouping(attribute) {
                    var currentGrouping = this.attGridConnector.getGrouping();
                    var index = currentGrouping.indexOf(attribute);
                    if (index !== -1) {
                        currentGrouping.splice(index, 1);
                        this.attGridConnector.group(currentGrouping, true);
                    }
                };

                Controller.prototype.getSelectionContext = function getSelectionContext() {
                    return this.attGridConnector.selection;
                };

                Controller.prototype.raiseEvent = function raiseEvent(name) {
                    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                    var event = new CustomEvent(name, {
                        detail: data,
                        bubbles: true
                    });
                    this.element.dispatchEvent(event);
                    return event;
                };

                Controller.prototype.setLoadingScreen = function setLoadingScreen(value, msg, collectionLength) {

                    if (value) {
                        return this.loadingScreen.enable(msg, collectionLength);
                    } else {
                        return this.loadingScreen.disable();
                    }
                };

                Controller.prototype.updateHeights = function updateHeights() {
                    this.rowScrollEvents.setCollectionLength(this.attGridConnector.length());
                    this.htmlHeightWidth.setCollectionLength(this.attGridConnector.length());
                };

                Controller.prototype.updateHeaderGrouping = function updateHeaderGrouping(groups) {
                    var length = groups.length;
                    this.columnBindingContext.setupgrouping = length;
                    this.htmlHeightWidth.adjustWidthsColumns(this.columnBindingContext, length);
                };

                Controller.prototype.collectionLength = function collectionLength() {
                    return this.attGridConnector.length();
                };

                Controller.prototype.triggerScroll = function triggerScroll(position) {
                    if (position === null || position === undefined) {
                        position = this.htmlCache.avg_content_main.scrollTop;
                    } else {
                        this.htmlCache.avg_content_main.scrollTop = position;
                    }

                    this.raiseEvent("avg-scroll", {
                        isScrollBarScrolling: true,
                        isDown: true,
                        newTopPosition: position
                    });
                };

                Controller.prototype.rebindAllRows = function rebindAllRows() {
                    this.raiseEvent("avg-rebind-all-rows", {
                        rowCache: this.htmlCache.rowCache,
                        downScroll: true
                    });
                };

                Controller.prototype.addEventListeners = function addEventListeners() {
                    var _this = this;

                    this.element.addEventListener("getElement", function (event) {
                        _this.attGridConnector.getElement(event.detail);
                    });
                };

                return Controller;
            }());

            _export("Controller", Controller);
        }
    };
});
//# sourceMappingURL=controller.js.map
