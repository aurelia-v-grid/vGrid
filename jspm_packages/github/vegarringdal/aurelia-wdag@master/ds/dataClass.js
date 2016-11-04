/* */ 
define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var DataClass = exports.DataClass = function () {
        function DataClass(dataClass, restApi) {
            var _this = this;

            _classCallCheck(this, DataClass);

            var c = dataClass;
            var attributes = c.attributes;
            var methods = c.methods;

            this.restApi = restApi;

            this.name = c.name;
            this.collectionName = c.collectionName;
            this.dataURI = c.dataURI;
            this.scope = c.scope;
            this.key = c.key[0].name;

            this.attributes = {};
            if (attributes) {
                attributes.forEach(function (attribute) {
                    _this.attributes[attribute.name] = {};
                    for (var k in attribute) {
                        _this.attributes[attribute.name][k] = attribute[k];
                    }
                });
            }

            this.entityCollectionMethods = {};
            this.entityMethods = {};
            this.dataClassMethods = {};
            if (methods) {
                methods.forEach(function (method) {
                    _this[method.applyTo + "Methods"][method.name] = {};
                    for (var k in method) {
                        _this[method.applyTo + "Methods"][method.name][k] = method[k];
                    }
                });
            }
        }

        DataClass.prototype.query = function query(queryString, options) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                options = options === undefined ? {} : options;

                var restString = _this2.restApi.generateRestString(_this2.dataURI, {
                    top: options.pageSize || 40,
                    orderby: options.orderByArray || null,
                    asArray: options.asArray || null,
                    autoExpand: options.autoExpand || null,
                    timeout: options.timeout || null,
                    filterAttributes: options.filterAttributes || null,
                    method: options.method || null
                });

                _this2.restApi.callServer(restString).then(function (data) {

                    resolve(data);
                }).catch(function (err) {

                    done();
                    reject(err);
                });
            });
        };

        DataClass.prototype.save = function save(data, options) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                options = options === undefined ? {} : options;

                var restString = _this3.restApi.generateRestString(_this3.dataURI, {
                    method: "update"
                });

                var requestOptions = {
                    body: data,
                    method: "post"
                };

                _this3.restApi.callServer(restString, requestOptions).then(function (result) {
                    resolve(result);
                }).catch(function (err) {
                    reject(err);
                });
            });
        };

        return DataClass;
    }();
});