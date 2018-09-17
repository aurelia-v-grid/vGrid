module.exports = { contents: "Object.defineProperty(exports, \"__esModule\", { value: true });\r\nconst aurelia_framework_1 = require(\"aurelia-framework\");\r\nconst mainMarkupHtmlString_1 = require(\"./mainMarkupHtmlString\");\r\nclass MainMarkup {\r\n    constructor(element, viewCompiler, container, viewResources, htmlHeightWidth, viewSlots) {\r\n        this.element = element;\r\n        this.viewCompiler = viewCompiler;\r\n        this.container = container;\r\n        this.viewResources = viewResources;\r\n        this.htmlHeightWidth = htmlHeightWidth;\r\n        this.viewSlots = viewSlots;\r\n    }\r\n    generateMainMarkup() {\r\n        this.viewFactory = this.viewCompiler.compile('<template>' + mainMarkupHtmlString_1.MainMarkupHtmlString + '</template>', this.viewResources);\r\n        this.view = this.viewFactory.create(this.container);\r\n        this.viewSlots.mainViewSlot = new aurelia_framework_1.ViewSlot(this.element, true);\r\n        this.viewSlots.mainViewSlot.add(this.view);\r\n        this.viewSlots.mainViewSlot.bind(this, {\r\n            bindingContext: this,\r\n            parentOverrideContext: this.htmlHeightWidth\r\n        });\r\n        this.viewSlots.mainViewSlot.attached();\r\n    }\r\n}\r\nexports.MainMarkup = MainMarkup;\r\n//# sourceMappingURL=mainMarkup.js.map",
dependencies: ["aurelia-framework","./mainMarkupHtmlString"],
sourceMap: {},
headerContent: undefined,
mtime: 1535657860156,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
