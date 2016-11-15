System.register(["aurelia-framework"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, LoadingScreen;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            LoadingScreen = (function () {
                function LoadingScreen(element, viewCompiler, container, viewResources, viewSlots) {
                    this.element = element;
                    this.viewSlots = viewSlots;
                    this.viewCompiler = viewCompiler;
                    this.container = container;
                    this.viewResources = viewResources;
                    this.loading = false;
                    this.loadingMessage = 'Loading';
                }
                LoadingScreen.prototype.init = function (overrideContext) {
                    this.overrideContext = overrideContext;
                    var loadingScreentHtml = [
                        '<div class="avg-overlay" if.bind="loading">',
                        '</div>',
                        '<div if.two-way="loading" class="avg-progress-indicator">',
                        '<div class="avg-progress-bar" role="progressbar" style="width:100%">',
                        '<span>${ loadingMessage }</span>',
                        '</div>',
                        '</div>'
                    ];
                    var viewFactory = this.viewCompiler.compile('<template>' +
                        loadingScreentHtml.join('') +
                        '</template>', this.viewResources);
                    var view = viewFactory.create(this.container);
                    var loadingScreenViewSlot = new aurelia_framework_1.ViewSlot(this.element, true);
                    loadingScreenViewSlot.add(view);
                    loadingScreenViewSlot.bind(this, {
                        bindingContext: this,
                        parentOverrideContext: this.overrideContext
                    });
                    loadingScreenViewSlot.attached();
                    this.viewSlots.loadingScreenViewSlot = loadingScreenViewSlot;
                };
                LoadingScreen.prototype.enable = function (msg, collectionLength) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.loading = collectionLength ? collectionLength > 10000 ? true : false : false;
                        _this.loadingMessage = msg || 'Loading';
                        setTimeout(function () {
                            resolve(null);
                        });
                    });
                };
                LoadingScreen.prototype.disable = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this.loading = false;
                        setTimeout(function () {
                            resolve();
                        });
                    });
                };
                return LoadingScreen;
            }());
            exports_1("LoadingScreen", LoadingScreen);
        }
    };
});

//# sourceMappingURL=loadingScreen.js.map
