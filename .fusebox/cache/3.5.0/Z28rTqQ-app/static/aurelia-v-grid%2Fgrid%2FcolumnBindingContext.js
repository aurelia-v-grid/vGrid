module.exports = { contents: "Object.defineProperty(exports, \"__esModule\", { value: true });\r\nclass ColumnBindingContext {\r\n    constructor(controller) {\r\n        this.controller = controller;\r\n        this.setupleft = [];\r\n        this.setupmain = [];\r\n        this.setupright = [];\r\n        this.setupgroup = [];\r\n        this.setupgrouping = 0;\r\n        this.changeGrouping = (x) => {\r\n            if (x) {\r\n                if (x.__groupExpanded) {\r\n                    this.controller.collapseGroup(x.__groupID);\r\n                }\r\n                else {\r\n                    this.controller.expandGroup(x.__groupID);\r\n                }\r\n            }\r\n        };\r\n    }\r\n    clear() {\r\n        this.setupleft = [];\r\n        this.setupmain = [];\r\n        this.setupright = [];\r\n        this.setupgroup = [];\r\n        this.setupgrouping = 0;\r\n        this.changeGrouping = (x) => {\r\n            if (x) {\r\n                if (x.__groupExpanded) {\r\n                    this.controller.collapseGroup(x.__groupID);\r\n                }\r\n                else {\r\n                    this.controller.expandGroup(x.__groupID);\r\n                }\r\n            }\r\n        };\r\n    }\r\n}\r\nexports.ColumnBindingContext = ColumnBindingContext;\r\n//# sourceMappingURL=columnBindingContext.js.map",
dependencies: [],
sourceMap: {},
headerContent: undefined,
mtime: 1535657860152,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
