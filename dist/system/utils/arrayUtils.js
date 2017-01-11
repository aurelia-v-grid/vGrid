System.register(["./arrayFilter", "./arraySort", "./arrayGrouping"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var arrayFilter_1, arraySort_1, arrayGrouping_1, ArrayUtils;
    return {
        setters: [
            function (arrayFilter_1_1) {
                arrayFilter_1 = arrayFilter_1_1;
            },
            function (arraySort_1_1) {
                arraySort_1 = arraySort_1_1;
            },
            function (arrayGrouping_1_1) {
                arrayGrouping_1 = arrayGrouping_1_1;
            }
        ],
        execute: function () {
            ArrayUtils = (function () {
                function ArrayUtils() {
                    this.arrayFilter = new arrayFilter_1.ArrayFilter();
                    this.arraySort = new arraySort_1.ArraySort();
                    this.arrayGrouping = new arrayGrouping_1.ArrayGrouping();
                }
                ArrayUtils.prototype.orderBy = function (collection, attribute, addToCurrentSort) {
                    var grouping = this.getGrouping();
                    var result = {
                        fixed: null,
                        full: null
                    };
                    if (grouping.length > 0) {
                        var lastSort = this.getOrderBy();
                        this.resetSort();
                        var exist_1 = false;
                        var newSort_1 = [];
                        var count_1 = 0;
                        lastSort.forEach(function (sort) {
                            count_1++;
                            if (grouping.indexOf(sort.attribute) !== -1 || addToCurrentSort) {
                                newSort_1.push(sort);
                                if (sort.attribute === attribute) {
                                    sort.asc = sort.asc === true ? false : true;
                                    sort.no = count_1;
                                    exist_1 = true;
                                }
                            }
                            else {
                                if (sort.attribute === attribute) {
                                    sort.asc = sort.asc === true ? false : true;
                                    sort.no = count_1;
                                    exist_1 = true;
                                    newSort_1.push(sort);
                                }
                            }
                        });
                        this.setLastSort(newSort_1);
                        if (!exist_1 && attribute) {
                            this.setOrderBy(attribute, true);
                        }
                        this.runOrderbyOn(collection);
                        var groupedArray = this.group(collection, grouping, true);
                        result = {
                            fixed: groupedArray,
                            full: collection
                        };
                    }
                    else {
                        if (!attribute) {
                            var lastSort = this.getOrderBy();
                            this.resetSort();
                            this.setLastSort(lastSort);
                            this.runOrderbyOn(collection);
                            result = {
                                fixed: collection,
                                full: collection
                            };
                        }
                        else {
                            this.setOrderBy(attribute, addToCurrentSort);
                            this.runOrderbyOn(collection);
                            result = {
                                fixed: collection,
                                full: collection
                            };
                        }
                    }
                    return result;
                };
                ArrayUtils.prototype.group = function (array, grouping, keepExpanded) {
                    return this.arrayGrouping.group(array, grouping, keepExpanded);
                };
                ArrayUtils.prototype.getGrouping = function () {
                    return this.arrayGrouping.getGrouping();
                };
                ArrayUtils.prototype.groupCollapse = function (id) {
                    return this.arrayGrouping.collapse(id);
                };
                ArrayUtils.prototype.groupExpand = function (id) {
                    return this.arrayGrouping.expand(id);
                };
                ArrayUtils.prototype.getOrderBy = function () {
                    return this.arraySort.getOrderBy();
                };
                ArrayUtils.prototype.setLastSort = function (array) {
                    this.arraySort.setLastSort(array);
                };
                ArrayUtils.prototype.setOrderBy = function (attribute, addToCurrentSort) {
                    this.arraySort.setOrderBy(attribute, addToCurrentSort);
                };
                ArrayUtils.prototype.runOrderbyOn = function (array) {
                    this.arraySort.runOrderbyOn(array);
                };
                ArrayUtils.prototype.resetSort = function () {
                    this.arraySort.reset();
                };
                ArrayUtils.prototype.resetGrouping = function () {
                    this.arrayGrouping.reset();
                };
                ArrayUtils.prototype.getCurrentFilter = function () {
                    return this.arrayFilter.getLastFilter();
                };
                ArrayUtils.prototype.query = function (array, params) {
                    return this.arrayFilter.runQueryOn(array, params);
                };
                return ArrayUtils;
            }());
            exports_1("ArrayUtils", ArrayUtils);
        }
    };
});

//# sourceMappingURL=arrayUtils.js.map
