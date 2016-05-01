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
          return moment(value).format('DD.MM.YYYY');
        };

        DateFormatValueConverter.prototype.fromView = function fromView(value) {
          return moment(value, 'DD.MM.YYYY');
        };

        return DateFormatValueConverter;
      }());

      _export('DateFormatValueConverter', DateFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGUtZm9ybWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHTzs7OzBDQUVNOzs7OzsyQ0FDWCx5QkFBTyxPQUFPO0FBQ1osaUJBQU8sT0FBTyxLQUFQLEVBQWMsTUFBZCxDQUFxQixZQUFyQixDQUFQLENBRFk7OztBQURILDJDQUlYLDZCQUFTLE9BQU87QUFDZCxpQkFBTyxPQUFPLEtBQVAsRUFBYSxZQUFiLENBQVAsQ0FEYzs7O2VBSkwiLCJmaWxlIjoiZGF0ZS1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
