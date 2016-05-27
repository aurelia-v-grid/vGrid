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
//# sourceMappingURL=data:application/json;base64,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LFFBQTFDLFVBQXVELE1BQU0sS0FBN0QsT0FBZDtBQUNBO0FBQ0YscUJBQUssSUFBTDtBQUNFLGdDQUFjLGVBQWlCLE1BQU0sU0FBdkIsU0FBb0MsTUFBTSxRQUExQyxVQUF1RCxNQUFNLEtBQTdELE9BQWQ7QUFDQTtBQUNGLHFCQUFLLElBQUw7QUFDRSxnQ0FBYyxlQUFpQixNQUFNLFNBQXZCLGVBQTBDLE1BQU0sS0FBaEQsUUFBZDtBQUNBO0FBQ0YscUJBQUssSUFBTDtBQUNFLGdDQUFjLGVBQWlCLE1BQU0sU0FBdkIsZ0JBQTJDLE1BQU0sS0FBakQsT0FBZDtBQUNBO0FBQ0YscUJBQUssSUFBTDtBQUNFLGdDQUFjLGVBQWlCLE1BQU0sU0FBdkIsa0JBQTZDLE1BQU0sS0FBbkQsUUFBZDtBQUNBO0FBOUJKO0FBZ0NELGFBdENEO0FBdUNBLGlCQUFLLFdBQUwsR0FBbUIsV0FBbkI7QUFDSCxXQTFDRCxNQTBDTztBQUNMLGlCQUFLLFdBQUwsR0FBbUIsSUFBbkI7QUFDRDtBQUNGLFMiLCJmaWxlIjoicmVtb3RlL3JlbW90ZURhdGEuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
