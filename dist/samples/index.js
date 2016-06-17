'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var MainIndex;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('MainIndex', MainIndex = function () {
        function MainIndex() {
          _classCallCheck(this, MainIndex);
        }

        MainIndex.prototype.configureRouter = function configureRouter(config, router) {
          config.title = 'Samples';
          config.map([{
            name: 'simple-html-col',
            route: 'simple-html-col',
            moduleId: './simple-html-col/index',
            nav: true,
            title: 'Simple Column HTML'
          }, {
            name: 'column-bind',
            route: 'column-bind',
            moduleId: './column-bind/index',
            nav: true,
            title: 'Column.bind'
          }, {
            name: 'custom-html',
            route: 'custom-html',
            moduleId: './custom-html/index',
            nav: true,
            title: 'Custom Column HTML'
          }, {
            name: 'row-repeat',
            route: 'row-repeat',
            moduleId: './row-repeat/index',
            nav: true,
            title: 'Row repeat'
          }, { name: 'remote', route: 'other', moduleId: './remote/index', nav: true, title: 'remote' }, { name: 'default', route: '', redirect: 'simple-html-col' }]);
          this.router = router;
        };

        return MainIndex;
      }());

      _export('MainIndex', MainIndex);
    }
  };
});
//# sourceMappingURL=index.js.map
