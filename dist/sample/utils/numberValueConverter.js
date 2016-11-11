define(["require", "exports"], function (require, exports) {
    "use strict";
    var NumberValueConverter = (function () {
        function NumberValueConverter() {
        }
        NumberValueConverter.prototype.toView = function (value) {
            if (value) {
                return value;
            }
            else {
                return value;
            }
        };
        NumberValueConverter.prototype.fromView = function (value) {
            if (value) {
                var check = value * 1;
                if (isNaN(check)) {
                    return value;
                }
                else {
                    return value * 1;
                }
            }
            else {
                return value;
            }
        };
        return NumberValueConverter;
    }());
    exports.NumberValueConverter = NumberValueConverter;
});

//# sourceMappingURL=numberValueConverter.js.map
