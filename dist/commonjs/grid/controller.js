var Controller = (function () {
    function Controller(vGrid) {
        this.vGrid = vGrid;
        this.element = vGrid.element;
    }
    Controller.prototype.getContext = function () {
        var c = this.vGrid;
        this.colConfig = c.colConfig;
        this.colRepeater = c.colRepeater;
        this.colRepeatRowTemplate = c.colRepeatRowTemplate;
        this.colRepeatRowHeaderTemplate = c.colRepeatRowHeaderTemplate;
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
        this.contextMenu = c.contextMenu;
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
    Controller.prototype.createGrid = function () {
        this.htmlHeightWidth.addDefaultsAttributes(this.attHeaderHeight, this.attRowHeight, this.attFooterHeight, this.attPanelHeight);
        this.mainMarkup.generateMainMarkup();
        this.htmlCache.updateMainMarkup();
        this.rowDataBinder.init();
        this.mainScrollEvents.init();
        this.rowMarkup.init(this.attRowHeight);
        this.htmlCache.updateRowsMarkup();
        this.rowScrollEvents.init(this.attRowHeight);
        this.columnMarkup.init(this.colConfig, this.overrideContext, this.colRepeater, this.colRepeatRowTemplate, this.colRepeatRowHeaderTemplate);
        this.htmlHeightWidth.setWidthFromColumnConfig(this.colConfig);
        this.rowClickHandler.init(this.attMultiSelect, this.attManualSelection, this);
        this.groupingElements.init(this);
        this.loadingScreen.init(this.overrideContext);
        this.contextMenu.init();
    };
    Controller.prototype.getElement = function (rowNumber, isDownScroll, callbackFN) {
        this.attGridConnector.getElement({
            row: rowNumber,
            isDown: isDownScroll,
            callback: callbackFN
        });
    };
    Controller.prototype.getOperatorName = function (name) {
        return this.attGridConnector.getFilterOperatorName(name);
    };
    Controller.prototype.expandGroup = function (id) {
        this.attGridConnector.expandGroup(id);
    };
    Controller.prototype.collapseGroup = function (id) {
        this.attGridConnector.collapseGroup(id);
    };
    Controller.prototype.select = function (row) {
        this.attGridConnector.select(row);
    };
    Controller.prototype.addToGrouping = function (attribute) {
        var currentGrouping = this.attGridConnector.getGrouping();
        if (currentGrouping.indexOf(attribute) === -1) {
            currentGrouping.push(attribute);
            this.attGridConnector.group(currentGrouping, true);
        }
    };
    Controller.prototype.removeFromGrouping = function (attribute) {
        var currentGrouping = this.attGridConnector.getGrouping();
        var index = currentGrouping.indexOf(attribute);
        if (index !== -1) {
            currentGrouping.splice(index, 1);
            this.attGridConnector.group(currentGrouping, true);
        }
    };
    Controller.prototype.getSelectionContext = function () {
        var sel = this.attGridConnector.getSelection();
        return sel;
    };
    Controller.prototype.raiseEvent = function (name, data) {
        if (data === void 0) { data = {}; }
        var event = new CustomEvent(name, {
            detail: data,
            bubbles: true
        });
        this.element.dispatchEvent(event);
    };
    Controller.prototype.setLoadingScreen = function (value, msg, collectionLength) {
        if (value) {
            return this.loadingScreen.enable(msg, collectionLength);
        }
        else {
            return this.loadingScreen.disable();
        }
    };
    Controller.prototype.updateHeights = function () {
        this.rowScrollEvents.setCollectionLength(this.attGridConnector.getDatasourceLength());
        this.htmlHeightWidth.setCollectionLength(this.attGridConnector.getDatasourceLength());
    };
    Controller.prototype.updateHeaderGrouping = function (groups) {
        var length = groups.length;
        this.columnBindingContext.setupgrouping = length;
        this.htmlHeightWidth.adjustWidthsColumns(this.columnBindingContext, length);
    };
    Controller.prototype.collectionLength = function () {
        return this.attGridConnector.getDatasourceLength();
    };
    Controller.prototype.triggerScroll = function (position) {
        if (position === null || position === undefined) {
            position = this.htmlCache.avg_content_main.scrollTop;
        }
        else {
            this.htmlCache.avg_content_main.scrollTop = position;
        }
        this.raiseEvent('avg-scroll', {
            isScrollBarScrolling: true,
            isDown: true,
            newTopPosition: position
        });
    };
    Controller.prototype.rebindAllRows = function () {
        this.raiseEvent('avg-rebind-all-rows', {
            rowCache: this.htmlCache.rowCache,
            downScroll: true
        });
    };
    Controller.prototype.addEventListeners = function () {
        var _this = this;
        this.element.addEventListener('getElement', function (event) {
            _this.attGridConnector.getElement(event.detail);
        });
    };
    return Controller;
}());
exports.Controller = Controller;

//# sourceMappingURL=controller.js.map
