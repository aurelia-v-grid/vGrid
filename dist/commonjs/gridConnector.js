var GridConnector = (function () {
    function GridConnector(datasource, selection, errorHandler) {
        this.controller = null;
        this.datasource = datasource;
        this.key = datasource.getKey();
        this.selection = selection || datasource.getSelection();
        this.errorhandler = errorHandler || null;
    }
    GridConnector.prototype.getSelection = function () {
        return this.selection;
    };
    GridConnector.prototype.connect = function (controller, create) {
        this.controller = controller;
        this.eventID = this.datasource.addEventListener(this.eventHandler.bind(this));
        create();
    };
    GridConnector.prototype.gridCreated = function () {
        this.raiseEvent('sortIconUpdate');
        this.controller.updateHeights();
        this.controller.triggerScroll(0);
        this.controller.updateHeaderGrouping(this.datasource.getGrouping());
    };
    GridConnector.prototype.select = function (row) {
        this.datasource.select(row);
    };
    GridConnector.prototype.getDatasourceLength = function () {
        return this.datasource.length();
    };
    GridConnector.prototype.getColConfig = function () {
        return this.controller.getColumnConfig();
    };
    GridConnector.prototype.setColConfig = function (colconfig) {
        this.controller.setColumnConfig(colconfig);
    };
    GridConnector.prototype.getGrouping = function () {
        return this.datasource.getGrouping();
    };
    GridConnector.prototype.group = function (grouping, keepExpanded) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.group(grouping, keepExpanded);
        });
    };
    GridConnector.prototype.getElement = function (options) {
        var rowData = this.datasource.getElement(options.row);
        var rowContext = {
            row: options.row,
            selection: this.selection,
            rowRef: rowData,
            tempRef: this.getRowProperties(rowData)
        };
        options.callback(rowContext);
    };
    GridConnector.prototype.query = function (a) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.query(a);
        });
    };
    GridConnector.prototype.orderBy = function (attribute, addToCurrentSort) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.orderBy(attribute, addToCurrentSort);
        });
    };
    GridConnector.prototype.destroy = function () {
        this.datasource.removeEventListener(this.eventID);
    };
    GridConnector.prototype.getCurrentOrderBy = function () {
        return this.datasource.getCurrentOrderBy();
    };
    GridConnector.prototype.getCurrentFilter = function () {
        return this.datasource.getCurrentFilter();
    };
    GridConnector.prototype.expandGroup = function (id) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.groupExpand(id);
        });
    };
    GridConnector.prototype.collapseGroup = function (id) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.groupCollapse(id);
        });
    };
    GridConnector.prototype.triggerI18n = function () {
        this.controller.triggerI18N();
    };
    GridConnector.prototype.eventHandler = function (event) {
        switch (event) {
            case 'collection_changed':
            case 'collection_grouped':
            case 'collection_collapsed_all':
            case 'collection_expanded_all':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.triggerScroll(0);
                this.controller.updateHeaderGrouping(this.datasource.getGrouping());
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_collapsed':
            case 'collection_expanded':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.triggerScroll(null);
                this.controller.updateHeaderGrouping(this.datasource.getGrouping());
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_sorted':
                this.raiseEvent('sortIconUpdate');
                this.controller.rebindAllRows();
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_filtered':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.triggerScroll(null);
                this.controller.setLoadingScreen(false);
                break;
            default:
                console.warn('unknown event');
                console.warn(event);
        }
    };
    GridConnector.prototype.raiseEvent = function (name, data) {
        if (data === void 0) { data = {}; }
        var event = new CustomEvent(name, {
            detail: data,
            bubbles: true
        });
        if (this.controller) {
            this.controller.element.dispatchEvent(event);
        }
    };
    GridConnector.prototype.getRowProperties = function (obj) {
        var x = {};
        if (obj) {
            var k = void 0;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    if (x[k] !== obj[k]) {
                        x[k] = obj[k];
                    }
                }
            }
        }
        return x;
    };
    return GridConnector;
}());
exports.GridConnector = GridConnector;

//# sourceMappingURL=gridConnector.js.map
