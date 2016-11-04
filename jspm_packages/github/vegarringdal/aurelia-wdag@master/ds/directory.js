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

    var Directory = exports.Directory = function () {
        function Directory(restApi) {
            _classCallCheck(this, Directory);

            this.restApi = restApi;
            this.username = this.getCookie("username");
        }

        Directory.prototype.getCookie = function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        };

        Directory.prototype.currentUser = function currentUser() {
            var _this = this;

            return new Promise(function (resolve, reject) {

                var dataURI = "/rest/$directory/currentUser";

                var requestOptions = {
                    body: null,
                    method: "get"
                };

                _this.restApi.callServer(dataURI, requestOptions).then(function (data) {
                    resolve(data);
                }).catch(function (err) {
                    reject(err);
                });
            });
        };

        Directory.prototype.currentUserBelongsTo = function currentUserBelongsTo(groups) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                var dataURI = "/rest/$directory/currentUserBelongsTo";

                var requestOptions = {
                    body: groups,
                    method: "post"
                };

                _this2.restApi.callServer(dataURI, requestOptions).then(function (data) {
                    resolve(data);
                }).catch(function (err) {
                    reject(err);
                });
            });
        };

        Directory.prototype.login = function login(username, password, duration) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

                var dataURI = "/rest/$directory/login";

                var requestOptions = {
                    body: [username, password, duration || 3600],
                    method: "post"
                };

                _this3.restApi.callServer(dataURI, requestOptions).then(function (data) {
                    document.cookie = "username=" + username;
                    _this3.username = username;
                    resolve(data);
                }).catch(function (err) {
                    reject(err);
                });
            });
        };

        Directory.prototype.logout = function logout() {
            var _this4 = this;

            return new Promise(function (resolve, reject) {

                var dataURI = "/rest/$directory/logout";

                var requestOptions = {
                    body: null,
                    method: "get"
                };

                _this4.restApi.callServer(dataURI, requestOptions).then(function (data) {
                    document.cookie = "username=";
                    _this4.username = "";
                    resolve(data);
                }).catch(function (err) {
                    reject(err);
                });
            });
        };

        Directory.prototype.loginByKey = function loginByKey(name, key) {};

        Directory.prototype.loginByPassword = function loginByPassword(name, key) {};

        return Directory;
    }();
});