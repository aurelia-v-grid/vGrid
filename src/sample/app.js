export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', '5k-normal'], name: '5k-normal',      moduleId: './5k-normal',      nav: true, title: '5k rows' },
      { route: '50k-normal',         name: '50k-normal',        moduleId: './50k-normal',        nav: true, title: '50k rows' },
      { route: 'row-repeat',         name: 'row-repeat',        moduleId: './row-repeat',        nav: true, title: 'row-repeat' },
      { route: 'child-router',  name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
