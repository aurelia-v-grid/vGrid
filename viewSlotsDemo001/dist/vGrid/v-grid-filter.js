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
              if (x.value.charAt(0) === "*" && x.value.length === 1) {
                result = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1maWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBTWE7QUFHWCxpQkFIVyxXQUdYLEdBQWM7Z0NBSEgsYUFHRzs7QUFFWixlQUFLLG1CQUFMLEdBQTJCO0FBQ3pCLGlCQUFLLENBQUw7QUFDQSxrQkFBTSxDQUFOO0FBQ0Esa0JBQU0sQ0FBTjtBQUNBLGlCQUFLLENBQUw7QUFDQSxpQkFBSyxDQUFMO0FBQ0EsaUJBQUssQ0FBTDtBQUNBLGtCQUFNLENBQU47QUFDQSxrQkFBTSxDQUFOO0FBQ0Esa0JBQU0sQ0FBTjtBQUNBLGtCQUFNLEVBQU4sRUFWRixDQUZZOztBQWVaLGVBQUsseUJBQUwsR0FBaUM7QUFDL0IsaUJBQUssUUFBTDtBQUNBLGtCQUFNLGlCQUFOO0FBQ0Esa0JBQU0sb0JBQU47QUFDQSxpQkFBSyxXQUFMO0FBQ0EsaUJBQUssY0FBTDtBQUNBLGlCQUFLLFVBQUw7QUFDQSxrQkFBTSxjQUFOO0FBQ0Esa0JBQU0sa0JBQU47QUFDQSxrQkFBTSxhQUFOO0FBQ0Esa0JBQU0sV0FBTjtXQVZGLENBZlk7U0FBZDs7QUFIVyw4QkFvQ1gsMkNBQWdCLE1BQU07QUFDcEIsaUJBQU8sS0FBSyx5QkFBTCxDQUErQixJQUEvQixDQUFQLENBRG9COzs7QUFwQ1gsOEJBMkNYLG1CQUFJLFVBQVUsV0FBVztBQUd2QixjQUFJLHNCQUFzQixLQUFLLG1CQUFMLENBSEg7O0FBTXZCLGNBQUksY0FBYyxTQUFTLE1BQVQsQ0FBZ0IsVUFBVSxJQUFWLEVBQWdCLENBQWhCLEVBQW1CO0FBR25ELGdCQUFJLFNBQVMsSUFBVCxDQUgrQztBQUluRCxzQkFBVSxPQUFWLENBQWtCLFVBQVUsQ0FBVixFQUFhO0FBRzdCLGtCQUFJLFFBQUosQ0FINkI7QUFJN0Isa0JBQUksV0FBSixDQUo2QjtBQUs3QixrQkFBSSxpQkFBaUIsb0JBQW9CLEVBQUUsUUFBRixDQUFyQyxDQUx5QjtBQU03QixrQkFBSSxpQkFB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U0FBUyxTQUFULENBQW1CLENBQW5CLEVBQXNCLFlBQVksTUFBWixDQUF0QixLQUE4QyxXQUE5QyxFQUEyRDtBQUM3RCw2QkFBUyxLQUFULENBRDZEO21CQUEvRDtBQUdBLHdCQUpGO0FBekNGLHFCQThDTyxFQUFMO0FBQ0Usc0JBQUksU0FBUyxTQUFULENBQW1CLFNBQVMsTUFBVCxHQUFrQixZQUFZLE1BQVosRUFBb0IsU0FBUyxNQUFULENBQXpELEtBQThFLFdBQTlFLEVBQTJGO0FBQzdGLDZCQUFTLEtBQVQsQ0FENkY7bUJBQS9GO0FBR0Esd0JBSkY7QUE5Q0Y7QUFvREksc0JBQUksYUFBYSxXQUFiLEVBQTBCO0FBQzVCLDZCQUFTLEtBQVQsQ0FENEI7bUJBQTlCO0FBcERKLGVBcEY2QjtBQTRJN0Isa0JBQUksRUFBRSxLQUFGLENBQVEsTUFBUixDQUFlLENBQWYsTUFBc0IsR0FBdEIsSUFBNkIsRUFBRSxLQUFGLENBQVEsTUFBUixLQUFtQixDQUFuQixFQUFzQjtBQUNyRCx5QkFBUyxJQUFULENBRHFEO2VBQXZEO2FBNUlnQixDQUFsQixDQUptRDtBQXNKbkQsbUJBQU8sTUFBUCxDQXRKbUQ7V0FBbkIsQ0FBOUIsQ0FObUI7QUErSnZCLGlCQUFPLFdBQVAsQ0EvSnVCOzs7ZUEzQ2QiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
