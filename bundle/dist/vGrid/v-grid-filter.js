"use strict";

System.register([], function (_export, _context) {
  var _typeof, VGridFilter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };

      _export("VGridFilter", VGridFilter = function () {
        function VGridFilter() {
          _classCallCheck(this, VGridFilter);

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
            "=*": "ends with"
          };
        }

        VGridFilter.prototype.getNameOfFilter = function getNameOfFilter(name) {
          return this.filterOperatorTableString[name];
        };

        VGridFilter.prototype.run = function run(objArray, ObjFilter) {
          var filterOperatorTable = this.filterOperatorTable;

          var resultArray = objArray.filter(function (data, i) {
            var result = true;
            ObjFilter.forEach(function (x) {
              var rowValue;
              var filterValue;
              var filterOperator = filterOperatorTable[x.operator];
              var newFilterOperator;

              var typeBool = {
                "true": true,
                "false": false
              };

              var type;
              try {
                type = _typeof(data[x.attribute]);
              } catch (e) {
                type = "string";
              }

              switch (type) {
                case "number":
                  rowValue = data[x.attribute];
                  filterValue = Number(x.value);
                  filterOperator = filterOperator || 1;
                  break;
                case "string":
                  rowValue = data[x.attribute].toLowerCase();
                  filterValue = x.value.toLowerCase();
                  filterOperator = filterOperator || 9;
                  newFilterOperator = filterOperator;

                  if (x.value.charAt(0) === "*" && filterOperator === 9) {
                    newFilterOperator = 6;
                    filterValue = filterValue.substr(1, filterValue.length);
                  }

                  if (x.value.charAt(0) === "*" && filterOperator === 1) {
                    newFilterOperator = 10;
                    filterValue = filterValue.substr(1, filterValue.length);
                  }

                  if (x.value.charAt(x.value.length - 1) === "*" && filterOperator === 1 && newFilterOperator === 10) {
                    newFilterOperator = 6;
                    filterValue = filterValue.substr(0, filterValue.length - 1);
                  }

                  if (x.value.charAt(x.value.length - 1) === "*" && filterOperator === 1 && newFilterOperator !== 10 && newFilterOperator !== 6) {
                    newFilterOperator = 9;
                    filterValue = filterValue.substr(0, filterValue.length - 1);
                  }
                  if (filterOperator !== newFilterOperator) {
                    filterOperator = newFilterOperator;
                  }
                  break;
                case "boolean":
                  rowValue = data[x.attribute];
                  filterValue = typeBool[x.value];
                  filterOperator = 1;
                  break;
                case "object":
                  rowValue = data[x.attribute].toISOString();
                  filterValue = new Date(x.value).toISOString();
                  filterOperator = filterOperator || 2;
                  break;
                default:
                  rowValue = data[x.attribute].toLowerCase();
                  filterValue = x.value.toLowerCase();
                  filterOperator = filterOperator || 1;
                  break;
              }

              switch (filterOperator) {
                case 1:
                  if (rowValue !== filterValue) {
                    result = false;
                  }
                  break;
                case 2:
                  if (!(rowValue <= filterValue)) {
                    result = false;
                  }
                  break;
                case 3:
                  if (!(rowValue >= filterValue)) {
                    result = false;
                  }
                  break;
                case 4:
                  if (!(rowValue < filterValue)) {
                    result = false;
                  }
                  break;
                case 5:
                  if (!(rowValue > filterValue)) {
                    result = false;
                  }
                  break;
                case 6:
                  if (rowValue.indexOf(filterValue) === -1) {
                    result = false;
                  }
                  break;
                case 7:
                  if (rowValue !== filterValue) {
                    result = false;
                  }
                  break;
                case 8:
                  if (rowValue.indexOf(filterValue) !== -1) {
                    result = false;
                  }
                  break;
                case 9:
                  if (rowValue.substring(0, filterValue.length) !== filterValue) {
                    result = false;
                  }
                  break;
                case 10:
                  if (rowValue.substring(rowValue.length - filterValue.length, rowValue.length) !== filterValue) {
                    result = false;
                  }
                  break;
                default:
                  if (rowValue !== filterValue) {
                    result = false;
                  }
              }
              if (type === "string") {
                if (x.value.charAt(0) === "*" && x.value.length === 1) {
                  result = true;
                }
              }
            });
            return result;
          });
          return resultArray;
        };

        return VGridFilter;
      }());

      _export("VGridFilter", VGridFilter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
