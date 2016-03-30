import 'bootstrap';


export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .globalResources();

  aurelia.start().then(a => a.setRoot());
}
