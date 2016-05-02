import 'bootstrap';
import moment from 'moment';
window.moment = moment;


export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .globalResources("datepicker")
    .plugin("vGrid/plugin");


  aurelia.start().then(a => a.setRoot());
}
