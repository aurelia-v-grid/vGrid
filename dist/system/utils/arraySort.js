System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ArraySort;
    return {
        setters:[],
        execute: function() {
            ArraySort = (function () {
                function ArraySort() {
                    this.lastSort = [];
                    this.curSort = [];
                }
                ArraySort.prototype.reset = function () {
                    this.lastSort = [];
                    this.curSort = [];
                };
                ArraySort.prototype.setLastSort = function (array) {
                    this.lastSort = array;
                    this.curSort = array;
                };
                ArraySort.prototype.setOrderBy = function (attribute, add) {
                    var sort;
                    var useSetValue = false;
                    if (attribute.asc === undefined) {
                        sort = {
                            attribute: attribute,
                            asc: true
                        };
                    }
                    else {
                        sort = {
                            attribute: attribute.attribute,
                            asc: attribute.asc
                        };
                        useSetValue = true;
                    }
                    if (add && this.lastSort.length > 0) {
                        this.curSort = this.lastSort;
                        var exist = false;
                        this.curSort.forEach(function (x) {
                            if (!useSetValue) {
                                if (x.attribute === sort.attribute) {
                                    exist = true;
                                    x.asc = x.asc === true ? false : true;
                                }
                            }
                        });
                        if (!exist) {
                            this.curSort.push(sort);
                            this.curSort[this.curSort.length - 1].no = this.curSort.length;
                        }
                        this.lastSort = this.curSort;
                    }
                    else {
                        this.curSort = [sort];
                        this.curSort[0].no = 1;
                        if (this.lastSort[0]) {
                            if (this.lastSort[0].attribute === this.curSort[0].attribute) {
                                if (this.lastSort[0].asc === this.curSort[0].asc) {
                                    if (!useSetValue) {
                                        this.curSort[0].asc = this.curSort[0].asc === true ? false : true;
                                    }
                                }
                            }
                        }
                        this.lastSort = this.curSort;
                    }
                };
                ArraySort.prototype.getOrderBy = function () {
                    return this.curSort;
                };
                ArraySort.prototype.runOrderbyOn = function (array) {
                    var thisSort = this.getOrderBy();
                    var cool = array.sort(function (obj1, obj2) {
                        var result = 0;
                        for (var i = 0; i < thisSort.length && result == 0; ++i) {
                            var currentObj = thisSort[i];
                            var v1 = obj1[currentObj.attribute];
                            var v2 = obj2[currentObj.attribute];
                            if (v1 !== v2) {
                                if (currentObj.asc) {
                                    if (v1 < v2)
                                        result = -1;
                                    else
                                        result = 1;
                                }
                                else {
                                    if (v1 < v2)
                                        result = 1;
                                    else
                                        result = -1;
                                }
                            }
                        }
                        return result;
                    });
                    this.lastSort = this.getOrderBy().slice(0);
                };
                return ArraySort;
            }());
            exports_1("ArraySort", ArraySort);
        }
    }
});

//# sourceMappingURL=arraySort.js.map
