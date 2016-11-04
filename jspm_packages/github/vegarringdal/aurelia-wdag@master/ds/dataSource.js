/* */ 
define(['exports', './collection', './entity', './selection', './collectionMethod', './classMethod', './entityMethod'], function (exports, _collection, _entity, _selection, _collectionMethod, _classMethod, _entityMethod) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DataSource = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var DataSource = exports.DataSource = function () {
        function DataSource(restApi, sourceConfig) {
            _classCallCheck(this, DataSource);

            this.name = sourceConfig.dataClass;
            this.classname = sourceConfig.dataClass;
            this.filterAttributes = sourceConfig.filterAttributes;
            this.restApi = restApi;
            this.attributes = restApi.classes[this.classname].attributes;
            this.collectionName = restApi.classes[this.classname].collectionName;
            this.key = restApi.classes[this.classname].key;
            this.dataURI = restApi.classes[this.classname].dataURI;
            this.pageSize = sourceConfig.pageSize || restApi.pageSize;
            this.timeout = sourceConfig.timeout || restApi.timeout;
            this.savedQueryString = sourceConfig.initQuery || this.key + "=-1";
            this.multiSelect = sourceConfig.multiSelect;
            this.savedOrderby = sourceConfig.initOrderby || [this.key + " asc"];
            this.eventListener = [];
            this.eventListenerID = [];
            this.eventListenerCount = 0;

            this.requests = [];

            this.collection = new _collection.Collection(this.attributes);
            this.entity = null;
            this.selection = new _selection.Selection(this.multiSelect, this);

            this.methods = {};

            this.collectionMethods = {};
            var ecm = restApi.classes[this.classname].entityCollectionMethods;
            for (var k in ecm) {
                this.methods[k] = new _collectionMethod.CollectionMethod(this, k);
                this.collectionMethods[k] = this.methods[k].execute.bind(this.methods[k]);
            }

            this.entityMethods = {};
            var em = restApi.classes[this.classname].entityMethods;
            for (var k in em) {
                this.methods[k] = new _entityMethod.EntityMethod(this, k);
                this.entityMethods[k] = this.methods[k].execute.bind(this.methods[k]);
            }

            this.classMethods = {};
            var cm = restApi.classes[this.classname].dataClassMethods;
            for (var k in cm) {
                this.methods[k] = new _classMethod.ClassMethod(this, k);
                this.classMethods[k] = this.methods[k].execute.bind(this.methods[k]);
            }
        }

        DataSource.prototype.__queueRequest = function __queueRequest(callBack, atOnce) {
            var _this = this;

            if (atOnce) {
                (function () {
                    var run = _this.requests[0];
                    var _runner = void 0;
                    _runner = function runner() {
                        if (run) {
                            run(_runner);
                        }
                    };
                    run(_runner);
                })();
            } else {
                if (this.requests.length > 0) {
                    this.requests.splice(1, 0, callBack);
                } else {
                    this.requests.push(callBack);
                }
                if (this.requests.length === 1) {
                    (function () {
                        var run = _this.requests[0];
                        var _runner2 = void 0;
                        _runner2 = function runner() {
                            setTimeout(function () {
                                var old = _this.requests.shift();
                                var run = _this.requests[0];
                                if (run) {
                                    run(_runner2);
                                }
                            }, 30);
                        };
                        setTimeout(function () {
                            run(_runner2);
                        }, 30);
                    })();
                }
            }
        };

        DataSource.prototype.__stopAllRequest = function __stopAllRequest() {
            this.requests = [];
        };

        DataSource.prototype.resetCurrentEntity = function resetCurrentEntity() {
            this.entity = null;
        };

        DataSource.prototype.addEventListener = function addEventListener(fn) {
            this.eventListenerCount++;
            this.eventListener.push(fn);
            this.eventListenerID.push(this.eventListenerCount);
            return this.eventListenerCount;
        };

        DataSource.prototype.removeEventListener = function removeEventListener(id) {
            var row = this.eventListenerID.indexOf(id);
            if (row !== -1) {
                this.eventListener.splice(row, 1);
                this.eventListenerID.splice(row, 1);
                return true;
            } else {
                return false;
            }
        };

        DataSource.prototype.__triggerEvent = function __triggerEvent(event) {
            this.eventListener.forEach(function (list) {
                if (list) {
                    list(event);
                }
            });
        };

        DataSource.prototype.all = function all(options) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.__stopAllRequest();
                _this2.resetCurrentEntity();
                _this2.__queueRequest(function (done) {

                    options = options ? options : {};
                    var dataURI = _this2.dataURI;

                    var restString = _this2.restApi.generateRestString(dataURI, {
                        top: options.override_pageSize || _this2.pageSize,
                        method: options.override_method || "entityset",
                        timeout: options.override_timeout || _this2.timeout,
                        asArray: options.override_asArray,
                        autoExpand: options.override_autoExpand,
                        filterAttributes: options.override_filterAttributes || _this2.filterAttributes
                    });

                    _this2.restApi.callServer(restString).then(function (data) {

                        _this2.collection.replace(data);
                        done();
                        resolve(data);
                        _this2.__triggerEvent("collectionChange");
                    }).catch(function (err) {
                        done();
                        reject(err);
                    });
                });
            });
        };

        DataSource.prototype.releaseEntitySet = function releaseEntitySet(entitySetUrl, options) {
            var _this3 = this;

            options = options === undefined ? {} : options;

            var restString = this.restApi.generateRestString(entitySetUrl, {
                method: "release"
            });

            this.restApi.callServer(restString).then(function (data) {
                _this3.__triggerEvent("entitysetRelease", {
                    data: data
                });
            }).catch(function (err) {
                console.log(err);
            });
        };

        DataSource.prototype.query = function query(queryString, options) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                _this4.__stopAllRequest();
                _this4.resetCurrentEntity();
                _this4.__queueRequest(function (done) {

                    options = options ? options : {};
                    var dataURI = _this4.dataURI;
                    var releaseEntitySet = options.releaseEntitySet;
                    var orderByArray = options.orderby || _this4.savedOrderby;

                    var restString = _this4.restApi.generateRestString(dataURI, {
                        top: options.override_pageSize || _this4.pageSize,
                        filter: queryString,
                        orderby: orderByArray,
                        autoExpand: options.override_autoExpand,
                        timeout: options.override_timeout || _this4.timeout,
                        filterAttributes: options.override_filterAttributes || _this4.filterAttributes,
                        method: options.override_method || "entityset"
                    });

                    _this4.restApi.callServer(restString).then(function (data) {
                        var entitySet = void 0;
                        if (releaseEntitySet) {
                            entitySet = _this4.collection.entityset;
                        }
                        _this4.savedQueryString = queryString;
                        _this4.savedOrderby = orderByArray ? orderByArray : _this4.savedOrderby;

                        _this4.collection.replace(data);

                        _this4.__triggerEvent("collectionChange");

                        if (entitySet) {
                            _this4.releaseEntitySet(entitySet);
                        }
                        done();
                        resolve(data);
                    }).catch(function (err) {
                        done();
                        reject(err);
                    });
                });
            });
        };

        DataSource.prototype.replaceCollection = function replaceCollection(collection, releaseOldEntityset) {

            var entitySet = void 0;
            if (releaseOldEntityset) {
                entitySet = this.collection.entityset;
            }
            this.releaseEntitySet(entitySet);
            this.collection = collection;
            this.selection = new _selection.Selection(this.multiSelect, this);
            this.__triggerEvent("collectionChange");
        };

        DataSource.prototype.buildFromSelection = function buildFromSelection(sel, options) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                _this5.__stopAllRequest();
                _this5.resetCurrentEntity();
                _this5.__queueRequest(function (done) {
                    if (_this5.collection.entityset) {
                        (function () {

                            options = options ? options : {};
                            var dataURI = _this5.collection.entityset;
                            var orderByArray = options.orderby || _this5.savedOrderby;

                            var restString = _this5.restApi.generateRestString(dataURI, {
                                skip: 0,
                                top: options.override_pageSize || _this5.pageSize,
                                method: options.override_method || "entityset",
                                timeout: options.override_timeout || _this5.timeout,
                                orderby: orderByArray,
                                autoExpand: options.override_autoExpand,
                                addToSet: options.override_addToSet || _this5.collection.addToSet,
                                filterAttributes: options.override_filterAttributes || _this5.filterAttributes,
                                fromSelection: sel || _this5.selection.prepareToSend()
                            });

                            _this5.restApi.callServer(restString).then(function (data) {
                                var tempCol = new _collection.Collection(_this5.attributes);
                                tempCol.replace(data);

                                if (_this5.collection.addToSet.length > 0) {
                                    _this5.collection.addToSet = [];
                                }

                                _this5.savedOrderby = orderByArray;

                                if (data) {
                                    done();
                                    resolve(tempCol);
                                } else {
                                    done();
                                    reject({
                                        message: "entity out of range"
                                    });
                                }
                            }).catch(function (err) {
                                done();
                                reject(err);
                            });
                        })();
                    } else {
                        done();
                        reject({
                            message: "no collection"
                        });
                    }
                });
            });
        };

        DataSource.prototype.select = function select(row) {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                _this6.getElement(row).then(function (entity) {
                    _this6.entity = entity;
                    resolve(_this6.entity);
                });
            });
        };

        DataSource.prototype.getElement = function getElement(row, options, overrideCache) {
            var _this7 = this;

            return new Promise(function (resolve, reject) {

                if (_this7.collection.length <= row || row < 0) {
                    resolve(null);
                } else {
                    (function () {

                        var data = _this7.collection.getRow(row);
                        var prioOne = false;
                        var rowToGet = _this7.collection.getClosestPage(row, _this7.pageSize);

                        if (data) {
                            resolve(data);
                        } else {
                            _this7.__queueRequest(function (done, prioOne) {

                                var data = _this7.collection.getRow(row);

                                if (data) {
                                    done();
                                    resolve(data);
                                } else {

                                    options = options ? options : {};
                                    rowToGet = overrideCache ? row : _this7.collection.getClosestPage(row, _this7.pageSize);
                                    var dataURI = _this7.dataURI;
                                    var method = "entityset";

                                    if (_this7.collection.entityset) {
                                        dataURI = _this7.collection.entityset;
                                    } else {
                                        method = null;
                                    }

                                    var restString = _this7.restApi.generateRestString(dataURI, {
                                        skip: rowToGet,
                                        top: options.override_pageSize || _this7.pageSize,
                                        timeout: options.override_timeout || _this7.timeout,
                                        filterAttributes: options.override_method || _this7.filterAttributes,
                                        method: options.override_method || "entityset"
                                    });

                                    _this7.restApi.callServer(restString).then(function (data) {
                                        _this7.collection.add(data);
                                        var entity = _this7.collection.getRow(row);

                                        if (entity) {
                                            done();
                                            resolve(entity);
                                        } else {
                                            done();
                                            reject({
                                                message: "entity out of range"
                                            });
                                        }
                                    }).catch(function (err) {
                                        done();
                                        reject(err);
                                    });
                                }
                            });
                        }
                    })();
                }
            });
        };

        DataSource.prototype.orderby = function orderby(orderByArray, options) {
            var _this8 = this;

            return new Promise(function (resolve, reject) {
                _this8.__stopAllRequest();
                _this8.resetCurrentEntity();
                _this8.__queueRequest(function (done) {

                    options = options ? options : {};
                    var dataURI = _this8.collection.entityset ? _this8.collection.entityset : _this8.dataURI + "/$entityset/" + _this8.__guid();
                    var releaseEntitySet = options.releaseEntitySet;

                    var restString = _this8.restApi.generateRestString(dataURI, {
                        skip: 0,
                        top: options.override_pageSize || _this8.pageSize,
                        orderby: orderByArray || _this8.savedOrderby,
                        savedQueryString: _this8.savedQueryString,
                        timeout: options.override_timeout || _this8.timeout,
                        method: options.override_method || "entityset",
                        addToSet: options.override_addToSet || _this8.collection.addToSet,
                        filterAttributes: options.override_method || _this8.filterAttributes,
                        keepSelection: options.override_keepSelection || _this8.selection.prepareToSend()
                    });

                    _this8.restApi.callServer(restString).then(function (data) {

                        var entitySet = void 0;
                        if (releaseEntitySet) {
                            entitySet = _this8.collection.entityset;
                        }

                        _this8.savedOrderby = orderByArray ? orderByArray : _this8.savedOrderby;

                        _this8.collection.replace(data);

                        if (_this8.collection.addToSet.length > 0) {
                            _this8.collection.addToSet = [];
                        }

                        if (data.__transformedSelection) {
                            _this8.selection.setSelectionFromServer(data.__transformedSelection);
                        }

                        _this8.__triggerEvent("collectionChange");

                        if (entitySet) {
                            _this8.releaseEntitySet(entitySet);
                        }

                        done();
                        resolve(data);
                    }).catch(function (err) {
                        done();
                        reject(err);
                    });
                });
            });
        };

        DataSource.prototype.clearCache = function clearCache(row) {
            var _this9 = this;

            return new Promise(function (resolve, reject) {
                _this9.__stopAllRequest();
                _this9.resetCurrentEntity();
                _this9.collection.clearCache().then(function () {
                    _this9.entity = null;
                    if (row) {
                        _this9.getElement(row, null, true).then(function () {
                            setTimeout(function () {
                                resolve();
                                _this9.__triggerEvent("collectionChange_update");
                            }, 300);
                        }).catch(function (err) {
                            reject(err);
                            _this9.__triggerEvent("collectionChange_update");
                        });
                    } else {
                        _this9.__triggerEvent("collectionChange_update");
                        resolve();
                    }
                });
            });
        };

        DataSource.prototype.addNewElement = function addNewElement() {
            var _this10 = this;

            this.collection.addRow().then(function () {
                _this10.selection.addRowToSelection(_this10.collection.length - 1, false);
                _this10.__triggerEvent("collectionChange_newAdded");
                _this10.select(_this10.collection.length - 1);
            });
        };

        DataSource.prototype.__guid = function __guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            var uuid = "" + s4() + "" + s4() + "" + s4() + "" + s4() + "" + s4() + "" + s4() + "" + s4() + "" + s4();
            return uuid.toUpperCase();
        };

        DataSource.prototype.saveCurrent = function saveCurrent(entityObject, options) {
            var _this11 = this;

            return new Promise(function (resolve, reject) {
                _this11.__stopAllRequest();

                _this11.__queueRequest(function (done) {

                    options = options ? options : {};
                    var dataURI = _this11.collection.entityset ? _this11.collection.entityset : _this11.dataURI + "/";
                    var entity = entityObject || _this11.entity;
                    entity = entity ? entity : {};

                    if (entity && entity.__isModified) {
                        (function () {

                            var restString = _this11.restApi.generateRestString(dataURI, {
                                method: "update"

                            });

                            var unsavedValues = entity.__getUnsaved();

                            var requestOptions = {
                                body: unsavedValues,
                                method: "post"
                            };

                            if (entity.__isNew) {
                                requestOptions.body.__ISNEW = true;
                                if (entity.hasOwnProperty(_this11.key)) {
                                    delete requestOptions.body[_this11.key];
                                }
                            }

                            _this11.restApi.callServer(restString, requestOptions).then(function (data) {
                                if (entity.__isNew) {
                                    var newKeyIndex = _this11.collection.data.indexOf(entity);
                                    _this11.collection.keys[newKeyIndex] = data.__KEY;
                                    _this11.collection.addToSet.push(data.__KEY);
                                }

                                entity.__update(data);
                                done();
                                resolve(entity);
                            }).catch(function (err) {

                                if (err.__ERROR) {
                                    try {
                                        entity.__update(err);
                                    } catch (e) {
                                        console.log("need to check save error... ");
                                    }
                                    done();
                                    reject({
                                        error: err,
                                        changedValues: unsavedValues,
                                        entity: entity
                                    });
                                } else {
                                    reject(err);
                                }
                            });
                        })();
                    } else {
                        reject({
                            message: "no current entity to save or not modified"
                        });
                    }
                });
            });
        };

        DataSource.prototype.refreshCurrent = function refreshCurrent(entityObject, options) {
            var _this12 = this;

            return new Promise(function (resolve, reject) {
                _this12.__stopAllRequest();

                _this12.__queueRequest(function (done) {

                    options = options ? options : {};
                    var dataURI = _this12.dataURI + "/";
                    var entity = entityObject || _this12.entity;

                    if (entity) {

                        var restString = _this12.restApi.generateRestString(dataURI, {
                            method: "update",
                            refreshOnly: true
                        });

                        var requestOptions = {
                            body: entity.__getUnsaved(true),
                            method: "post"
                        };

                        if (entity.__isNew) {
                            requestOptions.body.__ISNEW = true;
                            if (entity.hasOwnProperty(_this12.key)) {
                                delete requestOptions.body[_this12.key];
                            }
                            if (entity.hasOwnProperty("__KEY")) {
                                delete requestOptions.body["__KEY"];
                            }
                        }

                        _this12.restApi.callServer(restString, requestOptions).then(function (data) {
                            if (entity.__isNew) {
                                var newKeyIndex = _this12.collection.data.indexOf(entity);
                                _this12.collection.keys[newKeyIndex] = data.__KEY;
                                _this12.collection.addToSet.push(data.__KEY);
                            }

                            entity.__refreshOnly(data);
                            done();
                            resolve(entity);
                        }).catch(function (err) {
                            if (err.__ERROR) {
                                try {
                                    entity.__update(err);
                                } catch (e) {
                                    console.log("refresh error");
                                    console.log(e);
                                }
                            }
                            done();
                            reject(err);
                        });
                    } else {
                        reject({
                            message: "no current entity to save"
                        });
                    }
                });
            });
        };

        DataSource.prototype.resetCollection = function resetCollection() {
            this.__stopAllRequest();
            this.resetCurrentEntity();
            this.collection = new _collection.Collection(this.attributes);
            this.selection = new _selection.Selection(this.multiSelect, this);
            this.__triggerEvent("collectionChange");
        };

        DataSource.prototype.saveAll = function saveAll(options) {
            var _this13 = this;

            return new Promise(function (resolve, reject) {
                _this13.__stopAllRequest();

                _this13.__queueRequest(function (done) {

                    options = options ? options : {};
                    var dataURI = _this13.dataURI + "/";
                    var entities = _this13.collection.getModified();

                    if (entities.length > 0) {
                        (function () {

                            var restString = _this13.restApi.generateRestString(dataURI, {
                                method: "update"
                            });

                            var postData = [];
                            entities.forEach(function (entity) {
                                var tempData = entity.__getUnsaved();
                                if (entity.__isNew) {
                                    tempData.__ISNEW = true;
                                    if (tempData.hasOwnProperty(_this13.key)) {
                                        delete tempData[_this13.key];
                                    }
                                }
                                postData.push(tempData);
                            });

                            var requestOptions = {
                                body: postData,
                                method: "post"
                            };

                            _this13.restApi.callServer(restString, requestOptions).then(function (result) {
                                entities.forEach(function (ent, i) {
                                    var updatedData = result.__ENTITIES[i];

                                    if (ent.__isNew) {
                                        var newKeyIndex = _this13.collection.data.indexOf(ent);
                                        _this13.collection.keys[newKeyIndex] = updatedData.__KEY;
                                        _this13.collection.addToSet.push(updatedData.__KEY);
                                    }
                                    ent.__update(updatedData);
                                    done();
                                    resolve(entities);
                                });
                            }).catch(function (err) {
                                entities.forEach(function (ent, i) {
                                    var updatedData = err.__ENTITIES[i];
                                    if (updatedData.__ERROR) {
                                        ent.__update(updatedData);
                                    } else {
                                        if (ent.__isNew) {
                                            var newKeyIndex = _this13.collection.data.indexOf(ent);
                                            _this13.collection.keys[newKeyIndex] = updatedData.__KEY;
                                            _this13.collection.addToSet.push(updatedData.__KEY);
                                        }
                                        ent.__update(updatedData);
                                    }
                                });
                                done();
                                reject({
                                    error: err,
                                    changedValues: postData,
                                    entities: entities
                                });
                            });
                        })();
                    } else {
                        reject({
                            message: "no current entity to save"
                        });
                    }
                });
            });
        };

        DataSource.prototype.deleteCurrent = function deleteCurrent(options) {
            var _this14 = this;

            return new Promise(function (resolve, reject) {

                var entity = _this14.entity;

                if (entity) {
                    entity = _this14.entity[_this14.key];
                }

                if (entity) {
                    (function () {

                        options = options ? options : {};
                        var dataURI = _this14.collection.entityset;
                        var row = _this14.collection.getRowFromEntity(_this14.entity);
                        var overbyArray = options.override_orderby || _this14.savedOrderby;

                        var restString = _this14.restApi.generateRestString(dataURI, {
                            skip: row,
                            top: options.override_pageSize || _this14.pageSize,
                            orderby: overbyArray,
                            timeout: options.override_timeout || _this14.timeout,
                            filterAttributes: options.override_filterAttributes || _this14.filterAttributes,
                            removeAtPos: row
                        });

                        _this14.restApi.callServer(restString).then(function (data) {

                            data.__ENTITYSET = _this14.collection.entityset;

                            _this14.collection.removeUnsavedRow(row);

                            _this14.collection.insertData(data);
                            _this14.entity = null;
                            if (_this14.collection.length > row) {
                                _this14.select(row);
                                _this14.selection.addRowToSelection(row);
                            } else {
                                if (_this14.collection.length > 0) {
                                    _this14.select(_this14.collection.length - 1);
                                    _this14.selection.addRowToSelection(_this14.collection.length - 1);
                                }
                            }

                            _this14.__triggerEvent("collectionChange_oneRemoved");

                            resolve(data);
                        }).catch(function (err) {
                            reject(err);
                        });
                    })();
                } else {

                    if (_this14.entity === null) {
                        reject({
                            message: "no currentEntity"
                        });
                    } else {
                        var _row = _this14.collection.getRowFromEntity(_this14.entity);
                        _this14.collection.removeUnsavedRow(_row);
                        _this14.entity = null;
                        if (_this14.collection.length > _row) {
                            _this14.select(_row);
                            _this14.selection.addRowToSelection(_row);
                        } else {
                            if (_this14.collection.length > 0) {
                                _this14.select(_this14.collection.length - 1);
                                _this14.selection.addRowToSelection(_this14.collection.length - 1);
                            }
                        }
                        _this14.__triggerEvent("collectionChange_oneRemoved");
                        resolve();
                    }
                }
            });
        };

        return DataSource;
    }();
});