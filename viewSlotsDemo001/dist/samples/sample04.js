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
        sample01.prototype.editClickBtn = function editClickBtn(e) {
          e.editable = true;
        };

        sample01.prototype.saveClickBtn = function saveClickBtn(e) {
          e.editable = false;
          e.currentEntityRef.name = e.name;
          e.currentEntityRef.country = e.country;
        };

        sample01.prototype.cancelClickBtn = function cancelClickBtn(e) {
          e.editable = false;
          e.name = e.currentEntityRef.name;
          e.country = e.currentEntityRef.country;
        };

        sample01.prototype.singleClick = function singleClick(e) {
          console.log("click");
        };

        sample01.prototype.singleDblClick = function singleDblClick(e) {
          console.log("dblClick");
        };

        function sample01(element, dummyDataGenerator) {
          var _this = this;

          _classCallCheck(this, sample01);

          _initialiseProps.call(this);

          this.element = element;

          this.dummyDataGenerator = dummyDataGenerator;
          this.dummyDataGenerator.generateData(10000, function (data) {
            _this.myCollection = data;
            _this.collectionLength = _this.myCollection.length;
          });
        }

        sample01.prototype.attached = function attached() {
          this.getMaxRows = this.myGrid.ctx.getMaxRows();
        };

        sample01.prototype.editMode = function editMode() {

          if (this.lockStatus === "locked") {
            this.lockStatus = "unlocked";
            this.lockColor = "green";
            this.myGrid.ctx.setEditMode(true);
          } else {
            this.lockStatus = "locked";
            this.lockColor = "red";
            this.myGrid.ctx.setEditMode(false);
          }
        };

        sample01.prototype.replaceBtn = function replaceBtn(x) {
          var _this2 = this;

          this.dummyDataGenerator.reset();
          this.dummyDataGenerator.generateData(x, function (data) {
            _this2.myCollection = data;
            _this2.collectionLength = _this2.myCollection.length;
          });
        };

        sample01.prototype.addBtn = function addBtn(x, scrollBottom) {
          var _this3 = this;

          this.dummyDataGenerator.generateData(x, function (data) {
            data.forEach(function (x) {
              _this3.myCollection.push(x);
            });
            if (scrollBottom) {
              _this3.myGrid.ctx.scrollBottomNext();
            }

            _this3.collectionLength = _this3.myCollection.length;
          });
        };

        sample01.prototype.insertOneBtn = function insertOneBtn() {
          var _this4 = this;

          try {
            this.dummyDataGenerator.generateData(1, function (data) {
              _this4.myCollection.splice(2, 0, data[0]);
            });
          } catch (e) {
            console.log(e);
          }
        };

        sample01.prototype.insertFiveBtn = function insertFiveBtn() {
          var _this5 = this;

          try {
            for (var i = 0; i < 5; i++) {
              this.dummyDataGenerator.generateData(1, function (data) {
                _this5.myCollection.splice(2, 0, data[0]);
              });
            }
          } catch (e) {
            console.log(e);
          }
        };

        sample01.prototype.removeFirstBtn = function removeFirstBtn() {
          this.myCollection.splice(0, 1);
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.removeLastBtn = function removeLastBtn() {
          this.myCollection.pop();
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.removeFirstxBtn = function removeFirstxBtn(x) {
          this.myCollection.splice(0, x);
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.removeLastxBtn = function removeLastxBtn(x) {
          this.myCollection.splice(this.myCollection.length - x, x);
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.miscBtn = function miscBtn() {
          var _this6 = this;

          this.myCollection.pop();

          this.myCollection.splice(2, 2);

          this.myCollection.splice(4, 2);

          this.dummyDataGenerator.generateData(2, function (data) {
            _this6.myCollection.push(data[0]);
            _this6.myCollection.push(data[1]);
          });
        };

        sample01.prototype.sortBy = function sortBy(x) {

          this.myGrid.ctx.setSorting({
            attribute: x,
            asc: true
          }, false);

          this.myGrid.ctx.runSorting();

          this.myGrid.ctx.collectionChange();
        };

        sample01.prototype.filter = function filter(x) {
          if (x == "all") {
            this.myGrid.ctx.runFilter([]);
          }
          if (x == "germany") {
            this.myGrid.ctx.runFilter([{ attribute: "country", value: "germany", operator: "*" }]);
          }
          if (x == "norway") {
            this.myGrid.ctx.runFilter([{ attribute: "country", value: "norway", operator: "*" }]);
          }
        };

        return sample01;
      }(), _class.inject = [Element, dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myCollection = [];
        this.myCurrentEntity = {};
        this.myGrid = {};
        this.collectionLength = 0;
        this.lockStatus = "locked";
        this.lockColor = "red";
      }, _temp));

      _export("sample01", sample01);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7MEJBR0s7MkJBV1gscUNBQWEsR0FBRTtBQUNiLFlBQUUsUUFBRixHQUFhLElBQWIsQ0FEYTs7O0FBWEosMkJBZVgscUNBQWEsR0FBRTtBQUNiLFlBQUUsUUFBRixHQUFhLEtBQWIsQ0FEYTtBQUViLFlBQUUsZ0JBQUYsQ0FBbUIsSUFBbkIsR0FBMEIsRUFBRSxJQUFGLENBRmI7QUFHYixZQUFFLGdCQUFGLENBQW1CLE9BQW5CLEdBQTZCLEVBQUUsT0FBRixDQUhoQjs7O0FBZkosMkJBcUJYLHlDQUFlLEdBQUU7QUFDZixZQUFFLFFBQUYsR0FBYSxLQUFiLENBRGU7QUFFZixZQUFFLElBQUYsR0FBUyxFQUFFLGdCQUFGLENBQW1CLElBQW5CLENBRk07QUFHZixZQUFFLE9BQUYsR0FBWSxFQUFFLGdCQUFGLENBQW1CLE9BQW5CLENBSEc7OztBQXJCTiwyQkE2QlgsbUNBQVksR0FBRTtBQUNaLGtCQUFRLEdBQVIsQ0FBWSxPQUFaLEVBRFk7OztBQTdCSCwyQkFrQ1gseUNBQWUsR0FBRTtBQUNmLGtCQUFRLEdBQVIsQ0FBWSxVQUFaLEVBRGU7OztBQVlqQixpQkE5Q1csUUE4Q1gsQ0FBWSxPQUFaLEVBQXFCLGtCQUFyQixFQUF5Qzs7O2dDQTlDOUIsVUE4QzhCOzs7O0FBRXZDLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FGdUM7O0FBS3ZDLGVBQUssa0JBQUwsR0FBMEIsa0JBQTFCLENBTHVDO0FBTXZDLGVBQUssa0JBQUwsQ0FBd0IsWUFBeEIsQ0FBcUMsS0FBckMsRUFBNEMsVUFBQyxJQUFELEVBQVU7QUFDcEQsa0JBQUssWUFBTCxHQUFvQixJQUFwQixDQURvRDtBQUVwRCxrQkFBSyxnQkFBTCxHQUF3QixNQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FGNEI7V0FBVixDQUE1QyxDQU51QztTQUF6Qzs7QUE5Q1csMkJBMkRYLCtCQUFVO0FBQ1IsZUFBSyxVQUFMLEdBQWtCLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBaEIsRUFBbEIsQ0FEUTs7O0FBM0RDLDJCQWtFWCwrQkFBVTs7QUFFUixjQUFHLEtBQUssVUFBTCxLQUFtQixRQUFuQixFQUE2QjtBQUM5QixpQkFBSyxVQUFMLEdBQWtCLFVBQWxCLENBRDhCO0FBRTlCLGlCQUFLLFNBQUwsR0FBaUIsT0FBakIsQ0FGOEI7QUFHOUIsaUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsV0FBaEIsQ0FBNEIsSUFBNUIsRUFIOEI7V0FBaEMsTUFJTTtBQUNKLGlCQUFLLFVBQUwsR0FBa0IsUUFBbEIsQ0FESTtBQUVKLGlCQUFLLFNBQUwsR0FBaUIsS0FBakIsQ0FGSTtBQUdKLGlCQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFdBQWhCLENBQTRCLEtBQTVCLEVBSEk7V0FKTjs7O0FBcEVTLDJCQXNGWCxpQ0FBVyxHQUFHOzs7QUFFWixlQUFLLGtCQUFMLENBQXdCLEtBQXhCLEdBRlk7QUFHWixlQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLENBQXJDLEVBQXdDLFVBQUMsSUFBRCxFQUFVO0FBQ2hELG1CQUFLLFlBQUwsR0FBb0IsSUFBcEIsQ0FEZ0Q7QUFFaEQsbUJBQUssZ0JBQUwsR0FBd0IsT0FBSyxZQUFMLENBQWtCLE1BQWxCLENBRndCO1dBQVYsQ0FBeEMsQ0FIWTs7O0FBdEZILDJCQStGWCx5QkFBTyxHQUFHLGNBQWM7OztBQUV0QixlQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLENBQXJDLEVBQXdDLFVBQUMsSUFBRCxFQUFVO0FBQ2hELGlCQUFLLE9BQUwsQ0FBYSxVQUFDLENBQUQsRUFBTztBQUNsQixxQkFBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLENBQXZCLEVBRGtCO2FBQVAsQ0FBYixDQURnRDtBQUloRCxnQkFBRyxZQUFILEVBQWdCO0FBQ2QscUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsZ0JBQWhCLEdBRGM7YUFBaEI7O0FBSUEsbUJBQUssZ0JBQUwsR0FBd0IsT0FBSyxZQUFMLENBQWtCLE1BQWxCLENBUndCO1dBQVYsQ0FBeEMsQ0FGc0I7OztBQS9GYiwyQkE4R1gsdUNBQWM7OztBQUNaLGNBQUk7QUFDRixpQkFBSyxrQkFBTCxDQUF3QixZQUF4QixDQUFxQyxDQUFyQyxFQUF3QyxVQUFDLElBQUQsRUFBVTtBQUNoRCxxQkFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLEtBQUssQ0FBTCxDQUEvQixFQURnRDthQUFWLENBQXhDLENBREU7V0FBSixDQUlFLE9BQU8sQ0FBUCxFQUFTO0FBQ1Qsb0JBQVEsR0FBUixDQUFZLENBQVosRUFEUztXQUFUOzs7QUFuSE8sMkJBd0hYLHlDQUFlOzs7QUFDYixjQUFJO0FBQ0YsaUJBQUksSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLENBQUosRUFBTyxHQUF0QixFQUEwQjtBQUN4QixtQkFBSyxrQkFBTCxDQUF3QixZQUF4QixDQUFxQyxDQUFyQyxFQUF3QyxVQUFDLElBQUQsRUFBVTtBQUNoRCx1QkFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLEtBQUssQ0FBTCxDQUEvQixFQURnRDtlQUFWLENBQXhDLENBRHdCO2FBQTFCO1dBREYsQ0FNRSxPQUFPLENBQVAsRUFBUztBQUNULG9CQUFRLEdBQVIsQ0FBWSxDQUFaLEVBRFM7V0FBVDs7O0FBL0hPLDJCQXFJWCwyQ0FBaUI7QUFDZixlQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFEZTtBQUVmLGVBQUssZ0JBQUwsR0FBd0IsS0FBSyxZQUFMLENBQWtCLE1BQWxCLENBRlQ7OztBQXJJTiwyQkEwSVgseUNBQWdCO0FBQ2QsZUFBSyxZQUFMLENBQWtCLEdBQWxCLEdBRGM7QUFFZCxlQUFLLGdCQUFMLEdBQXdCLEtBQUssWUFBTCxDQUFrQixNQUFsQixDQUZWOzs7QUExSUwsMkJBK0lYLDJDQUFnQixHQUFHO0FBQ2pCLGVBQUssWUFBTCxDQUFrQixNQUFsQixDQUF5QixDQUF6QixFQUE0QixDQUE1QixFQURpQjtBQUVqQixlQUFLLGdCQUFMLEdBQXdCLEtBQUssWUFBTCxDQUFrQixNQUFsQixDQUZQOzs7QUEvSVIsMkJBc0pYLHlDQUFlLEdBQUc7QUFDaEIsZUFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLEtBQUssWUFBTCxDQUFrQixNQUFsQixHQUEyQixDQUEzQixFQUE4QixDQUF2RCxFQURnQjtBQUVoQixlQUFLLGdCQUFMLEdBQXdCLEtBQUssWUFBTCxDQUFrQixNQUFsQixDQUZSOzs7QUF0SlAsMkJBNkpYLDZCQUFTOzs7QUFDUCxlQUFLLFlBQUwsQ0FBa0IsR0FBbEIsR0FETzs7QUFHUCxlQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFITzs7QUFLUCxlQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFMTzs7QUFPUCxlQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLENBQXJDLEVBQXdDLFVBQUMsSUFBRCxFQUFVO0FBQ2hELG1CQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsS0FBSyxDQUFMLENBQXZCLEVBRGdEO0FBRWhELG1CQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsS0FBSyxDQUFMLENBQXZCLEVBRmdEO1dBQVYsQ0FBeEMsQ0FQTzs7O0FBN0pFLDJCQTJLWCx5QkFBTyxHQUFFOztBQUVQLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBaEIsQ0FBMkI7QUFDekIsdUJBQVcsQ0FBWDtBQUNBLGlCQUFLLElBQUw7V0FGRixFQUdHLEtBSEgsRUFGTzs7QUFRUCxlQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFVBQWhCLEdBUk87O0FBV1AsZUFBSyxNQUFMLENBQVksR0FBWixDQUFnQixnQkFBaEIsR0FYTzs7O0FBM0tFLDJCQTBMWCx5QkFBTyxHQUFFO0FBQ1AsY0FBRyxLQUFJLEtBQUosRUFBVztBQUNaLGlCQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFNBQWhCLENBQTBCLEVBQTFCLEVBRFk7V0FBZDtBQUdBLGNBQUcsS0FBSSxTQUFKLEVBQWU7QUFDaEIsaUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsU0FBaEIsQ0FBMEIsQ0FBQyxFQUFDLFdBQVUsU0FBVixFQUFxQixPQUFNLFNBQU4sRUFBaUIsVUFBUyxHQUFULEVBQXhDLENBQTFCLEVBRGdCO1dBQWxCO0FBR0EsY0FBRyxLQUFJLFFBQUosRUFBYztBQUNmLGlCQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFNBQWhCLENBQTBCLENBQUMsRUFBQyxXQUFVLFNBQVYsRUFBcUIsT0FBTSxRQUFOLEVBQWdCLFVBQVMsR0FBVCxFQUF2QyxDQUExQixFQURlO1dBQWpCOzs7ZUFqTVM7a0JBQ0osU0FBUyxDQUFDLE9BQUQsRUFBVSxrQkFBVjthQUloQixlQUFlO2FBQ2Ysa0JBQWtCO2FBQ2xCLFNBQVM7YUFrQ1QsbUJBQWtCO2FBc0JsQixhQUFhO2FBQ2IsWUFBWSIsImZpbGUiOiJzYW1wbGVzL3NhbXBsZTA0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
