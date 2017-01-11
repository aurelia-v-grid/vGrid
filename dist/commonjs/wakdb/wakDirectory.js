var WakDirectory = (function () {
    function WakDirectory(restApi) {
        this.restApi = restApi;
        this.username = this.getCookie('username');
    }
    WakDirectory.prototype.getCookie = function (cname) {
        var name = cname + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    };
    WakDirectory.prototype.currentUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dataURI = '/rest/$directory/currentUser';
            var requestOptions = {
                body: null,
                method: 'get'
            };
            _this.restApi.callServer(dataURI, requestOptions).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject({ error: err });
            });
        });
    };
    WakDirectory.prototype.currentUserBelongsTo = function (groups) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dataURI = '/rest/$directory/currentUserBelongsTo';
            var requestOptions = {
                body: groups,
                method: 'post'
            };
            _this.restApi.callServer(dataURI, requestOptions).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject({ error: err });
            });
        });
    };
    WakDirectory.prototype.login = function (username, password, duration) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dataURI = '/rest/$directory/login';
            var requestOptions = {
                body: [username, password, duration || 3600],
                method: 'post'
            };
            _this.restApi.callServer(dataURI, requestOptions).then(function (data) {
                document.cookie = 'username=' + username;
                _this.username = username;
                resolve(data);
            }).catch(function (err) {
                reject({ error: err });
            });
        });
    };
    WakDirectory.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dataURI = '/rest/$directory/logout';
            var requestOptions = {
                body: null,
                method: 'get'
            };
            _this.restApi.callServer(dataURI, requestOptions).then(function (data) {
                document.cookie = 'username=';
                _this.username = '';
                resolve(data);
            }).catch(function (err) {
                reject({ error: err });
            });
        });
    };
    return WakDirectory;
}());
exports.WakDirectory = WakDirectory;

//# sourceMappingURL=wakDirectory.js.map
