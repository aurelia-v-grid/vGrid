'use strict';

System.register(['./filterOperators', './arrayFilter', './arraySort', './arrayGrouping'], function (_export, _context) {
    "use strict";

    var FilterOperators, ArrayFilter, ArraySort, ArrayGrouping, ArrayHelper;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_filterOperators) {
            FilterOperators = _filterOperators.FilterOperators;
        }, function (_arrayFilter) {
            ArrayFilter = _arrayFilter.ArrayFilter;
        }, function (_arraySort) {
            ArraySort = _arraySort.ArraySort;
        }, function (_arrayGrouping) {
            ArrayGrouping = _arrayGrouping.ArrayGrouping;
        }],
        execute: function () {
            _export('ArrayHelper', ArrayHelper = function () {
                function ArrayHelper() {
                    _classCallCheck(this, ArrayHelper);

                    this.filterOperators = new FilterOperators();
                    this.arrayFilter = new ArrayFilter(this.filterOperators);
                    this.arraySort = new ArraySort();
                    this.arrayGrouping = new ArrayGrouping();
                }

                ArrayHelper.prototype.orderBy = function orderBy(collection, attribute, addToCurrentSort) {
                    var _this = this;

                    var grouping = this.getGrouping();
                    var result = {
                        fixed: null,
                        full: null
                    };

                    if (grouping.length > 0) {
                        (function () {
                            var lastSort = _this.getOrderBy();

                            _this.resetSort();

                            var exist = false;

                            var newSort = [];

                            var count = 0;

                            lastSort.forEach(function (sort) {
                                count++;
                                if (grouping.indexOf(sort.attribute) !== -1 || addToCurrentSort) {
                                    newSort.push(sort);
                                    if (sort.attribute === attribute) {
                                        sort.asc = sort.asc === true ? false : true;
                                        sort.no = count;
                                        exist = true;
                                    }
                                } else {
                                    if (sort.attribute === attribute) {
                                        sort.asc = sort.asc === true ? false : true;
                                        sort.no = count;
                                        exist = true;
                                        newSort.push(sort);
                                    }
                                }
                            });

                            _this.setLastSort(newSort);

                            if (!exist && attribute) {
                                _this.setOrderBy(attribute, true);
                            }

                            _this.runOrderbyOn(collection);

                            var groupedArray = _this.group(collection, grouping, true);

                            result = {
                                fixed: groupedArray,
                                full: collection
                            };
                        })();
                    } else {
                        if (!attribute) {
                            var _lastSort = this.getOrderBy();
                            this.resetSort();
                            this.setLastSort(_lastSort);
                            this.runOrderbyOn(collection);
                            result = {
                                fixed: collection,
                                full: collection
                            };
                        } else {
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

                ArrayHelper.prototype.group = function group(array, grouping, keepExpanded) {
                    return this.arrayGrouping.group(array, grouping, keepExpanded);
                };

                ArrayHelper.prototype.getGrouping = function getGrouping() {
                    return this.arrayGrouping.getGrouping();
                };

                ArrayHelper.prototype.groupCollapse = function groupCollapse(id) {
                    return this.arrayGrouping.collapse(id);
                };

                ArrayHelper.prototype.groupExpand = function groupExpand(id) {
                    return this.arrayGrouping.expand(id);
                };

                ArrayHelper.prototype.getOrderBy = function getOrderBy() {
                    return this.arraySort.getOrderBy();
                };

                ArrayHelper.prototype.setLastSort = function setLastSort(array) {
                    this.arraySort.setLastSort(array);
                };

                ArrayHelper.prototype.setOrderBy = function setOrderBy(attribute, addToCurrentSort) {
                    this.arraySort.setOrderBy(attribute, addToCurrentSort);
                };

                ArrayHelper.prototype.runOrderbyOn = function runOrderbyOn(array) {
                    this.arraySort.runOrderbyOn(array);
                };

                ArrayHelper.prototype.resetSort = function resetSort() {
                    this.arraySort.reset();
                };

                ArrayHelper.prototype.getFilterOperatorName = function getFilterOperatorName(operator) {
                    return this.filterOperators.getName(operator);
                };

                ArrayHelper.prototype.getCurrentFilter = function getCurrentFilter() {
                    return this.arrayFilter.getLastFilter();
                };

                ArrayHelper.prototype.query = function query(array, params) {
                    return this.arrayFilter.runQueryOn(array, params);
                };

                return ArrayHelper;
            }());

            _export('ArrayHelper', ArrayHelper);
        }
    };
});
//# sourceMappingURL=arrayHelper.js.map
