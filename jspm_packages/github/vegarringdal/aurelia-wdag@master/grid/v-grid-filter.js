/* */ 
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var VGridFilter = exports.VGridFilter = function () {
    function VGridFilter(vGrid) {
      _classCallCheck(this, VGridFilter);

      this.lastFilter = [];
      this.queryStrings = {};
      this.filterOperatorTable = {
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
      this.filterOperatorTableString = {
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

      this.vGrid = vGrid;
    }

    VGridFilter.prototype.getNameOfFilter = function getNameOfFilter(name) {
      return this.filterOperatorTableString[name];
    };

    return VGridFilter;
  }();
});