export class App {
  configureRouter(config, router){
    config.title = 'v-grid aurelia element';
    config.map([
      { route: ['','sample02'], name: 'sample02', moduleId: './samples/sample02',  nav: true, title:'all activated' },
      { route: 'sample01',      name: 'sample01', moduleId: './samples/sample01',  nav: true, title:'internal function testing' }

    ]);

    this.router = router;
  }
}
