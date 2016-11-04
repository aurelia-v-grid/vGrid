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

    var CollectionMethod = exports.CollectionMethod = function () {
        function CollectionMethod(source, name) {
            _classCallCheck(this, CollectionMethod);

            this.source = source;
            this.name = name;
        }

        CollectionMethod.prototype.execute = function execute(params, options) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.source.__queueRequest(function (done) {
                    if (_this.source.collection.entityset) {

                        options = options === undefined ? {} : options;
                        var asPost = true === options.asPost;
                        var dataURI = _this.source.dataURI + "/" + _this.name + _this.source.collection.entityset.replace(_this.source.dataURI, "");
                        var restString = _this.source.restApi.generateRestString(dataURI, {
                            params: asPost ? null : params
                        });

                        var requestOptions = {
                            body: asPost ? params : null,
                            method: asPost ? "post" : "get"
                        };

                        _this.source.restApi.callServer(restString, requestOptions).then(function (data) {
                            done();
                            resolve(data);
                        }).catch(function (err) {
                            done();
                            reject(err);
                        });
                    } else {
                        done();
                        reject({
                            message: "no collection"
                        });
                    }
                });
            });
        };

        return CollectionMethod;
    }();
});