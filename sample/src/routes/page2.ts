import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';

@autoinject(Router)
export class Page2 {
    public title: string;

    constructor(public router: Router) {

    }

    public canActivate(a, b, c) {
        this.title = b.title;
    }

}
