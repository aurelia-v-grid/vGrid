'use strict';

System.register([], function (_export, _context) {
  var ChildRouter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('ChildRouter', ChildRouter = function () {
        function ChildRouter() {
          _classCallCheck(this, ChildRouter);

          this.heading = 'Child Router';
        }

        ChildRouter.prototype.configureRouter = function configureRouter(config, router) {
          config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Welcome' }, { route: 'users', name: 'users', moduleId: 'users', nav: true, title: 'Github Users' }, { route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }]);

          this.router = router;
        };

        return ChildRouter;
      }());

      _export('ChildRouter', ChildRouter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoaWxkLXJvdXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs2QkFBYSxXOzs7O2VBQ1gsTyxHQUFVLGM7Ozs4QkFFVixlLDRCQUFnQixNLEVBQVEsTSxFQUFRO0FBQzlCLGlCQUFPLEdBQVAsQ0FBVyxDQUNULEVBQUUsT0FBTyxDQUFDLEVBQUQsRUFBSyxTQUFMLENBQVQsRUFBMEIsTUFBTSxTQUFoQyxFQUFpRCxVQUFVLFNBQTNELEVBQTRFLEtBQUssSUFBakYsRUFBdUYsT0FBTyxTQUE5RixFQURTLEVBRVQsRUFBRSxPQUFPLE9BQVQsRUFBMEIsTUFBTSxPQUFoQyxFQUFpRCxVQUFVLE9BQTNELEVBQTRFLEtBQUssSUFBakYsRUFBdUYsT0FBTyxjQUE5RixFQUZTLEVBR1QsRUFBRSxPQUFPLGNBQVQsRUFBMEIsTUFBTSxjQUFoQyxFQUFpRCxVQUFVLGNBQTNELEVBQTRFLEtBQUssSUFBakYsRUFBdUYsT0FBTyxjQUE5RixFQUhTLENBQVg7O0FBTUEsZUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNELFMiLCJmaWxlIjoiY2hpbGQtcm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
