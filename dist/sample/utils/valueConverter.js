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
    var BooleanValueConverter = (function () {
        function BooleanValueConverter() {
        }
        BooleanValueConverter.prototype.toView = function (value) {
            if (value) {
                return value;
            }
            else {
                return value;
            }
        };
        BooleanValueConverter.prototype.fromView = function (value) {
            if (typeof value === 'string') {
                value = value.toLowerCase();
            }
            switch (value) {
                case true:
                case 'true':
                    value = true;
                    break;
                case false:
                case 'false':
                    value = true;
                    break;
                default:
                    value = false;
            }
            return value;
        };
        return BooleanValueConverter;
    }());
    exports.BooleanValueConverter = BooleanValueConverter;
});

//# sourceMappingURL=valueConverter.js.map
