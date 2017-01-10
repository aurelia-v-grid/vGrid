System.register(["./wakdb/wakinterfaces"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (wakinterfaces_1_1) {
                exports_1({
                    "WakRestApi": wakinterfaces_1_1["WakRestApi"],
                    "WakDataSource": wakinterfaces_1_1["WakDataSource"],
                    "WakGridConnector": wakinterfaces_1_1["WakGridConnector"],
                    "WakSelection": wakinterfaces_1_1["WakSelection"]
                });
            }
        ],
        execute: function () {
        }
    };
});

//# sourceMappingURL=wakdb.js.map
