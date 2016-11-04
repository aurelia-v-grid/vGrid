/* */ 
define(['exports', 'aurelia-fetch-client', './dataClass', './dataSource', './restUtil', './directory'], function (exports, _aureliaFetchClient, _dataClass, _dataSource, _restUtil, _directory) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RestApi = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var RestApi = exports.RestApi = function () {
        function RestApi() {
            _classCallCheck(this, RestApi);

            this.rest = new _restUtil.RestUtil();
            this.ready = false;
            this.loadFailed = false;
        }

        RestApi.prototype.generateRestString = function generateRestString(url, options) {
            return this.rest.generateRestString(url, options);
        };

        RestApi.prototype.loaded = function loaded() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var _waiting = void 0;
                _waiting = function waiting() {
                    setTimeout(function () {
                        if (_this.ready) {
                            resolve();
                        } else {
                            if (_this.loadFailed) {
                                throw "restApi failed";
                            } else {
                                _waiting();
                            }
                        }
                    }, 100);
                };
                if (_this.ready) {
                    resolve();
                } else {
                    _waiting();
                }
            });
        };

        RestApi.prototype.callServer = function callServer(url, options) {
            var _this2 = this;

            if (!options) {
                options = {};
                options.method = "get";
                options.body = null;
            } else {
                options.body = options.body ? JSON.stringify(options.body) : null;
                options.method = options.method || "get";
            }
            return new Promise(function (resolve, reject) {
                var responseData = void 0;
                _this2.httpClient.fetch(_this2.baseURL + url, {
                    method: options.method,
                    body: options.body
                }).then(function (response) {
                    responseData = response;
                    return response.json();
                }).then(function (data) {
                    if (responseData.ok) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                }).catch(function (err) {
                    reject(err);
                });
            });
        };

        RestApi.prototype.configure = function configure(config) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3.name = config.name;
                _this3.baseURL = config.baseURL;
                _this3.catalogURL = "/rest/$catalog/$all";
                _this3.httpClient = new _aureliaFetchClient.HttpClient();
                _this3.directory = new _directory.Directory(_this3);
                _this3.pageSize = config.pageSize || 40;
                _this3.timeout = config.timeout || 3600 * 5;
                _this3.classes = {};
                _this3.sources = {};
                _this3.configureHttp();
                if (config.localConfig) {
                    return _this3.localCatalog(config.localConfig).then(function () {
                        _this3.createDataSources(config.sources).then(function () {
                            _this3.ready = true;
                        });
                    }).then(function () {
                        resolve();
                    }).catch(function (err) {
                        _this3.loadFailed = true;
                        reject(err);
                    });
                } else {
                    return _this3.fetchCatalog().then(function () {
                        _this3.createDataSources(config.sources).then(function () {
                            _this3.ready = true;
                        });
                    }).then(function () {
                        resolve();
                    }).catch(function (err) {
                        _this3.loadFailed = true;
                        reject(err);
                    });
                }
            });
        };

        RestApi.prototype.configureHttp = function configureHttp() {
            var _this4 = this;

            this.httpClient.configure(function (config) {
                config.withBaseUrl(_this4.baseURL).withDefaults({
                    credentials: 'include',
                    mode: 'cors'
                });
            });
        };

        RestApi.prototype.createDataSources = function createDataSources(sources) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                sources.forEach(function (source) {
                    if (_this5.classes[source.dataClass]) {
                        _this5.sources[source.name] = new _dataSource.DataSource(_this5, source);
                    } else {
                        throw "class:" + source.dataClass + " does not exsist";
                    }
                });
                resolve();
            }).catch(function (err) {
                throw err;
            });
        };

        RestApi.prototype.localCatalog = function localCatalog(data) {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                var restAPI = _this6;
                var dataClasses = data.dataClasses;
                if (dataClasses.length) {
                    dataClasses.forEach(function (dataClass) {
                        _this6.classes[dataClass.className] = new _dataClass.DataClass(dataClass, restAPI);
                    });
                    resolve();
                } else {
                    reject();
                }
            });
        };

        RestApi.prototype.fetchCatalog = function fetchCatalog() {
            var _this7 = this;

            return new Promise(function (resolve, reject) {
                _this7.httpClient.fetch(_this7.catalogURL).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    var restAPI = _this7;
                    var dataClasses = data.dataClasses;
                    if (dataClasses.length) {
                        dataClasses.forEach(function (dataClass) {
                            _this7.classes[dataClass.className] = new _dataClass.DataClass(dataClass, restAPI);
                        });
                        resolve();
                    } else {
                        reject();
                    }
                }).catch(function (err) {
                    reject(err);
                });
            });
        };

        return RestApi;
    }();
});