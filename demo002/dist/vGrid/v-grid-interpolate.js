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
          if (obj) {
            var x = {};
            this.attributes.forEach(function (prop) {
              x[prop] = obj[prop];
            });
            return x;
          } else {
            return "";
          }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1pbnRlcnBvbGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQ0FNYTtBQUNYLGlCQURXLGdCQUNYLEdBQWM7Z0NBREgsa0JBQ0c7O2VBRWQsYUFBYSxHQUZDO1NBQWQ7O0FBRFcsbUNBSVgsdUJBQU0sUUFBUTs7O0FBQ1osZUFBSyxVQUFMLEdBQWtCLEVBQWxCLENBRFk7QUFFWixpQkFBTyxPQUFQLENBQWUsZUFBZixFQUFnQyxVQUFDLENBQUQsRUFBSSxDQUFKLEVBQVU7QUFDeEMsa0JBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixDQUFyQixFQUR3QztXQUFWLENBQWhDLENBRlk7OztBQUpILG1DQVVYLG1DQUFZLEtBQUs7QUFDZixpQkFBTyxTQUFTLFdBQVQsQ0FBcUIsQ0FBckIsRUFBd0I7QUFDN0IsbUJBQU8sSUFBSSxPQUFKLENBQVksZUFBWixFQUE2QixVQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCO0FBQ2xELGtCQUFJLElBQUksRUFBRSxDQUFGLENBQUosQ0FEOEM7QUFFbEQscUJBQU8sT0FBTyxDQUFQLEtBQWEsUUFBYixJQUF5QixPQUFPLENBQVAsS0FBYSxRQUFiLEdBQXdCLENBQWpELEdBQXFELENBQXJELENBRjJDO2FBQWhCLENBQXBDLENBRDZCO1dBQXhCLENBRFE7OztBQVZOLG1DQWtCWCxxQ0FBYSxLQUFJO0FBQ2YsY0FBRyxHQUFILEVBQU87QUFDUCxnQkFBSSxJQUFJLEVBQUosQ0FERztBQUVQLGlCQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBd0IsVUFBQyxJQUFELEVBQVE7QUFDOUIsZ0JBQUUsSUFBRixJQUFVLElBQUksSUFBSixDQUFWLENBRDhCO2FBQVIsQ0FBeEIsQ0FGTztBQUtQLG1CQUFPLENBQVAsQ0FMTztXQUFQLE1BTUs7QUFDTCxtQkFBTyxFQUFQLENBREs7V0FOTDs7O0FBbkJTLG1DQThCWCx5QkFBTyxRQUFRLFFBQVE7QUFDckIsaUJBQU8sS0FBSyxXQUFMLENBQWlCLE1BQWpCLEVBQXlCLE1BQXpCLENBQVAsQ0FEcUI7OztlQTlCWiIsImZpbGUiOiJ2R3JpZC92LWdyaWQtaW50ZXJwb2xhdGUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
