import { Aurelia } from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-v-grid');

  await aurelia.start();
  await aurelia.setRoot('app');
}
