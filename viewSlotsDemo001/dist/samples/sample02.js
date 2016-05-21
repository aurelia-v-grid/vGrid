"use strict";

System.register(["data/dummyDataGenerator"], function (_export, _context) {
  "use strict";

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
//# sourceMappingURL=data:application/json;base64,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RCxFQUF1RCxDQUF2RDtBQUNBLGVBQUssZ0JBQUwsR0FBd0IsS0FBSyxZQUFMLENBQWtCLE1BQTFDO0FBRUQsUzs7MkJBR0QsTyxzQkFBUztBQUFBOztBQUNQLGVBQUssWUFBTCxDQUFrQixHQUFsQjs7QUFFQSxlQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUI7O0FBRUEsZUFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLENBQXpCLEVBQTRCLENBQTVCOztBQUVBLGVBQUssa0JBQUwsQ0FBd0IsWUFBeEIsQ0FBcUMsQ0FBckMsRUFBd0MsVUFBQyxJQUFELEVBQVU7QUFDaEQsbUJBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixLQUFLLENBQUwsQ0FBdkI7QUFDQSxtQkFBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLEtBQUssQ0FBTCxDQUF2QjtBQUNELFdBSEQ7QUFLRCxTOzsyQkFFRCxNLG1CQUFPLEMsRUFBRTs7QUFFUCxlQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFVBQWhCLENBQTJCO0FBQ3pCLHVCQUFXLENBRGM7QUFFekIsaUJBQUs7QUFGb0IsV0FBM0IsRUFHRyxLQUhIOztBQU1BLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBaEI7O0FBR0EsZUFBSyxNQUFMLENBQVksR0FBWixDQUFnQixnQkFBaEI7QUFDRCxTOzsyQkFHRCxNLG1CQUFPLEMsRUFBRTtBQUNQLGNBQUcsS0FBSSxLQUFQLEVBQWM7QUFDWixpQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixTQUFoQixDQUEwQixFQUExQjtBQUNEO0FBQ0QsY0FBRyxLQUFJLFNBQVAsRUFBa0I7QUFDaEIsaUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsU0FBaEIsQ0FBMEIsQ0FBQyxFQUFDLFdBQVUsU0FBWCxFQUFzQixPQUFNLFNBQTVCLEVBQXVDLFVBQVMsR0FBaEQsRUFBRCxDQUExQjtBQUNEO0FBQ0QsY0FBRyxLQUFJLFFBQVAsRUFBaUI7QUFDZixpQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixTQUFoQixDQUEwQixDQUFDLEVBQUMsV0FBVSxTQUFYLEVBQXNCLE9BQU0sUUFBNUIsRUFBc0MsVUFBUyxHQUEvQyxFQUFELENBQTFCO0FBQ0Q7QUFDRixTOzs7a0JBbk1NLE0sR0FBUyxDQUFDLE9BQUQsRUFBVSxrQkFBVixDO2FBSWhCLFksR0FBZSxFO2FBQ2YsZSxHQUFrQixFO2FBQ2xCLE0sR0FBUyxFO2FBa0NULGdCLEdBQWtCLEM7YUFzQmxCLFUsR0FBYSxRO2FBQ2IsUyxHQUFZLEsiLCJmaWxlIjoic2FtcGxlcy9zYW1wbGUwMi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
