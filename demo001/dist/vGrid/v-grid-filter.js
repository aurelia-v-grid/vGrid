System.register([], function (_export) {
  "use strict";

  var VGridFilter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      VGridFilter = (function () {
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
            "=": "equal",
            "<=": "less than or eq",
            ">=": "greater than or eq",
            "<": "less than",
            ">": "greater than",
            "*": "contains",
            "!=": "not equal to",
            "!*": "does not contain",
            "*=": "begin with",
            "=*": "end with"
          };
        }

        _createClass(VGridFilter, [{
          key: "getNameOfFilter",
          value: function getNameOfFilter(name) {
            return this.filterOperatorTableString[name];
          }
        }, {
          key: "run",
          value: function run(objArray, ObjFilter) {
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
                  type = typeof data[x.attribute];
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
          }
        }]);

        return VGridFilter;
      })();

      _export("VGridFilter", VGridFilter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFDRCwwQkFBTTtBQUFBLEFBQ1IsdUJBQUssQ0FBQztBQUNKLHdCQUFJLEVBQUUsUUFBUSxHQUFHLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFDN0IsNEJBQU0sR0FBRyxLQUFLLENBQUM7cUJBQ2hCO0FBQ0QsMEJBQU07QUFBQSxBQUNSLHVCQUFLLENBQUM7QUFDSix3QkFBSSxFQUFFLFFBQVEsR0FBRyxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQzdCLDRCQUFNLEdBQUcsS0FBSyxDQUFDO3FCQUNoQjtBQUNELDBCQUFNO0FBQUEsQUFDUix1QkFBSyxDQUFDO0FBQ0osd0JBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUN4Qyw0QkFBTSxHQUFHLEtBQUssQ0FBQztxQkFDaEI7QUFDRCwwQkFBTTtBQUFBLEFBQ1IsdUJBQUssQ0FBQztBQUNKLHdCQUFJLFFBQVEsS0FBSyxXQUFXLEVBQUU7QUFDNUIsNEJBQU0sR0FBRyxLQUFLLENBQUM7cUJBQ2hCO0FBQ0QsMEJBQU07QUFBQSxBQUNSLHVCQUFLLENBQUM7QUFDSix3QkFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ3hDLDRCQUFNLEdBQUcsS0FBSyxDQUFDO3FCQUNoQjtBQUNELDBCQUFNO0FBQUEsQUFDUix1QkFBSyxDQUFDO0FBQ0osd0JBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsRUFBRTtBQUM3RCw0QkFBTSxHQUFHLEtBQUssQ0FBQztxQkFDaEI7QUFDRCwwQkFBTTtBQUFBLEFBQ1IsdUJBQUssRUFBRTtBQUNMLHdCQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLEVBQUU7QUFDN0YsNEJBQU0sR0FBRyxLQUFLLENBQUM7cUJBQ2hCO0FBQ0QsMEJBQU07QUFBQSxBQUNSO0FBQ0Usd0JBQUksUUFBUSxLQUFLLFdBQVcsRUFBRTtBQUM1Qiw0QkFBTSxHQUFHLEtBQUssQ0FBQztxQkFDaEI7QUFBQSxpQkFDSjtBQUNELG9CQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSSxDQUFDLEVBQUM7QUFDbEQsd0JBQU0sR0FBRyxJQUFJLENBQUE7aUJBQ2Q7ZUFHRixDQUFDLENBQUM7QUFDSCxxQkFBTyxNQUFNLENBQUE7YUFFZCxDQUFDLENBQUM7QUFDSCxtQkFBTyxXQUFXLENBQUM7V0FDcEI7OztlQWpOVSxXQUFXIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
