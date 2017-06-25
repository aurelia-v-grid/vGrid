import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
declare var $: any;

@inject(Router)
export class NavBar {
    public router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    public attached() {
        $('.button-collapse').sideNav({
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true // Choose whether you can drag to open on touch screens
        });
    }

}
