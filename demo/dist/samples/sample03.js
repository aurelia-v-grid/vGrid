"use strict";

System.register(["data/dummyDataGenerator"], function (_export, _context) {
  "use strict";

  var dummyDataGenerator, _createClass, _class, _temp, _initialiseProps, sample03;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_dataDummyDataGenerator) {
      dummyDataGenerator = _dataDummyDataGenerator.dummyDataGenerator;
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

      _export("sample03", sample03 = (_temp = _class = function () {
        sample03.prototype.onRowDraw = function onRowDraw(data) {
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

        sample03.prototype.singleClick = function singleClick(e) {
          console.log("click");
        };

        sample03.prototype.singleDblClick = function singleDblClick(e) {
          console.log("dblClick");
        };

        _createClass(sample03, [{
          key: "filteredRows",
          get: function get() {
            if (this.myGrid.ctx) {
              return this.myGrid.ctx.vGridCollectionFiltered.length;
            } else {
              return 0;
            }
          }
        }]);

        function sample03(element, dummyDataGenerator) {
          var _this = this;

          _classCallCheck(this, sample03);

          _initialiseProps.call(this);

          this.element = element;

          this.dummyDataGenerator = dummyDataGenerator;
          this.dummyDataGenerator.generateData(10000, function (data) {
            _this.myCollection = data;
            _this.collectionLength = _this.myCollection.length;
          });
        }

        sample03.prototype.attached = function attached() {
          this.getMaxRows = this.myGrid.ctx.getMaxRows();
        };

        return sample03;
      }(), _class.inject = [Element, dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myCollection = [];
        this.myCurrentEntity = {};
        this.myGrid = {};
        this.collectionLength = 0;
      }, _temp));

      _export("sample03", sample03);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVEsd0IsMkJBQUEsa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFHSyxROzJCQXFCWCxTLHNCQUFVLEksRUFBTTtBQUNkLGNBQUksSUFBSixFQUFVO0FBQ1IsZ0JBQUksS0FBSyxPQUFULEVBQWtCO0FBQ2hCLGtCQUFJLEtBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsR0FBMUIsRUFBK0I7QUFDN0IscUJBQUssT0FBTCxDQUFhLFdBQWIsR0FBMkIsT0FBM0I7QUFDQSxxQkFBSyxPQUFMLENBQWEsVUFBYixHQUEwQixRQUExQjtBQUNELGVBSEQsTUFHTztBQUNMLHFCQUFLLE9BQUwsQ0FBYSxXQUFiLEdBQTJCLEtBQTNCO0FBQ0EscUJBQUssT0FBTCxDQUFhLFVBQWIsR0FBMEIsTUFBMUI7QUFDRDtBQUNGO0FBQ0Y7QUFFRixTOzsyQkFHRCxXLHdCQUFZLEMsRUFBRTtBQUNaLGtCQUFRLEdBQVIsQ0FBWSxPQUFaO0FBQ0QsUzs7MkJBR0QsYywyQkFBZSxDLEVBQUU7QUFDZixrQkFBUSxHQUFSLENBQVksVUFBWjtBQUNELFM7Ozs7OEJBakNpQjtBQUNoQixnQkFBRyxLQUFLLE1BQUwsQ0FBWSxHQUFmLEVBQW1CO0FBQ2pCLHFCQUFPLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsdUJBQWhCLENBQXdDLE1BQS9DO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sQ0FBUDtBQUNEO0FBQ0Y7OztBQXFDRCwwQkFBWSxPQUFaLEVBQXFCLGtCQUFyQixFQUF5QztBQUFBOztBQUFBOztBQUFBOztBQUV2QyxlQUFLLE9BQUwsR0FBZSxPQUFmOztBQUdBLGVBQUssa0JBQUwsR0FBMEIsa0JBQTFCO0FBQ0EsZUFBSyxrQkFBTCxDQUF3QixZQUF4QixDQUFxQyxLQUFyQyxFQUE0QyxVQUFDLElBQUQsRUFBVTtBQUNwRCxrQkFBSyxZQUFMLEdBQW9CLElBQXBCO0FBQ0Esa0JBQUssZ0JBQUwsR0FBd0IsTUFBSyxZQUFMLENBQWtCLE1BQTFDO0FBQ0QsV0FIRDtBQUtEOzsyQkFFRCxRLHVCQUFVO0FBQ1IsZUFBSyxVQUFMLEdBQWtCLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBaEIsRUFBbEI7QUFFRCxTOzs7a0JBckVNLE0sR0FBUyxDQUFDLE9BQUQsRUFBVSxrQkFBVixDO2FBTWhCLFksR0FBZSxFO2FBQ2YsZSxHQUFrQixFO2FBQ2xCLE0sR0FBUyxFO2FBd0NULGdCLEdBQWtCLEMiLCJmaWxlIjoic2FtcGxlcy9zYW1wbGUwMy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
