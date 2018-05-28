define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var Collection = (function () {
        function Collection(datasource) {
            this.key = datasource.getKey();
            this.rowHeight = datasource.rowHeight || 25;
            this.groupHeight = datasource.groupHeight || 25;
            this.rowHeightCallback = datasource.rowHeightCallback;
            this.displayedEntities = [];
            this.keys = [];
            this.count = 0;
            this.length = 0;
            this.ungroupedArray = [];
            this.rowHeightArray = [];
            this.rowTopArray = [];
            this.rowHeightTotal = 0;
        }
        Collection.prototype.setData = function (array, ungroupedArray) {
            var _this = this;
            this.displayedEntities = [];
            this.keys = [];
            this.rowHeightArray = [];
            this.rowHeightTotal = 0;
            this.rowTopArray = [];
            this.ungroupedArray = ungroupedArray || array;
            this.length = array.length;
            array.forEach(function (rowData) {
                if (!rowData[_this.key]) {
                    _this.count++;
                    rowData[_this.key] = _this.count;
                }
                if (!rowData.__group) {
                    var rowHeight = _this.rowHeightCallback(rowData) || _this.rowHeight;
                    _this.rowHeightArray.push(rowHeight);
                    _this.rowTopArray.push(_this.rowHeightTotal);
                    _this.rowHeightTotal = _this.rowHeightTotal + rowHeight;
                    _this.keys.push(rowData[_this.key]);
                }
                else {
                    _this.rowHeightArray.push(_this.groupHeight);
                    _this.rowTopArray.push(_this.rowHeightTotal);
                    _this.rowHeightTotal = _this.rowHeightTotal + _this.groupHeight;
                    _this.keys.push(null);
                }
                _this.displayedEntities.push(rowData);
            });
        };
        Collection.prototype.getRowHeightState = function () {
            return {
                total: this.rowHeightTotal,
                rows: this.rowHeightArray,
                top: this.rowTopArray
            };
        };
        Collection.prototype.getEntities = function () {
            return this.ungroupedArray;
        };
        Collection.prototype.getCurrentEntities = function () {
            return this.displayedEntities;
        };
        Collection.prototype.getRowKey = function (row) {
            return this.keys[row];
        };
        Collection.prototype.getRowKeys = function () {
            return this.keys;
        };
        Collection.prototype.getRow = function (row) {
            return this.displayedEntities[row];
        };
        Collection.prototype.getRowFromEntity = function (entity) {
            return this.displayedEntities.indexOf(entity);
        };
        return Collection;
    }());
    exports.Collection = Collection;
});
//# sourceMappingURL=collection.js.map