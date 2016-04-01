'use strict';

System.register(['data/dummyDataGenerator'], function (_export, _context) {
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
      _export('sample', sample = (_temp = _class = function () {
        sample.prototype.onRowDraw = function onRowDraw(data) {
          if (data) {

            data.backgroundcolor = data.color;
            data.avatarLetter = data.name.charAt(0);
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

      _export('sample', sample);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFMLENBQWtCLEdBQWxCLEdBRGM7QUFFZCxlQUFLLGdCQUFMLEdBQXdCLEtBQUssWUFBTCxDQUFrQixNQUFsQixDQUZWOzs7QUF2RkwseUJBNEZYLDJDQUFnQixHQUFHO0FBQ2pCLGVBQUssWUFBTCxDQUFrQixNQUFsQixDQUF5QixDQUF6QixFQUE0QixDQUE1QixFQURpQjtBQUVqQixlQUFLLGdCQUFMLEdBQXdCLEtBQUssWUFBTCxDQUFrQixNQUFsQixDQUZQOzs7QUE1RlIseUJBbUdYLHlDQUFlLEdBQUc7QUFDaEIsZUFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLEtBQUssWUFBTCxDQUFrQixNQUFsQixHQUEyQixDQUEzQixFQUE4QixDQUF2RCxFQURnQjtBQUVoQixlQUFLLGdCQUFMLEdBQXdCLEtBQUssWUFBTCxDQUFrQixNQUFsQixDQUZSOzs7ZUFuR1A7a0JBQ0osU0FBUyxDQUFDLGtCQUFEO2FBR2hCLGVBQWU7YUFDZixrQkFBa0I7YUFDbEIsU0FBUyIsImZpbGUiOiJzYW1wbGVzL3NhbXBsZTAyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
