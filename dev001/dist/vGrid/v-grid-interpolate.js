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
        }

        VGridInterpolate.prototype.parse = function parse() {};

        VGridInterpolate.prototype.interpolate = function interpolate(str) {
          return function interpolate(o) {
            return str.replace(/{{([^{}]*)}}/g, function (a, b) {
              var r = o[b];
              return typeof r === 'string' || typeof r === 'number' ? r : a;
            });
          };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1pbnRlcnBvbGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQ0FNYTtBQUNYLGlCQURXLGdCQUNYLEdBQWM7Z0NBREgsa0JBQ0c7U0FBZDs7QUFEVyxtQ0FHWCx5QkFBUTs7QUFIRyxtQ0FLWCxtQ0FBWSxLQUFLO0FBQ2YsaUJBQU8sU0FBUyxXQUFULENBQXFCLENBQXJCLEVBQXdCO0FBQzdCLG1CQUFPLElBQUksT0FBSixDQUFZLGVBQVosRUFBNkIsVUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQjtBQUNsRCxrQkFBSSxJQUFJLEVBQUUsQ0FBRixDQUFKLENBRDhDO0FBRWxELHFCQUFPLE9BQU8sQ0FBUCxLQUFhLFFBQWIsSUFBeUIsT0FBTyxDQUFQLEtBQWEsUUFBYixHQUF3QixDQUFqRCxHQUFxRCxDQUFyRCxDQUYyQzthQUFoQixDQUFwQyxDQUQ2QjtXQUF4QixDQURROzs7QUFMTixtQ0FhWCx5QkFBTyxRQUFRLFFBQVE7QUFDckIsaUJBQU8sS0FBSyxXQUFMLENBQWlCLE1BQWpCLEVBQXlCLE1BQXpCLENBQVAsQ0FEcUI7OztlQWJaIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1pbnRlcnBvbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
