module.exports = { contents: "function __export(m) {\r\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\r\n}\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__export(require(\"./interfaces\"));\r\nconst prefix = './grid';\r\nfunction configure(config) {\r\n    config.globalResources(prefix + '/attributes/v-filter', prefix + '/attributes/v-filter-observer', prefix + '/attributes/v-sort', prefix + '/attributes/v-image', prefix + '/attributes/v-drag-drop-col', prefix + '/attributes/v-changed', prefix + '/attributes/v-data-handler', prefix + '/attributes/v-resize-col', prefix + '/attributes/v-menu', prefix + '/attributes/v-selection', prefix + '/v-grid-row-repeat', prefix + '/v-grid-group-row', prefix + '/v-grid-group-element', prefix + '/v-grid-loadingscreen', prefix + '/v-grid-contextmenu', prefix + '/v-grid-footer', prefix + '/v-grid-col', prefix + '/v-grid');\r\n}\r\nexports.configure = configure;\r\n//# sourceMappingURL=index.js.map",
dependencies: ["./interfaces"],
sourceMap: {},
headerContent: undefined,
mtime: 1537208452258,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
