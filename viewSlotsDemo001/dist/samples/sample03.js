"use strict";

System.register(["data/dummyDataGenerator"], function (_export, _context) {
  var dummyDataGenerator, _class, _temp, _initialiseProps, sample;

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
      _export("sample", sample = (_temp = _class = function () {
        sample.prototype.onRowDraw = function onRowDraw(data) {
          if (data) {

            data.backgroundcolor = data.color;

            data.avatarLetter = data.name.charAt(0);
            data.phone = "wowowow";
          }
        };

        function sample(dummyDataGenerator) {
          var _this = this;

          _classCallCheck(this, sample);

          _initialiseProps.call(this);

          this.dummyDataGenerator = dummyDataGenerator;
          this.dummyDataGenerator.generateData(100, function (data) {
            _this.myCollection = data;
            _this.collectionLength = _this.myCollection.length;
          });
        }

        sample.prototype.replaceBtn = function replaceBtn(x) {
          var _this2 = this;

          this.dummyDataGenerator.reset();
          this.dummyDataGenerator.generateData(x, function (data) {
            _this2.myCollection = data;
            _this2.collectionLength = _this2.myCollection.length;
          });
        };

        sample.prototype.addBtn = function addBtn(x, scrollBottom) {
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

        sample.prototype.insertOneBtn = function insertOneBtn() {
          var _this4 = this;

          try {
            this.dummyDataGenerator.generateData(1, function (data) {
              _this4.myCollection.splice(2, 0, data[0]);
            });
          } catch (e) {
            console.log(e);
          }
        };

        sample.prototype.insertFiveBtn = function insertFiveBtn() {
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

        sample.prototype.removeFirstBtn = function removeFirstBtn() {
          this.myCollection.splice(0, 1);
          this.collectionLength = this.myCollection.length;
        };

        sample.prototype.removeLastBtn = function removeLastBtn() {
          this.myCollection.pop();
          this.collectionLength = this.myCollection.length;
        };

        sample.prototype.removeFirstxBtn = function removeFirstxBtn(x) {
          this.myCollection.splice(0, x);
          this.collectionLength = this.myCollection.length;
        };

        sample.prototype.removeLastxBtn = function removeLastxBtn(x) {
          this.myCollection.splice(this.myCollection.length - x, x);
          this.collectionLength = this.myCollection.length;
        };

        return sample;
      }(), _class.inject = [dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myCollection = [];
        this.myCurrentEntity = {};
        this.myGrid = {};
      }, _temp));

      _export("sample", sample);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFwRk4seUJBeUZYLHlDQUFnQjtBQUNkLGVBQUssWUFBTCxDQUFrQixHQUFsQixHQURjO0FBRWQsZUFBSyxnQkFBTCxHQUF3QixLQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FGVjs7O0FBekZMLHlCQThGWCwyQ0FBZ0IsR0FBRztBQUNqQixlQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFEaUI7QUFFakIsZUFBSyxnQkFBTCxHQUF3QixLQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FGUDs7O0FBOUZSLHlCQXFHWCx5Q0FBZSxHQUFHO0FBQ2hCLGVBQUssWUFBTCxDQUFrQixNQUFsQixDQUF5QixLQUFLLFlBQUwsQ0FBa0IsTUFBbEIsR0FBMkIsQ0FBM0IsRUFBOEIsQ0FBdkQsRUFEZ0I7QUFFaEIsZUFBSyxnQkFBTCxHQUF3QixLQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FGUjs7O2VBckdQO2tCQUNKLFNBQVMsQ0FBQyxrQkFBRDthQUdoQixlQUFlO2FBQ2Ysa0JBQWtCO2FBQ2xCLFNBQVMiLCJmaWxlIjoic2FtcGxlcy9zYW1wbGUwMy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
