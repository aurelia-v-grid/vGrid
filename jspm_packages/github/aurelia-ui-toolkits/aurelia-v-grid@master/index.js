/* */ 
define(['exports', 'aurelia-framework', './config-builder'], function (exports, _aureliaFramework, _configBuilder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(aurelia, configCallback) {
    var builder = new _configBuilder.ConfigBuilder();

    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(builder);
    }

    aurelia.globalResources(builder.globalResources);
  }
});