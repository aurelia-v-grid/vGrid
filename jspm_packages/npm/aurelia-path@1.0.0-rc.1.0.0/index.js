/* */ 
define(['exports', './aurelia-path'], function (exports, _aureliaPath) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_aureliaPath).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _aureliaPath[key];
      }
    });
  });
});