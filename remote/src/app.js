export class App {
  configureRouter(config, router){
    config.title = '<-goto github';
    config.map([
      { route: ['','sample01'], name: 'sample01', moduleId: './samples/sample01',  nav: true, title:'normal with filter/sorting' }
    ]);
    this.router = router;
  }
}
