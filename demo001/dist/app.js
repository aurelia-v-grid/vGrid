'use strict';

System.register(['aurelia-framework', 'data/dummyDataGenerator'], function (_export, _context) {
  var inject, dummyDataGenerator, _dec, _class, App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_dataDummyDataGenerator) {
      dummyDataGenerator = _dataDummyDataGenerator.dummyDataGenerator;
    }],
    execute: function () {
      _export('App', App = (_dec = inject(dummyDataGenerator), _dec(_class = function () {
        function App(dummyDataGenerator, vc, container, resources) {
          _classCallCheck(this, App);

          this.myCollection = [];
          this.myCurrentEntity = {};
          this.rowHeight = 50;

          this.dummyDataGenerator = dummyDataGenerator;
        }

        App.prototype.replaceBtn = function replaceBtn(x) {
          this.dummyDataGenerator.generateData(x, function (data) {
            this.myCollection = data;
          }.bind(this));
        };

        App.prototype.removeAllBtn = function removeAllBtn() {
          this.myCollection = [];
        };

        App.prototype.addBtn = function addBtn(x) {
          this.dummyDataGenerator.generateData(x, function (data) {
            data.forEach(function (x) {
              this.myCollection.push(x);
            }.bind(this));
          }.bind(this));
        };

        App.prototype.addOneBtn = function addOneBtn() {
          this.dummyDataGenerator.generateData(1, function (data) {
            this.myCollection.push(data[0]);
          }.bind(this));
        };

        App.prototype.removeLastBtn = function removeLastBtn() {
          this.myCollection.pop();
        };

        App.prototype.removeFirstBtn = function removeFirstBtn() {
          this.myCollection.splice(0, 1);
        };

        App.prototype.removeSecondBtn = function removeSecondBtn() {
          this.myCollection.splice(1, 1);
        };

        return App;
      }()) || _class));

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQVE7O0FBQ0E7OztxQkFHSyxjQURaLE9BQU8sa0JBQVA7QUFnQkMsaUJBZlcsR0FlWCxDQUFZLGtCQUFaLEVBQWdDLEVBQWhDLEVBQW9DLFNBQXBDLEVBQStDLFNBQS9DLEVBQTBEO2dDQWYvQyxLQWUrQzs7ZUFSMUQsZUFBZSxHQVEyQztlQVAxRCxrQkFBa0IsR0FPd0M7ZUFMMUQsWUFBVyxHQUsrQzs7QUFFeEQsZUFBSyxrQkFBTCxHQUEwQixrQkFBMUIsQ0FGd0Q7U0FBMUQ7O0FBZlcsc0JBNEJYLGlDQUFXLEdBQUc7QUFFWixlQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLENBQXJDLEVBQXdDLFVBQVUsSUFBVixFQUFnQjtBQUN0RCxpQkFBSyxZQUFMLEdBQW9CLElBQXBCLENBRHNEO1dBQWhCLENBRXRDLElBRnNDLENBRWpDLElBRmlDLENBQXhDLEVBRlk7OztBQTVCSCxzQkFtQ1gsdUNBQWU7QUFDYixlQUFLLFlBQUwsR0FBb0IsRUFBcEIsQ0FEYTs7O0FBbkNKLHNCQXVDWCx5QkFBTyxHQUFHO0FBRVIsZUFBSyxrQkFBTCxDQUF3QixZQUF4QixDQUFxQyxDQUFyQyxFQUF3QyxVQUFVLElBQVYsRUFBZ0I7QUFDdEQsaUJBQUssT0FBTCxDQUFhLFVBQVUsQ0FBVixFQUFhO0FBQ3hCLG1CQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsQ0FBdkIsRUFEd0I7YUFBYixDQUVYLElBRlcsQ0FFTixJQUZNLENBQWIsRUFEc0Q7V0FBaEIsQ0FJdEMsSUFKc0MsQ0FJakMsSUFKaUMsQ0FBeEMsRUFGUTs7O0FBdkNDLHNCQWdEWCxpQ0FBWTtBQUNWLGVBQUssa0JBQUwsQ0FBd0IsWUFBeEIsQ0FBcUMsQ0FBckMsRUFBd0MsVUFBVSxJQUFWLEVBQWdCO0FBQ3RELGlCQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsS0FBSyxDQUFMLENBQXZCLEVBRHNEO1dBQWhCLENBRXRDLElBRnNDLENBRWpDLElBRmlDLENBQXhDLEVBRFU7OztBQWhERCxzQkFzRFgseUNBQWdCO0FBQ2QsZUFBSyxZQUFMLENBQWtCLEdBQWxCLEdBRGM7OztBQXRETCxzQkEwRFgsMkNBQWlCO0FBQ2YsZUFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBRGU7OztBQTFETixzQkE4RFgsNkNBQWtCO0FBQ2hCLGVBQUssWUFBTCxDQUFrQixNQUFsQixDQUF5QixDQUF6QixFQUE0QixDQUE1QixFQURnQjs7O2VBOURQIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
