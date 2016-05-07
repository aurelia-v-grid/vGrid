import 'bootstrap';
import moment from 'moment';
window.moment = moment;
import {Promise, P} from 'bluebird';

export function configure(aurelia) {

  window.Promise = Promise;
  window.P = P;

  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .globalResources("datepicker")
    .plugin("vGrid/plugin");


  aurelia.start().then(a => a.setRoot());
}
