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
        sample01.prototype.onRowDraw = function onRowDraw(data, collectionData) {
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

        sample01.prototype.saveStateBtn = function saveStateBtn() {
          this.oldState = this.myGrid.ctx.getColumns(this.oldState);
        };

        sample01.prototype.loadStateBtn = function loadStateBtn() {
          if (this.oldState) {
            this.myGrid.ctx.setColumns(this.oldState);
            this.myGrid.ctx.rebuildColumns();
          }
        };

        sample01.prototype.switchNameBtn = function switchNameBtn() {
          var oldState = this.myGrid.ctx.getColumns(this.oldState);
          var oldIndex = oldState.colAttrArray.indexOf("name");
          var newIndex = oldState.colAttrArray.indexOf("color");

          oldState.colAttrArray[oldIndex] = "color";
          oldState.colAttrArray[newIndex] = "name";

          oldState.colHeaderArray[oldIndex] = "Color";
          oldState.colHeaderArray[newIndex] = "Name";

          this.myGrid.ctx.setColumns(oldState);
          this.myGrid.ctx.rebuildColumns();
        };

        sample01.prototype.report = function report() {
          this.myGrid.ctx.createReport();
        };

        return sample01;
      }(), _class.inject = [Element, dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myCollection = [];
        this.myCurrentEntity = {};
        this.myGrid = {};
        this.collectionLength = 0;
        this.lockStatus = "locked";
        this.lockColor = "red";
        this.oldState = null;
      }, _temp));

      _export("sample01", sample01);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUZTO0FBR2IsY0FBSSxXQUFVLFNBQVMsWUFBVCxDQUFzQixPQUF0QixDQUE4QixPQUE5QixDQUFWLENBSFM7O0FBTWIsbUJBQVMsWUFBVCxDQUFzQixRQUF0QixJQUFrQyxPQUFsQyxDQU5hO0FBT2IsbUJBQVMsWUFBVCxDQUFzQixRQUF0QixJQUFrQyxNQUFsQyxDQVBhOztBQVNiLG1CQUFTLGNBQVQsQ0FBd0IsUUFBeEIsSUFBb0MsT0FBcEMsQ0FUYTtBQVViLG1CQUFTLGNBQVQsQ0FBd0IsUUFBeEIsSUFBb0MsTUFBcEMsQ0FWYTs7QUFhYixlQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFVBQWhCLENBQTJCLFFBQTNCLEVBYmE7QUFjYixlQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGNBQWhCLEdBZGE7OztBQWhNSiwyQkFtTlgsMkJBQVE7QUFDTixlQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFlBQWhCLEdBRE07OztlQW5ORztrQkFDSixTQUFTLENBQUMsT0FBRCxFQUFVLGtCQUFWO2FBT2hCLGVBQWU7YUFDZixrQkFBa0I7YUFDbEIsU0FBUzthQXdCVCxtQkFBa0I7YUFnQ2xCLGFBQWE7YUFDYixZQUFZO2FBK0daLFdBQVUiLCJmaWxlIjoic2FtcGxlcy9zYW1wbGUwMy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
