var Controller = (function () {
    function Controller(vGrid) {
        this.vGrid = vGrid;
        this.element = vGrid.element;
    }
    Controller.prototype.getContext = function () {
        var c = this.vGrid;
        this.colConfig = c.colConfig;
        this.backupColConfig = c.backupColConfig;
        this.colRepeater = c.colRepeater;
        this.colGroupRow = c.colGroupRow;
        this.colGroupElement = c.colGroupElement;
        this.colRepeatRowTemplate = c.colRepeatRowTemplate;
        this.colRepeatRowHeaderTemplate = c.colRepeatRowHeaderTemplate;
        this.customMenuTemplates = c.customMenuTemplates;
        this.loadingScreenTemplate = c.loadingScreenTemplate;
        this.footerTemplate = c.footerTemplate;
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
        this.footer = c.footer;
        this.bindingContext = c.bindingContext;
        this.overrideContext = c.overrideContext;
        this.attRowHeight = c.attRowHeight;
        this.attHeaderHeight = c.attHeaderHeight;
        this.attFooterHeight = c.attFooterHeight;
        this.attPanelHeight = c.attPanelHeight;
        this.attMultiSelect = c.attMultiSelect;
        this.attManualSelection = c.attManualSelection;
        this.attGridConnector = c.attGridConnector;
        this.attOnRowDraw = c.attOnRowDraw;
        this.attI18N = c.attI18N;
        this.attDataDelay = c.attDataDelay;
    };
    Controller.prototype.triggerI18N = function () {
        var _this = this;
        var keys = Object.keys({
            close: 'Close',
            pinLeft: 'Pin left',
            pinRight: 'Pin Right',
            groupBy: 'Group By',
            sortAscending: 'Sort Ascending',
            sortDescending: 'Sort Descending',
            showAll: 'Show All',
            clearCurrent: 'Clear Current',
            clearAll: 'Clear All',
            chooseOperator: 'Choose Operator',
            back: 'Back',
            equals: 'Equals',
            lessThanOrEqual: 'Less than or equal',
            greaterThanOrEqual: 'Greater than or equal',
            lessThan: 'Less than',
            greaterThan: 'Greater than',
            contains: 'Contains',
            notEqualTo: 'Not equal to',
            doesNotContain: 'Does not contain',
            beginsWith: 'Begins with',
            endsWith: 'Ends with',
            loading: 'loading'
        });
        if (this.attI18N) {
            keys.forEach(function (key) {
                if (_this.vGrid.filterOperatorTranslationKeys[key]) {
                    _this.vGrid.filterOperatorNames[_this.vGrid.filterOperatorTranslationKeys[key]] = _this.attI18N(key);
                }
                _this.contextMenu.updateMenuStrings(key, _this.attI18N(key));
            });
            this.raiseEvent('filterTranslation', {});
            var loading = this.attI18N('loading') || keys.loading;
            this.loadingScreen.updateLoadingDefaultLoadingMessage(loading);
        }
    };
    Controller.prototype.createGrid = function () {
        if (this.attI18N) {
            this.triggerI18N();
        }
        this.htmlHeightWidth.addDefaultsAttributes(this.attHeaderHeight, this.attRowHeight, this.attFooterHeight, this.attPanelHeight);
        this.mainMarkup.generateMainMarkup();
        this.htmlCache.updateMainMarkup();
        this.rowDataBinder.init();
        this.mainScrollEvents.init();
        this.rowMarkup.init(this.attRowHeight);
        this.htmlCache.updateRowsMarkup();
        this.rowScrollEvents.init(this.attRowHeight, this.attDataDelay);
        this.columnMarkup.init(this.colConfig, this.overrideContext, this.colRepeater, this.colRepeatRowTemplate, this.colRepeatRowHeaderTemplate, this.colGroupRow);
        this.htmlHeightWidth.setWidthFromColumnConfig(this.colConfig);
        this.rowClickHandler.init(this.attMultiSelect, this.attManualSelection, this);
        this.groupingElements.init(this, this.colGroupElement);
        this.loadingScreen.init(this.overrideContext, this.loadingScreenTemplate);
        this.footer.init(this.overrideContext, this.footerTemplate);
        this.contextMenu.init(this.customMenuTemplates, this.overrideContext);
    };
    Controller.prototype.getElement = function (rowNumber, isDownScroll, callbackFN) {
        var _this = this;
        this.attGridConnector.getElement({
            row: rowNumber,
            isDown: isDownScroll,
            callback: function (rowContext) {
                if (_this.attOnRowDraw) {
                    _this.attOnRowDraw(rowContext);
                }
                callbackFN(rowContext);
            }
        });
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
        var totalRowHeight = this.htmlHeightWidth.getNewHeight(this.attGridConnector.getDatasourceLength());
        var bodyHeight = this.htmlCache.avg_content_main.clientHeight;
        if (bodyHeight < totalRowHeight) {
            this.htmlCache.avg_content_vhandle.style.display = 'block';
        }
        else {
            this.htmlCache.avg_content_vhandle.style.display = 'none';
        }
        this.rowScrollEvents.setCollectionLength(this.attGridConnector.getDatasourceLength());
        this.htmlHeightWidth.setCollectionLength(this.attGridConnector.getDatasourceLength(), bodyHeight < totalRowHeight);
    };
    Controller.prototype.udateHorizontalScroller = function () {
        var bodyWidth = this.htmlCache.avg_content_main.clientWidth;
        var scrollWidth = this.htmlHeightWidth.avgContentMainScroll_Width;
        if (bodyWidth < scrollWidth) {
            this.htmlCache.avg_content_hhandle.style.display = 'block';
        }
        else {
            this.htmlCache.avg_content_hhandle.style.display = 'none';
        }
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
            position = this.htmlCache.avg_content_vhandle.scrollTop;
        }
        else {
            this.htmlCache.avg_content_vhandle.scrollTop = position;
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
    Controller.prototype.getColumnConfig = function () {
        var colContext = this.columnBindingContext;
        var tempArray = [];
        for (var i = 0; i < this.colConfig.length; i++) {
            switch (true) {
                case colContext.setupleft[i].show:
                    tempArray.push({
                        no: i,
                        set: 1,
                        colPinLeft: true,
                        colPinRight: false,
                        left: colContext.setupleft[i].left - 10000,
                        width: colContext.setupleft[i].width
                    });
                    break;
                case colContext.setupmain[i].show:
                    tempArray.push({
                        no: i,
                        set: 2,
                        colPinLeft: false,
                        colPinRight: false,
                        left: colContext.setupmain[i].left,
                        width: colContext.setupmain[i].width
                    });
                    break;
                case colContext.setupright[i].show:
                    tempArray.push({
                        no: i,
                        set: 3,
                        colPinLeft: false,
                        colPinRight: true,
                        left: colContext.setupright[i].left + 10000,
                        width: colContext.setupright[i].width
                    });
                    break;
                default:
            }
        }
        var newColConfig = [];
        this.colConfig.forEach(function (col, i) {
            var temp = {
                colWidth: tempArray[i].width,
                colRowTemplate: col.colRowTemplate,
                colHeaderTemplate: col.colHeaderTemplate,
                colField: col.colField ? col.colField.replace('rowRef.', '') : col.colField,
                colPinLeft: tempArray[i].colPinLeft,
                colPinRight: tempArray[i].colPinRight,
                colHeaderName: col.colHeaderName,
                colAddLabelAttributes: col.colAddLabelAttributes,
                colAddFilterAttributes: col.colAddFilterAttributes,
                colAddRowAttributes: col.colAddRowAttributes,
                colSort: col.colSort,
                colFilter: col.colFilter,
                colFilterTop: col.colFilterTop,
                colCss: col.colCss,
                colType: col.colType,
                __colSortHelper: tempArray[i].left,
            };
            newColConfig.push(temp);
        });
        newColConfig.sort(function (a, b) {
            return a.__colSortHelper - b.__colSortHelper;
        });
        return newColConfig;
    };
    Controller.prototype.setColumnConfig = function (colConfig) {
        var length = this.columnBindingContext.setupgrouping;
        this.viewSlots.unbindAndDetachColumns();
        this.columnBindingContext.clear();
        this.viewSlots.clear();
        this.colConfig = colConfig || this.backupColConfig;
        this.columnMarkup.init(this.colConfig, this.overrideContext, this.colRepeater, this.colRepeatRowTemplate, this.colRepeatRowHeaderTemplate, this.colGroupRow);
        this.viewSlots.bindAndAttachColumns(this.overrideContext, this.columnBindingContext, this.attGridConnector.getSelection());
        this.htmlHeightWidth.setWidthFromColumnConfig(this.colConfig);
        this.columnBindingContext.setupgrouping = length;
        this.htmlHeightWidth.adjustWidthsColumns(this.columnBindingContext, length);
        this.udateHorizontalScroller();
        this.rebindAllRows();
    };
    return Controller;
}());
exports.Controller = Controller;

//# sourceMappingURL=controller.js.map
