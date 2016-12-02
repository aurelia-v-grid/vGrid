function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./interfaces"));
var wakinterfaces_1 = require("./wakdb/wakinterfaces");
exports.WakRestApi = wakinterfaces_1.WakRestApi;
exports.WakDataSource = wakinterfaces_1.WakDataSource;
exports.WakGridConnector = wakinterfaces_1.WakGridConnector;
exports.WakSelection = wakinterfaces_1.WakSelection;
var prefix = './grid';
function configure(config) {
    config.globalResources(prefix + '/attributes/v-filter', prefix + '/attributes/v-filter-trigger', prefix + '/attributes/v-sort', prefix + '/attributes/v-image', prefix + '/attributes/v-drag-drop-col', prefix + '/attributes/v-resize-col', prefix + '/attributes/v-menu', prefix + '/attributes/v-selection', prefix + '/v-grid-row-repeat', prefix + '/v-grid-group-row', prefix + '/v-grid-group-element', prefix + '/v-grid-loadingscreen', prefix + '/v-grid-contextmenu', prefix + '/v-grid-col', prefix + '/v-grid');
}
exports.configure = configure;

//# sourceMappingURL=index.js.map
