export class App {
  configureRouter(config, router){
    config.title = '<-goto github';
    config.map([
      { route: ['','sample01'], name: 'sample01', moduleId: './samples/sample01',  nav: true, title:'local array' },
      { route: ['sample02'], name: 'sample02', moduleId: './samples/sample02',  nav: true, title:'remote'},
      { route: ['sample03'], name: 'sample03', moduleId: './samples/sample03',  nav: true, title:'repeat local array'},
      { route: ['sample04'], name: 'sample04', moduleId: './samples/sample04',  nav: true, title:'repeat remote'},
      { route: ['sample05'], name: 'sample05', moduleId: './samples/sample05',  nav: true, title:'binded column array test'},
      { route: ['sample06'], name: 'sample06', moduleId: './samples/sample06',  nav: true, title:'simple markup test'}
    ]);
    this.router = router;
  }
}
