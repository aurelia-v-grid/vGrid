/* */ 
define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var GridConnector = exports.GridConnector = function () {
        function GridConnector(datasource) {
            _classCallCheck(this, GridConnector);

            this.datasource = datasource;

            this.vGrid = {};
        }

        GridConnector.prototype.datasourceEvents = function datasourceEvents(event) {

            switch (event) {
                case "collectionChange":
                    this.vGrid.vGridGenerator.collectionChange(true);
                    break;
                case "collectionChange_newAdded":
                    this.vGrid.vGridGenerator.collectionChange(false, true);
                    break;
                case "collectionChange_update":
                case "collectionChange_oneRemoved":
                    this.vGrid.vGridGenerator.collectionChange(false);
                    break;
                case "selection_changed":
                    this.vGrid.vGridGenerator.updateSelectionOnAllRows();
                    break;
                default:
                    console.log("unknown event");
                    console.log(event);
            }
        };

        GridConnector.prototype.setDatasource = function setDatasource(datasource, errorHandler) {
            this.datasource = datasource;
            this.errorHandler = errorHandler || function (err) {};
            this.datasource.addEventListener(this.datasourceEvents.bind(this));
            this.vGrid.vGridGenerator.collectionChange(true);
        };

        GridConnector.prototype.length = function length() {
            var length = 0;
            if (this.datasource) {
                length = this.datasource.collection.length;
            }
            return length;
        };

        GridConnector.prototype.rowClick = function rowClick(e) {
            if (this.datasource) {
                this.datasource.select(e.row);
            }
        };

        GridConnector.prototype.getElement = function getElement(e) {
            var _this = this;

            if (this.datasource) {
                e.callback();

                if (this.datasource.collection.length > e.row && e.row >= 0) {
                    this.datasource.getElement(e.row).then(function (data) {
                        if (e.row === e.div.top / e.rowHeight) {
                            e.callback(data, e.row);
                        }
                    }).catch(function (err) {
                        e.callback();
                        _this.errorHandler("getElement", err);
                    });
                }
            } else {
                e.callback();
            }
        };

        GridConnector.prototype.filter = function filter(e) {
            var _this2 = this;

            e.activateLoadingScreen();
            var filter = this.createQueryString(e.filter);
            var sort = this.createOrderByString(e.sort);
            this.datasource.query(filter, {
                orderby: sort,
                releaseEntitySet: true }).then(function (data) {
                e.callback();
            }).catch(function (err) {
                e.callback();
                _this2.errorHandler("filter", err);
            });
        };

        GridConnector.prototype.sort = function sort(e) {
            var _this3 = this;

            e.activateLoadingScreen();

            var sort = this.createOrderByString(e.sort);
            this.datasource.orderby(sort, true).then(function (data) {
                e.callback();
            }).catch(function (err) {
                e.callback();
                _this3.errorHandler("sort", err);
            });
        };

        GridConnector.prototype.setValueToRow = function setValueToRow(attribute, value, row) {
            if (this.datasource) {
                this.datasource.collection.setValueToRow(attribute, value, row);
            }
        };

        GridConnector.prototype.isRowSelected = function isRowSelected(row) {
            var result = false;
            if (this.datasource) {
                result = this.datasource.selection.isRowSelected(row);
            }
            return result;
        };

        GridConnector.prototype.deSelectRow = function deSelectRow(row) {
            this.datasource.selection.deSelectRow(row);
        };

        GridConnector.prototype.addRowToSelection = function addRowToSelection(row, addToSelection) {
            this.datasource.selection.addRowToSelection(row, addToSelection);
        };

        GridConnector.prototype.setSelectionRange = function setSelectionRange(start, end) {
            this.datasource.selection.setSelectionRange(start, end);
        };

        GridConnector.prototype.getSelectedRows = function getSelectedRows() {
            return this.datasource.selection.getSelectedRows();
        };

        GridConnector.prototype.setSelectedRows = function setSelectedRows(newRows) {
            this.datasource.selection.setSelectedRows(newRows);
        };

        GridConnector.prototype.getSelectionMode = function getSelectionMode() {
            return "multiple";
        };

        GridConnector.prototype.createOrderByString = function createOrderByString(orderByArray) {
            var sortArray = [];
            if (orderByArray) {
                orderByArray.forEach(function (param) {
                    sortArray.push(param.attribute + " " + (param.asc ? "asc" : "desc"));
                });
                if (orderByArray.length === 0) {
                    return null;
                }
                return sortArray;
            } else {
                return null;
            }
        };

        GridConnector.prototype.createQueryString = function createQueryString(queryArray) {
            if (queryArray) {
                var queryString = '';
                queryArray.forEach(function (param, index) {
                    if (index === 0) {
                        queryString = '';
                    } else {
                        queryString = queryString + ' and ';
                    }
                    switch (param.operator) {
                        case "=":
                            queryString = queryString + (param.attribute + "=" + param.value);
                            break;
                        case "*":
                            queryString = queryString + (param.attribute + "=*" + param.value + "*");
                            break;
                        case "!=":
                            queryString = queryString + (param.attribute + "!=" + param.value);
                            break;
                        case "<":
                            queryString = queryString + ("" + param.attribute + param.operator + param.value);
                            break;
                        case ">":
                            queryString = queryString + ("" + param.attribute + param.operator + param.value);
                            break;
                        case "<=":
                            queryString = queryString + ("" + param.attribute + param.operator + param.value);
                            break;
                        case ">=":
                            queryString = queryString + ("" + param.attribute + param.operator + param.value);
                            break;
                        case "*=":
                            queryString = queryString + (param.attribute + "=" + param.value + "*");
                            break;
                        case "=*":
                            queryString = queryString + (param.attribute + "=*" + param.value);
                            break;
                        case "!*":
                            queryString = queryString + (param.attribute + "!=*" + param.value + "*");
                            break;
                    }
                });
                return queryString;
            } else {
                return null;
            }
        };

        return GridConnector;
    }();
});