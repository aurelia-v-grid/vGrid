import { WakCollection } from './WakCollection';
import { WakSelection } from './wakSelection';
import { WakCollectionMethod } from './wakCollectionMethod';
import { WakClassMethod } from './wakClassMethod';
import { WakEntityMethod } from './wakEntityMethod';

export class WakDataSource {
    public name: any;
    public classname: any;
    public filterAttributes: any;
    public restApi: any;
    public attributes: any;
    public collectionName: any;
    public key: any;
    public dataURI: any;
    public pageSize: any;
    public timeout: any;
    public savedQueryString: any;
    public multiSelect: any;
    public savedOrderby: any;
    public eventListener: any[];
    public eventListenerID: any[];
    public eventListenerCount: any;
    public requests: any[];
    public collection: any;
    public entity: any;
    public selection: WakSelection;
    public methods: any;
    public collectionMethods: any;
    public entityMethods: any;
    public classMethods: any;

    constructor(restApi: any, sourceConfig: any) {
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

        // request queue
        this.requests = [];

        // set collection and enity
        this.collection = new WakCollection(this.attributes, this.restApi.baseURL);
        this.entity = null; // new Entity(null, this.attributes);
        this.selection = new WakSelection(this.multiSelect, this);

        // collection, class & entity method handlers
        this.methods = {};

        // datasource collection methods
        this.collectionMethods = {};
        let ecm = restApi.classes[this.classname].entityCollectionMethods;
        for (let k in ecm) {
            if (ecm.hasOwnProperty(k)) {
                this.methods[k] = new WakCollectionMethod(this, k);
                this.collectionMethods[k] = this.methods[k].execute.bind(this.methods[k]);
            }
        }

        // datasource entity methods
        this.entityMethods = {};
        let em = restApi.classes[this.classname].entityMethods;
        for (let k in em) {
            if (em.hasOwnProperty(k)) {
                this.methods[k] = new WakEntityMethod(this, k);
                this.entityMethods[k] = this.methods[k].execute.bind(this.methods[k]);
            }
        }

        // datasource class methods
        this.classMethods = {};
        let cm = restApi.classes[this.classname].dataClassMethods;
        for (let k in cm) {
            if (cm.hasOwnProperty(k)) {
                this.methods[k] = new WakClassMethod(this, k);
                this.classMethods[k] = this.methods[k].execute.bind(this.methods[k]);
            }
        }
    }

    // queues the rest of the datasource calls so we dont hammer the server
    public __queueRequest(callBack: any, atOnce?: any) {
        if (atOnce) {
            let run = this.requests[0];
            let runner: any;
            runner = () => {
                if (run) {
                    run(runner);
                }
            };
            run(runner);

        } else {
            if (this.requests.length > 0) {
                // we want it to be the next one, so we dont delay the request when you for instance scroll fast 
                this.requests.splice(1, 0, callBack);
            } else {
                this.requests.push(callBack);
            }
            if (this.requests.length === 1) {
                let run = this.requests[0];
                let runner: any;
                runner = () => {
                    setTimeout(() => {
                        let old = this.requests.shift();
                        old = null;
                        let run = this.requests[0];
                        if (run) {
                            run(runner);
                        }
                    }, 0);
                };
                setTimeout(() => {
                    run(runner);
                }, 0);
            }
        }
    }

    public __stopAllRequest() {
        this.requests = [];
    }

    public getSelection(): any {
        return this.selection;
    }

    public resetCurrentEntity() {
        this.entity = null;
    }

    public length(): number {
        return this.collection.length;
    }

    public addEventListener(fn: any) {
        this.eventListenerCount++;
        this.eventListener.push(fn); // todo use own array for listner id
        this.eventListenerID.push(this.eventListenerCount);
        return this.eventListenerCount;
    }

    public removeEventListener(id: any) {
        let row = this.eventListenerID.indexOf(id);
        if (row !== -1) {
            this.eventListener.splice(row, 1);
            this.eventListenerID.splice(row, 1);
            return true;
        } else {
            return false;
        }
    }

    public __triggerEvent(event: any) {
        this.eventListener.forEach((list) => {
            if (list) {
                list(event);
            }
        });
    }

    public all(options: any) {
        return new Promise((resolve, reject) => {
            this.__stopAllRequest();
            this.resetCurrentEntity();
            this.__queueRequest((done: any) => {

                options = options ? options : {};
                let dataURI = this.dataURI;

                let restString = this.restApi.generateRestString(dataURI, {
                    top: options.override_pageSize || this.pageSize,
                    method: options.override_method || 'entityset',
                    timeout: options.override_timeout || this.timeout,
                    asArray: options.override_asArray || null,
                    autoExpand: options.override_autoExpand || null,
                    filterAttributes: options.override_filterAttributes || this.filterAttributes,
                });

                this.restApi.callServer(restString).then((data: any) => {

                    this.collection.replace(data);
                    done();
                    resolve(data);
                    this.__triggerEvent('collectionChange');

                }).catch((err: any) => {
                    done();
                    reject({
                        error: err
                    });
                });
            });
        });
    }

    public releaseEntitySet(entitySetUrl: any, options?: any) {

        options = options === undefined ? {} : options;

        let restString = this.restApi.generateRestString(entitySetUrl, {
            method: 'release'
        });

        this.restApi.callServer(restString).then(() => {
            this.__triggerEvent('entitysetRelease');
        }).catch(() => {
            /* reject({
                 error: err
             });*/
        });
    }

    public query(queryString: string, options?: any) {
        return new Promise((resolve, reject) => {
            this.__stopAllRequest();
            this.resetCurrentEntity();
            this.__queueRequest((done: any) => {

                options = options ? options : {};
                let dataURI = this.dataURI;
                let releaseEntitySet = options.releaseEntitySet;
                let orderByArray = options.orderby || this.savedOrderby;

                let restString = this.restApi.generateRestString(dataURI, {
                    top: options.override_pageSize || this.pageSize,
                    filter: queryString,
                    orderby: orderByArray,
                    autoExpand: options.override_autoExpand,
                    timeout: options.override_timeout || this.timeout,
                    filterAttributes: options.override_filterAttributes || this.filterAttributes,
                    method: options.override_method || 'entityset'
                });

                this.restApi.callServer(restString).then((data: any) => {
                    let entitySet;
                    if (releaseEntitySet) {
                        entitySet = this.collection.entityset;
                    }
                    this.savedQueryString = queryString;
                    this.savedOrderby = orderByArray ? orderByArray : this.savedOrderby;

                    this.collection.replace(data);

                    this.__triggerEvent('collection_filtered');

                    if (entitySet) {
                        this.releaseEntitySet(entitySet);
                    }
                    done();
                    resolve(data);
                }).catch((err: any) => {
                    // clear data here ? not the best thing to do, maybe let that be up to the error handling from user
                    // this.collection.replace({});
                    // this.__triggerEvent("collectionChange");
                    done();
                    reject({
                        error: err
                    });
                });
            });
        });
    }

    public replaceCollection(collection: any, releaseOldEntityset: any) {
        let entitySet;
        if (releaseOldEntityset) {
            entitySet = this.collection.entityset;
        }
        this.releaseEntitySet(entitySet);
        this.collection = collection;
        this.selection = new WakSelection(this.multiSelect, this);
        this.__triggerEvent('collectionChange');
    }

    public buildFromSelection(sel: any, options: any) {
        return new Promise((resolve, reject) => {
            this.__stopAllRequest();
            this.resetCurrentEntity();
            this.__queueRequest((done: any) => {
                if (this.collection.entityset) {

                    options = options ? options : {};
                    let dataURI = this.collection.entityset;
                    let orderByArray = options.orderby || this.savedOrderby;

                    let restString = this.restApi.generateRestString(dataURI, {
                        skip: 0,
                        top: options.override_pageSize || this.pageSize,
                        method: options.override_method || 'entityset',
                        timeout: options.override_timeout || this.timeout,
                        orderby: orderByArray,
                        autoExpand: options.override_autoExpand,
                        addToSet: options.override_addToSet || this.collection.addToSet,
                        filterAttributes: options.override_filterAttributes || this.filterAttributes,
                        fromSelection: sel || this.selection.prepareToSend()
                    });

                    this.restApi.callServer(restString).then((data: any) => {
                        let tempCol = new WakCollection(this.attributes, this.dataURI);
                        tempCol.replace(data);

                        if (this.collection.addToSet.length > 0) {
                            this.collection.addToSet = [];
                        }

                        this.savedOrderby = orderByArray;

                        if (data) {
                            done();
                            resolve(tempCol);
                        } else {
                            done();
                            reject({
                                message: 'entity out of range'
                            });
                        }

                    }).catch((err: any) => {
                        done();
                        reject({
                            error: err
                        });
                    });
                } else {
                    done();
                    reject({
                        error: 'no collection'
                    });
                }
            });
        });

    }

    public select(row: any) {
        return new Promise((resolve, reject) => {
            this.getElement(row).then((entity: any) => {
                this.entity = entity;
                resolve(this.entity);
            }).catch((err: any) => {
                reject(err); // no {error:err} here, that is returned by the get element
            });
        });
    }

    public getElement(row: any, options?: any, overrideCache?: any) {
        return new Promise((resolve, reject) => {

            if (this.collection.length <= row || row < 0) {
                resolve(null);
            } else {

                let data = this.collection.getRow(row);
                // let prioOne = false;
                let rowToGet = this.collection.getClosestPage(row, this.pageSize);

                if (data) {
                    resolve(data);
                } else {
                    this.__queueRequest((done: any) => {

                        let data = this.collection.getRow(row);

                        if (data) {
                            done();
                            resolve(data);
                        } else {

                            options = options ? options : {};
                            rowToGet = overrideCache ? row : this.collection.getClosestPage(row, this.pageSize);
                            let dataURI = this.dataURI;
                            let method = 'entityset';

                            if (this.collection.entityset) {
                                dataURI = this.collection.entityset;
                            } else {
                                method = null;
                            }

                            let restString = this.restApi.generateRestString(dataURI, {
                                skip: rowToGet,
                                top: options.override_pageSize || this.pageSize,
                                timeout: options.override_timeout || this.timeout,
                                filterAttributes: options.override_method || this.filterAttributes,
                                method: options.override_method || 'entityset'
                            });

                            this.restApi.callServer(restString).then((data: any) => {
                                this.collection.add(data);
                                let entity = this.collection.getRow(row);

                                if (entity) {
                                    done();
                                    resolve(entity);
                                } else {
                                    done();
                                    reject({
                                        error: 'entity out of range'
                                    });
                                }

                            }).catch((err: any) => {
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
    }

    public orderby(orderByArray: any, options: any) {
        return new Promise((resolve, reject) => {
            this.__stopAllRequest();
            this.resetCurrentEntity();
            this.__queueRequest((done: any) => {

                options = options ? options : {};
                let dataURI = this.collection.entityset ?
                    this.collection.entityset : this.dataURI + '/$entityset/' + this.__guid();
                let releaseEntitySet = options.releaseEntitySet;

                let restString = this.restApi.generateRestString(dataURI, {
                    skip: 0,
                    top: options.override_pageSize || this.pageSize,
                    orderby: orderByArray || this.savedOrderby,
                    savedQueryString: this.savedQueryString,
                    timeout: options.override_timeout || this.timeout,
                    method: options.override_method || 'entityset',
                    addToSet: options.override_addToSet || this.collection.addToSet,
                    filterAttributes: options.override_method || this.filterAttributes,
                    keepSelection: options.override_keepSelection || this.selection.prepareToSend()
                });

                this.restApi.callServer(restString).then((data: any) => {

                    let entitySet;
                    if (releaseEntitySet) {
                        entitySet = this.collection.entityset;
                    }

                    this.savedOrderby = orderByArray ? orderByArray : this.savedOrderby;

                    this.collection.replace(data);

                    if (this.collection.addToSet.length > 0) {
                        this.collection.addToSet = [];
                    }

                    if (data.__transformedSelection) {
                        this.selection.setSelectionFromServer(data.__transformedSelection);
                    }

                    this.__triggerEvent('collection_sorted');

                    if (entitySet) {
                        this.releaseEntitySet(entitySet);
                    }

                    done();
                    resolve(data);

                }).catch((err: any) => {
                    // clear data here ? not the best thing to do, maybe let that be up to the error handling from user
                    // this.collection.replace({});
                    // this.__triggerEvent("collectionChange");
                    done();
                    reject({
                        error: err
                    });
                });
            });
        });
    }

    public clearCache(row: any) {
        return new Promise((resolve, reject) => {
            this.__stopAllRequest();
            this.resetCurrentEntity();
            this.collection.clearCache().then(() => {
                this.entity = null;
                if (typeof row === 'number') {
                    this.getElement(row, null, true).then(() => {
                        setTimeout(() => {
                            resolve();
                            this.__triggerEvent('collectionChange_update');
                        }, 300);

                    }).catch((err) => {
                        reject({
                            error: err
                        });
                        this.__triggerEvent('collectionChange_update');
                    });
                } else {
                    this.__triggerEvent('collectionChange_update');
                    resolve();
                }

            });
        });
    }

    public addNewElement() {
        this.collection.addRow().then(() => {
            this.selection.select(this.collection.length - 1, false);
            this.__triggerEvent('collectionChange_newAdded');
            this.select(this.collection.length - 1);
        });
    }

    public __guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        let uuid = '' + s4() + '' + s4() + '' + s4() + '' + s4() + '' + s4() + '' + s4() + '' + s4() + '' + s4();
        return uuid.toUpperCase();
    }

    public saveCurrent(entityObject: any, options: any) {
        return new Promise((resolve, reject) => {
            this.__stopAllRequest();

            this.__queueRequest((done: any) => {

                options = options ? options : {};
                let dataURI = this.collection.entityset ? this.collection.entityset : this.dataURI + '/';
                let entity = entityObject || this.entity;
                entity = entity ? entity : {};

                if (entity && entity.__isModified) {

                    let restString = this.restApi.generateRestString(dataURI, {
                        method: 'update'

                    });

                    let unsavedValues = entity.__getUnsaved();

                    let requestOptions = {
                        body: unsavedValues,
                        method: 'post'
                    };

                    if (entity.__isNew) {
                        requestOptions.body.__ISNEW = true;
                        if (entity.hasOwnProperty(this.key)) {
                            delete requestOptions.body[this.key];
                        }
                    }

                    this.restApi.callServer(restString, requestOptions).then((data: any) => {

                        // update key array and add to "$addToSet" so entityset can be updated
                        if (entity.__isNew) {
                            let newKeyIndex = this.collection.data.indexOf(entity);
                            this.collection.keys[newKeyIndex] = data.__KEY;
                            this.collection.addToSet.push(data.__KEY);
                        }

                        entity.__update(data);
                        done();
                        resolve(entity);

                    }).catch((err: any) => {

                        if (err.__ERROR) {
                            try {
                                if (!entity.__isNew) {
                                    entity.__update(err); // do I want to save anyway , should add option for this??
                                }
                            } catch (e) {
                                console.warn('need to check save error... '); // just for testing
                            }
                            done();
                            reject({
                                error: err,
                                changedValues: unsavedValues,
                                // tslint:disable-next-line:object-literal-shorthand
                                entity: entity
                            });
                        } else {
                            reject({
                                error: err
                            });
                        }

                    });
                } else {
                    if (this.entity) {
                        if (!entity.__isModified) {
                            reject({
                                error: 'entity is not modified, nothing to save'
                            });
                        }
                    } else {
                        reject({
                            error: 'no current entity'
                        });
                    }

                }
            });
        });

    }

    public refreshCurrent(entityObject: any, options: any) {
        return new Promise((resolve, reject) => {
            this.__stopAllRequest();

            this.__queueRequest((done: any) => {

                options = options ? options : {};
                let dataURI = this.dataURI + '/';
                let entity = entityObject || this.entity;

                if (entity) {

                    let restString = this.restApi.generateRestString(dataURI, { // dataURI, {
                        method: 'update',
                        refreshOnly: true
                    });

                    let requestOptions = {
                        body: entity.__getUnsaved(true),
                        method: 'post'
                    };

                    if (entity.__isNew) {
                        requestOptions.body.__ISNEW = true;
                        if (entity.hasOwnProperty(this.key)) {
                            delete requestOptions.body[this.key];
                        }
                        if (entity.hasOwnProperty('__KEY')) {
                            delete requestOptions.body['__KEY'];
                        }
                    }

                    this.restApi.callServer(restString, requestOptions).then((data: any) => {

                        // update key array and add to "$addToSet" so entityset can be updated
                        if (entity.__isNew) {
                            let newKeyIndex = this.collection.data.indexOf(entity);
                            this.collection.keys[newKeyIndex] = data.__KEY;
                            this.collection.addToSet.push(data.__KEY);
                        }

                        entity.__refreshOnly(data);
                        done();
                        resolve(entity);

                    }).catch((err: any) => {
                        if (err.__ERROR) {
                            try {
                                if (!entity.__isNew) {
                                    entity.__update(err); // do I want to save anyway , should add option for this??
                                }
                            } catch (e) {
                                console.warn('refresh error'); // just for testing during development
                                console.warn(e);
                            }
                        }
                        done();
                        reject({
                            error: err
                        });
                    });
                } else {
                    reject({
                        messerrorage: 'no current entity to save'
                    });
                }
            });
        });

    }

    public resetCollection() {
        this.__stopAllRequest();
        this.resetCurrentEntity();
        this.collection = new WakCollection(this.attributes, this.dataURI);
        this.selection = new WakSelection(this.multiSelect, this);
        this.__triggerEvent('collectionChange');
    }

    public saveAll(options: any) {
        return new Promise((resolve, reject) => {
            this.__stopAllRequest();

            this.__queueRequest((done: any) => {

                options = options ? options : {};
                let dataURI = this.dataURI + '/';
                let entities = this.collection.getModified();

                if (entities.length > 0) {

                    let restString = this.restApi.generateRestString(dataURI, { // dataURI, {
                        method: 'update'
                    });

                    let postData: any[] = [];
                    entities.forEach((entity: any) => {
                        let tempData = entity.__getUnsaved();
                        if (entity.__isNew) {
                            tempData.__ISNEW = true;
                            if (tempData.hasOwnProperty(this.key)) {
                                delete tempData[this.key];
                            }
                        }
                        postData.push(tempData);
                    });

                    let requestOptions = {
                        body: postData,
                        method: 'post'
                    };

                    this.restApi.callServer(restString, requestOptions).then((result: any) => {
                        entities.forEach((ent: any, i: any) => {
                            let updatedData = result.__ENTITIES[i];
                            // update key array and add to "$addToSet" so entityset can be updated
                            if (ent.__isNew) {
                                let newKeyIndex = this.collection.data.indexOf(ent);
                                this.collection.keys[newKeyIndex] = updatedData.__KEY;
                                this.collection.addToSet.push(updatedData.__KEY);
                            }
                            ent.__update(updatedData);
                            done();
                            resolve(entities);
                        });
                    }).catch((err: any) => {
                        entities.forEach((ent: any, i: any) => {
                            let updatedData = err.__ENTITIES[i];
                            if (updatedData.__ERROR) {
                                if (!ent.__isNew) {
                                    // do I want to save anyway, need to have this as a option?
                                    ent.__update(updatedData);
                                }
                            } else {
                                // update key array and add to "$addToSet" so entityset can be updated
                                if (ent.__isNew) {
                                    let newKeyIndex = this.collection.data.indexOf(ent);
                                    this.collection.keys[newKeyIndex] = updatedData.__KEY;
                                    this.collection.addToSet.push(updatedData.__KEY);
                                }
                                ent.__update(updatedData);
                            }
                        });
                        done();
                        reject({
                            error: err,
                            changedValues: postData,
                            // tslint:disable-next-line:object-literal-shorthand
                            entities: entities
                        });
                    });
                } else {
                    reject({
                        error: 'no modified entities to save'
                    });
                }
            });
        });
    }

    public deleteCurrent(options: any) {
        return new Promise((resolve, reject) => {

            let entity = this.entity;

            if (entity) {
                entity = this.entity[this.key];
            }

            if (entity) {

                options = options ? options : {};
                let dataURI = this.collection.entityset;
                let row = this.collection.getRowFromEntity(this.entity);
                let overbyArray = options.override_orderby || this.savedOrderby;

                let restString = this.restApi.generateRestString(dataURI, {
                    skip: row,
                    top: options.override_pageSize || this.pageSize,
                    orderby: overbyArray,
                    timeout: options.override_timeout || this.timeout,
                    filterAttributes: options.override_filterAttributes || this.filterAttributes,
                    removeAtPos: row
                });

                this.restApi.callServer(restString).then((data: any) => {
                    data.__ENTITYSET = this.collection.entityset;
                    this.collection.removeUnsavedRow(row);
                    this.collection.insertData(data);
                    this.entity = null;
                    if (this.collection.length > row) {
                        this.select(row);
                        this.selection.select(row);
                    } else {
                        if (this.collection.length > 0) {
                            this.select(this.collection.length - 1);
                            this.selection.select(this.collection.length - 1);
                        }
                    }
                    this.__triggerEvent('collectionChange_oneRemoved');
                    resolve(data);
                }).catch((err: any) => {
                    reject({
                        error: err
                    });
                });

            } else {

                if (this.entity === null) {
                    reject({
                        error: 'no currentEntity'
                    });
                } else {
                    let row = this.collection.getRowFromEntity(this.entity);
                    this.collection.removeUnsavedRow(row);
                    this.entity = null;
                    if (this.collection.length > row) {
                        this.select(row);
                        this.selection.select(row);
                    } else {
                        if (this.collection.length > 0) {
                            this.select(this.collection.length - 1);
                            this.selection.select(this.collection.length - 1);
                        }
                    }
                    this.__triggerEvent('collectionChange_oneRemoved');
                    resolve();
                }
            }
        });
    }
}
