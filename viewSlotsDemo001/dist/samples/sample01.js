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
//# sourceMappingURL=data:application/json;base64,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LENBRlM7QUFHYixjQUFJLFdBQVUsU0FBUyxZQUFULENBQXNCLE9BQXRCLENBQThCLE9BQTlCLENBQVYsQ0FIUzs7QUFNYixtQkFBUyxZQUFULENBQXNCLFFBQXRCLElBQWtDLE9BQWxDLENBTmE7QUFPYixtQkFBUyxZQUFULENBQXNCLFFBQXRCLElBQWtDLE1BQWxDLENBUGE7O0FBU2IsbUJBQVMsY0FBVCxDQUF3QixRQUF4QixJQUFvQyxPQUFwQyxDQVRhO0FBVWIsbUJBQVMsY0FBVCxDQUF3QixRQUF4QixJQUFvQyxNQUFwQyxDQVZhOztBQWFiLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBaEIsQ0FBMkIsUUFBM0IsRUFiYTtBQWNiLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsY0FBaEIsR0FkYTs7O0FBOUxKLDJCQWdOWCwyQkFBUTtBQUNOLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsWUFBaEIsR0FETTs7O2VBaE5HO2tCQUNKLFNBQVMsQ0FBQyxPQUFELEVBQVUsa0JBQVY7YUFRaEIsZUFBZTthQUNmLGtCQUFrQjthQUNsQixTQUFTO2FBZ0NULG1CQUFrQjthQXNCbEIsYUFBYTthQUNiLFlBQVk7YUE4R1osV0FBVSIsImZpbGUiOiJzYW1wbGVzL3NhbXBsZTAxLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
