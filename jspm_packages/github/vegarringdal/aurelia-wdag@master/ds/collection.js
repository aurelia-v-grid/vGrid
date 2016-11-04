/* */ 
define(['exports', './entity'], function (exports, _entity) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Collection = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Collection = exports.Collection = function () {
        function Collection(attributes) {
            _classCallCheck(this, Collection);

            this.attributes = attributes;
            this.setDefaults();
        }

        Collection.prototype.setDefaults = function setDefaults() {
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

        Collection.prototype.clearCache = function clearCache() {
            var _this = this;

            return new Promise(function (resolve, reject) {
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

        Collection.prototype.getUnsaved = function getUnsaved() {
            var unsaved = [];
            this.data.forEach(function (entity) {
                if (entity.__isNew) {
                    unsaved.push(entity);
                }
            });
            return unsaved;
        };

        Collection.prototype.replace = function replace(data) {
            var _this2 = this;

            data = data ? data : {};
            var unsaved = this.getUnsaved();
            this.setDefaults();
            this.length = data.__COUNT || 0;
            this.currentPage = data.__FIRST || 0;
            this.pages.push(data.__FIRST || 0);
            this.entityset = data.__ENTITYSET;
            this.entityModel = data.____entityModel;
            this.insertData(data);
            unsaved.forEach(function (unsavedEntity) {
                _this2.rowno.push(_this2.length);
                _this2.created.push(new Date());
                _this2.data.push(unsavedEntity);
                _this2.keys.push(null);
                _this2.length++;
            });
        };

        Collection.prototype.getRow = function getRow(row) {
            var index = void 0;
            index = this.rowno.indexOf(row);
            var result = null;
            if (index !== -1) {
                result = this.data[index];
            }
            return result;
        };

        Collection.prototype.getKey = function getKey(key) {
            this.getRow(key);
        };

        Collection.prototype.getRowFromKey = function getRowFromKey(key) {
            var index = this.keys.indexOf(key);
            return this.rowno[index];
        };

        Collection.prototype.getRowFromEntity = function getRowFromEntity(entity) {
            var index = this.data.indexOf(entity);
            return this.rowno[index];
        };

        Collection.prototype.getModified = function getModified() {
            var modified = [];
            this.data.forEach(function (row) {
                if (row.__isModified) {
                    modified.push(row);
                }
            });
            return modified;
        };

        Collection.prototype.addRow = function addRow() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3.rowno.push(_this3.length);
                _this3.created.push(new Date());
                _this3.data.push(new _entity.Entity({
                    __isNew: true
                }, _this3.attributes));
                _this3.keys.push(null);
                var ent = _this3.data[_this3.length];
                _this3.length++;
                resolve(ent);
            });
        };

        Collection.prototype.removeUnsavedRow = function removeUnsavedRow(row) {
            var _this4 = this;

            var index = this.rowno.indexOf(row);
            this.rowno.splice(index, 1);
            this.created.splice(index, 1);
            this.data.splice(index, 1);
            this.keys.splice(index, 1);
            this.rowno.forEach(function (rowNo, index) {
                if (rowNo > row) {
                    _this4.rowno[index] = _this4.rowno[index] - 1;
                }
            });
            this.length--;
        };

        Collection.prototype.getClosestPage = function getClosestPage(row, pageSize) {
            var page = Math.floor(row / pageSize);
            return page * pageSize;
        };

        Collection.prototype.add = function add(data) {
            var index = this.pages.indexOf(data.__FIRST);
            if (index === -1) {
                this.pages.push(data.__FIRST);
            }
            this.insertData(data);
        };

        Collection.prototype.setValueToRow = function setValueToRow(attribute, value, row) {
            var index = this.rowno.indexOf(row);
            if (index !== -1) {
                this.data[index][attribute] = value;
            }
        };

        Collection.prototype.insertData = function insertData(data) {
            var _this5 = this;

            var unsaved = this.getUnsaved();
            unsaved.forEach(function (unsavedEntity) {
                var index = _this5.data.indexOf(unsavedEntity);
                _this5.rowno.splice(index, 1);
                _this5.created.splice(index, 1);
                _this5.data.splice(index, 1);
                _this5.keys.splice(index, 1);
                _this5.length--;
            });

            this.currentPage = data.__FIRST;
            var count = -1;
            for (var i = data.__FIRST; i < data.__FIRST + data.__SENT; i++) {
                count++;
                var index = this.rowno.indexOf(i);
                if (index === -1) {
                    this.rowno.push(i);
                    this.created.push(new Date());
                    this.data.push(new _entity.Entity(data.__ENTITIES[count], this.attributes));
                    this.keys.push(data.__ENTITIES[count].__KEY);
                } else {
                    this.rowno[index] = i;
                    this.created[index] = new Date();
                    this.data[index] = new _entity.Entity(data.__ENTITIES[count], this.attributes);
                    this.keys[index] = data.__ENTITIES[count].__KEY;
                }
            }
            unsaved.forEach(function (unsavedEntity) {
                _this5.rowno.push(_this5.length);
                _this5.created.push(new Date());
                _this5.data.push(unsavedEntity);
                _this5.keys.push(null);
                _this5.length++;
            });
        };

        return Collection;
    }();
});