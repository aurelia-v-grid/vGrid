'use strict';

System.register(['aurelia-dependency-injection', '../shared/component-service'], function (_export, _context) {
  "use strict";

  var inject, ComponentService, _dec, _class, Controls;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_sharedComponentService) {
      ComponentService = _sharedComponentService.ComponentService;
    }],
    execute: function () {
      _export('Controls', Controls = (_dec = inject(ComponentService), _dec(_class = function Controls(componentService) {
        _classCallCheck(this, Controls);

        this.categories = componentService.getIterableComponents();
      }) || _class));

      _export('Controls', Controls);
    }
  };
});
//# sourceMappingURL=controls.js.map
