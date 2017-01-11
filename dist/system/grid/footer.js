System.register(["aurelia-framework"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, Footer;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            Footer = (function () {
                function Footer(htmlCache, viewCompiler, container, viewResources, viewSlots) {
                    this.htmlCache = htmlCache;
                    this.viewSlots = viewSlots;
                    this.viewCompiler = viewCompiler;
                    this.container = container;
                    this.viewResources = viewResources;
                }
                Footer.prototype.init = function (overrideContext, footerStringTemplate) {
                    this.overrideContext = overrideContext;
                    var footerTemplate = footerStringTemplate || "".replace(/\$(au{)/g, '${');
                    var viewFactory = this.viewCompiler.compile("<template>\n      " + footerTemplate + "\n      </template>", this.viewResources);
                    var view = viewFactory.create(this.container);
                    var footerViewSlot = new aurelia_framework_1.ViewSlot(this.htmlCache.avg_footer, true);
                    footerViewSlot.add(view);
                    footerViewSlot.bind(this, {
                        bindingContext: this,
                        parentOverrideContext: this.overrideContext
                    });
                    footerViewSlot.attached();
                    this.viewSlots.footerViewSlot = footerViewSlot;
                };
                return Footer;
            }());
            exports_1("Footer", Footer);
        }
    };
});

//# sourceMappingURL=footer.js.map
