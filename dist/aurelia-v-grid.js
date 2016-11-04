'use strict';

System.register(['./plugin/gridConnector', './plugin/selection', './plugin/dataSource', './plugin/collection'], function (_export, _context) {
  "use strict";

  var gridConnector, selection, datasource, collection, prefix, GridConnector, Selection, DataSource, Collection;
  function configure(config) {
    config.globalResources(prefix + '/attributes/v-filter', prefix + '/attributes/v-sort', prefix + '/attributes/v-image', prefix + '/attributes/v-drag-drop-col', prefix + '/attributes/v-resize-col', prefix + '/attributes/v-menu', prefix + '/v-grid-row-repeat', prefix + '/v-grid-col', prefix + '/v-grid');
  }

  _export('configure', configure);

  return {
    setters: [function (_pluginGridConnector) {
      gridConnector = _pluginGridConnector;
    }, function (_pluginSelection) {
      selection = _pluginSelection;
    }, function (_pluginDataSource) {
      datasource = _pluginDataSource;
    }, function (_pluginCollection) {
      collection = _pluginCollection;
    }],
    execute: function () {
      prefix = 'plugin/grid';

      _export('GridConnector', GridConnector = gridConnector.GridConnector);

      _export('GridConnector', GridConnector);

      _export('Selection', Selection = selection.Selection);

      _export('Selection', Selection);

      _export('DataSource', DataSource = datasource.DataSource);

      _export('DataSource', DataSource);

      _export('Collection', Collection = collection.Collection);

      _export('Collection', Collection);
    }
  };
});
//# sourceMappingURL=aurelia-v-grid.js.map
