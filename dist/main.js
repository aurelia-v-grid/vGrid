"use strict";

System.register(["bootstrap"], function (_export, _context) {
  "use strict";

  function configure(aurelia) {
    aurelia.use.standardConfiguration().developmentLogging().plugin("aurelia-v-grid");

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }

  _export("configure", configure);

  return {
    setters: [function (_bootstrap) {}],
    execute: function () {}
  };
});
//# sourceMappingURL=main.js.map
