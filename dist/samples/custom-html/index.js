'use strict';

System.register(['aurelia-framework', 'shared/registry'], function (_export, _context) {
  "use strict";

  var useView, inject, Registry, _dec, _dec2, _class, Index;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      useView = _aureliaFramework.useView;
      inject = _aureliaFramework.inject;
    }, function (_sharedRegistry) {
      Registry = _sharedRegistry.Registry;
    }],
    execute: function () {
      _export('Index', Index = (_dec = useView('shared/showcase.html'), _dec2 = inject(Registry), _dec(_class = _dec2(_class = function () {
        function Index(registry) {
          _classCallCheck(this, Index);

          this.registry = registry;
        }

        Index.prototype.configureRouter = function configureRouter(config, router) {
          this.router = router;
          return this.registry.load(config, 'custom-html');
        };

        return Index;
      }()) || _class) || _class));

      _export('Index', Index);
    }
  };
});
//# sourceMappingURL=index.js.map
