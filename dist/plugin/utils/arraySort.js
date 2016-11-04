"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var ArraySort;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("ArraySort", ArraySort = function () {
        function ArraySort() {
          _classCallCheck(this, ArraySort);

          this.lastSort = [];
          this.curSort = [];
        }

        ArraySort.prototype.reset = function reset() {
          this.lastSort = [];
          this.curSort = [];
        };

        ArraySort.prototype.setLastSort = function setLastSort(array) {
          this.lastSort = array;
          this.curSort = array;
        };

        ArraySort.prototype.setOrderBy = function setOrderBy(attribute, add) {

          var sort = {
            attribute: attribute,
            asc: true
          };

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

        ArraySort.prototype.getOrderBy = function getOrderBy() {
          return this.curSort;
        };

        ArraySort.prototype.runOrderbyOn = function runOrderbyOn(array) {
          var thisSort = this.getOrderBy();

          var cool = array.sort(function (obj1, obj2, i) {
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

          this.lastSort = this.getOrderBy().slice(0);
        };

        return ArraySort;
      }());

      _export("ArraySort", ArraySort);
    }
  };
});
//# sourceMappingURL=arraySort.js.map
