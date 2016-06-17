'use strict';

System.register(['shared/dummyDataGenerator'], function (_export, _context) {
  "use strict";

  var dummyDataGenerator, _class, _temp, _initialiseProps, BasicUse;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_sharedDummyDataGenerator) {
      dummyDataGenerator = _sharedDummyDataGenerator.dummyDataGenerator;
    }],
    execute: function () {
      _export('BasicUse', BasicUse = (_temp = _class = function () {
        function BasicUse(dummyDataGenerator) {
          var _this = this;

          _classCallCheck(this, BasicUse);

          _initialiseProps.call(this);

          this.dummyDataGenerator = dummyDataGenerator;
          this.dummyDataGenerator.generateData(10000, function (data) {
            _this.myCollection = data;
          });

          this.context = this;
          this.showOnlySelected = false;
        }

        BasicUse.prototype.showSelectedBtn = function showSelectedBtn() {
          this.myGrid.ctx.showOnlySelected();
        };

        BasicUse.prototype.showAll = function showAll() {
          this.myGrid.ctx.showSelectedAndNotSelected();
        };

        BasicUse.prototype.showOnlyNotSelected = function showOnlyNotSelected() {
          this.myGrid.ctx.showOnlyNotSelected();
        };

        return BasicUse;
      }(), _class.inject = [dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myGrid = {};
        this.myCurrentEntity = {};
        this.myCollection = [];
      }, _temp));

      _export('BasicUse', BasicUse);
    }
  };
});
//# sourceMappingURL=basic-use.js.map
