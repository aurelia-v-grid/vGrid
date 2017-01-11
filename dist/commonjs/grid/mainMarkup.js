var aurelia_framework_1 = require("aurelia-framework");
var mainMarkupHtmlString_1 = require("./mainMarkupHtmlString");
var MainMarkup = (function () {
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
exports.MainMarkup = MainMarkup;

//# sourceMappingURL=mainMarkup.js.map
