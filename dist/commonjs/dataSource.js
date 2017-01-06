var selection_1 = require("./selection");
var collection_1 = require("./collection");
var arrayUtils_1 = require("./utils/arrayUtils");
var DataSource = (function () {
    function DataSource(selection, config) {
        this.selection = selection || new selection_1.Selection('single');
        this.selection.overrideGetRowKey(this.getRowKey.bind(this));
        this.selection.overrideGetRowKeys(this.getRowKeys.bind(this));
        this.arrayUtils = new arrayUtils_1.ArrayUtils();
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
    DataSource.prototype.length = function () {
        return this.collection.length;
    };
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
        this.selection.reset();
        this.arrayUtils.resetGrouping();
        this.arrayUtils.resetSort();
        this.collection.setData(array);
        this.mainArray = this.collection.getEntities();
        this.triggerEvent('collection_changed');
    };
    DataSource.prototype.select = function (row) {
        this.entity = this.collection.getRow(row);
    };
    DataSource.prototype.query = function (options) {
        if (options) {
            var newArray = this.arrayUtils.query(this.mainArray, options);
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
        var result = this.arrayUtils.orderBy(collection, attribute, addToCurrentSort);
        this.collection.setData(result.fixed, result.full);
        this.triggerEvent('collection_sorted');
    };
    DataSource.prototype.getCurrentOrderBy = function () {
        return this.arrayUtils.getOrderBy();
    };
    DataSource.prototype.getCurrentFilter = function () {
        return this.arrayUtils.getCurrentFilter();
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
        this.arrayUtils.resetSort();
        grouping.forEach(function (groupName) {
            _this.arrayUtils.setOrderBy(groupName, true);
        });
        this.arrayUtils.runOrderbyOn(this.collection.getEntities());
        var untouchedgrouped = this.collection.getEntities();
        var groupedArray = this.arrayUtils.group(untouchedgrouped, grouping, keepExpanded);
        this.collection.setData(groupedArray, untouchedgrouped);
        this.triggerEvent('collection_grouped');
    };
    DataSource.prototype.groupCollapse = function (id) {
        var newArray = this.arrayUtils.groupCollapse(id);
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
        var newArray = this.arrayUtils.groupExpand(id);
        var oldArray = this.collection.getEntities();
        this.collection.setData(newArray, oldArray);
        if (id) {
            this.triggerEvent('collection_expanded');
        }
        else {
            this.triggerEvent('collection_expanded_all');
        }
    };
    DataSource.prototype.getGrouping = function () {
        return this.arrayUtils.getGrouping();
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
    DataSource.prototype.getRowKeys = function () {
        if (this.collection) {
            return this.collection.getRowKeys();
        }
        else {
            return [];
        }
    };
    return DataSource;
}());
exports.DataSource = DataSource;

//# sourceMappingURL=dataSource.js.map
