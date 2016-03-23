System.register([], function (_export) {
  "use strict";

  var VGridSort;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      VGridSort = (function () {
        function VGridSort() {
          _classCallCheck(this, VGridSort);

          this.lastSort = [];
          this.curSort = [];
        }

        _createClass(VGridSort, [{
          key: "reset",
          value: function reset() {
            this.lastSort = [];
            this.curSort = [];
          }
        }, {
          key: "setFilter",
          value: function setFilter(sort, add) {
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
          }
        }, {
          key: "getFilter",
          value: function getFilter() {
            return this.curSort;
          }
        }, {
          key: "run",
          value: function run(array) {
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
          }
        }]);

        return VGridSort;
      })();

      _export("VGridSort", VGridSort);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QyxTQUFTLENBQUMsQ0FBQztBQUNwQyxvQkFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFcEMsb0JBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtBQUNiLHNCQUFJLFVBQVUsQ0FBQyxHQUFHLEVBQUU7QUFFbEIsd0JBQUksRUFBRSxHQUFHLEVBQUUsRUFDVCxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FFWixNQUFNLEdBQUcsQ0FBQyxDQUFDO21CQUNkLE1BQUs7QUFFSix3QkFBSSxFQUFFLEdBQUcsRUFBRSxFQUNULE1BQU0sR0FBRyxDQUFDLENBQUMsS0FFWCxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7bUJBRWY7aUJBQ0Y7ZUFDRjtBQUNELHFCQUFPLE1BQU0sQ0FBQzthQUNmLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1dBRzNDOzs7ZUFwR1UsU0FBUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtc29ydC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
