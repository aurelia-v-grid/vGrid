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
        sample03.prototype.onRowDraw = function onRowDraw(data, collectionData) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVEsd0IsMkJBQUEsa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFHSyxROzJCQW9CWCxTLHNCQUFXLEksRUFBTSxjLEVBQWdCO0FBQy9CLGNBQUksSUFBSixFQUFVO0FBQ1IsZ0JBQUcsS0FBSyxNQUFMLEdBQVksR0FBZixFQUFtQjtBQUNqQixtQkFBSyxXQUFMLEdBQW1CLE9BQW5CO0FBQ0EsbUJBQUssVUFBTCxHQUFrQixRQUFsQjtBQUNELGFBSEQsTUFHTztBQUNMLG1CQUFLLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxtQkFBSyxVQUFMLEdBQWtCLE1BQWxCO0FBQ0Q7QUFDRjtBQUVGLFM7OzJCQUdELFcsd0JBQVksQyxFQUFFO0FBQ1osa0JBQVEsR0FBUixDQUFZLE9BQVo7QUFDRCxTOzsyQkFHRCxjLDJCQUFlLEMsRUFBRTtBQUNmLGtCQUFRLEdBQVIsQ0FBWSxVQUFaO0FBQ0QsUzs7Ozs4QkE5QmlCO0FBQ2hCLGdCQUFHLEtBQUssTUFBTCxDQUFZLEdBQWYsRUFBbUI7QUFDakIscUJBQU8sS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQix1QkFBaEIsQ0FBd0MsTUFBL0M7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxDQUFQO0FBQ0Q7QUFDRjs7O0FBa0NELDBCQUFZLE9BQVosRUFBcUIsa0JBQXJCLEVBQXlDO0FBQUE7O0FBQUE7O0FBQUE7O0FBRXZDLGVBQUssT0FBTCxHQUFlLE9BQWY7O0FBR0EsZUFBSyxrQkFBTCxHQUEwQixrQkFBMUI7QUFDQSxlQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLEtBQXJDLEVBQTRDLFVBQUMsSUFBRCxFQUFVO0FBQ3BELGtCQUFLLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxrQkFBSyxnQkFBTCxHQUF3QixNQUFLLFlBQUwsQ0FBa0IsTUFBMUM7QUFDRCxXQUhEO0FBS0Q7OzJCQUVELFEsdUJBQVU7QUFDUixlQUFLLFVBQUwsR0FBa0IsS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixVQUFoQixFQUFsQjtBQUVELFM7OztrQkFsRU0sTSxHQUFTLENBQUMsT0FBRCxFQUFVLGtCQUFWLEM7YUFNaEIsWSxHQUFlLEU7YUFDZixlLEdBQWtCLEU7YUFDbEIsTSxHQUFTLEU7YUFxQ1QsZ0IsR0FBa0IsQyIsImZpbGUiOiJzYW1wbGVzL3NhbXBsZTAzLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
