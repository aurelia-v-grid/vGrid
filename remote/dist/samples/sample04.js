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
        sample01.prototype.callRemoteServer = function callRemoteServer(filterArray, orderByArray, callback) {
          var _this = this;

          if (filterArray) {
            this.remoteData.offset = 0;
          }

          this.remoteData.createOrderByString(orderByArray);
          this.remoteData.createQueryString(filterArray);
          this.remoteData.getData().then(function (data) {
            _this.setpager();
            callback(data);
          }).catch(function (err) {
            console.error(err);
            callback([]);
          });
        };

        sample01.prototype.loadData = function loadData() {
          var _this2 = this;

          this.myGrid.ctx.setLoadingOverlay(true);
          this.remoteData.getData().then(function (data) {
            _this2.setpager();
            _this2.myGrid.ctx.keepFilterOnCollectionChange();
            _this2.myCollection = data;
            _this2.myGrid.ctx.setLoadingOverlay(false);
          });
        };

        sample01.prototype.setpager = function setpager() {
          this.collectionLength = this.remoteData.length;
          this.limit = this.remoteData.limit;
          this.offset = this.remoteData.offset;
          this.page = this.offset ? Math.ceil(this.offset / this.limit) + 1 : 1;
          if (this.page === 1) {
            this.statusFirstButton = false;
            this.statusPrevButton = false;
          } else {
            this.statusFirstButton = true;
            this.statusPrevButton = true;
          }

          if (this.offset >= this.collectionLength - this.limit) {
            this.statusNextButton = false;
            this.statusLastButton = false;
          } else {
            this.statusNextButton = true;
            this.statusLastButton = true;
          }
        };

        sample01.prototype.firstBtn = function firstBtn() {
          this.remoteData.offset = 0;
          this.loadData();
        };

        sample01.prototype.nextBtn = function nextBtn() {
          this.remoteData.offset = this.remoteData.offset + this.limit;
          this.loadData();
        };

        sample01.prototype.prevBtn = function prevBtn() {
          this.remoteData.offset = this.remoteData.offset - this.limit;
          this.loadData();
        };

        sample01.prototype.lastBtn = function lastBtn() {
          this.remoteData.offset = this.collectionLength - this.limit;
          this.loadData();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVEsZ0IsdUJBQUEsVTtBQUFZLFUsdUJBQUEsSTs7QUFDWixnQixxQkFBQSxVOzs7MEJBR0ssUTsyQkFjWCxnQiw2QkFBaUIsVyxFQUFhLFksRUFBYyxRLEVBQVM7QUFBQTs7QUFFbkQsY0FBRyxXQUFILEVBQWU7QUFDYixpQkFBSyxVQUFMLENBQWdCLE1BQWhCLEdBQXlCLENBQXpCO0FBQ0Q7O0FBRUQsZUFBSyxVQUFMLENBQWdCLG1CQUFoQixDQUFvQyxZQUFwQztBQUNBLGVBQUssVUFBTCxDQUFnQixpQkFBaEIsQ0FBa0MsV0FBbEM7QUFDQSxlQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsR0FDRyxJQURILENBQ1EsVUFBQyxJQUFELEVBQVE7QUFDWixrQkFBSyxRQUFMO0FBQ0EscUJBQVMsSUFBVDtBQUNELFdBSkgsRUFJSyxLQUpMLENBSVcsVUFBQyxHQUFELEVBQU87QUFDZCxvQkFBUSxLQUFSLENBQWMsR0FBZDtBQUNBLHFCQUFTLEVBQVQ7QUFDRCxXQVBIO0FBUUQsUzs7MkJBSUQsUSx1QkFBVTtBQUFBOztBQUNSLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsaUJBQWhCLENBQWtDLElBQWxDO0FBQ0EsZUFBSyxVQUFMLENBQWdCLE9BQWhCLEdBQ0MsSUFERCxDQUNNLFVBQUMsSUFBRCxFQUFRO0FBQ1osbUJBQUssUUFBTDtBQUNBLG1CQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLDRCQUFoQjtBQUNBLG1CQUFLLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxtQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixpQkFBaEIsQ0FBa0MsS0FBbEM7QUFDRCxXQU5EO0FBT0QsUzs7MkJBR0QsUSx1QkFBVTtBQUNSLGVBQUssZ0JBQUwsR0FBd0IsS0FBSyxVQUFMLENBQWdCLE1BQXhDO0FBQ0EsZUFBSyxLQUFMLEdBQWEsS0FBSyxVQUFMLENBQWdCLEtBQTdCO0FBQ0EsZUFBSyxNQUFMLEdBQWMsS0FBSyxVQUFMLENBQWdCLE1BQTlCO0FBQ0EsZUFBSyxJQUFMLEdBQVksS0FBSyxNQUFMLEdBQWMsS0FBSyxJQUFMLENBQVUsS0FBSyxNQUFMLEdBQVksS0FBSyxLQUEzQixJQUFrQyxDQUFoRCxHQUFrRCxDQUE5RDtBQUNBLGNBQUcsS0FBSyxJQUFMLEtBQWMsQ0FBakIsRUFBbUI7QUFDakIsaUJBQUssaUJBQUwsR0FBeUIsS0FBekI7QUFDQSxpQkFBSyxnQkFBTCxHQUF3QixLQUF4QjtBQUNELFdBSEQsTUFHTztBQUNMLGlCQUFLLGlCQUFMLEdBQXlCLElBQXpCO0FBQ0EsaUJBQUssZ0JBQUwsR0FBd0IsSUFBeEI7QUFDRDs7QUFFRCxjQUFHLEtBQUssTUFBTCxJQUFlLEtBQUssZ0JBQUwsR0FBc0IsS0FBSyxLQUE3QyxFQUFtRDtBQUNqRCxpQkFBSyxnQkFBTCxHQUF3QixLQUF4QjtBQUNBLGlCQUFLLGdCQUFMLEdBQXdCLEtBQXhCO0FBQ0QsV0FIRCxNQUdPO0FBQ0wsaUJBQUssZ0JBQUwsR0FBd0IsSUFBeEI7QUFDQSxpQkFBSyxnQkFBTCxHQUF3QixJQUF4QjtBQUNEO0FBRUYsUzs7MkJBSUQsUSx1QkFBVTtBQUNSLGVBQUssVUFBTCxDQUFnQixNQUFoQixHQUF5QixDQUF6QjtBQUNBLGVBQUssUUFBTDtBQUNELFM7OzJCQUlELE8sc0JBQVM7QUFDUCxlQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsR0FBeUIsS0FBSyxVQUFMLENBQWdCLE1BQWhCLEdBQXlCLEtBQUssS0FBdkQ7QUFDQSxlQUFLLFFBQUw7QUFDRCxTOzsyQkFJRCxPLHNCQUFTO0FBQ1AsZUFBSyxVQUFMLENBQWdCLE1BQWhCLEdBQXlCLEtBQUssVUFBTCxDQUFnQixNQUFoQixHQUF5QixLQUFLLEtBQXZEO0FBQ0EsZUFBSyxRQUFMO0FBQ0QsUzs7MkJBSUQsTyxzQkFBUztBQUNQLGVBQUssVUFBTCxDQUFnQixNQUFoQixHQUF5QixLQUFLLGdCQUFMLEdBQXNCLEtBQUssS0FBcEQ7QUFDQSxlQUFLLFFBQUw7QUFDRCxTOztBQU9ELDBCQUFZLE9BQVosRUFBcUIsSUFBckIsRUFBMkI7QUFBQTs7QUFBQSxlQTlGM0IsWUE4RjJCLEdBOUZaLEVBOEZZO0FBQUEsZUE3RjNCLGVBNkYyQixHQTdGVCxFQTZGUztBQUFBLGVBNUYzQixNQTRGMkIsR0E1RmxCLEVBNEZrQjtBQUFBLGVBMUYzQixnQkEwRjJCLEdBMUZSLENBMEZROztBQUV6QixlQUFLLE9BQUwsR0FBZSxPQUFmOztBQUdBLGVBQUssU0FBTCxDQUFlLGtCQUFVO0FBQ3ZCLG1CQUNHLFdBREgsQ0FDZSxzQ0FEZixFQUVHLFlBRkgsQ0FFZ0I7QUFDWiwyQkFBYTtBQURELGFBRmhCO0FBS0QsV0FORDtBQU9BLGVBQUssSUFBTCxHQUFZLElBQVo7O0FBR0EsZUFBSyxVQUFMLEdBQWtCLElBQUksVUFBSixDQUFlLHNDQUFmLEVBQXVELGFBQXZELENBQWxCO0FBQ0EsZUFBSyxVQUFMLENBQWdCLEtBQWhCLEdBQXdCLEVBQXhCO0FBSUQ7OzJCQU1ELFEsdUJBQVc7QUFDVCxlQUFLLFVBQUwsR0FBa0IsS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixVQUFoQixFQUFsQjtBQUNBLGVBQUssUUFBTDtBQUlELFM7OztrQkFySU0sTSxHQUFTLENBQUMsT0FBRCxFQUFVLFVBQVYsQyIsImZpbGUiOiJzYW1wbGVzL3NhbXBsZTA0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
