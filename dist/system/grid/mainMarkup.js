System.register(["aurelia-framework", "./mainMarkupHtmlString"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, mainMarkupHtmlString_1, MainMarkup;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (mainMarkupHtmlString_1_1) {
                mainMarkupHtmlString_1 = mainMarkupHtmlString_1_1;
            }
        ],
        execute: function () {
            MainMarkup = (function () {
                function MainMarkup(element, viewCompiler, container, viewResources, htmlHeightWidth, viewSlots) {
                    this.element = element;
                    this.viewCompiler = viewCompiler;
                    this.container = container;
                    this.viewResources = viewResources;
                    this.htmlHeightWidth = htmlHeightWidth;
                    this.viewSlots = viewSlots;
                }
                MainMarkup.prototype.generateMainMarkup = function () {
                    this.viewFactory = this.viewCompiler.compile('<template>' + mainMarkupHtmlString_1.MainMarkupHtmlString + '</template>', this.viewResources);
                    this.view = this.viewFactory.create(this.container);
                    this.viewSlots.mainViewSlot = new aurelia_framework_1.ViewSlot(this.element, true);
                    this.viewSlots.mainViewSlot.add(this.view);
                    this.viewSlots.mainViewSlot.bind(this, {
                        bindingContext: this,
                        parentOverrideContext: this.htmlHeightWidth
                    });
                    this.viewSlots.mainViewSlot.attached();
                };
                return MainMarkup;
            }());
            exports_1("MainMarkup", MainMarkup);
        }
    };
});

//# sourceMappingURL=mainMarkup.js.map
