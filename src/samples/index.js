export class MainIndex {
  configureRouter(config, router) {
    config.title = 'Samples';
    config.map([
      {
        name: 'simple-html-col',
        route: 'simple-html-col',
        moduleId: './simple-html-col/index',
        nav: true,
        title: 'Simple Column HTML'
      },
      {
        name: 'column-bind',
        route: 'column-bind',
        moduleId: './column-bind/index',
        nav: true,
        title: 'Column.bind'
      },
      {
        name: 'custom-html',
        route: 'custom-html',
        moduleId: './custom-html/index',
        nav: true,
        title: 'Custom Column HTML'
      },
      {
        name: 'row-repeat',
        route: 'row-repeat',
        moduleId: './row-repeat/index',
        nav: true,
        title: 'Row repeat'
      },
      // {
      //   name: 'dev',
      //   route: 'dev',
      //   moduleId: './dev/index',
      //   nav: true,
      //   title: 'dev'
      // },
      {name: 'remote', route: 'other', moduleId: './remote/index', nav: true, title: 'remote'},
      {name: 'default', route: '', redirect: 'simple-html-col'}
    ]);
    this.router = router;
  }
}
