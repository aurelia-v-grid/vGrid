'use strict';

System.register(['data/dummyDataGenerator'], function (_export, _context) {
  var dummyDataGenerator, _class, _temp, sample;

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
      _export('sample', sample = (_temp = _class = function () {
        function sample(element, dummyDataGenerator) {
          var _this = this;

          _classCallCheck(this, sample);

          this.dummyDataGenerator = dummyDataGenerator;

          this.dummyDataGenerator.generateData(100, function (data) {
            _this.myCollection = data;
          });
        }

        sample.prototype.replaceBtn = function replaceBtn(x) {
          var _this2 = this;

          this.dummyDataGenerator.reset();

          this.dummyDataGenerator.generateData(x, function (data) {
            _this2.myCollection = data;
          });
        };

        sample.prototype.addBtn = function addBtn(x) {
          var _this3 = this;

          this.dummyDataGenerator.generateData(x, function (data) {
            data.forEach(function (x) {
              _this3.myCollection.push(x);
            });
          });
        };

        return sample;
      }(), _class.inject = [dummyDataGenerator], _temp));

      _export('sample', sample);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7d0JBRUs7QUFHWCxpQkFIVyxNQUdYLENBQVksT0FBWixFQUFxQixrQkFBckIsRUFBeUM7OztnQ0FIOUIsUUFHOEI7O0FBR3ZDLGVBQUssa0JBQUwsR0FBMEIsa0JBQTFCLENBSHVDOztBQU12QyxlQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLEdBQXJDLEVBQTBDLFVBQUMsSUFBRCxFQUFVO0FBQ2xELGtCQUFLLFlBQUwsR0FBb0IsSUFBcEIsQ0FEa0Q7V0FBVixDQUExQyxDQU51QztTQUF6Qzs7QUFIVyx5QkFjWCxpQ0FBVyxHQUFHOzs7QUFFWixlQUFLLGtCQUFMLENBQXdCLEtBQXhCLEdBRlk7O0FBSVosZUFBSyxrQkFBTCxDQUF3QixZQUF4QixDQUFxQyxDQUFyQyxFQUF3QyxVQUFDLElBQUQsRUFBVTtBQUNoRCxtQkFBSyxZQUFMLEdBQW9CLElBQXBCLENBRGdEO1dBQVYsQ0FBeEMsQ0FKWTs7O0FBZEgseUJBdUJYLHlCQUFPLEdBQUc7OztBQUVSLGVBQUssa0JBQUwsQ0FBd0IsWUFBeEIsQ0FBcUMsQ0FBckMsRUFBd0MsVUFBQyxJQUFELEVBQVU7QUFDaEQsaUJBQUssT0FBTCxDQUFhLFVBQUMsQ0FBRCxFQUFPO0FBQ2xCLHFCQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsQ0FBdkIsRUFEa0I7YUFBUCxDQUFiLENBRGdEO1dBQVYsQ0FBeEMsQ0FGUTs7O2VBdkJDO2tCQUNKLFNBQVMsQ0FBQyxrQkFBRCIsImZpbGUiOiJzYW1wbGVzL3NhbXBsZTAyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
