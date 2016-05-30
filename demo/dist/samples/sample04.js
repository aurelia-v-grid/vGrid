"use strict";

System.register(["remote/remoteData"], function (_export, _context) {
  "use strict";

  var RemoteData, _createClass, _class, _temp, sample04;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_remoteRemoteData) {
      RemoteData = _remoteRemoteData.RemoteData;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("sample04", sample04 = (_temp = _class = function () {
        sample04.prototype.onRowDraw = function onRowDraw(data) {
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

        sample04.prototype.singleClick = function singleClick(e) {
          console.log("click");
        };

        sample04.prototype.singleDblClick = function singleDblClick(e) {
          console.log("dblClick");
        };

        sample04.prototype.callRemoteServer = function callRemoteServer(param) {

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

        sample04.prototype.loadData = function loadData() {
          var _this = this;

          this.myGrid.ctx.setLoadingOverlay(true);
          this.remoteData.getData().then(function (data) {
            _this.myGrid.ctx.setData(data);
          });
        };

        _createClass(sample04, [{
          key: "filteredRows",
          get: function get() {
            if (this.myGrid.ctx) {
              return this.myGrid.ctx.vGridCollectionFiltered.length;
            } else {
              return 0;
            }
          }
        }]);

        function sample04(element) {
          _classCallCheck(this, sample04);

          this.myCollection = [];
          this.myCurrentEntity = {};
          this.myGrid = {};
          this.collectionLength = 0;

          this.element = element;

          this.remoteData = new RemoteData('http://data-nodedataapi.rhcloud.com/', 'data/people');
        }

        sample04.prototype.attached = function attached() {
          this.getMaxRows = this.myGrid.ctx.getMaxRows();
          this.loadData();
        };

        return sample04;
      }(), _class.inject = [Element], _temp));

      _export("sample04", sample04);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
