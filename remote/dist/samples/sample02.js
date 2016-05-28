"use strict";

System.register(["remote/remoteData"], function (_export, _context) {
  "use strict";

  var RemoteData, _class, _temp, sample02;

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
      _export("sample02", sample02 = (_temp = _class = function () {
        sample02.prototype.callRemoteServer = function callRemoteServer(param) {

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

        sample02.prototype.onRowDraw = function onRowDraw(data, collectionData) {
          if (data) {
            if (data.number > 100) {
              data.numberColor = "green";
              data.numberFont = "normal";
            } else {
              data.numberColor = "red";
              data.numberFont = "bold";
            }
          }
        };

        sample02.prototype.loadData = function loadData() {
          var _this = this;

          this.myGrid.ctx.setLoadingOverlay(true);
          this.remoteData.getData().then(function (data) {
            _this.myGrid.ctx.setData(data);
          });
        };

        sample02.prototype.singleClick = function singleClick(e) {
          console.log("click");
        };

        sample02.prototype.singleDblClick = function singleDblClick(e) {
          console.log("dblClick");
        };

        function sample02(element) {
          _classCallCheck(this, sample02);

          this.myCollection = [];
          this.myCurrentEntity = {};
          this.myGrid = {};

          this.element = element;

          this.remoteData = new RemoteData('http://data-nodedataapi.rhcloud.com/', 'data/people');
        }

        sample02.prototype.attached = function attached() {
          this.getMaxRows = this.myGrid.ctx.getMaxRows();
          this.loadData();
        };

        return sample02;
      }(), _class.inject = [Element], _temp));

      _export("sample02", sample02);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVEsZ0IscUJBQUEsVTs7OzBCQUVLLFE7MkJBV1gsZ0IsNkJBQWlCLEssRUFBTTs7QUFFckIsZUFBSyxVQUFMLENBQWdCLG1CQUFoQixDQUFvQyxNQUFNLElBQTFDO0FBQ0EsZUFBSyxVQUFMLENBQWdCLGlCQUFoQixDQUFrQyxNQUFNLE1BQXhDO0FBQ0EsZUFBSyxVQUFMLENBQWdCLFFBQWhCLENBQXlCLE1BQU0sS0FBL0I7QUFDQSxlQUFLLFVBQUwsQ0FBZ0IsU0FBaEIsQ0FBMEIsTUFBTSxNQUFoQzs7QUFFQSxpQkFBTyxLQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsR0FDSixJQURJLENBQ0MsVUFBQyxJQUFELEVBQVM7QUFDYixtQkFBTyxJQUFQO0FBQ0QsV0FISSxFQUdGLEtBSEUsQ0FHSSxVQUFDLEdBQUQsRUFBUTtBQUNmLG9CQUFRLEtBQVIsQ0FBYyxHQUFkO0FBRUQsV0FOSSxDQUFQO0FBT0QsUzs7MkJBRUQsUyxzQkFBVyxJLEVBQU0sYyxFQUFnQjtBQUMvQixjQUFJLElBQUosRUFBVTtBQUNSLGdCQUFHLEtBQUssTUFBTCxHQUFZLEdBQWYsRUFBbUI7QUFDakIsbUJBQUssV0FBTCxHQUFtQixPQUFuQjtBQUNBLG1CQUFLLFVBQUwsR0FBa0IsUUFBbEI7QUFDRCxhQUhELE1BR087QUFDTCxtQkFBSyxXQUFMLEdBQW1CLEtBQW5CO0FBQ0EsbUJBQUssVUFBTCxHQUFrQixNQUFsQjtBQUNEO0FBQ0Y7QUFFRixTOzsyQkFFRCxRLHVCQUFXO0FBQUE7O0FBQ1QsZUFBSyxNQUFMLENBQVksR0FBWixDQUFnQixpQkFBaEIsQ0FBa0MsSUFBbEM7QUFDQSxlQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsR0FDRyxJQURILENBQ1EsVUFBQyxJQUFELEVBQVE7QUFDWixrQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixPQUFoQixDQUF3QixJQUF4QjtBQUNELFdBSEg7QUFJRCxTOzsyQkFHRCxXLHdCQUFZLEMsRUFBRTtBQUNaLGtCQUFRLEdBQVIsQ0FBWSxPQUFaO0FBQ0QsUzs7MkJBR0QsYywyQkFBZSxDLEVBQUU7QUFDZixrQkFBUSxHQUFSLENBQVksVUFBWjtBQUNELFM7O0FBU0QsMEJBQVksT0FBWixFQUFxQjtBQUFBOztBQUFBLGVBMURyQixZQTBEcUIsR0ExRE4sRUEwRE07QUFBQSxlQXpEckIsZUF5RHFCLEdBekRILEVBeURHO0FBQUEsZUF4RHJCLE1Bd0RxQixHQXhEWixFQXdEWTs7QUFFbkIsZUFBSyxPQUFMLEdBQWUsT0FBZjs7QUFJQSxlQUFLLFVBQUwsR0FBa0IsSUFBSSxVQUFKLENBQWUsc0NBQWYsRUFBdUQsYUFBdkQsQ0FBbEI7QUFFRDs7MkJBRUQsUSx1QkFBVTtBQUNSLGVBQUssVUFBTCxHQUFrQixLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFVBQWhCLEVBQWxCO0FBQ0EsZUFBSyxRQUFMO0FBQ0QsUzs7O2tCQTdFTSxNLEdBQVMsQ0FBQyxPQUFELEMiLCJmaWxlIjoic2FtcGxlcy9zYW1wbGUwMi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
