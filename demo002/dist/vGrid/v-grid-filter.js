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
                  filterOperator = filterOperator || 1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1maWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBTWE7QUFHWCxpQkFIVyxXQUdYLEdBQWE7Z0NBSEYsYUFHRTs7QUFFWCxlQUFLLG1CQUFMLEdBQTJCO0FBQ3pCLGlCQUFLLENBQUw7QUFDQSxrQkFBTSxDQUFOO0FBQ0Esa0JBQU0sQ0FBTjtBQUNBLGlCQUFLLENBQUw7QUFDQSxpQkFBSyxDQUFMO0FBQ0EsaUJBQUssQ0FBTDtBQUNBLGtCQUFNLENBQU47QUFDQSxrQkFBTSxDQUFOO0FBQ0Esa0JBQU0sQ0FBTjtBQUNBLGtCQUFNLEVBQU4sRUFWRixDQUZXOztBQWVYLGVBQUsseUJBQUwsR0FBaUM7QUFDL0IsaUJBQUssUUFBTDtBQUNBLGtCQUFNLGlCQUFOO0FBQ0Esa0JBQU0sb0JBQU47QUFDQSxpQkFBSyxXQUFMO0FBQ0EsaUJBQUssY0FBTDtBQUNBLGlCQUFLLFVBQUw7QUFDQSxrQkFBTSxjQUFOO0FBQ0Esa0JBQU0sa0JBQU47QUFDQSxrQkFBTSxhQUFOO0FBQ0Esa0JBQU0sV0FBTjtXQVZGLENBZlc7U0FBYjs7QUFIVyw4QkFxQ1gsMkNBQWdCLE1BQUs7QUFDbkIsaUJBQU8sS0FBSyx5QkFBTCxDQUErQixJQUEvQixDQUFQLENBRG1COzs7QUFyQ1YsOEJBNENYLG1CQUFJLFVBQVUsV0FBVztBQUd2QixjQUFJLHNCQUFzQixLQUFLLG1CQUFMLENBSEg7O0FBTXZCLGNBQUksY0FBYyxTQUFTLE1BQVQsQ0FBZ0IsVUFBVSxJQUFWLEVBQWdCLENBQWhCLEVBQW1CO0FBR25ELGdCQUFJLFNBQVMsSUFBVCxDQUgrQztBQUluRCxzQkFBVSxPQUFWLENBQWtCLFVBQVUsQ0FBVixFQUFhO0FBRzdCLGtCQUFJLFFBQUosQ0FINkI7QUFJN0Isa0JBQUksV0FBSixDQUo2QjtBQUs3QixrQkFBSSxpQkFBaUIsb0JBQW9CLEVBQUUsUUFBRixDQUFyQyxDQUx5QjtBQU03QixrQkFBSSxpQkFB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QUFJLFNBQVMsU0FBVCxDQUFtQixDQUFuQixFQUFzQixZQUFZLE1BQVosQ0FBdEIsS0FBOEMsV0FBOUMsRUFBMkQ7QUFDN0QsNkJBQVMsS0FBVCxDQUQ2RDttQkFBL0Q7QUFHQSx3QkFKRjtBQXpDRixxQkE4Q08sRUFBTDtBQUNFLHNCQUFJLFNBQVMsU0FBVCxDQUFtQixTQUFTLE1BQVQsR0FBa0IsWUFBWSxNQUFaLEVBQW9CLFNBQVMsTUFBVCxDQUF6RCxLQUE4RSxXQUE5RSxFQUEyRjtBQUM3Riw2QkFBUyxLQUFULENBRDZGO21CQUEvRjtBQUdBLHdCQUpGO0FBOUNGO0FBb0RJLHNCQUFJLGFBQWEsV0FBYixFQUEwQjtBQUM1Qiw2QkFBUyxLQUFULENBRDRCO21CQUE5QjtBQXBESixlQXpGNkI7QUFpSjdCLGtCQUFHLEVBQUUsS0FBRixDQUFRLE1BQVIsQ0FBZSxDQUFmLE1BQXNCLEdBQXRCLElBQTZCLEVBQUUsS0FBRixDQUFRLE1BQVIsS0FBa0IsQ0FBbEIsRUFBb0I7QUFDbEQseUJBQVMsSUFBVCxDQURrRDtlQUFwRDthQWpKZ0IsQ0FBbEIsQ0FKbUQ7QUEySm5ELG1CQUFPLE1BQVAsQ0EzSm1EO1dBQW5CLENBQTlCLENBTm1CO0FBb0t2QixpQkFBTyxXQUFQLENBcEt1Qjs7O2VBNUNkIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
