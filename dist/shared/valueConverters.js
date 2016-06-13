'use strict';

System.register(['moment', 'numeral'], function (_export, _context) {
  "use strict";

  var moment, numeral, DateFormatValueConverter, NumberFormatValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_moment) {
      moment = _moment.default;
    }, function (_numeral) {
      numeral = _numeral.default;
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

      _export('NumberFormatValueConverter', NumberFormatValueConverter = function () {
        function NumberFormatValueConverter() {
          _classCallCheck(this, NumberFormatValueConverter);
        }

        NumberFormatValueConverter.prototype.toView = function toView(value) {
          if (value) {
            return numeral(value).format('($0,0.00)');
          } else {
            return value;
          }
        };

        NumberFormatValueConverter.prototype.fromView = function fromView(value) {
          if (value) {
            return numeral().unformat(value);
          } else {
            return value;
          }
        };

        return NumberFormatValueConverter;
      }());

      _export('NumberFormatValueConverter', NumberFormatValueConverter);
    }
  };
});
//# sourceMappingURL=valueConverters.js.map
