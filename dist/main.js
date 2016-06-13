'use strict';

System.register(['bootstrap'], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_bootstrap) {}],
    execute: function () {
      function configure(aurelia) {
        aurelia.use.standardConfiguration().developmentLogging().plugin('aurelia-v-grid');

        aurelia.use.globalResources('shared/collapse-panel');
        aurelia.use.globalResources('shared/markdown');
        aurelia.use.globalResources('shared/logger');
        aurelia.use.globalResources('shared/au-code');
        aurelia.use.globalResources('shared/v-grid-control-form.html');

        aurelia.start().then(function (au) {
          return au.setRoot('app');
        });
      }

      _export('configure', configure);
    }
  };
});
//# sourceMappingURL=main.js.map
