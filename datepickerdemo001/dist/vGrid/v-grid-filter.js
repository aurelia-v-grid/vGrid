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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1maWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBTWE7QUFHWCxpQkFIVyxXQUdYLEdBQWE7Z0NBSEYsYUFHRTs7QUFFWCxlQUFLLG1CQUFMLEdBQTJCO0FBQ3pCLGlCQUFLLENBQUw7QUFDQSxrQkFBTSxDQUFOO0FBQ0Esa0JBQU0sQ0FBTjtBQUNBLGlCQUFLLENBQUw7QUFDQSxpQkFBSyxDQUFMO0FBQ0EsaUJBQUssQ0FBTDtBQUNBLGtCQUFNLENBQU47QUFDQSxrQkFBTSxDQUFOO0FBQ0Esa0JBQU0sQ0FBTjtBQUNBLGtCQUFNLEVBQU4sRUFWRixDQUZXOztBQWVYLGVBQUsseUJBQUwsR0FBaUM7QUFDL0IsaUJBQUssUUFBTDtBQUNBLGtCQUFNLGlCQUFOO0FBQ0Esa0JBQU0sb0JBQU47QUFDQSxpQkFBSyxXQUFMO0FBQ0EsaUJBQUssY0FBTDtBQUNBLGlCQUFLLFVBQUw7QUFDQSxrQkFBTSxjQUFOO0FBQ0Esa0JBQU0sa0JBQU47QUFDQSxrQkFBTSxhQUFOO0FBQ0Esa0JBQU0sV0FBTjtXQVZGLENBZlc7U0FBYjs7QUFIVyw4QkFxQ1gsMkNBQWdCLE1BQUs7QUFDbkIsaUJBQU8sS0FBSyx5QkFBTCxDQUErQixJQUEvQixDQUFQLENBRG1COzs7QUFyQ1YsOEJBNENYLG1CQUFJLFVBQVUsV0FBVztBQUd2QixjQUFJLHNCQUFzQixLQUFLLG1CQUFMLENBSEg7O0FBTXZCLGNBQUksY0FBYyxTQUFTLE1BQVQsQ0FBZ0IsVUFBVSxJQUFWLEVBQWdCLENBQWhCLEVBQW1CO0FBR25ELGdCQUFJLFNBQVMsSUFBVCxDQUgrQztBQUluRCxzQkFBVSxPQUFWLENBQWtCLFVBQVUsQ0FBVixFQUFhO0FBRzdCLGtCQUFJLFFBQUosQ0FINkI7QUFJN0Isa0JBQUksV0FBSixDQUo2QjtBQUs3QixrQkFBSSxpQkFBaUIsb0JBQW9CLEVBQUUsUUFBRixDQUFyQyxDQUx5QjtBQU03QixrQkFBSSxpQkFB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LFNBQVQsQ0FBbUIsQ0FBbkIsRUFBc0IsWUFBWSxNQUFaLENBQXRCLEtBQThDLFdBQTlDLEVBQTJEO0FBQzdELDZCQUFTLEtBQVQsQ0FENkQ7bUJBQS9EO0FBR0Esd0JBSkY7QUF6Q0YscUJBOENPLEVBQUw7QUFDRSxzQkFBSSxTQUFTLFNBQVQsQ0FBbUIsU0FBUyxNQUFULEdBQWtCLFlBQVksTUFBWixFQUFvQixTQUFTLE1BQVQsQ0FBekQsS0FBOEUsV0FBOUUsRUFBMkY7QUFDN0YsNkJBQVMsS0FBVCxDQUQ2RjttQkFBL0Y7QUFHQSx3QkFKRjtBQTlDRjtBQW9ESSxzQkFBSSxhQUFhLFdBQWIsRUFBMEI7QUFDNUIsNkJBQVMsS0FBVCxDQUQ0QjttQkFBOUI7QUFwREosZUF6RjZCO0FBaUo3QixrQkFBRyxFQUFFLEtBQUYsQ0FBUSxNQUFSLENBQWUsQ0FBZixNQUFzQixHQUF0QixJQUE2QixFQUFFLEtBQUYsQ0FBUSxNQUFSLEtBQWtCLENBQWxCLEVBQW9CO0FBQ2xELHlCQUFTLElBQVQsQ0FEa0Q7ZUFBcEQ7YUFqSmdCLENBQWxCLENBSm1EO0FBMkpuRCxtQkFBTyxNQUFQLENBM0ptRDtXQUFuQixDQUE5QixDQU5tQjtBQW9LdkIsaUJBQU8sV0FBUCxDQXBLdUI7OztlQTVDZCIsImZpbGUiOiJ2R3JpZC92LWdyaWQtZmlsdGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
