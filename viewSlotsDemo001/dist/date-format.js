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
            console.log("inn:" + value);
            var x = moment(value).format('DD.MM.YYYY');
            console.log("out:" + x);
            return x;
          } else {
            return value;
          }
        };

        DateFormatValueConverter.prototype.fromView = function fromView(value) {
          if (value) {
            return new Date(moment(value, 'DD.MM.YYYY')._d);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGUtZm9ybWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHTzs7OzBDQUVNOzs7OzsyQ0FDWCx5QkFBTyxPQUFPO0FBQ1osY0FBRyxLQUFILEVBQVM7QUFDUCxvQkFBUSxHQUFSLENBQVksU0FBTyxLQUFQLENBQVosQ0FETztBQUVQLGdCQUFJLElBQUksT0FBTyxLQUFQLEVBQWMsTUFBZCxDQUFxQixZQUFyQixDQUFKLENBRkc7QUFHUCxvQkFBUSxHQUFSLENBQVksU0FBTyxDQUFQLENBQVosQ0FITztBQUlQLG1CQUFPLENBQVAsQ0FKTztXQUFULE1BS087QUFDTCxtQkFBTyxLQUFQLENBREs7V0FMUDs7O0FBRlMsMkNBWVgsNkJBQVMsT0FBTztBQUNkLGNBQUcsS0FBSCxFQUFTO0FBQ1AsbUJBQU8sSUFBSSxJQUFKLENBQVMsT0FBTyxLQUFQLEVBQWEsWUFBYixFQUEyQixFQUEzQixDQUFoQixDQURPO1dBQVQsTUFFTztBQUNMLG1CQUFPLEtBQVAsQ0FESztXQUZQOzs7ZUFiUyIsImZpbGUiOiJkYXRlLWZvcm1hdC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
