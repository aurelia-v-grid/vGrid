'use strict';

System.register(['moment'], function (_export, _context) {
  "use strict";

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGUtZm9ybWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUdPLFk7OzswQ0FFTSx3Qjs7Ozs7MkNBQ1gsTSxtQkFBTyxLLEVBQU87QUFDWixjQUFHLEtBQUgsRUFBUztBQUNQLGdCQUFJLElBQUksT0FBTyxLQUFQLEVBQWMsTUFBZCxDQUFxQixZQUFyQixDQUFSO0FBQ0EsbUJBQU8sQ0FBUDtBQUNELFdBSEQsTUFHTztBQUNMLG1CQUFPLEtBQVA7QUFDRDtBQUVGLFM7OzJDQUNELFEscUJBQVMsSyxFQUFPO0FBQ2QsY0FBRyxLQUFILEVBQVM7QUFDUCxtQkFBTyxJQUFJLElBQUosQ0FBUyxPQUFPLEtBQVAsRUFBYSxZQUFiLEVBQTJCLEVBQXBDLENBQVA7QUFDRCxXQUZELE1BRU87QUFDTCxtQkFBTyxLQUFQO0FBQ0Q7QUFDRixTIiwiZmlsZSI6ImRhdGUtZm9ybWF0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
