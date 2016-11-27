import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', '5k-rows'], name: '5k-rows', moduleId: './5k-rows', nav: true, title: '5k-rows' },
      { route: '5k-rows-remember', name: '5k-rows-remember', moduleId: './5k-rows-remember', nav: true, title: '5k-rows-remember' },
      { route: '5k-rows-columnbind', name: '5k-rows-columnbind', moduleId: './5k-rows-columnbind', nav: true, title: '5k-rows-columnbind' },
      { route: '50k-rows', name: '50k-rows', moduleId: './50k-rows', nav: true, title: '50k-rows' },
      { route: '800k-rows', name: '800k-rows(use chrome)', moduleId: './800k-rows', nav: true, title: '800k-rows(use chrome)' },
      { route: 'wakdb', name: 'wakdb( need wakdb running)', moduleId: './wakdb', nav: true, title: 'wakdb( need wakdb running)' },
      { route: 'child-router', name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
