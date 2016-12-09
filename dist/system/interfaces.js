System.register(["aurelia-framework", "./grid/htmlCache", "./grid/controller", "./grid/mainMarkup", "./grid/mainScrollEvents", "./grid/rowMarkup", "./grid/rowScrollEvents", "./grid/columnMarkup", "./grid/htmlHeightWidth", "./grid/viewSlots", "./grid/columnBindingContext", "./grid/rowDataBinder", "./grid/rowClickHandler", "./grid/groupingElements", "./grid/loadingScreen", "./grid/contextMenu", "./grid/v-grid", "./gridConnector", "./dataSource", "./selection", "./utils/arrayFilter", "./utils/arraySort", "./utils/arrayGrouping", "./grid/footer"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        "HtmlCache": true,
        "Controller": true,
        "MainMarkup": true,
        "MainScrollEvents": true,
        "RowMarkup": true,
        "RowScrollEvents": true,
        "ColumnMarkup": true,
        "HtmlHeightWidth": true,
        "ViewSlots": true,
        "ColumnBindingContext": true,
        "RowDataBinder": true,
        "RowClickHandler": true,
        "GroupingElements": true,
        "LoadingScreen": true,
        "ContextMenu": true,
        "VGrid": true,
        "GridConnector": true,
        "DataSource": true,
        "Selection": true,
        "ArrayFilter": true,
        "ArraySort": true,
        "ArrayGrouping": true,
        "Footer": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n))
                exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (aurelia_framework_1_1) {
                exportStar_1(aurelia_framework_1_1);
            },
            function (htmlCache_1_1) {
                exports_1({
                    "HtmlCache": htmlCache_1_1["HtmlCache"]
                });
            },
            function (controller_1_1) {
                exports_1({
                    "Controller": controller_1_1["Controller"]
                });
            },
            function (mainMarkup_1_1) {
                exports_1({
                    "MainMarkup": mainMarkup_1_1["MainMarkup"]
                });
            },
            function (mainScrollEvents_1_1) {
                exports_1({
                    "MainScrollEvents": mainScrollEvents_1_1["MainScrollEvents"]
                });
            },
            function (rowMarkup_1_1) {
                exports_1({
                    "RowMarkup": rowMarkup_1_1["RowMarkup"]
                });
            },
            function (rowScrollEvents_1_1) {
                exports_1({
                    "RowScrollEvents": rowScrollEvents_1_1["RowScrollEvents"]
                });
            },
            function (columnMarkup_1_1) {
                exports_1({
                    "ColumnMarkup": columnMarkup_1_1["ColumnMarkup"]
                });
            },
            function (htmlHeightWidth_1_1) {
                exports_1({
                    "HtmlHeightWidth": htmlHeightWidth_1_1["HtmlHeightWidth"]
                });
            },
            function (viewSlots_1_1) {
                exports_1({
                    "ViewSlots": viewSlots_1_1["ViewSlots"]
                });
            },
            function (columnBindingContext_1_1) {
                exports_1({
                    "ColumnBindingContext": columnBindingContext_1_1["ColumnBindingContext"]
                });
            },
            function (rowDataBinder_1_1) {
                exports_1({
                    "RowDataBinder": rowDataBinder_1_1["RowDataBinder"]
                });
            },
            function (rowClickHandler_1_1) {
                exports_1({
                    "RowClickHandler": rowClickHandler_1_1["RowClickHandler"]
                });
            },
            function (groupingElements_1_1) {
                exports_1({
                    "GroupingElements": groupingElements_1_1["GroupingElements"]
                });
            },
            function (loadingScreen_1_1) {
                exports_1({
                    "LoadingScreen": loadingScreen_1_1["LoadingScreen"]
                });
            },
            function (contextMenu_1_1) {
                exports_1({
                    "ContextMenu": contextMenu_1_1["ContextMenu"]
                });
            },
            function (v_grid_1_1) {
                exports_1({
                    "VGrid": v_grid_1_1["VGrid"]
                });
            },
            function (gridConnector_1_1) {
                exports_1({
                    "GridConnector": gridConnector_1_1["GridConnector"]
                });
            },
            function (dataSource_1_1) {
                exports_1({
                    "DataSource": dataSource_1_1["DataSource"]
                });
            },
            function (selection_1_1) {
                exports_1({
                    "Selection": selection_1_1["Selection"]
                });
            },
            function (arrayFilter_1_1) {
                exports_1({
                    "ArrayFilter": arrayFilter_1_1["ArrayFilter"]
                });
            },
            function (arraySort_1_1) {
                exports_1({
                    "ArraySort": arraySort_1_1["ArraySort"]
                });
            },
            function (arrayGrouping_1_1) {
                exports_1({
                    "ArrayGrouping": arrayGrouping_1_1["ArrayGrouping"]
                });
            },
            function (footer_1_1) {
                exports_1({
                    "Footer": footer_1_1["Footer"]
                });
            }
        ],
        execute: function () {
        }
    };
});

//# sourceMappingURL=interfaces.js.map
