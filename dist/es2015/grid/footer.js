import { ViewSlot } from 'aurelia-framework';
var Footer = (function () {
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
        var footerViewSlot = new ViewSlot(this.htmlCache.avg_footer, true);
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
export { Footer };
//# sourceMappingURL=footer.js.map