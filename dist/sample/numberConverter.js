"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var KeepAsNumberValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("KeepAsNumberValueConverter", KeepAsNumberValueConverter = function () {
        function KeepAsNumberValueConverter() {
          _classCallCheck(this, KeepAsNumberValueConverter);
        }

        KeepAsNumberValueConverter.prototype.toView = function toView(value) {
          if (value) {
            return value;
          } else {
            return value;
          }
        };

        KeepAsNumberValueConverter.prototype.fromView = function fromView(value) {
          if (value) {
            var check = value * 1;
            if (isNaN(check)) {
              return value;
            } else {
              return value * 1;
            }
          } else {
            return value;
          }
        };

        return KeepAsNumberValueConverter;
      }());

      _export("KeepAsNumberValueConverter", KeepAsNumberValueConverter);
    }
  };
});
//# sourceMappingURL=numberConverter.js.map
