'use strict';

System.register([], function (_export, _context) {
  var VGridInterpolate;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('VGridInterpolate', VGridInterpolate = function () {
        function VGridInterpolate() {
          _classCallCheck(this, VGridInterpolate);

          this.attributes = [];
        }

        VGridInterpolate.prototype.parse = function parse(string) {
          var _this = this;

          this.attributes = [];
          string.replace(/{{([^{}]*)}}/g, function (a, b) {
            _this.attributes.push(b);
          });
        };

        VGridInterpolate.prototype.interpolate = function interpolate(str) {
          return function interpolate(o) {
            return str.replace(/{{([^{}]*)}}/g, function (a, b) {
              var r = o[b];
              return typeof r === 'string' || typeof r === 'number' ? r : a;
            });
          };
        };

        VGridInterpolate.prototype.getNewObject = function getNewObject(obj) {
          var x = {};
          this.attributes.forEach(function (prop) {
            x[prop] = obj[prop];
          });
          return x;
        };

        VGridInterpolate.prototype.render = function render(string, object) {
          return this.interpolate(string)(object);
        };

        return VGridInterpolate;
      }());

      _export('VGridInterpolate', VGridInterpolate);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1pbnRlcnBvbGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQ0FNYTtBQUNYLGlCQURXLGdCQUNYLEdBQWM7Z0NBREgsa0JBQ0c7O2VBRWQsYUFBYSxHQUZDO1NBQWQ7O0FBRFcsbUNBSVgsdUJBQU0sUUFBUTs7O0FBQ1osZUFBSyxVQUFMLEdBQWtCLEVBQWxCLENBRFk7QUFFWixpQkFBTyxPQUFQLENBQWUsZUFBZixFQUFnQyxVQUFDLENBQUQsRUFBSSxDQUFKLEVBQVU7QUFDeEMsa0JBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixDQUFyQixFQUR3QztXQUFWLENBQWhDLENBRlk7OztBQUpILG1DQVVYLG1DQUFZLEtBQUs7QUFDZixpQkFBTyxTQUFTLFdBQVQsQ0FBcUIsQ0FBckIsRUFBd0I7QUFDN0IsbUJBQU8sSUFBSSxPQUFKLENBQVksZUFBWixFQUE2QixVQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCO0FBQ2xELGtCQUFJLElBQUksRUFBRSxDQUFGLENBQUosQ0FEOEM7QUFFbEQscUJBQU8sT0FBTyxDQUFQLEtBQWEsUUFBYixJQUF5QixPQUFPLENBQVAsS0FBYSxRQUFiLEdBQXdCLENBQWpELEdBQXFELENBQXJELENBRjJDO2FBQWhCLENBQXBDLENBRDZCO1dBQXhCLENBRFE7OztBQVZOLG1DQWtCWCxxQ0FBYSxLQUFJO0FBQ2YsY0FBSSxJQUFJLEVBQUosQ0FEVztBQUVmLGVBQUssVUFBTCxDQUFnQixPQUFoQixDQUF3QixVQUFDLElBQUQsRUFBUTtBQUM5QixjQUFFLElBQUYsSUFBVSxJQUFJLElBQUosQ0FBVixDQUQ4QjtXQUFSLENBQXhCLENBRmU7QUFLZixpQkFBTyxDQUFQLENBTGU7OztBQWxCTixtQ0EwQlgseUJBQU8sUUFBUSxRQUFRO0FBQ3JCLGlCQUFPLEtBQUssV0FBTCxDQUFpQixNQUFqQixFQUF5QixNQUF6QixDQUFQLENBRHFCOzs7ZUExQloiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWludGVycG9sYXRlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
