"use strict";

System.register([], function (_export, _context) {
  "use strict";

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1maWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFNYSxXO0FBTVgsNkJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLGVBTW5CLFlBTm1CLEdBTUosRUFOSTtBQUFBLGVBVW5CLG1CQVZtQixHQVVHO0FBQ3BCLGlCQUFLLENBRGU7QUFFcEIsa0JBQU0sQ0FGYztBQUdwQixrQkFBTSxDQUhjO0FBSXBCLGlCQUFLLENBSmU7QUFLcEIsaUJBQUssQ0FMZTtBQU1wQixpQkFBSyxDQU5lO0FBT3BCLGtCQUFNLENBUGM7QUFRcEIsa0JBQU0sQ0FSYztBQVNwQixrQkFBTSxDQVRjO0FBVXBCLGtCQUFNLEVBVmMsRUFWSDtBQUFBLGVBeUJuQix5QkF6Qm1CLEdBeUJTO0FBQzFCLGlCQUFLLFFBRHFCO0FBRTFCLGtCQUFNLGlCQUZvQjtBQUcxQixrQkFBTSxvQkFIb0I7QUFJMUIsaUJBQUssV0FKcUI7QUFLMUIsaUJBQUssY0FMcUI7QUFNMUIsaUJBQUssVUFOcUI7QUFPMUIsa0JBQU0sY0FQb0I7QUFRMUIsa0JBQU0sa0JBUm9CO0FBUzFCLGtCQUFNLGFBVG9CO0FBVTFCLGtCQUFNLFdBVm9CLEVBekJUOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7OzhCQXdDRCxlLDRCQUFnQixJLEVBQU07QUFDcEIsaUJBQU8sS0FBSyx5QkFBTCxDQUErQixJQUEvQixDQUFQO0FBQ0QsUzs7OEJBS0QsRyxnQkFBSSxRLEVBQVUsUyxFQUFXO0FBR3ZCLGNBQUksc0JBQXNCLEtBQUssbUJBQS9COztBQUdBLGNBQUksY0FBYyxTQUFTLE1BQVQsQ0FBZ0IsVUFBVSxJQUFWLEVBQWdCLENBQWhCLEVBQW1CO0FBSW5ELGdCQUFJLFNBQVMsSUFBYjtBQUNBLHNCQUFVLE9BQVYsQ0FBa0IsVUFBVSxDQUFWLEVBQWE7QUFJN0Isa0JBQUksUUFBSjtBQUNBLGtCQUFJLFdBQUo7QUFDQSxrQkFBSSxpQkFB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RUFBZ0M7QUFDOUIsNkJBQVMsS0FBVDtBQUNEO0FBQ0Q7QUFDRixxQkFBSyxDQUFMO0FBQ0Usc0JBQUksRUFBRSxZQUFZLFdBQWQsQ0FBSixFQUFnQztBQUM5Qiw2QkFBUyxLQUFUO0FBQ0Q7QUFDRDtBQUNGLHFCQUFLLENBQUw7QUFDRSxzQkFBSSxFQUFFLFdBQVcsV0FBYixDQUFKLEVBQStCO0FBQzdCLDZCQUFTLEtBQVQ7QUFDRDtBQUNEO0FBQ0YscUJBQUssQ0FBTDtBQUNFLHNCQUFJLEVBQUUsV0FBVyxXQUFiLENBQUosRUFBK0I7QUFDN0IsNkJBQVMsS0FBVDtBQUNEO0FBQ0Q7QUFDRixxQkFBSyxDQUFMO0FBQ0Usc0JBQUksU0FBUyxPQUFULENBQWlCLFdBQWpCLE1BQWtDLENBQUMsQ0FBdkMsRUFBMEM7QUFDeEMsNkJBQVMsS0FBVDtBQUNEO0FBQ0Q7QUFDRixxQkFBSyxDQUFMO0FBQ0Usc0JBQUksYUFBYSxXQUFqQixFQUE4QjtBQUM1Qiw2QkFBUyxLQUFUO0FBQ0Q7QUFDRDtBQUNGLHFCQUFLLENBQUw7QUFDRSxzQkFBSSxTQUFTLE9BQVQsQ0FBaUIsV0FBakIsTUFBa0MsQ0FBQyxDQUF2QyxFQUEwQztBQUN4Qyw2QkFBUyxLQUFUO0FBQ0Q7QUFDRDtBQUNGLHFCQUFLLENBQUw7QUFDRSxzQkFBSSxTQUFTLFNBQVQsQ0FBbUIsQ0FBbkIsRUFBc0IsWUFBWSxNQUFsQyxNQUE4QyxXQUFsRCxFQUErRDtBQUM3RCw2QkFBUyxLQUFUO0FBQ0Q7QUFDRDtBQUNGLHFCQUFLLEVBQUw7QUFDRSxzQkFBSSxTQUFTLFNBQVQsQ0FBbUIsU0FBUyxNQUFULEdBQWtCLFlBQVksTUFBakQsRUFBeUQsU0FBUyxNQUFsRSxNQUE4RSxXQUFsRixFQUErRjtBQUM3Riw2QkFBUyxLQUFUO0FBQ0Q7QUFDRDtBQUNGO0FBQ0Usc0JBQUksYUFBYSxXQUFqQixFQUE4QjtBQUM1Qiw2QkFBUyxLQUFUO0FBQ0Q7QUF0REw7QUF3REEsa0JBQUksU0FBUyxRQUFiLEVBQXVCO0FBQ3JCLG9CQUFJLEVBQUUsS0FBRixDQUFRLE1BQVIsQ0FBZSxDQUFmLE1BQXNCLEdBQXRCLElBQTZCLEVBQUUsS0FBRixDQUFRLE1BQVIsS0FBbUIsQ0FBcEQsRUFBdUQ7QUFDckQsMkJBQVMsSUFBVDtBQUNEO0FBQ0Y7QUFHRixhQXBLRDtBQXFLQSxtQkFBTyxNQUFQO0FBRUQsV0E1S2lCLENBQWxCO0FBNktBLGlCQUFPLFdBQVA7QUFDRCxTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
