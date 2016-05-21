'use strict';

System.register([], function (_export, _context) {
  "use strict";

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
          config.title = '<-goto github';
          config.map([{ route: ['', 'sample01'], name: 'sample01', moduleId: './samples/sample01', nav: true, title: 'normal with filter/sorting' }, { route: ['sample03'], name: 'sample03', moduleId: './samples/sample03', nav: true, title: 'selection column' }, { route: ['sample02'], name: 'sample03', moduleId: './samples/sample02', nav: true, title: 'repeat row html' }]);
          this.router = router;
        };

        return App;
      }());

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3FCQUFhLEc7Ozs7O3NCQUNYLGUsNEJBQWdCLE0sRUFBUSxNLEVBQU87QUFDN0IsaUJBQU8sS0FBUCxHQUFlLGVBQWY7QUFDQSxpQkFBTyxHQUFQLENBQVcsQ0FDVCxFQUFFLE9BQU8sQ0FBQyxFQUFELEVBQUksVUFBSixDQUFULEVBQTBCLE1BQU0sVUFBaEMsRUFBNEMsVUFBVSxvQkFBdEQsRUFBNkUsS0FBSyxJQUFsRixFQUF3RixPQUFNLDRCQUE5RixFQURTLEVBRVQsRUFBRSxPQUFPLENBQUMsVUFBRCxDQUFULEVBQXVCLE1BQU0sVUFBN0IsRUFBeUMsVUFBVSxvQkFBbkQsRUFBMEUsS0FBSyxJQUEvRSxFQUFxRixPQUFNLGtCQUEzRixFQUZTLEVBR1QsRUFBRSxPQUFPLENBQUMsVUFBRCxDQUFULEVBQXVCLE1BQU0sVUFBN0IsRUFBeUMsVUFBVSxvQkFBbkQsRUFBMEUsS0FBSyxJQUEvRSxFQUFxRixPQUFNLGlCQUEzRixFQUhTLENBQVg7QUFNQSxlQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0QsUyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
