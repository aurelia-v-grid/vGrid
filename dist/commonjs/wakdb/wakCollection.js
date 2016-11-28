var wakEntity_1 = require("./wakEntity");
var WakCollection = (function () {
    function WakCollection(attributes, baseUrl) {
        this.baseUrl = baseUrl;
        this.attributes = attributes;
        this.setDefaults();
    }
    WakCollection.prototype.setDefaults = function () {
        this.rowno = [];
        this.keys = [];
        this.created = [];
        this.data = [];
        this.length = 0;
        this.pages = [];
        this.addToSet = [];
        this.currentPage = null;
        this.options = null;
        this.entityset = null;
        this.pagesFetching = [];
    };
    WakCollection.prototype.clearCache = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var unsaved = _this.getUnsaved();
            unsaved.forEach(function (unsavedEntity) {
                var index = _this.data.indexOf(unsavedEntity);
                _this.rowno.splice(index, 1);
                _this.created.splice(index, 1);
                _this.data.splice(index, 1);
                _this.keys.splice(index, 1);
                _this.length--;
            });
            _this.rowno = [];
            _this.keys = [];
            _this.created = [];
            _this.data = [];
            _this.pages = [];
            unsaved.forEach(function (unsavedEntity) {
                _this.rowno.push(_this.length);
                _this.created.push(new Date());
                _this.data.push(unsavedEntity);
                _this.keys.push(null);
                _this.length++;
            });
            resolve();
        });
    };
    WakCollection.prototype.getUnsaved = function () {
        var unsaved = [];
        this.data.forEach(function (entity) {
            if (entity.__isNew) {
                unsaved.push(entity);
            }
        });
        return unsaved;
    };
    WakCollection.prototype.replace = function (data) {
        var _this = this;
        data = data ? data : {};
        var unsaved = this.getUnsaved();
        this.setDefaults();
        this.length = data.__COUNT || 0;
        this.currentPage = data.__FIRST || 0;
        this.pages.push(data.__FIRST || 0);
        this.entityset = data.__ENTITYSET;
        this.entityModel = data.__entityModel;
        this.insertData(data);
        unsaved.forEach(function (unsavedEntity) {
            _this.rowno.push(_this.length);
            _this.created.push(new Date());
            _this.data.push(unsavedEntity);
            _this.keys.push(null);
            _this.length++;
        });
    };
    WakCollection.prototype.getRow = function (row) {
        var index;
        index = this.rowno.indexOf(row);
        var result = null;
        if (index !== -1) {
            result = this.data[index];
        }
        return result;
    };
    WakCollection.prototype.getKey = function (key) {
        this.getRow(key);
    };
    WakCollection.prototype.getRowFromKey = function (key) {
        var index = this.keys.indexOf(key);
        return this.rowno[index];
    };
    WakCollection.prototype.getRowFromEntity = function (entity) {
        var index = this.data.indexOf(entity);
        return this.rowno[index];
    };
    WakCollection.prototype.getModified = function () {
        var modified = [];
        this.data.forEach(function (row) {
            if (row.__isModified) {
                modified.push(row);
            }
        });
        return modified;
    };
    WakCollection.prototype.addRow = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.rowno.push(_this.length);
            _this.created.push(new Date());
            _this.data.push(new wakEntity_1.WakEntity({
                __isNew: true
            }, _this.attributes, _this.baseUrl));
            _this.keys.push(null);
            var ent = _this.data[_this.length];
            _this.length++;
            resolve(ent);
        });
    };
    WakCollection.prototype.removeUnsavedRow = function (row) {
        var _this = this;
        var index = this.rowno.indexOf(row);
        this.rowno.splice(index, 1);
        this.created.splice(index, 1);
        this.data.splice(index, 1);
        this.keys.splice(index, 1);
        this.rowno.forEach(function (rowNo, index) {
            if (rowNo > row) {
                _this.rowno[index] = _this.rowno[index] - 1;
            }
        });
        this.length--;
    };
    WakCollection.prototype.getClosestPage = function (row, pageSize) {
        var page = Math.floor(row / pageSize);
        return page * pageSize;
    };
    WakCollection.prototype.add = function (data) {
        var index = this.pages.indexOf(data.__FIRST);
        if (index === -1) {
            this.pages.push(data.__FIRST);
        }
        this.insertData(data);
    };
    WakCollection.prototype.setValueToRow = function (attribute, value, row) {
        var index = this.rowno.indexOf(row);
        if (index !== -1) {
            this.data[index][attribute] = value;
        }
    };
    WakCollection.prototype.insertData = function (data) {
        var _this = this;
        var unsaved = this.getUnsaved();
        unsaved.forEach(function (unsavedEntity) {
            var index = _this.data.indexOf(unsavedEntity);
            _this.rowno.splice(index, 1);
            _this.created.splice(index, 1);
            _this.data.splice(index, 1);
            _this.keys.splice(index, 1);
            _this.length--;
        });
        this.currentPage = data.__FIRST;
        var count = -1;
        for (var i = data.__FIRST; i < data.__FIRST + data.__SENT; i++) {
            count++;
            var index = this.rowno.indexOf(i);
            if (index === -1) {
                this.rowno.push(i);
                this.created.push(new Date());
                this.data.push(new wakEntity_1.WakEntity(data.__ENTITIES[count], this.attributes, this.baseUrl));
                this.keys.push(data.__ENTITIES[count].__KEY);
            }
            else {
                this.rowno[index] = i;
                this.created[index] = new Date();
                this.data[index] = new wakEntity_1.WakEntity(data.__ENTITIES[count], this.attributes, this.baseUrl);
                this.keys[index] = data.__ENTITIES[count].__KEY;
            }
        }
        unsaved.forEach(function (unsavedEntity) {
            _this.rowno.push(_this.length);
            _this.created.push(new Date());
            _this.data.push(unsavedEntity);
            _this.keys.push(null);
            _this.length++;
        });
    };
    return WakCollection;
}());
exports.WakCollection = WakCollection;

//# sourceMappingURL=wakCollection.js.map
