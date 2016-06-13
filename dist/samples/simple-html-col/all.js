"use strict";

System.register(["shared/dummyDataGenerator"], function (_export, _context) {
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
      _export("BasicUse", BasicUse = (_temp = _class = function () {
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
          var _this = this;

          _classCallCheck(this, BasicUse);

          _initialiseProps.call(this);

          this.dummyDataGenerator = dummyDataGenerator;
          this.dummyDataGenerator.generateData(10000, function (data) {
            _this.myCollection = data;
          });
        }

        return BasicUse;
      }(), _class.inject = [dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myGrid = {};
        this.myCurrentEntity = {};
        this.myCollection = [];
      }, _temp));

      _export("BasicUse", BasicUse);
    }
  };
});
//# sourceMappingURL=all.js.map
