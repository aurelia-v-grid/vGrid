'use strict';

System.register(['aurelia-framework', './mainMarkupHtmlString'], function (_export, _context) {
        "use strict";

        var ViewSlot, MainMarkupHtmlString, MainMarkup;

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        return {
                setters: [function (_aureliaFramework) {
                        ViewSlot = _aureliaFramework.ViewSlot;
                }, function (_mainMarkupHtmlString) {
                        MainMarkupHtmlString = _mainMarkupHtmlString.MainMarkupHtmlString;
                }],
                execute: function () {
                        _export('MainMarkup', MainMarkup = function () {
                                function MainMarkup(element, viewCompiler, container, viewResources, htmlHeightWidth, viewSlots) {
                                        _classCallCheck(this, MainMarkup);

                                        this.element = element;

                                        this.viewCompiler = viewCompiler;
                                        this.container = container;
                                        this.viewResources = viewResources;

                                        this.htmlHeightWidth = htmlHeightWidth;
                                        this.viewSlots = viewSlots;
                                }

                                MainMarkup.prototype.generateMainMarkup = function generateMainMarkup() {

                                        this.viewFactory = this.viewCompiler.compile('<template>' + MainMarkupHtmlString + '</template>', this.viewResources);
                                        this.view = this.viewFactory.create(this.container);
                                        this.viewSlots.mainViewSlot = new ViewSlot(this.element, true);
                                        this.viewSlots.mainViewSlot.add(this.view);

                                        this.viewSlots.mainViewSlot.bind(this, {
                                                bindingContext: this,
                                                parentOverrideContext: this.htmlHeightWidth
                                        });

                                        this.viewSlots.mainViewSlot.attached();
                                };

                                return MainMarkup;
                        }());

                        _export('MainMarkup', MainMarkup);
                }
        };
});
//# sourceMappingURL=mainMarkup.js.map
