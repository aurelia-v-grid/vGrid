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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGUtZm9ybWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHTyxZOzs7MENBRU0sd0I7Ozs7OzJDQUNYLE0sbUJBQU8sSyxFQUFPO0FBQ1osY0FBRyxLQUFILEVBQVM7QUFDUCxnQkFBSSxJQUFJLE9BQU8sS0FBUCxFQUFjLE1BQWQsQ0FBcUIsWUFBckIsQ0FBUjtBQUNBLG1CQUFPLENBQVA7QUFDRCxXQUhELE1BR087QUFDTCxtQkFBTyxLQUFQO0FBQ0Q7QUFFRixTOzsyQ0FDRCxRLHFCQUFTLEssRUFBTztBQUNkLGNBQUcsS0FBSCxFQUFTO0FBQ1AsbUJBQU8sSUFBSSxJQUFKLENBQVMsT0FBTyxLQUFQLEVBQWEsWUFBYixFQUEyQixFQUFwQyxDQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQU8sS0FBUDtBQUNEO0FBQ0YsUyIsImZpbGUiOiJkYXRlLWZvcm1hdC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
