export class App {
  configureRouter(config, router){
    config.title = '<-goto github';
    config.map([
      { route: ['','sample01'], name: 'sample01', moduleId: './samples/sample01',  nav: true, title:'normal with filter/sorting' },
      { route: ['sample03'], name: 'sample03', moduleId: './samples/sample03',  nav: true, title:'selection column' },
      { route: ['sample02'], name: 'sample03', moduleId: './samples/sample02',  nav: true, title:'repeat row html' }
    ]);
    this.router = router;
  }
}
