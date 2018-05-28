import { Router, RouterConfiguration} from 'aurelia-router';


export class App {
    public router: Router;
    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Plugin Sample';
        config.map([
            {
                route: ['', 'page1'],
                name: 'page1',
                moduleId: './routes/page1',
                nav: true,
                title: 'Simple columns',
                settings: { auth: false}
            },
            {
                route: 'page2',
                name: 'page2',
                moduleId: './routes/page2',
                nav: true,
                title: 'Custom columns',
                settings: { auth: true}
            },
            {
                route: 'page3',
                name: 'page3',
                moduleId: './routes/page3',
                nav: true,
                title: 'Row repeat',
                settings: { auth: false}
            },
            {
                route: 'page4',
                name: 'page4',
                moduleId: './routes/page4',
                nav: true,
                title: 'Simple columns - manual select',
                settings: { auth: false}
            }
        ]);
        this.router = router;
    }
}
