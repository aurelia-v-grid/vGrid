"use strict";
var filterOperators_1 = require('./filterOperators');
var arrayFilter_1 = require('./arrayFilter');
var arraySort_1 = require('./arraySort');
var arrayGrouping_1 = require('./arrayGrouping');
var ArrayHelper = (function () {
    function ArrayHelper() {
        this.filterOperators = new filterOperators_1.FilterOperators();
        this.arrayFilter = new arrayFilter_1.ArrayFilter(this.filterOperators);
        this.arraySort = new arraySort_1.ArraySort();
        this.arrayGrouping = new arrayGrouping_1.ArrayGrouping();
    }
    ArrayHelper.prototype.orderBy = function (collection, attribute, addToCurrentSort) {
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
    ArrayHelper.prototype.group = function (array, grouping, keepExpanded) {
        return this.arrayGrouping.group(array, grouping, keepExpanded);
    };
    ArrayHelper.prototype.getGrouping = function () {
        return this.arrayGrouping.getGrouping();
    };
    ArrayHelper.prototype.groupCollapse = function (id) {
        return this.arrayGrouping.collapse(id);
    };
    ArrayHelper.prototype.groupExpand = function (id) {
        return this.arrayGrouping.expand(id);
    };
    ArrayHelper.prototype.getOrderBy = function () {
        return this.arraySort.getOrderBy();
    };
    ArrayHelper.prototype.setLastSort = function (array) {
        this.arraySort.setLastSort(array);
    };
    ArrayHelper.prototype.setOrderBy = function (attribute, addToCurrentSort) {
        this.arraySort.setOrderBy(attribute, addToCurrentSort);
    };
    ArrayHelper.prototype.runOrderbyOn = function (array) {
        this.arraySort.runOrderbyOn(array);
    };
    ArrayHelper.prototype.resetSort = function () {
        this.arraySort.reset();
    };
    ArrayHelper.prototype.getFilterOperatorName = function (operator) {
        return this.filterOperators.getName(operator);
    };
    ArrayHelper.prototype.getCurrentFilter = function () {
        return this.arrayFilter.getLastFilter();
    };
    ArrayHelper.prototype.query = function (array, params) {
        return this.arrayFilter.runQueryOn(array, params);
    };
    return ArrayHelper;
}());
exports.ArrayHelper = ArrayHelper;

//# sourceMappingURL=arrayHelper.js.map
