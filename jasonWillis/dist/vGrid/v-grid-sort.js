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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzJCQU1hOzs7O2VBRVgsV0FBVztlQUNYLFVBQVU7OztBQUhDLDRCQVFYLHlCQUFRO0FBQ04sZUFBSyxRQUFMLEdBQWdCLEVBQWhCLENBRE07QUFFTixlQUFLLE9BQUwsR0FBZSxFQUFmLENBRk07OztBQVJHLDRCQWdCWCwrQkFBVSxNQUFNLEtBQUs7QUFFbkIsY0FBSSxPQUFPLEtBQUssUUFBTCxDQUFjLE1BQWQsR0FBdUIsQ0FBdkIsRUFBMEI7QUFFbkMsaUJBQUssT0FBTCxHQUFlLEtBQUssUUFBTCxDQUZvQjtBQUduQyxnQkFBSSxRQUFRLEtBQVIsQ0FIK0I7O0FBS25DLGlCQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLFVBQVUsQ0FBVixFQUFhO0FBQ2hDLGtCQUFJLEVBQUUsU0FBRixLQUFnQixLQUFLLFNBQUwsRUFBZ0I7QUFDbEMsd0JBQVEsSUFBUixDQURrQztBQUVsQyxrQkFBRSxHQUFGLEdBQVEsRUFBRSxHQUFGLEtBQVUsSUFBVixHQUFpQixLQUFqQixHQUF5QixJQUF6QixDQUYwQjtlQUFwQzthQURtQixDQUFyQixDQUxtQzs7QUFjbkMsZ0JBQUksQ0FBQyxLQUFELEVBQVE7QUFDVixtQkFBSyxPQUFMLENBQWEsSUFBYixDQUFrQixJQUFsQixFQURVO0FBRVYsbUJBQUssT0FBTCxDQUFhLEtBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsQ0FBdEIsQ0FBYixDQUFzQyxFQUF0QyxHQUEyQyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBRmpDO2FBQVo7V0FkRixNQW1CTztBQUNMLGlCQUFLLE9BQUwsR0FBZSxDQUFDLElBQUQsQ0FBZixDQURLO0FBRUwsaUJBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsRUFBaEIsR0FBcUIsQ0FBckIsQ0FGSztBQUdMLGdCQUFJLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBSixFQUFzQjtBQUNwQixrQkFBSSxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLFNBQWpCLEtBQStCLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsU0FBaEIsRUFBMkI7QUFDNUQsb0JBQUksS0FBSyxRQUFMLENBQWMsQ0FBZCxFQUFpQixHQUFqQixLQUF5QixLQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLEVBQXFCO0FBQ2hELHVCQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLEdBQXNCLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsS0FBd0IsSUFBeEIsR0FBK0IsS0FBL0IsR0FBdUMsSUFBdkMsQ0FEMEI7aUJBQWxEO2VBREY7YUFERjtXQXRCRjs7O0FBbEJTLDRCQXFEWCxpQ0FBWTtBQUNWLGlCQUFPLEtBQUssT0FBTCxDQURHOzs7QUFyREQsNEJBNkRYLG1CQUFJLE9BQU87QUFJVCxjQUFJLFdBQVcsS0FBSyxTQUFMLEVBQVgsQ0FKSzs7QUFPVCxnQkFBTSxJQUFOLENBQVcsVUFBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCLENBQXRCLEVBQXlCO0FBQ2xDLGdCQUFJLFNBQVMsQ0FBVCxDQUQ4Qjs7QUFHbEMsaUJBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLFNBQVMsTUFBVCxJQUFtQixVQUFVLENBQVYsRUFBYSxFQUFFLENBQUYsRUFBSztBQUV2RCxrQkFBSSxhQUFhLFNBQVMsQ0FBVCxDQUFiLENBRm1EO0FBR3ZELGtCQUFJLEtBQUssS0FBSyxXQUFXLFNBQVgsQ0FBVixDQUhtRDtBQUl2RCxrQkFBSSxLQUFLLEtBQUssV0FBVyxTQUFYLENBQVYsQ0FKbUQ7O0FBTXZELGtCQUFJLE9BQU8sRUFBUCxFQUFXO0FBQ2Isb0JBQUksV0FBVyxHQUFYLEVBQWdCO0FBRWxCLHNCQUFJLEtBQUssRUFBTCxFQUNGLFNBQVMsQ0FBQyxDQUFELENBRFgsS0FHRSxTQUFTLENBQVQsQ0FIRjtpQkFGRixNQU1PO0FBRUwsc0JBQUksS0FBSyxFQUFMLEVBQ0YsU0FBUyxDQUFULENBREYsS0FHRSxTQUFTLENBQUMsQ0FBRCxDQUhYO2lCQVJGO2VBREY7YUFORjtBQXVCQSxtQkFBTyxNQUFQLENBMUJrQztXQUF6QixDQUFYLENBUFM7O0FBb0NULGVBQUssUUFBTCxHQUFnQixLQUFLLFNBQUwsR0FBaUIsS0FBakIsQ0FBdUIsQ0FBdkIsQ0FBaEIsQ0FwQ1M7OztlQTdEQSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtc29ydC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
