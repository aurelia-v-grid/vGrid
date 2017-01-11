define(["require", "exports"], function (require, exports) {
    var WakClassMethod = (function () {
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
    exports.WakClassMethod = WakClassMethod;
});

//# sourceMappingURL=wakClassMethod.js.map
