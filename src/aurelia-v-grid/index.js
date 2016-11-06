import * as gridConnector from './gridConnector';
import * as selection from './selection';
import * as datasource from './dataSource';
import * as collection from './collection';


var prefix = './grid';

export function configure(config) {
  config.globalResources(
    prefix + '/attributes/v-filter',
    prefix + '/attributes/v-sort',
    prefix + '/attributes/v-image',
    prefix + '/attributes/v-drag-drop-col',
    prefix + '/attributes/v-resize-col',
    prefix + '/attributes/v-menu',
    prefix + '/attributes/v-selection',
    prefix + '/v-grid-row-repeat',
    prefix + '/v-grid-col',
    prefix + '/v-grid'
  );
}


export const GridConnector = gridConnector.GridConnector;
export const Selection = selection.Selection;
export const DataSource = datasource.DataSource;
export const Collection = collection.Collection;


