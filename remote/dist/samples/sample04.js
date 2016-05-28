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
        sample04.prototype.onRowDraw = function onRowDraw(data, collectionData) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVEsZ0IscUJBQUEsVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUdLLFE7MkJBb0JYLFMsc0JBQVcsSSxFQUFNLGMsRUFBZ0I7QUFDL0IsY0FBSSxJQUFKLEVBQVU7QUFDUixnQkFBRyxLQUFLLE1BQUwsR0FBWSxHQUFmLEVBQW1CO0FBQ2pCLG1CQUFLLFdBQUwsR0FBbUIsT0FBbkI7QUFDQSxtQkFBSyxVQUFMLEdBQWtCLFFBQWxCO0FBQ0QsYUFIRCxNQUdPO0FBQ0wsbUJBQUssV0FBTCxHQUFtQixLQUFuQjtBQUNBLG1CQUFLLFVBQUwsR0FBa0IsTUFBbEI7QUFDRDtBQUNGO0FBRUYsUzs7MkJBR0QsVyx3QkFBWSxDLEVBQUU7QUFDWixrQkFBUSxHQUFSLENBQVksT0FBWjtBQUNELFM7OzJCQUdELGMsMkJBQWUsQyxFQUFFO0FBQ2Ysa0JBQVEsR0FBUixDQUFZLFVBQVo7QUFDRCxTOzsyQkFFRCxnQiw2QkFBaUIsSyxFQUFNOztBQUVyQixlQUFLLFVBQUwsQ0FBZ0IsbUJBQWhCLENBQW9DLE1BQU0sSUFBMUM7QUFDQSxlQUFLLFVBQUwsQ0FBZ0IsaUJBQWhCLENBQWtDLE1BQU0sTUFBeEM7QUFDQSxlQUFLLFVBQUwsQ0FBZ0IsUUFBaEIsQ0FBeUIsTUFBTSxLQUEvQjtBQUNBLGVBQUssVUFBTCxDQUFnQixTQUFoQixDQUEwQixNQUFNLE1BQWhDOztBQUVBLGlCQUFPLEtBQUssVUFBTCxDQUFnQixPQUFoQixHQUNKLElBREksQ0FDQyxVQUFDLElBQUQsRUFBUztBQUNiLG1CQUFPLElBQVA7QUFDRCxXQUhJLEVBR0YsS0FIRSxDQUdJLFVBQUMsR0FBRCxFQUFRO0FBQ2Ysb0JBQVEsS0FBUixDQUFjLEdBQWQ7QUFFRCxXQU5JLENBQVA7QUFPRCxTOzsyQkFHRCxRLHVCQUFXO0FBQUE7O0FBQ1QsZUFBSyxNQUFMLENBQVksR0FBWixDQUFnQixpQkFBaEIsQ0FBa0MsSUFBbEM7QUFDQSxlQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsR0FDRyxJQURILENBQ1EsVUFBQyxJQUFELEVBQVE7QUFDWixrQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixPQUFoQixDQUF3QixJQUF4QjtBQUNELFdBSEg7QUFJRCxTOzs7OzhCQXZEaUI7QUFDaEIsZ0JBQUcsS0FBSyxNQUFMLENBQVksR0FBZixFQUFtQjtBQUNqQixxQkFBTyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLHVCQUFoQixDQUF3QyxNQUEvQztBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLENBQVA7QUFDRDtBQUNGOzs7QUF5REQsMEJBQVksT0FBWixFQUFxQjtBQUFBOztBQUFBLGVBbkVyQixZQW1FcUIsR0FuRU4sRUFtRU07QUFBQSxlQWxFckIsZUFrRXFCLEdBbEVILEVBa0VHO0FBQUEsZUFqRXJCLE1BaUVxQixHQWpFWixFQWlFWTtBQUFBLGVBTHJCLGdCQUtxQixHQUxILENBS0c7O0FBRW5CLGVBQUssT0FBTCxHQUFlLE9BQWY7O0FBRUEsZUFBSyxVQUFMLEdBQWtCLElBQUksVUFBSixDQUFlLHNDQUFmLEVBQXVELGFBQXZELENBQWxCO0FBS0Q7OzJCQUVELFEsdUJBQVU7QUFDUixlQUFLLFVBQUwsR0FBa0IsS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixVQUFoQixFQUFsQjtBQUNBLGVBQUssUUFBTDtBQUNELFM7OztrQkF2Rk0sTSxHQUFTLENBQUMsT0FBRCxDIiwiZmlsZSI6InNhbXBsZXMvc2FtcGxlMDQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
