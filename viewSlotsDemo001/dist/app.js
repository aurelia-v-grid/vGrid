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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztxQkFBYTs7Ozs7c0JBQ1gsMkNBQWdCLFFBQVEsUUFBTztBQUM3QixpQkFBTyxLQUFQLEdBQWUsZUFBZixDQUQ2QjtBQUU3QixpQkFBTyxHQUFQLENBQVcsQ0FDVCxFQUFFLE9BQU8sQ0FBQyxFQUFELEVBQUksVUFBSixDQUFQLEVBQXdCLE1BQU0sVUFBTixFQUFrQixVQUFVLG9CQUFWLEVBQWlDLEtBQUssSUFBTCxFQUFXLE9BQU0sNEJBQU4sRUFEL0UsRUFFVCxFQUFFLE9BQU8sQ0FBQyxVQUFELENBQVAsRUFBcUIsTUFBTSxVQUFOLEVBQWtCLFVBQVUsb0JBQVYsRUFBaUMsS0FBSyxJQUFMLEVBQVcsT0FBTSxrQkFBTixFQUY1RSxFQUdULEVBQUUsT0FBTyxDQUFDLFVBQUQsQ0FBUCxFQUFxQixNQUFNLFVBQU4sRUFBa0IsVUFBVSxvQkFBVixFQUFpQyxLQUFLLElBQUwsRUFBVyxPQUFNLGlCQUFOLEVBSDVFLENBQVgsRUFGNkI7QUFRN0IsZUFBSyxNQUFMLEdBQWMsTUFBZCxDQVI2Qjs7O2VBRHBCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
