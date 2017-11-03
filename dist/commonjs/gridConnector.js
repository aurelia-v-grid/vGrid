Object.defineProperty(exports, "__esModule", { value: true });
var GridConnector = (function () {
    function GridConnector(datasource, selection, errorHandler) {
        this.initTop = 0;
        this.controller = null;
        this.datasource = datasource;
        this.selection = selection || datasource.getSelection();
        this.errorhandler = errorHandler || this.errorhandler;
    }
    GridConnector.prototype.setInitTop = function (top) {
        this.initTop = top;
    };
    GridConnector.prototype.getSelection = function () {
        return this.selection;
    };
    GridConnector.prototype.connect = function (controller, create) {
        this.controller = controller;
        if (typeof this.datasource.addEventListener === 'function') {
            this.eventID = this.datasource.addEventListener(this.eventHandler.bind(this));
        }
        this.controller.element.style.visibility = 'hidden';
        create();
    };
    GridConnector.prototype.gridCreated = function () {
        var _this = this;
        this.raiseEvent('sortIconUpdate');
        this.controller.updateHeights();
        setTimeout(function () {
            _this.controller.updateHeaderGrouping(_this.datasource.getGrouping());
            _this.raiseEvent('sortIconUpdate');
            _this.raiseEvent('filterUpdateValues');
            _this.controller.triggerScroll(_this.initTop);
            setTimeout(function () {
                _this.controller.element.style.visibility = 'visible';
            }, 100);
        }, 0);
    };
    GridConnector.prototype.select = function (row) {
        if (typeof this.datasource.select === 'function') {
            this.datasource.select(row);
        }
    };
    GridConnector.prototype.getRowHeightState = function () {
        if (typeof this.datasource.getRowHeightState === 'function') {
            return this.datasource.getRowHeightState();
        }
        else {
            return null;
        }
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
        if (typeof this.datasource.getGrouping === 'function') {
            return this.datasource.getGrouping();
        }
        else {
            return [];
        }
    };
    GridConnector.prototype.group = function (grouping, keepExpanded) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            if (typeof _this.datasource.group === 'function') {
                _this.datasource.group(grouping, keepExpanded);
            }
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
            if (typeof _this.datasource.query === 'function') {
                _this.datasource.query(a);
            }
        });
    };
    GridConnector.prototype.orderBy = function (attribute, addToCurrentSort) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            if (typeof _this.datasource.orderBy === 'function') {
                _this.datasource.orderBy(attribute, addToCurrentSort);
            }
        });
    };
    GridConnector.prototype.destroy = function () {
        if (typeof this.datasource.removeEventListener === 'function') {
            this.datasource.removeEventListener(this.eventID);
        }
    };
    GridConnector.prototype.getCurrentOrderBy = function () {
        if (typeof this.datasource.getCurrentOrderBy === 'function') {
            return this.datasource.getCurrentOrderBy();
        }
        else {
            return [];
        }
    };
    GridConnector.prototype.updateRowData = function (attribute, data, rows) {
        if (typeof this.datasource.updateRowData === 'function') {
            this.datasource.updateRowData(attribute, data, rows);
        }
    };
    GridConnector.prototype.getCurrentFilter = function () {
        if (typeof this.datasource.getCurrentFilter === 'function') {
            return this.datasource.getCurrentFilter();
        }
        else {
            return [];
        }
    };
    GridConnector.prototype.expandGroup = function (id) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            if (typeof _this.datasource.groupExpand === 'function') {
                _this.datasource.groupExpand(id);
            }
        });
    };
    GridConnector.prototype.collapseGroup = function (id) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            if (typeof _this.datasource.groupCollapse === 'function') {
                _this.datasource.groupCollapse(id);
            }
        });
    };
    GridConnector.prototype.getTopRow = function () {
        return this.controller.getTopRow();
    };
    GridConnector.prototype.triggerI18n = function () {
        this.controller.triggerI18N();
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
    GridConnector.prototype.eventHandler = function (event) {
        switch (event) {
            case 'collection_changed':
            case 'collection_grouped':
            case 'collection_collapsed_all':
            case 'collection_expanded_all':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.udateHorizontalScroller();
                this.controller.triggerScroll(0);
                this.controller.updateHeaderGrouping(this.datasource.getGrouping());
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_collapsed':
            case 'collection_expanded':
            case 'collection_updated':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.udateHorizontalScroller();
                this.controller.triggerScroll(null);
                this.controller.updateHeaderGrouping(this.datasource.getGrouping());
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_sorted':
                this.raiseEvent('sortIconUpdate');
                this.controller.rebindAllRows();
                this.controller.triggerScroll(null);
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_filtered':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.triggerScroll(null);
                this.controller.setLoadingScreen(false);
                break;
            case 'selection_changed':
                break;
            default:
                console.warn('unknown event');
                console.warn(event);
        }
        return true;
    };
    GridConnector.prototype.getRowProperties = function (obj) {
        var x = {};
        if (obj) {
            for (var k in obj) {
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
