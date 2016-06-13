'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var Index;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('Index', Index = function () {
        function Index() {
          _classCallCheck(this, Index);
        }

        Index.prototype.configureRouter = function configureRouter(config, router) {
          config.map([{ name: 'default', route: ['help', ''], moduleId: './help' }, { name: 'free-support', route: ['free-support', ''], moduleId: './help', title: 'Support' }, { name: 'support-exchange', route: 'support-exchange', moduleId: './help', title: 'Support Exchange' }]);
        };

        return Index;
      }());

      _export('Index', Index);
    }
  };
});
//# sourceMappingURL=index.js.map
