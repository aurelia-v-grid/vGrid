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
          config.title = 'Aurelia Skeleton Bridge App';

          config.map([{ name: 'about', route: ['about'], moduleId: 'about/about', title: 'About' }, { name: 'catalog-index', route: 'catalog-index', moduleId: 'catalog-index/controls', title: 'Catalog-index' }, { name: 'documentation', route: 'documentation', moduleId: 'documentation/documentation', title: 'Documentation' }, { name: 'help', route: 'help', moduleId: 'help/help', title: 'Help' }, { name: 'home', route: '', redirect: 'about/about' }, { name: 'installation', route: 'installation', moduleId: 'installation/installation', title: 'Installation' }, { name: 'samples', route: 'samples', moduleId: 'samples/index', title: 'Samples' }]);

          this.router = router;
        };

        return App;
      }());

      _export('App', App);
    }
  };
});
//# sourceMappingURL=app.js.map
