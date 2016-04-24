import 'bootstrap';


export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .globalResources('vGrid/v-grid-cell', 'vGrid/v-grid.css', 'vGrid/v-grid.js');

  aurelia.start().then(a => a.setRoot());
}
