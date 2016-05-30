'use strict';

System.register(['numeral'], function (_export, _context) {
  "use strict";

  var numeral, NumberFormatValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_numeral) {
      numeral = _numeral.default;
    }],
    execute: function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bWJlci1mb3JtYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBS08sYTs7OzRDQUVNLDBCOzs7Ozs2Q0FDWCxNLG1CQUFPLEssRUFBTztBQUNaLGNBQUksS0FBSixFQUFXO0FBQ1QsbUJBQU8sUUFBUSxLQUFSLEVBQWUsTUFBZixDQUFzQixXQUF0QixDQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQU8sS0FBUDtBQUNEO0FBQ0YsUzs7NkNBRUQsUSxxQkFBUyxLLEVBQU87QUFDZCxjQUFJLEtBQUosRUFBVztBQUNULG1CQUFPLFVBQVUsUUFBVixDQUFtQixLQUFuQixDQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQU8sS0FBUDtBQUNEO0FBQ0YsUyIsImZpbGUiOiJudW1iZXItZm9ybWF0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
