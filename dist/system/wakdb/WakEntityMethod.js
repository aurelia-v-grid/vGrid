System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var WakEntityMethod;
    return {
        setters: [],
        execute: function () {
            WakEntityMethod = (function () {
                function WakEntityMethod(source, name) {
                    this.source = source;
                    this.name = name;
                }
                WakEntityMethod.prototype.execute = function (params, options) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.source.__queueRequest(function (done) {
                            var entity = _this.source.entity;
                            if (entity) {
                                entity = _this.source.entity[_this.source.key];
                            }
                            if (entity) {
                                options = options === undefined ? {} : options;
                                var asPost = true === options.asPost;
                                var dataURI = _this.source.dataURI +
                                    '(' + _this.source.entity[_this.source.key] + ')' + '/' +
                                    _this.name;
                                var restString = _this.source.restApi.generateRestString(dataURI, {
                                    params: asPost ? null : params
                                });
                                var requestOptions = {
                                    body: asPost ? params : null,
                                    method: asPost ? 'post' : 'get'
                                };
                                _this.source.restApi.callServer(restString, requestOptions).then(function (data) {
                                    done();
                                    resolve(data);
                                }).catch(function (err) {
                                    done();
                                    reject(err);
                                });
                            }
                            else {
                                done();
                                reject({ message: 'no currentEntity' });
                            }
                        });
                    });
                };
                return WakEntityMethod;
            }());
            exports_1("WakEntityMethod", WakEntityMethod);
        }
    };
});

//# sourceMappingURL=WakEntityMethod.js.map
