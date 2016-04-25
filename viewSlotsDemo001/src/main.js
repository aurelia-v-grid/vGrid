import 'bootstrap';


export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .globalResources()
    .plugin("vGrid/plugin");


  aurelia.start().then(a => a.setRoot());
}
