/* */ 
define(['exports', './ds/gridConnector', './ds/restApi'], function (exports, _gridConnector, _restApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GridConnector = exports.RestApi = undefined;
  exports.configure = configure;

  var gridConnector = _interopRequireWildcard(_gridConnector);

  var restApi = _interopRequireWildcard(_restApi);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function configure(config) {
    config.globalResources('./grid/v-grid-element-row-repeat', './grid/v-grid-element-col-config', './grid/v-grid', './grid/v-grid-attributes-filter', './grid/v-grid-attributes-sort', './grid/v-grid-attributes-selection', './grid/v-grid-attributes-image', './grid/v-grid-attributes-key-move', './grid/v-grid-attributes-contextmenu', './grid/v-grid-attributes-dragDropCol', './grid/v-grid-attributes-resize-col');
  }

  var RestApi = exports.RestApi = restApi.RestApi;
  var GridConnector = exports.GridConnector = gridConnector.GridConnector;
});