/* */ 
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var VGridSort = exports.VGridSort = function () {
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

    return VGridSort;
  }();
});