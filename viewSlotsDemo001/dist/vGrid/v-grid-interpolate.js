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

        VGridInterpolate.prototype.parse = function parse(string) {
          var _this = this;

          this.attributes = [];
          string.replace(/{([^{}]*)}/g, function (a, b) {

            _this.attributes.push(b);
          });
        };

        VGridInterpolate.prototype.interpolate = function interpolate(str) {
          return function interpolate(o) {
            return str.replace(/{{([^{}]*)}}/g, function (a, b) {
              var r = o[b];
              return r;
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

      _export("VGridInterpolate", VGridInterpolate);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1pbnRlcnBvbGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQ0FNYTtBQUNYLGlCQURXLGdCQUNYLEdBQWM7Z0NBREgsa0JBQ0c7O2VBRWQsYUFBYSxHQUZDO1NBQWQ7O0FBRFcsbUNBSVgsdUJBQU0sUUFBUTs7O0FBQ1osZUFBSyxVQUFMLEdBQWtCLEVBQWxCLENBRFk7QUFFWixpQkFBTyxPQUFQLENBQWUsYUFBZixFQUE4QixVQUFDLENBQUQsRUFBSSxDQUFKLEVBQVU7O0FBRXRDLGtCQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcUIsQ0FBckIsRUFGc0M7V0FBVixDQUE5QixDQUZZOzs7QUFKSCxtQ0FXWCxtQ0FBWSxLQUFLO0FBQ2YsaUJBQU8sU0FBUyxXQUFULENBQXFCLENBQXJCLEVBQXdCO0FBQzdCLG1CQUFPLElBQUksT0FBSixDQUFZLGVBQVosRUFBNkIsVUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQjtBQUNsRCxrQkFBSSxJQUFJLEVBQUUsQ0FBRixDQUFKLENBRDhDO0FBRWxELHFCQUFPLENBQVAsQ0FGa0Q7YUFBaEIsQ0FBcEMsQ0FENkI7V0FBeEIsQ0FEUTs7O0FBWE4sbUNBbUJYLHFDQUFhLEtBQUk7QUFDZixjQUFHLEdBQUgsRUFBTztBQUNQLGdCQUFJLElBQUksRUFBSixDQURHO0FBRVAsaUJBQUssVUFBTCxDQUFnQixPQUFoQixDQUF3QixVQUFDLElBQUQsRUFBUTtBQUM5QixnQkFBRSxJQUFGLElBQVUsSUFBSSxJQUFKLENBQVYsQ0FEOEI7YUFBUixDQUF4QixDQUZPO0FBS1AsbUJBQU8sQ0FBUCxDQUxPO1dBQVAsTUFNSztBQUNMLG1CQUFPLEVBQVAsQ0FESztXQU5MOzs7QUFwQlMsbUNBK0JYLHlCQUFPLFFBQVEsUUFBUTtBQUNyQixpQkFBTyxLQUFLLFdBQUwsQ0FBaUIsTUFBakIsRUFBeUIsTUFBekIsQ0FBUCxDQURxQjs7O2VBL0JaIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1pbnRlcnBvbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
