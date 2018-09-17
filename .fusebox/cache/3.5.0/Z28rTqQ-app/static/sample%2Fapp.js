module.exports = { contents: "var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst runtime_1 = require(\"@aurelia/runtime\");\r\nconst app_html_1 = require(\"./app.html\");\r\nlet App = class App {\r\n    constructor() {\r\n        this.message = 'Hello World! again and again';\r\n    }\r\n};\r\nApp = __decorate([\r\n    runtime_1.customElement({\r\n        name: 'app',\r\n        templateOrNode: app_html_1.default,\r\n        build: {\r\n            required: true,\r\n            compiler: 'default'\r\n        },\r\n        instructions: []\r\n    })\r\n], App);\r\nexports.App = App;\r\n//# sourceMappingURL=app.js.map",
dependencies: ["@aurelia/runtime","./app.html"],
sourceMap: {},
headerContent: undefined,
mtime: 1537208171101,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
