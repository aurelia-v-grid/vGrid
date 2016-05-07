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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFRLHdCLDJCQUFBLGtCOzs7d0JBRUssTTt5QkFVWCxTLHNCQUFXLEksRUFBTTtBQUNmLGNBQUksSUFBSixFQUFVOztBQUVSLGlCQUFLLGVBQUwsR0FBdUIsS0FBSyxLQUE1Qjs7QUFFQSxpQkFBSyxZQUFMLEdBQW9CLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsQ0FBakIsQ0FBcEI7QUFDQSxpQkFBSyxLQUFMLEdBQVcsU0FBWDtBQUNEO0FBQ0YsUzs7QUFHRCx3QkFBWSxrQkFBWixFQUFnQztBQUFBOztBQUFBOztBQUFBOztBQUk5QixlQUFLLGtCQUFMLEdBQTBCLGtCQUExQjtBQUNBLGVBQUssa0JBQUwsQ0FBd0IsWUFBeEIsQ0FBcUMsR0FBckMsRUFBMEMsVUFBQyxJQUFELEVBQVU7QUFDbEQsa0JBQUssWUFBTCxHQUFvQixJQUFwQjtBQUNGLGtCQUFLLGdCQUFMLEdBQXdCLE1BQUssWUFBTCxDQUFrQixNQUExQztBQUNELFdBSEM7QUFLRDs7eUJBTUQsVSx1QkFBVyxDLEVBQUc7QUFBQTs7QUFFWixlQUFLLGtCQUFMLENBQXdCLEtBQXhCO0FBQ0EsZUFBSyxrQkFBTCxDQUF3QixZQUF4QixDQUFxQyxDQUFyQyxFQUF3QyxVQUFDLElBQUQsRUFBVTtBQUNoRCxtQkFBSyxZQUFMLEdBQW9CLElBQXBCO0FBQ0YsbUJBQUssZ0JBQUwsR0FBd0IsT0FBSyxZQUFMLENBQWtCLE1BQTFDO0FBQ0QsV0FIQztBQUlELFM7O3lCQUVELE0sbUJBQU8sQyxFQUFHLFksRUFBYztBQUFBOztBQUV0QixlQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLENBQXJDLEVBQXdDLFVBQUMsSUFBRCxFQUFVO0FBQ2hELGlCQUFLLE9BQUwsQ0FBYSxVQUFDLENBQUQsRUFBTztBQUNwQixxQkFBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLENBQXZCO0FBQ0gsYUFGRztBQUdGLGdCQUFHLFlBQUgsRUFBZ0I7QUFDZCxxQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixnQkFBaEI7QUFDRDs7QUFFRCxtQkFBSyxnQkFBTCxHQUF3QixPQUFLLFlBQUwsQ0FBa0IsTUFBMUM7QUFDRCxXQVRDO0FBVUQsUzs7eUJBR0QsWSwyQkFBYztBQUFBOztBQUNaLGNBQUk7QUFDRixpQkFBSyxrQkFBTCxDQUF3QixZQUF4QixDQUFxQyxDQUFyQyxFQUF3QyxVQUFDLElBQUQsRUFBVTtBQUNoRCxxQkFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLEtBQUssQ0FBTCxDQUEvQjtBQUNILGFBRkM7QUFHRCxXQUpELENBSUUsT0FBTyxDQUFQLEVBQVM7QUFDVCxvQkFBUSxHQUFSLENBQVksQ0FBWjtBQUNEO0FBQ0YsUzs7eUJBRUQsYSw0QkFBZTtBQUFBOztBQUNiLGNBQUk7QUFDRixpQkFBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksQ0FBbkIsRUFBc0IsR0FBdEIsRUFBMEI7QUFDeEIsbUJBQUssa0JBQUwsQ0FBd0IsWUFBeEIsQ0FBcUMsQ0FBckMsRUFBd0MsVUFBQyxJQUFELEVBQVU7QUFDaEQsdUJBQUssWUFBTCxDQUFrQixNQUFsQixDQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixLQUFLLENBQUwsQ0FBL0I7QUFDSCxlQUZDO0FBR0Q7QUFDRixXQU5ELENBTUUsT0FBTyxDQUFQLEVBQVM7QUFDVCxvQkFBUSxHQUFSLENBQVksQ0FBWjtBQUNEO0FBQ0YsUzs7eUJBR0QsYyw2QkFBaUI7QUFDZixlQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUI7QUFDQSxlQUFLLGdCQUFMLEdBQXdCLEtBQUssWUFBTCxDQUFrQixNQUExQztBQUNELFM7O3lCQUVELGEsNEJBQWdCO0FBQ2QsZUFBSyxZQUFMLENBQWtCLEdBQWxCO0FBQ0EsZUFBSyxnQkFBTCxHQUF3QixLQUFLLFlBQUwsQ0FBa0IsTUFBMUM7QUFDRCxTOzt5QkFFRCxlLDRCQUFnQixDLEVBQUc7QUFDakIsZUFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLENBQXpCLEVBQTRCLENBQTVCO0FBQ0EsZUFBSyxnQkFBTCxHQUF3QixLQUFLLFlBQUwsQ0FBa0IsTUFBMUM7QUFFRCxTOzt5QkFHRCxjLDJCQUFlLEMsRUFBRztBQUNoQixlQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBeUIsS0FBSyxZQUFMLENBQWtCLE1BQWxCLEdBQTJCLENBQXBELEVBQXVELENBQXZEO0FBQ0EsZUFBSyxnQkFBTCxHQUF3QixLQUFLLFlBQUwsQ0FBa0IsTUFBMUM7QUFFRCxTOzs7a0JBeEdNLE0sR0FBUyxDQUFDLGtCQUFELEM7YUFHaEIsWSxHQUFlLEU7YUFDZixlLEdBQWtCLEU7YUFDbEIsTSxHQUFTLEUiLCJmaWxlIjoic2FtcGxlcy9zYW1wbGUwMy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
