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

    var ClassMethod = exports.ClassMethod = function () {
        function ClassMethod(source, name) {
            _classCallCheck(this, ClassMethod);

            this.source = source;
            this.name = name;
        }

        ClassMethod.prototype.execute = function execute(params, options) {
            var _this = this;

            return new Promise(function (resolve, reject) {

                options = options === undefined ? {} : options;
                var asPost = true === options.asPost;
                var dataURI = _this.source.dataURI + "/" + _this.name;

                var restString = _this.source.restApi.generateRestString(dataURI, {
                    params: options.asPost ? null : params
                });

                var requestOptions = {
                    body: asPost ? params : null,
                    method: asPost ? "post" : "get"
                };

                _this.source.restApi.callServer(restString, requestOptions).then(function (data) {
                    resolve(data);
                }).catch(function (err) {
                    reject(err);
                });
            });
        };

        return ClassMethod;
    }();
});