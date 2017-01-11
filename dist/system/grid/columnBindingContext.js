System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var ColumnBindingContext;
    return {
        setters: [],
        execute: function () {
            ColumnBindingContext = (function () {
                function ColumnBindingContext(controller) {
                    var _this = this;
                    this.controller = controller;
                    this.setupleft = [];
                    this.setupmain = [];
                    this.setupright = [];
                    this.setupgroup = [];
                    this.setupgrouping = 0;
                    this.changeGrouping = function (x) {
                        if (x) {
                            if (x.__groupExpanded) {
                                _this.controller.collapseGroup(x.__groupID);
                            }
                            else {
                                _this.controller.expandGroup(x.__groupID);
                            }
                        }
                    };
                }
                ColumnBindingContext.prototype.clear = function () {
                    var _this = this;
                    this.setupleft = [];
                    this.setupmain = [];
                    this.setupright = [];
                    this.setupgroup = [];
                    this.setupgrouping = 0;
                    this.changeGrouping = function (x) {
                        if (x) {
                            if (x.__groupExpanded) {
                                _this.controller.collapseGroup(x.__groupID);
                            }
                            else {
                                _this.controller.expandGroup(x.__groupID);
                            }
                        }
                    };
                };
                return ColumnBindingContext;
            }());
            exports_1("ColumnBindingContext", ColumnBindingContext);
        }
    };
});

//# sourceMappingURL=columnBindingContext.js.map
