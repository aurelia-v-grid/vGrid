'use strict';

System.register(['numeral'], function (_export, _context) {
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
          return numeral(value).format('($0,0.00)');
        };

        NumberFormatValueConverter.prototype.fromView = function fromView(value) {
          return numeral().unformat(value);
        };

        return NumberFormatValueConverter;
      }());

      _export('NumberFormatValueConverter', NumberFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bWJlci1mb3JtYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUtPOzs7NENBRU07Ozs7OzZDQUNYLHlCQUFPLE9BQU87QUFDWixpQkFBTyxRQUFRLEtBQVIsRUFBZSxNQUFmLENBQXNCLFdBQXRCLENBQVAsQ0FEWTs7O0FBREgsNkNBSVgsNkJBQVMsT0FBTztBQUNkLGlCQUFPLFVBQVUsUUFBVixDQUFtQixLQUFuQixDQUFQLENBRGM7OztlQUpMIiwiZmlsZSI6Im51bWJlci1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
