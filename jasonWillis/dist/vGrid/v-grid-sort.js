"use strict";

System.register([], function (_export, _context) {
  var VGridSort;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("VGridSort", VGridSort = function () {
        function VGridSort(vGrid) {
          _classCallCheck(this, VGridSort);

          this.lastSort = [];
          this.curSort = [];

          this.vGrid = vGrid;
        }

        VGridSort.prototype.reset = function reset() {
          this.lastSort = [];
          this.curSort = [];
        };

        VGridSort.prototype.setFilter = function setFilter(sort, add) {
          if (add && this.lastSort.length > 0) {
            this.curSort = this.lastSort;
            var exist = false;

            this.curSort.forEach(function (x) {
              if (x.attribute === sort.attribute) {
                exist = true;
                x.asc = x.asc === true ? false : true;
              }
            });

            if (!exist) {
              this.curSort.push(sort);
              this.curSort[this.curSort.length - 1].no = this.curSort.length;
            }
          } else {
            this.curSort = [sort];
            this.curSort[0].no = 1;
            if (this.lastSort[0]) {
              if (this.lastSort[0].attribute === this.curSort[0].attribute) {
                if (this.lastSort[0].asc === this.curSort[0].asc) {
                  this.curSort[0].asc = this.curSort[0].asc === true ? false : true;
                }
              }
            }
          }
        };

        VGridSort.prototype.getFilter = function getFilter() {
          return this.curSort;
        };

        VGridSort.prototype.run = function run(array) {
          var thisSort = this.getFilter();

          array.sort(function (obj1, obj2, i) {
            var result = 0;

            for (var i = 0; i < thisSort.length && result == 0; ++i) {
              var currentObj = thisSort[i];
              var v1 = obj1[currentObj.attribute];
              var v2 = obj2[currentObj.attribute];

              if (v1 !== v2) {
                if (currentObj.asc) {
                  if (v1 < v2) result = -1;else result = 1;
                } else {
                  if (v1 < v2) result = 1;else result = -1;
                }
              }
            }
            return result;
          });

          this.lastSort = this.getFilter().slice(0);
        };

        return VGridSort;
      }());

      _export("VGridSort", VGridSort);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzJCQU1hO0FBTVgsaUJBTlcsU0FNWCxDQUFZLEtBQVosRUFBbUI7Z0NBTlIsV0FNUTs7ZUFNbkIsV0FBVyxHQU5RO2VBT25CLFVBQVUsR0FQUzs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQURpQjtTQUFuQjs7QUFOVyw0QkFtQlgseUJBQVE7QUFDTixlQUFLLFFBQUwsR0FBZ0IsRUFBaEIsQ0FETTtBQUVOLGVBQUssT0FBTCxHQUFlLEVBQWYsQ0FGTTs7O0FBbkJHLDRCQTRCWCwrQkFBVSxNQUFNLEtBQUs7QUFHbkIsY0FBSSxPQUFPLEtBQUssUUFBTCxDQUFjLE1BQWQsR0FBdUIsQ0FBdkIsRUFBMEI7QUFJbkMsaUJBQUssT0FBTCxHQUFlLEtBQUssUUFBTCxDQUpvQjtBQUtuQyxnQkFBSSxRQUFRLEtBQVIsQ0FMK0I7O0FBU25DLGlCQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLFVBQVUsQ0FBVixFQUFhO0FBQ2hDLGtCQUFJLEVBQUUsU0FBRixLQUFnQixLQUFLLFNBQUwsRUFBZ0I7QUFDbEMsd0JBQVEsSUFBUixDQURrQztBQUVsQyxrQkFBRSxHQUFGLEdBQVEsRUFBRSxHQUFGLEtBQVUsSUFBVixHQUFpQixLQUFqQixHQUF5QixJQUF6QixDQUYwQjtlQUFwQzthQURtQixDQUFyQixDQVRtQzs7QUFtQm5DLGdCQUFJLENBQUMsS0FBRCxFQUFRO0FBQ1YsbUJBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsRUFEVTtBQUVWLG1CQUFLLE9BQUwsQ0FBYSxLQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLENBQXRCLENBQWIsQ0FBc0MsRUFBdEMsR0FBMkMsS0FBSyxPQUFMLENBQWEsTUFBYixDQUZqQzthQUFaO1dBbkJGLE1BeUJPO0FBR0wsaUJBQUssT0FBTCxHQUFlLENBQUMsSUFBRCxDQUFmLENBSEs7QUFJTCxpQkFBSyxPQUFMLENBQWEsQ0FBYixFQUFnQixFQUFoQixHQUFxQixDQUFyQixDQUpLO0FBS0wsZ0JBQUksS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFKLEVBQXNCO0FBQ3BCLGtCQUFJLEtBQUssUUFBTCxDQUFjLENBQWQsRUFBaUIsU0FBakIsS0FBK0IsS0FBSyxPQUFMLENBQWEsQ0FBYixFQUFnQixTQUFoQixFQUEyQjtBQUM1RCxvQkFBSSxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLEdBQWpCLEtBQXlCLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUI7QUFDaEQsdUJBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsR0FBc0IsS0FBSyxPQUFMLENBQWEsQ0FBYixFQUFnQixHQUFoQixLQUF3QixJQUF4QixHQUErQixLQUEvQixHQUF1QyxJQUF2QyxDQUQwQjtpQkFBbEQ7ZUFERjthQURGO1dBOUJGOzs7QUEvQlMsNEJBK0VYLGlDQUFZO0FBQ1YsaUJBQU8sS0FBSyxPQUFMLENBREc7OztBQS9FRCw0QkF1RlgsbUJBQUksT0FBTztBQUlULGNBQUksV0FBVyxLQUFLLFNBQUwsRUFBWCxDQUpLOztBQU9ULGdCQUFNLElBQU4sQ0FBVyxVQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0IsQ0FBdEIsRUFBeUI7QUFDbEMsZ0JBQUksU0FBUyxDQUFULENBRDhCOztBQUdsQyxpQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksU0FBUyxNQUFULElBQW1CLFVBQVUsQ0FBVixFQUFhLEVBQUUsQ0FBRixFQUFLO0FBRXZELGtCQUFJLGFBQWEsU0FBUyxDQUFULENBQWIsQ0FGbUQ7QUFHdkQsa0JBQUksS0FBSyxLQUFLLFdBQVcsU0FBWCxDQUFWLENBSG1EO0FBSXZELGtCQUFJLEtBQUssS0FBSyxXQUFXLFNBQVgsQ0FBVixDQUptRDs7QUFNdkQsa0JBQUksT0FBTyxFQUFQLEVBQVc7QUFDYixvQkFBSSxXQUFXLEdBQVgsRUFBZ0I7QUFFbEIsc0JBQUksS0FBSyxFQUFMLEVBQ0YsU0FBUyxDQUFDLENBQUQsQ0FEWCxLQUdFLFNBQVMsQ0FBVCxDQUhGO2lCQUZGLE1BTU87QUFFTCxzQkFBSSxLQUFLLEVBQUwsRUFDRixTQUFTLENBQVQsQ0FERixLQUdFLFNBQVMsQ0FBQyxDQUFELENBSFg7aUJBUkY7ZUFERjthQU5GO0FBdUJBLG1CQUFPLE1BQVAsQ0ExQmtDO1dBQXpCLENBQVgsQ0FQUzs7QUFvQ1QsZUFBSyxRQUFMLEdBQWdCLEtBQUssU0FBTCxHQUFpQixLQUFqQixDQUF1QixDQUF2QixDQUFoQixDQXBDUzs7O2VBdkZBIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1zb3J0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
