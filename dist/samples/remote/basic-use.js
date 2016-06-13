"use strict";

System.register(["shared/remoteData"], function (_export, _context) {
  "use strict";

  var RemoteData, BasicUse;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_sharedRemoteData) {
      RemoteData = _sharedRemoteData.RemoteData;
    }],
    execute: function () {
      _export("BasicUse", BasicUse = function () {
        BasicUse.prototype.onRowDraw = function onRowDraw(data) {
          if (data) {
            if (data.tempRef) {
              if (data.tempRef.number > 100) {
                data.tempRef.numberColor = "green";
                data.tempRef.numberFont = "normal";
              } else {
                data.tempRef.numberColor = "red";
                data.tempRef.numberFont = "bold";
              }
            }
          }
        };

        BasicUse.prototype.singleClick = function singleClick(e) {
          console.log("click");
        };

        BasicUse.prototype.singleDblClick = function singleDblClick(e) {
          console.log("dblClick");
        };

        function BasicUse(dummyDataGenerator) {
          _classCallCheck(this, BasicUse);

          this.myGrid = {};
          this.myCurrentEntity = {};
          this.myCollection = [];

          this.remoteData = new RemoteData('http://data-nodedataapi.rhcloud.com/', 'data/people');
        }

        BasicUse.prototype.attached = function attached() {
          this.loadData();
        };

        BasicUse.prototype.loadData = function loadData() {
          var _this = this;

          this.myGrid.ctx.setLoadingOverlay(true);
          this.remoteData.setLimit(40);
          this.remoteData.setOffset(0);
          this.remoteData.getData().then(function (data) {
            _this.myGrid.ctx.setData(data);
          });
        };

        BasicUse.prototype.callRemoteServer = function callRemoteServer(param) {

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

        return BasicUse;
      }());

      _export("BasicUse", BasicUse);
    }
  };
});
//# sourceMappingURL=basic-use.js.map
