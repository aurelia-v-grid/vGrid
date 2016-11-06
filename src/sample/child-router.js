export class ChildRouter {
  heading = 'Child Router';

  configureRouter(config, router) {
    config.map([
      { route: ['', 'welcome'], name: 'welcome',       moduleId: './welcome',       nav: true, title: '5k rows' },
      { route: 'users',         name: 'users',         moduleId: './users',         nav: true, title: '50k rows' },
      { route: 'child-router',  name: 'child-router',  moduleId: './child-router',  nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
