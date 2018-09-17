module.exports = { contents: "Object.defineProperty(exports, \"__esModule\", { value: true });\r\nconst jit_1 = require(\"@aurelia/jit\");\r\nconst runtime_1 = require(\"@aurelia/runtime\");\r\nconst app_1 = require(\"./app\");\r\nwindow['au'] = new runtime_1.Aurelia()\r\n    .register(jit_1.BasicConfiguration)\r\n    .app({ host: document.querySelector('app'), component: new app_1.App() })\r\n    .start();\r\n//# sourceMappingURL=main.js.map",
dependencies: ["@aurelia/jit","@aurelia/runtime","./app"],
sourceMap: {},
headerContent: undefined,
mtime: 1537208443112,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
