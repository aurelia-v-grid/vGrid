define(["require", "exports"], function (require, exports) {
    "use strict";
    var FilterOperators = (function () {
        function FilterOperators() {
            this.filterOperatorsNumbers = {
                '=': 1,
                '<=': 2,
                '>=': 3,
                '<': 4,
                '>': 5,
                '*': 6,
                '!=': 7,
                '!*': 8,
                '*=': 9,
                '=*': 10
            };
            this.filterOperatorNames = {
                '=': 'equals',
                '<=': 'less than or eq',
                '>=': 'greater than or eq',
                '<': 'less than',
                '>': 'greater than',
                '*': 'contains',
                '!=': 'not equal to',
                '!*': 'does not contain',
                '*=': 'begins with',
                '=*': 'ends with'
            };
        }
        FilterOperators.prototype.getFilterNumbers = function () {
            return this.filterOperatorsNumbers;
        };
        FilterOperators.prototype.getName = function (operator) {
            return this.filterOperatorNames[operator];
        };
        FilterOperators.prototype.getOperatorNo = function (operator) {
            return this.filterOperatorsNumbers[operator];
        };
        return FilterOperators;
    }());
    exports.FilterOperators = FilterOperators;
});

//# sourceMappingURL=filterOperators.js.map
