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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bWJlci1mb3JtYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUtPOzs7NENBRU07Ozs7OzZDQUNYLHlCQUFPLE9BQU87QUFDWixjQUFJLEtBQUosRUFBVztBQUNULG1CQUFPLFFBQVEsS0FBUixFQUFlLE1BQWYsQ0FBc0IsV0FBdEIsQ0FBUCxDQURTO1dBQVgsTUFFTztBQUNMLG1CQUFPLEtBQVAsQ0FESztXQUZQOzs7QUFGUyw2Q0FTWCw2QkFBUyxPQUFPO0FBQ2QsY0FBSSxLQUFKLEVBQVc7QUFDVCxtQkFBTyxVQUFVLFFBQVYsQ0FBbUIsS0FBbkIsQ0FBUCxDQURTO1dBQVgsTUFFTztBQUNMLG1CQUFPLEtBQVAsQ0FESztXQUZQOzs7ZUFWUyIsImZpbGUiOiJudW1iZXItZm9ybWF0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
