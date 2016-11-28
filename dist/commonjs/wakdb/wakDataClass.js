var WakDataClass = (function () {
    function WakDataClass(dataClass, restApi) {
        var _this = this;
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
                    if (attribute.hasOwnProperty(k)) {
                        _this.attributes[attribute.name][k] = attribute[k];
                    }
                }
            });
        }
        this.entityCollectionMethods = {};
        this.entityMethods = {};
        this.dataClassMethods = {};
        if (methods) {
            methods.forEach(function (method) {
                _this[method.applyTo + 'Methods'][method.name] = {};
                for (var k in method) {
                    if (method.hasOwnProperty(k)) {
                        _this[method.applyTo + 'Methods'][method.name][k] = method[k];
                    }
                }
            });
        }
    }
    WakDataClass.prototype.query = function (queryString, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            options = options === undefined ? {} : options;
            var restString = _this.restApi.generateRestString(_this.dataURI, {
                top: options.pageSize || 40,
                filter: queryString,
                orderby: options.orderByArray || null,
                asArray: options.asArray || null,
                autoExpand: options.autoExpand || null,
                timeout: options.timeout || null,
                filterAttributes: options.filterAttributes || null,
                method: options.method || null
            });
            _this.restApi.callServer(restString).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject({
                    error: err
                });
            });
        });
    };
    WakDataClass.prototype.save = function (data, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            options = options === undefined ? {} : options;
            var restString = _this.restApi.generateRestString(_this.dataURI, {
                method: 'update'
            });
            var requestOptions = {
                body: data,
                method: 'post'
            };
            _this.restApi.callServer(restString, requestOptions).then(function (result) {
                resolve(result);
            }).catch(function (err) {
                reject({
                    error: err
                });
            });
        });
    };
    return WakDataClass;
}());
exports.WakDataClass = WakDataClass;

//# sourceMappingURL=wakDataClass.js.map
