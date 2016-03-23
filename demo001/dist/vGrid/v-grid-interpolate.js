System.register([], function (_export) {
  'use strict';

  var VGridInterpolate;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      VGridInterpolate = (function () {
        function VGridInterpolate() {
          _classCallCheck(this, VGridInterpolate);
        }

        _createClass(VGridInterpolate, [{
          key: 'parse',
          value: function parse() {}
        }, {
          key: 'interpolate',
          value: function interpolate(str) {
            return function interpolate(o) {
              return str.replace(/{{([^{}]*)}}/g, function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
              });
            };
          }
        }, {
          key: 'render',
          value: function render(string, object) {
            return this.interpolate(string)(object);
          }
        }]);

        return VGridInterpolate;
      })();

      _export('VGridInterpolate', VGridInterpolate);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1pbnRlcnBvbGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUFNYSxnQkFBZ0I7Ozs7Ozs7OztBQUFoQixzQkFBZ0I7QUFDaEIsaUJBREEsZ0JBQWdCLEdBQ2I7Z0NBREgsZ0JBQWdCO1NBRTFCOztxQkFGVSxnQkFBZ0I7O2lCQUd0QixpQkFBRyxFQUNQOzs7aUJBQ1UscUJBQUMsR0FBRyxFQUFFO0FBQ2YsbUJBQU8sU0FBUyxXQUFXLENBQUMsQ0FBQyxFQUFFO0FBQzdCLHFCQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNsRCxvQkFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2IsdUJBQU8sT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2VBQy9ELENBQUMsQ0FBQzthQUNKLENBQUE7V0FDRjs7O2lCQUNLLGdCQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDckIsbUJBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztXQUN6Qzs7O2VBZlUsZ0JBQWdCIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1pbnRlcnBvbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
