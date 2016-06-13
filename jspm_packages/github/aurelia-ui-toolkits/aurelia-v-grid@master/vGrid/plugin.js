/* */ 
define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources('vGrid/v-grid-element-footer-pager', 'vGrid/v-grid-element-row-repeat', 'vGrid/v-grid-element-col-config', 'vGrid/v-grid', 'vGrid/v-grid-attributes-filter', 'vGrid/v-grid-attributes-sort', 'vGrid/v-grid-attributes-selection', 'vGrid/v-grid-attributes-image', 'vGrid/v-grid-attributes-key-move', 'vGrid/v-grid-attributes-contextmenu', 'vGrid/v-grid-attributes-observe-field', 'vGrid/v-grid-attributes-dragDropCol', 'vGrid/v-grid-attributes-resize-col');
  }
});