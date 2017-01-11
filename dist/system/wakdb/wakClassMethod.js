System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var WakClassMethod;
    return {
        setters: [],
        execute: function () {
            WakClassMethod = (function () {
                function WakClassMethod(source, name) {
                    this.source = source;
                    this.name = name;
                }
                WakClassMethod.prototype.execute = function (params, options) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        options = options === undefined ? {} : options;
                        var asPost = true === options.asPost;
                        var dataURI = _this.source.dataURI + '/' + _this.name;
                        var restString = _this.source.restApi.generateRestString(dataURI, {
                            params: options.asPost ? null : params
                        });
                        var requestOptions = {
                            body: asPost ? params : null,
                            method: asPost ? 'post' : 'get'
                        };
                        _this.source.restApi.callServer(restString, requestOptions).then(function (data) {
                            resolve(data);
                        }).catch(function (err) {
                            reject(err);
                        });
                    });
                };
                return WakClassMethod;
            }());
            exports_1("WakClassMethod", WakClassMethod);
        }
    };
});

//# sourceMappingURL=wakClassMethod.js.map
