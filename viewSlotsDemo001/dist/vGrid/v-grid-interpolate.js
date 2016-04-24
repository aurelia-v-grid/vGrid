"use strict";

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
      _export("VGridInterpolate", VGridInterpolate = function () {
        function VGridInterpolate() {
          _classCallCheck(this, VGridInterpolate);

          this.attributes = [];
        }

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

      _export("VGridInterpolate", VGridInterpolate);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1pbnRlcnBvbGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQ0FNYTtBQUNYLGlCQURXLGdCQUNYLEdBQWM7Z0NBREgsa0JBQ0c7O2VBRWQsYUFBYSxHQUZDO1NBQWQ7O0FBRFcsbUNBYVgscUNBQWEsS0FBSTtBQUNmLGNBQUcsR0FBSCxFQUFPO0FBQ1AsZ0JBQUksSUFBSSxFQUFKLENBREc7QUFFUCxpQkFBSyxVQUFMLENBQWdCLE9BQWhCLENBQXdCLFVBQUMsSUFBRCxFQUFRO0FBQzlCLGdCQUFFLElBQUYsSUFBVSxJQUFJLElBQUosQ0FBVixDQUQ4QjthQUFSLENBQXhCLENBRk87QUFLUCxtQkFBTyxDQUFQLENBTE87V0FBUCxNQU1LO0FBQ0wsbUJBQU8sRUFBUCxDQURLO1dBTkw7OztBQWRTLG1DQXlCWCx5QkFBTyxRQUFRLFFBQVE7QUFDckIsaUJBQU8sS0FBSyxXQUFMLENBQWlCLE1BQWpCLEVBQXlCLE1BQXpCLENBQVAsQ0FEcUI7OztlQXpCWiIsImZpbGUiOiJ2R3JpZC92LWdyaWQtaW50ZXJwb2xhdGUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
