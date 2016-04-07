/* */ 
define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var VGridInterpolate = exports.VGridInterpolate = function () {
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
  }();
});