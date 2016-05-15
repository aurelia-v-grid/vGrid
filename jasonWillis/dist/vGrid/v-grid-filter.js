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
        function VGridFilter(vGrid) {
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
            "=*": "ends with" };

          this.vGrid = vGrid;
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
//# sourceMappingURL=data:application/json;base64,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cENGLHFCQXlDTyxDQUFMO0FBQ0Usc0JBQUksU0FBUyxTQUFULENBQW1CLENBQW5CLEVBQXNCLFlBQVksTUFBWixDQUF0QixLQUE4QyxXQUE5QyxFQUEyRDtBQUM3RCw2QkFBUyxLQUFULENBRDZEO21CQUEvRDtBQUdBLHdCQUpGO0FBekNGLHFCQThDTyxFQUFMO0FBQ0Usc0JBQUksU0FBUyxTQUFULENBQW1CLFNBQVMsTUFBVCxHQUFrQixZQUFZLE1BQVosRUFBb0IsU0FBUyxNQUFULENBQXpELEtBQThFLFdBQTlFLEVBQTJGO0FBQzdGLDZCQUFTLEtBQVQsQ0FENkY7bUJBQS9GO0FBR0Esd0JBSkY7QUE5Q0Y7QUFvREksc0JBQUksYUFBYSxXQUFiLEVBQTBCO0FBQzVCLDZCQUFTLEtBQVQsQ0FENEI7bUJBQTlCO0FBcERKLGVBckc2QjtBQTZKN0Isa0JBQUksU0FBUyxRQUFULEVBQW1CO0FBQ3JCLG9CQUFJLEVBQUUsS0FBRixDQUFRLE1BQVIsQ0FBZSxDQUFmLE1BQXNCLEdBQXRCLElBQTZCLEVBQUUsS0FBRixDQUFRLE1BQVIsS0FBbUIsQ0FBbkIsRUFBc0I7QUFDckQsMkJBQVMsSUFBVCxDQURxRDtpQkFBdkQ7ZUFERjthQTdKZ0IsQ0FBbEIsQ0FMbUQ7QUEwS25ELG1CQUFPLE1BQVAsQ0ExS21EO1dBQW5CLENBQTlCLENBTm1CO0FBbUx2QixpQkFBTyxXQUFQLENBbkx1Qjs7O2VBdERkIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
