define(["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Aurelia';
            config.map([
                { route: ['', '5k-rows'], name: '5k-rows', moduleId: './5k-rows', nav: true, title: '5k-rows' },
                { route: '50k-rows', name: '50k-rows', moduleId: './50k-rows', nav: true, title: '50k-rows' },
                { route: '800k-rows', name: '800k-rows(use chrome)', moduleId: './800k-rows', nav: true, title: '800k-rows(use chrome)' },
                { route: 'child-router', name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' }
            ]);
            this.router = router;
        };
        return App;
    }());
    exports.App = App;
});

//# sourceMappingURL=app.js.map
