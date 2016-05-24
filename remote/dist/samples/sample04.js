'use strict';

System.register(['aurelia-fetch-client'], function (_export, _context) {
  "use strict";

  var HttpClient, json, _class, _temp, sample01;

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
      _export('sample01', sample01 = (_temp = _class = function () {
        sample01.prototype.callRemoteServer = function callRemoteServer(filterArray, orderByArray, callback) {

          var sortString = '?sqlOrderby=';
          if (orderByArray) {
            orderByArray.forEach(function (param) {
              if (sortString !== '?sqlOrderby=') {
                sortString = sortString + ',';
              }
              sortString = sortString + (param.attribute + ' ' + (param.asc ? "asc" : "desc"));
            });
          }
          if (filterArray) {
            var filterString = sortString !== '?sqlOrderby=' ? '&sqlQuery=' : '?sqlQuery=';
            filterArray.forEach(function (param) {
              if (filterString.length !== 10) {
                filterString = filterString + ' and ';
              }
              switch (param.operator) {
                case "=":
                  filterString = filterString + (param.attribute + ' = "' + param.value + '"');
                  break;
                case "*":
                  filterString = filterString + (param.attribute + ' LIKE "%' + param.value + '%"');
                  break;
                case "!=":
                  filterString = filterString + (param.attribute + ' IS NOT "' + param.value + '"');
                  break;
                case "<":
                  filterString = filterString + (param.attribute + ' ' + param.operator + ' "' + param.value + '"');
                  break;
                case ">":
                  filterString = filterString + (param.attribute + ' ' + param.operator + ' "' + param.value + '"');
                  break;
                case "<=":
                  filterString = filterString + (param.attribute + ' ' + param.operator + ' "' + param.value + '"');
                  break;
                case ">=":
                  filterString = filterString + (param.attribute + ' ' + param.operator + ' "' + param.value + '"');
                  break;
                case "*=":
                  filterString = filterString + (param.attribute + ' LIKE "' + param.value + '%"');
                  break;
                case "=*":
                  filterString = filterString + (param.attribute + ' LIKE "%' + param.value + '"');
                  break;
                case "!*":
                  filterString = filterString + (param.attribute + ' IS NOT "%' + param.value + '%"');
                  break;
              }
            });
            var urlencode = sortString !== '?sqlOrderby=' ? window.encodeURI(sortString + filterString) : window.encodeURI(filterString);
          } else {
            var urlencode = window.encodeURI(sortString);
          }

          this.http.fetch('data/people/' + urlencode).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.success) {
              callback(data.result);
            } else {
              callback([]);
            }
          });
        };

        sample01.prototype.onSort = function onSort(orderByArray, callback) {
          var sortString = '?sqlOrderby=';
          orderByArray.forEach(function (param) {
            if (sortString !== '?sqlOrderby=') {
              sortString = sortString + ',';
            }
            sortString = sortString + (param.attribute + ' ' + (param.asc ? "asc" : "desc"));
          });

          var urlencode = window.encodeURI(sortString);

          this.http.fetch('data/people/' + urlencode).then(function (response) {
            return response.json();
          }).then(function (data) {
            callback(data.result);
          });
        };

        function sample01(element, http) {
          _classCallCheck(this, sample01);

          this.myCollection = [];
          this.myCurrentEntity = {};
          this.myGrid = {};

          this.element = element;

          http.configure(function (config) {
            config.withBaseUrl('http://data-nodedataapi.rhcloud.com/').withDefaults({
              credentials: 'same-origin'
            });
          });
          this.http = http;
        }

        sample01.prototype.attached = function attached() {
          var _this = this;

          this.getMaxRows = this.myGrid.ctx.getMaxRows();
          this.myGrid.ctx.setLoadingOverlay(true);
          this.http.fetch('data/people').then(function (response) {
            return response.json();
          }).then(function (data) {

            _this.myCollection = data.result;
            _this.myGrid.ctx.setLoadingOverlay(false);
          });
        };

        return sample01;
      }(), _class.inject = [Element, HttpClient], _temp));

      _export('sample01', sample01);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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YyxRLEVBQVU7QUFHN0IsY0FBSSxhQUFhLGNBQWpCO0FBQ0EsdUJBQWEsT0FBYixDQUFxQixVQUFDLEtBQUQsRUFBVTtBQUM3QixnQkFBSSxlQUFlLGNBQW5CLEVBQW1DO0FBQ2pDLDJCQUFhLGFBQWEsR0FBMUI7QUFDRDtBQUNELHlCQUFhLGNBQWdCLE1BQU0sU0FBdEIsVUFBbUMsTUFBTSxHQUFOLEdBQVksS0FBWixHQUFvQixNQUF2RCxFQUFiO0FBQ0QsV0FMRDs7QUFRQSxjQUFJLFlBQVksT0FBTyxTQUFQLENBQWlCLFVBQWpCLENBQWhCOztBQUdBLGVBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsaUJBQWlCLFNBQWpDLEVBQ0csSUFESCxDQUNRO0FBQUEsbUJBQVksU0FBUyxJQUFULEVBQVo7QUFBQSxXQURSLEVBRUcsSUFGSCxDQUVRLGdCQUFRO0FBQ1oscUJBQVMsS0FBSyxNQUFkO0FBQ0QsV0FKSDtBQU1ELFM7O0FBTUQsMEJBQVksT0FBWixFQUFxQixJQUFyQixFQUEyQjtBQUFBOztBQUFBLGVBckczQixZQXFHMkIsR0FyR1osRUFxR1k7QUFBQSxlQXBHM0IsZUFvRzJCLEdBcEdULEVBb0dTO0FBQUEsZUFuRzNCLE1BbUcyQixHQW5HbEIsRUFtR2tCOztBQUV6QixlQUFLLE9BQUwsR0FBZSxPQUFmOztBQUdBLGVBQUssU0FBTCxDQUFlLGtCQUFVO0FBQ3ZCLG1CQUNHLFdBREgsQ0FDZSxzQ0FEZixFQUVHLFlBRkgsQ0FFZ0I7QUFDWiwyQkFBYTtBQURELGFBRmhCO0FBS0QsV0FORDtBQU9BLGVBQUssSUFBTCxHQUFZLElBQVo7QUFLRDs7MkJBTUQsUSx1QkFBVztBQUFBOztBQUNULGVBQUssVUFBTCxHQUFrQixLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFVBQWhCLEVBQWxCO0FBQ0EsZUFBSyxNQUFMLENBQVksR0FBWixDQUFnQixpQkFBaEIsQ0FBa0MsSUFBbEM7QUFDQSxlQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLGFBQWhCLEVBQ0csSUFESCxDQUNRO0FBQUEsbUJBQVksU0FBUyxJQUFULEVBQVo7QUFBQSxXQURSLEVBRUcsSUFGSCxDQUVRLGdCQUFROztBQUVaLGtCQUFLLFlBQUwsR0FBb0IsS0FBSyxNQUF6QjtBQUNBLGtCQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGlCQUFoQixDQUFrQyxLQUFsQztBQUNELFdBTkg7QUFRRCxTOzs7a0JBOUlNLE0sR0FBUyxDQUFDLE9BQUQsRUFBVSxVQUFWLEMiLCJmaWxlIjoic2FtcGxlcy9zYW1wbGUwNC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
