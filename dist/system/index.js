System.register(['./gridConnector', './selection', './dataSource', './collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var gridConnector, selection, datasource, collection;
    var prefix, GridConnector, Selection, DataSource, Collection;
    function configure(config) {
        config.globalResources(prefix + '/attributes/v-filter', prefix + '/attributes/v-sort', prefix + '/attributes/v-image', prefix + '/attributes/v-drag-drop-col', prefix + '/attributes/v-resize-col', prefix + '/attributes/v-menu', prefix + '/attributes/v-selection', prefix + '/v-grid-row-repeat', prefix + '/v-grid-col', prefix + '/v-grid');
    }
    exports_1("configure", configure);
    return {
        setters:[
            function (gridConnector_1) {
                gridConnector = gridConnector_1;
            },
            function (selection_1) {
                selection = selection_1;
            },
            function (datasource_1) {
                datasource = datasource_1;
            },
            function (collection_1) {
                collection = collection_1;
            }],
        execute: function() {
            prefix = './grid';
            exports_1("GridConnector", GridConnector = gridConnector.GridConnector);
            exports_1("Selection", Selection = selection.Selection);
            exports_1("DataSource", DataSource = datasource.DataSource);
            exports_1("Collection", Collection = collection.Collection);
        }
    }
});

//# sourceMappingURL=index.js.map
