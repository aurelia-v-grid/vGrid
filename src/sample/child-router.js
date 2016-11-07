export class ChildRouter {
  heading = 'Child Router';

  configureRouter(config, router) {
    config.map([
      { route: ['', '5k-normal'], name: '5k-normal',       moduleId: './5k-normal',       nav: true, title: '5k rows' },
      { route: '50k-normal',         name: '50k-normal',         moduleId: './50k-normal',         nav: true, title: '50k rows' },
      { route: 'child-router',  name: 'child-router',  moduleId: './child-router',  nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
