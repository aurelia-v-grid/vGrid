"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var FilterOperators;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("FilterOperators", FilterOperators = function () {
        function FilterOperators() {
          _classCallCheck(this, FilterOperators);

          this.filterOperatorsNumbers = {
            "=": 1,
            "<=": 2,
            ">=": 3,
            "<": 4,
            ">": 5,
            "*": 6,
            "!=": 7,
            "!*": 8,
            "*=": 9,
            "=*": 10 };

          this.filterOperatorNames = {
            "=": "equals",
            "<=": "less than or eq",
            ">=": "greater than or eq",
            "<": "less than",
            ">": "greater than",
            "*": "contains",
            "!=": "not equal to",
            "!*": "does not contain",
            "*=": "begins with",
            "=*": "ends with" };
        }

        FilterOperators.prototype.getFilterNumbers = function getFilterNumbers() {
          return this.filterOperatorsNumbers;
        };

        FilterOperators.prototype.getName = function getName(operator) {
          return this.filterOperatorNames[operator];
        };

        FilterOperators.prototype.getOperatorNo = function getOperatorNo(operator) {
          return this.filterOperatorsNumbers[operator];
        };

        return FilterOperators;
      }());

      _export("FilterOperators", FilterOperators);
    }
  };
});
//# sourceMappingURL=filterOperators.js.map
