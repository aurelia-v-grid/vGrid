import 'bootstrap';
import moment from 'moment';
window.moment = moment;


export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin("vGrid/plugin")
    .globalResources("v-grid-row-cells-customx")


  aurelia.start().then(a => a.setRoot());
}
