/* */ 
define(["exports","./styles/v-grid.css!css"], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources('./v-grid');
  }
});