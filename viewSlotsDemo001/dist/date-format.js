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
            var x = moment(value).format('DD.MM.YYYY');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGUtZm9ybWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHTzs7OzBDQUVNOzs7OzsyQ0FDWCx5QkFBTyxPQUFPO0FBQ1osY0FBRyxLQUFILEVBQVM7QUFDUCxnQkFBSSxJQUFJLE9BQU8sS0FBUCxFQUFjLE1BQWQsQ0FBcUIsWUFBckIsQ0FBSixDQURHO0FBRVAsbUJBQU8sQ0FBUCxDQUZPO1dBQVQsTUFHTztBQUNMLG1CQUFPLEtBQVAsQ0FESztXQUhQOzs7QUFGUywyQ0FVWCw2QkFBUyxPQUFPO0FBQ2QsY0FBRyxLQUFILEVBQVM7QUFDUCxtQkFBTyxJQUFJLElBQUosQ0FBUyxPQUFPLEtBQVAsRUFBYSxZQUFiLEVBQTJCLEVBQTNCLENBQWhCLENBRE87V0FBVCxNQUVPO0FBQ0wsbUJBQU8sS0FBUCxDQURLO1dBRlA7OztlQVhTIiwiZmlsZSI6ImRhdGUtZm9ybWF0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
