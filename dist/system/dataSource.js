System.register(["./selection", "./collection", "./utils/arrayUtils"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var selection_1, collection_1, arrayUtils_1, DataSource;
    return {
        setters: [
            function (selection_1_1) {
                selection_1 = selection_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (arrayUtils_1_1) {
                arrayUtils_1 = arrayUtils_1_1;
            }
        ],
        execute: function () {
            DataSource = (function () {
                function DataSource(selection, config) {
                    this.selection = selection || new selection_1.Selection('single');
                    this.selectionEventID = this.selection.addEventListener(this.selectionEventCallback.bind(this));
                    this.selection.overrideGetRowKey(this.getRowKey.bind(this));
                    this.selection.overrideGetRowKeys(this.getRowKeys.bind(this));
                    this.arrayUtils = new arrayUtils_1.ArrayUtils();
                    this.key = null;
                    this.mainArray = null;
                    this.config = config;
                    if (this.config) {
                        this.key = config.key || '__avgKey';
                        this.rowHeight = config.rowHeight || 25;
                        this.groupHeight = config.groupHeight || 25;
                        this.rowHeightCallback = config.rowHeightCallback || function () { return null; };
                    }
                    else {
                        this.key = '__avgKey';
                        this.rowHeight = 25;
                        this.groupHeight = 25;
                        this.rowHeightCallback = function () { return null; };
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
                    var _this = this;
                    this.eventCallBacks.forEach(function (FN, i) {
                        if (FN !== null) {
                            var alive = FN(event);
                            if (!alive) {
                                _this.eventCallBacks[i] = null;
                            }
                        }
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
                    this.arrayUtils.resetSort(this.key);
                    this.entity = null;
                    this.collection.setData(array);
                    this.mainArray = this.collection.getEntities();
                    this.triggerEvent('collection_changed');
                };
                DataSource.prototype.push = function (array) {
                    if (Array.isArray(array)) {
                        var grouping = this.arrayUtils.getGrouping();
                        var collection = this.collection.getEntities();
                        collection = collection.concat(array);
                        this.collection.setData(collection);
                        this.mainArray = this.collection.getEntities();
                        this.arrayUtils.runOrderbyOn(this.collection.getEntities());
                        var untouchedgrouped = this.collection.getEntities();
                        if (grouping.length > 0) {
                            var groupedArray = this.arrayUtils.group(untouchedgrouped, grouping, true);
                            this.collection.setData(groupedArray, untouchedgrouped);
                        }
                        this.triggerEvent('collection_updated');
                    }
                };
                DataSource.prototype.refresh = function (data) {
                    if (data) {
                        this.collection = new collection_1.Collection(this);
                        this.collection.setData(data);
                        this.mainArray = this.collection.getEntities();
                        this.entity = null;
                    }
                    var grouping = this.arrayUtils.getGrouping();
                    this.arrayUtils.runOrderbyOn(this.collection.getEntities());
                    if (grouping.length > 0) {
                        var unGroupedArray = this.collection.getEntities();
                        var groupedArray = this.arrayUtils.group(unGroupedArray, grouping, true);
                        this.collection.setData(groupedArray, unGroupedArray);
                    }
                    this.triggerEvent('collection_updated');
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
                DataSource.prototype.updateRowData = function (attribute, data, rows) {
                    var entities = this.collection.getCurrentEntities();
                    rows.forEach(function (x) {
                        entities[x][attribute] = data;
                    });
                };
                DataSource.prototype.group = function (grouping, keepExpanded) {
                    var _this = this;
                    this.arrayUtils.resetSort();
                    grouping.forEach(function (group) {
                        _this.arrayUtils.setOrderBy(group.field, true);
                    });
                    this.arrayUtils.runOrderbyOn(this.collection.getEntities());
                    var ungroupedArray = this.collection.getEntities();
                    var groupedArray = this.arrayUtils.group(ungroupedArray, grouping, keepExpanded);
                    this.collection.setData(groupedArray, ungroupedArray);
                    this.triggerEvent('collection_grouped');
                };
                DataSource.prototype.groupCollapse = function (id) {
                    var groupedArray = this.arrayUtils.groupCollapse(id);
                    var ungroupedArray = this.collection.getEntities();
                    this.collection.setData(groupedArray, ungroupedArray);
                    if (id) {
                        this.triggerEvent('collection_collapsed');
                    }
                    else {
                        this.triggerEvent('collection_collapsed_all');
                    }
                };
                DataSource.prototype.groupExpand = function (id) {
                    var groupedArray = this.arrayUtils.groupExpand(id);
                    var ungroupedArray = this.collection.getEntities();
                    this.collection.setData(groupedArray, ungroupedArray);
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
                DataSource.prototype.addBlankRow = function () {
                    var newElement = {};
                    this.mainArray.unshift(newElement);
                    var collectionUngrouped = this.collection.getEntities();
                    var displayedCollection = this.collection.getCurrentEntities();
                    var index = collectionUngrouped.indexOf(newElement);
                    if (index === -1) {
                        collectionUngrouped.unshift(newElement);
                    }
                    displayedCollection.unshift(newElement);
                    this.collection.setData(displayedCollection, collectionUngrouped);
                    this.entity = newElement;
                    this.triggerEvent('collection_filtered');
                };
                DataSource.prototype.unshift = function (data) {
                    if (data) {
                        this.mainArray.unshift(data);
                        var displayedCollection = this.collection.getEntities();
                        var ungroupedCollection = this.collection.getCurrentEntities();
                        var index = displayedCollection.indexOf(data);
                        if (index === -1) {
                            displayedCollection.unshift(data);
                        }
                        ungroupedCollection.unshift(data);
                        this.collection.setData(ungroupedCollection, displayedCollection);
                        this.entity = data;
                        this.triggerEvent('collection_filtered');
                    }
                };
                DataSource.prototype.remove = function (rows) {
                    var _this = this;
                    var keysToDelete = new Set();
                    var returnArray = [];
                    if (Array.isArray(rows)) {
                        rows.forEach(function (row) {
                            keysToDelete.add(_this.getRowKey(row));
                        });
                    }
                    else {
                        if (this.entity && Number.isInteger(rows)) {
                            keysToDelete.add(this.getRowKey(rows));
                        }
                    }
                    if (keysToDelete.size > 0) {
                        var oldArray = this.collection.getEntities();
                        for (var i = 0; i < oldArray.length; i++) {
                            if (keysToDelete.has(oldArray[i][this.key]) === true) {
                                returnArray.push(oldArray.splice(i, 1)[0]);
                                i--;
                            }
                        }
                        this.collection.setData(oldArray);
                        this.refresh();
                    }
                    return returnArray;
                };
                DataSource.prototype.getCollectionStatus = function () {
                    var status = {
                        collectionLength: this.mainArray ? this.mainArray.length : 0,
                        filteredCollectionLength: this.collection.getEntities().length,
                        selectionLength: this.selection.getLength()
                    };
                    return status;
                };
                DataSource.prototype.setLocaleCompare = function (code, options) {
                    this.arrayUtils.setLocaleCompare(code, options);
                };
                DataSource.prototype.getRowHeightState = function () {
                    return this.collection.getRowHeightState();
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
                DataSource.prototype.selectionEventCallback = function (e) {
                    this.triggerEvent(e);
                    return true;
                };
                return DataSource;
            }());
            exports_1("DataSource", DataSource);
        }
    };
});
//# sourceMappingURL=dataSource.js.map