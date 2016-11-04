"use strict";

System.register(["aurelia-v-grid", "./sampleUtils/dummyDataGenerator"], function (_export, _context) {
  "use strict";

  var GridConnector, DataSource, Selection, DummyDataGenerator, _class, _temp, App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaVGrid) {
      GridConnector = _aureliaVGrid.GridConnector;
      DataSource = _aureliaVGrid.DataSource;
      Selection = _aureliaVGrid.Selection;
    }, function (_sampleUtilsDummyDataGenerator) {
      DummyDataGenerator = _sampleUtilsDummyDataGenerator.DummyDataGenerator;
    }],
    execute: function () {
      _export("App", App = (_temp = _class = function () {
        function App(dummyDataGenerator) {
          var _this = this;

          _classCallCheck(this, App);

          this.dummyDataGenerator = dummyDataGenerator;
          this.dummyDataGenerator.generateData(5000, function (data) {
            _this.myCollection = data;
          });

          this.hidden = false;
          this.height = 600;

          this.ds = new DataSource(new Selection("multiple"));

          this.gridConnector = new GridConnector(this.ds);

          this.ds.setArray(this.myCollection);
        }

        App.prototype.attached = function attached() {};

        App.prototype.group = function group() {

          console.time("group");
          this.ds.group(["country", "gender", "high"]);
          console.timeEnd("group");
        };

        App.prototype.collapse = function collapse() {
          console.time("fullCollapse");
          this.ds.groupCollapse();
          console.timeEnd("fullCollapse");
        };

        App.prototype.expand = function expand() {
          console.time("fullExpand");
          this.ds.groupExpand();
          console.timeEnd("fullExpand");
        };

        App.prototype.clickMe = function clickMe(x) {
          console.log(x);
        };

        App.prototype.addblank = function addblank() {
          this.ds.addElement();
        };

        App.prototype.show = function show() {
          this.hidden = false;
        };

        App.prototype.hide = function hide() {
          this.hidden = true;
        };

        return App;
      }(), _class.inject = [DummyDataGenerator], _temp));

      _export("App", App);
    }
  };
});
//# sourceMappingURL=welcome.js.map
