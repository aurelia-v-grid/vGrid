'use strict';

System.register([], function (_export, _context) {
  var App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('App', App = function () {
        function App() {
          _classCallCheck(this, App);
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
          config.title = 'v-grid aurelia element';
          config.map([{ route: ['', 'sample01'], name: 'sample01', moduleId: './samples/sample01', nav: true, title: 'col&internal functions' }]);

          this.router = router;
        };

        return App;
      }());

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztxQkFBYTs7Ozs7c0JBQ1gsMkNBQWdCLFFBQVEsUUFBTztBQUM3QixpQkFBTyxLQUFQLEdBQWUsd0JBQWYsQ0FENkI7QUFFN0IsaUJBQU8sR0FBUCxDQUFXLENBQ1QsRUFBRSxPQUFPLENBQUMsRUFBRCxFQUFJLFVBQUosQ0FBUCxFQUF3QixNQUFNLFVBQU4sRUFBa0IsVUFBVSxvQkFBVixFQUFpQyxLQUFLLElBQUwsRUFBVyxPQUFNLHdCQUFOLEVBRC9FLENBQVgsRUFGNkI7O0FBUTdCLGVBQUssTUFBTCxHQUFjLE1BQWQsQ0FSNkI7OztlQURwQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
