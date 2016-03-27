export class App {
  configureRouter(config, router){
    config.title = 'v-grid aurelia element';
    config.map([
      { route: ['','sample01'], name: 'sample01', moduleId: './samples/sample01',  nav: true, title:'col&internal functions' }


    ]);

    this.router = router;
  }
}
