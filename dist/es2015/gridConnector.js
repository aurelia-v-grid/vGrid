define(["require", "exports"], function (require, exports) {
    "use strict";
    var GridConnector = (function () {
        function GridConnector(datasource, selection, errorHandler) {
            this.controller = null;
            this.datasource = datasource;
            this.key = datasource.key;
            this.selection = datasource.selection;
            this.errorhandler = errorHandler || null;
        }
        GridConnector.prototype.gridCreated = function (controller) {
            this.controller = controller;
            this.eventID = this.datasource.addEventListener(this.eventHandler.bind(this));
            this.raiseEvent("sortIconUpdate");
            this.controller.updateHeights();
            this.controller.triggerScroll(0);
            this.controller.updateHeaderGrouping(this.datasource.getGrouping());
        };
        GridConnector.prototype.eventHandler = function (event) {
            switch (event) {
                case "collection_changed":
                case "collection_grouped":
                case "collection_collapsed_all":
                case "collection_expanded_all":
                    this.raiseEvent("sortIconUpdate");
                    this.controller.updateHeights();
                    this.controller.triggerScroll(0);
                    this.controller.updateHeaderGrouping(this.datasource.getGrouping());
                    this.controller.setLoadingScreen(false);
                    break;
                case "collection_collapsed":
                case "collection_expanded":
                    this.raiseEvent("sortIconUpdate");
                    this.controller.updateHeights();
                    this.controller.triggerScroll(null);
                    this.controller.updateHeaderGrouping(this.datasource.getGrouping());
                    this.controller.setLoadingScreen(false);
                    break;
                case "collection_sorted":
                    this.raiseEvent("sortIconUpdate");
                    this.controller.rebindAllRows();
                    this.controller.setLoadingScreen(false);
                    break;
                case "collection_filtered":
                    this.raiseEvent("sortIconUpdate");
                    this.controller.updateHeights();
                    this.controller.triggerScroll();
                    this.controller.setLoadingScreen(false);
                    break;
                default:
                    console.log("unknown event");
                    console.log(event);
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
            return event;
        };
        GridConnector.prototype.select = function (row) {
            this.datasource.select(row);
        };
        GridConnector.prototype.length = function () {
            return this.datasource.length();
        };
        GridConnector.prototype.getGrouping = function () {
            return this.datasource.getGrouping();
        };
        GridConnector.prototype.group = function (grouping, keepExpanded) {
            var _this = this;
            this.controller.setLoadingScreen(true, null, this.length()).then(function () {
                _this.datasource.group(grouping, keepExpanded);
            });
        };
        GridConnector.prototype.getElement = function (options) {
            var row = options.row;
            var isDown = options.isDown;
            var callback = options.callback;
            var rowContext = {
                row: row,
                selection: this.selection,
                rowRef: this.datasource.getElement(row)
            };
            callback(rowContext);
        };
        GridConnector.prototype.query = function (a) {
            var _this = this;
            this.controller.setLoadingScreen(true, null, this.length()).then(function () {
                _this.datasource.query(a);
            });
        };
        GridConnector.prototype.orderBy = function (attribute, addToCurrentSort) {
            var _this = this;
            this.controller.setLoadingScreen(true, null, this.length()).then(function () {
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
        GridConnector.prototype.getFilterOperatorName = function (operator) {
            return this.datasource.getFilterOperatorName(operator);
        };
        GridConnector.prototype.expandGroup = function (id) {
            var _this = this;
            this.controller.setLoadingScreen(true, null, this.length()).then(function () {
                _this.datasource.groupExpand(id);
            });
        };
        GridConnector.prototype.collapseGroup = function (id) {
            var _this = this;
            this.controller.setLoadingScreen(true, null, this.length()).then(function () {
                _this.datasource.groupCollapse(id);
            });
        };
        return GridConnector;
    }());
    exports.GridConnector = GridConnector;
});

//# sourceMappingURL=gridConnector.js.map
