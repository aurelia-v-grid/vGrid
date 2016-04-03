"use strict";

System.register(["data/dummyDataGenerator"], function (_export, _context) {
  var dummyDataGenerator, _class, _temp, _initialiseProps, sample01;

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
      _export("sample01", sample01 = (_temp = _class = function () {
        sample01.prototype.onRowDraw = function onRowDraw(data) {};

        sample01.prototype.onDblClick = function onDblClick(row) {};

        sample01.prototype.selectAll = function selectAll() {
          var allRowsArray = this.myGrid.ctx.getGridRows();
          this.myGrid.ctx.selection.selectRange(0, allRowsArray.length - 1);
          this.myGrid.ctx.updateSelectionOnAllRows();
        };

        function sample01(element, dummyDataGenerator) {
          var _this = this;

          _classCallCheck(this, sample01);

          _initialiseProps.call(this);

          this.element = element;

          this.dummyDataGenerator = dummyDataGenerator;
          this.dummyDataGenerator.generateData(100, function (data) {
            _this.myCollection = data;
            _this.collectionLength = _this.myCollection.length;
          });
        }

        sample01.prototype.attached = function attached() {
          console.log("attached");
        };

        return sample01;
      }(), _class.inject = [Element, dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myCollection = [];
        this.myCurrentEntity = {};
        this.myGrid = {};
      }, _temp));

      _export("sample01", sample01);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7MEJBR0s7MkJBUVgsK0JBQVUsTUFBTTs7QUFSTCwyQkFZWCxpQ0FBVyxLQUFLOztBQVpMLDJCQWdCWCxpQ0FBWTtBQUNWLGNBQUksZUFBZSxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFdBQWhCLEVBQWYsQ0FETTtBQUVWLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsU0FBaEIsQ0FBMEIsV0FBMUIsQ0FBc0MsQ0FBdEMsRUFBeUMsYUFBYSxNQUFiLEdBQW9CLENBQXBCLENBQXpDLENBRlU7QUFHVixlQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLHdCQUFoQixHQUhVOzs7QUFVWixpQkExQlcsUUEwQlgsQ0FBWSxPQUFaLEVBQXFCLGtCQUFyQixFQUF5Qzs7O2dDQTFCOUIsVUEwQjhCOzs7O0FBRXZDLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FGdUM7O0FBS3ZDLGVBQUssa0JBQUwsR0FBMEIsa0JBQTFCLENBTHVDO0FBTXZDLGVBQUssa0JBQUwsQ0FBd0IsWUFBeEIsQ0FBcUMsR0FBckMsRUFBMEMsVUFBQyxJQUFELEVBQVU7QUFDbEQsa0JBQUssWUFBTCxHQUFvQixJQUFwQixDQURrRDtBQUVsRCxrQkFBSyxnQkFBTCxHQUF3QixNQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FGMEI7V0FBVixDQUExQyxDQU51QztTQUF6Qzs7QUExQlcsMkJBeUNYLCtCQUFXO0FBQ1Qsa0JBQVEsR0FBUixDQUFZLFVBQVosRUFEUzs7O2VBekNBO2tCQUNKLFNBQVMsQ0FBQyxPQUFELEVBQVUsa0JBQVY7YUFHaEIsZUFBZTthQUNmLGtCQUFrQjthQUNsQixTQUFTIiwiZmlsZSI6InNhbXBsZXMvc2FtcGxlMDMuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
