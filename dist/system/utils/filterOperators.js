System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var FilterOperators;
    return {
        setters: [],
        execute: function () {
            FilterOperators = (function () {
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
                FilterOperators.prototype.getName = function (operator) {
                    return this.filterOperatorNames[operator];
                };
                FilterOperators.prototype.setName = function (key, name) {
                    switch (true) {
                        case key === 'equals':
                            this.filterOperatorNames['='] = name;
                            break;
                        case key === 'lessThanOrEqual':
                            this.filterOperatorNames['<='] = name;
                            break;
                        case key === 'greaterThanOrEqual':
                            this.filterOperatorNames['>='] = name;
                            break;
                        case key === 'lessThan':
                            this.filterOperatorNames['<'] = name;
                            break;
                        case key === 'greaterThan':
                            this.filterOperatorNames['>'] = name;
                            break;
                        case key === 'contains':
                            this.filterOperatorNames['*'] = name;
                            break;
                        case key === 'notEqualTo':
                            this.filterOperatorNames['!='] = name;
                            break;
                        case key === 'doesNotContain':
                            this.filterOperatorNames['!*'] = name;
                            break;
                        case key === 'beginsWith':
                            this.filterOperatorNames['*='] = name;
                            break;
                        case key === 'endsWith':
                            this.filterOperatorNames['=*'] = name;
                            break;
                        default:
                    }
                };
                FilterOperators.prototype.getOperatorNo = function (operator) {
                    return this.filterOperatorsNumbers[operator];
                };
                return FilterOperators;
            }());
            exports_1("FilterOperators", FilterOperators);
        }
    };
});

//# sourceMappingURL=filterOperators.js.map
