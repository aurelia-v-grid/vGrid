var aurelia_fetch_client_1 = require("aurelia-fetch-client");
var wakDataClass_1 = require("./wakDataClass");
var wakDataSource_1 = require("./wakDataSource");
var wakRestUtil_1 = require("./wakRestUtil");
var wakDirectory_1 = require("./wakDirectory");
var WakRestApi = (function () {
    function WakRestApi() {
        this.rest = new wakRestUtil_1.WakRestUtil();
        this.ready = false;
        this.loadFailed = false;
    }
    WakRestApi.prototype.generateRestString = function (url, options) {
        return this.rest.generateRestString(url, options);
    };
    WakRestApi.prototype.loaded = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var waiting;
            waiting = function () {
                setTimeout(function () {
                    if (_this.ready) {
                        resolve();
                    }
                    else {
                        if (_this.loadFailed) {
                            throw 'restApi failed';
                        }
                        else {
                            waiting();
                        }
                    }
                }, 100);
            };
            if (_this.ready) {
                resolve();
            }
            else {
                waiting();
            }
        });
    };
    WakRestApi.prototype.callServer = function (url, options) {
        var _this = this;
        if (!options) {
            options = {};
            options.method = 'get';
            options.body = null;
        }
        else {
            options.body = options.body ? JSON.stringify(options.body) : null;
            options.method = options.method || 'get';
        }
        return new Promise(function (resolve, reject) {
            var responseData;
            _this.httpClient.fetch(_this.baseURL + url, {
                method: options.method,
                body: options.body
            })
                .then(function (response) {
                responseData = response;
                return response.json();
            })
                .then(function (data) {
                if (responseData.ok) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    WakRestApi.prototype.configure = function (config) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.name = config.name;
            _this.baseURL = config.baseURL;
            _this.catalogURL = '/rest/$catalog/$all';
            _this.httpClient = new aurelia_fetch_client_1.HttpClient();
            _this.directory = new wakDirectory_1.WakDirectory(_this);
            _this.pageSize = config.pageSize || 40;
            _this.timeout = config.timeout || 3600 * 5;
            _this.classes = {};
            _this.sources = {};
            _this.configureHttp();
            if (config.localConfig) {
                return _this.localCatalog(config.localConfig)
                    .then(function () {
                    _this.createDataSources(config.sources).then(function () {
                        _this.ready = true;
                    });
                })
                    .then(function () {
                    resolve();
                })
                    .catch(function (err) {
                    _this.loadFailed = true;
                    reject({ error: err });
                });
            }
            else {
                return _this.fetchCatalog()
                    .then(function () {
                    _this.createDataSources(config.sources).then(function () {
                        _this.ready = true;
                    });
                })
                    .then(function () {
                    resolve();
                })
                    .catch(function (err) {
                    _this.loadFailed = true;
                    reject({ error: err });
                });
            }
        });
    };
    WakRestApi.prototype.configureHttp = function () {
        var _this = this;
        this.httpClient.configure(function (config) {
            config
                .withBaseUrl(_this.baseURL)
                .withDefaults({
                credentials: 'include',
                mode: 'cors'
            });
        });
    };
    WakRestApi.prototype.createDataSources = function (sources) {
        var _this = this;
        return new Promise(function (resolve) {
            sources.forEach(function (source) {
                if (_this.classes[source.dataClass]) {
                    _this.sources[source.name] = new wakDataSource_1.WakDataSource(_this, source);
                }
                else {
                    throw ('class:' + source.dataClass + ' does not exsist');
                }
            });
            resolve();
        })
            .catch(function (err) {
            throw ({ error: err });
        });
    };
    WakRestApi.prototype.localCatalog = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var restAPI = _this;
            var dataClasses = data.dataClasses;
            if (dataClasses.length) {
                dataClasses.forEach(function (dataClass) {
                    _this.classes[dataClass.className] = new wakDataClass_1.WakDataClass(dataClass, restAPI);
                });
                resolve();
            }
            else {
                reject({ error: 'no dataclasses found in catalog' });
            }
        });
    };
    WakRestApi.prototype.fetchCatalog = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.httpClient.fetch(_this.catalogURL)
                .then(function (response) {
                return response.json();
            })
                .then(function (data) {
                var restAPI = _this;
                var dataClasses = data.dataClasses;
                if (dataClasses.length) {
                    dataClasses.forEach(function (dataClass) {
                        _this.classes[dataClass.className] = new wakDataClass_1.WakDataClass(dataClass, restAPI);
                    });
                    resolve();
                }
                else {
                    reject({ error: 'no dataclasses found in catalog' });
                }
            })
                .catch(function (err) {
                reject({ error: err });
            });
        });
    };
    return WakRestApi;
}());
exports.WakRestApi = WakRestApi;

//# sourceMappingURL=wakRestApi.js.map
