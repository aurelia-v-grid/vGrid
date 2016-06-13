'use strict';

System.register(['aurelia-fetch-client'], function (_export, _context) {
  "use strict";

  var HttpClient, json, RemoteData;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
      json = _aureliaFetchClient.json;
    }],
    execute: function () {
      _export('RemoteData', RemoteData = function () {
        function RemoteData(baseUrl, dataApi) {
          _classCallCheck(this, RemoteData);

          this.http = new HttpClient();
          this.baseUrl = baseUrl;
          this.dataApi = dataApi;
          this.queryString = null;
          this.orderbyString = null;
          this.limit = null;
          this.offset = null;
          this.length = null;
          this.configureHttp();
        }

        RemoteData.prototype.configureHttp = function configureHttp() {
          var _this = this;

          this.http.configure(function (config) {
            config.withBaseUrl(_this.baseUrl).withDefaults({
              credentials: 'same-origin'
            });
          });
        };

        RemoteData.prototype.getData = function getData() {
          var _this2 = this;

          return new Promise(function (resolve, reject) {

            var params = '';

            if (_this2.queryString) {
              params = '?' + _this2.queryString;
            }

            if (_this2.orderbyString) {
              var op = params ? '&' : '?';
              params = params + op + _this2.orderbyString;
            }

            if (_this2.limit) {
              var op = params ? '&' : '?';
              params = params + op + 'sqlLimit=' + _this2.limit;
            }

            if (_this2.offset) {
              var op = params ? '&' : '?';
              params = params + op + 'sqlOffset=' + _this2.offset;
            }

            console.log('request params:' + params);

            var encodedString = params !== '' ? window.encodeURI(params) : '';

            _this2.http.fetch(_this2.dataApi + encodedString).then(function (response) {
              return response.json();
            }).then(function (data) {

              if (data.success = true) {
                _this2.length = data.length;
                resolve({ col: data.result, length: data.length, limit: 40 });
              } else {
                _this2.length = 0;
                reject({ error: data.error });
              }
            });
          });
        };

        RemoteData.prototype.setLimit = function setLimit(x) {
          this.limit = x || 40;
        };

        RemoteData.prototype.setOffset = function setOffset(x) {
          this.offset = x || 0;
        };

        RemoteData.prototype.createOrderByString = function createOrderByString(orderByArray) {
          if (orderByArray) {
            var sortString = null;
            orderByArray.forEach(function (param, index) {
              if (index === 0) {
                sortString = 'sqlOrderby=';
              } else {
                sortString = sortString + ',';
              }
              sortString = sortString + (param.attribute + ' ' + (param.asc ? "asc" : "desc"));
            });
            this.orderbyString = sortString;
          } else {
            this.orderbyString = null;
          }
        };

        RemoteData.prototype.createQueryString = function createQueryString(queryArray) {
          if (queryArray) {
            var queryString = null;
            queryArray.forEach(function (param, index) {
              if (index === 0) {
                queryString = 'sqlQuery=';
              } else {
                queryString = queryString + ' and ';
              }
              switch (param.operator) {
                case "=":
                  queryString = queryString + (param.attribute + ' = "' + param.value + '"');
                  break;
                case "*":
                  queryString = queryString + (param.attribute + ' LIKE "%' + param.value + '%"');
                  break;
                case "!=":
                  queryString = queryString + (param.attribute + ' IS NOT "' + param.value + '"');
                  break;
                case "<":
                  queryString = queryString + (param.attribute + ' ' + param.operator + ' "' + param.value + '"');
                  break;
                case ">":
                  queryString = queryString + (param.attribute + ' ' + param.operator + ' "' + param.value + '"');
                  break;
                case "<=":
                  queryString = queryString + (param.attribute + ' ' + param.operator + ' "' + param.value + '"');
                  break;
                case ">=":
                  queryString = queryString + (param.attribute + ' ' + param.operator + ' "' + param.value + '"');
                  break;
                case "*=":
                  queryString = queryString + (param.attribute + ' LIKE "' + param.value + '%"');
                  break;
                case "=*":
                  queryString = queryString + (param.attribute + ' LIKE "%' + param.value + '"');
                  break;
                case "!*":
                  queryString = queryString + (param.attribute + ' IS NOT "%' + param.value + '%"');
                  break;
              }
            });
            this.queryString = queryString;
          } else {
            this.queryString = null;
          }
        };

        return RemoteData;
      }());

      _export('RemoteData', RemoteData);
    }
  };
});
//# sourceMappingURL=remoteData.js.map
