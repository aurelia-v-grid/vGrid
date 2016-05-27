'use strict';

System.register(['aurelia-fetch-client', 'remote/remoteData'], function (_export, _context) {
  "use strict";

  var HttpClient, json, RemoteData, _class, _temp, sample01;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
      json = _aureliaFetchClient.json;
    }, function (_remoteRemoteData) {
      RemoteData = _remoteRemoteData.RemoteData;
    }],
    execute: function () {
      _export('sample01', sample01 = (_temp = _class = function () {
        sample01.prototype.callRemoteServer = function callRemoteServer(param) {

          this.remoteData.createOrderByString(param.sort);
          this.remoteData.createQueryString(param.filter);
          this.remoteData.setLimit(param.limit);
          this.remoteData.setOffset(param.offset);

          return this.remoteData.getData().then(function (data) {
            return data;
          }).catch(function (err) {
            console.error(err);
          });
        };

        sample01.prototype.loadData = function loadData() {
          var _this = this;

          this.myGrid.ctx.setLoadingOverlay(true);
          this.remoteData.getData().then(function (data) {
            _this.myGrid.ctx.setData(data);
          });
        };

        function sample01(element, http) {
          _classCallCheck(this, sample01);

          this.myCollection = [];
          this.myCurrentEntity = {};
          this.myGrid = {};
          this.collectionLength = 0;

          this.element = element;

          http.configure(function (config) {
            config.withBaseUrl('http://data-nodedataapi.rhcloud.com/').withDefaults({
              credentials: 'same-origin'
            });
          });
          this.http = http;

          this.remoteData = new RemoteData('http://data-nodedataapi.rhcloud.com/', 'data/people');
          this.remoteData.limit = 20;
        }

        sample01.prototype.attached = function attached() {
          this.getMaxRows = this.myGrid.ctx.getMaxRows();
          this.loadData();
        };

        return sample01;
      }(), _class.inject = [Element, HttpClient], _temp));

      _export('sample01', sample01);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVEsZ0IsdUJBQUEsVTtBQUFZLFUsdUJBQUEsSTs7QUFDWixnQixxQkFBQSxVOzs7MEJBR0ssUTsyQkFjWCxnQiw2QkFBaUIsSyxFQUFNOztBQUVyQixlQUFLLFVBQUwsQ0FBZ0IsbUJBQWhCLENBQW9DLE1BQU0sSUFBMUM7QUFDQSxlQUFLLFVBQUwsQ0FBZ0IsaUJBQWhCLENBQWtDLE1BQU0sTUFBeEM7QUFDQSxlQUFLLFVBQUwsQ0FBZ0IsUUFBaEIsQ0FBeUIsTUFBTSxLQUEvQjtBQUNBLGVBQUssVUFBTCxDQUFnQixTQUFoQixDQUEwQixNQUFNLE1BQWhDOztBQUVBLGlCQUFPLEtBQUssVUFBTCxDQUFnQixPQUFoQixHQUNKLElBREksQ0FDQyxVQUFDLElBQUQsRUFBUztBQUNiLG1CQUFPLElBQVA7QUFDRCxXQUhJLEVBR0YsS0FIRSxDQUdJLFVBQUMsR0FBRCxFQUFRO0FBQ2pCLG9CQUFRLEtBQVIsQ0FBYyxHQUFkO0FBRUQsV0FOTSxDQUFQO0FBT0QsUzs7MkJBR0QsUSx1QkFBVztBQUFBOztBQUNULGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsaUJBQWhCLENBQWtDLElBQWxDO0FBQ0EsZUFBSyxVQUFMLENBQWdCLE9BQWhCLEdBQ0MsSUFERCxDQUNNLFVBQUMsSUFBRCxFQUFRO0FBQ1osa0JBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsT0FBaEIsQ0FBd0IsSUFBeEI7QUFDRCxXQUhEO0FBSUQsUzs7QUFRRCwwQkFBWSxPQUFaLEVBQXFCLElBQXJCLEVBQTJCO0FBQUE7O0FBQUEsZUFyQzNCLFlBcUMyQixHQXJDWixFQXFDWTtBQUFBLGVBcEMzQixlQW9DMkIsR0FwQ1QsRUFvQ1M7QUFBQSxlQW5DM0IsTUFtQzJCLEdBbkNsQixFQW1Da0I7QUFBQSxlQWpDM0IsZ0JBaUMyQixHQWpDUixDQWlDUTs7QUFFekIsZUFBSyxPQUFMLEdBQWUsT0FBZjs7QUFHQSxlQUFLLFNBQUwsQ0FBZSxrQkFBVTtBQUN2QixtQkFDRyxXQURILENBQ2Usc0NBRGYsRUFFRyxZQUZILENBRWdCO0FBQ1osMkJBQWE7QUFERCxhQUZoQjtBQUtELFdBTkQ7QUFPQSxlQUFLLElBQUwsR0FBWSxJQUFaOztBQUdBLGVBQUssVUFBTCxHQUFrQixJQUFJLFVBQUosQ0FBZSxzQ0FBZixFQUF1RCxhQUF2RCxDQUFsQjtBQUNBLGVBQUssVUFBTCxDQUFnQixLQUFoQixHQUF3QixFQUF4QjtBQUdEOzsyQkFNRCxRLHVCQUFXO0FBQ1QsZUFBSyxVQUFMLEdBQWtCLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBaEIsRUFBbEI7QUFDQSxlQUFLLFFBQUw7QUFHRCxTOzs7a0JBMUVNLE0sR0FBUyxDQUFDLE9BQUQsRUFBVSxVQUFWLEMiLCJmaWxlIjoic2FtcGxlcy9zYW1wbGUwNC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
