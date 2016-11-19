export * from './interfaces';
const prefix = './grid';
export function configure(config: any) {
  config.globalResources(
    prefix + '/attributes/v-filter',
    prefix + '/attributes/v-sort',
    prefix + '/attributes/v-image',
    prefix + '/attributes/v-drag-drop-col',
    prefix + '/attributes/v-resize-col',
    prefix + '/attributes/v-menu',
    prefix + '/attributes/v-selection',
    prefix + '/v-grid-row-repeat',
    prefix + '/v-grid-group-row',
    prefix + '/v-grid-col',
    prefix + '/v-grid'
  );
}


