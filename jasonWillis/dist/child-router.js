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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoaWxkLXJvdXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs2QkFBYTs7OztlQUNYLFVBQVU7OztBQURDLDhCQUdYLDJDQUFnQixRQUFRLFFBQVE7QUFDOUIsaUJBQU8sR0FBUCxDQUFXLENBQ1QsRUFBRSxPQUFPLENBQUMsRUFBRCxFQUFLLFNBQUwsQ0FBUCxFQUF3QixNQUFNLFNBQU4sRUFBdUIsVUFBVSxTQUFWLEVBQTJCLEtBQUssSUFBTCxFQUFXLE9BQU8sU0FBUCxFQUQ5RSxFQUVULEVBQUUsT0FBTyxPQUFQLEVBQXdCLE1BQU0sT0FBTixFQUF1QixVQUFVLE9BQVYsRUFBMkIsS0FBSyxJQUFMLEVBQVcsT0FBTyxjQUFQLEVBRjlFLEVBR1QsRUFBRSxPQUFPLGNBQVAsRUFBd0IsTUFBTSxjQUFOLEVBQXVCLFVBQVUsY0FBVixFQUEyQixLQUFLLElBQUwsRUFBVyxPQUFPLGNBQVAsRUFIOUUsQ0FBWCxFQUQ4Qjs7QUFPOUIsZUFBSyxNQUFMLEdBQWMsTUFBZCxDQVA4Qjs7O2VBSHJCIiwiZmlsZSI6ImNoaWxkLXJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
