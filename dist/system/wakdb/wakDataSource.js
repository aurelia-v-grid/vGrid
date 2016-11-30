System.register(["./WakCollection", "./wakSelection", "./wakCollectionMethod", "./wakClassMethod", "./wakEntityMethod"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var WakCollection_1, wakSelection_1, wakCollectionMethod_1, wakClassMethod_1, wakEntityMethod_1, WakDataSource;
    return {
        setters: [
            function (WakCollection_1_1) {
                WakCollection_1 = WakCollection_1_1;
            },
            function (wakSelection_1_1) {
                wakSelection_1 = wakSelection_1_1;
            },
            function (wakCollectionMethod_1_1) {
                wakCollectionMethod_1 = wakCollectionMethod_1_1;
            },
            function (wakClassMethod_1_1) {
                wakClassMethod_1 = wakClassMethod_1_1;
            },
            function (wakEntityMethod_1_1) {
                wakEntityMethod_1 = wakEntityMethod_1_1;
            }
        ],
        execute: function () {
            WakDataSource = (function () {
                function WakDataSource(restApi, sourceConfig) {
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
                    this.savedQueryString = sourceConfig.initQuery || this.key + '=-1';
                    this.multiSelect = sourceConfig.multiSelect;
                    this.savedOrderby = sourceConfig.initOrderby || [this.key + ' asc'];
                    this.eventListener = [];
                    this.eventListenerID = [];
                    this.eventListenerCount = 0;
                    this.requests = [];
                    this.collection = new WakCollection_1.WakCollection(this.attributes, this.restApi.baseURL);
                    this.entity = null;
                    this.selection = new wakSelection_1.WakSelection(this.multiSelect, this);
                    this.methods = {};
                    this.collectionMethods = {};
                    var ecm = restApi.classes[this.classname].entityCollectionMethods;
                    for (var k in ecm) {
                        if (ecm.hasOwnProperty(k)) {
                            this.methods[k] = new wakCollectionMethod_1.WakCollectionMethod(this, k);
                            this.collectionMethods[k] = this.methods[k].execute.bind(this.methods[k]);
                        }
                    }
                    this.entityMethods = {};
                    var em = restApi.classes[this.classname].entityMethods;
                    for (var k in em) {
                        if (em.hasOwnProperty(k)) {
                            this.methods[k] = new wakEntityMethod_1.WakEntityMethod(this, k);
                            this.entityMethods[k] = this.methods[k].execute.bind(this.methods[k]);
                        }
                    }
                    this.classMethods = {};
                    var cm = restApi.classes[this.classname].dataClassMethods;
                    for (var k in cm) {
                        if (cm.hasOwnProperty(k)) {
                            this.methods[k] = new wakClassMethod_1.WakClassMethod(this, k);
                            this.classMethods[k] = this.methods[k].execute.bind(this.methods[k]);
                        }
                    }
                }
                WakDataSource.prototype.__queueRequest = function (callBack, atOnce) {
                    var _this = this;
                    if (atOnce) {
                        var run_1 = this.requests[0];
                        var runner_1;
                        runner_1 = function () {
                            if (run_1) {
                                run_1(runner_1);
                            }
                        };
                        run_1(runner_1);
                    }
                    else {
                        if (this.requests.length > 0) {
                            this.requests.splice(1, 0, callBack);
                        }
                        else {
                            this.requests.push(callBack);
                        }
                        if (this.requests.length === 1) {
                            var run_2 = this.requests[0];
                            var runner_2;
                            runner_2 = function () {
                                setTimeout(function () {
                                    var old = _this.requests.shift();
                                    old = null;
                                    var run = _this.requests[0];
                                    if (run) {
                                        run(runner_2);
                                    }
                                }, 0);
                            };
                            setTimeout(function () {
                                run_2(runner_2);
                            }, 0);
                        }
                    }
                };
                WakDataSource.prototype.__stopAllRequest = function () {
                    this.requests = [];
                };
                WakDataSource.prototype.getSelection = function () {
                    return this.selection;
                };
                WakDataSource.prototype.resetCurrentEntity = function () {
                    this.entity = null;
                };
                WakDataSource.prototype.length = function () {
                    return this.collection.length;
                };
                WakDataSource.prototype.addEventListener = function (fn) {
                    this.eventListenerCount++;
                    this.eventListener.push(fn);
                    this.eventListenerID.push(this.eventListenerCount);
                    return this.eventListenerCount;
                };
                WakDataSource.prototype.removeEventListener = function (id) {
                    var row = this.eventListenerID.indexOf(id);
                    if (row !== -1) {
                        this.eventListener.splice(row, 1);
                        this.eventListenerID.splice(row, 1);
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                WakDataSource.prototype.__triggerEvent = function (event) {
                    this.eventListener.forEach(function (list) {
                        if (list) {
                            list(event);
                        }
                    });
                };
                WakDataSource.prototype.all = function (options) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.__stopAllRequest();
                        _this.resetCurrentEntity();
                        _this.__queueRequest(function (done) {
                            options = options ? options : {};
                            var dataURI = _this.dataURI;
                            var restString = _this.restApi.generateRestString(dataURI, {
                                top: options.override_pageSize || _this.pageSize,
                                method: options.override_method || 'entityset',
                                timeout: options.override_timeout || _this.timeout,
                                asArray: options.override_asArray || null,
                                autoExpand: options.override_autoExpand || null,
                                filterAttributes: options.override_filterAttributes || _this.filterAttributes,
                            });
                            _this.restApi.callServer(restString).then(function (data) {
                                _this.collection.replace(data);
                                done();
                                resolve(data);
                                _this.__triggerEvent('collectionChange');
                            }).catch(function (err) {
                                done();
                                reject({
                                    error: err
                                });
                            });
                        });
                    });
                };
                WakDataSource.prototype.releaseEntitySet = function (entitySetUrl, options) {
                    var _this = this;
                    options = options === undefined ? {} : options;
                    var restString = this.restApi.generateRestString(entitySetUrl, {
                        method: 'release'
                    });
                    this.restApi.callServer(restString).then(function () {
                        _this.__triggerEvent('entitysetRelease');
                    }).catch(function () {
                    });
                };
                WakDataSource.prototype.query = function (queryString, options) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.__stopAllRequest();
                        _this.resetCurrentEntity();
                        _this.__queueRequest(function (done) {
                            options = options ? options : {};
                            var dataURI = _this.dataURI;
                            var releaseEntitySet = options.releaseEntitySet;
                            var orderByArray = options.orderby || _this.savedOrderby;
                            var restString = _this.restApi.generateRestString(dataURI, {
                                top: options.override_pageSize || _this.pageSize,
                                filter: queryString,
                                orderby: orderByArray,
                                autoExpand: options.override_autoExpand,
                                timeout: options.override_timeout || _this.timeout,
                                filterAttributes: options.override_filterAttributes || _this.filterAttributes,
                                method: options.override_method || 'entityset'
                            });
                            _this.restApi.callServer(restString).then(function (data) {
                                var entitySet;
                                if (releaseEntitySet) {
                                    entitySet = _this.collection.entityset;
                                }
                                _this.savedQueryString = queryString;
                                _this.savedOrderby = orderByArray ? orderByArray : _this.savedOrderby;
                                _this.collection.replace(data);
                                _this.__triggerEvent('collection_filtered');
                                if (entitySet) {
                                    _this.releaseEntitySet(entitySet);
                                }
                                done();
                                resolve(data);
                            }).catch(function (err) {
                                done();
                                reject({
                                    error: err
                                });
                            });
                        });
                    });
                };
                WakDataSource.prototype.replaceCollection = function (collection, releaseOldEntityset) {
                    var entitySet;
                    if (releaseOldEntityset) {
                        entitySet = this.collection.entityset;
                    }
                    this.releaseEntitySet(entitySet);
                    this.collection = collection;
                    this.selection = new wakSelection_1.WakSelection(this.multiSelect, this);
                    this.__triggerEvent('collectionChange');
                };
                WakDataSource.prototype.buildFromSelection = function (sel, options) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.__stopAllRequest();
                        _this.resetCurrentEntity();
                        _this.__queueRequest(function (done) {
                            if (_this.collection.entityset) {
                                options = options ? options : {};
                                var dataURI = _this.collection.entityset;
                                var orderByArray_1 = options.orderby || _this.savedOrderby;
                                var restString = _this.restApi.generateRestString(dataURI, {
                                    skip: 0,
                                    top: options.override_pageSize || _this.pageSize,
                                    method: options.override_method || 'entityset',
                                    timeout: options.override_timeout || _this.timeout,
                                    orderby: orderByArray_1,
                                    autoExpand: options.override_autoExpand,
                                    addToSet: options.override_addToSet || _this.collection.addToSet,
                                    filterAttributes: options.override_filterAttributes || _this.filterAttributes,
                                    fromSelection: sel || _this.selection.prepareToSend()
                                });
                                _this.restApi.callServer(restString).then(function (data) {
                                    var tempCol = new WakCollection_1.WakCollection(_this.attributes, _this.dataURI);
                                    tempCol.replace(data);
                                    if (_this.collection.addToSet.length > 0) {
                                        _this.collection.addToSet = [];
                                    }
                                    _this.savedOrderby = orderByArray_1;
                                    if (data) {
                                        done();
                                        resolve(tempCol);
                                    }
                                    else {
                                        done();
                                        reject({
                                            message: 'entity out of range'
                                        });
                                    }
                                }).catch(function (err) {
                                    done();
                                    reject({
                                        error: err
                                    });
                                });
                            }
                            else {
                                done();
                                reject({
                                    error: 'no collection'
                                });
                            }
                        });
                    });
                };
                WakDataSource.prototype.select = function (row) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.getElement(row).then(function (entity) {
                            _this.entity = entity;
                            resolve(_this.entity);
                        }).catch(function (err) {
                            reject(err);
                        });
                    });
                };
                WakDataSource.prototype.getElement = function (row, options, overrideCache) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        if (_this.collection.length <= row || row < 0) {
                            resolve(null);
                        }
                        else {
                            var data = _this.collection.getRow(row);
                            var rowToGet_1 = _this.collection.getClosestPage(row, _this.pageSize);
                            if (data) {
                                resolve(data);
                            }
                            else {
                                _this.__queueRequest(function (done) {
                                    var data = _this.collection.getRow(row);
                                    if (data) {
                                        done();
                                        resolve(data);
                                    }
                                    else {
                                        options = options ? options : {};
                                        rowToGet_1 = overrideCache ? row : _this.collection.getClosestPage(row, _this.pageSize);
                                        var dataURI = _this.dataURI;
                                        var method = 'entityset';
                                        if (_this.collection.entityset) {
                                            dataURI = _this.collection.entityset;
                                        }
                                        else {
                                            method = null;
                                        }
                                        var restString = _this.restApi.generateRestString(dataURI, {
                                            skip: rowToGet_1,
                                            top: options.override_pageSize || _this.pageSize,
                                            timeout: options.override_timeout || _this.timeout,
                                            filterAttributes: options.override_method || _this.filterAttributes,
                                            method: options.override_method || 'entityset'
                                        });
                                        _this.restApi.callServer(restString).then(function (data) {
                                            _this.collection.add(data);
                                            var entity = _this.collection.getRow(row);
                                            if (entity) {
                                                done();
                                                resolve(entity);
                                            }
                                            else {
                                                done();
                                                reject({
                                                    error: 'entity out of range'
                                                });
                                            }
                                        }).catch(function (err) {
                                            done();
                                            reject({
                                                error: err
                                            });
                                        });
                                    }
                                });
                            }
                        }
                    });
                };
                WakDataSource.prototype.orderby = function (orderByArray, options) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.__stopAllRequest();
                        _this.resetCurrentEntity();
                        _this.__queueRequest(function (done) {
                            options = options ? options : {};
                            var dataURI = _this.collection.entityset ?
                                _this.collection.entityset : _this.dataURI + '/$entityset/' + _this.__guid();
                            var releaseEntitySet = options.releaseEntitySet;
                            var restString = _this.restApi.generateRestString(dataURI, {
                                skip: 0,
                                top: options.override_pageSize || _this.pageSize,
                                orderby: orderByArray || _this.savedOrderby,
                                savedQueryString: _this.savedQueryString,
                                timeout: options.override_timeout || _this.timeout,
                                method: options.override_method || 'entityset',
                                addToSet: options.override_addToSet || _this.collection.addToSet,
                                filterAttributes: options.override_method || _this.filterAttributes,
                                keepSelection: options.override_keepSelection || _this.selection.prepareToSend()
                            });
                            _this.restApi.callServer(restString).then(function (data) {
                                var entitySet;
                                if (releaseEntitySet) {
                                    entitySet = _this.collection.entityset;
                                }
                                _this.savedOrderby = orderByArray ? orderByArray : _this.savedOrderby;
                                _this.collection.replace(data);
                                if (_this.collection.addToSet.length > 0) {
                                    _this.collection.addToSet = [];
                                }
                                if (data.__transformedSelection) {
                                    _this.selection.setSelectionFromServer(data.__transformedSelection);
                                }
                                _this.__triggerEvent('collection_sorted');
                                if (entitySet) {
                                    _this.releaseEntitySet(entitySet);
                                }
                                done();
                                resolve(data);
                            }).catch(function (err) {
                                done();
                                reject({
                                    error: err
                                });
                            });
                        });
                    });
                };
                WakDataSource.prototype.clearCache = function (row) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.__stopAllRequest();
                        _this.resetCurrentEntity();
                        _this.collection.clearCache().then(function () {
                            _this.entity = null;
                            if (typeof row === 'number') {
                                _this.getElement(row, null, true).then(function () {
                                    setTimeout(function () {
                                        resolve();
                                        _this.__triggerEvent('collectionChange_update');
                                    }, 300);
                                }).catch(function (err) {
                                    reject({
                                        error: err
                                    });
                                    _this.__triggerEvent('collectionChange_update');
                                });
                            }
                            else {
                                _this.__triggerEvent('collectionChange_update');
                                resolve();
                            }
                        });
                    });
                };
                WakDataSource.prototype.addNewElement = function () {
                    var _this = this;
                    this.collection.addRow().then(function () {
                        _this.selection.select(_this.collection.length - 1, false);
                        _this.__triggerEvent('collectionChange_newAdded');
                        _this.select(_this.collection.length - 1);
                    });
                };
                WakDataSource.prototype.__guid = function () {
                    function s4() {
                        return Math.floor((1 + Math.random()) * 0x10000)
                            .toString(16)
                            .substring(1);
                    }
                    var uuid = '' + s4() + '' + s4() + '' + s4() + '' + s4() + '' + s4() + '' + s4() + '' + s4() + '' + s4();
                    return uuid.toUpperCase();
                };
                WakDataSource.prototype.saveCurrent = function (entityObject, options) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.__stopAllRequest();
                        _this.__queueRequest(function (done) {
                            options = options ? options : {};
                            var dataURI = _this.collection.entityset ? _this.collection.entityset : _this.dataURI + '/';
                            var entity = entityObject || _this.entity;
                            entity = entity ? entity : {};
                            if (entity && entity.__isModified) {
                                var restString = _this.restApi.generateRestString(dataURI, {
                                    method: 'update'
                                });
                                var unsavedValues_1 = entity.__getUnsaved();
                                var requestOptions = {
                                    body: unsavedValues_1,
                                    method: 'post'
                                };
                                if (entity.__isNew) {
                                    requestOptions.body.__ISNEW = true;
                                    if (entity.hasOwnProperty(_this.key)) {
                                        delete requestOptions.body[_this.key];
                                    }
                                }
                                _this.restApi.callServer(restString, requestOptions).then(function (data) {
                                    if (entity.__isNew) {
                                        var newKeyIndex = _this.collection.data.indexOf(entity);
                                        _this.collection.keys[newKeyIndex] = data.__KEY;
                                        _this.collection.addToSet.push(data.__KEY);
                                    }
                                    entity.__update(data);
                                    done();
                                    resolve(entity);
                                }).catch(function (err) {
                                    if (err.__ERROR) {
                                        try {
                                            if (!entity.__isNew) {
                                                entity.__update(err);
                                            }
                                        }
                                        catch (e) {
                                            console.warn('need to check save error... ');
                                        }
                                        done();
                                        reject({
                                            error: err,
                                            changedValues: unsavedValues_1,
                                            entity: entity
                                        });
                                    }
                                    else {
                                        reject({
                                            error: err
                                        });
                                    }
                                });
                            }
                            else {
                                if (_this.entity) {
                                    if (!entity.__isModified) {
                                        reject({
                                            error: 'entity is not modified, nothing to save'
                                        });
                                    }
                                }
                                else {
                                    reject({
                                        error: 'no current entity'
                                    });
                                }
                            }
                        });
                    });
                };
                WakDataSource.prototype.refreshCurrent = function (entityObject, options) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.__stopAllRequest();
                        _this.__queueRequest(function (done) {
                            options = options ? options : {};
                            var dataURI = _this.dataURI + '/';
                            var entity = entityObject || _this.entity;
                            if (entity) {
                                var restString = _this.restApi.generateRestString(dataURI, {
                                    method: 'update',
                                    refreshOnly: true
                                });
                                var requestOptions = {
                                    body: entity.__getUnsaved(true),
                                    method: 'post'
                                };
                                if (entity.__isNew) {
                                    requestOptions.body.__ISNEW = true;
                                    if (entity.hasOwnProperty(_this.key)) {
                                        delete requestOptions.body[_this.key];
                                    }
                                    if (entity.hasOwnProperty('__KEY')) {
                                        delete requestOptions.body['__KEY'];
                                    }
                                }
                                _this.restApi.callServer(restString, requestOptions).then(function (data) {
                                    if (entity.__isNew) {
                                        var newKeyIndex = _this.collection.data.indexOf(entity);
                                        _this.collection.keys[newKeyIndex] = data.__KEY;
                                        _this.collection.addToSet.push(data.__KEY);
                                    }
                                    entity.__refreshOnly(data);
                                    done();
                                    resolve(entity);
                                }).catch(function (err) {
                                    if (err.__ERROR) {
                                        try {
                                            if (!entity.__isNew) {
                                                entity.__update(err);
                                            }
                                        }
                                        catch (e) {
                                            console.warn('refresh error');
                                            console.warn(e);
                                        }
                                    }
                                    done();
                                    reject({
                                        error: err
                                    });
                                });
                            }
                            else {
                                reject({
                                    messerrorage: 'no current entity to save'
                                });
                            }
                        });
                    });
                };
                WakDataSource.prototype.resetCollection = function () {
                    this.__stopAllRequest();
                    this.resetCurrentEntity();
                    this.collection = new WakCollection_1.WakCollection(this.attributes, this.dataURI);
                    this.selection = new wakSelection_1.WakSelection(this.multiSelect, this);
                    this.__triggerEvent('collectionChange');
                };
                WakDataSource.prototype.saveAll = function (options) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.__stopAllRequest();
                        _this.__queueRequest(function (done) {
                            options = options ? options : {};
                            var dataURI = _this.dataURI + '/';
                            var entities = _this.collection.getModified();
                            if (entities.length > 0) {
                                var restString = _this.restApi.generateRestString(dataURI, {
                                    method: 'update'
                                });
                                var postData_1 = [];
                                entities.forEach(function (entity) {
                                    var tempData = entity.__getUnsaved();
                                    if (entity.__isNew) {
                                        tempData.__ISNEW = true;
                                        if (tempData.hasOwnProperty(_this.key)) {
                                            delete tempData[_this.key];
                                        }
                                    }
                                    postData_1.push(tempData);
                                });
                                var requestOptions = {
                                    body: postData_1,
                                    method: 'post'
                                };
                                _this.restApi.callServer(restString, requestOptions).then(function (result) {
                                    entities.forEach(function (ent, i) {
                                        var updatedData = result.__ENTITIES[i];
                                        if (ent.__isNew) {
                                            var newKeyIndex = _this.collection.data.indexOf(ent);
                                            _this.collection.keys[newKeyIndex] = updatedData.__KEY;
                                            _this.collection.addToSet.push(updatedData.__KEY);
                                        }
                                        ent.__update(updatedData);
                                        done();
                                        resolve(entities);
                                    });
                                }).catch(function (err) {
                                    entities.forEach(function (ent, i) {
                                        var updatedData = err.__ENTITIES[i];
                                        if (updatedData.__ERROR) {
                                            if (!ent.__isNew) {
                                                ent.__update(updatedData);
                                            }
                                        }
                                        else {
                                            if (ent.__isNew) {
                                                var newKeyIndex = _this.collection.data.indexOf(ent);
                                                _this.collection.keys[newKeyIndex] = updatedData.__KEY;
                                                _this.collection.addToSet.push(updatedData.__KEY);
                                            }
                                            ent.__update(updatedData);
                                        }
                                    });
                                    done();
                                    reject({
                                        error: err,
                                        changedValues: postData_1,
                                        entities: entities
                                    });
                                });
                            }
                            else {
                                reject({
                                    error: 'no modified entities to save'
                                });
                            }
                        });
                    });
                };
                WakDataSource.prototype.deleteCurrent = function (options) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        var entity = _this.entity;
                        if (entity) {
                            entity = _this.entity[_this.key];
                        }
                        if (entity) {
                            options = options ? options : {};
                            var dataURI = _this.collection.entityset;
                            var row_1 = _this.collection.getRowFromEntity(_this.entity);
                            var overbyArray = options.override_orderby || _this.savedOrderby;
                            var restString = _this.restApi.generateRestString(dataURI, {
                                skip: row_1,
                                top: options.override_pageSize || _this.pageSize,
                                orderby: overbyArray,
                                timeout: options.override_timeout || _this.timeout,
                                filterAttributes: options.override_filterAttributes || _this.filterAttributes,
                                removeAtPos: row_1
                            });
                            _this.restApi.callServer(restString).then(function (data) {
                                data.__ENTITYSET = _this.collection.entityset;
                                _this.collection.removeUnsavedRow(row_1);
                                _this.collection.insertData(data);
                                _this.entity = null;
                                if (_this.collection.length > row_1) {
                                    _this.select(row_1);
                                    _this.selection.select(row_1);
                                }
                                else {
                                    if (_this.collection.length > 0) {
                                        _this.select(_this.collection.length - 1);
                                        _this.selection.select(_this.collection.length - 1);
                                    }
                                }
                                _this.__triggerEvent('collectionChange_oneRemoved');
                                resolve(data);
                            }).catch(function (err) {
                                reject({
                                    error: err
                                });
                            });
                        }
                        else {
                            if (_this.entity === null) {
                                reject({
                                    error: 'no currentEntity'
                                });
                            }
                            else {
                                var row = _this.collection.getRowFromEntity(_this.entity);
                                _this.collection.removeUnsavedRow(row);
                                _this.entity = null;
                                if (_this.collection.length > row) {
                                    _this.select(row);
                                    _this.selection.select(row);
                                }
                                else {
                                    if (_this.collection.length > 0) {
                                        _this.select(_this.collection.length - 1);
                                        _this.selection.select(_this.collection.length - 1);
                                    }
                                }
                                _this.__triggerEvent('collectionChange_oneRemoved');
                                resolve();
                            }
                        }
                    });
                };
                return WakDataSource;
            }());
            exports_1("WakDataSource", WakDataSource);
        }
    };
});

//# sourceMappingURL=wakDataSource.js.map
