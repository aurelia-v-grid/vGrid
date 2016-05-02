'use strict';

System.register(['moment'], function (_export, _context) {
  var moment, DateFormatValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_moment) {
      moment = _moment.default;
    }],
    execute: function () {
      _export('DateFormatValueConverter', DateFormatValueConverter = function () {
        function DateFormatValueConverter() {
          _classCallCheck(this, DateFormatValueConverter);
        }

        DateFormatValueConverter.prototype.toView = function toView(value) {
          if (value) {
            return moment(value).format('YYYY-MM-DD');
          } else {
            return value;
          }
        };

        DateFormatValueConverter.prototype.fromView = function fromView(value) {
          if (value) {
            return new Date(moment(value, 'YYYY-MM-DD')._d);
          } else {
            return value;
          }
        };

        return DateFormatValueConverter;
      }());

      _export('DateFormatValueConverter', DateFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGUtZm9ybWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHTzs7OzBDQUVNOzs7OzsyQ0FDWCx5QkFBTyxPQUFPO0FBQ1osY0FBRyxLQUFILEVBQVM7QUFDUCxtQkFBTyxPQUFPLEtBQVAsRUFBYyxNQUFkLENBQXFCLFlBQXJCLENBQVAsQ0FETztXQUFULE1BRU87QUFDTCxtQkFBTyxLQUFQLENBREs7V0FGUDs7O0FBRlMsMkNBU1gsNkJBQVMsT0FBTztBQUNkLGNBQUcsS0FBSCxFQUFTO0FBQ1AsbUJBQU8sSUFBSSxJQUFKLENBQVMsT0FBTyxLQUFQLEVBQWEsWUFBYixFQUEyQixFQUEzQixDQUFoQixDQURPO1dBQVQsTUFFTztBQUNMLG1CQUFPLEtBQVAsQ0FESztXQUZQOzs7ZUFWUyIsImZpbGUiOiJkYXRlLWZvcm1hdC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
