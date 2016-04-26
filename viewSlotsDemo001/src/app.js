export class App {
  configureRouter(config, router){
    config.title = '<-goto github';
    config.map([
      { route: ['','sample01'], name: 'sample01', moduleId: './samples/sample01',  nav: true, title:'col&internal functions' },
      { route: ['sample02'], name: 'sample012', moduleId: './samples/sample02',  nav: true, title:'demo2 repeat html (not ready for viewslots)' }



    ]);

    this.router = router;
  }
}
