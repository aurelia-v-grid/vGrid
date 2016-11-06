'use strict';

System.register(['./gridConnector', './selection', './dataSource', './collection'], function (_export, _context) {
  "use strict";

  var gridConnector, selection, datasource, collection, prefix, GridConnector, Selection, DataSource, Collection;
  function configure(config) {
    config.globalResources(prefix + '/attributes/v-filter', prefix + '/attributes/v-sort', prefix + '/attributes/v-image', prefix + '/attributes/v-drag-drop-col', prefix + '/attributes/v-resize-col', prefix + '/attributes/v-menu', prefix + '/attributes/v-selection', prefix + '/v-grid-row-repeat', prefix + '/v-grid-col', prefix + '/v-grid');
  }

  _export('configure', configure);

  return {
    setters: [function (_gridConnector) {
      gridConnector = _gridConnector;
    }, function (_selection) {
      selection = _selection;
    }, function (_dataSource) {
      datasource = _dataSource;
    }, function (_collection) {
      collection = _collection;
    }],
    execute: function () {
      prefix = './grid';

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
//# sourceMappingURL=index.js.map
