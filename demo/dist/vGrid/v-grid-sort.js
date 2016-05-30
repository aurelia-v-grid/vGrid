"use strict";

System.register([], function (_export, _context) {
  "use strict";

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
            this.lastSort = this.curSort;
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
            this.lastSort = this.curSort;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7MkJBU2EsUztBQU1YLDJCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxlQU1uQixRQU5tQixHQU1SLEVBTlE7QUFBQSxlQU9uQixPQVBtQixHQU9ULEVBUFM7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDRDs7NEJBV0QsSyxvQkFBUTtBQUNOLGVBQUssUUFBTCxHQUFnQixFQUFoQjtBQUNBLGVBQUssT0FBTCxHQUFlLEVBQWY7QUFDRCxTOzs0QkFNRCxTLHNCQUFVLEksRUFBTSxHLEVBQUs7QUFHbkIsY0FBSSxPQUFPLEtBQUssUUFBTCxDQUFjLE1BQWQsR0FBdUIsQ0FBbEMsRUFBcUM7QUFJbkMsaUJBQUssT0FBTCxHQUFlLEtBQUssUUFBcEI7QUFDQSxnQkFBSSxRQUFRLEtBQVo7O0FBSUEsaUJBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsVUFBVSxDQUFWLEVBQWE7QUFDaEMsa0JBQUksRUFBRSxTQUFGLEtBQWdCLEtBQUssU0FBekIsRUFBb0M7QUFDbEMsd0JBQVEsSUFBUjtBQUNBLGtCQUFFLEdBQUYsR0FBUSxFQUFFLEdBQUYsS0FBVSxJQUFWLEdBQWlCLEtBQWpCLEdBQXlCLElBQWpDO0FBRUQ7QUFDRixhQU5EOztBQVVBLGdCQUFJLENBQUMsS0FBTCxFQUFZO0FBQ1YsbUJBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEI7QUFDQSxtQkFBSyxPQUFMLENBQWEsS0FBSyxPQUFMLENBQWEsTUFBYixHQUFzQixDQUFuQyxFQUFzQyxFQUF0QyxHQUEyQyxLQUFLLE9BQUwsQ0FBYSxNQUF4RDtBQUNEO0FBQ0QsaUJBQUssUUFBTCxHQUFnQixLQUFLLE9BQXJCO0FBR0QsV0ExQkQsTUEwQk87QUFHTCxpQkFBSyxPQUFMLEdBQWUsQ0FBQyxJQUFELENBQWY7QUFDQSxpQkFBSyxPQUFMLENBQWEsQ0FBYixFQUFnQixFQUFoQixHQUFxQixDQUFyQjtBQUNBLGdCQUFJLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBSixFQUFzQjtBQUNwQixrQkFBSSxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLFNBQWpCLEtBQStCLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsU0FBbkQsRUFBOEQ7QUFDNUQsb0JBQUksS0FBSyxRQUFMLENBQWMsQ0FBZCxFQUFpQixHQUFqQixLQUF5QixLQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLEdBQTdDLEVBQWtEO0FBQ2hELHVCQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLEdBQXNCLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsS0FBd0IsSUFBeEIsR0FBK0IsS0FBL0IsR0FBdUMsSUFBN0Q7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxpQkFBSyxRQUFMLEdBQWdCLEtBQUssT0FBckI7QUFHRDtBQUdGLFM7OzRCQU1ELFMsd0JBQVk7QUFDVixpQkFBTyxLQUFLLE9BQVo7QUFDRCxTOzs0QkFNRCxHLGdCQUFJLEssRUFBTztBQUlULGNBQUksV0FBVyxLQUFLLFNBQUwsRUFBZjs7QUFHQSxnQkFBTSxJQUFOLENBQVcsVUFBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCLENBQXRCLEVBQXlCO0FBQ2xDLGdCQUFJLFNBQVMsQ0FBYjs7QUFFQSxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFNBQVMsTUFBYixJQUF1QixVQUFVLENBQWpELEVBQW9ELEVBQUUsQ0FBdEQsRUFBeUQ7QUFFdkQsa0JBQUksYUFBYSxTQUFTLENBQVQsQ0FBakI7QUFDQSxrQkFBSSxLQUFLLEtBQUssV0FBVyxTQUFoQixDQUFUO0FBQ0Esa0JBQUksS0FBSyxLQUFLLFdBQVcsU0FBaEIsQ0FBVDs7QUFFQSxrQkFBSSxPQUFPLEVBQVgsRUFBZTtBQUNiLG9CQUFJLFdBQVcsR0FBZixFQUFvQjtBQUVsQixzQkFBSSxLQUFLLEVBQVQsRUFDRSxTQUFTLENBQUMsQ0FBVixDQURGLEtBR0UsU0FBUyxDQUFUO0FBQ0gsaUJBTkQsTUFNTztBQUVMLHNCQUFJLEtBQUssRUFBVCxFQUNFLFNBQVMsQ0FBVCxDQURGLEtBR0UsU0FBUyxDQUFDLENBQVY7QUFFSDtBQUNGO0FBQ0Y7QUFDRCxtQkFBTyxNQUFQO0FBQ0QsV0EzQkQ7O0FBNkJBLGVBQUssUUFBTCxHQUFnQixLQUFLLFNBQUwsR0FBaUIsS0FBakIsQ0FBdUIsQ0FBdkIsQ0FBaEI7QUFHRCxTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1zb3J0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
