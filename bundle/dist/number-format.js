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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bWJlci1mb3JtYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUtPLGE7Ozs0Q0FFTSwwQjs7Ozs7NkNBQ1gsTSxtQkFBTyxLLEVBQU87QUFDWixjQUFJLEtBQUosRUFBVztBQUNULG1CQUFPLFFBQVEsS0FBUixFQUFlLE1BQWYsQ0FBc0IsV0FBdEIsQ0FBUDtBQUNELFdBRkQsTUFFTztBQUNMLG1CQUFPLEtBQVA7QUFDRDtBQUNGLFM7OzZDQUVELFEscUJBQVMsSyxFQUFPO0FBQ2QsY0FBSSxLQUFKLEVBQVc7QUFDVCxtQkFBTyxVQUFVLFFBQVYsQ0FBbUIsS0FBbkIsQ0FBUDtBQUNELFdBRkQsTUFFTztBQUNMLG1CQUFPLEtBQVA7QUFDRDtBQUNGLFMiLCJmaWxlIjoibnVtYmVyLWZvcm1hdC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
