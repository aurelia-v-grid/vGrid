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
        this.columnSetup = [{
          colField: "index",
          colWidth: 80,
          colHeader: "Record",
          colFilter: "index|>=",
          colFilterTop: "index",
          colSort: true,
          colAddFilterAttributes: "v-header-menu='index'",
          colAddRowAttributes: "v-row-menu='index' v-key-move"
        }, {
          colField: "name",
          colWidth: 120,
          colHeader: "Full Name",
          colFilterTop: false,
          colFilter: "name|*|onKeyDown",
          colSort: "name",
          colAddFilterAttributes: "v-header-menu='name'",
          colAddRowAttributes: "v-row-menu='name' v-key-move"
        }, {
          colField: "number | numberFormat & updateTrigger:'blur':'paste'",
          colWidth: 100,
          colHeader: "Salery",
          colFilter: "number|>=",
          colFilterTop: true,
          colSort: "number",
          colAddFilterAttributes: "v-header-menu='number'",
          colAddRowAttributes: "v-row-menu='number' v-key-move",
          colCss: "color:${tempRef.numberColor};font-weight:${tempRef.numberFont}"
        }, {
          colField: "date | dateFormat & updateTrigger:'blur':'paste'",
          colWidth: 100,
          colHeader: "Created",
          colFilter: "date|>|dateFormat",
          colFilterTop: true,
          colSort: "date",
          colAddFilterAttributes: "v-header-menu='date'",
          colAddRowAttributes: "v-row-menu='date' v-key-move"
        }, {
          colField: "bool",
          colWidth: 105,
          colHeader: "Booked",
          colFilter: "bool",
          colFilterTop: true,
          colSort: "bool",
          colType: "checkbox",
          colAddFilterAttributes: "v-header-menu='bool'",
          colAddRowAttributes: "v-row-menu='bool' v-key-move"
        }, {
          colField: "images",
          colWidth: 107,
          colHeader: "Profil img",
          colType: "image",
          colFilterTop: true,
          colAddFilterAttributes: "v-header-menu='images'",
          colAddRowAttributes: "v-row-menu='images' v-key-move tabindex='0'"
        }];
      }, _temp));

      _export("BasicUse", BasicUse);
    }
  };
});
//# sourceMappingURL=all.js.map
