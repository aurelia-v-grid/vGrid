System.register(['aurelia-framework', 'data/dummyDataGenerator'], function (_export) {
  'use strict';

  var inject, dummyDataGenerator, App;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_dataDummyDataGenerator) {
      dummyDataGenerator = _dataDummyDataGenerator.dummyDataGenerator;
    }],
    execute: function () {
      App = (function () {
        function App(dummyDataGenerator, vc, container, resources) {
          _classCallCheck(this, _App);

          this.myCollection = [];
          this.myCurrentEntity = {};
          this.rowHeight = 50;

          this.dummyDataGenerator = dummyDataGenerator;
        }

        _createClass(App, [{
          key: 'replaceBtn',
          value: function replaceBtn(x) {
            this.dummyDataGenerator.generateData(x, (function (data) {
              this.myCollection = data;
            }).bind(this));
          }
        }, {
          key: 'removeAllBtn',
          value: function removeAllBtn() {
            this.myCollection = [];
          }
        }, {
          key: 'addBtn',
          value: function addBtn(x) {
            this.dummyDataGenerator.generateData(x, (function (data) {
              data.forEach((function (x) {
                this.myCollection.push(x);
              }).bind(this));
            }).bind(this));
          }
        }, {
          key: 'addOneBtn',
          value: function addOneBtn() {
            this.dummyDataGenerator.generateData(1, (function (data) {
              this.myCollection.push(data[0]);
            }).bind(this));
          }
        }, {
          key: 'removeLastBtn',
          value: function removeLastBtn() {
            this.myCollection.pop();
          }
        }, {
          key: 'removeFirstBtn',
          value: function removeFirstBtn() {
            this.myCollection.splice(0, 1);
          }
        }, {
          key: 'removeSecondBtn',
          value: function removeSecondBtn() {
            this.myCollection.splice(1, 1);
          }
        }]);

        var _App = App;
        App = inject(dummyDataGenerator)(App) || App;
        return App;
      })();

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a0NBSWEsR0FBRzs7Ozs7Ozs7aUNBSlIsTUFBTTs7bURBQ04sa0JBQWtCOzs7QUFHYixTQUFHO0FBZUgsaUJBZkEsR0FBRyxDQWVGLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFOzs7ZUFSMUQsWUFBWSxHQUFHLEVBQUU7ZUFDakIsZUFBZSxHQUFHLEVBQUU7ZUFFcEIsU0FBUyxHQUFFLEVBQUU7O0FBT1gsY0FBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1NBRTlDOztxQkFuQlUsR0FBRzs7aUJBNEJKLG9CQUFDLENBQUMsRUFBRTtBQUVaLGdCQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFBLFVBQVUsSUFBSSxFQUFFO0FBQ3RELGtCQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzthQUMxQixDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7V0FDZDs7O2lCQUVXLHdCQUFHO0FBQ2IsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1dBQ3hCOzs7aUJBRUssZ0JBQUMsQ0FBQyxFQUFFO0FBRVIsZ0JBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUEsVUFBVSxJQUFJLEVBQUU7QUFDdEQsa0JBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQSxVQUFVLENBQUMsRUFBRTtBQUN4QixvQkFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7ZUFDMUIsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO2FBQ2QsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1dBQ2Q7OztpQkFFUSxxQkFBRztBQUNWLGdCQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFBLFVBQVUsSUFBSSxFQUFFO0FBQ3RELGtCQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQyxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7V0FDZDs7O2lCQUVZLHlCQUFHO0FBQ2QsZ0JBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7V0FDekI7OztpQkFFYSwwQkFBRztBQUNmLGdCQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7V0FDaEM7OztpQkFFYywyQkFBRztBQUNoQixnQkFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1dBQ2hDOzs7bUJBaEVVLEdBQUc7QUFBSCxXQUFHLEdBRGYsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQ2QsR0FBRyxLQUFILEdBQUc7ZUFBSCxHQUFHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
