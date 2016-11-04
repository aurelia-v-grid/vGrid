"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var ColumnBindingContext;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("ColumnBindingContext", ColumnBindingContext = function ColumnBindingContext(controller) {
                var _this = this;

                _classCallCheck(this, ColumnBindingContext);

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
                        } else {
                            _this.controller.expandGroup(x.__groupID);
                        }
                    }
                };
            });

            _export("ColumnBindingContext", ColumnBindingContext);
        }
    };
});
//# sourceMappingURL=columnBindingContext.js.map
