import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-v-grid');

  aurelia.use.globalResources('shared/collapse-panel');
  aurelia.use.globalResources('shared/markdown');
  aurelia.use.globalResources('shared/logger');
  aurelia.use.globalResources('shared/au-code');
  aurelia.use.globalResources('shared/v-grid-control-form.html');
  aurelia.use.globalResources('shared/v-grid-buttons-form');

  aurelia.start()
    .then(au => au.setRoot('app'));
}
