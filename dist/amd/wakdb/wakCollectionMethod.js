define(["require", "exports"], function (require, exports) {
    var WakCollectionMethod = (function () {
        function WakCollectionMethod(source, name) {
            this.source = source;
            this.name = name;
        }
        WakCollectionMethod.prototype.execute = function (params, options) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.source.__queueRequest(function (done) {
                    if (_this.source.collection.entityset) {
                        options = options === undefined ? {} : options;
                        var asPost = true === options.asPost;
                        var dataURI = _this.source.dataURI +
                            '/' +
                            _this.name +
                            _this.source.collection.entityset.replace(_this.source.dataURI, '');
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
                        reject({
                            message: 'no collection'
                        });
                    }
                });
            });
        };
        return WakCollectionMethod;
    }());
    exports.WakCollectionMethod = WakCollectionMethod;
});

//# sourceMappingURL=wakCollectionMethod.js.map
