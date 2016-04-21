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
        function VGridSort() {
          _classCallCheck(this, VGridSort);

          this.lastSort = [];
          this.curSort = [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzJCQU1hOzs7O2VBRVgsV0FBVTtlQUNWLFVBQVU7OztBQUhDLDRCQVFYLHlCQUFPO0FBQ0wsZUFBSyxRQUFMLEdBQWUsRUFBZixDQURLO0FBRUwsZUFBSyxPQUFMLEdBQWUsRUFBZixDQUZLOzs7QUFSSSw0QkFnQlgsK0JBQVUsTUFBTSxLQUFJO0FBRWxCLGNBQUcsT0FBTyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXVCLENBQXZCLEVBQXlCO0FBRWpDLGlCQUFLLE9BQUwsR0FBYyxLQUFLLFFBQUwsQ0FGbUI7QUFHakMsZ0JBQUksUUFBUSxLQUFSLENBSDZCOztBQUtqQyxpQkFBSyxPQUFMLENBQWEsT0FBYixDQUFxQixVQUFTLENBQVQsRUFBVztBQUM5QixrQkFBRyxFQUFFLFNBQUYsS0FBZ0IsS0FBSyxTQUFMLEVBQWU7QUFDaEMsd0JBQVEsSUFBUixDQURnQztBQUU5QixrQkFBRSxHQUFGLEdBQVEsRUFBRSxHQUFGLEtBQVUsSUFBVixHQUFpQixLQUFqQixHQUF1QixJQUF2QixDQUZzQjtlQUFsQzthQURtQixDQUFyQixDQUxpQzs7QUFjakMsZ0JBQUcsQ0FBQyxLQUFELEVBQU87QUFDUixtQkFBSyxPQUFMLENBQWEsSUFBYixDQUFrQixJQUFsQixFQURRO0FBRVIsbUJBQUssT0FBTCxDQUFhLEtBQUssT0FBTCxDQUFhLE1BQWIsR0FBb0IsQ0FBcEIsQ0FBYixDQUFvQyxFQUFwQyxHQUF5QyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBRmpDO2FBQVY7V0FkRixNQW1CTztBQUNMLGlCQUFLLE9BQUwsR0FBYyxDQUFDLElBQUQsQ0FBZCxDQURLO0FBRUwsaUJBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsRUFBaEIsR0FBcUIsQ0FBckIsQ0FGSztBQUdMLGdCQUFHLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBSCxFQUFvQjtBQUNsQixrQkFBRyxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLFNBQWpCLEtBQStCLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsU0FBaEIsRUFBMEI7QUFDMUQsb0JBQUcsS0FBSyxRQUFMLENBQWMsQ0FBZCxFQUFpQixHQUFqQixLQUF5QixLQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLEVBQW9CO0FBQzlDLHVCQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLEdBQXNCLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsS0FBd0IsSUFBeEIsR0FBK0IsS0FBL0IsR0FBcUMsSUFBckMsQ0FEd0I7aUJBQWhEO2VBREY7YUFERjtXQXRCRjs7O0FBbEJTLDRCQXFEWCxpQ0FBVztBQUNULGlCQUFPLEtBQUssT0FBTCxDQURFOzs7QUFyREEsNEJBNkRYLG1CQUFJLE9BQU07QUFJUixjQUFJLFdBQVcsS0FBSyxTQUFMLEVBQVgsQ0FKSTs7QUFPUixnQkFBTSxJQUFOLENBQVcsVUFBUyxJQUFULEVBQWUsSUFBZixFQUFxQixDQUFyQixFQUF1QjtBQUNoQyxnQkFBSSxTQUFTLENBQVQsQ0FENEI7O0FBR2hDLGlCQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxTQUFTLE1BQVQsSUFBbUIsVUFBVSxDQUFWLEVBQWEsRUFBRSxDQUFGLEVBQUs7QUFFdkQsa0JBQUksYUFBYSxTQUFTLENBQVQsQ0FBYixDQUZtRDtBQUd2RCxrQkFBSSxLQUFLLEtBQUssV0FBVyxTQUFYLENBQVYsQ0FIbUQ7QUFJdkQsa0JBQUksS0FBSyxLQUFLLFdBQVcsU0FBWCxDQUFWLENBSm1EOztBQU12RCxrQkFBSSxPQUFPLEVBQVAsRUFBVztBQUNiLG9CQUFJLFdBQVcsR0FBWCxFQUFnQjtBQUVsQixzQkFBSSxLQUFLLEVBQUwsRUFDRixTQUFTLENBQUMsQ0FBRCxDQURYLEtBR0UsU0FBUyxDQUFULENBSEY7aUJBRkYsTUFNTTtBQUVKLHNCQUFJLEtBQUssRUFBTCxFQUNGLFNBQVMsQ0FBVCxDQURGLEtBR0UsU0FBUyxDQUFDLENBQUQsQ0FIWDtpQkFSRjtlQURGO2FBTkY7QUF1QkEsbUJBQU8sTUFBUCxDQTFCZ0M7V0FBdkIsQ0FBWCxDQVBROztBQW9DUixlQUFLLFFBQUwsR0FBZ0IsS0FBSyxTQUFMLEdBQWlCLEtBQWpCLENBQXVCLENBQXZCLENBQWhCLENBcENROzs7ZUE3REMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLXNvcnQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
