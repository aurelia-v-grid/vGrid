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
//# sourceMappingURL=data:application/json;base64,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
