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

        sample02.prototype.onRowDraw = function onRowDraw(data) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVEsZ0IscUJBQUEsVTs7OzBCQUVLLFE7MkJBV1gsZ0IsNkJBQWlCLEssRUFBTTs7QUFFckIsZUFBSyxVQUFMLENBQWdCLG1CQUFoQixDQUFvQyxNQUFNLElBQTFDO0FBQ0EsZUFBSyxVQUFMLENBQWdCLGlCQUFoQixDQUFrQyxNQUFNLE1BQXhDO0FBQ0EsZUFBSyxVQUFMLENBQWdCLFFBQWhCLENBQXlCLE1BQU0sS0FBL0I7QUFDQSxlQUFLLFVBQUwsQ0FBZ0IsU0FBaEIsQ0FBMEIsTUFBTSxNQUFoQzs7QUFFQSxpQkFBTyxLQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsR0FDSixJQURJLENBQ0MsVUFBQyxJQUFELEVBQVM7QUFDYixtQkFBTyxJQUFQO0FBQ0QsV0FISSxFQUdGLEtBSEUsQ0FHSSxVQUFDLEdBQUQsRUFBUTtBQUNmLG9CQUFRLEtBQVIsQ0FBYyxHQUFkO0FBRUQsV0FOSSxDQUFQO0FBT0QsUzs7MkJBR0QsUyxzQkFBVSxJLEVBQU07QUFDZCxjQUFJLElBQUosRUFBVTtBQUNSLGdCQUFJLEtBQUssT0FBVCxFQUFrQjtBQUNoQixrQkFBSSxLQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLEdBQTFCLEVBQStCO0FBQzdCLHFCQUFLLE9BQUwsQ0FBYSxXQUFiLEdBQTJCLE9BQTNCO0FBQ0EscUJBQUssT0FBTCxDQUFhLFVBQWIsR0FBMEIsUUFBMUI7QUFDRCxlQUhELE1BR087QUFDTCxxQkFBSyxPQUFMLENBQWEsV0FBYixHQUEyQixLQUEzQjtBQUNBLHFCQUFLLE9BQUwsQ0FBYSxVQUFiLEdBQTBCLE1BQTFCO0FBQ0Q7QUFDRjtBQUNGO0FBRUYsUzs7MkJBRUQsUSx1QkFBVztBQUFBOztBQUNULGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsaUJBQWhCLENBQWtDLElBQWxDO0FBQ0EsZUFBSyxVQUFMLENBQWdCLE9BQWhCLEdBQ0csSUFESCxDQUNRLFVBQUMsSUFBRCxFQUFRO0FBQ1osa0JBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsT0FBaEIsQ0FBd0IsSUFBeEI7QUFDRCxXQUhIO0FBSUQsUzs7MkJBR0QsVyx3QkFBWSxDLEVBQUU7QUFDWixrQkFBUSxHQUFSLENBQVksT0FBWjtBQUNELFM7OzJCQUdELGMsMkJBQWUsQyxFQUFFO0FBQ2Ysa0JBQVEsR0FBUixDQUFZLFVBQVo7QUFDRCxTOztBQVNELDBCQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFBQSxlQTdEckIsWUE2RHFCLEdBN0ROLEVBNkRNO0FBQUEsZUE1RHJCLGVBNERxQixHQTVESCxFQTRERztBQUFBLGVBM0RyQixNQTJEcUIsR0EzRFosRUEyRFk7O0FBRW5CLGVBQUssT0FBTCxHQUFlLE9BQWY7O0FBSUEsZUFBSyxVQUFMLEdBQWtCLElBQUksVUFBSixDQUFlLHNDQUFmLEVBQXVELGFBQXZELENBQWxCO0FBRUQ7OzJCQUVELFEsdUJBQVU7QUFDUixlQUFLLFVBQUwsR0FBa0IsS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixVQUFoQixFQUFsQjtBQUNBLGVBQUssUUFBTDtBQUNELFM7OztrQkFoRk0sTSxHQUFTLENBQUMsT0FBRCxDIiwiZmlsZSI6InNhbXBsZXMvc2FtcGxlMDIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
