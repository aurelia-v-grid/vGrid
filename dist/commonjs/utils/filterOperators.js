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
    }
    FilterOperators.prototype.getOperatorNo = function (operator) {
        return this.filterOperatorsNumbers[operator];
    };
    return FilterOperators;
}());
exports.FilterOperators = FilterOperators;

//# sourceMappingURL=filterOperators.js.map
