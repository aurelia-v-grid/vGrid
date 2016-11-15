define(["require", "exports", "./selection", "./collection", "./utils/arrayHelper"], function (require, exports, selection_1, collection_1, arrayHelper_1) {
    var DataSource = (function () {
        function DataSource(selection, config) {
            this.selection = selection || new selection_1.Selection('single');
            this.selection.overrideGetRowKey(this.getRowKey.bind(this));
            this.selection.overrideGetRowFromKey(this.getRowFromKey.bind(this));
            this.arrayHelper = new arrayHelper_1.ArrayHelper();
            this.key = null;
            this.mainArray = null;
            this.config = config;
            if (config) {
                this.key = config.key || '__avgKey';
            }
            else {
                this.key = '__avgKey';
            }
            this.eventIdCount = -1;
            this.eventCallBacks = [];
            this.entity = null;
            this.collection = new collection_1.Collection(this);
        }
        DataSource.prototype.getSelection = function () {
            return this.selection;
        };
        DataSource.prototype.getKey = function () {
            return this.key;
        };
        Object.defineProperty(DataSource.prototype, "length", {
            get: function () {
                return this.collection.length;
            },
            enumerable: true,
            configurable: true
        });
        DataSource.prototype.triggerEvent = function (event) {
            this.eventCallBacks.forEach(function (FN) {
                FN(event);
            });
        };
        DataSource.prototype.addEventListener = function (callback) {
            this.eventIdCount++;
            this.eventCallBacks.push(callback);
            return this.eventIdCount;
        };
        DataSource.prototype.removeEventListener = function (id) {
            this.eventCallBacks.splice(id, 1);
        };
        DataSource.prototype.setArray = function (array) {
            this.collection = new collection_1.Collection(this);
            this.collection.setData(array);
            this.mainArray = this.collection.getEntities();
            this.triggerEvent('collection_changed');
        };
        DataSource.prototype.select = function (row) {
            this.entity = this.collection.getRow(row);
        };
        DataSource.prototype.query = function (options) {
            if (options) {
                var newArray = this.arrayHelper.query(this.mainArray, options);
                this.collection.setData(newArray);
            }
            else {
                this.collection.setData(this.mainArray);
            }
            this.orderBy(null, true);
            this.triggerEvent('collection_filtered');
        };
        DataSource.prototype.orderBy = function (attribute, addToCurrentSort) {
            var collection = this.collection.getEntities();
            var result = this.arrayHelper.orderBy(collection, attribute, addToCurrentSort);
            this.collection.setData(result.fixed, result.full);
            this.triggerEvent('collection_sorted');
        };
        DataSource.prototype.getCurrentOrderBy = function () {
            return this.arrayHelper.getOrderBy();
        };
        DataSource.prototype.getCurrentFilter = function () {
            return this.arrayHelper.getCurrentFilter();
        };
        DataSource.prototype.getElement = function (row) {
            if (row === undefined || row === null) {
                throw new Error('row missing');
            }
            else {
                return this.collection.getRow(row);
            }
        };
        DataSource.prototype.group = function (grouping, keepExpanded) {
            var _this = this;
            this.arrayHelper.resetSort();
            grouping.forEach(function (groupName) {
                _this.arrayHelper.setOrderBy(groupName, true);
            });
            this.arrayHelper.runOrderbyOn(this.collection.getEntities());
            var untouchedgrouped = this.collection.getEntities();
            var groupedArray = this.arrayHelper.group(untouchedgrouped, grouping, keepExpanded);
            this.collection.setData(groupedArray, untouchedgrouped);
            this.triggerEvent('collection_grouped');
        };
        DataSource.prototype.groupCollapse = function (id) {
            var newArray = this.arrayHelper.groupCollapse(id);
            var oldArray = this.collection.getEntities();
            this.collection.setData(newArray, oldArray);
            if (id) {
                this.triggerEvent('collection_collapsed');
            }
            else {
                this.triggerEvent('collection_collapsed_all');
            }
        };
        DataSource.prototype.groupExpand = function (id) {
            var newArray = this.arrayHelper.groupExpand(id);
            var oldArray = this.collection.getEntities();
            this.collection.setData(newArray, oldArray);
            if (id) {
                this.triggerEvent('collection_expanded');
            }
            else {
                this.triggerEvent('collection_expanded_all');
            }
        };
        DataSource.prototype.getFilterOperatorName = function (operator) {
            return this.arrayHelper.getFilterOperatorName(operator);
        };
        DataSource.prototype.getGrouping = function () {
            return this.arrayHelper.getGrouping();
        };
        DataSource.prototype.addElement = function (data) {
            if (data) {
            }
            else {
                var newElement = {};
                this.mainArray.unshift(newElement);
                var oldArray = this.collection.getEntities();
                var oldMaybeGroupedArray = this.collection.getCurrentEntities();
                var index = oldArray.indexOf(newElement);
                if (index === -1) {
                    oldArray.unshift(newElement);
                }
                oldMaybeGroupedArray.unshift(newElement);
                this.collection.setData(oldMaybeGroupedArray, oldArray);
                this.triggerEvent('collection_filtered');
            }
        };
        DataSource.prototype.getRowKey = function (row) {
            if (this.collection) {
                return this.collection.getRowKey(row);
            }
            else {
                return null;
            }
        };
        DataSource.prototype.getRowFromKey = function (key) {
            if (this.collection) {
                return this.collection.getRowFromKey(key);
            }
            else {
                return -1;
            }
        };
        return DataSource;
    }());
    exports.DataSource = DataSource;
});

//# sourceMappingURL=dataSource.js.map
