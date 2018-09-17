module.exports = { contents: "Object.defineProperty(exports, \"__esModule\", { value: true });\r\nconst aurelia_framework_1 = require(\"aurelia-framework\");\r\nclass Footer {\r\n    constructor(htmlCache, viewCompiler, container, viewResources, viewSlots) {\r\n        this.htmlCache = htmlCache;\r\n        this.viewSlots = viewSlots;\r\n        this.viewCompiler = viewCompiler;\r\n        this.container = container;\r\n        this.viewResources = viewResources;\r\n    }\r\n    init(overrideContext, footerStringTemplate) {\r\n        this.overrideContext = overrideContext;\r\n        let footerTemplate = footerStringTemplate || ``.replace(/\\$(au{)/g, '${');\r\n        let viewFactory = this.viewCompiler.compile(`<template>\r\n      ${footerTemplate}\r\n      </template>`, this.viewResources);\r\n        let view = viewFactory.create(this.container);\r\n        let footerViewSlot = new aurelia_framework_1.ViewSlot(this.htmlCache.avg_footer, true);\r\n        footerViewSlot.add(view);\r\n        footerViewSlot.bind(this, {\r\n            bindingContext: this,\r\n            parentOverrideContext: this.overrideContext\r\n        });\r\n        footerViewSlot.attached();\r\n        this.viewSlots.footerViewSlot = footerViewSlot;\r\n    }\r\n}\r\nexports.Footer = Footer;\r\n//# sourceMappingURL=footer.js.map",
dependencies: ["aurelia-framework"],
sourceMap: {},
headerContent: undefined,
mtime: 1535657860154,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
