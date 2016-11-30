var WakGridConnector = (function () {
    function WakGridConnector(datasource) {
        this.lastSort = [];
        this.curSort = [];
        this.lastFilter = [];
        this.datasource = datasource;
    }
    WakGridConnector.prototype.getSelection = function () {
        return this.datasource.selection;
    };
    WakGridConnector.prototype.getCurrentOrderBy = function () {
        return this.curSort;
    };
    WakGridConnector.prototype.getCurrentFilter = function () {
        return this.lastFilter;
    };
    WakGridConnector.prototype.expandGroup = function (id) {
        console.warn('not usable in wak datasource');
        id = null;
    };
    WakGridConnector.prototype.collapseGroup = function (id) {
        console.warn('not usable in wak datasource');
        id = null;
    };
    WakGridConnector.prototype.getDatasourceLength = function () {
        if (this.datasource) {
            return this.datasource.collection.length;
        }
        else {
            return 0;
        }
    };
    WakGridConnector.prototype.connect = function (controller, create) {
        this.controller = controller;
        this.createGrid = create;
        if (this.datasource) {
            this.createGrid();
        }
    };
    WakGridConnector.prototype.gridCreated = function () {
        if (this.datasource) {
            this.controller.updateHeights();
            this.controller.triggerScroll(0);
            this.eventHandler('collectionChange');
        }
    };
    WakGridConnector.prototype.setDatasource = function (datasource, errorHandler, setHeight, setSort) {
        setHeight = null;
        setSort = null;
        this.datasource = datasource;
        var alt = function () { };
        this.errorHandler = errorHandler || alt;
        this.eventListenerID = this.datasource.addEventListener(this.eventHandler.bind(this));
        if (this.createGrid) {
            this.createGrid();
        }
    };
    WakGridConnector.prototype.destroy = function () {
        this.datasource.removeEventListener(this.eventListenerID);
    };
    WakGridConnector.prototype.getColConfig = function () {
        return this.controller.getColumnConfig();
    };
    WakGridConnector.prototype.setColConfig = function (colconfig) {
        this.controller.setColumnConfig(colconfig);
    };
    WakGridConnector.prototype.getGrouping = function () {
        return [];
    };
    WakGridConnector.prototype.group = function (grouping, keepExpanded) {
        console.warn('not usable in wak datasource');
        grouping = null;
        keepExpanded = false;
    };
    WakGridConnector.prototype.select = function (row) {
        if (this.datasource) {
            this.datasource.select(row);
        }
    };
    WakGridConnector.prototype.getElement = function (options) {
        var _this = this;
        var rowContext = {
            row: options.row,
            selection: this.datasource.selection,
            rowRef: {},
            tempRef: {}
        };
        if (this.datasource) {
            if (this.datasource.collection.length > options.row && options.row >= 0) {
                options.callback(rowContext);
                this.datasource.getElement(options.row)
                    .then(function (data) {
                    rowContext.tempRef = _this.getRowProperties(data);
                    rowContext.rowRef = data;
                    options.callback(rowContext);
                }).catch(function (err) {
                    options.callback();
                    _this.errorHandler('getElement', err);
                });
            }
            else {
                rowContext.rowRef = null;
                options.callback(rowContext);
            }
        }
        else {
            options.callback(rowContext);
        }
    };
    WakGridConnector.prototype.query = function (filterObj) {
        var _this = this;
        this.lastFilter = filterObj;
        this.controller.setLoadingScreen(true, 'Running query, please wait', 100000).then(function () {
            var filter = _this.createQueryString(_this.lastFilter);
            var sort = _this.createOrderByString(_this.lastSort);
            _this.datasource.query(filter, {
                orderby: sort,
                releaseEntitySet: true
            })
                .then(function () {
            }).catch(function (err) {
                _this.errorHandler('filter', err);
            });
        });
    };
    WakGridConnector.prototype.orderBy = function (attribute, addToCurrentSort) {
        var _this = this;
        this.setOrderBy(attribute, addToCurrentSort);
        this.controller.setLoadingScreen(true, 'Running sort, please wait', 100000).then(function () {
            var sort = _this.createOrderByString(_this.lastSort);
            _this.datasource.orderby(sort, true)
                .then(function () {
            }).catch(function (err) {
                _this.errorHandler('sort', err);
            });
        });
    };
    WakGridConnector.prototype.setValueToRow = function (attribute, value, row) {
        if (this.datasource) {
            this.datasource.collection.setValueToRow(attribute, value, row);
        }
    };
    WakGridConnector.prototype.eventHandler = function (event) {
        var _this = this;
        switch (event) {
            case 'collectionChange':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.triggerScroll(0);
                this.controller.rebindAllRows();
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
                this.controller.triggerScroll(0);
                this.controller.setLoadingScreen(false);
                break;
            case 'collectionChange_update':
                this.raiseEvent('sortIconUpdate');
                this.controller.rebindAllRows();
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_update':
                this.controller.updateHeights();
                this.controller.rebindAllRows();
                this.controller.setLoadingScreen(false);
                break;
            case 'collectionChange_oneRemoved':
                this.controller.updateHeights();
                this.controller.rebindAllRows();
                this.controller.setLoadingScreen(false);
                break;
            case 'collectionChange_newAdded':
                this.controller.updateHeights();
                setTimeout(function () {
                    _this.controller.triggerScroll(1000000000);
                    _this.controller.rebindAllRows();
                });
                this.controller.setLoadingScreen(false);
                break;
            default:
                console.warn('unknown event');
                console.warn(event);
        }
    };
    WakGridConnector.prototype.raiseEvent = function (name, data) {
        if (data === void 0) { data = {}; }
        var event = new CustomEvent(name, {
            detail: data,
            bubbles: true
        });
        if (this.controller) {
            this.controller.element.dispatchEvent(event);
        }
    };
    WakGridConnector.prototype.getRowProperties = function (obj) {
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
    WakGridConnector.prototype.createOrderByString = function (orderByArray) {
        var sortArray = [];
        if (orderByArray) {
            orderByArray.forEach(function (param) {
                sortArray.push(param.attribute + " " + (param.asc ? 'asc' : 'desc'));
            });
            if (orderByArray.length === 0) {
                return null;
            }
            return sortArray;
        }
        else {
            return null;
        }
    };
    WakGridConnector.prototype.createQueryString = function (queryArray) {
        if (queryArray) {
            var queryString_1 = '';
            queryArray.forEach(function (param, index) {
                if (index === 0) {
                    queryString_1 = '';
                }
                else {
                    queryString_1 = queryString_1 + ' and ';
                }
                switch (param.operator) {
                    case '=':
                        queryString_1 = queryString_1 + (param.attribute + "=" + param.value);
                        break;
                    case '*':
                        queryString_1 = queryString_1 + (param.attribute + "=*" + param.value + "*");
                        break;
                    case '!=':
                        queryString_1 = queryString_1 + (param.attribute + "!=" + param.value);
                        break;
                    case '<':
                        queryString_1 = queryString_1 + ("" + param.attribute + param.operator + param.value);
                        break;
                    case '>':
                        queryString_1 = queryString_1 + ("" + param.attribute + param.operator + param.value);
                        break;
                    case '<=':
                        queryString_1 = queryString_1 + ("" + param.attribute + param.operator + param.value);
                        break;
                    case '>=':
                        queryString_1 = queryString_1 + ("" + param.attribute + param.operator + param.value);
                        break;
                    case '*=':
                        queryString_1 = queryString_1 + (param.attribute + "=" + param.value + "*");
                        break;
                    case '=*':
                        queryString_1 = queryString_1 + (param.attribute + "=*" + param.value);
                        break;
                    case '!*':
                        queryString_1 = queryString_1 + (param.attribute + "!=*" + param.value + "*");
                        break;
                    default:
                }
            });
            return queryString_1;
        }
        else {
            return null;
        }
    };
    WakGridConnector.prototype.setOrderBy = function (param, add) {
        var sort;
        var useSetValue = false;
        if (param.asc === undefined) {
            sort = {
                attribute: param,
                asc: true
            };
        }
        else {
            sort = {
                attribute: param.attribute,
                asc: param.asc
            };
            useSetValue = true;
        }
        if (add && this.lastSort.length > 0) {
            this.curSort = this.lastSort;
            var exist_1 = false;
            this.curSort.forEach(function (x) {
                if (!useSetValue) {
                    if (x.attribute === sort.attribute) {
                        exist_1 = true;
                        x.asc = x.asc === true ? false : true;
                    }
                }
            });
            if (!exist_1) {
                this.curSort.push(sort);
                this.curSort[this.curSort.length - 1].no = this.curSort.length;
            }
            this.lastSort = this.curSort;
        }
        else {
            this.curSort = [sort];
            this.curSort[0].no = 1;
            if (this.lastSort[0]) {
                if (this.lastSort[0].attribute === this.curSort[0].attribute) {
                    if (this.lastSort[0].asc === this.curSort[0].asc) {
                        if (!useSetValue) {
                            this.curSort[0].asc = this.curSort[0].asc === true ? false : true;
                        }
                    }
                }
            }
            this.lastSort = this.curSort;
        }
    };
    return WakGridConnector;
}());
exports.WakGridConnector = WakGridConnector;

//# sourceMappingURL=wakGridConnector.js.map
