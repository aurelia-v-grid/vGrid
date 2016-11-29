System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var Collection;
    return {
        setters: [],
        execute: function () {
            Collection = (function () {
                function Collection(datasource) {
                    this.datasource = datasource;
                    this.key = datasource.getKey();
                    this.entities = [];
                    this.keys = [];
                    this.count = 0;
                    this.length = 0;
                    this.ungroupedArray = [];
                }
                Collection.prototype.setData = function (array, ungroupedArray) {
                    var _this = this;
                    this.entities = [];
                    this.keys = [];
                    this.ungroupedArray = ungroupedArray || array;
                    this.length = array.length;
                    array.forEach(function (rowData) {
                        if (!rowData[_this.key]) {
                            _this.count++;
                            rowData[_this.key] = 'key' + _this.count;
                        }
                        if (!rowData.__group) {
                            _this.keys.push(rowData[_this.key]);
                        }
                        else {
                            _this.keys.push(null);
                        }
                        _this.entities.push(rowData);
                    });
                };
                Collection.prototype.getEntities = function () {
                    return this.ungroupedArray;
                };
                Collection.prototype.getCurrentEntities = function () {
                    return this.entities;
                };
                Collection.prototype.getRowKey = function (row) {
                    return this.keys[row];
                };
                Collection.prototype.getRowKeys = function () {
                    return this.keys;
                };
                Collection.prototype.getRow = function (row) {
                    return this.entities[row];
                };
                Collection.prototype.getRowFromEntity = function (entity) {
                    return this.entities.indexOf(entity);
                };
                return Collection;
            }());
            exports_1("Collection", Collection);
        }
    };
});

//# sourceMappingURL=collection.js.map
